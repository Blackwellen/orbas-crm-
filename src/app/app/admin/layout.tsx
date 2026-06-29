"use client"

import { AppSidebar } from "@/components/layout/app-sidebar"
import { useAppStore } from "@/store/app-store"
import {
  LayoutDashboard, Users, Settings, CreditCard, Plug, Key,
  ScrollText, Grid3x3, Package
} from "lucide-react"
import { cn } from "@/lib/utils"

const adminItems = [
  { label: "Overview",           icon: LayoutDashboard, href: "/app/admin" },
  { label: "Users & Roles",      icon: Users,           href: "/app/admin/users" },
  { label: "Workspace Settings", icon: Settings,        href: "/app/admin/workspace" },
  { label: "Billing",            icon: CreditCard,      href: "/app/admin/billing" },
  { label: "Integrations",       icon: Plug,            href: "/app/admin/integrations" },
  { label: "API Keys",           icon: Key,             href: "/app/admin/api-keys" },
  { label: "Audit Log",          icon: ScrollText,      href: "/app/admin/audit" },
  { label: "Apps & Features",    icon: Grid3x3,         href: "/app/admin/apps" },
  { label: "Add-Ons",            icon: Package,         href: "/app/admin/addons" },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const collapsed = useAppStore(s => s.sidebarCollapsed)

  return (
    <div className="flex min-h-screen">
      <AppSidebar items={adminItems} appName="Admin" appColor="#1a56db" />
      <main
        className={cn(
          "flex-1 transition-all duration-200 min-h-screen",
          collapsed ? "ml-16" : "ml-60"
        )}
      >
        {children}
      </main>
    </div>
  )
}
