"use client"

import React, { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import Link from "next/link"
import {
  Search, Plus, Download, Upload, MoreHorizontal, Eye, Edit,
  Trash2, X, LayoutList, LayoutGrid, Users, UserCheck,
  UserMinus, Briefcase
} from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn, getInitials, formatDate } from "@/lib/utils"

type MemberType = "Employee" | "Contractor" | "Intern"
type MemberStatus = "Active" | "Inactive" | "On Leave"

interface Member {
  id: string
  name: string
  role: string
  department: string
  type: MemberType
  status: MemberStatus
  startDate: string
  location: string
  manager: string
  email?: string
}

const MEMBERS: Member[] = [
  { id: "1",  name: "Alex Thompson",    role: "Senior Engineer",      department: "Engineering",  type: "Employee",   status: "Active",   startDate: "2023-03-01", location: "London",     manager: "James Park" },
  { id: "2",  name: "Sarah Chen",       role: "Product Designer",     department: "Product",      type: "Employee",   status: "On Leave", startDate: "2022-07-15", location: "Manchester", manager: "Emma Thornton" },
  { id: "3",  name: "James Park",       role: "Engineering Manager",  department: "Engineering",  type: "Employee",   status: "Active",   startDate: "2021-01-10", location: "London",     manager: "Charlotte Davies" },
  { id: "4",  name: "Emma Thornton",    role: "Head of Product",      department: "Product",      type: "Employee",   status: "Active",   startDate: "2020-05-20", location: "London",     manager: "Oliver Hughes" },
  { id: "5",  name: "Marcus Williams",  role: "Sales Executive",      department: "Sales",        type: "Employee",   status: "Active",   startDate: "2024-01-08", location: "Birmingham", manager: "Daniel Roberts" },
  { id: "6",  name: "Priya Sharma",     role: "Marketing Manager",    department: "Marketing",    type: "Employee",   status: "Active",   startDate: "2022-11-01", location: "London",     manager: "Isabella King" },
  { id: "7",  name: "Daniel Roberts",   role: "VP Sales",             department: "Sales",        type: "Employee",   status: "Active",   startDate: "2019-09-15", location: "London",     manager: "Oliver Hughes" },
  { id: "8",  name: "Sophie Clarke",    role: "Content Strategist",   department: "Marketing",    type: "Employee",   status: "Active",   startDate: "2023-06-12", location: "Remote",     manager: "Priya Sharma" },
  { id: "9",  name: "Oliver Hughes",    role: "CEO",                  department: "Executive",    type: "Employee",   status: "Active",   startDate: "2018-01-01", location: "London",     manager: "Board" },
  { id: "10", name: "Charlotte Davies", role: "CTO",                  department: "Engineering",  type: "Employee",   status: "Active",   startDate: "2018-06-01", location: "London",     manager: "Oliver Hughes" },
  { id: "11", name: "Aiden Foster",     role: "DevOps Engineer",      department: "Engineering",  type: "Contractor", status: "Active",   startDate: "2024-03-01", location: "Remote",     manager: "James Park" },
  { id: "12", name: "Isabella King",    role: "CMO",                  department: "Marketing",    type: "Employee",   status: "Active",   startDate: "2021-04-01", location: "London",     manager: "Oliver Hughes" },
  { id: "13", name: "Noah Campbell",    role: "Data Analyst",         department: "Finance",      type: "Employee",   status: "Active",   startDate: "2023-09-04", location: "London",     manager: "Grace Bennett" },
  { id: "14", name: "Grace Bennett",    role: "CFO",                  department: "Finance",      type: "Employee",   status: "Active",   startDate: "2020-01-15", location: "London",     manager: "Oliver Hughes" },
  { id: "15", name: "Liam Peterson",    role: "UX Researcher",        department: "Product",      type: "Intern",     status: "Active",   startDate: "2026-01-06", location: "London",     manager: "Emma Thornton" },
  { id: "16", name: "Amelia Brooks",    role: "Backend Developer",    department: "Engineering",  type: "Employee",   status: "Active",   startDate: "2022-08-22", location: "Leeds",      manager: "James Park" },
  { id: "17", name: "Ethan Morgan",     role: "Finance Analyst",      department: "Finance",      type: "Employee",   status: "Inactive", startDate: "2021-03-10", location: "London",     manager: "Grace Bennett" },
]

const statusConfig: Record<string, { bg: string; color: string }> = {
  Active:    { bg: "#dcfce7", color: "#16a34a" },
  Inactive:  { bg: "var(--muted)", color: "var(--muted-foreground)" },
  "On Leave":{ bg: "#fef9c3", color: "#d97706" },
}

const typeConfig: Record<string, { bg: string; color: string }> = {
  Employee:   { bg: "#dbeafe", color: "#2563eb" },
  Contractor: { bg: "#f3e8ff", color: "#9333ea" },
  Intern:     { bg: "#fce7f3", color: "#db2777" },
}

