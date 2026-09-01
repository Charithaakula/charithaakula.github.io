# Life OS

> Know everything important. Think only about what matters now.

A prototype that turns scattered life advice into a plan you can actually follow. Lives at
**https://charithaakula.github.io/life-os/**

This is a self-contained section of the personal site. It adds no build step, no framework
and no dependency to the rest of the site — plain HTML, CSS and ES5-compatible JavaScript,
exactly like everything else in this repo.

---

## Run it locally

There is nothing to install. Open the file:

```bash
open life-os/index.html
```

It works over `file://` — the scripts are classic `<script>` tags rather than ES modules
specifically so that double-clicking the file just works. If you prefer a server:

```bash
python3 -m http.server 8000
# → http://localhost:8000/life-os/
```

## Deploy

It is already deployed. Commit and push to `main`; GitHub Pages serves `/life-os/`.
The `backend/` folder is served too but is inert — it holds no secrets. To keep it out of
Pages entirely, move it above the repo root or add it to a `.gitignore`.

---

## How it is put together

```
life-os/
├── index.html          the page — hero, problem, the four views, feedback form
├── styles.css          the whole design system — four themes, all colour
├── data/catalog.js     ~50 recommendations as structured data (no colour)
├── js/
│   ├── store.js        localStorage memory (profile, dislikes, decisions, plan)
│   ├── planner.js      the engine — profile → Today / Week / Month / Not Now
│   ├── model.js        callLifeOSModel() + an on-device fallback brain
│   ├── views.js        rendering for all four views
│   ├── chat.js         onboarding + Ask Life OS panel
│   ├── theme.js        theme switcher (flips one attribute, nothing more)
│   └── app.js          bootstrap, tabs, feedback, reset
└── backend/            serverless proxy so the API key is never in the browser
```

---

## Themes — how to restyle it

Four ship in the header, and the choice is remembered:

| | |
|---|---|
| **Studio** | the default — cream, navy, Fraunces serif, hairline rules, muted pastels |
| **Noir** | the same bones on near-black, with an electric-lime accent |
| **Sunshine** | flat, white, monospace, gold links — the quiet personal-site look |

The register is editorial, not decorative: colour is carried by small things — line-art
icons, meters, status — rather than large blocks, and there is a lot of air.

**No JavaScript knows about colour.** Every coloured element renders with a
`dom-<domain>` class; `styles.css` maps those to sixteen named hues; a theme is one block
of custom properties. So:

- **Retint the whole app** → edit the 16 `--c-*-bg` / `--c-*-fg` pairs in one block.
- **Change the shape language** → `--radius`, `--border-w`, `--shadow`.
- **Change the type** → `--font-display`, `--font-body`, `--font-mono`.
- **Move a domain to a different colour** → one line in the `.dom-*` mapping table.

To add your own look, copy the `[data-theme="bubblegum"]` block, rename it, change the
tokens, and add one line to `THEMES` in `js/theme.js`. Nothing else to touch.

Icons are a `<symbol>` sprite at the top of `index.html`, stroked in `currentColor`, one
per domain key — swap a path and that domain's icon changes everywhere at once.
`prefers-reduced-motion` disables every hover transform.

### The one design decision that matters

**The planner is deterministic and runs in the browser. The model only interprets.**

```
"Tuesday is busy"  →  model  →  { patch: { busyDays: [1] }, rebuild: true }
                                          ↓
                                    planner.js  →  the actual plan
```

Consequences worth knowing:

- The plan is **reproducible**. The same profile always produces the same week.
- Chat costs a few hundred tokens per turn, not a full regenerated plan.
- If the backend is down, missing, or slow, the page falls back to the on-device brain and
  keeps working. A prototype you send to friends should never show them an error.
- No LLM call happens for tab switches, domain clicks, or re-renders.

### The shape of the page

The week grid is the **final snapshot** — the one place you drag things to their final
position. Everything below it is the **overall plan**: what each area contains, why, and how
often. Changes made below surface in the grid above; the grid is the single source of truth.

The research at the top is a **snapshot, not a catalogue** — counts, and the three places
where reading the evidence changed a recommendation. The full reasoning lives with each
domain, one area at a time, so nothing is dumped and nothing is buried.

