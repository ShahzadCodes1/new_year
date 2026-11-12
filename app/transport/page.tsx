import { AnswerPageTemplate } from '@/components/guide/templates';
import { transport } from '@/content/guides/practical-pages';
import { pageMeta } from '@/lib/meta';

export const metadata = pageMeta(transport);

export default function Page() {
  return <AnswerPageTemplate page={transport} />;
}
