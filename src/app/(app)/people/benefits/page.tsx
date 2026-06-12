"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { HeartPulse, Plus, Search, Edit2, Trash2, Users } from "lucide-react"
import { formatCurrency, formatDate, getInitials } from "@/lib/utils"

const benefitsCatalog = [
  { id: "b1", name: "Health Insurance", icon: "🏥", enrolled: 198, monthlyCost: 45, totalCost: 8910, enrollment: "Open", description: "Comprehensive health cover including GP, specialist, and hospital" },
  { id: "b2", name: "Dental Cover", icon: "🦷", enrolled: 156, monthlyCost: 12, totalCost: 1872, enrollment: "Open", description: "Annual dental check-ups, fillings, and orthodontic allowance" },
  { id: "b3", name: "Pension (5% Match)", icon: "🏦", enrolled: 247, monthlyCost: 0, totalCost: 18200, enrollment: "Auto-enroll", description: "Workplace pension with 5% employer contribution match" },
  { id: "b4", name: "Life Insurance", icon: "🛡️", enrolled: 247, monthlyCost: 8, totalCost: 1976, enrollment: "Auto-enroll", description: "4x annual salary death-in-service benefit" },
  { id: "b5", name: "Cycle to Work", icon: "🚲", enrolled: 34, monthlyCost: 0, totalCost: 0, enrollment: "On Request", description: "Tax-efficient scheme for bicycle purchase up to £2,500" },
  { id: "b6", name: "Season Ticket Loan", icon: "🚇", enrolled: 89, monthlyCost: 0, totalCost: 0, enrollment: "On Request", description: "Interest-free loan for annual travel pass" },
  { id: "b7", name: "EAP", icon: "🧠", enrolled: 247, monthlyCost: 5, totalCost: 1235, enrollment: "Auto-enroll", description: "Employee Assistance Programme — counselling and mental health support" },
  { id: "b8", name: "Private Medical", icon: "💊", enrolled: 112, monthlyCost: 85, totalCost: 9520, enrollment: "Open", description: "Private medical insurance with no waiting list and family add-on option" },
]

const enrollments = [
  { id: "en1", employee: "Alex Turner", plan: "Health Insurance", monthlyCost: 45, startDate: "2024-01-01", status: "Active" },
  { id: "en2", employee: "Priya Sharma", plan: "Health Insurance", monthlyCost: 45, startDate: "2024-03-01", status: "Active" },
  { id: "en3", employee: "Marcus Webb", plan: "Private Medical", monthlyCost: 85, startDate: "2025-01-01", status: "Active" },
  { id: "en4", employee: "Claire Fontaine", plan: "Dental Cover", monthlyCost: 12, startDate: "2024-06-01", status: "Active" },
  { id: "en5", employee: "James Osei", plan: "Pension (5% Match)", monthlyCost: 0, startDate: "2023-11-01", status: "Active" },
  { id: "en6", employee: "Sophie Reid", plan: "Health Insurance", monthlyCost: 45, startDate: "2026-01-01", status: "Pending" },
  { id: "en7", employee: "David Chen", plan: "Private Medical", monthlyCost: 85, startDate: "2025-04-01", status: "Active" },
  { id: "en8", employee: "Natalie Brooks", plan: "Cycle to Work", monthlyCost: 0, startDate: "2025-09-01", status: "Active" },
  { id: "en9", employee: "Liam Carter", plan: "Season Ticket Loan", monthlyCost: 0, startDate: "2024-02-01", status: "Active" },
  { id: "en10", employee: "Fatima Al-Hassan", plan: "EAP", monthlyCost: 5, startDate: "2023-06-01", status: "Active" },
  { id: "en11", employee: "Oliver Penn", plan: "Dental Cover", monthlyCost: 12, startDate: "2026-02-01", status: "Pending" },
  { id: "en12", employee: "Isla McGregor", plan: "Health Insurance", monthlyCost: 45, startDate: "2024-11-01", status: "Active" },
  { id: "en13", employee: "Raj Patel", plan: "Life Insurance", monthlyCost: 8, startDate: "2025-01-01", status: "Active" },
  { id: "en14", employee: "Grace Ellington", plan: "Health Insurance", monthlyCost: 45, startDate: "2025-07-01", status: "Cancelled" },
  { id: "en15", employee: "Tom Blackwood", plan: "Private Medical", monthlyCost: 85, startDate: "2024-08-01", status: "Active" },
]

function statusBadge(status: string) {
  const map: Record<string, { bg: string; color: string }> = {
    Active: { bg: "#dcfce7", color: "#16a34a" },
    Pending: { bg: "#fef3c7", color: "#d97706" },
    Cancelled: { bg: "#fee2e2", color: "#dc2626" },
  }
  const s = map[status] ?? map["Cancelled"]
  return (
    <span style={{ backgroundColor: s.bg, color: s.color, padding: "2px 8px", borderRadius: "9999px", fontSize: "12px", fontWeight: 500 }}>
      {status}
    </span>
  )
}

