// Contadores y textos que se "decodifican" al aparecer. Sin dependencias: IntersectionObserver + rAF.
import { reduced } from '../core/env';

const GLYPHS = '▚▞░▒#/\\+=01';

function count(el: HTMLElement): void {
  const target = Number(el.dataset.count);
  if (!Number.isFinite(target)) return;
  const width = (el.textContent ?? '').trim().length;
  const t0 = performance.now();
  const dur = 900;
  const step = (now: number) => {
    const t = Math.min(1, (now - t0) / dur);
    const v = Math.round(target * (1 - Math.pow(1 - t, 4)));
    el.textContent = String(v).padStart(width, '0');
    if (t < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

function decode(el: HTMLElement): void {
  const final = el.textContent ?? '';
  const t0 = performance.now();
  const dur = 550 + final.length * 8;
  const step = (now: number) => {
    const t = Math.min(1, (now - t0) / dur);
    const solved = Math.floor(final.length * t);
    let out = final.slice(0, solved);
    for (let i = solved; i < final.length; i++) out += final[i] === ' ' ? ' ' : GLYPHS[(i * 7 + Math.floor(now / 40)) % GLYPHS.length];
    el.textContent = t < 1 ? out : final;
    if (t < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

export function initText(): void {
  if (reduced) return;
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target as HTMLElement;
        io.unobserve(el);
        if (el.dataset.count !== undefined) count(el);
        else decode(el);
      });
    },
    { rootMargin: '0px 0px -10% 0px' },
  );
  document.querySelectorAll<HTMLElement>('[data-count], [data-decode]').forEach((el) => io.observe(el));
}
