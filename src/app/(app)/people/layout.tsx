"use client"

import { AppSidebar } from "@/components/layout/app-sidebar"
import { useAppStore } from "@/store/app-store"
import {
  LayoutDashboard, Users, UserCog, Network, Workflow, FileText,
  Wallet, CalendarClock, Banknote, HeartPulse,
  BriefcaseBusiness, Target, GraduationCap, HeartHandshake,
  BarChart3, Settings, CalendarDays, UserMinus, Users2
} from "lucide-react"
import { cn } from "@/lib/utils"

const peopleItems = [
  { label: "Overview",      icon: LayoutDashboard,  href: "/app/people" },
  { label: "Directory",     icon: Users,            href: "/app/people/directory" },
  { label: "Employees",     icon: UserCog,          href: "/app/people/employees" },
  { label: "Org Chart",     icon: Network,          href: "/app/people/org-chart" },
  { label: "Lifecycle",     icon: Workflow,         href: "/app/people/lifecycle" },
  { label: "Leave",         icon: CalendarDays,     href: "/app/people/leave" },
  { label: "Shifts",        icon: CalendarClock,    href: "/app/people/shifts" },
  { label: "Payroll",       icon: Banknote,         href: "/app/people/payroll" },
  { label: "Compensation",  icon: Wallet,           href: "/app/people/compensation" },
  { label: "Benefits",      icon: HeartPulse,       href: "/app/people/benefits" },
  { label: "Hiring (ATS)",  icon: BriefcaseBusiness,href: "/app/people/hiring" },
  { label: "Performance",   icon: Target,           href: "/app/people/performance" },
  { label: "Learning",      icon: GraduationCap,    href: "/app/people/learning" },
  { label: "Engagement",    icon: HeartHandshake,   href: "/app/people/engagement" },
  { label: "Absence",       icon: UserMinus,        href: "/app/people/absence" },
  { label: "Workforce",     icon: Users2,           href: "/app/people/workforce-planning" },
  { label: "Records",       icon: FileText,         href: "/app/people/records" },
  { label: "Reports",       icon: BarChart3,        href: "/app/people/reports" },
  { label: "Settings",      icon: Settings,         href: "/app/people/settings" },
]

export default function PeopleLayout({ children }: { children: React.ReactNode }) {
  const collapsed = useAppStore(s => s.sidebarCollapsed)

  return (
    <div className="flex min-h-screen">
      <AppSidebar items={peopleItems} appName="People" />
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
