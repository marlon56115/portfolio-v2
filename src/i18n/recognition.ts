// Reconocimientos: honores académicos y certificaciones.
// `date` es lo que se sabe (año); si no hay fecha, se deja vacío y la fila muestra una raya.

export interface Award {
  kind: 'award' | 'cert';
  date: string;
  title: string;
  issuer: string;
  result: string;
}

const es = {
  recognition: {
    title: 'Logros',
    filters: { all: 'Todo', award: 'Honores', cert: 'Certificaciones' },
    filterLabel: 'Filtrar logros',
    items: [
      { kind: 'award', date: '2023', title: 'Ingeniería de Sistemas Informáticos', issuer: 'Universidad de El Salvador', result: '1.º de la promoción' },
      { kind: 'award', date: '2017', title: 'Bachillerato Técnico en Infraestructura Tecnológica', issuer: 'CE INSA', result: '1.º de la promoción' },
      { kind: 'cert', date: '2024', title: 'Inglés, 20 niveles', issuer: 'Universidad de El Salvador', result: 'Nivel profesional' },
      { kind: 'cert', date: '2017', title: 'Programa Jóvenes Talento en TI', issuer: 'Universidad Francisco Gavidia', result: 'Programa' },
      { kind: 'cert', date: '', title: 'M121 · Aggregation Framework', issuer: 'MongoDB University', result: 'Certificado' },
      { kind: 'cert', date: '', title: 'M001 · MongoDB Basics', issuer: 'MongoDB University', result: 'Certificado' },
    ] as Award[],
  },
};

type Recognition = typeof es;

const en: Recognition = {
  recognition: {
    title: 'Recognition',
    filters: { all: 'All', award: 'Honors', cert: 'Certifications' },
    filterLabel: 'Filter recognition',
    items: [
      { kind: 'award', date: '2023', title: 'B.Sc. Computer Systems Engineering', issuer: 'Universidad de El Salvador', result: 'Top of class' },
      { kind: 'award', date: '2017', title: 'Technical High School, IT Infrastructure', issuer: 'CE INSA', result: 'Top of class' },
      { kind: 'cert', date: '2024', title: 'English, 20 levels', issuer: 'Universidad de El Salvador', result: 'Professional level' },
      { kind: 'cert', date: '2017', title: 'Young Talent IT Program', issuer: 'Universidad Francisco Gavidia', result: 'Program' },
      { kind: 'cert', date: '', title: 'M121 · Aggregation Framework', issuer: 'MongoDB University', result: 'Certificate' },
      { kind: 'cert', date: '', title: 'M001 · MongoDB Basics', issuer: 'MongoDB University', result: 'Certificate' },
    ],
  },
};

export const recognition = { es, en };
