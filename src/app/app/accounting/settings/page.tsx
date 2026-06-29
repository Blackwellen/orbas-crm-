"use client"

import React, { useState } from "react"
import {
  Settings, Building2, Percent, Clock, Globe, Calendar,
  Plug, Plus, Edit, Trash2, Check, X, Save, AlertCircle
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select"
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table"
import { cn } from "@/lib/utils"

const TABS = [
  { id: "general",   label: "General",          icon: Building2 },
  { id: "coa",       label: "Chart of Accounts", icon: Settings },
  { id: "tax",       label: "Tax Rates",         icon: Percent },
  { id: "terms",     label: "Payment Terms",     icon: Clock },
  { id: "currencies",label: "Currencies",        icon: Globe },
  { id: "fiscal",    label: "Fiscal Year",       icon: Calendar },
  { id: "integrations", label: "Integrations",   icon: Plug },
] as const

type TabId = typeof TABS[number]["id"]

interface TaxRate { id: string; name: string; rate: number; type: string; description: string; active: boolean }
interface PaymentTerm { id: string; name: string; days: number; description: string; default: boolean }
interface Currency { code: string; name: string; symbol: string; rate: number; base: boolean; active: boolean }

const INITIAL_TAX_RATES: TaxRate[] = [
  { id: "tr1", name: "Standard VAT",    rate: 20,   type: "VAT",          description: "Standard UK VAT rate", active: true },
  { id: "tr2", name: "Zero Rated",      rate: 0,    type: "VAT",          description: "Zero rated supplies", active: true },
  { id: "tr3", name: "Exempt",          rate: 0,    type: "Exempt",       description: "VAT exempt transactions", active: true },
  { id: "tr4", name: "Reverse Charge",  rate: 20,   type: "Reverse Charge",description: "EU B2B reverse charge", active: true },
  { id: "tr5", name: "Reduced Rate",    rate: 5,    type: "VAT",          description: "Reduced rate (e.g. domestic fuel)", active: false },
]

const INITIAL_PAYMENT_TERMS: PaymentTerm[] = [
  { id: "pt1", name: "Net 30",          days: 30, description: "Payment due within 30 days", default: true },
  { id: "pt2", name: "Net 60",          days: 60, description: "Payment due within 60 days", default: false },
  { id: "pt3", name: "Due on Receipt",  days: 0,  description: "Payment due immediately on receipt", default: false },
  { id: "pt4", name: "Net 14",          days: 14, description: "Payment due within 14 days", default: false },
  { id: "pt5", name: "Net 90",          days: 90, description: "Payment due within 90 days", default: false },
]

const INITIAL_CURRENCIES: Currency[] = [
  { code: "GBP", name: "British Pound Sterling", symbol: "£", rate: 1.0000, base: true,  active: true },
  { code: "USD", name: "US Dollar",              symbol: "$", rate: 1.2680, base: false, active: true },
  { code: "EUR", name: "Euro",                   symbol: "€", rate: 1.1720, base: false, active: true },
  { code: "CHF", name: "Swiss Franc",            symbol: "Fr", rate: 1.1380, base: false, active: false },
  { code: "AED", name: "UAE Dirham",             symbol: "د.إ", rate: 4.6600, base: false, active: false },
]

const COA_SAMPLE = [
  { code: "1000-1999", label: "Assets", count: 12 },
  { code: "2000-2999", label: "Liabilities", count: 8 },
  { code: "3000-3999", label: "Equity", count: 4 },
  { code: "4000-4999", label: "Revenue", count: 6 },
  { code: "5000-5999", label: "Cost of Sales", count: 5 },
  { code: "6000-6999", label: "Operating Expenses", count: 14 },
  { code: "7000-7999", label: "Finance Costs", count: 3 },
  { code: "8000-8999", label: "Other Income", count: 2 },
]

const INTEGRATIONS = [
  { id: "int1", name: "Xero",          desc: "Sync chart of accounts and transactions",           status: "not-connected", logo: "X" },
  { id: "int2", name: "QuickBooks",    desc: "Import QuickBooks data and migration",               status: "not-connected", logo: "QB" },
  { id: "int3", name: "Stripe",        desc: "Auto-reconcile Stripe payments and payouts",         status: "connected",     logo: "S" },
  { id: "int4", name: "Plaid",         desc: "Direct bank feed connection (Open Banking)",         status: "connected",     logo: "P" },
  { id: "int5", name: "HMRC MTD",      desc: "Making Tax Digital VAT return submission",           status: "not-connected", logo: "HMRC" },
  { id: "int6", name: "Dext",          desc: "Receipt and expense data capture",                   status: "not-connected", logo: "D" },
]

export default function AccountingSettingsPage() {
  const [activeTab, setActiveTab] = useState<TabId>("general")
  const [taxRates, setTaxRates] = useState(INITIAL_TAX_RATES)
  const [paymentTerms, setPaymentTerms] = useState(INITIAL_PAYMENT_TERMS)
  const [currencies, setCurrencies] = useState(INITIAL_CURRENCIES)
  const [saved, setSaved] = useState(false)

  const [general, setGeneral] = useState({
    companyName: "Orbas Technologies Ltd",
    baseCurrency: "GBP",
    taxNumber: "GB 123 4567 89",
    fiscalYearStart: "01",
    defaultPaymentTerms: "pt1",
    invoicePrefix: "INV",
    billPrefix: "BILL",
    nextInvoiceNumber: "2026-0145",
  })

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div className="p-6 space-y-5 max-w-5xl">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg orbas-gradient">
            <Settings className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[var(--foreground)]">Accounting Settings</h1>
            <p className="text-sm text-[var(--muted-foreground)]">Configure your accounting preferences</p>
          </div>
        </div>
        <Button size="sm" className={cn("h-9 gap-1.5", saved ? "bg-[#059669] hover:bg-[#059669]" : "orbas-gradient")} onClick={handleSave}>
          {saved ? <Check className="h-4 w-4" /> : <Save className="h-4 w-4" />}
          {saved ? "Saved!" : "Save Changes"}
        </Button>
      </div>

      <div className="flex gap-5">
        {/* Sidebar Nav */}
        <div className="w-48 shrink-0 space-y-1">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-left transition-colors",
                activeTab === tab.id
                  ? "bg-[var(--primary)]/10 text-[var(--primary)]"
                  : "text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--muted)]/50"
              )}
            >
              <tab.icon className="h-4 w-4 shrink-0" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">

          {/* General Tab */}
          {activeTab === "general" && (
            <Card>
              <CardHeader className="pb-3"><CardTitle className="text-sm font-semibold">General Settings</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { field: "companyName",          label: "Company Name",           type: "text", placeholder: "Your Company Ltd" },
                    { field: "taxNumber",             label: "VAT / Tax Number",       type: "text", placeholder: "GB 123 4567 89" },
                    { field: "invoicePrefix",         label: "Invoice Number Prefix",  type: "text", placeholder: "INV" },
                    { field: "nextInvoiceNumber",     label: "Next Invoice Number",    type: "text", placeholder: "2026-0001" },
                    { field: "billPrefix",            label: "Bill Number Prefix",     type: "text", placeholder: "BILL" },
                  ].map(f => (
                    <div key={f.field} className="space-y-1.5">
                      <label className="text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wide">{f.label}</label>
                      <Input
                        value={general[f.field as keyof typeof general]}
                        onChange={e => setGeneral(prev => ({ ...prev, [f.field]: e.target.value }))}
                        className="h-9 text-sm"
                        placeholder={f.placeholder}
                      />
                    </div>
                  ))}
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wide">Base Currency</label>
                    <Select value={general.baseCurrency} onValueChange={v => setGeneral(p => ({ ...p, baseCurrency: v }))}>
                      <SelectTrigger className="h-9 text-sm"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="GBP">GBP — British Pound</SelectItem>
                        <SelectItem value="USD">USD — US Dollar</SelectItem>
                        <SelectItem value="EUR">EUR — Euro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wide">Fiscal Year Start Month</label>
                    <Select value={general.fiscalYearStart} onValueChange={v => setGeneral(p => ({ ...p, fiscalYearStart: v }))}>
                      <SelectTrigger className="h-9 text-sm"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {["January","February","March","April","May","June","July","August","September","October","November","December"].map((m, i) => (
                          <SelectItem key={i} value={String(i + 1).padStart(2, "0")}>{m}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-[var(--muted-foreground)] rounded-lg border border-[var(--border)] bg-[var(--muted)]/20 px-4 py-2.5 mt-2">
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                  Changing the base currency will require re-running all exchange rate conversions.
                </div>
              </CardContent>
            </Card>
          )}

          {/* Chart of Accounts Tab */}
          {activeTab === "coa" && (
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-semibold">Chart of Accounts</CardTitle>
                  <Button size="sm" variant="outline" className="h-7 text-xs gap-1.5">
                    <Plus className="h-3.5 w-3.5" />Add Account
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-[var(--border)]">
                  {COA_SAMPLE.map(section => (
                    <div key={section.code} className="flex items-center justify-between px-5 py-3.5 hover:bg-[var(--muted)]/20">
                      <div>
                        <p className="text-sm font-semibold text-[var(--foreground)]">{section.label}</p>
                        <p className="text-xs text-[var(--muted-foreground)] mt-0.5">Account range: {section.code}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-[var(--muted-foreground)]">{section.count} accounts</span>
                        <Button variant="outline" size="sm" className="h-7 text-xs">Manage</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Tax Rates Tab */}
          {activeTab === "tax" && (
            <Card className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-semibold">Tax Rates</CardTitle>
                  <Button size="sm" variant="outline" className="h-7 text-xs gap-1.5">
                    <Plus className="h-3.5 w-3.5" />Add Rate
                  </Button>
                </div>
              </CardHeader>
              <Table>
                <TableHeader>
                  <TableRow className="bg-[var(--muted)]/40">
                    <TableHead className="text-xs font-semibold uppercase tracking-wide text-[var(--muted-foreground)]">Name</TableHead>
                    <TableHead className="text-xs font-semibold uppercase tracking-wide text-[var(--muted-foreground)]">Type</TableHead>
                    <TableHead className="text-right text-xs font-semibold uppercase tracking-wide text-[var(--muted-foreground)] w-20">Rate</TableHead>
                    <TableHead className="text-xs font-semibold uppercase tracking-wide text-[var(--muted-foreground)]">Description</TableHead>
                    <TableHead className="text-xs font-semibold uppercase tracking-wide text-[var(--muted-foreground)] w-20">Status</TableHead>
                    <TableHead className="w-20" />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {taxRates.map(tr => (
                    <TableRow key={tr.id} className="hover:bg-[var(--muted)]/20">
                      <TableCell className="font-medium text-sm text-[var(--foreground)]">{tr.name}</TableCell>
                      <TableCell>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] font-medium">{tr.type}</span>
                      </TableCell>
                      <TableCell className="text-right font-mono text-sm font-semibold text-[var(--foreground)]">{tr.rate}%</TableCell>
                      <TableCell className="text-xs text-[var(--muted-foreground)]">{tr.description}</TableCell>
                      <TableCell>
                        <button
                          onClick={() => setTaxRates(prev => prev.map(r => r.id === tr.id ? { ...r, active: !r.active } : r))}
                          className={cn("text-[10px] px-2 py-0.5 rounded-full font-semibold transition-colors",
                            tr.active ? "bg-[#059669]/10 text-[#059669]" : "bg-[var(--muted)] text-[var(--muted-foreground)]")}>
                          {tr.active ? "Active" : "Inactive"}
                        </button>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" className="h-7 w-7"><Edit className="h-3.5 w-3.5" /></Button>
                          <Button variant="ghost" size="icon" className="h-7 w-7 hover:text-[#dc2626]"><Trash2 className="h-3.5 w-3.5" /></Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          )}

          {/* Payment Terms Tab */}
          {activeTab === "terms" && (
            <Card className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-semibold">Payment Terms</CardTitle>
                  <Button size="sm" variant="outline" className="h-7 text-xs gap-1.5">
                    <Plus className="h-3.5 w-3.5" />Add Terms
                  </Button>
                </div>
              </CardHeader>
              <Table>
                <TableHeader>
                  <TableRow className="bg-[var(--muted)]/40">
                    <TableHead className="text-xs font-semibold uppercase tracking-wide text-[var(--muted-foreground)]">Name</TableHead>
                    <TableHead className="text-right text-xs font-semibold uppercase tracking-wide text-[var(--muted-foreground)] w-20">Days</TableHead>
                    <TableHead className="text-xs font-semibold uppercase tracking-wide text-[var(--muted-foreground)]">Description</TableHead>
                    <TableHead className="text-xs font-semibold uppercase tracking-wide text-[var(--muted-foreground)] w-24">Default</TableHead>
                    <TableHead className="w-20" />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paymentTerms.map(pt => (
                    <TableRow key={pt.id} className="hover:bg-[var(--muted)]/20">
                      <TableCell className="font-medium text-sm text-[var(--foreground)]">{pt.name}</TableCell>
                      <TableCell className="text-right font-mono text-sm font-semibold text-[var(--foreground)]">{pt.days}</TableCell>
                      <TableCell className="text-xs text-[var(--muted-foreground)]">{pt.description}</TableCell>
                      <TableCell>
                        <button
                          onClick={() => setPaymentTerms(prev => prev.map(t => ({ ...t, default: t.id === pt.id })))}
                          className={cn("text-[10px] px-2 py-0.5 rounded-full font-semibold",
                            pt.default ? "bg-[var(--primary)]/10 text-[var(--primary)]" : "bg-[var(--muted)] text-[var(--muted-foreground)]")}>
                          {pt.default ? "Default" : "Set Default"}
                        </button>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" className="h-7 w-7"><Edit className="h-3.5 w-3.5" /></Button>
                          <Button variant="ghost" size="icon" className="h-7 w-7 hover:text-[#dc2626]"><Trash2 className="h-3.5 w-3.5" /></Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          )}

          {/* Currencies Tab */}
          {activeTab === "currencies" && (
            <Card className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-semibold">Currencies</CardTitle>
                  <Button size="sm" variant="outline" className="h-7 text-xs gap-1.5">
                    <Plus className="h-3.5 w-3.5" />Add Currency
                  </Button>
                </div>
              </CardHeader>
              <Table>
                <TableHeader>
                  <TableRow className="bg-[var(--muted)]/40">
                    <TableHead className="text-xs font-semibold uppercase tracking-wide text-[var(--muted-foreground)] w-20">Code</TableHead>
                    <TableHead className="text-xs font-semibold uppercase tracking-wide text-[var(--muted-foreground)]">Currency</TableHead>
                    <TableHead className="text-right text-xs font-semibold uppercase tracking-wide text-[var(--muted-foreground)] w-32">Exchange Rate</TableHead>
                    <TableHead className="text-xs font-semibold uppercase tracking-wide text-[var(--muted-foreground)] w-20">Status</TableHead>
                    <TableHead className="w-20" />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currencies.map(cur => (
                    <TableRow key={cur.code} className="hover:bg-[var(--muted)]/20">
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded flex items-center justify-center text-xs font-bold bg-[var(--primary)]/10 text-[var(--primary)]">{cur.symbol}</span>
                          <span className="font-mono text-sm font-semibold text-[var(--foreground)]">{cur.code}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-[var(--foreground)]">
                        {cur.name}
                        {cur.base && <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded-full bg-[#d97706]/10 text-[#d97706] font-semibold">Base</span>}
                      </TableCell>
                      <TableCell className="text-right">
                        {cur.base ? (
                          <span className="font-mono text-sm text-[var(--muted-foreground)]">1.0000</span>
                        ) : (
                          <Input
                            type="number"
                            value={cur.rate}
                            step="0.0001"
                            onChange={e => setCurrencies(prev => prev.map(c => c.code === cur.code ? { ...c, rate: parseFloat(e.target.value) || 1 } : c))}
                            className="h-7 text-xs text-right w-24 ml-auto font-mono"
                          />
                        )}
                      </TableCell>
                      <TableCell>
                        <button
                          onClick={() => !cur.base && setCurrencies(prev => prev.map(c => c.code === cur.code ? { ...c, active: !c.active } : c))}
                          className={cn("text-[10px] px-2 py-0.5 rounded-full font-semibold",
                            cur.active ? "bg-[#059669]/10 text-[#059669]" : "bg-[var(--muted)] text-[var(--muted-foreground)]")}>
                          {cur.active ? "Active" : "Inactive"}
                        </button>
                      </TableCell>
                      <TableCell>
                        {!cur.base && (
                          <Button variant="ghost" size="icon" className="h-7 w-7 hover:text-[#dc2626]"><Trash2 className="h-3.5 w-3.5" /></Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          )}

          {/* Fiscal Year Tab */}
          {activeTab === "fiscal" && (
            <Card>
              <CardHeader className="pb-3"><CardTitle className="text-sm font-semibold">Fiscal Year Configuration</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Fiscal Year Start", desc: "1 January", color: "#059669" },
                    { label: "Fiscal Year End",   desc: "31 December", color: "#1a56db" },
                    { label: "Current Period",    desc: "June 2026", color: "#d97706" },
                    { label: "Tax Year Basis",    desc: "Calendar Year", color: "#7c3aed" },
                  ].map(item => (
                    <div key={item.label} className="rounded-lg border border-[var(--border)] p-4">
                      <p className="text-xs text-[var(--muted-foreground)] mb-1">{item.label}</p>
                      <p className="text-sm font-bold" style={{ color: item.color }}>{item.desc}</p>
                    </div>
                  ))}
                </div>
                <div className="rounded-lg border border-[var(--border)] p-4">
                  <p className="text-sm font-semibold text-[var(--foreground)] mb-3">Fiscal Year History</p>
                  <div className="space-y-2">
                    {["FY 2024 — Jan to Dec 2024 · Locked", "FY 2025 — Jan to Dec 2025 · Locked", "FY 2026 — Jan to Dec 2026 · Open (current)"].map(y => (
                      <div key={y} className="flex items-center justify-between py-1.5 border-b border-[var(--border)] last:border-0">
                        <span className="text-sm text-[var(--foreground)]">{y.split(" · ")[0]}</span>
                        <span className={cn("text-xs font-medium",
                          y.includes("current") ? "text-[#059669]" : "text-[var(--muted-foreground)]")}>
                          {y.split(" · ")[1]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Integrations Tab */}
          {activeTab === "integrations" && (
            <div className="space-y-3">
              {INTEGRATIONS.map(intg => (
                <Card key={intg.id}>
                  <CardContent className="pt-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg orbas-gradient flex items-center justify-center text-white font-bold text-sm shrink-0">
                        {intg.logo}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-[var(--foreground)]">{intg.name}</p>
                        <p className="text-xs text-[var(--muted-foreground)] mt-0.5">{intg.desc}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={cn("text-xs font-semibold flex items-center gap-1",
                          intg.status === "connected" ? "text-[#059669]" : "text-[var(--muted-foreground)]")}>
                          {intg.status === "connected" ? <Check className="h-3.5 w-3.5" /> : <X className="h-3.5 w-3.5" />}
                          {intg.status === "connected" ? "Connected" : "Not Connected"}
                        </span>
                        <Button size="sm" variant={intg.status === "connected" ? "outline" : "default"} className={cn("h-8 text-xs", intg.status !== "connected" && "orbas-gradient text-white hover:opacity-90")}>
                          {intg.status === "connected" ? "Manage" : "Connect"}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
