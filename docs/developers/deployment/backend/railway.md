---
id: railway
title: Backend Deployment to Railway
sidebar_label: Railway
sidebar_position: 1
---

# Backend Deployment to Railway

:::info For Developers & AI Agents
This guide provides step-by-step instructions for deploying the DutyCall Laravel backend to Railway with MySQL database.
:::

## Overview

Deploy the DutyCall Laravel backend to Railway with automatic CI/CD from GitHub, managed MySQL database, and SSL-enabled public domain.

**Time to Deploy:** ~45 minutes (first time)
**Difficulty:** Intermediate
**Prerequisites:** Git, GitHub account, Railway account, Twilio account, Google Cloud OAuth

**What Railway Provides:**
- 🚀 Automatic deployment from GitHub
- 🗄️ Managed MySQL database
- 🔒 Free SSL certificates
- 📊 Built-in monitoring and logs
- 💰 Free tier: $5/month credit + 30 days trial

---

## Prerequisites

### Required Accounts

**1. Railway Account**
- Sign up: https://railway.app
- Connect GitHub account for auto-deployment
- Free tier includes: $5/month credit, 30 days trial

**2. GitHub Account**
- Repository must be pushed to GitHub
- Railway deploys automatically on push to main branch

**3. Twilio Account** (for voice features)
- Account SID and Auth Token
- API Key and API Secret
- TwiML App SID
- Phone number

**4. Google Cloud Console** (for OAuth)
- OAuth Client ID and Secret
- Authorized redirect URIs configured

### Required Credentials Checklist

Gather these credentials before starting:

```bash
# Twilio Credentials
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_PHONE_NUMBER=+1xxxxxxxxxx
TWILIO_API_KEY=SKxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_API_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_TWIML_APP_SID=APxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Google OAuth Credentials
GOOGLE_CLIENT_ID=xxxxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-xxxxxxxxxxxxxxxxxxxxx
```

:::tip Where to Find Credentials
- **Twilio**: Console → Account → API Keys & Tokens
- **Google**: Cloud Console → APIs & Services → Credentials
:::

---

## Step 1: Prepare Your Repository

### 1.1 Verify Backend Structure

Ensure your backend directory contains:

```
backend/
├── Dockerfile              # ← Required
├── .dockerignore          # ← Required
├── composer.json
├── composer.lock
├── artisan
├── app/
├── config/
├── database/
└── routes/
```

### 1.2 Create Dockerfile

**File:** `backend/Dockerfile`

```dockerfile
FROM php:8.3-cli

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    libzip-dev \
    zip \
    unzip

# Install PHP extensions
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd zip

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /app

# Copy application files
COPY . .

# Install dependencies
RUN composer install --no-dev --optimize-autoloader --no-interaction

# Expose port
EXPOSE 8080

# Start command (runs migrations then starts server)
CMD php artisan migrate --force || true && php artisan serve --host=0.0.0.0 --port=${PORT:-8080}
```

**Key Points:**
- Uses PHP 8.3 CLI
- Installs all required extensions
- Runs migrations automatically on startup
- Serves on port 8080 (Railway standard)

### 1.3 Create .dockerignore

**File:** `backend/.dockerignore`

```
.git
.env
.env.*
node_modules
vendor
storage/logs/*
storage/framework/cache/*
storage/framework/sessions/*
storage/framework/views/*
bootstrap/cache/*
.phpunit.result.cache
```

**Purpose:** Exclude unnecessary files from Docker build (faster builds, smaller images)

### 1.4 Push to GitHub

```bash
cd /path/to/dutycall
git add backend/Dockerfile backend/.dockerignore
git commit -m "Add Railway deployment configuration"
git push origin main
```

---

## Step 2: Create Railway Project

### 2.1 Login to Railway

1. Navigate to https://railway.app
2. Click **"Start a New Project"**
3. Select **"Deploy from GitHub repo"**

### 2.2 Connect GitHub Repository

1. Click **"Deploy from GitHub repo"**
2. Authorize Railway to access your GitHub account
3. Select your repository (e.g., `yourname/dutycall`)
4. Railway detects the repository automatically

### 2.3 Configure Service Root Directory

1. Railway creates a service automatically
2. Click on the service card
3. Navigate to **Settings** tab
4. Set **Root Directory** to: `backend`
5. Railway will detect and use your Dockerfile

