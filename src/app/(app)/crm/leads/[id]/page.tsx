"use client"

import React, { useState } from "react"
import Link from "next/link"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import {
  ChevronLeft, Edit2, Check, X, Mail, Phone, Building2, User,
  GitBranch, Clock, Sparkles, FileText, Calendar, Activity,
  Plus, MoreHorizontal, Archive, Trash2, RefreshCw, Link2,
  CheckSquare, Shield, Tag, MessageSquare, Paperclip, TrendingUp
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select"
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import { cn, getInitials, formatDate, formatRelativeTime } from "@/lib/utils"

const LEAD_DATA = {
  id: "1",
  firstName: "James",
  lastName: "Whitfield",
  email: "j.whitfield@fintechcorp.co.uk",
  phone: "+44 20 7123 4567",
  company: "Fintech Corp Ltd",
  jobTitle: "Head of Operations",
  source: "LinkedIn",
  status: "Qualified",
  score: 82,
  owner: "Alex Turner",
  pipeline: "Main Sales Pipeline",
  created: "2026-06-08",
  lastActivity: "2026-06-09",
  description: "High-value enterprise prospect interested in CRM integration and automation suite. Decision maker with budget confirmed. Q3 target.",
  tags: ["enterprise", "Q3", "high-value"],
}

const TIMELINE = [
  { type: "Email", icon: Mail, text: "Email sent: 'Follow-up on demo request'", actor: "Alex Turner", time: "2026-06-09T14:30:00", color: "text-cyan-500" },
  { type: "Call", icon: Phone, text: "Outbound call — 12 mins — Discovery call completed", actor: "Alex Turner", time: "2026-06-09T11:00:00", color: "text-emerald-500" },
  { type: "Note", icon: MessageSquare, text: "Note: Budget confirmed at £80–100K for CRM suite", actor: "Sarah Mitchell", time: "2026-06-08T16:20:00", color: "text-violet-500" },
  { type: "Status", icon: RefreshCw, text: "Status changed from Contacted → Qualified", actor: "Alex Turner", time: "2026-06-08T09:15:00", color: "text-blue-500" },
  { type: "Created", icon: User, text: "Lead created via LinkedIn import", actor: "System", time: "2026-06-08T08:00:00", color: "text-slate-400" },
]

const TASKS = [
  { id: "t1", title: "Send enterprise pricing deck", due: "11 Jun 2026", done: false },
  { id: "t2", title: "Schedule product demo call", due: "13 Jun 2026", done: false },
  { id: "t3", title: "Follow up on legal review", due: "20 Jun 2026", done: true },
]

const EMAILS = [
  { id: "e1", subject: "Follow-up on demo request", date: "2026-06-09", status: "Delivered" },
  { id: "e2", subject: "Orbas CRM — Introduction", date: "2026-06-07", status: "Opened" },
]

const AUDIT = [
  { field: "Status", oldVal: "Contacted", newVal: "Qualified", by: "Alex Turner", time: "2026-06-08T09:15:00" },
  { field: "Score", oldVal: "70", newVal: "82", by: "System", time: "2026-06-08T09:14:00" },
  { field: "Owner", oldVal: "Sarah Mitchell", newVal: "Alex Turner", time: "2026-06-07T15:00:00", by: "Sarah Mitchell" },
]

const statusOptions = ["New", "Contacted", "Qualified", "Converted"]
const statusColors: Record<string, string> = {
  New: "bg-blue-100 text-blue-700",
  Contacted: "bg-amber-100 text-amber-700",
  Qualified: "bg-violet-100 text-violet-700",
  Converted: "bg-emerald-100 text-emerald-700",
}

function InlineField({ label, value, onSave }: { label: string; value: string; onSave: (v: string) => void }) {
  const [editing, setEditing] = useState(false)
  const [val, setVal] = useState(value)
  return (
    <div className="group">
      <p className="text-[10px] text-[var(--muted-foreground)] font-medium uppercase tracking-wide mb-0.5">{label}</p>
      {editing ? (
        <div className="flex items-center gap-1">
          <Input value={val} onChange={e => setVal(e.target.value)} className="h-7 text-sm py-0" autoFocus />
          <Button size="sm" className="h-7 w-7 p-0" onClick={() => { onSave(val); setEditing(false) }}>
            <Check className="h-3.5 w-3.5" />
          </Button>
          <Button size="sm" variant="ghost" className="h-7 w-7 p-0" onClick={() => setEditing(false)}>
            <X className="h-3.5 w-3.5" />
          </Button>
        </div>
      ) : (
        <div className="flex items-center gap-1">
          <span className="text-sm text-[var(--foreground)]">{val || "—"}</span>
          <Button variant="ghost" size="sm" className="h-5 w-5 p-0 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => setEditing(true)}>
            <Edit2 className="h-3 w-3 text-[var(--muted-foreground)]" />
          </Button>
        </div>
      )}
    </div>
  )
}

export default function LeadDetailPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const activeTab = searchParams.get("tab") || "overview"
  const router = useRouter()

  const [lead, setLead] = useState(LEAD_DATA)
  const [tasks, setTasks] = useState(TASKS)
  const [editingName, setEditingName] = useState(false)
  const [nameVal, setNameVal] = useState(`${LEAD_DATA.firstName} ${LEAD_DATA.lastName}`)

  function setTab(tab: string) {
    router.push(`/app/crm/leads/${params.id}?tab=${tab}`, { scroll: false })
  }

  const tabs = [
    { key: "overview",   label: "Overview" },
    { key: "timeline",   label: "Timeline" },
    { key: "activity",   label: "Activity" },
    { key: "emails",     label: "Emails" },
    { key: "campaigns",  label: "Campaigns" },
    { key: "documents",  label: "Documents" },
    { key: "audit",      label: "Audit" },
  ]

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Back nav */}
      <div className="border-b border-[var(--border)] bg-[var(--card)] px-6 py-3">
        <Button variant="ghost" size="sm" asChild className="text-[var(--muted-foreground)] -ml-2">
          <Link href="/app/crm/leads"><ChevronLeft className="h-4 w-4 mr-1" />Back to Leads</Link>
        </Button>
      </div>

      {/* Hero */}
      <div className="border-b border-[var(--border)] bg-[var(--card)] px-6 py-5">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-start gap-4">
            <Avatar className="h-14 w-14 shrink-0">
              <AvatarFallback className="text-lg bg-[var(--primary)]/10 text-[var(--primary)] font-bold">
                {getInitials(nameVal)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              {/* Name inline edit */}
              <div className="flex items-center gap-2 mb-1">
                {editingName ? (
                  <>
                    <Input value={nameVal} onChange={e => setNameVal(e.target.value)} className="h-8 text-lg font-bold w-64" autoFocus />
                    <Button size="sm" className="h-8 w-8 p-0" onClick={() => setEditingName(false)}><Check className="h-4 w-4" /></Button>
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0" onClick={() => setEditingName(false)}><X className="h-4 w-4" /></Button>
                  </>
                ) : (
                  <button onClick={() => setEditingName(true)} className="text-xl font-bold text-[var(--foreground)] hover:text-[var(--primary)] transition-colors flex items-center gap-1.5">
                    {nameVal}
                    <Edit2 className="h-4 w-4 text-[var(--muted-foreground)] opacity-0 group-hover:opacity-100" />
                  </button>
                )}
                {/* Status badge dropdown */}
                <Select value={lead.status} onValueChange={v => setLead(p => ({...p, status: v}))}>
                  <SelectTrigger className="h-6 w-auto border-0 bg-transparent px-1 focus:ring-0">
                    <span className={cn("inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium cursor-pointer", statusColors[lead.status])}>
                      {lead.status}
                    </span>
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map(s => (
                      <SelectItem key={s} value={s}>{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-orange-100 text-orange-700 text-xs font-semibold">
                  Score: {lead.score}
                </span>
              </div>
              <p className="text-sm text-[var(--muted-foreground)]">{lead.jobTitle} · {lead.company}</p>

              {/* Fact strip */}
              <div className="flex flex-wrap gap-x-6 gap-y-2 mt-3">
                <InlineField label="Email" value={lead.email} onSave={v => setLead(p => ({...p, email: v}))} />
                <InlineField label="Phone" value={lead.phone} onSave={v => setLead(p => ({...p, phone: v}))} />
                <InlineField label="Source" value={lead.source} onSave={v => setLead(p => ({...p, source: v}))} />
                <InlineField label="Owner" value={lead.owner} onSave={v => setLead(p => ({...p, owner: v}))} />
                <InlineField label="Pipeline" value={lead.pipeline} onSave={v => setLead(p => ({...p, pipeline: v}))} />
                <InlineField label="Created" value={formatDate(lead.created)} onSave={() => {}} />
                <InlineField label="Last Activity" value={formatDate(lead.lastActivity)} onSave={() => {}} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-[var(--border)] bg-[var(--card)] px-6">
        <div className="max-w-[1400px] mx-auto flex gap-0 overflow-x-auto">
          {tabs.map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={cn(
                "px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap",
                activeTab === t.key
                  ? "border-[var(--primary)] text-[var(--primary)]"
                  : "border-transparent text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content + Right Rail */}
      <div className="max-w-[1400px] mx-auto px-6 py-6 flex gap-6">
        {/* Main content */}
        <div className="flex-1 min-w-0 space-y-4">

          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card className="border border-[var(--border)]">
                <CardHeader className="pb-3"><CardTitle className="text-sm font-semibold">Key Details</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { label: "Company", value: lead.company },
                    { label: "Job Title", value: lead.jobTitle },
                    { label: "Source", value: lead.source },
                    { label: "Pipeline", value: lead.pipeline },
                    { label: "Owner", value: lead.owner },
                  ].map(f => (
                    <InlineField key={f.label} label={f.label} value={f.value} onSave={v => setLead(p => ({...p, [f.label.toLowerCase().replace(" ","")]: v}))} />
                  ))}
                  <Separator />
                  <div>
                    <p className="text-[10px] text-[var(--muted-foreground)] font-medium uppercase tracking-wide mb-1">Description</p>
                    <p className="text-sm text-[var(--foreground)]">{lead.description}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-[var(--muted-foreground)] font-medium uppercase tracking-wide mb-1">Tags</p>
                    <div className="flex gap-1 flex-wrap">
                      {lead.tags.map(t => (
                        <span key={t} className="px-2 py-0.5 rounded-full bg-[var(--muted)] text-[var(--muted-foreground)] text-xs">{t}</span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-4">
                <Card className="border border-[var(--border)]">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-[var(--primary)]" />
                      <CardTitle className="text-sm font-semibold">AI Insights</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm text-[var(--foreground)]">
                    <div className="flex items-start gap-2 p-2 bg-blue-50 rounded-md">
                      <span className="text-blue-500 mt-0.5">•</span>
                      <p className="text-xs">High intent signals detected — decision maker with confirmed budget suggests 80%+ close probability.</p>
                    </div>
                    <div className="flex items-start gap-2 p-2 bg-emerald-50 rounded-md">
                      <span className="text-emerald-500 mt-0.5">•</span>
                      <p className="text-xs">Similar profile to 3 Closed Won deals in Q1. Recommend scheduling product demo within 48 hours.</p>
                    </div>
                    <div className="flex items-start gap-2 p-2 bg-amber-50 rounded-md">
                      <span className="text-amber-500 mt-0.5">•</span>
                      <p className="text-xs">Fintech Corp Ltd has 3 other contacts in the CRM. Consider looping in enterprise team.</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border border-[var(--border)]">
                  <CardHeader className="pb-3"><CardTitle className="text-sm font-semibold">Linked Records</CardTitle></CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center gap-2 p-2 rounded-md bg-[var(--muted)] hover:bg-[var(--muted)]/80 cursor-pointer">
                      <Building2 className="h-4 w-4 text-[var(--muted-foreground)]" />
                      <Link href="/app/crm/accounts/1" className="text-sm text-[var(--primary)] hover:underline">Fintech Corp Ltd</Link>
                    </div>
                    <div className="flex items-center gap-2 p-2 rounded-md bg-[var(--muted)] hover:bg-[var(--muted)]/80 cursor-pointer">
                      <GitBranch className="h-4 w-4 text-[var(--muted-foreground)]" />
                      <Link href="/app/crm/deals/1" className="text-sm text-[var(--primary)] hover:underline">Enterprise SaaS Rollout — £95K</Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Timeline Tab */}
          {activeTab === "timeline" && (
            <Card className="border border-[var(--border)]">
              <CardHeader className="pb-3 flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-semibold">Activity Timeline</CardTitle>
                <Button size="sm" variant="outline" className="h-7 text-xs"><Plus className="h-3.5 w-3.5 mr-1" />Log Activity</Button>
              </CardHeader>
              <CardContent>
                <div className="relative pl-6">
                  <div className="absolute left-2 top-0 bottom-0 w-px bg-[var(--border)]" />
                  <div className="space-y-5">
                    {TIMELINE.map((item, i) => (
                      <div key={i} className="relative">
                        <div className={cn("absolute -left-4 mt-0.5 h-6 w-6 rounded-full flex items-center justify-center bg-white border-2 border-[var(--border)]", item.color)}>
                          <item.icon className="h-3 w-3" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className={cn("text-[10px] font-medium px-1.5 py-0.5 rounded", item.color, "bg-current/10")}>{item.type}</span>
                            <span className="text-xs text-[var(--muted-foreground)]">{item.actor}</span>
                            <span className="text-xs text-[var(--muted-foreground)]">·</span>
                            <span className="text-xs text-[var(--muted-foreground)]">{formatRelativeTime(item.time)}</span>
                          </div>
                          <p className="text-sm text-[var(--foreground)]">{item.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Activity Tab */}
          {activeTab === "activity" && (
            <Card className="border border-[var(--border)]">
              <CardHeader className="pb-3 flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-semibold">Activity Log</CardTitle>
                <Button size="sm" className="h-7 text-xs"><Plus className="h-3.5 w-3.5 mr-1" />Log Activity</Button>
              </CardHeader>
              <CardContent className="p-0">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[var(--border)] bg-[var(--muted)]">
                      {["Type","Subject","Notes","Due Date","Owner","Status"].map(h => (
                        <th key={h} className="text-left px-4 py-2.5 text-xs font-semibold text-[var(--muted-foreground)]">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--border)]">
                    {[
                      { type: "Call", subject: "Discovery Call", notes: "12 min - qualified", due: "9 Jun 2026", owner: "Alex Turner", status: "Done" },
                      { type: "Email", subject: "Follow-up demo", notes: "Sent enterprise deck", due: "9 Jun 2026", owner: "Alex Turner", status: "Done" },
                      { type: "Meeting", subject: "Product Demo", notes: "Scheduled via Calendly", due: "14 Jun 2026", owner: "Alex Turner", status: "Planned" },
                    ].map((a, i) => (
                      <tr key={i} className="hover:bg-[var(--muted)]/50">
                        <td className="px-4 py-3"><span className="text-xs px-2 py-0.5 rounded bg-[var(--muted)] text-[var(--foreground)]">{a.type}</span></td>
                        <td className="px-4 py-3 font-medium">{a.subject}</td>
                        <td className="px-4 py-3 text-[var(--muted-foreground)] text-xs">{a.notes}</td>
                        <td className="px-4 py-3 text-xs text-[var(--muted-foreground)]">{a.due}</td>
                        <td className="px-4 py-3 text-xs text-[var(--muted-foreground)]">{a.owner}</td>
                        <td className="px-4 py-3">
                          <span className={cn("text-xs px-2 py-0.5 rounded-full font-medium", a.status === "Done" ? "bg-emerald-100 text-emerald-700" : "bg-blue-100 text-blue-700")}>{a.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          )}

          {/* Emails Tab */}
          {activeTab === "emails" && (
            <Card className="border border-[var(--border)]">
              <CardHeader className="pb-3 flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-semibold">Emails</CardTitle>
                <Button size="sm" className="h-7 text-xs"><Mail className="h-3.5 w-3.5 mr-1" />Send Email</Button>
              </CardHeader>
              <CardContent className="p-0">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[var(--border)] bg-[var(--muted)]">
                      {["Subject","Date","Status"].map(h => (
                        <th key={h} className="text-left px-4 py-2.5 text-xs font-semibold text-[var(--muted-foreground)]">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--border)]">
                    {EMAILS.map(e => (
                      <tr key={e.id} className="hover:bg-[var(--muted)]/50">
                        <td className="px-4 py-3 font-medium">{e.subject}</td>
                        <td className="px-4 py-3 text-xs text-[var(--muted-foreground)]">{formatDate(e.date)}</td>
                        <td className="px-4 py-3">
                          <span className={cn("text-xs px-2 py-0.5 rounded-full font-medium", e.status === "Opened" ? "bg-emerald-100 text-emerald-700" : "bg-blue-100 text-blue-700")}>
                            {e.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          )}

          {/* Campaigns Tab */}
          {activeTab === "campaigns" && (
            <Card className="border border-[var(--border)]">
              <CardHeader className="pb-3 flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-semibold">Campaigns</CardTitle>
                <Button size="sm" variant="outline" className="h-7 text-xs"><Plus className="h-3.5 w-3.5 mr-1" />Add to Campaign</Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {[{ name: "Q3 Enterprise Nurture", type: "Email", status: "Active" }].map(c => (
                    <div key={c.name} className="flex items-center justify-between p-3 rounded-lg bg-[var(--muted)]">
                      <div>
                        <p className="text-sm font-medium text-[var(--foreground)]">{c.name}</p>
                        <p className="text-xs text-[var(--muted-foreground)]">{c.type} · {c.status}</p>
                      </div>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">{c.status}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Documents Tab */}
          {activeTab === "documents" && (
            <Card className="border border-[var(--border)]">
              <CardHeader className="pb-3 flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-semibold">Documents</CardTitle>
                <Button size="sm" variant="outline" className="h-7 text-xs"><Paperclip className="h-3.5 w-3.5 mr-1" />Upload</Button>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[{ name: "Discovery Notes.pdf", size: "128 KB", date: "9 Jun 2026" }, { name: "Pricing Proposal v1.pdf", size: "2.4 MB", date: "8 Jun 2026" }].map(f => (
                    <div key={f.name} className="p-3 border border-[var(--border)] rounded-lg hover:bg-[var(--muted)]/50 cursor-pointer">
                      <FileText className="h-8 w-8 text-[var(--primary)]/60 mb-2" />
                      <p className="text-xs font-medium text-[var(--foreground)] truncate">{f.name}</p>
                      <p className="text-[10px] text-[var(--muted-foreground)]">{f.size} · {f.date}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Audit Tab */}
          {activeTab === "audit" && (
            <Card className="border border-[var(--border)]">
              <CardHeader className="pb-3"><CardTitle className="text-sm font-semibold">Audit Trail</CardTitle></CardHeader>
              <CardContent className="p-0">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[var(--border)] bg-[var(--muted)]">
                      {["Field","Old Value","New Value","Changed By","Timestamp"].map(h => (
                        <th key={h} className="text-left px-4 py-2.5 text-xs font-semibold text-[var(--muted-foreground)]">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--border)]">
                    {AUDIT.map((a, i) => (
                      <tr key={i} className="hover:bg-[var(--muted)]/50">
                        <td className="px-4 py-3 font-medium text-xs">{a.field}</td>
                        <td className="px-4 py-3 text-xs text-[var(--muted-foreground)] line-through">{a.oldVal}</td>
                        <td className="px-4 py-3 text-xs text-emerald-600 font-medium">{a.newVal}</td>
                        <td className="px-4 py-3 text-xs text-[var(--muted-foreground)]">{a.by}</td>
                        <td className="px-4 py-3 text-xs text-[var(--muted-foreground)]">{formatRelativeTime(a.time)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Rail */}
        <div className="w-64 shrink-0 space-y-4">
          {/* Actions */}
          <Card className="border border-[var(--border)]">
            <CardHeader className="pb-2"><CardTitle className="text-xs font-semibold uppercase tracking-wide text-[var(--muted-foreground)]">Actions</CardTitle></CardHeader>
            <CardContent className="space-y-1.5 p-3">
              {[
                { icon: Edit2, label: "Edit Lead" },
                { icon: RefreshCw, label: "Convert Lead" },
                { icon: Activity, label: "Log Activity" },
                { icon: Mail, label: "Send Email" },
                { icon: Calendar, label: "Schedule Meeting" },
                { icon: CheckSquare, label: "Add Task" },
                { icon: MessageSquare, label: "Add Note" },
                { icon: Archive, label: "Archive" },
              ].map(a => (
                <Button key={a.label} variant="ghost" size="sm" className="w-full justify-start h-8 text-xs font-medium">
                  <a.icon className="h-3.5 w-3.5 mr-2 text-[var(--muted-foreground)]" />{a.label}
                </Button>
              ))}
              <Separator />
              <Button variant="ghost" size="sm" className="w-full justify-start h-8 text-xs font-medium text-red-600 hover:text-red-700 hover:bg-red-50">
                <Trash2 className="h-3.5 w-3.5 mr-2" />Delete Lead
              </Button>
            </CardContent>
          </Card>

          {/* Tasks */}
          <Card className="border border-[var(--border)]">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <CardTitle className="text-xs font-semibold uppercase tracking-wide text-[var(--muted-foreground)]">Tasks</CardTitle>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0"><Plus className="h-3.5 w-3.5" /></Button>
            </CardHeader>
            <CardContent className="space-y-2 p-3">
              {tasks.map(task => (
                <div key={task.id} className="flex items-start gap-2">
                  <Checkbox
                    checked={task.done}
                    onCheckedChange={v => setTasks(p => p.map(t => t.id === task.id ? {...t, done: v as boolean} : t))}
                    className="mt-0.5"
                  />
                  <div>
                    <p className={cn("text-xs font-medium", task.done && "line-through text-[var(--muted-foreground)]")}>{task.title}</p>
                    <p className="text-[10px] text-[var(--muted-foreground)]">Due {task.due}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Related Records */}
          <Card className="border border-[var(--border)]">
            <CardHeader className="pb-2"><CardTitle className="text-xs font-semibold uppercase tracking-wide text-[var(--muted-foreground)]">Related Records</CardTitle></CardHeader>
            <CardContent className="space-y-1.5 p-3">
              <Link href="/app/crm/accounts/1" className="flex items-center gap-2 p-2 rounded-md hover:bg-[var(--muted)] transition-colors">
                <Building2 className="h-3.5 w-3.5 text-[var(--muted-foreground)]" />
                <span className="text-xs text-[var(--primary)] hover:underline">Fintech Corp Ltd</span>
              </Link>
              <Link href="/app/crm/deals/1" className="flex items-center gap-2 p-2 rounded-md hover:bg-[var(--muted)] transition-colors">
                <TrendingUp className="h-3.5 w-3.5 text-[var(--muted-foreground)]" />
                <span className="text-xs text-[var(--primary)] hover:underline">Enterprise SaaS Rollout</span>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

