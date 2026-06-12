"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart2, Clock, Users, DollarSign, TrendingUp, FileText } from "lucide-react"

const REPORTS = [
  {
    id: "r1",
    title: "Project Status Report",
    description: "Summary of all active projects — health, progress, milestones, risks.",
    icon: BarChart2,
    accent: "var(--primary)",
    tags: ["Projects","Health","Milestones"],
    lastRun: "2025-07-05",
  },
  {
    id: "r2",
    title: "Budget & Financials Report",
    description: "Budget vs actual spend, forecast, variance analysis per project and client.",
    icon: DollarSign,
    accent: "#22c55e",
    tags: ["Finance","Budget","Forecast"],
    lastRun: "2025-07-03",
  },
  {
    id: "r3",
    title: "Resource Utilization Report",
    description: "Team allocation, capacity, over/under utilization trends by week.",
    icon: Users,
    accent: "#8b5cf6",
    tags: ["Resources","Capacity","Allocation"],
    lastRun: "2025-07-06",
  },
  {
    id: "r4",
    title: "Time & Billing Report",
    description: "Billable vs non-billable hours, timesheet approvals, cost breakdown.",
    icon: Clock,
    accent: "#f59e0b",
    tags: ["Time","Billing","Hours"],
    lastRun: "2025-07-06",
  },
  {
    id: "r5",
    title: "Profitability Report",
    description: "Revenue, cost, margin, and profitability per project and team.",
    icon: TrendingUp,
    accent: "#06b6d4",
    tags: ["Profit","Revenue","Margin"],
    lastRun: "2025-07-01",
  },
  {
    id: "r6",
    title: "Milestone Delivery Report",
    description: "On-time vs delayed milestones, dependency chains, SLA tracking.",
    icon: FileText,
    accent: "#ef4444",
    tags: ["Milestones","Delivery","SLA"],
    lastRun: "2025-06-28",
  },
]

export default function ProjectReportsPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold" style={{ color: "var(--foreground)" }}>Reports</h1>
        <p className="text-sm mt-1" style={{ color: "var(--muted-foreground)" }}>Generate insights across projects, resources and financials</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {REPORTS.map(r => (
          <Card key={r.id} className="border hover:shadow-md transition-shadow" style={{ borderColor: "var(--border)" }}>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div className="p-2.5 rounded-xl" style={{ background: `${r.accent}18` }}>
                  <r.icon className="h-5 w-5" style={{ color: r.accent }} />
                </div>
                <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>Last: {r.lastRun}</span>
              </div>
              <div>
                <h3 className="font-semibold" style={{ color: "var(--foreground)" }}>{r.title}</h3>
                <p className="text-sm mt-1" style={{ color: "var(--muted-foreground)" }}>{r.description}</p>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {r.tags.map(tag => (
                  <span
                    key={tag}
                    className="inline-flex rounded-full px-2 py-0.5 text-xs font-medium"
                    style={{ background: "var(--muted)", color: "var(--muted-foreground)" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex gap-2 pt-1">
                <Button
                  className="flex-1"
                  size="sm"
                  style={{ background: r.accent, color: "#fff" }}
                >
                  Run Report
                </Button>
                <Button size="sm" variant="outline">Schedule</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
