# Orbas CRM - Production Reality Audit and Launch Readiness Plan

Generated: June 2026  
Company: Blackwellen  
Product: Orbas CRM  
Repo: `orbas-crm-final-build-v.1.0`  
Stack observed: Next.js 16.2.9, React 19.2.4, Supabase, Tailwind v4, Radix UI, Zustand, Recharts

---

## 1. Executive Summary

Orbas CRM is currently a broad, visually mature SaaS application shell with substantial route coverage across CRM, accounting, operations, projects, people, service, documents, analytics, compliance, charity, automations, admin, client portal, and public marketing pages.

The product is not yet launch-ready as a production SaaS. It is best described as a high-depth demo/product prototype with partial Supabase wiring. Authentication is wired. Some CRM, service, and people list/detail pages read from Supabase. Most workflows remain local UI state, sample data, placeholder actions, simulated waits, or static screens.

The most important production risk is tenant isolation. The repo contains a more secure-looking prefixed schema (`crm_leads`, `crm_contacts`, `crm_accounts`, `crm_deals`) with workspace-scoped RLS policies, but the active CRM UI reads unprefixed tables (`leads`, `contacts`, `accounts`, `deals`) whose RLS policies currently allow any authenticated user. That must be fixed before any external beta.

### What the product can do today

- Render a large authenticated application shell with top navigation, app launcher, sidebars, module layouts, dashboards, list pages, detail pages, and forms.
- Support Supabase email/password registration and login.
- Protect `/app`, platform/admin-style routes, and onboarding routes from unauthenticated users.
- Create/update a Supabase user profile during onboarding.
- Create a Supabase workspace during onboarding.
- Read selected Supabase tables from a subset of app pages:
  - CRM leads, contacts, accounts, deals.
  - Service tickets.
  - People directory/employees.
- Show public marketing pages, pricing, book-demo, security, contact, privacy, and terms pages.
- Provide a convincing click-through demo for CRM and wider ERP modules.

### What it cannot safely do today

- Safely isolate tenant data across real customer workspaces.
- Persist most create/edit/delete actions.
- Enforce role-based permissions.
- Bill customers through Stripe.
- Send transactional emails or notifications.
- Produce audit trails for important actions.
- Reliably import/export business data.
- Support compliance-grade file uploads and storage policies.
- Prove quality through automated tests or CI.
- Be described as production-ready without major caveats.

### Launch readiness judgement

| Launch target | Current readiness | Effort band | Notes |
|---|---:|---:|---|
| Investor/customer demo | High | XS/S | Strong enough for guided demo with caveats. |
| Internal alpha | Medium | S/M | Needs seeded data consistency and basic bug cleanup. |
| Private beta with real users | Low | L | Requires RLS, CRUD, billing decision, email, backups, support. |
| Public CRM launch | Low | L | Possible if CRM scope is narrowed aggressively. |
| Full platform launch | Very low | XL | UI breadth greatly exceeds backend depth. |

---

## 2. Market and Positioning

### One-sentence positioning

Orbas CRM is a UK-focused business operating system for small and mid-sized teams that want CRM, service, finance, projects, people, and reporting in one connected workspace instead of running their business across separate tools.

### Recommended launch wedge

Do not launch the whole platform first. Launch CRM as the wedge:

> "A CRM for UK SMBs that connects sales pipeline, customer records, quotes, service tickets, and lightweight revenue reporting in one workspace."

This keeps the first sellable version commercially understandable, technically achievable, and safer to harden.

### Target customer segments

| Segment | Industry | Company size | Buyer/user roles | Why this segment |
|---|---|---:|---|---|
| B2B service businesses | Agencies, consultancies, IT services, field service | 5-75 employees | Founder, sales lead, operations manager | Need pipeline, client records, quotes, tasks, service follow-up. |
| UK SMB operators | Construction, logistics, manufacturing, professional services | 10-150 employees | MD, COO, head of operations | Value all-in-one workspace and UK-specific direction. |
| Founder-led SaaS/services | SaaS, implementation partners, subscription services | 3-50 employees | Founder, revenue lead, customer success | Need CRM plus MRR/subscription view later. |
| Charity/compliance-adjacent later | Nonprofits, regulated SMBs | 10-200 employees | Operations, compliance, fundraising leads | Strong future module fit, but not first launch wedge. |

### Top painful problems

1. Customer data is fragmented across spreadsheets, inboxes, invoicing tools, support tools, and project tools.
2. Sales teams cannot see a clean end-to-end view from lead to deal to customer account to service follow-up.
3. Founder-led teams outgrow simple CRMs but do not want Salesforce, NetSuite, or a costly implementation project.

### Why Orbas can win

- Broader workspace vision than pipeline-only CRMs.
- UK-first roadmap potential: VAT, Companies House, HMRC, Gift Aid, payroll, and UK compliance can become differentiators.
- Modern UI breadth already exists, making demos feel larger than a narrow MVP.
- Potential to combine CRM, service, documents, billing, and analytics without forcing customers into multiple subscriptions.

### Differentiators to prove, not just claim

| Differentiator | Current proof | Required proof before launch |
|---|---|---|
| All-in-one CRM + operations suite | UI breadth exists | Real cross-module data relationships. |
| Fast setup | Onboarding UI exists | Workspace creation, demo data, invited users, first pipeline working. |
| Better SMB value than enterprise suites | Pricing page exists | Stripe, plan limits, feature flags, support promise. |
| Secure multi-tenant SaaS | Auth exists | Workspace-scoped RLS on active tables, permissions, audit logs. |
| UK-ready business workflows | Roadmap docs exist | At least one concrete UK-specific workflow in product. |

### Must-have workflows proving value in first 10 minutes

1. Create workspace, invite a teammate, and land in CRM home.
2. Import or manually create a lead.
3. Convert lead to contact/account/deal.
4. Move deal through pipeline stages.
5. Add activity/note/task against the deal.
6. Generate a basic quote or proposal from the deal.
7. See pipeline value and next actions on CRM dashboard.
8. Export leads/deals to CSV.

