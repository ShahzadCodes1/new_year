import type { AnswerPage } from './types';

const trail = [
  { label: 'Home', href: '/' },
  { label: 'Practical', href: '/practical/' },
];
const checked = '2026-11-11';

/**
 * SAMPLE CONTENT: see types.ts. The bank holiday dates are verified (see site-pages.ts). How each kind of
 * place trades, and how each city's transport runs, are stand-ins: the real pages name operators and hours,
 * each with its source.
 */
export const whatsOpen: AnswerPage = {
  path: '/whats-open/',
  title: 'What is open on New Year’s Day?',
  metaTitle: 'What is open on New Year’s Day 2027? Shops, supermarkets, pubs and banks',
  description: 'What is open on New Year’s Eve and New Year’s Day in the UK: supermarkets, pharmacies, banks, pubs, shopping centres and attractions.',
  standfirst: 'Less than usual, and it varies branch by branch. Buy what you need on the 30th and treat anything open on the first as a bonus.',
  crumbs: trail,
  checked,
  sample: true,
  answer: 'Less than usual. Most large supermarkets open for shorter hours, banks and post offices are shut, and pubs open late.',
  detail: {
    body: [
      'New Year’s Day is a bank holiday everywhere in the UK, and shops either treat it as a quiet Sunday or stay shut. Hours are set branch by branch, so the shop round the corner may differ from the one in town.',
      'New Year’s Eve is an ordinary trading day that ends early: most shops close by late afternoon so that staff can get home.',
      'Scotland has a second bank holiday, on Monday 4 January in 2027, and many smaller shops there stay shut on the 2nd as well.',
    ],
    facts: [
      { label: 'Thursday 31 December', value: 'Most shops close early' },
      { label: 'Friday 1 January', value: 'Bank holiday: short hours or shut' },
      { label: 'Saturday 2 January', value: 'Usual hours in most places' },
      { label: 'Monday 4 January', value: 'Bank holiday in Scotland' },
    ],
  },
  groups: [
    {
      id: 'places',
      title: 'Place by place',
      lede: 'How each kind of place usually handles the first. Check your own branch before you set out.',
      picks: [
        { name: 'Large supermarkets', text: 'Most open in the late morning and close by early evening. A few chains shut every branch for the day.', note: 'Shorter hours' },
        { name: 'Convenience shops', text: 'Small branches and corner shops mostly open, often at their usual time.', note: 'Mostly open' },
        { name: 'Pharmacies', text: 'Most are shut. Each area keeps a rota of those that open for a few hours.', note: 'A rota' },
        { name: 'Banks and post offices', text: 'Closed. Cash machines and apps work as usual; payments made on the day arrive on the next working one.', note: 'Closed' },
        { name: 'Pubs and restaurants', text: 'Many open from noon and serve all afternoon. Kitchens in small places often stay shut.', note: 'From noon' },
        { name: 'Shopping centres', text: 'Open for a shorter day, with the January sales already under way.', note: 'Shorter hours' },
        { name: 'Museums and attractions', text: 'Mixed. The large free museums mostly shut; paid attractions and winter events mostly open.', note: 'Check first' },
        { name: 'Petrol stations', text: 'Motorway services never shut. Supermarket forecourts follow the shop, though paying at the pump works all night.', note: 'Mostly open' },
      ],
    },
  ],
  source: { label: 'UK bank holidays, GOV.UK', href: 'https://www.gov.uk/bank-holidays' },
  related: [
    { label: 'Is New Year’s Day a bank holiday?', text: 'Yes, everywhere. The dates, and the days that move.', href: '/bank-holidays/' },
    { label: 'Getting home after midnight', text: 'Trains, trams, night buses and taxis, city by city.', href: '/transport/' },
  ],
};

