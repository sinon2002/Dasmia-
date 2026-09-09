from django.contrib import admin
from django.urls import path, re_path, include
from django.conf import settings
from django.conf.urls.static import static
from django.views.static import serve
from django.views.decorators.cache import never_cache

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/', include('api.urls')),
]

from api.health import healthz, readyz

media_serve_view = never_cache(serve) if settings.DEBUG else serve

urlpatterns += [
    path('healthz', healthz),
    path('readyz', readyz),
    re_path(r'^media/(?P<path>.*)$', media_serve_view, {'document_root': settings.MEDIA_ROOT}),
]



