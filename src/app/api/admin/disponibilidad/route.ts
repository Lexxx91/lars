/**
 * /api/admin/disponibilidad — GET / POST / DELETE
 *
 * CRUD para la configuracion de disponibilidad de Javier.
 * Protegido con ADMIN_SECRET (mismo patron que fast-forward).
 *
 * GET: devuelve todas las reglas de disponibilidad + proximos bookings
 * POST: crea/actualiza una regla (recurring o bloqueo de fecha)
 * DELETE: elimina una regla por ID
 */

import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase'

function isAuthorized(req: NextRequest): boolean {
  const isDev = process.env.NODE_ENV === 'development'
  const adminSecret = req.headers.get('x-admin-secret')
  const validSecret = process.env.ADMIN_SECRET
  return isDev || (!!validSecret && adminSecret === validSecret)
}

// ─── GET: leer configuracion + proximas sesiones ────────────────────────────

export async function GET(req: NextRequest): Promise<NextResponse> {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  const supabase = createAdminClient()

  const [configResult, bookingsResult] = await Promise.all([
    supabase
      .from('availability_config')
      .select('*')
      .order('day_of_week', { ascending: true }),
    supabase
      .from('bookings')
      .select('id, email, map_hash, slot_start, slot_end, status, google_meet_url')
      .eq('status', 'confirmed')
      .gte('slot_start', new Date().toISOString())
      .order('slot_start', { ascending: true })
      .limit(20),
  ])

  if (configResult.error) {
    return NextResponse.json({ error: configResult.error.message }, { status: 500 })
  }

  return NextResponse.json({
    config: configResult.data ?? [],
    upcomingBookings: bookingsResult.data ?? [],
  })
}

// ─── POST: crear/actualizar regla ───────────────────────────────────────────

interface CreateRuleBody {
  // Para regla recurrente:
  dayOfWeek?: number    // 0-6 (domingo-sabado)
  startTime?: string    // "10:00"
  endTime?: string      // "13:00"
  // Para bloqueo de fecha:
  specificDate?: string  // "2026-03-25"
  isBlocked?: boolean
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  let body: CreateRuleBody
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Payload invalido' }, { status: 400 })
  }

  const supabase = createAdminClient()

  // Caso 1: Bloquear una fecha especifica
  if (body.specificDate) {
    const { data, error } = await supabase
      .from('availability_config')
      .insert({
        specific_date: body.specificDate,
        is_blocked: true,
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ rule: data })
  }

  // Caso 2: Regla recurrente (dia + horario)
  if (body.dayOfWeek !== undefined && body.startTime && body.endTime) {
    // Verificar si ya existe una regla para ese dia y horario
    const { data: existing } = await supabase
      .from('availability_config')
      .select('id')
      .eq('day_of_week', body.dayOfWeek)
      .eq('start_time', body.startTime)
      .eq('end_time', body.endTime)
      .is('specific_date', null)
      .single()

    if (existing) {
      return NextResponse.json({ message: 'Esta regla ya existe', rule: existing })
    }

    const { data, error } = await supabase
      .from('availability_config')
      .insert({
        day_of_week: body.dayOfWeek,
        start_time: body.startTime,
        end_time: body.endTime,
        is_blocked: false,
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ rule: data })
  }

  return NextResponse.json(
    { error: 'Datos insuficientes. Enviar dayOfWeek+startTime+endTime o specificDate.' },
    { status: 400 }
  )
}

// ─── DELETE: eliminar regla ─────────────────────────────────────────────────

export async function DELETE(req: NextRequest): Promise<NextResponse> {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  const ruleId = req.nextUrl.searchParams.get('id')
  if (!ruleId) {
    return NextResponse.json({ error: 'Falta el parametro id' }, { status: 400 })
  }

  const supabase = createAdminClient()

  const { error } = await supabase
    .from('availability_config')
    .delete()
    .eq('id', ruleId)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
