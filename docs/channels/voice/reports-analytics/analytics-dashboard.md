---
id: analytics-dashboard
title: Analytics Dashboard
sidebar_label: Analytics Dashboard
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Analytics Dashboard

:::tip Live Feature
The Analytics Dashboard is **fully operational** and available now! Access it from the left sidebar navigation.
:::

## Overview

The Analytics Dashboard provides real-time insights into your voice communication performance, system health, and usage metrics. The dashboard uses **role-filtered content** - you'll see exactly the data and features relevant to your role.

### Key Features

- 📊 **5 Comprehensive Tabs**: Overview, Campaigns, Voice, Usage, System Health
- 🔄 **Real-time Data**: Refresh analytics on demand
- 📈 **Visual Charts**: Interactive graphs and progress bars
- 📤 **Export Capabilities**: Download data as CSV for further analysis
- 🎯 **Role-Based Access**: See only what's relevant to your role

### Who Can Access Analytics?

| Role | Access Level | Available Tabs |
|------|--------------|----------------|
| **Agent** | Own performance only | Overview, Voice (personal data) |
| **Department Manager** | Department team data | Overview, Campaigns, Voice, *(future: Team Performance)* |
| **Account Admin** | Organization-wide | Overview, Campaigns, Voice, Usage |
| **Super Admin** | Network-wide | All tabs including System Health |

---

## Accessing the Analytics Dashboard

1. **Log in** to DutyCall
2. **Click "Analytics"** in the left sidebar navigation
3. **Select a tab** to view specific analytics

The dashboard will automatically show data scoped to your role and permissions.

---

<Tabs groupId="user-role">
<TabItem value="agent" label="👤 Agent" default>

## For Agents: Personal Performance Analytics

As an Agent, the Analytics Dashboard shows **your personal performance only**. This helps you track your own productivity, identify areas for improvement, and monitor your success.

### What You See

**Overview Tab:**
- Your total calls (this period)
- Your personal call volume metrics
- Account age

**Voice Tab (Your Data Only):**
- Your call count (inbound + outbound)
- Your success rate (completed vs failed)
- Your average call duration
- Your total talk time
- Your call status breakdown

### What You Cannot See

The dashboard is scoped to **your data only**. You will NOT see:
- ❌ Team or department performance
- ❌ Other agents' call data
- ❌ Campaign management statistics
- ❌ Organization usage metrics (email/SMS quotas)
- ❌ System health information
- ❌ Export functionality (restricted to Manager+)

### Why Limited Access?

**Data Minimization**: You only access data relevant to your role (GDPR/CCPA compliance principle)

**Privacy Protection**: Other agents' performance data is protected from peer viewing

**Focus**: Removes distractions from comparison to others - focus on your own improvement

**Security**: Reduces risk of sensitive data exposure

### How to Use Analytics for Self-Improvement

**Daily Routine:**
1. Log in to DutyCall
2. Click **"Analytics"** in sidebar
3. Check your **Voice tab**:
   - What's my success rate today? (Target: &gt;80%)
   - How many calls have I handled?
   - What's my average call duration?

**What Good Performance Looks Like:**
- **Success Rate**: &gt;80% calls completed successfully
- **Average Duration**: Consistent with your team's target (ask your manager)
- **Status Breakdown**: Low failed/no-answer rates

**If You See Issues:**
- **Success rate &lt;80%**: Review call handling technique, check if customers are answering
- **Very short durations**: May indicate missed calls or technical issues
- **High failed rate**: Check your phone/headset connection, verify WebRTC is working

### Quick Actions

**Refresh Your Data:**
- Click the **"Refresh"** button (top right) to see latest stats
- Dashboard updates in real-time based on your recent calls

**Review Call History:**
- For detailed call-by-call records, visit [Call History](/channels/voice/reports-analytics/call-history)
- Filter by date, direction, status, or contact

