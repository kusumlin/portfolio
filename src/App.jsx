import { useState, useEffect } from 'react'
import Desktop    from './components/desktop/Desktop'
import MobileView from './components/mobile/MobileView'

export default function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return isMobile ? <MobileView /> : <Desktop />
}
