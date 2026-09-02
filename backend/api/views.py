from rest_framework import views, status, generics
from rest_framework.response import Response
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from django.shortcuts import get_object_or_404
from django.db.models import Q

from .serializers import (
    BanquetBookingSerializer, TableReservationSerializer,
    B2BProposalSerializer, FeedbackSerializer,
    DirectionSerializer, DirectionGalleryImageSerializer,
    MediaAssetSerializer, ServiceSerializer, NewsSerializer
)
from .throttling import LeadSubmissionThrottle
from core.models import LeadSubmission
from cms.models import Direction, DirectionGalleryImage, MediaAsset, Service, News

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

# 1. Directions
class DirectionListView(generics.ListAPIView):
    queryset = Direction.objects.filter(is_active=True).prefetch_related('gallery_images').order_by('order', 'id')
    serializer_class = DirectionSerializer

    @method_decorator(cache_page(60 * 15))
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)


class DirectionDetailView(generics.RetrieveAPIView):
    queryset = Direction.objects.filter(is_active=True).prefetch_related('gallery_images')
    serializer_class = DirectionSerializer

    def get_object(self):
        queryset = self.filter_queryset(self.get_queryset())
        lookup_url_kwarg = self.lookup_url_kwarg or self.lookup_field
        lookup_val = self.kwargs.get(lookup_url_kwarg) or self.kwargs.get('pk') or self.kwargs.get('slug')
        if str(lookup_val).isdigit():
            return get_object_or_404(queryset, pk=lookup_val)
        return get_object_or_404(queryset, slug=lookup_val)

    @method_decorator(cache_page(60 * 15))
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)


# 2. Direction Gallery Images
class DirectionGalleryImageListView(generics.ListAPIView):
    serializer_class = DirectionGalleryImageSerializer

    def get_queryset(self):
        queryset = DirectionGalleryImage.objects.filter(is_active=True).select_related('direction').order_by('direction__order', 'order', 'id')
        direction_param = self.request.query_params.get('direction') or self.request.query_params.get('direction_id')
        direction_slug = self.request.query_params.get('direction_slug')
        span = self.request.query_params.get('span')

        if direction_param:
            if direction_param.isdigit():
                queryset = queryset.filter(direction_id=direction_param)
            else:
                queryset = queryset.filter(direction__slug=direction_param)
        elif direction_slug:
            queryset = queryset.filter(direction__slug=direction_slug)

        if span:
            queryset = queryset.filter(span=span)

        return queryset

    @method_decorator(cache_page(60 * 15))
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)


class DirectionGalleryImageDetailView(generics.RetrieveAPIView):
    queryset = DirectionGalleryImage.objects.filter(is_active=True).select_related('direction')
    serializer_class = DirectionGalleryImageSerializer

    @method_decorator(cache_page(60 * 15))
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)


# 3. Media Assets Library
class MediaAssetListView(generics.ListAPIView):
    serializer_class = MediaAssetSerializer

    def get_queryset(self):
        queryset = MediaAsset.objects.all().order_by('-created_at', '-id')
        category = self.request.query_params.get('category')
        search = self.request.query_params.get('search') or self.request.query_params.get('q')

        if category:
            queryset = queryset.filter(category=category)
        if search:
            queryset = queryset.filter(
                Q(title__icontains=search) |
                Q(description__icontains=search)
            )
        return queryset

    @method_decorator(cache_page(60 * 15))
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)


class MediaAssetDetailView(generics.RetrieveAPIView):
    queryset = MediaAsset.objects.all()
    serializer_class = MediaAssetSerializer

    @method_decorator(cache_page(60 * 15))
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)


# 4. Services
class ServiceListView(generics.ListAPIView):
    serializer_class = ServiceSerializer

    def get_queryset(self):
        direction_param = self.request.query_params.get('direction_id') or self.request.query_params.get('direction')
        if direction_param:
            if str(direction_param).isdigit():
                return Service.objects.filter(direction_id=direction_param)
            return Service.objects.filter(direction__slug=direction_param)
        return Service.objects.all()


class ServiceDetailView(generics.RetrieveAPIView):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer


# 5. News
class NewsListView(generics.ListAPIView):
    queryset = News.objects.filter(is_active=True).order_by('-published_date')
    serializer_class = NewsSerializer

    @method_decorator(cache_page(60 * 15))
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)


class NewsDetailView(generics.RetrieveAPIView):
    queryset = News.objects.filter(is_active=True)
    serializer_class = NewsSerializer

    def get_object(self):
        queryset = self.filter_queryset(self.get_queryset())
        lookup_url_kwarg = self.lookup_url_kwarg or self.lookup_field
        lookup_val = self.kwargs.get(lookup_url_kwarg) or self.kwargs.get('pk') or self.kwargs.get('slug')
        if str(lookup_val).isdigit():
            return get_object_or_404(queryset, pk=lookup_val)
        return get_object_or_404(queryset, slug=lookup_val)

    @method_decorator(cache_page(60 * 15))
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)

