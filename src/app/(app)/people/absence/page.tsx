"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UserMinus, Search, Plus, Eye, Edit2, Info, CheckCircle2, XCircle } from "lucide-react"
import { formatDate, getInitials } from "@/lib/utils"

const absences = [
  { id: "ab1", employee: "Alex Turner", dept: "Engineering", type: "Sick", startDate: "2026-06-09", endDate: "2026-06-10", days: 2, selfCertified: true, managerApproved: true, rtwDone: false },
  { id: "ab2", employee: "Sophie Reid", dept: "HR", type: "Compassionate", startDate: "2026-06-05", endDate: "2026-06-07", days: 3, selfCertified: false, managerApproved: true, rtwDone: true },
  { id: "ab3", employee: "Marcus Webb", dept: "Marketing", type: "Unauthorised", startDate: "2026-06-08", endDate: "2026-06-08", days: 1, selfCertified: false, managerApproved: false, rtwDone: false },
  { id: "ab4", employee: "Tom Blackwood", dept: "Operations", type: "Sick", startDate: "2026-06-01", endDate: "2026-06-06", days: 5, selfCertified: true, managerApproved: true, rtwDone: true },
  { id: "ab5", employee: "Natalie Brooks", dept: "Finance", type: "Holiday", startDate: "2026-06-15", endDate: "2026-06-26", days: 10, selfCertified: false, managerApproved: true, rtwDone: false },
  { id: "ab6", employee: "Raj Patel", dept: "Engineering", type: "Sick", startDate: "2026-05-27", endDate: "2026-05-29", days: 3, selfCertified: true, managerApproved: true, rtwDone: true },
  { id: "ab7", employee: "Grace Ellington", dept: "Marketing", type: "Sick", startDate: "2026-05-20", endDate: "2026-05-21", days: 2, selfCertified: false, managerApproved: false, rtwDone: false },
  { id: "ab8", employee: "Liam Carter", dept: "Operations", type: "Unauthorised", startDate: "2026-05-18", endDate: "2026-05-18", days: 1, selfCertified: false, managerApproved: false, rtwDone: false },
  { id: "ab9", employee: "David Chen", dept: "Finance", type: "Compassionate", startDate: "2026-05-12", endDate: "2026-05-14", days: 3, selfCertified: false, managerApproved: true, rtwDone: true },
  { id: "ab10", employee: "Isla McGregor", dept: "Sales", type: "Sick", startDate: "2026-05-10", endDate: "2026-05-13", days: 4, selfCertified: true, managerApproved: true, rtwDone: true },
  { id: "ab11", employee: "Oliver Penn", dept: "Sales", type: "Other", startDate: "2026-05-05", endDate: "2026-05-06", days: 2, selfCertified: false, managerApproved: true, rtwDone: true },
  { id: "ab12", employee: "Fatima Al-Hassan", dept: "Operations", type: "Sick", startDate: "2026-04-28", endDate: "2026-04-30", days: 3, selfCertified: true, managerApproved: true, rtwDone: true },
  { id: "ab13", employee: "James Osei", dept: "HR", type: "Holiday", startDate: "2026-04-20", endDate: "2026-04-25", days: 5, selfCertified: false, managerApproved: true, rtwDone: false },
  { id: "ab14", employee: "Priya Sharma", dept: "Engineering", type: "Sick", startDate: "2026-04-14", endDate: "2026-04-14", days: 1, selfCertified: true, managerApproved: true, rtwDone: true },
  { id: "ab15", employee: "Claire Fontaine", dept: "Marketing", type: "Compassionate", startDate: "2026-04-07", endDate: "2026-04-09", days: 3, selfCertified: false, managerApproved: true, rtwDone: true },
]

const typeBadge = (type: string) => {
  const map: Record<string, { bg: string; color: string }> = {
    Sick: { bg: "#fee2e2", color: "#dc2626" },
    Unauthorised: { bg: "#fce7f3", color: "#be185d" },
    Compassionate: { bg: "#dbeafe", color: "#1d4ed8" },
    Holiday: { bg: "#dcfce7", color: "#16a34a" },
    Other: { bg: "#f1f5f9", color: "#475569" },
  }
  const s = map[type] ?? map["Other"]
  return (
    <span style={{ backgroundColor: s.bg, color: s.color, padding: "2px 8px", borderRadius: "9999px", fontSize: "12px", fontWeight: 500 }}>
      {type}
    </span>
  )
}

const BoolIcon = ({ v }: { v: boolean }) =>
  v ? <CheckCircle2 size={16} style={{ color: "#16a34a" }} /> : <XCircle size={16} style={{ color: "#dc2626" }} />

