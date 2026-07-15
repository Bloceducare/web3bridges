import { MetadataRoute } from 'next'
import { programmes } from '@/lib/programmes'
export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://web3bridgeafrica.com'
  const staticRoutes = ['','/programs','/blog','/about','/conference','/eth-hub','/alumni','/dapps','/partners','/contact','/apply'].map(r => ({ url: `${base}${r}`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: r === '' ? 1 : 0.8 }))
  const programmeRoutes = programmes.map(p => ({ url: `${base}/programs/${p.slug}`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.9 }))
  return [...staticRoutes, ...programmeRoutes]
}
