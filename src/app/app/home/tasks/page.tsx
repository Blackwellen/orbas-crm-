"use client"

import * as React from "react"
import { Plus, CheckCircle2, Search, X, Loader2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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

interface Task {
  id: number
  title: string
  project: string
  assignee: string
  dueDate: string
  priority: string
  done: boolean
}

const INITIAL_TASKS: Task[] = [
  { id: 1, title: "Follow up with Nexus Corp re: renewal", project: "Sales", assignee: "Me", dueDate: "2026-06-10", priority: "High", done: false },
  { id: 2, title: "Review Q3 invoice for Pinnacle Ltd", project: "Finance", assignee: "Me", dueDate: "2026-06-10", priority: "High", done: false },
  { id: 3, title: "Update deal stage — Meridian", project: "CRM", assignee: "Me", dueDate: "2026-06-11", priority: "Medium", done: false },
  { id: 4, title: "Prepare onboarding doc for new hire", project: "HR", assignee: "Me", dueDate: "2026-06-13", priority: "Low", done: false },
  { id: 5, title: "Demo call prep — Vertex Solutions", project: "Sales", assignee: "Me", dueDate: "2026-06-13", priority: "Medium", done: false },
  { id: 6, title: "Q2 revenue reconciliation review", project: "Finance", assignee: "Me", dueDate: "2026-06-16", priority: "Medium", done: true },
  { id: 7, title: "Update pipeline for Enterprise segment", project: "CRM", assignee: "Me", dueDate: "2026-06-18", priority: "Low", done: true },
  { id: 8, title: "Prepare board report Q2", project: "Management", assignee: "Me", dueDate: "2026-06-20", priority: "High", done: false },
]

let nextId = 100

export default function TasksPage() {
  const [loading, setLoading] = React.useState(true)
  const [tasks, setTasks] = React.useState<Task[]>(INITIAL_TASKS)
  const [search, setSearch] = React.useState("")
  const [projectFilter, setProjectFilter] = React.useState("all")
  const [priorityFilter, setPriorityFilter] = React.useState("all")
  const [sortBy, setSortBy] = React.useState<"dueDate" | "priority">("dueDate")
  const [showCreate, setShowCreate] = React.useState(false)
  const [newTitle, setNewTitle] = React.useState("")
  const [newProject, setNewProject] = React.useState("Sales")
  const [newPriority, setNewPriority] = React.useState("Medium")
  const [newDue, setNewDue] = React.useState("")
  const [saving, setSaving] = React.useState(false)

  React.useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600)
    return () => clearTimeout(t)
  }, [])

  function toggleDone(id: number) {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    if (!newTitle.trim()) return
    setSaving(true)
    await new Promise((r) => setTimeout(r, 400))
    setSaving(false)
    setTasks((prev) => [
      { id: ++nextId, title: newTitle.trim(), project: newProject, assignee: "Me", dueDate: newDue || "2026-06-30", priority: newPriority, done: false },
      ...prev,
    ])
    setNewTitle("")
    setNewDue("")
    setShowCreate(false)
  }

  const projects = [...new Set(tasks.map((t) => t.project))]

  const priorityOrder: Record<string, number> = { High: 0, Medium: 1, Low: 2 }

  const filtered = tasks
    .filter((t) => {
      if (search && !t.title.toLowerCase().includes(search.toLowerCase())) return false
      if (projectFilter !== "all" && t.project !== projectFilter) return false
      if (priorityFilter !== "all" && t.priority !== priorityFilter) return false
      return true
    })
    .sort((a, b) => {
      if (sortBy === "priority") return (priorityOrder[a.priority] ?? 3) - (priorityOrder[b.priority] ?? 3)
      return a.dueDate.localeCompare(b.dueDate)
    })

  const pending = filtered.filter((t) => !t.done)
  const done = filtered.filter((t) => t.done)

  function formatDue(dateStr: string) {
    try {
      return new Date(dateStr).toLocaleDateString("en-GB", { day: "numeric", month: "short" })
    } catch { return dateStr }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-[var(--foreground)]">Tasks</h1>
          <p className="text-sm text-[var(--muted-foreground)]">{pending.length} open · {done.length} completed</p>
        </div>
        <Button onClick={() => setShowCreate((v) => !v)} className="gap-1.5">
          <Plus className="h-4 w-4" />
          New task
        </Button>
      </div>

      {/* Inline create form */}
      {showCreate && (
        <Card className="border-[var(--primary)]/40 bg-[var(--primary)]/5">
          <CardContent className="p-4">
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-sm font-semibold text-[var(--foreground)]">New task</h3>
                <button type="button" onClick={() => setShowCreate(false)} className="text-[var(--muted-foreground)] hover:text-[var(--foreground)]">
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="space-y-1.5">
                <Label>Task title <span className="text-[var(--destructive)]">*</span></Label>
                <Input
                  placeholder="What needs to be done?"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  autoFocus
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1.5">
                  <Label>Project</Label>
                  <Select value={newProject} onValueChange={setNewProject}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {projects.map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label>Priority</Label>
                  <Select value={newPriority} onValueChange={setNewPriority}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label>Due date</Label>
                  <Input type="date" value={newDue} onChange={(e) => setNewDue(e.target.value)} />
                </div>
              </div>
              <div className="flex gap-2 justify-end">
                <Button type="button" variant="outline" size="sm" onClick={() => setShowCreate(false)}>Cancel</Button>
                <Button type="submit" size="sm" disabled={saving || !newTitle.trim()}>
                  {saving ? <><Loader2 className="h-3.5 w-3.5 animate-spin" />Saving…</> : "Create task"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--muted-foreground)]" />
          <Input placeholder="Search tasks…" value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
        </div>
        <Select value={projectFilter} onValueChange={setProjectFilter}>
          <SelectTrigger className="w-full sm:w-36"><SelectValue placeholder="Project" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All projects</SelectItem>
            {projects.map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={priorityFilter} onValueChange={setPriorityFilter}>
          <SelectTrigger className="w-full sm:w-36"><SelectValue placeholder="Priority" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All priorities</SelectItem>
            <SelectItem value="High">High</SelectItem>
            <SelectItem value="Medium">Medium</SelectItem>
            <SelectItem value="Low">Low</SelectItem>
          </SelectContent>
        </Select>
        <Select value={sortBy} onValueChange={(v) => setSortBy(v as "dueDate" | "priority")}>
          <SelectTrigger className="w-full sm:w-40"><SelectValue placeholder="Sort by" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="dueDate">Sort by due date</SelectItem>
            <SelectItem value="priority">Sort by priority</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card className="border-[var(--border)]">
        <CardContent className="p-0">
          {loading ? (
            <div className="p-4 space-y-3">
              {Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <CheckCircle2 className="h-12 w-12 text-green-500 mb-3" />
              <p className="font-medium text-[var(--foreground)]">No tasks found</p>
              <p className="text-sm text-[var(--muted-foreground)]">Try adjusting your filters or create a new task</p>
            </div>
          ) : (
            <div className="divide-y divide-[var(--border)]">
              {pending.map((task) => (
                <div key={task.id} className="flex items-center gap-3 px-4 py-3 hover:bg-[var(--muted)]/20 transition-colors">
                  <button
                    onClick={() => toggleDone(task.id)}
                    className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-[var(--border)] hover:border-green-500 transition-colors"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-[var(--foreground)] truncate">{task.title}</p>
                    <p className="text-xs text-[var(--muted-foreground)]">{task.project} · Due {formatDue(task.dueDate)}</p>
                  </div>
                  <span className={cn("hidden sm:inline-flex px-2 py-0.5 rounded-full text-xs font-medium shrink-0", PRIORITY_COLORS[task.priority])}>
                    {task.priority}
                  </span>
                </div>
              ))}
              {done.length > 0 && (
                <>
                  <div className="px-4 py-2 bg-[var(--muted)]/40">
                    <p className="text-xs font-medium text-[var(--muted-foreground)]">Completed ({done.length})</p>
                  </div>
                  {done.map((task) => (
                    <div key={task.id} className="flex items-center gap-3 px-4 py-3 opacity-50 hover:opacity-70 transition-opacity">
                      <button
                        onClick={() => toggleDone(task.id)}
                        className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-green-500 bg-green-500"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5 text-white" />
                      </button>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-[var(--muted-foreground)] line-through truncate">{task.title}</p>
                        <p className="text-xs text-[var(--muted-foreground)]">{task.project}</p>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
