import logging
from celery import shared_task
from .bitrix_service import BitrixService

logger = logging.getLogger(__name__)

@shared_task(bind=True, max_retries=5, default_retry_delay=60)
def sync_lead_to_bitrix(self, lead_id: str):
    """
    Celery task with exponential backoff to ensure reliable sync.
    max_retries=5 means it will retry up to 5 times.
    """
    try:
        success = BitrixService.sync_lead(lead_id)
        if not success:
            raise Exception("BitrixService returned False.")
        return f"Lead {lead_id} successfully synced."
    except Exception as exc:
        logger.warning(f"Task failed. Retrying... Exception: {exc}")
        # Exponential backoff: 60s, 120s, 240s...
        delay = self.default_retry_delay * (2 ** self.request.retries)
        raise self.retry(exc=exc, countdown=delay)
