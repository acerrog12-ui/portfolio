// All site text lives here, in all three languages (uz, ru, en).
// To change a word on the site, edit it here.

export type Lang = 'uz' | 'ru' | 'en'
type T = Record<Lang, string>

export const contacts = {
  email: 'acerrog12@gmail.com',
  telegram: 'https://t.me/thedaminoff',
  telegramHandle: '@thedaminoff',
  phone: '+998 90 332 03 11',
  phoneHref: 'tel:+998903320311',
  // Telegram relay for the contact form (empty = fall back to email)
  relay: 'https://portfolio-relay-pi.vercel.app/api/contact',
  instagram: 'https://www.instagram.com/daminov_dostonbek1/',
  behance: 'https://www.behance.net/daminovdostonbek',
}

export const ui = {
  nav: {
    about: { uz: 'Men haqimda', ru: "Обо мне", en: 'About' },
    services: { uz: 'Xizmatlar', ru: "Услуги", en: 'Services' },
    projects: { uz: 'Loyihalar', ru: "Проекты", en: 'Projects' },
    contact: { uz: 'Aloqa', ru: "Контакты", en: 'Contact' },
  },
  hero: {
    // Headline stays in English in all three languages (uz, ru, en): it's the brand line.
    hi: { uz: 'ACE OF', ru: "ACE OF", en: 'ACE OF' },
    name: { uz: 'VISUALS', ru: "VISUALS", en: 'VISUALS' },
    kicker: { uz: 'Doston «Ace» Daminov · Art director va dizayner', ru: "Достон «Ace» Даминов · Арт-директор и дизайнер", en: 'Doston «Ace» Daminov · Art director & designer' },
    tagline: {
      uz: "Brendlar uçun vizual olamlar quraman: kampaniyadan sahnagaça, ğoyadan 3Dʼgaça ✦",
      ru: "Создаю визуальные миры для брендов: от кампании до сцены, от идеи до 3D ✦", en: 'I build visual worlds for brands: from campaign to stage, from idea to 3D ✦',
    },
    cta: { uz: "Boğlaniş", ru: "Связаться", en: 'Contact me' },
    scroll: { uz: 'Pastga suring', ru: "Листайте вниз", en: 'Scroll down' },
  },
  about: {
    title: { uz: 'MEN HAQIMDA', ru: "ОБО МНЕ", en: 'ABOUT ME' },
    text: {
      uz: "5 yildan ortiq tajribaga ega dizaynerman, şundan 2 yildan ortiği lead designer sifatida. Reklama kampaniyalari, brending, 3D vizuallar va katta tadbirlar sahnasi ustida işlayman. Pepsi, Agrobank, FIDE va Ōzbekiston Superligasi kabi brendlar bilan işlaganman. Keling, birga ajoyib narsa yaratamiz!",
      ru: "Я дизайнер с опытом более 5 лет, из них больше 2 лет — в роли ведущего дизайнера. Работаю над рекламными кампаниями, брендингом, 3D-визуалами и сценографией крупных мероприятий. Среди брендов, с которыми я работал, — Pepsi, Agrobank, FIDE и Суперлига Узбекистана. Давайте создадим что-то крутое вместе!", en: "I'm a designer with 5+ years of experience, 2+ of them as a lead designer. I work on ad campaigns, branding, 3D visuals and stage design for large events, for brands like Pepsi, Agrobank, FIDE and the Uzbekistan Superleague. Let's create something amazing together!",
    },
    stats: [
      { value: 5, suffix: '+', label: { uz: 'Tajriba', ru: "Опыт", en: 'Experience' }, unit: { uz: 'yil', ru: "лет", en: 'years' } },
      { value: 2, suffix: '+', label: { uz: 'Lead dizayner', ru: "Ведущий дизайнер", en: 'Lead designer' }, unit: { uz: 'yil', ru: "года", en: 'years' } },
      { value: 23, suffix: '', label: { uz: 'Yoş', ru: "Возраст", en: 'Age' } },
    ],
    award: {
      title: { uz: 'TAF!23', ru: "TAF!23", en: 'TAF!23' },
      sub: {
        uz: 'Tashkent Advertising Festival 2023. Teplo Market tadbiri uçun immersiv kōrgazma kontenti.',
        ru: "Tashkent Advertising Festival 2023. Иммерсивный выставочный контент для мероприятия Teplo Market.", en: 'Tashkent Advertising Festival 2023. Immersive exhibition content for the Teplo Market event.',
      },
      note: { uz: 'Tasnif Group bilan hamkorlikda', ru: "Совместно с Tasnif Group", en: 'In collaboration with Tasnif Group' },
    },
  },
  services: {
    title: { uz: 'XIZMATLAR', ru: "УСЛУГИ", en: 'SERVICES' },
  },
  projects: {
    title: { uz: 'LOYIHALAR', ru: "ПРОЕКТЫ", en: 'PROJECTS' },
    client: { uz: 'Mijoz', ru: "Клиент", en: 'Client' },
    view: { uz: "Kōriş", ru: "Смотреть", en: 'View project' },
    all: { uz: 'Barça işlar', ru: 'Все работы', en: 'All works' },
    open: { uz: "Bōlimga ōtiş", ru: "Открыть раздел", en: 'Open' },
    count: { uz: 'ta loyiha', ru: "проекта", en: 'projects' },
    back: { uz: 'Orqaga', ru: "Назад", en: 'Back' },
    close: { uz: 'Yopiş', ru: "Закрыть", en: 'Close' },
  },
  contact: {
    title: { uz: "IŞLAYDIGAN BŌLIB KELING", ru: "ПРИХОДИТЕ ГОТОВЫМИ К\u00a0РАБОТЕ", en: "COME READY TO WORK" },
    form: {
      name: { uz: 'Ismingiz', ru: "Ваше имя", en: 'Your name' },
      phone: { uz: 'Telefon raqamingiz', ru: 'Ваш номер телефона', en: 'Your phone number' },
      message: { uz: "Loyiha, muddat va format haqida", ru: "Проект, сроки и формат", en: 'Project, timeline and format' },
      send: { uz: 'Yuboriş', ru: "Отправить", en: 'Send' },
      sending: { uz: 'Yuborilmoqda…', ru: 'Отправляю…', en: 'Sending…' },
      sent: { uz: 'Rahmat! Xabaringiz yetib keldi, tez orada javob beraman.', ru: 'Спасибо! Сообщение получено, скоро отвечу.', en: "Thanks! Your message arrived, I'll reply soon." },
      error: { uz: 'Yuborib boʻlmadi. Iltimos, Telegram orqali yozing.', ru: 'Не удалось отправить. Напишите, пожалуйста, в Telegram.', en: "Couldn't send. Please message me on Telegram." },
    },
    lead: {
      uz: "Loyihangiz haqida qisqaça yozing: ğoya, muddat va format. Javob beraman va işni birga rejalaştiramiz. Begona emas ekansiz, keliştirib beramiz narxlarni 😉",
      ru: "Коротко опишите проект: идею, сроки и формат. Я отвечу, и мы вместе спланируем работу. Для своих — договоримся о цене 😉", en: "Tell me about your project: the idea, timeline and format. I'll reply and we'll plan the work together. Not a stranger? We'll work out a friendly price 😉",
    },
    social: { uz: 'Ijtimoiy tarmoqlar', ru: "Соцсети", en: 'Social' },
    mail: { uz: 'Aloqa', ru: "Контакты", en: 'Contact' },
    rights: { uz: 'Barça huquqlar himoyalangan', ru: "Все права защищены", en: 'All rights reserved' },
  },
} satisfies Record<string, unknown>

