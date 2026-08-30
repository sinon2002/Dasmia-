from django.test import TestCase
from django.urls import reverse
from django.utils import timezone
from rest_framework.test import APIClient
from rest_framework import status
from unittest.mock import patch, MagicMock

from core.models import LeadSubmission
from cms.models import Direction, Service, News
from core.bitrix_service import BitrixService


class HealthCheckTests(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_healthz(self):
        response = self.client.get('/healthz')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {'status': 'ok'})

    def test_readyz(self):
        response = self.client.get('/readyz')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {'status': 'ok'})


class LeadSubmissionApiTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.url = reverse('lead-submission')

    @patch('core.tasks.sync_lead_to_bitrix.delay')
    def test_valid_banquet_lead_submission(self, mock_celery_task):
        payload = {
            'form_type': 'banquet',
            'name': 'Айбек Темиров',
            'phone': '+996555123456',
            'email': 'test@example.com',
            'payload': {
                'event_date': '2026-12-31',
                'guest_count': 100
            },
            'captcha_token': 'valid-captcha-token-12345'
        }
        response = self.client.post(self.url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(response.data.get('success'))
        self.assertTrue(LeadSubmission.objects.filter(name='Айбек Темиров').exists())
        mock_celery_task.assert_called_once()

    @patch('core.tasks.sync_lead_to_bitrix.delay')
    def test_complete_dasmia_deal_payload_with_all_fields(self, mock_celery_task):
        payload = {
            'form_type': 'banquet',
            'name': 'Алексей',
            'phone': '+996555123456',
            'email': 'alexey@example.com',
            'page_url': 'https://dasmia.kg/banquet/main-hall',
            'payload': {
                'title': 'Главный банкетный зал DASMIA с узорами',
                'price': 150000,
                'currency': 'KGS',
                'event_date': '2026-11-15',
                'guest_count': 250,
                'items': [
                    {
                        'name': 'Аренда банкетного зала',
                        'quantity': 1,
                        'price': 150000
                    }
                ]
            },
            'utm_source': 'yandex',
            'utm_medium': 'cpc',
            'utm_campaign': 'banquet_season_2026',
            'utm_content': 'hall_patterns',
            'utm_term': 'банкет бишкек',
            'consent_given': True,
            'captcha_token': 'valid-captcha-token-12345'
        }
        response = self.client.post(self.url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(response.data.get('success'))
        
        lead = LeadSubmission.objects.get(name='Алексей', email='alexey@example.com')
        self.assertEqual(lead.page_url, 'https://dasmia.kg/banquet/main-hall')
        self.assertEqual(lead.utm_source, 'yandex')
        self.assertEqual(lead.utm_campaign, 'banquet_season_2026')
        self.assertEqual(lead.payload['price'], 150000)
        self.assertEqual(lead.payload['guest_count'], 250)
        self.assertTrue(lead.consent_given)
        mock_celery_task.assert_called_once_with(str(lead.id))


    @patch('core.tasks.sync_lead_to_bitrix.delay')
    def test_valid_restaurant_reservation(self, mock_celery_task):
        payload = {
            'form_type': 'restaurant',
            'name': 'Каныкей',
            'phone': '+996700998877',
            'payload': {'table': 'VIP 1', 'time': '19:00'},
            'captcha_token': 'valid-captcha-token-12345'
        }
        response = self.client.post(self.url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(LeadSubmission.objects.filter(name='Каныкей').exists())

    @patch('core.tasks.sync_lead_to_bitrix.delay')
    def test_valid_b2b_lead_submission(self, mock_celery_task):
        payload = {
            'form_type': 'b2b',
            'name': 'ООО Корпорат',
            'phone': '+996312123456',
            'email': 'corp@business.kg',
            'payload': {'company': 'ООО Корпорат', 'event_type': 'Конференция'},
            'utm_source': 'google',
            'utm_campaign': 'b2b_bishkek',
            'captcha_token': 'valid-captcha-token-12345'
        }
        response = self.client.post(self.url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        lead = LeadSubmission.objects.get(name='ООО Корпорат')
        self.assertEqual(lead.utm_source, 'google')
        self.assertEqual(lead.utm_campaign, 'b2b_bishkek')

    def test_missing_form_type(self):
        payload = {
            'name': 'No Form Type',
            'phone': '+996555123456'
        }
        response = self.client.post(self.url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('form_type is required', response.data.get('error', ''))

    def test_empty_name_or_phone_fails(self):
        payload = {
            'form_type': 'feedback',
            'name': '   ',
            'phone': '+996555123456',
            'captcha_token': 'valid-token-12345'
        }
        response = self.client.post(self.url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_missing_payload_field_fails_banquet(self):
        payload = {
            'form_type': 'banquet',
            'name': 'Incomplete Payload User',
            'phone': '+996555123456',
            'payload': {
                'event_date': '2026-12-31'
                # missing guest_count
            },
            'captcha_token': 'valid-captcha-token-12345'
        }
        response = self.client.post(self.url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_honeypot_spam_detection(self):
        payload = {
            'form_type': 'feedback',
            'name': 'Bot Spammer',
            'phone': '+996555123456',
            'payload': {'message': 'Spam message'},
            'captcha_token': 'valid-captcha-token-12345',
            'honeypot': 'I am a bot'
        }
        response = self.client.post(self.url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_website_honeypot_spam_detection(self):
        payload = {
            'form_type': 'feedback',
            'name': 'Bot Spammer 2',
            'phone': '+996555123456',
            'payload': {'message': 'Spam message'},
            'captcha_token': 'valid-captcha-token-12345',
            'website': 'http://spamsite.com'
        }
        response = self.client.post(self.url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_invalid_captcha_token(self):
        payload = {
            'form_type': 'feedback',
            'name': 'User Short Captcha',
            'phone': '+996555123456',
            'payload': {'message': 'Hello'},
            'captcha_token': 'short'
        }
        response = self.client.post(self.url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    @patch('core.tasks.sync_lead_to_bitrix.delay', side_effect=Exception('Celery unreachable'))
    @patch('core.bitrix_service.BitrixService.sync_lead')
    def test_celery_failure_fallback_thread(self, mock_bitrix_sync, mock_celery_task):
        payload = {
            'form_type': 'feedback',
            'name': 'Fallback Test User',
            'phone': '+996555123456',
            'payload': {'message': 'Hello'},
            'captcha_token': 'valid-captcha-token-12345'
        }
        response = self.client.post(self.url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(LeadSubmission.objects.filter(name='Fallback Test User').exists())


class CmsApiTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.direction = Direction.objects.create(
            slug='restaurants',
            name_ru='Рестораны',
            name_ky='Ресторандар',
            name_en='Restaurants',
            is_active=True
        )
        self.service = Service.objects.create(
            direction=self.direction,
            name_ru='Банкетный зал',
            price=1500
        )
        self.news = News.objects.create(
            slug='grand-opening',
            title_ru='Открытие',
            content_ru='Большое открытие комплекса',
            published_date=timezone.now(),
            is_active=True
        )

    def test_get_directions(self):
        url = reverse('direction-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreaterEqual(len(response.data), 1)

    def test_get_services(self):
        url = reverse('service-list')
        response = self.client.get(url, {'direction_id': self.direction.id})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['name_ru'], 'Банкетный зал')

    def test_get_services_unfiltered(self):
        url = reverse('service-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreaterEqual(len(response.data), 1)

    def test_get_news(self):
        url = reverse('news-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreaterEqual(len(response.data), 1)


class BitrixServiceTests(TestCase):
    def test_build_payload(self):
        lead = LeadSubmission.objects.create(
            form_type='banquet',
            name='Jane Doe',
            phone='+996777123456',
            email='jane@example.com',
            payload={'event_date': '2026-10-10', 'guest_count': 200},
            utm_source='google',
            utm_campaign='spring_promo'
        )
        payload = BitrixService._build_payload(lead)
        self.assertIn('fields', payload)
        self.assertEqual(payload['fields']['NAME'], 'Jane Doe')
        self.assertEqual(payload['fields']['PHONE'][0]['VALUE'], '+996777123456')
        self.assertEqual(payload['fields']['EMAIL'][0]['VALUE'], 'jane@example.com')
        self.assertEqual(payload['fields']['UTM_SOURCE'], 'google')
        self.assertEqual(payload['fields']['UTM_CAMPAIGN'], 'spring_promo')
        self.assertIn('event_date: 2026-10-10', payload['fields']['COMMENTS'])
