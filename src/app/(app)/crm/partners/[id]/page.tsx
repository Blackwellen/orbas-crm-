"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Edit, Mail, Phone, Globe, Award, Building2 } from "lucide-react"
import { formatCurrency, formatDate, getInitials } from "@/lib/utils"

const partnerData: Record<string, {
  company: string; tier: string; status: string; region: string; website: string;
  phone: string; address: string; partnerManager: string; joinedDate: string;
  revenueYTD: number; dealsClosed: number; certifications: string[];
  deals: { name: string; stage: string; value: number; closeDate: string; rep: string }[];
  contacts: { name: string; title: string; email: string; phone: string; primary: boolean }[];
}> = {
  pt1: {
    company: "TechBridge Solutions", tier: "Gold", status: "Active", region: "London",
    website: "www.techbridge.co.uk", phone: "+44 20 7946 0012", address: "22 Canary Wharf, London E14",
    partnerManager: "Sophie Turner", joinedDate: "2023-04-01", revenueYTD: 284000, dealsClosed: 12,
    certifications: ["Orbas Certified Implementation Partner", "CRM Advanced", "Analytics Pro", "Security Compliance"],
    deals: [
      { name: "Apex Capital CRM Rollout", stage: "Closed Won", value: 48500, closeDate: "2026-05-20", rep: "Sophie Turner" },
      { name: "Meridian Law Platform", stage: "Negotiation", value: 32000, closeDate: "2026-07-01", rep: "James Patel" },
      { name: "Finsbury Payroll Module", stage: "Proposal", value: 18000, closeDate: "2026-07-15", rep: "Sophie Turner" },
      { name: "City Bridge Analytics", stage: "Discovery", value: 12500, closeDate: "2026-08-01", rep: "Rachel Moore" },
      { name: "NorthStar Retail Integration", stage: "Closed Won", value: 27000, closeDate: "2026-04-10", rep: "James Patel" },
      { name: "BrightPath HR Suite", stage: "Closed Won", value: 41000, closeDate: "2026-03-22", rep: "Sophie Turner" },
      { name: "Lakeside Hotels Operations", stage: "Proposal", value: 19500, closeDate: "2026-07-28", rep: "Rachel Moore" },
      { name: "Quantum Architects DMS", stage: "Discovery", value: 9000, closeDate: "2026-08-15", rep: "Sophie Turner" },
      { name: "Greenfield Brands E-comm", stage: "Negotiation", value: 24000, closeDate: "2026-07-05", rep: "James Patel" },
      { name: "Summit Pharma Compliance", stage: "Closed Won", value: 38000, closeDate: "2026-02-14", rep: "Sophie Turner" },
    ],
    contacts: [
      { name: "Mark Ellis", title: "CEO & Founder", email: "mark@techbridge.co.uk", phone: "+44 7700 900011", primary: true },
      { name: "Diane Foster", title: "Technical Director", email: "diane@techbridge.co.uk", phone: "+44 7700 900012", primary: false },
      { name: "Kevin Shaw", title: "Sales Director", email: "kevin@techbridge.co.uk", phone: "+44 7700 900013", primary: false },
      { name: "Hannah Mills", title: "Project Manager", email: "hannah@techbridge.co.uk", phone: "+44 7700 900014", primary: false },
    ],
  },
}

const fallback = partnerData.pt1

const tierBadge = (tier: string) => {
  const map: Record<string, { bg: string; color: string }> = {
    Gold:    { bg: "#fef9c3", color: "#ca8a04" },
    Silver:  { bg: "#f1f5f9", color: "#64748b" },
    Bronze:  { bg: "#fff7ed", color: "#c2410c" },
    Prospect:{ bg: "#dbeafe", color: "#1d4ed8" },
  }
  return map[tier] ?? { bg: "#f1f5f9", color: "#64748b" }
}

const stageBadge = (s: string) => {
  if (s === "Closed Won") return { bg: "#dcfce7", color: "#16a34a" }
  if (s === "Negotiation") return { bg: "#fef3c7", color: "#d97706" }
  if (s === "Proposal") return { bg: "#dbeafe", color: "#1d4ed8" }
  return { bg: "#f1f5f9", color: "#64748b" }
}

