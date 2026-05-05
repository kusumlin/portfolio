import React, { useState, useCallback } from 'react'
import Wallpaper        from './Wallpaper'
import FloatingStickers from './FloatingStickers'
import MenuBar          from './MenuBar'
import HelloIntro       from './HelloIntro'
import Dock             from './Dock'
import Window           from '../window/Window'
import Notes            from '../apps/Notes'
import Contacts         from '../apps/Contacts'
import Files            from '../apps/Files'
import Terminal         from '../apps/Terminal'
import Gallery          from '../apps/Gallery'
import Chat             from '../apps/Chat'
import Music            from '../apps/Music'

const APP_CONFIG = {
  notes: {
    title: 'Projects',
    icon: '📝',
    component: Notes,
    width: 774,
    height: 552,
    initialPos: { x: 50, y: 56 },
  },
  contacts: {
    title: 'Contact',
    icon: '👤',
    component: Contacts,
    width: 464,
    height: 595,
    initialPos: { x: 380, y: 56 },
  },
  files: {
    title: 'Resume',
    icon: '📄',
    component: Files,
    width: 640,
    height: 575,
    initialPos: { x: 160, y: 56 },
  },
  terminal: {
    title: 'Skills — Terminal',
    icon: '⌨️',
    component: Terminal,
    width: 685,
    height: 486,
    initialPos: { x: 100, y: 60 },
  },
  gallery: {
    title: 'Gallery',
    icon: '🖼',
    component: Gallery,
    width: 774,
    height: 552,
    initialPos: { x: 60, y: 56 },
  },
  chat: {
    title: 'Ask Me — Messages',
    icon: '💬',
    component: Chat,
    width: 486,
    height: 619,
    initialPos: { x: 420, y: 56 },
  },
  music: {
    title: 'Listening',
    icon: '🎵',
    component: Music,
    width: 520,
    height: 600,
    initialPos: { x: 200, y: 60 },
  },
}

function ProfileCircle() {
  const [hovered, setHovered] = React.useState(false)

  return (
    <div
      style={{
        position: 'absolute',
        top: '45%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 3,
        pointerEvents: 'auto',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Message bubble — top right of circle */}
      <div
        style={{
          position: 'absolute',
          top: -8,
          left: '72%',
          width: 210,
          background: 'rgba(255,255,255,0.96)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderRadius: '16px 16px 16px 4px',
          padding: '12px 16px',
          boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
          opacity: hovered ? 1 : 0,
          transform: hovered ? 'translateY(0) scale(1)' : 'translateY(6px) scale(0.97)',
          transition: 'opacity 0.22s cubic-bezier(0.4,0,0.2,1), transform 0.22s cubic-bezier(0.4,0,0.2,1)',
          pointerEvents: 'none',
        }}
      >
        <p style={{ fontSize: 13, fontWeight: 600, color: '#1c1c1e', marginBottom: 4 }}>
          Welcome, glad you're here
        </p>
        <p style={{ fontSize: 12, color: '#6858a0', lineHeight: 1.5 }}>
          I build things with data that actually matter
        </p>
      </div>

      <div
        style={{
          width: 260,
          height: 260,
          borderRadius: '50%',
          overflow: 'hidden',
          border: '6px solid rgba(255,255,255,0.88)',
          boxShadow: '0 8px 40px rgba(0,0,0,0.18), 0 2px 10px rgba(0,0,0,0.1)',
        }}
      >
        <img
          src="/icons/mypicture.png"
          alt="Kusum"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>
    </div>
  )
}

export default function Desktop() {
  const [introDone, setIntroDone]         = useState(false)
  const [openApps, setOpenApps]           = useState([])
  const [windowOrder, setWindowOrder]     = useState([])
  const [minimizedApps, setMinimizedApps] = useState([])

  const bringToFront = useCallback((id) => {
    setWindowOrder(prev => [...prev.filter(a => a !== id), id])
  }, [])

  const openApp = useCallback((id) => {
    if (minimizedApps.includes(id)) {
      setMinimizedApps(prev => prev.filter(a => a !== id))
      bringToFront(id)
    } else {
      setOpenApps(prev => prev.includes(id) ? prev : [...prev, id])
      bringToFront(id)
    }
  }, [bringToFront, minimizedApps])

  const closeApp = useCallback((id) => {
    setOpenApps(prev => prev.filter(a => a !== id))
    setWindowOrder(prev => prev.filter(a => a !== id))
    setMinimizedApps(prev => prev.filter(a => a !== id))
  }, [])

  const minimizeApp = useCallback((id) => {
    setMinimizedApps(prev => [...prev, id])
  }, [])

  const getZIndex = id => {
    const idx = windowOrder.indexOf(id)
    return idx === -1 ? 10 : 20 + idx * 10
  }

  return (
    <div className="relative w-screen h-screen overflow-hidden" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* Layer 0 — wallpaper */}
      <Wallpaper />

      {/* Layer 1 — floating image stickers */}
      <FloatingStickers />

      {/* Layer 2 — profile circle */}
      <ProfileCircle />

      {/* Layer 3 — menu bar */}
      <MenuBar onOpen={openApp} />

      {/* Layer 4 — app windows */}
      {openApps.map(id => {
        const cfg = APP_CONFIG[id]
        if (!cfg) return null
        const AppComponent = cfg.component
        return (
          <Window
            key={id}
            title={cfg.title}
            icon={cfg.icon}
            width={cfg.width}
            height={cfg.height}
            initialPos={cfg.initialPos}
            zIndex={getZIndex(id)}
            onClose={() => closeApp(id)}
            onFocus={() => bringToFront(id)}
            minimized={minimizedApps.includes(id)}
            onMinimize={() => minimizeApp(id)}
          >
            <AppComponent />
          </Window>
        )
      })}

      {/* Layer 5 — dock */}
      <Dock openApps={openApps} minimizedApps={minimizedApps} onOpen={openApp} />

      {/* Layer 6 — hello intro overlay */}
      {!introDone && <HelloIntro onDone={() => setIntroDone(true)} />}
    </div>
  )
}
