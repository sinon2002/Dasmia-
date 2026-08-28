from django.contrib.sitemaps import Sitemap
from django.urls import reverse
from cms.models import Direction, News

class StaticViewSitemap(Sitemap):
    priority = 1.0
    changefreq = 'daily'

    def items(self):
        # We don't have frontend URLs mounted in django, so we return dummy URLs
        # In reality, this should point to NextJS frontend routes
        return ['direction-list', 'service-list', 'news-list']

    def location(self, item):
        return reverse(item)

class DirectionSitemap(Sitemap):
    priority = 0.8
    changefreq = 'weekly'

    def items(self):
        return Direction.objects.filter(is_active=True)

    def location(self, obj):
        return f"/directions/{obj.slug}"

class NewsSitemap(Sitemap):
    priority = 0.6
    changefreq = 'weekly'

    def items(self):
        return News.objects.filter(is_active=True)

    def lastmod(self, obj):
        return obj.published_date

    def location(self, obj):
        return f"/news/{obj.slug}"
