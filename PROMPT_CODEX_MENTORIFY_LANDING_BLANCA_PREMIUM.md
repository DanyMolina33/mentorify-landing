# PROMPT MAESTRO PARA CODEX — MENTORIFY LANDING BLANCA PREMIUM

Trabaja **exclusivamente** dentro de la carpeta actual `MENTORIFY_LANDING`.

Tu tarea es construir la versión definitiva de la landing de Mentorify con **Vite Vanilla, HTML semántico, CSS moderno y JavaScript ES Modules**, tomando como fuente técnica obligatoria el archivo:

`CODIGO_ACTUAL_MENTORIFY.txt`

Ese archivo contiene el código que actualmente funciona. **Debes leerlo completo antes de escribir o modificar archivos.** No lo reemplaces a ciegas, no elimines funcionalidades y no inventes enlaces, precios, identificadores, eventos ni reglas comerciales.

---

## 1. OBJETIVO

Crear una landing de conversión **minimalista, luminosa, confiable, muy premium y altamente vendedora**, inspirada en la limpieza de Apple, Mindvalley, OpenAI y Linear, pero con identidad propia de Mentorify.

No hacer un clon de ninguna marca. No reutilizar logos, textos ni recursos de terceros.

La sensación de marca debe ser:

- transformación y nuevo comienzo;
- confianza;
- claridad;
- crecimiento personal;
- tecnología accesible;
- producto premium;
- mucho aire visual;
- alta legibilidad;
- cero saturación visual.

El cuerpo principal de la página será **blanco**. Solo se mantendrán en fondo oscuro o con su imagen original las secciones que se especifican expresamente más adelante.

---

## 2. REGLA PRINCIPAL: CONSERVAR TODO LO QUE YA FUNCIONA

Antes de desarrollar:

1. Lee completo `CODIGO_ACTUAL_MENTORIFY.txt`.
2. Crea `docs/INVENTARIO_FUNCIONAL.md` con:
   - secciones existentes;
   - IDs públicos;
   - URLs;
   - formularios;
   - webhooks;
   - Meta Pixel;
   - lógica de WhatsApp;
   - Hotmart;
   - detección de país y moneda;
   - popup Yape/Plin;
   - cupón;
   - acordeones;
   - marquesina;
   - FAQ;
   - imágenes y recursos.
3. Crea una copia intacta del archivo fuente en `backup/CODIGO_ACTUAL_MENTORIFY_ORIGINAL.txt`.
4. Recién después empieza la implementación.

### No modificar ni romper

- `id="mfyTrialForm"`
- `id="mfyTrialName"`
- `id="mfyTrialEmail"`
- `id="mfyTrialStatus"`
- `id="mfyFacilitadoresV5"`
- `id="preguntas-frecuentes"`
- `id="mf-apple-exp"`
- `id="mentorifyPremiumPaymentBlock"`
- `id="mentorifyOfferCard"`
- `id="mfyPeruModal"`
- todos los IDs utilizados por scripts internos;
- todos los nombres de eventos personalizados;
- todos los campos enviados en payloads;
- la captura de UTMs, `fbp`, `fbc`, `fbclid`, IP, país, ciudad, dispositivo, navegador, sistema operativo, zona horaria e idioma;
- la lógica de precios por país;
- la lógica Hotmart versus Perú;
- el popup Yape/Plin y la carga de voucher;
- el cupón `MENTOR10`;
- los eventos de Meta Pixel;
- los enlaces y URLs existentes.

### Valores técnicos que deben mantenerse exactamente

- WhatsApp del formulario: `51947064723`
- Webhook del formulario:
  `https://script.google.com/macros/s/AKfycbz_p04e41LiJwzYIomHgCjiZNoelQVDH5VrlSvKQxAbjVedL_zIPXuH5w7riEc0G1hn/exec`
- Hotmart:
  `https://pay.hotmart.com/B100727388A?checkoutMode=10`
- Meta Pixel principal: `2670158496696527`
- Meta Pixel anterior: `952423081054108`
- Mantener todos los precios, monedas, tasas y reglas exactamente como aparecen en el código fuente.
- Mantener los números, QR, imágenes y webhooks del popup de Perú exactamente como aparecen en el código fuente.

No cambies ninguna regla comercial no solicitada. La prueba gratuita es de **48 horas**. En los textos visibles reemplaza “2 días” por “48 horas”, pero no alteres la lógica funcional existente salvo que sea estrictamente necesario para coherencia.

