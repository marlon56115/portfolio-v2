// Motivos del tejido en pixel art. Una sola fuente para las franjas (canvas, fx/weave.ts)
// y para los íconos del mapa (SVG en build, Pixel.astro). '#' = hilo, cualquier otra cosa = fondo.
// Las filas no necesitan el mismo ancho: `grid()` las rellena.

export type MotifKey = 'anil' | 'volcan' | 'torogoz' | 'izote' | 'greca' | 'olas';

const raw: Record<MotifKey, string[]> = {
  // Rombos del teñido con reserva: uno lleno, uno calado.
  anil: [
    '....#.........#.....',
    '...###.......#.#....',
    '..#####.....#.#.#...',
    '.#######...#.#.#.#..',
    '..#####.....#.#.#...',
    '...###.......#.#....',
    '....#.........#.....',
  ],
  // Greca escalonada y una pirámide de plataformas.
  greca: [
    '#######......#.....',
    '#.....#.....###....',
    '#.###.#.....###....',
    '#.#.#.#....#####...',
    '#.#...#....#####...',
    '#.#####...#######..',
    '#........#########.',
  ],
  // Oleaje: dos líneas de mar.
  olas: [
    '..##......##......',
    '.#..#....#..#....#',
    '#....####....####.',
    '..................',
    '..##......##......',
    '.#..#....#..#....#',
    '#....####....####.',
  ],
  // Dos conos; el mayor con fumarola.
  volcan: [
    '..........##..............',
    '.........#..#.............',
    '..........##..............',
    '..........................',
    '.........####.............',
    '........######............',
    '.......########.....##....',
    '......##########...####...',
    '.....############.######..',
    '....######################',
    '..########################',
  ],
  // Torogoz de perfil: pico a la izquierda, cola larga con dos "raquetas".
  torogoz: [
    '....####..............',
    '...######.............',
    '..###.####............',
    '####.######...........',
    '...#########..........',
    '....##########........',
    '.....########.#.......',
    '......######...#......',
    '......#..#......#.....',
    '.....##.##.......#.##.',
    '..................###.',
  ],
  // Flor de izote: espiga sobre hojas en punta.
  izote: [
    '.......#........',
    '......###.......',
    '.....#.#.#......',
    '......###.......',
    '.....#####......',
    '....#.###.#.....',
    '.....#####......',
    '..#...###...#...',
    '...#...#...#....',
    '....#..#..#.....',
    '.....#####......',
  ],
};

export interface Grid {
  w: number;
  h: number;
  rows: boolean[][];
}

export function grid(key: MotifKey): Grid {
  const src = raw[key];
  const w = Math.max(...src.map((r) => r.length));
  return { w, h: src.length, rows: src.map((r) => Array.from({ length: w }, (_, i) => r[i] === '#')) };
}

export const motifKeys = Object.keys(raw) as MotifKey[];
