#!/usr/bin/env python3
"""Build the static research atlas from auditable JSON. Python standard library only."""
from pathlib import Path
from html import escape
from html.parser import HTMLParser
from urllib.parse import quote, urlsplit, parse_qs
import json
import re
import hashlib

ROOT = Path(__file__).resolve().parent
UPDATED = '2026-11-22'
PAGES = {}
def read(name, fallback=None):
    p = ROOT / 'data' / name
    return json.loads(p.read_text()) if p.exists() else fallback
def e(value):
    return escape(str(value if value is not None else ''), quote=True)
def para(value):
    return ''.join(f'<p>{e(v)}</p>' for v in (value if isinstance(value, list) else [value]) if v)
def link(url, label, cls=''):
    external = str(url).startswith(('https://', 'http://'))
    return f'<a href="{e(url)}" class="{e(cls)}"' + (' target="_blank" rel="noopener"' if external else '') + f'>{e(label)}</a>'
def time_s(value):
    n = int(value)
    return f'{n//3600:02}:{n%3600//60:02}:{n%60:02}'

TALKS = read('talks.json', [])
if isinstance(TALKS, dict): TALKS = TALKS.get('talks', [])
KNOWLEDGE = read('knowledge.json', {})
NODES = KNOWLEDGE.get('nodes', [])
REFS = KNOWLEDGE.get('references', [])
PAPER_READING = read('paper-reading.json', {})
if isinstance(PAPER_READING, list): reviewed = PAPER_READING
else: reviewed = PAPER_READING.get('papers', PAPER_READING.get('references', []))
known_urls = {r.get('url') for r in REFS}
for r in reviewed:
    existing = next((x for x in REFS if x['id'] == r['id'] or x.get('url') == r.get('url')), None)
    if not existing:
        REFS.append(r)
        known_urls.add(r.get('url'))
    else:
        existing.update(r)
RESEARCH_REVIEWS=[]
for source in sorted((ROOT/'data').glob('research-*.json')):
    records=json.loads(source.read_text())
    assert isinstance(records,list), source
    for record in records:
        key=re.sub(r'v\d+$','',record.get('arxiv_id','')) or record['title'].strip().lower()
        previous=next((r for r in RESEARCH_REVIEWS if r['_key']==key),None)
        if previous:
            for field in ['main_paper_ids','workshop_paper_ids','related_talk_ids']:
                previous[field]=list(dict.fromkeys(previous.get(field,[])+record.get(field,[])))
            for placement in record.get('panel_placements',[]):
                if not any(p['panel_id']==placement['panel_id'] and p['perspective_index']==placement['perspective_index'] for p in previous.get('panel_placements',[])):
                    previous.setdefault('panel_placements',[]).append(placement)
            continue
        record['_key']=key
        record['panel_placements']=[x for x in record.get('panel_placements',[]) if not (record['id']=='contactguard' and x['panel_id']=='agentic') and not (record['id']=='physcap' and x['panel_id']=='posttrain')]
        record['summary']=record['full_summary']
        record['reviewed']=True
        record['reading_date']=record.get('reviewed_at',UPDATED)
        record['verification']=record['review_scope']+' Results are author-reported; no independent reproduction is claimed.'
        RESEARCH_REVIEWS.append(record)
for record in RESEARCH_REVIEWS:
    existing=next((r for r in REFS if r['id']==record['id'] or r.get('url')==record['url']),None)
    if existing:existing.update(record)
    else:REFS.append(record)
for r in REFS:
    for nid in r.get('related_node_ids', []):
        node = next((n for n in NODES if n['id'] == nid), None)
        if node and r['id'] not in node.get('reference_ids', []): node.setdefault('reference_ids', []).append(r['id'])
COVERAGE = read('coverage.json', {})
PROCEEDINGS = read('proceedings.json', {})
MAIN_PAPERS = PROCEEDINGS.get('papers', [])
WORKSHOPS = read('workshop-papers.json', {})
WORKSHOP_PAPERS = WORKSHOPS.get('papers', []) if isinstance(WORKSHOPS, dict) else WORKSHOPS
PANELS = read('panels.json', [])
PANEL_SYNTHESIS = read('panel-synthesis.json', [])
BY_SYNTHESIS = {panel['id']:panel for panel in PANEL_SYNTHESIS}
PANEL_SOURCE_LINKS = read('panel-source-links.json', [])
BY_PANEL_SOURCES = {panel['panel_id']:panel for panel in PANEL_SOURCE_LINKS}
MAP_EXPANSIONS = read('map-expansions.json', [])
RECORDINGS = read('recordings.json', {})
BY_TALK = {t['id']: t for t in TALKS}
BY_NODE = {n['id']: n for n in NODES}
BY_REF = {r['id']: r for r in REFS}
BY_PAPER_REVIEW={pid:review for review in RESEARCH_REVIEWS for pid in review.get('main_paper_ids',[])+review.get('workshop_paper_ids',[])}
VISUAL_NOTES=read('visual-notes.json',[])
if isinstance(VISUAL_NOTES,dict): VISUAL_NOTES=VISUAL_NOTES.get('notes',VISUAL_NOTES.get('records',[]))
BY_VISUAL={v['talk_id']:v for v in VISUAL_NOTES}
STAGE_COLOR = {'Learn': ('#e9eee4', '#426c55'), 'Act': ('#e9eef2', '#426b88'), 'Improve': ('#f2eadb', '#886633')}

def nav(active,prefix):
    items=[('map',prefix+'index.html','Knowledge map'),('panels',prefix+'panels/index.html','Research panels'),('library',prefix+'library/index.html','Library')]
    links=''.join(f'<a href="{e(url)}"'+(' aria-current="page"' if key==active else '')+f'>{e(label)}</a>' for key,url,label in items)
    return f'''<a class="skip-link" href="#main">Skip to content</a><header class="site-header"><div class="shell nav"><a class="brand" href="{prefix}index.html"><span class="mark">Co<em>RL</em></span><span>Research Atlas<small>CoRL 2026 · Austin</small></span></a><nav class="links" aria-label="Main navigation">{links}<a class="atlas-home-link" href="/">Homepage ↗</a></nav></div></header>'''