**Get Help:**
- If numbers look wrong, contact your manager
- For technical issues, check [Troubleshooting](/voice/inbound/agent/troubleshooting)

### Understanding Your Metrics

**Total Calls:**
- Count of all calls (inbound + outbound) you handled
- Higher is generally better (shows activity level)

**Success Rate:**
- Percentage of calls that completed successfully
- Formula: (Successful Calls / Total Calls) × 100
- Target: &gt;80% for healthy performance

**Average Duration:**
- Mean length of your calls in minutes/seconds
- Should be consistent with your role expectations
- Very short = potential connection issues
- Very long = may need efficiency coaching (ask manager)

**Total Talk Time:**
- Sum of all call durations
- Shows your total productive time on calls
- Use to understand your daily workload

### Tips for Agents

**Daily Check (30 seconds):**
- Morning: Check yesterday's success rate
- End of day: Review today's call count and duration

**Weekly Review (5 minutes):**
- Compare this week vs last week
- Look for trends (improving or declining?)
- Identify patterns in your peak performance times

**Goal Setting:**
- Set personal targets (e.g., "achieve 85% success rate this week")
- Track progress daily
- Celebrate improvements

**When to Ask for Help:**
- Success rate drops below 70%
- Average duration significantly changes (±50%)
- You see failed calls but don't know why
- Numbers don't match your perception of performance

---

**Remember**: These analytics are for YOUR benefit - use them to improve, not to stress. Everyone has off days.

</TabItem>

<TabItem value="manager" label="👥 Manager">

## For Managers: Using the Analytics Dashboard

As a Department Manager, you have access to **team-level analytics** to monitor performance, track campaigns, and optimize operations.

### Available Tabs

#### 1. Overview Tab

**Key Metrics:**
- **Total Campaigns**: All campaigns created by your team
- **Total Contacts**: Contact database size across all groups
- **Contact Groups**: Number of organized contact lists
- **Active Providers**: Configured communication providers (Twilio, etc.)

**Recent Activity:**
- Campaigns created in last 30 days
- Quick performance snapshot

**Account Information:**
- Account age
- Email/SMS usage with progress bars
- Visual threshold warnings (yellow at 80%, red at 90%)

![Overview Tab placeholder - shows 4 metric cards with total campaigns, contacts, groups, and providers]

#### 2. Campaigns Tab

**Status Breakdown Cards:**
- **Draft Campaigns**: Not yet started
- **Active Campaigns**: Currently running
- **Paused Campaigns**: Temporarily stopped
- **Completed Campaigns**: Finished calling

**Recent Campaigns Table:**
- Campaign name
- Status badge (color-coded: green=active, gray=completed, yellow=paused)
- Created date
- **Export button**: Download campaign list as CSV

![Campaigns Tab placeholder - shows status cards and campaign table]

#### 3. Voice Tab

**Comprehensive voice analytics with 8 metric categories:**

**Volume Breakdown:**
- Total calls (inbound + outbound)
- Inbound vs Outbound split (with percentages)
- Call distribution visualization

**Success Metrics:**
- Total successful calls
- Failed calls count
- Overall success rate (%)
- Inbound success rate
- Outbound success rate

**Duration Analytics:**
- Average call duration (seconds)
- Total talk time (minutes)
- Longest call duration
- Shortest call duration

**Peak Hours Analysis:**
- 24-hour call volume chart
- Peak calling hour identified
- Hourly breakdown visualization

**Status Breakdown:**
- Completed calls (with percentage)
- Failed calls
- Busy signals
- No-answer calls
- Canceled calls
- In-progress calls

**Agent Performance (Top 5):**
- Agent name
- Total calls handled
- Successful calls
- Average call duration
- Success rate (%)

**Trend Data:**
- Daily call volume over date range (if > 7 days)
- Visual trend line chart

**Wait Time Metrics:**
- Average queue wait time
- Longest queue wait time
- Total queued calls

