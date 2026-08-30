import requests
import logging
from django.conf import settings
from .models import LeadSubmission

logger = logging.getLogger(__name__)

class BitrixService:
    @staticmethod
    def _build_payload(lead: LeadSubmission) -> dict:
        """
        Maps a LeadSubmission local model to Bitrix24 crm.lead.add schema.
        Follows standards from https://mcp-dev.bitrix24.tech/mcp
        """
        # Determine Title
        title = f"[{lead.get_form_type_display()}] {lead.name}"

        # Build comments from payload
        comments = [
            f"Форма: {lead.get_form_type_display()}",
        ]

        if lead.page_url:
            comments.append(f"Страница: {lead.page_url}")

        if lead.payload and isinstance(lead.payload, dict):
            for key, val in lead.payload.items():
                comments.append(f"{key}: {val}")

        comments_str = "\n".join(comments)

        fields = {
            "TITLE": title,
            "NAME": lead.name,
            "PHONE": [{"VALUE": lead.phone, "VALUE_TYPE": "WORK"}],
            "COMMENTS": comments_str,
            "SOURCE_ID": "WEB",
            "SOURCE_DESCRIPTION": "Сайт DASMIA",
        }

        if lead.email:
            fields["EMAIL"] = [{"VALUE": lead.email, "VALUE_TYPE": "WORK"}]

        # UTM Tags mapping
        if lead.utm_source:
            fields["UTM_SOURCE"] = lead.utm_source
        if lead.utm_medium:
            fields["UTM_MEDIUM"] = lead.utm_medium
        if lead.utm_campaign:
            fields["UTM_CAMPAIGN"] = lead.utm_campaign
        if lead.utm_content:
            fields["UTM_CONTENT"] = lead.utm_content
        if lead.utm_term:
            fields["UTM_TERM"] = lead.utm_term

        return {
            "fields": fields,
            "params": {"REGISTER_SONET_EVENT": "Y"}
        }

    @staticmethod
    def sync_lead(lead_id: str) -> bool:
        """
        Sends the lead to Bitrix24 and updates the sync_status in DB.
        """
        try:
            lead = LeadSubmission.objects.get(id=lead_id)
        except LeadSubmission.DoesNotExist:
            logger.error(f"Lead {lead_id} not found.")
            return False

        if not settings.BITRIX_WEBHOOK_URL:
            logger.warning("BITRIX_WEBHOOK_URL is not set. Simulating success.")
            lead.sync_status = LeadSubmission.StatusChoices.SUCCESS
            lead.save(update_fields=['sync_status'])
            return True

        payload = BitrixService._build_payload(lead)
        url = f"{settings.BITRIX_WEBHOOK_URL}crm.lead.add.json"

        try:
            response = requests.post(url, json=payload, timeout=10)
            response.raise_for_status()
            data = response.json()

            if 'result' in data:
                lead.bitrix_id = str(data['result'])
                lead.sync_status = LeadSubmission.StatusChoices.SUCCESS
                lead.sync_errors = None
                lead.save(update_fields=['bitrix_id', 'sync_status', 'sync_errors'])
                return True
            else:
                raise Exception(f"Unexpected response from Bitrix: {data}")

        except requests.RequestException as e:
            error_msg = str(e)
            if hasattr(e, 'response') and e.response is not None:
                error_msg += f" | {e.response.text}"

            logger.error(f"Bitrix24 sync failed for lead {lead_id}: {error_msg}")
            lead.sync_status = LeadSubmission.StatusChoices.FAILED
            lead.sync_errors = error_msg
            lead.save(update_fields=['sync_status', 'sync_errors'])
            raise Exception(f"Bitrix Sync Error: {error_msg}")
