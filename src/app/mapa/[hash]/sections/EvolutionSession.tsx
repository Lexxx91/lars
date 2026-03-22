'use client'

/**
 * EvolutionSession.tsx — Sección Día 10: Sesión con Javier
 *
 * Placeholder: botón con link configurable (env var NEXT_PUBLIC_BOOKING_URL).
 * Se reemplazará por sistema de reservas propio integrado con Google Calendar.
 */

import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'

interface Props {
  isNew: boolean
  booked: boolean
}

export default function EvolutionSession({ isNew, booked }: Props) {
  const bookingUrl =
    process.env.NEXT_PUBLIC_BOOKING_URL ?? '#'

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
      {isNew && !booked && (
        <div style={{ marginBottom: 'var(--space-3)' }}>
          <Badge status="disponible">DISPONIBLE</Badge>
        </div>
      )}

      {/* Título */}
      <p
        style={{
          fontFamily: 'var(--font-inter-tight)',
          fontSize: 'var(--text-h4)',
          fontWeight: 500,
          color: 'var(--color-text-primary)',
          lineHeight: 'var(--lh-h4)',
          marginBottom: 'var(--space-3)',
        }}
      >
        ¿Quieres que Javier revise tu mapa contigo?
      </p>

      {/* Descripción */}
      <p
        style={{
          fontFamily: 'var(--font-inter)',
          fontSize: 'var(--text-body-sm)',
          lineHeight: 'var(--lh-body)',
          color: 'var(--color-text-secondary)',
          marginBottom: 'var(--space-5)',
        }}
      >
        20 minutos. Sin compromiso. Ya tiene tus datos — no repites nada.
      </p>

      {booked ? (
        <p
          style={{
            fontFamily: 'var(--font-inter)',
            fontSize: 'var(--text-body-sm)',
            color: 'var(--color-success)',
          }}
        >
          ✓ Sesión agendada
        </p>
      ) : (
        <a
          href={bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: 'none' }}
        >
          <Button variant="secondary" size="small">
            Agendar sesión gratuita
          </Button>
        </a>
      )}
    </div>
  )
}
