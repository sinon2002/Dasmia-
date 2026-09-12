# DASMIA Holding — Web Platform

Modern web platform for **DASMIA Holding**, combining a **Next.js 15 (React 19)** frontend with a **Python/Django 6** backend (multilingual CMS, Media Library, and Bitrix24 CRM integration).

---

## 🏗️ Architecture Overview

```
Dasmia-/
├── src/                  # Next.js 15 App Router Frontend (Port 4028)
│   ├── app/              # Routes, metadata & layouts
│   ├── components/       # UI sections, lightboxes, widgets
│   ├── contexts/         # Language (RU, KY, EN) & Theme
│   └── lib/              # API clients, i18n & static fallbacks
├── public/               # Static assets & repository master images
│   └── assets/images/    # Master photos (Banquets, SPA, Pools, etc.)
└── backend/              # Django 6 CMS & CRM Backend (Port 8000)
    ├── api/              # REST API v1 endpoints
    ├── cms/              # Directions, Galleries, News, Media Library
    ├── config/           # Django settings, URLs & fallback media view
    ├── core/             # Lead submissions & Bitrix24 synchronization
    └── media/            # Uploaded & optimized WebP assets (gitignored)
```

---

## 🚀 Quick Start Guide

### 1. Configure Environment

Copy `.env.example` in root and in `backend/`:

```bash
cp .env.example .env
cp backend/.env.example backend/.env
```

### 2. Setup & Start Backend (Django)

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate       # On Windows: .venv\Scripts\activate
pip install -r requirements.txt

# Apply migrations
python manage.py migrate

# CRITICAL: Seed CMS Media Library and Directions from repository images
python manage.py seed_media

# Collect static files for Jazzmin admin UI
python manage.py collectstatic --noinput

# Create your admin user
python manage.py createsuperuser

# Start Django server (port 8000)
python manage.py runserver
```

- **Admin Panel**: [http://localhost:8000/admin/](http://localhost:8000/admin/)
- **API Base**: [http://localhost:8000/api/v1/](http://localhost:8000/api/v1/)
- **Health Check**: [http://localhost:8000/healthz](http://localhost:8000/healthz)

> [!IMPORTANT]
> **Media in Admin Panel**:
> `backend/media/` is excluded from git to avoid committing binary uploads.
> Running `python manage.py seed_media` registers all photos from `public/assets/images/` into the CMS database and generates optimized WebP files.
> The backend also includes automated fallback serving (`serve_media_with_fallback`) in `config/urls.py` which dynamically serves and restores missing media on-the-fly.

### 3. Setup & Start Frontend (Next.js)

In a separate terminal, from the project root:

```bash
npm install
npm run dev
```

- **Frontend Website**: [http://localhost:4028](http://localhost:4028)

---

## 🧪 Testing

### Backend Tests (Django)
```bash
cd backend
python manage.py test
```

### Frontend Tests (Vitest)
```bash
npm run test
```

---

## 📦 Available Scripts

| Command | Directory | Description |
| :--- | :--- | :--- |
| `npm run dev` | Root | Starts Next.js dev server on `http://localhost:4028` |
| `npm run build` | Root | Builds Next.js for production |
| `npm run test` | Root | Runs Vitest frontend test suite |
| `npm run lint` | Root | Runs ESLint check |
| `python manage.py runserver` | `backend/` | Starts Django API & Admin on `http://localhost:8000` |
| `python manage.py seed_media` | `backend/` | Seeds CMS media library & directions from master images |
| `python manage.py test` | `backend/` | Runs Django unit & integration test suite |
| `python manage.py collectstatic` | `backend/` | Collects admin static assets |