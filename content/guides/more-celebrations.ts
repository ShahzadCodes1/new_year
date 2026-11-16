import diwaliPicture from '@/assets/celebrations/diwali.jpg';
import hogmanayPicture from '@/assets/celebrations/hogmanay.jpg';
import islamicPicture from '@/assets/celebrations/islamic-new-year.jpg';
import nowruzPicture from '@/assets/celebrations/nowruz.jpg';
import roshPicture from '@/assets/celebrations/rosh-hashanah.jpg';
import songkranPicture from '@/assets/celebrations/songkran.jpg';
import { site } from '@/lib/site';
import type { CelebrationGuide } from './types';

const home = [
  { label: 'Home', href: '/' },
  { label: 'Celebrations', href: '/celebrations/' },
];
const checked = '2026-11-11';

/**
 * SAMPLE CONTENT: see types.ts. The date of each celebration's next occurrence is verified (see
 * content/celebrations.ts for the sources) and the weekdays follow from it. Everything said about particular
 * UK places and events is a stand-in, and the accounts of each tradition need a reader from that community
 * before launch.
 */
export const hogmanay: CelebrationGuide = {
  path: '/hogmanay/',
  name: 'Hogmanay',
  title: 'Hogmanay',
  metaTitle: `Hogmanay ${site.season.eve}: what it means and where to celebrate`,
  description: 'What Hogmanay is and what it means, its traditions from first-footing to Auld Lang Syne, and where to celebrate it in Scotland this year.',
  standfirst: 'Scotland’s New Year is older, longer and louder than anyone else’s. The street party is the famous part; what happens after the bells is the better one.',
  crumbs: home,
  checked,
  sample: true,
  image: hogmanayPicture,
  keyFacts: [
    { label: 'Next', value: 'Thursday 31 December 2026' },
    { label: 'At midnight', value: 'The bells' },
    { label: 'Lasts', value: 'Up to three days' },
    { label: 'Bank holidays', value: '1 and 4 January, in Scotland' },
  ],
  what: {
    body: [
      'Hogmanay is the Scots word for the last day of the year, and for everything that happens on it. Nobody is sure where the word comes from; there are at least four theories and no winner.',
      'For centuries Christmas was barely kept in Scotland, and New Year carried the whole weight of the winter. That is why it still gets two bank holidays here and one everywhere else.',
      'The public part is a night. The private part, visiting from house to house after midnight, can last until the second of January.',
    ],
    facts: [
      { label: 'Hogmanay', value: 'Thursday 31 December 2026' },
      { label: 'Ne’erday', value: 'Friday 1 January 2027' },
      { label: 'Second holiday (moved)', value: 'Monday 4 January 2027' },
      { label: 'Kept in', value: 'All of Scotland' },
    ],
  },
  marked: {
    lede: 'Four things that make it Hogmanay and not just New Year’s Eve.',
    picks: [
      { name: 'The bells', text: 'Midnight itself. Whatever you are doing stops, glasses are raised, and everyone in reach is kissed or shaken by the hand.' },
      { name: 'First-footing', text: 'The first person over the threshold after the bells sets the luck of the house for the year, and should not arrive empty-handed.' },
      { name: 'Auld Lang Syne', text: 'Sung in a circle with joined hands. The words are by Burns; most of the world knows one verse, and Scotland knows the rest.' },
      { name: 'Fire', text: 'Torchlight processions, bonfires and, in one harbour town, balls of flame swung round the head down the high street.' },
    ],
  },
  where: {
    lede: 'A street party, a ceilidh or a village hall. They are three different nights.',
    picks: [
      { kind: 'The big one', name: 'Edinburgh', text: 'A torchlight procession, a street party below the castle and fireworks from its walls at the bells.', note: 'Ticketed', href: '/hogmanay/edinburgh/' },
      { kind: 'Indoors', name: 'Glasgow', text: 'No street party: ceilidhs, pubs and front rooms, and a welcome if you turn up with a bottle.', note: 'From £25', href: '/glasgow/' },
      { kind: 'Fire', name: 'The harbour towns', text: 'Fireballs, burning barrels and a pipe band, in places small enough to walk across in ten minutes.', note: 'Free' },
      { kind: 'Quiet', name: 'The Highlands', text: 'A ceilidh in the village hall, a piper outside the hotel and a long walk on the first.', note: 'Book a bed early', href: '/breaks/scotland/' },
    ],
  },
  traditions: [
    { heading: 'Clean before the bells', text: 'The house is swept, the ashes are taken out and debts are settled before midnight, so that the old year takes its mess with it.' },
    { heading: 'Bring something', text: 'A first-footer brings a piece of coal, shortbread or black bun, and something to drink. Tall and dark-haired is said to be luckiest.' },
    { heading: 'Cross arms at the end', text: 'In Auld Lang Syne the arms are crossed only for the last verse. Crossing them from the start marks you as a visitor.' },
  ],
  faq: [
    { q: 'What does Hogmanay mean?', a: 'The last day of the year, in Scots. The origin of the word is argued over: French, Norse and Gaelic sources have all been proposed.' },
    { q: 'Do I need a ticket?', a: 'For the street party in Edinburgh, yes, and well ahead. Almost everywhere else the night is free or the price of a ceilidh.' },
    { q: 'What is open on 1 January?', a: 'Very little. Shops, many restaurants and most public transport stop for the day, and some stay shut on the second.' },
  ],
};

