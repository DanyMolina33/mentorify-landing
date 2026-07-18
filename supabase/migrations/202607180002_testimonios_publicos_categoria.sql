create or replace view public.testimonios_publicos
with (security_invoker = true)
as
select id, nombre, ciudad, pais, comentario, foto_url, fecha, calificacion, destacado, orden, fecha_creacion, contenido_explorado
from public.testimonios
where estado = 'APROBADO' and autorizacion_publicacion = true;

grant select on public.testimonios_publicos to anon, authenticated;
grant select (contenido_explorado) on public.testimonios to anon;
