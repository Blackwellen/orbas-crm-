"use client"

import React, { useState } from "react"
import { Plus, Edit, Trash2, Check } from "lucide-react"
import { cn } from "@/lib/utils"

const TABS = ["General", "Leave Types", "Pay Calendars", "Departments", "Job Titles", "Performance Templates"]

const leaveTypes = [
  { name: "Annual Leave",         days: 25, accrual: "Monthly", carryover: 5,   mandatory: true  },
  { name: "Sick Leave",           days: 10, accrual: "Annual",  carryover: 0,   mandatory: true  },
  { name: "Parental Leave",       days: 130,accrual: "Statutory",carryover: 0,  mandatory: true  },
  { name: "TOIL",                 days: 0,  accrual: "Earned",  carryover: 5,   mandatory: false },
  { name: "Compassionate Leave",  days: 5,  accrual: "Annual",  carryover: 0,   mandatory: false },
  { name: "Study Leave",          days: 5,  accrual: "Annual",  carryover: 0,   mandatory: false },
  { name: "Unpaid Leave",         days: 0,  accrual: "N/A",     carryover: 0,   mandatory: false },
  { name: "Medical Appointment",  days: 3,  accrual: "Annual",  carryover: 0,   mandatory: false },
]

const payCalendars = [
  { name: "Monthly Salaried",  frequency: "Monthly",   nextRun: "25 Jun 2026", employees: 142, active: true  },
  { name: "Weekly Casual",     frequency: "Weekly",    nextRun: "14 Jun 2026", employees: 12,  active: true  },
  { name: "Bi-weekly Contract",frequency: "Bi-weekly", nextRun: "20 Jun 2026", employees: 13,  active: true  },
]

const departments = [
  { name: "Engineering",   head: "James Park",       count: 42, costCentre: "CC-ENG-01" },
  { name: "Sales",         head: "Marcus Williams",  count: 28, costCentre: "CC-SAL-01" },
  { name: "Marketing",     head: "Yasmin Okafor",    count: 18, costCentre: "CC-MKT-01" },
  { name: "Finance",       head: "Daniel Roberts",   count: 14, costCentre: "CC-FIN-01" },
  { name: "Operations",    head: "Charlotte Davies", count: 22, costCentre: "CC-OPS-01" },
  { name: "Product",       head: "Olivia Wright",    count: 16, costCentre: "CC-PRD-01" },
  { name: "HR",            head: "Emma Thornton",    count: 9,  costCentre: "CC-HR-01"  },
  { name: "Legal",         head: "TBD",              count: 6,  costCentre: "CC-LEG-01" },
  { name: "Customer Svc",  head: "TBD",              count: 12, costCentre: "CC-CS-01"  },
  { name: "Executive",     head: "Katherine Moss",   count: 6,  costCentre: "CC-EXE-01" },
]

const jobTitles = [
  { title: "Chief Executive Officer",       grade: "L1", dept: "Executive"   },
  { title: "Chief Technology Officer",      grade: "L1", dept: "Engineering" },
  { title: "Chief Revenue Officer",         grade: "L1", dept: "Sales"       },
  { title: "Chief People Officer",          grade: "L1", dept: "HR"          },
  { title: "Chief Financial Officer",       grade: "L1", dept: "Finance"     },
  { title: "VP Engineering",               grade: "L2", dept: "Engineering" },
  { title: "Head of Product",              grade: "L2", dept: "Product"     },
  { title: "Finance Director",             grade: "L2", dept: "Finance"     },
  { title: "Senior Software Engineer",     grade: "E3", dept: "Engineering" },
  { title: "Lead Frontend Engineer",       grade: "E3", dept: "Engineering" },
  { title: "Lead Backend Engineer",        grade: "E3", dept: "Engineering" },
  { title: "DevOps Engineer",              grade: "E2", dept: "Engineering" },
  { title: "Senior Account Executive",     grade: "S3", dept: "Sales"       },
  { title: "Account Executive",            grade: "S2", dept: "Sales"       },
  { title: "Brand Manager",               grade: "M2", dept: "Marketing"   },
  { title: "Digital Marketing Manager",   grade: "M2", dept: "Marketing"   },
  { title: "Financial Controller",         grade: "F3", dept: "Finance"     },
  { title: "Senior Finance Analyst",      grade: "F2", dept: "Finance"     },
  { title: "HR Business Partner",         grade: "HR2",dept: "HR"          },
  { title: "L&D Manager",                 grade: "HR2",dept: "HR"          },
  { title: "Recruiter",                   grade: "HR1",dept: "HR"          },
  { title: "Operations Manager",          grade: "O2", dept: "Operations"  },
]

