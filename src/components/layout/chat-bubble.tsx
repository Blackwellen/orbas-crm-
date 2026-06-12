"use client"

import * as React from "react"
import {
  MessageSquare, X, Maximize2, Minimize2, Inbox, Users,
  Sparkles, Bell, Zap, Send, ChevronRight, Circle,
  Plus, UserPlus, FileText, Ticket
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useAppStore, type ChatBubbleTab } from "@/store/app-store"

const TABS: { id: ChatBubbleTab; label: string; icon: React.ElementType }[] = [
  { id: "inbox", label: "Inbox", icon: Inbox },
  { id: "team", label: "Team", icon: Users },
  { id: "ai", label: "AI", icon: Sparkles },
  { id: "notifications", label: "Alerts", icon: Bell },
  { id: "actions", label: "Actions", icon: Zap },
]

const SAMPLE_INBOX = [
  { id: "1", sender: "Sarah Mitchell", preview: "Can you review the Q3 proposal?", time: "2m", unread: true, avatar: "SM" },
  { id: "2", sender: "James Chen", preview: "The invoice #1042 is overdue", time: "15m", unread: true, avatar: "JC" },
  { id: "3", sender: "Support Chat", preview: "New ticket from Acme Corp", time: "1h", unread: false, avatar: "SC" },
]

const SAMPLE_CHANNELS = [
  { id: "1", name: "general", lastMsg: "Meeting at 3pm today", time: "5m", unread: 2 },
  { id: "2", name: "sales-team", lastMsg: "Q3 target hit! 🎉", time: "1h", unread: 0 },
  { id: "3", name: "dev-updates", lastMsg: "New release deployed", time: "3h", unread: 0 },
]

const SAMPLE_NOTIFICATIONS = [
  { id: "1", text: "Deal 'Acme Enterprise' moved to Proposal stage", time: "5m", icon: "💼" },
  { id: "2", text: "Invoice #1089 is overdue by 3 days", time: "1h", icon: "⚠️" },
  { id: "3", text: "Sarah assigned you a new task", time: "2h", icon: "✅" },
]

const QUICK_ACTIONS = [
  { label: "New Lead", icon: UserPlus, href: "/app/crm/leads/new" },
  { label: "New Task", icon: Zap, href: "/app/home" },
  { label: "New Invoice", icon: FileText, href: "/app/accounting/invoices/new" },
  { label: "New Ticket", icon: Ticket, href: "/app/service/tickets/new" },
]

