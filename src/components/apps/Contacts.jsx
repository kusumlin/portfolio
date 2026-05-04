import React from 'react'
import { resume } from '../../data/resume'

function ContactRow({ icon, label, value, href }) {
  const content = (
    <div
      className="flex items-center gap-3 px-4 py-3 rounded-xl transition-colors group"
      style={{ '--hover-bg': '#fef5e7' }}
      onMouseEnter={(e) => { e.currentTarget.style.background = '#fef5e7' }}
      onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
    >
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center text-lg shrink-0"
        style={{ background: '#f0ebe0' }}
      >
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: '#b09070' }}>{label}</p>
        <p className="text-[13px] font-medium truncate" style={{ color: '#4a3728' }}>
          {value}
        </p>
      </div>
      {href && (
        <span className="ml-auto text-xs transition-colors" style={{ color: '#d0bfa0' }}>
          ↗
        </span>
      )}
    </div>
  )

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="block">
        {content}
      </a>
    )
  }
  return <div>{content}</div>
}

export default function Contacts() {
  return (
    <div className="h-full flex flex-col overflow-y-auto custom-scroll" style={{ background: '#fdfaf4' }}>
      {/* Header card */}
      <div
        className="mx-5 mt-5 mb-4 rounded-2xl p-5 flex items-center gap-4"
        style={{
          background: 'linear-gradient(135deg, #fdf0dc 0%, #f5e2c0 100%)',
          border: '1px solid rgba(210,185,145,0.3)',
        }}
      >
        {/* Avatar */}
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center text-2xl font-bold text-white shrink-0"
          style={{ background: 'linear-gradient(135deg, #c9966e, #a87850)' }}
        >
          KL
        </div>
        <div>
          <h2 className="font-semibold text-base" style={{ color: '#3a2c1e' }}>{resume.name}</h2>
          <p className="text-xs mt-0.5" style={{ color: '#8b6f47' }}>{resume.title}</p>
          <p className="text-xs flex items-center gap-1 mt-1" style={{ color: '#8b6f47' }}>
            <span>📍</span> {resume.location}
          </p>
        </div>
      </div>

      {/* Summary */}
      <div
        className="mx-5 mb-4 p-4 rounded-xl"
        style={{ background: '#f5f0e8', border: '1px solid rgba(210,195,170,0.3)' }}
      >
        <p className="text-[11px] leading-relaxed" style={{ color: '#7a6248' }}>{resume.summary}</p>
      </div>

      {/* Contact links */}
      <div className="mx-5 mb-5">
        <p className="text-[10px] font-semibold uppercase tracking-widest px-1 mb-2" style={{ color: '#b09070' }}>
          Contact
        </p>
        <div
          className="rounded-2xl overflow-hidden"
          style={{ border: '1px solid rgba(210,195,170,0.3)', background: 'white' }}
        >
          <ContactRow icon="✉️" label="Email" value={resume.email} href={`mailto:${resume.email}`} />
          <div style={{ borderTop: '1px solid rgba(210,195,170,0.25)' }} />
          <ContactRow icon="📞" label="Phone" value={resume.phone} />
          <div style={{ borderTop: '1px solid rgba(210,195,170,0.25)' }} />
          <ContactRow icon="💼" label="LinkedIn" value="kusumlingaraju" href={resume.linkedin} />
          <div style={{ borderTop: '1px solid rgba(210,195,170,0.25)' }} />
          <ContactRow icon="🐙" label="GitHub" value="kusumlin" href={resume.github} />
        </div>
      </div>

      {/* Achievements */}
      <div className="mx-5 mb-6">
        <p className="text-[10px] font-semibold uppercase tracking-widest px-1 mb-2" style={{ color: '#b09070' }}>
          Achievements
        </p>
        <div className="flex flex-col gap-2">
          {resume.achievements.map((a, i) => (
            <div
              key={i}
              className="p-3 rounded-xl"
              style={{ background: '#fef5e7', border: '1px solid rgba(200,165,100,0.2)' }}
            >
              <p className="text-xs font-semibold" style={{ color: '#8b6030' }}>{a.title}</p>
              <p className="text-[11px] mt-0.5" style={{ color: '#7a6248' }}>{a.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
