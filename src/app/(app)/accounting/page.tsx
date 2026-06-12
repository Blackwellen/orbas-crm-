"use client"

import Link from "next/link"
import {
  TrendingUp, TrendingDown, AlertCircle, CreditCard, Clock, Plus, FileText,
  Receipt, ArrowLeftRight, ChevronRight, Landmark, BarChart3, CalendarCheck,
  ShieldCheck, AlertTriangle, CheckCircle2, XCircle, FileEdit, RefreshCcw,
  Download, ArrowUpRight, ArrowDownRight
} from "lucide-react"
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell
} from "recharts"

/* â”€â”€â”€ mock data â”€â”€â”€ */
const KPI_TOP = [
  {
    label: "Cash Balance",
    value: "Â£156,740",
    sub: "Across 3 bank accounts",
    change: "+Â£12,300 this month",
    up: true,
    icon: Landmark,
    accent: "#1a56db",
    href: "/app/accounting/banking",
  },
  {
    label: "Receivables Due",
    value: "Â£47,140",
    sub: "12 open invoices",
    change: "Â£9,420 overdue",
    up: null,
    icon: TrendingUp,
    accent: "#0891b2",
    href: "/app/accounting/receivables",
  },
  {
    label: "Payables Due",
    value: "Â£31,880",
    sub: "7 unpaid bills",
    change: "Â£4,200 overdue",
    up: null,
    icon: TrendingDown,
    accent: "#7c3aed",
    href: "/app/accounting/payables",
  },
  {
    label: "Monthly Revenue",
    value: "Â£67,200",
    sub: "June 2026 invoiced",
    change: "+14.2% vs May",
    up: true,
    icon: ArrowUpRight,
    accent: "#059669",
    href: "/app/accounting/invoices",
  },
  {
    label: "Monthly Expenses",
    value: "Â£43,100",
    sub: "June 2026 bills/costs",
    change: "+5.1% vs May",
    up: false,
    icon: ArrowDownRight,
    accent: "#dc2626",
    href: "/app/accounting/bills",
  },
  {
    label: "Gross Profit",
    value: "Â£24,100",
    sub: "Revenue minus COGS",
    change: "35.9% margin",
    up: true,
    icon: BarChart3,
    accent: "#d97706",
    href: "/app/accounting/reports/profit-loss",
  },
  {
    label: "Net Profit",
    value: "Â£18,740",
    sub: "After all expenses",
    change: "27.9% margin",
    up: true,
    icon: TrendingUp,
    accent: "#1a56db",
    href: "/app/accounting/reports/profit-loss",
  },
  {
    label: "VAT / Tax Due",
    value: "Â£8,960",
    sub: "Q2 2026 return",
    change: "Due 31 Jul 2026",
    up: null,
    icon: AlertCircle,
    accent: "#d97706",
    href: "/app/accounting/vat-returns",
  },
]

const CASHFLOW_DATA = [
  { month: "Jan", income: 42000, expenses: 31000 },
  { month: "Feb", income: 48000, expenses: 29000 },
  { month: "Mar", income: 38000, expenses: 35000 },
  { month: "Apr", income: 61000, expenses: 40000 },
  { month: "May", income: 54000, expenses: 37000 },
  { month: "Jun", income: 67000, expenses: 43000 },
]

const PNL_DATA = [
  { month: "Jan", gross: 11000, net: 8200 },
  { month: "Feb", gross: 19000, net: 14100 },
  { month: "Mar", gross: 3000, net: 1800 },
  { month: "Apr", gross: 21000, net: 17200 },
  { month: "May", gross: 17000, net: 12900 },
  { month: "Jun", gross: 24100, net: 18740 },
]

const AR_AGEING = [
  { label: "Current", amount: 24320, count: 6, color: "#1a56db" },
  { label: "1â€“30 days", amount: 13400, count: 4, color: "#d97706" },
  { label: "31â€“60 days", amount: 6820, count: 1, color: "#ea580c" },
  { label: "60+ days", amount: 2600, count: 1, color: "#dc2626" },
]

const AP_AGEING = [
  { label: "Current", amount: 18800, count: 4, color: "#1a56db" },
  { label: "1â€“30 days", amount: 8880, count: 2, color: "#d97706" },
  { label: "31â€“60 days", amount: 4200, count: 1, color: "#dc2626" },
  { label: "60+ days", amount: 0, count: 0, color: "#94a3b8" },
]