export const nowruz: CelebrationGuide = {
  path: '/nowruz/',
  name: 'Nowruz',
  title: 'Nowruz in the UK',
  metaTitle: 'Nowruz 2027: when is Persian New Year, and UK events',
  description: 'Nowruz 2027 falls on Saturday 20 March, at the spring equinox. What the Persian New Year means, the haft-sin table, and where it is kept in the UK.',
  standfirst: 'The Persian New Year begins at the exact moment spring does. It has been kept for some three thousand years, and its table is the best-looking in any calendar.',
  crumbs: home,
  checked,
  sample: true,
  image: nowruzPicture,
  keyFacts: [
    { label: 'Next', value: 'Saturday 20 March 2027' },
    { label: 'Persian year', value: '1406' },
    { label: 'Lasts', value: 'Thirteen days' },
    { label: 'Begins', value: 'At the spring equinox' },
  ],
  what: {
    body: [
      'Nowruz means “new day”. The year turns at the instant of the spring equinox, worked out to the second, and families gather at the table to wait for it whatever hour it falls.',
      'It began in ancient Persia and is kept today across Iran, Afghanistan, Central Asia, the Caucasus and Kurdish communities, and by people of several faiths and none.',
      'In Britain it is mostly a festival of the home: the table, the visits and a great deal of food. The public events fall on the weekends either side.',
    ],
    facts: [
      { label: 'Nowruz', value: 'Saturday 20 March 2027' },
      { label: 'The fire festival', value: 'The last Tuesday night before' },
      { label: 'The thirteenth day', value: 'Spent outdoors' },
      { label: 'UK bank holiday', value: 'No' },
    ],
  },
  marked: {
    lede: 'Four things that happen in every household that keeps it.',
    picks: [
      { name: 'The haft-sin table', text: 'Seven things whose names begin with the same letter, each standing for a wish: sprouted wheat for rebirth, garlic for health, apples for beauty.' },
      { name: 'Jumping the fire', text: 'On the last Tuesday night of the old year, small fires are lit and jumped over, to leave the winter’s pallor in the flames.' },
      { name: 'Visiting, eldest first', text: 'The first days are for calling on relatives in order of age. Children are given new banknotes, often from between the pages of a book.' },
      { name: 'The thirteenth day', text: 'Everyone goes outdoors for a picnic. Staying in is thought unlucky, and the sprouted wheat is given to running water.' },
    ],
  },
  where: {
    lede: 'Mostly at home. The public events are concerts, bazaars and one large picnic.',
    picks: [
      { kind: 'The largest', name: 'London', text: 'Concerts, a bazaar for sweets and goldfish in the week before, and parks full of picnics on the thirteenth day.', note: 'Mostly free' },
      { kind: 'In the north', name: 'Manchester', text: 'A community evening with music and dinner, and fire-jumping in a park on the Tuesday.', note: 'From £15' },
      { kind: 'At a museum', name: 'A family day', text: 'A haft-sin on show, storytelling for children and somebody to explain what each thing means.', note: 'Free' },
      { kind: 'At a restaurant', name: 'A Nowruz dinner', text: 'Herbed rice with fish, the dish of the day, served for the whole fortnight.', note: 'Book ahead' },
    ],
  },
  traditions: [
    { heading: 'Shake the house', text: 'The spring clean before Nowruz is thorough enough to have its own name, which means “shaking the house”. New clothes follow.' },
    { heading: 'A mirror and a goldfish', text: 'Besides the seven things, the table has a mirror, candles, painted eggs, a book of poetry or scripture, and often a goldfish in a bowl.' },
    { heading: 'Something sweet first', text: 'The first thing eaten in the new year should be sweet, so that the year is. A plate of pastries waits beside the table for the moment.' },
  ],
  faq: [
    { q: 'Is it Nowruz, Norooz or Newroz?', a: 'All of them. The word is written in several alphabets and has no single English spelling. Nowruz is the commonest in Britain.' },
    { q: 'Is Nowruz a religious festival?', a: 'Its roots are Zoroastrian, but it is kept today as a cultural New Year by Muslims, Bahá’ís, Zoroastrians, Jews, Christians and people of no faith.' },
    { q: 'What do you say?', a: '“Nowruz mobarak”, which means “happy Nowruz”. “Nowruz pirooz” is also used.' },
  ],
};

