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
    everything: { uz: 'Hammasi', ru: 'Все', en: 'All' },
    open: { uz: "Bōlimga ōtiş", ru: "Открыть раздел", en: 'Open' },
    count: { uz: 'ta loyiha', ru: "проекта", en: 'projects' },
    back: { uz: 'Orqaga', ru: "Назад", en: 'Back' },
    backToProjects: { uz: 'Loyihalarga qaytiş', ru: 'Вернуться к проектам', en: 'Back to projects' },
    close: { uz: 'Yopiş', ru: "Закрыть", en: 'Close' },
    about: { uz: 'Loyiha haqida', ru: 'О проекте', en: 'About the project' },
    year: { uz: 'Yil', ru: 'Год', en: 'Year' },
    work: { uz: 'Iş', ru: 'Работа', en: 'Work' },
    role: { uz: 'Mening vazifam', ru: 'Моя роль', en: 'My role' },
    // {s} = studio name
    madeAt: { uz: '{s} dizayn studiyasidagi faoliyatim davrida tayyorlangan', ru: 'Сделано в период моей работы в дизайн-студии {s}', en: 'Made during my time at {s} design studio' },
    rights: { uz: '© {s}. Loyihaning mualliflik huquqlari studiyaga tegişli.', ru: '© {s}. Авторские права на проект принадлежат студии.', en: '© {s}. All rights to this project belong to the studio.' },
  },
  contact: {
    title: { uz: "KELING, BIRGA IŞLAYMIZ", ru: "ДАВАЙТЕ РАБОТАТЬ ВМЕСТЕ", en: "LET'S WORK TOGETHER" },
    form: {
      name: { uz: 'Ismingiz', ru: "Ваше имя", en: 'Your name' },
      phone: { uz: 'Telefon raqamingiz', ru: 'Ваш номер телефона', en: 'Your phone number' },
      email: { uz: 'yoki email', ru: 'или email', en: 'or email' },
      need: { uz: 'Telefon yoki email yozing', ru: 'Укажите телефон или email', en: 'Please add a phone or email' },
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
  svc("Vizual brending", "Visual branding", "Logotip işlab çiqiş\nBrend aydentikasi va stilistikasi\nGaydlayn va brendbuk işlab çiqiş\nKorporativ dizaynlar\nQadoqlaş dizayni", "Logo design\nBrand identity and style\nGuidelines and brand books\nCorporate design\nPackaging design", "Визуальный брендинг", "Разработка логотипа\nАйдентика и стилистика бренда\nГайдлайн и брендбук\nКорпоративный дизайн\nДизайн упаковки"),
  svc("Grafik va vizual dizayn", "Graphic & visual design", "Reklama konseptlari, bannerlar, key visual\nInfografikalar\nTaqdimotlar dizayni\nIllyustratsiyalar\nKatalog, jurnal va albom dizayni", "Ad concepts, banners, key visuals\nInfographics\nPresentation design\nIllustration\nCatalog, magazine and album design", "Графический и визуальный дизайн", "Рекламные концепции, баннеры, key visual\nИнфографика\nДизайн презентаций\nИллюстрации\nДизайн каталогов, журналов и альбомов"),
  svc("Motion dizayn va animatsiya", "Motion design & animation", "2D va 3D animatsion videolar\nLogotip animatsiyasi\nTaqdimotlar uçun animatsiyalar\nTadbirlar uçun ekran grafikasi, main fon\n3D modeling va 3D vizualizatsiya\nNaked Eye formatdagi videolar\nIntro/outro videolar", "2D and 3D animated videos\nLogo animation\nAnimation for presentations\nEvent screen graphics and main backdrops\n3D modeling and visualization\nNaked Eye (anamorphic) videos\nIntros and outros", "Моушн-дизайн и анимация", "2D и 3D анимационные видео\nАнимация логотипа\nАнимация для презентаций\nЭкранная графика для мероприятий, main fon\n3D-моделирование и визуализация\nВидео в формате Naked Eye\nIntro/outro"),
  svc("Video production", "Video production", "Reklama roliklari\nBrend taniştiruv roliklari\nKontent videolar (promo, reels)\nIntervyular va reportajlar\nIjtimoiy video roliklar\nHujjatli filmlar\nSsenariylaştiriş", "Commercials\nBrand introduction films\nContent videos (promo, reels)\nInterviews and reports\nSocial videos\nDocumentaries\nScriptwriting", "Видеопродакшн", "Рекламные ролики\nИмиджевые ролики бренда\nКонтент-видео (промо, reels)\nИнтервью и репортажи\nСоциальные ролики\nДокументальные фильмы\nСценарии"),
  svc("AI yordamida kontent", "AI content creation", "AI yordamida vizual tasvirlar\nAI yordamida animatsion videolar", "AI-generated visuals\nAI-generated animated videos", "Контент с помощью AI", "Визуалы с помощью AI\nАнимационные видео с помощью AI"),
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
    { uz: 'Event visual', ru: 'Event visual', en: 'Event visual' },
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
  // the layout's first page is a separate image, <id>-p1.webp, so "About the project" can sit after it
  p1?: boolean
  // the first page is animated: public/video/<id>-p1.mp4 (first frame: <id>-p1.jpg); plays once and stops on the finished page
  p1v?: boolean
}

// Order = order on the site. Images: public/img/<id>.webp (cover), <id>-s.webp (640px, phones) and <id>-full.webp (full layout).
export const projects: Project[] = [
  { id: 'pepsi', client: 'Pepsi', title: { uz: 'Pepsi Lazzatli Fest', ru: "Pepsi Lazzatli Fest", en: 'Pepsi Lazzatli Fest' }, tags: { uz: 'Key visual · Festival', ru: "Key visual · Фестиваль", en: 'Key visual · Festival' }, videos: ['pepsi-video'] },
  { id: 'chempion', client: 'Mirshakar Fayzullayev', title: { uz: 'CHEMPION stand up', ru: 'CHEMPION stand up', en: 'CHEMPION stand up' }, tags: { uz: 'Key visual · Konsert', ru: "Key visual · Концерт", en: 'Key visual · Concert' }, embed: 'chempion/index.html', full: false },
  { id: 'agrobank', client: 'Agrobank', title: { uz: 'Ipoteka kampaniyasi', ru: "Ипотечная кампания", en: 'Mortgage campaign' }, tags: { uz: '3D · Reklama', ru: "3D · Реклама", en: '3D · Advertising' }, videos: ['agrobank-video'] },
  { id: 'fide', client: 'FIDE', title: { uz: 'Rapid va blits bōyiça jahon çempionati', ru: "Чемпионат мира по рапиду и блицу", en: 'World Rapid & Blitz Championships' }, tags: { uz: 'Event · Key visual', ru: "Ивент · Key visual", en: 'Event · Key visual' }, year: '2023', videos: ['fide-video'] },
  { id: 'istedodlar-zamini', client: 'Yoshlar harakati', title: { uz: "Ōzbekiston — Isteʼdodlar zamini", ru: "Узбекистан — земля талантов", en: "Uzbekistan — Land of Talents" }, tags: { uz: 'Sahna dizayni', ru: "Сценография", en: 'Stage design' }, year: '2025' , embed: 'ucfutbol/index.html', full: false },
  { id: 'superleague', client: 'UZSL', title: { uz: "Ōzbekiston Superligasi", ru: "Суперлига Узбекистана", en: 'Uzbekistan Superleague' }, tags: { uz: 'Brending · Sport', ru: "Брендинг · Спорт", en: 'Branding · Sports' }, videos: ['superleague-video'] },
  { id: 'chiroqchi', p1: true, p1v: true, client: 'Chiroqchi', title: { uz: 'Çiroqçi tumani brendi', ru: "Бренд Чиракчинского района", en: 'Chiroqchi district identity' }, tags: { uz: 'Brending · Şahar', ru: "Брендинг · Территория", en: 'Branding · Place' } },
  { id: 'amir-temur', client: "O'zbekistondagi Islom sivilizatsiyasi markazi", title: { uz: 'Immersiv şou', ru: 'Иммерсивное шоу', en: 'Immersive show' }, tags: { uz: 'Vizual · Kōrgazma', ru: "Визуалы · Выставка", en: 'Visuals · Exhibition' }, videos: ['immersive-video'] },
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
    p1: true,
    client: 'Qahramonlar davri',
    title: { uz: 'Bolalar bayrami makoni, 3D vizualizatsiya', ru: 'Праздничное пространство для детей, 3D-визуализация', en: "Kids' holiday venue, 3D visualization" },
    tags: { uz: '3D · Event dizayn', ru: '3D · Ивент-дизайн', en: '3D · Event design' },
    parts: 2,
  },
  { id: 'yonda-awards', p1: true, p1v: true, client: 'Yonda Awards', title: { uz: 'Yonda Awards 2025', ru: 'Yonda Awards 2025', en: 'Yonda Awards 2025' }, tags: { uz: 'Key visual · 3D · Mukofot', ru: 'Key visual · 3D · Премия', en: 'Key visual · 3D · Awards' }, year: '2025' },
  { id: 'logipro', p1: true, p1v: true, client: 'Logi Pro', title: { uz: 'Logi Pro logistika akademiyasi', ru: 'Логистическая академия Logi Pro', en: 'Logi Pro logistics academy' }, tags: { uz: 'Brending · Taʼlim', ru: 'Брендинг · Образование', en: 'Branding · Education' } },
  { id: 'khiva-ethnosport', client: 'Ethnosport Khiva', title: { uz: 'Ethnosport Khiva 2023', ru: 'Ethnosport Khiva 2023', en: 'Ethnosport Khiva 2023' }, tags: { uz: 'Festival identifikatsiyasi · Key visual · Motion', ru: 'Айдентика фестиваля · Key visual · Моушн', en: 'Festival identity · Key visual · Motion' }, year: '2023', embed: 'khiva/index.html', full: false },
  { id: 'salomtv', client: 'Salom TV', title: { uz: 'Salom TV brendingi', ru: 'Брендинг Salom TV', en: 'Salom TV branding' }, tags: { uz: 'Brending · Onlayn kinoteatr · Motion', ru: 'Брендинг · Онлайн-кинотеатр · Моушн', en: 'Branding · Online cinema · Motion' }, year: '2026', embed: 'salomtv/index.html', full: false },
  { id: 'arch-design', p1: true, p1v: true, client: 'Arch Design', title: { uz: 'Arch Design arxitektura studiyasi brendbuki', ru: 'Брендбук архитектурной студии Arch Design', en: 'Arch Design architecture studio brandbook' }, tags: { uz: 'Brending · Brendbuk · Arxitektura', ru: 'Брендинг · Брендбук · Архитектура', en: 'Branding · Brandbook · Architecture' }, year: '2024', parts: 2 },
  { id: 'chust', p1: true, p1v: true, client: 'Chust', title: { uz: 'Çust şahar brendi', ru: "Бренд города Чуст", en: 'Chust city branding' }, tags: { uz: 'Brending · Şahar', ru: "Брендинг · Город", en: 'Branding · City' } },
  { id: 'samad', client: 'Samad', title: { uz: 'Samad qadoq dizayni', ru: 'Дизайн упаковки Samad', en: 'Samad packaging design' }, tags: { uz: 'Qadoq · Plombir, sorbet, çuçvara', ru: 'Упаковка · Пломбир, сорбет, пельмени', en: 'Packaging · Ice cream, sorbet, dumplings' }, embed: 'samad/index.html', full: false },
  { id: 'talaba-fest', client: 'Talaba Fest', title: { uz: 'Talaba Fest festivali', ru: 'Фестиваль Talaba Fest', en: 'Talaba Fest festival' }, tags: { uz: 'Identifikatsiya · 3D hudud dizayni', ru: 'Айдентика · 3D-дизайн территории', en: 'Identity · 3D venue design' }, embed: 'talabafest/index.html', full: false },
  { id: 'yoshlar-kuni', client: 'Yoshlar ishlari agentligi', title: { uz: '30-iyun · Yoshlar kuni', ru: '30 июня · День молодёжи', en: 'June 30 · Youth Day' }, tags: { uz: 'Identifikatsiya · Animatsiya · Key visual', ru: 'Айдентика · Анимация · Key visual', en: 'Identity · Animation · Key visual' }, embed: 'yoshlar/index.html', full: false },
]

