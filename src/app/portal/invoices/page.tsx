"use client"

import { useState } from "react"
import { Download, CreditCard, AlertCircle } from "lucide-react"

const allInvoices = [
  { number: "INV-2024-089", date: "28 May 2026", due: "12 Jun 2026", amount: 2400,  status: "Overdue" },
  { number: "INV-2024-088", date: "15 May 2026", due: "29 May 2026", amount: 1800,  status: "Outstanding" },
  { number: "INV-2024-087", date: "1 May 2026",  due: "15 May 2026", amount: 650,   status: "Outstanding" },
  { number: "INV-2024-086", date: "12 Apr 2026", due: "26 Apr 2026", amount: 3200,  status: "Paid" },
  { number: "INV-2024-085", date: "1 Apr 2026",  due: "15 Apr 2026", amount: 950,   status: "Paid" },
  { number: "INV-2024-084", date: "15 Mar 2026", due: "29 Mar 2026", amount: 1400,  status: "Paid" },
  { number: "INV-2024-083", date: "1 Mar 2026",  due: "15 Mar 2026", amount: 2800,  status: "Paid" },
]

type Filter = "All" | "Outstanding" | "Paid"
const filters: Filter[] = ["All", "Outstanding", "Paid"]

const statusConfig: Record<string, { color: string; bg: string }> = {
  Overdue:     { color: "#ef4444", bg: "#fef2f2" },
  Outstanding: { color: "#d97706", bg: "#fffbeb" },
  Paid:        { color: "#16a34a", bg: "#f0fdf4" },
}

function fmt(n: number) { return `£${n.toLocaleString("en-GB", { minimumFractionDigits: 2 })}` }

export default function PortalInvoicesPage() {
  const [filter, setFilter] = useState<Filter>("All")

  const filtered = allInvoices.filter(inv => {
    if (filter === "All") return true
    if (filter === "Outstanding") return inv.status === "Outstanding" || inv.status === "Overdue"
    return inv.status === "Paid"
  })

  const outstanding = allInvoices
    .filter(i => i.status === "Outstanding" || i.status === "Overdue")
    .reduce((sum, i) => sum + i.amount, 0)

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: "var(--foreground)", margin: "0 0 4px 0" }}>Invoices</h1>
        <p style={{ fontSize: 14, color: "var(--muted-foreground)", margin: 0 }}>View and pay your invoices from Orbas</p>
      </div>

      {/* Outstanding banner */}
      {outstanding > 0 && (
        <div style={{
          background: "#fef2f2",
          border: "1px solid #fecaca",
          borderRadius: 10,
          padding: "16px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 12,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <AlertCircle size={18} color="#ef4444" />
            <div>
              <p style={{ fontWeight: 700, fontSize: 15, color: "#b91c1c", margin: 0 }}>
                Outstanding Balance: {fmt(outstanding)}
              </p>
              <p style={{ fontSize: 12, color: "#dc2626", margin: 0 }}>
                {allInvoices.filter(i => i.status === "Overdue").length} invoice(s) overdue
              </p>
            </div>
          </div>
          <button style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "9px 18px",
            borderRadius: 8,
            border: "none",
            background: "#ef4444",
            color: "white",
            fontWeight: 700,
            fontSize: 13,
            cursor: "pointer",
          }}>
            <CreditCard size={14} />
            Pay Outstanding Now
          </button>
        </div>
      )}

      {/* Filter tabs */}
      <div style={{ display: "flex", gap: 4 }}>
        {filters.map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: "7px 16px",
              borderRadius: 8,
              border: "1px solid",
              borderColor: filter === f ? "var(--primary)" : "var(--border)",
              background: filter === f ? "var(--primary)" : "white",
              color: filter === f ? "white" : "var(--foreground)",
              fontWeight: 600,
              fontSize: 13,
              cursor: "pointer",
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Table */}
      <div style={{ background: "white", border: "1px solid var(--border)", borderRadius: 10, overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ background: "var(--muted)" }}>
                {["Invoice #", "Date", "Due Date", "Amount", "Status", "Actions"].map(h => (
                  <th key={h} style={{ padding: "10px 20px", textAlign: "left", fontWeight: 600, fontSize: 11, color: "var(--muted-foreground)", textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(inv => {
                const cfg = statusConfig[inv.status]
                const unpaid = inv.status !== "Paid"
                return (
                  <tr key={inv.number} style={{ borderTop: "1px solid var(--border)" }}>
                    <td style={{ padding: "12px 20px", fontWeight: 700, color: "var(--primary)" }}>{inv.number}</td>
                    <td style={{ padding: "12px 20px", color: "var(--muted-foreground)" }}>{inv.date}</td>
                    <td style={{ padding: "12px 20px", color: inv.status === "Overdue" ? "#ef4444" : "var(--muted-foreground)", fontWeight: inv.status === "Overdue" ? 600 : 400 }}>{inv.due}</td>
                    <td style={{ padding: "12px 20px", fontWeight: 700, color: "var(--foreground)" }}>{fmt(inv.amount)}</td>
                    <td style={{ padding: "12px 20px" }}>
                      <span style={{
                        display: "inline-flex",
                        alignItems: "center",
                        padding: "2px 9px",
                        borderRadius: 20,
                        fontSize: 12,
                        fontWeight: 600,
                        color: cfg.color,
                        background: cfg.bg,
                      }}>
                        {inv.status}
                      </span>
                    </td>
                    <td style={{ padding: "12px 20px" }}>
                      <div style={{ display: "flex", gap: 8 }}>
                        {unpaid && (
                          <button style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 5,
                            padding: "5px 12px",
                            borderRadius: 6,
                            border: "none",
                            background: "var(--primary)",
                            color: "white",
                            fontWeight: 600,
                            fontSize: 12,
                            cursor: "pointer",
                          }}>
                            <CreditCard size={12} />
                            Pay Now
                          </button>
                        )}
                        <button style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 5,
                          padding: "5px 12px",
                          borderRadius: 6,
                          border: "1px solid var(--border)",
                          background: "white",
                          color: "var(--foreground)",
                          fontWeight: 600,
                          fontSize: 12,
                          cursor: "pointer",
                        }}>
                          <Download size={12} />
                          PDF
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div style={{ padding: 40, textAlign: "center", color: "var(--muted-foreground)", fontSize: 14 }}>
            No invoices found for this filter.
          </div>
        )}
      </div>
    </div>
  )
}
