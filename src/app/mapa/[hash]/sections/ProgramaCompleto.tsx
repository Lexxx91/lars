'use client'

/**
 * ProgramaCompleto.tsx — Programa L.A.R.S.© de 12 semanas
 *
 * 3 fases expandibles, cada una con 4 semanas.
 * La Semana 1 tiene un sub-acordeón con contenido detallado.
 * Resultados de cada fase destacados en itálica con color acento.
 * Todos los textos editables desde admin (copy-defaults).
 */

import { useState, useRef, useEffect } from 'react'
import { useCopy } from '@/lib/copy'

// ─── TIPOS ────────────────────────────────────────────────────────────────────

interface Week {
  number: number
  titleKey: string
  descriptionKey: string
}

interface Phase {
  id: number
  titleKey: string
  subtitleKey: string
  introKey: string
  resultsKey: string
  metricsKey: string
  weeks: Week[]
}

// ─── CONFIGURACIÓN DE FASES ──────────────────────────────────────────────────

const PHASES: Phase[] = [
  {
    id: 1,
    titleKey: 'mapa.aspiracional.fase1.title',
    subtitleKey: 'mapa.aspiracional.fase1.subtitle',
    introKey: 'mapa.programa.fase1.intro',
    resultsKey: 'mapa.programa.fase1.results',
    metricsKey: 'mapa.programa.fase1.metrics',
    weeks: [
      { number: 1, titleKey: 'mapa.programa.fase1.week1.title', descriptionKey: 'mapa.programa.fase1.week1.description' },
      { number: 2, titleKey: 'mapa.programa.fase1.week2.title', descriptionKey: 'mapa.programa.fase1.week2.description' },
      { number: 3, titleKey: 'mapa.programa.fase1.week3.title', descriptionKey: 'mapa.programa.fase1.week3.description' },
      { number: 4, titleKey: 'mapa.programa.fase1.week4.title', descriptionKey: 'mapa.programa.fase1.week4.description' },
    ],
  },
  {
    id: 2,
    titleKey: 'mapa.aspiracional.fase2.title',
    subtitleKey: 'mapa.aspiracional.fase2.subtitle',
    introKey: 'mapa.programa.fase2.intro',
    resultsKey: 'mapa.programa.fase2.results',
    metricsKey: 'mapa.programa.fase2.metrics',
    weeks: [
      { number: 5, titleKey: 'mapa.programa.fase2.week5.title', descriptionKey: 'mapa.programa.fase2.week5.description' },
      { number: 6, titleKey: 'mapa.programa.fase2.week6.title', descriptionKey: 'mapa.programa.fase2.week6.description' },
      { number: 7, titleKey: 'mapa.programa.fase2.week7.title', descriptionKey: 'mapa.programa.fase2.week7.description' },
      { number: 8, titleKey: 'mapa.programa.fase2.week8.title', descriptionKey: 'mapa.programa.fase2.week8.description' },
    ],
  },
  {
    id: 3,
    titleKey: 'mapa.aspiracional.fase3.title',
    subtitleKey: 'mapa.aspiracional.fase3.subtitle',
    introKey: 'mapa.programa.fase3.intro',
    resultsKey: 'mapa.programa.fase3.results',
    metricsKey: 'mapa.programa.fase3.metrics',
    weeks: [
      { number: 9, titleKey: 'mapa.programa.fase3.week9.title', descriptionKey: 'mapa.programa.fase3.week9.description' },
      { number: 10, titleKey: 'mapa.programa.fase3.week10.title', descriptionKey: 'mapa.programa.fase3.week10.description' },
      { number: 11, titleKey: 'mapa.programa.fase3.week11.title', descriptionKey: 'mapa.programa.fase3.week11.description' },
      { number: 12, titleKey: 'mapa.programa.fase3.week12.title', descriptionKey: 'mapa.programa.fase3.week12.description' },
    ],
  },
]

// ─── SEMANA 1 DETALLE ────────────────────────────────────────────────────────

