# Configuración del sistema de testimonios

## 1. Crear el proyecto

1. Entra en https://supabase.com/dashboard y crea un proyecto.
2. Guarda de forma segura la contraseña de la base de datos.
3. Espera hasta que el proyecto figure como activo.

## 2. Crear tablas, seguridad y almacenamiento

1. Abre **SQL Editor** en Supabase.
2. Copia todo el contenido de `supabase/migrations/202607180001_testimonios.sql` y ejecútalo.
3. Después copia y ejecuta `supabase/migrations/202607180002_testimonios_publicos_categoria.sql`.
4. Confirma en **Table Editor** que existen `testimonios` y `admin_users`.
5. Confirma en **Database → Views** que existe `testimonios_publicos` y contiene `contenido_explorado`.
6. Confirma en **Storage** que existe el bucket público `testimonial-avatars`.

La migración activa RLS. Los visitantes solamente pueden insertar registros `PENDIENTE`; la lectura pública se limita a registros `APROBADO` con autorización para publicar. El CRUD completo requiere estar en `admin_users`.

## 3. Crear el administrador

1. Ve a **Authentication → Users → Add user → Create new user**.
2. Escribe el correo y una contraseña segura. Activa la confirmación del usuario al crearlo.
3. Copia el UUID del usuario creado.
4. Abre **SQL Editor** y ejecuta, reemplazando el UUID:

```sql
insert into public.admin_users (user_id)
values ('UUID_DEL_USUARIO')
on conflict (user_id) do nothing;
```

No guardes esa contraseña en GitHub ni en variables `VITE_*`.

## 4. Obtener las variables públicas

En **Project Settings → API** copia:

- Project URL → `VITE_SUPABASE_URL`
- Publishable/anon key → `VITE_SUPABASE_ANON_KEY`

La clave `anon` es pública por diseño. La seguridad depende de RLS. Nunca uses `service_role` en este proyecto frontend.

Para desarrollo local crea `.env.local`:

```env
VITE_SUPABASE_URL=https://TU-PROYECTO.supabase.co
VITE_SUPABASE_ANON_KEY=TU_CLAVE_ANON_PUBLICA
```

`.env` y `.env.local` están excluidos del repositorio por `.gitignore`.

## 5. Configurar Hostinger

1. Abre hPanel y selecciona el website conectado al repositorio.
2. Entra a **Deployments → Settings & Redeploy → Environment variables**.
3. Agrega `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY`.
4. Conserva el comando de build `npm run build` y el directorio de salida `dist`.
5. Ejecuta un redeployment.

Como Vite incorpora estas variables durante el build, un cambio posterior de variables requiere redeploy. Crear, editar o aprobar testimonios no requiere redeploy.

## 6. Probar

1. Abre `/compartir-experiencia/`, envía un testimonio y verifica que quede `PENDIENTE`.
2. Abre `/admin/testimonios/` e inicia sesión.
3. Aprueba el testimonio y activa la autorización si corresponde.
4. Recarga la landing y confirma que aparece.
5. Ocúltalo y confirma que deja de aparecer sin realizar deployment.

## Rutas

- Landing: `/`
- Formulario público: `/compartir-experiencia/`
- Administración privada: `/admin/testimonios/`