export default function DirectoryPage() {
  const [search, setSearch]   = useState("")
  const [typeFilter, setType] = useState("all")
  const [deptFilter, setDept] = useState("all")
  const [statusFilter, setStatus] = useState("all")
  const [view, setView]       = useState<"table" | "cards">("table")
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [members, setMembers] = useState<any[]>(MEMBERS)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const supabase = createClient()
    setLoading(true)
    supabase.from("employees").select("*").order("full_name")
      .then(({ data }) => {
        if (data && data.length > 0) setMembers(data.map(e => ({
          ...e,
          name: e.name ?? e.full_name,
          role: e.role ?? e.job_title,
          type: e.type ?? e.employment_type ?? "Employee",
          startDate: e.startDate ?? e.start_date ?? "",
          location: e.location ?? "",
          manager: e.manager ?? e.manager_id ?? "",
        })))
      })
  }, [])

  const depts = Array.from(new Set(members.map(m => m.department))).sort()

  const filtered = members.filter(m => {
    const q = search.toLowerCase()
    const matchSearch = !search || m.name.toLowerCase().includes(q) || m.role.toLowerCase().includes(q) || m.department.toLowerCase().includes(q)
    const matchType   = typeFilter   === "all" || m.type   === typeFilter
    const matchDept   = deptFilter   === "all" || m.department === deptFilter
    const matchStatus = statusFilter === "all" || m.status === statusFilter
    return matchSearch && matchType && matchDept && matchStatus
  })

  const active  = members.filter(m => m.status === "Active" || m.status === "active").length
  const onLeave = members.filter(m => m.status === "On Leave" || m.status === "on_leave").length

  function toggleAll() {
    selected.size === filtered.length ? setSelected(new Set()) : setSelected(new Set(filtered.map(m => m.id)))
  }
  function toggleOne(id: string) {
    setSelected(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n })
  }

  return (
    <div className="p-6 space-y-4 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-[var(--foreground)]">Directory</h1>
          <p className="text-sm text-[var(--muted-foreground)] mt-0.5">Full workforce register</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-1.5 rounded-md border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-[var(--foreground)] hover:bg-[var(--muted)]">
            <Upload className="h-4 w-4" />Import
          </button>
          <button className="inline-flex items-center gap-1.5 rounded-md border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-[var(--foreground)] hover:bg-[var(--muted)]">
            <Download className="h-4 w-4" />Export
          </button>
          <Link
            href="/app/people/directory/new"
            className="inline-flex items-center gap-1.5 rounded-md bg-[var(--primary)] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
          >
            <Plus className="h-4 w-4" />Add Member
          </Link>
        </div>
      </div>

      {/* Stats Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Headcount", value: members.length, icon: Users,      color: "text-blue-600",   bg: "bg-blue-50" },
          { label: "Active",          value: active,          icon: UserCheck,  color: "text-emerald-600",bg: "bg-emerald-50" },
          { label: "On Leave",        value: onLeave,         icon: UserMinus,  color: "text-amber-600",  bg: "bg-amber-50" },
          { label: "Open Roles",      value: 14,              icon: Briefcase,  color: "text-violet-600", bg: "bg-violet-50" },
        ].map(s => (
          <div key={s.label} className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-4 flex items-center gap-3">
            <div className={cn("p-2 rounded-lg", s.bg)}>
              <s.icon className={cn("h-5 w-5", s.color)} />
            </div>
            <div>
              <p className="text-xs text-[var(--muted-foreground)]">{s.label}</p>
              <p className="text-xl font-bold text-[var(--foreground)]">{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 flex-wrap">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-[var(--muted-foreground)]" />
          <Input placeholder="Search…" className="pl-8 h-8 w-60 text-sm" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <Select value={typeFilter} onValueChange={setType}>
          <SelectTrigger className="h-8 text-sm w-36"><SelectValue placeholder="Type" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="Employee">Employee</SelectItem>
            <SelectItem value="Contractor">Contractor</SelectItem>
            <SelectItem value="Intern">Intern</SelectItem>
          </SelectContent>
        </Select>
        <Select value={deptFilter} onValueChange={setDept}>
          <SelectTrigger className="h-8 text-sm w-40"><SelectValue placeholder="Department" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Departments</SelectItem>
            {depts.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatus}>
          <SelectTrigger className="h-8 text-sm w-36"><SelectValue placeholder="Status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="On Leave">On Leave</SelectItem>
            <SelectItem value="Inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
        {(typeFilter !== "all" || deptFilter !== "all" || statusFilter !== "all" || search) && (
          <button onClick={() => { setType("all"); setDept("all"); setStatus("all"); setSearch("") }}
            className="flex items-center gap-1 text-xs text-[var(--muted-foreground)] hover:text-[var(--foreground)] px-2 h-8">
            <X className="h-3.5 w-3.5" />Clear
          </button>
        )}
        <div className="ml-auto flex items-center gap-1">
          <button onClick={() => setView("table")} className={cn("p-1.5 rounded", view === "table" ? "bg-[var(--muted)]" : "hover:bg-[var(--muted)]")}>
            <LayoutList className="h-4 w-4 text-[var(--foreground)]" />
          </button>
          <button onClick={() => setView("cards")} className={cn("p-1.5 rounded", view === "cards" ? "bg-[var(--muted)]" : "hover:bg-[var(--muted)]")}>
            <LayoutGrid className="h-4 w-4 text-[var(--foreground)]" />
          </button>
        </div>
      </div>

      {/* Bulk bar */}
      {selected.size > 0 && (
        <div className="flex items-center gap-2 bg-[var(--primary)]/5 border border-[var(--primary)]/20 rounded-lg px-4 py-2">
          <span className="text-sm font-medium text-[var(--primary)]">{selected.size} selected</span>
          <div className="h-4 w-px bg-[var(--border)]" />
          <button className="text-xs px-2 py-1 rounded hover:bg-[var(--muted)] text-[var(--foreground)]">Export</button>
          <button className="text-xs px-2 py-1 rounded hover:bg-[var(--muted)] text-red-600">Delete</button>
          <button onClick={() => setSelected(new Set())} className="ml-auto p-1 hover:bg-[var(--muted)] rounded">
            <X className="h-4 w-4 text-[var(--muted-foreground)]" />
          </button>
        </div>
      )}

      {/* Table */}
      {view === "table" && (
        <div className="rounded-lg border border-[var(--border)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[var(--muted)] border-b border-[var(--border)]">
                  <th className="px-4 py-3 w-10">
                    <Checkbox checked={selected.size === filtered.length && filtered.length > 0} onCheckedChange={toggleAll} />
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)]">Name</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)]">Role</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)]">Department</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)]">Type</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)]">Status</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)]">Start Date</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)]">Location</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)]">Manager</th>
                  <th className="px-4 py-3 w-10"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {filtered.map(m => (
                  <tr key={m.id} className={cn("hover:bg-[var(--muted)]/50 transition-colors", selected.has(m.id) && "bg-[var(--primary)]/5")}>
                    <td className="px-4 py-3"><Checkbox checked={selected.has(m.id)} onCheckedChange={() => toggleOne(m.id)} /></td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-7 w-7">
                          <AvatarFallback className="text-[10px] bg-[var(--primary)]/10 text-[var(--primary)]">
                            {getInitials(m.name)}
                          </AvatarFallback>
                        </Avatar>
                        <Link href={`/app/people/directory/${m.id}`} className="font-medium text-[var(--primary)] hover:underline whitespace-nowrap">
                          {m.name}
                        </Link>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs text-[var(--muted-foreground)] whitespace-nowrap">{m.role}</td>
                    <td className="px-4 py-3 text-xs text-[var(--foreground)]">{m.department}</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium" style={{ background: typeConfig[m.type].bg, color: typeConfig[m.type].color }}>
                        {m.type}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium" style={{ background: statusConfig[m.status].bg, color: statusConfig[m.status].color }}>
                        {m.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-[var(--muted-foreground)] whitespace-nowrap">{formatDate(m.startDate)}</td>
                    <td className="px-4 py-3 text-xs text-[var(--muted-foreground)]">{m.location}</td>
                    <td className="px-4 py-3 text-xs text-[var(--muted-foreground)]">{m.manager}</td>
                    <td className="px-4 py-3">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="p-1 rounded hover:bg-[var(--muted)]"><MoreHorizontal className="h-4 w-4 text-[var(--muted-foreground)]" /></button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40">
                          <DropdownMenuItem asChild><Link href={`/app/people/directory/${m.id}`}><Eye className="h-3.5 w-3.5 mr-2" />View</Link></DropdownMenuItem>
                          <DropdownMenuItem><Edit className="h-3.5 w-3.5 mr-2" />Edit</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600"><Trash2 className="h-3.5 w-3.5 mr-2" />Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Cards */}
      {view === "cards" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map(m => (
            <Link key={m.id} href={`/app/people/directory/${m.id}`} className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-4 hover:shadow-md transition-shadow block">
              <div className="flex items-start gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="text-sm bg-[var(--primary)]/10 text-[var(--primary)]">
                    {getInitials(m.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[var(--foreground)] truncate">{m.name}</p>
                  <p className="text-xs text-[var(--muted-foreground)] truncate">{m.role}</p>
                  <p className="text-xs text-[var(--muted-foreground)]">{m.department} · {m.location}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-3">
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium" style={{ background: typeConfig[m.type].bg, color: typeConfig[m.type].color }}>{m.type}</span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium" style={{ background: statusConfig[m.status].bg, color: statusConfig[m.status].color }}>{m.status}</span>
              </div>
            </Link>
          ))}
        </div>
      )}

      <p className="text-sm text-[var(--muted-foreground)]">Showing {filtered.length} of {members.length} members{loading ? " · Loading…" : ""}</p>
    </div>
  )
}
