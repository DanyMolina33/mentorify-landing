create extension if not exists pgcrypto;

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  fecha_creacion timestamptz not null default now()
);

create table if not exists public.testimonios (
  id uuid primary key default gen_random_uuid(),
  nombre varchar(120) not null check (char_length(trim(nombre)) between 2 and 120),
  ciudad varchar(120),
  pais varchar(100),
  plan_actual varchar(80) not null,
  contenido_explorado varchar(160) not null,
  calificacion smallint not null check (calificacion between 1 and 5),
  comentario text not null check (char_length(trim(comentario)) between 10 and 2000),
  autorizacion_publicacion boolean not null default false,
  foto_url text,
  fecha date not null default current_date,
  estado varchar(12) not null default 'PENDIENTE' check (estado in ('PENDIENTE','APROBADO','OCULTO')),
  destacado boolean not null default false,
  orden integer not null default 0 check (orden between 0 and 1000000),
  fecha_creacion timestamptz not null default now(),
  origen varchar(20) not null check (origen in ('landing_modal','enlace_directo','admin'))
);

create index if not exists testimonios_publicacion_idx
  on public.testimonios (estado, destacado desc, orden asc, fecha_creacion desc);

create or replace function public.es_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admin_users where user_id = auth.uid()
  );
$$;

revoke all on function public.es_admin() from public;
grant execute on function public.es_admin() to authenticated;

alter table public.admin_users enable row level security;
alter table public.testimonios enable row level security;

revoke all on public.admin_users from anon, authenticated;
grant select on public.admin_users to authenticated;

drop policy if exists "admin puede consultar su acceso" on public.admin_users;
create policy "admin puede consultar su acceso"
on public.admin_users for select
to authenticated
using (user_id = auth.uid());

drop policy if exists "publico envia testimonios pendientes" on public.testimonios;
create policy "publico envia testimonios pendientes"
on public.testimonios for insert
to anon, authenticated
with check (
  estado = 'PENDIENTE'
  and destacado = false
  and orden = 0
  and origen in ('landing_modal','enlace_directo')
);

drop policy if exists "admin consulta testimonios" on public.testimonios;
create policy "admin consulta testimonios"
on public.testimonios for select
to authenticated
using (public.es_admin());

drop policy if exists "admin crea testimonios" on public.testimonios;
create policy "admin crea testimonios"
on public.testimonios for insert
to authenticated
with check (public.es_admin());

drop policy if exists "admin actualiza testimonios" on public.testimonios;
create policy "admin actualiza testimonios"
on public.testimonios for update
to authenticated
using (public.es_admin())
with check (public.es_admin());

drop policy if exists "admin elimina testimonios" on public.testimonios;
create policy "admin elimina testimonios"
on public.testimonios for delete
to authenticated
using (public.es_admin());

revoke all on public.testimonios from anon, authenticated;
grant insert (nombre, ciudad, pais, plan_actual, contenido_explorado, calificacion, comentario, autorizacion_publicacion, estado, destacado, orden, origen)
  on public.testimonios to anon;
grant insert (nombre, ciudad, pais, plan_actual, contenido_explorado, calificacion, comentario, autorizacion_publicacion, estado, destacado, orden, origen)
  on public.testimonios to authenticated;
grant select, insert, update, delete on public.testimonios to authenticated;

create or replace view public.testimonios_publicos
with (security_invoker = true)
as
select id, nombre, ciudad, pais, comentario, foto_url, fecha, calificacion, destacado, orden, fecha_creacion
from public.testimonios
where estado = 'APROBADO' and autorizacion_publicacion = true;

grant select on public.testimonios_publicos to anon, authenticated;
grant select (id, nombre, ciudad, pais, comentario, foto_url, fecha, calificacion, destacado, orden, fecha_creacion)
  on public.testimonios to anon;

drop policy if exists "publico consulta aprobados" on public.testimonios;
create policy "publico consulta aprobados"
on public.testimonios for select
to anon
using (estado = 'APROBADO' and autorizacion_publicacion = true);

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('testimonial-avatars', 'testimonial-avatars', true, 2097152, array['image/jpeg','image/png','image/webp'])
on conflict (id) do update set public = true, file_size_limit = 2097152,
  allowed_mime_types = array['image/jpeg','image/png','image/webp'];

drop policy if exists "avatares lectura publica" on storage.objects;
create policy "avatares lectura publica"
on storage.objects for select
to public
using (bucket_id = 'testimonial-avatars');

drop policy if exists "admin administra avatares" on storage.objects;
create policy "admin administra avatares"
on storage.objects for all
to authenticated
using (bucket_id = 'testimonial-avatars' and public.es_admin())
with check (bucket_id = 'testimonial-avatars' and public.es_admin());
