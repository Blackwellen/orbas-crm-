"use client"

import React, { useState } from "react"
import Link from "next/link"
import { ArrowLeft, ChevronRight, Check, Users, DollarSign, FileText, CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"

const STEPS = [
  { n: 1, label: "Pay Period",  icon: FileText },
  { n: 2, label: "Earnings",   icon: DollarSign },
  { n: 3, label: "Deductions", icon: DollarSign },
  { n: 4, label: "Summary",    icon: CheckCircle },
]

const earnings = [
  { name: "Alex Thompson",   dept: "Engineering", salary: 6000,  overtime: 0,   bonus: 0   },
  { name: "Sophie Clarke",   dept: "Marketing",   salary: 4200,  overtime: 0,   bonus: 500 },
  { name: "Aiden Foster",    dept: "Operations",  salary: 3800,  overtime: 180, bonus: 0   },
  { name: "Noah Campbell",   dept: "Sales",       salary: 4800,  overtime: 0,   bonus: 2400},
  { name: "Grace Bennett",   dept: "Finance",     salary: 5200,  overtime: 0,   bonus: 0   },
  { name: "Oliver Hughes",   dept: "Finance",     salary: 5500,  overtime: 0,   bonus: 0   },
  { name: "Fatima Al-Zahra",dept: "Engineering", salary: 6200,  overtime: 0,   bonus: 0   },
  { name: "Marcus Williams", dept: "Sales",       salary: 7200,  overtime: 0,   bonus: 2000},
  { name: "Lena Cruz",       dept: "Engineering", salary: 5800,  overtime: 0,   bonus: 0   },
  { name: "Ravi Patel",      dept: "Engineering", salary: 6000,  overtime: 0,   bonus: 0   },
  { name: "Olivia Wright",   dept: "Product",     salary: 7500,  overtime: 0,   bonus: 0   },
  { name: "Katie Walsh",     dept: "Operations",  salary: 3600,  overtime: 120, bonus: 0   },
  { name: "Niamh Kelly",     dept: "Finance",     salary: 4000,  overtime: 0,   bonus: 0   },
  { name: "Leon Davies",     dept: "HR",          salary: 3800,  overtime: 0,   bonus: 0   },
  { name: "Chloe Adams",     dept: "HR",          salary: 3200,  overtime: 0,   bonus: 0   },
]

const deductions = earnings.map(e => {
  const gross = e.salary + e.overtime + e.bonus
  const paye  = Math.round(gross * 0.23)
  const niEmp = Math.round(gross * 0.08)
  const pension = Math.round(gross * 0.05)
  return { ...e, gross, paye, niEmp, pension, total: paye + niEmp + pension }
})

const totalGross = deductions.reduce((s, e) => s + e.gross, 0)
const totalNet   = deductions.reduce((s, e) => s + (e.gross - e.total), 0)
const totalPAYE  = deductions.reduce((s, e) => s + e.paye, 0)
const totalNI    = deductions.reduce((s, e) => s + e.niEmp, 0)
const totalPension = deductions.reduce((s, e) => s + e.pension, 0)

const fmt = (n: number) => `£${n.toLocaleString()}`

export default function NewPayrollPage() {
  const [step, setStep] = useState(1)
  const [period, setPeriod] = useState("monthly")
  const [month, setMonth]   = useState("June 2026")
  const [payDate, setPayDate] = useState("2026-06-25")
  const [includeAll, setIncludeAll] = useState(true)

  return (
    <div className="p-6 space-y-6 max-w-[1200px] mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link href="/app/people/payroll" className="p-1.5 rounded-md border border-[var(--border)] hover:bg-[var(--muted)]">
          <ArrowLeft className="h-4 w-4 text-[var(--foreground)]" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-[var(--foreground)]">New Payroll Run</h1>
          <p className="text-sm text-[var(--muted-foreground)] mt-0.5">Create a new payroll run for your team</p>
        </div>
      </div>

      {/* Stepper */}
      <div className="flex items-center gap-2">
        {STEPS.map((s, i) => (
          <React.Fragment key={s.n}>
            <button
              onClick={() => s.n <= step && setStep(s.n)}
              className={cn(
                "flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors",
                step === s.n ? "bg-[var(--primary)] text-white" :
                s.n < step  ? "bg-[var(--primary)]/10 text-[var(--primary)]" :
                "bg-[var(--muted)] text-[var(--muted-foreground)]"
              )}
            >
              <div className={cn(
                "flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold",
                step === s.n ? "bg-white/20" : s.n < step ? "bg-[var(--primary)]/20" : ""
              )}>
                {s.n < step ? <Check className="h-3 w-3" /> : s.n}
              </div>
              {s.label}
            </button>
            {i < STEPS.length - 1 && <ChevronRight className="h-4 w-4 text-[var(--muted-foreground)] shrink-0" />}
          </React.Fragment>
        ))}
      </div>

      {/* Step 1 — Pay Period */}
      {step === 1 && (
        <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-6 space-y-5 max-w-xl">
          <h2 className="text-base font-semibold text-[var(--foreground)]">Step 1 — Select Pay Period</h2>

          <div className="space-y-2">
            <label className="text-sm font-medium text-[var(--foreground)]">Pay Frequency</label>
            <div className="flex items-center gap-3">
              {["monthly", "bi-weekly", "weekly"].map(f => (
                <label key={f} className={cn(
                  "flex items-center gap-2 cursor-pointer rounded-lg border px-4 py-3 text-sm transition-colors",
                  period === f ? "border-[var(--primary)] bg-[var(--primary)]/5 text-[var(--primary)] font-medium" : "border-[var(--border)] text-[var(--muted-foreground)]"
                )}>
                  <input type="radio" value={f} checked={period === f} onChange={() => setPeriod(f)} className="sr-only" />
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-[var(--foreground)]">Pay Period</label>
            <select value={month} onChange={e => setMonth(e.target.value)} className="w-full px-3 py-2.5 text-sm rounded-md border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]">
              {["June 2026", "July 2026", "August 2026", "September 2026"].map(m => <option key={m}>{m}</option>)}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-[var(--foreground)]">Pay Date</label>
            <input
              type="date"
              value={payDate}
              onChange={e => setPayDate(e.target.value)}
              className="w-full px-3 py-2.5 text-sm rounded-md border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
            />
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium text-[var(--foreground)]">Include Employees</label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={includeAll} onChange={e => setIncludeAll(e.target.checked)} className="h-4 w-4 rounded border-[var(--border)]" />
              <span className="text-sm text-[var(--foreground)]">All active employees (167)</span>
            </label>
            {!includeAll && (
              <p className="text-xs text-[var(--muted-foreground)]">Select employees on the next step</p>
            )}
          </div>

          <div className="pt-2 border-t border-[var(--border)] flex justify-end">
            <button onClick={() => setStep(2)} className="inline-flex items-center gap-1.5 rounded-md px-4 py-2.5 text-sm font-medium text-white hover:opacity-90" style={{ background: "var(--primary)" }}>
              Continue to Earnings <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 2 — Earnings */}
      {step === 2 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-[var(--foreground)]">Step 2 — Review Earnings</h2>
            <div className="flex items-center gap-2">
              <span className="text-xs text-[var(--muted-foreground)]">{earnings.length} employees · {fmt(totalGross)} gross total</span>
            </div>
          </div>
          <div className="rounded-xl border border-[var(--border)] overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[var(--muted)] border-b border-[var(--border)]">
                  {["Employee", "Department", "Basic Salary", "Overtime", "Bonus", "Gross Total"].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {earnings.map((e, i) => (
                  <tr key={i} className="hover:bg-[var(--muted)] transition-colors">
                    <td className="px-4 py-3 font-medium text-[var(--foreground)]">{e.name}</td>
                    <td className="px-4 py-3 text-xs text-[var(--muted-foreground)]">{e.dept}</td>
                    <td className="px-4 py-3 text-[var(--foreground)]">{fmt(e.salary)}</td>
                    <td className="px-4 py-3 text-[var(--foreground)]">{e.overtime > 0 ? fmt(e.overtime) : "—"}</td>
                    <td className="px-4 py-3 text-[var(--foreground)]">{e.bonus > 0 ? fmt(e.bonus) : "—"}</td>
                    <td className="px-4 py-3 font-semibold text-[var(--foreground)]">{fmt(e.salary + e.overtime + e.bonus)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between pt-2">
            <button onClick={() => setStep(1)} className="rounded-md border border-[var(--border)] px-4 py-2.5 text-sm text-[var(--foreground)] hover:bg-[var(--muted)]">Back</button>
            <button onClick={() => setStep(3)} className="inline-flex items-center gap-1.5 rounded-md px-4 py-2.5 text-sm font-medium text-white hover:opacity-90" style={{ background: "var(--primary)" }}>
              Continue to Deductions <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 3 — Deductions */}
      {step === 3 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-[var(--foreground)]">Step 3 — Review Deductions</h2>
          </div>
          <div className="rounded-xl border border-[var(--border)] overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[var(--muted)] border-b border-[var(--border)]">
                  {["Employee", "Gross Pay", "PAYE", "NI (Employee)", "Pension", "Total Deductions", "Net Pay"].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {deductions.map((e, i) => (
                  <tr key={i} className="hover:bg-[var(--muted)] transition-colors">
                    <td className="px-4 py-3 font-medium text-[var(--foreground)]">{e.name}</td>
                    <td className="px-4 py-3 font-semibold text-[var(--foreground)]">{fmt(e.gross)}</td>
                    <td className="px-4 py-3" style={{ color: "#ef4444" }}>{fmt(e.paye)}</td>
                    <td className="px-4 py-3" style={{ color: "#f59e0b" }}>{fmt(e.niEmp)}</td>
                    <td className="px-4 py-3" style={{ color: "#8b5cf6" }}>{fmt(e.pension)}</td>
                    <td className="px-4 py-3 text-[var(--muted-foreground)]">{fmt(e.total)}</td>
                    <td className="px-4 py-3 font-bold" style={{ color: "#10b981" }}>{fmt(e.gross - e.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between pt-2">
            <button onClick={() => setStep(2)} className="rounded-md border border-[var(--border)] px-4 py-2.5 text-sm text-[var(--foreground)] hover:bg-[var(--muted)]">Back</button>
            <button onClick={() => setStep(4)} className="inline-flex items-center gap-1.5 rounded-md px-4 py-2.5 text-sm font-medium text-white hover:opacity-90" style={{ background: "var(--primary)" }}>
              Review Summary <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 4 — Summary */}
      {step === 4 && (
        <div className="space-y-5">
          <h2 className="text-base font-semibold text-[var(--foreground)]">Step 4 — Summary & Submit</h2>
          <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-6 space-y-4 max-w-lg">
            <h3 className="font-semibold text-[var(--foreground)]">Payroll Summary</h3>
            {[
              { label: "Pay Period",          value: month },
              { label: "Pay Date",            value: payDate },
              { label: "Employees",           value: `${earnings.length}` },
              { label: "Gross Payroll",       value: fmt(totalGross) },
              { label: "Total PAYE",          value: fmt(totalPAYE) },
              { label: "Total Employee NI",   value: fmt(totalNI) },
              { label: "Total Pension",       value: fmt(totalPension) },
              { label: "Total Net Pay",       value: fmt(totalNet) },
            ].map(s => (
              <div key={s.label} className="flex items-center justify-between py-1.5 border-b border-[var(--border)] last:border-0">
                <span className="text-sm text-[var(--muted-foreground)]">{s.label}</span>
                <span className="text-sm font-semibold text-[var(--foreground)]">{s.value}</span>
              </div>
            ))}
          </div>
          <div className="rounded-xl border border-[#10b981]/30 bg-[#10b981]/5 p-4 max-w-lg">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 shrink-0 mt-0.5" style={{ color: "#10b981" }} />
              <div>
                <p className="text-sm font-semibold" style={{ color: "#10b981" }}>Ready to Submit</p>
                <p className="text-xs text-[var(--muted-foreground)] mt-0.5">All deductions have been calculated. Submitting will send this for HR approval before processing.</p>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={() => setStep(3)} className="rounded-md border border-[var(--border)] px-4 py-2.5 text-sm text-[var(--foreground)] hover:bg-[var(--muted)]">Back</button>
            <button className="inline-flex items-center gap-1.5 rounded-md px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90" style={{ background: "var(--primary)" }}>
              <CheckCircle className="h-4 w-4" />Submit for Approval
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
