---
id: overview
title: Welcome to DutyCall
sidebar_label: Overview
slug: /getting-started/overview
---

# Welcome to DutyCall

**DutyCall** is a modern contact center platform built for teams that need reliable voice communication with real-time call handling, queue management, and comprehensive reporting.

## What You Can Do

### For Agents
- Handle inbound calls from a queue
- Make manual outbound calls
- Manage your availability status
- Complete after-call work (wrap-up)

### For Managers
- Monitor queue performance in real-time
- Make manual outbound calls to clients
- Create and manage call campaigns
- Import contacts from Google Sheets
- View call history and agent performance

### For Admins
- Configure Twilio integration
- Set up webhooks and TwiML endpoints
- Manage user roles and permissions
- Configure queue settings

## Core Features

### Voice Channel
DutyCall currently focuses on voice communication with two main capabilities:

#### Inbound Voice
Professional call queue system where:
- Callers wait in queue with hold music
- Agents accept calls from their browser
- Real-time queue monitoring
- After-call wrap-up time for notes

#### Outbound Voice
Two types of outbound calling:
- **Manual Dialer**: One-on-one calls to clients
- **Campaigns**: Automated calling to contact lists

## Technology

DutyCall uses browser-based WebRTC calling powered by Twilio, which means:
- No phone hardware required
- Call from any device with a browser
- High-quality audio
- Instant setup

## How These Docs Are Organized

:::tip Documentation as a Product Feature
We believe **great documentation is a core product feature**. These docs are designed to get you answers fast, no matter your role.
:::

We've structured this documentation around two key principles:

1. **Separate using the product from configuring it**
2. **Role-filtered content** - One topic, multiple perspectives

### Role-Filtered Documentation

Many feature pages use **role-based tabs** so you can:
- Read the general overview and feature specs
- **Select your role tab** (Agent, Manager, Admin, Developer) to dive deeper into role-specific details
- Get exactly what YOU need without wading through irrelevant content

**Example**: The Analytics Dashboard page has tabs for Manager (using the dashboard), Admin (configuration), and Developer (API details) - all in one place.

### Channels (Operational)
Find **Channels** in the left sidebar when you need to **use DutyCall in your daily work**:
- **Who uses this**: Agents and Managers
- **What's here**: How to handle calls, run campaigns, and view your performance
- **Think of it as**: "I need to get my work done"

Example: An agent looking for how to accept calls, or a manager learning to create a campaign.

### Administration (Configuration)
Find **Administration** in the left sidebar when you need to **set up or govern the platform**:
- **Who uses this**: Administrators only
- **What's here**: System configuration, integrations, and data governance
- **Think of it as**: "I need to configure the system"

Example: An admin setting up Twilio integration, or exporting compliance data.

### Key Sections Explained

| Section | Purpose | Audience |
|---------|---------|----------|
| **Channels > Voice > Inbound Calls** | How to handle incoming calls | Agents, Managers |
| **Channels > Voice > Outbound Calls** | How to make outbound calls and campaigns | Managers |
| **Channels > Voice > Reports & Analytics** | View performance and call history | Agents, Managers, Admins |
| **Administration > Voice Channel Setup** | Configure Twilio, queues, webhooks | Admins |
| **Administration > Data Management** | Export data, compliance, audit logs | Admins |

### Future Growth
As we add Email and Chat channels, they'll follow the same pattern:
- **Channels > Email** (how to use email)
- **Administration > Email Channel Setup** (how to configure email)

This keeps things consistent and easy to navigate as the platform grows.

---

## For AI Agents Reading This Documentation

:::info AI-Optimized Documentation
DutyCall documentation is structured for **both human and AI agent consumption**. This section explains patterns and conventions to help AI systems parse and act on our documentation effectively.
:::

### How to Access This Guide

**From the left sidebar:**
- Navigate to **Getting Started > Overview**
- Scroll to this section: "For AI Agents Reading This Documentation"

**Always visible**: This guide is part of the Overview page, accessible from any role-based home page.

### Documentation Structure Patterns

#### 1. Role-Based Tabs Pattern
When you encounter tabs with role icons:
- 👤 **Agent** = Individual user performing daily tasks
- 👥 **Manager** = Department/team oversight
- 🔧 **Admin** = System configuration
- ⚡ **Super Admin** = Full platform access
- 💻 **Developer** = Technical integration

**How to parse:**
- Identify the user's role
- Extract content from the matching tab
- **Role hierarchy**: agent < dept_manager < account_admin < super_admin
- Higher roles inherit capabilities of lower roles

**Example usage:**
```
User role: "dept_manager"
→ Read Manager tab content
→ Also inherits Agent tab capabilities
```

#### 2. Explicit Boundary Pattern
Look for paired sections that define scope:
- **"What You See"** → Lists available features/data
- **"What You Cannot See"** → Lists restricted features/data (marked with ❌)

