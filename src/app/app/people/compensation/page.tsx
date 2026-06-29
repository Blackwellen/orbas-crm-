"use client"

import React, { useState } from "react"
import { Plus, Search, DollarSign, TrendingUp, Users } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn, getInitials } from "@/lib/utils"

const TABS = ["Compensation Register", "Salary Bands", "Reviews"]

const employees = [
  { name: "Katherine Moss",   dept: "Executive",   title: "CEO",                     band: "L1", base: 210000, bonus: 42000, total: 252000, lastReview: "Jan 2026" },
  { name: "James Park",       dept: "Engineering", title: "CTO",                     band: "L1", base: 185000, bonus: 37000, total: 222000, lastReview: "Jan 2026" },
  { name: "Marcus Williams",  dept: "Sales",       title: "CRO",                     band: "L1", base: 175000, bonus: 87500, total: 262500, lastReview: "Jan 2026" },
  { name: "Emma Thornton",    dept: "HR",          title: "CPO",                     band: "L1", base: 165000, bonus: 33000, total: 198000, lastReview: "Jan 2026" },
  { name: "Daniel Roberts",   dept: "Finance",     title: "CFO",                     band: "L1", base: 180000, bonus: 36000, total: 216000, lastReview: "Jan 2026" },
  { name: "Charlotte Davies", dept: "Operations",  title: "COO",                     band: "L1", base: 172000, bonus: 34400, total: 206400, lastReview: "Jan 2026" },
  { name: "Olivia Wright",    dept: "Product",     title: "Head of Product",         band: "L2", base: 120000, bonus: 24000, total: 144000, lastReview: "Mar 2026" },
  { name: "Harriet Stone",    dept: "Finance",     title: "Finance Director",        band: "L2", base: 115000, bonus: 23000, total: 138000, lastReview: "Mar 2026" },
  { name: "Ryan Thompson",    dept: "Operations",  title: "Operations Director",     band: "L2", base: 105000, bonus: 21000, total: 126000, lastReview: "Mar 2026" },
  { name: "Alex Thompson",    dept: "Engineering", title: "Senior Engineer",         band: "E3", base: 72000,  bonus: 7200,  total: 79200,  lastReview: "Mar 2026" },
  { name: "Fatima Al-Zahra", dept: "Engineering", title: "DevOps Engineer",         band: "E3", base: 74400,  bonus: 7440,  total: 81840,  lastReview: "Mar 2026" },
  { name: "Lena Cruz",        dept: "Engineering", title: "Lead Frontend Engineer",  band: "E3", base: 78000,  bonus: 7800,  total: 85800,  lastReview: "Mar 2026" },
  { name: "Ravi Patel",       dept: "Engineering", title: "Lead Backend Engineer",   band: "E3", base: 76000,  bonus: 7600,  total: 83600,  lastReview: "Mar 2026" },
  { name: "Noah Campbell",    dept: "Sales",       title: "Senior Account Executive",band: "S3", base: 60000,  bonus: 60000, total: 120000, lastReview: "Apr 2026" },
  { name: "Sophie Clarke",    dept: "Marketing",   title: "Brand Manager",           band: "M2", base: 52000,  bonus: 5200,  total: 57200,  lastReview: "Apr 2026" },
  { name: "Oliver Hughes",    dept: "Finance",     title: "Financial Controller",    band: "F3", base: 68000,  bonus: 6800,  total: 74800,  lastReview: "Apr 2026" },
  { name: "Grace Bennett",    dept: "Finance",     title: "Senior Finance Analyst",  band: "F2", base: 58000,  bonus: 5800,  total: 63800,  lastReview: "Apr 2026" },
  { name: "Priya Sharma",     dept: "HR",          title: "L&D Manager",             band: "HR2",base: 55000,  bonus: 5500,  total: 60500,  lastReview: "Apr 2026" },
  { name: "Leon Davies",      dept: "HR",          title: "Recruiter",               band: "HR1",base: 40000,  bonus: 4000,  total: 44000,  lastReview: "Apr 2026" },
  { name: "Chloe Adams",      dept: "HR",          title: "HR Advisor",              band: "HR1",base: 36000,  bonus: 3600,  total: 39600,  lastReview: "Apr 2026" },
]

