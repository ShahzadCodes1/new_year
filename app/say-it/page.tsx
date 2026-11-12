import { AnswerPageTemplate } from '@/components/guide/templates';
import { sayIt } from '@/content/guides/practical-pages';
import { pageMeta } from '@/lib/meta';

export const metadata = pageMeta(sayIt);

export default function Page() {
  return <AnswerPageTemplate page={sayIt} />;
}
