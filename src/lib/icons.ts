// Logos del toolkit: nombre de la herramienta (i18n/toolkit.ts) → ícono de simple-icons (CC0).
// Solo se usa al construir: el SVG queda en el HTML y el paquete no llega al navegador.
// Sin logo disponible → `null` y el chip muestra un monograma.
import * as si from 'simple-icons';

const slugs: Record<string, string> = {
  Java: 'openjdk',
  TypeScript: 'typescript',
  JavaScript: 'javascript',
  PHP: 'php',
  Python: 'python',
  'C#': 'dotnet',
  Bash: 'gnubash',
  'Spring Boot': 'springboot',
  'Node.js': 'nodedotjs',
  NestJS: 'nestjs',
  Express: 'express',
  Laravel: 'laravel',
  'ASP.NET Core': 'dotnet',
  'Vue.js': 'vuedotjs',
  React: 'react',
  'Next.js': 'nextdotjs',
  Angular: 'angular',
  Quasar: 'quasar',
  Astro: 'astro',
  PostgreSQL: 'postgresql',
  MySQL: 'mysql',
  MariaDB: 'mariadb',
  MongoDB: 'mongodb',
  Firebase: 'firebase',
  'Drizzle ORM': 'drizzle',
  Kubernetes: 'kubernetes',
  Docker: 'docker',
  Podman: 'podman',
  'Linux · RHEL': 'linux',
  Nginx: 'nginx',
  Tomcat: 'apachetomcat',
  Prometheus: 'prometheus',
  GCP: 'googlecloud',
  'GitHub Actions': 'githubactions',
  'GitLab CI': 'gitlab',
  GitOps: 'argo',
  OpenTofu: 'opentofu',
  Ansible: 'ansible',
  Vitest: 'vitest',
  'Google Gemini': 'googlegemini',
};

export interface Icon {
  path: string;
  hex: string;
}

const all = si as unknown as Record<string, { slug: string; path: string; hex: string }>;
const bySlug = new Map(Object.values(all).filter((i) => i && i.slug).map((i) => [i.slug, i]));

/** Colores de marca demasiado claros para un chip blanco: se oscurecen a tinta. */
const tooLight = new Set(['F7DF1E', 'C5F74F', 'FCC624', 'F8DC75', 'FFDA18', '00FF74', '61DAFB']);

export function icon(name: string): Icon | null {
  const found = bySlug.get(slugs[name] ?? '');
  if (!found) return null;
  return { path: found.path, hex: tooLight.has(found.hex) ? '111418' : found.hex };
}

/** Monograma de dos letras para herramientas sin logo: "SQL Server" → "SS", "AWS" → "AW". */
export function monogram(name: string): string {
  const words = name.replace(/[·/.]/g, ' ').split(/\s+/).filter(Boolean);
  const m = words.length > 1 ? words[0][0] + words[1][0] : name.slice(0, 2);
  return m.toUpperCase();
}