export default function PartnerDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [tab, setTab] = useState("overview")
  const partner = partnerData[id] ?? fallback
  const tb = tierBadge(partner.tier)

  return (
    <div className="p-6" style={{ color: "var(--foreground)" }}>
      <div className="flex items-center gap-3 mb-6">
        <Link href="/app/crm/partners">
          <Button variant="ghost" size="sm" className="gap-1">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold">{partner.company}</h1>
            <span style={{ backgroundColor: tb.bg, color: tb.color, padding: "2px 8px", borderRadius: "9999px", fontSize: "12px", fontWeight: 500 }}>{partner.tier}</span>
            <span style={{ backgroundColor: "#dcfce7", color: "#16a34a", padding: "2px 8px", borderRadius: "9999px", fontSize: "12px", fontWeight: 500 }}>{partner.status}</span>
          </div>
          <p className="text-sm mt-1" style={{ color: "var(--muted-foreground)" }}>{partner.region} · Partner since {formatDate(partner.joinedDate)} · Manager: {partner.partnerManager}</p>
        </div>
        <Button variant="outline" size="sm" className="gap-1" style={{ border: "1px solid var(--border)" }}>
          <Edit className="w-4 h-4" /> Edit
        </Button>
      </div>

      <div className="flex gap-1 mb-6 border-b" style={{ borderColor: "var(--border)" }}>
        {[
          { key: "overview", label: "Overview" },
          { key: "deals", label: `Deals (${partner.deals.length})` },
          { key: "contacts", label: `Contacts (${partner.contacts.length})` },
        ].map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className="px-4 py-2 text-sm font-medium transition-colors"
            style={{
              borderBottom: tab === t.key ? "2px solid var(--primary)" : "2px solid transparent",
              color: tab === t.key ? "var(--primary)" : "var(--muted-foreground)",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "overview" && (
        <div className="grid grid-cols-2 gap-5">
          <Card style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <CardHeader><CardTitle className="text-base">Company Information</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {[
                { label: "Region", value: partner.region, icon: Globe },
                { label: "Website", value: partner.website, icon: Globe },
                { label: "Phone", value: partner.phone, icon: Phone },
                { label: "Address", value: partner.address, icon: Building2 },
                { label: "Partner Manager", value: partner.partnerManager, icon: Award },
              ].map(f => (
                <div key={f.label} className="flex items-start gap-3 text-sm">
                  <f.icon className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "var(--muted-foreground)" }} />
                  <div>
                    <span style={{ color: "var(--muted-foreground)" }}>{f.label}: </span>
                    <span className="font-medium">{f.value}</span>
                  </div>
                </div>
              ))}
              <div className="pt-2 grid grid-cols-2 gap-3" style={{ borderTop: "1px solid var(--border)" }}>
                <div>
                  <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>Revenue YTD</p>
                  <p className="font-bold">{formatCurrency(partner.revenueYTD)}</p>
                </div>
                <div>
                  <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>Deals Closed</p>
                  <p className="font-bold">{partner.dealsClosed}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <CardHeader><CardTitle className="text-base">Certifications Earned</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-2">
                {partner.certifications.map(cert => (
                  <div key={cert} className="flex items-center gap-2 p-2 rounded-lg" style={{ background: "var(--secondary)" }}>
                    <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: "#fef9c3" }}>
                      <Award className="w-3.5 h-3.5" style={{ color: "#ca8a04" }} />
                    </div>
                    <span className="text-sm font-medium">{cert}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {tab === "deals" && (
        <Card style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          <CardHeader><CardTitle className="text-base">Co-Sold Deals</CardTitle></CardHeader>
          <CardContent className="p-0">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border)", background: "var(--secondary)" }}>
                  {["Deal Name", "Stage", "Value", "Close Date", "Our Rep"].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold" style={{ color: "var(--muted-foreground)" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {partner.deals.map((d, i) => {
                  const sb = stageBadge(d.stage)
                  return (
                    <tr key={i} style={{ borderBottom: "1px solid var(--border)" }}>
                      <td className="px-4 py-3 font-medium">{d.name}</td>
                      <td className="px-4 py-3">
                        <span style={{ backgroundColor: sb.bg, color: sb.color, padding: "2px 8px", borderRadius: "9999px", fontSize: "12px", fontWeight: 500 }}>{d.stage}</span>
                      </td>
                      <td className="px-4 py-3 font-semibold">{formatCurrency(d.value)}</td>
                      <td className="px-4 py-3" style={{ color: "var(--muted-foreground)" }}>{formatDate(d.closeDate)}</td>
                      <td className="px-4 py-3" style={{ color: "var(--muted-foreground)" }}>{d.rep}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}

      {tab === "contacts" && (
        <div className="grid grid-cols-2 gap-4">
          {partner.contacts.map((c, i) => (
            <Card key={i} style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
                    style={{ backgroundColor: "var(--primary)", color: "#fff" }}
                  >
                    {getInitials(c.name)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold">{c.name}</p>
                      {c.primary && (
                        <span style={{ backgroundColor: "#dbeafe", color: "#1d4ed8", padding: "1px 6px", borderRadius: "9999px", fontSize: "11px", fontWeight: 500 }}>Primary</span>
                      )}
                    </div>
                    <p className="text-sm mt-0.5" style={{ color: "var(--muted-foreground)" }}>{c.title}</p>
                    <div className="mt-2 space-y-1">
                      <div className="flex items-center gap-2 text-xs">
                        <Mail className="w-3.5 h-3.5" style={{ color: "var(--muted-foreground)" }} />
                        <span style={{ color: "var(--muted-foreground)" }}>{c.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <Phone className="w-3.5 h-3.5" style={{ color: "var(--muted-foreground)" }} />
                        <span style={{ color: "var(--muted-foreground)" }}>{c.phone}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
