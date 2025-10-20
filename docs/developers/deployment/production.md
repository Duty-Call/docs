---
sidebar_position: 1
---

# Production Deployment Guide

**Last Updated:** October 19, 2025
**Status:** Production-tested and verified

Choose the right deployment platform for your DutyCall production environment.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

## Overview

<Tabs groupId="developer-type">
<TabItem value="human" label="👨‍💻 Human Developer" default>

DutyCall consists of two main components:
- **Backend**: Laravel 11 API (PHP 8.3 + MySQL/PostgreSQL)
- **Frontend**: Next.js 15 SPA (React)

This guide helps you choose the right hosting platform and provides links to detailed deployment guides.

</TabItem>
<TabItem value="ai" label="🤖 AI Agent">

**Architecture Stack**:
- Backend: Laravel 11 (PHP 8.3)
- Frontend: Next.js 15 (React)
- Database: MySQL (DigitalOcean) or PostgreSQL (Railway)
- Deployment: Multi-platform support

**Decision Tree**:
1. Production → DigitalOcean Droplet
2. Development/Staging → Railway
3. Frontend → Vercel (always)

</TabItem>
</Tabs>

---

## Platform Comparison

<Tabs groupId="developer-type">
<TabItem value="human" label="👨‍💻 Human Developer" default>

| Feature | DigitalOcean Droplet | Railway | Vercel (Frontend) |
|---------|---------------------|---------|-------------------|
| **Control** | Full root access | Managed platform | Managed platform |
| **Reliability** | You manage it | Platform-dependent | Excellent |
| **Cost** | $12/month (2GB) | Free tier available | Free tier available |
| **Env Var Stability** | ✅ Stable | ⚠️ Has failed in production | ✅ Stable |
| **Monitoring** | You configure it | Built-in (basic) | Built-in (basic) |
| **Setup Time** | ~60 minutes | ~45 minutes | ~15 minutes |
| **Recommended For** | **Production backend** | Development/staging | **Production frontend** |

</TabItem>
<TabItem value="ai" label="🤖 AI Agent">

**Platform Capabilities**:

| Platform | Type | Database | SSL | Auto-Deploy | Control Level |
|----------|------|----------|-----|-------------|---------------|
| DigitalOcean | IaaS (VPS) | MySQL 8.0+ | Let's Encrypt | Manual | Full |
| Railway | PaaS | PostgreSQL | Automatic | Git push | Limited |
| Vercel | Edge PaaS | N/A | Automatic | Git push | Limited |

**Decision Factors**:
- **Stability needed** → DigitalOcean
- **Speed to market** → Railway
- **Frontend only** → Vercel

</TabItem>
</Tabs>

---

## ⚠️ Railway Warning - October 19, 2025 Incident

<Tabs groupId="developer-type">
<TabItem value="human" label="👨‍💻 Human Developer" default>

:::danger Production Outage on Railway
**Date:** October 19, 2025
**Impact:** Complete production outage - Login broken for all users
**Root Cause:** Railway `FRONTEND_URL` environment variable disappeared without warning
**Duration:** 6+ hours (detection + migration to DigitalOcean)
**Lesson Learned:** **Do NOT rely on Railway for production without extensive monitoring**
:::

