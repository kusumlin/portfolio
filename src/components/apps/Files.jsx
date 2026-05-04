import React, { useState } from 'react'
import { resume } from '../../data/resume'

function Section({ title, children }) {
  return (
    <div className="mb-5">
      <div className="flex items-center gap-2 mb-2">
        <div className="h-px flex-1" style={{ background: 'linear-gradient(to right, #e0d0b8, transparent)' }} />
        <h3 className="text-[10px] font-bold uppercase tracking-widest px-1" style={{ color: '#b07d30' }}>{title}</h3>
        <div className="h-px flex-1" style={{ background: 'linear-gradient(to left, #e0d0b8, transparent)' }} />
      </div>
      {children}
    </div>
  )
}

export default function Files() {
  const [downloading, setDownloading] = useState(false)

  const handleDownload = () => {
    setDownloading(true)
    const link = document.createElement('a')
    link.href = '/resume.pdf'
    link.download = 'Kusum_Lingaraju_Resume.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    setTimeout(() => setDownloading(false), 1500)
  }

  return (
    <div className="h-full flex flex-col" style={{ background: '#fdfaf4' }}>
      {/* Toolbar */}
      <div
        className="flex items-center justify-between px-5 py-3 shrink-0"
        style={{
          background: '#f5f0e8',
          borderBottom: '1px solid rgba(210,195,170,0.4)',
        }}
      >
        <p className="text-xs font-semibold" style={{ color: '#8b6f47' }}>Kusum_Lingaraju_Resume.pdf</p>
        <button
          onClick={handleDownload}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white transition-all active:scale-95"
          style={{
            background: downloading ? '#c9966e' : 'linear-gradient(135deg,#c9966e,#a87850)',
          }}
        >
          {downloading ? '✓ Saved' : '↓ Download'}
        </button>
      </div>

      {/* Resume content */}
      <div className="flex-1 overflow-y-auto custom-scroll px-8 py-6">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-xl font-bold tracking-tight" style={{ color: '#3a2c1e' }}>{resume.name}</h1>
          <p className="text-xs mt-1" style={{ color: '#8b6f47' }}>
            {resume.location} · {resume.phone} · {resume.email}
          </p>
          <p className="text-xs mt-0.5">
            <a href={resume.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: '#b07d30' }}>
              LinkedIn
            </a>
            {' · '}
            <a href={resume.github} target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: '#b07d30' }}>
              GitHub
            </a>
          </p>
        </div>

        <Section title="Summary">
          <p className="text-[11px] leading-relaxed" style={{ color: '#6b5c45' }}>{resume.summary}</p>
        </Section>

        <Section title="Education">
          {resume.education.map((ed) => (
            <div key={ed.school} className="mb-3">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs font-semibold" style={{ color: '#3a2c1e' }}>{ed.school}</p>
                  <p className="text-[11px]" style={{ color: '#6b5c45' }}>{ed.degree}</p>
                </div>
                <div className="text-right shrink-0 ml-2">
                  <p className="text-[10px]" style={{ color: '#9b8060' }}>{ed.period}</p>
                  <p className="text-[10px] font-semibold" style={{ color: '#b07d30' }}>GPA: {ed.gpa}</p>
                </div>
              </div>
              <p className="text-[10px] mt-1" style={{ color: '#9b8060' }}>
                {ed.coursework.join(' · ')}
              </p>
            </div>
          ))}
        </Section>

        <Section title="Experience">
          {resume.experience.map((exp) => (
            <div key={exp.company} className="mb-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs font-semibold" style={{ color: '#3a2c1e' }}>{exp.company}</p>
                  <p className="text-[11px] font-medium" style={{ color: '#b07d30' }}>{exp.role}</p>
                </div>
                <div className="text-right shrink-0 ml-2">
                  <p className="text-[10px]" style={{ color: '#9b8060' }}>{exp.period}</p>
                  <p className="text-[10px]" style={{ color: '#b09070' }}>{exp.location}</p>
                </div>
              </div>
              <ul className="mt-1.5 space-y-1">
                {exp.bullets.map((b, i) => (
                  <li key={i} className="flex gap-2 text-[10px] leading-relaxed" style={{ color: '#6b5c45' }}>
                    <span className="mt-0.5 shrink-0" style={{ color: '#c9966e' }}>•</span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Section>

        <Section title="Technical Skills">
          <div className="space-y-1.5">
            {Object.entries(resume.skills).map(([cat, items]) => (
              <div key={cat} className="flex gap-2 text-[10px]">
                <span className="font-semibold w-32 shrink-0" style={{ color: '#4a3728' }}>{cat}:</span>
                <span style={{ color: '#7a6248' }}>{items.join(', ')}</span>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Academic Projects">
          {resume.projects.map((p) => (
            <div key={p.title} className="mb-3">
              <p className="text-[11px] font-semibold" style={{ color: '#3a2c1e' }}>{p.title}</p>
              <p className="text-[10px] mt-0.5 leading-relaxed" style={{ color: '#7a6248' }}>{p.description}</p>
              <p className="text-[10px] mt-0.5" style={{ color: '#b07d30' }}>Stack: {p.tech.join(', ')}</p>
            </div>
          ))}
        </Section>

        <Section title="Leadership & Achievements">
          {resume.achievements.map((a, i) => (
            <div key={i} className="flex gap-2 text-[10px] mb-1 leading-relaxed" style={{ color: '#6b5c45' }}>
              <span className="shrink-0" style={{ color: '#c9966e' }}>•</span>
              <span><strong>{a.title}</strong> — {a.detail}</span>
            </div>
          ))}
        </Section>
      </div>
    </div>
  )
}
