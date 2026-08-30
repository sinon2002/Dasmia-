import os
from pathlib import Path
from django.core.management.base import BaseCommand
from django.core.files import File
from django.utils import timezone
from django.conf import settings

from cms.models import (
    MediaAsset,
    Direction,
    DirectionGalleryImage,
    ContentBlock,
    News,
    Service,
)

class Command(BaseCommand):
    help = 'Populates the CMS Media Library, Directions, Galleries, and Content Blocks with DASMIA photos.'

    def handle(self, *args, **options):
        self.stdout.write(self.style.NOTICE("🚀 Starting DASMIA Media Library Seeding..."))

        base_dir = Path(settings.BASE_DIR)
        images_dir = base_dir.parent / "public" / "assets" / "images"

        if not images_dir.exists():
            self.stderr.write(self.style.ERROR(f"❌ Images directory not found: {images_dir}"))
            return

        def get_file(filename):
            path = images_dir / filename
            if path.exists():
                return File(open(path, "rb"), name=filename)
            return None

        # 1. Seed Media Assets Library
        media_items = [
            # Banquet
            {"title": "Банкетный зал Хан-Тенир — Главный вид", "cat": "banquet", "file": "IMG_8902.webp", "desc": "Величественный зал для торжеств до 1000 гостей"},
            {"title": "Банкетный зал Айкөл Ордо — Панорама", "cat": "banquet", "file": "IMG_8911.webp", "desc": "Премиальный интерьер с национальными мотивами"},
            {"title": "Сервировка праздничного стола", "cat": "banquet", "file": "IMG_8920.webp", "desc": "Изысканный текстиль и фарфоровая посуда"},
            {"title": "Президиум и сцена для торжеств", "cat": "banquet", "file": "IMG_8929.webp", "desc": "Профессиональное сценическое освещение и декор"},
            {"title": "Фуршетная зона и парадное фойе", "cat": "banquet", "file": "IMG_8936.webp", "desc": "Встреча гостей и welcome-drink зона"},

            # Restaurant
            {"title": "Ресторан DASMIA — Основной зал", "cat": "restaurant", "file": "IMG_8995.webp", "desc": "Авторская кухня и уютная атмосфера"},
            {"title": "Ресторан — Сервировка столов", "cat": "restaurant", "file": "IMG_8997.webp", "desc": "Элегантная подача блюд европейской кухни"},
            {"title": "Уютные места у панорамных окон", "cat": "restaurant", "file": "IMG_9000.webp", "desc": "Идеально для романтических ужинов"},
            {"title": "VIP-кабинет ресторана", "cat": "restaurant", "file": "IMG_9002.webp", "desc": "Приватное пространство для деловых встреч"},

            # Chaikhana
            {"title": "Чайхана — Традиционный топчан", "cat": "chaikhana", "file": "IMG_9005.webp", "desc": "Уютное восточное убранство и мягкие подушки"},
            {"title": "Чайная церемония и самовар", "cat": "chaikhana", "file": "IMG_9007.webp", "desc": "Аутентичный чай с горными травами"},
            {"title": "Восточный интерьер с узорами", "cat": "chaikhana", "file": "IMG_9009.webp", "desc": "Резное дерево и национальные ковры"},

            # Ethno
            {"title": "Этно-село — Юрточный городок", "cat": "ethno", "file": "IMG_9018.webp", "desc": "Аутентичный кыргызский аил в сердце Бишкека"},
            {"title": "Интерьер ханской юрты", "cat": "ethno", "file": "IMG_9027.webp", "desc": "Традиционные шырдаки и туш-кийизы ручной работы"},

            # Pools
            {"title": "Аквазона — Главный бассейн 25м", "cat": "pools", "file": "IMG_9031.webp", "desc": "Кристально чистая вода с современной системой фильтрации"},
            {"title": "Зона шезлонгов и релаксации", "cat": "pools", "file": "IMG_9049.webp", "desc": "Комфортный отдых у воды круглый год"},

            # SPA
            {"title": "SPA комплекс — Турецкий хаммам", "cat": "spa", "file": "IMG_2160.webp", "desc": "Мраморные лежаки и парная для восстановления сил"},
            {"title": "Массажные кабинеты и зона отдыха", "cat": "spa", "file": "IMG_2161.webp", "desc": "Профессиональные программы релаксации и ухода"},

            # Fitness
            {"title": "Фитнес-клуб — Кардио и сайклинг", "cat": "fitness", "file": "fitness-hero-spin.webp", "desc": "Высокоинтенсивные тренировки в сайкл-студии"},
            {"title": "Тренажёрный зал и зона свободных весов", "cat": "fitness", "file": "fitness-weights-room.webp", "desc": "Премиальное силовое оборудование ведущих брендов"},
            {"title": "Команда персональных тренеров", "cat": "fitness", "file": "fitness-trainers-team.webp", "desc": "Сертифицированные инструкторы и наставники"},
            {"title": "Сайкл студия для групповых тренировок", "cat": "fitness", "file": "fitness-spin-couple.webp", "desc": "Энергичные тренировки под ритмичную музыку"},
            {"title": "Зона функционального тренинга", "cat": "fitness", "file": "fitness-woman-dumbbells.webp", "desc": "Индивидуальные программы под любые цели"},

            # General
            {"title": "Фирменный логотип комплекса DASMIA", "cat": "general", "file": "dasmia-logo.png", "desc": "Официальный логотип холдинга DASMIA"},
            {"title": "Кыргызский национальный орнамент (синий)", "cat": "general", "file": "ornament-kyrgyz-blue.webp", "desc": "Традиционный декоративный элемент"},
            {"title": "Кыргызский национальный орнамент (красный)", "cat": "general", "file": "ornament-kyrgyz-red.webp", "desc": "Традиционный декоративный элемент"},
        ]

        # Clear existing media assets to avoid duplicates or add if missing
        created_assets = 0
        for item in media_items:
            f = get_file(item["file"])
            if not f:
                continue
            asset, created = MediaAsset.objects.get_or_select = MediaAsset.objects.get_or_create(
                title=item["title"],
                defaults={
                    "category": item["cat"],
                    "description": item["desc"],
                    "image": f,
                }
            )
            if created:
                created_assets += 1
            else:
                if not asset.image:
                    asset.image = f
                    asset.save()

        self.stdout.write(self.style.SUCCESS(f"✅ Created/Verified {len(media_items)} MediaAsset items in Media Library!"))

        # 2. Seed Directions and Bento Grid Galleries
        directions_data = [
            {
                "slug": "banquet",
                "name_ru": "Банкетные залы",
                "name_ky": "Банкеттик залдар",
                "name_en": "Banquet Halls",
                "desc": "Пространство для событий, которые хочется запомнить. Три зала для свадеб, юбилеев и корпоративных торжеств.",
                "cover": "IMG_8902.webp",
                "order": 1,
                "gallery": [
                    {"file": "IMG_8911.webp", "title": "Айкөл Ордо — панорамный вид", "span": "wide", "order": 1},
                    {"file": "IMG_8920.webp", "title": "Сервировка стола", "span": "normal", "order": 2},
                    {"file": "IMG_8929.webp", "title": "Президиум и сцена", "span": "tall", "order": 3},
                    {"file": "IMG_8936.webp", "title": "Фуршетная зона", "span": "normal", "order": 4},
                ]
            },
            {
                "slug": "restaurant",
                "name_ru": "Ресторан",
                "name_ky": "Ресторан",
                "name_en": "Restaurant",
                "desc": "Авторская кухня, объединяющая традиции Востока и современные гастрономические тенденции.",
                "cover": "IMG_8995.webp",
                "order": 2,
                "gallery": [
                    {"file": "IMG_8997.webp", "title": "Изысканная сервировка", "span": "wide", "order": 1},
                    {"file": "IMG_9000.webp", "title": "Панорамные окна", "span": "normal", "order": 2},
                    {"file": "IMG_9002.webp", "title": "VIP-зал", "span": "normal", "order": 3},
                ]
            },
            {
                "slug": "chaikhana",
                "name_ru": "Чайхана",
                "name_ky": "Чайкана",
                "name_en": "Chaikhana",
                "desc": "Место, где время замедляется. Традиции восточного чаепития и аутентичная кухня.",
                "cover": "IMG_9005.webp",
                "order": 3,
                "gallery": [
                    {"file": "IMG_9007.webp", "title": "Чайная церемония", "span": "wide", "order": 1},
                    {"file": "IMG_9009.webp", "title": "Восточные орнаменты", "span": "normal", "order": 2},
                ]
            },
            {
                "slug": "ethno-village",
                "name_ru": "Этно-село",
                "name_ky": "Этно-айыл",
                "name_en": "Ethno Village",
                "desc": "Аутентичный этно-комплекс с юртами и погружением в кыргызскую кочевую культуру.",
                "cover": "IMG_9018.webp",
                "order": 4,
                "gallery": [
                    {"file": "IMG_9027.webp", "title": "Убранство юрты", "span": "wide", "order": 1},
                ]
            },
            {
                "slug": "pools",
                "name_ru": "Бассейны",
                "name_ky": "Бассейндер",
                "name_en": "Pools & Aqua",
                "desc": "25-метровый бассейн, детская зона и пространство для водного релакса.",
                "cover": "IMG_9031.webp",
                "order": 5,
                "gallery": [
                    {"file": "IMG_9049.webp", "title": "Зона шезлонгов", "span": "wide", "order": 1},
                ]
            },
            {
                "slug": "spa",
                "name_ru": "SPA & Оздоровление",
                "name_ky": "SPA & Ден соолук",
                "name_en": "SPA & Wellness",
                "desc": "Турецкий хаммам, финская сауна, массаж и комплексные спа-программы.",
                "cover": "IMG_2160.webp",
                "order": 6,
                "gallery": [
                    {"file": "IMG_2161.webp", "title": "Зона хаммама и массажа", "span": "wide", "order": 1},
                ]
            },
            {
                "slug": "fitness",
                "name_ru": "Фитнес-клуб",
                "name_ky": "Фитнес-клуб",
                "name_en": "Fitness Club",
                "desc": "Премиальное оборудование, сайклинг-студия и сертифицированный тренерский штаб.",
                "cover": "fitness-hero-spin.webp",
                "order": 7,
                "gallery": [
                    {"file": "fitness-weights-room.webp", "title": "Силовая зона", "span": "wide", "order": 1},
                    {"file": "fitness-trainers-team.webp", "title": "Команда тренеров", "span": "normal", "order": 2},
                    {"file": "fitness-woman-dumbbells.webp", "title": "Функциональный тренинг", "span": "normal", "order": 3},
                ]
            },
        ]

        for d_info in directions_data:
            cov = get_file(d_info["cover"])
            direction, _ = Direction.objects.get_or_create(
                slug=d_info["slug"],
                defaults={
                    "name_ru": d_info["name_ru"],
                    "name_ky": d_info["name_ky"],
                    "name_en": d_info["name_en"],
                    "description": d_info["desc"],
                    "order": d_info["order"],
                    "is_active": True,
                }
            )
            if cov and not direction.cover_image:
                direction.cover_image = cov
                direction.save()

            # Seed gallery images
            for g_item in d_info.get("gallery", []):
                g_file = get_file(g_item["file"])
                if g_file:
                    DirectionGalleryImage.objects.get_or_create(
                        direction=direction,
                        title=g_item["title"],
                        defaults={
                            "image": g_file,
                            "span": g_item["span"],
                            "order": g_item["order"],
                            "is_active": True,
                        }
                    )

        self.stdout.write(self.style.SUCCESS(f"✅ Created/Verified {len(directions_data)} Directions with Bento Galleries!"))

        # 3. Seed Content Blocks with images
        content_blocks = [
            {
                "key": "home_hero_banner",
                "title_ru": "DASMIA — Один комплекс. Множество возможностей.",
                "title_ky": "DASMIA — Бир комплекс. Көптөгөн мүмкүнчүлүктөр.",
                "title_en": "DASMIA — One complex. Endless possibilities.",
                "content_ru": "Флагманский культурно-развлекательный и оздоровительный комплекс Кыргызстана.",
                "file": "IMG_8902.webp"
            },
            {
                "key": "home_atmosphere_block",
                "title_ru": "Атмосфера восточного гостеприимства",
                "title_ky": "Чыгыш меймандостугунун маанайы",
                "title_en": "Atmosphere of Oriental Hospitality",
                "content_ru": "Погрузитесь в гармонию традиций и современного комфорта.",
                "file": "IMG_9005.webp"
            }
        ]

        for b in content_blocks:
            bf = get_file(b["file"])
            ContentBlock.objects.get_or_create(
                key=b["key"],
                defaults={
                    "title_ru": b["title_ru"],
                    "title_ky": b["title_ky"],
                    "title_en": b["title_en"],
                    "content_ru": b["content_ru"],
                    "image": bf,
                }
            )

        # 4. Seed News with images
        news_items = [
            {
                "slug": "grand-opening-season-2026",
                "title_ru": "Открытие сезона торжеств и свадеб 2026 в DASMIA",
                "title_ky": "DASMIAда 2026-жылдагы салтанаттар жана тойлор сезонунун ачылышы",
                "title_en": "Grand Opening of the 2026 Wedding & Celebration Season at DASMIA",
                "summary": "Бронирование банкетных залов Хан-Тенир и Айкөл Ордо уже открыто со специальными условиями.",
                "content": "Комплекс DASMIA объявляет о старте бронирования дат на сезон 2026...",
                "file": "IMG_8911.webp"
            },
            {
                "slug": "fitness-new-programs-2026",
                "title_ru": "Новые групповые программы и сайклинг в фитнес-клубе DASMIA",
                "title_ky": "DASMIA фитнес-клубунда жаңы топтук программалар жана сайклинг",
                "title_en": "New Group Training Programs and Cycling Studio at DASMIA Fitness",
                "summary": "Обновленное расписание тренировок и расширение тренерского состава.",
                "content": "Фитнес-клуб DASMIA представляет обновленную линейку групповых программ...",
                "file": "fitness-hero-spin.webp"
            }
        ]

        for n in news_items:
            nf = get_file(n["file"])
            News.objects.get_or_create(
                slug=n["slug"],
                defaults={
                    "title_ru": n["title_ru"],
                    "title_ky": n["title_ky"],
                    "title_en": n["title_en"],
                    "summary": n["summary"],
                    "content": n["content"],
                    "published_date": timezone.now(),
                    "cover_image": nf,
                    "is_active": True,
                }
            )

        self.stdout.write(self.style.SUCCESS("🎉 Seeding completed successfully! All images and CMS data are ready."))
