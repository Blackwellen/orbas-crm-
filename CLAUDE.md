# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## What this project is

**Orbas CRM** is an enterprise "operating suite" — a multi-app SaaS ERP/CRM (12+ business apps: CRM, Accounting, Operations, Projects, People/HR, Service, Documents, Analytics, Compliance, Charity, Automations, Connect) plus a marketing site, auth, onboarding wizard, and a white-label client portal. It is a Next.js 16 + React 19 app, styled with Tailwind v4 CSS variables, with Supabase for auth (and, progressively, data). The current build is broad and well-architected but mostly uses rich inline mock data; the active work programme is documented in [docs/orbas-crm-ux-enhancement-audit.md](docs/orbas-crm-ux-enhancement-audit.md) (per-route plan to add charts, maps, media, boards, timelines, inline editing, and premium polish).

## Commands

```bash
npm run dev       # Start development server on localhost:3000
npm run build     # Production build
npm run lint      # Run ESLint (eslint.config.mjs, Next.js config)
npm run start     # Start production server (after build)
```

There is no test runner configured in this project.

## Next.js Version Warning

This project runs **Next.js 16** with React 19. Key breaking changes from training data:

- `params` and `searchParams` in page/layout components are **Promises** — always `const { id } = await params` in async server components.
- Client-side detail pages use `useParams()` instead (they are `"use client"` with `useParams` from `next/navigation`).
- Read `node_modules/next/dist/docs/` before making assumptions about APIs.

## Architecture

### Route structure

> Note: the authenticated app lives under a **literal `app/` folder** (`src/app/app/...`), serving routes at `/app/*`. It is **not** an `(app)` route group — the route group was renamed to a literal folder to avoid a path collision that broke the production build. Do not reintroduce an `(app)` group.

```
src/app/
  (public)/          # Marketing site — no auth, no TopNav (route group: no URL segment)
  (auth)/            # Login, register, forgot-password, MFA, verify-email (route group)
  onboarding/        # Multi-step workspace setup (profile → workspace → team → apps → finish)
  app/               # All authenticated app pages — served at /app/*, protected by the app layout
  portal/            # White-label client portal
  platform-admin/    # Super-admin console
  sign/[token]/      # Public e-signature page
  icon.png           # Favicon (transparent brand mark) — also favicon.ico
```

### Auth & Middleware

`src/middleware.ts` runs `updateSession` on every request (excluding static assets). The app layout calls `supabase.auth.getUser()` server-side and redirects unauthenticated users to `/login`.

Supabase clients:
- `@/lib/supabase/server` — server components / route handlers (`await createClient()`)
- `@/lib/supabase/client` — client components (`createClient()`, browser)
- `@/lib/supabase/middleware` — middleware only

Env vars (set in `.env.local` locally; set in Vercel for Production/Preview/Development): `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` (server-only), `NEXT_PUBLIC_APP_URL`, `SUPABASE_ACCESS_TOKEN` (PAT for the Supabase Management API/CLI — never used client-side).

### App Shell Pattern

Every app module under `app/` follows the same layout pattern:

```
app/<module>/
  layout.tsx    ← "use client", renders <AppSidebar items={...}> + <main> with ml-16/ml-60
  page.tsx      ← "use client", L1 dashboard
  <section>/
    page.tsx        ← list view
    [id]/page.tsx   ← detail view (uses useParams())
```

The `AppSidebar` (`src/components/layout/app-sidebar.tsx`) accepts a `SidebarItem[]` prop. Width is `64px` collapsed / `240px` expanded, toggled via `useAppStore`. The `<main>` in each layout must use `md:ml-16` / `md:ml-60` matching the sidebar state.

The `TopNav` is mounted once in the app root layout and provides the app launcher (grid icon), workspace switcher, breadcrumb, global search, quick-create dropdown, and user avatar.

## Component Architecture — Modular, Not Monolithic

