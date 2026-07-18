const TESTIMONIAL_WEBHOOK_URL = '';

const countries = ['Perú','México','Ecuador','Colombia','Chile','Argentina','Bolivia','Brasil','Uruguay','Paraguay','Venezuela','Panamá','Costa Rica','Guatemala','El Salvador','Honduras','Nicaragua','República Dominicana','Puerto Rico','Estados Unidos','Canadá','España','Italia','Francia','Alemania','Suiza','Reino Unido','Portugal','Otro'];

const testimonials = [
  ['MR','Mariana R.','Lima, Perú','Experiencia general en la biblioteca','Lo que más valoro es que todo está organizado y puedo continuar exactamente desde donde me quedé. La calidad de los videos y la forma de presentar los contenidos hacen que estudiar se sienta mucho más sencillo.'],
  ['CM','Carlos M.','Ciudad de México, México','Código del Dinero','Empecé Código del Dinero buscando ordenar mejor mis ideas. Las clases me están ayudando a entender mis hábitos y a tomar decisiones con más claridad. Ahora siento que tengo una ruta concreta para avanzar.'],
  ['AP','Andrea P.','Quito, Ecuador','Salud y Reconversión','Comencé el programa hace algunas semanas y he aprendido a observar mejor mis hábitos. Estoy reduciendo el consumo de azúcar y comprendiendo cómo pequeñas decisiones pueden influir en mi bienestar.'],
  ['LG','Lucía G.','Arequipa, Perú','Neuroaprendizaje','Los contenidos de aprendizaje me ayudaron a comprender nuevas formas de estudiar y acompañar a mi hija. Ahora organizamos mejor sus sesiones y puedo explicarle las ideas de una manera mucho más clara.'],
  ['DA','Diego A.','Guayaquil, Ecuador','Liderazgo y desarrollo personal','Encontré herramientas muy prácticas para comunicarme mejor y afrontar situaciones con más calma. Me gusta que los talleres no estén sueltos, sino dentro de una plataforma que mantiene todo ordenado.']
];

function card([initials,name,location,area,quote]) {
  return `<article class="mfy-testimonial-card" data-status="placeholder">
    <div class="mfy-testimonial-top"><span class="mfy-testimonial-avatar" aria-hidden="true">${initials}</span><div><h3>${name}</h3><p>${location}</p></div></div>
    <p class="mfy-testimonial-area">${area}</p><div class="mfy-testimonial-stars" aria-label="5 de 5 estrellas">★★★★★</div>
    <p class="mfy-testimonial-quote">“${quote}”</p><span class="mfy-testimonial-badge">Experiencia de muestra</span>
  </article>`;
}

