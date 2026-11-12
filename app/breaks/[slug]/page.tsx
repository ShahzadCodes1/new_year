import { notFound } from 'next/navigation';
import { BreaksGuideTemplate } from '@/components/guide/templates';
import { breakGuides } from '@/content/guides';
import { pageMeta } from '@/lib/meta';

interface Props {
  params: Promise<{ slug: string }>;
}

// The page is chosen by its address, so a move to it waits for the page itself (one small prerendered
// file) and has no placeholder to show first. Saying so keeps unknown addresses as real 404s, which a
// placeholder would turn into a page that loads and then says it is missing.
export const instant = false;

export const generateStaticParams = () => Object.keys(breakGuides).map((slug) => ({ slug }));

export async function generateMetadata({ params }: Props) {
  const guide = breakGuides[(await params).slug];
  return guide ? pageMeta(guide) : { title: 'Page not found' };
}

export default async function BreaksPage({ params }: Props) {
  const guide = breakGuides[(await params).slug];
  if (!guide) notFound();
  return <BreaksGuideTemplate guide={guide} />;
}