const perfTemplates = [
  { name: "Standard Annual Review",   sections: 6, questions: 24, active: true  },
  { name: "Quarterly Check-in",       sections: 3, questions: 10, active: true  },
  { name: "Probation Review",         sections: 4, questions: 16, active: true  },
  { name: "360 Feedback",             sections: 5, questions: 20, active: false },
  { name: "Leadership 360",           sections: 6, questions: 28, active: false },
]

export default function PeopleSettingsPage() {
  const [tab, setTab] = useState("General")
  const [saved, setSaved] = useState(false)

  function handleSave() {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="p-6 space-y-5 max-w-[1200px] mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[var(--foreground)]">People Settings</h1>
        <p className="text-sm text-[var(--muted-foreground)] mt-0.5">Configure leave types, pay calendars, departments, and more</p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 border-b border-[var(--border)] overflow-x-auto">
        {TABS.map(t => (
          <button key={t} onClick={() => setTab(t)} className={cn(
            "px-4 py-2.5 text-sm whitespace-nowrap border-b-2 transition-colors",
            tab === t ? "border-[var(--primary)] text-[var(--primary)] font-medium" : "border-transparent text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
          )}>{t}</button>
        ))}
      </div>

      {/* General */}
      {tab === "General" && (
        <div className="max-w-xl space-y-5">
          <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-5 space-y-4">
            <h3 className="font-semibold text-[var(--foreground)]">Organisation Settings</h3>
            {[
              { label: "Company Name",        value: "Orbas Ltd" },
              { label: "PAYE Reference",      value: "123/AA456789" },
              { label: "Accounts Office Ref", value: "123PA00012345" },
              { label: "Pension Provider",    value: "Nest Pensions" },
              { label: "Holiday Year Start",  value: "1 January" },
              { label: "Default Currency",    value: "GBP (£)" },
            ].map(f => (
              <div key={f.label} className="space-y-1">
                <label className="text-xs font-medium text-[var(--muted-foreground)]">{f.label}</label>
                <input defaultValue={f.value} className="w-full px-3 py-2 text-sm rounded-md border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]" />
              </div>
            ))}
            <button onClick={handleSave} className="inline-flex items-center gap-1.5 rounded-md px-4 py-2 text-sm font-medium text-white hover:opacity-90 transition-opacity" style={{ background: "var(--primary)" }}>
              {saved ? <><Check className="h-4 w-4" />Saved!</> : "Save Changes"}
            </button>
          </div>
        </div>
      )}

      {/* Leave Types */}
      {tab === "Leave Types" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-[var(--muted-foreground)]">{leaveTypes.length} leave types configured</p>
            <button className="inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium text-white hover:opacity-90" style={{ background: "var(--primary)" }}>
              <Plus className="h-4 w-4" />Add Leave Type
            </button>
          </div>
          <div className="rounded-xl border border-[var(--border)] overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[var(--muted)] border-b border-[var(--border)]">
                  {["Leave Type", "Days/Year", "Accrual", "Carryover (days)", "Mandatory", "Actions"].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {leaveTypes.map((l, i) => (
                  <tr key={i} className="hover:bg-[var(--muted)] transition-colors">
                    <td className="px-4 py-3 font-medium text-[var(--foreground)]">{l.name}</td>
                    <td className="px-4 py-3 text-sm text-[var(--foreground)]">{l.days > 0 ? l.days : "Earned"}</td>
                    <td className="px-4 py-3 text-xs text-[var(--muted-foreground)]">{l.accrual}</td>
                    <td className="px-4 py-3 text-sm text-[var(--foreground)]">{l.carryover}</td>
                    <td className="px-4 py-3">
                      {l.mandatory ? (
                        <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium bg-[var(--primary)]/10 text-[var(--primary)]"><Check className="h-3 w-3" />Yes</span>
                      ) : (
                        <span className="text-xs text-[var(--muted-foreground)]">No</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button className="text-xs text-[var(--primary)] hover:underline"><Edit className="h-3.5 w-3.5" /></button>
                        {!l.mandatory && <button className="text-xs hover:opacity-70" style={{ color: "#ef4444" }}><Trash2 className="h-3.5 w-3.5" /></button>}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Pay Calendars */}
      {tab === "Pay Calendars" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-[var(--muted-foreground)]">{payCalendars.length} pay calendars</p>
            <button className="inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium text-white hover:opacity-90" style={{ background: "var(--primary)" }}>
              <Plus className="h-4 w-4" />Add Pay Calendar
            </button>
          </div>
          <div className="rounded-xl border border-[var(--border)] overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[var(--muted)] border-b border-[var(--border)]">
                  {["Calendar Name", "Frequency", "Next Run Date", "Employees", "Status", "Actions"].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {payCalendars.map((c, i) => (
                  <tr key={i} className="hover:bg-[var(--muted)] transition-colors">
                    <td className="px-4 py-3 font-medium text-[var(--foreground)]">{c.name}</td>
                    <td className="px-4 py-3 text-xs text-[var(--muted-foreground)]">{c.frequency}</td>
                    <td className="px-4 py-3 text-xs text-[var(--muted-foreground)]">{c.nextRun}</td>
                    <td className="px-4 py-3 text-sm text-[var(--foreground)]">{c.employees}</td>
                    <td className="px-4 py-3">
                      <span className={cn("inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium", c.active ? "bg-[#10b981]/10 text-[#10b981]" : "bg-[var(--muted)] text-[var(--muted-foreground)]")}>
                        {c.active ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button className="text-xs text-[var(--primary)] hover:underline">Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Departments */}
      {tab === "Departments" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-[var(--muted-foreground)]">{departments.length} departments · {departments.reduce((s, d) => s + d.count, 0)} total employees</p>
            <button className="inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium text-white hover:opacity-90" style={{ background: "var(--primary)" }}>
              <Plus className="h-4 w-4" />Add Department
            </button>
          </div>
          <div className="rounded-xl border border-[var(--border)] overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[var(--muted)] border-b border-[var(--border)]">
                  {["Department", "Department Head", "Headcount", "Cost Centre", "Actions"].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {departments.map((d, i) => (
                  <tr key={i} className="hover:bg-[var(--muted)] transition-colors">
                    <td className="px-4 py-3 font-medium text-[var(--foreground)]">{d.name}</td>
                    <td className="px-4 py-3 text-sm text-[var(--foreground)]">{d.head}</td>
                    <td className="px-4 py-3 text-sm font-semibold text-[var(--foreground)]">{d.count}</td>
                    <td className="px-4 py-3 text-xs font-mono text-[var(--muted-foreground)]">{d.costCentre}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button className="text-xs text-[var(--primary)] hover:underline">Edit</button>
                        <button className="text-xs hover:opacity-70" style={{ color: "#ef4444" }}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Job Titles */}
      {tab === "Job Titles" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-[var(--muted-foreground)]">{jobTitles.length} job titles defined</p>
            <button className="inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium text-white hover:opacity-90" style={{ background: "var(--primary)" }}>
              <Plus className="h-4 w-4" />Add Job Title
            </button>
          </div>
          <div className="rounded-xl border border-[var(--border)] overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[var(--muted)] border-b border-[var(--border)]">
                  {["Job Title", "Grade / Level", "Department", "Actions"].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {jobTitles.map((j, i) => (
                  <tr key={i} className="hover:bg-[var(--muted)] transition-colors">
                    <td className="px-4 py-3 font-medium text-[var(--foreground)]">{j.title}</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold bg-[var(--primary)]/10 text-[var(--primary)]">{j.grade}</span>
                    </td>
                    <td className="px-4 py-3 text-xs text-[var(--muted-foreground)]">{j.dept}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button className="text-xs text-[var(--primary)] hover:underline">Edit</button>
                        <button className="text-xs hover:opacity-70" style={{ color: "#ef4444" }}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Performance Templates */}
      {tab === "Performance Templates" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-[var(--muted-foreground)]">{perfTemplates.length} templates</p>
            <button className="inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium text-white hover:opacity-90" style={{ background: "var(--primary)" }}>
              <Plus className="h-4 w-4" />New Template
            </button>
          </div>
          <div className="rounded-xl border border-[var(--border)] overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[var(--muted)] border-b border-[var(--border)]">
                  {["Template Name", "Sections", "Questions", "Status", "Actions"].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {perfTemplates.map((t, i) => (
                  <tr key={i} className="hover:bg-[var(--muted)] transition-colors">
                    <td className="px-4 py-3 font-medium text-[var(--foreground)]">{t.name}</td>
                    <td className="px-4 py-3 text-sm text-[var(--foreground)]">{t.sections}</td>
                    <td className="px-4 py-3 text-sm text-[var(--foreground)]">{t.questions}</td>
                    <td className="px-4 py-3">
                      <span className={cn("inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium", t.active ? "bg-[#10b981]/10 text-[#10b981]" : "bg-[var(--muted)] text-[var(--muted-foreground)]")}>
                        {t.active ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button className="text-xs text-[var(--primary)] hover:underline">Edit</button>
                        <button className="text-xs text-[var(--muted-foreground)] hover:text-[var(--foreground)]">Duplicate</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
