import { Suspense } from 'react'
import ApplyForm from './ApplyForm'

export const metadata = {
  title: 'Apply',
  description: 'Apply to Web3Bridge — start your application in 10 minutes.',
}

export default function ApplyPage() {
  return (
    <div className="pt-14">
      <div className="bg-page2 border-b border-ink/5 py-12">
        <div className="container-wide max-w-2xl">
          <span className="text-xs font-semibold text-brand-red uppercase tracking-widest mb-3 block">Apply</span>
          <h1 className="text-3xl font-bold text-ink mb-2">Start your application</h1>
          <p className="text-sm text-ink/40">Takes about 10 minutes. We review all applications within 48 hours.</p>
        </div>
      </div>
      <div className="container-wide max-w-2xl py-10">
        <Suspense fallback={<div className="text-ink/30 text-sm">Loading form...</div>}>
          <ApplyForm />
        </Suspense>
      </div>
    </div>
  )
}
