from modeltranslation.translator import register, TranslationOptions
from .models import SiteTranslation

@register(SiteTranslation)
class SiteTranslationOptions(TranslationOptions):
        fields = ('text',)
        
# @register(ContentBlock)
# class ContentBlockTranslationOptions(TranslationOptions):
#         fields = ('title','content')
                 
# @register(Direction)
# class DirectionTranslationOptions(TranslationOptions):
#         fields = ('name','description',)
 
# @register(Service)
# class ServiceTranslationOptions(TranslationOptions):
#         fields = ('name','price','price_currency',)
 
# @register(News)
# class NewsTranslationOptions(TranslationOptions):
#         fields = ('title','content',)
 
# @register(DirectionGalleryImage)
# class DirectionGalleryImageTranslationOptions(TranslationOptions):
#         fields = ('title','span','order',)
 
# @register(MediaAsset)
# class MediaAssetTranslationOptions(TranslationOptions):
#         fields = ('title','description',)
