import os
from pathlib import Path
import dj_database_url

BASE_DIR = Path(__file__).resolve().parent.parent


# ==============================
# SECURITY
# ==============================

SECRET_KEY = os.environ.get(
    'SECRET_KEY',
    'django-insecure-change-this-in-production'
)

DEBUG = 'RENDER' not in os.environ

ALLOWED_HOSTS = [
    '127.0.0.1',
    'localhost',
]

RENDER_EXTERNAL_HOSTNAME = os.environ.get('RENDER_EXTERNAL_HOSTNAME')

if RENDER_EXTERNAL_HOSTNAME:
    ALLOWED_HOSTS.append(RENDER_EXTERNAL_HOSTNAME)


# ==============================
# APPLICATIONS
# ==============================

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    'rest_framework',
    'corsheaders',

    'apps.members',
    'apps.bills',
    'apps.questions',
    'apps.committees',
    'accounts',
    'proceedings',
    'attendance',
    'notifications',
    'documents',
]


# ==============================
# MIDDLEWARE
# ==============================

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',

    'corsheaders.middleware.CorsMiddleware',

    'django.contrib.sessions.middleware.SessionMiddleware',

    'django.middleware.common.CommonMiddleware',

    'django.middleware.csrf.CsrfViewMiddleware',

    'django.contrib.auth.middleware.AuthenticationMiddleware',

    'django.contrib.messages.middleware.MessageMiddleware',

    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]


# ==============================
# URL / WSGI
# ==============================

ROOT_URLCONF = 'parliament_project.urls'

WSGI_APPLICATION = 'parliament_project.wsgi.application'


# ==============================
# TEMPLATES
# ==============================

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',

        'DIRS': [],

        'APP_DIRS': True,

        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',

                'django.contrib.auth.context_processors.auth',

                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]


# ==============================
# DATABASE
# ==============================

# Render PostgreSQL
# Local computer MSSQL

DATABASE_URL = os.environ.get('DATABASE_URL')

if DATABASE_URL:
    DATABASES = {
        'default': dj_database_url.parse(
            DATABASE_URL,
            conn_max_age=600,
            ssl_require=True,
        )
    }

else:
    DATABASES = {
        'default': {
            'ENGINE': 'mssql',
            'NAME': os.environ.get(
                'DB_NAME',
                'ParliamentPortalDB'
            ),
            'HOST': os.environ.get(
                'DB_HOST',
                r'.\SQLEXPRESS'
            ),
            'USER': os.environ.get('DB_USER', ''),
            'PASSWORD': os.environ.get('DB_PASSWORD', ''),
            'OPTIONS': {
                'driver': os.environ.get(
                    'DB_DRIVER',
                    'ODBC Driver 18 for SQL Server'
                ),
                'Trusted_Connection': os.environ.get(
                    'DB_TRUSTED_CONNECTION',
                    'yes'
                ),
                'extra_params': 'TrustServerCertificate=yes;',
            },
        }
    }


# ==============================
# PASSWORD VALIDATION
# ==============================

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME':
            'django.contrib.auth.password_validation.'
            'UserAttributeSimilarityValidator',
    },

    {
        'NAME':
            'django.contrib.auth.password_validation.'
            'MinimumLengthValidator',
    },

    {
        'NAME':
            'django.contrib.auth.password_validation.'
            'CommonPasswordValidator',
    },

    {
        'NAME':
            'django.contrib.auth.password_validation.'
            'NumericPasswordValidator',
    },
]


# ==============================
# INTERNATIONALIZATION
# ==============================

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'Asia/Kolkata'

USE_I18N = True

USE_TZ = True


# ==============================
# STATIC FILES
# ==============================

STATIC_URL = '/static/'

if not DEBUG:
    STATIC_ROOT = BASE_DIR / 'staticfiles'

    STATICFILES_STORAGE = (
        'whitenoise.storage.CompressedManifestStaticFilesStorage'
    )


# ==============================
# DEFAULT PRIMARY KEY
# ==============================

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'


# ==============================
# CORS
# ==============================

CORS_ALLOWED_ORIGINS = [
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'http://localhost:5174',
    'http://127.0.0.1:5174',
]

FRONTEND_URL = os.environ.get('FRONTEND_URL')

if FRONTEND_URL:
    CORS_ALLOWED_ORIGINS.append(FRONTEND_URL)


# ==============================
# REST FRAMEWORK
# ==============================

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ],
}