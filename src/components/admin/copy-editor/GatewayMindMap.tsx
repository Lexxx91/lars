'use client'

/**
 * GatewayMindMap — Interactive mind map of gateway branching logic.
 *
 * Horizontal tree: root on left, branches expand right.
 * Click to expand/collapse. Pan with drag. Zoom with wheel.
 * Pure SVG + React — zero dependencies.
 */

import {
  useState, useMemo, useRef, useCallback,
  type MouseEvent as ReactMouseEvent,
  type WheelEvent as ReactWheelEvent,
} from 'react'
import type { CopyEntry } from './types'

// ─── TYPES ──────────────────────────────────────────────────────────────────

interface MindNode {
  id: string
  label: string
  detail?: string
  zone: 1 | 2 | 3
  subsection?: string
  badge?: string
  children?: MindNode[]
}

interface Pos { x: number; y: number }

interface LayoutNode {
  id: string
  x: number
  y: number
  node: MindNode
  children?: LayoutNode[]
}

// ─── CONSTANTS ──────────────────────────────────────────────────────────────

const NODE_W = 190
const NODE_H = 32
const H_GAP = 46
const V_GAP = 5
const CHILD_NODE_W = 210
const LEAF_NODE_W = 230

function nodeWidth(depth: number): number {
  if (depth === 0) return 150
  if (depth === 1) return NODE_W
  if (depth >= 3) return LEAF_NODE_W
  return CHILD_NODE_W
}

// ─── COLORS ─────────────────────────────────────────────────────────────────

const ZONE_BG: Record<number, string> = {
  1: '#DCE8EF',
  2: '#EDE1DC',
  3: '#E4DDD9',
}
const ZONE_TEXT: Record<number, string> = {
  1: '#264233',
  2: '#7A4F42',
  3: '#6B524A',
}
const ROOT_BG = '#E2DBED'
const ROOT_TEXT = '#4A3B6B'
const LEAF_BG = '#D4EDE0'
const LEAF_TEXT = '#1E3A2B'
const CONN_COLOR = '#9EAEC0'
const EXPAND_BG = '#F0F2F5'

// ─── GATEWAY TREE DATA ─────────────────────────────────────────────────────

