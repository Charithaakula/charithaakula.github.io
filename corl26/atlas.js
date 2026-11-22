/* Progressive enhancement: the generated notes and source links work without JS. */
(() => {
  'use strict';
  const one = (s, root = document) => root.querySelector(s);
  const all = (s, root = document) => [...root.querySelectorAll(s)];
  const sec = n => [Math.floor(n / 3600), Math.floor(n % 3600 / 60), n % 60].map(x => String(x).padStart(2, '0')).join(':');
  const params = new URLSearchParams(location.search);
  const page = document.body.dataset.page;
  const sourceHref = (id, start) => `https://www.youtube.com/watch?v=${encodeURIComponent(id)}&t=${Math.max(0, start)}s`;

  if (page === 'panels') {
    const activate = () => {
      const hash = location.hash.slice(1);
      if (hash === 'library' || hash.startsWith('library?')) { location.replace(`library/index.html${hash.includes('?') ? '?' + hash.split('?')[1] : ''}`); return; }
      if (hash === 'map') { location.replace('field-map/index.html'); return; }
      const target = document.getElementById(hash);
      const current = target?.classList.contains('panel-display') ? target : one('.panel-display');
      all('.panel-display').forEach(p => p.classList.toggle('is-selected', p === current));
      all('.panel-choice').forEach(a => { const selected = a.hash === '#' + current?.id; a.classList.toggle('active', selected); a.setAttribute('aria-current', String(selected)); });
    };
    addEventListener('hashchange', activate); activate();
    document.documentElement.classList.add('js');
  }

  if (page === 'library') {
    const entries = all('.index-entry');
    const articles = all('.reader-article');
    const reader = one('.library-reader');
    const search = one('#library-search');
    const kind = one('#kind-filter');
    const day = one('#day-filter');
    const count = one('#result-count');
    const empty = one('#empty-results');
    let selected = '';
    const choose = (id, update = false) => {
      const article = document.getElementById(id);
      if (!article) return false;
      selected = id;
      articles.filter(a => a !== article).forEach(a => { one('.video-host', a)?.replaceChildren(); const button = one('.watch-inline', a); if (button) button.textContent = 'Watch here'; });
      articles.forEach(a => a.classList.toggle('is-selected', a === article));
      entries.forEach(e => e.setAttribute('aria-current', String(e.hash === '#' + id)));
      reader.classList.remove('no-results');
      if (update) history.replaceState(null, '', '#' + id);
      return true;
    };
    const filter = () => {
      const q = search.value.trim().toLocaleLowerCase();
      const words = q.split(/\s+/).filter(Boolean);
      const shown = entries.filter(e => {
        const match = words.every(w => e.dataset.search.includes(w)) && (kind.value === 'all' || kind.value === e.dataset.kind) && (day.value === 'all' || day.value === e.dataset.day);
        e.hidden = !match;
        return match;
      });
      all('.index-group').forEach(group => group.hidden = !shown.some(e => e.dataset.group === group.dataset.group));
      count.textContent = `${shown.length} ${shown.length === 1 ? 'entry' : 'entries'}`;
      reader.classList.toggle('no-results', shown.length === 0);
      empty.hidden = shown.length !== 0;
      if (shown.length && !shown.some(e => e.hash === '#' + selected)) choose(shown[0].hash.slice(1));
    };
    search.addEventListener('input', filter);
    kind.addEventListener('change', filter);
    day.addEventListener('change', filter);
    one('#reset-filters').addEventListener('click', () => { search.value = ''; kind.value = day.value = 'all'; filter(); search.focus(); });
    entries.forEach(e => e.addEventListener('click', () => choose(e.hash.slice(1))));
    const fromRoute = () => {
      const hash = decodeURIComponent(location.hash.slice(1));
      const id = hash || (params.has('talk') ? 'talk-' + params.get('talk').replace(/^talk-/, '') : '');
      if (id && document.getElementById(id)) {
        const e = entries.find(e => e.hash === '#' + id);
        if (e && e.hidden) { search.value = ''; kind.value = day.value = 'all'; filter(); }
        choose(id);
      }
    };
    search.value = params.get('q') || params.get('topic') || '';
    if (params.get('kind') && [...kind.options].some(o => o.value === params.get('kind'))) kind.value = params.get('kind');
    if (params.get('day') && [...day.options].some(o => o.value === params.get('day'))) day.value = params.get('day');
    document.documentElement.classList.add('js');
    filter(); fromRoute();
    addEventListener('hashchange', fromRoute);
    all('.watch-inline').forEach(button => button.addEventListener('click', () => {
      const article = button.closest('.reader-article');
      const host = one('.video-host', article);
      if (host.firstChild) { host.replaceChildren(); button.textContent = 'Watch here'; return; }
      const iframe = document.createElement('iframe');
      iframe.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(button.dataset.recording)}?start=${Number(button.dataset.start)}&autoplay=1`;
      iframe.title = `Original recording: ${one('h2', article).textContent}`;
      iframe.allow = 'autoplay; encrypted-media; picture-in-picture';
      iframe.allowFullscreen = true;
      host.append(iframe); button.textContent = 'Close video';
    }));
    all('.transcript-details[data-src]').forEach(detail => detail.addEventListener('toggle', async () => {
      if (!detail.open || detail.dataset.loaded) return;
      const content = one('.transcript-body', detail);
      detail.dataset.loaded = 'loading';
      content.textContent = 'Loading the original transcript…';
      try {
        const response = await fetch(detail.dataset.src);
        if (!response.ok) throw new Error('Transcript could not be loaded');
        const text = await response.text();
        content.replaceChildren();
        const lines = text.split('\n').filter(Boolean);
        for (const line of lines) {
          const p = document.createElement('p');
          const match = line.match(/^\[(\d\d):(\d\d):(\d\d)\]\s*(.*)$/);
          if (match && detail.dataset.recording) {
            const a = document.createElement('a');
            const time = Number(match[1]) * 3600 + Number(match[2]) * 60 + Number(match[3]);
            a.href = sourceHref(detail.dataset.recording, time); a.target = '_blank'; a.rel = 'noopener';
            a.className = 'transcript-time'; a.textContent = sec(time); a.setAttribute('aria-label', `Watch transcript segment at ${sec(time)}`);
            p.append(a, document.createTextNode(' ' + match[4]));
          } else p.textContent = line;
          content.append(p);
        }
        detail.dataset.loaded = 'yes';
      } catch (_) {
        content.textContent = 'The inline transcript could not be loaded. Use the transcript file link above to read it.';
        delete detail.dataset.loaded;
      }
    }));
    const selectedArticle = document.getElementById(selected);
    const viewSelector = {transcript:'.transcript-details[data-src]',timing:'.source-details'}[params.get('view')];
    if (viewSelector && selectedArticle) { const detail = one(viewSelector,selectedArticle); if (detail) { detail.open=true; detail.scrollIntoView(); } }
    if (params.get('view')==='notes' && selectedArticle) one('.research-summary',selectedArticle)?.scrollIntoView();
    document.documentElement.classList.add('js');
  }

  if (page === 'map') {
    const cards = all('.topic-card');
    const details = all('.topic-detail');
    const buttons = all('[data-stage-filter]');
    const search = one('#map-search');
    const nodes = all('.graph-node');
    const edges = all('.graph-edge');
    let stage = 'all';
    const choose = id => {
      const detail = document.getElementById(id);
      if (!detail || !detail.classList.contains('topic-detail')) return;
      details.forEach(x => x.classList.toggle('is-selected', x === detail));
      cards.forEach(x => x.classList.toggle('selected', x.hash === '#' + id));
      const key = id.replace(/^topic-/, '');
      edges.forEach(e => {
        const active = e.dataset.from === key || e.dataset.to === key;
        e.classList.toggle('selected', active); e.classList.remove('dimmed');
      });
      nodes.forEach(n => { n.classList.toggle('selected', n.dataset.id === key); n.classList.remove('dimmed'); });
      all('.example[data-source-id]', detail).forEach(ex => ex.classList.toggle('source-highlight', ex.dataset.sourceId === params.get('source')));
      const example = one('.source-highlight', detail);
      if (example) example.scrollIntoView({block:'center'});
    };
    const filter = () => {
      const q = search.value.trim().toLowerCase();
      cards.forEach(c => { c.hidden = (stage !== 'all' && c.dataset.stage !== stage) || !c.dataset.search.includes(q); });
      one('#map-count').textContent = `${cards.filter(c => !c.hidden).length} pathways`;
      one('#map-empty').hidden = cards.some(c => !c.hidden);
    };
    buttons.forEach(b => b.addEventListener('click', () => { stage = b.dataset.stageFilter; buttons.forEach(x => x.setAttribute('aria-pressed', String(x === b))); filter(); }));
    search.addEventListener('input', filter);
    const aliases = {
      'architectures':'control-timescales',
      'detail-learn-1':'representation-data', 'detail-learn-2':'weight-adaptation', 'detail-learn-3':'simulation-transfer', 'detail-learn-4':'recovery-learning',
      'detail-act-1':'direct-policy', 'detail-act-2':'control-timescales', 'detail-act-3':'agentic-execution', 'detail-act-4':'world-planning', 'detail-act-5':'runtime-memory', 'detail-act-6':'coordination',
      'detail-improve-1':'evaluation-validity', 'detail-improve-2':'evaluation-validity', 'detail-improve-3':'recovery-learning', 'detail-improve-4':'agentic-learning'
    };
    const route = () => {
      const hash = decodeURIComponent(location.hash.slice(1));
      if (['learn','act','improve'].includes(hash)) {
        stage = hash; buttons.forEach(b => b.setAttribute('aria-pressed', String(b.dataset.stageFilter === stage))); filter();
        const card = cards.find(c => c.dataset.stage === stage); if (card) choose(card.hash.slice(1));
        one('.topic-grid').scrollIntoView(); return;
      }
      const mapped = aliases[hash] ? 'topic-' + aliases[hash] : hash;
      if (mapped && document.getElementById(mapped)?.classList.contains('topic-detail')) {
        choose(mapped);
        if (mapped !== hash) { history.replaceState(null, '', '#' + mapped); document.getElementById(mapped).scrollIntoView(); }
      }
      else if (!hash) choose(details[0]?.id);
    };
    addEventListener('hashchange', route);
    document.documentElement.classList.add('js');
    route(); filter();
    document.documentElement.classList.add('js');
  }
})();
