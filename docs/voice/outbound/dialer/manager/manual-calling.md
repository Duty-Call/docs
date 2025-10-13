---
id: manual-calling
title: Manual Calling
sidebar_label: Manual Calling
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Manual Calling

:::info Who Can Use This
**Agents, Managers, and Admins** can all make manual calls. Agents gained access on **October 8, 2025**.
:::

## Overview

The Manual Dialer enables one-on-one, browser-based calling to individual contacts without requiring campaigns or bulk calling infrastructure. Make personalized calls with full control over timing and recipient.

**Key Features:**
- 🌐 **Browser-based WebRTC calling** - No phone hardware required
- 🎯 **Click-to-call** - Enter number or select from contacts
- 📱 **Floating UI** - Multitask while on call
- 🎛️ **Real-time controls** - Mute, hold, transfer during call
- 📊 **Call logging** - Automatic tracking in Analytics

---

<Tabs groupId="user-role">
<TabItem value="agent" label="👤 Agent" default>

## For Agents: Making Manual Calls

:::tip New Feature (Oct 8, 2025)
Agents can now make manual calls to contacts! Previously this was Manager+ only.
:::

### What You Can Do

- ✅ Make one-on-one calls to contacts via browser
- ✅ Call any valid phone number (with country code)
- ✅ Select contacts from your contact list
- ✅ Use floating dialer while working on other tasks
- ✅ View your own call history in Analytics

### What You Cannot Do

- ❌ Create or manage campaigns (Manager+ only)
- ❌ Import contact lists (Manager+ only)
- ❌ View other agents' call history
- ❌ Configure Twilio settings (Admin only)

### How to Make a Manual Call

**Step 1: Open the Manual Dialer**
1. Click **"Outbound"** in left sidebar
2. Select **"Manual Dialer"**
3. Dialer opens in floating window

**Step 2: Choose Contact Method**

**Option A: Dial by Phone Number**
1. Enter phone number in dialer (include country code: +1XXXXXXXXXX)
2. Click **"Call"**

**Option B: Select from Contacts**
1. Click **"Contacts"** dropdown in dialer
2. Search or browse your contact list
3. Click contact name
4. Click **"Call"**

**Step 3: Manage the Call**

Once connected:
- **Mute/Unmute**: Click microphone icon
- **Hold/Resume**: Click hold icon
- **End Call**: Click red phone icon
- **Add Notes**: Type in notes field (saves automatically)

**Step 4: Complete Wrap-Up**
1. After call ends, dialer shows wrap-up screen
2. Select call outcome (Connected, No Answer, Voicemail, etc.)
3. Add any final notes
4. Click **"Complete"**

### Floating Dialer Features

The dialer UI "floats" above other windows so you can:
- Access customer records while on call
- Look up information in real-time
- Take notes in other systems
- Drag dialer to any screen position

**Minimize/Maximize:**
- Click **minimize** icon to shrink to taskbar
- Click **maximized dialer** to restore full controls

### Daily Use Tips

**Before Your First Call:**
1. Test browser microphone permissions (Settings → Privacy)
2. Use headset for best audio quality
3. Ensure stable internet connection (WiFi or wired)

**During Calls:**
- Use **mute** when listening or looking up info
- Add **notes in real-time** - don't wait until end
- Check **contact details** in separate tab if needed