export default function AbsencePage() {
  const [search, setSearch] = useState("")
  const [deptFilter, setDeptFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  const filtered = absences.filter(a => {
    const matchSearch = a.employee.toLowerCase().includes(search.toLowerCase())
    const matchDept = deptFilter === "all" || a.dept.toLowerCase() === deptFilter.toLowerCase()
    const matchType = typeFilter === "all" || a.type.toLowerCase() === typeFilter.toLowerCase()
    return matchSearch && matchDept && matchType
  })

  const currentlyAbsent = absences.filter(a => {
    const now = new Date("2026-06-11")
    return new Date(a.startDate) <= now && (!a.endDate || new Date(a.endDate) >= now)
  }).length
  const uncertified = absences.filter(a => !a.selfCertified).length
  const totalDays = absences.reduce((s, a) => s + a.days, 0)
  const absenceRate = ((totalDays / (absences.length * 30)) * 100).toFixed(1)

  return (
    <div className="p-6" style={{ background: "var(--background)", minHeight: "100vh" }}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div style={{ background: "var(--primary)", borderRadius: "10px", padding: "8px" }}>
            <UserMinus size={22} style={{ color: "#fff" }} />
          </div>
          <div>
            <h1 className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>Absence Management</h1>
            <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>Track, manage and report on employee absences</p>
          </div>
        </div>
        <Button style={{ background: "var(--primary)", color: "#fff" }}>
          <Plus size={16} className="mr-2" /> Record Absence
        </Button>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="rounded-xl border p-4" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
          <p className="text-xs font-medium mb-1" style={{ color: "var(--muted-foreground)" }}>Currently Absent</p>
          <p className="text-2xl font-bold" style={{ color: "#dc2626" }}>{currentlyAbsent}</p>
        </div>
        <div className="rounded-xl border p-4" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
          <div className="flex items-center gap-1 mb-1">
            <p className="text-xs font-medium" style={{ color: "var(--muted-foreground)" }}>Bradford Factor Avg</p>
            <span title="Bradford Factor = (number of spells)² × total days. Higher scores indicate patterns of short-term absence." style={{ cursor: "help" }}>
              <Info size={12} style={{ color: "var(--muted-foreground)" }} />
            </span>
          </div>
          <p className="text-2xl font-bold" style={{ color: "#d97706" }}>42</p>
        </div>
        <div className="rounded-xl border p-4" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
          <p className="text-xs font-medium mb-1" style={{ color: "var(--muted-foreground)" }}>Absence Rate %</p>
          <p className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>{absenceRate}%</p>
        </div>
        <div className="rounded-xl border p-4" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
          <p className="text-xs font-medium mb-1" style={{ color: "var(--muted-foreground)" }}>Uncertified Days</p>
          <p className="text-2xl font-bold" style={{ color: "#be185d" }}>{uncertified}</p>
        </div>
      </div>

      <div className="rounded-xl border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
        <div className="p-4 flex gap-3 flex-wrap border-b" style={{ borderColor: "var(--border)" }}>
          <div className="relative flex-1 min-w-[180px]">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--muted-foreground)" }} />
            <Input placeholder="Search employee..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9 h-9" style={{ background: "var(--background)", borderColor: "var(--border)", color: "var(--foreground)" }} />
          </div>
          <Select value={deptFilter} onValueChange={setDeptFilter}>
            <SelectTrigger className="w-40 h-9" style={{ background: "var(--background)", borderColor: "var(--border)", color: "var(--foreground)" }}>
              <SelectValue placeholder="Department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              <SelectItem value="engineering">Engineering</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
              <SelectItem value="hr">HR</SelectItem>
              <SelectItem value="finance">Finance</SelectItem>
              <SelectItem value="operations">Operations</SelectItem>
              <SelectItem value="sales">Sales</SelectItem>
            </SelectContent>
          </Select>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-40 h-9" style={{ background: "var(--background)", borderColor: "var(--border)", color: "var(--foreground)" }}>
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="sick">Sick</SelectItem>
              <SelectItem value="unauthorised">Unauthorised</SelectItem>
              <SelectItem value="compassionate">Compassionate</SelectItem>
              <SelectItem value="holiday">Holiday</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                {["Employee", "Dept", "Type", "Start Date", "End Date", "Days", "Self-Cert", "Mgr Approved", "RTW Done", "Actions"].map(h => (
                  <th key={h} className="text-left px-4 py-3 font-medium whitespace-nowrap" style={{ color: "var(--muted-foreground)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((a, i) => (
                <tr key={a.id} style={{ borderBottom: i < filtered.length - 1 ? "1px solid var(--border)" : "none" }}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold text-white shrink-0" style={{ background: "var(--primary)" }}>
                        {getInitials(a.employee)}
                      </div>
                      <span className="font-medium" style={{ color: "var(--foreground)" }}>{a.employee}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3" style={{ color: "var(--muted-foreground)" }}>{a.dept}</td>
                  <td className="px-4 py-3">{typeBadge(a.type)}</td>
                  <td className="px-4 py-3" style={{ color: "var(--foreground)" }}>{formatDate(a.startDate)}</td>
                  <td className="px-4 py-3" style={{ color: "var(--foreground)" }}>{formatDate(a.endDate)}</td>
                  <td className="px-4 py-3 font-semibold" style={{ color: "var(--foreground)" }}>{a.days}</td>
                  <td className="px-4 py-3"><BoolIcon v={a.selfCertified} /></td>
                  <td className="px-4 py-3"><BoolIcon v={a.managerApproved} /></td>
                  <td className="px-4 py-3"><BoolIcon v={a.rtwDone} /></td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button className="p-1.5 rounded-md" style={{ color: "var(--muted-foreground)" }}><Eye size={14} /></button>
                      <button className="p-1.5 rounded-md" style={{ color: "var(--muted-foreground)" }}><Edit2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t" style={{ borderColor: "var(--border)" }}>
          <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>{filtered.length} record{filtered.length !== 1 ? "s" : ""} shown</p>
        </div>
      </div>
    </div>
  )
}
