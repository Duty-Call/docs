---
sidebar_position: 1
---

# Production Deployment Guide

**Last Updated:** October 19, 2025
**Status:** Production-tested and verified

Deploy DutyCall backend and frontend with multiple hosting options.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

## Overview

<Tabs groupId="developer-type">
<TabItem value="human" label="👨‍💻 Human Developer" default>

DutyCall consists of two main components:
- **Backend**: Laravel 11 API (PHP 8.3 + MySQL/PostgreSQL)
- **Frontend**: Next.js 15 SPA (React)

This guide covers multiple deployment options to ensure reliability, security, and maintainability for production environments.

### Deployment Platform Options

| Feature | DigitalOcean Droplet | Railway | Vercel (Frontend) |
|---------|---------------------|---------|-------------------|
| **Control** | Full root access | Managed platform | Managed platform |
| **Reliability** | You manage it | Platform-dependent | Excellent |
| **Cost** | $12/month (2GB) | Free tier available | Free tier available |
| **Env Var Stability** | ✅ Stable | ⚠️ Has failed in production | ✅ Stable |
| **Monitoring** | You configure it | Built-in (basic) | Built-in (basic) |
| **Recommended For** | Production backend | Development/staging | Production frontend |

</TabItem>
<TabItem value="ai" label="🤖 AI Agent">

**Architecture Stack**:
- Backend: Laravel 11 (PHP 8.3)
- Frontend: Next.js 15 (React)
- Database: MySQL (DigitalOcean) or PostgreSQL (Railway)
- Deployment: Multi-platform support

**Platform Options**:
1. **DigitalOcean Droplet** (Recommended for production)
   - Full control, stable, requires manual setup
2. **Railway** (Alternative, with warnings)
   - Managed, auto-deploy, known reliability issues
