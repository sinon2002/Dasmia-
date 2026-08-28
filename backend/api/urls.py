from django.urls import path
from .views import LeadSubmissionView, DirectionListView, ServiceListView, NewsListView
from .sitemap import StaticViewSitemap, DirectionSitemap, NewsSitemap
from django.contrib.sitemaps.views import sitemap

sitemaps = {
    'static': StaticViewSitemap,
    'directions': DirectionSitemap,
    'news': NewsSitemap,
}

urlpatterns = [
    path('leads/', LeadSubmissionView.as_view(), name='lead-submission'),
    path('directions/', DirectionListView.as_view(), name='direction-list'),
    path('services/', ServiceListView.as_view(), name='service-list'),
    path('news/', NewsListView.as_view(), name='news-list'),
    path('sitemap.xml', sitemap, {'sitemaps': sitemaps}, name='django.contrib.sitemaps.views.sitemap'),
]
