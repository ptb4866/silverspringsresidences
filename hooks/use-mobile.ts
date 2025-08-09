'use client'

import { useState, useEffect } from 'react'

const MOBILE_BREAKPOINT = 768

export const useMobileNav = () => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined)

  const toggleMobileNav = () => {
    setIsMobileNavOpen(!isMobileNavOpen)
  }

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)

    const handleResize = () => {
      if (window.innerWidth >= 1024 && isMobileNavOpen) {
        setIsMobileNavOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    
    if (isMobileNavOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      mql.removeEventListener("change", onChange)
      window.removeEventListener('resize', handleResize)
      document.body.style.overflow = ''
    }
  }, [isMobileNavOpen])

  return { isMobileNavOpen, toggleMobileNav, isMobile }
}
