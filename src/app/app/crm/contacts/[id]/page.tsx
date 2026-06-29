"use client"

import React, { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import Link from "next/link"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import {
  ChevronLeft, Edit2, Check, X, Mail, Phone, Building2,
  Plus, Archive, Trash2, RefreshCw, Calendar, Activity,
  FileText, MessageSquare, Paperclip, Sparkles, TrendingUp,
  CheckSquare, User, Globe, Share2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select"
import { cn, getInitials, formatDate, formatRelativeTime, formatCurrency } from "@/lib/utils"

const CONTACT = {
  id: "1",
  name: "Sarah Chen",
  email: "s.chen@bluewave.digital",
  phone: "+44 20 7234 5678",
  jobTitle: "CTO",
  account: "BlueWave Digital",
  accountId: "2",
  status: "Active" as const,
  owner: "Alex Turner",
  linkedin: "linkedin.com/in/sarah-chen",
  twitter: "@sarahchen",
  address: "45 Victoria Street, London, SW1H 0ET",
  created: "2026-03-12",
  lastActivity: "2026-06-09",
}

const LINKED_DEALS = [
  { id: "2", name: "CRM Implementation", stage: "Negotiation", value: 82000 },
  { id: "5", name: "Marketing Automation", stage: "Closing", value: 38000 },
]

const TASKS = [
  { id: "t1", title: "Send product roadmap doc", due: "12 Jun 2026", done: false },
  { id: "t2", title: "Schedule Q3 review call", due: "18 Jun 2026", done: false },
]

const AUDIT = [
  { field: "Status", oldVal: "Inactive", newVal: "Active", by: "Alex Turner", time: "2026-06-01T10:00:00" },
  { field: "Owner", oldVal: "Tom Bradley", newVal: "Alex Turner", time: "2026-04-15T14:30:00", by: "Tom Bradley" },
]

const statusColors: Record<string, string> = {
  "Active": "bg-emerald-100 text-emerald-700",
  "Inactive": "bg-slate-100 text-slate-600",
  "Do Not Contact": "bg-red-100 text-red-700",
}

function InlineField({ label, value, onSave }: { label: string; value: string; onSave: (v: string) => void }) {
  const [editing, setEditing] = useState(false)
  const [val, setVal] = useState(value)
  return (
    <div className="group">
      <p className="text-[10px] text-[var(--muted-foreground)] font-medium uppercase tracking-wide mb-0.5">{label}</p>
      {editing ? (
        <div className="flex items-center gap-1">
          <Input value={val} onChange={e => setVal(e.target.value)} className="h-7 text-sm" autoFocus />
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

export default function ContactDetailPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const router = useRouter()
  const activeTab = searchParams.get("tab") || "overview"
  const [contact, setContact] = useState<any>(CONTACT)

  useEffect(() => {
    const id = params.id as string
    if (!id) return
    const supabase = createClient()
    supabase.from("contacts").select("*, accounts(*)").eq("id", id).single()
      .then(({ data }) => {
        if (data) {
          setContact({
            ...data,
            name: data.name ?? `${data.first_name ?? ""} ${data.last_name ?? ""}`.trim(),
            jobTitle: data.jobTitle ?? data.job_title ?? data.jobTitle,
            account: data.account ?? data.accounts?.name ?? data.account,
            accountId: data.accountId ?? data.account_id ?? data.accountId,
            lastActivity: data.lastActivity ?? data.updated_at ?? data.created_at,
          })
        }
      })
  }, [params.id])
  const [tasks, setTasks] = useState(TASKS)
  const [dnc, setDnc] = useState(false)
  const [emailOptIn, setEmailOptIn] = useState(true)

  function setTab(tab: string) {
    router.push(`/app/crm/contacts/${params.id}?tab=${tab}`, { scroll: false })
  }

  const tabs = [
    "overview","activity","deals","accounts","emails","tickets","invoices","documents","preferences","audit"
  ].map(k => ({ key: k, label: k.charAt(0).toUpperCase() + k.slice(1) }))

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="border-b border-[var(--border)] bg-[var(--card)] px-6 py-3">
        <Button variant="ghost" size="sm" asChild className="text-[var(--muted-foreground)] -ml-2">
          <Link href="/app/crm/contacts"><ChevronLeft className="h-4 w-4 mr-1" />Back to Contacts</Link>
        </Button>
      </div>

      {/* Hero */}
      <div className="border-b border-[var(--border)] bg-[var(--card)] px-6 py-5">
        <div className="max-w-[1400px] mx-auto flex items-start gap-4">
          <Avatar className="h-14 w-14 shrink-0">
            <AvatarFallback className="text-lg bg-[var(--primary)]/10 text-[var(--primary)] font-bold">
              {getInitials(contact.name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <h1 className="text-xl font-bold text-[var(--foreground)]">{contact.name}</h1>
              <Select value={contact.status} onValueChange={v => setContact((p: any) => ({...p, status: v as any}))}>
                <SelectTrigger className="h-6 w-auto border-0 bg-transparent px-1 focus:ring-0">
                  <span className={cn("inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium", statusColors[contact.status])}>
                    {contact.status}
                  </span>
                </SelectTrigger>
                <SelectContent>
                  {["Active","Inactive","Do Not Contact"].map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <p className="text-sm text-[var(--muted-foreground)]">{contact.jobTitle} · <Link href={`/app/crm/accounts/${contact.accountId}`} className="text-[var(--primary)] hover:underline">{contact.account}</Link></p>
            <div className="flex flex-wrap gap-x-6 gap-y-2 mt-3">
              <InlineField label="Email" value={contact.email} onSave={v => setContact((p: any) => ({...p, email: v}))} />
              <InlineField label="Phone" value={contact.phone} onSave={v => setContact((p: any) => ({...p, phone: v}))} />
              <InlineField label="Owner" value={contact.owner} onSave={v => setContact((p: any) => ({...p, owner: v}))} />
              <InlineField label="Created" value={formatDate(contact.created)} onSave={() => {}} />
              <InlineField label="Last Activity" value={formatRelativeTime(contact.lastActivity)} onSave={() => {}} />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-[var(--border)] bg-[var(--card)] px-6">
        <div className="max-w-[1400px] mx-auto flex gap-0 overflow-x-auto">
          {tabs.map(t => (
            <button key={t.key} onClick={() => setTab(t.key)} className={cn(
              "px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap",
              activeTab === t.key ? "border-[var(--primary)] text-[var(--primary)]" : "border-transparent text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
            )}>{t.label}</button>
          ))}
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 py-6 flex gap-6">
        <div className="flex-1 min-w-0 space-y-4">
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card className="border border-[var(--border)]">
                <CardHeader className="pb-3"><CardTitle className="text-sm font-semibold">Key Details</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                  <InlineField label="Job Title" value={contact.jobTitle} onSave={v => setContact((p: any) => ({...p, jobTitle: v}))} />
                  <InlineField label="Account" value={contact.account} onSave={v => setContact((p: any) => ({...p, account: v}))} />
                  <InlineField label="Address" value={contact.address} onSave={v => setContact((p: any) => ({...p, address: v}))} />
                  <Separator />
                  <div className="flex items-center gap-2">
                    <Globe className="h-3.5 w-3.5 text-[var(--muted-foreground)]" />
                    <a href={`https://${contact.linkedin}`} className="text-xs text-[var(--primary)] hover:underline" target="_blank" rel="noreferrer">{contact.linkedin}</a>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-3.5 w-3.5 text-[var(--muted-foreground)]" />
                    <span className="text-xs text-[var(--foreground)]">{contact.twitter}</span>
                  </div>
                </CardContent>
              </Card>
              <div className="space-y-4">
                <Card className="border border-[var(--border)]">
                  <CardHeader className="pb-3"><div className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-[var(--primary)]" /><CardTitle className="text-sm font-semibold">AI Insights</CardTitle></div></CardHeader>
                  <CardContent className="space-y-2">
                    <div className="p-2 bg-blue-50 rounded-md text-xs">• Sarah is involved in 2 active deals totalling £120K — high-value contact to nurture.</div>
                    <div className="p-2 bg-emerald-50 rounded-md text-xs">• Last activity was 1 day ago — engagement is strong. Recommend scheduling a QBR.</div>
                    <div className="p-2 bg-amber-50 rounded-md text-xs">• Contact has not been added to any campaigns. Consider Q3 nurture sequence.</div>
                  </CardContent>
                </Card>
                <Card className="border border-[var(--border)]">
                  <CardHeader className="pb-3"><CardTitle className="text-sm font-semibold">Linked Deals</CardTitle></CardHeader>
                  <CardContent className="space-y-2">
                    {LINKED_DEALS.map(d => (
                      <Link key={d.id} href={`/app/crm/deals/${d.id}`} className="flex items-center justify-between p-2 rounded-md bg-[var(--muted)] hover:bg-[var(--muted)]/80">
                        <div>
                          <p className="text-xs font-medium text-[var(--foreground)]">{d.name}</p>
                          <p className="text-[10px] text-[var(--muted-foreground)]">{d.stage}</p>
                        </div>
                        <span className="text-xs font-semibold text-[var(--foreground)]">{formatCurrency(d.value)}</span>
                      </Link>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === "deals" && (
            <Card className="border border-[var(--border)]">
              <CardHeader className="pb-3 flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-semibold">Deals</CardTitle>
                <Button size="sm" variant="outline" className="h-7 text-xs"><Plus className="h-3.5 w-3.5 mr-1" />New Deal</Button>
              </CardHeader>
              <CardContent className="p-0">
                <table className="w-full text-sm">
                  <thead><tr className="border-b border-[var(--border)] bg-[var(--muted)]">
                    {["Deal Name","Stage","Value"].map(h => <th key={h} className="text-left px-4 py-2.5 text-xs font-semibold text-[var(--muted-foreground)]">{h}</th>)}
                  </tr></thead>
                  <tbody className="divide-y divide-[var(--border)]">
                    {LINKED_DEALS.map(d => (
                      <tr key={d.id} className="hover:bg-[var(--muted)]/50">
                        <td className="px-4 py-3"><Link href={`/app/crm/deals/${d.id}`} className="font-medium text-[var(--primary)] hover:underline">{d.name}</Link></td>
                        <td className="px-4 py-3"><span className="text-xs px-2 py-0.5 rounded-full bg-violet-100 text-violet-700">{d.stage}</span></td>
                        <td className="px-4 py-3 font-semibold">{formatCurrency(d.value)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          )}

          {activeTab === "activity" && (
            <Card className="border border-[var(--border)]">
              <CardHeader className="pb-3 flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-semibold">Activity</CardTitle>
                <Button size="sm" className="h-7 text-xs"><Plus className="h-3.5 w-3.5 mr-1" />Log Activity</Button>
              </CardHeader>
              <CardContent>
                <div className="relative pl-6">
                  <div className="absolute left-2 top-0 bottom-0 w-px bg-[var(--border)]" />
                  <div className="space-y-4">
                    {[
                      { type: "Call", text: "Outbound call — 18 mins — Architecture review", time: "2026-06-09T11:00:00", color: "text-emerald-500" },
                      { type: "Email", text: "Sent: Q3 roadmap overview deck", time: "2026-06-08T15:30:00", color: "text-cyan-500" },
                      { type: "Meeting", text: "Product demo — 45 mins — BlueWave HQ", time: "2026-06-05T10:00:00", color: "text-violet-500" },
                    ].map((item, i) => (
                      <div key={i} className="relative">
                        <div className={cn("absolute -left-4 mt-0.5 h-5 w-5 rounded-full flex items-center justify-center bg-white border border-[var(--border)]", item.color)}>
                          <Activity className="h-2.5 w-2.5" />
                        </div>
                        <p className="text-xs font-medium px-1.5 py-0.5 rounded bg-[var(--muted)] inline-block mb-1">{item.type}</p>
                        <p className="text-sm text-[var(--foreground)]">{item.text}</p>
                        <p className="text-xs text-[var(--muted-foreground)]">{formatRelativeTime(item.time)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "emails" && (
            <Card className="border border-[var(--border)]">
              <CardHeader className="pb-3 flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-semibold">Emails</CardTitle>
                <Button size="sm" className="h-7 text-xs"><Mail className="h-3.5 w-3.5 mr-1" />Send Email</Button>
              </CardHeader>
              <CardContent className="p-0">
                <table className="w-full text-sm">
                  <thead><tr className="border-b border-[var(--border)] bg-[var(--muted)]">
                    {["Subject","Date","Status"].map(h => <th key={h} className="text-left px-4 py-2.5 text-xs font-semibold text-[var(--muted-foreground)]">{h}</th>)}
                  </tr></thead>
                  <tbody className="divide-y divide-[var(--border)]">
                    {[
                      { subject: "Q3 roadmap overview", date: "2026-06-08", status: "Opened" },
                      { subject: "Welcome to Orbas CRM", date: "2026-03-12", status: "Delivered" },
                    ].map((e, i) => (
                      <tr key={i} className="hover:bg-[var(--muted)]/50">
                        <td className="px-4 py-3 font-medium">{e.subject}</td>
                        <td className="px-4 py-3 text-xs text-[var(--muted-foreground)]">{formatDate(e.date)}</td>
                        <td className="px-4 py-3"><span className={cn("text-xs px-2 py-0.5 rounded-full font-medium", e.status === "Opened" ? "bg-emerald-100 text-emerald-700" : "bg-blue-100 text-blue-700")}>{e.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          )}

          {activeTab === "tickets" && (
            <Card className="border border-[var(--border)]">
              <CardHeader className="pb-3 flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-semibold">Support Tickets</CardTitle>
                <Button size="sm" variant="outline" className="h-7 text-xs"><Plus className="h-3.5 w-3.5 mr-1" />New Ticket</Button>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-[var(--muted-foreground)]">No support tickets linked to this contact.</p>
              </CardContent>
            </Card>
          )}

          {activeTab === "invoices" && (
            <Card className="border border-[var(--border)]">
              <CardHeader className="pb-3"><CardTitle className="text-sm font-semibold">Invoices</CardTitle></CardHeader>
              <CardContent>
                <p className="text-sm text-[var(--muted-foreground)]">No invoices linked to this contact.</p>
              </CardContent>
            </Card>
          )}

          {activeTab === "documents" && (
            <Card className="border border-[var(--border)]">
              <CardHeader className="pb-3 flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-semibold">Documents</CardTitle>
                <Button size="sm" variant="outline" className="h-7 text-xs"><Paperclip className="h-3.5 w-3.5 mr-1" />Upload</Button>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[{ name: "BlueWave NDA.pdf", size: "256 KB", date: "12 Mar 2026" }].map(f => (
                    <div key={f.name} className="p-3 border border-[var(--border)] rounded-lg hover:bg-[var(--muted)]/50 cursor-pointer">
                      <FileText className="h-7 w-7 text-[var(--primary)]/60 mb-1.5" />
                      <p className="text-xs font-medium truncate">{f.name}</p>
                      <p className="text-[10px] text-[var(--muted-foreground)]">{f.size} · {f.date}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "accounts" && (
            <Card className="border border-[var(--border)]">
              <CardHeader className="pb-3"><CardTitle className="text-sm font-semibold">Account</CardTitle></CardHeader>
              <CardContent>
                <Link href={`/app/crm/accounts/${contact.accountId}`} className="flex items-center gap-3 p-3 rounded-lg bg-[var(--muted)] hover:bg-[var(--muted)]/80">
                  <div className="h-10 w-10 rounded-lg bg-[var(--primary)]/10 flex items-center justify-center">
                    <Building2 className="h-5 w-5 text-[var(--primary)]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[var(--primary)] hover:underline">{contact.account}</p>
                    <p className="text-xs text-[var(--muted-foreground)]">Customer · 5 contacts · 2 active deals</p>
                  </div>
                </Link>
              </CardContent>
            </Card>
          )}

          {activeTab === "preferences" && (
            <Card className="border border-[var(--border)]">
              <CardHeader className="pb-3"><CardTitle className="text-sm font-semibold">Communication Preferences</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between py-2 border-b border-[var(--border)]">
                  <div>
                    <p className="text-sm font-medium">Email Marketing</p>
                    <p className="text-xs text-[var(--muted-foreground)]">Receive campaign and nurture emails</p>
                  </div>
                  <Switch checked={emailOptIn} onCheckedChange={setEmailOptIn} />
                </div>
                <div className="flex items-center justify-between py-2 border-b border-[var(--border)]">
                  <div>
                    <p className="text-sm font-medium text-red-600">Do Not Contact</p>
                    <p className="text-xs text-[var(--muted-foreground)]">Block all outreach to this contact</p>
                  </div>
                  <Switch checked={dnc} onCheckedChange={setDnc} />
                </div>
                {dnc && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-md text-xs text-red-700">
                    This contact is marked as Do Not Contact. All communications are blocked.
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {activeTab === "audit" && (
            <Card className="border border-[var(--border)]">
              <CardHeader className="pb-3"><CardTitle className="text-sm font-semibold">Audit Trail</CardTitle></CardHeader>
              <CardContent className="p-0">
                <table className="w-full text-sm">
                  <thead><tr className="border-b border-[var(--border)] bg-[var(--muted)]">
                    {["Field","Old Value","New Value","Changed By","Timestamp"].map(h => <th key={h} className="text-left px-4 py-2.5 text-xs font-semibold text-[var(--muted-foreground)]">{h}</th>)}
                  </tr></thead>
                  <tbody className="divide-y divide-[var(--border)]">
                    {AUDIT.map((a, i) => (
                      <tr key={i} className="hover:bg-[var(--muted)]/50">
                        <td className="px-4 py-3 text-xs font-medium">{a.field}</td>
                        <td className="px-4 py-3 text-xs line-through text-[var(--muted-foreground)]">{a.oldVal}</td>
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
          <Card className="border border-[var(--border)]">
            <CardHeader className="pb-2"><CardTitle className="text-xs font-semibold uppercase tracking-wide text-[var(--muted-foreground)]">Actions</CardTitle></CardHeader>
            <CardContent className="space-y-1.5 p-3">
              {[
                { icon: Edit2, label: "Edit Contact" },
                { icon: Activity, label: "Log Activity" },
                { icon: Mail, label: "Send Email" },
                { icon: Calendar, label: "Schedule Meeting" },
                { icon: CheckSquare, label: "Add Task" },
                { icon: MessageSquare, label: "Add Note" },
                { icon: TrendingUp, label: "New Deal" },
                { icon: Archive, label: "Archive" },
              ].map(a => (
                <Button key={a.label} variant="ghost" size="sm" className="w-full justify-start h-8 text-xs font-medium">
                  <a.icon className="h-3.5 w-3.5 mr-2 text-[var(--muted-foreground)]" />{a.label}
                </Button>
              ))}
              <Separator />
              <Button variant="ghost" size="sm" className="w-full justify-start h-8 text-xs font-medium text-red-600 hover:text-red-700 hover:bg-red-50">
                <Trash2 className="h-3.5 w-3.5 mr-2" />Delete Contact
              </Button>
            </CardContent>
          </Card>

          <Card className="border border-[var(--border)]">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <CardTitle className="text-xs font-semibold uppercase tracking-wide text-[var(--muted-foreground)]">Tasks</CardTitle>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0"><Plus className="h-3.5 w-3.5" /></Button>
            </CardHeader>
            <CardContent className="space-y-2 p-3">
              {tasks.map(task => (
                <div key={task.id} className="flex items-start gap-2">
                  <Checkbox checked={task.done} onCheckedChange={v => setTasks((p: any) => p.map((t: any) => t.id === task.id ? {...t, done: v as boolean} : t))} className="mt-0.5" />
                  <div>
                    <p className={cn("text-xs font-medium", task.done && "line-through text-[var(--muted-foreground)]")}>{task.title}</p>
                    <p className="text-[10px] text-[var(--muted-foreground)]">Due {task.due}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border border-[var(--border)]">
            <CardHeader className="pb-2"><CardTitle className="text-xs font-semibold uppercase tracking-wide text-[var(--muted-foreground)]">Related Records</CardTitle></CardHeader>
            <CardContent className="space-y-1.5 p-3">
              <Link href={`/app/crm/accounts/${contact.accountId}`} className="flex items-center gap-2 p-2 rounded-md hover:bg-[var(--muted)] transition-colors">
                <Building2 className="h-3.5 w-3.5 text-[var(--muted-foreground)]" />
                <span className="text-xs text-[var(--primary)] hover:underline">{contact.account}</span>
              </Link>
              {LINKED_DEALS.map(d => (
                <Link key={d.id} href={`/app/crm/deals/${d.id}`} className="flex items-center gap-2 p-2 rounded-md hover:bg-[var(--muted)] transition-colors">
                  <TrendingUp className="h-3.5 w-3.5 text-[var(--muted-foreground)]" />
                  <span className="text-xs text-[var(--primary)] hover:underline truncate">{d.name}</span>
                </Link>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
