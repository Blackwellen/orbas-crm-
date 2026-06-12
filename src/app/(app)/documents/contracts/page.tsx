"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Plus, ScrollText, Search, Filter, MoreHorizontal,
  TrendingUp, Clock, FileCheck, DollarSign, Eye, Edit, Download, Trash2
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { formatCurrency } from "@/lib/utils"

const CONTRACTS = [
  { id: "CON-001", name: "Enterprise Software Licence — DataVault Ltd",  counterparty: "DataVault Ltd",       type: "MSA",        value: 240000, startDate: "1 Jan 2026",  endDate: "31 Dec 2026", status: "Active",           owner: "James Orton" },
  { id: "CON-002", name: "NDA — ClearCloud Inc",                          counterparty: "ClearCloud Inc",      type: "NDA",        value: 0,      startDate: "15 Feb 2026", endDate: "14 Feb 2028", status: "Active",           owner: "Sarah Nkosi" },
  { id: "CON-003", name: "Consulting Services Agreement — Apex Analytics", counterparty: "Apex Analytics",    type: "Customer",   value: 85000,  startDate: "1 Mar 2026",  endDate: "31 Aug 2026", status: "Pending Signature", owner: "James Orton" },
  { id: "CON-004", name: "Supplier Framework — GreenRoot Logistics",       counterparty: "GreenRoot Logistics",type: "Supplier",   value: 320000, startDate: "1 Apr 2026",  endDate: "31 Mar 2027", status: "Under Review",     owner: "Rachel Moore" },
  { id: "CON-005", name: "Employment Agreement — Sara Collins",            counterparty: "Sara Collins",       type: "Employment", value: 62000,  startDate: "1 May 2026",  endDate: "30 Apr 2027", status: "Active",           owner: "Rachel Moore" },
  { id: "CON-006", name: "SLA — TechStack Ltd",                            counterparty: "TechStack Ltd",      type: "SLA",        value: 48000,  startDate: "1 Jan 2026",  endDate: "31 Dec 2026", status: "Active",           owner: "Sarah Nkosi" },
  { id: "CON-007", name: "Partnership MOU — MetaScale Co",                 counterparty: "MetaScale Co",       type: "Partnership",value: 0,      startDate: "1 Jun 2026",  endDate: "31 May 2027", status: "Draft",            owner: "James Orton" },
  { id: "CON-008", name: "Software Reseller Agreement — BrightTech",       counterparty: "BrightTech Ltd",     type: "MSA",        value: 175000, startDate: "1 Sep 2025",  endDate: "31 Aug 2026", status: "Expiring Soon",    owner: "James Orton" },
  { id: "CON-009", name: "Payroll Services — PeopleFirst HR",               counterparty: "PeopleFirst HR",     type: "Supplier",   value: 28000,  startDate: "1 Jan 2025",  endDate: "31 Dec 2025", status: "Expired",          owner: "Rachel Moore" },
  { id: "CON-010", name: "Data Processing Agreement — Horizon Finance",     counterparty: "Horizon Finance",    type: "MSA",        value: 0,      startDate: "1 Feb 2026",  endDate: "31 Jan 2028", status: "Active",           owner: "Sarah Nkosi" },
  { id: "CON-011", name: "Cloud Hosting SLA — SkyNet Corp",                 counterparty: "SkyNet Corp",        type: "SLA",        value: 96000,  startDate: "1 Mar 2026",  endDate: "28 Feb 2027", status: "Active",           owner: "James Orton" },
  { id: "CON-012", name: "Freelance Agreement — Design Studio X",           counterparty: "Design Studio X",    type: "Customer",   value: 15000,  startDate: "15 Apr 2026", endDate: "14 Jul 2026", status: "Terminated",       owner: "Rachel Moore" },
  { id: "CON-013", name: "NDA — TrueNorth Ventures",                        counterparty: "TrueNorth Ventures", type: "NDA",        value: 0,      startDate: "10 May 2026", endDate: "9 May 2028",  status: "Under Review",     owner: "Sarah Nkosi" },
  { id: "CON-014", name: "Employment Agreement — Noah Kim",                  counterparty: "Noah Kim",           type: "Employment", value: 54000,  startDate: "1 Jun 2026",  endDate: "31 May 2027", status: "Pending Signature", owner: "Rachel Moore" },
  { id: "CON-015", name: "Maintenance Contract — BuildRight Infra",          counterparty: "BuildRight Infra",   type: "Supplier",   value: 72000,  startDate: "1 Jul 2026",  endDate: "30 Jun 2027", status: "Draft",            owner: "James Orton" },
]

