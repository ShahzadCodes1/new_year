import picture from '@/assets/ways/fireworks.jpg';
import { site } from '@/lib/site';
import type { EventGuide } from './types';

/**
 * VERIFIED CONTENT. Every fact on this page was read on the Mayor of London's event page for 31 December
 * 2026 (the first source below) on 17 November 2026. The organiser states no running time for the display
 * itself, no bag rules and no re-entry policy, so the page does not either. Anything added here must come
 * from the official page, with the date it was checked.
 */
export const londonFireworks: EventGuide = {
  path: '/london/fireworks/',
  subject: 'the London fireworks',
  title: 'London’s New Year’s Eve fireworks',
  metaTitle: `London New Year’s Eve fireworks ${site.season.eve}: tickets and prices`,
  description: 'London’s New Year’s Eve fireworks 2026: ticket prices from £20 to £55, the six viewing areas, entry times, the London postcode discount and how to get there.',
  standfirst: 'The display over the Thames at the London Eye is ticketed: no ticket, no entry to the riverside. Tickets cost £20 to £55, are sold only through Ticketmaster, and buy you one of six viewing areas.',
  crumbs: [
    { label: 'Home', href: '/' },
    { label: 'Cities', href: '/cities/' },
    { label: 'London', href: '/london/' },
  ],
  checked: '2026-11-17',
  sample: false,
  image: picture,
  sources: [
    { label: 'London New Year’s Eve 2026, Mayor of London (london.gov.uk)', href: 'https://www.london.gov.uk/events/london-new-years-eve-2026' },
    { label: 'Official tickets, Ticketmaster', href: 'https://www.ticketmaster.co.uk/mayor-of-londons-new-years-eve-tickets/artist/5491819' },
  ],
  keyFacts: [
    { label: 'When', value: '31 December, 8pm to 12.30am' },
    { label: 'Entry', value: '8pm to 10.30pm' },
    { label: 'Tickets', value: '£20 to £55, Ticketmaster only' },
    { label: 'Viewing areas', value: 'Six, each with its own gates' },
  ],
  what: {
    body: [
      'The Mayor of London’s New Year’s Eve fireworks are fired over the Thames at the London Eye at midnight. The event runs from 8pm on Thursday 31 December 2026 to 12.30am on Friday 1 January 2027, and every viewing area opens for entry from 8pm to 10.30pm.',
      'It is a ticketed event. The organiser is plain about it: you cannot attend without a ticket, and people without one will not be allowed into the viewing areas. Everyone needs a ticket, whatever their age.',
      'The organiser says the event is not suitable for young children and recommends not bringing them. Under-16s must be with an adult.',
    ],
    facts: [
      { label: 'Date', value: 'Thursday 31 December 2026' },
      { label: 'Opens', value: '8pm (last entry 10.30pm)' },
      { label: 'Ends', value: '12.30am, 1 January 2027' },
      { label: 'Under-16s', value: 'Must be with an adult' },
    ],
  },
  watch: {
    lede: 'Six fenced viewing areas, three on each bank. Each ticket is for one area and its gates, and you cannot move between areas on the night.',
    picks: [
      { kind: 'Category A · North bank', name: 'Blue', text: 'Victoria Embankment, from Westminster Bridge to the Golden Jubilee Footbridge. A head-on view of the London Eye.', price: '£55 (£35 London)', note: 'Gates 1 or 2' },
      { kind: 'Category A · South bank', name: 'Pink', text: 'Waterloo Bridge only, with a side view of the display.', price: '£55 (£35 London)', note: 'Gate 6' },
      { kind: 'Category A · South bank', name: 'White', text: 'Westminster Bridge only, with a side view close to the London Eye.', price: '£55 (£35 London)', note: 'Gate 8' },
      { kind: 'Category B · North bank', name: 'Red', text: 'Victoria Embankment, from the Golden Jubilee Footbridge to Temple Avenue. A side view.', price: '£40 (£20 London)', note: 'Gates 4 or 5' },
      { kind: 'Category B · South bank', name: 'Green', text: 'The area behind the London Eye, with an up-close view.', price: '£40 (£20 London)', note: 'Gate 7' },
      { kind: 'Category B · South bank, accessible', name: 'Orange', text: 'Albert Embankment, on the riverside of St Thomas’ Hospital. A partial side view, fewer crowds, seating and accessible facilities.', price: '£40 (£20 London)', note: 'Gate 9' },
    ],
  },
  tickets: {
    body: [
      'Tickets are sold only through Ticketmaster, the official seller. Category A (Blue, Pink and White) costs £55, or £35 with a London postcode; Category B (Red, Green and Orange) costs £40, or £20 with a London postcode. Prices include VAT, and a small booking fee goes to the ticketing provider.',
      'The London price is checked against the billing address of the card you pay with, and tickets may be cancelled without warning if it does not match. You may be asked for proof of address on the night, and the main buyer may need photo ID that matches the name on the tickets.',
      'Each buyer can book up to four tickets. Refunds are not available, but you can resell at face value through Ticketmaster’s Fan-to-Fan Resale, or transfer tickets to another person before the event. A second batch of tickets goes on sale at 12 noon on Friday 20 November.',
    ],
    facts: [
      { label: 'Category A', value: '£55, or £35 with a London postcode' },
      { label: 'Category B', value: '£40, or £20 with a London postcode' },
      { label: 'Limit', value: 'Four tickets per buyer' },
      { label: 'Refunds', value: 'Not available; face-value resale only' },
    ],
  },
  logistics: {
    body: [
      'Vehicles are restricted from 2pm on 31 December until around 6am on 1 January, and parking is suspended inside the event area. Westminster, Golden Jubilee, Lambeth, Blackfriars and Waterloo bridges cannot be used to cross the river before or after the event.',
      'Stations are very busy when it ends, so decide in advance which bank you are leaving from. Some viewing areas are up to 2km from public transport. Plan the journey with Transport for London; our guide to getting home after midnight covers the rest of the UK.',
      'The Orange area is the one for access needs: seating (fold-up seats are also allowed), a hearing loop, a vehicle drop-off about 700m away, accessible toilets within 300m, a Changing Places unit, a first aid point and stewards. The other areas have step-free routes on closed roads but no seating or hearing loops.',
    ],
    facts: [
      { label: 'Road closures', value: 'From 2pm to about 6am' },
      { label: 'Bridges', value: 'Five closed to crossing' },
      { label: 'Accessible area', value: 'Orange, Albert Embankment' },
      { label: 'Nearest transport', value: 'Up to 2km from some areas' },
    ],
  },
  faq: [
    { q: 'How much do the London New Year’s Eve fireworks cost?', a: 'From £20 to £55 a ticket, plus a booking fee. Category A areas cost £55 (£35 with a London postcode) and Category B areas £40 (£20 with a London postcode).' },
    { q: 'Where do you buy tickets for the London fireworks?', a: 'Only from Ticketmaster, the official seller. The organiser says you cannot buy valid tickets from anyone else; resale is at face value through Ticketmaster’s Fan-to-Fan Resale.' },
    { q: 'Can you watch the London fireworks without a ticket?', a: 'Not from the riverside viewing areas: people without tickets will not be let in. The organiser does not publish places to watch from outside the event.' },
    { q: 'What time should I arrive?', a: 'Every viewing area opens at 8pm and closes to new arrivals at 10.30pm. The display is at midnight and the event ends at 12.30am.' },
    { q: 'Can children go?', a: 'Everyone needs a ticket whatever their age, and under-16s must be with an adult. The organiser says the event is not suitable for young children.' },
  ],
};
