---
id: digitalocean
title: Backend Deployment to DigitalOcean
sidebar_label: DigitalOcean Droplet
sidebar_position: 2
---

# Backend Deployment to DigitalOcean Droplet

:::tip Recommended for Production
DigitalOcean Droplets provide full control, stable environment variables, and predictable costs. This is our recommended platform for production deployments.
:::

## Overview

Deploy the DutyCall Laravel backend to a DigitalOcean VPS (Droplet) with complete control over your infrastructure.

**Time to Deploy:** ~60 minutes (first time)
**Difficulty:** Intermediate-Advanced
**Monthly Cost:** $12/month (2GB Droplet)

**What You Get:**
- 🔧 Full root access and control
- 💪 Stable, predictable environment
- 🔒 SSL via Let's Encrypt (auto-renewing)
- 📊 You configure your own monitoring
- 💰 Flat rate: $12/month

---

## Prerequisites

### Required Accounts & Tools

**1. DigitalOcean Account**
- Sign up: https://www.digitalocean.com
- Payment method on file
- SSH key uploaded to account

**2. Domain Name**
- DNS control (ability to add A records)
- Example: `api.dutycall.net`

**3. GitHub Account**
- Repository with DutyCall code
- SSH deploy key configured

**4. Local Tools**
- SSH client
- Git
- (Optional) `doctl` CLI for automation

---

## Step 1: Create Droplet

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs groupId="developer-type">
<TabItem value="human" label="👨‍💻 Human Developer" default>

### Option A: Via DigitalOcean Web UI

1. **Login to DigitalOcean Dashboard**
2. **Create → Droplets**
3. **Choose plan:** Basic $12/month
   - 2GB RAM
   - 1 vCPU
   - 50GB SSD
4. **Choose region:** Select closest to your users
5. **Choose OS:** Ubuntu 22.04 LTS
6. **Authentication:** Add your SSH key
7. **Hostname:** `dutycall-backend`
8. **Click "Create Droplet"**

### Option B: Via CLI (doctl)

```bash
# Install doctl
brew install doctl  # macOS
# OR: Download from https://github.com/digitalocean/doctl/releases

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

# Get droplet IP (wait ~60 seconds for creation)
doctl compute droplet list
```

**Save your droplet IP address** - you'll need it throughout this guide.

</TabItem>
<TabItem value="ai" label="🤖 AI Agent">

**Droplet Specifications:**
- **OS:** Ubuntu 22.04 LTS (long-term support)
- **Size:** s-2vcpu-2gb ($12/month)
- **Region:** Choose based on user geography
- **Authentication:** SSH key only (no password)

**Creation Command:**
```bash
doctl compute droplet create dutycall-backend \
  --image ubuntu-22-04-x64 \
  --size s-2vcpu-2gb \
  --region nyc1 \
  --ssh-keys SSH_KEY_ID
```

**Verification:**
```bash
doctl compute droplet list
# Note the IP address for DNS configuration
```

</TabItem>
</Tabs>

---

## Step 2: Install LEMP Stack

<Tabs groupId="developer-type">
<TabItem value="human" label="👨‍💻 Human Developer" default>

SSH into your droplet and install the required software stack.

```bash
# SSH into droplet (replace with your IP)
ssh root@YOUR_DROPLET_IP
```

### 2.1: Update System

```bash
apt update && apt upgrade -y
```

### 2.2: Install Nginx

```bash
apt install -y nginx
```

### 2.3: Install PHP 8.3

```bash
# Add PHP repository
apt install -y software-properties-common
add-apt-repository -y ppa:ondrej/php
apt update

# Install PHP and required extensions
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

# Verify PHP installation
php -v
# Should show: PHP 8.3.x
```

### 2.4: Install MySQL

```bash
apt install -y mysql-server

# Secure MySQL installation
mysql_secure_installation
```

**During mysql_secure_installation:**
- Set root password: **YES** (use strong password)
- Remove anonymous users: **YES**
- Disallow root login remotely: **YES**
- Remove test database: **YES**
- Reload privilege tables: **YES**

