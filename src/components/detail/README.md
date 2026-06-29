# Detail-page scaffold

Shared building blocks for every `[id]` / profile page. **Compose these — don't reimplement.**
See the "Component Architecture — Modular, Not Monolithic" section in `CLAUDE.md`.

## Components

| Component | Role |
|---|---|
| `DetailShell` | Page frame: hero slot + tabs slot + main content + optional right rail. |
| `EntityHero` | Cover banner + avatar/logo + title + status + key-stat strip + actions. |
| `DetailTabs` | Tab nav — **sub-route mode** (`basePath` + `<Link>`) or **in-page mode** (`value`/`onValueChange`). |
| `RecordSummaryPanel` / `SummaryCard` / `SummaryFacts` | Right-rail cards for lifecycle, facts, linked records. |

## Pattern A — sub-route tabs (preferred for heavy detail pages)

Each tab is its own deep-linkable `page.tsx`. The `[id]/layout.tsx` renders the chrome.

```
app/operations/suppliers/[id]/
  layout.tsx          # EntityHero + DetailTabs(basePath) + {children}
  page.tsx            # redirect('./overview')
  overview/page.tsx   # <OverviewTab/> imported from ../_tabs or local _components
  spend/page.tsx
  pos/page.tsx
  documents/page.tsx  # <MediaDocumentsTab/>
  _components/        # supplier-specific pieces (e.g. supplier-scorecard.tsx)
```

```tsx
// app/operations/suppliers/[id]/layout.tsx
"use client";
import { useParams } from "next/navigation";
import { DetailShell, EntityHero, DetailTabs } from "@/components/detail";
import { getSupplier } from "../_data"; // or fetch

const TABS = [
  { key: "overview", label: "Overview", href: "overview" },
  { key: "spend", label: "Spend", href: "spend" },
  { key: "pos", label: "Purchase Orders", href: "pos", count: 12 },
  { key: "documents", label: "Documents", href: "documents" },
];

export default function SupplierLayout({ children }: { children: React.ReactNode }) {
  const { id } = useParams<{ id: string }>();
  const s = getSupplier(id);
  const base = `/app/operations/suppliers/${id}`;
  return (
    <DetailShell
      hero={
        <EntityHero
          kind="logo"
          name={s.name}
          subtitle={s.category}
          backHref="/app/operations/suppliers"
          status={{ label: s.status, color: "#16a34a", bg: "#dcfce7" }}
          stats={[
            { label: "Total spend", value: s.spend },
            { label: "On-time %", value: s.otd },
            { label: "Open POs", value: s.openPos },
            { label: "Rating", value: s.rating },
          ]}
        />
      }
      tabs={<DetailTabs basePath={base} items={TABS} />}
    >
      {children}
    </DetailShell>
  );
}
```

## Pattern B — in-page tabs (lighter pages)

Each panel is still its own file in `_tabs/`, imported and switched by controlled state.

```tsx
"use client";
import { useState } from "react";
import { DetailShell, EntityHero, DetailTabs } from "@/components/detail";
import { OverviewTab } from "./_tabs/overview-tab";
import { ActivityTab } from "./_tabs/activity-tab";

const TABS = [
  { key: "overview", label: "Overview" },
  { key: "activity", label: "Activity" },
];

export default function Page() {
  const [tab, setTab] = useState("overview");
  return (
    <DetailShell
      hero={<EntityHero name="…" />}
      tabs={<DetailTabs items={TABS} value={tab} onValueChange={setTab} />}
    >
      {tab === "overview" && <OverviewTab />}
      {tab === "activity" && <ActivityTab />}
    </DetailShell>
  );
}
```