export const songkran: CelebrationGuide = {
  path: '/songkran/',
  name: 'Songkran',
  title: 'Songkran in the UK',
  metaTitle: 'Songkran 2027: dates of Thai New Year and UK events',
  description: 'Songkran, the Thai New Year, runs from 13 to 15 April 2027. What the water means, how it is kept, and where to join temple celebrations in the UK.',
  standfirst: 'Thailand’s New Year is a blessing first and a water fight second. In Britain it is mostly the first, with the second kept for a temple garden on a cold April weekend.',
  crumbs: home,
  checked,
  sample: true,
  image: songkranPicture,
  keyFacts: [
    { label: 'Next', value: '13 to 15 April 2027' },
    { label: 'Thai year', value: '2570' },
    { label: 'Lasts', value: 'Three days' },
    { label: 'In the UK', value: 'The nearest weekend' },
  ],
  what: {
    body: [
      'Songkran is Thailand’s traditional New Year. The word means a passage: the sun’s move into a new sign at the hottest, driest point of the Thai year.',
      'Thailand has counted its official year from 1 January since 1941, but Songkran is the New Year people travel home for. Laos, Cambodia and Myanmar keep their own New Years on the same days.',
      'Water runs through all of it. It is poured gently, as a blessing and a washing away of the old year, before it is ever thrown.',
    ],
    facts: [
      { label: 'Begins', value: 'Tuesday 13 April 2027' },
      { label: 'Ends', value: 'Thursday 15 April 2027' },
      { label: 'UK temple fairs', value: 'The weekend before or after' },
      { label: 'UK bank holiday', value: 'No' },
    ],
  },
  marked: {
    lede: 'Four things you will see at any temple that keeps it.',
    picks: [
      { name: 'Water for the elders', text: 'Scented water is poured over the hands of parents and grandparents, who give a blessing for the year in return.' },
      { name: 'Bathing the Buddha', text: 'Images of the Buddha are brought out and water is poured over them, one small cup at a time, by everyone who comes.' },
      { name: 'Food for the monks', text: 'The day begins early, with rice and dishes offered to the monks. Making merit comes before making a mess.' },
      { name: 'Water for everyone', text: 'Then the buckets come out. In Thailand it lasts for days; here it lasts an afternoon and the water is very cold.' },
    ],
  },
  where: {
    lede: 'At the temples, on the nearest weekend. Visitors are welcome and are fed.',
    picks: [
      { kind: 'The largest', name: 'A temple in London', text: 'A garden full of food stalls, classical dance on a stage and a queue to bathe the Buddha.', note: 'Free' },
      { kind: 'In the Midlands', name: 'A temple fair', text: 'Smaller, with the same food and more room. The water throwing is for children, mostly.', note: 'Free' },
      { kind: 'In the north', name: 'A community day', text: 'A hired hall, a blessing by visiting monks and a shared lunch that everybody has cooked for.', note: 'Donation' },
      { kind: 'At a restaurant', name: 'A Songkran menu', text: 'Thai restaurants mark the week with dishes from home and jasmine water at the door.', note: 'Book ahead' },
    ],
  },
  traditions: [
    { heading: 'Go home', text: 'Songkran is when people return to their family. For Thai people in Britain, the temple stands in for the village.' },
    { heading: 'Scent the water', text: 'The water for blessings is scented with jasmine and flower petals. It is poured over the hands or the shoulder, never thrown.' },
    { heading: 'Clean and begin again', text: 'Houses, temples and Buddha images are washed before the New Year, so that nothing of the old one is carried over.' },
  ],
  faq: [
    { q: 'Will I get wet?', a: 'In Thailand, certainly. At a temple fair in Britain, only if you stand near the children with the buckets.' },
    { q: 'Why is the New Year in April?', a: 'It follows the sun, not the moon, and marks the end of the dry season. Mid-April is the hottest time of the Thai year.' },
    { q: 'Can anyone go to a temple fair?', a: 'Yes. Dress modestly, take your shoes off where others do, and bring cash for the food.' },
  ],
};

