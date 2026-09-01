/* Life OS — rendering.
 * All four views read from the same plan object produced by planner.js.
 * Everything is written with textContent so catalog data never has to be
 * HTML-escaped by hand.
 */
(function (root) {
  var LifeOS = (root.LifeOS = root.LifeOS || {});

  /* ------------------------------------------------------------ helpers */
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }
  function clear(node) { while (node && node.firstChild) node.removeChild(node.firstChild); }
  function $(sel) { return document.querySelector(sel); }

  /* Colour lives entirely in CSS. Every coloured node gets a dom-<key> class
   * which maps to --tint / --ink for the active theme. One place to restyle. */
  function domClass(key) { return 'dom-' + key; }

  var SVG_NS = 'http://www.w3.org/2000/svg';

  /* Line-art icon pulled from the <symbol> sprite at the top of index.html.
   * Stroke is currentColor, so an icon takes the colour of whatever holds it. */
  function icon(key, cls) {
    var svg = document.createElementNS(SVG_NS, 'svg');
    svg.setAttribute('class', 'ico' + (cls ? ' ' + cls : ''));
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('aria-hidden', 'true');
    var use = document.createElementNS(SVG_NS, 'use');
    use.setAttribute('href', '#i-' + key);
    svg.appendChild(use);
    return svg;
  }

  function domainDot(key) {
    var s = el('span', 'dot');
    s.title = LifeOS.domain(key).label;
    return s;
  }

  function itemRow(entry, opts) {
    opts = opts || {};
    var row = el('li', 'item ' + domClass(entry.domain));

    var head = el('div', 'item-head');
    head.appendChild(icon(entry.domain));
    head.appendChild(el('span', 'item-title', entry.title));
    if (entry.minutes) head.appendChild(el('span', 'item-min', entry.minutes + ' min'));
    if (opts.when) head.appendChild(el('span', 'item-when', opts.when));
    row.appendChild(head);

    if (entry.detail) row.appendChild(el('p', 'item-detail', entry.detail));

    var why = LifeOS.planner.explain(entry.id);
    if (why) {
      var btn = el('button', 'why-btn', 'Why this?');
      btn.type = 'button';
      var note = el('p', 'why-note', why);
      note.hidden = true;
      btn.addEventListener('click', function () {
        note.hidden = !note.hidden;
        btn.textContent = note.hidden ? 'Why this?' : 'Hide';
      });
      row.appendChild(btn);
      row.appendChild(note);
    }
    return row;
  }

  function emptyNote(text) {
    var p = el('p', 'empty', text);
    return p;
  }

  /* --------------------------------------------------- Today / Week / … */
  function renderPlan(plan) {
    var host = $('#plan-columns');
    if (!host) return;
    clear(host);

    /* Today */
    var todayCol = el('div', 'col col-today');
    todayCol.appendChild(el('h3', 'col-title', 'Today'));
    todayCol.appendChild(el('p', 'col-sub', plan.todayName));

    if (plan.eatToday && plan.eatToday.length) {
      var eat = el('div', 'eat-card');
      eat.appendChild(el('h4', null, 'Eat today'));
      var chips = el('div', 'chips');
      plan.eatToday.forEach(function (t) { chips.appendChild(el('span', 'chip chip-food', t)); });
      eat.appendChild(chips);
      eat.appendChild(el('p', 'eat-note', 'These ride along with meals you already eat — they are not extra tasks.'));
      todayCol.appendChild(eat);
    }

    var tl = el('ul', 'items');
    if (plan.today.length) {
      plan.today.forEach(function (e) { tl.appendChild(itemRow(e)); });
    } else {
      tl.appendChild(emptyNote('Nothing scheduled beyond your anchors. That is the plan working, not a gap.'));
    }
    todayCol.appendChild(tl);

    if (plan.anchors && plan.anchors.length) {
      var anch = el('div', 'anchors');
      anch.appendChild(el('h4', null, 'Daily anchors'));
      var achips = el('div', 'chips');
      plan.anchors.forEach(function (a) {
        achips.appendChild(el('span', 'chip ' + domClass(a.domain), a.title));
      });
      anch.appendChild(achips);
      todayCol.appendChild(anch);
    }
    host.appendChild(todayCol);

    /* This week */
    var weekCol = el('div', 'col');
    weekCol.appendChild(el('h3', 'col-title', 'This week'));
    weekCol.appendChild(el('p', 'col-sub', plan.week.length + ' scheduled'));
    var wl = el('ul', 'items');
    if (plan.week.length) {
      plan.week.forEach(function (e) { wl.appendChild(itemRow(e, { when: e.days.join(' · ') })); });
    } else { wl.appendChild(emptyNote('Clear week.')); }
    weekCol.appendChild(wl);
    host.appendChild(weekCol);

    /* This month */
    var monthCol = el('div', 'col');
    monthCol.appendChild(el('h3', 'col-title', 'This month'));
    monthCol.appendChild(el('p', 'col-sub', plan.month.length + ' coming up'));
    var ml = el('ul', 'items');
    if (plan.month.length) {
      plan.month.forEach(function (e) { ml.appendChild(itemRow(e, { when: e.dueLabel })); });
    } else { ml.appendChild(emptyNote('Nothing this month.')); }
    monthCol.appendChild(ml);
    host.appendChild(monthCol);

    /* Not now */
    var notCol = el('div', 'col col-notnow');
    notCol.appendChild(el('h3', 'col-title', 'Not now'));
    notCol.appendChild(el('p', 'col-sub', 'Tracked. Not your problem today.'));
    var nl = el('ul', 'items items-quiet');
    plan.notNow.forEach(function (e) {
      var li = el('li', 'item quiet');
      var head = el('div', 'item-head');
      head.appendChild(domainDot(e.domain));
      head.appendChild(el('span', 'item-title', e.title));
      head.appendChild(el('span', 'item-when', e.dueLabel));
      li.appendChild(head);
      nl.appendChild(li);
    });
    if (!plan.notNow.length) nl.appendChild(emptyNote('Nothing on the horizon.'));
    notCol.appendChild(nl);
    host.appendChild(notCol);

    /* Priorities strip */
    var pr = $('#plan-priorities');
    if (pr) {
      clear(pr);
      if (plan.priorities.length) {
        pr.appendChild(el('h4', null, 'What this means this week'));
        var grid = el('div', 'prio-grid');
        plan.priorities.forEach(function (p) {
          var d = LifeOS.domain(p.domain);
          var card = el('div', 'prio ' + domClass(p.domain));
          card.appendChild(el('span', 'prio-domain', d.label));
          card.appendChild(el('span', 'prio-title', p.title));
          if (p.note) card.appendChild(el('span', 'prio-note', p.note));
          grid.appendChild(card);
        });
        pr.appendChild(grid);
      }
    }

    /* Mode chip */
    var chip = $('#mode-chip');
    if (chip) {
      var modeMeta = LifeOS.MODES.filter(function (m) { return m.key === plan.mode; })[0];
      chip.textContent = 'Current mode: ' + (modeMeta ? modeMeta.label : plan.mode);
      chip.title = modeMeta ? modeMeta.blurb : '';
    }
  }

  /* ------------------------------------------------- View 1: coverage */
  function renderCoverage(plan) {
    var host = $('#coverage-body');
    if (!host) return;
    clear(host);
    plan.coverage.forEach(function (c) {
      var d = LifeOS.domain(c.domain);
      var row = el('div', 'cov-row ' + domClass(c.domain));

      var name = el('div', 'cov-name');
      var badge = el('span', 'cov-icon');
      badge.appendChild(icon(c.domain));
      name.appendChild(badge);
      name.appendChild(el('span', null, c.label));
      row.appendChild(name);

      row.appendChild(el('div', 'cov-min', c.minimum));

      var st = el('div', 'cov-status');
      // "0/7 days" reads as failure on a domain that is yearly by design.
      var qualifier = c.days ? ' \u00b7 ' + c.days + '/7 days'
                    : (c.count ? ' \u00b7 longer cadence' : '');
      st.appendChild(el('span', 'pill pill-' + c.status, LifeOS.statusLabel(c.status) + qualifier));
      var track = el('div', 'meter');
      var fill = el('div', 'meter-fill meter-' + c.status);
      fill.style.width = c.pct + '%';
      track.appendChild(fill);
      st.appendChild(track);
      row.appendChild(st);

      var next = el('div', 'cov-next');
      next.appendChild(el('span', 'cov-next-text', c.next));
      row.appendChild(next);
      host.appendChild(row);
    });
  }

  /* --------------------------------------------------- View 2: domains */
  var activeDomain = 'nutrition';

  function renderDomainTabs(plan) {
    var host = $('#domain-tabs');
    if (!host) return;
    clear(host);
    var focus = LifeOS.store.profile().focus || [];
    var featured = LifeOS.DOMAINS.filter(function (dom) {
      return !dom.optional || focus.indexOf(dom.key) !== -1;
    }).map(function (dom) { return dom.key; });
    featured.forEach(function (key) {
      var d = LifeOS.domain(key);
      var b = el('button', 'dtab ' + domClass(key) + (key === activeDomain ? ' is-active' : ''));
      b.type = 'button';
      b.appendChild(icon(key));
      b.appendChild(el('span', null, d.label));
      b.addEventListener('click', function () {
        activeDomain = key;
        renderDomainTabs(plan);
        renderDomain(plan);
      });
      host.appendChild(b);
    });
  }

  function renderDomain(plan) {
    var host = $('#domain-body');
    if (!host) return;
    clear(host);
    var d = LifeOS.domain(activeDomain);

    var head = el('div', 'domain-head');
    head.appendChild(el('h3', null, d.label + (activeDomain === 'nutrition' ? ' plan — this month' : ' — how it lands')));
    head.appendChild(el('p', 'muted', d.minimum));
    host.appendChild(head);

    if (activeDomain === 'nutrition') {
      renderNutrition(plan, host);
      return;
    }

    renderEvidence(host, activeDomain);
    renderEditableList(host, plan, activeDomain);
    renderMonthStrip(host, plan, d);
  }

  /* --------------------------------------- where a recommendation comes from */
  function renderEvidence(host, key) {
    var ev = LifeOS.evidenceFor(key);
    if (!ev) return;
    var conf = LifeOS.CONFIDENCE[ev.confidence] || { label: ev.confidence, note: '' };

    var box = el('details', 'evidence conf-' + ev.confidence);
    var sum = el('summary');
    sum.appendChild(el('span', 'ev-badge', conf.label));
    sum.appendChild(el('span', 'ev-headline', ev.headline));
    sum.appendChild(el('span', 'ev-open', 'Where this comes from'));
    box.appendChild(sum);

    var body = el('div', 'ev-body');
    body.appendChild(el('p', 'ev-conf-note', conf.note));
    if (ev.what)   { body.appendChild(el('h5', null, 'What Life OS suggests')); body.appendChild(el('p', null, ev.what)); }
    if (ev.why)    { body.appendChild(el('h5', null, 'Why')); body.appendChild(el('p', null, ev.why)); }
    if (ev.caveat) { body.appendChild(el('h5', null, 'What it does not say')); body.appendChild(el('p', 'ev-caveat', ev.caveat)); }

    if (ev.sources && ev.sources.length) {
      body.appendChild(el('h5', null, 'Sources'));
      var ul = el('ul', 'ev-sources');
      ev.sources.forEach(function (src) {
        var li = el('li');
        var a = el('a', null, src.label);
        a.href = src.url; a.target = '_blank'; a.rel = 'noopener noreferrer';
        li.appendChild(a);
        if (src.note) li.appendChild(el('span', 'ev-note', src.note));
        ul.appendChild(li);
      });
      body.appendChild(ul);
    } else {
      body.appendChild(el('p', 'ev-note', 'No external source — this one is Life OS’s own choice, ' +
        'and you should feel free to overrule it.'));
    }
    box.appendChild(body);
    host.appendChild(box);
  }

  /* ------------------------------------------------- the month this lands on */
  function renderMonthStrip(outer, plan, d) {
    var st = LifeOS.store.get();
    var m = LifeOS.planner.monthFor(activeDomain, st.profile, st.dislikes);
    var active = m.days.filter(function (day) { return day.entries.length; }).length;

    // Reference, not the point — so it folds away by default.
    var box = el('details', 'month-fold');
    var sum = el('summary');
    sum.appendChild(el('span', 'mf-title', m.month + ' at a glance'));
    sum.appendChild(el('span', 'mf-note', active + ' of ' + m.days.length + ' days'));
    box.appendChild(sum);
    outer.appendChild(box);
    var host = box;

    var wrap = el('div', 'scroll-x');
    var strip = el('div', 'mstrip ' + domClass(activeDomain));
    ['M', 'T', 'W', 'T', 'F', 'S', 'S'].forEach(function (dl) {
      strip.appendChild(el('div', 'mstrip-dow', dl));
    });
    for (var pad = 0; pad < m.days[0].dow; pad++) strip.appendChild(el('div', 'mstrip-pad', ''));
    m.days.forEach(function (day) {
      var cell = el('div', 'mstrip-day' +
        (day.entries.length ? ' is-on' : '') + (day.today ? ' is-today' : ''));
      cell.appendChild(el('span', 'mstrip-num', String(day.day)));
      if (day.entries.length) {
        cell.title = day.entries.map(function (e) { return e.title; }).join(', ');
        var dots = el('span', 'mstrip-dots');
        day.entries.slice(0, 4).forEach(function () { dots.appendChild(el('i', null, '')); });
        cell.appendChild(dots);
      }
      strip.appendChild(cell);
    });
    wrap.appendChild(strip);
    host.appendChild(wrap);
    host.appendChild(el('p', 'fine', active + ' of ' + m.days.length + ' days this month touch ' +
      d.label.toLowerCase() + '. Drag on the week grid at the top to change any of it.'));
    box.parentNode || arguments[0].appendChild(box);
  }

  /* ------------------------------------- the list, and the ability to change it */
  function renderEditableList(host, plan, domainKey) {
    var st = LifeOS.store.get();
    var scheduled = {};
    plan.today.concat(plan.week).forEach(function (e) { scheduled[e.id] = e.days.join(' · '); });
    plan.month.concat(plan.notNow).forEach(function (e) { scheduled[e.id] = e.dueLabel; });
    (plan.anchors || []).forEach(function (e) { scheduled[e.id] = 'Every day'; });

    var head = el('div', 'list-head');
    head.appendChild(el('h4', null, 'Everything in this area'));
    var add = el('button', 'btn btn-ghost btn-small', '+ Add your own');
    add.type = 'button';
    head.appendChild(add);
    host.appendChild(head);

    var form = buildAddForm(domainKey);
    form.hidden = true;
    add.addEventListener('click', function () { form.hidden = !form.hidden; });
    host.appendChild(form);

    var list = el('ul', 'items items-wide');
    LifeOS.planner.allItems(st.profile)
      .filter(function (it) { return it.domain === domainKey; })
      .forEach(function (it) {
        list.appendChild(editableRow(it, scheduled[it.id], st));
      });
    host.appendChild(list);
  }

  function editableRow(it, when, st) {
    var dropped = (st.dislikes || []).indexOf(it.id) !== -1;
    var li = el('li', 'item ' + domClass(it.domain) +
      (when && !dropped ? '' : ' item-off') + (dropped ? ' is-dropped' : ''));

    var h = el('div', 'item-head');
    h.appendChild(icon(it.domain));
    h.appendChild(el('span', 'item-title', it.title));
    if (it.custom) h.appendChild(el('span', 'tag-custom', 'yours'));
    else if (it.edited) h.appendChild(el('span', 'tag-custom tag-edited', 'edited'));
    h.appendChild(el('span', 'item-when', dropped ? 'dropped' : (when || 'not in this plan')));
    li.appendChild(h);
    li.appendChild(el('p', 'item-detail', (it.detail ? it.detail + ' — ' : '') +
      LifeOS.planner.describeCadence(it.cad) + (it.minutes ? ' · ' + it.minutes + ' min' : '')));

    var row = el('div', 'item-actions');
    var editBtn = el('button', 'mini', 'Edit'); editBtn.type = 'button';
    row.appendChild(editBtn);

    var dropBtn = el('button', 'mini', dropped ? 'Bring back' : 'Drop'); dropBtn.type = 'button';
    dropBtn.addEventListener('click', function () {
      if (dropped) LifeOS.store.update({ dislikes: (st.dislikes || []).filter(function (x) { return x !== it.id; }) });
      else LifeOS.store.dislike(it.id);
      LifeOS.app.rebuild();
    });
    row.appendChild(dropBtn);

    if (it.custom) {
      var del = el('button', 'mini mini-danger', 'Delete'); del.type = 'button';
      del.addEventListener('click', function () { LifeOS.store.removeCustom(it.id); LifeOS.app.rebuild(); });
      row.appendChild(del);
    } else if (it.edited) {
      var rst = el('button', 'mini', 'Reset'); rst.type = 'button';
      rst.addEventListener('click', function () { LifeOS.store.resetItem(it.id); LifeOS.app.rebuild(); });
      row.appendChild(rst);
    }
    li.appendChild(row);

    var editor = el('div', 'item-editor');
    editor.hidden = true;
    var tIn = el('input', 'ed-input'); tIn.type = 'text'; tIn.value = it.title; tIn.placeholder = 'Name';
    var mIn = el('input', 'ed-input ed-mins'); mIn.type = 'number'; mIn.min = '0'; mIn.step = '5';
    mIn.value = it.minutes || ''; mIn.placeholder = 'min';

    /* Which days this lands on. Writes the same override that dragging does,
     * so the grid at the top of the page is the single source of truth. */
    var current = (st.profile.moves && st.profile.moves[it.id]) ||
                  LifeOS.planner.daysFor(it, st.profile);
    var chosen = current.slice();
    var dayRow = el('div', 'day-pick');
    dayRow.appendChild(el('span', 'day-pick-label', 'Days'));
    ['M', 'T', 'W', 'T', 'F', 'S', 'S'].forEach(function (dl, i) {
      var b = el('button', 'day-btn' + (chosen.indexOf(i) !== -1 ? ' is-on' : ''), dl);
      b.type = 'button';
      b.title = LifeOS.DAYS[i];
      b.addEventListener('click', function () {
        var at = chosen.indexOf(i);
        if (at === -1) chosen.push(i); else chosen.splice(at, 1);
        b.classList.toggle('is-on', at === -1);
      });
      dayRow.appendChild(b);
    });

    var save = el('button', 'mini mini-go', 'Save'); save.type = 'button';
    save.addEventListener('click', function () {
      LifeOS.store.editItem(it.id, { title: tIn.value, minutes: parseInt(mIn.value, 10) || 0 });
      if (chosen.length) LifeOS.store.setDays(it.id, chosen);
      LifeOS.app.rebuild();
    });
    editor.appendChild(tIn); editor.appendChild(mIn);
    editor.appendChild(save);
    editor.appendChild(dayRow);
    editBtn.addEventListener('click', function () { editor.hidden = !editor.hidden; });
    li.appendChild(editor);
    return li;
  }

  function buildAddForm(domainKey) {
    var form = el('div', 'add-form');
    var t = el('input', 'ed-input'); t.type = 'text'; t.placeholder = 'What is it? e.g. Perfume making class';
    var m = el('input', 'ed-input ed-mins'); m.type = 'number'; m.min = '0'; m.step = '5'; m.placeholder = 'min';
    var freq = el('select', 'ed-input ed-freq');
    [['Every day', { unit: 'day' }],
     ['Once a week', { unit: 'week' }],
     ['2× a week', { unit: 'week', times: 2 }],
     ['3× a week', { unit: 'week', times: 3 }],
     ['Every 2 weeks', { unit: 'weeks', n: 2 }],
     ['Monthly', { unit: 'month' }],
     ['Quarterly', { unit: 'quarter' }]].forEach(function (o, i) {
      var opt = el('option', null, o[0]); opt.value = String(i); freq.appendChild(opt);
    });
    var CADS = [{ unit: 'day' }, { unit: 'week' }, { unit: 'week', times: 2 }, { unit: 'week', times: 3 },
                { unit: 'weeks', n: 2 }, { unit: 'month' }, { unit: 'quarter' }];
    freq.value = '1';

    var go = el('button', 'btn btn-primary btn-small', 'Add to my plan'); go.type = 'button';
    go.addEventListener('click', function () {
      if (!t.value.trim()) { t.focus(); return; }
      LifeOS.store.addCustom({
        domain: domainKey, title: t.value.trim(),
        minutes: parseInt(m.value, 10) || null,
        cad: CADS[parseInt(freq.value, 10)] || { unit: 'week' }
      });
      t.value = ''; m.value = '';
      LifeOS.app.rebuild();
    });

    form.appendChild(t); form.appendChild(m); form.appendChild(freq); form.appendChild(go);
    return form;
  }

  function renderNutrition(plan, host) {
    var n = plan.nutrition;
    var prof = LifeOS.store.profile();

    renderEvidence(host, 'nutrition');

    /* ---- where you are, because that decides what is actually available -- */
    var picker = el('div', 'region-row');
    picker.appendChild(el('span', 'region-label', 'Produce in season near'));
    var sel = el('select', 'region-select');
    LifeOS.REGIONS.forEach(function (r) {
      var o = el('option', null, r.label);
      o.value = r.key;
      if (r.key === n.region) o.selected = true;
      sel.appendChild(o);
    });
    sel.addEventListener('change', function () {
      LifeOS.store.updateProfile({ region: sel.value });
      LifeOS.app.rebuild();
    });
    picker.appendChild(sel);
    picker.appendChild(el('span', 'region-month', n.month));
    host.appendChild(picker);

    /* ---- the checklist itself -------------------------------------------- */
    host.appendChild(el('h4', 'sub-h', 'The daily dozen'));
    var table = el('div', 'dozen');
    LifeOS.DAILY_DOZEN.forEach(function (cat) {
      var row = el('div', 'dz-row' + (cat.handled ? ' is-handled' : ''));

      var name = el('div', 'dz-name');
      name.appendChild(el('span', null, cat.label));
      name.appendChild(el('span', 'dz-unit', cat.unit));
      row.appendChild(name);

      var pips = el('div', 'dz-pips');
      pips.title = cat.servings + ' serving' + (cat.servings > 1 ? 's' : '') + ' a day';
      for (var i = 0; i < cat.servings; i++) pips.appendChild(el('i', 'dz-pip'));
      row.appendChild(pips);

      var pick = el('div', 'dz-pick');
      if (cat.handled) {
        pick.appendChild(el('span', 'dz-note', cat.handled));
      } else {
        var listed = n.season[cat.key];
        var base = (listed && listed.length) ? listed
                 : (LifeOS.PANTRY[cat.key] || LifeOS.GENERIC[cat.key] || []);
        var mine = (prof.foods.added && prof.foods.added[cat.key]) || [];
        var removed = prof.foods.removed || [];

        base.concat(mine).filter(function (f) { return removed.indexOf(f) === -1; })
          .slice(0, 6).forEach(function (f) {
            var isMine = mine.indexOf(f) !== -1;
            var chip = el('span', 'chip chip-food' +
              (listed && listed.length && !isMine ? ' is-season' : '') + (isMine ? ' is-mine' : ''), f);
            var x = el('button', 'chip-x', '×');
            x.type = 'button';
            x.title = 'Not for me';
            x.addEventListener('click', function () { LifeOS.store.removeFood(f); LifeOS.app.rebuild(); });
            chip.appendChild(x);
            pick.appendChild(chip);
          });

        var addBtn = el('button', 'chip chip-add', '+ add');
        addBtn.type = 'button';
        addBtn.title = 'Add something you actually eat';
        addBtn.addEventListener('click', function () {
          var name = root.prompt('Add a food to “' + cat.label + '”:');
          if (name && name.trim()) { LifeOS.store.addFood(cat.key, name.trim()); LifeOS.app.rebuild(); }
        });
        pick.appendChild(addBtn);

        if (cat.seasonal && !(listed && listed.length) && n.region !== 'any') {
          pick.appendChild(el('span', 'dz-note', 'little in season — frozen is fine'));
        }
      }
      row.appendChild(pick);
      table.appendChild(row);
    });

    /* The Daily Dozen is a food-category checklist and carries no macros.
     * Rather than let that gap pass silently, Life OS names it. */
    var pRow = el('div', 'dz-row dz-extra');
    var pName = el('div', 'dz-name');
    pName.appendChild(el('span', null, 'Protein'));
    pName.appendChild(el('span', 'dz-unit', '0.8 g/kg minimum · 1.2–2.0 g/kg if you train'));
    pRow.appendChild(pName);
    pRow.appendChild(el('div', 'dz-pips dz-plus', '+'));
    var pPick = el('div', 'dz-pick');
    ['Tofu', 'Tempeh', 'Lentils', 'Greek yoghurt', 'Eggs', 'Fish']
      .filter(function (f) { return (prof.foods.removed || []).indexOf(f) === -1; })
      .forEach(function (f) { pPick.appendChild(el('span', 'chip chip-food', f)); });
    pPick.appendChild(el('span', 'dz-note', 'not part of the Daily Dozen — added by Life OS'));
    pRow.appendChild(pPick);
    table.appendChild(pRow);

    host.appendChild(table);

    var removedList = prof.foods.removed || [];
    if (removedList.length) {
      var back = el('p', 'fine');
      back.appendChild(document.createTextNode('You removed: '));
      removedList.forEach(function (f) {
        var b = el('button', 'chip chip-restore', f + ' ↺');
        b.type = 'button';
        b.title = 'Put it back';
        b.addEventListener('click', function () { LifeOS.store.restoreFood(f); LifeOS.app.rebuild(); });
        back.appendChild(b);
      });
      host.appendChild(back);
    }

    renderEvidence(host, 'protein');

    var seasonNote = el('p', 'fine');
    seasonNote.appendChild(el('strong', null, 'Highlighted items are in season in ' +
      n.regionLabel + ' this month. '));
    seasonNote.appendChild(document.createTextNode(
      'Beans, grains, nuts, seeds, flax and spices are pantry staples — they carry no season. ' +
      'Seasonality is approximate and varies by grower; treat it as a prompt for the market, not a rule.'));
    host.appendChild(seasonNote);

    /* ---- the month rotation ---------------------------------------------- */
    host.appendChild(el('h4', 'sub-h', n.month + ' rotation'));
    host.appendChild(el('p', 'fine', 'One from each track per day, walking the in-season lists, ' +
      'so variety is designed rather than remembered.'));
    var gridWrap = el('div', 'scroll-x');
    var grid = el('div', 'nutri-grid');
    n.days.forEach(function (day) {
      var cell = el('div', 'nutri-day' + (day.today ? ' is-today' : ''));
      cell.appendChild(el('span', 'nutri-num', String(day.day)));
      day.chips.forEach(function (c) {
        var chip = el('span', 'chip chip-food' + (c.seasonal ? ' is-season' : ''), c.label);
        chip.title = c.category + (c.seasonal ? ' · in season' : ' · pantry staple');
        cell.appendChild(chip);
      });
      grid.appendChild(cell);
    });
    gridWrap.appendChild(grid);
    host.appendChild(gridWrap);

    /* ---- groceries -------------------------------------------------------- */
    var groc = el('div', 'nutri-groceries');
    groc.appendChild(el('h4', null, 'This week\u2019s groceries'));
    var gc = el('div', 'chips');
    plan.groceries.forEach(function (g) {
      gc.appendChild(el('span', 'chip chip-food' + (g.seasonal ? ' is-season' : ''), g.name));
    });
    groc.appendChild(gc);
    host.appendChild(groc);

    /* ---- provenance ------------------------------------------------------- */
    var src = el('p', 'fine');
    src.appendChild(document.createTextNode(n.note + ' '));
    var a = el('a', null, 'Source: the Daily Dozen');
    a.href = n.source.url;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    src.appendChild(a);
    src.appendChild(document.createTextNode('. ' + LifeOS.B12_NOTE));
    host.appendChild(src);
  }

  /* -------------------------------------------------- View 3: calendar */
  function renderCalendar(plan) {
    var host = $('#calendar-body');
    if (!host) return;
    clear(host);

    var grid = el('div', 'cal');
    grid.appendChild(el('div', 'cal-corner', ''));
    LifeOS.DAYS.forEach(function (d, i) {
      var h = el('div', 'cal-dayhead' + (LifeOS.DAYS[i] === plan.todayName ? ' is-today' : ''), d.slice(0, 3));
      grid.appendChild(h);
    });

    LifeOS.SLOTS.forEach(function (slot) {
      grid.appendChild(el('div', 'cal-slothead', slot.label));
      for (var i = 0; i < 7; i++) {
        var cell = el('div', 'cal-cell' + (LifeOS.DAYS[i] === plan.todayName ? ' is-today' : ''));
        var entries = plan.calendar[i][slot.key];
        entries.slice(0, 3).forEach(function (e) {
          var b = el('span', 'cal-item ' + domClass(e.domain), e.title);
          b.title = e.title + (e.minutes ? ' · ' + e.minutes + ' min' : '');
          cell.appendChild(b);
        });
        if (entries.length > 3) cell.appendChild(el('span', 'cal-more', '+' + (entries.length - 3) + ' more'));
        grid.appendChild(cell);
      }
    });
    host.appendChild(grid);

    var side = $('#calendar-side');
    if (side) {
      clear(side);
      var box = el('div', 'side-box');
      box.appendChild(el('h4', null, 'Daily anchors'));
      var ul = el('ul', 'plain');
      (plan.anchors || []).forEach(function (a) { ul.appendChild(el('li', null, a.title)); });
      if (!plan.anchors.length) ul.appendChild(el('li', null, 'None set'));
      box.appendChild(ul);
      side.appendChild(box);

      var box2 = el('div', 'side-box');
      box2.appendChild(el('h4', null, 'This week’s priorities'));
      var ul2 = el('ul', 'plain');
      plan.priorities.forEach(function (p) { ul2.appendChild(el('li', null, p.title)); });
      box2.appendChild(ul2);
      side.appendChild(box2);
    }
  }

  /* ------------------------------------- View: coverage matrix (domains × days)
   * The calendar answers "what happens Tuesday". This answers the other
   * question: which parts of my life go untouched all week?
   */
  function renderMatrix(plan) {
    var host = $('#matrix-body');
    if (!host) return;
    clear(host);

    var prof = LifeOS.store.profile();
    var grouped = prof.grouped !== false;
    var open = prof.openGroups || [];

    var grid = el('div', 'mx');
    grid.appendChild(el('div', 'mx-corner', ''));
    LifeOS.DAYS.forEach(function (d) {
      grid.appendChild(el('div', 'mx-dayhead' + (d === plan.todayName ? ' is-today' : ''), d.slice(0, 3)));
    });
    grid.appendChild(el('div', 'mx-dayhead mx-total', 'days'));

    if (grouped) {
      plan.groups.forEach(function (g) {
        var isOpen = open.indexOf(g.group) !== -1;
        renderGroupRow(grid, plan, g, isOpen);
        if (isOpen) {
          g.members.forEach(function (m) { renderRow(grid, plan, m, true); });
        }
      });
    } else {
      plan.matrix.forEach(function (r) { renderRow(grid, plan, r, false); });
    }

    host.appendChild(grid);
    host.appendChild(gridNote(plan, grouped));
  }

  /* one family, collapsed: members merged, clashes called out */
  function renderGroupRow(grid, plan, g, isOpen) {
    var label = el('button', 'mx-label mx-glabel' + (g.gap ? ' is-gap' : '') + (isOpen ? ' is-open' : ''));
    label.type = 'button';
    label.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    label.appendChild(el('span', 'mx-caret', isOpen ? '\u2013' : '+'));
    label.appendChild(el('span', 'mx-gname', g.label));
    label.appendChild(el('span', 'mx-gcount', String(g.members.length)));
    label.title = (g.note || 'Related areas, merged.') + ' Click to see them separately.';
    label.addEventListener('click', function () {
      LifeOS.store.toggleGroup(g.group);
      LifeOS.app.rebuild();
    });
    grid.appendChild(label);

    if (g.everyday) {
      var span = el('div', 'mx-cell mx-span is-on is-group');
      renderEntries(span, g.days[0], null);
      span.insertBefore(el('span', 'mx-everyday', 'Every day'), span.firstChild);
      grid.appendChild(span);
      grid.appendChild(el('div', 'mx-total', '7/7'));
      return;
    }

    g.days.forEach(function (entries, dayIdx) {
      var cell = el('div', 'mx-cell is-group' +
        (entries.length ? ' is-on' : '') +
        (g.clash[dayIdx] ? ' is-clash' : '') +
        (LifeOS.DAYS[dayIdx] === plan.todayName ? ' is-today' : ''));
      makeDropTarget(cell, dayIdx);
      if (!entries.length) {
        cell.appendChild(el('span', 'mx-empty', ''));
      } else {
        if (g.clash[dayIdx]) {
          var warn = el('span', 'mx-clash', 'both');
          warn.title = g.note || 'These want the same slot.';
          cell.appendChild(warn);
        }
        renderEntries(cell, entries, dayIdx, g.days);
      }
      grid.appendChild(cell);
    });

    grid.appendChild(el('div', 'mx-total ' + (g.gap ? 'is-gap' : ''),
      g.gap ? '\u2014' : g.activeDays + '/7'));
  }

  /* one domain row — used expanded under a family, or on its own */
  function renderRow(grid, plan, row, nested) {
    var label = el('div', 'mx-label ' + domClass(row.domain) +
      (row.gap ? ' is-gap' : '') + (nested ? ' is-nested' : ''));
    label.appendChild(icon(row.domain));
    label.appendChild(el('span', null, row.label));
    grid.appendChild(label);

    if (row.everyday) {
      var span = el('div', 'mx-cell mx-span is-on ' + domClass(row.domain));
      span.appendChild(el('span', 'mx-everyday', 'Every day'));
      renderEntries(span, row.days[0], null);
      grid.appendChild(span);
      grid.appendChild(el('div', 'mx-total', '7/7'));
      return;
    }

    row.days.forEach(function (entries, dayIdx) {
      var cell = el('div', 'mx-cell ' + domClass(row.domain) +
        (entries.length ? ' is-on' : '') +
        (LifeOS.DAYS[dayIdx] === plan.todayName ? ' is-today' : ''));
      makeDropTarget(cell, dayIdx);
      if (!entries.length) cell.appendChild(el('span', 'mx-empty', ''));
      else renderEntries(cell, entries, dayIdx, row.days);
      grid.appendChild(cell);
    });

    grid.appendChild(el('div', 'mx-total ' + (row.gap ? 'is-gap' : ''),
      row.gap ? '\u2014' : row.activeDays + '/7'));
  }

  /* shared cell contents: food collapses to one line, up to three timed items */
  function renderEntries(cell, entries, dayIdx, rowDays) {
    var timed = entries.filter(function (e) { return e.type !== 'CONSUME'; });
    if (entries.length - timed.length) {
      cell.appendChild(el('span', 'mx-item mx-item-soft', 'Base foods'));
    }
    timed.slice(0, 3).forEach(function (e) {
      var chip = el('span', 'mx-item' + (e.domain ? ' ' + domClass(e.domain) + ' mx-item-dom' : ''), e.title);
      chip.title = e.title + (e.minutes ? ' \u00b7 ' + e.minutes + ' min' : '') + ' — drag to another day';
      if (dayIdx != null) makeDraggable(chip, e.id, dayIdx, rowDays || null);
      cell.appendChild(chip);
    });
    if (timed.length > 3) cell.appendChild(el('span', 'mx-more', '+' + (timed.length - 3)));
  }

  function gridNote(plan, grouped) {
    var note = el('div', 'mx-note');
    var clashing = grouped ? plan.groups.filter(function (g) { return g.clashes; }) : [];
    if (clashing.length) {
      note.appendChild(el('strong', null, 'Competing for the same slot: '));
      note.appendChild(document.createTextNode(clashing.map(function (g) {
        return g.label.toLowerCase() + ' on ' + g.clash.map(function (c, i) {
          return c ? LifeOS.DAYS[i] : null;
        }).filter(Boolean).join(' & ');
      }).join('; ') + '.'));
      note.appendChild(el('p', 'fine',
        'Not necessarily wrong — a strength day with only a walk is fine. It is worth a look ' +
        'when both want real time. Drag one to a lighter day.'));
    }

    var source = grouped ? plan.groups : plan.matrix;
    var gaps = source.filter(function (r) { return r.gap; });
    if (gaps.length) {
      var g = el('p', 'mx-gaps');
      g.appendChild(el('strong', null, 'Untouched this week: '));
      g.appendChild(document.createTextNode(gaps.map(function (x) { return x.label; }).join(', ') + '.'));
      note.appendChild(g);
    }
    return note;
  }

  /* ------------------------------------------------------------ dragging
   * Drag an item to another day. The move is stored as an override, the plan
   * is rebuilt from it, and every other view re-renders off the same object —
   * so the week ribbon, month quilt and year ring all follow automatically.
   */
  var dragged = null;

  function makeDraggable(node, itemId, fromDay, rowDays) {
    if (!rowDays) rowDays = [];
    node.setAttribute('draggable', 'true');
    node.classList.add('is-draggable');
    node.addEventListener('dragstart', function (ev) {
      dragged = {
        id: itemId,
        from: fromDay,
        days: rowDays.map(function (entries, i) {
          return entries.some(function (e) { return e.id === itemId; }) ? i : -1;
        }).filter(function (i) { return i !== -1; })
      };
      node.classList.add('is-dragging');
      if (ev.dataTransfer) {
        ev.dataTransfer.effectAllowed = 'move';
        ev.dataTransfer.setData('text/plain', itemId);
      }
    });
    node.addEventListener('dragend', function () {
      node.classList.remove('is-dragging');
      dragged = null;
    });
  }

  function makeDropTarget(cell, dayIdx) {
    cell.addEventListener('dragover', function (ev) {
      if (!dragged || dragged.from === dayIdx) return;
      ev.preventDefault();
      if (ev.dataTransfer) ev.dataTransfer.dropEffect = 'move';
      cell.classList.add('is-drop');
    });
    cell.addEventListener('dragleave', function () { cell.classList.remove('is-drop'); });
    cell.addEventListener('drop', function (ev) {
      ev.preventDefault();
      cell.classList.remove('is-drop');
      if (!dragged || dragged.from === dayIdx) return;
      var moved = dragged;
      dragged = null;
      LifeOS.store.moveItem(moved.id, moved.from, dayIdx, moved.days);
      LifeOS.app.rebuild();
      LifeOS.app.afterMove(moved.id, moved.from, dayIdx, moved.days);
    });
  }

  /* -------------------------------------------- View: week load ribbon
   * Seven columns, each a stack of domain-coloured minutes. Answers the
   * question a grid of ticks cannot: is this week actually balanced?
   */
  function renderRibbon(plan) {
    var host = $('#ribbon-body');
    if (!host) return;
    clear(host);

    var peak = Math.max(plan.load.peak, 60);
    var wrap = el('div', 'ribbon');
    plan.load.days.forEach(function (d, i) {
      var col = el('div', 'rb-col' + (d.day === plan.todayName ? ' is-today' : ''));
      var stack = el('div', 'rb-stack');
      d.segments.forEach(function (seg) {
        var bar = el('div', 'rb-seg ' + domClass(seg.domain));
        bar.style.height = (100 * seg.minutes / peak) + '%';
        bar.title = LifeOS.domain(seg.domain).label + ' · ' + seg.minutes + ' min';
        stack.appendChild(bar);
      });
      if (!d.segments.length) stack.appendChild(el('div', 'rb-none', ''));
      col.appendChild(el('span', 'rb-total', d.total ? Math.round(d.total / 60 * 10) / 10 + 'h' : '—'));
      col.appendChild(stack);
      col.appendChild(el('span', 'rb-day', d.day.slice(0, 3)));
      wrap.appendChild(col);
    });
    host.appendChild(wrap);

    var busiest = plan.load.days.slice().sort(function (a, b) { return b.total - a.total; })[0];
    var lightest = plan.load.days.slice().sort(function (a, b) { return a.total - b.total; })[0];
    var note = el('p', 'muted rb-note');
    note.appendChild(document.createTextNode(
      'Heaviest day is ' + busiest.day + ' at ' + Math.round(busiest.total / 60 * 10) / 10 +
      ' hours; lightest is ' + lightest.day + '. Drag something off the tall column above and this moves with it.'));
    host.appendChild(note);
  }

  /* ------------------------------------------- View: month quilt
   * Each day is a stack of thin domain stripes. You read the rhythm of the
   * month — the weekday pattern, and the one-offs that break it.
   */
  function renderQuilt(plan) {
    var host = $('#quilt-body');
    if (!host) return;
    clear(host);

    var st = LifeOS.store.get();
    var m = LifeOS.planner.monthAll(st.profile, st.dislikes);

    host.appendChild(el('h4', null, m.month + ' ' + m.year));
    var grid = el('div', 'quilt');
    ['M', 'T', 'W', 'T', 'F', 'S', 'S'].forEach(function (d) {
      grid.appendChild(el('div', 'quilt-dow', d));
    });
    for (var pad = 0; pad < m.days[0].dow; pad++) grid.appendChild(el('div', '', ''));

    m.days.forEach(function (day) {
      var cell = el('div', 'quilt-day' + (day.today ? ' is-today' : ''));
      cell.appendChild(el('span', 'quilt-num', String(day.day)));
      var stripes = el('div', 'quilt-stripes');
      day.domains.slice(0, 7).forEach(function (d) {
        var st2 = el('i', 'quilt-stripe ' + domClass(d.domain));
        st2.title = LifeOS.domain(d.domain).label;
        stripes.appendChild(st2);
      });
      cell.appendChild(stripes);
      if (day.oneOffs.length) {
        var flag = el('span', 'quilt-flag ' + domClass(day.oneOffs[0].domain),
                      day.oneOffs.length > 1 ? day.oneOffs.length + ' due' : day.oneOffs[0].title);
        flag.title = day.oneOffs.map(function (o) { return o.title; }).join(', ');
        cell.appendChild(flag);
      }
      grid.appendChild(cell);
    });
    host.appendChild(grid);
    host.appendChild(el('p', 'fine',
      'Each stripe is a domain touched that day. The pattern is your week repeating; ' +
      'the labelled days are the things that only happen once this month.'));
  }

  /* --------------------------------------------------- View: year ring
   * Twelve months around a circle, starting at this one. The slow cadences —
   * dental, taxes, insurance — plotted where they land. The whole point of
   * "Not Now" made visible.
   */
  function renderYear(plan) {
    var host = $('#year-body');
    if (!host) return;
    clear(host);

    var st = LifeOS.store.get();
    var y = LifeOS.planner.yearMap(st.profile, st.dislikes);
    var SVG = 'http://www.w3.org/2000/svg';
    var size = 460, cx = size / 2, cy = size / 2, rOuter = 196, rInner = 128;

    var svg = document.createElementNS(SVG, 'svg');
    svg.setAttribute('class', 'yearring');
    svg.setAttribute('viewBox', '0 0 ' + size + ' ' + size);
    svg.setAttribute('role', 'img');
    svg.setAttribute('aria-label', 'A ring of the next twelve months showing when slow-cadence items land.');

    function pt(angle, r) {
      var a = (angle - 90) * Math.PI / 180;
      return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
    }
    function arcPath(a0, a1, r0, r1) {
      var p0 = pt(a0, r1), p1 = pt(a1, r1), p2 = pt(a1, r0), p3 = pt(a0, r0);
      var large = (a1 - a0) > 180 ? 1 : 0;
      return 'M' + p0[0].toFixed(1) + ' ' + p0[1].toFixed(1) +
             'A' + r1 + ' ' + r1 + ' 0 ' + large + ' 1 ' + p1[0].toFixed(1) + ' ' + p1[1].toFixed(1) +
             'L' + p2[0].toFixed(1) + ' ' + p2[1].toFixed(1) +
             'A' + r0 + ' ' + r0 + ' 0 ' + large + ' 0 ' + p3[0].toFixed(1) + ' ' + p3[1].toFixed(1) + 'Z';
    }

    // months laid out clockwise from the current one at the top
    var ordered = y.months.slice().sort(function (a, b) { return a.ahead - b.ahead; });
    ordered.forEach(function (mo, i) {
      var a0 = i * 30 + 1.2, a1 = (i + 1) * 30 - 1.2;
      var seg = document.createElementNS(SVG, 'path');
      seg.setAttribute('d', arcPath(a0, a1, rInner, rOuter));
      seg.setAttribute('class', 'yr-seg' + (mo.isCurrent ? ' is-now' : '') + (mo.items.length ? ' has-items' : ''));
      seg.appendChild(mkTitle(SVG, mo.label + (mo.items.length
        ? ': ' + mo.items.map(function (it) { return it.title; }).join(', ')
        : ': nothing scheduled')));
      svg.appendChild(seg);

      var lp = pt(i * 30 + 15, (rInner + rOuter) / 2 + 44);
      var lab = document.createElementNS(SVG, 'text');
      lab.setAttribute('x', lp[0].toFixed(1));
      lab.setAttribute('y', lp[1].toFixed(1));
      lab.setAttribute('class', 'yr-label' + (mo.isCurrent ? ' is-now' : ''));
      lab.setAttribute('text-anchor', 'middle');
      lab.textContent = mo.short;
      svg.appendChild(lab);

      // one dot per item, spread along the arc
      mo.items.slice(0, 5).forEach(function (it, k) {
        var frac = (k + 1) / (Math.min(mo.items.length, 5) + 1);
        var dp = pt(i * 30 + 30 * frac, (rInner + rOuter) / 2);
        var dot = document.createElementNS(SVG, 'circle');
        dot.setAttribute('cx', dp[0].toFixed(1));
        dot.setAttribute('cy', dp[1].toFixed(1));
        dot.setAttribute('r', '5.5');
        dot.setAttribute('class', 'yr-dot ' + domClass(it.domain));
        dot.appendChild(mkTitle(SVG, it.title + ' — ' + it.cadence));
        svg.appendChild(dot);
      });
    });

    var c1 = document.createElementNS(SVG, 'text');
    c1.setAttribute('x', cx); c1.setAttribute('y', cy - 6);
    c1.setAttribute('class', 'yr-center'); c1.setAttribute('text-anchor', 'middle');
    c1.textContent = 'The year ahead';
    svg.appendChild(c1);
    var c2 = document.createElementNS(SVG, 'text');
    c2.setAttribute('x', cx); c2.setAttribute('y', cy + 18);
    c2.setAttribute('class', 'yr-sub'); c2.setAttribute('text-anchor', 'middle');
    c2.textContent = 'from ' + y.currentLabel;
    svg.appendChild(c2);

    var layout = el('div', 'year-layout');
    var left = el('div', 'year-ring-wrap');
    left.appendChild(svg);
    layout.appendChild(left);

    var list = el('div', 'year-list');
    list.appendChild(el('h4', null, 'What is coming, in order'));
    var any = false;
    ordered.forEach(function (mo) {
      if (!mo.items.length) return;
      any = true;
      var block = el('div', 'yr-month');
      block.appendChild(el('span', 'yr-month-name' + (mo.isCurrent ? ' is-now' : ''),
        mo.label + (mo.isCurrent ? '  · this month' : '')));
      var ul = el('ul', 'plain');
      mo.items.forEach(function (it) {
        var li = el('li', 'yr-item ' + domClass(it.domain));
        li.appendChild(icon(it.domain));
        li.appendChild(el('span', null, it.title));
        li.appendChild(el('span', 'yr-cad', it.cadence));
        ul.appendChild(li);
      });
      block.appendChild(ul);
      list.appendChild(block);
    });
    if (!any) list.appendChild(el('p', 'muted', 'Nothing on the slow cadences yet.'));
    layout.appendChild(list);
    host.appendChild(layout);
  }

  function mkTitle(ns, text) {
    var t = document.createElementNS(ns, 'title');
    t.textContent = text;
    return t;
  }

  /* ------------------------------------------------- the research, as a snapshot
   * Deliberately not the full list. This is the case for trusting the thing;
   * the per-domain panels below carry the detail, one area at a time.
   */
  var RESEARCH_ORDER = ['strong', 'general', 'convention', 'preference'];

  /* The three places where reading the evidence changed what Life OS suggests.
   * Far more convincing than a wall of citations. */
  var CHANGED_MY_MIND = [
    { was: '“Stand up once an hour”', now: 'Walk 2–3 minutes',
      because: 'Breaking up sitting with light walking improved post-meal glucose — one trial ' +
               'measured the 5-hour area-under-curve 55.5% lower. Standing breaks in the same ' +
               'comparison did not.',
      key: 'sitting' },
    { was: '“Neck stretches”', now: 'Neck strengthening',
      because: 'Cochrane found strength-specific training helps mechanical neck pain, while generic ' +
               'stretching and general exercise programmes did not.',
      key: 'neck' },
    { was: '“Stretch to avoid injury”', now: 'Dynamic mobility, for range only',
      because: 'A systematic review found moderate-to-strong evidence static stretching does not ' +
               'reduce injury rates — all four RCTs agreed. It does improve flexibility, so that is ' +
               'the only claim made.',
      key: 'mobility' }
  ];

  function renderResearch() {
    var host = $('#research-body');
    if (!host) return;
    clear(host);

    var byConf = {}, sourceCount = 0;
    Object.keys(LifeOS.EVIDENCE).forEach(function (k) {
      var e = LifeOS.EVIDENCE[k];
      (byConf[e.confidence] = byConf[e.confidence] || []).push(k);
      sourceCount += (e.sources || []).length;
    });

    var counts = el('div', 'res-counts');
    RESEARCH_ORDER.forEach(function (c) {
      var n = (byConf[c] || []).length;
      if (!n) return;
      var pill = el('span', 'res-count conf-' + c);
      pill.appendChild(el('strong', null, String(n)));
      pill.appendChild(document.createTextNode(' ' + LifeOS.CONFIDENCE[c].label.toLowerCase()));
      pill.title = LifeOS.CONFIDENCE[c].note;
      counts.appendChild(pill);
    });
    var tot = el('span', 'res-count res-count-total');
    tot.appendChild(el('strong', null, String(sourceCount)));
    tot.appendChild(document.createTextNode(' cited sources'));
    counts.appendChild(tot);
    host.appendChild(counts);

    var lead = el('p', 'res-lead');
    lead.appendChild(el('strong', null, 'And it cuts both ways. '));
    lead.appendChild(document.createTextNode(
      'Reading the evidence changed three of the recommendations — it is not decoration:'));
    host.appendChild(lead);

    var grid = el('div', 'changed-grid');
    CHANGED_MY_MIND.forEach(function (c) {
      var card = el('div', 'changed');
      var swap = el('div', 'ch-swap');
      swap.appendChild(el('span', 'ch-was', c.was));
      swap.appendChild(el('span', 'ch-arrow', '→'));
      swap.appendChild(el('span', 'ch-now', c.now));
      card.appendChild(swap);
      card.appendChild(el('p', 'ch-why', c.because));
      var ev = LifeOS.evidenceFor(c.key);
      if (ev && ev.sources && ev.sources.length) {
        var a = el('a', 'ch-src', ev.sources[0].label);
        a.href = ev.sources[0].url; a.target = '_blank'; a.rel = 'noopener noreferrer';
        card.appendChild(a);
      }
      grid.appendChild(card);
    });
    host.appendChild(grid);

    var foot = el('p', 'muted res-foot');
    foot.appendChild(document.createTextNode(
      'The full reasoning lives with each area of your plan below — what it suggests, why, ' +
      'what the source does '));
    foot.appendChild(el('em', null, 'not'));
    foot.appendChild(document.createTextNode(' say, and every link. Nothing is buried and nothing is dressed up.'));
    host.appendChild(foot);
  }

  /* Some evidence keys are topics rather than domains (back, neck, sitting…). */
  var TOPIC_NAMES = {
    back: 'Back', neck: 'Neck & shoulders', sitting: 'Sitting all day',
    stress: 'Stress & meditation', protein: 'Protein', walk: 'Walking',
    retirement: '401(k) & retirement'
  };
  function titleFor(key, d) {
    return TOPIC_NAMES[key] || (d.label !== key ? d.label : key);
  }

  /* ------------------------------------------------------------ public */
  function renderAll(plan) {
    renderPlan(plan);
    renderCoverage(plan);
    renderDomainTabs(plan);
    renderDomain(plan);
    renderCalendar(plan);
    renderResearch();
    renderRibbon(plan);
    renderQuilt(plan);
    renderYear(plan);
    renderMatrix(plan);
    var stage = $('#plan-stage');
    if (stage) stage.hidden = false;
  }

  LifeOS.views = {
    renderAll: renderAll,
    renderPlan: renderPlan,
    renderCoverage: renderCoverage,
    renderCalendar: renderCalendar,
    renderMatrix: renderMatrix,
    renderResearch: renderResearch,
    renderRibbon: renderRibbon,
    renderQuilt: renderQuilt,
    renderYear: renderYear,
    icon: icon,
    el: el,
    clear: clear
  };
})(window);
