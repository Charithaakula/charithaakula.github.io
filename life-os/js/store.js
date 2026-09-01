/* Life OS — lightweight memory.
 * Deliberately small: preferences, mode, available time, selected domains,
 * the generated plan, dislikes, and recent replanning decisions. Nothing else.
 * Everything stays in this browser; there is no account and no server copy.
 */
(function (root) {
  var LifeOS = (root.LifeOS = root.LifeOS || {});
  var KEY = 'lifeos.v1';

  function defaults() {
    return {
      onboarded: false,
      profile: {
        focus: [],            // domain keys the person cares about most
        mode: 'base',         // minimum | base | build | optimize
        morningMinutes: 30,
        eveningMinutes: 60,
        constraints: [],      // 'vegan' | 'dairyfree' | 'glutenfree' | 'nutallergy' | 'knee' | ...
        constraintNotes: '',
        struggle: '',         // the thing they cannot keep consistent
        noMorningWorkouts: false,
        travelWeek: false,
        busyDays: [],         // 0 = Monday
        moves: {},            // itemId -> [dayIdx] set by dragging; overrides the cadence
        region: 'us-ca',      // drives which produce is in season
        custom: [],           // items the person added themselves
        edits: {},            // itemId -> { title, minutes, cadence } overrides
        foods: { removed: [], added: {} },   // per-category food edits
        grouped: true,        // collapse related domains into families
        openGroups: []        // group keys expanded while collapsed
      },
      dislikes: [],           // item ids the person has pushed back on
      decisions: [],          // { at, text } — recent replanning decisions
      plan: null,             // last generated plan
      feedback: null
    };
  }

  var state = null;

  function read() {
    if (state) return state;
    try {
      var raw = root.localStorage && root.localStorage.getItem(KEY);
      state = raw ? merge(defaults(), JSON.parse(raw)) : defaults();
    } catch (e) {
      state = defaults();
    }
    return state;
  }

  function merge(base, incoming) {
    if (!incoming || typeof incoming !== 'object') return base;
    Object.keys(incoming).forEach(function (k) {
      var v = incoming[k];
      if (v && typeof v === 'object' && !Array.isArray(v) && base[k] && typeof base[k] === 'object' && !Array.isArray(base[k])) {
        base[k] = merge(base[k], v);
      } else if (v !== undefined) {
        base[k] = v;
      }
    });
    return base;
  }

  function write() {
    try {
      root.localStorage && root.localStorage.setItem(KEY, JSON.stringify(state));
    } catch (e) { /* private browsing, quota — the demo still works in memory */ }
  }

  LifeOS.store = {
    get: function () { return read(); },
    profile: function () { return read().profile; },

    update: function (patch) {
      var s = read();
      merge(s, patch || {});
      write();
      return s;
    },

    updateProfile: function (patch) {
      var s = read();
      merge(s.profile, patch || {});
      write();
      return s.profile;
    },

    setPlan: function (plan) {
      var s = read();
      s.plan = plan;
      s.onboarded = true;
      write();
      return plan;
    },

    /* Dragging an item to another day. Replaces just the occurrence that moved,
     * so a 2x/week item stays 2x/week — it just lands somewhere else. */
    moveItem: function (itemId, fromDay, toDay, currentDays) {
      var s = read();
      var days = (s.profile.moves[itemId] || currentDays || []).slice();
      var i = days.indexOf(fromDay);
      if (i === -1) days.push(toDay); else days[i] = toDay;
      // de-dupe, keep order stable
      var seen = {}, out = [];
      days.forEach(function (d) { if (!seen[d]) { seen[d] = 1; out.push(d); } });
      s.profile.moves[itemId] = out.sort(function (a, b) { return a - b; });
      write();
      return s.profile.moves[itemId];
    },

    toggleGroup: function (key) {
      var s = read();
      var i = s.profile.openGroups.indexOf(key);
      if (i === -1) s.profile.openGroups.push(key); else s.profile.openGroups.splice(i, 1);
      write();
      return s.profile.openGroups;
    },

    /* ---- editing the recommendations themselves ------------------------ */
    addCustom: function (item) {
      var s = read();
      var id = 'custom-' + (Date.now().toString(36)) + '-' + Math.floor(Math.random() * 1000);
      s.profile.custom.push({
        id: id,
        domain: item.domain,
        type: item.type || 'DO',
        title: String(item.title || 'Untitled').slice(0, 80),
        detail: String(item.detail || '').slice(0, 160),
        minutes: item.minutes ? Math.max(0, Math.min(600, item.minutes | 0)) : null,
        cad: item.cad || { unit: 'week' },
        modes: ['base', 'build', 'optimize'],
        custom: true
      });
      write();
      return id;
    },

    removeCustom: function (id) {
      var s = read();
      s.profile.custom = s.profile.custom.filter(function (c) { return c.id !== id; });
      write();
    },

    /* Set the exact weekdays for an item. Same override dragging writes, so the
     * grid, the month strip and the exports all stay one truth. */
    setDays: function (id, days) {
      var s = read();
      var clean = [];
      (days || []).forEach(function (d) {
        d = d | 0;
        if (d >= 0 && d <= 6 && clean.indexOf(d) === -1) clean.push(d);
      });
      s.profile.moves[id] = clean.sort(function (a, b) { return a - b; });
      write();
      return s.profile.moves[id];
    },

    editItem: function (id, patch) {
      var s = read();
      var cur = s.profile.edits[id] || {};
      if (patch.title != null)   cur.title = String(patch.title).slice(0, 80);
      if (patch.minutes != null) cur.minutes = Math.max(0, Math.min(600, patch.minutes | 0));
      if (patch.cad != null)     cur.cad = patch.cad;
      s.profile.edits[id] = cur;
      write();
      return cur;
    },

    resetItem: function (id) {
      var s = read();
      delete s.profile.edits[id];
      write();
    },

    /* ---- food edits, so the checklist is yours rather than a book's ----- */
    removeFood: function (name) {
      var s = read();
      if (s.profile.foods.removed.indexOf(name) === -1) s.profile.foods.removed.push(name);
      write();
    },

    restoreFood: function (name) {
      var s = read();
      s.profile.foods.removed = s.profile.foods.removed.filter(function (f) { return f !== name; });
      write();
    },

    addFood: function (category, name) {
      var s = read();
      var list = (s.profile.foods.added[category] = s.profile.foods.added[category] || []);
      name = String(name).slice(0, 40).trim();
      if (name && list.indexOf(name) === -1) list.push(name);
      write();
    },

    clearMoves: function () {
      var s = read();
      s.profile.moves = {};
      write();
    },

    dislike: function (itemId) {
      var s = read();
      if (s.dislikes.indexOf(itemId) === -1) s.dislikes.push(itemId);
      write();
    },

    remember: function (text) {
      var s = read();
      s.decisions.unshift({ at: new Date().toISOString(), text: String(text).slice(0, 200) });
      s.decisions = s.decisions.slice(0, 8);
      write();
      return s.decisions;
    },

    /* Compact context handed to the model — small enough to send every turn. */
    context: function () {
      var s = read();
      return {
        profile: s.profile,
        dislikes: s.dislikes,
        recentDecisions: s.decisions.map(function (d) { return d.text; }),
        hasPlan: !!s.plan,
        today: new Date().toISOString().slice(0, 10)
      };
    },

    reset: function () {
      state = defaults();
      try { root.localStorage && root.localStorage.removeItem(KEY); } catch (e) {}
      return state;
    }
  };
})(window);