![Voice Tab placeholder - shows charts for call volume, success rates, peak hours, and agent performance]

#### How to Use Voice Analytics

**Filter by Date Range:**
- Default: Last 30 days
- Custom range: Use date picker (if available)
- Click "Refresh" to update data

**Understanding Success Rates:**
- **&gt;80%**: Healthy performance 🟢
- **60-80%**: Needs attention 🟡
- **&lt;60%**: Critical issues 🔴

**Interpreting Peak Hours:**
- Use peak hour data to optimize agent scheduling
- Identify high-volume periods for staffing adjustments
- Plan campaigns around peak customer availability

**Agent Performance Insights:**
- Compare team members' call handling efficiency
- Identify training opportunities
- Recognize high performers

:::tip Export Data for Deep Analysis
Use the **Export** button on any tab to download raw data as CSV. Import into Excel or Google Sheets for custom reports and presentations.
:::

### Role-Based Data Scoping

**What you see as a Department Manager:**

- **If departments are configured**: Analytics for agents in YOUR department(s) only
- **If departments not yet configured**: All organizational data (fallback for testing/setup phase)
- **Never see**: Other departments' data (when departments are configured)

This scoping applies to:
- Call volume counts
- Agent performance metrics
- Campaign statistics
- All voice analytics

### Tips for Managers

**Daily Monitoring:**
1. Check **Overview** for quick health snapshot
2. Review **Voice > Success Metrics** for performance trends
3. Monitor **Peak Hours** to validate staffing schedule

**Weekly Review:**
1. Analyze **Agent Performance** rankings
2. Review **Campaign Status** breakdown
3. Export **Voice Analytics** for team meetings

**Monthly Planning:**
1. Use **Trend Data** (30+ day range) for forecasting
2. Review **Duration Analytics** to optimize call scripts
3. Compare **Success Rates** month-over-month

</TabItem>

<TabItem value="admin" label="🔧 Admin">

## For Admins: Analytics Dashboard

As an Account Administrator, you have access to **organization-wide analytics** including usage tracking and system-wide metrics.

### All Manager Features, Plus:

#### Usage Tab (Admin+ Only)

Monitor your organization's email and SMS quota usage in real-time.

**Email Usage Card:**
- Used count (how many emails sent)
- Limit (total allowed per billing period)
- Remaining (quota left)
- Usage percentage with visual progress bar
- Color-coded thresholds:
  - Green: &lt;80% used
  - Yellow: 80-89% used
  - Red: 90%+ used

**SMS Usage Card:**
- Same metrics as Email Usage
- Separate quota tracking
- Independent threshold warnings

**Subscription Details:**
- Plan Type (Free, Pro, Enterprise)
- Quota Reset Date (when counters reset to zero)

![Usage Tab placeholder - shows email and SMS usage cards with progress bars]

**Why This Matters:**
- **Avoid service interruptions**: Know when you're approaching limits
- **Budget planning**: Track communication costs
- **Upgrade timing**: Identify when to move to higher tier

#### System Health Tab (Super Admin Only)

:::caution Super Admin Access Required
The **System Health** tab is only visible to Super Administrators. Account Admins see Overview, Campaigns, Voice, and Usage tabs.
:::

**What Admins See:**
- Overview, Campaigns, Voice, Usage tabs
- Full organization-wide data (all departments)
- No department-based scoping restrictions

**Data Scoping for Admins:**
- See all campaigns across organization
- View all agents' performance metrics
- Access complete call history
- Monitor organization-wide usage

### Admin-Specific Use Cases

**Capacity Planning:**
- Use **Voice > Volume Breakdown** to forecast infrastructure needs
- Monitor **Usage** tab to plan subscription upgrades
- Track **Peak Hours** for optimal queue configuration

**Cost Management:**
- Monitor **Email/SMS Usage** to control costs
- Identify high-usage periods for budget forecasting
- Track provider usage across organization

