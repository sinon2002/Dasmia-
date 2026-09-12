from rest_framework import serializers
from .models import SiteTranslation

#wrapping SiteTranslation into JSON for NextJS understand it
class SiteTranslationSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteTranslation
        fields = ['key', 'text']
