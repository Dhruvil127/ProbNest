import type { MetadataRoute } from 'next';
import { DEMO_PROBLEMS } from '@/lib/demo-content';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://problembase.com';

  const staticRoutes: MetadataRoute.Sitemap = [
    '',
    '/categories',
    '/favorites',
    '/submit',
    '/admin',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : 0.7,
  }));

  const problemRoutes: MetadataRoute.Sitemap = DEMO_PROBLEMS.map((problem) => ({
    url: `${baseUrl}/problem/${problem.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [...staticRoutes, ...problemRoutes];
}
