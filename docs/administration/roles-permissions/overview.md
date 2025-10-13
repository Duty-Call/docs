---
id: overview
title: Roles & Permissions
sidebar_label: Overview
sidebar_position: 1
---

# Roles & Permissions

:::info Admin-Only Feature
Roles & Permissions management is only available to **Administrator** roles.
:::

## Overview

DutyCall uses role-based access control (RBAC) to determine what users can see and do within the platform. Understanding roles and permissions is critical for maintaining security, compliance, and operational efficiency.

## The 4 Roles in DutyCall

DutyCall uses a **hierarchical role system** where higher roles inherit permissions from lower roles.

### 1. Agent (Level 25)
**Purpose**: Handle customer interactions and daily operational tasks

**Display Name**: "Agent"

**Capabilities**:
- Accept and handle inbound calls
- Make manual outbound calls
- View personal call history (own data only)
- Manage personal availability status
- Complete wrap-up workflows
- Access voice WebRTC token for browser calling

**Cannot**:
- Export call data in bulk (restricted to Manager+)
- Configure system settings
- View other agents' data
- Manage campaigns
- Access admin features

---

### 2. Department Manager (Level 50)
**Purpose**: Oversee department operations and team performance

**Display Name**: "Department Manager"
**Role Code**: `dept_manager`

**Capabilities**:
- **All Agent capabilities**, plus:
- Create and manage call campaigns
- Start/stop campaigns
- Monitor queue performance (view only)
- View department/team call history and performance
- **Export call data** (CSV/Excel) - Manager+ only
- Import contacts from Google Sheets
- Access team-level reporting

**Cannot**:
- Configure system integrations (Twilio, webhooks, providers)
- Manage user roles or permissions
- Access organization-wide settings
- View data outside their department scope

---

### 3. Account Administrator (Level 75)
**Purpose**: Manage account settings, users, and organizational configuration

**Display Name**: "Account Administrator"
**Role Code**: `account_admin`

**Capabilities**:
- **All Department Manager capabilities**, plus:
- Manage users and assign roles
- Configure account settings
- Manage campaigns across all departments
- Access organization-wide reporting
- Manage provider settings (Twilio, communication channels)
- Configure webhooks and integrations
- Export all organizational data

**Cannot**:
- Access super admin functions (system-wide settings)
- Manage billing or platform-level configuration

---

### 4. Super Administrator (Level 100)
**Purpose**: Full system access for platform management

**Display Name**: "Super Administrator"
**Role Code**: `super_admin`

**Capabilities**:
- **Unrestricted access** to all platform features
- All Account Admin capabilities, plus:
- System-wide configuration and settings
- Manage all organizations/accounts
- Access audit logs and security settings
- Platform billing and subscription management
- Database and infrastructure access

**Special Behavior**: Super admins bypass all role checks and can access everything.

---

## Role Hierarchy & Inheritance

```
super_admin (100) ─┐
                   ├─> Can access everything
account_admin (75) ─┤
                    ├─> Inherits dept_manager permissions
dept_manager (50) ──┤
                    ├─> Inherits agent permissions
agent (25) ─────────┘
```

**Key principle**: Higher roles inherit ALL permissions from lower roles, plus additional capabilities.

## Permission Matrix

Complete breakdown of what each role can do:

| Capability | Agent | Dept Manager | Account Admin | Super Admin |
|------------|-------|--------------|---------------|-------------|
| **Voice Operations** |
| Accept inbound calls | ✅ | ✅ | ✅ | ✅ |
| Make outbound calls (manual dialer) | ✅ | ✅ | ✅ | ✅ |
| Access WebRTC voice token | ✅ | ✅ | ✅ | ✅ |
| Create/manage campaigns | ❌ | ✅ | ✅ | ✅ |
| Start/stop campaigns | ❌ | ✅ | ✅ | ✅ |
| **Reporting & Data** |
| View personal call history | ✅ | ✅ | ✅ | ✅ |
| View team/department reports | ❌ | ✅ | ✅ | ✅ |
| View organization-wide reports | ❌ | ❌ | ✅ | ✅ |
| **Export call data (CSV/Excel)** | ❌ | ✅ | ✅ | ✅ |
| **Configuration** |
| Manage queue settings | ❌ | ❌ | ✅ | ✅ |
| Configure Twilio integration | ❌ | ❌ | ✅ | ✅ |
| Set up webhooks | ❌ | ❌ | ✅ | ✅ |
| Manage providers (Twilio, etc.) | ❌ | ❌ | ✅ | ✅ |
| **User Management** |
| Manage users | ❌ | ❌ | ✅ | ✅ |
| Assign roles | ❌ | ❌ | ✅ | ✅ |
| Manage departments | ❌ | ❌ | ✅ | ✅ |
| **System Administration** |
| Access audit logs | ❌ | ❌ | ❌ | ✅ |
| Data retention policies | ❌ | ❌ | ❌ | ✅ |
| Platform billing | ❌ | ❌ | ❌ | ✅ |
| System-wide configuration | ❌ | ❌ | ❌ | ✅ |

