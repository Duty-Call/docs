/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // Main unified sidebar with all sections
  docs: [
    'intro',

    // Getting Started
    {
      type: 'category',
      label: 'Getting Started',
      items: [
        'getting-started/overview',
        'getting-started/quick-start-admin',
        'getting-started/quick-start-manager',
        'getting-started/quick-start-agent',
      ],
    },

    // Channels
    {
      type: 'category',
      label: 'Channels',
      items: [
        // Voice Channel
        {
          type: 'category',
          label: 'Voice',
          items: [
            'voice/overview',

            // Inbound Voice - Operational
            {
              type: 'category',
              label: 'Inbound Calls',
              items: [
                'voice/inbound/overview',
                {
                  type: 'category',
                  label: 'For Managers',
                  items: [
                    'voice/inbound/manager/monitoring-queue',
                    'voice/inbound/manager/agent-availability',
                    'voice/inbound/manager/queue-metrics',
                  ],
                },
                {
                  type: 'category',
                  label: 'For Agents',
                  items: [
                    'voice/inbound/agent/accepting-calls',
                    'voice/inbound/agent/call-controls',
                    'voice/inbound/agent/wrap-up-workflow',
                    'voice/inbound/agent/troubleshooting',
                  ],
                },
              ],
            },

            // Outbound Voice - Operational
            {
              type: 'category',
              label: 'Outbound Calls',
              items: [
                'voice/outbound/overview',
                'voice/outbound/dialer/manager/manual-calling',
                {
                  type: 'category',
                  label: 'Campaigns',
                  items: [
                    'voice/outbound/campaigns/manager/creating-campaigns',
                    'voice/outbound/campaigns/manager/contact-management',
                    'voice/outbound/campaigns/manager/google-sheets-import',
                  ],
                },
              ],
            },

            // Reports & Analytics
            {
              type: 'category',
              label: 'Reports & Analytics',
              items: [
                'channels/voice/reports-analytics/overview',
                'channels/voice/reports-analytics/call-history',
                'channels/voice/reports-analytics/analytics-dashboard',
              ],
            },
          ],
        },
      ],
    },

    // Administration
    {
      type: 'category',
      label: 'Administration',
      items: [
        // Roles & Permissions
        {
          type: 'category',
          label: 'Roles & Permissions',
          items: [
            'administration/roles-permissions/overview',
          ],
        },

        // Voice Channel Setup
        {
          type: 'category',
          label: 'Voice Channel Setup',
          items: [
            {
              type: 'category',
              label: 'Inbound Configuration',
              items: [
                'voice/inbound/admin/twilio-setup',
                'voice/inbound/admin/twiml-configuration',
                'voice/inbound/admin/webhook-setup',
                'voice/inbound/admin/queue-configuration',
              ],
            },
            {
              type: 'category',
              label: 'Outbound Configuration',
              items: [
                'voice/outbound/dialer/admin/webrtc-setup',
              ],
            },
          ],
        },

        // Data Management
        {
          type: 'category',
          label: 'Data Management',
          items: [
            'administration/data-management/overview',
            {
              type: 'category',
              label: 'Data Import',
              items: [
                'administration/data-management/data-import/overview',
                'administration/data-management/data-import/google-sheets',
              ],
            },
            'administration/data-management/data-export',
            'administration/data-management/compliance-retention',
            'administration/data-management/audit-logs',
          ],
        },
      ],
    },

    // Developers
    {
      type: 'category',
      label: 'Developer Docs',
      items: [
        'developers/overview',
        'developers/api-reference',
        'developers/webhooks',
        'developers/call-state-lifecycle',
        'developers/webrtc-patterns',

        // Deployment
        {
          type: 'category',
          label: 'Deployment',
          items: [
            {
              type: 'category',
              label: 'Backend Deployment',
              items: [
                'developers/deployment/backend/railway',
              ],
            },
          ],
        },
      ],
    },
  ],
};

module.exports = sidebars;
