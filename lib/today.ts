import { useSyncExternalStore } from 'react';

const subscribe = () => () => {};
const read = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

/**
 * Today's date where the reader is, as YYYY-MM-DD, for choosing which of several dated facts to show.
 * It is null on the server and while the page hydrates, where callers show the first fact listed: the page
 * never depends on the clock of the machine that built it.
 */
export const useToday = () => useSyncExternalStore(subscribe, read, () => null);

/** The first of a list of dated facts that has not passed. Before the date is known, the first one listed. */
export function current<T extends { until: string }>(dated: T[] | undefined, today: string | null): T | undefined {
  return dated?.find((d) => today === null || d.until >= today);
}
