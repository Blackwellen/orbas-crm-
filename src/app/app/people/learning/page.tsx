"use client"

import React, { useState } from "react"
import { Plus, BookOpen, Users, CheckCircle, AlertCircle } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn, getInitials } from "@/lib/utils"

const TABS = ["Courses", "My Training", "Mandatory", "Certificates", "Reports"]

const courses = [
  { id: "C001", name: "Leadership Essentials",          category: "Leadership",    duration: "8h",  enrolled: 45,  completion: 72, mandatory: false },
  { id: "C002", name: "Data Protection & GDPR",         category: "Compliance",    duration: "2h",  enrolled: 167, completion: 94, mandatory: true  },
  { id: "C003", name: "Health & Safety at Work",        category: "Compliance",    duration: "3h",  enrolled: 167, completion: 88, mandatory: true  },
  { id: "C004", name: "Anti-Bribery & Corruption",      category: "Compliance",    duration: "1h",  enrolled: 167, completion: 91, mandatory: true  },
  { id: "C005", name: "Unconscious Bias",               category: "DEI",           duration: "2h",  enrolled: 120, completion: 65, mandatory: false },
  { id: "C006", name: "Effective Communication",        category: "Soft Skills",   duration: "4h",  enrolled: 78,  completion: 55, mandatory: false },
  { id: "C007", name: "Project Management Foundations", category: "Management",    duration: "6h",  enrolled: 52,  completion: 42, mandatory: false },
  { id: "C008", name: "Python for Data Analysis",       category: "Technical",     duration: "12h", enrolled: 28,  completion: 38, mandatory: false },
  { id: "C009", name: "Mental Health First Aid",        category: "Wellbeing",     duration: "2h",  enrolled: 167, completion: 76, mandatory: true  },
  { id: "C010", name: "Conflict Resolution",            category: "Soft Skills",   duration: "3h",  enrolled: 34,  completion: 60, mandatory: false },
  { id: "C011", name: "Cloud Fundamentals (AWS)",       category: "Technical",     duration: "10h", enrolled: 38,  completion: 45, mandatory: false },
  { id: "C012", name: "Financial Literacy for Managers",category: "Management",    duration: "4h",  enrolled: 24,  completion: 50, mandatory: false },
  { id: "C013", name: "Cyber Security Awareness",       category: "Compliance",    duration: "1.5h",enrolled: 167, completion: 97, mandatory: true  },
  { id: "C014", name: "Inclusion in the Workplace",     category: "DEI",           duration: "2h",  enrolled: 89,  completion: 58, mandatory: false },
  { id: "C015", name: "Presenting with Confidence",     category: "Soft Skills",   duration: "3h",  enrolled: 41,  completion: 44, mandatory: false },
]

const mandatoryTracker = [
  { employee: "Alex Thompson",    course: "Mental Health First Aid",  dueDate: "30 Jun 2026", completed: false, overdue: false },
  { employee: "Sophie Clarke",    course: "Anti-Bribery & Corruption",dueDate: "15 Jun 2026", completed: true,  overdue: false },
  { employee: "Aiden Foster",     course: "Data Protection & GDPR",   dueDate: "10 Jun 2026", completed: false, overdue: true  },
  { employee: "Noah Campbell",    course: "Health & Safety at Work",  dueDate: "30 Jun 2026", completed: true,  overdue: false },
  { employee: "Grace Bennett",    course: "Cyber Security Awareness", dueDate: "1 Jun 2026",  completed: false, overdue: true  },
  { employee: "Oliver Hughes",    course: "Mental Health First Aid",  dueDate: "30 Jun 2026", completed: true,  overdue: false },
  { employee: "Fatima Al-Zahra", course: "Anti-Bribery & Corruption",dueDate: "30 Jun 2026", completed: true,  overdue: false },
  { employee: "Marcus Williams",  course: "Data Protection & GDPR",   dueDate: "30 May 2026", completed: false, overdue: true  },
  { employee: "Lena Cruz",        course: "Health & Safety at Work",  dueDate: "30 Jun 2026", completed: true,  overdue: false },
  { employee: "Ravi Patel",       course: "Cyber Security Awareness", dueDate: "30 Jun 2026", completed: true,  overdue: false },
  { employee: "Katie Walsh",      course: "Mental Health First Aid",  dueDate: "15 Jun 2026", completed: false, overdue: true  },
  { employee: "Niamh Kelly",      course: "Data Protection & GDPR",   dueDate: "30 Jun 2026", completed: false, overdue: false },
  { employee: "Leon Davies",      course: "Anti-Bribery & Corruption",dueDate: "30 Jun 2026", completed: true,  overdue: false },
  { employee: "Chloe Adams",      course: "Health & Safety at Work",  dueDate: "30 Jun 2026", completed: true,  overdue: false },
  { employee: "Ryan Thompson",    course: "Cyber Security Awareness", dueDate: "30 Jun 2026", completed: false, overdue: false },
]

