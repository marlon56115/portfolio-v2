// Franjas de tejido: cada <canvas data-weave="motivo"> repite su mapa de bits a lo ancho y se
// teje fila por fila al entrar en pantalla, alternando el sentido como una lanzadera.
// El color sale de `color` (CSS), así la misma franja sirve sobre claro, añil o noche.
import { grid, type MotifKey } from '../../lib/motifs';
import { cssColor, fitCanvas, onRepaint, onWidthChange, reduced } from '../core/env';

interface Band {
  canvas: HTMLCanvasElement;
  key: MotifKey;
  p: number; // 0 = sin tejer, 1 = completa
  started: boolean;
}

const PAD = 1; // filas de aire arriba y abajo del motivo
const DURATION = 1100;

function draw(band: Band): void {
  const { canvas, key, p } = band;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const { w, h, dpr } = fitCanvas(canvas);
  if (!w || !h) return;
  const g = grid(key);
  const rows = g.h + PAD * 2;
  const cell = Math.max(1, Math.floor((h * dpr) / rows));
  const top = Math.floor((h * dpr - cell * rows) / 2);
  const cols = Math.ceil((w * dpr) / cell);
  const gap = cell >= 4 ? Math.max(1, Math.round(cell * 0.16)) : 0;
  const tile = g.w + 2; // dos columnas de aire entre repeticiones

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const color = cssColor(canvas);
  ctx.fillStyle = color;

  for (let r = 0; r < rows; r++) {
    // Cada fila empieza un poco después que la anterior y avanza en sentido contrario.
    const f = Math.min(1, Math.max(0, p * (rows * 0.45 + 1) - r * 0.45));
    if (f <= 0) continue;
    const from = r % 2 === 0 ? 0 : Math.floor(cols * (1 - f));
    const to = r % 2 === 0 ? Math.ceil(cols * f) : cols;
    const y = top + r * cell;
    const mr = r - PAD;
    for (let c = from; c < to; c++) {
      const on = mr >= 0 && mr < g.h && g.rows[mr][c % tile] === true;
      if (on) {
        ctx.globalAlpha = 1;
        ctx.fillRect(c * cell, y, cell - gap, cell - gap);
      } else if (cell >= 4 && (c + r) % 2 === 0) {
        // Urdimbre: una puntada tenue en damero.
        ctx.globalAlpha = 0.2;
        ctx.fillRect(c * cell + gap, y + Math.floor(cell * 0.4), cell - gap * 2, Math.max(1, Math.round(cell * 0.2)));
      }
    }
  }
  ctx.globalAlpha = 1;
}

function weaveIn(band: Band): void {
  if (band.started) return;
  band.started = true;
  if (reduced) {
    band.p = 1;
    draw(band);
    return;
  }
  const t0 = performance.now();
  const step = (now: number) => {
    const t = Math.min(1, (now - t0) / DURATION);
    band.p = 1 - Math.pow(1 - t, 3);
    draw(band);
    if (t < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

export function initWeave(): void {
  const bands: Band[] = [...document.querySelectorAll<HTMLCanvasElement>('canvas[data-weave]')].map((canvas) => ({
    canvas,
    key: canvas.dataset.weave as MotifKey,
    p: 0,
    started: false,
  }));
  if (!bands.length) return;

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const band = bands.find((b) => b.canvas === e.target);
        if (band) weaveIn(band);
        io.unobserve(e.target);
      });
    },
    { rootMargin: '0px 0px -8% 0px' },
  );
  bands.forEach((b) => io.observe(b.canvas));

  const repaint = () => bands.forEach((b) => b.started && draw(b));
  onWidthChange(repaint);
  onRepaint(repaint);
}
