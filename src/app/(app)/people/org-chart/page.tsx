"use client"

import React, { useState } from "react"
import { Search, ZoomIn, ZoomOut, Download, ChevronDown, Users } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn, getInitials } from "@/lib/utils"

type OrgNode = {
  id: string
  name: string
  title: string
  dept: string
  reports: number
  children?: OrgNode[]
}

const orgTree: OrgNode = {
  id: "1", name: "Katherine Moss", title: "Chief Executive Officer", dept: "Executive", reports: 6,
  children: [
    {
      id: "2", name: "James Park", title: "Chief Technology Officer", dept: "Engineering", reports: 4,
      children: [
        {
          id: "7",  name: "Alex Thompson",    title: "VP Engineering",        dept: "Engineering", reports: 8,
          children: [
            { id: "15", name: "Lena Cruz",       title: "Lead Frontend Eng",   dept: "Engineering", reports: 4 },
            { id: "16", name: "Ravi Patel",       title: "Lead Backend Eng",    dept: "Engineering", reports: 5 },
          ]
        },
        {
          id: "8",  name: "Olivia Wright",    title: "Head of Product",       dept: "Product",     reports: 5,
          children: [
            { id: "17", name: "Noah Campbell",    title: "Senior PM",           dept: "Product",     reports: 2 },
            { id: "18", name: "Isla Martin",      title: "UX Lead",             dept: "Product",     reports: 3 },
          ]
        },
      ]
    },
    {
      id: "3", name: "Emma Thornton", title: "Chief People Officer", dept: "HR", reports: 3,
      children: [
        {
          id: "9",  name: "Grace Bennett",    title: "HR Business Partner",   dept: "HR",          reports: 2,
          children: [
            { id: "19", name: "Chloe Adams",      title: "HR Advisor",          dept: "HR",          reports: 0 },
            { id: "20", name: "Leon Davies",       title: "Recruiter",           dept: "HR",          reports: 0 },
          ]
        },
        {
          id: "10", name: "Priya Sharma",     title: "L&D Manager",           dept: "HR",          reports: 2,
          children: [
            { id: "21", name: "Fatima Hassan",    title: "L&D Coordinator",     dept: "HR",          reports: 0 },
          ]
        },
      ]
    },
    {
      id: "4", name: "Marcus Williams", title: "Chief Revenue Officer", dept: "Sales", reports: 4,
      children: [
        {
          id: "11", name: "Aiden Foster",     title: "VP Sales",              dept: "Sales",       reports: 6,
          children: [
            { id: "22", name: "Sophie Clarke",    title: "Enterprise AE",       dept: "Sales",       reports: 0 },
            { id: "23", name: "Ethan Morris",     title: "Regional Sales Mgr",  dept: "Sales",       reports: 4 },
          ]
        },
        {
          id: "12", name: "Yasmin Okafor",    title: "Head of Marketing",     dept: "Marketing",   reports: 5,
          children: [
            { id: "24", name: "Ben Hughes",       title: "Brand Manager",       dept: "Marketing",   reports: 2 },
            { id: "25", name: "Anya Singh",       title: "Digital Marketing Mgr",dept: "Marketing",  reports: 3 },
          ]
        },
      ]
    },
    {
      id: "5", name: "Daniel Roberts", title: "Chief Financial Officer", dept: "Finance", reports: 3,
      children: [
        {
          id: "13", name: "Harriet Stone",    title: "Finance Director",      dept: "Finance",     reports: 4,
          children: [
            { id: "26", name: "Oliver Hughes",    title: "Financial Controller","dept": "Finance",   reports: 2 },
            { id: "27", name: "Niamh Kelly",      title: "Finance Analyst",     dept: "Finance",     reports: 0 },
          ]
        },
      ]
    },
    {
      id: "6", name: "Charlotte Davies", title: "Chief Operating Officer", dept: "Operations", reports: 3,
      children: [
        {
          id: "14", name: "Ryan Thompson",    title: "Operations Director",   dept: "Operations",  reports: 5,
          children: [
            { id: "28", name: "Katie Walsh",      title: "Operations Manager",  dept: "Operations",  reports: 3 },
            { id: "29", name: "Sam Okafor",       title: "Logistics Manager",   dept: "Operations",  reports: 2 },
          ]
        },
      ]
    },
  ]
}

const DEPT_COLORS: Record<string, string> = {
  Executive:   "var(--primary)",
  Engineering: "#8b5cf6",
  Product:     "#06b6d4",
  HR:          "#ec4899",
  Sales:       "#10b981",
  Marketing:   "#f59e0b",
  Finance:     "#3b82f6",
  Operations:  "#f97316",
}

const DEPTS = ["All Departments", "Engineering", "Product", "HR", "Sales", "Marketing", "Finance", "Operations", "Executive"]

