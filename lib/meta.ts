import type { Metadata } from 'next';
import type { PageBase } from '@/content/guides/types';
import { site } from '@/lib/site';

/** A reading page's title, description and address, for the browser tab, search results and shared links. */
export const pageMeta = (page: PageBase): Metadata => ({
  title: page.metaTitle,
  description: page.description,
  alternates: { canonical: page.path },
  // A page's sharing tags replace the site's wholesale, so the ones every page keeps are repeated here.
  openGraph: { type: 'article', siteName: site.name, locale: 'en_GB', title: page.metaTitle, description: page.description, url: page.path, images: [site.sharingImage] },
});