**If you choose Railway for production, you MUST:**
1. Set up external monitoring (UptimeRobot - see [Monitoring section](#monitoring-setup))
2. Document all environment variables externally (password manager, encrypted file)
3. Configure manual database backups
4. Have a migration plan ready for another platform

**Our Recommendation:** Use Railway for development/staging only. Use DigitalOcean for production.

</TabItem>
<TabItem value="ai" label="🤖 AI Agent">

**Incident Report**:
- **Event**: Railway env var `FRONTEND_URL` disappeared
- **Effect**: CORS failure, complete auth breakdown
- **Recovery**: 6+ hour migration to DigitalOcean
- **Conclusion**: Railway unreliable for production workloads

**Railway Risk Factors**:
- Environment variables can disappear
- No automatic backups on free tier
- Limited infrastructure control
- Platform-dependent reliability

**Mitigation if using Railway**:
- External monitoring (mandatory)
- External env var documentation
- Manual backup schedule
- Migration plan to DigitalOcean ready

</TabItem>
</Tabs>

---

## Deployment Guides

<Tabs groupId="developer-type">
<TabItem value="human" label="👨‍💻 Human Developer" default>

### Backend Deployment Options

#### ✅ Recommended: DigitalOcean Droplet (Production)

**Best for:** Production environments requiring stability and control

**What you get:**
- Full root access to Ubuntu 22.04 server
- Stable environment variables
- Predictable $12/month flat rate
- Complete control over infrastructure

**Time to deploy:** ~60 minutes
**Technical level:** Intermediate-Advanced

👉 **[Deploy to DigitalOcean →](/developers/deployment/backend/digitalocean)**

---

#### ⚠️ Alternative: Railway (Development/Staging)

**Best for:** Development, staging, and rapid prototyping

**What you get:**
- Managed platform with auto-deploy
- PostgreSQL database included
- Free tier ($5/month credit)
- Quick setup

**Time to deploy:** ~45 minutes
**Technical level:** Intermediate

**Known issues:**
- Environment variables can disappear (production incident Oct 19, 2025)
- Requires external monitoring and backup documentation

👉 **[Deploy to Railway →](/developers/deployment/backend/railway)**

---

### Frontend Deployment (Always Recommended)

#### ✅ Vercel (Production & Development)

**Best for:** All Next.js deployments

**What you get:**
- Edge network deployment (global CDN)
- Automatic SSL and caching
- Preview deployments for PRs
- Free tier (generous limits)

**Time to deploy:** ~15 minutes
**Technical level:** Beginner

👉 **[Deploy Frontend to Vercel →](#vercel-frontend-deployment)**

</TabItem>
<TabItem value="ai" label="🤖 AI Agent">

**Deployment Paths**:

```
Backend Options:
├── DigitalOcean Droplet (Recommended for Production)
│   ├── Time: ~60 min
│   ├── Control: Full
│   ├── Cost: $12/month fixed
│   └── Guide: /developers/deployment/backend/digitalocean
│
└── Railway (Use for Dev/Staging Only)
    ├── Time: ~45 min
    ├── Control: Limited
    ├── Cost: Free tier + usage
    └── Guide: /developers/deployment/backend/railway

Frontend:
└── Vercel (Always)
    ├── Time: ~15 min
    ├── Control: Limited
    ├── Cost: Free tier
    └── See section below
```

**Quick Decision**:
- Production → DigitalOcean + Vercel
- Staging → Railway + Vercel
- Development → Local + Railway (if needed)

</TabItem>
</Tabs>

---

## Vercel Frontend Deployment

<Tabs groupId="developer-type">
<TabItem value="human" label="👨‍💻 Human Developer" default>

### Prerequisites

- Vercel account
- GitHub repository connected to Vercel
- Backend API deployed (DigitalOcean or Railway)

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 2: Link Project

```bash
cd frontend/
vercel link  # Select your project
```

### Step 3: Configure Environment Variables

**CRITICAL:** Add to ALL THREE environments (production, preview, development)

```bash
# Production
echo "https://api.dutycall.net" | vercel env add NEXT_PUBLIC_API_URL production

# Preview (PR deployments)
echo "https://api.dutycall.net" | vercel env add NEXT_PUBLIC_API_URL preview

# Development
echo "http://localhost:8090" | vercel env add NEXT_PUBLIC_API_URL development
```

### Step 4: Deploy

**Option A: Git Integration (Automatic)**
```bash
git checkout main
git merge develop
git push origin main
```

**Option B: Manual Deploy**
```bash
cd frontend/
vercel deploy --prod
```

### Step 5: Verify Deployment

```bash
vercel ls --prod
# Visit production URL
```

</TabItem>
<TabItem value="ai" label="🤖 AI Agent">

**Vercel Deployment**:

```bash
npm install -g vercel
cd frontend/
vercel link
echo "https://api.dutycall.net" | vercel env add NEXT_PUBLIC_API_URL production
echo "https://api.dutycall.net" | vercel env add NEXT_PUBLIC_API_URL preview
echo "http://localhost:8090" | vercel env add NEXT_PUBLIC_API_URL development
vercel deploy --prod
```

**Auto-Deploy**:
- Push to main → Production deploy
- Push to other branch → Preview deploy
- Pull request → Unique preview URL

**Environment Variables**:
- Must set for production, preview, AND development
- Rebuild required after env var changes (build-time injection)

**Edge Network**: Deploys to 100+ global CDN locations

</TabItem>
</Tabs>

---

## CORS Configuration

<Tabs groupId="developer-type">
<TabItem value="human" label="👨‍💻 Human Developer" default>

### The Problem

Backend CORS configured for ONE specific URL breaks when Vercel creates new deployment URLs.

### The Solution

Use pattern matching in `backend/config/cors.php`:

```php
<?php

return [
    'paths' => ['api/*', 'sanctum/csrf-cookie', 'dashboard/*', 'auth/*', 'analytics/*'],
    'allowed_methods' => ['*'],
    'allowed_origins' => array_filter([
        'http://localhost:3000',
        'http://localhost:3001',
        'http://localhost:3002',
        env('FRONTEND_URL'),  // Primary production URL
    ]),

    // ✅ CRITICAL: Allow all Vercel preview deployments
    'allowed_origins_patterns' => ['#https://.*\.vercel\.app$#'],

    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => true,
];
```

### After Updating CORS Config

```bash
# DigitalOcean
ssh root@YOUR_DROPLET_IP
cd /var/www/dutycall/backend
php artisan config:clear
php artisan config:cache

# Railway
railway run php artisan config:clear
railway run php artisan config:cache
```

</TabItem>
<TabItem value="ai" label="🤖 AI Agent">

**CORS Pattern Matching**:

**Problem**: Single URL whitelisting breaks on Vercel preview URLs

**Solution**: Regex pattern matching
```php
'allowed_origins_patterns' => ['#https://.*\.vercel\.app$#']
```

**Explanation**:
- `allowed_origins`: Specific URLs (localhost, production)
- `allowed_origins_patterns`: Regex for dynamic URLs
- Prevents breakage on new Vercel deployments

**After Config Change**:
```bash
php artisan config:clear && php artisan config:cache
```

</TabItem>
</Tabs>

---

## Monitoring Setup

<Tabs groupId="developer-type">
<TabItem value="human" label="👨‍💻 Human Developer" default>

:::danger Monitoring is Mandatory
The October 19, 2025 incident caused a 6+ hour outage because we had NO monitoring. Don't make the same mistake!

**Monitoring is not optional. It is mandatory for production deployments.**
:::

### UptimeRobot (Free)

Create free account: https://uptimerobot.com/

**Configure 3 monitors:**

#### 1. Backend API Health
```
Type: HTTP(s)
Name: DutyCall Backend API
URL: https://api.dutycall.net/api/user
Interval: 5 minutes
Method: HEAD
Expected Status: 401
Alert: Your email
```

#### 2. SSL Certificate Monitor
```
Type: HTTP(s)
Name: DutyCall SSL Certificate
URL: https://api.dutycall.net
Interval: 5 minutes
SSL Monitoring: Enabled
Alert when expires in: 30 days
Alert: Your email
```

#### 3. Frontend Health
```
Type: HTTP(s)
Name: DutyCall Frontend
URL: https://dutycall.vercel.app
Interval: 5 minutes
Method: HEAD
Expected Status: 200
Alert: Your email
```

### Sentry Error Tracking (Recommended)

**Backend:**
```bash
composer require sentry/sentry-laravel
php artisan vendor:publish --provider="Sentry\Laravel\ServiceProvider"
```

**Frontend:**
```bash
npm install --save @sentry/nextjs
npx @sentry/wizard@latest -i nextjs
```

</TabItem>
<TabItem value="ai" label="🤖 AI Agent">

**Monitoring Stack (Mandatory)**:

**UptimeRobot**:
- Backend API health (expects 401 Unauthorized)
- SSL certificate expiration (30-day warning)
- Frontend availability (expects 200 OK)
- 5-minute intervals, email alerts

**Sentry**:
- Backend: `composer require sentry/sentry-laravel`
- Frontend: `npm install --save @sentry/nextjs`
- Real-time error alerts, stack traces, performance monitoring

**Why Mandatory**: October 19, 2025 incident caused 6+ hour outage due to lack of monitoring

</TabItem>
</Tabs>

---

## Security Checklist

<Tabs groupId="developer-type">
<TabItem value="human" label="👨‍💻 Human Developer" default>

**Backend (Laravel):**
- [ ] `APP_DEBUG=false` in production
- [ ] `APP_ENV=production`
- [ ] Strong database password (20+ random characters)
- [ ] `.env` file permissions: `chmod 600 .env`
- [ ] Storage permissions: `chown -R www-data:www-data storage`
- [ ] SSL certificate installed and auto-renewing
- [ ] Firewall configured (only ports 22, 80, 443 open)
- [ ] SSH key authentication (disable password auth)
- [ ] Regular security updates scheduled

**Frontend (Next.js):**
- [ ] No secrets in client-side code
- [ ] Environment variables use `NEXT_PUBLIC_` prefix only for public values
- [ ] Content Security Policy configured
- [ ] Rate limiting on API routes

</TabItem>
<TabItem value="ai" label="🤖 AI Agent">

**Security Requirements**:

**Backend**:
- `APP_DEBUG=false` (prevents info disclosure)
- `APP_ENV=production` (disables dev helpers)
- Strong passwords (20+ chars)
- SSH key auth only
- File permissions: `.env` 600, `storage/` www-data:www-data 775
- Firewall: Ports 22, 80, 443 only
- SSL/HTTPS: Required
- Automated security updates

**Frontend**:
- No hardcoded secrets
- `NEXT_PUBLIC_*` prefix for public env vars only
- CSP headers configured
- Rate limiting enabled

</TabItem>
</Tabs>

---

## Next Steps

<Tabs groupId="developer-type">
<TabItem value="human" label="👨‍💻 Human Developer" default>

1. **Choose your platform:**
   - Production backend → [DigitalOcean Guide](/developers/deployment/backend/digitalocean)
   - Dev/staging backend → [Railway Guide](/developers/deployment/backend/railway)

2. **Deploy frontend:**
   - Follow [Vercel steps above](#vercel-frontend-deployment)

3. **Configure CORS:**
   - Add pattern matching to `config/cors.php`

4. **Set up monitoring:**
   - Create UptimeRobot account
   - Configure 3 monitors
   - Install Sentry (recommended)

5. **Review security:**
   - Complete security checklist above
   - Test all endpoints
   - Verify monitoring alerts work

</TabItem>
<TabItem value="ai" label="🤖 AI Agent">

**Deployment Flow**:

```
1. Backend Selection
   ├─ Production → Use DigitalOcean guide
   └─ Dev/Staging → Use Railway guide

2. Frontend Deployment
   └─ Always use Vercel

3. Configuration
   ├─ CORS pattern matching
   ├─ Environment variables
   └─ SSL/HTTPS verification

4. Monitoring (Mandatory)
   ├─ UptimeRobot (3 monitors)
   └─ Sentry (backend + frontend)

5. Security Hardening
   └─ Complete checklist above

6. Testing & Verification
   └─ Test all endpoints, verify monitoring
```

</TabItem>
</Tabs>

---

## Additional Resources

- [DigitalOcean Deployment Guide](/developers/deployment/backend/digitalocean)
- [Railway Deployment Guide](/developers/deployment/backend/railway)
- [Local Development Setup](/developers/getting-started/local-setup)
- [Environment Configuration](/developers/getting-started/environment-config)
- [Monitoring Systems Guide](/monitoring)

---

**Ready to deploy?** Choose your backend platform above and follow the detailed guide! 🚀
