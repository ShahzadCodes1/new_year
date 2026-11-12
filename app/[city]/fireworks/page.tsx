import { notFound } from 'next/navigation';
import { EventGuideTemplate } from '@/components/guide/templates';
import { fireworksGuides } from '@/content/guides';
import { pageMeta } from '@/lib/meta';

interface Props {
  params: Promise<{ city: string }>;
}

// The page is chosen by its address, so a move to it waits for the page itself (one small prerendered
// file) and has no placeholder to show first. Saying so keeps unknown addresses as real 404s, which a
// placeholder would turn into a page that loads and then says it is missing.
export const instant = false;

export const generateStaticParams = () => Object.keys(fireworksGuides).map((city) => ({ city }));

export async function generateMetadata({ params }: Props) {
  const guide = fireworksGuides[(await params).city];
  return guide ? pageMeta(guide) : { title: 'Page not found' };
}

export default async function FireworksPage({ params }: Props) {
  const guide = fireworksGuides[(await params).city];
  if (!guide) notFound();
  return <EventGuideTemplate guide={guide} />;
}
