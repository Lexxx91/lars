/**
 * subdimensions.ts — Subdimensiones y preguntas inline (Día 14)
 *
 * Cada dimensión tiene 2-3 subdimensiones con 2 preguntas de opción múltiple.
 * Las respuestas generan scores de subdimensión que se muestran en el mapa.
 */

import type { DimensionKey } from '@/lib/insights'

// ─── TIPOS ────────────────────────────────────────────────────────────────────

export interface SubdimensionDef {
  key: string
  name: string
}

export interface SubdimensionOption {
  key: string
  label: string
  /** Valor de 0 a 100 que contribuye al score de la subdimensión */
  value: number
}

export interface SubdimensionQuestion {
  id: string
  text: string
  /** Qué subdimensión(es) afecta */
  affectsSubdimension: string
  options: SubdimensionOption[]
}

export interface SubdimensionConfig {
  dimensionKey: DimensionKey
  dimensionName: string
  intro: string
  subdimensions: SubdimensionDef[]
  questions: SubdimensionQuestion[]
}

// ─── CONFIGURACIONES POR DIMENSIÓN ──────────────────────────────────────────

const SUBDIMENSION_CONFIGS: Record<DimensionKey, SubdimensionConfig> = {
  d1: {
    dimensionKey: 'd1',
    dimensionName: 'Regulación Nerviosa',
    intro: 'Tu regulación nerviosa tiene 3 subdimensiones que no pudimos calcular con tu análisis original:',
    subdimensions: [
      { key: 'd1_activation', name: 'Activación diurna' },
      { key: 'd1_recovery', name: 'Recuperación nocturna' },
      { key: 'd1_stress', name: 'Respuesta al estrés agudo' },
    ],
    questions: [
      {
        id: 'd1_q1',
        text: 'Cuando terminas tu jornada laboral, ¿cuánto tiempo tardas en "desconectar" mentalmente?',
        affectsSubdimension: 'd1_activation',
        options: [
          { key: 'A', label: 'No desconecto — sigo pensando en el trabajo hasta dormirme', value: 15 },
          { key: 'B', label: '2-3 horas, pero con esfuerzo consciente', value: 40 },
          { key: 'C', label: 'Unos 30-60 minutos', value: 65 },
          { key: 'D', label: 'Puedo desconectar relativamente rápido', value: 85 },
        ],
      },
      {
        id: 'd1_q2',
        text: 'Ante un imprevisto importante (un email urgente, una crisis en el equipo), ¿qué nota tu cuerpo primero?',
        affectsSubdimension: 'd1_stress',
        options: [
          { key: 'A', label: 'Taquicardia, opresión en el pecho, dificultad para respirar', value: 15 },
          { key: 'B', label: 'Tensión muscular intensa (mandíbula, hombros, estómago)', value: 35 },
          { key: 'C', label: 'Aceleración mental pero sin sensaciones físicas intensas', value: 55 },
          { key: 'D', label: 'Alerta pero sin reacción corporal desproporcionada', value: 80 },
        ],
      },
    ],
  },
  d2: {
    dimensionKey: 'd2',
    dimensionName: 'Calidad de Sueño',
    intro: 'Tu calidad de sueño tiene 3 subdimensiones que revelan dónde exactamente se rompe tu descanso:',
    subdimensions: [
      { key: 'd2_onset', name: 'Conciliación' },
      { key: 'd2_maintenance', name: 'Mantenimiento' },
      { key: 'd2_restorative', name: 'Calidad restaurativa' },
    ],
    questions: [
      {
        id: 'd2_q1',
        text: '¿Qué haces habitualmente en la última hora antes de dormir?',
        affectsSubdimension: 'd2_onset',
        options: [
          { key: 'A', label: 'Trabajo, emails o pantallas hasta el último minuto', value: 15 },
          { key: 'B', label: 'Intento desconectar pero acabo mirando el móvil', value: 35 },
          { key: 'C', label: 'Tengo una rutina de desconexión pero no siempre la cumplo', value: 60 },
          { key: 'D', label: 'Tengo una rutina de desconexión que respeto consistentemente', value: 85 },
        ],
      },
      {
        id: 'd2_q2',
        text: '¿Cómo te sientes los primeros 30 minutos después de despertar?',
        affectsSubdimension: 'd2_restorative',
        options: [
          { key: 'A', label: 'Como si no hubiera dormido — agotamiento profundo', value: 10 },
          { key: 'B', label: 'Pesadez, necesito cafeína para funcionar', value: 35 },
          { key: 'C', label: 'Algo de lentitud pero funcional en 15-20 minutos', value: 60 },
          { key: 'D', label: 'Descansado y con energía clara', value: 85 },
        ],
      },
    ],
  },
  d3: {
    dimensionKey: 'd3',
    dimensionName: 'Claridad Cognitiva',
    intro: 'Tu claridad cognitiva tiene 3 subdimensiones que explican dónde exactamente se nubla tu mente:',
    subdimensions: [
      { key: 'd3_focus', name: 'Foco sostenido' },
      { key: 'd3_decisions', name: 'Capacidad de decisión' },
      { key: 'd3_memory', name: 'Memoria operativa' },
    ],
    questions: [
      {
        id: 'd3_q1',
        text: 'Después de una reunión intensa o una tarea que requiere mucha concentración, ¿cómo responde tu mente?',
        affectsSubdimension: 'd3_focus',
        options: [
          { key: 'A', label: 'Quedo completamente agotado — no puedo hacer nada más exigente ese día', value: 15 },
          { key: 'B', label: 'Necesito al menos 1-2 horas para volver a pensar con claridad', value: 35 },
          { key: 'C', label: 'Unos 20-30 minutos de pausa y puedo retomar', value: 65 },
          { key: 'D', label: 'Me recupero rápido y puedo encadenar tareas exigentes', value: 85 },
        ],
      },
      {
        id: 'd3_q2',
        text: '¿Cuándo fue la última vez que tuviste una idea creativa o una solución inesperada a un problema?',
        affectsSubdimension: 'd3_decisions',
        options: [
          { key: 'A', label: 'No lo recuerdo — mi mente solo ejecuta, no crea', value: 15 },
          { key: 'B', label: 'Hace semanas o meses — antes me pasaba más', value: 35 },
          { key: 'C', label: 'De vez en cuando, normalmente cuando estoy relajado', value: 60 },
          { key: 'D', label: 'Con frecuencia — mi mente conecta ideas con facilidad', value: 85 },
        ],
      },
    ],
  },
  d4: {
    dimensionKey: 'd4',
    dimensionName: 'Equilibrio Emocional',
    intro: 'Tu equilibrio emocional tiene 3 subdimensiones que revelan el patrón exacto de tu desregulación:',
    subdimensions: [
      { key: 'd4_reactivity', name: 'Reactividad' },
      { key: 'd4_recovery', name: 'Tiempo de recuperación' },
      { key: 'd4_range', name: 'Rango emocional' },
    ],
    questions: [
      {
        id: 'd4_q1',
        text: '¿Puedes identificar qué emoción concreta estás sintiendo mientras la sientes?',
        affectsSubdimension: 'd4_reactivity',
        options: [
          { key: 'A', label: 'Normalmente solo noto "malestar general" sin poder especificar', value: 15 },
          { key: 'B', label: 'A veces, pero suelo darme cuenta después — no en tiempo real', value: 35 },
          { key: 'C', label: 'Casi siempre puedo nombrar lo que siento en el momento', value: 65 },
          { key: 'D', label: 'Sí, y eso me ayuda a gestionarla antes de que escale', value: 85 },
        ],
      },
      {
        id: 'd4_q2',
        text: 'Después de un conflicto o una situación emocionalmente intensa, ¿cuánto tardas en volver a tu estado normal?',
        affectsSubdimension: 'd4_range',
        options: [
          { key: 'A', label: 'Horas o incluso días — la emoción me secuestra', value: 10 },
          { key: 'B', label: 'Varias horas, con pensamientos repetitivos sobre lo ocurrido', value: 35 },
          { key: 'C', label: 'Una hora aproximadamente, aunque me queda algo de tensión residual', value: 60 },
          { key: 'D', label: 'Relativamente rápido — proceso y sigo adelante', value: 85 },
        ],
      },
    ],
  },
  d5: {
    dimensionKey: 'd5',
    dimensionName: 'Alegría de Vivir',
    intro: 'Tu alegría de vivir tiene 3 subdimensiones que revelan qué capa necesita restaurarse primero:',
    subdimensions: [
      { key: 'd5_pleasure', name: 'Capacidad de placer' },
      { key: 'd5_meaning', name: 'Sentido de propósito' },
      { key: 'd5_connection', name: 'Conexión con otros' },
    ],
    questions: [
      {
        id: 'd5_q1',
        text: 'Cuando piensas en los próximos 6 meses de tu vida, ¿qué sientes?',
        affectsSubdimension: 'd5_pleasure',
        options: [
          { key: 'A', label: 'Agotamiento anticipado — más de lo mismo o peor', value: 10 },
          { key: 'B', label: 'Incertidumbre y algo de temor', value: 35 },
          { key: 'C', label: 'Neutro — ni ilusión ni temor particular', value: 55 },
          { key: 'D', label: 'Curiosidad o ilusión por algo concreto', value: 85 },
        ],
      },
      {
        id: 'd5_q2',
        text: '¿Qué describe mejor tu relación actual con las personas cercanas?',
        affectsSubdimension: 'd5_connection',
        options: [
          { key: 'A', label: 'Aislamiento — no tengo energía para nadie', value: 10 },
          { key: 'B', label: 'Cumplo pero sin disfrutar — es una obligación más', value: 35 },
          { key: 'C', label: 'Disfruto a veces pero me cuesta iniciar el contacto', value: 60 },
          { key: 'D', label: 'Mantengo conexiones que me nutren', value: 85 },
        ],
      },
    ],
  },
}

