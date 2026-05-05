import { useState, useEffect } from 'react'
import { resume } from '../../data/resume'

const TABS = ['About', 'Projects', 'Skills', 'Experience', 'Contact']
const PROJECT_EMOJIS = ['📱', '🏥', '📊']
const PROJECT_DATES  = ['Mar 2025', 'Jan 2025', 'Dec 2021']

/* ── Hello intro ── */
function MobileIntro({ onDone }) {
  const [sliding, setSliding] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setSliding(true), 2400)
    const t2 = setTimeout(() => onDone(), 3100)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [onDone])

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'rgba(245,240,232,0.94)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      transform: sliding ? 'translateY(-100%)' : 'translateY(0)',
      transition: sliding ? 'transform 0.65s cubic-bezier(0.76,0,0.24,1)' : 'none',
      pointerEvents: sliding ? 'none' : 'auto',
    }}>
      <span style={{
        fontFamily: "'Playwrite BR', cursive",
        fontSize: 'clamp(36px, 12vw, 72px)',
        color: '#2d2318',
        whiteSpace: 'nowrap',
        clipPath: 'inset(0 102% 0 0)',
        opacity: 0,
        animation: 'helloWrite 1.5s linear forwards',
        animationDelay: '0.2s',
        transform: 'skewX(-6deg)',
        display: 'inline-block',
      }}>
        Hello,
      </span>
      <span style={{ position: 'absolute', top: '22%', left: '14%', fontSize: '1.4rem', opacity: 0.4, animation: 'floatA 3.5s ease-in-out infinite' }}>✨</span>
      <span style={{ position: 'absolute', top: '28%', right: '12%', fontSize: '1.1rem', opacity: 0.35, animation: 'floatB 4s ease-in-out 0.8s infinite' }}>🌸</span>
      <span style={{ position: 'absolute', bottom: '26%', left: '18%', fontSize: '1rem', opacity: 0.3, animation: 'floatC 4.5s ease-in-out 1.5s infinite' }}>💫</span>
    </div>
  )
}

/* ── Shared badge ── */
function TechBadge({ tech }) {
  return (
    <span style={{
      display: 'inline-block', padding: '3px 10px', borderRadius: 20,
      fontSize: 11, fontWeight: 500, marginRight: 5, marginBottom: 5,
      background: '#ede8f8', color: '#7060a0',
    }}>{tech}</span>
  )
}

