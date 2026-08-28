from rest_framework import views, status, generics
from rest_framework.response import Response
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page

from .serializers import (
    BanquetBookingSerializer, TableReservationSerializer,
    B2BProposalSerializer, FeedbackSerializer,
    DirectionSerializer, ServiceSerializer, NewsSerializer
)
from .throttling import LeadSubmissionThrottle
from core.models import LeadSubmission
from cms.models import Direction, Service, News

class LeadSubmissionView(views.APIView):
    """
    Endpoint for lead ingestion. Routes payload validation to specific serializers based on `form_type`.
    """
    throttle_classes = [LeadSubmissionThrottle]

    def get_serializer_class(self, form_type):
        mapping = {
            LeadSubmission.DomainChoices.BANQUET: BanquetBookingSerializer,
            LeadSubmission.DomainChoices.RESTAURANT: TableReservationSerializer,
            LeadSubmission.DomainChoices.B2B: B2BProposalSerializer,
            LeadSubmission.DomainChoices.FEEDBACK: FeedbackSerializer,
        }
        # Fallback to standard BaseLeadSerializer or Table/Banquet if others match (e.g., FITNESS)
        return mapping.get(form_type, FeedbackSerializer)

    def post(self, request, *args, **kwargs):
        form_type = request.data.get('form_type')
        if not form_type:
            return Response({'error': 'form_type is required.'}, status=status.HTTP_400_BAD_REQUEST)

        serializer_class = self.get_serializer_class(form_type)
        serializer = serializer_class(data=request.data)

        if serializer.is_valid():
            # Extract non-model fields before saving
            validated_data = serializer.validated_data
            validated_data.pop('honeypot', None)
            validated_data.pop('website', None)
            validated_data.pop('captcha_token', None)

            lead = LeadSubmission.objects.create(**validated_data)

            # Synchronize with Bitrix24
            try:
                from core.tasks import sync_lead_to_bitrix
                sync_lead_to_bitrix.delay(str(lead.id))
            except Exception as e:
                import logging
                import threading
                import django.db
                from core.bitrix_service import BitrixService

                def _bg_sync(l_id):
                    django.db.close_old_connections()
                    try:
                        BitrixService.sync_lead(l_id)
                    except Exception as ex:
                        logging.getLogger(__name__).error(f"Error syncing lead {l_id} to Bitrix: {ex}")
                    finally:
                        django.db.close_old_connections()

                logging.getLogger(__name__).warning(f"Could not enqueue lead {lead.id} to Celery: {e}, using thread fallback.")
                threading.Thread(target=_bg_sync, args=(str(lead.id),), daemon=True).start()

            return Response({'success': True, 'id': str(lead.id)}, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Public Read-Only Endpoints
class DirectionListView(generics.ListAPIView):
    queryset = Direction.objects.filter(is_active=True)
    serializer_class = DirectionSerializer

    @method_decorator(cache_page(60 * 15))
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)

class ServiceListView(generics.ListAPIView):
    serializer_class = ServiceSerializer

    def get_queryset(self):
        direction_id = self.request.query_params.get('direction_id')
        if direction_id:
            return Service.objects.filter(direction_id=direction_id)
        return Service.objects.all()

class NewsListView(generics.ListAPIView):
    queryset = News.objects.filter(is_active=True)
    serializer_class = NewsSerializer

    @method_decorator(cache_page(60 * 15))
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)
