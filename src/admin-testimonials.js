import './styles/admin-testimonials.css';
import './styles/admin-dashboard.css';
import { isSupabaseConfigured, supabase } from './lib/supabase.js';

const state = { items: [], filter: 'TODOS', session: null };
const config = document.querySelector('#adminConfig');
const login = document.querySelector('#adminLogin');
const dashboard = document.querySelector('#adminDashboard');
const list = document.querySelector('#adminList');
const status = document.querySelector('#adminStatus');
const editor = document.querySelector('#adminEditor');
const editorForm = document.querySelector('#adminEditorForm');
const escapeHtml = value => String(value ?? '').replace(/[&<>'"]/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));
const originLabel = origin => ({landing_modal:'Landing',enlace_directo:'Enlace directo',admin:'Administración'}[origin]||origin);

async function bootstrap() {
  if (!isSupabaseConfigured) { config.hidden=false; return; }
  const { data, error } = await supabase.auth.getSession();
  if (error) { login.hidden=false; login.querySelector('.mfy-admin-error').textContent='No fue posible validar la sesión.'; return; }
  if (data.session) await enterDashboard(data.session); else login.hidden=false;
  supabase.auth.onAuthStateChange((event,session)=>{
    state.session=session;
    if(event==='SIGNED_OUT'){
      dashboard.hidden=true;
      login.hidden=false;
      state.items=[];
    }
  });
}

document.querySelector('#adminLoginForm').addEventListener('submit',async event=>{
  event.preventDefault();const form=event.currentTarget;const errorNode=form.querySelector('.mfy-admin-error');errorNode.textContent='';const button=form.querySelector('button');button.disabled=true;
  const {data,error}=await supabase.auth.signInWithPassword({email:form.elements.email.value.trim(),password:form.elements.password.value});
  if(error){errorNode.textContent='No fue posible iniciar sesión. Revisa tus datos.';button.disabled=false;return}
  const allowed=await isAdmin(data.user.id);
  if(!allowed){await supabase.auth.signOut();errorNode.textContent='Esta cuenta no tiene permisos de administración.';button.disabled=false;return}
  button.disabled=false;await enterDashboard(data.session);
});

async function isAdmin(userId){const {data,error}=await supabase.from('admin_users').select('user_id').eq('user_id',userId).maybeSingle();return !error&&Boolean(data)}
async function enterDashboard(session){if(!await isAdmin(session.user.id)){await supabase.auth.signOut();login.hidden=false;return}state.session=session;login.hidden=true;dashboard.hidden=false;await loadItems()}
async function loadItems(){status.textContent='Cargando testimonios…';const {data,error}=await supabase.from('testimonios').select('*').order('destacado',{ascending:false}).order('orden').order('fecha_creacion',{ascending:false});if(error){status.textContent='No se pudieron cargar los testimonios.';return}state.items=data??[];status.textContent='';render()}

function render(){const counts={TODOS:state.items.length,PENDIENTE:0,APROBADO:0,OCULTO:0};state.items.forEach(item=>counts[item.estado]++);Object.entries(counts).forEach(([key,value])=>{document.querySelector(`[data-count="${key}"]`).textContent=value});const items=state.filter==='TODOS'?state.items:state.items.filter(item=>item.estado===state.filter);list.innerHTML=items.length?items.map(card).join(''):'<div class="mfy-admin-empty">No hay testimonios en este estado.</div>'}
function card(item){const location=[item.ciudad,item.pais].filter(Boolean).join(', ');return `<article class="mfy-admin-card" data-id="${item.id}"><div class="mfy-admin-card-avatar">${item.foto_url?`<img src="${escapeHtml(item.foto_url)}" alt="">`:`<span>${escapeHtml(item.nombre.slice(0,2).toUpperCase())}</span>`}</div><div class="mfy-admin-card-copy"><div class="mfy-admin-card-meta"><span class="mfy-state mfy-state-${item.estado.toLowerCase()}">${item.estado}</span>${item.destacado?'<span class="mfy-featured">Destacado</span>':''}<span>${escapeHtml(originLabel(item.origen))}</span><span>Orden ${item.orden}</span></div><h2>${escapeHtml(item.nombre)}</h2>${location?`<p class="mfy-admin-location">${escapeHtml(location)}</p>`:''}<div class="mfy-admin-details"><span><b>Plan</b>${escapeHtml(item.plan_actual)}</span><span><b>Contenido</b>${escapeHtml(item.contenido_explorado)}</span></div><p class="mfy-admin-comment">${escapeHtml(item.comentario)}</p><span class="mfy-admin-date">${escapeHtml(item.fecha)} · ${'★'.repeat(item.calificacion)}</span></div><div class="mfy-admin-actions">${item.estado!=='APROBADO'?'<button data-action="approve">Aprobar</button>':''}${item.estado!=='OCULTO'?'<button data-action="hide">Ocultar</button>':''}<button data-action="feature">${item.destacado?'Quitar destacado':'Destacar'}</button><button data-action="edit">Editar</button><button class="is-danger" data-action="delete">Eliminar</button></div></article>`}

document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{state.filter=button.dataset.filter;document.querySelectorAll('[data-filter]').forEach(item=>item.classList.toggle('is-active',item===button));render()}));
document.querySelector('#adminLogout').addEventListener('click',async()=>{await supabase.auth.signOut();dashboard.hidden=true;login.hidden=false});
document.querySelector('#adminNew').addEventListener('click',()=>openEditor());
list.addEventListener('click',async event=>{const button=event.target.closest('[data-action]');if(!button)return;const item=state.items.find(entry=>entry.id===button.closest('[data-id]').dataset.id);if(!item)return;const action=button.dataset.action;if(action==='edit'){openEditor(item);return}if(action==='delete'){if(!confirm(`¿Eliminar el testimonio de ${item.nombre}?`))return;await mutate(()=>supabase.from('testimonios').delete().eq('id',item.id));return}if(action==='approve')await mutate(()=>supabase.from('testimonios').update({estado:'APROBADO'}).eq('id',item.id));if(action==='hide')await mutate(()=>supabase.from('testimonios').update({estado:'OCULTO'}).eq('id',item.id));if(action==='feature')await mutate(()=>supabase.from('testimonios').update({destacado:!item.destacado}).eq('id',item.id))});
async function mutate(operation){status.textContent='Guardando cambios…';const {error}=await operation();if(error){status.textContent=`No se pudo guardar: ${error.message}`;return}await loadItems()}

