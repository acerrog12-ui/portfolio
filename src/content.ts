// All site text lives here, in both languages.
// To change a word on the site, edit it here.

export type Lang = 'uz' | 'en'
type T = Record<Lang, string>

export const contacts = {
  email: 'acerrog12@gmail.com',
  telegram: 'https://t.me/thedaminoff',
  instagram: 'https://www.instagram.com/daminov_dostonbek1/',
  behance: 'https://www.behance.net/daminovdostonbek',
}

export const ui = {
  nav: {
    about: { uz: 'Men haqimda', en: 'About' },
    services: { uz: 'Xizmatlar', en: 'Services' },
    projects: { uz: 'Loyihalar', en: 'Projects' },
    contact: { uz: 'Aloqa', en: 'Contact' },
  },
  hero: {
    // Headline stays in English in both languages: it's the brand line.
    hi: { uz: 'ACE OF', en: 'ACE OF' },
    name: { uz: 'VISUALS', en: 'VISUALS' },
    kicker: { uz: 'Doston «Ace» Daminov · Art director va dizayner', en: 'Doston «Ace» Daminov · Art director & designer' },
    tagline: {
      uz: "Brendlar uchun vizual olamlar quraman: kampaniyadan sahnagacha, g'oyadan 3D'gacha ✦",
      en: 'I build visual worlds for brands: from campaign to stage, from idea to 3D ✦',
    },
    cta: { uz: "Bog'lanish", en: 'Contact me' },
    scroll: { uz: 'Pastga suring', en: 'Scroll down' },
  },
  about: {
    title: { uz: 'MEN HAQIMDA', en: 'ABOUT ME' },
    text: {
      uz: "5 yildan ortiq tajribaga ega dizaynerman, shundan 2 yildan ortig'i lead designer sifatida. Reklama kampaniyalari, brending, 3D vizuallar va katta tadbirlar sahnasi ustida ishlayman. Pepsi, Agrobank, FIDE va O'zbekiston Superligasi kabi brendlar bilan ishlaganman. Keling, birga ajoyib narsa yaratamiz!",
      en: "I'm a designer with 5+ years of experience, 2+ of them as a lead designer. I work on ad campaigns, branding, 3D visuals and stage design for large events, for brands like Pepsi, Agrobank, FIDE and the Uzbekistan Superleague. Let's create something amazing together!",
    },
    stats: [
      { value: 5, suffix: '+', label: { uz: 'Tajriba', en: 'Experience' }, unit: { uz: 'yil', en: 'years' } },
      { value: 2, suffix: '+', label: { uz: 'Lead dizayner', en: 'Lead designer' }, unit: { uz: 'yil', en: 'years' } },
      { value: 23, suffix: '', label: { uz: 'Yosh', en: 'Age' }, unit: { uz: 'yosh', en: 'y/o' } },
    ],
    award: {
      title: { uz: 'TAF!23', en: 'TAF!23' },
      sub: {
        uz: 'Tashkent Advertising Festival 2023. Teplo Market tadbiri uchun immersiv ko‘rgazma kontenti.',
        en: 'Tashkent Advertising Festival 2023. Immersive exhibition content for the Teplo Market event.',
      },
      note: { uz: 'Tasnif Group bilan hamkorlikda', en: 'In collaboration with Tasnif Group' },
    },
  },
  services: {
    title: { uz: 'XIZMATLAR', en: 'SERVICES' },
  },
  projects: {
    title: { uz: 'LOYIHALAR', en: 'PROJECTS' },
    client: { uz: 'Mijoz', en: 'Client' },
    view: { uz: "Ko'rish", en: 'View project' },
    all: { uz: "Barcha ishlar Behance'da", en: 'All works on Behance' },
    open: { uz: "Bo'limga o'tish", en: 'Open' },
    count: { uz: 'ta loyiha', en: 'projects' },
    back: { uz: 'Orqaga', en: 'Back' },
    close: { uz: 'Yopish', en: 'Close' },
  },
  contact: {
    title: { uz: "ISHLAYDIGAN BO'LIB KELING", en: "COME READY TO WORK" },
    form: {
      name: { uz: 'Ismingiz', en: 'Your name' },
      email: { uz: 'Email', en: 'Email' },
      message: { uz: "Loyiha, muddat va format haqida", en: 'Project, timeline and format' },
      send: { uz: 'Yuborish', en: 'Send' },
    },
    lead: {
      uz: "Loyihangiz haqida qisqacha yozing: g'oya, muddat va format. Javob beraman va ishni birga rejalashtiramiz. Begona emas ekansiz, kelishtirib beramiz narxlarni 😉",
      en: "Tell me about your project: the idea, timeline and format. I'll reply and we'll plan the work together. Not a stranger? We'll work out a friendly price 😉",
    },
    social: { uz: 'Ijtimoiy tarmoqlar', en: 'Social' },
    mail: { uz: 'Aloqa', en: 'Contact' },
    rights: { uz: 'Barcha huquqlar himoyalangan', en: 'All rights reserved' },
  },
} satisfies Record<string, unknown>