def footer(prefix,show_author=False):
    return f'''<footer class="site-footer"><div class="shell footer-row"><div>Independent CoRL 2026 research guide · Updated November 22, 2026</div><div class="footer-links"><a href="{prefix}library/index.html#coverage">Coverage &amp; source policy</a><a href="{prefix}data/atlas-graph.json" download>Download source index</a><a href="https://www.corl.org" target="_blank" rel="noopener">Official CoRL ↗</a></div></div></footer>'''

def page(name, active, title, description, body):
    sub = '/' in name
    prefix = '../' if sub else ''
    canonical = 'https://charithaakula.github.io/corl26/' + (name.replace('index.html', '') if sub else '')
    css_hash=hashlib.sha256((ROOT/'atlas.css').read_bytes()).hexdigest()[:10]
    js_hash=hashlib.sha256((ROOT/'atlas.js').read_bytes()).hexdigest()[:10]
    theme_hash=hashlib.sha256((ROOT/'theme.css').read_bytes()).hexdigest()[:10]
    html = f'''<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#111725"><title>{e(title)}</title><meta name="description" content="{e(description)}"><link rel="canonical" href="{e(canonical)}"><meta property="og:title" content="{e(title)}"><meta property="og:description" content="{e(description)}"><meta property="og:type" content="website"><meta property="og:url" content="{e(canonical)}"><meta name="twitter:card" content="summary"><link rel="stylesheet" href="{prefix}atlas.css?v={css_hash}"><link rel="stylesheet" href="{prefix}theme.css?v={theme_hash}"><script src="{prefix}atlas.js?v={js_hash}" defer></script></head><body data-page="{active}">{nav(active,prefix)}<main class="shell" id="main">{body}</main>{footer(prefix,active != "library")}</body></html>'''
    p = ROOT / name
    PAGES[p] = html + '\n'

def talk_link(tid, prefix='', label=None):
    t = BY_TALK.get(tid)
    if not t: return ''
    return link(prefix + 'library/index.html#talk-' + tid, label or t['title'], 'source-chip')

def node_links(tid, prefix=''):
    matches = [n for n in NODES if any(x.get('talk_id') == tid for x in n.get('examples', []))]
    return ''.join(link(prefix + 'field-map/index.html#topic-' + n['id'], n['title'], 'source-chip') for n in matches)


def resolve_panel_sources(panel):
    if panel.get('talk_ids'): return panel['talk_ids']
    found = []
    for term in panel.get('sources', []):
        t = next((t for t in TALKS if term.lower() in t['title'].lower()), None)
        if t and t['id'] not in found: found.append(t['id'])
    return found

def expanded_panels():
    panels=json.loads(json.dumps(PANELS))
    perspective_sources={
        'policy':[['d1-14','d1-11'],['d1-10'],['d1-22']],
        'world':[['d1-14'],['d2-56','d3-84'],['d2-57','d1-29']],
        'data':[['d1-12'],['d2-37'],['d1-7']],
        'posttrain':[['d1-11','d2-50'],['d2-46','d2-47'],['d2-40','d2-49']],
        'deployment':[['d2-80'],['d3-86'],['d1-33','d1-35']],
        'agentic':[['d1-22'],['d1-22'],['d2-49']]
    }
    for panel in panels:
        synthesis=BY_SYNTHESIS.get(panel['id'])
        assert synthesis, f'Provide our synthesis for {panel["id"]}'
        panel['synthesis']=synthesis['synthesis']
        panel['synthesis_talk_ids']=synthesis['source_talk_ids']
        for view,tids in zip(panel['views'],perspective_sources[panel['id']]):view['talk_ids']=tids
        panel['talk_ids']=list(dict.fromkeys([tid for view in panel['views'] for tid in view['talk_ids']]+synthesis['source_talk_ids']))
        for index,view in enumerate(panel['views']):
            view['supporting_research']=[{'review':r,'note':placement['note']} for r in RESEARCH_REVIEWS for placement in r.get('panel_placements',[]) if placement['panel_id']==panel['id'] and placement['perspective_index']==index and r['id']!='scale-up-strategically']
        panel['research_evidence']=[r for r in RESEARCH_REVIEWS if any(p['panel_id']==panel['id'] for p in r.get('panel_placements',[]))]
        panel['source_groups']=BY_PANEL_SOURCES.get(panel['id'],{})
    return panels

def paper_sources(group,prefix=''):
    items=[];seen=set();seen_papers=set()
    explicit=group.get('primary_paper_urls',[])
    for paper in explicit:
        if paper.get('url') in seen:continue
        seen.add(paper['url'])
        if paper.get('catalogue_paper_id'):seen_papers.add(paper['catalogue_paper_id'])
        note='Technical report · linked' if paper.get('source_kind')=='technical-report' else 'Paper · linked'
        items.append({'title':paper['title'],'url':paper['url'],'role':paper.get('role','direct'),'note':note})
    for rid in group.get('paper_reference_ids',[]):
        r=BY_REF.get(rid)
        if not r:continue
        if rid=='gr00t2' and any('gr00t2_whitepaper' in x.get('url','') for x in explicit):continue
        url=r['url']
        catalogue=next((p for p in MAIN_PAPERS if p.get('project_url')==url),None)
        if catalogue:
            if catalogue['id'] in seen_papers:continue
            seen_papers.add(catalogue['id'])
            url=catalogue.get('arxiv_url') or catalogue.get('pdf_url') or url
        if url in seen:continue
        seen.add(url)
        items.append({'title':r['title'],'url':url,'role':group.get('reference_roles',{}).get(rid,'context'),'note':source_badge(r)})
    for pid in group.get('main_paper_ids',[]):
        if pid in seen_papers:continue
        paper=next((p for p in MAIN_PAPERS if p['id']==pid),None)
        if not paper:continue
        url=paper.get('arxiv_url') or paper.get('pdf_url') or paper['url']
        if url in seen:continue
        seen.add(url);seen_papers.add(pid);items.append({'title':paper['title'],'url':url,'role':'direct','note':'Paper · linked'})
    return ''.join('<li>'+link(x['url'],x['title']+' ↗')+'<span class="source-tag">'+e(('Related context · ' if x['role']=='context' else '')+x['note'])+'</span></li>' for x in items)

def review_target(review,prefix=''):
    if review.get('main_paper_ids'):fragment='paper-'+review['main_paper_ids'][0]
    elif review.get('workshop_paper_ids'):fragment='workshop-paper-'+review['workshop_paper_ids'][0]
    else:fragment='reference-'+review['id']
    return prefix+'library/index.html#'+fragment

