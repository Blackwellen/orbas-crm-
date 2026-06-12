"use client"

import Link from "next/link"
import {
  FileText, Briefcase, Headphones, FolderOpen,
  Download, CreditCard, MessageSquarePlus, ArrowRight,
  TrendingUp, CheckCircle2, Clock, AlertCircle
} from "lucide-react"

const kpis = [
  {
    label: "Outstanding",
    value: "£4,850",
    sub: "3 invoices",
    icon: FileText,
    color: "#ef4444",
    bg: "#fef2f2",
  },
  {
    label: "Active Projects",
    value: "2",
    sub: "1 near deadline",
    icon: Briefcase,
    color: "#2563eb",
    bg: "#eff6ff",
  },
  {
    label: "Open Tickets",
    value: "3",
    sub: "1 high priority",
    icon: Headphones,
    color: "#d97706",
    bg: "#fffbeb",
  },
  {
    label: "Documents",
    value: "14",
    sub: "3 new this month",
    icon: FolderOpen,
    color: "#16a34a",
    bg: "#f0fdf4",
  },
]

const recentInvoices = [
  { number: "INV-2024-089", date: "28 May 2026", amount: "£2,400", status: "Overdue", statusColor: "#ef4444", statusBg: "#fef2f2" },
  { number: "INV-2024-088", date: "15 May 2026", amount: "£1,800", status: "Outstanding", statusColor: "#d97706", statusBg: "#fffbeb" },
  { number: "INV-2024-087", date: "1 May 2026",  amount: "£650",   status: "Paid",        statusColor: "#16a34a", statusBg: "#f0fdf4" },
  { number: "INV-2024-086", date: "12 Apr 2026", amount: "£3,200", status: "Paid",        statusColor: "#16a34a", statusBg: "#f0fdf4" },
]

const activeProjects = [
  { name: "Website Redesign Phase 2", status: "In Progress", progress: 68, pm: "Sarah Johnson", due: "30 Jun 2026" },
  { name: "ERP Integration",          status: "Planning",    progress: 22, pm: "James Carter",  due: "15 Aug 2026" },
]

const recentTickets = [
  { number: "#TK-441", title: "Cannot export reports to PDF", status: "Open",       priority: "High",   updated: "2h ago" },
  { number: "#TK-438", title: "User onboarding question",       status: "In Review", priority: "Normal", updated: "1d ago" },
  { number: "#TK-432", title: "Invoice discrepancy Jan 2026",   status: "Resolved",  priority: "Normal", updated: "3d ago" },
]

const quickActions = [
  { label: "Pay Invoice",        icon: CreditCard,       href: "/portal/invoices",  color: "#2563eb" },
  { label: "Download Statement", icon: Download,         href: "/portal/invoices",  color: "#16a34a" },
  { label: "Submit Request",     icon: MessageSquarePlus, href: "/portal/support",  color: "#7c3aed" },
  { label: "View Documents",     icon: FolderOpen,       href: "/portal/documents", color: "#d97706" },
]

function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{
      background: "white",
      border: "1px solid var(--border)",
      borderRadius: 10,
      ...style,
    }}>
      {children}
    </div>
  )
}

function Badge({ label, color, bg }: { label: string; color: string; bg: string }) {
  return (
    <span style={{
      display: "inline-flex",
      alignItems: "center",
      padding: "2px 9px",
      borderRadius: 20,
      fontSize: 12,
      fontWeight: 600,
      color,
      background: bg,
    }}>
      {label}
    </span>
  )
}

