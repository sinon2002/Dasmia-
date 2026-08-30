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
from cms.admin import (
    ContentBlockAdmin,
    DirectionAdmin,
    DirectionGalleryImageAdmin,
    ServiceAdmin,
    NewsAdmin,
    MediaAssetAdmin,
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


class AdminMediaOverviewTests(TestCase):
    def setUp(self):
        from django.contrib.auth import get_user_model
        from django.contrib.admin.sites import site as admin_site

        User = get_user_model()
        self.superuser = User.objects.create_superuser(
            username="admin_tester",
            email="admin@dasmia.kg",
            password="SecureAdminPassword2026!"
        )
        self.client.login(username="admin_tester", password="SecureAdminPassword2026!")

        # Create sample test image in memory
        img_bytes = io.BytesIO()
        test_img = Image.new("RGB", (800, 600), (185, 150, 90))
        test_img.save(img_bytes, format="JPEG")
        img_bytes.seek(0)
        self.test_uploaded = SimpleUploadedFile("banner_overview.jpg", img_bytes.read(), content_type="image/jpeg")

        # Models with and without images
        self.media_asset_with_img = MediaAsset.objects.create(
            title="Главный зал Айкөл Ордо",
            category="banquet",
            description="Банкетная рассадка на 500 гостей",
            image=self.test_uploaded
        )
        self.media_asset_no_img = MediaAsset.objects.create(
            title="Зал без фото",
            category="restaurant",
            description="Текстовое описание без фото"
        )
        self.direction = Direction.objects.create(
            slug="banquets",
            name_ru="Банкетные залы",
            order=1,
            is_active=True
        )
        self.gallery_img = DirectionGalleryImage.objects.create(
            direction=self.direction,
            title="Вид на сцену",
            span="wide",
            order=1
        )
        self.content_block = ContentBlock.objects.create(
            key="overview_hero_title",
            title_ru="Дасмия Комплекс"
        )
        self.news_item = News.objects.create(
            slug="summer-event-2026",
            title_ru="Летний фестиваль",
            content_ru="Подробности фестиваля",
            published_date=timezone.now(),
            is_active=True
        )

        self.media_admin = MediaAssetAdmin(MediaAsset, admin_site)
        self.direction_admin = DirectionAdmin(Direction, admin_site)
        self.gallery_admin = DirectionGalleryImageAdmin(DirectionGalleryImage, admin_site)
        self.content_block_admin = ContentBlockAdmin(ContentBlock, admin_site)
        self.news_admin = NewsAdmin(News, admin_site)

    def test_media_asset_changelist_view_accessible(self):
        url = "/admin/cms/mediaasset/"
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "Медиабиблиотека")
        self.assertContains(response, "Главный зал Айкөл Ордо")
        self.assertContains(response, "Зал без фото")
        self.assertContains(response, "dasmia-admin-list-thumb")

    def test_media_asset_changelist_unauthenticated_redirects(self):
        self.client.logout()
        url = "/admin/cms/mediaasset/"
        response = self.client.get(url)
        self.assertEqual(response.status_code, 302)
        self.assertIn("/admin/login/", response.url)

    def test_media_asset_category_filtering(self):
        url = "/admin/cms/mediaasset/?category=banquet"
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "Главный зал Айкөл Ордо")
        self.assertNotContains(response, "Зал без фото")

    def test_media_asset_search(self):
        url = "/admin/cms/mediaasset/?q=Айкөл"
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "Главный зал Айкөл Ордо")
        self.assertNotContains(response, "Зал без фото")

    def test_media_asset_thumb_preview_method(self):
        # With image
        html_with_img = self.media_admin.thumb_preview(self.media_asset_with_img)
        self.assertIn("class=\"dasmia-admin-list-thumb\"", html_with_img)
        self.assertIn(self.media_asset_with_img.image.url, html_with_img)
        self.assertIn("Главный зал Айкөл Ордо", html_with_img)

        # Without image
        html_no_img = self.media_admin.thumb_preview(self.media_asset_no_img)
        self.assertIn("Нет фото", html_no_img)

    def test_direction_admin_cover_thumb_and_gallery_count(self):
        # Without cover image
        html_no_cover = self.direction_admin.cover_thumb(self.direction)
        self.assertIn("Нет фото", html_no_cover)

        # With cover image
        img_bytes = io.BytesIO()
        test_img = Image.new("RGB", (400, 300), (50, 100, 150))
        test_img.save(img_bytes, format="JPEG")
        img_bytes.seek(0)
        self.direction.cover_image = SimpleUploadedFile("direction_cover.jpg", img_bytes.read(), content_type="image/jpeg")
        self.direction.save()

        html_with_cover = self.direction_admin.cover_thumb(self.direction)
        self.assertIn("class=\"dasmia-admin-list-thumb\"", html_with_cover)
        self.assertIn(self.direction.cover_image.url, html_with_cover)

        # Gallery count check
        count_str = self.direction_admin.gallery_count(self.direction)
        self.assertEqual(count_str, "1 фото")

    def test_direction_changelist_view_accessible(self):
        url = "/admin/cms/direction/"
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "Банкетные залы")
        self.assertContains(response, "1 фото")

    def test_direction_gallery_image_thumb_and_changelist(self):
        # Without image
        html_no_img = self.gallery_admin.image_thumb(self.gallery_img)
        self.assertIn("Нет фото", html_no_img)

        # Changelist view
        url = "/admin/cms/directiongalleryimage/"
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "Вид на сцену")

    def test_content_block_thumb_preview(self):
        html_no_img = self.content_block_admin.thumb_preview(self.content_block)
        self.assertIn("Нет фото", html_no_img)

        url = "/admin/cms/contentblock/"
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "overview_hero_title")

    def test_news_cover_thumb(self):
        html_no_img = self.news_admin.cover_thumb(self.news_item)
        self.assertIn("Нет фото", html_no_img)

        url = "/admin/cms/news/"
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "Летний фестиваль")