Inside a domain the order is: **evidence → the cards you can edit → the month calendar,
folded shut.** The month view is reference; it should not be the first thing you meet.
Nutrition is the exception — its month rotation is the whole point of that domain, so it
stays open.

One illustration, then two views, then a way to change them.

1. **The week grid** — every domain down the side, the week across the top, with the actual
   items in the cells. This is the daily driver: it carries everything for the week *and*
   shows what the week never touches. Domains whose items repeat identically all seven days
   collapse to a single "Every day" line rather than printing seven times.
2. **One area, a whole month** — pick a domain and see the month it actually lands on.
   Nutrition is the worked example, with a rotation and a grocery list.
3. **Week · Month · Year** — the same plan at three distances:
   - **Week / load** — seven stacked columns of domain-coloured minutes. A grid of ticks
     says *something happens*; this says *how much*, so an unbalanced week is visible.
   - **Month / rhythm** — every day as a stack of thin domain stripes. The repeating
     pattern is your week; the labelled days are the one-offs that break it.
   - **Year / horizon** — twelve months clockwise from this one, with the slow cadences
     plotted where they land. This is "Not Now" made visible.
4. **Customise** — tap a phrase or open the chat. No settings screens.

### Voice, and telling it everything at once

The mic in the chat panel uses the browser's own `SpeechRecognition` — no API key, no audio
upload, no backend. Life OS only ever sees the transcript. Where the API is missing (Firefox),
every voice control hides itself and typing still works, so nothing depends on it.

One long utterance sets many things at once. `localBrain.digest()` splits on every clause
boundary, runs each through the same matchers a single message uses, and merges the patches:

> *"I'm in London, Tuesdays are busy, I don't like morning workouts, and I'm travelling next week"*
> → `{region: "uk", busyDays: [1], noMorningWorkouts: true, travelWeek: true}` — four changes.

The first version split only on commas *before* conjunctions, which swallowed whole clauses —
that sentence yielded two changes instead of four. It now splits on every comma.

### Where every recommendation comes from

`data/evidence.js` carries, per domain: what Life OS suggests, why, **what the source does
not say**, and links to the actual guideline. Every URL in it was fetched and read while
writing it; where a number could not be verified from the page, the entry says so rather
than quoting it anyway.

The point is a confidence grade, shown as a badge on each panel:

| Grade | Meaning | Examples |
|---|---|---|
| **Strong consensus** (10) | A named guideline or systematic review | sleep 7+ hrs (AASM/SRS), 150 min/wk (WHO), SPF 30+ (AAD), 20-20-20 (AOA), passwords (NIST), protein 0.8 g/kg, back pain (ACP), neck (Cochrane), sitting breaks (Diabetes Care) |
| **General guidance** | Widely recommended, less formally codified | the Daily Dozen, emergency fund (CFPB), daily walk |
| **Convention** | A sensible default with no evidence base | mobility 3×/wk, deep-work blocks, weekly admin batch |
| **Your call** | Entirely personal | hobby time, learning cadence |

Presenting all four in the same confident voice would be the dishonest thing. Five topics are
graded *convention* and two *your call* — and they say so, in the research section at the top
of the page, before anything is recommended.

**Three findings changed what Life OS recommends, not just what it cites:**

1. **"Stand up" became "Walk 2–3 minutes."** In the trials, breaking up sitting with light
   walking improved post-meal glucose — one reported the 5-hour AUC 55.5% lower — while
   *standing* breaks in the same comparison did not.
2. **Neck work became strengthening, not stretching.** Cochrane found strength-specific
   training helps mechanical neck pain (SMD −0.71) while generic stretching and general
   exercise programmes did not.
3. **Mobility is now dynamic, and no longer claims injury prevention.** Static stretching
   reliably improves flexibility, but a systematic review found moderate-to-strong evidence it
   does *not* reduce injury rates — all four RCTs agreed. ACSM recommends dynamic instead.

The meditation entry is the clearest example of the caveat mattering more than the headline:
moderate evidence for anxiety and depression, but the same paper found **no evidence it beats
any active treatment**, exercise included.

### Editing the recommendations

