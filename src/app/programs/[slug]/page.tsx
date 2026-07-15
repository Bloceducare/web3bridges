import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getProgramme, programmes } from '@/lib/programmes'
import { formatNaira, formatUSD } from '@/lib/utils'
import { ArrowRight, CheckCircle, Clock, Monitor, Users } from 'lucide-react'

interface Props { params: { slug: string } }

export async function generateStaticParams() {
  return programmes.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const programme = getProgramme(params.slug)
  if (!programme) return { title: 'Programme not found' }
  return {
    title: programme.name,
    description: programme.description,
  }
}

export default function ProgrammeDetailPage({ params }: Props) {
  const programme = getProgramme(params.slug)
  if (!programme) notFound()

  const levelColors: Record<string, string> = {
    Beginner: 'text-green-400 bg-green-400/10 border-green-400/20',
    Intermediate: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
    Advanced: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
  }

  return (
    <div className="pt-14">
      {/* Hero */}
      <div className="border-b border-ink/5" style={{ background: `linear-gradient(135deg, var(--page-css) 60%, ${programme.color}08)` }}>
        <div className="container-wide py-14">
          <div className="flex items-center gap-2 mb-4">
            <Link href="/programs" className="text-xs text-ink/30 hover:text-ink transition-colors">Programmes</Link>
            <span className="text-ink/20">/</span>
            <span className="text-xs text-ink/50">{programme.name}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${levelColors[programme.level]}`}>{programme.level}</span>
                <span className="text-xs font-medium px-2.5 py-1 rounded-full border border-ink/10 text-ink/40 capitalize">{programme.type}</span>
                {programme.slug === 'web3-engineering' && (
                  <span className="text-xs font-semibold bg-brand-red/15 text-brand-red px-2.5 py-1 rounded-full">Flagship</span>
                )}
              </div>
              <h1 className="text-4xl font-bold text-ink mb-3">{programme.name}</h1>
              <p className="text-base text-ink/50 leading-relaxed mb-6 max-w-xl">{programme.description}</p>
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-1.5 text-xs text-ink/40">
                  <Clock className="w-3.5 h-3.5" /> {programme.duration}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-ink/40">
                  <Monitor className="w-3.5 h-3.5" /> {programme.format}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-ink/40">
                  <Users className="w-3.5 h-3.5" /> Small cohort
                </div>
              </div>
            </div>

            {/* Sticky apply card */}
            <div className="card-dark p-5 order-1 lg:order-2">
              <div className="text-2xl font-bold text-ink mb-0.5">{formatNaira(programme.fee.ngn)}</div>
              <div className="text-xs text-ink/30 mb-4">≈ {formatUSD(programme.fee.usd)} USD</div>
              <Link href={`/apply?programme=${programme.slug}`} className="btn-primary w-full text-center block mb-2">
                Apply now
              </Link>
              <Link href="/contact" className="btn-ghost w-full text-center block text-xs">
                Ask a question
              </Link>
              <div className="mt-4 space-y-2">
                {['Applications reviewed in 48hrs', 'Payment on acceptance', 'Next cohort starting soon'].map(f => (
                  <div key={f} className="flex items-center gap-2 text-xs text-ink/30">
                    <CheckCircle className="w-3.5 h-3.5 text-green-400 flex-shrink-0" /> {f}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-wide py-10">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6 order-2 lg:order-1">

            {/* What you'll learn */}
            <section>
              <h2 className="text-lg font-semibold text-ink mb-4">What you'll learn</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {programme.outcomes.map(outcome => (
                  <div key={outcome} className="flex items-start gap-2.5 p-3 bg-ink/[0.02] rounded-lg border border-ink/5">
                    <CheckCircle className="w-4 h-4 text-brand-red flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-ink/60">{outcome}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Curriculum */}
            <section>
              <h2 className="text-lg font-semibold text-ink mb-4">Curriculum</h2>
              <div className="space-y-2">
                {programme.curriculum.map((week, i) => (
                  <div key={i} className="card-dark p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-[10px] font-semibold text-brand-red bg-brand-red/10 px-2 py-0.5 rounded-full flex-shrink-0">{week.week}</span>
                      <h3 className="text-sm font-medium text-ink">{week.title}</h3>
                    </div>
                    <div className="flex flex-wrap gap-1.5 ml-0">
                      {week.topics.map(topic => (
                        <span key={topic} className="text-[10px] text-ink/40 bg-ink/[0.04] px-2 py-0.5 rounded border border-ink/5">{topic}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </div>

          <div className="space-y-5">
            {/* Prerequisites */}
            <div className="card-dark p-5">
              <h3 className="text-sm font-semibold text-ink mb-3">Prerequisites</h3>
              <ul className="space-y-2">
                {programme.prerequisites.map(p => (
                  <li key={p} className="flex items-start gap-2 text-xs text-ink/40">
                    <span className="text-brand-red mt-0.5">→</span> {p}
                  </li>
                ))}
              </ul>
            </div>

            {/* Programme info */}
            <div className="card-dark p-5 space-y-3">
              <h3 className="text-sm font-semibold text-ink mb-3">Programme info</h3>
              {[
                { label: 'Duration', value: programme.duration },
                { label: 'Format', value: programme.format },
                { label: 'Level', value: programme.level },
                { label: 'Weeks', value: `${programme.weeks} weeks` },
                { label: 'Fee (NGN)', value: formatNaira(programme.fee.ngn) },
                { label: 'Fee (USD)', value: formatUSD(programme.fee.usd) },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center justify-between">
                  <span className="text-xs text-ink/30">{label}</span>
                  <span className="text-xs text-ink/70 font-medium">{value}</span>
                </div>
              ))}
            </div>

            {/* Apply CTA */}
            <div className="bg-brand-red/10 border border-brand-red/20 rounded-xl p-5">
              <h3 className="text-sm font-semibold text-ink mb-1.5">Ready to apply?</h3>
              <p className="text-xs text-ink/40 mb-4">Applications take 10 minutes. We review within 48 hours.</p>
              <Link href={`/apply?programme=${programme.slug}`} className="btn-primary w-full text-center block text-sm flex items-center justify-center gap-2">
                Start application <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