---

## 3. Repo Evidence and Current Build Truth

### Project structure

Important files and directories:

- `src/app` - Next.js App Router pages and route groups.
- `src/app/(public)` - marketing site pages.
- `src/app/(auth)` - login, register, reset, MFA, verify email.
- `src/app/onboarding` - multi-step onboarding.
- `src/app/(app)` - authenticated application modules.
- `src/app/portal` - client portal.
- `src/app/platform-admin` - platform administration UI.
- `src/lib/supabase` - Supabase browser, server, and proxy/middleware clients.
- `supabase/migrations` - database migrations.
- `scripts/seed.mjs` and `scripts/reseed.mjs` - demo seed scripts.
- `docs/orbas-build-plan-v2.md` - long-form upgrade plan.
- `docs/orbas-competitive-analysis-2026.md` - market/competitive document.

### Route count observed

The scan found:

- 262 `page.tsx` files under `src/app`.
- 23 `layout.tsx` files under `src/app`.

This is unusually broad for a first production SaaS launch. The UI scope is much larger than the backend scope.

### Verification run

Commands attempted:

```sh
npm run lint
npm run build
```

Results:

- `npm run lint` failed with a Node out-of-memory fatal error before producing useful lint findings.
- `npm run build` timed out on the first run. A second run immediately reported another Next build process already running, caused by the previous timed-out build leaving a process/lock behind.

Release implication:

- The repo cannot currently be treated as verified build-clean from this audit.
- Before launch work continues, lint/build reliability needs to be fixed or scoped down.
- The large route count may be contributing to memory pressure.

### Tests

No test runner is configured. The repo guidance states there is no test runner configured in this project.

---

## 4. Architecture Map

### Frontend architecture

The frontend is a Next.js 16 App Router application.

Observed route groups:

| Route group | Purpose | Current state |
|---|---|---|
| `src/app/(public)` | Marketing pages | Mostly static UI. |
| `src/app/(auth)` | Auth screens | Supabase auth wired for login/register. |
| `src/app/onboarding` | Workspace setup | Profile/workspace writes partially wired. |
| `src/app/(app)` | Main authenticated app | Very broad UI, mostly client components. |
| `src/app/portal` | Customer/client portal | Demo UI. |
| `src/app/platform-admin` | Platform admin | Demo/admin UI. |
| `src/app/sign/[token]` | Signing flow | UI present; needs backend/security audit. |

Major app modules under `(app)`:

- Home
- CRM
- Accounting
- Operations
- Projects
- People
- Service
- Documents
- Analytics
- Compliance
- Charity
- Automations
- Connect
- Settings
- Admin

### Shared UI and state

| Area | Files | Notes |
|---|---|---|
| Top navigation | `src/components/layout/top-nav.tsx` | Global app shell navigation. |
| Sidebar | `src/components/layout/app-sidebar.tsx` | Module-specific navigation. |
| App launcher | `src/components/layout/app-launcher.tsx` | Switches app/module navigation. |
| Chat bubble | `src/components/layout/chat-bubble.tsx` | Demo inbox/chat/notifications. |
| UI components | `src/components/ui/*` | shadcn/Radix-style component library. |
| Zustand stores | `src/store/app-store.ts`, `src/store/user-store.ts` | Sidebar/current app/user state. |

### Backend architecture

Backend is Supabase-based. There are no Next route handlers or edge functions observed for core business workflows.

Supabase clients:

- `src/lib/supabase/client.ts` - browser Supabase client.
- `src/lib/supabase/server.ts` - server component Supabase client.
- `src/lib/supabase/middleware.ts` - session refresh and route protection.
- `src/proxy.ts` - Next.js 16 proxy entry point.

### Auth and session model

Working:

- Login uses `supabase.auth.signInWithPassword`.
- Register uses `supabase.auth.signUp`.
- App layout checks `supabase.auth.getUser()` and redirects unauthenticated users to `/login`.
- Proxy/middleware redirects unauthenticated users away from app/admin/onboarding routes.

Incomplete:

- User-to-workspace membership is incomplete.
- Role-based permissions are not enforced.
- MFA screens exist, but full production MFA behavior needs verification.
- Invitations reference a missing or unverified `workspace_invites` table.

### Tenancy model

Intended model:

- `workspaces` table.
- `profiles` table with `workspace_id`.
- Data records should carry `workspace_id`.
- RLS should only allow records whose `workspace_id` matches the current user's workspace membership.

Current risk:

- Migration `001_full_schema.sql` creates prefixed tables and workspace-scoped policies.
- Migration `002_crm_tables.sql` creates active unprefixed UI tables with policies that only check `auth.role() = 'authenticated'`.
- That means active tables such as `leads`, `contacts`, `accounts`, `deals`, `tickets`, and `employees` are not safely tenant-isolated.

### Billing model

Observed:

- Pricing page contains tiers and add-ons.
- `platform_subscriptions` table exists.
- Settings/admin billing pages exist as UI.

Not found:

- Stripe dependency in `package.json`.
- Checkout session creation.
- Stripe customer portal.
- Stripe webhook route.
- Subscription status enforcement.
- Seat quantity updates.
- Trial lifecycle logic.
- Plan limits/feature flags tied to billing.

### Email/notification model

Observed:

- Many pages mention emails, invites, reminders, notifications, inboxes, and support channels.
- Build-plan docs mention Resend.

Not found:

- Resend package dependency in app.
- Send email helper.
- Transactional email templates.
- Invite email implementation.
- Webhook/event-driven notification system.

---

## 5. Database and Data Model Reality

### Migration 001: broad prefixed platform schema

`supabase/migrations/001_full_schema.sql` defines a broad platform schema.

Core entities include:

