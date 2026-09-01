/**
 * Life OS — Cloudflare Worker proxy.
 *
 * The GitHub Pages frontend is static and cannot hold a secret, so every model
 * call goes through here. The API key lives in a Wrangler secret and never
 * reaches the browser.
 *
 * Routes
 *   POST /chat      { messages, context } -> { reply, patch, rebuild, dislike }
 *   POST /feedback  { ... }               -> { ok: true }
 *   GET  /health
 */

import Anthropic from '@anthropic-ai/sdk';

/* Bounded so a public demo endpoint cannot be turned into a free LLM. */
const LIMITS = {
  maxMessages: 20,
  maxCharsPerMessage: 2000,
  maxTotalChars: 12000,
  requestsPerWindow: 30,
  windowSeconds: 300
};

/* The model returns a decision, not a plan. planner.js does the generating. */
const RESPONSE_SCHEMA = {
  type: 'object',
  properties: {
    reply: {
      type: 'string',
      description: 'What to show the person. Warm, concrete, at most three short sentences.'
    },
    rebuild: {
      type: 'boolean',
      description: 'True if the plan should be regenerated after applying the patch.'
    },
    patch: {
      type: 'object',
      description: 'Only the profile fields that should change. Omit entirely if nothing changes.',
      properties: {
        focus: { type: 'array', items: { type: 'string' } },
        mode: { type: 'string', enum: ['minimum', 'base', 'build', 'optimize'] },
        morningMinutes: { type: 'integer' },
        eveningMinutes: { type: 'integer' },
        constraints: { type: 'array', items: { type: 'string' } },
        struggle: { type: 'string' },
        region: { type: 'string', enum: ['us-ca', 'us-ne', 'uk', 'in', 'au', 'any'] },
        noMorningWorkouts: { type: 'boolean' },
        travelWeek: { type: 'boolean' },
        busyDays: { type: 'array', items: { type: 'integer' } }
      },
      additionalProperties: false
    },
    dislike: {
      type: 'string',
      description: 'A catalog item id to drop from the plan, if the person rejected one.'
    }
  },
  required: ['reply', 'rebuild'],
  additionalProperties: false
};

const SYSTEM = `You are Life OS, a calm personal operating system.

Your job is to interpret what someone says about their life and translate it into a small
set of profile changes. You do NOT write the plan — a deterministic planner does that from
the profile you produce. Return a short, human reply plus the minimal patch.

PROFILE FIELDS
  focus              array of domain keys the person cares most about. [] means "everything".
  mode               "minimum" (hard stretch, essentials only) | "base" (normal) |
                     "build" (extra capacity) | "optimize" (advanced)
  morningMinutes     minutes genuinely free before work
  eveningMinutes     minutes genuinely free after work
  constraints        e.g. "vegan", "vegetarian", "dairyfree", "glutenfree", "nutallergy", "lowimpact"
  struggle           the one thing they cannot keep consistent
  region             where they live, which decides what produce is in season:
                     "us-ca" (California / US West) | "us-ne" (US Northeast) | "uk"
                     "in" (India) | "au" (Australia / NZ) | "any" (skip seasonality).
                     Set this whenever they mention a city or country.
  noMorningWorkouts  true if training should move to evenings
  travelWeek         true while they are away from home
  busyDays           0 = Monday … 6 = Sunday. A busy day keeps only essentials.

DOMAIN KEYS
  nutrition strength cardio mobility sleep preventive money career
  relationships home admin hobby learning grooming

HOW TO BEHAVE
- Set rebuild to true whenever the plan should visibly change.
- Patch only what actually changed. Never restate the whole profile.
- Keep the reply to three short sentences at most. Say what changed and what it means.
- When someone asks "why", explain the cadence and the trade-off — do not invent studies.
- If they are overwhelmed, prefer moving them to a lighter mode over adding more.

BOUNDARIES
- You are an organising system, not a clinician, dietitian, financial adviser or lawyer.
- Nutrition and health content here is an illustrative template, not a prescription.
- If someone asks for individual medical, dosage, diagnostic, legal or investment advice,
  say plainly that this needs a qualified professional, then offer the organising help you can
  give — reminders, cadence, questions worth asking.
- If a request has nothing to do with organising a life, say so briefly and redirect.`;

/* ------------------------------------------------------------------ utils */
function corsHeaders(env) {
  return {
    'Access-Control-Allow-Origin': env.ALLOWED_ORIGIN || '*',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400'
  };
}

function json(body, status, env) {
  return new Response(JSON.stringify(body), {
    status: status || 200,
    headers: { 'Content-Type': 'application/json', ...corsHeaders(env) }
  });
}

/* Best effort inside one isolate; bind a KV namespace called RATE_LIMIT for
 * limiting that actually holds across isolates. */