**Why set root directory?**
- If your repo has both frontend and backend, Railway needs to know where the backend code is
- Setting root to `backend` tells Railway to build from that directory

---

## Step 3: Add MySQL Database

### 3.1 Add Database to Project

1. In Railway dashboard, click **"+ New"**
2. Select **"Database"**
3. Choose **"Add MySQL"**
4. Railway provisions MySQL automatically (~1 minute)

### 3.2 Link Database to Backend

Railway auto-creates these environment variables in the MySQL service:
- `MYSQLHOST` - Database host
- `MYSQLPORT` - Database port (usually 3306)
- `MYSQLDATABASE` - Database name
- `MYSQLUSER` - Database username
- `MYSQLPASSWORD` - Database password

**You'll reference these in Step 4** using Railway's variable syntax: `${{MySQL.MYSQLHOST}}`

---

## Step 4: Configure Environment Variables

### 4.1 Generate Laravel APP_KEY

Run locally to generate an application key:

```bash
cd /path/to/backend
php artisan key:generate --show
```

**Output:**
```
base64:xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

Copy this entire string (including `base64:` prefix).

### 4.2 Add Variables via Railway Dashboard

Navigate to your backend service → **Variables** tab → Click **"New Variable"**

Add each variable below:

#### App Configuration

```bash
APP_NAME=DutyCall
APP_ENV=production
APP_DEBUG=false
APP_KEY=base64:xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**Important:**
- `APP_DEBUG=false` in production (security)
- `APP_KEY` must be the output from `php artisan key:generate --show`

#### Database Configuration

```bash
DB_CONNECTION=mysql
DB_HOST=${{MySQL.MYSQLHOST}}
DB_PORT=${{MySQL.MYSQLPORT}}
DB_DATABASE=${{MySQL.MYSQLDATABASE}}
DB_USERNAME=${{MySQL.MYSQLUSER}}
DB_PASSWORD=${{MySQL.MYSQLPASSWORD}}
```

**Railway Variable References:**
- `${{MySQL.MYSQLHOST}}` automatically references the MySQL service's `MYSQLHOST` variable
- Railway updates these automatically if database credentials change

#### Twilio Configuration

```bash
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_PHONE_NUMBER=+1xxxxxxxxxx
TWILIO_API_KEY=SKxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_API_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_TWIML_APP_SID=APxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_EDGE=ashburn
```

**Get these from:** Twilio Console → Account → API Keys & Tokens

#### Google OAuth Configuration

```bash
GOOGLE_CLIENT_ID=xxxxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-xxxxxxxxxxxxxxxxxxxxx
```

**Get these from:** Google Cloud Console → APIs & Services → Credentials

#### Laravel Drivers & Session

```bash
SESSION_DRIVER=database
QUEUE_CONNECTION=database
BROADCAST_DRIVER=log
CACHE_DRIVER=file
FILESYSTEM_DISK=local
LOG_CHANNEL=stack
LOG_LEVEL=debug
```

**Why these settings?**
- `SESSION_DRIVER=database` - Store sessions in MySQL (required for Sanctum)
- `QUEUE_CONNECTION=database` - Use database for background jobs
- `LOG_LEVEL=debug` - Verbose logging for troubleshooting

:::caution Update After Domain Generation
You'll add more variables in **Step 6** after Railway generates your public domain:
- `APP_URL`
- `FRONTEND_URL`
- `SANCTUM_STATEFUL_DOMAINS`
- `SESSION_DOMAIN`
- `GOOGLE_CALLBACK_URL`
:::

---

## Step 5: Deploy Backend

### 5.1 Trigger Deployment

Railway automatically deploys when:
- ✅ You push to GitHub (auto-deploy enabled by default)
- ✅ You change environment variables
- ✅ You click **"Redeploy"** button

**First deployment starts immediately** after adding environment variables.

### 5.2 Monitor Deployment

1. Navigate to **Deployments** tab in your service
2. Click on the active deployment (status: Building or Running)
3. Click **"View Logs"**
4. Wait for successful startup message

**Expected deployment time:** 3-5 minutes

### 5.3 Check Deployment Logs

Look for these success indicators in logs:

```bash
✅ Building Docker image
✅ Installing Composer dependencies
✅ Running migrations: php artisan migrate --force
✅ Server started: INFO  Server running on [http://0.0.0.0:8080]
```

**If deployment fails**, check logs for errors and see [Troubleshooting](#troubleshooting) section.

---

## Step 6: Generate Public Domain

### 6.1 Create Railway Domain

1. Navigate to your backend service
2. Go to **Settings** tab
3. Scroll to **Networking** section
4. Under "Public Networking", enter port: `8080`
5. Click **"Generate Domain"**

Railway provides a URL like:
```
https://dutycall-backend-production.up.railway.app
```

**Copy this URL** - you'll need it for the next steps.

### 6.2 Update Environment Variables with Domain

Add these new variables using your Railway domain:

```bash
APP_URL=https://dutycall-backend-production.up.railway.app
FRONTEND_URL=https://your-frontend-url.vercel.app
GOOGLE_CALLBACK_URL=https://dutycall-backend-production.up.railway.app/auth/google/callback
SANCTUM_STATEFUL_DOMAINS=dutycall-backend-production.up.railway.app,your-frontend-url.vercel.app
SESSION_DOMAIN=dutycall-backend-production.up.railway.app
```

**Notes:**
- Replace `dutycall-backend-production.up.railway.app` with your actual Railway domain
- Update `FRONTEND_URL` after deploying frontend (Step 6.3)
- No `https://` in `SANCTUM_STATEFUL_DOMAINS` or `SESSION_DOMAIN`

### 6.3 Update After Frontend Deployment

After deploying your frontend to Vercel:

1. Update `FRONTEND_URL` with your Vercel URL
2. Update `SANCTUM_STATEFUL_DOMAINS` to include both backend and frontend domains
3. Railway will automatically redeploy

---

## Step 7: Update Google OAuth

### 7.1 Add Railway URL to Google Console

1. Go to: https://console.cloud.google.com/apis/credentials
2. Find your **OAuth 2.0 Client ID**
3. Click **Edit**
4. Add to **Authorized JavaScript origins:**
   ```
   https://dutycall-backend-production.up.railway.app
   ```
5. Add to **Authorized redirect URIs:**
   ```
   https://dutycall-backend-production.up.railway.app/auth/google/callback
   ```
6. Click **"Save"**

**Why this is required:**
- Google only allows OAuth callbacks from whitelisted URLs
- Must match `GOOGLE_CALLBACK_URL` environment variable exactly

---

## Step 8: Update Twilio Webhooks

### 8.1 Configure TwiML App

1. Go to Twilio Console: https://console.twilio.com
2. Navigate to: **Voice** → **TwiML** → **TwiML Apps**
3. Select your TwiML App
4. Set **Voice Request URL:**
   ```
   https://dutycall-backend-production.up.railway.app/api/twilio/agent-dial-queue
   ```
5. Set method to **HTTP POST**
6. Click **"Save"**

### 8.2 Configure Phone Number

1. Navigate to: **Phone Numbers** → **Active Numbers**
2. Select your DutyCall phone number
3. Scroll to **Voice Configuration**
4. Set **A Call Comes In** webhook:
   ```
   https://dutycall-backend-production.up.railway.app/api/twilio/inbound
   ```
5. Set method to **HTTP POST**
6. Click **"Save"**

**Why this is required:**
- Twilio sends incoming call events to your backend
- Backend processes calls and returns TwiML instructions

---

## Step 9: Verify Deployment

### 9.1 Test Backend Health

```bash
curl https://dutycall-backend-production.up.railway.app/
```

**Expected response:** HTML 404 page (this means Laravel is running correctly)

**Why 404 is good:**
- Laravel doesn't have a route for `/` (root)
- Seeing Laravel's 404 page confirms the server is running

### 9.2 Check Database Connection

View deployment logs to verify database connection:

```bash
# If you installed Railway CLI:
railway logs

# Or check in Railway dashboard:
# Service → Deployments → Latest → View Logs
```

**Look for:**
```
Migration table created successfully.
Migrating: 2024_01_01_000000_create_users_table
Migrated:  2024_01_01_000000_create_users_table
```

### 9.3 Create Test Users (Optional)

Run seeder to create test accounts:

```bash
# Using Railway CLI:
railway run php artisan db:seed --class=RoleTestUsersSeeder

# Or via Railway dashboard:
# Service → Settings → Run Command
```

**Creates test accounts:**
- `super@dutycall.net` / `password` (super_admin)
- `admin@dutycall.net` / `password` (account_admin)
- `manager@dutycall.net` / `password` (dept_manager)
- `agent@dutycall.net` / `password` (agent)

:::caution Remove Test Users in Production
These test accounts should be removed or passwords changed before production use.
:::

---

## Troubleshooting

### Build Fails: Missing PHP Extensions

**Error:**
```
ext-zip * -> it is missing from your system
```

**Cause:** Dockerfile doesn't include required PHP extension

**Solution:** Ensure Dockerfile includes all extensions:
```dockerfile
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd zip
```

### Server Returns 502 Bad Gateway

**Possible Causes:**
1. Database not connected
2. Missing `APP_KEY`
3. Server failed to start

**Debugging Steps:**
1. Check Railway logs: Service → Deployments → View Logs
2. Verify database variables are linked: `DB_HOST=${{MySQL.MYSQLHOST}}`
3. Ensure `APP_KEY` is set and starts with `base64:`
4. Check for migration errors in logs

**Common Fix:**
```bash
# Redeploy with fresh build
railway redeploy
```

### Migration Errors: Table Already Exists

**Error:**
```
SQLSTATE[42S01]: Base table or view already exists: 1050 Table 'users' already exists
```

**Cause:** Migrations already ran (database has existing tables)

**Solution:** This is expected behavior. The Dockerfile command handles this:
```dockerfile
CMD php artisan migrate --force || true && php artisan serve ...
```

The `|| true` allows the server to start even if migrations fail (tables already exist).

### Session/CSRF Token Errors

**Error:**
```
Session store not set on request
CSRF token mismatch
```

**Causes:**
1. `SESSION_DRIVER` not set to `database`
2. `SANCTUM_STATEFUL_DOMAINS` doesn't include frontend domain
3. CORS not configured

**Solutions:**
1. Verify `SESSION_DRIVER=database`
2. Check `SANCTUM_STATEFUL_DOMAINS` includes both backend and frontend domains (no `https://`)
3. Ensure migrations ran (`sessions` table exists)
4. Update `config/cors.php` to allow frontend origin

### Google OAuth Fails

**Error:**
```
redirect_uri_mismatch
```

**Cause:** Google Console callback URL doesn't match `GOOGLE_CALLBACK_URL`

**Solution:**
1. Verify `GOOGLE_CALLBACK_URL` in Railway variables
2. Check Google Console → Credentials → OAuth 2.0 Client → Authorized redirect URIs
3. URLs must match exactly (including `https://`)

### Twilio Webhooks Not Receiving Calls

**Error:** Calls come in but backend doesn't receive webhook

**Debugging:**
1. Check Railway logs during a test call
2. Verify Twilio webhook URL is correct in Twilio Console
3. Test webhook URL: `curl https://your-backend.railway.app/api/twilio/inbound`
4. Check Twilio debugger: https://console.twilio.com/debugger

**Common Issue:** Webhook URL has typo or uses HTTP instead of HTTPS

---

## Railway CLI (Optional)

### Install Railway CLI

**macOS:**
```bash
brew install railway
```

**Linux/WSL:**
```bash
npm install -g @railway/cli
```

**Windows:**
```powershell
npm install -g @railway/cli
```

### Authenticate

```bash
railway login
```

Opens browser for authentication.

### Link Project

```bash
cd /path/to/backend
railway link
```

Select: **Workspace** → **Project** → **Environment** → **Service**

### Useful Commands

**View logs:**
```bash
railway logs
railway logs --tail 100  # Last 100 lines
railway logs --follow    # Real-time
```

**Check deployment status:**
```bash
railway status
```

**List environment variables:**
```bash
railway variables --kv
```

**Set variable:**
```bash
railway variables --set "APP_DEBUG=false"
```

**Run artisan commands:**
```bash
railway run php artisan tinker
railway run php artisan migrate
railway run php artisan db:seed
```

**Open Railway dashboard:**
```bash
railway open
```

---

## Redeployment

### Auto-Deploy (Recommended)

Railway automatically redeploys when you push to GitHub:

```bash
git add .
git commit -m "Update backend features"
git push origin main
```

**Railway auto-deploy:**
- Detects push to main branch
- Rebuilds Docker image
- Runs migrations
- Deploys new version (~3-5 minutes)

### Manual Redeploy

**Via Dashboard:**
1. Go to Railway dashboard
2. Click on your service
3. Navigate to **Deployments** tab
4. Click **"Redeploy"** on latest deployment

**Via CLI:**
```bash
railway redeploy
```

### Zero-Downtime Deployments

Railway provides zero-downtime deployments by default:
1. New version builds
2. Health check passes
3. Traffic switches to new version
4. Old version terminates

---

## Environment Variable Reference

### Complete List of Required Variables

```bash
# App Configuration
APP_NAME=DutyCall
APP_ENV=production
APP_DEBUG=false
APP_KEY=base64:xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
APP_URL=https://dutycall-backend-production.up.railway.app

# Database (auto-linked from MySQL service)
DB_CONNECTION=mysql
DB_HOST=${{MySQL.MYSQLHOST}}
DB_PORT=${{MySQL.MYSQLPORT}}
DB_DATABASE=${{MySQL.MYSQLDATABASE}}
DB_USERNAME=${{MySQL.MYSQLUSER}}
DB_PASSWORD=${{MySQL.MYSQLPASSWORD}}

# Twilio
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_PHONE_NUMBER=+1xxxxxxxxxx
TWILIO_API_KEY=SKxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_API_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_TWIML_APP_SID=APxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_EDGE=ashburn

# Google OAuth
GOOGLE_CLIENT_ID=xxxxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-xxxxxxxxxxxxxxxxxxxxx
GOOGLE_CALLBACK_URL=https://dutycall-backend-production.up.railway.app/auth/google/callback

# Session & CORS
SESSION_DRIVER=database
SANCTUM_STATEFUL_DOMAINS=dutycall-backend-production.up.railway.app,your-frontend.vercel.app
SESSION_DOMAIN=dutycall-backend-production.up.railway.app
FRONTEND_URL=https://your-frontend.vercel.app

# Laravel Drivers
QUEUE_CONNECTION=database
BROADCAST_DRIVER=log
CACHE_DRIVER=file
FILESYSTEM_DISK=local
LOG_CHANNEL=stack
LOG_LEVEL=debug
```

### Variable Format Guide

**Railway Service References:**
```bash
DB_HOST=${{MySQL.MYSQLHOST}}
# Format: ${{ServiceName.VARIABLE_NAME}}
```

**Domain Variables (no protocol):**
```bash
SANCTUM_STATEFUL_DOMAINS=backend.railway.app,frontend.vercel.app
SESSION_DOMAIN=backend.railway.app
# No https:// prefix
```

**URL Variables (with protocol):**
```bash
APP_URL=https://backend.railway.app
FRONTEND_URL=https://frontend.vercel.app
# Include https:// prefix
```

---

## Cost Tracking

### Railway Pricing

**Free Tier:**
- $5/month credit
- 30 days trial (no credit card required)
- Includes 1 MySQL database
- Up to 500MB storage
- Up to 1GB transfer

**After Free Tier:**
- **Backend Service:** ~$10-15/month
- **MySQL Database:** ~$5-10/month
- **Total:** ~$15-25/month

**Billing is usage-based:**
- CPU usage
- Memory usage
- Disk storage
- Network transfer

**Cost Optimization Tips:**
- Use `APP_DEBUG=false` (reduces log storage)
- Optimize database queries
- Use caching (`CACHE_DRIVER=redis` for production)

### Twilio Costs

**Monthly Costs:**
- Phone Number: ~$1.15/month
- Incoming calls: ~$0.0085/minute
- Outgoing calls: ~$0.013/minute
- SMS (if used): ~$0.0075/message

**Example Monthly Cost:**
- Phone number: $1.15
- 1,000 inbound minutes: $8.50
- 500 outbound minutes: $6.50
- **Total:** ~$16/month

**Cost Tracking:**
- Monitor in Twilio Console → Usage
- Set billing alerts in Twilio account
- Review monthly invoices

---

## Security Checklist

Before going to production, verify:

- [ ] `APP_DEBUG=false` (prevents sensitive error display)
- [ ] `APP_KEY` is strong and unique (generated via `php artisan key:generate`)
- [ ] Database credentials are Railway-managed (not hardcoded)
- [ ] HTTPS is enabled (Railway provides free SSL)
- [ ] CORS configured for production frontend domain only
- [ ] OAuth callback URLs whitelisted in Google Console
- [ ] Twilio webhook URLs use HTTPS (not HTTP)
- [ ] Environment variables never committed to Git (.env in .gitignore)
- [ ] Test user accounts removed or passwords changed
- [ ] File permissions secure (storage/ writable only)

**Additional Security:**
- Enable Railway's built-in DDoS protection
- Set up rate limiting in Laravel (`throttle` middleware)
- Use Twilio signature validation for webhooks
- Implement API authentication (Sanctum tokens)

---

## Monitoring & Maintenance

### View Logs

**Via Railway CLI:**
```bash
railway logs --tail 100   # Last 100 lines
railway logs --follow     # Real-time logs
```

**Via Dashboard:**
Service → Deployments → Latest → View Logs

### Check Deployment Status

```bash
railway status
```

**Output:**
```
Service:     backend
Status:      Running
URL:         https://dutycall-backend-production.up.railway.app
Last Deploy: 5 minutes ago
```

### Database Monitoring

**View MySQL metrics in Railway:**
Service → MySQL → Metrics

**Monitor:**
- CPU usage
- Memory usage
- Disk usage
- Active connections

### Database Backup

**Railway automatic backups:**
- Daily snapshots (retained 7 days)
- Point-in-time recovery available

**Manual backup:**
```bash
railway run php artisan backup:run
```

### Update Dependencies

When updating Laravel or Composer packages:

```bash
# Update locally
composer update

# Commit updated lock file
git add composer.lock
git commit -m "Update Laravel dependencies"
git push origin main

# Railway auto-redeploys with new dependencies
```

### Health Checks

Create a health check endpoint in Laravel:

**Route:** `routes/api.php`
```php
Route::get('/health', function () {
    return response()->json([
        'status' => 'healthy',
        'database' => DB::connection()->getDatabaseName(),
        'timestamp' => now()->toISOString()
    ]);
});
```

**Test:**
```bash
curl https://dutycall-backend-production.up.railway.app/api/health
```

---

## Next Steps

After successful backend deployment:

1. **Deploy Frontend** → Frontend deployment guide (coming soon)
2. **Configure Custom Domain** → Custom domain setup guide (coming soon)
3. **End-to-End Testing** → Production testing guide (coming soon)
4. **Set Up Monitoring** → Monitoring guide (coming soon)

**Immediate Action Items:**
1. Update `FRONTEND_URL` after deploying frontend
2. Test Google OAuth login flow
3. Test Twilio inbound call flow
4. Remove or secure test user accounts

---

## Additional Resources

### Railway Documentation
- [Railway Docs](https://docs.railway.app)
- [Railway CLI Reference](https://docs.railway.app/develop/cli)
- [Environment Variables](https://docs.railway.app/develop/variables)

### Laravel Documentation
- [Laravel Deployment](https://laravel.com/docs/deployment)
- [Laravel Sanctum](https://laravel.com/docs/sanctum)
- [Laravel Queue](https://laravel.com/docs/queues)

### Docker Resources
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)
- [Dockerfile Reference](https://docs.docker.com/engine/reference/builder/)

### Third-Party Services
- [Twilio Webhooks](https://www.twilio.com/docs/usage/webhooks)
- [Google OAuth 2.0](https://developers.google.com/identity/protocols/oauth2)

---

## Support

If you encounter deployment issues:

1. **Check Railway logs** first: `railway logs`
2. **Review environment variables**: `railway variables --kv`
3. **Consult troubleshooting section** above
4. **Test locally** with same environment variables
5. **Contact development team** with:
   - Error message from logs
   - Steps to reproduce
   - Environment configuration (sanitized)

**Common Support Channels:**
- Railway Discord: https://discord.gg/railway
- DutyCall GitHub Issues: (your repository issues page)
- Development team Slack/email

---

**Deployment successful?** 🎉 Your DutyCall backend is now live on Railway! Next, deploy the frontend to complete the full-stack deployment.
