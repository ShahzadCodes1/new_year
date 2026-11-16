import { EventCard } from '@/components/events/EventsDirectory';
import { TextLink } from '@/components/ui/TextLink';
import { cityEventsPath, events as allEvents, eventCategories } from '@/content/events';
import type { AnswerPage, BreaksGuide, CelebrationGuide, CityGuide, EventGuide, HubPage, ProsePage } from '@/content/guides/types';
import { Block, Cards, Faq, Guide, Passage, Points, Prose, longDate } from './blocks';

const capital = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);

/**
 * The seven templates. Each takes a page's data and lays it out in a fixed order, so every page of a kind
 * reads the same way. The grounds alternate so a long page has a rhythm: dark, raised dark, and one light
 * block for the practical part.
 */

/**
 * The real ticketed events in a city, from the events directory. A city guide shows them so that its
 * listings are verified ones; a large city shows a selection and links to its own events page.
 */
function CityEvents({ place, occasion }: { place: string; occasion: string }) {
  const here = allEvents.filter((event) => event.city === place);
  if (here.length === 0) return null;
  const page = cityEventsPath(place);
  // One of each kind, in the directory's order, so a selection shows the range rather than six parties.
  const shown = page
    ? eventCategories.map((category) => here.find((event) => event.category === category.id)).filter((event) => event !== undefined).slice(0, 6)
    : here;
  const checked = here.map((event) => event.checked).sort().at(-1)!;
  return (
    <Block
      id="events"
      tone="deep"
      title={`Ticketed ${occasion} events in ${place}`}
      lede={`Real events with paid tickets, each checked on the organiser’s or seller’s own page on ${longDate(checked)}. Prices and times can change, so confirm on the seller’s page before you pay.`}
    >
      <ul className="e-list">
        {shown.map((event) => (
          <li key={event.id}>
            <EventCard event={event} />
          </li>
        ))}
      </ul>
      <p className="g-more">
        {page ? (
          <TextLink href={page}>
            All {here.length} ticketed events in {place}
          </TextLink>
        ) : (
          <TextLink href="/events/">New Year’s Eve events in other UK cities</TextLink>
        )}
      </p>
    </Block>
  );
}

/** A city guide: the plan's seven blocks, with the city's verified events after the ways to spend the night. */
export function CityGuideTemplate({ guide }: { guide: CityGuide }) {
  const { place, occasion } = guide;
  const hasEvents = allEvents.some((event) => event.city === place);
  const contents = [
    { id: 'midnight', label: 'Midnight' },
    { id: 'ways', label: 'Ways to spend it' },
    ...(hasEvents ? [{ id: 'events', label: 'Ticketed events' }] : []),
    { id: 'stay', label: 'Where to stay' },
    { id: 'logistics', label: 'Getting home' },
    { id: 'questions', label: 'Questions' },
  ];
  return (
    <Guide page={guide} contents={contents}>
      <Block id="midnight" title={`Where to be at midnight in ${place}`}>
        <Passage {...guide.moment} />
      </Block>
      <Block id="ways" tone={hasEvents ? 'night' : 'deep'} title={`Ways to spend ${occasion} in ${place}`} lede={guide.ways.lede}>
        <Cards picks={guide.ways.picks} />
      </Block>
      <CityEvents place={place} occasion={occasion} />
      <Block id="stay" title={`Where to stay in ${place} for ${occasion}`} lede={guide.stay.lede}>
        <Cards picks={guide.stay.picks} />
      </Block>
      <Block id="logistics" tone="light" title={`Getting to ${place} and home after midnight`}>
        <Passage {...guide.logistics} />
      </Block>
      <Block id="questions" title={`${occasion} in ${place}: questions people ask`}>
        <Faq questions={guide.faq} />
      </Block>
    </Guide>
  );
}

/** An event or experience: what and when, where to watch, tickets, logistics, questions. */
export function EventGuideTemplate({ guide }: { guide: EventGuide }) {
  const contents = [
    { id: 'what', label: 'What and when' },
    { id: 'watch', label: 'Where to watch' },
    { id: 'tickets', label: 'Tickets' },
    { id: 'logistics', label: 'Getting there and home' },
    { id: 'questions', label: 'Questions' },
  ];
  return (
    <Guide page={guide} contents={contents}>
      <Block id="what" title={`${capital(guide.subject)}: when and what happens`}>
        <Passage {...guide.what} />
      </Block>
      <Block id="watch" tone="deep" title={`Where to watch ${guide.subject}`} lede={guide.watch.lede}>
        <Cards picks={guide.watch.picks} />
      </Block>
      <Block id="tickets" title={`Tickets and prices for ${guide.subject}`}>
        <Passage {...guide.tickets} />
      </Block>
      <Block id="logistics" tone="light" title={`Getting to and from ${guide.subject}`}>
        <Passage {...guide.logistics} />
      </Block>
      <Block id="questions" title={`Questions about ${guide.subject}`}>
        <Faq questions={guide.faq} />
      </Block>
    </Guide>
  );
}

