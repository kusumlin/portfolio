import React, { useState } from 'react'
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
        width: 14,
        height: 14,
        borderRadius: '50%',
        background: color,
        border: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: onClick ? 'pointer' : 'default',
        flexShrink: 0,
        boxShadow: `inset 0 0 0 0.5px rgba(0,0,0,0.12)`,
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

export default function Window({
  title,
  icon,
  children,
  initialPos = { x: 120, y: 60 },
  width = 640,
  height = 460,
  onClose,
  onFocus,
  zIndex = 10,
}) {
  // Outer div: handles position via transform (no CSS animation here)
  // Inner div: runs the slide-down animation independently
  // This separation prevents the animation's final `transform` from overriding position.
  const { ref, onMouseDown } = useDraggable(initialPos)

  return (
    <div
      ref={ref}
      className="absolute select-none"
      style={{ left: 0, top: 0, width, zIndex }}
      onMouseDown={onFocus}
    >
      <div className="window-slide-down rounded-2xl overflow-hidden mac-shadow"
        style={{ border: '1px solid rgba(210,200,185,0.4)' }}
      >
        {/* ── Title bar ── */}
        <div
          className="flex items-center gap-3 px-4 py-[11px] cursor-grab active:cursor-grabbing"
          style={{
            background: 'rgba(253,250,244,0.96)',
            backdropFilter: 'blur(20px) saturate(160%)',
            WebkitBackdropFilter: 'blur(20px) saturate(160%)',
            borderBottom: '1px solid rgba(210,200,180,0.3)',
          }}
          onMouseDown={onMouseDown}
        >
          {/* Traffic-light controls */}
          <div className="flex items-center gap-[7px]" onMouseDown={e => e.stopPropagation()}>
            <TrafficLight
              color="#ff5f57"
              symbol="✕"
              onClick={e => { e.stopPropagation(); onClose?.() }}
              onMouseDown={e => e.stopPropagation()}
            />
            <TrafficLight color="#febc2e" symbol="−" />
            <TrafficLight color="#28c840" symbol="+" />
          </div>

          {/* Title */}
          <div className="flex-1 flex items-center justify-center gap-2 pointer-events-none">
            {icon && <span className="text-base leading-none">{icon}</span>}
            <span className="text-[13px] font-semibold tracking-tight" style={{ color: '#6b5c45' }}>{title}</span>
          </div>

          <div className="w-[52px]" />
        </div>

        {/* ── Content area ── */}
        <div style={{ height, background: '#fdfaf4', overflow: 'hidden' }}>
          {children}
        </div>
      </div>
    </div>
  )
}
