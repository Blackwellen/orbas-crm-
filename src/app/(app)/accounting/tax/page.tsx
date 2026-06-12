"use client"

import React, { useState } from "react"
import { Plus, CheckCircle2, AlertCircle, Link2, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface VATReturn {
  period: string
  due: string
  status: string
  vatDue: number
  filed: string | null
}

const VAT_RETURNS: VATReturn[] = [
  { period: "Q1 2024 (Jan–Mar)", due: "07 May 2024", status: "Filed",    vatDue: 18420, filed: "02 May 2024" },
  { period: "Q4 2023 (Oct–Dec)", due: "07 Feb 2024", status: "Filed",    vatDue: 16840, filed: "31 Jan 2024" },
  { period: "Q3 2023 (Jul–Sep)", due: "07 Nov 2023", status: "Filed",    vatDue: 14260, filed: "03 Nov 2023" },
  { period: "Q2 2024 (Apr–Jun)", due: "07 Aug 2024", status: "Pending",  vatDue: 22340, filed: null },
]

interface TaxRate {
  name: string
  rate: number
  type: string
  active: boolean
}

const TAX_RATES: TaxRate[] = [
  { name: "Standard Rate",   rate: 20, type: "VAT",  active: true },
  { name: "Reduced Rate",    rate: 5,  type: "VAT",  active: true },
  { name: "Zero Rated",      rate: 0,  type: "VAT",  active: true },
  { name: "Exempt",          rate: 0,  type: "VAT",  active: true },
  { name: "Outside Scope",   rate: 0,  type: "VAT",  active: true },
  { name: "EC Acquisitions", rate: 0,  type: "VAT",  active: false },
  { name: "Reverse Charge",  rate: 20, type: "VAT",  active: false },
]

const STATUS_CONFIG: Record<string, string> = {
  Filed:   "bg-emerald-100 text-emerald-700",
  Pending: "bg-amber-100 text-amber-700",
  Overdue: "bg-red-100 text-red-700",
  Draft:   "bg-slate-100 text-slate-600",
}

function fmt(n: number) { return `£${n.toLocaleString("en-GB", { minimumFractionDigits: 2 })}` }

export default function TaxPage() {
  const [rates, setRates] = useState(TAX_RATES)
  const [addOpen, setAddOpen] = useState(false)

  const pendingReturn = VAT_RETURNS.find(r => r.status === "Pending")

  return (
    <div className="p-6 space-y-5 max-w-screen-2xl">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Tax / VAT</h1>
          <p className="text-sm text-[var(--muted-foreground)] mt-0.5">VAT returns, rates and HMRC connection</p>
        </div>
        {pendingReturn && (
          <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-lg px-4 py-2">
            <AlertCircle className="h-4 w-4 text-amber-500 shrink-0" />
            <span className="text-sm text-amber-800">
              {pendingReturn.period} return due <strong>{pendingReturn.due}</strong>
            </span>
            <Button size="sm" className="ml-2 h-7 text-xs">Submit Return</Button>
          </div>
        )}
      </div>

      <Tabs defaultValue="returns">
        <TabsList className="bg-[var(--muted)]/40 p-1">
          {["returns","rates","hmrc","adjustments"].map(t => (
            <TabsTrigger key={t} value={t} className="text-xs capitalize px-4">{t === "hmrc" ? "HMRC Connection" : t}</TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="returns" className="mt-4 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: "Current Period VAT Due", value: fmt(22340), color: "text-amber-600" },
              { label: "Last Filed",             value: "02 May 2024", color: "text-[var(--foreground)]" },
              { label: "VAT Number",             value: "GB 123 4567 89", color: "text-[var(--foreground)]" },
              { label: "Filing Frequency",       value: "Quarterly", color: "text-[var(--foreground)]" },
            ].map(k => (
              <Card key={k.label}>
                <CardContent className="pt-4 pb-4">
                  <p className="text-xs text-[var(--muted-foreground)]">{k.label}</p>
                  <p className={`text-base font-bold mt-1 ${k.color}`}>{k.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-[var(--muted)]/40">
                  <TableHead className="text-xs uppercase tracking-wide text-[var(--muted-foreground)] font-semibold">Period</TableHead>
                  <TableHead className="text-xs uppercase tracking-wide text-[var(--muted-foreground)] font-semibold">Due Date</TableHead>
                  <TableHead className="text-right text-xs uppercase tracking-wide text-[var(--muted-foreground)] font-semibold">VAT Due</TableHead>
                  <TableHead className="text-xs uppercase tracking-wide text-[var(--muted-foreground)] font-semibold">Status</TableHead>
                  <TableHead className="hidden md:table-cell text-xs uppercase tracking-wide text-[var(--muted-foreground)] font-semibold">Filed Date</TableHead>
                  <TableHead className="w-28" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {VAT_RETURNS.map((r, i) => (
                  <TableRow key={i} className="hover:bg-[var(--muted)]/40">
                    <TableCell className="font-medium text-sm">{r.period}</TableCell>
                    <TableCell className="text-sm text-[var(--muted-foreground)]">{r.due}</TableCell>
                    <TableCell className="text-right font-semibold text-sm">{fmt(r.vatDue)}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_CONFIG[r.status]}`}>
                        {r.status}
                      </span>
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-sm text-[var(--muted-foreground)]">{r.filed || "—"}</TableCell>
                    <TableCell>
                      {r.status === "Pending" ? (
                        <Button size="sm" className="h-7 text-xs">Submit</Button>
                      ) : (
                        <Button variant="ghost" size="sm" className="h-7 text-xs">View</Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="rates" className="mt-4">
          <Card>
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <CardTitle className="text-base">Tax Rates</CardTitle>
              <Button size="sm" className="gap-1.5" onClick={() => setAddOpen(true)}>
                <Plus className="h-4 w-4" />Add Rate
              </Button>
            </CardHeader>
            <Table>
              <TableHeader>
                <TableRow className="bg-[var(--muted)]/40">
                  <TableHead className="text-xs uppercase tracking-wide text-[var(--muted-foreground)] font-semibold">Name</TableHead>
                  <TableHead className="text-right text-xs uppercase tracking-wide text-[var(--muted-foreground)] font-semibold">Rate</TableHead>
                  <TableHead className="text-xs uppercase tracking-wide text-[var(--muted-foreground)] font-semibold">Type</TableHead>
                  <TableHead className="text-xs uppercase tracking-wide text-[var(--muted-foreground)] font-semibold">Active</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rates.map((r, i) => (
                  <TableRow key={i} className="hover:bg-[var(--muted)]/40">
                    <TableCell className="font-medium text-sm">{r.name}</TableCell>
                    <TableCell className="text-right font-semibold text-sm">{r.rate}%</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-violet-100 text-violet-700">{r.type}</span>
                    </TableCell>
                    <TableCell>
                      <Switch
                        checked={r.active}
                        onCheckedChange={v => setRates(prev => prev.map((x, j) => j === i ? { ...x, active: v } : x))}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="hmrc" className="mt-4">
          <Card>
            <CardContent className="pt-6 max-w-lg">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="h-6 w-6 text-emerald-600" />
                </div>
                <div>
                  <p className="font-semibold text-[var(--foreground)]">HMRC MTD Connected</p>
                  <p className="text-sm text-[var(--muted-foreground)] mt-0.5">Connected as Orbas Ltd · VAT No: GB 123 4567 89</p>
                  <p className="text-xs text-[var(--muted-foreground)] mt-1">Last synced: 10 Jun 2024 08:00</p>
                </div>
              </div>
              <Separator className="mb-4" />
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-[var(--muted-foreground)]">Connection Type</span>
                  <span className="font-medium">Making Tax Digital (MTD)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--muted-foreground)]">VAT Scheme</span>
                  <span className="font-medium">Standard Accruals</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--muted-foreground)]">Filing Frequency</span>
                  <span className="font-medium">Quarterly</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--muted-foreground)]">HMRC Status</span>
                  <span className="font-medium text-emerald-600">Active</span>
                </div>
              </div>
              <div className="flex gap-2 mt-6">
                <Button variant="outline" size="sm" className="gap-1.5"><RefreshCw className="h-3.5 w-3.5" />Re-sync</Button>
                <Button variant="outline" size="sm" className="gap-1.5 text-red-600 border-red-200 hover:bg-red-50">Disconnect</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="adjustments" className="mt-4">
          <Card>
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <CardTitle className="text-base">VAT Adjustments</CardTitle>
              <Button size="sm" className="gap-1.5"><Plus className="h-4 w-4" />Add Adjustment</Button>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-[var(--muted-foreground)]">
                <p className="text-sm">No VAT adjustments recorded for the current period.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader><DialogTitle>Add Tax Rate</DialogTitle></DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-1.5"><Label>Name</Label><Input placeholder="e.g. Standard Rate" /></div>
            <div className="space-y-1.5"><Label>Rate (%)</Label><Input type="number" min={0} max={100} step={0.1} placeholder="20" /></div>
            <div className="space-y-1.5"><Label>Type</Label>
              <Input placeholder="VAT" defaultValue="VAT" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddOpen(false)}>Cancel</Button>
            <Button onClick={() => setAddOpen(false)}>Add Rate</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
