import { ProsePageTemplate } from '@/components/guide/templates';
import { contact } from '@/content/guides/site-pages';
import { pageMeta } from '@/lib/meta';

export const metadata = pageMeta(contact);

export default function Page() {
  return <ProsePageTemplate page={contact} />;
}
