import type { Metadata } from 'next'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { CrispChat } from '@/components/CrispChat'

export const metadata: Metadata = {
  title: { default: "Web3Bridge — Africa's Blockchain Developer School", template: '%s | Web3Bridge' },
  description: "Web3Bridge trains world-class blockchain developers through Africa's most rigorous hands-on bootcamp. 16 weeks. Real projects. Global careers.",
  keywords: ['blockchain', 'developer', 'Africa', 'Web3', 'Solidity', 'bootcamp', 'Lagos', 'Nigeria'],
  authors: [{ name: 'Web3Bridge' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://web3bridgeafrica.com',
    siteName: 'Web3Bridge',
    title: "Web3Bridge — Africa's Blockchain Developer School",
    description: "Web3Bridge trains world-class blockchain developers through Africa's most rigorous hands-on bootcamp.",
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Web3Bridge' }],
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@web3bridgeafrica',
    images: ['/og-image.png'],
  },
  robots: { index: true, follow: true },
  icons: { icon: '/favicon.ico' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased bg-page text-ink font-sans">
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('wb-theme');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;if(d)document.documentElement.classList.add('dark');}catch(e){}})();`,
          }}
        />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <CrispChat />
      </body>
    </html>
  )
}