// "About the project" block at the top of every project view.
// title + text: what the project is. work: what was made (default: the project tags).
// role: Doston's role on the project (the row is hidden when it is empty).
// studio: where it was made (default Tasnif Group; write null to hide the line).
export type About = { title: T; text: T; work?: T; role?: T; studio?: string | null }
const designer: T = { uz: 'Dizayner', ru: 'Дизайнер', en: 'Designer' }
const designerAd: T = { uz: 'Dizayner va art direktor', ru: 'Дизайнер и арт-директор', en: 'Designer & art director' }
export const projectAbout: Record<string, About> = {
  pepsi: {
    role: designer,
    title: { uz: 'Pepsi festivali uçun key visual', ru: 'Key visual для фестиваля Pepsi', en: 'Key visual for a Pepsi festival' },
    text: { uz: 'Pepsi Lazzatli Fest festivali uçun asosiy vizual va undan kelib çiqqan reklama materiallari.', ru: 'Ключевой визуал фестиваля Pepsi Lazzatli Fest и рекламные материалы на его основе.', en: 'The key visual for the Pepsi Lazzatli Fest festival and the ad materials built on it.' },
  },
  chempion: {
    role: designer,
    title: { uz: 'Mirshakar Fayzullayevning «Chempion» konserti', ru: 'Концерт Миршакара Файзуллаева «Chempion»', en: 'Mirshakar Fayzullayev’s “Chempion” show' },
    text: { uz: 'Humo Arenaʼdagi stand-up konsert uçun vizual uslub: qōpol plakat şrifti va artistning qōlyozma imzosi bir-birining ustiga tuşadi. Qizil fon va sahna nuri barça taşuvçilarda bir xil his beradi.', ru: 'Визуальный стиль стендап-концерта в Humo Arena: грубый плакатный шрифт и рукописная подпись артиста наложены друг на друга. Красный фон и луч сцены дают одно настроение на всех носителях.', en: 'The visual style for a stand-up show at Humo Arena: a heavy poster typeface overlaid with the artist’s handwritten signature. A red background and a stage light keep every format in the same mood.' },
    work: { uz: 'Konsert identifikatsiyasi: afişa, ekranlar, bilet, bedjik, story', ru: 'Айдентика концерта: афиша, экраны, билет, бейджи, сторис', en: 'Show identity: poster, screens, ticket, badges, stories' },
  },
  agrobank: {
    role: designerAd,
    title: { uz: 'Ipoteka uçun 3D reklama', ru: '3D-реклама ипотеки', en: '3D ads for a mortgage offer' },
    text: { uz: 'Agrobank ipoteka kampaniyasi uçun 3D reklama vizuallari va video.', ru: '3D-визуалы и видео для ипотечной кампании Agrobank.', en: '3D visuals and a video for Agrobank’s mortgage campaign.' },
  },
  fide: {
    role: designer,
    title: { uz: 'Samarqanddagi şaxmat jahon çempionati', ru: 'Чемпионат мира по шахматам в Самарканде', en: 'The world chess championships in Samarkand' },
    text: { uz: 'Samarqandda ōtgan 2023-yilgi rapid va blits bōyiça jahon çempionati uçun key visual va tadbir vizuallari.', ru: 'Key visual и визуалы мероприятия для чемпионата мира по рапиду и блицу 2023 года в Самарканде.', en: 'The key visual and event visuals for the 2023 World Rapid & Blitz Championships in Samarkand.' },
  },
  'istedodlar-zamini': {
    role: designer,
    title: { uz: 'Futbol keçasi uçun sahna ekranlari', ru: 'Сценические экраны для футбольного вечера', en: 'Stage screens for a football night' },
    text: { uz: 'Uzbekistans.club tadbiri uçun keng formatli LED ekranlar dizayni: asosiy fon, nomlaniş va konsert ekranlari. Rangli geometrik şakllar futbol bayrami kayfiyatini beradi.', ru: 'Дизайн широкоформатных LED-экранов для мероприятия Uzbekistans.club: основной фон, заставки и концертные экраны. Цветные геометрические формы передают настроение футбольного праздника.', en: 'Wide LED screens for an Uzbekistans.club event: the main backdrop, title screens and concert screens. Bright geometric shapes carry the mood of a football celebration.' },
    work: { uz: 'LED ekranlar, 7424×2688 px', ru: 'LED-экраны, 7424×2688 px', en: 'LED screens, 7424×2688 px' },
  },
  superleague: {
    role: designerAd,
    title: { uz: 'Ōzbekiston Superligasi brendi', ru: 'Бренд Суперлиги Узбекистана', en: 'Uzbekistan Superleague identity' },
    text: { uz: 'Ōzbekiston futbol Superligasi uçun brending: vizual uslub hamda mukofot marosimi materiallari.', ru: 'Брендинг футбольной Суперлиги Узбекистана: визуальный стиль и материалы церемонии награждения.', en: 'Branding for Uzbekistan’s football Superleague: the visual style and the awards ceremony materials.' },
  },
  chiroqchi: {
    role: designer,
    title: { uz: 'Çiroqçi tumani uçun hudud brendi', ru: 'Бренд Чиракчинского района', en: 'An identity for Chiroqchi district' },
    text: { uz: 'Qaşqadaryo viloyatidagi Çiroqçi tumani uçun logotip va vizual identifikatsiya.', ru: 'Логотип и визуальная айдентика Чиракчинского района Кашкадарьинской области.', en: 'A logo and visual identity for Chiroqchi district in the Kashkadarya region.' },
  },
  'amir-temur': {
    role: designerAd,
    title: { uz: 'Immersiv şou', ru: 'Иммерсивное шоу', en: 'Immersive show' },
    text: { uz: 'Ōzbekistondagi Islom sivilizatsiyasi markazi uçun Amir Temurga bağişlangan vizuallar va immersiv video.', ru: 'Визуалы и иммерсивное видео об Амире Темуре для Центра исламской цивилизации в Узбекистане.', en: 'Visuals and an immersive video about Amir Temur for the Center of Islamic Civilization in Uzbekistan.' },
  },
  violence: {
    role: designer,
    title: { uz: 'Devorlar gapiradigan zal', ru: 'Зал, где говорят стены', en: 'A room where the walls speak' },
    text: { uz: 'Gender zōravonligi va tengsizlik mavzusidagi kōrgazma uçun immersiv zal loyihalandi. Devorlarga proyeksiya qilinadigan fonlar, yuz portretlari va illyustratsiyalar tomoşabinni mavzu içiga olib kiradi.', ru: 'Иммерсивный зал для выставки о гендерном насилии и неравенстве. Проекции на стенах, портреты и иллюстрации погружают зрителя в тему.', en: 'An immersive room for an exhibition on gender violence and inequality. Wall projections, portraits and illustrations draw the visitor into the subject.' },
    work: { uz: 'Zal dizayni, video-mapping kompozitsiyasi', ru: 'Дизайн зала, композиция видеомэппинга', en: 'Room design, video mapping composition' },
  },
  'oltin-chinor': {
    role: designer,
    title: { uz: 'Oltin çinor: ildiz va ōsiş ramzi', ru: 'Золотая чинара: символ корней и роста', en: 'The golden plane tree: roots and growth' },
    text: { uz: 'Uzbekistans.club Toşkent forumi doirasidagi «Oltin Çinor» milliy mukofoti uçun logotip, sahna ekranlari va nominatsiya titrlari. Qora fon va oltin çiziqlar tantanali, premium ohang beradi.', ru: 'Логотип, сценические экраны и титры номинаций для национальной премии «Олтин Чинор» на Ташкентском форуме Uzbekistans.club. Чёрный фон и золотые линии задают торжественный тон.', en: 'A logo, stage screens and nomination titles for the Oltin Chinor national award at the Uzbekistans.club Tashkent forum. Black and gold lines set a formal, premium tone.' },
    work: { uz: 'Logotip, sahna ekranlari, 3D fon animatsiyasi', ru: 'Логотип, экраны сцены, 3D-фоновая анимация', en: 'Logo, stage screens, 3D background animation' },
  },
  mkbank: {
    role: designerAd,
    title: { uz: 'Omonatlar uçun 3D reklama', ru: '3D-реклама вкладов', en: '3D ads for deposits' },
    text: { uz: 'MKBANK omonat kampaniyasi uçun 3D reklama vizuallari va video.', ru: '3D-визуалы и видео для кампании по вкладам MKBANK.', en: '3D visuals and a video for MKBANK’s deposit campaign.' },
  },
  bliss: {
    role: designer,
    title: { uz: 'BAAga sayohat aksiyasi', ru: 'Акция «Поездка в ОАЭ»', en: 'A trip-to-the-UAE promo' },
    text: { uz: 'Bliss şarbatlarining BAAga sayohat yutib oliş aksiyasi uçun key visual va reklama materiallari.', ru: 'Key visual и рекламные материалы для акции соков Bliss с розыгрышем поездки в ОАЭ.', en: 'The key visual and ad materials for a Bliss juice promo with a trip to the UAE as the prize.' },
  },
  'peace-intro': {
    role: designerAd,
    title: { uz: 'Let peace be our guide', ru: 'Let peace be our guide', en: 'Let peace be our guide' },
    text: { uz: 'Jamoa bilan birga yaratilgan AI film: vizual uslub, kadrlar va montaj bitta art direction ostida.', ru: 'AI-фильм, сделанный вместе с командой: визуальный стиль, кадры и монтаж под одним арт-дирекшном.', en: 'An AI film made with a team: the visual style, shots and edit under one art direction.' },
  },
  qahramonlar: {
    role: designerAd,
    studio: null,
    title: { uz: 'Bolalar bayrami uçun makon', ru: 'Пространство детского праздника', en: 'A venue for a kids’ celebration' },
    text: { uz: '«Qahramonlar davri» bolalar bayrami ōtadigan makonning 3D vizualizatsiyasi.', ru: '3D-визуализация пространства детского праздника «Qahramonlar davri».', en: 'A 3D visualization of the venue for the “Qahramonlar davri” kids’ celebration.' },
  },
  'yonda-awards': {
    role: designer,
    title: { uz: 'Yonda Awards 2025', ru: 'Yonda Awards 2025', en: 'Yonda Awards 2025' },
    text: { uz: 'Yonda Awards 2025 mukofoti uçun key visual va 3D vizuallar.', ru: 'Key visual и 3D-визуалы для премии Yonda Awards 2025.', en: 'The key visual and 3D visuals for the Yonda Awards 2025.' },
  },
  logipro: {
    role: designerAd,
    studio: null,
    title: { uz: 'Logistika akademiyasi brendi', ru: 'Бренд логистической академии', en: 'A logistics academy identity' },
    text: { uz: 'Logi Pro logistika akademiyasi uçun logotip va vizual identifikatsiya.', ru: 'Логотип и визуальная айдентика логистической академии Logi Pro.', en: 'A logo and visual identity for the Logi Pro logistics academy.' },
  },
  'khiva-ethnosport': {
    role: designer,
    title: { uz: 'Milliy sport turlari festivali uçun vizual tizim', ru: 'Визуальная система фестиваля национальных видов спорта', en: 'A visual system for a national sports festival' },
    text: { uz: 'Xalqaro Ethnosport festivali Xivada ōtdi. Vazifa tarixiy şahar ruhini zamonaviy sport festivali tiliga kōçiriş edi: logotip, rang va naqşdan tortib billbord, sahna, bayroq va bedjiklargaça.', ru: 'Международный фестиваль Ethnosport прошёл в Хиве. Задача была перевести дух исторического города на язык современного спортивного фестиваля: от логотипа, цвета и орнамента до билбордов, сцены, флагов и бейджей.', en: 'The international Ethnosport festival took place in Khiva. The task was to carry the spirit of the old city into the language of a modern sports festival: from the logo, colour and pattern to billboards, the stage, flags and badges.' },
    work: { uz: 'Identifikatsiya, taşqi dizayn', ru: 'Айдентика, наружное оформление', en: 'Identity, outdoor design' },
  },
  salomtv: {
    role: designerAd,
    studio: null,
    title: { uz: 'Ōzbekistonning onlayn kinoteatri', ru: 'Онлайн-кинотеатр Узбекистана', en: 'Uzbekistan’s online cinema' },
    text: { uz: 'Jahon filmlari, seriallar, jonli TV kanallar va ōzbek tilidagi «Originals» kontenti. Vazifa: bitta tuşunarli belgi yaratiş va uni Smart TV ekranidan tortib kōça posterigaça bir xil ovozda işlatadigan tizim quriş.', ru: 'Мировое кино, сериалы, live-каналы и узбекский контент «Originals». Задача: создать один понятный знак и систему, которая звучит одинаково от экрана Smart TV до уличного постера.', en: 'World films, series, live TV channels and Uzbek-language “Originals”. The task was one clear mark and a system that speaks with the same voice from a Smart TV screen to a street poster.' },
    work: { uz: 'Logotip, brend tizimi, motion', ru: 'Логотип, бренд-система, моушн', en: 'Logo, brand system, motion' },
  },
  'arch-design': {
    role: designerAd,
    studio: null,
    title: { uz: 'Arxitektura studiyasi brendbuki', ru: 'Брендбук архитектурной студии', en: 'An architecture studio brandbook' },
    text: { uz: 'Arch Design arxitektura studiyasi uçun brendbuk: logotip va uni işlatiş qoidalari.', ru: 'Брендбук архитектурной студии Arch Design: логотип и правила его использования.', en: 'A brandbook for the Arch Design architecture studio: the logo and the rules for using it.' },
  },
  chust: {
    role: designer,
    title: { uz: 'Çust şahri brendi', ru: 'Бренд города Чуст', en: 'An identity for the city of Chust' },
    text: { uz: 'Namangan viloyatidagi Çust şahri uçun logotip va vizual identifikatsiya.', ru: 'Логотип и визуальная айдентика города Чуст в Наманганской области.', en: 'A logo and visual identity for the city of Chust in the Namangan region.' },
  },
  samad: {
    role: designer,
    title: { uz: 'Bir brend, uç xil mahsulot qatori', ru: 'Один бренд, три продуктовые линейки', en: 'One brand, three product lines' },
    text: { uz: 'Samad uçun plombir va sorbet idişlari hamda çuçvara qadoqlari işlab çiqildi. Har qator ōz rangiga ega, lekin logotip, tōlqinli şakl va yorqin taʼm ranglari ularni bitta oilaga boğlaydi.', ru: 'Упаковка для пломбира, сорбета и пельменей Samad. У каждой линейки свой цвет, но логотип, волна и яркие вкусовые цвета собирают их в одно семейство.', en: 'Tubs for Samad ice cream and sorbet, and packs for their dumplings. Each line has its own colour, while the logo, the wave and bright flavour colours tie them into one family.' },
    work: { uz: 'Qadoq dizayni, maketlar', ru: 'Дизайн упаковки, макеты', en: 'Packaging design, mockups' },
  },
  'talaba-fest': {
    role: designerAd,
    title: { uz: 'Talabalar uçun imkoniyatlar festivali', ru: 'Фестиваль возможностей для студентов', en: 'A festival of opportunities for students' },
    text: { uz: 'Festival uçun logotip, illyustratsiyali vizual uslub va butun hudud dizayni yaratildi. Kiriş arkasidan tortib sahna, fotozonalar va yōlaklargaça hammasi 3Dʼda oldindan kōrsatildi.', ru: 'Логотип, иллюстративный стиль и дизайн всей территории фестиваля. От входной арки до сцены, фотозон и аллей всё было заранее показано в 3D.', en: 'A logo, an illustrated visual style and the design of the whole festival grounds. From the entrance arch to the stage, photo zones and walkways, everything was shown in 3D first.' },
    work: { uz: 'Identifikatsiya, 3D hudud dizayni', ru: 'Айдентика, 3D-дизайн территории', en: 'Identity, 3D venue design' },
  },
  'yoshlar-kuni': {
    role: designer,
    title: { uz: 'Bir oy davom etgan yoşlar bayrami', ru: 'Молодёжный праздник длиной в месяц', en: 'A youth celebration that lasted a month' },
    text: { uz: '30-iyun, Yoşlar kuni uçun logotip, şior va butun bayram oyligining vizual tizimi yaratildi. Tez cōtka zarbalari va milliy bayroq ranglari harakat va yoşlik energiyasini beradi.', ru: 'Логотип, слоган и визуальная система всего праздничного месяца ко Дню молодёжи 30 июня. Быстрые мазки кисти и цвета национального флага передают движение и энергию молодости.', en: 'A logo, slogan and visual system for the whole month around Youth Day on June 30. Quick brush strokes and the colours of the national flag carry movement and youthful energy.' },
    work: { uz: 'Logotip, animatsiya, banner, press-devor, ekranlar', ru: 'Логотип, анимация, баннеры, пресс-волл, экраны', en: 'Logo, animation, banners, press wall, screens' },
  },
}

