// Teñido entre secciones: en vez de un corte seco, el color de la sección que viene sube por las
// hebras de la anterior, como tela entrando en la tina. Cada hebra (columna de 6 px, la misma
// del pinstripe) absorbe a su ritmo. `set(p)` lo mueve el scroll (motion.ts).
import { fitCanvas, onRepaint, onWidthChange } from '../core/env';

const THREAD = 6;
const STEP = 4; // la altura sube a saltos de 4 px: borde de píxel, no degradado

export interface Dye {
  el: HTMLCanvasElement;
  set(p: number): void;
}

export function initDye(): Dye[] {
  return [...document.querySelectorAll<HTMLCanvasElement>('canvas[data-dye]')].map((el) => {
    const ctx = el.getContext('2d');
    const section = el.parentElement ?? el;
    let noise = new Float32Array(0);
    let p = 0;

    const draw = () => {
      if (!ctx) return;
      const { w, h, dpr } = fitCanvas(el, 1.5);
      if (!w || !h) return;
      const n = Math.ceil(w / THREAD);
      if (noise.length !== n) {
        noise = new Float32Array(n);
        // Ruido suave: hebras vecinas absorben parecido, con alguna que se adelanta.
        let v = Math.random();
        for (let i = 0; i < n; i++) {
          v += (Math.random() - 0.5) * 0.35;
          v = Math.min(1, Math.max(0, v));
          noise[i] = v * 0.7 + Math.random() * 0.3;
        }
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      if (p <= 0) return;
      ctx.fillStyle = getComputedStyle(section).getPropertyValue('--bg').trim() || '#1c69e3';
      for (let i = 0; i < n; i++) {
        const t = Math.min(1, Math.max(0, p * 1.45 - noise[i] * 0.45));
        const eased = t * t * (3 - 2 * t);
        const height = Math.ceil((eased * h) / STEP) * STEP;
        if (height <= 0) continue;
        const x = i * THREAD;
        ctx.fillRect(x, h - height, THREAD, height);
        // Frente del tinte: por encima de lo ya teñido, la hebra va tomando color a puntadas.
        if (height < h) {
          for (let k = 0; k < 5; k++) {
            if ((k + i) % 2 === 0) ctx.fillRect(x, h - height - (k + 1) * STEP, THREAD - (k > 2 ? 3 : 0), STEP);
          }
        }
      }
    };

    onWidthChange(draw);
    onRepaint(draw);
    return {
      el,
      set(next: number) {
        const v = Math.round(next * 200) / 200;
        if (v === p) return;
        p = v;
        draw();
      },
    };
  });
}
