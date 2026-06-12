"use client"

import { AppSidebar } from "@/components/layout/app-sidebar"
import { useAppStore } from "@/store/app-store"
import {
  LayoutDashboard, Package2, FileCheck2, Truck,
  Warehouse, Ship, Cog, Wrench, ClipboardList,
  RotateCcw, ShieldCheck, Boxes, BarChart2, Settings
} from "lucide-react"
import { cn } from "@/lib/utils"

const operationsItems = [
  { label: "Overview",         icon: LayoutDashboard, href: "/app/operations" },
  { label: "Inventory",        icon: Package2,        href: "/app/operations/inventory" },
  { label: "Purchase Orders",  icon: FileCheck2,      href: "/app/operations/purchase-orders", badge: 47 },
  { label: "Suppliers",        icon: Truck,           href: "/app/operations/suppliers" },
  { label: "Warehouses",       icon: Warehouse,       href: "/app/operations/warehouses" },
  { label: "Shipments",        icon: Ship,            href: "/app/operations/shipments" },
  { label: "Manufacturing",    icon: Cog,             href: "/app/operations/manufacturing" },
  { label: "Work Orders",      icon: ClipboardList,   href: "/app/operations/work-orders" },
  { label: "Field Service",    icon: Wrench,          href: "/app/operations/field-service" },
  { label: "Returns",          icon: RotateCcw,       href: "/app/operations/returns" },
  { label: "Quality",          icon: ShieldCheck,     href: "/app/operations/quality" },
  { label: "Assets",           icon: Boxes,           href: "/app/operations/assets" },
  { label: "Reports",          icon: BarChart2,       href: "/app/operations/reports" },
  { label: "Settings",         icon: Settings,        href: "/app/operations/settings" },
]

export default function OperationsLayout({ children }: { children: React.ReactNode }) {
  const collapsed = useAppStore(s => s.sidebarCollapsed)

  return (
    <div className="flex min-h-screen">
      <AppSidebar items={operationsItems} appName="Operations" appColor="#1a56db" />
      <main className={cn("flex-1 transition-all duration-200 min-h-screen", collapsed ? "ml-16" : "ml-60")}>
        {children}
      </main>
    </div>
  )
}
