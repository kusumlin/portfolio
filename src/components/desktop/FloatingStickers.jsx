import React from 'react'

/* ─────────────────────────────────────────────────────────
   DEPTH LAYER CONFIG
   3 layers create parallax-style visual depth around photo.
   background → near profile photo, small + faded + blurred
   midground  → side flanks, medium opacity
   foreground → outer corners, full size + sharp
───────────────────────────────────────────────────────── */
const DEPTH = {
  foreground: {
    scale:     1.00,
    opacity:   1,
    blur:      0,
    zIndex:    3,
    shadow:    'drop-shadow(0 6px 20px rgba(0,0,0,0.15))',
    hoverCls:  'sticker-fg',
    interact:  true,
  },
  midground: {
    scale:     0.86,
    opacity:   0.80,
    blur:      0,
    zIndex:    2,
    shadow:    'drop-shadow(0 3px 12px rgba(0,0,0,0.10))',
    hoverCls:  'sticker-mid',
    interact:  true,
  },
  background: {
    scale:     0.68,
    opacity:   0.38,
    blur:      1.8,
    zIndex:    1,
    shadow:    'drop-shadow(0 2px 6px rgba(0,0,0,0.06))',
    hoverCls:  '',
    interact:  false,   // background items don't intercept clicks
  },
}

/* ─────────────────────────────────────────────────────────
   ZONE LAYOUT
   8 elements in 3 rings around the profile photo.

   OUTER RING (corners)  — foreground, largest, sharpest
   ┌──────────────────────────────────────────────────┐
   │ [Tulips]    [Star·bg]    [Disco·bg]    [Camera]  │
   │ [Bow·mid]                             [Candle·mid│
   │ [Matcha]                               [Laptop]  │
   └──────────────────────────────────────────────────┘
   SIDE FLANKS           — midground
   INNER NEAR PHOTO      — background (small, blurred)
───────────────────────────────────────────────────── */
const ZONES = [
  // ── OUTER CORNERS — foreground ───────────────────
  {
    id: 'tulips',
    depth: 'foreground',
    nW: 80, nH: 100,
    pos: { top: '10%', left: '3%' },
    anim: 'float-a', delay: '0s',
  },
  {
    id: 'camera',
    depth: 'foreground',
    nW: 92, nH: 68,
    pos: { top: '9%', right: '3%' },
    anim: 'float-c', delay: '1.2s',
  },
  {
    id: 'matcha',
    depth: 'foreground',
    nW: 82, nH: 90,
    pos: { bottom: '17%', left: '3%' },
    anim: 'float-b', delay: '0.6s',
  },
  {
    id: 'laptop',
    depth: 'foreground',
    nW: 106, nH: 72,
    pos: { bottom: '15%', right: '2%' },
    anim: 'float-a', delay: '1.8s',
  },
  // ── SIDE FLANKS — midground ───────────────────────
  {
    id: 'candle',
    depth: 'midground',
    nW: 46, nH: 92,
    pos: { top: '36%', right: '7%' },
    anim: 'float-b', delay: '0.4s',
  },
  {
    id: 'bow',
    depth: 'midground',
    nW: 96, nH: 62,
    pos: { top: '52%', left: '5%' },
    anim: 'float-c', delay: '2.0s',
  },
  // ── INNER RING near photo — background ───────────
  {
    id: 'star',
    depth: 'background',
    nW: 60, nH: 55,
    pos: { top: '26%', left: '22%' },
    anim: 'float-a', delay: '1.5s',
  },
  {
    id: 'disco',
    depth: 'background',
    nW: 64, nH: 80,
    pos: { top: '52%', right: '18%' },
    anim: 'float-b', delay: '0.9s',
  },
]

/* ─────────────────────────────────────────────────────────
   SVG STICKER COMPONENTS
   All use className="w-full h-full" so they fill whatever
   container FloatingIcon gives them. Aspect ratio is
   preserved via the parent's CSS aspect-ratio property.
───────────────────────────────────────────────────── */

