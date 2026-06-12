"use client"

import * as React from "react"
import { Search, Inbox, Archive } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

interface Message {
  id: number
  sender: string
  initials: string
  subject: string
  preview: string
  time: string
  unread: boolean
  assignedToMe: boolean
  avatarColor: string
}

const MESSAGES: Message[] = [
  { id: 1, sender: "Sarah Johnson", initials: "SJ", subject: "Re: Nexus Corp renewal proposal", preview: "Hey, just wanted to check if the proposal for Nexus has been finalised. They're keen to sign before month end.", time: "10:42 AM", unread: true, assignedToMe: true, avatarColor: "bg-blue-500" },
  { id: 2, sender: "James Carter", initials: "JC", subject: "Apex Ltd deal discount approval", preview: "The deal with Apex Ltd needs your approval before we can proceed. They want 20% off the enterprise plan.", time: "9:15 AM", unread: true, assignedToMe: true, avatarColor: "bg-violet-500" },
  { id: 3, sender: "Emma Walsh", initials: "EW", subject: "Q2 board report feedback", preview: "I've reviewed the draft and have a few comments on the revenue section. Can we sync tomorrow afternoon?", time: "8:30 AM", unread: true, assignedToMe: false, avatarColor: "bg-pink-500" },
  { id: 4, sender: "Tom Webb", initials: "TW", subject: "Annual leave request — June", preview: "Hi, I'd like to request annual leave from 15–19 June. I've ensured cover is arranged with Chris during that period.", time: "Yesterday", unread: true, assignedToMe: true, avatarColor: "bg-emerald-500" },
  { id: 5, sender: "Orbas System", initials: "OS", subject: "Monthly usage report — May 2026", preview: "Your monthly usage report for May is now ready. CRM activity was up 18% vs April.", time: "Yesterday", unread: false, assignedToMe: false, avatarColor: "bg-slate-500" },
  { id: 6, sender: "Lisa Park", initials: "LP", subject: "LinkedIn Ads budget request Q3", preview: "I've submitted the Q3 marketing budget for LinkedIn Ads. It's £4,000 total across 3 campaigns.", time: "Mon", unread: false, assignedToMe: true, avatarColor: "bg-orange-500" },
  { id: 7, sender: "Chris Murray", initials: "CM", subject: "Dev contractor rate review", preview: "Following our discussion last week, I've drafted the proposal for the contractor rate increase.", time: "Mon", unread: false, assignedToMe: false, avatarColor: "bg-cyan-500" },
]