const svc = (uz: string, en: string, tuz: string, ten: string) => ({ title: { uz, en }, text: { uz: tuz, en: ten } })

export const services: { title: T; text: T }[] = [
  svc('Art direction', 'Art direction', "3D va reklama kampaniyalarini g'oyadan tayyor natijagacha boshqarish.", '3D and ad campaigns led from idea to final delivery.'),
  svc('Key visual va kampaniyalar', 'Key visuals & campaigns', 'Festival, konsert va aksiyalar uchun asosiy vizual va uning barcha formatlari.', 'Key visuals for festivals, shows and promos, adapted to every format.'),
  svc('Brending va brendbuk', 'Branding & brand book', "Brendning to'liq vizual tili: ranglar, shriftlar, qoidalar.", 'A complete visual language: colors, type and rules.'),
  svc('Logotip dizayni', 'Logo design', 'Esda qoladigan, har qanday o‘lchamda ishlaydigan logotiplar.', 'Memorable logos that work at any size.'),
  svc('Sport va klub identifikatsiyasi', 'Sports & club identity', "Ligalar, klublar va sport tadbirlari uchun brending. Masalan, O'zbekiston Superligasi.", 'Branding for leagues, clubs and sports events, like the Uzbekistan Superleague.'),
  svc('SMM dizayn', 'Social media design', 'Ijtimoiy tarmoqlar uchun post, story va kampaniya dizayni.', 'Posts, stories and campaign content for social media.'),
  svc('Motion dizayn va animatsiya', 'Motion design & animation', 'Logotip animatsiyasi, reklama roliklari va LED ekran kontenti.', 'Logo animation, ad spots and LED screen content.'),
  svc('Poligrafiya', 'Print design', 'Afisha, billbord, flayer, bannerlar va boshqa bosma materiallar.', 'Posters, billboards, flyers, banners and other print.'),
  svc('Qadoq dizayni', 'Packaging design', 'Javonda ajralib turadigan qadoqlar.', 'Packaging that stands out on the shelf.'),
  svc('Illyustratsiya', 'Illustration', 'Brend va kampaniyalar uchun noyob illyustratsiyalar.', 'Original illustrations for brands and campaigns.'),
  svc('Prezentatsiya dizayni', 'Presentation design', "Investor, brend va tadbirlar uchun ta'sirli prezentatsiyalar.", 'Pitch, brand and event decks that make an impact.'),
]

// "Big projects" block: Doston leads a team across these directions.
export const team = {
  title: { uz: 'KATTA LOYIHALAR', en: 'BIG PROJECTS' },
  lead: {
    uz: "Bu mening shaxsiy portfoliom, lekin har bir yo'nalishda o'z jamoam bor. Shuning uchun istalgan hajmdagi loyihani, g'oyadan to sahnagacha, to'liq olib chiqa olamiz.",
    en: "This is my personal portfolio, but I also lead a team with specialists in every direction. That means we can take on a project of any size and deliver it end to end, from idea to stage.",
  },
  cta: { uz: 'Loyihani muhokama qilish', en: "Let's discuss your project" },
  directions: [
    { uz: 'Art direction', en: 'Art direction' },
    { uz: '3D dizayn', en: '3D design' },
    { uz: 'Motion va animatsiya', en: 'Motion & animation' },
    { uz: 'Videografiya', en: 'Videography' },
    { uz: 'Event va sahna dizayni', en: 'Event & stage design' },
    { uz: 'Brending', en: 'Branding' },
  ] as T[],
}

export type Project = {
  id: string
  client: string
  title: T
  tags: T
  year?: string
}