export const islamicNewYear: CelebrationGuide = {
  path: '/islamic-new-year/',
  name: 'Islamic New Year',
  title: 'Islamic New Year in the UK',
  metaTitle: 'When is Islamic New Year 2027? Date and meaning',
  description: 'Islamic New Year 2027 is expected around Sunday 6 June, depending on the moon. What the first of Muharram marks and how it is kept in the UK.',
  standfirst: 'The Islamic year begins quietly. There are no fireworks and no countdown: the first of Muharram is a day for reflection, and for most people an ordinary working one.',
  crumbs: home,
  checked,
  sample: true,
  image: islamicPicture,
  keyFacts: [
    { label: 'Next', value: 'Around Sunday 6 June 2027' },
    { label: 'Islamic year', value: '1449 AH' },
    { label: 'First month', value: 'Muharram' },
    { label: 'Depends on', value: 'The new moon being sighted' },
  ],
  what: {
    body: [
      'The Islamic calendar counts from the Hijra: the journey of the Prophet Muhammad and his companions from Mecca to Medina in the year 622. The new year marks that beginning.',
      'Its twelve months follow the moon, which makes the year about eleven days shorter than the ordinary one. The new year therefore comes earlier each time and passes through every season.',
      'Each month begins when the new crescent is seen, and each day begins at sunset. That is why the date is given as “around”, and why two mosques may announce it a day apart.',
    ],
    facts: [
      { label: 'First of Muharram', value: 'Around Sunday 6 June 2027' },
      { label: 'Begins', value: 'At sunset the evening before' },
      { label: 'Ashura', value: 'The tenth day of the month' },
      { label: 'UK bank holiday', value: 'No' },
    ],
  },
  marked: {
    lede: 'Four ways the month is kept. None of them is a party.',
    picks: [
      { name: 'Reflection', text: 'The turn of the year is a time to look back, give thanks and resolve to do better. Extra prayers are said at home and at the mosque.' },
      { name: 'The story of the journey', text: 'The Hijra is retold: leaving home for the sake of faith, and the founding of the first Muslim community in Medina.' },
      { name: 'Fasting', text: 'Many Muslims fast on the tenth day, Ashura, and often on the day before or after it. The fast is voluntary.' },
      { name: 'Mourning', text: 'For Shia Muslims the first ten days remember the death of Husayn, the Prophet’s grandson, at Karbala. It is a time of grief.' },
    ],
  },
  where: {
    lede: 'In mosques and homes, in every town with a Muslim community.',
    picks: [
      { kind: 'On the eve', name: 'At the mosque', text: 'A talk after the evening prayer on the meaning of the Hijra, and the date announced once the moon is confirmed.', note: 'Open to all' },
      { kind: 'On the day', name: 'At home', text: 'A family meal, a few words to the children about the new year and, for most, work or school as usual.', note: 'Private' },
      { kind: 'Through the month', name: 'Evening gatherings', text: 'In Shia centres, recitations each night for the first ten nights, with food shared afterwards.', note: 'Visitors welcome' },
      { kind: 'On Ashura', name: 'Processions', text: 'Mourning processions pass through several British cities on the tenth day, quietly and on foot.', note: 'Public' },
    ],
  },
  traditions: [
    { heading: 'A sacred month', text: 'Muharram is one of four months the Qur’an calls sacred. Its name means “forbidden”: fighting was not allowed in it.' },
    { heading: 'No set greeting', text: 'There is no fixed form of words. Many people simply wish one another a blessed new year, and some prefer not to, out of respect for those in mourning.' },
    { heading: 'A calendar by the moon', text: 'Because the year is shorter, a person’s age in Islamic years is higher than in ordinary ones: thirty-three of one make about thirty-two of the other.' },
  ],
  faq: [
    { q: 'Is Islamic New Year celebrated?', a: 'It is marked more than celebrated. It is not one of the two festivals of the Islamic year, and for many it is a solemn time.' },
    { q: 'Why can nobody give the exact date?', a: 'The month begins when the crescent moon is sighted, which cannot be known for certain in advance. Calculated dates are usually right to within a day.' },
    { q: 'What does AH mean?', a: 'Anno Hegirae, “in the year of the Hijra”. The count begins from the journey to Medina in 622.' },
  ],
};

