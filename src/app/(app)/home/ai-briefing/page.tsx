"use client"

import * as React from "react"
import {
  Sparkles,
  AlertTriangle,
  TrendingDown,
  DollarSign,
  Users,
  Lightbulb,
  RefreshCw,
  Send,
  Loader2,
  CalendarDays,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

interface BriefingSection {
  id: string
  title: string
  icon: React.ElementType
  iconBg: string
  iconColor: string
  items: { text: string; severity?: "high" | "medium" | "low" | "info" }[]
}

const BRIEFING_DATE = "Tuesday, 10 June 2026"

const BRIEFING_SECTIONS: BriefingSection[] = [
  {
    id: "critical",
    title: "Critical Actions",
    icon: AlertTriangle,
    iconBg: "bg-red-100 dark:bg-red-950",
    iconColor: "text-red-600 dark:text-red-400",
    items: [
      { text: "Invoice #1042 (£8,400) for Nexus Corp is 5 days overdue. Follow up required immediately.", severity: "high" },
      { text: "3 pending approvals in your queue have been waiting >24 hours.", severity: "high" },
    ],
  },
  {
    id: "deal-risks",
    title: "Deal Risks",
    icon: TrendingDown,
    iconBg: "bg-amber-100 dark:bg-amber-950",
    iconColor: "text-amber-600 dark:text-amber-400",
    items: [
      { text: "Nexus Corp (£42K deal) — no activity logged in 7 days. Risk: going cold.", severity: "high" },
      { text: "Meridian Ltd (£18K deal) — deal stage hasn't changed in 12 days.", severity: "medium" },
      { text: "Vertex Solutions demo was rescheduled twice. Re-engage recommended.", severity: "medium" },
    ],
  },
  {
    id: "financial",
    title: "Financial Alerts",
    icon: DollarSign,
    iconBg: "bg-blue-100 dark:bg-blue-950",
    iconColor: "text-blue-600 dark:text-blue-400",
    items: [
      { text: "Q3 revenue target is at 67% (£142K of £212K) with 2 weeks remaining.", severity: "medium" },
      { text: "Total overdue invoices: £21,800 across 4 accounts.", severity: "high" },
      { text: "Expenses this month are tracking 12% over budget in the Marketing category.", severity: "low" },
    ],
  },
  {
    id: "team",
    title: "Team Activity Summary",
    icon: Users,
    iconBg: "bg-violet-100 dark:bg-violet-950",
    iconColor: "text-violet-600 dark:text-violet-400",
    items: [
      { text: "Sarah Johnson closed 2 deals this week totalling £28K — top performer.", severity: "info" },
      { text: "Tom Webb has a leave request pending your approval (15–19 Jun).", severity: "info" },
      { text: "5 new support tickets created today — avg response time is within SLA.", severity: "info" },
    ],
  },
  {
    id: "recommendations",
    title: "Recommended Next Actions",
    icon: Lightbulb,
    iconBg: "bg-green-100 dark:bg-green-950",
    iconColor: "text-green-600 dark:text-green-400",
    items: [
      { text: "Schedule follow-up call with Nexus Corp today to re-qualify the renewal.", severity: "info" },
      { text: "Review and action the 3 pending approvals before end of day.", severity: "info" },
      { text: "Consider running an overdue invoice campaign to recover £21,800.", severity: "info" },
      { text: "Book a Q3 performance review meeting for next week.", severity: "info" },
    ],
  },
]

const SEVERITY_BORDER: Record<string, string> = {
  high: "border-l-2 border-l-red-500",
  medium: "border-l-2 border-l-amber-500",
  low: "border-l-2 border-l-blue-400",
  info: "",
}

const SEVERITY_BG: Record<string, string> = {
  high: "bg-red-50 dark:bg-red-950/20",
  medium: "bg-amber-50 dark:bg-amber-950/20",
  low: "bg-blue-50 dark:bg-blue-950/20",
  info: "bg-[var(--muted)]/40",
}

interface ChatMessage {
  role: "user" | "ai"
  text: string
}

export default function AIBriefingPage() {
  const [loading, setLoading] = React.useState(true)
  const [regenerating, setRegenerating] = React.useState(false)
  const [question, setQuestion] = React.useState("")
  const [chat, setChat] = React.useState<ChatMessage[]>([])
  const [sending, setSending] = React.useState(false)
  const chatEndRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800)
    return () => clearTimeout(t)
  }, [])

  async function handleRegenerate() {
    setRegenerating(true)
    await new Promise((r) => setTimeout(r, 1200))
    setRegenerating(false)
  }

  async function handleSend(e: React.FormEvent) {
    e.preventDefault()
    const q = question.trim()
    if (!q) return
    setChat((prev) => [...prev, { role: "user", text: q }])
    setQuestion("")
    setSending(true)
    await new Promise((r) => setTimeout(r, 1000))
    setSending(false)
    const responses: Record<string, string> = {
      default: "Based on the current data, I'd recommend prioritising the Nexus Corp follow-up and clearing the approval queue. Both have time-sensitive financial implications. Would you like me to draft a follow-up email to Nexus Corp?",
    }
    const aiText = responses.default
    setChat((prev) => [...prev, { role: "ai", text: aiText }])
    setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100)
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--primary)] to-[var(--accent)]">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-[var(--foreground)]">AI Briefing</h1>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-[var(--muted-foreground)]">
            <CalendarDays className="h-3.5 w-3.5" />
            {BRIEFING_DATE}
          </div>
        </div>
        <Button
          variant="outline"
          onClick={handleRegenerate}
          disabled={regenerating}
          className="gap-1.5"
        >
          {regenerating ? (
            <><Loader2 className="h-4 w-4 animate-spin" />Regenerating…</>
          ) : (
            <><RefreshCw className="h-4 w-4" />Regenerate</>
          )}
        </Button>
      </div>

      {/* Briefing sections */}
      <div className="space-y-4">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="border-[var(--border)]">
              <CardContent className="p-4 space-y-2">
                <Skeleton className="h-5 w-48" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </CardContent>
            </Card>
          ))
        ) : (
          BRIEFING_SECTIONS.map((section) => {
            const Icon = section.icon
            return (
              <Card key={section.id} className="border-[var(--border)]">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className={cn("flex h-8 w-8 items-center justify-center rounded-lg", section.iconBg)}>
                      <Icon className={cn("h-4 w-4", section.iconColor)} />
                    </div>
                    <CardTitle className="text-sm font-semibold">{section.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2 pt-0">
                  {section.items.map((item, i) => (
                    <div
                      key={i}
                      className={cn(
                        "rounded-lg px-3 py-2.5 text-sm text-[var(--foreground)]",
                        SEVERITY_BG[item.severity ?? "info"],
                        SEVERITY_BORDER[item.severity ?? "info"]
                      )}
                    >
                      {item.text}
                    </div>
                  ))}
                </CardContent>
              </Card>
            )
          })
        )}
      </div>

      {/* Chat section */}
      <Card className="border-[var(--border)]">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-[var(--primary)]" />
            <CardTitle className="text-sm font-semibold">Ask a follow-up question</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {chat.length > 0 && (
            <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
              {chat.map((msg, i) => (
                <div
                  key={i}
                  className={cn(
                    "rounded-lg px-3 py-2.5 text-sm",
                    msg.role === "user"
                      ? "bg-[var(--primary)]/10 text-[var(--foreground)] ml-8"
                      : "bg-[var(--muted)]/60 text-[var(--foreground)] mr-8"
                  )}
                >
                  {msg.role === "ai" && (
                    <div className="flex items-center gap-1 mb-1">
                      <Sparkles className="h-3 w-3 text-[var(--primary)]" />
                      <span className="text-[10px] font-medium text-[var(--primary)]">AI</span>
                    </div>
                  )}
                  {msg.text}
                </div>
              ))}
              {sending && (
                <div className="flex items-center gap-2 bg-[var(--muted)]/60 rounded-lg px-3 py-2.5 mr-8">
                  <Loader2 className="h-3.5 w-3.5 animate-spin text-[var(--primary)]" />
                  <span className="text-xs text-[var(--muted-foreground)]">Thinking…</span>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>
          )}
          <form onSubmit={handleSend} className="flex gap-2">
            <Input
              placeholder="e.g. Which deals should I focus on today?"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="flex-1"
              disabled={sending}
            />
            <Button type="submit" disabled={!question.trim() || sending} size="icon" className="shrink-0">
              {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </Button>
          </form>
          <div className="flex flex-wrap gap-2">
            {["What deals need attention?", "Show me overdue invoices", "Team performance this week"].map((q) => (
              <button
                key={q}
                onClick={() => setQuestion(q)}
                className="rounded-full border border-[var(--border)] px-3 py-1 text-xs text-[var(--muted-foreground)] hover:border-[var(--primary)]/50 hover:text-[var(--primary)] transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
