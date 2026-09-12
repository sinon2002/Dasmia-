from django.contrib import admin
from django.db import models
from django.utils.html import mark_safe, escape
from modeltranslation.admin import TranslationAdmin, TranslationTabularInline
# from modeltranslation.translator import register, TranslationOptions
from .models import ContentBlock, Direction, Service, News, DirectionGalleryImage, MediaAsset, SiteTranslation
from .widgets import AdminImageEditorWidget

ADMIN_MEDIA_CSS = {
    'all': (
        'cms/css/cropper.min.css',
        'cms/css/image_editor.css',
        'core/css/admin_adaptive.css',
    )
}

ADMIN_MEDIA_JS = (
    'cms/js/cropper.min.js',
    'cms/js/image_editor.js',
    'core/js/admin_adaptive.js',
)


def get_admin_thumb_url(image_field, obj=None):
    """Returns image URL with timestamp cache-buster query parameter to bypass browser caching."""
    if not image_field or not getattr(image_field, 'name', None):
        return ""
    try:
        url = image_field.url
    except Exception:
        return ""
    ts = None
    if obj:
        for attr in ('updated_at', 'published_date', 'created_at'):
            val = getattr(obj, attr, None)
            if val and hasattr(val, 'timestamp'):
                ts = int(val.timestamp())
                break
    if not ts and hasattr(image_field, 'storage') and image_field.name:
        try:
            ts = int(image_field.storage.get_modified_time(image_field.name).timestamp())
        except Exception:
            pass
    return f"{url}?v={ts}" if ts else url


@admin.register(ContentBlock)
class ContentBlockAdmin(admin.ModelAdmin):
    list_display = ('thumb_preview', 'key', 'title', 'updated_at')
    list_display_links = ('thumb_preview', 'key', 'title')
    search_fields = ('key', 'title', 'content')
    formfield_overrides = {
        models.ImageField: {'widget': AdminImageEditorWidget},
    }

    class Media:
        css = ADMIN_MEDIA_CSS
        js = ADMIN_MEDIA_JS

    def thumb_preview(self, obj):
        if obj.image:
            thumb_url = get_admin_thumb_url(obj.image, obj)
            full_url = obj.image.url if hasattr(obj.image, 'url') else thumb_url
            return mark_safe(
                f'<a href="{full_url}" target="_blank" title="Открыть оригинал">'
                f'<img src="{thumb_url}" class="dasmia-admin-list-thumb" '
                f'onerror="this.onerror=null;this.src=\'/media/no_image.png\';" loading="lazy" '
                f'style="width:50px;height:50px;object-fit:cover;border-radius:6px;border:1px solid rgba(185,150,90,0.4);display:block;" '
                f'alt="{escape(obj.title or obj.key)}" /></a>'
            )
        return mark_safe('<span style="color:#777;font-size:11px;">Нет фото</span>')
    thumb_preview.short_description = "Превью"

@admin.register(SiteTranslation)
class SiteTranslationOptions(TranslationAdmin):
    list_display = ('key', 'text')
    search_fields = ('key',)

class DirectionGalleryImageInline(admin.TabularInline):
    model = DirectionGalleryImage
    extra = 1
    fields = ('preview_thumb', 'image', 'title', 'span', 'order', 'is_active')
    readonly_fields = ('preview_thumb',)
    formfield_overrides = {
        models.ImageField: {'widget': AdminImageEditorWidget},
    }

    def preview_thumb(self, obj):
        if obj.image:
            thumb_url = get_admin_thumb_url(obj.image, obj)
            full_url = obj.image.url if hasattr(obj.image, 'url') else thumb_url
            return mark_safe(
                f'<a href="{full_url}" target="_blank">'
                f'<img src="{thumb_url}" class="dasmia-admin-list-thumb" '
                f'onerror="this.onerror=null;this.src=\'/media/no_image.png\';" loading="lazy" '
                f'style="width:48px;height:48px;object-fit:cover;border-radius:4px;border:1px solid rgba(185,150,90,0.4);" /></a>'
            )
        return mark_safe('<span style="color:#777;font-size:11px;">—</span>')
    preview_thumb.short_description = "Миниатюра"


@admin.register(Direction)
class DirectionAdmin(admin.ModelAdmin):
    list_display = ('cover_thumb', 'name', 'slug', 'is_active', 'order', 'gallery_count')
    list_display_links = ('cover_thumb', 'name')
    list_editable = ('is_active', 'order')
    search_fields = ('name', 'description')
    prepopulated_fields = {'slug': ('name',)}
    inlines = [DirectionGalleryImageInline]
    formfield_overrides = {
        models.ImageField: {'widget': AdminImageEditorWidget},
    }

    class Media:
        css = ADMIN_MEDIA_CSS
        js = ADMIN_MEDIA_JS

    def cover_thumb(self, obj):
        if obj.cover_image:
            thumb_url = get_admin_thumb_url(obj.cover_image, obj)
            full_url = obj.cover_image.url if hasattr(obj.cover_image, 'url') else thumb_url
            return mark_safe(
                f'<a href="{full_url}" target="_blank" title="Открыть оригинал">'
                f'<img src="{thumb_url}" class="dasmia-admin-list-thumb" '
                f'onerror="this.onerror=null;this.src=\'/media/no_image.png\';" loading="lazy" '
                f'style="width:50px;height:50px;object-fit:cover;border-radius:6px;border:1px solid rgba(185,150,90,0.4);display:block;" '
                f'alt="{escape(obj.name)}" /></a>'
            )
        return mark_safe('<span style="color:#777;font-size:11px;">Нет фото</span>')
    cover_thumb.short_description = "Обложка"

    def gallery_count(self, obj):
        count = obj.gallery_images.count()
        return f"{count} фото"
    gallery_count.short_description = "Галерея"


