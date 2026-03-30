'use client'

/**
 * CopyEditorField — Individual editable copy field with manual save.
 *
 * Shows label, hint tooltip, input (sized by fieldType), "Editado" badge,
 * restore button, original text, dirty indicator, and save button.
 * No auto-save — user clicks "Guardar" when ready.
 */

import { useState, useCallback, useRef, memo } from 'react'
import type { CopyEntry, SaveStatus } from './types'
import { useCopySave } from './useCopyAutoSave'

interface CopyEditorFieldProps {
  entry: CopyEntry
  searchQuery: string
  onValueChange: (key: string, value: string) => void
  onSaved: (key: string, isCustomized: boolean) => void
}

function CopyEditorFieldInner({
  entry,
  searchQuery,
  onValueChange,
  onSaved,
}: CopyEditorFieldProps) {
  const [value, setValue] = useState(entry.currentValue)
  const [showOriginal, setShowOriginal] = useState(false)
  const [confirmRestore, setConfirmRestore] = useState(false)
  const [savedValue, setSavedValue] = useState(entry.currentValue)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const { status, save } = useCopySave()

  const isCustomized = value !== entry.defaultValue
  const isDirty = value !== savedValue

  const handleChange = useCallback(
    (newValue: string) => {
      setValue(newValue)
      onValueChange(entry.id, newValue)
    },
    [entry.id, onValueChange],
  )

  const handleSave = useCallback(async () => {
    const ok = await save(entry.id, value)
    if (ok) {
      setSavedValue(value)
      onSaved(entry.id, value !== entry.defaultValue)
    }
  }, [save, entry.id, entry.defaultValue, value, onSaved])

  const handleRestore = useCallback(async () => {
    if (!confirmRestore) {
      setConfirmRestore(true)
      return
    }
    setValue(entry.defaultValue)
    onValueChange(entry.id, entry.defaultValue)
    const ok = await save(entry.id, entry.defaultValue)
    if (ok) {
      setSavedValue(entry.defaultValue)
      onSaved(entry.id, false)
    }
    setConfirmRestore(false)
  }, [confirmRestore, entry.defaultValue, entry.id, onValueChange, save, onSaved])

  const renderHighlighted = (text: string) => {
    if (!searchQuery) return text
    const idx = text.toLowerCase().indexOf(searchQuery.toLowerCase())
    if (idx === -1) return text
    return (
      <>
        {text.slice(0, idx)}
        <mark style={{ background: 'rgba(180, 90, 50, 0.2)', borderRadius: '2px', padding: '0 1px' }}>
          {text.slice(idx, idx + searchQuery.length)}
        </mark>
        {text.slice(idx + searchQuery.length)}
      </>
    )
  }

  const rows = entry.fieldType === 'short' ? 0 : entry.fieldType === 'medium' ? 3 : 6

  return (
    <div style={{
      padding: 'var(--space-4)',
      background: isCustomized ? 'rgba(180, 90, 50, 0.04)' : 'var(--color-bg-tertiary)',
      border: isCustomized
        ? '1px solid rgba(180, 90, 50, 0.15)'
        : '1px solid rgba(30, 19, 16, 0.06)',
      borderRadius: 'var(--radius-md)',
      transition: 'background 150ms ease, border-color 150ms ease',
    }}>
      {/* Label row */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-2)',
        marginBottom: 'var(--space-2)',
        flexWrap: 'wrap',
      }}>
        <label style={{
          fontFamily: 'var(--font-host-grotesk)',
          fontSize: 'var(--text-body-sm)',
          fontWeight: 500,
          color: 'var(--color-text-primary)',
          flex: 1,
          minWidth: 0,
        }}>
          {renderHighlighted(entry.label)}
        </label>

        {/* Hint tooltip */}
        {entry.hint && (
          <span
            title={entry.hint}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 18,
              height: 18,
              borderRadius: '50%',
              background: 'rgba(30, 19, 16, 0.06)',
              color: 'var(--color-text-tertiary)',
              fontSize: '11px',
              fontFamily: 'var(--font-host-grotesk)',
              fontWeight: 600,
              cursor: 'help',
              flexShrink: 0,
            }}
          >
            ?
          </span>
        )}

        {/* Dirty indicator */}
        {isDirty && (
          <span style={{
            fontFamily: 'var(--font-host-grotesk)',
            fontSize: '10px',
            fontWeight: 600,
            color: '#B45A32',
            background: 'rgba(180, 90, 50, 0.10)',
            borderRadius: '9999px',
            padding: '2px 8px',
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            flexShrink: 0,
          }}>
            Sin guardar
          </span>
        )}

        {/* Editado badge */}
        {isCustomized && !isDirty && (
          <span style={{
            fontFamily: 'var(--font-host-grotesk)',
            fontSize: '10px',
            fontWeight: 600,
            color: '#CD796C',
            background: 'rgba(205, 121, 108, 0.1)',
            borderRadius: '9999px',
            padding: '2px 8px',
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            flexShrink: 0,
          }}>
            Editado
          </span>
        )}
      </div>

      {/* Input */}
      {rows === 0 ? (
        <input
          type="text"
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          style={inputStyle}
        />
      ) : (
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          rows={rows}
          style={{ ...inputStyle, resize: 'vertical', minHeight: rows * 22 }}
        />
      )}

      {/* Status + Save + Restore row */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 'var(--space-2)',
        minHeight: 28,
        gap: 'var(--space-2)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
          {/* Save button — only when dirty */}
          {isDirty && (
            <button
              onClick={handleSave}
              disabled={status === 'saving'}
              style={{
                fontFamily: 'var(--font-host-grotesk)',
                fontSize: 'var(--text-caption)',
                fontWeight: 600,
                color: '#FFFFFF',
                background: status === 'saving' ? 'rgba(38, 66, 51, 0.5)' : '#264233',
                border: 'none',
                borderRadius: 'var(--radius-pill)',
                padding: '4px 14px',
                cursor: status === 'saving' ? 'wait' : 'pointer',
                transition: 'background 150ms ease',
              }}
            >
              {status === 'saving' ? 'Guardando...' : 'Guardar'}
            </button>
          )}

          <SaveIndicator status={status} />
        </div>

        {isCustomized && (
          <button
            onClick={handleRestore}
            onBlur={() => setConfirmRestore(false)}
            style={{
              fontFamily: 'var(--font-host-grotesk)',
              fontSize: 'var(--text-caption)',
              color: confirmRestore ? 'var(--color-error)' : '#CD796C',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              textDecoration: 'underline',
              padding: 0,
            }}
          >
            {confirmRestore ? '¿Confirmar restaurar?' : 'Restaurar'}
          </button>
        )}
      </div>

      {/* Original text (when customized) */}
      {isCustomized && (
        <div style={{ marginTop: 'var(--space-2)' }}>
          <button
            onClick={() => setShowOriginal(!showOriginal)}
            style={{
              fontFamily: 'var(--font-host-grotesk)',
              fontSize: 'var(--text-caption)',
              color: 'var(--color-text-tertiary)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
            }}
          >
            {showOriginal ? '▾ Ocultar original' : '▸ Ver original'}
          </button>
          {showOriginal && (
            <p style={{
              fontFamily: 'var(--font-host-grotesk)',
              fontSize: 'var(--text-caption)',
              color: 'var(--color-text-tertiary)',
              margin: '4px 0 0 0',
              lineHeight: 1.5,
              fontStyle: 'italic',
              padding: 'var(--space-2) var(--space-3)',
              background: 'rgba(30, 19, 16, 0.03)',
              borderRadius: 'var(--radius-sm)',
            }}>
              {entry.defaultValue}
            </p>
          )}
        </div>
      )}
    </div>
  )
}

