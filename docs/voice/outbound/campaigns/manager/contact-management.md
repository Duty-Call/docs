---
id: contact-management
title: Contact Management
sidebar_label: Contact Management
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Contact Management

:::info Manager+ Only
Contact management is available to **Department Managers** and **Administrators** only.
:::

## Overview

DutyCall's Contact Management system enables organizing, importing, and maintaining contact lists for manual dialing and campaign operations. Build robust contact databases with custom fields, tags, and bulk import capabilities.

**Key Features:**
- 📇 **Centralized Database** - All contacts in one searchable location
- 📊 **Bulk Import** - Google Sheets, CSV, or manual entry
- 🏷️ **Custom Fields & Tags** - Organize contacts your way
- 🔄 **Duplicate Detection** - Automatic phone number deduplication
- 📈 **Call History Integration** - See past interactions with contacts
- 🔍 **Advanced Search** - Filter by name, phone, tags, or custom fields

---

<Tabs groupId="user-role">
<TabItem value="manager" label="👥 Manager" default>

## For Managers: Managing Contacts

### Creating Contacts

**Method 1: Manual Creation**
1. Navigate to **Outbound** → **Contacts**
2. Click **"Create Contact"** button
3. Fill in contact details:
   - **Name**: Full name (required)
   - **Phone**: E.164 format with country code (required) - e.g., +15551234567
   - **Email**: Email address (optional)
   - **Company**: Organization name (optional)
   - **Tags**: Comma-separated tags (e.g., "VIP, Q4-Campaign, High-Priority")
   - **Notes**: Any relevant information
   - **Custom Fields**: Additional fields configured by admin
4. Click **"Save Contact"**

**Method 2: Create During Manual Call**
1. Open Manual Dialer
2. Enter phone number
3. Click **"Save as Contact"** before calling
4. Fill in details and save
5. Contact added to database

