/* Life OS — model layer.
 *
 * One entry point, two implementations:
 *   1. A secure serverless endpoint (see backend/) that talks to an LLM.
 *   2. An on-device fallback that handles a fixed set of intents with no network.
 *
 * The contract is identical either way, so the rest of the app never knows or
 * cares which one answered. The model interprets and decides; planner.js
 * generates. That keeps cost down and keeps the plan deterministic.
 *
 * Response shape:
 *   { reply: string, patch: object|null, rebuild: bool, dislike: string|null }
 */
(function (root) {
  var LifeOS = (root.LifeOS = root.LifeOS || {});

  var config = {
    endpoint: null,     // e.g. 'https://life-os-api.<you>.workers.dev/chat'
    timeoutMs: 30000
  };

  /* ------------------------------------------------------------- transport */
  function configure(opts) {
    if (opts && typeof opts.endpoint === 'string' && opts.endpoint.trim()) {
      config.endpoint = opts.endpoint.trim();
    }
    if (opts && opts.timeoutMs) config.timeoutMs = opts.timeoutMs;
    return config;
  }

  function available() { return !!config.endpoint; }

  function postJSON(url, body) {
    var controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
    var timer = setTimeout(function () { controller && controller.abort(); }, config.timeoutMs);
    return fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: controller ? controller.signal : undefined
    }).then(function (res) {
      clearTimeout(timer);
      if (!res.ok) {
        return res.text().then(function (t) {
          throw new Error('Endpoint returned ' + res.status + ': ' + t.slice(0, 200));
        });
      }
      return res.json();
    }, function (err) {
      clearTimeout(timer);
      throw err;
    });
  }

  function normalise(raw) {
    var out = { reply: '', patch: null, rebuild: false, dislike: null, source: 'ai' };
    if (!raw || typeof raw !== 'object') return null;
    if (typeof raw.reply !== 'string' || !raw.reply.trim()) return null;
    out.reply = raw.reply.trim();
    if (raw.patch && typeof raw.patch === 'object') out.patch = sanitisePatch(raw.patch);
    out.rebuild = !!raw.rebuild;
    if (typeof raw.dislike === 'string') out.dislike = raw.dislike;
    return out;
  }

  /* Never trust a model response straight into state. */
  var MODES = ['minimum', 'base', 'build', 'optimize'];
  function sanitisePatch(p) {
    var clean = {};
    var domainKeys = LifeOS.DOMAINS.map(function (d) { return d.key; });
    if (Array.isArray(p.focus)) {
      clean.focus = p.focus.filter(function (k) { return domainKeys.indexOf(k) !== -1; });
    }
    if (typeof p.mode === 'string' && MODES.indexOf(p.mode) !== -1) clean.mode = p.mode;
    if (typeof p.morningMinutes === 'number') clean.morningMinutes = Math.max(0, Math.min(240, p.morningMinutes | 0));
    if (typeof p.eveningMinutes === 'number') clean.eveningMinutes = Math.max(0, Math.min(300, p.eveningMinutes | 0));
    if (Array.isArray(p.constraints)) {
      clean.constraints = p.constraints.filter(function (c) { return typeof c === 'string'; }).slice(0, 8);
    }
    if (typeof p.struggle === 'string') clean.struggle = p.struggle.slice(0, 120);
    if (typeof p.region === 'string' &&
        LifeOS.REGIONS.some(function (r) { return r.key === p.region; })) clean.region = p.region;
    if (typeof p.noMorningWorkouts === 'boolean') clean.noMorningWorkouts = p.noMorningWorkouts;
    if (typeof p.travelWeek === 'boolean') clean.travelWeek = p.travelWeek;
    if (Array.isArray(p.busyDays)) {
      clean.busyDays = p.busyDays.filter(function (d) { return typeof d === 'number' && d >= 0 && d <= 6; });
    }
    return Object.keys(clean).length ? clean : null;
  }

  /* --------------------------------------------------------------- public */
  function send(messages, context) {
    if (!available()) {
      return Promise.resolve(LifeOS.localBrain.respond(messages, context));
    }
    return postJSON(config.endpoint, { messages: messages, context: context })
      .then(function (data) {
        var ok = normalise(data);
        if (ok) return ok;
        throw new Error('Malformed response from endpoint');
      })
      .catch(function (err) {
        // A backend hiccup must never leave the person staring at an error.
        var local = LifeOS.localBrain.respond(messages, context);
        local.degraded = String(err && err.message || err);
        return local;
      });
  }

  LifeOS.model = {
    configure: configure,
    available: available,
    send: send,
    sanitisePatch: sanitisePatch,
    /* Kept as the documented name from the spec. */
    callLifeOSModel: send
  };

  /* ==================================================================== *
   *  On-device fallback brain.                                            *
   *  Handles the replanning vocabulary without a network call so the demo *
   *  is fully usable before any backend is deployed.                      *
   * ==================================================================== */
  var DAYS_RE = [
    ['monday', 0], ['tuesday', 1], ['wednesday', 2], ['thursday', 3],
    ['friday', 4], ['saturday', 5], ['sunday', 6]
  ];

  function respond(messages, context) {
    var last = '';
    for (var i = messages.length - 1; i >= 0; i--) {
      if (messages[i].role === 'user') { last = messages[i].content; break; }
    }
    var t = String(last || '').toLowerCase();
    var r = function (reply, patch, rebuild, dislike) {
      return { reply: reply, patch: patch || null, rebuild: !!rebuild, dislike: dislike || null, source: 'local' };
    };

    /* --- a specific day got busy ------------------------------------- */
    if (/\b(busy|packed|slammed|swamped|crazy|full|meetings all)\b/.test(t)) {
      var hit = null;
      for (var d = 0; d < DAYS_RE.length; d++) if (t.indexOf(DAYS_RE[d][0]) !== -1) hit = DAYS_RE[d];
      if (hit) {
        var busy = (context.profile.busyDays || []).slice();
        if (busy.indexOf(hit[1]) === -1) busy.push(hit[1]);
        return r('Replanned. ' + cap(hit[0]) + ' now keeps only your essentials — sleep, a walk, your deep work block — ' +
                 'and everything else moved to the rest of the week. Nothing was dropped.',
                 { busyDays: busy }, true);
      }
      return r('Which day? Tell me “Tuesday is busy” and I’ll clear it down to essentials and move the rest.');
    }

    /* --- morning workouts -------------------------------------------- */
    if (/\bmorning\b/.test(t) && /(workout|gym|train|exercise|run|lift|strength|cardio)/.test(t) &&
        /(don'?t|do not|hate|no|not a|can'?t|stop|avoid)/.test(t)) {
      return r('Noted — no morning workouts. Strength, cardio and mobility moved to your evenings. ' +
               'Your morning keeps only light and skincare.', { noMorningWorkouts: true }, true);
    }

    /* --- travel ------------------------------------------------------- */
    if (/(travel|travelling|traveling|on the road|out of town|a trip|flying)/.test(t)) {
      return r('Travel week set. I’ve dropped the things that need your kitchen and your home — meal prep, groceries, ' +
               'laundry, the home reset — and kept sleep, a walk, your check-ins and the people you were going to talk to. ' +
               'Say “back to normal” when you’re home.', { travelWeek: true }, true);
    }
    if (/(back to normal|home again|i'?m back|normal again|base mode)/.test(t)) {
      return r('Back to Base Mode. Your full week is restored.', { travelWeek: false, mode: 'base' }, true);
    }

    /* --- mode changes -------------------------------------------------- */
    if (/(bare minimum|minimum mode|just the essentials|survival|barely|overwhelmed|too much right now)/.test(t)) {
      return r('Switched to Minimum Mode. Life OS is now protecting five things and letting the rest wait: ' +
               'sleep, a walk, food basics, your weekly money check-in and one human contact. ' +
               'Everything else is still tracked — it just isn’t your problem this week.', { mode: 'minimum' }, true);
    }
    if (/(build mode|more capacity|push harder|ramp up|more time now|level up)/.test(t)) {
      return r('Build Mode. I’ve added a third strength session, extra mobility and a second learning block. ' +
               'Tell me if that lands too heavy.', { mode: 'build' }, true);
    }

    /* --- where they are, which decides what is actually in season -------- */
    var PLACES = [
      ['us-ca', /(california|san franc|los angeles|bay area|seattle|portland|oregon|us west|west coast)/],
      ['us-ne', /(new york|nyc|boston|chicago|philadelphia|new england|midwest|us east|east coast)/],
      ['uk',    /(london|uk|england|scotland|wales|ireland|dublin|manchester|britain)/],
      ['in',    /(india|bangalore|bengaluru|mumbai|delhi|hyderabad|chennai|pune|kolkata)/],
      ['au',    /(australia|sydney|melbourne|brisbane|perth|new zealand|auckland)/]
    ];
    if (/(i'?m in|i live in|i am in|based in|moved to|living in)/.test(t) || /^(in )?[a-z ]{3,20}$/.test(t)) {
      for (var pi = 0; pi < PLACES.length; pi++) {
        if (PLACES[pi][1].test(t)) {
          var label = LifeOS.region(PLACES[pi][0]).label;
          return r('Got it — using ' + label + ' for seasonality. The nutrition view now suggests ' +
                   'what is actually in the shops there this month, and the grocery list follows.',
                   { region: PLACES[pi][0] }, true);
        }
      }
    }

    /* --- nutrition variety ---------------------------------------------- */
    if (/(variety|bored|same thing|same food|boring|mix it up)/.test(t) || (/nutrition/.test(t) && /improve|better|more/.test(t))) {
      return r('The nutrition view already rotates through the month — different berry, green, cruciferous, legume ' +
               'and grain each day rather than the same shopping list every week. Open the Nutrition view to see ' +
               'this month’s rotation, and check the grocery list for what to actually buy.', null, true);
    }

    /* --- explain -------------------------------------------------------- */
    if (/^\s*(why|show me why|explain|how come)/.test(t)) {
      var matched = null;
      for (var k = 0; k < LifeOS.ITEMS.length; k++) {
        if (t.indexOf(LifeOS.ITEMS[k].title.toLowerCase()) !== -1) { matched = LifeOS.ITEMS[k]; break; }
      }
      if (matched) return r(LifeOS.planner.explain(matched.id));
      return r('Every item has a domain, a cadence and a mode. Ask about one by name — ' +
               '“why strength session?” — and I’ll show the reasoning behind its slot.');
    }

    /* --- dislike --------------------------------------------------------- */
    if (/(don'?t like|do not like|don'?t want|hate|drop|remove|skip)/.test(t)) {
      for (var j = 0; j < LifeOS.ITEMS.length; j++) {
        if (t.indexOf(LifeOS.ITEMS[j].title.toLowerCase()) !== -1) {
          return r('Dropped “' + LifeOS.ITEMS[j].title + '”. It won’t come back unless you reset.',
                   null, true, LifeOS.ITEMS[j].id);
        }
      }
    }

    /* --- replan ---------------------------------------------------------- */
    if (/(replan|re-plan|rebuild|regenerate|redo|update my plan|new plan)/.test(t)) {
      return r('Rebuilt from your current profile.', null, true);
    }

    /* --- what should I do today ------------------------------------------ */
    if (/(today|right now|this morning|what should i do)/.test(t)) {
      return r('Scroll to Today — it holds only what is actually due today, plus your daily anchors. ' +
               'Everything else is deliberately out of sight until it matters.');
    }

    /* --- honest fallback --------------------------------------------------- */
    return r('I’m running the on-device planner right now, so I handle a fixed set of changes: ' +
             '“Tuesday is busy”, “no morning workouts”, “I’m travelling next week”, “bare minimum for two weeks”, ' +
             '“why strength session?”, or “drop the hobby block”. ' +
             'Connect a model endpoint (see the README) and I can handle anything you type.');
  }

  function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

  /* ------------------------------------------------------------- digest
   * "Tell me everything in one go." Splits a paragraph into clauses, runs each
   * through the same matchers a single message uses, and merges every patch it
   * finds — so one long sentence (spoken or typed) can set your region, block
   * out a day, move your workouts and drop something, all at once.
   */
  function digest(text, context) {
    // Split on every clause boundary, commas included. Only splitting before
    // conjunctions swallowed whole clauses: "I'm in London, Tuesdays are busy,
    // I don't like morning workouts" came through as one part and only the
    // first match survived.
    var parts = String(text || '')
      .split(/[.;!?\n]+|,\s*/)
      .map(function (x) { return x.replace(/^(and|also|plus|but|then)\s+/i, '').trim(); })
      .filter(function (x) { return x.length > 3; });

    var patch = null, dislikes = [], lines = [], rebuild = false, unmatched = 0;

    parts.forEach(function (part) {
      var r = respond([{ role: 'user', content: part }], context);
      var understood = !!(r.patch || r.dislike || r.rebuild);
      if (!understood) { unmatched++; return; }
      if (r.patch) {
        patch = patch || {};
        Object.keys(r.patch).forEach(function (k) { patch[k] = r.patch[k]; });
      }
      if (r.dislike) dislikes.push(r.dislike);
      if (r.rebuild) rebuild = true;
      var first = r.reply.split(/(?<=\.)\s/)[0] || r.reply;
      if (first.length < 24) first = r.reply.slice(0, 110);
      lines.push('• ' + first.trim());
    });

    if (!lines.length) {
      return {
        reply: 'I did not catch anything I know how to act on. Try naming a day, a place, ' +
               'a mode, or something to drop — “Tuesdays are busy, I am in London, no morning ' +
               'workouts, bare minimum for two weeks”.',
        patch: null, rebuild: false, dislike: null, source: 'local'
      };
    }

    var reply = 'Picked up ' + lines.length + (lines.length === 1 ? ' change' : ' changes') +
                ':\n' + lines.join('\n');
    if (unmatched) reply += '\n(' + unmatched + ' bit' + (unmatched > 1 ? 's' : '') +
                            ' I could not act on — the on-device planner only knows a fixed vocabulary.)';

    return { reply: reply, patch: patch, rebuild: rebuild,
             dislike: dislikes.length ? dislikes[0] : null,
             dislikes: dislikes, source: 'local' };
  }

  LifeOS.localBrain = LifeOS.localBrain || {};

  LifeOS.localBrain.respond = respond;
  LifeOS.localBrain.digest = digest;
})(window);
