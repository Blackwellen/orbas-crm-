"use client"

import { CreditCard, Download, Users, HardDrive, Zap } from "lucide-react"

const invoices = [
  { date: "01 Jun 2026", amount: "£149.00", status: "Paid" },
  { date: "01 May 2026", amount: "£149.00", status: "Paid" },
  { date: "01 Apr 2026", amount: "£149.00", status: "Paid" },
  { date: "01 Mar 2026", amount: "£149.00", status: "Paid" },
  { date: "01 Feb 2026", amount: "£149.00", status: "Paid" },
  { date: "01 Jan 2026", amount: "£149.00", status: "Paid" },
]

export default function BillingPage() {
  return (
    <div style={{ padding: 32, minHeight: "100vh", background: "var(--background)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 32 }}>
        <CreditCard size={24} style={{ color: "#475569" }} />
        <h1 style={{ fontSize: 22, fontWeight: 700, color: "var(--foreground)", margin: 0 }}>Billing & Plan</h1>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 760 }}>
        {/* Current Plan */}
        <div style={{ border: "2px solid var(--primary)", borderRadius: 14, padding: 28, background: "#eff6ff" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                <span style={{ fontSize: 22, fontWeight: 800, color: "var(--primary)" }}>Growth Plan</span>
                <span style={{ background: "var(--primary)", color: "white", fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 10 }}>CURRENT</span>
              </div>
              <p style={{ fontSize: 30, fontWeight: 700, color: "var(--foreground)", margin: 0 }}>£149<span style={{ fontSize: 14, fontWeight: 400, color: "var(--muted-foreground)" }}>/month · billed annually</span></p>
              <p style={{ fontSize: 13, color: "var(--muted-foreground)", margin: "4px 0 0" }}>Renews 1 January 2027 · 25 seats included</p>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button style={{ padding: "9px 18px", border: "1px solid var(--primary)", borderRadius: 8, background: "white", color: "var(--primary)", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Upgrade Plan</button>
              <button style={{ padding: "9px 18px", border: "1px solid #fee2e2", borderRadius: 8, background: "white", color: "#dc2626", fontSize: 13, fontWeight: 500, cursor: "pointer" }}>Cancel</button>
            </div>
          </div>
        </div>

        {/* Usage */}
        <div style={{ border: "1px solid var(--border)", borderRadius: 12, padding: 28, background: "white" }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--foreground)", marginBottom: 20 }}>Usage</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {[
              { icon: Users, label: "Seats", used: 18, total: 25, unit: "users" },
              { icon: HardDrive, label: "Storage", used: 12, total: 50, unit: "GB" },
            ].map(u => {
              const pct = Math.round((u.used / u.total) * 100)
              return (
                <div key={u.label}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <u.icon size={16} style={{ color: "var(--muted-foreground)" }} />
                      <span style={{ fontSize: 14, fontWeight: 500, color: "var(--foreground)" }}>{u.label}</span>
                    </div>
                    <span style={{ fontSize: 13, color: "var(--muted-foreground)" }}>{u.used} / {u.total} {u.unit} ({pct}%)</span>
                  </div>
                  <div style={{ height: 8, background: "var(--muted)", borderRadius: 4, overflow: "hidden" }}>
                    <div style={{ width: `${pct}%`, height: "100%", background: pct >= 90 ? "#dc2626" : pct >= 70 ? "#f59e0b" : "var(--primary)", borderRadius: 4 }} />
                  </div>
                </div>
              )
            })}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0", borderTop: "1px solid var(--border)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Zap size={16} style={{ color: "var(--muted-foreground)" }} />
                <span style={{ fontSize: 14, fontWeight: 500, color: "var(--foreground)" }}>API Calls</span>
              </div>
              <span style={{ fontSize: 13, color: "var(--muted-foreground)" }}>8,420 this month</span>
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div style={{ border: "1px solid var(--border)", borderRadius: 12, padding: 28, background: "white" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--foreground)", margin: 0 }}>Payment Method</h3>
            <button style={{ padding: "7px 14px", border: "1px solid var(--border)", borderRadius: 6, background: "white", fontSize: 13, cursor: "pointer", fontWeight: 500 }}>Update</button>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", border: "1px solid var(--border)", borderRadius: 10 }}>
            <div style={{ width: 48, height: 30, borderRadius: 6, background: "#1a56db", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: 10, fontWeight: 700, color: "white" }}>VISA</span>
            </div>
            <div>
              <p style={{ fontSize: 14, fontWeight: 600, color: "var(--foreground)", margin: 0 }}>Visa ending 4242</p>
              <p style={{ fontSize: 12, color: "var(--muted-foreground)", margin: 0 }}>Expires 09/27 · Billing to james.hartley@company.com</p>
            </div>
          </div>
        </div>

        {/* Invoice History */}
        <div style={{ border: "1px solid var(--border)", borderRadius: 12, overflow: "hidden", background: "white" }}>
          <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border)" }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--foreground)", margin: 0 }}>Invoice History</h3>
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "var(--muted)", borderBottom: "1px solid var(--border)" }}>
                {["Date", "Amount", "Status", ""].map(h => (
                  <th key={h} style={{ padding: "10px 20px", textAlign: "left", fontSize: 12, fontWeight: 600, color: "var(--muted-foreground)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv, i) => (
                <tr key={inv.date} style={{ borderBottom: "1px solid var(--border)", background: i % 2 === 0 ? "white" : "#fafafa" }}>
                  <td style={{ padding: "12px 20px", fontSize: 13, color: "var(--foreground)" }}>{inv.date}</td>
                  <td style={{ padding: "12px 20px", fontSize: 14, fontWeight: 700, color: "var(--foreground)" }}>{inv.amount}</td>
                  <td style={{ padding: "12px 20px" }}>
                    <span style={{ background: "#dcfce7", color: "#16a34a", fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 8 }}>{inv.status}</span>
                  </td>
                  <td style={{ padding: "12px 20px" }}>
                    <button style={{ display: "flex", alignItems: "center", gap: 4, padding: "5px 12px", border: "1px solid var(--border)", borderRadius: 6, background: "white", fontSize: 12, cursor: "pointer", color: "var(--foreground)" }}>
                      <Download size={12} /> PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