- `workspaces`
- `profiles`
- `crm_leads`
- `crm_contacts`
- `crm_accounts`
- `crm_deals`
- `acc_accounts`
- `acc_journals`
- `acc_journal_lines`
- `acc_invoices`
- `acc_invoice_lines`
- `acc_bills`
- `acc_payments`
- `acc_bank_accounts`
- `acc_bank_transactions`
- `acc_fixed_assets`
- `hr_employees`
- `hr_leave_requests`
- `hr_payroll_runs`
- `projects`
- `project_tasks`
- `service_tickets`
- `documents`
- `document_folders`
- `compliance_risks`
- `compliance_policies`
- `charity_donors`
- `charity_donations`
- `ops_inventory`
- `ops_purchase_orders`
- `ops_warehouses`
- `connect_conversations`
- `connect_messages`
- `portal_clients`
- `platform_subscriptions`
- `platform_audit_logs`

Positive:

- Good early coverage for the platform vision.
- Most important business tables include `workspace_id`.
- Some key tables have RLS enabled.
- Several CRM and operational tables have relationships.

Concerns:

- Many tables are skeletal.
- Several foreign keys are incomplete or not enforced.
- RLS coverage is partial.
- Audit table exists but no app writes to it.
- Storage bucket setup is not present.
- No database functions/triggers were found for updated timestamps, audit logs, counters, or lifecycle automation.

### Migration 002: active unprefixed app tables

`supabase/migrations/002_crm_tables.sql` defines:

- `contacts`
- `accounts`
- `deals`
- `leads`
- `tickets`
- `employees`

These are the tables the current UI mostly reads.

Critical issue:

```sql
create policy "leads_workspace" on public.leads for all using (auth.role() = 'authenticated');
```

The policy name says "workspace", but the predicate does not enforce workspace membership. Similar policies exist for contacts, accounts, deals, tickets, and employees.

### Schema mismatch

There are two competing data models:

| Area | Secure-looking schema | Active UI schema | Risk |
|---|---|---|---|
| Leads | `crm_leads` | `leads` | UI avoids the stricter table. |
| Contacts | `crm_contacts` | `contacts` | Duplicate models. |
| Accounts | `crm_accounts` | `accounts` | Duplicate models. |
| Deals | `crm_deals` | `deals` | Duplicate models. |
| Tickets | `service_tickets` | `tickets` | Seed scripts and UI may diverge. |
| Employees | `hr_employees` | `employees` | Duplicate models. |

Decision needed:

Choose one database naming strategy and migrate the UI, seed scripts, policies, and future work to that strategy.

Recommendation:

Use the prefixed platform schema for long-term clarity: `crm_*`, `service_*`, `hr_*`, `acc_*`, `ops_*`. Then remove or deprecate the unprefixed duplicate tables after migration.

---

## 6. Feature Inventory

### CRM

| Feature | Current status | Evidence/notes | Launch requirement |
|---|---:|---|---|
| CRM dashboard | UI only/partial | Static metrics and module UI. | Must read real workspace metrics. |
| Leads list | Partially working | Starts with `SAMPLE_LEADS`, then reads `leads`. | Use tenant-scoped table, pagination, real totals. |
| New lead | UI only | Simulated delay, toast, redirect. | Insert lead into DB with workspace_id. |
| Lead detail | UI mostly static | Detail route exists. | Fetch/update real lead. |
| Contacts list/detail | Partially working | Reads `contacts`. | Tenant RLS, create/edit/delete. |
| Accounts list/detail | Partially working | Reads `accounts`. | Tenant RLS, account-contact-deal relationships. |
| Deals list/detail | Partially working | Reads `deals` plus contacts/accounts. | Pipeline updates, deal creation, activity history. |
| Pipeline | UI only/partial | Kanban-like route exists. | Drag/drop stage updates persisted. |
| Campaigns | UI only | Route exists. | Backlog unless launch scope includes marketing. |
| Quotes/proposals | UI only | Routes exist. | Needed for sales workflow if positioned as CRM+. |
| Forecasting/reports | UI only/partial | Static reporting UI. | Real deal metrics. |
| Sequences | UI only | Route exists. | Later stage; needs email integration. |
| CRM settings | UI only/partial | Local configuration patterns. | Persist pipeline stages, fields, sources. |

### Authentication and onboarding

| Feature | Current status | Notes | Launch requirement |
|---|---:|---|---|
| Register | Working/partial | Supabase sign-up wired. | Add email confirmation handling and workspace bootstrap. |
| Login | Working | Supabase password auth wired. | Add errors, redirect safety, monitoring. |
| Forgot/reset password | Partial | UI exists; needs verification. | Full Supabase reset flow. |
| MFA | UI/partial | MFA screens exist. | Verify real Supabase MFA integration. |
| Profile onboarding | Partially working | Upserts `profiles`. | Enforce profile/workspace relationship. |
| Workspace onboarding | Partially working | Inserts `workspaces`. | Add owner membership, slug uniqueness, default data. |
| Team onboarding | Broken/unknown | Writes `workspace_invites`; no migration found. | Create invites table and email invite flow. |

### Service

| Feature | Current status | Notes | Launch requirement |
|---|---:|---|---|
| Tickets list | Partially working | Reads `tickets`. | Tenant RLS, create/update ticket. |
| Ticket detail | Partially working | Reads `tickets`. | Persist replies, notes, status changes. |
| New ticket | UI only/partial | Form route exists. | Insert ticket, activity log, assignment. |
| SLA/queues/reports | UI only | Demo screens. | Later stage unless support module is launch differentiator. |

### Accounting, operations, people, projects, compliance, documents, analytics

These modules have extensive UI coverage, but most screens appear to use local arrays or static demo data. They should not be marketed as fully working production modules until each is separately audited and wired.

Recommended launch wording:

- "CRM launch with selected connected modules in beta."
- Avoid claiming full accounting, payroll, HR, compliance, or document-signing readiness until backend, legal, and security depth exists.

