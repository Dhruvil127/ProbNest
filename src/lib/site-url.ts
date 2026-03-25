const DEFAULT_SITE_URL = 'https://problembase.com';

export function getSiteUrl() {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    process.env.VERCEL_URL;

  if (!siteUrl) {
    return DEFAULT_SITE_URL;
  }

  if (siteUrl.startsWith('http://') || siteUrl.startsWith('https://')) {
    return siteUrl;
  }

  return `https://${siteUrl}`;
}
