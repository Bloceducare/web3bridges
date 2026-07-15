import type { Metadata } from 'next'
import Link from 'next/link'
export const metadata: Metadata = { title: 'ETH Hub', description: 'Web3Bridge Ethereum community hub — resources, events, and ecosystem links.' }
export default function EthHubPage() {
  return (
    <div className="pt-14">
      <div className="bg-page2 border-b border-ink/5 py-14"><div className="container-wide">
        <span className="section-tag mb-3 block">ETH Hub</span>
        <h1 className="text-4xl font-bold text-ink mb-3">Ethereum Community Hub</h1>
        <p className="text-sm text-ink/40 max-w-xl">Resources, events, and ecosystem links for Ethereum developers in Africa — powered by Web3Bridge in partnership with the Ethereum Foundation.</p>
      </div></div>
      <div className="container-wide py-12">
        <div className="grid md:grid-cols-3 gap-5">
          {[['Developer resources','Documentation, tooling, and learning paths for Ethereum development.'],['Community events','Meetups, hackathons, and workshops across Africa.'],['Ecosystem grants','Funding opportunities for Ethereum builders from Africa.'],['EIPs and research','Latest Ethereum Improvement Proposals and research.'],['Web3Bridge x Ethereum','Our partnership with the Ethereum Foundation and what it means for you.'],['Get involved','Join the Ethereum community in Africa — contribute, build, and grow.']].map(([t,d]) => (
            <div key={t} className="card-dark p-5 hover:border-ink/20 transition-all cursor-pointer">
              <h3 className="text-sm font-semibold text-ink mb-2">{t}</h3>
              <p className="text-xs text-ink/40 leading-relaxed">{d}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
