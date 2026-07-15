import type { Metadata } from 'next'
import { AnimatedHero } from '@/components/sections/AnimatedHero'
import {
  EmployerLogos,
  AboutStrip,
  ProgrammesSection,
  ImpactSection,
  TestimonialsSection,
  ConferenceStrip,
  CommunitySection,
} from '@/components/sections/HomeSections'

export const metadata: Metadata = {
  title: "Web3Bridge — Africa's Blockchain Developer School",
  description: "Web3Bridge trains world-class blockchain developers through Africa's most rigorous hands-on bootcamp. 16 weeks. Real projects. Global careers.",
}

export default function HomePage() {
  return (
    <>
      <AnimatedHero />
      <EmployerLogos />
      <AboutStrip />
      <ProgrammesSection />
      <ImpactSection />
      <TestimonialsSection />
      <ConferenceStrip />
      <CommunitySection />
    </>
  )
}
