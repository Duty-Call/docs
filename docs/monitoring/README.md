---
id: monitoring-overview
title: Monitoring Systems Guide
sidebar_label: Monitoring Systems
slug: /monitoring
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Monitoring Systems Guide

## Overview

DutyCall's monitoring infrastructure provides real-time visibility into system health, performance, and errors across the full stack. This guide covers error tracking, uptime monitoring, alerting, and incident response procedures.

**Why Monitoring Matters:**
- **Detect issues before users do** - Proactive alerts prevent customer impact
- **Reduce mean time to resolution (MTTR)** - Faster debugging with detailed error context
- **Track reliability metrics** - Measure uptime, error rates, and performance
- **Ensure compliance** - Audit logs and incident tracking for security/compliance

**Monitoring Stack:**
- **Error Monitoring**: Sentry (backend + frontend)
- **Uptime Monitoring**: UptimeRobot (4 monitors, 5-minute intervals)
- **Deployment Platforms**: Railway (backend) + Vercel (frontend)
- **Future Enhancement**: In-app monitoring dashboard widgets

---

## Quick Reference Card

### Production URLs
- **Frontend**: https://dutycall.vercel.app
- **Backend API**: https://dutycall-production.up.railway.app
- **Sentry Dashboard**: https://sentry.io
- **UptimeRobot Dashboard**: https://uptimerobot.com/dashboard

### Emergency Contacts
- **Primary On-Call**: [Contact project lead for details]
- **Escalation**: [Contact project lead for details]

### Status at a Glance
- **Sentry Projects**: `dutycall-backend`, `dutycall-frontend`
- **UptimeRobot Status**: [View dashboard for current status]

### Target SLAs
- **Uptime**: 99.9% (43 minutes downtime/month max)
- **Error Rate**: < 1% of requests
- **API Response Time**: < 500ms average
- **MTTR (Critical)**: < 1 hour

---

## 1. Error Monitoring (Sentry)

<Tabs groupId="developer-type">
<TabItem value="human" label="👨‍💻 Human Developer" default>

### What is Sentry?

Sentry is a real-time error tracking platform that captures exceptions, crashes, and performance issues across your application stack. When an error occurs in production, Sentry:

1. **Captures the error** with full stack trace and context
2. **Groups similar errors** to avoid alert fatigue
3. **Notifies the team** via email, Slack, or other channels
4. **Provides debugging context** - user actions, environment, release version
5. **Tracks error trends** over time to identify regressions

**Why we use Sentry:**
- Catch errors in production that don't occur in development
- Debug issues without user reports (proactive monitoring)
- Track error resolution and verify fixes deployed successfully
- Monitor performance bottlenecks and slow transactions

### Our Sentry Projects

We maintain two separate Sentry projects:

#### Backend Project: `dutycall-backend`
- **Technology**: Laravel 11 (PHP 8.2+)
- **Monitors**: API endpoints, database queries, background jobs
- **Integration**: Sentry Laravel SDK
- **Environment Variable**: `SENTRY_LARAVEL_DSN`

#### Frontend Project: `dutycall-frontend`
- **Technology**: Next.js 15 (React, TypeScript)
- **Monitors**: UI errors, React errors, API client errors
- **Integration**: Sentry Next.js SDK with source maps
- **Environment Variable**: `NEXT_PUBLIC_SENTRY_DSN`

### Accessing Sentry

1. **Login**: Visit https://sentry.io and login with your credentials
2. **Select Project**: Choose `dutycall-backend` or `dutycall-frontend`
3. **Dashboard**: View error trends, recent issues, and performance metrics

**Required Permissions**: Developer access or higher (contact admin for access)

### Key Features We Use

#### Real-Time Error Tracking
Every unhandled exception is automatically captured and sent to Sentry with:
- Full stack trace showing exactly where the error occurred
- Request context (URL, HTTP method, headers)
- User context (if authenticated - user ID, email, role)
- Environment details (production vs local, server info)

#### Source Maps (Frontend)
For frontend errors, Sentry uploads source maps during build to show:
- Original TypeScript/React code (not minified JavaScript)
- Exact line numbers in your source files
- Component names and function names

This makes debugging production errors as easy as debugging locally.

#### Performance Monitoring
Track slow database queries, API calls, and page loads:
- **Transactions**: Track complete request lifecycles
- **Spans**: Break down transactions into steps (DB query, API call, etc.)
- **LCP/FID/CLS**: Core Web Vitals for frontend performance

#### Session Replay (Frontend)
Watch a video replay of user sessions leading up to an error:
- See exactly what the user clicked
- View network requests and console logs
- Understand the context of the error

**Privacy Note**: Session replay is configured to mask sensitive data (passwords, credit cards, etc.)

#### Alert Notifications
Receive immediate notifications when errors occur:
- **Email**: Instant alerts for new error types
- **Slack** (optional): Team channel notifications
- **Alert Rules**: Custom thresholds (e.g., alert if error rate > 10/minute)

### Daily Usage

#### Checking for New Errors

**Morning Routine** (5 minutes):

1. **Login to Sentry**: https://sentry.io
2. **Check Backend Project**:
   - Click `dutycall-backend`
   - View "Issues" tab
   - Look for new unresolved errors (highlighted in yellow)
   - Check "Events" count - high counts indicate widespread issues
3. **Check Frontend Project**:
   - Switch to `dutycall-frontend`
   - Review new issues
   - Pay attention to errors affecting multiple users
4. **Review Performance**:
   - Click "Performance" tab
   - Check for slow transactions (> 1 second)
   - Identify any regression from recent deployments

**What to look for:**
- ✅ **Green**: No new errors, existing issues stable
- ⚠️ **Yellow**: New error types appeared (investigate)
- 🚨 **Red**: High error rate or critical errors (immediate action)

#### Investigating an Error

**Step-by-Step Investigation**:

1. **Click on the error** in the Issues list
2. **Read the error message**:
   - What went wrong? (Exception type and message)
   - Where did it happen? (File and line number)
3. **Examine the stack trace**:
   - Start at the top (most recent call)
   - Look for code in YOUR project (not vendor/library code)
   - Identify the specific function that threw the error
4. **Check breadcrumbs** (left sidebar):
   - What actions led to the error?
   - What API calls were made?
   - What was the user doing?
5. **View user context**:
   - Which user experienced this?
   - What role do they have? (admin, manager, agent)
   - Can you reproduce as that user?
6. **Check environment**:
   - Production or staging?
   - Which server/region?
   - Which release version?
7. **Watch session replay** (frontend only):
   - Click "Replays" tab
   - Watch user session leading to error
   - Note any UI state or user actions that triggered it

**Common Patterns**:
- **Database errors**: Check if query is valid, tables exist, migrations ran
- **API errors**: Check if external service is down (Twilio, etc.)
- **Frontend errors**: Check if API response format changed
- **Authentication errors**: Check if token validation logic changed

#### Resolving Errors

**Resolution Workflow**:

1. **Assign the error**:
   - Click "Assign to..." dropdown
   - Select yourself or appropriate team member
   - Add a comment with initial findings
2. **Create a fix**:
   - Reproduce the error locally (if possible)
   - Write a fix in your code
   - Add error handling or validation to prevent recurrence
   - Test thoroughly
3. **Deploy the fix**:
   - Push fix to main branch
   - Verify deployment succeeded (Railway/Vercel)
   - Wait for error to occur again (or test manually)
4. **Mark as resolved**:
   - Return to Sentry issue
   - Click "Resolve" button
   - Select "In Current Release" (Sentry will track if it reoccurs)
   - Add comment explaining the fix
5. **Verify resolution**:
   - Monitor issue for 24 hours
   - If error reoccurs, Sentry will reopen it automatically
   - If stable, move on

