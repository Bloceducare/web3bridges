import type { Metadata } from 'next'
import Link from 'next/link'
import { ExternalLink } from 'lucide-react'
export const metadata: Metadata = { title: 'Alumni', description: 'Web3Bridge alumni — 3,000+ engineers building the decentralised web.' }
export default function AlumniPage() {
  return (
    <div className="pt-14">
      <div className="bg-page2 border-b border-ink/5 py-14"><div className="container-wide">
        <span className="section-tag mb-3 block">Alumni</span>
        <h1 className="text-4xl font-bold text-ink mb-3">3,000+ engineers strong</h1>
        <p className="text-sm text-ink/40 max-w-xl">Web3Bridge alumni work at the world&apos;s leading blockchain organisations. They build dApps, secure protocols, and push the frontier of Web3 technology.</p>
        <div className="flex gap-3 mt-6">
          <a href="https://alumni.web3bridgeafrica.com/" target="_blank" rel="noopener noreferrer" className="btn-primary flex items-center gap-2">Access Alumni Portal <ExternalLink className="w-4 h-4" /></a>
          <Link href="/apply" className="btn-ghost">Join as a student</Link>
        </div>
      </div></div>
      <div className="container-wide py-12">
        <h2 className="text-xl font-semibold text-ink mb-6">Where alumni work</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {['Polygon','Nethermind','Interswitch','Base','Consensys','Onboard','Nahmii','Resolva','Hashed Emergent','Lendbit','Stellar Foundation','And many more...'].map(c => (
            <div key={c} className="card-dark px-4 py-3 text-sm text-ink/60 text-center">{c}</div>
          ))}
        </div>
      </div>
    </div>
  )
}