### 2.5: Install Composer

```bash
curl -sS https://getcomposer.org/installer | php
mv composer.phar /usr/local/bin/composer

# Verify Composer installation
composer --version
```

### 2.6: Install Certbot (SSL)

```bash
apt install -y certbot python3-certbot-nginx
```

### 2.7: Install Git

```bash
apt install -y git

# Verify Git installation
git --version
```

</TabItem>
<TabItem value="ai" label="🤖 AI Agent">

**LEMP Stack Components:**
- **L**inux: Ubuntu 22.04 LTS
- **E**ngine: Nginx (web server)
- **M**ySQL: 8.0+ (database)
- **P**HP: 8.3 with FPM

**Installation Script:**
```bash
ssh root@DROPLET_IP << 'EOF'
apt update && apt upgrade -y
apt install -y nginx
apt install -y software-properties-common
add-apt-repository -y ppa:ondrej/php
apt update
apt install -y php8.3 php8.3-fpm php8.3-cli php8.3-mysql \
  php8.3-mbstring php8.3-xml php8.3-curl php8.3-zip \
  php8.3-bcmath php8.3-gd php8.3-intl
apt install -y mysql-server
curl -sS https://getcomposer.org/installer | php
mv composer.phar /usr/local/bin/composer
apt install -y certbot python3-certbot-nginx git
EOF
```

**Note:** `mysql_secure_installation` requires interactive input - run separately

</TabItem>
</Tabs>

---

## Step 3: Configure MySQL Database

<Tabs groupId="developer-type">
<TabItem value="human" label="👨‍💻 Human Developer" default>

### 3.1: Generate Secure Password

```bash
openssl rand -base64 32
```

Copy this password - you'll need it for the database user.

### 3.2: Create Database and User

```bash
# Login to MySQL as root
mysql -u root -p
# Enter the root password you set during mysql_secure_installation
```

**Inside MySQL prompt:**
```sql
CREATE DATABASE dutycall;
CREATE USER 'dutycall'@'localhost' IDENTIFIED BY 'YOUR_SECURE_PASSWORD_HERE';
GRANT ALL PRIVILEGES ON dutycall.* TO 'dutycall'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

### 3.3: Save Credentials Securely

```bash
cat > /root/.dutycall-db-credentials << EOF
Database: dutycall
Username: dutycall
Password: YOUR_SECURE_PASSWORD_HERE
Host: localhost
Port: 3306
EOF

# Secure the credentials file
chmod 600 /root/.dutycall-db-credentials

# Verify it's saved
cat /root/.dutycall-db-credentials
```

:::warning Keep Credentials Safe
This file contains your database password. Never commit it to Git or share it publicly.
:::

</TabItem>
<TabItem value="ai" label="🤖 AI Agent">

**Database Setup:**

```bash
# Generate secure password
DB_PASSWORD=$(openssl rand -base64 32)

# Create database and user
mysql -u root -p << EOF
CREATE DATABASE dutycall;
CREATE USER 'dutycall'@'localhost' IDENTIFIED BY '${DB_PASSWORD}';
GRANT ALL PRIVILEGES ON dutycall.* TO 'dutycall'@'localhost';
FLUSH PRIVILEGES;
EXIT;
EOF

# Save credentials
cat > /root/.dutycall-db-credentials << EOF
Database: dutycall
Username: dutycall
Password: ${DB_PASSWORD}
Host: localhost
Port: 3306
EOF

chmod 600 /root/.dutycall-db-credentials
```

**Important:** Store `DB_PASSWORD` securely for use in Laravel `.env` file

</TabItem>
</Tabs>

---

## Step 4: Deploy Laravel Application

<Tabs groupId="developer-type">
<TabItem value="human" label="👨‍💻 Human Developer" default>

### 4.1: Generate GitHub Deploy Key

```bash
# Create application directory
mkdir -p /var/www/dutycall
cd /var/www/dutycall

# Generate SSH key for GitHub
ssh-keygen -t ed25519 -C "dutycall-production" -f ~/.ssh/dutycall_deploy_key -N ""

