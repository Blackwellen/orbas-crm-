"use client"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid } from "recharts"
import { Users2, TrendingUp, Briefcase, Clock, AlertTriangle } from "lucide-react"

const deptHeadcount = [
  { dept: "Engineering", count: 48 },
  { dept: "Sales", count: 37 },
  { dept: "Operations", count: 34 },
  { dept: "Marketing", count: 28 },
  { dept: "Finance", count: 24 },
  { dept: "HR", count: 18 },
  { dept: "Service", count: 31 },
  { dept: "Compliance", count: 12 },
  { dept: "IT", count: 15 },
]

const headcountTrend = [
  { month: "Jul '25", headcount: 220 },
  { month: "Aug '25", headcount: 224 },
  { month: "Sep '25", headcount: 229 },
  { month: "Oct '25", headcount: 231 },
  { month: "Nov '25", headcount: 235 },
  { month: "Dec '25", headcount: 234 },
  { month: "Jan '26", headcount: 238 },
  { month: "Feb '26", headcount: 241 },
  { month: "Mar '26", headcount: 243 },
  { month: "Apr '26", headcount: 244 },
  { month: "May '26", headcount: 246 },
  { month: "Jun '26", headcount: 247 },
]

const skillsGap = [
  { skill: "Cloud Architecture", required: 12, have: 7, gap: 5 },
  { skill: "Data Engineering", required: 8, have: 4, gap: 4 },
  { skill: "Cybersecurity", required: 6, have: 3, gap: 3 },
  { skill: "Product Management", required: 5, have: 3, gap: 2 },
  { skill: "UX / Design", required: 7, have: 5, gap: 2 },
  { skill: "DevOps / SRE", required: 9, have: 6, gap: 3 },
  { skill: "AI / ML", required: 4, have: 1, gap: 3 },
  { skill: "Compliance & Risk", required: 6, have: 5, gap: 1 },
]

const successionPlan = [
  { role: "CTO", incumbent: "Howard Blake", primarySuccessor: "Alice Ng", secondarySuccessor: "Raj Patel", readiness: "Ready" },
  { role: "Head of Sales", incumbent: "Sandra Kim", primarySuccessor: "Oliver Penn", secondarySuccessor: "Claire Fontaine", readiness: "6–12 Months" },
  { role: "Head of Finance", incumbent: "David Chen", primarySuccessor: "Natalie Brooks", secondarySuccessor: "James Osei", readiness: "12–24 Months" },
  { role: "VP Operations", incumbent: "Liam Carter", primarySuccessor: "Fatima Al-Hassan", secondarySuccessor: "Tom Blackwood", readiness: "Ready" },
  { role: "Head of People", incumbent: "Sophie Reid", primarySuccessor: "Grace Ellington", secondarySuccessor: "Marcus Webb", readiness: "6–12 Months" },
]

const hiringPlan = [
  { role: "Senior Cloud Engineer", dept: "Engineering", priority: "Critical", target: "2026-07-01", status: "Interviewing" },
  { role: "ML Engineer", dept: "Engineering", priority: "Critical", target: "2026-07-15", status: "Sourcing" },
  { role: "Account Executive", dept: "Sales", priority: "High", target: "2026-08-01", status: "Offer Stage" },
  { role: "DevOps Engineer", dept: "Engineering", priority: "High", target: "2026-08-15", status: "Interviewing" },
  { role: "Product Manager", dept: "Product", priority: "High", target: "2026-09-01", status: "Sourcing" },
  { role: "Data Analyst", dept: "Finance", priority: "Medium", target: "2026-09-15", status: "Not Started" },
  { role: "UX Designer", dept: "Design", priority: "Medium", target: "2026-10-01", status: "Sourcing" },
  { role: "Compliance Officer", dept: "Compliance", priority: "Medium", target: "2026-10-15", status: "Not Started" },
]

