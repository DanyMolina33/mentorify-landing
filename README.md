# Mentorify Landing

Landing premium construida con Vite Vanilla, HTML semántico, CSS moderno y JavaScript ES Modules.

## Desarrollo

```bash
npm install
npm run dev
```

Compilación de producción:

```bash
npm run build
npm run preview
```

## Despliegue en Hostinger

Ejecuta `npm run build` y publica el contenido generado dentro de `dist/` en `public_html`. El archivo `index.html` debe quedar en la raíz pública del dominio.

## Configuración pendiente

Los destinos oficiales se centralizan en `src/config.js`. Completa únicamente las constantes confirmadas:

- `COMMUNITY_URL`: enlace oficial de la comunidad de WhatsApp.
- `APP_ANDROID_URL`, `APP_IOS_URL` y `APP_WEB_URL`: enlaces oficiales de las aplicaciones.

Mientras estén vacías, las insignias son informativas y el botón de comunidad permanece deshabilitado; no se generan enlaces rotos.

## Fuente preservada

El código técnico original se conserva intacto en `backup/CODIGO_ACTUAL_MENTORIFY_ORIGINAL.txt`. No se deben ejecutar pruebas que envíen formularios, comprobantes o compras reales.
