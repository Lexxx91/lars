/**
 * BelowTheFold — Las 4 secciones para quien necesite más antes de responder P1.
 * Fondo uniforme --color-bg-secondary. Sin cortes bruscos entre secciones.
 * Formas orgánicas decorativas (solo tablet+).
 * Orden: ESPEJO → TENSIÓN → PRUEBA → ALIVIO → Footer
 */

import MirrorSection from './MirrorSection'
import TensionSection from './TensionSection'
import SocialProofSection from './SocialProofSection'
import ReliefSection from './ReliefSection'
import Footer from './Footer'

export default function BelowTheFold() {
  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      <div style={{ background: 'var(--color-bg-primary)' }}>
        <MirrorSection />
        <TensionSection />

        {/* Social Proof with organic blob */}
        <div style={{ position: 'relative' }}>
          {/* Blob decorativo — detrás de testimonios, overflow right */}
          <div
            className="organic-blob"
            style={{
              width: '400px',
              height: '400px',
              right: '-120px',
              top: '20%',
            }}
          />
          <SocialProofSection />
        </div>

        {/* Relief with organic blob */}
        <div style={{ position: 'relative' }}>
          {/* Blob decorativo — detrás de alivio, overflow left */}
          <div
            className="organic-blob"
            style={{
              width: '300px',
              height: '300px',
              left: '-100px',
              top: '30%',
              borderRadius: '70% 30% 30% 70% / 70% 70% 30% 30%',
              opacity: 0.35,
            }}
          />
          <ReliefSection />
        </div>
      </div>

      <Footer />
    </div>
  )
}
