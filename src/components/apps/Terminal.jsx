import { useState, useEffect, useRef, useCallback } from 'react'
import { resume } from '../../data/resume'

const PROMPT = `${resume.name.split(' ')[0].toLowerCase()}@portfolio`

/* Each "command" produces a list of output lines */
const SEQUENCE = [
  {
    cmd: 'whoami',
    output: [
      `  ${resume.name}`,
      `  ${resume.title}`,
      `  ${resume.location}`,
      `  ✦ GPA 4.0 · USC Viterbi`,
    ],
  },
  {
    cmd: 'ls ~/interests/',
    output: [
      `\x1b[cat]  machine-learning/     generative-ai/     large-language-models/`,
      `\x1b[cat]  data-science/         data-analytics/    mlops/`,
      `\x1b[cat]  nlp/                  ai-for-healthcare/ statistical-modeling/`,
    ],
  },
  {
    cmd: 'skills --list-all',
    output: Object.entries(resume.skills).flatMap(([cat, items]) => [
      `\x1b[cat]  ◈ ${cat}`,
      ...items.map((item) => `      → ${item}`),
    ]),
  },
  {
    cmd: 'experience --summary',
    output: resume.experience.map(
      (e) => `  ${e.role} @ ${e.company}  (${e.period})`
    ),
  },
  {
    cmd: 'find / -name "collab-opportunity" 2>/dev/null',
    output: [
      `  searching...`,
      `  🔍 ./data-science/ml-projects`,
      `  🔍 ./research/applied-ai`,
      `  🔍 ./internships/summer-2026`,
      `  ✅ found 3 match(es) — reach out to claim!`,
    ],
  },
  {
    cmd: 'echo $AVAILABILITY',
    output: [
      `  \x1b[green]  ● open to internships, research & full-time roles ✦`,
    ],
  },
  {
    cmd: 'ping kusum --message "let\'s build something"',
    output: [
      `  PING kusumlin@usc.edu`,
      `  64 bytes from kusum: time=0.1ms  ♡`,
      `  response: "yes, let's talk!"`,
    ],
  },
]

/* Strip our fake ANSI colour marker */
function renderLine(line) {
  if (line.includes('\x1b[cat]') && line.includes('/')) {
    return <span className="text-sky-300">{line.replace(/\s*\x1b\[cat\]/, '')}</span>
  }
  if (line.includes('\x1b[cat]')) {
    return <span className="text-amber-300 font-semibold">{line.replace(/\s*\x1b\[cat\]/, '')}</span>
  }
  if (line.trim().startsWith('→')) {
    return <span className="text-violet-300">{line}</span>
  }
  if (line.includes('\x1b[green]')) {
    return <span className="text-emerald-400 font-semibold">{line.replace(/\s*\x1b\[green\]/, '')}</span>
  }
  if (line.trim().startsWith('Open to') || line.trim().startsWith('●')) {
    return <span className="text-emerald-400">{line}</span>
  }
  return <span className="text-gray-300">{line}</span>
}

function useTypewriter(text, start, speed = 38) {
  const [displayed, setDisplayed] = useState('')
  useEffect(() => {
    if (!start) return
    setDisplayed('')
    let i = 0
    const id = setInterval(() => {
      i++
      setDisplayed(text.slice(0, i))
      if (i >= text.length) clearInterval(id)
    }, speed)
    return () => clearInterval(id)
  }, [text, start])
  return displayed
}

function CommandBlock({ cmd, output, active, onDone }) {
  const typed = useTypewriter(cmd, active)
  const [showOutput, setShowOutput] = useState(false)

  useEffect(() => {
    if (typed === cmd) {
      const t = setTimeout(() => {
        setShowOutput(true)
        setTimeout(onDone, 300)
      }, 280)
      return () => clearTimeout(t)
    }
  }, [typed, cmd, onDone])

  return (
    <div className="mb-3">
      {/* prompt line */}
      <div className="flex items-center gap-2">
        <span className="text-violet-400 font-semibold">{PROMPT}</span>
        <span className="text-blue-400">~</span>
        <span className="text-gray-400">%</span>
        <span className="text-white ml-1">{typed}</span>
        {active && typed !== cmd && <span className="text-violet-400 animate-blink">▌</span>}
      </div>
      {/* output */}
      {showOutput && (
        <div className="mt-1 space-y-0.5">
          {output.map((line, i) => (
            <div key={i} className="text-[12px] font-mono leading-5 animate-fade-in">
              {renderLine(line)}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default function Terminal() {
  const [phase, setPhase] = useState(0)
  const bottomRef = useRef(null)

  const advance = useCallback(() => setPhase((p) => p + 1), [])

  useEffect(() => {
    const t = setTimeout(() => setPhase(1), 400)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [phase])

  return (
    <div
      className="h-full overflow-y-auto custom-scroll p-5 font-mono text-[12px] leading-relaxed"
      style={{ background: '#16132a' }}
    >
      {/* Welcome banner */}
      <div className="mb-4 text-[11px] text-gray-600">
        <p>Last login: {new Date().toDateString()} on ttys001</p>
      </div>

      {SEQUENCE.map((item, i) => {
        if (phase < i + 1) return null
        return (
          <CommandBlock
            key={item.cmd}
            cmd={item.cmd}
            output={item.output}
            active={phase === i + 1}
            done={phase > i + 1}
            onDone={advance}
          />
        )
      })}

      {/* Idle cursor after all done */}
      {phase > SEQUENCE.length && (
        <div className="flex items-center gap-2 mt-2">
          <span className="text-violet-400 font-semibold">{PROMPT}</span>
          <span className="text-blue-400">~</span>
          <span className="text-gray-400">%</span>
          <span className="text-violet-400 animate-blink ml-1">▌</span>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  )
}
