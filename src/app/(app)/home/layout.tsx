"use client"

import * as React from "react"
import {
  LayoutDashboard,
  Sun,
  ClipboardList,
  CheckCircle,
  CheckSquare,
  Inbox,
  Clock,
  Grid3x3,
  BarChart3,
  Sparkles,
} from "lucide-react"
import { AppSidebar } from "@/components/layout/app-sidebar"
import { useAppStore } from "@/store/app-store"
import { cn } from "@/lib/utils"

const HOME_SIDEBAR_ITEMS = [
  { label: "Overview", icon: LayoutDashboard, href: "/app/home" },
  { label: "My Day", icon: Sun, href: "/app/home/my-day" },
  { label: "Work Queue", icon: ClipboardList, href: "/app/home/work-queue", badge: 5 },
  { label: "Approvals", icon: CheckCircle, href: "/app/home/approvals", badge: 3 },
  { label: "Tasks", icon: CheckSquare, href: "/app/home/tasks" },
  { label: "Inbox", icon: Inbox, href: "/app/home/inbox", badge: 7 },
  { label: "Recently Viewed", icon: Clock, href: "/app/home/recent" },
  { label: "Apps", icon: Grid3x3, href: "/app/home/apps" },
  { label: "Reports", icon: BarChart3, href: "/app/home/reports" },
  { label: "AI Briefing", icon: Sparkles, href: "/app/home/ai-briefing" },
]

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  const collapsed = useAppStore((s) => s.sidebarCollapsed)

  return (
    <>
      <AppSidebar items={HOME_SIDEBAR_ITEMS} appName="Home" appColor="#1a56db" />
      <main
        className={cn(
          "min-h-[calc(100vh-56px)] transition-all duration-200",
          collapsed ? "md:ml-16" : "md:ml-60"
        )}
      >
        {children}
      </main>
    </>
  )
}