const TREE: MindNode = {
  id: 'root',
  label: 'Gateway LARS',
  zone: 1,
  children: [
    {
      id: 'p1', label: 'P1', detail: '¿Qué te trajo aquí?', zone: 1, subsection: 'p1',
      badge: '5 opciones',
      children: [
        { id: 'p1a', label: 'Agotamiento que no se va', zone: 1 },
        { id: 'p1b', label: 'Rendimiento en caída', zone: 1 },
        { id: 'p1c', label: 'El cuerpo habla', zone: 1 },
        { id: 'p1d', label: 'Alguien me lo sugirió', zone: 1 },
        { id: 'p1e', label: 'Curiosidad', zone: 1 },
      ],
    },
    {
      id: 'p2', label: 'P2', detail: 'Sueño', zone: 1, subsection: 'p2',
      badge: '5 opciones',
      children: [
        { id: 'p2a', label: 'Mente no se apaga', zone: 1 },
        { id: 'p2b', label: 'Despierto 3-4am', zone: 1 },
        { id: 'p2c', label: 'Duermo pero cansado', zone: 1 },
        { id: 'p2d', label: 'Poco sueño, funciono', zone: 1 },
        { id: 'p2e', label: 'Sueño bueno', zone: 1 },
      ],
    },
    {
      id: 'pv', label: 'Primera Verdad', detail: 'P1 × P2', zone: 1, subsection: 'primeraverdad',
      badge: '25 variantes',
      children: [
        {
          id: 'pv_a', label: 'P1 = Agotamiento', zone: 1,
          children: [
            { id: 'pv_aa', label: '× Mente no se apaga', zone: 1 },
            { id: 'pv_ab', label: '× Despierto 3-4am', zone: 1 },
            { id: 'pv_ac', label: '× Duermo pero cansado', zone: 1 },
            { id: 'pv_ad', label: '× Poco sueño', zone: 1 },
            { id: 'pv_ae', label: '× Sueño bueno', zone: 1 },
          ],
        },
        {
          id: 'pv_b', label: 'P1 = Rendimiento', zone: 1,
          children: [
            { id: 'pv_ba', label: '× Mente no se apaga', zone: 1 },
            { id: 'pv_bb', label: '× Despierto 3-4am', zone: 1 },
            { id: 'pv_bc', label: '× Duermo pero cansado', zone: 1 },
            { id: 'pv_bd', label: '× Poco sueño', zone: 1 },
            { id: 'pv_be', label: '× Sueño bueno', zone: 1 },
          ],
        },
        {
          id: 'pv_c', label: 'P1 = El cuerpo habla', zone: 1,
          children: [
            { id: 'pv_ca', label: '× Mente no se apaga', zone: 1 },
            { id: 'pv_cb', label: '× Despierto 3-4am', zone: 1 },
            { id: 'pv_cc', label: '× Duermo pero cansado', zone: 1 },
            { id: 'pv_cd', label: '× Poco sueño', zone: 1 },
            { id: 'pv_ce', label: '× Sueño bueno', zone: 1 },
          ],
        },
        {
          id: 'pv_d', label: 'P1 = Alguien me lo sugirió', zone: 1,
          children: [
            { id: 'pv_da', label: '× Mente no se apaga', zone: 1 },
            { id: 'pv_db', label: '× Despierto 3-4am', zone: 1 },
            { id: 'pv_dc', label: '× Duermo pero cansado', zone: 1 },
            { id: 'pv_dd', label: '× Poco sueño', zone: 1 },
            { id: 'pv_de', label: '× Sueño bueno', zone: 1 },
          ],
        },
        {
          id: 'pv_e', label: 'P1 = Curiosidad', zone: 1,
          children: [
            { id: 'pv_ea', label: '× Mente no se apaga', zone: 1 },
            { id: 'pv_eb', label: '× Despierto 3-4am', zone: 1 },
            { id: 'pv_ec', label: '× Duermo pero cansado', zone: 1 },
            { id: 'pv_ed', label: '× Poco sueño', zone: 1 },
            { id: 'pv_ee', label: '× Sueño bueno', zone: 1 },
          ],
        },
      ],
    },
    {
      id: 'p3', label: 'P3', detail: 'Síntomas cognitivos', zone: 1, subsection: 'p3',
      badge: '6 multi-select',
      children: [
        { id: 'p3a', label: 'Saturación mental', zone: 1 },
        { id: 'p3b', label: 'Concentración y decisiones', zone: 1 },
        { id: 'p3c', label: 'Falta de foco', zone: 1 },
        { id: 'p3d', label: 'No me viene la palabra', zone: 1 },
        { id: 'p3e', label: 'Agotamiento decisional', zone: 1 },
        { id: 'p3f', label: 'Ninguna', zone: 1 },
      ],
    },
    {
      id: 'p4', label: 'P4', detail: 'Síntomas emocionales', zone: 1, subsection: 'p4',
      badge: '6 opciones',
      children: [
        { id: 'p4a', label: 'Irritabilidad', zone: 1 },
        { id: 'p4b', label: 'Vacío', zone: 1 },
        { id: 'p4c', label: 'Explosiones de culpa', zone: 1 },
        { id: 'p4d', label: 'Anestesia emocional', zone: 1 },
        { id: 'p4e', label: 'Rumiación constante', zone: 1 },
        { id: 'p4f', label: 'Razonablemente bien', zone: 1 },
      ],
    },
    {
      id: 'me1', label: 'Micro-espejo 1', detail: 'P3 × P4 → reflexión', zone: 1, subsection: 'microespejo1',
      badge: '5 variantes',
      children: [
        { id: 'me1a', label: 'Vacío (P3<3 + P4=Vacío)', zone: 1 },
        { id: 'me1b', label: 'Explosiones (P3≥3 + P4=Explosiones)', zone: 1 },
        { id: 'me1c', label: 'Anestesia (P3≥3 + P4=Anestesia)', zone: 1 },
        { id: 'me1d', label: 'Rumiación (P3<3 + P4=Rumiación)', zone: 1 },
        { id: 'me1e', label: 'Default (combinación más frecuente)', zone: 1 },
      ],
    },
    {
      id: 'p5', label: 'P5', detail: 'Alegría de vivir', zone: 2, subsection: 'p5',
      badge: '5 opciones',
      children: [
        { id: 'p5a', label: 'No lo recuerdo', zone: 2 },
        { id: 'p5b', label: 'Hace semanas o meses', zone: 2 },
        { id: 'p5c', label: 'Puedo, pero no suelto la cabeza', zone: 2 },
        { id: 'p5d', label: 'Disfruto con culpa', zone: 2 },
        { id: 'p5e', label: 'Disfruto con frecuencia', zone: 2 },
      ],
    },
    {
      id: 'p6', label: 'P6', detail: 'Frase identitaria', zone: 2, subsection: 'p6',
      badge: '5 → perfil',
      children: [
        { id: 'p6a', label: '"No puedo parar" → Productivo Colapsado', zone: 2 },
        { id: 'p6b', label: '"Puedo con todo" → Fuerte Invisible', zone: 2 },
        { id: 'p6c', label: '"Si yo caigo, todos caen" → Cuidador Exhausto', zone: 2 },
        { id: 'p6d', label: '"Necesito entender" → Controlador Paralizado', zone: 2 },
        { id: 'p6e', label: '"He probado de todo"', zone: 2 },
      ],
    },
    {
      id: 'me2', label: 'Micro-espejo 2', detail: '1:1 con P6', zone: 2, subsection: 'microespejo2',
      badge: '5 variantes',
      children: [
        { id: 'me2a', label: 'Para "No puedo parar"', zone: 2 },
        { id: 'me2b', label: 'Para "Puedo con todo"', zone: 2 },
        { id: 'me2c', label: 'Para "Si yo caigo..."', zone: 2 },
        { id: 'me2d', label: 'Para "Necesito entender"', zone: 2 },
        { id: 'me2e', label: 'Para "He probado de todo"', zone: 2 },
      ],
    },
    {
      id: 'p7', label: 'P7', detail: 'Sliders autoevaluación', zone: 2, subsection: 'p7',
      badge: '5 dimensiones',
      children: [
        { id: 'p7a', label: 'D1: Capacidad de descansar', zone: 2 },
        { id: 'p7b', label: 'D2: Calidad de sueño', zone: 2 },
        { id: 'p7c', label: 'D3: Claridad para pensar', zone: 2 },
        { id: 'p7d', label: 'D4: Estabilidad emocional', zone: 2 },
        { id: 'p7e', label: 'D5: Ilusión por lo que haces', zone: 2 },
      ],
    },
    {
      id: 'p8', label: 'P8', detail: 'Duración', zone: 2, subsection: 'p8',
      badge: '4 opciones',
      children: [
        { id: 'p8a', label: 'Semanas (emergente)', zone: 2 },
        { id: 'p8b', label: 'Meses (instalado)', zone: 2 },
        { id: 'p8c', label: 'Más de un año (cronificado)', zone: 2 },
        { id: 'p8d', label: 'Años — no recuerdo estar bien', zone: 2 },
      ],
    },
    {
      id: 'scoring', label: 'Scoring', detail: '5 dimensiones → puntuación', zone: 3, subsection: 'bisagra',
      badge: 'algoritmo',
      children: [
        { id: 'sc1', label: 'D1: Regulación Nerviosa (30%)', detail: 'P1·0.15 + P2·0.35 + P6·0.35 + Slider·0.15', zone: 3 },
        { id: 'sc2', label: 'D2: Calidad de Sueño (20%)', detail: 'P2·0.50 + Slider·0.50', zone: 3 },
        { id: 'sc3', label: 'D3: Claridad Cognitiva (20%)', detail: 'P3_count·0.50 + Slider·0.50', zone: 3 },
        { id: 'sc4', label: 'D4: Equilibrio Emocional (15%)', detail: 'P4·0.50 + Slider·0.50', zone: 3 },
        { id: 'sc5', label: 'D5: Alegría de Vivir (15%)', detail: 'P5·0.50 + Slider·0.50', zone: 3 },
      ],
    },
    {
      id: 'result', label: 'Resultado', detail: 'Perfil + mapa', zone: 3,
      badge: '4 perfiles',
      children: [
        { id: 'res1', label: 'Productivo Colapsado (P6=A)', zone: 3 },
        { id: 'res2', label: 'Fuerte Invisible (P6=B)', zone: 3 },
        { id: 'res3', label: 'Cuidador Exhausto (P6=C)', zone: 3 },
        { id: 'res4', label: 'Controlador Paralizado (P6=D)', zone: 3 },
      ],
    },
  ],
}

