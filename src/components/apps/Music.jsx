import { useState, useRef, useCallback } from 'react'

const PODCASTS = [
  {
    title: 'The Mel Robbins Podcast',
    host: 'Mel Robbins',
    tag: 'Motivation',
    gradient: ['#f7971e', '#ffd200'],
    emoji: '🔥',
    url: 'https://open.spotify.com/show/4MRSKzgRSIYRpLcTtHnqB1',
  },
  {
    title: 'On Purpose',
    host: 'Jay Shetty',
    tag: 'Mindset',
    gradient: ['#4facfe', '#00f2fe'],
    emoji: '🧘',
    url: 'https://open.spotify.com/show/5EqqB52m2bsr4k1Ii7sStc',
  },
  {
    title: 'Figuring Out',
    host: 'Raj Shamani',
    tag: 'Business',
    gradient: ['#43e97b', '#38f9d7'],
    emoji: '💡',
    url: 'https://open.spotify.com/search/Raj%20Shamani%20Figuring%20Out',
  },
  {
    title: 'Diary of a CEO',
    host: 'Steven Bartlett',
    tag: 'Entrepreneurship',
    gradient: ['#fa709a', '#fee140'],
    emoji: '📓',
    url: 'https://open.spotify.com/show/7iQXmUT7XGuZSzAMjoNWlX',
  },
  {
    title: 'We Can Do Hard Things',
    host: 'Glennon Doyle',
    tag: 'Life',
    gradient: ['#a18cd1', '#fbc2eb'],
    emoji: '💜',
    url: 'https://open.spotify.com/show/4sCQPCmkFfBNMUbECMJhAw',
  },
  {
    title: 'How I Built This',
    host: 'Guy Raz',
    tag: 'Startups',
    gradient: ['#f093fb', '#f5576c'],
    emoji: '🚀',
    url: 'https://open.spotify.com/show/6E709HRH7XaiZrMfgtNCun',
  },
  {
    title: 'Hidden Brain',
    host: 'Shankar Vedantam',
    tag: 'Psychology',
    gradient: ['#4481eb', '#04befe'],
    emoji: '🧠',
    url: 'https://open.spotify.com/show/20Gf4IAauFrfj7RBkjcWxh',
  },
  {
    title: 'Feel Better, Live More',
    host: 'Dr Rangan Chatterjee',
    tag: 'Wellness',
    gradient: ['#84fab0', '#8fd3f4'],
    emoji: '🌿',
    url: 'https://open.spotify.com/show/5xHMuBBBTgCFnKRrRSnxiH',
  },
  {
    title: 'The Tim Ferriss Show',
    host: 'Tim Ferriss',
    tag: 'Productivity',
    gradient: ['#ffecd2', '#fcb69f'],
    emoji: '⏱',
    url: 'https://open.spotify.com/show/5qSUyCrk9KR69lEiXbjwXM',
  },
]


const NAV = {
  'Library': ['Podcasts', 'Music'],
  'Favourites': ['Self-Growth', 'Business', 'Mindset', 'Wellness'],
}

function PodcastCard({ pod }) {
  const [hovered, setHovered] = useState(false)
  return (
    <a
      href={pod.url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ textDecoration: 'none', display: 'block' }}
    >
      <div style={{
        borderRadius: 10,
        overflow: 'hidden',
        aspectRatio: '1',
        background: `linear-gradient(135deg, ${pod.gradient[0]}, ${pod.gradient[1]})`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 38,
        boxShadow: hovered
          ? `0 8px 24px ${pod.gradient[1]}66`
          : '0 2px 8px rgba(0,0,0,0.12)',
        transform: hovered ? 'scale(1.04)' : 'scale(1)',
        transition: 'transform 0.18s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.18s',
      }}>
        {pod.emoji}
      </div>
      <div style={{ marginTop: 7 }}>
        <p style={{
          fontSize: 12, fontWeight: 600, color: '#1c1c1e',
          lineHeight: 1.3, marginBottom: 2,
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
        }}>
          {pod.title}
        </p>
        <p style={{ fontSize: 11, color: '#8e8e93', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {pod.host}
        </p>
      </div>
    </a>
  )
}

function SidebarItem({ label, active, onClick }) {
  const [hov, setHov] = useState(false)
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width: '100%', textAlign: 'left', background: active ? 'rgba(150,80,220,0.13)' : hov ? 'rgba(0,0,0,0.05)' : 'transparent',
        border: 'none', borderRadius: 6, padding: '5px 10px',
        fontSize: 13, fontWeight: active ? 600 : 400,
        color: active ? '#7040b0' : '#3c3c43',
        cursor: 'pointer', transition: 'background 0.12s',
      }}
    >
      {label}
    </button>
  )
}

export default function Music() {
  const [activeNav, setActiveNav] = useState('Recently Added')
  const containerRef = useRef(null)
  const shineRef = useRef(null)

  const onMouseMove = useCallback((e) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect || !shineRef.current) return
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    shineRef.current.style.background =
      `radial-gradient(500px circle at ${x}px ${y}px, rgba(160,100,255,0.07) 0%, transparent 65%)`
  }, [])

  const onMouseLeave = useCallback(() => {
    if (shineRef.current) shineRef.current.style.background = 'transparent'
  }, [])

  return (
    <div className="h-full flex" ref={containerRef} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave} style={{ position: 'relative', background: '#fafafa' }}>

      {/* Shine overlay */}
      <div ref={shineRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1 }} />

      {/* Sidebar */}
      <div style={{
        width: 168, flexShrink: 0, borderRight: '1px solid rgba(0,0,0,0.07)',
        background: 'rgba(248,246,255,0.95)', padding: '16px 10px',
        display: 'flex', flexDirection: 'column', gap: 20,
        overflowY: 'auto', position: 'relative', zIndex: 2,
      }}>
        {/* Search */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6,
          background: 'rgba(0,0,0,0.06)', borderRadius: 8, padding: '5px 10px',
        }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#8e8e93" strokeWidth="2.5" strokeLinecap="round">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <span style={{ fontSize: 12, color: '#8e8e93' }}>Search</span>
        </div>

        {Object.entries(NAV).map(([section, items]) => (
          <div key={section}>
            <p style={{ fontSize: 11, fontWeight: 700, color: '#8e8e93', textTransform: 'uppercase', letterSpacing: '0.08em', padding: '0 10px', marginBottom: 4 }}>
              {section}
            </p>
            {items.map(item => (
              <SidebarItem key={item} label={item} active={activeNav === item} onClick={() => setActiveNav(item)} />
            ))}
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto custom-scroll" style={{ position: 'relative', zIndex: 2, padding: '20px 22px' }}>
        {/* Top bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#1c1c1e' }}>Podcasts</h2>
          <a
            href="https://open.spotify.com/genre/podcasts-web"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex', alignItems: 'center', gap: 5,
              fontSize: 12, fontWeight: 600, color: '#1DB954',
              textDecoration: 'none', padding: '5px 12px',
              background: '#1DB95418', borderRadius: 14,
              border: '1px solid #1DB95430',
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="#1DB954">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
            </svg>
            Open Spotify
          </a>
        </div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))',
          gap: '20px 16px',
        }}>
          {PODCASTS.map(pod => <PodcastCard key={pod.title} pod={pod} />)}
        </div>
      </div>
    </div>
  )
}
