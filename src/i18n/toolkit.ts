// Toolkit: una fila por disciplina. `f` (frentes) y `alias` se conservan como metadatos de cada herramienta.
// Los logos salen de src/lib/icons.ts por nombre; si no hay logo, el chip muestra un monograma.

export type Front = 'dev' | 'deploy' | 'infra' | 'data' | 'ai';
export interface Tool {
  n: string;
  f: Front[];
  alias?: string[]; // otros nombres con que aparece en el stack de un puesto o proyecto
}
interface Group {
  k: string;
  t: string;
  items: Tool[];
}

const D: Front[] = ['dev'];
const DB: Front[] = ['data'];
const AI: Front[] = ['ai'];
const OPS: Front[] = ['infra', 'deploy'];

// Herramientas independientes del idioma (las de IA se traducen abajo).
const languages: Tool[] = [
  { n: 'Java', f: D },
  { n: 'TypeScript', f: D },
  { n: 'JavaScript', f: D },
  { n: 'PHP', f: D },
  { n: 'Python', f: D },
  { n: 'C#', f: D },
  { n: 'SQL', f: ['dev', 'data'] },
  { n: 'Bash', f: OPS },
];
const backend: Tool[] = [
  { n: 'Spring Boot', f: D },
  { n: 'Node.js', f: D },
  { n: 'NestJS', f: D },
  { n: 'Express', f: D },
  { n: 'Laravel', f: D },
  { n: 'ASP.NET Core', f: D },
  { n: 'Jakarta EE', f: D },
];
const frontend: Tool[] = [
  { n: 'Vue.js', f: D },
  { n: 'React', f: D },
  { n: 'Next.js', f: D },
  { n: 'Angular', f: D },
  { n: 'Quasar', f: D },
  { n: 'Astro', f: D },
];
const data: Tool[] = [
  { n: 'PostgreSQL', f: DB },
  { n: 'Oracle · PL/SQL', f: ['data', 'dev'], alias: ['Oracle', 'PL/SQL'] },
  { n: 'MySQL', f: DB },
  { n: 'MariaDB', f: DB },
  { n: 'SQL Server', f: DB },
  { n: 'MongoDB', f: DB },
  { n: 'Firebase', f: DB },
  { n: 'Drizzle ORM', f: ['data', 'dev'], alias: ['Drizzle'] },
];
const infra: Tool[] = [
  { n: 'Kubernetes', f: OPS },
  { n: 'Docker', f: OPS },
  { n: 'Podman', f: OPS },
  { n: 'Linux · RHEL', f: ['infra'] },
  { n: 'Nginx', f: OPS },
  { n: 'WildFly · JBoss', f: OPS, alias: ['WildFly', 'JBoss'] },
  { n: 'Tomcat', f: OPS },
  { n: 'Prometheus', f: ['infra'] },
];
const delivery: Tool[] = [
  { n: 'GCP', f: OPS },
  { n: 'AWS', f: OPS },
  { n: 'CI/CD', f: ['deploy'] },
  { n: 'GitHub Actions', f: ['deploy'] },
  { n: 'GitLab CI', f: ['deploy'], alias: ['GitLab'] },
  { n: 'Azure DevOps', f: ['deploy'] },
  { n: 'GitOps', f: OPS },
  { n: 'OpenTofu', f: OPS },
  { n: 'Ansible', f: OPS },
];
const quality: Tool[] = [
  { n: 'Vitest', f: ['dev', 'deploy'] },
  { n: 'Playwright', f: ['dev', 'deploy'] },
  { n: 'axe · WCAG', f: D },
];


const es = {
  toolkit: {
    title: 'Stack',
    tools: 'herramientas',
    disciplines: 'disciplinas',
    groups: [
      { k: 'languages', t: 'Lenguajes', items: languages },
      { k: 'backend', t: 'Backend', items: backend },
      { k: 'frontend', t: 'Frontend', items: frontend },
      { k: 'data', t: 'Datos', items: data },
      {
        k: 'ai',
        t: 'IA aplicada',
        items: [
          { n: 'Agentes de IA', f: ['ai', 'dev'] },
          { n: 'Integración de LLMs', f: ['ai', 'dev'] },
          { n: 'Automatización de flujos', f: ['ai', 'deploy'] },
          { n: 'IA multimodal', f: AI },
          { n: 'Google Gemini', f: AI, alias: ['Gemini'] },
          { n: 'Diseño de prompts', f: AI },
        ],
      },
      { k: 'infra', t: 'Infraestructura', items: infra },
      { k: 'cloud', t: 'Nube y entrega', items: delivery },
      { k: 'quality', t: 'Pruebas', items: quality },
    ] as Group[],
  },
};

type Toolkit = typeof es;

const en: Toolkit = {
  toolkit: {
    title: 'Toolkit',
    tools: 'tools',
    disciplines: 'disciplines',
    groups: [
      { k: 'languages', t: 'Languages', items: languages },
      { k: 'backend', t: 'Backend', items: backend },
      { k: 'frontend', t: 'Frontend', items: frontend },
      { k: 'data', t: 'Data', items: data },
      {
        k: 'ai',
        t: 'Applied AI',
        items: [
          { n: 'AI agents', f: ['ai', 'dev'] },
          { n: 'LLM integrations', f: ['ai', 'dev'] },
          { n: 'Workflow automation', f: ['ai', 'deploy'] },
          { n: 'Multimodal AI', f: AI },
          { n: 'Google Gemini', f: AI, alias: ['Gemini'] },
          { n: 'Prompt design', f: AI },
        ],
      },
      { k: 'infra', t: 'Infrastructure', items: infra },
      { k: 'cloud', t: 'Cloud & delivery', items: delivery },
      { k: 'quality', t: 'Testing', items: quality },
    ] as Group[],
  },
};

export const toolkit = { es, en };