// svc(title uz, title en, text uz, text en, title ru, text ru)
const svc = (uz: string, en: string, tuz: string, ten: string, ru: string, tru: string) => ({ title: { uz, ru, en }, text: { uz: tuz, ru: tru, en: ten } })

export const services: { title: T; text: T }[] = [
  svc('Art direction', 'Art direction', "3D va reklama kampaniyalarini ğoyadan tayyor natijagaça boşqariş.", '3D and ad campaigns led from idea to final delivery.', "Арт-дирекшн", "Руковожу 3D- и рекламными кампаниями от идеи до готового результата."),
  svc('Key visual va kampaniyalar', 'Key visuals & campaigns', 'Festival, konsert va aksiyalar uçun asosiy vizual va uning barça formatlari.', 'Key visuals for festivals, shows and promos, adapted to every format.', "Key visual и кампании", "Ключевой визуал для фестивалей, концертов и промоакций и все его адаптации."),
  svc('Brending va brendbuk', 'Branding & brand book', "Brendning tōliq vizual tili: ranglar, şriftlar, qoidalar.", 'A complete visual language: colors, type and rules.', "Брендинг и брендбук", "Полный визуальный язык бренда: цвета, шрифты, правила."),
  svc('Logotip dizayni', 'Logo design', 'Esda qoladigan, har qanday ōlçamda işlaydigan logotiplar.', 'Memorable logos that work at any size.', "Дизайн логотипа", "Запоминающиеся логотипы, которые работают в любом размере."),
  svc('Sport va klub identifikatsiyasi', 'Sports & club identity', "Ligalar, klublar va sport tadbirlari uçun brending. Masalan, Ōzbekiston Superligasi.", 'Branding for leagues, clubs and sports events, like the Uzbekistan Superleague.', "Спортивная айдентика", "Брендинг для лиг, клубов и спортивных событий, например Суперлиги Узбекистана."),
  svc('SMM dizayn', 'Social media design', 'Ijtimoiy tarmoqlar uçun post, story va kampaniya dizayni.', 'Posts, stories and campaign content for social media.', "SMM-дизайн", "Посты, сторис и кампании для соцсетей."),
  svc('Motion dizayn va animatsiya', 'Motion design & animation', 'Logotip animatsiyasi, reklama roliklari va LED ekran kontenti.', 'Logo animation, ad spots and LED screen content.', "Моушн-дизайн и анимация", "Анимация логотипов, рекламные ролики и контент для LED-экранов."),
  svc('Poligrafiya', 'Print design', 'Afişa, billbord, flayer, bannerlar va boşqa bosma materiallar.', 'Posters, billboards, flyers, banners and other print.', "Полиграфия", "Афиши, билборды, флаеры, баннеры и другая печатная продукция."),
  svc('Qadoq dizayni', 'Packaging design', 'Javonda ajralib turadigan qadoqlar.', 'Packaging that stands out on the shelf.', "Дизайн упаковки", "Упаковка, которая выделяется на полке."),
  svc('Illyustratsiya', 'Illustration', 'Brend va kampaniyalar uçun noyob illyustratsiyalar.', 'Original illustrations for brands and campaigns.', "Иллюстрация", "Авторские иллюстрации для брендов и кампаний."),
  svc('Prezentatsiya dizayni', 'Presentation design', "Investor, brend va tadbirlar uçun taʼsirli prezentatsiyalar.", 'Pitch, brand and event decks that make an impact.', "Дизайн презентаций", "Сильные презентации для инвесторов, брендов и мероприятий."),
]