def chair_svg():
    return '<svg viewBox="0 0 84 92" aria-hidden="true"><ellipse class="chair-shadow" cx="42" cy="84" rx="32" ry="5"/><path class="chair-back" d="M22 42V16c0-7 5-12 12-12h16c7 0 12 5 12 12v26"/><path class="chair-seat" d="M20 42h44c7 0 12 5 12 12v14H8V54c0-7 5-12 12-12Z"/><path class="chair-line" d="M16 68v14m52-14v14M8 56h68M27 9v28m30-28v28"/></svg>'

def landing():
    panels=expanded_panels()
    original_topics=source_map_index()
    picker='';panel_html=''
    for i,p in enumerate(panels):
        picker+=f'<a class="panel-choice" href="#panel-{i+1}" data-panel="{i+1}"><span class="num">{i+1:02}</span><span class="line">{e(p["question"])}<small>{e(p["tag"])}</small></span></a>'
        tids=resolve_panel_sources(p)
        seats=''
        perspectives=p['views']
        assert len(perspectives)==3, f'Provide three perspectives for {p["id"]}'
        for j,v in enumerate(perspectives):
            view_sources=v.get('talk_ids',[])
            seat_links=''.join(talk_link(tid,'','Source ↗' if len(view_sources)==1 else BY_TALK[tid]['title']) for tid in view_sources)
            group=next((g for g in p['source_groups'].get('perspectives',[]) if g['index']==j),{})
            papers=paper_sources(group)
            supporting='<div class="perspective-sources"><span class="source-group-label">Talks</span><div class="seat-sources">'+seat_links+'</div><span class="source-group-label">Papers &amp; technical sources</span><ul class="paper-source-list">'+papers+'</ul></div>'
            seats+=f'<section class="stage-seat seat-{j}"><div class="seat-art">{chair_svg()}</div><div class="role">Perspective {j+1:02}</div><h3>{e(v["name"])}</h3><div class="by">{e(v["by"])}</div>{para(v["text"])}{supporting}</section>'
        sources=''.join(talk_link(tid) for tid in tids)
        related=list(dict.fromkeys(topic for tid in tids for topic in original_topics.get(tid,[])))
        maps=''.join(link('field-map/index.html#'+topic,MAP_TOPIC_LABELS[topic],'source-chip') for topic in related[:4])
        synthesis_sources=''.join(talk_link(tid) for tid in p.get('synthesis_talk_ids',[]))
        research_evidence=paper_sources(p['source_groups'].get('synthesis',{}))
        evidence_drawer='<div class="synthesis-reference-groups"><section><h4>Talks</h4><div class="synthesis-sources">'+synthesis_sources+'</div></section><section><h4>Papers &amp; technical sources</h4><ul class="paper-source-list">'+research_evidence+'</ul></section></div>'
        panel_html+=f'''<article class="panel-display" id="panel-{i+1}"><div class="panel-super">PANEL {i+1:02} / {len(panels):02} · {e(p['tag'])}</div><h2>{e(p['question'])}</h2><div class="stage-row">{seats}</div><section class="panel-synthesis" aria-labelledby="synthesis-{i+1}"><h3 class="synthesis-label" id="synthesis-{i+1}">Our synthesis</h3><div class="synthesis-body">{para(p['synthesis'])}{evidence_drawer}</div></section><div class="test-strip"><b>What would help assess these perspectives?</b>{e(p['test'])}</div><details class="panel-connections"><summary>Further reading in the map</summary><div class="chips">{maps}</div></details><p class="panel-footnote">Perspectives and synthesis are editorial readings of independent sources. Related context is not attributed to the speaker; linked reports are not automatically full-text reviews.</p></article>'''
    body=f'''<section class="panel-page" id="panels"><h1>Research panels</h1><div class="panel-layout"><aside class="panel-picker" aria-label="Choose a research question">{picker}</aside><div class="panel-stage">{panel_html}</div></div></section>'''
    body=body.replace('href="library/','href="../library/').replace('href="field-map/','href="../field-map/')
    page('panels/index.html','panels','CoRL 2026 Research Panels','Six research questions explored through three source-linked perspectives and our editorial synthesis.',body)

def source_badge(ref):
    state = str(ref.get('status', '')).lower()
    scope = str(ref.get('review_scope', '')).lower()
    if 'project' in state:return 'Primary project reviewed'
    if 'abstract' in state or ('abstract' in scope and 'body' not in scope and 'method' not in scope): return 'Primary abstract reviewed'
    if ref.get('reviewed'):
        if 'arxiv.org' in ref.get('url','') and state != 'primary-abstract-reviewed': return 'Primary paper reviewed'
        return 'Primary project reviewed'
    if any(x in state for x in ['primary-paper-reviewed','full-text-reviewed','paper-reviewed']): return 'Primary paper reviewed'
    if 'transcript' in state: return 'Recorded source reviewed'
    return 'Primary-source reading lead'

def research_facts(method,why,question):
    rows=''.join(f'<tr><th scope="row">{e(label)}</th><td>{e(value)}</td></tr>' for label,value in [('How it works',method),('Why it matters',why),('Open question',question)] if value)
    return '<div class="research-facts"><table><caption class="sr-only">Research details</caption><tbody>'+rows+'</tbody></table></div>' if rows else ''

def review_details(review):
    scope=review.get('verification',review.get('review_scope',''))
    limits=review.get('limitations',review.get('limitation',[]))
    excerpts=review.get('evidence',review.get('source_evidence',[]))
    if isinstance(excerpts,dict):excerpts=[excerpts]
    if not isinstance(excerpts,list):excerpts=[]
    cited=''.join('<p class="source-note">'+e(x.get('section',x.get('locator','')))+': “'+e(x.get('quote',x.get('excerpt','')))+'” '+link(x.get('source_url',x.get('url',review['url'])),'Source ↗')+'</p>' for x in excerpts if isinstance(x,dict) and x.get('quote',x.get('excerpt')))
    return '<details class="research-details source-details"><summary>Scope, limitations &amp; sources</summary>'+para(scope)+para(limits)+para(review.get('venue_note',''))+cited+'</details>'