export function ChatBubble() {
  const open = useAppStore(s => s.chatBubbleOpen)
  const tab = useAppStore(s => s.chatBubbleTab)
  const openBubble = useAppStore(s => s.openChatBubble)
  const closeBubble = useAppStore(s => s.closeChatBubble)
  const setTab = useAppStore(s => s.setChatBubbleTab)
  const [large, setLarge] = React.useState(false)
  const [aiInput, setAiInput] = React.useState("")
  const [aiMessages, setAiMessages] = React.useState<{ role: "user" | "ai"; text: string }[]>([
    { role: "ai", text: "Hi! I'm your Orbas AI Copilot. I can help you with your current workspace — ask me about deals, invoices, tickets, or use /commands." }
  ])

  function sendAiMessage() {
    if (!aiInput.trim()) return
    const msg = aiInput.trim()
    setAiInput("")
    setAiMessages(prev => [...prev, { role: "user", text: msg }])
    setTimeout(() => {
      setAiMessages(prev => [...prev, { role: "ai", text: `I'm analyzing your workspace for "${msg}". In a production environment, this would query your live data and provide insights. Try /summarise, /next-actions, or /create-task.` }])
    }, 800)
  }

  if (!open) {
    return (
      <button
        onClick={openBubble}
        className="fixed bottom-6 right-6 z-50 h-13 w-13 rounded-full shadow-xl flex items-center justify-center orbas-gradient hover:scale-105 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2"
        style={{ height: 52, width: 52 }}
        aria-label="Open Orbas Connect"
      >
        <MessageSquare className="h-5 w-5 text-white" />
        <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--destructive)] text-white text-[9px] font-bold">3</span>
      </button>
    )
  }

  const w = large ? 760 : 340
  const h = large ? 560 : 480

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex flex-col rounded-xl border border-[var(--border)] bg-[var(--background)] shadow-2xl overflow-hidden"
      style={{ width: w, height: h, maxWidth: "calc(100vw - 24px)", maxHeight: "calc(100vh - 80px)" }}
    >
      {/* Header */}
      <div className="flex items-center gap-2 px-3 py-2.5 border-b border-[var(--border)] orbas-gradient">
        <MessageSquare className="h-4 w-4 text-white shrink-0" />
        <span className="text-sm font-semibold text-white flex-1">Orbas Connect</span>
        <button onClick={() => setLarge(l => !l)} className="text-white/80 hover:text-white transition-colors" aria-label={large ? "Shrink" : "Expand"}>
          {large ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
        </button>
        <button onClick={closeBubble} className="text-white/80 hover:text-white transition-colors" aria-label="Close">
          <X className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Tab strip */}
      <div className="flex border-b border-[var(--border)] bg-[var(--muted)]">
        {TABS.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={cn(
              "flex-1 flex flex-col items-center gap-0.5 py-2 text-[10px] font-medium transition-colors",
              tab === t.id
                ? "text-[var(--primary)] border-b-2 border-[var(--primary)] bg-[var(--background)]"
                : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
            )}
          >
            <t.icon className="h-3.5 w-3.5" />
            {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {tab === "inbox" && (
          <div className="divide-y divide-[var(--border)]">
            {SAMPLE_INBOX.map(item => (
              <button key={item.id} className="w-full flex items-start gap-3 px-3 py-3 hover:bg-[var(--secondary)] transition-colors text-left">
                <div className="h-8 w-8 rounded-full bg-[var(--primary)] flex items-center justify-center text-white text-xs font-semibold shrink-0">
                  {item.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-sm font-medium truncate">{item.sender}</span>
                    <span className="text-[10px] text-[var(--muted-foreground)] shrink-0">{item.time}</span>
                  </div>
                  <p className="text-xs text-[var(--muted-foreground)] truncate">{item.preview}</p>
                </div>
                {item.unread && <Circle className="h-2 w-2 fill-[var(--primary)] text-[var(--primary)] shrink-0 mt-1.5" />}
              </button>
            ))}
            <div className="p-3">
              <button className="w-full text-xs text-[var(--primary)] hover:underline text-center">View all conversations →</button>
            </div>
          </div>
        )}

        {tab === "team" && (
          <div className="divide-y divide-[var(--border)]">
            {SAMPLE_CHANNELS.map(ch => (
              <button key={ch.id} className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-[var(--secondary)] transition-colors text-left">
                <span className="text-sm text-[var(--muted-foreground)] font-mono">#</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{ch.name}</span>
                    <span className="text-[10px] text-[var(--muted-foreground)]">{ch.time}</span>
                  </div>
                  <p className="text-xs text-[var(--muted-foreground)] truncate">{ch.lastMsg}</p>
                </div>
                {ch.unread > 0 && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--primary)] text-white text-[10px] font-bold shrink-0">{ch.unread}</span>
                )}
              </button>
            ))}
            <div className="p-3">
              <button className="w-full flex items-center justify-center gap-1.5 text-xs text-[var(--primary)] hover:underline">
                <Plus className="h-3 w-3" /> New Channel
              </button>
            </div>
          </div>
        )}

        {tab === "ai" && (
          <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto p-3 space-y-3">
              {aiMessages.map((msg, i) => (
                <div key={i} className={cn("flex gap-2", msg.role === "user" && "flex-row-reverse")}>
                  {msg.role === "ai" && (
                    <div className="h-7 w-7 rounded-full orbas-gradient flex items-center justify-center shrink-0">
                      <Sparkles className="h-3.5 w-3.5 text-white" />
                    </div>
                  )}
                  <div className={cn(
                    "rounded-lg px-3 py-2 text-sm max-w-[85%]",
                    msg.role === "ai" ? "bg-[var(--secondary)] text-[var(--foreground)]" : "bg-[var(--primary)] text-white ml-auto"
                  )}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-[var(--border)] p-3">
              <div className="flex gap-2">
                <input
                  value={aiInput}
                  onChange={e => setAiInput(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && sendAiMessage()}
                  placeholder="Ask anything or type / for commands..."
                  className="flex-1 text-sm bg-[var(--secondary)] rounded-md px-3 py-2 outline-none focus:ring-1 focus:ring-[var(--primary)]"
                />
                <button onClick={sendAiMessage} className="rounded-md orbas-gradient px-3 text-white hover:opacity-90">
                  <Send className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {tab === "notifications" && (
          <div className="divide-y divide-[var(--border)]">
            {SAMPLE_NOTIFICATIONS.map(n => (
              <div key={n.id} className="flex items-start gap-3 px-3 py-3 hover:bg-[var(--secondary)] transition-colors cursor-pointer">
                <span className="text-lg shrink-0">{n.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm">{n.text}</p>
                  <p className="text-[10px] text-[var(--muted-foreground)] mt-0.5">{n.time} ago</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "actions" && (
          <div className="p-3 grid grid-cols-2 gap-2">
            {QUICK_ACTIONS.map(action => (
              <button key={action.label} className="flex items-center gap-2 rounded-lg border border-[var(--border)] px-3 py-3 hover:bg-[var(--secondary)] transition-colors text-sm font-medium text-left">
                <action.icon className="h-4 w-4 text-[var(--primary)]" />
                {action.label}
              </button>
            ))}
            <button className="col-span-2 flex items-center justify-center gap-2 rounded-lg border border-dashed border-[var(--border)] px-3 py-3 hover:bg-[var(--secondary)] transition-colors text-sm text-[var(--muted-foreground)]">
              <Plus className="h-4 w-4" /> More actions
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