export default function InboxPage() {
  const [loading, setLoading] = React.useState(true)
  const [search, setSearch] = React.useState("")
  const [selected, setSelected] = React.useState<number | null>(null)
  const [messages, setMessages] = React.useState(MESSAGES)

  React.useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600)
    return () => clearTimeout(t)
  }, [])

  function markRead(id: number) {
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, unread: false } : m)))
    setSelected(id)
  }

  function filterMessages(tab: string, msgs: Message[]) {
    const searched = msgs.filter((m) =>
      !search ||
      m.sender.toLowerCase().includes(search.toLowerCase()) ||
      m.subject.toLowerCase().includes(search.toLowerCase()) ||
      m.preview.toLowerCase().includes(search.toLowerCase())
    )
    if (tab === "unread") return searched.filter((m) => m.unread)
    if (tab === "assigned") return searched.filter((m) => m.assignedToMe)
    return searched
  }

  const selectedMsg = selected ? messages.find((m) => m.id === selected) : null

  const unreadCount = messages.filter((m) => m.unread).length

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-[var(--foreground)]">Inbox</h1>
          <p className="text-sm text-[var(--muted-foreground)]">{unreadCount} unread message{unreadCount !== 1 ? "s" : ""}</p>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--muted-foreground)]" />
        <Input placeholder="Search inbox…" value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="unread">
            Unread
            {unreadCount > 0 && (
              <span className="ml-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[var(--primary)] px-1 text-[10px] font-semibold text-white">
                {unreadCount}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="assigned">Assigned to me</TabsTrigger>
        </TabsList>

        {["all", "unread", "assigned"].map((tab) => (
          <TabsContent key={tab} value={tab} className="mt-4">
            <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-4">
              {/* Message list */}
              <Card className="border-[var(--border)]">
                <CardContent className="p-0">
                  {loading ? (
                    <div className="p-3 space-y-3">
                      {Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-16 w-full" />)}
                    </div>
                  ) : filterMessages(tab, messages).length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <Inbox className="h-10 w-10 text-[var(--muted-foreground)] mb-2" />
                      <p className="text-sm font-medium text-[var(--foreground)]">No messages</p>
                    </div>
                  ) : (
                    <div className="divide-y divide-[var(--border)]">
                      {filterMessages(tab, messages).map((msg) => (
                        <button
                          key={msg.id}
                          onClick={() => markRead(msg.id)}
                          className={cn(
                            "w-full flex items-start gap-3 px-4 py-3 text-left hover:bg-[var(--muted)]/30 transition-colors",
                            selected === msg.id && "bg-[var(--primary)]/5"
                          )}
                        >
                          <Avatar className="h-9 w-9 shrink-0">
                            <AvatarFallback className={cn("text-xs text-white", msg.avatarColor)}>
                              {msg.initials}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-1 mb-0.5">
                              <span className={cn("text-xs", msg.unread ? "font-semibold text-[var(--foreground)]" : "text-[var(--foreground)]")}>
                                {msg.sender}
                              </span>
                              <span className="text-[10px] text-[var(--muted-foreground)] shrink-0">{msg.time}</span>
                            </div>
                            <p className={cn("text-xs truncate", msg.unread ? "font-medium text-[var(--foreground)]" : "text-[var(--muted-foreground)]")}>
                              {msg.subject}
                            </p>
                            <p className="text-[11px] text-[var(--muted-foreground)] truncate mt-0.5">{msg.preview}</p>
                          </div>
                          {msg.unread && (
                            <div className="mt-2 h-2 w-2 rounded-full bg-[var(--primary)] shrink-0" />
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Message detail */}
              <Card className="border-[var(--border)] hidden lg:block">
                <CardContent className="p-0 h-full">
                  {selectedMsg ? (
                    <div className="p-6 space-y-4">
                      <div className="flex items-start gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className={cn("text-white text-sm", selectedMsg.avatarColor)}>
                            {selectedMsg.initials}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="font-semibold text-[var(--foreground)]">{selectedMsg.sender}</p>
                          <p className="text-sm text-[var(--muted-foreground)]">{selectedMsg.time}</p>
                        </div>
                        <Button variant="ghost" size="icon" title="Archive">
                          <Archive className="h-4 w-4" />
                        </Button>
                      </div>
                      <div>
                        <h2 className="text-base font-semibold text-[var(--foreground)]">{selectedMsg.subject}</h2>
                      </div>
                      <div className="rounded-lg bg-[var(--muted)]/40 p-4">
                        <p className="text-sm text-[var(--foreground)] leading-relaxed">{selectedMsg.preview}</p>
                        <p className="text-sm text-[var(--foreground)] leading-relaxed mt-3">
                          Please let me know at your earliest convenience. Thanks in advance for your help with this.
                        </p>
                        <p className="text-sm text-[var(--muted-foreground)] mt-4">
                          Best regards,<br />
                          {selectedMsg.sender}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" className="gap-1.5">Reply</Button>
                        <Button size="sm" variant="outline" className="gap-1.5">Forward</Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-64 text-center">
                      <Inbox className="h-12 w-12 text-[var(--muted-foreground)] mb-3" />
                      <p className="font-medium text-[var(--foreground)]">Select a message</p>
                      <p className="text-sm text-[var(--muted-foreground)]">Choose a conversation from the list</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
