/**
 * /admin/analytics — Panel de analytics L.A.R.S.
 *
 * Muestra el embudo completo, métricas clave y últimos diagnósticos.
 * Datos reales de Supabase.
 */

import AnalyticsDashboard from './AnalyticsDashboard'

export const metadata = {
  title: 'Panel L.A.R.S. · Analytics',
  robots: { index: false, follow: false },
}

export default function AnalyticsPage() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'var(--color-bg-primary)',
      padding: 'var(--space-8) var(--space-6)',
    }}>
      <div style={{ maxWidth: '960px', margin: '0 auto' }}>
        <AnalyticsDashboard />
      </div>
    </div>
  )
}
