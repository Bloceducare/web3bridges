import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About',
  description: "Web3Bridge's story — how Africa's foremost blockchain developer school was built from the ground up since 2019.",
}

const timeline = [
  { year: '2019', title: 'Web3Bridge founded', desc: 'Ayodeji Awosika launches Web3Bridge in Lagos with the first cohort of blockchain developers.' },
  { year: '2020', title: 'First 100 graduates', desc: 'Web3Bridge produces its first 100 engineers. Several join leading blockchain companies across Africa and globally.' },
  { year: '2021', title: 'Web3 Lagos Conference launches', desc: "Africa's first large-scale Web3 conference, bringing together builders, investors, and developers." },
  { year: '2022', title: 'Zero Knowledge Programme', desc: 'Web3Bridge launches its advanced ZK cryptography track — one of the few in Africa.' },
  { year: '2023', title: 'FUT Minna partnership', desc: 'MoU signed with Federal University of Technology, Minna for Industrial Training placements.' },
  { year: '2024', title: 'Stellar GIVE Bootcamp', desc: 'Web3Bridge becomes implementation partner for the Stellar Development Foundation GIVE Bootcamp across East Africa.' },
  { year: '2025', title: '3,000+ developers trained', desc: 'Web3Bridge surpasses 3,000 trained developers across Africa. Rust and expanded Web2 tracks launched.' },
  { year: '2026', title: 'Web3 Lagos Conference 5.0', desc: 'Fifth edition of the conference at Glover Memorial Hall, Lagos. Largest edition yet.' },
]

export default function AboutPage() {
  return (
    <div className="pt-14">
      {/* Hero */}
      <div className="bg-page2 border-b border-ink/5 py-16">
        <div className="container-wide max-w-3xl">
          <span className="section-tag mb-3 block">About</span>
          <h1 className="text-4xl font-bold text-ink mb-5 leading-tight">
            Built to close Africa's<br />blockchain talent gap
          </h1>
          <p className="text-base text-ink/50 leading-relaxed">
            Web3Bridge started in 2019 with a simple conviction: African developers are world-class. They just need the right environment, the right mentors, and a community that takes their ambition seriously.
          </p>
        </div>
      </div>

      <div className="container-wide py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <div className="lg:col-span-2 space-y-8">
            {/* Story */}
            <section>
              <h2 className="text-xl font-semibold text-ink mb-4">Our story</h2>
              <div className="prose prose-sm prose-invert max-w-none space-y-3 text-ink/50 text-sm leading-relaxed">
                <p>
                  Web3Bridge was founded in Lagos, Nigeria in 2019 by Ayodeji Awosika — known as the Chief Mechanic — with the belief that Africa's developers could compete and win on the global stage, given the right infrastructure and community.
                </p>
                <p>
                  What started as a small cohort-based blockchain bootcamp has grown into Africa's foremost blockchain engineering school, with over 3,000 graduates working at Polygon, Nethermind, Interswitch, Consensys, Base, and dozens of other leading Web3 organisations.
                </p>
                <p>
                  We run the Web3 Lagos Conference — now in its 5th edition — and have forged partnerships with the Ethereum Foundation, Polygon, Stellar Development Foundation, Arbitrum, Optimism, Starknet, and Lisk. Our MoU with the Federal University of Technology, Minna brings computer science students into our programmes for Industrial Training placements.
                </p>
                <p>
                  Our programmes span the full stack: Web2 fundamentals, advanced frontend, backend engineering, Web3 and Solidity, Rust systems programming, and Zero Knowledge proofs. We have trained developers across over 20 African countries.
                </p>
              </div>
            </section>

            {/* Timeline */}
            <section>
              <h2 className="text-xl font-semibold text-ink mb-6">Timeline</h2>
              <div className="relative">
                <div className="absolute left-[52px] top-0 bottom-0 w-px bg-ink/5" />
                <div className="space-y-6">
                  {timeline.map((item, i) => (
                    <div key={i} className="flex gap-5">
                      <div className="w-14 flex-shrink-0">
                        <span className="text-xs font-bold text-brand-red">{item.year}</span>
                      </div>
                      <div className="relative pl-5">
                        <div className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-ink/10 border border-ink/20 -translate-x-[calc(50%+1px)]" />
                        <h3 className="text-sm font-semibold text-ink mb-1">{item.title}</h3>
                        <p className="text-xs text-ink/40 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            <div className="card-dark p-5">
              <h3 className="text-sm font-semibold text-ink mb-4">By the numbers</h3>
              {[
                { num: '3,000+', label: 'Developers trained' },
                { num: '16+', label: 'Cohorts' },
                { num: '20+', label: 'Countries' },
                { num: '5th', label: 'Conference edition' },
                { num: '7', label: 'Protocol partners' },
              ].map(({ num, label }) => (
                <div key={label} className="flex items-center justify-between py-2.5 border-b border-ink/5 last:border-0">
                  <span className="text-xs text-ink/40">{label}</span>
                  <span className="text-sm font-bold text-ink">{num}</span>
                </div>
              ))}
            </div>

            <div className="card-dark p-5">
              <h3 className="text-sm font-semibold text-ink mb-3">Institutional partners</h3>
              <div className="space-y-2 text-xs text-ink/40">
                <p>Ethereum Foundation</p>
                <p>Stellar Development Foundation</p>
                <p>Polygon</p>
                <p>Arbitrum</p>
                <p>Optimism</p>
                <p>Starknet</p>
                <p>Lisk</p>
                <p>FUT Minna (MoU)</p>
              </div>
            </div>

            <Link href="/apply" className="btn-primary w-full text-center block flex items-center justify-center gap-2">
              Apply to Web3Bridge <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
