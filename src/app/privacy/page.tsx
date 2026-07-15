import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'Privacy Policy' }
export default function PrivacyPage() {
  return (
    <div className="pt-14">
      <div className="container-wide max-w-2xl py-14">
        <h1 className="text-3xl font-bold text-ink mb-8">Privacy Policy</h1>
        <div className="prose prose-invert prose-sm max-w-none space-y-6 text-ink/50">
          <p><strong className="text-ink">Last updated:</strong> June 2026</p>
          <p>Web3Bridge (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) operates web3bridgeafrica.com. This policy explains how we collect, use, and protect your personal information.</p>
          <h2 className="text-ink text-base font-semibold">Information we collect</h2>
          <p>We collect information you provide directly — including name, email address, phone number, and application details — when you apply to our programmes or contact us.</p>
          <h2 className="text-ink text-base font-semibold">How we use your information</h2>
          <p>We use your information to process applications, communicate about programmes, send course materials to enrolled students, and improve our services.</p>
          <h2 className="text-ink text-base font-semibold">Data sharing</h2>
          <p>We do not sell your personal data. We share data with service providers (payment processors, email services) only as necessary to deliver our services.</p>
          <h2 className="text-ink text-base font-semibold">Contact</h2>
          <p>For privacy enquiries, email support@web3bridgeafrica.com.</p>
        </div>
      </div>
    </div>
  )
}
