import { HubPageTemplate } from '@/components/guide/templates';
import { worldHub } from '@/content/guides/hubs';
import { pageMeta } from '@/lib/meta';

export const metadata = pageMeta(worldHub);

export default function Page() {
  return <HubPageTemplate page={worldHub} />;
}
