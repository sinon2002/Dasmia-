from django.test import TestCase
from django.urls import reverse
from django.utils import timezone
from rest_framework.test import APIClient
from rest_framework import status
from unittest.mock import patch

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
            'name': 'Test User',
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
        self.assertTrue(LeadSubmission.objects.filter(name='Test User').exists())
        mock_celery_task.assert_called_once()

    def test_missing_payload_field_fails(self):
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