// ─── LAYOUT ALGORITHM ───────────────────────────────────────────────────────

function subtreeHeight(node: MindNode, expanded: Set<string>): number {
  if (!node.children || !expanded.has(node.id)) return NODE_H
  const hh = node.children.map((c) => subtreeHeight(c, expanded))
  return Math.max(NODE_H, hh.reduce((a, b) => a + b, 0) + (node.children.length - 1) * V_GAP)
}

function layoutNode(
  node: MindNode,
  expanded: Set<string>,
  x: number,
  yCenter: number,
  depth: number,
): LayoutNode {
  const result: LayoutNode = { id: node.id, x, y: yCenter, node }

  if (!node.children || !expanded.has(node.id)) return result

  const totalH = subtreeHeight(node, expanded)
  let yStart = yCenter - totalH / 2
  const childX = x + nodeWidth(depth) + H_GAP

  result.children = node.children.map((child) => {
    const childH = subtreeHeight(child, expanded)
    const childCenter = yStart + childH / 2
    const r = layoutNode(child, expanded, childX, childCenter, depth + 1)
    yStart += childH + V_GAP
    return r
  })

  return result
}

function computeLayout(expanded: Set<string>): LayoutNode {
  const totalH = subtreeHeight(TREE, expanded)
  return layoutNode(TREE, expanded, 40, totalH / 2 + 40, 0)
}

