import Link from 'next/link';
import type { ComponentProps } from 'react';

/**
 * A link inside running text or a list. The underline is always there, so colour is never the only cue, and it
 * is the colour of the words themselves: links carry no accent colour.
 */
export function TextLink({ className = '', ...props }: ComponentProps<typeof Link>) {
  return (
    <Link
      {...props}
      className={
        'underline decoration-current decoration-1 underline-offset-4 transition-[text-decoration-thickness,color] ' +
        `duration-200 ease-soft hover:decoration-2 ${className}`
      }
    />
  );
}