**Method 3: Bulk Import** (see [Importing Contacts](#importing-contacts) below)

### Importing Contacts

#### Import from Google Sheets

**Step 1: Prepare Your Sheet**
1. Create Google Sheet with contact data
2. Ensure first row has column headers
3. Include at minimum: Name and Phone columns
4. Share sheet publicly (View access only)

**Step 2: Import to DutyCall**
1. Navigate to **Contacts** → **Import**
2. Select **"Google Sheets"** tab
3. Paste public share URL
4. Click **"Fetch Data"**

**Step 3: Map Columns**
1. Review preview of sheet data
2. Map sheet columns to DutyCall fields:
   - **Name** → Contact Name (required)
   - **Phone** → Phone Number (required)
   - **Email** → Email Address (optional)
   - **Company** → Company Name (optional)
   - **Custom columns** → Custom Fields
3. Click **"Validate Data"**

**Step 4: Review & Import**
1. System validates phone numbers and checks for duplicates
2. Review validation results:
   - ✅ Valid contacts ready to import
   - ⚠️ Duplicates found (skip or update)
   - ❌ Invalid entries (missing phone, bad format)
3. Choose duplicate handling:
   - **Skip duplicates** (keep existing)
   - **Update duplicates** (overwrite with new data)
4. Click **"Import Contacts"**
5. Confirm number of contacts imported

**Learn more:** [Google Sheets Import Guide](/administration/data-management/data-import/google-sheets)

#### Import from CSV File

**Step 1: Prepare CSV**
1. Create CSV file with comma-separated values
2. First row must contain headers
3. Save as `.csv` format (UTF-8 encoding)

**Example CSV:**
```csv
Name,Phone,Email,Tags
John Doe,+15551234567,john@example.com,"VIP,Q4"
Jane Smith,+15559876543,jane@example.com,"New Customer"
```

**Step 2: Upload & Map**
1. Navigate to **Contacts** → **Import**
2. Select **"CSV File"** tab
3. Click **"Upload CSV"** and select file
4. Map columns to DutyCall fields
5. Validate and import (same as Google Sheets)

### Searching & Filtering Contacts

**Quick Search:**
- Use search bar at top of Contacts page
- Searches across: Name, Phone, Email, Company

**Advanced Filters:**
1. Click **"Filters"** button
2. Apply multiple criteria:
   - **Tags**: Select one or more tags
   - **Date Added**: Contact creation date range
   - **Last Called**: Filter by recent call activity
   - **Custom Fields**: Filter by custom field values
3. Click **"Apply Filters"**

**Save Filter Presets:**
1. Configure filters
2. Click **"Save as Preset"**
3. Name your filter (e.g., "VIP Customers - Q4")
4. Access saved filters from dropdown

### Editing Contacts

**Edit Single Contact:**
1. Find contact in list
2. Click contact name or **"Edit"** icon
3. Update fields as needed
4. Click **"Save Changes"**

**Bulk Edit:**
1. Select multiple contacts (checkboxes)
2. Click **"Bulk Actions"** → **"Edit Selected"**
3. Choose fields to update:
   - Add tags
   - Remove tags
   - Update custom field
4. Click **"Apply to Selected Contacts"**

### Organizing with Tags

**Adding Tags:**
- During contact creation
- During edit
- Bulk action to multiple contacts

**Tag Best Practices:**
- Use consistent naming (e.g., "VIP" not "vip" or "V.I.P.")
- Create campaign-specific tags (e.g., "Q4-2025-Survey")
- Tag by customer status (e.g., "Active", "Inactive", "Prospect")
- Tag by segment (e.g., "Enterprise", "SMB", "Free-Tier")

**Manage Tags:**
1. Navigate to **Contacts** → **Tags**
2. View all tags with contact counts
3. Rename tags (updates all contacts)
4. Merge duplicate tags
5. Delete unused tags

### Using Custom Fields

Custom fields enable tracking additional data specific to your business.

**Available Custom Fields** (configured by Admin):
- Text fields (short text, long text)
- Number fields (integers, decimals)
- Date fields
- Dropdown selections (predefined options)

**Example Use Cases:**
- **Customer ID**: Link to external CRM system
- **Account Value**: Annual contract value
- **Renewal Date**: When to follow up
- **Industry**: Segment by vertical
- **Lead Source**: Track where contact originated

**Filtering by Custom Fields:**
1. Click **"Filters"** → **"Custom Fields"**
2. Select field and criteria
3. Apply filter

### Managing Duplicate Contacts

**Duplicate Detection:**
- System checks phone numbers for duplicates
- Duplicates flagged during import
- Manual duplicate check available anytime

**Find Duplicates:**
1. Navigate to **Contacts** → **Duplicates**
2. System shows potential duplicates grouped by phone number
3. Review each group

**Merge Duplicates:**
1. Select 2+ duplicate contacts
2. Click **"Merge Contacts"**
3. Choose which data to keep:
   - Primary contact (keeps all its data)
   - Merge tags from all contacts
   - Merge notes from all contacts
   - Preserve call history from all
4. Click **"Confirm Merge"**
5. Duplicate contacts removed, data consolidated

### Deleting Contacts

**Delete Single Contact:**
1. Click contact to open details
2. Click **"Delete"** button
3. Confirm deletion
4. Contact removed permanently

**Bulk Delete:**
1. Select multiple contacts
2. Click **"Bulk Actions"** → **"Delete Selected"**
3. Confirm deletion
4. All selected contacts removed

:::caution Permanent Deletion
Deleted contacts cannot be recovered. Call history associated with the contact is preserved but unlinked.
:::

### Exporting Contacts

**Export All Contacts:**
1. Navigate to **Contacts**
2. Click **"Export"** button
3. Select format:
   - **CSV** - For spreadsheets and external tools
   - **Excel** - For advanced analysis
   - **vCard** - For importing to phone/email clients
4. Download file

**Export Filtered Subset:**
1. Apply filters to narrow contact list
2. Click **"Export"** → **"Export Filtered"**
3. Only visible contacts are exported

**What's Included in Export:**
- Contact name, phone, email
- Tags (comma-separated)
- Custom field values
- Date added
- Last call date and outcome
- Notes

**Learn more:** [Data Export](/administration/data-management/data-export)

### Contact Call History

**View Contact's Call History:**
1. Open contact details
2. Scroll to **"Call History"** section
3. See all calls to/from this contact:
   - Manual outbound calls
   - Campaign calls
   - Inbound calls (if they called in)

**Call History Details:**
- Date & time of call
- Duration
- Outcome (completed, no-answer, voicemail, etc.)
- Agent who handled
- Call notes
- Recording link (if available)

**Actions from Call History:**
- Click **"Call Again"** to redial contact
- Click **"View Recording"** to listen
- Click **"View Full Call Log"** for detailed view

### Best Practices for Contact Management

**Data Quality:**
- ✅ Always use E.164 format for phone numbers (+1XXXXXXXXXX)
- ✅ Verify numbers before import (use validation tools)
- ✅ Keep contact data up-to-date (remove bounced numbers)
- ✅ Add meaningful notes (context for future calls)

**Organization:**
- ✅ Use consistent tagging conventions
- ✅ Create tags for campaigns, segments, and status
- ✅ Leverage custom fields for business-specific data
- ✅ Regularly merge duplicates (monthly review)

**Privacy & Compliance:**
- ✅ Honor opt-out requests immediately
- ✅ Tag opted-out contacts (e.g., "DNC" - Do Not Call)
- ✅ Filter out DNC contacts before campaigns
- ✅ Maintain records of consent where required
- ✅ Delete contact data upon request (GDPR/CCPA)

**Import Hygiene:**
- ✅ Clean data before import (remove duplicates in sheet)
- ✅ Validate phone numbers in source system first
- ✅ Test with small batch (50-100 contacts) before full import
- ✅ Review import summary for errors before proceeding

### Troubleshooting Contact Management

**Import fails with "Invalid phone number":**
- ✅ Ensure phone numbers include country code (+1 for US)
- ✅ Remove spaces, dashes, parentheses (use +15551234567, not (555) 123-4567)
- ✅ Check for non-numeric characters
- ✅ Use text format in spreadsheet (not number format)

**Duplicate detection not working:**
- ✅ Phone numbers must be identical to detect duplicates
- ✅ Format differences prevent detection (+15551234567 vs 15551234567)
- ✅ Manually search for duplicates using search bar
- ✅ Export, clean in spreadsheet, re-import

**Cannot delete contact:**
- ✅ Check if contact is in active campaign (must remove from campaign first)
- ✅ Check permissions (Manager can only delete own dept contacts)
- ✅ Admin may need to delete if contact is system-critical

**Custom fields not showing:**
- ✅ Admin must configure custom fields first
- ✅ Refresh page to see newly added fields
- ✅ Check field visibility settings (Admin may have restricted)

</TabItem>

<TabItem value="admin" label="🔧 Admin">

## For Admins: Contact System Configuration

### Configuring Custom Fields

**Create Custom Fields:**
1. Navigate to **Administration** → **Contacts** → **Custom Fields**
2. Click **"Create Custom Field"**
3. Configure field:
   - **Field Name**: Internal identifier (e.g., "customer_id")
   - **Display Label**: User-facing name (e.g., "Customer ID")
   - **Field Type**: Select from:
     - Text (short) - Single line input
     - Text (long) - Multi-line textarea
     - Number (integer) - Whole numbers only
     - Number (decimal) - Supports decimals
     - Date - Date picker
     - Dropdown - Predefined options
     - Checkbox - Yes/No boolean
   - **Required**: Toggle if field is mandatory
   - **Visible to**: Choose which roles can see field
4. Click **"Create Field"**

**Example Custom Fields:**

**Customer ID (Text):**
```
Field Name: customer_id
Display Label: Customer ID
Type: Text (short)
Required: No
Visible to: All
```

**Account Value (Number):**
```
Field Name: account_value
Display Label: Annual Contract Value
Type: Number (decimal)
Required: No
Visible to: Manager+
```

**Industry (Dropdown):**
```
Field Name: industry
Display Label: Industry
Type: Dropdown
Options: Healthcare, Finance, Technology, Retail, Other
Required: No
Visible to: All
```

**Manage Existing Fields:**
- **Edit**: Change label, options, visibility
- **Reorder**: Drag to change display order
- **Archive**: Hide without deleting (preserves data)
- **Delete**: Permanently remove field and all data

:::caution Deleting Custom Fields
Deleting a custom field removes all data stored in that field across all contacts. This cannot be undone.
:::

### Contact Database Schema

**Core Contact Fields:**
```sql
CREATE TABLE contacts (
  id BIGINT PRIMARY KEY,
  organization_id BIGINT NOT NULL,
  department_id BIGINT NOT NULL,
  created_by_user_id BIGINT NOT NULL,

  -- Core fields
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL UNIQUE,
  email VARCHAR(255),
  company VARCHAR(255),

  -- Metadata
  tags JSON,
  custom_fields JSON,
  notes TEXT,

  -- Call tracking
  last_called_at TIMESTAMP,
  last_call_outcome VARCHAR(50),
  total_calls INT DEFAULT 0,

  -- Timestamps
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  -- Indexes
  INDEX idx_phone (phone),
  INDEX idx_organization_dept (organization_id, department_id),
  INDEX idx_tags (tags),
  FULLTEXT INDEX idx_search (name, email, company, notes)
);
```

**Custom Fields Storage:**
- Stored as JSON in `custom_fields` column
- Allows flexible schema without migrations
- Indexed for search performance

**Example Custom Fields JSON:**
```json
{
  "customer_id": "CRM-12345",
  "account_value": 50000.00,
  "renewal_date": "2025-12-31",
  "industry": "Healthcare",
  "lead_source": "Trade Show"
}
```

### Import System Configuration

**Global Import Settings:**
1. Navigate to **Administration** → **Contacts** → **Import Settings**
2. Configure:
   - **Max Import Size**: Contacts per import (default: 10,000)
   - **Duplicate Handling**: Default behavior (Skip, Update, Ask)
   - **Auto-Tagging**: Add tag to all imported contacts (e.g., "Imported-2025-10")
   - **Validation Strictness**: Strict (reject any errors) or Lenient (skip bad rows)
   - **Phone Formatting**: Auto-format to E.164 if possible

**Google Sheets Integration:**
- No authentication required (uses public share URLs)
- Fetches data via CSV export endpoint
- Rate limited to 10 imports per hour per user

**CSV Upload Limits:**
- Max file size: 50MB
- Max rows: Configurable per organization
- Allowed formats: .csv, .txt (comma-delimited)

### Duplicate Detection Configuration

**Detection Settings:**
1. Navigate to **Administration** → **Contacts** → **Duplicate Detection**
2. Configure rules:
   - **Primary Key**: Phone number (always enabled)
   - **Fuzzy Matching**: Name similarity threshold (0-100%)
   - **Email Matching**: Also check email for duplicates
   - **Merge Behavior**: Automatic or manual review

**Fuzzy Name Matching:**
- Uses Levenshtein distance algorithm
- Threshold 85% = "John Doe" matches "Jon Doe"
- Threshold 100% = Exact match only

**Automatic Merging:**
- Enable for automated duplicate resolution
- Set conflict resolution rules (keep newest, keep oldest, etc.)
- Log all auto-merge actions for audit

### Data Privacy & Compliance

**Opt-Out Management:**
1. Create tag: "DNC" (Do Not Call)
2. Configure campaigns to exclude contacts with "DNC" tag
3. Train managers to tag opted-out contacts immediately

**Data Retention:**
1. Navigate to **Administration** → **Data Management** → **Retention**
2. Set contact retention policy:
   - **Inactive contacts**: Delete after N days of no call activity
   - **Opted-out contacts**: Retain for compliance, exclude from campaigns
   - **Deleted contact logs**: Retain metadata for audit trail

**GDPR Compliance:**
- **Right to Access**: Export contact data via "Export Contacts"
- **Right to Erasure**: Delete contact permanently via Admin panel
- **Right to Rectification**: Update contact data anytime
- **Data Minimization**: Only collect required fields (name, phone)

**Learn more:** [Compliance & Retention](/administration/data-management/compliance-retention)

### Contact API Endpoints

**For integrations and custom tooling:**

**GET /api/contacts**
- List contacts with pagination
- Filters: tags, department, date range
- Scoping: Manager (dept), Admin (org)

**POST /api/contacts**
- Create single contact
- Validates phone format and duplicates
- Returns created contact with ID

**POST /api/contacts/bulk**
- Bulk create contacts
- Accepts array of contact objects
- Returns success count and error details

**GET /api/contacts/\{id\}**
- Fetch single contact by ID
- Includes call history and custom fields

**PUT /api/contacts/\{id\}**
- Update contact
- Partial updates supported

**DELETE /api/contacts/\{id\}**
- Soft delete (archives contact)
- Hard delete via query param `?permanent=true`

**POST /api/contacts/import/google-sheets**
- Initiate Google Sheets import
- Requires public share URL
- Returns import job ID for status tracking

**Example API Request:**
```bash
curl -X POST https://api.dutycall.net/api/contacts \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "phone": "+15551234567",
    "email": "john@example.com",
    "tags": ["VIP", "Q4-Campaign"],
    "custom_fields": {
      "customer_id": "CRM-12345",
      "account_value": 50000
    }
  }'
```

### Performance Optimization

**Database Indexing:**
- Phone number (primary key for duplicates)
- Organization + Department (scoping queries)
- Tags (JSON index for fast tag filtering)
- Full-text index on name, email, company, notes

**Query Optimization:**
```sql
-- Fast contact search with tags
SELECT * FROM contacts
WHERE organization_id = ?
  AND JSON_CONTAINS(tags, '"VIP"')
  AND name LIKE '%John%'
LIMIT 50;

-- Duplicate detection query
SELECT phone, COUNT(*) as count
FROM contacts
WHERE organization_id = ?
GROUP BY phone
HAVING count > 1;
```

**Caching Strategy:**
- Cache contact counts per tag (5 min TTL)
- Cache custom field definitions (1 hour TTL)
- Cache duplicate detection results (manual invalidation)

**Scaling Considerations:**
- **Sharding**: Partition contacts by organization_id
- **Read Replicas**: Offload search queries to replicas
- **Async Import**: Process large imports in background queue
- **Archive Old Contacts**: Move inactive contacts to cold storage after 2 years

### Monitoring & Troubleshooting

**Contact System Health:**
1. Navigate to **Administration** → **System Health** → **Contacts**
2. Monitor:
   - Total contacts (org-wide)
   - Import success rate
   - Duplicate detection accuracy
   - API error rate
   - Storage usage

**Common Admin Issues:**

**Slow contact search:**
- Check full-text index status
- Rebuild indexes if fragmented: `OPTIMIZE TABLE contacts;`
- Consider pagination for large result sets

**Import failures:**
- Review import error logs: `storage/logs/contact-import.log`
- Check for phone format issues (most common)
- Verify Google Sheets are publicly accessible
- Check server memory during large imports

**Duplicate detection missing duplicates:**
- Phone numbers must be exactly identical
- Enable fuzzy name matching for better detection
- Manually merge edge cases

**Custom fields not saving:**
- Check JSON column size limits (64KB default)
- Verify custom field definitions exist
- Check validation rules for field type mismatch

</TabItem>
</Tabs>

---

## Related Documentation

- [Outbound Voice Overview](/voice/outbound/overview)
- [Creating Campaigns](/voice/outbound/campaigns/manager/creating-campaigns)
- [Google Sheets Import](/administration/data-management/data-import/google-sheets)
- [Manual Calling](/voice/outbound/dialer/manager/manual-calling)
- [Data Export](/administration/data-management/data-export)
- [Compliance & Retention](/administration/data-management/compliance-retention)

## Need Help?

- **Managers**: Contact support for contact management assistance
- **Admins**: Check API documentation or contact technical support

---

**Quick Links:**
- [📊 Import from Google Sheets](/administration/data-management/data-import/google-sheets)
- [📞 Use Contacts in Manual Dialer](/voice/outbound/dialer/manager/manual-calling)
- [📈 Create Campaign from Contacts](/voice/outbound/campaigns/manager/creating-campaigns)
