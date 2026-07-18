# Inventario funcional de Mentorify

## Secciones y orden

1. Hero cinematográfico y formulario de acceso gratuito.
2. Autores y talleres (`mfyFacilitadoresV5`) con cuatro categorías: Coaches, Mindvalley, GAIA y Especialidades; los datos completos se renderizan desde el conjunto original.
3. Teléfono y marquesina de dos filas con las 27 imágenes originales de autores y `cel11.png`.
4. FAQ (`preguntas-frecuentes`) con siete preguntas y respuestas completas.
5. Experiencia (`mf-apple-exp`) con tres acordeones y cambio de imagen.
6. Oferta premium (`mentorifyPremiumPaymentBlock`, `mentorifyOfferCard`).
7. Popup Yape/Plin (`mfyPeruModal`).

## IDs públicos preservados

- Formulario: `mfyTrialForm`, `mfyTrialName`, `mfyTrialEmail`, `mfyTrialStatus`.
- Oferta: `mentorifyOfferCard`, `mocHeaderImg`, `mocOldPrice`, `mocNewPrice`, `mocSaveText`, `mocCountryBadge`, `mocFlag`, `mocCountryName`, `mocCurrencyCode`, `mocHotmartBtn`, `mocPeruBtn`, `mocBottomBtn`.
- Experiencia: `mfAppleExpImage`.
- Popup: todos los IDs `mfyModal*`, `mfyCoupon*`, `mfyVoucher*`, `mfyOrder*`, `mfyQr*`, `mfyCopyBtn`, `mfyMontoPagar`, `mfyTimer`, `mfyToast` y asociados.

## Formularios, webhooks y WhatsApp

- Trial: POST JSON como `text/plain` a Google Apps Script; primero espera respuesta del webhook y después abre únicamente la app WhatsApp en Android/iOS. En escritorio no usa WhatsApp Web.
- WhatsApp trial: `51947064723`; mensaje actualizado a “48 horas”.
- Payload trial preservado: acción/evento, nombre, email, teléfono, país, ciudad, códigos geográficos, URL/referrer, UTMs duplicadas para Meta, `fbp`, `fbc`, `fbclid`, IP, user agent, zona horaria, dispositivo, navegador, sistema operativo, idioma, estado, origen, entorno y timestamp.
- Popup Perú: webhook `https://n8n-n8n.axiuyv.easypanel.host/webhook/hotmart-compra`, `FormData` con voucher, payload, total, moneda, items, extras, cupón y datos WhatsApp.

## Tracking

- Meta Pixel principal: `2670158496696527`.
- Meta Pixel anterior: `952423081054108`.
- Eventos y nombres existentes preservados, incluidos `InitiateCheckout`, el evento personalizado `mentorify:peru-cta-click` y `Purchase` para Yape/Plin.
- Captura de cookies `_fbp`, `_fbc`, `fbclid`, UTMs, IP y contexto del dispositivo preservada.

## Oferta y geolocalización

- Hotmart: `https://pay.hotmart.com/B100727388A?checkoutMode=10`.
- Base USD: antes 170, ahora 17.
- Perú: antes S/700, ahora S/70; flujo local Yape/Plin.
- Perfiles originales: US USD 1; PE PEN 3.76; MX MXN 18.50; CO COP 3950; CL CLP 960; EC USD 1; BO BOB 6.9; AR ARS 1050; ES EUR 0.92.
- Detección por zona horaria/idioma y respaldo mediante `ipwho.is` e `ipapi.co`; caché de país por 6 horas.

## Popup Perú

- Apertura mediante `mentorify:peru-cta-click` y APIs globales `mfyOpenPeruPopup` / `mfyClosePeruPopup`.
- Yape/Plin, QR original, copia de número, cálculo de precio, complementos, resumen y temporizador.
- Cupón `MENTOR10` (10%), voucher imagen/PDF de hasta 8 MB, envío de orden, WhatsApp y Meta Pixel Purchase.
- Número Yape original `937469591`, titular enmascarado y recursos visuales originales preservados.

## Acordeones y recursos

- Autores/talleres: acordeón principal, categorías, temas, autores y cursos.
- FAQ: siete elementos con alturas recalculadas y estado accesible.
- Experiencia: tres paneles con `organizados-por-proposito.png`, `sin-perder-el-ritmo.png` y `libros-y-audiolibros.png`.
- App: `APK.png` e `IOS.png`; destinos aún no confirmados.
- Hero: video `background-video-jan-28.mp4` y logo `lkogo-.png`.
- Oferta/popup: cabecera, medios de pago, Yape y QR originales.
