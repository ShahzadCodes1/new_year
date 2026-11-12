import { ProsePageTemplate } from '@/components/guide/templates';
import { about } from '@/content/guides/site-pages';
import { pageMeta } from '@/lib/meta';

export const metadata = pageMeta(about);

export default function Page() {
  return <ProsePageTemplate page={about} />;
}
