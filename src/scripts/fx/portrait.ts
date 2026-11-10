// Retrato del hero: la foto se muestrea en una rejilla y se pinta como duotono añil pixelado.
// - Entrada: se teje fila por fila.
// - Puntero: los píxeles se apartan y vuelven con un muelle.
// - Scroll (setUnweave): las filas se deshilan hacia los lados; es también el equivalente táctil.
// Solo corre el bucle cuando hay algo moviéndose.
import { cssColor, fitCanvas, onRepaint, onWidthChange, reduced } from '../core/env';

const CELL = 4; // px CSS por píxel del retrato
const LEVELS = 14;
const RADIUS = 78;

let setUnweaveImpl: (u: number) => void = () => {};
/** 0 = retrato entero, 1 = deshilado del todo. */
export function setUnweave(u: number): void {
  setUnweaveImpl(u);
}

function mix(a: number[], b: number[], t: number): string {
  return `rgb(${Math.round(a[0] + (b[0] - a[0]) * t)},${Math.round(a[1] + (b[1] - a[1]) * t)},${Math.round(a[2] + (b[2] - a[2]) * t)})`;
}
function rgb(color: string): number[] {
  const hex = color.replace('#', '');
  if (/^[0-9a-f]{6}$/i.test(hex)) return [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16));
  const m = color.match(/[\d.]+/g);
  return m ? m.slice(0, 3).map(Number) : [18, 58, 143];
}