/** A breaks roundup: picks by type, how to choose, booking notes, questions. */
export function BreaksGuideTemplate({ guide }: { guide: BreaksGuide }) {
  const contents = [
    { id: 'picks', label: 'Picks by type' },
    { id: 'choose', label: 'How to choose' },
    { id: 'booking', label: 'Booking notes' },
    { id: 'questions', label: 'Questions' },
  ];
  return (
    <Guide page={guide} contents={contents}>
      <Block id="picks" title={`${capital(guide.subject)}: our picks`} lede={guide.picks.lede}>
        <Cards picks={guide.picks.picks} />
      </Block>
      <Block id="choose" tone="deep" title={`Choosing ${guide.subject}`}>
        <Points points={guide.choose} />
      </Block>
      <Block id="booking" tone="light" title={`When to book ${guide.subject}`}>
        <Passage {...guide.booking} />
      </Block>
      <Block id="questions" title={`${capital(guide.subject)}: questions people ask`}>
        <Faq questions={guide.faq} />
      </Block>
    </Guide>
  );
}

/** A celebration: what it is and when, how it is marked, where in the UK, traditions, questions. */
export function CelebrationGuideTemplate({ guide }: { guide: CelebrationGuide }) {
  const contents = [
    { id: 'what', label: 'What it is and when' },
    { id: 'marked', label: 'How it is marked' },
    { id: 'where', label: 'Where in the UK' },
    { id: 'traditions', label: 'Traditions' },
    { id: 'questions', label: 'Questions' },
  ];
  return (
    <Guide page={guide} contents={contents}>
      <Block id="what" title={`When is ${guide.name}, and what is it?`}>
        <Passage {...guide.what} />
      </Block>
      <Block id="marked" tone="deep" title={`How ${guide.name} is celebrated`} lede={guide.marked.lede}>
        <Cards picks={guide.marked.picks} />
      </Block>
      <Block id="where" title={`Where to celebrate ${guide.name} in the UK`} lede={guide.where.lede}>
        <Cards picks={guide.where.picks} />
      </Block>
      <Block id="traditions" tone="light" title={`${guide.name} traditions`}>
        <Points points={guide.traditions} />
      </Block>
      <Block id="questions" title={`${guide.name}: questions people ask`}>
        <Faq questions={guide.faq} />
      </Block>
    </Guide>
  );
}

/** A practical answer: the answer in the first sentence, then the detail, any sets of cards, and the source. */
export function AnswerPageTemplate({ page }: { page: AnswerPage }) {
  const groups = page.groups ?? [];
  return (
    <Guide page={page}>
      <Block id="answer" tone="light" title="The short answer">
        <p className="g-answer">{page.answer}</p>
      </Block>
      <Block id="detail" title="The detail">
        <Passage {...page.detail} />
        {page.source && (
          <p className="g-updated">
            Source: <TextLink href={page.source.href}>{page.source.label}</TextLink>
          </p>
        )}
      </Block>
      {groups.map((group, i) => (
        <Block key={group.id} id={group.id} tone={i % 2 ? 'night' : 'deep'} title={group.title} lede={group.lede}>
          <Cards picks={group.picks} />
        </Block>
      ))}
      {page.faq && page.faq.length > 0 && (
        <Block id="questions" tone={groups.length % 2 ? 'deep' : 'night'} title="Questions people ask">
          <Faq questions={page.faq} />
        </Block>
      )}
      {page.related.length > 0 && (
        <Block id="related" tone={(groups.length + (page.faq?.length ? 1 : 0)) % 2 ? 'night' : 'deep'} title="Related">
          <Cards picks={page.related.map((r) => ({ name: r.label, text: r.text, href: r.href }))} />
        </Block>
      )}
    </Guide>
  );
}

/** A hub: the pages below it, set out as headed sets of cards. */
export function HubPageTemplate({ page }: { page: HubPage }) {
  return (
    <Guide page={page}>
      {page.intro && page.intro.length > 0 && (
        <Block id="intro" title="In short">
          <Prose paragraphs={page.intro} />
        </Block>
      )}
      {page.groups.map((group, i) => (
        <Block key={group.id} id={group.id} tone={(i + (page.intro?.length ? 1 : 0)) % 2 ? 'deep' : 'night'} title={group.title} lede={group.lede}>
          <Cards picks={group.picks} />
        </Block>
      ))}
      {page.faq && page.faq.length > 0 && (
        <Block id="questions" title="Questions people ask">
          <Faq questions={page.faq} />
        </Block>
      )}
    </Guide>
  );
}

/** A site page: headed passages of plain prose. */
export function ProsePageTemplate({ page }: { page: ProsePage }) {
  return (
    <Guide page={page}>
      {page.sections.map((section, i) => (
        <Block key={section.heading} id={`section-${i + 1}`} tone={i % 2 ? 'deep' : 'night'} title={section.heading}>
          <Prose paragraphs={section.body} />
        </Block>
      ))}
    </Guide>
  );
}
