/* Life OS — voice input.
 *
 * Uses the browser's own SpeechRecognition. No API key, no audio upload, no
 * backend: on Chrome and Safari the recognition happens through the browser's
 * service, and Life OS only ever sees the transcript. If the API is missing —
 * Firefox, older browsers — every voice control hides itself and typing still
 * works, so nothing depends on it.
 */
(function (root) {
  var LifeOS = (root.LifeOS = root.LifeOS || {});

  var Rec = root.SpeechRecognition || root.webkitSpeechRecognition || null;
  var active = null;

  function supported() { return !!Rec; }

  /* onText(transcript, isFinal) fires as you speak; onEnd() when it stops. */
  function start(onText, onEnd, opts) {
    if (!Rec) return null;
    stop();
    opts = opts || {};

    var r = new Rec();
    r.lang = opts.lang || (root.navigator && root.navigator.language) || 'en-US';
    r.continuous = !!opts.continuous;      // long-form dictation for the brain dump
    r.interimResults = true;
    r.maxAlternatives = 1;

    var settled = '';
    r.onresult = function (ev) {
      var interim = '';
      for (var i = ev.resultIndex; i < ev.results.length; i++) {
        var chunk = ev.results[i][0].transcript;
        if (ev.results[i].isFinal) settled += chunk + ' ';
        else interim += chunk;
      }
      onText((settled + interim).trim(), false);
    };
    r.onerror = function (ev) {
      active = null;
      if (onEnd) onEnd(settled.trim(), ev && ev.error);
    };
    r.onend = function () {
      active = null;
      onText(settled.trim(), true);
      if (onEnd) onEnd(settled.trim(), null);
    };

    try { r.start(); active = r; } catch (e) { active = null; }
    return r;
  }

  function stop() {
    if (active) { try { active.stop(); } catch (e) {} active = null; }
  }

  function listening() { return !!active; }

  LifeOS.voice = { supported: supported, start: start, stop: stop, listening: listening };
})(window);
