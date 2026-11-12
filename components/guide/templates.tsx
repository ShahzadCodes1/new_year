import { TextLink } from '@/components/ui/TextLink';
import type { AnswerPage, BreaksGuide, CelebrationGuide, CityGuide, EventGuide, HubPage, ProsePage } from '@/content/guides/types';
import { Block, Cards, Faq, Guide, Passage, Points, Prose } from './blocks';

/**
 * The seven templates. Each takes a page's data and lays it out in a fixed order, so every page of a kind
 * reads the same way. The grounds alternate so a long page has a rhythm: dark, raised dark, and one light
 * block for the practical part.
 */

/** A city guide: the plan's seven blocks. (The verdict opens the page; "last checked" closes it.) */
export function CityGuideTemplate({ guide }: { guide: CityGuide }) {
  const contents = [
    { id: 'midnight', label: 'The midnight moment' },
    { id: 'ways', label: 'Ways to spend the night' },
    { id: 'stay', label: 'Where to stay' },
    { id: 'logistics', label: 'Getting there and home' },
    { id: 'questions', label: 'Questions' },
  ];
  return (
    <Guide page={guide} contents={contents}>
      <Block id="midnight" title="The midnight moment">
        <Passage {...guide.moment} />
      </Block>
      <Block id="ways" tone="deep" title="Ways to spend the night" lede={guide.ways.lede}>
        <Cards picks={guide.ways.picks} />
      </Block>
      <Block id="stay" title="Where to stay" lede={guide.stay.lede}>
        <Cards picks={guide.stay.picks} />
      </Block>
      <Block id="logistics" tone="light" title="Getting there and getting home">
        <Passage {...guide.logistics} />
      </Block>
      <Block id="questions" title="Questions people ask">
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
      <Block id="what" title="What it is, and when">
        <Passage {...guide.what} />
      </Block>
      <Block id="watch" tone="deep" title="Where to watch" lede={guide.watch.lede}>
        <Cards picks={guide.watch.picks} />
      </Block>
      <Block id="tickets" title="Tickets">
        <Passage {...guide.tickets} />
      </Block>
      <Block id="logistics" tone="light" title="Getting there and getting home">
        <Passage {...guide.logistics} />
      </Block>
      <Block id="questions" title="Questions people ask">
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
      <Block id="picks" title="Picks by type" lede={guide.picks.lede}>
        <Cards picks={guide.picks.picks} />
      </Block>
      <Block id="choose" tone="deep" title="How to choose">
        <Points points={guide.choose} />
      </Block>
      <Block id="booking" tone="light" title="Booking notes">
        <Passage {...guide.booking} />
      </Block>
      <Block id="questions" title="Questions people ask">
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
      <Block id="what" title="What it is, and when">
        <Passage {...guide.what} />
      </Block>
      <Block id="marked" tone="deep" title="How it is marked" lede={guide.marked.lede}>
        <Cards picks={guide.marked.picks} />
      </Block>
      <Block id="where" title="Where in the UK" lede={guide.where.lede}>
        <Cards picks={guide.where.picks} />
      </Block>
      <Block id="traditions" tone="light" title="Traditions">
        <Points points={guide.traditions} />
      </Block>
      <Block id="questions" title="Questions people ask">
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
      {page.related.length > 0 && (
        <Block id="related" tone={groups.length % 2 ? 'night' : 'deep'} title="Related">
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
      {page.groups.map((group, i) => (
        <Block key={group.id} id={group.id} tone={i % 2 ? 'deep' : 'night'} title={group.title} lede={group.lede}>
          <Cards picks={group.picks} />
        </Block>
      ))}
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
