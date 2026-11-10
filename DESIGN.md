# DESIGN.md — sistema "Tejido"

Este documento manda sobre el código: si algo en `src/` lo contradice, se corrige el código.
Reemplaza al sistema anterior ("Signal", oscuro). Referencia de composición y ritmo: jarnket.com.
De ahí se toma el sistema (retícula, escala, franjas, orden de secciones); el texto, la foto y los
motivos son propios.

## 1. Concepto: el código es tejido

Un telar y un programa hacen lo mismo: repiten instrucciones hasta que aparece un patrón. El sitio
lo dice con tres cosas y nada más:

- **Añil** como único color de acento (el tinte azul).
- **Franjas de tejido** en pixel art entre secciones, que se tejen fila por fila al entrar.
- **Hilo**: el fondo es una trama de hebras verticales y todo efecto se explica con tela (tejer,
  deshilar, teñir, puntada).

**Es el portafolio de un Ingeniero de Sistemas Informáticos.** Lo cultural es un acento discreto:
seis motivos y una línea de pie por franja. Nada de banderas, colores patrios, tipografía
"folclórica" ni texto turístico. Si un elemento hace que el sitio parezca "sobre El Salvador" en
vez de "sobre un ingeniero", sobra.

## 2. Tokens (`src/styles/tokens.css`)

Claro por defecto. El toggle `MODE LIGHT/DARK` del header pone `data-theme="dark"` en `<html>`.

| Token | Claro | Oscuro | Uso |
| --- | --- | --- | --- |
| `--bg` | `#f4f5f7` | `#0a0e16` | fondo de página |
| `--surface` | `#fcfcfe` | `#121823` | tags, pestañas |
| `--ink` | `#111418` | `#eef1f5` | texto |
| `--muted` | `#62666e` | `#9ba3af` | metadatos, texto secundario |
| `--rule` | `#d7d9dc` | `#242b38` | filetes |
| `--indigo` | `#1c69e3` | igual | acento, secciones a sangre |
| `--indigo-ink` | `#115bcd` | `#7fb0ff` | añil como texto (AA) |
| `--on-indigo` | `#f9fafc` | igual | texto sobre añil |
| `--night` | `#060e23` | igual | secciones oscuras |
| `--on-night` | `#f0f4f9` | igual | texto sobre noche |
| `--ok` / `--warn` / `--err` | `#348757` / `#df911a` / `#ce2324` | igual | LEDs de estado |

- **Tonos de sección:** `.tone-flood` (añil) y `.tone-night` (noche) redefinen `--bg`, `--ink`,
  `--muted`, `--rule`, `--accent-ink` y `--thread`. Los componentes solo usan esos tokens, así
  funcionan en cualquier fondo sin variantes.
- **Sobre añil no hay texto apagado:** `--muted` vale `--on-indigo` (el blanco al 72 % no llega a AA).
- **Easing:** salidas `cubic-bezier(.16,1,.3,1)` (`--ease-out`, en GSAP `expo.out`); in-out
  `cubic-bezier(.65,0,.35,1)` (`--ease-io`).
- **Fondo de página:** pinstripe (una hebra de 1 px cada 6 px, `--pin`) y `.rails`: filetes verticales
  fijos que marcan los márgenes y las columnas de la retícula.
- **Tina n.º 2** (`data-vat="2"`, easter egg): `--indigo: #3d3bd1`.

## 3. Tipografía (`src/styles/fonts.css`, autoalojada, solo latin)

| Rol | Fuente | Reglas |
| --- | --- | --- |
| Display | Chakra Petch 600 | MAYÚSCULAS, tracking `-0.02em`, interlínea `0.86`. Clase `.display` |
| Etiquetas | Geist Mono 500 | 11 px, MAYÚSCULAS, tracking `0.14em`, interlínea 16 px. Clase `.label` |
| Lectura | Geist 400 | 16 px / 1.5 |

Escala: `--fs-hero` (H1, 105 px a 1280) · `--fs-mega` (H2 de sección: 48 px en móvil, 128 px a 1280,
144 px a 1440) · `--fs-title` · `--fs-lead`. Los H2 en español se eligen cortos (STACK, PROYECTOS,
EXPERIENCIA, LOGROS) para que quepan a ese tamaño.

## 4. Retícula y espaciado

- `.shell`: margen lateral `max(16px, 2.4vw)`.
- 8 columnas en escritorio (≥ 900 px), 2 en móvil. Un solo punto de quiebre: 900 px.
- Secciones: cabecera con `clamp(72px, 9vw, 128px)` arriba; `clamp(140px, 14vw, 200px)` abajo
  (ese aire es donde sube el teñido de la sección siguiente).