function TulipSticker() {
  return (
    <svg viewBox="0 0 80 100" className="w-full h-full" fill="none">
      <defs>
        <linearGradient id="petalA" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ff9dc8" />
          <stop offset="100%" stopColor="#e8408a" />
        </linearGradient>
        <linearGradient id="petalB" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffb3d4" />
          <stop offset="100%" stopColor="#f060a0" />
        </linearGradient>
      </defs>
      <line x1="22" y1="96" x2="22" y2="60" stroke="#4a8c32" strokeWidth="3.5" strokeLinecap="round" />
      <line x1="40" y1="96" x2="40" y2="52" stroke="#4a8c32" strokeWidth="4" strokeLinecap="round" />
      <line x1="58" y1="96" x2="58" y2="60" stroke="#4a8c32" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M40 73 C50 63 62 66 58 74" fill="#5aaa38" />
      <path d="M40 69 C30 59 18 62 22 70" fill="#5aaa38" />
      <path d="M13 52 C12 41 16 31 22 27 C28 31 32 41 31 52 C28 58 17 58 13 52Z" fill="url(#petalB)" />
      <path d="M17 52 C16 43 19 33 22 29" stroke="rgba(255,255,255,0.35)" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M30 46 C29 33 34 20 40 16 C46 20 51 33 50 46 C46 54 34 54 30 46Z" fill="url(#petalA)" />
      <path d="M35 46 C34 35 37 24 40 19" stroke="rgba(255,255,255,0.35)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M49 52 C48 41 52 31 58 27 C64 31 68 41 67 52 C64 58 52 58 49 52Z" fill="url(#petalB)" />
      <path d="M53 52 C52 43 55 33 58 29" stroke="rgba(255,255,255,0.35)" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  )
}

function MatchaSticker() {
  return (
    <svg viewBox="0 0 82 90" className="w-full h-full" fill="none">
      <defs>
        <linearGradient id="cupBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f5f0e8" />
          <stop offset="100%" stopColor="#e2dcd0" />
        </linearGradient>
        <linearGradient id="matchaTea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8ac840" />
          <stop offset="100%" stopColor="#5a9620" />
        </linearGradient>
      </defs>
      <path d="M30 28 Q28 20 30 12 Q32 6 30 0" stroke="#c8c4bc" strokeWidth="1.8" strokeLinecap="round" fill="none" opacity="0.5" />
      <path d="M41 26 Q39 18 41 10 Q43 4 41 0" stroke="#c8c4bc" strokeWidth="1.8" strokeLinecap="round" fill="none" opacity="0.5" />
      <path d="M52 28 Q50 20 52 12 Q54 6 52 0" stroke="#c8c4bc" strokeWidth="1.8" strokeLinecap="round" fill="none" opacity="0.5" />
      <path d="M16 38 L20 66 Q41 74 62 66 L66 38 Z" fill="url(#cupBody)" />
      <ellipse cx="41" cy="38" rx="25" ry="7" fill="#f0ece4" />
      <ellipse cx="41" cy="40" rx="22" ry="6" fill="url(#matchaTea)" />
      <ellipse cx="41" cy="39" rx="12" ry="3" fill="#a0d840" opacity="0.45" />
      <path d="M64 48 Q77 48 77 57 Q77 66 64 66" stroke="#e0dcd0" strokeWidth="4" fill="none" strokeLinecap="round" />
      <ellipse cx="41" cy="70" rx="28" ry="7.5" fill="#e8e4da" />
      <ellipse cx="41" cy="68" rx="25" ry="6" fill="#f0ece4" />
    </svg>
  )
}

function CameraSticker() {
  return (
    <svg viewBox="0 0 92 68" className="w-full h-full" fill="none">
      <defs>
        <linearGradient id="camBod" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c8a87a" />
          <stop offset="100%" stopColor="#9a7448" />
        </linearGradient>
        <radialGradient id="lensGlass" cx="38%" cy="32%">
          <stop offset="0%" stopColor="#7090d0" />
          <stop offset="45%" stopColor="#1a2870" />
          <stop offset="100%" stopColor="#060e28" />
        </radialGradient>
      </defs>
      <rect x="6" y="16" width="80" height="46" rx="9" fill="url(#camBod)" />
      <rect x="28" y="8" width="36" height="12" rx="5" fill="#b89460" />
      <rect x="10" y="20" width="14" height="10" rx="2.5" fill="#d4bc80" opacity="0.6" />
      <circle cx="48" cy="39" r="20" fill="#7a5828" />
      <circle cx="48" cy="39" r="17" fill="url(#lensGlass)" />
      <circle cx="48" cy="39" r="10" fill="#060e28" />
      <circle cx="42" cy="33" r="3.5" fill="rgba(255,255,255,0.18)" />
      <circle cx="72" cy="21" r="5.5" fill="#c09060" />
      <circle cx="72" cy="21" r="4" fill="#d4a870" />
    </svg>
  )
}

function LaptopSticker() {
  return (
    <svg viewBox="0 0 106 72" className="w-full h-full" fill="none">
      <defs>
        <linearGradient id="lidTop" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dcdcdc" />
          <stop offset="100%" stopColor="#c4c4c4" />
        </linearGradient>
      </defs>
      <rect x="10" y="4" width="86" height="52" rx="5" fill="url(#lidTop)" />
      <rect x="14" y="8" width="78" height="44" rx="3" fill="#181818" />
      <rect x="16" y="10" width="74" height="40" rx="2" fill="#2a4a8a" opacity="0.88" />
      <circle cx="53" cy="30" r="7" fill="rgba(255,255,255,0.12)" />
      <path d="M4 57 L10 56 L96 56 L102 57 L104 63 L2 63 Z" fill="#d0d0d0" />
      <rect x="2" y="61" width="102" height="5" rx="2.5" fill="#b8b8b8" />
      <rect x="42" y="57.5" width="22" height="4" rx="1.5" fill="rgba(0,0,0,0.10)" />
    </svg>
  )
}

function StarSticker() {
  const path = 'M30,2 L35.9,20.6 L56,20.6 L39.8,32.1 L45.8,50.6 L30,39.2 L14.2,50.6 L20.2,32.1 L4,20.6 L24.1,20.6 Z'
  return (
    <svg viewBox="0 0 60 55" className="w-full h-full" fill="none">
      <defs>
        <linearGradient id="starFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFE44A" />
          <stop offset="100%" stopColor="#FFA800" />
        </linearGradient>
      </defs>
      <path d={path} fill="url(#starFill)" />
      <path d="M30,4 L34,16 L22,16 L30,4Z" fill="rgba(255,255,220,0.4)" />
    </svg>
  )
}

function BowSticker() {
  return (
    <svg viewBox="0 0 96 62" className="w-full h-full" fill="none">
      <defs>
        <linearGradient id="bowPink" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffb3cf" />
          <stop offset="100%" stopColor="#ff4da0" />
        </linearGradient>
        <linearGradient id="bowDark" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ff80ba" />
          <stop offset="100%" stopColor="#e0257e" />
        </linearGradient>
      </defs>
      <path d="M8 8 C6 18 8 42 20 48 C30 52 45 36 48 32 C40 22 18 6 8 8Z" fill="url(#bowPink)" />
      <path d="M11 13 C10 22 12 40 22 46" stroke="rgba(255,255,255,0.3)" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M88 8 C90 18 88 42 76 48 C66 52 51 36 48 32 C56 22 78 6 88 8Z" fill="url(#bowPink)" />
      <path d="M85 13 C86 22 84 40 74 46" stroke="rgba(255,255,255,0.3)" strokeWidth="2" fill="none" strokeLinecap="round" />
      <ellipse cx="48" cy="32" rx="10" ry="9" fill="url(#bowDark)" />
      <ellipse cx="48" cy="30" rx="6" ry="4" fill="#ffaacc" opacity="0.5" />
      <path d="M44 40 Q42 52 38 58" stroke="url(#bowDark)" strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M52 40 Q54 52 58 58" stroke="url(#bowDark)" strokeWidth="5" fill="none" strokeLinecap="round" />
    </svg>
  )
}

function CandleSticker() {
  return (
    <svg viewBox="0 0 46 92" className="w-full h-full" fill="none">
      <defs>
        <linearGradient id="waxBody" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#e0dbd2" />
          <stop offset="45%" stopColor="#f5f2ea" />
          <stop offset="100%" stopColor="#ccc8be" />
        </linearGradient>
        <radialGradient id="flameCore" cx="50%" cy="60%">
          <stop offset="0%" stopColor="#fff8a0" />
          <stop offset="40%" stopColor="#ffb800" />
          <stop offset="100%" stopColor="#ff4400" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="23" cy="20" rx="9" ry="12" fill="#ffdd44" opacity="0.12" />
      <path d="M23 6 C20 10 17 16 18 22 C19 27 23 29 23 29 C23 29 27 27 28 22 C29 16 26 10 23 6Z" fill="url(#flameCore)" />
      <path d="M23 11 C21 15 20 19 21 23" stroke="#fff5a0" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.6" />
      <line x1="23" y1="29" x2="23" y2="34" stroke="#3a2e20" strokeWidth="1.8" strokeLinecap="round" />
      <rect x="10" y="32" width="26" height="54" rx="4.5" fill="url(#waxBody)" />
      <path d="M14 32 Q12 44 11 56" stroke="#ece8de" strokeWidth="5" strokeLinecap="round" fill="none" opacity="0.55" />
    </svg>
  )
}

function DiscoBallSticker() {
  const tiles = []
  for (let row = -2; row <= 2; row++) {
    for (let col = -2; col <= 2; col++) {
      const dist = Math.sqrt(row * row + col * col)
      if (dist > 2.4) continue
      const x = 32 + col * 11
      const y = 40 + row * 11
      const brightness = dist < 1 ? '#f4f4f4' : dist < 1.6 ? '#d8d8d8' : '#a8a8a8'
      tiles.push({ x, y, brightness, key: `${row}-${col}` })
    }
  }
  return (
    <svg viewBox="0 0 64 80" className="w-full h-full" fill="none">
      <defs>
        <radialGradient id="ballSheen" cx="36%" cy="30%">
          <stop offset="0%" stopColor="#e8e8e8" />
          <stop offset="55%" stopColor="#a0a0a0" />
          <stop offset="100%" stopColor="#585858" />
        </radialGradient>
      </defs>
      <line x1="32" y1="2" x2="32" y2="12" stroke="#909090" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="32" cy="42" r="26" fill="url(#ballSheen)" />
      {tiles.map(({ x, y, brightness, key }) => (
        <rect key={key} x={x - 4} y={y - 4} width="7.5" height="7.5" fill={brightness} stroke="rgba(0,0,0,0.18)" strokeWidth="0.6" rx="0.8" />
      ))}
      <circle cx="22" cy="28" r="5.5" fill="rgba(255,255,255,0.42)" />
      <text x="0" y="18" fontSize="9" fill="#FFD700" opacity="0.85">✦</text>
      <text x="54" y="24" fontSize="8" fill="#FF8EC8" opacity="0.85">✦</text>
      <text x="56" y="58" fontSize="7" fill="#87CEEB" opacity="0.85">✦</text>
    </svg>
  )
}

/* ─────────────────────────────────────────────────────────
   STICKER ID → COMPONENT MAP
───────────────────────────────────────────────────── */
const COMPONENTS = {
  tulips: TulipSticker,
  camera: CameraSticker,
  matcha: MatchaSticker,
  laptop: LaptopSticker,
  candle: CandleSticker,
  bow:    BowSticker,
  star:   StarSticker,
  disco:  DiscoBallSticker,
}

/* ─────────────────────────────────────────────────────────
   FloatingIcon
   Renders one sticker at its zone position with correct
   depth styling and responsive sizing via CSS clamp().
───────────────────────────────────────────────────── */
function FloatingIcon({ id, depth, nW, nH, pos, anim, delay }) {
  const d  = DEPTH[depth]
  const Component = COMPONENTS[id]
  if (!Component) return null

  const scaled = nW * d.scale
  // clamp: floor at 55% of scaled size, prefer viewport-relative, cap at full scaled size
  const vwPref = (scaled / 14.4).toFixed(1)        // 14.4 = 1440px / 100vw
  const minPx  = Math.round(scaled * 0.55)
  const maxPx  = Math.round(scaled)

  return (
    <div
      title={id}
      className={`${anim} ${d.hoverCls}`}
      style={{
        position:      'absolute',
        ...pos,
        width:         `clamp(${minPx}px, ${vwPref}vw, ${maxPx}px)`,
        aspectRatio:   `${nW} / ${nH}`,
        opacity:       d.opacity,
        filter:        d.blur > 0
                         ? `blur(${d.blur}px) ${d.shadow}`
                         : d.shadow,
        zIndex:        d.zIndex,
        animationDelay: delay,
        pointerEvents: d.interact ? 'auto' : 'none',
        userSelect:    'none',
      }}
    >
      <Component />
    </div>
  )
}

/* ─────────────────────────────────────────────────────────
   FloatingStickers — container with pointer-events: none
   so the wallpaper click-through works; individual icons
   re-enable pointer-events via d.interact.
───────────────────────────────────────────────────── */
export default function FloatingStickers() {
  return (
    <div className="absolute inset-0" style={{ zIndex: 1, pointerEvents: 'none' }}>
      {ZONES.map((zone) => (
        <FloatingIcon key={zone.id} {...zone} />
      ))}
    </div>
  )
}