// Work directions shown as big cards in the Projects section.
// Clicking a card opens that direction's page with all its projects.
// To move a project, put its id in another list.
// covers: optional image names for the 3 pictures on the big card (default: first projects)
// short: the label on the filter tabs of the "All works" page
export type Category = { id: string; title: T; text: T; projects: string[]; covers?: string[]; short?: T }
export const categories: Category[] = [
  {
    id: 'key-visual',
    short: { uz: 'Key visual', ru: 'Key visual', en: 'Key visual' },
    title: { uz: 'Key visual va kampaniyalar', ru: "Key visual и кампании", en: 'Key visuals & campaigns' },
    text: { uz: 'Festival, konsert va aksiyalar uçun asosiy vizuallar', ru: "Ключевые визуалы для фестивалей, концертов и промоакций", en: 'Key visuals for festivals, shows and promos' },
    projects: ['pepsi', 'chempion', 'bliss', 'yonda-awards', 'yoshlar-kuni', 'khiva-ethnosport'],
  },
  {
    id: '3d',
    short: { uz: '3D va reklama', ru: '3D и реклама', en: '3D & ads' },
    title: { uz: '3D va reklama', ru: "3D и реклама", en: '3D & advertising' },
    text: { uz: 'Banklar va brendlar uçun 3D reklama hamda immersiv kontent', ru: "3D-реклама и иммерсивный контент для банков и брендов", en: '3D ads and immersive content for banks and brands' },
    projects: ['violence', 'agrobank', 'mkbank'],
  },
  {
    id: 'event',
    short: { uz: 'Event visual', ru: 'Event visual', en: 'Event visual' },
    title: { uz: 'Event visual', ru: 'Event visual', en: 'Event visual' },
    text: { uz: 'Katta tadbirlar uçun sahna, ekran va kōrgazma vizuallari', ru: 'Визуалы для сцены, экранов и выставок крупных мероприятий', en: 'Visuals for stages, screens and exhibitions at large events' },
    projects: ['fide', 'talaba-fest', 'istedodlar-zamini', 'oltin-chinor', 'qahramonlar'],
  },
  {
    id: 'branding',
    short: { uz: 'Brending', ru: 'Брендинг', en: 'Branding' },
    title: { uz: 'Brending', ru: 'Брендинг', en: 'Branding' },
    text: { uz: 'Klublar, ligalar va hududlar uçun vizual identifikatsiya', ru: "Айдентика для клубов, лиг и территорий", en: 'Visual identity for clubs, leagues and places' },
    projects: ['superleague', 'salomtv', 'arch-design', 'samad', 'chust', 'logipro', 'chiroqchi'],
  },
  {
    id: 'ai',
    short: { uz: 'AI', ru: 'AI', en: 'AI' },
    title: { uz: 'AI va art direction', ru: 'AI и арт-дирекшн', en: 'AI & art direction' },
    text: { uz: "Jamoa bilan qilingan AI filmlar va vizual hikoyalar", ru: 'AI-фильмы и визуальные истории, сделанные с командой', en: 'AI films and visual stories made with a team' },
    projects: ['peace-intro', 'amir-temur'],
    covers: ['peace-intro', 'amir-temur-b', 'amir-temur-c'],
  },
]

