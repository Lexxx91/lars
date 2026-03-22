'use client'

/**
 * EvolutionArchetype.tsx — Sección Día 3: Arquetipo del Sistema Nervioso
 *
 * Muestra el arquetipo con teaser + expandible con patrones y 3 capas de necesidad.
 */

import { useState } from 'react'
import Badge from '@/components/ui/Badge'
import type { ArchetypeData } from '@/lib/content/archetypes'

interface Props {
  archetype: ArchetypeData
  isNew: boolean
}

export default function EvolutionArchetype({ archetype, isNew }: Props) {
  const [patternsOpen, setPatternsOpen] = useState(false)
  const [needsOpen, setNeedsOpen] = useState(false)

  return (
    <div
      className="mapa-fade-up"
      style={{
        backgroundColor: 'var(--color-bg-secondary)',
        border: 'var(--border-subtle)',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-6)',
      }}
    >
      {/* Badge */}
      {isNew && (
        <div style={{ marginBottom: 'var(--space-3)' }}>
          <Badge status="nuevo">NUEVO</Badge>
        </div>
      )}

      {/* Overline */}
      <p
        style={{
          fontFamily: 'var(--font-inter-tight)',
          fontSize: 'var(--text-overline)',
          letterSpacing: 'var(--ls-overline)',
          textTransform: 'uppercase',
          color: 'var(--color-accent)',
          marginBottom: 'var(--space-2)',
        }}
      >
        Tu arquetipo
      </p>

      {/* Nombre */}
      <h3
        style={{
          fontFamily: 'var(--font-plus-jakarta)',
          fontSize: 'var(--text-h2)',
          fontWeight: 700,
          color: 'var(--color-text-primary)',
          lineHeight: 'var(--lh-h2)',
          marginBottom: 'var(--space-2)',
        }}
      >
        {archetype.name}
      </h3>

      {/* Descriptores */}
      <p
        style={{
          fontFamily: 'var(--font-inter)',
          fontSize: 'var(--text-body-sm)',
          color: 'var(--color-text-tertiary)',
          marginBottom: 'var(--space-2)',
        }}
      >
        {archetype.descriptors}
      </p>

      {/* Herida + Armadura */}
      <p
        style={{
          fontFamily: 'var(--font-inter)',
          fontSize: 'var(--text-body-sm)',
          color: 'var(--color-text-secondary)',
          marginBottom: 'var(--space-2)',
        }}
      >
        Herida de la {archetype.wound.toLowerCase()} → Armadura de{' '}
        {archetype.armor.toLowerCase()}
      </p>

      {/* Estado SN */}
      <p
        style={{
          fontFamily: 'var(--font-inter)',
          fontSize: 'var(--text-caption)',
          color: 'var(--color-accent)',
          marginBottom: 'var(--space-4)',
          opacity: 0.8,
        }}
      >
        {archetype.snState}
      </p>

      {/* Teaser */}
      <p
        style={{
          fontFamily: 'var(--font-cormorant)',
          fontSize: 'var(--text-h3)',
          fontStyle: 'italic',
          lineHeight: 'var(--lh-h3)',
          color: 'var(--color-text-primary)',
          marginBottom: 'var(--space-5)',
        }}
      >
        &ldquo;{archetype.teaser}&rdquo;
      </p>

      {/* ── Expandible: Patrones de Burnout ── */}
      <button
        onClick={() => setPatternsOpen((o) => !o)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'transparent',
          border: 'none',
          borderTop: 'var(--border-subtle)',
          fontFamily: 'var(--font-inter)',
          fontSize: 'var(--text-body-sm)',
          color: 'var(--color-text-secondary)',
          cursor: 'pointer',
          padding: 'var(--space-4) 0',
          transition: 'color var(--transition-base)',
        }}
      >
        <span>Tus patrones de burnout</span>
        <span
          style={{
            display: 'inline-block',
            transform: patternsOpen ? 'rotate(180deg)' : 'none',
            transition: 'transform var(--transition-base)',
            fontSize: '16px',
          }}
        >
          ↓
        </span>
      </button>

      {patternsOpen && (
        <div style={{ paddingBottom: 'var(--space-4)' }}>
          {archetype.patterns.map((p) => (
            <div key={p.name} style={{ marginBottom: 'var(--space-4)' }}>
              <p
                style={{
                  fontFamily: 'var(--font-inter-tight)',
                  fontSize: 'var(--text-body-sm)',
                  fontWeight: 500,
                  color: 'var(--color-text-primary)',
                  marginBottom: 'var(--space-1)',
                }}
              >
                {p.name}
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-inter)',
                  fontSize: 'var(--text-body-sm)',
                  lineHeight: 'var(--lh-body)',
                  color: 'var(--color-text-secondary)',
                }}
              >
                {p.description}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* ── Expandible: Tres Capas de Necesidad ── */}
      <button
        onClick={() => setNeedsOpen((o) => !o)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'transparent',
          border: 'none',
          borderTop: 'var(--border-subtle)',
          fontFamily: 'var(--font-inter)',
          fontSize: 'var(--text-body-sm)',
          color: 'var(--color-text-secondary)',
          cursor: 'pointer',
          padding: 'var(--space-4) 0 0',
          transition: 'color var(--transition-base)',
        }}
      >
        <span>Tus tres capas de necesidad</span>
        <span
          style={{
            display: 'inline-block',
            transform: needsOpen ? 'rotate(180deg)' : 'none',
            transition: 'transform var(--transition-base)',
            fontSize: '16px',
          }}
        >
          ↓
        </span>
      </button>

      {needsOpen && (
        <div style={{ paddingTop: 'var(--space-4)' }}>
          {/* Bioquímica (más urgente) */}
          <NeedLayerSection
            layer={archetype.needs.biochemical}
            urgencyLabel="Más urgente"
            accentColor="var(--color-error)"
          />
          {/* Sistema Nervioso */}
          <NeedLayerSection
            layer={archetype.needs.nervousSystem}
            urgencyLabel="Plataforma"
            accentColor="var(--color-accent)"
          />
          {/* Emocional (más profunda) */}
          <NeedLayerSection
            layer={archetype.needs.emotional}
            urgencyLabel="Más profunda"
            accentColor="var(--color-success)"
          />
        </div>
      )}
    </div>
  )
}

