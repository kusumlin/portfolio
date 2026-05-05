import { useState, useEffect } from 'react'

const STICKERS = [
  // Top row
  { src: '/icons/disney.png',     size: 80,  style: { top: '55%', left: '8%'   }, anim: 'float-b', delay: '0.5s' },
  { src: '/icons/macbook.png',    size: 78,  style: { top: '12%',  left: '14%'  }, anim: 'float-a', delay: '0s'   },
  { src: '/icons/bake.png',       size: 75,  style: { top: '9%',  left: '60%'  }, anim: 'float-c', delay: '0.9s' },
  { src: '/icons/lily.png',       size: 65,  style: { top: '13%', right: '15%'  }, anim: 'float-b', delay: '1.4s' },

  // Middle-top row (flanking above the circle)
  { src: null, size: 80, style: { top: '26%', left: '22%'  }, anim: 'float-a', delay: '0.6s' },
  { src: null, size: 76, style: { top: '24%', right: '22%' }, anim: 'float-c', delay: '1.0s' },

  // Left / right sides
  { src: '/icons/icedcoffee.png', size: 75,  style: { top: '35%', right: '5%'   }, anim: 'float-a', delay: '0.7s' },
  { src: '/icons/penguin.png',    size: 70,  style: { top: '32%', left: '5%'  }, anim: 'float-b', delay: '1.1s' },
  { src: '/icons/matcha.png',     size: 79,  style: { top: '35%', left: '28%'   }, anim: 'float-c', delay: '0.3s' },
  { src: '/icons/dog.png',        size: 90,  style: { top: '77%', right: '5%'  }, anim: 'float-a', delay: '0.6s' },

  // Middle-bottom row (flanking below the circle)
  { src: null, size: 78, style: { top: '65%', left: '24%'  }, anim: 'float-b', delay: '0.4s' },
  { src: null, size: 72, style: { top: '66%', right: '23%' }, anim: 'float-a', delay: '1.2s' },

  // Bottom row
  // { src: '/icons/work.png',       size: 100, style: { top: '57%', left: '7%'  }, anim: 'float-c', delay: '1.5s' },
  { src: '/icons/yoga.png',       size: 82,  style: { top: '63%', right: '27%' }, anim: 'float-b', delay: '0.8s' },

  // Small accent emojis
  { src: '/icons/disco.png',      size: 28,  style: { top: '85%', left: '18%'  }, anim: 'float-b', delay: '0.3s' },
  { src: '/icons/tree.png',       size: 28,  style: { top: '78%', left: '36%'  }, anim: 'float-a', delay: '1.1s' },
  { src: '/icons/heart.png',      size: 28,  style: { top: '58%', right: '12%' }, anim: 'float-c', delay: '0.7s' },
  { src: '/icons/mushroom.png',   size: 28,  style: { top: '62%', left: '23%'  }, anim: 'float-b', delay: '1.3s' },
  { src: '/icons/rocket.png',     size: 28,  style: { top: '40%', right: '28%' }, anim: 'float-a', delay: '0.5s' },
  { src: '/icons/star.png',     size: 28,  style: { top: '10%', left: '38%' }, anim: 'float-a', delay: '0.5s' }
]

const MIN_WIDTH  = 900
const MIN_HEIGHT = 600

export default function FloatingStickers() {
  const [visible, setVisible] = useState(
    window.innerWidth >= MIN_WIDTH && window.innerHeight >= MIN_HEIGHT
  )

  useEffect(() => {
    const check = () =>
      setVisible(window.innerWidth >= MIN_WIDTH && window.innerHeight >= MIN_HEIGHT)
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  if (!visible) return null

  return (
    <div className="absolute inset-0" style={{ zIndex: 2, pointerEvents: 'none' }}>
      {STICKERS.filter(s => s.src).map((s, i) => (
        <img
          key={i}
          src={s.src}
          alt=""
          className={`absolute ${s.anim} floating-sticker`}
          style={{
            ...s.style,
            width: s.size,
            height: s.size,
            objectFit: 'contain',
            animationDelay: s.delay,
            filter: 'drop-shadow(0 6px 16px rgba(0,0,0,0.13))',
          }}
        />
      ))}
    </div>
  )
}
