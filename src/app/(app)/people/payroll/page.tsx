"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Plus, ChevronRight, DollarSign, Users, Calendar, TrendingUp, Eye, Download } from "lucide-react"
import { cn } from "@/lib/utils"

const TABS = ["Payroll Runs", "Payslips", "PAYE Summary", "Pension", "Year End"]

const payrollRuns = [
  { id: "PR-2026-06", period: "June 2026",     runDate: "25 Jun 2026", employees: 167, gross: "£867,432",  net: "£638,122",  status: "Draft" },
  { id: "PR-2026-05", period: "May 2026",      runDate: "25 May 2026", employees: 163, gross: "£847,800",  net: "£622,480",  status: "Paid" },
  { id: "PR-2026-04", period: "April 2026",    runDate: "25 Apr 2026", employees: 161, gross: "£836,200",  net: "£614,330",  status: "Paid" },
  { id: "PR-2026-03", period: "March 2026",    runDate: "25 Mar 2026", employees: 158, gross: "£820,600",  net: "£603,740",  status: "Paid" },
  { id: "PR-2026-02", period: "February 2026", runDate: "25 Feb 2026", employees: 155, gross: "£804,100",  net: "£592,150",  status: "Paid" },
  { id: "PR-2026-01", period: "January 2026",  runDate: "25 Jan 2026", employees: 152, gross: "£789,600",  net: "£580,680",  status: "Paid" },
  { id: "PR-2025-12", period: "December 2025", runDate: "19 Dec 2025", employees: 150, gross: "£795,400",  net: "£585,120",  status: "Archived" },
  { id: "PR-2025-11", period: "November 2025", runDate: "25 Nov 2025", employees: 148, gross: "£768,400",  net: "£565,620",  status: "Archived" },
  { id: "PR-2025-10", period: "October 2025",  runDate: "25 Oct 2025", employees: 147, gross: "£762,900",  net: "£561,400",  status: "Archived" },
  { id: "PR-2025-09", period: "September 2025",runDate: "25 Sep 2025", employees: 144, gross: "£747,600",  net: "£550,080",  status: "Archived" },
]

const payslips = [
  { employee: "Alex Thompson",   period: "May 2026", gross: "£6,000", net: "£4,312", payDate: "25 May 2026" },
  { employee: "Sophie Clarke",   period: "May 2026", gross: "£4,200", net: "£3,140", payDate: "25 May 2026" },
  { employee: "Aiden Foster",    period: "May 2026", gross: "£3,800", net: "£2,870", payDate: "25 May 2026" },
  { employee: "Noah Campbell",   period: "May 2026", gross: "£4,800", net: "£3,520", payDate: "25 May 2026" },
  { employee: "Grace Bennett",   period: "May 2026", gross: "£5,200", net: "£3,780", payDate: "25 May 2026" },
  { employee: "Oliver Hughes",   period: "May 2026", gross: "£5,500", net: "£4,010", payDate: "25 May 2026" },
  { employee: "Fatima Al-Zahra", period: "May 2026", gross: "£6,200", net: "£4,460", payDate: "25 May 2026" },
  { employee: "Marcus Williams", period: "May 2026", gross: "£9,200", net: "£6,320", payDate: "25 May 2026" },
  { employee: "Lena Cruz",       period: "May 2026", gross: "£5,800", net: "£4,186", payDate: "25 May 2026" },
  { employee: "Ravi Patel",      period: "May 2026", gross: "£6,000", net: "£4,312", payDate: "25 May 2026" },
]

const statusStyle: Record<string, string> = {
  Draft:      "bg-[#f59e0b]/10 text-[#f59e0b]",
  Processing: "bg-[var(--primary)]/10 text-[var(--primary)]",
  Approved:   "bg-[#06b6d4]/10 text-[#06b6d4]",
  Paid:       "bg-[#10b981]/10 text-[#10b981]",
  Archived:   "bg-[var(--muted)] text-[var(--muted-foreground)]",
}

