'use client'

import { useEffect, useCallback } from 'react'
import { X } from 'lucide-react'

/**
 * StoryModal — fullscreen overlay for the Web3Bridge Journey film.
 * The film (4.2MB self-contained Three.js HTML) is ONLY loaded when the
 * modal opens, so it adds zero weight to the homepage's first load.
 * The opening click counts as user interaction, which unlocks audio
 * autoplay inside the iframe. On close the iframe unmounts completely,
 * which stops the film and its music; the browser caches the file so
 * reopening is near-instant.
 */
export function StoryModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose()
  }, [onClose])

  useEffect(() => {
    if (!open) return
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [open, handleKey])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[100] animate-modal-in"
      style={{ background: 'rgba(5,5,5,0.98)' }}
      role="dialog"
      aria-modal="true"
      aria-label="Web3Bridge Journey film"
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-[110] w-10 h-10 rounded-full bg-ink/10 hover:bg-brand-red border border-ink/15 flex items-center justify-center transition-colors"
        aria-label="Close film"
      >
        <X className="w-5 h-5 text-ink" />
      </button>

      <div className="absolute top-6 left-6 z-[110] font-mono text-[10px] tracking-[0.14em] text-ink/30 pointer-events-none">
        THE WEB3BRIDGE JOURNEY — PRESS ESC TO CLOSE
      </div>

      <iframe
        src="/story/web3bridge-journey.html"
        title="The Web3Bridge Journey"
        className="w-full h-full border-0"
        allow="autoplay; fullscreen"
      />
    </div>
  )
}
