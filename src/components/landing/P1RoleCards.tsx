'use client'

/**
 * P1RoleCards — Nueva primera pregunta visual del gateway.
 * 4 cards con ilustraciones SVG: rol profesional.
 * Visible en el hero sin botón intermedio.
 * Al seleccionar, activa el gateway (que ahora empieza con la antigua P1).
 */

import React, { useState, useEffect, useCallback } from 'react'

const ROLES = [
  { id: 'leader', label: 'Lidero equipos' },
  { id: 'entrepreneur', label: 'Mi propio negocio' },
  { id: 'employee', label: 'Trabajo para otros' },
  { id: 'caregiver', label: 'Cuido o enseño' },
] as const

interface P1RoleCardsProps {
  onSelect?: (roleId: string) => void
  animateEntrance?: boolean
}

/* ── SVG Illustrations ─────────────────────────────────────────────────────── */

function LeaderIllustration() {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="60" cy="28" r="10" stroke="var(--color-primary)" strokeWidth="2.5" />
      <path d="M60 38 L60 68" stroke="var(--color-primary)" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M60 48 L44 58" stroke="var(--color-primary)" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M60 48 L76 58" stroke="var(--color-primary)" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M50 68 L60 68 L70 68" stroke="var(--color-primary)" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="30" cy="52" r="7" stroke="var(--color-accent)" strokeWidth="1.8" opacity="0.7" />
      <path d="M30 59 L30 80" stroke="var(--color-accent)" strokeWidth="1.8" strokeLinecap="round" opacity="0.7" />
      <circle cx="90" cy="52" r="7" stroke="var(--color-accent)" strokeWidth="1.8" opacity="0.7" />
      <path d="M90 59 L90 80" stroke="var(--color-accent)" strokeWidth="1.8" strokeLinecap="round" opacity="0.7" />
      <path d="M48 35 L37 48" stroke="rgba(38,66,51,0.2)" strokeWidth="1.5" strokeDasharray="3 3" />
      <path d="M72 35 L83 48" stroke="rgba(38,66,51,0.2)" strokeWidth="1.5" strokeDasharray="3 3" />
      <path d="M52 42 L68 42" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
      <circle cx="18" cy="74" r="5" stroke="var(--color-primary)" strokeWidth="1.2" opacity="0.35" />
      <circle cx="42" cy="86" r="5" stroke="var(--color-primary)" strokeWidth="1.2" opacity="0.35" />
      <circle cx="78" cy="86" r="5" stroke="var(--color-primary)" strokeWidth="1.2" opacity="0.35" />
      <circle cx="102" cy="74" r="5" stroke="var(--color-primary)" strokeWidth="1.2" opacity="0.35" />
    </svg>
  )
}

