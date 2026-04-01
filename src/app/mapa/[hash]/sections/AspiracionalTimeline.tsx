'use client'

/**
 * AspiracionalTimeline.tsx — Zona 4: Tu Camino de Regulación
 *
 * Estructura (v2 — Feedback-F):
 *   BLOQUE A — ProgramaCompleto: 3 fases expandibles con 12 semanas
 *   BLOQUE B — SessionCTA: Reserva sesión con Javier (disponible desde día 0)
 *   BLOQUE C — BookExcerptDownload: Descarga del extracto del libro (si hay PDF)
 *   BLOQUE D — Reencuadre de precio (desde 2.500€)
 *   BLOQUE E — CTA completo (pre-CTA emocional + botón + garantía + acordeón)
 *
 * Caso hasPaid: misma estructura con badge "EN CURSO" + mensaje de confirmación.
 */

import { useEffect, useRef, useState } from 'react'
import { useCopy } from '@/lib/copy'
import ProgramaCompleto from './ProgramaCompleto'
import SessionCTA from './SessionCTA'
import BookExcerptDownload from './BookExcerptDownload'
import ProgressiveUnlockModule from './ProgressiveUnlockModule'

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
  // New props for session and PDF
  mapHash: string
  sessionBooked: boolean
  sessionBookingDetails?: {
    slotStart: string
    meetUrl: string | null
  } | null
  bookExcerptPdfUrl: string | null
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
  mapHash,
  sessionBooked,
  sessionBookingDetails,
  bookExcerptPdfUrl,
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
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition:
          'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* ══════════════════════════════════════════════════════════════════════
          BLOQUE A — Headline + Programa Completo (12 semanas)
          ══════════════════════════════════════════════════════════════════════ */}

      {/* Label "TU SIGUIENTE PASO" */}
      <span
        style={{
          display: 'inline-block',
          fontFamily: 'var(--font-host-grotesk)',
          fontSize: '10px',
          fontWeight: 600,
          color: '#E8735A',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          marginBottom: 'var(--space-2)',
        }}
      >
        Tu siguiente paso
      </span>

      {/* Headline */}
      <h3
        style={{
          fontFamily: 'var(--font-host-grotesk)',
          fontSize: 'var(--text-h3)',
          fontWeight: 700,
          color: 'var(--color-text-primary)',
          marginBottom: 'var(--space-2)',
          marginTop: 0,
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

      {/* C3 — Botón "Los detalles" outline en bloque CTA verde */}
      <button
        onClick={() => {
          const el = document.getElementById('programa-detalle')
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }}
        style={{
          background: 'transparent',
          color: 'var(--color-text-primary)',
          border: '1px solid var(--color-border)',
          padding: 'var(--space-2) var(--space-5)',
          borderRadius: 'var(--radius-pill)',
          fontFamily: 'var(--font-host-grotesk)',
          fontSize: 'var(--text-body-sm)',
          fontWeight: 500,
          cursor: 'pointer',
          marginBottom: 'var(--space-6)',
        }}
      >
        Los detalles →
      </button>

      {/* Programa de 12 semanas expandible */}
      <div id="programa-detalle">
        <ProgramaCompleto hasPaid={hasPaid} />
      </div>

      {/* Nota de evolución del mapa */}
      <p
        style={{
          fontFamily: 'var(--font-host-grotesk)',
          fontSize: 'var(--text-caption)',
          color: 'var(--color-text-tertiary)',
          marginTop: 0,
          marginBottom: 'var(--space-6)',
          lineHeight: 'var(--lh-body-sm)',
        }}
      >
        ¿Quieres saber si el programa puede encajar en tu agenda? ¿Tienes dudas que necesites que te aclaremos? Reserva una cita de 20'' sin compromiso.
      </p>

      {/* ══════════════════════════════════════════════════════════════════════
          BLOQUE B — Sesión con Javier (disponible desde día 0)
          ══════════════════════════════════════════════════════════════════════ */}
      <div id="session-cta">
        <SessionCTA
          mapHash={mapHash}
          booked={sessionBooked}
          bookingDetails={sessionBookingDetails}
        />
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          BLOQUE C — Extracto del libro (PDF, si existe)
          ══════════════════════════════════════════════════════════════════════ */}
      <BookExcerptDownload pdfUrl={bookExcerptPdfUrl} />

      {/* ══════════════════════════════════════════════════════════════════════
          BLOQUE D+E — Reencuadre + CTA (o confirmación si pagado)
          ══════════════════════════════════════════════════════════════════════ */}
      <div
        style={{
          padding: 'var(--space-5)',
          borderRadius: 'var(--radius-lg)',
          background: 'var(--color-bg-secondary)',
          border: 'var(--border-subtle)',
        }}
      >
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
            {/* BLOQUE D — Reencuadre de precio */}
            <div
              style={{
                paddingBottom: 'var(--space-6)',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-host-grotesk)',
                  fontSize: 'var(--text-body)',
                  color: '#c27d70',
                  fontWeight: 700,
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
                  color: '#c27d70',
                  fontWeight: 700,
                  lineHeight: 'var(--lh-body)',
                  margin: 0,
                }}
              >
                {getCopy('mapa.aspiracional.reencuadre2')}
              </p>
            </div>

            {/* BLOQUE E — CTA completo */}
            <div style={{ textAlign: 'center' }}>
              {/* Texto pre-CTA — voz de Javier, italic */}
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

              {/* Garantía — mismo tamaño y color que delta */}
              <p
                style={{
                  fontFamily: 'var(--font-host-grotesk)',
                  fontSize: 'var(--text-body)',
                  color: 'var(--color-text-primary)',
                  textAlign: 'center',
                  lineHeight: 'var(--lh-body)',
                  marginTop: 'var(--space-3)',
                  marginBottom: 0,
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
                    {/* Presentaciones del Dr. Carlos Alvear */}
                    <p
                      style={{
                        fontFamily: 'var(--font-host-grotesk)',
                        fontSize: 'var(--text-caption)',
                        fontWeight: 600,
                        color: 'var(--color-text-primary)',
                        margin: 0,
                        marginBottom: 'var(--space-3)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em',
                      }}
                    >
                      {getCopy('mapa.programa.week1.presentations.title')}
                    </p>
                    {[
                      getCopy('mapa.programa.week1.pres1'),
                      getCopy('mapa.programa.week1.pres2'),
                      getCopy('mapa.programa.week1.pres3'),
                    ].map((pres, i) => (
                      <div
                        key={i}
                        style={{
                          display: 'flex',
                          alignItems: 'baseline',
                          gap: 'var(--space-2)',
                          marginBottom: 'var(--space-2)',
                        }}
                      >
                        <span
                          style={{
                            fontFamily: 'var(--font-host-grotesk)',
                            fontSize: 'var(--text-caption)',
                            fontWeight: 600,
                            color: 'var(--color-accent)',
                            flexShrink: 0,
                          }}
                        >
                          {i + 1}.
                        </span>
                        <span
                          style={{
                            fontFamily: 'var(--font-host-grotesk)',
                            fontSize: 'var(--text-caption)',
                            color: 'var(--color-text-secondary)',
                            lineHeight: 'var(--lh-body-sm)',
                          }}
                        >
                          {pres}
                        </span>
                      </div>
                    ))}

                    {/* Qué vas a aprender */}
                    <div style={{ height: '1px', background: 'rgba(180, 90, 50, 0.1)', margin: 'var(--space-4) 0' }} />
                    <p
                      style={{
                        fontFamily: 'var(--font-host-grotesk)',
                        fontSize: 'var(--text-caption)',
                        fontWeight: 600,
                        color: 'var(--color-text-primary)',
                        margin: 0,
                        marginBottom: 'var(--space-2)',
                      }}
                    >
                      {getCopy('mapa.programa.week1.learning.title')}
                    </p>
                    <p
                      style={{
                        fontFamily: 'var(--font-host-grotesk)',
                        fontSize: 'var(--text-caption)',
                        color: 'var(--color-text-tertiary)',
                        lineHeight: 'var(--lh-body-sm)',
                        margin: 0,
                        marginBottom: 'var(--space-4)',
                      }}
                    >
                      {getCopy('mapa.programa.week1.learning.items')}
                    </p>

                    {/* Protocolo + MNN + Sesión */}
                    {week1Items.slice(0, 3).map((item, idx) => (
                      <div
                        key={idx}
                        style={{
                          marginBottom:
                            idx < 2
                              ? 'var(--space-3)'
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

              {/* ProgressiveUnlockModule moved to MapaClient — C5: entre dimensiones y programa */}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
