"use client"

import * as React from "react"
import Link from "next/link"
import {
  TrendingUp,
  TrendingDown,
  CheckSquare,
  MessageSquare,
  DollarSign,
  Briefcase,
  CheckCircle,
  AlertCircle,
  Sparkles,
  Users,
  Settings,
  FolderKanban,
  Wrench,
  UserCheck,
  HeadphonesIcon,
  BarChart3,
  FileText,
  ShieldCheck,
  Heart,
  ThumbsUp,
  ThumbsDown,
  ChevronRight,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { createClient } from "@/lib/supabase/client"

function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return "Good morning"
  if (hour < 17) return "Good afternoon"
  return "Good evening"
}

function formatDate() {
  return new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

interface KpiCard {
  label: string
  value: string
  trend: string
  trendUp: boolean
  trendNeutral?: boolean
  icon: React.ElementType
  iconBg: string
  iconColor: string
}

const KPI_CARDS: KpiCard[] = [
  {
    label: "Open Deals",
    value: "84",
    trend: "+12%",
    trendUp: true,
    icon: Briefcase,
    iconBg: "bg-blue-100 dark:bg-blue-950",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
  {
    label: "Tasks Due Today",
    value: "18",
    trend: "3 overdue",
    trendUp: false,
    trendNeutral: false,
    icon: CheckSquare,
    iconBg: "bg-amber-100 dark:bg-amber-950",
    iconColor: "text-amber-600 dark:text-amber-400",
  },
  {
    label: "Pending Approvals",
    value: "3",
    trend: "Awaiting review",
    trendUp: true,
    trendNeutral: true,
    icon: CheckCircle,
    iconBg: "bg-violet-100 dark:bg-violet-950",
    iconColor: "text-violet-600 dark:text-violet-400",
  },
  {
    label: "Unread Messages",
    value: "7",
    trend: "2 new today",
    trendUp: true,
    trendNeutral: true,
    icon: MessageSquare,
    iconBg: "bg-cyan-100 dark:bg-cyan-950",
    iconColor: "text-cyan-600 dark:text-cyan-400",
  },
  {
    label: "Revenue This Month",
    value: "£142K",
    trend: "+8%",
    trendUp: true,
    icon: DollarSign,
    iconBg: "bg-green-100 dark:bg-green-950",
    iconColor: "text-green-600 dark:text-green-400",
  },
]

const WORK_QUEUE = [
  { id: 1, task: "Follow up with Nexus Corp re: renewal", relatedTo: "Nexus Corp", due: "Today", priority: "High" },
  { id: 2, task: "Review Q3 invoice for Pinnacle Ltd", relatedTo: "Invoice #1042", due: "Today", priority: "High" },
  { id: 3, task: "Update deal stage for Meridian deal", relatedTo: "Meridian Deal", due: "Tomorrow", priority: "Medium" },
  { id: 4, task: "Prepare onboarding doc for new hire", relatedTo: "HR / People", due: "Fri 13 Jun", priority: "Low" },
  { id: 5, task: "Demo call prep — Vertex Solutions", relatedTo: "Vertex Solutions", due: "Fri 13 Jun", priority: "Medium" },
]

const APPROVALS = [
  { id: 1, title: "Invoice #1042 approval", requester: "Sarah Johnson", amount: "£8,400", type: "Invoice" },
  { id: 2, title: "Annual leave request — Tom Webb", requester: "Tom Webb", amount: "5 days", type: "Leave" },
  { id: 3, title: "20% deal discount — Apex Ltd", requester: "James Carter", amount: "£12,000", type: "Discount" },
]

const AI_INSIGHTS = [
  { icon: AlertCircle, text: "3 deals haven't had activity in 7 days — risk of going cold.", color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-950/40" },
  { icon: DollarSign, text: "Invoice #1042 is 5 days overdue. £8,400 outstanding from Nexus Corp.", color: "text-red-600 dark:text-red-400", bg: "bg-red-50 dark:bg-red-950/40" },
  { icon: TrendingUp, text: "Q3 revenue target is at 67% with 2 weeks remaining in the quarter.", color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-950/40" },
]

const INBOX_MESSAGES = [
  { id: 1, sender: "Sarah Johnson", initials: "SJ", preview: "Hey, just wanted to check if the proposal for Nexus…", time: "10:42 AM", unread: true },
  { id: 2, sender: "James Carter", initials: "JC", preview: "The deal with Apex Ltd needs your approval before…", time: "9:15 AM", unread: true },
  { id: 3, sender: "Orbas System", initials: "OS", preview: "Your monthly usage report for May is now ready.", time: "Yesterday", unread: false },
]

interface AppShortcut {
  id: string
  name: string
  description: string
  icon: React.ElementType
  gradient: string
  href: string
  badge?: number
}

const APP_SHORTCUTS: AppShortcut[] = [
  { id: "crm", name: "CRM", description: "Contacts & deals", icon: Users, gradient: "from-indigo-500 to-indigo-600", href: "/app/crm", badge: 12 },
  { id: "accounting", name: "Accounting", description: "Invoices & finance", icon: DollarSign, gradient: "from-emerald-500 to-emerald-600", href: "/app/accounting", badge: 3 },
  { id: "operations", name: "Operations", description: "Workflows & tasks", icon: Settings, gradient: "from-orange-500 to-orange-600", href: "/app/operations" },
  { id: "projects", name: "Projects", description: "Milestones & tasks", icon: FolderKanban, gradient: "from-violet-500 to-violet-600", href: "/app/projects", badge: 5 },
  { id: "field-service", name: "Field Service", description: "Jobs & scheduling", icon: Wrench, gradient: "from-yellow-500 to-yellow-600", href: "/app/field-service" },
  { id: "people", name: "People", description: "HR & recruitment", icon: UserCheck, gradient: "from-pink-500 to-pink-600", href: "/app/people" },
  { id: "service", name: "Service", description: "Tickets & SLAs", icon: HeadphonesIcon, gradient: "from-cyan-500 to-cyan-600", href: "/app/service", badge: 8 },
  { id: "connect", name: "Connect", description: "Team messaging", icon: MessageSquare, gradient: "from-teal-500 to-teal-600", href: "/app/connect", badge: 7 },
  { id: "analytics", name: "Analytics", description: "Reports & BI", icon: BarChart3, gradient: "from-blue-600 to-purple-600", href: "/app/analytics" },
  { id: "documents", name: "Documents", description: "Files & templates", icon: FileText, gradient: "from-slate-500 to-slate-600", href: "/app/documents" },
  { id: "compliance", name: "Compliance", description: "Audits & policy", icon: ShieldCheck, gradient: "from-red-500 to-red-600", href: "/app/compliance" },
  { id: "charity", name: "Charity", description: "Donations & grants", icon: Heart, gradient: "from-rose-500 to-rose-600", href: "/app/charity" },
]

const PRIORITY_COLORS: Record<string, string> = {
  High: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400",
  Medium: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400",
  Low: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400",
}

export default function HomePage() {
  const [loading, setLoading] = React.useState(true)
  const [userName, setUserName] = React.useState("there")
  const [approvals, setApprovals] = React.useState(APPROVALS)
  const [approved, setApproved] = React.useState<Set<number>>(new Set())
  const [rejected, setRejected] = React.useState<Set<number>>(new Set())

  React.useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data }) => {
      const name = data.user?.user_metadata?.full_name || data.user?.email?.split("@")[0] || "there"
      setUserName(name.split(" ")[0])
      setLoading(false)
    })
  }, [])

  function handleApprove(id: number) {
    setApproved((prev) => new Set([...prev, id]))
    setRejected((prev) => { const n = new Set(prev); n.delete(id); return n })
  }

  function handleReject(id: number) {
    setRejected((prev) => new Set([...prev, id]))
    setApproved((prev) => { const n = new Set(prev); n.delete(id); return n })
  }

  return (
    <div className="p-6 space-y-6">
      {/* Welcome bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          {loading ? (
            <Skeleton className="h-8 w-64 mb-1" />
          ) : (
            <h1 className="text-2xl font-bold text-[var(--foreground)]">
              {getGreeting()}, {userName} 👋
            </h1>
          )}
          <p className="text-sm text-[var(--muted-foreground)]">{formatDate()}</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-right hidden sm:block">
            <p className="text-xs text-[var(--muted-foreground)]">Workspace</p>
            <p className="text-sm font-medium text-[var(--foreground)]">Orbas Demo</p>
          </div>
          <div className="h-9 w-9 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center text-white text-sm font-bold">
            O
          </div>
        </div>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {KPI_CARDS.map((kpi) => {
          const Icon = kpi.icon
          return (
            <Card key={kpi.label} className="border-[var(--border)]">
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className={cn("flex h-9 w-9 items-center justify-center rounded-lg", kpi.iconBg)}>
                    <Icon className={cn("h-4 w-4", kpi.iconColor)} />
                  </div>
                  <span className={cn(
                    "flex items-center gap-0.5 text-xs font-medium",
                    kpi.trendNeutral
                      ? "text-[var(--muted-foreground)]"
                      : kpi.trendUp
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-600 dark:text-red-400"
                  )}>
                    {!kpi.trendNeutral && (kpi.trendUp ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />)}
                    {kpi.trend}
                  </span>
                </div>
                <p className="text-2xl font-bold text-[var(--foreground)]">{kpi.value}</p>
                <p className="text-xs text-[var(--muted-foreground)] mt-0.5">{kpi.label}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT: 2/3 width */}
        <div className="lg:col-span-2 space-y-6">
          {/* Work Queue */}
          <Card className="border-[var(--border)]">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle className="text-base font-semibold">My Work Queue</CardTitle>
              <Link href="/app/home/work-queue">
                <Button variant="ghost" size="sm" className="gap-1 text-[var(--primary)] h-7 text-xs">
                  View all <ChevronRight className="h-3.5 w-3.5" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[var(--border)] bg-[var(--muted)]/40">
                      <th className="px-4 py-2.5 text-left text-xs font-medium text-[var(--muted-foreground)]">Task</th>
                      <th className="px-4 py-2.5 text-left text-xs font-medium text-[var(--muted-foreground)] hidden md:table-cell">Related To</th>
                      <th className="px-4 py-2.5 text-left text-xs font-medium text-[var(--muted-foreground)]">Due</th>
                      <th className="px-4 py-2.5 text-left text-xs font-medium text-[var(--muted-foreground)]">Priority</th>
                      <th className="px-4 py-2.5 text-right text-xs font-medium text-[var(--muted-foreground)]"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--border)]">
                    {WORK_QUEUE.map((item) => (
                      <tr key={item.id} className="hover:bg-[var(--muted)]/30 transition-colors">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <input type="checkbox" className="h-3.5 w-3.5 rounded border-[var(--border)] accent-[var(--primary)]" />
                            <span className="text-sm text-[var(--foreground)] line-clamp-1">{item.task}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-xs text-[var(--muted-foreground)] hidden md:table-cell">{item.relatedTo}</td>
                        <td className="px-4 py-3 text-xs text-[var(--muted-foreground)] whitespace-nowrap">{item.due}</td>
                        <td className="px-4 py-3">
                          <span className={cn("inline-flex px-2 py-0.5 rounded-full text-xs font-medium", PRIORITY_COLORS[item.priority])}>
                            {item.priority}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <Button variant="ghost" size="sm" className="h-6 text-xs text-[var(--primary)] px-2">
                            Open
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Apps Grid */}
          <Card className="border-[var(--border)]">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle className="text-base font-semibold">Apps</CardTitle>
              <Link href="/app/home/apps">
                <Button variant="ghost" size="sm" className="gap-1 text-[var(--primary)] h-7 text-xs">
                  Manage <ChevronRight className="h-3.5 w-3.5" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {APP_SHORTCUTS.map((app) => {
                  const Icon = app.icon
                  return (
                    <Link key={app.id} href={app.href}>
                      <div className="group relative flex flex-col items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--background)] p-3 hover:border-[var(--primary)]/50 hover:bg-[var(--primary)]/5 transition-all text-center">
                        {app.badge !== undefined && (
                          <span className="absolute -top-1.5 -right-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--primary)] px-1 text-[10px] font-semibold text-white">
                            {app.badge}
                          </span>
                        )}
                        <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br", app.gradient)}>
                          <Icon className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-[var(--foreground)]">{app.name}</p>
                          <p className="text-[10px] text-[var(--muted-foreground)] mt-0.5 hidden sm:block">{app.description}</p>
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* RIGHT: 1/3 width */}
        <div className="space-y-6">
          {/* Approval Queue */}
          <Card className="border-[var(--border)]">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle className="text-base font-semibold">Approval Queue</CardTitle>
              <Link href="/app/home/approvals">
                <Button variant="ghost" size="sm" className="gap-1 text-[var(--primary)] h-7 text-xs">
                  View all <ChevronRight className="h-3.5 w-3.5" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="space-y-3 p-4 pt-0">
              {approvals.map((item) => {
                const isApproved = approved.has(item.id)
                const isRejected = rejected.has(item.id)
                const isDone = isApproved || isRejected
                return (
                  <div
                    key={item.id}
                    className={cn(
                      "rounded-lg border p-3 space-y-2 transition-all",
                      isDone ? "opacity-60 border-[var(--border)]" : "border-[var(--border)] bg-[var(--background)]"
                    )}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-xs font-medium text-[var(--foreground)] line-clamp-1">{item.title}</p>
                        <p className="text-[11px] text-[var(--muted-foreground)] mt-0.5">{item.requester} · {item.amount}</p>
                      </div>
                      <Badge variant="outline" className="text-[10px] shrink-0">{item.type}</Badge>
                    </div>
                    {isDone ? (
                      <div className={cn("text-xs font-medium", isApproved ? "text-green-600" : "text-red-600")}>
                        {isApproved ? "✓ Approved" : "✗ Rejected"}
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          className="h-7 text-xs flex-1 bg-green-600 hover:bg-green-700 text-white"
                          onClick={() => handleApprove(item.id)}
                        >
                          <ThumbsUp className="h-3 w-3" />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 text-xs flex-1 border-red-300 text-red-600 hover:bg-red-50"
                          onClick={() => handleReject(item.id)}
                        >
                          <ThumbsDown className="h-3 w-3" />
                          Reject
                        </Button>
                      </div>
                    )}
                  </div>
                )
              })}
            </CardContent>
          </Card>

          {/* AI Briefing */}
          <Card className="border-[var(--border)] overflow-hidden">
            <div className="bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] p-4 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-white" />
              <h3 className="text-sm font-semibold text-white">AI Briefing</h3>
              <span className="ml-auto text-[10px] text-white/70">Updated just now</span>
            </div>
            <CardContent className="p-4 space-y-3">
              {AI_INSIGHTS.map((insight, i) => {
                const Icon = insight.icon
                return (
                  <div key={i} className={cn("flex items-start gap-2.5 rounded-lg p-2.5", insight.bg)}>
                    <Icon className={cn("h-4 w-4 mt-0.5 shrink-0", insight.color)} />
                    <p className="text-xs text-[var(--foreground)] leading-relaxed">{insight.text}</p>
                  </div>
                )
              })}
              <Separator />
              <Link href="/app/home/ai-briefing">
                <Button className="w-full gap-1.5" size="sm">
                  <Sparkles className="h-3.5 w-3.5" />
                  Ask AI about this
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Inbox Snapshot */}
          <Card className="border-[var(--border)]">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <div className="flex items-center gap-2">
                <CardTitle className="text-base font-semibold">Inbox</CardTitle>
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--primary)] text-[10px] font-semibold text-white">
                  7
                </span>
              </div>
              <Link href="/app/home/inbox">
                <Button variant="ghost" size="sm" className="gap-1 text-[var(--primary)] h-7 text-xs">
                  Open <ChevronRight className="h-3.5 w-3.5" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-[var(--border)]">
                {INBOX_MESSAGES.map((msg) => (
                  <div key={msg.id} className="flex items-start gap-3 px-4 py-3 hover:bg-[var(--muted)]/30 transition-colors cursor-pointer">
                    <Avatar className="h-8 w-8 shrink-0">
                      <AvatarFallback className="text-xs bg-[var(--primary)]/10 text-[var(--primary)]">
                        {msg.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className={cn("text-xs", msg.unread ? "font-semibold text-[var(--foreground)]" : "text-[var(--foreground)]")}>
                          {msg.sender}
                        </span>
                        <span className="text-[10px] text-[var(--muted-foreground)] shrink-0">{msg.time}</span>
                      </div>
                      <p className="text-xs text-[var(--muted-foreground)] mt-0.5 truncate">{msg.preview}</p>
                    </div>
                    {msg.unread && (
                      <div className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--primary)] shrink-0" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
