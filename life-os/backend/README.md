# Life OS — backend

The Life OS page is static and lives on GitHub Pages, which means **it cannot hold an API
key**. Anything in the browser is public. So the page talks to a small serverless endpoint,
and that endpoint holds the key.

```
GitHub Pages (static frontend)
        │  POST /chat  { messages, context }
        ▼
Serverless endpoint  ← ANTHROPIC_API_KEY lives here, as a secret
        ▼
Anthropic Messages API
```

Two implementations are provided. **Pick one** — you do not need both.

| | `worker/` (Cloudflare) | `vercel/` |
|---|---|---|
| Setup | `wrangler deploy` | `vercel deploy` |
| Free tier | 100k requests/day | Generous hobby tier |
| Rate limiting | Built in (optionally KV-backed) | Add via Vercel middleware |
| Recommended | ✅ if you have no preference | if you already use Vercel |

Until you deploy one, the page runs on its **on-device planner**: real plan generation,
plus a fixed set of replanning commands. Nothing is broken — the chat just handles less.

---

## Option A — Cloudflare Worker (recommended)

```bash
cd life-os/backend/worker
npm install
npx wrangler login

# Store the key as a secret. It is never written to disk or to git.
npx wrangler secret put ANTHROPIC_API_KEY

npx wrangler deploy
```

Wrangler prints a URL like `https://life-os-api.<your-subdomain>.workers.dev`.
Check it:

```bash
curl https://life-os-api.<your-subdomain>.workers.dev/health
# {"ok":true,"configured":true}
```

Then wire the frontend — in `life-os/index.html`, near the bottom:

```js
window.LifeOS.CONFIG = {
  endpoint:         'https://life-os-api.<your-subdomain>.workers.dev/chat',
  feedbackEndpoint: 'https://life-os-api.<your-subdomain>.workers.dev/feedback'
};
```

Reload the page. The chip in the header should flip from **Demo mode** to **AI connected**.

### Lock down the origin

Once it works, restrict who can call it. Uncomment in `wrangler.toml`:

```toml
[vars]
ALLOWED_ORIGIN = "https://charithaakula.github.io"
```

and redeploy. (This is a CORS restriction — it stops casual reuse from other sites, not a
determined caller. The rate limit is the real backstop.)

### Durable rate limiting and stored feedback (optional)

The default rate limit lives in memory inside one Worker isolate, so it is best-effort.
For limiting that holds everywhere, create two KV namespaces and uncomment the bindings:

```bash
npx wrangler kv namespace create RATE_LIMIT
npx wrangler kv namespace create FEEDBACK
```

Paste the returned ids into `wrangler.toml` and redeploy. Feedback then persists in KV
instead of only appearing in `npx wrangler tail`.

---

## Option B — Vercel Function

```bash
cd life-os/backend/vercel
npm install
npx vercel deploy --prod
npx vercel env add ANTHROPIC_API_KEY   # paste the key when prompted
```

Then point the frontend at it:

```js
window.LifeOS.CONFIG = {
  endpoint:         'https://<your-project>.vercel.app/api/lifeos?route=chat',
  feedbackEndpoint: 'https://<your-project>.vercel.app/api/lifeos?route=feedback'
};
```

---

## The contract

Request:

```json
{
  "messages": [{ "role": "user", "content": "Tuesday is busy, replan" }],
  "context":  { "profile": { "mode": "base", "focus": ["money"] }, "dislikes": [] }
}
```

Response:

```json
{
  "reply": "Tuesday now keeps only your essentials; the rest moved to Wednesday and Thursday.",
  "rebuild": true,
  "patch": { "busyDays": [1] },
  "dislike": null
}
```

The model returns a **decision**, never a plan. `planner.js` in the browser does the
generating. That keeps plans deterministic, keeps token spend to a few hundred per turn,
and means a backend outage degrades to the on-device planner instead of a blank screen.

Swapping providers means rewriting one file — the frontend only knows this JSON shape.

## What is protected

- The API key stays server-side, as a platform secret.
- Input caps: 20 messages, 2 000 chars each, 12 000 chars total.
- Rate limit: 30 requests per IP per 5 minutes.
- `max_tokens: 8000` with `effort: "low"` — Claude Opus 5 thinks by default and shares that
  budget with the reply, so the ceiling is headroom while `effort` is what bounds real spend.
- Refusals return a friendly message rather than an error.
- Structured outputs (`output_config.format`) guarantee parseable JSON, so a malformed
  reply cannot corrupt someone's plan.
- Every patch is re-validated in the browser (`model.js` → `sanitisePatch`) before it
  touches state. The server is not trusted blindly.

## Cost

At `effort: "low"` a turn is roughly a few hundred output tokens. Sharing the link with
friends for a week costs cents, not dollars. Watch it in the Anthropic Console; if you
want a hard ceiling, add a spend limit there rather than trying to enforce it in code.
