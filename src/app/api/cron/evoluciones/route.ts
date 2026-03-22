/**
 * GET /api/cron/evoluciones
 *
 * Cron job diario (Vercel Cron). Busca diagnósticos con evoluciones
 * pendientes de email y envía las notificaciones.
 *
 * Protegido por CRON_SECRET (Vercel lo envía automáticamente).
 */

import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase'
import { getPendingEmails, type MapEvolutionData } from '@/lib/map-evolution'
import {
  sendDia3Email,
  sendDia7Email,
  sendDia10Email,
  sendDia14Email,
  sendDia21Email,
  sendDia30Email,
  sendDia90Email,
} from '@/lib/email'

const DAY_MS = 86400000

export async function GET(req: NextRequest): Promise<NextResponse> {
  // Verificar CRON_SECRET (Vercel lo envía automáticamente)
  const authHeader = req.headers.get('authorization')
  const cronSecret = process.env.CRON_SECRET
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  const supabase = createAdminClient()
  const now = new Date()

  // Buscar diagnósticos creados hace 3+ días (elegibles para alguna evolución)
  const cutoff = new Date(now.getTime() - 3 * DAY_MS)

  const { data: diagnosticos, error } = await supabase
    .from('diagnosticos')
    .select('hash, email, created_at, map_evolution')
    .lte('created_at', cutoff.toISOString())
    .limit(100) // Procesar en lotes

  if (error) {
    console.error('[cron/evoluciones] Query error:', error)
    return NextResponse.json({ error: 'DB error' }, { status: 500 })
  }

  if (!diagnosticos || diagnosticos.length === 0) {
    return NextResponse.json({ sent: 0, message: 'No hay evoluciones pendientes' })
  }

  let totalSent = 0
  const errors: string[] = []

  for (const diag of diagnosticos) {
    const mapEvolution = diag.map_evolution as MapEvolutionData
    const daysSince = Math.floor(
      (now.getTime() - new Date(diag.created_at).getTime()) / DAY_MS,
    )

    const pending = getPendingEmails(daysSince, mapEvolution)
    if (pending.length === 0) continue

    // Enviar solo el primer email pendiente (no bombardear)
    const emailKey = pending[0]

    try {
      const emailFns: Record<string, (to: string, hash: string) => Promise<void>> = {
        d3: sendDia3Email,
        d7: sendDia7Email,
        d10: sendDia10Email,
        d14: sendDia14Email,
        d21: sendDia21Email,
        d30: sendDia30Email,
      }

      if (emailKey.startsWith('d90_')) {
        await sendDia90Email(diag.email, diag.hash)
      } else if (emailFns[emailKey]) {
        await emailFns[emailKey](diag.email, diag.hash)
      } else {
        continue
      }

      // Marcar email como enviado
      const updatedEvolution = { ...mapEvolution }
      if (emailKey === 'd3') updatedEvolution.email_d3_sent = true
      else if (emailKey === 'd7') updatedEvolution.email_d7_sent = true
      else if (emailKey === 'd10') updatedEvolution.email_d10_sent = true
      else if (emailKey === 'd14') updatedEvolution.email_d14_sent = true
      else if (emailKey === 'd21') updatedEvolution.email_d21_sent = true
      else if (emailKey === 'd30') updatedEvolution.email_d30_sent = true
      else if (emailKey.startsWith('d90_')) {
        updatedEvolution.email_d90_sent = [
          ...(updatedEvolution.email_d90_sent ?? []),
          emailKey,
        ]
      }

      await supabase
        .from('diagnosticos')
        .update({ map_evolution: updatedEvolution })
        .eq('hash', diag.hash)

      totalSent++
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err)
      errors.push(`${diag.hash}: ${emailKey} — ${msg}`)
      console.error(`[cron/evoluciones] Error sending ${emailKey} to ${diag.hash}:`, msg)
    }
  }

  return NextResponse.json({
    sent: totalSent,
    processed: diagnosticos.length,
    errors: errors.length > 0 ? errors : undefined,
  })
}