export const roshHashanah: CelebrationGuide = {
  path: '/rosh-hashanah/',
  name: 'Rosh Hashanah',
  title: 'Rosh Hashanah in the UK',
  metaTitle: 'Rosh Hashanah 2027: dates, meaning and UK customs',
  description: 'Rosh Hashanah 2027 begins at sunset on Friday 1 October. What the Jewish New Year means, the shofar, apples and honey, and how it is kept in the UK.',
  standfirst: 'The Jewish New Year is two days of prayer, long lunches and honey. It opens ten days of taking stock, which end on the most solemn day of the year.',
  crumbs: home,
  checked,
  sample: true,
  image: roshPicture,
  keyFacts: [
    { label: 'Next', value: 'From sunset on Friday 1 October 2027' },
    { label: 'Jewish year', value: '5788' },
    { label: 'Lasts', value: 'Two days' },
    { label: 'Leads to', value: 'Yom Kippur, ten days on' },
  ],
  what: {
    body: [
      'Rosh Hashanah means “head of the year”. It falls on the first two days of the month of Tishrei, in early autumn, and like every Jewish day it begins at sunset the evening before.',
      'It is a New Year without a party. The days are spent in synagogue and at the table, and the mood is serious and hopeful at once: the year ahead is being weighed.',
      'It begins the Ten Days of Repentance, a time for putting things right with other people, which ends with the fast of Yom Kippur.',
    ],
    facts: [
      { label: 'Begins', value: 'Sunset, Friday 1 October 2027' },
      { label: 'Ends', value: 'Nightfall, Sunday 3 October 2027' },
      { label: 'Month', value: 'Tishrei' },
      { label: 'UK bank holiday', value: 'No' },
    ],
  },
  marked: {
    lede: 'Four things that belong to these two days and no others.',
    picks: [
      { name: 'The shofar', text: 'A ram’s horn, blown in synagogue in a set pattern of long, broken and short notes. It is meant to wake the listener up.' },
      { name: 'Apples and honey', text: 'Slices of apple are dipped in honey at the start of the meal, with a wish for a good and sweet year.' },
      { name: 'Round bread', text: 'The plaited loaf of other weeks is baked round, for the turning of the year, and is often sweetened with raisins.' },
      { name: 'Tashlich', text: 'A walk to a river, a pond or the sea, where crumbs are cast on the water and with them, in symbol, the year’s wrongs.' },
    ],
  },
  where: {
    lede: 'In synagogues and homes. Visitors are usually welcome, by arrangement.',
    picks: [
      { kind: 'The largest', name: 'North London', text: 'Dozens of synagogues of every tradition, bakeries selling round loaves from dawn and quiet streets by noon.', note: 'Arrange a seat' },
      { kind: 'In the north', name: 'Manchester', text: 'The second-largest community in the country. The riverbank fills for tashlich on the afternoon.', note: 'Arrange a seat' },
      { kind: 'Smaller communities', name: 'Leeds, Glasgow and beyond', text: 'One or two synagogues, a communal lunch and a welcome for anybody away from home.', note: 'Contact ahead' },
      { kind: 'On campus', name: 'Student services', text: 'University chaplaincies and societies hold services and meals for students, free of charge.', note: 'Free' },
    ],
  },
  traditions: [
    { heading: 'A new fruit', text: 'On the second night a fruit not yet eaten that season is put on the table, often a pomegranate, whose many seeds stand for many good deeds.' },
    { heading: 'The Book of Life', text: 'Tradition has it that each person’s year is written on Rosh Hashanah and sealed on Yom Kippur. The days between are the time to change it.' },
    { heading: 'Ask forgiveness', text: 'Wrongs done to another person can only be forgiven by that person. The custom is to go and ask before the ten days are over.' },
  ],
  faq: [
    { q: 'What do you say?', a: '“Shanah tovah”, which means “a good year”. “Shanah tovah u’metukah” adds “and a sweet one”.' },
    { q: 'Is the shofar blown on both days?', a: 'Usually. In 2027 the first day is a Saturday, when most synagogues do not sound it, so it is heard on the Sunday.' },
    { q: 'Do Jewish businesses close?', a: 'Many do, for both days. Kosher shops and bakeries are at their busiest on the days before.' },
  ],
};