**After Calls:**
- Complete wrap-up **immediately** (don't batch)
- Select accurate outcome for reporting
- Add context in notes for future reference

### Viewing Your Call History

1. Navigate to **Analytics** in sidebar
2. Click **"Voice"** tab
3. Scroll to **"Call History"** section
4. Filter by date range, outcome, or contact

**What you'll see:**
- Your manual outbound calls
- Your campaign calls (if assigned)
- Your inbound queue calls
- Call duration, outcome, notes

**Learn more:** [Call History & Reports](/channels/voice/reports-analytics/call-history)

### Troubleshooting

**Cannot hear customer:**
1. Check browser microphone permissions
2. Ensure headset/speakers are connected
3. Try different browser (Chrome recommended)

**Customer cannot hear you:**
1. Click unmute icon (check if muted)
2. Grant microphone access in browser
3. Check system audio input settings

**Call won't connect:**
1. Verify phone number includes country code (+1XXXXXXXXXX)
2. Check internet connection stability
3. Contact manager if issue persists

**Dialer not appearing:**
1. Disable browser pop-up blocker for DutyCall
2. Refresh page and try again
3. Clear browser cache if problem continues

</TabItem>

<TabItem value="manager" label="👥 Manager">

## For Managers: Manual Calling & Team Oversight

### What You Can Do

- ✅ Make manual calls to contacts
- ✅ Create and manage contact lists
- ✅ View department agents' call activity
- ✅ Monitor manual call success rates
- ✅ Export call history for reporting

### What You Cannot Do

- ❌ Configure Twilio integration (Admin only)
- ❌ Access other departments' call data
- ❌ Modify system-wide dialer settings (Admin only)

### Making Manual Calls (Manager Workflow)

Managers follow the same calling process as Agents (see Agent tab above), with additional capabilities:

**Additional Manager Features:**
- Access to **all department contacts** (not just own)
- Ability to **create contacts** on-the-fly during calls
- **Bulk import** contacts from Google Sheets for later manual calling
- View **team call analytics** to coach agents

### Managing Contacts for Manual Calling

**Create Contact During Call:**
1. Open Manual Dialer
2. Click **"New Contact"** while entering number
3. Fill contact details (name, email, tags)
4. Click **"Save & Call"**
5. Contact added to database and call initiated

**Import Contacts for Later:**
1. Navigate to **Contacts** section
2. Click **"Import from Google Sheets"**
3. Follow import wizard
4. Contacts available in Manual Dialer dropdown

**Learn more:** [Contact Management](/voice/outbound/campaigns/manager/contact-management) | [Google Sheets Import](/administration/data-management/data-import/google-sheets)

### Monitoring Team Manual Call Activity

**View Team Call History:**
1. Navigate to **Analytics** → **Voice** tab
2. Filter by **"Manual Calls"** and **"Department"**
3. See all agents' manual call activity

**Key Metrics to Monitor:**
- **Success Rate**: % of calls that connected (Target: &gt;80%)
- **Average Duration**: Length of successful calls
- **Call Volume**: Number of manual calls per agent per day
- **Outcomes**: Distribution of Connected/No Answer/Voicemail

**Coaching Opportunities:**
- Low success rate (&lt;60%) → Review call timing and contact quality
- Very short durations (&lt;30s) → Check if agents are rushing
- High "No Answer" rate → Suggest better calling times

### Best Practices for Manual Calling

**For High-Value Prospects:**
- Use manual dialer (not campaigns) for personalized approach
- Research contact before calling
- Take detailed notes during call
- Schedule follow-up immediately after

**For Follow-Up Calls:**
- Reference previous call notes in dialer
- Set specific objectives before dialing
- Update contact status after call

**Team Guidelines:**
1. **Call during business hours** (9am-5pm local time)
2. **3 attempt limit** before moving to campaign or email
3. **Complete wrap-up immediately** (no batching)
4. **Add context in notes** (next steps, customer sentiment)

### Exporting Manual Call Data

1. Navigate to **Analytics** → **Voice** tab
2. Select date range for manual calls
3. Click **"Export"** → **CSV** or **Excel**
4. Use for reporting, compliance, or performance review

**Export includes:**
- Agent name
- Contact details
- Call timestamp
- Duration
- Outcome
- Notes

**Learn more:** [Data Export](/administration/data-management/data-export)

</TabItem>

<TabItem value="admin" label="🔧 Admin">

## For Admins: System Configuration & Troubleshooting

### What You Can Do

- ✅ Configure Twilio integration for manual calling
- ✅ Set up WebRTC voice endpoints
- ✅ Monitor organization-wide manual call usage
- ✅ Troubleshoot browser calling issues
- ✅ Configure call recording and compliance settings

### Twilio Configuration for Manual Dialer

**Required Setup:**
1. Navigate to **Administration** → **Voice Channel Setup**
2. Enter **Twilio Account SID**
3. Enter **Twilio Auth Token**
4. Configure **Twilio Voice Number** (outbound caller ID)
5. Set **TwiML App SID** for WebRTC
6. Click **"Save & Test Configuration"**

**TwiML App Setup:**
```xml
<!-- Required TwiML for Manual Dialer -->
<Response>
  <Dial callerId="{{YOUR_TWILIO_NUMBER}}">
    <Number>{{DESTINATION_PHONE}}</Number>
  </Dial>
</Response>
```

**Webhook Configuration:**
- **Voice URL**: `https://yourapp.com/api/voice/manual/twiml`
- **Status Callback**: `https://yourapp.com/api/voice/manual/status`
- **Method**: POST (both)

### WebRTC Browser Calling Setup

**Twilio Voice SDK Requirements:**
- **Access Token Generation**: Backend must generate Twilio Access Tokens
- **Token Lifetime**: 1 hour (auto-refresh on frontend)
- **Identity**: User's unique ID (e.g., `user_{{user_id}}`)

**Backend Token Generation (Laravel Example):**
```php
use Twilio\Jwt\AccessToken;
use Twilio\Jwt\Grants\VoiceGrant;

public function generateVoiceToken(User $user)
{
    $token = new AccessToken(
        config('twilio.account_sid'),
        config('twilio.api_key'),
        config('twilio.api_secret'),
        3600, // 1 hour
        "user_{$user->id}"
    );

    $voiceGrant = new VoiceGrant();
    $voiceGrant->setOutgoingApplicationSid(config('twilio.twiml_app_sid'));
    $token->addGrant($voiceGrant);

    return $token->toJWT();
}
```

**Frontend Integration (React/TypeScript):**
```typescript
import { Device } from '@twilio/voice-sdk';

// Initialize Twilio Device
const device = new Device(accessToken, {
  codecPreferences: ['opus', 'pcmu'],
  enableRingingState: true,
});

// Make outbound call
const call = await device.connect({
  params: {
    To: '+15551234567',
    contactId: '12345',
  }
});
```

### Monitoring Organization-Wide Usage

**Call Volume Metrics:**
1. Navigate to **Analytics** → **Voice** → **Admin View**
2. Filter by **"Manual Calls"** + **"Organization"**
3. Monitor:
   - Total manual calls per day/week/month
   - Success rates by department
   - Average call duration
   - Peak calling times

**Cost Monitoring:**
- Manual calls use Twilio Voice API ($0.013/min in US)
- Track usage in **Twilio Console** → **Usage** → **Voice**
- Set billing alerts in Twilio account

### Troubleshooting Browser Calling Issues

**Common Issues & Resolutions:**

**Issue: WebRTC not initializing**
- **Cause**: Missing Twilio Access Token or invalid TwiML App SID
- **Fix**: Verify token generation endpoint returns valid JWT
- **Test**: `curl https://yourapp.com/api/voice/token -H "Authorization: Bearer {{token}}"`

**Issue: Calls connect but no audio**
- **Cause**: Browser microphone permissions not granted
- **Fix**: Guide users to browser settings → Privacy → Microphone
- **Chrome**: `chrome://settings/content/microphone`
- **Firefox**: `about:preferences#privacy`

**Issue: Intermittent connection drops**
- **Cause**: Unstable network or firewall blocking WebRTC ports
- **Fix**:
  - Check firewall allows UDP ports 10000-20000
  - Ensure WebSocket connections allowed (wss://)
  - Use wired connection instead of WiFi if possible

**Issue: Echo or audio feedback**
- **Cause**: Speaker output feeding back to microphone
- **Fix**: Require headsets for all users (policy enforcement)

**Debug Mode:**
Enable Twilio SDK debug logging:
```typescript
const device = new Device(token, {
  logLevel: 'debug', // Shows detailed connection logs
});

device.on('error', (error) => {
  console.error('Twilio Device Error:', error);
  // Send to logging service
});
```

### Call Recording & Compliance

**Enable Call Recording:**
1. Navigate to **Administration** → **Voice Channel Setup**
2. Toggle **"Record Manual Calls"** → ON
3. Set retention period (e.g., 90 days)
4. Configure storage location (S3, Twilio Recordings)

**Compliance Considerations:**
- **Consent**: Ensure recording consent announcement (TwiML)
- **Storage**: Encrypt recordings at rest (S3 encryption)
- **Access**: Restrict recording access to Admin+ roles
- **Retention**: Auto-delete per policy (30/60/90 days)

**TwiML with Recording:**
```xml
<Response>
  <Say>This call may be recorded for quality assurance.</Say>
  <Dial record="record-from-answer" recordingStatusCallback="/api/voice/recording-status">
    <Number>{{DESTINATION_PHONE}}</Number>
  </Dial>
</Response>
```

**Learn more:** [Compliance & Retention](/administration/data-management/compliance-retention)

### Security Best Practices

**Access Token Security:**
- Never expose Access Tokens in frontend code
- Rotate Twilio API keys quarterly
- Use short-lived tokens (1 hour max)
- Validate user identity before token generation

**Network Security:**
- Enforce HTTPS for all voice endpoints
- Use WebSocket Secure (wss://) for signaling
- Whitelist Twilio IP ranges if using firewall

**Data Privacy:**
- Log call metadata only (not audio content)
- Anonymize recordings after retention period
- Restrict PII access to authorized roles

### Performance Optimization

**Reduce Latency:**
- Host backend in same AWS region as Twilio Edge location
- Use Twilio Edge Locations closest to users
- Optimize Access Token generation (&lt;100ms response)

**Browser Compatibility:**
- **Recommended**: Chrome 90+, Firefox 88+, Safari 14+
- **Not supported**: IE 11, older mobile browsers
- Test in target browsers before rollout

**Load Testing:**
- Simulate concurrent calls (use Twilio's test credentials)
- Monitor server CPU/memory during peak usage
- Scale backend horizontally if needed (load balancer + multiple servers)

</TabItem>
</Tabs>

---

## Technical Architecture

### Call Flow Diagram

```
1. User clicks "Call" in browser
   ↓
2. Frontend requests Access Token from backend
   ↓
3. Backend generates Twilio Access Token (JWT)
   ↓
4. Frontend initializes Twilio Device with token
   ↓
5. Device connects to Twilio via WebRTC
   ↓
6. Twilio requests TwiML from webhook
   ↓
7. TwiML instructs Twilio to dial destination number
   ↓
8. Call connects via PSTN/SIP
   ↓
9. Audio streams via WebRTC (browser ↔ Twilio)
   ↓
10. Call ends → Status webhook fires
   ↓
11. Backend logs call to twilio_call_logs table
```

### Data Model

**twilio_call_logs table:**
```sql
- id (bigint, primary key)
- user_id (foreign key → users.id)
- contact_id (foreign key → contacts.id, nullable)
- direction (enum: 'outbound-manual', 'outbound-campaign', 'inbound')
- phone_number (varchar)
- call_sid (varchar, unique, Twilio Call SID)
- status (enum: 'completed', 'failed', 'busy', 'no-answer')
- duration (integer, seconds)
- recording_url (text, nullable)
- notes (text, nullable)
- created_at (timestamp)
```

### API Endpoints

**POST /api/voice/token**
- **Purpose**: Generate Twilio Access Token for WebRTC
- **Auth**: Required (Bearer token)
- **Response**: `{ "token": "eyJhbGc..." }`

**POST /api/voice/manual/twiml**
- **Purpose**: Return TwiML for outbound call
- **Params**: `To` (phone number), `contactId` (optional)
- **Response**: XML TwiML

**POST /api/voice/manual/status**
- **Purpose**: Receive call status updates from Twilio
- **Params**: `CallSid`, `CallStatus`, `CallDuration`
- **Action**: Log call to database

**GET /api/voice/call-logs**
- **Purpose**: Fetch user's call history
- **Auth**: Required
- **Scoping**: Agent (own calls), Manager (dept calls), Admin (org calls)

## Related Documentation

- [Outbound Voice Overview](/voice/outbound/overview)
- [Creating Campaigns](/voice/outbound/campaigns/manager/creating-campaigns)
- [Contact Management](/voice/outbound/campaigns/manager/contact-management)
- [Call History & Reports](/channels/voice/reports-analytics/call-history)

## Need Help?

- **Agents**: Contact manager if dialer not accessible
- **Managers**: See contact management guides or contact support
- **Admins**: Check Twilio configuration or contact technical support

---

**Quick Links:**
- [📊 View Call History](/channels/voice/reports-analytics/call-history)
- [📇 Manage Contacts](/voice/outbound/campaigns/manager/contact-management)
