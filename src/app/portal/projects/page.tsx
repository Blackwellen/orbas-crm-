"use client"

import Link from "next/link"
import { ArrowRight, Calendar, User } from "lucide-react"

const projects = [
  {
    id: "1",
    name: "Website Redesign Phase 2",
    status: "In Progress",
    progress: 68,
    pm: "Sarah Johnson",
    due: "30 Jun 2026",
    lastUpdate: "2 days ago",
    description: "Complete redesign of public-facing marketing site including responsive mobile experience and new brand identity.",
    budget: "£18,000",
    tasks: { total: 34, done: 23 },
  },
  {
    id: "2",
    name: "ERP Integration",
    status: "Planning",
    progress: 22,
    pm: "James Carter",
    due: "15 Aug 2026",
    lastUpdate: "5 days ago",
    description: "Integration of Orbas CRM with existing ERP system for seamless data synchronisation across departments.",
    budget: "£32,000",
    tasks: { total: 48, done: 11 },
  },
  {
    id: "3",
    name: "Data Migration",
    status: "Completed",
    progress: 100,
    pm: "Rachel Moore",
    due: "28 Mar 2026",
    lastUpdate: "2 months ago",
    description: "Migration of 8 years of historical CRM data from legacy system to Orbas platform with full data validation.",
    budget: "£9,500",
    tasks: { total: 22, done: 22 },
  },
]

const statusConfig: Record<string, { color: string; bg: string }> = {
  "In Progress": { color: "#2563eb", bg: "#eff6ff" },
  "Planning":    { color: "#d97706", bg: "#fffbeb" },
  "Completed":   { color: "#16a34a", bg: "#f0fdf4" },
  "On Hold":     { color: "#64748b", bg: "#f1f5f9" },
}

export default function PortalProjectsPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: "var(--foreground)", margin: "0 0 4px 0" }}>Your Projects</h1>
        <p style={{ fontSize: 14, color: "var(--muted-foreground)", margin: 0 }}>Track progress across your active and completed projects</p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {projects.map(proj => {
          const cfg = statusConfig[proj.status] ?? { color: "#64748b", bg: "#f1f5f9" }
          return (
            <div key={proj.id} style={{
              background: "white",
              border: "1px solid var(--border)",
              borderRadius: 12,
              padding: "24px",
              transition: "box-shadow 0.15s",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, flexWrap: "wrap" }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                    <h2 style={{ fontSize: 16, fontWeight: 700, color: "var(--foreground)", margin: 0 }}>{proj.name}</h2>
                    <span style={{
                      padding: "2px 10px",
                      borderRadius: 20,
                      fontSize: 11,
                      fontWeight: 700,
                      color: cfg.color,
                      background: cfg.bg,
                      flexShrink: 0,
                    }}>
                      {proj.status}
                    </span>
                  </div>
                  <p style={{ fontSize: 13, color: "var(--muted-foreground)", margin: "0 0 14px 0", lineHeight: 1.5 }}>{proj.description}</p>

                  {/* Progress */}
                  <div style={{ marginBottom: 14 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                      <span style={{ fontSize: 12, color: "var(--muted-foreground)" }}>
                        {proj.tasks.done}/{proj.tasks.total} tasks complete
                      </span>
                      <span style={{ fontSize: 12, fontWeight: 700, color: proj.progress === 100 ? "#16a34a" : "var(--primary)" }}>
                        {proj.progress}%
                      </span>
                    </div>
                    <div style={{ height: 8, background: "var(--muted)", borderRadius: 8, overflow: "hidden" }}>
                      <div style={{
                        height: "100%",
                        width: `${proj.progress}%`,
                        background: proj.progress === 100
                          ? "linear-gradient(90deg, #16a34a, #22c55e)"
                          : "linear-gradient(90deg, #1a56db, #06b6d4)",
                        borderRadius: 8,
                        transition: "width 0.6s ease",
                      }} />
                    </div>
                  </div>

                  {/* Meta */}
                  <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--muted-foreground)" }}>
                      <User size={13} />
                      PM: <span style={{ fontWeight: 600, color: "var(--foreground)" }}>{proj.pm}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--muted-foreground)" }}>
                      <Calendar size={13} />
                      Due: <span style={{ fontWeight: 600, color: "var(--foreground)" }}>{proj.due}</span>
                    </div>
                    <div style={{ fontSize: 12, color: "var(--muted-foreground)" }}>
                      Budget: <span style={{ fontWeight: 600, color: "var(--foreground)" }}>{proj.budget}</span>
                    </div>
                    <div style={{ fontSize: 12, color: "var(--muted-foreground)" }}>
                      Last update: <span style={{ fontWeight: 600, color: "var(--foreground)" }}>{proj.lastUpdate}</span>
                    </div>
                  </div>
                </div>

                <div style={{ flexShrink: 0 }}>
                  <Link href={`/portal/projects/${proj.id}`} style={{ textDecoration: "none" }}>
                    <button style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      padding: "8px 16px",
                      borderRadius: 8,
                      border: "1px solid var(--border)",
                      background: "white",
                      color: "var(--foreground)",
                      fontWeight: 600,
                      fontSize: 13,
                      cursor: "pointer",
                    }}>
                      View Detail <ArrowRight size={13} />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
