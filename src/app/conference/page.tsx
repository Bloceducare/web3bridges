import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Calendar, MapPin, Users } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Web3 Lagos Conference 5.0',
  description: "Africa's biggest Web3 gathering. August 27–29, 2026 · Glover Memorial Hall, Lagos.",
}

export default function ConferencePage() {
  return (
    <div className="pt-14">
      <div className="bg-brand-red py-16">
        <div className="container-wide">
          <p className="text-xs font-semibold uppercase tracking-widest text-ink/60 mb-4">Annual event</p>
          <h1 className="text-5xl font-bold text-white mb-4 leading-tight">Web3 Lagos<br />Conference 5.0</h1>
          <div className="flex flex-wrap gap-5 mb-8">
            <div className="flex items-center gap-2 text-ink/80 text-sm"><Calendar className="w-4 h-4" /> August 27–29, 2026</div>
            <div className="flex items-center gap-2 text-ink/80 text-sm"><MapPin className="w-4 h-4" /> Glover Memorial Hall, Lagos</div>
            <div className="flex items-center gap-2 text-ink/80 text-sm"><Users className="w-4 h-4" /> Africa&apos;s biggest Web3 gathering</div>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href="https://event.web3bridge.com/" target="_blank" rel="noopener noreferrer" className="bg-white text-brand-red text-sm font-bold px-6 py-3 rounded-md hover:bg-white/90 transition-colors">Register now</a>
            <a href="https://event.web3bridge.com/" target="_blank" rel="noopener noreferrer" className="border border-ink/30 text-white text-sm px-6 py-3 rounded-md hover:border-ink/60 transition-colors">Nominate a speaker</a>
          </div>
        </div>
      </div>
      <div className="container-wide py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold text-white mb-4">About the conference</h2>
            <p className="text-sm text-ink/50 leading-relaxed mb-6">The Web3 Lagos Conference is Africa&apos;s foremost annual gathering of blockchain builders, developers, investors, and founders. Now in its 5th edition, it brings together the brightest minds in Web3 for three days of talks, workshops, panels, and networking.</p>
            <div className="bg-brand-red/10 border border-brand-red/20 rounded-xl p-5 mb-6">
              <h3 className="text-sm font-semibold text-white mb-1">Want to speak at Web3 Lagos 5.0?</h3>
              <p className="text-xs text-ink/40 mb-3">We&apos;re accepting speaker nominations until July 1, 2026.</p>
              <a href="https://event.web3bridge.com/" target="_blank" rel="noopener noreferrer" className="text-brand-red text-xs font-medium flex items-center gap-1 hover:underline">Submit nomination <ArrowRight className="w-3 h-3" /></a>
            </div>
          </div>
          <div className="space-y-4">
            <div className="card-dark p-5">
              <h3 className="text-sm font-semibold text-white mb-4">Event details</h3>
              {[['Date','August 27–29, 2026'],['Venue','Glover Memorial Hall'],['City','Lagos, Nigeria'],['Edition','5th annual']].map(([l,v]) => (
                <div key={l} className="flex justify-between py-2.5 border-b border-ink/5 last:border-0">
                  <span className="text-xs text-ink/30">{l}</span>
                  <span className="text-xs text-white font-medium">{v}</span>
                </div>
              ))}
            </div>
            <a href="https://event.web3bridge.com/" target="_blank" rel="noopener noreferrer" className="btn-primary w-full text-center block">Register now</a>
          </div>
        </div>
      </div>
    </div>
  )
}
