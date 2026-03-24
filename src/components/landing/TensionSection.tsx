'use client'

/**
 * TensionSection — Sección TENSIÓN (El coste de no saber).
 * 3 stat cards de color: terracota, marrón, blanca.
 * Counter animado para 73% y 12-15h.
 * Overline "EL COSTE DE NO SABER".
 */

import { useRef, useEffect, useState } from 'react'
import Counter from '@/components/ui/Counter'

export default function TensionSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    const el = sectionRef.current
    if (el) observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const cardReveal = (index: number) => ({
    opacity: visible ? 1 : 0,
    transform: visible
      ? hoveredCard === index ? 'scale(1.01)' : 'none'
      : 'translateY(20px)',
    transition: `opacity 500ms var(--ease-out-expo) ${index * 150}ms, transform 500ms var(--ease-out-expo) ${index * 150}ms, box-shadow 200ms ease`,
  })

  return (
    <section
      ref={sectionRef}
      aria-label="El coste de no saber"
      style={{
        paddingTop: 'var(--space-8)',
        paddingBottom: 'var(--space-16)',
        paddingLeft: 'var(--container-padding-mobile)',
        paddingRight: 'var(--container-padding-mobile)',
      }}
    >
      <div style={{ maxWidth: '960px', margin: '0 auto' }}>
        {/* Overline */}
        <p
          className="overline-accent"
          style={{
            textAlign: 'center',
            marginBottom: 'var(--space-8)',
            opacity: visible ? 1 : 0,
            transition: 'opacity 500ms var(--ease-out-expo)',
          }}
        >
          EL COSTE DE NO SABER
        </p>

        <div className="tension-grid">
          {/* Card 1: STAT CARD TERRACOTA — 73% */}
          <div
            onMouseEnter={() => setHoveredCard(0)}
            onMouseLeave={() => setHoveredCard(null)}
            style={{
              background: 'var(--color-accent)',
              borderRadius: '20px',
              padding: 'var(--space-8)',
              boxShadow: hoveredCard === 0 ? '0 8px 32px rgba(30, 19, 16, 0.12)' : 'none',
              ...cardReveal(0),
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-lora)',
                fontSize: 'var(--text-display)',
                lineHeight: 1.1,
                fontWeight: 700,
                color: 'var(--color-text-inverse)',
                marginBottom: 'var(--space-3)',
              }}
            >
              {visible ? <Counter to={73} duration={1200} suffix="%" /> : '0%'}
            </p>
            <p
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: 'var(--text-body)',
                lineHeight: 'var(--lh-body)',
                color: 'rgba(255, 251, 239, 0.85)',
                marginBottom: 'var(--space-2)',
              }}
            >
              de ejecutivos con burnout no lo saben.
            </p>
            <p
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: 'var(--text-body-sm)',
                lineHeight: 'var(--lh-body-sm)',
                color: 'rgba(255, 251, 239, 0.6)',
              }}
            >
              Confunden el agotamiento con &ldquo;una mala racha&rdquo; y pierden meses — a veces años — mientras su biología se deteriora.
            </p>
          </div>

          {/* Card 2: STAT CARD MARRÓN — 12-15h */}
          <div
            onMouseEnter={() => setHoveredCard(1)}
            onMouseLeave={() => setHoveredCard(null)}
            style={{
              background: 'var(--color-secondary)',
              borderRadius: '20px',
              padding: 'var(--space-8)',
              boxShadow: hoveredCard === 1 ? '0 8px 32px rgba(30, 19, 16, 0.12)' : 'none',
              ...cardReveal(1),
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-lora)',
                fontSize: 'var(--text-display)',
                lineHeight: 1.1,
                fontWeight: 700,
                color: 'var(--color-text-inverse)',
                marginBottom: 'var(--space-3)',
              }}
            >
              {visible ? (
                <>
                  <Counter to={12} duration={800} />
                  -
                  <Counter to={15} duration={1000} />
                  h
                </>
              ) : '0-0h'}
            </p>
            <p
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: 'var(--text-body)',
                lineHeight: 'var(--lh-body)',
                color: 'rgba(255, 251, 239, 0.85)',
                marginBottom: 'var(--space-2)',
              }}
            >
              semanales de rendimiento real perdidas.
            </p>
            <p
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: 'var(--text-body-sm)',
                lineHeight: 'var(--lh-body-sm)',
                color: 'rgba(255, 251, 239, 0.6)',
              }}
            >
              No en tiempo — en calidad de decisiones, en paciencia, en energía para lo que importa.
            </p>
          </div>

          {/* Card 3: CARD BLANCA con borde */}
          <div
            onMouseEnter={() => setHoveredCard(2)}
            onMouseLeave={() => setHoveredCard(null)}
            style={{
              background: 'var(--color-bg-tertiary)',
              border: '1px solid rgba(30, 19, 16, 0.06)',
              borderRadius: '20px',
              padding: 'var(--space-8)',
              boxShadow: hoveredCard === 2 ? '0 4px 20px rgba(30, 19, 16, 0.08)' : 'none',
              ...cardReveal(2),
            }}
          >
            {/* Badge "DATO CLAVE" */}
            <span
              style={{
                display: 'inline-block',
                backgroundColor: 'var(--color-accent-subtle)',
                color: 'var(--color-accent)',
                borderRadius: 'var(--radius-pill)',
                padding: '4px 12px',
                fontFamily: 'var(--font-inter)',
                fontSize: 'var(--text-caption)',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: 'var(--space-4)',
              }}
            >
              DATO CLAVE
            </span>

            <p
              style={{
                fontFamily: 'var(--font-lora)',
                fontSize: 'var(--text-h3)',
                lineHeight: 'var(--lh-h3)',
                fontWeight: 700,
                color: 'var(--color-text-primary)',
                marginBottom: 'var(--space-3)',
              }}
            >
              El burnout no se arregla con vacaciones.
            </p>
            <p
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: 'var(--text-body-sm)',
                lineHeight: 'var(--lh-body-sm)',
                color: 'var(--color-text-secondary)',
              }}
            >
              Si tu cortisol no baja, tu sueño no se repara y tu sistema no se regula, dos semanas en la playa son un parche. Vuelves y en 72 horas estás igual.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
