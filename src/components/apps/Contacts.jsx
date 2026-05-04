import React from 'react'
import { resume } from '../../data/resume'

function ContactRow({ icon, label, value, href }) {
  const content = (
    <div
      className="flex items-center gap-3 px-4 py-3 rounded-xl transition-colors"
      onMouseEnter={e => { e.currentTarget.style.background = '#ede8f8' }}
      onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
    >
      <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg shrink-0" style={{ background: '#ede8f8' }}>
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: '#a898c8' }}>{label}</p>
        <p className="text-[13px] font-medium truncate" style={{ color: '#3d2e5e' }}>{value}</p>
      </div>
      {href && <span className="ml-auto text-xs" style={{ color: '#c0b0e0' }}>↗</span>}
    </div>
  )

  if (href) return <a href={href} target="_blank" rel="noopener noreferrer" className="block">{content}</a>
  return <div>{content}</div>
}

export default function Contacts() {
  return (
    <div className="h-full flex flex-col overflow-y-auto custom-scroll" style={{ background: '#fdfaff' }}>
      {/* Header card */}
      <div
        className="mx-5 mt-5 mb-4 rounded-2xl p-5 flex items-center gap-4"
        style={{
          background: 'linear-gradient(135deg, #e8e0f8 0%, #d8ccf0 100%)',
          border: '1px solid rgba(190,178,220,0.35)',
        }}
      >
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center text-2xl font-bold text-white shrink-0"
          style={{ background: 'linear-gradient(135deg, #b8a0e0, #9078c8)' }}
        >
          KL
        </div>
        <div>
          <h2 className="font-semibold text-base" style={{ color: '#3d2e5e' }}>{resume.name}</h2>
          <p className="text-xs mt-0.5" style={{ color: '#8070a8' }}>{resume.title}</p>
          <p className="text-xs flex items-center gap-1 mt-1" style={{ color: '#8070a8' }}>
            <span>📍</span> {resume.location}
          </p>
        </div>
      </div>

      {/* Summary */}
      <div className="mx-5 mb-4 p-4 rounded-xl" style={{ background: '#f0ecf8', border: '1px solid rgba(190,178,220,0.3)' }}>
        <p className="text-[11px] leading-relaxed" style={{ color: '#6858a0' }}>{resume.summary}</p>
      </div>

      {/* Contact links */}
      <div className="mx-5 mb-5">
        <p className="text-[10px] font-semibold uppercase tracking-widest px-1 mb-2" style={{ color: '#a898c8' }}>Contact</p>
        <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(190,178,220,0.3)', background: 'white' }}>
          <ContactRow icon="✉️" label="Email"    value={resume.email}         href={`mailto:${resume.email}`} />
          <div style={{ borderTop: '1px solid rgba(190,178,220,0.2)' }} />
          <ContactRow icon="📞" label="Phone"    value={resume.phone} />
          <div style={{ borderTop: '1px solid rgba(190,178,220,0.2)' }} />
          <ContactRow icon="💼" label="LinkedIn" value="kusumlingaraju"        href={resume.linkedin} />
          <div style={{ borderTop: '1px solid rgba(190,178,220,0.2)' }} />
          <ContactRow icon="🐙" label="GitHub"   value="kusumlin"              href={resume.github} />
        </div>
      </div>

      {/* Achievements */}
      <div className="mx-5 mb-6">
        <p className="text-[10px] font-semibold uppercase tracking-widest px-1 mb-2" style={{ color: '#a898c8' }}>Achievements</p>
        <div className="flex flex-col gap-2">
          {resume.achievements.map((a, i) => (
            <div key={i} className="p-3 rounded-xl" style={{ background: '#f0ecfb', border: '1px solid rgba(190,178,220,0.25)' }}>
              <p className="text-xs font-semibold" style={{ color: '#6b52a0' }}>{a.title}</p>
              <p className="text-[11px] mt-0.5" style={{ color: '#8070a8' }}>{a.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
