from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/', include('api.urls')),
]

from api.health import healthz, readyz

urlpatterns += [
    path('healthz', healthz),
    path('readyz', readyz),
]