export const transport: AnswerPage = {
  path: '/transport/',
  title: 'Getting home after midnight',
  metaTitle: 'Getting home on New Year’s Eve 2026: trains, night buses and taxis, city by city',
  description: 'How to get home after midnight on New Year’s Eve in the UK: last trains, trams, night buses and taxis, with a summary for each city.',
  standfirst: 'The night ends when the last train does, unless you have planned for it. Decide how you are getting home before you go out, and tell the people you are with.',
  crumbs: trail,
  checked,
  sample: true,
  answer: 'Decide before you go out. Many trains finish early, night buses and trams differ from city to city, and taxis are scarce and dearer after midnight.',
  detail: {
    body: [
      'New Year’s Eve runs to a special timetable almost everywhere. Many train services finish earlier than on an ordinary night, and the stations nearest a big display often close or let people out only.',
      'The hour after midnight is the hard one. Everybody leaves at once, the taxis are taken and the ride apps put their prices up. Waiting until one, or walking the first mile, is usually quicker.',
      'New Year’s Day has a reduced service nearly everywhere and, in parts of Scotland, none at all.',
    ],
    facts: [
      { label: 'Trains on the 31st', value: 'Many finish early' },
      { label: 'Trains on the 1st', value: 'Reduced, with a late start' },
      { label: 'Taxis after midnight', value: 'Scarce until about 2am' },
      { label: 'The best plan', value: 'A bed within walking distance' },
    ],
  },
  groups: [
    {
      id: 'cities',
      title: 'City by city',
      lede: 'The short version for each city. Its guide has the detail.',
      picks: [
        { name: 'London', text: 'Trains run all night on most lines. The stations nearest the river close early, and taxis are scarce until two.', note: 'All night', href: '/london/#logistics' },
        { name: 'Manchester', text: 'Trams run until about one. The last trains leave before midnight and night buses keep to the main routes.', note: 'Until 1am', href: '/manchester/#logistics' },
        { name: 'Birmingham', text: 'Trams until about one, trains before midnight and night buses hourly on the main roads out.', note: 'Until 1am', href: '/birmingham/#logistics' },
        { name: 'Liverpool', text: 'Local trains run until about half past one. There are no late ferries.', note: 'Until 1.30am', href: '/liverpool/#logistics' },
        { name: 'Newcastle', text: 'The Metro runs until about one. Taxis queue at the top of the hill, not on the river.', note: 'Until 1am', href: '/newcastle/#logistics' },
        { name: 'Glasgow', text: 'The subway closes in the early evening and the last trains leave at about nine. Plan this one first.', note: 'Early finish', href: '/glasgow/#logistics' },
        { name: 'Edinburgh', text: 'Trams run through the night and night buses are free after midnight. Late trains need booking.', note: 'All night', href: '/hogmanay/edinburgh/#logistics' },
      ],
    },
  ],
  source: { label: 'National Rail Enquiries', href: 'https://www.nationalrail.co.uk/' },
  related: [
    { label: 'What is open on New Year’s Day?', text: 'Shops, pharmacies, banks and pubs on the first.', href: '/whats-open/' },
    { label: 'New Year’s Eve, city by city', text: 'Seven cities, and where midnight happens in each.', href: '/cities/' },
  ],
};

