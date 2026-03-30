'use client'

/**
 * AspiracionalTimeline.tsx — Zona 4: Tu Camino de Regulación
 *
 * 3 bloques según M7_ACTUALIZADO.md + PROMPT_ZONA4_BLOQUES_BAC.md:
 *   BLOQUE A — Timeline de 3 fases (El Despertar, La Metamorfosis, Volar Alto)
 *   BLOQUE B — Reencuadre de precio (desde 2.500€)
 *   BLOQUE C — CTA completo (pre-CTA emocional + botón + garantía + acordeón)
 *
 * Caso hasPaid: misma timeline con badge "EN CURSO" + mensaje de confirmación.
 */

import { useEffect, useRef, useState } from 'react'
import { useCopy } from '@/lib/copy'

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

// ─── HELPERS ──────────────────────────────────────────────────────────────────

function getPersonalNote(
  daysSinceCreation: number,
  score: number,
  reevaluationScore?: number | null,
): string {
  if (daysSinceCreation >= 30 && reevaluationScore) {
    const delta = reevaluationScore - score
    return `Llevas ${daysSinceCreation} días. Tu nuevo score: ${reevaluationScore}/100 (+${delta}).`
  }
  if (daysSinceCreation >= 30) {
    return `Llevas ${daysSinceCreation} días. Es hora de reevaluar.`
  }
  if (daysSinceCreation >= 7) {
    return `Llevas ${daysSinceCreation} días. Tu mapa sigue evolucionando.`
  }
  return `Tu punto de partida: ${score}/100`
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
  const [accordionOpen, setAccordionOpen] = useState(false)
  const { getCopy } = useCopy()

  // IntersectionObserver para fade-up al entrar en viewport (A-15)
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.15 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const personalNote = getPersonalNote(daysSinceCreation, score, reevaluationScore)

  const phases = [
    {
      id: 1,
      name: 'FASE 1',
      title: getCopy('mapa.aspiracional.fase1.title'),
      subtitle: getCopy('mapa.aspiracional.fase1.subtitle'),
      description: getCopy('mapa.aspiracional.fase1.description'),
    },
    {
      id: 2,
      name: 'FASE 2',
      title: getCopy('mapa.aspiracional.fase2.title'),
      subtitle: getCopy('mapa.aspiracional.fase2.subtitle'),
      description: getCopy('mapa.aspiracional.fase2.description'),
    },
    {
      id: 3,
      name: 'FASE 3',
      title: getCopy('mapa.aspiracional.fase3.title'),
      subtitle: getCopy('mapa.aspiracional.fase3.subtitle'),
      description: getCopy('mapa.aspiracional.fase3.description'),
    },
  ]

  const week1Items = [
    {
      title: getCopy('mapa.aspiracional.week1.item1.title'),
      description: getCopy('mapa.aspiracional.week1.item1.description'),
    },
    {
      title: getCopy('mapa.aspiracional.week1.item2.title'),
      description: getCopy('mapa.aspiracional.week1.item2.description'),
    },
    {
      title: getCopy('mapa.aspiracional.week1.item3.title'),
      description: getCopy('mapa.aspiracional.week1.item3.description'),
    },
    {
      title: getCopy('mapa.aspiracional.week1.item4.title'),
      description: getCopy('mapa.aspiracional.week1.item4.description'),
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
        transition:
          'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* ══════════════════════════════════════════════════════════════════════
          BLOQUE A — Timeline de 3 fases
          ══════════════════════════════════════════════════════════════════════ */}

      {/* Headline */}
      <h3
        style={{
          fontFamily: 'var(--font-host-grotesk)',
          fontSize: 'var(--text-h3)',
          fontWeight: 700,
          color: 'var(--color-text-primary)',
          marginBottom: 'var(--space-2)',
          textAlign: 'left',
          lineHeight: 1.3,
        }}
      >
        {getCopy('mapa.aspiracional.headline1')}
      </h3>
      <p
        style={{
          fontFamily: 'var(--font-host-grotesk)',
          fontSize: 'var(--text-h3)',
          fontWeight: 700,
          color: 'var(--color-text-primary)',
          marginTop: 0,
          marginBottom: 'var(--space-5)',
          textAlign: 'left',
          lineHeight: 1.3,
        }}
      >
        {getCopy('mapa.aspiracional.headline2')}
      </p>

      {/* Timeline vertical con línea de progreso */}
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

        {phases.map((phase, i) => {
          const isActive = phase.id === 1
          const isFaded = !isActive && !hasPaid

          return (
            <div
              key={phase.id}
              style={{
                position: 'relative',
                marginBottom: i < phases.length - 1 ? 'var(--space-6)' : 0,
                opacity: isVisible ? (isFaded ? 0.5 : 1) : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(12px)',
                transition:
                  'opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                transitionDelay: isVisible ? `${i * 150}ms` : '0ms',
              }}
            >
              {/* Nodo circular */}
              <div
                style={{
                  position: 'absolute',
                  left: '-28px',
                  top: '2px',
                  width: isActive ? '10px' : '8px',
                  height: isActive ? '10px' : '8px',
                  borderRadius: '50%',
                  background: isActive ? 'var(--color-accent)' : 'transparent',
                  border: isActive
                    ? '2px solid var(--color-accent)'
                    : '2px solid rgba(180, 90, 50, 0.3)',
                  boxShadow: isActive ? '0 0 12px rgba(180, 90, 50, 0.4)' : 'none',
                  animation: isActive
                    ? 'pulse-accent 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
                    : 'none',
                  marginTop: isActive ? '0' : '1px',
                  marginLeft: isActive ? '-1px' : '0',
                }}
              />

              {/* Card de fase */}
              <div
                style={{
                  borderLeft: isActive ? '3px solid var(--color-accent)' : 'none',
                  paddingLeft: isActive ? 'var(--space-4)' : '0',
                }}
              >
                {/* Badge AQUÍ EMPIEZAS / EN CURSO */}
                {isActive && (
                  <span
                    style={{
                      display: 'inline-block',
                      fontFamily: 'var(--font-host-grotesk)',
                      fontSize: 'var(--text-caption)',
                      fontWeight: 600,
                      color: 'var(--color-text-inverse)',
                      background: 'var(--color-accent)',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      marginBottom: '6px',
                    }}
                  >
                    {hasPaid ? 'EN CURSO' : 'AQUÍ EMPIEZAS'}
                  </span>
                )}

                {/* Nota personalizada (solo Fase 1) */}
                {isActive && (
                  <p
                    style={{
                      fontFamily: 'var(--font-host-grotesk)',
                      fontSize: 'var(--text-caption)',
                      fontWeight: 400,
                      color: 'var(--color-accent)',
                      margin: 0,
                      marginBottom: '4px',
                    }}
                  >
                    {personalNote}
                  </p>
                )}

                {/* Título de fase */}
                <p
                  style={{
                    fontFamily: 'var(--font-host-grotesk)',
                    fontSize: 'var(--text-body-sm)',
                    fontWeight: 700,
                    color: isActive
                      ? 'var(--color-text-primary)'
                      : 'var(--color-text-secondary)',
                    margin: 0,
                    lineHeight: 'var(--lh-body-sm)',
                  }}
                >
                  {phase.title}
                </p>

                {/* Subtítulo */}
                <p
                  style={{
                    fontFamily: 'var(--font-host-grotesk)',
                    fontSize: 'var(--text-caption)',
                    fontWeight: 400,
                    color: isActive
                      ? 'var(--color-text-secondary)'
                      : 'var(--color-text-tertiary)',
                    margin: 0,
                    marginTop: '2px',
                  }}
                >
                  {phase.subtitle}
                </p>

                {/* Descripción */}
                <p
                  style={{
                    fontFamily: 'var(--font-host-grotesk)',
                    fontSize: 'var(--text-body-sm)',
                    fontWeight: 400,
                    color: 'var(--color-text-tertiary)',
                    margin: 0,
                    marginTop: '6px',
                    lineHeight: 'var(--lh-body-sm)',
                  }}
                >
                  {phase.description}
                </p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Nota de evolución del mapa */}
      <p
        style={{
          fontFamily: 'var(--font-host-grotesk)',
          fontSize: 'var(--text-caption)',
          color: 'var(--color-text-tertiary)',
          marginTop: 'var(--space-4)',
          marginBottom: 0,
          lineHeight: 'var(--lh-body-sm)',
        }}
      >
        {getCopy('mapa.aspiracional.mapNote')}
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

      {/* ══════════════════════════════════════════════════════════════════════
          CASO PAGADO
          ══════════════════════════════════════════════════════════════════════ */}
      {hasPaid ? (
        <div style={{ textAlign: 'center' }}>
          <p
            style={{
              fontFamily: 'var(--font-host-grotesk)',
              fontSize: 'var(--text-body-sm)',
              color: 'var(--color-text-primary)',
              lineHeight: 'var(--lh-body)',
              margin: 0,
            }}
          >
            {getCopy('mapa.aspiracional.hasPaid.title')}
          </p>
          <p
            style={{
              fontFamily: 'var(--font-host-grotesk)',
              fontSize: 'var(--text-body-sm)',
              color: 'var(--color-text-secondary)',
              lineHeight: 'var(--lh-body)',
              margin: 0,
              marginTop: 'var(--space-1)',
            }}
          >
            {getCopy('mapa.aspiracional.hasPaid.description')}
          </p>
        </div>
      ) : (
        <>
          {/* ══════════════════════════════════════════════════════════════════
              BLOQUE B — Reencuadre de precio
              ══════════════════════════════════════════════════════════════════ */}
          <div
            style={{
              paddingTop: 'var(--space-2)',
              paddingBottom: 'var(--space-6)',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-host-grotesk)',
                fontSize: 'var(--text-body)',
                color: 'var(--color-text-primary)',
                lineHeight: 'var(--lh-body)',
                margin: 0,
                marginBottom: 'var(--space-3)',
              }}
            >
              {getCopy('mapa.aspiracional.reencuadre')}
            </p>
            <p
              style={{
                fontFamily: 'var(--font-host-grotesk)',
                fontSize: 'var(--text-body-sm)',
                color: 'var(--color-text-secondary)',
                lineHeight: 'var(--lh-body)',
                margin: 0,
              }}
            >
              {getCopy('mapa.aspiracional.reencuadre2')}
            </p>
          </div>

          {/* ══════════════════════════════════════════════════════════════════
              BLOQUE C — CTA completo
              ══════════════════════════════════════════════════════════════════ */}
          <div style={{ textAlign: 'center' }}>
            {/* Texto pre-CTA — voz de Javier, serif italic */}
            <p
              style={{
                fontFamily: 'var(--font-host-grotesk)',
                fontSize: 'var(--text-h3)',
                fontStyle: 'italic',
                fontWeight: 400,
                color: 'var(--color-text-primary)',
                lineHeight: 1.4,
                margin: 0,
                marginBottom: 'var(--space-4)',
                textAlign: 'left',
              }}
            >
              {getCopy('mapa.aspiracional.preCta')}
            </p>

            {/* Texto delta de alivio — 72 horas */}
            <p
              style={{
                fontFamily: 'var(--font-host-grotesk)',
                fontSize: 'var(--text-body)',
                color: 'var(--color-text-primary)',
                lineHeight: 'var(--lh-body)',
                margin: 0,
                marginBottom: 'var(--space-6)',
                textAlign: 'left',
              }}
            >
              {getCopy('mapa.aspiracional.delta')}
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
                fontFamily: 'var(--font-host-grotesk)',
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
              {checkoutLoading
                ? getCopy('mapa.aspiracional.checkout.loading')
                : getCopy('mapa.aspiracional.ctaButton')}
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
                    fontFamily: 'var(--font-host-grotesk)',
                    fontSize: 'var(--text-body-sm)',
                    color: 'var(--color-text-primary)',
                    marginBottom: 'var(--space-2)',
                  }}
                >
                  {getCopy('mapa.aspiracional.checkout.error')}
                </p>
                <button
                  onClick={onRetryCheckout}
                  style={{
                    padding: 'var(--space-2) var(--space-4)',
                    borderRadius: '9999px',
                    border: 'var(--border-subtle)',
                    background: 'transparent',
                    color: 'var(--color-accent)',
                    fontFamily: 'var(--font-host-grotesk)',
                    fontSize: 'var(--text-caption)',
                    cursor: 'pointer',
                  }}
                >
                  {getCopy('mapa.aspiracional.checkout.retry')}
                </button>
              </div>
            )}

            {/* Sub-copy: precio + garantía */}
            <p
              style={{
                fontFamily: 'var(--font-host-grotesk)',
                fontSize: 'var(--text-caption)',
                color: 'var(--color-text-tertiary)',
                textAlign: 'center',
                lineHeight: 'var(--lh-body-sm)',
                marginTop: 'var(--space-3)',
                marginBottom: 'var(--space-1)',
              }}
            >
              {getCopy('mapa.aspiracional.priceCopy')}
            </p>
            <p
              style={{
                fontFamily: 'var(--font-host-grotesk)',
                fontSize: 'var(--text-caption)',
                color: 'var(--color-text-tertiary)',
                textAlign: 'center',
                margin: 0,
                opacity: 0.8,
              }}
            >
              {getCopy('mapa.aspiracional.guarantee')}
            </p>

            {/* ── Acordeón colapsable: Qué incluye la Semana 1 ── */}
            <div
              style={{
                marginTop: 'var(--space-5)',
                textAlign: 'left',
              }}
            >
              <button
                onClick={() => setAccordionOpen(!accordionOpen)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  background: 'none',
                  border: 'none',
                  padding: 'var(--space-3) 0',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-host-grotesk)',
                  fontSize: 'var(--text-body-sm)',
                  fontWeight: 500,
                  color: 'var(--color-text-secondary)',
                }}
              >
                <span>{getCopy('mapa.aspiracional.week1.accordion.title')}</span>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  style={{
                    transform: accordionOpen ? 'rotate(90deg)' : 'rotate(0deg)',
                    transition: 'transform 200ms ease',
                    flexShrink: 0,
                    marginLeft: 'var(--space-2)',
                  }}
                >
                  <path
                    d="M4.5 2.5L8 6L4.5 9.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <div
                style={{
                  maxHeight: accordionOpen ? '600px' : '0px',
                  overflow: 'hidden',
                  transition:
                    'max-height 400ms cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                <div
                  style={{
                    background: 'var(--color-bg-secondary)',
                    borderRadius: 'var(--radius-md)',
                    padding: 'var(--space-5)',
                    border: 'var(--border-subtle)',
                  }}
                >
                  {week1Items.map((item, idx) => (
                    <div
                      key={idx}
                      style={{
                        marginBottom:
                          idx < week1Items.length - 1
                            ? 'var(--space-5)'
                            : '0',
                      }}
                    >
                      <p
                        style={{
                          fontFamily: 'var(--font-host-grotesk)',
                          fontSize: 'var(--text-body-sm)',
                          fontWeight: 600,
                          color: 'var(--color-text-primary)',
                          margin: 0,
                          lineHeight: 'var(--lh-body-sm)',
                        }}
                      >
                        {item.title}
                      </p>
                      <p
                        style={{
                          fontFamily: 'var(--font-host-grotesk)',
                          fontSize: 'var(--text-body-sm)',
                          fontWeight: 400,
                          color: 'var(--color-text-secondary)',
                          margin: 0,
                          marginTop: '4px',
                          lineHeight: 'var(--lh-body-sm)',
                        }}
                      >
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
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
