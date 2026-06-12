"use client"

import { useState } from "react"
import { useRouter, useParams } from "next/navigation"
import {
  ArrowLeft, ScrollText, Edit, Download, PenLine, Slash, Trash2,
  Calendar, DollarSign, Clock, RefreshCw, CheckCircle, AlertCircle,
  User, Building, FileText, Link2, MoreHorizontal, Check, Circle
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { formatCurrency } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

const CONTRACTS: Record<string, {
  id: string; name: string; counterparty: string; type: string; value: number;
  startDate: string; endDate: string; status: string; owner: string; autoRenewal: boolean;
  renewalNotice: string; description: string; daysRemaining: number;
  parties: string[]; linkedDocs: string[];
  timeline: { date: string; event: string; user: string; note?: string }[];
  obligations: { id: string; description: string; dueDate: string; owner: string; completed: boolean }[];
  activity: { date: string; user: string; action: string }[];
  signers?: { name: string; email: string; signed: boolean; signedAt: string | null }[];
}> = {
  "CON-001": {
    id: "CON-001", name: "Enterprise Software Licence — DataVault Ltd", counterparty: "DataVault Ltd",
    type: "MSA", value: 240000, startDate: "1 Jan 2026", endDate: "31 Dec 2026", status: "Active",
    owner: "James Orton", autoRenewal: true, renewalNotice: "90 days",
    description: "Master Services Agreement for enterprise software licensing and professional services delivery to DataVault Ltd, covering all product modules, support, and maintenance.",
    daysRemaining: 203, parties: ["Orbas Technologies Ltd", "DataVault Ltd"],
    linkedDocs: ["DataVault NDA 2024.pdf", "SOW v1.2.pdf", "Pricing Schedule Q1 2026.pdf"],
    timeline: [
      { date: "15 Nov 2025", event: "Drafted",              user: "James Orton",  note: "Initial draft prepared" },
      { date: "22 Nov 2025", event: "Legal Review",         user: "Legal Team",   note: "Reviewed and marked up" },
      { date: "1 Dec 2025",  event: "Sent for Signature",   user: "James Orton" },
      { date: "10 Dec 2025", event: "Signed — DataVault",   user: "Jordan Clarke" },
      { date: "20 Dec 2025", event: "Signed — Orbas",       user: "CEO" },
      { date: "1 Jan 2026",  event: "Active",               user: "System",       note: "Contract commenced" },
    ],
    obligations: [
      { id: "o1", description: "Deliver onboarding training sessions",     dueDate: "31 Jan 2026", owner: "James Orton",  completed: true },
      { id: "o2", description: "Quarterly business review meeting",        dueDate: "31 Mar 2026", owner: "James Orton",  completed: true },
      { id: "o3", description: "Annual licence renewal review",             dueDate: "30 Sep 2026", owner: "Sarah Nkosi",  completed: false },
      { id: "o4", description: "Provide API integration documentation",    dueDate: "28 Feb 2026", owner: "Tech Team",    completed: true },
      { id: "o5", description: "Submit renewal notice to counterparty",    dueDate: "3 Oct 2026",  owner: "James Orton",  completed: false },
    ],
    activity: [
      { date: "8 Jun 2026, 11:30",  user: "James Orton",  action: "Viewed contract" },
      { date: "1 Jun 2026, 09:00",  user: "Sarah Nkosi",  action: "Updated contract value from £220,000 to £240,000" },
      { date: "1 Apr 2026, 14:22",  user: "System",       action: "Obligation 'Quarterly business review' marked complete" },
      { date: "1 Jan 2026, 00:01",  user: "System",       action: "Contract status changed to Active" },
      { date: "20 Dec 2025, 10:14", user: "CEO",          action: "Signed the contract" },
    ],
    signers: [
      { name: "Jordan Clarke",  email: "jordan@datavault.com", signed: true,  signedAt: "10 Dec 2025, 14:22" },
      { name: "James Orton",    email: "james@orbas.com",      signed: true,  signedAt: "20 Dec 2025, 10:14" },
    ],
  },
  "CON-003": {
    id: "CON-003", name: "Consulting Proposal — Apex Analytics", counterparty: "Apex Analytics",
    type: "Customer", value: 85000, startDate: "1 Mar 2026", endDate: "31 Aug 2026", status: "Pending Signature",
    owner: "James Orton", autoRenewal: false, renewalNotice: "30 days",
    description: "Consulting services agreement for data strategy and BI implementation over 6 months.",
    daysRemaining: 81, parties: ["Orbas Technologies Ltd", "Apex Analytics"],
    linkedDocs: ["Apex Scope of Work.pdf"],
    timeline: [
      { date: "20 Feb 2026", event: "Drafted",             user: "James Orton" },
      { date: "1 Mar 2026",  event: "Sent for Signature",  user: "James Orton" },
    ],
    obligations: [
      { id: "o1", description: "Complete requirements gathering workshop", dueDate: "15 Mar 2026", owner: "James Orton", completed: true },
      { id: "o2", description: "Deliver data audit report",               dueDate: "30 Apr 2026", owner: "James Orton", completed: false },
    ],
    activity: [
      { date: "7 Jun 2026, 10:00", user: "James Orton", action: "Sent signature reminder to Mia Nguyen" },
      { date: "1 Mar 2026, 09:15", user: "James Orton", action: "Sent for signature" },
    ],
    signers: [
      { name: "Mia Nguyen",   email: "mia@apexanalytics.com", signed: false, signedAt: null },
      { name: "CFO Apex",     email: "cfo@apexanalytics.com", signed: false, signedAt: null },
    ],
  },
}

const STATUS_STYLES: Record<string, { bg: string; color: string }> = {
  "Draft":            { bg: "#f1f5f9", color: "#475569" },
  "Under Review":     { bg: "#dbeafe", color: "#1d4ed8" },
  "Active":           { bg: "#dcfce7", color: "#16a34a" },
  "Expired":          { bg: "#fee2e2", color: "#dc2626" },
  "Pending Signature":{ bg: "#fef3c7", color: "#d97706" },
  "Terminated":       { bg: "#fce7f3", color: "#be185d" },
  "Expiring Soon":    { bg: "#fef3c7", color: "#b45309" },
}

const TYPE_STYLES: Record<string, string> = {
  MSA: "#1a56db", NDA: "#7c3aed", SLA: "#059669",
  Employment: "#d97706", Supplier: "#dc2626", Customer: "#06b6d4", Partnership: "#be185d"
}

export default function ContractDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("details")
  const [obligations, setObligations] = useState<Record<string, boolean>>({})

  const id = params.id as string
  const contract = CONTRACTS[id] ?? CONTRACTS["CON-001"]

  const ss = STATUS_STYLES[contract.status] ?? STATUS_STYLES["Draft"]
  const typeColor = TYPE_STYLES[contract.type] ?? "#1a56db"

  const TABS = ["Details", "Timeline", "Obligations", "Activity"]

  const toggleObligation = (oid: string) => {
    setObligations(prev => ({ ...prev, [oid]: !(prev[oid] ?? false) }))
  }

  const isComplete = (o: { id: string; completed: boolean }) => obligations[o.id] !== undefined ? obligations[o.id] : o.completed

  return (
    <div className="p-6 space-y-6 max-w-[1400px] mx-auto">
      <div className="flex items-center gap-3">
        <button
          onClick={() => router.back()}
          className="p-1.5 rounded-md hover:opacity-70 transition-opacity"
          style={{ color: "var(--muted-foreground)" }}
        >
          <ArrowLeft size={18} />
        </button>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-xl font-bold truncate" style={{ color: "var(--foreground)" }}>{contract.name}</h1>
            <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ background: typeColor + "22", color: typeColor }}>
              {contract.type}
            </span>
            <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ background: ss.bg, color: ss.color }}>
              {contract.status}
            </span>
          </div>
          <p className="text-xs mt-0.5 font-mono" style={{ color: "var(--muted-foreground)" }}>{contract.id}</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button className="inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-xs font-medium hover:opacity-70 transition-opacity"
            style={{ borderColor: "var(--border)", color: "var(--foreground)", background: "var(--background)" }}>
            <Edit size={12} /> Edit
          </button>
          <button className="inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-xs font-medium hover:opacity-70 transition-opacity"
            style={{ borderColor: "var(--border)", color: "var(--foreground)", background: "var(--background)" }}>
            <Download size={12} /> Download
          </button>
          <button
            onClick={() => router.push("/app/documents/signatures/new")}
            className="inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium text-white hover:opacity-90 transition-opacity"
            style={{ background: "var(--primary)" }}>
            <PenLine size={12} /> Send for Signature
          </button>
          <button className="p-1.5 rounded-md border hover:opacity-70 transition-opacity"
            style={{ borderColor: "var(--border)", color: "var(--muted-foreground)", background: "var(--background)" }}>
            <MoreHorizontal size={16} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Contract Value", value: contract.value > 0 ? formatCurrency(contract.value) : "N/A", icon: DollarSign, color: "#7c3aed" },
          { label: "Start Date",     value: contract.startDate, icon: Calendar, color: "#1a56db" },
          { label: "End Date",       value: contract.endDate,   icon: Calendar, color: "#d97706" },
          { label: "Days Remaining", value: `${contract.daysRemaining}d`, icon: Clock, color: contract.daysRemaining < 60 ? "#dc2626" : "#16a34a" },
        ].map(s => {
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
                <p className="text-xl font-bold" style={{ color: s.color }}>{s.value}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="flex border-b" style={{ borderColor: "var(--border)" }}>
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab.toLowerCase())}
            className="px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px"
            style={activeTab === tab.toLowerCase()
              ? { borderColor: "var(--primary)", color: "var(--primary)" }
              : { borderColor: "transparent", color: "var(--muted-foreground)" }}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "details" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            <Card className="border" style={{ borderColor: "var(--border)" }}>
              <CardContent className="p-5 space-y-4">
                <h3 className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>Contract Information</h3>
                <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                  {[
                    { label: "Counterparty",     value: contract.counterparty },
                    { label: "Owner",            value: contract.owner },
                    { label: "Contract Type",    value: contract.type },
                    { label: "Value",            value: contract.value > 0 ? formatCurrency(contract.value) : "—" },
                    { label: "Start Date",       value: contract.startDate },
                    { label: "End Date",         value: contract.endDate },
                    { label: "Auto-Renewal",     value: contract.autoRenewal ? `Yes (${contract.renewalNotice} notice)` : "No" },
                    { label: "Days Remaining",   value: `${contract.daysRemaining} days` },
                  ].map(row => (
                    <div key={row.label}>
                      <p className="text-xs mb-0.5" style={{ color: "var(--muted-foreground)" }}>{row.label}</p>
                      <p className="text-sm font-medium" style={{ color: "var(--foreground)" }}>{row.value}</p>
                    </div>
                  ))}
                </div>
                {contract.description && (
                  <div className="pt-2 border-t" style={{ borderColor: "var(--border)" }}>
                    <p className="text-xs mb-1" style={{ color: "var(--muted-foreground)" }}>Description</p>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--foreground)" }}>{contract.description}</p>
                  </div>
                )}
              </CardContent>
            </Card>
            <Card className="border" style={{ borderColor: "var(--border)" }}>
              <CardContent className="p-5 space-y-3">
                <h3 className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>Parties</h3>
                {contract.parties.map(p => (
                  <div key={p} className="flex items-center gap-2">
                    <Building size={15} style={{ color: "var(--muted-foreground)" }} />
                    <span className="text-sm" style={{ color: "var(--foreground)" }}>{p}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
          <div className="space-y-4">
            <Card className="border" style={{ borderColor: "var(--border)" }}>
              <CardContent className="p-5 space-y-3">
                <h3 className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>Linked Documents</h3>
                {contract.linkedDocs.length === 0 && (
                  <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>No linked documents</p>
                )}
                {contract.linkedDocs.map(doc => (
                  <div key={doc} className="flex items-center gap-2">
                    <FileText size={14} style={{ color: "var(--muted-foreground)" }} />
                    <span className="text-xs truncate" style={{ color: "var(--foreground)" }}>{doc}</span>
                    <Link2 size={11} className="shrink-0" style={{ color: "var(--muted-foreground)" }} />
                  </div>
                ))}
              </CardContent>
            </Card>
            {contract.signers && (
              <Card className="border" style={{ borderColor: "var(--border)" }}>
                <CardContent className="p-5 space-y-3">
                  <h3 className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>eSignature Status</h3>
                  {contract.signers.map(s => (
                    <div key={s.name} className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center mt-0.5 shrink-0"
                        style={{ background: s.signed ? "#dcfce7" : "var(--secondary)" }}>
                        {s.signed
                          ? <CheckCircle size={12} style={{ color: "#16a34a" }} />
                          : <Circle size={12} style={{ color: "var(--muted-foreground)" }} />}
                      </div>
                      <div>
                        <p className="text-xs font-medium" style={{ color: "var(--foreground)" }}>{s.name}</p>
                        <p className="text-[10px]" style={{ color: "var(--muted-foreground)" }}>
                          {s.signed ? `Signed ${s.signedAt}` : "Awaiting signature"}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      )}

      {activeTab === "timeline" && (
        <Card className="border" style={{ borderColor: "var(--border)" }}>
          <CardContent className="p-6">
            <h3 className="text-sm font-semibold mb-6" style={{ color: "var(--foreground)" }}>Contract Lifecycle</h3>
            <div className="relative">
              <div className="absolute left-[11px] top-0 bottom-0 w-0.5" style={{ background: "var(--border)" }} />
              <div className="space-y-6">
                {contract.timeline.map((event, i) => {
                  const isActive = i === contract.timeline.length - 1
                  return (
                    <div key={i} className="flex gap-4 relative">
                      <div
                        className="w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 z-10"
                        style={isActive
                          ? { background: "var(--primary)", borderColor: "var(--primary)" }
                          : { background: "var(--background)", borderColor: "#16a34a" }}
                      >
                        {isActive
                          ? <div className="w-2 h-2 rounded-full bg-white" />
                          : <Check size={11} style={{ color: "#16a34a" }} />}
                      </div>
                      <div className="flex-1 pb-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>{event.event}</p>
                          <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>by {event.user}</span>
                        </div>
                        <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>{event.date}</p>
                        {event.note && (
                          <p className="text-xs mt-1 italic" style={{ color: "var(--muted-foreground)" }}>{event.note}</p>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === "obligations" && (
        <Card className="border" style={{ borderColor: "var(--border)" }}>
          <CardContent className="p-0">
            <div className="p-5 border-b flex items-center justify-between" style={{ borderColor: "var(--border)" }}>
              <h3 className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>Obligations & Milestones</h3>
              <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                {contract.obligations.filter(o => isComplete(o)).length}/{contract.obligations.length} complete
              </span>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b" style={{ borderColor: "var(--border)", background: "var(--secondary)" }}>
                  {["", "Description", "Due Date", "Owner", "Status"].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold" style={{ color: "var(--muted-foreground)" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {contract.obligations.map(o => {
                  const done = isComplete(o)
                  return (
                    <tr key={o.id} className="border-b" style={{ borderColor: "var(--border)" }}>
                      <td className="px-4 py-3">
                        <div
                          className="w-5 h-5 rounded border-2 flex items-center justify-center cursor-pointer transition-colors"
                          style={done
                            ? { borderColor: "#16a34a", background: "#16a34a" }
                            : { borderColor: "var(--border)", background: "var(--background)" }}
                          onClick={() => toggleObligation(o.id)}
                        >
                          {done && <Check size={11} color="white" />}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm" style={{ color: "var(--foreground)", textDecoration: done ? "line-through" : "none" }}>
                          {o.description}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs" style={{ color: "var(--muted-foreground)" }}>{o.dueDate}</td>
                      <td className="px-4 py-3 text-xs" style={{ color: "var(--foreground)" }}>{o.owner}</td>
                      <td className="px-4 py-3">
                        <span className="text-xs font-medium px-2 py-0.5 rounded-full"
                          style={done
                            ? { background: "#dcfce7", color: "#16a34a" }
                            : { background: "#fef3c7", color: "#d97706" }}>
                          {done ? "Complete" : "Pending"}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}

      {activeTab === "activity" && (
        <Card className="border" style={{ borderColor: "var(--border)" }}>
          <CardContent className="p-5">
            <h3 className="text-sm font-semibold mb-4" style={{ color: "var(--foreground)" }}>Activity Log</h3>
            <div className="space-y-4">
              {contract.activity.map((a, i) => (
                <div key={i} className="flex gap-3">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold text-white"
                    style={{ background: a.user === "System" ? "var(--muted-foreground)" : "var(--primary)" }}>
                    {a.user === "System" ? "S" : a.user.split(" ").map(n => n[0]).join("").slice(0, 2)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-medium" style={{ color: "var(--foreground)" }}>{a.user}</span>
                      <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>{a.action}</span>
                    </div>
                    <p className="text-[11px] mt-0.5" style={{ color: "var(--muted-foreground)" }}>{a.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
