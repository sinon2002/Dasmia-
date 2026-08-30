import os
from pathlib import Path
from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parent.parent

# Automatically load .env file from backend/ or root project dir if present
load_dotenv(BASE_DIR / '.env', override=True)
load_dotenv(BASE_DIR.parent / '.env', override=True)

from .settings_db import get_db_config

SECRET_KEY = os.environ.get('SECRET_KEY', 'insecure-key')
DEBUG = os.environ.get('DEBUG', 'False') == 'True'
ALLOWED_HOSTS = os.environ.get('ALLOWED_HOSTS', '*').split(',')

# Static files (CSS, JavaScript, Images)
STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles' 
MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'

INSTALLED_APPS = [
    'jazzmin',
    'modeltranslation',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.sitemaps',
    'rest_framework',
    'corsheaders',
    'core',
    'api',
    'cms',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.locale.LocaleMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'config.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

#admin panel design with JAZZMIN
JAZZMIN_SETTINGS = {
    # Title on the login screen
    "site_title": "DASMIA Admin",
    
    # Title on the brand text (top left)
    "site_header": "DASMIA",
    "site_brand": "DASMIA Holding",
    "welcome_sign": "Welcome to DASMIA CRM & Content Management",
    
    # Add an external link in the top menu (e.g. to Bitrix webhook docs)
    "topmenu_links": [
        {"name": "Home",  "url": "admin:index", "permissions": ["auth.view_user"]},
        {"name": "Bitrix24 Webhook", "url": "https://mcp-dev.bitrix24.tech/mcp", "new_window": True},
    ],
    
    # Grouping models beautifully in the sidebar with icons!
    "show_sidebar": True,
    "navigation_expanded": True,
    "icons": {
        "core.LeadSubmission": "fas fa-users",       # CRM icon
        "cms.ContentBlock": "fas fa-cubes",
        "cms.Direction": "fas fa-compass",
        "cms.DirectionGalleryImage": "fas fa-images",
        "cms.Service": "fas fa-concierge-bell",
        "cms.News": "fas fa-newspaper",
        "cms.MediaAsset": "fas fa-photo-video",
        "auth.User": "fas fa-user-cog",
        "auth.Group": "fas fa-users-cog",
    },
    
    # Custom CSS & JS for responsive design, mobile navigation, and permissions UI
    "custom_css": "core/css/admin_adaptive.css",
    "custom_js": "core/js/admin_adaptive.js",
}

JAZZMIN_UI_TWEAKS = {
    # Using 'darkly' gives it a premium dark-mode look, 
    # but you can change this to 'litera' or 'flatly' for a clean, light, spacious theme!
    "theme": "darkly", 
    "default_theme_mode": "dark",
}


WSGI_APPLICATION = 'config.wsgi.application'

DATABASES = get_db_config(BASE_DIR)

LANGUAGE_CODE = 'ru'
LANGUAGES = (
    ('ru', 'Russian'),
    ('ky', 'Kyrgyz'),
    ('en', 'English'),
)
MODELTRANSLATION_DEFAULT_LANGUAGE = 'ru'
MODELTRANSLATION_FALLBACK_LANGUAGES = ('ru', 'en')

TIME_ZONE = 'Asia/Bishkek'
USE_I18N = True
USE_TZ = True

STATIC_URL = '/static/'
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

CORS_ALLOW_ALL_ORIGINS = True

# Celery Configuration
CELERY_BROKER_URL = os.environ.get('CELERY_BROKER_URL', 'redis://localhost:6379/0')
CELERY_RESULT_BACKEND = os.environ.get('CELERY_RESULT_BACKEND', 'redis://localhost:6379/0')
CELERY_ACCEPT_CONTENT = ['json']
CELERY_TASK_SERIALIZER = 'json'

# Execute tasks eagerly in DEBUG so a separate celery worker terminal is not needed
if DEBUG:
    CELERY_TASK_ALWAYS_EAGER = True
    CELERY_TASK_EAGER_PROPAGATES = True

# Bitrix24
BITRIX_WEBHOOK_URL = os.environ.get('BITRIX_WEBHOOK_URL', '')

REST_FRAMEWORK = {
    'DEFAULT_THROTTLE_RATES': {
        'anon': '60/hour',
    }
}

