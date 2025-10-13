---
sidebar_position: 1
---

# Full-Stack Production Deployment

Deploy DutyCall to Railway (backend) and Vercel (frontend) with auto-deployment on git push.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs groupId="developer-type">
<TabItem value="human" label="👨‍💻 Human Developer" default>

## Overview

DutyCall uses a modern, scalable deployment architecture:
- **Backend**: Railway (containerized Laravel with PostgreSQL)
- **Frontend**: Vercel (edge-deployed Next.js)
- **Auto-Deployment**: Push to `main` branch → automatic production deploy
- **Database**: PostgreSQL (Railway managed, auto-backups)

**Deployment Time**: ~15 minutes for initial setup, then automatic on every push.

</TabItem>
<TabItem value="ai" label="🤖 AI Agent">

## Architecture

**Deployment Stack**:
- Backend: Railway (Docker containers, auto-scaling)
- Frontend: Vercel (Edge Functions, CDN distribution)
- Database: PostgreSQL (Railway managed)
- Git Integration: Auto-deploy on push to `main`

**Key Differences from Local**:
- MySQL → PostgreSQL
- Ngrok → Direct HTTPS
- `APP_DEBUG=false`
- Production Twilio credentials
- Environment-specific URLs

</TabItem>
</Tabs>

---

## Prerequisites

<Tabs groupId="developer-type">
<TabItem value="human" label="👨‍💻 Human Developer" default>

Before deploying, you'll need:

### Accounts
- ✅ **Railway Account** - [Sign up](https://railway.app) (free tier available)
- ✅ **Vercel Account** - [Sign up](https://vercel.com) (free tier available)
- ✅ **GitHub Repository Access** - Collaborator on `chrisberno/dutycall`
- ✅ **Twilio Production Credentials** - Production account SID, auth token, API keys

### Local Setup Complete
- ✅ Successfully ran DutyCall locally (see [Local Setup](/developers/getting-started/local-setup))
- ✅ Understand environment variables (see [Environment Configuration](/developers/getting-started/environment-config))
- ✅ Tested end-to-end locally with Twilio calls

:::tip Free Tier Limits
Both Railway and Vercel offer generous free tiers perfect for development and small production workloads. You can start free and upgrade as you scale.
:::

</TabItem>
<TabItem value="ai" label="🤖 AI Agent">

**Requirements**:
- Railway + Vercel accounts (OAuth with GitHub)
- GitHub repo access (`chrisberno/dutycall`)
- Twilio production credentials
- Understanding of environment variables

**Pre-flight Check**:
- Local environment working
- Database migrations tested
- Twilio webhooks validated locally

</TabItem>
</Tabs>

---

## Backend Deployment (Railway)

<Tabs groupId="developer-type">
<TabItem value="human" label="👨‍💻 Human Developer" default>

### Step 1: Create Railway Project

1. **Sign up/Login** to [Railway](https://railway.app)
2. **Create New Project** → "Deploy from GitHub repo"
3. **Connect GitHub** → Select `chrisberno/dutycall` repository
4. **Configure Root Directory**:
   - Click "Settings"
   - Set "Root Directory" to `backend`
   - Railway will auto-detect Laravel

### Step 2: Add PostgreSQL Database

1. In your Railway project, click **"+ New"**
2. Select **"Database" → "Add PostgreSQL"**
3. Railway automatically:
   - Creates PostgreSQL instance
   - Generates database credentials
   - Adds environment variables (`DATABASE_URL`, `PG*` vars)

:::info Database Auto-Configuration
Railway automatically populates `PGHOST`, `PGPORT`, `PGDATABASE`, `PGUSER`, `PGPASSWORD` environment variables. You'll reference these in your app's `.env` configuration.
:::

### Step 3: Configure Environment Variables

In Railway Dashboard → Your Service → **"Variables"** tab, add these:

```bash
# Application
APP_NAME="Duty Call - Production"
APP_ENV=production
APP_DEBUG=false                      # CRITICAL: Must be false
APP_KEY=base64:...                   # Generate new key for production
APP_URL=https://dutycall-production.up.railway.app

# Frontend (CORS)
FRONTEND_URL=https://your-production-domain.com

# Database (use Railway-provided variables)
DB_CONNECTION=pgsql
DB_HOST=${PGHOST}
DB_PORT=${PGPORT}
DB_DATABASE=${PGDATABASE}
DB_USERNAME=${PGUSER}
DB_PASSWORD=${PGPASSWORD}

# Twilio Production Credentials
TWILIO_ACCOUNT_SID=your_prod_account_sid
TWILIO_AUTH_TOKEN=your_prod_auth_token
TWILIO_PHONE_NUMBER=+16282373889
TWILIO_API_KEY=your_prod_api_key
TWILIO_API_SECRET=your_prod_api_secret
TWILIO_TWIML_APP_SID=your_prod_twiml_app_sid
TWILIO_EDGE=ashburn

# DO NOT SET NGROK_URL in production
# Code will automatically fall back to APP_URL
```

:::warning Security Critical
- **Never use local/dev credentials in production**
- **Never enable `APP_DEBUG=true` in production** (exposes sensitive data)
- **Generate a new `APP_KEY`** for production: `php artisan key:generate --show`
- **Use HTTPS URLs only** for `APP_URL` and `FRONTEND_URL`
:::

### Step 4: Run Database Migrations

**Option A: Railway CLI** (Recommended)

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Link to your project
railway link

# Run migrations
railway run php artisan migrate --force
```

**Option B: Railway Dashboard**

1. Go to your service → **"Deployments"** tab
2. Click latest deployment
3. Open **"View Logs"** and find the deployment terminal
4. Use the terminal to run: `php artisan migrate --force`

:::tip Seeding Production
**Do NOT run `RoleTestUsersSeeder` in production** (those are test accounts with weak passwords). Create production users through your application's UI or create a production-specific seeder.
:::

### Step 5: Deploy

1. **Push to `main` branch**:
   ```bash
   git push origin main
   ```

2. **Railway auto-deploys**:
   - Detects changes
   - Builds Docker container
   - Runs migrations (if configured)
   - Restarts service
   - Updates public URL

3. **Monitor deployment**:
   - Check Railway Dashboard → "Deployments" tab
   - View build logs for errors
   - Verify service is "Active"

4. **Test backend**:
   ```bash
   curl https://your-railway-url.up.railway.app/api/health
   ```

</TabItem>
<TabItem value="ai" label="🤖 AI Agent">

**Railway Deployment Flow**:

1. **Project Init**: Railway detects Laravel via `composer.json`
2. **Build**: Dockerfile or Nixpacks buildpack
3. **Database**: PostgreSQL provisioned, env vars auto-populated
4. **Environment**: Configure all required vars (see list above)
5. **Migrations**: Manual via CLI or dashboard terminal
6. **Deploy**: Push to `main` → auto-build → restart

**Critical Environment Variables**:
- `APP_DEBUG=false` - Security (exposes stack traces if true)
- `APP_KEY` - Encryption key (must be unique)
- `DB_CONNECTION=pgsql` - Railway uses PostgreSQL, not MySQL
- No `NGROK_URL` - Code falls back to `APP_URL`
- `FRONTEND_URL` - CORS whitelist

**Database Connection**:
```php
// config/database.php uses Railway env vars
'pgsql' => [
    'host' => env('DB_HOST', env('PGHOST')),
    'database' => env('DB_DATABASE', env('PGDATABASE')),
    'username' => env('DB_USERNAME', env('PGUSER')),
    'password' => env('DB_PASSWORD', env('PGPASSWORD')),
]
```

**Deployment Trigger**: Push to `main` branch

</TabItem>
</Tabs>

---

## Frontend Deployment (Vercel)

<Tabs groupId="developer-type">
<TabItem value="human" label="👨‍💻 Human Developer" default>

### Step 1: Create Vercel Project

1. **Sign up/Login** to [Vercel](https://vercel.com)
2. **Import Git Repository**:
   - Click "Add New..." → "Project"
   - Select `chrisberno/dutycall` from GitHub
3. **Configure Build Settings**:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)
   - **Install Command**: `npm install` (default)

### Step 2: Configure Environment Variables

In Vercel Dashboard → Your Project → **"Settings" → "Environment Variables"**:

```bash
# Backend API URL (from Railway)
NEXT_PUBLIC_API_URL=https://dutycall-production.up.railway.app

# Environment
NEXT_PUBLIC_APP_ENV=production
```

:::info Build-Time Variables
Variables prefixed with `NEXT_PUBLIC_` are embedded into the frontend build at build time. Changing these requires a redeploy.
:::

### Step 3: Deploy

1. **Click "Deploy"** in Vercel dashboard
2. Vercel automatically:
   - Clones repository
   - Installs dependencies (`npm install`)
   - Builds Next.js app (`npm run build`)
   - Deploys to edge network
   - Generates production URL

3. **Deployment completes** in ~2 minutes
4. **Test frontend**:
   - Visit the Vercel URL (e.g., `https://dutycall-abc123.vercel.app`)
   - Should see login page
   - Test login with production credentials

### Step 4: Custom Domain (Optional)

1. In Vercel → **"Settings" → "Domains"**
2. **Add Domain**: `app.dutycall.com` (or your domain)
3. **Configure DNS**:
   - Add CNAME record pointing to `cname.vercel-dns.com`
   - Or add A records (Vercel provides IPs)
4. **SSL**: Automatically provisioned by Vercel
5. **Update `FRONTEND_URL`** in Railway to match custom domain

### Step 5: Auto-Deployment Setup

Vercel automatically configures:
- ✅ **Production deploys**: Push to `main` → production
- ✅ **Preview deploys**: Push to any other branch → preview URL
- ✅ **PR previews**: Every pull request gets a unique preview URL

</TabItem>
<TabItem value="ai" label="🤖 AI Agent">

**Vercel Deployment Flow**:

1. **Project Import**: OAuth with GitHub, select repo
2. **Config**: Root dir `frontend`, framework Next.js (auto-detected)
3. **Build**: `npm install && npm run build`
4. **Deploy**: Static assets to CDN, functions to edge
5. **Domain**: Auto HTTPS, custom domain optional

**Environment Variables**:
- `NEXT_PUBLIC_API_URL` - Backend URL (Railway)
- `NEXT_PUBLIC_APP_ENV=production`

**Build Process**:
```bash
# Vercel runs:
npm install
npm run build  # Creates .next/ output directory
# Deploys to Edge Network (CDN)
```

**Auto-Deploy**:
- Push to `main` → Production deploy
- Push to other branch → Preview deploy
- Pull request → Unique preview URL

**Edge Network**: Vercel deploys frontend to 100+ global edge locations

</TabItem>
</Tabs>

---

## Twilio Production Configuration

<Tabs groupId="developer-type">
<TabItem value="human" label="👨‍💻 Human Developer" default>

### Phone Number Configuration

Configure your production Twilio phone number to point to Railway backend:

1. **Login to [Twilio Console](https://console.twilio.com)**
2. **Navigate to**: Phone Numbers → Manage → Active Numbers
3. **Select**: `+1 628 237 3889` (production number)
4. **Configure Voice & Fax**:
   - **Voice URL**: `https://dutycall-production.up.railway.app/api/twilio/inbound`
   - **HTTP Method**: `POST`
   - **Status Callback URL**: `https://dutycall-production.up.railway.app/api/twilio/status`
   - **HTTP Method**: `POST`
5. **Click "Save"**

### TwiML App Configuration

Configure your production TwiML App for WebRTC calling:

1. **Navigate to**: Voice → Manage → TwiML Apps
2. **Select your production TwiML App** (or create new)
3. **Configure Voice**:
   - **Voice Request URL**: `https://dutycall-production.up.railway.app/api/twilio/agent-dial-queue`
   - **HTTP Method**: `POST`
4. **Copy the TwiML App SID** → Use as `TWILIO_TWIML_APP_SID` in Railway env vars
5. **Click "Save"**

:::warning Production vs Dev Numbers
- **Dev Number**: `+1 831 603 3889` → Points to ngrok (local development)
- **Prod Number**: `+1 628 237 3889` → Points to Railway (production)

Never point production number to ngrok or dev credentials!
:::

### Verify Configuration

Test that Twilio can reach your production backend:

```bash
# Test inbound endpoint
curl -X POST https://dutycall-production.up.railway.app/api/twilio/inbound

# Test status callback
curl -X POST https://dutycall-production.up.railway.app/api/twilio/status

# Test WebRTC endpoint
curl -X POST https://dutycall-production.up.railway.app/api/twilio/agent-dial-queue
```

All should return TwiML XML responses (not 404s).

</TabItem>
<TabItem value="ai" label="🤖 AI Agent">

**Twilio Webhook Configuration**:

**Phone Number** (`+1 628 237 3889`):
- Voice URL: `{RAILWAY_URL}/api/twilio/inbound` (POST)
- Status Callback: `{RAILWAY_URL}/api/twilio/status` (POST)

**TwiML App** (WebRTC):
- Voice Request URL: `{RAILWAY_URL}/api/twilio/agent-dial-queue` (POST)
- App SID → `TWILIO_TWIML_APP_SID` env var

**Why These Endpoints**:
- `/inbound` - Receives incoming calls, returns `<Enqueue>` TwiML
- `/status` - Receives call status updates (completed, failed, etc.)
- `/agent-dial-queue` - Handles agent WebRTC connection to queue

**Production vs Local**:
- Local: Twilio → ngrok → localhost
- Production: Twilio → Railway (direct HTTPS)

</TabItem>
</Tabs>

---

## Deployment Workflow

<Tabs groupId="developer-type">
<TabItem value="human" label="👨‍💻 Human Developer" default>

### Git Flow Integration

**Development Workflow:**

```bash
# Work on feature branch
git checkout -b feature/new-feature
# Make changes...
git add .
git commit -m "feat: Add new feature"
git push origin feature/new-feature

# Creates Vercel preview deploy automatically
# Railway does NOT deploy (only deploys main)
```

**Production Deployment:**

```bash
# Create PR: feature/new-feature → main
# Review code, test on Vercel preview
# Merge PR to main

# This triggers:
# 1. Railway production deploy (backend)
# 2. Vercel production deploy (frontend)
```

**Monitoring Deployment:**

```bash
# Watch Railway logs
# Railway Dashboard → Deployments → View Logs

# Watch Vercel logs
# Vercel Dashboard → Deployments → View Function Logs
```

### Rollback Procedure

**If deployment breaks production:**

**Option A: Redeploy Previous Version (Fast)**

1. **Railway**:
   - Go to "Deployments" tab
   - Find last working deployment
   - Click "Redeploy"

2. **Vercel**:
   - Go to "Deployments" tab
   - Find last working deployment
   - Click "..." → "Redeploy"

**Option B: Git Revert (Permanent Fix)**

```bash
# Find the bad commit
git log --oneline

# Revert it
git revert <bad-commit-hash>

# Push to main (triggers new deploy)
git push origin main
```

</TabItem>
<TabItem value="ai" label="🤖 AI Agent">

**Git-Based Deployment**:

**Branch Strategy**:
- `main` → Production (Railway + Vercel)
- `feature/*` → Vercel preview only (Railway ignores)
- `develop` → Optional staging environment

**Deployment Triggers**:
- Push to `main` → Prod deploy (both platforms)
- Push to other branch → Vercel preview deploy only
- Pull request → Vercel preview comment on PR

**Rollback Methods**:
1. **Platform rollback**: Redeploy previous deployment via dashboard
2. **Git revert**: `git revert` bad commit, push to `main`
3. **Git reset**: `git reset --hard` previous commit (force push, dangerous)

**Recommended**: Use platform rollback for speed, then fix with git revert.

</TabItem>
</Tabs>

---

## Monitoring & Health Checks

<Tabs groupId="developer-type">
<TabItem value="human" label="👨‍💻 Human Developer" default>

### Railway Monitoring

**Built-in Metrics:**
- **CPU Usage**: Track spikes during high call volume
- **Memory Usage**: Monitor for memory leaks
- **Request Count**: See API traffic patterns
- **Response Time**: Track API performance

**Access Logs:**
1. Railway Dashboard → Your Service
2. Click "Deployments" → Latest deployment
3. Click "View Logs"
4. Filter by log level (error, warning, info)

**Health Check Endpoint:**
```bash
curl https://dutycall-production.up.railway.app/api/health
```

### Vercel Monitoring

**Built-in Analytics:**
- **Real User Monitoring**: Actual user performance metrics
- **Function Logs**: Edge function execution logs
- **Error Tracking**: Frontend JavaScript errors

**Access Analytics:**
1. Vercel Dashboard → Your Project
2. Click "Analytics" tab
3. View real-time and historical metrics

### Recommended External Monitoring

**Error Tracking** (Coming Soon):
- **Sentry** - Track backend + frontend errors
- Catch exceptions before users report them
- Stack traces with user context

**Uptime Monitoring** (Coming Soon):
- **UptimeRobot** - Ping your API every 5 minutes
- Get alerts when site goes down
- Track uptime percentage

**Application Performance** (Coming Soon):
- **New Relic / DataDog** - Deep application insights
- Track slow database queries
- Monitor Twilio API performance

</TabItem>
<TabItem value="ai" label="�🤖 AI Agent">

**Railway Metrics**:
- CPU/Memory usage
- Request rate (RPM)
- Response time (P50, P95, P99)
- Error rate
- Deploy history

**Vercel Analytics**:
- Core Web Vitals (LCP, FID, CLS)
- Real User Monitoring (RUM)
- Edge function execution time
- Error tracking (client-side)

**Health Checks**:
- Backend: `/api/health` endpoint
- Frontend: Vercel auto-monitors edge functions
- Database: Railway PostgreSQL metrics

**Alerting** (Manual Setup):
- Sentry: Exception tracking, alerts on error spikes
- UptimeRobot: HTTP monitoring, downtime alerts
- PagerDuty: On-call rotation for critical issues

</TabItem>
</Tabs>

---

## Production vs Local Differences

<Tabs groupId="developer-type">
<TabItem value="human" label="👨‍💻 Human Developer" default>

### Quick Reference

| Feature | Local Development | Production |
|---------|-------------------|------------|
| **Backend URL** | `localhost:8090` | `https://dutycall-production.up.railway.app` |
| **Frontend URL** | `localhost:3000` | `https://your-domain.vercel.app` |
| **Database** | MySQL 8.0+ | PostgreSQL (Railway) |
| **Twilio Number** | `+1 831 603 3889` (dev) | `+1 628 237 3889` (prod) |
| **Webhook Delivery** | Ngrok tunnel | Direct HTTPS to Railway |
| **Debug Mode** | `APP_DEBUG=true` | `APP_DEBUG=false` ⚠️ |
| **Deployment** | Manual (`php artisan serve`) | Auto (git push) |
| **Environment** | `APP_ENV=local` | `APP_ENV=production` |
| **CORS** | `localhost:3000` | Production domain |
| **SSL/HTTPS** | Not required | Required (auto) |

### Key Behavioral Differences

**Database Differences:**
- **Local**: MySQL uses `mysql` driver, case-insensitive by default
- **Production**: PostgreSQL uses `pgsql` driver, case-sensitive
- **Migrations**: Test migrations with PostgreSQL locally if possible

**TwiML Routing:**
```php
// Local: Uses NGROK_URL
$url = env('NGROK_URL') . '/api/twilio/callback';
// → https://abc123.ngrok-free.app/api/twilio/callback

// Production: Falls back to APP_URL (no NGROK_URL set)
$url = env('NGROK_URL', env('APP_URL')) . '/api/twilio/callback';
// → https://dutycall-production.up.railway.app/api/twilio/callback
```

**Error Handling:**
- **Local**: Full stack traces shown (`APP_DEBUG=true`)
- **Production**: Generic error messages only (`APP_DEBUG=false`)

</TabItem>
<TabItem value="ai" label="🤖 AI Agent">

**Core Differences**:

1. **Database**: MySQL → PostgreSQL
   - Different SQL dialects
   - Case sensitivity differences
   - Connection pooling handled by Railway

2. **Environment Variables**:
   - Local: `NGROK_URL` set, `APP_DEBUG=true`
   - Prod: No `NGROK_URL`, `APP_DEBUG=false`

3. **Deployment**:
   - Local: Manual process startup
   - Prod: Docker containerization, auto-restart

4. **Networking**:
   - Local: Ngrok tunnel for webhooks
   - Prod: Direct HTTPS, no intermediary

5. **Scaling**:
   - Local: Single PHP process
   - Prod: Auto-scaling containers (Railway)

**Code Adaptation**:
Most code works identically. Key pattern:
```php
$url = env('NGROK_URL', env('APP_URL')) . '/path';
```
This handles both environments without code changes.

</TabItem>
</Tabs>

---

## Security Checklist

<Tabs groupId="developer-type">
<TabItem value="human" label="👨‍💻 Human Developer" default>

### Before Going Live

Use this checklist to ensure production security:

- [ ] **`APP_DEBUG=false`** in Railway environment variables
- [ ] **`APP_ENV=production`** in Railway environment variables
- [ ] **Strong, unique `APP_KEY`** generated for production (never reuse local key)
- [ ] **Production Twilio credentials** (not dev credentials) in Railway
- [ ] **`FRONTEND_URL`** set to actual production domain
- [ ] **No `.env` files** committed to git (check `.gitignore`)
- [ ] **HTTPS enabled** on all URLs (Railway + Vercel auto-provide)
- [ ] **CORS configured** for production domain only (not `localhost`)
- [ ] **Database backups** enabled (Railway auto-backups PostgreSQL)
- [ ] **Strong passwords** for all production user accounts
- [ ] **SSL certificates** valid (Vercel + Railway auto-renew)
- [ ] **Twilio webhooks** pointing to production URLs (not ngrok)
- [ ] **Rate limiting** enabled on API endpoints (Laravel throttle middleware)
- [ ] **Monitoring** configured (Sentry, UptimeRobot, etc.)

:::danger Critical Security Items
The following are **critical** and will expose sensitive data if not configured correctly:

1. **`APP_DEBUG=false`** - If true, shows full stack traces with passwords, API keys, etc.
2. **Production Twilio credentials** - Never use dev credentials in production
3. **CORS configuration** - Must restrict to production domain only
:::

</TabItem>
<TabItem value="ai" label="🤖 AI Agent">

**Security Configuration**:

**Environment**:
- `APP_DEBUG=false` - Prevents info disclosure
- `APP_ENV=production` - Disables dev helpers
- `APP_KEY` - Unique encryption key (never reuse)

**Authentication**:
- Strong passwords for all users
- Sanctum token expiration configured
- CORS restricted to production frontend

**Infrastructure**:
- HTTPS enforced (Railway + Vercel default)
- Database credentials managed by Railway
- No hardcoded secrets in code

**Twilio**:
- Production credentials only
- Webhook URLs use HTTPS
- No dev numbers in production

**Best Practices**:
- Rotate credentials periodically
- Use environment variables, never hardcode
- Enable Railway/Vercel security features
- Monitor logs for suspicious activity

</TabItem>
</Tabs>

---

## Troubleshooting Production Issues

<Tabs groupId="developer-type">
<TabItem value="human" label="👨‍💻 Human Developer" default>

### Backend Not Starting

**Symptoms**: Railway deployment fails, service shows "Crashed"

**Check:**
1. **Railway logs** (Deployments → View Logs)
2. **Environment variables** all set correctly
3. **`composer.json`** dependencies are valid
4. **PHP version** compatible (Railway uses PHP 8.2+)

**Common Causes:**
- Missing environment variables
- Invalid `APP_KEY`
- Database connection error
- Composer dependency conflict

**Fix:**
```bash
# Check Railway logs
railway logs

# Verify env vars
railway variables

# Test database connection
railway run php artisan tinker --execute="DB::connection()->getPdo();"
```

### Frontend Build Failing

**Symptoms**: Vercel build fails, deployment shows error

**Check:**
1. **Vercel build logs** (Deployments → Failed deployment → View Logs)
2. **TypeScript errors** in build output
3. **`NEXT_PUBLIC_*` variables** set in Vercel
4. **Node.js version** (Vercel uses Node 18+)

**Common Causes:**
- TypeScript type errors
- Missing environment variables
- Import path issues
- Build timeout (increase in Vercel settings)

**Fix:**
```bash
# Test build locally
cd frontend
npm run build

# Check for TypeScript errors
npm run typecheck

# Check for linting errors
npm run lint
```

### Database Connection Errors

**Symptoms**: Backend starts but can't connect to database

**Check:**
1. **PostgreSQL service** running in Railway
2. **`DB_*` environment variables** match PostgreSQL credentials
3. **Migrations** completed successfully

**Fix:**
```bash
# Test database connection
railway run php artisan tinker --execute="DB::connection()->getPdo();"

# Run migrations
railway run php artisan migrate --force

# Check PostgreSQL logs
# Railway Dashboard → PostgreSQL service → View Logs
```

### Twilio Webhooks Failing

**Symptoms**: Calls fail, no webhooks received

**Check:**
1. **Railway URL** is correct in Twilio Console
2. **Twilio phone number** configured correctly
3. **Railway logs** show webhook requests
4. **Endpoint returns TwiML** (not 404/500)

**Test Manually:**
```bash
# Test inbound endpoint
curl -X POST https://your-railway-url.up.railway.app/api/twilio/inbound \
  -d "From=+15555555555" \
  -d "To=+16282373889"

# Should return TwiML XML (not error)
```

**Fix:**
1. Verify Twilio Console configuration matches Railway URL
2. Check Railway logs for errors
3. Ensure `TWILIO_*` env vars are correct
4. Test endpoints manually with curl

### CORS Errors

**Symptoms**: Frontend can't access backend API, browser console shows CORS error

**Check:**
1. **`FRONTEND_URL`** in Railway matches actual frontend domain
2. **CORS config** in `backend/config/cors.php`
3. **Frontend is using HTTPS** (not HTTP)

**Fix:**
```php
// backend/config/cors.php
'paths' => ['api/*', 'sanctum/csrf-cookie', 'dashboard/*', 'auth/*', 'analytics/*'],
'allowed_origins' => [env('FRONTEND_URL')],
'supports_credentials' => true,
```

Then restart Railway service.

</TabItem>
<TabItem value="ai" label="🤖 AI Agent">

**Common Issues**:

**1. Backend Crash Loop**:
- Missing env vars
- Database connection failure
- Invalid `APP_KEY`
- Composer dependency conflict

**Debug**:
```bash
railway logs
railway variables
railway run php artisan config:cache
```

**2. Frontend Build Failure**:
- TypeScript errors
- Missing `NEXT_PUBLIC_*` vars
- Import path issues
- Build timeout

**Debug**:
```bash
npm run build  # Local test
npm run typecheck
```

**3. Database Connection**:
- PostgreSQL service not running
- Wrong `DB_*` credentials
- Migrations not run

**Debug**:
```bash
railway run php artisan migrate --force
railway run php artisan db:show
```

**4. Webhook Failures**:
- Wrong Railway URL in Twilio
- TwiML endpoints returning errors
- CORS blocking requests

**Debug**:
```bash
curl -X POST {RAILWAY_URL}/api/twilio/inbound
railway logs --filter="twilio"
```

**5. CORS Errors**:
- `FRONTEND_URL` mismatch
- CORS paths not configured
- HTTP vs HTTPS mismatch

**Fix**: Update `FRONTEND_URL`, check `config/cors.php`

</TabItem>
</Tabs>

---

## Cost Considerations

<Tabs groupId="developer-type">
<TabItem value="human" label="👨‍💻 Human Developer" default>

### Railway Costs

**Free Tier:**
- $5 free credits per month
- Covers PostgreSQL + backend service for low-traffic apps
- Perfect for development and testing

**Hobby Plan** ($5/month):
- $5 credits included
- Pay-as-you-grow beyond included credits
- Good for small production workloads

**Pro Plan** ($20/month):
- $20 credits included
- Priority support
- Higher resource limits

**Typical Usage:**
- Small app (~100 users): $5-10/month
- Medium app (~1000 users): $20-50/month
- Database backups: Included
- Egress: ~$0.10/GB

### Vercel Costs

**Free Tier (Hobby):**
- Unlimited personal projects
- 100GB bandwidth/month
- Generous function execution time
- Perfect for most small apps

**Pro Plan** ($20/month):
- 1TB bandwidth/month
- Advanced analytics
- Team collaboration
- Custom domains with SSL

**Typical Usage:**
- Small app: Free tier sufficient
- Medium app: $0-20/month
- Large app: $20-100/month

### Twilio Costs

**Pay-As-You-Go:**
- **Inbound calls**: $0.0085/minute
- **Outbound calls**: $0.013/minute
- **Phone number**: $1/month per number
- **SMS** (if used): $0.0075/message

**Typical Monthly Costs:**
- 1000 minutes inbound: ~$9
- 1000 minutes outbound: ~$13
- 2 phone numbers: $2
- **Total for 1000 min**: ~$24/month

**Cost Optimization:**
- Use voice recording instead of live agents when possible
- Batch outbound calls during off-peak hours
- Monitor usage via Twilio Console

### Total Estimated Costs

| Usage Level | Railway | Vercel | Twilio | **Total/Month** |
|-------------|---------|--------|--------|-----------------|
| **Development** | $0 (free) | $0 (free) | $2 (numbers) | **$2** |
| **Small** (100 users, 500 min) | $5 | $0 | $12 | **$17** |
| **Medium** (1000 users, 2000 min) | $20 | $20 | $45 | **$85** |
| **Large** (5000+ users, 10000 min) | $50 | $50 | $200 | **$300** |

:::tip Start Free
Both Railway and Vercel have generous free tiers. Start there and upgrade only when you need more resources. Twilio is pay-as-you-go, so you only pay for actual call minutes used.
:::

</TabItem>
<TabItem value="ai" label="🤖 AI Agent">

**Cost Breakdown**:

**Railway**:
- Free: $5 credits/month
- Hobby: $5/month base + usage
- Pro: $20/month base + usage
- Scales with CPU/memory/storage

**Vercel**:
- Free: Generous for personal projects
- Pro: $20/month (team features)
- Bandwidth: $0.15/GB beyond limits

**Twilio**:
- Inbound: $0.0085/min
- Outbound: $0.013/min
- Number: $1/month
- SMS: $0.0075/msg

**Optimization**:
- Use Railway free tier for dev
- Monitor Twilio usage (biggest variable cost)
- Cache API responses to reduce compute
- Use Vercel free tier until 100GB/month bandwidth

**Scaling Costs**:
Linear scaling with users/traffic. Most expensive: Twilio call minutes.

</TabItem>
</Tabs>

---

## Next Steps

<Tabs groupId="developer-type">
<TabItem value="human" label="👨‍💻 Human Developer" default>

### Post-Deployment Checklist

After successful deployment:

1. **Test Core Functionality**:
   - [ ] Login with production credentials
   - [ ] Make test inbound call to production number
   - [ ] Test manual dialer (outbound call)
   - [ ] Verify agent queue dashboard works
   - [ ] Check call history and reporting

2. **Configure Monitoring**:
   - [ ] Set up Sentry for error tracking
   - [ ] Configure UptimeRobot for uptime monitoring
   - [ ] Add your phone/email to alert notifications

3. **Security Hardening**:
   - [ ] Review security checklist above
   - [ ] Enable 2FA on Railway + Vercel accounts
   - [ ] Rotate any exposed credentials
   - [ ] Review CORS configuration

4. **Documentation**:
   - [ ] Document any custom configuration
   - [ ] Update team with production URLs
   - [ ] Create runbook for common issues

5. **Performance Optimization**:
   - [ ] Enable Laravel caching (`php artisan config:cache`)
   - [ ] Configure Redis for sessions (optional)
   - [ ] Review Railway metrics after first week

### Ongoing Maintenance

**Weekly:**
- Check Railway + Vercel logs for errors
- Review Twilio usage and costs
- Monitor uptime reports

**Monthly:**
- Review and optimize costs
- Update dependencies (`composer update`, `npm update`)
- Rotate API keys and credentials

**Quarterly:**
- Performance audit
- Security audit
- Backup restoration test

</TabItem>
<TabItem value="ai" label="🤖 AI Agent">

**Post-Deploy Tasks**:

1. **Validation**:
   - Health checks passing
   - End-to-end testing (login → call → report)
   - Performance baseline established

2. **Monitoring Setup**:
   - Error tracking (Sentry)
   - Uptime monitoring (UptimeRobot)
   - Log aggregation (Railway + Vercel)

3. **Security**:
   - Audit checklist completed
   - 2FA enabled on accounts
   - Credentials rotated if exposed

4. **Optimization**:
   - Laravel config caching
   - Database indexing
   - API response caching

**Maintenance Schedule**:
- **Daily**: Monitor logs
- **Weekly**: Review metrics
- **Monthly**: Update dependencies
- **Quarterly**: Security audit

</TabItem>
</Tabs>

---

## Additional Resources

- **Local Development**: [Full-Stack Local Setup](/developers/getting-started/local-setup)
- **Environment Configuration**: [Environment Configuration Guide](/developers/getting-started/environment-config)
- **Architecture Overview**: [Developer Overview](/developers/overview)
- **Railway Docs**: https://docs.railway.app
- **Vercel Docs**: https://vercel.com/docs
- **Twilio Docs**: https://www.twilio.com/docs/voice

---

**Questions?** Contact the project lead or check Railway/Vercel logs for deployment issues.

**Ready to deploy?** Start with the Railway backend setup above! 🚀
