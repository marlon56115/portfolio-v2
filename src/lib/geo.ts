// Contorno simplificado de El Salvador (lon, lat), en sentido horario desde la desembocadura del río Paz.
// Es un trazo estilizado para la sección "sobre mí", no cartografía.

const outline: [number, number][] = [
  [-90.13, 13.74], [-90.1, 13.86], [-89.98, 13.98], [-89.87, 14.05], [-89.72, 14.13], [-89.57, 14.2],
  [-89.52, 14.3], [-89.35, 14.42], [-89.2, 14.36], [-89.03, 14.33], [-88.96, 14.2], [-88.84, 14.12],
  [-88.72, 14.08], [-88.64, 14.0], [-88.5, 13.98], [-88.49, 13.86], [-88.35, 13.87], [-88.24, 13.95],
  [-88.14, 13.99], [-88.04, 13.96], [-87.9, 13.9], [-87.75, 13.83], [-87.71, 13.72], [-87.77, 13.59],
  [-87.8, 13.44], [-87.72, 13.4], [-87.82, 13.3], [-87.9, 13.16], [-88.1, 13.17], [-88.3, 13.16],
  [-88.48, 13.2], [-88.68, 13.24], [-88.82, 13.25], [-89.0, 13.33], [-89.18, 13.43], [-89.32, 13.48],
  [-89.6, 13.52], [-89.83, 13.59], [-90.0, 13.68],
];

const K = 300; // px por grado
const COS = Math.cos((13.8 * Math.PI) / 180);
const LON0 = -90.2;
const LAT0 = 14.5;

/** (lon, lat) → coordenadas del viewBox. */
export function project(lon: number, lat: number): [number, number] {
  return [Math.round((lon - LON0) * COS * K), Math.round((LAT0 - lat) * K)];
}

export const mapViewBox = `0 0 ${Math.round(2.55 * COS * K)} ${Math.round(1.42 * K)}`;
export const mapPath = `M${outline.map(([lon, lat]) => project(lon, lat).join(' ')).join('L')}Z`;