// "Big projects" block: Doston leads a team across these directions.
export const team = {
  title: { uz: 'KATTA LOYIHALAR', ru: "БОЛЬШИЕ ПРОЕКТЫ", en: 'BIG PROJECTS' },
  lead: {
    uz: "Bu mening şaxsiy portfoliom, lekin har bir yōnalişda ōz jamoam bor. Şuning uçun istalgan hajmdagi loyihani, ğoyadan to sahnagaça, tōliq olib çiqa olamiz.",
    ru: "Это моё личное портфолио, но в каждом направлении у меня есть своя команда. Поэтому мы берём проекты любого масштаба и ведём их полностью — от идеи до сцены.", en: "This is my personal portfolio, but I also lead a team with specialists in every direction. That means we can take on a project of any size and deliver it end to end, from idea to stage.",
  },
  cta: { uz: 'Loyihani muhokama qiliş', ru: "Обсудить проект", en: "Let's discuss your project" },
  directions: [
    { uz: 'Art direction', ru: "Арт-дирекшн", en: 'Art direction' },
    { uz: '3D dizayn', ru: "3D-дизайн", en: '3D design' },
    { uz: 'Motion va animatsiya', ru: "Моушн и анимация", en: 'Motion & animation' },
    { uz: 'Videografiya', ru: "Видеосъёмка", en: 'Videography' },
    { uz: 'Event va sahna dizayni', ru: "Ивент и сценография", en: 'Event & stage design' },
    { uz: 'Brending', ru: "Брендинг", en: 'Branding' },
  ] as T[],
}