---

## 3. ARQUITECTURA DEL PROYECTO

Si el proyecto está vacío, inicializa Vite Vanilla directamente en la carpeta actual, sin crear una subcarpeta.

Estructura mínima:

```text
MENTORIFY_LANDING/
├── index.html
├── package.json
├── public/
│   ├── manifest.webmanifest
│   └── icons/
├── src/
│   ├── main.js
│   ├── styles/
│   │   ├── tokens.css
│   │   ├── base.css
│   │   ├── hero.css
│   │   ├── form.css
│   │   ├── sections.css
│   │   ├── offer.css
│   │   ├── faq.css
│   │   ├── modal.css
│   │   └── responsive.css
│   ├── modules/
│   │   ├── trial-form.js
│   │   ├── community.js
│   │   ├── marquee.js
│   │   ├── accordions.js
│   │   ├── offer.js
│   │   ├── peru-modal.js
│   │   ├── tracking.js
│   │   └── reveal.js
│   └── config.js
├── docs/
│   └── INVENTARIO_FUNCIONAL.md
├── backup/
│   └── CODIGO_ACTUAL_MENTORIFY_ORIGINAL.txt
└── README.md
```

No usar React, Tailwind, Bootstrap, jQuery ni librerías pesadas. Prioriza HTML, CSS y JavaScript nativo.

---

## 4. SISTEMA VISUAL

### Tipografía

Usar **Inter** en toda la landing.

No usar Inter Tight.

Cargar únicamente los pesos necesarios: 400, 500, 600, 700 y 800.

### Colores

```css
--mfy-white: #ffffff;
--mfy-surface: #f7f9fc;
--mfy-surface-blue: #eef7ff;
--mfy-text: #101114;
--mfy-muted: #5e6470;
--mfy-line: rgba(15, 23, 42, .10);
--mfy-blue: #087bff;
--mfy-blue-hover: #0068db;
--mfy-blue-soft: #dff2ff;
--mfy-black: #050505;
```

El azul será un acento, no el fondo dominante.

### Estilo

- fondo blanco;
- tarjetas blancas o gris muy claro;
- bordes de 1px apenas visibles;
- sombras suaves y realistas;
- radios entre 20px y 30px;
- nada chillón;
- nada infantil;
- nada sobrecargado;
- mucho espacio vertical;
- animaciones discretas basadas en `opacity` y `transform`;
- respetar `prefers-reduced-motion`.

---

## 5. HERO CINEMATOGRÁFICO CON TRANSICIÓN A BLANCO

### Recursos

Video obligatorio:

`https://secretosdemillonarios.com/wp-content/uploads/2026/07/background-video-jan-28.mp4`

Logo principal:

`https://secretosdemillonarios.com/wp-content/uploads/2026/06/lkogo-.png`

### Composición

- El video ocupa toda la parte superior, de borde a borde.
- El video debe reproducirse con `autoplay muted loop playsinline`.
- Debe tener `poster` o fallback visual.
- Texto y logo centrados.
- Encabezado superior minimalista con logo pequeño y navegación: `Experiencia`, `Contenido`, `Preguntas`.
- No incluir un botón grande “Empezar mi prueba” en el hero.
- No duplicar CTAs de registro.
- Debajo del subtítulo solo incluir un botón secundario discreto:
  **“Conocer la plataforma Mentorify”**
  que haga scroll suave a la sección de teléfono y marquesina.

### Copy obligatorio del hero

Eyebrow:

`BIBLIOTECA INTELIGENTE DE APRENDIZAJE`

Título:

`Despierta tu mente. Haz que tu vida avance.`

Subtítulo:

`Explora durante 48 horas una biblioteca inteligente con entrenamientos, libros y recursos organizados para avanzar en salud, dinero, mentalidad, aprendizaje y liderazgo.`

Microtexto opcional y muy breve:

`Acceso gratuito por 48 horas · Sin tarjeta · Activación inmediata`

### Degradado obligatorio

El video **no puede terminar con un corte visible**.

Implementar una transición larga y natural hacia blanco usando una combinación de:

- overlay oscuro ligero arriba para legibilidad;
- `linear-gradient()` vertical;
- pseudo-elemento inferior de al menos 260–420px;
- `mask-image` / `-webkit-mask-image` cuando sea compatible;
- fondo blanco en la siguiente sección;
- solapamiento suave de la tarjeta del formulario.