def transcript_block(t):
    tid = t['id']
    path = ROOT / 'transcripts' / f'{tid}.txt'
    path.parent.mkdir(exist_ok=True)
    path.write_text(t.get('transcript','') + '\n')
    return f'''<details class="transcript-details" data-src="../transcripts/{e(tid)}.txt" data-recording="{e(t.get('recording_id',''))}"><summary>Read the original transcript</summary><p class="source-note">Automatic speech recognition. Names, wording and segment boundaries may contain errors. Timestamp links go to the corresponding recording segment.</p><div class="action-row"><a class="button" href="../transcripts/{e(tid)}.txt" target="_blank" rel="noopener">Open transcript file</a><a class="button" href="../transcripts/{e(tid)}.txt" download>Download transcript</a></div><div class="transcript-body"><p>Open the transcript file above, or expand this section in a browser to read it inline.</p></div></details>'''

def mechanism_diagram(tid, flow):
    if not flow: return ''
    diagrams=''
    for mobile in [False,True]:
        width=350 if mobile else 800
        height=len(flow)*72+12 if mobile else 134
        tag=tid+('-mobile' if mobile else '-desktop')
        svg=f'<svg class="method-svg {"method-mobile" if mobile else "method-desktop"}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}" role="img" aria-labelledby="method-{e(tag)}-title method-{e(tag)}-desc"><title id="method-{e(tag)}-title">Method flow</title><desc id="method-{e(tag)}-desc">{e(" → ".join(flow))}</desc><defs><marker id="method-arr-{e(tag)}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L10 5L0 10" fill="#759585"/></marker></defs>'
        step_width=310 if mobile else (width-30-(len(flow)-1)*18)/len(flow)
        for i,label in enumerate(flow):
            x=20 if mobile else 15+i*(step_width+18)
            y=8+i*72 if mobile else 20
            box_height=53 if mobile else 83
            words=label.split();lines=['']
            limit=39 if mobile else max(15,int(step_width/7))
            for word in words:
                if len(lines[-1])+len(word)+1>limit:lines.append(word)
                else:lines[-1]+=(' ' if lines[-1] else '')+word
            color='#e9eef2' if i==0 else '#e9eee4' if i==len(flow)-1 else '#f3f2e9'
            svg+=f'<rect x="{x}" y="{y}" width="{step_width}" height="{box_height}" rx="7" fill="{color}" stroke="#b3c4b8"/><text x="{x+step_width/2}" y="{y+box_height/2-((len(lines)-1)*8)+4}" text-anchor="middle" fill="#355448" font-family="Arial,sans-serif" font-size="{12 if mobile else 13}" font-weight="600">'+''.join(f'<tspan x="{x+step_width/2}" dy="{0 if j==0 else 16}">{e(line)}</tspan>' for j,line in enumerate(lines))+'</text>'
            if i<len(flow)-1:
                path=f'M175 {y+box_height+2}V{y+70}' if mobile else f'M{x+step_width+2} {y+box_height/2}H{x+step_width+16}'
                svg+=f'<path d="{path}" fill="none" stroke="#759585" stroke-width="1.7" marker-end="url(#method-arr-{e(tag)})"/>'
        diagrams+=svg+'</svg>'
    return '<figure class="method-figure">'+diagrams+'</figure>'

MAP_TOPIC_LABELS={
    'detail-learn-1':'Data & representations','detail-learn-2':'Pretraining & post-training',
    'detail-learn-3':'Simulation & Real2Sim2Real','detail-learn-4':'Continual learning',
    'detail-act-1':'Direct VLA & diffusion policies','detail-act-2':'Hierarchical System 0/1/2',
    'detail-act-3':'Agentic execution & skills','detail-act-4':'World-model planning',
    'detail-act-5':'Memory-augmented policies','detail-act-6':'Coordination & interaction',
    'detail-improve-1':'Evaluation in the real world','detail-improve-2':'Failure diagnosis',
    'detail-improve-3':'Deployment feedback & recovery','detail-improve-4':'Agentic learning & RSI'
}

def source_map_index():
    index={tid:[] for tid in BY_TALK}
    class Sources(HTMLParser):
        topic=None
        def handle_starttag(self,tag,attrs):
            d=dict(attrs)
            if tag=='article' and d.get('id') in MAP_TOPIC_LABELS:self.topic=d['id']
            href=d.get('href','')
            if not self.topic or 'library/' not in href:return
            url=urlsplit(href); tids=[]
            if url.fragment.startswith('talk-') and url.fragment[5:] in BY_TALK:tids=[url.fragment[5:]]
            elif parse_qs(url.query).get('talk',[''])[0] in BY_TALK:tids=[parse_qs(url.query)['talk'][0]]
            else:
                term=parse_qs(url.query).get('q',[''])[0].lower().strip()
                matches=[tid for tid,t in BY_TALK.items() if term and term in t['title'].lower()]
                if len(matches)==1:tids=matches
            for tid in tids:
                if self.topic not in index[tid]:index[tid].append(self.topic)
        def handle_endtag(self,tag):
            if tag=='article':self.topic=None
    parser=Sources();parser.feed((ROOT/'templates'/'field-map.html').read_text())
    return index

