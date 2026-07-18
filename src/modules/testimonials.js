import { isSupabaseConfigured } from '../lib/supabase.js';
import { getApprovedTestimonials } from '../testimonials/repository.js';
import { initTestimonialForm, testimonialFormMarkup } from '../testimonials/form.js';

const escapeHtml = value => String(value ?? '').replace(/[&<>'"]/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));
const initials = name => name.split(/\s+/).filter(Boolean).slice(0,2).map(part=>part[0]).join('').toUpperCase();
const safeAvatar = value => /^https:\/\//i.test(value ?? '') ? escapeHtml(value) : '';
const INITIAL_TESTIMONIALS = [
  {id:'initial-1',nombre:'Mariana R.',ciudad:'Lima',pais:'Perú',contenido_explorado:'Experiencia general en la biblioteca',calificacion:5,orden:100,comentario:'Lo que más valoro es que todo está organizado y puedo continuar exactamente desde donde me quedé. La calidad de los videos y la forma de presentar los contenidos hacen que estudiar se sienta mucho más sencillo.'},
  {id:'initial-2',nombre:'Carlos M.',ciudad:'Ciudad de México',pais:'México',contenido_explorado:'Código del Dinero',calificacion:5,orden:101,comentario:'Empecé Código del Dinero buscando ordenar mejor mis ideas. Las clases me están ayudando a entender mis hábitos y a tomar decisiones con más claridad. Ahora siento que tengo una ruta concreta para avanzar.'},
  {id:'initial-3',nombre:'Andrea P.',ciudad:'Quito',pais:'Ecuador',contenido_explorado:'Salud y Reconversión',calificacion:5,orden:102,comentario:'Comencé el programa hace algunas semanas y he aprendido a observar mejor mis hábitos. Estoy reduciendo el consumo de azúcar y comprendiendo cómo pequeñas decisiones pueden influir en mi bienestar.'},
  {id:'initial-4',nombre:'Lucía G.',ciudad:'Arequipa',pais:'Perú',contenido_explorado:'Neuroaprendizaje',calificacion:5,orden:103,comentario:'Los contenidos de aprendizaje me ayudaron a comprender nuevas formas de estudiar y acompañar a mi hija. Ahora organizamos mejor sus sesiones y puedo explicarle las ideas de una manera mucho más clara.'},
  {id:'initial-5',nombre:'Diego A.',ciudad:'Guayaquil',pais:'Ecuador',contenido_explorado:'Liderazgo y desarrollo personal',calificacion:5,orden:104,comentario:'Encontré herramientas muy prácticas para comunicarme mejor y afrontar situaciones con más calma. Me gusta que los talleres no estén sueltos, sino dentro de una plataforma que mantiene todo ordenado.'},
];

const formatPublicationDate = item => {
  const rawDate = item.fecha_publicacion || item.fecha_creacion || item.fecha;
  if (!rawDate) return 'Publicado recientemente';
  const date = new Date(`${rawDate}`.length === 10 ? `${rawDate}T12:00:00` : rawDate);
  if (Number.isNaN(date.getTime())) return 'Publicado recientemente';
  return `Publicado el ${new Intl.DateTimeFormat('es-PE',{day:'numeric',month:'long',year:'numeric'}).format(date)}`;
};

function testimonialCard(item, duplicate = false) {
  const location = [item.ciudad,item.pais].filter(Boolean).join(', ');
  const avatar = safeAvatar(item.foto_url);
  const avatarMarkup = avatar
    ? `<img class="mfy-testimonial-avatar mfy-testimonial-avatar-image" src="${avatar}" alt="" loading="lazy" decoding="async">`
    : `<span class="mfy-testimonial-avatar" aria-hidden="true">${escapeHtml(initials(item.nombre))}</span>`;
  return `<article class="mfy-testimonial-card"${duplicate?' aria-hidden="true"':''}>
    <div class="mfy-testimonial-top">${avatarMarkup}<div><h3>${escapeHtml(item.nombre)}</h3>${location?`<p>${escapeHtml(location)}</p>`:''}</div></div>
    ${item.contenido_explorado?`<p class="mfy-testimonial-area">${escapeHtml(item.contenido_explorado)}</p>`:''}
    <div class="mfy-testimonial-stars" aria-label="${Number(item.calificacion)||5} de 5 estrellas">${'★'.repeat(Number(item.calificacion)||5)}</div>
    <p class="mfy-testimonial-quote">“${escapeHtml(item.comentario)}”</p><span class="mfy-testimonial-date">${escapeHtml(formatPublicationDate(item))}</span>${item.destacado?'<span class="mfy-testimonial-badge">Experiencia destacada</span>':''}
  </article>`;
}

export function initTestimonials() {
  const experience = document.querySelector('#mf-apple-exp');
  if (!experience || document.querySelector('#experiencias-mentorify')) return;
  const section = document.createElement('section');
  section.id = 'experiencias-mentorify';
  section.className = 'mfy-testimonials';
  section.innerHTML = `<div class="mfy-testimonials-wrap"><header class="mfy-testimonials-head"><p class="mfy-testimonials-kicker">EXPERIENCIAS MENTORIFY</p><h2>Experiencias que inspiran a<br>seguir avanzando.</h2><p>Descubre las experiencias de personas que utilizan Mentorify para aprender con más claridad, organización y constancia.</p><span>Opiniones reales de usuarios de nuestra comunidad.</span></header><div class="mfy-testimonials-live" aria-live="polite"><p class="mfy-testimonials-note">Cargando experiencias…</p></div><div class="mfy-testimonials-cta"><div><h3>¿Ya navegaste en la biblioteca?</h3><p>Cuéntanos cómo fue tu experiencia y ayúdanos a seguir mejorando Mentorify.</p></div><button type="button" class="mfy-testimonials-open">Dejar mi experiencia</button></div></div>`;
  experience.after(section);
  preserveSectionOrder(section);
  createModal(section);
  loadTestimonials(section);
}

function preserveSectionOrder(section) {
  const offer = document.querySelector('#mentorifyPremiumPaymentBlock');
  if (offer) {
    section.after(offer);
    const faq = document.querySelector('#preguntas-frecuentes');
    if (faq) offer.after(faq);
  }
}

async function loadTestimonials(section) {
  const live = section.querySelector('.mfy-testimonials-live');
  if (!isSupabaseConfigured) {
    renderCarousel(section, INITIAL_TESTIMONIALS);
    return;
  }
  try {
    const items = await getApprovedTestimonials();
    const combined = [...items, ...INITIAL_TESTIMONIALS].sort((a,b)=>Number(Boolean(b.destacado))-Number(Boolean(a.destacado))||(Number(a.orden)||0)-(Number(b.orden)||0)||new Date(b.fecha_creacion||b.fecha||0)-new Date(a.fecha_creacion||a.fecha||0));
    renderCarousel(section, combined);
  } catch (error) {
    console.error('No se pudieron cargar los testimonios', error);
    renderCarousel(section, INITIAL_TESTIMONIALS);
  }
}

function renderCarousel(section, items) {
  const live = section.querySelector('.mfy-testimonials-live');
  const primary = items.map(item=>testimonialCard(item)).join('');
  const duplicate = items.map(item=>testimonialCard(item,true)).join('');
  live.innerHTML = `<div class="mfy-testimonials-carousel" aria-label="Experiencias de usuarios"><div class="mfy-testimonials-track">${duplicate}${primary}${duplicate}</div></div><div class="mfy-testimonials-controls"><button type="button" class="mfy-testimonials-prev" aria-label="Experiencia anterior">‹</button><button type="button" class="mfy-testimonials-next" aria-label="Experiencia siguiente">›</button></div><p class="mfy-testimonials-note">Las nuevas experiencias pueden tardar unos minutos en aparecer después de ser registradas.</p>`;
  requestAnimationFrame(()=>live.classList.add('is-visible'));
  wireCarousel(section, items.length);
}

function createModal(section) {
  const modal = document.createElement('div');
  modal.className = 'mfy-testimonial-modal';
  modal.hidden = true;
  modal.innerHTML = `<div class="mfy-testimonial-backdrop" data-close></div><div class="mfy-testimonial-dialog" role="dialog" aria-modal="true" aria-labelledby="mfyTestimonialTitle"><button class="mfy-testimonial-close" type="button" aria-label="Cerrar" data-close>×</button>${testimonialFormMarkup()}</div>`;
  document.body.append(modal);
  const opener = section.querySelector('.mfy-testimonials-open');
  const dialog = modal.querySelector('.mfy-testimonial-dialog');
  let lastFocus;
  const reset = initTestimonialForm(modal,{origin:'landing_modal',onSuccessClose:()=>close()});
  const focusables = () => [...dialog.querySelectorAll('button,input,select,textarea')].filter(element=>!element.disabled&&element.offsetParent!==null);
  const open = () => {lastFocus=document.activeElement;modal.hidden=false;document.body.classList.add('mfy-modal-open');requestAnimationFrame(()=>modal.querySelector('.mfy-testimonial-close').focus())};
  const close = () => {modal.hidden=true;document.body.classList.remove('mfy-modal-open');reset();lastFocus?.focus()};
  opener.addEventListener('click',open);
  modal.querySelectorAll('[data-close]').forEach(element=>element.addEventListener('click',close));
  modal.addEventListener('keydown',event=>{if(event.key==='Escape')close();if(event.key==='Tab'){const elements=focusables();if(!elements.length)return;const first=elements[0],last=elements.at(-1);if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus()}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus()}}});
}

