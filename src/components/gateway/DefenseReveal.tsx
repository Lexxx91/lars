'use client'

/**
 * DefenseReveal — Momento WOW del mecanismo de defensa adaptativo
 *
 * Revelación progresiva en 3 beats:
 * T=0.0s  Componente monta. Nada visible.
 * T=0.6s  Overline "Tu mecanismo de defensa adaptativo"
 * T=1.2s  Nombre del mecanismo (ej: "El Obsesivo") — grande, impactante
 * T=2.0s  Teaser — frase espejo que engancha ("Esto soy yo")
 * T=3.2s  Contexto neurocientífico: wound → armor
 * T=4.2s  Botón continuar
 */

import { useState, useEffect } from 'react'
import type { ArchetypeData } from '@/lib/content/archetypes'

interface DefenseRevealProps {
  archetype: ArchetypeData
  onContinue: () => void
}

function fadeStyle(visible: boolean, delay = 0): React.CSSProperties {
  return {
    opacity: visible ? 1 : 0,
    transform: visible ? 'none' : 'translateY(14px)',
    transition: `opacity 600ms var(--ease-out-expo) ${delay}ms, transform 600ms var(--ease-out-expo) ${delay}ms`,
  }
}

export default function DefenseReveal({ archetype, onContinue }: DefenseRevealProps) {
  const [showOverline, setShowOverline] = useState(false)
  const [showName, setShowName]         = useState(false)
  const [showTeaser, setShowTeaser]     = useState(false)
  const [showContext, setShowContext]    = useState(false)
  const [showButton, setShowButton]     = useState(false)

  useEffect(() => {
    const timers = [
      setTimeout(() => setShowOverline(true), 600),
      setTimeout(() => setShowName(true), 1200),
      setTimeout(() => setShowTeaser(true), 2000),
      setTimeout(() => setShowContext(true), 3200),
      setTimeout(() => setShowButton(true), 4200),
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  // prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) {
      setShowOverline(true)
      setShowName(true)
      setShowTeaser(true)
      setShowContext(true)
      setShowButton(true)
    }
  }, [])

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '70vh',
        gap: 'var(--space-5)',
      }}
    >
      <div
        style={{
          background: 'var(--color-bg-secondary)',
          border: '1px solid rgba(205,121,108,0.1)',
          borderRadius: '16px',
          padding: '48px 32px',
          maxWidth: '520px',
          width: '100%',
        }}
      >
        {/* Overline */}
        <p
          style={{
            ...fadeStyle(showOverline),
            fontFamily: 'var(--font-host-grotesk)',
            fontSize: 'var(--text-caption)',
            letterSpacing: 'var(--ls-overline)',
            textTransform: 'uppercase',
            color: 'var(--color-text-tertiary)',
            marginBottom: 'var(--space-4)',
            textAlign: 'center',
          }}
        >
          Tu mecanismo de defensa adaptativo
        </p>

        {/* Nombre del mecanismo */}
        <h2
          style={{
            ...fadeStyle(showName),
            fontFamily: 'var(--font-host-grotesk)',
            fontSize: 'clamp(2rem, 6vw, 2.75rem)',
            fontWeight: 700,
            lineHeight: 1.15,
            letterSpacing: 'var(--ls-display)',
            color: 'var(--color-text-primary)',
            textAlign: 'center',
            marginBottom: 'var(--space-5)',
          }}
        >
          {archetype.name}
        </h2>

        {/* Teaser — frase espejo de impacto */}
        <p
          style={{
            ...fadeStyle(showTeaser),
            fontFamily: 'var(--font-host-grotesk)',
            fontSize: 'var(--text-h4)',
            fontStyle: 'italic',
            lineHeight: 'var(--lh-h4)',
            color: 'var(--color-text-secondary)',
            textAlign: 'center',
            maxWidth: '38rem',
            margin: '0 auto',
            marginBottom: 'var(--space-6)',
          }}
        >
          {archetype.teaser}
        </p>

        {/* Separador */}
        <div
          style={{
            ...fadeStyle(showContext),
            height: '1px',
            background: 'rgba(38,66,51,0.06)',
            margin: '0 0 var(--space-5)',
          }}
        />

        {/* Contexto neurocientífico: por qué tu SN adoptó este mecanismo */}
        <div style={fadeStyle(showContext)}>
          <p
            style={{
              fontFamily: 'var(--font-host-grotesk)',
              fontSize: 'var(--text-body-sm)',
              letterSpacing: 'var(--ls-overline)',
              textTransform: 'uppercase',
              color: 'var(--color-text-tertiary)',
              marginBottom: 'var(--space-3)',
              textAlign: 'center',
            }}
          >
            Por qu\u00e9 tu sistema nervioso hace esto
          </p>
          <p
            style={{
              fontFamily: 'var(--font-host-grotesk)',
              fontSize: 'var(--text-body)',
              lineHeight: 'var(--lh-body)',
              color: 'var(--color-text-secondary)',
              textAlign: 'center',
            }}
          >
            Tu herida de la{' '}
            <strong style={{ color: 'var(--color-text-primary)', fontWeight: 600 }}>
              {archetype.wound.toLowerCase()}
            </strong>{' '}
            activ\u00f3 una armadura de{' '}
            <strong style={{ color: 'var(--color-text-primary)', fontWeight: 600 }}>
              {archetype.armor.toLowerCase()}
            </strong>
            . {archetype.snState.charAt(0).toUpperCase() + archetype.snState.slice(1)}.
          </p>
        </div>
      </div>

      {/* Bot\u00f3n continuar */}
      <button
        onClick={onContinue}
        style={{
          ...fadeStyle(showButton),
          width: '100%',
          maxWidth: '520px',
          padding: 'var(--space-4) var(--space-6)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid rgba(205,121,108,0.25)',
          background: 'transparent',
          color: 'var(--color-text-secondary)',
          fontFamily: 'var(--font-host-grotesk)',
          fontSize: 'var(--text-body-sm)',
          cursor: 'pointer',
          transition: 'color var(--transition-fast), border-color var(--transition-fast)',
          minHeight: '44px',
          pointerEvents: showButton ? 'auto' : 'none',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = 'var(--color-text-primary)'
          e.currentTarget.style.borderColor = 'rgba(205,121,108,0.5)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = 'var(--color-text-secondary)'
          e.currentTarget.style.borderColor = 'rgba(205,121,108,0.25)'
        }}
      >
        Ver mi evaluaci\u00f3n completa \u2192
      </button>
    </div>
  )
}
