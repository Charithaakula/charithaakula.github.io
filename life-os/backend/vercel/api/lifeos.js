/**
 * Life OS — Vercel Function alternative to the Cloudflare Worker.
 * Same request/response contract; pick whichever platform you already use.
 *
 *   POST /api/lifeos?route=chat      { messages, context }
 *   POST /api/lifeos?route=feedback  { ... }
 */

import Anthropic from '@anthropic-ai/sdk';

const LIMITS = { maxMessages: 20, maxCharsPerMessage: 2000, maxTotalChars: 12000 };

const RESPONSE_SCHEMA = {
  type: 'object',
  properties: {
    reply: { type: 'string', description: 'What to show the person. At most three short sentences.' },
    rebuild: { type: 'boolean', description: 'True if the plan should be regenerated.' },
    patch: {
      type: 'object',
      description: 'Only the profile fields that change.',
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
    dislike: { type: 'string', description: 'A catalog item id to drop.' }
  },
  required: ['reply', 'rebuild'],
  additionalProperties: false
};

const SYSTEM = `You are Life OS, a calm personal operating system.

Your job is to interpret what someone says about their life and translate it into a small
set of profile changes. You do NOT write the plan — a deterministic planner does that from
the profile you produce. Return a short, human reply plus the minimal patch.

PROFILE FIELDS
  focus              array of domain keys. [] means "everything".
  mode               "minimum" | "base" | "build" | "optimize"
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
  busyDays           0 = Monday … 6 = Sunday

DOMAIN KEYS
  nutrition strength cardio mobility sleep preventive money career
  relationships home admin hobby learning grooming

HOW TO BEHAVE
- Set rebuild to true whenever the plan should visibly change.
- Patch only what actually changed.
- Keep the reply to three short sentences at most.
- When someone asks "why", explain the cadence and the trade-off — do not invent studies.
- If they are overwhelmed, prefer a lighter mode over adding more.

BOUNDARIES
- You are an organising system, not a clinician, dietitian, financial adviser or lawyer.
- Nutrition and health content here is an illustrative template, not a prescription.
- If someone asks for individual medical, dosage, diagnostic, legal or investment advice,
  say plainly that this needs a qualified professional, then offer the organising help you can.`;

function cors(res) {
  res.setHeader('Access-Control-Allow-Origin', process.env.ALLOWED_ORIGIN || '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

function validate(body) {
  if (!body || !Array.isArray(body.messages) || !body.messages.length) return 'messages must be a non-empty array';
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

export default async function handler(req, res) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const route = (req.query && req.query.route) || 'chat';
  const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;

  if (route === 'feedback') {
    console.log('LIFEOS_FEEDBACK', JSON.stringify({ at: new Date().toISOString(), ...body }).slice(0, 4000));
    return res.status(200).json({ ok: true });
  }

  const problem = validate(body);
  if (problem) return res.status(400).json({ error: problem });
  if (!process.env.ANTHROPIC_API_KEY) return res.status(500).json({ error: 'Missing ANTHROPIC_API_KEY' });

  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  try {
    const response = await client.messages.create({
      model: 'claude-opus-5',
      // Thinking is on by default on Opus 5 and shares this budget with the
      // reply, so leave headroom; `effort: low` is what keeps spend down.
      max_tokens: 8000,
      output_config: { effort: 'low', format: { type: 'json_schema', schema: RESPONSE_SCHEMA } },
      system: [{ type: 'text', text: SYSTEM, cache_control: { type: 'ephemeral' } }],
      messages: [
        ...body.messages,
        { role: 'system', content: 'Current profile and memory:\n' + JSON.stringify(body.context || {}) }
      ]
    });

    if (response.stop_reason === 'refusal') {
      return res.status(200).json({
        reply: 'I can’t help with that one. Ask me about organising your week and I’m all yours.',
        rebuild: false
      });
    }

    const text = (response.content || []).filter((b) => b.type === 'text').map((b) => b.text).join('');
    try {
      return res.status(200).json(JSON.parse(text));
    } catch {
      return res.status(200).json({ reply: text.slice(0, 600) || 'Something went wrong.', rebuild: false });
    }
  } catch (err) {
    return res.status(502).json({ error: 'Upstream model error', detail: String(err?.message || err).slice(0, 300) });
  }
}
