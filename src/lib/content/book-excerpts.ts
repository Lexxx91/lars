/**
 * book-excerpts.ts — Extractos del libro por dimensión (Día 21)
 *
 * Cada dimensión se mapea a un capítulo del libro de Javier:
 * "Burnout: El Renacimiento del Líder Fénix" (Vol 1-3)
 *
 * PLACEHOLDER: los extractos reales se sustituirán cuando Javier
 * proporcione los textos. La estructura está lista.
 */

import type { DimensionKey } from '@/lib/insights'

export interface BookExcerptData {
  dimensionKey: DimensionKey
  chapterNumber: number
  chapterTitle: string
  bookTitle: string
  /** Extracto de 500-800 palabras */
  excerpt: string
  /** Link al libro completo (N1 cascada) */
  bookLink: string
}

const BOOK_EXCERPTS: Record<DimensionKey, BookExcerptData> = {
  d1: {
    dimensionKey: 'd1',
    chapterNumber: 2,
    chapterTitle: 'El sistema nervioso que no se apaga',
    bookTitle: 'Burnout: El Renacimiento del Líder Fénix',
    excerpt: `[PLACEHOLDER — Javier proporcionará el extracto real del capítulo sobre regulación nerviosa]

Este extracto explicará cómo el sistema nervioso autónomo se queda atrapado en modo simpático cuando la persona ha estado bajo estrés crónico, y por qué las soluciones habituales (vacaciones, ejercicio intenso, meditación forzada) no funcionan cuando el eje HPA está desregulado.

El contenido cubrirá: la neurocepción de Porges, la ventana de tolerancia, y por qué el primer paso siempre es el sueño — no porque sea lo más importante, sino porque es lo que el cuerpo puede cambiar más rápido.`,
    bookLink: '#', // Se actualizará con el link real
  },
  d2: {
    dimensionKey: 'd2',
    chapterNumber: 3,
    chapterTitle: 'El sueño como campo de batalla',
    bookTitle: 'Burnout: El Renacimiento del Líder Fénix',
    excerpt: `[PLACEHOLDER — Javier proporcionará el extracto real del capítulo sobre sueño]

Este extracto explicará por qué el sueño es la primera dimensión que se compromete y la primera que se puede recuperar. Cubrirá la arquitectura del sueño profundo (NREM3/4), la relación entre cortisol nocturno y despertares, y por qué el Protocolo de Sueño de Emergencia funciona en 72 horas.

El contenido incluirá datos sobre la relación entre melatonina, GABA y la ventana de tolerancia del sistema nervioso.`,
    bookLink: '#',
  },
  d3: {
    dimensionKey: 'd3',
    chapterNumber: 5,
    chapterTitle: 'Cuando la mente se nubla',
    bookTitle: 'Burnout: El Renacimiento del Líder Fénix',
    excerpt: `[PLACEHOLDER — Javier proporcionará el extracto real del capítulo sobre claridad cognitiva]

Este extracto explicará el mecanismo neurológico detrás de la "niebla mental" del burnout: cómo el cortisol crónico reduce la neuroplasticidad del hipocampo, afecta la memoria operativa y la capacidad de decisión. Y por qué la claridad vuelve como un "click" entre la semana 2 y 3 — no gradualmente.

El contenido cubrirá la conexión entre el sueño profundo, la consolidación de memoria y la restauración del prefrontal.`,
    bookLink: '#',
  },
  d4: {
    dimensionKey: 'd4',
    chapterNumber: 7,
    chapterTitle: 'Emociones bajo asedio',
    bookTitle: 'Burnout: El Renacimiento del Líder Fénix',
    excerpt: `[PLACEHOLDER — Javier proporcionará el extracto real del capítulo sobre equilibrio emocional]

Este extracto explicará por qué la reactividad emocional en burnout no es un problema de "gestión emocional" sino un síntoma de un sistema nervioso sobrecargado. Cubrirá cómo la amígdala secuestra la respuesta cuando el prefrontal está agotado, y por qué la regulación nerviosa (D1) es prerequisito para el equilibrio emocional.

El contenido mostrará datos de cómo personas con patrones similares recuperan la regulación emocional cuando las capas fisiológicas se restauran primero.`,
    bookLink: '#',
  },
  d5: {
    dimensionKey: 'd5',
    chapterNumber: 9,
    chapterTitle: 'La chispa que no desapareció',
    bookTitle: 'Burnout: El Renacimiento del Líder Fénix',
    excerpt: `[PLACEHOLDER — Javier proporcionará el extracto real del capítulo sobre alegría de vivir]

Este extracto explicará la diferencia entre anhedonia (incapacidad de sentir placer) como síntoma neurológico del burnout y la pérdida de motivación como respuesta adaptativa. Cubrirá el papel de la dopamina, la serotonina y la oxitocina en la recuperación del disfrute, y por qué "forzar" actividades placenteras no funciona cuando las capas inferiores están comprometidas.

El contenido incluirá el modelo de tres capas de necesidad y por qué la alegría se desbloquea — no se entrena.`,
    bookLink: '#',
  },
}

/** Obtiene el extracto del libro para la dimensión más comprometida */
export function getBookExcerpt(
  worstDimension: DimensionKey,
): BookExcerptData {
  return BOOK_EXCERPTS[worstDimension]
}
