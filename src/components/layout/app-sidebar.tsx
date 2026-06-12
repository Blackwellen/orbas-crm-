"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronLeft, ChevronRight, type LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAppStore } from "@/store/app-store"
import { Badge } from "@/components/ui/badge"

export interface SidebarItem {
  label: string
  icon: LucideIcon
  href: string
  badge?: number | string
  children?: SidebarItem[]
}

interface AppSidebarProps {
  items: SidebarItem[]
  appName?: string
  appColor?: string
}

export function AppSidebar({ items, appName, appColor = "#1a56db" }: AppSidebarProps) {
  const pathname = usePathname()
  const collapsed = useAppStore(s => s.sidebarCollapsed)
  const toggleSidebar = useAppStore(s => s.toggleSidebar)
  const [expandedGroups, setExpandedGroups] = React.useState<Set<string>>(new Set())

  function isActive(href: string) {
    return pathname === href || pathname.startsWith(href + "/")
  }

  function toggleGroup(label: string) {
    setExpandedGroups(prev => {
      const next = new Set(prev)
      next.has(label) ? next.delete(label) : next.add(label)
      return next
    })
  }

  return (
    <aside
      className={cn(
        "fixed left-0 top-14 bottom-0 z-40 flex flex-col transition-all duration-200 sidebar-transition",
        "hidden md:flex"
      )}
      style={{
        width: collapsed ? 64 : 240,
        background: "var(--sidebar-bg)",
        borderRight: "1px solid var(--sidebar-border)",
      }}
    >
      {/* Scrollable nav */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden py-2 px-1.5">
        {items.map(item => {
          const active = isActive(item.href)
          const hasChildren = item.children && item.children.length > 0
          const expanded = expandedGroups.has(item.label)

          return (
            <React.Fragment key={item.label}>
              {hasChildren ? (
                <button
                  onClick={() => toggleGroup(item.label)}
                  className={cn(
                    "w-full flex items-center gap-2.5 rounded-md px-2 py-2 text-sm transition-colors mb-0.5",
                    "text-[var(--sidebar-fg)] hover:bg-[var(--sidebar-hover)]"
                  )}
                  title={collapsed ? item.label : undefined}
                >
                  <item.icon className="h-4 w-4 shrink-0" />
                  {!collapsed && (
                    <>
                      <span className="flex-1 truncate text-left">{item.label}</span>
                      <ChevronRight className={cn("h-3.5 w-3.5 shrink-0 transition-transform", expanded && "rotate-90")} />
                    </>
                  )}
                </button>
              ) : (
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2.5 rounded-md px-2 py-2 text-sm transition-colors mb-0.5",
                    active
                      ? "bg-[var(--sidebar-active)] text-[var(--sidebar-active-fg)] font-medium"
                      : "text-[var(--sidebar-fg)] hover:bg-[var(--sidebar-hover)]"
                  )}
                  title={collapsed ? item.label : undefined}
                >
                  <item.icon className="h-4 w-4 shrink-0" />
                  {!collapsed && (
                    <>
                      <span className="flex-1 truncate">{item.label}</span>
                      {item.badge !== undefined && (
                        <span className={cn(
                          "flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[10px] font-semibold",
                          active ? "bg-white/20 text-white" : "bg-[var(--primary)]/20 text-[var(--primary)]"
                        )}>
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </Link>
              )}

              {/* Children */}
              {hasChildren && expanded && !collapsed && item.children?.map(child => {
                const childActive = isActive(child.href)
                return (
                  <Link
                    key={child.label}
                    href={child.href}
                    className={cn(
                      "flex items-center gap-2.5 rounded-md pl-8 pr-2 py-1.5 text-sm transition-colors mb-0.5",
                      childActive
                        ? "bg-[var(--sidebar-active)] text-[var(--sidebar-active-fg)] font-medium"
                        : "text-[var(--sidebar-fg)] hover:bg-[var(--sidebar-hover)]"
                    )}
                  >
                    <child.icon className="h-3.5 w-3.5 shrink-0" />
                    <span className="flex-1 truncate">{child.label}</span>
                  </Link>
                )
              })}
            </React.Fragment>
          )
        })}
      </nav>

      {/* Collapse toggle */}
      <div className="border-t border-[var(--sidebar-border)] p-1.5">
        <button
          onClick={toggleSidebar}
          className="w-full flex items-center justify-center gap-2 rounded-md px-2 py-2 text-sm text-[var(--sidebar-fg)] hover:bg-[var(--sidebar-hover)] transition-colors"
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <><ChevronLeft className="h-4 w-4" /><span className="text-xs">Collapse</span></>}
        </button>
      </div>
    </aside>
  )
}
