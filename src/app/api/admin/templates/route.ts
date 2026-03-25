/**
 * /api/admin/templates — GET
 *
 * Devuelve todos los templates fusionando defaults + overrides de Supabase.
 */

import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase'
import { EMAIL_DEFAULTS, VALID_EMAIL_KEYS } from '@/lib/email-defaults'

export async function GET(req: NextRequest) {
  const isDev = process.env.NODE_ENV === 'development'
  const adminSecret = req.headers.get('x-admin-secret')
  const validSecret = process.env.ADMIN_SECRET
  if (!isDev && (!validSecret || adminSecret !== validSecret)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  const supabase = createAdminClient()

  // Fetch all overrides from DB
  const { data: overrides } = await supabase
    .from('email_templates')
    .select('email_key, subject, body_content, cta_text, updated_at')

  const overrideMap = new Map(
    (overrides ?? []).map((o) => [o.email_key, o])
  )

  const templates = VALID_EMAIL_KEYS.map((key) => {
    const defaults = EMAIL_DEFAULTS[key]
    const override = overrideMap.get(key)
    const isCustomized = !!override && (
      override.subject !== null ||
      override.body_content !== null ||
      override.cta_text !== null
    )

    return {
      email_key: key,
      subject: override?.subject ?? defaults.subject,
      body_content: override?.body_content ?? defaults.bodyContent,
      cta_text: override?.cta_text ?? defaults.ctaText,
      is_customized: isCustomized,
      is_dynamic: defaults.isDynamic ?? false,
      dynamic_note: defaults.dynamicNote ?? null,
      updated_at: override?.updated_at ?? null,
    }
  })

  return NextResponse.json({ templates })
}