const salaryBands = [
  { band: "L1",  title: "C-Suite / Executive", min: 160000, mid: 180000, max: 250000, count: 6  },
  { band: "L2",  title: "Director Level",      min: 100000, mid: 115000, max: 140000, count: 3  },
  { band: "E3",  title: "Senior Engineer",     min: 65000,  mid: 75000,  max: 90000,  count: 18 },
  { band: "E2",  title: "Mid Engineer",        min: 50000,  mid: 60000,  max: 72000,  count: 14 },
  { band: "E1",  title: "Junior Engineer",     min: 35000,  mid: 42000,  max: 52000,  count: 10 },
  { band: "S3",  title: "Senior Sales",        min: 55000,  mid: 65000,  max: 80000,  count: 8  },
  { band: "S2",  title: "Mid Sales",           min: 40000,  mid: 48000,  max: 58000,  count: 12 },
  { band: "M2",  title: "Marketing Manager",   min: 45000,  mid: 52000,  max: 65000,  count: 7  },
  { band: "F3",  title: "Finance Specialist",  min: 58000,  mid: 68000,  max: 80000,  count: 5  },
  { band: "F2",  title: "Finance Analyst",     min: 42000,  mid: 50000,  max: 62000,  count: 6  },
  { band: "HR2", title: "HR Manager",          min: 48000,  mid: 55000,  max: 68000,  count: 4  },
  { band: "HR1", title: "HR Coordinator",      min: 32000,  mid: 38000,  max: 46000,  count: 5  },
]

const fmt = (n: number) => `£${n.toLocaleString()}`

const salaries = employees.map(e => e.base)
const avgSalary  = Math.round(salaries.reduce((s, v) => s + v, 0) / salaries.length)
const sorted     = [...salaries].sort((a, b) => a - b)
const median     = sorted[Math.floor(sorted.length / 2)]
const p25        = sorted[Math.floor(sorted.length * 0.25)]
const p75        = sorted[Math.floor(sorted.length * 0.75)]

