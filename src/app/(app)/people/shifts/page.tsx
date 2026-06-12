"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { CalendarClock, ChevronLeft, ChevronRight, Plus, Eye, List, Grid } from "lucide-react"
import { useRouter } from "next/navigation"
import { getInitials } from "@/lib/utils"

const depts: Record<string, string> = {
  Engineering: "#dbeafe",
  Marketing: "#fce7f3",
  HR: "#dcfce7",
  Finance: "#fef3c7",
  Operations: "#ede9fe",
  Sales: "#fee2e2",
}
const deptText: Record<string, string> = {
  Engineering: "#1d4ed8",
  Marketing: "#be185d",
  HR: "#16a34a",
  Finance: "#d97706",
  Operations: "#7c3aed",
  Sales: "#dc2626",
}

const employees = [
  { id: "e1", name: "Alex Turner", dept: "Engineering", shifts: ["09:00–17:00", "09:00–17:00", "Off", "09:00–17:00", "09:00–17:00", "Off", "Off"] },
  { id: "e2", name: "Priya Sharma", dept: "Engineering", shifts: ["10:00–18:00", "10:00–18:00", "10:00–18:00", "Off", "10:00–18:00", "Off", "Off"] },
  { id: "e3", name: "Marcus Webb", dept: "Marketing", shifts: ["09:00–17:00", "Off", "09:00–17:00", "09:00–17:00", "09:00–17:00", "Off", "Off"] },
  { id: "e4", name: "Claire Fontaine", dept: "Marketing", shifts: ["08:00–16:00", "08:00–16:00", "08:00–16:00", "08:00–16:00", "Off", "Off", "Off"] },
  { id: "e5", name: "James Osei", dept: "HR", shifts: ["09:00–17:00", "09:00–17:00", "09:00–17:00", "09:00–17:00", "09:00–17:00", "Off", "Off"] },
  { id: "e6", name: "Sophie Reid", dept: "HR", shifts: ["Off", "10:00–18:00", "10:00–18:00", "10:00–18:00", "10:00–18:00", "Off", "Off"] },
  { id: "e7", name: "David Chen", dept: "Finance", shifts: ["09:00–17:30", "09:00–17:30", "Off", "09:00–17:30", "09:00–17:30", "Off", "Off"] },
  { id: "e8", name: "Natalie Brooks", dept: "Finance", shifts: ["08:30–16:30", "08:30–16:30", "08:30–16:30", "Off", "08:30–16:30", "Off", "Off"] },
  { id: "e9", name: "Liam Carter", dept: "Operations", shifts: ["06:00–14:00", "06:00–14:00", "06:00–14:00", "06:00–14:00", "06:00–14:00", "06:00–14:00", "Off"] },
  { id: "e10", name: "Fatima Al-Hassan", dept: "Operations", shifts: ["14:00–22:00", "14:00–22:00", "14:00–22:00", "14:00–22:00", "14:00–22:00", "Off", "Off"] },
  { id: "e11", name: "Oliver Penn", dept: "Sales", shifts: ["09:00–17:00", "09:00–17:00", "09:00–17:00", "09:00–17:00", "09:00–17:00", "Off", "Off"] },
  { id: "e12", name: "Isla McGregor", dept: "Sales", shifts: ["Off", "09:00–17:00", "09:00–17:00", "09:00–17:00", "09:00–17:00", "09:00–14:00", "Off"] },
  { id: "e13", name: "Raj Patel", dept: "Engineering", shifts: ["10:00–18:00", "Off", "10:00–18:00", "10:00–18:00", "10:00–18:00", "Off", "Off"] },
  { id: "e14", name: "Grace Ellington", dept: "Marketing", shifts: ["09:00–17:00", "09:00–17:00", "09:00–17:00", "Off", "09:00–17:00", "Off", "Off"] },
  { id: "e15", name: "Tom Blackwood", dept: "Operations", shifts: ["22:00–06:00", "22:00–06:00", "Off", "22:00–06:00", "22:00–06:00", "Off", "Off"] },
]

