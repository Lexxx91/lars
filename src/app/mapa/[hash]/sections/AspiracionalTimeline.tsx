'use client'

/**
 * AspiracionalTimeline.tsx — Timeline de transformación del cliente
 *
 * 5 puntos aspiracionales en lenguaje de transformación:
 * HOY → SEMANA 1 → SEMANA 4 → SEMANA 8 → SEMANA 12
 *
 * Incluye: nota de evolución del mapa + CTA contextual (pagado/no pagado)
 * Reemplaza: EvolutionTimeline.tsx (timeline de sistema)
 */

import { useEffect, useRef, useState } from 'react'

// ─── TIPOS ────────────────────────────────────────────────────────────────────

interface Props {
  score: number
  hasPaid: boolean
  daysSinceCreation: number
  reevaluationScore?: number | null
  onStartWeek1: () => void
  checkoutLoading: boolean
  checkoutError: string | null
  onRetryCheckout: () => void
}

interface TimelinePoint {
  label: string
  title: string
  description: string
  isHoy: boolean
}

// ─── HELPERS ──────────────────────────────────────────────────────────────────

function getHoyContent(
  daysSinceCreation: number,
  score: number,
  reevaluationScore?: number | null,
): { title: string; description: string } {
  if (daysSinceCreation >= 30 && reevaluationScore) {
    const delta = reevaluationScore - score
    return {
      title: `Llevas ${daysSinceCreation} días. Tu nuevo score: ${reevaluationScore}/100`,
      description: `+${delta} puntos en ${daysSinceCreation} días.`,
    }
  }
  if (daysSinceCreation >= 30) {
    return {
      title: `Llevas ${daysSinceCreation} días.`,
      description: 'Es hora de reevaluar.',
    }
  }
  if (daysSinceCreation >= 7) {
    return {
      title: `Llevas ${daysSinceCreation} días. Tu mapa sigue evolucionando.`,
      description: 'Tu sistema nervioso está registrando cambios.',
    }
  }
  return {
    title: `Tu punto de partida: ${score}/100`,
    description: 'Tu sistema nervioso necesita atención.',
  }
}

// ─── COMPONENTE ───────────────────────────────────────────────────────────────

