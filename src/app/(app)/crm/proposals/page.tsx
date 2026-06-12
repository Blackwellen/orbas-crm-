"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, Eye, Edit, Copy, Trash2, Send, FileText } from "lucide-react"
import { formatCurrency, formatDate } from "@/lib/utils"

const proposals = [
  { id: "p1", number: "PRO-001", title: "Enterprise CRM Implementation", client: "Apex Capital Group", value: 48500, sentDate: "2026-06-01", expires: "2026-07-01", status: "Accepted" },
  { id: "p2", number: "PRO-002", title: "Annual SaaS Platform Licence", client: "Meridian Law LLP", value: 24000, sentDate: "2026-06-03", expires: "2026-07-03", status: "Viewed" },
  { id: "p3", number: "PRO-003", title: "Marketing Automation Suite", client: "NorthStar Retail", value: 15750, sentDate: "2026-06-05", expires: "2026-07-05", status: "Sent" },
  { id: "p4", number: "PRO-004", title: "HR & Payroll Integration", client: "Finsbury Consulting", value: 32000, sentDate: "2026-05-28", expires: "2026-06-28", status: "Expired" },
  { id: "p5", number: "PRO-005", title: "Data Analytics Dashboard", client: "Southbank Media", value: 11200, sentDate: "2026-06-07", expires: "2026-07-07", status: "Sent" },
  { id: "p6", number: "PRO-006", title: "Field Sales Mobile App", client: "BrightPath Energy", value: 19800, sentDate: "2026-06-08", expires: "2026-07-08", status: "Viewed" },
  { id: "p7", number: "PRO-007", title: "Customer Support Platform", client: "Albion Logistics", value: 8900, sentDate: "2026-06-09", expires: "2026-07-09", status: "Sent" },
  { id: "p8", number: "PRO-008", title: "E-commerce Integration", client: "Greenfield Brands", value: 27300, sentDate: "2026-06-10", expires: "2026-07-10", status: "Draft" },
  { id: "p9", number: "PRO-009", title: "Compliance & Risk Module", client: "Sterling Insurance", value: 42000, sentDate: "2026-05-20", expires: "2026-06-20", status: "Declined" },
  { id: "p10", number: "PRO-010", title: "Accounts Payable Automation", client: "Whitmore Partners", value: 13500, sentDate: "2026-05-25", expires: "2026-06-25", status: "Expired" },
  { id: "p11", number: "PRO-011", title: "Inventory & WMS Solution", client: "Harrington Industrial", value: 38700, sentDate: "2026-06-02", expires: "2026-07-02", status: "Accepted" },
  { id: "p12", number: "PRO-012", title: "Payroll Bureau Services", client: "Lakeside Hotels", value: 16200, sentDate: "2026-06-04", expires: "2026-07-04", status: "Viewed" },
  { id: "p13", number: "PRO-013", title: "Project Management Platform", client: "Quantum Architects", value: 22800, sentDate: "2026-06-06", expires: "2026-07-06", status: "Sent" },
  { id: "p14", number: "PRO-014", title: "Document Management System", client: "Crown Legal Group", value: 9450, sentDate: "2026-06-10", expires: "2026-07-10", status: "Draft" },
  { id: "p15", number: "PRO-015", title: "Service Desk & ITSM", client: "Parkway Housing Trust", value: 31000, sentDate: "2026-05-30", expires: "2026-06-30", status: "Viewed" },
]

const statusBadge = (s: string) => {
  const map: Record<string, { bg: string; color: string }> = {
    Draft:    { bg: "#f1f5f9", color: "#64748b" },
    Sent:     { bg: "#dbeafe", color: "#1d4ed8" },
    Viewed:   { bg: "#fef3c7", color: "#d97706" },
    Accepted: { bg: "#dcfce7", color: "#16a34a" },
    Declined: { bg: "#fee2e2", color: "#dc2626" },
    Expired:  { bg: "#f1f5f9", color: "#64748b" },
  }
  return map[s] ?? { bg: "#f1f5f9", color: "#64748b" }
}

