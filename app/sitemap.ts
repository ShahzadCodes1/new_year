import type { MetadataRoute } from 'next';
import { builtPaths } from '@/lib/routes';
import { site } from '@/lib/site';

/** Every indexable route: the home page and each reading page that exists. */
export default function sitemap(): MetadataRoute.Sitemap {
  if (!site.live) return [];
  return builtPaths.map((path) => ({ url: `${site.url}${path}`, changeFrequency: 'weekly', priority: path === '/' ? 1 : 0.7 }));
}
