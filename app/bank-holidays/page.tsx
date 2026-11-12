import { AnswerPageTemplate } from '@/components/guide/templates';
import { bankHolidays } from '@/content/guides/site-pages';
import { pageMeta } from '@/lib/meta';

export const metadata = pageMeta(bankHolidays);

export default function Page() {
  return <AnswerPageTemplate page={bankHolidays} />;
}
