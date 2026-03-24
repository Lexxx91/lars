'use client'

/**
 * TensionSection — Sección TENSIÓN (El coste de no saber).
 * 3 cards con stagger animation al entrar en viewport.
 * Counter animation for key numbers (73%, 12-15h).
 * Hover state: lift + border glow.
 * Copy exacto de FEATURE_LANDING_DESIGN.md.
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

  return (
    <section
      ref={sectionRef}
      aria-label="El coste de no saber"
      style={{
        paddingTop: 'var(--space-4)',
        paddingBottom: 'var(--space-16)',
        paddingLeft: 'var(--container-padding-mobile)',
        paddingRight: 'var(--container-padding-mobile)',
      }}
    >
      <div
        className="tension-grid"
        style={{
          maxWidth: '960px',
          margin: '0 auto',
        }}
      >
        {/* Card 1: 73% counter */}
        <div
          onMouseEnter={() => setHoveredCard(0)}
          onMouseLeave={() => setHoveredCard(null)}
          style={{
            background: 'var(--color-bg-tertiary)',
            border: 'var(--border-subtle)',
            borderRadius: 'var(--radius-lg)',
            padding: 'var(--space-6)',
            opacity: visible ? 1 : 0,
            transform: visible
              ? hoveredCard === 0 ? 'translateY(-2px)' : 'none'
              : 'translateY(20px)',
            boxShadow: hoveredCard === 0 ? '0 4px 20px rgba(180, 90, 50, 0.1)' : 'none',
            transition: 'opacity 400ms ease 0ms, transform 400ms ease 0ms, box-shadow 200ms ease',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: 'var(--text-body)',
              lineHeight: 'var(--lh-body)',
              fontWeight: 600,
              color: 'var(--color-text-primary)',
              marginBottom: 'var(--space-3)',
            }}
          >
            El{' '}
            {visible ? <Counter to={73} duration={1000} suffix="%" /> : '0%'}
            {' '}de ejecutivos con burnout no saben que lo tienen.
          </p>
          <p
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: 'var(--text-body-sm)',
              lineHeight: 'var(--lh-body-sm)',
              color: 'var(--color-text-secondary)',
            }}
          >
            Confunden el agotamiento con &ldquo;una mala racha&rdquo; y pierden meses — a veces
            años — mientras su biología se deteriora.
          </p>
        </div>

        {/* Card 2: 12-15h counters */}
        <div
          onMouseEnter={() => setHoveredCard(1)}
          onMouseLeave={() => setHoveredCard(null)}
          style={{
            background: 'var(--color-bg-tertiary)',
            border: 'var(--border-subtle)',
            borderRadius: 'var(--radius-lg)',
            padding: 'var(--space-6)',
            opacity: visible ? 1 : 0,
            transform: visible
              ? hoveredCard === 1 ? 'translateY(-2px)' : 'none'
              : 'translateY(20px)',
            boxShadow: hoveredCard === 1 ? '0 4px 20px rgba(180, 90, 50, 0.1)' : 'none',
            transition: 'opacity 400ms ease 150ms, transform 400ms ease 150ms, box-shadow 200ms ease',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: 'var(--text-body)',
              lineHeight: 'var(--lh-body)',
              fontWeight: 600,
              color: 'var(--color-text-primary)',
              marginBottom: 'var(--space-3)',
            }}
          >
            Un sistema nervioso desregulado pierde entre{' '}
            {visible ? <Counter to={12} duration={800} /> : '0'}
            {' '}y{' '}
            {visible ? <Counter to={15} duration={1000} /> : '0'}
            {' '}horas semanales de rendimiento real.
          </p>
          <p
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: 'var(--text-body-sm)',
              lineHeight: 'var(--lh-body-sm)',
              color: 'var(--color-text-secondary)',
            }}
          >
            No en tiempo — en calidad de decisiones, en paciencia, en energía para lo que importa.
          </p>
        </div>

        {/* Card 3: no counters needed */}
        <div
          onMouseEnter={() => setHoveredCard(2)}
          onMouseLeave={() => setHoveredCard(null)}
          style={{
            background: 'var(--color-bg-tertiary)',
            border: 'var(--border-subtle)',
            borderRadius: 'var(--radius-lg)',
            padding: 'var(--space-6)',
            opacity: visible ? 1 : 0,
            transform: visible
              ? hoveredCard === 2 ? 'translateY(-2px)' : 'none'
              : 'translateY(20px)',
            boxShadow: hoveredCard === 2 ? '0 4px 20px rgba(180, 90, 50, 0.1)' : 'none',
            transition: 'opacity 400ms ease 300ms, transform 400ms ease 300ms, box-shadow 200ms ease',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: 'var(--text-body)',
              lineHeight: 'var(--lh-body)',
              fontWeight: 600,
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
            Si tu cortisol no baja, tu sueño no se repara y tu sistema no se regula, dos semanas en
            la playa son un parche. Vuelves y en 72 horas estás igual.
          </p>
        </div>
      </div>
    </section>
  )
}