const categoryColors: Record<string, string> = {
  Compliance:   "bg-[#ef4444]/10 text-[#ef4444]",
  Leadership:   "bg-[var(--primary)]/10 text-[var(--primary)]",
  Technical:    "bg-[#8b5cf6]/10 text-[#8b5cf6]",
  DEI:          "bg-[#ec4899]/10 text-[#ec4899]",
  "Soft Skills":"bg-[#06b6d4]/10 text-[#06b6d4]",
  Management:   "bg-[#f59e0b]/10 text-[#f59e0b]",
  Wellbeing:    "bg-[#10b981]/10 text-[#10b981]",
}

export default function LearningPage() {
  const [tab, setTab] = useState("Courses")
  const [search, setSearch] = useState("")

  const totalCourses   = courses.length
  const mandatoryCourses = courses.filter(c => c.mandatory).length
  const avgCompletion  = Math.round(courses.reduce((s, c) => s + c.completion, 0) / courses.length)
  const overdueCount   = mandatoryTracker.filter(t => t.overdue).length

  const filtered = courses.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.category.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="p-6 space-y-5 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-[var(--foreground)]">Learning</h1>
          <p className="text-sm text-[var(--muted-foreground)] mt-0.5">Learning management system — courses, training, certificates</p>
        </div>
        <button className="inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium text-white hover:opacity-90" style={{ background: "var(--primary)" }}>
          <Plus className="h-4 w-4" />Add Course
        </button>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Courses",          value: totalCourses,   icon: BookOpen,     color: "var(--primary)" },
          { label: "Enrolled This Month",    value: 42,             icon: Users,        color: "#8b5cf6" },
          { label: "Avg Completion %",       value: `${avgCompletion}%`, icon: CheckCircle, color: "#10b981" },
          { label: "Overdue Mandatory",      value: overdueCount,   icon: AlertCircle,  color: "#ef4444" },
        ].map(k => (
          <div key={k.label} className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-4 flex items-center gap-4">
            <div className="p-2.5 rounded-lg shrink-0" style={{ background: `${k.color}18` }}>
              <k.icon className="h-5 w-5" style={{ color: k.color }} />
            </div>
            <div>
              <p className="text-xs text-[var(--muted-foreground)]">{k.label}</p>
              <p className="text-2xl font-bold text-[var(--foreground)]">{k.value}</p>
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

      {/* Courses Tab */}
      {tab === "Courses" && (
        <div className="space-y-4">
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search courses…" className="w-full max-w-sm px-3 py-1.5 text-sm rounded-md border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]" />
          <div className="rounded-xl border border-[var(--border)] overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[var(--muted)] border-b border-[var(--border)]">
                  {["Course Name", "Category", "Duration", "Enrolled", "Completion", "Mandatory", "Actions"].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {filtered.map(c => (
                  <tr key={c.id} className="hover:bg-[var(--muted)] transition-colors">
                    <td className="px-4 py-3 font-medium text-[var(--foreground)]">{c.name}</td>
                    <td className="px-4 py-3">
                      <span className={cn("inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium", categoryColors[c.category] || "bg-[var(--muted)] text-[var(--muted-foreground)]")}>{c.category}</span>
                    </td>
                    <td className="px-4 py-3 text-xs text-[var(--muted-foreground)]">{c.duration}</td>
                    <td className="px-4 py-3 text-sm text-[var(--foreground)]">{c.enrolled}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-1.5 rounded-full bg-[var(--muted)] overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: `${c.completion}%`, background: c.completion >= 90 ? "#10b981" : c.completion >= 70 ? "var(--primary)" : "#f59e0b" }} />
                        </div>
                        <span className="text-xs font-medium text-[var(--foreground)]">{c.completion}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      {c.mandatory ? (
                        <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium bg-[#ef4444]/10 text-[#ef4444]">Mandatory</span>
                      ) : (
                        <span className="text-xs text-[var(--muted-foreground)]">Optional</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <button className="text-xs text-[var(--primary)] hover:underline">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Mandatory Tab */}
      {tab === "Mandatory" && (
        <div className="rounded-xl border border-[var(--border)] overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[var(--muted)] border-b border-[var(--border)]">
                {["Employee", "Course", "Due Date", "Status"].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {mandatoryTracker.map((t, i) => (
                <tr key={i} className="hover:bg-[var(--muted)] transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="text-[10px] bg-[var(--primary)]/10 text-[var(--primary)]">{getInitials(t.employee)}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium text-[var(--foreground)]">{t.employee}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-[var(--foreground)]">{t.course}</td>
                  <td className="px-4 py-3 text-xs text-[var(--muted-foreground)] whitespace-nowrap">{t.dueDate}</td>
                  <td className="px-4 py-3">
                    {t.completed ? (
                      <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium bg-[#10b981]/10 text-[#10b981]">
                        <CheckCircle className="h-3 w-3" />Completed
                      </span>
                    ) : t.overdue ? (
                      <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium bg-[#ef4444]/10 text-[#ef4444]">
                        <AlertCircle className="h-3 w-3" />Overdue
                      </span>
                    ) : (
                      <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium bg-[#f59e0b]/10 text-[#f59e0b]">Pending</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Certificates Tab */}
      {tab === "Certificates" && (
        <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-6">
          <p className="text-sm text-[var(--muted-foreground)]">Certificates issued this year: <strong className="text-[var(--foreground)]">284</strong></p>
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
            {courses.filter(c => c.completion > 0).slice(0, 6).map(c => (
              <div key={c.id} className="rounded-lg border border-[var(--border)] p-4">
                <p className="text-sm font-medium text-[var(--foreground)]">{c.name}</p>
                <p className="text-xs text-[var(--muted-foreground)] mt-1">{Math.round(c.enrolled * c.completion / 100)} certificates issued</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* My Training Tab */}
      {tab === "My Training" && (
        <div className="max-w-xl space-y-4">
          {[
            { course: "Data Protection & GDPR",  status: "Completed", date: "10 Mar 2026", score: "95%" },
            { course: "Health & Safety at Work",  status: "Completed", date: "15 Feb 2026", score: "88%" },
            { course: "Leadership Essentials",    status: "In Progress",date: "—",          score: "—"  },
            { course: "Mental Health First Aid",  status: "Not Started",date: "—",          score: "—"  },
          ].map((t, i) => (
            <div key={i} className="flex items-center justify-between rounded-xl border border-[var(--border)] bg-[var(--background)] p-4">
              <div>
                <p className="text-sm font-medium text-[var(--foreground)]">{t.course}</p>
                {t.date !== "—" && <p className="text-xs text-[var(--muted-foreground)]">Completed {t.date} · Score: {t.score}</p>}
              </div>
              <span className={cn("inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
                t.status === "Completed" ? "bg-[#10b981]/10 text-[#10b981]" :
                t.status === "In Progress" ? "bg-[var(--primary)]/10 text-[var(--primary)]" :
                "bg-[var(--muted)] text-[var(--muted-foreground)]"
              )}>{t.status}</span>
            </div>
          ))}
        </div>
      )}

      {/* Reports Tab */}
      {tab === "Reports" && (
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: "Overall Completion Rate",  value: `${avgCompletion}%`,    sub: "Across all courses" },
            { label: "Mandatory Compliance",     value: "84%",                  sub: `${overdueCount} employees overdue` },
            { label: "Hours of Training Logged", value: "4,820h",               sub: "YTD 2026" },
            { label: "Certificates Issued",      value: "284",                  sub: "YTD 2026" },
          ].map(s => (
            <div key={s.label} className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-5">
              <p className="text-xs text-[var(--muted-foreground)]">{s.label}</p>
              <p className="text-2xl font-bold text-[var(--foreground)] mt-1">{s.value}</p>
              <p className="text-xs text-[var(--muted-foreground)]">{s.sub}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
