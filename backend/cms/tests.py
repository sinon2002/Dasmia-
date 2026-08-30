import io
from django.test import TestCase
from django.utils import timezone
from django.core.files.uploadedfile import SimpleUploadedFile
from PIL import Image

from cms.models import (
    ContentBlock,
    Direction,
    DirectionGalleryImage,
    Service,
    News,
    MediaAsset,
)
from cms.utils import process_and_optimize_image


class ContentBlockModelTests(TestCase):
    def test_create_and_str(self):
        block = ContentBlock.objects.create(
            key="hero_main_tagline",
            title_ru="Один комплекс. Множество возможностей.",
            title_ky="Бир комплекс. Көптөгөн мүмкүнчүлүктөр.",
            title_en="One complex. Endless possibilities.",
            content_ru="Главный баннер комплекса Дасмия."
        )
        self.assertEqual(str(block), "hero_main_tagline")
        self.assertEqual(block.title_ru, "Один комплекс. Множество возможностей.")
        self.assertEqual(block.title_en, "One complex. Endless possibilities.")


class DirectionModelTests(TestCase):
    def test_create_direction_and_ordering(self):
        d1 = Direction.objects.create(
            slug="banquets",
            name_ru="Банкетные залы",
            order=1,
            is_active=True
        )
        d2 = Direction.objects.create(
            slug="restaurant",
            name_ru="Ресторан",
            order=2,
            is_active=True
        )
        self.assertEqual(str(d1), "Банкетные залы")
        directions = list(Direction.objects.filter(is_active=True))
        self.assertEqual(directions[0].slug, "banquets")
        self.assertEqual(directions[1].slug, "restaurant")


class DirectionGalleryImageModelTests(TestCase):
    def test_gallery_image_creation_and_span_choices(self):
        direction = Direction.objects.create(
            slug="spa-wellness",
            name_ru="SPA Комплекс",
            order=1
        )
        img = DirectionGalleryImage.objects.create(
            direction=direction,
            title="Бассейн и хаммам",
            span="wide",
            order=1
        )
        self.assertIn("SPA Комплекс", str(img))
        self.assertIn("Бассейн и хаммам", str(img))
        self.assertEqual(img.span, "wide")


class ServiceModelTests(TestCase):
    def test_create_service_with_price(self):
        direction = Direction.objects.create(
            slug="fitness-club",
            name_ru="Фитнес Клуб"
        )
        service = Service.objects.create(
            direction=direction,
            name_ru="Годовой абонемент VIP",
            name_en="Annual VIP Membership",
            price=45000.00,
            price_currency="KGS"
        )
        self.assertEqual(str(service), "Годовой абонемент VIP (Фитнес Клуб)")
        self.assertEqual(service.price_currency, "KGS")


class NewsModelTests(TestCase):
    def test_create_news_ordering(self):
        now = timezone.now()
        n1 = News.objects.create(
            slug="news-old",
            title_ru="Старая новость",
            content_ru="Текст старой новости",
            published_date=now - timezone.timedelta(days=10)
        )
        n2 = News.objects.create(
            slug="news-new",
            title_ru="Свежая новость",
            content_ru="Текст новой новости",
            published_date=now
        )
        news_list = list(News.objects.all())
        self.assertEqual(news_list[0].slug, "news-new")
        self.assertEqual(str(n2), "Свежая новость")


class MediaAssetModelTests(TestCase):
    def test_media_asset_category(self):
        asset = MediaAsset.objects.create(
            title="Интерьер Хан-Тенир",
            category="banquet",
            description="Банкетный зал на 1000 персон"
        )
        self.assertIn("Интерьер Хан-Тенир", str(asset))
        self.assertIn("Банкеты", str(asset))


class ImageOptimizationUtilityTests(TestCase):
    def _create_test_image(self, width=2000, height=2000, color=(200, 150, 50), mode="RGB"):
        file_obj = io.BytesIO()
        image = Image.new(mode, (width, height), color)
        image.save(file_obj, format="JPEG" if mode == "RGB" else "PNG")
        file_obj.seek(0)
        return file_obj

    def test_model_image_save_triggers_optimization(self):
        image_stream = self._create_test_image(width=2200, height=1800)
        uploaded = SimpleUploadedFile("hero_photo.jpg", image_stream.read(), content_type="image/jpeg")

        block = ContentBlock.objects.create(
            key="test_optimized_block",
            title_ru="Тестовый блок",
            image=uploaded
        )
        self.assertTrue(block.image.name.endswith(".webp"))
        self.assertTrue(block.image.width <= 2560)

    def test_process_and_optimize_image_none_gracefully_handles(self):
        process_and_optimize_image(None)
        
        class Dummy:
            file = None
        process_and_optimize_image(Dummy())
