'use client'

/**
 * EvolutionBookExcerpt.tsx — Sección Día 21: Extracto del libro
 *
 * Referencia visual: extracto_libro.png (feedback Javi 01-abr-2026)
 *
 * Muestra extracto del capítulo correspondiente a la dimensión
 * más comprometida. Incluye botón descarga + expandible inline.
 *
 * E2: Rediseño completo per mockup:
 * - Título completo del libro
 * - Subtítulo: "El sistema nervioso que no se apaga"
 * - Contexto con dimensión + score
 * - CTA principal: "DESCARGAR CAP.1 GRATIS" (coral solid)
 * - Link secundario: "Leer extracto ↓" (expandible)
 */

import { useState } from 'react'
import Badge from '@/components/ui/Badge'
import type { BookExcerptData } from '@/lib/content/book-excerpts'

interface Props {
  excerpt: BookExcerptData
  isNew: boolean
  worstDimensionName: string
  worstScore: number
}

export default function EvolutionBookExcerpt({
  excerpt,
  isNew,
  worstDimensionName,
  worstScore,
}: Props) {
  const [expanded, setExpanded] = useState(false)

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
          <Badge status="para_ti">PARA TI</Badge>
        </div>
      )}

      {/* Overline: referencia libro */}
      <p
        style={{
          fontFamily: 'var(--font-host-grotesk)',
          fontSize: 'var(--text-overline)',
          letterSpacing: 'var(--ls-overline)',
          textTransform: 'uppercase',
          color: 'var(--color-text-tertiary)',
          marginBottom: 'var(--space-2)',
        }}
      >
        Extracto Capítulo {excerpt.chapterNumber}
      </p>

      {/* Título del libro completo */}
      <h4
        style={{
          fontFamily: 'var(--font-host-grotesk)',
          fontSize: 'var(--text-h4)',
          fontWeight: 600,
          color: 'var(--color-text-primary)',
          lineHeight: 'var(--lh-h4)',
          marginBottom: 'var(--space-1)',
        }}
      >
        {excerpt.bookTitle}
      </h4>

      {/* Subtítulo capítulo */}
      <p
        style={{
          fontFamily: 'var(--font-host-grotesk)',
          fontSize: 'var(--text-body)',
          fontStyle: 'italic',
          color: 'var(--color-text-secondary)',
          marginBottom: 'var(--space-4)',
        }}
      >
        {excerpt.chapterTitle}
      </p>

      {/* Contexto con dimensión comprometida */}
      <p
        style={{
          fontFamily: 'var(--font-host-grotesk)',
          fontSize: 'var(--text-body-sm)',
          lineHeight: 'var(--lh-body)',
          color: 'var(--color-text-primary)',
          marginBottom: 'var(--space-5)',
        }}
      >
        Tu dimensión más comprometida (<strong>{worstDimensionName}: {worstScore}</strong>) se
        explica en profundidad aquí.
      </p>

      {/* CTA principal: Descargar capítulo */}
      <a
        href={excerpt.bookLink !== '#' ? excerpt.bookLink : '#'}
        target={excerpt.bookLink !== '#' ? '_blank' : undefined}
        rel={excerpt.bookLink !== '#' ? 'noopener noreferrer' : undefined}
        style={{
          display: 'block',
          width: '100%',
          textAlign: 'center',
          fontFamily: 'var(--font-host-grotesk)',
          fontSize: 'var(--text-body-sm)',
          fontWeight: 600,
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
          color: '#ffffff',
          background: '#E8735A',
          border: 'none',
          borderRadius: 'var(--radius-md)',
          padding: 'var(--space-4) var(--space-6)',
          cursor: 'pointer',
          textDecoration: 'none',
          transition: 'opacity var(--transition-base)',
          marginBottom: 'var(--space-4)',
        }}
      >
        Descargar cap.{excerpt.chapterNumber} gratis
      </a>

      {/* Link secundario: Leer extracto inline */}
      <button
        onClick={() => setExpanded((o) => !o)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 'var(--space-2)',
          background: 'transparent',
          border: 'none',
          fontFamily: 'var(--font-host-grotesk)',
          fontSize: 'var(--text-body-sm)',
          color: 'var(--color-accent)',
          cursor: 'pointer',
          padding: 'var(--space-2) 0',
          transition: 'color var(--transition-base)',
        }}
      >
        <span>{expanded ? 'Cerrar extracto' : 'Leer extracto'}</span>
        <span
          style={{
            display: 'inline-block',
            transform: expanded ? 'rotate(180deg)' : 'none',
            transition: 'transform var(--transition-base)',
            fontSize: '14px',
          }}
        >
          ↓
        </span>
      </button>

      {/* Extracto expandible */}
      {expanded && (
        <div
          style={{
            padding: 'var(--space-4) 0 0',
            borderTop: 'var(--border-subtle)',
            marginTop: 'var(--space-2)',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-host-grotesk)',
              fontSize: 'var(--text-body-sm)',
              lineHeight: '1.7',
              color: 'var(--color-text-primary)',
              whiteSpace: 'pre-line',
            }}
          >
            {excerpt.excerpt}
          </div>
        </div>
      )}
    </div>
  )
}
