"use client"

import React, { useState } from "react"
import { Plus, Search, Download, AlertCircle, CheckCircle, Clock } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn, getInitials } from "@/lib/utils"

const records = [
  { id: "REC-001", employee: "Alex Thompson",   dept: "Engineering", docType: "Right to Work",   reference: "PP-UK-2029",   issued: "1 Mar 2023",  expiry: "15 Mar 2029", status: "Valid" },
  { id: "REC-002", employee: "Alex Thompson",   dept: "Engineering", docType: "DBS Check",       reference: "DBS-2026-041", issued: "1 Aug 2024",  expiry: "1 Aug 2026",  status: "Expiring Soon" },
  { id: "REC-003", employee: "Sophie Clarke",   dept: "Marketing",   docType: "Employment Contract",reference: "CON-2021-088",issued: "1 Sep 2021", expiry: null,          status: "Valid" },
  { id: "REC-004", employee: "Sophie Clarke",   dept: "Marketing",   docType: "Right to Work",   reference: "PP-UK-2030",   issued: "3 Feb 2022",  expiry: "3 Feb 2030",  status: "Valid" },
  { id: "REC-005", employee: "Aiden Foster",    dept: "Operations",  docType: "Right to Work",   reference: "BRP-2025-F04", issued: "15 May 2022", expiry: "15 May 2025", status: "Expired" },
  { id: "REC-006", employee: "Noah Campbell",   dept: "Sales",       docType: "Driving Licence", reference: "CAMP-902345", issued: "5 Jan 2018",   expiry: "5 Jan 2028",  status: "Valid" },
  { id: "REC-007", employee: "Grace Bennett",   dept: "Finance",     docType: "Right to Work",   reference: "PP-UK-2028",   issued: "10 Jul 2022", expiry: "10 Jul 2028", status: "Valid" },
  { id: "REC-008", employee: "Grace Bennett",   dept: "Finance",     docType: "Professional Cert",reference: "ACCA-2024-GB",issued: "15 Jun 2024",  expiry: "15 Jun 2027", status: "Valid" },
  { id: "REC-009", employee: "Oliver Hughes",   dept: "Finance",     docType: "Right to Work",   reference: "PP-UK-2026",   issued: "20 Sep 2021", expiry: "20 Sep 2026", status: "Expiring Soon" },
  { id: "REC-010", employee: "Fatima Al-Zahra",dept: "Engineering", docType: "Right to Work",   reference: "BRP-2027-F01", issued: "1 Jan 2023",  expiry: "1 Jan 2027",  status: "Valid" },
  { id: "REC-011", employee: "Marcus Williams", dept: "Sales",       docType: "Employment Contract",reference: "CON-2019-012",issued: "1 Feb 2019", expiry: null,          status: "Valid" },
  { id: "REC-012", employee: "Lena Cruz",       dept: "Engineering", docType: "Right to Work",   reference: "PP-EU-2031",   issued: "4 Apr 2021",  expiry: "4 Apr 2031",  status: "Valid" },
  { id: "REC-013", employee: "Ravi Patel",      dept: "Engineering", docType: "Right to Work",   reference: "BRP-2026-R01", issued: "15 Aug 2022", expiry: "15 Aug 2026", status: "Expiring Soon" },
  { id: "REC-014", employee: "Olivia Wright",   dept: "Product",     docType: "DBS Check",       reference: "DBS-2025-055", issued: "1 May 2023",  expiry: "1 May 2025",  status: "Expired" },
  { id: "REC-015", employee: "Katie Walsh",     dept: "Operations",  docType: "Right to Work",   reference: "PP-UK-2029",   issued: "8 Nov 2023",  expiry: "8 Nov 2029",  status: "Valid" },
  { id: "REC-016", employee: "Niamh Kelly",     dept: "Finance",     docType: "Right to Work",   reference: "PP-IE-2027",   issued: "3 Mar 2022",  expiry: "3 Mar 2027",  status: "Valid" },
  { id: "REC-017", employee: "Leon Davies",     dept: "HR",          docType: "Right to Work",   reference: "PP-UK-2033",   issued: "10 Jun 2023", expiry: "10 Jun 2033", status: "Valid" },
  { id: "REC-018", employee: "Chloe Adams",     dept: "HR",          docType: "Right to Work",   reference: "PP-UK-2028",   issued: "5 Jan 2022",  expiry: "5 Jan 2028",  status: "Valid" },
  { id: "REC-019", employee: "Ryan Thompson",   dept: "Operations",  docType: "DBS Check",       reference: "DBS-2025-072", issued: "12 Jul 2023", expiry: "12 Jul 2025", status: "Expired" },
  { id: "REC-020", employee: "Harriet Stone",   dept: "Finance",     docType: "Professional Cert",reference: "ICAEW-2025-H",issued: "5 Mar 2022",  expiry: "5 Mar 2025",  status: "Expired" },
  { id: "REC-021", employee: "Sam Okafor",      dept: "Operations",  docType: "Right to Work",   reference: "BRP-2028-S01", issued: "20 Feb 2023", expiry: "20 Feb 2028", status: "Valid" },
  { id: "REC-022", employee: "Priya Sharma",    dept: "HR",          docType: "Right to Work",   reference: "BRP-2027-P01", issued: "12 Oct 2022", expiry: "12 Oct 2027", status: "Valid" },
]

