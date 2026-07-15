export interface Programme {
  slug: string
  name: string
  type: 'track' | 'sprint'
  tagline: string
  description: string
  duration: string
  format: string
  level: 'Beginner' | 'Intermediate' | 'Advanced'
  weeks: number
  curriculum: CurriculumWeek[]
  outcomes: string[]
  prerequisites: string[]
  fee: { ngn: number; usd: number }
  icon: string
  color: string
}

export interface CurriculumWeek {
  week: string
  title: string
  topics: string[]
}

export interface Testimonial {
  name: string
  role: string
  company: string
  quote: string
  initials: string
  color: string
}

export interface Partner {
  name: string
  type: 'employer' | 'partner'
}

export interface BlogPost {
  title: string
  link: string
  pubDate: string
  thumbnail?: string
  categories: string[]
}

export interface NavItem {
  label: string
  href: string
  children?: NavItem[]
}
