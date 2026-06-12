"use client"

import React, { useState } from "react"
import {
  Search, Send, Paperclip, Mail, MessageCircle, Globe,
  Phone, Building2, Ticket, User, MoreHorizontal, CheckCheck, Clock
} from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"

const CONVERSATIONS = [
  {
    id: 1, name: "Jordan Clarke", company: "DataVault Ltd", email: "jordan@datavault.io",
    channel: "email", channelLabel: "Email",
    lastMessage: "Hi, I'm still unable to access the admin panel after the 2FA reset you mentioned.",
    time: "2m ago", unread: 2, status: "open",
  },
  {
    id: 2, name: "Mia Nguyen", company: "Apex Analytics", email: "mia@apex.io",
    channel: "chat", channelLabel: "Live Chat",
    lastMessage: "The dashboard is loading really slowly since yesterday's update.",
    time: "14m ago", unread: 1, status: "open",
  },
  {
    id: 3, name: "Oliver Grant", company: "ClearCloud Inc", email: "oliver@clearcloud.com",
    channel: "twitter", channelLabel: "Twitter/X",
    lastMessage: "@orbas_support Your API has been down for 20 minutes. This is unacceptable.",
    time: "28m ago", unread: 0, status: "open",
  },
  {
    id: 4, name: "Ava Thompson", company: "BrightPulse Ltd", email: "ava@brightpulse.io",
    channel: "email", channelLabel: "Email",
    lastMessage: "Thank you for resolving the issue so quickly! Really appreciate it.",
    time: "1h ago", unread: 0, status: "resolved",
  },
  {
    id: 5, name: "Noah Kim", company: "Venture Stack", email: "noah@venturestack.io",
    channel: "chat", channelLabel: "Live Chat",
    lastMessage: "Can you help me configure the webhook settings for our CRM integration?",
    time: "1h ago", unread: 3, status: "open",
  },
  {
    id: 6, name: "Sophia Lewis", company: "MetaScale Co", email: "sophia@metascale.io",
    channel: "email", channelLabel: "Email",
    lastMessage: "We need to upgrade our plan to support more API calls per minute.",
    time: "2h ago", unread: 0, status: "open",
  },
]

const MESSAGES: Record<number, Array<{ id: number; author: string; body: string; time: string; isMe: boolean; channel?: string }>> = {
  1: [
    { id: 1, author: "Jordan Clarke", body: "Hi, after resetting my 2FA device I'm completely locked out of the admin panel. Can you help?", time: "09:14", isMe: false },
    { id: 2, author: "Priya Mehta", body: "Hi Jordan, thanks for reaching out. We've identified a session token issue and our platform team is working on a fix.", time: "09:45", isMe: true },
    { id: 3, author: "Jordan Clarke", body: "Hi, I'm still unable to access the admin panel after the 2FA reset you mentioned.", time: "11:32", isMe: false },
  ],
  2: [
    { id: 1, author: "Mia Nguyen", body: "Hey, the dashboard is loading really slowly since yesterday's update. Is this a known issue?", time: "10:02", isMe: false },
    { id: 2, author: "James Hartley", body: "Hi Mia! We are aware of some performance degradation after last night's deploy. We're actively working on it.", time: "10:20", isMe: true },
    { id: 3, author: "Mia Nguyen", body: "The dashboard is loading really slowly since yesterday's update.", time: "10:46", isMe: false },
  ],
}

const CHANNEL_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  email:   Mail,
  chat:    MessageCircle,
  twitter: Globe,
  sms:     Phone,
}

const kpis = [
  { label: "Open",          value: "31", color: "#1a56db" },
  { label: "Unread",        value: "6",  color: "#dc2626" },
  { label: "Unassigned",    value: "4",  color: "#d97706" },
  { label: "Avg Response",  value: "1.8h", color: "#16a34a" },
]

const FILTER_TABS = ["All", "Unread", "Mine", "Unassigned"]