export function initTestimonials() {
  const experience = document.querySelector('#mf-apple-exp');
  if (!experience || document.querySelector('#experiencias-mentorify')) return;
  const section = document.createElement('section');
  section.id = 'experiencias-mentorify';
  section.className = 'mfy-testimonials';
  const slides = testimonials.map(card).join('');
  section.innerHTML = `<div class="mfy-testimonials-wrap"><header class="mfy-testimonials-head"><p class="mfy-testimonials-kicker">EXPERIENCIAS MENTORIFY</p><h2>Experiencias que inspiran a seguir avanzando.</h2><p>Descubre cómo diferentes personas están utilizando Mentorify para aprender con más claridad, organización y constancia.</p><span>Opiniones de usuarios de distintos países y áreas de aprendizaje.</span></header><div class="mfy-testimonials-carousel" aria-label="Experiencias de muestra"><div class="mfy-testimonials-track">${slides}${slides}${slides}</div></div><div class="mfy-testimonials-controls"><button type="button" class="mfy-testimonials-prev" aria-label="Experiencia anterior">‹</button><button type="button" class="mfy-testimonials-next" aria-label="Experiencia siguiente">›</button></div><p class="mfy-testimonials-note">Experiencias de muestra. Próximamente publicaremos opiniones verificadas de nuestros usuarios.</p><div class="mfy-testimonials-cta"><div><h3>¿Ya navegaste en la biblioteca?</h3><p>Cuéntanos cómo fue tu experiencia y ayúdanos a seguir mejorando Mentorify.</p></div><button type="button" class="mfy-testimonials-open">Dejar mi experiencia</button></div></div>`;
  experience.after(section);
  const offer = document.querySelector('#mentorifyPremiumPaymentBlock');
  if (offer) {
    section.after(offer);
    const faq = document.querySelector('#preguntas-frecuentes');
    if (faq) offer.after(faq);
  }

  const modal = document.createElement('div');
  modal.className = 'mfy-testimonial-modal';
  modal.hidden = true;
  modal.innerHTML = `<div class="mfy-testimonial-backdrop" data-close></div><div class="mfy-testimonial-dialog" role="dialog" aria-modal="true" aria-labelledby="mfyTestimonialTitle"><button class="mfy-testimonial-close" type="button" aria-label="Cerrar" data-close>×</button><div class="mfy-testimonial-form-view"><header><h2 id="mfyTestimonialTitle">Comparte tu experiencia</h2><p>Tu opinión nos ayuda a mejorar la plataforma y puede orientar a otras personas.</p></header><form id="mfyTestimonialForm" novalidate>
  <div class="mfy-testimonial-fields"><label>Nombre<input name="nombre" required autocomplete="name"></label><label>Ciudad<input name="ciudad" required autocomplete="address-level2"></label><div class="mfy-country-field"><span class="mfy-field-label">País</span><div class="mfy-country-combobox"><button class="mfy-country-trigger" type="button" aria-haspopup="listbox" aria-expanded="false"><span>Selecciona tu país</span><i aria-hidden="true"></i></button><div class="mfy-country-dropdown" hidden><input class="mfy-country-search" type="search" placeholder="Buscar país..." aria-label="Buscar país" autocomplete="off"><div class="mfy-country-options" role="listbox">${countries.map(country=>`<button type="button" role="option" aria-selected="false" data-country="${country}">${country}</button>`).join('')}</div><p class="mfy-country-empty" hidden>No encontramos ese país.</p></div><input type="hidden" name="pais"></div></div><label>¿Qué plan tienes actualmente?<select name="planActual" required><option value="">Selecciona tu plan</option><option>Plan Individual</option><option>Plan Master Pack</option><option>Plan Élite</option><option>Plan Total</option><option>Aún no tengo un plan</option></select></label><label class="mfy-field-wide">¿Qué contenido exploraste?<select name="contenidoExplorado" required><option value="">Selecciona una opción</option><option>Código del Dinero</option><option>Salud y Reconversión</option><option>Neuroaprendizaje</option><option>Coaching y Liderazgo</option><option>Libros</option><option>Audiolibros</option><option>Felicidad Diaria</option><option>Jim Kwik / Neuroaprendizaje</option><option>Neil Donald Walsch</option><option>Método Yuen</option><option>Lain García Calvo</option><option>Reprogramación Interior</option><option>Constelaciones</option><option>Autohipnosis</option><option>Varios contenidos</option><option>Otro</option></select></label></div>
  <fieldset class="mfy-rating"><legend>Calificación</legend><div>${[1,2,3,4,5].map(n=>`<button type="button" data-rating="${n}" aria-label="${n} estrella${n>1?'s':''}" aria-pressed="false">★</button>`).join('')}</div><input type="hidden" name="calificacion" required></fieldset>
  <label class="mfy-comment">Comentario<textarea name="comentario" minlength="30" maxlength="700" required placeholder="Cuéntanos tu experiencia (30 a 700 caracteres)"></textarea></label>
  <label class="mfy-consent"><input type="checkbox" name="autorizacionPublicacion" required><span>Autorizo a Mentorify a revisar y, si corresponde, publicar mi experiencia de forma total o resumida.</span></label><p class="mfy-testimonial-privacy">Tu comentario será revisado antes de publicarse.</p><p class="mfy-testimonial-status" role="status"></p><button class="mfy-testimonial-submit" type="submit">Enviar experiencia</button></form></div><div class="mfy-testimonial-success" hidden><span aria-hidden="true">✓</span><h2>¡Gracias por compartir tu experiencia!</h2><p>Gracias por tus comentarios, esperamos que sigas disfrutando Mentorify.</p><p>Atentamente, <strong>Mentorify.</strong></p><button type="button" data-close>Cerrar</button></div></div>`;
  document.body.append(modal);
  wireCarousel(section);
  wireCountryPicker(modal);
  wireModal(section.querySelector('.mfy-testimonials-open'), modal);
}

