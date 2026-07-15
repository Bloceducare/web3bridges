let _client: any = null

function getClient() {
  if (_client) return _client
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key || !url.startsWith('http')) {
    throw new Error('Supabase not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local')
  }
  const { createClient } = require('@supabase/supabase-js')
  _client = createClient(url, key)
  return _client
}

export const BUCKETS = {
  community: 'community-photos',
  hero: 'hero-photos',
  about: 'about-photo',
  programmes: 'programme-photos',
  media: 'media-library',
} as const

export type BucketKey = keyof typeof BUCKETS

export function getPublicUrl(bucket: string, path: string): string {
  const { data } = getClient().storage.from(bucket).getPublicUrl(path)
  return data.publicUrl
}

export async function listFiles(bucket: string, folder = '') {
  const { data, error } = await getClient().storage
    .from(bucket)
    .list(folder, { sortBy: { column: 'created_at', order: 'desc' } })
  if (error) throw error
  return data || []
}

export async function uploadFile(bucket: string, path: string, file: File, onProgress?: (pct: number) => void): Promise<string> {
  if (onProgress) onProgress(10)
  const { error } = await getClient().storage.from(bucket).upload(path, file, { upsert: true, contentType: file.type })
  if (error) throw error
  if (onProgress) onProgress(100)
  return getPublicUrl(bucket, path)
}

export async function deleteFile(bucket: string, path: string) {
  const { error } = await getClient().storage.from(bucket).remove([path])
  if (error) throw error
}

export async function getCommunityPhotos(): Promise<string[]> {
  try {
    const files = await listFiles(BUCKETS.community)
    return files.filter(f => f.name !== '.emptyFolderPlaceholder').slice(0, 6).map(f => getPublicUrl(BUCKETS.community, f.name))
  } catch { return [] }
}

export async function getHeroPhotos(): Promise<string[]> {
  try {
    const files = await listFiles(BUCKETS.hero)
    return files.filter(f => f.name !== '.emptyFolderPlaceholder').slice(0, 9).map(f => getPublicUrl(BUCKETS.hero, f.name))
  } catch { return [] }
}

export async function getAboutPhoto(): Promise<string | null> {
  try {
    const files = await listFiles(BUCKETS.about)
    const photo = files.filter(f => f.name !== '.emptyFolderPlaceholder')[0]
    if (!photo) return null
    return getPublicUrl(BUCKETS.about, photo.name)
  } catch { return null }
}

export async function getProgrammePhoto(slug: string): Promise<string | null> {
  try {
    const files = await listFiles(BUCKETS.programmes)
    const photo = files.find(f => f.name.startsWith(slug))
    if (!photo) return null
    return getPublicUrl(BUCKETS.programmes, photo.name)
  } catch { return null }
}

export async function getMediaLibrary() {
  try {
    const files = await listFiles(BUCKETS.media)
    return files.filter(f => f.name !== '.emptyFolderPlaceholder').map(f => ({
      name: f.name, url: getPublicUrl(BUCKETS.media, f.name),
      size: f.metadata?.size || 0, created: f.created_at,
    }))
  } catch { return [] }
}

export function safeFileName(original: string, prefix = ''): string {
  const ext = original.split('.').pop()?.toLowerCase() || 'jpg'
  const timestamp = Date.now()
  const slug = prefix ? `${prefix}-${timestamp}` : `photo-${timestamp}`
  return `${slug}.${ext}`
}

export function isAdminPassword(password: string): boolean {
  return password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD
}
