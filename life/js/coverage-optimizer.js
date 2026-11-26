/* Read-only finite-pool opportunity coverage. This engine never completes a goal,
 * cuisine, place, plan, or learning project. Interactive results are heuristic;
 * a certificate is used only when the full normalized finite problem matches. */
(function (global) {
  'use strict';
  const CATEGORIES = ['Nature & wildlife','Places & heritage','Journeys & transport','Adventure & movement','Food & drink','Arts & living culture','Learning & making','Everyday & local','Connection & contribution','Personal life & reflection'];
  const clone = x => JSON.parse(JSON.stringify(x));
  const unique = x => Array.from(new Set(x));
  const norm = x => String(x || '').normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim().replace(/\bma po\b/g,'mapo');
  const slug = x => norm(x).replace(/ /g,'-');
  const clamp = (x,a,b,d) => Number.isFinite(Number(x)) ? Math.max(a,Math.min(b,Number(x))) : d;
  const stable = x => JSON.stringify(sortObject(x));
  function sortObject(x) { if (Array.isArray(x)) return x.map(sortObject); if (x && typeof x==='object') { const y={};Object.keys(x).sort().forEach(k=>{y[k]=sortObject(x[k]);});return y;}return x; }
  function options(input) {
    input=input||{};
    return {tripLength:['5','9'].includes(String(input.tripLength))?String(input.tripLength):'mix',target:clamp(input.target,.5,1,.85),categoryFloor:clamp(input.categoryFloor,0,1,.8),anchorFloor:clamp(input.anchorFloor,0,1,.8),localHoursBudget:clamp(input.localHoursBudget,0,1000,160),annualPto:clamp(input.annualPto,1,100,20),globalBreadth:input.globalBreadth===false||input.globalBreadth==='none'?'none':'regions',maxTrips:input.maxTrips==null?null:Math.floor(clamp(input.maxTrips,0,100,100)),maxPto:input.maxPto==null?null:clamp(input.maxPto,0,1000,1000),maxDays:input.maxDays==null?null:clamp(input.maxDays,0,2000,2000)};
  }
  function source() {
    const catalog=global.LifeStore?global.LifeStore.getItems():(global.LIFE_CATALOG||[]).map(i=>({...i,tracker:{status:'curious',interest:0,early:false}}));
    return {items:new Map(catalog.map(i=>[i.id,i])),cuisineProgress:global.LifeStore?(global.LifeStore.getState().cuisines||{}):{},hubs:(global.LIFE_DISCOVERY_PRIORITIES||{}).destinations||[],guides:global.LIFE_CUISINE_GUIDES||{},points:{...(global.LIFE_TRIP_ITEM_LOCATIONS||{}),...(global.LIFE_WORLD_ITEM_LOCATIONS||{}),...(global.LIFE_LOCATION_CORRECTIONS||{})},api:global.LifePriorities};
  }
  function unavailable(goal) {
    const id=goal.itemId||'',t=norm(goal.title);
    if (['LA-1102','LA-0614'].includes(id)||/total solar eclipse/.test(t)) return 'A specific totality date/path and feasible itinerary are required; undated routes do not cover an eclipse.';
    if (id==='LA-0247') return 'Half Dome needs a separate permit, conditioning and seasonal feasibility plan; ordinary park visits do not cover the ascent.';
    if (['LA-1284','LA-1134','LA-1255'].includes(id)||['finish-short-story','first-instrument-song'].includes(goal.familyId)||/six months|mastery|become fluent|fluency|100 days|long term|complete documentary/.test(t)) return 'A multiweek project, sustained practice or longer calendar commitment needs its own learning/routine plan; a short session is not equivalent.';
    if (goal.familyId==='overnight-train') return 'The generic sleeper goal lacks a specific line, dates and overnight allocation; a daytime train does not cover it.';
    if (id==='LA-1580') return 'A verified restaurant does not prove a vegetarian tea-salad cooking lesson; a specific teacher/class still needs research.';
    if (id==='LA-1101') return 'A particular dark-sky site, night conditions and overnight opportunity need to be chosen; a generic park or city pin is insufficient.';
    return '';
  }
  function hours(goal) {
    const id=goal.itemId||'',t=norm(goal.title);
    const exact={'LA-1676':8,'LA-1272':5,'LA-0641':4,'LA-1168':6,'LA-1169':4,'LA-1717':3,'LA-1279':2,'LA-1147':3,'LA-1754':4,'LA-1220':6,'LA-1345':16,'LA-1216':3,'LA-0991':14,'LA-0465':8,'LA-0463':8,'LA-1492':8,'LA-1016':8,'LA-0861':16,'LA-0950':8,'LA-0141':4,'LA-0278':6,'LA-0664':6};
    if (exact[id]) return exact[id];
    if (goal.kind==='cuisine') return 2;
    if (/day of quiet|day in a beautiful library|unhurried reading/.test(t)) return 6;
    if (/phone free weekend|car free.*weekend/.test(t)) return 16;
    if (/sunset|letter.*gratitude|own name/.test(t)) return 1;
    if (/interview.*elder|parents or elders/.test(t)) return 2;
    if (goal.category==='Nature & wildlife') return 4;
    if (goal.category==='Places & heritage') return 3;
    if (goal.category==='Journeys & transport') return 4;
    if (goal.category==='Adventure & movement') return 3;
    if (goal.category==='Food & drink') return /learn|make|cook|technique|workshop/.test(t)?4:1.5;
    if (goal.category==='Arts & living culture') return /museum/.test(t)?3:2.5;
    if (goal.category==='Learning & making') return 3;
    if (goal.category==='Everyday & local') return 2;
    if (goal.category==='Connection & contribution') return 2;
    return 1.5;
  }
  function experienceGoal(row,group,src) {
    const item=row.item,family=src.api.getFamily(item.id),canonical=row.canonicalId||'item:'+item.id;
    let variants=family?(family.variants||[]).filter(v=>v.completionEquivalent!==false&&v.bundleEligible!==false&&v.status!=='pass'&&v.item).map(v=>v.itemId):[item.id];
    const explicit=family?(family.variants||[]).filter(v=>v.item&&v.status!=='pass'&&(v.status==='revisit'||v.status==='want'&&Number(v.item.tracker.interest)>=4)).map(v=>v.itemId):[];
    if(explicit.length)variants=variants.filter(id=>explicit.includes(id));
    const weight=Math.round(((row.score||66)+(item.tracker&&item.tracker.early?4:0)+(item.effort==='demanding'?2:item.earlyReason?1:0))*10)/10;
    const goal={id:'exp:'+canonical,kind:'experience',title:family?family.title:item.title,category:item.category,weight,itemId:item.id,familyId:family?family.id:null,canonicalId:canonical,variantItemIds:unique(variants),groups:[group],classification:row.classification,explicitContext:explicit.length>0,localApproach:row.localApproach||null,deferredToLocal:!!row.deferredToLocal,early:!!(item.tracker&&item.tracker.early),effort:item.effort||'unknown',earlyReason:item.earlyReason||'',sourceTitle:item.title};
    goal.unavailableReason=unavailable(goal);goal.estimatedHours=hours(goal);return goal;
  }
  function universe(opts,src) {
    const byId=new Map(),groups=[],anchorOmissions=[];
    function put(goal,group) { if (byId.has(goal.id)) {const old=byId.get(goal.id);old.groups=unique(old.groups.concat(group));old.weight=Math.max(old.weight,goal.weight);return old;}byId.set(goal.id,goal);return goal; }
    CATEGORIES.forEach(category=>{
      const group='cat:'+slug(category),seen=new Set();
      const rows=src.ranks.get(category).filter(r=>!r.optionalRepeat||r.repeatAllowed).filter(r=>{if(seen.has(r.canonicalId))return false;seen.add(r.canonicalId);return true;}).slice(0,10);
      rows.forEach(row=>put(experienceGoal(row,group,src),group));
      groups.push({id:group,title:category,kind:'category',goalIds:rows.map(r=>'exp:'+r.canonicalId),floor:opts.categoryFloor});
    });
    const cuisines=src.api.cuisineRecommendations('All').filter(row=>row.novelty!=='deepening'||Number((src.cuisineProgress[row.cuisine.id]||{}).interest)>=4).slice(0,10);
    cuisines.forEach(row=>{const goal={id:'cu:'+row.cuisine.id,kind:'cuisine',title:(row.novelty==='deepening'?'Deepen ':'Explore ')+row.cuisine.name+' cuisine',category:'Cuisine introductions',weight:row.score,cuisineId:row.cuisine.id,groups:['cuisines'],classification:row.classification,novelty:row.novelty,estimatedHours:2,unavailableReason:''};put(goal,'cuisines');});
    groups.push({id:'cuisines',title:'Cuisine introduction opportunities',kind:'cuisine',goalIds:cuisines.map(r=>'cu:'+r.cuisine.id),floor:opts.categoryFloor});
    const ranked=src.api.rankDestinations('World'),anchors=ranked.slice(0,10),breadth=[];
    const anchorRows=hub=>hub.relatedItemIds.map(id=>src.items.get(id)).filter(Boolean).map(item=>(src.ranks.get(item.category)||[]).find(r=>r.item.id===item.id)).filter(r=>r&&r.eligible&&(!r.optionalRepeat||r.repeatAllowed)&&(r.specificPlace||r.classification==='trip-anchor'&&!r.deferredToLocal||['Places & heritage','Nature & wildlife'].includes(r.item.category)&&r.item.scope==='World')).sort((a,b)=>b.score-a.score);
    if (opts.globalBreadth==='regions') {
      const predicates={Africa:i=>i.region==='Africa',Oceania:i=>i.region==='Oceania','South America':i=>i.region==='South America','South Asia':i=>['India','Nepal','Bhutan','Sri Lanka','Bangladesh','Pakistan'].includes(i.country)};
      Object.entries(predicates).forEach(([name,predicate])=>{const row=ranked.find(r=>anchorRows(r.destination).some(x=>predicate(x.item))); if(row){anchors.push(row);breadth.push({name,row});}});
    }
    const anchorGoalByHub=new Map();
    unique(anchors.map(r=>r.destination.id)).forEach(id=>{
      const hub=src.hubs.find(h=>h.id===id),rank=ranked.find(r=>r.destination.id===id);if(!hub)return;
      const rows=anchorRows(hub);
      const row=rows[0];
      if(!row)anchorOmissions.push({hubId:id,title:hub.title,reason:'No eligible destination-specific source anchor was found; no goal was invented.'});
      if(row){const goal=experienceGoal(row,'global-anchors',src);goal.anchorHubIds=[id];goal.weight=Math.max(goal.weight,rank.score);const actual=put(goal,'global-anchors');actual.anchorHubIds=unique((actual.anchorHubIds||[]).concat(id));anchorGoalByHub.set(id,goal.id);}
    });
    groups.push({id:'global-anchors',title:'Top international and regional breadth anchors',kind:'global-anchor',goalIds:unique(Array.from(anchorGoalByHub.values())),floor:opts.anchorFloor});
    breadth.forEach(({name,row})=>{const id=anchorGoalByHub.get(row.destination.id);if(id){const group='breadth:'+slug(name);byId.get(id).groups.push(group);groups.push({id:group,title:name+' anchor',kind:'global-anchor',goalIds:[id],floor:1});}});
    return {goals:Array.from(byId.values()),groups,anchorOmissions};
  }
  function namedDishMatch(goal,guide) {
    if (!goal.itemId||/learn|make|cook|shape|technique|prepar/.test(norm(goal.sourceTitle||goal.title))) return false;
    const text=norm(goal.sourceTitle||goal.title);
    return (guide.bayArea||[]).some(v=>v.verified===true&&v.menuVerified===true&&(v.dishes||[]).some(d=>{const term=norm(String(typeof d==='string'?d:d.name).replace(/\([^)]*\)/g,'').split(/ – | — | - /)[0]).replace(/^(vegetarian|vegan|classic|traditional) /,'');return term.length>3&&text.includes(term);}));
  }
  function localOptions(goals,src) {
    const result=[];
    goals.filter(g=>g.kind==='cuisine').forEach(g=>{
      const guide=src.guides[g.cuisineId]||{},venues=(guide.bayArea||[]).filter(v=>v.verified===true);
      if(!venues.length)return;
      const cuisine=(global.LIFE_CUISINES||[]).find(c=>c.id===g.cuisineId),covered=[g.id],itemIds=[];
      goals.filter(x=>x.category==='Food & drink'&&!x.unavailableReason&&cuisine&&(cuisine.foods||[]).includes(x.itemId)&&namedDishMatch(x,guide)).forEach(x=>{covered.push(x.id);itemIds.push(x.itemId);});
      result.push({id:'local:'+g.id,title:g.title+' near home',hours:2,itemIds,cuisineIds:[g.cuisineId],goalIds:covered,verification:'Official local venue/location is documented. Named-dish credit is included only when the verified menu matches; ingredients and current availability still need checking.',opportunityOnly:true,venues:venues.map(v=>({name:v.name,city:v.city,url:v.url||v.website||v.source||''})),evidence:covered.map(id=>({goalId:id,type:id===g.id?'cuisine introduction opportunity':'verified named-dish opportunity'}))});
    });
    goals.filter(g=>g.kind==='experience'&&!g.unavailableReason).forEach(g=>{
      if(result.some(l=>l.goalIds.includes(g.id)))return;
      const item=src.items.get(g.itemId),family=g.familyId?src.api.getFamily(g.itemId):null;
      const local=g.classification==='local-option'||item&&item.scope==='Anywhere'&&!['Nature & wildlife','Journeys & transport'].includes(item.category);
      if(!local||g.groups.includes('global-anchors'))return;
      if(g.explicitContext&&item.scope!=='Anywhere'&&!/san francisco|south bay|bay area|san jose|byron|monterey/i.test(item.location||''))return;
      const approach=g.localApproach||family&&family.localOption||null;
      let ids=[g.itemId];
      if(g.deferredToLocal&&approach&&approach.kind==='instructor-search')ids=approach.itemId?[approach.itemId]:[];
      else if(family&&family.localOption&&family.localOption.itemId)ids=[family.localOption.itemId];
      // Generic car-free introduction uses the actual weekend variant, not a
      // stronger week-long source statement. Its two-day context stays explicit.
      if(g.familyId==='car-free-city-introduction')ids=['LA-0711'];
      const localHours=g.familyId==='car-free-city-introduction'?4:g.estimatedHours;
      const cuisineId=approach&&approach.cuisineId,guide=cuisineId&&src.guides[cuisineId]||{},named=(guide.namedGoalEvidence||{})[g.itemId];
      const localVenues=(guide.bayArea||[]).filter(v=>v.verified===true).map(v=>({name:v.name,city:v.city,url:v.url||v.website||v.source||''}));
      const dishNote=named?'Official local evidence: '+(named.confirmed||[]).join(', ')+'. Still to confirm: '+(named.variationPending||[]).join(', ')+'. This is a planning opportunity, not completion.':null;
      result.push({id:'local:'+g.id,title:g.title,hours:localHours,itemIds:ids,cuisineIds:cuisineId?[cuisineId]:[],venues:localVenues,goalIds:[g.id],minCalendarDays:g.familyId==='car-free-city-introduction'||g.itemId==='LA-1345'?2:1,verification:dishNote|| (g.familyId==='car-free-city-introduction'?'Weekend car-free introduction; this does not complete the stronger week-long source variant.':approach&&approach.verification||'A local/home-compatible planning opportunity. The actual provider, permission, tools, calendar window and outcome remain to be arranged.'),opportunityOnly:true,searchUrl:approach&&approach.searchUrl||'',evidence:[{goalId:g.id,itemId:ids[0]||null,sourceItemId:g.itemId,canonicalId:g.canonicalId,type:ids.length?'explicit local source/variant':'canonical local approach; provider research required'}]});
    });
    return result;
  }
  function distance(a,b) {const r=Math.PI/180,dlat=(a.lat-b.lat)*r,dlon=(a.lon-b.lon)*r,x=Math.sin(dlat/2)**2+Math.cos(a.lat*r)*Math.cos(b.lat*r)*Math.sin(dlon/2)**2;return 6371*2*Math.atan2(Math.sqrt(x),Math.sqrt(1-x));}
  function evidenceFor(goal,template,src) {
    if(goal.unavailableReason)return null;
    const hubs=src.hubs.filter(h=>template.hubIds.includes(h.id));
    if(goal.kind==='cuisine'&&src.localCuisineIds.has(goal.cuisineId))return null;
    if(goal.kind==='cuisine')return hubs.some(h=>(h.cuisineIds||[]).includes(goal.cuisineId))?{cuisineId:goal.cuisineId,itemId:null,hours:2,base:0,type:'explicit cuisine introduction slot; not completion'}:null;
    const allowed=new Set([...(template.candidateItemIds||[]),...hubs.flatMap(h=>h.relatedItemIds)]);
    const candidates=goal.variantItemIds.filter(id=>allowed.has(id)).map(id=>src.items.get(id)).filter(i=>i&&i.tracker.status!=='pass');
    for(const item of candidates) {
      const point=(template.declaredContexts||{})[item.id]||src.points[item.id];if(!point||!Number.isFinite(Number(point.lat))||!Number.isFinite(Number(point.lon)))continue;
      const distances=template.basePoints.map(p=>distance({lat:Number(point.lat),lon:Number(point.lon)},p));const best=Math.min(...distances),base=distances.indexOf(best);
      if(best>template.maxRadiusKm)continue;
      return {itemId:item.id,cuisineId:null,hours:goal.estimatedHours+(best>60?3:best>25?1.5:0),base,type:goal.familyId?'explicit equivalent family variant':'explicit source item'};
    }
    return null;
  }
  function allocate(template,goals,src) {
    const route=clone(template),days=[];const out=route.travelDays>=3?2:1,back=route.travelDays>=4?2:1;
    for(let day=1;day<=route.days;day++)days.push({day,base:route.baseLabels[0],kind:'explore',focus:'Choose only the explicitly allocated experiences.',hours:0,capacityHours:route.exploreDayHours,itemIds:[],cuisineIds:[],goalIds:[]});
    for(let i=0;i<out;i++)Object.assign(days[i],{kind:'travel',focus:i?'Arrival/connection and jetlag buffer.':'Outbound travel and arrival buffer.',capacityHours:0});
    for(let i=0;i<back;i++)Object.assign(days[days.length-1-i],{kind:'travel',focus:'Return travel / connection buffer.',capacityHours:0});
    const middle=days.filter(d=>d.kind==='explore');
    if(route.transferDays&&middle.length){const change=middle[Math.floor(middle.length/2)];change.kind='transfer';change.capacityHours=route.transferDayHours;change.focus='Full base change; only an explicitly named transport goal may share this day.';for(const d of days)if(d.day>=change.day)d.base=route.baseLabels[1];}
    if(route.restDays){const rest=days.find(d=>d.kind==='explore'&&d.day===out+1);if(rest)Object.assign(rest,{kind:'rest',focus:'Recovery / weather / schedule flexibility.',capacityHours:0});}
    const candidates=goals.map(goal=>({goal,evidence:evidenceFor(goal,route,src)})).filter(x=>x.evidence).sort((a,b)=>(b.goal.groups.includes('global-anchors')?1:0)-(a.goal.groups.includes('global-anchors')?1:0)||b.goal.weight/b.evidence.hours-a.goal.weight/a.evidence.hours||a.goal.id.localeCompare(b.goal.id));
    const covered=[],evidence=[];
    for(const {goal,evidence:entry} of candidates) {
      const isJourney=goal.category==='Journeys & transport';
      let preferred=days.filter(d=>(d.kind==='explore'&&d.base===route.baseLabels[entry.base])||(d.kind==='transfer'&&isJourney));
      if(goal.itemId==='LA-0991'){const transfer=days.find(d=>d.kind==='transfer'),later=transfer&&days.find(d=>d.kind==='explore'&&d.day>transfer.day);preferred=transfer&&later?[transfer,later]:[];}
      if(isJourney&&(route.fullDayItemIds||[]).includes(entry.itemId)){const day=preferred.find(d=>d.hours===0);if(day)day.capacityHours=Math.max(day.capacityHours,entry.hours);}
      if(isJourney&&entry.hours<=Math.max(route.transferDayHours,9)){preferred.sort((a,b)=>(b.kind==='transfer'?1:0)-(a.kind==='transfer'?1:0));const whole=preferred.find(d=>d.capacityHours-d.hours>=entry.hours);if(!whole)continue;preferred=[whole];}
      const selected=[];let remaining=entry.hours;
      if(goal.itemId==='LA-0861'){if(route.baseLabels.length<2)continue;const full=days.find(d=>d.kind==='explore'&&d.base===route.baseLabels[1]&&d.hours===0),valley=days.find(d=>d.kind==='explore'&&d.base===route.baseLabels[1]&&d!==full&&d.capacityHours-d.hours>=4);if(!full||!valley)continue;full.capacityHours=Math.max(full.capacityHours,12);preferred=[full,valley];full.focus='Full Machu Picchu transport and timed-site opportunity; tickets/train arrangements need checking.';valley.focus='Separate Sacred Valley exploration block.';}
      if(goal.itemId==='LA-0950'){if(route.baseLabels.length<2)continue;const first=days.find(d=>d.kind==='explore'&&d.base===route.baseLabels[0]&&d.capacityHours-d.hours>=4),second=days.find(d=>d.kind==='explore'&&d.base===route.baseLabels[1]&&d.capacityHours-d.hours>=4);if(!first||!second)continue;preferred=[first,second];}
      for(const d of preferred){const room=d.capacityHours-d.hours;if(room<=0)continue;const amount=Math.min(room,remaining,goal.itemId==='LA-0950'?4:Infinity);selected.push([d,amount]);remaining-=amount;if(remaining<.001)break;}
      if(remaining>.001)continue;
      selected.forEach(([d,amount])=>{d.hours=Math.round((d.hours+amount)*10)/10;d.goalIds.push(goal.id);if(entry.itemId)d.itemIds.push(entry.itemId);if(entry.cuisineId)d.cuisineIds.push(entry.cuisineId);if(!['LA-0861','LA-0950'].includes(goal.itemId))d.focus=goal.category==='Journeys & transport'&&d.kind==='transfer'?'Actual named transport experience and full base-change allocation.':'Explicit selected opportunities; time estimates remain rough.';});
      covered.push(goal.id);evidence.push({goalId:goal.id,itemId:entry.itemId,cuisineId:entry.cuisineId,type:entry.type,allocatedHours:entry.hours,days:selected.map(([d])=>d.day)});
    }
    route.dayAllocations=days;route.goalIds=unique(covered);route.itemIds=unique(days.flatMap(d=>d.itemIds));route.cuisineIds=unique(days.flatMap(d=>d.cuisineIds).concat((global.LIFE_CUISINES||[]).filter(c=>(c.foods||[]).some(id=>route.itemIds.includes(id))).map(c=>c.id)));route.evidence=evidence;route.activeHours=days.reduce((n,d)=>n+d.hours,0);route.hubPriority=Math.max(0,...route.hubIds.map(id=>src.hubScores.get(id)||0));route.earlierEffort=goals.some(g=>route.goalIds.includes(g.id)&&(g.early||g.effort==='demanding'));
    route.assumptions+=' Active time is a rough allocation, not a mastery/completion guarantee. Named programs, permits, menus and real transport must be checked.';
    return route;
  }
  function buildProblem(input) {
    const opts=options(input),src=source();
    if(!src.api)throw new Error('Load the discovery priority engine before coverage optimization.');
    src.hubScores=new Map(src.api.rankDestinations('All').map(r=>[r.destination.id,r.score]));
    src.localCuisineIds=new Set(src.api.cuisineRecommendations('All').filter(r=>r.verifiedLocalOptions&&r.verifiedLocalOptions.length&&r.classification==='local-option').map(r=>r.cuisine.id));
    src.ranks=new Map(CATEGORIES.map(category=>[category,src.api.rankCategory(category,'All')]));
    const fixed=universe(opts,src),locals=localOptions(fixed.goals,src);
    let routes=(global.LIFE_COVERAGE_TRIPS||[]).filter(r=>opts.tripLength==='mix'||String(r.days)===opts.tripLength).map(r=>allocate(r,fixed.goals,src)).filter(r=>r.goalIds.length);
    // A longer variant with identical/subset opportunity coverage is dominated
    // by the cheaper same-itinerary version. Never combine five and nine days.
    routes=routes.filter(r=>!routes.some(other=>other.id!==r.id&&other.familyId===r.familyId&&other.days<=r.days&&other.ptoDays<=r.ptoDays&&r.goalIds.every(id=>other.goalIds.includes(id))&&(other.days<r.days||other.ptoDays<r.ptoDays)));
    const reachable=new Set([...routes.flatMap(r=>r.goalIds),...locals.flatMap(l=>l.goalIds)]);
    fixed.goals.forEach(g=>{g.reachable=reachable.has(g.id);if(!g.reachable&&!g.unavailableReason)g.unavailableReason='No explicit feasible local/route slot in this curated finite pool covers the source goal within the selected trip-length policy.';});
    const problem={version:1,options:opts,goals:fixed.goals,groups:fixed.groups,routes,locals,anchorOmissions:fixed.anchorOmissions,assumptions:'Fixed worldwide targets at solve start: ten canonical choices in each macrocategory, up to ten eligible cuisine-intro opportunities, top international anchors plus requested regional breadth. Planned opportunity coverage is not goal/cuisine completion. Five days uses three weekday PTO days; nine uses five, without holidays or WFH.'};
    const constraintOptions={...opts};delete constraintOptions.annualPto;
    problem.signature=stable({version:problem.version,options:constraintOptions,goals:problem.goals.map(g=>({id:g.id,weight:g.weight,groups:g.groups,unavailableReason:g.unavailableReason})),groups:problem.groups,routes:routes.map(r=>({id:r.id,familyId:r.familyId,days:r.days,ptoDays:r.ptoDays,goalIds:r.goalIds,dayAllocations:r.dayAllocations.map(d=>({day:d.day,kind:d.kind,base:d.base,hours:d.hours,capacityHours:d.capacityHours,itemIds:d.itemIds,cuisineIds:d.cuisineIds,goalIds:d.goalIds}))})),locals:locals.map(l=>({id:l.id,hours:l.hours,goalIds:l.goalIds,itemIds:l.itemIds,cuisineIds:l.cuisineIds}))});
    return problem;
  }
  function evaluateSelection(problem,routeIds,localIds) {
    const routes=unique(routeIds||[]).map(id=>problem.routes.find(r=>r.id===id)).filter(Boolean),locals=unique(localIds||[]).map(id=>problem.locals.find(l=>l.id===id)).filter(Boolean),byId=new Map(problem.goals.map(g=>[g.id,g]));
    const covered=new Set();let totalLocal=0;
    const selectedLocals=locals.map(l=>{const fresh=l.goalIds.filter(id=>!covered.has(id));l.goalIds.forEach(id=>covered.add(id));totalLocal+=l.hours;return{...clone(l),newGoalIds:fresh,marginalWeight:fresh.reduce((n,id)=>n+byId.get(id).weight,0)};});
    const selectedRoutes=[],remaining=routes.slice();
    while(remaining.length){const pool=remaining.some(r=>r.scope==='USA')?remaining.filter(r=>r.scope==='USA'):remaining;let best=pool[0],value=-1;for(const r of pool){const fresh=r.goalIds.filter(id=>!covered.has(id)),gain=fresh.reduce((n,id)=>n+byId.get(id).weight,0);const v=gain/Math.max(1,r.ptoDays)+(r.earlierEffort?2:0)+(r.hubPriority||0)/100;if(v>value){value=v;best=r;}}const fresh=best.goalIds.filter(id=>!covered.has(id));best.goalIds.forEach(id=>covered.add(id));selectedRoutes.push({...clone(best),newGoalIds:fresh,marginalWeight:Math.round(fresh.reduce((n,id)=>n+byId.get(id).weight,0)*10)/10});remaining.splice(remaining.indexOf(best),1);}
    const weightedTotal=problem.goals.reduce((n,g)=>n+g.weight,0),weightedCovered=problem.goals.filter(g=>covered.has(g.id)).reduce((n,g)=>n+g.weight,0);
    const groups=problem.groups.map(group=>{const list=unique(group.goalIds).map(id=>byId.get(id)).filter(Boolean),got=list.filter(g=>covered.has(g.id)),weight=list.reduce((n,g)=>n+g.weight,0),gotWeight=got.reduce((n,g)=>n+g.weight,0);return{...clone(group),covered:got.length,total:list.length,rawPercent:list.length?got.length/list.length:1,weightedPercent:weight?gotWeight/weight:1,floorMet:got.length+1e-9>=Math.ceil(group.floor*list.length-1e-9),reachable:list.filter(g=>g.reachable).length,totalWeight:weight,coveredWeight:gotWeight};});
    const calendarDays=routes.reduce((n,r)=>n+r.days,0),ptoDays=routes.reduce((n,r)=>n+r.ptoDays,0),familyIds=routes.map(r=>r.familyId);
    const budgetMet=totalLocal<=problem.options.localHoursBudget+1e-9&&(problem.options.maxTrips==null||routes.length<=problem.options.maxTrips)&&(problem.options.maxPto==null||ptoDays<=problem.options.maxPto)&&(problem.options.maxDays==null||calendarDays<=problem.options.maxDays)&&unique(familyIds).length===familyIds.length;
    const weightedPercent=weightedTotal?weightedCovered/weightedTotal:1;
    return{problem,selectedRoutes,selectedLocals,coverage:{rawCovered:covered.size,rawTotal:problem.goals.length,rawPercent:problem.goals.length?covered.size/problem.goals.length:1,weightedCovered,weightedTotal,weightedPercent,groups},calendarDays,ptoDays,localHours:totalLocal,leaveYears:ptoDays/problem.options.annualPto,uncovered:problem.goals.filter(g=>!covered.has(g.id)).map(g=>({...clone(g),reason:g.unavailableReason||'Not selected within this solution/budget.'})),targetMet:weightedPercent+1e-9>=problem.options.target,floorsMet:groups.every(g=>g.floorMet),budgetMet,method:'Greedy + prune; curated finite opportunity pool; no global optimality claim.',assumptions:problem.assumptions};
  }
  function solve(input) {
    const problem=buildProblem(input),certs=Array.isArray(global.LIFE_COVERAGE_SOLUTIONS)?global.LIFE_COVERAGE_SOLUTIONS:(global.LIFE_COVERAGE_SOLUTIONS||{}).entries||[];
    const certificate=certs.find(c=>c.signature===problem.signature);
    if(certificate){const meta=certificate.solver||{},proof=meta.optimal===true||meta.status==='optimal'||meta.status===0&&Number(meta.mipGap)===0;const result=evaluateSelection(problem,certificate.routeIds||[],certificate.localIds||[]);const maximum=certificate.mode==='maximum-coverage';if(proof&&result.budgetMet&&(maximum||result.targetMet&&result.floorsMet)){result.method=maximum?'Exact finite-pool maximum opportunity coverage under the stated budget; target/floor shortfalls remain visible.':'Exact finite-pool optimum';result.solver=clone(meta);result.certified=true;result.maximumCoverageCertificate=maximum;result.shortfall=Math.max(0,problem.options.target-result.coverage.weightedPercent);return result;}}
    const selectedRoutes=[],selectedLocals=[],covered=new Set(),families=new Set();let localHours=0,days=0,pto=0;
    const candidates=problem.locals.map(x=>({...x,type:'local'})).concat(problem.routes.map(x=>({...x,type:'route'}))),goal=new Map(problem.goals.map(g=>[g.id,g]));
    while(true){
      let best=null,bestValue=0;
      for(const c of candidates){if(c.type==='local'&&(selectedLocals.includes(c.id)||localHours+c.hours>problem.options.localHoursBudget+1e-9))continue;if(c.type==='route'&&(selectedRoutes.includes(c.id)||families.has(c.familyId)||problem.options.maxTrips!=null&&selectedRoutes.length>=problem.options.maxTrips||problem.options.maxPto!=null&&pto+c.ptoDays>problem.options.maxPto||problem.options.maxDays!=null&&days+c.days>problem.options.maxDays))continue;
        const fresh=c.goalIds.filter(id=>!covered.has(id));if(!fresh.length)continue;
        let gain=fresh.reduce((n,id)=>n+goal.get(id).weight,0);
        problem.groups.forEach(g=>{const count=g.goalIds.filter(id=>covered.has(id)).length,need=Math.ceil(g.floor*g.goalIds.length-1e-9)-count;if(need>0)gain+=fresh.filter(id=>g.goalIds.includes(id)).length*(g.id.startsWith('breadth:')?250:70);});
        const cost=c.type==='local'?Math.max(.5,c.hours)*.45:8+c.ptoDays*1.5;const value=gain/cost;
        if(value>bestValue){bestValue=value;best=c;}
      }
      if(!best)break;
      best.goalIds.forEach(id=>covered.add(id));if(best.type==='local'){selectedLocals.push(best.id);localHours+=best.hours;}else{selectedRoutes.push(best.id);families.add(best.familyId);days+=best.days;pto+=best.ptoDays;}
      const result=evaluateSelection(problem,selectedRoutes,selectedLocals);if(result.targetMet&&result.floorsMet)break;
    }
    // Remove redundant selected options only when the same fixed target/floors survive.
    const attained=evaluateSelection(problem,selectedRoutes,selectedLocals);const preserves=r=>r.coverage.weightedCovered+1e-8>=attained.coverage.weightedCovered&&r.coverage.groups.every((g,i)=>g.covered>=attained.coverage.groups[i].covered);
    for(const id of selectedRoutes.slice().reverse()){const test=selectedRoutes.filter(x=>x!==id),r=evaluateSelection(problem,test,selectedLocals);if((attained.targetMet&&attained.floorsMet?r.targetMet&&r.floorsMet:preserves(r))){selectedRoutes.splice(selectedRoutes.indexOf(id),1);}}
    for(const id of selectedLocals.slice().reverse()){const test=selectedLocals.filter(x=>x!==id),r=evaluateSelection(problem,selectedRoutes,test);if((attained.targetMet&&attained.floorsMet?r.targetMet&&r.floorsMet:preserves(r))){selectedLocals.splice(selectedLocals.indexOf(id),1);}}
    const result=evaluateSelection(problem,selectedRoutes,selectedLocals);result.certified=false;result.maximumReachableWeight=problem.goals.filter(g=>g.reachable).reduce((n,g)=>n+g.weight,0);result.reachabilityUpperBound=result.coverage.weightedTotal?result.maximumReachableWeight/result.coverage.weightedTotal:1;result.shortfall=Math.max(0,problem.options.target-result.coverage.weightedPercent);return result;
  }
  global.LifeCoverageOptimizer={buildProblem,solve,evaluateSelection};
})(window);