function wireCountryPicker(modal) {
  const combo = modal.querySelector('.mfy-country-combobox');
  const trigger = combo.querySelector('.mfy-country-trigger');
  const dropdown = combo.querySelector('.mfy-country-dropdown');
  const search = combo.querySelector('.mfy-country-search');
  const value = combo.querySelector('[name="pais"]');
  const options = [...combo.querySelectorAll('[role="option"]')];
  const empty = combo.querySelector('.mfy-country-empty');
  let activeIndex = -1;
  const visible = () => options.filter(option => !option.hidden);
  const open = () => { dropdown.hidden=false;trigger.setAttribute('aria-expanded','true');search.value='';options.forEach(option=>option.hidden=false);empty.hidden=true;activeIndex=-1;requestAnimationFrame(()=>search.focus()); };
  const close = focusTrigger => { dropdown.hidden=true;trigger.setAttribute('aria-expanded','false');if(focusTrigger)trigger.focus(); };
  const choose = option => { value.value=option.dataset.country;trigger.querySelector('span').textContent=option.dataset.country;options.forEach(item=>item.setAttribute('aria-selected',String(item===option)));close(true); };
  trigger.addEventListener('click',()=>dropdown.hidden?open():close(false));
  search.addEventListener('input',()=>{const query=search.value.trim().toLocaleLowerCase('es');options.forEach(option=>option.hidden=!option.dataset.country.toLocaleLowerCase('es').includes(query));empty.hidden=visible().length>0;activeIndex=-1;});
  combo.addEventListener('keydown',event=>{if(event.key==='Escape'){event.preventDefault();close(true);return}if(dropdown.hidden&&(event.key==='ArrowDown'||event.key==='Enter')){event.preventDefault();open();return}const list=visible();if(!list.length)return;if(event.key==='ArrowDown'||event.key==='ArrowUp'){event.preventDefault();activeIndex=(activeIndex+(event.key==='ArrowDown'?1:-1)+list.length)%list.length;list[activeIndex].focus()}else if(event.key==='Enter'&&document.activeElement.matches('[role="option"]')){event.preventDefault();choose(document.activeElement)}});
  options.forEach(option=>option.addEventListener('click',()=>choose(option)));
  document.addEventListener('pointerdown',event=>{if(!combo.contains(event.target)&&!dropdown.hidden)close(false)});
}

function wireCarousel(section) {
  const viewport = section.querySelector('.mfy-testimonials-carousel');
  const track = section.querySelector('.mfy-testimonials-track');
  let timer;
  let resumeTimer;
  let normalizeTimer;
  const step = () => track.querySelector('.mfy-testimonial-card').getBoundingClientRect().width + 20;
  const setWidth = () => track.scrollWidth / 3;
  const normalize = () => { const width=setWidth(); if(viewport.scrollLeft < width*.35) viewport.scrollLeft+=width; else if(viewport.scrollLeft > width*1.65) viewport.scrollLeft-=width; };
  const move = (direction, manual=true) => { viewport.scrollBy({left:direction*step(),behavior:'smooth'}); clearTimeout(normalizeTimer); normalizeTimer=setTimeout(normalize,650); if(manual) restart(); };
  const stop = () => clearInterval(timer);
  const start = () => { stop(); timer=setInterval(()=>move(1,false),7000); };
  const restart = () => { stop(); clearTimeout(resumeTimer); resumeTimer=setTimeout(start,2500); };
  requestAnimationFrame(()=>{viewport.scrollLeft=setWidth();start()});
  section.querySelector('.mfy-testimonials-prev').addEventListener('click',()=>move(-1));
  section.querySelector('.mfy-testimonials-next').addEventListener('click',()=>move(1));
  viewport.addEventListener('mouseenter',stop);
  viewport.addEventListener('mouseleave',start);
  viewport.addEventListener('pointerdown',stop);
  viewport.addEventListener('pointerup',restart);
  viewport.addEventListener('scroll',()=>{clearTimeout(normalizeTimer);normalizeTimer=setTimeout(normalize,180)},{passive:true});
  document.addEventListener('visibilitychange',()=>document.hidden?stop():start());
}