---

## 7. What Is Demo Only or UI Without Wiring

### Demo-only patterns observed

- `SAMPLE_*` arrays and static objects in page files.
- Buttons for import/export/delete/assign/archive that do not call backend mutations.
- Simulated loading states using `setTimeout`.
- New-record flows that show a toast and redirect but do not persist.
- Local-only draft saving via `localStorage`.
- Static counts and pagination labels.
- Static pricing plans and add-ons not connected to billing.
- AI/copilot responses generated from local canned text rather than a model provider.

### High-risk demo-only areas

| Area | Why it matters |
|---|---|
| New lead/contact/account/deal creation | Core CRM value cannot be proved without persistence. |
| Import/export | Buyers expect data portability; UI buttons currently overpromise. |
| Billing settings | Commercially critical; UI without Stripe creates launch risk. |
| Security/MFA/admin | Security UI without full enforcement is dangerous to market. |
| Compliance/audit | Compliance claims require real audit logs and policy enforcement. |
| Documents/signatures | Legal enforceability and file security require real backend rigor. |

---

## 8. Missing but Assumed Capabilities

These are commonly assumed by SaaS buyers and should be tracked explicitly.

| Capability | Status | Priority |
|---|---:|---:|
| Workspace membership table | Missing/not found | Critical |
| Tenant-safe RLS on active tables | Not safe | Critical |
| Role-based permissions | Missing | Critical |
| Stripe checkout | Missing | Critical |
| Stripe webhooks | Missing | Critical |
| Stripe customer portal | Missing | High |
| Trial lifecycle | Missing | High |
| Transactional email provider | Missing | Critical |
| Invite emails | Missing | Critical |
| Audit logging implementation | Missing | Critical |
| Data export | Missing | High |
| Data deletion/anonymization | Missing | High |
| Backups/disaster recovery plan | Missing | High |
| File storage buckets and policies | Missing | High |
| Error monitoring | Missing | High |
| Automated tests | Missing | High |
| CI/CD checks | Missing | High |
| Support SLA/process | Missing | Medium |
| Legal disclaimers and policy review | Partial/static | High |

---

## 9. Commercial and Revenue Plan

### Current commercial assets

Present:

- Pricing page with tiers.
- Public landing/features pages.
- Book demo page.
- Security page.
- Contact page.
- Privacy and terms pages.

Not production-ready:

- Stripe billing.
- Plan entitlements.
- Seat management.
- Trial activation and expiry.
- Invoice/payment management.
- Support plan enforcement.
- Sales CRM for Orbas itself.

### Suggested day-1 packaging

Do not sell the full platform initially. Sell a focused CRM beta.

#### Founder Beta

- Price: GBP 99-199/month per workspace.
- Users: up to 5.
- Includes: leads, contacts, accounts, deals, pipeline, tasks/activity, basic reports.
- Support: founder-led onboarding.
- Term: monthly.
- Positioning: limited beta, direct feedback loop.

#### Pro CRM

- Price: GBP 29-49/user/month.
- Users: 3-user minimum.
- Includes: all Founder Beta features plus import/export, custom fields, quote/proposal templates, email sync later.

#### Business Platform

- Price: GBP 79-99/user/month.
- Includes CRM plus selected modules as they become real.
- Do not sell until at least service, documents, analytics, and billing are wired.

### Expected ACV/ARPU

| Package | Monthly ARPU | ACV estimate | Notes |
|---|---:|---:|---|
| Founder Beta | GBP 99-199/workspace | GBP 1.2k-2.4k | Good for first proof customers. |
| Pro CRM | GBP 150-500/workspace | GBP 1.8k-6k | Depends on seats. |
| Business Platform | GBP 500-2,000/workspace | GBP 6k-24k | Requires much more product depth. |

### Sales motion

Recommended initial motion:

- Assisted self-serve.
- Founder-led demos.
- Manual onboarding.
- Short pilot.
- Convert successful pilots to paid beta.

Avoid pure self-serve until auth, billing, onboarding, and support are robust.

### Sales readiness blockers

| Blocker | Impact |
|---|---|
| No Stripe checkout | Cannot self-serve convert. |
| No reliable CRM CRUD | Demo cannot become daily use. |
| Unsafe active RLS | Cannot onboard real customer data. |
| No import/export | Migration blocker. |
| No transactional emails | Invites, resets, notifications incomplete. |
| No test pipeline | Release confidence low. |
| Full-platform claims exceed backend reality | Sales trust risk. |

---

## 10. Security, Compliance, and Legal Review

### Required security standard

For the first CRM launch:

- Baseline SaaS security hygiene.
- Workspace-level tenant isolation.
- Strong password/auth flows via Supabase.
- Role-based access control.
- Audit logs for admin and data changes.
- Encrypted transport and provider-managed encryption at rest.
- Backups and data export/deletion process.

For future compliance/document/e-sign products:

- Stronger audit logs.
- Tamper-evident signature events.
- File storage access policies.
- Document retention controls.
- IP/user-agent/timestamp evidence.
- Legal review of signature enforceability and disclaimers.

### RLS status

| Table family | RLS posture | Risk |
|---|---|---|
| `crm_*` tables | Better workspace-scoped policies in migration 001 | Not actively used by current UI. |
| `leads`, `contacts`, `accounts`, `deals` | RLS enabled but policy only checks authenticated role | Critical tenant data leak risk. |
| `tickets`, `employees` | Same authenticated-only policy | Critical tenant data leak risk. |
| `platform_audit_logs` | Table exists | No application write layer found. |

### Audit logging needs

Log at minimum:

- Login/security changes.
- Workspace creation.
- User invite/role changes.
- Lead/contact/account/deal create/update/delete.
- Import/export events.
- Billing changes.
- File upload/download/delete.
- Admin setting changes.
- Failed permission attempts.

