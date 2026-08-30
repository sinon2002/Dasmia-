from django.test import TestCase, override_settings
from django.core.management import call_command
from unittest.mock import patch, MagicMock
import requests
import uuid

from core.models import LeadSubmission
from core.bitrix_service import BitrixService
from core.tasks import sync_lead_to_bitrix


class LeadSubmissionModelTests(TestCase):
    def test_create_lead_submission_defaults(self):
        lead = LeadSubmission.objects.create(
            form_type=LeadSubmission.DomainChoices.BANQUET,
            name="Айбек Темиров",
            phone="+996555112233",
            email="aibek@example.com",
            payload={"guest_count": 250, "hall": "Khan Tenri"}
        )
        self.assertIsInstance(lead.id, uuid.UUID)
        self.assertEqual(lead.sync_status, LeadSubmission.StatusChoices.PENDING)
        self.assertIn("Айбек Темиров", str(lead))
        self.assertIn("banquet", str(lead))

    def test_all_form_type_choices(self):
        types = [
            LeadSubmission.DomainChoices.CONTACT,
            LeadSubmission.DomainChoices.BANQUET,
            LeadSubmission.DomainChoices.RESTAURANT,
            LeadSubmission.DomainChoices.B2B,
            LeadSubmission.DomainChoices.FEEDBACK,
            LeadSubmission.DomainChoices.FITNESS,
            LeadSubmission.DomainChoices.POOLS,
            LeadSubmission.DomainChoices.SPA,
            LeadSubmission.DomainChoices.ETHNO,
            LeadSubmission.DomainChoices.CHAIKHANA,
            LeadSubmission.DomainChoices.EVENTS,
            LeadSubmission.DomainChoices.CORPORATE,
        ]
        for ft in types:
            lead = LeadSubmission.objects.create(
                form_type=ft,
                name="Test Client",
                phone="+996700112233"
            )
            self.assertEqual(lead.form_type, ft)

    def test_utm_fields_storage(self):
        lead = LeadSubmission.objects.create(
            form_type=LeadSubmission.DomainChoices.B2B,
            name="Корпоративный Клиент",
            phone="+996550998877",
            utm_source="yandex",
            utm_medium="cpc",
            utm_campaign="corp_events_2026",
            utm_content="banner_1",
            utm_term="banket bishkek"
        )
        self.assertEqual(lead.utm_source, "yandex")
        self.assertEqual(lead.utm_medium, "cpc")
        self.assertEqual(lead.utm_campaign, "corp_events_2026")
        self.assertEqual(lead.utm_content, "banner_1")
        self.assertEqual(lead.utm_term, "banket bishkek")


class BitrixServiceTests(TestCase):
    def setUp(self):
        self.lead = LeadSubmission.objects.create(
            form_type=LeadSubmission.DomainChoices.BANQUET,
            name="Нурбек Садыков",
            phone="+996772334455",
            email="nurbek@example.com",
            payload={"event_date": "2026-11-20", "guests": 300},
            utm_source="instagram",
            utm_campaign="autumn_sale"
        )

    def test_build_payload_structure(self):
        payload = BitrixService._build_payload(self.lead)
        self.assertIn("fields", payload)
        self.assertIn("params", payload)
        fields = payload["fields"]
        self.assertEqual(fields["NAME"], "Нурбек Садыков")
        self.assertEqual(fields["PHONE"][0]["VALUE"], "+996772334455")
        self.assertEqual(fields["EMAIL"][0]["VALUE"], "nurbek@example.com")
        self.assertEqual(fields["UTM_SOURCE"], "instagram")
        self.assertEqual(fields["UTM_CAMPAIGN"], "autumn_sale")
        self.assertIn("event_date: 2026-11-20", fields["COMMENTS"])

    def test_sync_nonexistent_lead(self):
        fake_uuid = str(uuid.uuid4())
        success = BitrixService.sync_lead(fake_uuid)
        self.assertFalse(success)

    @override_settings(BITRIX_WEBHOOK_URL="")
    def test_sync_lead_simulation_when_webhook_empty(self):
        success = BitrixService.sync_lead(str(self.lead.id))
        self.assertTrue(success)
        self.lead.refresh_from_db()
        self.assertEqual(self.lead.sync_status, LeadSubmission.StatusChoices.SUCCESS)

    @override_settings(BITRIX_WEBHOOK_URL="https://example.bitrix24.ru/rest/1/webhookkey/")
    @patch("requests.post")
    def test_sync_lead_success_with_webhook(self, mock_post):
        mock_response = MagicMock()
        mock_response.json.return_value = {"result": 42516}
        mock_response.raise_for_status.return_value = None
        mock_post.return_value = mock_response

        success = BitrixService.sync_lead(str(self.lead.id))
        self.assertTrue(success)
        self.lead.refresh_from_db()
        self.assertEqual(self.lead.bitrix_id, "42516")
        self.assertEqual(self.lead.sync_status, LeadSubmission.StatusChoices.SUCCESS)
        self.assertIsNone(self.lead.sync_errors)

    @override_settings(BITRIX_WEBHOOK_URL="https://example.bitrix24.ru/rest/1/webhookkey/")
    @patch("requests.post")
    def test_sync_lead_http_error(self, mock_post):
        mock_response = MagicMock()
        mock_response.raise_for_status.side_effect = requests.HTTPError("500 Server Error")
        mock_response.text = "Internal CRM Error"
        mock_post.return_value = mock_response

        with self.assertRaises(Exception):
            BitrixService.sync_lead(str(self.lead.id))

        self.lead.refresh_from_db()
        self.assertEqual(self.lead.sync_status, LeadSubmission.StatusChoices.FAILED)
        self.assertIn("500 Server Error", self.lead.sync_errors)


