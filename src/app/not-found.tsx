import Link from 'next/link'
export default function NotFound() {
  return (
    <div className="pt-14 min-h-screen flex items-center justify-center px-4 text-center">
      <div>
        <div className="text-8xl font-bold text-ink/5 mb-4">404</div>
        <h1 className="text-2xl font-bold text-ink mb-2">Page not found</h1>
        <p className="text-sm text-ink/40 mb-6">The page you are looking for does not exist.</p>
        <Link href="/" className="btn-primary inline-flex">Back to homepage</Link>
      </div>
    </div>
  )
}