Suggested audit fields:

- `workspace_id`
- `actor_id`
- `action`
- `resource_type`
- `resource_id`
- `before`
- `after`
- `metadata`
- `ip_address`
- `user_agent`
- `created_at`

### Backup and data policy requirements

Before private beta:

- Daily database backups confirmed in Supabase project settings.
- Manual restore runbook.
- Workspace-level export process.
- Customer data deletion process.
- Soft-delete policy for CRM records.
- Retention period documented.
- Incident response contact and escalation path.

### Legal pages and disclaimers

Company-wide:

- Privacy policy.
- Terms of service.
- Cookie policy.
- Acceptable use policy.
- Data processing addendum.
- Subprocessor list.
- Refund/cancellation policy.
- Security overview.

Product-specific:

- CRM: data accuracy disclaimer, customer responsibility for lawful contact/import data.
- Email/sequences: anti-spam and consent disclaimer.
- Documents/e-sign: not legal advice; electronic signature validity depends on jurisdiction/use case.
- Accounting/payroll/tax: not financial, tax, or legal advice unless formally reviewed.
- AI: AI outputs may be inaccurate; user must review before use.

---

## 11. Build Pipeline Plan

The build pipeline should be tracked as six projects.

### Project 1: Initial Build

Objective:

Make a narrow CRM product genuinely usable end-to-end.

What must be true when complete:

- A user can register, create a workspace, create leads/contacts/accounts/deals, move deals through a pipeline, and see real CRM dashboard data.
- All active CRM data is tenant-isolated.

Top tasks:

| Task | Area | Priority | Complexity | Done criteria | Evidence |
|---|---|---:|---:|---|---|
| Choose canonical CRM schema | Supabase | Critical | S | One schema is documented; duplicate schema migration path agreed. | PR |
| Migrate UI to canonical CRM tables | Backend | Critical | M | Leads/contacts/accounts/deals read from tenant-safe tables. | PR |
| Replace authenticated-only RLS | RLS | Critical | M | User A cannot read User B workspace data in tests. | PR/test |
| Implement workspace memberships | Supabase | Critical | M | Users belong to workspace with role. | PR |
| Persist new lead flow | Frontend/Backend | Critical | S | New lead appears in list after refresh. | PR/screenshot |
| Persist contact/account/deal create flows | Frontend/Backend | Critical | M | Records create and link correctly. | PR |
| Persist pipeline stage changes | Frontend/Backend | High | M | Drag/drop or update stage survives refresh. | Loom |
| Add CRM dashboard real metrics | Backend/UI | High | M | Dashboard reflects real workspace records. | Screenshot |
| Fix seed data consistency | Admin | High | S | Seed scripts populate same tables UI reads. | PR |
| Add loading/error/empty states | UI | Medium | S | Main CRM pages handle empty DB cleanly. | Screenshot |

### Project 2: Upgrade Depth Build

Objective:

Make CRM valuable beyond basic record storage.

What must be true when complete:

- Users can manage the sales process with activities, notes, tasks, owners, filters, and basic reporting.

Top tasks:

| Task | Area | Priority | Complexity | Done criteria | Evidence |
|---|---|---:|---:|---|---|
| Add CRM activities table | Supabase | High | M | Notes/calls/emails/tasks attach to records. | PR |
| Add task creation on CRM records | Backend/UI | High | M | Task appears on record and home task queue. | Loom |
| Add owner assignment | Backend/UI | High | S | Owner can be changed and filtered. | Screenshot |
| Add saved filters/views | Frontend | Medium | M | User can save and reload list view. | Loom |
| Add CSV import for leads/contacts | Backend/UI | High | L | CSV imports with validation and duplicate handling. | Loom |
| Add CSV export | Backend/UI | High | M | Filtered list exports correct rows. | File |
| Add duplicate detection | Backend | Medium | M | Duplicate email/company warnings appear. | PR |
| Add quote/proposal from deal | Frontend/Backend | Medium | L | Deal can generate draft quote/proposal. | Loom |
| Add account health summary | Backend/UI | Medium | M | Account page shows deals/tickets/activity summary. | Screenshot |
| Add CRM report exports | Analytics | Medium | M | Pipeline report exports CSV/PDF. | File |

### Project 3: UI Design Upgrade

Objective:

Raise the CRM experience to a premium, sellable standard and reduce demo-only signals.

What must be true when complete:

- The CRM workflow feels polished, consistent, responsive, and credible on desktop and mobile.

Top tasks:

| Task | Area | Priority | Complexity | Done criteria | Evidence |
|---|---|---:|---:|---|---|
| Remove fake static counts | UI | High | XS | Counts come from data or disappear. | PR |
| Standardize status badges | UI | Medium | S | Badges use design tokens consistently. | Screenshot |
| Improve table responsiveness | UI | High | M | CRM lists usable on mobile and desktop. | Screenshot |
| Add skeleton/error states | UI | Medium | S | Loading and failed fetch states are polished. | Screenshot |
| Improve form validation UX | UI | High | S | Required fields and errors clear. | Loom |
| Add confirmation dialogs | UI | Medium | S | Deletes/archives require confirmation. | Screenshot |
| Add empty-state onboarding | UI | Medium | S | Empty CRM points user to first action. | Screenshot |
| Polish navigation labels | UI | Low | S | CRM menu prioritizes launch features. | PR |
| Hide unreleased modules behind flags | Frontend | High | M | Non-ready modules are not sold as live. | PR |
| Mobile smoke pass | QA | Medium | M | Key CRM flows work on mobile viewport. | Screenshots |

### Project 4: Commercial Depth and Gap Analysis

Objective:

Make Orbas sellable and billable.

What must be true when complete:

- A buyer can understand the offer, start a trial or assisted checkout, and be assigned the correct plan.

Top tasks:

| Task | Area | Priority | Complexity | Done criteria | Evidence |
|---|---|---:|---:|---|---|
| Finalize launch package | Sales | Critical | S | Day-1 offer, price, limits documented. | Doc |
| Add Stripe dependency and config | Stripe | Critical | S | Env vars and SDK configured. | PR |
| Create checkout session route | Stripe | Critical | M | User can start checkout. | Loom |
| Add Stripe webhook handler | Stripe | Critical | M | Subscription status updates DB. | PR/test |
| Add customer portal link | Stripe | High | S | Billing settings opens portal. | Loom |
| Add plan entitlement model | Backend | High | M | Workspace plan controls feature access. | PR |
| Add trial lifecycle fields | Backend | High | M | Trial start/end/status visible. | PR |
| Replace static pricing claims | Marketing | Medium | S | Pricing matches real Stripe plans. | PR |
| Add demo booking capture | Sales | Medium | M | Demo form stores lead or sends email. | PR |
| Add sales readiness checklist | Sales | Medium | S | Launch blocker checklist visible in docs. | Doc |

### Project 5: Security and Backend Hardening

Objective:

Make the product safe for real customer data.

What must be true when complete:

- Tenant isolation, permissions, audit logs, backups, exports, and deletion flows are real.

Top tasks:

| Task | Area | Priority | Complexity | Done criteria | Evidence |
|---|---|---:|---:|---|---|
| Add workspace membership table | Supabase | Critical | M | Membership supports owner/admin/member roles. | PR |
| Add RLS `WITH CHECK` policies | RLS | Critical | M | Inserts/updates cannot spoof workspace_id. | PR/test |
| Add permission helper | Backend | Critical | M | Server/client checks use shared role model. | PR |
| Add audit log writer | Backend | Critical | M | Mutations create audit entries. | PR |
| Add export/delete policy | Legal/Admin | High | M | Admin can request export/delete per workspace. | Doc/PR |
| Add storage buckets and policies | Supabase | High | M | Files are workspace-scoped. | PR |
| Add error monitoring | QA | High | S | Production errors are captured. | Screenshot |
| Add rate limiting strategy | Backend | Medium | M | Auth/contact forms protected. | PR |
| Add backup/restore runbook | Admin | High | S | Restore procedure documented. | Doc |
| Security smoke tests | QA/RLS | Critical | M | Cross-tenant read/write tests fail as expected. | Test |

### Project 6: Final Release Readiness

Objective:

Ship a controlled beta/public release with known scope and support.

What must be true when complete:

- The team can deploy, monitor, support, and iterate without guessing.

Top tasks:

| Task | Area | Priority | Complexity | Done criteria | Evidence |
|---|---|---:|---:|---|---|
| Add test runner | QA | High | S | `npm test` or equivalent exists. | PR |
| Add smoke tests | QA | High | M | Auth + CRM core workflows tested. | CI |
| Add CI build/lint | QA | High | M | PRs run build/lint/tests. | CI |
| Fix lint memory issue | QA | High | M | `npm run lint` completes locally/CI. | Logs |
| Fix production build reliability | QA | Critical | M | `npm run build` completes cleanly. | Logs |
| Add release checklist | Admin | Medium | S | Every release has checklist. | Doc |
| Add support inbox/process | Support | Medium | S | Support path and SLA defined. | Doc |
| Create demo script | Sales | Medium | S | Demo follows real workflows only. | Doc |
| Create onboarding guide | Customer Success | Medium | S | New beta customer can be onboarded. | Doc |
| Final legal review | Legal | High | M | Policies approved for beta/public launch. | Doc |

---

## 12. Notion-Ready Task Records

Use these fields for every tracked task:

`Task Name | Product | Project | Area | Priority | Status | Due Date | Owner | Complexity | Done Criteria | Evidence Link | Blocker | Notes`

Recommended status values:

- Backlog
- Ready
- In Progress
- Review
- Done
- Blocked

Recommended priorities:

- Critical
- High
- Medium
- Low

Recommended areas:

- Frontend
- Backend
- Supabase
- RLS
- UI
- Stripe
- AI
- Email
- Legal
- SEO
- Sales
- Finance
- Admin
- QA

Example tasks:

| Task Name | Product | Project | Area | Priority | Status | Owner | Complexity | Done Criteria | Evidence Link | Blocker | Notes |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Replace active CRM RLS policies | Orbas CRM | Security Hardening | RLS | Critical | Backlog | Blackwellen | M | Cross-workspace read/write attempts fail for all active CRM tables. | PR/test | Y | Blocks real customer data. |
| Persist new lead flow | Orbas CRM | Initial Build | Backend | Critical | Backlog | Blackwellen | S | Creating a lead inserts into DB and appears after refresh. | PR/Loom | Y | Core 10-minute value workflow. |
| Add Stripe checkout | Orbas CRM | Commercial Gap | Stripe | Critical | Backlog | Blackwellen | M | User can start checkout and subscription row updates after webhook. | PR/Loom | Y | Blocks self-serve revenue. |
| Add CSV export for leads | Orbas CRM | Upgrade Depth | Backend | High | Backlog | Blackwellen | M | Filtered lead list exports accurate CSV for current workspace only. | File/PR | N | Important buyer trust feature. |
| Create beta legal pack | Orbas CRM | Final Release | Legal | High | Backlog | Blackwellen | M | Privacy, terms, DPA, refund, AI/e-sign disclaimers reviewed. | Doc | Y | Blocks public launch. |

---

## 13. Launch and Sales Pipeline

### Launch entry: Orbas CRM beta

