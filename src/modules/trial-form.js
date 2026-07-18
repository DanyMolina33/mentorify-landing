import { FORM_LOGO_URL } from '../config.js';

export function initTrialFormPresentation() {
  const section = document.querySelector('#mentorify-trial-section');
  const card = section?.querySelector('.mfy-login-card');
  if (!section || !card) return;
  section.querySelector('.mfy-trial-copy')?.remove();
  const formLogo = card.querySelector('.mfy-logo');
  if (formLogo) formLogo.src = FORM_LOGO_URL;
  card.querySelector('.mfy-title-block h2')?.replaceChildren(document.createTextNode('Entrenamiento aplicado'));
  card.querySelector('.mfy-title-block p')?.replaceChildren(document.createTextNode('Solicitud de prueba gratuita por 2 días'));
  const submitLabel = card.querySelector('.mfy-main-btn');
  if (submitLabel) {
    const textNode = [...submitLabel.childNodes].find((node) => node.nodeType === Node.TEXT_NODE && node.textContent.trim());
    if (textNode) textNode.textContent = ' Solicitar prueba';
  }
  const slot = document.querySelector('#mfyHeroFormSlot');
  if (slot) slot.append(card);
  section.classList.add('mfy-trial-relocated');
  const facilitators = document.querySelector('#mfyFacilitadoresV5');
  if (facilitators) {
    section.after(facilitators);
  }
  const labels = card.querySelectorAll('.mfy-field label');
  if (labels[0]) labels[0].htmlFor = 'mfyTrialName';
  if (labels[1]) labels[1].htmlFor = 'mfyTrialEmail';
  card.querySelector('#mfyTrialName')?.setAttribute('required', '');
  card.querySelector('#mfyTrialEmail')?.setAttribute('required', '');
}
