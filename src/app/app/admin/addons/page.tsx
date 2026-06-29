"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  MessageSquare, Phone, Video, CreditCard, Building2, RefreshCw,
  Zap, Bell, Bot, FileSearch, Receipt, Shield, Lock, PenSquare,
  Landmark, Package, Settings, CheckCircle
} from "lucide-react"

type AddOnStatus = "Active" | "Available" | "Coming Soon"
type Category = "Communication" | "Finance" | "Integrations" | "AI" | "Compliance" | "Included"

interface AddOn {
  id: number
  name: string
  description: string
  price: string
  priceLabel: string
  status: AddOnStatus
  category: Category
  icon: React.ElementType
  activatedDate?: string
}

const addons: AddOn[] = [
  {
    id: 1, name: "WhatsApp Business Messaging", category: "Communication",
    description: "Send and receive WhatsApp messages directly from CRM records. Automate notifications and support workflows via the official Business API.",
    price: "£29/month", priceLabel: "£29/mo", status: "Active", icon: MessageSquare, activatedDate: "12 Feb 2025"
  },
  {
    id: 2, name: "SMS Notifications", category: "Communication",
    description: "Send SMS alerts, appointment reminders, and bulk campaigns to contacts. Powered by Twilio with full delivery tracking.",
    price: "£19/month", priceLabel: "£19/mo", status: "Available", icon: Phone
  },
  {
    id: 3, name: "Video Meetings (Jitsi)", category: "Communication",
    description: "Launch secure, end-to-end encrypted video calls from any CRM contact or deal record. No app download required for guests.",
    price: "£25/month", priceLabel: "£25/mo", status: "Active", icon: Video, activatedDate: "1 Mar 2025"
  },
  {
    id: 4, name: "GoCardless Direct Debit", category: "Finance",
    description: "Collect recurring payments and one-off charges via Direct Debit. Fully integrated with Invoices and Subscription Billing.",
    price: "£19/month", priceLabel: "£19/mo", status: "Available", icon: CreditCard
  },
  {
    id: 5, name: "Companies House Monitoring", category: "Finance",
    description: "Auto-enrich account records with live Companies House data. Get alerts on director changes, filings, and status changes.",
    price: "Free", priceLabel: "Free", status: "Active", icon: Building2, activatedDate: "20 Jan 2025"
  },
  {
    id: 6, name: "Xero Sync", category: "Integrations",
    description: "Bi-directional sync with Xero. Invoices, contacts, and payments stay in sync automatically — no more double-entry.",
    price: "£15/month", priceLabel: "£15/mo", status: "Available", icon: RefreshCw
  },
  {
    id: 7, name: "QuickBooks Sync", category: "Integrations",
    description: "Keep your QuickBooks Online ledger in sync with Orbas Accounting. Supports UK, US, and international editions.",
    price: "£15/month", priceLabel: "£15/mo", status: "Available", icon: RefreshCw
  },
  {
    id: 8, name: "Zapier Connect", category: "Integrations",
    description: "Connect Orbas to 5,000+ apps via Zapier. Create triggers and actions for any module without writing code.",
    price: "£9/month", priceLabel: "£9/mo", status: "Active", icon: Zap, activatedDate: "5 Apr 2025"
  },
  {
    id: 9, name: "Slack Notifications", category: "Integrations",
    description: "Post real-time alerts to Slack channels for deals won, invoices paid, new leads, and custom automation events.",
    price: "Free", priceLabel: "Free", status: "Available", icon: Bell
  },
  {
    id: 10, name: "AI Copilot Enhanced", category: "AI",
    description: "Unlock GPT-4o-powered suggestions across all modules: email drafting, deal scoring, meeting summaries, and risk analysis.",
    price: "£39/month", priceLabel: "£39/mo", status: "Active", icon: Bot, activatedDate: "18 Mar 2025"
  },
  {
    id: 11, name: "AI Document Analysis", category: "AI",
    description: "Automatically extract key clauses, dates, and obligations from uploaded contracts, invoices, and compliance documents.",
    price: "£29/month", priceLabel: "£29/mo", status: "Available", icon: FileSearch
  },
  {
    id: 12, name: "HMRC MTD Direct", category: "Compliance",
    description: "Submit VAT returns directly to HMRC under Making Tax Digital. Fully compatible with MTD for VAT and MTD for ITSA.",
    price: "Included", priceLabel: "Included", status: "Active", icon: Receipt, activatedDate: "1 Jan 2025"
  },
  {
    id: 13, name: "GDPR Consent Manager", category: "Compliance",
    description: "Manage data subject consent, privacy requests, and retention schedules. Includes cookie consent banner for your portals.",
    price: "Included", priceLabel: "Included", status: "Active", icon: Shield, activatedDate: "1 Jan 2025"
  },
  {
    id: 14, name: "Two-Factor Authentication", category: "Compliance",
    description: "Enforce MFA across your workspace with TOTP authenticator apps, SMS codes, or hardware security keys.",
    price: "Included", priceLabel: "Included", status: "Active", icon: Lock, activatedDate: "1 Jan 2025"
  },
  {
    id: 15, name: "eSignature (Native)", category: "Included",
    description: "Send documents for legally binding e-signature from within Orbas Documents. Audit trail and certificate of completion included.",
    price: "Included", priceLabel: "Included", status: "Active", icon: PenSquare, activatedDate: "1 Jan 2025"
  },
  {
    id: 16, name: "Open Banking (TrueLayer)", category: "Finance",
    description: "Connect bank accounts via TrueLayer for automatic transaction import and reconciliation. Free tier: up to 2 accounts.",
    price: "Free tier", priceLabel: "Free tier", status: "Available", icon: Landmark
  },
]