export default function ProposalsPage() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")

  const filtered = proposals.filter(p => {
    const matchSearch = search === "" || p.title.toLowerCase().includes(search.toLowerCase()) || p.client.toLowerCase().includes(search.toLowerCase()) || p.number.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === "All" || p.status === statusFilter
    return matchSearch && matchStatus
  })

  const totalSent = proposals.filter(p => p.status !== "Draft").length
  const accepted = proposals.filter(p => p.status === "Accepted").length
  const pending = proposals.filter(p => p.status === "Sent" || p.status === "Viewed").length
  const winRate = Math.round((accepted / totalSent) * 100)

  return (
    <div className="p-6" style={{ color: "var(--foreground)" }}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Proposals</h1>
          <p className="text-sm mt-1" style={{ color: "var(--muted-foreground)" }}>Create, send, and track client proposals</p>
        </div>
        <Link href="/app/crm/proposals/new">
          <Button style={{ backgroundColor: "var(--primary)", color: "#fff" }}>
            <Plus className="w-4 h-4 mr-2" />
            New Proposal
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Sent", value: totalSent, color: "#1d4ed8" },
          { label: "Accepted", value: accepted, color: "#16a34a" },
          { label: "Pending Response", value: pending, color: "#d97706" },
          { label: "Win Rate", value: `${winRate}%`, color: "#7c3aed" },
        ].map(s => (
          <Card key={s.label} style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <CardContent className="p-4">
              <p className="text-xs mb-1" style={{ color: "var(--muted-foreground)" }}>{s.label}</p>
              <p className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex gap-3 mb-5">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "var(--muted-foreground)" }} />
          <Input
            placeholder="Search proposals..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-9"
            style={{ background: "var(--card)", border: "1px solid var(--border)" }}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {["All", "Draft", "Sent", "Viewed", "Accepted", "Declined", "Expired"].map(s => (
              <SelectItem key={s} value={s}>{s}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span className="text-sm self-center" style={{ color: "var(--muted-foreground)" }}>{filtered.length} results</span>
      </div>

      <Card style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
        <div style={{ overflowX: "auto" }}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)", background: "var(--secondary)" }}>
                {["Proposal #", "Title", "Client", "Value", "Sent Date", "Expires", "Status", "Actions"].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold" style={{ color: "var(--muted-foreground)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => {
                const badge = statusBadge(p.status)
                return (
                  <tr key={p.id} style={{ borderBottom: "1px solid var(--border)" }} className="hover:bg-[var(--secondary)] transition-colors">
                    <td className="px-4 py-3">
                      <Link href={`/app/crm/proposals/${p.id}`} className="font-mono text-xs font-semibold" style={{ color: "var(--primary)" }}>
                        {p.number}
                      </Link>
                    </td>
                    <td className="px-4 py-3 font-medium">{p.title}</td>
                    <td className="px-4 py-3" style={{ color: "var(--muted-foreground)" }}>{p.client}</td>
                    <td className="px-4 py-3 font-semibold">{formatCurrency(p.value)}</td>
                    <td className="px-4 py-3" style={{ color: "var(--muted-foreground)" }}>{formatDate(p.sentDate)}</td>
                    <td className="px-4 py-3" style={{ color: "var(--muted-foreground)" }}>{formatDate(p.expires)}</td>
                    <td className="px-4 py-3">
                      <span style={{ backgroundColor: badge.bg, color: badge.color, padding: "2px 8px", borderRadius: "9999px", fontSize: "12px", fontWeight: 500 }}>{p.status}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <Link href={`/app/crm/proposals/${p.id}`}>
                          <Button variant="ghost" size="sm" className="h-7 w-7 p-0"><Eye className="w-3.5 h-3.5" /></Button>
                        </Link>
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0"><Edit className="w-3.5 h-3.5" /></Button>
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0"><Copy className="w-3.5 h-3.5" /></Button>
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0"><Trash2 className="w-3.5 h-3.5" style={{ color: "var(--destructive)" }} /></Button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
