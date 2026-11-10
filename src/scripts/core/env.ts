// Señales del entorno compartidas por los scripts.
export const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
export const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

/** Color resuelto de una propiedad CSS (acepta variables). */
export function cssColor(el: Element, prop = 'color'): string {
  return getComputedStyle(el).getPropertyValue(prop).trim();
}

/** Ajusta un canvas a su caja en píxeles de dispositivo. Devuelve tamaño CSS y dpr. */
export function fitCanvas(canvas: HTMLCanvasElement, maxDpr = 2): { w: number; h: number; dpr: number } {
  const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
  const w = canvas.clientWidth;
  const h = canvas.clientHeight;
  const pw = Math.max(1, Math.round(w * dpr));
  const ph = Math.max(1, Math.round(h * dpr));
  if (canvas.width !== pw || canvas.height !== ph) {
    canvas.width = pw;
    canvas.height = ph;
  }
  return { w, h, dpr };
}

/** Llama a `fn` cuando cambia el ancho de la ventana (no en cada resize vertical del móvil). */
export function onWidthChange(fn: () => void): void {
  let last = window.innerWidth;
  let t = 0;
  window.addEventListener('resize', () => {
    if (window.innerWidth === last) return;
    last = window.innerWidth;
    window.clearTimeout(t);
    t = window.setTimeout(fn, 150);
  });
}

/** Tema, tina o fuentes cambiaron: los canvas deben repintarse con los colores nuevos. */
export function onRepaint(fn: () => void): void {
  document.addEventListener('themechange', fn);
}