export default function PayrollPage() {
  const [tab, setTab] = useState("Payroll Runs")

  return (
    <div className="p-6 space-y-5 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-[var(--foreground)]">Payroll</h1>
          <p className="text-sm text-[var(--muted-foreground)] mt-0.5">Manage payroll runs, payslips, PAYE & pension</p>
        </div>
        <Link href="/app/people/payroll/new" className="inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium text-white hover:opacity-90" style={{ background: "var(--primary)" }}>
          <Plus className="h-4 w-4" />New Payroll Run
        </Link>
      </div>

      {/* Current Period Summary */}
      <div className="rounded-xl border-2 border-[var(--primary)]/30 bg-[var(--primary)]/5 p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-xs font-semibold text-[var(--primary)] uppercase tracking-wide">Current Period</span>
            <h2 className="text-lg font-bold text-[var(--foreground)] mt-0.5">June 2026 — Draft</h2>
          </div>
          <Link href="/app/people/payroll/PR-2026-06" className="inline-flex items-center gap-1.5 rounded-md border border-[var(--primary)]/40 px-3 py-1.5 text-sm text-[var(--primary)] hover:bg-[var(--primary)]/10">
            Open Run <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Employees",  value: "167",       icon: Users      },
            { label: "Gross Pay",  value: "£867,432",  icon: DollarSign },
            { label: "Net Pay",    value: "£638,122",  icon: TrendingUp },
            { label: "Pay Date",   value: "25 Jun 2026",icon: Calendar  },
          ].map(s => (
            <div key={s.label} className="flex items-center gap-3">
              <s.icon className="h-5 w-5 shrink-0" style={{ color: "var(--primary)" }} />
              <div>
                <p className="text-xs text-[var(--muted-foreground)]">{s.label}</p>
                <p className="text-base font-bold text-[var(--foreground)]">{s.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "YTD Payroll Cost", value: "£5.17M",    sub: "+4.2% vs 2025" },
          { label: "Avg Monthly",      value: "£861,500",  sub: "167 employees" },
          { label: "PAYE Due",         value: "£174,200",  sub: "19 Jun 2026" },
          { label: "NI Due",           value: "£98,400",   sub: "19 Jun 2026" },
        ].map(s => (
          <div key={s.label} className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-4">
            <p className="text-xs text-[var(--muted-foreground)]">{s.label}</p>
            <p className="text-xl font-bold text-[var(--foreground)] mt-1">{s.value}</p>
            <p className="text-xs text-[var(--muted-foreground)]">{s.sub}</p>
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

      {/* Payroll Runs */}
      {tab === "Payroll Runs" && (
        <div className="rounded-xl border border-[var(--border)] overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[var(--muted)] border-b border-[var(--border)]">
                {["Pay Period", "Run Date", "Employees", "Gross Pay", "Net Pay", "Status", "Actions"].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)] whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {payrollRuns.map(run => (
                <tr key={run.id} className="hover:bg-[var(--muted)] transition-colors">
                  <td className="px-4 py-3 font-medium text-[var(--foreground)]">{run.period}</td>
                  <td className="px-4 py-3 text-xs text-[var(--muted-foreground)] whitespace-nowrap">{run.runDate}</td>
                  <td className="px-4 py-3 text-sm text-[var(--foreground)]">{run.employees}</td>
                  <td className="px-4 py-3 font-semibold text-[var(--foreground)]">{run.gross}</td>
                  <td className="px-4 py-3 font-semibold" style={{ color: "#10b981" }}>{run.net}</td>
                  <td className="px-4 py-3">
                    <span className={cn("inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium", statusStyle[run.status])}>{run.status}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Link href={`/app/people/payroll/${run.id}`} className="inline-flex items-center gap-1 text-xs text-[var(--primary)] hover:underline">
                        <Eye className="h-3.5 w-3.5" />View
                      </Link>
                      <button className="inline-flex items-center gap-1 text-xs text-[var(--muted-foreground)] hover:text-[var(--foreground)]">
                        <Download className="h-3.5 w-3.5" />Export
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Payslips */}
      {tab === "Payslips" && (
        <div className="rounded-xl border border-[var(--border)] overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[var(--muted)] border-b border-[var(--border)]">
                {["Employee", "Period", "Gross Pay", "Net Pay", "Pay Date", "Actions"].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {payslips.map((p, i) => (
                <tr key={i} className="hover:bg-[var(--muted)] transition-colors">
                  <td className="px-4 py-3 font-medium text-[var(--foreground)]">{p.employee}</td>
                  <td className="px-4 py-3 text-xs text-[var(--muted-foreground)]">{p.period}</td>
                  <td className="px-4 py-3 font-semibold text-[var(--foreground)]">{p.gross}</td>
                  <td className="px-4 py-3 font-semibold" style={{ color: "#10b981" }}>{p.net}</td>
                  <td className="px-4 py-3 text-xs text-[var(--muted-foreground)]">{p.payDate}</td>
                  <td className="px-4 py-3">
                    <button className="inline-flex items-center gap-1 text-xs text-[var(--primary)] hover:underline">
                      <Download className="h-3.5 w-3.5" />Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* PAYE Summary */}
      {tab === "PAYE Summary" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { label: "Tax Year",        value: "2025/26" },
            { label: "Employer PAYE",   value: "£174,200",  note: "Due 19 Jun 2026" },
            { label: "Employee NI",     value: "£56,400",   note: "Deducted from employees" },
            { label: "Employer NI",     value: "£98,400",   note: "Employer cost" },
            { label: "Student Loans",   value: "£12,800",   note: "14 employees" },
            { label: "Total HMRC Due",  value: "£341,800",  note: "Combined payment" },
          ].map(s => (
            <div key={s.label} className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-4">
              <p className="text-xs text-[var(--muted-foreground)]">{s.label}</p>
              <p className="text-2xl font-bold text-[var(--foreground)] mt-1">{s.value}</p>
              {s.note && <p className="text-xs text-[var(--muted-foreground)]">{s.note}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Pension */}
      {tab === "Pension" && (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Employee Contributions", value: "£42,600", note: "5% average" },
              { label: "Employer Contributions", value: "£34,080", note: "4% average" },
              { label: "Total Pension This Month",value: "£76,680", note: "167 enrolled" },
            ].map(s => (
              <div key={s.label} className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-4">
                <p className="text-xs text-[var(--muted-foreground)]">{s.label}</p>
                <p className="text-xl font-bold text-[var(--foreground)] mt-1">{s.value}</p>
                <p className="text-xs text-[var(--muted-foreground)]">{s.note}</p>
              </div>
            ))}
          </div>
          <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-4">
            <p className="text-sm font-semibold text-[var(--foreground)] mb-2">Pension Provider: Nest Pensions</p>
            <p className="text-xs text-[var(--muted-foreground)]">Auto-enrolment compliant · Next submission: 19 Jun 2026 · All 167 employees enrolled</p>
          </div>
        </div>
      )}

      {/* Year End */}
      {tab === "Year End" && (
        <div className="space-y-4">
          <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-5">
            <h3 className="font-semibold text-[var(--foreground)] mb-3">Year End 2025/26 — Completed</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: "Final FPS Submitted",    value: "5 Apr 2026" },
                { label: "P60s Issued",            value: "150 employees" },
                { label: "EPS Submitted",          value: "6 Apr 2026" },
                { label: "P11D Deadline",          value: "6 Jul 2026" },
              ].map(s => (
                <div key={s.label}>
                  <p className="text-xs text-[var(--muted-foreground)]">{s.label}</p>
                  <p className="text-sm font-semibold text-[var(--foreground)] mt-0.5">{s.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