La parte inferior debe pasar aproximadamente por estas etapas:

```css
transparent → rgba(255,255,255,.12) → rgba(255,255,255,.55) → #ffffff
```

No crear una línea, franja, borde ni salto entre el video y el blanco.

El resultado debe parecer un amanecer que se disuelve en una página clara.

---

## 6. FORMULARIO PREMIUM DE ACCESO GRATUITO

El formulario debe aparecer inmediatamente después del hero, parcialmente superpuesto sobre la transición blanca.

No usar la tarjeta negra grande ni el bloque con el texto “Explora Mentorify por dentro”.

Crear una única tarjeta clara, compacta y premium, máximo 520px–600px de ancho.

### Contenido

- Logo Mentorify.
- Título: `Solicita tu acceso gratuito`
- Subtítulo pequeño: `Explora Mentorify durante 48 horas.`
- Campo Nombre.
- Campo Email.
- Botón azul principal:
  `CREAR MI ACCESO GRATUITO`
- Indicadores discretos:
  `Acceso privado · Sesión segura · Sin tarjeta`
- Legal:
  `Tus datos se utilizarán únicamente para validar y crear tu acceso de prueba.`

### Requisitos funcionales

Conservar exactamente:

- IDs del formulario;
- validaciones;
- webhook;
- payload completo;
- UTMs;
- cookies Meta;
- detección de ubicación, dispositivo, navegador, sistema operativo e idioma;
- envío primero al webhook;
- redirección posterior a WhatsApp en Android/iOS;
- mensajes de estado;
- prevención de doble envío.

Actualizar el mensaje visible de WhatsApp para decir `48 horas` en lugar de `2 días`.

No usar WhatsApp Web como respaldo en computadora si el código fuente actualmente lo impide.

---

## 7. BLOQUE DE APP DEBAJO DEL FORMULARIO

Debajo del formulario agregar un bloque compacto, no invasivo:

Título:

`Navega más rápido y seguro con la app de Mentorify.`

Texto:

`Continúa tus clases, revisa tu avance y entra a tu biblioteca desde tu dispositivo.`

Conservar las imágenes existentes:

- Android/APK:
  `https://secretosdemillonarios.com/wp-content/uploads/2026/06/APK.png`
- iOS:
  `https://secretosdemillonarios.com/wp-content/uploads/2026/06/IOS.png`

No inventar enlaces de descarga. Si el código fuente no contiene destinos funcionales, mantener las insignias como elementos informativos y centralizar posibles destinos en `src/config.js`:

```js
export const APP_ANDROID_URL = '';
export const APP_IOS_URL = '';
export const APP_WEB_URL = '';
```

Cuando una URL esté vacía, no generar enlaces rotos.

---

## 8. CTA DE COMUNIDAD

Debajo del bloque de app, agregar un CTA secundario premium y claramente separado del botón de registro.

Título:

`Únete a la comunidad Mentorify.`

Texto:

`Recibe masterclasses gratuitas, recomendaciones de aprendizaje y novedades para seguir avanzando cada día.`

Botón:

`UNIRME A LA COMUNIDAD`

Crear en `src/config.js`:

```js
export const COMMUNITY_URL = '';
```

**No inventar el enlace del grupo.** El archivo fuente no contiene un enlace de comunidad confirmado. Si `COMMUNITY_URL` está vacío:

- no navegar a `#`;
- no abrir una URL falsa;
- dejar el botón visualmente deshabilitado con un comentario `TODO: agregar enlace oficial de comunidad`;
- documentar en README dónde pegar el enlace oficial de WhatsApp.

Cuando se configure un enlace oficial de grupo de WhatsApp, en celular debe abrir el flujo apropiado de la aplicación y en computadora el destino normal del enlace.

---

## 9. SECCIONES INFERIORES: NO CAMBIAR EL ORDEN

Mantener el orden exacto que tiene el archivo fuente:

1. formulario / acceso;
2. autores y talleres;
3. teléfono con marquesina;
4. preguntas frecuentes;
5. experiencia de aprendizaje;
6. oferta premium;
7. popup Yape/Plin.

No reordenar estas secciones.

El rediseño debe ser principalmente visual y de copy, conservando estructura, IDs, datos y comportamiento.

---

## 10. AUTORES Y TALLERES