const openShifts = [
  { id: "os1", role: "Warehouse Operative", dept: "Operations", day: "Wednesday", time: "06:00–14:00", location: "Depot B" },
  { id: "os2", role: "Customer Support Agent", dept: "Sales", day: "Saturday", time: "09:00–17:00", location: "Office 3" },
  { id: "os3", role: "Night Security", dept: "Operations", day: "Thursday", time: "22:00–06:00", location: "Main Site" },
]

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

export default function ShiftsPage() {
  const router = useRouter()
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [weekOffset, setWeekOffset] = useState(0)

  const baseDate = new Date("2026-06-08")
  baseDate.setDate(baseDate.getDate() + weekOffset * 7)
  const weekStart = new Date(baseDate)
  const weekEnd = new Date(baseDate)
  weekEnd.setDate(weekEnd.getDate() + 6)
  const weekLabel = `${weekStart.toLocaleDateString("en-GB", { day: "2-digit", month: "short" })} – ${weekEnd.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}`

  const totalShifts = employees.reduce((acc, e) => acc + e.shifts.filter(s => s !== "Off").length, 0)
  const totalHours = employees.reduce((acc, e) => {
    return acc + e.shifts.filter(s => s !== "Off").reduce((h, s) => {
      const [start, end] = s.split("–").map(t => { const [hh, mm] = t.split(":").map(Number); return hh + mm / 60 })
      let diff = end - start
      if (diff < 0) diff += 24
      return h + diff
    }, 0)
  }, 0)

  return (
    <div className="p-6" style={{ background: "var(--background)", minHeight: "100vh" }}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div style={{ background: "var(--primary)", borderRadius: "10px", padding: "8px" }}>
            <CalendarClock size={22} style={{ color: "#fff" }} />
          </div>
          <div>
            <h1 className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>Shifts & Rota</h1>
            <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>Weekly shift scheduling and rota management</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" style={{ borderColor: "var(--border)", color: "var(--foreground)" }}>
            Publish Rota
          </Button>
          <Button style={{ background: "var(--primary)", color: "#fff" }}>
            <Plus size={16} className="mr-2" /> Create Shift
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Shifts This Week", value: totalShifts.toString(), color: "#1a56db" },
          { label: "Hours Scheduled", value: Math.round(totalHours).toString(), color: "#06b6d4" },
          { label: "Open Shifts (Unfilled)", value: openShifts.length.toString(), color: "#dc2626" },
          { label: "Overtime Hours", value: "14", color: "#d97706" },
        ].map(s => (
          <div key={s.label} className="rounded-xl border p-4" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
            <p className="text-xs font-medium mb-1" style={{ color: "var(--muted-foreground)" }}>{s.label}</p>
            <p className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border mb-6" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
        <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: "var(--border)" }}>
          <div className="flex items-center gap-3">
            <button onClick={() => setWeekOffset(w => w - 1)} className="p-1.5 rounded-md" style={{ color: "var(--muted-foreground)", border: "1px solid var(--border)" }}>
              <ChevronLeft size={16} />
            </button>
            <span className="font-medium text-sm" style={{ color: "var(--foreground)" }}>{weekLabel}</span>
            <button onClick={() => setWeekOffset(w => w + 1)} className="p-1.5 rounded-md" style={{ color: "var(--muted-foreground)", border: "1px solid var(--border)" }}>
              <ChevronRight size={16} />
            </button>
            {weekOffset !== 0 && (
              <button onClick={() => setWeekOffset(0)} className="text-xs px-2 py-1 rounded-md" style={{ background: "var(--secondary)", color: "var(--foreground)" }}>Today</button>
            )}
          </div>
          <div className="flex gap-1">
            <button onClick={() => setViewMode("grid")} className="p-1.5 rounded-md" style={{ background: viewMode === "grid" ? "var(--primary)" : "transparent", color: viewMode === "grid" ? "#fff" : "var(--muted-foreground)" }}>
              <Grid size={16} />
            </button>
            <button onClick={() => setViewMode("list")} className="p-1.5 rounded-md" style={{ background: viewMode === "list" ? "var(--primary)" : "transparent", color: viewMode === "list" ? "#fff" : "var(--muted-foreground)" }}>
              <List size={16} />
            </button>
          </div>
        </div>

        {viewMode === "grid" && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border)" }}>
                  <th className="text-left px-4 py-3 font-medium w-44" style={{ color: "var(--muted-foreground)" }}>Employee</th>
                  {days.map(d => (
                    <th key={d} className="text-center px-2 py-3 font-medium" style={{ color: "var(--muted-foreground)" }}>{d}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {employees.map((emp, i) => (
                  <tr key={emp.id} style={{ borderBottom: i < employees.length - 1 ? "1px solid var(--border)" : "none" }}>
                    <td className="px-4 py-2.5">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold text-white shrink-0" style={{ background: deptText[emp.dept] ?? "#475569" }}>
                          {getInitials(emp.name)}
                        </div>
                        <div>
                          <p className="text-xs font-medium" style={{ color: "var(--foreground)" }}>{emp.name}</p>
                          <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>{emp.dept}</p>
                        </div>
                      </div>
                    </td>
                    {emp.shifts.map((shift, dayIdx) => (
                      <td key={dayIdx} className="px-1 py-2.5 text-center">
                        {shift === "Off" ? (
                          <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>Off</span>
                        ) : (
                          <span className="text-xs px-1.5 py-0.5 rounded font-medium block text-center"
                            style={{ backgroundColor: depts[emp.dept] ?? "#f1f5f9", color: deptText[emp.dept] ?? "#475569" }}>
                            {shift}
                          </span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {viewMode === "list" && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border)" }}>
                  {["Employee", "Department", "Day", "Shift Time", "Hours", "Actions"].map(h => (
                    <th key={h} className="text-left px-4 py-3 font-medium" style={{ color: "var(--muted-foreground)" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {employees.flatMap((emp) =>
                  emp.shifts.map((shift, dayIdx) => ({ emp, shift, dayIdx }))
                ).filter(({ shift }) => shift !== "Off").map(({ emp, shift, dayIdx }, i, arr) => {
                  const [start, end] = shift.split("–").map(t => { const [hh, mm] = t.split(":").map(Number); return hh + mm / 60 })
                  let hours = end - start
                  if (hours < 0) hours += 24
                  return (
                    <tr key={`${emp.id}-${dayIdx}`} style={{ borderBottom: i < arr.length - 1 ? "1px solid var(--border)" : "none" }}>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold text-white" style={{ background: deptText[emp.dept] ?? "#475569" }}>
                            {getInitials(emp.name)}
                          </div>
                          <span className="font-medium" style={{ color: "var(--foreground)" }}>{emp.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: depts[emp.dept], color: deptText[emp.dept] }}>{emp.dept}</span>
                      </td>
                      <td className="px-4 py-3" style={{ color: "var(--foreground)" }}>{days[dayIdx]}</td>
                      <td className="px-4 py-3" style={{ color: "var(--foreground)" }}>{shift}</td>
                      <td className="px-4 py-3" style={{ color: "var(--muted-foreground)" }}>{hours.toFixed(1)}h</td>
                      <td className="px-4 py-3">
                        <button className="p-1.5 rounded-md" style={{ color: "var(--muted-foreground)" }} onClick={() => router.push(`/app/people/shifts/${emp.id}-${dayIdx}`)}>
                          <Eye size={15} />
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="rounded-xl border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
        <div className="p-4 border-b flex items-center justify-between" style={{ borderColor: "var(--border)" }}>
          <h3 className="font-semibold" style={{ color: "var(--foreground)" }}>Open Shifts — Needs Filling</h3>
          <span style={{ backgroundColor: "#fee2e2", color: "#dc2626", padding: "2px 8px", borderRadius: "9999px", fontSize: "12px", fontWeight: 500 }}>
            {openShifts.length} unfilled
          </span>
        </div>
        <div className="divide-y" style={{ borderColor: "var(--border)" }}>
          {openShifts.map(s => (
            <div key={s.id} className="p-4 flex items-center justify-between">
              <div>
                <p className="font-medium text-sm" style={{ color: "var(--foreground)" }}>{s.role}</p>
                <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>{s.day} · {s.time} · {s.location}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: depts[s.dept] ?? "#f1f5f9", color: deptText[s.dept] ?? "#475569" }}>{s.dept}</span>
                <Button size="sm" style={{ background: "var(--primary)", color: "#fff" }}>Assign</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
