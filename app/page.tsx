import { Breaks } from '@/components/home/Breaks';
import { Close } from '@/components/home/Close';
import { Practical } from '@/components/home/Practical';
import { Ways } from '@/components/home/Ways';
import { YearRing } from '@/components/home/YearRing';
import { Button } from '@/components/ui/Button';
import { Section } from '@/components/ui/Section';
import { breakTypes, breaksHub } from '@/content/breaks';
import { celebrations } from '@/content/celebrations';
import { cities } from '@/content/cities';
import { practical } from '@/content/practical';
import { ways } from '@/content/ways';
import { Countdown } from '@/experience/Countdown';
import { DAWN_AT, PRELOADS } from '@/experience/boot';
import { Cities } from '@/experience/Cities';
import { Experience } from '@/experience/Experience';
import { ScrollLine } from '@/experience/ScrollLine';
import { Still } from '@/experience/Still';
import { isBuilt } from '@/lib/routes';
import { site } from '@/lib/site';

// Who publishes the site and what it is. Nothing here that is not plainly true of the page.
const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'Organization', '@id': `${site.url}/#organization`, name: site.name, url: `${site.url}/` },
    {
      '@type': 'WebSite',
      '@id': `${site.url}/#website`,
      name: site.name,
      url: `${site.url}/`,
      description: site.description,
      inLanguage: site.locale,
      publisher: { '@id': `${site.url}/#organization` },
    },
  ],
};

// The home page names pages that are not written yet. Each entry keeps its words and its picture; its link
// is shown only once the page it leads to exists.
const liveCities = cities.map((city) => ({ ...city, links: city.links.filter((link) => isBuilt(link.href)) }));
const liveWays = ways.map((way) => ({ ...way, links: way.links.filter((link) => isBuilt(link.href)) }));
const liveBreaks = breakTypes.map((type) => ({ ...type, href: type.href && isBuilt(type.href) ? type.href : undefined }));
const liveCelebrations = celebrations.map((c) => ({ ...c, href: c.href && isBuilt(c.href) ? c.href : undefined }));
const livePractical = practical.map((item) => ({ ...item, link: item.link && isBuilt(item.link.href) ? item.link : undefined }));

// Translucent navy behind the outline, so the second action stays legible on a photograph. No backdrop blur:
// blurring a moving 3D scene behind a button costs frames on every device.
const overPhoto = 'border-snow/45 bg-navy/55 hover:border-snow';

