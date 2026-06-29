"use client"

import { AppSidebar } from "@/components/layout/app-sidebar"
import { useAppStore } from "@/store/app-store"
import {
  LayoutDashboard, Wrench, Database, TrendingUp,
  Calendar, Download, Settings
} from "lucide-react"
import { cn } from "@/lib/utils"

const analyticsItems = [
  { label: "Overview",          icon: LayoutDashboard, href: "/app/analytics" },
  { label: "Dashboards",        icon: LayoutDashboard, href: "/app/analytics/dashboards" },
  { label: "Report Builder",    icon: Wrench,          href: "/app/analytics/builder" },
  { label: "Datasets",          icon: Database,        href: "/app/analytics/datasets" },
  { label: "Metrics",           icon: TrendingUp,      href: "/app/analytics/metrics" },
  { label: "MRR / ARR",         icon: TrendingUp,      href: "/app/analytics/mrr" },
  { label: "Scheduled Reports", icon: Calendar,        href: "/app/analytics/scheduled" },
  { label: "Exports",           icon: Download,        href: "/app/analytics/exports" },
  { label: "Settings",          icon: Settings,        href: "/app/analytics/settings" },
]

export default function AnalyticsLayout({ children }: { children: React.ReactNode }) {
  const collapsed = useAppStore(s => s.sidebarCollapsed)
  return (
    <div className="flex min-h-screen">
      <AppSidebar items={analyticsItems} appName="Analytics" />
      <main className={cn("flex-1 transition-all duration-200 min-h-screen", collapsed ? "ml-16" : "ml-60")}>
        {children}
      </main>
    </div>
  )
}