**Creating GitHub Issues from Sentry**:
1. Click "Create Issue" in Sentry
2. Select "GitHub"
3. Fill in issue details
4. Link is created between Sentry and GitHub
5. When GitHub issue is closed, Sentry issue auto-resolves

### Alert Configuration

**Current Alert Rules**:

#### Backend Alerts
- **New error types**: Immediate email notification
- **High error rate**: Alert if > 50 errors in 5 minutes
- **Critical endpoints**: Alert immediately for `/api/twilio/*` errors

#### Frontend Alerts
- **New error types**: Immediate email notification
- **High error rate**: Alert if > 100 errors in 5 minutes
- **Performance**: Alert if LCP > 2.5 seconds for 10% of users

**Modifying Alert Rules**:
1. Go to Sentry project → Settings → Alerts
2. Click on alert rule to edit
3. Modify conditions or notification channels
4. Save changes

**Best Practices**:
- Don't alert on every error (alert fatigue)
- Focus on NEW error types (regressions)
- Alert on rate increases, not absolute counts
- Use different channels for different severities (email vs SMS)

### Performance Monitoring

**Using Performance Features**:

1. **View Slow Transactions**:
   - Click "Performance" tab
   - Sort by "P95 Duration" (slowest 5% of requests)
   - Click transaction to see breakdown
2. **Identify N+1 Queries** (backend):
   - Look for transactions with many database spans
   - Check if queries are in a loop
   - Use eager loading to fix (Laravel `with()`)
3. **Track Frontend Performance**:
   - View "Web Vitals" section
   - Check LCP (Largest Contentful Paint) - should be < 2.5s
   - Check FID (First Input Delay) - should be < 100ms
   - Check CLS (Cumulative Layout Shift) - should be < 0.1
4. **Compare Releases**:
   - Filter by release version
   - Compare performance before/after deployment
   - Identify performance regressions

### Best Practices

#### When to Mark Errors as "Ignore"

**Good reasons to ignore**:
- Bot/crawler errors (non-human traffic)
- Known third-party library issues (waiting for upstream fix)
- Deprecated endpoints still receiving traffic (planned removal)
- Errors in sunset features (no longer supported)

