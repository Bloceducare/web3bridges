'use client'

export const dynamic = 'force-dynamic'

import { useState, useEffect } from 'react'
import { PhotoUploader } from '@/components/PhotoUploader'
import { listFiles, getPublicUrl, BUCKETS } from '@/lib/storage'
import { RefreshCw } from 'lucide-react'

export default function CommunityPhotosPage() {
  const [photos, setPhotos] = useState<{ url: string; name: string }[]>([])
  const [loading, setLoading] = useState(true)

  const load = async () => {
    setLoading(true)
    try {
      const files = await listFiles(BUCKETS.community)
      setPhotos(
        files
          .filter((f: any) => f.name !== '.emptyFolderPlaceholder')
          .slice(0, 6)
          .map((f: any) => ({ name: f.name, url: getPublicUrl(BUCKETS.community, f.name) }))
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
          <h1 className="text-xl font-semibold text-ink mb-1">Community photo grid</h1>
          <p className="text-sm text-ink/40 max-w-lg">
            These 6 photos appear in the community section on the homepage, above the Telegram CTA.
            Upload photos that represent Web3Bridge community energy — events, cohorts, graduations, hackathons.
          </p>
        </div>
        <button onClick={load} className="p-2 text-ink/30 hover:text-ink transition-colors">
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Slot preview */}
      <div className="bg-ink/[0.02] border border-ink/8 rounded-xl p-5 mb-6">
        <p className="text-xs font-semibold text-ink/30 uppercase tracking-widest mb-3">Slot layout (on homepage)</p>
        <div className="grid grid-cols-3 gap-2">
          {['Community event', 'Cohort group photo', 'Graduation ceremony', 'Speaker at conference', 'Hackathon session', 'Alumni meetup'].map((label, i) => (
            <div key={i} style={{ aspectRatio: '4/3', background: 'rgba(255,255,255,0.03)', border: '0.5px solid rgba(255,255,255,0.07)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 4 }}>
              <span style={{ fontSize: 10, fontWeight: 700, color: '#E63946' }}>{i + 1}</span>
              <span style={{ fontSize: 8, color: 'rgba(255,255,255,0.2)', textAlign: 'center', padding: '0 6px', lineHeight: 1.4 }}>{label}</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-ink/20 mt-3">Photos fill slots 1–6 left to right, newest uploads first.</p>
      </div>

      {loading ? (
        <div className="text-sm text-ink/30 py-8 text-center">Loading photos...</div>
      ) : (
        <PhotoUploader
          bucket={BUCKETS.community}
          prefix="community"
          maxFiles={6}
          existingPhotos={photos}
          label="Community photos (max 6)"
          hint="Ideal: cohort group shots, graduation moments, conference crowds, hackathon sessions, alumni meetups. Landscape 4:3 ratio works best."
          onUpload={() => load()}
          onDelete={() => load()}
        />
      )}
    </div>
  )
}
