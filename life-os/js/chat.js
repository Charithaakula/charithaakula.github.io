/* Life OS — Ask Life OS panel.
 * Short scripted onboarding (five questions, mostly one tap each), then free
 * conversation. Deterministic UI work stays local; only free-form turns go to
 * the model.
 */
(function (root) {
  var LifeOS = (root.LifeOS = root.LifeOS || {});
  var el, clear;

  var history = [];      // {role, content} for the model
  var step = -1;         // -1 = not onboarding
  var pending = {};      // answers being collected
  var busy = false;

  /* ---------------------------------------------------------- onboarding */
  var STEPS = [
    {
      key: 'focus',
      q: 'What do you want Life OS to help with most? Pick as many as you like.',
      multi: true,
      options: [
        { label: 'Health & fitness', value: ['strength', 'cardio', 'mobility', 'sleep'] },
        { label: 'Food', value: ['nutrition'] },
        { label: 'Body & skin', value: ['grooming'] },
        { label: 'Mind & mood', value: ['mind'] },
        { label: 'Money', value: ['money'] },
        { label: 'Career & learning', value: ['career', 'learning'] },
        { label: 'Relationships', value: ['relationships'] },
        { label: 'Going out & events', value: ['events'] },
        { label: 'Home & admin', value: ['home', 'admin', 'digital'] },
        { label: 'Travel', value: ['travel'] },
        { label: 'Pets', value: ['pets'] },
        { label: 'Everything', value: [] }
      ],
      apply: function (picked) {
        var merged = [];
        picked.forEach(function (p) { p.value.forEach(function (v) { if (merged.indexOf(v) === -1) merged.push(v); }); });
        var everything = picked.some(function (p) { return p.label === 'Everything'; });
        return { focus: everything ? [] : merged };
      }
    },
    {
      key: 'time',
      q: 'What does a normal workday look like?',
      options: [
        { label: 'Rushed mornings, free evenings', value: { morningMinutes: 15, eveningMinutes: 90 } },
        { label: 'Early riser, evenings are gone', value: { morningMinutes: 75, eveningMinutes: 20 } },
        { label: 'A bit of both', value: { morningMinutes: 40, eveningMinutes: 60 } },
        { label: 'Honestly, very little of either', value: { morningMinutes: 10, eveningMinutes: 20 } }
      ],
      apply: function (picked) { return picked[0].value; }
    },
    {
      key: 'mode',
      q: 'And right now — what kind of stretch are you in?',
      options: [
        { label: 'Busy. Protect the essentials.', value: { mode: 'minimum' } },
        { label: 'Normal.', value: { mode: 'base' } },
        { label: 'I have capacity to push.', value: { mode: 'build' } }
      ],
      apply: function (picked) { return picked[0].value; }
    },
    {
      key: 'constraints',
      q: 'Any dietary or physical constraints I should plan around?',
      multi: true,
      options: [
        { label: 'None', value: null },
        { label: 'Vegetarian', value: 'vegetarian' },
        { label: 'Vegan', value: 'vegan' },
        { label: 'Dairy-free', value: 'dairyfree' },
        { label: 'Gluten-free', value: 'glutenfree' },
        { label: 'Nut allergy', value: 'nutallergy' },
        { label: 'Bad knees / low impact', value: 'lowimpact' }
      ],
      apply: function (picked) {
        return { constraints: picked.map(function (p) { return p.value; }).filter(Boolean) };
      }
    },
    {
      key: 'struggle',
      q: 'Last one: what is the thing you keep meaning to do and never manage to keep up?',
      options: [
        { label: 'Cooking / eating well', value: 'nutrition' },
        { label: 'Training consistently', value: 'strength' },
        { label: 'Sleep', value: 'sleep' },
        { label: 'Money admin', value: 'money' },
        { label: 'Seeing people', value: 'relationships' },
        { label: 'Actually going out', value: 'events' },
        { label: 'Skin / body routine', value: 'grooming' },
        { label: 'Anything just for me', value: 'hobby' }
      ],
      apply: function (picked) { return { struggle: picked[0].value }; }
    }
  ];

  /* ------------------------------------------------------------ plumbing */
  function log() { return document.getElementById('chat-log'); }

  function scroll() {
    var l = log();
    if (l) l.scrollTop = l.scrollHeight;
  }

  function bubble(role, text) {
    var l = log();
    if (!l) return null;
    var b = el('div', 'msg msg-' + role);
    b.appendChild(el('p', null, text));
    l.appendChild(b);
    scroll();
    return b;
  }

  function typing(on) {
    var l = log();
    if (!l) return;
    var existing = document.getElementById('typing');
    if (on && !existing) {
      var t = el('div', 'msg msg-bot typing');
      t.id = 'typing';
      t.appendChild(el('span', 'dot1', '•'));
      t.appendChild(el('span', 'dot2', '•'));
      t.appendChild(el('span', 'dot3', '•'));
      l.appendChild(t);
      scroll();
    } else if (!on && existing) {
      existing.parentNode.removeChild(existing);
    }
  }

  function options(stepDef, onDone) {
    var l = log();
    var wrap = el('div', 'opts');
    var chosen = [];

    stepDef.options.forEach(function (opt) {
      var b = el('button', 'opt', opt.label);
      b.type = 'button';
      b.addEventListener('click', function () {
        if (stepDef.multi) {
          var i = chosen.indexOf(opt);
          if (i === -1) { chosen.push(opt); b.classList.add('is-on'); }
          else { chosen.splice(i, 1); b.classList.remove('is-on'); }
          done.hidden = chosen.length === 0;
        } else {
          wrap.parentNode.removeChild(wrap);
          bubble('user', opt.label);
          onDone([opt]);
        }
      });
      wrap.appendChild(b);
    });

    var done = el('button', 'opt opt-done', 'Continue');
    done.type = 'button';
    done.hidden = true;
    if (stepDef.multi) {
      done.addEventListener('click', function () {
        wrap.parentNode.removeChild(wrap);
        bubble('user', chosen.map(function (c) { return c.label; }).join(', '));
        onDone(chosen);
      });
      wrap.appendChild(done);
    }
    l.appendChild(wrap);
    scroll();
  }

  function ask(i) {
    step = i;
    if (i >= STEPS.length) { finishOnboarding(); return; }
    var s = STEPS[i];
    bubble('bot', s.q);
    options(s, function (picked) {
      var patch = s.apply(picked);
      Object.keys(patch).forEach(function (k) { pending[k] = patch[k]; });
      setTimeout(function () { ask(i + 1); }, 220);
    });
  }

  function finishOnboarding() {
    step = -1;
    LifeOS.store.updateProfile(pending);
    LifeOS.store.update({ onboarded: true });
    typing(true);
    setTimeout(function () {
      typing(false);
      var plan = LifeOS.app.rebuild();
      var n = plan.today.length + plan.anchors.length;
      bubble('bot', 'Done. Your Life OS is built.');
      bubble('bot', 'Today has ' + n + ' things on it — ' + plan.anchors.length + ' daily anchors and ' +
        plan.today.length + ' scheduled. ' + plan.week.length + ' more sit in this week, ' +
        plan.month.length + ' in this month, and ' + plan.notNow.length +
        ' are tracked for later so you do not have to hold them.');
      bubble('bot', 'Change anything by telling me: “Tuesday is busy”, “no morning workouts”, ' +
        '“I’m travelling next week”, or “why strength session?”');
      LifeOS.app.scrollToPlan();
    }, 700);
  }

  /* --------------------------------------------------------------- voice */
  function initVoice() {
    var btn = document.getElementById('mic-btn');
    var input = document.getElementById('chat-input');
    if (!btn) return;
    if (!LifeOS.voice || !LifeOS.voice.supported()) { btn.hidden = true; return; }

    btn.addEventListener('click', function () {
      if (LifeOS.voice.listening()) { LifeOS.voice.stop(); return; }
      btn.classList.add('is-live');
      btn.title = 'Listening — click to stop';
      LifeOS.voice.start(function (text) {
        input.value = text;
      }, function (finalText) {
        btn.classList.remove('is-live');
        btn.title = 'Speak instead of typing';
        if (finalText && finalText.trim()) {
          input.value = '';
          if (step !== -1) { bubble('note', 'Finish the questions above first.'); return; }
          dump(finalText);
        }
      }, { continuous: true });
    });
  }

  /* One long utterance, many changes at once. */
  function dump(text) {
    if (busy) return;
    busy = true;
    bubble('user', text);
    history.push({ role: 'user', content: text });
    typing(true);

    var run = LifeOS.model.available()
      ? LifeOS.model.send(history.slice(-12), LifeOS.store.context())
      : Promise.resolve(LifeOS.localBrain.digest(text, LifeOS.store.context()));

    run.then(function (res) {
      typing(false);
      busy = false;
      if (res.patch) LifeOS.store.updateProfile(res.patch);
      (res.dislikes || (res.dislike ? [res.dislike] : [])).forEach(function (d) { LifeOS.store.dislike(d); });
      LifeOS.store.remember(text);
      bubble('bot', res.reply);
      history.push({ role: 'assistant', content: res.reply });
      if (res.rebuild || res.patch) {
        LifeOS.app.rebuild();
        var note = el('p', 'chat-note', 'Plan updated');
        log().appendChild(note);
        scroll();
      }
    });
  }

  /* ------------------------------------------------------- free chat */
  function send(text) {
    if (busy || !text.trim()) return;
    busy = true;
    bubble('user', text);
    history.push({ role: 'user', content: text });
    history = history.slice(-12);
    typing(true);

    LifeOS.model.send(history, LifeOS.store.context()).then(function (res) {
      typing(false);
      busy = false;

      if (res.patch) LifeOS.store.updateProfile(res.patch);
      if (res.dislike) LifeOS.store.dislike(res.dislike);
      LifeOS.store.remember(text);

      bubble('bot', res.reply);
      history.push({ role: 'assistant', content: res.reply });

      if (res.rebuild || res.patch || res.dislike) {
        LifeOS.app.rebuild();
        var note = el('p', 'chat-note', 'Plan updated · Life OS remembers this for next time');
        log().appendChild(note);
        scroll();
      }
      if (res.degraded) {
        bubble('note', 'The model endpoint did not answer, so that came from the on-device planner.');
      }
      LifeOS.app.refreshStatus();
    });
  }

  /* ------------------------------------------------------------ wiring */
  function open() {
    var panel = document.getElementById('chat-panel');
    if (!panel) return;
    panel.classList.add('is-open');
    panel.setAttribute('aria-hidden', 'false');
    var input = document.getElementById('chat-input');
    if (input) setTimeout(function () { input.focus(); }, 60);
    if (!LifeOS.store.get().onboarded && step === -1 && !log().childNodes.length) {
      bubble('bot', 'I’m Life OS. Five quick questions and I’ll build you a plan you can actually follow.');
      setTimeout(function () { ask(0); }, 400);
    }
  }

  function close() {
    var panel = document.getElementById('chat-panel');
    if (!panel) return;
    panel.classList.remove('is-open');
    panel.setAttribute('aria-hidden', 'true');
  }

  function restart() {
    clear(log());
    history = [];
    pending = {};
    step = -1;
    open();
  }

  function init() {
    el = LifeOS.views.el;
    clear = LifeOS.views.clear;

    var form = document.getElementById('chat-form');
    var input = document.getElementById('chat-input');
    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        if (step !== -1) {
          bubble('note', 'Finish the five questions above first — or tap an option.');
          input.value = '';
          return;
        }
        var v = input.value;
        input.value = '';
        send(v.slice(0, 800));
      });
    }
    var openers = document.querySelectorAll('[data-chat-open]');
    for (var i = 0; i < openers.length; i++) openers[i].addEventListener('click', open);
    var closer = document.getElementById('chat-close');
    if (closer) closer.addEventListener('click', close);
    initVoice();

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') close();
    });
  }

  LifeOS.chat = { init: init, open: open, close: close, restart: restart, send: send, dump: dump };
})(window);
