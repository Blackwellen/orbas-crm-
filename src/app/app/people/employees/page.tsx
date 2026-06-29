"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Search, Plus, Download, MoreHorizontal, Eye, Edit, Trash2, X, UserCog } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn, getInitials, formatDate } from "@/lib/utils"

const EMPLOYEES = [
  { id: "1",  name: "Alex Thompson",    role: "Senior Engineer",      department: "Engineering",  status: "Active",   startDate: "2023-03-01", location: "London",     manager: "James Park",        payrollId: "EMP-0041", taxCode: "1257L",  salary: 72000 },
  { id: "2",  name: "Sarah Chen",       role: "Product Designer",     department: "Product",      status: "On Leave", startDate: "2022-07-15", location: "Manchester", manager: "Emma Thornton",      payrollId: "EMP-0028", taxCode: "1257L",  salary: 58000 },
  { id: "3",  name: "James Park",       role: "Engineering Manager",  department: "Engineering",  status: "Active",   startDate: "2021-01-10", location: "London",     manager: "Charlotte Davies",   payrollId: "EMP-0017", taxCode: "1257L",  salary: 95000 },
  { id: "4",  name: "Emma Thornton",    role: "Head of Product",      department: "Product",      status: "Active",   startDate: "2020-05-20", location: "London",     manager: "Oliver Hughes",      payrollId: "EMP-0011", taxCode: "1257L",  salary: 105000 },
  { id: "5",  name: "Marcus Williams",  role: "Sales Executive",      department: "Sales",        status: "Active",   startDate: "2024-01-08", location: "Birmingham", manager: "Daniel Roberts",     payrollId: "EMP-0052", taxCode: "BR",     salary: 42000 },
  { id: "6",  name: "Priya Sharma",     role: "Marketing Manager",    department: "Marketing",    status: "Active",   startDate: "2022-11-01", location: "London",     manager: "Isabella King",      payrollId: "EMP-0033", taxCode: "1257L",  salary: 65000 },
  { id: "7",  name: "Daniel Roberts",   role: "VP Sales",             department: "Sales",        status: "Active",   startDate: "2019-09-15", location: "London",     manager: "Oliver Hughes",      payrollId: "EMP-0008", taxCode: "1257L",  salary: 130000 },
  { id: "8",  name: "Sophie Clarke",    role: "Content Strategist",   department: "Marketing",    status: "Active",   startDate: "2023-06-12", location: "Remote",     manager: "Priya Sharma",       payrollId: "EMP-0044", taxCode: "1257L",  salary: 48000 },
  { id: "9",  name: "Oliver Hughes",    role: "CEO",                  department: "Executive",    status: "Active",   startDate: "2018-01-01", location: "London",     manager: "Board",              payrollId: "EMP-0001", taxCode: "1257L",  salary: 250000 },
  { id: "10", name: "Charlotte Davies", role: "CTO",                  department: "Engineering",  status: "Active",   startDate: "2018-06-01", location: "London",     manager: "Oliver Hughes",      payrollId: "EMP-0002", taxCode: "1257L",  salary: 220000 },
  { id: "12", name: "Isabella King",    role: "CMO",                  department: "Marketing",    status: "Active",   startDate: "2021-04-01", location: "London",     manager: "Oliver Hughes",      payrollId: "EMP-0019", taxCode: "1257L",  salary: 185000 },
  { id: "13", name: "Noah Campbell",    role: "Data Analyst",         department: "Finance",      status: "Active",   startDate: "2023-09-04", location: "London",     manager: "Grace Bennett",      payrollId: "EMP-0048", taxCode: "1257L",  salary: 52000 },
  { id: "14", name: "Grace Bennett",    role: "CFO",                  department: "Finance",      status: "Active",   startDate: "2020-01-15", location: "London",     manager: "Oliver Hughes",      payrollId: "EMP-0010", taxCode: "1257L",  salary: 200000 },
  { id: "16", name: "Amelia Brooks",    role: "Backend Developer",    department: "Engineering",  status: "Active",   startDate: "2022-08-22", location: "Leeds",      manager: "James Park",         payrollId: "EMP-0036", taxCode: "1257L",  salary: 62000 },
  { id: "17", name: "Ethan Morgan",     role: "Finance Analyst",      department: "Finance",      status: "Inactive", startDate: "2021-03-10", location: "London",     manager: "Grace Bennett",      payrollId: "EMP-0022", taxCode: "D0",     salary: 48000 },
]

