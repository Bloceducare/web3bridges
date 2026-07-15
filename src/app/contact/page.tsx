'use client'
import { useState } from 'react'
import { Mail, MapPin, Send } from 'lucide-react'

const inputClass = "w-full bg-ink/[0.04] border border-ink/10 rounded-lg px-4 py-3 text-sm text-ink placeholder-ink/30 focus:outline-none focus:border-brand-red/50 transition-colors"

export default function ContactPage() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({name:'',email:'',subject:'',message:''})
  const handle = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>) => setForm(f=>({...f,[e.target.name]:e.target.value}))
  const submit = async (e: React.FormEvent) => { e.preventDefault(); await new Promise(r=>setTimeout(r,800)); setSent(true) }
  return (
    <div className="pt-14">
      <div className="bg-page2 border-b border-ink/5 py-14"><div className="container-wide">
        <span className="text-xs font-semibold text-brand-red uppercase tracking-widest mb-3 block">Contact</span>
        <h1 className="text-4xl font-bold text-ink mb-3">Get in touch</h1>
        <p className="text-sm text-ink/40">Admissions enquiries, partnerships, press, or just a question.</p>
      </div></div>
      <div className="container-wide py-12 grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          {sent ? (
            <div className="card-dark p-8 text-center">
              <div className="text-4xl mb-4">✓</div>
              <h2 className="text-lg font-semibold text-ink mb-2">Message sent!</h2>
              <p className="text-sm text-ink/40">We&apos;ll get back to you within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div><label className="block text-xs font-medium text-ink/40 mb-1.5">Name *</label><input name="name" value={form.name} onChange={handle} required placeholder="Adewale Ogunleye" className={inputClass}/></div>
                <div><label className="block text-xs font-medium text-ink/40 mb-1.5">Email *</label><input type="email" name="email" value={form.email} onChange={handle} required placeholder="you@example.com" className={inputClass}/></div>
              </div>
              <div><label className="block text-xs font-medium text-ink/40 mb-1.5">Subject</label>
                <select name="subject" value={form.subject} onChange={handle} className={inputClass}>
                  <option value="" className="bg-card">Select a topic...</option>
                  <option value="admissions" className="bg-card">Admissions enquiry</option>
                  <option value="partnership" className="bg-card">Partnership</option>
                  <option value="speaker-nomination" className="bg-card">Speaker nomination</option>
                  <option value="press" className="bg-card">Press</option>
                  <option value="other" className="bg-card">Other</option>
                </select>
              </div>
              <div><label className="block text-xs font-medium text-ink/40 mb-1.5">Message *</label><textarea name="message" value={form.message} onChange={handle} required rows={5} placeholder="How can we help?" className={`${inputClass} resize-none`}/></div>
              <button type="submit" className="btn-primary flex items-center gap-2"><Send className="w-4 h-4"/>Send message</button>
            </form>
          )}
        </div>
        <div className="space-y-4">
          <div className="card-dark p-5 space-y-3">
            <h3 className="text-sm font-semibold text-ink mb-3">Contact info</h3>
            <div className="flex items-center gap-3 text-xs text-ink/40"><Mail className="w-4 h-4 text-brand-red flex-shrink-0"/>support@web3bridgeafrica.com</div>
            <div className="flex items-start gap-3 text-xs text-ink/40"><MapPin className="w-4 h-4 text-brand-red flex-shrink-0 mt-0.5"/>Lagos, Nigeria</div>
          </div>
          <div className="card-dark p-5">
            <h3 className="text-sm font-semibold text-ink mb-3">Response times</h3>
            {[['Admissions','48 hours'],['Partnerships','2–3 business days'],['Press','24 hours'],['General','1–2 business days']].map(([t,v])=>(
              <div key={t} className="flex justify-between py-2 border-b border-ink/5 last:border-0 text-xs">
                <span className="text-ink/30">{t}</span><span className="text-ink/60">{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
