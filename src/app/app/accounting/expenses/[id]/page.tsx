"use client"

import React, { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Edit, CheckCircle2, XCircle, Upload, Receipt } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

const EXPENSE = {
  id: "EXP-001",
  date: "08 Jun 2024",
  description: "Client lunch – Meridian Tech Ltd",
  category: "Entertainment",
  amount: 186.40,
  submittedBy: "Sarah Mitchell",
  hasReceipt: true,
  status: "Approved" as const,
  notes: "Lunch with Meridian Tech procurement team to discuss Q3 renewal. 4 attendees.",
  glAccount: "7400 – Entertainment & Hospitality",
}

const STATUS_CONFIG = {
  Draft:     { label: "Draft",     className: "bg-slate-100 text-slate-600" },
  Submitted: { label: "Submitted", className: "bg-blue-100 text-blue-700" },
  Approved:  { label: "Approved",  className: "bg-violet-100 text-violet-700" },
  Rejected:  { label: "Rejected",  className: "bg-red-100 text-red-700" },
  Paid:      { label: "Paid",      className: "bg-emerald-100 text-emerald-700" },
}

function fmt(n: number) { return `£${n.toLocaleString("en-GB", { minimumFractionDigits: 2 })}` }

export default function ExpenseDetailPage() {
  const s = STATUS_CONFIG[EXPENSE.status]
  const [tab, setTab] = useState("summary")

  return (
    <div className="p-6 max-w-screen-2xl space-y-5">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/app/accounting/expenses"><ArrowLeft className="h-4 w-4" /></Link>
          </Button>
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-2xl font-semibold">{EXPENSE.id}</h1>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${s.className}`}>{s.label}</span>
            </div>
            <p className="text-sm text-[var(--muted-foreground)] mt-0.5">
              {EXPENSE.submittedBy} · {EXPENSE.date} · {EXPENSE.category}
            </p>
          </div>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button variant="outline" size="sm" className="gap-1.5"><Edit className="h-3.5 w-3.5" />Edit</Button>
          <Button variant="outline" size="sm" className="gap-1.5 text-emerald-600 border-emerald-200 hover:bg-emerald-50">
            <CheckCircle2 className="h-3.5 w-3.5" />Approve
          </Button>
          <Button variant="outline" size="sm" className="gap-1.5 text-red-600 border-red-200 hover:bg-red-50">
            <XCircle className="h-3.5 w-3.5" />Reject
          </Button>
        </div>
      </div>

      <Card className="border-2">
        <CardContent className="pt-5">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-3xl font-black text-[var(--primary)]">{fmt(EXPENSE.amount)}</p>
              <p className="text-sm font-medium mt-1">{EXPENSE.description}</p>
              <p className="text-xs text-[var(--muted-foreground)] mt-0.5">{EXPENSE.glAccount}</p>
            </div>
            <div className="text-right text-sm space-y-0.5">
              <p><span className="text-[var(--muted-foreground)]">Date: </span>{EXPENSE.date}</p>
              <p><span className="text-[var(--muted-foreground)]">Category: </span>{EXPENSE.category}</p>
              <p><span className="text-[var(--muted-foreground)]">Submitted by: </span>{EXPENSE.submittedBy}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="bg-[var(--muted)]/40 p-1">
          {["summary","receipt","approval","accounting","audit"].map(t => (
            <TabsTrigger key={t} value={t} className="text-xs capitalize px-3">{t}</TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="summary" className="mt-4">
          <Card>
            <CardContent className="pt-5 grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
              {[
                { label: "Expense ID",    value: EXPENSE.id },
                { label: "Description",   value: EXPENSE.description },
                { label: "Date",          value: EXPENSE.date },
                { label: "Category",      value: EXPENSE.category },
                { label: "Amount",        value: fmt(EXPENSE.amount) },
                { label: "Submitted By",  value: EXPENSE.submittedBy },
                { label: "Status",        value: EXPENSE.status },
                { label: "GL Account",    value: EXPENSE.glAccount },
                { label: "Receipt",       value: EXPENSE.hasReceipt ? "Attached" : "Missing" },
              ].map(f => (
                <div key={f.label}>
                  <p className="text-xs text-[var(--muted-foreground)] font-medium">{f.label}</p>
                  <p className="font-semibold mt-0.5">{f.value}</p>
                </div>
              ))}
              {EXPENSE.notes && (
                <div className="col-span-2 sm:col-span-3">
                  <p className="text-xs text-[var(--muted-foreground)] font-medium">Notes</p>
                  <p className="text-sm mt-0.5">{EXPENSE.notes}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="receipt" className="mt-4">
          <Card>
            <CardContent className="pt-5">
              {EXPENSE.hasReceipt ? (
                <div className="flex flex-col items-center justify-center py-10 border-2 border-dashed border-[var(--border)] rounded-lg">
                  <Receipt className="h-12 w-12 text-[var(--muted-foreground)]/50 mb-3" />
                  <p className="font-medium text-sm">receipt_EXP-001.pdf</p>
                  <p className="text-xs text-[var(--muted-foreground)] mt-1">Uploaded 08 Jun 2024</p>
                  <Button variant="outline" size="sm" className="mt-4">Download Receipt</Button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-10 border-2 border-dashed border-amber-300 rounded-lg bg-amber-50">
                  <Receipt className="h-12 w-12 text-amber-400 mb-3" />
                  <p className="font-medium text-sm text-amber-800">No receipt attached</p>
                  <Button size="sm" className="mt-4 gap-1.5"><Upload className="h-4 w-4" />Upload Receipt</Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="approval" className="mt-4">
          <Card>
            <CardContent className="pt-5 space-y-4">
              <div className="flex items-center gap-4 p-4 bg-violet-50 rounded-lg">
                <CheckCircle2 className="h-5 w-5 text-violet-600 shrink-0" />
                <div className="text-sm">
                  <p className="font-medium">Approved by James Holloway</p>
                  <p className="text-[var(--muted-foreground)] text-xs">Finance Manager · 09 Jun 2024 10:15</p>
                </div>
              </div>
              <div className="space-y-1.5">
                <Label>Approval Notes</Label>
                <Textarea defaultValue="Approved. Valid business expense for client retention." rows={2} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="accounting" className="mt-4">
          <Card>
            <CardContent className="pt-5 space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-4">
                <div><p className="text-xs text-[var(--muted-foreground)] font-medium">GL Account</p><p className="font-semibold mt-0.5">{EXPENSE.glAccount}</p></div>
                <div><p className="text-xs text-[var(--muted-foreground)] font-medium">VAT Code</p><p className="font-semibold mt-0.5">T1 – Standard Rated (20%)</p></div>
                <div><p className="text-xs text-[var(--muted-foreground)] font-medium">Net Amount</p><p className="font-semibold mt-0.5">£155.33</p></div>
                <div><p className="text-xs text-[var(--muted-foreground)] font-medium">VAT Amount</p><p className="font-semibold mt-0.5">£31.07</p></div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audit" className="mt-4">
          <Card>
            <CardContent className="pt-5 space-y-3 text-sm">
              <div className="flex gap-4 py-2 border-b border-[var(--border)]"><span className="text-[var(--muted-foreground)] w-40">Submitted</span><span>08 Jun 2024 · Sarah Mitchell</span></div>
              <div className="flex gap-4 py-2"><span className="text-[var(--muted-foreground)] w-40">Approved</span><span>09 Jun 2024 · James Holloway</span></div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
