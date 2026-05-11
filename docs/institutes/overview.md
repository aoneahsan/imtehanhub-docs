---
id: overview
title: Institutes overview — what an institute account is
sidebar_label: Overview
sidebar_position: 1
description: An institute account on ImtehanHub lets a school, academy, or tuition centre onboard students under one manager. Invite students by email, watch a roster grow as they accept, and receive volume discounts that scale with student count.
keywords:
  - ImtehanHub for schools
  - academy account Pakistan
  - bulk student licence
  - tuition centre exam prep
  - school enrollment exam app
slug: /institutes/overview
---

# Institutes overview

**An institute account** is for schools, academies, and tuition centres that want to onboard a group of students under one manager. The institute manager invites students by email, students accept, and the manager can see roster size and aggregate progress. Pricing scales with the number of accepted students, with volume discount tiers built in.

> **TL;DR** — An institute manager invites students by email, students accept, the manager sees a roster and receives a discount that grows with student count. Each student keeps their personal account and privacy.

## Who institute accounts are for

We built this for three real Pakistani contexts:

- **Tuition academies** preparing 30–200 students for matric / FA / FSc board exams.
- **Coaching centres** (entry-test prep) running batches of 20–80 students at a time.
- **Schools** introducing ImtehanHub to one section or one year-group as an extracurricular tool.

The institute layer is **opt-in for the manager**, not for students. A student in your roster still uses ImtehanHub as their own personal account — same login, same theme, same privacy. The institute relationship adds visibility (manager sees aggregate progress) and benefits (discount applied to the manager's plan, or directly to students depending on the contract).

## Who can be an institute manager

Any signed-in ImtehanHub user can request institute-manager status. The flow is:

1. Sign in normally with Google.
2. Open `/app/institute/apply` (or navigate from Profile → Apply for institute).
3. Fill out a short form: institute name, address, type (school / academy / coaching centre / tuition), expected student count, and a contact phone number.
4. Submit.

An admin reviews the application within 1-3 working days. We require a basic plausibility check — name, address, and phone must look legitimate — to prevent abuse (e.g. one student creating an "institute" to get bulk discounts for friends).

On approval, your role flips to `institute_manager` and a new institute document is created at `institutes/{instituteId}` with you listed as the manager.

You can manage one institute per user. Multi-institute managers (e.g. owners of multiple academy branches) email [aoneahsan@gmail.com](mailto:aoneahsan@gmail.com) to get linked across institutes.

## What the manager sees

After approval, the institute panel at `/app/institute` shows three sections:

1. **Invitations** — pending and accepted, with a + button to invite by email.
2. **Roster** — every student who accepted, with display name, joined date, and a "View progress" button.
3. **Progress dashboard** — aggregate test counts, average accuracy, and per-class breakdown across the roster.

See [Manage students](/docs/institutes/manage) for the invitation flow and [Progress dashboard](/docs/institutes/progress) for what the aggregate view shows.

## What the student sees

Once a student accepts your invitation, two small affordances appear in their account:

- A read-only "Institute" badge on their profile (`Institute: Iqbal Sciences Academy`).
- An optional toggle to opt out of the institute view (the manager loses the ability to see this student's progress; the institute discount stays applied to the manager's plan, the student stays in the roster).

That is it. The student's tests, bookmarks, history, leaderboard ranking, and community submissions are not exposed to the manager.

## Pricing — the discount tier

The institute manager pays for their **own** plan and unlocks **a volume discount on Pro / Unlimited** that scales with accepted student count. We do **not** charge per-seat — students continue using their personal plans (Free or paid). The institute layer simply provides aggregation, support, and a discount lever the manager can use to subsidise students.

| Accepted students | Manager's plan discount |
|---|---|
| 1-9 | None — same as personal pricing |
| 10-29 | 15% off Pro / Unlimited |
| 30-99 | 25% off Pro / Unlimited |
| 100+ | 40% off Pro / Unlimited, plus a custom institute-branded sub-domain on request |

The discount is recomputed automatically whenever the roster changes. If you grow from 9 to 10 students, your next renewal is at the discounted price.

For institutes wanting to **gift Pro to all their students** (rather than just the manager), email [aoneahsan@gmail.com](mailto:aoneahsan@gmail.com) for a bulk-licence quote. We have run this arrangement for several academies and are happy to set it up.

## What an institute account is **not**

- **Not a school management system (SMS).** We do not handle attendance, fees, parent communication, lesson schedules, or anything else outside test prep.
- **Not a teacher tool.** Institute managers see aggregate student progress but cannot create custom tests for specific students or assign content. (This is roadmapped — see "Assigning content" below.)
- **Not a parental-control overlay.** A parent who wants to monitor their child should ask the child to share their personal `/app/profile` view, not create an institute.

## Roadmap

Coming in future versions:

- **Assigning content** — institute managers create test packs ("Chapter 3 Algebra mid-term, due Friday") and students see them in a dedicated "Assignments" tab.
- **Sub-managers / teachers** — multi-level access for institutes with class-level teachers reporting to the principal.
- **Custom branding** — institutes on the 100+ tier can request a co-branded splash screen for their students.
- **Parent dashboard** — a separate parent role that mirrors institute visibility but for a single student.

Nothing on the roadmap changes how students experience the app today — additions are opt-in.

## Common questions

### Can I run an institute without inviting students yet?

Yes. The application can be approved before you have students. You can sit on the role and invite when ready.

### Can a student be in multiple institutes?

No — one institute link per user. To switch institutes, the student leaves the current one and accepts the new invite.

### What happens to the roster if I delete my manager account?

You must first transfer manager rights to another verified student in your roster, or deactivate the institute. Account deletion is blocked until one of those is done. See [Data deletion](/docs/account/data-deletion).

### Do institute students get the community module?

Yes, identically to personal users. Institute managers cannot moderate community submissions — that is reserved for global moderators promoted via the [community process](/docs/community/moderator).

## Next

- [Manage students](/docs/institutes/manage) — invite, accept, remove flow.
- [Progress dashboard](/docs/institutes/progress) — what aggregate metrics the manager sees.
- [Billing](/docs/account/billing) — personal pricing the discount applies to.
