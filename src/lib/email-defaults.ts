/**
 * email-defaults.ts — Registro de contenido por defecto de cada email.
 *
 * Se usa para:
 * 1. Fallback cuando no hay override en Supabase (email_templates)
 * 2. Mostrar los valores originales en la UI de edición
 * 3. Comparar con overrides para saber si algo ha sido personalizado
 */

export interface EmailTemplateDefaults {
  subject: string
  bodyContent: string
  ctaText: string
  isDynamic?: boolean
  dynamicNote?: string
}

export const EMAIL_DEFAULTS: Record<string, EmailTemplateDefaults> = {
  d0: {
    subject: 'Tu Mapa de Regulación',
    bodyContent: '',
    ctaText: 'Ver mi mapa completo',
    isDynamic: true,
    dynamicNote:
      'El cuerpo de este email incluye scores y dimensiones calculados automáticamente. Solo el asunto y el texto del botón son editables.',
  },
  d3: {
    subject: 'Hay algo nuevo en tu mapa de regulación',
    bodyContent:
      'Tu arquetipo del sistema nervioso está disponible. Es la pieza que faltaba para entender por qué tu cuerpo responde como responde.',
    ctaText: 'Ver mi mapa',
  },
  d7: {
    subject: 'Tu mapa se ha actualizado',
    bodyContent:
      'Nuevo insight sobre tu dimensión más comprometida. Un dato que no existía cuando hiciste tu diagnóstico.',
    ctaText: 'Ver mi mapa',
  },
  d10: {
    subject: 'Javier puede revisar tu mapa contigo',
    bodyContent: '20 minutos. Sin compromiso. Ya tiene tus datos.',
    ctaText: 'Agendar sesión',
  },
  d14: {
    subject: 'Hay 3 subdimensiones nuevas disponibles',
    bodyContent: '2 preguntas más para aumentar la resolución de tu diagnóstico.',
    ctaText: 'Ver mi mapa',
  },
  d21: {
    subject: 'Un capítulo escrito para tu situación',
    bodyContent:
      'Basado en tu dimensión más comprometida. Del libro "Burnout: El Renacimiento del Líder Fénix."',
    ctaText: 'Ver mi mapa',
  },
  d30: {
    subject: 'Un mes desde tu diagnóstico — ¿ha cambiado algo?',
    bodyContent:
      'Actualiza tu mapa en 30 segundos. Tus scores anteriores se guardan para que veas la evolución.',
    ctaText: 'Actualizar mi mapa',
  },
  d90: {
    subject: '3 meses desde tu mapa — una pregunta',
    bodyContent: '¿Ha cambiado algo?\n\nTu mapa sigue aquí. Actualízalo en 30 segundos y compara.',
    ctaText: 'Actualizar mi mapa',
  },
  goodbye: {
    subject: 'Tu mapa sigue aquí',
    bodyContent:
      'Tu mapa de regulación sigue evolucionando.\n\nNo necesitas abrir estos emails para que eso ocurra. Tu diagnóstico trabaja por ti en segundo plano — y lo que revele estará ahí cuando lo necesites.\n\nVamos a dejar de enviarte actualizaciones para no añadir ruido a tu bandeja. Pero hay algo que no cambia:',
    ctaText: 'Seguir recibiendo actualizaciones',
    isDynamic: true,
    dynamicNote:
      'Este email tiene elementos estructurales fijos (cita destacada, firma, enlace de reactivación). Solo el texto narrativo principal, el asunto y el botón son editables.',
  },
  post_pago: {
    subject: 'Tu Semana 1 empieza ahora — aquí tienes todo',
    bodyContent: 'Has dado el paso que el 97% no da. Lo que sigue es que tu cuerpo note la diferencia.',
    ctaText: 'Agendar mi sesión',
    isDynamic: true,
    dynamicNote:
      'Este email tiene secciones estructurales fijas (protocolo, sesión, MNN©, garantía). Solo el párrafo de bienvenida, el asunto y el botón principal son editables.',
  },
}

/** Sanitiza texto para insertar en HTML (previene XSS) */
export function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

/** Convierte saltos de línea en texto plano a párrafos HTML */
export function textToHtmlParagraphs(text: string, style: string): string {
  return text
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p) => `<p style="${style}">${escapeHtml(p)}</p>`)
    .join('\n')
}

/** Lista de keys válidos para validar en la API */
export const VALID_EMAIL_KEYS = Object.keys(EMAIL_DEFAULTS)