/** The home page: one night told in chapters. Chapters are built and approved one at a time. */
export default function Home() {
  return (
    <>
      {/* The opening scene's files start downloading with the page, not after it has hydrated. */}
      {PRELOADS.map(({ href, media }) => (
        <link key={href} rel="preload" as="fetch" crossOrigin="anonymous" href={href} media={media} />
      ))}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <Experience>
        {/* Chapter 1: London, one minute to midnight. */}
        <section id="top" className="chapter chapter--hero" data-span="1" data-leave aria-labelledby="hero-title">
          <Still name="hero" eager />
          <div className="chapter__hold">
            <h1 id="hero-title" className="text-hero">
              The guide to every New Year on Earth
            </h1>
            <p className="lede">
              From the first midnight to the last, discover how the world celebrates New Year.
            </p>
            <div className="hero__clock">
              <p id="countdown-label">Until midnight on 31 December, UK time</p>
              <Countdown labelledBy="countdown-label" />
            </div>
            <div className="hero__actions">
              <Button href="#cities">Find your New Year’s Eve</Button>
              <Button href="#breaks" variant="secondary" className={overPhoto}>
                Browse New Year breaks
              </Button>
            </div>
            <a className="scroll-cue" href="#midnight">
              Scroll to begin
            </a>
          </div>
        </section>

        {/* Chapter 2: a line of type comes up as you scroll, the sky answers it, and the one spectacle begins. */}
        <section id="midnight" className="chapter chapter--midnight" data-span="1" aria-labelledby="midnight-title">
          <Still name="midnight" />
          <div className="chapter__hold">
            <h2 id="midnight-title" className="text-section">
              <ScrollLine text="Every New Year begins the same way." from={0.8} to={1.2} />{' '}
              <span className="answer">With everyone looking up.</span>
            </h2>
          </div>
        </section>

        {/* Chapter 3: the cities, one at a time. Scrolling moves between them and the tabs jump to one. */}
        <section
          id="cities"
          className="chapter chapter--cities"
          data-span={cities.length - 1}
          style={{ '--stations': cities.length } as React.CSSProperties}
          aria-labelledby="cities-title"
        >
          <div className="chapter__hold">
            <h2 id="cities-title" className="text-card">
              Where will you be at midnight?
            </h2>
            <Cities cities={liveCities} />
          </div>
        </section>

        {/* Chapter 4: the ways to spend the night. An ordinary page section: it rises over the scene and covers
            it, and while it does the scene moves on to the valley where the next chapter opens. */}
        <div data-span="1" data-cover>
          <Section tone="deep" id="ways" labelledBy="ways-title" className="relative z-1 min-h-svh">
            <Ways ways={liveWays}>
              <h2 id="ways-title" className="text-section">
                How do you want to see it in?
              </h2>
              <p className="ways__lede">Start with the kind of night. The city comes second.</p>
            </Ways>
          </Section>
        </div>

        {/* Chapter 5: the morning after. The scene comes back as a frosted valley at night, the last fireworks
            far off, and turns to first light as the chapter is held. It ends in daylight, so the header keeps
            its ground. */}
        <section id="morning" className="chapter chapter--dawn" data-span="1.5" data-daylight aria-labelledby="morning-title">
          <Still name="dawn" />
          <div className="chapter__hold">
            <h2 id="morning-title" className="text-section">
              <ScrollLine text="And then it is morning." from={DAWN_AT + 0.1} to={DAWN_AT + 0.6} strikeAt={DAWN_AT + 0.95} />{' '}
              <span className="answer">The year starts quietly.</span>
            </h2>
          </div>
        </section>
      </Experience>

      {/* Chapter 5, continued: the page turns light for New Year breaks. */}
      <Section tone="light" id="breaks" labelledBy="breaks-title" className="relative z-1">
        <Breaks lead={breaksHub.image} types={liveBreaks}>
          <h2 id="breaks-title" className="text-section">
            Make a break of it.
          </h2>
          <p className="breaks__lede">The night is a few hours. A glen, a stone village or a deck at sea can carry it for days.</p>
          <p className="breaks__action">
            <Button href={breaksHub.href}>
              Browse New Year breaks
            </Button>
          </p>
        </Breaks>
      </Section>

      {/* Chapter 6: every New Year on Earth. Back to dark: the year as a ring of celebrations that turns as
          the page scrolls. */}
      <YearRing celebrations={liveCelebrations}>
        <h2 id="year-title">The year has more than one beginning.</h2>
        <p className="year__lede">The thirty-first of December is one New Year. These are some of the others, and when each comes round next.</p>
      </YearRing>

      {/* Chapter 7: the useful bits. Light again: short questions, each answered in its first words. */}
      <Section tone="light" id="practical" labelledBy="practical-title" className="relative z-1">
        <Practical items={livePractical}>
          <h2 id="practical-title" className="text-section">
            The useful bits.
          </h2>
          <p className="practical__lede">Short answers. The detail, and where each one comes from, is a click away.</p>
        </Practical>
      </Section>

      {/* Chapter 8: the close. A last quiet frame, the two main ways on, and a plain word about the letter:
          there is no form until there is a letter to send. */}
      <Close>
        <h2 id="close-title" className="text-section">
          However you see it in, see it in well.
        </h2>
        <p className="close__lede">Pick a city, plan a break, or find the New Year that is yours.</p>
        <p className="close__actions">
          <Button href="#cities">Find your New Year’s Eve</Button>
          <Button href="#breaks" variant="secondary">
            Browse New Year breaks
          </Button>
        </p>
        <div className="close__letter">
          <h3>The letter</h3>
          <p>A short note before each New Year: what is on, and what is new in the guides. It opens when the guides do. There is nothing to sign up to yet.</p>
        </div>
      </Close>
    </>
  );
}
