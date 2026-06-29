"use client";

import { useParams } from "next/navigation";
import { Package2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DetailShell,
  EntityHero,
  DetailTabs,
  RecordSummaryPanel,
  SummaryCard,
  SummaryFacts,
} from "@/components/detail";
import { EntityAvatar } from "@/components/media/entity-avatar";
import { formatCurrency } from "@/lib/utils";
import { getSupplier, supplierLogo, statusColor, contactAvatar } from "./_data";

const TABS = [
  { key: "overview", label: "Overview", href: "overview" },
  { key: "catalogue", label: "Catalogue", href: "catalogue" },
  { key: "purchase-orders", label: "Purchase Orders", href: "purchase-orders" },
  { key: "bills", label: "Bills", href: "bills" },
  { key: "contacts", label: "Contacts", href: "contacts" },
  { key: "performance", label: "Performance", href: "performance" },
  { key: "documents", label: "Documents", href: "documents" },
];

export default function SupplierLayout({ children }: { children: React.ReactNode }) {
  const { id } = useParams<{ id: string }>();
  const s = getSupplier(id);
  const base = `/app/operations/suppliers/${id}`;
  const primary = s.contacts.find((c) => c.primary) ?? s.contacts[0];

  return (
    <DetailShell
      hero={
        <EntityHero
          kind="logo"
          name={s.name}
          imageUrl={supplierLogo(s)}
          subtitle={`${s.category} · ${s.city}, ${s.country} · ${s.accountRef}`}
          backHref="/app/operations/suppliers"
          backLabel="Suppliers"
          status={{ label: s.status, ...statusColor(s.status) }}
          stats={[
            { label: "Spend YTD", value: formatCurrency(s.spendYtd) },
            { label: "On-time delivery", value: `${s.onTimeDelivery}%` },
            { label: "Open POs", value: s.openPos },
            { label: "Quality", value: `${s.qualityScore}/5` },
          ]}
          actions={
            <Button size="sm" className="gap-1" style={{ background: "var(--primary)", color: "#fff" }}>
              <Package2 className="h-4 w-4" /> New PO
            </Button>
          }
        />
      }
      tabs={<DetailTabs basePath={base} items={TABS} />}
      rightRail={
        <RecordSummaryPanel>
          <SummaryCard title="Supplier details">
            <SummaryFacts
              rows={[
                { label: "Account ref", value: s.accountRef },
                { label: "Payment terms", value: s.paymentTerms },
                { label: "Currency", value: s.currency },
                { label: "VAT / Tax ref", value: s.taxRef },
                { label: "Website", value: <a href={`https://${s.domain}`} target="_blank" rel="noreferrer" style={{ color: "var(--primary)" }}>{s.website}</a> },
              ]}
            />
          </SummaryCard>
          {primary && (
            <SummaryCard title="Primary contact">
              <div className="flex items-center gap-3">
                <EntityAvatar name={primary.name} src={contactAvatar(primary.name)} size="md" />
                <div className="min-w-0">
                  <div className="truncate text-sm font-medium" style={{ color: "var(--foreground)" }}>{primary.name}</div>
                  <div className="truncate text-xs" style={{ color: "var(--muted-foreground)" }}>{primary.role}</div>
                  <div className="truncate text-xs" style={{ color: "var(--muted-foreground)" }}>{primary.email}</div>
                </div>
              </div>
            </SummaryCard>
          )}
        </RecordSummaryPanel>
      }
    >
      {children}
    </DetailShell>
  );
}
