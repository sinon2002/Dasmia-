from django.contrib import admin
from .models import LeadSubmission

@admin.register(LeadSubmission)
class LeadSubmissionAdmin(admin.ModelAdmin):
    list_display = ('name', 'phone', 'form_type', 'sync_status', 'created_at')
    list_filter = ('sync_status', 'form_type', 'created_at')
    search_fields = ('name', 'phone', 'email', 'bitrix_id')
    readonly_fields = ('sync_status', 'bitrix_id', 'sync_errors', 'created_at', 'updated_at')
