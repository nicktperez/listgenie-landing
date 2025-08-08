// Mobile menu toggle
(() => {
  const toggle = document.querySelector('.nav-toggle');
  const sheet  = document.getElementById('mobile-menu');
  if (!toggle || !sheet) return;

  const open = () => {
    toggle.setAttribute('aria-expanded', 'true');
    sheet.classList.add('open');
    sheet.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };
  const close = () => {
    toggle.setAttribute('aria-expanded', 'false');
    sheet.classList.remove('open');
    sheet.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    isOpen ? close() : open();
  });
  sheet.addEventListener('click', (e) => { if (e.target.matches('a')) close(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
  matchMedia('(min-width:900px)').addEventListener('change', (e) => e.matches && close());
})();

// Footer year
document.getElementById('year')?.replaceWith((() => {
  const span = document.createElement('span');
  span.id = 'year';
  span.textContent = new Date().getFullYear();
  return span;
})());