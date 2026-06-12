"use client"

import React, { useState } from "react"
import { Search, Send, CheckCheck } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const TEAM_MEMBERS = [
  { id: 1, name: "Priya Mehta",    role: "Support Lead",     avatar: "PM", online: true,  unread: 2 },
  { id: 2, name: "James Hartley",  role: "Senior Agent",     avatar: "JH", online: true,  unread: 0 },
  { id: 3, name: "Sara Collins",   role: "Agent",            avatar: "SC", online: false, unread: 1 },
  { id: 4, name: "Tom Okafor",     role: "Agent",            avatar: "TO", online: true,  unread: 0 },
  { id: 5, name: "Ellie Brooks",   role: "Agent",            avatar: "EB", online: false, unread: 0 },
  { id: 6, name: "Daniel Walsh",   role: "Team Manager",     avatar: "DW", online: true,  unread: 0 },
  { id: 7, name: "Layla Hassan",   role: "Tier 2 Support",   avatar: "LH", online: false, unread: 0 },
]

const MESSAGES: Record<number, Array<{ id: number; body: string; time: string; isMe: boolean; read: boolean }>> = {
  1: [
    { id: 1, body: "Hey, can you look at ticket #2041? The customer is getting really frustrated.", time: "10:02", isMe: false, read: true },
    { id: 2, body: "On it! I can see the 2FA binding got wiped by the cleanup job. I'll escalate to platform.", time: "10:08", isMe: true, read: true },
    { id: 3, body: "Thanks, I've already sent the customer a holding reply. Let me know what platform says.", time: "10:11", isMe: false, read: true },
    { id: 4, body: "Platform confirmed — they'll patch it within 30 minutes. I'll update the ticket.", time: "10:34", isMe: true, read: true },
    { id: 5, body: "Perfect. Can you also close out ticket #2038? I resolved it but forgot to mark it closed.", time: "11:01", isMe: false, read: false },
    { id: 6, body: "Done! Anything else?", time: "11:03", isMe: false, read: false },
  ],
  2: [
    { id: 1, body: "Morning! Quick question — do we have an ETA on the Jira integration?", time: "09:15", isMe: true, read: true },
    { id: 2, body: "I heard it's in Q3 roadmap. Worth checking with the product team though.", time: "09:22", isMe: false, read: true },
    { id: 3, body: "Got it, thanks!", time: "09:23", isMe: true, read: true },
  ],
}

export default function DMsPage() {
  const [selected, setSelected] = useState(TEAM_MEMBERS[0])
  const [search, setSearch] = useState("")
  const [message, setMessage] = useState("")

  const msgs = MESSAGES[selected.id] ?? []
  const filtered = TEAM_MEMBERS.filter(m => m.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Left DM List */}
      <div className="w-72 shrink-0 border-r border-[var(--border)] flex flex-col overflow-hidden">
        <div className="p-4 border-b border-[var(--border)]">
          <h2 className="text-sm font-semibold text-[var(--foreground)] mb-3">Direct Messages</h2>
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[var(--muted-foreground)]" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search teammates..."
              className="w-full pl-8 pr-3 py-1.5 text-xs border border-[var(--border)] rounded-md bg-[var(--secondary)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-[var(--border)]">
          {filtered.map(member => (
            <button
              key={member.id}
              onClick={() => setSelected(member)}
              className={`w-full text-left p-3 hover:bg-[var(--secondary)] transition-colors ${selected.id === member.id ? "bg-[var(--secondary)]" : ""}`}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="text-xs font-semibold" style={{ background: "var(--primary)", color: "white" }}>
                      {member.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <span
                    className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-[var(--background)]"
                    style={{ background: member.online ? "#16a34a" : "#9ca3af" }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className={`text-xs truncate ${member.unread > 0 ? "font-bold text-[var(--foreground)]" : "font-medium text-[var(--foreground)]"}`}>
                      {member.name}
                    </span>
                    {member.unread > 0 && (
                      <span className="h-4 w-4 rounded-full text-[10px] font-bold text-white flex items-center justify-center shrink-0" style={{ background: "var(--primary)" }}>
                        {member.unread}
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-[var(--muted-foreground)]">{member.role}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Right Chat */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-3 px-5 py-3 border-b border-[var(--border)] shrink-0">
          <div className="relative">
            <Avatar className="h-9 w-9">
              <AvatarFallback className="text-xs font-semibold" style={{ background: "var(--primary)", color: "white" }}>
                {selected.avatar}
              </AvatarFallback>
            </Avatar>
            <span
              className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-[var(--background)]"
              style={{ background: selected.online ? "#16a34a" : "#9ca3af" }}
            />
          </div>
          <div>
            <p className="text-sm font-semibold text-[var(--foreground)]">{selected.name}</p>
            <p className="text-xs text-[var(--muted-foreground)]">
              {selected.online ? "Online" : "Offline"} · {selected.role}
            </p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {msgs.length === 0 && (
            <div className="flex items-center justify-center h-full">
              <p className="text-sm text-[var(--muted-foreground)]">No messages yet. Say hello!</p>
            </div>
          )}
          {msgs.map(msg => (
            <div key={msg.id} className={`flex gap-3 ${msg.isMe ? "flex-row-reverse" : ""}`}>
              <Avatar className="h-8 w-8 shrink-0">
                <AvatarFallback className="text-[10px]"
                  style={{ background: msg.isMe ? "var(--primary)" : "var(--secondary)", color: msg.isMe ? "white" : "var(--foreground)" }}>
                  {msg.isMe ? "Me" : selected.avatar}
                </AvatarFallback>
              </Avatar>
              <div className={`max-w-[65%] flex flex-col ${msg.isMe ? "items-end" : "items-start"}`}>
                <div className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${msg.isMe ? "rounded-tr-sm text-white" : "rounded-tl-sm bg-[var(--secondary)] text-[var(--foreground)]"}`}
                  style={msg.isMe ? { background: "var(--primary)" } : {}}>
                  {msg.body}
                </div>
                <div className="flex items-center gap-1 mt-0.5">
                  <span className="text-[10px] text-[var(--muted-foreground)]">{msg.time}</span>
                  {msg.isMe && (
                    <CheckCheck className="h-3 w-3" style={{ color: msg.read ? "#16a34a" : "var(--muted-foreground)" }} />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-[var(--border)] shrink-0">
          <div className="flex items-end gap-2">
            <textarea
              value={message}
              onChange={e => setMessage(e.target.value)}
              rows={2}
              placeholder={`Message ${selected.name}…`}
              className="flex-1 px-3 py-2 text-sm border border-[var(--border)] rounded-xl bg-[var(--secondary)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30 resize-none"
            />
            <button
              className="p-2.5 rounded-xl text-white hover:opacity-90 disabled:opacity-40"
              style={{ background: "var(--primary)" }}
              disabled={!message.trim()}
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
