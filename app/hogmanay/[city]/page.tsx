import { notFound } from 'next/navigation';
import { CityGuideTemplate } from '@/components/guide/templates';
import { hogmanayGuides } from '@/content/guides';
import { pageMeta } from '@/lib/meta';

interface Props {
  params: Promise<{ city: string }>;
}

// The page is chosen by its address, so a move to it waits for the page itself (one small prerendered
// file) and has no placeholder to show first. Saying so keeps unknown addresses as real 404s, which a
// placeholder would turn into a page that loads and then says it is missing.
export const instant = false;

export const generateStaticParams = () => Object.keys(hogmanayGuides).map((city) => ({ city }));

export async function generateMetadata({ params }: Props) {
  const guide = hogmanayGuides[(await params).city];
  return guide ? pageMeta(guide) : { title: 'Page not found' };
}

export default async function HogmanayPage({ params }: Props) {
  const guide = hogmanayGuides[(await params).city];
  if (!guide) notFound();
  return <CityGuideTemplate guide={guide} />;
}
