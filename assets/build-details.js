(() => {
  const dialog = document.getElementById('build-dialog');
  const data = document.getElementById('build-project-data');
  if (!dialog || !data) return;
  const projects = JSON.parse(data.textContent);
  const image = document.getElementById('build-image');
  const title = document.getElementById('build-title');
  const description = document.getElementById('build-description');
  const resources = document.getElementById('build-resources');

  document.querySelectorAll('[data-build]').forEach(button => {
    button.addEventListener('click', event => {
      const project = projects[button.dataset.build];
      if (!project || typeof dialog.showModal !== 'function') return;
      event.preventDefault();
      image.src = project.image;
      image.alt = project.title;
      title.textContent = project.title;
      description.textContent = project.description;
      resources.replaceChildren();
      project.links.forEach(([label, url]) => {
        const link = document.createElement('a');
        link.textContent = label;
        link.href = url;
        if (url.startsWith('#')) {
          link.addEventListener('click', () => dialog.close());
        } else {
          link.target = '_blank';
          link.rel = 'noopener';
        }
        resources.appendChild(link);
      });
      dialog.showModal();
      document.body.classList.add('project-dialog-open');
    });
  });

  document.getElementById('build-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => document.body.classList.remove('project-dialog-open'));
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right ||
        event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  });
})();