function Week1Detail({ getCopy }: { getCopy: (key: string) => string }) {
  return (
    <div
      style={{
        marginTop: 'var(--space-4)',
        padding: 'var(--space-4)',
        borderRadius: 'var(--radius-md)',
        background: 'rgba(180, 90, 50, 0.06)',
        border: '1px solid rgba(180, 90, 50, 0.12)',
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

      {/* Separador */}
      <div
        style={{
          height: '1px',
          background: 'rgba(180, 90, 50, 0.1)',
          margin: 'var(--space-4) 0',
        }}
      />

      {/* Qué vas a aprender */}
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
      {[
        { titleKey: 'mapa.programa.week1.sleep.title', descKey: 'mapa.programa.week1.sleep.description' },
        { titleKey: 'mapa.programa.week1.mnn.title', descKey: 'mapa.programa.week1.mnn.description' },
        { titleKey: 'mapa.programa.week1.session.title', descKey: 'mapa.programa.week1.session.description' },
      ].map((item, i) => (
        <div
          key={i}
          style={{
            marginBottom: i < 2 ? 'var(--space-3)' : 0,
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-host-grotesk)',
              fontSize: 'var(--text-caption)',
              fontWeight: 600,
              color: 'var(--color-text-primary)',
              margin: 0,
              lineHeight: 'var(--lh-body-sm)',
            }}
          >
            {getCopy(item.titleKey)}
          </p>
          <p
            style={{
              fontFamily: 'var(--font-host-grotesk)',
              fontSize: 'var(--text-caption)',
              color: 'var(--color-text-tertiary)',
              margin: 0,
              marginTop: '2px',
              lineHeight: 'var(--lh-body-sm)',
            }}
          >
            {getCopy(item.descKey)}
          </p>
        </div>
      ))}
    </div>
  )
}

// ─── CHEVRON ─────────────────────────────────────────────────────────────────

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      style={{
        transform: open ? 'rotate(90deg)' : 'rotate(0deg)',
        transition: 'transform 200ms ease',
        flexShrink: 0,
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
  )
}

// ─── FASE EXPANDIBLE ─────────────────────────────────────────────────────────

function PhaseAccordion({
  phase,
  isOpen,
  onToggle,
  isActive,
  hasPaid,
  getCopy,
}: {
  phase: Phase
  isOpen: boolean
  onToggle: () => void
  isActive: boolean
  hasPaid: boolean
  getCopy: (key: string) => string
}) {
  const contentRef = useRef<HTMLDivElement>(null)
  const [measuredHeight, setMeasuredHeight] = useState(0)
  const [week1Open, setWeek1Open] = useState(false)

  useEffect(() => {
    if (isOpen && contentRef.current) {
      setMeasuredHeight(contentRef.current.scrollHeight)
    }
  }, [isOpen, week1Open])

  useEffect(() => {
    if (!isOpen || !contentRef.current) return
    const observer = new ResizeObserver(() => {
      if (contentRef.current) {
        setMeasuredHeight(contentRef.current.scrollHeight)
      }
    })
    observer.observe(contentRef.current)
    return () => observer.disconnect()
  }, [isOpen])

  return (
    <div
      style={{
        borderBottom: '1px solid var(--color-surface-subtle)',
      }}
    >
      {/* Phase header */}
      <button
        onClick={onToggle}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 'var(--space-3)',
          padding: 'var(--space-4) var(--space-4)',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
          minHeight: 56,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', flex: 1, minWidth: 0 }}>
          {/* Phase number dot */}
          <div
            style={{
              width: isActive ? 10 : 8,
              height: isActive ? 10 : 8,
              borderRadius: '50%',
              background: isActive ? 'var(--color-accent)' : 'transparent',
              border: isActive
                ? '2px solid var(--color-accent)'
                : '2px solid rgba(180, 90, 50, 0.3)',
              boxShadow: isActive ? '0 0 8px rgba(180, 90, 50, 0.3)' : 'none',
              flexShrink: 0,
            }}
          />

          <div style={{ minWidth: 0 }}>
            <span
              style={{
                fontFamily: 'var(--font-host-grotesk)',
                fontSize: 'var(--text-body-sm)',
                fontWeight: 600,
                color: isActive ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                display: 'block',
              }}
            >
              {getCopy(phase.titleKey)}
            </span>
            <span
              style={{
                fontFamily: 'var(--font-host-grotesk)',
                fontSize: 'var(--text-caption)',
                color: 'var(--color-text-tertiary)',
                display: 'block',
                marginTop: '2px',
              }}
            >
              {getCopy(phase.subtitleKey)}
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', flexShrink: 0 }}>
          {isActive && (
            <span
              style={{
                fontFamily: 'var(--font-host-grotesk)',
                fontSize: '10px',
                fontWeight: 600,
                color: 'var(--color-text-inverse)',
                background: 'var(--color-accent)',
                padding: '2px 8px',
                borderRadius: '4px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              {hasPaid ? 'EN CURSO' : 'AQUÍ EMPIEZAS'}
            </span>
          )}
          <Chevron open={isOpen} />
        </div>
      </button>

      {/* Phase content */}
      <div
        style={{
          maxHeight: isOpen ? measuredHeight : 0,
          overflow: 'hidden',
          transition: isOpen
            ? 'max-height 500ms cubic-bezier(0.16, 1, 0.3, 1)'
            : 'max-height 300ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <div
          ref={contentRef}
          style={{
            padding: '0 var(--space-4) var(--space-5)',
            opacity: isOpen ? 1 : 0,
            transition: 'opacity 200ms ease',
            transitionDelay: isOpen ? '100ms' : '0ms',
          }}
        >
          {/* Intro text */}
          <p
            style={{
              fontFamily: 'var(--font-host-grotesk)',
              fontSize: 'var(--text-caption)',
              fontStyle: 'italic',
              color: 'var(--color-text-secondary)',
              margin: 0,
              marginBottom: 'var(--space-4)',
              lineHeight: 'var(--lh-body-sm)',
            }}
          >
            {getCopy(phase.introKey)}
          </p>

          {/* Weeks */}
          {phase.weeks.map((week, i) => {
            const isWeek1 = week.number === 1

            return (
              <div
                key={week.number}
                style={{
                  marginBottom: i < phase.weeks.length - 1 ? 'var(--space-3)' : 0,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: 'var(--space-2)',
                    cursor: isWeek1 ? 'pointer' : 'default',
                  }}
                  onClick={isWeek1 ? () => setWeek1Open(!week1Open) : undefined}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-host-grotesk)',
                      fontSize: 'var(--text-caption)',
                      fontWeight: 600,
                      color: 'var(--color-accent)',
                      flexShrink: 0,
                      minWidth: '72px',
                    }}
                  >
                    SEMANA {week.number}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-host-grotesk)',
                      fontSize: 'var(--text-caption)',
                      fontWeight: 600,
                      color: 'var(--color-text-primary)',
                      flexShrink: 0,
                    }}
                  >
                    {getCopy(week.titleKey)}
                  </span>
                  {isWeek1 && (
                    <span style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span
                        style={{
                          fontFamily: 'var(--font-host-grotesk)',
                          fontSize: '10px',
                          fontWeight: 600,
                          color: 'var(--color-accent)',
                          letterSpacing: '0.04em',
                        }}
                      >
                        VER DETALLE
                      </span>
                      <Chevron open={week1Open} />
                    </span>
                  )}
                </div>
                <p
                  style={{
                    fontFamily: 'var(--font-host-grotesk)',
                    fontSize: 'var(--text-caption)',
                    color: 'var(--color-text-tertiary)',
                    margin: 0,
                    marginTop: '2px',
                    marginLeft: 'calc(72px + var(--space-2))',
                    lineHeight: 'var(--lh-body-sm)',
                  }}
                >
                  {getCopy(week.descriptionKey)}
                </p>

                {/* Week 1 expandable detail */}
                {isWeek1 && week1Open && (
                  <div style={{ marginLeft: 'calc(72px + var(--space-2))' }}>
                    <Week1Detail getCopy={getCopy} />
                  </div>
                )}
              </div>
            )
          })}

          {/* Phase results */}
          <div
            style={{
              marginTop: 'var(--space-5)',
              padding: 'var(--space-4)',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(180, 90, 50, 0.04)',
              borderLeft: '3px solid var(--color-accent)',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-host-grotesk)',
                fontSize: 'var(--text-caption)',
                fontStyle: 'italic',
                color: 'var(--color-text-secondary)',
                margin: 0,
                lineHeight: 'var(--lh-body-sm)',
              }}
            >
              {getCopy(phase.resultsKey)}
            </p>
            <p
              style={{
                fontFamily: 'var(--font-host-grotesk)',
                fontSize: 'var(--text-caption)',
                fontWeight: 600,
                color: 'var(--color-accent)',
                margin: 0,
                marginTop: 'var(--space-2)',
                lineHeight: 'var(--lh-body-sm)',
              }}
            >
              {getCopy(phase.metricsKey)}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── COMPONENTE PRINCIPAL ────────────────────────────────────────────────────

