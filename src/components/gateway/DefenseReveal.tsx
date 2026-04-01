'use client'

/**
 * DefenseReveal — Pantalla completa del mecanismo de defensa adaptativo (93%)
 *
 * Referencia visual: pre_resultados.png (feedback Javi 01-abr-2026)
 *
 * Estructura B1:
 * - Etiqueta: "TU MECANISMO DE DEFENSA ADAPTATIVO" (coral, uppercase)
 * - Título: Nombre del mecanismo (ej: "El Sumiso") — grande, bold
 * - Tags descriptivos separados por ·
 * - Narrativa: 3 párrafos descriptivos del mecanismo
 * - Creencia Central: borde izquierdo verde oscuro
 * - Creencia de Sanación: borde izquierdo coral
 * - Caja gris: Herida + Armadura + estado SN en coral
 * - Caja NOTA verde oliva: aviso de contenido D2
 * - Botón CTA coral: "Ver mi evaluación completa →"
 */

import { useState, useEffect } from 'react'
import type { ArchetypeData } from '@/lib/content/archetypes'

interface DefenseRevealProps {
  archetype: ArchetypeData
  onContinue: () => void
}

export default function DefenseReveal({ archetype, onContinue }: DefenseRevealProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100)
    return () => clearTimeout(t)
  }, [])

  // Narrative split into paragraphs
  const paragraphs = archetype.narrative.split('\n\n').filter(Boolean)

  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : 'translateY(16px)',
        transition: 'opacity 600ms ease, transform 600ms ease',
        maxWidth: '540px',
        margin: '0 auto',
        paddingBottom: 'var(--space-8)',
      }}
    >
      {/* ── Etiqueta ── */}
      <p
        style={{
          fontFamily: 'var(--font-host-grotesk)',
          fontSize: 'var(--text-body-sm)',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: '#E8735A',
          margin: 0,
          marginBottom: 'var(--space-3)',
        }}
      >
        Tu mecanismo de defensa adaptativo
      </p>

      {/* ── Título: nombre del mecanismo ── */}
      <h2
        style={{
          fontFamily: 'var(--font-host-grotesk)',
          fontSize: 'clamp(2rem, 6vw, 2.75rem)',
          fontWeight: 700,
          lineHeight: 1.15,
          color: 'var(--color-text-primary)',
          margin: 0,
          marginBottom: 'var(--space-3)',
        }}
      >
        {archetype.name}
      </h2>

      {/* ── Tags descriptivos ── */}
      <p
        style={{
          fontFamily: 'var(--font-host-grotesk)',
          fontSize: 'var(--text-body-sm)',
          fontStyle: 'italic',
          color: 'var(--color-text-secondary)',
          margin: 0,
          marginBottom: 'var(--space-6)',
          lineHeight: 'var(--lh-body-sm)',
        }}
      >
        {archetype.descriptors}
      </p>

      {/* ── Narrativa: párrafos descriptivos ── */}
      {paragraphs.map((para, i) => (
        <p
          key={i}
          style={{
            fontFamily: 'var(--font-host-grotesk)',
            fontSize: 'var(--text-body)',
            lineHeight: 'var(--lh-body)',
            color: 'var(--color-text-primary)',
            margin: 0,
            marginBottom: i < paragraphs.length - 1 ? 'var(--space-5)' : 'var(--space-6)',
          }}
        >
          {para}
        </p>
      ))}

      {/* ── Creencia Central ── */}
      <div
        style={{
          borderLeft: '3px solid #2D4A3E',
          padding: 'var(--space-4) var(--space-5)',
          marginBottom: 'var(--space-4)',
          background: 'rgba(45, 74, 62, 0.04)',
          borderRadius: '0 var(--radius-md) var(--radius-md) 0',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-host-grotesk)',
            fontSize: 'var(--text-caption)',
            fontWeight: 600,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: 'var(--color-text-tertiary)',
            margin: 0,
            marginBottom: 'var(--space-2)',
          }}
        >
          Creencia central
        </p>
        <p
          style={{
            fontFamily: 'var(--font-host-grotesk)',
            fontSize: 'var(--text-body)',
            fontStyle: 'italic',
            lineHeight: 'var(--lh-body)',
            color: 'var(--color-text-primary)',
            margin: 0,
          }}
        >
          &ldquo;{archetype.centralBelief}&rdquo;
        </p>
      </div>

      {/* ── Creencia de Sanación ── */}
      <div
        style={{
          borderLeft: '3px solid #E8735A',
          padding: 'var(--space-4) var(--space-5)',
          marginBottom: 'var(--space-6)',
          background: 'rgba(232, 115, 90, 0.04)',
          borderRadius: '0 var(--radius-md) var(--radius-md) 0',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-host-grotesk)',
            fontSize: 'var(--text-caption)',
            fontWeight: 600,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: '#E8735A',
            margin: 0,
            marginBottom: 'var(--space-2)',
          }}
        >
          Creencia de sanación
        </p>
        <p
          style={{
            fontFamily: 'var(--font-host-grotesk)',
            fontSize: 'var(--text-body)',
            fontStyle: 'italic',
            lineHeight: 'var(--lh-body)',
            color: '#E8735A',
            margin: 0,
          }}
        >
          &ldquo;{archetype.healingBelief}&rdquo;
        </p>
      </div>

      {/* ── Caja gris: Herida + Armadura + SN ── */}
      <div
        style={{
          background: 'rgba(38, 66, 51, 0.05)',
          borderRadius: 'var(--radius-md)',
          padding: 'var(--space-5)',
          marginBottom: 'var(--space-5)',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-host-grotesk)',
            fontSize: 'var(--text-body)',
            lineHeight: 'var(--lh-body)',
            color: 'var(--color-text-primary)',
            margin: 0,
            marginBottom: 'var(--space-3)',
          }}
        >
          Herida de la {archetype.wound.toLowerCase()} → Armadura de {archetype.armor.toLowerCase()}
        </p>
        <p
          style={{
            fontFamily: 'var(--font-host-grotesk)',
            fontSize: 'var(--text-body-sm)',
            lineHeight: 'var(--lh-body-sm)',
            color: '#E8735A',
            margin: 0,
            borderTop: '1px solid rgba(232, 115, 90, 0.2)',
            paddingTop: 'var(--space-3)',
          }}
        >
          {archetype.snState.charAt(0).toUpperCase() + archetype.snState.slice(1)}
        </p>
      </div>

      {/* ── Caja NOTA verde oliva ── */}
      <div
        style={{
          background: 'rgba(107, 142, 35, 0.08)',
          border: '1px solid rgba(107, 142, 35, 0.2)',
          borderRadius: 'var(--radius-md)',
          padding: 'var(--space-4) var(--space-5)',
          marginBottom: 'var(--space-6)',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-host-grotesk)',
            fontSize: 'var(--text-body-sm)',
            lineHeight: 'var(--lh-body-sm)',
            color: 'var(--color-text-primary)',
            margin: 0,
          }}
        >
          <strong style={{ color: '#5A7A2B' }}>NOTA:</strong> Mañana recibirás, si lo deseas y de forma gratuita, información ampliada sobre tu mecanismo de defensa adaptativo. Incluirá <em>Miedos principales</em>, <em>Tus tres capas de necesidad</em> y <em>Tus patrones de burnout</em> entre otros.
        </p>
      </div>

      {/* ── Botón CTA ── */}
      <button
        onClick={onContinue}
        style={{
          width: '100%',
          padding: 'var(--space-4) var(--space-6)',
          borderRadius: 'var(--radius-pill)',
          border: 'none',
          background: '#E8735A',
          color: '#ffffff',
          fontFamily: 'var(--font-host-grotesk)',
          fontSize: 'var(--text-body-sm)',
          fontWeight: 600,
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          minHeight: '52px',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = '#d65a45'
          e.currentTarget.style.transform = 'translateY(-1px)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = '#E8735A'
          e.currentTarget.style.transform = 'translateY(0)'
        }}
      >
        Ver mi evaluación completa →
      </button>
    </div>
  )
}
