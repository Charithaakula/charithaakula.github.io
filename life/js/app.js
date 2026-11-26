(function () {
  'use strict';

  const store = window.LifeStore;
  const root = document.getElementById('app');
  if (!store || !root) return;
  const seeds = window.LIFE_SEEDS || {};
  const cuisines = window.LIFE_CUISINES || [];
  const PAGE_SIZE = 48;
  const TABS = ['board', 'explore', 'priorities', 'map', 'food', 'visited', 'plans', 'coverage', 'csv'];
  const categories = ['Nature & wildlife', 'Places & heritage', 'Journeys & transport', 'Adventure & movement', 'Food & drink', 'Arts & living culture', 'Learning & making', 'Everyday & local', 'Connection & contribution', 'Personal life & reflection'];
  const boardIcons = { leaf: '❧', globe: '◎', bowl: '◡', mountain: '△', spark: '✧', moon: '☾', heart: '♡', book: '▤', sun: '☼' };
  const statuses = { curious: 'Curious', want: 'Want to do', done: 'Done', revisit: 'Want to revisit', pass: 'Not for me' };
  const foodStatuses = { untracked: 'Untracked', new: 'New to me', tried: 'Tried', favorite: 'Favorite' };
  const ui = {
    tab: TABS.includes(location.hash.slice(1)) ? location.hash.slice(1) : 'board',
    query: '', category: '', scope: '', status: '', effort: '', early: false, boardId: '', page: 1, sort: 'personal',
    foodQuery: '', foodStatus: '', foodRegion: '', foodPage: 1, foodSort: 'priority', foodTop: true, visitQuery: '', visitPage: 1
  };
  let toastTimer;
  let dialogReturnFocus;
  const $ = (selector, parent) => (parent || document).querySelector(selector);
  const all = (selector, parent) => Array.from((parent || document).querySelectorAll(selector));
  const escape = value => String(value == null ? '' : value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
  const safeUrl = value => {
    try { const url = new URL(String(value || '')); return ['https:', 'http:'].includes(url.protocol) ? url.href : ''; } catch (_) { return ''; }
  };
  const today = () => { const d = new Date(); return [d.getFullYear(), String(d.getMonth() + 1).padStart(2, '0'), String(d.getDate()).padStart(2, '0')].join('-'); };
  const itemById = id => store.getItems().find(item => item.id === id);
  const state = () => store.getState();
  function collectionMatches(boardId, item) {
    const local = /san francisco|san jose|south bay|bay area|oakland|berkeley|palo alto|half moon bay|santa cruz|fremont|tiburon|sausalito|tomales|point reyes/i.test(item.location || '');
    if (boardId === 'board-little-wonders') return item.category === 'Everyday & local' || local;
    if (boardId === 'board-postcards') return item.scope !== 'Anywhere';
    if (boardId === 'board-taste') return item.category === 'Food & drink';
    if (boardId === 'board-brave') return item.category === 'Adventure & movement' || Boolean(item.earlyReason);
    if (boardId === 'board-making') {
      const handsOn = /\b(make|build|create|write|paint|draw|craft|knit|sew|weave|carve|design|compose|cook|bake|stitch|cooking|baking|fermentation)\b/i.test(item.title);
      const craft = /cheriyal|ajrakh|batik|hanji|sashiko|backstrap|weav|woodblock|block.print|ceramic|pottery|lampwork|embroidery|bookbind|paper.marbl/i.test(item.title + ' ' + item.theme);
      return item.category === 'Learning & making' || (['Food & drink', 'Arts & living culture'].includes(item.category) && (handsOn || craft));
    }
    if (boardId === 'board-soft') return ['Everyday & local', 'Connection & contribution', 'Personal life & reflection'].includes(item.category);
    if (boardId === 'board-active-chapter') return item.tracker.early || Boolean(item.earlyReason) || item.effort === 'demanding';
    return false;
  }
  const boards = library => {
    const items = library || store.getItems();
    return (seeds.boards || []).map(board => ({
      ...board,
      previewIds: board.itemIds || board.ids || [],
      itemIds: Array.from(new Set((board.itemIds || board.ids || []).concat(items.filter(item => collectionMatches(board.id, item)).map(item => item.id)))),
      curated: true
    })).concat((state().boards || []).map(board => ({ ...board, curated: false })));
  };
  const options = (values, selected, first) => (first ? '<option value="">' + escape(first) + '</option>' : '') + values.map(value => {
    const val = Array.isArray(value) ? value[0] : value;
    const label = Array.isArray(value) ? value[1] : value;
    return '<option value="' + escape(val) + '"' + (String(selected) === String(val) ? ' selected' : '') + '>' + escape(label) + '</option>';
  }).join('');
  const button = (label, action, id, classes) => '<button type="button" class="button ' + (classes || 'small ghost') + '" data-action="' + escape(action) + '"' + (id ? ' data-id="' + escape(id) + '"' : '') + '>' + escape(label) + '</button>';
  const field = (label, input, help) => '<div class="form-field">' + label + input + (help ? '<p class="form-help">' + escape(help) + '</p>' : '') + '</div>';
  const checked = value => value ? ' checked' : '';
  const tag = (label, extra) => '<span class="chip ' + (extra || '') + '">' + escape(label) + '</span>';
  function libraryPhoto(entity, type) {
    const library = window.LifePhotos;
    if (!library) return null;
    try {
      const photo = type === 'cuisine' ? (library.forCuisine(entity) || library.fallback('Food & drink')) : type === 'destination' ? library.forDestination(entity) : library.forItem(entity);
      return photo && photo.path && /^images\/photos\/[A-Za-z0-9._/-]+$/.test(photo.path) ? photo : null;
    } catch (_) { return null; }
  }
  function photoCredit(item, type) {
    if (type === 'item' && safeUrl(item.tracker && item.tracker.photo || item.image)) return '';
    const photo = libraryPhoto(item, type);
    return photo ? '<button type="button" class="card-photo-credit" data-action="photo-credits">Reference photo · credits</button>' : '';
  }
  function photoCredits() {
    const data = window.LIFE_PHOTOS || {};
    const photos = Array.isArray(data) ? data : data.photos || [];
    openDialog('<span class="eyebrow">Reference photographs</span><h2>Photos and their creators.</h2><p>These are credited reference photographs, not a record of your visits or meals. They may be resized or cropped in cards. Your own photo links take precedence.</p><div class="photo-credit-grid">' + photos.map(photo => '<article><img src="' + escape(photo.path) + '" alt="' + escape(photo.alt || photo.title) + '" loading="lazy"><h3>' + escape(photo.title) + '</h3><p>' + escape(photo.author || 'Creator credited at source') + '</p><p>' + escape(photo.license || '') + '</p><p>' + escape(photo.derivative || '') + '</p>' + (safeUrl(photo.source || photo.sourceUrl) ? '<a href="' + escape(safeUrl(photo.source || photo.sourceUrl)) + '" target="_blank" rel="noopener noreferrer">Original source ↗</a>' : '') + (safeUrl(photo.licenseUrl || photo.licenseURL) ? ' · <a href="' + escape(safeUrl(photo.licenseUrl || photo.licenseURL)) + '" target="_blank" rel="noopener noreferrer">License ↗</a>' : '') + '</article>').join('') + '</div>');
  }
  function artFor(item) {
    const image = safeUrl(item.tracker && item.tracker.photo) || safeUrl(item.image);
    if (image) return image;
    const photograph = libraryPhoto(item, 'item');
    if (photograph) return photograph.path;
    const text = [item.category, item.theme, item.location, item.title].join(' ').toLowerCase();
    if (/food|cuisine|cooking|caf[eé]|drink/.test(text)) return 'images/table.svg';
    if (/journey|transport|train|road trip/.test(text)) return 'images/journey.svg';
    if (/coast|ocean|beach|island|marine|water|sail|snorkel/.test(text)) return 'images/coast.svg';
    if (/mountain|trek|hike|adventure|movement/.test(text)) return 'images/mountains.svg';
    if (/nature|wildlife|forest|garden/.test(text)) return 'images/forest.svg';
    return 'images/city.svg';
  }
  function toast(message) {
    const node = document.getElementById('toast');
    if (!node) return;
    clearTimeout(toastTimer);
    node.textContent = message;
    node.hidden = false;
    node.classList.add('visible');
    toastTimer = setTimeout(() => { node.classList.remove('visible'); node.hidden = true; }, 4200);
  }
  function attempt(fn) {
    try { return fn(); } catch (error) { toast(error.message || 'That change could not be saved.'); return null; }
  }
  function storageNotice() {
    return store.storageWarning ? '<p class="storage-notice" role="status">' + escape(store.storageWarning) + ' Export your progress to keep a backup.</p>' : '';
  }
  function empty(title, body, action) {
    return '<div class="empty-state"><span class="eyebrow">Room for a little wonder</span><h3>' + escape(title) + '</h3><p>' + escape(body) + '</p>' + (action || '') + '</div>';
  }
  function heading(kicker, title, description, actions) {
    return '<div class="view-heading"><div><span class="eyebrow">' + escape(kicker) + '</span><h2>' + escape(title) + '</h2><p class="muted">' + escape(description) + '</p></div>' + (actions ? '<div class="inline-actions">' + actions + '</div>' : '') + '</div>';
  }
  function progress(done, total, label) {
    const percent = total ? Math.round(done / total * 100) : 0;
    return '<div class="stat-line"><span>' + escape(label) + '</span><strong>' + done + ' / ' + total + '</strong></div><div class="progress-track" role="progressbar" aria-label="' + escape(label) + '" aria-valuemin="0" aria-valuemax="' + total + '" aria-valuenow="' + done + '"><span class="progress-fill" style="width:' + percent + '%"></span></div>';
  }
  function card(item) {
    const tracker = item.tracker;
    const label = statuses[tracker.status] || 'Curious';
    return '<article class="experience-card"><button type="button" class="card-art" data-action="detail" data-id="' + escape(item.id) + '" aria-label="Open ' + escape(item.title) + '"><img src="' + escape(artFor(item)) + '" alt="" loading="lazy" width="480" height="320"></button><div class="card-body"><div class="card-meta"><span>' + escape(item.category) + '</span>' + (tracker.board ? '<span aria-label="Pinned">♡ Pinned</span>' : '') + '</div><h3 class="card-title"><button type="button" data-action="detail" data-id="' + escape(item.id) + '">' + escape(item.title) + '</button></h3><p class="muted">' + escape(item.location || item.country || 'Anywhere you feel at home') + '</p>' + photoCredit(item, 'item') + '<div class="card-tags">' + tag(label, 'status-label') + (tracker.early ? tag('Earlier on my list') : '') + (item.effort === 'demanding' ? tag('More effort') : '') + '</div><div class="card-actions">' + button(tracker.board ? 'Unpin ♡' : 'Pin ♡', 'pin', item.id) + button('Explore idea ↗', 'detail', item.id) + '</div></div></article>';
  }
  function paginate(total, page, kind) {
    const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));
    if (pages <= 1) return '';
    return '<nav class="pagination" aria-label="' + escape(kind) + ' pages"><button type="button" class="button ghost" data-action="page" data-kind="' + kind + '" data-page="' + (page - 1) + '"' + (page <= 1 ? ' disabled' : '') + '>← Previous</button><span>Page ' + page + ' of ' + pages + '</span><button type="button" class="button ghost" data-action="page" data-kind="' + kind + '" data-page="' + (page + 1) + '"' + (page >= pages ? ' disabled' : '') + '>Next →</button></nav>';
  }
  function sortItems(items) {
    const settings = state().settings;
    return items.slice().sort((a, b) => {
      if (ui.sort === 'name') return a.title.localeCompare(b.title);
      if (ui.sort === 'place') return (a.location || a.country).localeCompare(b.location || b.country) || a.title.localeCompare(b.title);
      if (ui.sort === 'category') return a.category.localeCompare(b.category) || a.title.localeCompare(b.title);
      if (ui.sort === 'interest') return b.tracker.interest - a.tracker.interest || a.title.localeCompare(b.title);
      if (settings.usFirst && a.scope !== b.scope) {
        if (a.scope === 'USA') return -1;
        if (b.scope === 'USA') return 1;
      }
      if (settings.earlierEffort && a.tracker.early !== b.tracker.early) return a.tracker.early ? -1 : 1;
      if (a.tracker.interest !== b.tracker.interest) return b.tracker.interest - a.tracker.interest;
      return a.title.localeCompare(b.title);
    });
  }
  function renderBoards() {
    const items = store.getItems();
    const pinned = sortItems(items.filter(item => item.tracker.board));
    const boardCards = boards(items).map(board => {
      const selected = board.itemIds.map(id => items.find(item => item.id === id)).filter(Boolean);
      const preview = (board.previewIds || board.itemIds).map(id => items.find(item => item.id === id)).filter(Boolean);
      const done = selected.filter(item => ['done', 'revisit'].includes(item.tracker.status)).length;
      return '<article class="board-card" data-palette="' + escape(board.palette || 'sage') + '"><div class="board-card-heading"><span class="eyebrow">' + escape(board.curated ? 'A preview of ' + selected.length + ' ideas' : 'Made by you') + '</span><span aria-hidden="true">' + escape(boardIcons[board.icon] || (board.icon && !/^[a-z]+$/i.test(board.icon) ? board.icon : '✧')) + '</span></div><h3>' + escape(board.title) + '</h3><p class="muted">' + escape(board.description || 'A few ideas that belong together.') + '</p><div class="board-items">' + preview.slice(0, 4).map(item => '<button type="button" class="board-thumb" data-action="detail" data-id="' + escape(item.id) + '" aria-label="Open ' + escape(item.title) + '"><img src="' + escape(artFor(item)) + '" alt="" loading="lazy"><span>' + escape(item.title) + '</span></button>').join('') + '</div>' + (selected.length ? progress(done, selected.length, 'Experiences lived') : '<p class="muted">Add ideas from their detail cards in Explore.</p>') + '<div class="card-actions">' + button(board.curated ? 'Explore all ' + selected.length + ' ideas →' : 'Open collection →', 'open-board', board.id) + (board.id === 'board-taste' ? button('Track cuisines →', 'go-food') : '') + (!board.curated ? button('Edit', 'edit-board', board.id) : '') + '</div></article>';
    }).join('');
    return heading('The possibility board', 'Life, fully.', 'Places to go, little rituals to keep, and things to try just because they make you feel alive.', button('Make a board +', 'new-board', '', 'primary')) + '<div class="board-grid">' + boardCards + '</div><div class="section-divider"></div>' + heading('Your own little collection', 'Pinned for someday', 'Keep the ideas that catch your eye here. A pin is a possibility, not a promise.', button('Find more ideas →', 'go-explore')) + (pinned.length ? '<div class="card-grid">' + pinned.slice(0, PAGE_SIZE).map(card).join('') + '</div>' + (pinned.length > PAGE_SIZE ? '<p class="muted">Showing the first 48 pins.</p>' + button('See every pin →', 'show-pins') : '') : empty('Your next favorite idea belongs here.', 'Browse the atlas and tap Pin on anything that sparks your curiosity.', button('Wander the atlas →', 'go-explore', '', 'primary')));
  }
  function filteredItems() {
    const query = ui.query.toLocaleLowerCase().trim();
    const board = boards().find(entry => entry.id === ui.boardId);
    return sortItems(store.getItems().filter(item => {
      const searchable = [item.title, item.location, item.country, item.region, item.category, item.theme, item.why, ...(item.tags || [])].join(' ').toLocaleLowerCase();
      return (!query || searchable.includes(query)) && (!ui.category || item.category === ui.category) && (!ui.scope || item.scope === ui.scope) && (!ui.status || (ui.status === 'pinned' ? item.tracker.board : item.tracker.status === ui.status)) && (!ui.effort || item.effort === ui.effort) && (!ui.early || item.tracker.early) && (!board || board.itemIds.includes(item.id));
    }));
  }
  function renderExplore() {
    const items = filteredItems();
    const board = boards().find(entry => entry.id === ui.boardId);
    ui.page = Math.min(ui.page, Math.max(1, Math.ceil(items.length / PAGE_SIZE)));
    const from = (ui.page - 1) * PAGE_SIZE;
    return heading('The living atlas', board ? board.title : 'A world of possibilities.', board ? board.description || 'Ideas collected together.' : 'Start with a place, a feeling, a food, or a tiny adventure. There is no need to do everything.', button('Add your own idea +', 'new-item', '', 'primary')) + '<form class="toolbar" id="explore-filters" role="search"><div class="form-field"><label for="explore-query">Find an idea</label><input id="explore-query" class="search-input" type="search" placeholder="A place, a food, a skill, a feeling…" value="' + escape(ui.query) + '"></div><div class="form-field"><label for="explore-category">Category</label><select id="explore-category" class="filter-select">' + options(categories, ui.category, 'All categories') + '</select></div><div class="form-field"><label for="explore-scope">Where</label><select id="explore-scope" class="filter-select">' + options([['USA', 'United States'], ['World', 'Around the world'], ['Anywhere', 'Anywhere / everyday life']], ui.scope, 'Everywhere') + '</select></div><div class="form-field"><label for="explore-status">My list</label><select id="explore-status" class="filter-select">' + options(Object.entries(statuses).concat([['pinned', 'My pinned ideas']]), ui.status, 'Any status') + '</select></div><div class="form-field"><label for="explore-effort">Experience effort</label><select id="explore-effort" class="filter-select">' + options([['gentle', 'Gentle'], ['moderate', 'Moderate'], ['demanding', 'More demanding'], ['unknown', 'Not assessed yet']], ui.effort, 'All effort levels') + '</select></div><div class="form-field"><label for="explore-sort">Sort by</label><select id="explore-sort" class="filter-select">' + options([['personal', 'My preferences'], ['name', 'Experience name'], ['place', 'Place name'], ['category', 'Category'], ['interest', 'My interest']], ui.sort) + '</select></div><label class="checkbox-field"><input id="explore-early" type="checkbox"' + checked(ui.early) + '> Earlier on my list</label><button type="button" class="button ghost small" data-action="reset-filters">Reset filters</button></form><p class="form-help">“Earlier on my list” is your editable preference. Effort depends on the activity, route, support and your circumstances; places do not have an age deadline.</p><div class="stat-line"><p class="muted" aria-live="polite">' + (items.length ? 'Showing ' + (from + 1) + '–' + Math.min(from + PAGE_SIZE, items.length) + ' of ' + items.length.toLocaleString() + ' ideas' : 'No matching ideas') + '</p>' + (board ? button('All collections / clear board', 'clear-board') : '') + '</div>' + (items.length ? '<div class="card-grid">' + items.slice(from, from + PAGE_SIZE).map(card).join('') + '</div>' + paginate(items.length, ui.page, 'explore') : empty('A different path might be waiting.', 'Try a broader search, clear a filter, or add an idea you have not found here yet.', button('Clear filters', 'reset-filters', '', 'primary')));
  }
  function cuisineGuide(cuisine) { return (window.LIFE_CUISINE_GUIDES || {})[cuisine.id] || {}; }
  function cuisinePriority(cuisine, current) {
    const guide = cuisineGuide(cuisine); const track = current.cuisines[cuisine.id] || {};
    if (track.interest > 0) return track.interest * 20;
    let value = Math.max(15, 100 - (guide.editorialRank || 80));
    if (['tried','favorite'].includes(track.status)) value -= 20 + Math.min(track.count || 0, 15);
    if (current.priorities.localFirst && (guide.bayArea || []).length) value += 3;
    if ((guide.destinationHubIds || []).some(id => current.priorities.destinationIds.includes(id))) value += 5;
    return Math.max(0, Math.min(99, value));
  }
  function cuisinePhoto(cuisine) {
    const photo = libraryPhoto(cuisine, 'cuisine');
    return photo ? photo.path : 'images/table.svg';
  }
  function cuisineGuideHtml(cuisine) {
    const guide = cuisineGuide(cuisine);
    if (!guide.startWith) return '';
    const photo = libraryPhoto(cuisine, 'cuisine');
    return '<section class="cuisine-guide">' + (photo ? '<img class="cuisine-guide-photo" src="' + escape(photo.path) + '" alt="' + escape(photo.alt) + '"><p class="photo-caption">Reference photograph · ' + escape(photo.title) + '</p>' + button('Photo credits','photo-credits') : '') + '<h3>Start with a few dishes.</h3><p>' + escape(guide.whyStartHere) + '</p><ol class="cuisine-start-list">' + guide.startWith.map(dish => '<li>' + escape(dish) + '</li>').join('') + '</ol><h3>Try it near home.</h3><p class="form-help">SF and South Bay come first when a strong local option can meet the goal. These are curated venue leads, not a universal restaurant ranking.</p><div class="cuisine-venue-grid">' + (guide.bayArea || []).map(venue => '<article class="cuisine-venue-card"><h4>' + escape(venue.name) + '</h4><p>' + escape(venue.city) + '</p>' + ((venue.dishes || []).length ? '<p>Menu examples: ' + escape(venue.dishes.join(', ')) + '</p>' : '') + '<p class="form-help">' + escape(venue.verificationNote || venue.verification || '') + (venue.verifiedDate ? ' · checked ' + escape(venue.verifiedDate) : '') + '</p>' + (safeUrl(venue.url) ? '<a href="' + escape(safeUrl(venue.url)) + '" target="_blank" rel="noopener noreferrer">Official venue ↗</a>' : '') + (safeUrl(venue.menuUrl) ? ' · <a href="' + escape(safeUrl(venue.menuUrl)) + '" target="_blank" rel="noopener noreferrer">Menu ↗</a>' : '') + '</article>').join('') + '</div>' + (!(guide.bayArea || []).length ? '<p class="form-help">Specific local venues are not yet verified for this family. The search below is a discovery lead.</p>' : '') + (safeUrl(guide.searchUrl) ? '<a href="' + escape(safeUrl(guide.searchUrl)) + '" target="_blank" rel="noopener noreferrer">Discover more SF / South Bay options ↗</a>' : '') + '<h3>Combine it with a destination.</h3><p>' + escape(guide.bundleHint) + '</p><div class="cuisine-hubs">' + (guide.globalHubs || []).map(hub => '<div>' + (hub.hubId && (window.LIFE_DISCOVERY_PRIORITIES || {}).destinations?.some(d=>d.id===hub.hubId) ? button(hub.name + ', ' + hub.country,'priority-destination',hub.hubId) : safeUrl(hub.url) ? '<a class="button small ghost" href="' + escape(safeUrl(hub.url)) + '" target="_blank" rel="noopener noreferrer">' + escape(hub.name + ', ' + hub.country) + ' ↗</a>' : escape(hub.name + ', ' + hub.country)) + '</div>').join('') + '</div><p class="form-help">Origin hubs are regional context, not a requirement to travel for a cuisine. Local searches and origin venues are separate from the dated official-menu checks above.</p></section>';
  }
  function renderFood() {
    const current = state();
    const personal = current.cuisines;
    const query = ui.foodQuery.toLowerCase().trim();
    const visible = cuisines.filter(cuisine => {
      const track = personal[cuisine.id] || { status: 'untracked', count: 0 };
      return (!query || [cuisine.name, cuisine.region, cuisine.country, cuisine.description].join(' ').toLowerCase().includes(query)) && (!ui.foodStatus || track.status === ui.foodStatus) && (!ui.foodRegion || cuisine.region === ui.foodRegion);
    }).sort((a,b) => ui.foodSort === 'name' ? a.name.localeCompare(b.name) : ui.foodSort === 'least' ? ((personal[a.id] || {}).count || 0) - ((personal[b.id] || {}).count || 0) || a.name.localeCompare(b.name) : cuisinePriority(b,current) - cuisinePriority(a,current) || a.name.localeCompare(b.name));
    const selectedCuisines = ui.foodTop ? visible.slice(0,10) : visible;
    ui.foodPage = Math.min(ui.foodPage, Math.max(1, Math.ceil(selectedCuisines.length / PAGE_SIZE)));
    const tried = cuisines.filter(cuisine => ['tried', 'favorite'].includes((personal[cuisine.id] || {}).status)).length;
    const favorites = cuisines.filter(cuisine => (personal[cuisine.id] || {}).status === 'favorite').length;
    const totalTastes = cuisines.reduce((sum, cuisine) => sum + ((personal[cuisine.id] || {}).count || 0), 0);
    return heading('Around the table', 'A taste of everywhere.', 'Cuisine is a living tradition, not a box to finish. Keep track of the ones you know, the ones you love, and the ones still new to you.') + '<div class="food-summary"><span class="chip">' + tried + ' cuisine families tried</span><span class="chip">' + favorites + ' favorites</span><span class="chip">' + totalTastes + ' logged tastes</span></div><p class="form-help">Untracked means you have not recorded a preference. “New to me” is something you choose; nothing here assumes what you have eaten.</p><form class="toolbar" id="food-filters" role="search"><div class="form-field"><label for="food-query">Find a cuisine</label><input id="food-query" class="search-input" type="search" placeholder="A cuisine, country or region…" value="' + escape(ui.foodQuery) + '"></div><div class="form-field"><label for="food-status">My food discoveries</label><select id="food-status" class="filter-select">' + options(Object.entries(foodStatuses), ui.foodStatus, 'Every cuisine') + '</select></div><div class="form-field"><label for="food-region">Region</label><select id="food-region" class="filter-select">' + options(Array.from(new Set(cuisines.map(cuisine => cuisine.region))).sort(), ui.foodRegion, 'Every region') + '</select></div>' + '<div class="form-field"><label for="food-sort">Order</label><select id="food-sort">' + options([['priority','Discovery priority'],['name','Cuisine name'],['least','Fewest logged tastes']],ui.foodSort) + '</select></div><label class="checkbox-field"><input id="food-top" type="checkbox"' + checked(ui.foodTop) + '> Top ten in this view</label>' + button('Reset', 'reset-food') + '</form><p class="muted">' + selectedCuisines.length + ' shown from ' + visible.length + ' matching cuisine families</p>' + (visible.length ? '<div class="cuisine-grid">' + selectedCuisines.slice((ui.foodPage - 1) * PAGE_SIZE, ui.foodPage * PAGE_SIZE).map(cuisine => {
      const track = personal[cuisine.id] || { status: 'untracked', count: 0 };
      return '<article class="cuisine-card"><button type="button" class="card-art" data-action="cuisine" data-id="' + escape(cuisine.id) + '" aria-label="Explore ' + escape(cuisine.name) + '"><img src="' + escape(safeUrl(cuisine.image) || cuisinePhoto(cuisine)) + '" alt="" loading="lazy"></button><div class="card-body"><span class="eyebrow">' + escape(cuisine.region) + '</span><h3 class="card-title">' + escape(cuisine.name) + '</h3><p class="muted">' + escape(cuisine.description) + '</p>' + photoCredit(cuisine, 'cuisine') + '<p class="form-help">' + Math.round(cuisinePriority(cuisine,current)) + ' discovery priority points · ' + ((cuisineGuide(cuisine).bayArea || []).length ? 'Local venue leads available' : 'Local search + destination context') + '</p><div class="card-tags">' + tag(foodStatuses[track.status] || 'Untracked') + tag(track.count + (track.count === 1 ? ' taste logged' : ' tastes logged')) + '</div><div class="card-actions">' + button('Explore cuisine / where to try', 'cuisine', cuisine.id) + button('Log a taste +', 'log-cuisine', cuisine.id) + '</div></div></article>';
    }).join('') + '</div>' + paginate(selectedCuisines.length, ui.foodPage, 'food') : empty('There is more on the menu.', 'Clear a filter or try another cuisine or region.', button('Reset food filters', 'reset-food', '', 'primary')));
  }
  function renderVisited() {
    const visits = state().visits;
    const done = store.getItems().filter(item => ['done', 'revisit'].includes(item.tracker.status)).filter(item => !ui.visitQuery || [item.title, item.location].join(' ').toLowerCase().includes(ui.visitQuery.toLowerCase()));
    ui.visitPage = Math.min(ui.visitPage, Math.max(1, Math.ceil(done.length / PAGE_SIZE)));
    return heading('The memory shelf', 'Places that became part of you.', 'Your reported places begin this journal. Visiting a city or country does not mark every experience there complete.', button('Add a memory +', 'new-visit', '', 'primary')) + '<div class="journal-grid">' + visits.map(visit => '<article class="visit-card">' + (safeUrl(visit.photo) ? '<img class="visit-photo" src="' + escape(safeUrl(visit.photo)) + '" alt="' + escape(visit.label) + '" loading="lazy">' : '') + '<span class="eyebrow">' + escape(visit.kind || 'Place') + (visit.date ? ' · ' + escape(visit.date) : '') + '</span><h3>' + escape(visit.label) + '</h3><p class="muted">' + escape(visit.location || '') + '</p><p class="visit-note">' + escape(visit.note || 'A place in your story. Add a note when you feel like it.') + '</p>' + (visit.relatedIds && visit.relatedIds.length ? '<div class="detail-related">' + visit.relatedIds.map(id => { const item = itemById(id); return item ? button(item.title, 'detail', id) : ''; }).join('') + '</div>' : '') + '<div class="card-actions">' + button('Edit memory', 'edit-visit', visit.id) + '</div></article>').join('') + '</div>' + (!visits.length ? empty('Begin with a place you remember.', 'A hometown, a neighborhood, a national park, or a trip that mattered.', button('Add a memory +', 'new-visit', '', 'primary')) : '') + '<div class="section-divider"></div>' + heading('Little moments, lived', 'Experiences you have done', 'Only experiences marked Done or Want to revisit appear here. Your place journal and your experience progress stay distinct.') + '<div class="toolbar"><div class="form-field"><label for="visited-query">Find a lived experience</label><input type="search" id="visited-query" class="search-input" value="' + escape(ui.visitQuery) + '" placeholder="A memory, place or experience…"></div></div>' + (done.length ? '<div class="card-grid">' + done.slice((ui.visitPage - 1) * PAGE_SIZE, ui.visitPage * PAGE_SIZE).map(card).join('') + '</div>' + paginate(done.length, ui.visitPage, 'visited') : empty('Every lived moment counts.', 'Mark an experience Done in its detail card, and add a date, photo link or memory if you like.', button('Find an experience →', 'go-explore', '', 'primary')));
  }
  function renderPlans() {
    const plans = state().plans;
    const templates = seeds.planTemplates || [];
    return '<p class="form-help"><a href="#coverage">See the optimized 5 / 9-day coverage plan →</a></p>' + heading('Start from your time, then choose a place', 'Trips that fit your time.', 'Use Coverage plan for an optimized five-/nine-day portfolio, or browse the original four-/ten-day starters below.', button('New blank draft +', 'new-plan', '', 'primary')) + '<p class="form-help">Solo by default, with guided experiences welcome and a partner optional. These are editable drafts; no dates, bookings or group trips are assumed.</p>' + (plans.length ? '<div class="plan-grid">' + plans.map(plan => '<article class="plan-card"><span class="eyebrow">' + escape(plan.status || 'idea') + ' · ' + escape(plan.scope || 'Anywhere') + '</span><h3>' + escape(plan.title) + '</h3><p class="muted">' + escape(plan.description || 'Let this become a plan at your own pace.') + '</p><div class="card-tags">' + tag(plan.duration || 'Time still open') + tag(plan.companions === 'partner-optional' ? 'Partner optional' : 'Solo') + tag((plan.itemIds || []).length + ' ideas') + '</div>' + (plan.startDate || plan.endDate ? '<p class="muted">' + escape(plan.startDate || 'Start open') + ' → ' + escape(plan.endDate || 'End open') + '</p>' : '') + '<div class="detail-related">' + (plan.itemIds || []).slice(0, 3).map(id => { const item = itemById(id); return item ? button(item.title, 'detail', id) : ''; }).join('') + '</div><div class="card-actions">' + button('Open draft →', 'edit-plan', plan.id) + (plan.templateId ? button('Starter route', 'shortlist-view', plan.templateId) : '') + button('Find more ideas', 'plan-explore', plan.id) + '</div></article>').join('') + '</div>' : '<p class="form-help">No saved drafts yet. Choose a route below or collect ideas on the map, then make the draft yours.</p>') + renderTripExplorer() + '<div class="section-divider"></div>' + heading('Gentle starting points', 'A few shapes a trip could take.', 'Use the trip map to choose a base and collect nearby experiences, or start with a template below.', button('Build a trip on the map →', 'go-map')) + '<div class="template-grid">' + templates.map(template => '<article class="template-card"><span class="eyebrow">' + escape(template.scope || template.type || 'A starting point') + '</span><h3>' + escape(template.title) + '</h3><p class="muted">' + escape(template.description) + '</p><div class="card-tags">' + tag(template.duration || 'Flexible') + '</div>' + button('Start an editable draft +', 'template-plan', template.id) + '</article>').join('') + '</div>';
  }
  function renderTripExplorer() {
    return window.LifeTripExplorer ? window.LifeTripExplorer.render() : renderTripShortlists();
  }
  function renderTripShortlists() {
    const routes = window.LIFE_TRIP_SHORTLISTS || [];
    if (!routes.length) return '';
    return '<div class="section-divider"></div>' + heading('Ten days, thoughtfully grouped', 'Ten 10-day trip starters.', 'US-first routes with arrival and departure buffers, room to rest, and optional active experiences. Choose a season and interests before making one yours.') + '<div class="trip-shortlist-grid">' + routes.map(route => '<article class="trip-shortlist-card"><span class="eyebrow">' + escape(route.theme) + '</span><h3>' + escape(route.title) + '</h3><p>' + escape(route.why) + '</p><div class="card-tags">' + tag('10 days') + tag('Solo / partner optional') + tag(route.itemIds.length + ' ideas') + '</div><p>' + escape(route.season) + '</p><div class="card-actions">' + button('View day-by-day route →', 'shortlist-view', route.id) + button('Make this my draft +', 'shortlist-plan', route.id) + '</div></article>').join('') + '</div>';
  }
  function shortlistView(id) {
    const route = (window.LIFE_TRIP_SHORTLISTS || []).find(route => route.id === id);
    if (!route) { if (window.LifeTripExplorer) { window.LifeTripExplorer.selectVariant(id); setTab('plans', true); } return; }
    openDialog('<span class="eyebrow">A 10-day starter route</span><h2>' + escape(route.title) + '</h2><p>' + escape(route.why) + '</p><p class="form-help">' + escape(route.season) + '</p><div class="trip-outline">' + route.outline.map(day => '<article><h4>Day ' + escape(day.days) + ' · ' + escape(day.base) + '</h4><p>' + escape(day.focus) + '</p><div class="detail-related">' + day.itemIds.map(id => { const item = itemById(id); return item ? button(item.title, 'detail', id) : ''; }).join('') + '</div></article>').join('') + '</div><p class="form-help">' + escape(route.routeNote) + '</p><div class="dialog-actions">' + button('Make this my draft +', 'shortlist-plan', id, 'primary') + button('Explore its map area →', 'shortlist-map', id) + '</div>');
  }
  function shortlistPlan(id) {
    const route = (window.LIFE_TRIP_SHORTLISTS || []).find(route => route.id === id);
    if (!route) return;
    const outline = route.outline.map(day => 'Day ' + day.days + ' · ' + day.base + '\n' + day.focus).join('\n\n');
    setTab('plans', true);
    planForm(undefined, undefined, route.itemIds, {title: route.title, description: route.why, duration: '10 days', scope: 'USA', companions: 'solo', notes: outline + '\n\n' + route.routeNote, templateId: route.id});
  }
  let heroPhotographsReady = false;
  function fillHeroPhotographs() {
    if (heroPhotographsReady || !window.LifePhotos) return;
    const choices = [['.postcard-mountain img','yosemite'],['.postcard-table img','market-produce'],['.postcard-coast img','big-sur']];
    choices.forEach(([selector,id]) => { const image = document.querySelector(selector), photo = window.LifePhotos.get(id); if (image && photo) { image.src = photo.path; image.alt = photo.alt; } });
    heroPhotographsReady = true;
  }
  function updateHeader() {
    fillHeroPhotographs();
    const items = store.getItems();
    const current = state();
    const counts = { 'catalog-count': items.length.toLocaleString(), 'done-count': items.filter(item => ['done', 'revisit'].includes(item.tracker.status)).length, 'cuisine-count': cuisines.length };
    Object.entries(counts).forEach(([id, value]) => {
      const node = document.getElementById(id);
      if (node) {
        node.textContent = value;
        if (id === 'done-count' && node.parentElement && node.parentElement.lastChild !== node) node.parentElement.lastChild.textContent = Number(value) === 1 ? ' experience logged' : ' experiences logged';
      }
    });
    const theme = current.settings.theme || 'sage';
    document.documentElement.dataset.theme = theme;
    const select = document.getElementById('theme-select');
    if (select) select.value = theme;
  }
  function render() {
    updateHeader();
    const renderers = { coverage: () => window.LifeCoverageView ? window.LifeCoverageView.render() : empty('The coverage plan is loading.', 'Please reload in a moment.'), board: renderBoards, explore: renderExplore, food: renderFood, visited: renderVisited, plans: renderPlans, priorities: () => window.LifePriorityView ? window.LifePriorityView.render() : empty('The discovery shortlist is loading.', 'Please reload in a moment.'), map: () => window.LifeMapPlanner ? window.LifeMapPlanner.render() : empty('The trip map is loading.', 'Please reload in a moment.'), csv: () => window.LifeCsvList ? window.LifeCsvList.render() : empty('The full list is loading.', 'Please reload in a moment.') };
    root.innerHTML = storageNotice() + renderers[ui.tab]();
    all('[data-tab]', document.getElementById('tab-nav')).forEach(tab => {
      const active = tab.dataset.tab === ui.tab;
      tab.classList.toggle('active', active);
      tab.setAttribute('role', 'tab');
      tab.setAttribute('aria-selected', String(active));
      if (active) tab.setAttribute('aria-current', 'page'); else tab.removeAttribute('aria-current');
      tab.setAttribute('tabindex', active ? '0' : '-1');
    });
    root.setAttribute('role', 'tabpanel');
    root.setAttribute('aria-labelledby', 'tab-' + ui.tab);
    if (ui.tab === 'map' && window.LifeMapPlanner) window.LifeMapPlanner.mount();
    if (ui.tab === 'csv' && window.LifeCsvList) window.LifeCsvList.mount();
    if (ui.tab === 'plans' && window.LifeTripExplorer) window.LifeTripExplorer.mount();
    if (ui.tab === 'priorities' && window.LifePriorityView) window.LifePriorityView.mount();
    if (ui.tab === 'coverage' && window.LifeCoverageView) window.LifeCoverageView.mount();
  }
  function setTab(tab, scroll) {
    if (!TABS.includes(tab)) return;
    ui.tab = tab;
    if (location.hash !== '#' + tab) history.pushState(null, '', '#' + tab);
    render();
    if (scroll) root.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  function openDialog(html, settings) {
    const dialog = document.getElementById(settings ? 'settings-dialog' : 'item-dialog');
    const content = document.getElementById(settings ? 'settings-content' : 'dialog-content');
    dialogReturnFocus = document.activeElement;
    content.innerHTML = html;
    const headingNode = $('h2', content);
    if (headingNode) { headingNode.id = settings ? 'settings-dialog-heading' : 'item-dialog-heading'; dialog.setAttribute('aria-labelledby', headingNode.id); }
    if (!dialog.open) dialog.showModal();
    const focusTarget = $('input:not([type="checkbox"]),select,textarea,button', content);
    if (focusTarget) setTimeout(() => focusTarget.focus(), 0);
  }
  function closeDialog(settings) {
    const dialog = document.getElementById(settings ? 'settings-dialog' : 'item-dialog');
    if (dialog && dialog.open) dialog.close();
  }
  function itemDetail(id) {
    const item = itemById(id);
    if (!item) return toast('This idea is no longer in the atlas.');
    const t = item.tracker;
    const personalBoards = (state().boards || []);
    const custom = state().customItems.some(entry => entry.id === id);
    openDialog('<div class="detail-layout"><div class="detail-art"><img src="' + escape(artFor(item)) + '" alt=""></div><div class="detail-body"><span class="eyebrow">' + escape(item.category) + '</span><h2>' + escape(item.title) + '</h2><p class="muted">' + escape([item.location, item.country].filter(Boolean).join(' · ')) + '</p><p>' + escape(item.why || 'A possibility worth getting curious about.') + '</p><div class="card-tags">' + tag(item.scope === 'USA' ? 'United States' : item.scope === 'World' ? 'Around the world' : 'Anywhere') + tag(item.solo === 'guided' ? 'Guided experience; solo trip welcome' : item.solo === 'shared' ? 'Shared experience' : item.solo === 'partner-optional' ? 'Partner optional' : 'Solo friendly') + tag(item.effort === 'unknown' ? 'Effort not assessed' : item.effort + ' effort') + '</div>' + (item.earlyReason ? '<p class="form-help">Earlier-effort context: ' + escape(item.earlyReason) + ' This is editable context, not an age deadline.</p>' : '') + '<p class="form-help">' + escape(item.origin || 'Catalog idea') + '. Suggested additions are ideas to research; access and details may change.</p>' + (safeUrl(item.reference) ? '<p><a href="' + escape(safeUrl(item.reference)) + '" target="_blank" rel="noopener noreferrer">Reference / inspiration ↗</a></p>' : '') + '<form id="item-form" data-id="' + escape(id) + '"><div class="form-grid">' + field('<label for="item-status">Where it sits in my life</label>', '<select id="item-status" name="status">' + options(Object.entries(statuses), t.status) + '</select>') + field('<label for="item-interest">My interest</label>', '<select id="item-interest" name="interest">' + options([[0, 'Not rated'], [1, '1 · A little curious'], [2, '2 · Maybe'], [3, '3 · Interested'], [4, '4 · Really want this'], [5, '5 · Makes my heart light up']], t.interest) + '</select>') + '</div><div class="field-row"><label class="checkbox-field"><input name="board" type="checkbox"' + checked(t.board) + '> Pin to my someday board ♡</label><label class="checkbox-field"><input name="early" type="checkbox"' + checked(t.early) + '> Earlier on my list</label></div><p class="form-help">Choose “earlier” for experiences you personally want to prioritize while they fit your energy, circumstances and interests.</p>' + field('<label for="item-notes">My notes & memories</label>', '<textarea id="item-notes" name="notes" rows="3" maxlength="10000" placeholder="Why I want this, something to remember…">' + escape(t.notes) + '</textarea>', 'Saved in this browser. Included in your private JSON export.') + '<div class="form-grid">' + field('<label for="item-date">Date experienced, if known</label>', '<input id="item-date" name="completedOn" type="date" value="' + escape(t.completedOn) + '">') + field('<label for="item-photo">Photo link, optional</label>', '<input id="item-photo" name="photo" type="url" placeholder="https://…" value="' + escape(t.photo) + '">', 'Use an image URL you can access. Local photo uploads can come later.') + '</div>' + (personalBoards.length ? '<fieldset><legend>My collections</legend>' + personalBoards.map(board => '<label class="checkbox-field"><input type="checkbox" name="collection" value="' + escape(board.id) + '"' + checked((board.itemIds || []).includes(id)) + '> ' + escape(board.title) + '</label>').join('') + '</fieldset>' : '') + '<div class="dialog-actions"><button type="submit" class="button primary">Save my notes</button>' + button('Add to a plan +', 'item-plan', id) + (window.LifePriorities && window.LifePriorities.getFamily(id) ? button('Compare location variants', 'priority-family', id) : '') + (custom ? button('Edit this idea', 'edit-item', id) : '') + '</div></form>' + (item.notes ? '<details><summary>Catalog context</summary><p class="visit-note">' + escape(item.notes) + '</p></details>' : '') + '</div></div>');
  }
  function saveItem(form, close) {
    const data = new FormData(form);
    const photo = String(data.get('photo') || '').trim();
    if (photo && !safeUrl(photo)) throw new Error('Use an http or https photo URL.');
    const id = form.dataset.id;
    store.updateItem(id, { status: data.get('status'), interest: Number(data.get('interest')), notes: data.get('notes'), early: data.has('early'), board: data.has('board'), photo, completedOn: data.get('completedOn') });
    const selected = data.getAll('collection');
    (state().boards || []).forEach(board => {
      const ids = board.itemIds || [];
      const include = selected.includes(board.id);
      if (include !== ids.includes(id)) store.updateBoard(board.id, { itemIds: include ? ids.concat(id) : ids.filter(entry => entry !== id) });
    });
    if (close) closeDialog();
    toast('A little piece of your atlas, saved.');
  }
  function customItemForm(id) {
    const item = id ? itemById(id) : { title: '', category: 'Everyday & local', theme: '', location: '', country: '', region: '', scope: 'Anywhere', why: '', notes: '', tags: [], effort: 'unknown', solo: 'solo-friendly', earlyReason: '' };
    if (!item) return;
    openDialog('<span class="eyebrow">Your atlas can keep growing</span><h2>' + (id ? 'Edit your idea.' : 'Add a little possibility.') + '</h2><form id="custom-item-form"' + (id ? ' data-id="' + escape(id) + '"' : '') + '>' + field('<label for="custom-title">Experience or idea</label>', '<input id="custom-title" name="title" required maxlength="220" value="' + escape(item.title) + '" placeholder="Watch the sunrise from a place I love…">') + '<div class="form-grid">' + field('<label for="custom-category">Category</label>', '<select id="custom-category" name="category">' + options(categories, item.category) + '</select>') + field('<label for="custom-scope">Where could it happen?</label>', '<select id="custom-scope" name="scope">' + options([['USA', 'United States'], ['World', 'Around the world'], ['Anywhere', 'Anywhere / everyday life']], item.scope) + '</select>') + field('<label for="custom-location">Place / example</label>', '<input id="custom-location" name="location" maxlength="160" value="' + escape(item.location) + '">') + field('<label for="custom-country">Country, if relevant</label>', '<input id="custom-country" name="country" maxlength="130" value="' + escape(item.country) + '">') + field('<label for="custom-region">Region, if relevant</label>', '<input id="custom-region" name="region" maxlength="90" value="' + escape(item.region) + '">') + field('<label for="custom-theme">Theme</label>', '<input id="custom-theme" name="theme" maxlength="160" value="' + escape(item.theme) + '">') + '</div>' + field('<label for="custom-why">What draws you to it?</label>', '<textarea id="custom-why" name="why" rows="3" maxlength="1000">' + escape(item.why) + '</textarea>') + '<div class="form-grid">' + field('<label for="custom-effort">Effort, as you see it</label>', '<select id="custom-effort" name="effort">' + options([['unknown', 'Not assessed yet'], ['gentle', 'Gentle'], ['moderate', 'Moderate'], ['demanding', 'More demanding']], item.effort) + '</select>') + field('<label for="custom-solo">Company / support</label>', '<select id="custom-solo" name="solo">' + options([['solo-friendly', 'Solo friendly'], ['guided', 'Guided; solo trip welcome'], ['partner-optional', 'Partner optional'], ['shared', 'A shared experience']], item.solo) + '</select>') + '</div>' + field('<label for="custom-early">Earlier-effort context, optional</label>', '<input id="custom-early" name="earlyReason" maxlength="1000" value="' + escape(item.earlyReason) + '">') + field('<label for="custom-tags">Tags, separated by commas</label>', '<input id="custom-tags" name="tags" maxlength="1500" value="' + escape((item.tags || []).join(', ')) + '">') + '<div class="dialog-actions"><button type="submit" class="button primary">Save idea +</button></div></form>');
  }
  function boardForm(id) {
    const board = id ? (state().boards || []).find(entry => entry.id === id) : { title: '', description: '', itemIds: [], palette: 'sage' };
    if (!board) return;
    const allIdeas = store.getItems();
    const included = allIdeas.filter(item => (board.itemIds || []).includes(item.id));
    const candidates = included.concat(allIdeas.filter(item => item.tracker.board && !(board.itemIds || []).includes(item.id)).slice(0, 100));
    openDialog('<span class="eyebrow">Made by you</span><h2>' + (id ? 'A collection, reshaped.' : 'Make a someday board.') + '</h2><form id="board-form"' + (id ? ' data-id="' + escape(id) + '"' : '') + '>' + field('<label for="board-title">Board name</label>', '<input id="board-title" name="title" required maxlength="180" value="' + escape(board.title) + '" placeholder="Small joys near home…">') + field('<label for="board-description">The feeling behind it</label>', '<textarea id="board-description" name="description" rows="3" maxlength="2000">' + escape(board.description) + '</textarea>') + field('<label for="board-palette">A color mood</label>', '<select id="board-palette" name="palette">' + options(['sage', 'blush', 'ocean', 'night'], board.palette || 'sage') + '</select>') + (candidates.length ? '<fieldset><legend>Add from your pins</legend><div class="board-selection">' + candidates.map(item => '<label class="checkbox-field"><input type="checkbox" name="itemIds" value="' + escape(item.id) + '"' + checked((board.itemIds || []).includes(item.id)) + '> ' + escape(item.title) + '</label>').join('') + '</div></fieldset>' : '<p class="form-help">Create an empty board now, then add ideas from their detail cards in Explore.</p>') + '<div class="dialog-actions"><button type="submit" class="button primary">Save collection</button>' + (id ? button('Remove board', 'remove-board', id) : '') + '</div></form>');
  }
  function cuisineDialog(id, log) {
    const cuisine = cuisines.find(entry => entry.id === id);
    if (!cuisine) return;
    const track = state().cuisines[id] || { status: 'untracked', count: 0, lastTried: '', notes: '' };
    const related = (cuisine.foods || []).map(itemById).filter(Boolean);
    openDialog('<span class="eyebrow">' + escape(cuisine.region) + ' · ' + escape(cuisine.country) + '</span><h2>' + escape(cuisine.name) + '</h2><p class="muted">' + escape(cuisine.description) + '</p>' + cuisineGuideHtml(cuisine) + '<p>' + escape(track.count) + ' tastes logged' + (track.lastTried ? ' · Most recent: ' + escape(track.lastTried) : '') + '</p><form id="cuisine-form" data-id="' + escape(id) + '">' + field('<label for="cuisine-status">My relationship with this cuisine</label>', '<select id="cuisine-status" name="status">' + options(Object.entries(foodStatuses), track.status) + '</select>') + field('<label for="cuisine-interest">My interest in exploring this cuisine</label>', '<select id="cuisine-interest" name="interest">' + options([[0,'Not rated'],[1,'1 / 5'],[2,'2 / 5'],[3,'3 / 5'],[4,'4 / 5'],[5,'5 / 5']],track.interest || 0) + '</select>') + field('<label for="cuisine-notes">Dishes, places and things to remember</label>', '<textarea id="cuisine-notes" name="notes" rows="4" maxlength="10000" placeholder="A dish I tried, a favorite place, something I would love to cook…">' + escape(track.notes) + '</textarea>') + '<div class="dialog-actions"><button type="submit" class="button primary">Save food notes</button></div></form><div class="section-divider"></div><h3>Log one more taste</h3><form id="cuisine-log-form" data-id="' + escape(id) + '"><div class="form-grid">' + field('<label for="cuisine-date">Date, if known</label>', '<input id="cuisine-date" name="date" type="date" value="' + (log ? today() : '') + '">') + field('<label for="cuisine-log-notes">What did you try?</label>', '<input id="cuisine-log-notes" name="notes" maxlength="2000" placeholder="A dish, a restaurant, a memory…">') + '</div><button type="submit" class="button primary">Log this taste +</button><p class="form-help">Adds one to your count and marks this cuisine Tried. Favorites stay favorites.</p></form>' + (related.length ? '<div class="section-divider"></div><h3>Ideas around this table</h3><div class="detail-related">' + related.slice(0, 12).map(item => button(item.title, 'detail', item.id)).join('') + '</div><p class="form-help">These are examples from the atlas, not a complete definition of the cuisine.</p>' : '<p class="form-help">Explore this food tradition through local cooks and regional restaurants; dish ideas can keep growing.</p>'));
    if (log) setTimeout(() => { const date = document.getElementById('cuisine-date'); if (date) date.focus(); }, 0);
  }
  function visitForm(id) {
    const visit = id ? state().visits.find(entry => entry.id === id) : { label: '', location: '', kind: 'city', note: '', date: '', photo: '' };
    if (!visit) return;
    openDialog('<span class="eyebrow">The memory shelf</span><h2>' + (id ? 'Keep the details you love.' : 'A place in your story.') + '</h2><form id="visit-form"' + (id ? ' data-id="' + escape(id) + '"' : '') + '>' + field('<label for="visit-label">Memory / place name</label>', '<input id="visit-label" name="label" required maxlength="220" value="' + escape(visit.label) + '" placeholder="A little weekend in…">') + '<div class="form-grid">' + field('<label for="visit-location">Location</label>', '<input id="visit-location" name="location" maxlength="220" value="' + escape(visit.location) + '">') + field('<label for="visit-kind">Kind of place</label>', '<select id="visit-kind" name="kind">' + options([['city', 'City / neighborhood'], ['region', 'Region'], ['park', 'Park / nature place'], ['country', 'Country visited, not completed']], visit.kind) + '</select>') + field('<label for="visit-date">Date, if known</label>', '<input id="visit-date" name="date" type="date" value="' + escape(visit.date) + '">') + field('<label for="visit-photo">Photo URL, optional</label>', '<input id="visit-photo" name="photo" type="url" value="' + escape(visit.photo) + '" placeholder="https://…">') + '</div>' + field('<label for="visit-note">What made it yours?</label>', '<textarea id="visit-note" name="note" rows="5" maxlength="10000">' + escape(visit.note) + '</textarea>') + '<p class="form-help">This adds a place memory. It does not mark all nearby atlas ideas Done.</p><div class="dialog-actions"><button type="submit" class="button primary">Save memory</button>' + (id ? button('Remove memory', 'remove-visit', id) : '') + '</div></form>');
  }
  function planForm(id, templateId, initialIds, suggested) {
    const template = (seeds.planTemplates || []).find(entry => entry.id === templateId);
    const plan = id ? state().plans.find(entry => entry.id === id) : { title: template ? template.title : '', description: template ? template.description : '', duration: template ? template.duration : '', scope: template ? template.scope || 'Anywhere' : 'USA', companions: state().settings.soloDefault === false ? 'partner-optional' : 'solo', status: 'idea', notes: '', startDate: '', endDate: '', itemIds: initialIds || [], ...(suggested || {}) };
    if (!plan) return;
    const selected = (plan.itemIds || []).map(itemById).filter(Boolean);
    openDialog('<span class="eyebrow">A loose draft, all yours</span><h2>' + (id ? 'Make room for the details.' : 'A someday starts here.') + '</h2><form id="plan-form" data-template-id="' + escape(plan.templateId || '') + '"' + (id ? ' data-id="' + escape(id) + '"' : '') + '>' + field('<label for="plan-title">Draft name</label>', '<input id="plan-title" name="title" required maxlength="220" value="' + escape(plan.title) + '" placeholder="An unhurried US long weekend…">') + field('<label for="plan-description">The shape of the idea</label>', '<textarea id="plan-description" name="description" rows="3" maxlength="2000">' + escape(plan.description) + '</textarea>') + '<div class="form-grid">' + field('<label for="plan-duration">Time available, loosely</label>', '<input id="plan-duration" name="duration" maxlength="80" value="' + escape(plan.duration) + '" placeholder="One afternoon, 4–5 days, two weeks…">') + field('<label for="plan-scope">Where</label>', '<select id="plan-scope" name="scope">' + options([['USA', 'United States'], ['World', 'Around the world'], ['Anywhere', 'Anywhere / everyday life']], plan.scope) + '</select>') + field('<label for="plan-companions">Company</label>', '<select id="plan-companions" name="companions">' + options([['solo', 'Solo, with guides when useful'], ['partner-optional', 'Partner optional']], plan.companions) + '</select>') + field('<label for="plan-status">Draft status</label>', '<select id="plan-status" name="status">' + options([['idea', 'Loose idea'], ['saved', 'Saved draft'], ['completed', 'Trip completed']], plan.status) + '</select>') + field('<label for="plan-start">Start date, optional</label>', '<input id="plan-start" name="startDate" type="date" value="' + escape(plan.startDate) + '">') + field('<label for="plan-end">End date, optional</label>', '<input id="plan-end" name="endDate" type="date" value="' + escape(plan.endDate) + '">') + '</div>' + (selected.length ? '<fieldset><legend>Ideas in this draft</legend>' + selected.map(item => '<label class="checkbox-field"><input type="checkbox" name="itemIds" value="' + escape(item.id) + '" checked> ' + escape(item.title) + '</label>').join('') + '</fieldset>' : '<p class="form-help">Add ideas from their detail cards in Explore. Leave space for transit and rest; this draft does not check booking availability.</p>') + field('<label for="plan-notes">Notes, questions, things to work out</label>', '<textarea id="plan-notes" name="notes" rows="5" maxlength="10000" placeholder="What would make this feel good? What still needs research?">' + escape(plan.notes) + '</textarea>') + '<p class="form-help">Marking a plan completed does not automatically mark every included experience Done.</p><div class="dialog-actions"><button type="submit" class="button primary">Save draft</button>' + (id ? button('Remove draft', 'remove-plan', id) : '') + '</div></form>');
  }
  function planPicker(id) {
    const item = itemById(id);
    if (!item) return;
    const plans = state().plans;
    openDialog('<span class="eyebrow">Bring a possibility closer</span><h2>Add to a loose plan.</h2><p>' + escape(item.title) + '</p>' + (plans.length ? '<form id="plan-picker-form" data-id="' + escape(id) + '">' + field('<label for="pick-plan">Choose a draft</label>', '<select id="pick-plan" name="planId">' + options(plans.map(plan => [plan.id, plan.title]), '') + '</select>') + '<button type="submit" class="button primary">Add this idea</button></form><div class="section-divider"></div>' : '') + button('Start a new draft with this idea +', 'new-plan-item', id, 'primary'));
  }
  function settingsDialog() {
    const s = state().settings;
    openDialog('<span class="eyebrow">Your own rhythm</span><h2>A life that fits you.</h2><p class="muted">These preferences shape the atlas on this browser. They are not shared to the public website.</p><form id="settings-form"><div class="field-row"><label class="checkbox-field"><input type="checkbox" name="usFirst"' + checked(s.usFirst) + '> Show US possibilities first</label><label class="checkbox-field"><input type="checkbox" name="earlierEffort"' + checked(s.earlierEffort) + '> Bring my “earlier” picks forward</label><label class="checkbox-field"><input type="checkbox" name="soloDefault"' + checked(s.soloDefault) + '> New plans start solo</label></div><p class="form-help">Earlier picks are personal and editable. There is no fixed age cutoff for travel or any destination.</p>' + field('<label for="settings-home">Home base</label>', '<input id="settings-home" name="homeBase" maxlength="220" value="' + escape(s.homeBase || '') + '">') + '<div class="form-grid">' + field('<label for="settings-window">Available window / general rhythm</label>', '<input id="settings-window" name="availableWindow" maxlength="1000" value="' + escape(s.availableWindow || '') + '" placeholder="Weekends, a few longer breaks…">') + field('<label for="settings-days">Working days / constraints</label>', '<input id="settings-days" name="workingDays" maxlength="1000" value="' + escape(s.workingDays || '') + '" placeholder="Anything you want to remember">') + field('<label for="settings-lengths">Trip lengths to consider, in days</label>', '<input id="settings-lengths" name="tripLengths" value="' + escape((s.tripLengths || [2, 5, 10, 21]).join(', ')) + '" placeholder="2, 5, 10, 21">', 'Separate positive numbers with commas; these are preferences, not scheduled trips.') + field('<label for="settings-theme">Color mood</label>', '<select id="settings-theme" name="theme">' + options(['sage', 'blush', 'ocean', 'night'], s.theme || 'sage') + '</select>') + '</div>' + field('<label for="settings-notes">Private planning notes</label>', '<textarea id="settings-notes" name="privateNotes" rows="4" maxlength="10000" placeholder="Interests, budget thoughts, practical constraints…">' + escape(s.privateNotes || '') + '</textarea>') + '<div class="dialog-actions"><button type="submit" class="button primary">Save my preferences</button></div></form><div class="section-divider"></div><h3>Keep your atlas with you</h3><p class="form-help">Progress stays in this browser using local storage. Export a JSON backup for another device or your private repository. Imports replace this browser’s saved progress after confirmation.</p><div class="inline-actions">' + button('Export my progress ↓', 'export') + button('Import a backup ↑', 'import') + button('Save for GitHub ↓', 'public-export') + '</div><p class="form-help">Save for GitHub downloads progress.js. Put it at life/data/progress.js and commit it to carry your public progress, board titles and plan drafts between devices. Custom goal titles and locations, visit labels, and plan / board titles become public if committed. Private notes, settings, photos and dates are excluded. Review the downloaded file before committing it. This download does not publish anything automatically.</p>', true);
  }
  function exportProgress() {
    const blob = new Blob([store.exportState()], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url; link.download = 'charitha-life-atlas-' + today() + '.json';
    document.body.appendChild(link); link.click(); link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    toast('Your private progress backup is ready.');
  }
  function exportPublicProgress() {
    if (typeof store.exportPublicProgress !== 'function') return toast('The public snapshot export is not available yet.');
    const blob = new Blob([store.exportPublicProgress()], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url; link.download = 'progress.js';
    document.body.appendChild(link); link.click(); link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    toast('Downloaded progress.js. Put it in life/data and commit it to share public progress.');
  }
  const actions = {
    detail: id => itemDetail(id),
    pin: id => { const item = itemById(id); if (item) { store.updateItem(id, { board: !item.tracker.board }); toast(item.tracker.board ? 'Unpinned. The possibility is still in the atlas.' : 'Pinned to your someday board ♡'); } },
    'photo-credits': () => photoCredits(),
    'priority-destination': id => { if (window.LifePriorityView) window.LifePriorityView.openDestination(id); },
    'priority-family': id => { if (window.LifePriorityView) window.LifePriorityView.openFamily(id); },
    'shortlist-view': id => shortlistView(id),
    'shortlist-plan': id => shortlistPlan(id),
    'shortlist-map': id => { const route = (window.LIFE_TRIP_SHORTLISTS || []).find(route => route.id === id); closeDialog(); setTab('map', true); if (route && window.LifeMapPlanner) window.LifeMapPlanner.setRegion(route.regionIds[0]); },
    'go-food': () => setTab('food', true),
    'go-map': () => setTab('map', true),
    'go-explore': () => { ui.boardId = ''; setTab('explore', true); },
    'show-pins': () => { ui.boardId = ''; ui.query = ''; ui.category = ''; ui.scope = ''; ui.effort = ''; ui.early = false; ui.status = 'pinned'; ui.page = 1; setTab('explore', true); },
    'open-board': id => { ui.boardId = id; ui.query = ''; ui.category = ''; ui.scope = ''; ui.status = ''; ui.effort = ''; ui.early = false; ui.page = 1; setTab('explore', true); },
    'clear-board': () => { ui.boardId = ''; ui.page = 1; render(); },
    'reset-filters': () => { ui.query = ''; ui.category = ''; ui.scope = ''; ui.status = ''; ui.effort = ''; ui.early = false; ui.boardId = ''; ui.sort = 'personal'; ui.page = 1; render(); },
    'new-item': () => customItemForm(), 'edit-item': id => customItemForm(id),
    'new-board': () => boardForm(), 'edit-board': id => boardForm(id),
    'remove-board': id => { if (confirm('Remove this custom board? Its ideas and progress will stay in the atlas.')) { store.removeBoard(id); closeDialog(); toast('Board removed.'); } },
    cuisine: id => cuisineDialog(id, false), 'log-cuisine': id => cuisineDialog(id, true),
    'reset-food': () => { ui.foodQuery = ''; ui.foodStatus = ''; ui.foodRegion = ''; ui.foodPage = 1; render(); },
    'new-visit': () => visitForm(), 'edit-visit': id => visitForm(id),
    'remove-visit': id => { if (confirm('Remove this place memory from your journal?')) { store.removeVisit(id); closeDialog(); toast('Memory removed from this journal.'); } },
    'new-plan': () => planForm(), 'edit-plan': id => planForm(id), 'template-plan': id => planForm('', id),
    'new-plan-item': id => planForm('', '', [id]),
    'remove-plan': id => { if (confirm('Remove this plan draft? The experiences remain in your atlas.')) { store.removePlan(id); closeDialog(); toast('Draft removed.'); } },
    'item-plan': id => { const form = document.getElementById('item-form'); if (!form || form.reportValidity()) { if (form) saveItem(form, false); planPicker(id); } },
    'plan-explore': id => { const plan = state().plans.find(entry => entry.id === id); ui.scope = plan && plan.scope !== 'Anywhere' ? plan.scope : ''; ui.boardId = ''; ui.page = 1; setTab('explore', true); toast('Open an idea and choose Add to a plan.'); },
    export: exportProgress,
    'public-export': exportPublicProgress,
    import: () => document.getElementById('import-input').click()
  };
  document.addEventListener('click', event => {
    const target = event.target.closest('[data-action]');
    if (!target || target.disabled) return;
    const action = target.dataset.action;
    if (action === 'page') {
      const page = Number(target.dataset.page);
      if (target.dataset.kind === 'food') ui.foodPage = page;
      else if (target.dataset.kind === 'visited') ui.visitPage = page;
      else ui.page = page;
      render(); root.scrollIntoView({ behavior: 'smooth', block: 'start' }); return;
    }
    if (actions[action]) attempt(() => actions[action](target.dataset.id));
  });
  document.addEventListener('submit', event => {
    const form = event.target;
    if (!form.id || !['item-form', 'custom-item-form', 'board-form', 'cuisine-form', 'cuisine-log-form', 'visit-form', 'plan-form', 'plan-picker-form', 'settings-form', 'explore-filters', 'food-filters'].includes(form.id)) return;
    event.preventDefault();
    if (['explore-filters', 'food-filters'].includes(form.id)) return;
    if (!form.reportValidity()) return;
    attempt(() => {
      const data = new FormData(form);
      const id = form.dataset.id;
      if (form.id === 'item-form') return saveItem(form, true);
      if (form.id === 'custom-item-form') {
        const record = Object.fromEntries(data.entries());
        record.tags = String(data.get('tags') || '').split(',').map(tagText => tagText.trim()).filter(Boolean);
        record.origin = 'My own idea'; record.reference = ''; record.notes = '';
        if (!record.title.trim()) throw new Error('Give this idea a name.');
        if (id) store.updateCustomItem(id, record); else store.addCustomItem(record);
        closeDialog(); toast('Your idea has a place in the atlas.');
      } else if (form.id === 'board-form') {
        const record = { title: data.get('title'), description: data.get('description'), palette: data.get('palette'), itemIds: data.getAll('itemIds') };
        if (!record.title.trim()) throw new Error('Give this board a name.');
        if (id) store.updateBoard(id, record); else store.addBoard(record);
        closeDialog(); toast('Your collection is saved.');
      } else if (form.id === 'cuisine-form') {
        store.updateCuisine(id, { status: data.get('status'), notes: data.get('notes'), interest: Number(data.get('interest') || 0) });
        closeDialog(); toast('Food notes saved.');
      } else if (form.id === 'cuisine-log-form') {
        store.logCuisine(id, { date: data.get('date'), notes: data.get('notes') });
        cuisineDialog(id, false); toast('One more taste, remembered.');
      } else if (form.id === 'visit-form') {
        const record = Object.fromEntries(data.entries());
        if (!record.label.trim()) throw new Error('Give this memory a place name.');
        if (record.photo && !safeUrl(record.photo)) throw new Error('Use an http or https image URL.');
        if (id) store.updateVisit(id, record); else store.addVisit({ ...record, relatedIds: [] });
        closeDialog(); toast('A memory, kept.');
      } else if (form.id === 'plan-form') {
        const record = Object.fromEntries(data.entries()); record.itemIds = data.getAll('itemIds'); record.templateId = form.dataset.templateId || '';
        if (!record.title.trim()) throw new Error('Give this draft a name.');
        if (record.startDate && record.endDate && record.startDate > record.endDate) throw new Error('The end date must be on or after the start date.');
        if (id) store.updatePlan(id, record); else store.addPlan(record);
        closeDialog(); toast('Your loose plan is saved.');
      } else if (form.id === 'plan-picker-form') {
        const plan = state().plans.find(entry => entry.id === data.get('planId'));
        if (!plan) throw new Error('Choose an existing draft.');
        store.updatePlan(plan.id, { itemIds: Array.from(new Set((plan.itemIds || []).concat(id))) });
        closeDialog(); toast('Idea added to ' + plan.title + '.');
      } else if (form.id === 'settings-form') {
        const lengths = String(data.get('tripLengths') || '').split(',').map(value => Number(value.trim()));
        if (!lengths.length || lengths.length > 12 || lengths.some(value => !Number.isInteger(value) || value <= 0 || value > 365)) throw new Error('Choose up to 12 trip lengths, in whole days from 1 to 365, separated by commas.');
        store.updateSettings({ usFirst: data.has('usFirst'), earlierEffort: data.has('earlierEffort'), soloDefault: data.has('soloDefault'), homeBase: data.get('homeBase'), availableWindow: data.get('availableWindow'), workingDays: data.get('workingDays'), privateNotes: data.get('privateNotes'), theme: data.get('theme'), tripLengths: Array.from(new Set(lengths)) });
        closeDialog(true); toast('Your rhythm, saved.');
      }
    });
  });
  // Preserve focus and the caret while a search redraws its result grid.
  function redrawSearch(input, key, pageKey) {
    ui[key] = input.value; ui[pageKey] = 1;
    const id = input.id; const selection = input.selectionStart;
    render(); const replacement = document.getElementById(id);
    if (replacement) { replacement.focus(); try { replacement.setSelectionRange(selection, selection); } catch (_) {} }
  }
  document.addEventListener('input', event => {
    if (event.target.id === 'explore-query') redrawSearch(event.target, 'query', 'page');
    else if (event.target.id === 'food-query') redrawSearch(event.target, 'foodQuery', 'foodPage');
    else if (event.target.id === 'visited-query') redrawSearch(event.target, 'visitQuery', 'visitPage');
  });
  document.addEventListener('change', event => {
    const map = { 'explore-category': 'category', 'explore-scope': 'scope', 'explore-status': 'status', 'explore-effort': 'effort', 'explore-sort': 'sort', 'food-status': 'foodStatus', 'food-region': 'foodRegion', 'food-sort': 'foodSort' };
    if (map[event.target.id]) { ui[map[event.target.id]] = event.target.value; ui.page = 1; ui.foodPage = 1; render(); }
    else if (event.target.id === 'food-top') { ui.foodTop = event.target.checked; ui.foodPage = 1; render(); }
    else if (event.target.id === 'explore-early') { ui.early = event.target.checked; ui.page = 1; render(); }
  });
  const nav = document.getElementById('tab-nav');
  if (nav) {
    nav.setAttribute('role', 'tablist');
    nav.addEventListener('click', event => { const tab = event.target.closest('[data-tab]'); if (tab) setTab(tab.dataset.tab, false); });
    nav.addEventListener('keydown', event => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      const tabs = all('[data-tab]', nav); const index = tabs.indexOf(event.target);
      if (index < 0) return;
      event.preventDefault();
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
      setTab(tabs[next].dataset.tab, false); tabs[next].focus();
    });
  }
  const themeSelect = document.getElementById('theme-select');
  if (themeSelect) themeSelect.addEventListener('change', event => attempt(() => store.updateSettings({ theme: event.target.value })));
  const settingsButton = document.getElementById('settings-button');
  if (settingsButton) settingsButton.addEventListener('click', settingsDialog);
  const exportButton = document.getElementById('export-button');
  if (exportButton) exportButton.addEventListener('click', () => attempt(exportProgress));
  const publicButton = document.getElementById('public-export-button');
  if (publicButton) publicButton.addEventListener('click', () => attempt(exportPublicProgress));
  const addButton = document.getElementById('add-idea-button');
  if (addButton) addButton.addEventListener('click', () => customItemForm());
  const importInput = document.getElementById('import-input');
  if (importInput) importInput.addEventListener('change', async event => {
    const file = event.target.files[0];
    if (!file) return;
    try {
      if (file.size > 5 * 1024 * 1024) throw new Error('Choose a Life Atlas JSON backup smaller than 5 MB.');
      const raw = await file.text();
      JSON.parse(raw);
      if (!confirm('Import this backup and replace the progress saved on this browser? Export first if you need to keep the current version.')) return;
      store.importState(raw); closeDialog(true); closeDialog(); render(); toast('Your atlas is back with you.');
    } catch (error) { toast(error.message || 'This backup could not be imported. Your current progress is unchanged.'); }
    finally { event.target.value = ''; }
  });
  ['item', 'settings'].forEach(name => {
    const dialog = document.getElementById(name + '-dialog');
    const close = document.getElementById(name === 'item' ? 'dialog-close' : 'settings-close');
    if (close) close.addEventListener('click', () => closeDialog(name === 'settings'));
    if (dialog) {
      dialog.addEventListener('click', event => { if (event.target === dialog) { const bounds = dialog.getBoundingClientRect(); if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close(); } });
      dialog.addEventListener('close', () => { if (dialogReturnFocus && dialogReturnFocus.isConnected) dialogReturnFocus.focus(); });
    }
  });
  document.addEventListener('error', event => { if (event.target.tagName === 'IMG' && !event.target.src.endsWith('/images/city.svg')) event.target.src = 'images/city.svg'; }, true);
  window.addEventListener('hashchange', () => { const tab = location.hash.slice(1); if (TABS.includes(tab)) { ui.tab = tab; render(); } });
  if (window.LifeMapPlanner) window.LifeMapPlanner.configure({
    openItem: itemDetail,
    openPriorityDestination: id => { if(window.LifePriorityView)window.LifePriorityView.openDestination(id); },
    createPlan: (ids, region, duration) => {
      setTab('plans', true);
      planForm(undefined, undefined, ids, {
        title: (region && region.name ? region.name : 'A trip possibility') + ' · ' + duration,
        description: region ? (region.base ? 'Base: ' + region.base + '. ' : '') + (region.summary || 'A draft built from selected map experiences.') : 'A draft built from selected map experiences.',
        duration: duration,
        scope: region && region.scope ? region.scope : (ids.some(id => { const item = itemById(id); return item && item.scope === 'World'; }) ? 'World' : 'USA'),
        companions: 'solo',
        notes: region && region.routeNote ? region.routeNote : ''
      });
    },
    recommendTrips: context => { setTab('plans', true); if (window.LifeTripExplorer) window.LifeTripExplorer.recommendArea(context); },
    goPlans: () => setTab('plans', true)
  });
  if (window.LifeCsvList) window.LifeCsvList.configure({
    openItem: itemDetail,
    requestRender: () => { if (ui.tab === 'csv') render(); }
  });
  if (window.LifeTripExplorer) window.LifeTripExplorer.configure({
    openItem: itemDetail,
    openDraft: (variant, family) => {
      const outline = variant.outline.map(day => 'Day ' + day.day + ' · ' + day.base + '\n' + day.focus).join('\n\n');
      const travel = variant.travelAllowance;
      planForm(undefined, undefined, variant.itemIds, {
        title: variant.title, duration: variant.days + ' days', scope: family.scope || 'USA', companions: 'solo',
        description: family.why,
        notes: outline + '\n\nTravel allowance (planning assumptions): outbound ' + travel.outbound + '; return ' + travel.return + '. These are planning assumptions rather than live travel estimates.\n\n' + variant.routeNote,
        templateId: variant.id
      });
    },
    showOnMap: (ids, regionIds) => { setTab('map', true); if (window.LifeMapPlanner && regionIds.length) window.LifeMapPlanner.setRegion(regionIds[0]); },
    requestRender: () => { if (ui.tab === 'plans') render(); }
  });
  if (window.LifePriorityView) window.LifePriorityView.configure({
    openItem: itemDetail, openCuisine: id => cuisineDialog(id, false), openDialog, openCredits: photoCredits,
    photo: libraryPhoto,
    showRankedDestinations: (rows,source) => { closeDialog();setTab('map',true);if(window.LifeMapPlanner)window.LifeMapPlanner.showRankedDestinations(rows,source); },
    showBundle: ids => { closeDialog(); setTab('map', true); if (window.LifeMapPlanner) window.LifeMapPlanner.showPriorityBundle(ids, 'your destination shortlist'); },
    showOnMap: (ids, regionIds, title) => { closeDialog(); setTab('map', true); if (window.LifeMapPlanner) window.LifeMapPlanner.showItems(ids, title); },
    requestRender: () => { if (ui.tab === 'priorities') render(); }
  });
  if(window.LifeCoverageView)window.LifeCoverageView.configure({
    openItem:itemDetail,openCuisine:id=>cuisineDialog(id,false),openDialog,openCredits:photoCredits,photo:libraryPhoto,
    showOnMap:(ids,title,days)=>{closeDialog();setTab('map',true);window.LifeMapPlanner.showPriorityBundle(ids,title);window.LifeMapPlanner.setPlanDays(days===9?'9':'4-5');},
    openDraft:route=>{closeDialog();setTab('plans',true);planForm(undefined,undefined,route.itemIds,{title:route.title,duration:route.days+' days',scope:route.scope,companions:'solo',description:'A coverage-plan journey from the Bay Area. '+route.ptoDays+' weekday leave days before holidays or approved remote work.',notes:route.dayAllocations.map(d=>'Day '+d.day+' · '+d.base+' · '+d.kind+'\n'+d.focus).join('\n\n')+'\n\nPlanning assumptions: '+JSON.stringify(route.assumptions)});},
    requestRender:()=>{if(ui.tab==='coverage')render();}
  });
  store.subscribe(render);
  render();
})();