interface ProgramaCompletoProps {
  hasPaid: boolean
}

export default function ProgramaCompleto({ hasPaid }: ProgramaCompletoProps) {
  const { getCopy } = useCopy()
  const [openPhaseId, setOpenPhaseId] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.1 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={containerRef}
      style={{
        marginBottom: 'var(--space-6)',
        borderRadius: 16,
        overflow: 'hidden',
        border: '1px solid var(--color-surface-subtle)',
        background: 'var(--color-bg-secondary)',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
        transition:
          'opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* Header */}
      <div style={{ padding: 'var(--space-5) var(--space-4) var(--space-2)' }}>
        <h3
          style={{
            fontFamily: 'var(--font-host-grotesk)',
            fontSize: 'var(--text-body)',
            fontWeight: 700,
            color: 'var(--color-text-primary)',
            margin: 0,
            lineHeight: 1.3,
          }}
        >
          Programa L.A.R.S.© Liderazgo de alto rendimiento sostenible
        </h3>
      </div>

      {/* Phase accordions */}
      {PHASES.map((phase, i) => (
        <PhaseAccordion
          key={phase.id}
          phase={phase}
          isOpen={openPhaseId === phase.id}
          onToggle={() => setOpenPhaseId(openPhaseId === phase.id ? null : phase.id)}
          isActive={phase.id === 1}
          hasPaid={hasPaid}
          getCopy={getCopy}
        />
      ))}
    </div>
  )
}
