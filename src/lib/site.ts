const fromVercel = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : undefined;

/** Canonical public URL of the site, without a trailing slash. */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  fromVercel ??
  "http://localhost:3000"
).replace(/\/$/, "");