# Display public key
cat ~/.ssh/dutycall_deploy_key.pub
```

**Copy the public key output** - you'll add this to GitHub.

### 4.2: Add Deploy Key to GitHub

1. Go to your GitHub repository
2. **Settings** → **Deploy keys**
3. Click **Add deploy key**
4. **Title:** `DigitalOcean Production Server`
5. **Key:** Paste the public key from above
6. Check **Allow write access** (if using CI/CD)
7. Click **Add key**

### 4.3: Clone Repository

```bash
# Clone using the deploy key
GIT_SSH_COMMAND="ssh -i ~/.ssh/dutycall_deploy_key -o StrictHostKeyChecking=no" \
  git clone git@github.com:YOUR_ORG/dutycall.git backend

cd backend

# Verify you're on the main branch
git branch
# Should show: * main
```

### 4.4: Install PHP Dependencies

```bash
composer install --no-dev --optimize-autoloader
```

This will take 2-3 minutes to complete.

### 4.5: Configure Environment

```bash
# Copy example environment file
cp .env.example .env

# Edit with production values
nano .env
```

**Production .env configuration:**

```bash
APP_NAME=DutyCall
APP_ENV=production
APP_KEY=  # Will generate in next step
APP_DEBUG=false  # CRITICAL: Must be false in production
APP_URL=https://api.dutycall.net

LOG_CHANNEL=stack
LOG_LEVEL=error

# Database (use password from /root/.dutycall-db-credentials)
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=dutycall
DB_USERNAME=dutycall
DB_PASSWORD=YOUR_SECURE_PASSWORD_FROM_STEP_3

# Frontend CORS
FRONTEND_URL=https://dutycall.vercel.app
SANCTUM_STATEFUL_DOMAINS=dutycall.vercel.app
SESSION_DOMAIN=.vercel.app

# Session & Queue
SESSION_DRIVER=database
QUEUE_CONNECTION=database

# Twilio (optional - only if using voice features)
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_PHONE_NUMBER=
TWILIO_API_KEY=
TWILIO_API_SECRET=
TWILIO_TWIML_APP_SID=
TWILIO_EDGE=ashburn

# Google OAuth (optional)
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# Error Tracking (optional but recommended)
SENTRY_LARAVEL_DSN=
SENTRY_ENVIRONMENT=production
SENTRY_TRACES_SAMPLE_RATE=0.2
```

**Save and exit** (Ctrl+X, then Y, then Enter)

### 4.6: Initialize Application

```bash
# Generate application encryption key
php artisan key:generate

# Create sessions table (required for SESSION_DRIVER=database)
php artisan session:table

# Run database migrations
php artisan migrate --force

# Seed database with test users (optional for production)
php artisan db:seed --class=RoleTestUsersSeeder --force

# Set file permissions (CRITICAL)
chown -R www-data:www-data storage bootstrap/cache
chmod -R 775 storage bootstrap/cache

# Cache configuration for performance
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

### 4.7: Verify Setup

```bash
# Check Laravel can connect to database
php artisan migrate:status

# Should show list of migrations with "Ran?" column marked "Yes"
```

</TabItem>
<TabItem value="ai" label="🤖 AI Agent">

**Deployment Script:**

