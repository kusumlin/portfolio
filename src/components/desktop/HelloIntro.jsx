import { useState, useEffect } from 'react'

/**
 * Full-screen intro overlay inspired by khushipatel.vercel.app
 * "hi, i'm kusum." writes itself in cursive, then the whole
 * overlay slides upward and calls onDone() when gone.
 */
export default function HelloIntro({ onDone }) {
  const [sliding, setSliding] = useState(false)

  useEffect(() => {
    // Start sliding up after the write-on finishes (≈2.6s)
    const slideTimer = setTimeout(() => setSliding(true), 2600)
    // Tell Desktop we're done after the slide-up transition (0.7s)
    const doneTimer  = setTimeout(() => onDone?.(), 3350)
    return () => { clearTimeout(slideTimer); clearTimeout(doneTimer) }
  }, [onDone])

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(245, 240, 232, 0.88)',
        backdropFilter: 'blur(24px) saturate(140%)',
        WebkitBackdropFilter: 'blur(24px) saturate(140%)',
        transform: sliding ? 'translateY(-100%)' : 'translateY(0)',
        transition: sliding ? 'transform 0.72s cubic-bezier(0.76, 0, 0.24, 1)' : 'none',
        pointerEvents: sliding ? 'none' : 'auto',
      }}
    >
      {/* The write-on text */}
      <span
        style={{
          fontFamily: "'Playwrite BR', cursive",
          fontSize: 'clamp(32px, 9vw, 108px)',
          color: '#2d2318',
          letterSpacing: '-0.01em',
          whiteSpace: 'nowrap',
          clipPath: 'inset(0 102% 0 0)',
          opacity: 0,
          animation: 'helloWrite 1.6s linear forwards',
          animationDelay: '0.25s',
          /* Slight italic lean like handwriting */
          transform: 'skewX(-6deg)',
          display: 'inline-block',
        }}
      >
        Hello,
      </span>

      {/* Subtle sparkle decorations */}
      <span style={{
        position: 'absolute', top: '22%', left: '18%',
        fontSize: '1.6rem', opacity: 0.45,
        animation: 'floatA 3.5s ease-in-out infinite',
      }}>✨</span>
      <span style={{
        position: 'absolute', top: '30%', right: '16%',
        fontSize: '1.3rem', opacity: 0.35,
        animation: 'floatB 4s ease-in-out 0.8s infinite',
      }}>🌸</span>
      <span style={{
        position: 'absolute', bottom: '28%', left: '22%',
        fontSize: '1.2rem', opacity: 0.3,
        animation: 'floatC 4.5s ease-in-out 1.5s infinite',
      }}>💫</span>
      <span style={{
        position: 'absolute', bottom: '25%', right: '20%',
        fontSize: '1.4rem', opacity: 0.35,
        animation: 'floatA 3.8s ease-in-out 0.4s infinite',
      }}>🌿</span>
    </div>
  )
}
