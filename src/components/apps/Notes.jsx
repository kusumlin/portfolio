import React, { useState } from 'react'
import { resume } from '../../data/resume'

const PROJECT_EMOJIS = ['📱', '🏥', '📊']
const PROJECT_DATES  = ['Mar 2025', 'Jan 2025', 'Dec 2021']

/* ── Tech badge ── */
function TechBadge({ tech }) {
  return (
    <span className="inline-block px-2 py-0.5 rounded-full text-[11px] font-medium mr-1 mb-1"
      style={{ background: '#ede8f8', color: '#7060a0' }}>
      {tech}
    </span>
  )
}

/* ── Grid card (Notes gallery style) ── */
function ProjectGridCard({ project, index, onClick }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
      }}
    >
      {/* Card */}
      <div style={{
        width: '100%',
        background: 'white',
        borderRadius: 10,
        padding: '12px 14px',
        minHeight: 130,
        boxShadow: hovered
          ? '0 4px 16px rgba(0,0,0,0.13)'
          : '0 1px 4px rgba(0,0,0,0.08)',
        transform: hovered ? 'translateY(-2px)' : 'none',
        transition: 'box-shadow 0.15s, transform 0.15s',
        border: '1px solid rgba(0,0,0,0.06)',
        overflow: 'hidden',
      }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: '#1c1c1e', marginBottom: 6, lineHeight: 1.3 }}>
          {project.title}
        </p>
        <p style={{ fontSize: 11, color: '#8e8e93', lineHeight: 1.55,
          display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {project.description}
        </p>
      </div>
      {/* Date below card */}
      <p style={{ fontSize: 11, color: '#8e8e93' }}>{PROJECT_DATES[index]}</p>
    </div>
  )
}