Mantener todos los datos, categorías, autores, talleres y acordeones existentes.

Rediseñar solo la presentación para fondo blanco:

- título en negro;
- subtítulo gris;
- botón principal azul, elegante y de menor altura;
- acordeones con bordes suaves y fondos claros;
- colores de categorías moderados;
- animaciones suaves;
- no eliminar contenido ni abreviar listas.

Copy:

Título:

`Aprende de entrenadores, autores y expertos reconocidos.`

Subtítulo:

`Explora una biblioteca organizada con talleres, libros y recursos seleccionados para avanzar con más claridad.`

Botón:

`VER AUTORES Y TALLERES INCLUIDOS`

---

## 11. TELÉFONO Y MARQUESINA

Conservar el teléfono:

`https://secretosdemillonarios.com/wp-content/uploads/2026/07/cel11.png`

Conservar absolutamente todas las imágenes de autores del código fuente.

La marquesina debe funcionar de forma infinita y fluida:

- dos filas;
- velocidades distintas;
- dirección contraria entre filas;
- duplicado suficiente de elementos para evitar espacios vacíos;
- sin saltos al reiniciar;
- `will-change: transform`;
- pausa o reducción de animación con `prefers-reduced-motion`;
- no bloquear interacción ni scroll.

### Apariencia blanca premium

- sección blanca;
- tarjetas con fondo blanco, borde muy sutil y sombra delicada;
- teléfono por delante;
- glow azul muy tenue detrás del teléfono;
- sombra realista;
- movimiento flotante mínimo;
- máscaras laterales blancas, no bloques rectangulares;
- esquinas y extremos deben desvanecerse suavemente;
- mantener el teléfono completamente visible en desktop, tablet y móvil.

Copy encima:

Eyebrow:

`UNA BIBLIOTECA. MUCHAS PERSPECTIVAS.`

Título:

`Grandes ideas, organizadas para ayudarte a avanzar.`

Subtítulo:

`Descubre autores, entrenadores y especialistas dentro de una experiencia clara, práctica y accesible desde cualquier dispositivo.`

---

## 12. PREGUNTAS FRECUENTES

Esta sección debe mantenerse en **fondo negro**.

Conservar las siete preguntas y respuestas completas del archivo fuente y toda su lógica de acordeón.

Mejorar visualmente:

- ancho máximo elegante;
- título blanco;
- respuestas en gris claro;
- separadores finos;
- iconos `+`/`−` discretos;
- animación suave;
- excelente lectura móvil;
- sin tarjetas pesadas.

Título:

`Las respuestas a tus preguntas.`

Subtítulo:

`Resuelve las dudas más importantes sobre Mentorify, tu acceso y todo lo que recibes.`

---

## 13. EXPERIENCIA DE APRENDIZAJE

Mantener esta sección en fondo blanco y conservar:

- los tres acordeones;
- todas las imágenes;
- la lógica de cambio de imagen;
- el comportamiento móvil.

Mantener las URLs existentes, incluidas:

- `organizados-por-proposito.png`
- `sin-perder-el-ritmo.png`
- `libros-y-audiolibros.png`

Mejorar:

- tipografía Inter;
- tarjeta gris/azul muy claro;
- sombras sutiles;
- imagen limpia;
- acordeón premium;
- contraste correcto en móvil;
- sin texto negro ilegible sobre fondos oscuros.

Copy principal:

`Una experiencia diseñada para que avances sin perder el ritmo.`

---

## 14. OFERTA PREMIUM

Mantener el fondo con imagen/color que ya existe en esta sección. No convertirla en blanco plano.

Conservar:

- tarjeta de precio;
- detección de país;
- moneda;
- precios actuales;
- Hotmart;
- Yape/Plin;
- medios de pago;
- garantía;
- Meta Pixel;
- eventos de checkout;
- popup;
- cupón;
- carga de voucher;
- todos los enlaces e imágenes.

Cambiar el copy negativo:

### Título anterior

`No compres más cursos sueltos y desordenados.`

### Nuevo título obligatorio

`Todo tu aprendizaje, organizado en un solo lugar.`

### Nueva descripción

`Accede a una biblioteca clara y completa para estudiar con dirección, continuar donde te quedaste y aprovechar mejor cada contenido. Activa Mentorify con un solo pago y conserva tu acceso.`

### Cierre

`Un solo pago. Sin mensualidades.`

