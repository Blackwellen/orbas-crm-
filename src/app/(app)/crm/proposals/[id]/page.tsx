"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Edit, Copy, Download, Send, Trash2, Eye, Clock, Monitor, Smartphone, Tablet } from "lucide-react"
import { formatCurrency, formatDate } from "@/lib/utils"

const proposalData: Record<string, {
  number: string; title: string; client: string; clientEmail: string; value: number;
  sentDate: string; expires: string; status: string; intro: string; paymentTerms: string;
  lineItems: { description: string; qty: number; unitPrice: number; discount: number }[];
  terms: string;
  analytics: { opens: number; lastViewed: string; timeSpent: string };
  activity: { date: string; event: string; meta: string }[];
}> = {
  p1: {
    number: "PRO-001", title: "Enterprise CRM Implementation", client: "Apex Capital Group",
    clientEmail: "procurement@apexcapital.co.uk", value: 48500, sentDate: "2026-06-01",
    expires: "2026-07-01", status: "Accepted", intro: "Dear Apex Capital Group, thank you for the opportunity to present our enterprise CRM solution. We are confident this proposal addresses your key requirements.",
    paymentTerms: "Net 30",
    lineItems: [
      { description: "CRM Platform Licence (Annual)", qty: 1, unitPrice: 24000, discount: 0 },
      { description: "Implementation & Configuration", qty: 1, unitPrice: 12000, discount: 10 },
      { description: "Data Migration Services", qty: 1, unitPrice: 4500, discount: 0 },
      { description: "Training (per user, 25 users)", qty: 25, unitPrice: 200, discount: 5 },
      { description: "Dedicated CSM (12 months)", qty: 1, unitPrice: 6000, discount: 0 },
    ],
    terms: "This proposal is valid for 30 days from the date of issue. All prices are exclusive of VAT. Payment is due within 30 days of invoice date. Cancellation within 14 days of contract signing will incur a 10% administration fee.",
    analytics: { opens: 3, lastViewed: "2026-06-08 14:32", timeSpent: "2m 34s" },
    activity: [
      { date: "2026-06-01 09:15", event: "Proposal Created", meta: "By Sophie Turner" },
      { date: "2026-06-01 11:30", event: "Sent to Client", meta: "procurement@apexcapital.co.uk" },
      { date: "2026-06-02 08:45", event: "Viewed", meta: "London, UK · Chrome on Windows" },
      { date: "2026-06-04 14:12", event: "Viewed", meta: "London, UK · Safari on iPhone" },
      { date: "2026-06-08 14:32", event: "Viewed", meta: "London, UK · Chrome on Windows" },
      { date: "2026-06-10 10:05", event: "Accepted", meta: "E-signature received from J. Morrison" },
    ],
  },
}

const fallback = proposalData.p1

const statusBadge = (s: string) => {
  const map: Record<string, { bg: string; color: string }> = {
    Draft:    { bg: "#f1f5f9", color: "#64748b" },
    Sent:     { bg: "#dbeafe", color: "#1d4ed8" },
    Viewed:   { bg: "#fef3c7", color: "#d97706" },
    Accepted: { bg: "#dcfce7", color: "#16a34a" },
    Declined: { bg: "#fee2e2", color: "#dc2626" },
    Expired:  { bg: "#f1f5f9", color: "#64748b" },
  }
  return map[s] ?? { bg: "#f1f5f9", color: "#64748b" }
}

