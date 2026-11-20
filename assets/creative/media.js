(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  document.querySelectorAll('[data-carousel]').forEach(carousel => {
    const track = carousel.querySelector('.reel-track');
    const controls = carousel.querySelector('.carousel-controls');
    const previous = controls.querySelector('[data-direction="previous"]');
    const next = controls.querySelector('[data-direction="next"]');
    const update = () => {
      const maxScroll = track.scrollWidth - track.clientWidth;
      controls.hidden = maxScroll <= 2;
      previous.disabled = track.scrollLeft <= 2;
      next.disabled = track.scrollLeft >= maxScroll - 2;
    };
    controls.querySelectorAll('button').forEach(button => {
      button.addEventListener('click', () => {
        const first = track.querySelector('li');
        const gap = parseFloat(getComputedStyle(track).columnGap) || 24;
        const step = first.getBoundingClientRect().width + gap;
        track.scrollBy({left: step * (button.dataset.direction === 'next' ? 1 : -1), behavior: reducedMotion.matches ? 'auto' : 'smooth'});
      });
    });
    track.addEventListener('scroll', update, {passive:true});
    window.addEventListener('resize', update);
    if ('ResizeObserver' in window) new ResizeObserver(update).observe(track);
    update();
  });
  const gallery = document.getElementById('friends-gallery');
  if (!gallery) return;
  fetch('../assets/creative/friends.json').then(response => response.ok ? response.json() : [])
    .then(items => {
      if (!Array.isArray(items)) return;
      items.slice(0,6).forEach(item => {
        if (!/^[a-zA-Z0-9_-]+\.(jpe?g|png|webp)$/i.test(item.file || '')) return;
        const figure = document.createElement('figure');
        figure.hidden = true;
        const image = document.createElement('img');
        image.alt = item.alt || 'A moment with friends, food, or a favorite place.';
        image.loading = 'lazy';
        const caption = document.createElement('figcaption');
        caption.textContent = item.caption || '';
        figure.append(image, caption);
        gallery.appendChild(figure);
        image.addEventListener('load', () => {figure.hidden = false; gallery.hidden = false;});
        image.addEventListener('error', () => figure.remove());
        image.src = '../assets/creative/' + item.file;
      });
    }).catch(() => {});
})();
