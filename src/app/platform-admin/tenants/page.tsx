"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Filter, ChevronRight, MoreHorizontal, PauseCircle, PlayCircle } from "lucide-react"

const tenants = [
  { id: "1",  name: "NovaTech Solutions",    slug: "novatech",   plan: "Enterprise", users: 52,  created: "1 Mar 2026",  status: "Active",    mrr: 540 },
  { id: "2",  name: "Hartley & Sons Ltd",    slug: "hartley",    plan: "Pro",        users: 14,  created: "10 Jun 2026", status: "Active",    mrr: 90 },
  { id: "3",  name: "Meadows Legal Group",   slug: "meadows",    plan: "Pro",        users: 9,   created: "6 Jun 2026",  status: "Active",    mrr: 90 },
  { id: "4",  name: "Peak Performance Gym",  slug: "peakgym",    plan: "Starter",    users: 5,   created: "7 Jun 2026",  status: "Trial",     mrr: 0 },
  { id: "5",  name: "Green Leaf Charity",    slug: "greenleaf",  plan: "Starter",    users: 3,   created: "8 Jun 2026",  status: "Trial",     mrr: 0 },
  { id: "6",  name: "Apex Consulting",       slug: "apex",       plan: "Enterprise", users: 88,  created: "15 Jan 2026", status: "Active",    mrr: 540 },
  { id: "7",  name: "BlueStar Retail",       slug: "bluestar",   plan: "Pro",        users: 22,  created: "20 Feb 2026", status: "Active",    mrr: 90 },
  { id: "8",  name: "Horizon Events",        slug: "horizon",    plan: "Starter",    users: 4,   created: "5 Apr 2026",  status: "Churned",   mrr: 0 },
  { id: "9",  name: "Coastal Properties",    slug: "coastal",    plan: "Pro",        users: 11,  created: "12 Apr 2026", status: "Suspended", mrr: 0 },
  { id: "10", name: "Pinnacle Finance Ltd",  slug: "pinnacle",   plan: "Enterprise", users: 34,  created: "3 Dec 2025",  status: "Active",    mrr: 540 },
]

type PlanFilter = "All" | "Starter" | "Pro" | "Enterprise"
type StatusFilter = "All" | "Active" | "Trial" | "Suspended" | "Churned"

const planColors: Record<string, { color: string; bg: string }> = {
  Enterprise: { color: "#7c3aed", bg: "#f5f3ff" },
  Pro:        { color: "#2563eb", bg: "#eff6ff" },
  Starter:    { color: "#64748b", bg: "#f1f5f9" },
}
const statusColors: Record<string, { color: string; bg: string }> = {
  Active:    { color: "#16a34a", bg: "#f0fdf4" },
  Trial:     { color: "#d97706", bg: "#fffbeb" },
  Suspended: { color: "#ef4444", bg: "#fef2f2" },
  Churned:   { color: "#64748b", bg: "#f1f5f9" },
}

