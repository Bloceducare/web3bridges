'use client'

export const dynamic = 'force-dynamic'

import { useState, useEffect } from 'react'
import { PhotoUploader } from '@/components/PhotoUploader'
import { listFiles, getPublicUrl, BUCKETS } from '@/lib/storage'
import { getTracks, getSprints } from '@/lib/programmes'

const tracks = getTracks()
const sprints = getSprints()
const allProgrammes = [...tracks, ...sprints]

export default function ProgrammePhotosPage() {
  const [photos, setPhotos] = useState<Record<string, { url: string; name: string }>>({})
  const [loading, setLoading] = useState(true)
  const [activeSlug, setActiveSlug] = useState(allProgrammes[0].slug)

  const load = async () => {
    setLoading(true)
    try {
      const files = await listFiles(BUCKETS.programmes)
      const map: Record<string, { url: string; name: string }> = {}
      files
        .filter((f: any) => f.name !== '.emptyFolderPlaceholder')
        .forEach((f: any) => {
          const slug = f.name.split('-')[0] + (f.name.split('-')[1] ? '-' + f.name.split('-')[1] : '')
          const programme = allProgrammes.find(p => f.name.startsWith(p.slug))
          if (programme) {
            map[programme.slug] = { name: f.name, url: getPublicUrl(BUCKETS.programmes, f.name) }
          }
        })
      setPhotos(map)
    } catch (err) {
      setPhotos({})
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const activeProgramme = allProgrammes.find(p => p.slug === activeSlug)!
  const activePhoto = photos[activeSlug]

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-ink mb-1">Programme thumbnail photos</h1>
        <p className="text-sm text-ink/40">One thumbnail photo per programme — shown on the programme cards across the site. Select a programme on the left to upload its photo.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Programme list */}
        <div className="space-y-1">
          <p className="text-xs font-semibold text-ink/30 uppercase tracking-widest mb-3">Tracks</p>
          {tracks.map(t => (
            <button key={t.slug} onClick={() => setActiveSlug(t.slug)}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-xs transition-colors flex items-center justify-between ${
                activeSlug === t.slug ? 'bg-brand-red/10 border border-brand-red/30 text-ink' : 'text-ink/40 hover:text-ink hover:bg-ink/5'
              }`}>
              <span>{t.name}</span>
              {photos[t.slug] && <div className="w-2 h-2 rounded-full bg-green-400 flex-shrink-0" />}
            </button>
          ))}
          <p className="text-xs font-semibold text-ink/30 uppercase tracking-widest mb-3 pt-3">Sprints</p>
          {sprints.map(s => (
            <button key={s.slug} onClick={() => setActiveSlug(s.slug)}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-xs transition-colors flex items-center justify-between ${
                activeSlug === s.slug ? 'bg-brand-red/10 border border-brand-red/30 text-ink' : 'text-ink/40 hover:text-ink hover:bg-ink/5'
              }`}>
              <span>{s.name}</span>
              {photos[s.slug] && <div className="w-2 h-2 rounded-full bg-green-400 flex-shrink-0" />}
            </button>
          ))}
        </div>

        {/* Upload area */}
        <div className="col-span-2">
          <div className="bg-ink/[0.02] border border-ink/8 rounded-xl p-5 mb-4">
            <h2 className="text-sm font-semibold text-ink mb-1">{activeProgramme.name}</h2>
            <p className="text-xs text-ink/35">{activeProgramme.tagline} · {activeProgramme.duration}</p>
          </div>

          {activePhoto && (
            <div className="mb-4 rounded-xl overflow-hidden border border-ink/8" style={{ height: 140 }}>
              <img src={activePhoto.url} alt={activeProgramme.name} className="w-full h-full object-cover" />
            </div>
          )}

          {loading ? (
            <div className="text-sm text-ink/30 py-8 text-center">Loading...</div>
          ) : (
            <PhotoUploader
              bucket={BUCKETS.programmes}
              prefix={activeSlug}
              maxFiles={1}
              existingPhotos={activePhoto ? [activePhoto] : []}
              hint="Landscape thumbnail, roughly 16:6 ratio. Shows in the programme card on the homepage and programmes page."
              onUpload={() => load()}
              onDelete={() => load()}
            />
          )}

          {/* Progress summary */}
          <div className="mt-5 p-4 bg-ink/[0.02] border border-ink/5 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-ink/40">Upload progress</span>
              <span className="text-xs font-semibold text-ink">{Object.keys(photos).length}/{allProgrammes.length} photos</span>
            </div>
            <div className="h-1.5 bg-ink/5 rounded-full overflow-hidden">
              <div className="h-full bg-brand-red rounded-full transition-all" style={{ width: `${(Object.keys(photos).length / allProgrammes.length) * 100}%` }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
