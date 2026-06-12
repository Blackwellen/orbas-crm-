"use client"

import React, { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import Link from "next/link"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import {
  ChevronLeft, Edit2, Check, X, Building2, Globe, Phone, Mail,
  Users, TrendingUp, Plus, Archive, Trash2, MessageSquare,
  FileText, Sparkles, Calendar, Activity, Paperclip, MapPin
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select"
import { cn, formatCurrency, formatDate, formatRelativeTime, getInitials } from "@/lib/utils"

const ACCOUNT = {
  id: "1",
  name: "Fintech Corp Ltd",
  industry: "Financial Services",
  type: "Customer" as const,
  website: "https://fintechcorp.co.uk",
  phone: "+44 20 7123 4567",
  email: "info@fintechcorp.co.uk",
  address: "88 Bishopsgate, London, EC2N 4AG",
  size: "201–500 employees",
  arr: 185000,
  owner: "Alex Turner",
  created: "2025-11-01",
  lastActivity: "2026-06-09",
}

const CONTACTS = [
  { id: "2", name: "Marcus Williams", jobTitle: "CFO", email: "m.williams@fintechcorp.co.uk", status: "Active" },
  { id: "8", name: "James Whitfield",  jobTitle: "Head of Operations", email: "j.whitfield@fintechcorp.co.uk", status: "Active" },
]

const DEALS = [
  { id: "1", name: "Enterprise SaaS Rollout", stage: "Proposal", value: 95000, owner: "Alex Turner" },
  { id: "3", name: "Data Analytics Suite", stage: "Qualification", value: 48000, owner: "James Park" },
]

const INVOICES = [
  { id: "INV-001", date: "2026-05-01", amount: 15000, status: "Paid" },
  { id: "INV-002", date: "2026-06-01", amount: 15000, status: "Outstanding" },
]

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

const typeColors: Record<string, string> = {
  Prospect: "bg-blue-100 text-blue-700",
  Customer: "bg-emerald-100 text-emerald-700",
  Partner:  "bg-violet-100 text-violet-700",
}

const stageColors: Record<string, string> = {
  Prospecting: "bg-slate-100 text-slate-700",
  Qualification: "bg-blue-100 text-blue-700",
  Proposal: "bg-violet-100 text-violet-700",
  Negotiation: "bg-amber-100 text-amber-700",
  Closing: "bg-emerald-100 text-emerald-700",
}

export default function AccountDetailPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const router = useRouter()
  const activeTab = searchParams.get("tab") || "overview"
  const [account, setAccount] = useState<any>(ACCOUNT)

  useEffect(() => {
    const id = params.id as string
    if (!id) return
    const supabase = createClient()
    supabase.from("accounts").select("*, contacts(*)").eq("id", id).single()
      .then(({ data }) => {
        if (data) {
          setAccount({
            ...data,
            lastActivity: data.lastActivity ?? data.updated_at ?? data.created_at,
          })
        }
      })
  }, [params.id])

  function setTab(tab: string) {
    router.push(`/app/crm/accounts/${params.id}?tab=${tab}`, { scroll: false })
  }

  const tabs = ["overview","contacts","deals","activities","invoices","projects","tickets","contracts","documents","locations","audit"]
    .map(k => ({ key: k, label: k.charAt(0).toUpperCase() + k.slice(1) }))

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="border-b border-[var(--border)] bg-[var(--card)] px-6 py-3">
        <Button variant="ghost" size="sm" asChild className="text-[var(--muted-foreground)] -ml-2">
          <Link href="/app/crm/accounts"><ChevronLeft className="h-4 w-4 mr-1" />Back to Accounts</Link>
        </Button>
      </div>

      {/* Hero */}
      <div className="border-b border-[var(--border)] bg-[var(--card)] px-6 py-5">
        <div className="max-w-[1400px] mx-auto flex items-start gap-4">
          <div className="h-14 w-14 rounded-xl bg-[var(--primary)]/10 flex items-center justify-center shrink-0">
            <Building2 className="h-7 w-7 text-[var(--primary)]" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <h1 className="text-xl font-bold text-[var(--foreground)]">{account.name}</h1>
              <span className={cn("text-xs px-2 py-0.5 rounded-full font-medium", "bg-slate-100 text-slate-700")}>{account.industry}</span>
              <span className={cn("text-xs px-2 py-0.5 rounded-full font-medium", typeColors[account.type])}>{account.type}</span>
            </div>
            <p className="text-sm text-[var(--muted-foreground)]">Owned by {account.owner} · ARR {formatCurrency(account.arr)}</p>
            <div className="flex flex-wrap gap-x-6 gap-y-2 mt-3">
              <InlineField label="Website" value={account.website} onSave={v => setAccount((p: any) => ({...p, website: v}))} />
              <InlineField label="Phone" value={account.phone} onSave={v => setAccount((p: any) => ({...p, phone: v}))} />
              <InlineField label="Email" value={account.email} onSave={v => setAccount((p: any) => ({...p, email: v}))} />
              <InlineField label="Size" value={account.size} onSave={v => setAccount((p: any) => ({...p, size: v}))} />
              <InlineField label="ARR" value={formatCurrency(account.arr)} onSave={() => {}} />
              <InlineField label="Last Activity" value={formatRelativeTime(account.lastActivity)} onSave={() => {}} />
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
                <CardHeader className="pb-3"><CardTitle className="text-sm font-semibold">Company Details</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                  <InlineField label="Industry" value={account.industry} onSave={v => setAccount((p: any) => ({...p, industry: v}))} />
                  <InlineField label="Type" value={account.type} onSave={v => setAccount((p: any) => ({...p, type: v as any}))} />
                  <InlineField label="Address" value={account.address} onSave={v => setAccount((p: any) => ({...p, address: v}))} />
                  <InlineField label="Size" value={account.size} onSave={v => setAccount((p: any) => ({...p, size: v}))} />
                  <InlineField label="Owner" value={account.owner} onSave={v => setAccount((p: any) => ({...p, owner: v}))} />
                  <InlineField label="Created" value={formatDate(account.created)} onSave={() => {}} />
                </CardContent>
              </Card>
              <div className="space-y-4">
                <Card className="border border-[var(--border)]">
                  <CardHeader className="pb-3"><div className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-[var(--primary)]" /><CardTitle className="text-sm font-semibold">AI Insights</CardTitle></div></CardHeader>
                  <CardContent className="space-y-2">
                    <div className="p-2 bg-blue-50 rounded-md text-xs">• Account ARR has grown 24% YoY — strong expansion opportunity.</div>
                    <div className="p-2 bg-emerald-50 rounded-md text-xs">• 2 open deals totalling £143K. Move Enterprise SaaS Rollout to Negotiation this week.</div>
                    <div className="p-2 bg-amber-50 rounded-md text-xs">• Invoice INV-002 is outstanding. Consider flagging to finance team.</div>
                  </CardContent>
                </Card>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Contacts", value: CONTACTS.length, icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
                    { label: "Open Deals", value: DEALS.length, icon: TrendingUp, color: "text-violet-600", bg: "bg-violet-50" },
                    { label: "ARR", value: `£${(account.arr/1000).toFixed(0)}k`, icon: Building2, color: "text-emerald-600", bg: "bg-emerald-50" },
                  ].map(s => (
                    <Card key={s.label} className="border border-[var(--border)]">
                      <CardContent className="p-3 text-center">
                        <div className={`inline-flex p-2 rounded-lg ${s.bg} mb-1.5`}><s.icon className={`h-4 w-4 ${s.color}`} /></div>
                        <p className="text-xl font-bold text-[var(--foreground)]">{s.value}</p>
                        <p className="text-xs text-[var(--muted-foreground)]">{s.label}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "contacts" && (
            <Card className="border border-[var(--border)]">
              <CardHeader className="pb-3 flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-semibold">Contacts</CardTitle>
                <Button size="sm" variant="outline" className="h-7 text-xs"><Plus className="h-3.5 w-3.5 mr-1" />Add Contact</Button>
              </CardHeader>
              <CardContent className="p-0">
                <table className="w-full text-sm">
                  <thead><tr className="border-b border-[var(--border)] bg-[var(--muted)]">
                    {["Name","Job Title","Email","Status"].map(h => <th key={h} className="text-left px-4 py-2.5 text-xs font-semibold text-[var(--muted-foreground)]">{h}</th>)}
                  </tr></thead>
                  <tbody className="divide-y divide-[var(--border)]">
                    {CONTACTS.map(c => (
                      <tr key={c.id} className="hover:bg-[var(--muted)]/50">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-7 w-7"><AvatarFallback className="text-[10px] bg-[var(--primary)]/10 text-[var(--primary)]">{getInitials(c.name)}</AvatarFallback></Avatar>
                            <Link href={`/app/crm/contacts/${c.id}`} className="font-medium text-[var(--primary)] hover:underline">{c.name}</Link>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-xs text-[var(--muted-foreground)]">{c.jobTitle}</td>
                        <td className="px-4 py-3 text-xs text-[var(--muted-foreground)]">{c.email}</td>
                        <td className="px-4 py-3"><span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-medium">{c.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          )}

          {activeTab === "deals" && (
            <Card className="border border-[var(--border)]">
              <CardHeader className="pb-3 flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-semibold">Deals</CardTitle>
                <Button size="sm" variant="outline" className="h-7 text-xs" asChild><Link href="/app/crm/deals/new"><Plus className="h-3.5 w-3.5 mr-1" />New Deal</Link></Button>
              </CardHeader>
              <CardContent className="p-0">
                <table className="w-full text-sm">
                  <thead><tr className="border-b border-[var(--border)] bg-[var(--muted)]">
                    {["Deal Name","Stage","Value","Owner"].map(h => <th key={h} className="text-left px-4 py-2.5 text-xs font-semibold text-[var(--muted-foreground)]">{h}</th>)}
                  </tr></thead>
                  <tbody className="divide-y divide-[var(--border)]">
                    {DEALS.map(d => (
                      <tr key={d.id} className="hover:bg-[var(--muted)]/50">
                        <td className="px-4 py-3"><Link href={`/app/crm/deals/${d.id}`} className="font-medium text-[var(--primary)] hover:underline">{d.name}</Link></td>
                        <td className="px-4 py-3"><span className={cn("text-[10px] px-2 py-0.5 rounded-full font-medium", stageColors[d.stage])}>{d.stage}</span></td>
                        <td className="px-4 py-3 font-semibold">{formatCurrency(d.value)}</td>
                        <td className="px-4 py-3 text-xs text-[var(--muted-foreground)]">{d.owner}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          )}

          {activeTab === "activities" && (
            <Card className="border border-[var(--border)]">
              <CardHeader className="pb-3 flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-semibold">Activities</CardTitle>
                <Button size="sm" className="h-7 text-xs"><Plus className="h-3.5 w-3.5 mr-1" />Log Activity</Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { type: "Call", text: "Quarterly review call — 45 mins", time: "2026-06-09", by: "Alex Turner" },
                    { type: "Email", text: "Sent renewal proposal", time: "2026-06-05", by: "Sarah Mitchell" },
                    { type: "Meeting", text: "Executive sponsor meeting — London HQ", time: "2026-05-28", by: "Alex Turner" },
                  ].map((a, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-[var(--muted)]">
                      <span className="text-xs font-medium px-2 py-0.5 rounded bg-white border border-[var(--border)]">{a.type}</span>
                      <div className="flex-1">
                        <p className="text-sm text-[var(--foreground)]">{a.text}</p>
                        <p className="text-xs text-[var(--muted-foreground)] mt-0.5">{a.by} · {formatDate(a.time)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "invoices" && (
            <Card className="border border-[var(--border)]">
              <CardHeader className="pb-3 flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-semibold">Invoices</CardTitle>
                <Button size="sm" variant="outline" className="h-7 text-xs"><Plus className="h-3.5 w-3.5 mr-1" />New Invoice</Button>
              </CardHeader>
              <CardContent className="p-0">
                <table className="w-full text-sm">
                  <thead><tr className="border-b border-[var(--border)] bg-[var(--muted)]">
                    {["Invoice #","Date","Amount","Status"].map(h => <th key={h} className="text-left px-4 py-2.5 text-xs font-semibold text-[var(--muted-foreground)]">{h}</th>)}
                  </tr></thead>
                  <tbody className="divide-y divide-[var(--border)]">
                    {INVOICES.map(inv => (
                      <tr key={inv.id} className="hover:bg-[var(--muted)]/50">
                        <td className="px-4 py-3 font-medium text-[var(--primary)]">{inv.id}</td>
                        <td className="px-4 py-3 text-xs text-[var(--muted-foreground)]">{formatDate(inv.date)}</td>
                        <td className="px-4 py-3 font-semibold">{formatCurrency(inv.amount)}</td>
                        <td className="px-4 py-3">
                          <span className={cn("text-xs px-2 py-0.5 rounded-full font-medium",
                            inv.status === "Paid" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                          )}>{inv.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          )}

          {["projects","tickets","contracts","documents","locations","audit"].includes(activeTab) && (
            <Card className="border border-[var(--border)]">
              <CardHeader className="pb-3 flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-semibold">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</CardTitle>
                <Button size="sm" variant="outline" className="h-7 text-xs"><Plus className="h-3.5 w-3.5 mr-1" />Add</Button>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-[var(--muted-foreground)]">No {activeTab} linked to this account yet.</p>
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
                { icon: Edit2, label: "Edit Account" },
                { icon: Users, label: "Add Contact" },
                { icon: TrendingUp, label: "New Deal" },
                { icon: FileText, label: "New Invoice" },
                { icon: MessageSquare, label: "New Ticket" },
                { icon: Activity, label: "Log Activity" },
                { icon: Archive, label: "Archive" },
              ].map(a => (
                <Button key={a.label} variant="ghost" size="sm" className="w-full justify-start h-8 text-xs font-medium">
                  <a.icon className="h-3.5 w-3.5 mr-2 text-[var(--muted-foreground)]" />{a.label}
                </Button>
              ))}
              <Separator />
              <Button variant="ghost" size="sm" className="w-full justify-start h-8 text-xs font-medium text-red-600 hover:bg-red-50">
                <Trash2 className="h-3.5 w-3.5 mr-2" />Delete Account
              </Button>
            </CardContent>
          </Card>

          <Card className="border border-[var(--border)]">
            <CardHeader className="pb-2"><div className="flex items-center gap-2"><Sparkles className="h-3.5 w-3.5 text-[var(--primary)]" /><CardTitle className="text-xs font-semibold uppercase tracking-wide text-[var(--muted-foreground)]">AI Insights</CardTitle></div></CardHeader>
            <CardContent className="space-y-2 p-3">
              <p className="text-xs text-[var(--foreground)]">Renewal window opens in 45 days. Prepare executive business review deck.</p>
              <p className="text-xs text-[var(--muted-foreground)]">Last touchpoint was a call with Marcus Williams on 9 Jun.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
