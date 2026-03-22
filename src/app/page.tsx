/**
 * page.tsx — Página principal L.A.R.S.©
 * La landing ES el gateway. Una sola experiencia.
 *
 * GatewayController gestiona el estado de P1 y activa GatewayBloque1
 * como overlay fullscreen cuando el usuario selecciona su respuesta.
 *
 * Si llega con ?utm_intent=ready, activa flujo CONVERT (90 segundos).
 */

import GatewayController from '@/components/GatewayController'

interface PageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export default async function Home({ searchParams }: PageProps) {
  const params = await searchParams
  const utmIntent = typeof params.utm_intent === 'string' ? params.utm_intent : undefined
  const initialMode = utmIntent === 'ready' ? 'convert' as const : undefined

  return (
    <>
      {/* Skip link para lectores de pantalla */}
      <a href="#p1-section" className="skip-link">
        Ir al diagnóstico
      </a>

      <main id="main-content">
        <GatewayController initialMode={initialMode} />
      </main>
    </>
  )
}
