"use client"

import * as React from "react"
import Link from "next/link"
import {
  Home, Users, Calculator, Package, FolderKanban, Wrench,
  UserCircle, Headphones, MessageSquare, BarChart3, FileText,
  Shield, Heart, ExternalLink, Settings2, Terminal, Zap,
  Search, X
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

const APPS = [
  { id: "home", name: "Home", icon: Home, color: "#1a56db", route: "/app/home", desc: "Cockpit & overview", category: "Core" },
  { id: "crm", name: "CRM", icon: Users, color: "#7c3aed", route: "/app/crm", desc: "Sales & pipeline", category: "Revenue" },
  { id: "accounting", name: "Accounting", icon: Calculator, color: "#059669", route: "/app/accounting", desc: "Books & finance", category: "Finance" },
  { id: "operations", name: "Operations", icon: Package, color: "#ea580c", route: "/app/operations", desc: "Inventory & supply chain", category: "Operations" },
  { id: "projects", name: "Projects", icon: FolderKanban, color: "#0891b2", route: "/app/projects", desc: "PSA & delivery", category: "Operations" },
  { id: "field-service", name: "Field Service", icon: Wrench, color: "#dc2626", route: "/app/field-service", desc: "Dispatch & jobs", category: "Operations" },
  { id: "people", name: "People", icon: UserCircle, color: "#d97706", route: "/app/people", desc: "HR & payroll", category: "People" },
  { id: "service", name: "Service", icon: Headphones, color: "#2563eb", route: "/app/service", desc: "Helpdesk & tickets", category: "Service" },
  { id: "connect", name: "Connect", icon: MessageSquare, color: "#7c3aed", route: "/app/connect", desc: "Chat & inbox", category: "Service" },
  { id: "analytics", name: "Analytics", icon: BarChart3, color: "#0891b2", route: "/app/analytics", desc: "BI & reports", category: "Intelligence" },
  { id: "documents", name: "Documents", icon: FileText, color: "#64748b", route: "/app/documents", desc: "DMS & e-sign", category: "Intelligence" },
  { id: "compliance", name: "Compliance", icon: Shield, color: "#16a34a", route: "/app/compliance", desc: "Risk & audit", category: "Intelligence" },
  { id: "charity", name: "Charity", icon: Heart, color: "#e11d48", route: "/app/charity", desc: "Donors & grants", category: "Core" },
  { id: "automations", name: "Automations", icon: Zap, color: "#f59e0b", route: "/app/automations", desc: "Workflows & triggers", category: "Intelligence" },
  { id: "portal", name: "Client Portal", icon: ExternalLink, color: "#0284c7", route: "/portal", desc: "External access", category: "Service" },
  { id: "admin", name: "Admin Console", icon: Settings2, color: "#475569", route: "/app/admin", desc: "Workspace admin", category: "Admin" },
  { id: "platform-admin", name: "Platform Admin", icon: Terminal, color: "#0f172a", route: "/platform-admin", desc: "Orbas operator", category: "Admin" },
]

interface AppLauncherPopoverProps {
  children: React.ReactNode
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AppLauncherPopover({ children, open, onOpenChange }: AppLauncherPopoverProps) {
  const [search, setSearch] = React.useState("")

  const filtered = APPS.filter(
    app =>
      app.name.toLowerCase().includes(search.toLowerCase()) ||
      app.desc.toLowerCase().includes(search.toLowerCase()) ||
      app.category.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        align="start"
        sideOffset={8}
        className="w-[520px] p-0 border border-[var(--border)] shadow-2xl rounded-xl overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center gap-2 border-b border-[var(--border)] px-3 py-2">
          <Search className="h-4 w-4 text-[var(--muted-foreground)] shrink-0" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search apps..."
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-[var(--muted-foreground)]"
            autoFocus
          />
          {search && (
            <button onClick={() => setSearch("")} className="text-[var(--muted-foreground)] hover:text-[var(--foreground)]">
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* App grid */}
        <div className="p-3 max-h-[420px] overflow-y-auto">
          {filtered.length === 0 ? (
            <p className="text-center text-sm text-[var(--muted-foreground)] py-8">No apps found</p>
          ) : (
            <div className="grid grid-cols-4 gap-1.5">
              {filtered.map(app => (
                <Link
                  key={app.id}
                  href={app.route}
                  onClick={() => onOpenChange(false)}
                  className="flex flex-col items-center gap-1.5 rounded-lg p-2.5 hover:bg-[var(--secondary)] transition-colors group text-center"
                >
                  <div
                    className="h-10 w-10 rounded-xl flex items-center justify-center shadow-sm"
                    style={{ background: app.color + "18", border: `1px solid ${app.color}30` }}
                  >
                    <app.icon className="h-5 w-5" style={{ color: app.color }} />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-[var(--foreground)] leading-tight">{app.name}</p>
                    <p className="text-[10px] text-[var(--muted-foreground)] leading-tight mt-0.5 hidden group-hover:block">{app.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-[var(--border)] px-3 py-2 flex items-center justify-between">
          <span className="text-xs text-[var(--muted-foreground)]">{filtered.length} apps</span>
          <Link
            href="/app/settings/workspace/apps"
            onClick={() => onOpenChange(false)}
            className="text-xs text-[var(--primary)] hover:underline"
          >
            Manage apps →
          </Link>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export { APPS }
