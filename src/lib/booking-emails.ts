/**
 * booking-emails.ts — Emails del sistema de reservas
 *
 * 3 templates:
 * - Confirmacion al usuario (con fecha, hora, link Meet)
 * - Recordatorio 24h antes
 * - Notificacion a Javier (con link al mapa del usuario)
 *
 * Misma estetica dark que el resto de emails del proyecto.
 */

import { Resend } from 'resend'

let _resend: Resend | null = null
function getResend(): Resend {
  if (!_resend) _resend = new Resend(process.env.RESEND_API_KEY ?? '')
  return _resend
}

const FROM_EMAIL = 'Javier · Instituto Epigenético <regulacion@institutoepigenetico.com>'
const FROM_EMAIL_DEV = 'onboarding@resend.dev'

function getFromEmail(): string {
  return process.env.NODE_ENV === 'development' ? FROM_EMAIL_DEV : FROM_EMAIL
}

function getBaseUrl(): string {
  return process.env.NEXT_PUBLIC_BASE_URL ?? 'https://lars.institutoepigenetico.com'
}

const JAVIER_EMAIL = 'regulacion@institutoepigenetico.com'

// ─── Template base ──────────────────────────────────────────────────────────

function buildBookingEmail(params: {
  content: string
  buttonText?: string
  buttonUrl?: string
}): string {
  const button = params.buttonText && params.buttonUrl ? `
    <table cellpadding="0" cellspacing="0" style="margin: 32px 0;">
      <tr><td style="background: #c6c8ee; border-radius: 100px; padding: 16px 32px;">
        <a href="${params.buttonUrl}" style="color: #0a252c; font-size: 15px; font-weight: 500; text-decoration: none; display: block; white-space: nowrap;">
          ${params.buttonText}
        </a>
      </td></tr>
    </table>` : ''

  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="
  margin: 0; padding: 0;
  background-color: #0a252c;
  font-family: 'Plus Jakarta Sans', Inter, system-ui, sans-serif;
  color: #F5F5F0;
">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 560px; margin: 0 auto; padding: 48px 24px;">
    <tr><td>
      ${params.content}
      ${button}
    </td></tr>
  </table>
</body>
</html>`
}

// ─── Formato de fecha/hora ──────────────────────────────────────────────────

function formatDateTimeSpanish(date: Date, timezone: string): { date: string; time: string } {
  const dateStr = date.toLocaleDateString('es-ES', {
    timeZone: timezone,
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })

  const timeStr = date.toLocaleTimeString('es-ES', {
    timeZone: timezone,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })

  return { date: dateStr.charAt(0).toUpperCase() + dateStr.slice(1), time: timeStr }
}

// ─── Email 1: Confirmacion al usuario ───────────────────────────────────────

interface BookingConfirmationParams {
  to: string
  slotStart: Date
  slotEnd: Date
  meetUrl: string | null
  mapHash: string
  userTimezone: string
}

export async function sendBookingConfirmationEmail({
  to,
  slotStart,
  meetUrl,
  mapHash,
  userTimezone,
}: BookingConfirmationParams): Promise<void> {
  const { date, time } = formatDateTimeSpanish(slotStart, userTimezone)
  const mapUrl = `${getBaseUrl()}/mapa/${mapHash}`
  const cancelUrl = `${getBaseUrl()}/mapa/${mapHash}?cancelBooking=true`

  const meetBlock = meetUrl ? `
    <p style="font-size: 13px; letter-spacing: 0.08em; text-transform: uppercase; color: #A8B0AC; margin: 24px 0 8px 0;">
      ENLACE DE VIDEOLLAMADA
    </p>
    <table cellpadding="0" cellspacing="0" style="margin: 0 0 8px 0;">
      <tr><td style="background: rgba(198,200,238,0.1); border-radius: 8px; padding: 12px 16px;">
        <a href="${meetUrl}" style="color: #c6c8ee; font-size: 14px; text-decoration: none; word-break: break-all;">
          ${meetUrl}
        </a>
      </td></tr>
    </table>` : ''

  const html = buildBookingEmail({
    content: `
      <p style="font-size: 13px; letter-spacing: 0.12em; text-transform: uppercase; color: #c6c8ee; margin: 0 0 8px 0;">
        SESION CONFIRMADA
      </p>

      <p style="font-size: 28px; font-weight: 600; color: #F5F5F0; margin: 0 0 24px 0; line-height: 1.2;">
        Tu sesion con Javier esta confirmada.
      </p>

      <div style="background: rgba(198,200,238,0.06); border-radius: 12px; padding: 20px; margin-bottom: 24px;">
        <p style="font-size: 14px; color: #A8B0AC; margin: 0 0 4px 0;">Fecha</p>
        <p style="font-size: 18px; color: #F5F5F0; font-weight: 500; margin: 0 0 16px 0;">${date}</p>

        <p style="font-size: 14px; color: #A8B0AC; margin: 0 0 4px 0;">Hora</p>
        <p style="font-size: 18px; color: #F5F5F0; font-weight: 500; margin: 0 0 16px 0;">${time}</p>

        <p style="font-size: 14px; color: #A8B0AC; margin: 0 0 4px 0;">Duracion</p>
        <p style="font-size: 18px; color: #F5F5F0; font-weight: 500; margin: 0;">20 minutos</p>
      </div>

      ${meetBlock}

      <p style="font-size: 14px; color: #A8B0AC; line-height: 1.6; margin: 24px 0 0 0;">
        Javier ya tiene tu Mapa de Regulacion. No empezais de cero.
      </p>

      <p style="font-size: 12px; color: #6B7572; margin: 32px 0 0 0;">
        <a href="${cancelUrl}" style="color: #6B7572; text-decoration: underline;">Cancelar sesion</a>
      </p>`,
    buttonText: 'Ver mi mapa',
    buttonUrl: mapUrl,
  })

  await getResend().emails.send({
    from: getFromEmail(),
    to,
    subject: 'Tu sesion con Javier esta confirmada',
    html,
  })
}

// ─── Email 2: Recordatorio 24h antes ────────────────────────────────────────

interface BookingReminderParams {
  to: string
  slotStart: Date
  meetUrl: string | null
  mapHash: string
  userTimezone: string
}

export async function sendBookingReminderEmail({
  to,
  slotStart,
  meetUrl,
  mapHash,
  userTimezone,
}: BookingReminderParams): Promise<void> {
  const { date, time } = formatDateTimeSpanish(slotStart, userTimezone)
  const mapUrl = `${getBaseUrl()}/mapa/${mapHash}`

  const meetLine = meetUrl
    ? `<p style="font-size: 14px; color: #F5F5F0; margin: 16px 0;"><a href="${meetUrl}" style="color: #c6c8ee;">Enlace a la videollamada</a></p>`
    : ''

  const html = buildBookingEmail({
    content: `
      <p style="font-size: 13px; letter-spacing: 0.12em; text-transform: uppercase; color: #c6c8ee; margin: 0 0 8px 0;">
        RECORDATORIO
      </p>

      <p style="font-size: 28px; font-weight: 600; color: #F5F5F0; margin: 0 0 24px 0; line-height: 1.2;">
        Manana: tu sesion con Javier
      </p>

      <div style="background: rgba(198,200,238,0.06); border-radius: 12px; padding: 20px; margin-bottom: 24px;">
        <p style="font-size: 18px; color: #F5F5F0; font-weight: 500; margin: 0;">
          ${date} a las ${time}
        </p>
      </div>

      ${meetLine}

      <p style="font-size: 14px; color: #A8B0AC; line-height: 1.6; margin: 0;">
        Prepara cualquier pregunta que tengas. Javier ya habra revisado tu mapa antes de la sesion.
      </p>`,
    buttonText: 'Ver mi mapa',
    buttonUrl: mapUrl,
  })

  await getResend().emails.send({
    from: getFromEmail(),
    to,
    subject: `Manana: tu sesion con Javier — ${time}`,
    html,
  })
}

// ─── Email 3: Notificacion a Javier ─────────────────────────────────────────

interface JavierNotificationParams {
  userEmail: string
  slotStart: Date
  mapHash: string
}

export async function sendBookingNotificationToJavier({
  userEmail,
  slotStart,
  mapHash,
}: JavierNotificationParams): Promise<void> {
  const { date, time } = formatDateTimeSpanish(slotStart, 'Europe/Madrid')
  const mapUrl = `${getBaseUrl()}/mapa/${mapHash}`

  const html = buildBookingEmail({
    content: `
      <p style="font-size: 13px; letter-spacing: 0.12em; text-transform: uppercase; color: #c6c8ee; margin: 0 0 8px 0;">
        NUEVA SESION
      </p>

      <p style="font-size: 28px; font-weight: 600; color: #F5F5F0; margin: 0 0 24px 0; line-height: 1.2;">
        Nueva sesion agendada
      </p>

      <div style="background: rgba(198,200,238,0.06); border-radius: 12px; padding: 20px; margin-bottom: 24px;">
        <p style="font-size: 14px; color: #A8B0AC; margin: 0 0 4px 0;">Persona</p>
        <p style="font-size: 16px; color: #F5F5F0; margin: 0 0 16px 0;">${userEmail}</p>

        <p style="font-size: 14px; color: #A8B0AC; margin: 0 0 4px 0;">Fecha y hora</p>
        <p style="font-size: 16px; color: #F5F5F0; margin: 0;">${date} a las ${time}</p>
      </div>

      <p style="font-size: 14px; color: #A8B0AC; line-height: 1.6; margin: 0;">
        Revisa su mapa antes de la sesion para personalizar la conversacion.
      </p>`,
    buttonText: 'Ver su mapa',
    buttonUrl: mapUrl,
  })

  await getResend().emails.send({
    from: getFromEmail(),
    to: JAVIER_EMAIL,
    subject: `Nueva sesion: ${userEmail} — ${date} ${time}`,
    html,
  })
}