export type Project = {
  /** color of the last word of the title on the cover (default violet) */
  accent?: string
  /** an animated HTML presentation under public/, shown in the project view instead of images */
  embed?: string
  id: string
  client: string
  title: T
  tags: T
  year?: string
  // videos in public/video/<name>.mp4 (poster: <name>.jpg), shown above the layout
  videos?: string[]
  // false when the project has no full layout image (video only)
  full?: boolean
  // extra line shown under the title in the project view
  note?: T
  // long layouts split into <id>-full-1.webp ... <id>-full-N.webp
  parts?: number
}

// Order = order on the site. Images: public/img/<id>.webp (cover), <id>-s.webp (640px, phones) and <id>-full.webp (full layout).
export const projects: Project[] = [
  { id: 'pepsi', client: 'Pepsi', title: { uz: 'Pepsi Lazzatli Fest', ru: "Pepsi Lazzatli Fest", en: 'Pepsi Lazzatli Fest' }, tags: { uz: 'Key visual · Festival', ru: "Key visual · Фестиваль", en: 'Key visual · Festival' }, videos: ['pepsi-video'] },
  { id: 'chempion', client: 'Mirshakar Fayzullayev', title: { uz: 'Çempion şousi', ru: "Шоу «Чемпион»", en: 'Chempion show' }, tags: { uz: 'Key visual · Konsert', ru: "Key visual · Концерт", en: 'Key visual · Concert' }, videos: ['chempion-video'], embed: 'chempion/index.html', full: false },
  { id: 'agrobank', client: 'Agrobank', title: { uz: 'Ipoteka kampaniyasi', ru: "Ипотечная кампания", en: 'Mortgage campaign' }, tags: { uz: '3D · Reklama', ru: "3D · Реклама", en: '3D · Advertising' }, videos: ['agrobank-video'] },
  { id: 'fide', client: 'FIDE', title: { uz: 'Rapid va blits bōyiça jahon çempionati', ru: "Чемпионат мира по рапиду и блицу", en: 'World Rapid & Blitz Championships' }, tags: { uz: 'Event · Key visual', ru: "Ивент · Key visual", en: 'Event · Key visual' }, year: '2023', videos: ['fide-video'] },
  { id: 'istedodlar-zamini', client: 'Yoshlar harakati', title: { uz: "Ōzbekiston — Isteʼdodlar zamini", ru: "Узбекистан — земля талантов", en: "Uzbekistan — Land of Talents" }, tags: { uz: 'Sahna dizayni', ru: "Сценография", en: 'Stage design' }, year: '2025' , embed: 'ucfutbol/index.html', full: false },
  { id: 'superleague', client: 'UZSL', title: { uz: "Ōzbekiston Superligasi", ru: "Суперлига Узбекистана", en: 'Uzbekistan Superleague' }, tags: { uz: 'Brending · Sport', ru: "Брендинг · Спорт", en: 'Branding · Sports' }, videos: ['superleague-video'] },
  { id: 'chiroqchi', client: 'Chiroqchi', title: { uz: 'Çiroqçi tumani brendi', ru: "Бренд Чиракчинского района", en: 'Chiroqchi district identity' }, tags: { uz: 'Brending · Şahar', ru: "Брендинг · Территория", en: 'Branding · Place' } },
  { id: 'amir-temur', client: "O'zbekistondagi Islom sivilizatsiyasi markazi", title: { uz: 'Sohibqiron Amir Temur', ru: "Сохибкиран Амир Темур", en: 'Sohibqiron Amir Temur' }, tags: { uz: 'Vizual · Kōrgazma', ru: "Визуалы · Выставка", en: 'Visuals · Exhibition' }, videos: ['immersive-video'] },
  { id: 'violence', client: 'Tasnif Group', title: { uz: 'Zōravonlik — immersiv kōrgazma', ru: 'Насилие — иммерсивная выставка', en: 'Violence — immersive exhibition' }, tags: { uz: 'Immersiv · 3D mapping', ru: "Иммерсив · 3D-мэппинг", en: 'Immersive · 3D mapping' }, year: '2023' , embed: 'violence/index.html', full: false },
  { id: 'oltin-chinor', client: 'Oltin Chinor', title: { uz: 'Oltin Çinor milliy mukofoti', ru: "Национальная премия «Олтин Чинор»", en: 'Oltin Chinor national award' }, tags: { uz: 'Sahna dizayni', ru: "Сценография", en: 'Stage design' }, year: '2024' , embed: 'oltinchinor/index.html', full: false },
  { id: 'mkbank', client: 'MKBANK', title: { uz: 'Omonat kampaniyasi', ru: "Кампания по вкладам", en: 'Deposit campaign' }, tags: { uz: '3D · Reklama', ru: "3D · Реклама", en: '3D · Advertising' }, videos: ['mkbank-video'] },
  { id: 'bliss', client: 'Bliss', title: { uz: 'BAAga sayohat aksiyasi', ru: "Акция «Поездка в ОАЭ»", en: 'Trip to the UAE promo' }, tags: { uz: 'Key visual · Aksiya', ru: "Key visual · Промо", en: 'Key visual · Promo' }, videos: ['bliss-video'] },
  {
    id: 'peace-intro',
    client: 'AI film',
    title: { uz: 'Let peace be our guide', ru: 'Let peace be our guide', en: 'Let peace be our guide' },
    tags: { uz: 'AI · Art direction', ru: 'AI · Арт-дирекшн', en: 'AI · Art direction' },
    note: {
      uz: "Art direction: Doston Daminov. Loyiha 3-4 kişilik jamoa bilan birga qilingan.",
      ru: 'Арт-дирекшн: Достон Даминов. Проект сделан вместе с командой из 3–4 человек.',
      en: 'Art direction by Doston Daminov, made together with a team of 3–4 people.',
    },
    videos: ['intro-video'],
    full: false,
  },
  {
    id: 'qahramonlar',
    client: 'Qahramonlar davri',
    title: { uz: 'Bolalar bayrami makoni, 3D vizualizatsiya', ru: 'Праздничное пространство для детей, 3D-визуализация', en: "Kids' holiday venue, 3D visualization" },
    tags: { uz: '3D · Event dizayn', ru: '3D · Ивент-дизайн', en: '3D · Event design' },
    parts: 2,
  },
  { id: 'yonda-awards', client: 'Yonda Awards', title: { uz: 'Yonda Awards 2025', ru: 'Yonda Awards 2025', en: 'Yonda Awards 2025' }, tags: { uz: 'Key visual · 3D · Mukofot', ru: 'Key visual · 3D · Премия', en: 'Key visual · 3D · Awards' }, year: '2025' },
  { id: 'logipro', client: 'Logi Pro', title: { uz: 'Logi Pro logistika akademiyasi', ru: 'Логистическая академия Logi Pro', en: 'Logi Pro logistics academy' }, tags: { uz: 'Brending · Taʼlim', ru: 'Брендинг · Образование', en: 'Branding · Education' } },
  { id: 'khiva-ethnosport', client: 'Ethnosport Khiva', title: { uz: 'Ethnosport Khiva 2023', ru: 'Ethnosport Khiva 2023', en: 'Ethnosport Khiva 2023' }, tags: { uz: 'Festival identifikatsiyasi · Key visual · Motion', ru: 'Айдентика фестиваля · Key visual · Моушн', en: 'Festival identity · Key visual · Motion' }, year: '2023', embed: 'khiva/index.html', full: false },
  { id: 'salomtv', client: 'Salom TV', title: { uz: 'Salom TV brendingi', ru: 'Брендинг Salom TV', en: 'Salom TV branding' }, tags: { uz: 'Brending · Onlayn kinoteatr · Motion', ru: 'Брендинг · Онлайн-кинотеатр · Моушн', en: 'Branding · Online cinema · Motion' }, year: '2026', embed: 'salomtv/index.html', full: false },
  { id: 'arch-design', client: 'Arch Design', title: { uz: 'Arch Design arxitektura studiyasi brendbuki', ru: 'Брендбук архитектурной студии Arch Design', en: 'Arch Design architecture studio brandbook' }, tags: { uz: 'Brending · Brendbuk · Arxitektura', ru: 'Брендинг · Брендбук · Архитектура', en: 'Branding · Brandbook · Architecture' }, year: '2024', parts: 2 },
  { id: 'chust', client: 'Chust', title: { uz: 'Çust şahar brendi', ru: "Бренд города Чуст", en: 'Chust city branding' }, tags: { uz: 'Brending · Şahar', ru: "Брендинг · Город", en: 'Branding · City' } },
  { id: 'samad', client: 'Samad', title: { uz: 'Samad qadoq dizayni', ru: 'Дизайн упаковки Samad', en: 'Samad packaging design' }, tags: { uz: 'Qadoq · Plombir, sorbet, çuçvara', ru: 'Упаковка · Пломбир, сорбет, пельмени', en: 'Packaging · Ice cream, sorbet, dumplings' }, embed: 'samad/index.html', full: false },
  { id: 'talaba-fest', client: 'Talaba Fest', title: { uz: 'Talaba Fest festivali', ru: 'Фестиваль Talaba Fest', en: 'Talaba Fest festival' }, tags: { uz: 'Identifikatsiya · 3D hudud dizayni', ru: 'Айдентика · 3D-дизайн территории', en: 'Identity · 3D venue design' }, embed: 'talabafest/index.html', full: false },
  { id: 'yoshlar-kuni', client: 'Yoshlar ishlari agentligi', title: { uz: '30-iyun · Yoshlar kuni', ru: '30 июня · День молодёжи', en: 'June 30 · Youth Day' }, tags: { uz: 'Identifikatsiya · Animatsiya · Key visual', ru: 'Айдентика · Анимация · Key visual', en: 'Identity · Animation · Key visual' }, embed: 'yoshlar/index.html', full: false },
]

