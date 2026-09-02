from django.urls import path
from .views import (
    LeadSubmissionView,
    DirectionListView,
    DirectionDetailView,
    DirectionGalleryImageListView,
    DirectionGalleryImageDetailView,
    MediaAssetListView,
    MediaAssetDetailView,
    ServiceListView,
    ServiceDetailView,
    NewsListView,
    NewsDetailView,
)
from .sitemap import StaticViewSitemap, DirectionSitemap, NewsSitemap
from django.contrib.sitemaps.views import sitemap

sitemaps = {
    'static': StaticViewSitemap,
    'directions': DirectionSitemap,
    'news': NewsSitemap,
}

urlpatterns = [
    # Leads
    path('leads/', LeadSubmissionView.as_view(), name='lead-submission'),

    # Directions
    path('directions/', DirectionListView.as_view(), name='direction-list'),
    path('directions/<int:pk>/', DirectionDetailView.as_view(), name='direction-detail-by-id'),
    path('directions/<slug:slug>/', DirectionDetailView.as_view(), name='direction-detail'),

    # Direction Bento Gallery Images
    path('direction-gallery/', DirectionGalleryImageListView.as_view(), name='direction-gallery-list'),
    path('direction-gallery/<int:pk>/', DirectionGalleryImageDetailView.as_view(), name='direction-gallery-detail'),
    path('gallery-images/', DirectionGalleryImageListView.as_view(), name='gallery-image-list'),
    path('gallery-images/<int:pk>/', DirectionGalleryImageDetailView.as_view(), name='gallery-image-detail'),

    # Media Assets Library
    path('media-assets/', MediaAssetListView.as_view(), name='media-asset-list'),
    path('media-assets/<int:pk>/', MediaAssetDetailView.as_view(), name='media-asset-detail'),
    path('media/', MediaAssetListView.as_view(), name='media-list'),
    path('media/<int:pk>/', MediaAssetDetailView.as_view(), name='media-detail'),

    # Services
    path('services/', ServiceListView.as_view(), name='service-list'),
    path('services/<int:pk>/', ServiceDetailView.as_view(), name='service-detail'),

    # News
    path('news/', NewsListView.as_view(), name='news-list'),
    path('news/<int:pk>/', NewsDetailView.as_view(), name='news-detail-by-id'),
    path('news/<slug:slug>/', NewsDetailView.as_view(), name='news-detail'),

    # Sitemaps
    path('sitemap.xml', sitemap, {'sitemaps': sitemaps}, name='django.contrib.sitemaps.views.sitemap'),
]

