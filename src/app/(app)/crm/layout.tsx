"use client"

import { AppSidebar } from "@/components/layout/app-sidebar"
import { useAppStore } from "@/store/app-store"
import {
  LayoutDashboard, UserPlus, Users, Building2, TrendingUp,
  KanbanSquare, Activity, Calendar, FileText, Megaphone,
  Filter, FormInput, Tag, BarChart3, Map, PieChart, Settings,
  Mail, BarChart2, RefreshCw, Handshake
} from "lucide-react"
import { cn } from "@/lib/utils"

const crmItems = [
  { label: "Overview",     icon: LayoutDashboard, href: "/app/crm" },
  { label: "Leads",        icon: UserPlus,        href: "/app/crm/leads",       badge: 247 },
  { label: "Contacts",     icon: Users,           href: "/app/crm/contacts" },
  { label: "Accounts",     icon: Building2,       href: "/app/crm/accounts" },
  { label: "Deals",        icon: TrendingUp,      href: "/app/crm/deals" },
  { label: "Pipeline",     icon: KanbanSquare,    href: "/app/crm/pipeline" },
  { label: "Activities",   icon: Activity,        href: "/app/crm/activities" },
  { label: "Calendar",     icon: Calendar,        href: "/app/crm/calendar" },
  { label: "Quotes",       icon: FileText,        href: "/app/crm/quotes" },
  { label: "Campaigns",    icon: Megaphone,       href: "/app/crm/campaigns" },
  { label: "Sequences",    icon: Mail,            href: "/app/crm/sequences" },
  { label: "Segments",     icon: Filter,          href: "/app/crm/segments" },
  { label: "Forms",        icon: FormInput,       href: "/app/crm/forms" },
  { label: "Products",     icon: Tag,             href: "/app/crm/products" },
  { label: "Forecasting",  icon: BarChart2,       href: "/app/crm/forecasting" },
  { label: "Territories",  icon: Map,             href: "/app/crm/territories" },
  { label: "Proposals",    icon: FileText,        href: "/app/crm/proposals" },
  { label: "Subscriptions",icon: RefreshCw,       href: "/app/crm/subscriptions" },
  { label: "Partners",     icon: Handshake,       href: "/app/crm/partners" },
  { label: "Reports",      icon: PieChart,        href: "/app/crm/reports" },
  { label: "Settings",     icon: Settings,        href: "/app/crm/settings" },
]

export default function CrmLayout({ children }: { children: React.ReactNode }) {
  const collapsed = useAppStore(s => s.sidebarCollapsed)

  return (
    <div className="flex min-h-screen">
      <AppSidebar items={crmItems} appName="CRM" />
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
