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
      items: [
        'getting-started/welcome',
        'getting-started/quick-start',
        'getting-started/sign-in',
        'getting-started/free-trial',
        'getting-started/pick-class',
        'getting-started/pick-board',
      ],
    },
    {
      type: 'category',
      label: 'Core Concepts',
      collapsed: false,
      link: {
        type: 'generated-index',
        slug: '/concepts',
        description:
          'How ImtehanHub organises classes, subjects, books, chapters, and questions — and the bilingual + plan models that wrap them.',
      },
      items: [
        'concepts/content-hierarchy',
        'concepts/question-types',
        'concepts/bilingual',
        'concepts/quotas-and-plans',
        'concepts/streaks-and-stats',
        'concepts/achievements',
      ],
    },
    {
      type: 'category',
      label: 'Tests & Practice',
      collapsed: false,
      link: {
        type: 'generated-index',
        slug: '/tests',
        description:
          'Configure a test, take it, read the result, review past tests, and keep your streak alive.',
      },
      items: [
        'tests/configure',
        'tests/topic-filters',
        'tests/source-picker',
        'tests/during-test',
        'tests/submit-and-result',
        'tests/review-mode',
        'tests/bookmarks',
        'tests/history',
        'tests/streaks',
      ],
    },
    {type: 'doc', id: 'credits', label: 'Credits'},
  ],
};

export default sidebars;