function wireModal(opener, modal) {
  const dialog = modal.querySelector('.mfy-testimonial-dialog');
  const form = modal.querySelector('form');
  const status = modal.querySelector('.mfy-testimonial-status');
  const submit = modal.querySelector('.mfy-testimonial-submit');
  const success = modal.querySelector('.mfy-testimonial-success');
  let lastFocus;
  const focusables = () => [...dialog.querySelectorAll('button:not([hidden]),input,select,textarea')].filter(el => !el.disabled && el.offsetParent !== null);
  const open = () => { lastFocus = document.activeElement; modal.hidden = false; document.body.classList.add('mfy-modal-open'); requestAnimationFrame(()=>dialog.querySelector('.mfy-testimonial-close').focus()); };
  const close = () => { modal.hidden = true; document.body.classList.remove('mfy-modal-open'); lastFocus?.focus(); };
  opener.addEventListener('click', open);
  modal.querySelectorAll('[data-close]').forEach(el=>el.addEventListener('click', close));
  modal.addEventListener('keydown', e => { if(e.key==='Escape') close(); if(e.key==='Tab'){const f=focusables(); if(!f.length)return; const first=f[0],last=f[f.length-1]; if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}} });
  const rating = form.elements.calificacion;
  const stars = [...form.querySelectorAll('[data-rating]')];
  const paintStars = number => stars.forEach(star=>star.classList.toggle('is-selected',Number(star.dataset.rating)<=Number(number||0)));
  stars.forEach(button=>{button.addEventListener('mouseenter',()=>paintStars(button.dataset.rating));button.addEventListener('focus',()=>paintStars(button.dataset.rating));button.addEventListener('click',()=>{rating.value=button.dataset.rating;stars.forEach(star=>star.setAttribute('aria-pressed',String(star===button)));paintStars(rating.value)})});
  form.querySelector('.mfy-rating div').addEventListener('mouseleave',()=>paintStars(rating.value));
  form.addEventListener('submit', async e => { e.preventDefault(); status.textContent=''; const country=form.elements.pais.value; if(!country){status.textContent='Selecciona tu país para continuar.';form.querySelector('.mfy-country-trigger').focus();return} if(!form.checkValidity()||!rating.value){form.reportValidity();status.textContent=!rating.value?'Selecciona una calificación para continuar.':'Revisa los campos obligatorios.';return} submit.disabled=true;submit.textContent='Enviando…'; const data=new FormData(form); const payload={nombre:data.get('nombre').trim(),ciudad:data.get('ciudad').trim(),pais:data.get('pais'),planActual:data.get('planActual'),contenidoExplorado:data.get('contenidoExplorado'),calificacion:Number(data.get('calificacion')),comentario:data.get('comentario').trim(),autorizacionPublicacion:data.get('autorizacionPublicacion')==='on',estado:'PENDIENTE_APROBACION',fechaEnvio:new Date().toISOString(),origen:'landing_mentorify'}; try { if(TESTIMONIAL_WEBHOOK_URL){const response=await fetch(TESTIMONIAL_WEBHOOK_URL,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});if(!response.ok)throw new Error('No se pudo enviar')}else{console.info('Experiencia pendiente de aprobación:',payload);await new Promise(resolve=>setTimeout(resolve,500))} modal.querySelector('.mfy-testimonial-form-view').hidden=true;success.hidden=false;success.querySelector('button').focus()}catch(error){status.textContent='No pudimos enviar tu experiencia. Inténtalo nuevamente.'}finally{submit.disabled=false;submit.textContent='Enviar experiencia'} });
}