export default function PortalHomePage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* Welcome banner */}
      <div style={{
        background: "linear-gradient(135deg, #1a56db 0%, #06b6d4 100%)",
        borderRadius: 12,
        padding: "28px 32px",
        color: "white",
      }}>
        <p style={{ fontSize: 13, opacity: 0.85, margin: "0 0 4px 0" }}>Welcome back,</p>
        <h1 style={{ fontSize: 24, fontWeight: 700, margin: "0 0 4px 0" }}>Acme Corporation</h1>
        <p style={{ fontSize: 14, opacity: 0.8, margin: 0 }}>
          Your client portal — invoices, projects, documents, and support in one place.
        </p>
      </div>

      {/* KPIs */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16 }}>
        {kpis.map(kpi => {
          const Icon = kpi.icon
          return (
            <Card key={kpi.label} style={{ padding: 20 }}>
              <div style={{
                width: 40, height: 40, borderRadius: 10,
                background: kpi.bg,
                display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: 12,
              }}>
                <Icon size={18} color={kpi.color} />
              </div>
              <p style={{ fontSize: 22, fontWeight: 700, color: "var(--foreground)", margin: "0 0 2px 0" }}>{kpi.value}</p>
              <p style={{ fontSize: 13, fontWeight: 600, color: "var(--foreground)", margin: "0 0 2px 0" }}>{kpi.label}</p>
              <p style={{ fontSize: 12, color: "var(--muted-foreground)", margin: 0 }}>{kpi.sub}</p>
            </Card>
          )
        })}
      </div>

      {/* Quick actions */}
      <Card style={{ padding: "20px 24px" }}>
        <h2 style={{ fontSize: 15, fontWeight: 700, color: "var(--foreground)", margin: "0 0 16px 0" }}>Quick Actions</h2>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {quickActions.map(action => {
            const Icon = action.icon
            return (
              <Link key={action.label} href={action.href} style={{ textDecoration: "none" }}>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "10px 16px",
                  borderRadius: 8,
                  border: "1px solid var(--border)",
                  background: "white",
                  cursor: "pointer",
                  transition: "border-color 0.15s",
                  fontSize: 13,
                  fontWeight: 600,
                  color: "var(--foreground)",
                }}>
                  <Icon size={15} color={action.color} />
                  {action.label}
                </div>
              </Link>
            )
          })}
        </div>
      </Card>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        {/* Recent invoices */}
        <Card>
          <div style={{ padding: "18px 20px 12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h2 style={{ fontSize: 14, fontWeight: 700, color: "var(--foreground)", margin: 0 }}>Recent Invoices</h2>
            <Link href="/portal/invoices" style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: "var(--primary)", textDecoration: "none", fontWeight: 600 }}>
              View all <ArrowRight size={12} />
            </Link>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr style={{ borderTop: "1px solid var(--border)" }}>
                  {["Invoice #", "Date", "Amount", "Status"].map(h => (
                    <th key={h} style={{ padding: "8px 20px", textAlign: "left", fontWeight: 600, fontSize: 11, color: "var(--muted-foreground)", textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentInvoices.map(inv => (
                  <tr key={inv.number} style={{ borderTop: "1px solid var(--border)" }}>
                    <td style={{ padding: "10px 20px", fontWeight: 600, color: "var(--primary)" }}>{inv.number}</td>
                    <td style={{ padding: "10px 20px", color: "var(--muted-foreground)" }}>{inv.date}</td>
                    <td style={{ padding: "10px 20px", fontWeight: 600 }}>{inv.amount}</td>
                    <td style={{ padding: "10px 20px" }}>
                      <Badge label={inv.status} color={inv.statusColor} bg={inv.statusBg} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Active projects */}
        <Card>
          <div style={{ padding: "18px 20px 12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h2 style={{ fontSize: 14, fontWeight: 700, color: "var(--foreground)", margin: 0 }}>Active Projects</h2>
            <Link href="/portal/projects" style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: "var(--primary)", textDecoration: "none", fontWeight: 600 }}>
              View all <ArrowRight size={12} />
            </Link>
          </div>
          <div style={{ padding: "0 20px 20px", display: "flex", flexDirection: "column", gap: 16 }}>
            {activeProjects.map(proj => (
              <div key={proj.name} style={{ borderTop: "1px solid var(--border)", paddingTop: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                  <div>
                    <p style={{ fontWeight: 600, fontSize: 13, color: "var(--foreground)", margin: "0 0 2px 0" }}>{proj.name}</p>
                    <p style={{ fontSize: 12, color: "var(--muted-foreground)", margin: 0 }}>PM: {proj.pm} · Due {proj.due}</p>
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "var(--primary)" }}>{proj.progress}%</span>
                </div>
                <div style={{ height: 6, background: "var(--muted)", borderRadius: 6, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${proj.progress}%`, background: "linear-gradient(90deg, #1a56db, #06b6d4)", borderRadius: 6, transition: "width 0.6s" }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Recent tickets */}
      <Card>
        <div style={{ padding: "18px 20px 12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ fontSize: 14, fontWeight: 700, color: "var(--foreground)", margin: 0 }}>Recent Support Tickets</h2>
          <Link href="/portal/support" style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: "var(--primary)", textDecoration: "none", fontWeight: 600 }}>
            View all <ArrowRight size={12} />
          </Link>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ borderTop: "1px solid var(--border)" }}>
                {["#", "Title", "Status", "Priority", "Updated"].map(h => (
                  <th key={h} style={{ padding: "8px 20px", textAlign: "left", fontWeight: 600, fontSize: 11, color: "var(--muted-foreground)", textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentTickets.map(t => (
                <tr key={t.number} style={{ borderTop: "1px solid var(--border)" }}>
                  <td style={{ padding: "10px 20px", fontWeight: 600, color: "var(--primary)" }}>{t.number}</td>
                  <td style={{ padding: "10px 20px", color: "var(--foreground)" }}>{t.title}</td>
                  <td style={{ padding: "10px 20px" }}>
                    <Badge
                      label={t.status}
                      color={t.status === "Resolved" ? "#16a34a" : t.status === "In Review" ? "#d97706" : "#2563eb"}
                      bg={t.status === "Resolved" ? "#f0fdf4" : t.status === "In Review" ? "#fffbeb" : "#eff6ff"}
                    />
                  </td>
                  <td style={{ padding: "10px 20px" }}>
                    <Badge
                      label={t.priority}
                      color={t.priority === "High" ? "#ef4444" : "#64748b"}
                      bg={t.priority === "High" ? "#fef2f2" : "#f1f5f9"}
                    />
                  </td>
                  <td style={{ padding: "10px 20px", color: "var(--muted-foreground)" }}>{t.updated}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
