'use client'

interface Props {
  videoUrl: string
  createdAt: string
}

function relativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime()
  const days = Math.floor(diff / 86400000)
  if (days === 0) return 'hoy'
  if (days === 1) return 'hace 1 día'
  if (days < 30) return `hace ${days} días`
  const months = Math.floor(days / 30)
  return months === 1 ? 'hace 1 mes' : `hace ${months} meses`
}

export default function PersonalVideo({ videoUrl, createdAt }: Props) {
  return (
    <div
      className="mapa-fade-up"
      style={{
        background: 'var(--color-bg-secondary)',
        border: 'var(--border-subtle)',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-6)',
      }}
    >
      <p style={{
        fontFamily: 'var(--font-inter-tight)',
        fontSize: 'var(--text-overline)',
        letterSpacing: 'var(--ls-overline)',
        textTransform: 'uppercase',
        color: '#B45A32',
        marginBottom: 'var(--space-2)',
      }}>
        Mensaje personal
      </p>

      <p style={{
        fontFamily: 'var(--font-inter)',
        fontSize: 'var(--text-body)',
        fontWeight: 600,
        color: 'var(--color-text-primary)',
        marginBottom: 'var(--space-4)',
      }}>
        Dr. Javier A. Martín Ramos
      </p>

      <video
        src={videoUrl}
        controls
        preload="metadata"
        playsInline
        style={{
          width: '100%',
          borderRadius: 'var(--radius-md)',
          display: 'block',
        }}
      />

      <p style={{
        fontFamily: 'var(--font-inter)',
        fontSize: 'var(--text-caption)',
        color: 'var(--color-text-tertiary)',
        marginTop: 'var(--space-3)',
        marginBottom: 0,
      }}>
        Recibido {relativeTime(createdAt)}
      </p>
    </div>
  )
}
