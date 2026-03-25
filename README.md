# ProblemBase

ProblemBase is a Next.js 16 App Router project focused on problem discovery, founder analysis, and startup opportunity exploration.

## Local development

1. Copy `.env.example` to `.env.local`
2. Set `MONGODB_URI`
3. Set `NEXT_PUBLIC_SITE_URL=http://localhost:3000`
4. Run `npm install`
5. Run `npm run dev`

## Vercel deployment

If Vercel shows the default Next.js starter page, it is usually deploying the wrong repository, the wrong branch, or the wrong root directory.

Use these settings:

- Framework Preset: `Next.js`
- Root Directory: `.` if this repository is `ProblemBase`
- Install Command: `npm ci`
- Build Command: `npm run build`

Required environment variables:

- `MONGODB_URI`
- `NEXT_PUBLIC_SITE_URL`

Recommended production value:

- `NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app`

## Important

In production, the app no longer falls back to local MongoDB. If `MONGODB_URI` is missing, the build or runtime will fail clearly so Vercel does not silently point at `localhost`.

## Verification

```bash
npm run lint
npm run build
```
