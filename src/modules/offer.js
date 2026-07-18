import { HOTMART_URL } from '../config.js';
export function initOffer() {
  document.querySelectorAll('#mocHotmartBtn, #mocBottomBtn').forEach((link) => { link.href = HOTMART_URL; });
  const title = document.querySelector('#mentorifyPremiumPaymentBlock h2, #mentorifyPremiumPaymentBlock .moc-main-title');
  if (title) title.textContent = 'Convierte todo lo que aprendes en progreso real.';
  const description = document.querySelector('#mentorifyPremiumPaymentBlock .mf-pack-desc-v2');
  if (description) description.textContent = 'La plataforma organiza tu biblioteca, guarda exactamente dónde te quedaste y te ayuda a retomar cada contenido con claridad, sin empezar nuevamente desde cero.';
  const discountCta = document.querySelector('#mentorifyPremiumPaymentBlock .mf-discount-box-v2');
  if (discountCta) discountCta.addEventListener('click', () => document.querySelector('#mocBottomBtn')?.click());
}
