import React, { useState, useCallback } from 'react'
import Wallpaper        from './Wallpaper'
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

const APP_CONFIG = {
  notes: {
    title: 'Projects',
    icon: '📝',
    component: Notes,
    width: 700,
    height: 500,
    initialPos: { x: 55, y: 56 },
  },
  contacts: {
    title: 'Contact',
    icon: '👤',
    component: Contacts,
    width: 420,
    height: 540,
    initialPos: { x: 430, y: 60 },
  },
  files: {
    title: 'Resume',
    icon: '📄',
    component: Files,
    width: 580,
    height: 520,
    initialPos: { x: 190, y: 56 },
  },
  terminal: {
    title: 'Skills — Terminal',
    icon: '⌨️',
    component: Terminal,
    width: 620,
    height: 440,
    initialPos: { x: 110, y: 72 },
  },
  gallery: {
    title: 'Gallery',
    icon: '🖼',
    component: Gallery,
    width: 700,
    height: 500,
    initialPos: { x: 80, y: 58 },
  },
  chat: {
    title: 'Ask Me — Messages',
    icon: '💬',
    component: Chat,
    width: 440,
    height: 560,
    initialPos: { x: 510, y: 56 },
  },
}


export default function Desktop() {
  const [introDone, setIntroDone]     = useState(false)
  const [openApps, setOpenApps]       = useState([])
  const [windowOrder, setWindowOrder] = useState([])

  const bringToFront = useCallback((id) => {
    setWindowOrder(prev => [...prev.filter(a => a !== id), id])
  }, [])

  const openApp = useCallback((id) => {
    setOpenApps(prev => prev.includes(id) ? prev : [...prev, id])
    bringToFront(id)
  }, [bringToFront])

  const closeApp = useCallback((id) => {
    setOpenApps(prev  => prev.filter(a => a !== id))
    setWindowOrder(prev => prev.filter(a => a !== id))
  }, [])

  const getZIndex = id => {
    const idx = windowOrder.indexOf(id)
    return idx === -1 ? 10 : 20 + idx * 10
  }

  return (
    <div className="relative w-screen h-screen overflow-hidden" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* Layer 0 — wallpaper */}
      <Wallpaper />

      {/* Layer 1 — floating SVG stickers (hidden) */}
      {/* <FloatingStickers /> */}


      {/* Layer 3 — macOS-style menu bar */}
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
          >
            <AppComponent />
          </Window>
        )
      })}

      {/* Layer 5 — dock */}
      <Dock openApps={openApps} onOpen={openApp} />

      {/* Layer 6 — hello intro overlay */}
      {!introDone && <HelloIntro onDone={() => setIntroDone(true)} />}
    </div>
  )
}