**Compliance & Auditing:**
- Export **Voice Analytics** for regulatory reports
- Document **Success Rates** for quality assurance
- Archive **Campaign Stats** for recordkeeping

</TabItem>

<TabItem value="superadmin" label="⚡ Super Admin">

## For Super Admins: Full Analytics Access

As a Super Administrator, you have **unrestricted access** to all analytics across the entire platform, including the System Health tab.

### All Admin Features, Plus:

#### System Health Tab

**Real-time system monitoring** to ensure platform reliability and uptime.

**System Status Cards:**

1. **API Status**
   - Status: Operational / Degraded / Down
   - Indicator: 🟢 Green (operational) / 🟡 Yellow (degraded) / 🔴 Red (down)
   - Description: REST API endpoint health
   - Last Checked: Timestamp of last health check

2. **Database Status**
   - Status: Healthy / Degraded / Down
   - Indicator: Color-coded status
   - Description: Database connectivity and performance
   - Last Checked: Real-time

3. **Provider Health**
   - Active Providers count
   - Total Providers count
   - Health Score percentage (0-100%)
   - Status based on score:
     - ≥80%: Operational 🟢
     - 50-79%: Degraded 🟡
     - &lt;50%: Down 🔴

**Provider Status Details:**
- Active Providers metric card
- Total Providers metric card
- Health Score percentage (color-coded)

**System Uptime:**
- Large uptime percentage display (e.g., "99.9%")
- Overall system availability metric
- Platform reliability indicator

![System Health Tab placeholder - shows status cards for API, database, and providers]

**When to Check System Health:**
- **Daily**: Quick status verification
- **Before major deployments**: Ensure system stability
- **During incidents**: Real-time health monitoring
- **After maintenance**: Verify services restored

**Health Score Calculation:**
```
Health Score = (Active Providers / Total Providers) × 100
```

**Troubleshooting by Status:**

- **API Down**: Check backend logs, verify server uptime
- **Database Degraded**: Check connection pool, review slow queries
- **Provider Health &lt;80%**: Review inactive providers, check Twilio account status

### Network-Wide Visibility

**Data Scoping for Super Admins:**
- **No scoping restrictions**: See everything across all organizations
- View all customers' data (if multi-tenant)
- Access all agents, departments, campaigns network-wide
- Monitor platform-wide metrics

### Super Admin Responsibilities

**Platform Monitoring:**
- Daily review of **System Health** tab
- Monitor **Provider Health** scores
- Track **Uptime** metrics for SLA compliance

**Performance Optimization:**
- Analyze **Voice Analytics** at network level
- Identify underperforming organizations
- Optimize resource allocation across customers

**Strategic Planning:**
- Review **Usage** trends across all customers
- Forecast infrastructure scaling needs
- Plan feature rollouts based on analytics

</TabItem>

<TabItem value="developer" label="💻 Developer">

## For Developers: Analytics API & Implementation

Technical documentation for integrating with the Analytics system.

### Backend API Endpoints

**Base URL:** `/api/analytics`

**Authentication:** All endpoints require Bearer token authentication

**Role-Based Access Control:**
```php
'role:super_admin,account_admin,dept_manager'
```

Agents have limited access (own data only).

---

#### 1. Dashboard Overview

**Endpoint:** `GET /api/analytics/dashboard`

**Response:**
```json
{
  "success": true,
  "data": {
    "overview": {
      "total_campaigns": 12,
      "total_groups": 5,
      "total_contacts": 234,
      "total_providers": 2
    },
    "recent_activity": {
      "campaigns_last_30_days": 3,
      "period": "last_30_days"
    },
    "user_info": {
      "account_created": "2 months ago",
      "emails_used": 45,
      "sms_used": 12,
      "email_limit": 100,
      "sms_limit": 50
    }
  },
  "message": "Dashboard analytics retrieved successfully"
}
```

---

#### 2. Campaign Statistics