def library():
    entries, articles = [], []
    map_index=source_map_index()
    kinds = {'oral':'Oral paper','spotlight':'Spotlight paper','keynote':'Keynote','industry':'Industry / sponsor','debate':'Debate','fireside':'Fireside chat','closing':'Closing & awards'}
    def add_index(id,title,kind,day,subtitle,search,group,node_ids=None):
        entries.append(f'<a class="index-entry" href="#{e(id)}" data-kind="{e(kind)}" data-day="{e(day)}" data-group="{e(group)}" data-nodes="{e(" ".join(node_ids or []))}" data-search="{e(search.lower())}">{e(title)}<small>{e(subtitle)}</small></a>')
    for t in TALKS:
        tid = t['id']; title = t['title']; kind = t.get('category', '')
        if kind not in kinds:
            raw=t.get('kind','').lower()
            kind='oral' if 'oral' in raw else 'spotlight' if 'spotlight' in raw else 'keynote' if 'keynote' in raw else 'debate' if 'debate' in raw else 'fireside' if 'fireside' in raw else 'closing' if 'closing' in raw else 'industry'
        summary = t.get('summary_revised') or t.get('summary','')
        related_topics = [n for n in NODES if any(x.get('talk_id') == tid for x in n.get('examples',[]))]
        related_refs = [r for r in REFS if tid in r.get('related_talk_ids', r.get('related_talks',[]))]
        add_index('talk-'+tid,title,kind,t['day'],f'Day {t["day"]} · {kinds[kind]} · {time_s(t["start_s"])}',' '.join(str(t.get(k,'')) for k in ['title','chapter_title','topic','stage','summary_revised','method','why_it_matters','speaker','organization'])+' '+' '.join(n['title'] for n in related_topics),'conference',[n['id'] for n in related_topics])
        timing_note = t.get('timestamp_note', t.get('timestamp_evidence',t.get('timestamp_status','Transcript-aligned segment start; audiovisual verification pending.')))
        if isinstance(timing_note, dict): timing_note = timing_note.get('note',json.dumps(timing_note,ensure_ascii=False))
        chapter_start = t.get('chapter_start_s',t['start_s'])
        timing = f'''<div class="timing-detail"><span class="timing-title">Speaker segment: {time_s(t['start_s'])}</span><p>{e(timing_note)}</p><p>Original chapter marker: {time_s(chapter_start)}. These starts are aligned to automatic transcript segments; they have not been verified frame by frame against the recording.</p></div>'''
        connections = ''.join(link('../field-map/index.html#'+topic,MAP_TOPIC_LABELS[topic],'source-chip') for topic in map_index.get(tid,[]))
        ref_links = ''.join(link('#reference-'+r['id'],r['title'],'source-chip') for r in related_refs)
        catalogue_links = ''.join(link('#paper-'+p['id'],p['title'],'source-chip') for p in MAIN_PAPERS if tid in p.get('related_talk_ids',[]))
        url = t.get('recording_url') or t.get('video')
        watch = link(url,'Open original video ↗','button primary') + f'<button class="button watch-inline" type="button" data-recording="{e(t.get("recording_id",""))}" data-start="{int(t["start_s"])}">Watch here</button>'
        visual=BY_VISUAL.get(tid,{})
        facts=[('How it works',t.get('method','')),('Why it matters',t.get('why_it_matters','')),('Open question',visual.get('question') or t.get('limitation',''))]
        fact_rows=''.join(f'<tr><th scope="row">{e(label)}</th><td>{e(value)}</td></tr>' for label,value in facts if value)
        fact_table=f'<div class="research-facts"><table><caption class="sr-only">Research details</caption><tbody>{fact_rows}</tbody></table></div>'
        timing_details=f'<details class="research-details source-details"><summary>Recording and source notes</summary>{timing}<p class="source-note">{e(t.get("transcript_note",""))}</p><p class="source-note">{e(t.get("summary_source","Editorial notes from the original recorded presentation."))}</p></details>'
        reading=('<div class="resource-row"><span class="resource-label">Paper &amp; reading</span><div class="chips">'+catalogue_links+ref_links+'</div></div>') if catalogue_links or ref_links else ''
        topics=('<div class="resource-row"><span class="resource-label">Map topics</span><div class="chips">'+connections+'</div></div>') if connections else ''
        articles.append(f'''<article class="reader-article" id="talk-{e(tid)}" aria-labelledby="heading-{e(tid)}"><span class="kicker">Day {t['day']} · {kinds[kind]}</span><h2 id="heading-{e(tid)}">{e(title)}</h2><div class="overview research-summary">{para(summary)}</div>{fact_table}<div class="action-row">{watch}</div><div class="video-host"></div>{topics}{reading}{transcript_block(t)}{timing_details}</article>''')

    for p in MAIN_PAPERS + WORKSHOP_PAPERS:
        pid=p['id']; title=p['title']; is_workshop=p.get('kind')=='workshop-paper' or p in WORKSHOP_PAPERS
        kind='workshop-paper' if is_workshop else 'main-paper'
        html_id=('workshop-paper-' if is_workshop else 'paper-')+pid
        node_ids=p.get('topic_node_ids',p.get('related_node_ids',[]))
        node_ids=[nid for nid in node_ids if nid in BY_NODE]
        authors=p.get('authors',[])
        author_text=', '.join(authors) if isinstance(authors,list) else (str(authors) if authors else '')
        track=p.get('workshop_title',p.get('workshop',p.get('presentation_type','Main paper catalogue')))
        add_index(html_id,title,kind,'paper',track+' · Paper listing',title+' '+author_text+' '+(p.get('summary') or ''),'workshop-papers' if is_workshop else 'main-papers',node_ids)
        urls=[(p.get('url'),'Organizer listing ↗' if p.get('link_kind')=='organizer-list' else 'Paper record ↗'),(p.get('pdf_url'),'Manuscript ↗'),(p.get('arxiv_url'),'arXiv ↗'),(p.get('project_url'),'Project ↗'),(p.get('code_url'),'Code ↗')]
        primary_links=''.join(link(url,label,'button') for url,label in urls if url and url.startswith(('http://','https://')))
        sources=''.join(talk_link(tid,'../') for tid in p.get('related_talk_ids',[]) if tid in BY_TALK)
        review=BY_PAPER_REVIEW.get(pid)
        summary=review['full_summary'] if review else p.get('summary','')
        badge=source_badge(review) if review else ('Workshop listing indexed' if is_workshop else 'Catalogue brief · manuscript review pending')
        facts=research_facts(review.get('short_method',review.get('method','')),review.get('short_why',review.get('why_it_matters','')),review.get('short_question',review.get('open_question',''))) if review else ''
        if review:
            notes=review_details(review)
        else:
            provenance_url=p.get('source_url',p.get('workshop_url',PROCEEDINGS.get('source_url') if not is_workshop else ''))
            provenance=link(provenance_url,'Original listing ↗') if provenance_url else ''
            notes='<details class="research-details source-details"><summary>Listing and source notes</summary>'+para(p.get('verification','Listing metadata read; primary manuscript review pending.'))+'<p>'+provenance+'</p></details>'
        extra_source=link(review['url'],'Reviewed primary source ↗','button primary') if review else ''
        source_links=('<div class="resource-row"><span class="resource-label">Original presentation</span><div class="chips">'+sources+'</div></div>') if sources and not is_workshop else ''
        summary_label=('<p class="source-note">Short excerpt from the listed abstract</p>') if not review and p.get('summary_kind','').startswith('Short excerpt') else ''
        articles.append(f'''<article class="reader-article" id="{e(html_id)}"><span class="kicker">{'Workshop paper' if is_workshop else 'Main-paper catalogue'} · {e(track)}</span><h2>{e(title)}</h2>{'<p class="source-note">'+e(author_text)+'</p>' if author_text else ''}<span class="pill">{e(badge)}</span>{summary_label}<div class="overview research-summary">{para(summary)}</div>{facts}<div class="action-row">{extra_source}{primary_links}</div>{source_links}{notes}</article>''')
    for r in REFS:
        rid = r['id']; title = r['title']; label = source_badge(r)
        ref_nodes=[n['id'] for n in NODES if rid in n.get('reference_ids',[])]
        add_index('reference-'+rid,title,'reference','reference',f'Additional reference · {label}',' '.join(str(r.get(k,'')) for k in ['title','summary','method','mechanism','connection','authors','year'])+' '+' '.join(BY_TALK[x]['title'] for x in r.get('related_talk_ids',[]) if x in BY_TALK),'references',ref_nodes)
        metadata = ' · '.join(str(r[k]) for k in ['year','kind'] if r.get(k))
        overview = r.get('summary') or r.get('mechanism') or r.get('why_relevant') or 'A primary-source reading lead connected to the conference research. Its contents have not yet been reviewed for this snapshot.'
        related = r.get('related_talk_ids',r.get('related_talks',[]))
        facts=research_facts(r.get('short_method',r.get('method',r.get('mechanism',''))),r.get('short_why',r.get('why_it_matters',r.get('why_relevant',r.get('connection','')))),r.get('short_question',r.get('open_question','')))
        source_links=('<div class="resource-row"><span class="resource-label">Read alongside these talks</span><div class="chips">'+''.join(talk_link(tid,'../') for tid in related)+'</div></div>') if related else ''
        articles.append(f'''<article class="reader-article" id="reference-{e(rid)}"><span class="kicker">Additional research · {e(metadata)}</span><h2>{e(title)}</h2><span class="pill">{e(label)}</span><div class="overview research-summary">{para(overview)}</div>{facts}<div class="action-row">{link(r['url'],'Open primary source ↗','button primary')}</div>{source_links}{review_details(r)}</article>''')
    for w in COVERAGE.get('workshop_sources',[]):
        wid=w['id']; title=w['title']
        add_index('workshop-'+wid,title,'workshop','workshop',f'Official workshop · {w.get("indexed_papers",0)} paper listings',' '.join([title,*w.get('topics',[]),*w.get('questions',[])]),'workshops',w.get('topics',[]))
        questions=''.join('<li>'+e(q)+'</li>' for q in w.get('questions',[]))
        focus=('<h3 class="section-label">Research questions</h3><ul class="questions">'+questions+'</ul>') if questions else ('<p class="overview">'+e(w.get('description',''))+'</p>')
        articles.append(f'''<article class="reader-article" id="workshop-{e(wid)}"><span class="kicker">Official CoRL workshop</span><h2>{e(title)}</h2><div class="callout warning"><strong>Verified workshop directory entry.</strong>{para(w.get('verification'))}</div><div class="action-row">{link(w['url'],'Open workshop site ↗','button primary')}</div><p class="source-note">{w.get("indexed_papers",0)} paper listings indexed. {"Complete organizer list." if w.get("paper_list_complete") else e(w.get("gap","Whole-workshop list still incomplete."))}</p>{focus}<p class="source-note">Related source links are editorial reading suggestions, rather than a claim that workshop papers cite these talks.</p><h3 class="section-label">Related conference sources</h3><div class="chips">{''.join(talk_link(tid,'../') for tid in w.get('related_talks',[]))}</div></article>''')
    add_index('coverage','Coverage & source policy','coverage','coverage','Recording inventory · missing tracks · source acquisition','coverage workshop proceedings missing poster spotlight late breaking policy','coverage')
    articles.append(coverage_article())
    for day,recording in RECORDINGS.items():
        add_index('day-'+day,f'Day {day} full transcript','transcript',day,'Original supplied recording transcript','day '+day+' full original transcript','transcripts')
        articles.append(f'''<article class="reader-article" id="day-{day}"><span class="kicker">Original source archive</span><h2>Day {day} full transcript</h2><p class="overview">The full supplied automatic transcript, including introductions, transitions and material outside the individual talk excerpts.</p><div class="callout">This is the supplied recording transcript. It does not establish that every conference session from this day is present.</div><details class="transcript-details" data-src="../transcripts/day-{day}.txt" data-recording="{e(recording['recording_id'])}"><summary>Read the day transcript</summary><div class="action-row">{link('../transcripts/day-'+day+'.txt','Open original transcript','button')}<a class="button" href="../transcripts/day-{day}.txt" download>Download transcript</a>{link('https://www.youtube.com/watch?v='+recording['recording_id'],'Open day recording ↗','button')}</div><div class="transcript-body">Open the transcript file to read the complete source.</div></details><p class="source-note">Automatic speech recognition; wording and timestamps may be approximate.</p></article>''')
    index = ''
    group_labels = {'conference':'Recorded conference sources','main-papers':'Main-paper catalogue','workshop-papers':'Workshop paper lists','references':'Additional research','workshops':'Workshop directory','coverage':'Coverage ledger','transcripts':'Full-day source archive'}
    group = None
    for entry in entries:
        g = re.search(r'data-group="([^"]+)"',entry).group(1)
        if g != group:
            index += f'<div class="index-group" data-group="{g}">{group_labels[g]}</div>'; group=g
        index += entry
    options=''.join(f'<option value="{key}">{label}</option>' for key,label in [('all','All source types'),('main-paper','Main-paper catalogue'),('workshop-paper','Workshop papers'),*list(kinds.items()),('reference','Additional research'),('workshop','Workshop directory'),('transcript','Full transcripts'),('coverage','Coverage ledger')])
    topic_options='<option value="all">All pathways</option>'+''.join(f'<option value="{e(n["id"])}">{e(n["title"])}</option>' for n in NODES)
    body=f'''<section class="library-heading"><h1>CoRL Library</h1><div class="meta-row"><span class="pill">{len(MAIN_PAPERS)} main-paper briefs</span><span class="pill">{len(WORKSHOP_PAPERS)} workshop listings</span><span class="pill">{len(TALKS)} recorded sources</span><a class="pill" href="#coverage">Coverage &amp; evidence →</a></div></section><div class="toolbar" role="search" aria-label="Filter research sources"><label class="sr-only" for="library-search">Search source titles, people and mechanisms</label><input type="search" id="library-search" placeholder="Search a paper, person, method, or question…"><label class="sr-only" for="kind-filter">Source type</label><select id="kind-filter">{options}</select><label class="sr-only" for="day-filter">Recorded day</label><select id="day-filter"><option value="all">All days</option><option value="1">Day 1</option><option value="2">Day 2</option><option value="3">Day 3</option></select><button type="button" id="reset-filters">Reset</button><span id="result-count" class="result-count" role="status" aria-live="polite">{len(entries)} entries</span></div><noscript><p class="noscript-note">Search filters need JavaScript. All source notes and transcript files remain available below.</p></noscript><div class="library-frame"><aside class="library-index" aria-label="Research source index"><h2>Source index</h2>{index}</aside><div class="library-reader"><div class="empty-state" id="empty-results" hidden>No sources match these filters. Try fewer words or reset the filters.</div>{''.join(articles)}</div></div>'''
    page('library/index.html','library','CoRL 2026 Source Library','Explore original CoRL talks, reviewed research, transcript-aligned video links, workshop leads, and transparent coverage.',body)

