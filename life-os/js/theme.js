/* Life OS — themes.
 *
 * A theme is a block of CSS custom properties in styles.css, nothing more.
 * This file only flips `data-theme` on <html> and remembers the choice, so
 * adding a look means adding one CSS block and one line to THEMES below —
 * no JavaScript to touch.
 */
(function (root) {
  var LifeOS = (root.LifeOS = root.LifeOS || {});
  var KEY = 'lifeos.theme';

  var THEMES = [
    { key: 'studio',   label: 'Studio',   note: 'Cream, navy, serif. Editorial.' },
    { key: 'noir',     label: 'Noir',     note: 'Near-black with electric lime.' },
    { key: 'sunshine', label: 'Sunshine', note: 'Monospace and gold. Very quiet.' }
  ];

  var current = THEMES[0].key;

  function apply(key, remember) {
    var found = THEMES.filter(function (t) { return t.key === key; })[0];
    if (!found) return;
    current = found.key;
    document.documentElement.setAttribute('data-theme', current);
    if (remember !== false) {
      try { root.localStorage.setItem(KEY, current); } catch (e) {}
    }
    var host = document.getElementById('theme-switch');
    if (host) {
      var dots = host.querySelectorAll('.theme-dot');
      for (var i = 0; i < dots.length; i++) {
        var on = dots[i].getAttribute('data-theme-key') === current;
        dots[i].classList.toggle('is-active', on);
        dots[i].setAttribute('aria-pressed', on ? 'true' : 'false');
      }
    }
  }

  function mount() {
    var host = document.getElementById('theme-switch');
    if (!host) return;
    THEMES.forEach(function (t) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'theme-dot theme-' + t.key;
      b.setAttribute('data-theme-key', t.key);
      b.setAttribute('aria-label', 'Theme: ' + t.label);
      b.title = t.label + ' — ' + t.note;
      b.addEventListener('click', function () { apply(t.key); });
      host.appendChild(b);
    });
  }

  function init() {
    var saved = null;
    try { saved = root.localStorage.getItem(KEY); } catch (e) {}
    mount();
    // A theme saved by an older build may no longer exist — fall back rather
    // than leaving no swatch selected.
    var known = THEMES.some(function (t) { return t.key === saved; });
    apply(known ? saved : THEMES[0].key, !known);
  }

  LifeOS.theme = { init: init, apply: apply, THEMES: THEMES, current: function () { return current; } };
})(window);
