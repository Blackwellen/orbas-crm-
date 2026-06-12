"use client"

import * as React from "react"
import { CheckCircle2, XCircle, Eye, Search } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

const PRIORITY_COLORS: Record<string, string> = {
  High: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400",
  Medium: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400",
  Low: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400",
}

const STATUS_COLORS: Record<string, string> = {
  Pending: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400",
  Approved: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400",
  Rejected: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400",
}

interface Approval {
  id: number
  request: string
  requester: string
  initials: string
  type: string
  value: string
  submitted: string
  priority: string
  status: string
}

const INITIAL_APPROVALS: Approval[] = [
  { id: 1, request: "Invoice #1042 payment approval", requester: "Sarah Johnson", initials: "SJ", type: "Invoice", value: "£8,400", submitted: "Today, 9:15 AM", priority: "High", status: "Pending" },
  { id: 2, request: "Annual leave — 5 days (15–19 Jun)", requester: "Tom Webb", initials: "TW", type: "Leave", value: "5 days", submitted: "Today, 8:40 AM", priority: "Medium", status: "Pending" },
  { id: 3, request: "20% discount on Apex Ltd deal", requester: "James Carter", initials: "JC", type: "Discount", value: "£12,000 deal", submitted: "Yesterday, 4:30 PM", priority: "High", status: "Pending" },
  { id: 4, request: "Software licence purchase — Figma Team", requester: "Emma Walsh", initials: "EW", type: "Purchase", value: "£720/yr", submitted: "Yesterday, 2:00 PM", priority: "Low", status: "Approved" },
  { id: 5, request: "Contractor rate increase — Dev team", requester: "Chris Murray", initials: "CM", type: "HR", value: "+£50/day", submitted: "Mon 9 Jun", priority: "Medium", status: "Rejected" },
  { id: 6, request: "Marketing spend — LinkedIn Ads Q3", requester: "Lisa Park", initials: "LP", type: "Budget", value: "£4,000", submitted: "Mon 9 Jun", priority: "Medium", status: "Pending" },
]

export default function ApprovalsPage() {
  const [loading, setLoading] = React.useState(true)
  const [approvals, setApprovals] = React.useState<Approval[]>(INITIAL_APPROVALS)
  const [search, setSearch] = React.useState("")
  const [typeFilter, setTypeFilter] = React.useState("all")
  const [statusFilter, setStatusFilter] = React.useState("all")

  React.useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600)
    return () => clearTimeout(t)
  }, [])

  function changeStatus(id: number, status: string) {
    setApprovals((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)))
  }

  const filtered = approvals.filter((a) => {
    if (search && !a.request.toLowerCase().includes(search.toLowerCase()) && !a.requester.toLowerCase().includes(search.toLowerCase())) return false
    if (typeFilter !== "all" && a.type !== typeFilter) return false
    if (statusFilter !== "all" && a.status !== statusFilter) return false
    return true
  })

  const pendingCount = approvals.filter((a) => a.status === "Pending").length

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-[var(--foreground)]">Approval Queue</h1>
          <p className="text-sm text-[var(--muted-foreground)]">
            {pendingCount} pending approval{pendingCount !== 1 ? "s" : ""} require your attention
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--muted-foreground)]" />
          <Input
            placeholder="Search approvals…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-full sm:w-36">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All types</SelectItem>
            <SelectItem value="Invoice">Invoice</SelectItem>
            <SelectItem value="Leave">Leave</SelectItem>
            <SelectItem value="Discount">Discount</SelectItem>
            <SelectItem value="Purchase">Purchase</SelectItem>
            <SelectItem value="HR">HR</SelectItem>
            <SelectItem value="Budget">Budget</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-36">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Approved">Approved</SelectItem>
            <SelectItem value="Rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card className="border-[var(--border)]">
        <CardContent className="p-0">
          {loading ? (
            <div className="p-4 space-y-4">
              {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-16 w-full rounded-lg" />)}
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <CheckCircle2 className="h-12 w-12 text-green-500 mb-3" />
              <p className="font-medium text-[var(--foreground)]">All caught up!</p>
              <p className="text-sm text-[var(--muted-foreground)]">No approvals match your filters</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)] bg-[var(--muted)]/40">
                    <th className="px-4 py-3 text-left text-xs font-medium text-[var(--muted-foreground)]">Request</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-[var(--muted-foreground)] hidden sm:table-cell">Requester</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-[var(--muted-foreground)]">Type</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-[var(--muted-foreground)] hidden md:table-cell">Amount/Value</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-[var(--muted-foreground)] hidden lg:table-cell">Submitted</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-[var(--muted-foreground)]">Priority</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-[var(--muted-foreground)]">Status</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-[var(--muted-foreground)]">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)]">
                  {filtered.map((item) => (
                    <tr key={item.id} className="hover:bg-[var(--muted)]/20 transition-colors">
                      <td className="px-4 py-3">
                        <span className="text-sm font-medium text-[var(--foreground)] line-clamp-1">{item.request}</span>
                      </td>
                      <td className="px-4 py-3 hidden sm:table-cell">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-[10px] bg-[var(--primary)]/10 text-[var(--primary)]">{item.initials}</AvatarFallback>
                          </Avatar>
                          <span className="text-xs text-[var(--muted-foreground)]">{item.requester}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant="outline" className="text-xs">{item.type}</Badge>
                      </td>
                      <td className="px-4 py-3 text-xs font-medium text-[var(--foreground)] hidden md:table-cell">{item.value}</td>
                      <td className="px-4 py-3 text-xs text-[var(--muted-foreground)] hidden lg:table-cell whitespace-nowrap">{item.submitted}</td>
                      <td className="px-4 py-3">
                        <span className={cn("inline-flex px-2 py-0.5 rounded-full text-xs font-medium", PRIORITY_COLORS[item.priority])}>
                          {item.priority}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={cn("inline-flex px-2 py-0.5 rounded-full text-xs font-medium", STATUS_COLORS[item.status] ?? "")}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1">
                          {item.status === "Pending" ? (
                            <>
                              <Button
                                size="sm"
                                className="h-7 px-2.5 text-xs bg-green-600 hover:bg-green-700 text-white"
                                onClick={() => changeStatus(item.id, "Approved")}
                                title="Approve"
                              >
                                <CheckCircle2 className="h-3.5 w-3.5" />
                                <span className="hidden sm:inline ml-1">Approve</span>
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-7 px-2.5 text-xs border-red-300 text-red-600 hover:bg-red-50"
                                onClick={() => changeStatus(item.id, "Rejected")}
                                title="Reject"
                              >
                                <XCircle className="h-3.5 w-3.5" />
                                <span className="hidden sm:inline ml-1">Reject</span>
                              </Button>
                            </>
                          ) : (
                            <Button size="sm" variant="ghost" className="h-7 px-2.5 text-xs" title="View Details">
                              <Eye className="h-3.5 w-3.5" />
                              <span className="hidden sm:inline ml-1">Details</span>
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
