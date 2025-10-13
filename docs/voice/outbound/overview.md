---
id: overview
title: Outbound Voice Overview
sidebar_label: Overview
sidebar_position: 1
---

# Outbound Voice Overview

:::info Manager+ Feature
Outbound voice capabilities are available to **Department Managers** and **Administrators**. Agents gained access to Manual Dialer on **October 8, 2025**.
:::

## What is Outbound Voice?

DutyCall's Outbound Voice system enables teams to make calls to customers and prospects using two distinct modes:

1. **Campaign Dialer** - Automated bulk calling to contact lists
2. **Manual Dialer** - One-on-one browser-based calls to individual contacts

Both modes use browser-based **WebRTC calling** powered by Twilio - no phone hardware required.

## Two Modes of Outbound Calling

### Campaign Dialer (Automated)

**What it does:**
- Automatically calls through a list of contacts
- Connects answered calls to available agents
- Manages call flow with retry logic and scheduling
- Supports Text-to-Speech (TTS) or audio file playback

**Best for:**
- High-volume outreach campaigns
- Scheduled callback campaigns
- Customer notification campaigns
- Survey or feedback collection

**Who can use it:**
- 👥 **Managers** - Create and manage campaigns
- 🔧 **Admins** - Configure system settings and webhooks

**Learn more:** [Creating Campaigns](/voice/outbound/campaigns/manager/creating-campaigns)

### Manual Dialer (One-on-One)

**What it does:**
- Click-to-call individual contacts from your browser
- WebRTC-based calling with no phone required
- Floating dialer UI for multitasking
- Real-time call controls (mute, hold, transfer)

**Best for:**
- Personalized customer outreach
- Follow-up calls to specific contacts
- Ad-hoc calling outside of campaigns
- High-value prospect engagement

**Who can use it:**
- 👤 **Agents** - Make manual calls to contacts (as of Oct 8, 2025)
- 👥 **Managers** - Make manual calls to contacts
- 🔧 **Admins** - Make manual calls to contacts

**Learn more:** [Manual Calling](/voice/outbound/dialer/manager/manual-calling)

## Key Features

### Contact Management
- Import contacts from Google Sheets (no Google login required)
- Bulk upload via CSV
- Create and edit contacts manually
- Organize contacts with custom fields and tags

**Learn more:** [Contact Management](/voice/outbound/campaigns/manager/contact-management) | [Google Sheets Import](/administration/data-management/data-import/google-sheets)

### Campaign Scheduling
- Schedule campaigns for specific dates and times
- Set recurrence patterns (daily, weekly, monthly)
- Timezone-aware scheduling
- Automatic retry logic for failed calls

### Browser-Based Calling (WebRTC)
- No desk phones or softphones required
- Call directly from your browser
- High-quality audio via Twilio Voice SDK
- Works on any device with modern browser

### Analytics & Reporting
- Real-time campaign progress tracking
- Call outcome reporting (answered, no-answer, failed)
- Success rate metrics
- Integration with Analytics Dashboard

**Learn more:** [Analytics Dashboard](/channels/voice/reports-analytics/analytics-dashboard)

## How Outbound Voice Works

### Campaign Dialer Flow

```
1. Create Campaign
   ↓
2. Import/Add Contacts
   ↓
3. Configure Call Settings (TTS/Audio, Retry Logic)
   ↓
4. Schedule or Start Campaign
   ↓
5. System Dials Contacts Automatically
   ↓
6. Answered Calls → Route to Available Agents
   ↓
7. Track Results in Real-Time
```

### Manual Dialer Flow

```
1. Open Manual Dialer (floating UI)
   ↓
2. Enter Phone Number or Select Contact
   ↓
3. Click "Call"
   ↓
4. Browser Connects via WebRTC
   ↓
5. Manage Call (Mute, Hold, Transfer)
   ↓
6. End Call & Complete Wrap-Up
```

## Role-Based Access

| Feature | Agent | Manager | Admin |
|---------|:-----:|:-------:|:-----:|
| Manual Dialer | ✅ (Since Oct 8, 2025) | ✅ | ✅ |
| Create Campaigns | ❌ | ✅ | ✅ |
| Import Contacts | ❌ | ✅ | ✅ |
| Schedule Campaigns | ❌ | ✅ | ✅ |
| View Own Call History | ✅ | ✅ | ✅ |
| View Team Analytics | ❌ | ✅ (Dept only) | ✅ (Org-wide) |
| Configure Webhooks | ❌ | ❌ | ✅ |

