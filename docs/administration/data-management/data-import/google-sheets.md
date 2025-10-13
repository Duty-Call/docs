---
id: google-sheets
title: Import from Google Sheets
sidebar_label: Google Sheets
sidebar_position: 2
---

# Import Contacts from Google Sheets

:::info Manager+ Only
This feature is available to **Department Managers** and **Administrators** only.
:::

## Overview

Import contact lists directly from Google Sheets into DutyCall for use in campaigns and call management. The import process is simple, read-only, and requires no Google authentication.

## How It Works

DutyCall connects to your **publicly shared** Google Sheet, fetches the data in CSV format, and allows you to map columns to contact fields before importing.

### Key Features

- ✅ **Read-only**: DutyCall never modifies your Google Sheet
- ✅ **No authentication**: Works with public share links (no Google login required)
- ✅ **Preview before import**: See and verify data before committing
- ✅ **Column mapping**: Match your sheet columns to DutyCall contact fields
- ✅ **Validation**: System checks data format and required fields

## Step-by-Step Import Process

### 1. Prepare Your Google Sheet

**Required setup:**

1. Open your Google Sheet with contact data
2. Make sure your data has **column headers** in the first row
3. Click **Share** button (top right)
4. Choose **"Anyone with the link"** can view
5. Copy the share URL

**Example sheet structure:**

| Name | Phone | Email | Notes |
|------|-------|-------|-------|
| John Doe | +15551234567 | john@example.com | VIP customer |
| Jane Smith | +15559876543 | jane@example.com | Follow up needed |

:::tip Best Practices
- Use **E.164 format** for phone numbers (+1XXXXXXXXXX)
- Include column headers in row 1
- Remove any blank rows at the top
- Keep data clean (no merged cells, formulas in data rows)
:::

### 2. Share Your Sheet Publicly

**Security note**: Only share sheets with non-sensitive data. Anyone with the link can view the sheet.

**Steps:**
1. Click **Share** button
2. Under "General access", select **"Anyone with the link"**
3. Set permission to **"Viewer"** (not Editor)
4. Click **"Copy link"**
5. Click **"Done"**

Your link will look like:
```
https://docs.google.com/spreadsheets/d/ABC123.../edit?usp=sharing
```

### 3. Import in DutyCall

1. Navigate to **Campaigns** or **Contacts** section
2. Click **"Import from Google Sheets"** button
3. Paste your public share URL
4. Click **"Fetch Data"**

DutyCall will retrieve and parse your sheet data.

### 4. Preview Data

After fetching, you'll see a **preview** of your sheet data:
- First 10-20 rows displayed
- Column headers shown
- Total row count indicated

**Review for:**
- ✅ Correct data loaded
- ✅ Proper column headers
- ✅ No formatting issues
- ✅ Expected number of contacts

### 5. Map Columns to Fields

Map your Google Sheet columns to DutyCall contact fields:

| Your Column | Maps To | Required? |
|-------------|---------|-----------|
| Name | Contact Name | Optional |
| Phone | Phone Number | **Required** |
| Email | Email Address | Optional |
| Notes | Notes/Description | Optional |
| Custom Field 1 | Custom Field | Optional |

**Required fields:**
- **Phone Number** must be provided for all contacts
- Use E.164 format (+1XXXXXXXXXX) for best results

:::warning Phone Number Format
Phone numbers must include country code. Examples:
- ✅ `+15551234567` (correct)
- ❌ `(555) 123-4567` (missing country code)
- ❌ `5551234567` (missing + and country code)
:::

### 6. Validate & Import

1. Click **"Validate Data"** to check for errors
2. System will report:
   - Valid contacts ready to import
   - Invalid/skipped rows (with reasons)
   - Duplicate phone numbers (if any)
3. Review validation results
4. Click **"Import Contacts"** to complete

### 7. Confirmation

After import completes:
- ✅ Success message with count of imported contacts
- ⚠️ Warning if any rows were skipped (with details)
- 📊 Option to view imported contacts

## Technical Details

### How DutyCall Accesses Your Sheet

**Read-only CSV export:**

1. DutyCall takes your public share URL
2. Converts it to a CSV export URL (Google Sheets API endpoint)
3. Fetches sheet data as CSV text
4. Parses CSV into structured data
5. Displays preview and mapping interface

**No authentication flow:**
- No OAuth tokens stored
- No access to your Google account
- Works entirely via public share URLs
- Zero write permissions to your sheets

### Supported Data Types

| Column Type | Supported | Notes |
|-------------|-----------|-------|
| Text | ✅ | Names, notes, descriptions |
| Phone numbers | ✅ | Must include country code |
| Email addresses | ✅ | Validated for format |
| Numbers | ✅ | Contact IDs, custom numeric fields |
| Dates | ⚠️ | Parsed as text (format may vary) |
| Formulas | ❌ | Only cell values imported (not formulas) |
| Links | ⚠️ | Imported as plain text |

### Current Limitations

- **Public sheets only**: Cannot access private/restricted Google Sheets
- **CSV parsing**: Data is parsed as CSV (some complex formatting may be lost)
- **No real-time sync**: Import is a one-time operation (not continuous sync)
- **Row limit**: Performance may degrade with sheets >10,000 rows
- **No authentication**: Cannot access sheets requiring Google login

## Troubleshooting

### "Failed to fetch sheet data"

**Possible causes:**
1. Sheet is not publicly shared
2. Invalid share URL
3. Sheet was deleted or permissions changed

**Solutions:**
- Re-check share settings ("Anyone with the link" → Viewer)
- Copy the share URL again
- Test the URL in an incognito browser window

### "Phone number format invalid"

**Problem**: Phone numbers don't include country code or proper format.

**Solutions:**
- Add country code column in your sheet (e.g., "+1" for US)
- Use formula in Google Sheets: `=CONCATENATE("+1", A2)` to prepend +1
- Format as text (not number) to preserve leading "+"

### "No data found in sheet"

**Possible causes:**
1. Sheet is empty
2. No column headers in row 1
3. All rows are blank

**Solutions:**
- Ensure row 1 has column headers
- Check that data starts in row 2
- Remove any blank rows at the top of the sheet

### "Import succeeded but some rows skipped"

**Common reasons for skipped rows:**
- Missing required phone number
- Invalid phone number format
- Duplicate phone number already in database
- Empty rows in the sheet

**Review** the import summary to see which rows were skipped and why.

## Best Practices

### Data Preparation
1. **Clean your data** before import (remove duplicates, fix formatting)
2. **Use consistent phone format** (all E.164 with country code)
3. **Test with a small sample** (10-20 rows) before importing thousands
4. **Keep a backup** of your Google Sheet before large imports

### Security
1. **Only share non-sensitive data** publicly
2. **Revoke public access** after import completes (optional)
3. **Don't include passwords, SSNs, or highly sensitive info** in public sheets
4. **Monitor who has access** to your shared sheet links

### Performance
1. **Split large imports** (>5,000 rows) into multiple sheets if needed
2. **Remove unnecessary columns** before importing (faster processing)
3. **Import during off-peak hours** for large datasets

## Related Documentation

- [Data Import Overview](/administration/data-management/data-import/overview)
- [Creating Campaigns](/voice/outbound/campaigns/manager/creating-campaigns)
- [Contact Management](/voice/outbound/campaigns/manager/contact-management)

---

**Need help with imports?** Contact support or check the troubleshooting section above.
