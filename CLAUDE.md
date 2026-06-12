# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

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

### Route Groups

```
src/app/
  (public)/          # Marketing site — no auth, no TopNav
  (auth)/            # Login, register, forgot-password, MFA, verify-email
  onboarding/        # Multi-step workspace setup (profile → workspace → team → apps → finish)
  (app)/             # All authenticated app pages — protected by AppLayout
```

### Auth & Middleware

`src/middleware.ts` runs `updateSession` on every request (excluding static assets). The `(app)` layout (`src/app/(app)/layout.tsx`) additionally calls `supabase.auth.getUser()` server-side and redirects unauthenticated users to `/login`.

Supabase clients:
- `@/lib/supabase/server` — server components / route handlers (`await createClient()`)
- `@/lib/supabase/client` — client components (`createClient()`, browser)
- `@/lib/supabase/middleware` — middleware only

### App Shell Pattern

Every app module under `(app)/` follows the same layout pattern:

```
(app)/<module>/
  layout.tsx    ← "use client", renders <AppSidebar items={...}> + <main> with ml-16/ml-60
  page.tsx      ← "use client", L1 dashboard
  <section>/
    page.tsx    ← list view
    [id]/page.tsx ← detail view (uses useParams())
```

The `AppSidebar` (`src/components/layout/app-sidebar.tsx`) accepts a `SidebarItem[]` prop. Width is `64px` collapsed / `240px` expanded, toggled via `useAppStore`. The `<main>` in each layout must use `md:ml-16` / `md:ml-60` matching the sidebar state.

The `TopNav` is mounted once in the `(app)` root layout and provides the app launcher (grid icon), workspace switcher, breadcrumb, global search, quick-create dropdown, and user avatar.

### Global State (Zustand)

- `useAppStore` (`src/store/app-store.ts`) — `currentWorkspace`, `currentApp`, `sidebarCollapsed`, chat bubble open/tab state.
- `useUserStore` (`src/store/user-store.ts`) — authenticated `AppUser` (id, email, fullName, avatarUrl, role).

### App Modules

| Route | Module |
|---|---|
| `/app/home` | Personal cockpit, tasks, approvals, inbox |
| `/app/crm` | Leads, contacts, accounts, deals, pipelines, campaigns |
| `/app/accounting` | Invoices, bills, expenses, banking, payroll, tax |
| `/app/operations` | Inventory, purchase orders, suppliers, shipments, assets |
| `/app/projects` | Projects, tasks, Gantt, time tracking |
| `/app/people` | Employees, HR, leave, org chart, payroll |
| `/app/service` | Helpdesk tickets, queues, knowledge base |
| `/app/documents` | DMS, e-sign |
| `/app/analytics` | BI dashboards, datasets, metrics |
| `/app/compliance` | Risk register, controls, policies, audits, incidents |
| `/app/charity` | Donors, donations, Gift Aid, campaigns, grants |
| `/app/automations` | Workflows, triggers, run history, templates |
| `/app/settings` | Profile, security, notifications, appearance, tokens, billing |
| `/app/admin` | Platform admin console |
| `(public)/` | Marketing pages (landing, pricing, features, legal) |

### Styling Rules

This project uses **Tailwind v4** with CSS custom properties. The design token source of truth is `src/app/globals.css`.

**Do not use hardcoded Tailwind color utilities** (`text-gray-*`, `bg-slate-*`, `bg-blue-*`, etc.). Always reference CSS variables:

```tsx
// Correct
<div style={{ color: "var(--foreground)", background: "var(--card)" }}>
<div className="text-[var(--muted-foreground)] bg-[var(--secondary)]">

// For status badges — use inline hex since Tailwind color classes are banned
<span style={{ backgroundColor: '#dcfce7', color: '#16a34a' }}>Active</span>
```

Key tokens: `--primary` (#1a56db), `--accent` (#06b6d4), `--sidebar-bg` (#0f172a), `--background`, `--foreground`, `--muted`, `--muted-foreground`, `--border`, `--secondary`, `--destructive`, `--card`. Status colors: `--status-green`, `--status-amber`, `--status-red`, `--status-blue`, `--status-purple`, `--status-gray`.

Brand utilities: `.orbas-gradient` and `.orbas-gradient-text` (blue-to-cyan gradient).

### UI Components

Radix UI primitives are wrapped in `src/components/ui/` (Button, Card, Dialog, DropdownMenu, Select, Tabs, etc.). These are shadcn-style but styled with CSS variables only — no shadcn default theming.

Charts use **Recharts** (`recharts`). Drag-and-drop uses **@dnd-kit**. Forms use **react-hook-form** + **zod**. Icons exclusively from **lucide-react**.

### All Pages Are Client Components

Every page and layout under `(app)/` is `"use client"` with rich inline mock data arrays (15+ records per list). There is no server-side data fetching in app pages currently — Supabase is only used for auth.

### Path Alias

`@/` maps to `src/`. Use it for all imports.

### Currency and Locale

Utility functions in `src/lib/utils.ts`: `formatCurrency` (defaults to GBP/en-GB), `formatDate`, `formatRelativeTime`, `getInitials`, `cn` (clsx + tailwind-merge).
