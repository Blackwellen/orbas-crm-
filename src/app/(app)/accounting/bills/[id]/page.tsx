"use client"

import React, { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Edit, CheckCircle2, XCircle, CreditCard, MoreHorizontal, FileText, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Separator } from "@/components/ui/separator"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Textarea } from "@/components/ui/textarea"

const BILL = {
  id: "BILL-2024-0088",
  status: "Approved" as const,
  supplier: "AWS UK Ltd",
  date: "01 Jun 2024",
  due: "30 Jun 2024",
  reference: "AWS-INV-Q2-2024",
  lines: [
    { description: "EC2 Compute – May 2024",    account: "6100 – IT & Software", qty: 1, rate: 1840, tax: 20 },
    { description: "S3 Storage – May 2024",      account: "6100 – IT & Software", qty: 1, rate: 420,  tax: 20 },
    { description: "CloudFront CDN – May 2024",  account: "6100 – IT & Software", qty: 1, rate: 720,  tax: 20 },
    { description: "Support Plan – Business",    account: "6100 – IT & Software", qty: 1, rate: 440,  tax: 20 },
  ],
}

const STATUS_CONFIG = {
  Draft:    { label: "Draft",    className: "bg-slate-100 text-slate-600" },
  Received: { label: "Received", className: "bg-blue-100 text-blue-700" },
  Approved: { label: "Approved", className: "bg-violet-100 text-violet-700" },
  Paid:     { label: "Paid",     className: "bg-emerald-100 text-emerald-700" },
  Overdue:  { label: "Overdue",  className: "bg-red-100 text-red-700" },
}

function fmt(n: number) { return `£${n.toLocaleString("en-GB", { minimumFractionDigits: 2 })}` }
const subtotal = BILL.lines.reduce((s, l) => s + l.qty * l.rate, 0)
const tax = BILL.lines.reduce((s, l) => s + l.qty * l.rate * l.tax / 100, 0)
const total = subtotal + tax

export default function BillDetailPage() {
  const s = STATUS_CONFIG[BILL.status]
  const [tab, setTab] = useState("summary")

  return (
    <div className="p-6 max-w-screen-2xl space-y-5">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/app/accounting/bills"><ArrowLeft className="h-4 w-4" /></Link>
          </Button>
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-2xl font-semibold">{BILL.id}</h1>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${s.className}`}>{s.label}</span>
            </div>
            <p className="text-sm text-[var(--muted-foreground)] mt-0.5">{BILL.supplier} · {BILL.date} · Due {BILL.due}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Button variant="outline" size="sm" className="gap-1.5"><Edit className="h-3.5 w-3.5" />Edit</Button>
          <Button size="sm" className="gap-1.5"><CreditCard className="h-3.5 w-3.5" />Record Payment</Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm"><MoreHorizontal className="h-4 w-4" /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem className="gap-2"><FileText className="h-3.5 w-3.5" />Download PDF</DropdownMenuItem>
              <DropdownMenuItem className="gap-2 text-red-600"><XCircle className="h-3.5 w-3.5" />Void Bill</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Subtotal",    value: fmt(subtotal) },
          { label: "VAT",         value: fmt(tax) },
          { label: "Total",       value: fmt(total) },
          { label: "Balance Due", value: fmt(total) },
        ].map(k => (
          <Card key={k.label}>
            <CardContent className="pt-4 pb-4">
              <p className="text-xs text-[var(--muted-foreground)]">{k.label}</p>
              <p className="text-xl font-bold mt-1">{k.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="bg-[var(--muted)]/40 p-1">
          {["summary","lines","approvals","payments","documents","audit"].map(t => (
            <TabsTrigger key={t} value={t} className="text-xs capitalize px-3">{t}</TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="summary" className="mt-4">
          <Card>
            <CardContent className="pt-5 grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
              {[
                { label: "Supplier",    value: BILL.supplier },
                { label: "Bill No",     value: BILL.id },
                { label: "Bill Date",   value: BILL.date },
                { label: "Due Date",    value: BILL.due },
                { label: "Reference",   value: BILL.reference },
                { label: "Total",       value: fmt(total) },
                { label: "Status",      value: BILL.status },
                { label: "Currency",    value: "GBP £" },
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
                {BILL.lines.map((l, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium">{l.description}</TableCell>
                    <TableCell className="text-[var(--muted-foreground)] text-sm">{l.account}</TableCell>
                    <TableCell className="text-right">{l.qty}</TableCell>
                    <TableCell className="text-right">{fmt(l.rate)}</TableCell>
                    <TableCell className="text-right">{l.tax}%</TableCell>
                    <TableCell className="text-right font-semibold">{fmt(l.qty * l.rate)}</TableCell>
                  </TableRow>
                ))}
                <TableRow className="bg-[var(--muted)]/30 font-semibold">
                  <TableCell colSpan={5} className="text-right">Total</TableCell>
                  <TableCell className="text-right text-[var(--primary)]">{fmt(total)}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="approvals" className="mt-4">
          <Card>
            <CardHeader className="pb-3"><CardTitle className="text-base">Approval Workflow</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-[var(--muted)]/40 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-violet-100 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="h-4 w-4 text-violet-600" />
                </div>
                <div className="flex-1 text-sm">
                  <p className="font-medium">Approved by James Holloway</p>
                  <p className="text-[var(--muted-foreground)] text-xs">Finance Manager · 02 Jun 2024 11:30</p>
                </div>
                <span className="text-xs font-medium bg-violet-100 text-violet-700 px-2 py-0.5 rounded-full">Approved</span>
              </div>
              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="gap-1.5 text-red-600 border-red-200 hover:bg-red-50">
                  <XCircle className="h-4 w-4" />Reject
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments" className="mt-4">
          <Card>
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <CardTitle className="text-base">Payments</CardTitle>
              <Button size="sm" className="gap-1.5"><Plus className="h-4 w-4" />Record Payment</Button>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-[var(--muted-foreground)]">
                <CreditCard className="h-8 w-8 mx-auto mb-2 opacity-40" />
                <p className="text-sm">No payments recorded</p>
                <p className="text-xs mt-1">{fmt(total)} outstanding</p>
              </div>
            </CardContent>
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

        <TabsContent value="audit" className="mt-4">
          <Card>
            <CardContent className="pt-5 space-y-3 text-sm">
              <div className="flex gap-4 py-2 border-b border-[var(--border)]">
                <span className="text-[var(--muted-foreground)] w-40">Received</span>
                <span>01 Jun 2024 · James Holloway</span>
              </div>
              <div className="flex gap-4 py-2">
                <span className="text-[var(--muted-foreground)] w-40">Approved</span>
                <span>02 Jun 2024 · James Holloway</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
