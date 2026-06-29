"use client"

import React, { use, useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import Link from "next/link"
import { useSearchParams, useRouter } from "next/navigation"
import {
  ArrowLeft, Send, Paperclip, Lock, User, Tag,
  Clock, AlertTriangle, CheckCircle, GitMerge, ChevronDown,
  MessageSquare, Info, Link2, History
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const TICKET_DATA: Record<string, {
  id: number; subject: string; customer: string; company: string; email: string;
  priority: string; status: string; agent: string; queue: string; tags: string[];
  created: string; updated: string; sla: string; slaRemaining: string;
  conversation: Array<{ id: number; type: string; author: string; body: string; time: string; avatar: string }>
  history: Array<{ text: string; time: string; actor: string }>
}> = {
  "2041": {
    id: 2041,
    subject: "Cannot access admin dashboard after 2FA reset",
    customer: "Jordan Clarke", company: "DataVault Ltd", email: "jordan@datavault.io",
    priority: "Critical", status: "Open", agent: "Priya Mehta", queue: "Enterprise",
    tags: ["2fa", "login", "admin"],
    created: "10 Jun 2026, 09:14", updated: "10 Jun 2026, 11:32",
    sla: "breached", slaRemaining: "BREACHED",
    conversation: [
      { id: 1, type: "customer", author: "Jordan Clarke", body: "Hi, after resetting my 2FA device I'm completely locked out of the admin panel. I've tried clearing cache and incognito — same result. This is blocking our entire team from configuring new user accounts.", time: "09:14", avatar: "JC" },
      { id: 2, type: "agent", author: "Priya Mehta", body: "Hi Jordan, thanks for reaching out. I can see the 2FA reset completed at 09:02 on your account. Could you let me know which browser and OS you're using? I'll also check if there's a session token issue on our end.", time: "09:45", avatar: "PM" },
      { id: 3, type: "customer", author: "Jordan Clarke", body: "Chrome 124 on Windows 11. I've now also tried Firefox with the same result. The error says 'Authentication token invalid' but my authenticator app is showing codes fine.", time: "10:01", avatar: "JC" },
      { id: 4, type: "note", author: "Priya Mehta", body: "Internal note: Checked backend logs — session invalidation job ran at 09:05 and incorrectly cleared this user's 2FA binding. Need to escalate to platform team to re-bind.", time: "10:15", avatar: "PM" },
      { id: 5, type: "agent", author: "Priya Mehta", body: "Jordan, I've identified the root cause. Our session cleanup job inadvertently cleared your 2FA binding. I'm escalating this to our platform team now for an immediate fix. You should receive an email within 30 minutes with next steps.", time: "11:32", avatar: "PM" },
    ],
    history: [
      { text: "Ticket created", time: "09:14", actor: "System" },
      { text: "Assigned to Priya Mehta", time: "09:20", actor: "Auto-assign" },
      { text: "Status changed: Open → In Progress", time: "09:45", actor: "Priya Mehta" },
      { text: "Internal note added", time: "10:15", actor: "Priya Mehta" },
      { text: "Escalated to platform team", time: "11:32", actor: "Priya Mehta" },
      { text: "SLA breach triggered", time: "11:14", actor: "System" },
    ]
  }
}

const TABS = [
  { key: "conversation", label: "Conversation", icon: MessageSquare },
  { key: "details",      label: "Details",      icon: Info },
  { key: "related",      label: "Related",      icon: Link2 },
  { key: "history",      label: "History",      icon: History },
]

const priorityStyle: Record<string, string> = {
  Critical: "bg-red-100 text-red-700",
  High:     "bg-orange-100 text-orange-700",
  Medium:   "bg-amber-100 text-amber-700",
  Low:      "bg-slate-100 text-slate-600",
}

const statusStyle: Record<string, string> = {
  "Open":        "bg-blue-100 text-blue-700",
  "In Progress": "bg-violet-100 text-violet-700",
  "Pending":     "bg-amber-100 text-amber-700",
  "Resolved":    "bg-emerald-100 text-emerald-700",
  "Closed":      "bg-slate-100 text-slate-600",
}

export default function TicketDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const searchParams = useSearchParams()
  const router = useRouter()
  const tab = searchParams.get("tab") || "conversation"

  const [ticketOverride, setTicketOverride] = useState<any>(null)
  const ticket = ticketOverride ?? TICKET_DATA[id] ?? TICKET_DATA["2041"]
  const [reply, setReply]         = useState("")
  const [isNote, setIsNote]       = useState(false)
  const [status, setStatus]       = useState(ticket.status)

  useEffect(() => {
    if (!id) return
    const supabase = createClient()
    supabase.from("tickets").select("*").eq("id", id).single()
      .then(({ data }) => {
        if (data) {
          setTicketOverride({
            ...TICKET_DATA["2041"],
            ...data,
            id: data.id,
            subject: data.subject ?? data.title,
            customer: data.customer ?? "",
            company: data.company ?? "",
            email: data.email ?? "",
            priority: data.priority ?? "Medium",
            status: data.status ?? "Open",
            agent: data.agent ?? data.assignee_id ?? "",
            queue: data.queue ?? data.category ?? "",
            tags: data.tags ?? [],
            created: data.created ?? (data.created_at ? new Date(data.created_at).toLocaleString("en-GB") : ""),
            updated: data.updated ?? (data.updated_at ? new Date(data.updated_at).toLocaleString("en-GB") : ""),
            sla: data.sla ?? "ok",
            slaRemaining: data.slaRemaining ?? "On Track",
            conversation: data.conversation ?? TICKET_DATA["2041"].conversation,
            history: data.history ?? TICKET_DATA["2041"].history,
          })
          setStatus(data.status ?? "Open")
        }
      })
  }, [id])

  function setTab(t: string) {
    router.push(`/app/service/tickets/${id}?tab=${t}`, { scroll: false })
  }

  return (
    <div className="p-6 max-w-[1400px] mx-auto space-y-5">
      {/* Back */}
      <Link href="/app/service/tickets"
        className="inline-flex items-center gap-1.5 text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)]">
        <ArrowLeft className="h-4 w-4" /> All Tickets
      </Link>

      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono text-[var(--muted-foreground)]">#{ticket.id}</span>
            <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${statusStyle[status]}`}>{status}</span>
            <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${priorityStyle[ticket.priority]}`}>{ticket.priority}</span>
            {ticket.sla === "breached" && (
              <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700">
                <AlertTriangle className="h-3 w-3" /> SLA Breached
              </span>
            )}
          </div>
          <h1 className="text-xl font-bold text-[var(--foreground)]">{ticket.subject}</h1>
          <p className="text-sm text-[var(--muted-foreground)] mt-0.5">
            {ticket.company} · {ticket.customer} · {ticket.email}
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 flex-wrap">
          <button onClick={() => setStatus("Resolved")}
            className="inline-flex items-center gap-1.5 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700 hover:bg-emerald-100">
            <CheckCircle className="h-3.5 w-3.5" /> Resolve
          </button>
          <button
            className="inline-flex items-center gap-1.5 rounded-md border border-[var(--border)] px-3 py-1.5 text-xs font-medium text-[var(--foreground)] hover:bg-[var(--secondary)]">
            <AlertTriangle className="h-3.5 w-3.5" /> Escalate
          </button>
          <button
            className="inline-flex items-center gap-1.5 rounded-md border border-[var(--border)] px-3 py-1.5 text-xs font-medium text-[var(--foreground)] hover:bg-[var(--secondary)]">
            <User className="h-3.5 w-3.5" /> Assign
          </button>
          <button
            className="inline-flex items-center gap-1.5 rounded-md border border-[var(--border)] px-3 py-1.5 text-xs font-medium text-[var(--foreground)] hover:bg-[var(--secondary)]">
            <GitMerge className="h-3.5 w-3.5" /> Merge
          </button>
          <button onClick={() => setStatus("Closed")}
            className="inline-flex items-center gap-1.5 rounded-md border border-[var(--border)] px-3 py-1.5 text-xs font-medium text-[var(--foreground)] hover:bg-[var(--secondary)]">
            Close
          </button>
        </div>
      </div>

      {/* Tab Nav */}
      <div className="border-b border-[var(--border)]">
        <div className="flex gap-1">
          {TABS.map((t: any) => (
            <button key={t.key} onClick={() => setTab(t.key)}
              className={`inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
                tab === t.key
                  ? "border-[var(--primary)] text-[var(--primary)]"
                  : "border-transparent text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
              }`}>
              <t.icon className="h-3.5 w-3.5" />
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Conversation Tab */}
      {tab === "conversation" && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
          {/* Thread */}
          <div className="lg:col-span-3 space-y-3">
            {/* SLA Timer */}
            <div className={`flex items-center gap-2 rounded-md px-4 py-2.5 text-sm font-medium ${
              ticket.sla === "breached" ? "bg-red-50 text-red-700 border border-red-200" : "bg-amber-50 text-amber-700 border border-amber-200"
            }`}>
              <Clock className="h-4 w-4" />
              SLA Status: <strong>{ticket.slaRemaining}</strong>
              <span className="text-xs font-normal opacity-70 ml-1">· Enterprise SLA Policy</span>
            </div>

            {/* Messages */}
            <div className="space-y-3">
              {ticket.conversation.map((msg: any) => (
                <div key={msg.id}
                  className={`flex gap-3 ${msg.type === "agent" ? "flex-row-reverse" : msg.type === "note" ? "" : ""}`}>
                  <Avatar className="h-8 w-8 shrink-0">
                    <AvatarFallback className="text-xs bg-[var(--primary)]/10 text-[var(--primary)]">{msg.avatar}</AvatarFallback>
                  </Avatar>
                  <div className={`max-w-[80%] ${msg.type === "agent" ? "items-end" : "items-start"} flex flex-col`}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium text-[var(--foreground)]">{msg.author}</span>
                      <span className="text-[10px] text-[var(--muted-foreground)]">{msg.time}</span>
                      {msg.type === "note" && (
                        <span className="inline-flex items-center gap-0.5 rounded-full bg-amber-100 px-1.5 py-0.5 text-[10px] font-medium text-amber-700">
                          <Lock className="h-2.5 w-2.5" /> Internal Note
                        </span>
                      )}
                    </div>
                    <div className={`rounded-lg px-4 py-3 text-sm leading-relaxed ${
                      msg.type === "customer" ? "bg-[var(--secondary)] text-[var(--foreground)]" :
                      msg.type === "note"     ? "bg-amber-50 border border-amber-200 text-amber-900" :
                      "bg-[var(--primary)]/10 text-[var(--foreground)]"
                    }`}>
                      {msg.body}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Reply Box */}
            <Card className="border border-[var(--border)]">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center gap-2 border-b border-[var(--border)] pb-2">
                  <button onClick={() => setIsNote(false)}
                    className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${!isNote ? "bg-[var(--primary)] text-white" : "text-[var(--muted-foreground)] hover:bg-[var(--secondary)]"}`}>
                    Reply
                  </button>
                  <button onClick={() => setIsNote(true)}
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-md text-xs font-medium transition-colors ${isNote ? "bg-amber-100 text-amber-700" : "text-[var(--muted-foreground)] hover:bg-[var(--secondary)]"}`}>
                    <Lock className="h-3 w-3" /> Internal Note
                  </button>
                </div>
                <textarea
                  value={reply}
                  onChange={e => setReply(e.target.value)}
                  rows={4}
                  placeholder={isNote ? "Add an internal note visible only to agents…" : "Type your reply…"}
                  className={`w-full px-3 py-2 text-sm border border-[var(--border)] rounded-md bg-[var(--background)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30 resize-none ${isNote ? "bg-amber-50/30" : ""}`}
                />
                <div className="flex items-center justify-between">
                  <button className="inline-flex items-center gap-1.5 text-xs text-[var(--muted-foreground)] hover:text-[var(--foreground)]">
                    <Paperclip className="h-3.5 w-3.5" /> Attach
                  </button>
                  <button
                    className="inline-flex items-center gap-2 rounded-md bg-[var(--primary)] px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-50"
                    disabled={!reply.trim()}>
                    <Send className="h-3.5 w-3.5" /> {isNote ? "Add Note" : "Send Reply"}
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-4">
            <Card className="border border-[var(--border)]">
              <CardContent className="p-4 space-y-3">
                <h3 className="text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wide">Ticket Info</h3>
                {[
                  { label: "Queue",   value: ticket.queue },
                  { label: "Agent",   value: ticket.agent },
                  { label: "Created", value: ticket.created },
                  { label: "Updated", value: ticket.updated },
                ].map(item => (
                  <div key={item.label}>
                    <span className="text-xs text-[var(--muted-foreground)]">{item.label}</span>
                    <p className="text-sm font-medium text-[var(--foreground)] mt-0.5">{item.value}</p>
                  </div>
                ))}
                <div>
                  <span className="text-xs text-[var(--muted-foreground)]">Tags</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {ticket.tags.map((t: any) => (
                      <span key={t} className="inline-flex items-center gap-0.5 rounded-full bg-[var(--muted)] px-2 py-0.5 text-xs text-[var(--foreground)]">
                        <Tag className="h-2.5 w-2.5" /> {t}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Details Tab */}
      {tab === "details" && (
        <Card className="border border-[var(--border)] max-w-2xl">
          <CardContent className="p-5 space-y-5">
            <h3 className="text-sm font-semibold text-[var(--foreground)]">Customer Information</h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Full Name",  value: ticket.customer },
                { label: "Company",   value: ticket.company },
                { label: "Email",     value: ticket.email },
                { label: "Priority",  value: ticket.priority },
                { label: "Queue",     value: ticket.queue },
                { label: "Agent",     value: ticket.agent },
              ].map(f => (
                <div key={f.label}>
                  <label className="block text-xs font-medium text-[var(--muted-foreground)] mb-1">{f.label}</label>
                  <input defaultValue={f.value}
                    className="w-full px-3 py-2 text-sm border border-[var(--border)] rounded-md bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30" />
                </div>
              ))}
            </div>
            <div>
              <label className="block text-xs font-medium text-[var(--muted-foreground)] mb-1">Tags</label>
              <input defaultValue={ticket.tags.join(", ")}
                className="w-full px-3 py-2 text-sm border border-[var(--border)] rounded-md bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30" />
            </div>
            <button className="inline-flex items-center gap-2 rounded-md bg-[var(--primary)] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
              Save Changes
            </button>
          </CardContent>
        </Card>
      )}

      {/* Related Tab */}
      {tab === "related" && (
        <div className="space-y-4">
          {[
            { label: "Linked Tickets", items: ["#2035 — SAML SSO configuration not applying", "#2029 — Custom domain SSL certificate expired"] },
            { label: "Related Contacts", items: ["Jordan Clarke · DataVault Ltd", "Emma Watts · DataVault Ltd"] },
            { label: "Related Deals", items: ["Enterprise SaaS Rollout · DataVault Ltd · £120K"] },
          ].map(section => (
            <Card key={section.label} className="border border-[var(--border)]">
              <CardContent className="p-4">
                <h3 className="text-sm font-semibold text-[var(--foreground)] mb-3">{section.label}</h3>
                <div className="space-y-2">
                  {section.items.map(item => (
                    <div key={item} className="flex items-center justify-between rounded-md border border-[var(--border)] px-3 py-2">
                      <span className="text-sm text-[var(--foreground)]">{item}</span>
                      <button className="text-xs text-[var(--primary)] hover:underline">View</button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* History Tab */}
      {tab === "history" && (
        <Card className="border border-[var(--border)] max-w-2xl">
          <CardContent className="p-4">
            <div className="space-y-3">
              {ticket.history.map((h: any, i: number) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="h-2 w-2 rounded-full bg-[var(--primary)] mt-1.5 shrink-0" />
                  <div>
                    <p className="text-sm text-[var(--foreground)]">{h.text}</p>
                    <p className="text-xs text-[var(--muted-foreground)] mt-0.5">{h.time} · by {h.actor}</p>
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
