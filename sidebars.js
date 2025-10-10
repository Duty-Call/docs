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

            // Inbound Voice Feature
            {
              type: 'category',
              label: 'Inbound Voice',
              items: [
                'voice/inbound/overview',

                // Role-specific docs
                {
                  type: 'category',
                  label: 'For Admins',
                  items: [
                    'voice/inbound/admin/twilio-setup',
                    'voice/inbound/admin/twiml-configuration',
                    'voice/inbound/admin/webhook-setup',
                    'voice/inbound/admin/queue-configuration',
                  ],
                },
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

            // Outbound Voice Feature
            {
              type: 'category',
              label: 'Outbound Voice',
              items: [
                'voice/outbound/overview',

                // Manual Dialer
                {
                  type: 'category',
                  label: 'Manual Dialer',
                  items: [
                    'voice/outbound/dialer/admin/webrtc-setup',
                    'voice/outbound/dialer/manager/manual-calling',
                  ],
                },

                // Campaigns (Auto-Dialer / Broadcast)
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
              ],
            },

            // Legacy Reporting (keeping for backwards compatibility)
            {
              type: 'category',
              label: 'Reporting',
              items: [
                'voice/reporting/manager/call-history',
                'voice/reporting/manager/queue-metrics',
                'voice/reporting/manager/agent-performance',
              ],
            },
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
      ],
    },
  ],
};

module.exports = sidebars;
