'use client';

import { useEffect, useState } from 'react';

/** Time left until midnight on New Year's Eve in the UK. Rendered on the client only, so server and browser never disagree. */
export function Countdown({ labelledBy }: { labelledBy: string }) {
  const [left, setLeft] = useState<number | null>(null);

  useEffect(() => {
    // Midnight in the UK is UTC in winter, so the target is 1 January 00:00 UTC.
    const target = Date.UTC(new Date().getUTCFullYear() + 1, 0, 1);
    const tick = () => setLeft(Math.max(0, target - Date.now()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  // The row keeps its height before the first tick, so nothing shifts when the numbers arrive.
  if (left === null) return <div className="countdown" aria-hidden="true" />;

  const s = Math.floor(left / 1000);
  const parts: [number, string][] = [
    [Math.floor(s / 86400), 'days'],
    [Math.floor((s % 86400) / 3600), 'hours'],
    [Math.floor((s % 3600) / 60), 'minutes'],
    [s % 60, 'seconds'],
  ];

  return (
    <div className="countdown" role="timer" aria-labelledby={labelledBy}>
      {parts.map(([n, label]) => (
        <div key={label}>
          <b>{String(n).padStart(2, '0')}</b>
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}
