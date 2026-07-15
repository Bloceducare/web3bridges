'use client'

import { useState, useRef, useCallback } from 'react'
import { uploadFile, deleteFile, safeFileName } from '@/lib/storage'
import { Upload, X, CheckCircle, AlertCircle, Image, Loader } from 'lucide-react'

interface UploadedPhoto {
  url: string
  name: string
  status: 'uploading' | 'done' | 'error'
  progress: number
  error?: string
}

interface PhotoUploaderProps {
  bucket: string
  prefix?: string
  maxFiles?: number
  existingPhotos?: { url: string; name: string }[]
  label?: string
  hint?: string
  onUpload?: (url: string, name: string) => void
  onDelete?: (name: string) => void
}

export function PhotoUploader({
  bucket,
  prefix = '',
  maxFiles = 10,
  existingPhotos = [],
  label = 'Upload photos',
  hint,
  onUpload,
  onDelete,
}: PhotoUploaderProps) {
  const [dragging, setDragging] = useState(false)
  const [uploads, setUploads] = useState<UploadedPhoto[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFiles = useCallback(async (files: FileList | File[]) => {
    const fileArray = Array.from(files).filter(f => f.type.startsWith('image/'))
    if (!fileArray.length) return

    for (const file of fileArray) {
      const name = safeFileName(file.name, prefix)
      const id = name

      setUploads(prev => [...prev, { url: '', name, status: 'uploading', progress: 0 }])

      try {
        const url = await uploadFile(bucket, name, file, (pct) => {
          setUploads(prev => prev.map(u => u.name === id ? { ...u, progress: pct } : u))
        })
        setUploads(prev => prev.map(u => u.name === id ? { ...u, url, status: 'done', progress: 100 } : u))
        onUpload?.(url, name)
      } catch (err: any) {
        setUploads(prev => prev.map(u => u.name === id ? { ...u, status: 'error', error: err.message } : u))
      }
    }
  }, [bucket, prefix, onUpload])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    handleFiles(e.dataTransfer.files)
  }, [handleFiles])

  const handleDelete = async (name: string, isExisting: boolean) => {
    try {
      await deleteFile(bucket, name)
      if (isExisting) {
        onDelete?.(name)
      } else {
        setUploads(prev => prev.filter(u => u.name !== name))
      }
    } catch (err) {
      console.error('Delete failed:', err)
    }
  }

  const allPhotos = [
    ...existingPhotos,
    ...uploads.filter(u => u.status === 'done').map(u => ({ url: u.url, name: u.name })),
  ]

  return (
    <div className="space-y-4">
      {label && <div className="text-sm font-medium text-ink/70">{label}</div>}
      {hint && <p className="text-xs text-ink/30">{hint}</p>}

      {/* Drop zone */}
      {allPhotos.length < maxFiles && (
        <div
          onDragOver={e => { e.preventDefault(); setDragging(true) }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
            dragging
              ? 'border-brand-red bg-brand-red/5'
              : 'border-ink/10 hover:border-ink/25 hover:bg-ink/[0.02]'
          }`}
        >
          <Upload className="w-8 h-8 text-ink/20 mx-auto mb-3" />
          <p className="text-sm font-medium text-ink/50 mb-1">
            {dragging ? 'Drop photos here' : 'Drag & drop photos here'}
          </p>
          <p className="text-xs text-ink/25">or click to browse · JPG, PNG, WebP</p>
          {maxFiles > 1 && (
            <p className="text-xs text-ink/20 mt-1">{allPhotos.length}/{maxFiles} photos</p>
          )}
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple={maxFiles > 1}
            className="hidden"
            onChange={e => e.target.files && handleFiles(e.target.files)}
          />
        </div>
      )}

      {/* In-progress uploads */}
      {uploads.filter(u => u.status === 'uploading' || u.status === 'error').map(u => (
        <div key={u.name} className={`flex items-center gap-3 p-3 rounded-lg border ${
          u.status === 'error' ? 'border-red-500/30 bg-red-500/5' : 'border-ink/5 bg-ink/[0.02]'
        }`}>
          <div className="w-10 h-10 rounded-lg bg-ink/5 flex-shrink-0 flex items-center justify-center">
            {u.status === 'uploading' ? <Loader className="w-4 h-4 text-brand-red animate-spin" /> : <AlertCircle className="w-4 h-4 text-red-400" />}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-ink/60 truncate">{u.name}</p>
            {u.status === 'uploading' && (
              <div className="mt-1 h-1 bg-ink/5 rounded-full overflow-hidden">
                <div className="h-full bg-brand-red rounded-full transition-all" style={{ width: `${u.progress}%` }} />
              </div>
            )}
            {u.status === 'error' && <p className="text-xs text-red-400 mt-0.5">{u.error}</p>}
          </div>
        </div>
      ))}

      {/* Photo grid */}
      {allPhotos.length > 0 && (
        <div className="grid grid-cols-3 gap-3">
          {allPhotos.map((photo, i) => (
            <div key={photo.name} className="relative group aspect-square rounded-lg overflow-hidden bg-ink/[0.02] border border-ink/5">
              <img src={photo.url} alt={`Photo ${i + 1}`} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button
                  onClick={() => handleDelete(photo.name, existingPhotos.some(p => p.name === photo.name))}
                  className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                >
                  <X className="w-4 h-4 text-ink" />
                </button>
              </div>
              <div className="absolute top-2 left-2 w-5 h-5 bg-black/60 rounded text-[9px] font-bold text-ink flex items-center justify-center">
                {i + 1}
              </div>
            </div>
          ))}
        </div>
      )}

      {allPhotos.length === 0 && uploads.length === 0 && (
        <div className="flex items-center gap-2 text-xs text-ink/20">
          <Image className="w-3.5 h-3.5" />
          No photos uploaded yet
        </div>
      )}
    </div>
  )
}
