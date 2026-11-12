import { HubPageTemplate } from '@/components/guide/templates';
import { celebrationsHub } from '@/content/guides/hubs';
import { pageMeta } from '@/lib/meta';

export const metadata = pageMeta(celebrationsHub);

export default function Page() {
  return <HubPageTemplate page={celebrationsHub} />;
}