export const sayIt: AnswerPage = {
  path: '/say-it/',
  title: 'How do you say Happy New Year?',
  metaTitle: 'How to say Happy New Year in Welsh, Gaelic, Irish and other languages',
  description: 'How to say Happy New Year in Welsh, Scottish Gaelic, Irish and Scots, across Europe, and at the New Years kept on other dates.',
  standfirst: '“Happy New Year” is understood everywhere in Britain. Saying it in somebody’s own language is better, and takes three words.',
  crumbs: trail,
  checked,
  sample: true,
  answer: 'In Welsh it is “Blwyddyn Newydd Dda”, in Scottish Gaelic “Bliadhna Mhath Ùr” and in Irish “Athbhliain faoi mhaise duit”.',
  detail: {
    body: [
      'The greeting belongs to the new year, not the old one. Before midnight people wish each other “all the best for the New Year”; “Happy New Year” starts at twelve.',
      'It is said the first time you meet someone in the new year, and goes on being said for a week or so. In Scotland it lasts longer, and nobody will think it odd in the middle of January.',
      'In writing, New Year’s Eve and New Year’s Day take capitals, and so does the greeting. “The new year”, meaning the months ahead, does not.',
    ],
    facts: [
      { label: 'Say it from', value: 'Midnight' },
      { label: 'Until', value: 'About a week into January' },
      { label: 'Before midnight', value: '“All the best for the New Year”' },
      { label: 'The reply', value: '“And to you”' },
    ],
  },
  groups: [
    {
      id: 'islands',
      title: 'In these islands',
      lede: 'Four languages that were here before English.',
      picks: [
        { kind: 'Welsh', name: 'Blwyddyn Newydd Dda', lang: 'cy', text: 'Word for word, “good new year”. Heard all over Wales, and sung from door to door on New Year’s morning.' },
        { kind: 'Scottish Gaelic', name: 'Bliadhna Mhath Ùr', lang: 'gd', text: '“A good new year.” The greeting of the Highlands and the islands at the bells.' },
        { kind: 'Irish', name: 'Athbhliain faoi mhaise duit', lang: 'ga', text: '“A prosperous new year to you.” To more than one person, the last word becomes “daoibh”.' },
        { kind: 'Scots', name: 'A guid New Year', lang: 'sco', text: 'In full, “a guid New Year tae ane an a’”: a good New Year to one and all.' },
      ],
    },
    {
      id: 'europe',
      title: 'Across Europe',
      lede: 'Six that you are likely to need at a party in any British city.',
      picks: [
        { kind: 'French', name: 'Bonne année', lang: 'fr', text: '“Good year.” Often followed by a wish for good health.' },
        { kind: 'Spanish', name: 'Feliz Año Nuevo', lang: 'es', text: '“Happy New Year”, said after the twelve grapes have been eaten, one for each chime.' },
        { kind: 'German', name: 'Frohes neues Jahr', lang: 'de', text: '“Happy new year.” Before midnight the wish is for “a good slide” into it.' },
        { kind: 'Italian', name: 'Buon anno', lang: 'it', text: '“Good year.” Short enough to say to everybody in the room.' },
        { kind: 'Polish', name: 'Szczęśliwego Nowego Roku', lang: 'pl', text: '“Happy New Year.” The night itself is named after Saint Sylvester.' },
        { kind: 'Portuguese', name: 'Feliz Ano Novo', lang: 'pt', text: '“Happy New Year”, in Portugal and in Brazil alike.' },
      ],
    },
    {
      id: 'other-new-years',
      title: 'For other New Years',
      lede: 'Six greetings for the New Years that fall on other dates, written as they sound.',
      picks: [
        { kind: 'Mandarin', name: 'Xīnnián kuàilè', lang: 'zh-Latn', text: '“New year happiness.” The everyday greeting at Lunar New Year.', href: '/chinese-new-year/' },
        { kind: 'Cantonese', name: 'Gung hei fat choy', lang: 'yue-Latn', text: 'A wish for prosperity, and the one most often heard in British Chinatowns.', href: '/chinese-new-year/' },
        { kind: 'Persian', name: 'Nowruz mobarak', lang: 'fa-Latn', text: '“Happy Nowruz”, said from the moment of the spring equinox.', href: '/nowruz/' },
        { kind: 'Thai', name: 'Sawasdee pee mai', lang: 'th-Latn', text: '“Hello, new year.” Said at Songkran, and on 1 January as well.', href: '/songkran/' },
        { kind: 'Hebrew', name: 'Shanah tovah', lang: 'he-Latn', text: '“A good year”, for Rosh Hashanah. A longer form adds “and a sweet one”.', href: '/rosh-hashanah/' },
        { kind: 'Gujarati', name: 'Saal Mubarak', lang: 'gu-Latn', text: '“Happy year”, for the new year that begins the morning after Diwali.', href: '/diwali/' },
      ],
    },
  ],
  related: [
    { label: 'New Year celebrations', text: 'Seven New Years, and how each is kept in Britain.', href: '/celebrations/' },
    { label: 'Hogmanay', text: 'The bells, first-footing and the words to Auld Lang Syne.', href: '/hogmanay/' },
  ],
};
