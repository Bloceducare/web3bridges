import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://web3bridgeafrica.com'

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Programs', href: '/programs', hasDropdown: true },
  { label: 'Blog', href: '/blog' },
  { label: 'Conference', href: 'https://event.web3bridge.com/', external: true },
  { label: 'ETH Hub', href: '/eth-hub' },
  { label: 'Alumni', href: 'https://alumni.web3bridgeafrica.com/', external: true },
]

export const EMPLOYER_LOGOS = [
  { name: 'Base', color: '#0052FF', textColor: '#0052FF', bg: '#EEF4FF' },
  { name: 'Interswitch', color: '#004B6E', textColor: '#004B6E', bg: '#EEF6FA' },
  { name: 'Consensys', color: '#C8FC28', textColor: '#1a1a1a', bg: '#1C1C1C' },
  { name: 'Resolva', color: '#1A56DB', textColor: '#1a1a1a', bg: '#EEF3FD' },
  { name: 'Nahmii', color: '#E040FB', textColor: '#1A2035', bg: '#F8F0FD' },
  { name: 'Nethermind', color: '#7B6FE8', textColor: 'white', bg: '#0D1B2A' },
  { name: 'Onboard', color: '#6C2BD9', textColor: 'white', bg: '#6C2BD9' },
  { name: 'Hashed Emergent', color: '#0D0D0D', textColor: 'white', bg: '#0D0D0D' },
  { name: 'Lendbit', color: '#F59E0B', textColor: '#1a1a1a', bg: '#FEF9EE' },
]

export const PARTNER_LOGOS = [
  { name: 'Ethereum Foundation', color: '#6B7199' },
  { name: 'Polygon', color: '#8247E5' },
  { name: 'Stellar', color: '#1a1a1a' },
  { name: 'Arbitrum', color: '#1B4ADD' },
  { name: 'Lisk', color: '#1a1a1a' },
  { name: 'Optimism', color: '#FF0420' },
  { name: 'Starknet', color: '#1A1A40' },
]

export const TESTIMONIALS = [
  {
    name: 'Adewale Ogunleye',
    role: 'Smart Contract Engineer',
    company: 'Nethermind',
    quote: "Web3Bridge didn't just teach me Solidity — it gave me a community and a reputation. I got hired at Nethermind within 3 months of graduating.",
    initials: 'AO',
    color: '#E63946',
  },
  {
    name: 'Fatima Kamara',
    role: 'Blockchain Developer',
    company: 'Polygon',
    quote: 'I came in with zero blockchain knowledge. By week 8 I had deployed my first token. By week 16 I had a job offer.',
    initials: 'FK',
    color: '#185FA5',
  },
  {
    name: 'Chukwuemeka Nwosu',
    role: 'Protocol Engineer',
    company: 'Base',
    quote: "The Web3 Engineering track is genuinely world-class. The mentors, the curriculum, the community — it's the real deal. I recommend it to every developer I meet.",
    initials: 'CN',
    color: '#0F6E56',
  },
  {
    name: 'Amaka Obi',
    role: 'ZK Researcher',
    company: 'Starknet',
    quote: "I came in as a frontend developer and left as a ZK engineer. Web3Bridge took me from React components to cryptographic circuits. Transformative doesn't cover it.",
    initials: 'AO',
    color: '#8247E5',
  },
]

export const IMPACT_STATS = [
  { number: '3,000+', label: 'Developers trained' },
  { number: '16+', label: 'Cohorts completed' },
  { number: '5th', label: 'Web3 Lagos edition' },
  { number: '440+', label: 'GIVE Bootcamp 2026' },
]

export const RESOURCEFUL_LINKS = [
  { label: 'Alumni Portal', description: 'Connect with graduates and access the alumni network', href: 'https://alumni.web3bridgeafrica.com', icon: 'users', color: '#E63946' },
  { label: 'Hackathon Platform', description: 'Browse active hackathons and submit your builds', href: 'https://hackathon.web3bridgeafrica.com', icon: 'trophy', color: '#7B6FE8' },
  { label: 'DApps Directory', description: 'Explore dApps built by Web3Bridge graduates', href: '/dapps', icon: 'layout-grid', color: '#185FA5' },
  { label: 'GitHub Organisation', description: 'Open source projects and curriculum repos', href: 'https://github.com/web3bridgeafrica', icon: 'github', color: '#1D9E75' },
  { label: 'Web3 Lagos Conf.', description: 'Register, nominate speakers, follow updates for the annual conference', href: 'https://event.web3bridge.com/', icon: 'mic', color: '#E63946' },
  { label: 'Community', description: 'Join 3,000+ builders on Telegram', href: 'https://t.me/web3bridgeafrica', icon: 'send', color: '#BA7517' },
]

export function formatNaira(amount: number): string {
  return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0 }).format(amount)
}

export function formatUSD(amount: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(amount)
}