const RECENT_INVOICES = [
  { id: "INV-2026-0142", customer: "Meridian Tech Ltd",    due: "18 Jun", total: "Â£4,200.00", status: "Overdue" },
  { id: "INV-2026-0141", customer: "Holloway & Partners",  due: "17 Jun", total: "Â£1,850.00", status: "Sent" },
  { id: "INV-2026-0140", customer: "Blackwell Consulting", due: "16 Jun", total: "Â£7,650.00", status: "Paid" },
  { id: "INV-2026-0139", customer: "Stratford Solutions",  due: "15 Jun", total: "Â£2,300.00", status: "Partial" },
  { id: "INV-2026-0138", customer: "Thames Digital",       due: "14 Jun", total: "Â£5,100.00", status: "Overdue" },
  { id: "INV-2026-0137", customer: "Kensington AI Ltd",    due: "13 Jun", total: "Â£3,400.00", status: "Paid" },
]

const RECENT_BILLS = [
  { id: "BILL-0089", supplier: "AWS (Amazon)",       due: "20 Jun", total: "Â£2,140.00", status: "Due" },
  { id: "BILL-0088", supplier: "Office Space Co",    due: "01 Jul", total: "Â£3,200.00", status: "Scheduled" },
  { id: "BILL-0087", supplier: "SaaS Subscriptions", due: "10 Jun", total: "Â£860.00",   status: "Overdue" },
  { id: "BILL-0086", supplier: "Freelance â€” J. Park",due: "08 Jun", total: "Â£1,400.00", status: "Paid" },
]

const STATUS_MAP: Record<string, string> = {
  Draft:     "bg-[var(--muted)] text-[var(--muted-foreground)]",
  Sent:      "bg-[#1a56db]/10 text-[#1a56db]",
  Paid:      "bg-[#059669]/10 text-[#059669]",
  Partial:   "bg-[#d97706]/10 text-[#d97706]",
  Overdue:   "bg-[#dc2626]/10 text-[#dc2626]",
  Void:      "bg-[var(--muted)] text-[var(--muted-foreground)]",
  Due:       "bg-[#d97706]/10 text-[#d97706]",
  Scheduled: "bg-[#1a56db]/10 text-[#1a56db]",
}

const STATUS_ICONS: Record<string, React.ElementType> = {
  Paid: CheckCircle2,
  Overdue: XCircle,
  Partial: AlertTriangle,
  Sent: Clock,
  Due: Clock,
  Void: XCircle,
  Draft: FileText,
  Scheduled: Clock,
}

const PERIOD_STATUS = {
  period: "June 2026",
  bankRec: { status: "Partial", detail: "2 accounts unreconciled" },
  unreconciled: 14,
  vatFiled: false,
  depreciation: true,
  periodLocked: false,
}

const QUICK_ACTIONS = [
  { label: "New Sales Invoice",    icon: FileText,      href: "/app/accounting/invoices/new",      accent: "#1a56db" },
  { label: "New Purchase Invoice", icon: Receipt,       href: "/app/accounting/bills/new",         accent: "#7c3aed" },
  { label: "New Journal Entry",    icon: FileEdit,      href: "/app/accounting/journal-entries/new",accent: "#0891b2" },
  { label: "Record Payment",       icon: CreditCard,    href: "/app/accounting/payments",          accent: "#059669" },
  { label: "Reconcile Bank",       icon: ArrowLeftRight,href: "/app/accounting/reconciliation",     accent: "#d97706" },
  { label: "Upload Bank Statement",icon: Download,      href: "/app/accounting/banking",           accent: "#64748b" },
  { label: "Run P&L Report",       icon: BarChart3,     href: "/app/accounting/reports/profit-loss",accent: "#1a56db" },
  { label: "Balance Sheet",        icon: RefreshCcw,    href: "/app/accounting/reports/balance-sheet",accent: "#7c3aed" },
]