export default function ConnectInboxPage() {
  const [selected, setSelected] = useState(CONVERSATIONS[0])
  const [filterTab, setFilterTab] = useState("All")
  const [search, setSearch] = useState("")
  const [reply, setReply] = useState("")

  const filtered = CONVERSATIONS.filter(c => {
    const matchFilter = filterTab === "All" ||
      (filterTab === "Unread" && c.unread > 0) ||
      (filterTab === "Mine" && c.status === "open") ||
      (filterTab === "Unassigned" && c.unread === 0 && c.status === "open")
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.company.toLowerCase().includes(search.toLowerCase())
    return matchFilter && matchSearch
  })

  const msgs = MESSAGES[selected.id] ?? MESSAGES[1]
  const ChannelIcon = CHANNEL_ICONS[selected.channel] ?? Mail

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* KPI Bar */}
      <div className="flex items-center gap-8 px-6 py-3 border-b border-[var(--border)] bg-[var(--background)] shrink-0">
        {kpis.map(k => (
          <div key={k.label} className="flex items-center gap-2">
            <span className="text-xs text-[var(--muted-foreground)]">{k.label}:</span>
            <span className="text-sm font-bold" style={{ color: k.color }}>{k.value}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel — Conversation List */}
        <div className="w-80 shrink-0 border-r border-[var(--border)] flex flex-col overflow-hidden">
          {/* Search */}
          <div className="p-3 border-b border-[var(--border)]">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[var(--muted-foreground)]" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search conversations..."
                className="w-full pl-8 pr-3 py-1.5 text-xs border border-[var(--border)] rounded-md bg-[var(--secondary)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none"
              />
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex border-b border-[var(--border)]">
            {FILTER_TABS.map(t => (
              <button key={t} onClick={() => setFilterTab(t)}
                className={`flex-1 py-2 text-xs font-medium border-b-2 transition-colors ${
                  filterTab === t
                    ? "border-[var(--primary)] text-[var(--primary)]"
                    : "border-transparent text-[var(--muted-foreground)]"
                }`}>
                {t}
              </button>
            ))}
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto divide-y divide-[var(--border)]">
            {filtered.map(conv => {
              const Icon = CHANNEL_ICONS[conv.channel] ?? Mail
              return (
                <button
                  key={conv.id}
                  onClick={() => setSelected(conv)}
                  className={`w-full text-left p-3 hover:bg-[var(--secondary)] transition-colors ${selected.id === conv.id ? "bg-[var(--secondary)]" : ""}`}
                >
                  <div className="flex items-start gap-2.5">
                    <Avatar className="h-9 w-9 shrink-0 mt-0.5">
                      <AvatarFallback className="text-xs font-semibold" style={{ background: "var(--primary)", color: "white" }}>
                        {conv.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <span className={`text-xs truncate ${conv.unread > 0 ? "font-bold text-[var(--foreground)]" : "font-medium text-[var(--foreground)]"}`}>
                          {conv.name}
                        </span>
                        <span className="text-[10px] text-[var(--muted-foreground)] shrink-0 ml-1">{conv.time}</span>
                      </div>
                      <div className="flex items-center gap-1 mb-1">
                        <Icon className="h-3 w-3 shrink-0 text-[var(--muted-foreground)]" />
                        <span className="text-[10px] text-[var(--muted-foreground)]">{conv.channelLabel}</span>
                      </div>
                      <div className="flex items-end gap-1">
                        <p className="text-[11px] text-[var(--muted-foreground)] line-clamp-2 flex-1">{conv.lastMessage}</p>
                        {conv.unread > 0 && (
                          <span className="h-4 w-4 rounded-full text-[10px] font-bold text-white flex items-center justify-center shrink-0" style={{ background: "var(--primary)" }}>
                            {conv.unread}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Right Panel — Conversation Detail */}
        <div className="flex-1 flex overflow-hidden">
          {/* Thread */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-[var(--border)] shrink-0">
              <div className="flex items-center gap-3">
                <Avatar className="h-9 w-9">
                  <AvatarFallback className="text-xs font-semibold" style={{ background: "var(--primary)", color: "white" }}>
                    {selected.name.split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-semibold text-[var(--foreground)]">{selected.name}</p>
                  <div className="flex items-center gap-1.5">
                    <ChannelIcon className="h-3 w-3 text-[var(--muted-foreground)]" />
                    <span className="text-xs text-[var(--muted-foreground)]">{selected.channelLabel} · {selected.company}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="rounded-md border border-[var(--border)] px-3 py-1.5 text-xs font-medium text-[var(--foreground)] hover:bg-[var(--secondary)]">
                  <User className="h-3.5 w-3.5 inline mr-1" /> Assign
                </button>
                <button className="rounded-md px-3 py-1.5 text-xs font-medium text-white hover:opacity-90" style={{ background: "#16a34a" }}>
                  Resolve
                </button>
                <button className="p-1.5 rounded-md hover:bg-[var(--secondary)] text-[var(--muted-foreground)]">
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {msgs.map(msg => (
                <div key={msg.id} className={`flex gap-3 ${msg.isMe ? "flex-row-reverse" : ""}`}>
                  <Avatar className="h-8 w-8 shrink-0">
                    <AvatarFallback className="text-[10px]" style={{ background: msg.isMe ? "#06b6d4" : "var(--secondary)", color: msg.isMe ? "white" : "var(--foreground)" }}>
                      {msg.author.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className={`max-w-[70%] ${msg.isMe ? "items-end" : "items-start"} flex flex-col`}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium text-[var(--foreground)]">{msg.author}</span>
                      <span className="text-[10px] text-[var(--muted-foreground)]">{msg.time}</span>
                    </div>
                    <div className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      msg.isMe
                        ? "text-white rounded-tr-sm"
                        : "bg-[var(--secondary)] text-[var(--foreground)] rounded-tl-sm"
                    }`} style={msg.isMe ? { background: "var(--primary)" } : {}}>
                      {msg.body}
                    </div>
                    {msg.isMe && (
                      <div className="flex items-center gap-0.5 mt-0.5">
                        <CheckCheck className="h-3 w-3" style={{ color: "#16a34a" }} />
                        <span className="text-[10px] text-[var(--muted-foreground)]">Delivered</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Reply Box */}
            <div className="p-4 border-t border-[var(--border)] shrink-0">
              <div className="flex items-end gap-3">
                <div className="flex-1">
                  <textarea
                    value={reply}
                    onChange={e => setReply(e.target.value)}
                    rows={2}
                    placeholder="Type a message..."
                    className="w-full px-3 py-2 text-sm border border-[var(--border)] rounded-xl bg-[var(--secondary)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30 resize-none"
                  />
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button className="p-2 rounded-md text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--secondary)]">
                    <Paperclip className="h-4 w-4" />
                  </button>
                  <button
                    className="p-2.5 rounded-xl text-white hover:opacity-90 disabled:opacity-40"
                    style={{ background: "var(--primary)" }}
                    disabled={!reply.trim()}
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Customer Info Sidebar */}
          <div className="w-64 shrink-0 border-l border-[var(--border)] overflow-y-auto p-4 space-y-4">
            <div className="text-center">
              <Avatar className="h-12 w-12 mx-auto mb-2">
                <AvatarFallback className="text-sm font-bold" style={{ background: "var(--primary)", color: "white" }}>
                  {selected.name.split(" ").map(n => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <p className="text-sm font-semibold text-[var(--foreground)]">{selected.name}</p>
              <p className="text-xs text-[var(--muted-foreground)]">{selected.company}</p>
            </div>

            {[
              { label: "Email", value: selected.email },
              { label: "Phone", value: "+44 7700 900123" },
              { label: "Company", value: selected.company },
            ].map(f => (
              <div key={f.label}>
                <p className="text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wide mb-0.5">{f.label}</p>
                <p className="text-xs text-[var(--foreground)]">{f.value}</p>
              </div>
            ))}

            <div>
              <p className="text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wide mb-2">Previous Tickets</p>
              <div className="space-y-1.5">
                {["#2041 — 2FA Reset Issue", "#2035 — SAML Config", "#2018 — Billing Query"].map(t => (
                  <div key={t} className="flex items-center gap-1.5 rounded-md bg-[var(--secondary)] px-2 py-1.5">
                    <Ticket className="h-3 w-3 text-[var(--muted-foreground)] shrink-0" />
                    <span className="text-[11px] text-[var(--foreground)] truncate">{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
