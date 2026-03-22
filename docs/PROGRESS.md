# PROGRESS.md — Estado del Proyecto L.A.R.S.©

## Estado actual: PRODUCCIÓN — Sistema completo

Todo el flujo landing → gateway → mapa vivo → pago funciona en producción.
Evoluciones del mapa (día 3-90), emails automáticos, analytics custom en Supabase, booking con Google Calendar — todo implementado.

---

## Fases

| Fase | Estado | Fecha | Notas |
|------|--------|-------|-------|
| 0 — Setup | ✅ Completada | 21 Mar 2026 | Stack completo, 8 componentes, Supabase con schema, Vercel desplegado, GitHub conectado. |
| 1 — Hero + P1 + Landing | ✅ Completada | 21 Mar 2026 | Hero, P1 visible, below-fold, SVG nervioso, scroll animations. |
| 2 — P2-P4 + Primera Verdad + Micro-espejo 1 | ✅ Completada | 21 Mar 2026 | P2, P3 multiselect, P4, Primera Verdad (5 variantes), Micro-espejo 1, zonas, barra no lineal. |
| 3 — P5-P8 + Micro-espejo 2 | ✅ Completada | 22 Mar 2026 | P5, P6, Micro-espejo 2, Sliders P7, P8. Animaciones A-04 a A-11 + A-15. |
| 4 — Bisagra + Email + Backend | ✅ Completada | 22 Mar 2026 | Scoring D1-D5 ponderado + 4 ajustes. API /api/diagnostico. Supabase + Resend. Email día 0. |
| 5 — Mapa Vivo + CTA + Stripe | ✅ Completada | 22 Mar 2026 | Revelación progresiva 8s. CTA completo. Stripe Checkout 97€. Webhook. /pago/exito. Compartir + PNG. |
| 6 — Evoluciones del Mapa | ✅ Completada | 22 Mar 2026 | Cron evoluciones (día 3/7/10/14/21/30/90). 7 arquetipos. Subdimensiones. Extractos libro. Re-evaluación. Timeline. Fast-forward admin. |
| 7 — Emails | ✅ Completada | 22 Mar 2026 | 8 plantillas (día 0/3/7/10/14/21/30/90) + post-pago. Tracking pixel. Unsubscribe. Lógica de supresión. |
| 8 — Analytics + Edge Cases | ✅ Completada | 22 Mar 2026 | Dashboard custom en Supabase (/admin/analytics). Funnel completo. Métricas por periodo. Stats colectivos (reales cuando >100 diagnósticos). Edge cases cubiertos (offline, duplicados, doble clic, sliders). |
| 9 — Polish + Performance | ✅ Completada | 22 Mar 2026 | A-01 a A-15 verificadas. Responsive 4 breakpoints. Build limpio. Accesibilidad. Fonts swap. |

---

## Mejoras post-lanzamiento

### Completadas
- ✅ PostHog eliminado — analytics custom en Supabase (22 Mar 2026)
- ✅ localStorage en gateway — retoma donde se quedo, expira 24h (22 Mar 2026)
- ✅ **Fase 10 — Booking Pro** (22 Mar 2026):
  - Buffer 10 min entre sesiones (availability.ts)
  - Bloqueo de franjas horarias especificas (no solo dias completos)
  - Admin cancela bookings desde el panel
  - Historial de sesiones (completadas, canceladas, no-show) — migracion 003
  - Emails con diseno premium (header, cards con borde, footer, tipografia)

### Pendiente (no bloquea lanzamiento)
- Testimonios: siguen siendo placeholder — pendiente de testimonios reales de Javier
- Stripe: en modo test — pasar a LIVE cuando esté listo

## Decisiones pendientes de Javier

- [ ] Seleccionar 2-3 clientes para testimonios del diagnóstico (pedir permiso, cargo + edad)
- [ ] Confirmar dónde vive la Semana 1 (web separada vs Mighty Networks)
- [ ] Fecha de la próxima edición del programa

---

*Actualizar al cerrar cada sesión de Claude Code.*