const statusColors: Record<string, string> = {
  Active:    "bg-emerald-100 text-emerald-700",
  Inactive:  "bg-[var(--muted)] text-[var(--muted-foreground)]",
  "On Leave":"bg-amber-100 text-amber-700",
}

export default function EmployeesPage() {
  const [search, setSearch]   = useState("")
  const [deptFilter, setDept] = useState("all")
  const [statusFilter, setStatus] = useState("all")

  const depts = Array.from(new Set(EMPLOYEES.map(e => e.department))).sort()

  const filtered = EMPLOYEES.filter(e => {
    const q = search.toLowerCase()
    return (
      (!search || e.name.toLowerCase().includes(q) || e.role.toLowerCase().includes(q) || e.payrollId.toLowerCase().includes(q)) &&
      (deptFilter === "all"   || e.department === deptFilter) &&
      (statusFilter === "all" || e.status === statusFilter)
    )
  })

  return (
    <div className="p-6 space-y-4 max-w-[1600px] mx-auto">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-[var(--foreground)]">Employees</h1>
          <span className="px-2 py-0.5 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-sm font-semibold">{EMPLOYEES.length}</span>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-1.5 rounded-md border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm hover:bg-[var(--muted)]">
            <Download className="h-4 w-4" />Export
          </button>
          <Link href="/app/people/directory/new" className="inline-flex items-center gap-1.5 rounded-md bg-[var(--primary)] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
            <Plus className="h-4 w-4" />New Employee
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Employees", value: EMPLOYEES.length },
          { label: "Active",          value: EMPLOYEES.filter(e => e.status === "Active").length },
          { label: "On Leave",        value: EMPLOYEES.filter(e => e.status === "On Leave").length },
          { label: "Inactive",        value: EMPLOYEES.filter(e => e.status === "Inactive").length },
        ].map(s => (
          <div key={s.label} className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-4">
            <p className="text-xs text-[var(--muted-foreground)]">{s.label}</p>
            <p className="text-2xl font-bold text-[var(--foreground)] mt-1">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 flex-wrap">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-[var(--muted-foreground)]" />
          <Input placeholder="Search employees…" className="pl-8 h-8 w-60 text-sm" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
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
        {(deptFilter !== "all" || statusFilter !== "all" || search) && (
          <button onClick={() => { setDept("all"); setStatus("all"); setSearch("") }}
            className="flex items-center gap-1 text-xs text-[var(--muted-foreground)] hover:text-[var(--foreground)] px-2 h-8">
            <X className="h-3.5 w-3.5" />Clear
          </button>
        )}
      </div>

      {/* Table */}
      <div className="rounded-lg border border-[var(--border)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[var(--muted)] border-b border-[var(--border)]">
                <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)]">Name</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)]">Role</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)]">Department</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)]">Payroll ID</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)]">Tax Code</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)]">Salary</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)]">Status</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)]">Start Date</th>
                <th className="px-4 py-3 w-10"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {filtered.map(e => (
                <tr key={e.id} className="hover:bg-[var(--muted)]/50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-7 w-7">
                        <AvatarFallback className="text-[10px] bg-[var(--primary)]/10 text-[var(--primary)]">
                          {getInitials(e.name)}
                        </AvatarFallback>
                      </Avatar>
                      <Link href={`/app/people/directory/${e.id}`} className="font-medium text-[var(--primary)] hover:underline whitespace-nowrap">
                        {e.name}
                      </Link>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs text-[var(--muted-foreground)] whitespace-nowrap">{e.role}</td>
                  <td className="px-4 py-3 text-xs text-[var(--foreground)]">{e.department}</td>
                  <td className="px-4 py-3 font-mono text-xs text-[var(--muted-foreground)]">{e.payrollId}</td>
                  <td className="px-4 py-3 font-mono text-xs text-[var(--foreground)]">{e.taxCode}</td>
                  <td className="px-4 py-3 text-right text-sm font-semibold text-[var(--foreground)]">£{e.salary.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <span className={cn("inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium", statusColors[e.status])}>
                      {e.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-[var(--muted-foreground)] whitespace-nowrap">{formatDate(e.startDate)}</td>
                  <td className="px-4 py-3">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="p-1 rounded hover:bg-[var(--muted)]"><MoreHorizontal className="h-4 w-4 text-[var(--muted-foreground)]" /></button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-40">
                        <DropdownMenuItem asChild><Link href={`/app/people/directory/${e.id}`}><Eye className="h-3.5 w-3.5 mr-2" />View</Link></DropdownMenuItem>
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
      <p className="text-sm text-[var(--muted-foreground)]">Showing {filtered.length} of {EMPLOYEES.length} employees</p>
    </div>
  )
}
