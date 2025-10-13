---
id: creating-campaigns
title: Creating & Managing Campaigns
sidebar_label: Creating Campaigns
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Creating & Managing Campaigns

:::info Manager+ Only
Campaign creation and management is available to **Department Managers** and **Administrators** only.
:::

## Overview

Campaigns enable automated bulk calling to contact lists with sophisticated call flow management, retry logic, and real-time monitoring. Configure once and let the system dial through your contact list automatically.

**Key Features:**
- 🤖 **Automated Dialing** - System calls contacts automatically
- 📊 **Real-Time Monitoring** - Track progress as campaign runs
- 🔄 **Smart Retry Logic** - Auto-retry failed calls with custom rules
- 🗓️ **Scheduling** - Run campaigns at specific times or recurring patterns
- 🎙️ **Flexible Audio** - Use Text-to-Speech (TTS) or upload audio files
- 📈 **Analytics Integration** - Full reporting in Analytics Dashboard

---

<Tabs groupId="user-role">
<TabItem value="manager" label="👥 Manager" default>

## For Managers: Campaign Creation & Management

### Campaign Creation Workflow

**Step 1: Create New Campaign**
1. Navigate to **Outbound** → **Campaigns**
2. Click **"Create Campaign"** button
3. Enter campaign details:
   - **Name**: Descriptive campaign name (e.g., "Q4 Customer Satisfaction Survey")
   - **Description**: Purpose and goals
   - **Department**: Select your department (auto-populated)

**Step 2: Import/Add Contacts**

Choose one of three methods:

**Option A: Import from Google Sheets**
1. Click **"Import from Google Sheets"**
2. Paste public share URL
3. Map columns to contact fields
4. Validate and import

**Learn more:** [Google Sheets Import](/administration/data-management/data-import/google-sheets)

**Option B: Upload CSV File**
1. Click **"Upload CSV"**
2. Select file from computer
3. Map columns to fields
4. Import contacts

**Option C: Select Existing Contacts**
1. Click **"Add from Contacts"**
2. Filter and select contacts
3. Add to campaign

**Learn more:** [Contact Management](/voice/outbound/campaigns/manager/contact-management)

**Step 3: Configure Call Settings**

**Call Flow Options:**

**Text-to-Speech (TTS):**
- Type message to be spoken
- Select voice (male/female, language)
- Adjust speed and pitch
- Preview before saving

**Audio File Upload:**
- Upload MP3/WAV file (max 10MB)
- Preview uploaded audio
- Must include clear instructions for customer

**Call Routing:**
- **Route to Agents**: Answered calls connect to available agents
- **Play & Hangup**: Play message then disconnect (announcement only)

**Step 4: Set Retry Logic**

Configure how the system handles failed calls:

**Retry Settings:**
- **Max Attempts**: Number of retry attempts (1-5)
- **Retry Delay**: Time between retries (15min - 24hrs)
- **Retry Conditions**: When to retry
  - ☑️ No Answer
  - ☑️ Busy
  - ☑️ Failed (network errors)
  - ☐ Voicemail (optional)

**Example Retry Logic:**
```
Attempt 1: Immediate
Attempt 2: Wait 1 hour → Retry if No Answer or Busy
Attempt 3: Wait 4 hours → Retry if No Answer or Busy
Max 3 attempts, then mark as Failed
```

**Step 5: Schedule Campaign**

**Run Immediately:**
- Click **"Start Now"**
- Campaign begins dialing within 1 minute

**Schedule for Later:**
1. Select **"Schedule"** tab
2. Choose start date/time
3. Set timezone (defaults to organization timezone)
4. Click **"Schedule Campaign"**

**Recurring Campaigns:**
1. Toggle **"Recurring"** → ON
2. Select pattern:
   - Daily (every N days)
   - Weekly (select days of week)
   - Monthly (select day of month)
3. Set end date or max occurrences
4. Click **"Schedule Recurring Campaign"**

