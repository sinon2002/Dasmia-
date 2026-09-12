from django.urls import path
from .views import SiteTranslationListView

#transfeing URL request from front to  API
urlpatterns = [
    #starting SiteTranslationListView if frontend(nextjs) sent request
    path('translations/', SiteTranslationListView.as_view(), name = 'translations'),
]
