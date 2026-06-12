"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Calendar, Users } from "lucide-react"

const MY_PROJECTS = [
  { id: "1", name: "Orbas Platform Rebuild",   client: "Orbas Ltd",          role: "Project Manager", progress: 72,  status: "Active",   end: "2025-09-30", tasks: 12 },
  { id: "4", name: "Data Warehouse Migration",  client: "FinServe Group",     role: "Project Manager", progress: 62,  status: "On Hold",  end: "2025-07-31", tasks: 5  },
  { id: "8", name: "Supply Chain API",          client: "Apex Manufacturing", role: "Project Manager", progress: 52,  status: "Active",   end: "2025-08-15", tasks: 8  },
  { id: "13", name: "Security Audit & Pen Test",client: "FinServe Group",     role: "Project Manager", progress: 100, status: "Completed",end: "2025-03-31", tasks: 0  },
]

const STATUS_STYLE: Record<string, { bg: string; color: string; border: string }> = {
  Active:    { bg: "rgba(34,197,94,0.12)",   color: "#16a34a", border: "rgba(34,197,94,0.3)"   },
  "On Hold": { bg: "rgba(245,158,11,0.12)",  color: "#d97706", border: "rgba(245,158,11,0.3)"  },
  Completed: { bg: "rgba(107,114,128,0.12)", color: "#6b7280", border: "rgba(107,114,128,0.3)" },
}

export default function MyProjectsPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold" style={{ color: "var(--foreground)" }}>My Projects</h1>
          <p className="text-sm mt-1" style={{ color: "var(--muted-foreground)" }}>Projects where you are the owner or PM</p>
        </div>
        <Link href="/app/projects/projects/new">
          <Button size="sm" className="gap-2" style={{ background: "var(--primary)", color: "#fff" }}>
            <Plus className="h-4 w-4" /> New Project
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {MY_PROJECTS.map(p => {
          const s = STATUS_STYLE[p.status] ?? STATUS_STYLE.Active
          return (
            <Link key={p.id} href={`/app/projects/projects/${p.id}`}>
              <Card className="border hover:shadow-md transition-shadow cursor-pointer h-full" style={{ borderColor: "var(--border)" }}>
                <CardContent className="p-5 space-y-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold truncate" style={{ color: "var(--foreground)" }}>{p.name}</p>
                      <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>{p.client}</p>
                    </div>
                    <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium border shrink-0" style={{ background: s.bg, color: s.color, borderColor: s.border }}>
                      {p.status}
                    </span>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span style={{ color: "var(--muted-foreground)" }}>Progress</span>
                      <span className="font-semibold" style={{ color: "var(--foreground)" }}>{p.progress}%</span>
                    </div>
                    <div className="h-2 rounded-full overflow-hidden" style={{ background: "var(--muted)" }}>
                      <div className="h-full rounded-full" style={{
                        width: `${p.progress}%`,
                        background: p.progress === 100 ? "#22c55e" : "var(--primary)",
                      }} />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1 border-t" style={{ borderColor: "var(--border)" }}>
                    <span className="inline-flex items-center gap-1" style={{ color: "var(--muted-foreground)" }}>
                      <Calendar className="h-3 w-3" /> {p.end}
                    </span>
                    <span className="inline-flex items-center gap-1" style={{ color: "var(--muted-foreground)" }}>
                      <Users className="h-3 w-3" /> {p.tasks} open tasks
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
