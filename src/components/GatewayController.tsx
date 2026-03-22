'use client'

/**
 * GatewayController — Orquesta toda la experiencia del Gateway L.A.R.S.©
 *
 * Fases (modo DEEPEN — completo):
 *   landing  → Hero + BelowTheFold (visible siempre debajo)
 *   bloque1  → P2 → Analizando → Primera Verdad → P3 → P4 → Micro-espejo 1
 *   bloque2  → P5 → P6 → Micro-espejo 2 → P7 (sliders) → P8
 *   bloque3  → Calculando → Bisagra → Email
 *
 * Fases (modo CONVERT — 90 segundos):
 *   landing  → Hero
 *   mode-choice → Si no hay UTM, ofrece elección rápido/completo
 *   convert  → P2 → P7 → Bisagra comprimida → Email
 *
 * P1 se responde en el hero (GatewayController la recibe via onP1Select).
 * Al completar email, redirige a /mapa/[hash] con el diagnóstico completo.
 */

import { useState, useCallback, useEffect } from 'react'
import HeroSection from '@/components/landing/HeroSection'
import BelowTheFold from '@/components/landing/BelowTheFold'
import GatewayBloque1 from '@/components/gateway/GatewayBloque1'
import GatewayBloque2 from '@/components/gateway/GatewayBloque2'
import GatewayBloque3 from '@/components/gateway/GatewayBloque3'
import GatewayConvert from '@/components/gateway/GatewayConvert'
import OfflineBanner from '@/components/ui/OfflineBanner'
import { trackEvent } from '@/lib/posthog'
import type { Bloque1Answers } from '@/components/gateway/GatewayBloque1'
import type { Bloque2Answers } from '@/lib/gateway-bloque2-data'

type GatewayMode = 'deepen' | 'convert'
type Phase = 'landing' | 'mode-choice' | 'bloque1' | 'bloque2' | 'bloque3' | 'convert'

interface GatewayControllerProps {
  initialMode?: GatewayMode
}