export default function AccountingOverviewPage() {
  const total_ar = AR_AGEING.reduce((s, b) => s + b.amount, 0)
  const total_ap = AP_AGEING.reduce((s, b) => s + b.amount, 0)

  return (
    <div className="p-6 space-y-6 max-w-screen-2xl mx-auto">

      {/* â”€â”€ Header â”€â”€ */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-[var(--foreground)]">Accounting</h1>
          <p className="text-sm text-[var(--muted-foreground)] mt-0.5">
            Financial overview Â· June 2026 Â· GBP base currency
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Link href="/app/accounting/reports" className="inline-flex items-center gap-1.5 rounded-md border border-[var(--border)] px-3 py-1.5 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--secondary)] transition-colors">
            <BarChart3 className="h-3.5 w-3.5" />Reports
          </Link>
          <Link href="/app/accounting/invoices/new" className="inline-flex items-center gap-1.5 rounded-md orbas-gradient px-3 py-1.5 text-sm font-medium text-white hover:opacity-90 transition-opacity">
            <Plus className="h-3.5 w-3.5" />New Invoice
          </Link>
        </div>
      </div>

      {/* â”€â”€ Period Status Banner â”€â”€ */}
      <div className={`rounded-xl border p-4 flex flex-wrap gap-4 items-center text-sm ${PERIOD_STATUS.periodLocked ? "border-[#059669]/30 bg-[#059669]/5" : "border-[var(--border)] bg-[var(--muted)]/30"}`}>
        <div className="flex items-center gap-2 font-medium text-[var(--foreground)]">
          <CalendarCheck className="h-4 w-4 text-[var(--primary)]" />
          Period: <span className="text-[var(--primary)]">{PERIOD_STATUS.period}</span>
          <span className={`ml-1 rounded-full px-2 py-0.5 text-xs font-semibold ${PERIOD_STATUS.periodLocked ? "bg-[#059669]/10 text-[#059669]" : "bg-[#d97706]/10 text-[#d97706]"}`}>
            {PERIOD_STATUS.periodLocked ? "Locked" : "Open"}
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[var(--muted-foreground)]">
          <span className={`h-2 w-2 rounded-full inline-block ${PERIOD_STATUS.bankRec.status === "Complete" ? "bg-[#059669]" : "bg-[#d97706]"}`} />
          Bank Rec: {PERIOD_STATUS.bankRec.detail}
        </div>
        <div className="flex items-center gap-1.5 text-[var(--muted-foreground)]">
          <AlertTriangle className="h-3.5 w-3.5 text-[#d97706]" />
          {PERIOD_STATUS.unreconciled} unreconciled transactions
        </div>
        <div className="flex items-center gap-1.5 text-[var(--muted-foreground)]">
          {PERIOD_STATUS.vatFiled
            ? <CheckCircle2 className="h-3.5 w-3.5 text-[#059669]" />
            : <XCircle className="h-3.5 w-3.5 text-[#dc2626]" />
          }
          VAT Return: {PERIOD_STATUS.vatFiled ? "Filed" : "Not filed"}
        </div>
        <div className="flex items-center gap-1.5 text-[var(--muted-foreground)]">
          {PERIOD_STATUS.depreciation
            ? <CheckCircle2 className="h-3.5 w-3.5 text-[#059669]" />
            : <XCircle className="h-3.5 w-3.5 text-[#dc2626]" />
          }
          Depreciation: {PERIOD_STATUS.depreciation ? "Run" : "Pending"}
        </div>
        <div className="ml-auto">
          <Link href="/app/accounting/period-close" className="text-xs text-[var(--primary)] hover:underline font-medium">
            Manage Period Close â†’
          </Link>
        </div>
      </div>

      {/* â”€â”€ 8 KPI Cards â”€â”€ */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8 gap-3">
        {KPI_TOP.map(kpi => (
          <Link key={kpi.label} href={kpi.href}
            className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-4 hover:border-[var(--primary)]/40 hover:bg-[var(--secondary)] transition-all group block">
            <div className="flex items-start justify-between gap-1 mb-2">
              <span className="text-xs font-medium text-[var(--muted-foreground)] leading-tight">{kpi.label}</span>
              <kpi.icon className="h-3.5 w-3.5 shrink-0 mt-0.5" style={{ color: kpi.accent }} />
            </div>
            <p className="text-lg font-bold text-[var(--foreground)] leading-tight">{kpi.value}</p>
            <p className="text-[10px] text-[var(--muted-foreground)] mt-0.5 truncate">{kpi.sub}</p>
            <p className={`text-[10px] mt-1 font-medium ${kpi.up === true ? "text-[#059669]" : kpi.up === false ? "text-[#dc2626]" : "text-[var(--muted-foreground)]"}`}>
              {kpi.change}
            </p>
          </Link>
        ))}
      </div>

      {/* â”€â”€ Charts Row â”€â”€ */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Cash Flow */}
        <div className="lg:col-span-2 rounded-xl border border-[var(--border)] bg-[var(--background)] p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-[var(--foreground)]">Cash Flow</h3>
              <p className="text-xs text-[var(--muted-foreground)]">Income vs Expenses â€” Jan to Jun 2026</p>
            </div>
            <Link href="/app/accounting/reports/cashflow" className="text-xs text-[var(--primary)] hover:underline">View report â†’</Link>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={CASHFLOW_DATA} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1a56db" stopOpacity={0.18} />
                  <stop offset="95%" stopColor="#1a56db" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="expGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#dc2626" stopOpacity={0.12} />
                  <stop offset="95%" stopColor="#dc2626" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} tickFormatter={v => `Â£${(v / 1000).toFixed(0)}k`} />
              <Tooltip formatter={(v: any, name: any) => [`Â£${v.toLocaleString()}`, name === "income" ? "Income" : "Expenses"]} />
              <Area type="monotone" dataKey="income" stroke="#1a56db" strokeWidth={2} fill="url(#incomeGrad)" />
              <Area type="monotone" dataKey="expenses" stroke="#dc2626" strokeWidth={2} fill="url(#expGrad)" />
            </AreaChart>
          </ResponsiveContainer>
          <div className="flex gap-4 mt-2 text-xs text-[var(--muted-foreground)]">
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#1a56db] inline-block" />Income</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#dc2626] inline-block" />Expenses</span>
          </div>
        </div>

        {/* P&L Trend */}
        <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-[var(--foreground)]">Profit Trend</h3>
              <p className="text-xs text-[var(--muted-foreground)]">Gross & Net â€” 6 months</p>
            </div>
            <Link href="/app/accounting/reports/profit-loss" className="text-xs text-[var(--primary)] hover:underline">P&L â†’</Link>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={PNL_DATA} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} tickFormatter={v => `Â£${(v / 1000).toFixed(0)}k`} />
              <Tooltip formatter={(v: any, name: any) => [`Â£${v.toLocaleString()}`, name === "gross" ? "Gross Profit" : "Net Profit"]} />
              <Bar dataKey="gross" fill="#1a56db" opacity={0.6} radius={[2, 2, 0, 0]} />
              <Bar dataKey="net" fill="#06b6d4" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex gap-4 mt-2 text-xs text-[var(--muted-foreground)]">
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#1a56db]/60 inline-block" />Gross</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#06b6d4] inline-block" />Net</span>
          </div>
        </div>
      </div>

      {/* â”€â”€ AR/AP Ageing + Quick Actions â”€â”€ */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* AR Ageing */}
        <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-[var(--foreground)]">AR Ageing</h3>
            <Link href="/app/accounting/receivables" className="text-xs text-[var(--primary)] hover:underline">View all â†’</Link>
          </div>
          <p className="text-2xl font-bold text-[var(--foreground)] mb-3">Â£{total_ar.toLocaleString()}</p>
          <div className="space-y-2">
            {AR_AGEING.map(b => (
              <div key={b.label}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-[var(--muted-foreground)]">{b.label}</span>
                  <span className="font-medium text-[var(--foreground)]">Â£{b.amount.toLocaleString()} <span className="text-[var(--muted-foreground)] font-normal">({b.count})</span></span>
                </div>
                <div className="h-1.5 rounded-full bg-[var(--muted)]">
                  <div className="h-1.5 rounded-full transition-all" style={{ width: `${total_ar > 0 ? (b.amount / total_ar) * 100 : 0}%`, background: b.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AP Ageing */}
        <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-[var(--foreground)]">AP Ageing</h3>
            <Link href="/app/accounting/payables" className="text-xs text-[var(--primary)] hover:underline">View all â†’</Link>
          </div>
          <p className="text-2xl font-bold text-[var(--foreground)] mb-3">Â£{total_ap.toLocaleString()}</p>
          <div className="space-y-2">
            {AP_AGEING.map(b => (
              <div key={b.label}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-[var(--muted-foreground)]">{b.label}</span>
                  <span className="font-medium text-[var(--foreground)]">Â£{b.amount.toLocaleString()} <span className="text-[var(--muted-foreground)] font-normal">({b.count})</span></span>
                </div>
                <div className="h-1.5 rounded-full bg-[var(--muted)]">
                  <div className="h-1.5 rounded-full transition-all" style={{ width: `${total_ap > 0 ? (b.amount / total_ap) * 100 : 0}%`, background: b.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-5">
          <h3 className="text-sm font-semibold text-[var(--foreground)] mb-3">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-2">
            {QUICK_ACTIONS.map(qa => (
              <Link key={qa.label} href={qa.href}
                className="flex flex-col items-center gap-1.5 rounded-lg border border-[var(--border)] p-3 text-center hover:bg-[var(--secondary)] hover:border-[var(--primary)]/30 transition-all group">
                <div className="rounded-lg p-1.5" style={{ background: `${qa.accent}15` }}>
                  <qa.icon className="h-4 w-4" style={{ color: qa.accent }} />
                </div>
                <span className="text-[10px] font-medium text-[var(--foreground)] leading-tight">{qa.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* â”€â”€ Recent Invoices + Bills â”€â”€ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Recent Invoices */}
        <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-[var(--border)]">
            <h3 className="text-sm font-semibold text-[var(--foreground)]">Recent Sales Invoices</h3>
            <Link href="/app/accounting/invoices" className="text-xs text-[var(--primary)] hover:underline flex items-center gap-1">
              View all <ChevronRight className="h-3 w-3" />
            </Link>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border)]">
                <th className="text-left px-5 py-2.5 text-xs font-medium text-[var(--muted-foreground)]">Invoice</th>
                <th className="text-left px-2 py-2.5 text-xs font-medium text-[var(--muted-foreground)]">Customer</th>
                <th className="text-right px-2 py-2.5 text-xs font-medium text-[var(--muted-foreground)]">Amount</th>
                <th className="text-left px-4 py-2.5 text-xs font-medium text-[var(--muted-foreground)]">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {RECENT_INVOICES.map(inv => {
                const StatusIcon = STATUS_ICONS[inv.status] || FileText
                return (
                  <tr key={inv.id} className="hover:bg-[var(--secondary)] transition-colors">
                    <td className="px-5 py-2.5">
                      <Link href={`/app/accounting/invoices/${inv.id}`} className="text-[var(--primary)] font-medium text-xs hover:underline">{inv.id}</Link>
                      <div className="text-[10px] text-[var(--muted-foreground)]">Due {inv.due}</div>
                    </td>
                    <td className="px-2 py-2.5 text-xs text-[var(--foreground)] max-w-[140px] truncate">{inv.customer}</td>
                    <td className="px-2 py-2.5 text-xs text-right font-medium text-[var(--foreground)]">{inv.total}</td>
                    <td className="px-4 py-2.5">
                      <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ${STATUS_MAP[inv.status]}`}>
                        <StatusIcon className="h-2.5 w-2.5" />{inv.status}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Recent Bills */}
        <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-[var(--border)]">
            <h3 className="text-sm font-semibold text-[var(--foreground)]">Recent Purchase Bills</h3>
            <Link href="/app/accounting/bills" className="text-xs text-[var(--primary)] hover:underline flex items-center gap-1">
              View all <ChevronRight className="h-3 w-3" />
            </Link>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border)]">
                <th className="text-left px-5 py-2.5 text-xs font-medium text-[var(--muted-foreground)]">Bill</th>
                <th className="text-left px-2 py-2.5 text-xs font-medium text-[var(--muted-foreground)]">Supplier</th>
                <th className="text-right px-2 py-2.5 text-xs font-medium text-[var(--muted-foreground)]">Amount</th>
                <th className="text-left px-4 py-2.5 text-xs font-medium text-[var(--muted-foreground)]">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {RECENT_BILLS.map(bill => {
                const StatusIcon = STATUS_ICONS[bill.status] || FileText
                return (
                  <tr key={bill.id} className="hover:bg-[var(--secondary)] transition-colors">
                    <td className="px-5 py-2.5">
                      <Link href={`/app/accounting/bills/${bill.id}`} className="text-[var(--primary)] font-medium text-xs hover:underline">{bill.id}</Link>
                      <div className="text-[10px] text-[var(--muted-foreground)]">Due {bill.due}</div>
                    </td>
                    <td className="px-2 py-2.5 text-xs text-[var(--foreground)] max-w-[140px] truncate">{bill.supplier}</td>
                    <td className="px-2 py-2.5 text-xs text-right font-medium text-[var(--foreground)]">{bill.total}</td>
                    <td className="px-4 py-2.5">
                      <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ${STATUS_MAP[bill.status]}`}>
                        <StatusIcon className="h-2.5 w-2.5" />{bill.status}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          {/* Bank Rec Status */}
          <div className="px-5 py-3 border-t border-[var(--border)] bg-[var(--muted)]/30 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-[var(--muted-foreground)]">
              <ShieldCheck className="h-3.5 w-3.5 text-[#d97706]" />
              Bank Reconciliation: <span className="font-medium text-[#d97706]">2 accounts need attention</span>
            </div>
            <Link href="/app/accounting/reconciliation" className="text-xs text-[var(--primary)] hover:underline font-medium">
              Reconcile â†’
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

