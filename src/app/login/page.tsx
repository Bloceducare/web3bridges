'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Eye, EyeOff, ArrowRight } from 'lucide-react'

const inputClass = "w-full bg-ink/[0.04] border border-ink/10 rounded-lg px-4 py-3 text-sm text-ink placeholder-ink/30 focus:outline-none focus:border-brand-red/50 transition-colors"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ email: '', password: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // TODO: Implement with NextAuth or Clerk
    // await signIn('credentials', { email: form.email, password: form.password, callbackUrl: '/dashboard' })
    await new Promise(r => setTimeout(r, 1000))
    setLoading(false)
  }

  return (
    <div className="pt-14 min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 justify-center mb-8">
          <img src="/logo-light.svg" alt="Web3Bridge" className="h-10 w-auto block dark:hidden" />
          <img src="/logo-dark.svg" alt="Web3Bridge" className="h-10 w-auto hidden dark:block" />
        </Link>

        <div className="card-dark p-7">
          <h1 className="text-xl font-bold text-ink mb-1">Welcome back</h1>
          <p className="text-sm text-ink/40 mb-6">Log in to your student portal</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-ink/40 mb-1.5">Email address</label>
              <input
                type="email"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                required
                placeholder="you@example.com"
                className={inputClass}
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-medium text-ink/40">Password</label>
                <Link href="/reset-password" className="text-[11px] text-brand-red hover:underline">Forgot password?</Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                  required
                  placeholder="••••••••"
                  className={`${inputClass} pr-10`}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-ink/30 hover:text-ink transition-colors">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2 py-3 mt-2 disabled:opacity-50"
            >
              {loading ? 'Logging in...' : (<>Log in <ArrowRight className="w-4 h-4" /></>)}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-ink/25 mt-5">
          Not enrolled yet?{' '}
          <Link href="/apply" className="text-brand-red hover:underline">Apply now</Link>
        </p>
      </div>
    </div>
  )
}
