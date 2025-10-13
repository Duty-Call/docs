---
sidebar_position: 1
---

# Full-Stack Local Development Setup

Get the complete DutyCall platform running locally in under 10 minutes.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs groupId="developer-type">
<TabItem value="human" label="👨‍💻 Human Developer" default>

## Quick Start (30 Seconds)

```bash
# Clone the repository
git clone git@github.com:chrisberno/dutycall.git
cd dutycall

# Backend setup
cd backend
composer install
cp .env.example .env
# Edit .env with your database credentials (see below)
php artisan key:generate
mysql -u root -e "CREATE DATABASE dutycall_local CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
php artisan migrate
php artisan db:seed --class=RoleTestUsersSeeder

# Frontend setup
cd ../frontend
npm install
cp .env.example .env.local
# Edit .env.local with backend URL (see below)

# Start everything (requires 3 terminals)
# Terminal 1: Backend server
cd backend && php artisan serve --port=8090

# Terminal 2: Ngrok tunnel + Twilio config (automated)
cd backend && ./dev-start.sh

# Terminal 3: Frontend server
cd frontend && npm run dev
```

**You're ready!** Open http://localhost:3000 and login with `agent@dutycall.net` / `password`

</TabItem>
<TabItem value="ai" label="🤖 AI Agent">

## Architecture Context

**Repository**: Monorepo with tightly coupled frontend/backend
- `backend/` - Laravel 11 API (PHP 8.2+, MySQL, Sanctum)
- `frontend/` - Next.js 15 (React, TypeScript, TailwindCSS)

**Key Patterns**:
- **Auth**: Sanctum Bearer tokens (not sessions)
- **API**: Frontend → Backend REST (localhost:8090)
- **Twilio**: WebRTC + TwiML webhooks (ngrok required)
- **Environments**: Local (MySQL + ngrok) vs Production (PostgreSQL + Railway)

**TwiML Routing**:
```php
$url = env('NGROK_URL', env('APP_URL')) . '/api/callback';
```
Local: `NGROK_URL` → ngrok → laptop
Production: `APP_URL` → Railway (no `NGROK_URL` set)

**Source Files**:
- `backend/README.md` - Technical reference
- `backend/CLAUDE.md` - Known issues, testing
- `frontend/CLAUDE.md` - Hooks, API integration
- `backend/dev-start.sh` - Automated ngrok setup

**Test Accounts** (password: `password`):
- `super@dutycall.net` - super_admin
- `admin@dutycall.net` - account_admin
- `manager@dutycall.net` - dept_manager
- `agent@dutycall.net` - agent

</TabItem>
</Tabs>

---

## Prerequisites

### System Requirements

<Tabs groupId="developer-type">
<TabItem value="human" label="👨‍💻 Human Developer" default>

**Required Software:**
- **PHP**: 8.2+ with extensions (BCMath, Ctype, Fileinfo, JSON, Mbstring, OpenSSL, PDO, Tokenizer, XML)
- **Composer**: 2.x
- **Node.js**: 18+
- **MySQL**: 8.0+ (or MariaDB 10.3+)
- **Ngrok**: Latest version

**macOS Installation:**
```bash
brew install php@8.2 mysql composer node ngrok
brew services start mysql
```

**Ubuntu/Debian Installation:**
```bash
sudo apt update
sudo apt install php8.2 php8.2-mysql php8.2-mbstring php8.2-xml composer nodejs npm mysql-server
snap install ngrok
sudo systemctl start mysql
```

</TabItem>
<TabItem value="ai" label="🤖 AI Agent">

**Dependencies**:
- PHP 8.2+ (Laravel 11 requirement)
- MySQL 8.0+ (local) / PostgreSQL (production)
- Node.js 18+ (Next.js 15 ESM support)
- Composer 2.x
- Ngrok (webhook tunneling)

**Database Schema**: `backend/database/migrations/`
- `users` - Sanctum auth, roles
- `campaigns` - Outbound campaigns
- `contacts` - Contact database
- `queue_lists` - Inbound queue
- `twilio_call_logs` - Call history

</TabItem>
</Tabs>

### Repository Access

This is a **private repository**. To clone:

1. **Request Access**: Contact CEO for GitHub collaborator access
2. **Configure Auth**:
   - **SSH (recommended)**: [Set up SSH key](https://docs.github.com/en/authentication/connecting-to-github-with-ssh)
   - **HTTPS**: Use [Personal Access Token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens)
3. **Clone**:
   ```bash
   git clone git@github.com:chrisberno/dutycall.git
   ```

---

## Backend Setup (5 minutes)

<Tabs groupId="developer-type">
<TabItem value="human" label="👨‍💻 Human Developer" default>

### 1. Install Dependencies

```bash
cd backend
composer install
```

### 2. Configure Environment

```bash
cp .env.example .env
php artisan key:generate
```

**Edit `.env` with these critical values:**

```bash
APP_NAME="Duty Call - Agent Workspace Platform"
APP_ENV=local
APP_DEBUG=true
APP_URL=http://localhost:8090

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000

# Database Configuration
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=dutycall_local
DB_USERNAME=root
DB_PASSWORD=            # Leave empty if no password

# Twilio Configuration (contact project lead for credentials)
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_PHONE_NUMBER_DEV=+18316033889
TWILIO_PHONE_NUMBER_PROD=+16282373889

# WebRTC Configuration
TWILIO_API_KEY=SKxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_API_SECRET=your_api_secret_here
TWILIO_TWIML_APP_SID=APxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_EDGE=ashburn

# Ngrok URL (updated automatically by dev-start.sh)
# NGROK_URL=https://your-ngrok-url.ngrok-free.app
```

:::info Twilio Credentials
The credentials above are for the **dev environment** test number (`+1 831 603 3889`). Contact the project lead for the full Twilio auth token and API secret.
:::

### 3. Set Up Database

```bash
# Create database
mysql -u root -p
```

```sql
CREATE DATABASE dutycall_local CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
EXIT;
```

```bash
# Run migrations
php artisan migrate

# Seed test users
php artisan db:seed --class=RoleTestUsersSeeder
```

**Test accounts created** (all use password `password`):
- `super@dutycall.net` - Full system access
- `admin@dutycall.net` - Account management
- `manager@dutycall.net` - Team oversight, campaigns
- `agent@dutycall.net` - Call handling

### 4. Start Backend Server

```bash
php artisan serve --port=8090
```

Leave this terminal running. Backend is now at `http://localhost:8090`

</TabItem>
<TabItem value="ai" label="🤖 AI Agent">

**Laravel 11 + Sanctum + Twilio SDK**

**Environment Pattern**:
```php
// Dual-environment routing
$url = env('NGROK_URL', env('APP_URL')) . '/api/callback';
```

**Seeder**: `RoleTestUsersSeeder` creates 4 roles
**Port**: Must use 8090 (hardcoded in frontend)

**Key Controllers**:
- `TwilioWebhookController` - TwiML handlers
- `DialerController` - Campaign execution
- `VoiceTokenController` - WebRTC tokens
- `AnalyticsController` - Call reporting

</TabItem>
</Tabs>

---

## Frontend Setup (2 minutes)

<Tabs groupId="developer-type">
<TabItem value="human" label="👨‍💻 Human Developer" default>

### 1. Install Dependencies

```bash
cd frontend  # (from project root)
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env.local
```

**Edit `.env.local`:**

```bash
# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:8090

# Environment
NEXT_PUBLIC_APP_ENV=local
```

### 3. Start Frontend Server

```bash
npm run dev
```

Frontend is now at `http://localhost:3000`

</TabItem>
<TabItem value="ai" label="🤖 AI Agent">

**Next.js 15 + App Router + TypeScript**

**API Client**: `src/lib/teleman-api.ts`
- Sanctum Bearer tokens
- localStorage persistence
- Auto-includes `Authorization` header

**Auth Context**: `src/contexts/AuthContext.tsx`
- Session state management
- Login/logout methods
- localStorage sync

**Key Hooks**:
- `useTwilioDevice` - WebRTC lifecycle
- `useInboundQueue` - Queue management
- `useAuth` - Auth context

</TabItem>
</Tabs>

---

## The Magic of dev-start.sh

<Tabs groupId="developer-type">
<TabItem value="human" label="👨‍💻 Human Developer" default>

DutyCall uses **ngrok** to tunnel localhost to the internet for Twilio webhook callbacks.

SPOK automated this with the `dev-start.sh` script.

### Automated Setup (Recommended)

In a **new terminal** (keep backend running):

```bash
cd backend
./dev-start.sh
```

**What it does automatically:**
1. Starts ngrok tunnel to `localhost:8090`
2. Extracts ngrok HTTPS URL (e.g., `https://abc123.ngrok-free.app`)
3. Updates `.env` with `NGROK_URL`
4. Configures Twilio dev number (`+1 831 603 3889`) to point to ngrok
5. Sets up webhook endpoints (inbound, status, queue)
6. Keeps ngrok running (press `Ctrl+C` to stop)

**Expected Output:**
```
🚀 Starting DutyCall Development Environment...

📡 Starting ngrok tunnel...
✅ Ngrok tunnel established: https://71aadcf03d46.ngrok-free.app

🔧 Configuring Twilio dev number (+1 831 603 3889)...
✅ Dev number configured
   Voice URL: https://71aadcf03d46.ngrok-free.app/api/twilio/inbound

✅ Development environment ready!

📞 Dev Number: +1 831 603 3889
🌐 Ngrok URL: https://71aadcf03d46.ngrok-free.app
🖥️  Backend: http://localhost:8090
🎨 Frontend: http://localhost:3000

💡 Call +1 831 603 3889 to test inbound calls locally
```

:::tip Ngrok Session Limits
Free ngrok accounts have session limits. If ngrok stops:
```bash
pkill -f ngrok
./dev-start.sh  # Restart
```
:::

### Manual Ngrok Setup (If Script Fails)

```bash
# Start ngrok
ngrok http 8090

# Copy HTTPS URL from ngrok output
# Update .env manually:
NGROK_URL=https://abc123.ngrok-free.app

# Restart backend
pkill -f "php artisan serve"
php artisan serve --port=8090

# Configure Twilio Console:
# Phone Numbers > +1 831 603 3889 > Voice Configuration
# Voice URL: https://abc123.ngrok-free.app/api/twilio/inbound (POST)
# Status Callback: https://abc123.ngrok-free.app/api/twilio/status (POST)
```

</TabItem>
<TabItem value="ai" label="🤖 AI Agent">

**Purpose**: Expose localhost for Twilio webhooks

**Flow**:
1. Ngrok: `https://random.ngrok-free.app` → `localhost:8090`
2. Script updates `.env` with `NGROK_URL`
3. Script calls Twilio API to update phone webhooks
4. Twilio sends callbacks to ngrok → laptop

**Script Logic** (`dev-start.sh`):
```bash
# Extract ngrok URL
NGROK_URL=$(curl -s http://localhost:4040/api/tunnels | jq -r '.tunnels[0].public_url')

# Update .env
sed -i '' "s|NGROK_URL=.*|NGROK_URL=$NGROK_URL|" .env

# Configure Twilio
curl -X POST "https://api.twilio.com/2010-04-01/Accounts/$SID/IncomingPhoneNumbers/$NUM.json" \
  --data-urlencode "VoiceUrl=$NGROK_URL/api/twilio/inbound"
```

**Why**: Without ngrok, Twilio can't reach localhost → calls fail

</TabItem>
</Tabs>

---

## Testing End-to-End

<Tabs groupId="developer-type">
<TabItem value="human" label="👨‍💻 Human Developer" default>

Verify your setup with the inbound call flow:

### 1. Login to Frontend

1. Open `http://localhost:3000`
2. Login: `agent@dutycall.net` / `password`
3. Dashboard should load

### 2. Navigate to Queue Dashboard

1. Click **"Queue"** in sidebar
2. Queue dashboard loads
3. Verify **Device Status**: "Registered" (green)

### 3. Set Availability

1. Click **"Available"** button
2. Status → "Available" (green)
3. System polls for calls every 2 seconds

### 4. Make Test Call

1. From your phone, call `+1 831 603 3889`
2. Hear hold music
3. Call appears in Queue Dashboard within 2 seconds

### 5. Accept Call

1. Click **"Accept Call"**
2. Browser connects via WebRTC (may prompt for mic)
3. Within 2-3 seconds, connected
4. Verify **two-way audio**

### 6. End Call

1. Hangup from phone OR click **"Hangup"**
2. Call disappears from queue
3. Call logged in history

### Testing Manual Dialer (Outbound)

1. Navigate to **"Dialer"**
2. Click **"Manual Dialer"** tab
3. Enter phone number
4. Click **"Call"**
5. Verify two-way audio

:::tip Troubleshooting
If calls don't connect:
- Backend on `localhost:8090`?
- Ngrok active? `curl http://localhost:4040/api/tunnels`
- `.env` has correct `NGROK_URL`?
- Device Status "Registered"?
:::

</TabItem>
<TabItem value="ai" label="🤖 AI Agent">

**Test Flow**:

```
Caller → Twilio → Ngrok → /api/twilio/inbound → <Enqueue>
                                                      ↓
                                          queue_lists table
                                                      ↓
Frontend polls /api/queue/calls → Agent accepts
                                        ↓
              Device.connect() → /api/twilio/agent-dial-queue
                                        ↓
                    <Dial><Queue> → Twilio bridges calls
```

**Endpoints**:
- `POST /api/twilio/inbound` - Enqueue
- `POST /api/twilio/agent-dial-queue` - WebRTC join
- `POST /api/twilio/dequeue` - Cleanup
- `GET /api/queue/calls` - Frontend polling
- `POST /api/queue/accept-call` - Trigger dial-in

**WebRTC Events**:
```javascript
device.on('registered', () => console.log('Ready'));
device.on('incoming', call => call.accept());
device.on('disconnect', call => console.log('Ended'));
```

</TabItem>
</Tabs>

---

## Three Terminals Cheat Sheet

Keep these running:

```bash
# Terminal 1: Backend Server
cd backend
php artisan serve --port=8090

# Terminal 2: Ngrok + Twilio Config
cd backend
./dev-start.sh

# Terminal 3: Frontend Server
cd frontend
npm run dev
```

**Access Points:**
- Frontend: http://localhost:3000
- Backend: http://localhost:8090
- Ngrok Dashboard: http://localhost:4040

---

## Troubleshooting

<Tabs groupId="developer-type">
<TabItem value="human" label="👨‍💻 Human Developer" default>

### Port 8090 Already in Use

```bash
lsof -ti:8090 | xargs kill -9
php artisan serve --port=8090
```

### MySQL Connection Refused

```bash
# macOS
brew services list
brew services start mysql

# Linux
sudo systemctl status mysql
sudo systemctl start mysql

# Test
mysql -u root -p -e "SELECT 1"
```

### Frontend Can't Connect to Backend

**Check:**
1. Backend on `localhost:8090`?
2. Frontend `.env.local`: `NEXT_PUBLIC_API_URL=http://localhost:8090`
3. CORS in `backend/config/cors.php`

**Fix:**
```bash
cd backend
php artisan cache:clear
php artisan config:clear
```

### Twilio Webhooks 404

**Check:**
1. Backend on port 8090
2. Ngrok active: `curl http://localhost:4040/api/tunnels`
3. `.env` has `NGROK_URL`
4. Twilio dev number configured

**Fix:**
```bash
pkill -f "php artisan serve"
php artisan serve --port=8090
```

### Device Not Registering

**Check:**
1. Browser console errors
2. Microphone permissions
3. Twilio credentials in `.env`
4. Token endpoint: `http://localhost:8090/api/voice/token`

**Debug:**
```bash
curl -X POST http://localhost:8090/api/voice/token \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"recording_enabled": false}'
```

### Ngrok Session Expired

```bash
pkill -f ngrok
./dev-start.sh
```

</TabItem>
<TabItem value="ai" label="🤖 AI Agent">

**Common Issues**:
1. Port conflicts: `lsof -ti:8090 | xargs kill -9`
2. Database: Check MySQL service
3. CORS: Verify `backend/config/cors.php`
4. Webhook 404s: Restart backend after `.env` changes
5. WebRTC: Check Twilio credentials
6. Ngrok: `pkill -f ngrok && ./dev-start.sh`

**Debug Tools**:
- Ngrok: `http://localhost:4040` - Webhook inspector
- Laravel logs: `tail -f backend/storage/logs/laravel.log`
- Browser: DevTools Network tab

**Critical Fixes** (do not overwrite):
- `AnalyticsController.php:691,716` - Schema fixes
- `config/cors.php:18` - Analytics CORS
- `TwilioWebhookController.php:304-310` - Orphan prevention

</TabItem>
</Tabs>

---

## Next Steps

Now that you're running locally:

1. **Explore Roles** - Login as different users
2. **Test Campaigns** - Create and run campaigns
3. **Review API** - [API Reference](/developers/api-reference)
4. **Production Config** - [Environment Configuration](/developers/getting-started/environment-config)

## Need Help?

- **Backend**: `backend/README.md`, `backend/CLAUDE.md`
- **Frontend**: `frontend/CLAUDE.md`
- **Webhooks**: Ngrok dashboard at `http://localhost:4040`
- **Questions**: Contact project lead

---

**Built with Laravel 11, Next.js 15, and Twilio Programmable Voice**
