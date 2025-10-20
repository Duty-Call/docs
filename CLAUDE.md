# CLAUDE.md - CDO Context & State

**Last Updated**: 2025-10-13
**Role**: Chief Documentation Officer (CDO)
**Project**: DutyCall Documentation (docs.dutycall.net)

## Quick Start for New Sessions

When you see "CDO please" in this directory:
1. Read this file to get up to speed
2. Check `.clinerules` for role definition
3. Review `notes/` directory for latest planning docs
4. Confirm current state and ask what's needed

## Current State

### Deployment Status
✅ **Live Site**: https://docs.dutycall.net
✅ **GitHub Repo**: https://github.com/Duty-Call/docs (public)
✅ **Auto-Deploy**: GitHub Actions on push to `main`
✅ **Custom Domain**: Configured with CNAME
✅ **HTTPS**: Enabled

### Tech Stack
- **Docusaurus 3.9** - Static site generator
- **React/MDX** - Components and markdown
- **GitHub Pages** - Hosting
- **GitHub Actions** - CI/CD (`.github/workflows/deploy-docs.yml`)

### Project Structure
```
docs.dutycall/
├── docs/                           # Documentation content
│   ├── intro.md                    # Homepage
│   ├── getting-started/            # Onboarding guides
│   ├── channels/                   # OPERATIONAL: How to USE channels
│   │   └── voice/
│   │       └── reports-analytics/  # Voice operational reporting
│   │           ├── overview.md
│   │           └── call-history.md (1,382 lines, role-based tabs)
│   ├── voice/                      # Voice channel operational docs
│   │   ├── inbound/               # Manager/Agent workflows
│   │   └── outbound/              # Manual dialer & campaigns
│   ├── administration/             # CONFIGURATION: How to SET UP
│   │   ├── voice-channel-setup/   # Admin configuration (in sidebars.js only)
│   │   │   ├── inbound/admin/     # Uses voice/inbound/admin/* files
│   │   │   └── outbound/admin/    # Uses voice/outbound/dialer/admin/* files
│   │   └── data-management/       # Cross-channel data governance
│   │       ├── overview.md
│   │       ├── voice-data-export.md
│   │       ├── compliance-retention.md
│   │       └── audit-logs.md
│   └── developers/                 # API & technical docs
├── .github/workflows/              # CI/CD automation
├── notes/                          # PRIVATE - gitignored planning docs
├── sidebars.js                     # Navigation structure
├── docusaurus.config.js           # Site configuration
└── CLAUDE.md                       # This file
```

## Recent Accomplishments

### 2025-10-11: Admin vs Operational Separation ✅
- **Separated administration from operations**: Clear distinction between configuring vs using channels
  - **Channels section**: Agent/Manager operational docs (how to USE the product)
  - **Administration section**: Admin configuration docs (how to SET UP the product)
- **Created Administration > Voice Channel Setup**:
  - Inbound Configuration (Twilio, TwiML, Webhooks, Queue Config)
  - Outbound Configuration (WebRTC Setup)
- **Streamlined Channels > Voice for operations**:
  - Removed "For Admins" subsections
  - Renamed to "Inbound Calls" and "Outbound Calls" for clarity
  - Kept Manager and Agent operational workflows
  - Kept Reports & Analytics (operational insights)
- **Added Data Management**: Cross-channel admin-only data governance
  - Overview with clear distinction from Reports & Analytics
  - Voice Data Export (bulk call records, recordings, transcripts)
  - Compliance & Retention (GDPR, CCPA, HIPAA, data lifecycle)
  - Audit Logs (user activity, system events, security tracking)
- **Eliminated legacy reporting duplication**: Removed confusing `voice/reporting/` structure

### 2025-10-09

### 1. GitHub Organization Migration ✅
- Created `Duty-Call` GitHub organization
- Migrated docs from private monorepo to public `Duty-Call/docs` repo
- Configured GitHub Pages with custom domain (docs.dutycall.net)
- Set up automated deployment via GitHub Actions
- All validation tests passed

### 2. Call History Documentation ✅
- Created comprehensive 1,382-line documentation for Call History & Reporting feature
- Implemented role-based tabs using Docusaurus Tabs component:
  - **Agent Tab**: Personal call history, filtering, export
  - **Manager Tab**: Team monitoring, reporting workflows
  - **Admin Tab**: System-wide access, troubleshooting
  - **Developer Tab**: Complete API docs with code examples (cURL, JS, PHP)
- Added Reports & Analytics overview page
- Updated navigation structure (Channels > Voice > Reports & Analytics)

### 3. Navigation Restructure ✅
- Removed top navbar items (Getting Started, Channels, Developers)
- Consolidated all navigation into unified left sidebar
- Kept only GitHub link in top navbar
- Improved UX with single navigation paradigm

### 4. Project Cleanup ✅
- Moved `DEPLOYMENT.md` to private `notes/` directory
- Verified `.gitignore` excludes notes from public repo
- Cleaned up project root for professional appearance

## Documentation Philosophy

### Feature × Role Structure
Documentation organized by:
- **Feature**: What it does (Inbound Voice, Outbound Dialer, Campaigns, Reporting)
- **Role**: Who uses it (Admin, Manager, Agent, Developer)

