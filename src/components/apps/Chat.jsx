import React, { useState, useRef, useEffect } from 'react'
import { resume } from '../../data/resume'

function getResponse(message) {
  const m = message.toLowerCase().trim()

  if (/^(hi|hello|hey|sup|howdy)/.test(m)) {
    return `Hi there! I'm Kusum's portfolio assistant. Ask me about her projects, skills, experience, education, or how to get in touch!`
  }
  if (m.includes('project') || m.includes('built') || m.includes('work on') || m.includes('tiktok') || m.includes('icu') || m.includes('healthcare')) {
    return resume.projects
      .map((p) => `**${p.title}**\n${p.description}\nStack: ${p.tech.join(', ')}\nImpact: ${p.impact}`)
      .join('\n\n')
  }
  if (m.includes('skill') || m.includes('tech') || m.includes('know') || m.includes('language') || m.includes('tool') || m.includes('python') || m.includes('sql') || m.includes('ml')) {
    return Object.entries(resume.skills)
      .map(([cat, items]) => `**${cat}:** ${items.join(', ')}`)
      .join('\n')
  }
  if (m.includes('experience') || m.includes('work') || m.includes('job') || m.includes('intern') || m.includes('weir') || m.includes('compsoft')) {
    return resume.experience
      .map((e) => `**${e.role}** at ${e.company} (${e.period})\n${e.bullets[0]}`)
      .join('\n\n')
  }
  if (m.includes('education') || m.includes('school') || m.includes('degree') || m.includes('study') || m.includes('usc') || m.includes('gpa') || m.includes('university')) {
    return resume.education
      .map((e) => `**${e.degree}** — ${e.school}\n${e.period} · GPA: ${e.gpa}\nCoursework: ${e.coursework.join(', ')}`)
      .join('\n\n')
  }
  if (m.includes('contact') || m.includes('email') || m.includes('reach') || m.includes('phone') || m.includes('linkedin') || m.includes('github')) {
    return `📧 ${resume.email}\n📞 ${resume.phone}\n💼 ${resume.linkedin}\n🐙 ${resume.github}`
  }
  if (m.includes('achievement') || m.includes('award') || m.includes('hackathon') || m.includes('leadership') || m.includes('volunteer')) {
    return resume.achievements.map((a) => `• **${a.title}** — ${a.detail}`).join('\n')
  }
  if (m.includes('about') || m.includes('summary') || m.includes('who') || m.includes('tell me')) {
    return resume.summary
  }
  if (m.includes('location') || m.includes('where') || m.includes('based') || m.includes('live')) {
    return `Kusum is based in ${resume.location}.`
  }
  return "Not mentioned in resume. Try asking about her projects, skills, experience, education, or contact info!"
}

const SUGGESTIONS = [
  'Tell me about your projects',
  'What are your skills?',
  'Where did you work?',
  "What's your education?",
  'How can I contact you?',
]

function Bubble({ msg }) {
  const isUser = msg.role === 'user'
  const lines = msg.text.split('\n')

  return (
    <div className={`flex items-end gap-2 mb-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      {!isUser && (
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center text-base shrink-0 mb-0.5"
          style={{ background: '#E9E9EB', fontSize: '16px', lineHeight: 1 }}
        >
          🤖
        </div>
      )}
      <div
        className="max-w-[78%] px-3 py-2 text-[12px] leading-relaxed"
        style={
          isUser
            ? {
                background: '#34C759',
                color: 'white',
                borderRadius: '18px 18px 4px 18px',
              }
            : {
                background: '#E9E9EB',
                color: '#1a1a1a',
                borderRadius: '18px 18px 18px 4px',
              }
        }
      >
        {lines.map((line, i) => {
          const parts = line.split(/\*\*(.*?)\*\*/g)
          return (
            <p key={i} className={i > 0 ? 'mt-1' : ''}>
              {parts.map((part, j) =>
                j % 2 === 1 ? <strong key={j}>{part}</strong> : part
              )}
            </p>
          )
        })}
      </div>
    </div>
  )
}

function TypingIndicator() {
  return (
    <div className="flex items-end gap-2 mb-3">
      <div
        className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
        style={{ background: '#E9E9EB', fontSize: '16px', lineHeight: 1 }}
      >
        🤖
      </div>
      <div
        className="px-4 py-3 flex items-center gap-1"
        style={{ background: '#E9E9EB', borderRadius: '18px 18px 18px 4px' }}
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-1.5 h-1.5 rounded-full typing-dot"
            style={{ background: '#8E8E93', animationDelay: `${i * 0.18}s` }}
          />
        ))}
      </div>
    </div>
  )
}

export default function Chat() {
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      text: `Hi! I'm Kusum's portfolio assistant 👋\nAsk me anything about her background, projects, or skills.`,
    },
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(true)
  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  const send = (text) => {
    const trimmed = text.trim()
    if (!trimmed) return
    setShowSuggestions(false)
    setMessages((prev) => [...prev, { role: 'user', text: trimmed }])
    setInput('')
    setTyping(true)
    const delay = 800 + Math.random() * 600
    setTimeout(() => {
      const response = getResponse(trimmed)
      setTyping(false)
      setMessages((prev) => [...prev, { role: 'bot', text: response }])
    }, delay)
  }

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send(input)
    }
  }

  return (
    <div className="h-full flex flex-col" style={{ background: '#ffffff' }}>
      {/* iMessage header */}
      <div
        className="flex flex-col items-center gap-1 px-4 pt-4 pb-3 shrink-0"
        style={{
          background: '#f9f9f9',
          borderBottom: '1px solid #e5e5ea',
        }}
      >
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center"
          style={{ background: '#E9E9EB', fontSize: '28px', lineHeight: 1 }}
        >
          🤖
        </div>
        <p className="text-[14px] font-semibold text-gray-800 mt-0.5">Ask Me</p>
        <p className="text-[11px] text-gray-400">Portfolio Assistant · Always Active</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto custom-scroll px-4 py-4" style={{ background: '#ffffff' }}>
        {messages.map((msg, i) => (
          <Bubble key={i} msg={msg} />
        ))}
        {typing && <TypingIndicator />}
        <div ref={bottomRef} />
      </div>

      {/* Suggestion chips */}
      {showSuggestions && (
        <div className="px-4 pb-2 flex flex-wrap gap-1.5" style={{ background: '#ffffff' }}>
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => send(s)}
              className="px-3 py-1 rounded-full text-[11px] font-medium transition-colors"
              style={{
                border: '1.5px solid #007AFF',
                color: '#007AFF',
                background: 'white',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#f0f6ff' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'white' }}
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input bar */}
      <div
        className="flex items-center gap-2 px-3 py-3 shrink-0"
        style={{
          background: '#f9f9f9',
          borderTop: '1px solid #e5e5ea',
        }}
      >
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder="iMessage"
          className="flex-1 px-4 py-2 text-[13px] outline-none placeholder-gray-400 text-gray-800"
          style={{
            background: 'white',
            border: '1px solid #d1d1d6',
            borderRadius: '20px',
          }}
        />
        <button
          onClick={() => send(input)}
          disabled={!input.trim()}
          className="w-8 h-8 rounded-full flex items-center justify-center text-white transition-all active:scale-90 disabled:opacity-35"
          style={{ background: '#34C759', flexShrink: 0 }}
        >
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4" style={{ transform: 'rotate(90deg)' }}>
            <path d="M10 3l7 7H3l7-7z" />
          </svg>
        </button>
      </div>
    </div>
  )
}