function OrgCard({ node, depth }: { node: OrgNode; depth: number }) {
  const [expanded, setExpanded] = useState(depth < 2)
  const color = DEPT_COLORS[node.dept] || "var(--muted-foreground)"
  const hasChildren = node.children && node.children.length > 0

  return (
    <div className="flex flex-col items-center">
      {/* Card */}
      <div className="relative">
        <div
          className="rounded-xl border-2 bg-[var(--background)] p-3 w-44 shadow-sm hover:shadow-md transition-shadow cursor-default"
          style={{ borderColor: color }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Avatar className="h-8 w-8 shrink-0">
              <AvatarFallback className="text-xs font-semibold" style={{ background: `${color}20`, color }}>
                {getInitials(node.name)}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-[var(--foreground)] truncate">{node.name}</p>
              <p className="text-[10px] text-[var(--muted-foreground)] truncate">{node.title}</p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[10px] rounded-full px-1.5 py-0.5 font-medium" style={{ background: `${color}15`, color }}>
              {node.dept}
            </span>
            {node.reports > 0 && (
              <span className="text-[10px] text-[var(--muted-foreground)] flex items-center gap-0.5">
                <Users className="h-2.5 w-2.5" />{node.reports}
              </span>
            )}
          </div>
        </div>
        {/* Expand toggle */}
        {hasChildren && (
          <button
            onClick={() => setExpanded(e => !e)}
            className="absolute -bottom-3 left-1/2 -translate-x-1/2 z-10 h-6 w-6 rounded-full border border-[var(--border)] bg-[var(--background)] flex items-center justify-center hover:bg-[var(--muted)] transition-colors shadow-sm"
          >
            <ChevronDown className={cn("h-3 w-3 text-[var(--muted-foreground)] transition-transform", expanded && "rotate-180")} />
          </button>
        )}
      </div>

      {/* Children */}
      {hasChildren && expanded && (
        <div className="mt-6 flex flex-col items-center">
          {/* Vertical line down */}
          <div className="w-px h-4 bg-[var(--border)]" />
          <div className="flex items-start gap-6">
            {node.children!.map((child, i) => (
              <div key={child.id} className="flex flex-col items-center">
                {/* Horizontal connector */}
                <div className="relative flex flex-col items-center">
                  <div className="w-px h-4 bg-[var(--border)]" />
                </div>
                <OrgCard node={child} depth={depth + 1} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default function OrgChartPage() {
  const [zoom, setZoom] = useState(100)
  const [dept, setDept] = useState("All Departments")
  const [search, setSearch] = useState("")

  return (
    <div className="p-6 space-y-5 max-w-[1800px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-[var(--foreground)]">Org Chart</h1>
          <p className="text-sm text-[var(--muted-foreground)] mt-0.5">Organisation structure · 167 employees</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[var(--muted-foreground)]" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by name…"
              className="pl-8 pr-3 py-1.5 text-sm rounded-md border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] w-48 focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
            />
          </div>
          {/* Dept filter */}
          <div className="relative">
            <select
              value={dept}
              onChange={e => setDept(e.target.value)}
              className="appearance-none pl-3 pr-8 py-1.5 text-sm rounded-md border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
            >
              {DEPTS.map(d => <option key={d}>{d}</option>)}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[var(--muted-foreground)] pointer-events-none" />
          </div>
          {/* Zoom */}
          <div className="flex items-center gap-1 rounded-md border border-[var(--border)] bg-[var(--background)] px-1">
            <button onClick={() => setZoom(z => Math.max(50, z - 10))} className="p-1.5 hover:bg-[var(--muted)] rounded">
              <ZoomOut className="h-3.5 w-3.5 text-[var(--muted-foreground)]" />
            </button>
            <span className="text-xs text-[var(--muted-foreground)] w-10 text-center">{zoom}%</span>
            <button onClick={() => setZoom(z => Math.min(150, z + 10))} className="p-1.5 hover:bg-[var(--muted)] rounded">
              <ZoomIn className="h-3.5 w-3.5 text-[var(--muted-foreground)]" />
            </button>
          </div>
          <button className="inline-flex items-center gap-1.5 rounded-md border border-[var(--border)] px-3 py-1.5 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--muted)]">
            <Download className="h-4 w-4" />Export PNG
          </button>
        </div>
      </div>

      {/* Dept Legend */}
      <div className="flex items-center gap-3 flex-wrap">
        {Object.entries(DEPT_COLORS).map(([d, c]) => (
          <div key={d} className="flex items-center gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full" style={{ background: c }} />
            <span className="text-xs text-[var(--muted-foreground)]">{d}</span>
          </div>
        ))}
      </div>

      {/* Org Tree */}
      <div className="overflow-auto rounded-xl border border-[var(--border)] bg-[var(--muted)]/30 p-8">
        <div
          className="origin-top-left transition-transform"
          style={{ transform: `scale(${zoom / 100})`, transformOrigin: "top center", minWidth: 1400 }}
        >
          <div className="flex justify-center">
            <OrgCard node={orgTree} depth={0} />
          </div>
        </div>
      </div>
    </div>
  )
}
