"use client"

import React, { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import {
  ArrowLeft, Edit, Send, CreditCard, Download, Copy, XCircle,
  FileText, Archive, MoreHorizontal, Plus, CheckCircle2, Clock,
  AlertCircle, Building2, MapPin, Mail, Phone
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table"
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"

const INVOICE = {
  id: "INV-2024-0142",
  status: "Overdue" as const,
  issueDate: "04 Jun 2024",
  dueDate: "18 Jun 2024",
  reference: "PO-2024-884",
  customer: {
    name: "Meridian Tech Ltd",
    address: "14 Canary Wharf, Level 32",
    city: "London E14 5AB",
    email: "accounts@meridiantech.co.uk",
    phone: "+44 20 7946 0022",
    vatNo: "GB 392 8471 22",
  },
  lines: [
    { description: "Software Development Consultancy – May 2024", account: "4100 – Consulting Income", qty: 8, rate: 350, tax: 20 },
    { description: "Technical Architecture Review", account: "4200 – Service Revenue", qty: 2, rate: 500, tax: 20 },
    { description: "Travel Expenses – Bristol site visit", account: "4400 – Support & Maintenance", qty: 1, rate: 180, tax: 0 },
  ],
  discount: 0,
  notes: "Thank you for your business. Please reference invoice number on payment.",
  terms: "Payment due within 14 days. Please make payment by BACS. Late payments are subject to statutory interest.",
  payments: [] as { date: string; method: string; amount: number; ref: string }[],
}

const STATUS_CONFIG = {
  Draft:   { label: "Draft",   className: "bg-slate-100 text-slate-600" },
  Sent:    { label: "Sent",    className: "bg-blue-100 text-blue-700" },
  Partial: { label: "Partial", className: "bg-amber-100 text-amber-700" },
  Paid:    { label: "Paid",    className: "bg-emerald-100 text-emerald-700" },
  Overdue: { label: "Overdue", className: "bg-red-100 text-red-700" },
  Void:    { label: "Void",    className: "bg-gray-100 text-gray-500" },
}

function fmt(n: number) { return `£${n.toLocaleString("en-GB", { minimumFractionDigits: 2 })}` }

const subtotal = INVOICE.lines.reduce((s, l) => s + l.qty * l.rate, 0)
const tax = INVOICE.lines.reduce((s, l) => s + l.qty * l.rate * l.tax / 100, 0)
const total = subtotal + tax

const GL_ENTRIES = [
  { date: "04 Jun 2024", account: "1100 – Accounts Receivable", dr: total, cr: 0, ref: "INV-2024-0142" },
  { date: "04 Jun 2024", account: "4100 – Consulting Income",    dr: 0, cr: 2800, ref: "INV-2024-0142" },
  { date: "04 Jun 2024", account: "4200 – Service Revenue",      dr: 0, cr: 1000, ref: "INV-2024-0142" },
  { date: "04 Jun 2024", account: "4400 – Support & Maintenance",dr: 0, cr: 180,  ref: "INV-2024-0142" },
  { date: "04 Jun 2024", account: "2200 – VAT Control",          dr: 0, cr: tax,  ref: "INV-2024-0142" },
]

const ACTIVITY = [
  { date: "04 Jun 2024 09:12", user: "Sarah Mitchell", action: "Invoice created", icon: FileText, color: "text-blue-600" },
  { date: "04 Jun 2024 09:15", user: "Sarah Mitchell", action: "Invoice sent to accounts@meridiantech.co.uk", icon: Send, color: "text-violet-600" },
  { date: "18 Jun 2024 00:01", user: "System",         action: "Invoice marked as Overdue (14-day terms)", icon: AlertCircle, color: "text-red-600" },
]

export default function InvoiceDetailPage() {
  const params = useParams()
  const id = params.id as string
  const s = STATUS_CONFIG[INVOICE.status]
  const [activeTab, setActiveTab] = useState("summary")

  return (
    <div className="p-6 max-w-screen-2xl space-y-5">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/app/accounting/invoices"><ArrowLeft className="h-4 w-4" /></Link>
          </Button>
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-2xl font-semibold text-[var(--foreground)]">{INVOICE.id}</h1>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${s.className}`}>
                {s.label}
              </span>
            </div>
            <p className="text-sm text-[var(--muted-foreground)] mt-0.5">
              {INVOICE.customer.name} · Issued {INVOICE.issueDate} · Due {INVOICE.dueDate}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Button variant="outline" size="sm" className="gap-1.5">
            <Edit className="h-3.5 w-3.5" />Edit
          </Button>
          <Button variant="outline" size="sm" className="gap-1.5">
            <Send className="h-3.5 w-3.5" />Send Email
          </Button>
          <Button size="sm" className="gap-1.5">
            <CreditCard className="h-3.5 w-3.5" />Record Payment
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm"><MoreHorizontal className="h-4 w-4" /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44">
              <DropdownMenuItem className="gap-2"><Download className="h-3.5 w-3.5" />Download PDF</DropdownMenuItem>
              <DropdownMenuItem className="gap-2"><Copy className="h-3.5 w-3.5" />Duplicate</DropdownMenuItem>
              <DropdownMenuItem className="gap-2"><FileText className="h-3.5 w-3.5" />Credit Note</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="gap-2"><Archive className="h-3.5 w-3.5" />Archive</DropdownMenuItem>
              <DropdownMenuItem className="gap-2 text-red-600"><XCircle className="h-3.5 w-3.5" />Void Invoice</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Invoice Preview */}
      <Card className="border-2">
        <CardContent className="p-8">
          {/* Invoice Header */}
          <div className="flex justify-between items-start mb-8 flex-wrap gap-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-7 h-7 rounded-md bg-[var(--primary)] flex items-center justify-center">
                  <span className="text-white font-bold text-xs">O</span>
                </div>
                <span className="font-bold text-lg text-[var(--foreground)]">Orbas Ltd</span>
              </div>
              <div className="text-sm text-[var(--muted-foreground)] space-y-0.5">
                <p>1 Farringdon Street, London EC4A 1AJ</p>
                <p>accounts@orbas.co.uk · +44 20 1234 5678</p>
                <p>VAT No: GB 123 4567 89 · Co. No: 09876543</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-4xl font-black text-[var(--primary)] mb-2">INVOICE</p>
              <div className="text-sm space-y-0.5">
                <p><span className="text-[var(--muted-foreground)]">Invoice No: </span><strong>{INVOICE.id}</strong></p>
                <p><span className="text-[var(--muted-foreground)]">Issue Date: </span>{INVOICE.issueDate}</p>
                <p><span className="text-[var(--muted-foreground)]">Due Date: </span><strong className="text-red-600">{INVOICE.dueDate}</strong></p>
                <p><span className="text-[var(--muted-foreground)]">Reference: </span>{INVOICE.reference}</p>
              </div>
            </div>
          </div>

          {/* Bill To */}
          <div className="mb-6 bg-[var(--muted)]/40 rounded-lg p-4">
            <p className="text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wide mb-2">Bill To</p>
            <p className="font-semibold text-[var(--foreground)]">{INVOICE.customer.name}</p>
            <p className="text-sm text-[var(--muted-foreground)]">{INVOICE.customer.address}</p>
            <p className="text-sm text-[var(--muted-foreground)]">{INVOICE.customer.city}</p>
            <p className="text-sm text-[var(--muted-foreground)]">{INVOICE.customer.email}</p>
            <p className="text-sm text-[var(--muted-foreground)]">VAT No: {INVOICE.customer.vatNo}</p>
          </div>

          {/* Line Items */}
          <table className="w-full text-sm mb-6">
            <thead>
              <tr className="bg-[var(--primary)] text-white">
                <th className="text-left px-4 py-2.5 rounded-tl-md font-medium">Description</th>
                <th className="text-right px-3 py-2.5 font-medium">Qty</th>
                <th className="text-right px-3 py-2.5 font-medium">Rate</th>
                <th className="text-right px-3 py-2.5 font-medium">VAT</th>
                <th className="text-right px-4 py-2.5 rounded-tr-md font-medium">Amount</th>
              </tr>
            </thead>
            <tbody>
              {INVOICE.lines.map((line, idx) => (
                <tr key={idx} className={`border-b border-[var(--border)] ${idx % 2 === 1 ? "bg-[var(--muted)]/20" : ""}`}>
                  <td className="px-4 py-3">
                    <span className="font-medium text-[var(--foreground)]">{line.description}</span>
                    <br /><span className="text-xs text-[var(--muted-foreground)]">{line.account}</span>
                  </td>
                  <td className="text-right px-3 py-3">{line.qty}</td>
                  <td className="text-right px-3 py-3">{fmt(line.rate)}</td>
                  <td className="text-right px-3 py-3">{line.tax}%</td>
                  <td className="text-right px-4 py-3 font-medium">{fmt(line.qty * line.rate)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Totals */}
          <div className="flex justify-end mb-6">
            <div className="w-64 space-y-1.5 text-sm">
              <div className="flex justify-between"><span className="text-[var(--muted-foreground)]">Subtotal</span><span className="font-medium">{fmt(subtotal)}</span></div>
              <div className="flex justify-between"><span className="text-[var(--muted-foreground)]">VAT (20%)</span><span className="font-medium">{fmt(tax)}</span></div>
              <Separator />
              <div className="flex justify-between text-base font-bold"><span>Total Due</span><span className="text-[var(--primary)] text-lg">{fmt(total)}</span></div>
            </div>
          </div>

          {/* Notes */}
          <div className="text-xs text-[var(--muted-foreground)] border-t border-[var(--border)] pt-4 space-y-1">
            <p className="font-medium text-[var(--foreground)]">Payment Instructions</p>
            <p>Bank: Barclays Business · Sort Code: 20-00-00 · Account: 12345678 · Ref: {INVOICE.id}</p>
            <p className="mt-2">{INVOICE.terms}</p>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-[var(--muted)]/40 p-1">
          {["summary","lines","payments","ledger","documents","emails","activity","audit"].map(tab => (
            <TabsTrigger key={tab} value={tab} className="text-xs capitalize px-3">
              {tab === "ledger" ? "Ledger Impact" : tab}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="summary" className="mt-4">
          <Card>
            <CardContent className="pt-5 grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
              {[
                { label: "Customer",      value: INVOICE.customer.name },
                { label: "Invoice No",    value: INVOICE.id },
                { label: "Issue Date",    value: INVOICE.issueDate },
                { label: "Due Date",      value: INVOICE.dueDate },
                { label: "Reference",     value: INVOICE.reference },
                { label: "Subtotal",      value: fmt(subtotal) },
                { label: "VAT",           value: fmt(tax) },
                { label: "Total",         value: fmt(total) },
                { label: "Amount Paid",   value: fmt(0) },
                { label: "Balance Due",   value: fmt(total) },
                { label: "Status",        value: INVOICE.status },
                { label: "Currency",      value: "GBP £" },
              ].map(f => (
                <div key={f.label}>
                  <p className="text-xs text-[var(--muted-foreground)] font-medium">{f.label}</p>
                  <p className="font-semibold mt-0.5">{f.value}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="lines" className="mt-4">
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Description</TableHead>
                  <TableHead>Account</TableHead>
                  <TableHead className="text-right">Qty</TableHead>
                  <TableHead className="text-right">Rate</TableHead>
                  <TableHead className="text-right">Tax</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {INVOICE.lines.map((l, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium">{l.description}</TableCell>
                    <TableCell className="text-[var(--muted-foreground)] text-sm">{l.account}</TableCell>
                    <TableCell className="text-right">{l.qty}</TableCell>
                    <TableCell className="text-right">{fmt(l.rate)}</TableCell>
                    <TableCell className="text-right">{l.tax}%</TableCell>
                    <TableCell className="text-right font-semibold">{fmt(l.qty * l.rate)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="payments" className="mt-4">
          <Card>
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <CardTitle className="text-base">Payment History</CardTitle>
              <Button size="sm" className="gap-1.5">
                <Plus className="h-4 w-4" />Record Payment
              </Button>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <AlertCircle className="h-10 w-10 text-red-400 mb-3" />
                <p className="font-medium text-[var(--foreground)]">No payments recorded</p>
                <p className="text-sm text-[var(--muted-foreground)] mt-1">{fmt(total)} outstanding · Due {INVOICE.dueDate}</p>
                <Button size="sm" className="mt-4 gap-1.5">
                  <CreditCard className="h-4 w-4" />Record Payment
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ledger" className="mt-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">General Ledger Entries</CardTitle>
            </CardHeader>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Account</TableHead>
                  <TableHead>Reference</TableHead>
                  <TableHead className="text-right">Debit</TableHead>
                  <TableHead className="text-right">Credit</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {GL_ENTRIES.map((e, i) => (
                  <TableRow key={i}>
                    <TableCell className="text-sm">{e.date}</TableCell>
                    <TableCell className="text-sm font-medium">{e.account}</TableCell>
                    <TableCell className="text-sm text-[var(--muted-foreground)]">{e.ref}</TableCell>
                    <TableCell className="text-right text-sm">{e.dr > 0 ? fmt(e.dr) : "—"}</TableCell>
                    <TableCell className="text-right text-sm">{e.cr > 0 ? fmt(e.cr) : "—"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="mt-4">
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <FileText className="h-10 w-10 text-[var(--muted-foreground)] mb-3" />
              <p className="font-medium">No documents attached</p>
              <Button variant="outline" size="sm" className="mt-4">Upload Document</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="emails" className="mt-4">
          <Card>
            <CardContent className="pt-5">
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--muted)]/40">
                  <Send className="h-4 w-4 text-violet-500 mt-0.5 shrink-0" />
                  <div className="text-sm">
                    <p className="font-medium">Invoice sent to accounts@meridiantech.co.uk</p>
                    <p className="text-[var(--muted-foreground)] text-xs mt-0.5">04 Jun 2024 09:15 · Delivered · Opened 04 Jun 09:32</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="mt-4">
          <Card>
            <CardContent className="pt-5">
              <div className="space-y-4">
                {ACTIVITY.map((a, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className={`mt-0.5 ${a.color}`}><a.icon className="h-4 w-4" /></div>
                    <div className="text-sm">
                      <p className="font-medium text-[var(--foreground)]">{a.action}</p>
                      <p className="text-xs text-[var(--muted-foreground)]">{a.date} · {a.user}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audit" className="mt-4">
          <Card>
            <CardContent className="pt-5">
              <div className="space-y-3 text-sm">
                <div className="flex gap-4 py-2 border-b border-[var(--border)]">
                  <span className="text-[var(--muted-foreground)] w-40">Created</span>
                  <span>04 Jun 2024 09:12 · Sarah Mitchell</span>
                </div>
                <div className="flex gap-4 py-2 border-b border-[var(--border)]">
                  <span className="text-[var(--muted-foreground)] w-40">Last Modified</span>
                  <span>04 Jun 2024 09:15 · Sarah Mitchell</span>
                </div>
                <div className="flex gap-4 py-2">
                  <span className="text-[var(--muted-foreground)] w-40">Status Changed</span>
                  <span>18 Jun 2024 00:01 · System (auto-overdue)</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
