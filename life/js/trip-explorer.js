/* A few practical trip shapes. The day sequence and geographic preview are
 * planning context, never a booking, live ETA, driving route or venue geocode. */
(function (global) {
  'use strict';
  const ui = { days: 4, familyId: '', variantId: '', query: '', mode: '', geography: '', pendingOnly: false, recommendedIds: [], areaActive: false, areaLabel: '' };
  let hooks = {};
  let preview = null;
  let previewNode = null;
  let resizeObserver = null;
  let detachObserver = null;
  let previewVariant = '';
  let lastView = null;
  const bound = new WeakSet();
  const COLORS = { travel: '#a97656', explore: '#4f7c67', rest: '#b77b84', transfer: '#648c9e' };
  const KIND_LABELS = { travel: 'Travel buffer', explore: 'Explore', rest: 'Rest / flexibility', transfer: 'Base change' };
  const esc = value => String(value == null ? '' : value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));
  const normalize = value => String(value || '').normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
  const unique = values => Array.from(new Set(values));
  const families = () => (global.LIFE_TRIP_OPTIONS || []).filter(family => family && family.id && Array.isArray(family.variants));
  const items = () => global.LifeStore ? global.LifeStore.getItems() : (global.LIFE_CATALOG || []).map(item => ({ ...item, tracker: { status: 'curious', interest: 0 } }));
  const points = () => ({ ...(global.LIFE_TRIP_ITEM_LOCATIONS || {}), ...(global.LIFE_WORLD_ITEM_LOCATIONS || {}), ...(global.LIFE_LOCATION_CORRECTIONS || {}) });
  const validPoint = point => point && Number.isFinite(Number(point.lat)) && Number.isFinite(Number(point.lon)) && Math.abs(Number(point.lat)) <= 85.0511 && Math.abs(Number(point.lon)) <= 180;
  const supportedVariant = variant => variant && variant.id && [4, 10].includes(Number(variant.days));
  function current() {
    const options = families();
    if (ui.areaActive && !ui.recommendedIds.length) return { family: null, variant: null };
    let family = options.find(entry => entry.id === ui.familyId);
    if (!family) family = options[0];
    if (!family) return { family: null, variant: null };
    let variant = family.variants.find(entry => entry.id === ui.variantId && supportedVariant(entry));
    if (!variant || Number(variant.days) !== ui.days) variant = family.variants.find(entry => Number(entry.days) === ui.days && supportedVariant(entry));
    if (!variant) variant = family.variants.find(supportedVariant);
    ui.familyId = family.id;
    ui.variantId = variant ? variant.id : '';
    if (variant) ui.days = Number(variant.days);
    return { family, variant };
  }
  function snapshot() {
    const list = items();
    return { index: new Map(list.map(item => [item.id, item])), locations: points(), regions: global.LIFE_TRIP_REGIONS || [] };
  }
  function goals(variant, snap) {
    return unique(variant.itemIds || []).map(id => snap.index.get(id)).filter(Boolean);
  }
  function counts(variant, snap) {
    const list = goals(variant, snap);
    return {
      total: list.length,
      pending: list.filter(item => !['done', 'pass'].includes((item.tracker || {}).status || 'curious')).length,
      done: list.filter(item => (item.tracker || {}).status === 'done').length,
      revisit: list.filter(item => (item.tracker || {}).status === 'revisit').length,
      passed: list.filter(item => (item.tracker || {}).status === 'pass').length
    };
  }
  function dayCounts(variant) {
    const result = { travel: 0, explore: 0, rest: 0, transfer: 0 };
    (variant.outline || []).forEach(day => { if (Object.prototype.hasOwnProperty.call(result, day.kind)) result[day.kind] += 1; });
    return result;
  }
  function button(label, action, id, classes) {
    return '<button type="button" class="button ' + (classes || 'small ghost') + '" data-trip-action="' + esc(action) + '"' + (id ? ' data-trip-id="' + esc(id) + '"' : '') + '>' + esc(label) + '</button>';
  }
  function options(values, selected, first) {
    return '<option value="">' + esc(first) + '</option>' + values.map(value => '<option value="' + esc(value[0]) + '"' + (value[0] === selected ? ' selected' : '') + '>' + esc(value[1]) + '</option>').join('');
  }
  function geographyOf(family, snap) {
    const regions = snap.regions.filter(region => (family.regionIds || []).includes(region.id));
    return unique(regions.map(region => region.region).filter(Boolean));
  }
  function visibleFamilies(snap) {
    const query = normalize(ui.query);
    return families().filter(family => {
      if (ui.areaActive && !ui.recommendedIds.includes(family.id)) return false;
      const variant = family.variants.find(entry => Number(entry.days) === ui.days && supportedVariant(entry));
      if (!variant) return false;
      const text = normalize([family.title, family.theme, family.why, family.scope, family.season, ...(variant.baseLabels || []), ...goals(variant, snap).map(item => item.title + ' ' + item.location)].join(' '));
      return (!query || text.includes(query)) && (!ui.mode || variant.mode === ui.mode) && (!ui.geography || geographyOf(family, snap).includes(ui.geography)) && (!ui.pendingOnly || counts(variant, snap).pending > 0);
    });
  }
  function filterHtml(snap) {
    const geographies = unique(families().flatMap(family => geographyOf(family, snap))).sort();
    return '<div class="trip-filter-bar"><div class="trip-segmented" role="group" aria-label="Compare trip length">' + [4, 10].map(days => '<button type="button" id="trip-days-' + days + '" class="' + (ui.days === days ? 'is-active' : '') + '" data-trip-action="days" data-trip-id="' + days + '" aria-pressed="' + (ui.days === days) + '">' + days + ' days</button>').join('') + '</div><div class="form-field"><label for="trip-search">Find a trip shape</label><input id="trip-search" type="search" value="' + esc(ui.query) + '" placeholder="A base, a food, a mountain…"></div><div class="form-field"><label for="trip-mode">Getting there</label><select id="trip-mode">' + options([['drive', 'Drive from the Bay Area'], ['fly', 'Fly + local travel']], ui.mode, 'Drive or fly') + '</select></div><div class="form-field"><label for="trip-geography">Trip region</label><select id="trip-geography">' + options(geographies.map(region => [region, region]), ui.geography, 'All trip regions') + '</select></div><label class="checkbox-field"><input id="trip-pending-only" type="checkbox"' + (ui.pendingOnly ? ' checked' : '') + '> Unfinished ideas</label>' + button('Reset filters', 'reset') + '</div>';
  }
  function budgetHtml(family, snap) {
    return '<div class="trip-comparison"><div class="trip-detail-heading"><div><span class="eyebrow">The same region, two different windows</span><h3>What fits inside the days?</h3></div><p class="form-help">Travel and base changes use part of the window. Activity ideas are choices rather than a daily quota.</p></div><div class="trip-comparison-grid">' + family.variants.filter(supportedVariant).map(variant => {
      const days = dayCounts(variant);
      const total = counts(variant, snap);
      const allowance = variant.travelAllowance || {};
      const clean = value => String(value || '').replace(/^Approximate planning allowance:\s*/i, '');
      return '<article class="trip-budget-card' + (variant.id === ui.variantId ? ' is-selected' : '') + '"><div class="trip-budget-heading"><span class="trip-budget-number">' + Number(variant.days) + '<small>days</small></span><div><h4>' + esc(variant.title) + '</h4><span class="muted">' + total.pending + ' pending ideas · ' + (variant.baseLabels || []).length + ' planned base' + ((variant.baseLabels || []).length === 1 ? '' : 's') + '</span></div></div><dl class="trip-budget-breakdown">' + Object.keys(KIND_LABELS).map(kind => '<div class="is-' + kind + '"><dt>' + esc(KIND_LABELS[kind]) + '</dt><dd>' + days[kind] + (days[kind] === 1 ? ' day' : ' days') + '</dd></div>').join('') + '</dl><details class="trip-allowance"><summary>Rough door-to-door travel allowances</summary><p><strong>Outbound:</strong> ' + esc(clean(allowance.outbound)) + '</p><p><strong>Return:</strong> ' + esc(clean(allowance.return)) + '</p><p class="form-help">Planning assumptions, not live flight or driving estimates. Actual schedules, access, weather and your chosen base can require more time.</p></details>' + button(variant.id === ui.variantId ? 'Viewing this outline' : 'See this day-by-day outline →', 'variant', variant.id, variant.id === ui.variantId ? 'small ghost' : 'small primary') + '</article>';
    }).join('') + '</div></div>';
  }
  function timelineHtml(variant, snap) {
    return '<div class="trip-detail-heading"><div><span class="eyebrow">A day-by-day starting shape</span><h3>' + Number(variant.days) + ' days, with room around the experiences.</h3></div><div class="trip-kind-key">' + Object.keys(KIND_LABELS).map(kind => '<span class="is-' + kind + '"><i aria-hidden="true"></i>' + esc(KIND_LABELS[kind]) + '</span>').join('') + '</div></div><div class="trip-day-strip" tabindex="0" role="region" aria-label="Scrollable day-by-day trip outline">' + (variant.outline || []).map(day => {
      const kind = Object.prototype.hasOwnProperty.call(KIND_LABELS, day.kind) ? day.kind : 'explore';
      const dayItems = unique(day.itemIds || []).map(id => snap.index.get(id)).filter(Boolean);
      return '<article class="trip-day is-' + kind + '"><div class="trip-day-heading"><span class="eyebrow">Day ' + esc(day.day) + '</span><span>' + esc(KIND_LABELS[kind]) + '</span></div><h4>' + esc(day.base) + '</h4><p>' + esc(day.focus) + '</p>' + (dayItems.length ? '<div class="trip-day-ideas">' + dayItems.map(item => '<div class="trip-day-idea-row"><button type="button" data-trip-action="item" data-trip-id="' + esc(item.id) + '">' + esc(item.title) + '<span aria-hidden="true">↗</span></button>' + (['done', 'pass', 'revisit'].includes((item.tracker || {}).status) ? '<span class="trip-idea-status chip">' + esc({ done: 'Already lived', pass: 'Not for me', revisit: 'Want to revisit' }[item.tracker.status]) + '</span>' : '') + '</div>').join('') + '</div>' : '<span class="trip-day-space">' + (kind === 'travel' ? 'Keep this travel buffer.' : kind === 'transfer' ? 'Choose the actual route later.' : 'Room for your own pace.') + '</span>') + '</article>';
    }).join('') + '</div>';
  }
  function baseSequence(variant) {
    const sequence = [];
    (variant.outline || []).forEach(day => {
      const value = String(day.base || '').trim();
      if (!value) return;
      const last = sequence[sequence.length - 1];
      if (last && last.label === value) last.lastDay = day.day;
      else sequence.push({ label: value, firstDay: day.day, lastDay: day.day });
    });
    return sequence;
  }
  function baseHtml(variant) {
    return '<div class="trip-bases"><span class="eyebrow">Planned bases</span><p>' + (variant.baseLabels || []).map(label => esc(label)).join(' <span aria-hidden="true">→</span> ') + '</p><details><summary>Exact base sequence in this outline</summary><ol class="trip-base-sequence">' + baseSequence(variant).map(entry => '<li><span>Day ' + esc(entry.firstDay) + (entry.lastDay !== entry.firstDay ? '–' + esc(entry.lastDay) : '') + '</span><strong>' + esc(entry.label) + '</strong></li>').join('') + '</ol></details></div>';
  }
  function previewData(variant, family, snap) {
    const located = [];
    const omitted = [];
    goals(variant, snap).forEach(item => {
      const point = snap.locations[item.id];
      if (!validPoint(point) || !['city area', 'place area'].includes(point.precision)) { omitted.push(item.id); return; }
      located.push({ item, point: { ...point, lat: Number(point.lat), lon: Number(point.lon) } });
    });
    // Reuse justified geographic context only. A broad regional-base point cannot
    // become an exact lodging/airport/base anchor simply by changing its label.
    const references = [];
    Object.entries(snap.locations).forEach(([id, point]) => {
      if (!validPoint(point) || !['city area', 'place area'].includes(point.precision)) return;
      const item = snap.index.get(id);
      if (item) references.push({ lat: Number(point.lat), lon: Number(point.lon), label: point.locationLabel || item.location, text: normalize([point.locationLabel, item.location, item.title].join(' ')), precision: point.precision });
    });
    snap.regions.filter(region => (family.regionIds || []).includes(region.id)).forEach(region => {
      if (validPoint(region)) references.push({ lat: Number(region.lat), lon: Number(region.lon), label: region.base, text: normalize(region.base), precision: 'city area' });
    });
    const cleanBase = label => normalize(String(label).replace(/\b(?:base|gateway|area|airports?|corridor|selected|chosen)\b/gi, ''));
    const usable = label => {
      const text = cleanBase(label);
      return text.length >= 4 && !/^(bay|bay area|home|northern|western peninsula|north coast|coast|valley|northern base|selected departure|departure|las|phx|den|abq|anc|btv|bos|mia|fll)$/.test(text);
    };
    function resolve(label, day) {
      const text = cleanBase(label);
      if (!usable(label)) return null;
      const tokens = text.split(' ').filter(word => word.length > 2);
      const related = (day.itemIds || []).map(id => located.find(entry => entry.item.id === id)).filter(Boolean).map(entry => ({ lat: entry.point.lat, lon: entry.point.lon, label: entry.point.locationLabel || entry.item.location, text: normalize([entry.point.locationLabel, entry.item.location, entry.item.title].join(' ')), precision: entry.point.precision }));
      const candidates = related.concat(references);
      const exact = candidates.find(point => point.text.includes(text));
      if (exact) return { ...exact, base: label, day: day.day };
      // Base labels sometimes explicitly pair a town with a park/valley. Match
      // a named paired sector; never infer a coordinate from generic directions.
      const parts = String(label).split(/\s\/\s|\sor\s/i).filter(usable);
      for (const part of parts) {
        const partText = cleanBase(part);
        const found = candidates.find(point => point.text.includes(partText));
        if (found) return { ...found, base: label, day: day.day };
      }
      if (tokens.length > 1) {
        const found = candidates.find(point => tokens.every(token => point.text.split(' ').includes(token)));
        if (found) return { ...found, base: label, day: day.day };
      }
      return null;
    }
    const anchors = [];
    (variant.outline || []).forEach(day => {
      const parts = String(day.base || '').split(/\s*(?:→|->)\s*/);
      const selected = parts.length > 1 ? parts.filter(usable).slice(-1)[0] : parts[0];
      const point = selected ? resolve(selected, day) : null;
      if (!point) { anchors.push(null); return; }
      anchors.push(point);
    });
    const segments = [];
    let previous = null;
    anchors.forEach(anchor => {
      if (!anchor) { previous = null; return; }
      if (previous && (previous.lat !== anchor.lat || previous.lon !== anchor.lon)) segments.push([[previous.lat, previous.lon], [anchor.lat, anchor.lon]]);
      previous = anchor;
    });
    return { located, omitted, anchors, segments };
  }
  function detailHtml(family, variant, snap) {
    const count = counts(variant, snap);
    const previewInfo = previewData(variant, family, snap);
    return '<article class="trip-detail" id="trip-selected-detail" aria-labelledby="trip-selected-title"><div class="trip-detail-heading"><div><span class="eyebrow">' + esc(family.title) + ' · ' + Number(variant.days) + ' days</span><h2 id="trip-selected-title">' + esc(variant.title) + '</h2><p class="muted">' + esc(family.theme || family.why) + '</p></div><span class="chip">' + (variant.mode === 'drive' ? 'Drive from home' : 'Fly + local travel') + ' · Solo by default</span></div><div class="trip-status-line"><span>' + count.pending + ' ideas still to explore</span><span>' + count.done + ' already lived</span>' + (count.revisit ? '<span>' + count.revisit + ' to revisit</span>' : '') + '<span>' + count.total + ' possible experiences in this outline</span></div><p class="form-help">Progress comes from your own tracker. Choosing a trip or opening an idea does not complete it.</p>' + budgetHtml(family, snap) + '<div class="trip-preview-layout"><div><div id="trip-preview-map" class="trip-preview-map" role="region" aria-label="Geographic context for ' + esc(variant.title) + '"></div><p class="trip-preview-note">Approximate city and place areas. Shared points open a member list. Dashed lines show a planning sequence, not a driving route.</p>' + (previewInfo.omitted.length ? '<p class="trip-preview-note">' + previewInfo.omitted.length + ' idea' + (previewInfo.omitted.length === 1 ? ' has' : 's have') + ' only broad or missing geographic context and stays in the day list.</p>' : '') + '</div><div>' + baseHtml(variant) + '<div class="trip-context"><p><strong>Route context</strong><br>' + esc(variant.routeNote) + '</p><p><strong>Effort &amp; support</strong><br>' + esc(variant.fitnessNote) + '</p><p><strong>What this covers</strong><br>' + esc(variant.coverageNote) + '</p><details><summary>Seasonal context</summary><p>' + esc(family.season) + '</p></details></div></div></div>' + timelineHtml(variant, snap) + '<div class="trip-actions">' + button('Start my ' + Number(variant.days) + '-day draft →', 'draft', variant.id, 'primary') + button('Nearby ideas on full map ↗', 'map', variant.id, 'ghost') + '<p class="form-help">Draft selections respect “Not for me.” With Unfinished ideas checked, already-lived ideas stay unselected. You can edit every draft before saving it.</p></div></article>';
  }
  function familyCard(family, snap) {
    const variant = family.variants.find(entry => Number(entry.days) === ui.days && supportedVariant(entry));
    const count = counts(variant, snap);
    const days = dayCounts(variant);
    return '<article class="trip-option-card' + (family.id === ui.familyId ? ' is-selected' : '') + '"><div class="trip-option-meta"><span class="eyebrow">' + esc(geographyOf(family, snap).join(' · ') || family.scope) + '</span><span>' + (variant.mode === 'drive' ? 'Drive' : 'Fly') + ' · ' + Number(variant.days) + ' days</span></div><h3>' + esc(family.title) + '</h3><p>' + esc(variant.title) + '</p><p class="form-help">' + esc(family.why) + '</p><div class="trip-option-meta"><span>' + days.explore + ' explore day' + (days.explore === 1 ? '' : 's') + '</span><span>' + count.pending + ' pending ideas</span><span>' + (variant.baseLabels || []).length + ' base' + ((variant.baseLabels || []).length === 1 ? '' : 's') + '</span></div>' + button(family.id === ui.familyId ? 'Viewing this trip shape' : 'See the actual outline →', 'family', family.id, family.id === ui.familyId ? 'small ghost' : 'small primary') + '</article>';
  }
  function render() {
    const selected = current();
    const snap = snapshot();
    if (!selected.family || !selected.variant) {
      if (ui.areaActive) return '<section class="trip-explorer" id="life-trip-explorer"><div class="empty-state"><h3>No preset route for this area yet.</h3><p>Your map bucket is still available. The starter-route bank covers selected US areas; this area needs a custom draft.</p>' + button('Return to my map bucket', 'back-map', '', 'primary') + button('Browse all trip options', 'reset') + '</div></section>';
      return '<section class="trip-explorer"><div class="empty-state"><h3>Trip shapes are getting ready.</h3><p>The experience atlas remains available while these starting options load.</p></div></section>';
    }
    const shown = visibleFamilies(snap);
    return '<section class="trip-explorer" id="life-trip-explorer" aria-label="Compare four-day and ten-day trip options"><div class="view-heading"><div><span class="eyebrow">A real shape for a little time away</span><h2>Four days or ten?</h2><p class="muted">Compare the travel buffers, bases, rest and actual ideas before starting a draft.</p></div></div>' + (ui.areaActive ? '<p class="trip-area-context">Starter routes overlapping ' + esc(ui.areaLabel) + '. Review the selected ideas and travel allowances; this is a geographic match, not a live route optimization.</p>' : '') + filterHtml(snap) + detailHtml(selected.family, selected.variant, snap) + '<div class="view-heading"><div><span class="eyebrow">Other ways to use this window</span><h3>' + shown.length + ' trip famil' + (shown.length === 1 ? 'y' : 'ies') + ' to compare</h3><p class="muted">Your selected outline stays open while you browse these filters.</p></div></div>' + (shown.length ? '<div class="trip-option-grid">' + shown.map(family => familyCard(family, snap)).join('') + '</div>' : '<div class="empty-state"><h3>Try a wider window.</h3><p>Change the region, travel mode or search. The selected trip stays above.</p>' + button('Reset trip filters', 'reset', '', 'primary') + '</div>') + '</section>';
  }
  function teardown() {
    if (preview) {
      try { const center = preview.getCenter(); lastView = { variantId: previewVariant, center: [center.lat, center.lng], zoom: preview.getZoom() }; } catch (_) {}
      if (resizeObserver) { resizeObserver.disconnect(); resizeObserver = null; }
      if (detachObserver) { detachObserver.disconnect(); detachObserver = null; }
      preview.remove();
    }
    preview = null; previewNode = null;
  }
  function mapPopup(group) {
    const point = group[0].point;
    return '<div class="trip-preview-popup"><span class="eyebrow">' + esc(point.precision) + ' context</span><h4>' + group.length + (group.length === 1 ? ' trip idea here' : ' trip ideas sharing this point') + '</h4><p>' + esc(point.locationLabel) + '</p><div class="trip-day-ideas">' + group.map(entry => '<button type="button" data-trip-action="item" data-trip-id="' + esc(entry.item.id) + '">' + esc(entry.item.title) + '</button>').join('') + '</div></div>';
  }
  function mountPreview(node, selected, snap) {
    if (preview && previewNode === node && previewVariant === selected.variant.id) return;
    if (preview) teardown();
    if (!global.L) { node.innerHTML = '<p class="empty-state">The geographic preview could not load. Every base and day is still listed beside it.</p>'; return; }
    const data = previewData(selected.variant, selected.family, snap);
    if (!data.located.length) { node.innerHTML = '<p class="empty-state">These ideas need more specific geographic context. Use the base sequence and day outline.</p>'; return; }
    previewNode = node; previewVariant = selected.variant.id;
    preview = global.L.map(node, { zoomControl: true, scrollWheelZoom: true, minZoom: 2, maxZoom: 18, attributionControl: true });
    global.L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a>', updateWhenIdle: true, keepBuffer: 1 }).addTo(preview);
    const groups = new Map();
    data.located.forEach(entry => {
      const key = entry.point.lat.toFixed(5) + ':' + entry.point.lon.toFixed(5);
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(entry);
    });
    groups.forEach(group => {
      const first = group[0];
      const kindOf = item => item.category === 'Food & drink' ? 'food' : ['Places & heritage', 'Nature & wildlife'].includes(item.category) ? 'places' : ['Adventure & movement', 'Journeys & transport', 'Arts & living culture'].includes(item.category) ? 'activities' : 'everyday';
      const colors = {places: '#3f78c4', activities: '#c45c55', food: '#44855b', everyday: '#8b6db4'};
      const kinds = {}; group.forEach(entry => { const kind = kindOf(entry.item); kinds[kind] = (kinds[kind] || 0) + 1; });
      const keys = Object.keys(kinds); const mixed = keys.length > 1; const circumference = 2 * Math.PI * 11;
      let offset = 0;
      const ring = mixed ? keys.map(kind => { const length = kinds[kind] / group.length * circumference; const svg = '<circle cx="15" cy="15" r="11" fill="none" stroke="' + colors[kind] + '" stroke-width="4" stroke-dasharray="' + length.toFixed(2) + ' ' + circumference.toFixed(2) + '" stroke-dashoffset="' + (-offset).toFixed(2) + '" transform="rotate(-90 15 15)"/>'; offset += length; return svg; }).join('') : '';
      const fill = mixed ? 'var(--paper,#fffdf7)' : colors[keys[0]];
      const ink = mixed ? 'var(--ink,#2d4035)' : '#fffdf7';
      const icon = global.L.divIcon({ className: 'trip-preview-icon', iconSize: [30, 30], iconAnchor: [15, 15], popupAnchor: [0, -15], html: '<svg viewBox="0 0 30 30" width="30" height="30" aria-hidden="true"><circle cx="15" cy="15" r="13" fill="' + fill + '" stroke="var(--paper,#fffdf7)" stroke-width="3"/>' + ring + '<text x="15" y="16" text-anchor="middle" dominant-baseline="central" fill="' + ink + '" font-size="12" font-family="sans-serif" font-weight="600">' + (group.length > 1 ? group.length : '✧') + '</text></svg>' });
      global.L.marker([first.point.lat, first.point.lon], { icon, title: group.length + ' trip idea' + (group.length === 1 ? '' : 's') + ' · ' + first.point.locationLabel, keyboard: true }).bindPopup(mapPopup(group), { className: 'trip-preview-popup-shell', maxWidth: 320 }).addTo(preview);
    });
    const color = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#496b50';
    data.segments.forEach(segment => global.L.polyline(segment, { color, weight: 2, dashArray: '5 7', opacity: .75, interactive: false }).addTo(preview));
    const boundsPoints = data.located.map(entry => [entry.point.lat, entry.point.lon]);
    data.anchors.filter(Boolean).forEach(anchor => boundsPoints.push([anchor.lat, anchor.lon]));
    if (lastView && lastView.variantId === selected.variant.id) preview.setView(lastView.center, lastView.zoom, { animate: false });
    else if (boundsPoints.every(point => point[0] === boundsPoints[0][0] && point[1] === boundsPoints[0][1])) preview.setView(boundsPoints[0], 10, { animate: false });
    else preview.fitBounds(global.L.latLngBounds(boundsPoints), { padding: [28, 28], maxZoom: 10, animate: false });
    preview.on('popupopen', event => {
      const element = event.popup.getElement();
      if (!element || bound.has(element)) return;
      bound.add(element);
      element.addEventListener('click', click => {
        const target = click.target.closest('[data-trip-action]');
        if (target) { click.stopPropagation(); handleAction(target); }
      });
    });
    if (global.MutationObserver) { detachObserver = new MutationObserver(() => { if (preview && previewNode && !previewNode.isConnected) teardown(); }); detachObserver.observe(document.body, { childList: true, subtree: true }); }
    if (global.ResizeObserver) { resizeObserver = new ResizeObserver(() => { if (preview && node.isConnected) preview.invalidateSize({ pan: false }); }); resizeObserver.observe(node); }
    setTimeout(() => { if (preview && node.isConnected) preview.invalidateSize({ pan: false }); }, 0);
  }
  function requestUpdate(focusId, selectionStart, scrollToDetail) {
    if (hooks.requestRender) hooks.requestRender();
    else {
      const section = document.getElementById('life-trip-explorer');
      if (section) { teardown(); section.outerHTML = render(); mount(); }
    }
    setTimeout(() => {
      if (focusId) {
        const field = document.getElementById(focusId);
        if (field) { field.focus({ preventScroll: true }); if (selectionStart != null && field.setSelectionRange) { try { field.setSelectionRange(selectionStart, selectionStart); } catch (_) {} } }
      }
      if (scrollToDetail) { const detail = document.getElementById('trip-selected-detail'); if (detail) { const heading = detail.querySelector('h2'); if (heading) { heading.tabIndex = -1; heading.focus({ preventScroll: true }); } detail.scrollIntoView({ block: 'nearest', behavior: global.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' }); } }
    }, 0);
  }
  function selectVariant(id, scroll) {
    const family = families().find(entry => entry.variants.some(variant => variant.id === id && supportedVariant(variant)));
    if (!family) return false;
    const variant = family.variants.find(entry => entry.id === id);
    ui.familyId = family.id; ui.variantId = variant.id; ui.days = Number(variant.days);
    requestUpdate('trip-days-' + ui.days, null, !!scroll);
    return true;
  }
  function handleAction(target) {
    const action = target.dataset.tripAction;
    const id = target.dataset.tripId;
    if (action === 'days') {
      const days = Number(id);
      if (![4, 10].includes(days)) return;
      ui.days = days; ui.variantId = '';
      requestUpdate('trip-days-' + days);
    } else if (action === 'family') {
      const family = families().find(entry => entry.id === id);
      if (!family) return;
      const variant = family.variants.find(entry => Number(entry.days) === ui.days && supportedVariant(entry)) || family.variants.find(supportedVariant);
      if (variant) selectVariant(variant.id, true);
    } else if (action === 'variant') selectVariant(id, false);
    else if (action === 'item') { if (hooks.openItem) hooks.openItem(id); }
    else if (action === 'draft') {
      const selected = current();
      if (selected.variant && hooks.openDraft) {
        const snap = snapshot();
        const eligible = goals(selected.variant, snap).filter(item => (item.tracker || {}).status !== 'pass' && (!ui.pendingOnly || (item.tracker || {}).status !== 'done')).map(item => item.id);
        const draft = { ...selected.variant, itemIds: eligible, baseLabels: (selected.variant.baseLabels || []).slice(), gateways: (selected.variant.gateways || []).slice(), travelAllowance: { ...(selected.variant.travelAllowance || {}) }, outline: (selected.variant.outline || []).map(day => ({ ...day, itemIds: (day.itemIds || []).slice() })) };
        hooks.openDraft(draft, selected.family);
      }
    } else if (action === 'map') {
      const selected = current();
      if (selected.variant && hooks.showOnMap) hooks.showOnMap(unique(selected.variant.itemIds || []), selected.family.regionIds || []);
    } else if (action === 'back-map') { if (hooks.showOnMap) hooks.showOnMap([], []); }
    else if (action === 'reset') {
      ui.areaActive = false; ui.recommendedIds = []; ui.areaLabel = '';
      ui.query = ''; ui.mode = ''; ui.geography = ''; ui.pendingOnly = false;
      requestUpdate('trip-search');
    }
  }
  function recommendArea(context) {
    const area = new Set(Array.isArray(context.areaIds) ? context.areaIds : []);
    const selected = new Set(Array.isArray(context.selectedIds) ? context.selectedIds : []);
    ui.days = context.days === 10 ? 10 : 4;
    const ranked = families().map(family => {
      const variant = family.variants.find(variant => Number(variant.days) === ui.days);
      if (!variant) return null;
      const selectedMatches = variant.itemIds.filter(id => selected.has(id)).length;
      const areaMatches = variant.itemIds.filter(id => area.has(id)).length;
      return { family, variant, selectedMatches, areaMatches, score: selectedMatches * 100 + areaMatches + areaMatches / Math.max(1, variant.itemIds.length) };
    }).filter(entry => entry && (selected.size ? entry.selectedMatches > 0 : entry.areaMatches > 0)).sort((a, b) => b.score - a.score);
    ui.areaActive = true; ui.areaLabel = String(context.label || 'your map area');
    ui.recommendedIds = ranked.map(entry => entry.family.id);
    ui.query = ''; ui.mode = ''; ui.geography = '';
    if (ranked.length) { ui.familyId = ranked[0].family.id; ui.variantId = ranked[0].variant.id; }
    requestUpdate('trip-days-' + ui.days, null, true);
  }
  function mount() {
    const node = document.getElementById('life-trip-explorer');
    if (!node) { if (preview && !preview.getContainer().isConnected) teardown(); return; }
    if (!bound.has(node)) {
      bound.add(node);
      node.addEventListener('click', event => { const target = event.target.closest('[data-trip-action]'); if (target) handleAction(target); });
      node.addEventListener('input', event => {
        if (event.target.id === 'trip-search') { ui.query = event.target.value; requestUpdate('trip-search', event.target.selectionStart); }
      });
      node.addEventListener('change', event => {
        const fields = { 'trip-mode': 'mode', 'trip-geography': 'geography' };
        if (fields[event.target.id]) { ui[fields[event.target.id]] = event.target.value; requestUpdate(event.target.id); }
        else if (event.target.id === 'trip-pending-only') { ui.pendingOnly = event.target.checked; requestUpdate(event.target.id); }
      });
    }
    const selected = current();
    const mapNode = node.querySelector('#trip-preview-map');
    if (!mapNode && preview && !preview.getContainer().isConnected) teardown();
    if (mapNode && selected.variant) mountPreview(mapNode, selected, snapshot());
  }
  // A route outline is public source data; a deep link carries only its stable ID.
  try {
    const requested = new URLSearchParams(global.location.search).get('trip');
    const family = families().find(entry => entry.variants.some(variant => variant.id === requested && supportedVariant(variant)));
    if (family) {
      const variant = family.variants.find(entry => entry.id === requested);
      ui.familyId = family.id; ui.variantId = variant.id; ui.days = Number(variant.days);
    }
  } catch (_) { /* An invalid optional link keeps the normal first trip. */ }
  global.LifeTripExplorer = {
    configure: callbacks => { hooks = { ...hooks, ...(callbacks || {}) }; return global.LifeTripExplorer; },
    render, mount, recommendArea,
    selectVariant: id => selectVariant(id, false)
  };
})(window);
