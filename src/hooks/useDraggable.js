import { useState, useRef, useEffect } from 'react'

/**
 * Makes a component draggable via mouse events.
 * Attach `onMouseDown` to the drag handle element.
 * `pos` gives the current {x, y} position.
 */
export function useDraggable(initialPos = { x: 120, y: 60 }) {
  const [pos, setPos] = useState(initialPos)
  const dragging = useRef(false)
  const offset = useRef({ x: 0, y: 0 })

  const onMouseDown = (e) => {
    if (e.button !== 0) return
    dragging.current = true
    offset.current = { x: e.clientX - pos.x, y: e.clientY - pos.y }
    document.body.classList.add('dragging')
  }

  useEffect(() => {
    const onMove = (e) => {
      if (!dragging.current) return
      const x = Math.max(0, e.clientX - offset.current.x)
      const y = Math.max(0, e.clientY - offset.current.y)
      setPos({ x, y })
    }
    const onUp = () => {
      if (dragging.current) {
        dragging.current = false
        document.body.classList.remove('dragging')
      }
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
  }, [])

  return { pos, onMouseDown }
}