export const CopyEditorField = memo(CopyEditorFieldInner)

// ─── Save indicator ──────────────────────────────────────────────────────────

function SaveIndicator({ status }: { status: SaveStatus }) {
  if (status === 'idle') return <span />

  const config = {
    saving: { text: 'Guardando...', color: 'var(--color-text-tertiary)' },
    saved: { text: 'Guardado \u2713', color: 'var(--color-success)' },
    error: { text: 'Error al guardar', color: 'var(--color-error)' },
  }[status]

  return (
    <span style={{
      fontFamily: 'var(--font-host-grotesk)',
      fontSize: 'var(--text-caption)',
      color: config.color,
      transition: 'opacity 150ms ease',
    }}>
      {config.text}
    </span>
  )
}

// ─── Shared input style ──────────────────────────────────────────────────────

const inputStyle: React.CSSProperties = {
  width: '100%',
  fontFamily: 'var(--font-host-grotesk)',
  fontSize: 'var(--text-body-sm)',
  color: 'var(--color-text-primary)',
  background: 'var(--color-bg-secondary)',
  border: '1px solid rgba(30, 19, 16, 0.08)',
  borderRadius: 'var(--radius-lg)',
  padding: 'var(--space-3) var(--space-4)',
  lineHeight: 1.5,
  outline: 'none',
  boxSizing: 'border-box',
  transition: 'border-color 150ms ease',
}
