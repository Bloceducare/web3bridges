'use client'

export const dynamic = 'force-dynamic'

import { useState, useEffect } from 'react'
import { PhotoUploader } from '@/components/PhotoUploader'
import { listFiles, getPublicUrl, BUCKETS } from '@/lib/storage'
import { RefreshCw } from 'lucide-react'

export default function HeroPhotosPage() {
  const [photos, setPhotos] = useState<{ url: string; name: string }[]>([])
  const [loading, setLoading] = useState(true)

  const load = async () => {
    setLoading(true)
    try {
      const files = await listFiles(BUCKETS.hero)
      setPhotos(
        files
          .filter((f: any) => f.name !== '.emptyFolderPlaceholder')
          .slice(0, 9)
          .map((f: any) => ({ name: f.name, url: getPublicUrl(BUCKETS.hero, f.name) }))
      )
    } catch (err) {
      setPhotos([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-ink mb-1">Hero mosaic photos</h1>
          <p className="text-sm text-ink/40 max-w-lg">
            The 9-cell photo mosaic in the homepage hero — the first thing visitors see.
            Mix portrait shots of individuals with wide group photos for the best visual effect.
          </p>
        </div>
        <button onClick={load} className="p-2 text-ink/30 hover:text-ink transition-colors">
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Slot layout diagram */}
      <div className="bg-ink/[0.02] border border-ink/8 rounded-xl p-5 mb-6">
        <p className="text-xs font-semibold text-ink/30 uppercase tracking-widest mb-3">Mosaic slot layout</p>
        <div className="grid grid-cols-4 gap-1.5" style={{ gridTemplateRows: 'repeat(3, 44px)' }}>
          <div style={{ gridRow: 'span 2', background: 'rgba(230,57,70,0.08)', border: '0.5px solid rgba(230,57,70,0.25)', borderRadius: 5, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 2 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#E63946' }}>1</span>
            <span style={{ fontSize: 8, color: 'rgba(230,57,70,0.5)' }}>tall</span>
          </div>
          {[2, 3].map(n => (
            <div key={n} style={{ background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(255,255,255,0.08)', borderRadius: 5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.3)' }}>{n}</span>
            </div>
          ))}
          <div style={{ gridRow: 'span 2', background: 'rgba(230,57,70,0.08)', border: '0.5px solid rgba(230,57,70,0.25)', borderRadius: 5, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 2 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#E63946' }}>4</span>
            <span style={{ fontSize: 8, color: 'rgba(230,57,70,0.5)' }}>tall</span>
          </div>
          {[5, 6].map(n => (
            <div key={n} style={{ background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(255,255,255,0.08)', borderRadius: 5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.3)' }}>{n}</span>
            </div>
          ))}
          <div style={{ gridColumn: 'span 2', background: 'rgba(230,57,70,0.08)', border: '0.5px solid rgba(230,57,70,0.25)', borderRadius: 5, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 6 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#E63946' }}>7</span>
            <span style={{ fontSize: 8, color: 'rgba(230,57,70,0.5)' }}>wide (group shot)</span>
          </div>
          {[8, 9].map(n => (
            <div key={n} style={{ background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(255,255,255,0.08)', borderRadius: 5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.3)' }}>{n}</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-ink/20 mt-3">
          Red slots span multiple cells. Use portrait photos for slots 1 & 4, a wide landscape group shot for slot 7, and any orientation for the rest.
        </p>
      </div>

      {loading ? (
        <div className="text-sm text-ink/30 py-8 text-center">Loading photos...</div>
      ) : (
        <PhotoUploader
          bucket={BUCKETS.hero}
          prefix="hero"
          maxFiles={9}
          existingPhotos={photos}
          label="Hero mosaic photos (max 9)"
          hint="Best mix: 2 portrait shots of individuals (slots 1 & 4), 1 wide conference crowd (slot 7), and cohort session moments for the rest."
          onUpload={() => load()}
          onDelete={() => load()}
        />
      )}
    </div>
  )
}