/* ── Full project document view ── */
function ProjectDoc({ project, index, onBack }) {
  return (
    <div className="h-full flex flex-col">
      {/* Back button */}
      <div style={{ padding: '10px 20px', borderBottom: '1px solid #e8e8e8', background: '#f5f5f5' }}>
        <button onClick={onBack} style={{ fontSize: 13, color: '#6858a0', fontWeight: 500, background: 'none', border: 'none', cursor: 'pointer' }}>
          ← All Projects
        </button>
      </div>
      <div
        className="flex-1 overflow-y-auto custom-scroll"
        style={{
          background: 'white',
          backgroundImage: 'repeating-linear-gradient(transparent 0, transparent 27px, #ececec 27px, #ececec 28px)',
          backgroundPositionY: '88px',
        }}
      >
        <div style={{ padding: '32px 40px 48px' }}>
          <h1 style={{ fontSize: 34, fontWeight: 700, color: '#1c1c1e', lineHeight: 1.15, marginBottom: 6 }}>
            {project.title} {PROJECT_EMOJIS[index]}
          </h1>
          <p style={{ fontSize: 13, color: '#8e8e93', marginBottom: 20 }}>{PROJECT_DATES[index]} · {project.impact}</p>
          <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', marginBottom: 24 }} />
          <p style={{ fontSize: 16, color: '#1c1c1e', lineHeight: 1.75, marginBottom: 28 }}>{project.description}</p>
          <p style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#8e8e93', marginBottom: 10 }}>Tech Stack</p>
          <div style={{ marginBottom: 28 }}>{project.tech.map(t => <TechBadge key={t} tech={t} />)}</div>
          {(project.github || project.demo) && (
            <>
              <p style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#8e8e93', marginBottom: 10 }}>Links</p>
              <div className="flex gap-3">
                {project.github && <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-xs px-4 py-1.5 rounded-full" style={{ background: '#f0ebe0', color: '#6b5c45' }}>GitHub ↗</a>}
                {project.demo   && <a href={project.demo}   target="_blank" rel="noopener noreferrer" className="text-xs px-4 py-1.5 rounded-full text-white" style={{ background: '#8060b0' }}>Live Demo ↗</a>}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

/* ── Resume document view ── */
function ResumeDoc() {
  return (
    <div className="h-full overflow-y-auto custom-scroll"
      style={{
        background: 'white',
        backgroundImage: 'repeating-linear-gradient(transparent 0, transparent 27px, #ececec 27px, #ececec 28px)',
        backgroundPositionY: '88px',
      }}
    >
      <div style={{ padding: '32px 40px 48px' }}>
        <h1 style={{ fontSize: 34, fontWeight: 700, color: '#1c1c1e', lineHeight: 1.15, marginBottom: 6 }}>My Resume 📄</h1>
        <p style={{ fontSize: 13, color: '#8e8e93', marginBottom: 20 }}>{resume.title}</p>
        <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', marginBottom: 28 }} />

        <ResumeSection label="Education">
          {resume.education.map(e => (
            <div key={e.school} style={{ marginBottom: 20 }}>
              <p style={{ fontSize: 15, fontWeight: 600, color: '#1c1c1e' }}>{e.school}</p>
              <p style={{ fontSize: 13, color: '#3d2e5e', marginBottom: 2 }}>{e.degree}</p>
              <p style={{ fontSize: 12, color: '#8e8e93' }}>{e.period} · GPA {e.gpa}</p>
              <div style={{ marginTop: 6 }}>{e.coursework.map(c => <TechBadge key={c} tech={c} />)}</div>
            </div>
          ))}
        </ResumeSection>

        <ResumeSection label="Experience">
          {resume.experience.map(exp => (
            <div key={exp.company} style={{ marginBottom: 20 }}>
              <p style={{ fontSize: 15, fontWeight: 600, color: '#1c1c1e' }}>{exp.role}</p>
              <p style={{ fontSize: 13, color: '#3d2e5e', marginBottom: 2 }}>{exp.company} · {exp.location}</p>
              <p style={{ fontSize: 12, color: '#8e8e93', marginBottom: 8 }}>{exp.period}</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {exp.bullets.map((b, i) => (
                  <li key={i} style={{ fontSize: 13, color: '#3c3c43', lineHeight: 1.65, display: 'flex', gap: 8, marginBottom: 4 }}>
                    <span style={{ color: '#8060b0', flexShrink: 0 }}>•</span>{b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </ResumeSection>

        <ResumeSection label="Skills">
          {Object.entries(resume.skills).map(([cat, skills]) => (
            <div key={cat} style={{ marginBottom: 12 }}>
              <p style={{ fontSize: 11, fontWeight: 600, color: '#8e8e93', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 4 }}>{cat}</p>
              <div>{skills.map(s => <TechBadge key={s} tech={s} />)}</div>
            </div>
          ))}
        </ResumeSection>

        <ResumeSection label="Achievements">
          {resume.achievements.map((a, i) => (
            <div key={i} style={{ marginBottom: 12, display: 'flex', gap: 10 }}>
              <span style={{ color: '#8060b0' }}>★</span>
              <div>
                <p style={{ fontSize: 13, fontWeight: 600, color: '#1c1c1e' }}>{a.title}</p>
                <p style={{ fontSize: 12, color: '#8e8e93' }}>{a.detail}</p>
              </div>
            </div>
          ))}
        </ResumeSection>
      </div>
    </div>
  )
}

function ResumeSection({ label, children }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <p style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#8e8e93', marginBottom: 14 }}>{label}</p>
      {children}
    </div>
  )
}

/* ── Sidebar item ── */
function SidebarItem({ label, active, onClick }) {
  return (
    <button onClick={onClick}
      className="w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
      style={active ? { background: '#e2d8f2', color: '#6b52a0' } : { color: '#9585b8' }}
      onMouseEnter={e => { if (!active) e.currentTarget.style.background = '#ebe5f5' }}
      onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent' }}
    >
      {label}
    </button>
  )
}

/* ── Main component ── */
export default function Notes() {
  const [view, setView]                   = useState('projects')
  const [selectedProject, setSelectedProject] = useState(null)

  const showGrid = () => { setView('projects'); setSelectedProject(null) }

  return (
    <div className="h-full flex">
      {/* Sidebar */}
      <div className="shrink-0 flex flex-col p-4 gap-1" style={{ width: 180, background: '#f0ecf8', borderRight: '1px solid rgba(190,178,220,0.4)' }}>
        <p className="text-[10px] font-semibold uppercase tracking-widest mb-2 px-2" style={{ color: '#a898c8' }}>On My Mac</p>
        <SidebarItem label="Projects" active={view === 'projects'} onClick={showGrid} />
        <SidebarItem label="Resume"   active={view === 'resume'}   onClick={() => { setView('resume'); setSelectedProject(null) }} />
        <div className="mt-auto">
          <p className="text-[10px] px-2" style={{ color: '#a898c8' }}>{resume.projects.length} projects</p>
        </div>
      </div>

      {/* Main panel */}
      <div className="flex-1 overflow-hidden">
        {view === 'resume' ? (
          <ResumeDoc />
        ) : selectedProject !== null ? (
          <ProjectDoc project={resume.projects[selectedProject]} index={selectedProject} onBack={showGrid} />
        ) : (
          /* Grid view */
          <div className="h-full overflow-y-auto custom-scroll" style={{ background: '#f5f5f5', padding: '20px 24px' }}>
            <p style={{ fontSize: 13, fontWeight: 600, color: '#8e8e93', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Projects
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px 14px' }}>
              {resume.projects.map((project, i) => (
                <ProjectGridCard
                  key={project.title}
                  project={project}
                  index={i}
                  onClick={() => setSelectedProject(i)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
