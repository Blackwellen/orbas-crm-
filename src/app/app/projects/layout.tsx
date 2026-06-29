"use client"

import { AppSidebar } from "@/components/layout/app-sidebar"
import { useAppStore } from "@/store/app-store"
import {
  LayoutDashboard, FolderOpen, User, Clock,
  Server, Flag, BarChart2, Settings
} from "lucide-react"
import { cn } from "@/lib/utils"

const projectsItems = [
  { label: "Overview",       icon: LayoutDashboard, href: "/app/projects" },
  { label: "All Projects",   icon: FolderOpen,      href: "/app/projects/projects" },
  { label: "My Projects",    icon: User,            href: "/app/projects/my-projects" },
  { label: "Timesheets",     icon: Clock,           href: "/app/projects/timesheets" },
  { label: "Resource Plan",  icon: Server,          href: "/app/projects/resources" },
  { label: "Milestones",     icon: Flag,            href: "/app/projects/milestones" },
  { label: "Reports",        icon: BarChart2,       href: "/app/projects/reports" },
  { label: "Settings",       icon: Settings,        href: "/app/projects/settings" },
]

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  const collapsed = useAppStore(s => s.sidebarCollapsed)

  return (
    <div className="flex min-h-screen">
      <AppSidebar items={projectsItems} appName="Projects" appColor="#06b6d4" />
      <main className={cn("flex-1 transition-all duration-200 min-h-screen", collapsed ? "ml-16" : "ml-60")}>
        {children}
      </main>
    </div>
  )
}
