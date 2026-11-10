// Pies de las franjas de tejido: TEJIDO DE “<palabra>” · <significado>.
// Discretos a propósito: una palabra y una línea, nada más.
import type { MotifKey } from '../lib/motifs';

type Captions = Record<MotifKey, { word: string; meaning: string }>;

const es = {
  weave: {
    from: 'Tejido de',
    captions: {
      anil: { word: 'añil', meaning: 'el azul que se saca de una hoja verde' },
      greca: { word: 'greca', meaning: 'un patrón que se repite sin romperse' },
      volcan: { word: 'volcán', meaning: 'capas sobre capas, como una plataforma' },
      torogoz: { word: 'torogoz', meaning: 'el ave que no vive en jaula' },
      izote: { word: 'izote', meaning: 'florece hasta en tierra dura' },
      olas: { word: 'olas', meaning: 'el Pacífico, a 60 km de aquí' },
    } as Captions,
    closing: 'Ada Lovelace vio el código como un tejido. Este se hila en Santa Ana.',
  },
};

type Weave = typeof es;

const en: Weave = {
  weave: {
    from: 'Woven from',
    captions: {
      anil: { word: 'añil', meaning: 'indigo, the blue drawn from a green leaf' },
      greca: { word: 'greca', meaning: 'a fret that repeats without breaking' },
      volcan: { word: 'volcán', meaning: 'layers on layers, like a platform' },
      torogoz: { word: 'torogoz', meaning: 'the bird that won’t live in a cage' },
      izote: { word: 'izote', meaning: 'it blooms even in hard ground' },
      olas: { word: 'olas', meaning: 'the Pacific, 60 km from here' },
    },
    closing: 'Ada Lovelace saw code as weaving. This one is spun in Santa Ana.',
  },
};

export const weave = { es, en };