const priorityBadge = (p: string) => {
  const map: Record<string, { bg: string; color: string }> = {
    Critical: { bg: "#fee2e2", color: "#dc2626" },
    High: { bg: "#fef3c7", color: "#d97706" },
    Medium: { bg: "#dbeafe", color: "#1d4ed8" },
  }
  const s = map[p] ?? { bg: "#f1f5f9", color: "#475569" }
  return <span style={{ backgroundColor: s.bg, color: s.color, padding: "2px 8px", borderRadius: "9999px", fontSize: "12px", fontWeight: 500 }}>{p}</span>
}

const statusBadge = (s: string) => {
  const map: Record<string, { bg: string; color: string }> = {
    Interviewing: { bg: "#dbeafe", color: "#1d4ed8" },
    Sourcing: { bg: "#fef3c7", color: "#d97706" },
    "Offer Stage": { bg: "#dcfce7", color: "#16a34a" },
    "Not Started": { bg: "#f1f5f9", color: "#475569" },
  }
  const c = map[s] ?? { bg: "#f1f5f9", color: "#475569" }
  return <span style={{ backgroundColor: c.bg, color: c.color, padding: "2px 8px", borderRadius: "9999px", fontSize: "12px", fontWeight: 500 }}>{s}</span>
}

const readinessBadge = (r: string) => {
  const map: Record<string, { bg: string; color: string }> = {
    Ready: { bg: "#dcfce7", color: "#16a34a" },
    "6–12 Months": { bg: "#fef3c7", color: "#d97706" },
    "12–24 Months": { bg: "#fee2e2", color: "#dc2626" },
  }
  const s = map[r] ?? { bg: "#f1f5f9", color: "#475569" }
  return <span style={{ backgroundColor: s.bg, color: s.color, padding: "2px 8px", borderRadius: "9999px", fontSize: "12px", fontWeight: 500 }}>{r}</span>
}