// Client marquee. To show a logo instead of the name, put the file in public/img/logos/
// and write its file name in logo (any colors: the site turns it white).
// White one-colour logos made from the project layouts; ratio = width / height
export const clients: { name: string; logo?: string; ratio?: number }[] = [
  { name: 'Pepsi', logo: 'pepsi.webp', ratio: 1 },
  { name: 'Agrobank', logo: 'agrobank.webp', ratio: 4.979 },
  { name: 'MKBANK', logo: 'mkbank.webp', ratio: 4.555 },
  { name: 'FIDE', logo: 'fide.webp', ratio: 1.169 },
  { name: 'Uzbekistan Superleague', logo: 'uzsl.webp', ratio: 3.663 },
  { name: 'Bliss', logo: 'bliss.webp', ratio: 1.057 },
  { name: 'Tasnif Group', logo: 'tasnif-group.webp', ratio: 3.58 },
  { name: 'Oltin Chinor', logo: 'oltin-chinor.webp', ratio: 2.045 },
  { name: 'Yoshlar ishlari agentligi', logo: 'yoshlar-ishlari.webp', ratio: 5.121 },
  { name: 'InnoWeek 2024', logo: 'innoweek.webp', ratio: 3.189 },
  { name: 'Salom TV', logo: 'salomtv.svg', ratio: 3.321 },
  { name: 'CCI Uzbekistan · Next Talent', logo: 'cci-next-talent.webp', ratio: 3.648 },
  { name: 'Tashkent Events', logo: 'tashkent-events.webp', ratio: 4.692 },
]

// "All works" page: every project from every direction, in the same order as the directions
export const allWorks: Category = {
  id: 'all',
  title: { uz: 'Barça işlar', ru: 'Все работы', en: 'All works' },
  text: { uz: 'Hamma yōnalişlardagi loyihalar', ru: 'Проекты всех направлений', en: 'Projects from every direction' },
  projects: [...new Set(categories.flatMap((c) => c.projects))],
}
