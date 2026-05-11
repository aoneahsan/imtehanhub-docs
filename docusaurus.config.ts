import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const SITE_URL = 'https://imtehanhub-docs.aoneahsan.com';
const APP_URL = 'https://imtehanhub.aoneahsan.com';
const GITHUB_URL = 'https://github.com/aoneahsan/imtehanhub-docs';

const config: Config = {
  title: 'ImtehanHub Docs',
  tagline: 'Pakistani exam prep — bilingual (Urdu + English), Class 5 to 2nd Year. Free for students.',
  favicon: 'img/favicon.svg',

  future: {
    v4: true,
    faster: true,
  },

  url: SITE_URL,
  baseUrl: '/',

  organizationName: 'aoneahsan',
  projectName: 'imtehanhub-docs',
  trailingSlash: false,

  onBrokenLinks: 'throw',
  onBrokenAnchors: 'warn',

  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  headTags: [
    {
      tagName: 'link',
      attributes: {rel: 'preconnect', href: 'https://fonts.googleapis.com'},
    },
    {
      tagName: 'link',
      attributes: {rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous'},
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap',
      },
    },
    {
      tagName: 'meta',
      attributes: {name: 'author', content: 'Ahsan Mahmood (aoneahsan@gmail.com)'},
    },
    {
      tagName: 'meta',
      attributes: {name: 'application-name', content: 'ImtehanHub Docs'},
    },
    {
      tagName: 'meta',
      attributes: {name: 'theme-color', content: '#059669'},
    },
    {
      tagName: 'link',
      attributes: {rel: 'canonical', href: SITE_URL},
    },
    {
      tagName: 'script',
      attributes: {type: 'application/ld+json'},
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'WebSite',
            '@id': `${SITE_URL}/#website`,
            url: SITE_URL,
            name: 'ImtehanHub Docs',
            description:
              'Official documentation for ImtehanHub — Pakistani exam preparation platform covering Class 5 to 2nd Year (FA/FSc), bilingual (Urdu + English), free for students.',
            inLanguage: 'en',
            publisher: {'@id': `${SITE_URL}/#organization`},
          },
          {
            '@type': 'Organization',
            '@id': `${SITE_URL}/#organization`,
            name: 'ImtehanHub',
            url: APP_URL,
            logo: `${SITE_URL}/img/logo.svg`,
            sameAs: [APP_URL, GITHUB_URL, 'https://aoneahsan.com', 'https://linkedin.com/in/aoneahsan'],
            founder: {
              '@type': 'Person',
              name: 'Ahsan Mahmood',
              email: 'aoneahsan@gmail.com',
              url: 'https://aoneahsan.com',
              sameAs: ['https://linkedin.com/in/aoneahsan', 'https://github.com/aoneahsan'],
            },
          },
          {
            '@type': 'SoftwareApplication',
            name: 'ImtehanHub',
            applicationCategory: 'EducationApplication',
            operatingSystem: 'Web, Android',
            url: APP_URL,
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'PKR',
              availability: 'https://schema.org/InStock',
            },
            inLanguage: ['en', 'ur'],
            audience: {
              '@type': 'EducationalAudience',
              educationalRole: 'student',
              geographicArea: {'@type': 'Country', name: 'Pakistan'},
            },
          },
        ],
      }),
    },
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/docs',
          editUrl: `${GITHUB_URL}/edit/main/`,
          showLastUpdateTime: true,
          showLastUpdateAuthor: true,
        },
        blog: {
          showReadingTime: true,
          path: 'blog',
          routeBasePath: '/changelog',
          blogTitle: 'Changelog',
          blogDescription: 'Release notes and product updates for ImtehanHub.',
          postsPerPage: 10,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
            title: 'ImtehanHub Changelog',
            description: 'Release notes and product updates for ImtehanHub.',
            copyright: `Copyright © ${new Date().getFullYear()} ImtehanHub by Ahsan Mahmood.`,
          },
          editUrl: `${GITHUB_URL}/edit/main/`,
          onInlineTags: 'warn',
          onInlineAuthors: 'ignore',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
        sitemap: {
          changefreq: 'weekly',
          priority: 0.7,
          ignorePatterns: ['/tags/**'],
          filename: 'sitemap.xml',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/og-image.svg',
    metadata: [
      {
        name: 'keywords',
        content:
          'ImtehanHub, ImtehanHub docs, Pakistani exam preparation, FA FSc exam prep, Class 5 to 12 study app, Urdu English exam app, bilingual ed-tech Pakistan, Punjab board, Federal board, free exam prep, MCQ practice, textbook reference, Pakistan ed-tech',
      },
      {name: 'twitter:card', content: 'summary_large_image'},
      {name: 'twitter:creator', content: '@aoneahsan'},
      {property: 'og:type', content: 'website'},
      {property: 'og:site_name', content: 'ImtehanHub Docs'},
      {property: 'og:locale', content: 'en_US'},
      {property: 'og:locale:alternate', content: 'ur_PK'},
    ],
    colorMode: {
      defaultMode: 'light',
      respectPrefersColorScheme: true,
    },
    announcementBar: {
      id: 'open-source-docs',
      content:
        '⭐ ImtehanHub is free for Pakistani students — try the live app at <a target="_blank" rel="noopener" href="https://imtehanhub.aoneahsan.com">imtehanhub.aoneahsan.com</a>',
      backgroundColor: 'var(--ih-accent-soft)',
      textColor: 'var(--ih-fg)',
      isCloseable: true,
    },
    navbar: {
      title: 'ImtehanHub',
      logo: {
        alt: 'ImtehanHub logo',
        src: 'img/logo.svg',
        srcDark: 'img/logo.svg',
        href: '/',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Docs',
        },
        {
          type: 'docSidebar',
          sidebarId: 'developersSidebar',
          position: 'left',
          label: 'Developer',
        },
        {to: '/changelog', label: 'Changelog', position: 'left'},
        {
          href: APP_URL,
          label: 'Open App ↗',
          position: 'right',
        },
        {
          href: GITHUB_URL,
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      logo: {
        alt: 'ImtehanHub logo',
        src: 'img/logo.svg',
        width: 36,
        height: 36,
      },
      links: [
        {
          title: 'Documentation',
          items: [
            {label: 'Getting Started', to: '/docs/getting-started/welcome'},
            {label: 'For Students', to: '/docs/getting-started/welcome'},
            {label: 'Concepts', to: '/docs/getting-started/welcome'},
            {label: 'Changelog', to: '/changelog'},
          ],
        },
        {
          title: 'Product',
          items: [
            {label: 'Open App', href: APP_URL},
            {label: 'Pricing', href: `${APP_URL}/pricing`},
            {label: 'Privacy', href: `${APP_URL}/privacy`},
            {label: 'Terms', href: `${APP_URL}/terms`},
          ],
        },
        {
          title: 'Built by Ahsan Mahmood',
          items: [
            {label: 'Portfolio — aoneahsan.com', href: 'https://aoneahsan.com'},
            {label: 'LinkedIn', href: 'https://linkedin.com/in/aoneahsan'},
            {label: 'GitHub', href: 'https://github.com/aoneahsan'},
            {label: 'Email', href: 'mailto:aoneahsan@gmail.com'},
          ],
        },
        {
          title: 'For Crawlers',
          items: [
            {label: 'sitemap.xml', href: `${SITE_URL}/sitemap.xml`},
            {label: 'llms.txt', href: `${SITE_URL}/llms.txt`},
            {label: 'ai.txt', href: `${SITE_URL}/ai.txt`},
            {label: 'RSS feed', href: `${SITE_URL}/changelog/rss.xml`},
          ],
        },
      ],
      copyright: `Built by <a href="https://aoneahsan.com" target="_blank" rel="noopener">Ahsan Mahmood</a> · © ${new Date().getFullYear()} ImtehanHub. Documentation released under MIT.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'json', 'tsx', 'jsx', 'typescript', 'yaml', 'diff'],
    },
    docs: {
      sidebar: {
        hideable: true,
        autoCollapseCategories: false,
      },
    },
    tableOfContents: {
      minHeadingLevel: 2,
      maxHeadingLevel: 4,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
