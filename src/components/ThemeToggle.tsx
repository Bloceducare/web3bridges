'use client'

import { useState, useEffect } from 'react'
import { Sun, Moon } from 'lucide-react'

/**
 * ThemeToggle — cycles light/dark. Persists choice to localStorage;
 * before any choice is made, the site follows the visitor's system
 * preference (handled by the inline script in layout.tsx).
 */
export function ThemeToggle() {
  const [dark, setDark] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setDark(document.documentElement.classList.contains('dark'))
  }, [])

  const toggle = () => {
    const next = !dark
    setDark(next)
    document.documentElement.classList.toggle('dark', next)
    localStorage.setItem('wb-theme', next ? 'dark' : 'light')
  }

  // Render a stable placeholder until mounted to avoid hydration mismatch
  if (!mounted) return <div className="w-8 h-8" />

  return (
    <button
      onClick={toggle}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="w-8 h-8 rounded-md border border-ink/10 hover:border-ink/30 flex items-center justify-center transition-colors"
    >
      {dark ? <Sun className="w-4 h-4 text-ink/60" /> : <Moon className="w-4 h-4 text-ink/60" />}
    </button>
  )
}