const filterTabs = ["All", "Communication", "Finance", "Integrations", "AI", "Compliance"] as const
type FilterTab = typeof filterTabs[number]

const activeAddons = addons.filter(a => a.status === "Active")

export default function AddOnsPage() {
  const [activeFilter, setActiveFilter] = useState<FilterTab>("All")
  const [activating, setActivating] = useState<number | null>(null)

  const filtered = activeFilter === "All"
    ? addons
    : addons.filter(a => a.category === activeFilter || (activeFilter === "Compliance" && a.category === "Included"))

  function handleActivate(id: number) {
    setActivating(id)
    setTimeout(() => setActivating(null), 1500)
  }

  function getStatusBadge(status: AddOnStatus) {
    if (status === "Active") return { backgroundColor: "#dcfce7", color: "#16a34a" }
    if (status === "Available") return { backgroundColor: "#dbeafe", color: "#1a56db" }
    return { backgroundColor: "#f1f5f9", color: "#64748b" }
  }

  function getCategoryBadge(cat: Category) {
    const map: Record<Category, { bg: string; color: string }> = {
      Communication: { bg: "#fce7f3", color: "#be185d" },
      Finance: { bg: "#dcfce7", color: "#15803d" },
      Integrations: { bg: "#ede9fe", color: "#6d28d9" },
      AI: { bg: "#fef9c3", color: "#92400e" },
      Compliance: { bg: "#e0f2fe", color: "#0369a1" },
      Included: { bg: "#f0fdf4", color: "#14532d" },
    }
    return map[cat] || { bg: "#f1f5f9", color: "#64748b" }
  }

  return (
    <div className="p-6 space-y-6" style={{ background: "var(--background)", minHeight: "100vh" }}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div style={{ width: 40, height: 40, borderRadius: 10, background: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Package className="w-5 h-5" style={{ color: "#fff" }} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>Add-On Marketplace</h1>
              <span style={{ backgroundColor: "#dbeafe", color: "#1a56db", padding: "2px 10px", borderRadius: 9999, fontSize: 12, fontWeight: 600 }}>
                {activeAddons.length} Active
              </span>
            </div>
            <p className="text-sm mt-1" style={{ color: "var(--muted-foreground)" }}>Extend Orbas with powerful integrations and features</p>
          </div>
        </div>
      </div>

      <div className="flex gap-1 flex-wrap">
        {filterTabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveFilter(tab)}
            style={{
              padding: "6px 14px",
              borderRadius: 9999,
              fontSize: 13,
              fontWeight: 500,
              border: activeFilter === tab ? "none" : "1px solid var(--border)",
              background: activeFilter === tab ? "var(--primary)" : "var(--card)",
              color: activeFilter === tab ? "#fff" : "var(--muted-foreground)",
              cursor: "pointer",
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map(addon => {
          const catStyle = getCategoryBadge(addon.category)
          const statusStyle = getStatusBadge(addon.status)
          return (
            <Card key={addon.id} style={{
              background: "var(--card)",
              border: addon.status === "Active" ? "1.5px solid #16a34a" : "1px solid var(--border)",
              opacity: addon.status === "Coming Soon" ? 0.7 : 1,
            }}>
              <CardContent className="pt-4 pb-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div style={{
                      width: 42, height: 42, borderRadius: 10,
                      background: addon.status === "Active" ? "#dcfce7" : "var(--secondary)",
                      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
                    }}>
                      <addon.icon className="w-5 h-5" style={{ color: addon.status === "Active" ? "#16a34a" : "var(--muted-foreground)" }} />
                    </div>
                    <div>
                      <div className="font-semibold text-sm" style={{ color: "var(--foreground)" }}>{addon.name}</div>
                      <span style={{ ...catStyle, fontSize: 10, fontWeight: 500, padding: "1px 7px", borderRadius: 9999 }}>
                        {addon.category}
                      </span>
                    </div>
                  </div>
                  <span style={{ ...statusStyle, fontSize: 11, fontWeight: 500, padding: "2px 8px", borderRadius: 9999, whiteSpace: "nowrap", marginLeft: 8 }}>
                    {addon.status}
                  </span>
                </div>

                <p className="text-xs mb-3" style={{ color: "var(--muted-foreground)", lineHeight: 1.6, overflow: "hidden", maxHeight: "2.8em" }}>
                  {addon.description}
                </p>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-base font-bold" style={{ color: addon.price === "Included" ? "#16a34a" : "var(--foreground)" }}>
                      {addon.priceLabel}
                    </span>
                    {addon.price !== "Free" && addon.price !== "Included" && addon.price !== "Free tier" && (
                      <span className="text-xs ml-1" style={{ color: "var(--muted-foreground)" }}>+ VAT</span>
                    )}
                  </div>
                  {addon.status === "Active" ? (
                    <Button variant="outline" size="sm" className="flex items-center gap-1.5 text-xs">
                      <Settings className="w-3 h-3" />
                      Manage
                    </Button>
                  ) : addon.status === "Coming Soon" ? (
                    <Button variant="outline" size="sm" disabled className="text-xs">
                      Coming Soon
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      onClick={() => handleActivate(addon.id)}
                      disabled={activating === addon.id}
                      className="text-xs flex items-center gap-1.5"
                      style={{ background: "var(--primary)", color: "#fff" }}
                    >
                      {activating === addon.id ? (
                        <><RefreshCw className="w-3 h-3 animate-spin" />Activating…</>
                      ) : (
                        <>Activate</>
                      )}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
        <div className="px-5 py-4" style={{ borderBottom: "1px solid var(--border)" }}>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4" style={{ color: "#16a34a" }} />
            <h2 className="text-base font-semibold" style={{ color: "var(--foreground)" }}>Active Add-Ons</h2>
            <span style={{ backgroundColor: "#dcfce7", color: "#16a34a", padding: "1px 8px", borderRadius: 9999, fontSize: 12, fontWeight: 600 }}>
              {activeAddons.length}
            </span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                {["Add-On","Category","Price","Activated","Next Billing"].map(h => (
                  <th key={h} style={{ padding: "10px 16px", textAlign: "left", color: "var(--muted-foreground)", fontWeight: 500, fontSize: 12 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {activeAddons.map(a => {
                const catStyle = getCategoryBadge(a.category)
                return (
                  <tr key={a.id} style={{ borderBottom: "1px solid var(--border)" }}>
                    <td style={{ padding: "11px 16px" }}>
                      <div className="flex items-center gap-2">
                        <a.icon className="w-4 h-4" style={{ color: "#16a34a" }} />
                        <span style={{ color: "var(--foreground)", fontWeight: 500 }}>{a.name}</span>
                      </div>
                    </td>
                    <td style={{ padding: "11px 16px" }}>
                      <span style={{ ...catStyle, fontSize: 11, fontWeight: 500, padding: "2px 8px", borderRadius: 9999 }}>{a.category}</span>
                    </td>
                    <td style={{ padding: "11px 16px", color: "var(--foreground)", fontWeight: 600 }}>{a.priceLabel}</td>
                    <td style={{ padding: "11px 16px", color: "var(--muted-foreground)" }}>{a.activatedDate}</td>
                    <td style={{ padding: "11px 16px", color: "var(--muted-foreground)" }}>
                      {a.price === "Included" || a.price === "Free" ? "—" : "1 Jul 2025"}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
