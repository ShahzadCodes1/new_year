import { HubPageTemplate } from '@/components/guide/templates';
import { citiesHub } from '@/content/guides/hubs';
import { pageMeta } from '@/lib/meta';

export const metadata = pageMeta(citiesHub);

export default function Page() {
  return <HubPageTemplate page={citiesHub} />;
}
