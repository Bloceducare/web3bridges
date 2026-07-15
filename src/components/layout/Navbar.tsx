'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { ThemeToggle } from '@/components/ThemeToggle'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { getTracks, getSprints } from '@/lib/programmes'
import { ChevronDown, Menu, X, User } from 'lucide-react'

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [programsOpen, setProgramsOpen] = useState(false)
  const pathname = usePathname()
  const dropdownRef = useRef<HTMLDivElement>(null)

  const tracks = getTracks()
  const sprints = getSprints()

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setProgramsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    setProgramsOpen(false)
    setMobileOpen(false)
  }, [pathname])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' },
    { label: 'Conference', href: 'https://event.web3bridge.com/', external: true },
    { label: 'ETH Hub', href: '/eth-hub' },
    { label: 'Alumni', href: 'https://alumni.web3bridgeafrica.com/', external: true },
  ]

  const levelColors: Record<string, string> = {
    Beginner: 'text-green-600 dark:text-green-400 bg-green-500/10 dark:bg-green-400/10 border-green-500/20 dark:border-green-400/20',
    Intermediate: 'text-blue-600 dark:text-blue-400 bg-blue-500/10 dark:bg-blue-400/10 border-blue-500/20 dark:border-blue-400/20',
    Advanced: 'text-amber-600 dark:text-amber-400 bg-amber-500/10 dark:bg-amber-400/10 border-amber-500/20 dark:border-amber-400/20',
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-page/95 backdrop-blur-sm border-b border-ink/5">
        <div className="container-wide">
          <nav className="flex items-center justify-between h-14">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 flex-shrink-0">
              <img src="/logo-light.svg" alt="Web3Bridge" className="h-8 w-auto block dark:hidden" />
              <img src="/logo-dark.svg" alt="Web3Bridge" className="h-8 w-auto hidden dark:block" />
            </Link>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-1">
              <Link href="/" className={cn('nav-link text-xs px-3 py-2 rounded-md transition-colors', pathname === '/' ? 'text-ink' : 'text-ink/50 hover:text-ink hover:bg-ink/5')}>
                Home
              </Link>

              {/* Programs dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setProgramsOpen(!programsOpen)}
                  className={cn('flex items-center gap-1.5 text-xs px-3 py-2 rounded-md transition-colors', programsOpen || pathname.startsWith('/programs') ? 'text-ink bg-ink/5' : 'text-ink/50 hover:text-ink hover:bg-ink/5')}
                >
                  Programs
                  <ChevronDown className={cn('w-3 h-3 transition-transform duration-200', programsOpen && 'rotate-180')} />
                </button>

                {programsOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[560px] bg-card border border-ink/10 rounded-xl shadow-2xl overflow-hidden">
                    <div className="flex gap-0">

                      {/* Tracks */}
                      <div className="flex-1 p-4 border-r border-ink/5">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-brand-red" />
                          <span className="text-[10px] font-semibold text-ink/40 uppercase tracking-widest">Tracks — 12 to 16 weeks</span>
                        </div>
                        <div className="space-y-0.5">
                          {tracks.map(track => (
                            <Link key={track.slug} href={`/programs/${track.slug}`} className="flex items-start gap-3 p-2 rounded-lg hover:bg-ink/5 transition-colors group">
                              <div className="w-6 h-6 rounded-md mt-0.5 flex-shrink-0" style={{ background: `${track.color}20` }} />
                              <div className="min-w-0">
                                <div className="flex items-center gap-1.5">
                                  <span className="text-xs font-medium text-ink group-hover:text-brand-red transition-colors">{track.name}</span>
                                  {track.slug === 'web3-engineering' && (
                                    <span className="text-[9px] font-semibold bg-brand-red/15 text-brand-red px-1.5 py-0.5 rounded-full">Flagship</span>
                                  )}
                                </div>
                                <span className="text-[10px] text-ink/30">{track.duration} · {track.level}</span>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>

                      {/* Sprints */}
                      <div className="w-52 p-4 flex flex-col">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                          <span className="text-[10px] font-semibold text-ink/40 uppercase tracking-widest">Sprints — 3–6 weeks</span>
                        </div>
                        <div className="space-y-0.5 flex-1">
                          {sprints.map(sprint => (
                            <Link key={sprint.slug} href={`/programs/${sprint.slug}`} className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-ink/5 transition-colors group">
                              <div className="w-5 h-5 rounded mt-0.5 flex-shrink-0" style={{ background: `${sprint.color}20` }} />
                              <div>
                                <div className="text-xs font-medium text-ink group-hover:text-brand-red transition-colors">{sprint.name}</div>
                                <div className="text-[10px] text-ink/30">{sprint.duration}</div>
                              </div>
                            </Link>
                          ))}
                        </div>
                        <div className="mt-3 pt-3 border-t border-ink/5 space-y-1.5">
                          <Link href="/apply" className="block w-full text-center bg-brand-red text-white text-[11px] font-medium py-2 rounded-md hover:bg-red-600 transition-colors">
                            Apply now
                          </Link>
                          <Link href="/programs" className="block w-full text-center bg-ink/5 text-ink/60 text-[11px] py-2 rounded-md hover:bg-ink/10 transition-colors">
                            View all
                          </Link>
                        </div>
                      </div>

                    </div>
                  </div>
                )}
              </div>

              {navLinks.slice(1).map(link => (
                (link as any).external ? (
                  <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className="text-xs px-3 py-2 rounded-md transition-colors text-ink/50 hover:text-ink hover:bg-ink/5">
                    {link.label}
                  </a>
                ) : (
                  <Link key={link.href} href={link.href} className={cn('text-xs px-3 py-2 rounded-md transition-colors', pathname === link.href ? 'text-ink' : 'text-ink/50 hover:text-ink hover:bg-ink/5')}>
                    {link.label}
                  </Link>
                )
              ))}
            </div>

            {/* Right CTAs */}
            <div className="hidden lg:flex items-center gap-2">
              <ThemeToggle />
              <Link href="/login" className="flex items-center gap-1.5 text-xs text-ink/50 border border-ink/10 px-3 py-2 rounded-md hover:text-ink hover:border-ink/30 transition-colors">
                <User className="w-3.5 h-3.5" />
                Log in
              </Link>
              <Link href="/apply" className="btn-primary text-xs py-2">
                Apply now
              </Link>
            </div>

            {/* Mobile menu button */}
            <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 text-ink/50 hover:text-ink transition-colors">
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden fixed top-14 left-0 right-0 bottom-0 bg-card border-t border-ink/5 overflow-y-auto animate-modal-in z-40">
          <div className="container-wide py-6 px-4 space-y-5 pb-24">
            <div className="space-y-1">
              {[{ label: 'Home', href: '/' }, ...navLinks.slice(1)].map(link => (
                <Link key={link.href} href={link.href} className="block px-3 py-2.5 text-sm font-medium text-ink/70 hover:text-ink hover:bg-ink/5 rounded-lg transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="pt-3 border-t border-ink/5 space-y-1">
              <p className="px-3 pt-1 text-[10px] font-semibold text-ink/30 uppercase tracking-widest">Tracks</p>
              {tracks.map(t => (
                <Link key={t.slug} href={`/programs/${t.slug}`} className="block px-3 py-2 text-sm text-ink/60 hover:text-ink hover:bg-ink/5 rounded-lg transition-colors">
                  {t.name}
                </Link>
              ))}
              <p className="px-3 pt-3 text-[10px] font-semibold text-ink/30 uppercase tracking-widest">Sprints</p>
              {sprints.map(s => (
                <Link key={s.slug} href={`/programs/${s.slug}`} className="block px-3 py-2 text-sm text-ink/60 hover:text-ink hover:bg-ink/5 rounded-lg transition-colors">
                  {s.name}
                </Link>
              ))}
            </div>
            <div className="pt-4 border-t border-ink/5 flex flex-col gap-3">
              <div className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-ink/[0.02] border border-ink/5">
                <span className="text-xs font-medium text-ink/40">Switch mode</span>
                <ThemeToggle />
              </div>
              <Link href="/login" className="flex items-center justify-center gap-2 text-sm text-ink/60 border border-ink/10 py-2.5 rounded-md hover:text-ink transition-colors">
                <User className="w-4 h-4" /> Log in
              </Link>
              <Link href="/apply" className="btn-primary text-center">Apply now</Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