// Work directions shown as big cards in the Projects section.
// Clicking a card opens that direction's page with all its projects.
// To move a project, put its id in another list.
// covers: optional image names for the 3 pictures on the big card (default: first projects)
export type Category = { id: string; title: T; text: T; projects: string[]; covers?: string[] }
export const categories: Category[] = [
  {
    id: 'key-visual',
    title: { uz: 'Key visual va kampaniyalar', ru: "Key visual и кампании", en: 'Key visuals & campaigns' },
    text: { uz: 'Festival, konsert va aksiyalar uçun asosiy vizuallar', ru: "Ключевые визуалы для фестивалей, концертов и промоакций", en: 'Key visuals for festivals, shows and promos' },
    projects: ['khiva-ethnosport', 'chempion', 'yoshlar-kuni', 'pepsi', 'yonda-awards', 'bliss'],
  },
  {
    id: '3d',
    title: { uz: '3D va reklama', ru: "3D и реклама", en: '3D & advertising' },
    text: { uz: 'Banklar va brendlar uçun 3D reklama hamda immersiv kontent', ru: "3D-реклама и иммерсивный контент для банков и брендов", en: '3D ads and immersive content for banks and brands' },
    projects: ['violence', 'agrobank', 'mkbank'],
  },
  {
    id: 'event',
    title: { uz: 'Event va sahna dizayni', ru: "Ивент и сценография", en: 'Event & stage design' },
    text: { uz: "Katta tadbirlar uçun sahna, ekran va kōrgazma dizayni", ru: "Дизайн сцены, экранов и выставок для крупных мероприятий", en: 'Stage, screen and exhibition design for large events' },
    projects: ['fide', 'talaba-fest', 'istedodlar-zamini', 'oltin-chinor', 'qahramonlar', 'amir-temur'],
  },
  {
    id: 'branding',
    title: { uz: 'Brending va sport', ru: "Брендинг и спорт", en: 'Branding & sports' },
    text: { uz: 'Klublar, ligalar va hududlar uçun vizual identifikatsiya', ru: "Айдентика для клубов, лиг и территорий", en: 'Visual identity for clubs, leagues and places' },
    projects: ['salomtv', 'arch-design', 'samad', 'chust', 'superleague', 'logipro', 'chiroqchi'],
  },
  {
    id: 'ai',
    title: { uz: 'AI va art direction', ru: 'AI и арт-дирекшн', en: 'AI & art direction' },
    text: { uz: "Jamoa bilan qilingan AI filmlar va vizual hikoyalar", ru: 'AI-фильмы и визуальные истории, сделанные с командой', en: 'AI films and visual stories made with a team' },
    projects: ['peace-intro'],
    covers: ['peace-intro', 'peace-intro-b', 'peace-intro-c'],
  },
]

