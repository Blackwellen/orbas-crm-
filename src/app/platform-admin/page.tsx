"use client"

import Link from "next/link"
import {
  Building2, Users, TrendingUp, Activity,
  ChevronRight, AlertTriangle, CheckCircle2, Clock
} from "lucide-react"

const kpis = [
  { label: "Total Tenants",  value: "247",    sub: "+12 this month", icon: Building2, color: "#2563eb", bg: "#eff6ff" },
  { label: "Total Users",    value: "1,834",  sub: "+89 this month", icon: Users,     color: "#7c3aed", bg: "#f5f3ff" },
  { label: "Monthly MRR",    value: "£18,420",sub: "+8.4% vs last",  icon: TrendingUp, color: "#16a34a", bg: "#f0fdf4" },
  { label: "System Health",  value: "99.98%", sub: "30d uptime",     icon: Activity,   color: "#06b6d4", bg: "#ecfeff" },
]

const recentSignups = [
  { name: "Hartley & Sons Ltd",   plan: "Pro",       users: 14, date: "10 Jun 2026", status: "Active" },
  { name: "NovaTech Solutions",   plan: "Enterprise",users: 52, date: "9 Jun 2026",  status: "Active" },
  { name: "Green Leaf Charity",   plan: "Starter",   users: 3,  date: "8 Jun 2026",  status: "Trial" },
  { name: "Peak Performance Gym", plan: "Starter",   users: 5,  date: "7 Jun 2026",  status: "Trial" },
  { name: "Meadows Legal Group",  plan: "Pro",       users: 9,  date: "6 Jun 2026",  status: "Active" },
]

const systemChecks = [
  { name: "API Gateway",       status: "Operational", latency: "24ms"  },
  { name: "Database (Primary)",status: "Operational", latency: "8ms"   },
  { name: "Auth Service",      status: "Operational", latency: "15ms"  },
  { name: "File Storage",      status: "Operational", latency: "112ms" },
  { name: "Email Service",     status: "Degraded",    latency: "980ms" },
  { name: "Background Jobs",   status: "Operational", latency: "—"     },
]

const planColors: Record<string, { color: string; bg: string }> = {
  Enterprise: { color: "#7c3aed", bg: "#f5f3ff" },
  Pro:        { color: "#2563eb", bg: "#eff6ff" },
  Starter:    { color: "#64748b", bg: "#f1f5f9" },
}

const statusColors: Record<string, { color: string; bg: string }> = {
  Active:      { color: "#16a34a", bg: "#f0fdf4" },
  Trial:       { color: "#d97706", bg: "#fffbeb" },
  Suspended:   { color: "#ef4444", bg: "#fef2f2" },
}