```bash
# Setup application directory
mkdir -p /var/www/dutycall
cd /var/www/dutycall

# Generate and configure deploy key
ssh-keygen -t ed25519 -C "dutycall-production" -f ~/.ssh/dutycall_deploy_key -N ""
# MANUAL STEP: Add public key to GitHub repo settings

# Clone repository
GIT_SSH_COMMAND="ssh -i ~/.ssh/dutycall_deploy_key -o StrictHostKeyChecking=no" \
  git clone git@github.com:YOUR_ORG/dutycall.git backend

cd backend

# Install dependencies
composer install --no-dev --optimize-autoloader

# Configure environment
cp .env.example .env
# MANUAL STEP: Edit .env with production values

# Initialize Laravel
php artisan key:generate
php artisan session:table
php artisan migrate --force
php artisan db:seed --class=RoleTestUsersSeeder --force

# Set permissions
chown -R www-data:www-data storage bootstrap/cache
chmod -R 775 storage bootstrap/cache

# Cache for performance
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

**Critical Files:**
- `.env`: Must have `APP_DEBUG=false` and `APP_ENV=production`
- Permissions: `www-data:www-data` for `storage/` and `bootstrap/cache/`

</TabItem>
</Tabs>

---

## Step 5: Configure Nginx

<Tabs groupId="developer-type">
<TabItem value="human" label="👨‍💻 Human Developer" default>

### 5.1: Create Nginx Site Configuration

```bash
cat > /etc/nginx/sites-available/dutycall << 'EOF'
# Redirect HTTP to HTTPS
server {
    listen 80;
    server_name api.dutycall.net;
    return 301 https://$server_name$request_uri;
}

# HTTPS Server
server {
    listen 443 ssl http2;
    server_name api.dutycall.net;
    root /var/www/dutycall/backend/public;

    index index.php index.html;

    # SSL Configuration (will be managed by Certbot)
    ssl_certificate /etc/letsencrypt/live/api.dutycall.net/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/api.dutycall.net/privkey.pem;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    # Laravel routing
    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    # PHP-FPM configuration
    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.3-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
        fastcgi_hide_header X-Powered-By;
    }

    # Deny access to hidden files
    location ~ /\. {
        deny all;
    }

    # Logging
    access_log /var/log/nginx/dutycall-access.log;
    error_log /var/log/nginx/dutycall-error.log;
}
EOF
```

### 5.2: Enable Site

```bash
# Create symbolic link to enable site
ln -s /etc/nginx/sites-available/dutycall /etc/nginx/sites-enabled/

# Remove default site
rm -f /etc/nginx/sites-enabled/default

# Test Nginx configuration
nginx -t

# Should show: "syntax is ok" and "test is successful"
```

### 5.3: Restart Nginx

```bash
systemctl restart nginx

# Verify Nginx is running
systemctl status nginx
```

:::tip Nginx Not Starting?
If you get SSL certificate errors, that's expected! We'll install the SSL certificate in Step 7 after configuring DNS.
:::

</TabItem>
<TabItem value="ai" label="🤖 AI Agent">

**Nginx Configuration:**

```bash
# Create site config
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
nginx -t && systemctl restart nginx
```

**Note:** SSL certificate paths reference files that will be created by Certbot in Step 7

</TabItem>
</Tabs>

---

## Step 6: Configure DNS

<Tabs groupId="developer-type">
<TabItem value="human" label="👨‍💻 Human Developer" default>

### 6.1: Add DNS A Record

Go to your domain registrar's DNS management panel and add:

```
Type: A
Host: api
Value: YOUR_DROPLET_IP
TTL: 300 (or Auto)
```

**Example:**
- Domain: `dutycall.net`
- A Record: `api` → `198.199.66.126`
- Result: `api.dutycall.net` points to your droplet

### 6.2: Verify DNS Propagation

```bash
# Test DNS resolution (use Google's DNS server)
dig +short api.dutycall.net @8.8.8.8
```

**Expected output:** Your droplet's IP address

:::tip DNS Propagation Time
DNS changes can take 5-60 minutes to propagate globally. If you don't see your IP immediately, wait a few minutes and try again.
:::

### 6.3: Test HTTP Access

```bash
curl http://api.dutycall.net
```

You might see an error about SSL - that's expected! We'll fix it in the next step.

</TabItem>
<TabItem value="ai" label="🤖 AI Agent">

**DNS Configuration:**

Add A record at domain registrar:
- **Type:** A
- **Host:** api (or subdomain of your choice)
- **Value:** Droplet IP address
- **TTL:** 300 seconds

**Verification:**
```bash
dig +short api.dutycall.net @8.8.8.8
# Should return: DROPLET_IP
```

**Propagation:** Typically 5-15 minutes, max 60 minutes

</TabItem>
</Tabs>

---

## Step 7: Install SSL Certificate

<Tabs groupId="developer-type">
<TabItem value="human" label="👨‍💻 Human Developer" default>

### 7.1: Run Certbot

```bash
certbot --nginx -d api.dutycall.net
```

**Follow the prompts:**

1. **Enter email address:** (for renewal notifications)
2. **Agree to Terms of Service:** Y
3. **Share email with EFF:** Y or N (your choice)
4. Certbot will automatically:
   - Obtain SSL certificate from Let's Encrypt
   - Configure Nginx to use the certificate
   - Set up HTTP → HTTPS redirect

**Expected output:**
```
Successfully received certificate.
Certificate is saved at: /etc/letsencrypt/live/api.dutycall.net/fullchain.pem
Key is saved at: /etc/letsencrypt/live/api.dutycall.net/privkey.pem
```

### 7.2: Verify Auto-Renewal

```bash
# Check that auto-renewal timer is active
systemctl list-timers | grep certbot

