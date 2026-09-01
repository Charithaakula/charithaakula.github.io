/* Life OS — bootstrap and wiring. */
(function (root) {
  var LifeOS = (root.LifeOS = root.LifeOS || {});

  var CONTACT_EMAIL = 'saicharitha21@gmail.com';

  function $(s) { return document.querySelector(s); }
  function $$(s) { return Array.prototype.slice.call(document.querySelectorAll(s)); }

  /* ------------------------------------------------------------- plan */
  function rebuild() {
    // A drag re-renders everything; without this the grid snaps back to the
    // left and you lose the day you were looking at.
    var scrolls = $$('.scroll-x').map(function (n) { return n.scrollLeft; });

    var s = LifeOS.store.get();
    var plan = LifeOS.planner.build(s.profile, s.dislikes);
    LifeOS.store.setPlan(plan);
    LifeOS.views.renderAll(plan);
    $$('.scroll-x').forEach(function (n, i) { if (scrolls[i]) n.scrollLeft = scrolls[i]; });

    var gtb = $('#toggle-group');
    if (gtb) gtb.textContent = s.profile.grouped === false ? 'Group related' : 'Show all 19';
    var hint = $('#empty-hint');
    if (hint) hint.hidden = true;
    // Sections that only make sense once a plan exists.
    $$('.stage-only').forEach(function (el) { el.hidden = false; });
    return plan;
  }

  function scrollToPlan() {
    var stage = $('#plan-stage');
    if (stage) stage.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  /* --------------------------------------------------------- demo mode */
  var DEMO = {
    focus: ['nutrition', 'strength', 'cardio', 'mobility', 'sleep', 'money', 'career',
            'relationships', 'home', 'admin', 'grooming', 'events', 'mind', 'digital', 'learning'],
    mode: 'base',
    morningMinutes: 40,
    eveningMinutes: 60,
    constraints: [],
    struggle: 'money',
    noMorningWorkouts: false,
    travelWeek: false,
    busyDays: []
  };

  function loadExample() {
    LifeOS.store.updateProfile(DEMO);
    LifeOS.store.update({ onboarded: true });
    rebuild();
    scrollToPlan();
  }

  /* ------------------------------------------------------------- tabs */
  function initTabs() {
    $$('.tab').forEach(function (tab) {
      tab.addEventListener('click', function () {
        var target = tab.getAttribute('data-tab');
        $$('.tab').forEach(function (t) { t.classList.toggle('is-active', t === tab); });
        $$('.tabpanel').forEach(function (p) {
          p.hidden = p.getAttribute('data-panel') !== target;
        });
      });
    });
  }

  /* ----------------------------------------------------------- status */
  function refreshStatus() {
    var chip = $('#ai-status');
    if (!chip) return;
    if (LifeOS.model.available()) {
      chip.textContent = 'AI connected';
      chip.className = 'status status-on';
      chip.title = 'Chat is answered by a language model through your serverless endpoint.';
    } else {
      chip.textContent = 'Demo mode · on-device planner';
      chip.className = 'status status-off';
      chip.title = 'No model endpoint configured. Planning is real; free-form chat is limited. See the README.';
    }
  }

  /* --------------------------------------------------------- feedback */
  function initFeedback() {
    var form = $('#feedback-form');
    if (!form) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var data = {
        useful: $$('input[name="useful"]:checked').map(function (i) { return i.value; }),
        worry: $$('input[name="worry"]:checked').map(function (i) { return i.value; }),
        would_use: (($$('input[name="woulduse"]:checked')[0] || {}).value) || '',
        text: ($('#feedback-text') || {}).value || '',
        profile: LifeOS.store.profile(),
        at: new Date().toISOString()
      };
      LifeOS.store.update({ feedback: data });

      var status = $('#feedback-status');
      var endpoint = LifeOS.CONFIG && LifeOS.CONFIG.feedbackEndpoint;

      if (endpoint) {
        fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        }).then(function () {
          status.textContent = 'Thank you — that is genuinely useful.';
        }).catch(function () {
          openMail(data, status);
        });
      } else {
        openMail(data, status);
      }
    });
  }

  function openMail(data, status) {
    var body =
      'Would you use Life OS: ' + (data.would_use || '(not answered)') + '\n' +
      'Most useful: ' + (data.useful.join(', ') || '(none)') + '\n' +
      'Worries: ' + (data.worry.join(', ') || '(none)') + '\n\n' +
      'What would make this useful enough to use weekly:\n' + (data.text || '(blank)') + '\n';
    var href = 'mailto:' + CONTACT_EMAIL +
      '?subject=' + encodeURIComponent('Life OS feedback') +
      '&body=' + encodeURIComponent(body);
    if (status) {
      status.textContent = 'Opening your email app — hit send and it reaches me directly.';
    }
    root.location.href = href;
  }

  /* --------------------------------------------------------- move toast */
  var toastTimer = null;

  function afterMove(itemId, fromDay, toDay, days) {
    var item = null;
    for (var i = 0; i < LifeOS.ITEMS.length; i++) {
      if (LifeOS.ITEMS[i].id === itemId) { item = LifeOS.ITEMS[i]; break; }
    }
    var host = $('#toast');
    if (!host) return;
    while (host.firstChild) host.removeChild(host.firstChild);

    var msg = document.createElement('span');
    msg.textContent = (item ? item.title : 'Item') + ' \u2192 ' + LifeOS.DAYS[toDay];
    host.appendChild(msg);

    var undo = document.createElement('button');
    undo.type = 'button';
    undo.className = 'toast-undo';
    undo.textContent = 'Undo';
    undo.addEventListener('click', function () {
      LifeOS.store.moveItem(itemId, toDay, fromDay, days);
      rebuild();
      hideToast();
    });
    host.appendChild(undo);

    host.classList.add('is-up');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(hideToast, 6000);
  }

  function hideToast() {
    var host = $('#toast');
    if (host) host.classList.remove('is-up');
  }

  /* ------------------------------------------------------------ reset */
  function initReset() {
    var btn = $('#reset-btn');
    if (!btn) return;
    btn.addEventListener('click', function () {
      LifeOS.store.reset();
      var stage = $('#plan-stage');
      if (stage) stage.hidden = true;
      $$('.stage-only').forEach(function (el) { el.hidden = true; });
      var hint = $('#empty-hint');
      if (hint) hint.hidden = false;
      LifeOS.chat.restart();
    });
  }

  /* ------------------------------------------------------------- boot */
  function init() {
    LifeOS.model.configure(root.LifeOS.CONFIG || {});
    if (LifeOS.theme) LifeOS.theme.init();
    LifeOS.chat.init();
    initTabs();
    initFeedback();
    initReset();
    refreshStatus();

    $$('[data-example]').forEach(function (b) { b.addEventListener('click', loadExample); });

    var gt = $('#toggle-group');
    if (gt) gt.addEventListener('click', function () {
      var prof = LifeOS.store.profile();
      LifeOS.store.updateProfile({ grouped: prof.grouped === false });
      rebuild();
    });

    // Voice controls only appear if the browser actually has the API.
    if (LifeOS.voice && LifeOS.voice.supported()) {
      var bd = $('#brain-dump'), vn = $('#voice-note');
      if (bd) {
        bd.hidden = false;
        bd.addEventListener('click', function () {
          if (!LifeOS.store.get().onboarded) loadExample();
          LifeOS.chat.open();
          var mic = document.getElementById('mic-btn');
          if (mic) mic.click();
        });
      }
      if (vn) vn.hidden = false;
    }

    var ics = $('#export-ics');
    if (ics) ics.addEventListener('click', function () {
      var plan = LifeOS.store.get().plan;
      if (!plan) return;
      var made = LifeOS.ics.download(plan);
      var host = $('#toast');
      if (host) {
        while (host.firstChild) host.removeChild(host.firstChild);
        var span = document.createElement('span');
        span.textContent = made.events + ' events for the next ' + made.weeks +
          ' weeks — import life-os.ics into a new calendar, not your main one.';
        host.appendChild(span);
        host.classList.add('is-up');
        clearTimeout(toastTimer);
        toastTimer = setTimeout(hideToast, 8000);
      }
    });

    var undoAll = $('#clear-moves');
    if (undoAll) undoAll.addEventListener('click', function () {
      LifeOS.store.clearMoves();
      rebuild();
      hideToast();
    });

    // The example phrases on the customise block are live — tapping one sends it.
    $$('[data-say]').forEach(function (b) {
      b.addEventListener('click', function () {
        if (!LifeOS.store.get().onboarded) loadExample();
        LifeOS.chat.open();
        LifeOS.chat.send(b.getAttribute('data-say'));
      });
    });

    // The research stands on its own — it does not need a plan to exist.
    if (LifeOS.views.renderResearch) LifeOS.views.renderResearch();

    var s = LifeOS.store.get();
    if (s.onboarded) {
      rebuild();
    } else {
      var stage = $('#plan-stage');
      if (stage) stage.hidden = true;
    }

    var year = $('#year');
    if (year) year.textContent = String(new Date().getFullYear());
  }

  LifeOS.app = {
    init: init,
    rebuild: rebuild,
    afterMove: afterMove,
    scrollToPlan: scrollToPlan,
    refreshStatus: refreshStatus,
    loadExample: loadExample
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})(window);
