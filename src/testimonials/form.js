import { isSupabaseConfigured } from '../lib/supabase.js';
import { submitTestimonial } from './repository.js';
import { trackAnalyticsEvent } from '../analytics/tracker.js';

export const COUNTRIES = ['Perú','México','Ecuador','Colombia','Chile','Argentina','Bolivia','Brasil','Uruguay','Paraguay','Venezuela','Panamá','Costa Rica','Guatemala','El Salvador','Honduras','Nicaragua','República Dominicana','Puerto Rico','Estados Unidos','Canadá','España','Italia','Francia','Alemania','Suiza','Reino Unido','Portugal','Otro'];
export const PLANS = ['Plan Individual','Plan Master Pack','Plan Élite','Plan Total','Aún no tengo un plan'];
export const CONTENT_OPTIONS = ['Código del Dinero','Salud y Reconversión','Neuroaprendizaje','Coaching y Liderazgo','Libros','Audiolibros','Felicidad Diaria','Jim Kwik / Neuroaprendizaje','Neil Donald Walsch','Método Yuen','Lain García Calvo','Reprogramación Interior','Constelaciones','Autohipnosis','Varios contenidos','Otro'];

const options = values => values.map(value => `<option value="${value}">${value}</option>`).join('');

export function testimonialFormMarkup({ titleId = 'mfyTestimonialTitle', standalone = false } = {}) {
  return `<div class="mfy-testimonial-form-view">
    ${standalone ? '' : `<header><h2 id="${titleId}">Comparte tu experiencia</h2><p>Tu opinión nos ayuda a mejorar la plataforma y puede orientar a otras personas.</p></header>`}
    <form class="mfy-testimonial-form" novalidate>
      <input class="mfy-form-honeypot" name="website" tabindex="-1" autocomplete="off" aria-hidden="true">
      <div class="mfy-testimonial-fields">
        <label>Nombre<input name="nombre" required minlength="2" maxlength="120" autocomplete="name"></label>
        <label>Ciudad<input name="ciudad" maxlength="120" autocomplete="address-level2"></label>
        <div class="mfy-country-field"><span class="mfy-field-label">País</span><div class="mfy-country-combobox"><button class="mfy-country-trigger" type="button" aria-haspopup="listbox" aria-expanded="false"><span>Selecciona tu país</span><i aria-hidden="true"></i></button><div class="mfy-country-dropdown" hidden><input class="mfy-country-search" type="search" placeholder="Buscar país..." aria-label="Buscar país" autocomplete="off"><div class="mfy-country-options" role="listbox">${COUNTRIES.map(country=>`<button type="button" role="option" aria-selected="false" data-country="${country}">${country}</button>`).join('')}</div><p class="mfy-country-empty" hidden>No encontramos ese país.</p></div><input type="hidden" name="pais" required></div></div>
        <label>¿Qué plan tienes actualmente?<select name="planActual" required><option value="">Selecciona tu plan</option>${options(PLANS)}</select></label>
        <label class="mfy-field-wide">¿Qué contenido exploraste?<select name="contenidoExplorado" required><option value="">Selecciona una opción</option>${options(CONTENT_OPTIONS)}</select></label>
      </div>
      <fieldset class="mfy-rating"><legend>Calificación</legend><div>${[1,2,3,4,5].map(n=>`<button type="button" data-rating="${n}" aria-label="${n} estrella${n>1?'s':''}" aria-pressed="false">★</button>`).join('')}</div><input type="hidden" name="calificacion" required></fieldset>
      <label class="mfy-comment">Comentario<textarea name="comentario" required minlength="10" maxlength="2000" placeholder="Cuéntanos cómo fue tu experiencia"></textarea></label>
      <label class="mfy-consent"><input type="checkbox" name="autorizacionPublicacion" required><span>Autorizo a Mentorify a revisar y, si corresponde, publicar mi experiencia de forma total o resumida.</span></label>
      <p class="mfy-testimonial-privacy">Tu comentario será revisado antes de publicarse.</p>
      <p class="mfy-testimonial-status" role="status" aria-live="polite"></p>
      <button class="mfy-testimonial-submit" type="submit">Enviar experiencia</button>
    </form>
  </div>
  <div class="mfy-testimonial-success" hidden><span aria-hidden="true">✓</span><h2>Gracias por compartir tu experiencia.</h2><p>Tu opinión ha sido recibida y será revisada por nuestro equipo.</p><p>Esperamos que sigas disfrutando y avanzando con Mentorify.</p>${standalone ? '<a href="/">Volver a Mentorify</a>' : '<button type="button" data-success-close>Cerrar</button>'}</div>`;
}

