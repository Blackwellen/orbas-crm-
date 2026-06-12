"use client"

import { AppSidebar } from "@/components/layout/app-sidebar"
import { useAppStore } from "@/store/app-store"
import {
  Inbox, Hash, MessageSquare, MessageCircle, Globe,
  Mail, GitBranch, BarChart2, Settings
} from "lucide-react"
import { cn } from "@/lib/utils"

const connectItems = [
  { label: "Inbox",           icon: Inbox,          href: "/app/connect" },
  { label: "Channels",        icon: Hash,           href: "/app/connect/channels" },
  { label: "Direct Messages", icon: MessageSquare,  href: "/app/connect/dms" },
  { label: "Live Chat",       icon: MessageCircle,  href: "/app/connect/live-chat" },
  { label: "Social",          icon: Globe,          href: "/app/connect/social" },
  { label: "Email",           icon: Mail,           href: "/app/connect/email" },
  { label: "Routing",         icon: GitBranch,      href: "/app/connect/routing" },
  { label: "Reports",         icon: BarChart2,      href: "/app/connect/reports" },
  { label: "Settings",        icon: Settings,       href: "/app/connect/settings" },
]

export default function ConnectLayout({ children }: { children: React.ReactNode }) {
  const collapsed = useAppStore(s => s.sidebarCollapsed)

  return (
    <div className="flex min-h-screen">
      <AppSidebar items={connectItems} appName="Connect" />
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