export default function CompensationPage() {
  const [tab, setTab] = useState("Compensation Register")
  const [search, setSearch] = useState("")
  const [deptFilter, setDeptFilter] = useState("All")

  const depts = ["All", ...Array.from(new Set(employees.map(e => e.dept)))]

  const filtered = employees.filter(e => {
    const matchSearch = e.name.toLowerCase().includes(search.toLowerCase()) || e.title.toLowerCase().includes(search.toLowerCase())
    const matchDept = deptFilter === "All" || e.dept === deptFilter
    return matchSearch && matchDept
  })

  return (
    <div className="p-6 space-y-5 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-[var(--foreground)]">Compensation</h1>
          <p className="text-sm text-[var(--muted-foreground)] mt-0.5">Salary register, bands, and compensation reviews</p>
        </div>
        <button className="inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium text-white hover:opacity-90" style={{ background: "var(--primary)" }}>
          <Plus className="h-4 w-4" />Salary Review
        </button>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Avg Base Salary",   value: fmt(avgSalary), icon: DollarSign, color: "var(--primary)" },
          { label: "Median Salary",     value: fmt(median),    icon: TrendingUp, color: "#10b981" },
          { label: "P25 Band",          value: fmt(p25),       icon: Users,      color: "#f59e0b" },
          { label: "P75 Band",          value: fmt(p75),       icon: Users,      color: "#8b5cf6" },
        ].map(k => (
          <div key={k.label} className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-4 flex items-center gap-4">
            <div className="p-2.5 rounded-lg shrink-0" style={{ background: `${k.color}18` }}>
              <k.icon className="h-5 w-5" style={{ color: k.color }} />
            </div>
            <div>
              <p className="text-xs text-[var(--muted-foreground)]">{k.label}</p>
              <p className="text-xl font-bold text-[var(--foreground)]">{k.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 border-b border-[var(--border)]">
        {TABS.map(t => (
          <button key={t} onClick={() => setTab(t)} className={cn(
            "px-4 py-2.5 text-sm whitespace-nowrap border-b-2 transition-colors",
            tab === t ? "border-[var(--primary)] text-[var(--primary)] font-medium" : "border-transparent text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
          )}>{t}</button>
        ))}
      </div>

      {/* Compensation Register */}
      {tab === "Compensation Register" && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 flex-wrap">
            <div className="relative flex-1 min-w-48">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[var(--muted-foreground)]" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search employee or title…" className="w-full pl-8 pr-3 py-1.5 text-sm rounded-md border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]" />
            </div>
            <select value={deptFilter} onChange={e => setDeptFilter(e.target.value)} className="px-3 py-1.5 text-sm rounded-md border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] focus:outline-none">
              {depts.map(d => <option key={d}>{d}</option>)}
            </select>
          </div>
          <div className="rounded-xl border border-[var(--border)] overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[var(--muted)] border-b border-[var(--border)]">
                  {["Name", "Department", "Job Title", "Band", "Base Salary", "Bonus Target", "Total Comp", "Last Review"].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)] whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {filtered.map((e, i) => (
                  <tr key={i} className="hover:bg-[var(--muted)] transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="text-[10px] bg-[var(--primary)]/10 text-[var(--primary)]">{getInitials(e.name)}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium text-[var(--foreground)]">{e.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs text-[var(--muted-foreground)]">{e.dept}</td>
                    <td className="px-4 py-3 text-sm text-[var(--foreground)]">{e.title}</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium bg-[var(--primary)]/10 text-[var(--primary)]">{e.band}</span>
                    </td>
                    <td className="px-4 py-3 font-semibold text-[var(--foreground)]">{fmt(e.base)}</td>
                    <td className="px-4 py-3 text-sm text-[var(--foreground)]">{fmt(e.bonus)}</td>
                    <td className="px-4 py-3 font-bold" style={{ color: "#10b981" }}>{fmt(e.total)}</td>
                    <td className="px-4 py-3 text-xs text-[var(--muted-foreground)]">{e.lastReview}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Salary Bands */}
      {tab === "Salary Bands" && (
        <div className="rounded-xl border border-[var(--border)] overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[var(--muted)] border-b border-[var(--border)]">
                {["Band", "Title", "Minimum", "Midpoint", "Maximum", "Roles in Band"].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {salaryBands.map((b, i) => (
                <tr key={i} className="hover:bg-[var(--muted)] transition-colors">
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold bg-[var(--primary)]/10 text-[var(--primary)]">{b.band}</span>
                  </td>
                  <td className="px-4 py-3 font-medium text-[var(--foreground)]">{b.title}</td>
                  <td className="px-4 py-3 text-sm text-[var(--foreground)]">{fmt(b.min)}</td>
                  <td className="px-4 py-3 font-semibold text-[var(--foreground)]">{fmt(b.mid)}</td>
                  <td className="px-4 py-3 text-sm text-[var(--foreground)]">{fmt(b.max)}</td>
                  <td className="px-4 py-3 text-sm text-[var(--foreground)]">{b.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Reviews */}
      {tab === "Reviews" && (
        <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-6 space-y-4">
          <h3 className="font-semibold text-[var(--foreground)]">Annual Salary Review 2026</h3>
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Avg Increase",      value: "3.2%",   note: "Across all bands" },
              { label: "Reviews Completed", value: "141/167",note: "84% complete" },
              { label: "Total Cost Impact", value: "+£248k", note: "Annualised" },
            ].map(s => (
              <div key={s.label} className="rounded-lg border border-[var(--border)] p-4">
                <p className="text-xs text-[var(--muted-foreground)]">{s.label}</p>
                <p className="text-xl font-bold text-[var(--foreground)] mt-1">{s.value}</p>
                <p className="text-xs text-[var(--muted-foreground)]">{s.note}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