export function initTestimonialForm(root, { origin, onSuccessClose } = {}) {
  const form = root.querySelector('.mfy-testimonial-form');
  if (!form) return () => {};
  const countryTrigger = form.querySelector('.mfy-country-trigger');
  const countryDropdown = form.querySelector('.mfy-country-dropdown');
  const countrySearch = form.querySelector('.mfy-country-search');
  const countryOptions = [...form.querySelectorAll('[data-country]')];
  const countryValue = form.elements.pais;
  const empty = form.querySelector('.mfy-country-empty');
  const ratingValue = form.elements.calificacion;
  const stars = [...form.querySelectorAll('[data-rating]')];
  const status = form.querySelector('.mfy-testimonial-status');
  const submit = form.querySelector('.mfy-testimonial-submit');
  const formView = root.querySelector('.mfy-testimonial-form-view');
  const success = root.querySelector('.mfy-testimonial-success');
  const openedAt = Date.now();

  const closeCountries = () => { countryDropdown.hidden = true; countryTrigger.setAttribute('aria-expanded','false'); };
  const openCountries = () => { countryDropdown.hidden = false; countryTrigger.setAttribute('aria-expanded','true'); countrySearch.value=''; countryOptions.forEach(option=>option.hidden=false); empty.hidden=true; requestAnimationFrame(()=>countrySearch.focus()); };
  countryTrigger.addEventListener('click',()=>countryDropdown.hidden ? openCountries() : closeCountries());
  countrySearch.addEventListener('input',()=>{ const query=countrySearch.value.trim().toLocaleLowerCase('es'); let visible=0; countryOptions.forEach(option=>{ option.hidden=!option.textContent.toLocaleLowerCase('es').includes(query); if(!option.hidden)visible++; }); empty.hidden=visible>0; });
  countryOptions.forEach(option=>option.addEventListener('click',()=>{ countryValue.value=option.dataset.country; countryTrigger.querySelector('span').textContent=option.dataset.country; countryOptions.forEach(item=>item.setAttribute('aria-selected',String(item===option))); closeCountries(); countryTrigger.focus(); }));
  countrySearch.addEventListener('keydown',event=>{ const visible=countryOptions.filter(option=>!option.hidden); const current=visible.indexOf(document.activeElement); if(event.key==='ArrowDown'){event.preventDefault();(visible[current+1]||visible[0])?.focus()}if(event.key==='ArrowUp'){event.preventDefault();(visible[current-1]||visible.at(-1))?.focus()}if(event.key==='Escape'){closeCountries();countryTrigger.focus()} });
  document.addEventListener('click',event=>{if(!form.querySelector('.mfy-country-combobox').contains(event.target))closeCountries()});

  const paintStars = number => stars.forEach(star=>star.classList.toggle('is-selected',Number(star.dataset.rating)<=Number(number||0)));
  stars.forEach(button=>{button.addEventListener('mouseenter',()=>paintStars(button.dataset.rating));button.addEventListener('focus',()=>paintStars(button.dataset.rating));button.addEventListener('click',()=>{ratingValue.value=button.dataset.rating;stars.forEach(star=>star.setAttribute('aria-pressed',String(star===button)));paintStars(ratingValue.value)})});
  form.querySelector('.mfy-rating div').addEventListener('mouseleave',()=>paintStars(ratingValue.value));

  form.addEventListener('submit',async event=>{
    event.preventDefault(); status.textContent='';
    if(form.elements.website.value || Date.now()-openedAt<1200) return;
    if(!countryValue.value){status.textContent='Selecciona tu país para continuar.';countryTrigger.focus();return}
    if(!form.checkValidity()||!ratingValue.value){form.reportValidity();status.textContent=!ratingValue.value?'Selecciona una calificación para continuar.':'Revisa los campos obligatorios.';return}
    if(!isSupabaseConfigured){status.textContent='El sistema de testimonios aún no está configurado.';return}
    submit.disabled=true;submit.textContent='Enviando…';
    try{
      const data=new FormData(form);
      await submitTestimonial({nombre:data.get('nombre'),ciudad:data.get('ciudad'),pais:data.get('pais'),planActual:data.get('planActual'),contenidoExplorado:data.get('contenidoExplorado'),calificacion:data.get('calificacion'),comentario:data.get('comentario'),autorizacionPublicacion:data.get('autorizacionPublicacion')==='on'},origin);
      void trackAnalyticsEvent('testimonio_enviado', { metadata: { origen: origin } });
      formView.hidden=true;success.hidden=false;success.querySelector('button,a')?.focus();
    }catch(error){console.error('No se pudo guardar el testimonio',error);status.textContent='No pudimos enviar tu experiencia. Inténtalo nuevamente.'}
    finally{submit.disabled=false;submit.textContent='Enviar experiencia'}
  });
  root.querySelector('[data-success-close]')?.addEventListener('click',()=>onSuccessClose?.());
  return () => { form.reset(); countryValue.value=''; countryTrigger.querySelector('span').textContent='Selecciona tu país'; ratingValue.value=''; paintStars(0); formView.hidden=false; success.hidden=true; status.textContent=''; };
}