export function initPortrait(): void {
  const root = document.querySelector<HTMLElement>('[data-portrait]');
  const img = root?.querySelector<HTMLImageElement>('.portrait__img');
  const canvas = root?.querySelector<HTMLCanvasElement>('.portrait__canvas');
  const ctx = canvas?.getContext('2d');
  if (!root || !img || !canvas || !ctx) return;

  let cols = 0;
  let rows = 0;
  let level = new Uint8Array(0); // 255 = fondo (transparente)
  let ox = new Float32Array(0);
  let oy = new Float32Array(0);
  let vx = new Float32Array(0);
  let vy = new Float32Array(0);
  let seed = new Float32Array(0); // ruido por fila para el deshilado
  let palette: string[] = [];
  let buckets: Int32Array[] = [];
  let rowDrift = new Float32Array(0);
  let rowFade = new Float32Array(0);
  let rowSkip = new Uint8Array(0);
  let reveal = reduced ? 1 : 0;
  let unweave = 0;
  let px = -1e4;
  let py = -1e4;
  let pointerIn = false;
  let running = false;
  let visible = true;

  const sample = () => {
    const { w, h } = fitCanvas(canvas);
    if (!w || !h) return false;
    cols = Math.ceil(w / CELL);
    rows = Math.ceil(h / CELL);
    const off = document.createElement('canvas');
    off.width = cols;
    off.height = rows;
    const o = off.getContext('2d', { willReadFrequently: true });
    if (!o) return false;
    // Mismo encuadre que object-fit: cover + object-position del <img>.
    const scale = Math.max(cols / img.naturalWidth, rows / img.naturalHeight);
    const dw = img.naturalWidth * scale;
    const dh = img.naturalHeight * scale;
    const pos = getComputedStyle(img).objectPosition.split(' ').map((v) => parseFloat(v) / 100);
    o.drawImage(img, (cols - dw) * (pos[0] ?? 0.5), (rows - dh) * (pos[1] ?? 0.5), dw, dh);
    const data = o.getImageData(0, 0, cols, rows).data;
    const n = cols * rows;
    level = new Uint8Array(n);
    ox = new Float32Array(n);
    oy = new Float32Array(n);
    vx = new Float32Array(n);
    vy = new Float32Array(n);
    seed = new Float32Array(rows);
    for (let r = 0; r < rows; r++) seed[r] = Math.random();
    for (let i = 0; i < n; i++) {
      const a = data[i * 4 + 3];
      if (a < 90) {
        level[i] = 255;
        continue;
      }
      const lum = (0.2126 * data[i * 4] + 0.7152 * data[i * 4 + 1] + 0.0722 * data[i * 4 + 2]) / 255;
      // Un poco de contraste y un tramado ordenado 2×2 para que el degradado se sienta tejido.
      const dither = (((i % cols) + Math.floor(i / cols) * 2) % 4) / 4 - 0.375;
      const v = Math.min(1, Math.max(0, (lum - 0.52) * 1.5 + 0.5 + dither / LEVELS));
      level[i] = Math.min(LEVELS - 1, Math.floor(v * LEVELS));
    }
    const lists: number[][] = Array.from({ length: LEVELS }, () => []);
    for (let i = 0; i < n; i++) if (level[i] !== 255) lists[level[i]].push(i);
    buckets = lists.map((l) => Int32Array.from(l));
    rowDrift = new Float32Array(rows);
    rowFade = new Float32Array(rows);
    rowSkip = new Uint8Array(rows);
    return true;
  };

  const colors = () => {
    const deep = rgb(cssColor(root, '--p-deep'));
    const light = rgb(cssColor(root, '--p-light'));
    palette = Array.from({ length: LEVELS }, (_, i) => mix(deep, light, Math.pow(i / (LEVELS - 1), 0.9)));
  };

  const draw = () => {
    const { dpr } = fitCanvas(canvas);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    const size = CELL - 1;
    const shown = Math.ceil(rows * reveal);
    // Valores por fila (deriva, desvanecido, hilos que se sueltan) una vez por cuadro.
    for (let r = 0; r < rows; r++) {
      const dir = r % 2 === 0 ? 1 : -1;
      rowDrift[r] = unweave > 0 ? dir * unweave * unweave * (60 + seed[r] * 220) : 0;
      rowFade[r] = r >= shown ? 0 : unweave > 0 ? Math.max(0, 1 - unweave * (0.7 + seed[r] * 0.9)) : 1;
      rowSkip[r] = unweave > 0.05 ? 1 + Math.floor(unweave * seed[r] * 3) : 1;
    }
    const fading = unweave > 0;
    // Un fillStyle por nivel: muchas menos operaciones de estado que por celda.
    for (let l = 0; l < LEVELS; l++) {
      ctx.fillStyle = palette[l];
      const list = buckets[l];
      for (let k = 0; k < list.length; k++) {
        const i = list[k];
        const r = (i / cols) | 0;
        const fade = rowFade[r];
        if (fade <= 0) continue;
        const c = i - r * cols;
        if (rowSkip[r] > 1 && c % rowSkip[r] !== 0) continue;
        if (fading) ctx.globalAlpha = fade;
        ctx.fillRect(c * CELL + ox[i] + rowDrift[r], r * CELL + oy[i], size, size);
      }
    }
    ctx.globalAlpha = 1;
  };

  const step = () => {
    let energy = 0;
    if (reveal < 1) {
      reveal = Math.min(1, reveal + 0.024);
      energy = 1;
    }
    const n = cols * rows;
    const r2 = RADIUS * RADIUS;
    for (let i = 0; i < n; i++) {
      if (level[i] === 255) continue;
      if (pointerIn) {
        const cx = (i % cols) * CELL + ox[i];
        const cy = Math.floor(i / cols) * CELL + oy[i];
        const dx = cx - px;
        const dy = cy - py;
        const d2 = dx * dx + dy * dy;
        if (d2 < r2) {
          const d = Math.sqrt(d2) || 1;
          const force = (1 - d / RADIUS) * 2.4;
          vx[i] += (dx / d) * force;
          vy[i] += (dy / d) * force;
        }
      }
      // Muelle hacia el origen, con amortiguación.
      vx[i] = (vx[i] - ox[i] * 0.07) * 0.84;
      vy[i] = (vy[i] - oy[i] * 0.07) * 0.84;
      ox[i] += vx[i];
      oy[i] += vy[i];
      energy += Math.abs(vx[i]) + Math.abs(vy[i]);
    }
    draw();
    if (visible && (energy > 0.5 || pointerIn)) requestAnimationFrame(step);
    else running = false;
  };
  const kick = () => {
    if (running || !visible) return;
    running = true;
    requestAnimationFrame(step);
  };

  const build = () => {
    if (!sample()) return;
    colors();
    root.classList.add('is-live');
    if (reveal < 1) kick();
    else draw();
  };

  if (img.complete && img.naturalWidth) build();
  else img.addEventListener('load', build, { once: true });

  if (!reduced) {
    const field = canvas.parentElement ?? canvas;
    field.addEventListener('pointermove', (e) => {
      const b = canvas.getBoundingClientRect();
      px = e.clientX - b.left;
      py = e.clientY - b.top;
      pointerIn = true;
      kick();
    });
    const leave = () => {
      pointerIn = false;
    };
    field.addEventListener('pointerleave', leave);
    field.addEventListener('pointercancel', leave);
    setUnweaveImpl = (u) => {
      const next = Math.min(1, Math.max(0, u));
      if (Math.abs(next - unweave) < 0.004) return;
      unweave = next;
      if (!running && cols) draw();
    };
    new IntersectionObserver((entries) => {
      visible = entries[0]?.isIntersecting ?? true;
      if (visible && reveal < 1) kick();
    }).observe(canvas);
  }

  onWidthChange(build);
  onRepaint(() => {
    if (!cols) return;
    colors();
    draw();
  });
}