# Should show a timer scheduled for certificate renewal
```

### 7.3: Test SSL Certificate

```bash
curl -I https://api.dutycall.net

# Should return: HTTP/2 200 (or 302/301)
# Should show: strict-transport-security header
```

Visit `https://api.dutycall.net` in your browser - you should see a valid SSL certificate (green lock icon).

</TabItem>
<TabItem value="ai" label="🤖 AI Agent">

**SSL Installation:**

```bash
# Install certificate (requires DNS to be configured)
certbot --nginx -d api.dutycall.net

# Verify auto-renewal
systemctl list-timers | grep certbot
```

**Certbot Actions:**
1. Obtains certificate from Let's Encrypt (free)
2. Installs certificate to `/etc/letsencrypt/live/api.dutycall.net/`
3. Updates Nginx configuration automatically
4. Configures HTTP → HTTPS redirect
5. Sets up auto-renewal cron/timer

**Verification:**
```bash
curl -I https://api.dutycall.net
# Expected: HTTP/2 200 with HSTS header
```

**Auto-renewal:** Certificates renew automatically every 90 days via systemd timer

</TabItem>
</Tabs>

---

## Step 8: Configure Firewall

<Tabs groupId="developer-type">
<TabItem value="human" label="👨‍💻 Human Developer" default>

### 8.1: Enable UFW Firewall

```bash
# Allow SSH (CRITICAL - do this first!)
ufw allow OpenSSH

# Allow HTTP and HTTPS
ufw allow 'Nginx Full'

# Enable firewall
ufw enable

# Confirm: y
```

### 8.2: Verify Firewall Status

```bash
ufw status
```

**Expected output:**
```
Status: active

To                         Action      From
--                         ------      ----
OpenSSH                    ALLOW       Anywhere
Nginx Full                 ALLOW       Anywhere
OpenSSH (v6)               ALLOW       Anywhere (v6)
Nginx Full (v6)            ALLOW       Anywhere (v6)
```

:::danger Don't Lock Yourself Out!
Always allow OpenSSH BEFORE enabling the firewall, or you'll lose SSH access to your server!
:::

</TabItem>
<TabItem value="ai" label="🤖 AI Agent">

**Firewall Configuration:**

```bash
ufw allow OpenSSH       # Port 22 (SSH)
ufw allow 'Nginx Full'  # Ports 80, 443 (HTTP/HTTPS)
ufw enable              # Activate firewall
ufw status              # Verify rules
```

**Allowed Ports:**
- **22** (SSH): Required for server access
- **80** (HTTP): Redirects to HTTPS
- **443** (HTTPS): Application traffic

**Security:** All other ports are blocked by default

</TabItem>
</Tabs>

---

## Step 9: Test Backend API

<Tabs groupId="developer-type">
<TabItem value="human" label="👨‍💻 Human Developer" default>

### 9.1: Test Unauthenticated Endpoint

```bash
curl https://api.dutycall.net/api/user
```

**Expected response:**
```json
{"message":"Unauthenticated."}
```

**Status code:** 401 Unauthorized