class AdminImageEditorWidgetTests(TestCase):
    def test_widget_media_includes_cropper_and_editor_assets(self):
        from cms.widgets import AdminImageEditorWidget
        widget = AdminImageEditorWidget()
        rendered_media = str(widget.media)

        self.assertIn("cropper.min.css", rendered_media)
        self.assertIn("image_editor.css", rendered_media)
        self.assertIn("cropper.min.js", rendered_media)
        self.assertIn("image_editor.js", rendered_media)

    def test_widget_render_without_initial_value(self):
        from cms.widgets import AdminImageEditorWidget
        widget = AdminImageEditorWidget()
        rendered_html = widget.render(name="test_image_field", value=None)

        self.assertIn("dasmia-image-widget", rendered_html)
        self.assertIn("dasmia-image-preview-box", rendered_html)
        self.assertIn("Выбрать фото", rendered_html)
        self.assertIn("Нет файла", rendered_html)
        self.assertIn("display:none;", rendered_html)  # Crop & edit buttons hidden initially

    def test_widget_render_with_existing_image(self):
        from cms.widgets import AdminImageEditorWidget
        from cms.models import ContentBlock

        img_bytes = io.BytesIO()
        test_img = Image.new("RGB", (400, 300), (100, 200, 100))
        test_img.save(img_bytes, format="JPEG")
        img_bytes.seek(0)
        uploaded = SimpleUploadedFile("widget_test.jpg", img_bytes.read(), content_type="image/jpeg")

        block = ContentBlock.objects.create(
            key="widget_test_block",
            title_ru="Блок для теста виджета",
            image=uploaded
        )

        widget = AdminImageEditorWidget()
        rendered_html = widget.render(name="image", value=block.image)

        self.assertIn("dasmia-image-widget", rendered_html)
        self.assertIn(block.image.url, rendered_html)
        self.assertIn("Заменить", rendered_html)
        self.assertIn("Редактировать / Кадрировать", rendered_html)
        self.assertIn("Удалить", rendered_html)
        self.assertIn("Загружено", rendered_html)