/* ── Tabs ── */
function AboutTab() {
  return (
    <div style={{ padding: '24px 20px 32px', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, paddingTop: 8 }}>
        {/* Tiny floating accents */}
        {[
          { e: '✨', top: '2%',  left: '4%',   size: 15, anim: 'floatA', delay: '0s'   },
          { e: '🌸', top: '6%',  right: '4%',  size: 13, anim: 'floatB', delay: '0.6s' },
          { e: '🚀', top: '20%', left: '14%',   size: 14, anim: 'floatC', delay: '0.4s' },
          { e: '💫', top: '32%', right: '7%',  size: 13, anim: 'floatA', delay: '1.2s' },
          { e: '🌿', top: '45%', left: '2%',   size: 14, anim: 'floatB', delay: '0.9s' },
          { e: '🏎️', top: '65%', right: '4%',  size: 13, anim: 'floatC', delay: '0.3s' },
          { e: '🦋', top: '75%', left: '8%',  size: 13, anim: 'floatA', delay: '1.5s' },
          { e: '🪼', top: '20%', right: '14%',  size: 13, anim: 'floatA', delay: '1.2s' }
        ].map((s, i) => (
          <span key={i} style={{
            position: 'absolute', top: s.top, left: s.left, right: s.right,
            fontSize: s.size, opacity: 0.7,
            animation: `${s.anim} ${3.5 + i * 0.3}s ease-in-out ${s.delay} infinite`,
            pointerEvents: 'none',
          }}>{s.e}</span>
        ))}
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
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
          <a href={resume.github} target="_blank" rel="noopener noreferrer" style={{ padding: '8px 18px', borderRadius: 20, fontSize: 13, fontWeight: 600, background: '#1c1c1e', color: 'white', textDecoration: 'none' }}>GitHub</a>
          <a href={resume.linkedin} target="_blank" rel="noopener noreferrer" style={{ padding: '8px 18px', borderRadius: 20, fontSize: 13, fontWeight: 600, background: '#0077b5', color: 'white', textDecoration: 'none' }}>LinkedIn</a>
          <a href={`mailto:${resume.email}`} style={{ padding: '8px 18px', borderRadius: 20, fontSize: 13, fontWeight: 600, background: '#ede8f8', color: '#7060a0', textDecoration: 'none' }}>Email</a>
        </div>
      </div> {/* end floating emoji wrapper */}

      <Card label="About">
        <p style={{ fontSize: 14, color: '#3c3c43', lineHeight: 1.7 }}>{resume.summary}</p>
      </Card>

      <Card label="Education">
        {resume.education.map(e => (
          <div key={e.school} style={{ marginBottom: 14 }}>
            <p style={{ fontSize: 14, fontWeight: 600, color: '#1c1c1e' }}>{e.school}</p>
            <p style={{ fontSize: 13, color: '#7060a0', marginBottom: 2 }}>{e.degree}</p>
            <p style={{ fontSize: 12, color: '#8e8e93' }}>{e.period} · GPA {e.gpa}</p>
          </div>
        ))}
      </Card>

      <Card label="Achievements">
        {resume.achievements.map((a, i) => (
          <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
            <span style={{ color: '#8060b0' }}>★</span>
            <div>
              <p style={{ fontSize: 13, fontWeight: 600, color: '#1c1c1e' }}>{a.title}</p>
              <p style={{ fontSize: 12, color: '#8e8e93' }}>{a.detail}</p>
            </div>
          </div>
        ))}
      </Card>
    </div>
  )
}

