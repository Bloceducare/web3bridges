'use client'

export const dynamic = 'force-dynamic'

import { useState, useEffect } from 'react'
import { PhotoUploader } from '@/components/PhotoUploader'
import { listFiles, getPublicUrl, BUCKETS } from '@/lib/storage'
import { RefreshCw } from 'lucide-react'

export default function AboutPhotoPage() {
  const [photo, setPhoto] = useState<{ url: string; name: string } | null>(null)
  const [loading, setLoading] = useState(true)

  const load = async () => {
    setLoading(true)
    try {
      const files = await listFiles(BUCKETS.about)
      const f = files.filter((x: any) => x.name !== '.emptyFolderPlaceholder')[0]
      setPhoto(f ? { name: f.name, url: getPublicUrl(BUCKETS.about, f.name) } : null)
    } catch (err) {
      setPhoto(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-ink mb-1">About section photo</h1>
          <p className="text-sm text-ink/40 max-w-lg">
            The photo that appears in the "Built to close Africa's blockchain talent gap" strip on the homepage.
            Use a wide landscape shot showing the learning environment — classroom, coding session, or students working together.
          </p>
        </div>
        <button onClick={load} className="p-2 text-ink/30 hover:text-ink transition-colors">
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {photo && (
        <div className="mb-5 rounded-xl overflow-hidden border border-ink/8" style={{ aspectRatio: '16/7' }}>
          <img src={photo.url} alt="Current about photo" className="w-full h-full object-cover" />
        </div>
      )}

      {!photo && (
        <div className="mb-5 rounded-xl border border-dashed border-ink/10 bg-ink/[0.02]" style={{ aspectRatio: '16/7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <p className="text-sm text-ink/20">No photo uploaded yet</p>
        </div>
      )}

      {loading ? (
        <div className="text-sm text-ink/30 py-4 text-center">Loading...</div>
      ) : (
        <PhotoUploader
          bucket={BUCKETS.about}
          prefix="about"
          maxFiles={1}
          existingPhotos={photo ? [photo] : []}
          label="About section photo (1 photo)"
          hint="Landscape orientation required. The photo displays at roughly 16:7 ratio. Ideal: students at laptops in the classroom, a wide session shot, or the physical space with people working."
          onUpload={() => load()}
          onDelete={() => load()}
        />
      )}
    </div>
  )
}
