import type { Metadata } from 'next'
import Link from 'next/link'
import { ExternalLink } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Articles, tutorials, and thoughts from the Web3Bridge community.',
}

async function getMediumPosts() {
  try {
    const res = await fetch(
      'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@web3bridge',
      { next: { revalidate: 3600 } }
    )
    const data = await res.json()
    return data.items || []
  } catch {
    return []
  }
}

export default async function BlogPage() {
  const posts = await getMediumPosts()

  return (
    <div className="pt-14">
      <div className="bg-page2 border-b border-ink/5 py-14">
        <div className="container-wide">
          <span className="section-tag mb-3 block">Blog</span>
          <h1 className="text-4xl font-bold text-ink mb-3">Articles and insights</h1>
          <p className="text-sm text-ink/40">From the Web3Bridge team and community.</p>
        </div>
      </div>

      <div className="container-wide py-10">
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {posts.map((post: any, i: number) => (
              <a key={i} href={post.link} target="_blank" rel="noopener noreferrer"
                className="card-dark p-5 hover:border-ink/20 transition-all group flex flex-col">
                {post.thumbnail && (
                  <div className="aspect-video bg-ink/5 rounded-lg mb-4 overflow-hidden">
                    <img src={post.thumbnail} alt={post.title} className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="flex items-center gap-2 mb-2">
                  {post.categories?.slice(0, 2).map((cat: string) => (
                    <span key={cat} className="text-[10px] font-medium text-brand-red bg-brand-red/10 px-2 py-0.5 rounded-full">{cat}</span>
                  ))}
                </div>
                <h2 className="text-sm font-semibold text-ink mb-2 group-hover:text-brand-red transition-colors leading-snug flex-1">
                  {post.title}
                </h2>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-[10px] text-ink/25">{new Date(post.pubDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-ink/20 group-hover:text-brand-red transition-colors" />
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-ink/30 mb-4">Blog posts loading...</p>
            <a href="https://medium.com/@web3bridge" target="_blank" rel="noopener noreferrer"
              className="btn-ghost inline-flex items-center gap-2">
              Read on Medium <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