Nothing in the catalog is fixed. Per item you can **edit** the name and duration, **drop**
it, or **delete** it if it is yours. Per domain you can **add your own** with a name,
duration and cadence. Food chips have an `×` and each category has `+ add`, so the Daily
Dozen becomes your list rather than a book's.

Edits live as overrides (`profile.edits`), custom items in `profile.custom`, food changes in
`profile.foods`. Everything reads through `planner.allItems(profile)`, so an edit shows up in
the week grid, the month strip, the ribbon, the quilt and the year ring at once.

One rule worth knowing: **an item you add yourself is never filtered out.** Adding it *was*
the act of choosing it, so it bypasses the focus and mode filters entirely.

### Getting it into your real calendar

"Add to my calendar" downloads `life-os.ics` — weekly recurring events that import into
Google Calendar, Apple Calendar or Outlook with no OAuth, no backend and no token to leak.

It imports as a **separate calendar**, deliberately. Life OS should never be able to touch
or delete anything already in your diary, and nothing syncs back — move or delete the events
freely.

Times are **floating local** (`DTSTART:20260831T070000`, no `Z`, no `TZID`). A 7am habit
should still be 7am after the clocks change and still 7am if you move countries; pinning to
UTC would silently shift every recurrence by an hour twice a year.

### Nutrition: the Daily Dozen, filtered by where you are

