"use client"

import React, { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import Link from "next/link"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import {
  ChevronLeft, Edit2, Check, X, Mail, Phone, Building2, User,
  Clock, Sparkles, FileText, Calendar, Activity, Plus, MoreHorizontal,
  Archive, Trash2, RefreshCw, CheckSquare, MessageSquare, Paperclip,
  TrendingUp, DollarSign, Target, Award, ThumbsUp, ThumbsDown,
  Users, BarChart2, ChevronDown
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { cn, formatCurrency, formatDate, formatRelativeTime, getInitials } from "@/lib/utils"

const DEAL = {
  id: "1",
  name: "Enterprise SaaS Rollout",
  account: "Fintech Corp Ltd",
  accountId: "1",
  value: 95000,
  stage: "Proposal",
  probability: 65,
  closeDate: "2026-08-31",
  owner: "Alex Turner",
  type: "New Business",
  source: "Inbound",
  created: "2026-05-15",
  lastActivity: "2026-06-09",
  description: "Full CRM suite rollout for Fintech Corp enterprise team — 200+ seats. Includes implementation, training and 24-month SaaS licence.",
  currency: "GBP",
  forecastCategory: "Commit",
  campaignSource: "Q3 Enterprise Nurture",
  nextStep: "Send final commercial proposal and negotiate payment terms",
}

const STAGES = [
  { key: "Prospecting", order: 0 },
  { key: "Qualification", order: 1 },
  { key: "Proposal", order: 2 },
  { key: "Negotiation", order: 3 },
  { key: "Closed Won", order: 4 },
  { key: "Closed Lost", order: 5 },
]

const CONTACTS = [
  { id: "2", name: "Marcus Williams", role: "Economic Buyer", title: "CFO", email: "m.williams@fintechcorp.co.uk", phone: "+44 20 7123 0001" },
  { id: "8", name: "James Whitfield", role: "Champion", title: "Head of Operations", email: "j.whitfield@fintechcorp.co.uk", phone: "+44 20 7123 4567" },
  { id: "9", name: "Sophie Lane", role: "Technical Evaluator", title: "IT Director", email: "s.lane@fintechcorp.co.uk", phone: "+44 20 7123 0002" },
]

const ACTIVITIES = [
  { type: "Email", icon: Mail, text: "Sent commercial proposal v2 — awaiting review", actor: "Alex Turner", time: "2026-06-09T14:30:00", color: "text-[var(--accent)]" },
  { type: "Call", icon: Phone, text: "Negotiation call — 35 mins — aligned on scope, pricing TBD", actor: "Alex Turner", time: "2026-06-08T11:00:00", color: "text-emerald-500" },
  { type: "Meeting", icon: Calendar, text: "Product demo — attended by CFO and IT Director", actor: "Alex Turner", time: "2026-06-05T15:00:00", color: "text-violet-500" },
  { type: "Note", icon: MessageSquare, text: "Decision timeline confirmed — board approval needed by end of July", actor: "Sarah Mitchell", time: "2026-06-04T10:00:00", color: "text-amber-500" },
  { type: "Email", icon: Mail, text: "Sent initial discovery questionnaire", actor: "Alex Turner", time: "2026-05-20T09:00:00", color: "text-[var(--accent)]" },
]

const TASKS = [
  { id: "t1", title: "Send final commercial proposal", due: "12 Jun 2026", assignee: "Alex Turner", done: false, priority: "High" },
  { id: "t2", title: "Arrange reference call with existing customer", due: "15 Jun 2026", assignee: "James Park", done: false, priority: "Medium" },
  { id: "t3", title: "Legal review of contract terms", due: "20 Jun 2026", assignee: "Sarah Mitchell", done: false, priority: "High" },
  { id: "t4", title: "Submit implementation timeline", due: "10 Jun 2026", assignee: "Alex Turner", done: true, priority: "Low" },
]

const QUOTES = [
  { id: "Q-0042", name: "Commercial Proposal v2", status: "Sent", total: 95000, date: "2026-06-09", expiry: "2026-07-09" },
  { id: "Q-0035", name: "Initial Scoping Proposal", status: "Superseded", total: 88000, date: "2026-05-28", expiry: "2026-06-28" },
]

const DOCUMENTS = [
  { name: "Commercial Proposal v2.pdf", size: "3.2 MB", date: "9 Jun 2026", type: "pdf" },
  { name: "Enterprise Scoping Notes.docx", size: "890 KB", date: "5 Jun 2026", type: "doc" },
  { name: "ROI Business Case.xlsx", size: "1.1 MB", date: "3 Jun 2026", type: "xls" },
  { name: "NDA Signed.pdf", size: "245 KB", date: "18 May 2026", type: "pdf" },
]

const EMAILS = [
  { id: "em1", subject: "Commercial Proposal v2 — Fintech Corp", from: "Alex Turner", date: "2026-06-09", status: "Sent" },
  { id: "em2", subject: "RE: Product Demo Follow-up", from: "James Whitfield", date: "2026-06-06", status: "Received" },
  { id: "em3", subject: "Orbas CRM — Demo Recording & Next Steps", from: "Alex Turner", date: "2026-06-05", status: "Sent" },
]

const HISTORY = [
  { field: "Stage", oldVal: "Qualification", newVal: "Proposal", by: "Alex Turner", time: "2026-06-01T10:00:00" },
  { field: "Probability", oldVal: "45%", newVal: "65%", by: "System", time: "2026-06-01T10:01:00" },
  { field: "Value", oldVal: "£88,000", newVal: "£95,000", by: "Alex Turner", time: "2026-05-29T14:30:00" },
  { field: "Close Date", oldVal: "31 Jul 2026", newVal: "31 Aug 2026", by: "Alex Turner", time: "2026-05-22T09:15:00" },
  { field: "Owner", oldVal: "James Park", newVal: "Alex Turner", by: "James Park", time: "2026-05-17T11:00:00" },
]

const stageColors: Record<string, string> = {
  "Prospecting": "bg-[var(--muted)] text-[var(--muted-foreground)]",
  "Qualification": "bg-blue-100 text-blue-700",
  "Proposal": "bg-violet-100 text-violet-700",
  "Negotiation": "bg-amber-100 text-amber-700",
  "Closed Won": "bg-emerald-100 text-emerald-700",
  "Closed Lost": "bg-red-100 text-red-700",
}

const quoteStatusColors: Record<string, string> = {
  Draft: "bg-[var(--muted)] text-[var(--muted-foreground)]",
  Sent: "bg-blue-100 text-blue-700",
  Viewed: "bg-violet-100 text-violet-700",
  Accepted: "bg-emerald-100 text-emerald-700",
  Declined: "bg-red-100 text-red-700",
  Superseded: "bg-[var(--muted)] text-[var(--muted-foreground)]",
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
          <Button size="sm" className="h-7 w-7 p-0" onClick={() => { onSave(val); setEditing(false) }}><Check className="h-3.5 w-3.5" /></Button>
          <Button size="sm" variant="ghost" className="h-7 w-7 p-0" onClick={() => setEditing(false)}><X className="h-3.5 w-3.5" /></Button>
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

export default function DealDetailPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const router = useRouter()
  const activeTab = searchParams.get("tab") || "overview"

  const [deal, setDeal] = useState<any>(DEAL)
  const [tasks, setTasks] = useState(TASKS)
  const [probability, setProbability] = useState(DEAL.probability)
  const [editingName, setEditingName] = useState(false)
  const [nameVal, setNameVal] = useState(DEAL.name)

  useEffect(() => {
    const id = params.id as string
    if (!id) return
    const supabase = createClient()
    supabase.from("deals").select("*, contacts(*), accounts(*)").eq("id", id).single()
      .then(({ data }) => {
        if (data) {
          const normalised = {
            ...data,
            name: data.name ?? data.title,
            account: data.account ?? data.accounts?.name ?? data.account,
            accountId: data.accountId ?? data.account_id ?? data.accountId,
            closeDate: data.closeDate ?? data.expected_close_date ?? data.closeDate,
            lastActivity: data.lastActivity ?? data.updated_at ?? data.created_at,
          }
          setDeal(normalised)
          setProbability(normalised.probability ?? DEAL.probability)
          setNameVal(normalised.name ?? DEAL.name)
        }
      })
  }, [params.id])

  function setTab(tab: string) {
    router.push(`/app/crm/deals/${params.id}?tab=${tab}`, { scroll: false })
  }

  const currentStageOrder = STAGES.find(s => s.key === deal.stage)?.order ?? 0

  const tabs = [
    { key: "overview", label: "Overview" },
    { key: "contacts", label: "Contacts" },
    { key: "account", label: "Account" },
    { key: "activities", label: "Activities" },
    { key: "tasks", label: "Tasks" },
    { key: "quotes", label: "Quotes" },
    { key: "documents", label: "Documents" },
    { key: "emails", label: "Emails" },
    { key: "history", label: "History" },
    { key: "ai", label: "AI Insights" },
  ]

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Back nav */}
      <div className="border-b border-[var(--border)] bg-[var(--card)] px-6 py-3">
        <Button variant="ghost" size="sm" asChild className="text-[var(--muted-foreground)] -ml-2">
          <Link href="/app/crm/deals"><ChevronLeft className="h-4 w-4 mr-1" />Back to Deals</Link>
        </Button>
      </div>

      {/* Hero */}
      <div className="border-b border-[var(--border)] bg-[var(--card)] px-6 py-5">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-start gap-4">
            <div className="h-14 w-14 rounded-xl bg-[var(--primary)]/10 flex items-center justify-center shrink-0">
              <TrendingUp className="h-7 w-7 text-[var(--primary)]" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                {editingName ? (
                  <>
                    <Input value={nameVal} onChange={e => setNameVal(e.target.value)} className="h-8 text-lg font-bold w-80" autoFocus />
                    <Button size="sm" className="h-8 w-8 p-0" onClick={() => setEditingName(false)}><Check className="h-4 w-4" /></Button>
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0" onClick={() => setEditingName(false)}><X className="h-4 w-4" /></Button>
                  </>
                ) : (
                  <button onClick={() => setEditingName(true)} className="text-xl font-bold text-[var(--foreground)] hover:text-[var(--primary)] transition-colors">
                    {nameVal}
                  </button>
                )}
                <Select value={deal.stage} onValueChange={v => setDeal((p: any) => ({ ...p, stage: v }))}>
                  <SelectTrigger className="h-6 w-auto border-0 bg-transparent px-1 focus:ring-0">
                    <span className={cn("inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium", stageColors[deal.stage])}>
                      {deal.stage}
                    </span>
                  </SelectTrigger>
                  <SelectContent>
                    {STAGES.map(s => <SelectItem key={s.key} value={s.key}>{s.key}</SelectItem>)}
                  </SelectContent>
                </Select>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">
                  {probability}% probability
                </span>
              </div>
              <p className="text-sm text-[var(--muted-foreground)]">
                <Link href={`/app/crm/accounts/${deal.accountId}`} className="hover:text-[var(--primary)] hover:underline">{deal.account}</Link>
                {" "}· Owned by {deal.owner} · Close {formatDate(deal.closeDate)}
              </p>

              {/* Stage Progress Bar */}
              <div className="mt-4 mb-2">
                <div className="flex items-center gap-0">
                  {STAGES.filter(s => s.key !== "Closed Lost").map((s, i) => {
                    const isActive = deal.stage === s.key
                    const isPast = s.order < currentStageOrder && deal.stage !== "Closed Lost"
                    const isWon = deal.stage === "Closed Won"
                    return (
                      <button
                        key={s.key}
                        onClick={() => setDeal((p: any) => ({ ...p, stage: s.key }))}
                        className={cn(
                          "flex-1 py-1.5 text-[10px] font-semibold text-center border-y border-r first:border-l first:rounded-l-full last:rounded-r-full transition-all truncate px-2",
                          isActive
                            ? isWon ? "bg-emerald-500 text-white border-emerald-500" : "bg-[var(--primary)] text-white border-[var(--primary)]"
                            : isPast
                              ? "bg-[var(--primary)]/20 text-[var(--primary)] border-[var(--primary)]/30"
                              : "bg-[var(--muted)] text-[var(--muted-foreground)] border-[var(--border)] hover:bg-[var(--muted)]/80"
                        )}
                      >
                        {s.key}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Key metrics strip */}
              <div className="flex flex-wrap gap-x-6 gap-y-2 mt-3">
                <div>
                  <p className="text-[10px] text-[var(--muted-foreground)] font-medium uppercase tracking-wide mb-0.5">Deal Value</p>
                  <p className="text-sm font-bold text-[var(--foreground)]">{formatCurrency(deal.value)}</p>
                </div>
                <InlineField label="Owner" value={deal.owner} onSave={v => setDeal((p: any) => ({ ...p, owner: v }))} />
                <InlineField label="Close Date" value={deal.closeDate} onSave={v => setDeal((p: any) => ({ ...p, closeDate: v }))} />
                <InlineField label="Type" value={deal.type} onSave={v => setDeal((p: any) => ({ ...p, type: v }))} />
                <InlineField label="Source" value={deal.source} onSave={v => setDeal((p: any) => ({ ...p, source: v }))} />
                <InlineField label="Forecast" value={deal.forecastCategory} onSave={v => setDeal((p: any) => ({ ...p, forecastCategory: v }))} />
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-2 shrink-0">
              <Button size="sm" variant="outline" className="text-xs h-8">
                <Edit2 className="h-3.5 w-3.5 mr-1.5" />Edit
              </Button>
              <Button size="sm" className="text-xs h-8 bg-emerald-600 hover:bg-emerald-700 text-white border-0">
                <ThumbsUp className="h-3.5 w-3.5 mr-1.5" />Mark Won
              </Button>
              <Button size="sm" variant="outline" className="text-xs h-8 text-red-600 border-red-200 hover:bg-red-50">
                <ThumbsDown className="h-3.5 w-3.5 mr-1.5" />Mark Lost
              </Button>
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

      {/* Content + Right Rail */}
      <div className="max-w-[1400px] mx-auto px-6 py-6 flex gap-6">
        <div className="flex-1 min-w-0 space-y-4">

          {/* Overview */}
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card className="border border-[var(--border)]">
                <CardHeader className="pb-3"><CardTitle className="text-sm font-semibold">Deal Details</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                  <InlineField label="Deal Name" value={nameVal} onSave={v => setNameVal(v)} />
                  <InlineField label="Account" value={deal.account} onSave={v => setDeal((p: any) => ({ ...p, account: v }))} />
                  <InlineField label="Stage" value={deal.stage} onSave={v => setDeal((p: any) => ({ ...p, stage: v }))} />
                  <InlineField label="Close Date" value={deal.closeDate} onSave={v => setDeal((p: any) => ({ ...p, closeDate: v }))} />
                  <InlineField label="Forecast Category" value={deal.forecastCategory} onSave={v => setDeal((p: any) => ({ ...p, forecastCategory: v }))} />
                  <InlineField label="Campaign Source" value={deal.campaignSource} onSave={v => setDeal((p: any) => ({ ...p, campaignSource: v }))} />
                  <Separator />
                  <div>
                    <p className="text-[10px] text-[var(--muted-foreground)] font-medium uppercase tracking-wide mb-1">Probability</p>
                    <div className="flex items-center gap-3">
                      <input
                        type="range" min={0} max={100} value={probability}
                        onChange={e => setProbability(Number(e.target.value))}
                        className="flex-1 h-1.5 accent-[var(--primary)]"
                      />
                      <span className="text-sm font-bold text-[var(--foreground)] w-10 text-right">{probability}%</span>
                    </div>
                    <Progress value={probability} className="mt-2 h-1.5" />
                  </div>
                  <Separator />
                  <div>
                    <p className="text-[10px] text-[var(--muted-foreground)] font-medium uppercase tracking-wide mb-1">Description</p>
                    <p className="text-sm text-[var(--foreground)]">{deal.description}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-[var(--muted-foreground)] font-medium uppercase tracking-wide mb-1">Next Step</p>
                    <p className="text-sm text-[var(--foreground)]">{deal.nextStep}</p>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Deal Value", value: formatCurrency(deal.value), icon: DollarSign, color: "text-[var(--primary)]", bg: "bg-[var(--primary)]/10" },
                    { label: "Probability", value: `${probability}%`, icon: Target, color: "text-violet-600", bg: "bg-violet-50" },
                    { label: "Weighted Value", value: formatCurrency(Math.round(deal.value * probability / 100)), icon: BarChart2, color: "text-emerald-600", bg: "bg-emerald-50" },
                    { label: "Days Open", value: "26", icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
                  ].map(m => (
                    <Card key={m.label} className="border border-[var(--border)]">
                      <CardContent className="p-4">
                        <div className={cn("inline-flex p-2 rounded-lg mb-2", m.bg)}>
                          <m.icon className={cn("h-4 w-4", m.color)} />
                        </div>
                        <p className="text-lg font-bold text-[var(--foreground)]">{m.value}</p>
                        <p className="text-xs text-[var(--muted-foreground)]">{m.label}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Card className="border border-[var(--border)]">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-[var(--primary)]" />
                      <CardTitle className="text-sm font-semibold">AI Insights</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div className="flex items-start gap-2 p-2 bg-blue-50 rounded-md">
                      <span className="text-blue-500 mt-0.5 shrink-0">•</span>
                      <p className="text-xs">Deal velocity is strong — moved from Qualification to Proposal in 17 days (avg is 24 days).</p>
                    </div>
                    <div className="flex items-start gap-2 p-2 bg-emerald-50 rounded-md">
                      <span className="text-emerald-500 mt-0.5 shrink-0">•</span>
                      <p className="text-xs">3 decision-makers engaged. High multi-stakeholder coverage increases win probability by ~22%.</p>
                    </div>
                    <div className="flex items-start gap-2 p-2 bg-amber-50 rounded-md">
                      <span className="text-amber-500 mt-0.5 shrink-0">•</span>
                      <p className="text-xs">No activity in last 2 days. Send follow-up to maintain momentum before close date pressure.</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Contacts */}
          {activeTab === "contacts" && (
            <Card className="border border-[var(--border)]">
              <CardHeader className="pb-3 flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-semibold">Linked Contacts</CardTitle>
                <Button size="sm" variant="outline" className="h-7 text-xs"><Plus className="h-3.5 w-3.5 mr-1" />Add Contact</Button>
              </CardHeader>
              <CardContent className="p-0">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[var(--border)] bg-[var(--muted)]">
                      {["Name", "Role", "Title", "Email", "Phone", ""].map(h => (
                        <th key={h} className="text-left px-4 py-2.5 text-xs font-semibold text-[var(--muted-foreground)]">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--border)]">
                    {CONTACTS.map(c => (
                      <tr key={c.id} className="hover:bg-[var(--muted)]/50">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-7 w-7">
                              <AvatarFallback className="text-[10px] bg-[var(--primary)]/10 text-[var(--primary)]">{getInitials(c.name)}</AvatarFallback>
                            </Avatar>
                            <Link href={`/app/crm/contacts/${c.id}`} className="font-medium text-[var(--primary)] hover:underline">{c.name}</Link>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-violet-100 text-violet-700 font-medium">{c.role}</span>
                        </td>
                        <td className="px-4 py-3 text-xs text-[var(--muted-foreground)]">{c.title}</td>
                        <td className="px-4 py-3 text-xs text-[var(--muted-foreground)]">{c.email}</td>
                        <td className="px-4 py-3 text-xs text-[var(--muted-foreground)]">{c.phone}</td>
                        <td className="px-4 py-3">
                          <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-[var(--muted-foreground)]">
                            <MoreHorizontal className="h-3.5 w-3.5" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          )}

          {/* Account */}
          {activeTab === "account" && (
            <Card className="border border-[var(--border)]">
              <CardHeader className="pb-3 flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-semibold">Linked Account</CardTitle>
                <Button size="sm" variant="outline" className="h-7 text-xs" asChild>
                  <Link href={`/app/crm/accounts/${deal.accountId}`}>View Full Account</Link>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-4 p-4 bg-[var(--muted)] rounded-lg">
                  <div className="h-12 w-12 rounded-xl bg-[var(--primary)]/10 flex items-center justify-center shrink-0">
                    <Building2 className="h-6 w-6 text-[var(--primary)]" />
                  </div>
                  <div className="flex-1 space-y-3">
                    <div>
                      <Link href={`/app/crm/accounts/${deal.accountId}`} className="text-base font-bold text-[var(--primary)] hover:underline">{deal.account}</Link>
                      <p className="text-xs text-[var(--muted-foreground)] mt-0.5">Financial Services · 201–500 employees · London, UK</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {[
                        { label: "ARR", value: "£185,000" },
                        { label: "Open Deals", value: "2" },
                        { label: "Contacts", value: "3" },
                        { label: "Type", value: "Customer" },
                      ].map(f => (
                        <div key={f.label}>
                          <p className="text-[10px] text-[var(--muted-foreground)] font-medium uppercase tracking-wide">{f.label}</p>
                          <p className="text-sm font-semibold text-[var(--foreground)]">{f.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Activities */}
          {activeTab === "activities" && (
            <Card className="border border-[var(--border)]">
              <CardHeader className="pb-3 flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-semibold">Activity Timeline</CardTitle>
                <Button size="sm" className="h-7 text-xs"><Plus className="h-3.5 w-3.5 mr-1" />Log Activity</Button>
              </CardHeader>
              <CardContent>
                <div className="relative pl-6">
                  <div className="absolute left-2 top-0 bottom-0 w-px bg-[var(--border)]" />
                  <div className="space-y-5">
                    {ACTIVITIES.map((item, i) => (
                      <div key={i} className="relative">
                        <div className={cn("absolute -left-4 mt-0.5 h-6 w-6 rounded-full flex items-center justify-center bg-[var(--card)] border-2 border-[var(--border)]", item.color)}>
                          <item.icon className="h-3 w-3" />
                        </div>
                        <div className="ml-2">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-[var(--muted)] text-[var(--muted-foreground)]">{item.type}</span>
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

          {/* Tasks */}
          {activeTab === "tasks" && (
            <Card className="border border-[var(--border)]">
              <CardHeader className="pb-3 flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-semibold">Tasks</CardTitle>
                <Button size="sm" className="h-7 text-xs"><Plus className="h-3.5 w-3.5 mr-1" />Add Task</Button>
              </CardHeader>
              <CardContent className="p-0">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[var(--border)] bg-[var(--muted)]">
                      {["", "Task", "Due Date", "Assignee", "Priority", "Status"].map(h => (
                        <th key={h} className="text-left px-4 py-2.5 text-xs font-semibold text-[var(--muted-foreground)]">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--border)]">
                    {tasks.map(task => (
                      <tr key={task.id} className="hover:bg-[var(--muted)]/50">
                        <td className="px-4 py-3 w-8">
                          <Checkbox checked={task.done} onCheckedChange={v => setTasks((p: any) => p.map((t: any) => t.id === task.id ? { ...t, done: v as boolean } : t))} />
                        </td>
                        <td className="px-4 py-3">
                          <span className={cn("text-sm font-medium", task.done && "line-through text-[var(--muted-foreground)]")}>{task.title}</span>
                        </td>
                        <td className="px-4 py-3 text-xs text-[var(--muted-foreground)]">{task.due}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1.5">
                            <Avatar className="h-5 w-5">
                              <AvatarFallback className="text-[9px] bg-[var(--primary)]/10 text-[var(--primary)]">{getInitials(task.assignee)}</AvatarFallback>
                            </Avatar>
                            <span className="text-xs text-[var(--muted-foreground)]">{task.assignee}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className={cn("text-[10px] px-2 py-0.5 rounded-full font-medium",
                            task.priority === "High" ? "bg-red-100 text-red-700" :
                            task.priority === "Medium" ? "bg-amber-100 text-amber-700" :
                            "bg-[var(--muted)] text-[var(--muted-foreground)]"
                          )}>{task.priority}</span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={cn("text-[10px] px-2 py-0.5 rounded-full font-medium",
                            task.done ? "bg-emerald-100 text-emerald-700" : "bg-blue-100 text-blue-700"
                          )}>{task.done ? "Done" : "Open"}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          )}

          {/* Quotes */}
          {activeTab === "quotes" && (
            <Card className="border border-[var(--border)]">
              <CardHeader className="pb-3 flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-semibold">Quotes & Proposals</CardTitle>
                <Button size="sm" className="h-7 text-xs" asChild>
                  <Link href="/app/crm/quotes/new"><Plus className="h-3.5 w-3.5 mr-1" />New Quote</Link>
                </Button>
              </CardHeader>
              <CardContent className="p-0">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[var(--border)] bg-[var(--muted)]">
                      {["Quote #", "Name", "Status", "Total", "Date", "Expiry", ""].map(h => (
                        <th key={h} className="text-left px-4 py-2.5 text-xs font-semibold text-[var(--muted-foreground)]">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--border)]">
                    {QUOTES.map(q => (
                      <tr key={q.id} className="hover:bg-[var(--muted)]/50">
                        <td className="px-4 py-3 font-medium text-[var(--primary)]">
                          <Link href={`/app/crm/quotes/${q.id}`} className="hover:underline">{q.id}</Link>
                        </td>
                        <td className="px-4 py-3 font-medium">{q.name}</td>
                        <td className="px-4 py-3">
                          <span className={cn("text-[10px] px-2 py-0.5 rounded-full font-medium", quoteStatusColors[q.status])}>{q.status}</span>
                        </td>
                        <td className="px-4 py-3 font-semibold">{formatCurrency(q.total)}</td>
                        <td className="px-4 py-3 text-xs text-[var(--muted-foreground)]">{formatDate(q.date)}</td>
                        <td className="px-4 py-3 text-xs text-[var(--muted-foreground)]">{formatDate(q.expiry)}</td>
                        <td className="px-4 py-3">
                          <Button variant="ghost" size="sm" className="h-7 text-xs">View</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          )}

          {/* Documents */}
          {activeTab === "documents" && (
            <Card className="border border-[var(--border)]">
              <CardHeader className="pb-3 flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-semibold">Documents</CardTitle>
                <Button size="sm" variant="outline" className="h-7 text-xs"><Paperclip className="h-3.5 w-3.5 mr-1" />Upload</Button>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {DOCUMENTS.map(f => (
                    <div key={f.name} className="p-3 border border-[var(--border)] rounded-lg hover:bg-[var(--muted)]/50 cursor-pointer group">
                      <FileText className="h-8 w-8 text-[var(--primary)]/60 mb-2" />
                      <p className="text-xs font-medium text-[var(--foreground)] truncate">{f.name}</p>
                      <p className="text-[10px] text-[var(--muted-foreground)] mt-0.5">{f.size} · {f.date}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Emails */}
          {activeTab === "emails" && (
            <Card className="border border-[var(--border)]">
              <CardHeader className="pb-3 flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-semibold">Email Threads</CardTitle>
                <Button size="sm" className="h-7 text-xs"><Mail className="h-3.5 w-3.5 mr-1" />Send Email</Button>
              </CardHeader>
              <CardContent className="space-y-2">
                {EMAILS.map(e => (
                  <div key={e.id} className="flex items-center justify-between p-3 border border-[var(--border)] rounded-lg hover:bg-[var(--muted)]/50 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className={cn("h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold",
                        e.status === "Received" ? "bg-emerald-100 text-emerald-700" : "bg-blue-100 text-blue-700"
                      )}>
                        {e.status === "Received" ? "IN" : "OUT"}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[var(--foreground)]">{e.subject}</p>
                        <p className="text-xs text-[var(--muted-foreground)]">{e.from} · {formatDate(e.date)}</p>
                      </div>
                    </div>
                    <span className={cn("text-[10px] px-2 py-0.5 rounded-full font-medium",
                      e.status === "Received" ? "bg-emerald-100 text-emerald-700" : "bg-blue-100 text-blue-700"
                    )}>{e.status}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* History */}
          {activeTab === "history" && (
            <Card className="border border-[var(--border)]">
              <CardHeader className="pb-3"><CardTitle className="text-sm font-semibold">Change History</CardTitle></CardHeader>
              <CardContent className="p-0">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[var(--border)] bg-[var(--muted)]">
                      {["Field", "Old Value", "New Value", "Changed By", "Timestamp"].map(h => (
                        <th key={h} className="text-left px-4 py-2.5 text-xs font-semibold text-[var(--muted-foreground)]">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--border)]">
                    {HISTORY.map((h, i) => (
                      <tr key={i} className="hover:bg-[var(--muted)]/50">
                        <td className="px-4 py-3 font-medium text-xs">{h.field}</td>
                        <td className="px-4 py-3 text-xs text-[var(--muted-foreground)] line-through">{h.oldVal}</td>
                        <td className="px-4 py-3 text-xs text-emerald-600 font-medium">{h.newVal}</td>
                        <td className="px-4 py-3 text-xs text-[var(--muted-foreground)]">{h.by}</td>
                        <td className="px-4 py-3 text-xs text-[var(--muted-foreground)]">{formatRelativeTime(h.time)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          )}

          {/* AI Insights */}
          {activeTab === "ai" && (
            <div className="space-y-4">
              <Card className="border border-[var(--border)]">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-[var(--primary)]" />
                    <CardTitle className="text-sm font-semibold">AI Deal Summary</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-[var(--foreground)] leading-relaxed">
                    The <strong>Enterprise SaaS Rollout</strong> deal with Fintech Corp Ltd is progressing well through the Proposal stage.
                    Three key stakeholders are engaged including the CFO (economic buyer), Head of Operations (champion), and IT Director (technical evaluator).
                    The deal has strong commercial signals — budget confirmed at £80–100K range and decision timeline aligned with Q3 close.
                  </p>
                  <Separator />
                  <div>
                    <p className="text-xs font-semibold text-[var(--foreground)] mb-2">Sentiment Analysis</p>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 bg-[var(--muted)] rounded-full h-2">
                        <div className="bg-emerald-500 h-2 rounded-full" style={{ width: "72%" }} />
                      </div>
                      <span className="text-xs font-semibold text-emerald-600">72% Positive</span>
                    </div>
                    <p className="text-xs text-[var(--muted-foreground)] mt-1">Based on email tone, response times and engagement patterns</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-[var(--border)]">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold">Recommended Next Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {[
                    { priority: "High", action: "Send final commercial proposal today — deal at risk if delayed beyond June 12", icon: "🔴" },
                    { priority: "Medium", action: "Arrange a reference call with an existing enterprise customer this week", icon: "🟡" },
                    { priority: "Medium", action: "Loop in legal team for contract review — typical turnaround is 5 days", icon: "🟡" },
                    { priority: "Low", action: "Prepare executive business review for board approval decision in July", icon: "🟢" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 bg-[var(--muted)] rounded-lg">
                      <span className="text-sm mt-0.5">{item.icon}</span>
                      <div className="flex-1">
                        <p className="text-xs text-[var(--foreground)]">{item.action}</p>
                        <span className="text-[10px] font-medium text-[var(--muted-foreground)]">{item.priority} Priority</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="border border-[var(--border)]">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold">Similar Closed Deals</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {[
                    { name: "NexPay SaaS Rollout", value: "£92,000", closed: "Won", cycle: "68 days" },
                    { name: "TrustBank CRM Suite", value: "£105,000", closed: "Won", cycle: "74 days" },
                    { name: "Capita Financial Platform", value: "£88,000", closed: "Lost", cycle: "91 days" },
                  ].map((d, i) => (
                    <div key={i} className="flex items-center justify-between p-2 rounded-md hover:bg-[var(--muted)]/50">
                      <div>
                        <p className="text-xs font-medium text-[var(--foreground)]">{d.name}</p>
                        <p className="text-[10px] text-[var(--muted-foreground)]">{d.value} · {d.cycle}</p>
                      </div>
                      <span className={cn("text-[10px] px-2 py-0.5 rounded-full font-medium",
                        d.closed === "Won" ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
                      )}>{d.closed}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        {/* Right Rail */}
        <div className="w-64 shrink-0 space-y-4">
          <Card className="border border-[var(--border)]">
            <CardHeader className="pb-2"><CardTitle className="text-xs font-semibold uppercase tracking-wide text-[var(--muted-foreground)]">Actions</CardTitle></CardHeader>
            <CardContent className="space-y-1.5 p-3">
              {[
                { icon: Edit2, label: "Edit Deal" },
                { icon: Phone, label: "Log Call" },
                { icon: Calendar, label: "Schedule Meeting" },
                { icon: Mail, label: "Send Email" },
                { icon: FileText, label: "Create Quote" },
                { icon: CheckSquare, label: "Add Task" },
                { icon: MessageSquare, label: "Add Note" },
                { icon: Archive, label: "Archive" },
              ].map(a => (
                <Button key={a.label} variant="ghost" size="sm" className="w-full justify-start h-8 text-xs font-medium">
                  <a.icon className="h-3.5 w-3.5 mr-2 text-[var(--muted-foreground)]" />{a.label}
                </Button>
              ))}
              <Separator />
              <Button variant="ghost" size="sm" className="w-full justify-start h-8 text-xs font-medium text-emerald-600 hover:bg-emerald-50">
                <ThumbsUp className="h-3.5 w-3.5 mr-2" />Mark Won
              </Button>
              <Button variant="ghost" size="sm" className="w-full justify-start h-8 text-xs font-medium text-red-600 hover:bg-red-50">
                <ThumbsDown className="h-3.5 w-3.5 mr-2" />Mark Lost
              </Button>
              <Separator />
              <Button variant="ghost" size="sm" className="w-full justify-start h-8 text-xs font-medium text-red-600 hover:bg-red-50">
                <Trash2 className="h-3.5 w-3.5 mr-2" />Delete Deal
              </Button>
            </CardContent>
          </Card>

          <Card className="border border-[var(--border)]">
            <CardHeader className="pb-2"><CardTitle className="text-xs font-semibold uppercase tracking-wide text-[var(--muted-foreground)]">Tasks</CardTitle></CardHeader>
            <CardContent className="space-y-2 p-3">
              {tasks.filter(t => !t.done).slice(0, 3).map(task => (
                <div key={task.id} className="flex items-start gap-2">
                  <Checkbox checked={task.done} onCheckedChange={v => setTasks((p: any) => p.map((t: any) => t.id === task.id ? { ...t, done: v as boolean } : t))} className="mt-0.5" />
                  <div>
                    <p className="text-xs font-medium text-[var(--foreground)]">{task.title}</p>
                    <p className="text-[10px] text-[var(--muted-foreground)]">Due {task.due}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border border-[var(--border)]">
            <CardHeader className="pb-2"><CardTitle className="text-xs font-semibold uppercase tracking-wide text-[var(--muted-foreground)]">Related Records</CardTitle></CardHeader>
            <CardContent className="space-y-1.5 p-3">
              <Link href="/app/crm/accounts/1" className="flex items-center gap-2 p-2 rounded-md hover:bg-[var(--muted)] transition-colors">
                <Building2 className="h-3.5 w-3.5 text-[var(--muted-foreground)]" />
                <span className="text-xs text-[var(--primary)] hover:underline">Fintech Corp Ltd</span>
              </Link>
              {CONTACTS.map(c => (
                <Link key={c.id} href={`/app/crm/contacts/${c.id}`} className="flex items-center gap-2 p-2 rounded-md hover:bg-[var(--muted)] transition-colors">
                  <User className="h-3.5 w-3.5 text-[var(--muted-foreground)]" />
                  <span className="text-xs text-[var(--primary)] hover:underline">{c.name}</span>
                </Link>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
