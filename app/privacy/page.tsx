import { ProsePageTemplate } from '@/components/guide/templates';
import { privacy } from '@/content/guides/site-pages';
import { pageMeta } from '@/lib/meta';

export const metadata = pageMeta(privacy);

export default function Page() {
  return <ProsePageTemplate page={privacy} />;
}