function openEditor(item){editorForm.reset();editorForm.elements.id.value=item?.id??'';editorForm.elements.fecha.value=item?.fecha??new Date().toISOString().slice(0,10);editorForm.elements.nombre.value=item?.nombre??'';editorForm.elements.ciudad.value=item?.ciudad??'';editorForm.elements.pais.value=item?.pais??'';editorForm.elements.plan_actual.value=item?.plan_actual??'';editorForm.elements.contenido_explorado.value=item?.contenido_explorado??'';editorForm.elements.calificacion.value=item?.calificacion??5;editorForm.elements.estado.value=item?.estado??'PENDIENTE';editorForm.elements.orden.value=item?.orden??0;editorForm.elements.origen.value=item?.origen??'admin';editorForm.elements.comentario.value=item?.comentario??'';editorForm.elements.autorizacion_publicacion.checked=item?.autorizacion_publicacion??true;editorForm.elements.destacado.checked=item?.destacado??false;editorForm.elements.foto_url.value=item?.foto_url??'';editor.querySelector('h2').textContent=item?'Editar testimonio':'Nuevo testimonio';editor.hidden=false;document.body.classList.add('mfy-admin-modal-open');requestAnimationFrame(()=>editorForm.elements.nombre.focus())}
function closeEditor(){editor.hidden=true;document.body.classList.remove('mfy-admin-modal-open')}
editor.querySelectorAll('[data-editor-close]').forEach(element=>element.addEventListener('click',closeEditor));
editorForm.addEventListener('submit',async event=>{event.preventDefault();const button=editorForm.querySelector('[type="submit"]');const errorNode=editorForm.querySelector('.mfy-admin-error');errorNode.textContent='';button.disabled=true;try{const data=new FormData(editorForm);let fotoUrl=data.get('foto_url')||null;const avatar=data.get('avatar');if(avatar?.size){if(avatar.size>2097152)throw new Error('El avatar supera los 2 MB.');const extension=avatar.name.split('.').pop().toLowerCase();const path=`${crypto.randomUUID()}.${extension}`;const {error:uploadError}=await supabase.storage.from('testimonial-avatars').upload(path,avatar,{contentType:avatar.type});if(uploadError)throw uploadError;fotoUrl=supabase.storage.from('testimonial-avatars').getPublicUrl(path).data.publicUrl}const payload={nombre:data.get('nombre').trim(),ciudad:data.get('ciudad').trim()||null,pais:data.get('pais').trim()||null,fecha:data.get('fecha'),plan_actual:data.get('plan_actual').trim(),contenido_explorado:data.get('contenido_explorado').trim(),calificacion:Number(data.get('calificacion')),estado:data.get('estado'),orden:Number(data.get('orden')),origen:data.get('origen'),comentario:data.get('comentario').trim(),autorizacion_publicacion:data.get('autorizacion_publicacion')==='on',destacado:data.get('destacado')==='on',foto_url:fotoUrl};const id=data.get('id');const {error}=id?await supabase.from('testimonios').update(payload).eq('id',id):await supabase.from('testimonios').insert(payload);if(error)throw error;closeEditor();await loadItems()}catch(error){errorNode.textContent=error.message||'No fue posible guardar.'}finally{button.disabled=false}});

bootstrap();