Mantener el `90% DE DESCUENTO`, pero refinar su diseño para que no parezca una promoción agresiva ni un banner barato.

---

## 15. POPUP YAPE / PLIN

Conservar toda la lógica actual sin simplificar:

- apertura por evento personalizado;
- bloqueo seguro de scroll;
- compatibilidad Android y Elementor;
- QR;
- copiar número;
- precio;
- cupón `MENTOR10`;
- extras;
- resumen;
- voucher imagen/PDF;
- límite de 8 MB;
- envío de orden;
- WhatsApp;
- webhook;
- Meta Pixel Purchase;
- cierre y desbloqueo de emergencia.

Solo armonizar visualmente la tipografía y radios con el sistema de diseño de la landing. No reescribir la lógica si no es necesario.

---

## 16. RENDIMIENTO Y ACCESIBILIDAD

- `loading="lazy"` para imágenes bajo el hero.
- `decoding="async"` cuando corresponda.
- No hacer lazy-load del logo ni elementos esenciales del hero.
- Video con `preload="metadata"` y poster.
- Reducir JavaScript duplicado.
- Evitar listeners repetidos.
- Evitar múltiples importaciones de Google Fonts.
- Una sola carga de Inter.
- Botones con `type` correcto.
- `aria-expanded`, `aria-controls` y etiquetas accesibles.
- Estados de foco visibles.
- Contraste WCAG AA.
- No provocar layout shift.
- No usar animaciones excesivas.
- Responsive real en 360px, 390px, 768px, 1024px, 1366px y 1920px.

---

## 17. CONFIGURACIÓN CENTRALIZADA

Crear `src/config.js` y centralizar, sin alterar valores:

- video;
- logos;
- WhatsApp;
- webhook;
- Hotmart;
- Meta Pixel IDs;
- URLs de imágenes principales;
- URLs de app;
- URL de comunidad;
- duración visible del trial: 48 horas.

No dupliques estas constantes en varios archivos.

---

## 18. PRUEBAS OBLIGATORIAS

Antes de finalizar:

1. Ejecuta `npm install`.
2. Ejecuta `npm run build`.
3. Corrige todos los errores de compilación.
4. Ejecuta `npm run dev`.
5. Verifica que la marquesina se mueva sin saltos.
6. Verifica los acordeones.
7. Verifica cambio de imagen de experiencia.
8. Verifica formulario con validación sin enviar datos de prueba reales.
9. Verifica que los enlaces de Hotmart sean los originales.
10. Verifica apertura del popup Perú mediante el evento existente.
11. Verifica que no haya URLs `#` funcionales salvo los placeholders documentados de app/comunidad.
12. Verifica desktop, tablet y móvil.
13. Revisa consola del navegador: cero errores.
14. Comprueba que el video se funda de forma continua hacia blanco.

No envíes datos reales al webhook ni dispares compras reales durante pruebas automáticas.

---

## 19. ENTREGABLES

Debes dejar:

- proyecto completo funcionando;
- `README.md` con comandos de desarrollo, compilación y despliegue en Hostinger;
- `docs/INVENTARIO_FUNCIONAL.md`;
- `docs/CAMBIOS_REALIZADOS.md`;
- `backup/CODIGO_ACTUAL_MENTORIFY_ORIGINAL.txt`;
- carpeta `dist/` generada mediante `npm run build`;
- resumen final de archivos creados y pruebas realizadas;
- lista explícita de los únicos datos pendientes:
  - URL oficial de comunidad;
  - URL Android, iOS o app web, únicamente si no están presentes en el código fuente.

---

## 20. FORMA DE TRABAJO

- No me entregues fragmentos sueltos.
- No me entregues parches.
- No te limites a sugerir cambios.
- Implementa el proyecto completo.
- No borres funciones que no comprendas.
- Si una función existente parece duplicada, comprueba su uso antes de consolidarla.
- Preserva toda la lógica comercial y de seguimiento.
- No cambies precios, trial, estados, enlaces ni píxeles por decisión propia.
- Si falta un enlace no confirmado, utiliza una variable de configuración vacía y documéntala; jamás inventes uno.

Empieza ahora leyendo `CODIGO_ACTUAL_MENTORIFY.txt`, creando el inventario y el backup. Después construye la landing completa, ejecuta las pruebas y deja el proyecto listo para `npm run build` y despliegue en Hostinger.
