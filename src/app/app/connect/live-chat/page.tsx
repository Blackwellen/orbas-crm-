"use client"

import React, { useState } from "react"
import { MessageCircle, Clock, User, Bot, CheckCircle, XCircle, Eye, Settings } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const ACTIVE_CHATS = [
  { id: 1, visitor: "Visitor #4821", page: "/pricing", waitTime: "0:32", agent: "Priya Mehta", status: "Active" },
  { id: 2, visitor: "Jordan Clarke", page: "/app/service/tickets", waitTime: "2:14", agent: "Unassigned", status: "Waiting" },
  { id: 3, visitor: "Visitor #4819", page: "/docs/api", waitTime: "0:05", agent: "Bot", status: "Bot" },
  { id: 4, visitor: "Mia Nguyen", page: "/app/settings", waitTime: "1:07", agent: "James Hartley", status: "Active" },
  { id: 5, visitor: "Visitor #4816", page: "/", waitTime: "5:31", agent: "Unassigned", status: "Waiting" },
  { id: 6, visitor: "Oliver Grant", page: "/integrations", waitTime: "0:44", agent: "Sara Collins", status: "Active" },
  { id: 7, visitor: "Visitor #4811", page: "/pricing", waitTime: "11:02", agent: "Tom Okafor", status: "Closed" },
]

const statusConfig: Record<string, { color: string; bg: string; icon: React.ComponentType<{ className?: string }> }> = {
  Active:  { color: "#16a34a", bg: "#f0fdf4",  icon: MessageCircle },
  Waiting: { color: "#d97706", bg: "#fffbeb",  icon: Clock },
  Bot:     { color: "#1a56db", bg: "#eff6ff",  icon: Bot },
  Closed:  { color: "#6b7280", bg: "#f3f4f6",  icon: CheckCircle },
}

const kpis = [
  { label: "Active Chats",   value: "3",    color: "#16a34a", icon: MessageCircle },
  { label: "Waiting",        value: "2",    color: "#d97706", icon: Clock },
  { label: "Avg Wait Time",  value: "1:48", color: "#1a56db", icon: Clock },
  { label: "Satisfaction",   value: "4.7",  color: "#d97706", icon: CheckCircle },
]

export default function LiveChatPage() {
  const [widgetColor, setWidgetColor] = useState("#1a56db")
  const [greeting, setGreeting] = useState("Hi! How can we help you today?")

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-[var(--foreground)]">Live Chat</h1>
          <p className="text-sm text-[var(--muted-foreground)] mt-0.5">Real-time visitor conversations and chat management</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-md border border-[var(--border)] px-3 py-2 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--secondary)]">
          <Settings className="h-4 w-4" /> Widget Settings
        </button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map(k => (
          <Card key={k.label} className="border border-[var(--border)]">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2.5 rounded-lg" style={{ background: k.color + "18" }}>
                <k.icon className="h-5 w-5" style={{ color: k.color }} />
              </div>
              <div>
                <p className="text-xs text-[var(--muted-foreground)]">{k.label}</p>
                <p className="text-2xl font-bold text-[var(--foreground)]">{k.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Active Chats Table */}
        <div className="lg:col-span-2">
          <Card className="border border-[var(--border)]">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold">Active Chats</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)] bg-[var(--secondary)]">
                    <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--muted-foreground)]">Visitor</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--muted-foreground)]">Page</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--muted-foreground)]">Wait Time</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--muted-foreground)]">Agent</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--muted-foreground)]">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--muted-foreground)]">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)]">
                  {ACTIVE_CHATS.map(chat => {
                    const sc = statusConfig[chat.status]
                    const StatusIcon = sc.icon
                    return (
                      <tr key={chat.id} className="hover:bg-[var(--secondary)] transition-colors">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-7 w-7">
                              <AvatarFallback className="text-[10px]" style={{ background: "var(--secondary)", color: "var(--foreground)" }}>
                                {chat.visitor[0]}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-xs font-medium text-[var(--foreground)]">{chat.visitor}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 font-mono text-xs text-[var(--muted-foreground)]">{chat.page}</td>
                        <td className="px-4 py-3">
                          <span className="flex items-center gap-1 text-xs font-mono" style={{ color: chat.status === "Waiting" ? "#d97706" : "var(--foreground)" }}>
                            <Clock className="h-3 w-3" /> {chat.waitTime}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-xs text-[var(--foreground)]">
                          {chat.agent === "Bot"
                            ? <span className="flex items-center gap-1"><Bot className="h-3 w-3" style={{ color: "#1a56db" }} /> Bot</span>
                            : chat.agent === "Unassigned"
                            ? <span className="text-[var(--muted-foreground)]">Unassigned</span>
                            : <span className="flex items-center gap-1"><User className="h-3 w-3 text-[var(--muted-foreground)]" /> {chat.agent}</span>
                          }
                        </td>
                        <td className="px-4 py-3">
                          <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium"
                            style={{ color: sc.color, background: sc.bg }}>
                            <StatusIcon className="h-3 w-3" />
                            {chat.status}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1">
                            <button className="inline-flex items-center gap-0.5 rounded-md border border-[var(--border)] px-2 py-1 text-[10px] font-medium text-[var(--foreground)] hover:bg-[var(--secondary)]">
                              <Eye className="h-3 w-3" /> Join
                            </button>
                            <button className="p-1 rounded-md text-[var(--muted-foreground)] hover:text-[#dc2626]">
                              <XCircle className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>

        {/* Widget Preview/Settings */}
        <div className="space-y-4">
          <Card className="border border-[var(--border)]">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold">Chat Widget Preview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[var(--muted-foreground)] mb-1">Widget Color</label>
                <div className="flex items-center gap-2">
                  <input type="color" value={widgetColor} onChange={e => setWidgetColor(e.target.value)}
                    className="h-8 w-12 rounded border border-[var(--border)] cursor-pointer" />
                  <span className="text-xs font-mono text-[var(--foreground)]">{widgetColor}</span>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-[var(--muted-foreground)] mb-1">Greeting Message</label>
                <textarea value={greeting} onChange={e => setGreeting(e.target.value)} rows={2}
                  className="w-full px-3 py-2 text-xs border border-[var(--border)] rounded-md bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30 resize-none" />
              </div>
              <div>
                <label className="block text-xs font-medium text-[var(--muted-foreground)] mb-1">Offline Message</label>
                <textarea defaultValue="We're currently offline. Leave a message and we'll get back to you!" rows={2}
                  className="w-full px-3 py-2 text-xs border border-[var(--border)] rounded-md bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30 resize-none" />
              </div>

              {/* Preview */}
              <div className="border border-[var(--border)] rounded-xl p-4 space-y-2" style={{ background: "var(--secondary)" }}>
                <p className="text-xs font-semibold text-[var(--muted-foreground)]">Preview</p>
                <div className="flex justify-end">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg" style={{ background: widgetColor }}>
                    <MessageCircle className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="rounded-2xl rounded-br-sm p-3 text-xs text-white shadow" style={{ background: widgetColor }}>
                  {greeting}
                </div>
              </div>
              <button className="w-full rounded-md py-2 text-sm font-medium text-white" style={{ background: "var(--primary)" }}>
                Save Widget Settings
              </button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