export default function ProposalDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [tab, setTab] = useState("content")
  const proposal = proposalData[id] ?? fallback
  const badge = statusBadge(proposal.status)

  const lineTotal = (l: { qty: number; unitPrice: number; discount: number }) => l.qty * l.unitPrice * (1 - l.discount / 100)
  const subtotal = proposal.lineItems.reduce((a, l) => a + lineTotal(l), 0)
  const discountTotal = proposal.lineItems.reduce((a, l) => a + l.qty * l.unitPrice * (l.discount / 100), 0)
  const tax = subtotal * 0.2
  const total = subtotal + tax

  return (
    <div className="p-6" style={{ color: "var(--foreground)" }}>
      <div className="flex items-center gap-3 mb-6">
        <Link href="/app/crm/proposals">
          <Button variant="ghost" size="sm" className="gap-1">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <span className="font-mono text-sm font-semibold" style={{ color: "var(--muted-foreground)" }}>{proposal.number}</span>
            <h1 className="text-xl font-bold">{proposal.title}</h1>
            <span style={{ backgroundColor: badge.bg, color: badge.color, padding: "2px 8px", borderRadius: "9999px", fontSize: "12px", fontWeight: 500 }}>{proposal.status}</span>
          </div>
          <p className="text-sm mt-1" style={{ color: "var(--muted-foreground)" }}>{proposal.client} · {formatCurrency(proposal.value)} · Sent {formatDate(proposal.sentDate)}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1" style={{ border: "1px solid var(--border)" }}><Edit className="w-4 h-4" /> Edit</Button>
          <Button variant="outline" size="sm" className="gap-1" style={{ border: "1px solid var(--border)" }}><Copy className="w-4 h-4" /> Duplicate</Button>
          <Button variant="outline" size="sm" className="gap-1" style={{ border: "1px solid var(--border)" }}><Download className="w-4 h-4" /> PDF</Button>
          <Button variant="outline" size="sm" className="gap-1" style={{ border: "1px solid var(--border)" }}><Send className="w-4 h-4" /> Resend</Button>
          <Button variant="ghost" size="sm" className="gap-1"><Trash2 className="w-4 h-4" style={{ color: "var(--destructive)" }} /></Button>
        </div>
      </div>

      <div className="flex gap-1 mb-6 border-b" style={{ borderColor: "var(--border)" }}>
        {["content", "analytics", "activity"].map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className="px-4 py-2 text-sm font-medium capitalize transition-colors"
            style={{
              borderBottom: tab === t ? "2px solid var(--primary)" : "2px solid transparent",
              color: tab === t ? "var(--primary)" : "var(--muted-foreground)",
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "content" && (
        <div className="space-y-5">
          <Card style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-5">
                <div>
                  <p className="text-xs uppercase font-semibold mb-1" style={{ color: "var(--muted-foreground)" }}>Prepared for</p>
                  <p className="font-semibold">{proposal.client}</p>
                  <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>{proposal.clientEmail}</p>
                </div>
                <div className="text-right text-sm" style={{ color: "var(--muted-foreground)" }}>
                  <p>Sent: {formatDate(proposal.sentDate)}</p>
                  <p>Valid until: {formatDate(proposal.expires)}</p>
                  <p>Payment: {proposal.paymentTerms}</p>
                </div>
              </div>
              <p className="text-sm mb-5" style={{ color: "var(--muted-foreground)" }}>{proposal.intro}</p>
              <table className="w-full text-sm mb-4">
                <thead>
                  <tr style={{ borderBottom: "2px solid var(--border)" }}>
                    {["Description", "Qty", "Unit Price", "Discount", "Total"].map(h => (
                      <th key={h} className="text-left pb-2 text-xs font-semibold" style={{ color: "var(--muted-foreground)" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {proposal.lineItems.map((l, i) => (
                    <tr key={i} style={{ borderBottom: "1px solid var(--border)" }}>
                      <td className="py-2">{l.description}</td>
                      <td className="py-2">{l.qty}</td>
                      <td className="py-2">{formatCurrency(l.unitPrice)}</td>
                      <td className="py-2">{l.discount > 0 ? `${l.discount}%` : "—"}</td>
                      <td className="py-2 font-semibold">{formatCurrency(lineTotal(l))}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="ml-auto max-w-xs text-sm space-y-1">
                <div className="flex justify-between">
                  <span style={{ color: "var(--muted-foreground)" }}>Subtotal</span>
                  <span>{formatCurrency(subtotal + discountTotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: "var(--muted-foreground)" }}>Discount</span>
                  <span style={{ color: "#dc2626" }}>-{formatCurrency(discountTotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: "var(--muted-foreground)" }}>VAT 20%</span>
                  <span>{formatCurrency(tax)}</span>
                </div>
                <div className="flex justify-between font-bold text-base pt-1" style={{ borderTop: "2px solid var(--border)" }}>
                  <span>Total</span>
                  <span>{formatCurrency(total)}</span>
                </div>
              </div>
              {proposal.terms && (
                <div className="mt-5 pt-4" style={{ borderTop: "1px solid var(--border)" }}>
                  <p className="text-xs font-semibold mb-1" style={{ color: "var(--muted-foreground)" }}>Terms & Conditions</p>
                  <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>{proposal.terms}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {tab === "analytics" && (
        <div className="grid grid-cols-2 gap-5">
          <Card style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <CardHeader><CardTitle className="text-base">Engagement Summary</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: "Total Opens", value: String(proposal.analytics.opens), icon: Eye },
                { label: "Last Viewed", value: proposal.analytics.lastViewed, icon: Clock },
                { label: "Time Spent Reading", value: proposal.analytics.timeSpent, icon: Clock },
              ].map(s => (
                <div key={s.label} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: "var(--secondary)" }}>
                    <s.icon className="w-4 h-4" style={{ color: "var(--muted-foreground)" }} />
                  </div>
                  <div>
                    <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>{s.label}</p>
                    <p className="font-semibold text-sm">{s.value}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <CardHeader><CardTitle className="text-base">Device Breakdown</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {[
                { device: "Desktop", pct: 67, icon: Monitor },
                { device: "Mobile", pct: 22, icon: Smartphone },
                { device: "Tablet", pct: 11, icon: Tablet },
              ].map(d => (
                <div key={d.device}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <div className="flex items-center gap-2">
                      <d.icon className="w-4 h-4" style={{ color: "var(--muted-foreground)" }} />
                      <span>{d.device}</span>
                    </div>
                    <span style={{ color: "var(--muted-foreground)" }}>{d.pct}%</span>
                  </div>
                  <div className="h-2 rounded-full" style={{ background: "var(--secondary)" }}>
                    <div className="h-2 rounded-full" style={{ width: `${d.pct}%`, backgroundColor: "var(--primary)" }} />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}

      {tab === "activity" && (
        <Card style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          <CardHeader><CardTitle className="text-base">Activity Timeline</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-0">
              {proposal.activity.map((a, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full mt-1.5" style={{ backgroundColor: "var(--primary)", flexShrink: 0 }} />
                    {i < proposal.activity.length - 1 && <div className="w-px flex-1 mt-1" style={{ backgroundColor: "var(--border)" }} />}
                  </div>
                  <div className="pb-5">
                    <p className="font-medium text-sm">{a.event}</p>
                    <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>{a.meta}</p>
                    <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>{a.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