This is correct! It means:
- ✅ Nginx is serving requests
- ✅ PHP-FPM is processing PHP files
- ✅ Laravel is routing requests
- ✅ Database connection is working
- ✅ Authentication middleware is active

### 9.2: Test Login

```bash
curl -X POST https://api.dutycall.net/api/login \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{"email":"super@dutycall.net","password":"password"}'
```

**Expected response:**
```json
{
  "user": {
    "id": 1,
    "name": "Super Admin",
    "email": "super@dutycall.net",
    ...
  },
  "token": "1|abc123..."
}
```

If you get this response, **your backend is fully operational!** 🎉

</TabItem>
<TabItem value="ai" label="🤖 AI Agent">

**API Health Checks:**

```bash
# Test authentication middleware
curl -I https://api.dutycall.net/api/user
# Expected: 401 Unauthorized

# Test login endpoint
curl -X POST https://api.dutycall.net/api/login \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{"email":"super@dutycall.net","password":"password"}'
# Expected: 200 OK with user object and token

# Test CORS (from different origin)
curl -v -X OPTIONS https://api.dutycall.net/api/login \
  -H "Origin: https://dutycall.vercel.app" \
  -H "Access-Control-Request-Method: POST"
# Expected: Access-Control-Allow-Origin header present
```

**Success Indicators:**
- 401 on `/api/user` (middleware working)
- 200 on `/api/login` with valid credentials
- CORS headers present in OPTIONS requests

</TabItem>
</Tabs>

---

## Step 10: Deployment Updates

<Tabs groupId="developer-type">
<TabItem value="human" label="👨‍💻 Human Developer" default>

When you need to deploy code updates to production:

```bash
# SSH into droplet
ssh root@YOUR_DROPLET_IP

# Navigate to backend
cd /var/www/dutycall/backend

# Pull latest code from GitHub
GIT_SSH_COMMAND="ssh -i ~/.ssh/dutycall_deploy_key" git pull origin main

# Update PHP dependencies
composer install --no-dev --optimize-autoloader

# Run any new database migrations
php artisan migrate --force

# Clear old caches
php artisan config:clear
php artisan route:clear
php artisan view:clear

# Rebuild caches for performance
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Restart PHP-FPM to load new code
systemctl restart php8.3-fpm

# Verify deployment
curl https://api.dutycall.net/api/user
# Should return 401 Unauthorized (API is running)
```

:::tip Automate Deployments
Consider setting up GitHub Actions to automatically deploy when you push to the `main` branch for true continuous deployment.
:::

</TabItem>
<TabItem value="ai" label="🤖 AI Agent">

**Deployment Update Script:**

```bash
ssh root@DROPLET_IP << 'EOF'
cd /var/www/dutycall/backend
GIT_SSH_COMMAND="ssh -i ~/.ssh/dutycall_deploy_key" git pull origin main
composer install --no-dev --optimize-autoloader
php artisan migrate --force
php artisan config:clear && php artisan route:clear && php artisan view:clear
php artisan config:cache && php artisan route:cache && php artisan view:cache
systemctl restart php8.3-fpm
EOF

# Verify
curl -I https://api.dutycall.net/api/user
# Expected: 401 Unauthorized
```

**Deployment Checklist:**
1. Pull code from GitHub
2. Update Composer dependencies
3. Run migrations
4. Clear old caches
5. Rebuild new caches
6. Restart PHP-FPM
7. Test endpoint

</TabItem>
</Tabs>

---

## Security Hardening

<Tabs groupId="developer-type">
<TabItem value="human" label="👨‍💻 Human Developer" default>

### Disable SSH Password Authentication

```bash
# Edit SSH configuration
nano /etc/ssh/sshd_config

# Find and set these values:
PasswordAuthentication no
PermitRootLogin prohibit-password
PubkeyAuthentication yes

# Save and exit (Ctrl+X, Y, Enter)

# Restart SSH
systemctl restart sshd
```

### Enable Automatic Security Updates

```bash
# Install unattended-upgrades
apt install -y unattended-upgrades

# Enable automatic security updates
dpkg-reconfigure --priority=low unattended-upgrades
# Select "Yes"
```