function wireCarousel(section, itemCount) {
  const viewport = section.querySelector('.mfy-testimonials-carousel');
  const track = section.querySelector('.mfy-testimonials-track');
  if (!viewport || !track) return;
  let timer, normalizeTimer, movingTimer;
  const step = () => track.querySelector('.mfy-testimonial-card').getBoundingClientRect().width + 20;
  const setWidth = () => track.scrollWidth / 3;
  const normalize = () => {const width=setWidth();if(viewport.scrollLeft<width*.35)viewport.scrollLeft+=width;else if(viewport.scrollLeft>width*1.65)viewport.scrollLeft-=width};
  const schedule = () => {clearTimeout(timer);if(itemCount>1)timer=setTimeout(()=>move(1,false),7000)};
  const move = (direction,manual=true) => {track.classList.remove('is-moving-left','is-moving-right');void track.offsetWidth;track.classList.add(direction>0?'is-moving-left':'is-moving-right');clearTimeout(movingTimer);movingTimer=setTimeout(()=>track.classList.remove('is-moving-left','is-moving-right'),650);viewport.scrollBy({left:direction*step(),behavior:'smooth'});clearTimeout(normalizeTimer);normalizeTimer=setTimeout(normalize,650);schedule()};
  requestAnimationFrame(()=>{viewport.scrollLeft=setWidth();schedule()});
  section.querySelector('.mfy-testimonials-prev').addEventListener('click',()=>move(-1));
  section.querySelector('.mfy-testimonials-next').addEventListener('click',()=>move(1));
  viewport.addEventListener('pointerup',schedule);viewport.addEventListener('touchend',schedule,{passive:true});viewport.addEventListener('scroll',()=>{clearTimeout(normalizeTimer);normalizeTimer=setTimeout(normalize,180)},{passive:true});
  document.addEventListener('visibilitychange',()=>{if(!document.hidden)schedule()});
}
