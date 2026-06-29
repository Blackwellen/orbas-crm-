"use client"

import React, { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import {
  Plus, Edit2, Trash2, GripVertical, Check, X, Settings,
  GitBranch, Tag, Users, Sliders, Plug, Bell, ChevronRight
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

interface PipelineStage {
  id: string
  name: string
  probability: number
  color: string
  order: number
}

interface LeadSource {
  id: string
  name: string
  count: number
}

interface CustomField {
  id: string
  name: string
  type: "Text" | "Number" | "Date" | "Dropdown" | "Checkbox" | "URL"
  entity: "Lead" | "Contact" | "Account" | "Deal"
  required: boolean
}

const INIT_STAGES: PipelineStage[] = [
  { id: "ps1", name: "Prospecting",  probability: 10, color: "#94a3b8", order: 1 },
  { id: "ps2", name: "Qualification",probability: 25, color: "#3b82f6", order: 2 },
  { id: "ps3", name: "Proposal",     probability: 50, color: "#8b5cf6", order: 3 },
  { id: "ps4", name: "Negotiation",  probability: 75, color: "#f59e0b", order: 4 },
  { id: "ps5", name: "Closed Won",   probability: 100, color: "#10b981", order: 5 },
  { id: "ps6", name: "Closed Lost",  probability: 0,  color: "#ef4444", order: 6 },
]

const INIT_SOURCES: LeadSource[] = [
  { id: "src1", name: "Inbound Web",    count: 248 },
  { id: "src2", name: "Referral",       count: 156 },
  { id: "src3", name: "Cold Call",      count: 89 },
  { id: "src4", name: "Email Campaign", count: 204 },
  { id: "src5", name: "Social Media",   count: 112 },
  { id: "src6", name: "PPC / Ads",      count: 178 },
  { id: "src7", name: "Event",          count: 93 },
  { id: "src8", name: "Partner",        count: 45 },
  { id: "src9", name: "Direct Mail",    count: 28 },
]

const INIT_FIELDS: CustomField[] = [
  { id: "cf1",  name: "LinkedIn URL",          type: "URL",      entity: "Contact", required: false },
  { id: "cf2",  name: "NDA Signed",            type: "Checkbox", entity: "Deal",    required: false },
  { id: "cf3",  name: "ARR",                   type: "Number",   entity: "Account", required: false },
  { id: "cf4",  name: "Industry Vertical",     type: "Dropdown", entity: "Account", required: true },
  { id: "cf5",  name: "Lead Score Override",   type: "Number",   entity: "Lead",    required: false },
  { id: "cf6",  name: "Tech Stack",            type: "Text",     entity: "Account", required: false },
  { id: "cf7",  name: "Competitor",            type: "Text",     entity: "Deal",    required: false },
  { id: "cf8",  name: "Decision Date",         type: "Date",     entity: "Deal",    required: false },
]

const INTEGRATIONS = [
  { name: "Salesforce CRM",   status: "Connected",    icon: "🔵", description: "Bidirectional sync with Salesforce" },
  { name: "HubSpot",          status: "Not Connected", icon: "🟠", description: "Sync contacts and marketing data" },
  { name: "Slack",            status: "Connected",    icon: "🟣", description: "Deal notifications and alerts" },
  { name: "Google Workspace", status: "Connected",    icon: "🔴", description: "Calendar and Gmail sync" },
  { name: "Microsoft 365",    status: "Not Connected", icon: "🔵", description: "Outlook and Teams integration" },
  { name: "Zapier",           status: "Connected",    icon: "🟡", description: "Custom automation workflows" },
  { name: "Stripe",           status: "Not Connected", icon: "🟢", description: "Payment and billing sync" },
  { name: "Intercom",         status: "Not Connected", icon: "⚫", description: "Support ticket integration" },
]

const TABS = [
  { key: "stages",       label: "Pipeline Stages",  icon: GitBranch },
  { key: "sources",      label: "Lead Sources",     icon: Tag },
  { key: "categories",   label: "Deal Categories",  icon: Sliders },
  { key: "fields",       label: "Custom Fields",    icon: Settings },
  { key: "integrations", label: "Integrations",     icon: Plug },
  { key: "notifications",label: "Notifications",    icon: Bell },
]

export default function CrmSettingsPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const activeTab = searchParams.get("tab") || "stages"

  const [stages, setStages] = useState(INIT_STAGES)
  const [sources, setSources] = useState(INIT_SOURCES)
  const [fields, setFields] = useState(INIT_FIELDS)

  const [editingStage, setEditingStage] = useState<string | null>(null)
  const [newStageName, setNewStageName] = useState("")
  const [newSourceName, setNewSourceName] = useState("")

  function setTab(tab: string) {
    router.push(`/app/crm/settings?tab=${tab}`, { scroll: false })
  }

  const fieldColors: Record<CustomField["type"], string> = {
    Text: "bg-blue-100 text-blue-700",
    Number: "bg-violet-100 text-violet-700",
    Date: "bg-amber-100 text-amber-700",
    Dropdown: "bg-[var(--accent)]/10 text-[var(--accent)]",
    Checkbox: "bg-emerald-100 text-emerald-700",
    URL: "bg-[var(--muted)] text-[var(--muted-foreground)]",
  }

  const entityColors: Record<CustomField["entity"], string> = {
    Lead: "bg-blue-100 text-blue-700",
    Contact: "bg-violet-100 text-violet-700",
    Account: "bg-emerald-100 text-emerald-700",
    Deal: "bg-amber-100 text-amber-700",
  }

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <div className="border-b border-[var(--border)] bg-[var(--card)] px-6 py-4">
        <div>
          <h1 className="text-xl font-bold text-[var(--foreground)]">CRM Settings</h1>
          <p className="text-sm text-[var(--muted-foreground)]">Configure pipelines, fields, integrations and notifications</p>
        </div>
      </div>

      <div className="flex min-h-[calc(100vh-120px)]">
        {/* Settings Sidebar */}
        <div className="w-56 shrink-0 border-r border-[var(--border)] bg-[var(--card)] p-3">
          <nav className="space-y-0.5">
            {TABS.map(t => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={cn(
                  "w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors text-left",
                  activeTab === t.key
                    ? "bg-[var(--primary)]/10 text-[var(--primary)]"
                    : "text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:text-[var(--foreground)]"
                )}
              >
                <t.icon className="h-4 w-4 shrink-0" />
                {t.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 space-y-4">

          {/* Pipeline Stages */}
          {activeTab === "stages" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-semibold text-[var(--foreground)]">Pipeline Stages</h2>
                  <p className="text-sm text-[var(--muted-foreground)]">Define and order the stages of your sales pipeline</p>
                </div>
                <Button size="sm" className="h-8 text-xs">
                  <Plus className="h-3.5 w-3.5 mr-1" />Add Stage
                </Button>
              </div>
              <Card className="border border-[var(--border)]">
                <CardContent className="p-0">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-[var(--border)] bg-[var(--muted)]">
                        {["", "Stage Name", "Default Probability", "Colour", ""].map(h => (
                          <th key={h} className="text-left px-4 py-2.5 text-xs font-semibold text-[var(--muted-foreground)]">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--border)]">
                      {stages.map(stage => (
                        <tr key={stage.id} className="hover:bg-[var(--muted)]/30 group">
                          <td className="px-3 py-3 w-8">
                            <GripVertical className="h-4 w-4 text-[var(--muted-foreground)] cursor-grab" />
                          </td>
                          <td className="px-4 py-3">
                            {editingStage === stage.id ? (
                              <div className="flex items-center gap-1">
                                <Input defaultValue={stage.name} className="h-7 text-sm w-40" autoFocus />
                                <Button size="sm" className="h-7 w-7 p-0" onClick={() => setEditingStage(null)}><Check className="h-3.5 w-3.5" /></Button>
                                <Button size="sm" variant="ghost" className="h-7 w-7 p-0" onClick={() => setEditingStage(null)}><X className="h-3.5 w-3.5" /></Button>
                              </div>
                            ) : (
                              <span className="font-medium text-[var(--foreground)]">{stage.name}</span>
                            )}
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <input
                                type="range" min={0} max={100} value={stage.probability}
                                onChange={e => setStages(p => p.map(s => s.id === stage.id ? { ...s, probability: Number(e.target.value) } : s))}
                                className="w-24 h-1 accent-[var(--primary)]"
                              />
                              <span className="text-xs text-[var(--foreground)] w-8">{stage.probability}%</span>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <div className="w-5 h-5 rounded-md border border-[var(--border)]" style={{ backgroundColor: stage.color }} />
                              <span className="text-xs text-[var(--muted-foreground)]">{stage.color}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => setEditingStage(stage.id)}>
                                <Edit2 className="h-3.5 w-3.5" />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-red-500">
                                <Trash2 className="h-3.5 w-3.5" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Lead Sources */}
          {activeTab === "sources" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-semibold text-[var(--foreground)]">Lead Sources</h2>
                  <p className="text-sm text-[var(--muted-foreground)]">Define the channels through which leads enter your CRM</p>
                </div>
              </div>
              <Card className="border border-[var(--border)]">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <Input
                      placeholder="New source name..."
                      value={newSourceName}
                      onChange={e => setNewSourceName(e.target.value)}
                      className="h-8 text-sm w-56"
                    />
                    <Button size="sm" className="h-8 text-xs" onClick={() => {
                      if (newSourceName.trim()) {
                        setSources(p => [...p, { id: `src${Date.now()}`, name: newSourceName.trim(), count: 0 }])
                        setNewSourceName("")
                      }
                    }}>
                      <Plus className="h-3.5 w-3.5 mr-1" />Add Source
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-[var(--border)] bg-[var(--muted)]">
                        {["Source Name", "Lead Count", ""].map(h => (
                          <th key={h} className="text-left px-4 py-2.5 text-xs font-semibold text-[var(--muted-foreground)]">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--border)]">
                      {sources.map(src => (
                        <tr key={src.id} className="hover:bg-[var(--muted)]/30 group">
                          <td className="px-4 py-3 font-medium text-[var(--foreground)]">{src.name}</td>
                          <td className="px-4 py-3 text-sm text-[var(--muted-foreground)]">{src.count} leads</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100">
                              <Button variant="ghost" size="sm" className="h-7 w-7 p-0"><Edit2 className="h-3.5 w-3.5" /></Button>
                              <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-red-500" onClick={() => setSources(p => p.filter(s => s.id !== src.id))}>
                                <Trash2 className="h-3.5 w-3.5" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Deal Categories */}
          {activeTab === "categories" && (
            <div className="space-y-4">
              <div>
                <h2 className="text-base font-semibold text-[var(--foreground)]">Deal Categories</h2>
                <p className="text-sm text-[var(--muted-foreground)]">Categorise deals for reporting and pipeline management</p>
              </div>
              <Card className="border border-[var(--border)]">
                <CardContent className="p-4 space-y-3">
                  {[
                    { name: "New Business",   color: "bg-[var(--primary)]",   desc: "Brand new customer acquisition deals" },
                    { name: "Expansion",      color: "bg-emerald-500",         desc: "Upsell or cross-sell to existing customers" },
                    { name: "Renewal",        color: "bg-violet-500",          desc: "Contract renewals and licence extensions" },
                    { name: "Partner",        color: "bg-amber-500",           desc: "Deals sourced or co-sold with partners" },
                    { name: "Re-engagement",  color: "bg-[var(--accent)]",     desc: "Win-back of churned customers" },
                  ].map(c => (
                    <div key={c.name} className="flex items-center justify-between p-3 border border-[var(--border)] rounded-lg group hover:bg-[var(--muted)]/50">
                      <div className="flex items-center gap-3">
                        <div className={cn("w-3 h-3 rounded-full", c.color)} />
                        <div>
                          <p className="text-sm font-medium text-[var(--foreground)]">{c.name}</p>
                          <p className="text-xs text-[var(--muted-foreground)]">{c.desc}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100">
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0"><Edit2 className="h-3.5 w-3.5" /></Button>
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-red-500"><Trash2 className="h-3.5 w-3.5" /></Button>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full h-8 text-xs mt-1">
                    <Plus className="h-3.5 w-3.5 mr-1" />Add Category
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Custom Fields */}
          {activeTab === "fields" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-semibold text-[var(--foreground)]">Custom Fields</h2>
                  <p className="text-sm text-[var(--muted-foreground)]">Add custom fields to Leads, Contacts, Accounts and Deals</p>
                </div>
                <Button size="sm" className="h-8 text-xs">
                  <Plus className="h-3.5 w-3.5 mr-1" />Add Field
                </Button>
              </div>
              <Card className="border border-[var(--border)]">
                <CardContent className="p-0">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-[var(--border)] bg-[var(--muted)]">
                        {["Field Name", "Type", "Entity", "Required", ""].map(h => (
                          <th key={h} className="text-left px-4 py-2.5 text-xs font-semibold text-[var(--muted-foreground)]">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--border)]">
                      {fields.map(f => (
                        <tr key={f.id} className="hover:bg-[var(--muted)]/30 group">
                          <td className="px-4 py-3 font-medium text-[var(--foreground)]">{f.name}</td>
                          <td className="px-4 py-3">
                            <span className={cn("text-[10px] px-2 py-0.5 rounded-full font-medium", fieldColors[f.type])}>{f.type}</span>
                          </td>
                          <td className="px-4 py-3">
                            <span className={cn("text-[10px] px-2 py-0.5 rounded-full font-medium", entityColors[f.entity])}>{f.entity}</span>
                          </td>
                          <td className="px-4 py-3">
                            <span className={cn("text-[10px] px-2 py-0.5 rounded-full font-medium",
                              f.required ? "bg-red-100 text-red-700" : "bg-[var(--muted)] text-[var(--muted-foreground)]"
                            )}>{f.required ? "Required" : "Optional"}</span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100">
                              <Button variant="ghost" size="sm" className="h-7 w-7 p-0"><Edit2 className="h-3.5 w-3.5" /></Button>
                              <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-red-500" onClick={() => setFields(p => p.filter(x => x.id !== f.id))}>
                                <Trash2 className="h-3.5 w-3.5" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </CardContent>
              </Card>

              {/* Add Custom Field Form */}
              <Card className="border border-[var(--border)]">
                <CardHeader className="pb-3"><CardTitle className="text-sm font-semibold">Add Custom Field</CardTitle></CardHeader>
                <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div>
                    <Label className="text-xs font-medium mb-1.5 block">Field Name</Label>
                    <Input placeholder="e.g. Industry Vertical" className="h-8 text-sm" />
                  </div>
                  <div>
                    <Label className="text-xs font-medium mb-1.5 block">Field Type</Label>
                    <Select defaultValue="Text">
                      <SelectTrigger className="h-8 text-sm"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {["Text", "Number", "Date", "Dropdown", "Checkbox", "URL"].map(t => (
                          <SelectItem key={t} value={t}>{t}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-xs font-medium mb-1.5 block">Entity</Label>
                    <Select defaultValue="Lead">
                      <SelectTrigger className="h-8 text-sm"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {["Lead", "Contact", "Account", "Deal"].map(e => (
                          <SelectItem key={e} value={e}>{e}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-end">
                    <Button className="h-8 text-xs w-full">
                      <Plus className="h-3.5 w-3.5 mr-1" />Add Field
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Integrations */}
          {activeTab === "integrations" && (
            <div className="space-y-4">
              <div>
                <h2 className="text-base font-semibold text-[var(--foreground)]">Integrations</h2>
                <p className="text-sm text-[var(--muted-foreground)]">Connect Orbas CRM with your other business tools</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {INTEGRATIONS.map(int => (
                  <Card key={int.name} className="border border-[var(--border)]">
                    <CardContent className="p-4 flex items-start gap-3">
                      <span className="text-2xl">{int.icon}</span>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-0.5">
                          <p className="text-sm font-semibold text-[var(--foreground)]">{int.name}</p>
                          <span className={cn("text-[10px] px-2 py-0.5 rounded-full font-medium",
                            int.status === "Connected" ? "bg-emerald-100 text-emerald-700" : "bg-[var(--muted)] text-[var(--muted-foreground)]"
                          )}>{int.status}</span>
                        </div>
                        <p className="text-xs text-[var(--muted-foreground)] mb-2">{int.description}</p>
                        <Button size="sm" variant={int.status === "Connected" ? "outline" : "default"} className="h-7 text-xs">
                          {int.status === "Connected" ? "Manage" : "Connect"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Notifications */}
          {activeTab === "notifications" && (
            <div className="space-y-4">
              <div>
                <h2 className="text-base font-semibold text-[var(--foreground)]">Notification Preferences</h2>
                <p className="text-sm text-[var(--muted-foreground)]">Control when and how you receive CRM notifications</p>
              </div>
              <Card className="border border-[var(--border)]">
                <CardContent className="p-4 space-y-3">
                  {[
                    { label: "New lead assigned to me",           email: true, inApp: true, slack: true },
                    { label: "Deal stage changed",                email: true, inApp: true, slack: false },
                    { label: "Task overdue",                      email: true, inApp: true, slack: true },
                    { label: "Quote accepted/declined",           email: true, inApp: true, slack: true },
                    { label: "Deal closed (won or lost)",         email: true, inApp: true, slack: true },
                    { label: "New contact added to my account",   email: false, inApp: true, slack: false },
                    { label: "Campaign milestone reached",        email: true, inApp: false, slack: false },
                    { label: "Sequence reply received",           email: true, inApp: true, slack: false },
                    { label: "Forecast submitted by rep",         email: false, inApp: true, slack: false },
                  ].map((n, i) => (
                    <div key={i} className="flex items-center justify-between p-2 rounded-lg hover:bg-[var(--muted)]/50">
                      <p className="text-sm text-[var(--foreground)]">{n.label}</p>
                      <div className="flex items-center gap-3">
                        {[
                          { label: "Email", val: n.email },
                          { label: "In-App", val: n.inApp },
                          { label: "Slack", val: n.slack },
                        ].map(ch => (
                          <div key={ch.label} className="flex items-center gap-1">
                            <input type="checkbox" defaultChecked={ch.val} className="accent-[var(--primary)]" />
                            <span className="text-[10px] text-[var(--muted-foreground)]">{ch.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
              <div className="flex justify-end">
                <Button className="h-9 text-sm">Save Preferences</Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
