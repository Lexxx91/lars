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
    intro: 'Tu regulación nerviosa tiene 3 subdimensiones que no pudimos calcular con tu diagnóstico original:',
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
        text: '¿Qué describe mejor tu patrón al irte a dormir?',
        affectsSubdimension: 'd2_onset',
        options: [
          { key: 'A', label: 'Tardo más de 45 minutos con la mente acelerada', value: 15 },
          { key: 'B', label: 'Tardo 20-45 minutos, a veces con pensamientos intrusivos', value: 40 },
          { key: 'C', label: 'Me duermo en 10-20 minutos la mayoría de noches', value: 70 },
          { key: 'D', label: 'Me duermo casi al acostarme', value: 90 },
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
        text: '¿Cuánto tiempo puedes mantener el foco en una tarea compleja sin distraerte?',
        affectsSubdimension: 'd3_focus',
        options: [
          { key: 'A', label: 'Menos de 10 minutos — la mente salta constantemente', value: 15 },
          { key: 'B', label: '15-25 minutos con esfuerzo', value: 40 },
          { key: 'C', label: '30-45 minutos la mayoría de veces', value: 65 },
          { key: 'D', label: 'Puedo mantener foco profundo cuando lo necesito', value: 85 },
        ],
      },
      {
        id: 'd3_q2',
        text: 'Ante una decisión importante, ¿qué patrón reconoces?',
        affectsSubdimension: 'd3_decisions',
        options: [
          { key: 'A', label: 'Parálisis total — no puedo decidir y pospongo todo', value: 15 },
          { key: 'B', label: 'Decido pero luego rumiación sobre si fue correcto', value: 35 },
          { key: 'C', label: 'Me cuesta más que antes pero consigo decidir', value: 60 },
          { key: 'D', label: 'Decido con claridad razonable', value: 80 },
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
        text: 'Cuando algo te frustra en el trabajo, ¿cómo sueles reaccionar?',
        affectsSubdimension: 'd4_reactivity',
        options: [
          { key: 'A', label: 'Explosión inmediata o implosión con rumiación intensa', value: 15 },
          { key: 'B', label: 'Irritabilidad contenida que dura horas', value: 35 },
          { key: 'C', label: 'Molestia moderada que proceso en poco tiempo', value: 65 },
          { key: 'D', label: 'Lo gestiono sin que me desestabilice significativamente', value: 85 },
        ],
      },
      {
        id: 'd4_q2',
        text: '¿Cuántas emociones distintas recuerdas haber sentido en la última semana?',
        affectsSubdimension: 'd4_range',
        options: [
          { key: 'A', label: 'Básicamente una: agotamiento/nada', value: 10 },
          { key: 'B', label: 'Dos o tres: cansancio, irritabilidad, algo de ansiedad', value: 35 },
          { key: 'C', label: 'Cuatro o cinco: incluidas algunas positivas', value: 65 },
          { key: 'D', label: 'Un rango amplio incluyendo momentos de alegría genuina', value: 85 },
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
        text: '¿Cuándo fue la última vez que disfrutaste algo sin culpa, sin pensar en lo que "deberías" estar haciendo?',
        affectsSubdimension: 'd5_pleasure',
        options: [
          { key: 'A', label: 'No lo recuerdo — hace meses', value: 10 },
          { key: 'B', label: 'Hace semanas, y fue breve', value: 35 },
          { key: 'C', label: 'La semana pasada, algún momento', value: 60 },
          { key: 'D', label: 'Varias veces esta semana', value: 85 },
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
