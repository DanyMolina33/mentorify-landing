const WHATSAPP_GROUP_URL = 'https://chat.whatsapp.com/FJ5rb2bzxKrBcYP3TXjjLe';
const PHONE_IMAGE = 'https://secretosdemillonarios.com/wp-content/uploads/2026/07/cel.png';

const whatsappIcon = `<svg viewBox="0 0 32 32" aria-hidden="true"><path fill="currentColor" d="M16.1 3C9 3 3.2 8.8 3.2 15.9c0 2.3.6 4.5 1.7 6.4L3 29l6.9-1.8a12.8 12.8 0 0 0 6.2 1.6c7.1 0 12.9-5.8 12.9-12.9S23.2 3 16.1 3Zm0 23.6c-1.9 0-3.8-.5-5.4-1.5l-.4-.2-4.1 1.1 1.1-4-.3-.4a10.6 10.6 0 1 1 9.1 5Zm5.8-7.9c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2s-.8 1-1 1.2c-.2.2-.4.2-.7.1-2-.9-3.3-1.7-4.6-3.9-.3-.5.3-.5.9-1.6.1-.2.1-.4 0-.6-.1-.2-.7-1.7-1-2.3-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.1 1.1-1.1 2.6 0 1.6 1.1 3 1.3 3.2.2.2 2.2 3.4 5.4 4.8 2 .9 2.8.9 3.8.8.6-.1 1.9-.8 2.2-1.5.3-.7.3-1.3.2-1.5 0-.2-.3-.3-.6-.4Z"/></svg>`;

const benefits = [
  ['bell','Novedades y avisos','<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/>'],
  ['book','Cursos actualizados','<path d="M3 5.5A4.5 4.5 0 0 1 7.5 1H21v17H7.5A4.5 4.5 0 0 0 3 22.5Zm0 0v17A4.5 4.5 0 0 0 7.5 27H21v-4.5H7.5"/>'],
  ['tag','Promociones por lanzamiento','<path d="M20.6 13.6 11 23.2a2 2 0 0 1-2.8 0l-7.4-7.4a2 2 0 0 1 0-2.8L10.4 3.4A2 2 0 0 1 11.8 3H21v9.2a2 2 0 0 1-.4 1.4ZM16 8h.01"/>'],
  ['chat','Recomendaciones y soporte','<path d="M21 15a4 4 0 0 1-4 4H8l-5 4V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z"/>'],
  ['users','Comunidad activa','<path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M8.5 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm15.5 10v-2a4 4 0 0 0-3-3.9M17.5 3.1a4 4 0 0 1 0 7.8"/>']
];

export function initWhatsappCommunity() {
  const faq = document.querySelector('#preguntas-frecuentes');
  if (!faq || document.querySelector('#comunidad-whatsapp')) return;
  const section = document.createElement('section');
  section.id = 'comunidad-whatsapp';
  section.className = 'mfy-whatsapp-community';
  section.innerHTML = `<div class="mfy-wa-shell"><div class="mfy-wa-copy"><div class="mfy-wa-pill">${whatsappIcon}<span>COMUNIDAD DE WHATSAPP</span></div><h2>Únete a nuestra comunidad de WhatsApp</h2><p class="mfy-wa-subtitle">Entérate de novedades, cursos actualizados, avisos importantes, promociones por lanzamiento, recomendaciones y soporte.</p><div class="mfy-wa-benefits">${benefits.map(([,label,path])=>`<div class="mfy-wa-benefit"><span><svg viewBox="0 0 24 24" aria-hidden="true">${path}</svg></span><p>${label}</p></div>`).join('')}</div><a class="mfy-wa-cta" href="${WHATSAPP_GROUP_URL}" target="_blank" rel="noopener noreferrer">${whatsappIcon}<span>Unirme al grupo</span></a><p class="mfy-wa-trust"><span aria-hidden="true">✓</span> Tu número está seguro. Solo compartimos novedades y avisos importantes.</p></div><div class="mfy-wa-visual"><div class="mfy-wa-orbit" aria-hidden="true"></div><img src="${PHONE_IMAGE}" alt="Comunidad de Mentorify en WhatsApp" loading="lazy" decoding="async"><div class="mfy-wa-float" aria-hidden="true">${whatsappIcon}</div></div></div>`;
  faq.after(section);
}