| Field | Value |
|---|---|
| Launch stage | Pre-beta |
| Target customer | UK SMB B2B service companies, 5-75 employees |
| Offer | Founder-led CRM beta |
| Pricing | GBP 99-199/month per workspace, then Pro per-seat pricing later |
| Landing page ready | Partially |
| Demo ready | Yes for guided demo, not for unsupervised trial |
| Demo data ready | Partially, but schema mismatch must be fixed |
| Stripe ready | No |
| Email sequence ready | No |
| Outreach list ready | Not found |
| Support ready | No |
| Legal ready | Partial/static only |
| Launch blockers | RLS, CRUD, Stripe, emails, build reliability, tests, support/legal |
| Next sales action | Define CRM-only beta offer and build demo script against real workflows |
| Target launch date | Set after Initial Build + Security Hardening are complete |

### Beta plan

Recommended beta:

- 3-5 founder-led beta customers.
- Each customer onboarded manually.
- Use one workspace per customer.
- No sensitive regulated data in first beta unless RLS and export/delete are complete.
- Weekly feedback calls.
- Track every bug and missing workflow in Blackwellen Tasks.

Beta acceptance criteria:

- Customer can create and manage real leads/contacts/accounts/deals.
- Customer can run one sales meeting using Orbas as source of truth.
- Customer can export their data.
- No cross-tenant data access is possible.
- Support path is clear and responded to within agreed SLA.

### Support plan

For beta:

- SLA: best effort, target same-business-day response.
- Escalation: founder/technical owner.
- Support channels: one email inbox plus direct onboarding channel.
- Incident severity:
  - P0: data leak, login outage, billing outage.
  - P1: core CRM workflow broken.
  - P2: non-core feature broken.
  - P3: UI polish/content issue.

---

## 14. Customer Acquisition Plan

### Recommended channels

| Channel | Product | Type | Cost | Time required | Difficulty | Lead quality | Status | Next action |
|---|---|---|---:|---:|---:|---:|---|---|
| Founder LinkedIn outreach | Orbas CRM | Outreach | Low | Medium | Medium | Medium/high | Not started | Build 50-account target list. |
| Direct local SMB outreach | Orbas CRM | Outreach | Low | Medium | Medium | Medium | Not started | Pick 2 verticals and write offer. |
| Partner accountants/consultants | Orbas CRM | Partnerships | Low/medium | High | High | High | Not started | Create partner one-pager. |
| SEO comparison pages | Orbas CRM | SEO | Low | High | Medium | Medium | Not started | Publish "HubSpot vs Orbas for UK SMBs". |
| Demo video | Orbas CRM | Content | Low | Medium | Medium | Medium | Not ready | Record after real workflows exist. |

### Minimum marketing assets

- CRM landing page aligned to actual launch scope.
- Pricing section matching real offer.
- 3-minute demo video using real persisted data.
- Security overview.
- Beta onboarding guide.
- Founder-led pitch deck/one-pager.
- Case study template.
- FAQ: migration, data ownership, cancellation, support, security.

---

## 15. Legal and Compliance Register

| Item | Product | Type | Required before launch | Status | Risk | Owner | Notes |
|---|---|---|---|---|---|---|---|
| Privacy policy | Company-wide | Legal | Yes | Static page exists | High | Blackwellen | Must reflect Supabase, Stripe, email provider, analytics. |
| Terms of service | Company-wide | Legal | Yes | Static page exists | High | Blackwellen | Must include beta limitations and acceptable use. |
| DPA | Company-wide | Legal | Yes for B2B | Missing | High | Blackwellen | Needed for customer personal data. |
| Subprocessor list | Company-wide | Legal | Yes | Missing | Medium | Blackwellen | Supabase, Vercel, Stripe, email provider, monitoring. |
| Refund/cancellation policy | Company-wide | Legal | Yes | Missing/partial | Medium | Blackwellen | Tie to Stripe and trial policy. |
| Cookie policy | Company-wide | Legal | Yes if cookies/analytics | Missing/partial | Medium | Blackwellen | Needs cookie banner if tracking used. |
| AI disclaimer | Orbas CRM/future AI | Legal | Before AI launch | Missing | Medium | Blackwellen | AI output review responsibility. |
| E-sign disclaimer | Documents/signatures | Legal | Before e-sign launch | Missing | High | Blackwellen | Do not claim legal validity without review. |
| Data export/deletion policy | Company-wide | Compliance | Yes | Missing | High | Blackwellen | Required for buyer trust and privacy obligations. |
| Incident response policy | Company-wide | Security | Before public launch | Missing | High | Blackwellen | Define breach process and contact. |

---

## 16. Domains, Emails, and Brand Assets Register

Use this structure for asset tracking.

| Asset Name | Product | Type | Provider | Renewal Date | Cost | Status | Link | Notes |
|---|---|---|---|---|---:|---|---|---|
| Orbas CRM logo | Orbas CRM | Logo | Repo/public | N/A | 0 | Present | `public/orbas crm logo.png` | Used by app/marketing. |
| Orbas CRM favicon | Orbas CRM | Favicon | Repo/public | N/A | 0 | Present | `public/orbas crm favicon.png` | Used by app. |
| Production domain | Orbas CRM | Domain | TBD | TBD | TBD | Unknown | TBD | Track registrar and DNS. |
| Support email | Orbas CRM | Email | TBD | TBD | TBD | Unknown | TBD | Required before beta. |
| Sales email | Orbas CRM | Email | TBD | TBD | TBD | Unknown | TBD | Required before outreach. |
| GitHub repo | Orbas CRM | Repo | GitHub/local | N/A | 0 | Present local | TBD | Add remote/PR links when publishing. |

---

## 17. Monthly Expenses Register

Use this structure for every recurring cost.

