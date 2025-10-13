---
id: overview
title: Developer Documentation Overview
sidebar_label: Overview
---

# Developer Documentation

Welcome to the DutyCall developer documentation. This guide helps you understand, build, and deploy the DutyCall contact center platform.

## What is DutyCall?

DutyCall is an **enterprise contact center platform** that enables voice, SMS, and omnichannel communication. Built for scalability and real-time performance, it powers inbound call queues, outbound campaign dialers, and browser-based WebRTC calling.

**Key Features:**
- **Inbound Call Queue** - Hold music, agent routing, WebRTC call handling
- **Outbound Dialer** - Campaign management with automated calling
- **Manual Dialer** - Browser-based calling for live conversations
- **Call Analytics** - Real-time reporting and historical analytics
- **Role-Based Access** - Super Admin, Admin, Manager, Agent roles

---

## Architecture Overview

DutyCall is a **full-stack monorepo** with tightly coupled frontend and backend components. Both are required for any functionality.

### Technology Stack

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend                              │
│  Next.js 15 (React, TypeScript, TailwindCSS)               │
│  localhost:3000 (local) | Vercel (production)               │
└─────────────────────────────────────────────────────────────┘
                              ↓ REST API
┌─────────────────────────────────────────────────────────────┐
│                        Backend                               │
│  Laravel 11 (PHP 8.2+, Sanctum Auth)                       │
│  localhost:8090 (local) | Railway (production)              │
└─────────────────────────────────────────────────────────────┘
                              ↓ TwiML Webhooks
┌─────────────────────────────────────────────────────────────┐
│                    Twilio Platform                           │
│  Programmable Voice, WebRTC, Phone Numbers                  │
└─────────────────────────────────────────────────────────────┘
```

### Repository Structure

```
dutycall/
├── backend/                    # Laravel 11 API
│   ├── app/
│   │   ├── Http/Controllers/
│   │   │   ├── TwilioWebhookController.php    # TwiML handlers
│   │   │   ├── DialerController.php           # Campaign execution
│   │   │   └── Api/VoiceTokenController.php   # WebRTC tokens
│   │   ├── Models/
│   │   │   ├── User.php
│   │   │   ├── Campaign.php
│   │   │   └── QueueList.php
│   │   └── Services/
│   │       └── TwilioService.php
│   ├── database/migrations/
│   ├── routes/
│   │   ├── api.php             # Sanctum-protected API routes
│   │   └── web.php
│   ├── dev-start.sh            # Automated ngrok + Twilio setup
│   ├── README.md               # Comprehensive backend reference
│   ├── CLAUDE.md               # Known issues, testing procedures
│   └── .env                    # Local configuration (gitignored)
│
└── frontend/                   # Next.js 15
    ├── src/
    │   ├── app/                # App Router pages
    │   │   ├── dashboard/      # Main application UI
    │   │   │   ├── queue/      # Inbound queue dashboard
    │   │   │   ├── dialer/     # Manual + campaign dialer
    │   │   │   └── reports/    # Analytics
    │   │   └── login/
    │   ├── components/
    │   │   ├── queue/          # Queue UI components
    │   │   └── ui/             # Reusable UI components
    │   ├── hooks/
    │   │   ├── useTwilioDevice.ts    # WebRTC Device lifecycle
    │   │   └── useInboundQueue.ts    # Queue state management
    │   ├── contexts/
    │   │   └── AuthContext.tsx       # Authentication state
    │   └── lib/
    │       └── teleman-api.ts        # Backend API client
    ├── CLAUDE.md               # Frontend architecture, hooks
    └── .env.local              # Frontend config (gitignored)
