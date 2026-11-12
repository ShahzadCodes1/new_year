import { BreaksGuideTemplate } from '@/components/guide/templates';
import { breaksHub } from '@/content/guides/breaks-hub';
import { pageMeta } from '@/lib/meta';

export const metadata = pageMeta(breaksHub);

export default function Page() {
  return <BreaksGuideTemplate guide={breaksHub} />;
}
