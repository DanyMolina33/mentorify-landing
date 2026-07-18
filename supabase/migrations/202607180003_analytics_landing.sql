create table if not exists public.analytics_events (
  id uuid primary key default gen_random_uuid(),
  visitor_id uuid not null,
  session_id uuid not null,
  event_type varchar(32) not null check (event_type in (
    'page_view',
    'scroll_25', 'scroll_50', 'scroll_75', 'scroll_90', 'scroll_100',
    'cta_prueba_gratis', 'cta_comprar', 'cta_oferta_90', 'oferta_vista',
    'formulario_iniciado', 'formulario_completado', 'testimonio_enviado'
  )),
  page_path varchar(300) not null default '/',
  scroll_depth smallint check (scroll_depth is null or scroll_depth in (25, 50, 75, 90, 100)),
  metadata jsonb not null default '{}'::jsonb check (jsonb_typeof(metadata) = 'object'),
  created_at timestamptz not null default now(),
  constraint analytics_scroll_consistente check (
    (event_type = 'scroll_25' and scroll_depth = 25) or
    (event_type = 'scroll_50' and scroll_depth = 50) or
    (event_type = 'scroll_75' and scroll_depth = 75) or
    (event_type = 'scroll_90' and scroll_depth = 90) or
    (event_type = 'scroll_100' and scroll_depth = 100) or
    (event_type not like 'scroll_%' and scroll_depth is null)
  )
);

create unique index if not exists analytics_evento_sesion_unico_idx
  on public.analytics_events (session_id, event_type, page_path);

create index if not exists analytics_events_fecha_idx
  on public.analytics_events (created_at desc);

create index if not exists analytics_events_tipo_fecha_idx
  on public.analytics_events (event_type, created_at desc);

alter table public.analytics_events enable row level security;

revoke all on public.analytics_events from anon, authenticated;
grant insert (visitor_id, session_id, event_type, page_path, scroll_depth, metadata)
  on public.analytics_events to anon, authenticated;
grant select on public.analytics_events to authenticated;

drop policy if exists "publico registra analitica anonima" on public.analytics_events;
create policy "publico registra analitica anonima"
on public.analytics_events for insert
to anon, authenticated
with check (
  char_length(page_path) between 1 and 300
  and page_path not like '/admin/%'
  and (page_path not in ('/compartir-experiencia', '/compartir-experiencia/') or event_type = 'testimonio_enviado')
  and octet_length(metadata::text) <= 4096
);

drop policy if exists "admin consulta analitica" on public.analytics_events;
create policy "admin consulta analitica"
on public.analytics_events for select
to authenticated
using (public.es_admin());

comment on column public.analytics_events.visitor_id is
  'Identificador anonimo aproximado por navegador/dispositivo; no identifica a una persona.';