**Learn more:** [Campaign Scheduling](#campaign-scheduling-details)

**Step 6: Review & Launch**
1. Review campaign summary (contacts, settings, schedule)
2. Click **"Confirm & Launch"** or **"Confirm & Schedule"**
3. Campaign status changes to **Active** or **Scheduled**

### Managing Active Campaigns

**Campaign Status:**
- **Draft**: Not yet launched
- **Scheduled**: Waiting for start time
- **Active**: Currently dialing contacts
- **Paused**: Manually paused by user
- **Completed**: All contacts processed
- **Failed**: System error occurred

**Campaign Actions:**

**Pause Campaign:**
1. Find campaign in Active Campaigns list
2. Click **"⏸ Pause"** button
3. Dialing stops immediately
4. Can resume later

**Resume Campaign:**
1. Find paused campaign
2. Click **"▶ Resume"** button
3. Dialing resumes from where it stopped

**Stop Campaign:**
1. Click **"⏹ Stop"** button
2. Confirm you want to end campaign
3. Status changes to **Completed**
4. Cannot be restarted (create new campaign instead)

**Edit Campaign (Limited):**
- Can edit **name** and **description** while active
- Cannot edit **contacts** or **call settings** once started
- To change settings: Stop campaign and create new one

### Monitoring Campaign Progress

**Real-Time Dashboard:**
1. Navigate to **Campaigns** → **Active**
2. Click campaign name to view details

**Key Metrics Displayed:**
- **Total Contacts**: Number of contacts in campaign
- **Called**: Number of attempted calls
- **Completed**: Successfully connected calls
- **Failed**: Calls that didn't connect
- **Remaining**: Contacts not yet called
- **Success Rate**: (Completed / Called) × 100

**Progress Visualization:**
- Progress bar showing completion %
- Real-time call counter (updates every 5 seconds)
- Estimated time to completion

**Call Outcome Breakdown:**
- ✅ Answered & Connected
- ❌ No Answer
- 📵 Busy
- ⚠️ Failed (network error)
- 🔁 Retrying (in retry queue)

### Best Practices for Campaigns

**Contact List Quality:**
- ✅ Verify phone numbers before import
- ✅ Use E.164 format (+1XXXXXXXXXX)
- ✅ Remove duplicates
- ✅ Segment by customer type or region

**Timing & Scheduling:**
- ✅ Call during business hours (9am-5pm local time)
- ✅ Avoid Sundays and major holidays
- ✅ Consider timezone differences
- ✅ Space out retry attempts (min 1 hour)

**Call Volume Management:**
- ✅ Start with small test campaign (50-100 contacts)
- ✅ Monitor success rate before scaling
- ✅ Limit concurrent calls to match agent capacity
- ✅ Schedule long campaigns during off-peak hours

**Content & Messaging:**
- ✅ Keep TTS messages under 30 seconds
- ✅ Include clear call-to-action
- ✅ State company name and purpose upfront
- ✅ Provide opt-out instructions if required

**Compliance:**
- ✅ Honor Do Not Call lists
- ✅ Include recording consent if recording calls
- ✅ Comply with TCPA regulations (if US-based)
- ✅ Maintain call records per legal requirements

### Viewing Campaign Results

**After Campaign Completes:**
1. Navigate to **Campaigns** → **Completed**
2. Click campaign name
3. View final statistics and outcomes

**Export Campaign Data:**
1. Click **"Export Results"** button
2. Select format (CSV or Excel)
3. Download includes:
   - Contact details
   - Call outcome for each contact
   - Call duration
   - Timestamp
   - Number of attempts
   - Agent who handled (if routed)

**Analyze in Analytics Dashboard:**
1. Navigate to **Analytics** → **Voice** tab
2. Filter by campaign name
3. View detailed metrics and trends

**Learn more:** [Analytics Dashboard](/channels/voice/reports-analytics/analytics-dashboard)

### Troubleshooting Campaigns

**Campaign not starting:**
- ✅ Check campaign status (should be Active, not Draft)
- ✅ Verify contacts were imported successfully
- ✅ Check Twilio configuration in Admin settings
- ✅ Ensure scheduled time has passed (if scheduled)

**Low success rate (&lt;50%):**
- ❌ Poor contact list quality (wrong numbers)
- ❌ Calling outside business hours
- ❌ Message too long or confusing
- ❌ Customers screening unknown numbers

**Calls connecting but agents not receiving:**
- ✅ Check agent availability status
- ✅ Verify queue configuration
- ✅ Ensure agents are logged in and ready
- ✅ Check call routing settings in campaign

**Campaign stuck/not progressing:**
- ✅ Pause and resume campaign
- ✅ Check system status (contact admin)
- ✅ Verify Twilio account has available balance
- ✅ Review error logs in campaign details

### Campaign Scheduling Details

**Timezone Handling:**
- Campaigns run in **organization timezone** by default
- Can specify custom timezone per campaign
- System prevents calling outside 8am-9pm recipient local time (if enabled)

**Recurrence Patterns:**

**Daily:**
- Run every N days (1-30)
- Example: Every 3 days starting Monday

**Weekly:**
- Select specific days of week
- Example: Every Monday, Wednesday, Friday

**Monthly:**
- Select day of month (1-31)
- Example: 1st of every month

**End Conditions:**
- **End Date**: Campaign stops after specific date
- **Max Occurrences**: Run N times then stop
- **Manual Stop**: Run indefinitely until stopped

**Example Recurring Campaign:**
```
Name: Weekly Customer Check-In
Pattern: Every Monday at 9:00 AM
Timezone: America/New_York
Contacts: Import fresh from Google Sheet each run
End: After 12 occurrences (3 months)
```

</TabItem>

<TabItem value="admin" label="🔧 Admin">

## For Admins: Campaign System Configuration

### System-Wide Campaign Settings

**Navigate to:** Administration → Voice Channel Setup → Campaign Settings

**Global Configuration:**
- **Max Concurrent Campaigns**: Limit per organization (default: 10)
- **Max Concurrent Calls**: Twilio API limit (default: 100)
- **Default Retry Attempts**: System-wide default (default: 3)
- **Default Retry Delay**: Time between retries (default: 1 hour)
- **Call Timeout**: Seconds before marking no-answer (default: 30)

### Twilio Configuration for Campaigns

**Required Settings:**
1. **Twilio Account SID** - From Twilio Console
2. **Twilio Auth Token** - From Twilio Console
3. **Twilio Phone Number** - Outbound caller ID
4. **TwiML App SID** - For WebRTC (if routing to agents)
5. **Campaign Webhook URL** - Callback for call events

**Webhook Endpoints:**

**Campaign Initiate:**
```
POST https://yourapp.com/api/voice/campaign/initiate
```
Called when campaign starts a call. Returns TwiML.

**Campaign Status:**
```
POST https://yourapp.com/api/voice/campaign/status
```
Receives call outcome (completed, failed, no-answer, busy).

**Campaign Recording (if enabled):**
```
POST https://yourapp.com/api/voice/campaign/recording
```
Receives recording URL when call ends.

### TwiML Configuration

**Basic Campaign TwiML (Play & Hangup):**
```xml
<Response>
  <Say voice="alice" language="en-US">
    Hello, this is a message from {{COMPANY_NAME}}.
    {{CAMPAIGN_MESSAGE}}
  </Say>
  <Hangup/>
</Response>
```

**Campaign TwiML with Agent Routing:**
```xml
<Response>
  <Say voice="alice">
    Please hold while we connect you to an agent.
  </Say>
  <Enqueue waitUrl="/api/voice/queue/wait-music">
    {{QUEUE_NAME}}
  </Enqueue>
</Response>
```

**Dynamic TwiML (from Database):**
```php
public function campaignTwiML(Request $request)
{
    $campaign = Campaign::findByCampaignSid($request->CallSid);

    if ($campaign->audio_url) {
        // Use uploaded audio file
        return response()->xml([
            'Play' => $campaign->audio_url,
            'Hangup' => null
        ]);
    } else {
        // Use Text-to-Speech
        return response()->xml([
            'Say' => [
                '_attributes' => [
                    'voice' => $campaign->tts_voice,
                    'language' => $campaign->tts_language
                ],
                '_value' => $campaign->tts_message
            ],
            'Hangup' => null
        ]);
    }
}
```

### Campaign Dialing Logic

**Backend Campaign Processor (Laravel Example):**

```php
<?php

namespace App\Services;

use App\Models\Campaign;
use App\Models\CampaignCall;
use Twilio\Rest\Client as TwilioClient;

class CampaignDialer
{
    protected $twilio;

    public function __construct()
    {
        $this->twilio = new TwilioClient(
            config('twilio.account_sid'),
            config('twilio.auth_token')
        );
    }

    /**
     * Process active campaigns and make calls
     */
    public function processCampaigns()
    {
        $activeCampaigns = Campaign::active()->get();

        foreach ($activeCampaigns as $campaign) {
            $this->dialCampaignContacts($campaign);
        }
    }

    /**
     * Dial contacts for a specific campaign
     */
    protected function dialCampaignContacts(Campaign $campaign)
    {
        // Get pending contacts (not yet called or ready for retry)
        $contacts = $campaign->contacts()
            ->where(function($q) {
                $q->whereNull('last_call_attempt')
                  ->orWhere('retry_at', '<=', now());
            })
            ->limit(100) // Batch size
            ->get();

        foreach ($contacts as $contact) {
            $this->makeCall($campaign, $contact);
        }
    }

    /**
     * Make individual call via Twilio API
     */
    protected function makeCall(Campaign $campaign, Contact $contact)
    {
        try {
            $call = $this->twilio->calls->create(
                $contact->phone, // To
                $campaign->twilio_number, // From
                [
                    'url' => route('voice.campaign.twiml', ['campaign' => $campaign->id]),
                    'statusCallback' => route('voice.campaign.status'),
                    'statusCallbackEvent' => ['completed', 'failed', 'no-answer', 'busy'],
                    'timeout' => $campaign->call_timeout ?? 30,
                ]
            );

            // Log call attempt
            CampaignCall::create([
                'campaign_id' => $campaign->id,
                'contact_id' => $contact->id,
                'call_sid' => $call->sid,
                'status' => 'initiated',
                'attempt_number' => $contact->call_attempts + 1
            ]);

        } catch (\Exception $e) {
            // Log error and schedule retry if applicable
            $this->handleCallError($campaign, $contact, $e);
        }
    }

    /**
     * Handle call outcome from Twilio webhook
     */
    public function handleCallStatus(Request $request)
    {
        $callLog = CampaignCall::where('call_sid', $request->CallSid)->first();

        $callLog->update([
            'status' => $request->CallStatus,
            'duration' => $request->CallDuration ?? 0,
            'completed_at' => now()
        ]);

        // Schedule retry if applicable
        if ($this->shouldRetry($callLog)) {
            $this->scheduleRetry($callLog);
        }
    }

    /**
     * Determine if call should be retried
     */
    protected function shouldRetry(CampaignCall $call): bool
    {
        $campaign = $call->campaign;
        $contact = $call->contact;

        // Check max attempts not exceeded
        if ($contact->call_attempts >= $campaign->max_retry_attempts) {
            return false;
        }

        // Check if status qualifies for retry
        $retryStatuses = $campaign->retry_conditions ?? ['no-answer', 'busy', 'failed'];
        return in_array($call->status, $retryStatuses);
    }

    /**
     * Schedule contact for retry
     */
    protected function scheduleRetry(CampaignCall $call)
    {
        $campaign = $call->campaign;
        $retryDelay = $campaign->retry_delay ?? 3600; // Default 1 hour

        $call->contact->update([
            'retry_at' => now()->addSeconds($retryDelay),
            'call_attempts' => $call->contact->call_attempts + 1
        ]);
    }
}
```

**Scheduled Task (Laravel Scheduler):**
```php
// In app/Console/Kernel.php
protected function schedule(Schedule $schedule)
{
    // Process campaigns every minute
    $schedule->call(function () {
        app(CampaignDialer::class)->processCampaigns();
    })->everyMinute();
}
```

### Monitoring & Performance

**System Health Checks:**
1. Navigate to **Administration** → **System Health** → **Campaigns**
2. Monitor:
   - Active campaigns count
   - Calls in progress
   - Twilio API latency
   - Error rate
   - Queue depth (pending calls)

**Performance Metrics:**
- **API Latency**: Twilio API response time (target: &lt;200ms)
- **Success Rate**: % of calls that connect (target: &gt;70%)
- **Error Rate**: % of failed API calls (target: &lt;5%)
- **Processing Speed**: Calls per minute

**Scaling Considerations:**
- **Horizontal Scaling**: Use queue workers for campaign processing
- **Rate Limiting**: Respect Twilio API rate limits (varies by account)
- **Database Optimization**: Index campaign_calls table on status, retry_at

### Compliance & Legal

**Call Recording Configuration:**
1. Toggle **"Record Campaign Calls"** → ON
2. Add recording consent to TwiML:
```xml
<Say>This call may be recorded for quality assurance.</Say>
```
3. Set retention period per compliance requirements
4. Configure storage (S3 bucket with encryption)

**TCPA Compliance (US):**
- Maintain internal Do Not Call list
- Check against DNC before dialing
- Provide opt-out mechanism in call flow
- Log consent records for litigation protection

**Data Retention:**
- Call logs: Retain per industry requirements (90 days - 7 years)
- Recordings: Auto-delete after retention period
- Contact lists: Export before deletion if needed

**Learn more:** [Compliance & Retention](/administration/data-management/compliance-retention)

### Troubleshooting Admin Issues

**Campaigns not starting system-wide:**
1. Check Laravel scheduler is running (`php artisan schedule:work`)
2. Verify Twilio credentials are valid
3. Check Twilio account balance
4. Review error logs: `storage/logs/campaign-errors.log`

**High error rate (&gt;10%):**
1. Check Twilio API status: https://status.twilio.com
2. Verify webhook URLs are reachable (test with cURL)
3. Check database connection pool (may be exhausted)
4. Review campaign retry logic (may be too aggressive)

**Audio playback issues:**
1. Verify audio file URLs are publicly accessible
2. Check audio format (MP3/WAV only)
3. Test TTS voice availability in Twilio Console
4. Review TwiML syntax for errors

### Cost Optimization

**Reduce Twilio Costs:**
- Set appropriate call timeout (30s recommended)
- Use TTS instead of audio files when possible (cheaper)
- Limit retry attempts (don't exceed 3)
- Monitor and stop campaigns with high failure rates
- Use Twilio's cheaper Edge Locations if available

**Budget Monitoring:**
1. Set up billing alerts in Twilio Console
2. Track cost per campaign in Analytics
3. Calculate ROI (conversion value vs. call cost)
4. Review monthly Twilio invoice for anomalies

</TabItem>
</Tabs>

---

## Related Documentation

- [Outbound Voice Overview](/voice/outbound/overview)
- [Manual Calling](/voice/outbound/dialer/manager/manual-calling)
- [Contact Management](/voice/outbound/campaigns/manager/contact-management)
- [Google Sheets Import](/administration/data-management/data-import/google-sheets)
- [Analytics Dashboard](/channels/voice/reports-analytics/analytics-dashboard)

## Need Help?

- **Managers**: Contact support for campaign setup assistance
- **Admins**: Check Twilio configuration docs or contact technical support

---

**Quick Links:**
- [📇 Manage Contacts](/voice/outbound/campaigns/manager/contact-management)
- [📊 Import from Google Sheets](/administration/data-management/data-import/google-sheets)
- [📈 View Campaign Analytics](/channels/voice/reports-analytics/analytics-dashboard)
