"use client"
import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Target, Edit2, X, Plus } from "lucide-react"
import { formatCurrency, formatDate } from "@/lib/utils"

const pledgeData: Record<string, any> = {
  pl1: {
    id: "pl1", donor: "The Hartley Foundation", campaign: "2026 Capital Appeal", pledged: 250000, collected: 200000,
    frequency: "Quarterly", startDate: "2025-01-01", status: "Active",
    nextPayment: "2026-07-01", notes: "Major institutional donor. Quarterly payments aligned to financial year. Relationship managed by CEO.",
    contactName: "Lord James Hartley", contactEmail: "foundation@hartleytrust.org",
    payments: [
      { date: "2026-04-01", amount: 62500, method: "Bank Transfer", status: "Received", reference: "HF-2026-Q2" },
      { date: "2026-01-01", amount: 62500, method: "Bank Transfer", status: "Received", reference: "HF-2026-Q1" },
      { date: "2025-10-01", amount: 62500, method: "Bank Transfer", status: "Received", reference: "HF-2025-Q4" },
      { date: "2025-07-01", amount: 62500, method: "Bank Transfer", status: "Received", reference: "HF-2025-Q3" },
    ],
  },
}

const fallback: any = {
  id: "plx", donor: "Donor Name", campaign: "Campaign", pledged: 10000, collected: 5000,
  frequency: "Monthly", startDate: "2025-01-01", status: "Active",
  nextPayment: "2026-07-01", notes: "Pledge notes here.",
  contactName: "Contact Person", contactEmail: "contact@example.com",
  payments: [
    { date: "2026-05-01", amount: 1000, method: "Direct Debit", status: "Received", reference: "REF-001" },
    { date: "2026-04-01", amount: 1000, method: "Direct Debit", status: "Received", reference: "REF-002" },
  ],
}

function statusBadge(status: string) {
  const map: Record<string, { bg: string; color: string }> = {
    Active: { bg: "#dcfce7", color: "#16a34a" },
    Collected: { bg: "#dbeafe", color: "#1d4ed8" },
    Partial: { bg: "#fef3c7", color: "#d97706" },
    Overdue: { bg: "#fee2e2", color: "#dc2626" },
    Cancelled: { bg: "#f1f5f9", color: "#475569" },
    Received: { bg: "#dcfce7", color: "#16a34a" },
    Pending: { bg: "#fef3c7", color: "#d97706" },
    Failed: { bg: "#fee2e2", color: "#dc2626" },
  }
  const s = map[status] ?? { bg: "#f1f5f9", color: "#475569" }
  return (
    <span style={{ backgroundColor: s.bg, color: s.color, padding: "2px 8px", borderRadius: "9999px", fontSize: "12px", fontWeight: 500 }}>
      {status}
    </span>
  )
}

