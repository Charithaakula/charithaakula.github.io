(() => {
  const toggle=document.querySelector('.portfolio-menu');
  const nav=document.getElementById('portfolio-nav');
  if(!toggle||!nav)return;
  const close=()=>{nav.classList.remove('is-open');toggle.setAttribute('aria-expanded','false');};
  toggle.addEventListener('click',()=>{const open=!nav.classList.contains('is-open');nav.classList.toggle('is-open',open);toggle.setAttribute('aria-expanded',String(open));});
  nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',close));
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav.classList.contains('is-open')){close();toggle.focus();}});
  window.addEventListener('resize',()=>{if(window.innerWidth>900)close();});
  const sectionLinks=Array.from(nav.querySelectorAll('a[href^="#"]'));
  const sections=sectionLinks.map(link=>document.getElementById(link.hash.slice(1))).filter(Boolean);
  if(!sections.length)return;
  const updateActive=()=>{
    let current=sections[0].id;
    let currentTop=-Infinity;
    const requested=location.hash.slice(1);
    const line=document.querySelector('.portfolio-header').getBoundingClientRect().height+30;
    for(const section of sections){
      const top=section.getBoundingClientRect().top;
      if(top>line)break;
      if(Math.abs(top-currentTop)>1||section.id===requested){current=section.id;currentTop=top;}
    }
    sectionLinks.forEach(link=>{
      if(link.hash.slice(1)===current)link.setAttribute('aria-current','location');
      else link.removeAttribute('aria-current');
    });
  };
  let pending=false;
  window.addEventListener('scroll',()=>{
    if(pending)return;
    pending=true;
    requestAnimationFrame(()=>{updateActive();pending=false;});
  },{passive:true});
  window.addEventListener('hashchange',updateActive);
  window.addEventListener('load',updateActive);
  window.addEventListener('resize',updateActive);
  updateActive();
})();
