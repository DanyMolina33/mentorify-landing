export function initAccordions() {
  document.querySelectorAll('.mfy-main-toggle, .mfy-cat-btn, .mfy-theme-btn, .mfy-author-btn, .mentorify-apple-faq__question, .mf-apple-exp__trigger').forEach((button, index) => {
    button.setAttribute('aria-expanded', button.classList.contains('is-active') ? 'true' : 'false');
    button.addEventListener('click', () => requestAnimationFrame(() => button.setAttribute('aria-expanded', button.classList.contains('is-active') || button.closest('.is-open') ? 'true' : 'false')));
    if (!button.type && button.tagName === 'BUTTON') button.type = 'button';
    if (!button.id) button.id = `mfy-accordion-${index}`;
  });
}
