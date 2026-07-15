import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'Terms of Service' }
export default function TermsPage() {
  return (
    <div className="pt-14">
      <div className="container-wide max-w-2xl py-14">
        <h1 className="text-3xl font-bold text-ink mb-8">Terms of Service</h1>
        <div className="prose prose-invert prose-sm max-w-none space-y-6 text-ink/50">
          <p><strong className="text-ink">Last updated:</strong> June 2026</p>
          <p>By accessing or using web3bridgeafrica.com, you agree to be bound by these terms. Please read them carefully.</p>
          <h2 className="text-ink text-base font-semibold">Enrolment and fees</h2>
          <p>Programme fees are due upon acceptance. Fees are non-refundable after the programme start date unless otherwise agreed in writing.</p>
          <h2 className="text-ink text-base font-semibold">Intellectual property</h2>
          <p>All Web3Bridge curriculum materials are the intellectual property of Web3Bridge. Students retain ownership of projects they build during programmes.</p>
          <h2 className="text-ink text-base font-semibold">Code of conduct</h2>
          <p>All students and community members are expected to treat others with respect. Web3Bridge reserves the right to remove anyone who violates our community standards.</p>
          <h2 className="text-ink text-base font-semibold">Contact</h2>
          <p>For terms enquiries, email support@web3bridgeafrica.com.</p>
        </div>
      </div>
    </div>
  )
}
