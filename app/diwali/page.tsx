import { CelebrationGuideTemplate } from '@/components/guide/templates';
import { celebrationGuides } from '@/content/guides';
import { pageMeta } from '@/lib/meta';

const guide = celebrationGuides['diwali'];

export const metadata = pageMeta(guide);

export default function Page() {
  return <CelebrationGuideTemplate guide={guide} />;
}
