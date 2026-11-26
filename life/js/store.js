/* Personal progress stays local until explicitly exported. This file contains no personal data. */
(function (global) {
  'use strict';
  var STORAGE_KEY = 'life-fully-state-v1';
  var MAX_BYTES = 5 * 1024 * 1024;
  var ITEM_STATUSES = ['curious', 'want', 'done', 'revisit', 'pass'];
  var CUISINE_STATUSES = ['untracked', 'new', 'tried', 'favorite'];
  var SCOPES = ['USA', 'World', 'Anywhere'];
  var PALETTES = ['sage', 'blush', 'ocean', 'night'];
  var EFFORTS = ['gentle', 'moderate', 'demanding', 'unknown'];
  var SOLO_MODES = ['solo-friendly', 'guided', 'partner-optional', 'shared'];
  var catalog = Array.isArray(global.LIFE_CATALOG) ? global.LIFE_CATALOG : [];
  var cuisines = Array.isArray(global.LIFE_CUISINES) ? global.LIFE_CUISINES : [];
  var seeds = global.LIFE_SEEDS || {};
  var catalogIds = new Set(catalog.map(function (r) { return r.id; }));
  var cuisineIds = new Set(cuisines.map(function (r) { return r.id; }));
  var listeners = [];
  var storageWarning = '';

  function own(obj, key) { return Object.prototype.hasOwnProperty.call(obj, key); }
  function clone(value) { return JSON.parse(JSON.stringify(value)); }
  function fail(message) { throw new Error(message); }
  function object(value, label) {
    if (!value || typeof value !== 'object' || Array.isArray(value)) fail(label + ' must be an object.');
    return value;
  }
  function text(value, limit, label, fallback) {
    if (value === undefined) return fallback === undefined ? '' : fallback;
    if (typeof value !== 'string') fail(label + ' must be text.');
    if (value.length > limit) fail(label + ' is too long (maximum ' + limit + ' characters).');
    return value.replace(/\u0000/g, '');
  }
  function requiredText(value, limit, label) {
    var result = text(value, limit, label).trim();
    if (!result) fail(label + ' is required.');
    return result;
  }
  function choice(value, choices, label, fallback) {
    if (value === undefined) return fallback;
    if (typeof value !== 'string' || choices.indexOf(value) < 0) fail('Invalid ' + label + '.');
    return value;
  }
  function bool(value, label, fallback) {
    if (value === undefined) return fallback === undefined ? false : fallback;
    if (typeof value !== 'boolean') fail(label + ' must be true or false.');
    return value;
  }
  function number(value, min, max, label, fallback) {
    if (value === undefined) return fallback === undefined ? min : fallback;
    if (typeof value !== 'number' || !Number.isFinite(value) || Math.floor(value) !== value || value < min || value > max) fail('Invalid ' + label + '.');
    return value;
  }
  function identifier(value, label) {
    var result = requiredText(value, 90, label);
    if (!/^[A-Za-z0-9][A-Za-z0-9_-]*$/.test(result) || ['__proto__', 'constructor', 'prototype'].indexOf(result) >= 0) fail('Invalid ' + label + '.');
    return result;
  }
  function date(value, label) {
    var result = text(value, 10, label);
    if (!result) return '';
    if (!/^\d{4}-\d{2}-\d{2}$/.test(result)) fail(label + ' must use YYYY-MM-DD.');
    var parsed = new Date(result + 'T00:00:00Z');
    if (!Number.isFinite(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== result) fail('Invalid ' + label + '.');
    return result;
  }
  function url(value, label) {
    var result = text(value, 2048, label).trim();
    if (!result) return '';
    if (!/^https?:\/\/[^\s<>'"]+$/i.test(result)) fail(label + ' must be an http or https URL.');
    return result;
  }
  function array(value, limit, label) {
    if (value === undefined) return [];
    if (!Array.isArray(value) || value.length > limit) fail(label + ' must be a list with at most ' + limit + ' entries.');
    return value;
  }
  function unique(values, label) {
    var found = new Set();
    values.forEach(function (r) {
      if (found.has(r.id)) fail('Duplicate ' + label + ' ID: ' + r.id + '.');
      found.add(r.id);
    });
    return values;
  }
  function newId(prefix) {
    var suffix = '';
    try {
      if (global.crypto && global.crypto.getRandomValues) {
        var bytes = new Uint32Array(2);
        global.crypto.getRandomValues(bytes);
        suffix = bytes[0].toString(36) + bytes[1].toString(36);
      }
    } catch (ignored) { /* Random fallback below is enough for device-local record identity. */ }
    if (!suffix) suffix = Math.random().toString(36).slice(2, 11);
    return prefix + '-' + Date.now().toString(36) + '-' + suffix;
  }
  function tracker(input) {
    var r = object(input === undefined ? {} : input, 'Item progress');
    return {
      status: choice(r.status, ITEM_STATUSES, 'item status', 'curious'),
      interest: number(r.interest, 0, 5, 'interest', 0),
      notes: text(r.notes, 10000, 'Item notes'),
      early: bool(r.early, 'Earlier preference'),
      board: bool(r.board, 'Pinned preference'),
      photo: url(r.photo, 'Photo URL'),
      completedOn: date(r.completedOn, 'Completion date')
    };
  }
  function cuisineProgress(input) {
    var r = object(input === undefined ? {} : input, 'Cuisine progress');
    return {
      status: choice(r.status, CUISINE_STATUSES, 'cuisine status', 'untracked'),
      count: number(r.count, 0, 1000000, 'tasting count', 0),
      lastTried: date(r.lastTried, 'Last tasting date'),
      notes: text(r.notes, 10000, 'Cuisine notes'),
      interest: number(r.interest, 0, 5, 'Cuisine interest', 0)
    };
  }
  function tags(input) {
    if (input === undefined) return [];
    if (typeof input === 'string') input = input.split(/[,;]/).filter(function (v) { return v.trim(); });
    return array(input, 30, 'Tags').map(function (v) { return text(v, 70, 'Tag').trim(); }).filter(Boolean);
  }
  function customItem(input) {
    var r = object(input, 'Custom idea');
    return {
      id: identifier(r.id, 'Custom idea ID'),
      title: requiredText(r.title, 220, 'Idea title'),
      category: text(r.category, 90, 'Category', 'Everyday & local'),
      theme: text(r.theme, 160, 'Theme'),
      location: text(r.location, 160, 'Location'),
      country: text(r.country, 130, 'Country'),
      region: text(r.region, 90, 'Region'),
      scope: choice(r.scope, SCOPES, 'idea scope', 'Anywhere'),
      why: text(r.why, 1000, 'Why this matters'),
      tags: tags(r.tags),
      origin: 'My idea',
      reference: url(r.reference, 'Reference URL'),
      notes: text(r.notes, 10000, 'Idea description'),
      earlyReason: text(r.earlyReason, 1000, 'Earlier context'),
      effort: choice(r.effort, EFFORTS, 'effort', 'unknown'),
      solo: choice(r.solo, SOLO_MODES, 'participation', 'solo-friendly'),
      image: url(r.image, 'Idea image URL')
    };
  }
  function itemRefs(input, known, label) {
    var values = array(input, 300, label).map(function (v) { return identifier(v, 'Experience ID'); });
    values.forEach(function (id) { if (!known.has(id)) fail(label + ' contains an unknown experience: ' + id + '.'); });
    return Array.from(new Set(values));
  }
  function visit(input, known) {
    var r = object(input, 'Visit');
    return {
      id: identifier(r.id, 'Visit ID'),
      label: requiredText(r.label, 220, 'Visit label'),
      location: text(r.location, 220, 'Visit location', r.label),
      kind: choice(r.kind, ['city', 'region', 'park', 'country'], 'visit kind', 'city'),
      note: text(r.note, 10000, 'Visit notes'),
      relatedIds: itemRefs(r.relatedIds, known, 'Related experiences'),
      date: date(r.date, 'Visit date'),
      photo: url(r.photo, 'Visit photo URL')
    };
  }
  function plan(input, known) {
    var r = object(input, 'Plan');
    var templateId = text(r.templateId, 90, 'Trip starter ID');
    if (templateId && !(global.LIFE_TRIP_SHORTLISTS || []).some(function (route) { return route.id === templateId; }) && !(global.LIFE_TRIP_OPTIONS || []).some(function (family) { return family.variants.some(function (variant) { return variant.id === templateId; }); })) fail('Unknown trip starter ID.');
    var startDate = date(r.startDate, 'Plan start date');
    var endDate = date(r.endDate, 'Plan end date');
    if (startDate && endDate && endDate < startDate) fail('A plan cannot end before it starts.');
    return {
      id: identifier(r.id, 'Plan ID'),
      title: requiredText(r.title, 220, 'Plan title'),
      description: text(r.description, 2000, 'Plan description'),
      itemIds: itemRefs(r.itemIds, known, 'Plan experiences'),
      duration: text(r.duration, 80, 'Plan duration'),
      scope: choice(r.scope, SCOPES, 'plan scope', 'Anywhere'),
      companions: choice(r.companions, ['solo', 'partner-optional'], 'plan companions', 'solo'),
      status: choice(r.status, ['idea', 'saved', 'completed'], 'plan status', 'idea'),
      notes: text(r.notes, 10000, 'Plan notes'),
      templateId: templateId,
      startDate: startDate,
      endDate: endDate
    };
  }
  function board(input, known) {
    var r = object(input, 'Board');
    return {
      id: identifier(r.id, 'Board ID'),
      title: requiredText(r.title, 180, 'Board title'),
      description: text(r.description, 2000, 'Board description'),
      itemIds: itemRefs(r.itemIds, known, 'Board experiences'),
      palette: choice(r.palette, PALETTES, 'board palette', 'sage')
    };
  }
  function settings(input) {
    var r = object(input === undefined ? {} : input, 'Settings');
    var defaults = seeds.settings || {};
    return {
      theme: choice(r.theme, PALETTES, 'theme', defaults.theme || 'sage'),
      usFirst: bool(r.usFirst, 'US-first preference', defaults.usFirst !== false),
      earlierEffort: bool(r.earlierEffort, 'Earlier-effort preference', defaults.earlierEffort !== false),
      soloDefault: bool(r.soloDefault, 'Solo preference', defaults.soloDefault !== false),
      homeBase: text(r.homeBase, 220, 'Home base', defaults.homeBase || ''),
      tripLengths: array(r.tripLengths === undefined ? defaults.tripLengths || [2, 5, 10, 21] : r.tripLengths, 12, 'Trip lengths').map(function (n) { return number(n, 1, 365, 'Trip length'); }),
      workingDays: text(r.workingDays, 1000, 'Working days'),
      availableWindow: text(r.availableWindow, 1000, 'Available window'),
      privateNotes: text(r.privateNotes, 10000, 'Private notes')
    };
  }
  function priorityPreferences(input) {
    var r = object(input === undefined ? {} : input, 'Discovery preferences');
    var data = global.LIFE_DISCOVERY_PRIORITIES || {};
    var destinations = new Set((Array.isArray(data.destinations) ? data.destinations : []).map(function (hub) { return hub.id; }));
    var families = new Set((Array.isArray(data.families) ? data.families : []).map(function (family) { return family.id; }));
    function refs(values, known, label) {
      return Array.from(new Set(array(values, 100, label).map(function (id) {
        identifier(id, label + ' ID');
        if (!known.has(id)) fail('Unknown ' + label + ' ID.');
        return id;
      })));
    }
    var inputRatings = object(r.destinationRatings === undefined ? {} : r.destinationRatings, 'Destination ratings');
    var keys = Object.keys(inputRatings); if (keys.length > 100) fail('Too many destination ratings.');
    var ratings = {};
    keys.forEach(function (id) { identifier(id, 'Destination rating ID'); if (!destinations.has(id)) fail('Unknown rated destination.'); ratings[id] = number(inputRatings[id], 0, 5, 'Destination interest', 0); });
    return { destinationIds: refs(r.destinationIds, destinations, 'Destination'), destinationRatings: ratings,
      repeatFamilies: refs(r.repeatFamilies, families, 'Repeat family'), coveredFamilies: refs(r.coveredFamilies, families, 'Covered family'),
      localFirst: bool(r.localFirst, 'Local-first preference', true) };
  }
  function validatedState(input) {
    var r = object(input, 'Backup');
    if (r.version !== 1) fail('This backup version is not supported. Expected version 1.');
    var custom = unique(array(r.customItems, 500, 'Custom ideas').map(customItem), 'custom idea');
    var known = new Set(catalogIds);
    custom.forEach(function (row) {
      if (known.has(row.id)) fail('Custom idea ID conflicts with an existing experience.');
      known.add(row.id);
    });
    var items = {};
    var inputItems = object(r.items === undefined ? {} : r.items, 'Experience progress');
    var itemKeys = Object.keys(inputItems);
    if (itemKeys.length > 5000) fail('Too many experience progress entries.');
    itemKeys.forEach(function (id) {
      identifier(id, 'Experience ID');
      if (!known.has(id)) fail('Progress refers to an unknown experience: ' + id + '.');
      items[id] = tracker(inputItems[id]);
    });
    var cuisineStates = {};
    var inputCuisines = object(r.cuisines === undefined ? {} : r.cuisines, 'Cuisine progress');
    var cuisineKeys = Object.keys(inputCuisines);
    if (cuisineKeys.length > 500) fail('Too many cuisine progress entries.');
    cuisineKeys.forEach(function (id) {
      identifier(id, 'Cuisine ID');
      if (!cuisineIds.has(id)) fail('Progress refers to an unknown cuisine: ' + id + '.');
      cuisineStates[id] = cuisineProgress(inputCuisines[id]);
    });
    return {
      version: 1,
      items: items,
      customItems: custom,
      cuisines: cuisineStates,
      visits: unique(array(r.visits, 1000, 'Visits').map(function (v) { return visit(v, known); }), 'visit'),
      plans: unique(array(r.plans, 500, 'Plans').map(function (v) { return plan(v, known); }), 'plan'),
      boards: unique(array(r.boards, 100, 'Boards').map(function (v) { return board(v, known); }), 'board'),
      settings: settings(r.settings),
      priorities: priorityPreferences(r.priorities),
      updatedAt: text(r.updatedAt, 40, 'Backup timestamp')
    };
  }
  function freshState() {
    var initial = { version: 1, items: {}, customItems: [], cuisines: {}, visits: seeds.visits || [], plans: [], boards: [], settings: seeds.settings || {}, updatedAt: '' };
    // A reported visit completes only the explicitly matched experience, never every goal in a city.
    (seeds.visits || []).forEach(function (v) {
      (v.relatedIds || []).forEach(function (id) { if (catalogIds.has(id)) initial.items[id] = { status: 'done' }; });
    });
    var published = global.LIFE_PUBLIC_PROGRESS;
    if (published && typeof published === 'object') {
      // Repository progress is a public baseline. Device edits remain a separate private layer.
      try {
        if (published.version !== 1) fail('Unsupported published progress version.');
        var input = clone(initial);
        if (published.customItems !== undefined) input.customItems = array(published.customItems, 500, 'Published custom ideas');
        ['items', 'cuisines'].forEach(function (key) {
          if (published[key] !== undefined) {
            object(published[key], 'Published ' + key);
            if (published.completeSnapshot === true) input[key] = {};
            Object.keys(published[key]).forEach(function (id) {
              identifier(id, 'Published record ID');
              input[key][id] = published[key][id];
            });
          }
        });
        ['visits', 'plans', 'boards'].forEach(function (key) {
          if (published[key] !== undefined) {
            var additional = array(published[key], key === 'visits' ? 1000 : key === 'boards' ? 100 : 500, 'Published ' + key);
            var indexed = {};
            if (published.completeSnapshot === true) input[key] = [];
            (input[key] || []).forEach(function (row) { indexed[row.id] = row; });
            additional.forEach(function (row) { object(row, 'Published record'); identifier(row.id, 'Published record ID'); indexed[row.id] = row; });
            input[key] = Object.keys(indexed).map(function (id) { return indexed[id]; });
          }
        });
        if (published.priorities !== undefined) input.priorities = published.priorities;
        initial = validatedState(input);
      } catch (error) {
        storageWarning = 'Published progress could not be read. The idea library and reported visits are still available.';
      }
    }
    return validatedState(initial);
  }
  var state = freshState();
  try {
    var saved = global.localStorage.getItem(STORAGE_KEY);
    if (saved) {
      if (saved.length > MAX_BYTES) fail('Saved progress is too large.');
      state = validatedState(JSON.parse(saved));
    }
  } catch (error) {
    storageWarning = 'Device storage is unavailable or saved progress could not be read. Your edits still work in this tab; export a backup to keep them.';
  }
  function knownItems() {
    return new Set(catalog.concat(state.customItems).map(function (row) { return row.id; }));
  }
  function publish(next) {
    var serialized = JSON.stringify(next);
    if (serialized.length > MAX_BYTES) fail('Progress is too large to save. Shorten notes or export and trim a backup.');
    state = next;
    try {
      global.localStorage.setItem(STORAGE_KEY, serialized);
      storageWarning = '';
    } catch (error) {
      storageWarning = 'This browser could not save to device storage. Your edits are safe in this tab; export a backup before closing it.';
    }
    listeners.slice().forEach(function (fn) {
      try { fn(clone(state)); } catch (ignored) { /* One UI listener must not discard saved edits. */ }
    });
  }
  function mutate(change) {
    var next = clone(state);
    change(next);
    next.updatedAt = new Date().toISOString();
    publish(validatedState(next));
  }
  function mergeAllowed(existing, patch, keys) {
    object(patch, 'Update');
    var result = clone(existing);
    keys.forEach(function (key) { if (['__proto__', 'constructor', 'prototype'].indexOf(key) < 0 && own(patch, key)) result[key] = patch[key]; });
    return result;
  }
  function findRecord(list, id, label) {
    identifier(id, label + ' ID');
    var index = list.findIndex(function (r) { return r.id === id; });
    if (index < 0) fail(label + ' was not found.');
    return index;
  }
  function addRecord(key, input, validator, prefix) {
    object(input, 'New record');
    var id = newId(prefix);
    var record = mergeAllowed({ id: id }, input, Object.keys(input).filter(function (k) { return k !== 'id'; }));
    var normalized = validator(record, knownItems());
    mutate(function (next) { next[key].push(normalized); });
    return id;
  }
  function editRecord(key, id, patch, validator, fields) {
    var index = findRecord(state[key], id, key);
    var updated = validator(mergeAllowed(state[key][index], patch, fields), knownItems());
    mutate(function (next) { next[key][index] = updated; });
  }
  function removeRecord(key, id) {
    var index = findRecord(state[key], id, key);
    mutate(function (next) { next[key].splice(index, 1); });
  }
  var api = {
    storageKey: STORAGE_KEY,
    getState: function () { return clone(state); },
    getItems: function () {
      return catalog.concat(state.customItems).map(function (r) {
        var result = clone(r);
        result.tracker = tracker(state.items[r.id] || {});
        return result;
      });
    },
    subscribe: function (fn) {
      if (typeof fn !== 'function') fail('A subscriber must be a function.');
      listeners.push(fn);
      return function () { var index = listeners.indexOf(fn); if (index >= 0) listeners.splice(index, 1); };
    },
    updateItem: function (id, patch) {
      identifier(id, 'Experience ID');
      if (!knownItems().has(id)) fail('Experience was not found.');
      var value = tracker(mergeAllowed(tracker(state.items[id] || {}), patch, ['status', 'interest', 'notes', 'early', 'board', 'photo', 'completedOn']));
      mutate(function (next) { next.items[id] = value; });
    },
    addCustomItem: function (input) { return addRecord('customItems', input, customItem, 'custom'); },
    updateCustomItem: function (id, patch) {
      editRecord('customItems', id, patch, customItem, ['title', 'category', 'theme', 'location', 'country', 'region', 'scope', 'why', 'tags', 'reference', 'notes', 'earlyReason', 'effort', 'solo', 'image']);
    },
    addVisit: function (input) { return addRecord('visits', input, visit, 'visit'); },
    updateVisit: function (id, patch) { editRecord('visits', id, patch, visit, ['label', 'location', 'kind', 'note', 'relatedIds', 'date', 'photo']); },
    removeVisit: function (id) { removeRecord('visits', id); },
    updateCuisine: function (id, patch) {
      identifier(id, 'Cuisine ID');
      if (!cuisineIds.has(id)) fail('Cuisine was not found.');
      var value = cuisineProgress(mergeAllowed(cuisineProgress(state.cuisines[id] || {}), patch, ['status', 'count', 'lastTried', 'notes', 'interest']));
      mutate(function (next) { next.cuisines[id] = value; });
    },
    logCuisine: function (id, input) {
      identifier(id, 'Cuisine ID');
      if (!cuisineIds.has(id)) fail('Cuisine was not found.');
      input = object(input || {}, 'Tasting');
      var current = cuisineProgress(state.cuisines[id] || {});
      var tastingDate = date(input.date, 'Tasting date');
      var tastingNotes = text(input.notes, 10000, 'Tasting notes');
      if (current.count >= 1000000) fail('The tasting count has reached its limit.');
      current.count += 1;
      if (current.status !== 'favorite') current.status = 'tried';
      if (tastingDate && (!current.lastTried || tastingDate >= current.lastTried)) current.lastTried = tastingDate;
      if (tastingNotes) current.notes = current.notes ? current.notes + '\n' + tastingNotes : tastingNotes;
      mutate(function (next) { next.cuisines[id] = cuisineProgress(current); });
    },
    addPlan: function (input) { return addRecord('plans', input, plan, 'plan'); },
    updatePlan: function (id, patch) { editRecord('plans', id, patch, plan, ['title', 'description', 'itemIds', 'duration', 'scope', 'companions', 'status', 'notes', 'startDate', 'endDate', 'templateId']); },
    removePlan: function (id) { removeRecord('plans', id); },
    addBoard: function (input) { return addRecord('boards', input, board, 'board'); },
    updateBoard: function (id, patch) { editRecord('boards', id, patch, board, ['title', 'description', 'itemIds', 'palette']); },
    removeBoard: function (id) { removeRecord('boards', id); },
    updateSettings: function (patch) {
      var value = settings(mergeAllowed(state.settings, patch, ['theme', 'usFirst', 'earlierEffort', 'soloDefault', 'homeBase', 'tripLengths', 'workingDays', 'availableWindow', 'privateNotes']));
      mutate(function (next) { next.settings = value; });
    },
    updatePriorities: function (patch) {
      var value = priorityPreferences(mergeAllowed(state.priorities, patch, ['destinationIds', 'destinationRatings', 'repeatFamilies', 'coveredFamilies', 'localFirst']));
      mutate(function (next) { next.priorities = value; });
    },
    exportState: function () { return JSON.stringify(state, null, 2); },
    exportPublicProgress: function () {
      var publicState = { version: 1, completeSnapshot: true, items: {}, customItems: [], cuisines: {}, visits: [], plans: [], boards: [] };
      var publicIds = knownItems();
      publicState.customItems = state.customItems.map(function (r) {
        return { id: r.id, title: r.title, category: r.category, theme: r.theme, location: r.location, country: r.country, region: r.region, scope: r.scope, tags: r.tags.slice(), effort: r.effort, solo: r.solo };
      });
      Object.keys(state.items).forEach(function (id) {
        // Goal titles and locations can be published deliberately; notes and photos stay private.
        if (!publicIds.has(id)) return;
        var r = state.items[id];
        publicState.items[id] = { status: r.status, interest: r.interest, early: r.early, board: r.board };
      });
      Object.keys(state.cuisines).forEach(function (id) {
        var r = state.cuisines[id];
        publicState.cuisines[id] = { status: r.status, count: r.count, interest: r.interest };
      });
      publicState.visits = state.visits.map(function (r) {
        return { id: r.id, label: r.label, kind: r.kind, relatedIds: r.relatedIds.filter(function (id) { return publicIds.has(id); }) };
      });
      publicState.plans = state.plans.map(function (r) {
        return { id: r.id, title: r.title, itemIds: r.itemIds.filter(function (id) { return publicIds.has(id); }), duration: r.duration, scope: r.scope, companions: r.companions, status: r.status, templateId: r.templateId };
      });
      publicState.boards = state.boards.map(function (r) {
        return { id: r.id, title: r.title, itemIds: r.itemIds.filter(function (id) { return publicIds.has(id); }), palette: r.palette };
      });
      publicState.priorities = clone(state.priorities);
      return '/* Public progress only. Labels and plan / board titles are visible when published. Goal titles and locations are included. Private notes, photos, dates, and settings are omitted. */\nwindow.LIFE_PUBLIC_PROGRESS = ' + JSON.stringify(publicState, null, 2).replace(/</g, '\\u003c').replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029') + ';\n';
    },
    importState: function (input) {
      var value = input;
      if (typeof input === 'string') {
        if (input.length > MAX_BYTES) fail('This backup is too large (maximum 5 MB).');
        try { value = JSON.parse(input); } catch (error) { fail('This file is not valid JSON.'); }
      } else {
        // Check before cloning; circular objects are not valid JSON backups.
        try { if (JSON.stringify(input).length > MAX_BYTES) fail('This backup is too large (maximum 5 MB).'); }
        catch (error) { fail('This backup is not a valid bounded JSON object.'); }
      }
      var validated = validatedState(value);
      validated.updatedAt = new Date().toISOString();
      publish(validated);
      return { ok: true };
    }
  };
  Object.defineProperty(api, 'storageWarning', { enumerable: true, get: function () { return storageWarning; } });
  global.LifeStore = api;
})(window);
