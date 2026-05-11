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
  developersSidebar: [
    {
      type: 'category',
      label: 'Developer Overview',
      collapsed: false,
      link: {
        type: 'generated-index',
        slug: '/developers',
        description:
          'Open-source-style technical docs for ImtehanHub — stack philosophy, layer contracts, routing, state, forms, storage, theme architecture, data pipeline, postbuild SEO, and how to contribute.',
      },
      items: ['developers/overview'],
    },
    {
      type: 'category',
      label: 'Architecture',
      collapsed: false,
      link: {
        type: 'generated-index',
        slug: '/developers/architecture',
        description:
          'The six fixed layers (types → repos → services → stores → hooks → components), routing model, state management, forms, storage, theme, and analytics + errors fan-out.',
      },
      items: [
        'developers/architecture/layers',
        'developers/architecture/routing',
        'developers/architecture/state',
        'developers/architecture/forms',
        'developers/architecture/storage',
        'developers/architecture/theme',
        'developers/architecture/analytics-errors',
      ],
    },
    {
      type: 'category',
      label: 'Data Pipeline',
      collapsed: true,
      link: {
        type: 'generated-index',
        slug: '/developers/pipeline',
        description:
          'How official MCQ / short / long question content is sourced from free Pakistani exam-prep sites, transformed, validated, and seeded into Firestore.',
      },
      items: [
        'developers/pipeline/overview',
        'developers/pipeline/ocr',
      ],
    },
    {
      type: 'category',
      label: 'SEO',
      collapsed: true,
      link: {
        type: 'generated-index',
        slug: '/developers/seo',
        description:
          'How ImtehanHub generates 660+ static HTMLs per build with route-specific JSON-LD, sitemap, llms.txt, ai.txt, and per-page-uniqueness floor content — so AI crawlers see real content.',
      },
      items: [
        'developers/seo/postbuild',
      ],
    },
    {
      type: 'category',
      label: 'Contributing',
      collapsed: true,
      link: {
        type: 'generated-index',
        slug: '/developers/contributing',
        description:
          'Three contribution paths — documentation PRs (this repo, public), in-app community module submissions, and direct issue reports via email.',
      },
      items: [
        'developers/contributing/community',
      ],
    },
  ],
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
    {
      type: 'category',
      label: 'Account & Settings',
      collapsed: true,
      link: {
        type: 'generated-index',
        slug: '/account',
        description:
          'Profile, theme customizer, language toggle, billing tiers, referrals, and self-service data deletion — every personal account surface in one place.',
      },
      items: [
        'account/profile',
        'account/theme',
        'account/language',
        'account/billing',
        'account/referrals',
        'account/data-deletion',
      ],
    },
    {
      type: 'category',
      label: 'Institutes',
      collapsed: true,
      link: {
        type: 'generated-index',
        slug: '/institutes',
        description:
          'Schools, academies, and tuition centres can onboard a roster of students under one manager — invite, manage, and read aggregate progress without crossing privacy lines.',
      },
      items: [
        'institutes/overview',
        'institutes/manage',
        'institutes/progress',
      ],
    },
    {
      type: 'category',
      label: 'Mobile App',
      collapsed: true,
      link: {
        type: 'generated-index',
        slug: '/mobile',
        description:
          'The Android app gives you native sign-in, push notifications, faster splash, and offline tests built for Pakistani load-shedding reality.',
      },
      items: [
        'mobile/install',
        'mobile/offline',
      ],
    },
    {
      type: 'category',
      label: 'Privacy & Data',
      collapsed: true,
      link: {
        type: 'generated-index',
        slug: '/privacy',
        description:
          'A plain-language inventory of every piece of data ImtehanHub stores about you — and the technical reasoning behind the CNIC hash + denylist design.',
      },
      items: [
        'privacy/overview',
        'privacy/cnic',
      ],
    },
    {type: 'doc', id: 'credits', label: 'Credits'},
  ],
};

export default sidebars;