function ProjectsTab() {
  const [selected, setSelected] = useState(null)

  if (selected !== null) {
    const p = resume.projects[selected]
    return (
      <div style={{ padding: '0 0 32px' }}>
        <button onClick={() => setSelected(null)} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '16px 20px', background: 'none', border: 'none', fontSize: 14, color: '#7060a0', fontWeight: 600, cursor: 'pointer' }}>
          ← Projects
        </button>
        <div style={{ padding: '0 20px' }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#1c1c1e', marginBottom: 6 }}>{p.title} {PROJECT_EMOJIS[selected]}</h2>
          <p style={{ fontSize: 12, color: '#8e8e93', marginBottom: 16 }}>{PROJECT_DATES[selected]} · {p.impact}</p>
          <p style={{ fontSize: 15, color: '#3c3c43', lineHeight: 1.7, marginBottom: 20 }}>{p.description}</p>
          <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#a898c8', marginBottom: 8 }}>Tech Stack</p>
          <div>{p.tech.map(t => <TechBadge key={t} tech={t} />)}</div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ padding: '24px 20px 32px', display: 'flex', flexDirection: 'column', gap: 14 }}>
      {resume.projects.map((p, i) => (
        <button key={p.title} onClick={() => setSelected(i)} style={{ textAlign: 'left', background: 'white', borderRadius: 16, padding: '16px 18px', border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', cursor: 'pointer' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
            <p style={{ fontSize: 15, fontWeight: 700, color: '#1c1c1e', flex: 1, marginRight: 8, lineHeight: 1.3 }}>{p.title}</p>
            <span style={{ fontSize: 20 }}>{PROJECT_EMOJIS[i]}</span>
          </div>
          <p style={{ fontSize: 13, color: '#8e8e93', lineHeight: 1.55, marginBottom: 10, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{p.description}</p>
          <div>{p.tech.slice(0, 3).map(t => <TechBadge key={t} tech={t} />)}</div>
          <p style={{ fontSize: 11, color: '#a898c8', marginTop: 8 }}>{PROJECT_DATES[i]}</p>
        </button>
      ))}
    </div>
  )
}

function SkillsTab() {
  return (
    <div style={{ padding: '24px 20px 32px', display: 'flex', flexDirection: 'column', gap: 14 }}>
      {Object.entries(resume.skills).map(([cat, skills]) => (
        <Card key={cat} label={cat}>
          <div>{skills.map(s => <TechBadge key={s} tech={s} />)}</div>
        </Card>
      ))}
    </div>
  )
}

function ExperienceTab() {
  return (
    <div style={{ padding: '24px 20px 32px', display: 'flex', flexDirection: 'column', gap: 14 }}>
      {resume.experience.map(exp => (
        <Card key={exp.company} label={exp.role}>
          <p style={{ fontSize: 13, color: '#7060a0', marginBottom: 2 }}>{exp.company} · {exp.location}</p>
          <p style={{ fontSize: 12, color: '#8e8e93', marginBottom: 12 }}>{exp.period}</p>
          {exp.bullets.map((b, i) => (
            <div key={i} style={{ display: 'flex', gap: 8, fontSize: 13, color: '#3c3c43', lineHeight: 1.65, marginBottom: 6 }}>
              <span style={{ color: '#8060b0', flexShrink: 0 }}>•</span>{b}
            </div>
          ))}
        </Card>
      ))}
    </div>
  )
}

function ContactTab() {
  return (
    <div style={{ padding: '24px 20px 32px', display: 'flex', flexDirection: 'column', gap: 14 }}>
      {[
        { label: 'Email',    value: resume.email,        href: `mailto:${resume.email}`, icon: '✉️' },
        { label: 'LinkedIn', value: 'kusumlingaraju',    href: resume.linkedin,          icon: '💼' },
        { label: 'GitHub',   value: 'kusumlin',          href: resume.github,            icon: '🐙' },
        { label: 'Location', value: resume.location,     href: null,                     icon: '📍' },
      ].map(item => (
        <div key={item.label} style={{ background: 'white', borderRadius: 16, padding: '16px 18px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', gap: 14 }}>
          <span style={{ fontSize: 24 }}>{item.icon}</span>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#a898c8', marginBottom: 2 }}>{item.label}</p>
            {item.href
              ? <a href={item.href} target="_blank" rel="noopener noreferrer" style={{ fontSize: 14, color: '#7060a0', fontWeight: 500, textDecoration: 'none' }}>{item.value}</a>
              : <p style={{ fontSize: 14, color: '#3c3c43' }}>{item.value}</p>
            }
          </div>
        </div>
      ))}
    </div>
  )
}

function Card({ label, children }) {
  return (
    <div style={{ background: 'white', borderRadius: 16, padding: '16px 18px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
      <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#a898c8', marginBottom: 10 }}>{label}</p>
      {children}
    </div>
  )
}

/* ── Main ── */
export default function MobileView() {
  const [introDone, setIntroDone] = useState(false)
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
    <>
      {!introDone && <MobileIntro onDone={() => setIntroDone(true)} />}

      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(160deg, #f0ecf8 0%, #fdfaf4 60%, #ede8f8 100%)',
        fontFamily: "'Inter', sans-serif",
        overflowY: 'auto',
        WebkitOverflowScrolling: 'touch',
      }}>
        {/* Sticky header */}
        <div style={{
          position: 'sticky', top: 0, zIndex: 50,
          background: 'rgba(253,250,244,0.94)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(180,160,220,0.2)',
          padding: '12px 20px 0',
        }}>
          <p style={{ fontSize: 15, fontWeight: 700, color: '#1c1c1e', marginBottom: 10 }}>{resume.name}</p>
          <div style={{ display: 'flex', overflowX: 'auto', scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}>
            {TABS.map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)} style={{
                padding: '8px 14px', background: 'none', border: 'none', cursor: 'pointer',
                fontSize: 13, fontWeight: activeTab === tab ? 700 : 500,
                color: activeTab === tab ? '#7060a0' : '#8e8e93',
                borderBottom: activeTab === tab ? '2px solid #7060a0' : '2px solid transparent',
                whiteSpace: 'nowrap', flexShrink: 0,
              }}>
                {tab}
              </button>
            ))}
          </div>
        </div>

        {renderTab()}
      </div>
    </>
  )
}