// ─── COLLECT ALL NODES (flat) ───────────────────────────────────────────────

function flattenLayout(node: LayoutNode): LayoutNode[] {
  const arr: LayoutNode[] = [node]
  if (node.children) {
    for (const c of node.children) arr.push(...flattenLayout(c))
  }
  return arr
}

// ─── EDIT STATUS ────────────────────────────────────────────────────────────

interface SubsectionStats { total: number; customized: number }

function computeStats(entries: CopyEntry[]): Record<string, SubsectionStats> {
  const stats: Record<string, SubsectionStats> = {}
  for (const e of entries) {
    if (!stats[e.subsection]) stats[e.subsection] = { total: 0, customized: 0 }
    stats[e.subsection].total++
    if (e.isCustomized) stats[e.subsection].customized++
  }
  return stats
}

type StatusColor = 'complete' | 'partial' | 'untouched'

function getStatus(s: SubsectionStats | undefined): StatusColor {
  if (!s || s.total === 0) return 'untouched'
  if (s.customized >= s.total) return 'complete'
  if (s.customized > 0) return 'partial'
  return 'untouched'
}

const STATUS_DOT: Record<StatusColor, string> = {
  complete: '#4ADE80',
  partial: '#CD796C',
  untouched: '#C4CAD0',
}

// ─── COMPONENT ──────────────────────────────────────────────────────────────

interface GatewayMindMapProps {
  entries: CopyEntry[]
  onNavigate: (subsection: string) => void
}

