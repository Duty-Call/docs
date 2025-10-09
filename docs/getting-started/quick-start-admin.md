---
id: quick-start-admin
title: Admin Quick Start
sidebar_label: Admin Quick Start
---

# Admin Quick Start

This guide helps system administrators get DutyCall configured and ready for your team.

## Prerequisites

- Super Admin or Account Admin role
- Twilio account with API credentials
- Domain for webhook URLs (or ngrok for development)

## Setup Steps

### 1. Configure Twilio Integration

See [Twilio Setup](/voice/inbound/admin/twilio-setup) for detailed instructions on:
- Creating TwiML Apps
- Setting up phone numbers
- Configuring webhooks

### 2. Set Up User Roles

DutyCall has four role levels:
- **Super Admin**: Full system access
- **Account Admin**: Customer-level administration
- **Department Manager**: Campaign management and manual calling
- **Agent**: Queue call handling only

### 3. Configure Queue Settings

Set up your inbound call queue:
- Queue name and hold music
- Maximum wait time
- Agent availability rules

See [Queue Configuration](/voice/inbound/admin/queue-configuration) for details.

### 4. Test Voice Integration

Before going live:
1. Test inbound calls reach the queue
2. Test agent can accept and handle calls
3. Verify call history is recorded
4. Check webhook delivery

## Next Steps

- [Set up webhooks](/voice/inbound/admin/webhook-setup)
- [Configure TwiML](/voice/inbound/admin/twiml-configuration)
- Train your managers and agents

## Troubleshooting

Common admin issues and solutions will be documented here.
