export function initHeader() {
  const header = document.querySelector('.mfy-site-header');
  if (!header) return;
  const toggle = header.querySelector('.mfy-menu-toggle');
  const menu = header.querySelector('.mfy-mobile-menu');
  let ticking = false;
  const updateState = () => { header.classList.toggle('is-scrolled', window.scrollY > 50); ticking = false; };
  const closeMenu = () => {
    header.classList.remove('menu-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Abrir menú');
    menu.setAttribute('aria-hidden', 'true');
  };
  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(updateState); ticking = true; }
  }, { passive: true });
  toggle.addEventListener('click', () => {
    const open = header.classList.toggle('menu-open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    menu.setAttribute('aria-hidden', String(!open));
  });
  header.querySelectorAll('a[href^="#"]').forEach((link) => link.addEventListener('click', (event) => {
    const selector = link.getAttribute('href');
    const target = selector === '#top' ? document.body : document.querySelector(selector);
    if (!target) return;
    event.preventDefault(); closeMenu(); target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }));
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeMenu(); });
  document.addEventListener('click', (event) => { if (!header.contains(event.target)) closeMenu(); });
  updateState();
}