3. **Vercel** (Frontend only)
   - Edge deployment, excellent for Next.js

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
1. Set up external monitoring (UptimeRobot - see [Monitoring section](#monitoring--alerting))
2. Document all environment variables externally
3. Configure manual database backups
4. Be prepared to migrate to another platform

**Recommended:** Use Railway for development/staging only. Use DigitalOcean Droplet for production.

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
- Migration plan ready

</TabItem>
</Tabs>

---

## DigitalOcean Droplet Deployment (Recommended)

<Tabs groupId="developer-type">
<TabItem value="human" label="👨‍💻 Human Developer" default>

### Prerequisites

- DigitalOcean account
- Domain name with DNS control
- SSH key pair
- GitHub repository access

### Step 1: Create Droplet

**Via DigitalOcean Web UI:**
1. Login to DigitalOcean
2. Create → Droplets
3. Choose plan: **Basic $12/month (2GB RAM, 1 vCPU, 50GB SSD)**
4. Region: Select closest to your users
5. OS: **Ubuntu 22.04 LTS**
6. Authentication: Add your SSH key
7. Hostname: `dutycall-backend`

**Via CLI (doctl):**
```bash
# Install doctl
brew install doctl  # macOS

# Authenticate
doctl auth init

# Get your SSH key ID
doctl compute ssh-key list

# Create droplet
doctl compute droplet create dutycall-backend \
  --image ubuntu-22-04-x64 \
  --size s-2vcpu-2gb \
  --region nyc1 \
  --ssh-keys YOUR_SSH_KEY_ID

# Get droplet IP
doctl compute droplet list
```

### Step 2: Install LEMP Stack

SSH into your droplet and run:

```bash
# Update system
apt update && apt upgrade -y

# Install Nginx
apt install -y nginx

# Install PHP 8.3 and required extensions
apt install -y software-properties-common
add-apt-repository -y ppa:ondrej/php
apt update
apt install -y \
  php8.3 \
  php8.3-fpm \
  php8.3-cli \
  php8.3-mysql \
  php8.3-mbstring \
  php8.3-xml \
  php8.3-curl \
  php8.3-zip \
  php8.3-bcmath \
  php8.3-gd \
  php8.3-intl

# Install MySQL
apt install -y mysql-server

# Secure MySQL
mysql_secure_installation

# Install Composer
curl -sS https://getcomposer.org/installer | php
mv composer.phar /usr/local/bin/composer

# Install Certbot for SSL
apt install -y certbot python3-certbot-nginx

# Install Git
apt install -y git
```

### Step 3: Configure MySQL Database

```bash
# Login to MySQL
mysql -u root -p

# Create database and user
CREATE DATABASE dutycall;
CREATE USER 'dutycall'@'localhost' IDENTIFIED BY 'YOUR_SECURE_PASSWORD_HERE';
GRANT ALL PRIVILEGES ON dutycall.* TO 'dutycall'@'localhost';
FLUSH PRIVILEGES;
EXIT;

# Save credentials securely
cat > /root/.dutycall-db-credentials << EOF
Database: dutycall
Username: dutycall
Password: YOUR_SECURE_PASSWORD_HERE
EOF

chmod 600 /root/.dutycall-db-credentials
```

**Generate secure password:**
```bash
openssl rand -base64 32
```

### Step 4: Deploy Laravel Backend

```bash
# Create application directory
mkdir -p /var/www/dutycall
cd /var/www/dutycall

# Generate SSH deploy key for GitHub
ssh-keygen -t ed25519 -C "dutycall-production" -f ~/.ssh/dutycall_deploy_key -N ""

# Display public key to add to GitHub
cat ~/.ssh/dutycall_deploy_key.pub
```

**Add deploy key to GitHub:**
1. Go to GitHub repository → Settings → Deploy keys
2. Add new deploy key
3. Paste public key content

```bash
# Clone repository
GIT_SSH_COMMAND="ssh -i ~/.ssh/dutycall_deploy_key" git clone git@github.com:YOUR_ORG/dutycall.git backend

cd backend

# Install dependencies
composer install --no-dev --optimize-autoloader

# Configure environment
cp .env.example .env
nano .env  # Edit with production values
```

**Production .env:**
```bash
APP_NAME=DutyCall
APP_ENV=production
APP_KEY=  # Will generate in next step
APP_DEBUG=false  # CRITICAL: Must be false
APP_URL=https://api.dutycall.net

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=dutycall
DB_USERNAME=dutycall
DB_PASSWORD=YOUR_SECURE_PASSWORD

FRONTEND_URL=https://dutycall.vercel.app
SANCTUM_STATEFUL_DOMAINS=dutycall.vercel.app
SESSION_DOMAIN=.vercel.app

SESSION_DRIVER=database
QUEUE_CONNECTION=database

# Add Twilio, Sentry, etc. as needed
```

```bash
# Initialize application
php artisan key:generate
php artisan session:table
php artisan migrate --force
php artisan db:seed --class=RoleTestUsersSeeder --force

# Set permissions (CRITICAL)
chown -R www-data:www-data storage bootstrap/cache
chmod -R 775 storage bootstrap/cache

# Cache configuration
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

### Step 5: Configure Nginx

```bash
# Create Nginx site configuration
cat > /etc/nginx/sites-available/dutycall << 'EOF'
server {
    listen 80;
    server_name api.dutycall.net;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name api.dutycall.net;
    root /var/www/dutycall/backend/public;
    index index.php index.html;

    ssl_certificate /etc/letsencrypt/live/api.dutycall.net/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/api.dutycall.net/privkey.pem;

    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.3-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
        fastcgi_hide_header X-Powered-By;
    }

    location ~ /\. {
        deny all;
    }

    access_log /var/log/nginx/dutycall-access.log;
    error_log /var/log/nginx/dutycall-error.log;
}
EOF

# Enable site
ln -s /etc/nginx/sites-available/dutycall /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t
systemctl restart nginx
```

### Step 6: Configure DNS & SSL

**Add DNS A record:**
```
Type: A
Host: api
Value: YOUR_DROPLET_IP
```

**Install SSL certificate:**
```bash
certbot --nginx -d api.dutycall.net
systemctl list-timers | grep certbot  # Verify auto-renewal
```

### Step 7: Configure Firewall

```bash
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw enable
ufw status
```

### Step 8: Test Backend

```bash
curl https://api.dutycall.net/api/user
# Should return 401 Unauthorized (means API is running)
```

</TabItem>
<TabItem value="ai" label="🤖 AI Agent">

**DigitalOcean Setup Summary**:

**Infrastructure**:
- Ubuntu 22.04 LTS droplet ($12/month, 2GB RAM)
- Nginx web server
- PHP 8.3-FPM
- MySQL 8.0+
- Let's Encrypt SSL (auto-renew)
- UFW firewall (ports 22, 80, 443)

**Deployment Flow**:
1. Create droplet (doctl or web UI)
2. Install LEMP stack (Nginx, PHP, MySQL)
3. Configure MySQL database with secure password
4. Clone Laravel app from GitHub
5. Configure .env with production values
6. Run migrations, set permissions
7. Configure Nginx virtual host
8. Point DNS A record to droplet IP
9. Install SSL with Certbot
10. Enable firewall, test endpoints

**Key Files**:
- App: `/var/www/dutycall/backend`
- Nginx config: `/etc/nginx/sites-available/dutycall`
- Logs: `/var/log/nginx/dutycall-*.log`
- DB credentials: `/root/.dutycall-db-credentials`

**Updates**:
```bash
cd /var/www/dutycall/backend
git pull origin main
composer install --no-dev --optimize-autoloader
php artisan migrate --force
php artisan config:cache
systemctl restart php8.3-fpm
```

</TabItem>
</Tabs>

---

## Railway Deployment (Alternative - Not Recommended for Production)

<Tabs groupId="developer-type">
<TabItem value="human" label="👨‍💻 Human Developer" default>

:::warning Use Railway at Your Own Risk
Railway has known reliability issues in production (see incident report above). Use for development/staging only, or ensure robust external monitoring is in place.
:::

### Step 1: Install Railway CLI

```bash
npm install -g @railway/cli
railway login
railway link  # Select your project
```

### Step 2: Configure Environment Variables

Add via Railway dashboard or CLI:

```bash
railway variables set APP_ENV=production
railway variables set APP_DEBUG=false
railway variables set APP_URL=https://YOUR_PROJECT.railway.app
railway variables set FRONTEND_URL=https://YOUR_FRONTEND.vercel.app
# ... add all other variables from .env
```

:::danger Document Variables Externally
Railway environment variables can disappear. Keep a backup copy in a secure location (1Password, encrypted file, etc.).
:::

### Step 3: Deploy

```bash
git push origin main  # Auto-deploys
# Or: railway up
```

### Step 4: Run Migrations

```bash
railway run php artisan migrate --force
railway run php artisan db:seed --class=RoleTestUsersSeeder --force
```

</TabItem>
<TabItem value="ai" label="🤖 AI Agent">

**Railway Deployment** (Use with caution):

**Setup**:
```bash
npm install -g @railway/cli
railway login
railway link
railway variables set KEY=VALUE
railway up
```

**Environment**:
- Auto-detects Laravel via composer.json
- PostgreSQL database (not MySQL)
- Auto-deploys on push to main
- Docker containerization

**Risks**:
- Environment variables can disappear
- No automatic backups on free tier
- Limited control over infrastructure

**Mandatory if using Railway**:
- External monitoring (UptimeRobot)
- External env var backup
- Migration plan to DigitalOcean ready

</TabItem>
</Tabs>

---

## Vercel Frontend Deployment

<Tabs groupId="developer-type">
<TabItem value="human" label="👨‍💻 Human Developer" default>

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

**Setup**:
```bash
npm install -g vercel
cd frontend/
vercel link
echo "VALUE" | vercel env add VAR_NAME production
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

## CORS Configuration Best Practices

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

### Test CORS

```bash
curl -v -X OPTIONS https://api.dutycall.net/api/login \
  -H "Origin: https://frontend-abc123.vercel.app" \
  -H "Access-Control-Request-Method: POST" \
  -H "Access-Control-Request-Headers: content-type,authorization"

# Should return:
# access-control-allow-origin: https://frontend-abc123.vercel.app
# access-control-allow-credentials: true
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

**Test**: Use curl with OPTIONS request and various Origin headers

</TabItem>
</Tabs>

---

## Monitoring & Alerting (MANDATORY FOR PRODUCTION)

<Tabs groupId="developer-type">
<TabItem value="human" label="👨‍💻 Human Developer" default>

:::danger Why Monitoring is Critical
The October 19, 2025 incident happened because we had NO monitoring. Railway environment variable disappeared → CORS broke → Login failed → **No alerts sent** → 6+ hour outage.

**Monitoring is not optional. It is mandatory for production deployments.**
:::

### UptimeRobot Setup (Free)

**Create free account:** https://uptimerobot.com/

**Configure 3 monitors:**

#### 1. Backend API Health
```
Type: HTTP(s)
Name: DutyCall Backend API
URL: https://api.dutycall.net/api/user
Interval: 5 minutes
Method: HEAD
Expected Status: 401 (unauthenticated - means API is running)
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

Add to `.env`:
```bash
SENTRY_LARAVEL_DSN=https://YOUR_DSN@sentry.io/PROJECT_ID
SENTRY_ENVIRONMENT=production
SENTRY_TRACES_SAMPLE_RATE=0.2
```

**Frontend:**
```bash
npm install --save @sentry/nextjs
npx @sentry/wizard@latest -i nextjs
```

Add to `.env`:
```bash
NEXT_PUBLIC_SENTRY_DSN=https://YOUR_DSN@sentry.io/PROJECT_ID
SENTRY_ENVIRONMENT=production
```

</TabItem>
<TabItem value="ai" label="🤖 AI Agent">

**Monitoring Stack**:

**UptimeRobot** (Uptime monitoring):
- Backend API health (expects 401 Unauthorized)
- SSL certificate expiration (30-day warning)
- Frontend availability (expects 200 OK)
- 5-minute intervals
- Email alerts

**Sentry** (Error tracking):
- Backend: Laravel integration
- Frontend: Next.js integration
- Real-time error alerts
- Stack traces with context
- Performance monitoring

**Setup Commands**:
```bash
# Backend
composer require sentry/sentry-laravel

# Frontend
npm install --save @sentry/nextjs
npx @sentry/wizard@latest -i nextjs
```

**Configuration**: Add `SENTRY_*` variables to environment

**Why Mandatory**: October 19, 2025 incident caused 6+ hour outage due to lack of monitoring

</TabItem>
</Tabs>

---

## Security Best Practices

<Tabs groupId="developer-type">
<TabItem value="human" label="👨‍💻 Human Developer" default>

### Security Checklist

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

### Hardening SSH Access

```bash
nano /etc/ssh/sshd_config

# Set these values:
PasswordAuthentication no
PermitRootLogin prohibit-password
PubkeyAuthentication yes

systemctl restart sshd
```

### Automated Security Updates

```bash
apt install -y unattended-upgrades
dpkg-reconfigure --priority=low unattended-upgrades
```

</TabItem>
<TabItem value="ai" label="🤖 AI Agent">

**Security Configuration**:

**Critical Settings**:
- `APP_DEBUG=false` (prevents info disclosure)
- `APP_ENV=production` (disables dev helpers)
- Strong passwords (20+ chars, random)
- SSH key auth only (no passwords)

**File Permissions**:
- `.env`: 600 (read/write owner only)
- `storage/`: www-data:www-data 775

**Network Security**:
- Firewall: Ports 22, 80, 443 only
- SSL/HTTPS: Required (auto-provisioned)
- SSH: Key-based auth, no root password login

**Updates**:
- Automated security updates (unattended-upgrades)
- Regular dependency updates
- Credential rotation (quarterly)

</TabItem>
</Tabs>

---

## Troubleshooting

<Tabs groupId="developer-type">
<TabItem value="human" label="👨‍💻 Human Developer" default>

### Storage Permission Errors

**Symptoms:** 500 errors, "failed to open stream: Permission denied"

**Diagnosis:** Web server (www-data) doesn't have write permissions to Laravel storage directories.

**Solution:**
```bash
ssh root@YOUR_DROPLET_IP
cd /var/www/dutycall/backend
chown -R www-data:www-data storage bootstrap/cache
chmod -R 775 storage bootstrap/cache
php artisan config:clear
```

### CORS Errors

**Symptoms:** "No 'Access-Control-Allow-Origin' header" in browser console

**Diagnosis:**
1. Backend doesn't recognize the frontend's origin
2. CORS config doesn't include pattern matching
3. Config cache is stale

**Solution:**
```bash
# 1. Verify CORS config has pattern matching
cat /var/www/dutycall/backend/config/cors.php | grep allowed_origins_patterns
# Should show: 'allowed_origins_patterns' => ['#https://.*\.vercel\.app$#']

# 2. Clear config cache
cd /var/www/dutycall/backend
php artisan config:clear
php artisan config:cache

# 3. Test CORS
curl -v -X OPTIONS https://api.dutycall.net/api/login \
  -H "Origin: https://YOUR_FRONTEND.vercel.app" \
  -H "Access-Control-Request-Method: POST"
```

### Database Connection Errors

**Symptoms:** "SQLSTATE[HY000] [2002] Connection refused"

**Solution:**
```bash
# Check MySQL is running
systemctl status mysql

# Test connection
mysql -u dutycall -p dutycall

# Verify .env credentials
cat /root/.dutycall-db-credentials
cat /var/www/dutycall/backend/.env | grep DB_
```

### Frontend - Old Deployment Cached

**Symptoms:** Changes don't appear after deployment

**Solution:**
```bash
# 1. Hard refresh browser (Cmd+Shift+R or Ctrl+Shift+R)

# 2. Verify deployment is recent
vercel ls --prod | head -5

# 3. Force new deployment
git commit --allow-empty -m "chore: force redeploy"
git push origin main
```

### Frontend - Environment Variables Not Applied

**Symptoms:** App calls wrong API URL (localhost, old URL)

**Solution:**
```bash
# 1. Verify env vars exist
vercel env ls | grep NEXT_PUBLIC_API_URL
# Should show entries for production, preview, AND development

# 2. Trigger rebuild (env vars are baked in at build time!)
git commit --allow-empty -m "chore: rebuild with env vars"
git push origin main
```

</TabItem>
<TabItem value="ai" label="🤖 AI Agent">

### Quick Diagnostic Commands

**Backend Health:**
```bash
curl -I https://api.dutycall.net/api/user  # Expect: 401
ssh root@IP "cd /var/www/dutycall/backend && php artisan migrate:status"
ssh root@IP "tail -n 50 /var/www/dutycall/backend/storage/logs/laravel.log"
```

**Frontend Health:**
```bash
curl -I https://dutycall.vercel.app  # Expect: 200
vercel ls --prod | head -5
vercel logs --since 1h
```

### Common Issues Quick Fix Matrix

| Issue | Quick Fix | Verification |
|-------|-----------|--------------|
| Storage permissions | `ssh root@IP "cd /var/www/dutycall/backend && chown -R www-data:www-data storage bootstrap/cache && chmod -R 775 storage bootstrap/cache"` | `ssh root@IP "ls -la /var/www/dutycall/backend/storage"` |
| CORS errors | `ssh root@IP "cd /var/www/dutycall/backend && php artisan config:clear && php artisan config:cache"` | `curl -v -X OPTIONS https://api.dutycall.net/api/login -H "Origin: https://test.vercel.app"` |
| Database connection | `ssh root@IP "systemctl status mysql"` then `ssh root@IP "cd /var/www/dutycall/backend && php artisan config:clear"` | `ssh root@IP "mysql -u dutycall -p dutycall -e 'SELECT 1'"` |
| Stale frontend | `git commit --allow-empty -m "chore: force redeploy" && git push origin main` | `vercel ls --prod \| head -3` |
| Missing env vars | `vercel env ls` then `echo "VALUE" \| vercel env add VAR_NAME production` then redeploy | `vercel logs \| grep NEXT_PUBLIC` |

### Investigation Checklist

When user reports an issue, execute in order:

1. **Gather evidence**
   ```bash
   ssh root@IP "tail -100 /var/www/dutycall/backend/storage/logs/laravel.log"
   ssh root@IP "tail -100 /var/log/nginx/dutycall-error.log"
   vercel logs --since 1h
   ```

2. **Test connectivity**
   ```bash
   curl -v https://api.dutycall.net/api/user
   curl -v https://dutycall.vercel.app
   ```

3. **Check recent changes**
   ```bash
   ssh root@IP "cd /var/www/dutycall/backend && git log --oneline -5"
   vercel ls | head -10
   ```

4. **Verify configuration**
   ```bash
   ssh root@IP "cd /var/www/dutycall/backend && grep -E '(APP_ENV|APP_DEBUG|DB_|FRONTEND_URL)' .env"
   vercel env ls
   ```

### Emergency Rollback

**Backend (DigitalOcean):**
```bash
ssh root@IP "cd /var/www/dutycall/backend && git log --oneline -5"
# Note last working commit
ssh root@IP "cd /var/www/dutycall/backend && git checkout COMMIT_HASH && composer install --no-dev && php artisan config:cache && systemctl restart php8.3-fpm"
```

**Frontend (Vercel):**
```bash
vercel ls --prod | head -10
# In Vercel dashboard: Go to deployment → "Promote to Production"
# Or: vercel rollback
```

### Key Files Reference

| File | Purpose | Location |
|------|---------|----------|
| Backend logs | Error traces | `/var/www/dutycall/backend/storage/logs/laravel.log` |
| Nginx error log | Web server errors | `/var/log/nginx/dutycall-error.log` |
| Nginx access log | Request logs | `/var/log/nginx/dutycall-access.log` |
| Backend .env | Config | `/var/www/dutycall/backend/.env` |
| CORS config | CORS settings | `/var/www/dutycall/backend/config/cors.php` |
| DB credentials | DB password | `/root/.dutycall-db-credentials` |

</TabItem>
</Tabs>

---

## Additional Resources

- [Local Development Setup](/developers/getting-started/local-setup)
- [Environment Configuration](/developers/getting-started/environment-config)
- [Monitoring Systems Guide](/monitoring)
- **Railway Docs**: https://docs.railway.app
- **Vercel Docs**: https://vercel.com/docs
- **DigitalOcean Docs**: https://docs.digitalocean.com

---

**Questions?** Check the troubleshooting section or contact support@dutycall.net

**Ready to deploy?** Start with DigitalOcean Droplet setup for production! 🚀