@admin.register(DirectionGalleryImage)
class DirectionGalleryImageAdmin(admin.ModelAdmin):
    list_display = ('image_thumb', 'direction', 'title', 'span', 'order', 'is_active')
    list_display_links = ('image_thumb', 'direction')
    list_filter = ('direction', 'span', 'is_active')
    list_editable = ('order', 'is_active')
    search_fields = ('title', 'direction__name')
    formfield_overrides = {
        models.ImageField: {'widget': AdminImageEditorWidget},
    }

    class Media:
        css = ADMIN_MEDIA_CSS
        js = ADMIN_MEDIA_JS

    def image_thumb(self, obj):
        if obj.image:
            thumb_url = get_admin_thumb_url(obj.image, obj)
            full_url = obj.image.url if hasattr(obj.image, 'url') else thumb_url
            return mark_safe(
                f'<a href="{full_url}" target="_blank" title="Открыть оригинал">'
                f'<img src="{thumb_url}" class="dasmia-admin-list-thumb" '
                f'onerror="this.onerror=null;this.src=\'/media/no_image.png\';" loading="lazy" '
                f'style="width:50px;height:50px;object-fit:cover;border-radius:6px;border:1px solid rgba(185,150,90,0.4);display:block;" '
                f'alt="{escape(obj.title or "")}" /></a>'
            )
        return mark_safe('<span style="color:#777;font-size:11px;">Нет фото</span>')
    image_thumb.short_description = "Превью"


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ('name', 'direction', 'price', 'price_currency')
    list_filter = ('direction',)
    search_fields = ('name', 'description')


@admin.register(News)
class NewsAdmin(admin.ModelAdmin):
    list_display = ('cover_thumb', 'title', 'published_date', 'is_active')
    list_display_links = ('cover_thumb', 'title')
    list_editable = ('is_active',)
    list_filter = ('is_active', 'published_date')
    search_fields = ('title', 'summary', 'content')
    prepopulated_fields = {'slug': ('title',)}
    formfield_overrides = {
        models.ImageField: {'widget': AdminImageEditorWidget},
    }

    class Media:
        css = ADMIN_MEDIA_CSS
        js = ADMIN_MEDIA_JS

    def cover_thumb(self, obj):
        if obj.cover_image:
            thumb_url = get_admin_thumb_url(obj.cover_image, obj)
            full_url = obj.cover_image.url if hasattr(obj.cover_image, 'url') else thumb_url
            return mark_safe(
                f'<a href="{full_url}" target="_blank" title="Открыть оригинал">'
                f'<img src="{thumb_url}" class="dasmia-admin-list-thumb" '
                f'onerror="this.onerror=null;this.src=\'/media/no_image.png\';" loading="lazy" '
                f'style="width:50px;height:50px;object-fit:cover;border-radius:6px;border:1px solid rgba(185,150,90,0.4);display:block;" '
                f'alt="{escape(obj.title)}" /></a>'
            )
        return mark_safe('<span style="color:#777;font-size:11px;">Нет фото</span>')
    cover_thumb.short_description = "Обложка"


@admin.register(MediaAsset)
class MediaAssetAdmin(admin.ModelAdmin):
    list_display = ('thumb_preview', 'title', 'category_badge', 'file_name_display', 'created_at')
    list_display_links = ('thumb_preview', 'title')
    list_filter = ('category', 'created_at')
    search_fields = ('title', 'description', 'image')
    list_per_page = 50
    formfield_overrides = {
        models.ImageField: {'widget': AdminImageEditorWidget},
    }

    class Media:
        css = ADMIN_MEDIA_CSS
        js = ADMIN_MEDIA_JS

    def thumb_preview(self, obj):
        if obj.image:
            thumb_url = get_admin_thumb_url(obj.image, obj)
            full_url = obj.image.url if hasattr(obj.image, 'url') else thumb_url
            return mark_safe(
                f'<a href="{full_url}" target="_blank" title="Открыть в полном размере">'
                f'<img src="{thumb_url}" class="dasmia-admin-list-thumb" '
                f'onerror="this.onerror=null;this.src=\'/media/no_image.png\';" loading="lazy" '
                f'style="width:52px;height:52px;object-fit:cover;border-radius:6px;border:1px solid rgba(185,150,90,0.4);display:block;" '
                f'alt="{escape(obj.title)}" /></a>'
            )
        return mark_safe('<span style="color:#777;font-size:11px;">Нет фото</span>')
    thumb_preview.short_description = "Фото"

    def category_badge(self, obj):
        cat_class = f"dasmia-cat-{obj.category}"
        cat_name = obj.get_category_display()
        return mark_safe(f'<span class="dasmia-cat-badge {cat_class}">{escape(cat_name)}</span>')
    category_badge.short_description = "Категория"

    def file_name_display(self, obj):
        if obj.image:
            name = obj.image.name.split('/')[-1]
            return mark_safe(f'<code style="font-size:11px;color:#bbb;background:rgba(255,255,255,0.05);padding:2px 6px;border-radius:3px;">{escape(name)}</code>')
        return "—"
    file_name_display.short_description = "Имя файла"
