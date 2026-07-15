import Link from 'next/link'
import { TESTIMONIALS, IMPACT_STATS, EMPLOYER_LOGOS, RESOURCEFUL_LINKS } from '@/lib/utils'
import { getTracks, getSprints } from '@/lib/programmes'
import { ArrowRight, Users } from 'lucide-react'

// ── Employer logos bar ────────────────────────────────────────────────────────
export function EmployerLogos() {
  return (
    <div className="bg-ink/[0.02] border-y border-ink/5 py-4 overflow-x-auto">
      <div className="container-wide">
        <p className="text-[10px] text-ink/25 uppercase tracking-widest mb-3">Where our graduates work</p>
        <div className="flex items-center gap-6 flex-wrap">
          {EMPLOYER_LOGOS.map(logo => (
            <div key={logo.name} className="flex items-center gap-1.5 opacity-50 hover:opacity-100 transition-opacity">
              <div className="w-3.5 h-3.5 rounded-sm flex-shrink-0" style={{ background: logo.color }} />
              <span className="text-xs font-medium text-ink/60">{logo.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── About strip ───────────────────────────────────────────────────────────────
export function AboutStrip() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2">
      {/* Photo placeholder */}
      <div className="relative bg-ink/[0.03] min-h-[280px] flex items-center justify-center border-r border-ink/5">
        <div className="text-center p-8">
          <div className="text-4xl mb-3">📷</div>
          <p className="text-xs text-ink/20">Classroom / coding session photo</p>
          <p className="text-[10px] text-ink/10 mt-1">Replace with real cohort image</p>
        </div>
        <div className="absolute bottom-4 left-4 bg-brand-red text-white text-[10px] font-semibold px-2.5 py-1 rounded">
          Since 2019
        </div>
      </div>

      {/* Content */}
      <div className="bg-ink/[0.015] p-8 lg:p-12 flex flex-col justify-center border-b border-ink/5">
        <span className="section-tag mb-3">Our story</span>
        <h2 className="text-2xl font-semibold text-ink mb-4 leading-tight">
          Built to close Africa's blockchain talent gap
        </h2>
        <p className="text-sm text-ink/50 leading-relaxed mb-3">
          Web3Bridge started in 2019 with a simple conviction:{' '}
          <strong className="text-ink/80">African developers are world-class</strong>. They just need the right environment, the right mentors, and a community that takes their ambition seriously.
        </p>
        <p className="text-sm text-ink/50 leading-relaxed mb-6">
          We have since trained <strong className="text-ink/80">3,000+ engineers</strong>, forged institutional partnerships with universities like FUT Minna, and built the continent's most respected annual Web3 gathering.
        </p>
        <Link href="/about" className="btn-ghost w-fit text-xs flex items-center gap-2">
          Read our full story <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </section>
  )
}

// ── Programmes section ─────────────────────────────────────────────────────────
export function ProgrammesSection() {
  const tracks = getTracks()
  const sprints = getSprints()

  const levelColors: Record<string, string> = {
    Beginner: 'text-green-600 dark:text-green-400 bg-green-500/10 dark:bg-green-400/10 border-green-500/20 dark:border-green-400/20',
    Intermediate: 'text-blue-600 dark:text-blue-400 bg-blue-500/10 dark:bg-blue-400/10 border-blue-500/20 dark:border-blue-400/20',
    Advanced: 'text-amber-600 dark:text-amber-400 bg-amber-500/10 dark:bg-amber-400/10 border-amber-500/20 dark:border-amber-400/20',
  }

  return (
    <section className="py-16 border-b border-ink/5">
      <div className="container-wide">
        <span className="section-tag mb-2 block">Programmes</span>
        <div className="flex items-end justify-between mb-8">
          <h2 className="text-2xl font-semibold text-ink">Tracks &amp; Sprints</h2>
          <Link href="/programs" className="text-xs text-ink/40 hover:text-ink transition-colors flex items-center gap-1">
            View all <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {/* Tracks */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-brand-red" />
            <span className="text-xs font-semibold text-ink/40 uppercase tracking-widest">Tracks — 12 to 16 weeks</span>
            <span className="text-xs text-ink/20">· Intensive, career-defining</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3">
            {tracks.map(track => (
              <Link key={track.slug} href={`/programs/${track.slug}`}
                className={`card-dark p-4 hover:border-ink/20 transition-all group ${track.slug === 'web3-engineering' ? 'border-brand-red/50' : ''}`}>
                <div className="w-8 h-8 rounded-lg mb-3 flex-shrink-0" style={{ background: `${track.color}15` }} />
                {track.slug === 'web3-engineering' && (
                  <span className="text-[9px] font-semibold bg-brand-red/15 text-brand-red px-1.5 py-0.5 rounded-full mb-2 inline-block">Flagship</span>
                )}
                <h3 className="text-xs font-semibold text-ink mb-1.5 group-hover:text-brand-red transition-colors leading-snug">{track.name}</h3>
                <p className="text-[10px] text-ink/30 leading-relaxed mb-3 line-clamp-2">{track.tagline}</p>
                <div className="flex flex-wrap gap-1 mt-auto">
                  <span className="text-[9px] font-medium px-1.5 py-0.5 rounded-full border" style={{ color: track.color, background: `${track.color}10`, borderColor: `${track.color}30` }}>
                    {track.duration}
                  </span>
                  <span className={`text-[9px] font-medium px-1.5 py-0.5 rounded-full border ${levelColors[track.level]}`}>
                    {track.level}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Sprints */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-blue-400" />
            <span className="text-xs font-semibold text-ink/40 uppercase tracking-widest">Sprints — 3 to 6 weeks</span>
            <span className="text-xs text-ink/20">· Focused, fast, applicable</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {sprints.map(sprint => (
              <Link key={sprint.slug} href={`/programs/${sprint.slug}`}
                className="card-dark p-4 hover:border-ink/20 transition-all group">
                <div className="w-7 h-7 rounded-md mb-3" style={{ background: `${sprint.color}15` }} />
                <span className="text-[9px] font-semibold bg-blue-400/10 text-blue-400 px-1.5 py-0.5 rounded-full mb-2 inline-block">New</span>
                <h3 className="text-xs font-semibold text-ink mb-1.5 group-hover:text-brand-red transition-colors">{sprint.name}</h3>
                <p className="text-[10px] text-ink/30 leading-relaxed mb-3 line-clamp-2">{sprint.tagline}</p>
                <span className="text-[9px] font-medium px-1.5 py-0.5 rounded-full border border-blue-400/20 bg-blue-400/10 text-blue-400">
                  {sprint.duration}
                </span>
              </Link>
            ))}
            {/* More coming */}
            <div className="card-dark p-4 opacity-40 flex flex-col items-center justify-center text-center min-h-[140px]">
              <div className="text-2xl mb-2">+</div>
              <span className="text-[10px] text-ink/40">More sprints<br />coming soon</span>
            </div>
          </div>
        </div>

        {/* Admissions CTA */}
        <div className="mt-6 flex items-center justify-between py-3 px-4 bg-ink/[0.02] rounded-lg border border-ink/5">
          <span className="text-xs text-ink/40">Not sure where to start? Our admissions team will help.</span>
          <Link href="/contact" className="text-xs text-brand-red font-medium flex items-center gap-1 hover:underline">
            Talk to admissions <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </section>
  )
}

// ── Impact numbers ────────────────────────────────────────────────────────────
export function ImpactSection() {
  return (
    <section className="py-16 bg-page2 border-b border-ink/5">
      <div className="container-wide">
        <span className="section-tag mb-2 block">Impact</span>
        <h2 className="text-2xl font-semibold text-ink mb-2">Numbers that don't lie</h2>
        <p className="text-sm text-ink/30 mb-8">Six years of building Africa's Web3 talent pipeline.</p>
        <div className="grid grid-cols-2 gap-px bg-ink/5 rounded-xl overflow-hidden">
          {IMPACT_STATS.map((stat, i) => (
            <div key={i} className="bg-card p-6">
              <div className="text-3xl font-bold text-ink leading-none mb-2 tracking-tight">
                {stat.number.replace('+', '').replace('th', '').replace('rd', '')}
                <span className="text-brand-red">
                  {stat.number.includes('+') ? '+' : stat.number.includes('th') ? 'th' : stat.number.includes('rd') ? 'rd' : ''}
                </span>
              </div>
              <p className="text-xs text-ink/30">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Testimonials ──────────────────────────────────────────────────────────────
export function TestimonialsSection() {
  return (
    <section className="py-16 border-b border-ink/5">
      <div className="container-wide">
        <span className="section-tag mb-2 block">Alumni voices</span>
        <h2 className="text-2xl font-semibold text-ink mb-2">Graduates, in their own words</h2>
        <p className="text-sm text-ink/30 mb-8">Real engineers. Real careers.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="card-dark p-5 flex flex-col">
              <p className="text-sm text-ink/60 leading-relaxed italic mb-5 flex-1">"{t.quote}"</p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0" style={{ background: t.color }}>
                  {t.initials}
                </div>
                <div>
                  <p className="text-xs font-medium text-ink">{t.name}</p>
                  <p className="text-[10px] text-ink/30">{t.role} · {t.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Conference strip ──────────────────────────────────────────────────────────
export function ConferenceStrip() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2">
      {/* Photo */}
      <div className="bg-brand-red/10 dark:bg-[#0d0407] min-h-[180px] flex items-center justify-center border-r border-ink/5">
        <div className="text-center p-8">
          <div className="text-4xl mb-2">🎤</div>
          <p className="text-xs text-ink/10">Conference keynote photo</p>
        </div>
      </div>
      {/* Content */}
      <div className="bg-brand-red p-8 lg:p-12 flex flex-col justify-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-white/70 mb-3">Annual event</p>
        <h2 className="text-2xl font-bold text-white mb-2 leading-tight">Web3 Lagos Conference 5.0</h2>
        <p className="text-sm text-white/80 mb-6 leading-relaxed">
          August 27–29, 2026 · Glover Memorial Hall, Lagos<br />
          Africa's biggest Web3 gathering — speakers, builders, and founders.
        </p>
        <a href="https://event.web3bridge.com/" target="_blank" rel="noopener noreferrer" className="bg-white text-brand-red text-sm font-semibold px-5 py-2.5 rounded-md w-fit hover:bg-white/90 transition-colors">
          Register now →
        </a>
      </div>
    </section>
  )
}

// ── Community section ─────────────────────────────────────────────────────────
export function CommunitySection() {
  const photoSlots = [
    'Community event', 'Cohort group photo', 'Graduation ceremony',
    'Speaker at conference', 'Hackathon', 'Alumni meetup',
  ]

  return (
    <section className="py-16 bg-page2 border-b border-ink/5">
      <div className="container-wide">
        <span className="section-tag mb-2 block">Community</span>
        <h2 className="text-2xl font-semibold text-ink mb-2">Join 3,000+ builders</h2>
        <p className="text-sm text-ink/30 mb-6 max-w-md">
          The Web3Bridge network is the most valuable thing you'll get from us. Engineers, jobs, and opportunities — all in one Telegram.
        </p>

        {/* Photo grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-5">
          {photoSlots.map((slot, i) => (
            <div key={i} className="aspect-[4/3] bg-ink/[0.03] rounded-lg border border-ink/5 flex items-center justify-center">
              <span className="text-[9px] text-ink/15 text-center px-2">{slot}</span>
            </div>
          ))}
        </div>

        {/* Facepile + CTA */}
        <div className="flex items-center gap-4">
          <div className="flex">
            {['AO', 'FK', 'CJ', 'MB'].map((init, i) => (
              <div key={i} className={`w-8 h-8 rounded-full border-2 border-page2 flex items-center justify-center text-[10px] font-bold text-white ${i > 0 ? '-ml-2' : ''}`}
                style={{ background: ['#E63946', '#185FA5', '#0F6E56', '#854F0B'][i] }}>
                {init}
              </div>
            ))}
            <div className="-ml-2 w-8 h-8 rounded-full border-2 border-page2 bg-ink/10 flex items-center justify-center text-[10px] font-bold text-white/50">+</div>
          </div>
          <a href="https://t.me/web3bridgeafrica" target="_blank" rel="noopener noreferrer" className="btn-primary flex items-center gap-2 text-xs">
            <Users className="w-3.5 h-3.5" />
            Join on Telegram
          </a>
          <span className="text-xs text-ink/25">3,000+ members already inside</span>
        </div>
      </div>
    </section>
  )
}