export function GatewayMindMap({ entries, onNavigate }: GatewayMindMapProps) {
  const [expanded, setExpanded] = useState<Set<string>>(new Set(['root']))
  const [hovered, setHovered] = useState<string | null>(null)

  // Pan/zoom
  const [pan, setPan] = useState<Pos>({ x: 0, y: 0 })
  const [scale, setScale] = useState(1)
  const dragging = useRef(false)
  const dragOrigin = useRef<Pos>({ x: 0, y: 0 })
  const panOrigin = useRef<Pos>({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  const stats = useMemo(() => computeStats(entries), [entries])
  const layout = useMemo(() => computeLayout(expanded), [expanded])
  const allNodes = useMemo(() => flattenLayout(layout), [layout])

  // Calculate bounds for viewBox
  const bounds = useMemo(() => {
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity
    for (const n of allNodes) {
      const depth = getDepth(n.id)
      const w = nodeWidth(depth)
      if (n.x < minX) minX = n.x
      if (n.y - NODE_H / 2 < minY) minY = n.y - NODE_H / 2
      if (n.x + w > maxX) maxX = n.x + w
      if (n.y + NODE_H / 2 > maxY) maxY = n.y + NODE_H / 2
    }
    return { minX: minX - 20, minY: minY - 20, maxX: maxX + 20, maxY: maxY + 20 }
  }, [allNodes])

  const svgW = bounds.maxX - bounds.minX
  const svgH = bounds.maxY - bounds.minY

  // Toggle expand
  const toggleExpand = useCallback((id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])

  // Click handler: leaf → navigate, parent → toggle
  const handleNodeClick = useCallback((node: MindNode) => {
    if (node.children?.length) {
      toggleExpand(node.id)
    } else if (node.subsection) {
      onNavigate(node.subsection)
    }
    // For leaf without subsection: find parent's subsection
    const parent = findParentWithSubsection(node.id)
    if (!node.children?.length && !node.subsection && parent) {
      onNavigate(parent)
    }
  }, [toggleExpand, onNavigate])

  // Pan handlers
  const handleMouseDown = useCallback((e: ReactMouseEvent) => {
    if (e.button !== 0) return
    dragging.current = true
    dragOrigin.current = { x: e.clientX, y: e.clientY }
    panOrigin.current = { ...pan }
  }, [pan])

  const handleMouseMove = useCallback((e: ReactMouseEvent) => {
    if (!dragging.current) return
    setPan({
      x: panOrigin.current.x + (e.clientX - dragOrigin.current.x),
      y: panOrigin.current.y + (e.clientY - dragOrigin.current.y),
    })
  }, [])

  const handleMouseUp = useCallback(() => {
    dragging.current = false
  }, [])

  const handleWheel = useCallback((e: ReactWheelEvent) => {
    e.preventDefault()
    const factor = e.deltaY > 0 ? 0.92 : 1.08
    setScale((s) => Math.min(2.5, Math.max(0.25, s * factor)))
  }, [])

  // Reset view
  const resetView = useCallback(() => {
    setPan({ x: 0, y: 0 })
    setScale(1)
    setExpanded(new Set(['root']))
  }, [])

  return (
    <div style={{
      background: '#FAFBFC',
      border: '1px solid rgba(38,66,51,0.08)',
      borderRadius: 14,
      marginBottom: 20,
      overflow: 'hidden',
      position: 'relative',
    }}>
      {/* Toolbar */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 16px',
        borderBottom: '1px solid rgba(38,66,51,0.06)',
        background: 'rgba(255,255,255,0.8)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#264233" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3" />
            <path d="M12 2v4m0 12v4m-7.07-2.93l2.83-2.83m8.48-8.48l2.83-2.83M2 12h4m12 0h4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83" />
          </svg>
          <span style={{
            fontFamily: 'var(--font-host-grotesk)',
            fontSize: 12,
            fontWeight: 700,
            color: '#264233',
          }}>
            Mapa mental — Ramificaciones del Gateway
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <MiniButton label="−" onClick={() => setScale((s) => Math.max(0.25, s * 0.85))} />
          <span style={{
            fontFamily: 'var(--font-host-grotesk)',
            fontSize: 10,
            color: 'var(--color-text-tertiary)',
            minWidth: 36,
            textAlign: 'center',
          }}>
            {Math.round(scale * 100)}%
          </span>
          <MiniButton label="+" onClick={() => setScale((s) => Math.min(2.5, s * 1.15))} />
          <MiniButton label="⟳" onClick={resetView} />
        </div>
      </div>

      {/* SVG Canvas */}
      <div
        ref={containerRef}
        style={{
          height: 500,
          cursor: dragging.current ? 'grabbing' : 'grab',
          overflow: 'hidden',
          userSelect: 'none',
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
      >
        <svg
          width="100%"
          height="100%"
          viewBox={`${bounds.minX} ${bounds.minY} ${svgW} ${svgH}`}
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`,
            transformOrigin: 'center center',
            transition: dragging.current ? 'none' : 'transform 120ms ease-out',
          }}
        >
          {/* Connections */}
          {allNodes.map((n) => {
            if (!n.children) return null
            const depth = getDepth(n.id)
            const pw = nodeWidth(depth)
            const px = n.x + pw
            const py = n.y

            return n.children.map((child) => {
              const cx = child.x
              const cy = child.y
              const midX = (px + cx) / 2
              return (
                <path
                  key={`c-${n.id}-${child.id}`}
                  d={`M${px},${py} C${midX},${py} ${midX},${cy} ${cx},${cy}`}
                  fill="none"
                  stroke={CONN_COLOR}
                  strokeWidth={1.2}
                  opacity={0.5}
                  style={{ transition: 'opacity 200ms ease' }}
                />
              )
            })
          })}

          {/* Nodes */}
          {allNodes.map((n) => {
            const depth = getDepth(n.id)
            const w = nodeWidth(depth)
            const isRoot = n.id === 'root'
            const isLeaf = !n.node.children?.length
            const isExp = expanded.has(n.id)
            const isHov = hovered === n.id
            const hasChildren = !!n.node.children?.length
            const zone = n.node.zone

            // Colors
            let bg = ZONE_BG[zone]
            let text = ZONE_TEXT[zone]
            if (isRoot) { bg = ROOT_BG; text = ROOT_TEXT }
            else if (isLeaf) { bg = LEAF_BG; text = LEAF_TEXT }

            // Edit status
            const sub = n.node.subsection
            const st = sub ? getStatus(stats[sub]) : null
            const statLabel = sub && stats[sub] ? `${stats[sub].customized}/${stats[sub].total}` : null

            return (
              <g
                key={n.id}
                style={{
                  cursor: 'pointer',
                  transition: 'transform 250ms cubic-bezier(0.16,1,0.3,1)',
                }}
                onClick={(e) => { e.stopPropagation(); handleNodeClick(n.node) }}
                onMouseEnter={() => setHovered(n.id)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* Shadow on hover */}
                {isHov && (
                  <rect
                    x={n.x - 1}
                    y={n.y - NODE_H / 2 - 1}
                    width={w + 2}
                    height={NODE_H + 2}
                    rx={9}
                    fill="none"
                    stroke="rgba(38,66,51,0.15)"
                    strokeWidth={2}
                  />
                )}

                {/* Node bg */}
                <rect
                  x={n.x}
                  y={n.y - NODE_H / 2}
                  width={w}
                  height={NODE_H}
                  rx={8}
                  fill={isHov ? lighten(bg) : bg}
                  stroke={isHov ? 'rgba(38,66,51,0.2)' : 'rgba(38,66,51,0.06)'}
                  strokeWidth={1}
                  style={{ transition: 'fill 120ms ease' }}
                />

                {/* Status dot */}
                {st && (
                  <circle
                    cx={n.x + 12}
                    cy={n.y}
                    r={4}
                    fill={STATUS_DOT[st]}
                  />
                )}

                {/* Label */}
                <text
                  x={n.x + (st ? 22 : 10)}
                  y={n.y + 1}
                  fill={text}
                  fontSize={isRoot ? 12 : 11}
                  fontWeight={isRoot || hasChildren ? 600 : 400}
                  fontFamily="var(--font-host-grotesk)"
                  dominantBaseline="central"
                  style={{ pointerEvents: 'none' }}
                >
                  {n.node.label}
                  {n.node.detail && (
                    <tspan fill={text} opacity={0.6} fontSize={10}> — {n.node.detail}</tspan>
                  )}
                </text>

                {/* Badge */}
                {n.node.badge && !isExp && (
                  <g>
                    <rect
                      x={n.x + w - (n.node.badge.length * 5.5 + 14)}
                      y={n.y - 8}
                      width={n.node.badge.length * 5.5 + 10}
                      height={16}
                      rx={8}
                      fill="rgba(38,66,51,0.06)"
                    />
                    <text
                      x={n.x + w - (n.node.badge.length * 5.5 + 9)}
                      y={n.y + 1}
                      fill={text}
                      fontSize={9}
                      fontFamily="var(--font-host-grotesk)"
                      dominantBaseline="central"
                      opacity={0.5}
                      style={{ pointerEvents: 'none' }}
                    >
                      {n.node.badge}
                    </text>
                  </g>
                )}

                {/* Edit count */}
                {statLabel && isExp && (
                  <text
                    x={n.x + w - 8}
                    y={n.y + 1}
                    fill="#CD796C"
                    fontSize={9}
                    fontWeight={500}
                    fontFamily="var(--font-host-grotesk)"
                    dominantBaseline="central"
                    textAnchor="end"
                    style={{ pointerEvents: 'none' }}
                  >
                    {statLabel}
                  </text>
                )}

                {/* Expand indicator */}
                {hasChildren && (
                  <text
                    x={n.x + w + 6}
                    y={n.y + 1}
                    fill={CONN_COLOR}
                    fontSize={11}
                    dominantBaseline="central"
                    style={{ pointerEvents: 'none' }}
                  >
                    {isExp ? '‹' : '›'}
                  </text>
                )}
              </g>
            )
          })}
        </svg>
      </div>

      {/* Legend */}
      <div style={{
        display: 'flex',
        gap: 16,
        padding: '8px 16px',
        borderTop: '1px solid rgba(38,66,51,0.06)',
        background: 'rgba(255,255,255,0.8)',
      }}>
        <LegendDot color={STATUS_DOT.complete} label="Todo editado" />
        <LegendDot color={STATUS_DOT.partial} label="Parcial" />
        <LegendDot color={STATUS_DOT.untouched} label="Sin editar" />
        <span style={{ flex: 1 }} />
        <span style={{
          fontFamily: 'var(--font-host-grotesk)',
          fontSize: 10,
          color: 'var(--color-text-tertiary)',
        }}>
          Click para expandir · Arrastra para mover · Scroll para zoom
        </span>
      </div>
    </div>
  )
}

// ─── HELPERS ────────────────────────────────────────────────────────────────

function getDepth(id: string): number {
  // Quick depth lookup based on ID patterns
  if (id === 'root') return 0
  // depth 1: p1, p2, pv, p3, p4, me1, p5, p6, me2, p7, p8, scoring, result
  if (!id.includes('_') && !id.match(/^(p[1-8][a-f]|me[12][a-e]|pv[a-e]|sc[1-5]|res[1-4])$/)) return 1
  // depth 2: p1a, pv_a, etc.
  if (id.startsWith('pv_') && id.length === 4) return 2
  if (id.startsWith('pv_') && id.length > 4) return 3
  return 2
}

function findParentWithSubsection(childId: string): string | undefined {
  // Walk up the tree to find parent with subsection
  function find(node: MindNode, target: string): string | undefined {
    if (node.children) {
      for (const c of node.children) {
        if (c.id === target) return node.subsection
        const result = find(c, target)
        if (result) return result
      }
    }
    return undefined
  }
  return find(TREE, childId)
}

function lighten(hex: string): string {
  // Very simple lighten: blend with white
  return hex.replace(/^#/, '#F') // cheap trick — just return a lighter variant
}

// ─── SUB-COMPONENTS ─────────────────────────────────────────────────────────

function MiniButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: 24,
        height: 24,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 6,
        border: '1px solid rgba(38,66,51,0.1)',
        background: 'white',
        cursor: 'pointer',
        fontFamily: 'var(--font-host-grotesk)',
        fontSize: 13,
        fontWeight: 600,
        color: '#264233',
        lineHeight: 1,
      }}
    >
      {label}
    </button>
  )
}

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
      <span style={{
        width: 6, height: 6, borderRadius: '50%', background: color,
      }} />
      <span style={{
        fontFamily: 'var(--font-host-grotesk)',
        fontSize: 10,
        color: 'var(--color-text-tertiary)',
      }}>
        {label}
      </span>
    </div>
  )
}