const STATUS_STYLES: Record<string, { bg: string; color: string }> = {
  "Draft":            { bg: "#f1f5f9", color: "#475569" },
  "Under Review":     { bg: "#dbeafe", color: "#1d4ed8" },
  "Active":           { bg: "#dcfce7", color: "#16a34a" },
  "Expired":          { bg: "#fee2e2", color: "#dc2626" },
  "Pending Signature":{ bg: "#fef3c7", color: "#d97706" },
  "Terminated":       { bg: "#fce7f3", color: "#be185d" },
  "Expiring Soon":    { bg: "#fef3c7", color: "#b45309" },
}

const CONTRACT_TYPES = ["All", "NDA", "MSA", "SLA", "Employment", "Supplier", "Customer", "Partnership"]
const CONTRACT_STATUSES = ["All", "Draft", "Under Review", "Active", "Expired", "Terminated", "Pending Signature"]

export default function ContractsPage() {
  const router = useRouter()
  const [search, setSearch] = useState("")
  const [filterStatus, setFilterStatus] = useState("All")
  const [filterType, setFilterType] = useState("All")

  const filtered = CONTRACTS.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.counterparty.toLowerCase().includes(search.toLowerCase()) ||
      c.id.toLowerCase().includes(search.toLowerCase())
    const matchStatus = filterStatus === "All" || c.status === filterStatus
    const matchType = filterType === "All" || c.type === filterType
    return matchSearch && matchStatus && matchType
  })

  const totalValue = CONTRACTS.reduce((sum, c) => sum + c.value, 0)
  const active = CONTRACTS.filter(c => c.status === "Active").length
  const expiring = CONTRACTS.filter(c => c.status === "Expiring Soon").length
  const avgValue = Math.round(CONTRACTS.filter(c => c.value > 0).reduce((s, c) => s + c.value, 0) / CONTRACTS.filter(c => c.value > 0).length)

  const stats = [
    { label: "Total Contracts", value: String(CONTRACTS.length),       icon: ScrollText,  color: "#1a56db" },
    { label: "Active",          value: String(active),                  icon: FileCheck,   color: "#16a34a" },
    { label: "Expiring Soon",   value: String(expiring),                icon: Clock,       color: "#d97706" },
    { label: "Avg Contract Value", value: formatCurrency(avgValue),     icon: DollarSign,  color: "#7c3aed" },
  ]

  return (
    <div className="p-6 space-y-6 max-w-[1400px] mx-auto">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>Contracts</h1>
          <p className="text-sm mt-0.5" style={{ color: "var(--muted-foreground)" }}>Manage the full lifecycle of your contracts</p>
        </div>
        <button
          onClick={() => router.push("/app/documents/contracts/new")}
          className="inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-white hover:opacity-90 transition-opacity"
          style={{ background: "var(--primary)" }}
        >
          <Plus size={16} /> New Contract
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map(s => {
          const Icon = s.icon
          return (
            <Card key={s.label} className="border" style={{ borderColor: "var(--border)" }}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-medium" style={{ color: "var(--muted-foreground)" }}>{s.label}</p>
                  <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: s.color + "22" }}>
                    <Icon size={14} style={{ color: s.color }} />
                  </div>
                </div>
                <p className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card className="border" style={{ borderColor: "var(--border)" }}>
        <CardContent className="p-4 border-b" style={{ borderColor: "var(--border)" }}>
          <div className="flex flex-wrap gap-3 items-center">
            <div className="relative flex-1 min-w-[200px]">
              <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2" style={{ color: "var(--muted-foreground)" }} />
              <input
                type="text"
                placeholder="Search contracts…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full h-9 rounded-md border pl-8 pr-3 text-sm outline-none"
                style={{ borderColor: "var(--border)", background: "var(--background)", color: "var(--foreground)" }}
              />
            </div>
            <select
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
              className="h-9 rounded-md border px-3 text-sm outline-none"
              style={{ borderColor: "var(--border)", background: "var(--background)", color: "var(--foreground)" }}
            >
              {CONTRACT_STATUSES.map(s => <option key={s} value={s}>{s === "All" ? "All Statuses" : s}</option>)}
            </select>
            <select
              value={filterType}
              onChange={e => setFilterType(e.target.value)}
              className="h-9 rounded-md border px-3 text-sm outline-none"
              style={{ borderColor: "var(--border)", background: "var(--background)", color: "var(--foreground)" }}
            >
              {CONTRACT_TYPES.map(t => <option key={t} value={t}>{t === "All" ? "All Types" : t}</option>)}
            </select>
          </div>
        </CardContent>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b" style={{ borderColor: "var(--border)", background: "var(--secondary)" }}>
                  {["Contract Name", "Counterparty", "Type", "Value", "Start Date", "End Date", "Status", "Owner", ""].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold" style={{ color: "var(--muted-foreground)" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(c => {
                  const ss = STATUS_STYLES[c.status] ?? STATUS_STYLES["Draft"]
                  return (
                    <tr
                      key={c.id}
                      className="border-b hover:opacity-90 transition-opacity cursor-pointer"
                      style={{ borderColor: "var(--border)" }}
                      onClick={() => router.push(`/app/documents/contracts/${c.id}`)}
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <ScrollText size={14} style={{ color: "var(--muted-foreground)" }} className="shrink-0" />
                          <div>
                            <p className="text-sm font-medium max-w-[260px] truncate" style={{ color: "var(--foreground)" }}>{c.name}</p>
                            <p className="text-[10px] font-mono" style={{ color: "var(--muted-foreground)" }}>{c.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm" style={{ color: "var(--foreground)" }}>{c.counterparty}</td>
                      <td className="px-4 py-3">
                        <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ background: "var(--secondary)", color: "var(--foreground)" }}>
                          {c.type}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm font-medium" style={{ color: "var(--foreground)" }}>
                        {c.value > 0 ? formatCurrency(c.value) : "—"}
                      </td>
                      <td className="px-4 py-3 text-xs" style={{ color: "var(--muted-foreground)" }}>{c.startDate}</td>
                      <td className="px-4 py-3 text-xs" style={{ color: "var(--muted-foreground)" }}>{c.endDate}</td>
                      <td className="px-4 py-3">
                        <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ background: ss.bg, color: ss.color }}>
                          {c.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm" style={{ color: "var(--foreground)" }}>{c.owner}</td>
                      <td className="px-4 py-3" onClick={e => e.stopPropagation()}>
                        <div className="flex items-center gap-1">
                          <button className="p-1 rounded hover:opacity-70" style={{ color: "var(--muted-foreground)" }} title="View" onClick={() => router.push(`/app/documents/contracts/${c.id}`)}>
                            <Eye size={14} />
                          </button>
                          <button className="p-1 rounded hover:opacity-70" style={{ color: "var(--muted-foreground)" }} title="Edit">
                            <Edit size={14} />
                          </button>
                          <button className="p-1 rounded hover:opacity-70" style={{ color: "var(--muted-foreground)" }} title="Download">
                            <Download size={14} />
                          </button>
                          <button className="p-1 rounded hover:opacity-70" style={{ color: "var(--muted-foreground)" }} title="More">
                            <MoreHorizontal size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <div className="p-12 text-center">
                <ScrollText size={32} className="mx-auto mb-3" style={{ color: "var(--muted-foreground)" }} />
                <p className="text-sm font-medium" style={{ color: "var(--foreground)" }}>No contracts found</p>
                <p className="text-xs mt-1" style={{ color: "var(--muted-foreground)" }}>Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