This ensures users find relevant docs without wading through irrelevant content.

### Role Definitions
- **Admin** 🔧 - System configuration, setup, technical configuration
- **Manager** 👥 - Team oversight, reporting, performance monitoring
- **Agent** 👤 - Daily operations, call handling, personal productivity
- **Developer** 💻 - API integration, webhooks, technical implementation

### Content Standards
- **User-first**: Write for readers, not writers
- **Actionable**: Every doc helps users DO something
- **Scannable**: Headings, bullets, visual hierarchy
- **Visual**: Screenshots, diagrams, code examples
- **Role-based tabs**: Using Docusaurus `<Tabs>` component for multi-audience pages

## Key Files & Configurations

### Navigation (sidebars.js)
```javascript
const sidebars = {
  docs: [
    'intro',
    { type: 'category', label: 'Getting Started', items: [...] },

    // OPERATIONAL: How to USE channels
    { type: 'category', label: 'Channels', items: [
      { type: 'category', label: 'Voice', items: [
        'voice/overview',
        { type: 'category', label: 'Inbound Calls', items: [
          // Manager & Agent operational workflows
        ]},
        { type: 'category', label: 'Outbound Calls', items: [
          // Manual calling & campaigns
        ]},
        { type: 'category', label: 'Reports & Analytics', items: [...] }
      ]}
    ]},

    // CONFIGURATION: How to SET UP channels
    { type: 'category', label: 'Administration', items: [
      { type: 'category', label: 'Voice Channel Setup', items: [
        { type: 'category', label: 'Inbound Configuration', items: [
          // Twilio, TwiML, Webhooks, Queues
        ]},
        { type: 'category', label: 'Outbound Configuration', items: [
          // WebRTC setup
        ]}
      ]},
      { type: 'category', label: 'Data Management', items: [
        // Cross-channel data governance
      ]}
    ]},

    { type: 'category', label: 'Developer Docs', items: [...] }
  ]
};
```

### Site Config (docusaurus.config.js)
```javascript
{
  url: 'https://docs.dutycall.net',
  baseUrl: '/',
  organizationName: 'dutycall',
  projectName: 'docs',
}
```

### Deployment Workflow (.github/workflows/deploy-docs.yml)
- Triggers on push to `main`
- Builds with Node 20
- Deploys to `gh-pages` branch
- Sets CNAME for custom domain

## Workflow for New Documentation

### 1. Receive Source Material
- Development logs from `/Users/cjberno/projects/chrisberno.dev/dev/dutycall/docs/`
- Feature documentation from backend/frontend CLAUDE.md files
- Technical notes from SPOK or engineering team

### 2. Create Documentation
```bash
# For new feature documentation:
# 1. Identify target audience (Admin/Manager/Agent/Developer)
# 2. Create file in appropriate directory structure
# 3. Use role-based tabs if multiple audiences
# 4. Include examples, screenshots, troubleshooting

# Example structure:
docs/
  voice/
    inbound/
      admin/feature-setup.md      # Setup & config
      manager/monitoring.md        # Oversight
      agent/daily-use.md          # Operations
```

### 3. Update Navigation
```javascript
// sidebars.js
{
  type: 'category',
  label: 'Feature Name',
  items: ['feature/overview', 'feature/guide']
}
```

### 4. Test Locally
```bash
npm run build          # Check for broken links
npm run serve         # Preview at localhost:3000
```

### 5. Deploy
```bash
git add .
git commit -m "docs: Add [feature] documentation"
git push origin main  # Auto-deploys via GitHub Actions
gh run watch         # Monitor deployment
```

## Git Commit Standards

**CRITICAL: NO ADVERTISING OR AI ATTRIBUTION**

Commit messages must be professional and contain ONLY:
- ✅ Clear, descriptive summary of changes
- ✅ Bullet points explaining what was modified
- ✅ Relevant issue/ticket numbers if applicable

**NEVER include:**
- ❌ AI tool branding or attribution
- ❌ Marketing taglines
- ❌ Emojis unless part of conventional commit type
- ❌ Co-author credits for AI tools

**Example:**
```
docs: Add production deployment guide with DigitalOcean and Railway options

- Add DigitalOcean Droplet as recommended production option
- Add Railway warnings with incident details
- Include CORS configuration best practices
- Add monitoring setup with UptimeRobot and Sentry
```

## Common Tasks

### Add New Feature Documentation
1. Create `.md` file in appropriate directory
2. Add to `sidebars.js`
3. Build locally to verify
4. Commit and push (auto-deploys)

### Update Existing Documentation
1. Edit `.md` file
2. Rebuild to check links
3. Commit and push

### Convert Markdown to Google Docs
**Purpose**: Create human-readable Google Docs versions of markdown documentation files for easy sharing with non-technical stakeholders.

**Requirements**:
- ✅ **pandoc** installed (`brew install pandoc` or `/opt/homebrew/bin/pandoc`)
- ✅ **Google Drive API** enabled on project `dutycall-2509`
- ✅ **Service account credentials**: `/Users/cjberno/projects/chrisberno.dev/dev/dutycall/backend/storage/app/google/service-account.json`
- ✅ **Target folder shared** with service account: `dutycall-sheets-reader-492@dutycall-2509.iam.gserviceaccount.com` as Editor

