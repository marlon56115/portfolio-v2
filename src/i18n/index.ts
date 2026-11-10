// Punto de entrada del texto: `dict[lang]` junta todos los archivos por sección.

import { common, careerStart, langs, type Lang } from './common';
import { hero } from './hero';
import { toolkit } from './toolkit';
import { projects, type Project } from './projects';
import { experience, type Job } from './experience';
import { recognition, type Award } from './recognition';
import { contact } from './contact';
import { weave } from './weave';

function build(lang: Lang) {
  return {
    ...common[lang],
    ...hero[lang],
    ...toolkit[lang],
    ...projects[lang],
    ...experience[lang],
    ...recognition[lang],
    ...contact[lang],
    ...weave[lang],
  };
}

export type Dict = ReturnType<typeof build>;
export const dict: Record<Lang, Dict> = { es: build('es'), en: build('en') };

export { careerStart, langs };
export type { Lang, Job, Project, Award };