**Purpose**: Eliminates ambiguity about access and capabilities

**Example:**
```
What You See: Your call history, Your success rate
What You Cannot See: ❌ Team performance, ❌ System health
→ Conclusion: User has personal-only access
```

#### 3. Decision Tree Pattern
Sections titled with conditional language contain troubleshooting logic:
- **"If You See Issues"** → Symptom → Action mapping
- **"When to [Action]"** → Trigger conditions with thresholds
- **"What Good [X] Looks Like"** → Success criteria with targets

**How to use:**
1. Match user's reported symptom to condition
2. Extract corresponding action
3. Execute or guide user to execute

**Example:**
```
If: "Success rate <80%"
Then: "Review call handling technique, check if customers are answering"
```

#### 4. Metric Definition Pattern
Metrics follow this structured format:

**Pattern:**
```
**Metric Name:**
- What it measures (description)
- Formula: (Calculation)
- Target: Threshold value
- Interpretation: What values mean
```

**Example:**
```
**Success Rate:**
- Percentage of calls that completed successfully
- Formula: (Successful Calls / Total Calls) × 100
- Target: >80% for healthy performance
- Interpretation: <60% indicates critical issues
```

### Action-Oriented Structure

#### Numbered Steps = Sequential Execution
When you see numbered lists under "How to" headings:
- Execute steps **in order**
- Each step is **atomic and required**
- Do not skip steps unless explicitly marked optional

**Example:**
```
1. Log in to DutyCall
2. Click "Analytics" in sidebar
3. Check your Voice tab
→ Execute: Step 1, then 2, then 3
```

#### Quick Actions = Parallel Execution
Sections titled **"Quick Actions"** contain tasks that:
- Can be executed **in any order**
- Have **no prerequisites** (self-contained)
- Are **immediately actionable**

#### Daily/Weekly Routines = Scheduled Patterns
Time-based sections provide recurring workflows:
- **"Daily Check"** → Execute once per day
- **"Weekly Review"** → Execute once per week
- Time estimates provided in parentheses: (30 seconds), (5 minutes)

### Understanding Thresholds and Targets

#### Performance Targets
Throughout documentation, look for:
- **Target: &gt;X%** → Goal to achieve or exceed
- **Target: &lt;X%** → Limit not to exceed
- **Healthy: &gt;X%** → Green zone
- **Warning: X-Y%** → Yellow zone
- **Critical: &lt;X%** → Red zone (requires action)

**Color coding:**
- 🟢 Green = Healthy (&gt;80%)
- 🟡 Yellow = Warning (60-80%)
- 🔴 Red = Critical (&lt;60%)

#### Troubleshooting Thresholds
Specific values that trigger help-seeking:
- "Success rate drops below 70%" → Contact manager
- "Average duration changes ±50%" → Investigate issue
- "Numbers don't match perception" → Request support

### Navigation Patterns

#### Left Sidebar Structure
```
Getting Started (onboarding)
Channels (operational - daily use)
  └── Voice
      ├── Inbound Calls
      ├── Outbound Calls
      └── Reports & Analytics
Administration (configuration - setup)
  ├── Roles & Permissions
  ├── Voice Channel Setup
  └── Data Management
Developer Docs (technical integration)
```

#### Section Purpose Guide
| Section | User Type | Purpose |
|---------|-----------|---------|
| Channels | Agents, Managers | Daily operational tasks |
| Administration | Admins | System configuration |
| Developer Docs | Developers, AI | Technical integration |

### Parsing Best Practices

1. **Always check role tabs first** - Content varies significantly by role
2. **Look for ❌ symbols** - These explicitly state restrictions
3. **Extract numeric thresholds** - These enable decision-making
4. **Follow numbered steps sequentially** - Order matters
5. **Treat bullets as parallel options** - Order doesn't matter
6. **Reference formulas for calculations** - Don't guess at derivations

### Common Patterns to Recognize

**Access Control:**
```
"Manager+ only" = Requires dept_manager, account_admin, or super_admin role
"Admin only" = Requires account_admin or super_admin role
```

**Status Indicators:**
```
✅ = Available/allowed
❌ = Not available/restricted
⚠️ = Warning/caution
ℹ️ = Information/note
```

**Priority Levels:**
```
:::tip = Helpful suggestion
:::info = Important information
:::caution = Proceed carefully
:::danger = Critical warning
```

---

## Next Steps

Choose your role to get started:

- [Admin Quick Start](/getting-started/quick-start-admin)
- [Manager Quick Start](/getting-started/quick-start-manager)
- [Agent Quick Start](/getting-started/quick-start-agent)

## Need Help?

- Browse documentation by feature in the sidebar
- Search for specific topics using the search bar
- Contact support for additional assistance
