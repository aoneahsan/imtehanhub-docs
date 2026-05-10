import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

function Hero(): ReactNode {
  return (
    <header className="hero hero--imtehanhub">
      <div className="container">
        <div className="hero__urdu">امتحان کی تیاری، اب آسان!</div>
        <Heading as="h1" className="hero__title">
          Pakistani exam prep, made easy.
        </Heading>
        <p className="hero__subtitle">
          ImtehanHub is a free, bilingual (Urdu + English) study platform covering Class 5 through
          2nd Year (FA / FSc). Drill MCQs, short questions, and long questions keyed to your actual
          textbook chapters and page numbers — on the web or as an Android app.
        </p>
        <div style={{display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '1.5rem'}}>
          <Link className="hero__cta hero__cta--primary" to="/docs/getting-started/welcome">
            Read the docs →
          </Link>
          <Link
            className="hero__cta hero__cta--secondary"
            href="https://imtehanhub.aoneahsan.com"
            target="_blank"
            rel="noopener">
            Open the app ↗
          </Link>
        </div>
      </div>
    </header>
  );
}

type Feature = {
  title: string;
  href: string;
  body: string;
  icon: ReactNode;
};

const FEATURES: Feature[] = [
  {
    title: 'Get started in 3 minutes',
    href: '/docs/getting-started',
    body: 'Open the app, take 3 trial tests without signing in, then sign in with Google when you want to keep your history.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    ),
  },
  {
    title: 'Bilingual — Urdu + English',
    href: '/docs/getting-started/welcome',
    body: 'Every class, subject, chapter and question carries an Urdu name. Toggle the language and the whole UI flips to RTL.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 7h16M4 12h10M4 17h16" />
      </svg>
    ),
  },
  {
    title: 'Textbook-accurate',
    href: '/docs/getting-started/welcome',
    body: 'Each answer references the chapter and page number in the official textbook — no random internet sources.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 5h12a3 3 0 013 3v11M4 5v14a2 2 0 002 2h13M4 5a2 2 0 012-2h10" />
      </svg>
    ),
  },
  {
    title: 'Free for students',
    href: '/docs/getting-started/welcome',
    body: 'Free tier covers daily/weekly/monthly practice. Pro and Unlimited unlock more, and 3 successful referrals auto-upgrade you to Pro.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v10M9 10h5a2 2 0 010 4H9" />
      </svg>
    ),
  },
  {
    title: 'Works offline',
    href: '/docs/getting-started/welcome',
    body: 'The Android app caches your progress with @capacitor/preferences so low-connectivity areas keep working.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12.55a11 11 0 0114 0M8.5 16.5a6 6 0 017 0M12 20h.01" />
      </svg>
    ),
  },
  {
    title: 'Built in the open',
    href: '/docs/credits',
    body: 'Curious about the stack? React 19 + Vite 8 + Tailwind v4 + Radix UI + Capacitor 8 + Firebase free tier. Architecture docs land in Batch 6 — see Credits for the author and contact.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 3l-6 9 6 9M16 3l6 9-6 9" />
      </svg>
    ),
  },
];

function Features(): ReactNode {
  return (
    <section className="features">
      <div className="container">
        <div className="row">
          {FEATURES.map((f) => (
            <div key={f.title} className="col col--4" style={{marginBottom: '1.5rem'}}>
              <Link to={f.href} style={{textDecoration: 'none', color: 'inherit', display: 'block', height: '100%'}}>
                <div className="feature-card">
                  <div className="feature-card__icon">{f.icon}</div>
                  <h3>{f.title}</h3>
                  <p>{f.body}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BuiltBy(): ReactNode {
  return (
    <section className="features" style={{paddingTop: 0}}>
      <div className="container">
        <div
          style={{
            padding: '2rem',
            borderRadius: '0.875rem',
            border: '1px solid var(--ih-border)',
            background: 'var(--ih-surface)',
          }}>
          <Heading as="h2" style={{marginTop: 0}}>
            Built by Ahsan Mahmood
          </Heading>
          <p style={{color: 'var(--ih-fg-muted)', marginBottom: '1rem'}}>
            ImtehanHub is designed, engineered and shipped by{' '}
            <a href="https://aoneahsan.com" target="_blank" rel="noopener">
              Ahsan Mahmood
            </a>{' '}
            — a full-stack engineer based in Lahore, Pakistan. The app codebase is private; this
            documentation site is open source on GitHub so anyone can read, learn from, and
            contribute corrections.
          </p>
          <div style={{display: 'flex', gap: '0.75rem', flexWrap: 'wrap'}}>
            <a className="hero__cta hero__cta--primary" style={{background: 'var(--ifm-color-primary)', color: '#fff'}} href="https://aoneahsan.com" target="_blank" rel="noopener">
              Portfolio ↗
            </a>
            <a className="hero__cta hero__cta--secondary" style={{borderColor: 'var(--ih-border)', color: 'var(--ih-fg)'}} href="https://linkedin.com/in/aoneahsan" target="_blank" rel="noopener">
              LinkedIn ↗
            </a>
            <a className="hero__cta hero__cta--secondary" style={{borderColor: 'var(--ih-border)', color: 'var(--ih-fg)'}} href="https://github.com/aoneahsan" target="_blank" rel="noopener">
              GitHub ↗
            </a>
            <a className="hero__cta hero__cta--secondary" style={{borderColor: 'var(--ih-border)', color: 'var(--ih-fg)'}} href="mailto:aoneahsan@gmail.com">
              Email
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} — ${siteConfig.tagline}`}
      description="Official documentation for ImtehanHub — Pakistani exam preparation platform covering Class 5 to 2nd Year (FA/FSc), bilingual (Urdu + English), free for students.">
      <Hero />
      <Features />
      <BuiltBy />
    </Layout>
  );
}