`data/nutrition.js` carries [Dr. Greger's Daily Dozen](https://nutritionfacts.org/daily-dozen/)
with its real serving counts (beans ×3, berries ×1, greens ×2, whole grains ×3 …) and the
source's own framing: a checklist to inspire you, explicitly *not* prescriptive, an
aspirational minimum meant to be customised. Life OS treats it as one selectable framework,
not settled truth.

On top of it sits a **seasonality layer**, because a checklist that tells a Londoner to eat
berries in January is advice nobody can follow. Six regions ship — California/US West
(default), US Northeast, UK & Ireland, India, Australia/NZ, and "anywhere" to switch
seasonality off. The southern hemisphere is genuinely flipped: Australia gets berries in
January and brassicas in July.

Only produce carries months. Beans, grains, nuts, seeds, flax, spices and drinks are pantry
staples and are always available — modelling them as seasonal would be wrong. When a
category has nothing in season (UK berries in January), it falls back to frozen or generic
rather than showing an empty slot.

Set it from the dropdown in the nutrition view, or just tell the chat "I live in London".
The rotation, the grocery list and the highlighted chips all follow. Seasonality is
approximate and varies by grower — it is a prompt for the market, not a rule.

### Retirement, in the order the decisions matter

`money` carries six retirement prompts rather than one vague "check your 401(k)": capture
the full match → pre-tax or Roth → this year's limits → backdoor Roth → does the plan even
allow after-tax and conversion → rebalance and fees. Match is first because it is the only
unambiguously free money and it expires with the plan year.

Every one is phrased as *go and check something*, never as an instruction. The evidence panel
carries the 2026 IRS figures ($24,500 deferral, $8,000 catch-up at 50+, $11,250 at 60–63
under SECURE 2.0, $7,500 IRA, $360,000 compensation cap) and names the two traps:

- **The pro-rata rule applies to the backdoor Roth IRA but not to the mega backdoor inside a
  401(k)** — a 401(k) has no aggregation rule, so after-tax and pre-tax money there don't
  contaminate each other, while an existing pre-tax *IRA* balance makes a backdoor Roth
  partly taxable.
- **The mega backdoor only exists if your plan permits it.** First step is a phone call, not
  a transfer.

The figures were read from the IRS in 2026 and will go stale — which is exactly why "check
this year's limits" is an item on the plan.

### Grouping and clashes

Nineteen rows is too many to scan, so related domains collapse into eight families —
Movement, Fuel, Rest, Work, People, Mind, Upkeep, Care. Click a family to expand it in
place; "Show all 19" turns grouping off entirely.

Collapsing is not only cosmetic. A family marked `competes: true` has members that fight
over the *same slot* — one training window, one free evening. When two of them land on the
same day, the cell is flagged.

The threshold matters more than it looks. Counting raw items flagged Movement on six days
out of seven, because a daily walk and a two-minute desk reset are always present — noise,
not signal. A clash is now **two items of 30+ minutes each**, so:

- a strength day that also has a walk → silent, correctly
- dragging cardio onto the strength day → flagged
- deep work 90m + deliberate learning 40m on a Wednesday → flagged
- see a friend 90m + go to something 180m on a Friday → flagged

Ambient things coexist; things that need a block do not.

### Moving things

Items in the week grid are draggable. Drop one on another day and the move is stored as an
override (`profile.moves[itemId]`), the plan is rebuilt from it, and **every other view
re-renders off the same object** — the ribbon, quilt and year ring follow automatically
because none of them hold their own copy. A toast offers undo; "Undo all my moves" clears
the overrides entirely.

A move replaces only the occurrence you dragged, so a 2×/week item stays 2×/week — it just
lands somewhere else.

Everything else — the Today/Week/Month columns, the time-of-day calendar, the coverage
table — lives in a collapsed **appendix** at the bottom. Same plan, sliced differently,
kept out of the way because most weeks you don't need it.

### The data model

Every recommendation carries three things:

| | |
|---|---|
| **Domain** | Nutrition, Strength, Money, Body & Skin, Events, Mind, Digital… — 19 of them |
| **Cadence** | daily, 2×/week, weekly, every 6 weeks, quarterly, twice a year, yearly |
| **Mode** | which life modes keep it: Minimum, Base, Build, Optimize |

Cadence is what makes the interface calm: most of the catalog is not due today, so most of
it is not shown today. Items also carry a `type` — `CONSUME` (rides along with meals you
already eat), `DO` (needs real time), `MAINTAIN` (background), `REVIEW` (periodic check-in).
That type is internal; it decides whether something belongs on the calendar or in the
nutrition view, and is never surfaced as jargon.

Two rules keep it honest:

- **Areas you did not pick still keep their minimum.** Nothing disappears from your life
  just because you did not mention it in onboarding — it drops to essentials and shows as
  "Minimum only" on the dashboard.
- **A busy day sheds everything except essentials, and the rest moves rather than vanishing.**
- **Travel and pets are opt-in**, so choosing "Everything" never hands you a dog.

### Modes

`Minimum` (a hard stretch — essentials only) · `Base` (default) · `Build` (extra capacity)
· `Optimize` (advanced). Travelling temporarily behaves as Minimum and additionally drops
anything that needs your kitchen or your home.

---

## Connecting the model

Out of the box the chat runs on-device and handles a fixed vocabulary: *"Tuesday is busy"*,
*"no morning workouts"*, *"I'm travelling next week"*, *"bare minimum for two weeks"*,
*"why strength session?"*, *"drop the hobby block"*. The header chip reads **Demo mode**.

To handle anything a person types, deploy the proxy in [`backend/`](backend/README.md) —
about five minutes — and set one line in `index.html`:

```js
window.LifeOS.CONFIG = {
  endpoint:         'https://life-os-api.<you>.workers.dev/chat',
  feedbackEndpoint: 'https://life-os-api.<you>.workers.dev/feedback'
};
```

The chip flips to **AI connected**. Never put an API key in this file — the page is public.

## Memory

Everything is `localStorage`, in the visitor's browser: profile, chosen mode, available
time, dietary constraints, items pushed back on, recent replanning decisions, and the last
generated plan. No account, no server copy, no analytics. "Reset my Life OS" clears it.

## Feedback

The form at the bottom posts to `feedbackEndpoint` when one is configured, and otherwise
opens a prefilled email. Responses are also kept in `localStorage`.

---

## Deliberately not built

Native apps · wearables · real brokerage or pharmacy integrations · automatic transactions ·
a full life knowledge graph · multi-model routing · accounts · payments · social features.

The prototype exists to answer one question: **when people see their life organised this
way and can talk to it, do they want to keep using it?**

## Honest limits

- The numbers are illustrative defaults, not medical, dietary or financial advice.
- The dashboard's "Current" column is derived from what you told onboarding, not from
  anything measured. It reflects intent, not behaviour.
- The calendar is a demonstration of coexistence, not a schedule to obey.
- On-device chat matches on keywords. It is a fallback, not a language model.
- Themes load three Google Fonts (Fredoka, Space Grotesk, Space Mono). They degrade to
  system fonts if the request is blocked, but the page is not fully self-hosted.
