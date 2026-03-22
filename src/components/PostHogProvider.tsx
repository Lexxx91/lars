'use client'

/**
 * PostHogProvider — inicializa analytics + dispara page_view.
 * Se monta una vez en layout.tsx. No renderiza nada visible.
 */

import { useEffect } from 'react'
import { initPostHog, trackEvent } from '@/lib/posthog'

export default function PostHogProvider({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    initPostHog()

    // Page view con datos de contexto
    const params = new URLSearchParams(window.location.search)
    trackEvent('page_view', {
      source: document.referrer || 'direct',
      utm_source: params.get('utm_source'),
      utm_medium: params.get('utm_medium'),
      utm_campaign: params.get('utm_campaign'),
      utm_intent: params.get('utm_intent'),
    })
  }, [])

  return <>{children}</>
}
