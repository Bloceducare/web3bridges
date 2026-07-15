'use client'
import { useState } from 'react'
import Link from 'next/link'
export default function ResetPasswordPage() {
  const [sent, setSent] = useState(false)
  const [email, setEmail] = useState('')
  return (
    <div className="pt-14 min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <Link href="/" className="flex items-center gap-2 justify-center mb-8">
          <img src="/logo-light.svg" alt="Web3Bridge" className="h-10 w-auto block dark:hidden" />
          <img src="/logo-dark.svg" alt="Web3Bridge" className="h-10 w-auto hidden dark:block" />
        </Link>
        <div className="card-dark p-7">
          <h1 className="text-xl font-bold text-ink mb-1">Reset password</h1>
          <p className="text-sm text-ink/40 mb-6">Enter your email and we&apos;ll send a reset link.</p>
          {sent ? (
            <div className="text-center py-4">
              <p className="text-sm text-ink/60 mb-4">Check your inbox at <strong className="text-ink">{email}</strong> for a reset link.</p>
              <Link href="/login" className="text-brand-red text-sm hover:underline">Back to login</Link>
            </div>
          ) : (
            <form onSubmit={e=>{e.preventDefault();setSent(true)}} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-ink/40 mb-1.5">Email address</label>
                <input type="email" value={email} onChange={e=>setEmail(e.target.value)} required placeholder="you@example.com" className="w-full bg-ink/[0.04] border border-ink/10 rounded-lg px-4 py-3 text-sm text-ink placeholder-ink/30 focus:outline-none focus:border-brand-red/50 transition-colors"/>
              </div>
              <button type="submit" className="btn-primary w-full">Send reset link</button>
              <Link href="/login" className="block text-center text-xs text-ink/30 hover:text-ink transition-colors">Back to login</Link>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
