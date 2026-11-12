import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Manrope } from 'next/font/google';
import { SiteFooter } from '@/components/site/SiteFooter';
import { SiteHeader } from '@/components/site/SiteHeader';
import { BOOT } from '@/experience/boot';
import { footerNav, readyNav, site } from '@/lib/site';
import './globals.css';

// Self-hosted at build time: no request leaves for Google, and no layout shift when the fonts arrive.
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['500', '600'],
  variable: '--font-cormorant',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
});

// Every route is prerendered. The build fails if a later change makes one render per request.
export const ensureStatic = 'navigation';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} · ${site.tagline}`, template: `%s · ${site.name}` },
  description: site.description,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: site.name,
    locale: 'en_GB',
    title: site.tagline,
    description: site.description,
    url: '/',
    images: [site.sharingImage],
  },
  twitter: { card: 'summary_large_image' },
  robots: site.live ? { index: true, follow: true } : { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: '#080d19',
  colorScheme: 'dark',
  viewportFit: 'cover',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // Served as the still version; the boot script removes `is-still` before first paint when the scene can
    // run, and sets its own classes. React must not treat either as a mismatch.
    <html lang={site.locale} className={`${cormorant.variable} ${manrope.variable} is-still`} suppressHydrationWarning>
      <body>
        {/* Runs before first paint: chooses the live scene or the stills, and raises the home page's opening screen. */}
        <script dangerouslySetInnerHTML={{ __html: BOOT }} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-ui focus:bg-snow focus:px-4 focus:py-3 focus:text-nav focus:font-semibold focus:text-navy"
        >
          Skip to content
        </a>
        <SiteHeader items={readyNav} />
        <main id="main" className="relative z-1">
          {children}
        </main>
        <SiteFooter items={footerNav} />
      </body>
    </html>
  );
}
