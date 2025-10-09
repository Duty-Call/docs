# DutyCall Documentation Deployment Guide

## Overview

DutyCall documentation is built with Docusaurus and follows a **Feature × Role** structure inspired by Connie docs. The documentation is designed to be deployed to GitHub Pages.

## Local Development

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Serve production build locally
npm run serve
```

## Documentation Structure

```
docs/
├── intro.md                    # Homepage (/)
├── getting-started/            # Onboarding guides
├── voice/                      # Voice features
│   ├── inbound/               # Inbound queues
│   │   ├── admin/            # Admin guides
│   │   ├── manager/          # Manager guides
│   │   └── agent/            # Agent guides
│   ├── outbound/             # Outbound dialer/campaigns
│   └── reporting/            # Call reporting
└── developers/               # API docs & technical patterns
```

## Feature × Role Matrix

Documentation is organized by **Feature** (what it does) × **Role** (who uses it):

- **Features**: Inbound Voice, Outbound Dialer, Campaigns, Reporting
- **Roles**: Admin (setup), Manager (oversight), Agent (daily use)

This ensures users can quickly find relevant docs without wading through irrelevant content.

## CDO (Chief Documentation Officer)

To summon the CDO agent:

```bash
cd docs.dutycall
claude
```

Then say: **"CDO please"**

The CDO will assist with:
- Writing documentation
- Maintaining consistency
- Creating training materials
- Managing knowledge base

## GitHub Pages Deployment

### Automatic Deployment (Recommended)

Documentation automatically deploys to GitHub Pages via GitHub Actions on every push to `main` branch.

**Workflow:** `.github/workflows/deploy-docs.yml`
**Deployed URL:** https://docs.dutycall.com (or https://dutycall.github.io)

**How it works:**
1. Push changes to `main` branch (in `docs.dutycall/` directory)
2. GitHub Actions automatically builds the site
3. Deploys to `gh-pages` branch
4. Live at custom domain within 1-2 minutes

**Monitor deployment:**
```bash
gh run watch
```

**View deployment history:**
```bash
gh run list --workflow=deploy-docs.yml
```

### Manual Deployment (Fallback Only)

Only use if GitHub Actions fails:

```bash
# Build the docs
npm run build

# Deploy to gh-pages branch
GIT_USER=<Your GitHub username> npm run deploy
```

### Custom Domain Setup

The workflow automatically configures the custom domain via the `cname` parameter.

**DNS Configuration Required:**

```
Type: CNAME
Name: docs
Value: dutycall.github.io
TTL: 3600
```

**Verify domain:**
```bash
dig docs.dutycall.com
```

**GitHub Pages Settings:**
- GitHub automatically creates CNAME file from workflow
- Enable HTTPS in repo settings (Settings > Pages > Enforce HTTPS)

## Static Assets

Place static files in `static/` directory:

- `static/img/` - Images, logos, icons
- `static/downloads/` - Downloadable files
- `static/CNAME` - Custom domain configuration

## Configuration Files

- `docusaurus.config.js` - Site configuration, navbar, footer
- `sidebars.js` - Sidebar structure and navigation
- `src/css/custom.css` - Custom styling
- `.clinerules` - CDO agent configuration

## Tech Stack

- **Docusaurus** - Static site generator
- **React** - UI framework
- **MDX** - Markdown with React components
- **Mermaid** - Diagram support enabled
- **Prism** - Code syntax highlighting (PHP, JS, TS, JSON, Bash)

## Content Guidelines

1. **No Connie content** - Infrastructure only, zero content cross-contamination
2. **Feature × Role** - Organize by what it does and who uses it
3. **Concise** - Clear, actionable documentation
4. **Screenshots** - Use visual aids where helpful
5. **Examples** - Provide code samples and real-world scenarios

## Build Output

Production build generates static files in `build/` directory:

```
build/
├── index.html              # Homepage
├── getting-started/        # Guide pages
├── voice/                  # Voice docs
├── developers/            # API docs
└── assets/               # CSS, JS, images
```

## Troubleshooting

### Build Errors

If build fails with broken links:
- Check all internal links use correct paths
- Ensure all sidebar items reference existing files
- Verify homepage exists at `docs/intro.md` with `slug: /`

### Port Already in Use

```bash
# Use different port
npm run serve -- --port 3001
```

### Missing Static Assets

- Ensure `static/img/logo.svg` exists
- Ensure `static/img/favicon.ico` exists
- All static files must be in `static/` directory

## GitHub Organization Migration

See `notes/GITHUB_ORG_MIGRATION.md` for full plan to migrate from personal repo to `dutycall` organization.

**Status:** Pending SPOK review

## Next Steps

1. ✅ Build working successfully
2. ✅ GitHub Actions workflow created (`.github/workflows/deploy-docs.yml`)
3. ⏳ Migrate to `dutycall` GitHub organization
4. ⏳ Enable GitHub Pages deployment
5. ⏳ Configure custom domain DNS (docs.dutycall.com)
6. ⏳ Populate stub documentation with real content
7. ⏳ Add screenshots and diagrams
8. ⏳ Enable search functionality (Algolia DocSearch)
9. ⏳ Add versioning for API docs
