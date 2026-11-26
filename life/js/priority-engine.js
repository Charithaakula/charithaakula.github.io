/* Read-only discovery rankings. No status, plan, or personal preference is changed here. */
(function (global) {
  'use strict';
  var model = global.LIFE_DISCOVERY_PRIORITIES || { families: [], destinations: [], categorySeeds: {}, itemOverrides: {}, locationQualifiers: {} };
  var catalog = Array.isArray(global.LIFE_CATALOG) ? global.LIFE_CATALOG : [];
  var cuisines = Array.isArray(global.LIFE_CUISINES) ? global.LIFE_CUISINES : [];
  var familyById = new Map(), familyByItem = new Map(), hubById = new Map(), hubsByItem = new Map(), cuisinesByItem = new Map();
  (model.families || []).forEach(function (family) {
    familyById.set(family.id, family);
    family.itemIds.forEach(function (id) { familyByItem.set(id, family); });
  });
  (model.destinations || []).forEach(function (hub) {
    hubById.set(hub.id, hub);
    hub.relatedItemIds.forEach(function (id) {
      if (!hubsByItem.has(id)) hubsByItem.set(id, []);
      hubsByItem.get(id).push(hub);
    });
  });
  cuisines.forEach(function (cuisine) {
    (cuisine.foods || []).forEach(function (id) {
      if (!cuisinesByItem.has(id)) cuisinesByItem.set(id, []);
      cuisinesByItem.get(id).push(cuisine);
    });
  });
  function clone(value) { return JSON.parse(JSON.stringify(value)); }
  function normalized(value) {
    var text = String(value || '').toLowerCase();
    if (text.normalize) text = text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    return text.replace(/[^a-z0-9]+/g, ' ').trim();
  }
  function rating(value) { return typeof value === 'number' && isFinite(value) && value >= 0 && value <= 5 ? value : 0; }
  function scopeName(scope) {
    if (!scope || /^(all|any|everywhere)$/i.test(scope)) return 'All';
    if (/^(usa|us|united states)$/i.test(scope)) return 'USA';
    if (/^(world|global)$/i.test(scope)) return 'World';
    if (/^(anywhere|local)$/i.test(scope)) return 'Anywhere';
    return scope;
  }
  function context() {
    var state = { items: {}, customItems: [], cuisines: {}, visits: [], settings: {}, priorities: {} };
    var items;
    if (global.LifeStore) {
      try { state = global.LifeStore.getState(); items = global.LifeStore.getItems(); } catch (ignored) { /* The static library still works without device storage. */ }
    }
    if (!items) items = catalog.map(function (item) { return Object.assign({}, item, { tracker: { status: 'curious', interest: 0, early: false, board: false } }); });
    var byId = new Map();
    items.forEach(function (item) {
      item.tracker = Object.assign({ status: 'curious', interest: 0, early: false, board: false }, item.tracker || {});
      byId.set(item.id, item);
    });
    var p = state.priorities || {};
    var chosen = Array.isArray(p.destinationIds) ? p.destinationIds.filter(function (id) { return hubById.has(id); }) : [];
    var settings = state.settings || {};
    var home = normalized(settings.homeBase || 'South Bay / San Francisco Bay Area');
    return {
      state: state, items: items, byId: byId,
      chosen: chosen,
      repeat: new Set(Array.isArray(p.repeatFamilies) ? p.repeatFamilies : []),
      covered: new Set(Array.isArray(p.coveredFamilies) ? p.coveredFamilies : []),
      localFirst: p.localFirst !== false,
      bayHome: /south bay|san francisco|bay area|san jose/.test(home),
      familyCache: new Map()
    };
  }
  function inScope(item, scope) {
    scope = scopeName(scope);
    if (scope === 'All') return true;
    if (scope === 'Anywhere') return item.scope === 'Anywhere';
    if (item.scope === scope || item.scope === 'Anywhere') return true;
    // A mixed-country example can have a specifically declared US context without changing the catalog record.
    return (hubsByItem.get(item.id) || []).some(function (hub) { return hub.scope === scope; });
  }
  function hubInScope(hub, scope) { scope = scopeName(scope); return scope === 'All' || hub.scope === scope; }
  function familyState(family, ctx) {
    if (ctx.familyCache.has(family.id)) return ctx.familyCache.get(family.id);
    var variants = family.variants.map(function (variant) {
      var item = ctx.byId.get(variant.itemId);
      return Object.assign({}, variant, { item: item || null, status: item ? item.tracker.status : 'missing' });
    }).filter(function (variant) { return variant.item; });
    var value = {
      variants: variants,
      completed: ctx.covered.has(family.id) || variants.some(function (variant) { return variant.completionEquivalent !== false && ['done', 'revisit'].indexOf(variant.status) >= 0; }),
      coveredLocally: ctx.covered.has(family.id),
      declined: variants.length > 0 && variants.every(function (variant) { return variant.status === 'pass'; }),
      repeatAllowed: ctx.repeat.has(family.id) || variants.some(function (variant) { return variant.status === 'revisit'; })
    };
    ctx.familyCache.set(family.id, value);
    return value;
  }
  function enrichedFamily(family, ctx) {
    var summary = familyState(family, ctx);
    return Object.assign({}, clone(family), {
      canonicalId: family.id,
      variants: summary.variants.map(function (variant) { return Object.assign({}, variant, { item: clone(variant.item) }); }),
      completed: summary.completed,
      coveredLocally: summary.coveredLocally,
      declined: summary.declined,
      repeatAllowed: summary.repeatAllowed,
      optionalRepeat: summary.completed && !summary.repeatAllowed
    });
  }
  function isLocalExample(item, family, ctx) {
    if (family && family.kind === 'generic-journey') return false;
    var override = (model.itemOverrides || {})[item.id];
    if (override && override.classification === 'dedicated-trip') return false;
    if (item.scope === 'Anywhere' && item.category !== 'Nature & wildlife' && item.category !== 'Journeys & transport') return true;
    if (ctx.bayHome && /san francisco|san jose|south bay|bay area|oakland|berkeley|palo alto|half moon bay|santa cruz|fremont|tiburon|sausalito|tomales|point reyes/i.test(item.location || '')) return true;
    if (ctx.bayHome && family && family.localOption && family.localOption.itemId === item.id) return true;
    return ctx.bayHome && (hubsByItem.get(item.id) || []).some(function (hub) { return hub.id === 'bay-area'; });
  }
  function localFamilyRepresentative(family, ctx) {
    var summary = familyState(family, ctx);
    var candidates = summary.variants.filter(function (variant) {
      return variant.status !== 'pass' && (variant.status !== 'done' || summary.repeatAllowed) && isLocalExample(variant.item, family, ctx);
    });
    candidates.sort(function (a, b) {
      var ar = rating(a.item.tracker.interest), br = rating(b.item.tracker.interest);
      if (ar !== br) return br - ar;
      if (family.localOption && family.localOption.itemId) {
        if (a.itemId === family.localOption.itemId) return -1;
        if (b.itemId === family.localOption.itemId) return 1;
      }
      var preferred = family.preferredItemIds || []; var ai = preferred.indexOf(a.itemId), bi = preferred.indexOf(b.itemId); return (ai < 0 ? 1000 : ai) - (bi < 0 ? 1000 : bi);
    });
    return candidates.length ? candidates[0].item : null;
  }
  function guideFor(cuisineId) { return (global.LIFE_CUISINE_GUIDES || {})[cuisineId] || {}; }
  function verifiedVenues(cuisineId) {
    var list = guideFor(cuisineId).bayArea;
    return Array.isArray(list) ? list.filter(function (venue) { return venue.verified === true; }) : [];
  }
  function simpleFoodTaste(item) {
    if (item.category !== 'Food & drink') return false;
    var title = item.title || '';
    return /^(taste|try|eat|share|compare|enjoy)\b/i.test(title) && !/learn|make|watch|cook|bake|prepar|shap|fold|roll|workshop|class|artisan|practitioner|festival|neighborhood|route|farm|market|vetted host|community/i.test(title);
  }
  function genericCuisineExposure(item) {
    return item.category === 'Food & drink' && /cuisine exposure|regional vegetarian dishes|try .*cuisines|explore .*cuisines/i.test(item.title || '');
  }
  function foodLocalEvidence(item, ctx) {
    if (!ctx.bayHome || !simpleFoodTaste(item)) return null;
    var choices = cuisinesByItem.get(item.id) || [];
    for (var i = 0; i < choices.length; i += 1) {
      var cuisine = choices[i], venues = verifiedVenues(cuisine.id);
      if (!venues.length) continue;
      var named = normalized(item.title);
      var menuMatch = venues.some(function (venue) {
        return venue.menuVerified === true && Array.isArray(venue.dishes) && venue.dishes.some(function (dish) {
          var raw = typeof dish === 'string' ? dish : dish.name;
          var text = normalized(String(raw || '').replace(/\([^)]*\)/g, '')).replace(/\bma po tofu\b/g, 'mapo tofu');
          return text.length > 3 && named.indexOf(text) >= 0;
        });
      });
      return {
        cuisine: cuisine, venues: venues, menuMatch: menuMatch,
        label: menuMatch ? 'Local guide evidence includes the named dish; confirm its exact variation and current availability.' : 'This cuisine has a documented local entry point; the particular dish still needs menu or provider research.'
      };
    }
    return null;
  }
  function classificationFor(item, family, ctx, hubs) {
    var override = (model.itemOverrides || {})[item.id];
    if (override) return override.classification;
    if (isLocalExample(item, family, ctx)) return 'local-option';
    if (family) return family.classification;
    if (hubs.length) {
      if (item.category === 'Places & heritage' || item.category === 'Nature & wildlife' || /neighborhood|hawker|food culture|food capital/i.test(item.title || '')) return 'trip-anchor';
      return 'while-there';
    }
    return 'standalone';
  }
  function itemInfo(item, ctx) {
    var tracker = item.tracker, family = familyByItem.get(item.id) || null;
    var summary = family ? familyState(family, ctx) : null;
    var hubs = hubsByItem.get(item.id) || [];
    var personal = rating(tracker.interest);
    var intentionalRepeat = tracker.status === 'revisit' || summary && summary.repeatAllowed || summary && personal >= 4 && tracker.status === 'want';
    var selfDone = tracker.status === 'done' || tracker.status === 'revisit';
    var completed = Boolean(summary && summary.completed || selfDone);
    var optionalRepeat = completed && !intentionalRepeat;
    var explicitIntent = personal >= 4 || tracker.status === 'want' || tracker.status === 'revisit' || Boolean(summary && summary.repeatAllowed);
    var food = foodLocalEvidence(item, ctx);
    var localContext = isLocalExample(item, family, ctx);
    var local = localContext || Boolean(food && food.menuMatch);
    var localDeferred = ctx.localFirst && !explicitIntent && !localContext && (food && food.menuMatch || !local && (
      family && family.kind === 'activity' && family.localOption && (ctx.bayHome || family.localOption.itemId && ctx.byId.get(family.localOption.itemId) && ctx.byId.get(family.localOption.itemId).scope === 'Anywhere') || food && genericCuisineExposure(item)
    ));
    var seed = (model.categorySeeds || {})[item.category] || [];
    var seedIndex = seed.indexOf(item.id);
    var editorial = seedIndex >= 0 ? 93 - seedIndex * 0.65 : 66;
    if (family && local && ctx.localFirst) {
      family.itemIds.forEach(function (id) {
        var variant = ctx.byId.get(id);
        var list = variant && (model.categorySeeds || {})[variant.category] || [];
        var index = list.indexOf(id);
        if (index >= 0) editorial = Math.max(editorial, 93 - index * 0.65);
      });
    }
    var reasons = [];
    if (personal > 0) reasons.push('Your ' + personal + '/5 interest replaces the editorial starting score.');
    else {
      reasons.push(seedIndex >= 0 ? 'An editorial category starting point; the order is a suggestion.' : 'An unranked library option with an editable starting score.');
      if (tracker.status === 'want') editorial += 5;
      if (ctx.chosen.some(function (id) { return hubs.some(function (hub) { return hub.id === id; }); })) { editorial += 4; reasons.push('It has a context at a destination you selected.'); }
      if (local && ctx.localFirst) { editorial += 8; reasons.push('Start with its local or home-compatible example.'); }
      if (family && (family.preferredItemIds || []).indexOf(item.id) >= 0) editorial += 2;
      var linkedCuisines = cuisinesByItem.get(item.id) || [];
      if (linkedCuisines.some(function (cuisine) { return ((ctx.state.cuisines || {})[cuisine.id] || {}).status === 'new'; })) { editorial += 5; reasons.push('You explicitly marked a linked cuisine new to you.'); }
      var cuisineInterest = linkedCuisines.reduce(function (max, cuisine) { return Math.max(max, rating(((ctx.state.cuisines || {})[cuisine.id] || {}).interest)); }, 0);
      if (cuisineInterest) { editorial += cuisineInterest; reasons.push('Your linked cuisine interest contributes without treating that cuisine as completed.'); }
      if (optionalRepeat) editorial -= 32;
      if (localDeferred && family) editorial -= 16;
    }
    var classification = classificationFor(item, family, ctx, hubs);
    if (localDeferred) {
      classification = 'local-option';
      reasons.push(family ? 'Start with the local first-skill approach; the named travel setting remains an intentional alternative.' : food.label);
    } else if (food && food.menuMatch) {
      classification = !localContext && explicitIntent ? 'while-there' : 'local-option'; reasons.push(food.label);
    }
    if (food && !food.menuMatch && !localDeferred) reasons.push(food.label + ' It is a research lead, not evidence that this exact goal is available locally.');
    if (family) reasons.push(family.reason);
    if (optionalRepeat) {
      classification = 'optional-repeat';
      reasons.push(summary && summary.coveredLocally ? 'You marked this canonical goal covered. Named travel variants keep their own status.' : 'A version is already completed; another is an optional repeat.');
    }
    if (tracker.status === 'revisit') reasons.push('You explicitly marked this experience for a revisit.');
    var override = (model.itemOverrides || {})[item.id];
    if (override) reasons.push(override.reason);
    if ((model.locationQualifiers || {})[item.id]) reasons.push(model.locationQualifiers[item.id]);
    var destination = hubs.find(function (hub) { return ctx.chosen.indexOf(hub.id) >= 0; }) || hubs[0] || null;
    var score = personal > 0 ? personal * 20 : Math.max(0, Math.min(96, editorial));
    return {
      item: clone(item), score: Math.round(score * 10) / 10,
      reason: reasons.join(' '), canonicalId: family ? family.id : 'item:' + item.id,
      classification: classification,
      bundleAt: localDeferred ? null : destination ? destination.id : null,
      variants: family ? enrichedFamily(family, ctx).variants : [],
      optionalRepeat: optionalRepeat, repeatAllowed: Boolean(intentionalRepeat),
      deferredToLocal: Boolean(localDeferred),
      localApproach: family && family.localOption ? clone(family.localOption) : food ? { kind: 'cuisine-exposure', cuisineId: food.cuisine.id, label: food.label, menuMatch: food.menuMatch } : null,
      family: family ? { id: family.id, title: family.title, kind: family.kind } : null,
      specificPlace: Boolean(family && family.kind === 'same-place' || !family && hubs.length && (item.category === 'Places & heritage' || item.category === 'Nature & wildlife')),
      eligible: tracker.status !== 'pass' && !(summary && summary.declined) && !(selfDone && !intentionalRepeat)
    };
  }
  function compareItems(a, b) { return b.score - a.score || a.item.title.localeCompare(b.item.title) || a.item.id.localeCompare(b.item.id); }
  function rankCategory(category, scope, theme) {
    var ctx = context();
    return ctx.items.filter(function (item) {
      return (!category || category === 'All' || item.category === category) && inScope(item, scope) && (!theme || theme === 'All' || String(item.theme || '').toLowerCase().indexOf(String(theme).toLowerCase()) >= 0);
    }).map(function (item) { return itemInfo(item, ctx); }).filter(function (entry) { return entry.eligible; }).sort(compareItems);
  }
  function visitedContext(hub, ctx) {
    var aliases = (hub.visitedAliases || []).map(normalized);
    var visited = (ctx.state.visits || []).filter(function (visit) {
      if (visit.kind === 'country') return false;
      var label = normalized((visit.label || '') + ' ' + (visit.location || ''));
      return aliases.some(function (alias) { return label.indexOf(alias) >= 0; });
    });
    if (!visited.length) return { familiar: false, label: 'No specific visit recorded; this is not a claim that the place is new to you.', visitIds: [] };
    return { familiar: true, label: 'A city/park visit is recorded; individual nearby goals retain their own progress.', visitIds: visited.map(function (v) { return v.id; }) };
  }
  function rankDestinationsWithContext(scope, ctx) {
    return (model.destinations || []).filter(function (hub) { return hubInScope(hub, scope); }).map(function (hub) {
      var visits = visitedContext(hub, ctx);
      var personal = rating((ctx.state.priorities || {}).destinationRatings && ctx.state.priorities.destinationRatings[hub.id]);
      var viable = hub.relatedItemIds.map(function (id) { return ctx.byId.get(id); }).filter(Boolean).map(function (item) { return itemInfo(item, ctx); }).filter(function (entry) { return entry.eligible; });
      var knownCuisine = (ctx.state.cuisines || {});
      var newCount = hub.cuisineIds.filter(function (id) { return (knownCuisine[id] || {}).status === 'new'; }).length;
      var highInterest = viable.reduce(function (max, entry) { return Math.max(max, rating(entry.item.tracker.interest)); }, 0);
      var score = hub.editorialScore;
      var reasons = [hub.reason];
      if (personal > 0) { score = personal * 20; reasons.unshift('Your ' + personal + '/5 destination rating replaces the editorial starting score.'); }
      else {
        if ((ctx.state.settings || {}).usFirst !== false && hub.scope === 'USA') { score += 4; reasons.push('The US-first preference adds a modest editorial preference.'); }
        if (visits.familiar) { score -= hub.id === 'bay-area' ? 3 : 9; reasons.push('Familiar-place context lowers only the unrated novelty score; nearby goals are not marked done.'); }
        if (highInterest > 0) { score += highInterest * 0.8; reasons.push('Your related item interest contributes to this unrated destination.'); }
        if (newCount) { score += Math.min(3, newCount); reasons.push('You explicitly marked a linked cuisine new to you.'); }
        score = Math.max(0, Math.min(96, score));
      }
      return {
        destination: clone(hub), score: Math.round(score * 10) / 10, reason: reasons.join(' '), visitedContext: visits,
        coverage: { itemCount: viable.length, canonicalCount: new Set(viable.map(function (entry) { return entry.canonicalId; })).size, cuisineCount: hub.cuisineIds.length }
      };
    }).sort(function (a, b) { return b.score - a.score || a.destination.title.localeCompare(b.destination.title); });
  }
  function rankDestinations(scope) { return rankDestinationsWithContext(scope, context()); }
  function localFamilyEntry(family, ctx) {
    var representative = localFamilyRepresentative(family, ctx);
    return {
      canonicalId: family.id, family: { id: family.id, title: family.title, kind: family.kind },
      item: representative ? clone(representative) : null,
      label: family.localOption ? family.localOption.label : family.title,
      score: representative ? itemInfo(representative, ctx).score : 75,
      reason: 'A local first-experience approach can avoid a dedicated duplicate trip. Instructor searches are examples, not verified bookings.',
      variants: enrichedFamily(family, ctx).variants,
      localApproach: clone(family.localOption), classification: 'local-option', bundleAt: ctx.chosen.indexOf('bay-area') >= 0 ? 'bay-area' : null
    };
  }
  function bundle(destinationIds, scope) {
    var ctx = context();
    var requested = Array.isArray(destinationIds) ? destinationIds : ctx.chosen;
    var chosenIds = Array.from(new Set(requested)).filter(function (id) { return hubById.has(id) && hubInScope(hubById.get(id), scope); });
    ctx.chosen = chosenIds;
    var destinations = rankDestinationsWithContext(scope, ctx).filter(function (entry) { return chosenIds.indexOf(entry.destination.id) >= 0; });
    var candidates = new Map(), locals = new Map(), skipped = new Map(), dedicated = new Map(), declined = new Set();
    destinations.forEach(function (entry) {
      var hub = entry.destination;
      hub.relatedItemIds.forEach(function (id) {
        var item = ctx.byId.get(id);
        if (!item || !inScope(item, scope)) return;
        var info = itemInfo(item, ctx), family = familyByItem.get(id);
        if (item.tracker.status === 'pass' || family && familyState(family, ctx).declined) { declined.add(info.canonicalId); return; }
        if (info.optionalRepeat) {
          if (!skipped.has(info.canonicalId)) skipped.set(info.canonicalId, { canonicalId: info.canonicalId, family: info.family, item: info.item, variants: info.variants, reason: 'Already covered/completed; enable an intentional repeat to add a variant.' });
          return;
        }
        if (!info.eligible) return;
        if (info.deferredToLocal) {
          if (family && family.localOption) locals.set(family.id, localFamilyEntry(family, ctx));
          else if (info.localApproach) locals.set(info.canonicalId, { canonicalId: info.canonicalId, item: null, label: info.localApproach.label, localApproach: info.localApproach, classification: 'local-option', reason: info.reason, variants: info.variants });
          return;
        }
        info.bundleAt = hub.id;
        if (info.classification === 'dedicated-trip') { dedicated.set(info.canonicalId, info); return; }
        if (!candidates.has(info.canonicalId)) candidates.set(info.canonicalId, []);
        candidates.get(info.canonicalId).push(info);
      });
    });
    var destinationScores = {};
    destinations.forEach(function (entry) { destinationScores[entry.destination.id] = entry.score; });
    var representatives = [];
    candidates.forEach(function (entries) {
      entries.sort(function (a, b) {
        var ar = a.variants.find(function (v) { return v.itemId === a.item.id; });
        var br = b.variants.find(function (v) { return v.itemId === b.item.id; });
        var safe = (br && br.beginner ? 1 : 0) - (ar && ar.beginner ? 1 : 0);
        if (rating(a.item.tracker.interest) || rating(b.item.tracker.interest)) return compareItems(a, b) || safe;
        var family = familyByItem.get(a.item.id);
        if (family && family.kind === 'activity') return safe || (destinationScores[b.bundleAt] || 0) - (destinationScores[a.bundleAt] || 0) || compareItems(a, b);
        return b.score - a.score || safe || a.item.title.localeCompare(b.item.title);
      });
      representatives.push(entries[0]);
    });
    representatives.sort(compareItems);
    var items = [], included = new Set(), byHubCount = {}, omitted = 0;
    function include(entry) {
      if (included.has(entry.canonicalId)) return;
      if ((byHubCount[entry.bundleAt] || 0) >= 12 || items.length >= 180) { omitted += 1; return; }
      included.add(entry.canonicalId); byHubCount[entry.bundleAt] = (byHubCount[entry.bundleAt] || 0) + 1; items.push(entry);
    }
    // Keep a real destination-specific anchor visible when one is available, then fill with ranked angles.
    destinations.forEach(function (entry) {
      var anchor = representatives.find(function (item) { return item.bundleAt === entry.destination.id && item.specificPlace; });
      if (anchor) include(anchor);
    });
    representatives.forEach(include);
    items.sort(compareItems);
    return {
      destinations: destinations,
      items: items,
      coverage: {
        itemCount: items.length, canonicalCount: included.size,
        representedFamilyIds: Array.from(included).filter(function (id) { return familyById.has(id); }),
        skippedRepeats: Array.from(skipped.values()),
        dedicatedCandidates: Array.from(dedicated.values()).sort(compareItems),
        availableLocally: Array.from(locals.values()).sort(function (a, b) { return (b.score || 0) - (a.score || 0); }),
        declinedCanonicalIds: Array.from(declined),
        deferredCount: locals.size, optionalRepeatCount: skipped.size,
        omittedCount: omitted,
        limitNote: omitted ? 'This is a starter bundle capped at 12 angles per hub and 180 total; it does not claim full catalog coverage.' : 'This is a starter bundle of distinct angles, not a booking-ready schedule or completion checklist.'
      }
    };
  }
  function cuisineRecommendations(scope) {
    var ctx = context();
    return cuisines.map(function (cuisine) {
      var progress = (ctx.state.cuisines || {})[cuisine.id] || {}, guide = guideFor(cuisine.id);
      var personal = rating(progress.interest), venues = verifiedVenues(cuisine.id);
      var editorialRank = typeof guide.editorialRank === 'number' ? guide.editorialRank : 70;
      var score = personal > 0 ? personal * 20 : Math.max(35, 86 - Math.min(99, editorialRank) * 0.45);
      var novelty = (progress.count || 0) > 0 || ['tried', 'favorite'].indexOf(progress.status) >= 0 ? 'deepening' : progress.status === 'new' ? 'new' : 'untracked';
      var reason = personal > 0 ? 'Your ' + personal + '/5 cuisine interest replaces the editorial order.' : 'Editorial cuisine discovery order; exposure is not guessed.';
      if (novelty === 'new') { if (!personal) score += 6; reason += ' You explicitly marked this cuisine new to you.'; }
      else if (novelty === 'deepening') { if (!personal) score = Math.min(score, Math.max(10, 30 - Math.min(20, Math.max(0, progress.count || 0) * 2))); reason += ' This is deepening or revisiting a familiar cuisine. Unrated familiar families move below untracked introductions; a personal interest rating can choose them again.'; }
      else reason += ' Your history is untracked; this is not labeled new to you.';
      if (venues.length && ctx.bayHome && ctx.localFirst) { if (!personal) score += 8; reason += ' The local guide documents an official venue; particular dish evidence is separate.'; }
      else reason += ' Local discovery remains a research/search option, not verified availability.';
      var hubs = (model.destinations || []).filter(function (hub) { return hub.cuisineIds.indexOf(cuisine.id) >= 0 && hubInScope(hub, scope); }).map(function (hub) { return hub.id; });
      return { cuisine: clone(cuisine), score: Math.round(Math.min(100, score) * 10) / 10, reason: reason, novelty: novelty, classification: venues.length && ctx.bayHome && ctx.localFirst ? 'local-option' : hubs.length ? 'while-there' : 'standalone', bundleAt: hubs, verifiedLocalOptions: clone(venues) };
    }).sort(function (a, b) { return b.score - a.score || a.cuisine.name.localeCompare(b.cuisine.name); });
  }
  global.LifePriorities = {
    rankCategory: rankCategory,
    rankDestinations: rankDestinations,
    getFamily: function (itemId) { var family = familyByItem.get(itemId); return family ? enrichedFamily(family, context()) : null; },
    bundle: bundle,
    cuisineRecommendations: cuisineRecommendations
  };
})(window);