- Esquina achaflanada (`.cut`, 8 px) en logo, chips y botones. Segundo borde desplazado en MENU,
  chips, tags y botón "+".

## 5. Secciones, en orden (`src/components/`)

1. **Header** (`Header.astro`, fijo): logo cuadrado añil achaflanado + nombre · `MODE LIGHT/DARK` ·
   franja fina · hora de El Salvador · idioma · MENU. Se esconde al bajar, vuelve al subir.
   **Menú** (`Menu.astro`): `<dialog>` a pantalla completa en añil.
2. **Hero** (`Hero.astro`): chip añil con el rol, línea mono, intro con tecnologías en añil (izq.);
   retrato en duotono pixelado entre dos franjas (centro); "desde ’22" (der.); nombre gigante
   partido en dos y SCROLL (abajo). En móvil: retrato, nombre, texto.
3. **Sobre mí** (`About.astro`): contorno del mapa con cuatro íconos pixel y el párrafo que se
   revela palabra por palabra con el scroll.
4. **Toolkit** (`Toolkit.astro`, añil): `NN herramientas · N disciplinas`; una fila por disciplina
   con chips blancos (logo + nombre). Primero operación, después desarrollo.
5. **Work** (`Work.astro`): una fila por proyecto, imagen alternando lado, tintada en añil con trama
   y borde de tejido; a color con hover. "Leer el caso" despliega los puntos en la misma fila.
6. **Experience** (`Experience.astro`, noche): tabla N.º / Empresa / Rol / Periodo / Estado, LED +
   palabra (EN SERVICIO, REGISTRADO, GRADUADO) y botón "+" que expande.
7. **Recognition** (`Recognition.astro`): pestañas con conteo y filas fecha | título | emisor | resultado.
8. **Writing:** no existe todavía (no hay notas). Cuando las haya: lista fecha · minutos | título | tags.
9. **Contacto + footer** (`Contact.astro`, añil): pregunta gigante, base y zona horaria, CTA,
   Directo / En otros lados, nombre en glifos de tejido, fila legal y franja final con su pie.

## 6. Tejido (`src/lib/motifs.ts`, `src/scripts/fx/weave.ts`, `Weave.astro`, `Pixel.astro`)

- Los motivos son mapas de bits en texto (`#` = hilo). Una sola fuente para las franjas (canvas) y
  los íconos del mapa (SVG generado al construir).