export default function WorkforcePlanningPage() {
  return (
    <div className="p-6" style={{ background: "var(--background)", minHeight: "100vh" }}>
      <div className="flex items-center gap-3 mb-6">
        <div style={{ background: "var(--primary)", borderRadius: "10px", padding: "8px" }}>
          <Users2 size={22} style={{ color: "#fff" }} />
        </div>
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>Workforce Planning</h1>
          <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>Strategic headcount, skills, and succession management</p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: "Headcount", value: "247", icon: Users2, color: "#1a56db" },
          { label: "Open Roles", value: "18", icon: Briefcase, color: "#d97706" },
          { label: "Avg Tenure", value: "3.4 yrs", icon: Clock, color: "#06b6d4" },
          { label: "Turnover Rate", value: "8.2%", icon: TrendingUp, color: "#dc2626" },
        ].map(s => (
          <div key={s.label} className="rounded-xl border p-4" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
            <p className="text-xs font-medium mb-1" style={{ color: "var(--muted-foreground)" }}>{s.label}</p>
            <p className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-5 mb-5">
        <div className="rounded-xl border p-5" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
          <h3 className="font-semibold mb-4" style={{ color: "var(--foreground)" }}>Headcount by Department</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={deptHeadcount} layout="vertical" margin={{ left: 12, right: 12 }}>
              <XAxis type="number" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <YAxis dataKey="dept" type="category" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} width={90} />
              <Tooltip
                contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px", fontSize: "12px" }}
                formatter={(v: any, name: any) => [v, "Headcount"]}
              />
              <Bar dataKey="count" fill="#1a56db" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-xl border p-5" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
          <h3 className="font-semibold mb-4" style={{ color: "var(--foreground)" }}>Headcount Trend (12 Months)</h3>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={headcountTrend} margin={{ left: 0, right: 12 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <YAxis domain={[210, 255]} tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px", fontSize: "12px" }}
                formatter={(v: any, name: any) => [v, "Headcount"]}
              />
              <Line type="monotone" dataKey="headcount" stroke="#06b6d4" strokeWidth={2} dot={{ r: 3, fill: "#06b6d4" }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-5 mb-5">
        <div className="rounded-xl border overflow-hidden" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
          <div className="p-4 border-b flex items-center gap-2" style={{ borderColor: "var(--border)" }}>
            <AlertTriangle size={16} style={{ color: "#d97706" }} />
            <h3 className="font-semibold" style={{ color: "var(--foreground)" }}>Skills Gap Analysis</h3>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                {["Skill", "Required", "Have", "Gap"].map(h => (
                  <th key={h} className="text-left px-4 py-2.5 font-medium" style={{ color: "var(--muted-foreground)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {skillsGap.map((s, i) => (
                <tr key={s.skill} style={{ borderBottom: i < skillsGap.length - 1 ? "1px solid var(--border)" : "none" }}>
                  <td className="px-4 py-2.5 font-medium" style={{ color: "var(--foreground)" }}>{s.skill}</td>
                  <td className="px-4 py-2.5" style={{ color: "var(--muted-foreground)" }}>{s.required}</td>
                  <td className="px-4 py-2.5" style={{ color: "var(--muted-foreground)" }}>{s.have}</td>
                  <td className="px-4 py-2.5">
                    <span style={{ backgroundColor: s.gap >= 4 ? "#fee2e2" : s.gap >= 2 ? "#fef3c7" : "#dcfce7", color: s.gap >= 4 ? "#dc2626" : s.gap >= 2 ? "#d97706" : "#16a34a", padding: "2px 8px", borderRadius: "9999px", fontSize: "12px", fontWeight: 600 }}>
                      -{s.gap}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="rounded-xl border overflow-hidden" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
          <div className="p-4 border-b" style={{ borderColor: "var(--border)" }}>
            <h3 className="font-semibold" style={{ color: "var(--foreground)" }}>Succession Planning</h3>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                {["Role", "Incumbent", "Primary", "Secondary", "Readiness"].map(h => (
                  <th key={h} className="text-left px-4 py-2.5 font-medium" style={{ color: "var(--muted-foreground)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {successionPlan.map((s, i) => (
                <tr key={s.role} style={{ borderBottom: i < successionPlan.length - 1 ? "1px solid var(--border)" : "none" }}>
                  <td className="px-4 py-2.5 font-medium" style={{ color: "var(--foreground)" }}>{s.role}</td>
                  <td className="px-4 py-2.5" style={{ color: "var(--muted-foreground)" }}>{s.incumbent}</td>
                  <td className="px-4 py-2.5" style={{ color: "var(--foreground)" }}>{s.primarySuccessor}</td>
                  <td className="px-4 py-2.5" style={{ color: "var(--muted-foreground)" }}>{s.secondarySuccessor}</td>
                  <td className="px-4 py-2.5">{readinessBadge(s.readiness)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-xl border overflow-hidden" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
        <div className="p-4 border-b" style={{ borderColor: "var(--border)" }}>
          <h3 className="font-semibold" style={{ color: "var(--foreground)" }}>Hiring Plan</h3>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: "1px solid var(--border)" }}>
              {["Role", "Department", "Priority", "Target Start", "Status"].map(h => (
                <th key={h} className="text-left px-4 py-3 font-medium" style={{ color: "var(--muted-foreground)" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {hiringPlan.map((h, i) => (
              <tr key={h.role} style={{ borderBottom: i < hiringPlan.length - 1 ? "1px solid var(--border)" : "none" }}>
                <td className="px-4 py-3 font-medium" style={{ color: "var(--foreground)" }}>{h.role}</td>
                <td className="px-4 py-3" style={{ color: "var(--muted-foreground)" }}>{h.dept}</td>
                <td className="px-4 py-3">{priorityBadge(h.priority)}</td>
                <td className="px-4 py-3" style={{ color: "var(--muted-foreground)" }}>{h.target}</td>
                <td className="px-4 py-3">{statusBadge(h.status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
