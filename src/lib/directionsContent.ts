import { Language } from "./i18n";

export interface DirectionFeatureItem {
  number: string;
  title: string;
  description: string;
}

export interface DirectionDetailItem {
  label: string;
  value: string;
}

export interface DirectionPageData {
  hero: {
    category: string;
    title: string;
    subtitle?: string;
    description: string;
    imageAlt: string;
  };
  intro: {
    label: string;
    heading: string;
    headingItalic: string;
    body: string;
    details: DirectionDetailItem[];
  };
  featuresSection: {
    label: string;
    heading: string;
    features: DirectionFeatureItem[];
  };
  secondFeaturesSection?: {
    label: string;
    heading: string;
    features: DirectionFeatureItem[];
  };
  gallery: {
    label: string;
    heading: string;
  };
  cta: {
    heading: string;
    headingItalic?: string;
    description: string;
    primaryLabel: string;
    secondaryLabel?: string;
  };
}

export const directionsContent: Record<string, Record<Language, DirectionPageData>> = {
  banquet: {
    ru: {
      hero: {
        category: "БАНКЕТНЫЕ ЗАЛЫ",
        title: "БАНКЕТНЫЕ",
        subtitle: "ЗАЛЫ",
        description:
          "Пространство для событий, которые хочется запомнить. Три зала различной вместимости для свадеб, юбилеев и корпоративных торжеств.",
        imageAlt:
          "Банкетный зал DASMIA — элегантное пространство для торжественных мероприятий",
      },
      intro: {
        label: "О НАПРАВЛЕНИИ",
        heading: "Каждое событие",
        headingItalic: "заслуживает особого места.",
        body: "Банкетные залы DASMIA — это архитектурно выверенные пространства, созданные для торжественных событий. Три зала с различной вместимостью позволяют организовать как камерный семейный ужин, так и масштабное корпоративное мероприятие. Профессиональная команда обеспечит безупречный сервис и индивидуальный подход к каждому гостю.",
        details: [
          { label: "ВМЕСТИМОСТЬ", value: "до 1500 гостей" },
          { label: "ЗАЛОВ", value: "3 зала" },
          { label: "ПЛОЩАДЬ", value: "Просторные залы" },
          { label: "КУХНЯ", value: "Европейская / Восточная" },
        ],
      },
      featuresSection: {
        label: "ВОЗМОЖНОСТИ",
        heading: "Три зала — три формата события",
        features: [
          {
            number: "01",
            title: "ГЛАВНЫЙ ЗАЛ",
            description:
              "Просторный зал с высокими потолками и панорамным освещением. Идеален для свадеб и масштабных торжеств. Вместимость до 1500 гостей.",
          },
          {
            number: "02",
            title: "КАМЕРНЫЙ ЗАЛ",
            description:
              "Уютное пространство для деловых ужинов, семейных торжеств и небольших корпоративных встреч.",
          },
          {
            number: "03",
            title: "VIP-КАБИНЕТ",
            description:
              "Приватное пространство для особых встреч. Индивидуальный сервис и полная конфиденциальность.",
          },
        ],
      },
      gallery: {
        label: "ГАЛЕРЕЯ",
        heading: "Атмосфера торжества",
      },
      cta: {
        heading: "Ваше торжество.",
        headingItalic: "Наше пространство.",
        description:
          "Оставьте заявку — наш менеджер свяжется с вами для обсуждения деталей вашего мероприятия и подбора оптимального зала.",
        primaryLabel: "ЗАБРОНИРОВАТЬ ЗАЛ",
        secondaryLabel: "ИЛИ ПОЗВОНИТЕ НАМ",
      },
    },
    ky: {
      hero: {
        category: "БАНКЕТТИК ЗАЛДАР",
        title: "БАНКЕТТИК",
        subtitle: "ЗАЛДАР",
        description:
          "Эсте кала турган окуялар үчүн мейкиндик. Үйлөнүү үлпөттөрү, мааракелер жана корпоративдик салтанаттар үчүн ар кандай сыйымдуулуктагы үч зал.",
        imageAlt: "DASMIA банкеттик залы — салтанаттуу иш-чаралар үчүн мейкиндик",
      },
      intro: {
        label: "БАГЫТ ЖӨНҮНДӨ",
        heading: "Ар бир салтанат",
        headingItalic: "өзгөчө орунга татыктуу.",
        body: "DASMIA банкеттик залдары — салтанаттуу иш-чаралар үчүн атайын жасалган архитектуралык мейкиндиктер. Ар кандай сыйымдуулуктагы үч зал чакан үй-бүлөлүк кечки тамакты да, ири масштабдуу корпоративдик иш-чараны да жогорку деңгээлде өткөрүүгө мүмкүндүк берет.",
        details: [
          { label: "СЫЙЫМДУУЛУК", value: "1500 конокко чейин" },
          { label: "ЗАЛДАР", value: "3 зал" },
          { label: "АЯНТЫ", value: "Кеңири залдар" },
          { label: "АШКАНА", value: "Европа / Чыгыш" },
        ],
      },
      featuresSection: {
        label: "МҮМКҮНЧҮЛҮКТӨР",
        heading: "Үч зал — үч түрдүү формат",
        features: [
          {
            number: "01",
            title: "НЕГИЗГИ ЗАЛ",
            description:
              "Бийик шыптары жана панорамалык жарыктандыруусу бар кеңири зал. Үйлөнүү тойлор жана чоң салтанаттар үчүн идеалдуу. 1500 конокко чейин.",
          },
          {
            number: "02",
            title: "ЧАКАН ЗАЛ",
            description:
              "Бизнес-кечки тамактар, үй-бүлөлүк салтанаттар жана чакан жолугушуулар үчүн жайлуу мейкиндик.",
          },
          {
            number: "03",
            title: "VIP-КАБИНЕТ",
            description:
              "Өзгөчө жолугушуулар үчүн приваттык мейкиндик. Жеке кызмат жана толук купуялуулук.",
          },
        ],
      },
      gallery: {
        label: "ГАЛЕРЕЯ",
        heading: "Салтанаттын атмосферасы",
      },
      cta: {
        heading: "Сиздин салтанатыңыз.",
        headingItalic: "Биздин мейкиндик.",
        description:
          "Арыз калтырыңыз — биздин менеджер сиз менен байланышып, иш-чараңыздын чоо-жайын талкуулап, ылайыктуу залды тандап берет.",
        primaryLabel: "ЗАЛДЫ ЭЭЛӨӨ",
        secondaryLabel: "ЖЕ БИЗГЕ ЧАЛЫҢЫЗ",
      },
    },
    en: {
      hero: {
        category: "BANQUET HALLS",
        title: "BANQUET",
        subtitle: "HALLS",
        description:
          "A venue for moments you will cherish forever. Three magnificent halls with distinct capacities for weddings, galas, and corporate celebrations.",
        imageAlt: "DASMIA Banquet Hall — elegant space for prestigious celebrations",
      },
      intro: {
        label: "ABOUT DIRECTION",
        heading: "Every milestone",
        headingItalic: "deserves a grand setting.",
        body: "DASMIA banquet halls are architecturally crafted venues designed for momentous events. Three halls of varying scale accommodate everything from intimate family gatherings to grand corporate galas. Our dedicated team guarantees flawless hospitality and personalized service for every guest.",
        details: [
          { label: "CAPACITY", value: "Up to 1,500 guests" },
          { label: "HALLS", value: "3 halls" },
          { label: "AREA", value: "Spacious layout" },
          { label: "CUISINE", value: "European / Oriental" },
        ],
      },
      featuresSection: {
        label: "CAPABILITIES",
        heading: "Three halls — three distinct formats",
        features: [
          {
            number: "01",
            title: "GRAND HALL",
            description:
              "Expansive hall with soaring ceilings and panoramic lighting. Ideal for weddings and large-scale celebrations up to 1,500 guests.",
          },
          {
            number: "02",
            title: "INTIMATE HALL",
            description:
              "Cozy setting for executive dinners, family celebrations, and private corporate meetings.",
          },
          {
            number: "03",
            title: "VIP SUITE",
            description:
              "Exclusive private room for discreet high-level meetings with personalized concierge service.",
          },
        ],
      },
      gallery: {
        label: "GALLERY",
        heading: "Atmosphere of Celebration",
      },
      cta: {
        heading: "Your celebration.",
        headingItalic: "Our venue.",
        description:
          "Submit your request — our event manager will contact you to discuss details and choose the perfect hall for your gathering.",
        primaryLabel: "BOOK A HALL",
        secondaryLabel: "OR CALL US DIRECTLY",
      },
    },
  },

  restaurant: {
    ru: {
      hero: {
        category: "РЕСТОРАН",
        title: "РЕСТОРАН",
        description:
          "Авторская кухня, объединяющая традиции Востока и современные гастрономические тенденции. Пространство для неспешных встреч и особых вечеров.",
        imageAlt: "Ресторан DASMIA — изысканный интерьер и авторская кухня в Бишкеке",
      },
      intro: {
        label: "О РЕСТОРАНЕ",
        heading: "Гастрономия",
        headingItalic: "как искусство.",
        body: "Ресторан DASMIA — это место, где каждый визит становится событием. Авторское меню, созданное шеф-поваром, сочетает лучшие продукты региона с современными техниками приготовления. Интерьер ресторана — это натуральные материалы, мягкое освещение и продуманное пространство для комфортного отдыха.",
        details: [
          { label: "КУХНЯ", value: "Авторская / Европейская" },
          { label: "ПОСАДОЧНЫХ МЕСТ", value: "200+ мест" },
          { label: "ЧАСЫ РАБОТЫ", value: "11:00 – 00:00" },
          { label: "БРОНИРОВАНИЕ", value: "[CLIENT PHONE]" },
        ],
      },
      featuresSection: {
        label: "КОНЦЕПЦИЯ",
        heading: "Три грани гастрономического опыта",
        features: [
          {
            number: "01",
            title: "АВТОРСКОЕ МЕНЮ",
            description:
              "Сезонное меню, вдохновлённое кулинарными традициями Центральной Азии и современной европейской гастрономией. Только свежие локальные продукты.",
          },
          {
            number: "02",
            title: "ВИННАЯ КАРТА",
            description:
              "Тщательно подобранная коллекция вин из ведущих регионов мира. Сомелье поможет выбрать идеальное сопровождение к вашему ужину.",
          },
          {
            number: "03",
            title: "ЧАСТНЫЕ УЖИНЫ",
            description:
              "Организация приватных ужинов и дегустационных вечеров. Индивидуальное меню и персональный сервис для особых случаев.",
          },
        ],
      },
      gallery: {
        label: "ГАЛЕРЕЯ",
        heading: "Атмосфера ресторана",
      },
      cta: {
        heading: "Забронируйте столик",
        headingItalic: "на особый вечер.",
        description:
          "Оставьте заявку или позвоните нам — мы подберём лучший столик и поможем организовать незабываемый вечер.",
        primaryLabel: "ЗАБРОНИРОВАТЬ СТОЛИК",
        secondaryLabel: "ИЛИ ПОЗВОНИТЕ НАМ",
      },
    },
    ky: {
      hero: {
        category: "РЕСТОРАН",
        title: "РЕСТОРАН",
        description:
          "Чыгыш салттарын жана заманбап гастрономиялык багыттарды айкалыштырган автордук ашкана. Шашылбаган жолугушуулар жана өзгөчө кечтер үчүн мейкиндик.",
        imageAlt: "DASMIA рестораны — мыкты интерьер жана автордук ашкана",
      },
      intro: {
        label: "РЕСТОРАН ЖӨНҮНДӨ",
        heading: "Гастрономия",
        headingItalic: "искусство катары.",
        body: "DASMIA рестораны — ар бир барган сайын майрамга айланган жай. Башкы ашпозчу тарабынан түзүлгөн автордук меню аймактын мыкты азыктарын заманбап тамак даярдоо ыкмалары менен айкалыштырат.",
        details: [
          { label: "АШКАНА", value: "Автордук / Европалык" },
          { label: "ОРУНДАР", value: "200+ орун" },
          { label: "ИШ УБАКТЫСЫ", value: "11:00 – 00:00" },
          { label: "ЭЭЛӨӨ", value: "[CLIENT PHONE]" },
        ],
      },
      featuresSection: {
        label: "КОНЦЕПЦИЯ",
        heading: "Гастрономиялык тажрыйбанын үч кыры",
        features: [
          {
            number: "01",
            title: "АВТОРДУК МЕНЮ",
            description:
              "Борбордук Азиянын кулинардык салттарынан жана заманбап европалык гастрономиядан шыктанган сезондук меню.",
          },
          {
            number: "02",
            title: "ШАРАП КАРТАСЫ",
            description:
              "Дүйнөнүн алдыңкы аймактарынан тандалып алынган шараптар жыйнагы. Сомелье кечки тамагыңызга эң сонун коштоону тандап берет.",
          },
          {
            number: "03",
            title: "ЖЕКЕ КЕЧКИ ТАМАКТАР",
            description:
              "Жеке кечки тамактарды жана даам татуу кечелерин уюштуруу. Өзгөчө учурлар үчүн жеке меню жана персоналдык тейлөө.",
          },
        ],
      },
      gallery: {
        label: "ГАЛЕРЕЯ",
        heading: "Ресторандын атмосферасы",
      },
      cta: {
        heading: "Столик ээлеп коюңуз",
        headingItalic: "өзгөчө кеч үчүн.",
        description:
          "Арыз калтырыңыз же бизге чалыңыз — биз мыкты столду тандап, унутулгус кечти уюштурууга жардам беребиз.",
        primaryLabel: "СТОЛДУ ЭЭЛӨӨ",
        secondaryLabel: "ЖЕ БИЗГЕ ЧАЛЫҢЫЗ",
      },
    },
    en: {
      hero: {
        category: "RESTAURANT",
        title: "RESTAURANT",
        description:
          "Signature cuisine uniting the traditions of the Orient with modern gastronomic mastery. A refined setting for leisurely dinners and memorable evenings.",
        imageAlt: "DASMIA Restaurant — exquisite interior and signature gastronomy in Bishkek",
      },
      intro: {
        label: "ABOUT RESTAURANT",
        heading: "Gastronomy",
        headingItalic: "as fine art.",
        body: "DASMIA Restaurant is a destination where every dining experience becomes memorable. Our chef-driven seasonal menu merges premium local ingredients with contemporary culinary techniques in a warm, textured interior.",
        details: [
          { label: "CUISINE", value: "Signature / European" },
          { label: "SEATS", value: "200+ seats" },
          { label: "HOURS", value: "11:00 – 00:00" },
          { label: "RESERVATIONS", value: "[CLIENT PHONE]" },
        ],
      },
      featuresSection: {
        label: "CONCEPT",
        heading: "Three facets of culinary excellence",
        features: [
          {
            number: "01",
            title: "SIGNATURE MENU",
            description:
              "Seasonal tasting menus inspired by Central Asian roots and modern European gastronomy using freshest local produce.",
          },
          {
            number: "02",
            title: "WINE COLLECTION",
            description:
              "Curated selection of vintage wines from renowned global terroirs with expert pairing by our sommelier.",
          },
          {
            number: "03",
            title: "PRIVATE DINING",
            description:
              "Bespoke private tasting events and executive dining rooms with dedicated chef service.",
          },
        ],
      },
      gallery: {
        label: "GALLERY",
        heading: "Restaurant Ambience",
      },
      cta: {
        heading: "Reserve your table",
        headingItalic: "for an extraordinary evening.",
        description:
          "Submit a reservation request or give us a call — we will arrange the finest table and ensure an impeccable dining experience.",
        primaryLabel: "RESERVE TABLE",
        secondaryLabel: "OR CALL US DIRECTLY",
      },
    },
  },

  chaikhana: {
    ru: {
      hero: {
        category: "ЧАЙХАНА",
        title: "ЧАЙХАНА",
        description:
          "Место, где время замедляется. Традиции восточного чаепития, тёплая атмосфера и аутентичная кухня в современном прочтении.",
        imageAlt: "Чайхана DASMIA — традиционное восточное пространство",
      },
      intro: {
        label: "О ЧАЙХАНЕ",
        heading: "Восток встречает",
        headingItalic: "современность.",
        body: "Чайхана DASMIA — это пространство, где культурные традиции Центральной Азии обретают новую жизнь. Тёплые натуральные материалы, традиционные орнаменты и аутентичная кухня создают атмосферу подлинного восточного гостеприимства.",
        details: [
          { label: "КУХНЯ", value: "Восточная / Кыргызская" },
          { label: "ПОСАДОЧНЫХ МЕСТ", value: "150+ мест" },
          { label: "ЧАСЫ РАБОТЫ", value: "10:00 – 23:00" },
          { label: "АТМОСФЕРА", value: "Тёплая, культурная" },
        ],
      },
      featuresSection: {
        label: "ОСОБЕННОСТИ",
        heading: "Традиции в каждой детали",
        features: [
          {
            number: "01",
            title: "ЧАЙНАЯ ЦЕРЕМОНИЯ",
            description:
              "Традиционная подача чая с соблюдением ритуалов восточного гостеприимства. Богатая чайная коллекция.",
          },
          {
            number: "02",
            title: "АУТЕНТИЧНАЯ КУХНЯ",
            description:
              "Блюда кыргызской и центральноазиатской кухни, приготовленные по старинным рецептам.",
          },
          {
            number: "03",
            title: "ПРИВАТНЫЕ НИШИ",
            description:
              "Уютные топчаны и отдельные пространства для семейных обедов и задушевных бесед.",
          },
        ],
      },
      gallery: {
        label: "ГАЛЕРЕЯ",
        heading: "Атмосфера чайханы",
      },
      cta: {
        heading: "Приходите в гости.",
        headingItalic: "Мы вас ждём.",
        description:
          "Забронируйте столик в чайхане DASMIA и погрузитесь в атмосферу подлинного восточного гостеприимства.",
        primaryLabel: "ЗАБРОНИРОВАТЬ МЕСТО",
        secondaryLabel: "ИЛИ ПОЗВОНИТЕ НАМ",
      },
    },
    ky: {
      hero: {
        category: "ЧАЙКАНА",
        title: "ЧАЙКАНА",
        description:
          "Убакыт жайлаган жай. Чыгыш чай ичүү салттары, жылуу атмосфера жана заманбап чечмелөөдөгү нукура ашкана.",
        imageAlt: "DASMIA чайканасы — салттуу чыгыш мейкиндиги",
      },
      intro: {
        label: "ЧАЙКАНА ЖӨНҮНДӨ",
        heading: "Чыгыш менен",
        headingItalic: "заманбаптык жолугушат.",
        body: "DASMIA чайканасы — Борбордук Азиянын маданий салттары жаңы дем алган мейкиндик. Табигый жыгач, салттуу оюулар жана нукура улуттук ашкана чыныгы чыгыш меймандостугунун маанайын тартуулайт.",
        details: [
          { label: "АШКАНА", value: "Чыгыш / Кыргызча" },
          { label: "ОРУНДАР", value: "150+ орун" },
          { label: "ИШ УБАКТЫСЫ", value: "10:00 – 23:00" },
          { label: "АТМОСФЕРА", value: "Жылуу, маданий" },
        ],
      },
      featuresSection: {
        label: "ӨЗГӨЧӨЛҮКТӨРҮ",
        heading: "Ар бир деталдагы салт",
        features: [
          {
            number: "01",
            title: "ЧАЙ АЗЕМДЕРИ",
            description:
              "Чыгыш меймандостугунун бардык эрежелерине ылайык чай сунуу салты. Бай чай коллекциясы.",
          },
          {
            number: "02",
            title: "НУКУРА АШКАНА",
            description:
              "Кыргыз жана борбордук азиялык салттуу рецепттер боюнча даярдалган тамактар.",
          },
          {
            number: "03",
            title: "ЖЕКЕ ТОПЧАНДАР",
            description:
              "Үй-бүлөлүк тамактануу жана сырдашуу үчүн ыңгайлуу топчандар жана обочолонгон орундар.",
          },
        ],
      },
      gallery: {
        label: "ГАЛЕРЕЯ",
        heading: "Чайкананын атмосферасы",
      },
      cta: {
        heading: "Конокко келиңиз.",
        headingItalic: "Биз сизди күтөбүз.",
        description:
          "DASMIA чайканасынан орун ээлеп, нукура чыгыш меймандостугуна суктаныңыз.",
        primaryLabel: "ОРУН ЭЭЛӨӨ",
        secondaryLabel: "ЖЕ БИЗГЕ ЧАЛЫҢЫЗ",
      },
    },
    en: {
      hero: {
        category: "CHAIKHANA",
        title: "CHAIKHANA",
        description:
          "A sanctuary where time slows down. Traditions of oriental tea ceremonies, welcoming warmth, and authentic cuisine in a contemporary space.",
        imageAlt: "DASMIA Chaikhana — traditional oriental teahouse",
      },
      intro: {
        label: "ABOUT CHAIKHANA",
        heading: "East meets",
        headingItalic: "modern elegance.",
        body: "DASMIA Chaikhana celebrates Central Asian tea rituals and cultural heritage. Natural woodwork, traditional ornaments, and authentic recipes recreate the genuine spirit of Silk Road hospitality.",
        details: [
          { label: "CUISINE", value: "Oriental / Kyrgyz" },
          { label: "SEATS", value: "150+ seats" },
          { label: "HOURS", value: "10:00 – 23:00" },
          { label: "ATMOSPHERE", value: "Warm, cultural" },
        ],
      },
      featuresSection: {
        label: "HIGHLIGHTS",
        heading: "Heritage in every detail",
        features: [
          {
            number: "01",
            title: "TEA CEREMONY",
            description:
              "Authentic tea service following ancient rituals of hospitality with extensive premium loose-leaf selections.",
          },
          {
            number: "02",
            title: "AUTHENTIC DISHES",
            description:
              "Traditional Kyrgyz and Central Asian delicacies prepared with local farm ingredients and heritage spices.",
          },
          {
            number: "03",
            title: "PRIVATE TOPCHANS",
            description:
              "Cozy carpeted seating alcoves and private niches for family meals and relaxed gatherings.",
          },
        ],
      },
      gallery: {
        label: "GALLERY",
        heading: "Chaikhana Atmosphere",
      },
      cta: {
        heading: "Join us for tea.",
        headingItalic: "We look forward to welcoming you.",
        description:
          "Reserve a table at DASMIA Chaikhana and immerse yourself in authentic oriental warmth and hospitality.",
        primaryLabel: "RESERVE SEATING",
        secondaryLabel: "OR CALL US DIRECTLY",
      },
    },
  },

  fitness: {
    ru: {
      hero: {
        category: "ФИТНЕС-КЛУБ",
        title: "ФИТНЕС",
        subtitle: "КЛУБ",
        description:
          "Движение становится частью образа жизни. Современное оборудование, профессиональные тренеры и пространство, вдохновляющее на результат.",
        imageAlt: "Фитнес-клуб DASMIA — современное оборудование и премиальная атмосфера",
      },
      intro: {
        label: "О КЛУБЕ",
        heading: "Пространство",
        headingItalic: "для вашего прогресса.",
        body: "Фитнес-клуб DASMIA — это продуманное пространство, где каждая деталь работает на ваш результат. Современное оборудование ведущих мировых брендов, профессиональные тренеры и атмосфера, которая мотивирует двигаться вперед.",
        details: [
          { label: "ПЛОЩАДЬ", value: "1200+ м²" },
          { label: "ТРЕНАЖЁРОВ", value: "80+ единиц" },
          { label: "ТРЕНЕРОВ", value: "Сертифицированные профи" },
          { label: "ЧАСЫ РАБОТЫ", value: "07:00 – 23:00" },
        ],
      },
      featuresSection: {
        label: "ЗОНЫ КЛУБА",
        heading: "Полный спектр тренировочных возможностей",
        features: [
          {
            number: "01",
            title: "ТРЕНАЖЁРНЫЙ ЗАЛ",
            description:
              "Профессиональное оборудование для силовых тренировок, кардио-зона и зона свободных весов.",
          },
          {
            number: "02",
            title: "ГРУППОВЫЕ ЗАНЯТИЯ",
            description:
              "Йога, пилатес, сайклинг, кроссфит и функциональный тренинг для любого уровня подготовки.",
          },
          {
            number: "03",
            title: "ПЕРСОНАЛЬНЫЙ ТРЕНИНГ",
            description:
              "Индивидуальные программы тренировок и питания под руководством опытных наставников.",
          },
        ],
      },
      gallery: {
        label: "ГАЛЕРЕЯ",
        heading: "Пространство для тренировок",
      },
      cta: {
        heading: "Начните сегодня.",
        headingItalic: "Первый шаг — за вами.",
        description:
          "Оставьте заявку на пробное занятие или консультацию с тренером. Мы подберём оптимальный формат тренировок под ваши цели.",
        primaryLabel: "ЗАПИСАТЬСЯ НА ПРОБНОЕ",
        secondaryLabel: "УЗНАТЬ О ЧЛЕНСТВЕ",
      },
    },
    ky: {
      hero: {
        category: "ФИТНЕС-КЛУБ",
        title: "ФИТНЕС",
        subtitle: "КЛУБ",
        description:
          "Кыймыл жашоо образыңызга айланат. Заманбап жабдуулар, кесипкөй машыктыруучулар жана ийгиликке шыктандырган мейкиндик.",
        imageAlt: "DASMIA фитнес-клубу — заманбап жабдуулар",
      },
      intro: {
        label: "КЛУБ ЖӨНҮНДӨ",
        heading: "Сиздин өсүшүңүз",
        headingItalic: "үчүн мейкиндик.",
        body: "DASMIA фитнес-клубу — ар бир детал сиздин натыйжаңыз үчүн иштеген ыңгайлуу жай. Дүйнөлүк алдыңкы бренддердин тренажёрлору, сертификатталган машыктыруучулар жана күч-кубат берген чөйрө.",
        details: [
          { label: "АЯНТЫ", value: "1200+ м²" },
          { label: "ТРЕНАЖЁРЛОР", value: "80+ даана" },
          { label: "МАШЫКТЫРУУЧУЛАР", value: "Тажрыйбалуу адистер" },
          { label: "ИШ УБАКТЫСЫ", value: "07:00 – 23:00" },
        ],
      },
      featuresSection: {
        label: "КЛУБДУН ЗОНАЛАРЫ",
        heading: "Машыгуунун толук мүмкүнчүлүктөрү",
        features: [
          {
            number: "01",
            title: "ТРЕНАЖЁР ЗАЛЫ",
            description:
              "Күч машыгуулары үчүн кесипкөй жабдуулар, кардио-зона жана эркин салмактар бөлмөсү.",
          },
          {
            number: "02",
            title: "ТОПТУК МАШЫГУУЛАР",
            description:
              "Йога, пилатес, сайклинг жана функционалдык машыгуулар бардык деңгээлдеги адамдарга жеткиликтүү.",
          },
          {
            number: "03",
            title: "ЖЕКЕ МАШЫКТЫРУУ",
            description:
              "Тажрыйбалуу насаатчылардын жетекчилиги астында жеке машыгуу жана туура тамактануу программалары.",
          },
        ],
      },
      gallery: {
        label: "ГАЛЕРЕЯ",
        heading: "Машыгуу мейкиндиги",
      },
      cta: {
        heading: "Бүгүн баштаңыз.",
        headingItalic: "Биринчи кадам — сизден.",
        description:
          "Сыноо машыгуусуна же машыктыруучунун консультациясына арыз калтырыңыз. Биз максаттарыңызга ылайыктуу форматты тандап беребиз.",
        primaryLabel: "СЫНООГО ЖАЗЫЛУУ",
        secondaryLabel: "МҮЧӨЛҮК ТУУРАЛУУ БИЛҮҮ",
      },
    },
    en: {
      hero: {
        category: "FITNESS CLUB",
        title: "FITNESS",
        subtitle: "CLUB",
        description:
          "Movement becomes a way of life. State-of-the-art equipment, elite personal trainers, and an atmosphere driving personal breakthrough.",
        imageAlt: "DASMIA Fitness Club — state-of-the-art equipment and motivating atmosphere",
      },
      intro: {
        label: "ABOUT FITNESS CLUB",
        heading: "A space engineered",
        headingItalic: "for your progress.",
        body: "DASMIA Fitness Club is more than a gym; it is a refined wellness destination designed to empower your peak performance. Featuring industry-leading equipment, internationally certified coaches, and an uplifting training environment.",
        details: [
          { label: "AREA", value: "1,200+ m²" },
          { label: "EQUIPMENT", value: "80+ machines" },
          { label: "TRAINERS", value: "Certified elite staff" },
          { label: "HOURS", value: "07:00 – 23:00" },
        ],
      },
      featuresSection: {
        label: "ZONES",
        heading: "Complete spectrum of training capabilities",
        features: [
          {
            number: "01",
            title: "MAIN GYM FLOOR",
            description:
              "Premium biomechanical strength machines, cardio theatre, and free-weight functional training spaces.",
          },
          {
            number: "02",
            title: "GROUP STUDIOS",
            description:
              "Dynamic timetable: Yoga, Pilates, High-Intensity Interval Training, and functional conditioning.",
          },
          {
            number: "03",
            title: "PERSONAL COACHING",
            description:
              "One-on-one tailored fitness programming, movement screening, and nutritional guidance.",
          },
        ],
      },
      gallery: {
        label: "GALLERY",
        heading: "Training Environment",
      },
      cta: {
        heading: "Start today.",
        headingItalic: "Take the first step.",
        description:
          "Sign up for a trial session or coaching consultation. We will tailor the perfect workout program for your wellness goals.",
        primaryLabel: "BOOK TRIAL SESSION",
        secondaryLabel: "MEMBERSHIP INQUIRY",
      },
    },
  },

  pools: {
    ru: {
      hero: {
        category: "БАССЕЙНЫ",
        title: "БАССЕЙНЫ",
        description:
          "Время для отдыха и восстановления. Главный бассейн, детская зона и пространство для релаксации в атмосфере премиального комплекса.",
        imageAlt: "Бассейны DASMIA — просторное водное пространство",
      },
      intro: {
        label: "О БАССЕЙНАХ",
        heading: "Вода как",
        headingItalic: "пространство покоя.",
        body: "Бассейны DASMIA — это продуманное водное пространство для плавания, отдыха и восстановления. Главный бассейн с профессиональными дорожками, детская зона с безопасным покрытием и зона гидромассажа создают идеальные условия для всей семьи.",
        details: [
          { label: "ДЛИНА ДОРОЖКИ", value: "25 метров" },
          { label: "ТЕМПЕРАТУРА", value: "28°C комфорт" },
          { label: "ЧАСЫ РАБОТЫ", value: "07:00 – 23:00" },
          { label: "ТАРИФЫ", value: "Гибкие абонементы" },
        ],
      },
      featuresSection: {
        label: "ЗОНЫ",
        heading: "Три водных пространства",
        features: [
          {
            number: "01",
            title: "ГЛАВНЫЙ БАССЕЙН",
            description:
              "Профессиональный бассейн 25м для плавания и спортивных тренировок с современной системой фильтрации воды.",
          },
          {
            number: "02",
            title: "ДЕТСКАЯ ЗОНА",
            description:
              "Безопасный мелководный бассейн с постоянным контролем сертифицированных инструкторов.",
          },
          {
            number: "03",
            title: "ЗОНА РЕЛАКСАЦИИ",
            description:
              "Гидромассажные ванны, джакузи и шезлонги для полного расслабления после заплыва.",
          },
        ],
      },
      gallery: {
        label: "ГАЛЕРЕЯ",
        heading: "Водное пространство DASMIA",
      },
      cta: {
        heading: "Окунитесь в",
        headingItalic: "атмосферу покоя.",
        description:
          "Оставьте заявку для получения информации о расписании, тарифах и абонементах бассейна DASMIA.",
        primaryLabel: "УЗНАТЬ РАСПИСАНИЕ",
        secondaryLabel: "КУПИТЬ АБОНЕМЕНТ",
      },
    },
    ky: {
      hero: {
        category: "БАССЕЙНДЕР",
        title: "БАССЕЙНДЕР",
        description:
          "Эс алуу жана калыбына келүү убактысы. Негизги бассейн, балдар аймагы жана премиум комплекстин атмосферасындагы эс алуу мейкиндиги.",
        imageAlt: "DASMIA бассейни — эс алуу жана калыбына келүү жайы",
      },
      intro: {
        label: "БАССЕЙНДЕР ЖӨНҮНДӨ",
        heading: "Суу — бул",
        headingItalic: "тынчтыктын мейкиндиги.",
        body: "DASMIA бассейндери — сүзүү, эс алуу жана калыбына келүү үчүн кылдат ойлонулган суу комплекси. 25 метрлик негизги бассейн, балдардын коопсуз зонасы жана гидромассаж бүт үй-бүлө үчүн жагымдуу шарт түзөт.",
        details: [
          { label: "УЗУНДУГУ", value: "25 метр" },
          { label: "ТЕМПЕРАТУРАСЫ", value: "28°C ыңгайлуу" },
          { label: "ИШ УБАКТЫСЫ", value: "07:00 – 23:00" },
          { label: "ТАРИФТЕР", value: "Ыңгайлуу абонементтер" },
        ],
      },
      featuresSection: {
        label: "ЗОНАЛАР",
        heading: "Үч суу мейкиндиги",
        features: [
          {
            number: "01",
            title: "НЕГИЗГИ БАССЕЙН",
            description:
              "Спорттук машыгуулар жана сүзүү үчүн заманбап тазалоо системасы бар 25 метрлик бассейн.",
          },
          {
            number: "02",
            title: "БАЛДАР ЗОНАСЫ",
            description:
              "Кесипкөй инструкторлордун көзөмөлү астындагы жылуу жана коопсуз тайыз бассейн.",
          },
          {
            number: "03",
            title: "ЭС АЛУУ ЗОНАСЫ",
            description:
              "Сүзгөндөн кийин толук эс алуу үчүн джакузи жана гидромассаждык ванналар.",
          },
        ],
      },
      gallery: {
        label: "ГАЛЕРЕЯ",
        heading: "DASMIA суу мейкиндиги",
      },
      cta: {
        heading: "Тынчтыктын",
        headingItalic: "чөйрөсүнө чөмүлүңүз.",
        description:
          "DASMIA бассейнинин графиги, тарифтери жана абонементтери жөнүндө маалымат алуу үчүн арыз калтырыңыз.",
        primaryLabel: "ГРАФИКТИ БИЛҮҮ",
        secondaryLabel: "АБОНЕМЕНТ САТЫП АЛУУ",
      },
    },
    en: {
      hero: {
        category: "SWIMMING POOLS",
        title: "POOLS",
        description:
          "Time for renewal and restoration. Main lap pool, kids aquatic area, and hydrotherapy zones in a pristine setting.",
        imageAlt: "DASMIA Swimming Pools — aquatic sanctuary for leisure and recovery",
      },
      intro: {
        label: "ABOUT POOLS",
        heading: "Water as",
        headingItalic: "a sanctuary of calm.",
        body: "DASMIA Pools offer an exquisite aquatic environment for swimming, wellness, and recovery. The 25-meter main pool, safe shallow kids zone, and jacuzzi thermal pools provide an all-inclusive family wellness experience.",
        details: [
          { label: "LENGTH", value: "25 meters" },
          { label: "TEMPERATURE", value: "28°C pristine" },
          { label: "HOURS", value: "07:00 – 23:00" },
          { label: "MEMBERSHIPS", value: "Flexible access" },
        ],
      },
      featuresSection: {
        label: "ZONES",
        heading: "Three aquatic environments",
        features: [
          {
            number: "01",
            title: "MAIN LAP POOL",
            description:
              "Semi-Olympic 25-meter pool with advanced multi-stage purification for sport and lap swimming.",
          },
          {
            number: "02",
            title: "CHILDREN'S AQUATICS",
            description:
              "Safe shallow heated pool designed for kids with certified lifeguards and swimming coaches.",
          },
          {
            number: "03",
            title: "HYDROTHERAPY & JACUZZI",
            description:
              "Thermal whirlpools, water jets, and heated poolside lounge chairs for muscular recovery.",
          },
        ],
      },
      gallery: {
        label: "GALLERY",
        heading: "Aquatic Space",
      },
      cta: {
        heading: "Immerse yourself in",
        headingItalic: "pure tranquility.",
        description:
          "Inquire about pool schedules, swim coaching, and family passes.",
        primaryLabel: "CHECK SCHEDULE",
        secondaryLabel: "PURCHASE MEMBERSHIP",
      },
    },
  },

  spa: {
    ru: {
      hero: {
        category: "SPA",
        title: "SPA",
        description:
          "Пространство для полного восстановления. Премиальные процедуры, профессиональный массаж и wellness-программы в атмосфере абсолютного покоя.",
        imageAlt: "SPA DASMIA — минималистичное пространство для восстановления",
      },
      intro: {
        label: "О SPA",
        heading: "Время для",
        headingItalic: "себя.",
        body: "SPA DASMIA — это пространство, где время замедляется, а тело и разум обретают равновесие. Минималистичный интерьер, натуральные материалы и профессиональные специалисты создают условия для глубокого восстановления.",
        details: [
          { label: "ПРОЦЕДУР", value: "30+ ритуалов" },
          { label: "КАБИНЕТОВ", value: "Приватные сьюты" },
          { label: "ЧАСЫ РАБОТЫ", value: "09:00 – 22:00" },
          { label: "ЗАПИСЬ", value: "[CLIENT PHONE]" },
        ],
      },
      featuresSection: {
        label: "УСЛУГИ",
        heading: "Полный спектр wellness-процедур",
        features: [
          {
            number: "01",
            title: "МАССАЖ",
            description:
              "Классический, тайский, стоун-массаж и авторские техники от мастеров с многолетним опытом.",
          },
          {
            number: "02",
            title: "ХАММАМ И САУНА",
            description:
              "Традиционный турецкий хаммам с пенным массажем и финская сауна с ароматерапией.",
          },
          {
            number: "03",
            title: "КОСМЕТИЧЕСКИЙ УХОД",
            description:
              "Уходовые программы для лица и тела с использованием косметики премиум-класса.",
          },
        ],
      },
      gallery: {
        label: "ГАЛЕРЕЯ",
        heading: "Пространство SPA",
      },
      cta: {
        heading: "Подарите себе",
        headingItalic: "время восстановления.",
        description:
          "Запишитесь на процедуру или wellness-программу. Наш специалист подберёт оптимальный маршрут для вашего отдыха.",
        primaryLabel: "ЗАПИСАТЬСЯ НА ПРОЦЕДУРУ",
        secondaryLabel: "УЗНАТЬ О ПРОГРАММАХ",
      },
    },
    ky: {
      hero: {
        category: "SPA",
        title: "SPA",
        description:
          "Толук калыбына келүү мейкиндиги. Премиум процедуралар, кесипкөй массаж жана бейпилдик атмосферасындагы wellness-программалар.",
        imageAlt: "DASMIA SPA — калыбына келүү жана эс алуу мейкиндиги",
      },
      intro: {
        label: "SPA ЖӨНҮНДӨ",
        heading: "Өзүңүз үчүн",
        headingItalic: "убакыт бөлүңүз.",
        body: "DASMIA SPA — убакыт токтоп, дене менен акыл тең салмактуулукка келген бейпил мейкиндик. Табигый материалдар, жумшак жарык жана кесипкөй адистер терең эс алуу үчүн бардык шарттарды түзөт.",
        details: [
          { label: "ПРОЦЕДУРАЛАР", value: "30+ түрү" },
          { label: "БӨЛМӨЛӨР", value: "Жеке сьюттар" },
          { label: "ИШ УБАКТЫСЫ", value: "09:00 – 22:00" },
          { label: "ЖАЗЫЛУУ", value: "[CLIENT PHONE]" },
        ],
      },
      featuresSection: {
        label: "КЫЗМАТТАР",
        heading: "Wellness-процедуралардын толук топтому",
        features: [
          {
            number: "01",
            title: "МАССАЖ",
            description:
              "Классикалык, тай, таш массажы жана автордук ыкмалар тажрыйбалуу массажисттерден.",
          },
          {
            number: "02",
            title: "ХАММАМ ЖАНА САУНА",
            description:
              "Көбүк массажы бар салттуу хаммам жана фин саунасы ароматерапия менен.",
          },
          {
            number: "03",
            title: "КОСМЕТИКАЛЫК КҮТҮМ",
            description:
              "Премиум косметика менен жүз жана дене үчүн натыйжалуу кам көрүү программалары.",
          },
        ],
      },
      gallery: {
        label: "ГАЛЕРЕЯ",
        heading: "SPA мейкиндиги",
      },
      cta: {
        heading: "Өзүңүзгө",
        headingItalic: "эс алуу белек кылыңыз.",
        description:
          "Процедурага же wellness-программага жазылыңыз. Биздин адис сиз үчүн мыкты эс алуу багытын сунуштайт.",
        primaryLabel: "ПРОЦЕДУРАГА ЖАЗЫЛУУ",
        secondaryLabel: "ПРОГРАММАЛАРДЫ БИЛҮҮ",
      },
    },
    en: {
      hero: {
        category: "SPA & WELLNESS",
        title: "SPA",
        description:
          "A sanctuary for complete renewal. Bespoke treatments, restorative bodywork, and holistic wellness rituals in serene luxury.",
        imageAlt: "DASMIA SPA — tranquil retreat for restoration and wellness",
      },
      intro: {
        label: "ABOUT SPA",
        heading: "Time devoted",
        headingItalic: "to yourself.",
        body: "DASMIA SPA is a tranquil haven where time stands still and your body and spirit find harmonic balance. Natural textures, soothing lighting, and expert therapists curate deeply restorative experiences.",
        details: [
          { label: "TREATMENTS", value: "30+ therapies" },
          { label: "SUITES", value: "Private suites" },
          { label: "HOURS", value: "09:00 – 22:00" },
          { label: "BOOKINGS", value: "[CLIENT PHONE]" },
        ],
      },
      featuresSection: {
        label: "SERVICES",
        heading: "Holistic wellness spectrum",
        features: [
          {
            number: "01",
            title: "BODYWORK & MASSAGE",
            description:
              "Classic deep tissue, Thai acupressure, hot stone, and signature restorative bodywork by master therapists.",
          },
          {
            number: "02",
            title: "HAMMAM & SAUNA",
            description:
              "Authentic Turkish steam hammam with foam peeling rituals and Finnish sauna with botanical aromatherapy.",
          },
          {
            number: "03",
            title: "FACIAL & BODY CARE",
            description:
              "Bespoke anti-aging facial and detoxifying body rituals using organic clinical skincare lines.",
          },
        ],
      },
      gallery: {
        label: "GALLERY",
        heading: "SPA Sanctuaries",
      },
      cta: {
        heading: "Gift yourself",
        headingItalic: "time for complete renewal.",
        description:
          "Reserve your spa journey or consultation. Our wellness concierge will curate the optimal treatment plan.",
        primaryLabel: "BOOK TREATMENT",
        secondaryLabel: "EXPLORE PACKAGES",
      },
    },
  },

  "ethno-village": {
    ru: {
      hero: {
        category: "ЭТНО-СЕЛО",
        title: "Этно-",
        subtitle: "село.",
        description:
          "Аутентичное погружение в традиционную культуру Кыргызстана. Юрты из натуральных материалов, кыргызские орнаменты и горные пейзажи — пространство, где история оживает.",
        imageAlt: "Этно-село DASMIA — традиционные юрты на фоне гор",
      },
      intro: {
        label: "ОБ ЭТНО-СЕЛЕ",
        heading: "Живая",
        headingItalic: "традиция.",
        body: "Этно-село DASMIA — это живое пространство, где каждый элемент создан руками кыргызских мастеров. Войлочные юрты с традиционными узорами, ручные ковры-шырдаки и аромат горных трав создают атмосферу подлинной кочевой культуры.",
        details: [
          { label: "ЮРТ", value: "Аутентичные юрты" },
          { label: "ВМЕСТИМОСТЬ", value: "Для семей и групп" },
          { label: "СЕЗОН", value: "Круглый год" },
          { label: "БРОНИРОВАНИЕ", value: "[CLIENT PHONE]" },
        ],
      },
      featuresSection: {
        label: "ОПЫТ",
        heading: "Традиции в каждой детали",
        features: [
          {
            number: "01",
            title: "АУТЕНТИЧНЫЕ ЮРТЫ",
            description:
              "Юрты собраны вручную из натурального дерева и войлока по старинным технологиям кочевников.",
          },
          {
            number: "02",
            title: "НАЦИОНАЛЬНАЯ КУХНЯ",
            description:
              "Традиционные блюда на открытом огне: бешбармак, кумыс, шорпо и свежевыпеченные тандырные лепёшки.",
          },
          {
            number: "03",
            title: "МАСТЕР-КЛАССЫ И РЕМЁСЛА",
            description:
              "Обучение традиционному войлоковалянию, ткачеству и изготовлению национальной атрибутики.",
          },
        ],
      },
      secondFeaturesSection: {
        label: "ПРИРОДА",
        heading: "Горный ландшафт как часть опыта",
        features: [
          {
            number: "04",
            title: "ПАНОРАМНЫЕ ВИДЫ",
            description:
              "Панорамы гор, звёздное небо вдали от городской суеты и чистейший горный воздух.",
          },
          {
            number: "05",
            title: "КОННЫЕ ПРОГУЛКИ",
            description:
              "Верховая езда на лошадях по живописным тропам в сопровождении опытных инструкторов.",
          },
          {
            number: "06",
            title: "ВЕЧЕРНИЕ РИТУАЛЫ",
            description:
              "Уютные посиделки у вечернего костра под чарующие звуки комуза и сказания акынов.",
          },
        ],
      },
      gallery: {
        label: "ГАЛЕРЕЯ",
        heading: "Пространство этно-села",
      },
      cta: {
        heading: "Забронируйте",
        headingItalic: "своё место.",
        description:
          "Оставьте заявку на посещение этно-села. Наш менеджер подберёт программу и ответит на все вопросы.",
        primaryLabel: "ЗАБРОНИРОВАТЬ ЮРТУ",
        secondaryLabel: "УЗНАТЬ О ПРОГРАММАХ",
      },
    },
    ky: {
      hero: {
        category: "ЭТНО-АЙЫЛ",
        title: "Этно-",
        subtitle: "айыл.",
        description:
          "Кыргызстандын салттуу маданиятына терең сүңгүү. Табигый материалдардан жасалган боз үйлөр, кыргыз оймо-чиймелери жана тоо пейзаждары.",
        imageAlt: "DASMIA этно-айылы — тоолор фонундагы салттуу боз үйлөр",
      },
      intro: {
        label: "ЭТНО-АЙЫЛ ЖӨНҮНДӨ",
        heading: "Тирүү",
        headingItalic: "салт.",
        body: "DASMIA этно-айылы — ар бир буюму кыргыз чеберлеринин колунан жаралган тирүү маданий жай. Кийиз боз үйлөр, шырдактар жана тоо чөптөрүнүн жыты чыныгы көчмөн маданиятынын маанайын тартуулайт.",
        details: [
          { label: "БОЗ ҮЙЛӨР", value: "Нукура боз үйлөр" },
          { label: "СЫЙЫМДУУЛУК", value: "Үй-бүлөлөр жана топтор" },
          { label: "СЕЗОН", value: "Жыл бою" },
          { label: "ЭЭЛӨӨ", value: "[CLIENT PHONE]" },
        ],
      },
      featuresSection: {
        label: "ТАЖРЫЙБА",
        heading: "Ар бир деталдагы каада-салт",
        features: [
          {
            number: "01",
            title: "НУКУРА БОЗ ҮЙЛӨР",
            description:
              "Көчмөндөрдүн байыркы ыкмалары боюнча табигый жыгачтан жана кийизден кол менен жасалган боз үйлөр.",
          },
          {
            number: "02",
            title: "УЛУТТУК АШКАНА",
            description:
              "Ачык отто бышырылган тамактар: бешбармак, кымыз, шорпо жана ысык тандыр нандары.",
          },
          {
            number: "03",
            title: "МАСТЕР-КЛАССТАР",
            description:
              "Кийиз басуу, шырдак тигүү жана улуттук кол өнөрчүлүк боюнча чеберчилик сабактары.",
          },
        ],
      },
      secondFeaturesSection: {
        label: "ЖАРАТЫЛЫШ",
        heading: "Тоо пейзажы тажрыйбанын бир бөлүгү",
        features: [
          {
            number: "04",
            title: "ПАНОРАМАЛЫК КӨРҮНҮШТӨР",
            description:
              "Тоолордун панорамасы, шаардан алыс жылдыздуу асман жана таза тоо абасы.",
          },
          {
            number: "05",
            title: "АТ МЕНЕН СЕЙИЛДӨӨ",
            description:
              "Тажрыйбалуу жол көрсөтүүчүлөр менен тоо чыйырлары боюнча ат минип сейилдөө.",
          },
          {
            number: "06",
            title: "КЕЧКИ САЛТТАР",
            description:
              "Комуздун мукам үндөрү жана акындардын дастандары менен оттун тегерегиндеги кечки жыйындар.",
          },
        ],
      },
      gallery: {
        label: "ГАЛЕРЕЯ",
        heading: "Этно-айыл мейкиндиги",
      },
      cta: {
        heading: "Өз орунуңузду",
        headingItalic: "ээлеп коюңуз.",
        description:
          "Этно-айылга келүү үчүн арыз калтырыңыз. Биздин менеджер программаны тандап, бардык суроолоруңузга жооп берет.",
        primaryLabel: "БОЗ ҮЙДҮ ЭЭЛӨӨ",
        secondaryLabel: "ПРОГРАММАЛАРДЫ БИЛҮҮ",
      },
    },
    en: {
      hero: {
        category: "ETHNO VILLAGE",
        title: "Ethno-",
        subtitle: "village.",
        description:
          "Authentic immersion in the nomadic culture of Kyrgyzstan. Hand-crafted felt yurts, national ornaments, and pristine mountain vistas.",
        imageAlt: "DASMIA Ethno Village — authentic yurts against the mountains",
      },
      intro: {
        label: "ABOUT ETHNO VILLAGE",
        heading: "Living",
        headingItalic: "tradition.",
        body: "DASMIA Ethno Village is an authentic cultural retreat crafted by master Kyrgyz artisans. Felt yurts, intricate shyrdak tapestries, and mountain breezes offer an unforgettable nomadic heritage experience.",
        details: [
          { label: "YURTS", value: "Handmade authentic yurts" },
          { label: "CAPACITY", value: "Families and groups" },
          { label: "SEASON", value: "Year-round" },
          { label: "BOOKINGS", value: "[CLIENT PHONE]" },
        ],
      },
      featuresSection: {
        label: "EXPERIENCE",
        heading: "Nomadic customs in every detail",
        features: [
          {
            number: "01",
            title: "AUTHENTIC YURTS",
            description:
              "Yurts assembled with sustainably sourced wood and wool felt using generational artisan joinery.",
          },
          {
            number: "02",
            title: "NOMADIC GASTRONOMY",
            description:
              "Open-flame cooking: Beshbarmak, fresh kymyz, rich shorpo, and wood-fired tandoor flatbreads.",
          },
          {
            number: "03",
            title: "CRAFT WORKSHOPS",
            description:
              "Hands-on felt-making, ornamental embroidery, and ancient leathercraft sessions led by village masters.",
          },
        ],
      },
      secondFeaturesSection: {
        label: "NATURE",
        heading: "Mountain landscape as part of the experience",
        features: [
          {
            number: "04",
            title: "PANORAMIC VISTAS",
            description:
              "Stunning mountain backdrops, dark starry skies free of light pollution, and crisp alpine air.",
          },
          {
            number: "05",
            title: "HORSEBACK RIDING",
            description:
              "Guided horseback trail excursions along breathtaking scenic foothills with experienced equestrians.",
          },
          {
            number: "06",
            title: "EVENING CAMPFIRE",
            description:
              "Night gatherings around the open fire featuring traditional komuz melodies and folkloric storytelling.",
          },
        ],
      },
      gallery: {
        label: "GALLERY",
        heading: "Ethno Village Ambience",
      },
      cta: {
        heading: "Reserve your",
        headingItalic: "authentic retreat.",
        description:
          "Submit a booking request for the Ethno Village. Our manager will curate your itinerary and answer any questions.",
        primaryLabel: "BOOK A YURT",
        secondaryLabel: "EXPLORE PACKAGES",
      },
    },
  },

  events: {
    ru: {
      hero: {
        category: "МЕРОПРИЯТИЯ",
        title: "МЕРОПРИЯТИЯ",
        description:
          "Пространство для деловых событий любого масштаба. Конференции, форумы, тренинги и корпоративные встречи с профессиональным техническим оснащением.",
        imageAlt: "Конференц-зал DASMIA — пространство для деловых мероприятий",
      },
      intro: {
        label: "О НАПРАВЛЕНИИ",
        heading: "Деловая встреча",
        headingItalic: "на уровне международных стандартов.",
        body: "DASMIA — это не только банкеты и торжества, но и полноценная площадка для деловых событий. Залы оснащены современным звуковым и световым оборудованием, LED-экранами и системами трансляции. Мы организуем форумы, тренинги, семинары и корпоративные встречи любого масштаба — от камерной сессии до форума на несколько сотен участников.",
        details: [
          { label: "ВМЕСТИМОСТЬ", value: "до 500 участников" },
          { label: "ЗАЛОВ", value: "Несколько залов" },
          { label: "ОСНАЩЕНИЕ", value: "Свет, звук, экраны" },
          { label: "ФОРМАТ", value: "Конференции и тренинги" },
        ],
      },
      featuresSection: {
        label: "ВОЗМОЖНОСТИ",
        heading: "Формат под любую задачу",
        features: [
          {
            number: "01",
            title: "КОНФЕРЕНЦИИ И ФОРУМЫ",
            description:
              "Просторные залы для деловых конференций и форумов с возможностью трансляции и синхронного перевода.",
          },
          {
            number: "02",
            title: "ТРЕНИНГИ И СЕМИНАРЫ",
            description:
              "Камерные пространства для тренингов, мастер-классов и корпоративного обучения с гибкой рассадкой.",
          },
          {
            number: "03",
            title: "ТЕХНИЧЕСКОЕ ОСНАЩЕНИЕ",
            description:
              "Профессиональный звук, свет, LED-экраны и сцена — всё для яркой подачи вашего мероприятия.",
          },
        ],
      },
      gallery: {
        label: "ГАЛЕРЕЯ",
        heading: "Пространство для деловых событий",
      },
      cta: {
        heading: "Ваше событие.",
        headingItalic: "Наше пространство.",
        description:
          "Оставьте заявку — наш менеджер поможет подобрать формат зала и техническое оснащение под ваше мероприятие.",
        primaryLabel: "ЗАБРОНИРОВАТЬ ЗАЛ",
        secondaryLabel: "ИЛИ ПОЗВОНИТЕ НАМ",
      },
    },
    ky: {
      hero: {
        category: "ИШ-ЧАРАЛАР",
        title: "ИШ-ЧАРАЛАР",
        description:
          "Ар кандай масштабдагы иш-чаралар үчүн мейкиндик. Конференциялар, форумдар, тренингдер жана корпоративдик жолугушуулар кесипкөй техникалык жабдуулар менен.",
        imageAlt: "DASMIA конференц-залы — иштиктүү иш-чаралар үчүн мейкиндик",
      },
      intro: {
        label: "БАГЫТ ЖӨНҮНДӨ",
        heading: "Иштиктүү жолугушуу",
        headingItalic: "эл аралык стандарттар деңгээлинде.",
        body: "DASMIA — бул жөн гана банкеттер эмес, ошондой эле иштиктүү иш-чаралар үчүн толук кандуу аянтча. Залдар заманбап үн жана жарык жабдуулары, LED-экрандар жана трансляция системалары менен жабдылган. Биз ар кандай масштабдагы форумдарды, тренингдерди, семинарларды жана корпоративдик жолугушууларды уюштурабыз.",
        details: [
          { label: "СЫЙЫМДУУЛУК", value: "500 катышуучуга чейин" },
          { label: "ЗАЛДАР", value: "Бир нече зал" },
          { label: "ЖАБДУУ", value: "Жарык, үн, экрандар" },
          { label: "ФОРМАТ", value: "Конференция жана тренинг" },
        ],
      },
      featuresSection: {
        label: "МҮМКҮНЧҮЛҮКТӨР",
        heading: "Ар бир максатка ылайык формат",
        features: [
          {
            number: "01",
            title: "КОНФЕРЕНЦИЯ ЖАНА ФОРУМДАР",
            description:
              "Трансляция жана синхрондук котормо мүмкүнчүлүгү бар иштиктүү конференциялар жана форумдар үчүн кеңири залдар.",
          },
          {
            number: "02",
            title: "ТРЕНИНГ ЖАНА СЕМИНАРЛАР",
            description:
              "Ийкемдүү отургузуу менен тренингдер, мастер-класстар жана корпоративдик окутуу үчүн жайлуу мейкиндиктер.",
          },
          {
            number: "03",
            title: "ТЕХНИКАЛЫК ЖАБДУУ",
            description:
              "Кесипкөй үн, жарык, LED-экрандар жана сахна — иш-чараңызды жаркырата өткөрүү үчүн бардыгы.",
          },
        ],
      },
      gallery: {
        label: "ГАЛЕРЕЯ",
        heading: "Иштиктүү иш-чаралар үчүн мейкиндик",
      },
      cta: {
        heading: "Сиздин иш-чараңыз.",
        headingItalic: "Биздин мейкиндик.",
        description:
          "Арыз калтырыңыз — биздин менеджер залдын форматын жана техникалык жабдууну тандап берет.",
        primaryLabel: "ЗАЛДЫ ЭЭЛӨӨ",
        secondaryLabel: "ЖЕ БИЗГЕ ЧАЛЫҢЫЗ",
      },
    },
    en: {
      hero: {
        category: "EVENTS",
        title: "EVENTS",
        description:
          "A venue for business events of any scale. Conferences, forums, trainings, and corporate meetings with professional technical equipment.",
        imageAlt: "DASMIA Conference Hall — space for business events",
      },
      intro: {
        label: "ABOUT DIRECTION",
        heading: "A business meeting",
        headingItalic: "on an international standard.",
        body: "DASMIA is more than banquets and celebrations — it is a full-scale venue for business events. Our halls are equipped with modern sound and lighting systems, LED screens, and broadcast capability. We host forums, trainings, seminars, and corporate meetings of any scale, from an intimate session to a forum for several hundred attendees.",
        details: [
          { label: "CAPACITY", value: "Up to 500 attendees" },
          { label: "HALLS", value: "Multiple halls" },
          { label: "EQUIPMENT", value: "Light, sound, screens" },
          { label: "FORMAT", value: "Conferences & trainings" },
        ],
      },
      featuresSection: {
        label: "CAPABILITIES",
        heading: "A format for every purpose",
        features: [
          {
            number: "01",
            title: "CONFERENCES & FORUMS",
            description:
              "Spacious halls for business conferences and forums with broadcast and simultaneous interpretation capability.",
          },
          {
            number: "02",
            title: "TRAININGS & SEMINARS",
            description:
              "Intimate spaces for trainings, workshops, and corporate learning with flexible seating layouts.",
          },
          {
            number: "03",
            title: "TECHNICAL EQUIPMENT",
            description:
              "Professional sound, lighting, LED screens, and staging — everything to make your event shine.",
          },
        ],
      },
      gallery: {
        label: "GALLERY",
        heading: "Space for Business Events",
      },
      cta: {
        heading: "Your event.",
        headingItalic: "Our venue.",
        description:
          "Submit your request — our manager will help choose the right hall format and technical equipment for your event.",
        primaryLabel: "BOOK A HALL",
        secondaryLabel: "OR CALL US DIRECTLY",
      },
    },
  },
};
