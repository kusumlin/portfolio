import { useRef, useEffect, useLayoutEffect } from 'react'

// Bypasses React state entirely — writes transform directly to DOM.
// Zero re-renders during drag = no layout reflow, true 60fps.
export function useDraggable(initialPos = { x: 120, y: 60 }) {
  const ref     = useRef(null)
  const dragging = useRef(false)
  const pos      = useRef(initialPos)
  const offset   = useRef({ x: 0, y: 0 })

  // Set initial position before first paint (no flash)
  useLayoutEffect(() => {
    if (ref.current) {
      ref.current.style.transform =
        `translate3d(${initialPos.x}px, ${initialPos.y}px, 0)`
    }
  }, [])

  const onMouseDown = (e) => {
    if (e.button !== 0) return
    dragging.current = true
    offset.current = {
      x: e.clientX - pos.current.x,
      y: e.clientY - pos.current.y,
    }
    document.body.classList.add('dragging')
    if (ref.current) ref.current.style.willChange = 'transform'
  }

  useEffect(() => {
    const onMove = (e) => {
      if (!dragging.current) return
      const el = ref.current
      const winW = el ? el.offsetWidth  : 300
      const winH = 44 // title bar height — enough to always grab it
      const maxX = window.innerWidth  - winW
      const maxY = window.innerHeight - winH
      const x = Math.min(Math.max(0, e.clientX - offset.current.x), maxX)
      const y = Math.min(Math.max(44, e.clientY - offset.current.y), maxY) // 44 = menu bar height
      pos.current = { x, y }
      if (el) {
        el.style.transform = `translate3d(${x}px, ${y}px, 0)`
      }
    }
    const onUp = () => {
      if (!dragging.current) return
      dragging.current = false
      document.body.classList.remove('dragging')
      if (ref.current) ref.current.style.willChange = 'auto'
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseup', onUp)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
  }, [])

  return { ref, onMouseDown }
}
