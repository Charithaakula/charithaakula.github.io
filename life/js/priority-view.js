/* A personal discovery shortlist: choose destinations, then bundle experiences. */
(function (global) {
  'use strict';
  const ui = { section: 'destinations', scope: 'All', category: 'Nature & wildlife', theme: '', limit: 24, bundleGrouping: 'destination', destinationLimit: '30', destinationSort: 'high', destinationQuery: '' };
  let hooks = {};
  const bound = new WeakSet();
  const esc = value => String(value == null ? '' : value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const labels = {'trip-anchor':'A reason to visit','while-there':'Do while there','dedicated-trip':'Special trip candidate','local-option':'Explore locally first','optional-repeat':'Optional repeat','standalone':'A separate possibility'};
  const engine = () => global.LifePriorities;
  const store = () => global.LifeStore;
  const prefs = () => store().getState().priorities;
  const data = () => global.LIFE_DISCOVERY_PRIORITIES || {destinations:[],families:[],categorySeeds:{}};
  const url = value => { try { const u = new URL(value); return ['https:','http:'].includes(u.protocol) ? u.href : ''; } catch (_) { return ''; } };
  const button = (text, action, id, style) => '<button type="button" class="button '+(style||'small ghost')+'" data-priority-action="'+action+'"'+(id?' data-priority-id="'+esc(id)+'"':'')+'>'+esc(text)+'</button>';
  const tag = text => '<span class="chip">'+esc(text)+'</span>';
  function photo(entity, type) {
    if (!hooks.photo) return '';
    const p = hooks.photo(entity,type);
    if (!p || !p.path) return '';
    return '<div class="priority-photo"><img src="'+esc(p.path)+'" alt="'+esc(p.alt||'Representative photograph')+'" loading="lazy"><button type="button" data-priority-action="credits">Photo credits</button></div>';
  }
  function rankCard(row, rank) {
    const item = row.item;
    const family = row.family || null;
    const local = row.localApproach || {};
    const localUrl = url(local.searchUrl);
    const title = row.deferredToLocal && family ? family.title : item.title;
    const location = row.deferredToLocal ? local.label || 'Explore an SF / South Bay approach' : item.location || 'A flexible, local possibility';
    const hub = data().destinations.find(h => h.id === row.bundleAt);
    const imageItem = row.deferredToLocal && family ? {...item, title: family.title, location: 'San Francisco Bay Area'} : item;
    return '<article class="priority-item-card">'+photo(imageItem,'item')+'<div class="priority-card-body"><div class="priority-rank">'+rank+' · '+Math.round(row.score)+' priority points</div><h3>'+esc(title)+'</h3><p class="muted">'+esc(location)+'</p>'+tag(labels[row.classification]||'Discovery suggestion')+(hub?tag('At '+hub.title):'')+'<p>'+esc(row.reason)+'</p><div class="card-actions">'+button('Details / my interest','item',item.id)+(family?button('Compare local / destination variants','family',item.id):'')+(localUrl?'<a class="button small ghost" href="'+esc(localUrl)+'" target="_blank" rel="noopener noreferrer">Explore local options ↗</a>':'')+'</div></div></article>';
  }
  function destinationCards(rows) {
    const p = prefs();
    return '<div class="priority-destination-grid">'+rows.map((row,index)=>{
      const d = row.destination;
      return '<article class="priority-destination-card">'+photo(d,'destination')+'<div class="priority-card-body"><div class="priority-rank">#'+row.rank+' · '+Math.round(row.score)+' priority points</div><h3>'+esc(d.title)+'</h3><p>'+esc(row.reason)+'</p>'+(row.visitedContext && row.visitedContext.familiar?'<p class="form-help">'+esc(row.visitedContext.label)+'</p>':'')+'<div class="card-tags">'+tag((d.relatedItemIds||[]).length+' catalog ideas')+tag((d.cuisineIds||[]).length+' cuisine families')+'</div><label class="checkbox-field"><input type="checkbox" data-priority-destination="'+esc(d.id)+'"'+(p.destinationIds.includes(d.id)?' checked':'')+'> Build trips around this place</label><label class="priority-rating">My interest<select data-priority-rating="'+esc(d.id)+'"><option value="0">Not rated</option>'+[1,2,3,4,5].map(n=>'<option value="'+n+'"'+(p.destinationRatings[d.id]===n?' selected':'')+'>'+n+' / 5</option>').join('')+'</select></label><div class="card-actions">'+button('What can I cover here?','destination',d.id)+button('See on map','destination-map',d.id)+'</div></div></article>';
    }).join('')+'</div>';
  }
  function destinationRows() {
    let rows=engine().rankDestinations(ui.scope).map((row,i)=>({...row,rank:i+1}));
    const q=ui.destinationQuery.trim().toLowerCase();
    const index=new Map((global.LIFE_CATALOG||[]).map(item=>[item.id,item]));
    if(q)rows=rows.filter(row=>[row.destination.title,row.destination.reason,row.destination.mapLabel,...row.destination.relatedItemIds.map(id=>(index.get(id)||{}).country)].join(' ').toLowerCase().includes(q));
    if(ui.destinationSort==='low')rows.reverse();
    return ui.destinationLimit==='all'?rows:rows.slice(0,Number(ui.destinationLimit));
  }
  function destinationsView() {
    const rows=destinationRows();
    return '<div class="toolbar priority-destination-controls"><label class="form-field">Find a destination<input id="priority-destination-query" type="search" placeholder="Japan, parks, food…" value="'+esc(ui.destinationQuery)+'"></label><label class="form-field">Priority order<select id="priority-destination-sort"><option value="high"'+(ui.destinationSort==='high'?' selected':'')+'>Highest priority first</option><option value="low"'+(ui.destinationSort==='low'?' selected':'')+'>Lowest priority first</option></select></label><label class="form-field">Show<select id="priority-destination-limit">'+[['15','15 destinations'],['30','30 destinations'],['all','Every ranked destination']].map(([v,l])=>'<option value="'+v+'"'+(ui.destinationLimit===v?' selected':'')+'>'+l+'</option>').join('')+'</select></label></div><p class="form-help">'+rows.length+' destinations shown. Rank numbers stay tied to this scope, even when you search. Your interest ratings change the order.</p><div class="inline-actions">'+button('See this ranked list on the map','ranked-map','','primary')+button('Use the highest 15 as my starting shortlist','select-top')+'<a class="button small ghost" href="#coverage">Optimize 5 / 9-day trips →</a>'+'</div>'+destinationCards(rows);
  }
  function categoryView() {
    const categories = Object.keys(data().categorySeeds);
    if (!categories.includes(ui.category)) ui.category = categories[0];
    const themes = Array.from(new Set(store().getItems().filter(item=>item.category===ui.category).map(item=>item.theme).filter(Boolean))).sort();
    const rows = engine().rankCategory(ui.category,ui.scope,ui.theme);
    const seen = new Set();
    const top = rows.filter(row=>!row.optionalRepeat||row.repeatAllowed).filter(row=>{const key=row.canonicalId||row.item.id;if(seen.has(key))return false;seen.add(key);return true;}).slice(0,10);
    return '<div class="toolbar priority-category-controls"><div class="form-field"><label for="priority-category">Category</label><select id="priority-category">'+categories.map(c=>'<option value="'+esc(c)+'"'+(c===ui.category?' selected':'')+'>'+esc(c)+'</option>').join('')+'</select></div><div class="form-field"><label for="priority-theme">Subcategory / original theme</label><select id="priority-theme"><option value="">All themes in this category</option>'+themes.map(t=>'<option value="'+esc(t)+'"'+(t===ui.theme?' selected':'')+'>'+esc(t)+'</option>').join('')+'</select></div></div><p class="form-help">Top ten distinct choices for this view. Repeated experience families have one default representative; other locations remain available in the comparison.</p><div class="priority-item-grid">'+top.map((row,i)=>rankCard(row,i+1)).join('')+'</div>'+(top.length?'':'<div class="empty-state"><h3>No remaining picks in this view.</h3><p>Choose a broader scope or theme. Excluded and covered experience families stay in the full catalog.</p></div>');
  }
  function bundleView() {
    const p = prefs();
    if (!p.destinationIds.length) return '<div class="empty-state"><h3>Choose the places first.</h3><p>Select destinations you want to build trips around. Then see which activities and cuisines fit those journeys, which you can try locally, and which may deserve a separate trip.</p>'+button('Choose destination shortlist','section','destinations','primary')+'</div>';
    const bundle = engine().bundle(p.destinationIds,ui.scope);
    const coverage = bundle.coverage || {};
    function group(title, rows) { return rows.length?'<section class="priority-bundle-group"><h3>'+esc(title)+'</h3><p class="form-help">'+rows.length+' compatible choices in this starter bundle</p><div class="priority-item-grid">'+rows.slice(0,ui.limit).map((row,i)=>rankCard(row,i+1)).join('')+'</div></section>':''; }
    const grouped = ui.bundleGrouping === 'destination'
      ? bundle.destinations.map(entry=>group(entry.destination.title,bundle.items.filter(row=>row.bundleAt===entry.destination.id))).join('')+group('Special journey candidates',coverage.dedicatedCandidates||[])
      : ['local-option','while-there','trip-anchor','dedicated-trip','standalone'].map(key=>group(labels[key],key==='dedicated-trip'?coverage.dedicatedCandidates||[]:bundle.items.filter(row=>row.classification===key))).join('');
    return '<div class="priority-bundle-summary"><span>'+p.destinationIds.length+' selected destinations</span><span>'+(coverage.canonicalCount||0)+' distinct goal choices</span><span>'+(coverage.skippedRepeats||[]).length+' repeat families deferred</span></div><p class="form-help">This is a long-term shortlist that can span several journeys. Build individual routes in Plans. Generic experiences with a strong local route stay local by default.</p><div class="priority-sections">'+button('By destination','grouping','destination')+button('By experience type','grouping','type')+'</div>'+button('Show these distinct choices on the map','bundle-map','','primary')+localApproaches(coverage.availableLocally||[])+grouped+repeatSummary(coverage.skippedRepeats||[])+button('Show more grouped choices','more','','ghost');
  }
  function localApproaches(entries) {
    if (!entries.length) return '';
    const p = prefs();
    return '<section class="priority-bundle-group"><h3>Local ways to meet these goals</h3><p class="form-help">These can avoid a separate journey. Instructor searches are leads; cuisine guides distinguish verified menu/location evidence from discovery searches.</p><div class="priority-item-grid">'+entries.map(entry=>{
      const approach=entry.localApproach||{};
      const target=entry.item&&entry.item.id||entry.variants&&entry.variants[0]&&(entry.variants[0].itemId||entry.variants[0].item.id);
      const link=url(approach.searchUrl);
      return '<article class="priority-item-card"><div class="priority-card-body"><h3>'+esc(entry.family&&entry.family.title||entry.label||'A local approach')+'</h3><p>'+esc(entry.label||approach.label||entry.reason)+'</p>'+(entry.family?'<label class="checkbox-field"><input type="checkbox" data-priority-covered="'+esc(entry.family.id)+'"'+(p.coveredFamilies.includes(entry.family.id)?' checked':'')+'> I have tried this family locally</label>':'')+'<div class="card-actions">'+(link?'<a class="button small primary" href="'+esc(link)+'" target="_blank" rel="noopener noreferrer">Explore local options ↗</a>':'')+(approach.cuisineId?button('Local cuisine guide','cuisine',approach.cuisineId):target?button('Compare all variants','family',target):'')+'</div></div></article>';
    }).join('')+'</div></section>';
  }
  function repeatSummary(entries) {
    if (!entries.length) return '';
    return '<details><summary>'+entries.length+' already-covered families left as optional repeats</summary><div class="priority-variant-list">'+entries.map(entry=>'<article><h4>'+esc(entry.family&&entry.family.title||entry.item&&entry.item.title||'Covered experience')+'</h4><p>'+esc(entry.reason)+'</p>'+(entry.item?button('Review repeat preference','family',entry.item.id):'')+'</article>').join('')+'</div></details>';
  }
  function render() {
    if (!engine() || !data().destinations.length) return '<section class="priority-view"><div class="empty-state">The discovery shortlist is loading.</div></section>';
    const p = prefs();
    return '<section id="life-priority-view" class="priority-view"><div class="view-heading"><div><span class="eyebrow">Fewer separate trips. More meaningful experiences.</span><h2>Choose places. Let the experiences fit.</h2><p>Shortlist the destinations that matter, then combine food and activities there. Start locally when SF or South Bay already offers a strong way to meet the goal.</p></div>'+button('How these rankings work','method')+'</div><div class="priority-toolbar"><div class="priority-sections" role="group" aria-label="Discovery view">'+[['destinations','Ranked destinations'],['categories','Top 10 by category'],['bundle','Do these while there']].map(([key,label])=>'<button type="button" data-priority-action="section" data-priority-id="'+key+'" class="'+(ui.section===key?'is-active':'')+'" aria-pressed="'+(ui.section===key)+'">'+label+'</button>').join('')+'</div><label class="form-field">Scope<select id="priority-scope">'+[['USA','US first'],['All','Worldwide + local'],['World','Outside the US']].map(([key,label])=>'<option value="'+key+'"'+(ui.scope===key?' selected':'')+'>'+label+'</option>').join('')+'</select></label><label class="checkbox-field"><input id="priority-local-first" type="checkbox"'+(p.localFirst?' checked':'')+'> Strong local options first</label></div><p class="form-help">Discovery points are editorial starting priorities. Your ratings, exclusions, covered families, and selected destinations change the ordering; this is not a universal quality ranking.</p>'+(ui.section==='destinations'?destinationsView():ui.section==='categories'?categoryView():bundleView())+'</section>';
  }
  function update(focusId) {
    if(hooks.requestRender)hooks.requestRender();
    if(focusId){const n=document.getElementById(focusId);if(n)n.focus({preventScroll:true});}
  }
  function familyDialog(itemId) {
    const family=engine().getFamily(itemId);if(!family)return;
    const p=prefs();
    const variants=family.variants||[];
    const local=family.localOption||family.localApproach||family.localAlternative||{};
    const search=url(local.searchUrl||local.url||family.localSearchUrl);
    const html='<span class="eyebrow">One goal, several location choices</span><h2>'+esc(family.title||family.label||family.name||'Compare this experience')+'</h2><p>Choose a strong version of this goal. Location variants keep their own tracking; you can meet a generic learning or exposure goal without visiting every listed destination.</p>'+((family.completed||family.covered)?'<p class="form-help">You have already recorded a version of this family. Further versions are optional repeats.</p>':'')+(search?'<p><a href="'+esc(search)+'" target="_blank" rel="noopener noreferrer">Explore SF / South Bay options ↗</a></p><p class="form-help">A local search is a discovery lead. It is not a verified venue or booking.</p>':'')+'<label class="checkbox-field"><input type="checkbox" data-priority-covered="'+esc(family.id)+'"'+(p.coveredFamilies.includes(family.id)?' checked':'')+'> I have already tried this experience family</label><label class="checkbox-field"><input type="checkbox" data-priority-repeat="'+esc(family.id)+'"'+(p.repeatFamilies.includes(family.id)?' checked':'')+'> I want additional versions / repeats</label><div class="priority-variant-list">'+variants.map(v=>'<article><h3>'+esc(v.item.title)+'</h3><p>'+esc(v.item.location||'Flexible location')+'</p><div class="card-tags">'+tag(v.beginner?'Beginner-oriented':v.role||'Location variant')+tag(v.status||'Curious')+'</div>'+button('Details / my interest','item',v.itemId||v.item.id)+'</article>').join('')+'</div>';
    if(hooks.openDialog)hooks.openDialog(html);
  }
  function destinationDialog(id) {
    const d=data().destinations.find(d=>d.id===id);if(!d)return;
    const items=new Map(store().getItems().map(item=>[item.id,item]));
    const cuisineIndex=new Map((global.LIFE_CUISINES||[]).map(c=>[c.id,c]));
    const html='<span class="eyebrow">Build a trip around a place</span><h2>'+esc(d.title)+'</h2>'+photo(d,'destination')+'<p>'+esc(d.reason)+'</p><h3>Experiences and places here</h3><div class="priority-variant-list">'+(d.relatedItemIds||[]).slice(0,40).map(id=>{const item=items.get(id);return item?'<article><h4>'+esc(item.title)+'</h4><p>'+esc(item.location)+'</p>'+button('Details / my interest','item',id)+'</article>':'';}).join('')+'</div><h3>Food you can combine with this destination</h3><div class="inline-actions">'+(d.cuisineIds||[]).map(id=>{const c=cuisineIndex.get(id);return c?button(c.name,'cuisine',id):'';}).join('')+'</div><p class="form-help">Cuisine families are not completed by one meal. Local availability and destination-specific dishes are shown in each guide.</p>'+button('See these ideas on the map','destination-map',d.id,'primary');
    if(hooks.openDialog)hooks.openDialog(html);
  }
  function toggle(key,id,enabled){const values=prefs()[key];store().updatePriorities({[key]:enabled?Array.from(new Set(values.concat(id))):values.filter(v=>v!==id)});}
  function handleAction(target) {
    const action=target.dataset.priorityAction,id=target.dataset.priorityId;
    if(action==='section'){ui.section=id;update();}
    else if(action==='ranked-map'){if(hooks.showRankedDestinations)hooks.showRankedDestinations(destinationRows(),{scope:ui.scope,query:ui.destinationQuery,limit:ui.destinationLimit,sort:ui.destinationSort});}
    else if(action==='grouping'){ui.bundleGrouping=id;update();}
    else if(action==='item'){if(hooks.openItem)hooks.openItem(id);}
    else if(action==='cuisine'){if(hooks.openCuisine)hooks.openCuisine(id);}
    else if(action==='family')familyDialog(id);
    else if(action==='destination')destinationDialog(id);
    else if(action==='bundle-map'){const b=engine().bundle(prefs().destinationIds,ui.scope);const ids=b.items.map(r=>r.item.id).concat((b.coverage.availableLocally||[]).filter(r=>r.item).map(r=>r.item.id));if(hooks.showBundle)hooks.showBundle(Array.from(new Set(ids)));}
    else if(action==='destination-map'){const d=data().destinations.find(d=>d.id===id);if(d&&hooks.showOnMap)hooks.showOnMap(d.relatedItemIds,d.regionIds||[],d.title);}
    else if(action==='select-top')store().updatePriorities({destinationIds:engine().rankDestinations(ui.scope).slice(0,15).map(row=>row.destination.id)});
    else if(action==='credits'){if(hooks.openCredits)hooks.openCredits();}
    else if(action==='more'){ui.limit+=24;update();}
    else if(action==='method'&&hooks.openDialog)hooks.openDialog('<h2>A shortlist you can change.</h2><p>Editorial priorities are suggestions. A personal 1–5 rating replaces the editorial baseline; exclusions and covered experience families reduce repeat suggestions. Local-first favors a credible local way to meet generic goals.</p><p>Selected destinations make their compatible activities and cuisines easier to combine. Landmark-specific places stay distinct. No score promises the best venue, current access, or a complete inventory.</p>');
  }
  function mount() {
    const node=document.getElementById('life-priority-view');
    if(node&&!bound.has(node)){bound.add(node);node.addEventListener('click',e=>{const t=e.target.closest('[data-priority-action]');if(t)handleAction(t);});node.addEventListener('change',handleChange);}
    const dialog=document.getElementById('dialog-content');
    if(dialog&&!bound.has(dialog)){bound.add(dialog);dialog.addEventListener('click',e=>{const t=e.target.closest('[data-priority-action]');if(t)handleAction(t);});dialog.addEventListener('change',handleChange);}
  }
  function handleChange(event) {
    const t=event.target;
    if(t.dataset.priorityDestination)toggle('destinationIds',t.dataset.priorityDestination,t.checked);
    else if(t.dataset.priorityRating){const ratings={...prefs().destinationRatings,[t.dataset.priorityRating]:Number(t.value)};store().updatePriorities({destinationRatings:ratings});}
    else if(t.dataset.priorityCovered)toggle('coveredFamilies',t.dataset.priorityCovered,t.checked);
    else if(t.dataset.priorityRepeat)toggle('repeatFamilies',t.dataset.priorityRepeat,t.checked);
    else if(t.id==='priority-local-first')store().updatePriorities({localFirst:t.checked});
    else if(t.id==='priority-scope'){ui.scope=t.value;update('priority-scope');}
    else if(t.id==='priority-category'){ui.category=t.value;ui.theme='';update('priority-category');}
    else if(t.id==='priority-theme'){ui.theme=t.value;update('priority-theme');}
    else if(t.id==='priority-destination-query'){ui.destinationQuery=t.value;update('priority-destination-query');}
    else if(t.id==='priority-destination-sort'){ui.destinationSort=t.value;update('priority-destination-sort');}
    else if(t.id==='priority-destination-limit'){ui.destinationLimit=t.value;update('priority-destination-limit');}
  }
  global.LifePriorityView={configure:options=>{hooks={...hooks,...options};return global.LifePriorityView;},render,mount,openFamily:id=>{mount();familyDialog(id);},openDestination:id=>{mount();destinationDialog(id);}};
})(window);
