'use client'

/**
 * /admin/automations — Email Automations Dashboard
 *
 * Javi ve de un vistazo todo el sistema de emails automáticos:
 * qué se manda, cuándo, con qué lógica, stats de apertura,
 * y el flujo visual completo de la secuencia de nurturing.
 *
 * Auth centralizada en AdminLayout.
 */

import { useState, useEffect, useCallback } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import AutomationsStats from '@/components/admin/AutomationsStats'
import AutomationsFlow from '@/components/admin/AutomationsFlow'

// ── Types ───────────────────────────────────────────────────────────────────

interface EmailData {
  key: string
  name: string
  subject: string
  trigger: string
  day: number
  sent: number
  opened: number
  open_rate: number
}

interface GlobalStats {
  total_sent: number
  avg_open_rate: number
  unsubscribes: number
  unsubscribe_rate: number
}

interface AutomationsData {
  emails: EmailData[]
  global_stats: GlobalStats
}

// ── Component ───────────────────────────────────────────────────────────────

export default function AutomationsPage() {
  const [data, setData] = useState<AutomationsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchAutomations = useCallback(async () => {
    const secret = sessionStorage.getItem('admin_secret')
    if (!secret) return

    try {
      setLoading(true)
      const res = await fetch('/api/admin/automations', {
        headers: { 'x-admin-secret': secret },
      })

      if (!res.ok) {
        setError('Error cargando datos de automations')
        return
      }

      const json = await res.json()
      setData(json)
      setError(null)
    } catch {
      setError('Error de conexión')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(fetchAutomations, 100)
    return () => clearTimeout(timer)
  }, [fetchAutomations])

  return (
    <AdminLayout>
      {/* Animations + responsive grid */}
      <style>{`
        @keyframes hubPulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
        .automations-stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--space-4);
        }
        @media (max-width: 768px) {
          .automations-stats-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          marginBottom: 'var(--space-8)',
          flexWrap: 'wrap',
          gap: 'var(--space-2)',
        }}
      >
        <h1
          style={{
            fontFamily: 'var(--font-lora)',
            fontSize: 'var(--text-h2)',
            fontWeight: 700,
            color: 'var(--color-text-primary)',
            margin: 0,
          }}
        >
          Automations
        </h1>
        <span
          style={{
            fontFamily: 'var(--font-inter)',
            fontSize: 'var(--text-body-sm)',
            color: 'var(--color-text-tertiary)',
          }}
        >
          Sistema de emails automáticos
        </span>
      </div>

      {/* Error state */}
      {error && (
        <div
          style={{
            background: 'rgba(196, 64, 64, 0.06)',
            border: '1px solid rgba(196, 64, 64, 0.15)',
            borderRadius: 'var(--radius-lg)',
            padding: 'var(--space-5)',
            marginBottom: 'var(--space-6)',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: 'var(--text-body-sm)',
              color: 'var(--color-error)',
              margin: 0,
            }}
          >
            {error}
          </p>
          <button
            onClick={fetchAutomations}
            style={{
              marginTop: 'var(--space-3)',
              fontFamily: 'var(--font-inter)',
              fontSize: '13px',
              fontWeight: 500,
              color: 'var(--color-accent)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
            }}
          >
            Reintentar →
          </button>
        </div>
      )}

      {/* Content */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
        {/* Stats */}
        <AutomationsStats data={data?.global_stats ?? null} loading={loading} />

        {/* Flow */}
        <AutomationsFlow emails={data?.emails ?? null} loading={loading} />
      </div>
    </AdminLayout>
  )
}
