---
id: overview
title: Data Import
sidebar_label: Overview
sidebar_position: 1
---

# Data Import

:::info Manager+ Feature
Data import capabilities are available to **Department Manager** and **Administrator** roles only.
:::

## Overview

DutyCall's data import features allow you to bring contact data into the platform from external sources for use in campaigns, call lists, and customer management.

## Import Sources

### Google Sheets
Import contact lists directly from Google Sheets using public share URLs. No authentication required - just share your sheet publicly and paste the link.

**Use cases:**
- Bulk import campaign contacts
- Sync customer lists from external systems
- Import volunteer/agent contact databases
- Load testing data

[Learn more about Google Sheets import →](/administration/data-management/data-import/google-sheets)

## Import Workflow

All imports follow a standard workflow:

1. **Source Selection**: Choose your data source (Google Sheets, CSV upload, etc.)
2. **Data Fetch**: System retrieves and parses the data
3. **Preview**: Review the data before importing
4. **Column Mapping**: Map source columns to DutyCall contact fields
5. **Validation**: System checks data format and required fields
6. **Import**: Data is loaded into your contact database
7. **Confirmation**: Review import results and any errors

## Security & Privacy

### Read-Only Operations
All import operations are **read-only**:
- DutyCall never writes to your external sources
- No modifications to your Google Sheets or files
- One-way data flow (source → DutyCall)

### Data Handling
- Imported data is stored securely in your DutyCall account
- Access controlled by role permissions
- Data subject to your organization's retention policies
- Can be deleted via Data Management tools

### Public Sheet Requirements
For Google Sheets imports:
- Sheet must be publicly accessible (view-only link sharing)
- No Google account authentication required
- DutyCall does not access private/restricted sheets

## Coming Soon

Future import sources will include:
- **Direct CSV Upload**: Upload files from your computer
- **Salesforce Integration**: Sync contacts from Salesforce CRM
- **HubSpot Integration**: Import from HubSpot contact database
- **API-based Import**: Programmatic bulk imports via REST API
- **Scheduled Imports**: Automatic periodic syncs from external sources

---

**Ready to import contacts?** Start with [Google Sheets Import →](/administration/data-management/data-import/google-sheets)
