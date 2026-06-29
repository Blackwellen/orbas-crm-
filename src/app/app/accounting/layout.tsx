"use client"

import { AppSidebar } from "@/components/layout/app-sidebar"
import { useAppStore } from "@/store/app-store"
import {
  LayoutDashboard, BookOpen, BookMarked, FilePen, FileCheck,
  Receipt, UserCheck, Users2, CreditCard, Landmark,
  ArrowLeftRight, Percent, PiggyBank, Boxes,
  CalendarCheck, BarChart2, Settings, FileSymlink, Building2, Globe
} from "lucide-react"
import { cn } from "@/lib/utils"

const accountingItems = [
  { label: "Overview",          icon: LayoutDashboard, href: "/app/accounting" },
  { label: "Chart of Accounts", icon: BookOpen,        href: "/app/accounting/chart-of-accounts" },
  { label: "General Ledger",    icon: BookMarked,      href: "/app/accounting/general-ledger" },
  { label: "Journal Entries",   icon: FilePen,         href: "/app/accounting/journal-entries" },
  { label: "Sales Invoices",    icon: FileCheck,       href: "/app/accounting/invoices" },
  { label: "Purchase Bills",    icon: Receipt,         href: "/app/accounting/bills" },
  { label: "Customers",         icon: UserCheck,       href: "/app/accounting/customers" },
  { label: "Suppliers",         icon: Users2,          href: "/app/accounting/suppliers" },
  { label: "Payments",          icon: CreditCard,      href: "/app/accounting/payments" },
  { label: "Banking",           icon: Landmark,        href: "/app/accounting/banking" },
  { label: "Reconciliation",    icon: ArrowLeftRight,  href: "/app/accounting/reconciliation" },
  { label: "Expenses",          icon: Receipt,         href: "/app/accounting/expenses" },
  { label: "Tax / VAT",         icon: Percent,         href: "/app/accounting/tax" },
  { label: "Budgets",           icon: PiggyBank,       href: "/app/accounting/budgets" },
  { label: "Fixed Assets",      icon: Boxes,           href: "/app/accounting/assets" },
  { label: "Period Close",      icon: CalendarCheck,   href: "/app/accounting/periods" },
  { label: "Reports",           icon: BarChart2,       href: "/app/accounting/reports" },
  { label: "MTD / HMRC",        icon: FileSymlink,     href: "/app/accounting/mtd" },
  { label: "Entities",          icon: Building2,       href: "/app/accounting/entities" },
  { label: "Currencies",        icon: Globe,           href: "/app/accounting/currencies" },
  { label: "Settings",          icon: Settings,        href: "/app/accounting/settings" },
]

export default function AccountingLayout({ children }: { children: React.ReactNode }) {
  const collapsed = useAppStore(s => s.sidebarCollapsed)

  return (
    <div className="flex min-h-screen">
      <AppSidebar items={accountingItems} appName="Accounting" appColor="#1a56db" />
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