def coverage_article():
    rows=''.join(f'<tr><td><strong>{e(s["title"])}</strong></td><td>{e(s["indexed"])}</td><td>{e(s["detail"])}</td></tr>' for s in COVERAGE.get('sections',[]))
    tasks=''.join(f'<li>{e(x.get("title",x.get("task",x.get("description",x))))}</li>' if isinstance(x,dict) else '<li>'+e(x)+'</li>' for x in COVERAGE.get('acquisition_tasks',[]))
    leads=''.join('<li>'+link(x['url'],x['title']+' ↗')+'<p class="source-note">'+e(x.get('status',x.get('verification','Reading lead; review pending.')))+'</p></li>' for x in COVERAGE.get('primary_sources',[]))
    announced=''.join(f'<li>{e(x["value"])} {e(x["label"].lower())}. {e(x["qualifier"])} {link(x["evidence"]["url"],"Original announcement ↗")}</li>' for x in COVERAGE.get('announced_counts',[]))
    return f'''<article class="reader-article" id="coverage"><span class="kicker">Coverage ledger</span><h2>What is covered—and what is still missing.</h2><p class="overview">{e(COVERAGE.get('summary'))}</p><div class="coverage-grid"><div class="card"><strong>66 paper presentations</strong><p>21 oral talks and 45 spotlights, represented by recorded source notes.</p></div><div class="card"><strong>21 other recorded segments</strong><p>Keynotes, industry presentations, fireside, debate and closing.</p></div><div class="card"><strong>484 workshop listings</strong><p>All 32 workshop pages checked. Twelve organizer lists are complete; twenty still have metadata gaps.</p></div></div><div class="table-scroll"><table><thead><tr><th scope="col">Research track</th><th scope="col">Indexed</th><th scope="col">Current boundary</th></tr></thead><tbody>{rows}</tbody></table></div><section style="margin-top:30px"><h3>Why the gaps are visible</h3><ul class="questions">{announced}</ul><p class="source-note">Announcement counts are speaker-reported in automatic captions; they require reconciliation with the official conference program.</p></section><h3>Source acquisition priorities</h3><ol class="questions">{tasks}</ol><h3>Primary-source reading leads</h3><ul class="questions">{leads}</ul><h3>Primary-source depth</h3><p>Twenty-one additional public sources were reviewed for focused paper notes: seventeen manuscript-section reviews and four technical project-method reviews. This is separate from the broader catalogue and from confirming accepted publication versions.</p><h3>How evidence is treated</h3><div class="callout"><p>Recorded source reviewed means the notes were built from the supplied talk transcript. Primary paper reviewed means the paper text was retrieved and read. A reading lead has a discovered title and URL, with its contents still awaiting review.</p><p>Editorial comparisons connect mechanisms and propose useful tests; they are not attributed speaker quotations. Company claims remain speaker-reported unless supported by reviewed technical evidence. Social posts may help discover work; the cited sources are papers, project pages, technical reports and original talks.</p><p>Video starts are transcript-aligned. Automatic captions have coarse segment boundaries, so audiovisual checking is still required before claiming second-perfect timing.</p></div><div class="action-row">{link('../data/coverage.json','Download coverage JSON','button')}{link('../data/conference-papers.json','Recorded paper manifest','button')}{link('../data/timestamp-audit.json','Timestamp audit','button')}</div></article>'''