### Review Security Checklist

- [x] `APP_DEBUG=false` in `.env`
- [x] `APP_ENV=production` in `.env`
- [x] Strong database password (20+ characters)
- [x] `.env` file permissions: `chmod 600`
- [x] Storage permissions: `chown -R www-data:www-data storage`
- [x] SSL certificate installed and auto-renewing
- [x] Firewall enabled (ports 22, 80, 443 only)
- [x] SSH key authentication only (passwords disabled)
- [x] Automatic security updates enabled

</TabItem>
<TabItem value="ai" label="🤖 AI Agent">

**Security Hardening:**

```bash
# Disable SSH password authentication
sed -i 's/#PasswordAuthentication yes/PasswordAuthentication no/' /etc/ssh/sshd_config
sed -i 's/#PermitRootLogin yes/PermitRootLogin prohibit-password/' /etc/ssh/sshd_config
systemctl restart sshd

# Enable automatic security updates
apt install -y unattended-upgrades
dpkg-reconfigure --priority=low unattended-upgrades

# Verify permissions
chmod 600 /var/www/dutycall/backend/.env
chown -R www-data:www-data /var/www/dutycall/backend/storage
```

**Critical Security Items:**
- SSH: Key-based auth only
- Firewall: Minimal ports open
- SSL: HTTPS enforced
- Laravel: Debug mode disabled
- Updates: Automatic security patches

</TabItem>
</Tabs>

---

## Monitoring Setup

:::danger Monitoring is Mandatory
The October 19, 2025 Railway incident caused a 6+ hour outage because we had NO monitoring. Don't make the same mistake!
:::

### UptimeRobot (Free)

Create free account at https://uptimerobot.com/

**Monitor to create:**

```
Type: HTTP(s)
Name: DutyCall Backend API
URL: https://api.dutycall.net/api/user
Interval: 5 minutes
Method: HEAD
Expected Status: 401
Alert: Your email
```

### Sentry (Recommended)

```bash
# SSH into droplet
ssh root@YOUR_DROPLET_IP
cd /var/www/dutycall/backend

# Install Sentry SDK
composer require sentry/sentry-laravel

# Publish Sentry configuration
php artisan vendor:publish --provider="Sentry\Laravel\ServiceProvider"

# Edit .env and add:
nano .env
```

Add to `.env`:
```bash
SENTRY_LARAVEL_DSN=https://YOUR_DSN@sentry.io/PROJECT_ID
SENTRY_ENVIRONMENT=production
SENTRY_TRACES_SAMPLE_RATE=0.2
```

```bash
# Clear and rebuild cache
php artisan config:clear
php artisan config:cache

# Restart PHP-FPM
systemctl restart php8.3-fpm
```

---

## Troubleshooting

See the [Production Deployment Guide - Troubleshooting](/developers/deployment/production#troubleshooting) section for common issues and solutions.

**Quick fixes:**

```bash
# Storage permissions error
chown -R www-data:www-data /var/www/dutycall/backend/storage
chmod -R 775 /var/www/dutycall/backend/storage

# Clear all caches
php artisan config:clear
php artisan route:clear
php artisan view:clear

# Check logs
tail -f /var/www/dutycall/backend/storage/logs/laravel.log
tail -f /var/log/nginx/dutycall-error.log
```

---

## Cost Summary

| Item | Cost |
|------|------|
| DigitalOcean Droplet (2GB) | $12/month |
| SSL Certificate (Let's Encrypt) | Free |
| UptimeRobot Monitoring | Free |
| Sentry Error Tracking | Free (5k errors/month) |
| **Total** | **$12/month** |

---

## Additional Resources

- [DigitalOcean Documentation](https://docs.digitalocean.com)
- [Laravel Deployment Documentation](https://laravel.com/docs/deployment)
- [Nginx Configuration Guide](https://nginx.org/en/docs/)
- [Certbot Documentation](https://certbot.eff.org/docs/)

---

**Deployment complete!** Your DutyCall backend is now running on DigitalOcean with full production security and monitoring. 🚀
