import React from 'react'

const STICKERS = [
  // Top row
  { src: '/icons/disney.png',     size: 110,  style: { top: '11%', left: '12%'   }, anim: 'float-b', delay: '0.5s' },
  { src: '/icons/macbook.png',    size: 86,  style: { top: '9%',  left: '34%'  }, anim: 'float-a', delay: '0s'   },
  { src: '/icons/bake.png',       size: 100,  style: { top: '9%',  left: '60%'  }, anim: 'float-c', delay: '0.9s' },
  { src: '/icons/lily.png',       size: 88,  style: { top: '13%', right: '7%'  }, anim: 'float-b', delay: '1.4s' },

  // Middle-top row (flanking above the circle)
  { src: null, size: 80, style: { top: '26%', left: '22%'  }, anim: 'float-a', delay: '0.6s' },
  { src: null, size: 76, style: { top: '24%', right: '22%' }, anim: 'float-c', delay: '1.0s' },

  // Left / right sides
  { src: '/icons/icedcoffee.png', size: 75,  style: { top: '35%', right: '15%'   }, anim: 'float-a', delay: '0.7s' },
  { src: '/icons/penguin.png',    size: 88,  style: { top: '32%', left: '3%'  }, anim: 'float-b', delay: '1.1s' },
  { src: '/icons/matcha.png',     size: 79,  style: { top: '55%', left: '7%'   }, anim: 'float-c', delay: '0.3s' },
  { src: '/icons/dog.png',        size: 98,  style: { top: '57%', right: '5%'  }, anim: 'float-a', delay: '0.6s' },

  // Middle-bottom row (flanking below the circle)
  { src: null, size: 78, style: { top: '65%', left: '24%'  }, anim: 'float-b', delay: '0.4s' },
  { src: null, size: 72, style: { top: '66%', right: '23%' }, anim: 'float-a', delay: '1.2s' },

  // Bottom row
  { src: '/icons/work.png',       size: 140, style: { top: '37%', left: '23%'  }, anim: 'float-c', delay: '1.5s' },
  { src: '/icons/yoga.png',       size: 86,  style: { top: '53%', right: '27%' }, anim: 'float-b', delay: '0.8s' },
]

export default function FloatingStickers() {
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
