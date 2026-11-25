/* Native disclosures and links hold the notes; JS adds deep links and figure viewing. */
(() => {
  'use strict';
  if (document.body.dataset.page!=='guide') return;
  const atlasBase=new URL(document.body.dataset.atlasBase || './',location.href);
  const aliases={
    learn:'detail-learn-1',act:'execution',improve:'detail-improve-1',architectures:'detail-act-2',
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
  const hashValue=()=>{
    try{return decodeURIComponent(location.hash.slice(1));}
    catch(_){return '';}
  };
  const contents=[...document.querySelectorAll('.guide-toc a[href^="#"],.guide-toc-mobile a[href^="#"]')];
  const markCurrent=id=>contents.forEach(a=>{
    if(a.hash==='#'+id)a.setAttribute('aria-current','location');
    else a.removeAttribute('aria-current');
  });
  const openTarget=target=>{
    const detail=target.closest('details.guide-component,details.chapter-source-key');
    if(detail)detail.open=true;
  };
  const route=()=>{
    const raw=hashValue();
    if(raw==='panels'||/^panel-\d+$/.test(raw)){
      location.replace(new URL('panels/index.html#'+raw,atlasBase).href);return;
    }
    if(raw==='library'||raw.startsWith('library?')){
      location.replace(new URL('library/index.html'+(raw.includes('?')?'?'+raw.split('?').slice(1).join('?'):''),atlasBase).href);return;
    }
    if(raw==='topic-contact-control'||raw==='topic-humanoid-control'){
      const params=new URLSearchParams({q:raw==='topic-contact-control'?'force':'humanoid'});
      const source=new URLSearchParams(location.search).get('source');
      if(source){params.delete('q');params.set('talk',source);}
      location.replace(new URL('library/index.html?'+params,atlasBase).href);return;
    }
    const id=aliases[raw]||raw;
    const target=document.getElementById(id);
    if(!target)return;
    openTarget(target);
    if(id!==raw)history.replaceState(null,'','#'+id);
    requestAnimationFrame(()=>target.scrollIntoView({block:'start'}));
    markCurrent(id);
  };
  addEventListener('hashchange',route);
  route();
  document.addEventListener('click',event=>{
    if(event.defaultPrevented||event.button!==0||event.metaKey||event.ctrlKey||event.altKey||event.shiftKey)return;
    const anchor=event.target.closest('a[href]');
    if(!anchor)return;
    const url=new URL(anchor.href,location.href);
    if(url.origin!==location.origin||url.pathname!==location.pathname||url.search!==location.search||!url.hash)return;
    let raw;try{raw=decodeURIComponent(url.hash.slice(1));}catch(_){return;}
    const target=document.getElementById(aliases[raw]||raw);
    if(!target)return;
    openTarget(target);
    if(url.hash===location.hash){
      markCurrent(target.id);
      requestAnimationFrame(()=>target.scrollIntoView({block:'start'}));
    }
  });
  document.querySelectorAll('.guide-toc-mobile a[href^="#"]').forEach(a=>a.addEventListener('click',()=>{
    const detail=a.closest('details');if(detail)detail.open=false;
  }));
  if(typeof IntersectionObserver==='function'){
    const headings=[...document.querySelectorAll('.guide-chapter[id],.guide-component[id]')];
    const visible=new Set();
    const observer=new IntersectionObserver(entries=>{
      entries.forEach(entry=>entry.isIntersecting?visible.add(entry.target):visible.delete(entry.target));
      const components=[...visible].filter(node=>node.classList.contains('guide-component'));
      const current=(components.length?components:[...visible]).sort((a,b)=>a.getBoundingClientRect().top-b.getBoundingClientRect().top)[0];
      if(current)markCurrent(current.id);
    },{rootMargin:'-24px 0px -65% 0px',threshold:0});
    headings.forEach(heading=>observer.observe(heading));
  }

  const disclosures=[...document.querySelectorAll('details.guide-component,details.chapter-source-key')];
  let printState=null;
  addEventListener('beforeprint',()=>{
    if(printState)return;
    printState=disclosures.map(node=>({node,open:node.open,name:node.getAttribute('name')}));
    disclosures.forEach(node=>node.removeAttribute('name'));
    disclosures.forEach(node=>node.open=true);
  });
  addEventListener('afterprint',()=>{
    if(!printState)return;
    const state=printState;printState=null;
    state.forEach(item=>item.node.open=item.open);
    state.forEach(item=>{if(item.name!==null)item.node.setAttribute('name',item.name);});
  });

  const dialog=document.getElementById('figure-dialog');
  const image=document.getElementById('figure-image');
  const viewport=document.getElementById('figure-scroll');
  const title=document.getElementById('figure-title');
  const close=document.getElementById('figure-close');
  const fit=document.getElementById('figure-fit');
  const zoomIn=document.getElementById('figure-zoom-in');
  const zoomOut=document.getElementById('figure-zoom-out');
  const original=document.getElementById('figure-original');
  const download=document.getElementById('figure-download');
  const status=document.getElementById('figure-status');
  if(!dialog||typeof dialog.showModal!=='function'||!image||!viewport||!title||!close||!fit||!zoomIn||!zoomOut||!original||!download)return;
  const minimum=.05,maximum=3;
  let trigger=null,scale=1,mode='fit',loaded=false;
  viewport.tabIndex=0;
  if(!viewport.hasAttribute('aria-label'))viewport.setAttribute('aria-label','Diagram viewport. Scroll to explore the enlarged image.');
  if(status){status.setAttribute('role','status');status.setAttribute('aria-live','polite');}
  const available=()=>{
    const style=getComputedStyle(viewport);
    return {
      width:Math.max(1,viewport.clientWidth-parseFloat(style.paddingLeft)-parseFloat(style.paddingRight)),
      height:Math.max(1,viewport.clientHeight-parseFloat(style.paddingTop)-parseFloat(style.paddingBottom))
    };
  };
  const refresh=()=>{
    if(!dialog.open||!loaded||!image.naturalWidth)return;
    const space=available();
    if(mode==='fit')scale=Math.min(1,space.width/image.naturalWidth,space.height/image.naturalHeight);
    const width=Math.round(image.naturalWidth*scale),height=Math.round(image.naturalHeight*scale);
    image.style.width=width+'px';image.style.height=height+'px';
    const margin=Math.max(0,Math.floor((space.height-height)/2));
    image.style.marginTop=margin+'px';image.style.marginBottom=margin+'px';
    fit.setAttribute('aria-pressed',String(mode==='fit'));
    original.setAttribute('aria-pressed',String(mode==='original'));
    zoomIn.disabled=scale>=maximum;zoomOut.disabled=scale<=minimum;
    if(status)status.textContent=Math.round(scale*100)+'% · '+image.naturalWidth+' × '+image.naturalHeight+' px';
  };
  const setScale=(next,newMode='zoom')=>{
    if(!loaded)return;
    const before=scale;
    const frame=viewport.getBoundingClientRect(),picture=image.getBoundingClientRect();
    const centerX=(frame.left+viewport.clientLeft+viewport.clientWidth/2-picture.left)/before;
    const centerY=(frame.top+viewport.clientTop+viewport.clientHeight/2-picture.top)/before;
    mode=newMode;scale=Math.max(minimum,Math.min(maximum,next));
    refresh();
    if(newMode==='fit'){viewport.scrollLeft=0;viewport.scrollTop=0;}
    else{
      viewport.scrollLeft=image.offsetLeft+centerX*scale-viewport.clientWidth/2;
      viewport.scrollTop=image.offsetTop+centerY*scale-viewport.clientHeight/2;
    }
  };
  const ready=()=>{
    if(!dialog.open||!image.naturalWidth)return;
    loaded=true;fit.disabled=original.disabled=false;mode='fit';
    refresh();viewport.scrollLeft=viewport.scrollTop=0;
  };
  image.addEventListener('load',ready);
  image.addEventListener('error',()=>{
    loaded=false;
    if(status)status.textContent='The image could not be loaded. Open or download the original figure.';
  });
  document.querySelectorAll('.figure-open[data-image]').forEach(button=>{
    button.setAttribute('aria-haspopup','dialog');button.setAttribute('aria-controls',dialog.id);
    button.addEventListener('click',event=>{
      if(button.tagName==='A'&&(event.metaKey||event.ctrlKey||event.altKey||event.shiftKey))return;
      const source=new URL(button.dataset.image,location.href);
      if(!['http:','https:','file:'].includes(source.protocol))return;
      event.preventDefault();trigger=button;loaded=false;mode='fit';
      title.textContent=button.dataset.title||'Original figure';
      image.alt=button.dataset.alt||button.querySelector('img')?.alt||title.textContent;
      image.style.width='';image.style.height='';image.style.marginTop=image.style.marginBottom='0px';
      download.href=source.href;download.download=source.pathname.split('/').pop()||'corl-diagram.png';
      fit.disabled=zoomIn.disabled=zoomOut.disabled=original.disabled=true;
      if(status)status.textContent='Loading the original image…';
      image.src=source.href;
      try{if(!dialog.open)dialog.showModal();}
      catch(_){location.assign(source.href);return;}
      document.documentElement.classList.add('guide-figure-open');
      close.focus({preventScroll:true});
      if(image.complete&&image.naturalWidth)ready();
      requestAnimationFrame(()=>{if(dialog.open&&image.complete&&image.naturalWidth)ready();});
    });
  });
  close.addEventListener('click',()=>dialog.close());
  fit.addEventListener('click',()=>setScale(scale,'fit'));
  original.addEventListener('click',()=>setScale(1,'original'));
  zoomIn.addEventListener('click',()=>setScale(scale*1.35));
  zoomOut.addEventListener('click',()=>setScale(scale/1.35));
  dialog.addEventListener('keydown',event=>{
    if(event.key==='Escape'){event.preventDefault();dialog.close();return;}
    if(event.ctrlKey||event.metaKey||event.altKey)return;
    if(event.key==='+'||event.key==='='){event.preventDefault();setScale(scale*1.35);}
    if(event.key==='-'){event.preventDefault();setScale(scale/1.35);}
    if(event.key==='0'){event.preventDefault();setScale(scale,'fit');}
  });
  dialog.addEventListener('click',event=>{
    if(event.target!==dialog)return;
    const rect=dialog.getBoundingClientRect();
    if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)dialog.close();
  });
  dialog.addEventListener('close',()=>{
    if(dialog.open)return;
    document.documentElement.classList.remove('guide-figure-open');
    trigger?.focus({preventScroll:true});trigger=null;
  });
  if(typeof ResizeObserver==='function')new ResizeObserver(refresh).observe(viewport);
  else addEventListener('resize',refresh);
})();
