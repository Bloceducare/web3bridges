'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { isAdminPassword } from '@/lib/storage'
import { Lock, Image, LayoutGrid, Users, BookOpen, Library, ArrowLeft } from 'lucide-react'

const adminLinks = [
  { href: '/admin/media', label: 'Media library', icon: Library, desc: 'All uploaded photos' },
  { href: '/admin/hero-photos', label: 'Hero mosaic', icon: LayoutGrid, desc: 'Homepage hero (9 cells)' },
  { href: '/admin/about-photo', label: 'About photo', icon: Image, desc: 'About section strip' },
  { href: '/admin/community-photos', label: 'Community grid', icon: Users, desc: '6 community photos' },
  { href: '/admin/programme-photos', label: 'Programme thumbnails', icon: BookOpen, desc: '1 photo per track/sprint' },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [authed, setAuthed] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const pathname = usePathname()

  useEffect(() => {
    const stored = sessionStorage.getItem('wb-admin-auth')
    if (stored === 'true') setAuthed(true)
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (isAdminPassword(password)) {
      sessionStorage.setItem('wb-admin-auth', 'true')
      setAuthed(true)
      setError('')
    } else {
      setError('Incorrect password')
    }
  }

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-page px-4">
        <div className="w-full max-w-sm">
          <div className="flex items-center justify-center gap-2 mb-8">
            <img src="/logo-light.svg" alt="Web3Bridge" className="h-10 w-auto block dark:hidden" />
            <img src="/logo-dark.svg" alt="Web3Bridge" className="h-10 w-auto hidden dark:block" />
            <span className="font-semibold text-ink">Admin</span>
          </div>
          <div className="bg-ink/[0.02] border border-ink/8 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Lock className="w-4 h-4 text-ink/40" />
              <h1 className="text-base font-semibold text-ink">Admin access</h1>
            </div>
            <form onSubmit={handleLogin} className="space-y-3">
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Admin password"
                className="w-full bg-ink/[0.04] border border-ink/10 rounded-lg px-4 py-3 text-sm text-ink placeholder-ink/30 focus:outline-none focus:border-brand-red/50"
                autoFocus
              />
              {error && <p className="text-xs text-red-400">{error}</p>}
              <button type="submit" className="btn-primary w-full py-2.5">Access admin</button>
            </form>
          </div>
          <div className="text-center mt-4">
            <Link href="/" className="text-xs text-ink/25 hover:text-ink transition-colors flex items-center justify-center gap-1">
              <ArrowLeft className="w-3 h-3" /> Back to site
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-page pt-0">
      {/* Admin nav */}
      <div className="bg-page border-b border-ink/5 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <img src="/logo-light.svg" alt="Web3Bridge" className="h-6 w-auto block dark:hidden" />
            <img src="/logo-dark.svg" alt="Web3Bridge" className="h-6 w-auto hidden dark:block" />
            <span className="text-xs font-medium text-ink/50">Admin</span>
          </div>
          <div className="flex items-center gap-1">
            {adminLinks.map(link => (
              <Link key={link.href} href={link.href}
                className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-md transition-colors ${
                  pathname === link.href ? 'text-ink bg-ink/5' : 'text-ink/40 hover:text-ink hover:bg-ink/5'
                }`}>
                <link.icon className="w-3.5 h-3.5" />
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/" className="text-xs text-ink/30 hover:text-ink transition-colors flex items-center gap-1">
            <ArrowLeft className="w-3 h-3" /> View site
          </Link>
          <button
            onClick={() => { sessionStorage.removeItem('wb-admin-auth'); setAuthed(false) }}
            className="text-xs text-ink/20 hover:text-ink/50 transition-colors"
          >
            Log out
          </button>
        </div>
      </div>

      <div className="container-wide py-8">{children}</div>
    </div>
  )
}
