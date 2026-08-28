from modeltranslation.translator import register, TranslationOptions
from .models import ContentBlock, Direction, Service, News, DirectionGalleryImage, MediaAsset

@register(ContentBlock)
class ContentBlockTranslationOptions(TranslationOptions):
    fields = ('title', 'content',)

@register(Direction)
class DirectionTranslationOptions(TranslationOptions):
    fields = ('name', 'description',)

@register(Service)
class ServiceTranslationOptions(TranslationOptions):
    fields = ('name', 'description',)

@register(News)
class NewsTranslationOptions(TranslationOptions):
    fields = ('title', 'summary', 'content',)

@register(DirectionGalleryImage)
class DirectionGalleryImageTranslationOptions(TranslationOptions):
    fields = ('title',)

@register(MediaAsset)
class MediaAssetTranslationOptions(TranslationOptions):
    fields = ('title', 'description',)
