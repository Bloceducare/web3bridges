export const dynamic = 'force-dynamic'

import Link from 'next/link'
import { Library, LayoutGrid, Image, Users, BookOpen, ArrowRight } from 'lucide-react'

const sections = [
  {
    href: '/admin/media',
    icon: Library,
    label: 'Media library',
    desc: 'All photos uploaded to the site. Central store for everything.',
    color: '#8247E5',
  },
  {
    href: '/admin/hero-photos',
    icon: LayoutGrid,
    label: 'Hero mosaic',
    desc: 'The 9-cell photo grid in the homepage hero. Upload up to 9 photos.',
    color: '#E63946',
    slots: 9,
  },
  {
    href: '/admin/about-photo',
    icon: Image,
    label: 'About section photo',
    desc: 'The full-width photo in the "Built to close Africa\'s blockchain talent gap" strip.',
    color: '#185FA5',
    slots: 1,
  },
  {
    href: '/admin/community-photos',
    icon: Users,
    label: 'Community photo grid',
    desc: 'The 6 photos in the community section above the Telegram CTA.',
    color: '#0F6E56',
    slots: 6,
  },
  {
    href: '/admin/programme-photos',
    icon: BookOpen,
    label: 'Programme thumbnails',
    desc: 'One thumbnail photo per track and sprint (10 total).',
    color: '#B45A0A',
    slots: 10,
  },
]

export default function AdminPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-ink mb-2">Photo management</h1>
        <p className="text-sm text-ink/40">
          Upload, replace, and manage photos across the Web3Bridge website.
          All uploads go live instantly — no code changes needed.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sections.map(section => (
          <Link key={section.href} href={section.href}
            className="bg-ink/[0.02] border border-ink/8 rounded-xl p-5 hover:border-ink/20 transition-all group flex flex-col">
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: section.color + '20' }}>
                <section.icon className="w-5 h-5" style={{ color: section.color }} />
              </div>
              {section.slots && (
                <span className="text-[10px] font-medium text-ink/30 bg-ink/5 px-2 py-1 rounded">
                  {section.slots} {section.slots === 1 ? 'slot' : 'slots'}
                </span>
              )}
            </div>
            <h2 className="text-sm font-semibold text-ink mb-1.5 group-hover:text-brand-red transition-colors">{section.label}</h2>
            <p className="text-xs text-ink/35 leading-relaxed flex-1">{section.desc}</p>
            <div className="flex items-center gap-1 mt-4 text-xs text-ink/25 group-hover:text-brand-red transition-colors">
              Manage photos <ArrowRight className="w-3 h-3" />
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-8 bg-brand-red/8 border border-brand-red/20 rounded-xl p-5">
        <h3 className="text-sm font-semibold text-ink mb-2">How it works</h3>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            ['1. Choose a section', 'Click the section you want to update above.'],
            ['2. Upload photos', 'Drag and drop or browse. JPG, PNG, and WebP all work.'],
            ['3. Goes live instantly', 'The site fetches photos from storage on every load — no deploys needed.'],
          ].map(([title, desc]) => (
            <div key={title}>
              <p className="text-xs font-semibold text-ink/70 mb-1">{title}</p>
              <p className="text-xs text-ink/35 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
