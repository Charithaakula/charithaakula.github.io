/* A map of possibilities. Local libraries; OpenStreetMap tiles load only for the visible map. */
(function (global) {
  'use strict';

  const KINDS = {
    places: { label: 'Places & nature', color: '#3f78c4', glyph: '⌖' },
    activities: { label: 'Activities & culture', color: '#c45c55', glyph: '✦' },
    food: { label: 'Food & drink', color: '#44855b', glyph: '◡' },
    everyday: { label: 'Everyday & making', color: '#8b6db4', glyph: '♡' }
  };
  const DAYS = { '2-3': '2–3 days', '4-5': '4–5 days', '9': '9 days', '10': '10 days', '14': '14 days' };
  const STATUS = { curious: 'Curious', want: 'Want to do', done: 'Done', revisit: 'Want to revisit', pass: 'Not for me' };
  const ui = {
    query: '', geography: '', category: '', status: '', earlier: false, kinds: new Set(Object.keys(KINDS)),
    days: '2-3', bucketName: '', selected: new Set(), focusIds: [], focusLabel: '',
    listMode: 'viewport', priorityIds: null, priorityLabel: '', rankedDestinations: null, rankedSource: null, limit: 20, basketLimit: 6, offline: false,
    view: { center: [39, -98], zoom: 4 }
  };
  let hooks = {};
  let root = null;
  let map = null;
  let clusters = null;
  let destinationLayer = null;
  let destinationMarkers = new Map();
  let tiles = null;
  let markers = new Map();
  let matchedIds = [];
  let current = null;
  let popup = null;
  let resizeObserver = null;
  let tileErrors = 0;
  let tileTimer = null;
  let searchTimer = null;
  let markerSignature = '';
  const boundRoots = new WeakSet();
  const esc = value => String(value == null ? '' : value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const unique = values => Array.from(new Set(values));
  const button = (label, action, id, classes, disabled) => '<button type="button" class="button ' + (classes || 'small ghost') + '" data-map-action="' + esc(action) + '"' + (id ? ' data-item="' + esc(id) + '"' : '') + (disabled ? ' disabled' : '') + '>' + esc(label) + '</button>';
  const option = (value, label, selected) => '<option value="' + esc(value) + '"' + (value === selected ? ' selected' : '') + '>' + esc(label) + '</option>';

  function notify(message) {
    const node = document.getElementById('toast');
    if (!node) return;
    node.textContent = message; node.hidden = false; node.classList.add('visible');
    setTimeout(() => { node.hidden = true; node.classList.remove('visible'); }, 4200);
  }
  function kindOf(item) {
    if (item.category === 'Food & drink') return 'food';
    if (['Places & heritage', 'Nature & wildlife'].includes(item.category)) return 'places';
    if (['Adventure & movement', 'Journeys & transport', 'Arts & living culture'].includes(item.category)) return 'activities';
    return 'everyday';
  }
  function countries(item) {
    return String(item.country || '').split(';').map(value => value.trim()).filter(value => value && !/^(anywhere|multiple|unknown|not specified)$/i.test(value));
  }
  function snapshot() {
    const items = global.LifeStore ? global.LifeStore.getItems() : (global.LIFE_CATALOG || []).map(item => ({ ...item, tracker: { status: 'curious', interest: 0 } }));
    const index = new Map(items.map(item => [item.id, item]));
    const allPoints = { ...(global.LIFE_TRIP_ITEM_LOCATIONS || {}), ...(global.LIFE_WORLD_ITEM_LOCATIONS || {}), ...(global.LIFE_LOCATION_CORRECTIONS || {}) };
    const tripRegions = global.LIFE_TRIP_REGIONS || [];
    const regionIndex = new Map(tripRegions.map(region => [region.id, region]));
    const points = new Map();
    Object.entries(allPoints).forEach(([id, point]) => {
      const lat = Number(point.lat); const lon = Number(point.lon);
      if (index.has(id) && Number.isFinite(lat) && Number.isFinite(lon) && Math.abs(lat) <= 85.0511 && Math.abs(lon) <= 180) points.set(id, { ...point, lat, lon });
    });
    ui.selected.forEach(id => { if (!index.has(id)) ui.selected.delete(id); });
    return { items, index, points, tripRegions, regionIndex };
  }
  function matches(item, snap) {
    const tracker = item.tracker || {};
    if (ui.priorityIds && !ui.priorityIds.has(item.id)) return false;
    if (!ui.kinds.has(kindOf(item))) return false;
    if (ui.category && item.category !== ui.category) return false;
    if (ui.status && (ui.status === 'pinned' ? !tracker.board : tracker.status !== ui.status)) return false;
    if (ui.earlier && !tracker.early) return false;
    const point = snap.points.get(item.id);
    const tripRegion = point && snap.regionIndex.get(point.regionId);
    if (ui.geography) {
      const parts = ui.geography.split(':'); const type = parts.shift(); const value = parts.join(':');
      if (type === 'country' && !countries(item).includes(value)) return false;
      if (type === 'region' && item.region !== value && (!tripRegion || tripRegion.region !== value)) return false;
    }
    if (ui.query.trim()) {
      const searchable = [item.title, item.location, item.country, item.region, item.category, item.theme, ...(item.tags || []), point && point.locationLabel, tripRegion && tripRegion.name].join(' ').toLocaleLowerCase();
      if (!searchable.includes(ui.query.trim().toLocaleLowerCase())) return false;
    }
    return true;
  }
  function ranked(ids, snap) {
    return ids.slice().sort((a, b) => {
      const at = snap.index.get(a).tracker || {}; const bt = snap.index.get(b).tracker || {};
      if ((at.interest || 0) !== (bt.interest || 0)) return (bt.interest || 0) - (at.interest || 0);
      return snap.index.get(a).title.localeCompare(snap.index.get(b).title);
    });
  }
  function visibleInMap(id, snap) {
    if (!map) return true;
    const point = snap.points.get(id);
    if (!point) return false;
    return map.getBounds().contains(global.L.latLng(point.lat, point.lon));
  }
  function listIds(snap) {
    if (ui.listMode === 'unplaced') return ranked(snap.items.filter(item => !snap.points.has(item.id) && matches(item, snap)).map(item => item.id), snap);
    const ids = matchedIds.length || map ? matchedIds : snap.items.filter(item => snap.points.has(item.id) && matches(item, snap)).map(item => item.id);
    if (ui.listMode === 'cluster') return ranked(ui.focusIds.filter(id => ids.includes(id)), snap);
    if (ui.listMode === 'matching') return ranked(ids, snap);
    return ranked(ids.filter(id => visibleInMap(id, snap)), snap);
  }
  function regionFor(ids, snap) {
    const regionIds = unique(ids.map(id => (snap.points.get(id) || {}).regionId).filter(Boolean));
    if (regionIds.length === 1 && ids.every(id => (snap.points.get(id) || {}).regionId === regionIds[0])) return snap.regionIndex.get(regionIds[0]) || null;
    return null;
  }
  function areaForSelection(snap) {
    const ids = Array.from(ui.selected);
    const region = regionFor(ids.filter(id => snap.points.has(id)), snap);
    const countryNames = unique(ids.flatMap(id => countries(snap.index.get(id))));
    const scopes = ids.map(id => snap.index.get(id).scope);
    const scope = scopes.every(value => value === 'Anywhere') ? 'Anywhere' : scopes.includes('World') ? 'World' : scopes.includes('USA') ? 'USA' : 'Anywhere';
    const name = ui.bucketName.trim() || (region ? region.name : scope === 'Anywhere' ? 'An everyday possibility' : countryNames.length === 1 ? countryNames[0] + ' possibilities' : 'A little trip possibility');
    return { ...(region || {}), name, scope, summary: region ? region.summary || '' : scope === 'Anywhere' ? 'A collection of flexible experiences to shape around your own rhythm.' : 'A loose set of experiences to compare before deciding on bases, travel time and a smaller itinerary.' };
  }
  function iconHtml(kind, selected) {
    return '<span class="life-marker life-marker-' + kind + (selected ? ' is-selected' : '') + '" style="--marker-color:' + KINDS[kind].color + '"><span aria-hidden="true">' + KINDS[kind].glyph + '</span></span>';
  }
  function markerIcon(kind, selected) {
    return global.L.divIcon({ className: 'life-marker-icon', html: iconHtml(kind, selected), iconSize: [28, 28], iconAnchor: [14, 14], popupAnchor: [0, -15] });
  }
  function clusterIcon(cluster) {
    const children = cluster.getAllChildMarkers();
    const counts = { places: 0, activities: 0, food: 0, everyday: 0 };
    children.forEach(marker => { counts[marker.options.lifeKind] += 1; });
    const total = children.length; const circumference = 2 * Math.PI * 22;
    let offset = 0;
    const rings = Object.keys(KINDS).map(kind => {
      if (!counts[kind]) return '';
      const length = counts[kind] / total * circumference;
      const circle = '<circle cx="28" cy="28" r="22" fill="none" stroke="' + KINDS[kind].color + '" stroke-width="7" stroke-dasharray="' + length.toFixed(3) + ' ' + circumference.toFixed(3) + '" stroke-dashoffset="' + (-offset).toFixed(3) + '" transform="rotate(-90 28 28)"/>';
      offset += length; return circle;
    }).join('');
    const label = total + ' grouped ideas. ' + Object.keys(KINDS).filter(kind => counts[kind]).map(kind => counts[kind] + ' ' + KINDS[kind].label.toLowerCase()).join(', ');
    return global.L.divIcon({ className: 'life-cluster-icon', iconSize: [56, 56], html: '<span class="life-cluster"><svg viewBox="0 0 56 56" width="56" height="56" aria-hidden="true"><circle cx="28" cy="28" r="27" fill="var(--paper, #fffdf7)" stroke="var(--paper, #fffdf7)" stroke-width="2"/>' + rings + '<circle cx="28" cy="28" r="17.5" fill="var(--paper, #fffdf7)"/><text class="life-cluster-count" x="28" y="29" text-anchor="middle" dominant-baseline="central" fill="var(--ink, #2d4035)" font-family="var(--sans, sans-serif)" font-size="' + (total >= 1000 ? '12' : '14') + '" font-weight="700">' + total + '</text></svg><span class="sr-only">' + esc(label) + '</span></span>' });
  }
  function popupHtml(id, snap) {
    const item = snap.index.get(id); const point = snap.points.get(id);
    if (!item || !point) return '';
    return '<div class="map-popup"><span class="eyebrow">' + esc(KINDS[kindOf(item)].label) + '</span><h3>' + esc(item.title) + '</h3><p>' + esc(point.locationLabel || item.location || item.country) + '</p><p class="form-help">' + esc(point.precision || 'area') + ' pin · a discovery starting point, not an exact venue.</p><label class="checkbox-field"><input type="checkbox" data-map-select="' + esc(id) + '"' + (ui.selected.has(id) ? ' checked' : '') + '> Add to my trip basket</label><div class="map-popup-actions">' + button('Details & notes', 'detail', id) + '</div></div>';
  }
  function legendHtml() {
    return '<div class="map-color-legend" role="group" aria-label="Show or hide map categories">' + Object.keys(KINDS).map(kind => '<button type="button" class="map-kind-button' + (ui.kinds.has(kind) ? ' is-active' : '') + '" data-map-action="kind" data-kind="' + kind + '" aria-pressed="' + ui.kinds.has(kind) + '"><span class="map-kind-dot" style="background:' + KINDS[kind].color + '" aria-hidden="true"></span>' + esc(KINDS[kind].label) + '</button>').join('') + '</div>';
  }
  function filtersHtml(snap) {
    const countriesList = unique(snap.items.flatMap(countries)).sort();
    const regionsList = unique(snap.items.map(item => item.region).concat(snap.tripRegions.map(region => region.region)).filter(Boolean)).sort();
    const categories = unique(snap.items.map(item => item.category)).sort();
    return '<form id="map-filters" class="map-toolbar toolbar" role="search"><div class="form-field"><label for="map-search">Find a place or experience</label><input id="map-search" class="search-input" type="search" value="' + esc(ui.query) + '" placeholder="Japan, street food, a mountain walk…"></div><div class="form-field"><label for="map-geography">Country or region</label><select id="map-geography">' + option('', 'Everywhere', ui.geography) + '<optgroup label="Countries">' + countriesList.map(country => option('country:' + country, country, ui.geography)).join('') + '</optgroup><optgroup label="Regions">' + regionsList.map(region => option('region:' + region, region, ui.geography)).join('') + '</optgroup></select></div><div class="form-field"><label for="map-category">Kind of experience</label><select id="map-category">' + option('', 'Every kind of wonder', ui.category) + categories.map(category => option(category, category, ui.category)).join('') + '</select></div><div class="form-field"><label for="map-status">My list</label><select id="map-status">' + option('', 'All possibilities', ui.status) + Object.entries(STATUS).concat([['pinned', 'My pinned ideas']]).map(([value, label]) => option(value, label, ui.status)).join('') + '</select></div><label class="checkbox-field"><input id="map-earlier" type="checkbox"' + (ui.earlier ? ' checked' : '') + '> Earlier on my list</label>' + button('Reset filters', 'reset-filters') + '</form>';
  }
  function resultHtml(item, snap) {
    const point = snap.points.get(item.id); const kind = kindOf(item);
    return '<article class="map-result' + (ui.selected.has(item.id) ? ' is-selected' : '') + '"><label class="map-item-checkbox"><input type="checkbox" data-map-select="' + esc(item.id) + '"' + (ui.selected.has(item.id) ? ' checked' : '') + ' aria-label="Add ' + esc(item.title) + ' to the trip basket"><span class="sr-only">Select ' + esc(item.title) + '</span></label><div class="map-item-body"><button type="button" class="map-item-title" data-map-action="detail" data-item="' + esc(item.id) + '">' + esc(item.title) + '</button><p class="muted">' + esc(point ? point.locationLabel || item.location : item.location || item.country || 'A flexible, everyday possibility') + '</p><div class="map-item-meta"><span style="color:' + KINDS[kind].color + '">' + esc(KINDS[kind].label) + '</span><span>' + esc(STATUS[(item.tracker || {}).status] || 'Curious') + '</span><span>' + esc(point ? point.precision || 'area' : item.scope === 'Anywhere' ? 'Flexible location' : 'Not mapped yet') + '</span></div>' + (point ? button('Find on map', 'locate', item.id) : '') + '</div></article>';
  }
  function sidebarHtml(snap) {
    if(ui.rankedDestinations) return '<span class="eyebrow">'+ui.rankedDestinations.length+' ranked destinations</span><h3>Your priority map</h3><p class="form-help">Numbers match Top picks. Open a place to see the food and experiences you can combine there.</p><div class="map-results">'+ui.rankedDestinations.map(row=>'<article class="map-result"><div class="map-item-body"><button type="button" class="map-item-title" data-map-action="destination-locate" data-item="'+esc(row.destination.id)+'">#'+row.rank+' · '+esc(row.destination.title)+'</button><p>'+Math.round(row.score)+' priority points</p>'+button('Food, places & experiences','destination-detail',row.destination.id)+'</div></article>').join('')+'</div>';
    const ids = listIds(snap);
    const shownCount = Math.min(ids.length, ui.limit, 40);
    const region = regionFor(ui.listMode === 'cluster' ? ui.focusIds.filter(id => snap.index.has(id)) : [], snap);
    const title = ui.listMode === 'cluster' ? ui.focusLabel || 'Inside this map cluster' : ui.listMode === 'matching' ? 'All matching map ideas' : ui.listMode === 'unplaced' ? 'Possibilities with flexible locations' : 'Around this map view';
    return '<span class="eyebrow">' + ids.length + ' matching ideas</span><h3 class="map-cluster-heading">' + esc(title) + '</h3><div class="form-field"><label for="map-list-mode">Browse</label><select id="map-list-mode">' + option('viewport', 'In the current map view', ui.listMode) + option('matching', 'All matching mapped ideas', ui.listMode) + (ui.focusIds.length ? option('cluster', 'Inside the selected cluster', ui.listMode) : '') + option('unplaced', 'Flexible / not mapped yet', ui.listMode) + '</select></div>' + (region ? '<details class="map-region-context"><summary>Trip context for ' + esc(region.name) + '</summary><dl class="map-region-meta"><div><dt>Possible base</dt><dd>' + esc(region.base) + '</dd></div><div><dt>A first shape</dt><dd>' + esc(({ afternoon: 'One afternoon', '7-14': '7–14 days', ...DAYS })[region.primaryDays] || (region.days || []).map(day => ({ afternoon: 'One afternoon', '7-14': '7–14 days', ...DAYS })[day] || day).join(' · ')) + '</dd></div><div><dt>Seasonal context</dt><dd>' + esc(region.season) + '</dd></div><div><dt>Airport starting points</dt><dd>' + esc((region.airports || []).join(' · ')) + '</dd></div></dl><p class="form-help">' + esc(region.routeNote) + '</p>' + (region.foodNote ? '<p class="form-help">' + esc(region.foodNote) + '</p>' : '') + '</details>' : '') + '<div class="map-section-actions">' + button('Add these ' + shownCount + ' shown ideas', 'select-list', '', 'small ghost', !ids.length) + (hooks.recommendTrips ? button('Compare 4 / 10-day trips here →', 'recommend-trips', '', 'small primary', !ids.length) : '') + '</div><div class="map-results">' + (ids.length ? ids.slice(0, ui.limit).map(id => resultHtml(snap.index.get(id), snap)).join('') : '<div class="map-empty"><h4>No ideas in this view yet.</h4><p class="muted">Pan toward a different area, change a filter, or browse all matching ideas. The trip basket stays with you.</p></div>') + '</div>' + (ids.length > ui.limit ? button('Show 20 more · ' + (ids.length - ui.limit) + ' remaining', 'more') : '');
  }
  function basketHtml(snap) {
    const selected = Array.from(ui.selected).map(id => snap.index.get(id)).filter(Boolean);
    const regionIds = unique(selected.map(item => (snap.points.get(item.id) || {}).regionId || item.country).filter(Boolean));
    return '<div class="map-selection-heading"><div><span class="eyebrow">A loose trip basket</span><h3>' + selected.length + (selected.length === 1 ? ' idea, collected.' : ' ideas, collected.') + '</h3></div>' + (selected.length ? button('Clear basket', 'clear-selection') : '') + '</div><p class="form-help">Changing filters or map views keeps your selections.' + (regionIds.length > 1 ? ' These areas may need separate bases; compare travel time before combining.' : '') + '</p><div class="form-grid"><div class="form-field"><label for="map-bucket-name">A name for this possibility, optional</label><input id="map-bucket-name" class="map-bucket-name" maxlength="180" value="' + esc(ui.bucketName) + '" placeholder="A ten-day window, somewhere beautiful…"></div><div class="form-field"><label for="map-plan-days">Time to consider</label><select id="map-plan-days">' + Object.entries(DAYS).sort((a,b)=>parseInt(a[0])-parseInt(b[0])).map(([value, label]) => option(value, label, ui.days)).join('') + '</select></div></div><p class="form-help">The time choice is a planning budget. It does not hide any map pins or assume all selected ideas fit.</p>' + (selected.length ? '<ul class="map-selection-list">' + selected.slice(0, ui.basketLimit).map(item => '<li><button type="button" class="map-item-title" data-map-action="detail" data-item="' + esc(item.id) + '">' + esc(item.title) + '</button>' + button('Remove', 'remove-selection', item.id) + '</li>').join('') + '</ul>' + (selected.length > ui.basketLimit ? button('See ' + (selected.length - ui.basketLimit) + ' more selected', 'more-basket') : '') : '<p class="muted">Select a checkbox in a popup or beside an idea to start collecting.</p>') + '<div class="map-create-row"><span class="chip">Solo · ' + esc(DAYS[ui.days]) + '</span>' + button('Create solo draft →', 'create-plan', '', 'primary', !selected.length) + '</div>';
  }
  function statsHtml(snap) {
    if(ui.rankedDestinations)return '<span class="chip">Ranked destination map · '+ui.rankedDestinations.length+' places</span>'+button('Show all catalog locations','clear-ranked')+'<span class="form-help">Number = priority rank. These pins are city or regional planning bases.</span>';
    const allLocated = snap.points.size;
    const matching = snap.items.filter(item => matches(item, snap));
    const located = matching.filter(item => snap.points.has(item.id)).length;
    const unplaced = matching.length - located;
    return (ui.priorityIds ? '<span class="chip">Priority bundle: ' + esc(ui.priorityLabel) + '</span>' + button('Show all catalog locations', 'clear-priority') : '') + '<span>' + located.toLocaleString() + ' mapped possibilities' + (located !== allLocated ? ' match these filters' : '') + '</span>' + button(unplaced + ' flexible / not mapped yet', 'unplaced', '', 'small ghost') + '<span class="form-help">Blue places · red activities · green food · purple everyday & making</span>';
  }
  function fallbackHtml() {
    const fallback = global.LifeSvgMap;
    if (!fallback) return '<div class="map-empty"><h3>The map library could not load.</h3><p>Reload to try the local map files again. Your basket remains saved in this session.</p></div>';
    if (typeof fallback.setSelection === 'function') fallback.setSelection(Array.from(ui.selected));
    return '<section id="life-map-offline-wrapper" class="map-offline-wrapper"><div class="view-heading"><div><span class="eyebrow">Offline US map</span><h2>Keep exploring without background tiles.</h2><p class="muted">Your global trip basket stays with you. This fallback covers the United States.</p></div><button type="button" class="button primary" data-map-online>Return to the world map →</button></div>' + fallback.render() + '</section>';
  }
  function render() {
    if (map && map.getContainer().isConnected) { const center = map.getCenter(); ui.view = { center: [center.lat, center.lng], zoom: map.getZoom() }; }
    current = snapshot();
    if (ui.offline) return fallbackHtml();
    return '<section id="life-map-planner" class="map-planner"><div class="view-heading map-heading"><div><span class="eyebrow">Follow a little curiosity</span><h2>Where could life take you?</h2><p class="muted">All located US and world ideas share one map. Zoom into a bubble to discover more; shared city pins fan out when you reach them.</p><p class="map-coverage-summary">' + current.items.length.toLocaleString() + ' catalog ideas · ' + current.points.size.toLocaleString() + ' located · ' + (current.items.length - current.points.size).toLocaleString() + ' flexible / not mapped</p></div><div class="map-view-actions">' + button('USA view', 'usa', '', 'small primary') + button('World view', 'world') + (hooks.goPlans ? '<a class="button small ghost" href="#coverage">Optimize 5 / 9-day trips →</a>' : '') + '</div></div>' + filtersHtml(current) + '<div id="map-color-legend">' + legendHtml() + '</div><div class="map-layout"><div class="map-stage"><div id="life-leaflet-map" class="leaflet-life-map" role="region" aria-label="Interactive world experience map"></div><div id="map-tile-notice" class="map-tile-notice" role="status" hidden><p>The background tiles could not load. You can still inspect pins or use the offline US map.</p>' + button('Retry background tiles', 'retry-tiles') + button('Use offline US map', 'offline') + '</div><div class="map-view-actions map-bulk-actions">' + button('Bucket ideas in this view', 'select-matching') + button('Fit my basket', 'fit-basket', '', 'small ghost', !ui.selected.size) + '</div><div id="map-stats" class="map-legend">' + statsHtml(current) + '</div><p class="form-help">Pins use place, city or country areas. Some ideas share a base; a fanned-out pin is a way to choose from the list, not a newly invented venue. Background map © OpenStreetMap contributors.</p><section id="map-basket" class="map-selection" aria-label="Selected trip ideas">' + basketHtml(current) + '</section></div><aside id="map-sidebar" class="map-sidebar" aria-label="Experiences around the map">' + sidebarHtml(current) + '</aside></div></section>';
  }
  function updatePanels(includeBasket) {
    if (!root || !root.isConnected) return;
    current = snapshot();
    const sidebar = root.querySelector('#map-sidebar');
    const stats = root.querySelector('#map-stats');
    if (sidebar) sidebar.innerHTML = sidebarHtml(current);
    if (stats) stats.innerHTML = statsHtml(current);
    if (includeBasket) {
      const basket = root.querySelector('#map-basket');
      if (basket) basket.innerHTML = basketHtml(current);
    }
    root.querySelectorAll('[data-map-select]').forEach(input => { input.checked = ui.selected.has(input.dataset.mapSelect); });
    if (popup && popup.isOpen && popup.isOpen()) {
      const element = popup.getElement();
      if (element) element.querySelectorAll('[data-map-select]').forEach(input => { input.checked = ui.selected.has(input.dataset.mapSelect); });
    }
  }
  function updateSelectionIcons() {
    const changed = [];
    markers.forEach((marker, id) => {
      const selected = ui.selected.has(id);
      if (marker.options.lifeSelected !== selected) {
        marker.options.lifeSelected = selected;
        marker.setIcon(markerIcon(marker.options.lifeKind, selected));
        changed.push(marker);
      }
    });
    if (changed.length && clusters && clusters.refreshClusters) clusters.refreshClusters(changed);
  }
  function rebuildMarkers() {
    if (!map || !clusters) return;
    if(ui.rankedDestinations){
      const filters=root&&root.querySelector('#map-filters');if(filters)filters.hidden=true;
      const legend=document.getElementById('map-color-legend');if(legend)legend.hidden=true;
      const bulk=root&&root.querySelector('.map-bulk-actions');if(bulk)bulk.hidden=true;
      rebuildDestinations();updatePanels(false);return;}
    current = snapshot();
    matchedIds = current.items.filter(item => current.points.has(item.id) && matches(item, current)).map(item => item.id);
    const signature = matchedIds.join('|');
    if (signature !== markerSignature) {
      clusters.clearLayers(); markers = new Map();
      const layers = matchedIds.map(id => {
        const item = current.index.get(id); const point = current.points.get(id); const kind = kindOf(item);
        const marker = global.L.marker([point.lat, point.lon], { icon: markerIcon(kind, ui.selected.has(id)), title: item.title, keyboard: true, lifeId: id, lifeKind: kind, lifeSelected: ui.selected.has(id) });
        marker.bindPopup(() => popupHtml(id, snapshot()), { maxWidth: 310, className: 'map-life-popup' });
        marker.on('click', () => { ui.focusIds = [id]; ui.focusLabel = point.locationLabel || item.location || item.title; ui.listMode = 'cluster'; ui.limit = 20; updatePanels(false); });
        markers.set(id, marker); return marker;
      });
      clusters.addLayers(layers); markerSignature = signature;
    } else updateSelectionIcons();
    updatePanels(false);
  }
  function rebuildDestinations() {
    if(!map||!ui.rankedDestinations)return;
    if(ui.rankedSource&&global.LifePriorities){
      const source=ui.rankedSource,snap=snapshot(),q=String(source.query||'').trim().toLowerCase();
      let rows=global.LifePriorities.rankDestinations(source.scope).map((row,i)=>({...row,rank:i+1}));
      if(q)rows=rows.filter(row=>[row.destination.title,row.destination.reason,row.destination.mapLabel,...row.destination.relatedItemIds.map(id=>(snap.index.get(id)||{}).country)].join(' ').toLowerCase().includes(q));
      if(source.sort==='low')rows.reverse();
      ui.rankedDestinations=(source.limit==='all'?rows:rows.slice(0,Number(source.limit)||30)).filter(row=>Number.isFinite(row.destination.lat)&&Number.isFinite(row.destination.lon));
    }
    if(map.hasLayer(clusters))map.removeLayer(clusters);
    if(destinationLayer)map.removeLayer(destinationLayer);
    destinationLayer=global.L.layerGroup();destinationMarkers=new Map();
    ui.rankedDestinations.forEach(row=>{
      const d=row.destination;
      if(!Number.isFinite(d.lat)||!Number.isFinite(d.lon))return;
      const icon=global.L.divIcon({className:'life-priority-pin',iconSize:[38,38],iconAnchor:[19,19],html:'<span>'+row.rank+'</span>'});
      const marker=global.L.marker([d.lat,d.lon],{icon,title:'#'+row.rank+' '+d.title+' · '+Math.round(row.score)+' priority points',keyboard:true});
      marker.bindPopup('<div class="map-popup"><span class="eyebrow">#'+row.rank+' · '+Math.round(row.score)+' priority points</span><h3>'+esc(d.title)+'</h3><p>'+esc(row.reason)+'</p><p class="form-help">'+esc(d.precision||'Regional planning base')+' · '+esc(d.mapLabel||d.title)+'</p>'+button('Food, places & experiences','destination-detail',d.id)+'</div>',{maxWidth:320,className:'map-life-popup'});
      marker.addTo(destinationLayer);destinationMarkers.set(d.id,marker);
    });
    destinationLayer.addTo(map);
  }
  function clearRanked() {
    ui.rankedDestinations=null;ui.rankedSource=null;
    if(map&&destinationLayer)map.removeLayer(destinationLayer);
    destinationLayer=null;destinationMarkers=new Map();
    if(map&&clusters&&!map.hasLayer(clusters))clusters.addTo(map);
    const filters=root&&root.querySelector('#map-filters');if(filters)filters.hidden=false;
    const legend=document.getElementById('map-color-legend');if(legend)legend.hidden=false;
    const bulk=root&&root.querySelector('.map-bulk-actions');if(bulk)bulk.hidden=false;
    rebuildMarkers();
  }
  function select(ids, checked) {
    const snap = snapshot();
    const valid = ids.filter(id => snap.index.has(id));
    if (checked) {
      const additions = valid.filter(id => !ui.selected.has(id));
      const available = Math.max(0, 300 - ui.selected.size);
      additions.slice(0, available).forEach(id => ui.selected.add(id));
      if (additions.length > available) notify('This basket holds up to 300 ideas. Split more possibilities into another draft.');
    } else valid.forEach(id => ui.selected.delete(id));
    updateSelectionIcons(); updatePanels(true);
  }
  function fitPoints(points, maxZoom) {
    if (!map || !points.length) return;
    const bounds = global.L.latLngBounds(points.map(point => [point.lat, point.lon]));
    if (points.length === 1 || bounds.getNorthEast().equals(bounds.getSouthWest())) map.setView(bounds.getCenter(), Math.min(maxZoom || 12, 12), { animate: true });
    else map.fitBounds(bounds, { padding: [32, 32], maxZoom: maxZoom || 12, animate: true });
  }
  function createPlan() {
    const snap = snapshot();
    const ids = Array.from(ui.selected).filter(id => snap.index.has(id));
    if (!ids.length) return;
    const area = areaForSelection(snap); const duration = DAYS[ui.days];
    if (hooks.createPlan) return hooks.createPlan(ids, area, duration);
    try {
      global.LifeStore.addPlan({ title: area.name.slice(0, 220), description: area.summary.slice(0, 2000), itemIds: ids, duration, scope: area.scope, companions: 'solo', status: 'idea', notes: '', startDate: '', endDate: '' });
      if (hooks.goPlans) hooks.goPlans();
      notify('A loose solo draft, saved.');
    } catch (error) { notify(error.message || 'This draft could not be saved.'); }
  }
  function resetFilters() {
    clearRanked();
    ui.priorityIds = null; ui.priorityLabel = '';
    ui.query = ''; ui.geography = ''; ui.category = ''; ui.status = ''; ui.earlier = false;
    ui.kinds = new Set(Object.keys(KINDS)); ui.listMode = 'viewport'; ui.focusIds = []; ui.limit = 20;
    const fields = { 'map-search': '', 'map-geography': '', 'map-category': '', 'map-status': '' };
    Object.entries(fields).forEach(([id, value]) => { const input = document.getElementById(id); if (input) input.value = value; });
    const earlier = document.getElementById('map-earlier'); if (earlier) earlier.checked = false;
    const legend = document.getElementById('map-color-legend'); if (legend) legend.innerHTML = legendHtml();
    rebuildMarkers();
  }
  function rerenderEngine() {
    if (hooks.onRender) { hooks.onRender(); mount(); return; }
    const section = document.getElementById('life-map-planner') || document.getElementById('life-map-offline-wrapper');
    if (section) { section.outerHTML = render(); mount(); }
  }
  function handleAction(target) {
    const action = target.dataset.mapAction; const id = target.dataset.item;
    if (action === 'kind') {
      const kind = target.dataset.kind;
      if (!KINDS[kind]) return;
      if (ui.kinds.has(kind)) ui.kinds.delete(kind); else ui.kinds.add(kind);
      const legend = document.getElementById('map-color-legend'); if (legend) legend.innerHTML = legendHtml();
      ui.limit = 20; rebuildMarkers();
    } else if (action === 'detail') { if (hooks.openItem) hooks.openItem(id); }
    else if(action==='destination-detail'){if(hooks.openPriorityDestination)hooks.openPriorityDestination(id);}
    else if(action==='destination-locate'){const marker=destinationMarkers.get(id);if(marker&&map){map.setView(marker.getLatLng(),6,{animate:false});marker.openPopup();}}
    else if(action==='clear-ranked')clearRanked();
    else if (action === 'locate') {
      const marker = markers.get(id);
      if (marker && clusters) clusters.zoomToShowLayer(marker, () => marker.openPopup());
    } else if (action === 'usa') {
      if (map) map.fitBounds([[24, -125], [50, -66]], { padding: [25, 25], maxZoom: 5, animate: true });
      ui.listMode = 'viewport'; ui.limit = 20; updatePanels(false);
    } else if (action === 'world') {
      fitPoints(Array.from(snapshot().points.values()), 3); ui.listMode = 'viewport'; ui.limit = 20; updatePanels(false);
    } else if (action === 'fit-basket') {
      const snap = snapshot(); const points = Array.from(ui.selected).map(itemId => snap.points.get(itemId)).filter(Boolean);
      if (points.length) fitPoints(points, 12); else notify('These ideas have flexible locations; the list holds their details.');
    } else if (action === 'select-list') { const ids = listIds(snapshot()); select(ids.slice(0, Math.min(ids.length, ui.limit, 40)), true); }
    else if (action === 'select-matching') { const snap = snapshot(); select(matchedIds.filter(itemId => visibleInMap(itemId, snap)), true); }
    else if (action === 'remove-selection') select([id], false);
    else if (action === 'clear-selection') { ui.selected.clear(); updateSelectionIcons(); updatePanels(true); }
    else if (action === 'more') { ui.limit += 20; updatePanels(false); }
    else if (action === 'more-basket') { ui.basketLimit += 12; updatePanels(true); }
    else if (action === 'create-plan') createPlan();
    else if (action === 'recommend-trips') {
      const snap = snapshot();
      const areaIds = listIds(snap);
      const regionIds = unique(areaIds.map(itemId => (snap.points.get(itemId) || {}).regionId).filter(Boolean));
      if (hooks.recommendTrips) hooks.recommendTrips({ areaIds, selectedIds: Array.from(ui.selected), regionIds, days: ['10', '14'].includes(ui.days) ? 10 : 4, label: ui.focusLabel || 'this map area' });
    }
    else if (action === 'plans') { if (hooks.goPlans) hooks.goPlans(); }
    else if (action === 'reset-filters') resetFilters();
    else if (action === 'clear-priority') { ui.priorityIds = null; ui.priorityLabel = ''; rebuildMarkers(); }
    else if (action === 'unplaced') { ui.listMode = 'unplaced'; ui.limit = 20; updatePanels(false); }
    else if (action === 'offline') { ui.offline = true; rerenderEngine(); }
    else if (action === 'retry-tiles') {
      tileErrors = 0;
      const notice = document.getElementById('map-tile-notice'); if (notice) notice.hidden = true;
      if (tiles) tiles.redraw();
    }
  }
  function handleChange(event) {
    const target = event.target;
    if (target.dataset.mapSelect) { select([target.dataset.mapSelect], target.checked); return; }
    const fields = { 'map-geography': 'geography', 'map-category': 'category', 'map-status': 'status' };
    if (fields[target.id]) { ui[fields[target.id]] = target.value; ui.limit = 20; rebuildMarkers(); }
    else if (target.id === 'map-earlier') { ui.earlier = target.checked; ui.limit = 20; rebuildMarkers(); }
    else if (target.id === 'map-list-mode') { ui.listMode = target.value; ui.limit = 20; updatePanels(false); }
    else if (target.id === 'map-plan-days') {
      if (DAYS[target.value]) ui.days = target.value;
      const row = root && root.querySelector('.map-create-row .chip'); if (row) row.textContent = 'Solo · ' + DAYS[ui.days];
    }
  }
  function bindRoot(node) {
    if (boundRoots.has(node)) return; boundRoots.add(node);
    node.addEventListener('submit', event => { if (event.target.id === 'map-filters') event.preventDefault(); });
    node.addEventListener('click', event => { const target = event.target.closest('[data-map-action]'); if (target && !target.disabled) handleAction(target); });
    node.addEventListener('change', handleChange);
    node.addEventListener('input', event => {
      if (event.target.id === 'map-bucket-name') ui.bucketName = event.target.value;
      else if (event.target.id === 'map-search') {
        ui.query = event.target.value; ui.limit = 20; clearTimeout(searchTimer);
        searchTimer = setTimeout(rebuildMarkers, 140);
      }
    });
  }
  function captureView() {
    if (!map || !map.getContainer().isConnected) return;
    const center = map.getCenter(); ui.view = { center: [center.lat, center.lng], zoom: map.getZoom() };
  }
  function teardown() {
    if (!map) return;
    captureView();
    if (resizeObserver) { resizeObserver.disconnect(); resizeObserver = null; }
    if (tiles) tiles.off('tileerror tileload');
    map.remove(); map = null; clusters = null; tiles = null; popup = null; markers = new Map();
    destinationLayer=null;destinationMarkers=new Map();
    markerSignature = ''; matchedIds = [];
    clearTimeout(tileTimer); clearTimeout(searchTimer); tileErrors = 0;
  }
  function mountFallback() {
    teardown();
    const wrapper = document.getElementById('life-map-offline-wrapper');
    if (!wrapper || !global.LifeSvgMap) return;
    global.LifeSvgMap.configure({
      openItem: hooks.openItem,
      createPlan: (ids, region, duration) => {
        ui.selected = new Set(ids);
        const area = areaForSelection(snapshot());
        if (hooks.createPlan) hooks.createPlan(ids, area, duration);
      },
      goPlans: hooks.goPlans,
      onRender: () => {
        if (global.LifeSvgMap.getSelection) ui.selected = new Set(global.LifeSvgMap.getSelection());
        const section = document.getElementById('life-map-offline-wrapper');
        if (section) { section.outerHTML = fallbackHtml(); mountFallback(); }
      }
    });
    global.LifeSvgMap.mount();
    if (!boundRoots.has(wrapper)) {
      boundRoots.add(wrapper);
      wrapper.addEventListener('click', event => {
        if (event.target.closest('[data-map-online]')) {
          if (global.LifeSvgMap.getSelection) ui.selected = new Set(global.LifeSvgMap.getSelection());
          ui.offline = false; rerenderEngine();
        }
      });
    }
  }
  function mount() {
    if (ui.offline) return mountFallback();
    const nextRoot = document.getElementById('life-map-planner');
    const container = nextRoot && nextRoot.querySelector('#life-leaflet-map');
    if (!nextRoot || !container) return;
    root = nextRoot; bindRoot(root);
    if (!global.L || !global.L.markerClusterGroup) {
      const notice = document.getElementById('map-tile-notice');
      if (notice) { notice.hidden = false; notice.querySelector('p').textContent = 'The local map libraries could not load. Use the offline US view or reload the page.'; }
      return;
    }
    if (map && map.getContainer() === container) { rebuildMarkers(); return; }
    if (map) teardown();
    map = global.L.map(container, { center: ui.view.center, zoom: ui.view.zoom, minZoom: 0, maxZoom: 19, zoomControl: true, scrollWheelZoom: true, doubleClickZoom: true, touchZoom: true, keyboard: true, worldCopyJump: true, zoomSnap: 1 });
    tiles = global.L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      minZoom: 0, maxZoom: 19, detectRetina: false, updateWhenIdle: true, keepBuffer: 1,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors'
    }).addTo(map);
    tiles.on('tileerror', () => {
      tileErrors += 1;
      if (tileErrors >= 3) {
        clearTimeout(tileTimer);
        tileTimer = setTimeout(() => { const notice = document.getElementById('map-tile-notice'); if (notice) notice.hidden = false; }, 300);
      }
    });
    tiles.on('tileload', () => {
      tileErrors = 0; clearTimeout(tileTimer);
      const notice = document.getElementById('map-tile-notice'); if (notice) notice.hidden = true;
    });
    clusters = global.L.markerClusterGroup({
      maxClusterRadius: zoom => zoom < 5 ? 55 : 42, spiderfyOnMaxZoom: true, zoomToBoundsOnClick: true,
      showCoverageOnHover: false, spiderfyDistanceMultiplier: 1.6, animate: true,
      removeOutsideVisibleBounds: true, iconCreateFunction: clusterIcon
    }).addTo(map);
    clusters.on('clusterclick', event => {
      const ids = event.layer.getAllChildMarkers().map(marker => marker.options.lifeId);
      ui.focusIds = ids; ui.listMode = 'cluster'; ui.limit = 20;
      const snap = snapshot(); const labels = unique(ids.map(id => (snap.points.get(id) || {}).locationLabel).filter(Boolean));
      ui.focusLabel = labels.length === 1 ? labels[0] : ids.length + ' possibilities in this area';
      updatePanels(false);
    });
    clusters.on('spiderfied', event => {
      ui.focusIds = event.markers.map(marker => marker.options.lifeId); ui.listMode = 'cluster'; ui.limit = 20;
      const snap = snapshot(); const labels = unique(ui.focusIds.map(id => (snap.points.get(id) || {}).locationLabel).filter(Boolean));
      ui.focusLabel = labels.length === 1 ? labels[0] : 'Ideas sharing this area pin';
      updatePanels(false);
    });
    map.on('moveend zoomend', () => { captureView(); if (ui.listMode === 'viewport') updatePanels(false); });
    map.on('popupopen', event => {
      popup = event.popup;
      const element = popup.getElement();
      if (!element || boundRoots.has(element)) return; boundRoots.add(element);
      element.addEventListener('click', click => {
        const target = click.target.closest('[data-map-action]');
        if (target) { click.stopPropagation(); handleAction(target); }
      });
      element.addEventListener('change', change => { change.stopPropagation(); handleChange(change); });
    });
    map.on('popupclose', () => { popup = null; });
    if (global.ResizeObserver) { resizeObserver = new ResizeObserver(() => { if (map && container.isConnected) map.invalidateSize({ pan: false }); }); resizeObserver.observe(container); }
    rebuildMarkers();
    setTimeout(() => { if (map && container.isConnected) map.invalidateSize({ pan: false }); }, 0);
  }

  global.LifeMapPlanner = {
    configure: callbacks => { hooks = { ...hooks, ...(callbacks || {}) }; return global.LifeMapPlanner; },
    render, mount,
    getMap: () => map && map.getContainer().isConnected ? map : null,
    getDebugState: () => {
      const snap = snapshot();
      const matching = snap.items.filter(item => snap.points.has(item.id) && matches(item, snap));
      const scopeCounts = {};
      snap.points.forEach((point, id) => { const scope = snap.index.get(id).scope || 'Anywhere'; scopeCounts[scope] = (scopeCounts[scope] || 0) + 1; });
      return { mode:ui.rankedDestinations?'ranked-destinations':ui.priorityIds?'priority-bundle':'catalog',destinationCount:destinationMarkers.size, zoom: map ? map.getZoom() : ui.view.zoom, visibleMarkerCount: matching.filter(item => visibleInMap(item.id, snap)).length, matchingMarkerCount: matching.length, locatedCount: snap.points.size, unplacedCount: snap.items.length - snap.points.size, activeKinds: Array.from(ui.kinds), sourceScope: 'all', sourceScopes: scopeCounts };
    },
    getSelection: () => Array.from(ui.selected),
    clearSelection: () => { ui.selected.clear(); updateSelectionIcons(); updatePanels(true); },
    resetMap: () => { if (map) map.setView([39, -98], 4); else ui.view = { center: [39, -98], zoom: 4 }; },
    setPlanDays: value => { if (DAYS[value]) { ui.days = value; updatePanels(true); } },
    showRankedDestinations: (rows, source) => {
      resetFilters();ui.rankedSource=source||null;ui.rankedDestinations=rows.filter(row=>Number.isFinite(row.destination.lat)&&Number.isFinite(row.destination.lon));
      if(map){rebuildDestinations();fitPoints(ui.rankedDestinations.map(row=>row.destination),3);}
      const filters=root&&root.querySelector('#map-filters');if(filters)filters.hidden=true;
      const legend=document.getElementById('map-color-legend');if(legend)legend.hidden=true;
      const bulk=root&&root.querySelector('.map-bulk-actions');if(bulk)bulk.hidden=true;
      updatePanels(false);
    },
    showPriorityBundle: (ids, label) => {
      resetFilters();
      const snap = snapshot();
      ui.priorityIds = new Set(unique(ids).filter(id => snap.index.has(id)));
      ui.priorityLabel = label || 'selected destinations'; ui.focusIds = Array.from(ui.priorityIds);
      ui.focusLabel = ui.priorityLabel; ui.listMode = 'cluster'; ui.limit = 20;
      rebuildMarkers();
      if (map) fitPoints(ui.focusIds.map(id=>snap.points.get(id)).filter(Boolean), 10);
    },
    showItems: (ids, label) => {
      resetFilters();
      const snap = snapshot();
      ui.focusIds = unique(ids).filter(id => snap.index.has(id));
      ui.focusLabel = label || 'Ideas at this destination'; ui.listMode = 'cluster'; ui.limit = 20;
      if (map) fitPoints(ui.focusIds.map(id=>snap.points.get(id)).filter(Boolean), 10);
      updatePanels(false);
    },
    setRegion: id => {
      const snap = snapshot(); const region = snap.regionIndex.get(id);
      if (!region) return;
      ui.focusIds = unique([...(region.itemIds || []), ...(region.highlightIds || []), ...(region.foodIds || [])]).filter(itemId => snap.index.has(itemId));
      ui.focusLabel = region.name; ui.listMode = 'cluster'; ui.limit = 20;
      if (map) fitPoints(ui.focusIds.map(itemId => snap.points.get(itemId)).filter(Boolean), 9);
      updatePanels(false);
    }
  };
})(window);
