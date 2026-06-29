"use client"

import React, { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Upload, Download, RefreshCw, Plus, CheckCircle2, AlertCircle, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const ACCOUNT = {
  id: "ba-001",
  name: "Orbas Main Current",
  bank: "Barclays Business",
  type: "Current Account",
  balance: 87420.50,
  currency: "GBP",
  sortCode: "20-00-00",
  accountNo: "12345678",
}

interface Txn {
  date: string
  description: string
  amount: number
  type: "credit" | "debit"
  category: string
  reconciled: boolean
}

const TRANSACTIONS: Txn[] = [
  { date: "10 Jun 2024", description: "Meridian Tech Ltd – INV-2024-0140",      amount: 7650,   type: "credit", category: "Sales Receipt",   reconciled: true },
  { date: "10 Jun 2024", description: "AWS UK Direct Debit",                    amount: 4104,   type: "debit",  category: "IT & Software",   reconciled: false },
  { date: "09 Jun 2024", description: "Barclays Business – Bank Charges",       amount: 28,     type: "debit",  category: "Bank Charges",    reconciled: true },
  { date: "09 Jun 2024", description: "BACS Credit – Kensington AI Ltd",        amount: 3400,   type: "credit", category: "Sales Receipt",   reconciled: true },
  { date: "08 Jun 2024", description: "Office Space Partners – Rent Jun",       amount: 8500,   type: "debit",  category: "Rent",            reconciled: false },
  { date: "07 Jun 2024", description: "HMRC PAYE – May Payroll",                amount: 12400,  type: "debit",  category: "Payroll",         reconciled: true },
  { date: "07 Jun 2024", description: "Regency Systems – INV-2024-0135",        amount: 8900,   type: "credit", category: "Sales Receipt",   reconciled: true },
  { date: "06 Jun 2024", description: "BT Business – Broadband Jun",            amount: 124,    type: "debit",  category: "Utilities",       reconciled: false },
  { date: "05 Jun 2024", description: "Blackwell Consulting – INV-2024-0140",   amount: 7650,   type: "credit", category: "Sales Receipt",   reconciled: true },
  { date: "04 Jun 2024", description: "Peninsula HR Monthly Retainer",          amount: 2520,   type: "debit",  category: "Professional Fees", reconciled: false },
  { date: "03 Jun 2024", description: "Croydon Fabrications – INV-2024-0133",   amount: 3750,   type: "credit", category: "Sales Receipt",   reconciled: true },
  { date: "03 Jun 2024", description: "Wise FX – EUR conversion fee",           amount: 18,     type: "debit",  category: "Bank Charges",    reconciled: false },
  { date: "02 Jun 2024", description: "PrintMasters UK – Brochures",            amount: 864,    type: "debit",  category: "Marketing",       reconciled: false },
  { date: "01 Jun 2024", description: "Opening Balance – Jun 2024",             amount: 88000,  type: "credit", category: "Balance b/f",     reconciled: true },
  { date: "01 Jun 2024", description: "Gatwick Travel – Q2 Expenses",           amount: 1992,   type: "debit",  category: "Travel",          reconciled: false },
  { date: "31 May 2024", description: "Westminster Logistics – INV-2024-0130",  amount: 6400,   type: "credit", category: "Sales Receipt",   reconciled: true },
  { date: "31 May 2024", description: "Citylink Courier Monthly",               amount: 456,    type: "debit",  category: "Logistics",       reconciled: true },
  { date: "30 May 2024", description: "Corporation Tax Instalment",             amount: 8200,   type: "debit",  category: "Tax",             reconciled: true },
  { date: "29 May 2024", description: "Thames Digital – BACS",                  amount: 5100,   type: "credit", category: "Sales Receipt",   reconciled: false },
  { date: "28 May 2024", description: "Creative Spark Agency – Invoice",        amount: 5760,   type: "debit",  category: "Marketing",       reconciled: false },
]

const RULES = [
  { keyword: "AWS UK",       category: "IT & Software",   applies: "all" },
  { keyword: "HMRC PAYE",    category: "Payroll",          applies: "debit" },
  { keyword: "Barclays",     category: "Bank Charges",     applies: "debit" },
  { keyword: "Office Space", category: "Rent",             applies: "debit" },
]

function fmt(n: number) { return `£${Math.abs(n).toLocaleString("en-GB", { minimumFractionDigits: 2 })}` }

export default function BankAccountDetailPage() {
  const [tab, setTab] = useState("transactions")

  const unreconciledCount = TRANSACTIONS.filter(t => !t.reconciled).length

  return (
    <div className="p-6 max-w-screen-2xl space-y-5">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/app/accounting/banking"><ArrowLeft className="h-4 w-4" /></Link>
          </Button>
          <div>
            <h1 className="text-2xl font-semibold">{ACCOUNT.name}</h1>
            <p className="text-sm text-[var(--muted-foreground)] mt-0.5">
              {ACCOUNT.bank} · {ACCOUNT.type} · Sort: {ACCOUNT.sortCode} · Acc: {ACCOUNT.accountNo}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Button variant="outline" size="sm" className="gap-1.5"><Upload className="h-3.5 w-3.5" />Import Statement</Button>
          <Button variant="outline" size="sm" className="gap-1.5"><RefreshCw className="h-3.5 w-3.5" />Sync</Button>
          <Button size="sm" className="gap-1.5" asChild>
            <Link href="/app/accounting/reconciliation">Reconcile</Link>
          </Button>
        </div>
      </div>

      {/* Balance */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Current Balance",    value: `£${ACCOUNT.balance.toLocaleString("en-GB", { minimumFractionDigits: 2 })}`, color: "text-[var(--foreground)]" },
          { label: "Unreconciled",       value: `${unreconciledCount} transactions`,  color: "text-amber-600" },
          { label: "Credits (Jun)",      value: "£43,850.00",  color: "text-emerald-600" },
          { label: "Debits (Jun)",       value: "£44,366.00",  color: "text-red-600" },
        ].map(k => (
          <Card key={k.label}>
            <CardContent className="pt-4 pb-4">
              <p className="text-xs text-[var(--muted-foreground)]">{k.label}</p>
              <p className={`text-xl font-bold mt-1 ${k.color}`}>{k.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="bg-[var(--muted)]/40 p-1">
          {["summary","transactions","reconciliation","rules","statements","audit"].map(t => (
            <TabsTrigger key={t} value={t} className="text-xs capitalize px-3">{t}</TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="summary" className="mt-4">
          <Card>
            <CardContent className="pt-5 grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
              {[
                { label: "Account Name",   value: ACCOUNT.name },
                { label: "Bank",           value: ACCOUNT.bank },
                { label: "Account Type",   value: ACCOUNT.type },
                { label: "Currency",       value: ACCOUNT.currency },
                { label: "Sort Code",      value: ACCOUNT.sortCode },
                { label: "Account No",     value: ACCOUNT.accountNo },
                { label: "Balance",        value: fmt(ACCOUNT.balance) },
                { label: "Last Synced",    value: "10 Jun 2024 08:45" },
              ].map(f => (
                <div key={f.label}>
                  <p className="text-xs text-[var(--muted-foreground)] font-medium">{f.label}</p>
                  <p className="font-semibold mt-0.5">{f.value}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transactions" className="mt-4">
          <Card className="overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-[var(--muted)]/40">
                  <TableHead className="text-xs uppercase tracking-wide text-[var(--muted-foreground)] font-semibold">Date</TableHead>
                  <TableHead className="text-xs uppercase tracking-wide text-[var(--muted-foreground)] font-semibold">Description</TableHead>
                  <TableHead className="text-right text-xs uppercase tracking-wide text-[var(--muted-foreground)] font-semibold">Amount</TableHead>
                  <TableHead className="hidden md:table-cell text-xs uppercase tracking-wide text-[var(--muted-foreground)] font-semibold">Type</TableHead>
                  <TableHead className="hidden md:table-cell text-xs uppercase tracking-wide text-[var(--muted-foreground)] font-semibold">Category</TableHead>
                  <TableHead className="text-xs uppercase tracking-wide text-[var(--muted-foreground)] font-semibold">Reconciled</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {TRANSACTIONS.map((txn, i) => (
                  <TableRow key={i} className="hover:bg-[var(--muted)]/40">
                    <TableCell className="text-sm text-[var(--muted-foreground)] whitespace-nowrap">{txn.date}</TableCell>
                    <TableCell className="text-sm font-medium max-w-xs truncate">{txn.description}</TableCell>
                    <TableCell className={`text-right font-semibold text-sm ${txn.type === "credit" ? "text-emerald-600" : "text-red-600"}`}>
                      {txn.type === "credit" ? "+" : "-"}{fmt(txn.amount)}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${txn.type === "credit" ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"}`}>
                        {txn.type === "credit" ? "Credit" : "Debit"}
                      </span>
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-xs text-[var(--muted-foreground)]">{txn.category}</TableCell>
                    <TableCell>
                      {txn.reconciled ? (
                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                      ) : (
                        <AlertCircle className="h-4 w-4 text-amber-500" />
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="reconciliation" className="mt-4">
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-3"><CardTitle className="text-sm">Bank Statement</CardTitle></CardHeader>
              <CardContent className="space-y-2">
                {TRANSACTIONS.filter(t => !t.reconciled).slice(0,5).map((t, i) => (
                  <div key={i} className="flex items-center justify-between p-2.5 bg-[var(--muted)]/40 rounded-md text-sm">
                    <div>
                      <p className="font-medium text-xs truncate max-w-[160px]">{t.description}</p>
                      <p className="text-xs text-[var(--muted-foreground)]">{t.date}</p>
                    </div>
                    <span className={`font-semibold text-xs ${t.type === "credit" ? "text-emerald-600" : "text-red-600"}`}>
                      {t.type === "credit" ? "+" : "-"}{fmt(t.amount)}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3"><CardTitle className="text-sm">Book Entries</CardTitle></CardHeader>
              <CardContent className="space-y-2">
                {TRANSACTIONS.filter(t => !t.reconciled).slice(0,5).map((t, i) => (
                  <div key={i} className="flex items-center justify-between p-2.5 border border-[var(--border)] rounded-md text-sm">
                    <div>
                      <p className="font-medium text-xs truncate max-w-[140px]">{t.description}</p>
                      <p className="text-xs text-[var(--muted-foreground)]">{t.category}</p>
                    </div>
                    <span className={`font-semibold text-xs ${t.type === "credit" ? "text-emerald-600" : "text-red-600"}`}>
                      {t.type === "credit" ? "+" : "-"}{fmt(t.amount)}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
          <div className="mt-4 flex justify-center">
            <Button className="gap-2">
              <CheckCircle2 className="h-4 w-4" />Match & Reconcile Selected
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="rules" className="mt-4">
          <Card>
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <CardTitle className="text-base">Auto-categorisation Rules</CardTitle>
              <Button size="sm" className="gap-1.5"><Plus className="h-4 w-4" />Add Rule</Button>
            </CardHeader>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Keyword / Condition</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Applies To</TableHead>
                  <TableHead className="w-10" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {RULES.map((r, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium text-sm">{r.keyword}</TableCell>
                    <TableCell className="text-sm">{r.category}</TableCell>
                    <TableCell className="text-sm text-[var(--muted-foreground)] capitalize">{r.applies}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="statements" className="mt-4">
          <Card>
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <CardTitle className="text-base">Uploaded Statements</CardTitle>
              <Button variant="outline" size="sm" className="gap-1.5"><Upload className="h-3.5 w-3.5" />Upload</Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                {[
                  { name: "Barclays_Jun_2024.csv", date: "10 Jun 2024", rows: 20 },
                  { name: "Barclays_May_2024.csv", date: "01 Jun 2024", rows: 34 },
                  { name: "Barclays_Apr_2024.csv", date: "01 May 2024", rows: 28 },
                ].map(s => (
                  <div key={s.name} className="flex items-center justify-between p-3 bg-[var(--muted)]/40 rounded-md">
                    <div>
                      <p className="font-medium">{s.name}</p>
                      <p className="text-xs text-[var(--muted-foreground)]">Uploaded {s.date} · {s.rows} transactions</p>
                    </div>
                    <Button variant="ghost" size="sm" className="gap-1.5 text-xs">
                      <Download className="h-3.5 w-3.5" />Download
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audit" className="mt-4">
          <Card>
            <CardContent className="pt-5 space-y-3 text-sm">
              <div className="flex gap-4 py-2 border-b border-[var(--border)]"><span className="text-[var(--muted-foreground)] w-40">Account Created</span><span>01 Jan 2024 · System Import</span></div>
              <div className="flex gap-4 py-2 border-b border-[var(--border)]"><span className="text-[var(--muted-foreground)] w-40">Last Statement</span><span>10 Jun 2024 · James Holloway</span></div>
              <div className="flex gap-4 py-2"><span className="text-[var(--muted-foreground)] w-40">Last Reconciled</span><span>09 Jun 2024 · Sarah Mitchell</span></div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