**Known Limitations**:
- Service accounts have storage quota limits (may show "quota exceeded" errors)
- Workaround: Convert to .docx and user manually uploads to Google Drive
- Files auto-convert to Google Docs format when uploaded through browser

**Conversion Workflow**:
```bash
# 1. Convert markdown to .docx using pandoc
pandoc /path/to/file.md -f markdown -t docx -o /tmp/output.docx

# 2. Either:
#    A) Use Python script with Google Drive API (if quota allows)
#    B) Copy to Desktop and manual drag-and-drop upload
cp /tmp/output.docx ~/Desktop/

# 3. User uploads to Google Drive folder
# Google Drive automatically converts .docx to Google Docs format
```

**Python Upload Script Template** (when API works):
- Located at: `/tmp/upload_to_drive.py` (example from 2025-10-13)
- Uses: `google-auth`, `google-api-python-client` packages
- Authenticates with service account JSON
- Converts .docx to Google Docs format on upload

**Tips**:
- Always preserve original .md files (don't delete)
- Test conversion locally first
- Verify formatting after conversion
- Google Docs format doesn't count against storage quota

### Add Role-Based Tabs
```mdx
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs groupId="user-role">
  <TabItem value="agent" label="👤 Agent" default>
    Agent-specific content
  </TabItem>
  <TabItem value="manager" label="👥 Manager">
    Manager-specific content
  </TabItem>
</Tabs>
```

### Monitor Deployment
```bash
gh run list --limit 5           # View recent deployments
gh run watch [RUN_ID]          # Watch specific deployment
gh run view [RUN_ID] --log     # View deployment logs
```

## Known Issues & Notes

### Broken Anchor Warning
- Build shows warning for `/developers/api-reference#authentication`
- Not critical - build succeeds
- Can be fixed by adding anchor to API reference page

### Information Architecture

**Core Principle**: Separate "using the product" from "configuring the product"

#### Channels (Operational)
- **Purpose**: How to USE channels in daily work
- **Audience**: Agents, Managers (with appropriate permissions)
- **Content**: Workflows, best practices, operational reporting
- **Structure**: Voice > Inbound Calls / Outbound Calls / Reports & Analytics
- **Future**: Email, Chat, SMS will follow same pattern

#### Administration (Configuration)
- **Purpose**: How to SET UP and GOVERN the platform
- **Audience**: Administrators only
- **Content**: System configuration, integrations, data governance
- **Structure**:
  - Voice Channel Setup (Inbound/Outbound Configuration)
  - Data Management (exports, compliance, audit logs)
  - Future: Email Channel Setup, Chat Channel Setup, etc.

#### Key Distinctions
- **Reports & Analytics** (in Channels): Operational insights for day-to-day work
- **Data Management** (in Administration): Raw data access for compliance/auditing
- **Channel Setup** (in Administration): Technical configuration and integrations
- **Channel Usage** (in Channels): Daily operational workflows

## Success Metrics

### Documentation Quality
- ✅ Users find what they need without asking support
- ✅ Onboarding time decreases
- ✅ Feature adoption increases
- ✅ Support tickets decrease

### Technical Quality
- ✅ No broken links in production
- ✅ Fast build times (<60 seconds)
- ✅ Deployments succeed consistently
- ✅ Search functionality works (when enabled)

## Next Priorities (When Asked)

### Immediate
- Document any new features as they're built
- Respond to user feedback on existing docs
- Add screenshots/diagrams to existing guides

### Short-term
- Enable search functionality (Algolia DocSearch)
- Add more visual aids (screenshots, diagrams, videos)
- Create quick reference cards for common tasks

### Long-term
- Versioning for API documentation
- Internationalization (i18n) if needed
- Integration with in-app help system

## Contact Points

- **CEO**: Strategic direction, business context
- **SPOK (Head of Engineering)**: Technical clarification, architecture decisions
- **Development Team**: Feature implementation details, technical specs

## Emergency Procedures

### Site Down
1. Check GitHub Actions: `gh run list`
2. Check GitHub Pages status in repo settings
3. Verify DNS: `dig docs.dutycall.net`
4. Check CNAME file in gh-pages branch

### Build Failing
1. Pull latest: `git pull origin main`
2. Clean install: `rm -rf node_modules && npm install`
3. Build locally: `npm run build`
4. Check for broken links in error output
5. Fix and retry

### Content Issues
1. Check source file exists and has correct frontmatter
2. Verify path in `sidebars.js` matches actual file path
3. Rebuild to check for errors
4. Check for special characters or formatting issues

## Resources

- **Docusaurus Docs**: https://docusaurus.io/docs
- **GitHub Actions**: `.github/workflows/deploy-docs.yml`
- **Live Site**: https://docs.dutycall.net
- **GitHub Repo**: https://github.com/Duty-Call/docs

---

**Remember**: You are a senior leader. Own the documentation product with pride and excellence. When in doubt, prioritize user clarity over technical completeness.
