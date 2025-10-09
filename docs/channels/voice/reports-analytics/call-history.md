---
id: call-history
title: Call History & Reporting
description: Track and analyze all call activity with comprehensive filtering, role-based access, and export capabilities
keywords: [call history, call reporting, call analytics, call logs, voice reporting]
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Call History & Reporting

Track and analyze all call activity across inbound queues, manual dialer, and campaign calls. View comprehensive call details, filter by multiple criteria, and export data for external analysis.

## Quick Access

<Tabs groupId="user-role">
  <TabItem value="agent" label="👤 Agent" default>

**Your Call History**

Access your personal call history to review completed calls and track your activity.

**Navigation:** Dashboard → Call History

**What You See:** Only calls you handled

[Jump to Agent Guide →](#agent-view)

  </TabItem>
  <TabItem value="manager" label="👥 Manager">

**Team Call History**

Monitor team performance and generate reports for your department.

**Navigation:** Dashboard → Call History

**What You See:** All calls from agents in your department(s)

[Jump to Manager Guide →](#manager-view)

  </TabItem>
  <TabItem value="admin" label="🔧 Admin">

**System-Wide Call History**

Full visibility into all call activity across your organization.

**Navigation:** Dashboard → Call History

**What You See:** All calls from all agents

[Jump to Admin Guide →](#admin-view)

  </TabItem>
  <TabItem value="developer" label="💻 Developer">

**API & Integration**

Programmatic access to call history data for custom integrations.

**API Endpoint:** `GET /api/call-history`

**Authentication:** Sanctum Bearer Token

[Jump to Developer Guide →](#developer-guide)

  </TabItem>
</Tabs>

---

## Overview

The Call History feature provides a unified interface for tracking all call types:

- **Inbound Queue Calls** - Customer calls routed through your inbound queues
- **Manual Dialer Calls** - Outbound calls initiated by agents
- **Campaign Calls** - Automated campaign outreach

### Key Features

✅ **Real-time Updates** - Calls appear immediately after completion
✅ **Advanced Filtering** - Date ranges, agents, campaigns, direction, status
✅ **Role-Based Access** - Scoped visibility based on user permissions
✅ **CSV Export** - Download filtered results for analysis
✅ **Detailed Call Records** - Duration, status, pricing, recordings

---

<Tabs groupId="user-role">
  <TabItem value="agent" label="👤 Agent View" default>

## Agent View

### Accessing Call History

1. Log into your DutyCall dashboard
2. Navigate to **Call History** in the left sidebar
3. Your personal call history will load automatically

### What Calls You Can See

**Agents can only view their own calls.** You'll see:

- Inbound queue calls you accepted
- Manual dialer calls you initiated
- Campaign calls assigned to you

You **cannot** see calls handled by other agents.

### Using Filters

#### Date Range Filters

Quick filters for common time periods:

- **Today** - All calls from today
- **Yesterday** - All calls from yesterday
- **Last 7 Days** - Past week of activity
- **Last 30 Days** - Past month of activity
- **This Month** - Current calendar month

**Custom Date Range:**
1. Click the date range dropdown
2. Select "Custom Range"
3. Choose start and end dates
4. Click "Apply"

#### Search by Phone Number

1. Enter a phone number in the search box
2. Searches both caller numbers and your assigned numbers
3. Results update automatically as you type

#### Filter by Direction

- **Inbound** - Calls from customers to you
- **Outbound** - Calls you made to customers
- **All** - Show both types

#### Filter by Status

- **Completed** - Successfully connected calls
- **No Answer** - Calls where contact didn't answer
- **Busy** - Contact line was busy
- **Failed** - Call connection failed
- **All** - Show all statuses

### Viewing Call Details

Each call record shows:

| Column | Description |
|--------|-------------|
| **Date/Time** | When the call occurred (with relative time) |
| **Caller** | Phone number and contact name (if available) |
| **My Number** | The Twilio number used |
| **Direction** | Inbound (blue badge) or Outbound (green badge) |
| **Status** | Call outcome with colored indicator |
| **Duration** | Call length in MM:SS format |

**To view more details:**
1. Click the "View Details" button on any call
2. See full call information including:
   - Complete call timeline
   - Recording playback (if available)
   - Call SID for support requests

### Exporting Your Calls

1. Apply any filters you want (date range, status, etc.)
2. Click the **Export CSV** button in the top right
3. A CSV file will download with your filtered results

**CSV includes:**
- Date/Time of call
- Caller phone number
- Your assigned number
- Direction (Inbound/Outbound)
- Status
- Duration
- Price (if available)

### Common Tasks

<details>
<summary><strong>How do I find calls from a specific customer?</strong></summary>

1. Use the search box at the top
2. Enter the customer's phone number (any format works)
3. Results will filter to show only calls with that number

</details>

<details>
<summary><strong>How do I see all my calls from yesterday?</strong></summary>

1. Click the date range dropdown
2. Select "Yesterday"
3. The list will update to show only yesterday's calls

</details>

<details>
<summary><strong>How do I export my calls for the week?</strong></summary>

1. Click the date range dropdown
2. Select "Last 7 Days"
3. Click the "Export CSV" button
4. Open the downloaded file in Excel or Google Sheets

</details>

:::tip Best Practice
Export your call history weekly to track your performance and identify patterns in customer interactions.
:::

---

  </TabItem>
  <TabItem value="manager" label="👥 Manager View">

## Manager View

### Accessing Team Call History

1. Log into your DutyCall dashboard
2. Navigate to **Call History** in the left sidebar
3. Team call history loads automatically

### What Calls You Can See

**Managers see all calls from agents in their department(s).** You'll see:

- Inbound queue calls handled by your team
- Manual dialer calls made by your agents
- Campaign calls assigned to your department

You **cannot** see calls from agents outside your department(s).

### Using the Agent Filter

The agent dropdown allows you to focus on specific team members:

1. Click the **Agent** dropdown in the filters
2. See a list of all agents in your department(s)
3. Select an agent to view only their calls
4. Select "All Agents" to see everyone

**Agent Filter Shows:**
- Agent name
- Number of calls (in parentheses)
- Real-time call counts

### Advanced Filtering

#### Date Range Reports

Generate reports for specific time periods:

**Weekly Reports:**
1. Select "Last 7 Days"
2. Choose specific agent or "All Agents"
3. Export CSV for team review

**Monthly Reports:**
1. Select "This Month"
2. Filter by campaign if needed
3. Export for performance analysis

**Custom Periods:**
1. Choose "Custom Range"
2. Set reporting period (e.g., pay period)
3. Apply filters and export

#### Campaign Filtering

Track campaign performance:

1. Select campaign from dropdown
2. See all calls for that campaign
3. Filter by agent to see individual contribution
4. Export for campaign ROI analysis

#### Multi-Filter Reports

Combine filters for detailed insights:

**Example: Agent Performance Report**
- Date Range: Last 30 Days
- Agent: Select specific agent
- Direction: Outbound
- Status: Completed
- Export CSV

**Example: Campaign Effectiveness**
- Date Range: Campaign dates
- Campaign: Select campaign
- Direction: Outbound
- Status: All
- Export and analyze completion rates

### Team Reporting Use Cases

#### Daily Team Performance

**Morning Briefing Report:**
1. Filter: Yesterday
2. Agent: All Agents
3. Export CSV
4. Review in team meeting

#### Agent Productivity Analysis

**Individual Agent Report:**
1. Filter: Last 30 Days
2. Select specific agent
3. Note metrics:
   - Total calls
   - Average duration
   - Completion rate
4. Export for 1-on-1 review

#### Department Metrics

**Monthly Department Report:**
1. Filter: This Month
2. Agent: All Agents
3. Export CSV
4. Analyze:
   - Total call volume
   - Peak call times
   - Average handle time
   - Success rates by agent

### Exporting Team Reports

**CSV Export Includes:**
- Complete call details
- Agent assignments
- Campaign information
- Duration and pricing

**Best Practices:**
1. Filter first, then export (smaller files)
2. Include agent filter for individual reports
3. Use date ranges for trend analysis
4. Export regularly for historical tracking

### Common Manager Tasks

<details>
<summary><strong>How do I see which agent is making the most calls?</strong></summary>

1. Set date range (e.g., "This Month")
2. Keep "All Agents" selected
3. The table shows agent names - sort by count
4. Or export CSV and analyze in Excel with pivot tables

</details>

<details>
<summary><strong>How do I generate a weekly team report?</strong></summary>

1. Select "Last 7 Days" from date range
2. Keep "All Agents" selected
3. Add any other filters (campaign, direction)
4. Click "Export CSV"
5. Share CSV with team or leadership

</details>

<details>
<summary><strong>How do I track a specific campaign's performance?</strong></summary>

1. Select the campaign from dropdown
2. Set date range to campaign duration
3. View completion rates in Status column
4. Export CSV for detailed analysis
5. Calculate conversion rates in spreadsheet

</details>

<details>
<summary><strong>How do I monitor an agent's performance?</strong></summary>

1. Select agent from Agent dropdown
2. Set date range (e.g., "Last 30 Days")
3. Review metrics:
   - Call volume
   - Completion rates
   - Average duration
4. Export for performance review documentation

</details>

:::tip Manager Best Practice
Set up a weekly routine: Every Monday morning, export last week's call history filtered by your department. Track trends month-over-month to identify coaching opportunities and celebrate successes.
:::

:::warning Privacy Note
Managers can only access calls from agents in their assigned department(s). To view calls from other departments, contact your admin to adjust department assignments.
:::

---

  </TabItem>
  <TabItem value="admin" label="🔧 Admin View">

## Admin View

### System-Wide Access

**Admins have complete visibility** into all call activity across the entire organization. You can:

- View calls from all agents
- Access all departments
- See all campaigns
- Export complete datasets
- Analyze system-wide metrics

### Advanced Admin Features

#### Full Agent Access

Unlike managers (who see only their department), admins see **all agents** in the agent dropdown:

- All departments
- All roles
- Complete agent roster

**Use Cases:**
- Cross-department analysis
- Organization-wide reporting
- Agent comparison across teams
- System utilization metrics

#### Campaign Analysis

**Complete Campaign Visibility:**
- All active campaigns
- Historical campaigns
- Cross-department campaigns
- System-wide campaign metrics

**Campaign ROI Analysis:**
1. Select campaign
2. Set date range to campaign duration
3. Export CSV
4. Calculate:
   - Total calls made
   - Completion rate
   - Average call duration
   - Total cost (price column)
   - Cost per completed call

#### Bulk Operations

**System-Wide Exports:**

Filter and export large datasets:
- All calls from specific month
- All agent activity
- All campaign results
- Complete audit trails

**Example: Monthly System Report**
```
Date Range: Last Month
Agent: All Agents
Campaign: All Campaigns
Export CSV → 50,000+ records
```

#### Status-Based Filtering

**System Health Monitoring:**

Track call failures across the system:
1. Filter: Last 7 Days
2. Status: Failed
3. Review patterns:
   - Specific agents struggling?
   - System-wide issues?
   - Campaign configuration problems?

**Quality Assurance:**
1. Filter: Completed calls
2. Sort by duration
3. Identify outliers (too short/too long)
4. Flag for call recording review

### Admin Reporting Workflows

#### Daily System Health Check

**Morning Routine:**
1. Filter: Yesterday
2. Agent: All Agents
3. Review:
   - Total call volume
   - Failure rates
   - System performance issues
4. Export for records

#### Weekly Executive Report

**Every Monday:**
1. Filter: Last 7 Days
2. Export complete dataset
3. Analyze in Excel:
   - Calls per agent
   - Department performance
   - Campaign effectiveness
   - Cost analysis

#### Monthly Business Intelligence

**End of Month:**
1. Filter: This Month
2. Export full dataset
3. Create executive dashboard:
   - Total calls handled
   - Average handle time
   - Cost per call
   - Agent productivity trends
   - Campaign ROI

### Configuration & Setup

#### System Settings

**Admin-Only Configuration:**
- Twilio webhook URLs
- Call recording settings
- Data retention policies
- Export permissions

:::info Admin Access Required
Some features in Call History require admin permissions:
- View all departments
- Access historical data beyond 90 days
- Configure system-wide settings
- Manage data retention
:::

### Troubleshooting

#### Missing Calls

**Diagnosis Steps:**
1. Check Twilio webhook configuration
2. Review Laravel logs: `storage/logs/laravel.log`
3. Verify database tables:
   ```bash
   SELECT COUNT(*) FROM call_histories;
   SELECT COUNT(*) FROM twilio_call_logs;
   ```
4. Test webhook endpoints

#### Performance Issues

**Large Dataset Optimization:**
1. Use specific date ranges (avoid "All Time")
2. Filter by department or agent first
3. Export in smaller chunks
4. Consider archiving old data

#### Role-Based Access Issues

**Agent Can't See Calls:**
1. Verify user role in database
2. Check department assignments
3. Review role permissions
4. Check queue assignments for inbound calls

:::warning Data Security
Admins have access to all call data. Handle exports with care:
- Don't share raw CSV files publicly
- Redact sensitive information before distribution
- Follow company data protection policies
- Use secure channels for file sharing
:::

---

  </TabItem>
  <TabItem value="developer" label="💻 Developer Guide">

## Developer Guide

### API Overview

The Call History API provides programmatic access to call records with role-based filtering, pagination, and export capabilities.

**Base URL:** `https://your-domain.com/api`

**Authentication:** Sanctum Bearer Token

### Endpoints

#### Get Call History (Paginated)

```http
GET /api/call-history
```

**Headers:**
```http
Authorization: Bearer YOUR_ACCESS_TOKEN
Content-Type: application/json
```

**Query Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | integer | 1 | Page number |
| `per_page` | integer | 20 | Records per page (max: 100) |
| `from_date` | date | - | Filter start date (YYYY-MM-DD) |
| `to_date` | date | - | Filter end date (YYYY-MM-DD) |
| `agent_id` | integer | - | Filter by agent ID |
| `campaign_id` | integer | - | Filter by campaign ID |
| `direction` | string | - | Filter by direction (`inbound` or `outbound`) |
| `status` | string | - | Filter by status |
| `search` | string | - | Search phone numbers, names, campaigns |

**Example Request (cURL):**
```bash
curl -X GET "https://your-domain.com/api/call-history?page=1&per_page=20&from_date=2025-10-01&direction=inbound" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json"
```

**Example Request (JavaScript):**
```javascript
const response = await fetch('https://your-domain.com/api/call-history?page=1&per_page=20', {
  headers: {
    'Authorization': 'Bearer YOUR_ACCESS_TOKEN',
    'Content-Type': 'application/json'
  }
});

const data = await response.json();
console.log(data);
```

**Example Request (PHP):**
```php
<?php
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'https://your-domain.com/api/call-history?page=1&per_page=20');
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer YOUR_ACCESS_TOKEN',
    'Content-Type: application/json'
]);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($ch);
$data = json_decode($response, true);
curl_close($ch);
?>
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "call_sid": "CA6f56fcd0474068eaf4b9d4db40d01144",
      "caller_number": "+15109309015",
      "my_number": "+16282373889",
      "contact_name": null,
      "agent_id": 4,
      "agent_name": "Agent User",
      "campaign_id": null,
      "campaign_name": null,
      "direction": "inbound",
      "status": "completed",
      "duration": 98,
      "created_at": "2025-10-09 13:38:02",
      "price": null,
      "source": "call_history"
    }
  ],
  "current_page": "1",
  "per_page": "20",
  "total": 1,
  "last_page": 1,
  "message": "Call history retrieved successfully"
}
```

#### Get Single Call Record

```http
GET /api/call-history/{id}?source={source}
```

**Path Parameters:**
- `id` - The call record ID

**Query Parameters:**
- `source` - Data source: `twilio_call_log` or `call_history`

**Example Request:**
```bash
curl -X GET "https://your-domain.com/api/call-history/123?source=call_history" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

#### Export Call History (CSV)

```http
GET /api/call-history/export/csv
```

**Query Parameters:** Same as list endpoint

**Response:** CSV file download

**CSV Headers:**
```
Date/Time, Caller, My Number, Agent, Campaign, Direction, Status, Duration, Price
```

**Example Request:**
```bash
curl -X GET "https://your-domain.com/api/call-history/export/csv?from_date=2025-10-01&to_date=2025-10-31" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  --output calls.csv
```

### Role-Based Scoping

The API automatically filters results based on the authenticated user's role:

| Role | Access Level |
|------|-------------|
| **Agent** | Only their own calls |
| **Department Manager** | Calls from agents in their department(s) |
| **Account Admin** | All calls in their tenant |
| **Super Admin** | All calls across all tenants |

**Implementation:**
```php
// Automatic scoping in controller
switch ($user->role) {
    case 'agent':
        $query->where('agent_id', $user->id);
        break;
    case 'dept_manager':
        $agentIds = $this->getDepartmentAgentIds($user);
        $query->whereIn('agent_id', $agentIds);
        break;
    // ... etc
}
```

### Data Architecture

#### Data Sources

The API merges data from two database tables:

1. **`twilio_call_logs`** - Manual dialer and campaign calls
   - Direction: Outbound
   - Contains: Campaign data, contact info, pricing

2. **`call_histories`** - Inbound queue calls
   - Direction: Inbound
   - Contains: Queue data, agent assignments, call duration

#### Union Query

Both tables are queried and merged using SQL UNION:

```php
$twilioQuery = TwilioCallLog::select([
    'id',
    'call_sid',
    'to_number as caller_number',
    'from_number as my_number',
    // ... more fields
    DB::raw("'twilio_call_log' as source")
]);

$callHistoryQuery = CallHistory::select([
    'id',
    'dial_call_sid as call_sid',
    'caller_number',
    'my_number',
    // ... more fields
    DB::raw("'call_history' as source")
]);

$unionQuery = $twilioQuery->union($callHistoryQuery);
```

#### Database Schema

**call_histories table:**
```sql
CREATE TABLE call_histories (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NOT NULL,
    agent_id BIGINT UNSIGNED,
    my_number VARCHAR(255) NOT NULL,
    caller_number VARCHAR(255) NOT NULL,
    dial_call_sid VARCHAR(255),
    campaign_id BIGINT UNSIGNED,
    pick_up_time TIMESTAMP NOT NULL,
    hang_up_time TIMESTAMP NOT NULL,
    status VARCHAR(255) NOT NULL,
    record_file VARCHAR(255),
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    INDEX idx_user_id (user_id),
    INDEX idx_pick_up_time (pick_up_time)
);
```

**twilio_call_logs table:**
```sql
CREATE TABLE twilio_call_logs (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    campaign_id BIGINT UNSIGNED,
    contact_id BIGINT UNSIGNED,
    agent_id BIGINT UNSIGNED,
    call_sid VARCHAR(255) NOT NULL UNIQUE,
    from_number VARCHAR(255) NOT NULL,
    to_number VARCHAR(255) NOT NULL,
    status VARCHAR(255) NOT NULL,
    direction VARCHAR(255) NOT NULL,
    duration INTEGER,
    start_time TIMESTAMP,
    end_time TIMESTAMP,
    price DECIMAL(10,4),
    recording_url TEXT,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    INDEX idx_agent_id (agent_id),
    INDEX idx_start_time (start_time)
);
```

### Backend Implementation

#### Controller Structure

**Location:** `/backend/app/Http/Controllers/Api/CallHistoryController.php`

**Key Methods:**

**index()** - Get paginated call history
```php
public function index(Request $request)
{
    $user = auth()->user();

    // Build queries for both tables
    $twilioQuery = TwilioCallLog::select([...]);
    $callHistoryQuery = CallHistory::select([...]);

    // Apply role-based scoping
    $this->applyScopingToQueries($twilioQuery, $callHistoryQuery, $user);

    // Apply filters
    $this->applyFilters($twilioQuery, $callHistoryQuery, $request);

    // Union and paginate
    $unionQuery = $twilioQuery->union($callHistoryQuery);
    $calls = DB::table(DB::raw("({$unionQuery->toSql()}) as calls"))
        ->mergeBindings($unionQuery->getQuery())
        ->orderBy('created_at', 'desc')
        ->paginate($perPage);

    return response()->json([
        'success' => true,
        'data' => $calls->items(),
        'current_page' => (string) $calls->currentPage(),
        'per_page' => (string) $calls->perPage(),
        'total' => $calls->total(),
        'last_page' => $calls->lastPage(),
        'message' => 'Call history retrieved successfully'
    ]);
}
```

**applyScopingToQueries()** - Role-based filtering
```php
private function applyScopingToQueries($twilioQuery, $callHistoryQuery, $user)
{
    switch ($user->role) {
        case 'agent':
            $twilioQuery->where('agent_id', $user->id);
            $callHistoryQuery->where('user_id', $user->id);
            break;

        case 'dept_manager':
            $agentIds = DB::table('department_agents')
                ->join('departments', 'departments.id', '=', 'department_agents.department_id')
                ->where('departments.customer_id', $user->customer_id)
                ->pluck('department_agents.agent_id');
            $twilioQuery->whereIn('agent_id', $agentIds);
            $callHistoryQuery->whereIn('user_id', $agentIds);
            break;

        case 'account_admin':
            $twilioQuery->where('customer_id', $user->customer_id);
            $callHistoryQuery->whereHas('user', function($q) use ($user) {
                $q->where('customer_id', $user->customer_id);
            });
            break;

        case 'super_admin':
            // No restrictions
            break;
    }
}
```

**applyFilters()** - Query filtering
```php
private function applyFilters($twilioQuery, $callHistoryQuery, $request)
{
    // Date range
    if ($request->has('from_date')) {
        $twilioQuery->whereDate('start_time', '>=', $request->from_date);
        $callHistoryQuery->whereDate('pick_up_time', '>=', $request->from_date);
    }

    if ($request->has('to_date')) {
        $twilioQuery->whereDate('start_time', '<=', $request->to_date);
        $callHistoryQuery->whereDate('pick_up_time', '<=', $request->to_date);
    }

    // Agent filter
    if ($request->has('agent_id')) {
        $twilioQuery->where('agent_id', $request->agent_id);
        $callHistoryQuery->where('user_id', $request->agent_id);
    }

    // Campaign filter
    if ($request->has('campaign_id')) {
        $twilioQuery->where('campaign_id', $request->campaign_id);
        $callHistoryQuery->where('campaign_id', $request->campaign_id);
    }

    // Direction filter
    if ($request->has('direction')) {
        $twilioQuery->where('direction', $request->direction);
        if ($request->direction === 'inbound') {
            // Only call_histories has inbound calls
            $twilioQuery->whereRaw('1 = 0'); // Exclude all
        }
    }

    // Status filter
    if ($request->has('status')) {
        $twilioQuery->where('status', $request->status);
        $callHistoryQuery->where('status', $request->status);
    }

    // Search
    if ($request->has('search')) {
        $search = $request->search;
        $twilioQuery->where(function($q) use ($search) {
            $q->where('to_number', 'like', "%{$search}%")
              ->orWhere('from_number', 'like', "%{$search}%");
        });
        $callHistoryQuery->where(function($q) use ($search) {
            $q->where('caller_number', 'like', "%{$search}%")
              ->orWhere('my_number', 'like', "%{$search}%");
        });
    }
}
```

### Webhook Integration

#### Inbound Queue Call Completion

**Endpoint:** `POST /api/twilio/agent-call-complete`

**Triggered by:** Twilio when agent ends queue call

**Handler:** `TwilioWebhookController::handleAgentCallComplete()`

```php
public function handleAgentCallComplete(Request $request)
{
    $callSid = $request->input('CallSid'); // Agent's WebRTC call
    $dequeuedCallSid = $request->input('DequeuedCallSid'); // Caller's SID
    $dequeuedCallDuration = $request->input('DequeuedCallDuration', 0);

    // CRITICAL: Find queue entry by caller's SID (NOT agent's SID)
    $queueEntry = QueueList::where('call_sid', $dequeuedCallSid)->first();

    if ($queueEntry && $queueEntry->user_id) {
        $callHistory = CallHistory::create([
            'user_id' => $queueEntry->user_id,
            'agent_id' => $queueEntry->user_id,
            'my_number' => $queueEntry->my_number,
            'caller_number' => $queueEntry->caller_number,
            'dial_call_sid' => $dequeuedCallSid, // Use caller's SID
            'pick_up_time' => $queueEntry->answered_at ?? $queueEntry->created_at,
            'hang_up_time' => now(),
            'status' => 'completed',
            'record_file' => null,
        ]);

        Log::info('Call history saved for queue call', [
            'HistoryId' => $callHistory->id,
            'AgentId' => $queueEntry->user_id,
            'CallerSID' => $dequeuedCallSid
        ]);
    }

    return response('<Response></Response>', 200)
        ->header('Content-Type', 'application/xml');
}
```

**Critical Implementation Notes:**
- ✅ Use `DequeuedCallSid` (caller's SID) not `CallSid` (agent's WebRTC SID)
- ✅ Link to queue entry via caller's SID
- ✅ Calculate duration from pickup to hangup times
- ✅ Log successful saves for debugging

### Frontend Integration

#### React Query Setup

```typescript
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/teleman-api';

// Fetch call history
const { data, isLoading, error } = useQuery({
  queryKey: ['callHistory', page, perPage, filters],
  queryFn: () => api.getCallHistory({
    page,
    per_page: perPage,
    from_date: filters.fromDate,
    to_date: filters.toDate,
    agent_id: filters.agentId,
    campaign_id: filters.campaignId,
    direction: filters.direction,
    status: filters.status,
    search: filters.search,
  }),
  staleTime: 5 * 60 * 1000, // 5 minutes
});
```

#### API Client Implementation

**Location:** `/frontend/src/lib/teleman-api.ts`

```typescript
async getCallHistory(params: {
  page?: number;
  per_page?: number;
  from_date?: string;
  to_date?: string;
  agent_id?: string;
  campaign_id?: string;
  direction?: string;
  status?: string;
  search?: string;
}): Promise<CallHistoryListResponse> {
  const queryParams = new URLSearchParams(
    Object.entries(params)
      .filter(([_, value]) => value !== '' && value !== undefined)
      .map(([key, value]) => [key, String(value)])
  ).toString();

  const response = await this.client.get(`/api/call-history?${queryParams}`);
  return response.data;
}

async exportCallHistory(params: any): Promise<void> {
  const queryParams = new URLSearchParams(
    Object.entries(params)
      .filter(([_, value]) => value !== '' && value !== undefined)
      .map(([key, value]) => [key, String(value)])
  ).toString();

  const exportUrl = `${this.baseURL}/api/call-history/export/csv?${queryParams}`;
  window.open(exportUrl, '_blank');
}
```

**CRITICAL:** Use `/api/` prefix in all endpoints. The axios baseURL is `http://localhost:8090` without `/api/`, so paths must include it.

#### TypeScript Definitions

**Location:** `/frontend/src/lib/types.ts`

```typescript
export interface CallHistoryItem {
  id: number;
  call_sid: string;
  caller_number?: string;  // Optional - can be undefined
  my_number?: string;      // Optional - can be undefined
  contact_name: string | null;
  agent_id: number | null;
  agent_name: string | null;
  campaign_id: number | null;
  campaign_name: string | null;
  direction: 'inbound' | 'outbound';
  status: string;
  duration: number;
  created_at?: string;     // Optional - can be undefined
  price: number | null;
  source: 'twilio_call_log' | 'call_history';
}

export interface CallHistoryListResponse {
  success: boolean;
  data: CallHistoryItem[];
  current_page: string;
  per_page: string;
  total: number;
  last_page: number;
  message: string;
}
```

**IMPORTANT:** Mark fields as optional (`?`) if they can be undefined in practice.

### Setup & Configuration

#### Backend Setup

1. **Run Migrations:**
```bash
cd backend
php artisan migrate
```

2. **Configure Environment:**
```env
# .env
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=your_twilio_number
```

3. **Configure Twilio Webhooks:**

In Twilio Console:
- **Voice URL:** `https://your-domain.com/api/twilio/inbound`
- **Status Callback:** `https://your-domain.com/api/twilio/status`
- **TwiML App Voice URL:** `https://your-domain.com/api/twilio/agent-dial-queue`

4. **Update CORS:**
```php
// config/cors.php
'paths' => ['api/*', 'sanctum/csrf-cookie'],
```

5. **Add Routes:**
```php
// routes/api.php
Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/call-history', [CallHistoryController::class, 'index']);
    Route::get('/call-history/{id}', [CallHistoryController::class, 'show']);
    Route::get('/call-history/export/csv', [CallHistoryController::class, 'exportCsv']);
});
```

#### Frontend Setup

1. **Install Dependencies:**
```bash
cd frontend
npm install date-fns @tanstack/react-query
```

2. **Configure Environment:**
```env
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:8090
```

3. **Add Navigation:**
```tsx
// src/components/navigation.tsx
{
  name: 'Call History',
  href: '/dashboard/call-history',
  icon: ClockIcon,
  roles: ['agent', 'dept_manager', 'account_admin', 'super_admin']
}
```

### Performance Optimization

#### Database Indexing

**Recommended indexes:**
```sql
-- call_histories
CREATE INDEX idx_call_histories_user_id ON call_histories(user_id);
CREATE INDEX idx_call_histories_pick_up_time ON call_histories(pick_up_time);
CREATE INDEX idx_call_histories_status ON call_histories(status);

-- twilio_call_logs
CREATE INDEX idx_twilio_call_logs_agent_id ON twilio_call_logs(agent_id);
CREATE INDEX idx_twilio_call_logs_start_time ON twilio_call_logs(start_time);
CREATE INDEX idx_twilio_call_logs_campaign_id ON twilio_call_logs(campaign_id);
```

#### Query Optimization

**Pagination limits:**
- Default: 20 records per page
- Maximum: 100 records per page
- Large exports: Use CSV endpoint

**React Query caching:**
```typescript
staleTime: 5 * 60 * 1000, // 5 minutes
cacheTime: 10 * 60 * 1000, // 10 minutes
```

**Debounced search:**
```typescript
const debouncedSearch = useMemo(
  () => debounce((value: string) => {
    setFilters({...filters, search: value});
  }, 300),
  [filters]
);
```

### Troubleshooting

#### Common Issues

**1. Date Parsing Errors (Safari)**

**Symptom:** "Invalid Date" or "RangeError: Invalid time value"

**Cause:** Safari requires ISO 8601 format

**Fix:**
```typescript
// Convert "YYYY-MM-DD HH:MM:SS" to ISO
const dateStr = call.created_at.replace(' ', 'T');
const date = new Date(dateStr);
```

**2. 403 Forbidden on /api/agents**

**Symptom:** Console shows 403 error

**Cause:** Agents cannot view agent list

**Fix:** Conditional loading
```typescript
const { data: agents } = useQuery({
  queryKey: ['agents'],
  queryFn: () => api.getAgents(),
  enabled: ['dept_manager', 'account_admin'].includes(user.role)
});
```

**3. Calls Not Saving from Queue**

**Symptom:** Queue calls complete but don't appear

**Debug:**
```bash
# Check webhook logs
tail -f storage/logs/laravel.log | grep "handleAgentCallComplete"

# Check database
sqlite3 database.sqlite "SELECT * FROM call_histories ORDER BY id DESC LIMIT 5;"
```

**Fix:** Verify webhook URL is correct and using `DequeuedCallSid`

**4. SQLite vs MySQL Compatibility**

**Symptom:** `SQLSTATE[HY000]: General error: 1 no such column`

**Cause:** Database-specific functions

**Fix:**
```php
// MySQL
DB::raw('TIMESTAMPDIFF(SECOND, pick_up_time, hang_up_time) as duration')

// SQLite
DB::raw('(strftime("%s", hang_up_time) - strftime("%s", pick_up_time)) as duration')
```

### Testing

#### API Testing (cURL)

```bash
# Get call history
curl -H "Authorization: Bearer YOUR_TOKEN" \
  "http://localhost:8090/api/call-history?page=1&per_page=20"

# Get with filters
curl -H "Authorization: Bearer YOUR_TOKEN" \
  "http://localhost:8090/api/call-history?from_date=2025-10-01&direction=inbound"

# Export CSV
curl -H "Authorization: Bearer YOUR_TOKEN" \
  "http://localhost:8090/api/call-history/export/csv?from_date=2025-10-01" \
  --output calls.csv
```

#### Manual Testing Checklist

**As Agent:**
- [ ] Login as agent
- [ ] Make inbound queue call
- [ ] Accept and complete call
- [ ] Verify call appears in history
- [ ] Verify only own calls visible
- [ ] Test date filters
- [ ] Test search
- [ ] Export CSV

**As Manager:**
- [ ] Login as manager
- [ ] Verify sees agent calls
- [ ] Test agent filter dropdown
- [ ] Test export CSV
- [ ] Verify role-based scoping

**As Admin:**
- [ ] Login as admin
- [ ] Verify sees all calls
- [ ] Test all filters
- [ ] Verify pagination
- [ ] Test bulk export

### Support & Resources

**File Locations:**
- Controller: `/backend/app/Http/Controllers/Api/CallHistoryController.php`
- Webhook: `/backend/app/Http/Controllers/TwilioWebhookController.php`
- Routes: `/backend/routes/api.php`
- Frontend Page: `/frontend/src/app/dashboard/call-history/page.tsx`
- API Client: `/frontend/src/lib/teleman-api.ts`

**Related Documentation:**
- [Inbound Queue System](/voice/inbound/overview)
- [API Authentication](/developers/api-reference)
- [Role-Based Access Control](/developers/api-reference#authentication)

---

  </TabItem>
</Tabs>

---

## Related Documentation

- [Inbound Queue System](/voice/inbound/overview) - Learn about inbound call routing
- [Manual Dialer](/voice/outbound/dialer/admin/webrtc-setup) - Outbound calling setup
- [Campaigns](/voice/outbound/campaigns/manager/creating-campaigns) - Campaign management
- [API Reference](/developers/api-reference) - Complete API documentation

## Need Help?

- 💬 **Support:** [Contact Support](https://dutycall.com/support)
- 📖 **Docs:** [Documentation Home](/)
- 🐛 **Bug Reports:** [GitHub Issues](https://github.com/dutycall/dutycall/issues)