function EntrepreneurIllustration() {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="60" cy="30" r="10" stroke="var(--color-primary)" strokeWidth="2.5" />
      <path d="M60 40 L60 72" stroke="var(--color-primary)" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M50 72 L60 72 L70 72" stroke="var(--color-primary)" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M60 50 L30 44" stroke="var(--color-primary)" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M60 50 L90 44" stroke="var(--color-primary)" strokeWidth="2.5" strokeLinecap="round" />
      <rect x="18" y="32" width="16" height="12" rx="3" stroke="var(--color-accent)" strokeWidth="1.8" opacity="0.6" />
      <path d="M24 36 L30 36" stroke="var(--color-accent)" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
      <path d="M24 40 L28 40" stroke="var(--color-accent)" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
      <circle cx="92" cy="32" r="8" stroke="var(--color-accent)" strokeWidth="1.8" opacity="0.6" />
      <path d="M92 28 L92 32 L96 34" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      <path d="M50 22 L70 22" stroke="rgba(38,66,51,0.2)" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M46 18 L74 18" stroke="rgba(38,66,51,0.15)" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M36 48 L36 56" stroke="rgba(205,121,108,0.4)" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M33 53 L36 56 L39 53" stroke="rgba(205,121,108,0.4)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M84 48 L84 56" stroke="rgba(205,121,108,0.4)" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M81 53 L84 56 L87 53" stroke="rgba(205,121,108,0.4)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M40 88 L80 88" stroke="rgba(38,66,51,0.12)" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function EmployeeIllustration() {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="22" y="18" width="76" height="72" rx="6" stroke="rgba(38,66,51,0.2)" strokeWidth="1.8" />
      <path d="M22 36 L98 36" stroke="rgba(38,66,51,0.12)" strokeWidth="1.2" />
      <path d="M22 54 L98 54" stroke="rgba(38,66,51,0.12)" strokeWidth="1.2" />
      <circle cx="44" cy="27" r="4" stroke="var(--color-primary)" strokeWidth="1.2" opacity="0.3" />
      <circle cx="60" cy="27" r="4" stroke="var(--color-primary)" strokeWidth="1.2" opacity="0.3" />
      <circle cx="76" cy="27" r="4" stroke="var(--color-primary)" strokeWidth="1.2" opacity="0.3" />
      <circle cx="38" cy="45" r="4" stroke="var(--color-primary)" strokeWidth="1.2" opacity="0.25" />
      <circle cx="82" cy="45" r="4" stroke="var(--color-primary)" strokeWidth="1.2" opacity="0.25" />
      <circle cx="60" cy="65" r="8" stroke="var(--color-primary)" strokeWidth="2.5" />
      <path d="M60 73 L60 88" stroke="var(--color-primary)" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M60 54 L60 57" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
      <path d="M57 55.5 L60 58.5 L63 55.5" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.5" />
      <path d="M38 65 L50 65" stroke="rgba(205,121,108,0.3)" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M70 65 L82 65" stroke="rgba(205,121,108,0.3)" strokeWidth="1.5" strokeLinecap="round" />
      <rect x="72" y="72" width="10" height="8" rx="1.5" stroke="rgba(38,66,51,0.25)" strokeWidth="1.2" />
      <rect x="74" y="62" width="10" height="8" rx="1.5" stroke="rgba(38,66,51,0.2)" strokeWidth="1.2" />
    </svg>
  )
}

