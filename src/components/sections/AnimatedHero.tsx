'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { getTracks, getSprints } from '@/lib/programmes'
import { StoryModal } from '@/components/StoryModal'
import { cn } from '@/lib/utils'

const HOLD_MS = 5000
const WELCOME_MS = 1800
const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ#@$%&*<>/[]{}=+'

const levelColors: Record<string, string> = {
  Beginner: '#4ADE80',
  Intermediate: '#60A5FA',
  Advanced: '#FBBF24',
}

const ROTATING_WORDS = [
  'Solidity engineers',
  'Rust developers',
  'ZK researchers',
  'frontend builders',
  'backend engineers',
  'product thinkers',
]

// ── Hooks ─────────────────────────────────────────────────────────────────────

function useCountUp(target: number, duration: number, start: boolean) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!start) return
    let raf: number
    const t0 = performance.now()
    const tick = (now: number) => {
      const t = Math.min((now - t0) / duration, 1)
      setValue(Math.round(target * (1 - Math.pow(1 - t, 3))))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [start, target, duration])
  return value
}

// Arkiv-style text scramble: characters shuffle then settle left to right
function useScramble(text: string, durationMs = 700) {
  const [display, setDisplay] = useState(text)
  useEffect(() => {
    const frames = Math.round(durationMs / 30)
    let frame = 0
    const iv = setInterval(() => {
      frame++
      const settled = Math.floor((frame / frames) * text.length)
      let out = ''
      for (let i = 0; i < text.length; i++) {
        if (i < settled) out += text[i]
        else if (text[i] === ' ') out += ' '
        else out += SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
      }
      setDisplay(out)
      if (frame >= frames) {
        setDisplay(text)
        clearInterval(iv)
      }
    }, 30)
    return () => clearInterval(iv)
  }, [text, durationMs])
  return display
}

// Typewriter for the welcome line
function useTypewriter(text: string, startDelay: number) {
  const [display, setDisplay] = useState('')
  useEffect(() => {
    let i = 0
    let timeout: ReturnType<typeof setTimeout>
    const typeNext = () => {
      if (i <= text.length) {
        setDisplay(text.slice(0, i))
        i++
        timeout = setTimeout(typeNext, 20 + Math.random() * 20)
      }
    }
    const starter = setTimeout(typeNext, startDelay)
    return () => { clearTimeout(starter); clearTimeout(timeout) }
  }, [text, startDelay])
  return display
}

// ── Component ─────────────────────────────────────────────────────────────────

