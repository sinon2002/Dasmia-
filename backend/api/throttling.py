from rest_framework.throttling import AnonRateThrottle
from django.conf import settings

class LeadSubmissionThrottle(AnonRateThrottle):
    """
    Limits the number of lead submissions per IP address.
    Bypassed in DEBUG mode for development and testing.
    """
    rate = '60/hour'

    def allow_request(self, request, view):
        if getattr(settings, 'DEBUG', False):
            return True
        return super().allow_request(request, view)

