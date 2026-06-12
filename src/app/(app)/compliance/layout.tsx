"use client"
import { AppSidebar } from "@/components/layout/app-sidebar"
import { useAppStore } from "@/store/app-store"
import { Shield, AlertTriangle, CheckSquare, FileText, ClipboardList, AlertCircle, BookOpen, BarChart2, Settings, Leaf } from "lucide-react"
import { cn } from "@/lib/utils"
const items = [
  { label: "Overview", icon: Shield, href: "/app/compliance" },
  { label: "Risk Register", icon: AlertTriangle, href: "/app/compliance/risks" },
  { label: "Controls", icon: CheckSquare, href: "/app/compliance/controls" },
  { label: "Policies", icon: FileText, href: "/app/compliance/policies" },
  { label: "Audits", icon: ClipboardList, href: "/app/compliance/audits" },
  { label: "Incidents", icon: AlertCircle, href: "/app/compliance/incidents" },
  { label: "Training", icon: BookOpen, href: "/app/compliance/training" },
  { label: "Reports", icon: BarChart2, href: "/app/compliance/reports" },
  { label: "ESG", icon: Leaf, href: "/app/compliance/esg" },
  { label: "Settings", icon: Settings, href: "/app/compliance/settings" },
]
export default function ComplianceLayout({ children }: { children: React.ReactNode }) {
  const collapsed = useAppStore(s => s.sidebarCollapsed)
  return (
    <div className="flex min-h-screen">
      <AppSidebar items={items} appName="Compliance" appColor="#16a34a" />
      <main className={cn("flex-1 transition-all duration-200 min-h-screen", collapsed ? "ml-16" : "ml-60")}>{children}</main>
    </div>
  )
}
