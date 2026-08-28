from rest_framework import serializers
from core.models import LeadSubmission
from cms.models import Direction, Service, News

class BaseLeadSerializer(serializers.ModelSerializer):
    """
    Base serializer to handle common validation like honeypot and utm tags.
    Subclasses can validate the specific `payload` JSON structure.
    """
    honeypot = serializers.CharField(write_only=True, required=False, allow_blank=True)
    website = serializers.CharField(write_only=True, required=False, allow_blank=True)
    captcha_token = serializers.CharField(write_only=True, required=False, allow_blank=True, default="frontend-token")
    payload = serializers.JSONField(required=False, default=dict)

    class Meta:
        model = LeadSubmission
        fields = (
            'form_type', 'name', 'phone', 'email', 'payload',
            'page_url', 'utm_source', 'utm_medium', 'utm_campaign',
            'utm_content', 'utm_term', 'consent_given', 'honeypot', 'website', 'captcha_token'
        )

    def validate(self, attrs):
        # Check honeypot / website spam traps
        if attrs.get('honeypot') or attrs.get('website'):
            raise serializers.ValidationError("Spam detected.")
        return attrs

    def validate_captcha_token(self, value):
        if value and len(value) < 10:
            raise serializers.ValidationError("Invalid captcha token.")
        return value

    def validate_name(self, value):
        if not value or not value.strip():
            raise serializers.ValidationError("Имя обязательно для заполнения.")
        return value.strip()

    def validate_phone(self, value):
        if not value or not value.strip():
            raise serializers.ValidationError("Номер телефона обязателен для заполнения.")
        return value.strip()


class BanquetBookingSerializer(BaseLeadSerializer):
    def validate_payload(self, value):
        if not value:
            return value
        if 'event_date' in value and 'guest_count' not in value:
            raise serializers.ValidationError("Payload must contain 'guest_count'")
        if 'guest_count' in value and 'event_date' not in value:
            raise serializers.ValidationError("Payload must contain 'event_date'")
        return value



class TableReservationSerializer(BaseLeadSerializer):
    pass


class B2BProposalSerializer(BaseLeadSerializer):
    pass


class FeedbackSerializer(BaseLeadSerializer):
    pass


# Public CMS serializers
class DirectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Direction
        fields = '__all__'

class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = '__all__'

class NewsSerializer(serializers.ModelSerializer):
    class Meta:
        model = News
        fields = '__all__'
