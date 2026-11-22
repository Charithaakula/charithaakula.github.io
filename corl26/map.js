/* Reuse the original topic article in a native dialog; no cross-topic graph. */
(() => {
  'use strict';
  const atlasBase=new URL(location.pathname.includes('/field-map/')?'../':'./',location.href);
  const legacyHash=location.hash.slice(1);
  if (legacyHash==='panels' || /^panel-\d+$/.test(legacyHash)) {
    location.replace(new URL('panels/index.html#'+legacyHash,atlasBase).href);return;
  }
  if (legacyHash==='library' || legacyHash.startsWith('library?')) {
    location.replace(new URL('library/index.html'+(legacyHash.includes('?')?'?'+legacyHash.split('?')[1]:''),atlasBase).href);return;
  }
  const dialog=document.getElementById('map-topic-dialog');
  if (!dialog || typeof dialog.showModal!=='function') return;
  const content=document.getElementById('map-popup-content');
  const closeButton=document.getElementById('map-popup-close');
  const label=document.getElementById('map-popup-label');
  if (!content || !closeButton || !label) return;
  const topics=new Map([...document.querySelectorAll('.topic-detail')].map(node=>[node.id,node]));
  const tiles=[...document.querySelectorAll('.topic-tile')];
  const aliases={
    'architectures':'detail-act-2',
    'topic-direct-policy':'detail-act-1',
    'topic-control-timescales':'detail-act-2',
    'topic-agentic-execution':'detail-act-3',
    'topic-code-policy':'detail-act-3',
    'topic-world-planning':'detail-act-4',
    'topic-runtime-memory':'detail-act-5',
    'topic-coordination':'detail-act-6',
    'topic-representation-data':'detail-learn-1',
    'topic-human-transfer':'detail-learn-1',
    'topic-weight-adaptation':'detail-learn-2',
    'topic-search-distillation':'detail-learn-2',
    'topic-world-representation':'detail-learn-3',
    'topic-synthetic-experience':'detail-learn-3',
    'topic-simulation-transfer':'detail-learn-3',
    'topic-continual-learning':'detail-learn-4',
    'topic-evaluation-validity':'detail-improve-1',
    'topic-deployment-economics':'detail-improve-1',
    'topic-data-provenance':'detail-improve-2',
    'topic-failure-diagnosis':'detail-improve-2',
    'topic-recovery-learning':'detail-improve-3',
    'topic-agentic-learning':'detail-improve-4'
  };
  const implementationTopics={
    'topic-humanoid-control':'humanoid-control',
    'topic-contact-control':'contact-control'
  };
  let current=null;
  const hashValue=()=>{
    try { return decodeURIComponent(location.hash.slice(1)); }
    catch (_) { return ''; }
  };
  const restoreCurrent=()=>{
    if (!current) return;
    const previous=current;
    if (previous.placeholder.parentNode) {
      previous.placeholder.before(previous.node);
      previous.placeholder.remove();
    }
    previous.node.classList.remove('map-popup-topic');
    tiles.forEach(tile=>tile.setAttribute('aria-expanded','false'));
    current=null;
    return previous;
  };
  const openTopic=id=>{
    const node=topics.get(id);
    if (!node || (current?.node===node && dialog.open)) return;
    restoreCurrent();
    const trigger=tiles.find(tile=>tile.hash==='#'+id);
    const stage=node.closest('.topic-stage')?.id || 'learn';
    const placeholder=document.createComment('Topic retained for the original inline fallback');
    node.before(placeholder);
    current={node,placeholder,stage,trigger};
    content.replaceChildren(node);
    node.classList.add('map-popup-topic');
    const title=trigger?.querySelector('.topic-tile-title')?.textContent || node.querySelector('h3')?.textContent || 'Topic details';
    label.textContent=stage.charAt(0).toUpperCase()+stage.slice(1)+' / '+title.trim();
    dialog.setAttribute('aria-labelledby',label.id);
    trigger?.setAttribute('aria-expanded','true');
    document.documentElement.classList.add('map-popup-open');
    try {
      if (!dialog.open) dialog.showModal();
    } catch (_) {
      // Preserve the original inline topic if this document cannot open a modal.
      restoreCurrent();
      document.documentElement.classList.remove('map-popup-ready','map-popup-open');
      history.replaceState(null,'','#'+id);
      node.scrollIntoView({block:'start'});
      return;
    }
    dialog.scrollTop=0;
    closeButton.focus({preventScroll:true});
    requestAnimationFrame(()=>requestAnimationFrame(()=>{
      if (dialog.open && current?.node===node) dialog.scrollTop=0;
    }));
  };
  const route=()=>{
    const raw=hashValue();
    if (implementationTopics[raw]) {
      // These physical-control subjects remain library topics, not architecture boxes.
      const params=new URLSearchParams({q:implementationTopics[raw]==='humanoid-control'?'humanoid':'force'});
      const source=new URLSearchParams(location.search).get('source');
      if (source) { params.delete('q'); params.set('talk',source); }
      location.replace(new URL('library/index.html?'+params.toString(),atlasBase).href);
      return;
    }
    const id=aliases[raw] || raw;
    if (topics.has(id)) {
      if (id!==raw) history.replaceState(null,'','#'+id);
      openTopic(id);
    } else if (dialog.open) dialog.close();
  };
  tiles.forEach(tile=>{
    tile.setAttribute('aria-haspopup','dialog');
    tile.setAttribute('aria-expanded','false');
    tile.addEventListener('click',event=>{
      if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
      event.preventDefault();
      if (current?.node.id===tile.hash.slice(1) && dialog.open) {
        dialog.close();
        return;
      }
      history.pushState(null,'',tile.hash);
      route();
    });
  });
  topics.forEach(node=>node.querySelector('.close-detail')?.addEventListener('click',event=>{
    event.preventDefault();
    dialog.close();
  }));
  closeButton.addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',event=>{
    if (event.target!==dialog) return;
    const rect=dialog.getBoundingClientRect();
    if (event.clientX<rect.left || event.clientX>rect.right || event.clientY<rect.top || event.clientY>rect.bottom) dialog.close();
  });
  dialog.addEventListener('close',()=>{
    // A queued close event must not remove a newly opened topic.
    if (dialog.open) return;
    const previous=restoreCurrent();
    document.documentElement.classList.remove('map-popup-open');
    if (!previous) return;
    const raw=hashValue();
    if (topics.has(aliases[raw] || raw)) history.replaceState(null,'','#'+previous.stage);
    previous.trigger?.focus({preventScroll:true});
  });
  addEventListener('hashchange',route);
  addEventListener('popstate',route);
  addEventListener('load',()=>{ if (dialog.open) dialog.scrollTop=0; },{once:true});
  document.documentElement.classList.add('map-popup-ready');
  route();
})();
