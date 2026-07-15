import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'DApps Directory', description: 'Decentralised applications built by Web3Bridge graduates.' }
export default function DAppsPage() {
  return (
    <div className="pt-14">
      <div className="bg-page2 border-b border-ink/5 py-14"><div className="container-wide">
        <span className="section-tag mb-3 block">DApps</span>
        <h1 className="text-4xl font-bold text-ink mb-3">Built by Web3Bridge graduates</h1>
        <p className="text-sm text-ink/40">Decentralised applications deployed to mainnet by our alumni.</p>
      </div></div>
      <div className="container-wide py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({length:6}).map((_,i) => (
            <div key={i} className="card-dark p-5">
              <div className="w-10 h-10 rounded-xl bg-ink/5 mb-4" />
              <div className="h-4 bg-ink/5 rounded mb-2 w-3/4" />
              <div className="h-3 bg-ink/5 rounded mb-1" />
              <div className="h-3 bg-ink/5 rounded w-4/5" />
            </div>
          ))}
        </div>
        <p className="text-center text-sm text-ink/30 mt-8">DApps directory coming soon. <a href="mailto:support@web3bridgeafrica.com" className="text-brand-red hover:underline">Submit your dApp.</a></p>
      </div>
    </div>
  )
}