export function AnimatedHero() {
  const [welcomeDone, setWelcomeDone] = useState(false)
  const [storyOpen, setStoryOpen] = useState(false)
  const [revealed, setRevealed] = useState(false)
  const [activeIdx, setActiveIdx] = useState(0)
  const [wordIdx, setWordIdx] = useState(0)
  const [progress, setProgress] = useState(0)
  const progStartRef = useRef<number>(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const programmes = [...getTracks(), ...getSprints()]
  const typed = useTypewriter('welcome to web3bridge_', 200)

  // Welcome → reveal sequence
  useEffect(() => {
    const t1 = setTimeout(() => setWelcomeDone(true), WELCOME_MS - 800)
    const t2 = setTimeout(() => setRevealed(true), WELCOME_MS)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  // Counters
  const devs = useCountUp(3000, 1000, revealed)
  const conf = useCountUp(5, 800, revealed)
  const countries = useCountUp(20, 900, revealed)

  // Rotating words
  useEffect(() => {
    if (!revealed) return
    const iv = setInterval(() => setWordIdx(i => (i + 1) % ROTATING_WORDS.length), 4500)
    return () => clearInterval(iv)
  }, [revealed])
  const rotWord = useScramble(ROTATING_WORDS[wordIdx], 400)

  // Showcase auto-advance (5s)
  const startCycle = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    progStartRef.current = performance.now()
    timerRef.current = setInterval(() => {
      setActiveIdx(i => (i + 1) % programmes.length)
      progStartRef.current = performance.now()
    }, HOLD_MS)
  }, [programmes.length])

  useEffect(() => {
    if (!revealed) return
    startCycle()
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [revealed, startCycle])

  // Progress bar
  useEffect(() => {
    if (!revealed) return
    let raf: number
    const tick = (now: number) => {
      setProgress(Math.min((now - progStartRef.current) / HOLD_MS, 1))
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [revealed])

  const jumpTo = (i: number) => {
    setActiveIdx(i)
    startCycle()
  }

  const active = programmes[activeIdx]
  const activeName = useScramble(active.name, 350)

  return (
    <section className="relative bg-page min-h-screen flex items-center pt-14 overflow-hidden">
      <div className="absolute inset-0 grid-bg pointer-events-none animate-grid-pulse" />

      {/* Welcome — terminal typewriter */}
      <div className={`absolute inset-0 z-30 bg-page flex items-center justify-center flex-col gap-4 transition-all duration-700 ${welcomeDone ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <div className="animate-mark-pop mb-2">
          <img src="/logo-light.svg" alt="Web3Bridge" className="h-12 w-auto block dark:hidden" />
          <img src="/logo-dark.svg" alt="Web3Bridge" className="h-12 w-auto hidden dark:block" />
        </div>
        <div className="font-mono text-sm text-ink/50 min-h-[20px]">
          {typed}<span className="inline-block w-2 h-3.5 bg-brand-red ml-0.5 animate-cursor-blink align-text-bottom" />
        </div>
      </div>

      <div className="container-wide w-full py-12 lg:py-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">

          {/* Left */}
          <div className={`transition-all duration-700 ${revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="font-mono text-xs sm:text-sm tracking-[0.14em] text-brand-red mb-5">WEB3BRIDGE — EST. 2019</div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.06] tracking-tight mb-5">
              Africa's engineers<br />are building the{' '}
              <span className="text-brand-red">next internet.</span>
            </h1>

            {/* Rotating words */}
            <div className="font-mono text-base sm:text-lg flex items-center gap-3 mb-6">
              <span className="text-ink/35">we train</span>
              <span className="text-brand-red font-semibold min-w-[220px]">{revealed ? rotWord : ROTATING_WORDS[0]}</span>
            </div>

            <p className="text-base sm:text-lg text-ink/45 leading-relaxed mb-7 max-w-lg">
              Africa's most rigorous hands-on blockchain bootcamp. 16 weeks. Real projects shipped to mainnet. Global careers.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mb-7">
              <Link href="/apply" className="btn-primary text-center hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand-red/30 transition-all">Apply for next cohort</Link>
              <button onClick={() => setStoryOpen(true)} className="btn-ghost text-center font-mono text-sm flex items-center justify-center">Watch our story</button>
            </div>
            <div className="flex gap-0 bg-ink/[0.03] border border-ink/5 rounded-xl overflow-hidden w-fit">
              <div className="px-5 py-4 border-r border-ink/5">
                <div className="text-2xl sm:text-3xl font-bold text-ink leading-none mb-1.5 tabular-nums">{devs.toLocaleString()}<span className="text-brand-red">+</span></div>
                <div className="text-xs text-ink/35">Developers trained</div>
              </div>
              <div className="px-5 py-4 border-r border-ink/5">
                <div className="text-2xl sm:text-3xl font-bold text-ink leading-none mb-1.5 tabular-nums">{conf}<span className="text-brand-red">th</span></div>
                <div className="text-xs text-ink/35">Annual conference</div>
              </div>
              <div className="px-5 py-4">
                <div className="text-2xl sm:text-3xl font-bold text-ink leading-none mb-1.5 tabular-nums">{countries}<span className="text-brand-red">+</span></div>
                <div className="text-xs text-ink/35">Countries</div>
              </div>
            </div>
          </div>

          {/* Right — showcase */}
          <div className={`transition-all duration-700 delay-200 ${revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="flex items-center gap-3 mb-3.5 font-mono">
              <span className="text-[11px] tracking-[0.12em] text-brand-red whitespace-nowrap">
                {active.type === 'sprint' ? 'SPRINTS — 3 TO 6 WEEKS' : 'TRACKS — 12 TO 16 WEEKS'}
              </span>
              <div className="flex-1 h-px bg-ink/10 relative overflow-hidden">
                <div className="absolute inset-y-0 left-0 bg-brand-red" style={{ width: `${progress * 100}%` }} />
              </div>
              <span className="text-[11px] text-ink/35 tabular-nums">{String(activeIdx + 1).padStart(2, '0')} / {programmes.length}</span>
            </div>

            <div className="relative h-[380px]">
              {programmes.map((p, i) => {
                const lvlC = p.slug === 'web3-engineering' ? '#E63946' : levelColors[p.level] || '#60A5FA'
                return (
                  <Link
                    key={p.slug}
                    href={`/programs/${p.slug}`}
                    className={`absolute inset-0 bg-card/90 border border-ink/10 rounded-2xl p-6 flex flex-col transition-all duration-700 ${
                      i === activeIdx ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'
                    }`}
                  >
                    <div className="font-mono text-[11px] tracking-[0.12em] px-3 py-1.5 rounded w-fit mb-4"
                      style={{ background: `${p.color}1c`, color: p.color, border: `0.5px solid ${p.color}40` }}>
                      {p.slug === 'web3-engineering' ? 'FLAGSHIP TRACK' : p.type === 'sprint' ? 'SPRINT' : 'TRACK'}
                    </div>
                    <h3 className="font-mono text-2xl sm:text-3xl font-bold tracking-tight mb-3 min-h-[40px]">
                      {i === activeIdx ? activeName : p.name}
                    </h3>
                    <p className="text-base text-ink/50 leading-relaxed flex-1">{p.tagline}</p>
                    <div className="flex gap-2 mt-4">
                      <span className="text-xs font-medium px-3 py-1.5 rounded" style={{ background: `${p.color}1c`, color: p.color, border: `0.5px solid ${p.color}38` }}>{p.duration}</span>
                      <span className={cn(
                        "text-xs font-medium px-3 py-1.5 rounded border",
                        p.slug === 'web3-engineering'
                          ? "text-brand-red bg-brand-red/10 border-brand-red/20"
                          : p.level === 'Beginner'
                          ? "text-green-600 dark:text-green-400 bg-green-500/10 dark:bg-green-400/10 border-green-500/20 dark:border-green-400/20"
                          : p.level === 'Intermediate'
                          ? "text-blue-600 dark:text-blue-400 bg-blue-500/10 dark:bg-blue-400/10 border-blue-500/20 dark:border-blue-400/20"
                          : "text-amber-600 dark:text-amber-400 bg-amber-500/10 dark:bg-amber-400/10 border-amber-500/20 dark:border-amber-400/20"
                      )}>
                        {p.slug === 'web3-engineering' ? 'Flagship' : p.level}
                      </span>
                    </div>
                    <div className="h-0.5 mt-4 rounded-full origin-left animate-line-grow" style={{ background: p.color, opacity: 0.7, animationDuration: `${HOLD_MS}ms` }} />
                  </Link>
                )
              })}
            </div>

            <div className="flex gap-1 mt-3.5">
              {programmes.map((_, i) => (
                <button key={i} onClick={() => jumpTo(i)}
                  className={`h-0.5 transition-all ${i === activeIdx ? 'w-5 bg-brand-red' : 'w-4 bg-ink/10 hover:bg-ink/25'}`} />
              ))}
            </div>
          </div>

        </div>
      </div>

      <StoryModal open={storyOpen} onClose={() => setStoryOpen(false)} />
    </section>
  )
}
