"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Plus, PenTool, Clock, CheckCircle, XCircle, AlertCircle,
  FileText, Send, Eye, MoreHorizontal, RefreshCw, Download
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const SIGNATURE_REQUESTS = [
  {
    id: "SIG-001", document: "Enterprise Services Agreement — DataVault Ltd", signers: ["Jordan Clarke", "Emma Watts", "Legal Team"],
    status: "Partially Signed", sentDate: "8 Jun 2026", dueDate: "15 Jun 2026", completedDate: null, sentBy: "James Orton",
    signerStatus: [
      { name: "Jordan Clarke", email: "jordan@datavault.com", signed: true,  signedAt: "8 Jun 2026, 14:30" },
      { name: "Emma Watts",    email: "emma@datavault.com",   signed: false, signedAt: null },
      { name: "Legal Team",    email: "legal@datavault.com",  signed: false, signedAt: null },
    ],
  },
  {
    id: "SIG-002", document: "Software NDA — ClearCloud Inc", signers: ["Oliver Grant"],
    status: "Completed", sentDate: "5 Jun 2026", dueDate: "12 Jun 2026", completedDate: "6 Jun 2026", sentBy: "Sarah Nkosi",
    signerStatus: [
      { name: "Oliver Grant", email: "oliver@clearcloud.com", signed: true, signedAt: "6 Jun 2026, 09:14" },
    ],
  },
  {
    id: "SIG-003", document: "Consulting Proposal — Apex Analytics", signers: ["Mia Nguyen", "CFO Apex"],
    status: "Sent", sentDate: "7 Jun 2026", dueDate: "14 Jun 2026", completedDate: null, sentBy: "James Orton",
    signerStatus: [
      { name: "Mia Nguyen", email: "mia@apexanalytics.com", signed: false, signedAt: null },
      { name: "CFO Apex",   email: "cfo@apexanalytics.com", signed: false, signedAt: null },
    ],
  },
  {
    id: "SIG-004", document: "Vendor Onboarding Agreement — TechStack Ltd", signers: ["Noah Kim"],
    status: "Expired", sentDate: "1 May 2026", dueDate: "15 May 2026", completedDate: null, sentBy: "Rachel Moore",
    signerStatus: [
      { name: "Noah Kim", email: "noah@techstack.com", signed: false, signedAt: null },
    ],
  },
  {
    id: "SIG-005", document: "Employment Contract — Sara Collins", signers: ["Sara Collins", "HR Director"],
    status: "Completed", sentDate: "20 May 2026", dueDate: "27 May 2026", completedDate: "22 May 2026", sentBy: "Rachel Moore",
    signerStatus: [
      { name: "Sara Collins",  email: "sara@orbas.com",    signed: true, signedAt: "22 May 2026, 10:01" },
      { name: "HR Director",   email: "hr@orbas.com",      signed: true, signedAt: "22 May 2026, 16:45" },
    ],
  },
  {
    id: "SIG-006", document: "Partnership Agreement — MetaScale Co", signers: ["Sophia Lewis"],
    status: "Draft", sentDate: "—", dueDate: "—", completedDate: null, sentBy: "James Orton",
    signerStatus: [
      { name: "Sophia Lewis", email: "sophia@metascale.com", signed: false, signedAt: null },
    ],
  },
  {
    id: "SIG-007", document: "MSA — Horizon Finance Group", signers: ["Daniel Wright", "Horizon Legal"],
    status: "Sent", sentDate: "9 Jun 2026", dueDate: "16 Jun 2026", completedDate: null, sentBy: "Sarah Nkosi",
    signerStatus: [
      { name: "Daniel Wright",  email: "d.wright@horizon.com", signed: false, signedAt: null },
      { name: "Horizon Legal",  email: "legal@horizon.com",    signed: false, signedAt: null },
    ],
  },
  {
    id: "SIG-008", document: "Supplier Agreement — GreenRoot Logistics", signers: ["Amara Diallo"],
    status: "Declined", sentDate: "3 Jun 2026", dueDate: "10 Jun 2026", completedDate: null, sentBy: "Rachel Moore",
    signerStatus: [
      { name: "Amara Diallo", email: "amara@greenroot.com", signed: false, signedAt: null },
    ],
  },
  {
    id: "SIG-009", document: "Renewal NDA — SkyNet Corp", signers: ["Liam Fox"],
    status: "Completed", sentDate: "1 Jun 2026", dueDate: "7 Jun 2026", completedDate: "4 Jun 2026", sentBy: "James Orton",
    signerStatus: [
      { name: "Liam Fox", email: "liam@skynet.com", signed: true, signedAt: "4 Jun 2026, 11:22" },
    ],
  },
  {
    id: "SIG-010", document: "Event Sponsorship Contract — BrightFest", signers: ["Nina Patel", "Events Dir"],
    status: "Partially Signed", sentDate: "6 Jun 2026", dueDate: "13 Jun 2026", completedDate: null, sentBy: "Sarah Nkosi",
    signerStatus: [
      { name: "Nina Patel",  email: "nina@brightfest.com",   signed: true,  signedAt: "6 Jun 2026, 15:00" },
      { name: "Events Dir",  email: "events@brightfest.com", signed: false, signedAt: null },
    ],
  },
]