export default function BenefitsPage() {
  const [search, setSearch] = useState("")

  const filtered = enrollments.filter(e =>
    e.employee.toLowerCase().includes(search.toLowerCase()) ||
    e.plan.toLowerCase().includes(search.toLowerCase())
  )

  const totalMonthlyCost = enrollments.filter(e => e.status === "Active").reduce((a, b) => a + b.monthlyCost, 0)
  const enrolledCount = new Set(enrollments.filter(e => e.status === "Active").map(e => e.employee)).size
  const avgBenefits = (enrollments.filter(e => e.status === "Active").length / enrolledCount).toFixed(1)

  return (
    <div className="p-6" style={{ background: "var(--background)", minHeight: "100vh" }}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div style={{ background: "var(--primary)", borderRadius: "10px", padding: "8px" }}>
            <HeartPulse size={22} style={{ color: "#fff" }} />
          </div>
          <div>
            <h1 className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>Benefits</h1>
            <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>Employee benefits catalogue and enrollment management</p>
          </div>
        </div>
        <Button style={{ background: "var(--primary)", color: "#fff" }}>
          <Plus size={16} className="mr-2" /> Add Benefit
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="rounded-xl border p-4" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
          <p className="text-xs font-medium mb-1" style={{ color: "var(--muted-foreground)" }}>Total Benefits Cost / Month</p>
          <p className="text-2xl font-bold" style={{ color: "#1a56db" }}>{formatCurrency(totalMonthlyCost + 18200)}</p>
        </div>
        <div className="rounded-xl border p-4" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
          <p className="text-xs font-medium mb-1" style={{ color: "var(--muted-foreground)" }}>Enrolled Employees</p>
          <p className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>{enrolledCount}</p>
        </div>
        <div className="rounded-xl border p-4" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
          <p className="text-xs font-medium mb-1" style={{ color: "var(--muted-foreground)" }}>Avg Benefits per Employee</p>
          <p className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>{avgBenefits}</p>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-base font-semibold mb-4" style={{ color: "var(--foreground)" }}>Benefits Catalogue</h2>
        <div className="grid grid-cols-3 gap-4">
          {benefitsCatalog.map(b => (
            <div key={b.id} className="rounded-xl border p-4" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{b.icon}</span>
                  <h4 className="font-semibold text-sm" style={{ color: "var(--foreground)" }}>{b.name}</h4>
                </div>
                <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "var(--secondary)", color: "var(--muted-foreground)" }}>{b.enrollment}</span>
              </div>
              <p className="text-xs mb-3" style={{ color: "var(--muted-foreground)" }}>{b.description}</p>
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1" style={{ color: "var(--muted-foreground)" }}>
                  <Users size={12} />
                  <span>{b.enrolled} enrolled</span>
                </div>
                <span style={{ color: b.monthlyCost > 0 ? "var(--foreground)" : "var(--muted-foreground)", fontWeight: b.monthlyCost > 0 ? 600 : 400 }}>
                  {b.monthlyCost > 0 ? `${formatCurrency(b.monthlyCost)}/mo` : "No cost"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
        <div className="p-4 border-b flex items-center justify-between" style={{ borderColor: "var(--border)" }}>
          <h3 className="font-semibold" style={{ color: "var(--foreground)" }}>Enrollment Records</h3>
          <div className="relative w-64">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--muted-foreground)" }} />
            <Input placeholder="Search enrollments..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9 h-8 text-sm" style={{ background: "var(--background)", borderColor: "var(--border)", color: "var(--foreground)" }} />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                {["Employee", "Plan", "Monthly Cost", "Start Date", "Status", "Actions"].map(h => (
                  <th key={h} className="text-left px-4 py-3 font-medium" style={{ color: "var(--muted-foreground)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((en, i) => (
                <tr key={en.id} style={{ borderBottom: i < filtered.length - 1 ? "1px solid var(--border)" : "none" }}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold text-white" style={{ background: "var(--primary)" }}>
                        {getInitials(en.employee)}
                      </div>
                      <span className="font-medium" style={{ color: "var(--foreground)" }}>{en.employee}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3" style={{ color: "var(--foreground)" }}>{en.plan}</td>
                  <td className="px-4 py-3" style={{ color: en.monthlyCost > 0 ? "var(--foreground)" : "var(--muted-foreground)" }}>
                    {en.monthlyCost > 0 ? formatCurrency(en.monthlyCost) : "—"}
                  </td>
                  <td className="px-4 py-3" style={{ color: "var(--muted-foreground)" }}>{formatDate(en.startDate)}</td>
                  <td className="px-4 py-3">{statusBadge(en.status)}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button className="p-1.5 rounded-md" style={{ color: "var(--muted-foreground)" }}><Edit2 size={14} /></button>
                      <button className="p-1.5 rounded-md" style={{ color: "var(--muted-foreground)" }}><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t" style={{ borderColor: "var(--border)" }}>
          <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>{filtered.length} enrollment{filtered.length !== 1 ? "s" : ""} shown</p>
        </div>
      </div>
    </div>
  )
}
