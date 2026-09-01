/* Life OS — deterministic planning engine.
 *
 * This is the part that does the actual work: it takes a small profile and
 * turns the catalog into Today / This Week / This Month / Not Now, a weekly
 * calendar, a nutrition rotation, and a coverage dashboard.
 *
 * It runs entirely in the browser with no network call. The language model
 * (see model.js) sits on top of this to interpret messy human input and to
 * explain decisions — it is not required for the plan to exist.
 */
(function (root) {
  var LifeOS = (root.LifeOS = root.LifeOS || {});
  var MONTHS = ['January','February','March','April','May','June','July',
                'August','September','October','November','December'];

  /* ------------------------------------------------------------ dates */
  function startOfDay(d) { return new Date(d.getFullYear(), d.getMonth(), d.getDate()); }
  function dayIndex(d) { return (d.getDay() + 6) % 7; }              // 0 = Monday
  function mondayOf(d) {
    var m = startOfDay(d);
    m.setDate(m.getDate() - dayIndex(m));
    return m;
  }
  function addDays(d, n) { var x = new Date(d.getTime()); x.setDate(x.getDate() + n); return x; }
  function sameMonth(a, b) { return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth(); }
  function daysInMonth(d) { return new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate(); }
  function weekIndex(d) { return Math.floor(mondayOf(d).getTime() / 604800000); }
  function nthWeekdayOfMonth(year, month, weekday, nth) {
    // weekday: 0 = Monday
    var first = new Date(year, month, 1);
    var offset = (weekday - dayIndex(first) + 7) % 7;
    return new Date(year, month, 1 + offset + (nth - 1) * 7);
  }
  function fmtDate(d) { return MONTHS[d.getMonth()].slice(0, 3) + ' ' + d.getDate(); }

  /* ------------------------------------------------- the effective catalog
   * The shipped list, plus anything the person added, with their per-item
   * edits applied. Every read of the catalog goes through here so an edit
   * shows up in the grid, the month view and the year ring at once.
   */
  function allItems(profile) {
    var edits = (profile && profile.edits) || {};
    var custom = (profile && profile.custom) || [];
    var base = LifeOS.ITEMS.concat(custom);
    if (!Object.keys(edits).length) return base;

    return base.map(function (it) {
      var e = edits[it.id];
      if (!e) return it;
      var copy = {};
      for (var k in it) if (Object.prototype.hasOwnProperty.call(it, k)) copy[k] = it[k];
      if (e.title != null) copy.title = e.title;
      if (e.minutes != null) copy.minutes = e.minutes;
      if (e.cad != null) copy.cad = e.cad;
      copy.edited = true;
      return copy;
    });
  }

  /* --------------------------------------------------- item eligibility */
  var MODE_ORDER = ['minimum', 'base', 'build', 'optimize'];

  function effectiveMode(profile) {
    // Travelling collapses the week to essentials without losing the plan.
    return profile.travelWeek ? 'minimum' : (profile.mode || 'base');
  }

  var OPTIONAL = null;
  function isOptional(domainKey) {
    if (!OPTIONAL) {
      OPTIONAL = {};
      LifeOS.DOMAINS.forEach(function (d) { if (d.optional) OPTIONAL[d.key] = true; });
    }
    return !!OPTIONAL[domainKey];
  }

  function keepsItem(item, profile, dislikes) {
    if (dislikes && dislikes.indexOf(item.id) !== -1) return false;

    // Something you added yourself is always in. Adding it *was* the act of
    // choosing it — it should not then be filtered out by focus or mode.
    if (item.custom) return true;

    var mode = effectiveMode(profile);
    var inMode = item.modes.indexOf(mode) !== -1;
    var isEssential = item.modes.indexOf('minimum') !== -1;
    var focus = profile.focus || [];

    // Travel and pets are opt-in. "Everything" must not hand someone a dog.
    if (isOptional(item.domain) && focus.indexOf(item.domain) === -1) return false;

    // Areas the person did not pick still keep their minimum, so nothing
    // silently disappears from their life just because they didn't mention it.
    var focused = focus.length === 0 || focus.indexOf(item.domain) !== -1;
    if (!focused) return isEssential;

    if (!inMode) return false;

    // Travel weeks drop the things that need a kitchen and a home.
    if (profile.travelWeek && ['n-mealprep','n-groceries','h-laundry','h-reset','h-deep','h-sheets'].indexOf(item.id) !== -1) {
      return false;
    }
    return true;
  }

  /* --------------------------------------- which weekdays an item lands on */
  function weekdaysFor(item, today, profile) {
    // A day the person dragged this to wins over anything computed.
    var moves = (profile && profile.moves) || null;
    if (moves && moves[item.id]) return moves[item.id].slice();

    var c = item.cad;
    if (c.unit === 'day') return c.weekdaysOnly ? [0, 1, 2, 3, 4] : [0, 1, 2, 3, 4, 5, 6];
    if (c.unit === 'week') {
      if (typeof c.times === 'number') {
        // The offset interleaves sessions so strength and cardio don't stack
        // on the same two days of the week.
        var off = c.offset || 0;
        return (LifeOS.SPREAD[c.times] || [0]).map(function (d) { return (d + off) % 7; });
      }
      return [typeof c.dayOfWeek === 'number' ? c.dayOfWeek : 4];
    }
    if (c.unit === 'weeks') {
      // Every n weeks — only lands in weeks where the index lines up.
      var on = weekIndex(today) % (c.n || 2) === 0;
      return on ? [typeof c.dayOfWeek === 'number' ? c.dayOfWeek : 5] : [];
    }
    return []; // monthly and longer are handled by nextDue()
  }

  /* ---------------------------------------- next due date for slow cadences */
  function anchorsFor(item) {
    var c = item.cad;
    if (c.anchorMonths) return c.anchorMonths;
    if (c.unit === 'quarter') return [2, 5, 8, 11];
    return null;
  }

  function nextDue(item, today) {
    var c = item.cad;
    if (c.unit === 'month') {
      var d = nthWeekdayOfMonth(today.getFullYear(), today.getMonth(), 5, 1); // first Saturday
      if (d < today) d = nthWeekdayOfMonth(today.getFullYear(), today.getMonth() + 1, 5, 1);
      return d;
    }
    if (c.unit === 'weeks') {
      // An off week — find the next week whose index lines up.
      var n = c.n || 2;
      var wi = weekIndex(today);
      var ahead = (n - (wi % n)) % n || n;
      var day = typeof c.dayOfWeek === 'number' ? c.dayOfWeek : 5;
      return addDays(mondayOf(today), ahead * 7 + day);
    }
    var anchors = anchorsFor(item);
    if (!anchors) return null;
    for (var year = today.getFullYear(); year <= today.getFullYear() + 1; year++) {
      for (var i = 0; i < anchors.length; i++) {
        var cand = new Date(year, anchors[i], 15);
        if (sameMonth(cand, today) || cand >= today) return cand;
      }
    }
    return null;
  }

  /* --------------------------------------------------------- slot shifting */
  function slotFor(item, profile) {
    var slot = item.slot || 'anytime';
    if (profile.noMorningWorkouts && slot === 'morning' &&
        ['strength', 'cardio', 'mobility'].indexOf(item.domain) !== -1) {
      return 'evening';
    }
    if (slot === 'morning' && (profile.morningMinutes || 0) < (item.minutes || 0)) {
      return 'evening';
    }
    return slot;
  }

  /* ------------------------------------------------------------- the plan */
  function build(profileIn, dislikes, todayIn) {
    var profile = profileIn || {};
    var today = startOfDay(todayIn || new Date());
    var monday = mondayOf(today);
    var todayIdx = dayIndex(today);
    var busy = profile.busyDays || [];

    var items = allItems(profile).filter(function (it) { return keepsItem(it, profile, dislikes); });

    var todayList = [], weekList = [], monthList = [], notNow = [];
    var anchors = [];   // daily rhythm — shown once, not repeated as tasks
    var eatToday = [];  // CONSUME items fold into one line, not fifteen
    var grid = {}; // grid[dayIdx][slot] = [entries]
    for (var d = 0; d < 7; d++) {
      grid[d] = {};
      LifeOS.SLOTS.forEach(function (s) { grid[d][s.key] = []; });
    }

    // matrix[domain][dayIdx] — the coverage read: which areas of life actually
    // get touched on which days. Includes CONSUME, which the calendar omits.
    var matrix = {};
    LifeOS.DOMAINS.forEach(function (dom) {
      matrix[dom.key] = [[], [], [], [], [], [], []];
    });

    items.forEach(function (item) {
      var days = weekdaysFor(item, today, profile);

      if (days.length) {
        // A busy day sheds everything that is not a minimum-mode essential.
        var essential = item.modes.indexOf('minimum') !== -1;
        days = days.filter(function (dayIdx) {
          return essential || busy.indexOf(dayIdx) === -1;
        });
        if (!days.length && !essential) {
          // Move it to the first non-busy day instead of dropping it.
          for (var alt = 0; alt < 7; alt++) {
            if (busy.indexOf(alt) === -1) { days = [alt]; break; }
          }
        }

        var slot = slotFor(item, profile);
        var landsToday = days.indexOf(todayIdx) !== -1;

        if (matrix[item.domain]) {
          days.forEach(function (dayIdx) {
            matrix[item.domain][dayIdx].push({
              id: item.id, title: item.title, minutes: item.minutes || null, type: item.type
            });
          });
        }

        // Food is not a calendar event. It rides along with meals you already
        // eat, so it lives in the nutrition view instead of the week grid.
        if (item.type === 'CONSUME') {
          if (landsToday) eatToday.push(item.title);
          return;
        }

        days.forEach(function (dayIdx) {
          grid[dayIdx][slot === 'anytime' ? 'workday' : slot].push({
            id: item.id, title: item.title, domain: item.domain, minutes: item.minutes || null
          });
        });

        var entry = {
          id: item.id, title: item.title, detail: item.detail || '', domain: item.domain,
          type: item.type, slot: slot, minutes: item.minutes || null,
          days: days.map(function (i) { return LifeOS.DAYS[i]; })
        };

        // Things that happen every single day are rhythm, not a to-do list.
        if (item.cad.unit === 'day') {
          if (landsToday) anchors.push(entry);
          return;
        }

        if (landsToday) todayList.push(entry);
        else weekList.push(entry);
        return;
      }

      var due = nextDue(item, today);
      if (!due) return;
      // Slow cadences get a month, not an invented day — six things all claiming
      // "Sep 15" reads as fake precision.
      var vague = ['quarter', 'halfyear', 'year'].indexOf(item.cad.unit) !== -1;
      var row = {
        id: item.id, title: item.title, detail: item.detail || '', domain: item.domain,
        type: item.type, due: due.toISOString().slice(0, 10),
        dueLabel: vague ? MONTHS[due.getMonth()] : fmtDate(due)
      };
      // A monthly rhythm belongs in "This Month" even when this month's slot has
      // already passed — it is recurring, not overdue.
      if (sameMonth(due, today) || item.cad.unit === 'month') monthList.push(row);
      else { row.dueLabel = MONTHS[due.getMonth()]; notNow.push(row); }
    });

    notNow.sort(function (a, b) { return a.due < b.due ? -1 : 1; });
    monthList.sort(function (a, b) { return a.due < b.due ? -1 : 1; });

    var mxRows = matrixRows(matrix, profile);
    var touched = {};
    mxRows.forEach(function (r) { touched[r.domain] = r.activeDays; });

    return {
      generatedAt: new Date().toISOString(),
      mode: effectiveMode(profile),
      declaredMode: profile.mode || 'base',
      weekOf: monday.toISOString().slice(0, 10),
      todayName: LifeOS.DAYS[todayIdx],
      today: todayList,
      week: weekList,
      month: monthList,
      notNow: notNow,
      calendar: grid,
      matrix: mxRows,
      groups: groupRows(mxRows),
      load: weekLoad(mxRows),
      anchors: anchors,
      eatToday: eatToday,
      priorities: priorities(todayList.concat(weekList), profile),
      coverage: coverage(items, profile, mxRows),
      nutrition: nutritionMonth(profile, today),
      groceries: groceries(profile, today)
    };
  }

  /* ------------------------------------------------------- coverage matrix
   * Domains down the side, days across the top. Answers a question the
   * calendar cannot: which parts of my life go untouched all week?
   */
  function matrixRows(matrix, profile) {
    var focus = profile.focus || [];
    var rows = [];
    LifeOS.DOMAINS.forEach(function (dom) {
      if (dom.optional && focus.indexOf(dom.key) === -1) return;
      var days = matrix[dom.key];
      var activeDays = days.filter(function (d) { return d.length; }).length;
      // Eleven food categories a day is not eleven tasks. Counting only the
      // things that cost time keeps the numbers comparable across domains.
      var timed = days.map(function (d) {
        return d.filter(function (e) { return e.type !== 'CONSUME'; }).length;
      });
      // If every day holds the same set, this is a rhythm rather than a
      // schedule — say it once instead of printing it seven times.
      var sig = days.map(function (d) {
        return d.map(function (e) { return e.id; }).sort().join('|');
      });
      var everyday = activeDays === 7 && sig.every(function (x) { return x === sig[0]; });

      rows.push({
        domain: dom.key,
        label: dom.label,
        days: days,
        timed: timed,
        activeDays: activeDays,
        everyday: everyday,
        gap: activeDays === 0
      });
    });
    // Busiest domains first, untouched ones last — the gaps read as a group.
    rows.sort(function (a, b) { return b.activeDays - a.activeDays; });
    return rows;
  }

  /* --------------------------------------------------------- grouped rows
   * Families of domains, merged. For a family whose members compete for the
   * same slot (one training window, one free evening), two timed items on the
   * same day is a genuine clash — that is the signal collapsing buys you.
   */
  var SUBSTANTIAL = 30;   // minutes before something needs its own slot

  function groupRows(rows) {
    var byGroup = {};
    rows.forEach(function (r) {
      var g = (LifeOS.domain(r.domain).group) || 'upkeep';
      (byGroup[g] = byGroup[g] || []).push(r);
    });

    var out = [];
    LifeOS.GROUPS.forEach(function (meta) {
      var members = byGroup[meta.key];
      if (!members || !members.length) return;

      var days = [], timed = [], clash = [];
      for (var i = 0; i < 7; i++) {
        var merged = [];
        members.forEach(function (m) {
          m.days[i].forEach(function (e) {
            merged.push({ id: e.id, title: e.title, minutes: e.minutes, type: e.type, domain: m.domain });
          });
        });
        var t = merged.filter(function (e) { return e.type !== 'CONSUME'; }).length;
        // A clash is not "two things" — a 20-minute walk and a 2-minute desk
        // reset sit alongside a workout perfectly well. It is two things that
        // each want a real block of time.
        var big = merged.filter(function (e) { return (e.minutes || 0) >= SUBSTANTIAL; });
        days.push(merged);
        timed.push(t);
        clash.push(meta.competes && big.length > 1);
      }

      var activeDays = days.filter(function (d) { return d.length; }).length;
      var sig = days.map(function (d) {
        return d.map(function (e) { return e.id; }).sort().join('|');
      });

      out.push({
        group: meta.key,
        label: meta.label,
        competes: !!meta.competes,
        note: meta.note || '',
        members: members,
        days: days,
        timed: timed,
        clash: clash,
        clashes: clash.filter(Boolean).length,
        activeDays: activeDays,
        everyday: activeDays === 7 && sig.every(function (x) { return x === sig[0]; }),
        gap: activeDays === 0
      });
    });

    out.sort(function (a, b) { return b.activeDays - a.activeDays; });
    return out;
  }

  /* ------------------------------------------- "what this means this week" */
  function priorities(entries, profile) {
    var focus = profile.focus || [];
    var scored = entries.map(function (e) {
      var score = 0;
      if (focus.indexOf(e.domain) !== -1) score += 3;
      if (e.type === 'DO') score += 2;
      if (e.type === 'REVIEW') score += 1;
      if (e.minutes && e.minutes >= 45) score += 1;
      return { e: e, score: score };
    });
    scored.sort(function (a, b) { return b.score - a.score; });
    var seen = {}, out = [];
    for (var i = 0; i < scored.length && out.length < 5; i++) {
      var e = scored[i].e;
      if (seen[e.domain] && out.length > 2) continue;
      seen[e.domain] = true;
      out.push({
        title: e.title,
        domain: e.domain,
        note: e.days ? e.days.slice(0, 3).join(', ') : (e.dueLabel || '')
      });
    }
    return out;
  }

  /* ----------------------------------------------------- coverage dashboard */
  function coverage(items, profile, mxRows) {
    var touched = {};
    (mxRows || []).forEach(function (r) { touched[r.domain] = r.activeDays; });
    var focus = profile.focus || [];
    var struggle = (profile.struggle || '').toLowerCase();
    var mode = effectiveMode(profile);
    var byDomain = {};
    items.forEach(function (it) { (byDomain[it.domain] = byDomain[it.domain] || []).push(it); });

    // What the domain *could* hold at this mode, ignoring which areas were picked.
    var possible = {};
    allItems(profile).forEach(function (it) {
      if (it.modes.indexOf(mode) !== -1) possible[it.domain] = (possible[it.domain] || 0) + 1;
    });

    return LifeOS.DOMAINS.filter(function (dom) {
      // Travel and pets only apply to some people. Showing them as "Missing"
      // to everyone else is noise, not a gap.
      return !dom.optional || focus.indexOf(dom.key) !== -1;
    }).map(function (dom) {
      var mine = byDomain[dom.key] || [];
      var full = mine.length >= (possible[dom.key] || 0);
      var status;
      if (!mine.length) status = 'missing';
      else if (struggle && (struggle.indexOf(dom.key) !== -1 || struggle.indexOf(dom.label.toLowerCase()) !== -1)) status = 'attention';
      else if (full) status = 'ontrack';
      else if (focus.length && focus.indexOf(dom.key) === -1) status = 'low';
      else status = 'ontrack';

      return {
        domain: dom.key,
        label: dom.label,
        minimum: dom.minimum,
        status: status,
        count: mine.length,
        // Share of the week this domain is actually touched — a real number,
        // not a percentage of an arbitrary catalog.
        days: touched[dom.key] || 0,
        pct: Math.round(100 * (touched[dom.key] || 0) / 7),
        next: status === 'missing' ? 'Nothing scheduled — add it when you have room'
            : status === 'attention' ? dom.next
            : status === 'low' ? 'Holding the minimum only'
            : dom.next
      };
    });
  }

  var STATUS_LABEL = { ontrack: 'On track', attention: 'Needs attention', low: 'Minimum only', missing: 'Missing' };
  LifeOS.statusLabel = function (s) { return STATUS_LABEL[s] || s; };

  /* --------------------------------------------------- nutrition rotation */
  function applySwaps(list, constraints) {
    var swaps = LifeOS.NUTRITION.swaps;
    return list.map(function (line) {
      for (var i = 0; i < (constraints || []).length; i++) {
        var table = swaps[constraints[i]];
        if (table && table[line]) return table[line];
      }
      return line;
    });
  }

  function nutritionMonth(profile, today) {
    var region = (profile && profile.region) || 'us-ca';
    var monthIdx = today.getMonth();
    var season = LifeOS.inSeason(region, monthIdx);
    var total = daysInMonth(today);

    var foods = (profile && profile.foods) || { removed: [], added: {} };
    function pool(cat) {
      var listed = (season[cat] && season[cat].length) ? season[cat]
                 : (LifeOS.PANTRY[cat] || LifeOS.GENERIC[cat] || []);
      var mine = (foods.added && foods.added[cat]) || [];
      var out = listed.concat(mine).filter(function (f) {
        return (foods.removed || []).indexOf(f) === -1;
      });
      return out.length ? out : ['—'];
    }

    // Three rotating tracks so a month reads as variety rather than repetition.
    // Each track walks its own pool, so nothing repeats until it has to.
    var tracks = [
      ['berries', 'fruit'],
      ['greens', 'cruciferous', 'veg'],
      ['beans', 'grains', 'nuts']
    ];

    var days = [];
    for (var dn = 1; dn <= total; dn++) {
      var chips = tracks.map(function (track, ti) {
        var cat = track[(dn - 1 + ti) % track.length];
        var options = pool(cat);
        return {
          label: options[(dn - 1) % options.length],
          category: cat,
          seasonal: !!(season[cat] && season[cat].length)
        };
      });
      days.push({ day: dn, today: dn === today.getDate(), chips: chips });
    }

    return {
      month: MONTHS[monthIdx],
      monthIdx: monthIdx,
      region: region,
      regionLabel: LifeOS.region(region).label,
      season: season,
      base: applySwaps(LifeOS.NUTRITION.dailyBase.slice(), profile.constraints),
      days: days,
      note: LifeOS.DOZEN_NOTE,
      source: LifeOS.NUTRITION.source
    };
  }

  /* --------------------------------------------------------- grocery list */
  function groceries(profile, today) {
    var region = (profile && profile.region) || 'us-ca';
    var season = LifeOS.inSeason(region, today.getMonth());
    var week = weekIndex(today);
    var out = [];
    ['berries', 'fruit', 'greens', 'cruciferous', 'veg'].forEach(function (cat) {
      var list = (season[cat] && season[cat].length) ? season[cat] : (LifeOS.GENERIC[cat] || []);
      if (list.length) out.push({ name: list[week % list.length], seasonal: !!(season[cat] && season[cat].length) });
    });
    ['beans', 'grains', 'nuts'].forEach(function (cat) {
      var list = LifeOS.PANTRY[cat] || [];
      if (list.length) out.push({ name: list[week % list.length], seasonal: false });
    });
    return out;
  }

  /* ---------------------------------------------- one domain, a whole month
   * The grid answers the week. This answers the month: which days of the
   * month does this area of life actually land on?
   */
  function monthFor(domainKey, profile, dislikes, todayIn) {
    var today = startOfDay(todayIn || new Date());
    var total = daysInMonth(today);
    var first = new Date(today.getFullYear(), today.getMonth(), 1);
    var mine = allItems(profile).filter(function (it) {
      return it.domain === domainKey && keepsItem(it, profile || {}, dislikes);
    });

    var days = [];
    for (var dn = 1; dn <= total; dn++) {
      var date = new Date(today.getFullYear(), today.getMonth(), dn);
      var dow = dayIndex(date);
      var entries = [];

      mine.forEach(function (item) {
        var c = item.cad;
        if (c.unit === 'day') {
          if (!c.weekdaysOnly || dow < 5) entries.push(item);
        } else if (c.unit === 'week') {
          if (weekdaysFor(item, date, profile).indexOf(dow) !== -1) entries.push(item);
        } else if (c.unit === 'weeks') {
          if (weekIndex(date) % (c.n || 2) === 0 &&
              (typeof c.dayOfWeek === 'number' ? c.dayOfWeek : 5) === dow) entries.push(item);
        } else {
          var due = nextDue(item, first);
          if (due && sameMonth(due, today) && due.getDate() === dn) entries.push(item);
        }
      });

      days.push({
        day: dn, dow: dow, today: dn === today.getDate(),
        entries: entries.map(function (e) { return { id: e.id, title: e.title, type: e.type }; })
      });
    }
    return { month: MONTHS[today.getMonth()], days: days, items: mine };
  }

  /* ---------------------------------------------------------- week load
   * Minutes per domain per day. Food carries no minutes on purpose — it rides
   * along with meals you already eat, so it is not "time spent".
   */
  function weekLoad(mxRows) {
    var days = [];
    for (var i = 0; i < 7; i++) {
      var segs = {}, total = 0;
      mxRows.forEach(function (row) {
        row.days[i].forEach(function (e) {
          if (!e.minutes) return;
          segs[row.domain] = (segs[row.domain] || 0) + e.minutes;
          total += e.minutes;
        });
      });
      days.push({
        day: LifeOS.DAYS[i],
        total: total,
        segments: Object.keys(segs).map(function (k) { return { domain: k, minutes: segs[k] }; })
                        .sort(function (a, b) { return b.minutes - a.minutes; })
      });
    }
    var peak = days.reduce(function (m, d) { return Math.max(m, d.total); }, 0);
    return { days: days, peak: peak };
  }

  /* --------------------------------------------- every domain, one month */
  function monthAll(profile, dislikes, todayIn) {
    var today = startOfDay(todayIn || new Date());
    var total = daysInMonth(today);
    var first = new Date(today.getFullYear(), today.getMonth(), 1);
    var kept = allItems(profile).filter(function (it) { return keepsItem(it, profile || {}, dislikes); });
    var days = [];

    for (var dn = 1; dn <= total; dn++) {
      var date = new Date(today.getFullYear(), today.getMonth(), dn);
      var dow = dayIndex(date);
      var doms = {}, oneOffs = [];

      kept.forEach(function (item) {
        var c = item.cad, hit = false;
        if (c.unit === 'day') hit = !c.weekdaysOnly || dow < 5;
        else if (c.unit === 'week') hit = weekdaysFor(item, date, profile).indexOf(dow) !== -1;
        else if (c.unit === 'weeks') hit = weekIndex(date) % (c.n || 2) === 0 &&
          (typeof c.dayOfWeek === 'number' ? c.dayOfWeek : 5) === dow;
        else {
          var due = nextDue(item, first);
          if (due && sameMonth(due, today) && due.getDate() === dn) {
            hit = true;
            oneOffs.push({ id: item.id, title: item.title, domain: item.domain });
          }
        }
        if (hit && item.type !== 'CONSUME') doms[item.domain] = (doms[item.domain] || 0) + 1;
      });

      days.push({
        day: dn, dow: dow, today: dn === today.getDate(),
        domains: Object.keys(doms).map(function (k) { return { domain: k, n: doms[k] }; }),
        oneOffs: oneOffs
      });
    }
    return { month: MONTHS[today.getMonth()], year: today.getFullYear(), days: days };
  }

  /* ------------------------------------------------------- the year ahead */
  function yearMap(profile, dislikes, todayIn) {
    var today = startOfDay(todayIn || new Date());
    var kept = allItems(profile).filter(function (it) { return keepsItem(it, profile || {}, dislikes); });
    var months = [];
    for (var m = 0; m < 12; m++) {
      months.push({ index: m, label: MONTHS[m], short: MONTHS[m].slice(0, 3), items: [] });
    }

    kept.forEach(function (item) {
      var c = item.cad;
      if (['quarter', 'halfyear', 'year'].indexOf(c.unit) === -1) return;
      var anchors = anchorsFor(item);
      if (!anchors) return;
      anchors.forEach(function (mi) {
        months[mi].items.push({
          id: item.id, title: item.title, domain: item.domain, cadence: describeCadence(c)
        });
      });
    });

    var cur = today.getMonth();
    months.forEach(function (mo) {
      mo.isCurrent = mo.index === cur;
      mo.ahead = (mo.index - cur + 12) % 12;
    });
    return { months: months, currentMonth: cur, currentLabel: MONTHS[cur] };
  }

  /* ------------------------------------------------------------- explain */
  function explain(itemId, profile) {
    var list = allItems(profile);
    for (var i = 0; i < list.length; i++) {
      var it = list[i];
      if (it.id !== itemId) continue;
      var cadence = describeCadence(it.cad);
      var base = '“' + it.title + '” is ' + cadence + ' because it sits in ' +
                 LifeOS.domain(it.domain).label + ' at ' +
                 (it.modes.indexOf('minimum') !== -1 ? 'essential' : 'standard') + ' priority.';
      return it.why ? base + ' ' + it.why : base;
    }
    return null;
  }

  function describeCadence(c) {
    if (c.unit === 'day') return c.weekdaysOnly ? 'on your work days' : 'a daily anchor';
    if (c.unit === 'week' && c.times) return c.times + '× per week';
    if (c.unit === 'week') return 'once a week';
    if (c.unit === 'weeks') return 'every ' + c.n + ' weeks';
    if (c.unit === 'month') return 'monthly';
    if (c.unit === 'quarter') return 'quarterly';
    if (c.unit === 'halfyear') return 'twice a year';
    if (c.unit === 'year') return 'once a year';
    return 'scheduled as needed';
  }

  /* What days would this land on right now — used to seed the day picker. */
  function daysFor(item, profile) {
    return weekdaysFor(item, startOfDay(new Date()), profile);
  }

  LifeOS.planner = {
    build: build,
    allItems: allItems,
    daysFor: daysFor,
    monthFor: monthFor,
    monthAll: monthAll,
    yearMap: yearMap,
    explain: explain,
    describeCadence: describeCadence,
    mondayOf: mondayOf,
    dayIndex: dayIndex,
    MONTHS: MONTHS,
    MODE_ORDER: MODE_ORDER
  };
})(window);
