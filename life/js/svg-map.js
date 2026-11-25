/* Offline regional planning. Area pins are discovery aids, not a routing engine. */
(function (global) {
  'use strict';
  const DAY_LABELS = { afternoon: 'One afternoon', '2-3': '2–3 days', '4-5': '4–5 days', '7-14': '7–14 days' };
  const STATUS_LABELS = { curious: 'Curious', want: 'Want to do', done: 'Done', revisit: 'Want to revisit', pass: 'Not for me' };
  const ui = {
    region: '', selectedRegion: '', days: '', category: '', status: '', query: '', early: false,
    mode: 'regions', selected: new Set(), focusIds: [], limit: 20, selectionLimit: 6,
    view: { x: 0, y: 0, width: 1200, height: 760 }
  };
  let hooks = {};
  let mounted = null;
  let drag = null;
  let suppressClick = false;
  const esc = value => String(value == null ? '' : value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const unique = values => Array.from(new Set(values));
  const store = () => global.LifeStore;
  const regions = () => Array.isArray(global.LIFE_TRIP_REGIONS) ? global.LIFE_TRIP_REGIONS : [];
  const locations = () => ({ ...(global.LIFE_TRIP_ITEM_LOCATIONS || {}), ...(global.LIFE_LOCATION_CORRECTIONS || {}) });
  const geometry = () => global.LIFE_US_MAP || { states: [], insets: [], viewBox: '0 0 1200 760' };
  const baseView = () => {
    const parts = String(geometry().viewBox || '0 0 1200 760').split(/\s+/).map(Number);
    return { x: parts[0] || 0, y: parts[1] || 0, width: parts[2] || 1200, height: parts[3] || 760 };
  };
  const option = (value, label, current) => '<option value="' + esc(value) + '"' + (value === current ? ' selected' : '') + '>' + esc(label) + '</option>';
  const actionButton = (label, action, attrs, classes, disabled) => '<button type="button"' + (['zoom-in', 'zoom-out', 'reset-map', 'fit-selection', 'pan-left', 'pan-right', 'pan-up', 'pan-down', 'focus-region', 'more', 'more-selection', 'mode-regions', 'mode-pins', 'reset-filters', 'clear-selection', 'create-plan'].includes(action) ? ' id="map-action-' + esc(action) + '"' : '') + ' class="button ' + (classes || 'small ghost') + '" data-map-action="' + esc(action) + '"' + (attrs || '') + (disabled ? ' disabled' : '') + '>' + esc(label) + '</button>';
  const number = value => Number.isFinite(Number(value)) ? Number(value) : 0;
  function project(lon, lat) {
    if (!global.LifeGeo || typeof global.LifeGeo.project !== 'function') return null;
    try {
      const point = global.LifeGeo.project(Number(lon), Number(lat));
      return point && Number.isFinite(point.x) && Number.isFinite(point.y) ? point : null;
    } catch (_) { return null; }
  }
  function notify(message) {
    const node = document.getElementById('toast');
    if (node) {
      node.textContent = message; node.hidden = false; node.classList.add('visible');
      setTimeout(() => { node.hidden = true; node.classList.remove('visible'); }, 4500);
    }
  }
  function data() {
    const items = store() ? store().getItems() : [];
    const index = new Map(items.map(item => [item.id, item]));
    ui.selected.forEach(id => { if (!index.has(id)) ui.selected.delete(id); });
    const regionRows = regions().map(region => ({ ...region, ids: unique([...(region.itemIds || []), ...(region.highlightIds || []), ...(region.foodIds || [])]).filter(id => index.has(id)), point: project(region.lon, region.lat) }));
    return { items, index, regionRows };
  }
  function matches(item, region) {
    const tracker = item.tracker || {};
    if (ui.category && item.category !== ui.category) return false;
    if (ui.status && (ui.status === 'pinned' ? !tracker.board : tracker.status !== ui.status)) return false;
    if (ui.early && !tracker.early && !(region.earlyIds || []).includes(item.id)) return false;
    if (ui.query) {
      const text = [item.title, item.category, item.theme, item.location, item.country, ...(item.tags || []), region.name, region.base].join(' ').toLowerCase();
      if (!text.includes(ui.query.toLowerCase().trim())) return false;
    }
    return true;
  }
  function visibleRegions(snapshot) {
    return snapshot.regionRows.filter(region => (!ui.region || region.region === ui.region) && (!ui.days || (region.days || []).includes(ui.days))).map(region => ({ ...region, filteredIds: region.ids.filter(id => matches(snapshot.index.get(id), region)) })).filter(region => region.filteredIds.length);
  }
  function activeRegion(rows) {
    if (!ui.selectedRegion) {
      const preferred = rows.find(region => /kansas.city|chicago/i.test(region.id + ' ' + region.name)) || rows[0];
      ui.selectedRegion = preferred ? preferred.id : '';
    }
    return rows.find(region => region.id === ui.selectedRegion) || rows[0] || null;
  }
  function itemPoint(id, fallbackRegion) {
    const point = locations()[id];
    const projected = point ? project(point.lon, point.lat) : null;
    return projected || (fallbackRegion ? fallbackRegion.point : null);
  }
  function escapePath(path) {
    // Only trusted, locally generated SVG path commands are used; nothing is inserted as SVG markup.
    return esc(String(path || '').replace(/[^0-9eE.,+\-\sMmLlHhVvCcSsQqTtAaZz]/g, ''));
  }
  function markerLayout(rows) {
    const placed = [];
    const factor = ui.view.width / baseView().width;
    const offsets = [[0, 0], [30, 0], [-30, 0], [0, 30], [0, -30], [30, 30], [-30, 30], [30, -30], [-30, -30], [60, 0], [-60, 0], [0, 60], [0, -60]];
    rows.filter(region => region.point).slice().sort((a, b) => a.id.localeCompare(b.id)).forEach(region => {
      let position = region.point;
      for (const offset of offsets) {
        const candidate = { x: region.point.x + offset[0] * factor, y: region.point.y + offset[1] * factor };
        if (!placed.some(entry => Math.hypot(entry.x - candidate.x, entry.y - candidate.y) < 48 * factor)) { position = candidate; break; }
      }
      placed.push({ ...position, region, anchor: region.point });
    });
    return placed;
  }
  function regionMarkers(rows) {
    const f = ui.view.width / baseView().width;
    return markerLayout(rows).map(marker => {
      const region = marker.region;
      const selected = region.id === ui.selectedRegion;
      const selectedCount = region.ids.filter(id => ui.selected.has(id)).length;
      const count = region.filteredIds.length;
      const label = region.name + ', ' + count + ' matching ideas' + (selectedCount ? ', ' + selectedCount + ' selected' : '');
      const placeLabel = String(region.base || region.name).split(',')[0];
      const showLabel = rows.length <= 12 || selected || f < .6;
      const labelLeft = ['chicago', 'kansas-city', 'omaha-plains', 'twin-cities'].includes(region.id);
      return (marker.x !== marker.anchor.x || marker.y !== marker.anchor.y ? '<path class="map-marker-leader" d="M' + marker.anchor.x.toFixed(2) + ' ' + marker.anchor.y.toFixed(2) + 'L' + marker.x.toFixed(2) + ' ' + marker.y.toFixed(2) + '" fill="none" stroke="var(--accent, #496b50)" stroke-opacity=".45" vector-effect="non-scaling-stroke"/>' : '') + '<g class="map-region-marker' + (selected ? ' is-active' : '') + '" role="button" tabindex="0" data-map-action="region" data-region="' + esc(region.id) + '" id="map-region-' + esc(region.id) + '" aria-label="' + esc(label) + '" aria-pressed="' + selected + '" transform="translate(' + marker.x.toFixed(2) + ' ' + marker.y.toFixed(2) + ')"><title>' + esc(label) + '</title>' + (selectedCount ? '<circle r="' + (24 * f).toFixed(2) + '" fill="none" stroke="var(--ink, #2d4035)" stroke-width="2" vector-effect="non-scaling-stroke"/>' : '') + '<circle r="' + (19 * f).toFixed(2) + '" fill="' + (selected ? 'var(--ink, #2d4035)' : 'var(--accent, #496b50)') + '" stroke="var(--paper, #fffdf7)" stroke-width="2" vector-effect="non-scaling-stroke"/><text text-anchor="middle" dominant-baseline="central" font-family="var(--sans, sans-serif)" font-size="' + (12 * f).toFixed(2) + '" font-weight="700" fill="' + (selected ? 'var(--paper, #fffdf7)' : 'var(--on-accent, #fffdf7)') + '">' + count + '</text>' + (showLabel ? '<text class="map-region-label" x="' + ((labelLeft ? -26 : 26) * f).toFixed(2) + '" y="0" text-anchor="' + (labelLeft ? 'end' : 'start') + '" dominant-baseline="central" font-size="' + (14 * f).toFixed(2) + '" fill="var(--ink, #2d4035)" stroke="var(--paper, #fffdf7)" stroke-width="' + (3 * f).toFixed(2) + '">' + esc(placeLabel) + '</text>' : '') + '</g>';
    }).join('');
  }
  function pinGroups(rows, snapshot) {
    const cell = Math.max(.05, 17 * ui.view.width / baseView().width);
    const groups = new Map();
    rows.forEach(region => region.filteredIds.forEach(id => {
      const p = itemPoint(id, region);
      if (!p) return;
      const key = Math.round(p.x / cell) + ':' + Math.round(p.y / cell);
      if (!groups.has(key)) groups.set(key, { key, x: 0, y: 0, ids: [], regionIds: [] });
      const entry = groups.get(key);
      if (!entry.ids.includes(id)) { entry.ids.push(id); entry.x += p.x; entry.y += p.y; }
      if (!entry.regionIds.includes(region.id)) entry.regionIds.push(region.id);
    }));
    return Array.from(groups.values()).map(group => ({ ...group, x: group.x / group.ids.length, y: group.y / group.ids.length }));
  }
  function experiencePins(rows, snapshot) {
    const f = ui.view.width / baseView().width;
    return pinGroups(rows, snapshot).map(group => {
      const selected = group.ids.some(id => ui.selected.has(id));
      const item = snapshot.index.get(group.ids[0]);
      const label = group.ids.length === 1 ? item.title + ' · ' + ((locations()[item.id] || {}).locationLabel || item.location || 'this area') : group.ids.length + ' ideas around ' + ((locations()[item.id] || {}).locationLabel || item.location || 'this area');
      return '<g class="map-experience-pin' + (selected ? ' is-selected' : '') + '" role="button" tabindex="0" data-map-action="pin-group" data-pin="' + esc(group.key) + '" id="map-pin-' + esc(group.key) + '" aria-label="' + esc(label) + '" transform="translate(' + group.x.toFixed(2) + ' ' + group.y.toFixed(2) + ')"><title>' + esc(label) + '</title><circle r="' + ((group.ids.length > 1 ? 11 : 6) * f).toFixed(2) + '" fill="' + (selected ? 'var(--ink, #2d4035)' : 'var(--accent, #496b50)') + '" fill-opacity="' + (selected ? '1' : '.8') + '" stroke="var(--paper, #fffdf7)" stroke-width="1.5" vector-effect="non-scaling-stroke"/>' + (group.ids.length > 1 ? '<text text-anchor="middle" dominant-baseline="central" font-family="var(--sans, sans-serif)" font-size="' + (8 * f).toFixed(2) + '" font-weight="700" fill="' + (selected ? 'var(--paper, #fffdf7)' : 'var(--on-accent, #fffdf7)') + '">' + group.ids.length + '</text>' : '') + '</g>';
    }).join('');
  }
  function selectionPins(snapshot, rows) {
    const f = ui.view.width / baseView().width;
    const seen = new Set();
    return Array.from(ui.selected).map(id => {
      const region = snapshot.regionRows.find(entry => entry.ids.includes(id));
      const point = itemPoint(id, region);
      if (!point) return '';
      const key = Math.round(point.x) + ':' + Math.round(point.y);
      if (seen.has(key)) return ''; seen.add(key);
      return '<circle class="map-selected-ring" cx="' + point.x.toFixed(2) + '" cy="' + point.y.toFixed(2) + '" r="' + (9 * f).toFixed(2) + '" fill="none" stroke="var(--ink, #2d4035)" stroke-width="2.5" vector-effect="non-scaling-stroke" pointer-events="none"/>';
    }).join('');
  }
  function svgMap(snapshot, rows, active) {
    const map = geometry();
    const states = Array.isArray(map.states) ? map.states : [];
    const activeStates = new Set(active ? active.states || [] : []);
    const f = ui.view.width / baseView().width;
    return '<svg id="life-map-svg" class="map-canvas" xmlns="http://www.w3.org/2000/svg" viewBox="' + [ui.view.x, ui.view.y, ui.view.width, ui.view.height].map(v => v.toFixed(2)).join(' ') + '" role="group" tabindex="0" aria-labelledby="life-map-title life-map-desc" style="background:var(--paper-alt, #eeeee2);overflow:hidden;touch-action:none"><title id="life-map-title">United States regional experience map</title><desc id="life-map-desc">Select a region to see matching experiences and food ideas. Alaska and Hawaii are separate insets. Area pins show approximate locations, not exact venues. Use the zoom controls or keyboard plus and minus; arrow keys pan.</desc>' + states.map(state => '<path class="map-state' + (activeStates.has(state.code) ? ' is-active' : '') + '" d="' + escapePath(state.path) + '" fill="' + (activeStates.has(state.code) ? 'var(--accent-soft, #e1e8d7)' : 'var(--paper, #fffdf7)') + '" stroke="var(--border, #d9ddcc)" stroke-width="1" vector-effect="non-scaling-stroke" fill-rule="evenodd"><title>' + esc(state.name) + '</title></path>').join('') + states.filter(state => Number.isFinite(state.labelX) && Number.isFinite(state.labelY)).map(state => '<text x="' + number(state.labelX) + '" y="' + number(state.labelY) + '" fill="var(--muted, #70786b)" font-size="' + (9 * f).toFixed(2) + '" font-family="var(--sans, sans-serif)" text-anchor="middle" pointer-events="none">' + esc(state.code) + '</text>').join('') + (map.insets || []).map(inset => '<g class="map-inset"><rect x="' + number(inset.x) + '" y="' + number(inset.y) + '" width="' + number(inset.width) + '" height="' + number(inset.height) + '" rx="8" fill="none" stroke="var(--border, #d9ddcc)" stroke-dasharray="4 4" vector-effect="non-scaling-stroke"/><text x="' + (number(inset.x) + 12) + '" y="' + (number(inset.y) + number(inset.height) - 10) + '" fill="var(--muted, #70786b)" font-size="12" font-family="var(--sans, sans-serif)">' + esc(inset.label) + '</text></g>').join('') + (ui.mode === 'regions' ? regionMarkers(rows) : experiencePins(rows, snapshot)) + selectionPins(snapshot, rows) + '</svg>';
  }
  function rankedIds(region, snapshot) {
    const highlights = region.highlightIds || [];
    return region.filteredIds.slice().sort((a, b) => {
      if (ui.focusIds.includes(a) !== ui.focusIds.includes(b)) return ui.focusIds.includes(a) ? -1 : 1;
      const ai = highlights.indexOf(a); const bi = highlights.indexOf(b);
      if (ai >= 0 || bi >= 0) return (ai < 0 ? 1000 : ai) - (bi < 0 ? 1000 : bi);
      const at = snapshot.index.get(a).tracker || {}; const bt = snapshot.index.get(b).tracker || {};
      if ((at.interest || 0) !== (bt.interest || 0)) return (bt.interest || 0) - (at.interest || 0);
      return snapshot.index.get(a).title.localeCompare(snapshot.index.get(b).title);
    });
  }
  function shownIds(region, snapshot) {
    const ranked = rankedIds(region, snapshot);
    if (ranked.length <= ui.limit) return ranked;
    const food = ranked.filter(id => snapshot.index.get(id).category === 'Food & drink' || (region.foodIds || []).includes(id));
    const experiences = ranked.filter(id => !food.includes(id));
    const foodCount = Math.min(food.length, Math.max(4, Math.floor(ui.limit / 5)));
    const first = experiences.slice(0, ui.limit - foodCount).concat(food.slice(0, foodCount));
    return unique(first.concat(ranked.filter(id => !first.includes(id)).slice(0, ui.limit - first.length)));
  }
  function itemRow(item, region) {
    const tracker = item.tracker || {};
    const place = (locations()[item.id] || {}).locationLabel || item.location;
    const isEarly = tracker.early || (region.earlyIds || []).includes(item.id);
    return '<article class="map-item' + (ui.selected.has(item.id) ? ' is-selected' : '') + '"><label class="map-item-checkbox"><input type="checkbox" data-map-select="' + esc(item.id) + '" id="map-item-' + esc(item.id) + '"' + (ui.selected.has(item.id) ? ' checked' : '') + ' aria-label="Add ' + esc(item.title) + ' to the plan basket"><span class="sr-only">Select ' + esc(item.title) + '</span></label><div class="map-item-body"><button type="button" class="map-item-title" data-map-action="item" data-item="' + esc(item.id) + '">' + esc(item.title) + '</button><p class="muted">' + esc(place || 'Within this base area') + '</p><div class="map-item-meta"><span>' + esc(item.category) + '</span><span>' + esc(STATUS_LABELS[tracker.status] || 'Curious') + '</span>' + (isEarly ? '<span class="chip">Earlier-effort candidate</span>' : '') + '</div></div></article>';
  }
  function groupedList(ids, region, snapshot) {
    const groups = new Map();
    ids.forEach(id => {
      const item = snapshot.index.get(id);
      const food = item.category === 'Food & drink' || (region.foodIds || []).includes(id);
      const location = (locations()[id] || {}).locationLabel || item.location || region.base;
      const key = (food ? 'food|' : 'experience|') + location;
      if (!groups.has(key)) groups.set(key, { food, location, items: [] });
      groups.get(key).items.push(item);
    });
    return Array.from(groups.values()).sort((a, b) => Number(a.food) - Number(b.food)).map(group => '<section class="map-group"><h4>' + esc((group.food ? 'At the table · ' : '') + group.location) + '</h4>' + group.items.map(item => itemRow(item, region)).join('') + '</section>').join('');
  }
  function regionPanel(region, snapshot, rows) {
    if (!region) return '<aside class="map-sidebar"><div class="map-empty"><span class="eyebrow">A different corner awaits</span><h3>No region matches these filters.</h3><p class="muted">Try a different trip length, a broader search, or clear the filters. Your selected basket stays with you.</p>' + actionButton('Clear filters', 'reset-filters', '', 'primary') + '</div></aside>';
    const ids = shownIds(region, snapshot);
    const areaPicker = '<label class="form-field map-area-picker"><span>Choose a trip area</span><select id="map-area">' + rows.map(row => option(row.id, row.name, region.id)).join('') + '</select></label>';
    return '<aside class="map-sidebar" aria-labelledby="map-region-heading">' + areaPicker + '<span class="eyebrow">' + esc(region.region) + ' · ' + region.filteredIds.length + ' matching ideas</span><h3 id="map-region-heading">' + esc(region.name) + '</h3><p class="muted">' + esc(region.summary) + '</p><dl class="map-region-meta"><div><dt>A base to consider</dt><dd>' + esc(region.base) + '</dd></div><div><dt>Starting-point lengths</dt><dd>' + esc((region.days || []).map(day => DAY_LABELS[day] || day).join(' · ')) + '</dd></div><div><dt>Seasonal context</dt><dd>' + esc(region.season) + '</dd></div>' + ((region.airports || []).length ? '<div><dt>Airport starting points</dt><dd>' + esc(region.airports.join(' · ')) + '</dd></div>' : '') + '</dl>' + (region.routeNote ? '<p class="map-route-note">' + esc(region.routeNote) + '</p>' : '') + '<div class="map-section-actions">' + actionButton('Focus this area', 'focus-region', ' data-region="' + esc(region.id) + '"', 'small ghost', !region.point) + actionButton('Add shown ideas (' + ids.length + ')', 'select-shown', ' data-region="' + esc(region.id) + '"') + '</div><p class="form-help">Browse nearby ideas together, then choose a smaller set that fits your time. Pins locate an area, not an exact venue; neighboring markers do not calculate travel time.</p>' + groupedList(ids, region, snapshot) + (region.filteredIds.length > ids.length ? actionButton('Show 20 more · ' + (region.filteredIds.length - ids.length) + ' remaining', 'more', '', 'map-more ghost') : '') + '</aside>';
  }
  function selectionPanel(snapshot, current) {
    const selected = Array.from(ui.selected).map(id => snapshot.index.get(id)).filter(Boolean);
    const selectedRegions = unique(selected.map(item => (locations()[item.id] || {}).regionId || (snapshot.regionRows.find(region => region.ids.includes(item.id)) || {}).id).filter(Boolean));
    const region = current && current.ids.some(id => ui.selected.has(id)) ? current : snapshot.regionRows.find(entry => selectedRegions.includes(entry.id));
    const duration = DAY_LABELS[ui.days] || 'Flexible';
    return '<section class="map-selection" aria-labelledby="map-selection-heading"><div class="map-selection-heading"><div><span class="eyebrow">A loose plan basket</span><h3 id="map-selection-heading">' + selected.length + (selected.length === 1 ? ' idea, collected.' : ' ideas, collected.') + '</h3></div>' + (selected.length ? actionButton('Clear basket', 'clear-selection') : '') + '</div><p class="form-help">Selections stay when you change filters. ' + (selectedRegions.length > 1 ? 'Your basket spans ' + selectedRegions.length + ' areas. These areas may need separate bases; compare travel time before combining.' : 'A few well-chosen experiences leave more room to enjoy them.') + '</p>' + (selected.length ? '<ul class="map-selection-list">' + selected.slice(0, ui.selectionLimit).map(item => '<li><button type="button" class="map-item-title" data-map-action="item" data-item="' + esc(item.id) + '">' + esc(item.title) + '</button>' + actionButton('Remove', 'remove-selection', ' data-item="' + esc(item.id) + '"', 'small ghost') + '</li>').join('') + '</ul>' + (selected.length > ui.selectionLimit ? actionButton('Show ' + (selected.length - ui.selectionLimit) + ' more selected', 'more-selection') : '') : '<p class="muted">Select a checkbox beside a regional idea to start collecting.</p>') + '<div class="map-create-row"><span class="chip">Solo · ' + esc(duration) + '</span>' + actionButton('Create solo draft →', 'create-plan', region ? ' data-region="' + esc(region.id) + '"' : '', 'primary', !selected.length) + '</div><p class="form-help">A draft holds your choices. It does not book anything, set dates, or assume every selected activity fits the trip.</p></section>';
  }
  function render() {
    const snapshot = data();
    const rows = visibleRegions(snapshot);
    const current = activeRegion(rows);
    if (current) ui.selectedRegion = current.id;
    const regionalCategories = unique(snapshot.items.filter(item => item.scope === 'USA').map(item => item.category)).sort();
    const geographicRegions = unique(snapshot.regionRows.map(region => region.region)).sort();
    const locatedIds = new Set(snapshot.regionRows.flatMap(region => region.ids));
    const unplaced = snapshot.items.filter(item => item.scope === 'USA' && !locatedIds.has(item.id)).length;
    const mapped = unique(rows.flatMap(region => region.filteredIds)).length;
    return '<section id="life-map-planner" class="map-planner"><div class="view-heading map-heading"><div><span class="eyebrow">Let a place lead the way</span><h2>A little map. A lot of possibility.</h2><p class="muted">Choose a corner of the US, see what belongs nearby, and collect a few experiences into a solo draft.</p></div><div class="map-mode-toggle" role="group" aria-label="Map view">' + actionButton('Regional clusters', 'mode-regions', ' aria-pressed="' + (ui.mode === 'regions') + '"', ui.mode === 'regions' ? 'primary small' : 'ghost small') + actionButton('Experience pins', 'mode-pins', ' aria-pressed="' + (ui.mode === 'pins') + '"', ui.mode === 'pins' ? 'primary small' : 'ghost small') + '</div></div><form id="map-filters" class="map-toolbar toolbar" role="search"><div class="form-field"><label for="map-search">Find a place or experience</label><input id="map-search" class="search-input" type="search" value="' + esc(ui.query) + '" placeholder="California coast, barbecue, jazz…"></div><div class="form-field"><label for="map-region-filter">US region</label><select id="map-region-filter">' + option('', 'Every US region', ui.region) + geographicRegions.map(region => option(region, region, ui.region)).join('') + '</select></div><div class="form-field"><label for="map-days">Loose trip length</label><select id="map-days">' + option('', 'Any length', ui.days) + Object.entries(DAY_LABELS).map(([value, label]) => option(value, label, ui.days)).join('') + '</select></div><div class="form-field"><label for="map-category">Kind of experience</label><select id="map-category">' + option('', 'Every kind of wonder', ui.category) + regionalCategories.map(category => option(category, category, ui.category)).join('') + '</select></div><div class="form-field"><label for="map-status">My list</label><select id="map-status">' + option('', 'All possibilities', ui.status) + Object.entries(STATUS_LABELS).concat([['pinned', 'My pinned ideas']]).map(([value, label]) => option(value, label, ui.status)).join('') + '</select></div><label class="checkbox-field"><input id="map-earlier" type="checkbox"' + (ui.early ? ' checked' : '') + '> Earlier-effort candidates</label>' + actionButton('Reset filters', 'reset-filters') + '</form><p class="form-help">Trip lengths are starting points around one base. Earlier-effort candidates are editable priorities, not age deadlines.</p><div class="map-layout"><div class="map-stage"><div class="map-controls" role="group" aria-label="Map controls">' + actionButton('+', 'zoom-in', ' aria-label="Zoom map in"') + actionButton('−', 'zoom-out', ' aria-label="Zoom map out"') + actionButton('Reset map', 'reset-map') + actionButton('Fit my basket', 'fit-selection', '', 'small ghost', !ui.selected.size) + '<span class="map-pan-controls">' + actionButton('←', 'pan-left', ' aria-label="Pan map left"') + actionButton('↑', 'pan-up', ' aria-label="Pan map up"') + actionButton('↓', 'pan-down', ' aria-label="Pan map down"') + actionButton('→', 'pan-right', ' aria-label="Pan map right"') + '</span></div>' + (geometry().states.length ? svgMap(snapshot, rows, current) : '<div class="map-empty"><h3>The offline map is getting ready.</h3><p class="muted">Regional ideas remain available in the panel.</p></div>') + (rows.some(region => !region.point) ? '<div class="map-offmap-regions"><span class="eyebrow">Beyond the 50-state map</span>' + rows.filter(region => !region.point).map(region => actionButton(region.name + ' · ' + region.filteredIds.length, 'region', ' data-region="' + esc(region.id) + '" id="map-region-' + esc(region.id) + '" aria-pressed="' + (region.id === ui.selectedRegion) + '"', region.id === ui.selectedRegion ? 'primary small' : 'ghost small')).join('') + '</div>' : '') + '<div class="map-legend"><span><i class="map-legend-dot" aria-hidden="true"></i> ' + (ui.mode === 'regions' ? 'Numbers show matching regional ideas' : 'Nearby pins stack at this zoom') + '</span><span><i class="map-legend-ring" aria-hidden="true"></i> In your basket</span><span>' + mapped + ' ideas across ' + rows.length + ' areas</span></div><p class="form-help">Drag to pan, use + / − to zoom, or use the arrow controls. Alaska and Hawaii are shown in separate insets.</p>' + selectionPanel(snapshot, current) + (unplaced ? '<p class="form-help">' + unplaced + ' US ideas still need a regional location and remain available in Explore and the table.</p>' : '') + '</div>' + regionPanel(current, snapshot, rows) + '</div></section>';
  }
  function refresh(focusId, caret) {
    const focused = document.activeElement;
    if (!focusId && focused && focused.id && focused.closest && focused.closest('#life-map-planner')) focusId = focused.id;
    if (typeof hooks.onRender === 'function') {
      hooks.onRender();
      mount();
    } else {
      const root = document.getElementById('life-map-planner');
      if (!root) return;
      root.outerHTML = render(); mount();
    }
    if (focusId) {
      const input = document.getElementById(focusId);
      if (input) { input.focus(); if (caret != null && input.setSelectionRange) input.setSelectionRange(caret, caret); }
    }
  }
  function clampView() {
    const bounds = baseView();
    ui.view.width = Math.min(bounds.width * 1.1, Math.max(4, ui.view.width));
    ui.view.height = ui.view.width * bounds.height / bounds.width;
    ui.view.x = Math.max(bounds.x - ui.view.width * .3, Math.min(bounds.x + bounds.width - ui.view.width * .7, ui.view.x));
    ui.view.y = Math.max(bounds.y - ui.view.height * .3, Math.min(bounds.y + bounds.height - ui.view.height * .7, ui.view.y));
  }
  function zoom(factor) {
    const centerX = ui.view.x + ui.view.width / 2; const centerY = ui.view.y + ui.view.height / 2;
    const bounds = baseView();
    const width = Math.min(bounds.width * 1.1, Math.max(4, ui.view.width * factor));
    if (Math.abs(width - ui.view.width) < .001) return;
    ui.view.width = width; ui.view.height = width * bounds.height / bounds.width;
    ui.view.x = centerX - ui.view.width / 2; ui.view.y = centerY - ui.view.height / 2;
    clampView(); refresh();
  }
  function pan(dx, dy) { ui.view.x += dx * ui.view.width; ui.view.y += dy * ui.view.height; clampView(); refresh(); }
  function focusRegion(id) {
    const region = data().regionRows.find(entry => entry.id === id);
    if (!region || !region.point) return;
    const bounds = baseView(); const width = Math.min(440, bounds.width);
    ui.view = { x: region.point.x - width / 2, y: region.point.y - width * bounds.height / bounds.width / 2, width, height: width * bounds.height / bounds.width };
    clampView(); refresh();
  }
  function fitSelection() {
    const snapshot = data();
    const points = Array.from(ui.selected).map(id => itemPoint(id, snapshot.regionRows.find(region => region.ids.includes(id)))).filter(Boolean);
    if (!points.length) return notify('These selections are beyond the state map. Their regional panels still hold the details.');
    const minX = Math.min(...points.map(p => p.x)); const maxX = Math.max(...points.map(p => p.x));
    const minY = Math.min(...points.map(p => p.y)); const maxY = Math.max(...points.map(p => p.y));
    const bounds = baseView(); const width = Math.max(280, maxX - minX + 140, (maxY - minY + 140) * bounds.width / bounds.height);
    const height = width * bounds.height / bounds.width;
    ui.view = { x: (minX + maxX) / 2 - width / 2, y: (minY + maxY) / 2 - height / 2, width, height };
    clampView(); refresh();
  }
  function selectIds(ids) {
    const next = new Set([...ui.selected, ...ids]);
    if (next.size > 300) { refresh(); return notify('A draft can hold up to 300 ideas. Keep this basket smaller or split it into drafts.'); }
    ui.selected = next; refresh();
  }
  function createPlan() {
    const ids = Array.from(ui.selected);
    if (!ids.length) return;
    const snapshot = data(); const active = activeRegion(visibleRegions(snapshot));
    const current = active && active.ids.some(id => ui.selected.has(id)) ? active : snapshot.regionRows.find(region => region.ids.some(id => ui.selected.has(id))) || null;
    const duration = DAY_LABELS[ui.days] || 'Flexible';
    if (typeof hooks.createPlan === 'function') return hooks.createPlan(ids, current, duration);
    const title = (current ? current.name : 'US possibilities') + ' · solo draft';
    try {
      store().addPlan({ title: title.slice(0, 220), description: current ? current.summary || '' : '', itemIds: ids, duration, scope: 'USA', companions: 'solo', status: 'idea', notes: '', startDate: '', endDate: '' });
      notify('Your choices are saved as a loose solo draft.');
      if (typeof hooks.goPlans === 'function') hooks.goPlans();
    } catch (error) { notify(error.message || 'This draft could not be saved.'); }
  }
  function handleAction(target) {
    const action = target.dataset.mapAction;
    if (action === 'region') { ui.selectedRegion = target.dataset.region; ui.focusIds = []; ui.limit = 20; ui.mode = 'pins'; focusRegion(target.dataset.region); }
    else if (action === 'item') { if (typeof hooks.openItem === 'function') hooks.openItem(target.dataset.item); }
    else if (action === 'more') { ui.limit += 20; refresh(); }
    else if (action === 'more-selection') { ui.selectionLimit += 12; refresh(); }
    else if (action === 'mode-regions' || action === 'mode-pins') { ui.mode = action === 'mode-pins' ? 'pins' : 'regions'; refresh(); }
    else if (action === 'select-shown') {
      const snapshot = data(); const region = visibleRegions(snapshot).find(entry => entry.id === target.dataset.region);
      if (region) selectIds(shownIds(region, snapshot));
    } else if (action === 'remove-selection') { ui.selected.delete(target.dataset.item); refresh(); }
    else if (action === 'clear-selection') { ui.selected.clear(); refresh(); }
    else if (action === 'create-plan') createPlan();
    else if (action === 'zoom-in') zoom(.75);
    else if (action === 'zoom-out') zoom(1.3333);
    else if (action === 'pan-left') pan(-.2, 0);
    else if (action === 'pan-right') pan(.2, 0);
    else if (action === 'pan-up') pan(0, -.2);
    else if (action === 'pan-down') pan(0, .2);
    else if (action === 'reset-map') { ui.view = baseView(); refresh(); }
    else if (action === 'focus-region') focusRegion(target.dataset.region);
    else if (action === 'fit-selection') fitSelection();
    else if (action === 'reset-filters') { ui.region = ''; ui.days = ''; ui.category = ''; ui.status = ''; ui.query = ''; ui.early = false; ui.limit = 20; refresh(); }
    else if (action === 'pin-group') {
      const snapshot = data(); const rows = visibleRegions(snapshot); const group = pinGroups(rows, snapshot).find(entry => entry.key === target.dataset.pin);
      if (!group) return;
      if (group.ids.length === 1 && typeof hooks.openItem === 'function') hooks.openItem(group.ids[0]);
      else { ui.selectedRegion = group.regionIds[0]; ui.focusIds = group.ids; ui.limit = 20; refresh(); notify(group.ids.length + ' ideas share this approximate area. Browse their regional list.'); }
    }
  }
  function mount() {
    const root = document.getElementById('life-map-planner');
    if (!root || root === mounted) return;
    mounted = root;
    root.addEventListener('submit', event => { if (event.target.id === 'map-filters') event.preventDefault(); });
    root.addEventListener('click', event => {
      if (suppressClick) return;
      const target = event.target.closest('[data-map-action]');
      if (target && !target.disabled) handleAction(target);
    });
    root.addEventListener('change', event => {
      const target = event.target;
      if (target.dataset.mapSelect) {
        if (target.checked) selectIds([target.dataset.mapSelect]); else { ui.selected.delete(target.dataset.mapSelect); refresh(); }
        return;
      }
      if (target.id === 'map-area') { ui.selectedRegion = target.value; ui.focusIds = []; ui.limit = 20; refresh(target.id); return; }
      const fields = { 'map-region-filter': 'region', 'map-days': 'days', 'map-category': 'category', 'map-status': 'status' };
      if (fields[target.id]) { ui[fields[target.id]] = target.value; ui.limit = 20; refresh(target.id); }
      else if (target.id === 'map-earlier') { ui.early = target.checked; ui.limit = 20; refresh(target.id); }
    });
    root.addEventListener('input', event => { if (event.target.id === 'map-search') { ui.query = event.target.value; ui.limit = 20; refresh('map-search', event.target.selectionStart); } });
    root.addEventListener('keydown', event => {
      const target = event.target.closest('[data-map-action]');
      if (target && target.tagName.toLowerCase() === 'g' && ['Enter', ' '].includes(event.key)) { event.preventDefault(); handleAction(target); return; }
      if (event.target.id !== 'life-map-svg') return;
      const keys = { ArrowLeft: () => pan(-.15, 0), ArrowRight: () => pan(.15, 0), ArrowUp: () => pan(0, -.15), ArrowDown: () => pan(0, .15), '+': () => zoom(.75), '=': () => zoom(.75), '-': () => zoom(1.3333), Home: () => { ui.view = baseView(); refresh(); } };
      if (keys[event.key]) { event.preventDefault(); keys[event.key](); const svg = document.getElementById('life-map-svg'); if (svg) svg.focus(); }
    });
    const svg = root.querySelector('#life-map-svg');
    if (!svg) return;
    svg.addEventListener('pointerdown', event => {
      if (event.button !== 0 || event.target.closest('[data-map-action]')) return;
      drag = { id: event.pointerId, x: event.clientX, y: event.clientY, view: { ...ui.view }, moved: false };
      svg.setPointerCapture(event.pointerId);
    });
    svg.addEventListener('pointermove', event => {
      if (!drag || drag.id !== event.pointerId) return;
      const rect = svg.getBoundingClientRect();
      const dx = event.clientX - drag.x; const dy = event.clientY - drag.y;
      if (Math.abs(dx) + Math.abs(dy) > 4) drag.moved = true;
      ui.view.x = drag.view.x - dx * drag.view.width / rect.width;
      ui.view.y = drag.view.y - dy * drag.view.height / rect.height;
      clampView(); svg.setAttribute('viewBox', [ui.view.x, ui.view.y, ui.view.width, ui.view.height].join(' '));
    });
    const endDrag = event => {
      if (!drag || drag.id !== event.pointerId) return;
      suppressClick = drag.moved; drag = null;
      if (svg.hasPointerCapture(event.pointerId)) svg.releasePointerCapture(event.pointerId);
      setTimeout(() => { suppressClick = false; }, 60);
    };
    svg.addEventListener('pointerup', endDrag); svg.addEventListener('pointercancel', endDrag);
  }
  global.LifeSvgMap = {
    configure: callbacks => { hooks = { ...hooks, ...(callbacks || {}) }; return global.LifeSvgMap; },
    render, mount,
    getSelection: () => Array.from(ui.selected),
    setSelection: ids => { const known = new Set(data().items.map(item => item.id)); ui.selected = new Set((Array.isArray(ids) ? ids : []).filter(id => known.has(id))); },
    clearSelection: () => { ui.selected.clear(); refresh(); },
    setRegion: id => {
      const region = regions().find(entry => entry.id === id);
      if (region) { ui.region = region.region; if (!(region.days || []).includes(ui.days)) ui.days = ''; }
      ui.selectedRegion = id; ui.focusIds = []; ui.limit = 20; refresh();
    },
    resetMap: () => { ui.view = baseView(); refresh(); }
  };
})(window);
