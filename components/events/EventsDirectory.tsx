'use client';

import { useState, useSyncExternalStore } from 'react';
import { longDate } from '@/lib/dates';
import { eventCategories, priceLabel, timeLabel, unconfirmedWords, type EventCategory, type EventListing } from '@/content/events';
import './events.css';

const host = (url: string) => new URL(url).hostname.replace(/^www\./, '');
const slug = (text: string) => text.toLowerCase().replace(/[^a-z]+/g, '-');
const never = () => () => {};

/**
 * The events directory: a filter by city and by kind over one list.
 *
 * The page arrives from the server with every event in it, so a visitor without scripts, and a search engine,
 * get the whole list. Once scripts are running it opens on the first city (London, the priority) and the
 * filters take over.
 */
export function EventsDirectory({ events, cities }: { events: EventListing[]; cities: string[] }) {
  const hydrated = useSyncExternalStore(never, () => true, () => false);
  const [chosenCity, setCity] = useState<string | null>(null);
  const [kind, setKind] = useState<EventCategory | 'all'>('all');
  const city = chosenCity ?? (hydrated ? cities[0] : 'all');

  const inCity = events.filter((event) => city === 'all' || event.city === city);
  const shown = inCity.filter((event) => kind === 'all' || event.category === kind);
  const present = eventCategories.filter((category) => events.some((event) => event.category === category.id));
  const sections = city === 'all' ? cities : [city];

  return (
    <div className="e-directory">
      <div className="e-filters">
        <div className="e-filter" role="group" aria-label="City">
          {cities.map((name) => (
            <button key={name} type="button" aria-pressed={city === name} onClick={() => setCity(name)}>
              {name} <span>{events.filter((event) => event.city === name).length}</span>
            </button>
          ))}
          <button type="button" aria-pressed={city === 'all'} onClick={() => setCity('all')}>
            All cities <span>{events.length}</span>
          </button>
        </div>
        <div className="e-filter" role="group" aria-label="Kind of event">
          <button type="button" aria-pressed={kind === 'all'} onClick={() => setKind('all')}>
            All kinds <span>{inCity.length}</span>
          </button>
          {present.map((category) => (
            <button key={category.id} type="button" aria-pressed={kind === category.id} onClick={() => setKind(category.id)}>
              {category.label} <span>{inCity.filter((event) => event.category === category.id).length}</span>
            </button>
          ))}
        </div>
      </div>
      <p className="e-count" aria-live="polite">
        {shown.length} {shown.length === 1 ? 'event' : 'events'}
        {city === 'all' ? ' in all cities' : ` in ${city}`}
        {kind === 'all' ? '' : `: ${eventCategories.find((c) => c.id === kind)!.label.toLowerCase()}`}
      </p>

      {sections.map((name) => {
        const here = shown.filter((event) => event.city === name);
        return (
          <section key={name} id={`events-${slug(name)}`} className="e-city" aria-labelledby={`events-${slug(name)}-title`}>
            <h2 id={`events-${slug(name)}-title`}>
              {name} <span>{here.length}</span>
            </h2>
            {here.length === 0 ? (
              <p className="e-none">Nothing of this kind is listed for {name} yet. Try another kind, or another city.</p>
            ) : (
              <ul className="e-list">
                {here.map((event) => (
                  <li key={event.id}>
                    <EventCard event={event} />
                  </li>
                ))}
              </ul>
            )}
          </section>
        );
      })}
    </div>
  );
}

function EventCard({ event }: { event: EventListing }) {
  const category = eventCategories.find((c) => c.id === event.category)!;
  const open = unconfirmedWords(event);
  return (
    <article className="e-card">
      <p className="e-card__kind">
        {category.one}
        {event.availability === 'sold out' && <b>Sold out when checked</b>}
      </p>
      <h3>{event.name}</h3>
      <p className="e-card__where">
        {event.venue}
        {event.area ? `, ${event.area}` : ''}
      </p>
      <p className="e-card__text">{event.description}</p>

      <dl className="e-card__facts">
        <div>
          <dt>When</dt>
          <dd>{timeLabel(event)}</dd>
        </div>
        <div>
          <dt>Price</dt>
          <dd>{priceLabel(event)}</dd>
        </div>
        {event.ageLimit && (
          <div>
            <dt>Ages</dt>
            <dd>{event.ageLimit}</dd>
          </div>
        )}
      </dl>

      {open.length > 0 && <p className="e-card__open">Not confirmed on the organiser’s page: {open.join(', ')}.</p>}

      {(event.notes || event.priceText) && (
        <details className="e-card__more">
          <summary>Good to know</summary>
          {event.priceText && <p>Price as published: {event.priceText}</p>}
          {event.notes && <p>{event.notes}</p>}
        </details>
      )}

      <p className="e-card__actions">
        {/* The accessible name says which event, so a list of these links is not a list of identical ones. */}
        <a className="e-card__book" href={event.booking.url} target="_blank" rel="noopener noreferrer" aria-label={`Book ${event.name} on ${event.booking.label} (opens in a new tab)`}>
          Book on {event.booking.label}
        </a>
        <span className="e-card__checked">
          Checked {longDate(event.checked)} on{' '}
          <a href={event.source.url} target="_blank" rel="noopener noreferrer" aria-label={`Source for ${event.name}: ${host(event.source.url)} (opens in a new tab)`}>
            {host(event.source.url)}
          </a>
        </span>
      </p>
    </article>
  );
}
