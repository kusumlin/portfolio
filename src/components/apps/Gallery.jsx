import React, { useState } from 'react'
import { resume } from '../../data/resume'

function TikTokArt() {
  return (
    <svg viewBox="0 0 200 140" className="w-full h-full">
      <defs>
        <linearGradient id="tt1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#d4c2f0" />
          <stop offset="100%" stopColor="#b8a0e0" />
        </linearGradient>
      </defs>
      <rect width="200" height="140" fill="url(#tt1)" />
      <rect x="70" y="15" width="60" height="110" rx="8" fill="rgba(0,0,0,0.15)" />
      <rect x="74" y="22" width="52" height="90" rx="4" fill="rgba(255,255,255,0.15)" />
      <polygon points="91,52 91,82 116,67" fill="white" opacity="0.9" />
      {[0,1,2,3,4,5,6].map(i => (
        <rect key={i} x={78 + i * 7} y={96 - [8,14,10,18,12,16,9][i]} width="4" height={[8,14,10,18,12,16,9][i]} rx="2" fill="rgba(255,255,255,0.6)" />
      ))}
      <text x="100" y="132" textAnchor="middle" fill="rgba(255,255,255,0.9)" fontSize="8" fontFamily="sans-serif">
        Content Classification
      </text>
    </svg>
  )
}

function ICUArt() {
  return (
    <svg viewBox="0 0 200 140" className="w-full h-full">
      <defs>
        <linearGradient id="icu1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f0c2d8" />
          <stop offset="100%" stopColor="#d8a0bc" />
        </linearGradient>
      </defs>
      <rect width="200" height="140" fill="url(#icu1)" />
      <rect x="20" y="20" width="160" height="85" rx="6" fill="rgba(0,0,0,0.15)" />
      <polyline
        points="28,72 50,72 60,45 68,90 76,55 84,72 120,72 130,48 138,88 146,60 154,72 172,72"
        fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="2" strokeLinejoin="round"
      />
      <circle cx="155" cy="40" r="14" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="3" />
      <circle cx="155" cy="40" r="14" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="3"
        strokeDasharray="56" strokeDashoffset="20" strokeLinecap="round"
        transform="rotate(-90 155 40)"
      />
      <text x="155" y="44" textAnchor="middle" fill="white" fontSize="8" fontFamily="monospace">0.72</text>
      <text x="100" y="130" textAnchor="middle" fill="rgba(255,255,255,0.9)" fontSize="8" fontFamily="sans-serif">
        Early Deterioration Index
      </text>
    </svg>
  )
}

function HealthcareArt() {
  return (
    <svg viewBox="0 0 200 140" className="w-full h-full">
      <defs>
        <linearGradient id="hc1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#c2cef0" />
          <stop offset="100%" stopColor="#a0b2e0" />
        </linearGradient>
      </defs>
      <rect width="200" height="140" fill="url(#hc1)" />
      <rect x="45" y="18" width="110" height="90" rx="4" fill="rgba(255,255,255,0.88)" />
      <rect x="54" y="28" width="92" height="6" rx="3" fill="#a0b2e0" opacity="0.7" />
      {[0,1,2,3,4].map(i => {
        const h = [28,42,35,50,38][i]
        return <rect key={i} x={54 + i * 18} y={90 - h} width="12" height={h} rx="2" fill="#a0b2e0" opacity={0.5 + i * 0.08} />
      })}
      <line x1="54" y1="90" x2="144" y2="90" stroke="#a0b2e0" strokeWidth="1.5" opacity="0.5" />
      <rect x="54" y="38" width="65" height="3" rx="1.5" fill="#6b7280" opacity="0.25" />
      <rect x="54" y="44" width="55" height="3" rx="1.5" fill="#6b7280" opacity="0.25" />
      <rect x="54" y="100" width="92" height="16" rx="3" fill="rgba(160,178,224,0.25)" />
      <text x="100" y="112" textAnchor="middle" fill="#3a4a80" fontSize="7" fontFamily="sans-serif" fontWeight="bold">
        Published · Dec 2021
      </text>
      <text x="100" y="132" textAnchor="middle" fill="rgba(255,255,255,0.9)" fontSize="8" fontFamily="sans-serif">
        Healthcare Data Analytics
      </text>
    </svg>
  )
}

const arts = [TikTokArt, ICUArt, HealthcareArt]

function GalleryCard({ project, ArtComponent }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div
      className="rounded-xl overflow-hidden transition-all duration-200 hover:scale-[1.02]"
      style={{ border: '1px solid rgba(190,178,220,0.35)', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
      onClick={() => setExpanded(!expanded)}
    >
      <div className="h-36"><ArtComponent /></div>
      <div className="p-3" style={{ background: 'white' }}>
        <p className="text-[11px] font-semibold leading-tight" style={{ color: '#3d2e5e' }}>{project.title}</p>
        {expanded && (
          <p className="text-[10px] mt-1 leading-relaxed" style={{ color: '#6858a0' }}>{project.description}</p>
        )}
        <div className="flex flex-wrap gap-1 mt-2">
          {project.tech.slice(0, 3).map(t => (
            <span key={t} className="text-[9px] px-1.5 py-0.5 rounded-full font-medium" style={{ background: '#ede8f8', color: '#7060a0' }}>
              {t}
            </span>
          ))}
          {project.tech.length > 3 && (
            <span className="text-[9px] px-1.5 py-0.5 rounded-full" style={{ background: '#ede8f8', color: '#9080b8' }}>
              +{project.tech.length - 3}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Gallery() {
  return (
    <div className="h-full flex flex-col" style={{ background: '#fdfaff' }}>
      {/* Header */}
      <div
        className="px-5 py-3 shrink-0 flex items-center justify-between"
        style={{ background: '#f0ecf8', borderBottom: '1px solid rgba(190,178,220,0.4)' }}
      >
        <p className="text-xs font-semibold" style={{ color: '#7060a0' }}>Project Gallery</p>
        <p className="text-[10px]" style={{ color: '#a898c8' }}>Click a card to expand</p>
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-y-auto custom-scroll p-5">
        <div className="grid grid-cols-2 gap-4">
          {resume.projects.map((project, i) => (
            <GalleryCard key={project.title} project={project} ArtComponent={arts[i % arts.length]} />
          ))}
          <div
            className="rounded-xl flex items-center justify-center h-[216px] transition-colors"
            style={{ border: '2px dashed rgba(190,178,220,0.45)' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#f0ecf8' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
          >
            <div className="text-center">
              <p className="text-2xl mb-1" style={{ color: '#b8a0e0' }}>+</p>
              <p className="text-[11px]" style={{ color: '#a898c8' }}>More coming soon</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
