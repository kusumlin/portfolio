import { useState } from 'react'
import { resume } from '../../data/resume'

const TABS = ['About', 'Projects', 'Skills', 'Experience', 'Contact']

const PROJECT_EMOJIS = ['📱', '🏥', '📊']
const PROJECT_DATES  = ['Mar 2025', 'Jan 2025', 'Dec 2021']

function TechBadge({ tech }) {
  return (
    <span style={{
      display: 'inline-block', padding: '3px 10px', borderRadius: 20,
      fontSize: 11, fontWeight: 500, marginRight: 5, marginBottom: 5,
      background: '#ede8f8', color: '#7060a0',
    }}>
      {tech}
    </span>
  )
}

function AboutTab() {
  return (
    <div style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Profile */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, paddingTop: 8 }}>
        <div style={{
          width: 110, height: 110, borderRadius: '50%', overflow: 'hidden',
          border: '4px solid rgba(255,255,255,0.9)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
        }}>
          <img src="/icons/mypicture.png" alt="Kusum" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: '#1c1c1e', marginBottom: 4 }}>{resume.name}</h1>
          <p style={{ fontSize: 14, color: '#7060a0', fontWeight: 500, marginBottom: 4 }}>{resume.title}</p>
          <p style={{ fontSize: 13, color: '#8e8e93' }}>📍 {resume.location}</p>
        </div>
        {/* Links */}
        <div style={{ display: 'flex', gap: 10 }}>
          <a href={resume.github} target="_blank" rel="noopener noreferrer" style={{
            padding: '8px 18px', borderRadius: 20, fontSize: 13, fontWeight: 600,
            background: '#1c1c1e', color: 'white', textDecoration: 'none',
          }}>GitHub</a>
          <a href={resume.linkedin} target="_blank" rel="noopener noreferrer" style={{
            padding: '8px 18px', borderRadius: 20, fontSize: 13, fontWeight: 600,
            background: '#0077b5', color: 'white', textDecoration: 'none',
          }}>LinkedIn</a>
          <a href={`mailto:${resume.email}`} style={{
            padding: '8px 18px', borderRadius: 20, fontSize: 13, fontWeight: 600,
            background: '#ede8f8', color: '#7060a0', textDecoration: 'none',
          }}>Email</a>
        </div>
      </div>

      {/* Summary */}
      <div style={{ background: 'white', borderRadius: 16, padding: '16px 18px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
        <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#a898c8', marginBottom: 8 }}>About</p>
        <p style={{ fontSize: 14, color: '#3c3c43', lineHeight: 1.7 }}>{resume.summary}</p>
      </div>

      {/* Education */}
      <div style={{ background: 'white', borderRadius: 16, padding: '16px 18px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
        <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#a898c8', marginBottom: 12 }}>Education</p>
        {resume.education.map(e => (
          <div key={e.school} style={{ marginBottom: 14 }}>
            <p style={{ fontSize: 14, fontWeight: 600, color: '#1c1c1e' }}>{e.school}</p>
            <p style={{ fontSize: 13, color: '#7060a0', marginBottom: 2 }}>{e.degree}</p>
            <p style={{ fontSize: 12, color: '#8e8e93' }}>{e.period} · GPA {e.gpa}</p>
          </div>
        ))}
      </div>

      {/* Achievements */}
      <div style={{ background: 'white', borderRadius: 16, padding: '16px 18px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
        <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#a898c8', marginBottom: 12 }}>Achievements</p>
        {resume.achievements.map((a, i) => (
          <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
            <span style={{ color: '#8060b0', fontSize: 14 }}>★</span>
            <div>
              <p style={{ fontSize: 13, fontWeight: 600, color: '#1c1c1e' }}>{a.title}</p>
              <p style={{ fontSize: 12, color: '#8e8e93' }}>{a.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ProjectsTab() {
  const [selected, setSelected] = useState(null)

  if (selected !== null) {
    const p = resume.projects[selected]
    return (
      <div style={{ padding: '0 0 32px' }}>
        <button onClick={() => setSelected(null)} style={{
          display: 'flex', alignItems: 'center', gap: 6, padding: '16px 20px',
          background: 'none', border: 'none', fontSize: 14, color: '#7060a0', fontWeight: 600, cursor: 'pointer',
        }}>
          ← Projects
        </button>
        <div style={{ padding: '0 20px' }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#1c1c1e', marginBottom: 6 }}>
            {p.title} {PROJECT_EMOJIS[selected]}
          </h2>
          <p style={{ fontSize: 12, color: '#8e8e93', marginBottom: 16 }}>{PROJECT_DATES[selected]} · {p.impact}</p>
          <p style={{ fontSize: 15, color: '#3c3c43', lineHeight: 1.7, marginBottom: 20 }}>{p.description}</p>
          <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#a898c8', marginBottom: 8 }}>Tech Stack</p>
          <div>{p.tech.map(t => <TechBadge key={t} tech={t} />)}</div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: 14 }}>
      {resume.projects.map((p, i) => (
        <button key={p.title} onClick={() => setSelected(i)} style={{
          textAlign: 'left', background: 'white', borderRadius: 16,
          padding: '16px 18px', border: '1px solid rgba(0,0,0,0.06)',
          boxShadow: '0 2px 12px rgba(0,0,0,0.06)', cursor: 'pointer',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
            <p style={{ fontSize: 15, fontWeight: 700, color: '#1c1c1e', flex: 1, marginRight: 8, lineHeight: 1.3 }}>{p.title}</p>
            <span style={{ fontSize: 20 }}>{PROJECT_EMOJIS[i]}</span>
          </div>
          <p style={{ fontSize: 13, color: '#8e8e93', lineHeight: 1.55, marginBottom: 10,
            display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {p.description}
          </p>
          <div>{p.tech.slice(0, 3).map(t => <TechBadge key={t} tech={t} />)}</div>
          <p style={{ fontSize: 11, color: '#a898c8', marginTop: 8 }}>{PROJECT_DATES[i]}</p>
        </button>
      ))}
    </div>
  )
}

function SkillsTab() {
  return (
    <div style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: 14 }}>
      {Object.entries(resume.skills).map(([cat, skills]) => (
        <div key={cat} style={{ background: 'white', borderRadius: 16, padding: '16px 18px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
          <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#a898c8', marginBottom: 10 }}>{cat}</p>
          <div>{skills.map(s => <TechBadge key={s} tech={s} />)}</div>
        </div>
      ))}
    </div>
  )
}

function ExperienceTab() {
  return (
    <div style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: 14 }}>
      {resume.experience.map(exp => (
        <div key={exp.company} style={{ background: 'white', borderRadius: 16, padding: '16px 18px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
          <p style={{ fontSize: 15, fontWeight: 700, color: '#1c1c1e', marginBottom: 2 }}>{exp.role}</p>
          <p style={{ fontSize: 13, color: '#7060a0', marginBottom: 2 }}>{exp.company} · {exp.location}</p>
          <p style={{ fontSize: 12, color: '#8e8e93', marginBottom: 12 }}>{exp.period}</p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
            {exp.bullets.map((b, i) => (
              <li key={i} style={{ display: 'flex', gap: 8, fontSize: 13, color: '#3c3c43', lineHeight: 1.65 }}>
                <span style={{ color: '#8060b0', flexShrink: 0 }}>•</span>{b}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

function ContactTab() {
  return (
    <div style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: 14 }}>
      {[
        { label: 'Email', value: resume.email, href: `mailto:${resume.email}`, icon: '✉️' },
        { label: 'LinkedIn', value: 'kusumlingaraju', href: resume.linkedin, icon: '💼' },
        { label: 'GitHub', value: 'kusumlin', href: resume.github, icon: '🐙' },
        { label: 'Location', value: resume.location, href: null, icon: '📍' },
      ].map(item => (
        <div key={item.label} style={{ background: 'white', borderRadius: 16, padding: '16px 18px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <span style={{ fontSize: 24 }}>{item.icon}</span>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#a898c8', marginBottom: 2 }}>{item.label}</p>
              {item.href ? (
                <a href={item.href} target="_blank" rel="noopener noreferrer" style={{ fontSize: 14, color: '#7060a0', fontWeight: 500, textDecoration: 'none' }}>
                  {item.value}
                </a>
              ) : (
                <p style={{ fontSize: 14, color: '#3c3c43' }}>{item.value}</p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function MobileView() {
  const [activeTab, setActiveTab] = useState('About')

  const renderTab = () => {
    switch (activeTab) {
      case 'About':      return <AboutTab />
      case 'Projects':   return <ProjectsTab />
      case 'Skills':     return <SkillsTab />
      case 'Experience': return <ExperienceTab />
      case 'Contact':    return <ContactTab />
      default:           return <AboutTab />
    }
  }

  return (
    <div style={{
      minHeight: '100vh', width: '100%',
      background: 'linear-gradient(160deg, #f0ecf8 0%, #fdfaf4 60%, #ede8f8 100%)',
      fontFamily: "'Inter', sans-serif",
      paddingBottom: 80,
    }}>
      {/* Header bar */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: 'rgba(253,250,244,0.92)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(180,160,220,0.2)',
        padding: '12px 20px 0',
      }}>
        <p style={{ fontSize: 15, fontWeight: 700, color: '#1c1c1e', marginBottom: 10 }}>{resume.name}</p>
        {/* Tabs */}
        <div style={{ display: 'flex', gap: 0, overflowX: 'auto', scrollbarWidth: 'none' }}>
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '8px 14px', background: 'none', border: 'none', cursor: 'pointer',
                fontSize: 13, fontWeight: activeTab === tab ? 700 : 500,
                color: activeTab === tab ? '#7060a0' : '#8e8e93',
                borderBottom: activeTab === tab ? '2px solid #7060a0' : '2px solid transparent',
                whiteSpace: 'nowrap', transition: 'color 0.15s',
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      {renderTab()}
    </div>
  )
}
