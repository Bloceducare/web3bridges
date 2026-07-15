import type { Metadata } from 'next'
import Link from 'next/link'
export const metadata: Metadata = { title: 'Partners', description: 'Organisations that trust and partner with Web3Bridge.' }
const partners = [
  {name:'Ethereum Foundation',type:'Protocol partner',desc:'Supporting Web3Bridge through grants and collaboration since 2021.'},
  {name:'Polygon',type:'Protocol partner',desc:'Partnership covering developer education and ecosystem growth across Africa.'},
  {name:'Stellar Development Foundation',type:'Implementation partner',desc:'Web3Bridge is the official implementation partner for the GIVE Bootcamp across East Africa.'},
  {name:'Arbitrum',type:'Protocol partner',desc:'Supporting Web3Bridge curriculum and developer education initiatives.'},
  {name:'Optimism',type:'Protocol partner',desc:'Funding and supporting optimistic rollup education in Africa.'},
  {name:'Starknet',type:'Protocol partner',desc:'ZK-rollup ecosystem partner supporting the Zero Knowledge track.'},
  {name:'Lisk',type:'Protocol partner',desc:'Layer 2 ecosystem partner for developer education.'},
  {name:'FUT Minna',type:'University partner',desc:'MoU for Industrial Training placements — CS students train at Web3Bridge.'},
]
export default function PartnersPage() {
  return (
    <div className="pt-14">
      <div className="bg-page2 border-b border-ink/5 py-14"><div className="container-wide">
        <span className="section-tag mb-3 block">Partners</span>
        <h1 className="text-4xl font-bold text-ink mb-3">Trusted by leading organisations</h1>
        <p className="text-sm text-ink/40 max-w-xl">Seven years of partnerships with the world&apos;s leading blockchain protocols and institutions.</p>
      </div></div>
      <div className="container-wide py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          {partners.map(p => (
            <div key={p.name} className="card-dark p-5">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-ink/5 flex-shrink-0" />
                <div>
                  <h3 className="text-sm font-semibold text-ink mb-0.5">{p.name}</h3>
                  <span className="text-[10px] font-medium text-brand-red bg-brand-red/10 px-2 py-0.5 rounded-full">{p.type}</span>
                  <p className="text-xs text-ink/40 mt-2 leading-relaxed">{p.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-ink/[0.02] border border-ink/5 rounded-xl p-8 text-center">
          <h3 className="text-lg font-semibold text-ink mb-2">Interested in partnering with Web3Bridge?</h3>
          <p className="text-sm text-ink/40 mb-5">We work with protocols, institutions, and companies that share our mission of building Africa&apos;s Web3 talent pipeline.</p>
          <Link href="/contact?subject=partnership" className="btn-primary inline-flex">Get in touch</Link>
        </div>
      </div>
    </div>
  )
}