**This is a hard rule.** Pages are composed from small, single-purpose component files. Never ship a 600-line `page.tsx` that inlines a table, charts, tabs, and dialogs.

### Rules
1. **One component, one file.** A list table, a chart, a detail tab panel, a filter bar, a dialog — each lives in its own file. `page.tsx` is a thin container that composes them.
2. **Co-locate route-private pieces** in an underscore folder next to the route. Next.js App Router treats `_`-prefixed folders as **private** (not routes):
   - `app/operations/suppliers/_components/suppliers-table.tsx`
   - `app/operations/suppliers/[id]/_tabs/overview-tab.tsx`
   - `app/operations/suppliers/[id]/_components/supplier-hero.tsx`
3. **Promote shared, cross-module composites** to `src/components/` (see "Shared component library" below). If two modules need it, it does not belong in a route's `_components`.
4. **Deep tabs become sub-routes.** A detail page with heavy tabs uses real nested routes so each tab is its own page/file and is deep-linkable:
   ```
   app/operations/suppliers/[id]/
     layout.tsx           ← renders <EntityHero> + <DetailTabs> (the tab chrome), {children}
     page.tsx             ← redirects to the default tab (./overview)
     overview/page.tsx    ← Overview tab content (its own file)
     spend/page.tsx       ← Spend tab content
     pos/page.tsx         ← Purchase-orders tab content
     documents/page.tsx   ← Media/Documents tab content
     _components/...       ← supplier-specific pieces
   ```
   For lighter detail pages, in-page tabs are acceptable, but **each tab panel is still its own file** in `[id]/_tabs/` and imported into `page.tsx`.
5. **Tables are always their own file**, named `<entity>-table.tsx`, receiving data + handlers as props. The list `page.tsx` owns state/filters and renders `<EntityTable>`.
6. **Profile/detail pages compose**, they don't reimplement: every `[id]` page is built from `<DetailShell>` + `<EntityHero>` + `<DetailTabs>` + tab files + `<RecordSummaryPanel>` (see scaffold in `src/components/detail/`).

### Detail-page scaffold (use this for every `[id]` / profile page)
Shared building blocks live in `src/components/detail/`:
- `DetailShell` — page frame: hero slot, tab slot, main + optional right rail.
- `EntityHero` — cover banner + avatar/logo + title + key-stat strip + action buttons. Used for every entity (supplier, employee, donor, account, asset, …).
- `DetailTabs` — tab navigation that works in **sub-route mode** (Next `<Link>` + `usePathname`) or **in-page mode** (controlled `value`/`onChange`).
- `RecordSummaryPanel` — right-rail card group for lifecycle, linked records, quick facts.

See `src/components/detail/README.md` for the copy-paste template.

## Shared component library

Cross-module composites live under `src/components/`. Build once, reuse everywhere (this is the Phase 0 foundation in the audit). Target structure:

```
src/components/
  ui/          # Radix-wrapped primitives (button, card, dialog, tabs, avatar, badge, …)
  layout/      # app-sidebar, top-nav, shells
  detail/      # DetailShell, EntityHero, DetailTabs, RecordSummaryPanel  (detail-page scaffold)
  charts/      # ChartWidget, KpiSparklineCard, gauges, funnels, waterfalls, heatmaps
  data/        # DataTable, ViewSwitcher, FilterBar, SavedViewChips, BulkActionBar, InlineEditCell
  board/       # KanbanBoard, GanttChart, CalendarGrid, DashboardGrid
  media/       # EntityAvatar, AvatarStack, ImageGallery, MediaLightbox, file previews, uploaders, ProviderLogo
  map/         # MapView and entity map variants
  timeline/    # Timeline
  marketing/   # ProductScreenshot, LogoWall, TestimonialCarousel, StatCounter, SectionReveal
```

When a route needs one of these and it doesn't exist yet, build it in the shared location (not inline), then consume it.

### Global State (Zustand)

