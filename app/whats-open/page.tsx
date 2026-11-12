import { AnswerPageTemplate } from '@/components/guide/templates';
import { whatsOpen } from '@/content/guides/practical-pages';
import { pageMeta } from '@/lib/meta';

export const metadata = pageMeta(whatsOpen);

export default function Page() {
  return <AnswerPageTemplate page={whatsOpen} />;
}
