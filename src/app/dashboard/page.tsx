import type { Metadata } from 'next'
import Link from 'next/link'
export const metadata: Metadata = { title: 'Student Dashboard' }
// TODO: Protect this route with NextAuth/Clerk middleware
export default function DashboardPage() {
  return (
    <div className="pt-14 min-h-screen">
      <div className="container-wide py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-ink">Student Dashboard</h1>
            <p className="text-sm text-ink/40">Welcome back</p>
          </div>
          <Link href="/login" className="btn-ghost text-xs">Log out</Link>
        </div>
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {[['Current Programme','Web3 Engineering'],['Cohort','Cohort 16'],['Progress','Week 4 of 16']].map(([l,v])=>(
            <div key={l} className="card-dark p-5">
              <p className="text-xs text-ink/30 mb-1">{l}</p>
              <p className="text-lg font-semibold text-ink">{v}</p>
            </div>
          ))}
        </div>
        <div className="card-dark p-6">
          <h2 className="text-sm font-semibold text-ink mb-4">This week</h2>
          <p className="text-xs text-ink/40">Dashboard content — curriculum, assignments, announcements — will be built out here once auth is configured.</p>
          <p className="text-xs text-ink/30 mt-2">See the dev guide: configure NextAuth or Clerk, connect to Supabase, then wire in the student portal content.</p>
        </div>
      </div>
    </div>
  )
}
