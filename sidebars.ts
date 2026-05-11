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
    {
      type: 'category',
      label: 'Discovery',
      collapsed: true,
      link: {
        type: 'generated-index',
        slug: '/discovery',
        description:
          'Public-facing browsing surfaces — subjects, blog, knowledge base, sitemap, feed, leaderboard, notifications, search, and sharing.',
      },
      items: [
        'discovery/subjects',
        'discovery/chapter-detail',
        'discovery/blog',
        'discovery/knowledge-base',
        'discovery/sitemap-page',
        'discovery/feed',
        'discovery/leaderboard',
        'discovery/notifications',
        'discovery/search',
        'discovery/share',
      ],
    },
    {
      type: 'category',
      label: 'Community Module',
      collapsed: true,
      link: {
        type: 'generated-index',
        slug: '/community',
        description:
          'Submit MCQs, vote, flag, comment, earn achievements, and become a moderator. The full peer-contribution surface that closes the long tail of Pakistani curriculum coverage.',
      },
      items: [
        'community/overview',
        'community/cnic-verification',
        'community/submit-mcq',
        'community/submit-short',
        'community/submit-long',
        'community/submit-chapter-explanation',
        'community/bilingual-gate',
        'community/voting',
        'community/flagging',
        'community/comments',
        'community/quotas',
        'community/strikes-bans',
        'community/moderator',
        'community/promote-to-official',
      ],
    },
    {type: 'doc', id: 'credits', label: 'Credits'},
  ],
};

export default sidebars;
