// Nombre del footer dibujado con glifos de tejido: el texto se rasteriza con la fuente display a una
// rejilla y cada celda se pinta como una puntada horizontal o vertical (ligamento de tafetán).
// Al pasar el puntero (o el dedo), las celdas cercanas giran y se encienden, y luego se enfrían.
import { cssColor, fitCanvas, onRepaint, onWidthChange, reduced } from '../core/env';

export function initPixelName(): void {
  const canvas = document.querySelector<HTMLCanvasElement>('canvas[data-pixelname]');
  const ctx = canvas?.getContext('2d');
  if (!canvas || !ctx) return;
  const text = canvas.dataset.pixelname ?? '';

  let cols = 0;
  let rows = 0;
  let cell = 6;
  let on = new Uint8Array(0);
  let heat = new Float32Array(0);
  let reveal = reduced ? 1 : 0;
  let running = false;
  let seen = false;

  const build = () => {
    const { w, h } = fitCanvas(canvas);
    if (!w || !h) return;
    rows = w < 600 ? 14 : 24;
    cell = h / rows;
    cols = Math.floor(w / cell);
    const off = document.createElement('canvas');
    off.width = cols;
    off.height = rows;
    const o = off.getContext('2d', { willReadFrequently: true });
    if (!o) return;
    // Tamaño de fuente: que el texto llene el ancho o el alto, lo que llegue primero.
    let size = rows * 1.36;
    o.font = `600 ${size}px "Chakra Petch", sans-serif`;
    const tw = o.measureText(text).width;
    if (tw > cols) size *= cols / tw;
    o.font = `600 ${size}px "Chakra Petch", sans-serif`;
    o.textBaseline = 'alphabetic';
    o.fillStyle = '#000';
    o.fillText(text, 0, rows / 2 + size * 0.35);
    const data = o.getImageData(0, 0, cols, rows).data;
    on = new Uint8Array(cols * rows);
    heat = new Float32Array(cols * rows);
    for (let i = 0; i < on.length; i++) on[i] = data[i * 4 + 3] > 110 ? 1 : 0;
    draw();
  };

  const draw = () => {
    const { dpr } = fitCanvas(canvas);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    ctx.fillStyle = cssColor(canvas);
    const shown = Math.ceil(cols * reveal);
    const long = cell * 0.86;
    const thin = Math.max(1.2, cell * 0.36);
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < shown; c++) {
        const i = r * cols + c;
        if (!on[i]) continue;
        const hot = heat[i];
        const x = c * cell;
        const y = r * cell;
        // Tafetán: una puntada horizontal y la siguiente vertical. El calor invierte la puntada.
        const horizontal = ((c + r) % 2 === 0) !== hot > 0.45;
        if (hot > 0.75) ctx.fillRect(x, y, long, long);
        else if (horizontal) ctx.fillRect(x, y + (cell - thin) / 2, long, thin);
        else ctx.fillRect(x + (cell - thin) / 2, y, thin, long);
      }
    }
  };

  const step = () => {
    let energy = 0;
    if (reveal < 1 && seen) {
      reveal = Math.min(1, reveal + 0.03);
      energy = 1;
    }
    for (let i = 0; i < heat.length; i++) {
      if (heat[i] > 0.01) {
        heat[i] *= 0.955;
        energy += heat[i];
      } else heat[i] = 0;
    }
    draw();
    if (energy > 0.01) requestAnimationFrame(step);
    else running = false;
  };
  const kick = () => {
    if (running) return;
    running = true;
    requestAnimationFrame(step);
  };

  const warm = (e: PointerEvent) => {
    const b = canvas.getBoundingClientRect();
    const cx = (e.clientX - b.left) / cell;
    const cy = (e.clientY - b.top) / cell;
    const R = 4.2;
    for (let r = Math.max(0, Math.floor(cy - R)); r <= Math.min(rows - 1, Math.ceil(cy + R)); r++) {
      for (let c = Math.max(0, Math.floor(cx - R)); c <= Math.min(cols - 1, Math.ceil(cx + R)); c++) {
        const d = Math.hypot(c + 0.5 - cx, r + 0.5 - cy);
        if (d < R) heat[r * cols + c] = Math.max(heat[r * cols + c], 1 - d / R);
      }
    }
    kick();
  };

  // La rejilla depende de la fuente display: esperar a que cargue.
  const fonts = document.fonts;
  (fonts?.load ? fonts.load('600 48px "Chakra Petch"') : Promise.resolve()).then(build, build);

  if (!reduced) {
    canvas.addEventListener('pointermove', warm);
    canvas.addEventListener('pointerdown', warm);
  }
  new IntersectionObserver(
    (entries, io) => {
      if (!entries[0]?.isIntersecting) return;
      seen = true;
      io.disconnect();
      if (reveal < 1) kick();
    },
    { threshold: 0.3 },
  ).observe(canvas);

  onWidthChange(build);
  onRepaint(draw);
}
