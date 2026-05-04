import React from 'react'
import { useDraggable } from '../../hooks/useDraggable'

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
  const { pos, onMouseDown } = useDraggable(initialPos)

  return (
    <div
      className="absolute window-slide-down select-none"
      style={{ left: pos.x, top: pos.y, width, zIndex }}
      onMouseDown={onFocus}
    >
      <div
        className="rounded-2xl overflow-hidden mac-shadow"
        style={{ border: '1px solid rgba(210,200,185,0.4)' }}
      >
        {/* ── Title bar ── */}
        <div
          className="flex items-center gap-3 px-4 py-[11px] cursor-grab active:cursor-grabbing"
          style={{
            background: 'rgba(253,250,244,0.96)',
            backdropFilter: 'blur(28px) saturate(160%)',
            WebkitBackdropFilter: 'blur(28px) saturate(160%)',
            borderBottom: '1px solid rgba(210,200,180,0.3)',
          }}
          onMouseDown={onMouseDown}
        >
          {/* Traffic-light controls */}
          <div className="flex items-center gap-[7px]" onMouseDown={(e) => e.stopPropagation()}>
            <button
              onClick={(e) => { e.stopPropagation(); onClose?.() }}
              onMouseDown={(e) => e.stopPropagation()}
              className="w-3 h-3 rounded-full transition-opacity hover:opacity-80 active:opacity-60"
              style={{ background: '#ff5f57' }}
              title="Close"
            />
            <button
              className="w-3 h-3 rounded-full opacity-90"
              style={{ background: '#febc2e' }}
              title="Minimize"
            />
            <button
              className="w-3 h-3 rounded-full opacity-90"
              style={{ background: '#28c840' }}
              title="Maximize"
            />
          </div>

          {/* Title */}
          <div className="flex-1 flex items-center justify-center gap-2 pointer-events-none">
            {icon && <span className="text-base leading-none">{icon}</span>}
            <span className="text-[13px] font-semibold tracking-tight" style={{ color: '#6b5c45' }}>{title}</span>
          </div>

          {/* Spacer to keep title visually centered */}
          <div className="w-[52px]" />
        </div>

        {/* ── Content area ── */}
        <div
          style={{
            height,
            background: '#fdfaf4',
            overflow: 'hidden',
          }}
        >
          {children}
        </div>
      </div>
    </div>
  )
}
