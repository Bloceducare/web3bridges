import Link from 'next/link'
import { RESOURCEFUL_LINKS } from '@/lib/utils'
import { PARTNER_LOGOS } from '@/lib/utils'
import { ArrowRight } from 'lucide-react'

const footerLinks = {
  Programmes: [
    { label: 'Web2 Launchpad', href: '/programs/web2-launchpad' },
    { label: 'Advanced Frontend', href: '/programs/advanced-frontend' },
    { label: 'Backend Engineering', href: '/programs/backend-engineering' },
    { label: 'Web3 Engineering', href: '/programs/web3-engineering' },
    { label: 'Rust Engineering', href: '/programs/rust-engineering' },
    { label: 'Zero Knowledge Proofs', href: '/programs/zero-knowledge-proofs' },
  ],
  Organisation: [
    { label: 'About us', href: '/about' },
    { label: 'Partners', href: '/partners' },
    { label: 'Web3 Lagos Conf.', href: 'https://event.web3bridge.com/' },
    { label: 'Press', href: '/about#press' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
  ],
  Community: [
    { label: 'Telegram', href: 'https://t.me/web3bridgeafrica', external: true },
    { label: 'Events', href: '/conference' },
    { label: 'Newsletter', href: '/contact#newsletter' },
    { label: 'Mentorship', href: 'https://alumni.web3bridgeafrica.com/' },
    { label: 'Job Board', href: 'https://alumni.web3bridgeafrica.com/' },
  ],
}

export function Footer() {
  return (
    <footer className="bg-page3 border-t border-ink/5">

      {/* Partners bar */}
      <div className="border-b border-ink/5 py-5">
        <div className="container-wide">
          <p className="text-[10px] text-ink/25 uppercase tracking-widest mb-4">Trusted by leading organisations</p>
          <div className="flex items-center gap-4 sm:gap-8 flex-wrap">
            {PARTNER_LOGOS.map(p => (
              <span key={p.name} className="text-xs font-semibold text-ink/30 hover:text-ink/60 transition-colors cursor-default" style={{ color: p.color + '60' }}>
                {p.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="container-wide py-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-8">

          {/* Brand col */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <img src="/logo-light.svg" alt="Web3Bridge" className="h-7 w-auto block dark:hidden" />
              <img src="/logo-dark.svg" alt="Web3Bridge" className="h-7 w-auto hidden dark:block" />
            </Link>
            <p className="text-xs text-ink/20 leading-relaxed mb-4 max-w-[160px]">
              Africa's blockchain and software engineering school since 2019.
            </p>
            <p className="text-xs text-ink/15 mb-4">support@web3bridge.com</p>
            <div className="flex items-center gap-3">
              {['Twitter', 'LinkedIn', 'Instagram', 'YouTube', 'Telegram'].map(s => (
                <a key={s} href="#" className="text-ink/20 hover:text-ink/50 transition-colors text-xs">{s[0]}</a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-xs font-medium text-ink/40 mb-4">{title}</h3>
              <ul className="space-y-2.5">
                {links.map(link => (
                  <li key={link.href}>
                    {'external' in link && link.external ? (
                      <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-xs text-ink/25 hover:text-ink/60 transition-colors">
                        {link.label}
                      </a>
                    ) : (
                      <Link href={link.href} className="text-xs text-ink/25 hover:text-ink/60 transition-colors">
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Resourceful links */}
          <div className="border-l border-ink/5 pl-6">
            <h3 className="text-xs font-medium text-ink/40 mb-4">Resourceful links</h3>
            <div className="space-y-1.5">
              {RESOURCEFUL_LINKS.map(link => (
                <a key={link.label} href={link.href} className="flex items-center gap-2 px-2 py-1.5 bg-ink/[0.03] rounded-md border border-ink/5 hover:bg-ink/[0.06] transition-colors group">
                  <div className="w-4 h-4 flex-shrink-0" style={{ color: link.color }}>
                    <div className="w-1.5 h-1.5 rounded-full mt-1.5" style={{ background: link.color }} />
                  </div>
                  <span className="text-[10px] font-medium text-ink/40 flex-1 group-hover:text-ink/70 transition-colors">{link.label}</span>
                  <ArrowRight className="w-2.5 h-2.5 text-ink/20 group-hover:text-ink/40" />
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="mt-10 pt-6 border-t border-ink/5 flex items-center justify-between">
          <p className="text-[10px] text-ink/15">© 2026 Web3Bridge. All rights reserved.</p>
          <p className="text-[10px] text-ink/15">Built in Lagos, Nigeria 🇳🇬</p>
        </div>
      </div>

    </footer>
  )
}
