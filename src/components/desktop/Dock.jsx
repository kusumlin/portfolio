import React, { useState } from 'react'
import { resume } from '../../data/resume'

/* ── Image-based icons (from /public/icons/) ──────────── */
const IMG_ICONS = {
  notes:    '/icons/notes.jpg',
  chat:     '/icons/messages.jpg',
  terminal: '/icons/music.jpg',
  github:   '/icons/github.jpg',
  linkedin: '/icons/linkedin.jpg',
}

/* ── SVG fallback icons ───────────────────────────────── */


function PinkBooksIcon() {
  return (
    <svg viewBox="0 0 56 56" fill="none" className="w-full h-full">
      <defs>
        <linearGradient id="pb_bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F8C0CC" />
          <stop offset="100%" stopColor="#F298AE" />
        </linearGradient>
      </defs>
      <rect width="56" height="56" rx="13" fill="url(#pb_bg)" />
      <rect x="8" y="38" width="40" height="11" rx="3.5" fill="#C06070" />
      <rect x="8" y="38" width="7" height="11" rx="3" fill="#A84A5C" />
      <rect x="46" y="39" width="2" height="9" rx="1" fill="rgba(255,255,255,0.2)" />
      <rect x="8" y="26" width="40" height="12" rx="3.5" fill="#DE8898" />
      <rect x="8" y="26" width="7" height="12" rx="3" fill="#C47080" />
      <rect x="46" y="27" width="2" height="10" rx="1" fill="rgba(255,255,255,0.22)" />
      <rect x="8" y="12" width="40" height="14" rx="3.5" fill="#F4B4C4" />
      <rect x="8" y="12" width="7" height="14" rx="3" fill="#DCA0B0" />
      <rect x="46" y="13" width="2" height="12" rx="1" fill="rgba(255,255,255,0.25)" />
    </svg>
  )
}


function MailIcon() {
  return (
    <svg viewBox="0 0 56 56" fill="none" className="w-full h-full">
      <defs>
        <linearGradient id="mai_bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#72C8FF" />
          <stop offset="100%" stopColor="#3A98F2" />
        </linearGradient>
      </defs>
      <rect width="56" height="56" rx="13" fill="url(#mai_bg)" />
      <rect x="7" y="15" width="42" height="28" rx="4" fill="white" opacity="0.96" />
      <path d="M7 19 L28 33 L49 19" stroke="rgba(58,152,242,0.35)" strokeWidth="1.8" fill="none" />
      <line x1="7" y1="43" x2="21" y2="31" stroke="rgba(58,152,242,0.25)" strokeWidth="1.5" />
      <line x1="49" y1="43" x2="35" y2="31" stroke="rgba(58,152,242,0.25)" strokeWidth="1.5" />
    </svg>
  )
}

/* ── Item config ─────────────────────────────────────── */

const BEFORE_SEP = [
  { id: 'notes',    label: 'Projects',  Icon: null,           action: 'open'   },
  { id: 'gallery',  label: 'Gallery',   Icon: PinkBooksIcon,  action: 'open'   },
  { id: 'terminal', label: 'Skills',    Icon: null,           action: 'open'   },
  { id: 'chat',     label: 'Ask Me',    Icon: null,           action: 'open'   },
]

const AFTER_SEP = [
  { id: 'contacts', label: 'Contact',   Icon: MailIcon,       action: 'open'   },
  { id: 'github',   label: 'GitHub',    Icon: null,           action: 'link',   href: resume.github   },
  { id: 'linkedin', label: 'LinkedIn',  Icon: null,           action: 'link',   href: resume.linkedin },
]

const ALL_CLICKABLE = [...BEFORE_SEP, ...AFTER_SEP]

/* ── Dock ───────────────────────────────────────────── */
export default function Dock({ openApps, onOpen }) {
  const [hovered, setHovered] = useState(null)
  const [bouncing, setBouncing] = useState(null)

  const getScale = (id) => {
    if (!hovered) return 1
    const hovIdx = ALL_CLICKABLE.findIndex(a => a.id === hovered)
    const thisIdx = ALL_CLICKABLE.findIndex(a => a.id === id)
    const dist = Math.abs(hovIdx - thisIdx)
    if (dist === 0) return 1.35
    if (dist === 1) return 1.16
    if (dist === 2) return 1.06
    return 1
  }

  const handleClick = (item) => {
    if (item.action === 'open') {
      setBouncing(item.id)
      setTimeout(() => setBouncing(null), 360)
      onOpen(item.id)
    } else {
      window.open(item.href, '_blank', 'noopener,noreferrer')
    }
  }

  const renderIcon = (item) => {
    const scale = getScale(item.id)
    const isBouncing = bouncing === item.id
    const isOpen = item.action === 'open' && openApps.includes(item.id)
    const imgSrc = IMG_ICONS[item.id]

    return (
      <div key={item.id} className="flex flex-col items-center relative">
        {/* Tooltip label */}
        {hovered === item.id && (
          <div style={{
            position: 'absolute',
            bottom: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            marginBottom: 10,
            background: 'rgba(30,30,30,0.82)',
            color: 'white',
            fontSize: 12,
            fontWeight: 500,
            padding: '4px 10px',
            borderRadius: 7,
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            backdropFilter: 'blur(8px)',
            boxShadow: '0 2px 8px rgba(0,0,0,0.18)',
            zIndex: 100,
          }}>
            {item.label}
          </div>
        )}

        <button
          onClick={() => handleClick(item)}
          onMouseEnter={() => setHovered(item.id)}
          onMouseLeave={() => setHovered(null)}
          style={{
            width: 58,
            height: 58,
            transform: `scale(${scale}) translateY(${hovered === item.id ? -10 : 0}px)`,
            transition: 'transform 0.18s cubic-bezier(0.34,1.56,0.64,1)',
            animation: isBouncing ? 'bounceDock 0.36s cubic-bezier(0.34,1.56,0.64,1)' : 'none',
            borderRadius: 14,
            overflow: 'hidden',
            display: 'block',
            padding: 0,
            border: 'none',
            background: 'none',
            transformOrigin: 'bottom center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
            cursor: 'pointer',
          }}
        >
          {imgSrc ? (
            <img
              src={imgSrc}
              alt={item.label}
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 14, display: 'block' }}
            />
          ) : (
            <item.Icon />
          )}
        </button>

        {/* Open indicator dot */}
        {isOpen ? (
          <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'rgba(60,60,60,0.45)', marginTop: 3 }} />
        ) : (
          <div style={{ width: 5, height: 5, marginTop: 3 }} />
        )}
      </div>
    )
  }

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
      <div
        className="flex items-end px-5 py-2 rounded-2xl"
        style={{
          gap: 14,
          background: 'rgba(255,255,255,0.28)',
          backdropFilter: 'blur(28px) saturate(200%)',
          WebkitBackdropFilter: 'blur(28px) saturate(200%)',
          border: '1px solid rgba(255,255,255,0.55)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)',
        }}
      >
        {BEFORE_SEP.map(renderIcon)}

        {/* Separator */}
        <div style={{
          width: 1,
          height: 44,
          background: 'rgba(0,0,0,0.10)',
          borderRadius: 1,
          marginBottom: 8,
          alignSelf: 'flex-end',
          flexShrink: 0,
        }} />

        {AFTER_SEP.map(renderIcon)}
      </div>
    </div>
  )
}
