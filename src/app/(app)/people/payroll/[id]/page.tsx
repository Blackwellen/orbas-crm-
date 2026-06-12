"use client"

import React, { useState, use } from "react"
import Link from "next/link"
import { ArrowLeft, Download, CheckCircle, Edit, Send, CreditCard, FileText } from "lucide-react"
import { cn } from "@/lib/utils"

const TABS = ["Employees", "Summary", "BACS File", "Pension", "Audit"]

const employees = [
  { name: "Alex Thompson",    dept: "Engineering", basic: 6000,  overtime: 0,   bonus: 0,    gross: 6000,  paye: 1380, niEmp: 452,  niEr: 632,  pension: 300, deductions: 2132, net: 3868 },
  { name: "Sophie Clarke",    dept: "Marketing",   basic: 4200,  overtime: 0,   bonus: 500,  gross: 4700,  paye: 940,  niEmp: 320,  niEr: 444,  pension: 235, deductions: 1495, net: 3205 },
  { name: "Aiden Foster",     dept: "Operations",  basic: 3800,  overtime: 180, bonus: 0,    gross: 3980,  paye: 756,  niEmp: 278,  niEr: 388,  pension: 199, deductions: 1233, net: 2747 },
  { name: "Noah Campbell",    dept: "Sales",       basic: 4800,  overtime: 0,   bonus: 2400, gross: 7200,  paye: 1710, niEmp: 572,  niEr: 798,  pension: 360, deductions: 2642, net: 4558 },
  { name: "Grace Bennett",    dept: "Finance",     basic: 5200,  overtime: 0,   bonus: 0,    gross: 5200,  paye: 1196, niEmp: 397,  niEr: 554,  pension: 260, deductions: 1853, net: 3347 },
  { name: "Oliver Hughes",    dept: "Finance",     basic: 5500,  overtime: 0,   bonus: 0,    gross: 5500,  paye: 1270, niEmp: 422,  niEr: 589,  pension: 275, deductions: 1967, net: 3533 },
  { name: "Fatima Al-Zahra", dept: "Engineering", basic: 6200,  overtime: 0,   bonus: 0,    gross: 6200,  paye: 1436, niEmp: 472,  niEr: 658,  pension: 310, deductions: 2218, net: 3982 },
  { name: "Marcus Williams",  dept: "Sales",       basic: 7200,  overtime: 0,   bonus: 2000, gross: 9200,  paye: 2350, niEmp: 760,  niEr: 1060, pension: 460, deductions: 3570, net: 5630 },
  { name: "Lena Cruz",        dept: "Engineering", basic: 5800,  overtime: 0,   bonus: 0,    gross: 5800,  paye: 1340, niEmp: 442,  niEr: 618,  pension: 290, deductions: 2072, net: 3728 },
  { name: "Ravi Patel",       dept: "Engineering", basic: 6000,  overtime: 0,   bonus: 0,    gross: 6000,  paye: 1380, niEmp: 452,  niEr: 632,  pension: 300, deductions: 2132, net: 3868 },
  { name: "Olivia Wright",    dept: "Product",     basic: 7500,  overtime: 0,   bonus: 0,    gross: 7500,  paye: 1850, niEmp: 600,  niEr: 838,  pension: 375, deductions: 2825, net: 4675 },
  { name: "Katie Walsh",      dept: "Operations",  basic: 3600,  overtime: 120, bonus: 0,    gross: 3720,  paye: 692,  niEmp: 252,  niEr: 352,  pension: 186, deductions: 1130, net: 2590 },
  { name: "Niamh Kelly",      dept: "Finance",     basic: 4000,  overtime: 0,   bonus: 0,    gross: 4000,  paye: 780,  niEmp: 288,  niEr: 402,  pension: 200, deductions: 1268, net: 2732 },
  { name: "Leon Davies",      dept: "HR",          basic: 3800,  overtime: 0,   bonus: 0,    gross: 3800,  paye: 716,  niEmp: 268,  niEr: 374,  pension: 190, deductions: 1174, net: 2626 },
  { name: "Chloe Adams",      dept: "HR",          basic: 3200,  overtime: 0,   bonus: 0,    gross: 3200,  paye: 540,  niEmp: 210,  niEr: 294,  pension: 160, deductions: 910,  net: 2290 },
]

