"use client"

import React, { useState } from "react"
import { Plus, Search, Download, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Payment {
  date: string
  type: string
  reference: string
  party: string
  amount: number
  method: string
  linked: string
  status: string
}

const RECEIVED: Payment[] = [
  { date: "10 Jun 2024", type: "Invoice Payment", reference: "BACS-8821",   party: "Meridian Tech Ltd",    amount: 7650,  method: "BACS",        linked: "INV-2024-0140", status: "Cleared" },
  { date: "09 Jun 2024", type: "Invoice Payment", reference: "BACS-8820",   party: "Kensington AI Ltd",    amount: 3400,  method: "BACS",        linked: "INV-2024-0137", status: "Cleared" },
  { date: "07 Jun 2024", type: "Invoice Payment", reference: "CHQ-1044",    party: "Regency Systems",      amount: 8900,  method: "Cheque",      linked: "INV-2024-0135", status: "Cleared" },
  { date: "03 Jun 2024", type: "Invoice Payment", reference: "BACS-8818",   party: "Croydon Fabrications", amount: 3750,  method: "BACS",        linked: "INV-2024-0133", status: "Cleared" },
  { date: "31 May 2024", type: "Invoice Payment", reference: "BACS-8810",   party: "Westminster Logistics",amount: 6400,  method: "BACS",        linked: "INV-2024-0130", status: "Cleared" },
  { date: "28 May 2024", type: "Partial Payment", reference: "BACS-8808",   party: "Stratford Solutions",  amount: 1000,  method: "BACS",        linked: "INV-2024-0139", status: "Cleared" },
  { date: "25 May 2024", type: "Deposit",         reference: "STR-0042",    party: "Camden Creative",      amount: 2400,  method: "Stripe",      linked: "INV-2024-0128", status: "Cleared" },
]

const SENT: Payment[] = [
  { date: "10 Jun 2024", type: "Bill Payment",    reference: "BP-0221",     party: "AWS UK Ltd",           amount: 4104,  method: "BACS",        linked: "BILL-2024-0088", status: "Cleared" },
  { date: "01 Jun 2024", type: "Bill Payment",    reference: "BP-0220",     party: "Office Space Partners",amount: 8500,  method: "BACS",        linked: "BILL-2024-0087", status: "Cleared" },
  { date: "07 Jun 2024", type: "Payroll",         reference: "PAYROLL-JUN", party: "All Staff",            amount: 38240, method: "BACS",        linked: "Payroll Jun 2024", status: "Cleared" },
  { date: "30 May 2024", type: "Tax",             reference: "HMRC-CT-Q1",  party: "HMRC",                 amount: 8200,  method: "BACS",        linked: "Corp Tax Q1",   status: "Cleared" },
  { date: "27 May 2024", type: "Bill Payment",    reference: "BP-0218",     party: "Citylink Courier",     amount: 456,   method: "BACS",        linked: "BILL-2024-0083", status: "Cleared" },
  { date: "24 May 2024", type: "Bill Payment",    reference: "BP-0217",     party: "Peninsula HR",         amount: 2520,  method: "BACS",        linked: "BILL-2024-0082", status: "Cleared" },
]

const METHOD_COLORS: Record<string, string> = {
  BACS:   "bg-blue-100 text-blue-700",
  Cheque: "bg-amber-100 text-amber-700",
  Stripe: "bg-violet-100 text-violet-700",
  Card:   "bg-cyan-100 text-cyan-700",
  Cash:   "bg-emerald-100 text-emerald-700",
}

function fmt(n: number) { return `£${n.toLocaleString("en-GB", { minimumFractionDigits: 2 })}` }

export default function PaymentsPage() {
  const [search, setSearch] = useState("")
  const [newPaymentOpen, setNewPaymentOpen] = useState(false)

  function filterPayments(payments: Payment[]) {
    return payments.filter(p =>
      p.party.toLowerCase().includes(search.toLowerCase()) ||
      p.reference.toLowerCase().includes(search.toLowerCase())
    )
  }

  function PaymentsTable({ payments }: { payments: Payment[] }) {
    return (
      <Card className="overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-[var(--muted)]/40">
              <TableHead className="text-xs uppercase tracking-wide text-[var(--muted-foreground)] font-semibold">Date</TableHead>
              <TableHead className="text-xs uppercase tracking-wide text-[var(--muted-foreground)] font-semibold">Type</TableHead>
              <TableHead className="hidden md:table-cell text-xs uppercase tracking-wide text-[var(--muted-foreground)] font-semibold">Reference</TableHead>
              <TableHead className="text-xs uppercase tracking-wide text-[var(--muted-foreground)] font-semibold">Party</TableHead>
              <TableHead className="text-right text-xs uppercase tracking-wide text-[var(--muted-foreground)] font-semibold">Amount</TableHead>
              <TableHead className="hidden md:table-cell text-xs uppercase tracking-wide text-[var(--muted-foreground)] font-semibold">Method</TableHead>
              <TableHead className="hidden lg:table-cell text-xs uppercase tracking-wide text-[var(--muted-foreground)] font-semibold">Linked To</TableHead>
              <TableHead className="text-xs uppercase tracking-wide text-[var(--muted-foreground)] font-semibold">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.map((p, i) => (
              <TableRow key={i} className="hover:bg-[var(--muted)]/40">
                <TableCell className="text-sm text-[var(--muted-foreground)] whitespace-nowrap">{p.date}</TableCell>
                <TableCell className="text-sm font-medium">{p.type}</TableCell>
                <TableCell className="hidden md:table-cell text-sm text-[var(--muted-foreground)]">{p.reference}</TableCell>
                <TableCell className="text-sm">{p.party}</TableCell>
                <TableCell className="text-right text-sm font-semibold">{fmt(p.amount)}</TableCell>
                <TableCell className="hidden md:table-cell">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${METHOD_COLORS[p.method] || "bg-gray-100 text-gray-600"}`}>
                    {p.method}
                  </span>
                </TableCell>
                <TableCell className="hidden lg:table-cell text-xs text-[var(--muted-foreground)]">{p.linked}</TableCell>
                <TableCell>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
                    {p.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    )
  }

  return (
    <div className="p-6 space-y-5 max-w-screen-2xl">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Payments</h1>
          <p className="text-sm text-[var(--muted-foreground)] mt-0.5">All received and sent payments</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-1.5"><Download className="h-3.5 w-3.5" />Export</Button>
          <Button size="sm" className="gap-1.5" onClick={() => setNewPaymentOpen(true)}>
            <Plus className="h-4 w-4" />New Payment
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1 min-w-48 max-w-xs">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-[var(--muted-foreground)]" />
          <Input placeholder="Search payments…" className="pl-8 h-9 text-sm" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <Button variant="outline" size="sm" className="h-9 gap-1.5"><Filter className="h-3.5 w-3.5" />Filters</Button>
      </div>

      <Tabs defaultValue="received">
        <TabsList className="bg-[var(--muted)]/40 p-1">
          <TabsTrigger value="received" className="text-xs px-4">Received ({RECEIVED.length})</TabsTrigger>
          <TabsTrigger value="sent" className="text-xs px-4">Sent ({SENT.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="received" className="mt-4">
          <PaymentsTable payments={filterPayments(RECEIVED)} />
        </TabsContent>
        <TabsContent value="sent" className="mt-4">
          <PaymentsTable payments={filterPayments(SENT)} />
        </TabsContent>
      </Tabs>

      <Dialog open={newPaymentOpen} onOpenChange={setNewPaymentOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader><DialogTitle>Record Payment</DialogTitle></DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label>Payment Type</Label>
              <Select>
                <SelectTrigger><SelectValue placeholder="Select type…" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="received">Invoice Payment (Received)</SelectItem>
                  <SelectItem value="sent">Bill Payment (Sent)</SelectItem>
                  <SelectItem value="payroll">Payroll</SelectItem>
                  <SelectItem value="tax">Tax Payment</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5"><Label>Date</Label><Input type="date" defaultValue="2024-06-10" /></div>
              <div className="space-y-1.5"><Label>Amount (£)</Label><Input type="number" placeholder="0.00" step="0.01" /></div>
            </div>
            <div className="space-y-1.5">
              <Label>Payment Method</Label>
              <Select>
                <SelectTrigger><SelectValue placeholder="Select method…" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="bacs">BACS</SelectItem>
                  <SelectItem value="cheque">Cheque</SelectItem>
                  <SelectItem value="card">Debit/Credit Card</SelectItem>
                  <SelectItem value="stripe">Stripe</SelectItem>
                  <SelectItem value="cash">Cash</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5"><Label>Reference</Label><Input placeholder="BACS ref, cheque no…" /></div>
            <div className="space-y-1.5"><Label>Bank Account</Label>
              <Select>
                <SelectTrigger><SelectValue placeholder="Select bank account…" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="main">Orbas Main Current (Barclays)</SelectItem>
                  <SelectItem value="reserve">Operations Reserve (HSBC)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewPaymentOpen(false)}>Cancel</Button>
            <Button onClick={() => setNewPaymentOpen(false)}>Record Payment</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
