// @ts-check
// Docusaurus config for the COMET Standard reference site.
// Reference pages are generated from ../standard/*.yaml by scripts/generate.js
// (run automatically via the prebuild / prestart npm hooks).

const { themes } = require('prism-react-renderer');

const meta = require('./src/data/meta.json');

// Deploy target.
//   default        -> the GitHub Pages *project* URL, served under /COMET/.
//                     Everything (assets, links, search) works at
//                     https://comics-industry-comet-standard.github.io/COMET/
//   COMET_DEPLOY_TARGET=production -> the custom domain at its root (/).
//                     Also makes scripts/generate.js emit static/CNAME so Pages
//                     switches to docs.cometstandard.com on deploy.
// To publish at the custom domain later:  COMET_DEPLOY_TARGET=production npm run build
const isProd = process.env.COMET_DEPLOY_TARGET === 'production';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'COMET Standard',
  tagline: 'The open metadata standard for the comics industry',
  favicon: 'img/favicon.png',

  url: isProd ? `https://${meta.deployDomain}` : 'https://comics-industry-comet-standard.github.io',
  baseUrl: isProd ? '/' : '/COMET/',

  organizationName: 'Comics-Industry-COMET-standard',
  projectName: 'COMET',

  // Broken links must fail the build (acceptance check M2).
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'throw',

  markdown: {
    // .md -> CommonMark (lenient with prose from YAML), .mdx -> MDX.
    format: 'detect',
  },

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
          path: 'docs',
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/Comics-Industry-COMET-standard/COMET/tree/main/',
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themes: [
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      /** @type {import('@easyops-cn/docusaurus-search-local').PluginOptions} */
      ({
        hashed: true,
        indexBlog: false,
        docsRouteBasePath: '/',
        highlightSearchTermsOnTargetPage: true,
        explicitSearchResultPath: true,
      }),
    ],
  ],

  /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
  themeConfig: {
    image: 'img/comet-social-card.png',
    colorMode: {
      defaultMode: 'dark',
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'COMET Standard',
      logo: {
        alt: 'COMET Standard',
        src: 'img/logo.png',
        srcDark: 'img/logo-white.png',
      },
      items: [
        { to: '/data-dictionary', label: 'Data Dictionary', position: 'left' },
        { to: '/fields/essential', label: 'Fields', position: 'left' },
        { to: '/picklists', label: 'Picklists', position: 'left' },
        { to: '/implementation-guide', label: 'Guide', position: 'left' },
        {
          label: `v${meta.version}`,
          position: 'right',
          to: '/changelog',
        },
        {
          href: 'https://cometstandard.com',
          label: 'cometstandard.com',
          position: 'right',
        },
        {
          href: 'https://github.com/Comics-Industry-COMET-standard/COMET',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Reference',
          items: [
            { label: 'Data Dictionary', to: '/data-dictionary' },
            { label: 'Fields', to: '/fields/essential' },
            { label: 'Picklists', to: '/picklists' },
            { label: 'Changelog', to: '/changelog' },
          ],
        },
        {
          title: 'Learn',
          items: [
            { label: 'Implementation Guide', to: '/implementation-guide' },
            { label: 'White Paper', to: '/white-paper' },
          ],
        },
        {
          title: 'More',
          items: [
            { label: 'cometstandard.com', href: 'https://cometstandard.com' },
            { label: 'ComicsPRO', href: 'https://comicspro.org' },
            { label: 'GitHub', href: 'https://github.com/Comics-Industry-COMET-standard/COMET' },
          ],
        },
      ],
      copyright:
        `The COMET Standard v${meta.version} · © ComicsPRO. ` +
        'Licensed under <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>. ' +
        'Generated directly from the standard’s YAML — this reference cannot drift from the source.',
    },
    prism: {
      theme: themes.github,
      darkTheme: themes.dracula,
      additionalLanguages: ['yaml', 'json'],
    },
  },
};

module.exports = config;
