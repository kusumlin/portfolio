import React, { useState, useEffect } from 'react'
import { resume } from '../../data/resume'

export default function MenuBar({ onOpen }) {
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const timeStr = now.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })
  const dateStr = now.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  })

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[200] flex items-center justify-between select-none"
      style={{
        height: 44,
        paddingLeft: 20,
        paddingRight: 20,
        background: 'rgba(255, 255, 255, 0.82)',
        backdropFilter: 'blur(20px) saturate(160%)',
        WebkitBackdropFilter: 'blur(20px) saturate(160%)',
        borderBottom: '1px solid rgba(0,0,0,0.07)',
      }}
    >
      {/* ── Left: avatar + name + nav ── */}
      <div className="flex items-center gap-5">
        {/* Avatar */}
        <div className="w-7 h-7 rounded-full overflow-hidden shrink-0" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.15)' }}>
          <img src="/icons/mypicture.png" alt="Kusum" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>

        <span className="text-[14px] font-bold text-gray-800">
          {resume.name}
        </span>

        {/* Nav links */}
        <nav className="flex items-center gap-4">
          <button
            onClick={() => onOpen?.('files')}
            className="text-[13px] text-gray-500 hover:text-gray-800 transition-colors font-medium"
          >
            Resume
          </button>
          <button
            onClick={() => onOpen?.('contacts')}
            className="text-[13px] text-gray-500 hover:text-gray-800 transition-colors font-medium"
          >
            Contact
          </button>
          <a
            href={resume.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13px] text-gray-500 hover:text-gray-800 transition-colors font-medium"
          >
            GitHub
          </a>
          <a
            href={resume.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13px] text-gray-500 hover:text-gray-800 transition-colors font-medium"
          >
            LinkedIn
          </a>
        </nav>
      </div>

      {/* ── Right: degree + datetime ── */}
      <div className="flex items-center gap-4">
        <a
          href="https://viterbigradadmission.usc.edu/programs/masters/msprograms/data-science/ms-applied-data-science/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[12px] text-gray-400 font-medium hover:text-gray-600 transition-colors"
        >
          MS Applied Data Science · USC
        </a>
        <span className="text-[13px] text-gray-600 font-medium tabular-nums">
          {dateStr}&nbsp; {timeStr}
        </span>
      </div>
    </div>
  )
}
