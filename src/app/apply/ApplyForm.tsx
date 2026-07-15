'use client'
import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { programmes } from '@/lib/programmes'
import { CheckCircle, ArrowRight } from 'lucide-react'

const ic = "w-full bg-ink/[0.04] border border-ink/10 rounded-lg px-4 py-3 text-sm text-ink placeholder-ink/30 focus:outline-none focus:border-brand-red/50 transition-colors"
const lc = "block text-xs font-medium text-ink/40 mb-1.5"

export default function ApplyForm() {
  const searchParams = useSearchParams()
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ firstName:'', lastName:'', email:'', phone:'', programme: searchParams.get('programme') || '', experience:'', motivation:'', country:'', howDidYouHear:'' })
  const handle = (e: React.ChangeEvent<HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement>) => setForm(f=>({...f,[e.target.name]:e.target.value}))
  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true)
    await new Promise(r=>setTimeout(r,1200))
    setSubmitted(true); setLoading(false)
  }
  if (submitted) return (
    <div className="text-center py-12">
      <div className="w-16 h-16 bg-brand-red/10 rounded-full flex items-center justify-center mx-auto mb-5"><CheckCircle className="w-8 h-8 text-brand-red"/></div>
      <h2 className="text-2xl font-bold text-ink mb-3">Application received!</h2>
      <p className="text-sm text-ink/50 mb-6">We&apos;ll review your application and get back to you within 48 hours at <strong className="text-ink/70">{form.email}</strong>.</p>
      <div className="space-y-2 max-w-xs mx-auto">
        <Link href="/" className="btn-primary w-full block text-center">Back to homepage</Link>
        <Link href="/programs" className="btn-ghost w-full block text-center">Browse programmes</Link>
      </div>
    </div>
  )
  return (
    <form onSubmit={submit} className="space-y-6">
      <div>
        <h2 className="text-sm font-semibold text-ink mb-4 pb-2 border-b border-ink/5">Personal information</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div><label className={lc}>First name *</label><input name="firstName" value={form.firstName} onChange={handle} required placeholder="Adewale" className={ic}/></div>
          <div><label className={lc}>Last name *</label><input name="lastName" value={form.lastName} onChange={handle} required placeholder="Ogunleye" className={ic}/></div>
          <div><label className={lc}>Email address *</label><input type="email" name="email" value={form.email} onChange={handle} required placeholder="you@example.com" className={ic}/></div>
          <div><label className={lc}>Phone number *</label><input type="tel" name="phone" value={form.phone} onChange={handle} required placeholder="+234 800 000 0000" className={ic}/></div>
          <div><label className={lc}>Country *</label><input name="country" value={form.country} onChange={handle} required placeholder="Nigeria" className={ic}/></div>
          <div><label className={lc}>How did you hear about us?</label>
            <select name="howDidYouHear" value={form.howDidYouHear} onChange={handle} className={ic}>
              <option value="" className="bg-card">Select...</option>
              {['Twitter / X','Friend or colleague','Telegram','Google search','Web3 Lagos Conference','Other'].map(o=><option key={o} value={o.toLowerCase()} className="bg-card">{o}</option>)}
            </select>
          </div>
        </div>
      </div>
      <div>
        <h2 className="text-sm font-semibold text-ink mb-4 pb-2 border-b border-ink/5">Programme</h2>
        <div><label className={lc}>Which programme are you applying for? *</label>
          <select name="programme" value={form.programme} onChange={handle} required className={ic}>
            <option value="" className="bg-card">Select a programme...</option>
            <optgroup label="Tracks (12–16 weeks)" className="bg-card">
              {programmes.filter(p=>p.type==='track').map(p=><option key={p.slug} value={p.slug} className="bg-card">{p.name} — {p.duration}</option>)}
            </optgroup>
            <optgroup label="Sprints (3–6 weeks)" className="bg-card">
              {programmes.filter(p=>p.type==='sprint').map(p=><option key={p.slug} value={p.slug} className="bg-card">{p.name} — {p.duration}</option>)}
            </optgroup>
          </select>
        </div>
      </div>
      <div>
        <h2 className="text-sm font-semibold text-ink mb-4 pb-2 border-b border-ink/5">Background</h2>
        <div className="space-y-4">
          <div><label className={lc}>Experience level *</label>
            <select name="experience" value={form.experience} onChange={handle} required className={ic}>
              <option value="" className="bg-card">Select...</option>
              {[['none','No programming experience'],['beginner','Beginner — I know some basics'],['intermediate','Intermediate — I build projects regularly'],['advanced','Advanced — I work professionally as a developer']].map(([v,l])=><option key={v} value={v} className="bg-card">{l}</option>)}
            </select>
          </div>
          <div><label className={lc}>Why do you want to join Web3Bridge? *</label>
            <textarea name="motivation" value={form.motivation} onChange={handle} required rows={4} placeholder="Tell us about your goals..." className={`${ic} resize-none`}/>
          </div>
        </div>
      </div>
      <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2 py-3 disabled:opacity-50">
        {loading ? 'Submitting...' : <><span>Submit application</span><ArrowRight className="w-4 h-4"/></>}
      </button>
      <p className="text-xs text-ink/25 text-center">By applying you agree to our <Link href="/privacy" className="text-ink/40 hover:text-ink underline">privacy policy</Link>.</p>
    </form>
  )
}