const docTypes = ["All Types", "Right to Work", "DBS Check", "Employment Contract", "Professional Cert", "Driving Licence"]
const depts    = ["All Departments", "Engineering", "Finance", "HR", "Marketing", "Operations", "Product", "Sales"]
const statuses = ["All", "Valid", "Expiring Soon", "Expired", "Missing"]

const statusStyle: Record<string, { bg: string; text: string; icon: any }> = {
  Valid:          { bg: "bg-[#10b981]/10", text: "text-[#10b981]", icon: CheckCircle },
  "Expiring Soon":{ bg: "bg-[#f59e0b]/10", text: "text-[#f59e0b]", icon: Clock },
  Expired:        { bg: "bg-[#ef4444]/10", text: "text-[#ef4444]", icon: AlertCircle },
  Missing:        { bg: "bg-[var(--muted)]", text: "text-[var(--muted-foreground)]", icon: AlertCircle },
}

export default function RecordsPage() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [typeFilter, setTypeFilter] = useState("All Types")
  const [deptFilter, setDeptFilter] = useState("All Departments")

  const totalRecords   = records.length
  const expiring30     = records.filter(r => r.status === "Expiring Soon").length
  const expired        = records.filter(r => r.status === "Expired").length

  const filtered = records.filter(r => {
    const matchSearch = r.employee.toLowerCase().includes(search.toLowerCase()) || r.docType.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === "All" || r.status === statusFilter
    const matchType   = typeFilter === "All Types" || r.docType === typeFilter
    const matchDept   = deptFilter === "All Departments" || r.dept === deptFilter
    return matchSearch && matchStatus && matchType && matchDept
  })

  return (
    <div className="p-6 space-y-5 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-[var(--foreground)]">Records</h1>
          <p className="text-sm text-[var(--muted-foreground)] mt-0.5">Employee document register — right to work, certificates, contracts</p>
        </div>
        <button className="inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium text-white hover:opacity-90" style={{ background: "var(--primary)" }}>
          <Plus className="h-4 w-4" />Upload Document
        </button>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total Records",           value: totalRecords, icon: CheckCircle,  color: "var(--primary)" },
          { label: "Expiring within 30 days", value: expiring30,   icon: Clock,        color: "#f59e0b" },
          { label: "Expired (action required)",value: expired,     icon: AlertCircle,  color: "#ef4444" },
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

      {/* Filters */}
      <div className="flex items-center gap-2 flex-wrap">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[var(--muted-foreground)]" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search employee or doc type…" className="w-full pl-8 pr-3 py-1.5 text-sm rounded-md border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]" />
        </div>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="px-3 py-1.5 text-sm rounded-md border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] focus:outline-none">
          {statuses.map(s => <option key={s}>{s}</option>)}
        </select>
        <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} className="px-3 py-1.5 text-sm rounded-md border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] focus:outline-none">
          {docTypes.map(t => <option key={t}>{t}</option>)}
        </select>
        <select value={deptFilter} onChange={e => setDeptFilter(e.target.value)} className="px-3 py-1.5 text-sm rounded-md border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] focus:outline-none">
          {depts.map(d => <option key={d}>{d}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-[var(--border)] overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[var(--muted)] border-b border-[var(--border)]">
              {["Employee", "Document Type", "Reference", "Issue Date", "Expiry Date", "Status", "Actions"].map(h => (
                <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)] whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]">
            {filtered.map(rec => {
              const s = statusStyle[rec.status] || statusStyle.Valid
              return (
                <tr key={rec.id} className="hover:bg-[var(--muted)] transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="text-[10px] bg-[var(--primary)]/10 text-[var(--primary)]">{getInitials(rec.employee)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium text-[var(--foreground)]">{rec.employee}</p>
                        <p className="text-[10px] text-[var(--muted-foreground)]">{rec.dept}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-[var(--foreground)]">{rec.docType}</td>
                  <td className="px-4 py-3 text-xs font-mono text-[var(--muted-foreground)]">{rec.reference}</td>
                  <td className="px-4 py-3 text-xs text-[var(--muted-foreground)] whitespace-nowrap">{rec.issued}</td>
                  <td className="px-4 py-3 text-xs text-[var(--muted-foreground)] whitespace-nowrap">{rec.expiry || "N/A"}</td>
                  <td className="px-4 py-3">
                    <span className={cn("inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium", s.bg, s.text)}>
                      <s.icon className="h-3 w-3" />{rec.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button className="text-xs text-[var(--primary)] hover:underline flex items-center gap-1">
                        <Download className="h-3.5 w-3.5" />Download
                      </button>
                      {rec.status === "Expired" && (
                        <button className="text-xs font-medium hover:underline" style={{ color: "#ef4444" }}>Renew</button>
                      )}
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