def field_map():
    template=ROOT/'templates'/'field-map.html'
    assert template.exists(), 'Restore the original field-map template before rebuilding.'
    html=template.read_text()
    for expansion in MAP_EXPANSIONS:
        topic=expansion['topic_id']
        discussion='<section class="map-topic-notes"><h4>In practice</h4><p class="map-note-lead">'+e(expansion['lead'])+'</p>'+para(expansion['paragraphs'])+'</section>'
        pattern=re.compile(r'(<article\b[^>]*\bid="'+re.escape(topic)+r'"[^>]*>)(.*?)(</article>)',re.S)
        def add_discussion(match):
            body=match.group(2)
            evidence=re.search(r'<div\b[^>]*\bclass="[^\"]*\bpilot-evidence\b',body)
            at=evidence.start() if evidence else len(body)
            return match.group(1)+body[:at]+discussion+body[at:]+match.group(3)
        html,count=pattern.subn(add_discussion,html)
        assert count==1, topic
    placements={
        'imagewam':['detail-act-1'],'lawam':['detail-act-1','detail-learn-2'],
        'rolling-wam':['detail-act-1'],'lewam':['detail-act-4'],
        'scale-up-strategically':['detail-learn-1'],'h2rbench':['detail-learn-1'],
        'glam':['detail-learn-1'],'h2r-bridge':['detail-learn-1'],
        'rara':['detail-learn-2'],'memory-anchors':['detail-learn-4'],
        'multisensory-continual-learning':['detail-learn-2','detail-learn-4'],
        'far':['detail-improve-3'],'contactguard':['detail-improve-2'],
        'atom-bench':['detail-improve-1'],'rle-bench':['detail-improve-4'],
        'enpire':['detail-improve-4'],'harbor':['detail-improve-4'],
        'mobiagent':['detail-act-3','detail-learn-4'],
        'physcap':['detail-act-3'],'aspire':['detail-act-3','detail-improve-4'],
        'embodiedswe':['detail-learn-3','detail-improve-4']
    }
    for topic in MAP_TOPIC_LABELS:
        cited=set(next((x['source_reference_ids'] for x in MAP_EXPANSIONS if x['topic_id']==topic),[]))
        papers=[r for r in RESEARCH_REVIEWS if topic in placements.get(r['id'],[]) or r['id'] in cited]
        if not papers:continue
        items=''.join('<li>'+link(review_target(r,'../'),r['title'])+'<p>'+e(r['why_it_matters'])+'</p></li>' for r in papers)
        reading='<details class="map-paper-reading"><summary>Related main and workshop papers</summary><ul>'+items+'</ul><p>These are source-specific reading examples, not a universal architecture or performance ranking.</p></details>'
        pattern=re.compile(r'(<article\b[^>]*\bid="'+re.escape(topic)+r'"[^>]*>)(.*?)(</article>)',re.S)
        def insert(match):
            body=match.group(2)
            close=re.search(r'<a\b[^>]*\bclass="[^\"]*\bclose-detail\b',body)
            at=close.start() if close else len(body)
            return match.group(1)+body[:at]+reading+body[at:]+match.group(3)
        html,count=pattern.subn(insert,html)
        assert count==1, f'Map topic {topic} not found'
    for name,marker in [('map.css','__MAP_CSS_HASH__'),('map.js','__MAP_JS_HASH__'),('theme.css','__THEME_HASH__')]:
        digest=hashlib.sha256((ROOT/name).read_bytes()).hexdigest()[:10]
        html=html.replace(marker,digest)
    html=html.replace('https://charithaakula.github.io/corl26/field-map/','https://charithaakula.github.io/corl26/')
    PAGES[ROOT/'field-map'/'index.html']=html
    PAGES[ROOT/'index.html']=html.replace('href="../','href="').replace('src="../','src="')

