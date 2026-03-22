'use client'

/**
 * EvolutionReevaluation.tsx — Sección Día 30/90: Reevaluación
 *
 * Si no completada: 5 sliders pre-rellenados con valores originales P7.
 * Si completada: comparación old vs new scores con insight delta.
 */

import { useState, useCallback } from 'react'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import {
  getReevaluationInsight,
  getDimensionDelta,
} from '@/lib/content/reevaluation-insights'
import type {
  ReevaluationScores,
  ReevaluationEntry,
} from '@/lib/map-evolution'

interface Props {
  originalSliders: Record<string, number>
  originalScores: ReevaluationScores
  completed: boolean
  isNew: boolean
  completedScores?: ReevaluationScores | null
  reevaluations: ReevaluationEntry[]
  hash: string
  daysSinceCreation: number
}

const DIMENSION_LABELS: Record<string, string> = {
  d1: 'Regulación Nerviosa',
  d2: 'Calidad de Sueño',
  d3: 'Claridad Cognitiva',
  d4: 'Equilibrio Emocional',
  d5: 'Alegría de Vivir',
}

const SLIDER_KEYS = ['d1', 'd2', 'd3', 'd4', 'd5'] as const

export default function EvolutionReevaluation({
  originalSliders,
  originalScores,
  completed,
  isNew,
  completedScores,
  reevaluations,
  hash,
  daysSinceCreation,
}: Props) {
  const [sliders, setSliders] = useState<Record<string, number>>(() => {
    const init: Record<string, number> = {}
    for (const k of SLIDER_KEYS) {
      init[k] = originalSliders[k] ?? 5
    }
    return init
  })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<ReevaluationScores | null>(
    completedScores ?? null,
  )

  const isQuarterly = daysSinceCreation >= 90
  const badgeLabel = isQuarterly
    ? `${Math.floor(daysSinceCreation / 30)} MESES`
    : 'UN MES'

  const handleSubmit = useCallback(async () => {
    if (submitting) return
    setSubmitting(true)
    setError(null)

    try {
      const res = await fetch(`/api/mapa/${hash}/reevaluacion`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sliders, daysSinceCreation }),
      })
      if (!res.ok) {
        setError('Error al guardar. Inténtalo de nuevo.')
        setSubmitting(false)
        return
      }
      const data = await res.json()
      setResult(data.newScores)
    } catch {
      setError('Error de conexión. Inténtalo de nuevo.')
      setSubmitting(false)
    }
  }, [submitting, hash, sliders, daysSinceCreation])

  // ── Vista: Comparación (completada o resultado recién recibido) ──
  if (completed || result) {
    const newScores = result ?? completedScores!
    const insight = getReevaluationInsight(
      originalScores,
      newScores,
      daysSinceCreation,
    )

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
        {/* Headline */}
        <p
          style={{
            fontFamily: 'var(--font-plus-jakarta)',
            fontSize: 'var(--text-h3)',
            fontWeight: 700,
            color:
              insight.tone === 'urgency'
                ? 'var(--color-error)'
                : insight.tone === 'reinforcement'
                  ? 'var(--color-success)'
                  : 'var(--color-text-primary)',
            lineHeight: 'var(--lh-h3)',
            marginBottom: 'var(--space-3)',
          }}
        >
          {insight.headline}
        </p>

        {/* Body */}
        <p
          style={{
            fontFamily: 'var(--font-inter)',
            fontSize: 'var(--text-body-sm)',
            lineHeight: 'var(--lh-body)',
            color: 'var(--color-text-secondary)',
            marginBottom: 'var(--space-6)',
          }}
        >
          {insight.body}
        </p>

        {/* Comparación por dimensión */}
        {SLIDER_KEYS.map((k) => {
          const oldScore =
            originalScores[k as keyof ReevaluationScores] as number
          const newScore = newScores[k as keyof ReevaluationScores] as number
          const delta = getDimensionDelta(DIMENSION_LABELS[k], oldScore, newScore)

          return (
            <div
              key={k}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 'var(--space-2) 0',
                borderBottom: 'var(--border-subtle)',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-inter)',
                  fontSize: 'var(--text-body-sm)',
                  color: 'var(--color-text-primary)',
                }}
              >
                {DIMENSION_LABELS[k]}
              </span>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-3)',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-inter)',
                    fontSize: 'var(--text-caption)',
                    color: 'var(--color-text-tertiary)',
                  }}
                >
                  {oldScore}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-inter)',
                    fontSize: 'var(--text-caption)',
                    color: 'var(--color-text-tertiary)',
                  }}
                >
                  →
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-plus-jakarta)',
                    fontSize: 'var(--text-body-sm)',
                    fontWeight: 600,
                    color: delta.color,
                  }}
                >
                  {newScore}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-inter)',
                    fontSize: 'var(--text-caption)',
                    color: delta.color,
                  }}
                >
                  ({delta.label})
                </span>
              </div>
            </div>
          )
        })}

        {/* Historial previo */}
        {reevaluations.length > 0 && (
          <div style={{ marginTop: 'var(--space-4)' }}>
            <p
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: 'var(--text-caption)',
                color: 'var(--color-text-tertiary)',
              }}
            >
              Reevaluaciones anteriores: {reevaluations.length}
            </p>
          </div>
        )}
      </div>
    )
  }

  // ── Vista: Sliders (no completada) ──
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
          <Badge status="un_mes">{badgeLabel}</Badge>
        </div>
      )}

      {/* Título */}
      <p
        style={{
          fontFamily: 'var(--font-plus-jakarta)',
          fontSize: 'var(--text-h4)',
          fontWeight: 600,
          color: 'var(--color-text-primary)',
          lineHeight: 'var(--lh-h4)',
          marginBottom: 'var(--space-2)',
        }}
      >
        {isQuarterly
          ? `${Math.floor(daysSinceCreation / 30)} meses desde tu diagnóstico`
          : 'Un mes desde tu diagnóstico'}
      </p>

      <p
        style={{
          fontFamily: 'var(--font-inter)',
          fontSize: 'var(--text-body-sm)',
          lineHeight: 'var(--lh-body)',
          color: 'var(--color-text-secondary)',
          marginBottom: 'var(--space-6)',
        }}
      >
        ¿Ha cambiado algo? Mueve los sliders para actualizar tu mapa.
      </p>

      {/* 5 Sliders */}
      {SLIDER_KEYS.map((k) => (
        <div key={k} style={{ marginBottom: 'var(--space-5)' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: 'var(--space-2)',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: 'var(--text-body-sm)',
                color: 'var(--color-text-primary)',
              }}
            >
              {DIMENSION_LABELS[k]}
            </span>
            <span
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: 'var(--text-caption)',
                color: 'var(--color-text-tertiary)',
              }}
            >
              {sliders[k]}/10
            </span>
          </div>
          <input
            type="range"
            min={1}
            max={10}
            value={sliders[k]}
            onChange={(e) =>
              setSliders((prev) => ({
                ...prev,
                [k]: parseInt(e.target.value, 10),
              }))
            }
            style={{
              width: '100%',
              accentColor: 'var(--color-accent)',
            }}
          />
        </div>
      ))}

      {/* Error */}
      {error && (
        <p
          style={{
            fontFamily: 'var(--font-inter)',
            fontSize: 'var(--text-body-sm)',
            color: 'var(--color-error)',
            marginBottom: 'var(--space-3)',
          }}
        >
          {error}
        </p>
      )}

      {/* Submit */}
      <Button
        variant="secondary"
        size="small"
        onClick={handleSubmit}
        disabled={submitting}
        style={{ width: '100%' }}
      >
        {submitting ? 'Calculando...' : 'Actualizar mi mapa'}
      </Button>
    </div>
  )
}