export default function GatewayController({ initialMode }: GatewayControllerProps) {
  const [phase, setPhase] = useState<Phase>('landing')
  const [mode, setMode] = useState<GatewayMode | null>(initialMode ?? null)
  const [p1, setP1] = useState<string | null>(null)
  const [bloque1Answers, setBloque1Answers] = useState<Bloque1Answers | null>(null)
  const [bloque2Answers, setBloque2Answers] = useState<Bloque2Answers | null>(null)
  const [duplicateHash, setDuplicateHash] = useState<string | null>(null)
  const [duplicateEmail, setDuplicateEmail] = useState<string | null>(null)

  /* Tracking de abandono — dispara evento al cerrar pestaña */
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (phase !== 'landing') {
        trackEvent('gateway_abandoned', { phase, mode })
      }
    }
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [phase, mode])

  /* P1 seleccionada en el hero → activa siguiente fase */
  const handleP1Select = useCallback((id: string) => {
    trackEvent('gateway_p1', { option: id })
    setP1(id)

    if (initialMode === 'convert') {
      // UTM detectó alta intención → directo a convert
      setMode('convert')
      setPhase('convert')
    } else {
      // Sin UTM → ofrecer elección rápido/completo
      setPhase('mode-choice')
    }
  }, [initialMode])

  /* Elección de modo */
  const handleModeChoice = useCallback((chosen: GatewayMode) => {
    trackEvent('gateway_mode_choice', { mode: chosen })
    setMode(chosen)
    setPhase(chosen === 'convert' ? 'convert' : 'bloque1')
  }, [])

  /* Bloque1 completo → pasa a bloque2 */
  const handleBloque1Complete = useCallback((answers: Bloque1Answers) => {
    setBloque1Answers(answers)
    setPhase('bloque2')
  }, [])

  /* Bloque2 completo → pasa a bloque3 */
  const handleBloque2Complete = useCallback((answers: Bloque2Answers) => {
    setBloque2Answers(answers)
    setPhase('bloque3')
  }, [])

  /* Email enviado (modo DEEPEN) → redirigir al mapa */
  const handleBloque3Complete = useCallback(async (email: string) => {
    try {
      const res = await fetch('/api/diagnostico', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          p1,
          bloque1: bloque1Answers,
          bloque2: bloque2Answers,
        }),
      })

      if (res.ok) {
        const data = await res.json()
        if (data.existing) {
          setDuplicateHash(data.hash)
          setDuplicateEmail(email)
        } else {
          window.location.href = `/mapa/${data.hash}`
        }
      } else {
        window.location.href = '/mapa/preview'
      }
    } catch {
      window.location.href = '/mapa/preview'
    }
  }, [p1, bloque1Answers, bloque2Answers])

  /* Email enviado (modo CONVERT) → redirigir al mapa */
  const handleConvertComplete = useCallback(async (
    email: string,
    convertP2: string,
    convertSliders: Record<string, number>,
  ) => {
    try {
      const res = await fetch('/api/diagnostico', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          p1,
          p2: convertP2,
          sliders: convertSliders,
          mode: 'convert',
        }),
      })

      if (res.ok) {
        const data = await res.json()
        if (data.existing) {
          setDuplicateHash(data.hash)
          setDuplicateEmail(email)
        } else {
          window.location.href = `/mapa/${data.hash}`
        }
      } else {
        window.location.href = '/mapa/preview'
      }
    } catch {
      window.location.href = '/mapa/preview'
    }
  }, [p1])

  /* Duplicado: actualizar con nuevas respuestas */
  const handleDuplicateUpdate = useCallback(async () => {
    if (!duplicateEmail) return
    try {
      const body = mode === 'convert'
        ? { email: duplicateEmail, p1, mode: 'convert', update: true }
        : { email: duplicateEmail, p1, bloque1: bloque1Answers, bloque2: bloque2Answers, update: true }

      const res = await fetch('/api/diagnostico', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      if (res.ok) {
        const { hash } = await res.json()
        window.location.href = `/mapa/${hash}`
      }
    } catch {
      window.location.href = '/mapa/preview'
    }
  }, [duplicateEmail, p1, bloque1Answers, bloque2Answers, mode])

  /* Duplicado: ver mapa existente */
  const handleDuplicateViewExisting = useCallback(() => {
    if (duplicateHash) {
      window.location.href = `/mapa/${duplicateHash}`
    }
  }, [duplicateHash])

  /* Cerrar cualquier bloque → volver a landing */
  const handleClose = useCallback(() => {
    setPhase('landing')
    setMode(initialMode ?? null)
  }, [initialMode])

  return (
    <>
      {/* Banner de conexión perdida — no bloqueante */}
      <OfflineBanner />

      {/* Landing — siempre montada debajo de los overlays */}
      <HeroSection onP1Select={handleP1Select} />

      <div
        aria-hidden="true"
        style={{
          height: '80px',
          background: `linear-gradient(to bottom, var(--color-bg-primary), var(--color-bg-secondary))`,
          marginTop: '-1px',
        }}
      />

      <BelowTheFold />

      {/* ── Pantalla de elección: rápido o completo ── */}
      {phase === 'mode-choice' && (
        <div
          className="gateway-overlay"
          role="main"
          aria-label="Elige tu diagnóstico"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 50,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'var(--color-bg-primary)',
            padding: 'var(--space-8) var(--container-padding-mobile)',
          }}
        >
          <div className="step-enter" style={{ maxWidth: '420px', width: '100%', textAlign: 'center' }}>
            <p
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: 'var(--text-caption)',
                letterSpacing: 'var(--ls-overline)',
                textTransform: 'uppercase',
                color: 'var(--color-text-tertiary)',
                marginBottom: 'var(--space-6)',
              }}
            >
              Elige tu formato
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              {/* Opción: Completo */}
              <button
                onClick={() => handleModeChoice('deepen')}
                style={{
                  width: '100%',
                  padding: 'var(--space-6)',
                  borderRadius: 'var(--radius-xl)',
                  border: 'var(--border-subtle)',
                  background: 'var(--color-bg-secondary)',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'border-color var(--transition-fast)',
                }}
              >
                <p style={{
                  fontFamily: 'var(--font-inter-tight)',
                  fontSize: 'var(--text-h4)',
                  fontWeight: 500,
                  color: 'var(--color-text-primary)',
                  marginBottom: 'var(--space-1)',
                }}>
                  Diagnóstico completo
                </p>
                <p style={{
                  fontFamily: 'var(--font-inter)',
                  fontSize: 'var(--text-body-sm)',
                  color: 'var(--color-text-secondary)',
                }}>
                  8 preguntas · 3 minutos · Más precisión
                </p>
              </button>

              {/* Opción: Rápido */}
              <button
                onClick={() => handleModeChoice('convert')}
                style={{
                  width: '100%',
                  padding: 'var(--space-6)',
                  borderRadius: 'var(--radius-xl)',
                  border: 'var(--border-subtle)',
                  background: 'var(--color-bg-secondary)',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'border-color var(--transition-fast)',
                }}
              >
                <p style={{
                  fontFamily: 'var(--font-inter-tight)',
                  fontSize: 'var(--text-h4)',
                  fontWeight: 500,
                  color: 'var(--color-text-primary)',
                  marginBottom: 'var(--space-1)',
                }}>
                  Diagnóstico rápido
                </p>
                <p style={{
                  fontFamily: 'var(--font-inter)',
                  fontSize: 'var(--text-body-sm)',
                  color: 'var(--color-text-secondary)',
                }}>
                  3 preguntas · 1 minuto
                </p>
              </button>
            </div>

            <button
              onClick={handleClose}
              style={{
                marginTop: 'var(--space-6)',
                background: 'none',
                border: 'none',
                color: 'var(--color-text-tertiary)',
                fontFamily: 'var(--font-inter)',
                fontSize: 'var(--text-body-sm)',
                cursor: 'pointer',
              }}
            >
              ← Volver
            </button>
          </div>
        </div>
      )}

      {/* ── Flujo CONVERT (90 segundos) ── */}
      {phase === 'convert' && p1 && (
        <GatewayConvert
          p1={p1}
          onComplete={handleConvertComplete}
          onClose={handleClose}
        />
      )}

      {/* ── Flujo DEEPEN (completo) ── */}
      {phase === 'bloque1' && p1 && (
        <GatewayBloque1
          p1={p1}
          onComplete={handleBloque1Complete}
          onClose={handleClose}
        />
      )}

      {phase === 'bloque2' && p1 && bloque1Answers && (
        <GatewayBloque2
          p1={p1}
          p4={bloque1Answers.p4}
          onComplete={handleBloque2Complete}
          onClose={handleClose}
        />
      )}

      {phase === 'bloque3' && p1 && bloque1Answers && bloque2Answers && (
        <GatewayBloque3
          p1={p1}
          bloque1={bloque1Answers}
          bloque2={bloque2Answers}
          onComplete={handleBloque3Complete}
          onClose={handleClose}
        />
      )}

      {/* ── Diálogo email duplicado ── */}
      {duplicateHash && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 60,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(7,24,29,0.92)',
            padding: 'var(--space-6)',
          }}
        >
          <div
            className="step-enter"
            style={{
              maxWidth: '420px',
              width: '100%',
              background: 'var(--color-bg-secondary)',
              borderRadius: 'var(--radius-xl)',
              border: 'var(--border-subtle)',
              padding: 'var(--space-8) var(--space-6)',
              textAlign: 'center',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-inter-tight)',
                fontSize: 'var(--text-h3)',
                fontWeight: 500,
                color: 'var(--color-text-primary)',
                marginBottom: 'var(--space-3)',
              }}
            >
              Ya tienes un mapa con este email
            </p>
            <p
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: 'var(--text-body-sm)',
                color: 'var(--color-text-secondary)',
                marginBottom: 'var(--space-6)',
              }}
            >
              ¿Qué quieres hacer?
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              <button
                onClick={handleDuplicateUpdate}
                style={{
                  width: '100%',
                  padding: 'var(--space-4) var(--space-6)',
                  borderRadius: 'var(--radius-pill)',
                  border: 'none',
                  background: 'var(--color-accent)',
                  color: 'var(--color-text-inverse)',
                  fontFamily: 'var(--font-inter)',
                  fontSize: 'var(--text-body-sm)',
                  fontWeight: 500,
                  cursor: 'pointer',
                  minHeight: '44px',
                }}
              >
                Actualizar con estas respuestas
              </button>
              <button
                onClick={handleDuplicateViewExisting}
                style={{
                  width: '100%',
                  padding: 'var(--space-4) var(--space-6)',
                  borderRadius: 'var(--radius-pill)',
                  border: 'var(--border-subtle)',
                  background: 'transparent',
                  color: 'var(--color-text-secondary)',
                  fontFamily: 'var(--font-inter)',
                  fontSize: 'var(--text-body-sm)',
                  cursor: 'pointer',
                  minHeight: '44px',
                }}
              >
                Ver mi mapa existente
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