def validate_sources():
    assert TALKS and NODES, 'Populate talks.json and knowledge.json before building.'
    assert len(BY_TALK)==len(TALKS), 'Duplicate talk IDs'
    assert len(BY_NODE)==len(NODES), 'Duplicate node IDs'
    assert len(BY_REF)==len(REFS), 'Duplicate reference IDs'
    for n in NODES:
        assert n['stage'] in STAGE_COLOR, f'Unknown stage: {n["id"]}'
        for ex in n.get('examples',[]): assert ex['talk_id'] in BY_TALK, f'Unknown source: {ex}'
        for ref in n.get('reference_ids',[]): assert ref in BY_REF, f'Unknown reference: {ref}'
    for t in TALKS:
        url=t.get('recording_url') or t.get('video','')
        assert f't={int(t["start_s"])}s' in url, f'Timing URL mismatch: {t["id"]}'
    for r in REFS:
        assert r.get('url','').startswith(('https://','http://')), f'Missing source URL: {r}'
        assert not re.search(r'https?://(?:www\.)?(?:x\.com|twitter\.com|linkedin\.com)',r['url']), 'Social reference prohibited'
    for collection in [MAIN_PAPERS, WORKSHOP_PAPERS]:
        assert len({p['id'] for p in collection}) == len(collection), 'Duplicate paper IDs'
        for paper in collection:
            for tid in paper.get('related_talk_ids', []): assert tid in BY_TALK, f'Unknown paper recording: {tid}'
    main_ids={p['id'] for p in MAIN_PAPERS};workshop_ids={p['id'] for p in WORKSHOP_PAPERS}
    for review in RESEARCH_REVIEWS:
        for pid in review.get('main_paper_ids',[]):assert pid in main_ids,(review['id'],pid)
        for pid in review.get('workshop_paper_ids',[]):assert pid in workshop_ids,(review['id'],pid)
        for placement in review.get('panel_placements',[]):
            assert placement['panel_id'] in {p['id'] for p in PANELS}
            assert placement['perspective_index'] in [0,1,2]
    for topic in MAP_EXPANSIONS:
        assert topic['topic_id'] in MAP_TOPIC_LABELS
        for tid in topic['source_talk_ids']:assert tid in BY_TALK,tid
        for rid in topic['source_reference_ids']:assert rid in BY_REF,rid

def export_graph():
    graph=json.loads(json.dumps(KNOWLEDGE))
    graph['references']=[{k:v for k,v in r.items() if not k.startswith('_') and k not in ['source_cache_keys']} for r in REFS]
    graph['nodes']=NODES
    graph['recorded_sources']=[{k:t[k] for k in ['id','title','category','stage','topic','summary_revised','recording_url','chapter_start_s','start_s','timestamp_status'] if k in t} for t in TALKS]
    graph['paper_sources']=[{k:p[k] for k in ['id','title','url','kind','source_url','workshop_title','related_talk_ids','verification'] if k in p} for p in MAIN_PAPERS+WORKSHOP_PAPERS]
    graph['manifests']={'main_papers':'proceedings.json','workshop_papers':'workshop-papers.json','paper_reviews':'paper-reading.json','coverage':'coverage.json','timestamp_audit':'timestamp-audit.json'}
    graph['source_index']=[{'topic_id':n['id'],'talk_ids':[ex['talk_id'] for ex in n.get('examples',[])],'reference_ids':n.get('reference_ids',[]),'kind':'curated source navigation, not a dependency claim'} for n in NODES]
    (ROOT/'data'/'atlas-graph.json').write_text(json.dumps(graph,ensure_ascii=False,indent=2)+'\n')
if __name__=='__main__':
    validate_sources()
    export_graph()
    landing(); library(); field_map()
    for path,html in PAGES.items():
        path.parent.mkdir(parents=True,exist_ok=True)
        staged=path.with_suffix('.html.tmp')
        staged.write_text(html)
        staged.replace(path)
    print(f'Built 4 pages: {len(TALKS)} recordings, {len(NODES)} concepts, {len(MAIN_PAPERS)} main-paper briefs, {len(WORKSHOP_PAPERS)} workshop listings, {len(REFS)} additional references.')