### Key Export Restriction

**Data export is restricted to Manager+ roles** for security and compliance reasons. See [Data Export](/administration/data-management/data-export#why-we-restrict-data-exports) for detailed rationale.

## Security Principles

### Least Privilege
Users receive the **minimum permissions** necessary to perform their job functions. This reduces:
- Risk of accidental data exposure
- Attack surface for security incidents
- Compliance liability

### Role-Based Access Control (RBAC)
Permissions are tied to **roles, not individuals**. This makes it easier to:
- Onboard new team members
- Audit who has access to what
- Adjust permissions at scale

### Data Minimization
Users only see data relevant to their work:
- Agents see their own performance
- Managers see their team's performance
- Admins see organization-wide data

This aligns with GDPR/CCPA data minimization requirements.

## How Role Checks Work

### Backend (Laravel API)

**Middleware-based role checking** on API routes:

```php
// Example: Call history export endpoint
Route::get('/call-history/export', [CallHistoryController::class, 'export'])
    ->middleware('role:super_admin,account_admin,dept_manager');
```

**User model helper methods:**

```php
// Check exact role
$user->hasRole('super_admin')

// Check if user has any of the given roles
$user->hasAnyRole(['super_admin', 'account_admin'])

// Check access with super admin bypass
$user->canAccess(['account_admin', 'dept_manager'])

// Compare role levels
$user->getRoleLevel() // Returns: 100, 75, 50, or 25
$user->hasHigherRoleThan($otherUser)
```

### Frontend (React/TypeScript)

**Context-based role checking** in the UI:

```typescript
// Check exact role
hasRole('super_admin')

// Check if user has any of these roles
hasAnyRole(['super_admin', 'account_admin', 'dept_manager'])

// Check access (with super admin bypass)
canAccess(['account_admin', 'dept_manager'])
```

**Example usage** in components:

```tsx
{hasAnyRole(['super_admin', 'account_admin', 'dept_manager']) && (
  <ExportButton onClick={handleExport} />
)}
```

### Security Implementation

1. **Backend enforcement is primary**: Frontend checks are for UX only. All permissions are enforced server-side.
2. **Super admin bypass**: `super_admin` role bypasses all role checks and can access everything.
3. **API returns 403 Forbidden** if a user attempts to access a restricted endpoint.
4. **Frontend hides UI elements** users don't have permission to use (improves UX, not security).

## Role Assignment

### Automatic Role Assignment (OAuth)

When users log in via Google OAuth, roles are assigned based on email domain:

| Email Domain | Auto-Assigned Role |
|--------------|-------------------|
| `@dutycall.net` | `super_admin` |
| `@admin.dutycall.net` | `account_admin` |
| `@manager.dutycall.net` | `dept_manager` |
| All other domains | `agent` (default) |

### Manual Role Assignment

Account administrators can manually assign roles to users through the user management interface (coming soon).

## Best Practices for Admins

### Assigning Roles

1. **Start with least privilege**: Assign the lowest role that allows the user to do their job
2. **Review regularly**: Audit user roles quarterly to ensure they're still appropriate
3. **Document exceptions**: If someone needs elevated permissions, document why
4. **Limit super admins**: Only platform owners should have `super_admin` access

### Security Considerations

- **Never share admin credentials**: Each person should have their own account
- **Monitor data exports**: Review who is exporting data and why (audit logs coming soon)
- **Revoke access promptly**: When someone leaves, disable their account immediately
- **Use departments for scoping**: Managers should only see their department's data

## Coming Soon

- **User management interface**: Assign roles via admin dashboard
- **Custom permissions**: Fine-grained control beyond role-based access
- **Audit logs**: Track who did what and when
- **SSO/SAML integration**: Enterprise single sign-on support
- **API access tokens**: Role-scoped API keys for integrations

---

**Need help managing user roles?** Contact support or your account representative.