export default function AspiracionalTimeline({
  score,
  hasPaid,
  daysSinceCreation,
  reevaluationScore,
  onStartWeek1,
  checkoutLoading,
  checkoutError,
  onRetryCheckout,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  // IntersectionObserver para fade-up al entrar en viewport (A-15)
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.15 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const hoy = getHoyContent(daysSinceCreation, score, reevaluationScore)

  const points: TimelinePoint[] = [
    {
      label: 'HOY',
      title: hoy.title,
      description: hoy.description,
      isHoy: true,
    },
    {
      label: 'SEMANA 1',
      title: 'Tu cuerpo nota la diferencia.',
      description: 'Protocolo de Sueño de Emergencia. Resultados en 72 horas.',
      isHoy: false,
    },
    {
      label: 'SEMANA 4',
      title: 'Tu primer balance real.',
      description: 'Reevaluación completa. Medirás cuánto ha cambiado tu biología.',
      isHoy: false,
    },
    {
      label: 'SEMANA 8',
      title: 'Los patrones cambian.',
      description: 'Desmontar las creencias que sostienen el ciclo.',
      isHoy: false,
    },
    {
      label: 'SEMANA 12',
      title: 'Tu nueva arquitectura vital.',
      description: 'Límites, vínculos, sistema de alertas. El burnout no vuelve.',
      isHoy: false,
    },
  ]

  return (
    <div
      ref={containerRef}
      style={{
        marginBottom: 'var(--space-8)',
        padding: 'var(--space-5)',
        borderRadius: 'var(--radius-lg)',
        background: 'var(--color-bg-secondary)',
        border: 'var(--border-subtle)',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* Título */}
      <h3
        style={{
          fontFamily: 'var(--font-lora)',
          fontSize: 'var(--text-h3)',
          fontWeight: 700,
          color: 'var(--color-text-primary)',
          textTransform: 'uppercase',
          letterSpacing: 'var(--ls-overline)',
          marginBottom: 'var(--space-5)',
          textAlign: 'left',
        }}
      >
        Tu camino de regulación
      </h3>

      {/* Timeline con línea vertical */}
      <div style={{ position: 'relative', paddingLeft: '32px' }}>
        {/* Línea vertical */}
        <div
          style={{
            position: 'absolute',
            left: '11px',
            top: '8px',
            bottom: '8px',
            width: '2px',
            background: 'rgba(180, 90, 50, 0.15)',
          }}
        />

        {points.map((point, i) => (
          <div
            key={point.label}
            style={{
              position: 'relative',
              marginBottom: i < points.length - 1 ? 'var(--space-8)' : 0,
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(12px)',
              transition: 'opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
              transitionDelay: isVisible ? `${i * 150}ms` : '0ms',
            }}
          >
            {/* Dot */}
            <div
              style={{
                position: 'absolute',
                left: '-28px',
                top: '2px',
                width: point.isHoy ? '10px' : '8px',
                height: point.isHoy ? '10px' : '8px',
                borderRadius: '50%',
                background: point.isHoy ? 'var(--color-accent)' : 'transparent',
                border: point.isHoy
                  ? '2px solid var(--color-accent)'
                  : '2px solid rgba(180, 90, 50, 0.3)',
                boxShadow: point.isHoy ? '0 0 12px rgba(180, 90, 50, 0.4)' : 'none',
                animation: point.isHoy ? 'pulse-accent 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' : 'none',
                marginTop: point.isHoy ? '0' : '1px',
                marginLeft: point.isHoy ? '-1px' : '0',
              }}
            />

            {/* Label (HOY, SEMANA 1, etc.) */}
            <p
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: 'var(--text-caption)',
                fontWeight: 600,
                color: point.isHoy ? 'var(--color-accent)' : 'var(--color-text-tertiary)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                margin: 0,
                marginBottom: '2px',
              }}
            >
              {point.label}
            </p>

            {/* Título del punto */}
            <p
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: 'var(--text-body-sm)',
                fontWeight: 600,
                color: 'var(--color-text-primary)',
                margin: 0,
                lineHeight: 'var(--lh-body-sm)',
              }}
            >
              {point.title}
            </p>

            {/* Descripción */}
            <p
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: 'var(--text-body-sm)',
                fontWeight: 400,
                color: 'var(--color-text-secondary)',
                margin: 0,
                marginTop: '4px',
                lineHeight: 'var(--lh-body-sm)',
              }}
            >
              {point.description}
            </p>
          </div>
        ))}
      </div>

      {/* Nota de evolución del mapa */}
      <p
        style={{
          fontFamily: 'var(--font-inter)',
          fontSize: 'var(--text-caption)',
          color: 'var(--color-text-tertiary)',
          marginTop: 'var(--space-4)',
          marginBottom: 0,
          lineHeight: 'var(--lh-body-sm)',
        }}
      >
        Tu mapa también evoluciona: cada semana aparece algo nuevo — tu perfil
        profundo, insights colectivos, reevaluaciones. Vuelve cuando quieras.
      </p>

      {/* ── Separador sutil ── */}
      <div
        style={{
          height: '1px',
          background: 'var(--color-surface-subtle)',
          marginTop: 'var(--space-6)',
          marginBottom: 'var(--space-6)',
          opacity: 0.5,
        }}
      />

      {/* ── CTA contextual ── */}
      {hasPaid ? (
        <div style={{ textAlign: 'center' }}>
          <p
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: 'var(--text-body-sm)',
              color: 'var(--color-text-primary)',
              lineHeight: 'var(--lh-body)',
              margin: 0,
            }}
          >
            Tu Semana 1 está en marcha.
          </p>
          <p
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: 'var(--text-body-sm)',
              color: 'var(--color-text-secondary)',
              lineHeight: 'var(--lh-body)',
              margin: 0,
              marginTop: 'var(--space-1)',
            }}
          >
            Revisa tu email para el Protocolo de Sueño de Emergencia.
          </p>
        </div>
      ) : (
        <div style={{ textAlign: 'center' }}>
          {/* Intro */}
          <p
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: 'var(--text-body-sm)',
              color: 'var(--color-text-primary)',
              lineHeight: 'var(--lh-body)',
              margin: 0,
              marginBottom: 'var(--space-5)',
            }}
          >
            Tu regulación es un proceso de 12 semanas.
            <br />
            Tu primer paso son los próximos 7 días.
          </p>

          {/* Botón CTA */}
          <button
            onClick={onStartWeek1}
            disabled={checkoutLoading}
            style={{
              background: 'var(--color-accent)',
              color: 'var(--color-text-inverse)',
              border: 'none',
              padding: 'var(--space-3) var(--space-5)',
              borderRadius: '9999px',
              fontFamily: 'var(--font-inter)',
              fontSize: 'var(--text-body-sm)',
              fontWeight: 600,
              width: '100%',
              maxWidth: '400px',
              cursor: checkoutLoading ? 'default' : 'pointer',
              opacity: checkoutLoading ? 0.7 : 1,
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              if (!checkoutLoading) {
                e.currentTarget.style.background = 'var(--color-accent-hover)'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--color-accent)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            {checkoutLoading ? 'Redirigiendo…' : 'Empieza la Semana 1'}
          </button>

          {/* Error de checkout */}
          {checkoutError && (
            <div
              style={{
                padding: 'var(--space-4)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid rgba(239,68,68,0.3)',
                background: 'rgba(239,68,68,0.08)',
                marginTop: 'var(--space-3)',
                textAlign: 'center',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-inter)',
                  fontSize: 'var(--text-body-sm)',
                  color: 'var(--color-text-primary)',
                  marginBottom: 'var(--space-2)',
                }}
              >
                No se pudo conectar con el sistema de pago. Tus datos están a salvo.
              </p>
              <button
                onClick={onRetryCheckout}
                style={{
                  padding: 'var(--space-2) var(--space-4)',
                  borderRadius: '9999px',
                  border: 'var(--border-subtle)',
                  background: 'transparent',
                  color: 'var(--color-accent)',
                  fontFamily: 'var(--font-inter)',
                  fontSize: 'var(--text-caption)',
                  cursor: 'pointer',
                }}
              >
                Intentar de nuevo
              </button>
            </div>
          )}

          {/* Sub-copy: precio + garantía */}
          <p
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: 'var(--text-caption)',
              color: 'var(--color-text-tertiary)',
              textAlign: 'center',
              lineHeight: 'var(--lh-body-sm)',
              marginTop: 'var(--space-3)',
              marginBottom: 'var(--space-1)',
            }}
          >
            97€ · Protocolo de Sueño + Sesión 1:1 + MNN©
          </p>
          <p
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: 'var(--text-caption)',
              color: 'var(--color-text-tertiary)',
              textAlign: 'center',
              margin: 0,
              opacity: 0.8,
            }}
          >
            Garantía: si tu sueño no mejora en 7 días, devolución íntegra.
          </p>
        </div>
      )}

      {/* Pulse animation keyframes */}
      <style>{`
        @keyframes pulse-accent {
          0%, 100% {
            box-shadow: 0 0 12px rgba(180, 90, 50, 0.4);
            transform: scale(1);
          }
          50% {
            box-shadow: 0 0 20px rgba(180, 90, 50, 0.6);
            transform: scale(1.3);
          }
        }
      `}</style>
    </div>
  )
}