// ─── Subcomponente: capa de necesidad ─────────────────────────────────────────

function NeedLayerSection({
  layer,
  urgencyLabel,
  accentColor,
}: {
  layer: { title: string; items: string[]; explanation: string }
  urgencyLabel: string
  accentColor: string
}) {
  return (
    <div
      style={{
        marginBottom: 'var(--space-5)',
        paddingLeft: 'var(--space-4)',
        borderLeft: `2px solid ${accentColor}`,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-2)',
          marginBottom: 'var(--space-2)',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-inter-tight)',
            fontSize: 'var(--text-body-sm)',
            fontWeight: 500,
            color: 'var(--color-text-primary)',
          }}
        >
          {layer.title}
        </span>
        <span
          style={{
            fontFamily: 'var(--font-inter)',
            fontSize: 'var(--text-caption)',
            color: accentColor,
            opacity: 0.8,
          }}
        >
          {urgencyLabel}
        </span>
      </div>
      <ul
        style={{
          listStyle: 'none',
          padding: 0,
          margin: '0 0 var(--space-2) 0',
        }}
      >
        {layer.items.map((item) => (
          <li
            key={item}
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: 'var(--text-body-sm)',
              lineHeight: 'var(--lh-body)',
              color: 'var(--color-text-secondary)',
              marginBottom: 'var(--space-1)',
            }}
          >
            · {item}
          </li>
        ))}
      </ul>
      <p
        style={{
          fontFamily: 'var(--font-inter)',
          fontSize: 'var(--text-caption)',
          lineHeight: 'var(--lh-body)',
          color: 'var(--color-text-tertiary)',
          fontStyle: 'italic',
        }}
      >
        {layer.explanation}
      </p>
    </div>
  )
}