```

---

## How It Works

### Authentication Flow

```
1. User visits frontend → Redirected to login
2. Login form → POST /api/auth/login → Laravel Sanctum
3. Backend returns Bearer token
4. Frontend stores token in localStorage
5. All API requests include: Authorization: Bearer {token}
```

**Implementation:**
- **Backend**: Laravel Sanctum (token-based, not session-based)
- **Frontend**: `AuthContext.tsx` manages session state
- **API Client**: `teleman-api.ts` auto-includes token in headers

### Call Flow (Inbound)

```
1. Caller dials Twilio number (+1 831 603 3889 dev | +1 628 237 3889 prod)
2. Twilio → POST /api/twilio/inbound → Backend
3. Backend returns <Enqueue> TwiML with hold music
4. Call enters queue (queue_lists table)
5. Frontend polls /api/queue/calls every 2 seconds
6. Agent clicks "Accept Call" → Backend responds with dial_queue action
7. Frontend executes Device.connect() → POST /api/twilio/agent-dial-queue
8. Backend returns <Dial><Queue> TwiML
9. Twilio bridges caller ↔ agent (two-way audio)
10. Call ends → POST /api/twilio/dequeue → Queue cleanup
```

**Key Pattern**: "Agent dial-into-queue" - The agent's browser initiates the connection, not the other way around. This is Twilio's recommended pattern for queue systems.

### TwiML Routing Intelligence

DutyCall uses a clever pattern to handle local development vs production:

```php
// backend/app/Http/Controllers/TwilioWebhookController.php
$waitUrl = env('NGROK_URL', env('APP_URL')) . '/api/twilio/queue-wait';
```

**Local Development:**
- `NGROK_URL` is set (e.g., `https://abc123.ngrok-free.app`)
- Callbacks go through ngrok tunnel → developer's laptop
- Automatically configured by `./dev-start.sh` script

**Production:**
- `NGROK_URL` is not set
- Falls back to `APP_URL` (e.g., `https://dutycall-production.up.railway.app`)
- Callbacks go directly to Railway

This pattern appears throughout the codebase wherever Twilio callbacks are generated.

---

## Two-Environment System

DutyCall operates differently in local development vs production:

| Environment | Backend | Frontend | Database | Twilio Number | Webhook Delivery |
|-------------|---------|----------|----------|---------------|------------------|
| **Local** | localhost:8090 | localhost:3000 | MySQL | +1 831 603 3889 | Ngrok tunnel |
| **Production** | Railway | Vercel | PostgreSQL | +1 628 237 3889 | Direct HTTPS |

### Local Development Environment

**Purpose**: Fast development iteration with instant feedback

**Stack:**
- Backend: `php artisan serve --port=8090`
- Frontend: `npm run dev` (port 3000)
- Database: MySQL 8.0+ (localhost)
- Twilio Webhooks: Ngrok tunnel (automated by `dev-start.sh`)

**Advantages:**
- No deployment delays
- Full debugging with `APP_DEBUG=true`
- Test with real Twilio calls locally
- Instant code changes (hot reload)

### Production Environment

**Purpose**: Reliable, scalable deployment for end users

**Stack:**
- Backend: Railway (containerized Laravel)
- Frontend: Vercel (edge-deployed Next.js)
- Database: PostgreSQL (Railway managed)
- Twilio Webhooks: Direct HTTPS to Railway

**Advantages:**
- Auto-scaling
- High availability
- CDN distribution (Vercel)
- Professional monitoring

---

## Key Technologies

### Laravel 11 (Backend)

**Why Laravel:**
- Robust PHP framework with excellent documentation
- Sanctum for API authentication
- Eloquent ORM for database operations
- Queue system for async tasks
- Built-in testing framework

**Critical Packages:**
- `laravel/sanctum` - API authentication
- `twilio/sdk` - Twilio API integration
- `predis/predis` - Redis for queues/cache

### Next.js 15 (Frontend)

**Why Next.js:**
- React framework with App Router
- TypeScript for type safety
- Server-side rendering support
- Built-in API routes
- Excellent developer experience

**Critical Packages:**
- `@twilio/voice-sdk` - WebRTC calling
- `@tanstack/react-query` - API state management
- `tailwindcss` - Utility-first CSS

### Twilio Programmable Voice

