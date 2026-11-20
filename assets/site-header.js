(() => {
  const toggle=document.querySelector('.portfolio-menu');
  const nav=document.getElementById('portfolio-nav');
  if(!toggle||!nav)return;
  const close=()=>{nav.classList.remove('is-open');toggle.setAttribute('aria-expanded','false');};
  toggle.addEventListener('click',()=>{const open=!nav.classList.contains('is-open');nav.classList.toggle('is-open',open);toggle.setAttribute('aria-expanded',String(open));});
  nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',close));
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav.classList.contains('is-open')){close();toggle.focus();}});
  window.addEventListener('resize',()=>{if(window.innerWidth>900)close();});
})();