**Endpoint:** `GET /api/analytics/campaign-stats`

**Response:**
```json
{
  "success": true,
  "data": {
    "status_breakdown": {
      "draft": 3,
      "active": 2,
      "completed": 5,
      "paused": 2
    },
    "total_campaigns": 12,
    "recent_campaigns": [
      {
        "id": 45,
        "title": "Q4 Outreach Campaign",
        "status": "active",
        "created_at": "2 days ago"
      }
    ]
  }
}
```

---

#### 3. Usage Statistics

**Endpoint:** `GET /api/analytics/usage-stats`

**Access:** Admin+ only

**Response:**
```json
{
  "success": true,
  "data": {
    "email_usage": {
      "used": 45,
      "limit": 100,
      "remaining": 55,
      "percentage_used": 45.00
    },
    "sms_usage": {
      "used": 12,
      "limit": 50,
      "remaining": 38,
      "percentage_used": 24.00
    },
    "subscription_type": "free",
    "reset_date": "2025-10-31"
  }
}
```

---

#### 4. System Health

**Endpoint:** `GET /api/analytics/system-health`

**Access:** Super Admin only

**Response:**
```json
{
  "success": true,
  "data": {
    "api_status": "operational",
    "database_status": "healthy",
    "provider_status": {
      "active_providers": 2,
      "total_providers": 2,
      "health_score": 100
    },
    "last_checked": "2025-10-11T14:23:15Z",
    "uptime": "99.9%"
  }
}
```

---

#### 5. Voice Analytics

**Endpoint:** `GET /api/analytics/voice`

**Query Parameters:**
- `date_from` (optional): Start date (YYYY-MM-DD), defaults to 30 days ago
- `date_to` (optional): End date (YYYY-MM-DD), defaults to today

**Example Request:**
```bash
GET /api/analytics/voice?date_from=2025-10-01&date_to=2025-10-11
Authorization: Bearer {token}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "volume_breakdown": {
      "total_calls": 1523,
      "inbound_calls": 1120,
      "outbound_calls": 403,
      "inbound_percentage": 73.54,
      "outbound_percentage": 26.46
    },
    "success_metrics": {
      "total_calls": 1523,
      "successful_calls": 1324,
      "failed_calls": 199,
      "overall_success_rate": 86.93,
      "inbound_success_rate": 89.20,
      "outbound_success_rate": 78.91
    },
    "duration_analytics": {
      "average_call_duration_seconds": 204.5,
      "total_talk_time_minutes": 5187.2,
      "longest_call_duration": 1842,
      "shortest_call_duration": 12
    },
    "peak_hours": {
      "hourly_data": [
        { "hour": 0, "call_count": 12 },
        { "hour": 1, "call_count": 5 },
        ...
        { "hour": 14, "call_count": 145 }
      ],
      "peak_calling_hour": 14
    },
    "wait_times": {
      "average_queue_wait_time_seconds": 0,
      "longest_queue_wait_time": 0,
      "total_queued_calls": 45
    },
    "agent_performance": [
      {
        "agent_id": 4,
        "agent_name": "John Smith",
        "total_calls": 234,
        "successful_calls": 210,
        "average_duration": 198.4,
        "success_rate": 89.74
      }
    ],
    "status_breakdown": {
      "completed": { "count": 1324, "percentage": 86.93 },
      "failed": { "count": 89, "percentage": 5.84 },
      "busy": { "count": 45, "percentage": 2.95 },
      "no_answer": { "count": 55, "percentage": 3.61 },
      "canceled": { "count": 10, "percentage": 0.66 },
      "in_progress": { "count": 0, "percentage": 0.00 }
    },
    "trends": [
      { "date": "2025-10-01", "call_count": 142 },
      { "date": "2025-10-02", "call_count": 156 }
    ]
  }
}
```

---

### Frontend Implementation

#### React Hooks

**File:** `frontend/src/hooks/useAnalytics.ts`

