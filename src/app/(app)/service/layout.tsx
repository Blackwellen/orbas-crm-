"use client"

import { AppSidebar } from "@/components/layout/app-sidebar"
import { useAppStore } from "@/store/app-store"
import {
  LayoutDashboard, Ticket, User, Layers, BookOpen,
  Clock, AlertTriangle, BarChart3, Settings
} from "lucide-react"
import { cn } from "@/lib/utils"

const serviceItems = [
  { label: "Overview",       icon: LayoutDashboard, href: "/app/service" },
  { label: "Tickets",        icon: Ticket,          href: "/app/service/tickets",       badge: 84 },
  { label: "My Tickets",     icon: User,            href: "/app/service/my-tickets",    badge: 12 },
  { label: "Queues",         icon: Layers,          href: "/app/service/queues" },
  { label: "Knowledge Base", icon: BookOpen,        href: "/app/service/knowledge-base" },
  { label: "SLA Policies",   icon: Clock,           href: "/app/service/sla" },
  { label: "Escalations",    icon: AlertTriangle,   href: "/app/service/escalations" },
  { label: "Reports",        icon: BarChart3,       href: "/app/service/reports" },
  { label: "Settings",       icon: Settings,        href: "/app/service/settings" },
]

export default function ServiceLayout({ children }: { children: React.ReactNode }) {
  const collapsed = useAppStore(s => s.sidebarCollapsed)

  return (
    <div className="flex min-h-screen">
      <AppSidebar items={serviceItems} appName="Service" />
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
