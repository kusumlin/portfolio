import React, { useState } from 'react'
import { resume } from '../../data/resume'

function TechBadge({ tech }) {
  return (
    <span
      className="inline-block px-2 py-0.5 rounded-full text-[11px] font-medium mr-1 mb-1"
      style={{ background: '#f0ebe0', color: '#8b6f47' }}
    >
      {tech}
    </span>
  )
}

function ProjectCard({ project, index }) {
  const [hovered, setHovered] = useState(false)
  const headerColors = [
    { from: '#f9c46b', to: '#f5a623' },
    { from: '#a8d8ea', to: '#6fb3cc' },
    { from: '#b8e0b8', to: '#7bbf7b' },
  ]
  const c = headerColors[index % headerColors.length]

  return (
    <div
      className="rounded-2xl overflow-hidden mb-4 transition-all duration-200"
      style={{
        boxShadow: hovered ? '0 6px 24px rgba(140,100,50,0.14)' : '0 2px 10px rgba(0,0,0,0.06)',
        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
        border: '1px solid rgba(210,195,170,0.35)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="h-20 flex items-end p-4" style={{ background: `linear-gradient(135deg, ${c.from}, ${c.to})` }}>
        <h3 className="text-white font-semibold text-sm leading-tight drop-shadow">{project.title}</h3>
      </div>
      <div className="p-4" style={{ background: 'white' }}>
        <p className="text-[11px] leading-relaxed mb-3" style={{ color: '#6b5c45' }}>{project.description}</p>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full mb-3 text-[11px] font-medium" style={{ background: '#fef5e7', color: '#b07d30' }}>
          <span>★</span><span>{project.impact}</span>
        </div>
        <div>{project.tech.map(t => <TechBadge key={t} tech={t} />)}</div>
        {(project.github || project.demo) && (
          <div className="flex gap-2 mt-3">
            {project.github && <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-xs px-3 py-1 rounded-full" style={{ background: '#f0ebe0', color: '#6b5c45' }}>GitHub ↗</a>}
            {project.demo && <a href={project.demo} target="_blank" rel="noopener noreferrer" className="text-xs px-3 py-1 rounded-full text-white" style={{ background: '#b07d30' }}>Live Demo ↗</a>}
          </div>
        )}
      </div>
    </div>
  )
}

function ResumeView() {
  return (
    <div className="p-5 overflow-y-auto custom-scroll h-full" style={{ background: '#fdfaf4' }}>

      {/* Education */}
      <Section title="Education">
        {resume.education.map(e => (
          <div key={e.school} className="mb-4 p-4 rounded-xl" style={{ background: 'white', border: '1px solid rgba(210,195,170,0.35)' }}>
            <div className="flex justify-between items-start mb-1">
              <div>
                <p className="text-sm font-semibold" style={{ color: '#3d2e1e' }}>{e.school}</p>
                <p className="text-[11px]" style={{ color: '#8b6f47' }}>{e.degree}</p>
              </div>
              <span className="text-[10px] shrink-0 ml-2" style={{ color: '#b09070' }}>{e.period}</span>
            </div>
            <p className="text-[11px] mt-1" style={{ color: '#b07d30' }}>GPA {e.gpa} · {e.location}</p>
            <div className="mt-2 flex flex-wrap gap-1">
              {e.coursework.map(c => <TechBadge key={c} tech={c} />)}
            </div>
          </div>
        ))}
      </Section>

      {/* Experience */}
      <Section title="Experience">
        {resume.experience.map(exp => (
          <div key={exp.company} className="mb-4 p-4 rounded-xl" style={{ background: 'white', border: '1px solid rgba(210,195,170,0.35)' }}>
            <div className="flex justify-between items-start mb-1">
              <div>
                <p className="text-sm font-semibold" style={{ color: '#3d2e1e' }}>{exp.role}</p>
                <p className="text-[11px]" style={{ color: '#8b6f47' }}>{exp.company} · {exp.location}</p>
              </div>
              <span className="text-[10px] shrink-0 ml-2" style={{ color: '#b09070' }}>{exp.period}</span>
            </div>
            <ul className="mt-2 space-y-1">
              {exp.bullets.map((b, i) => (
                <li key={i} className="text-[11px] leading-relaxed flex gap-1.5" style={{ color: '#6b5c45' }}>
                  <span style={{ color: '#b07d30', marginTop: 1 }}>•</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Section>

      {/* Skills */}
      <Section title="Skills">
        <div className="p-4 rounded-xl" style={{ background: 'white', border: '1px solid rgba(210,195,170,0.35)' }}>
          {Object.entries(resume.skills).map(([cat, skills]) => (
            <div key={cat} className="mb-3 last:mb-0">
              <p className="text-[10px] font-semibold uppercase tracking-wide mb-1.5" style={{ color: '#b09070' }}>{cat}</p>
              <div className="flex flex-wrap">{skills.map(s => <TechBadge key={s} tech={s} />)}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* Achievements */}
      <Section title="Achievements">
        <div className="space-y-2">
          {resume.achievements.map(a => (
            <div key={a.title} className="p-3 rounded-xl flex gap-3 items-start" style={{ background: 'white', border: '1px solid rgba(210,195,170,0.35)' }}>
              <span style={{ color: '#b07d30', fontSize: 16, marginTop: 1 }}>★</span>
              <div>
                <p className="text-xs font-semibold" style={{ color: '#3d2e1e' }}>{a.title}</p>
                <p className="text-[11px] mt-0.5" style={{ color: '#8b6f47' }}>{a.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  )
}

function Section({ title, children }) {
  return (
    <div className="mb-6">
      <p className="text-[10px] font-semibold uppercase tracking-widest mb-3 px-1" style={{ color: '#b09070' }}>{title}</p>
      {children}
    </div>
  )
}

function SidebarItem({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
      style={active ? { background: '#e8d9c0', color: '#7a5c30' } : { color: '#9b8060' }}
      onMouseEnter={e => { if (!active) e.currentTarget.style.background = '#efe7d5' }}
      onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent' }}
    >
      {label}
    </button>
  )
}

export default function Notes() {
  const [view, setView] = useState('projects')

  return (
    <div className="h-full flex flex-col">
      <div className="flex h-full">
        {/* Sidebar */}
        <div className="w-44 shrink-0 flex flex-col p-4 gap-1" style={{ background: '#f5f0e8', borderRight: '1px solid rgba(210,195,170,0.4)' }}>
          <p className="text-[10px] font-semibold uppercase tracking-widest mb-2 px-2" style={{ color: '#b09070' }}>Portfolio</p>
          <SidebarItem label="Projects" active={view === 'projects'} onClick={() => setView('projects')} />
          <SidebarItem label="Resume"   active={view === 'resume'}   onClick={() => setView('resume')}   />
          <div className="mt-auto">
            <p className="text-[10px] px-2" style={{ color: '#b09070' }}>{resume.projects.length} projects</p>
          </div>
        </div>

        {/* Main content */}
        {view === 'projects' ? (
          <div className="flex-1 p-5 overflow-y-auto custom-scroll" style={{ background: '#fdfaf4' }}>
            <p className="text-xs mb-4 font-medium" style={{ color: '#b09070' }}>{resume.name.split(' ')[0]}&apos;s Projects</p>
            {resume.projects.map((project, i) => <ProjectCard key={project.title} project={project} index={i} />)}
          </div>
        ) : (
          <div className="flex-1 overflow-hidden">
            <ResumeView />
          </div>
        )}
      </div>
    </div>
  )
}
