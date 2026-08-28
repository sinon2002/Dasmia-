export type Language = "ru" | "ky" | "en";

export const SUPPORTED_LANGUAGES: Language[] = ["ru", "ky", "en"];

export const LANGUAGE_LABELS: Record<Language, string> = {
  ru: "RU",
  ky: "KY",
  en: "EN",
};

export const DEFAULT_LANGUAGE: Language = "ru";

export const LANGUAGE_STORAGE_KEY = "dasmia_lang";

export function getStoredLanguage(): Language {
  if (typeof window === "undefined") return DEFAULT_LANGUAGE;
  const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
  if (stored && SUPPORTED_LANGUAGES.includes(stored as Language)) {
    return stored as Language;
  }
  return DEFAULT_LANGUAGE;
}

export function setStoredLanguage(lang: Language): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
}

const translations: Record<Language, Record<string, string>> = {
  ru: {
    // Navigation & Header
    "nav.about": "О КОМПЛЕКСЕ",
    "nav.directions": "НАПРАВЛЕНИЯ",
    "nav.corporate": "КОРПОРАТИВНЫМ",
    "nav.history": "ИСТОРИЯ",
    "nav.contact": "КОНТАКТЫ",
    "nav.cta": "ОСТАВИТЬ ЗАЯВКУ",
    "nav.menu.open": "Открыть меню",
    "nav.menu.close": "Закрыть меню",
    "nav.theme.light": "Переключить на светлую тему",
    "nav.theme.dark": "Переключить на тёмную тему",

    // Hero Section
    "hero.eyebrow": "ОсОО «ФИРМА «ДАСМИЯ»",
    "hero.title": "DASMIA",
    "hero.subtitle": "Один комплекс. Множество возможностей.",
    "hero.description":
      "Восемь направлений премиального отдыха, гастрономии, wellness и культуры — под одной крышей в сердце Бишкека.",
    "hero.cta.primary": "ОСТАВИТЬ ЗАЯВКУ",
    "hero.cta.secondary": "ИССЛЕДОВАТЬ КОМПЛЕКС",
    "hero.badge": "BISHKEK / KYRGYZSTAN",
    "hero.directions": "8 НАПРАВЛЕНИЙ",
    "hero.directions.cta": "СМОТРЕТЬ ВСЕ",
    "hero.address": "ул. АНКАРА 2Б",

    // Intro Section
    "intro.label": "О КОМПЛЕКСЕ",
    "intro.title": "Больше, чем",
    "intro.title.em": "просто место.",
    "intro.p1":
      "DASMIA — это пространство, где каждое посещение становится событием. Здесь объединились традиции кыргызского гостеприимства и стандарты мирового уровня сервиса.",
    "intro.p2":
      "Восемь направлений — банкеты, гастрономия, wellness, культура, спорт — созданы для того, чтобы каждый гость нашёл своё пространство.",
    "intro.quote": "«Пространство, достойное ваших самых важных моментов.»",
    "intro.cta": "ИССЛЕДОВАТЬ НАПРАВЛЕНИЯ",

    // Metrics Section
    "metrics.years.label": "ЛЕТ ИСТОРИИ",
    "metrics.years.sublabel": "Традиции гостеприимства",
    "metrics.halls.label": "БАНКЕТНЫХ ЗАЛА",
    "metrics.halls.sublabel": "Для любого формата",
    "metrics.guests.label": "ГОСТЕЙ",
    "metrics.guests.sublabel": "Ежегодно доверяют нам",
    "metrics.directions.label": "НАПРАВЛЕНИЙ",
    "metrics.directions.sublabel": "Под одной крышей",

    // Directions Section
    "directions.label": "8 НАПРАВЛЕНИЙ",
    "directions.title": "Один комплекс —",
    "directions.title.em": "бесконечные возможности",
    "directions.desc":
      "Каждое направление — отдельный мир с собственным характером, командой и стандартами качества.",
    "directions.more": "ПОДРОБНЕЕ",
    "directions.cat.celebration": "ТОРЖЕСТВА",
    "directions.cat.gastronomy": "ГАСТРОНОМИЯ",
    "directions.cat.culture": "КУЛЬТУРА",
    "directions.cat.sport": "СПОРТ",
    "directions.cat.wellness": "WELLNESS",
    "directions.cat.heritage": "КУЛЬТУРНОЕ НАСЛЕДИЕ",
    "directions.cat.business": "БИЗНЕС",
    "directions.banquet.title": "Банкетные залы",
    "directions.banquet.desc":
      "Залы для свадеб, юбилеев и корпоративных мероприятий любого масштаба.",
    "directions.restaurant.title": "Ресторан",
    "directions.restaurant.desc":
      "Авторская кухня с лучшими традициями кыргызской и европейской гастрономии.",
    "directions.chaikhana.title": "Чайхана",
    "directions.chaikhana.desc":
      "Аутентичная атмосфера традиционного чаепития в современном прочтении.",
    "directions.fitness.title": "Фитнес-клуб",
    "directions.fitness.desc":
      "Современное оборудование, персональные тренеры, групповые программы.",
    "directions.pools.title": "Бассейны",
    "directions.pools.desc":
      "Главный, детский и релаксационный бассейны с профессиональным обслуживанием.",
    "directions.spa.title": "SPA",
    "directions.spa.desc":
      "Полный спектр spa-процедур для восстановления и гармонии тела и духа.",
    "directions.ethno.title": "Этно-Село",
    "directions.ethno.desc":
      "Аутентичные юрты, кыргызские традиции и природные материалы в премиальном формате.",
    "directions.events.title": "Мероприятия",
    "directions.events.desc":
      "Конференции, форумы, тренинги и деловые встречи с полным техническим обеспечением.",

    // Featured Section
    "featured.b1.category": "ТОРЖЕСТВА",
    "featured.b1.title": "Банкетные залы",
    "featured.b1.subtitle": "Пространство для особых моментов",
    "featured.b1.description":
      "Три уникальных зала с различным характером и вместимостью. Каждый — с индивидуальным дизайном, профессиональным светом и звуком. Наша команда создаёт атмосферу, которую помнят годами.",
    "featured.b1.f1": "Вместимость до 1500 гостей",
    "featured.b1.f2": "Профессиональный свет и звук",
    "featured.b1.f3": "Полное декорирование",
    "featured.b1.f4": "Собственная кухня",
    "featured.b2.category": "WELLNESS & SPORT",
    "featured.b2.title": "Фитнес-клуб",
    "featured.b2.subtitle": "Тело и разум в гармонии",
    "featured.b2.description":
      "Современное оборудование ведущих мировых брендов, квалифицированные тренеры и атмосфера, которая мотивирует. Индивидуальные программы для любого уровня подготовки.",
    "featured.b2.f1": "Профессиональное оборудование",
    "featured.b2.f2": "Персональные тренеры",
    "featured.b2.f3": "Групповые классы",
    "featured.b2.f4": "Гибкие абонементы",
    "featured.b3.category": "БАССЕЙНЫ & SPA",
    "featured.b3.title": "Бассейны и SPA",
    "featured.b3.subtitle": "Пространство восстановления",
    "featured.b3.description":
      "Главный плавательный бассейн, детская зона и спа-комплекс с полным спектром процедур. Профессиональный персонал, чистота и уют — всё для вашего полного восстановления.",
    "featured.b3.f1": "Главный бассейн 25м",
    "featured.b3.f2": "Детский бассейн",
    "featured.b3.f3": "Хаммам и сауна",
    "featured.b3.f4": "Массажные кабинеты",
    "featured.cta": "УЗНАТЬ ПОДРОБНЕЕ",

    // History Section
    "history.label": "ИСТОРИЯ",
    "history.title": "История,",
    "history.title.em": "которая продолжается",
    "history.t1.title": "Основание",
    "history.t1.desc":
      "Первый шаг к созданию пространства, которое объединит традиции кыргызского гостеприимства с современным видением качественного отдыха.",
    "history.t2.title": "Первые направления",
    "history.t2.desc":
      "Открытие банкетных залов и ресторана. Первые торжества, первые гости, первые истории, которые стали частью нашей истории.",
    "history.t3.title": "Расширение комплекса",
    "history.t3.desc":
      "Открытие фитнес-клуба, бассейнов и SPA. DASMIA становится первым полноценным wellness-комплексом в регионе.",
    "history.t4.title": "Этно-Село и культура",
    "history.t4.desc":
      "Создание уникального этно-пространства с аутентичными юртами и кыргызскими традициями. Культурное измерение DASMIA обретает форму.",
    "history.t5.title": "DASMIA сегодня",
    "history.t5.desc":
      "Восемь направлений, тысячи гостей, сотни событий. Мы продолжаем создавать пространство, которое превосходит ожидания.",

    // Corporate Section
    "corporate.label": "КОРПОРАТИВНЫМ КЛИЕНТАМ",
    "corporate.title.p1": "Для бизнеса.",
    "corporate.title.em": "Для партнёрства.",
    "corporate.title.p2": "Для важных встреч.",
    "corporate.description":
      "DASMIA предоставляет полный спектр услуг для корпоративных клиентов. Конференц-залы, банкетные пространства, переговорные комнаты и VIP-обслуживание — всё под одной крышей.",
    "corporate.cta.quote": "ЗАПРОСИТЬ КП",
    "corporate.s1.label": "Конференции и форумы",
    "corporate.s1.desc": "До 500+ участников, полное техническое оснащение",
    "corporate.s2.label": "Корпоративные банкеты",
    "corporate.s2.desc": "Индивидуальное меню, декор, программа",
    "corporate.s3.label": "Деловые переговоры",
    "corporate.s3.desc": "Переговорные комнаты, кейтеринг, сервис",
    "corporate.s4.label": "Делегации и приёмы",
    "corporate.s4.desc": "VIP-сервис, протокольное обслуживание",
    "corporate.s5.label": "Тимбилдинг",
    "corporate.s5.desc": "Активности на базе комплекса, сценарии",
    "corporate.s6.label": "Гибридные мероприятия",
    "corporate.s6.desc": "Онлайн + офлайн формат, трансляции",

    // Event CTA Section
    "event_cta.label": "МЕРОПРИЯТИЯ",
    "event_cta.title": "Ваше событие.",
    "event_cta.title.em": "Наше пространство.",
    "event_cta.description":
      "Свадьбы, юбилеи, корпоративы, конференции — любое событие заслуживает идеального пространства и безупречного сервиса.",
    "event_cta.book": "ЗАБРОНИРОВАТЬ",
    "event_cta.organize": "ОРГАНИЗОВАТЬ МЕРОПРИЯТИЕ",

    // Contact Form & Section
    "contact.label": "КОНТАКТЫ",
    "contact.title": "Оставьте заявку",
    "contact.title.em": "мы свяжемся с вами",
    "contact.address.label": "АДРЕС",
    "contactmap.title.l1": "Свяжитесь",
    "contactmap.title.l2": "с нами",
    "contact.address.value": "Бишкек, ул. Анкара 2Б, Кыргызстан",
    "contact.phone.label": "ТЕЛЕФОН",
    "contact.email.label": "EMAIL",
    "contact.hours.label": "ЧАСЫ РАБОТЫ",
    "contact.hours.value": "Ежедневно 08:00 – 23:00",
    "contact.name": "ИМЯ",
    "contact.name.placeholder": "Ваше имя",
    "contact.phone": "ТЕЛЕФОН",
    "contact.phone.placeholder": "+996 XXX XXX XXX",
    "contact.direction": "НАПРАВЛЕНИЕ",
    "contact.direction.placeholder": "Выберите направление",
    "contact.message": "КОММЕНТАРИЙ",
    "contact.message.placeholder": "Расскажите о вашем запросе...",
    "contact.privacy": "Я согласен на обработку персональных данных",
    "contact.submit": "ОСТАВИТЬ ЗАЯВКУ",
    "contact.submitting": "ОТПРАВКА...",
    "contact.btn.success": "ЗАЯВКА ОТПРАВЛЕНА ✓",
    "contact.btn.failed": "ОШИБКА ОТПРАВКИ ✕",
    "contact.sent.label": "ОТПРАВЛЕНО",
    "contact.success": "Заявка принята.",
    "contact.success.em": "Мы свяжемся с вами.",
    "contact.success.desc":
      "Ваша заявка успешно отправлена. Наш менеджер свяжется с вами в ближайшее время по указанному номеру телефона.",
    "contact.send_another": "ОТПРАВИТЬ ЕЩЁ ОДНУ ЗАЯВКУ",
    "contact.error.name": "Пожалуйста, укажите ваше имя",
    "contact.error.phone": "Пожалуйста, укажите телефон",
    "contact.error.phone_invalid": "Введите корректный номер телефона",
    "contact.error.direction": "Выберите направление",
    "contact.error.privacy": "Необходимо согласие на обработку данных",
    "contact.error.general": "Произошла ошибка. Попробуйте ещё раз.",

    // Footer
    "footer.desc":
      "Премиальный многофункциональный комплекс в Бишкеке. Один адрес — множество возможностей.",
    "footer.directions": "НАПРАВЛЕНИЯ",
    "footer.nav": "НАВИГАЦИЯ",
    "footer.social": "СОЦИАЛЬНЫЕ СЕТИ",
    "footer.privacy": "Политика конфиденциальности",
    "footer.rights": "© 2025 ОсОО «Фирма «Дасмия». Все права защищены.",
    "footer.form.intro":
      "Оставьте заявку — мы свяжемся с вами и подберём идеальный формат для вашего события.",
    "footer.form.name": "Ваше имя",
    "footer.form.contactMethod": "Как с вами связаться?",
    "footer.form.submit": "Оставить заявку",
    "footer.form.sending": "Отправляем...",
    "footer.form.consent": "Нажимая на кнопку, я соглашаюсь с",
    "footer.form.success": "Заявка отправлена, мы скоро свяжемся с вами.",
    "footer.form.error": "Заполните все поля и подтвердите согласие.",
    "footer.location": "Бишкек, Кыргызстан",

    // Subpages Common
    "page.all_directions": "ВСЕ НАПРАВЛЕНИЯ",
    "page.book_now": "ОСТАВИТЬ ЗАЯВКУ",
    "page.call_us": "ИЛИ ПОЗВОНИТЕ НАМ",
    "page.gallery": "ГАЛЕРЕЯ",
    "page.about_direction": "О НАПРАВЛЕНИИ",
    "page.features": "ВОЗМОЖНОСТИ",

    // 404
    "404.title": "Страница не найдена",
    "404.desc": "Страница, которую вы ищете, не существует. Давайте вернемся назад!",
    "404.back": "Назад",
    "404.home": "На главную",
  },

  ky: {
    // Navigation & Header
    "nav.about": "КОМПЛЕКС ЖӨНҮНДӨ",
    "nav.directions": "БАГЫТТАР",
    "nav.corporate": "КОРПОРАТИВДИК",
    "nav.history": "ТАРЫХ",
    "nav.contact": "БАЙЛАНЫШ",
    "nav.cta": "АРЫЗ КАЛТЫРУУ",
    "nav.menu.open": "Менюну ачуу",
    "nav.menu.close": "Менюну жабуу",
    "nav.theme.light": "Жарык темага которуу",
    "nav.theme.dark": "Караңгы темага которуу",

    // Hero Section
    "hero.eyebrow": "«ДАСМИЯ» ФИРМАСЫ ЖЧК",
    "hero.title": "DASMIA",
    "hero.subtitle": "Бир комплекс. Көп мүмкүнчүлүктөр.",
    "hero.description":
      "Бишкектин жүрөгүндө бир чатыр астында сегиз багыт — премиум эс алуу, гастрономия, wellness жана маданият.",
    "hero.cta.primary": "АРЫЗ КАЛТЫРУУ",
    "hero.cta.secondary": "КОМПЛЕКСТИ ИЗИЛДӨӨ",
    "hero.badge": "BISHKEK / KYRGYZSTAN",
    "hero.directions": "8 БАГЫТ",
    "hero.directions.cta": "БААРЫН КӨРҮҮ",
    "hero.address": "АНКАРА КӨЧ. 2Б",

    // Intro Section
    "intro.label": "КОМПЛЕКС ЖӨНҮНДӨ",
    "intro.title": "Жөн гана жерден",
    "intro.title.em": "алда канча көп.",
    "intro.p1":
      "DASMIA — ар бир барган сайын окуяга айланган мейкиндик. Бул жерде кыргыз меймандостугунун салттары жана дүйнөлүк деңгээлдеги кызмат стандарттары бириктирилген.",
    "intro.p2":
      "Сегиз багыт — банкеттер, гастрономия, wellness, маданият, спорт — ар бир коноктун өз мейкиндигин табышы үчүн жаратылган.",
    "intro.quote": "«Эң маанилүү учурларыңызга татыктуу мейкиндик.»",
    "intro.cta": "БАГЫТТАРДЫ ИЗИЛДӨӨ",

    // Metrics Section
    "metrics.years.label": "ЖЫЛДЫК ТАРЫХ",
    "metrics.years.sublabel": "Меймандостук салттары",
    "metrics.halls.label": "БАНКЕТТИК ЗАЛ",
    "metrics.halls.sublabel": "Ар кандай формат үчүн",
    "metrics.guests.label": "КОНОК",
    "metrics.guests.sublabel": "Жыл сайын бизге ишенет",
    "metrics.directions.label": "БАГЫТ",
    "metrics.directions.sublabel": "Бир чатырдын астында",

    // Directions Section
    "directions.label": "8 БАГЫТ",
    "directions.title": "Бир комплекс —",
    "directions.title.em": "чексиз мүмкүнчүлүктөр",
    "directions.desc":
      "Ар бир багыт — өзүнүн мүнөзү, командасы жана сапат стандарттары бар өзүнчө дүйнө.",
    "directions.more": "КЕНЕНИРЭЭК",
    "directions.cat.celebration": "САЛТАНАТТАР",
    "directions.cat.gastronomy": "ГАСТРОНОМИЯ",
    "directions.cat.culture": "МАДАНИЯТ",
    "directions.cat.sport": "СПОРТ",
    "directions.cat.wellness": "WELLNESS",
    "directions.cat.heritage": "МАДАНИЙ МУРАС",
    "directions.cat.business": "БИЗНЕС",
    "directions.banquet.title": "Банкеттик залдар",
    "directions.banquet.desc":
      "Үйлөнүү тойлдор, мааракелер жана корпоративдик иш-чаралар үчүн залдар.",
    "directions.restaurant.title": "Ресторан",
    "directions.restaurant.desc":
      "Кыргыз жана европалык гастрономиянын мыкты салттары менен автордук ашкана.",
    "directions.chaikhana.title": "Чайкана",
    "directions.chaikhana.desc":
      "Заманбап чечмелөөдөгү салттуу чай ичүүнүн нукура атмосферасы.",
    "directions.fitness.title": "Фитнес-клуб",
    "directions.fitness.desc":
      "Заманбап жабдуулар, жеке машыктыруучулар, топтук программалар.",
    "directions.pools.title": "Бассейндер",
    "directions.pools.desc":
      "Негизги, балдар жана эс алуу бассейндери кесипкөй тейлөө менен.",
    "directions.spa.title": "SPA",
    "directions.spa.desc":
      "Дене менен жан дүйнөнүн калыбына келиши жана гармониясы үчүн spa-процедуралар.",
    "directions.ethno.title": "Этно-Айыл",
    "directions.ethno.desc":
      "Нукура боз үйлөр, кыргыз каада-салттары жана табигый материалдар премиум форматта.",
    "directions.events.title": "Иш-чаралар",
    "directions.events.desc":
      "Толук техникалык камсыздоо менен конференциялар, форумдар жана жолугушуулар.",

    // Featured Section
    "featured.b1.category": "САЛТАНАТТАР",
    "featured.b1.title": "Банкеттик залдар",
    "featured.b1.subtitle": "Өзгөчө учурлар үчүн мейкиндик",
    "featured.b1.description":
      "Ар кандай мүнөзгө жана сыйымдуулукка ээ үч уникалдуу зал. Ар бири — жекече дизайн, кесипкөй жарык жана үн менен камсыздалган. Биздин команда жылдар бою эсте кала турган атмосфераны жаратат.",
    "featured.b1.f1": "1500 конокко чейин сыйымдуулук",
    "featured.b1.f2": "Кесипкөй жарык жана үн",
    "featured.b1.f3": "Толук жасалгалоо",
    "featured.b1.f4": "Өздүк ашкана",
    "featured.b2.category": "WELLNESS & SPORT",
    "featured.b2.title": "Фитнес-клуб",
    "featured.b2.subtitle": "Дене менен акылдын гармониясы",
    "featured.b2.description":
      "Дүйнөлүк алдыңкы бренддердин заманбап жабдуулары, квалификациялуу машыктыруучулар жана шыктандыруучу чөйрө. Ар кандай деңгээлдеги даярдык үчүн жеке программалар.",
    "featured.b2.f1": "Кесипкөй жабдуулар",
    "featured.b2.f2": "Жеке машыктыруучулар",
    "featured.b2.f3": "Топтук класстар",
    "featured.b2.f4": "Ыңгайлуу абонементтер",
    "featured.b3.category": "БАССЕЙНДЕР & SPA",
    "featured.b3.title": "Бассейндер жана SPA",
    "featured.b3.subtitle": "Калыбына келүү мейкиндиги",
    "featured.b3.description":
      "Негизги сүзүү бассейни, балдар зонасы жана толук кызмат көрсөтүүлөрү бар спа-комплекс. Кесипкөй кызматкерлер, тазалык жана ыңгайлуулук — толук калыбына келүүңүз үчүн.",
    "featured.b3.f1": "Негизги бассейн 25м",
    "featured.b3.f2": "Балдар бассейни",
    "featured.b3.f3": "Хаммам жана сауна",
    "featured.b3.f4": "Массаж бөлмөлөрү",
    "featured.cta": "КЕНЕНИРЭЭК БИЛҮҮ",

    // History Section
    "history.label": "ТАРЫХ",
    "history.title": "Тарых,",
    "history.title.em": "уланууда",
    "history.t1.title": "Негизделиши",
    "history.t1.desc":
      "Кыргыз меймандостугунун салттарын сапаттуу эс алуунун заманбап көз карашы менен бириктирген мейкиндикти түзүүнүн алгачкы кадамы.",
    "history.t2.title": "Алгачкы багыттар",
    "history.t2.desc":
      "Банкеттик залдардын жана ресторандын ачылышы. Алгачкы салтанаттар, алгачкы коноктор, тарыхыбыздын бир бөлүгү болгон алгачкы окуялар.",
    "history.t3.title": "Комплекстин кеңейиши",
    "history.t3.desc":
      "Фитнес-клубдун, бассейндердин жана SPAнын ачылышы. DASMIA аймактагы биринчи толук кандуу wellness-комплексине айланат.",
    "history.t4.title": "Этно-Айыл жана маданият",
    "history.t4.desc":
      "Нукура боз үйлөр жана кыргыз каада-салттары менен уникалдуу этно-мейкиндиктин түзүлүшү. DASMIAнын маданий өлчөмү калыптанат.",
    "history.t5.title": "DASMIA бүгүн",
    "history.t5.desc":
      "Сегиз багыт, миңдеген коноктор, жүздөгөн иш-чаралар. Биз күтүүлөрдөн ашкан мейкиндикти түзүүнү улантабыз.",

    // Corporate Section
    "corporate.label": "КОРПОРАТИВДИК КАРДАРЛАРГА",
    "corporate.title.p1": "Бизнес үчүн.",
    "corporate.title.em": "Өнөктөштүк үчүн.",
    "corporate.title.p2": "Маанилүү жолугушуулар үчүн.",
    "corporate.description":
      "DASMIA корпоративдик кардарлар үчүн кызматтардын толук топтомун сунуштайт. Конференц-залдар, банкеттик мейкиндиктер, сүйлөшүү бөлмөлөрү жана VIP-тейлөө — баары бир чатырдын астында.",
    "corporate.cta.quote": "КП СУРОО",
    "corporate.s1.label": "Конференциялар жана форумдар",
    "corporate.s1.desc": "500+ катышуучуга чейин, толук техникалык жабдуу",
    "corporate.s2.label": "Корпоративдик банкеттер",
    "corporate.s2.desc": "Жеке меню, жасалгалоо, программа",
    "corporate.s3.label": "Бизнес сүйлөшүүлөр",
    "corporate.s3.desc": "Сүйлөшүү бөлмөлөрү, кейтеринг, сервис",
    "corporate.s4.label": "Делегациялар жана кабыл алуулар",
    "corporate.s4.desc": "VIP-сервис, протоколдук тейлөө",
    "corporate.s5.label": "Тимбилдинг",
    "corporate.s5.desc": "Комплекстин базасындагы иш-чаралар, сценарийлер",
    "corporate.s6.label": "Гибриддик иш-чаралар",
    "corporate.s6.desc": "Онлайн + офлайн формат, түз берүүлөр",

    // Event CTA Section
    "event_cta.label": "ИШ-ЧАРАЛАР",
    "event_cta.title": "Сиздин иш-чараңыз.",
    "event_cta.title.em": "Биздин мейкиндик.",
    "event_cta.description":
      "Үйлөнүү тойлдор, мааракелер, корпоративдер, конференциялар — ар кандай иш-чара идеалдуу мейкиндикке жана кемчиликсиз тейлөөгө татыктуу.",
    "event_cta.book": "ЭЭЛӨӨ",
    "event_cta.organize": "ИШ-ЧАРА УЮШТУРУУ",

    // Contact Form & Section
    "contact.label": "БАЙЛАНЫШ",
    "contact.title": "Арыз калтырыңыз",
    "contact.title.em": "биз сиз менен байланышабыз",
    "contact.address.label": "ДАРЕК",
    "contact.address.value": "Бишкек ш., Анкара көч. 2Б, Кыргызстан",
    "contact.phone.label": "ТЕЛЕФОН",
    "contact.email.label": "EMAIL",
    "contact.hours.label": "ИШ УБАКТЫСЫ",
    "contact.hours.value": "Күн сайын 08:00 – 23:00",
    "contact.name": "АТЫҢЫЗ",
    "contact.name.placeholder": "Атыңыз",
    "contact.phone": "ТЕЛЕФОН",
    "contact.phone.placeholder": "+996 XXX XXX XXX",
    "contact.direction": "БАГЫТ",
    "contact.direction.placeholder": "Багытты тандаңыз",
    "contact.message": "КАБАР",
    "contact.message.placeholder": "Сурамыңыз тууралуу айтып бериңиз...",
    "contact.privacy": "Жеке маалыматтарды иштетүүгө макулмун",
    "contact.submit": "АРЫЗ КАЛТЫРУУ",
    "contact.submitting": "ЖӨНӨТҮЛҮҮДӨ...",
    "contact.btn.success": "АРЫЗ ЖӨНӨТҮЛДҮ ✓",
    "contact.btn.failed": "Суроо талаптан ката чыкты ✕",
    "contact.sent.label": "ЖӨНӨТҮЛДҮ",
    "contact.success": "Арыз кабыл алынды.",
    "contact.success.em": "Биз сиз менен байланышабыз.",
    "contact.success.desc":
      "Сиздин арызыңыз ийгиликтүү жөнөтүлдү. Биздин менеджер жакынкы арада көрсөтүлгөн телефон номери боюнча сиз менен байланышат.",
    "contact.send_another": "ДАГЫ БИР АРЫЗ ЖӨНӨТҮҮ",
    "contact.error.name": "Сураныч, атыңызды жазыңыз",
    "contact.error.phone": "Сураныч, телефон номериңизди жазыңыз",
    "contact.error.phone_invalid": "Туура телефон номерин киргизиңиз",
    "contact.error.direction": "Багытты тандаңыз",
    "contact.error.privacy": "Маалыматтарды иштетүүгө макулдук талап кылынат",
    "contact.error.general": "Ката кетти. Кайра аракет кылыңыз.",

    // Footer
    "footer.desc":
      "Бишкектеги премиум көп функционалдуу комплекс. Бир дарек — көп мүмкүнчүлүктөр.",
    "footer.directions": "БАГЫТТАР",
    "footer.nav": "НАВИГАЦИЯ",
    "footer.social": "СОЦИАЛДЫК ТАРМАКТАР",
    "footer.privacy": "Купуялык саясаты",
    "footer.rights": "© 2025 «Дасмия» фирмасы ЖЧК. Бардык укуктар корголгон.",
    "footer.form.intro":
      "Өтүнмө калтырыңыз — биз сиз менен байланышып, иш-чарага эң ылайыктуу форматты тандап беребиз.",
    "footer.form.name": "Атыңыз",
    "footer.form.contactMethod": "Сиз менен кантип байланышалы?",
    "footer.form.submit": "Өтүнмө калтыруу",
    "footer.form.sending": "Жөнөтүлүүдө...",
    "footer.form.consent": "Баскычты басуу менен мен",
    "footer.form.success": "Өтүнмө жөнөтүлдү, биз жакында сиз менен байланышабыз.",
    "footer.form.error": "Бардык талааларды толтуруп, макулдугуңузду ырастаңыз.",
    "footer.location": "Бишкек, Кыргызстан",

    // Subpages Common
    "page.all_directions": "БАРДЫК БАГЫТТАР",
    "page.book_now": "АРЫЗ КАЛТЫРУУ",
    "page.call_us": "ЖЕ БИЗГЕ ЧАЛЫҢЫЗ",
    "page.gallery": "ГАЛЕРЕЯ",
    "page.about_direction": "БАГЫТ ЖӨНҮНДӨ",
    "page.features": "МҮМКҮНЧҮЛҮКТӨР",

    // 404
    "404.title": "Барак табылган жок",
    "404.desc": "Сиз издеген барак жок. Кайра артка кайталы!",
    "404.back": "Артка",
    "404.home": "Башкы бетке",
  },

  en: {
    // Navigation & Header
    "nav.about": "ABOUT",
    "nav.directions": "DIRECTIONS",
    "nav.corporate": "CORPORATE",
    "nav.history": "HISTORY",
    "nav.contact": "CONTACT",
    "nav.cta": "BOOK NOW",
    "nav.menu.open": "Open menu",
    "nav.menu.close": "Close menu",
    "nav.theme.light": "Switch to light theme",
    "nav.theme.dark": "Switch to dark theme",

    // Hero Section
    "hero.eyebrow": "DASMIA PREMIUM COMPLEX",
    "hero.title": "DASMIA",
    "hero.subtitle": "One complex. Endless possibilities.",
    "hero.description":
      "Eight directions of premium leisure, gastronomy, wellness and culture — under one roof in the heart of Bishkek.",
    "hero.cta.primary": "BOOK NOW",
    "hero.cta.secondary": "EXPLORE COMPLEX",
    "hero.badge": "BISHKEK / KYRGYZSTAN",
    "hero.directions": "8 DIRECTIONS",
    "hero.directions.cta": "VIEW ALL",
    "hero.address": "ANKARA ST. 2B",

    // Intro Section
    "intro.label": "ABOUT",
    "intro.title": "More than",
    "intro.title.em": "just a place.",
    "intro.p1":
      "DASMIA is a space where every visit becomes an event. Here, the traditions of Kyrgyz hospitality meet world-class service standards.",
    "intro.p2":
      "Eight directions — banquets, gastronomy, wellness, culture, sport — created so every guest finds their own space.",
    "intro.quote": '"A space worthy of your most important moments."',
    "intro.cta": "EXPLORE DIRECTIONS",

    // Metrics Section
    "metrics.years.label": "YEARS OF HISTORY",
    "metrics.years.sublabel": "Traditions of hospitality",
    "metrics.halls.label": "BANQUET HALLS",
    "metrics.halls.sublabel": "For every format",
    "metrics.guests.label": "GUESTS",
    "metrics.guests.sublabel": "Trust us annually",
    "metrics.directions.label": "DIRECTIONS",
    "metrics.directions.sublabel": "Under one roof",

    // Directions Section
    "directions.label": "8 DIRECTIONS",
    "directions.title": "One complex —",
    "directions.title.em": "endless possibilities",
    "directions.desc":
      "Each direction is an individual world with its own character, team, and standards of quality.",
    "directions.more": "LEARN MORE",
    "directions.cat.celebration": "CELEBRATIONS",
    "directions.cat.gastronomy": "GASTRONOMY",
    "directions.cat.culture": "CULTURE",
    "directions.cat.sport": "SPORT",
    "directions.cat.wellness": "WELLNESS",
    "directions.cat.heritage": "CULTURAL HERITAGE",
    "directions.cat.business": "BUSINESS",
    "directions.banquet.title": "Banquet Halls",
    "directions.banquet.desc":
      "Halls for weddings, anniversaries, and corporate events of any scale.",
    "directions.restaurant.title": "Restaurant",
    "directions.restaurant.desc":
      "Signature cuisine blending the finest traditions of Kyrgyz and European gastronomy.",
    "directions.chaikhana.title": "Chaikhana",
    "directions.chaikhana.desc":
      "Authentic atmosphere of traditional tea ceremonies with a modern touch.",
    "directions.fitness.title": "Fitness Club",
    "directions.fitness.desc":
      "Modern equipment, certified personal trainers, and group training programs.",
    "directions.pools.title": "Swimming Pools",
    "directions.pools.desc":
      "Main lap pool, kids pool, and relaxation pools with professional service.",
    "directions.spa.title": "SPA",
    "directions.spa.desc":
      "Full spectrum of spa treatments for restoration and body & soul harmony.",
    "directions.ethno.title": "Ethno Village",
    "directions.ethno.desc":
      "Authentic yurts, Kyrgyz traditions, and natural materials in a premium format.",
    "directions.events.title": "Events & Conferences",
    "directions.events.desc":
      "Conferences, forums, workshops, and business meetings with full AV support.",

    // Featured Section
    "featured.b1.category": "CELEBRATIONS",
    "featured.b1.title": "Banquet Halls",
    "featured.b1.subtitle": "A space for extraordinary moments",
    "featured.b1.description":
      "Three unique halls with distinct character and capacity. Each features bespoke design, professional lighting, and acoustics. Our team crafts memories to last for years.",
    "featured.b1.f1": "Capacity up to 1,500 guests",
    "featured.b1.f2": "Professional light & sound",
    "featured.b1.f3": "Full event decor",
    "featured.b1.f4": "In-house gourmet kitchen",
    "featured.b2.category": "WELLNESS & SPORT",
    "featured.b2.title": "Fitness Club",
    "featured.b2.subtitle": "Body and mind in harmony",
    "featured.b2.description":
      "State-of-the-art equipment from global leading brands, certified instructors, and an inspiring atmosphere. Tailored workout plans for all fitness levels.",
    "featured.b2.f1": "Professional equipment",
    "featured.b2.f2": "Personal trainers",
    "featured.b2.f3": "Group fitness classes",
    "featured.b2.f4": "Flexible memberships",
    "featured.b3.category": "POOLS & SPA",
    "featured.b3.title": "Pools and SPA",
    "featured.b3.subtitle": "A sanctuary for regeneration",
    "featured.b3.description":
      "Main swimming pool, children's zone, and luxury spa with full thermal suites. Professional therapists, pristine cleanliness, and complete relaxation.",
    "featured.b3.f1": "Main pool 25m",
    "featured.b3.f2": "Kids swimming pool",
    "featured.b3.f3": "Hammam & Sauna",
    "featured.b3.f4": "Private massage suites",
    "featured.cta": "LEARN MORE",

    // History Section
    "history.label": "HISTORY",
    "history.title": "A story,",
    "history.title.em": "that continues to evolve",
    "history.t1.title": "Foundation",
    "history.t1.desc":
      "The first step toward creating a space uniting Kyrgyz hospitality traditions with modern standards of quality recreation.",
    "history.t2.title": "First Directions",
    "history.t2.desc":
      "Opening of the banquet halls and restaurant. The first celebrations, first guests, and initial chapters of our heritage.",
    "history.t3.title": "Complex Expansion",
    "history.t3.desc":
      "Launch of the fitness club, pools, and SPA. DASMIA establishes itself as the premier comprehensive wellness complex in the region.",
    "history.t4.title": "Ethno Village & Culture",
    "history.t4.desc":
      "Creation of a unique ethno-space with authentic yurts and Kyrgyz customs. DASMIA's cultural identity takes full shape.",
    "history.t5.title": "DASMIA Today",
    "history.t5.desc":
      "Eight directions, thousands of delighted guests, hundreds of premier events. We continue creating experiences that exceed expectations.",

    // Corporate Section
    "corporate.label": "FOR CORPORATE CLIENTS",
    "corporate.title.p1": "For business.",
    "corporate.title.em": "For partnership.",
    "corporate.title.p2": "For key milestones.",
    "corporate.description":
      "DASMIA delivers a full suite of services for corporate clients. Conference halls, banquet venues, meeting rooms, and VIP protocol services — all in one location.",
    "corporate.cta.quote": "REQUEST PROPOSAL",
    "corporate.s1.label": "Conferences & Forums",
    "corporate.s1.desc": "Up to 500+ attendees, full audiovisual equipment",
    "corporate.s2.label": "Corporate Banquets",
    "corporate.s2.desc": "Customized catering, decor, and entertainment",
    "corporate.s3.label": "Business Negotiations",
    "corporate.s3.desc": "Meeting suites, executive catering, discreet service",
    "corporate.s4.label": "Delegations & Receptions",
    "corporate.s4.desc": "VIP protocol service, high-profile hospitality",
    "corporate.s5.label": "Team Building",
    "corporate.s5.desc": "On-site group activities and bespoke scenarios",
    "corporate.s6.label": "Hybrid Events",
    "corporate.s6.desc": "Simultaneous in-person and live streaming setups",

    // Event CTA Section
    "event_cta.label": "EVENTS",
    "event_cta.title": "Your event.",
    "event_cta.title.em": "Our venue.",
    "event_cta.description":
      "Weddings, anniversaries, corporate galas, conferences — every occasion deserves the ideal venue and flawless hospitality.",
    "event_cta.book": "BOOK NOW",
    "event_cta.organize": "ORGANIZE AN EVENT",

    // Contact Form & Section
    "contact.label": "CONTACT",
    "contact.title": "Send a request",
    "contact.title.em": "we will get in touch",
    "contact.address.label": "ADDRESS",
    "contact.address.value": "Bishkek, Ankara St. 2B, Kyrgyzstan",
    "contact.phone.label": "PHONE",
    "contact.email.label": "EMAIL",
    "contact.hours.label": "WORKING HOURS",
    "contact.hours.value": "Daily 08:00 – 23:00",
    "contact.name": "NAME",
    "contact.name.placeholder": "Your name",
    "contact.phone": "PHONE",
    "contact.phone.placeholder": "+996 XXX XXX XXX",
    "contact.direction": "DIRECTION",
    "contact.direction.placeholder": "Select direction",
    "contact.message": "MESSAGE",
    "contact.message.placeholder": "Tell us about your event...",
    "contact.privacy": "I agree to the processing of personal data",
    "contact.submit": "SEND REQUEST",
    "contact.submitting": "SENDING...",
    "contact.btn.success": "REQUEST SENT ✓",
    "contact.btn.failed": "SENDING FAILED ✕",
    "contact.sent.label": "SENT",
    "contact.success": "Request received.",
    "contact.success.em": "We will contact you shortly.",
    "contact.success.desc":
      "Your request has been successfully submitted. Our manager will contact you soon at the provided phone number.",
    "contact.send_another": "SUBMIT ANOTHER REQUEST",
    "contact.error.name": "Please enter your name",
    "contact.error.phone": "Please enter your phone number",
    "contact.error.phone_invalid": "Please enter a valid phone number",
    "contact.error.direction": "Please select a direction",
    "contact.error.privacy": "Consent to personal data processing is required",
    "contact.error.general": "An error occurred. Please try again.",

    // Footer
    "footer.desc":
      "Premium multifunctional complex in Bishkek. One destination — endless possibilities.",
    "footer.directions": "DIRECTIONS",
    "footer.nav": "NAVIGATION",
    "footer.social": "SOCIAL NETWORKS",
    "footer.privacy": "Privacy Policy",
    "footer.rights": "© 2025 DASMIA Firm LLC. All rights reserved.",
    "footer.form.intro":
      "Leave a request — we'll get in touch and help find the perfect format for your event.",
    "footer.form.name": "Your name",
    "footer.form.contactMethod": "How should we contact you?",
    "footer.form.submit": "Send request",
    "footer.form.sending": "Sending...",
    "footer.form.consent": "By clicking the button, I agree with the",
    "footer.form.success": "Request sent, we'll be in touch soon.",
    "footer.form.error": "Please fill in all fields and confirm your consent.",
    "footer.location": "Bishkek, Kyrgyzstan",

    // Subpages Common
    "page.all_directions": "ALL DIRECTIONS",
    "page.book_now": "SUBMIT REQUEST",
    "page.call_us": "OR CALL US DIRECTLY",
    "page.gallery": "GALLERY",
    "page.about_direction": "ABOUT DIRECTION",
    "page.features": "FEATURES",

    // 404
    "404.title": "Page Not Found",
    "404.desc": "The page you are looking for does not exist. Let's get you back!",
    "404.back": "Go Back",
    "404.home": "Back to Home",
  },
};

export function getTranslations(lang: Language): Record<string, string> {
  return translations[lang] ?? translations[DEFAULT_LANGUAGE];
}

export function t(lang: Language, key: string): string {
  return (
    translations[lang]?.[key] ?? translations[DEFAULT_LANGUAGE]?.[key] ?? key
  );
}