// Client marquee. To show a logo instead of the name, put the file in public/img/logos/
// and write its file name in logo (any colors: the site turns it white).
// White one-colour logos made from the project layouts; ratio = width / height
export const clients: { name: string; logo?: string; ratio?: number }[] = [
  { name: 'Pepsi', logo: 'pepsi.webp', ratio: 1.005 },
  { name: 'Agrobank', logo: 'agrobank.webp', ratio: 4.979 },
  { name: 'MKBANK', logo: 'mkbank.webp', ratio: 4.555 },
  { name: 'FIDE', logo: 'fide.webp', ratio: 1.169 },
  { name: 'Uzbekistan Superleague', logo: 'uzsl.webp', ratio: 3.663 },
  { name: 'Bliss', logo: 'bliss.webp', ratio: 1.057 },
  { name: 'Tasnif Group', logo: 'tasnif-group.webp', ratio: 3.58 },
  { name: 'Oltin Chinor', logo: 'oltin-chinor.webp', ratio: 2.045 },
  { name: 'Yoshlar ishlari agentligi', logo: 'yoshlar-ishlari.webp', ratio: 5.121 },
  { name: 'InnoWeek 2024', logo: 'innoweek.webp', ratio: 3.189 },
  { name: 'CCI Uzbekistan · Next Talent', logo: 'cci-next-talent.webp', ratio: 3.648 },
]

// "All works" page: every project from every direction, in the same order as the directions
export const allWorks: Category = {
  id: 'all',
  title: { uz: 'Barça işlar', ru: 'Все работы', en: 'All works' },
  text: { uz: 'Hamma yōnalişlardagi loyihalar', ru: 'Проекты всех направлений', en: 'Projects from every direction' },
  projects: [...new Set(categories.flatMap((c) => c.projects))],
}