- `useAppStore` (`src/store/app-store.ts`) — `currentWorkspace`, `currentApp`, `sidebarCollapsed`, chat bubble open/tab state.
- `useUserStore` (`src/store/user-store.ts`) — authenticated `AppUser` (id, email, fullName, avatarUrl, role).

### App Modules

| Route | Module |
|---|---|
| `/app/home` | Personal cockpit, tasks, approvals, inbox |
| `/app/crm` | Leads, contacts, accounts, deals, pipelines, campaigns |
| `/app/accounting` | Invoices, bills, expenses, banking, payroll, tax |
| `/app/operations` | Inventory, purchase orders, suppliers, shipments, assets, warehouses, manufacturing, field-service |
| `/app/projects` | Projects, tasks, Gantt, time tracking |
| `/app/people` | Employees, HR, leave, org chart, payroll |
| `/app/service` | Helpdesk tickets, queues, knowledge base |
| `/app/documents` | DMS, e-sign |
| `/app/analytics` | BI dashboards, datasets, metrics |
| `/app/compliance` | Risk register, controls, policies, audits, incidents |
| `/app/charity` | Donors, donations, Gift Aid, campaigns, grants |
| `/app/automations` | Workflows, triggers, run history, templates |
| `/app/connect` | Omnichannel inbox, email, DMs, live-chat |
| `/app/settings` | Profile, security, notifications, appearance, tokens, billing |
| `/app/admin` | Workspace admin console |
| `/platform-admin` | Super-admin (tenants, MRR) |
| `(public)/` | Marketing pages (landing, pricing, features, legal) |

### Styling Rules

This project uses **Tailwind v4** with CSS custom properties. The design token source of truth is `src/app/globals.css`.

**Do not use hardcoded Tailwind color utilities** (`text-gray-*`, `bg-slate-*`, `bg-blue-*`, etc.) and **do not use inline `style={{ background: "white" }}`** (breaks dark mode). Always reference CSS variables:

```tsx
// Correct
<div style={{ color: "var(--foreground)", background: "var(--card)" }}>
<div className="text-[var(--muted-foreground)] bg-[var(--secondary)]">

// For status badges — use inline hex (or the --status-* tokens) since Tailwind color classes are banned
<span style={{ backgroundColor: '#dcfce7', color: '#16a34a' }}>Active</span>
```

Key tokens: `--primary` (#1a56db), `--accent` (#06b6d4), `--sidebar-bg` (#0f172a), `--background`, `--foreground`, `--muted`, `--muted-foreground`, `--border`, `--secondary`, `--destructive`, `--card`. Status colors: `--status-green`, `--status-amber`, `--status-red`, `--status-blue`, `--status-purple`, `--status-gray`.

Brand utilities: `.orbas-gradient` and `.orbas-gradient-text` (blue-to-cyan gradient).

### UI Components

Radix UI primitives are wrapped in `src/components/ui/` (Button, Card, Dialog, DropdownMenu, Select, Tabs, etc.). These are shadcn-style but styled with CSS variables only — no shadcn default theming.

Charts use **Recharts** (`recharts`). Drag-and-drop uses **@dnd-kit**. Forms use **react-hook-form** + **zod**. Icons exclusively from **lucide-react**. (Maps / PDF / flow-canvas libraries are introduced in Phase 0 of the audit.)

### Data: client components + mock data (transitional)

Every page and layout under `app/` is `"use client"` with rich inline mock data arrays (15+ records per list). Server-side data fetching is not yet wired in app pages — Supabase is used for auth. When wiring real data, keep the modular split: data-loading lives in the page/container; presentational tables/charts/tabs stay prop-driven and dumb.

### Path Alias

`@/` maps to `src/`. Use it for all imports.

### Currency and Locale

Utility functions in `src/lib/utils.ts`: `formatCurrency` (defaults to GBP/en-GB), `formatDate`, `formatRelativeTime`, `getInitials`, `cn` (clsx + tailwind-merge). Always render money via `formatCurrency` — never hand-concatenate a `£` (avoids encoding/mojibake issues).
