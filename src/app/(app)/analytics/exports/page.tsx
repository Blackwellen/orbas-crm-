"use client"

import React, { useState } from "react"
import { Download, FileText, Table, RefreshCw, Clock, CheckCircle, XCircle, Loader } from "lucide-react"
import { cn } from "@/lib/utils"

const exports = [
  { id: "1", name: "Revenue Report Q4 2025", type: "Excel", size: "2.4 MB", status: "ready", created: "Today 09:14", rows: 4820 },
  { id: "2", name: "CRM Pipeline Export", type: "CSV", size: "840 KB", status: "ready", created: "Today 08:30", rows: 1246 },
  { id: "3", name: "Customer List Full", type: "CSV", size: "1.1 MB", status: "ready", created: "Yesterday", rows: 3120 },
  { id: "4", name: "Invoice Archive 2025", type: "Excel", size: "5.2 MB", status: "processing", created: "Yesterday", rows: null },
  { id: "5", name: "Payroll Summary Nov", type: "PDF", size: "320 KB", status: "ready", created: "2 days ago", rows: 48 },
  { id: "6", name: "Lead Source Analysis", type: "Excel", size: "980 KB", status: "failed", created: "3 days ago", rows: null },
  { id: "7", name: "Service Ticket Audit", type: "CSV", size: "2.1 MB", status: "ready", created: "1 week ago", rows: 5640 },
  { id: "8", name: "HR Records Export", type: "Excel", size: "1.8 MB", status: "expired", created: "2 weeks ago", rows: 162 },
]

const statusConfig: Record<string, { label: string; bg: string; color: string; icon: React.ElementType }> = {
  ready:      { label: "Ready",      bg: "#dcfce7", color: "#16a34a", icon: CheckCircle },
  processing: { label: "Processing", bg: "#fef9c3", color: "#d97706", icon: Loader },
  failed:     { label: "Failed",     bg: "#fee2e2", color: "#dc2626", icon: XCircle },
  expired:    { label: "Expired",    bg: "#f3f4f6", color: "#6b7280", icon: Clock },
}

const exportFormats = [
  { id: "csv",   label: "CSV",         icon: Table,    desc: "Comma-separated values, ideal for spreadsheets" },
  { id: "excel", label: "Excel (.xlsx)", icon: FileText, desc: "Microsoft Excel with formatting" },
  { id: "pdf",   label: "PDF",         icon: FileText, desc: "Print-ready formatted report" },
  { id: "json",  label: "JSON",        icon: Table,    desc: "Structured data for developers" },
]

export default function ExportsPage() {
  const [format, setFormat] = useState("csv")
  const [dataset, setDataset] = useState("crm_leads")

  return (
    <div className="p-6 space-y-6 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-[var(--foreground)]">Exports</h1>
          <p className="text-sm text-[var(--muted-foreground)] mt-0.5">Export data from any module as CSV, Excel or PDF</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* New Export Panel */}
        <div className="lg:col-span-1 rounded-xl border border-[var(--border)] bg-[var(--background)] p-5 h-fit">
          <h2 className="text-sm font-semibold text-[var(--foreground)] mb-4">New Export</h2>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-medium text-[var(--muted-foreground)] block mb-2">Dataset</label>
              <select
                value={dataset}
                onChange={e => setDataset(e.target.value)}
                className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-[var(--foreground)] outline-none focus:border-[var(--primary)]"
              >
                <option value="crm_leads">CRM — Leads</option>
                <option value="crm_contacts">CRM — Contacts</option>
                <option value="crm_deals">CRM — Deals</option>
                <option value="acc_invoices">Accounting — Invoices</option>
                <option value="acc_payments">Accounting — Payments</option>
                <option value="hr_employees">People — Employees</option>
                <option value="service_tickets">Service — Tickets</option>
                <option value="projects">Projects</option>
                <option value="ops_inventory">Operations — Inventory</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-medium text-[var(--muted-foreground)] block mb-2">Date Range</label>
              <div className="flex gap-2">
                <input type="date" className="flex-1 rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-[var(--foreground)] outline-none focus:border-[var(--primary)]" defaultValue="2025-11-01" />
                <input type="date" className="flex-1 rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-[var(--foreground)] outline-none focus:border-[var(--primary)]" defaultValue="2025-12-31" />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-[var(--muted-foreground)] block mb-2">Format</label>
              <div className="grid grid-cols-2 gap-2">
                {exportFormats.map(f => (
                  <button
                    key={f.id}
                    onClick={() => setFormat(f.id)}
                    className={cn(
                      "flex flex-col items-start p-3 rounded-lg border text-left transition-all",
                      format === f.id
                        ? "border-[var(--primary)] bg-[var(--primary)]/5"
                        : "border-[var(--border)] hover:border-[var(--primary)]/50"
                    )}
                  >
                    <f.icon className="h-4 w-4 mb-1" style={{ color: format === f.id ? 'var(--primary)' : 'var(--muted-foreground)' }} />
                    <span className="text-xs font-medium text-[var(--foreground)]">{f.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-[var(--muted-foreground)] block mb-2">Fields</label>
              <button className="w-full text-left px-3 py-2 rounded-lg border border-[var(--border)] text-sm text-[var(--muted-foreground)] hover:border-[var(--primary)] transition-colors">
                All fields selected (click to customize)
              </button>
            </div>

            <button className="w-full rounded-lg bg-[var(--primary)] px-4 py-2.5 text-sm font-medium text-white hover:opacity-90 flex items-center justify-center gap-2">
              <Download className="h-4 w-4" />
              Generate Export
            </button>
          </div>
        </div>

        {/* Export History */}
        <div className="lg:col-span-2 rounded-xl border border-[var(--border)] bg-[var(--background)]">
          <div className="flex items-center justify-between p-5 pb-3 border-b border-[var(--border)]">
            <h2 className="text-sm font-semibold text-[var(--foreground)]">Export History</h2>
            <button className="flex items-center gap-1.5 text-xs text-[var(--muted-foreground)] hover:text-[var(--foreground)]">
              <RefreshCw className="h-3.5 w-3.5" /> Refresh
            </button>
          </div>
          <div className="divide-y divide-[var(--border)]">
            {exports.map(exp => {
              const cfg = statusConfig[exp.status]
              const Icon = cfg.icon
              return (
                <div key={exp.id} className="flex items-center gap-4 px-5 py-3.5 hover:bg-[var(--secondary)] transition-colors">
                  <div className="h-9 w-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'var(--secondary)' }}>
                    <FileText className="h-4 w-4 text-[var(--primary)]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[var(--foreground)] truncate">{exp.name}</p>
                    <div className="flex items-center gap-3 mt-0.5">
                      <span className="text-xs text-[var(--muted-foreground)]">{exp.type}</span>
                      {exp.size && <span className="text-xs text-[var(--muted-foreground)]">{exp.size}</span>}
                      {exp.rows && <span className="text-xs text-[var(--muted-foreground)]">{exp.rows.toLocaleString()} rows</span>}
                      <span className="text-xs text-[var(--muted-foreground)]">{exp.created}</span>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium" style={{ background: cfg.bg, color: cfg.color }}>
                    <Icon className="h-3 w-3" />
                    {cfg.label}
                  </span>
                  {exp.status === "ready" && (
                    <button className="ml-2 p-1.5 rounded-md hover:bg-[var(--secondary)] transition-colors" title="Download">
                      <Download className="h-4 w-4 text-[var(--primary)]" />
                    </button>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
