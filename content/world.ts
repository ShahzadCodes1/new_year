/**
 * Where midnight falls, from the first inhabited place on Earth to the last.
 *
 * This is the site's map of the world, and the list a new country's guides are added to. A place gets `href`
 * when its guide is written; until then it is named here without a link, as the home page does with its own
 * unwritten pages.
 *
 * WHAT IS CHECKED AND WHAT IS NOT. `offset` is each place's clock on 31 December, in hours ahead of the UK
 * (behind, if negative); the times shown on the page are worked out from it. Each `line` says how the night
 * is known to go there. It makes no claim about this year's programme: whether a display is running, when and
 * where, belongs in the place's own guide, with its source and the date it was checked.
 */
export type WorldRegion = 'first' | 'asia' | 'africa-europe' | 'americas' | 'last';

export interface Place {
  slug: string;
  name: string;
  country: string;
  region: WorldRegion;
  /** Hours ahead of UK time on 31 December. Sydney is 11, New York is -5. */
  offset: number;
  /** One line on how the night is known to go. */
  line: string;
  /** The place's guide. Left out until it is written. */
  href?: string;
}

export const regions: { id: WorldRegion; title: string; lede: string }[] = [
  { id: 'first', title: 'The first midnights', lede: 'The Pacific sees the year in while Britain is still at work on the 31st.' },
  { id: 'asia', title: 'Asia and the Gulf', lede: 'Through the afternoon and early evening, UK time.' },
  { id: 'africa-europe', title: 'Africa and Europe', lede: 'The two hours before Britain, and Britain’s own.' },
  { id: 'americas', title: 'The Americas', lede: 'After Britain has gone to bed.' },
  { id: 'last', title: 'The last midnights', lede: 'The morning of New Year’s Day in Britain, and still the old year here.' },
];

export const places: Place[] = [
  { slug: 'kiritimati', name: 'Kiritimati', country: 'Kiribati', region: 'first', offset: 14, line: 'The first inhabited place on Earth to see the New Year, fourteen hours ahead of London.' },
  { slug: 'auckland', name: 'Auckland', country: 'New Zealand', region: 'first', offset: 13, line: 'Fireworks from the Sky Tower: the first big-city display of the night.' },
  { slug: 'sydney', name: 'Sydney', country: 'Australia', region: 'first', offset: 11, line: 'Two displays over the harbour, one at nine for families and one at midnight from the bridge.' },

  { slug: 'tokyo', name: 'Tokyo', country: 'Japan', region: 'asia', offset: 9, line: 'Temple bells are rung 108 times to see the old year out, and the first shrine visit of the year follows.' },
  { slug: 'seoul', name: 'Seoul', country: 'South Korea', region: 'asia', offset: 9, line: 'The great bell at Bosingak is struck thirty-three times at midnight.' },
  { slug: 'singapore', name: 'Singapore', country: 'Singapore', region: 'asia', offset: 8, line: 'Fireworks over Marina Bay, watched from the waterfront all round it.' },
  { slug: 'bangkok', name: 'Bangkok', country: 'Thailand', region: 'asia', offset: 7, line: 'Fireworks along the river, in a country that keeps three New Years a year.' },
  { slug: 'dubai', name: 'Dubai', country: 'United Arab Emirates', region: 'asia', offset: 4, line: 'The tallest building on Earth becomes the display.' },

  { slug: 'cape-town', name: 'Cape Town', country: 'South Africa', region: 'africa-europe', offset: 2, line: 'Fireworks over the harbour, at the height of summer.' },
  { slug: 'madrid', name: 'Madrid', country: 'Spain', region: 'africa-europe', offset: 1, line: 'Twelve grapes, one with each chime of the clock in the Puerta del Sol.' },
  { slug: 'paris', name: 'Paris', country: 'France', region: 'africa-europe', offset: 1, line: 'Crowds on the Champs-Élysées, and the display at the Arc de Triomphe.' },
  { slug: 'london', name: 'London', country: 'United Kingdom', region: 'africa-europe', offset: 0, line: 'Fireworks over the Thames at the London Eye.', href: '/london/' },
  { slug: 'edinburgh', name: 'Edinburgh', country: 'United Kingdom', region: 'africa-europe', offset: 0, line: 'Hogmanay: a street party below the castle, and fireworks from its walls.', href: '/hogmanay/edinburgh/' },
  { slug: 'reykjavik', name: 'Reykjavik', country: 'Iceland', region: 'africa-europe', offset: 0, line: 'Bonfires in every neighbourhood, then a city that lets off its own fireworks.' },
  { slug: 'funchal', name: 'Funchal', country: 'Portugal', region: 'africa-europe', offset: 0, line: 'Fireworks all round the bay in Madeira, watched from the ships at anchor.' },

  { slug: 'rio-de-janeiro', name: 'Rio de Janeiro', country: 'Brazil', region: 'americas', offset: -3, line: 'Copacabana beach fills with people dressed in white, and flowers are given to the sea.' },
  { slug: 'new-york', name: 'New York', country: 'United States', region: 'americas', offset: -5, line: 'The ball comes down in Times Square, as it has since 1907.' },
  { slug: 'las-vegas', name: 'Las Vegas', country: 'United States', region: 'americas', offset: -8, line: 'The Strip closes to traffic and the display is fired from the hotel roofs.' },

  { slug: 'honolulu', name: 'Honolulu', country: 'United States', region: 'last', offset: -10, line: 'Fireworks off Waikiki, ten hours after London.' },
  { slug: 'pago-pago', name: 'Pago Pago', country: 'American Samoa', region: 'last', offset: -11, line: 'The last inhabited place to see the year in, twenty-five hours after the first.' },
];

const clock = (hours: number) => {
  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  if (h === 12 && m === 0) return 'noon';
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}${m ? `.${String(m).padStart(2, '0')}` : ''}${h < 12 ? 'am' : 'pm'}`;
};

/** When a place's midnight falls, as a clock in the UK reads it: "1pm on 31 December, UK time". */
export function midnightInUkTime(offset: number): string {
  if (offset === 0) return 'Midnight, UK time';
  return offset > 0 ? `${clock(24 - offset)} on 31 December, UK time` : `${clock(-offset)} on 1 January, UK time`;
}