export default function PledgeDetailPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const [tab, setTab] = useState("overview")
  const p = pledgeData[id] ?? { ...fallback, id }

  const outstanding = p.pledged - p.collected
  const progress = Math.round((p.collected / p.pledged) * 100)

  return (
    <div className="p-6" style={{ background: "var(--background)", minHeight: "100vh" }}>
      <button className="flex items-center gap-2 mb-5 text-sm" style={{ color: "var(--muted-foreground)" }} onClick={() => router.push("/app/charity/pledges")}>
        <ArrowLeft size={16} /> Back to Pledges
      </button>

      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <div style={{ background: "var(--primary)", borderRadius: "12px", padding: "12px" }}>
            <Target size={24} style={{ color: "#fff" }} />
          </div>
          <div>
            <h1 className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>{p.donor}</h1>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-sm" style={{ color: "var(--muted-foreground)" }}>{p.campaign}</span>
              {statusBadge(p.status)}
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button style={{ background: "var(--primary)", color: "#fff" }}>
            <Plus size={15} className="mr-1" /> Record Payment
          </Button>
          <Button variant="outline" style={{ borderColor: "var(--border)", color: "var(--foreground)" }}>
            <Edit2 size={15} className="mr-1" /> Edit
          </Button>
          <Button variant="outline" style={{ borderColor: "#dc2626", color: "#dc2626" }}>
            <X size={15} className="mr-1" /> Cancel Pledge
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="rounded-xl border p-4" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
          <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>Total Pledged</p>
          <p className="text-xl font-bold mt-1" style={{ color: "var(--foreground)" }}>{formatCurrency(p.pledged)}</p>
        </div>
        <div className="rounded-xl border p-4" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
          <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>Collected</p>
          <p className="text-xl font-bold mt-1" style={{ color: "#16a34a" }}>{formatCurrency(p.collected)}</p>
        </div>
        <div className="rounded-xl border p-4" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
          <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>Outstanding</p>
          <p className="text-xl font-bold mt-1" style={{ color: "#d97706" }}>{formatCurrency(outstanding)}</p>
        </div>
        <div className="rounded-xl border p-4" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
          <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>Next Payment</p>
          <p className="text-xl font-bold mt-1" style={{ color: "var(--foreground)" }}>{formatDate(p.nextPayment)}</p>
        </div>
      </div>

      <div className="flex gap-1 mb-6 border-b" style={{ borderColor: "var(--border)" }}>
        {[{ key: "overview", label: "Overview" }, { key: "payments", label: "Payment History" }].map(t => (
          <button key={t.key} onClick={() => setTab(t.key)}
            className="px-4 py-2.5 text-sm font-medium border-b-2 transition-colors"
            style={{ borderColor: tab === t.key ? "var(--primary)" : "transparent", color: tab === t.key ? "var(--primary)" : "var(--muted-foreground)" }}>
            {t.label}
          </button>
        ))}
      </div>

      {tab === "overview" && (
        <div className="grid grid-cols-3 gap-5">
          <div className="col-span-2 space-y-5">
            <div className="rounded-xl border p-5" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <h3 className="font-semibold mb-4" style={{ color: "var(--foreground)" }}>Pledge Details</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><p style={{ color: "var(--muted-foreground)" }}>Pledge Amount</p><p className="font-semibold mt-0.5" style={{ color: "var(--foreground)" }}>{formatCurrency(p.pledged)}</p></div>
                <div><p style={{ color: "var(--muted-foreground)" }}>Frequency</p><p className="font-medium mt-0.5" style={{ color: "var(--foreground)" }}>{p.frequency}</p></div>
                <div><p style={{ color: "var(--muted-foreground)" }}>Start Date</p><p className="font-medium mt-0.5" style={{ color: "var(--foreground)" }}>{formatDate(p.startDate)}</p></div>
                <div><p style={{ color: "var(--muted-foreground)" }}>Next Payment</p><p className="font-medium mt-0.5" style={{ color: "var(--foreground)" }}>{formatDate(p.nextPayment)}</p></div>
                <div><p style={{ color: "var(--muted-foreground)" }}>Campaign</p><p className="font-medium mt-0.5" style={{ color: "var(--foreground)" }}>{p.campaign}</p></div>
                <div><p style={{ color: "var(--muted-foreground)" }}>Status</p><div className="mt-0.5">{statusBadge(p.status)}</div></div>
              </div>
            </div>

            <div className="rounded-xl border p-5" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <h3 className="font-semibold mb-3" style={{ color: "var(--foreground)" }}>Collection Progress</h3>
              <div className="flex justify-between text-sm mb-2">
                <span style={{ color: "var(--muted-foreground)" }}>{progress}% collected</span>
                <span style={{ color: "var(--muted-foreground)" }}>{formatCurrency(p.collected)} of {formatCurrency(p.pledged)}</span>
              </div>
              <div className="w-full h-3 rounded-full" style={{ background: "var(--secondary)" }}>
                <div className="h-3 rounded-full transition-all" style={{ width: `${progress}%`, background: progress === 100 ? "#16a34a" : "var(--primary)" }} />
              </div>
            </div>

            <div className="rounded-xl border p-5" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <h3 className="font-semibold mb-3" style={{ color: "var(--foreground)" }}>Notes</h3>
              <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>{p.notes}</p>
            </div>
          </div>

          <div>
            <div className="rounded-xl border p-5" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <h3 className="font-semibold mb-4" style={{ color: "var(--foreground)" }}>Contact</h3>
              <div className="space-y-3 text-sm">
                <div><p style={{ color: "var(--muted-foreground)" }}>Name</p><p className="font-medium mt-0.5" style={{ color: "var(--foreground)" }}>{p.contactName}</p></div>
                <div><p style={{ color: "var(--muted-foreground)" }}>Email</p><p className="font-medium mt-0.5" style={{ color: "var(--foreground)" }}>{p.contactEmail}</p></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {tab === "payments" && (
        <div className="rounded-xl border overflow-hidden" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
          <div className="p-4 border-b" style={{ borderColor: "var(--border)" }}>
            <h3 className="font-semibold" style={{ color: "var(--foreground)" }}>Payment History</h3>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                {["Date", "Amount", "Method", "Status", "Reference"].map(h => (
                  <th key={h} className="text-left px-4 py-3 font-medium" style={{ color: "var(--muted-foreground)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {p.payments.map((pay: any, i: number) => (
                <tr key={i} style={{ borderBottom: i < p.payments.length - 1 ? "1px solid var(--border)" : "none" }}>
                  <td className="px-4 py-3" style={{ color: "var(--foreground)" }}>{formatDate(pay.date)}</td>
                  <td className="px-4 py-3 font-semibold" style={{ color: "var(--foreground)" }}>{formatCurrency(pay.amount)}</td>
                  <td className="px-4 py-3" style={{ color: "var(--muted-foreground)" }}>{pay.method}</td>
                  <td className="px-4 py-3">{statusBadge(pay.status)}</td>
                  <td className="px-4 py-3" style={{ color: "var(--muted-foreground)" }}>{pay.reference}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
