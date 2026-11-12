import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';

type Variant = 'primary' | 'secondary';

const base =
  'inline-flex min-h-11 items-center justify-center rounded-ui px-6 font-sans text-nav font-semibold ' +
  'transition-[background-color,border-color,color,transform] duration-200 ease-soft active:translate-y-px';

// Colours come from the section's tone, so one button works on night, deep and light grounds.
const variants: Record<Variant, string> = {
  primary: 'bg-(--cta-bg) text-(--cta-fg) hover:bg-(--cta-hover)',
  secondary: 'border border-(--rule) text-(--fg) hover:border-(--fg)',
};

interface Common {
  variant?: Variant;
  children: ReactNode;
  className?: string;
}

type ButtonProps = Common &
  (({ href: string } & Omit<ComponentProps<typeof Link>, 'href' | 'className' | 'children'>) |
    ({ href?: undefined } & Omit<ComponentProps<'button'>, 'className' | 'children'>));

/** An action. Renders a link when it navigates and a button when it does something on the page. */
export function Button({ variant = 'primary', className = '', children, ...rest }: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${className}`;
  if (rest.href !== undefined) {
    return (
      <Link {...rest} className={classes}>
        {children}
      </Link>
    );
  }
  return (
    <button type="button" {...rest} className={classes}>
      {children}
    </button>
  );
}