const fmt = (n: number) => `£${n.toLocaleString()}`

const totals = employees.reduce((acc, e) => ({
  basic:      acc.basic      + e.basic,
  overtime:   acc.overtime   + e.overtime,
  bonus:      acc.bonus      + e.bonus,
  gross:      acc.gross      + e.gross,
  paye:       acc.paye       + e.paye,
  niEmp:      acc.niEmp      + e.niEmp,
  niEr:       acc.niEr       + e.niEr,
  pension:    acc.pension    + e.pension,
  deductions: acc.deductions + e.deductions,
  net:        acc.net        + e.net,
}), { basic: 0, overtime: 0, bonus: 0, gross: 0, paye: 0, niEmp: 0, niEr: 0, pension: 0, deductions: 0, net: 0 })

const RUN_INFO: Record<string, any> = {
  "PR-2026-06": { period: "June 2026",  status: "Draft",     payDate: "25 Jun 2026" },
  "PR-2026-05": { period: "May 2026",   status: "Paid",      payDate: "25 May 2026" },
  "PR-2026-04": { period: "April 2026", status: "Paid",      payDate: "25 Apr 2026" },
}

export default function PayrollRunDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const run = RUN_INFO[id] || { period: id, status: "Draft", payDate: "25 Jun 2026" }
  const [tab, setTab] = useState("Employees")

  const statusStyle: Record<string, string> = {
    Draft:      "bg-[#f59e0b]/10 text-[#f59e0b]",
    Paid:       "bg-[#10b981]/10 text-[#10b981]",
    Processing: "bg-[var(--primary)]/10 text-[var(--primary)]",
    Approved:   "bg-[#06b6d4]/10 text-[#06b6d4]",
  }

  return (
    <div className="p-6 space-y-5 max-w-[1800px] mx-auto">
      {/* Header */}
      <div className="flex items-start gap-4">
        <Link href="/app/people/payroll" className="mt-1 p-1.5 rounded-md border border-[var(--border)] hover:bg-[var(--muted)]">
          <ArrowLeft className="h-4 w-4 text-[var(--foreground)]" />
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-2xl font-bold text-[var(--foreground)]">Payroll Run — {run.period}</h1>
            <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium", statusStyle[run.status])}>{run.status}</span>
          </div>
          <p className="text-sm text-[var(--muted-foreground)] mt-0.5">Run ID: {id} · Pay Date: {run.payDate}</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {run.status === "Draft" && (
            <>
              <button className="inline-flex items-center gap-1.5 rounded-md border border-[var(--border)] px-3 py-2 text-sm hover:bg-[var(--muted)]">
                <Edit className="h-4 w-4" />Edit
              </button>
              <button className="inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium text-white hover:opacity-90" style={{ background: "var(--primary)" }}>
                <Send className="h-4 w-4" />Submit for Approval
              </button>
            </>
          )}
          {run.status === "Approved" && (
            <button className="inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium text-white hover:opacity-90" style={{ background: "#10b981" }}>
              <CreditCard className="h-4 w-4" />Process Payment
            </button>
          )}
          <button className="inline-flex items-center gap-1.5 rounded-md border border-[var(--border)] px-3 py-2 text-sm hover:bg-[var(--muted)]">
            <Download className="h-4 w-4" />Export
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { label: "Total Gross",      value: fmt(totals.gross),      color: "var(--foreground)" },
          { label: "Total PAYE",       value: fmt(totals.paye),       color: "#ef4444" },
          { label: "Employee NI",      value: fmt(totals.niEmp),      color: "#f59e0b" },
          { label: "Employer NI",      value: fmt(totals.niEr),       color: "#f59e0b" },
          { label: "Pension",          value: fmt(totals.pension),    color: "#8b5cf6" },
          { label: "Total Net Pay",    value: fmt(totals.net),        color: "#10b981" },
        ].map(s => (
          <div key={s.label} className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-4">
            <p className="text-xs text-[var(--muted-foreground)]">{s.label}</p>
            <p className="text-lg font-bold mt-1" style={{ color: s.color }}>{s.value}</p>
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

      {/* Employees Tab */}
      {tab === "Employees" && (
        <div className="rounded-xl border border-[var(--border)] overflow-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-[var(--muted)] border-b border-[var(--border)]">
                {["Employee", "Department", "Basic Pay", "Overtime", "Bonus", "Gross Pay", "PAYE", "NI (Emp)", "NI (Er)", "Pension", "Deductions", "Net Pay"].map(h => (
                  <th key={h} className="text-left px-3 py-3 font-semibold text-[var(--muted-foreground)] whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {employees.map((e, i) => (
                <tr key={i} className="hover:bg-[var(--muted)] transition-colors">
                  <td className="px-3 py-3 font-medium text-[var(--foreground)] whitespace-nowrap">{e.name}</td>
                  <td className="px-3 py-3 text-[var(--muted-foreground)]">{e.dept}</td>
                  <td className="px-3 py-3 text-[var(--foreground)]">{fmt(e.basic)}</td>
                  <td className="px-3 py-3 text-[var(--foreground)]">{e.overtime > 0 ? fmt(e.overtime) : "—"}</td>
                  <td className="px-3 py-3 text-[var(--foreground)]">{e.bonus > 0 ? fmt(e.bonus) : "—"}</td>
                  <td className="px-3 py-3 font-semibold text-[var(--foreground)]">{fmt(e.gross)}</td>
                  <td className="px-3 py-3" style={{ color: "#ef4444" }}>{fmt(e.paye)}</td>
                  <td className="px-3 py-3" style={{ color: "#f59e0b" }}>{fmt(e.niEmp)}</td>
                  <td className="px-3 py-3" style={{ color: "#f97316" }}>{fmt(e.niEr)}</td>
                  <td className="px-3 py-3" style={{ color: "#8b5cf6" }}>{fmt(e.pension)}</td>
                  <td className="px-3 py-3 text-[var(--muted-foreground)]">{fmt(e.deductions)}</td>
                  <td className="px-3 py-3 font-bold" style={{ color: "#10b981" }}>{fmt(e.net)}</td>
                </tr>
              ))}
              {/* Totals Row */}
              <tr className="bg-[var(--muted)] border-t-2 border-[var(--border)] font-bold">
                <td className="px-3 py-3 text-[var(--foreground)]">TOTALS</td>
                <td className="px-3 py-3 text-[var(--muted-foreground)]">{employees.length} employees</td>
                <td className="px-3 py-3 text-[var(--foreground)]">{fmt(totals.basic)}</td>
                <td className="px-3 py-3 text-[var(--foreground)]">{fmt(totals.overtime)}</td>
                <td className="px-3 py-3 text-[var(--foreground)]">{fmt(totals.bonus)}</td>
                <td className="px-3 py-3 text-[var(--foreground)]">{fmt(totals.gross)}</td>
                <td className="px-3 py-3" style={{ color: "#ef4444" }}>{fmt(totals.paye)}</td>
                <td className="px-3 py-3" style={{ color: "#f59e0b" }}>{fmt(totals.niEmp)}</td>
                <td className="px-3 py-3" style={{ color: "#f97316" }}>{fmt(totals.niEr)}</td>
                <td className="px-3 py-3" style={{ color: "#8b5cf6" }}>{fmt(totals.pension)}</td>
                <td className="px-3 py-3 text-[var(--muted-foreground)]">{fmt(totals.deductions)}</td>
                <td className="px-3 py-3" style={{ color: "#10b981" }}>{fmt(totals.net)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* Summary Tab */}
      {tab === "Summary" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl">
          {[
            { label: "Total Gross Pay",         value: fmt(totals.gross)      },
            { label: "Total PAYE (HMRC)",        value: fmt(totals.paye)       },
            { label: "Total Employee NI",        value: fmt(totals.niEmp)      },
            { label: "Total Employer NI",        value: fmt(totals.niEr)       },
            { label: "Total Pension (Emp)",      value: fmt(totals.pension)    },
            { label: "Total Deductions",         value: fmt(totals.deductions) },
            { label: "Total Net Pay",            value: fmt(totals.net)        },
            { label: "Total Employer Cost",      value: fmt(totals.gross + totals.niEr + totals.pension) },
          ].map(s => (
            <div key={s.label} className="flex items-center justify-between rounded-lg border border-[var(--border)] bg-[var(--background)] p-4">
              <span className="text-sm text-[var(--muted-foreground)]">{s.label}</span>
              <span className="text-sm font-bold text-[var(--foreground)]">{s.value}</span>
            </div>
          ))}
        </div>
      )}

      {/* BACS File */}
      {tab === "BACS File" && (
        <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-[var(--foreground)]">BACS Payment File</h3>
            <button className="inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium text-white hover:opacity-90" style={{ background: "var(--primary)" }}>
              <Download className="h-4 w-4" />Download BACS File
            </button>
          </div>
          <div className="space-y-2">
            {[
              { label: "Format",        value: "Standard 18 (BACS)" },
              { label: "Transactions",  value: `${employees.length} payments` },
              { label: "Total Value",   value: fmt(totals.net) },
              { label: "Processing Date", value: run.payDate },
              { label: "Service User",  value: "ORBAS LTD — 12-34-56" },
            ].map(s => (
              <div key={s.label} className="flex items-center justify-between py-2 border-b border-[var(--border)] last:border-0">
                <span className="text-sm text-[var(--muted-foreground)]">{s.label}</span>
                <span className="text-sm font-medium text-[var(--foreground)]">{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Pension */}
      {tab === "Pension" && (
        <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-6 space-y-4">
          <h3 className="font-semibold text-[var(--foreground)]">Pension Contributions — {run.period}</h3>
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Employee Contributions", value: fmt(totals.pension) },
              { label: "Employer Contributions", value: fmt(Math.round(totals.pension * 0.8)) },
              { label: "Total to Nest",          value: fmt(Math.round(totals.pension * 1.8)) },
            ].map(s => (
              <div key={s.label} className="rounded-lg border border-[var(--border)] p-4">
                <p className="text-xs text-[var(--muted-foreground)]">{s.label}</p>
                <p className="text-xl font-bold text-[var(--foreground)] mt-1">{s.value}</p>
              </div>
            ))}
          </div>
          <button className="inline-flex items-center gap-1.5 rounded-md border border-[var(--border)] px-3 py-2 text-sm hover:bg-[var(--muted)]">
            <FileText className="h-4 w-4" />Export Pension File
          </button>
        </div>
      )}

      {/* Audit */}
      {tab === "Audit" && (
        <div className="rounded-xl border border-[var(--border)] overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[var(--muted)] border-b border-[var(--border)]">
                {["Action", "By", "Date/Time", "Detail"].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {[
                { action: "Payroll run created",       by: "Emma Thornton",  dt: "1 Jun 2026 09:00",  detail: `${run.period} — ${employees.length} employees` },
                { action: "Earnings imported",         by: "System",          dt: "1 Jun 2026 09:01",  detail: "Salary data synced from HR records" },
                { action: "Overtime entries added",    by: "Emma Thornton",  dt: "2 Jun 2026 11:30",  detail: "3 employees with overtime" },
                { action: "Bonus payments added",      by: "Grace Bennett",  dt: "3 Jun 2026 14:00",  detail: "2 sales bonuses" },
                { action: "Deductions calculated",     by: "System",          dt: "3 Jun 2026 14:01",  detail: "PAYE, NI, Pension computed" },
                { action: "Payroll run reviewed",      by: "Daniel Roberts", dt: "5 Jun 2026 16:00",  detail: "CFO review — approved for submission" },
              ].map((a, i) => (
                <tr key={i} className="hover:bg-[var(--muted)] transition-colors">
                  <td className="px-4 py-3 font-medium text-[var(--foreground)]">{a.action}</td>
                  <td className="px-4 py-3 text-xs text-[var(--muted-foreground)]">{a.by}</td>
                  <td className="px-4 py-3 text-xs text-[var(--muted-foreground)] whitespace-nowrap">{a.dt}</td>
                  <td className="px-4 py-3 text-xs text-[var(--muted-foreground)]">{a.detail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