function CaregiverIllustration() {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="60" cy="32" r="10" stroke="var(--color-primary)" strokeWidth="2.5" />
      <path d="M60 42 L60 70" stroke="var(--color-primary)" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M50 70 L60 70 L70 70" stroke="var(--color-primary)" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M60 52 L36 46" stroke="var(--color-primary)" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M60 52 L84 46" stroke="var(--color-primary)" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="22" cy="50" r="6" stroke="var(--color-accent)" strokeWidth="1.5" opacity="0.6" />
      <path d="M28 50 L34 48" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      <circle cx="98" cy="50" r="6" stroke="var(--color-accent)" strokeWidth="1.5" opacity="0.6" />
      <path d="M92 50 L86 48" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      <circle cx="40" cy="86" r="6" stroke="var(--color-accent)" strokeWidth="1.5" opacity="0.6" />
      <path d="M44 82 L52 74" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      <circle cx="80" cy="86" r="6" stroke="var(--color-accent)" strokeWidth="1.5" opacity="0.6" />
      <path d="M76 82 L68 74" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      <path d="M34 44 L30 42" stroke="rgba(205,121,108,0.35)" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M32 48 L26 48" stroke="rgba(205,121,108,0.35)" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M86 44 L90 42" stroke="rgba(205,121,108,0.35)" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M88 48 L94 48" stroke="rgba(205,121,108,0.35)" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}

const ILLUSTRATIONS: Record<string, () => React.ReactElement> = {
  leader: LeaderIllustration,
  entrepreneur: EntrepreneurIllustration,
  employee: EmployeeIllustration,
  caregiver: CaregiverIllustration,
}

/* ── Component ─────────────────────────────────────────────────────────────── */

export default function P1RoleCards({ onSelect, animateEntrance = false }: P1RoleCardsProps) {
  const [selected, setSelected] = useState<string | null>(null)
  const [isPulsing, setIsPulsing] = useState(false)
  const [revealedCards, setRevealedCards] = useState<number>(-1)
  const [labelRevealed, setLabelRevealed] = useState(false)

  // Escucha el evento del CTA de below-the-fold para hacer pulse
  useEffect(() => {
    const handler = () => {
      setIsPulsing(true)
      const timer = setTimeout(() => setIsPulsing(false), 500)
      return () => clearTimeout(timer)
    }
    window.addEventListener('scrollToP1', handler)
    return () => window.removeEventListener('scrollToP1', handler)
  }, [])

  // Stagger entrance
  useEffect(() => {
    if (!animateEntrance) return
    setLabelRevealed(true)
    const timers: ReturnType<typeof setTimeout>[] = []
    ROLES.forEach((_, i) => {
      timers.push(setTimeout(() => setRevealedCards(i), 100 + i * 150))
    })
    return () => timers.forEach(clearTimeout)
  }, [animateEntrance])

  const handleSelect = useCallback((id: string) => {
    if (selected === id) return
    setSelected(id)
    setTimeout(() => onSelect?.(id), 600)
  }, [selected, onSelect])

  return (
    <div
      id="p1-section"
      className={isPulsing ? 'p1-pulse' : ''}
      style={{ width: '100%' }}
    >
      {/* Pregunta */}
      <p
        className={animateEntrance ? `hero-reveal${labelRevealed ? ' hero-animate-fade-in' : ''}` : ''}
        style={{
          fontFamily: 'var(--font-host-grotesk)',
          fontSize: 'var(--text-h3)',
          lineHeight: 'var(--lh-h3)',
          letterSpacing: 'var(--ls-h3)',
          fontWeight: 500,
          color: 'var(--color-text-primary)',
          marginBottom: 'var(--space-5)',
          textAlign: 'center',
        }}
      >
        ¿Cuál describe mejor tu día a día?
      </p>

      {/* Grid de cards — 2×2 en móvil, 4 en desktop */}
      <div
        role="radiogroup"
        aria-label="¿Cuál describe mejor tu día a día?"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 'var(--space-4)',
          maxWidth: '560px',
          margin: '0 auto',
        }}
      >
        {ROLES.map((role, index) => {
          const isSelected = selected === role.id
          const shouldAnimate = animateEntrance
          const isRevealed = !shouldAnimate || index <= revealedCards
          const Illustration = ILLUSTRATIONS[role.id]

          return (
            <button
              key={role.id}
              role="radio"
              aria-checked={isSelected}
              aria-label={role.label}
              onClick={() => handleSelect(role.id)}
              className={shouldAnimate ? `p1-card-reveal${isRevealed ? ' p1-card-animate' : ''}` : ''}
              style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                background: isSelected ? 'var(--color-bg-secondary)' : 'var(--color-bg-primary)',
                border: isSelected
                  ? '2px solid var(--color-primary)'
                  : '1.5px solid rgba(38,66,51,0.10)',
                borderRadius: 'var(--radius-lg)',
                padding: 0,
                cursor: selected && !isSelected ? 'default' : 'pointer',
                overflow: 'hidden',
                transition: 'all 300ms cubic-bezier(0.65, 0, 0.35, 1)',
                opacity: selected && !isSelected ? 0.5 : 1,
                pointerEvents: selected && !isSelected ? 'none' : 'auto',
                animation: isSelected ? 'selectPulse 300ms cubic-bezier(0.34, 1.56, 0.64, 1)' : 'none',
              }}
            >
              {/* Check badge */}
              <div
                style={{
                  position: 'absolute',
                  top: '8px',
                  right: '8px',
                  width: '22px',
                  height: '22px',
                  borderRadius: '50%',
                  background: 'var(--color-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: isSelected ? 1 : 0,
                  transform: isSelected ? 'scale(1)' : 'scale(0.5)',
                  transition: 'all 300ms cubic-bezier(0.34, 1.56, 0.64, 1)',
                  zIndex: 2,
                }}
                aria-hidden="true"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>

              {/* Illustration area */}
              <div
                style={{
                  width: '100%',
                  aspectRatio: '1.1',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: isSelected ? 'var(--color-bg-secondary)' : '#F7FAF8',
                  transition: 'background 300ms ease',
                  padding: '20px',
                }}
              >
                <div style={{ width: '80%', maxWidth: '120px' }}>
                  <Illustration />
                </div>
              </div>

              {/* Label */}
              <div
                style={{
                  padding: 'var(--space-3) var(--space-4) var(--space-4)',
                  textAlign: 'center',
                  width: '100%',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-host-grotesk)',
                    fontSize: 'var(--text-body-sm)',
                    fontWeight: 600,
                    color: 'var(--color-text-primary)',
                    lineHeight: '1.3',
                  }}
                >
                  {role.label}
                </span>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
