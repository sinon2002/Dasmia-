from django.contrib import admin
from django import forms
from django.contrib.auth.models import User, Group, Permission
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin, GroupAdmin as BaseGroupAdmin
from .models import LeadSubmission

class PermissionModelMultipleChoiceField(forms.ModelMultipleChoiceField):
    def label_from_instance(self, obj):
        cls = obj.content_type.model_class()
        model_name = str(cls._meta.verbose_name).capitalize() if cls else obj.content_type.model.capitalize()
        app_label = obj.content_type.app_label
        return f"[{app_label}] {model_name} ➔ {obj.name}"

class CustomUserAdmin(BaseUserAdmin):
    def formfield_for_manytomany(self, db_field, request=None, **kwargs):
        if db_field.name == 'user_permissions':
            kwargs['form_class'] = PermissionModelMultipleChoiceField
            kwargs['queryset'] = Permission.objects.select_related('content_type').order_by(
                'content_type__app_label', 'content_type__model', 'name'
            )
        return super().formfield_for_manytomany(db_field, request, **kwargs)

class CustomGroupAdmin(BaseGroupAdmin):
    def formfield_for_manytomany(self, db_field, request=None, **kwargs):
        if db_field.name == 'permissions':
            kwargs['form_class'] = PermissionModelMultipleChoiceField
            kwargs['queryset'] = Permission.objects.select_related('content_type').order_by(
                'content_type__app_label', 'content_type__model', 'name'
            )
        return super().formfield_for_manytomany(db_field, request, **kwargs)

try:
    admin.site.unregister(User)
except admin.sites.NotRegistered:
    pass

try:
    admin.site.unregister(Group)
except admin.sites.NotRegistered:
    pass

admin.site.register(User, CustomUserAdmin)
admin.site.register(Group, CustomGroupAdmin)

@admin.register(LeadSubmission)
class LeadSubmissionAdmin(admin.ModelAdmin):
    list_display = ('name', 'phone', 'form_type', 'sync_status', 'created_at')
    list_filter = ('sync_status', 'form_type', 'created_at')
    search_fields = ('name', 'phone', 'email', 'bitrix_id')
    readonly_fields = ('sync_status', 'bitrix_id', 'sync_errors', 'created_at', 'updated_at')