const statusConfig: Record<string, { color: string; bg: string; icon: React.ComponentType<{ size?: number }> }> = {
  "Completed":        { color: "#16a34a", bg: "#dcfce7", icon: CheckCircle },
  "Partially Signed": { color: "#d97706", bg: "#fef3c7", icon: PenTool },
  "Sent":             { color: "#1a56db", bg: "#dbeafe", icon: Send },
  "Draft":            { color: "#475569", bg: "#f1f5f9", icon: FileText },
  "Declined":         { color: "#dc2626", bg: "#fee2e2", icon: XCircle },
  "Expired":          { color: "#dc2626", bg: "#fee2e2", icon: AlertCircle },
}

const stats = [
  { label: "Total Sent",       value: "10", icon: Send,         color: "#1a56db" },
  { label: "Awaiting",         value: "5",  icon: Clock,        color: "#d97706" },
  { label: "Completed",        value: "3",  icon: CheckCircle,  color: "#16a34a" },
  { label: "Declined/Expired", value: "2",  icon: XCircle,      color: "#dc2626" },
]

export default function SignaturesPage() {
  const router = useRouter()
  const [expanded, setExpanded] = useState<string | null>(null)
  const [search, setSearch] = useState("")
  const [filterStatus, setFilterStatus] = useState("All")

  const statuses = ["All", "Sent", "Partially Signed", "Completed", "Draft", "Declined", "Expired"]

  const filtered = SIGNATURE_REQUESTS.filter(r => {
    const matchSearch = r.document.toLowerCase().includes(search.toLowerCase()) ||
      r.id.toLowerCase().includes(search.toLowerCase())
    const matchStatus = filterStatus === "All" || r.status === filterStatus
    return matchSearch && matchStatus
  })

  return (
    <div className="p-6 space-y-6 max-w-[1400px] mx-auto">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>E-Signatures</h1>
          <p className="text-sm mt-0.5" style={{ color: "var(--muted-foreground)" }}>Manage signature requests and track signing status</p>
        </div>
        <button
          onClick={() => router.push("/app/documents/signatures/new")}
          className="inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-white hover:opacity-90 transition-opacity"
          style={{ background: "var(--primary)" }}
        >
          <Plus size={16} /> Send for Signature
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
            <input
              type="text"
              placeholder="Search by document or ID…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="flex-1 min-w-[200px] h-9 rounded-md border px-3 text-sm outline-none focus:ring-2"
              style={{
                borderColor: "var(--border)",
                background: "var(--background)",
                color: "var(--foreground)"
              }}
            />
            <div className="flex gap-1 flex-wrap">
              {statuses.map(s => (
                <button
                  key={s}
                  onClick={() => setFilterStatus(s)}
                  className="px-3 py-1 rounded-full text-xs font-medium transition-colors"
                  style={filterStatus === s
                    ? { background: "var(--primary)", color: "white" }
                    : { background: "var(--secondary)", color: "var(--muted-foreground)" }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </CardContent>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b" style={{ borderColor: "var(--border)", background: "var(--secondary)" }}>
                  {["Document", "Signers", "Status", "Sent By", "Sent", "Due", "Completed", ""].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold" style={{ color: "var(--muted-foreground)" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(req => {
                  const sc = statusConfig[req.status]
                  const StatusIcon = sc.icon
                  const isExpanded = expanded === req.id
                  return (
                    <React.Fragment key={req.id}>
                      <tr
                        className="border-b transition-colors cursor-pointer hover:opacity-90"
                        style={{ borderColor: "var(--border)" }}
                        onClick={() => setExpanded(isExpanded ? null : req.id)}
                      >
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <FileText size={15} style={{ color: "var(--muted-foreground)" }} className="shrink-0" />
                            <div>
                              <p className="text-sm font-medium max-w-[260px] truncate" style={{ color: "var(--foreground)" }}>{req.document}</p>
                              <p className="text-[10px] font-mono" style={{ color: "var(--muted-foreground)" }}>{req.id}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex -space-x-1">
                            {req.signers.slice(0, 3).map(s => (
                              <Avatar key={s} className="h-6 w-6 border-2" style={{ borderColor: "var(--background)" }}>
                                <AvatarFallback className="text-[9px]" style={{ background: "var(--primary)", color: "white" }}>
                                  {s.split(" ").map(n => n[0]).join("").slice(0, 2)}
                                </AvatarFallback>
                              </Avatar>
                            ))}
                            {req.signers.length > 3 && (
                              <span className="h-6 w-6 rounded-full text-[9px] flex items-center justify-center text-white border-2"
                                style={{ background: "var(--muted-foreground)", borderColor: "var(--background)" }}>
                                +{req.signers.length - 3}
                              </span>
                            )}
                          </div>
                          <p className="text-[10px] mt-0.5" style={{ color: "var(--muted-foreground)" }}>{req.signers.length} signer{req.signers.length !== 1 ? "s" : ""}</p>
                        </td>
                        <td className="px-4 py-3">
                          <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium"
                            style={{ color: sc.color, background: sc.bg }}>
                            <StatusIcon size={11} />
                            {req.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-xs" style={{ color: "var(--foreground)" }}>{req.sentBy}</td>
                        <td className="px-4 py-3 text-xs" style={{ color: "var(--muted-foreground)" }}>{req.sentDate}</td>
                        <td className="px-4 py-3 text-xs" style={{ color: "var(--muted-foreground)" }}>{req.dueDate}</td>
                        <td className="px-4 py-3 text-xs" style={{ color: req.completedDate ? "#16a34a" : "var(--muted-foreground)" }}>
                          {req.completedDate ?? "—"}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1">
                            <button className="p-1 rounded hover:opacity-70" style={{ color: "var(--muted-foreground)" }} title="View">
                              <Eye size={14} />
                            </button>
                            {req.status === "Sent" || req.status === "Partially Signed" ? (
                              <button className="p-1 rounded hover:opacity-70" style={{ color: "var(--muted-foreground)" }} title="Remind">
                                <RefreshCw size={14} />
                              </button>
                            ) : null}
                            {req.status === "Completed" ? (
                              <button className="p-1 rounded hover:opacity-70" style={{ color: "var(--muted-foreground)" }} title="Download">
                                <Download size={14} />
                              </button>
                            ) : null}
                            <button className="p-1 rounded hover:opacity-70" style={{ color: "var(--muted-foreground)" }} title="More">
                              <MoreHorizontal size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                      {isExpanded && (
                        <tr>
                          <td colSpan={8} className="px-4 pb-4" style={{ background: "var(--secondary)" }}>
                            <div className="pt-3 space-y-2">
                              <p className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: "var(--muted-foreground)" }}>Signer Status</p>
                              {req.signerStatus.map(s => (
                                <div key={s.name} className="flex items-center gap-3">
                                  <Avatar className="h-7 w-7">
                                    <AvatarFallback className="text-[10px]" style={{ background: "var(--primary)", color: "white" }}>
                                      {s.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div className="w-40">
                                    <p className="text-xs font-medium" style={{ color: "var(--foreground)" }}>{s.name}</p>
                                    <p className="text-[10px]" style={{ color: "var(--muted-foreground)" }}>{s.email}</p>
                                  </div>
                                  {s.signed
                                    ? <span className="flex items-center gap-1 text-xs font-medium" style={{ color: "#16a34a" }}>
                                        <CheckCircle size={13} /> Signed {s.signedAt}
                                      </span>
                                    : <span className="flex items-center gap-1 text-xs" style={{ color: "var(--muted-foreground)" }}>
                                        <Clock size={13} /> Awaiting signature
                                      </span>
                                  }
                                </div>
                              ))}
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  )
                })}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <div className="p-12 text-center">
                <PenTool size={32} className="mx-auto mb-3" style={{ color: "var(--muted-foreground)" }} />
                <p className="text-sm font-medium" style={{ color: "var(--foreground)" }}>No signature requests found</p>
                <p className="text-xs mt-1" style={{ color: "var(--muted-foreground)" }}>Try adjusting your search or filter</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
