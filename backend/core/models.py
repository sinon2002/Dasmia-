from django.db import models
from django.utils.translation import gettext_lazy as _
import uuid

# Multilingual architecture handled via django-modeltranslation
# which dynamically adds _ru, _ky, _en fields

class LeadSubmission(models.Model):
    class StatusChoices(models.TextChoices):
        PENDING = 'pending', _('Pending Sync')
        SUCCESS = 'success', _('Synced Successfully')
        FAILED = 'failed', _('Sync Failed')

    class DomainChoices(models.TextChoices):
        CONTACT = 'contact', _('Contact Form')
        BANQUET = 'banquet', _('Banquet Booking')
        RESTAURANT = 'restaurant', _('Table Reservation')
        B2B = 'b2b', _('B2B Proposal')
        FEEDBACK = 'feedback', _('Feedback/Callback')
        FITNESS = 'fitness', _('Fitness Club')
        POOL = 'pool', _('Swimming Pool')
        POOLS = 'pools', _('Swimming Pools')
        SPA = 'spa', _('SPA')
        ETHNO = 'ethno', _('Ethno-village')
        CHAIKHANA = 'chaikhana', _('Chaikhana')
        EVENTS = 'events', _('Events')
        CORPORATE = 'corporate', _('Corporate')

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    form_type = models.CharField(max_length=50, choices=DomainChoices.choices, default=DomainChoices.CONTACT)

    # Client Contact
    name = models.CharField(max_length=255)
    phone = models.CharField(max_length=50)
    email = models.EmailField(blank=True, null=True)

    # Form specific fields
    payload = models.JSONField(default=dict, blank=True, null=True, help_text=_("Stores form-specific fields like event_date, guest_count, etc."))

    # Meta / Marketing
    page_url = models.URLField(blank=True, null=True)
    utm_source = models.CharField(max_length=255, blank=True, null=True)
    utm_medium = models.CharField(max_length=255, blank=True, null=True)
    utm_campaign = models.CharField(max_length=255, blank=True, null=True)
    utm_content = models.CharField(max_length=255, blank=True, null=True)
    utm_term = models.CharField(max_length=255, blank=True, null=True)

    consent_given = models.BooleanField(default=True)

    # Sync status
    sync_status = models.CharField(max_length=20, choices=StatusChoices.choices, default=StatusChoices.PENDING)
    bitrix_id = models.CharField(max_length=100, blank=True, null=True, help_text="CRM Lead ID once synced")
    sync_errors = models.TextField(blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.form_type} - {self.name} ({self.get_sync_status_display()})"

    class Meta:
        ordering = ['-created_at']
        verbose_name = _('Lead Submission')
        verbose_name_plural = _('Lead Submissions')