**Why Twilio:**
- Industry-leading call quality
- WebRTC support for browser calling
- Programmable TwiML for call control
- Global phone number availability
- Comprehensive API

**Key Features Used:**
- Phone Numbers (inbound/outbound calling)
- TwiML Apps (WebRTC routing)
- Queues (hold music, agent routing)
- Access Tokens (browser Device authentication)
- Webhooks (call status callbacks)

---

## Getting Started

Ready to start developing? Follow these guides in order:

1. **[Local Setup](/developers/getting-started/local-setup)** - Get DutyCall running on your laptop in 10 minutes
2. **[Environment Configuration](/developers/getting-started/environment-config)** - Understand `.env` files and configuration
3. **[API Reference](/developers/api-reference)** - Explore available API endpoints
4. **[Webhooks](/developers/webhooks)** - Learn how Twilio webhooks work

### Quick Links

- **Backend Reference**: See `backend/README.md` in the repository
- **Frontend Architecture**: See `frontend/CLAUDE.md` in the repository
- **API Collection**: Postman collection at `backend/dutycall-api-collection.json`
- **Troubleshooting**: Check [Local Setup Troubleshooting](/developers/getting-started/local-setup#troubleshooting)

---

## Development Workflow

### Daily Development

```bash
# Terminal 1: Backend Server
cd backend
php artisan serve --port=8090

# Terminal 2: Ngrok + Twilio Config (automated)
cd backend
./dev-start.sh

# Terminal 3: Frontend Server
cd frontend
npm run dev
```

**Access Points:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:8090
- Ngrok Dashboard: http://localhost:4040 (view webhook requests)

### Testing Changes

**Backend Changes:**
```bash
# No restart needed - PHP reloads automatically
# Exception: .env changes require restart
pkill -f "php artisan serve"
php artisan serve --port=8090
```

**Frontend Changes:**
```bash
# Hot reload works automatically
# Exception: .env.local changes require restart
npm run dev
```

**Database Changes:**
```bash
php artisan migrate              # Run new migrations
php artisan migrate:fresh --seed # Reset and reseed (dev only!)
```

---

## Role-Based Access Control

DutyCall uses a four-tier role system:

| Role | Database Value | Permissions | Use Case |
|------|----------------|-------------|----------|
| **Super Admin** | `super_admin` | Full system access, all accounts | Platform administrators |
| **Account Admin** | `account_admin` | Manage account, users, settings | Customer administrators |
| **Manager** | `dept_manager` | Team oversight, campaigns, reports | Team leads, supervisors |
| **Agent** | `agent` | Call handling, personal queue | Call center agents |

**Implementation:**
- **Backend**: `RoleMiddleware.php` protects routes
- **Frontend**: `AuthContext.tsx` provides role checking
- **Database**: `users.role` column (enum)

**Test Accounts** (password: `password`):
- `super@dutycall.net` - super_admin
- `admin@dutycall.net` - account_admin
- `manager@dutycall.net` - dept_manager
- `agent@dutycall.net` - agent

---

## Support & Resources

### Getting Help

- **Local Setup Issues**: See [Troubleshooting Guide](/developers/getting-started/local-setup#troubleshooting)
- **Configuration Questions**: See [Environment Configuration](/developers/getting-started/environment-config)
- **API Questions**: See [API Reference](/developers/api-reference)
- **General Questions**: Contact project lead

### Contributing

This is a private repository. To contribute:
1. Request GitHub collaborator access from CEO
2. Clone the repository
3. Follow the [Local Setup Guide](/developers/getting-started/local-setup)
4. Create feature branches for changes
5. Test thoroughly before submitting pull requests

### Documentation

- **This Site**: Comprehensive guides for developers
- **Backend README**: Technical reference in `backend/README.md`
- **Backend CLAUDE.md**: Known issues, testing procedures, critical fixes
- **Frontend CLAUDE.md**: Hooks, components, API integration patterns

---

**Ready to build?** Start with the [Full-Stack Local Setup Guide](/developers/getting-started/local-setup) →
