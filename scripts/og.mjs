// Genera public/og.png (1200x630) para las vistas previas en redes, con la identidad "Tejido".
// Se ejecuta a mano: node scripts/og.mjs
// Las fuentes del SVG son del sistema (librsvg no carga woff2); el carácter lo dan el añil y la franja.
import sharp from 'sharp';

const W = 1200;
const H = 630;
const INDIGO = '#1c69e3';
const INK = '#111418';

// Pinstripe del fondo.
let pins = '';
for (let x = 0; x < W; x += 6) pins += `<rect x="${x}" width="1" height="${H}" fill="${INK}" fill-opacity="0.045"/>`;

// Franja de rombos (el motivo "anil" de src/lib/motifs.ts).
const tile = ['....#.........#.....', '...###.......#.#....', '..#####.....#.#.#...', '.#######...#.#.#.#..', '..#####.....#.#.#...', '...###.......#.#....', '....#.........#.....'];
const cell = 8;
let band = '';
for (let c = 0; c * cell < W; c++) {
  for (let r = 0; r < tile.length; r++) {
    if (tile[r][c % 22] === '#') band += `<rect x="${c * cell}" y="${500 + r * cell}" width="${cell - 1}" height="${cell - 1}" fill="${INDIGO}"/>`;
  }
}

const mono = "Menlo, 'SF Mono', 'DejaVu Sans Mono', monospace";
const sans = "'Helvetica Neue', Helvetica, Arial, sans-serif";
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <rect width="${W}" height="${H}" fill="#f4f5f7"/>${pins}
  <path d="M64 64h44l12 12v44H76l-12-12z" fill="${INDIGO}"/>
  <text x="92" y="100" text-anchor="middle" font-family="${mono}" font-size="18" font-weight="700" fill="#f9fafc">MG</text>
  <text x="140" y="99" font-family="${mono}" font-size="18" letter-spacing="3" fill="${INK}">MARLON GUERRA</text>
  <path d="M64 196h560l12 12v32H64z" fill="${INDIGO}"/>
  <text x="82" y="226" font-family="${mono}" font-size="20" letter-spacing="3" fill="#f9fafc">LEAD DEVOPS ENGINEER · EL SALVADOR</text>
  <text x="58" y="400" font-family="${sans}" font-size="124" font-weight="700" letter-spacing="-4" fill="${INK}">MARLON GUERRA</text>
  <rect x="0" y="488" width="${W}" height="4" fill="${INDIGO}"/>${band}
  <rect x="0" y="564" width="${W}" height="4" fill="${INDIGO}"/>
  <text x="64" y="604" font-family="${mono}" font-size="16" letter-spacing="3" fill="#62666e">CI/CD · KUBERNETES · IAC · AI AGENTS · SELF-HOSTED</text>
</svg>`;

await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile('public/og.png');
console.log('public/og.png');
