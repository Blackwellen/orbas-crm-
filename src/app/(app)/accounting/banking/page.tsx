"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Plus, Upload, Landmark, RefreshCw, AlertCircle, TrendingUp, TrendingDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface BankAccount {
  id: string
  name: string
  bank: string
  type: string
  balance: number
  currency: string
  sortCode: string
  accountNo: string
  unreconciled: number
  lastUpdated: string
  trend: "up" | "down" | "flat"
  trendAmt: number
}

const ACCOUNTS: BankAccount[] = [
  {
    id: "ba-001",
    name: "Orbas Main Current",
    bank: "Barclays Business",
    type: "Current Account",
    balance: 87420.50,
    currency: "GBP",
    sortCode: "20-00-00",
    accountNo: "12345678",
    unreconciled: 14,
    lastUpdated: "10 Jun 2024, 08:45",
    trend: "up",
    trendAmt: 12300,
  },
  {
    id: "ba-002",
    name: "Operations Reserve",
    bank: "HSBC Business",
    type: "Savings Account",
    balance: 50000.00,
    currency: "GBP",
    sortCode: "40-00-00",
    accountNo: "87654321",
    unreconciled: 2,
    lastUpdated: "09 Jun 2024, 17:00",
    trend: "flat",
    trendAmt: 0,
  },
  {
    id: "ba-003",
    name: "EUR Client Receipts",
    bank: "Wise Business",
    type: "Multi-currency",
    balance: 19320.00,
    currency: "EUR",
    sortCode: "—",
    accountNo: "GB29 WISE ...",
    unreconciled: 7,
    lastUpdated: "10 Jun 2024, 06:00",
    trend: "down",
    trendAmt: -1200,
  },
  {
    id: "ba-004",
    name: "Payroll Account",
    bank: "NatWest Business",
    type: "Current Account",
    balance: 0,
    currency: "GBP",
    sortCode: "60-00-00",
    accountNo: "11223344",
    unreconciled: 0,
    lastUpdated: "01 Jun 2024, 09:00",
    trend: "flat",
    trendAmt: 0,
  },
]

function fmtBal(n: number, cur: string) {
  const sym = cur === "EUR" ? "€" : "£"
  return `${sym}${n.toLocaleString("en-GB", { minimumFractionDigits: 2 })}`
}

export default function BankingPage() {
  const [addOpen, setAddOpen] = useState(false)

  const totalGBP = ACCOUNTS
    .filter(a => a.currency === "GBP")
    .reduce((s, a) => s + a.balance, 0)

  return (
    <div className="p-6 space-y-6 max-w-screen-2xl">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-semibold text-[var(--foreground)]">Banking</h1>
          <p className="text-sm text-[var(--muted-foreground)] mt-0.5">
            {ACCOUNTS.length} accounts · GBP total £{totalGBP.toLocaleString("en-GB", { minimumFractionDigits: 2 })}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-1.5">
            <Upload className="h-3.5 w-3.5" />Import Statement
          </Button>
          <Button size="sm" className="gap-1.5" onClick={() => setAddOpen(true)}>
            <Plus className="h-4 w-4" />Add Bank Account
          </Button>
        </div>
      </div>

      {/* Account Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-4">
        {ACCOUNTS.map(acc => (
          <Link key={acc.id} href={`/app/accounting/banking/${acc.id}`}>
            <Card className="hover:border-[var(--primary)]/40 hover:shadow-md transition-all cursor-pointer group">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[var(--primary)]/10 flex items-center justify-center">
                      <Landmark className="h-5 w-5 text-[var(--primary)]" />
                    </div>
                    <div>
                      <p className="font-semibold text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">
                        {acc.name}
                      </p>
                      <p className="text-xs text-[var(--muted-foreground)]">{acc.bank} · {acc.type}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">{acc.currency}</Badge>
                </div>

                <div className="mb-4">
                  <p className="text-3xl font-black text-[var(--foreground)]">{fmtBal(acc.balance, acc.currency)}</p>
                  <div className="flex items-center gap-1.5 mt-1">
                    {acc.trend === "up" && <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />}
                    {acc.trend === "down" && <TrendingDown className="h-3.5 w-3.5 text-red-500" />}
                    <span className={`text-xs font-medium ${acc.trend === "up" ? "text-emerald-600" : acc.trend === "down" ? "text-red-600" : "text-[var(--muted-foreground)]"}`}>
                      {acc.trend === "up" ? "+" : ""}{acc.trendAmt !== 0 ? fmtBal(acc.trendAmt, acc.currency) : "No change"} this month
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-[var(--muted-foreground)] border-t border-[var(--border)] pt-3">
                  <div className="flex items-center gap-1.5">
                    {acc.unreconciled > 0 ? (
                      <>
                        <AlertCircle className="h-3.5 w-3.5 text-amber-500" />
                        <span className="text-amber-600 font-medium">{acc.unreconciled} unreconciled</span>
                      </>
                    ) : (
                      <span className="text-emerald-600 font-medium">All reconciled</span>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <RefreshCw className="h-3 w-3" />
                    <span>{acc.lastUpdated}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Add Bank Account Dialog */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Bank Account</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label>Account Name</Label>
              <Input placeholder="e.g. Barclays Main Current" />
            </div>
            <div className="space-y-1.5">
              <Label>Bank Name</Label>
              <Input placeholder="e.g. Barclays Business" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Account Type</Label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="current">Current Account</SelectItem>
                    <SelectItem value="savings">Savings Account</SelectItem>
                    <SelectItem value="credit">Credit Card</SelectItem>
                    <SelectItem value="loan">Loan Account</SelectItem>
                    <SelectItem value="multi">Multi-currency</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Currency</Label>
                <Select defaultValue="GBP">
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="GBP">GBP £</SelectItem>
                    <SelectItem value="EUR">EUR €</SelectItem>
                    <SelectItem value="USD">USD $</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5"><Label>Sort Code</Label><Input placeholder="20-00-00" /></div>
              <div className="space-y-1.5"><Label>Account Number</Label><Input placeholder="12345678" /></div>
            </div>
            <div className="space-y-1.5">
              <Label>Opening Balance (£)</Label>
              <Input type="number" placeholder="0.00" step="0.01" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddOpen(false)}>Cancel</Button>
            <Button onClick={() => setAddOpen(false)}>Add Account</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
