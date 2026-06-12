"use client"

import { use } from "react"
import Link from "next/link"
import {
  ArrowLeft, Users, CreditCard, Settings, MessageSquare,
  Shield, AlertTriangle, ChevronRight, ExternalLink
} from "lucide-react"

const tenantData: Record<string, {
  name: string; slug: string; plan: string; status: string;
  users: number; mrr: number; created: string; industry: string;
  owner: string; ownerEmail: string; notes: string;
}> = {
  "1": {
    name: "NovaTech Solutions",
    slug: "novatech",
    plan: "Enterprise",
    status: "Active",
    users: 52,
    mrr: 540,
    created: "1 Mar 2026",
    industry: "Technology",
    owner: "James Walker",
    ownerEmail: "james.walker@novatech.io",
    notes: "Long-standing enterprise client. Custom SLA agreed. Renewal due Q4.",
  },
  "2": {
    name: "Hartley & Sons Ltd",
    slug: "hartley",
    plan: "Pro",
    status: "Active",
    users: 14,
    mrr: 90,
    created: "10 Jun 2026",
    industry: "Legal Services",
    owner: "Patricia Hartley",
    ownerEmail: "p.hartley@hartleysons.co.uk",
    notes: "",
  },
}

const tenantUsers = [
  { name: "James Walker",   email: "james.walker@novatech.io",   role: "Admin",  lastActive: "2h ago",   status: "Active" },
  { name: "Sarah Mitchell", email: "s.mitchell@novatech.io",     role: "Member", lastActive: "1d ago",   status: "Active" },
  { name: "Tom Reid",       email: "t.reid@novatech.io",         role: "Member", lastActive: "3d ago",   status: "Active" },
  { name: "Lucy Chen",      email: "l.chen@novatech.io",         role: "Member", lastActive: "1w ago",   status: "Inactive" },
]

const billingHistory = [
  { date: "1 Jun 2026",  amount: "£540",  status: "Paid",   invoice: "INV-PLT-0892" },
  { date: "1 May 2026",  amount: "£540",  status: "Paid",   invoice: "INV-PLT-0841" },
  { date: "1 Apr 2026",  amount: "£540",  status: "Paid",   invoice: "INV-PLT-0783" },
  { date: "1 Mar 2026",  amount: "£540",  status: "Paid",   invoice: "INV-PLT-0721" },
]

const planColors: Record<string, { color: string; bg: string }> = {
  Enterprise: { color: "#7c3aed", bg: "#f5f3ff" },
  Pro:        { color: "#2563eb", bg: "#eff6ff" },
  Starter:    { color: "#64748b", bg: "#f1f5f9" },
}