export default function TenantsPage() {
  const [search, setSearch] = useState("")
  const [planFilter, setPlanFilter] = useState<PlanFilter>("All")
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All")

  const filtered = tenants.filter(t => {
    const matchSearch = t.name.toLowerCase().includes(search.toLowerCase()) || t.slug.includes(search.toLowerCase())
    const matchPlan = planFilter === "All" || t.plan === planFilter
    const matchStatus = statusFilter === "All" || t.status === statusFilter
    return matchSearch && matchPlan && matchStatus
  })

  const totalMRR = filtered.reduce((sum, t) => sum + t.mrr, 0)

  return (
    <div style={{ padding: 28, display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: "var(--foreground)", margin: "0 0 4px 0" }}>Tenants</h1>
          <p style={{ fontSize: 13, color: "var(--muted-foreground)", margin: 0 }}>{filtered.length} workspaces · MRR: £{totalMRR.toLocaleString()}</p>
        </div>
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
        <div style={{ position: "relative" }}>
          <Search size={14} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "var(--muted-foreground)" }} />
          <input
            type="text"
            placeholder="Search tenants..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              padding: "8px 12px 8px 30px",
              borderRadius: 8,
              border: "1px solid var(--border)",
              fontSize: 13,
              width: 220,
              background: "white",
              color: "var(--foreground)",
              outline: "none",
            }}
          />
        </div>
        <div style={{ display: "flex", gap: 4 }}>
          {(["All", "Starter", "Pro", "Enterprise"] as PlanFilter[]).map(p => (
            <button
              key={p}
              onClick={() => setPlanFilter(p)}
              style={{
                padding: "6px 12px",
                borderRadius: 6,
                border: "1px solid",
                borderColor: planFilter === p ? "var(--primary)" : "var(--border)",
                background: planFilter === p ? "var(--primary)" : "white",
                color: planFilter === p ? "white" : "var(--foreground)",
                fontWeight: 600,
                fontSize: 12,
                cursor: "pointer",
              }}
            >
              {p}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", gap: 4 }}>
          {(["All", "Active", "Trial", "Suspended", "Churned"] as StatusFilter[]).map(s => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              style={{
                padding: "6px 12px",
                borderRadius: 6,
                border: "1px solid",
                borderColor: statusFilter === s ? "#334155" : "var(--border)",
                background: statusFilter === s ? "#334155" : "white",
                color: statusFilter === s ? "white" : "var(--foreground)",
                fontWeight: 600,
                fontSize: 12,
                cursor: "pointer",
              }}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div style={{ background: "white", border: "1px solid var(--border)", borderRadius: 10, overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ background: "var(--muted)" }}>
                {["Name", "Plan", "Users", "Created", "Status", "MRR", "Actions"].map(h => (
                  <th key={h} style={{ padding: "10px 20px", textAlign: "left", fontWeight: 600, fontSize: 11, color: "var(--muted-foreground)", textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(t => {
                const pc = planColors[t.plan] ?? { color: "#64748b", bg: "#f1f5f9" }
                const sc = statusColors[t.status] ?? { color: "#64748b", bg: "#f1f5f9" }
                return (
                  <tr key={t.id} style={{ borderTop: "1px solid var(--border)" }}>
                    <td style={{ padding: "12px 20px" }}>
                      <p style={{ fontWeight: 600, color: "var(--foreground)", margin: "0 0 2px 0" }}>{t.name}</p>
                      <p style={{ fontSize: 11, color: "var(--muted-foreground)", margin: 0 }}>{t.slug}</p>
                    </td>
                    <td style={{ padding: "12px 20px" }}>
                      <span style={{ padding: "2px 9px", borderRadius: 20, fontSize: 12, fontWeight: 600, color: pc.color, background: pc.bg }}>{t.plan}</span>
                    </td>
                    <td style={{ padding: "12px 20px", color: "var(--foreground)" }}>{t.users}</td>
                    <td style={{ padding: "12px 20px", color: "var(--muted-foreground)" }}>{t.created}</td>
                    <td style={{ padding: "12px 20px" }}>
                      <span style={{ padding: "2px 9px", borderRadius: 20, fontSize: 12, fontWeight: 600, color: sc.color, background: sc.bg }}>{t.status}</span>
                    </td>
                    <td style={{ padding: "12px 20px", fontWeight: 600, color: "var(--foreground)" }}>
                      {t.mrr > 0 ? `£${t.mrr}/mo` : <span style={{ color: "var(--muted-foreground)" }}>—</span>}
                    </td>
                    <td style={{ padding: "12px 20px" }}>
                      <div style={{ display: "flex", gap: 6 }}>
                        <Link href={`/platform-admin/tenants/${t.id}`}>
                          <button style={{
                            display: "flex", alignItems: "center", gap: 4,
                            padding: "5px 10px", borderRadius: 6,
                            border: "1px solid var(--border)", background: "white",
                            color: "var(--foreground)", fontWeight: 600, fontSize: 12, cursor: "pointer",
                          }}>
                            View <ChevronRight size={11} />
                          </button>
                        </Link>
                        {t.status === "Active" || t.status === "Trial" ? (
                          <button style={{
                            display: "flex", alignItems: "center", gap: 4,
                            padding: "5px 10px", borderRadius: 6,
                            border: "1px solid #fecaca", background: "#fef2f2",
                            color: "#ef4444", fontWeight: 600, fontSize: 12, cursor: "pointer",
                          }}>
                            <PauseCircle size={11} /> Suspend
                          </button>
                        ) : t.status === "Suspended" ? (
                          <button style={{
                            display: "flex", alignItems: "center", gap: 4,
                            padding: "5px 10px", borderRadius: 6,
                            border: "1px solid #bbf7d0", background: "#f0fdf4",
                            color: "#16a34a", fontWeight: 600, fontSize: 12, cursor: "pointer",
                          }}>
                            <PlayCircle size={11} /> Activate
                          </button>
                        ) : null}
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
            No tenants found matching your filters.
          </div>
        )}
      </div>
    </div>
  )
}