## Technology Stack

### Frontend (Browser)
- **Twilio Voice SDK** - WebRTC calling in browser
- **React/TypeScript** - User interface
- **Floating Dialer UI** - Multitasking-friendly call interface

### Backend
- **Laravel/PHP** - API and business logic
- **Twilio Programmable Voice API** - Call routing and management
- **Role-based access control** - Department and organization scoping

### Data Storage
- **twilio_call_logs** - Call records and analytics
- **campaigns** - Campaign configuration
- **campaign_calls** - Individual call tracking
- **contacts** - Contact database

## Getting Started

### For Agents (Manual Dialer)
1. Navigate to **Outbound > Manual Dialer**
2. Enter contact phone number
3. Click **"Call"** to connect
4. Manage call with on-screen controls

**Learn more:** [Manual Calling for Agents](/voice/outbound/dialer/manager/manual-calling)

### For Managers (Campaigns)
1. Navigate to **Outbound > Campaigns**
2. Click **"Create Campaign"**
3. Import contacts from Google Sheets or CSV
4. Configure call settings and schedule
5. Launch and monitor campaign

**Learn more:** [Creating Campaigns](/voice/outbound/campaigns/manager/creating-campaigns)

### For Admins (System Setup)
1. Configure Twilio credentials in **Administration > Voice Channel Setup**
2. Set up webhooks for call events
3. Configure campaign defaults and retry logic
4. Monitor system-wide campaign performance

## Important Dates & Updates

**October 8, 2025**: Agents gained access to Manual Dialer
- Previously Manager+ only
- Agents can now make one-on-one calls to contacts
- Campaign creation remains Manager+ only

## Comparison: Campaign vs Manual Dialer

| Feature | Campaign Dialer | Manual Dialer |
|---------|----------------|---------------|
| **Call Volume** | High (bulk calling) | Low (one-on-one) |
| **Automation** | Fully automated | Manual trigger |
| **Scheduling** | Yes (recurrence patterns) | No (on-demand only) |
| **Contact Lists** | Required | Optional (can dial ad-hoc) |
| **Agent Assignment** | Automatic routing | Direct call by user |
| **Best For** | Mass outreach | Personalized calls |
| **Access** | Manager+ only | Agent+ (since Oct 8, 2025) |

## Common Use Cases

### Campaign Dialer
- Customer appointment reminders
- Payment reminder campaigns
- Customer satisfaction surveys
- Product launch announcements
- Seasonal promotion outreach

### Manual Dialer
- Follow-up on support tickets
- High-value customer check-ins
- Personalized sales calls
- Quick ad-hoc contact
- VIP customer engagement

## Troubleshooting Quick Links

- **Cannot hear audio?** Check browser microphone permissions
- **Call not connecting?** Verify Twilio configuration in Admin settings
- **Campaign not starting?** Check campaign status and contact list
- **WebRTC errors?** See [Manual Calling Troubleshooting](/voice/outbound/dialer/manager/manual-calling#troubleshooting)

## Related Documentation

- [Manual Calling Guide](/voice/outbound/dialer/manager/manual-calling)
- [Creating Campaigns](/voice/outbound/campaigns/manager/creating-campaigns)
- [Contact Management](/voice/outbound/campaigns/manager/contact-management)
- [Google Sheets Import](/administration/data-management/data-import/google-sheets)
- [Analytics Dashboard](/channels/voice/reports-analytics/analytics-dashboard)

## Need Help?

- **Agents**: Contact your manager for manual dialer access
- **Managers**: See campaign creation guides or contact support
- **Admins**: Check system configuration docs or contact technical support

---

**Ready to start?** Choose your path:
- [📞 Make Manual Calls](/voice/outbound/dialer/manager/manual-calling)
- [📊 Create Campaigns](/voice/outbound/campaigns/manager/creating-campaigns)
- [📇 Manage Contacts](/voice/outbound/campaigns/manager/contact-management)
