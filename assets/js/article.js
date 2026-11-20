// Progressive enhancement: the essay remains fully readable without JavaScript.
(() => {
  const article = document.querySelector('.article-body');
  if (!article) return;

  // Native table semantics are preserved inside a keyboard-scrollable region.
  article.querySelectorAll('table').forEach((table, index) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'table-scroll';
    wrapper.tabIndex = 0;
    wrapper.setAttribute('role', 'region');
    wrapper.setAttribute('aria-label', `Comparison table ${index + 1}`);
    table.before(wrapper);
    wrapper.append(table);
  });

  const toc = document.querySelector('.article-toc');
  const headings = [...article.querySelectorAll('h2, h3')];
  if (!toc || headings.filter(heading => heading.tagName === 'H2').length < 3) return;

  const list = toc.querySelector('ol');
  const usedIds = new Set([...document.querySelectorAll('[id]')].map(element => element.id));
  let currentSection;

  headings.forEach((heading, index) => {
    if (!heading.id) {
      const base = heading.textContent.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-|-$/g, '') || `section-${index + 1}`;
      let id = base;
      let suffix = 2;
      while (usedIds.has(id)) id = `${base}-${suffix++}`;
      heading.id = id;
      usedIds.add(id);
    }

    const item = document.createElement('li');
    const link = document.createElement('a');
    link.href = `#${heading.id}`;
    link.textContent = heading.textContent;
    item.append(link);

    if (heading.tagName === 'H3' && currentSection) {
      let sublist = currentSection.querySelector('ol');
      if (!sublist) {
        sublist = document.createElement('ol');
        currentSection.append(sublist);
      }
      sublist.append(item);
    } else {
      list.append(item);
      currentSection = item;
    }
  });
  toc.hidden = false;
})();
