from django.contrib import admin
from django.urls import path, re_path, include
from django.conf import settings
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from cms.views import serve_media_with_fallback
from api.health import healthz, readyz

urlpatterns = [
    path('admin/', admin.site.urls),
    #if request starts with 'api/cms/', transfer it to 'cms.urls'
    path('api/cms/', include('cms.urls')),
    path('api/v1/', include('api.urls')),
    path('healthz', healthz),
    path('readyz', readyz),
    re_path(r'^media/(?P<path>.*)$', serve_media_with_fallback, {'document_root': settings.MEDIA_ROOT}),
]

urlpatterns += staticfiles_urlpatterns()




