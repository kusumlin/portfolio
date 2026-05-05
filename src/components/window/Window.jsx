import React, { useState, useRef, useEffect } from 'react'
import { useDraggable } from '../../hooks/useDraggable'

function TrafficLight({ color, symbol, onClick, onMouseDown }) {
  const [hovered, setHovered] = useState(false)
  return (
    <button
      onClick={onClick}
      onMouseDown={onMouseDown}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: 14, height: 14, borderRadius: '50%', background: color,
        border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', flexShrink: 0, boxShadow: 'inset 0 0 0 0.5px rgba(0,0,0,0.12)',
      }}
    >
      {hovered && (
        <span style={{ fontSize: 9, fontWeight: 900, color: 'rgba(0,0,0,0.45)', lineHeight: 1, userSelect: 'none' }}>
          {symbol}
        </span>
      )}
    </button>
  )
}

// Resize handle: invisible strip along an edge or corner
function ResizeHandle({ dir, onResizeStart }) {
  const EDGE = 6
  const CORNER = 14
  const isCorner = dir.length === 2
  const size = isCorner ? CORNER : EDGE

  const style = {
    position: 'absolute', zIndex: 10,
    cursor: `${dir}-resize`,
  }

  if (dir === 'e')  Object.assign(style, { top: CORNER, right: 0,      width: EDGE,   bottom: CORNER, height: 'auto' })
  if (dir === 'w')  Object.assign(style, { top: CORNER, left: 0,       width: EDGE,   bottom: CORNER, height: 'auto' })
  if (dir === 's')  Object.assign(style, { bottom: 0,   left: CORNER,  height: EDGE,  right: CORNER,  width: 'auto' })
  if (dir === 'n')  Object.assign(style, { top: 0,      left: CORNER,  height: EDGE,  right: CORNER,  width: 'auto' })
  if (dir === 'se') Object.assign(style, { bottom: 0,   right: 0,      width: size,   height: size })
  if (dir === 'sw') Object.assign(style, { bottom: 0,   left: 0,       width: size,   height: size })
  if (dir === 'ne') Object.assign(style, { top: 0,      right: 0,      width: size,   height: size })
  if (dir === 'nw') Object.assign(style, { top: 0,      left: 0,       width: size,   height: size })

  return <div style={style} onMouseDown={e => { e.stopPropagation(); onResizeStart(dir, e) }} />
}

const MIN_W = 320
const MIN_H = 200

export default function Window({
  title, icon, children,
  initialPos = { x: 120, y: 60 },
  width = 640, height = 460,
  onClose, onFocus, onMinimize,
  minimized = false,
  zIndex = 10,
}) {
  const { ref: outerRef, onMouseDown } = useDraggable(initialPos)
  const contentRef = useRef(null)
  const sizeRef    = useRef({ w: width, h: height })
  const resizing   = useRef(null)

  // Set initial size on mount
  useEffect(() => {
    if (outerRef.current)  outerRef.current.style.width = `${width}px`
    if (contentRef.current) contentRef.current.style.height = `${height}px`
    sizeRef.current = { w: width, h: height }
  }, [])

  // Resize mouse events
  useEffect(() => {
    const onMove = (e) => {
      if (!resizing.current) return
      const { dir, startX, startY, startW, startH, startTx, startTy } = resizing.current
      const dx = e.clientX - startX
      const dy = e.clientY - startY

      let w = startW, h = startH, tx = startTx, ty = startTy
      const vw = window.innerWidth
      const MENU_H = 44

      if (dir.includes('e')) w = Math.min(Math.max(MIN_W, startW + dx), vw - startTx)
      if (dir.includes('s')) h = Math.max(MIN_H, startH + dy)
      if (dir.includes('w')) {
        w = Math.max(MIN_W, startW - dx)
        tx = Math.max(0, startTx + (startW - w))
        w = startTx + startW - tx
        w = Math.max(MIN_W, w)
      }
      if (dir.includes('n')) {
        h = Math.max(MIN_H, startH - dy)
        ty = Math.max(MENU_H, startTy + (startH - h))
        h = startTy + startH - ty
        h = Math.max(MIN_H, h)
      }

      sizeRef.current = { w, h }
      if (outerRef.current)   outerRef.current.style.width     = `${w}px`
      if (outerRef.current)   outerRef.current.style.transform = `translate3d(${tx}px, ${ty}px, 0)`
      if (contentRef.current) contentRef.current.style.height  = `${h}px`
    }

    const onUp = () => {
      if (!resizing.current) return
      resizing.current = null
      document.body.classList.remove('dragging')
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseup', onUp)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
  }, [])

  const startResize = (dir, e) => {
    e.preventDefault()
    const el = outerRef.current
    if (!el) return
    const m = el.style.transform.match(/translate3d\((.+?)px,\s*(.+?)px/)
    resizing.current = {
      dir,
      startX: e.clientX, startY: e.clientY,
      startW: sizeRef.current.w, startH: sizeRef.current.h,
      startTx: m ? parseFloat(m[1]) : 0,
      startTy: m ? parseFloat(m[2]) : 0,
    }
    document.body.classList.add('dragging')
  }

  return (
    <div
      ref={outerRef}
      className="absolute select-none"
      style={{ left: 0, top: 0, width, zIndex, position: 'absolute' }}
      onMouseDown={onFocus}
    >
      <div
        className="window-slide-down rounded-2xl mac-shadow"
        style={{ border: '1px solid rgba(210,200,185,0.4)', overflow: 'hidden', position: 'relative' }}
      >
        {/* Resize handles */}
        {['n','s','e','w','ne','nw','se','sw'].map(dir => (
          <ResizeHandle key={dir} dir={dir} onResizeStart={startResize} />
        ))}

        {/* Title bar */}
        <div
          className="flex items-center gap-3 px-4 cursor-grab active:cursor-grabbing"
          style={{
            height: 44, background: 'rgba(253,250,244,0.96)',
            backdropFilter: 'blur(20px) saturate(160%)',
            WebkitBackdropFilter: 'blur(20px) saturate(160%)',
            borderBottom: minimized ? 'none' : '1px solid rgba(210,200,180,0.3)',
          }}
          onMouseDown={onMouseDown}
        >
          <div className="flex items-center gap-[7px]" onMouseDown={e => e.stopPropagation()}>
            <TrafficLight color="#ff5f57" symbol="✕"
              onClick={e => { e.stopPropagation(); onClose?.() }}
              onMouseDown={e => e.stopPropagation()} />
            <TrafficLight color="#febc2e" symbol="−"
              onClick={e => { e.stopPropagation(); onMinimize?.() }}
              onMouseDown={e => e.stopPropagation()} />
            <TrafficLight color="#28c840" symbol="+" />
          </div>

          <div className="flex-1 flex items-center justify-center gap-2 pointer-events-none">
            {icon && <span className="text-base leading-none">{icon}</span>}
            <span className="text-[13px] font-semibold tracking-tight" style={{ color: '#6b5c45' }}>{title}</span>
          </div>
          <div className="w-[52px]" />
        </div>

        {/* Content */}
        <div
          ref={contentRef}
          style={{
            height: minimized ? 0 : height,
            overflow: 'hidden',
            background: '#fdfaf4',
            transition: minimized ? 'height 0.22s cubic-bezier(0.4,0,0.2,1)' : 'none',
          }}
        >
          {children}
        </div>
      </div>
    </div>
  )
}
