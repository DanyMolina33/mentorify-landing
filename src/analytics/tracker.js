import { isSupabaseConfigured, supabase } from '../lib/supabase.js';

const VISITOR_KEY = 'mfy_analytics_visitor_v1';
const SESSION_KEY = 'mfy_analytics_session_v1';
const SESSION_TIMEOUT = 30 * 60 * 1000;
const ALLOWED_LANDING_PATHS = new Set(['/', '/index.html']);
let context;

const uuid = () => crypto.randomUUID();
const readJson = (storage, key) => {
  try { return JSON.parse(storage.getItem(key) || 'null'); } catch { return null; }
};

function getContext() {
  if (context) return context;
  let visitorId = localStorage.getItem(VISITOR_KEY);
  if (!visitorId) { visitorId = uuid(); localStorage.setItem(VISITOR_KEY, visitorId); }
  const now = Date.now();
  let session = readJson(localStorage, SESSION_KEY);
  if (!session?.id || now - Number(session.lastActivity || 0) > SESSION_TIMEOUT) session = { id: uuid(), lastActivity: now };
  else session.lastActivity = now;
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  context = { visitorId, sessionId: session.id };
  return context;
}

function touchSession() {
  if (!context) return;
  try { localStorage.setItem(SESSION_KEY, JSON.stringify({ id: context.sessionId, lastActivity: Date.now() })); } catch {}
}

export async function trackAnalyticsEvent(eventType, { scrollDepth = null, metadata = {}, pagePath = location.pathname } = {}) {
  if (!isSupabaseConfigured) return;
  if (pagePath.startsWith('/admin/')) return;
  if (pagePath.replace(/\/$/, '') === '/compartir-experiencia' && eventType !== 'testimonio_enviado') return;
  try {
    const { visitorId, sessionId } = getContext();
    touchSession();
    await supabase.from('analytics_events').insert({
      visitor_id: visitorId,
      session_id: sessionId,
      event_type: eventType,
      page_path: pagePath,
      scroll_depth: scrollDepth,
      metadata,
    });
  } catch {
    // La analitica nunca debe interrumpir la accion principal.
  }
}

function bindOnce(selector, eventType, metadata = {}) {
  document.querySelectorAll(selector).forEach(element => {
    if (element.dataset.mfyAnalyticsBound) return;
    element.dataset.mfyAnalyticsBound = 'true';
    element.addEventListener('click', () => { void trackAnalyticsEvent(eventType, { metadata }); }, { passive: true });
  });
}

export function initLandingAnalytics() {
  if (!ALLOWED_LANDING_PATHS.has(location.pathname)) return;
  void trackAnalyticsEvent('page_view');

  const thresholds = [25, 50, 75, 90, 100];
  const reached = new Set();
  let ticking = false;
  const measure = () => {
    ticking = false;
    const available = Math.max(1, document.documentElement.scrollHeight - innerHeight);
    const depth = Math.min(100, Math.round((scrollY / available) * 100));
    thresholds.forEach(value => {
      if (depth >= value && !reached.has(value)) {
        reached.add(value);
        void trackAnalyticsEvent(`scroll_${value}`, { scrollDepth: value });
      }
    });
  };
  addEventListener('scroll', () => {
    if (!ticking) { ticking = true; requestAnimationFrame(measure); }
  }, { passive: true });
  measure();

  bindOnce('a.mfy-header-cta, a.mfy-mobile-cta, a.mfy-hero-button-solid', 'cta_prueba_gratis');
  bindOnce('.mf-discount-box-v2', 'cta_oferta_90');
  bindOnce('#mocHotmartBtn, #mocPeruBtn, #mocBottomBtn', 'cta_comprar');

  const offer = document.querySelector('#mentorifyPremiumPaymentBlock');
  if (offer && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting && entry.intersectionRatio >= 0.35)) {
        void trackAnalyticsEvent('oferta_vista');
        observer.disconnect();
      }
    }, { threshold: [0.35] });
    observer.observe(offer);
  }

  const trial = document.querySelector('#mfyTrialForm');
  if (trial) {
    trial.addEventListener('focusin', () => { void trackAnalyticsEvent('formulario_iniciado', { metadata: { formulario: 'prueba_gratis' } }); }, { once: true });
    trial.addEventListener('submit', () => { void trackAnalyticsEvent('formulario_completado', { metadata: { formulario: 'prueba_gratis' } }); });
  }
}
