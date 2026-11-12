import type { Metadata } from 'next';
import { SiteHeader } from '@/components/site/SiteHeader';
import { LoaderFireworks } from '@/experience/LoaderFireworks';
import { Button } from '@/components/ui/Button';
import { Section, type Tone } from '@/components/ui/Section';
import { TextLink } from '@/components/ui/TextLink';
import { nav } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Style guide',
  description: 'The design system for newyear.guide: palette, type scale, tones and core components.',
  alternates: { canonical: '/styleguide/' },
  robots: { index: false, follow: false },
};

const palette = [
  { name: 'Midnight Navy', token: 'navy', hex: '#080D19', use: 'The night ground' },
  { name: 'Deep Blue', token: 'blue', hex: '#111C30', use: 'Raised dark ground' },
  { name: 'Warm Blush White', token: 'blush', hex: '#F3ECEA', use: 'Headings and text on dark' },
  { name: 'Soft White', token: 'snow', hex: '#F4F6FA', use: 'The light ground; filled actions and the current tab on dark' },
  { name: 'Celebration Red', token: 'red', hex: '#C94B43', use: 'The accent on dark: rules, markers, outlines. Never small text' },
  { name: 'Muted Silver Blue', token: 'silver', hex: '#73859B', use: 'Secondary text on navy' },
];

const scale = [
  { cls: 'text-hero font-display font-semibold', label: 'Hero · 46–112px', sample: 'Every New Year on Earth' },
  { cls: 'text-section font-display font-semibold', label: 'Section · 38–72px', sample: 'Where will you be at midnight?' },
  { cls: 'text-card font-display font-semibold', label: 'Card · 28–38px', sample: 'New Year in the Peak District' },
  { cls: 'text-sub', label: 'Subheading · 18–24px', sample: 'Fireworks, parties, dinners and a quiet one.' },
  { cls: 'text-body', label: 'Body · 16–18px', sample: 'The bridge closes to traffic at eight. Arrive on foot from the north bank.' },
  { cls: 'text-nav font-medium', label: 'Navigation · 14px', sample: 'Cities   Breaks   Celebrations   Practical' },
  { cls: 'text-label', label: 'Label · 12px', sample: 'Last checked 9 November' },
];

const tones: { tone: Tone; name: string; note: string }[] = [
  { tone: 'night', name: 'Night', note: 'Midnight Navy. The default ground, and the one the scenes sit on.' },
  { tone: 'deep', name: 'Deep', note: 'Deep Blue. Calm editorial sections between scenes.' },
  { tone: 'light', name: 'Light', note: 'Soft White. Reading sections. The accent becomes navy here.' },
];

export default function StyleGuide() {
  return (
    <div className="pt-20">
      <Section labelledBy="sg-title">
        <p className="text-label text-(--muted)">Design system</p>
        <h1 id="sg-title" className="mt-3 text-section">
          Style guide
        </h1>
        <p className="mt-6 max-w-prose text-sub text-(--muted)">
          The tokens and components every page is built from. This page is for review and is not indexed.
        </p>
      </Section>

      <Section tone="deep" labelledBy="sg-palette">
        <h2 id="sg-palette" className="text-card">
          Palette
        </h2>
        <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 lg:grid-cols-6">
          {palette.map((c) => (
            <li key={c.token}>
              <div className="aspect-4/3 rounded-ui border border-(--rule)" style={{ backgroundColor: c.hex }} />
              <p className="mt-3 text-nav font-semibold">{c.name}</p>
              <p className="text-label text-(--muted)">{c.hex}</p>
              <p className="mt-1 text-label text-(--muted)">{c.use}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section labelledBy="sg-type">
        <h2 id="sg-type" className="text-card">
          Type scale
        </h2>
        <dl className="mt-10 divide-y divide-(--rule) border-y border-(--rule)">
          {scale.map((t) => (
            <div key={t.label} className="grid gap-2 py-6 md:grid-cols-[14rem_1fr] md:items-baseline md:gap-8">
              <dt className="text-label text-(--muted)">{t.label}</dt>
              <dd className={`${t.cls} min-w-0 whitespace-pre-wrap wrap-break-word`}>{t.sample}</dd>
            </div>
          ))}
        </dl>
      </Section>

      {tones.map(({ tone, name, note }) => (
        <Section key={tone} tone={tone} labelledBy={`sg-tone-${tone}`}>
          <h2 id={`sg-tone-${tone}`} className="text-card">
            {name} ground
          </h2>
          <p className="mt-4 max-w-prose text-(--muted)">{note}</p>
          <p className="mt-6 max-w-prose">
            Body copy sits at a comfortable measure. A link inside it looks like{' '}
            <TextLink href="/styleguide/">this link to the style guide</TextLink>, underlined so colour is never the only cue.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button href="/">See the home page</Button>
            <Button href="/" variant="secondary">
              Secondary action
            </Button>
          </div>
        </Section>
      ))}

      <Section tone="deep" labelledBy="sg-header">
        <h2 id="sg-header" className="text-card">
          Header with navigation
        </h2>
        <p className="mt-4 max-w-prose text-(--muted)">
          Shown here with every planned section. On the live header each link appears once its page exists. Below 768px the
          links move into a full-screen menu.
        </p>
        <div className="mt-8 border border-(--rule)">
          <SiteHeader items={nav} inline />
        </div>
      </Section>

      <Section tone="night" labelledBy="sg-fireworks">
        <h2 id="sg-fireworks" className="text-card">
          Opening-screen fireworks
        </h2>
        <p className="mt-4 max-w-prose text-(--muted)">
          The fireworks that play on the home page’s opening screen while the scene loads, shown here on their own. Shells rise
          from the horizon line, burst and fall away, with a faint reflection below it. Visitors who ask for less motion never
          see the opening screen, so they never see these.
        </p>
        <div className="relative mt-8 aspect-[16/9] max-h-[70svh] w-full overflow-hidden border border-(--rule) bg-navy [&>canvas]:absolute [&>canvas]:inset-0 [&>canvas]:h-full [&>canvas]:w-full">
          <LoaderFireworks active />
          <div aria-hidden="true" className="absolute inset-x-[15%] top-1/2 h-px bg-blush/20" />
        </div>
      </Section>
    </div>
  );
}
