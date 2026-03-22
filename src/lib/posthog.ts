/**
 * PostHog Analytics — singleton + helper tipado
 *
 * Uso: import { trackEvent } from '@/lib/posthog'
 *      trackEvent('gateway_p1', { option: 'A' })
 *
 * No-op si faltan env vars (dev sin PostHog, SSR, etc.)
 */

import posthog from 'posthog-js'

let initialized = false

export function initPostHog() {
  if (initialized) return
  if (typeof window === 'undefined') return

  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY
  const host = process.env.NEXT_PUBLIC_POSTHOG_HOST

  if (!key) return

  posthog.init(key, {
    api_host: host || 'https://eu.i.posthog.com',
    autocapture: false,          // embudo manual — no ruido
    capture_pageview: false,     // lo disparamos nosotros
    capture_pageleave: true,     // útil para abandono
    persistence: 'localStorage',
    loaded: () => {
      initialized = true
    },
  })

  initialized = true
}

/**
 * Dispara un evento tipado. No-op si PostHog no está inicializado.
 */
export function trackEvent(
  name: string,
  properties?: Record<string, unknown>
) {
  if (!initialized || typeof window === 'undefined') return
  posthog.capture(name, properties)
}

/**
 * Identifica al usuario (tras email capture).
 * PostHog lo vincula a todos los eventos previos de la sesión.
 */
export function identifyUser(email: string) {
  if (!initialized || typeof window === 'undefined') return
  posthog.identify(email)
}
