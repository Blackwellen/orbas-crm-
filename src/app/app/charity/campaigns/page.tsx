"use client"

import { useState } from "react"
import { Megaphone, Plus } from "lucide-react"

const campaigns = [
  { name: "Summer Appeal 2026", type: "Annual Appeal", target: 75000, raised: 58200, donors: 284, start: "2026-05-01", end: "2026-08-31", status: "Active" },
  { name: "Building Our Future Capital Campaign", type: "Capital Campaign", target: 200000, raised: 124500, donors: 48, start: "2025-09-01", end: "2026-12-31", status: "Active" },
  { name: "Community Kitchen Programme", type: "Project Fund", target: 35000, raised: 32800, donors: 156, start: "2026-01-01", end: "2026-06-30", status: "Active" },
  { name: "Emergency Relief Fund", type: "Emergency", target: 50000, raised: 61240, donors: 412, start: "2026-03-15", end: "2026-05-15", status: "Completed" },
  { name: "Christmas Appeal 2025", type: "Annual Appeal", target: 80000, raised: 84320, donors: 502, start: "2025-11-01", end: "2025-12-31", status: "Completed" },
  { name: "Spring Gala Fundraiser", type: "Event", target: 15000, raised: 3200, donors: 28, start: "2026-06-20", end: "2026-06-20", status: "Planning" },
  { name: "Corporate Matching Drive", type: "Corporate", target: 40000, raised: 18500, donors: 22, start: "2026-04-01", end: "2026-09-30", status: "Active" },
  { name: "Legacy & Planned Giving", type: "Legacy", target: 100000, raised: 0, donors: 0, start: "2026-01-01", end: "2026-12-31", status: "Paused" },
]

function statusStyle(s: string) {
  switch (s) {
    case "Active": return { background: "#dcfce7", color: "#16a34a" }
    case "Completed": return { background: "#f3f4f6", color: "#6b7280" }
    case "Planning": return { background: "#eff6ff", color: "#1a56db" }
    default: return { background: "#fef9c3", color: "#d97706" }
  }
}

export default function CampaignsPage() {
  const [view, setView] = useState<"cards" | "table">("cards")

  return (
    <div style={{ padding: 32, minHeight: "100vh", background: "var(--background)" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Megaphone size={24} style={{ color: "#e11d48" }} />
          <h1 style={{ fontSize: 22, fontWeight: 700, color: "var(--foreground)", margin: 0 }}>Campaigns</h1>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <div style={{ display: "flex", border: "1px solid var(--border)", borderRadius: 6, overflow: "hidden" }}>
            {(["cards", "table"] as const).map(v => (
              <button key={v} onClick={() => setView(v)} style={{ padding: "7px 14px", border: "none", background: view === v ? "var(--primary)" : "white", color: view === v ? "white" : "var(--foreground)", fontSize: 13, cursor: "pointer", fontWeight: 500, textTransform: "capitalize" }}>{v}</button>
            ))}
          </div>
          <button style={{ display: "flex", alignItems: "center", gap: 6, background: "#e11d48", color: "white", border: "none", borderRadius: 8, padding: "9px 18px", fontWeight: 600, fontSize: 14, cursor: "pointer" }}>
            <Plus size={16} /> New Campaign
          </button>
        </div>
      </div>

      {view === "cards" ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}>
          {campaigns.map(c => {
            const pct = c.target > 0 ? Math.min(Math.round((c.raised / c.target) * 100), 100) : 0
            return (
              <div key={c.name} style={{ border: "1px solid var(--border)", borderRadius: 12, padding: 24, background: "white" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                  <div>
                    <p style={{ fontSize: 15, fontWeight: 700, color: "var(--foreground)", margin: 0 }}>{c.name}</p>
                    <p style={{ fontSize: 12, color: "var(--muted-foreground)", margin: "2px 0 0" }}>{c.type} · {c.donors} donors</p>
                  </div>
                  <span style={{ ...statusStyle(c.status), fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 10 }}>{c.status}</span>
                </div>
                <div style={{ marginBottom: 12 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <span style={{ fontSize: 14, fontWeight: 700, color: "#e11d48" }}>{"£"}{c.raised.toLocaleString()}</span>
                    <span style={{ fontSize: 13, color: "var(--muted-foreground)" }}>of {"£"}{c.target.toLocaleString()} ({pct}%)</span>
                  </div>
                  <div style={{ height: 8, background: "var(--muted)", borderRadius: 4, overflow: "hidden" }}>
                    <div style={{ width: `${pct}%`, height: "100%", background: pct >= 100 ? "#16a34a" : "#e11d48", borderRadius: 4 }} />
                  </div>
                </div>
                <div style={{ display: "flex", gap: 16, fontSize: 12, color: "var(--muted-foreground)" }}>
                  <span>{c.start} — {c.end}</span>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div style={{ border: "1px solid var(--border)", borderRadius: 12, overflow: "hidden", background: "white" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "var(--muted)", borderBottom: "1px solid var(--border)" }}>
                {["Name", "Type", "Target", "Raised", "% to Target", "Donors", "Start", "End", "Status"].map(h => (
                  <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontSize: 12, fontWeight: 600, color: "var(--muted-foreground)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {campaigns.map((c, i) => {
                const pct = c.target > 0 ? Math.round((c.raised / c.target) * 100) : 0
                return (
                  <tr key={c.name} style={{ borderBottom: "1px solid var(--border)", background: i % 2 === 0 ? "white" : "#fafafa" }}>
                    <td style={{ padding: "10px 14px", fontSize: 13, fontWeight: 600, color: "#e11d48", cursor: "pointer" }}>{c.name}</td>
                    <td style={{ padding: "10px 14px", fontSize: 12, color: "var(--muted-foreground)" }}>{c.type}</td>
                    <td style={{ padding: "10px 14px", fontSize: 13, color: "var(--foreground)" }}>{"£"}{c.target.toLocaleString()}</td>
                    <td style={{ padding: "10px 14px", fontSize: 13, fontWeight: 700, color: "#16a34a" }}>{"£"}{c.raised.toLocaleString()}</td>
                    <td style={{ padding: "10px 14px", minWidth: 100 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <div style={{ flex: 1, height: 6, background: "var(--muted)", borderRadius: 3, overflow: "hidden" }}>
                          <div style={{ width: `${Math.min(pct, 100)}%`, height: "100%", background: "#e11d48", borderRadius: 3 }} />
                        </div>
                        <span style={{ fontSize: 11, fontWeight: 600, minWidth: 28 }}>{pct}%</span>
                      </div>
                    </td>
                    <td style={{ padding: "10px 14px", fontSize: 13, color: "var(--foreground)" }}>{c.donors}</td>
                    <td style={{ padding: "10px 14px", fontSize: 12, color: "var(--muted-foreground)" }}>{c.start}</td>
                    <td style={{ padding: "10px 14px", fontSize: 12, color: "var(--muted-foreground)" }}>{c.end}</td>
                    <td style={{ padding: "10px 14px" }}>
                      <span style={{ ...statusStyle(c.status), fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 8 }}>{c.status}</span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
