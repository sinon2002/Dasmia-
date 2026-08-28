from django.contrib import admin
from django.db import models
from django.utils.html import mark_safe
from modeltranslation.admin import TranslationAdmin, TranslationTabularInline
from .models import ContentBlock, Direction, Service, News, DirectionGalleryImage, MediaAsset
from .widgets import AdminImageEditorWidget

@admin.register(ContentBlock)
class ContentBlockAdmin(TranslationAdmin):
    list_display = ('thumb_preview', 'key', 'title', 'updated_at')
    list_display_links = ('thumb_preview', 'key', 'title')
    search_fields = ('key', 'title', 'content')
    formfield_overrides = {
        models.ImageField: {'widget': AdminImageEditorWidget},
    }

    def thumb_preview(self, obj):
        if obj.image:
            return mark_safe(f'<img src="{obj.image.url}" class="dasmia-admin-list-thumb" alt="{obj.title or obj.key}" />')
        return mark_safe('<span style="color:#666;font-size:11px;">Нет фото</span>')
    thumb_preview.short_description = "Превью"


class DirectionGalleryImageInline(TranslationTabularInline):
    model = DirectionGalleryImage
    extra = 1
    fields = ('image', 'title', 'span', 'order', 'is_active')
    formfield_overrides = {
        models.ImageField: {'widget': AdminImageEditorWidget},
    }


@admin.register(Direction)
class DirectionAdmin(TranslationAdmin):
    list_display = ('cover_thumb', 'name', 'slug', 'is_active', 'order', 'gallery_count')
    list_display_links = ('cover_thumb', 'name')
    list_editable = ('is_active', 'order')
    search_fields = ('name', 'description')
    prepopulated_fields = {'slug': ('name',)}
    inlines = [DirectionGalleryImageInline]
    formfield_overrides = {
        models.ImageField: {'widget': AdminImageEditorWidget},
    }

    def cover_thumb(self, obj):
        if obj.cover_image:
            return mark_safe(f'<img src="{obj.cover_image.url}" class="dasmia-admin-list-thumb" alt="{obj.name}" />')
        return mark_safe('<span style="color:#666;font-size:11px;">Нет фото</span>')
    cover_thumb.short_description = "Обложка"

    def gallery_count(self, obj):
        count = obj.gallery_images.count()
        return f"{count} фото"
    gallery_count.short_description = "Галерея"


@admin.register(DirectionGalleryImage)
class DirectionGalleryImageAdmin(TranslationAdmin):
    list_display = ('image_thumb', 'direction', 'title', 'span', 'order', 'is_active')
    list_display_links = ('image_thumb', 'direction')
    list_filter = ('direction', 'span', 'is_active')
    list_editable = ('order', 'is_active')
    search_fields = ('title', 'direction__name')
    formfield_overrides = {
        models.ImageField: {'widget': AdminImageEditorWidget},
    }

    def image_thumb(self, obj):
        if obj.image:
            return mark_safe(f'<img src="{obj.image.url}" class="dasmia-admin-list-thumb" alt="{obj.title or ""}" />')
        return mark_safe('<span style="color:#666;font-size:11px;">Нет фото</span>')
    image_thumb.short_description = "Превью"


@admin.register(Service)
class ServiceAdmin(TranslationAdmin):
    list_display = ('name', 'direction', 'price', 'price_currency')
    list_filter = ('direction',)
    search_fields = ('name', 'description')


@admin.register(News)
class NewsAdmin(TranslationAdmin):
    list_display = ('cover_thumb', 'title', 'published_date', 'is_active')
    list_display_links = ('cover_thumb', 'title')
    list_editable = ('is_active',)
    list_filter = ('is_active', 'published_date')
    search_fields = ('title', 'summary', 'content')
    prepopulated_fields = {'slug': ('title',)}
    formfield_overrides = {
        models.ImageField: {'widget': AdminImageEditorWidget},
    }

    def cover_thumb(self, obj):
        if obj.cover_image:
            return mark_safe(f'<img src="{obj.cover_image.url}" class="dasmia-admin-list-thumb" alt="{obj.title}" />')
        return mark_safe('<span style="color:#666;font-size:11px;">Нет фото</span>')
    cover_thumb.short_description = "Обложка"


@admin.register(MediaAsset)
class MediaAssetAdmin(TranslationAdmin):
    list_display = ('thumb_preview', 'title', 'category', 'created_at')
    list_display_links = ('thumb_preview', 'title')
    list_filter = ('category', 'created_at')
    search_fields = ('title', 'description')
    formfield_overrides = {
        models.ImageField: {'widget': AdminImageEditorWidget},
    }

    def thumb_preview(self, obj):
        if obj.image:
            return mark_safe(f'<img src="{obj.image.url}" class="dasmia-admin-list-thumb" alt="{obj.title}" />')
        return mark_safe('<span style="color:#666;font-size:11px;">Нет фото</span>')
    thumb_preview.short_description = "Изображение"