class CeleryTaskTests(TestCase):
    def setUp(self):
        self.lead = LeadSubmission.objects.create(
            form_type=LeadSubmission.DomainChoices.FITNESS,
            name="Марина Власова",
            phone="+996555987654"
        )

    @patch("core.bitrix_service.BitrixService.sync_lead", return_value=True)
    def test_sync_lead_task_success(self, mock_sync):
        result = sync_lead_to_bitrix(str(self.lead.id))
        self.assertIn("successfully synced", result)
        mock_sync.assert_called_once_with(str(self.lead.id))


class DasmiaFullBookingIntegrationTests(TestCase):
    def setUp(self):
        self.full_lead = LeadSubmission.objects.create(
            form_type=LeadSubmission.DomainChoices.BANQUET,
            name="Алексей",
            phone="+996555123456",
            email="alexey@example.com",
            page_url="https://dasmia.kg/banquet/main-hall",
            payload={
                "title": "Главный банкетный зал DASMIA с узорами",
                "price": 150000,
                "currency": "KGS",
                "event_date": "2026-11-15",
                "guest_count": 250,
                "items": [{"name": "Аренда банкетного зала", "quantity": 1, "price": 150000}]
            },
            utm_source="yandex",
            utm_medium="cpc",
            utm_campaign="banquet_season_2026",
            utm_content="main_hall_patterns",
            utm_term="банкет бишкек dasmia",
            consent_given=True
        )

    def test_complete_bitrix_payload_mapping(self):
        payload = BitrixService._build_payload(self.full_lead)
        
        fields = payload["fields"]
        self.assertEqual(fields["TITLE"], f"[{self.full_lead.get_form_type_display()}] Алексей")
        self.assertEqual(fields["NAME"], "Алексей")
        self.assertEqual(fields["PHONE"], [{"VALUE": "+996555123456", "VALUE_TYPE": "WORK"}])
        self.assertEqual(fields["EMAIL"], [{"VALUE": "alexey@example.com", "VALUE_TYPE": "WORK"}])
        self.assertEqual(fields["SOURCE_ID"], "WEB")
        self.assertEqual(fields["SOURCE_DESCRIPTION"], "Сайт DASMIA")
        self.assertEqual(fields["UTM_SOURCE"], "yandex")
        self.assertEqual(fields["UTM_MEDIUM"], "cpc")
        self.assertEqual(fields["UTM_CAMPAIGN"], "banquet_season_2026")
        self.assertEqual(fields["UTM_CONTENT"], "main_hall_patterns")
        self.assertEqual(fields["UTM_TERM"], "банкет бишкек dasmia")
        
        # Verify Comments
        comments = fields["COMMENTS"]
        self.assertIn(f"Форма: {self.full_lead.get_form_type_display()}", comments)
        self.assertIn("Страница: https://dasmia.kg/banquet/main-hall", comments)
        self.assertIn("Главный банкетный зал DASMIA с узорами", comments)
        self.assertIn("150000", comments)
        self.assertIn("event_date: 2026-11-15", comments)
        self.assertIn("guest_count: 250", comments)
        
        # Verify params
        self.assertEqual(payload["params"]["REGISTER_SONET_EVENT"], "Y")

    @override_settings(BITRIX_WEBHOOK_URL="https://dasmia.bitrix24.ru/rest/1/secretwebhook/")
    @patch("requests.post")
    def test_bitrix_api_call_with_full_data(self, mock_post):
        mock_response = MagicMock()
        mock_response.json.return_value = {"result": 98765}
        mock_response.raise_for_status.return_value = None
        mock_post.return_value = mock_response

        success = BitrixService.sync_lead(str(self.full_lead.id))
        self.assertTrue(success)

        # Verify POST request parameters to Bitrix webhook
        mock_post.assert_called_once()
        call_args, call_kwargs = mock_post.call_args
        self.assertEqual(call_args[0], "https://dasmia.bitrix24.ru/rest/1/secretwebhook/crm.lead.add.json")
        sent_json = call_kwargs["json"]
        self.assertEqual(sent_json["fields"]["NAME"], "Алексей")
        self.assertEqual(sent_json["fields"]["PHONE"][0]["VALUE"], "+996555123456")
        self.assertEqual(sent_json["fields"]["EMAIL"][0]["VALUE"], "alexey@example.com")
        self.assertEqual(sent_json["params"]["REGISTER_SONET_EVENT"], "Y")

        self.full_lead.refresh_from_db()
        self.assertEqual(self.full_lead.bitrix_id, "98765")
        self.assertEqual(self.full_lead.sync_status, LeadSubmission.StatusChoices.SUCCESS)