export default function TenantDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const tenant = tenantData[id] ?? tenantData["1"]
  const pc = planColors[tenant.plan] ?? { color: "#64748b", bg: "#f1f5f9" }

  return (
    <div style={{ padding: 28, display: "flex", flexDirection: "column", gap: 24 }}>
      {/* Back */}
      <Link href="/platform-admin/tenants" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "var(--muted-foreground)", textDecoration: "none", fontSize: 13 }}>
        <ArrowLeft size={14} /> Back to Tenants
      </Link>

      {/* Header */}
      <div style={{
        background: "white",
        border: "1px solid var(--border)",
        borderRadius: 12,
        padding: 24,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        flexWrap: "wrap",
        gap: 16,
      }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
            <h1 style={{ fontSize: 20, fontWeight: 700, color: "var(--foreground)", margin: 0 }}>{tenant.name}</h1>
            <span style={{ padding: "2px 9px", borderRadius: 20, fontSize: 12, fontWeight: 600, color: pc.color, background: pc.bg }}>{tenant.plan}</span>
            <span style={{
              padding: "2px 9px", borderRadius: 20, fontSize: 12, fontWeight: 600,
              color: "#16a34a", background: "#f0fdf4",
            }}>
              {tenant.status}
            </span>
          </div>
          <p style={{ fontSize: 13, color: "var(--muted-foreground)", margin: "0 0 10px 0" }}>
            {tenant.slug} · {tenant.industry} · Created {tenant.created}
          </p>
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
            <div>
              <p style={{ fontSize: 11, color: "var(--muted-foreground)", margin: "0 0 2px 0", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 600 }}>Account Owner</p>
              <p style={{ fontSize: 13, fontWeight: 600, color: "var(--foreground)", margin: 0 }}>{tenant.owner}</p>
              <p style={{ fontSize: 12, color: "var(--muted-foreground)", margin: 0 }}>{tenant.ownerEmail}</p>
            </div>
            <div>
              <p style={{ fontSize: 11, color: "var(--muted-foreground)", margin: "0 0 2px 0", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 600 }}>Users</p>
              <p style={{ fontSize: 22, fontWeight: 700, color: "var(--foreground)", margin: 0 }}>{tenant.users}</p>
            </div>
            <div>
              <p style={{ fontSize: 11, color: "var(--muted-foreground)", margin: "0 0 2px 0", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 600 }}>MRR</p>
              <p style={{ fontSize: 22, fontWeight: 700, color: "var(--foreground)", margin: 0 }}>£{tenant.mrr}/mo</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8, minWidth: 180 }}>
          <button style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            padding: "9px 16px", borderRadius: 8,
            background: "linear-gradient(135deg, #1a56db, #06b6d4)",
            border: "none", color: "white", fontWeight: 700, fontSize: 13, cursor: "pointer",
          }}>
            <ExternalLink size={13} /> Impersonate Admin
          </button>
          <button style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            padding: "9px 16px", borderRadius: 8,
            border: "1px solid var(--border)", background: "white",
            color: "var(--foreground)", fontWeight: 600, fontSize: 13, cursor: "pointer",
          }}>
            <Settings size={13} /> Change Plan
          </button>
          <button style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            padding: "9px 16px", borderRadius: 8,
            border: "1px solid #fecaca", background: "#fef2f2",
            color: "#ef4444", fontWeight: 600, fontSize: 13, cursor: "pointer",
          }}>
            <AlertTriangle size={13} /> Suspend Tenant
          </button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        {/* Users */}
        <div style={{ background: "white", border: "1px solid var(--border)", borderRadius: 10, overflow: "hidden" }}>
          <div style={{ padding: "14px 18px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 8 }}>
            <Users size={15} color="var(--primary)" />
            <h2 style={{ fontSize: 14, fontWeight: 700, color: "var(--foreground)", margin: 0 }}>Users ({tenantUsers.length})</h2>
          </div>
          {tenantUsers.map((u, i) => (
            <div key={i} style={{
              padding: "10px 18px",
              borderBottom: i < tenantUsers.length - 1 ? "1px solid var(--border)" : "none",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}>
              <div>
                <p style={{ fontSize: 13, fontWeight: 600, color: "var(--foreground)", margin: "0 0 1px 0" }}>{u.name}</p>
                <p style={{ fontSize: 11, color: "var(--muted-foreground)", margin: 0 }}>{u.email}</p>
              </div>
              <div style={{ textAlign: "right" }}>
                <p style={{ fontSize: 12, fontWeight: 600, color: "var(--foreground)", margin: "0 0 1px 0" }}>{u.role}</p>
                <p style={{ fontSize: 11, color: "var(--muted-foreground)", margin: 0 }}>{u.lastActive}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Billing */}
        <div style={{ background: "white", border: "1px solid var(--border)", borderRadius: 10, overflow: "hidden" }}>
          <div style={{ padding: "14px 18px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 8 }}>
            <CreditCard size={15} color="var(--primary)" />
            <h2 style={{ fontSize: 14, fontWeight: 700, color: "var(--foreground)", margin: 0 }}>Billing History</h2>
          </div>
          {billingHistory.map((b, i) => (
            <div key={i} style={{
              padding: "10px 18px",
              borderBottom: i < billingHistory.length - 1 ? "1px solid var(--border)" : "none",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}>
              <div>
                <p style={{ fontSize: 13, fontWeight: 600, color: "var(--foreground)", margin: "0 0 1px 0" }}>{b.invoice}</p>
                <p style={{ fontSize: 11, color: "var(--muted-foreground)", margin: 0 }}>{b.date}</p>
              </div>
              <div style={{ textAlign: "right" }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: "var(--foreground)", margin: "0 0 2px 0" }}>{b.amount}</p>
                <span style={{ fontSize: 11, fontWeight: 600, color: "#16a34a", background: "#f0fdf4", padding: "1px 7px", borderRadius: 20 }}>{b.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Notes */}
      <div style={{ background: "white", border: "1px solid var(--border)", borderRadius: 10, padding: 20 }}>
        <h2 style={{ fontSize: 14, fontWeight: 700, color: "var(--foreground)", margin: "0 0 12px 0" }}>Internal Notes</h2>
        <textarea
          defaultValue={tenant.notes}
          placeholder="Add internal notes about this tenant..."
          rows={4}
          style={{
            width: "100%",
            padding: "10px 12px",
            borderRadius: 8,
            border: "1px solid var(--border)",
            fontSize: 13,
            color: "var(--foreground)",
            resize: "vertical",
            boxSizing: "border-box",
            fontFamily: "inherit",
            outline: "none",
            background: "var(--muted)",
          }}
        />
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 10 }}>
          <button style={{
            padding: "8px 16px",
            borderRadius: 8,
            border: "none",
            background: "var(--primary)",
            color: "white",
            fontWeight: 700,
            fontSize: 13,
            cursor: "pointer",
          }}>
            Save Notes
          </button>
        </div>
      </div>
    </div>
  )
}
