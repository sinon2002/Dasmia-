# DASMIA Backend

This is the Python/Django backend for the DASMIA Holding corporate website. It provides multilingual CMS capabilities and reliable lead ingestion synchronized to Bitrix24.

## Features
- Multilingual content (RU, KY, EN) via `django-modeltranslation`.
- Dynamic models for Directions, Services, and News.
- Form lead ingestion with JSON payload validation, honeypot spam protection, and Captcha validation.
- IP-based rate limiting on lead submissions (bypassed in `DEBUG` mode for local development).
- Background sync to Bitrix24 `crm.lead.add` with automated fallback and optional Celery + Redis retries.
- PostgreSQL as the primary database.

---

## 🚀 Quick Setup by Operating System

### 1. Start Services (PostgreSQL & Redis)

Run from the `backend/` directory:

```bash
docker compose up -d
```
*(Or use `docker-compose up -d` on older Docker versions).*

---

### 2. Environment Configuration (`.env`)

Create a `.env` file in the `backend/` directory:

```env
# Core Django
SECRET_KEY=your-secret-key-here
DEBUG=True
ALLOWED_HOSTS=*

# Database overrides (PostgreSQL)
USE_POSTGRES=True
POSTGRES_DB=dasmia
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_HOST=localhost
POSTGRES_PORT=5432

# Bitrix24 & Celery
BITRIX_WEBHOOK_URL=https://your-domain.bitrix24.ru/rest/1/your-webhook-code/
CELERY_BROKER_URL=redis://localhost:6379/0
CELERY_RESULT_BACKEND=redis://localhost:6379/0
```

---

### 3. Install Dependencies & Virtual Environment

Choose your operating system below:

#### 🪟 Windows (PowerShell / Command Prompt)

```powershell
# 1. Navigate to backend
cd backend

# 2. Create virtual environment
python -m venv .venv

# 3. Activate virtual environment
# In PowerShell (if blocked, run: Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser):
.venv\Scripts\Activate.ps1
# Or in Command Prompt (CMD):
.venv\Scripts\activate.bat

# 4. Install dependencies
python -m pip install --upgrade pip
pip install -r requirements.txt
```

#### 🍎 macOS (Terminal)

```bash
# 1. Navigate to backend
cd backend

# 2. Create virtual environment (requires Python 3.10+)
python3 -m venv .venv

# 3. Activate virtual environment
source .venv/bin/activate

# 4. Install dependencies
pip install --upgrade pip
pip install -r requirements.txt
```

#### 🐧 Linux (Ubuntu / Debian / Arch / Fedora)

```bash
# 1. Install prerequisites (Debian/Ubuntu)
sudo apt update && sudo apt install -y python3-venv python3-pip libpq-dev

# 2. Navigate to backend
cd backend

# 3. Create virtual environment
python3 -m venv .venv

# 4. Activate virtual environment
source .venv/bin/activate

# 5. Install dependencies
pip install --upgrade pip
pip install -r requirements.txt
```

---

### 4. Database Migrations & Superuser Creation

With your virtual environment active:

```bash
# Apply database migrations
python manage.py migrate

# Collect static assets for admin UI
python manage.py collectstatic --noinput

# Create your admin superuser
python manage.py createsuperuser
```

---

### 5. Running the Application

#### A. Django Development Server
```bash
python manage.py runserver
```
- API Base: `http://localhost:8000/api/v1/`
- Admin Panel: `http://localhost:8000/admin/`
- Health Check: `http://localhost:8000/healthz`

#### B. Celery Background Worker (Optional)
> [!NOTE]
> In local development (`DEBUG=True`), tasks execute automatically in background threads. To test full Celery worker processing:

- **Linux / macOS**:
  ```bash
  celery -A config worker --loglevel=info
  ```
- **Windows** *(requires `--pool=solo`)*:
  ```powershell
  celery -A config worker --loglevel=info --pool=solo
  ```

---

### 6. Testing Lead Submissions & Bitrix24 Sync

Send a test lead using `curl`:

```bash
curl -X POST http://localhost:8000/api/v1/leads/ \
  -H "Content-Type: application/json" \
  -d '{
    "form_type": "fitness",
    "name": "Тест Тестов",
    "phone": "+996555123456",
    "payload": {
      "direction": "fitness"
    },
    "captcha_token": "frontend-token"
  }'
```

Expected response:
```json
{"success": true, "id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"}
```

Check `http://localhost:8000/admin/core/leadsubmission/` to verify that the lead was created and synchronized to Bitrix24 (`Status: Synced Successfully`).

