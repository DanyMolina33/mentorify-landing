import { requireSupabase } from '../lib/supabase.js';

export const TESTIMONIAL_STATES = Object.freeze({
  PENDING: 'PENDIENTE',
  APPROVED: 'APROBADO',
  HIDDEN: 'OCULTO',
});

export async function submitTestimonial(values, origin) {
  const client = requireSupabase();
  const payload = {
    nombre: values.nombre.trim(),
    ciudad: values.ciudad.trim() || null,
    pais: values.pais || null,
    plan_actual: values.planActual,
    contenido_explorado: values.contenidoExplorado,
    calificacion: Number(values.calificacion),
    comentario: values.comentario.trim(),
    autorizacion_publicacion: Boolean(values.autorizacionPublicacion),
    estado: TESTIMONIAL_STATES.PENDING,
    destacado: false,
    orden: 0,
    origen: origin,
  };
  const { error } = await client.from('testimonios').insert(payload);
  if (error) throw error;
}

export async function getApprovedTestimonials() {
  const client = requireSupabase();
  const { data, error } = await client
    .from('testimonios_publicos')
    .select('id,nombre,ciudad,pais,comentario,foto_url,fecha,fecha_creacion,calificacion,destacado,orden,contenido_explorado')
    .order('destacado', { ascending: false })
    .order('orden', { ascending: true })
    .order('fecha_creacion', { ascending: false });
  if (error) throw error;
  return data ?? [];
}
