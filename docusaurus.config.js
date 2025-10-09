// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'DutyCall Documentation',
  tagline: 'Contact Center Platform - User Guides & Developer Docs',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://duty-call.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  baseUrl: '/docs/',

  // GitHub pages deployment config.
  organizationName: 'dutycall',
  projectName: 'docs',

  onBrokenLinks: 'throw',
  markdown: {
    mermaid: true,
  },

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: '/', // Serve docs at root
          // Please change this to your repo.
          editUrl: 'https://github.com/dutycall/docs/tree/main/',
        },
        blog: false, // Disable blog
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/dutycall-social-card.jpg',
      navbar: {
        title: 'DutyCall',
        logo: {
          alt: 'DutyCall Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'gettingStarted',
            position: 'left',
            label: 'Getting Started',
          },
          {
            type: 'docSidebar',
            sidebarId: 'voice',
            position: 'left',
            label: 'Voice',
          },
          {
            type: 'docSidebar',
            sidebarId: 'developers',
            position: 'left',
            label: 'Developers',
          },
          {
            href: 'https://github.com/dutycall/docs',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Documentation',
            items: [
              {
                label: 'Getting Started',
                to: '/getting-started/overview',
              },
              {
                label: 'Voice',
                to: '/voice/overview',
              },
            ],
          },
          {
            title: 'Support',
            items: [
              {
                label: 'Contact Support',
                href: 'https://dutycall.com/support',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} DutyCall. Documentation built with Docusaurus.`,
      },
      prism: {
        theme: require('prism-react-renderer').themes.github,
        darkTheme: require('prism-react-renderer').themes.dracula,
        additionalLanguages: ['php', 'bash', 'javascript', 'typescript', 'json'],
      },
    }),
};

module.exports = config;
