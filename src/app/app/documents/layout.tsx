"use client"

import { AppSidebar } from "@/components/layout/app-sidebar"
import { useAppStore } from "@/store/app-store"
import {
  FileText, Users, LayoutTemplate, PenTool, Trash2, Settings, ScrollText
} from "lucide-react"
import { cn } from "@/lib/utils"

const documentsItems = [
  { label: "My Documents",   icon: FileText,       href: "/app/documents" },
  { label: "Shared With Me", icon: Users,          href: "/app/documents/shared" },
  { label: "Templates",      icon: LayoutTemplate, href: "/app/documents/templates" },
  { label: "E-Signatures",   icon: PenTool,        href: "/app/documents/signatures" },
  { label: "Contracts",      icon: ScrollText,     href: "/app/documents/contracts" },
  { label: "Trash",          icon: Trash2,         href: "/app/documents/trash" },
  { label: "Settings",       icon: Settings,       href: "/app/documents/settings" },
]

export default function DocumentsLayout({ children }: { children: React.ReactNode }) {
  const collapsed = useAppStore(s => s.sidebarCollapsed)

  return (
    <div className="flex min-h-screen">
      <AppSidebar items={documentsItems} appName="Documents" />
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
