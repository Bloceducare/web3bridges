import type { Metadata } from 'next'
import Link from 'next/link'
import { getTracks, getSprints } from '@/lib/programmes'
import { formatNaira, formatUSD } from '@/lib/utils'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Programmes',
  description: 'Choose your track or sprint. 16-week engineering tracks and 3–6 week focused sprints for every level.',
}

export default function ProgramsPage() {
  const tracks = getTracks()
  const sprints = getSprints()

  const levelColors: Record<string, string> = {
    Beginner: 'text-green-400 bg-green-400/10 border-green-400/20',
    Intermediate: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
    Advanced: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
  }

  return (
    <div className="pt-14">
      {/* Header */}
      <div className="bg-page2 border-b border-ink/5 py-14">
        <div className="container-wide">
          <span className="section-tag mb-3 block">Programmes</span>
          <h1 className="text-4xl font-bold text-ink mb-3">Tracks &amp; Sprints</h1>
          <p className="text-base text-ink/40 max-w-xl">
            Deep 12–16 week engineering tracks. Fast 3–6 week sprints. Pick the commitment that fits your goal.
          </p>
        </div>
      </div>

      <div className="container-wide py-12">

        {/* Tracks */}
        <div className="mb-14">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-2 h-2 rounded-full bg-brand-red" />
            <h2 className="text-lg font-semibold text-ink">Tracks</h2>
            <span className="text-xs text-ink/30">12–16 weeks · intensive · career-defining</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tracks.map(track => (
              <Link key={track.slug} href={`/programs/${track.slug}`}
                className="card-dark p-5 hover:border-ink/20 transition-all group flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl" style={{ background: `${track.color}20` }} />
                  {track.slug === 'web3-engineering' && (
                    <span className="text-[10px] font-semibold bg-brand-red/15 text-brand-red px-2 py-1 rounded-full">Flagship</span>
                  )}
                </div>
                <h3 className="text-base font-semibold text-ink mb-1.5 group-hover:text-brand-red transition-colors">{track.name}</h3>
                <p className="text-xs text-ink/40 leading-relaxed mb-4 flex-1">{track.description.slice(0, 100)}...</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-medium px-2 py-1 rounded-full border" style={{ color: track.color, background: `${track.color}10`, borderColor: `${track.color}30` }}>
                      {track.duration}
                    </span>
                    <span className={`text-[10px] font-medium px-2 py-1 rounded-full border ${levelColors[track.level]}`}>
                      {track.level}
                    </span>
                    <span className="text-[10px] text-ink/25">{track.format}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-ink/40">{formatNaira(track.fee.ngn)} · {formatUSD(track.fee.usd)}</span>
                    <ArrowRight className="w-4 h-4 text-ink/20 group-hover:text-brand-red group-hover:translate-x-0.5 transition-all" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Sprints */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-2 h-2 rounded-full bg-blue-400" />
            <h2 className="text-lg font-semibold text-ink">Sprints</h2>
            <span className="text-xs text-ink/30">3–6 weeks · focused · immediately applicable</span>
            <span className="text-[10px] font-semibold text-blue-400 bg-blue-400/10 px-2 py-0.5 rounded-full">4 launching soon</span>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {sprints.map(sprint => (
              <Link key={sprint.slug} href={`/programs/${sprint.slug}`}
                className="card-dark p-5 hover:border-ink/20 transition-all group flex flex-col">
                <div className="w-9 h-9 rounded-xl mb-4" style={{ background: `${sprint.color}20` }} />
                <span className="text-[10px] font-semibold text-blue-400 bg-blue-400/10 px-2 py-0.5 rounded-full mb-2 inline-block w-fit">New</span>
                <h3 className="text-sm font-semibold text-ink mb-1.5 group-hover:text-brand-red transition-colors">{sprint.name}</h3>
                <p className="text-xs text-ink/40 leading-relaxed mb-4 flex-1">{sprint.tagline}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-full border border-blue-400/20 bg-blue-400/10 text-blue-400">{sprint.duration}</span>
                    <span className="text-[10px] text-ink/25">{formatNaira(sprint.fee.ngn)}</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-ink/20 group-hover:text-brand-red transition-colors" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Apply CTA */}
        <div className="mt-12 bg-brand-red/10 border border-brand-red/20 rounded-xl p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-ink mb-1">Not sure which programme is right for you?</h3>
            <p className="text-sm text-ink/50">Our admissions team will assess your background and recommend the best fit.</p>
          </div>
          <Link href="/contact" className="btn-primary flex-shrink-0 flex items-center gap-2">
            Talk to admissions <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
