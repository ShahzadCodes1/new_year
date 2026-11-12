import { HubPageTemplate } from '@/components/guide/templates';
import { practicalHub } from '@/content/guides/hubs';
import { pageMeta } from '@/lib/meta';

export const metadata = pageMeta(practicalHub);

export default function Page() {
  return <HubPageTemplate page={practicalHub} />;
}
