import { readFileSync } from 'node:fs';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const requiredIds = ['mfyTrialForm','mfyTrialName','mfyTrialEmail','mfyTrialStatus','mfyFacilitadoresV5','preguntas-frecuentes','mf-apple-exp','mentorifyPremiumPaymentBlock','mentorifyOfferCard','mfyPeruModal'];
const failures = [];

for (const id of requiredIds) {
  const count = [...html.matchAll(new RegExp(`id=["']${id}["']`, 'g'))].length;
  if (count !== 1) failures.push(`${id}: esperado 1, encontrado ${count}`);
}

const inlineScripts = [...html.matchAll(/<script(?![^>]*type=["']module["'])[^>]*>([\s\S]*?)<\/script>/gi)];
inlineScripts.forEach((match, index) => {
  try { new Function(match[1]); } catch (error) { failures.push(`script inline ${index + 1}: ${error.message}`); }
});

const checks = {
  '7 preguntas FAQ': (html.match(/<button class="mentorify-apple-faq__question/g) || []).length === 7,
  '3 acordeones de experiencia': (html.match(/<button class="mf-apple-exp__trigger/g) || []).length === 3,
  'Hotmart original': html.includes('https://pay.hotmart.com/B100727388A?checkoutMode=10'),
  'evento Perú': html.includes('mentorify:peru-cta-click'),
  'cupón MENTOR10': html.includes('MENTOR10'),
  'límite 8 MB': html.includes('8 * 1024 * 1024'),
  'trial 48 horas': html.includes('acceso de prueba por 48 horas'),
  'sin href vacío': !html.includes('href="#"'),
};
for (const [name, ok] of Object.entries(checks)) if (!ok) failures.push(name);

if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}
console.log(`Validación estática correcta: ${inlineScripts.length} scripts heredados, IDs, URLs y flujos críticos preservados.`);