**Available Hooks:**
```typescript
// Dashboard overview
const { data, isLoading, error, refetch } = useAnalyticsDashboard();

// Campaign stats
const campaignStats = useCampaignStats();

// Usage stats (Admin+)
const usageStats = useUsageStats();

// System health (Super Admin)
const systemHealth = useSystemHealth();

// Voice analytics (with date filtering)
const voiceAnalytics = useVoiceAnalytics();
```

**Example Usage:**
```tsx
import { useVoiceAnalytics } from '@/hooks/useAnalytics';

function VoiceAnalyticsComponent() {
  const { data, isLoading, error } = useVoiceAnalytics();

  if (isLoading) return <LoadingCard />;
  if (error) return <ErrorMessage />;

  const { volume_breakdown, success_metrics } = data.data;

  return (
    <div>
      <h2>Total Calls: {volume_breakdown.total_calls}</h2>
      <p>Success Rate: {success_metrics.overall_success_rate}%</p>
    </div>
  );
}
```

---

#### UI Components

**File:** `frontend/src/components/analytics/index.ts`

**Available Components:**

```tsx
// Metric display card
<MetricCard
  title="Total Calls"
  value={1523}
  subtitle="Last 30 days"
  icon={<PhoneIcon />}
  colorTheme="success" // success, warning, error, info, default
/>

// Progress bar with thresholds
<ProgressBar
  current={45}
  max={100}
  label="Email Usage"
  showPercentage={true}
  showThresholds={true} // Yellow at 80%, red at 90%
  size="lg" // sm, md, lg
/>

// Status indicator
<StatusIndicator
  status="operational" // operational, degraded, down
  label="API Status"
  description="REST API endpoints"
  lastUpdated="2025-10-11T14:23:15Z"
/>

// Export button
<ExportButton
  data={campaigns}
  filename="campaign-analytics"
  format="csv"
  variant="outline"
  size="sm"
/>

// Voice analytics charts (comprehensive)
<VoiceAnalyticsCharts data={voiceData} />
```

---

### Role-Based Scoping Logic

**Implementation:** `backend/app/Http/Controllers/Api/AnalyticsController.php`

**Method:** `applyScopingToVoiceQuery()` (lines 682-715)

**Logic:**
```php
switch ($user->role) {
    case 'agent':
        // Show only their own calls
        $query->where('user_id', $user->id);
        break;

    case 'dept_manager':
        // Get departments this manager oversees
        $deptIds = DB::table('department_agents')
            ->where('agent_id', $user->id)
            ->pluck('department_id');

        if ($deptIds->isNotEmpty()) {
            // Show department team data
            $agentIds = DB::table('department_agents')
                ->whereIn('department_id', $deptIds)
                ->pluck('agent_id');
            $query->whereIn('user_id', $agentIds);
        }
        // Else: No departments - show all (fallback)
        break;

    case 'account_admin':
        // Show organization-wide data
        $query->where('customer_id', $user->customer_id);
        break;

    case 'super_admin':
        // No scoping - see everything
        break;
}
```

**Key Features:**
- **Agent scoping**: `user_id` filter
- **Manager scoping**: Department-based via `department_agents` pivot table
- **Manager fallback**: If no departments assigned, show all data (for testing/setup)
- **Admin scoping**: `customer_id` filter (multi-tenant)
- **Super Admin**: No filters applied

---

### Performance Optimization

**Memory Profiling:**
```php
$this->profiler->startProfiling('analytics_voice');
$this->profiler->checkpoint('volume_calculated');
$this->profiler->endProfiling();
```

**Add profiling header:**
```bash
GET /api/analytics/voice?profile=1
X-Memory-Profile: {"checkpoints":[...]}
```

**Optimization Techniques:**
- Use `count()` queries instead of loading collections
- Select only needed columns
- Apply database-level `groupBy` for aggregations
- Limit results at query level (not collection level)
- Eager load relationships to avoid N+1 queries

