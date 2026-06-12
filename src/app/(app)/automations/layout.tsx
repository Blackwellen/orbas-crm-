"use client"
import { AppSidebar } from "@/components/layout/app-sidebar"
import { useAppStore } from "@/store/app-store"
import { Zap, GitBranch, Play, Clock, Copy, Settings } from "lucide-react"
import { cn } from "@/lib/utils"
const items = [
  { label: "Overview", icon: Zap, href: "/app/automations" },
  { label: "Workflows", icon: GitBranch, href: "/app/automations/workflows" },
  { label: "Triggers", icon: Play, href: "/app/automations/triggers" },
  { label: "Run History", icon: Clock, href: "/app/automations/runs" },
  { label: "Templates", icon: Copy, href: "/app/automations/templates" },
  { label: "Settings", icon: Settings, href: "/app/automations/settings" },
]
export default function AutomationsLayout({ children }: { children: React.ReactNode }) {
  const collapsed = useAppStore(s => s.sidebarCollapsed)
  return (
    <div className="flex min-h-screen">
      <AppSidebar items={items} appName="Automations" appColor="#f59e0b" />
      <main className={cn("flex-1 transition-all duration-200 min-h-screen", collapsed ? "ml-16" : "ml-60")}>{children}</main>
    </div>
  )
}