export const diwali: CelebrationGuide = {
  path: '/diwali/',
  name: 'Diwali',
  title: 'Diwali in the UK',
  metaTitle: 'When is Diwali 2027? Date and where to celebrate in the UK',
  description: 'Diwali 2027 falls on Friday 29 October. What the festival of lights means, the new year that follows it, and where to see the lights in the UK.',
  standfirst: 'Five days of lamps, sweets and fireworks. For many Gujarati and Jain families the new year begins the morning after the main night, with new clothes and a clean ledger.',
  crumbs: home,
  checked,
  sample: true,
  image: diwaliPicture,
  keyFacts: [
    { label: 'Next', value: 'Friday 29 October 2027' },
    { label: 'Lasts', value: 'Five days' },
    { label: 'New year', value: 'The day after, for many' },
    { label: 'Kept by', value: 'Hindus, Sikhs and Jains' },
  ],
  what: {
    body: [
      'Diwali, or Deepavali, means a row of lamps. Its main night is the darkest of the lunar month, in October or November, and every house answers it with as many lights as it can.',
      'For most Hindus it honours Lakshmi, the goddess of prosperity, and the return of Rama from exile. Sikhs keep the same day as Bandi Chhor Divas, and Jains mark the liberation of Mahavira.',
      'Not every Hindu calendar starts its year here: several begin in spring. The Gujarati year does, on the day after the main night, and so does the Jain one.',
    ],
    facts: [
      { label: 'Main night', value: 'Friday 29 October 2027' },
      { label: 'A day earlier', value: 'In some UK calendars' },
      { label: 'Gujarati New Year', value: 'The day after the main night' },
      { label: 'UK bank holiday', value: 'No' },
    ],
  },
  marked: {
    lede: 'Four things you will see in any street that keeps it.',
    picks: [
      { name: 'Lamps', text: 'Small clay lamps of oil or ghee on every sill and step, so that prosperity can find its way to the door.' },
      { name: 'Rangoli', text: 'Patterns drawn on the threshold in coloured powder, rice or petals, made new each morning of the festival.' },
      { name: 'Prayers at dusk', text: 'On the main night the family gathers for prayers to Lakshmi, with the doors and windows left open.' },
      { name: 'Sweets and fireworks', text: 'Boxes of sweets go from house to house all week. The fireworks start once the prayers are done.' },
    ],
  },
  where: {
    lede: 'The public celebrations are spread over a fortnight. Check which evening is which.',
    picks: [
      { kind: 'The largest', name: 'Leicester', text: 'A mile of lights, a switch-on a fortnight before and a second evening with fireworks on the day itself.', note: 'Free' },
      { kind: 'In the square', name: 'London', text: 'An afternoon of dance, music and food stalls in the middle of town, held some weeks ahead of the day.', note: 'Free' },
      { kind: 'In the Midlands', name: 'Birmingham', text: 'Lights and a street programme along the main shopping road, with sweet shops open late.', note: 'Free' },
      { kind: 'On New Year’s morning', name: 'The temples', text: 'Hundreds of dishes are set out in tiers before the shrine as a thanksgiving for the year. Visitors are welcome.', note: 'Free' },
    ],
  },
  traditions: [
    { heading: 'Clean every corner', text: 'The house is cleaned and often repainted before the festival. Lakshmi is said to visit the cleanest and best-lit house first.' },
    { heading: 'Open a new ledger', text: 'Businesses close their accounts and bless a new set of books for the year ahead. Many still do it with paper and red ink.' },
    { heading: 'New clothes, first visits', text: 'On New Year’s morning people dress in new clothes, visit the temple and call on their elders. The greeting is “Saal Mubarak”.' },
  ],
  faq: [
    { q: 'Is Diwali the Hindu New Year?', a: 'For some. The Gujarati and Jain years begin the day after; many other Hindu communities start theirs in spring.' },
    { q: 'Why do calendars disagree about the date?', a: 'The main night is tied to the new moon, and the moment it falls can put the festival on one day in India and the day before in Britain.' },
    { q: 'What do you say?', a: '“Happy Diwali”, or “Shubh Deepavali”. On the Gujarati New Year, “Saal Mubarak”.' },
  ],
};