// Order = order on the site. Images: public/img/<id>.jpg (cover) and <id>-full.jpg (full layout).
export const projects: Project[] = [
  { id: 'pepsi', client: 'Pepsi', title: { uz: 'Pepsi Lazzatli Fest', en: 'Pepsi Lazzatli Fest' }, tags: { uz: 'Key visual · Festival', en: 'Key visual · Festival' } },
  { id: 'chempion', client: 'Mirshakar Fayzullayev', title: { uz: 'Chempion shousi', en: 'Chempion show' }, tags: { uz: 'Key visual · Konsert', en: 'Key visual · Concert' } },
  { id: 'agrobank', client: 'Agrobank', title: { uz: 'Ipoteka kampaniyasi', en: 'Mortgage campaign' }, tags: { uz: '3D · Reklama', en: '3D · Advertising' } },
  { id: 'fide', client: 'FIDE', title: { uz: 'Rapid va blits bo‘yicha jahon chempionati', en: 'World Rapid & Blitz Championships' }, tags: { uz: 'Event · Key visual', en: 'Event · Key visual' }, year: '2023' },
  { id: 'istedodlar-zamini', client: 'Yoshlar harakati', title: { uz: "O'zbekiston — Iste'dodlar zamini", en: "Uzbekistan — Land of Talents" }, tags: { uz: 'Sahna dizayni', en: 'Stage design' }, year: '2025' },
  { id: 'superleague', client: 'UZSL', title: { uz: "O'zbekiston Superligasi", en: 'Uzbekistan Superleague' }, tags: { uz: 'Brending · Sport', en: 'Branding · Sports' } },
  { id: 'uzsl-awards', client: 'UZSL', title: { uz: "Yilning eng zo'rlari", en: 'Best of the Year awards' }, tags: { uz: 'Sport · SMM', en: 'Sports · Social' } },
  { id: 'chiroqchi', client: 'Chiroqchi', title: { uz: 'Chiroqchi tumani brendi', en: 'Chiroqchi district identity' }, tags: { uz: 'Brending · Shahar', en: 'Branding · Place' } },
  { id: 'amir-temur', client: "O'zbekistondagi Islom sivilizatsiyasi markazi", title: { uz: 'Sohibqiron Amir Temur', en: 'Sohibqiron Amir Temur' }, tags: { uz: 'Vizual · Ko‘rgazma', en: 'Visuals · Exhibition' } },
  { id: 'violence', client: 'Tasnif Group', title: { uz: 'Violence ko‘rgazmasi', en: 'Violence exhibition' }, tags: { uz: 'Immersiv · 3D mapping', en: 'Immersive · 3D mapping' }, year: '2023' },
  { id: 'oltin-chinor', client: 'Oltin Chinor', title: { uz: 'Oltin Chinor milliy mukofoti', en: 'Oltin Chinor national award' }, tags: { uz: 'Sahna dizayni', en: 'Stage design' }, year: '2024' },
  { id: 'mkbank', client: 'MKBANK', title: { uz: 'Omonat kampaniyasi', en: 'Deposit campaign' }, tags: { uz: '3D · Reklama', en: '3D · Advertising' } },
  { id: 'bliss', client: 'Bliss', title: { uz: 'BAAga sayohat aksiyasi', en: 'Trip to the UAE promo' }, tags: { uz: 'Key visual · Aksiya', en: 'Key visual · Promo' } },
]

// Work directions shown as big cards in the Projects section.
// Clicking a card opens that direction's page with all its projects.
// To move a project, put its id in another list.
export type Category = { id: string; title: T; text: T; projects: string[] }
export const categories: Category[] = [
  {
    id: 'key-visual',
    title: { uz: 'Key visual va kampaniyalar', en: 'Key visuals & campaigns' },
    text: { uz: 'Festival, konsert va aksiyalar uchun asosiy vizuallar', en: 'Key visuals for festivals, shows and promos' },
    projects: ['pepsi', 'chempion', 'bliss', 'uzsl-awards'],
  },
  {
    id: '3d',
    title: { uz: '3D va reklama', en: '3D & advertising' },
    text: { uz: 'Banklar va brendlar uchun 3D reklama hamda immersiv kontent', en: '3D ads and immersive content for banks and brands' },
    projects: ['agrobank', 'mkbank', 'violence'],
  },
  {
    id: 'event',
    title: { uz: 'Event va sahna dizayni', en: 'Event & stage design' },
    text: { uz: "Katta tadbirlar uchun sahna, ekran va ko'rgazma dizayni", en: 'Stage, screen and exhibition design for large events' },
    projects: ['fide', 'istedodlar-zamini', 'oltin-chinor', 'amir-temur'],
  },
  {
    id: 'branding',
    title: { uz: 'Brending va sport', en: 'Branding & sports' },
    text: { uz: 'Klublar, ligalar va hududlar uchun vizual identifikatsiya', en: 'Visual identity for clubs, leagues and places' },
    projects: ['superleague', 'chiroqchi'],
  },
]

export const clients = ['Pepsi', 'Agrobank', 'MKBANK', 'FIDE', 'UZSL', 'Bliss', 'Tasnif Group', 'Oltin Chinor', 'Chiroqchi']