**Bad reasons to ignore**:
- "It's annoying" (investigate why it's happening)
- "Only affects one user" (that user still has a problem)
- "Too hard to fix" (document as known issue instead)

#### Using Release Tracking

Sentry tracks which code version (release) each error occurred in:

1. **Backend**: Auto-tagged with git commit SHA
2. **Frontend**: Auto-tagged with git commit SHA

**Benefits**:
- See which deployment introduced an error
- Track if errors are resolved in new releases
- Compare error rates between versions

#### Error Boundaries (Frontend)

Wrap React components in error boundaries to:
- Prevent entire app from crashing
- Show friendly error UI to users
- Still report errors to Sentry

```typescript
// Example error boundary
import * as Sentry from '@sentry/nextjs';

<Sentry.ErrorBoundary fallback={<ErrorFallback />}>
  <YourComponent />
</Sentry.ErrorBoundary>
```

#### Using Breadcrumbs Effectively

Breadcrumbs are events leading up to an error:
- Automatically captured: API calls, navigation, console logs
- Manually add: `Sentry.addBreadcrumb({ message: 'User clicked export button' })`

**Use breadcrumbs to**:
- Understand user journey before error
- Debug race conditions
- Track multi-step processes

</TabItem>
<TabItem value="ai" label="🤖 AI Agent">

### Sentry Context

**Projects**:
- `dutycall-backend`: Laravel 11, DSN in `SENTRY_LARAVEL_DSN`
- `dutycall-frontend`: Next.js 15, DSN in `NEXT_PUBLIC_SENTRY_DSN`

**Architecture**:
```
Error occurs → SDK captures → Sentry backend → Groups & alerts → Team investigates
```

**Key URLs**:
- Dashboard: `https://sentry.io`
- API: `https://sentry.io/api/0/`
- Projects: `https://sentry.io/organizations/{org}/projects/`

**Features in use**:
- Real-time error tracking with stack traces
- Source maps (frontend) - uploaded during build
- Performance monitoring (transactions, spans)
- Session replay (frontend) - DOM recording with PII masking
- Alert rules - new errors, error rate spikes
- Release tracking - git commit SHAs

**Investigation Pattern**:
```
1. Read error message + stack trace
2. Check breadcrumbs (user actions before error)
3. View user/environment context
4. Watch session replay (frontend)
5. Check if error is new or regression
6. Reproduce locally or check related code
7. Fix → deploy → verify resolution
```

**Common Backend Errors**:
- Database connection: Check Railway PostgreSQL status
- Twilio webhook: Check TwiML configuration, webhook URLs
- Authentication: Check Sanctum token validation

**Common Frontend Errors**:
- API 401/403: Check auth token in localStorage
- CORS: Check backend CORS configuration
- Hydration: Check server/client rendering mismatch

**Performance Thresholds**:
- Backend API: < 500ms average
- Frontend LCP: < 2.5s
- Frontend FID: < 100ms
- Database queries: < 100ms

**Alert Configuration**:
```yaml
Backend:
  - New error types → email
  - > 50 errors in 5 min → email
  - /api/twilio/* errors → immediate email

Frontend:
  - New error types → email
  - > 100 errors in 5 min → email
  - LCP > 2.5s for 10% users → email
```

**API Access** (for automation):
```bash
# Get recent issues
curl -H "Authorization: Bearer $SENTRY_AUTH_TOKEN" \
  https://sentry.io/api/0/projects/{org}/dutycall-backend/issues/

# Get error stats
curl -H "Authorization: Bearer $SENTRY_AUTH_TOKEN" \
  https://sentry.io/api/0/projects/{org}/dutycall-backend/stats/
```

**Resolution Workflow**:
1. Assign issue to self
2. Fix code locally
3. Deploy fix
4. Mark as "Resolved in Current Release"
5. Monitor for 24 hours
6. Auto-reopens if error recurs

**Ignore Patterns**:
- Bots/crawlers: Regex filter on user agent
- Known third-party bugs: Ignore until upstream fix
- Deprecated endpoints: Ignore or filter by URL

**Release Tracking**:
- Backend: `git rev-parse HEAD` auto-tagged
- Frontend: `git rev-parse HEAD` auto-tagged via Vercel
- Compare error rates between releases
- Track regressions from deployments

</TabItem>
</Tabs>

---

## 2. Uptime Monitoring (UptimeRobot)

<Tabs groupId="developer-type">
<TabItem value="human" label="👨‍💻 Human Developer" default>

### What is UptimeRobot?

UptimeRobot is a service that checks if your website and API are accessible from the internet. Every 5 minutes, UptimeRobot sends requests to your production URLs and verifies they respond correctly. If your service goes down, you receive an immediate alert.

**Why we use UptimeRobot:**
- Free tier supports 50 monitors with 5-minute intervals
- Simple setup (no code changes required)
- Reliable third-party monitoring (detects issues even if your monitoring is down)
- Public status pages to share with stakeholders
- SSL certificate expiry warnings

### Our Monitors

We have 4 monitors configured:

#### 1. Frontend Monitor
```
Name: DutyCall Frontend (Production)
URL: https://dutycall.vercel.app
Type: HTTP(s) - HEAD request
Interval: Every 5 minutes
Expected: 200 OK status code
```

**What it checks**: Vercel deployment is accessible, DNS is resolving, SSL certificate is valid.

**Alert triggers**: If Vercel is down, DNS fails, or SSL expires.

#### 2. Backend API Monitor
```
Name: DutyCall Backend API (Production)
URL: https://dutycall-production.up.railway.app/api/check-users
Type: HTTP(s) - HEAD request
Interval: Every 5 minutes
Expected: 200 OK status code
```

**What it checks**: Railway deployment is running, API responds to requests.

**Alert triggers**: If Railway is down, API crashes, or database is unreachable.

#### 3. Database Health Monitor
```
Name: DutyCall Database Health
URL: https://dutycall-production.up.railway.app/api/check-users
Type: HTTP(s) - GET request
Interval: Every 5 minutes
Expected: 200 status + "success" keyword in response
```

**What it checks**: Backend can query database successfully.

**Alert triggers**: If database connection fails, even if API server is running.

**Why separate from API monitor**: API server can be running but unable to connect to database. This monitor catches that specific failure mode.

#### 4. SSL Certificate Monitor
```
Name: DutyCall SSL Certificate
URL: https://dutycall.vercel.app
Type: HTTP(s) with SSL monitoring
Alert Threshold: 30 days before expiry
```

**What it checks**: SSL certificate expiration date.

**Alert triggers**: 30 days before certificate expires (though Vercel auto-renews).

**Why we monitor**: Catch certificate renewal failures before users see "insecure connection" warnings.

### Daily Usage

#### Checking System Status

**Quick Health Check** (2 minutes):

1. **Login**: Visit https://uptimerobot.com/dashboard
2. **View dashboard**:
   - All monitors should show green (up)
   - Check "Uptime Ratio" column - should be > 99.9%
   - Check "Average Response Time" - should be < 500ms
3. **Review recent downtime**:
   - Click "Logs" for any monitor
   - Check if there were any outages in last 24 hours
   - Verify outages were resolved

**What to look for**:
- ✅ **All green**: System is healthy
- ⚠️ **Yellow**: Slow response times (investigate performance)
- 🚨 **Red**: Service is down (immediate action required)

#### Responding to Downtime Alerts

**When you receive a downtime alert email**:

**Step 1: Verify the Issue** (1 minute)
```bash
# Test frontend manually
curl -I https://dutycall.vercel.app

# Test backend manually
curl -I https://dutycall-production.up.railway.app/api/check-users

# Expected: HTTP/1.1 200 OK
# If you get an error, the issue is real
```

**Could it be a false positive?**
- UptimeRobot servers had temporary network issues
- Your firewall blocked UptimeRobot IPs (rare)
- The monitor configuration is wrong

**If you can access the URL but UptimeRobot can't**, it's likely a network routing issue or UptimeRobot problem.

**Step 2: Investigate Root Cause** (5 minutes)

Check the deployment platforms:

**For Frontend Issues**:
1. Go to Vercel dashboard: https://vercel.com
2. Check deployment status
3. View recent deployment logs
4. Check if recent deployment failed or is stuck
5. Review Sentry for related frontend errors

**For Backend Issues**:
1. Go to Railway dashboard: https://railway.app
2. Check service status
3. View logs: Click project → View Logs
4. Check if service crashed, restarted, or is unhealthy
5. Review Sentry for related backend errors

**Common Causes**:
- Recent deployment broke the application
- Database ran out of connections
- Out of memory (service crashed)
- Environment variables missing after redeploy
- Third-party service dependency down (Twilio, etc.)

**Step 3: Resolve the Issue**

**If deployment failed**:
```bash
# Roll back to previous deployment
# Vercel: Click "Rollback" in deployment details
# Railway: Redeploy previous commit
```

**If service crashed**:
```bash
# Railway: Service auto-restarts, check logs for crash reason
# May need to fix code and redeploy
```

**If database issue**:
```bash
# Check Railway PostgreSQL metrics
# Look for connection pool exhaustion
# Check slow queries in logs
# May need to scale database
```

**If environment variables missing**:
```bash
# Verify all required env vars are set in Railway/Vercel
# Redeploy to pick up new env vars
```

**Step 4: Monitor Recovery**

1. Watch UptimeRobot dashboard for green status
2. Check Sentry for error rate decrease
3. Test the application manually
4. Wait for "back up" notification from UptimeRobot

**Step 5: Post-Mortem** (15 minutes)

Document the incident:
- **When**: Start time, end time, duration
- **What**: Which service was down
- **Why**: Root cause
- **Impact**: How many users affected, which features unavailable
- **Fix**: What was done to resolve
- **Prevention**: How to prevent recurrence

Save post-mortem in project documentation or team wiki.

### Maintenance Windows

**Pausing Monitoring During Planned Maintenance**:

If you're deploying a major change or performing maintenance:

1. **Login to UptimeRobot**
2. **Click on monitor** you want to pause
3. **Click "Pause Monitoring"** button
4. **Perform maintenance** (deploy, database migration, etc.)
5. **Click "Resume Monitoring"** when done
6. **Test the service** before resuming monitoring

**Why pause monitoring?**
- Avoid false downtime alerts
- Maintain accurate uptime statistics
- Reduce alert fatigue

**When to pause**:
- Database migrations that cause brief downtime
- Major deployments with expected brief outage
- Infrastructure changes (DNS, load balancer config)

**When NOT to pause**:
- Regular deployments (should be zero-downtime)
- "Just in case" (defeats the purpose of monitoring)

### Public Status Page

UptimeRobot provides a free public status page showing uptime history.

**Accessing Status Page**:
- **URL**: [Contact project lead for status page URL]
- **Shows**: Real-time status, 30-day uptime history, response times
- **Updates**: Automatically reflects monitor status

**Sharing with Stakeholders**:
- Include in team wiki or internal documentation
- Share with customers during incidents ("Check status page for updates")
- Embed on marketing site (optional)

**Customizing Status Page**:
1. Go to UptimeRobot → Status Pages
2. Click on DutyCall status page
3. Customize:
   - Branding (logo, colors)
   - Which monitors to show
   - Incident history
   - Custom domain (e.g., status.dutycall.net)

</TabItem>
<TabItem value="ai" label="🤖 AI Agent">

### UptimeRobot Context

**Account**: Free tier (50 monitors, 5-min intervals, 10 SMS/month)

**Monitors**:
```yaml
1. Frontend:
   URL: https://dutycall.vercel.app
   Type: HEAD
   Interval: 5 min
   Expected: 200

2. Backend API:
   URL: https://dutycall-production.up.railway.app/api/check-users
   Type: HEAD
   Interval: 5 min
   Expected: 200

3. Database Health:
   URL: https://dutycall-production.up.railway.app/api/check-users
   Type: GET
   Interval: 5 min
   Expected: 200 + "success" keyword

4. SSL Certificate:
   URL: https://dutycall.vercel.app
   Type: HTTPS + SSL monitoring
   Alert: 30 days before expiry
```

**Alert Flow**:
```
Monitor fails → Wait 5 min → Retry → Still failing? → Send alert email → Monitor recovery → Send "back up" email
```

**Verification Commands**:
```bash
# Test frontend
curl -I https://dutycall.vercel.app

# Test backend
curl -I https://dutycall-production.up.railway.app/api/check-users

# Test database health (full response)
curl https://dutycall-production.up.railway.app/api/check-users
```

**Common Failure Modes**:

| Symptom | Likely Cause | Fix |
|---------|--------------|-----|
| Frontend red, backend green | Vercel deployment issue | Check Vercel logs, rollback if needed |
| Backend red, frontend green | Railway service crashed | Check Railway logs, redeploy |
| API green, DB health red | Database connection lost | Check Railway PostgreSQL, restart service |
| All red | DNS/network issue or false positive | Verify manually with curl |
| SSL monitor red | Certificate expiry soon | Check Vercel SSL renewal |

**Investigation Pattern**:
1. Verify issue manually (`curl -I <URL>`)
2. Check deployment platform (Vercel/Railway)
3. Review logs for errors
4. Cross-reference Sentry for related errors
5. Check recent deployments (git log)
6. Fix issue and monitor recovery

**API Access**:
```bash
# Get monitor status
curl -X POST https://api.uptimerobot.com/v2/getMonitors \
  -d "api_key=$UPTIMEROBOT_API_KEY" \
  -d "format=json"

# Response
{
  "stat": "ok",
  "monitors": [{
    "id": 123456,
    "friendly_name": "DutyCall Frontend",
    "status": 2,  // 0=paused, 1=not checked, 2=up, 8=seems down, 9=down
    "uptime_ratio": "99.95"
  }]
}
```

**Status Codes**:
- `0`: Paused
- `1`: Not checked yet
- `2`: Up (green)
- `8`: Seems down (investigating)
- `9`: Down (red)

**Maintenance Mode**:
- Pause monitoring before planned maintenance
- Resume after deployment complete
- Avoids false downtime alerts

**Uptime Calculation**:
- Formula: `(total_time - downtime) / total_time * 100`
- Target: > 99.9% (43 min downtime/month max)
- Reset: Never (lifetime uptime tracked)

**False Positive Handling**:
- Enable "Confirm before alert" (checks 2-3 times)
- Increase timeout if service is slow
- Whitelist UptimeRobot IPs if firewall blocks

</TabItem>
</Tabs>

---

## 3. API Integration Examples

<Tabs groupId="developer-type">
<TabItem value="human" label="👨‍💻 Human Developer" default>

### In-App Monitoring Widgets (Future Enhancement)

We plan to add real-time monitoring widgets to the DutyCall application dashboard to give super admins visibility into system health without leaving the app.

**Planned Widgets**:

1. **System Status Banner** (All users)
   - Shows if services are operational
   - Displays during outages: "We're experiencing issues with voice calls. Our team is investigating."
   - Pulls data from UptimeRobot API

2. **Full Monitoring Dashboard** (Super Admin only - `/dashboard/monitoring`)
   - Real-time error rate from Sentry
   - Uptime statistics from UptimeRobot
   - Recent incidents and resolutions
   - Performance metrics (response times, error trends)

#### Technical Implementation

**Backend: Create Monitoring API Endpoints**

Create a new Laravel controller to proxy monitoring data:

```php
// backend/app/Http/Controllers/MonitoringController.php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class MonitoringController extends Controller
{
    /**
     * Get system status from UptimeRobot
     */
    public function getSystemStatus()
    {
        $response = Http::post('https://api.uptimerobot.com/v2/getMonitors', [
            'api_key' => env('UPTIMEROBOT_API_KEY'),
            'format' => 'json',
        ]);

        if (!$response->successful()) {
            return response()->json(['error' => 'Failed to fetch status'], 500);
        }

        $monitors = $response->json()['monitors'] ?? [];

        // Transform to simplified format
        $status = collect($monitors)->map(function ($monitor) {
            return [
                'name' => $monitor['friendly_name'],
                'status' => $monitor['status'] === 2 ? 'up' : 'down',
                'uptime' => $monitor['custom_uptime_ratio'] ?? '100.00',
                'response_time' => $monitor['average_response_time'] ?? 0,
            ];
        });

        return response()->json([
            'success' => true,
            'monitors' => $status,
            'overall_status' => $status->contains('status', 'down') ? 'degraded' : 'operational',
        ]);
    }

    /**
     * Get error statistics from Sentry
     */
    public function getErrorStats()
    {
        $token = env('SENTRY_AUTH_TOKEN');
        $org = env('SENTRY_ORG');

        // Get backend error count
        $backendResponse = Http::withToken($token)
            ->get("https://sentry.io/api/0/organizations/{$org}/projects/dutycall-backend/stats/", [
                'stat' => 'received',
                'resolution' => '1h',
                'since' => now()->subDay()->timestamp,
            ]);

        // Get frontend error count
        $frontendResponse = Http::withToken($token)
            ->get("https://sentry.io/api/0/organizations/{$org}/projects/dutycall-frontend/stats/", [
                'stat' => 'received',
                'resolution' => '1h',
                'since' => now()->subDay()->timestamp,
            ]);

        return response()->json([
            'success' => true,
            'backend_errors_24h' => collect($backendResponse->json())->sum(),
            'frontend_errors_24h' => collect($frontendResponse->json())->sum(),
            'updated_at' => now()->toISOString(),
        ]);
    }

    /**
     * Get recent incidents
     */
    public function getRecentIncidents()
    {
        // This could query a database table tracking incidents
        // For now, return mock data
        return response()->json([
            'success' => true,
            'incidents' => [
                [
                    'id' => 1,
                    'title' => 'API Latency Increase',
                    'status' => 'resolved',
                    'started_at' => '2025-10-13T14:30:00Z',
                    'resolved_at' => '2025-10-13T15:45:00Z',
                    'duration_minutes' => 75,
                    'severity' => 'medium',
                ],
            ],
        ]);
    }
}
```

**Add routes** in `backend/routes/api.php`:

```php
// Monitoring endpoints (super_admin only)
Route::middleware(['auth:sanctum', 'role:super_admin'])->group(function () {
    Route::get('/monitoring/system-status', [MonitoringController::class, 'getSystemStatus']);
    Route::get('/monitoring/error-stats', [MonitoringController::class, 'getErrorStats']);
    Route::get('/monitoring/incidents', [MonitoringController::class, 'getRecentIncidents']);
});

// Public status endpoint (all users)
Route::get('/monitoring/public-status', [MonitoringController::class, 'getSystemStatus']);
```

**Frontend: Create Monitoring Components**

Create a monitoring dashboard component:

```typescript
// frontend/src/components/monitoring/MonitoringDashboard.tsx
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/teleman-api';

export function MonitoringDashboard() {
  // Fetch system status every 30 seconds
  const { data: systemStatus, isLoading: statusLoading } = useQuery({
    queryKey: ['systemStatus'],
    queryFn: () => api.getSystemStatus(),
    refetchInterval: 30000, // 30 seconds
  });

  // Fetch error stats every minute
  const { data: errorStats, isLoading: errorsLoading } = useQuery({
    queryKey: ['errorStats'],
    queryFn: () => api.getErrorStats(),
    refetchInterval: 60000, // 1 minute
  });

  // Fetch incidents once
  const { data: incidents } = useQuery({
    queryKey: ['incidents'],
    queryFn: () => api.getRecentIncidents(),
  });

  if (statusLoading || errorsLoading) {
    return <div>Loading monitoring data...</div>;
  }

  const overallStatus = systemStatus?.overall_status;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">System Monitoring</h1>

      {/* Overall Status */}
      <div className={`p-4 rounded-lg mb-6 ${
        overallStatus === 'operational'
          ? 'bg-green-100 border-green-500'
          : 'bg-red-100 border-red-500'
      } border-2`}>
        <h2 className="text-xl font-semibold">
          {overallStatus === 'operational'
            ? '✅ All Systems Operational'
            : '⚠️ System Degraded'}
        </h2>
      </div>

      {/* Uptime Monitors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {systemStatus?.monitors?.map((monitor: any) => (
          <div key={monitor.name} className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">{monitor.name}</h3>
              <span className={`px-2 py-1 rounded ${
                monitor.status === 'up'
                  ? 'bg-green-200 text-green-800'
                  : 'bg-red-200 text-red-800'
              }`}>
                {monitor.status === 'up' ? 'UP' : 'DOWN'}
              </span>
            </div>
            <div className="mt-2 text-sm text-gray-600">
              <div>Uptime: {monitor.uptime}%</div>
              <div>Response Time: {monitor.response_time}ms</div>
            </div>
          </div>
        ))}
      </div>

      {/* Error Statistics */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">Error Statistics (24h)</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-3xl font-bold text-red-600">
              {errorStats?.backend_errors_24h || 0}
            </div>
            <div className="text-sm text-gray-600">Backend Errors</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-red-600">
              {errorStats?.frontend_errors_24h || 0}
            </div>
            <div className="text-sm text-gray-600">Frontend Errors</div>
          </div>
        </div>
      </div>

      {/* Recent Incidents */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Recent Incidents</h2>
        {incidents?.incidents?.length === 0 ? (
          <p className="text-gray-600">No incidents in the last 30 days</p>
        ) : (
          <div className="space-y-2">
            {incidents?.incidents?.map((incident: any) => (
              <div key={incident.id} className="border-l-4 border-blue-500 pl-4">
                <div className="font-semibold">{incident.title}</div>
                <div className="text-sm text-gray-600">
                  Status: {incident.status} | Duration: {incident.duration_minutes} minutes
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
```

**Add API methods** to `frontend/src/lib/teleman-api.ts`:

```typescript
// Monitoring API methods
async getSystemStatus() {
  const response = await this.get('/api/monitoring/system-status');
  return response.data;
},

async getErrorStats() {
  const response = await this.get('/api/monitoring/error-stats');
  return response.data;
},

async getRecentIncidents() {
  const response = await this.get('/api/monitoring/incidents');
  return response.data;
},

async getPublicStatus() {
  const response = await this.get('/api/monitoring/public-status');
  return response.data;
},
```

**Create dashboard page** at `frontend/src/app/dashboard/monitoring/page.tsx`:

```typescript
'use client';

import { MonitoringDashboard } from '@/components/monitoring/MonitoringDashboard';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function MonitoringPage() {
  const { user } = useAuth();
  const router = useRouter();

  // Only super_admin can access
  useEffect(() => {
    if (user && user.role !== 'super_admin') {
      router.push('/dashboard');
    }
  }, [user, router]);

  if (user?.role !== 'super_admin') {
    return <div>Access denied</div>;
  }

  return <MonitoringDashboard />;
}
```

**Environment Variables**:

Add to backend `.env`:
```bash
UPTIMEROBOT_API_KEY=your_api_key_here
SENTRY_AUTH_TOKEN=your_auth_token_here
SENTRY_ORG=your_org_slug
```

**Security Considerations**:
- API keys never sent to frontend (proxied through backend)
- Monitoring endpoints require authentication
- Full dashboard only accessible to super_admin
- Public status endpoint available to all users (limited data)
- Rate limiting to prevent API abuse

</TabItem>
<TabItem value="ai" label="🤖 AI Agent">

### API Integration Patterns

**Backend Proxy Pattern**:
```
Frontend → Laravel API → External Service (Sentry/UptimeRobot) → Response → Frontend
```

**Why proxy?**
- Keep API keys secret (never expose to browser)
- Add authentication/authorization
- Cache responses to avoid rate limits
- Transform data to simplified format

**Environment Variables Required**:
```bash
# Backend .env
UPTIMEROBOT_API_KEY=ur123456-abcdefghijklmnop
SENTRY_AUTH_TOKEN=sntrys_abc123...
SENTRY_ORG=dutycall
```

**API Endpoints to Create**:
```php
// backend/routes/api.php
Route::middleware(['auth:sanctum', 'role:super_admin'])->group(function () {
    Route::get('/monitoring/system-status', ...);  // UptimeRobot data
    Route::get('/monitoring/error-stats', ...);    // Sentry data
    Route::get('/monitoring/incidents', ...);       // DB or mock data
});

Route::get('/monitoring/public-status', ...);  // Public (all users)
```

**UptimeRobot API Example**:
```php
$response = Http::post('https://api.uptimerobot.com/v2/getMonitors', [
    'api_key' => env('UPTIMEROBOT_API_KEY'),
    'format' => 'json',
]);

// Response format
{
  "stat": "ok",
  "monitors": [{
    "id": 123456,
    "friendly_name": "DutyCall Frontend",
    "url": "https://dutycall.vercel.app",
    "status": 2,  // 2=up, 9=down
    "custom_uptime_ratio": "99.95",
    "average_response_time": 234,
  }]
}
```

**Sentry API Example**:
```php
$response = Http::withToken(env('SENTRY_AUTH_TOKEN'))
    ->get("https://sentry.io/api/0/organizations/{$org}/projects/{$project}/stats/", [
        'stat' => 'received',
        'resolution' => '1h',
        'since' => now()->subDay()->timestamp,
    ]);

// Response: array of error counts per hour
[[timestamp, count], [timestamp, count], ...]
```

**Frontend React Query Pattern**:
```typescript
const { data: status } = useQuery({
  queryKey: ['systemStatus'],
  queryFn: () => api.getSystemStatus(),
  refetchInterval: 30000,  // Auto-refresh every 30s
  staleTime: 25000,        // Consider stale after 25s
});
```

**Caching Strategy**:
- Frontend: React Query cache (30s refresh)
- Backend: Laravel cache (1 min TTL) to avoid API rate limits
- Database: Store incidents/historical data

**Rate Limits**:
- UptimeRobot: 10 requests/min (free tier)
- Sentry: Varies by plan (check docs)
- Strategy: Cache aggressively, use stale data if API fails

**Error Handling**:
```php
try {
    $response = Http::timeout(5)->post(...);
    if (!$response->successful()) {
        Cache::put('monitoring_status', 'api_error', 300);
        return response()->json(['error' => 'Monitoring API unavailable'], 503);
    }
} catch (\Exception $e) {
    return response()->json(['error' => 'Monitoring temporarily unavailable'], 503);
}
```

**Authorization Pattern**:
```php
// Super admin only
Route::middleware(['auth:sanctum', 'role:super_admin'])

// All authenticated users
Route::middleware(['auth:sanctum'])

// Public (no auth)
Route::get('/api/monitoring/public-status')
```

**Frontend Component Structure**:
```
MonitoringDashboard
├── SystemStatusBanner     // Overall status
├── UptimeMonitorsGrid     // 4 monitors from UptimeRobot
├── ErrorStatsCard         // 24h error counts from Sentry
└── RecentIncidentsTable   // Historical incidents
```

**Data Refresh Intervals**:
- System status: 30s (near real-time)
- Error stats: 1 min (less critical)
- Incidents: On mount only (historical)

</TabItem>
</Tabs>

---

## 4. Runbooks for Common Incidents

<Tabs groupId="developer-type">
<TabItem value="human" label="👨‍💻 Human Developer" default>

### Backend API Returning 500 Errors

**Symptoms**:
- UptimeRobot shows Backend API monitor down
- Sentry shows spike in backend errors
- Users report "Something went wrong" errors in app

**Investigation Steps**:

1. **Check Sentry for Error Details**:
   - Go to Sentry → `dutycall-backend`
   - Look for recent 500 errors
   - Read error message and stack trace
   - Note which endpoint is failing (e.g., `/api/queue/calls`)

2. **Review Railway Deployment Logs**:
   ```bash
   # If you have Railway CLI installed
   railway logs

   # Or view in Railway dashboard:
   # Click project → View Logs → Filter by "error"
   ```

   Look for:
   - PHP errors or exceptions
   - Database connection errors
   - Out of memory errors
   - Missing environment variables

3. **Verify Database Connectivity**:
   ```bash
   # Test database health endpoint
   curl https://dutycall-production.up.railway.app/api/check-users

   # Should return: {"success": true, "user_count": 5}
   # If it fails, database is unreachable
   ```

   If database is down:
   - Check Railway PostgreSQL service status
   - Check connection string in environment variables
   - Check for connection pool exhaustion

4. **Check Environment Variables**:
   - Go to Railway → Project → Variables
   - Verify all required variables are set (see environment-config docs)
   - Check for recent changes to variables
   - Ensure no variables were accidentally deleted

5. **Review Recent Deployments**:
   ```bash
   # Check recent commits
   git log --oneline -10

   # Check if error started after specific deployment
   # Compare Sentry error timeline with git log timestamps
   ```

**Resolution Steps**:

**If caused by bad deployment**:
1. Identify last working commit
2. Roll back in Railway:
   - Railway dashboard → Deployments → Select previous deployment → Redeploy
3. Monitor Sentry for error rate decrease
4. Fix the issue in code, test locally, redeploy

**If database issue**:
1. Check Railway PostgreSQL resource usage
2. If connection pool exhausted, restart Laravel service
3. If database is down, check Railway status page
4. May need to scale database plan

**If environment variable issue**:
1. Add missing variable in Railway dashboard
2. Trigger redeploy to pick up new variables
3. Verify service restarts successfully

**If out of memory**:
1. Check Railway metrics for memory usage
2. May need to upgrade Railway plan
3. Or optimize code to use less memory

**Prevention**:
- Always test deployments in staging first
- Monitor Sentry after each deployment
- Set up alerts for elevated error rates
- Keep environment variable backups

### Frontend Not Loading

**Symptoms**:
- UptimeRobot shows Frontend monitor down
- Users see blank page or "500 Internal Server Error"
- Sentry shows frontend errors or no data

**Investigation Steps**:

1. **Check Vercel Deployment Status**:
   - Go to Vercel dashboard: https://vercel.com
   - Check deployment status (should show "Ready")
   - If failed, click deployment → View logs for error

2. **Verify DNS/Domain Configuration**:
   ```bash
   # Check DNS resolution
   dig dutycall.vercel.app

   # Check if site is accessible
   curl -I https://dutycall.vercel.app
   ```

   Expected: `HTTP/2 200`

3. **Check Browser Console**:
   - Open browser dev tools (F12)
   - Check Console tab for JavaScript errors
   - Check Network tab for failed requests
   - Look for CORS errors or 401/403 auth errors

4. **Check Sentry for Frontend Errors**:
   - Go to Sentry → `dutycall-frontend`
   - Look for recent errors
   - Check if errors are React rendering errors or API call failures

5. **Verify API Connectivity**:
   ```bash
   # Test if frontend can reach backend
   curl -I https://dutycall-production.up.railway.app/api/user

   # Should return 401 (unauthenticated) - means API is reachable
   # If CORS error in browser, check backend CORS config
   ```

**Resolution Steps**:

**If Vercel deployment failed**:
1. Click failed deployment → View logs
2. Look for build errors (TypeScript, linting, etc.)
3. Fix errors locally, push fix
4. Vercel auto-deploys on git push

**If DNS issue**:
1. Check domain configuration in Vercel
2. Verify CNAME record points to Vercel
3. May take time to propagate (up to 48 hours)

**If CORS error**:
1. Check backend `.env` → `FRONTEND_URL` is correct
2. Check `backend/config/cors.php` includes frontend domain
3. Redeploy backend to pick up CORS changes

**If React error**:
1. Check Sentry for specific component/error
2. Roll back to previous Vercel deployment
3. Fix React error locally, test, redeploy

**Prevention**:
- Run `npm run build` locally before pushing
- Set up Vercel preview deployments for branches
- Test frontend changes with production API (not just localhost)

### Database Connection Issues

**Symptoms**:
- Backend API responds but returns database errors
- Sentry shows "SQLSTATE" or "Connection refused" errors
- UptimeRobot Database Health monitor down

**Investigation Steps**:

1. **Check Railway PostgreSQL Status**:
   - Go to Railway → Database service
   - Check CPU/Memory/Disk usage
   - Look for any error messages

2. **Verify Connection String**:
   ```bash
   # In Railway dashboard
   # Check environment variables: DB_HOST, DB_PORT, DB_DATABASE, DB_USERNAME, DB_PASSWORD
   # Ensure they match PostgreSQL service variables
   ```

3. **Test Database Connectivity**:
   ```bash
   # From Railway logs, check for database errors
   railway logs | grep -i "database\|sqlstate"
   ```

4. **Check Connection Pool**:
   - Sentry errors showing "Too many connections"?
   - Check Laravel config: `config/database.php` → `max_connections`

5. **Review Slow Queries**:
   - Check Railway PostgreSQL metrics
   - Look for long-running queries blocking connections

**Resolution Steps**:

**If connection string wrong**:
1. Fix environment variables in Railway
2. Redeploy service

**If connection pool exhausted**:
1. Restart Laravel service (Railway auto-restarts)
2. Optimize code to close connections properly
3. Increase pool size in Laravel config

**If database is down**:
1. Check Railway status page
2. Contact Railway support
3. May need to restore from backup

**If slow query issue**:
1. Identify slow query in logs
2. Add database index
3. Optimize query (use eager loading, reduce JOINs)

**Prevention**:
- Monitor database metrics regularly
- Set up alerts for high connection count
- Optimize queries before deploying
- Use database indexes appropriately

### SSL Certificate Issues

**Symptoms**:
- UptimeRobot SSL monitor shows expiry warning
- Browser shows "Not Secure" or certificate error
- Users cannot access site over HTTPS

**Investigation Steps**:

1. **Check Certificate Expiry**:
   ```bash
   # Check certificate details
   echo | openssl s_client -connect dutycall.vercel.app:443 2>/dev/null | openssl x509 -noout -dates
   ```

2. **Verify Auto-Renewal**:
   - Vercel and Railway auto-renew SSL certificates
   - Check platform status for any SSL issues

3. **Check DNS Configuration**:
   - Incorrect DNS can prevent auto-renewal
   - Verify CNAME/A records point to correct servers

**Resolution Steps**:

**If certificate expired**:
1. Vercel/Railway should auto-renew - contact support if not
2. Temporary: Remove custom domain, re-add to force new certificate

**If manual domain**:
1. Check Let's Encrypt renewal process
2. Verify DNS records are correct
3. May need to manually renew

**Prevention**:
- Monitor certificate expiry 30 days in advance
- Use managed platforms (Vercel/Railway) for auto-renewal
- Keep DNS records stable

</TabItem>
<TabItem value="ai" label="🤖 AI Agent">

### Incident Runbook Patterns

**Investigation Flow**:
```
Alert received → Verify issue → Check logs → Cross-reference monitoring → Identify root cause → Apply fix → Monitor recovery → Post-mortem
```

**Common Error Patterns**:

| Error Type | First Check | Common Cause | Quick Fix |
|------------|-------------|--------------|-----------|
| 500 Backend | Sentry + Railway logs | Bad deployment, DB issue | Rollback deployment |
| Frontend blank | Vercel logs + browser console | Build failure, CORS | Fix build error, check CORS |
| Database connection | Railway PostgreSQL status | Connection pool, DB down | Restart service, check config |
| SSL certificate | Certificate expiry date | Auto-renewal failed | Contact platform support |

**Backend 500 Errors**:
```bash
# 1. Check Sentry
curl -H "Authorization: Bearer $TOKEN" \
  https://sentry.io/api/0/projects/{org}/dutycall-backend/issues/?query=is:unresolved

# 2. Check Railway logs
railway logs --tail 100

# 3. Test database
curl https://dutycall-production.up.railway.app/api/check-users

# 4. Check recent deployments
git log --oneline -10

# 5. Rollback if needed
# Railway: Redeploy previous commit from dashboard
```

**Frontend Not Loading**:
```bash
# 1. Check Vercel deployment
curl -I https://dutycall.vercel.app
# Expected: HTTP/2 200

# 2. Check DNS
dig dutycall.vercel.app

# 3. Check for CORS errors
curl -H "Origin: https://dutycall.vercel.app" \
  -H "Access-Control-Request-Method: GET" \
  -X OPTIONS \
  https://dutycall-production.up.railway.app/api/user

# 4. Rollback Vercel deployment from dashboard if needed
```

**Database Connection Issues**:
```bash
# 1. Test connectivity
curl https://dutycall-production.up.railway.app/api/check-users

# 2. Check connection pool
# Look for "SQLSTATE[HY000] [1040] Too many connections" in Sentry

# 3. Check environment variables
railway variables
# Verify: DB_HOST, DB_PORT, DB_DATABASE, DB_USERNAME, DB_PASSWORD

# 4. Restart service
railway up --service backend
```

**SSL Certificate**:
```bash
# Check expiry
echo | openssl s_client -connect dutycall.vercel.app:443 2>/dev/null | \
  openssl x509 -noout -dates

# Output:
# notBefore=Oct 13 00:00:00 2025 GMT
# notAfter=Jan 11 23:59:59 2026 GMT

# If expired: Contact Vercel/Railway support (auto-renew should work)
```

**Root Cause Categories**:

1. **Code Deployment**:
   - Syntax error, uncaught exception
   - Fix: Rollback, fix code, redeploy

2. **Configuration**:
   - Missing/wrong environment variable
   - Fix: Add/correct variable, redeploy

3. **Infrastructure**:
   - Platform outage (Railway/Vercel)
   - Fix: Wait for platform recovery, or migrate

4. **Database**:
   - Connection pool exhaustion, slow queries
   - Fix: Restart service, optimize queries

5. **External Service**:
   - Twilio, Sentry, UptimeRobot down
   - Fix: Wait for service recovery, implement fallback

**Resolution Priority**:
```
P0 (Immediate): Complete outage, no workaround
P1 (< 1 hour): Major feature broken, impacts many users
P2 (< 4 hours): Minor feature broken, impacts some users
P3 (< 1 day): Edge case, workaround available
```

**Post-Mortem Template**:
```markdown
## Incident: [Title]
- **Incident ID**: INC-2025-001
- **Severity**: P0/P1/P2/P3
- **Start**: 2025-10-14 10:30 UTC
- **End**: 2025-10-14 11:15 UTC
- **Duration**: 45 minutes

## Impact
- Users affected: 50% of active users
- Features unavailable: Voice calls (inbound + outbound)
- Revenue impact: $0 (free tier)

## Root Cause
Database connection pool exhausted due to slow query in `/api/queue/calls`

## Resolution
1. Identified slow query in Railway logs
2. Added database index on `calls.created_at`
3. Redeployed backend
4. Verified query performance improved

## Prevention
- Add query performance monitoring
- Set up alerts for slow queries > 1s
- Review all queries for index usage before deploying
```

</TabItem>
</Tabs>

---

## 5. Metrics and KPIs

### Uptime Target: 99.9%

**What it means**: Maximum 43 minutes of downtime per month

**Current status**: Check UptimeRobot dashboard

**How we measure**:
```
Uptime % = (Total time - Downtime) / Total time × 100
```

### Error Rate Target: < 1%

**What it means**: Less than 1 error per 100 requests

**Current status**: Check Sentry dashboard

**How we measure**:
```
Error rate = (Errors / Total requests) × 100
```

### Response Time Target: < 500ms

**What it means**: Average API response time under 500 milliseconds

**Current status**: Check UptimeRobot monitor response times

**How we measure**: Average response time across all API endpoints

### Mean Time to Resolution (MTTR): < 1 hour for critical issues

**What it means**: Critical errors resolved within 1 hour of detection

**Current status**: Manual tracking via Sentry issue timeline

**How we measure**: Time from error first detected to marked as resolved

---

## 6. Alerting and On-Call

### Alert Channels

**Email** (Immediate):
- All downtime alerts from UptimeRobot
- All new error types from Sentry
- High error rate alerts from Sentry

**SMS** (Critical only - 10/month free tier):
- Complete service outage (all monitors down)
- Database connectivity lost
- Authentication system down

**Slack** (Future):
- Team channel notifications for all alerts
- Lower urgency than email

### Alert Priorities

#### P0 - Critical (Immediate Response Required)

**Definition**: Complete service outage, no workaround

**Examples**:
- All UptimeRobot monitors down
- Database completely unreachable
- Authentication system down (no one can login)
- Twilio account suspended/deactivated

**Response SLA**: Immediate (within 15 minutes)

**Who responds**: On-call engineer + escalate to lead

#### P1 - High (Response within 1 hour)

**Definition**: Major feature broken, impacts many users

**Examples**:
- Inbound calls not routing to queue
- Outbound dialer not working
- Error rate > 10% of requests
- API response times > 5 seconds

**Response SLA**: Within 1 hour

**Who responds**: On-call engineer

#### P2 - Medium (Response within 4 hours)

**Definition**: Minor feature broken, impacts some users

**Examples**:
- Isolated errors affecting specific role (e.g., only agents)
- Non-critical feature not working (e.g., export CSV)
- Performance degradation (slower but functional)

**Response SLA**: Within 4 hours (during business hours)

**Who responds**: On-call engineer (next business day if after hours)

#### P3 - Low (Response within 1 day)

**Definition**: Minor errors with workarounds, edge cases

**Examples**:
- UI glitches that don't prevent functionality
- Errors only in specific browsers/devices
- Low-impact errors (< 5 users affected)

**Response SLA**: Within 1 business day

**Who responds**: Development team during normal work hours

---

## 7. Security Considerations

### API Keys and Tokens

**Never commit to git**:
- Sentry DSN (public keys are OK, auth tokens are NOT)
- Sentry auth tokens (SENTRY_AUTH_TOKEN)
- UptimeRobot API key (UPTIMEROBOT_API_KEY)
- Any credentials for monitoring services

**Use environment variables**:
```bash
# Backend .env (NEVER commit)
SENTRY_LARAVEL_DSN=https://abc123@sentry.io/456
SENTRY_AUTH_TOKEN=sntrys_abc123...
UPTIMEROBOT_API_KEY=ur123456-abc...

# Frontend .env.local (NEVER commit)
NEXT_PUBLIC_SENTRY_DSN=https://xyz789@sentry.io/789
SENTRY_AUTH_TOKEN=sntrys_xyz789...
```

**Rotate tokens annually**:
- Create calendar reminder
- Generate new tokens
- Update in production environments
- Revoke old tokens

### Public DSNs vs Auth Tokens

**Sentry DSN (Public - Safe to expose)**:
- `NEXT_PUBLIC_SENTRY_DSN` - Frontend DSN
- Send-only (can't read data from Sentry)
- Safe to expose in client-side JavaScript
- Rate limited by Sentry

**Sentry Auth Token (Private - NEVER expose)**:
- `SENTRY_AUTH_TOKEN` - For API access
- Read/write access to Sentry data
- Must be kept secret
- Only used in backend or CI/CD

**UptimeRobot**:
- Monitor URLs are public (anyone can check if site is up)
- API key is private (can modify monitors, read detailed data)

---

## 8. Troubleshooting

### Sentry Not Receiving Errors

**Problem**: Deployed code but errors not appearing in Sentry

**Checklist**:
1. ✅ Verify DSN is correct in environment variables
   ```bash
   # Backend
   railway variables | grep SENTRY

   # Frontend
   vercel env ls
   ```
2. ✅ Check service was restarted after adding DSN
   - Backend: Redeploy in Railway
   - Frontend: Redeploy in Vercel
3. ✅ Test with manual error trigger
   ```bash
   # Backend test
   curl https://dutycall-production.up.railway.app/api/test-sentry

   # Frontend test
   # Visit https://dutycall.vercel.app/test-sentry (if endpoint exists)
   ```
4. ✅ Check Sentry project configuration
   - Verify project is active (not paused)
   - Check rate limits not exceeded
5. ✅ Verify network connectivity
   - Ensure backend can reach sentry.io (not blocked by firewall)

**Common Causes**:
- DSN typo in environment variable
- Service not restarted after env var change
- Sentry SDK not installed or not initialized
- Project quota exceeded (free tier limits)

### UptimeRobot False Positives

**Problem**: Receiving downtime alerts but service is actually up

**Checklist**:
1. ✅ Manually check if service is actually down
   ```bash
   curl -I https://dutycall.vercel.app
   # Should return: HTTP/2 200
   ```
2. ✅ Verify expected status code is correct
   - If endpoint returns 301 redirect, update monitor to expect 301
   - If endpoint requires auth, expect 401 not 200
3. ✅ Increase timeout if service is slow
   - UptimeRobot default: 30 seconds
   - If service takes > 30s to respond, increase timeout
4. ✅ Enable "Confirm before alert"
   - UptimeRobot will check 2-3 times before alerting
   - Reduces false positives from transient network issues

**Common Causes**:
- Network routing issues (UptimeRobot servers can't reach your service)
- Service temporarily slow (response > timeout)
- Expected status code configuration wrong
- Service blocks monitoring IPs (rare)

### Source Maps Not Working (Frontend)

**Problem**: Sentry shows minified JavaScript, not original TypeScript code

**Checklist**:
1. ✅ Verify SENTRY_AUTH_TOKEN is set in Vercel
   ```bash
   vercel env ls | grep SENTRY_AUTH_TOKEN
   ```
2. ✅ Check build logs for "Uploading source maps"
   - Vercel deployment logs should show Sentry CLI uploading source maps
3. ✅ Ensure token has correct permissions
   - Sentry → Settings → Auth Tokens → Check "project:releases" scope
4. ✅ Verify Sentry CLI is configured correctly
   - Check `sentry.properties` or `next.config.js` configuration

**Common Causes**:
- Auth token missing or invalid
- Auth token doesn't have release permissions
- Source map upload failed silently
- Release version mismatch

---

## 9. Cost Management

### Current Costs: $0/month

**Sentry Free Tier**:
- **Errors**: 5,000 events/month
- **Performance**: 10,000 transactions/month
- **Session Replay**: 500 replays/month
- **Cost**: $0/month

**UptimeRobot Free Tier**:
- **Monitors**: 50 monitors
- **Interval**: 5 minutes
- **SMS Alerts**: 10/month
- **Cost**: $0/month

**Total Monthly Cost**: $0

### When to Upgrade

#### Sentry Team Plan ($26/month)

**Upgrade when**:
- Exceeding 5,000 errors/month consistently
- Need more than 500 session replays/month
- Want advanced features (better alerting, integrations)
- Team grows beyond 1 developer

**What you get**:
- 50,000 errors/month
- 100,000 transactions/month
- Unlimited session replays
- Team collaboration features
- Priority support

#### UptimeRobot Pro Plan ($7/month)

**Upgrade when**:
- Need more than 50 monitors
- Want 1-minute check intervals (instead of 5 minutes)
- Need more than 10 SMS alerts/month
- Want advanced reporting features

**What you get**:
- 50 monitors (same)
- 1-minute intervals
- 100 SMS alerts/month
- Advanced reporting
- Custom SSL monitoring

**Total Cost if Upgraded**: $33/month

---

## 10. Local Development

### Testing Sentry Locally

<Tabs groupId="developer-type">
<TabItem value="human" label="👨‍💻 Human Developer" default>

**Backend Testing**:

1. **Ensure Sentry is configured** in local `.env`:
   ```bash
   SENTRY_LARAVEL_DSN=https://your-dsn@sentry.io/project-id
   APP_ENV=local
   ```

2. **Create test endpoint** (if not exists):
   ```php
   // backend/routes/api.php
   Route::get('/test-sentry', function () {
       throw new \Exception('Sentry backend test exception');
   });
   ```

3. **Trigger test error**:
   ```bash
   curl http://localhost:8090/api/test-sentry
   ```

4. **Verify in Sentry**:
   - Go to Sentry → dutycall-backend → Issues
   - Should see "Sentry backend test exception"
   - Environment should be "local"

**Frontend Testing**:

1. **Ensure Sentry is configured** in `.env.local`:
   ```bash
   NEXT_PUBLIC_SENTRY_DSN=https://your-dsn@sentry.io/project-id
   ```

2. **Create test page** at `app/test-sentry/page.tsx`:
   ```typescript
   'use client';

   export default function TestSentry() {
     const throwError = () => {
       throw new Error('Sentry frontend test exception');
     };

     return (
       <div className="p-6">
         <button onClick={throwError} className="btn btn-primary">
           Throw Test Error
         </button>
       </div>
     );
   }
   ```

3. **Visit page and click button**:
   ```
   http://localhost:3000/test-sentry
   ```

4. **Verify in Sentry**:
   - Go to Sentry → dutycall-frontend → Issues
   - Should see "Sentry frontend test exception"
   - Environment should be "development"

**Important**: Delete test endpoints before deploying to production!

</TabItem>
<TabItem value="ai" label="🤖 AI Agent">

**Backend Test**:
```bash
# Add to routes/api.php
Route::get('/test-sentry', fn() => throw new \Exception('Test'));

# Trigger
curl http://localhost:8090/api/test-sentry

# Check Sentry for error
```

**Frontend Test**:
```typescript
// Add page: app/test-sentry/page.tsx
export default function() {
  return <button onClick={() => { throw new Error('Test'); }}>Test</button>;
}

// Visit: http://localhost:3000/test-sentry
// Click button → Check Sentry
```

**Environment Filtering**:
- Sentry separates by environment (local, production)
- Set `APP_ENV=local` (backend) or `NODE_ENV=development` (frontend)
- Filter issues by environment in Sentry dashboard

</TabItem>
</Tabs>

### Monitoring Local Services

**UptimeRobot cannot monitor localhost** (not accessible from internet)

**Alternatives for local monitoring**:
- **Browser DevTools**: Console tab for errors, Network tab for API calls
- **Laravel Logs**: `storage/logs/laravel.log`
- **Next.js Console**: Terminal running `npm run dev`
- **Database Logs**: Check MySQL query log if needed

**Simulating Production Monitoring Locally**:
- Use ngrok to expose localhost to internet
- Add ngrok URL to UptimeRobot as test monitor
- Remember to delete test monitor after testing

---

## 11. Additional Resources

### Documentation Links

- **Sentry Documentation**: https://docs.sentry.io/
- **Sentry API Reference**: https://docs.sentry.io/api/
- **UptimeRobot API Docs**: https://uptimerobot.com/api/
- **UptimeRobot Blog**: https://blog.uptimerobot.com/
- **Railway Status**: https://railway.app/status
- **Vercel Status**: https://www.vercel-status.com/

### Platform Dashboards

- **Sentry**: https://sentry.io
- **UptimeRobot**: https://uptimerobot.com/dashboard
- **Railway**: https://railway.app
- **Vercel**: https://vercel.com

### Support Channels

- **Sentry Support**: https://sentry.io/support/
- **UptimeRobot Support**: support@uptimerobot.com
- **Railway Discord**: https://discord.gg/railway
- **Vercel Support**: https://vercel.com/support

---

## 12. Changelog

### 2025-10-14
- ✅ Initial monitoring setup completed
- ✅ Sentry configured for backend (dutycall-backend project)
- ✅ Sentry configured for frontend (dutycall-frontend project)
- ✅ UptimeRobot configured with 4 monitors:
  - Frontend application monitor
  - Backend API monitor
  - Database health monitor
  - SSL certificate monitor
- ✅ Alert notifications configured (email)
- ✅ Documentation created

---

## Next Steps

### Immediate (This Week)
- [ ] Test all monitoring alerts (trigger test downtime)
- [ ] Verify Sentry error grouping is working correctly
- [ ] Set up Slack notifications for alerts (optional)
- [ ] Create public status page in UptimeRobot

### Short-term (This Month)
- [ ] Build in-app monitoring dashboard widgets (super admin view)
- [ ] Implement system status banner (all users)
- [ ] Add performance monitoring alerts (slow queries, high CPU)
- [ ] Create incident response documentation

### Long-term (Next Quarter)
- [ ] Set up PagerDuty for on-call rotation (if team grows)
- [ ] Implement automated incident post-mortems
- [ ] Add business metrics monitoring (calls/day, user growth)
- [ ] Create weekly monitoring reports

---

**Documentation Maintained By**: Development Team
**Last Reviewed**: 2025-10-14
**Next Review**: 2025-11-14 (monthly review recommended)
