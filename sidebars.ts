import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

/**
 * Diátaxis-aware sidebars for ImtehanHub Docs.
 *
 * docsSidebar       — Student/teacher-facing user docs (the bulk of the site).
 * developersSidebar — Open-source-style technical docs (added in Batch 6).
 *
 * Each batch adds its own category + items here. Empty categories are NOT
 * declared until they have at least one doc, otherwise the navbar's
 * docSidebar resolver fails on the home page render.
 */
const sidebars: SidebarsConfig = {
  docsSidebar: [
    {
      type: 'category',
      label: 'Getting Started',
      collapsed: false,
      link: {
        type: 'generated-index',
        slug: '/getting-started',
        description:
          'Sign in, take your first test, and explore ImtehanHub in 3 minutes.',
      },
      items: ['getting-started/welcome'],
    },
    {type: 'doc', id: 'credits', label: 'Credits'},
  ],
};

export default sidebars;