| Expense | Provider | Category | Allocation | Monthly Cost | Frequency | Annual Cost | Renewal Date | Payment Method | Essential | Can Cancel | Current Plan | Upgrade Needed | Invoice Link | Notes |
|---|---|---|---|---:|---|---:|---|---|---|---|---|---|---|---|
| Supabase | Supabase | Backend | Orbas/shared | TBD | Monthly | TBD | TBD | Card/Bank/PayPal | Yes | No | TBD | Likely yes for production | TBD | Database/auth/storage. |
| Vercel | Vercel | Hosting | Orbas/shared | TBD | Monthly | TBD | TBD | Card/Bank/PayPal | Yes | No | TBD | Maybe | Hosting/deployments. |
| Stripe | Stripe | Payments | Shared | 0 fixed | Per transaction | Variable | N/A | N/A | Yes | No | Standard | No | Dashboard | Payment processing. |
| Email provider | Resend or alternative | Email | Shared | TBD | Monthly | TBD | TBD | Card/Bank/PayPal | Yes | No | TBD | Yes before launch | TBD | Invites, resets, notifications. |
| Monitoring | Sentry or alternative | Observability | Shared | TBD | Monthly | TBD | TBD | Card/Bank/PayPal | Yes | Maybe | TBD | Yes before launch | TBD | Error visibility. |

---

## 18. Income Vehicles Register

Recommended income vehicles for Blackwellen around Orbas:

| Type | Status | Monthly Target | Current Monthly Income | Start Date | Time/week | Upfront Cost | Risk | Strategy | Next Action | Linked Product |
|---|---|---:|---:|---|---:|---:|---|---|---|---|
| SaaS subscription | Idea/testing | GBP 1k first | GBP 0 | TBD | High | Medium | Medium | Founder-led CRM beta. | Finish CRM Initial Build. | Orbas CRM |
| One-off onboarding | Idea | GBP 500-2k | GBP 0 | TBD | Medium | Low | Low/medium | Charge setup/migration fee for beta customers. | Define onboarding package. | Orbas CRM |
| Service implementation | Idea | GBP 2k-10k | GBP 0 | TBD | High | Low | Medium | Implement CRM/process setup for SMBs. | Create service offer. | Orbas CRM |
| Affiliate/partner | Idea | TBD | GBP 0 | TBD | Low | Low | Low | Partner with accountants/agencies. | Create partner one-pager. | Orbas CRM |

---

## 19. Decision Log

Use this structure for product decisions.

| Decision | Date | Product | Area | Context | Options Considered | Final Decision | Reason | Impact | Revisit Date | Notes |
|---|---|---|---|---|---|---|---|---|---|---|
| Launch CRM wedge first | June 2026 | Orbas CRM | Product | Full platform UI exceeds backend readiness. | Full platform, CRM-only, service-only | CRM-only launch wedge | Fastest route to paid beta with least compliance risk. | Hide/flag non-ready modules. | After beta 3 | Needs founder approval. |
| Use prefixed schema | June 2026 | Orbas CRM | Backend | Duplicate schema exists. | Keep unprefixed, use prefixed, create new | Use prefixed schema | Clear platform domain boundaries and safer policies. | Migrate active UI reads/writes. | Before Initial Build complete | Critical. |
| Assisted beta before self-serve | June 2026 | Orbas CRM | Sales | Billing/onboarding/support not self-serve ready. | Self-serve, assisted, sales-led | Assisted beta | Reduces support/security risk. | Manual onboarding accepted. | After 5 beta customers | Needs beta terms. |

---

## 20. Weekly Product Questions

Answer these every week for Orbas CRM:

1. What is the next single workflow that must work end-to-end?
2. What is the biggest commercial gap that prevents someone paying?
3. What is the biggest security/compliance gap that creates liability?
4. What is the one thing that improves demo quality the most this week?
5. What are the top 3 blockers stopping launch readiness?

Current answers:

1. Lead -> contact/account/deal -> pipeline movement -> dashboard metric.
2. No clear paid beta offer connected to Stripe/billing.
3. Active CRM table RLS does not enforce workspace isolation.
4. Make create lead/deal persist and survive refresh.
5. RLS, CRUD persistence, build/lint reliability.

---

## 21. Product Database Template for All SaaS Brands

Use this for Orbas CRM, Certificate Flow, Measure Deck, Caption Fox, Gala Dock, and Propvora.

### Product record fields

| Field | Description |
|---|---|
| Product name | Brand/product name. |
| One-sentence positioning | Who it is for and what outcome it gives. |
| Target customers | Industry, company size, role. |
| Top 3 painful problems | Ranked by severity. |
| Why we win | Differentiators and defensible advantages. |
| First 10-minute workflows | Must-have proof workflows. |
| What exists today | Only genuinely implemented features. |
| Demo/UI-only | Screens or actions without backend wiring. |
| Missing but assumed | Auth, permissions, billing, email, exports, audit, etc. |
| Data model summary | Core entities and relationships. |
| Pricing model | Tiers, limits, trials, onboarding. |
| ACV/ARPU | Expected revenue per customer. |
| Sales motion | Self-serve, assisted, sales-led. |
| Launch offer | Exact day-1 offer. |
| Sales blockers | Landing page, demo, pricing, support gaps. |
| Security standard | Required posture for product category. |
| RLS/tenant isolation | Current status. |
| Audit logging | Required events. |
| Backup/export/deletion | Required policies. |
| Legal disclaimers | Product-specific disclaimers. |
| Launch date | Target date. |
| Milestones | Major delivery milestones. |
| Beta plan | Who, how many, onboarding. |
| Support plan | SLA and escalation. |
| Marketing assets | Landing, demo, case study, outreach. |

---

## 22. Final Recommendation

Treat Orbas CRM as a high-potential product shell, not a finished SaaS. The fastest credible path is:

1. Narrow launch scope to CRM.
2. Fix tenant isolation on the actual tables the UI uses.
3. Pick one database schema and migrate everything to it.
4. Implement real CRUD for the lead/contact/account/deal workflow.
5. Add audit logs, exports, and basic support/legal readiness.
6. Add Stripe only after the beta offer is finalized.
7. Hide or clearly label non-ready platform modules until they are wired.

The current UI breadth is a commercial advantage for demos, but it is also the main engineering risk. Launch should be based on a smaller number of workflows that are genuinely built, secure, and repeatable.