export default function PlatformAdminOverviewPage() {
  return (
    <div style={{ padding: 28, display: "flex", flexDirection: "column", gap: 24 }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: "var(--foreground)", margin: "0 0 4px 0" }}>Platform Overview</h1>
          <p style={{ fontSize: 14, color: "var(--muted-foreground)", margin: 0 }}>Orbas CRM — Super Admin Console</p>
        </div>
        <span style={{
          padding: "5px 12px",
          borderRadius: 20,
          fontSize: 12,
          fontWeight: 700,
          background: "#fef2f2",
          color: "#ef4444",
          border: "1px solid #fecaca",
        }}>
          Platform Admin
        </span>
      </div>

      {/* KPIs */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
        {kpis.map(kpi => {
          const Icon = kpi.icon
          return (
            <div key={kpi.label} style={{
              background: "white",
              border: "1px solid var(--border)",
              borderRadius: 10,
              padding: 20,
            }}>
              <div style={{
                width: 40, height: 40, borderRadius: 10,
                background: kpi.bg,
                display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: 12,
              }}>
                <Icon size={18} color={kpi.color} />
              </div>
              <p style={{ fontSize: 24, fontWeight: 700, color: "var(--foreground)", margin: "0 0 2px 0" }}>{kpi.value}</p>
              <p style={{ fontSize: 13, fontWeight: 600, color: "var(--foreground)", margin: "0 0 2px 0" }}>{kpi.label}</p>
              <p style={{ fontSize: 12, color: "var(--muted-foreground)", margin: 0 }}>{kpi.sub}</p>
            </div>
          )
        })}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        {/* Recent signups */}
        <div style={{ background: "white", border: "1px solid var(--border)", borderRadius: 10, overflow: "hidden" }}>
          <div style={{ padding: "16px 20px 12px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--border)" }}>
            <h2 style={{ fontSize: 14, fontWeight: 700, color: "var(--foreground)", margin: 0 }}>Recent Signups</h2>
            <Link href="/platform-admin/tenants" style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: "var(--primary)", textDecoration: "none", fontWeight: 600 }}>
              All tenants <ChevronRight size={12} />
            </Link>
          </div>
          <div>
            {recentSignups.map((t, i) => {
              const pc = planColors[t.plan] ?? { color: "#64748b", bg: "#f1f5f9" }
              const sc = statusColors[t.status] ?? { color: "#64748b", bg: "#f1f5f9" }
              return (
                <div key={i} style={{
                  padding: "12px 20px",
                  borderBottom: i < recentSignups.length - 1 ? "1px solid var(--border)" : "none",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}>
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 600, color: "var(--foreground)", margin: "0 0 2px 0" }}>{t.name}</p>
                    <p style={{ fontSize: 11, color: "var(--muted-foreground)", margin: 0 }}>{t.users} users · {t.date}</p>
                  </div>
                  <div style={{ display: "flex", gap: 6 }}>
                    <span style={{ padding: "2px 8px", borderRadius: 20, fontSize: 11, fontWeight: 600, color: pc.color, background: pc.bg }}>{t.plan}</span>
                    <span style={{ padding: "2px 8px", borderRadius: 20, fontSize: 11, fontWeight: 600, color: sc.color, background: sc.bg }}>{t.status}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* System health */}
        <div style={{ background: "white", border: "1px solid var(--border)", borderRadius: 10, overflow: "hidden" }}>
          <div style={{ padding: "16px 20px 12px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--border)" }}>
            <h2 style={{ fontSize: 14, fontWeight: 700, color: "var(--foreground)", margin: 0 }}>System Health</h2>
            <Link href="/platform-admin/health" style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: "var(--primary)", textDecoration: "none", fontWeight: 600 }}>
              Details <ChevronRight size={12} />
            </Link>
          </div>
          <div>
            {systemChecks.map((check, i) => (
              <div key={i} style={{
                padding: "11px 20px",
                borderBottom: i < systemChecks.length - 1 ? "1px solid var(--border)" : "none",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  {check.status === "Operational" ? (
                    <CheckCircle2 size={14} color="#16a34a" />
                  ) : (
                    <AlertTriangle size={14} color="#d97706" />
                  )}
                  <span style={{ fontSize: 13, color: "var(--foreground)" }}>{check.name}</span>
                </div>
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <span style={{ fontSize: 12, color: "var(--muted-foreground)", fontFamily: "monospace" }}>{check.latency}</span>
                  <span style={{
                    padding: "2px 8px",
                    borderRadius: 20,
                    fontSize: 11,
                    fontWeight: 600,
                    color: check.status === "Operational" ? "#16a34a" : "#d97706",
                    background: check.status === "Operational" ? "#f0fdf4" : "#fffbeb",
                  }}>
                    {check.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MRR breakdown by plan */}
      <div style={{ background: "white", border: "1px solid var(--border)", borderRadius: 10, padding: 24 }}>
        <h2 style={{ fontSize: 14, fontWeight: 700, color: "var(--foreground)", margin: "0 0 16px 0" }}>Revenue Breakdown</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
          {[
            { plan: "Enterprise", tenants: 18, mrr: "£9,720",  pct: 53 },
            { plan: "Pro",        tenants: 74, mrr: "£6,660",  pct: 36 },
            { plan: "Starter",    tenants: 155, mrr: "£2,040", pct: 11 },
          ].map(row => (
            <div key={row.plan} style={{
              padding: 16,
              borderRadius: 8,
              border: "1px solid var(--border)",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: "var(--foreground)" }}>{row.plan}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: "var(--primary)" }}>{row.mrr}</span>
              </div>
              <p style={{ fontSize: 12, color: "var(--muted-foreground)", margin: "0 0 10px 0" }}>{row.tenants} workspaces</p>
              <div style={{ height: 6, background: "var(--muted)", borderRadius: 6, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${row.pct}%`, background: "linear-gradient(90deg, #1a56db, #06b6d4)", borderRadius: 6 }} />
              </div>
              <p style={{ fontSize: 11, color: "var(--muted-foreground)", margin: "6px 0 0" }}>{row.pct}% of MRR</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
