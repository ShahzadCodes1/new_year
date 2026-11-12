import { ProsePageTemplate } from '@/components/guide/templates';
import { disclosure } from '@/content/guides/site-pages';
import { pageMeta } from '@/lib/meta';

export const metadata = pageMeta(disclosure);

export default function Page() {
  return <ProsePageTemplate page={disclosure} />;
}
