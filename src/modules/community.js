import { COMMUNITY_URL } from '../config.js';

export function initCommunity() {
  const app = document.querySelector('.mfy-app-block');
  if (!app) return;
  const block = document.createElement('section');
  block.className = 'mfy-community reveal';
  block.innerHTML = `<div><p class="mfy-eyebrow">COMUNIDAD MENTORIFY</p><h2>Únete a la comunidad Mentorify.</h2><p>Recibe masterclasses gratuitas, recomendaciones de aprendizaje y novedades para seguir avanzando cada día.</p></div><button type="button" class="mfy-community-button">UNIRME A LA COMUNIDAD</button>`;
  const button = block.querySelector('button');
  if (COMMUNITY_URL) button.addEventListener('click', () => window.open(COMMUNITY_URL, '_blank', 'noopener'));
  else { button.disabled = true; button.title = 'Enlace oficial próximamente'; /* TODO: agregar enlace oficial de comunidad */ }
  app.after(block);
}