- Motivos: `anil` (rombos), `greca` (greca escalonada y pirámide), `volcan`, `torogoz`, `izote`, `olas`.
- Tres tamaños: `band` (entre secciones), `frame` (retrato e imágenes), `thin` (header).
- El color es `currentColor` (`--thread`): añil sobre claro, blanco sobre añil, azul claro sobre noche.
- Pie de franja, en mono: `TEJIDO DE “palabra” · significado` (es/en en `src/i18n/weave.ts`).
  Una palabra y una línea. El significado conecta con ingeniería cuando puede ("capas sobre capas,
  como una plataforma").

## 7. Movimiento

- **Lenis** para el scroll suave, sincronizado con el ticker de GSAP. **GSAP + ScrollTrigger** para
  lo que depende del scroll. Ambos viven en un bundle aparte (`scripts/motion.ts`) que solo se
  carga sin `prefers-reduced-motion`.
- Reveals: 22 px de desplazamiento + fade, 0.9 s, `expo.out`, escalonado 70 ms.
- Títulos: suben tras una máscara (`.mask > span`).
- Tejidos: fila por fila, alternando sentido (lanzadera), 1.1 s.
- Hover: chips suben 2 px; filas de logros desplazan el título 10 px.
- La entrada del hero y la intro son **CSS puro**: no esperan a ningún script.
- **`prefers-reduced-motion`:** `theme-init.js` no pone `html.motion`; no se carga GSAP ni Lenis;
  tejidos, retrato y nombre se pintan completos; el "sobre mí" no se fija y el texto se ve entero.
- Sin JS todo el contenido es visible (los plegables quedan abiertos).

## 8. Mejoras sobre la referencia

Cada una está atada al concepto; ninguna retrasa el contenido.

| Mejora | Qué hace | Por qué |
| --- | --- | --- |
| Intro de primera visita | Una hebra añil cruza la pantalla, teje el logo y la página se abre en dos (1.45 s, solo CSS, una vez por navegador) | Presenta el concepto en un gesto. Si el JS falla, igual termina |
| Retrato interactivo | Los píxeles del duotono se apartan del puntero y vuelven con un muelle; con el scroll, las filas se deshilan | La foto deja de ser una imagen: es tela. El deshilado es el equivalente táctil |
| Nombre con profundidad | Las letras se inclinan hacia el mouse y las dos mitades se separan con el scroll | Da volumen al elemento más grande de la página sin moverlo de sitio |
| Teñido entre secciones | El color de la sección siguiente sube por las hebras del fondo, cada una a su ritmo | Claro → añil → noche se siente como tela entrando en la tina, no como un corte |
| Franjas con lanzadera | Las filas se tejen alternando sentido | Así teje un telar; la referencia las revela de un solo lado |
| Cursor de aguja | Un punto y un rombo que crece sobre enlaces y dice VER sobre imágenes | Discreto; no existe en táctil |
| Magnetismo y tilt | Botones que ceden hacia el puntero; imágenes con inclinación 3D y brillo | Respuesta física en lo que se puede pulsar |
| Imágenes a color en táctil | Sin hover, la imagen se destiñe al cruzar el centro de la pantalla | El efecto no se pierde en móvil |
| Contadores y decodificado | Cifras que cuentan y etiquetas que se resuelven al aparecer | Refuerza el formato "frases cortas, con cifras" |
| Nombre del footer vivo | Las puntadas giran y se encienden bajo el puntero o el dedo, y se enfrían | Cierra la página con algo que tocar |
| Cambio de tema teñido | El modo oscuro baja como tinte (View Transitions) | El toggle usa el mismo lenguaje que las secciones |
| Tina n.º 2 | Código Konami o teclear `anil`: todo el sitio pasa a añil violeta | Un secreto para quien explora |
| Hora de El Salvador | Reloj en vivo en el header | Dice dónde y cuándo estoy sin una frase |
| Progreso de lectura | Una línea de puntadas bajo el header | Orientación en una página larga |
| Diagramas como imagen | Plataforma y este sitio muestran capas y camino de una petición en vez de una captura | Es un portafolio de sistemas: la arquitectura es la imagen |

Descartado: sonido (no aporta al concepto) y WebGL (canvas 2D alcanza y pesa menos).

## 9. Rendimiento

- Objetivo: Lighthouse ≥ 90 en Performance y 100 en Accesibilidad.
- Canvas 2D, nunca WebGL. Cada canvas anima solo mientras se ve y solo si algo se mueve; en reposo
  no hay bucles corriendo.
- El bundle inicial no incluye GSAP ni Lenis (import dinámico). Los efectos de puntero no se
  inicializan en táctil.
- Fuentes: 3 archivos woff2 (latin); la display se precarga.
- Los logos del toolkit se resuelven al construir (`simple-icons` es devDependency): al navegador
  solo llega el SVG.

## 10. Accesibilidad

- Contraste AA en todo el texto, en los tres tonos y en los dos temas.
- Foco visible (2 px, `--accent-ink`) en todo lo interactivo.
- Un solo `h1` (el nombre, con `aria-label`); `h2` por sección; `h3` por fila.
- Todo canvas decorativo lleva `aria-hidden`; el nombre del footer es `role="img"` con etiqueta.
- El menú es un `<dialog>` modal: foco atrapado, Esc cierra, el foco vuelve a MENU.
- Plegables con `aria-expanded` / `aria-controls`; filtros con `aria-pressed`.
- El cursor propio nunca reemplaza al del sistema en táctil ni con reduced-motion.

## 11. Reglas que no cambian

- **CSP estricta** (`server/handler.go`): nada de `<script>` o `<style>` inline, ni atributos
  `style=""`, ni `innerHTML`. El DOM dinámico se crea con `createElement`/`textContent`; los estilos
  dinámicos, con CSSOM (`el.style`, que es lo que usa GSAP). El CI lo comprueba sobre `dist/`.
- **Sin terceros:** fuentes autoalojadas, sin CDNs ni trackers. Dependencias con versión exacta.
- **Texto:** todo en `src/i18n/` (un archivo por sección, es/en en paralelo). Frases cortas, con
  cifras. Años y duraciones se calculan con `src/lib/time.ts`.
- **Privacidad:** "infraestructura propia / autoalojado". Nada de "homelab", host, hardware,
  versiones, nombres internos, IP, puertos ni reglas de red.