// ─── FUNCIONES PÚBLICAS ──────────────────────────────────────────────────────

/** Obtiene la configuración de subdimensiones para una dimensión */
export function getSubdimensionConfig(
  dimensionKey: DimensionKey,
): SubdimensionConfig {
  return SUBDIMENSION_CONFIGS[dimensionKey]
}

/** Calcula scores de subdimensiones a partir de las respuestas */
export function computeSubdimensionScores(
  config: SubdimensionConfig,
  responses: Record<string, string>,
): Record<string, number> {
  const scores: Record<string, number> = {}

  // Inicializar subdimensiones
  for (const sub of config.subdimensions) {
    scores[sub.key] = 50 // default si no hay pregunta directa
  }

  // Calcular desde las respuestas
  for (const q of config.questions) {
    const answer = responses[q.id]
    if (!answer) continue

    const option = q.options.find((o) => o.key === answer)
    if (!option) continue

    scores[q.affectsSubdimension] = option.value
  }

  // La tercera subdimensión (sin pregunta directa) se infiere
  // como promedio de las otras dos
  const answeredKeys = config.questions.map((q) => q.affectsSubdimension)
  const unansweredSubs = config.subdimensions.filter(
    (s) => !answeredKeys.includes(s.key),
  )
  if (unansweredSubs.length > 0) {
    const answeredScores = answeredKeys.map((k) => scores[k])
    const avg = Math.round(
      answeredScores.reduce((a, b) => a + b, 0) / answeredScores.length,
    )
    for (const sub of unansweredSubs) {
      scores[sub.key] = avg
    }
  }

  return scores
}