---

### Error Handling

**Standard Error Response:**
```json
{
  "success": false,
  "message": "Failed to retrieve voice analytics",
  "error": "Internal server error"
}
```

**HTTP Status Codes:**
- `200`: Success
- `401`: Unauthenticated (missing/invalid token)
- `403`: Unauthorized (insufficient permissions)
- `500`: Server error

**Logging:**
```php
Log::error('Voice analytics failed: ' . $e->getMessage(), [
    'exception' => $e,
    'user_id' => auth()->id()
]);
```

---

### Testing the Analytics Dashboard

**Quick Test:**
1. Log in with Manager+ account
2. Navigate to **Analytics** in sidebar
3. Should see full dashboard with 5 tabs (or 4 if not Super Admin)
4. Click each tab to verify data loads
5. Test **Refresh** button
6. Test **Export** button on Campaigns tab

**API Testing:**
```bash
# Get voice analytics
curl -X GET "https://api.dutycall.net/api/analytics/voice?date_from=2025-10-01&date_to=2025-10-11" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Accept: application/json"
```

---

### Future Enhancements (Roadmap)

**Phase 3: Agent Comparison Table**
- New "Team Performance" tab for managers
- Sortable agent comparison table
- Drill-down to individual agent details
- Endpoint: `GET /api/analytics/team-performance`

**Phase 4: Department Rollup View**
- New "Department Overview" tab for admins
- Department comparison table
- Health scores per department
- Drill-down from org → dept → agent

**Phase 5: Network Dashboard**
- New "Network Overview" tab for super admins
- Customer comparison table
- Network-wide metrics
- Full drill-down hierarchy

See `notes/analytics-hierarchy-vision.md` for complete roadmap details.

</TabItem>
</Tabs>

---

## Refreshing Analytics Data

The dashboard displays **real-time data** based on current database state.

**To refresh:**
1. Click the **"Refresh"** button (top right of Analytics page)
2. All tabs will re-fetch data from the server
3. Charts and metrics update instantly

**Auto-refresh:**
- Not currently implemented
- Manual refresh required
- Future enhancement: Auto-refresh every 30-60 seconds

---

## Exporting Analytics Data

Export data for offline analysis, presentations, or custom reports.

**Available on:**
- Campaigns Tab (Recent Campaigns table)
- Future: Voice Tab, Agent Performance tables

**Format:** CSV (Comma-Separated Values)

**How to Export:**
1. Navigate to tab with export functionality
2. Click **"Export"** button
3. File downloads as `{filename}-{timestamp}.csv`
4. Open in Excel, Google Sheets, or any spreadsheet app

**What Gets Exported:**
- Current tab's visible data
- All columns shown in the table
- Filtered by current role/permissions

---

## Understanding Analytics Hierarchy

DutyCall follows **industry-standard analytics hierarchy** for role-based visibility:

```
Network (Super Admin)
  ↓
Customer/Organization (Account Admin)
  ↓
Department (Dept Manager)
  ↓
Agent (Individual)
```

**This matches:**
- Twilio Flex: Workspace → Task Queue → Worker
- Five9: Tenant → Campaign → Agent Group → Agent
- Genesys Cloud: Organization → Division → Queue → Agent

**Why This Matters:**
- Consistent with contact center industry standards
- Scalable from single-team to enterprise deployments
- Clear data ownership and visibility boundaries

---

## Related Documentation

- [Call History & Reports](/channels/voice/reports-analytics/call-history) - Detailed call logs with role-based access
- [Reports & Analytics Overview](/channels/voice/reports-analytics/overview) - Introduction to reporting features
- [Roles & Permissions](/administration/roles-permissions/overview) - Understanding access control
- [Data Export](/administration/data-management/data-export) - Bulk data export for compliance

---

**Questions or need help?** Contact your account administrator or [support team](https://dutycall.com/support).