const memory = new Map();

async function rateLimited(request, env) {
  const ip = request.headers.get('CF-Connecting-IP') || 'anon';
  const now = Math.floor(Date.now() / 1000);
  const bucket = Math.floor(now / LIMITS.windowSeconds);
  const key = `rl:${ip}:${bucket}`;

  if (env.RATE_LIMIT) {
    const current = parseInt((await env.RATE_LIMIT.get(key)) || '0', 10);
    if (current >= LIMITS.requestsPerWindow) return true;
    await env.RATE_LIMIT.put(key, String(current + 1), { expirationTtl: LIMITS.windowSeconds * 2 });
    return false;
  }

  const count = (memory.get(key) || 0) + 1;
  memory.set(key, count);
  if (memory.size > 5000) memory.clear();
  return count > LIMITS.requestsPerWindow;
}

function validate(body) {
  if (!body || !Array.isArray(body.messages)) return 'messages must be an array';
  if (body.messages.length === 0) return 'messages is empty';
  if (body.messages.length > LIMITS.maxMessages) return 'too many messages';

  let total = 0;
  for (const m of body.messages) {
    if (!m || (m.role !== 'user' && m.role !== 'assistant')) return 'bad message role';
    if (typeof m.content !== 'string') return 'message content must be a string';
    if (m.content.length > LIMITS.maxCharsPerMessage) return 'message too long';
    total += m.content.length;
  }
  if (total > LIMITS.maxTotalChars) return 'conversation too long';
  if (body.messages[0].role !== 'user') return 'conversation must start with a user message';
  return null;
}

/* -------------------------------------------------------------- handlers */
async function handleChat(request, env) {
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Invalid JSON' }, 400, env);
  }

  const problem = validate(body);
  if (problem) return json({ error: problem }, 400, env);

  if (!env.ANTHROPIC_API_KEY) {
    return json({ error: 'Server is missing ANTHROPIC_API_KEY' }, 500, env);
  }

  const client = new Anthropic({ apiKey: env.ANTHROPIC_API_KEY });

  // The person's current state travels as a system-role message so the cached
  // instruction prefix above it stays byte-identical between turns.
  const contextNote = {
    role: 'system',
    content: 'Current profile and memory:\n' + JSON.stringify(body.context || {}, null, 0)
  };

  try {
    const response = await client.messages.create({
      model: 'claude-opus-5',
      // Headroom: on Opus 5 thinking is on by default and max_tokens caps
      // thinking plus text together. Low effort keeps the actual spend small.
      max_tokens: 8000,
      output_config: {
        effort: 'low',
        format: { type: 'json_schema', schema: RESPONSE_SCHEMA }
      },
      system: [{ type: 'text', text: SYSTEM, cache_control: { type: 'ephemeral' } }],
      messages: [...body.messages, contextNote]
    });

    if (response.stop_reason === 'refusal') {
      return json({
        reply: 'I can’t help with that one. Ask me about organising your week and I’m all yours.',
        rebuild: false
      }, 200, env);
    }

    const text = (response.content || [])
      .filter((b) => b.type === 'text')
      .map((b) => b.text)
      .join('');

    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch {
      return json({ reply: text.slice(0, 600) || 'Something went wrong on my side.', rebuild: false }, 200, env);
    }
    return json(parsed, 200, env);
  } catch (err) {
    // The frontend falls back to its on-device planner when this happens.
    return json({ error: 'Upstream model error', detail: String(err && err.message || err).slice(0, 300) }, 502, env);
  }
}

async function handleFeedback(request, env) {
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Invalid JSON' }, 400, env);
  }
  const line = JSON.stringify({ at: new Date().toISOString(), ...body }).slice(0, 4000);

  if (env.FEEDBACK) {
    await env.FEEDBACK.put(`fb:${Date.now()}:${Math.random().toString(36).slice(2, 8)}`, line);
  } else {
    console.log('LIFEOS_FEEDBACK', line); // visible in `wrangler tail`
  }
  return json({ ok: true }, 200, env);
}

/* ----------------------------------------------------------------- entry */
export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders(env) });
    }
    if (url.pathname === '/health') {
      return json({ ok: true, configured: !!env.ANTHROPIC_API_KEY }, 200, env);
    }
    if (request.method !== 'POST') {
      return json({ error: 'Method not allowed' }, 405, env);
    }
    if (await rateLimited(request, env)) {
      return json({ error: 'Rate limit reached. Try again in a few minutes.' }, 429, env);
    }
    if (url.pathname === '/chat') return handleChat(request, env);
    if (url.pathname === '/feedback') return handleFeedback(request, env);
    return json({ error: 'Not found' }, 404, env);
  }
};
