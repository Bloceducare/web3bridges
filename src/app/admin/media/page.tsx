'use client'

export const dynamic = 'force-dynamic'

import { useState, useEffect } from 'react'
import { getMediaLibrary, uploadFile, deleteFile, safeFileName, BUCKETS } from '@/lib/storage'
import { Upload, Trash2, Copy, Search, RefreshCw, X } from 'lucide-react'
import { useRef } from 'react'

interface MediaFile {
  name: string
  url: string
  size: number
  created: string | null
}

export default function MediaLibraryPage() {
  const [files, setFiles] = useState<MediaFile[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [search, setSearch] = useState('')
  const [copied, setCopied] = useState<string | null>(null)
  const [selected, setSelected] = useState<MediaFile | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const load = async () => {
    setLoading(true)
    try {
      const data = await getMediaLibrary()
      setFiles(data)
    } catch (err) {
      setFiles([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const handleUpload = async (fileList: FileList) => {
    setUploading(true)
    for (const file of Array.from(fileList)) {
      if (!file.type.startsWith('image/')) continue
      const name = safeFileName(file.name)
      await uploadFile(BUCKETS.media, name, file)
    }
    await load()
    setUploading(false)
  }

  const handleDelete = async (file: MediaFile) => {
    if (!confirm(`Delete "${file.name}"?`)) return
    await deleteFile(BUCKETS.media, file.name)
    if (selected?.name === file.name) setSelected(null)
    await load()
  }

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url)
    setCopied(url)
    setTimeout(() => setCopied(null), 2000)
  }

  const filtered = files.filter((f: any) => f.name.toLowerCase().includes(search.toLowerCase()))

  const formatSize = (bytes: number) => {
    if (!bytes) return '—'
    if (bytes < 1024) return `${bytes}B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)}KB`
    return `${(bytes / 1024 / 1024).toFixed(1)}MB`
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-ink mb-1">Media library</h1>
          <p className="text-sm text-ink/40">All photos uploaded to Web3Bridge. Copy URLs to use them anywhere on the site.</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={load} className="p-2 text-ink/30 hover:text-ink transition-colors">
            <RefreshCw className="w-4 h-4" />
          </button>
          <button
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="btn-primary flex items-center gap-2 text-xs py-2 disabled:opacity-50"
          >
            <Upload className="w-3.5 h-3.5" />
            {uploading ? 'Uploading...' : 'Upload photos'}
          </button>
          <input ref={inputRef} type="file" accept="image/*" multiple className="hidden"
            onChange={e => e.target.files && handleUpload(e.target.files)} />
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-5">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/25" />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search by filename..."
          className="w-full bg-ink/[0.03] border border-ink/8 rounded-lg pl-9 pr-4 py-2.5 text-sm text-ink placeholder-ink/30 focus:outline-none focus:border-brand-red/40"
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          ['Total photos', files.length.toString()],
          ['Total size', formatSize(files.reduce((a, f) => a + (f.size || 0), 0))],
          ['Last upload', files[0]?.created ? new Date(files[0].created).toLocaleDateString('en-GB') : '—'],
        ].map(([label, value]) => (
          <div key={label} className="bg-ink/[0.02] border border-ink/5 rounded-xl p-4">
            <p className="text-xs text-ink/30 mb-1">{label}</p>
            <p className="text-lg font-semibold text-ink">{value}</p>
          </div>
        ))}
      </div>

      {loading ? (
        <div className="text-sm text-ink/30 py-16 text-center">Loading media library...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-sm text-ink/30 mb-3">{search ? 'No photos match your search' : 'No photos uploaded yet'}</p>
          {!search && (
            <button onClick={() => inputRef.current?.click()} className="btn-ghost text-xs">
              Upload your first photo
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
          {filtered.map(file => (
            <div key={file.name}
              onClick={() => setSelected(file)}
              className="group relative aspect-square rounded-xl overflow-hidden bg-ink/[0.02] border border-ink/5 cursor-pointer hover:border-ink/20 transition-all">
              <img src={file.url} alt={file.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-2">
                <button onClick={e => { e.stopPropagation(); copyUrl(file.url) }}
                  className="w-7 h-7 bg-ink/10 hover:bg-ink/20 rounded-lg flex items-center justify-center transition-colors">
                  {copied === file.url ? <span className="text-[9px] text-green-400">✓</span> : <Copy className="w-3 h-3 text-ink" />}
                </button>
                <button onClick={e => { e.stopPropagation(); handleDelete(file) }}
                  className="w-7 h-7 bg-red-500/80 hover:bg-red-500 rounded-lg flex items-center justify-center transition-colors">
                  <Trash2 className="w-3 h-3 text-ink" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Detail panel */}
      {selected && (
        <div className="fixed inset-y-0 right-0 w-80 bg-card border-l border-ink/8 p-5 overflow-y-auto z-40">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-ink">Photo details</h3>
            <button onClick={() => setSelected(null)} className="text-ink/30 hover:text-ink">
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="aspect-square rounded-xl overflow-hidden bg-ink/5 mb-4">
            <img src={selected.url} alt={selected.name} className="w-full h-full object-cover" />
          </div>
          <div className="space-y-3 mb-4">
            <div>
              <p className="text-xs text-ink/30 mb-1">Filename</p>
              <p className="text-xs text-ink/70 font-mono break-all">{selected.name}</p>
            </div>
            <div>
              <p className="text-xs text-ink/30 mb-1">Size</p>
              <p className="text-xs text-ink/70">{formatSize(selected.size)}</p>
            </div>
            {selected.created && (
              <div>
                <p className="text-xs text-ink/30 mb-1">Uploaded</p>
                <p className="text-xs text-ink/70">{new Date(selected.created).toLocaleString('en-GB')}</p>
              </div>
            )}
          </div>
          <button onClick={() => copyUrl(selected.url)}
            className="w-full btn-primary text-xs py-2 flex items-center justify-center gap-2 mb-2">
            {copied === selected.url ? '✓ Copied!' : <><Copy className="w-3.5 h-3.5" /> Copy URL</>}
          </button>
          <button onClick={() => handleDelete(selected)}
            className="w-full text-xs text-red-400 border border-red-500/20 py-2 rounded-lg hover:bg-red-500/10 transition-colors flex items-center justify-center gap-2">
            <Trash2 className="w-3.5 h-3.5" /> Delete photo
          </button>
        </div>
      )}
    </div>
  )
}
