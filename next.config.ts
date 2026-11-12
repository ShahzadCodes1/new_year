import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  // The URL scheme in the plan uses trailing slashes: /manchester/, /breaks/scotland/.
  trailingSlash: true,
  images: { formats: ['image/avif', 'image/webp'] },
  turbopack: {
    rules: {
      '*.css': { loaders: ['@tailwindcss/turbopack'], as: '*.css' },
    },
  },
  async headers() {
    // The scene's plates and stills keep their names when they are rebuilt, so they are cached for a day and
    // refreshed in the background for a week after, not for ever.
    const scenery = [{ key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=604800' }];
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          // The site is never meant to be shown inside another site's frame.
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()' },
        ],
      },
      { source: '/plates/:path*', headers: scenery },
      { source: '/stills/:path*', headers: scenery },
    ];
  },
};

export default nextConfig;
