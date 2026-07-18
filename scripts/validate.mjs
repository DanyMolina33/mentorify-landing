import { existsSync, readFileSync } from 'node:fs';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const requiredIds = ['mfyTrialForm','mfyTrialName','mfyTrialEmail','mfyTrialStatus','mfyFacilitadoresV5','preguntas-frecuentes','mf-apple-exp','mentorifyPremiumPaymentBlock','mentorifyOfferCard','mfyPeruModal'];
const failures = [];

const projectFiles = {
  adminHtml: new URL('../admin/testimonios/index.html', import.meta.url),
  shareHtml: new URL('../compartir-experiencia/index.html', import.meta.url),
  adminJs: new URL('../src/admin-testimonials.js', import.meta.url),
  standaloneJs: new URL('../src/standalone-testimonial.js', import.meta.url),
  testimonialRepository: new URL('../src/testimonials/repository.js', import.meta.url),
  migrationBase: new URL('../supabase/migrations/202607180001_testimonios.sql', import.meta.url),
  migrationPublicView: new URL('../supabase/migrations/202607180002_testimonios_publicos_categoria.sql', import.meta.url),
  analyticsHtml: new URL('../admin/dashboard/index.html', import.meta.url),
  analyticsJs: new URL('../src/admin-dashboard.js', import.meta.url),
  analyticsTracker: new URL('../src/analytics/tracker.js', import.meta.url),
  analyticsMigration: new URL('../supabase/migrations/202607180003_analytics_landing.sql', import.meta.url),
};

for (const [name, url] of Object.entries(projectFiles)) {
  if (!existsSync(url)) failures.push(`archivo requerido ausente: ${name}`);
}

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

if (Object.values(projectFiles).every(existsSync)) {
  const adminJs = readFileSync(projectFiles.adminJs, 'utf8');
  const standaloneJs = readFileSync(projectFiles.standaloneJs, 'utf8');
  const repository = readFileSync(projectFiles.testimonialRepository, 'utf8');
  const baseMigration = readFileSync(projectFiles.migrationBase, 'utf8');
  const publicViewMigration = readFileSync(projectFiles.migrationPublicView, 'utf8');
  const testimonialChecks = {
    'login Supabase': adminJs.includes('signInWithPassword'),
    'validación admin_users': adminJs.includes("from('admin_users')"),
    'CRUD administrativo': ['insert(payload)', 'update(payload)', ".delete().eq('id'"].every(token => adminJs.includes(token)),
    'estados administrativos': ['PENDIENTE', 'APROBADO', 'OCULTO'].every(token => adminJs.includes(token)),
    'origen enlace directo': standaloneJs.includes("origin: 'enlace_directo'"),
    'inserción pública pendiente': repository.includes('TESTIMONIAL_STATES.PENDING') && repository.includes('destacado: false'),
    'RLS activado': baseMigration.includes('alter table public.testimonios enable row level security'),
    'administración restringida': baseMigration.includes('public.es_admin()'),
    'vista solo aprobados': publicViewMigration.includes("where estado = 'APROBADO' and autorizacion_publicacion = true"),
    'vista incluye contenido': publicViewMigration.includes('contenido_explorado'),
    'bucket de avatares': baseMigration.includes("'testimonial-avatars'"),
  };
  for (const [name, ok] of Object.entries(testimonialChecks)) if (!ok) failures.push(name);

  const analyticsJs = readFileSync(projectFiles.analyticsJs, 'utf8');
  const analyticsTracker = readFileSync(projectFiles.analyticsTracker, 'utf8');
  const analyticsMigration = readFileSync(projectFiles.analyticsMigration, 'utf8');
  const analyticsChecks = {
    'dashboard protegido por admin_users': analyticsJs.includes("from('admin_users')"),
    'dashboard consulta analytics_events': analyticsJs.includes("from('analytics_events')"),
    'tracking de page view': analyticsTracker.includes("trackAnalyticsEvent('page_view')"),
    'tracking de cinco umbrales': '[25, 50, 75, 90, 100]'.split(', ').every(value => analyticsTracker.includes(value)),
    'oferta con IntersectionObserver': analyticsTracker.includes('IntersectionObserver') && analyticsTracker.includes("'oferta_vista'"),
    'RLS de analytics': analyticsMigration.includes('alter table public.analytics_events enable row level security'),
    'lectura admin restringida': analyticsMigration.includes('using (public.es_admin())'),
    'sin lectura publica analytics': !analyticsMigration.includes('grant select on public.analytics_events to anon'),
  };
  for (const [name, ok] of Object.entries(analyticsChecks)) if (!ok) failures.push(name);
}

if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}
console.log(`Validación estática correcta: ${inlineScripts.length} scripts heredados, IDs, URLs y flujos críticos preservados.`);
