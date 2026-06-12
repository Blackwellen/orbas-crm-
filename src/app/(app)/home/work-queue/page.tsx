"use client"

import * as React from "react"
import { CheckCircle2, Search, ChevronLeft, ChevronRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

const PRIORITY_COLORS: Record<string, string> = {
  High: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400",
  Medium: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400",
  Low: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400",
}

const STATUS_COLORS: Record<string, string> = {
  "Not Started": "bg-slate-100 text-slate-700 dark:bg-slate-900 dark:text-slate-400",
  "In Progress": "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400",
  "Blocked": "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400",
  "Done": "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400",
}

const TYPE_COLORS: Record<string, string> = {
  Task: "bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-400",
  Deal: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400",
  Ticket: "bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-400",
  Approval: "bg-pink-100 text-pink-700 dark:bg-pink-950 dark:text-pink-400",
}

const ALL_ITEMS = [
  { id: 1, item: "Follow up with Nexus Corp re: renewal", type: "Task", relatedRecord: "Nexus Corp", dueDate: "Today", priority: "High", status: "Not Started" },
  { id: 2, item: "Review Q3 invoice for Pinnacle Ltd", type: "Approval", relatedRecord: "Invoice #1042", dueDate: "Today", priority: "High", status: "Not Started" },
  { id: 3, item: "Update deal stage — Meridian", type: "Deal", relatedRecord: "Meridian Deal", dueDate: "Tomorrow", priority: "Medium", status: "In Progress" },
  { id: 4, item: "Prepare onboarding doc for new hire", type: "Task", relatedRecord: "HR / People", dueDate: "Fri 13 Jun", priority: "Low", status: "Not Started" },
  { id: 5, item: "Demo call prep — Vertex Solutions", type: "Task", relatedRecord: "Vertex Solutions", dueDate: "Fri 13 Jun", priority: "Medium", status: "In Progress" },
  { id: 6, item: "Support ticket: login issue for Apex Ltd", type: "Ticket", relatedRecord: "Apex Ltd", dueDate: "Today", priority: "High", status: "In Progress" },
  { id: 7, item: "Q2 revenue reconciliation review", type: "Task", relatedRecord: "Finance", dueDate: "Mon 16 Jun", priority: "Medium", status: "Not Started" },
  { id: 8, item: "Discount approval request — Vertex", type: "Approval", relatedRecord: "Vertex Solutions", dueDate: "Today", priority: "High", status: "Not Started" },
  { id: 9, item: "Update pipeline for Enterprise segment", type: "Deal", relatedRecord: "Enterprise Deals", dueDate: "Wed 18 Jun", priority: "Low", status: "Not Started" },
  { id: 10, item: "Staff leave approval — Tom Webb", type: "Approval", relatedRecord: "People", dueDate: "Tomorrow", priority: "Medium", status: "Not Started" },
  { id: 11, item: "Chase overdue payment — Zenith Ltd", type: "Task", relatedRecord: "Zenith Ltd", dueDate: "Today", priority: "High", status: "Blocked" },
  { id: 12, item: "Prepare board report Q2", type: "Task", relatedRecord: "Management", dueDate: "Fri 20 Jun", priority: "High", status: "Not Started" },
]

const PAGE_SIZE = 8

export default function WorkQueuePage() {
  const [loading, setLoading] = React.useState(true)
  const [search, setSearch] = React.useState("")
  const [typeFilter, setTypeFilter] = React.useState("all")
  const [priorityFilter, setPriorityFilter] = React.useState("all")
  const [completed, setCompleted] = React.useState<Set<number>>(new Set())
  const [page, setPage] = React.useState(1)

  React.useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600)
    return () => clearTimeout(t)
  }, [])

  const filtered = ALL_ITEMS.filter((item) => {
    if (search && !item.item.toLowerCase().includes(search.toLowerCase()) && !item.relatedRecord.toLowerCase().includes(search.toLowerCase())) return false
    if (typeFilter !== "all" && item.type !== typeFilter) return false
    if (priorityFilter !== "all" && item.priority !== priorityFilter) return false
    return true
  })

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  function toggleComplete(id: number) {
    setCompleted((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-[var(--foreground)]">Work Queue</h1>
          <p className="text-sm text-[var(--muted-foreground)]">All items assigned to you across every module</p>
        </div>
        <div className="flex items-center gap-1.5 text-sm text-[var(--muted-foreground)]">
          <span className="font-medium text-[var(--foreground)]">{filtered.length}</span> items
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--muted-foreground)]" />
          <Input
            placeholder="Search work queue…"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1) }}
            className="pl-9"
          />
        </div>
        <Select value={typeFilter} onValueChange={(v) => { setTypeFilter(v); setPage(1) }}>
          <SelectTrigger className="w-full sm:w-36">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All types</SelectItem>
            <SelectItem value="Task">Tasks</SelectItem>
            <SelectItem value="Deal">Deals</SelectItem>
            <SelectItem value="Ticket">Tickets</SelectItem>
            <SelectItem value="Approval">Approvals</SelectItem>
          </SelectContent>
        </Select>
        <Select value={priorityFilter} onValueChange={(v) => { setPriorityFilter(v); setPage(1) }}>
          <SelectTrigger className="w-full sm:w-36">
            <SelectValue placeholder="Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All priorities</SelectItem>
            <SelectItem value="High">High</SelectItem>
            <SelectItem value="Medium">Medium</SelectItem>
            <SelectItem value="Low">Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card className="border-[var(--border)]">
        <CardContent className="p-0">
          {loading ? (
            <div className="p-4 space-y-3">
              {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}
            </div>
          ) : paginated.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <CheckCircle2 className="h-12 w-12 text-[var(--muted-foreground)] mb-3" />
              <p className="font-medium text-[var(--foreground)]">Queue is clear</p>
              <p className="text-sm text-[var(--muted-foreground)]">No items match your current filters</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)] bg-[var(--muted)]/40">
                    <th className="w-10 px-4 py-3"></th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-[var(--muted-foreground)]">Item</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-[var(--muted-foreground)]">Type</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-[var(--muted-foreground)] hidden lg:table-cell">Related Record</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-[var(--muted-foreground)]">Due Date</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-[var(--muted-foreground)]">Priority</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-[var(--muted-foreground)] hidden md:table-cell">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)]">
                  {paginated.map((item) => {
                    const done = completed.has(item.id)
                    return (
                      <tr key={item.id} className={cn("hover:bg-[var(--muted)]/20 transition-colors", done && "opacity-50")}>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => toggleComplete(item.id)}
                            className={cn(
                              "flex h-5 w-5 items-center justify-center rounded-full border-2 transition-colors",
                              done
                                ? "border-green-500 bg-green-500 text-white"
                                : "border-[var(--border)] hover:border-green-500"
                            )}
                            title={done ? "Mark incomplete" : "Mark complete"}
                          >
                            {done && <CheckCircle2 className="h-3.5 w-3.5" />}
                          </button>
                        </td>
                        <td className="px-4 py-3">
                          <span className={cn("text-sm text-[var(--foreground)]", done && "line-through")}>{item.item}</span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={cn("inline-flex px-2 py-0.5 rounded-full text-xs font-medium", TYPE_COLORS[item.type] ?? "")}>
                            {item.type}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-xs text-[var(--muted-foreground)] hidden lg:table-cell">{item.relatedRecord}</td>
                        <td className="px-4 py-3 text-xs text-[var(--muted-foreground)] whitespace-nowrap">{item.dueDate}</td>
                        <td className="px-4 py-3">
                          <span className={cn("inline-flex px-2 py-0.5 rounded-full text-xs font-medium", PRIORITY_COLORS[item.priority])}>
                            {item.priority}
                          </span>
                        </td>
                        <td className="px-4 py-3 hidden md:table-cell">
                          <span className={cn("inline-flex px-2 py-0.5 rounded-full text-xs font-medium", STATUS_COLORS[item.status] ?? "")}>
                            {item.status}
                          </span>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-[var(--muted-foreground)]">
            Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length}
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
