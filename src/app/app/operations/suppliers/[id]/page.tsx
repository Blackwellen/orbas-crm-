"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Truck, Star, TrendingUp, Package2 } from "lucide-react"

const supplier = {
  id: "1",
  name: "Fastener World Ltd",
  category: "Fasteners",
  accountRef: "FW-001",
  country: "United Kingdom",
  address: "Unit 12, Meridian Park, Birmingham, B11 2QJ",
  paymentTerms: "30 days net",
  currency: "GBP",
  status: "Active",
  taxRef: "GB-847123456",
  website: "www.fastenerworld.co.uk",
  onTimeDelivery: 94,
  qualityScore: 4.6,
  responseTime: "< 4h",
}

const contacts = [
  { name: "Tom Bradley", role: "Account Manager", email: "tbradley@fastenerworld.co.uk", phone: "+44 1234 567890", primary: true },
  { name: "Janet Williams", role: "Finance Contact", email: "jwilliams@fastenerworld.co.uk", phone: "+44 1234 567891", primary: false },
  { name: "Mark Thompson", role: "Logistics", email: "mthompson@fastenerworld.co.uk", phone: "+44 1234 567892", primary: false },
]

const catalogue = [
  { sku: "FW-TI-M8-30", description: "Titanium Bolts M8 x 30mm", unitCost: "£0.85", moq: 100, leadTime: "14 days" },
  { sku: "FW-TI-M10-40", description: "Titanium Bolts M10 x 40mm", unitCost: "£1.20", moq: 100, leadTime: "14 days" },
  { sku: "FW-SS-W-M6", description: "Stainless Washers M6 pk/100", unitCost: "£12.50", moq: 10, leadTime: "7 days" },
  { sku: "FW-SS-W-M8", description: "Stainless Washers M8 pk/100", unitCost: "£14.00", moq: 10, leadTime: "7 days" },
  { sku: "FW-HN-M8", description: "Hex Nuts M8 SS pk/200", unitCost: "£18.50", moq: 10, leadTime: "7 days" },
]

const purchaseOrders = [
  { po: "PO-2025-0847", date: "2025-06-08", lines: 8, total: "£12,450", status: "Sent" },
  { po: "PO-2025-0839", date: "2025-05-22", lines: 6, total: "£5,240", status: "Received" },
  { po: "PO-2025-0821", date: "2025-05-15", lines: 4, total: "£3,760", status: "Received" },
  { po: "PO-2025-0798", date: "2025-04-28", lines: 9, total: "£8,920", status: "Received" },
]

const bills = [
  { bill: "BILL-2025-0312", date: "2025-05-25", amount: "£5,240", due: "2025-06-24", status: "Open" },
  { bill: "BILL-2025-0289", date: "2025-05-18", amount: "£3,760", due: "2025-06-17", status: "Paid" },
]

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    Active: "bg-green-500/15 text-green-600 border-green-300",
    Sent: "bg-blue-500/15 text-blue-600 border-blue-300",
    Received: "bg-green-500/15 text-green-600 border-green-300",
    Open: "bg-yellow-500/15 text-yellow-600 border-yellow-300",
    Paid: "bg-green-500/15 text-green-600 border-green-300",
  }
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium border ${map[status] ?? "bg-gray-100 text-gray-600"}`}>
      {status}
    </span>
  )
}

export default function SupplierDetail() {
  const [tab, setTab] = useState("overview")

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-2 text-sm text-[var(--muted-foreground)]">
        <Link href="/app/operations/suppliers" className="hover:text-[var(--foreground)] flex items-center gap-1">
          <ArrowLeft className="h-3.5 w-3.5" /> Suppliers
        </Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">{supplier.name}</span>
      </div>

      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <div className="h-12 w-12 rounded-xl bg-[var(--primary)]/10 flex items-center justify-center">
            <Truck className="h-6 w-6 text-[var(--primary)]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-semibold text-[var(--foreground)]">{supplier.name}</h1>
              <StatusBadge status={supplier.status} />
            </div>
            <p className="text-sm text-[var(--muted-foreground)] mt-1">{supplier.category} · {supplier.country} · {supplier.accountRef}</p>
          </div>
        </div>
        <Button size="sm" className="bg-[var(--primary)] text-white gap-1">
          <Package2 className="h-4 w-4" /> New PO
        </Button>
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="flex-wrap h-auto gap-1 bg-[var(--muted)]/30">
          {["overview","catalogue","purchase-orders","bills","payments","contacts","documents","performance","audit"].map(t => (
            <TabsTrigger key={t} value={t} className="text-xs capitalize">{t.replace(/-/g, " ")}</TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="overview" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border border-[var(--border)]">
              <CardHeader><CardTitle className="text-base">Supplier Details</CardTitle></CardHeader>
              <CardContent className="space-y-3 text-sm">
                {[
                  { label: "Account Ref", value: supplier.accountRef },
                  { label: "Address", value: supplier.address },
                  { label: "Country", value: supplier.country },
                  { label: "Payment Terms", value: supplier.paymentTerms },
                  { label: "Currency", value: supplier.currency },
                  { label: "VAT / Tax Ref", value: supplier.taxRef },
                  { label: "Website", value: supplier.website },
                ].map(f => (
                  <div key={f.label} className="flex justify-between">
                    <span className="text-[var(--muted-foreground)]">{f.label}</span>
                    <span className="font-medium text-right max-w-xs">{f.value}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card className="border border-[var(--border)]">
              <CardHeader><CardTitle className="text-base">Performance Summary</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="text-[var(--muted-foreground)]">On-time Delivery</span>
                    <span className="font-semibold text-green-600">{supplier.onTimeDelivery}%</span>
                  </div>
                  <Progress value={supplier.onTimeDelivery} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="text-[var(--muted-foreground)]">Quality Score</span>
                    <div className="flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{supplier.qualityScore} / 5</span>
                    </div>
                  </div>
                  <Progress value={(supplier.qualityScore / 5) * 100} className="h-2" />
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--muted-foreground)]">Response Time</span>
                  <span className="font-semibold">{supplier.responseTime}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="catalogue" className="mt-4">
          <Card className="border border-[var(--border)]">
            <CardHeader><CardTitle className="text-base">Supplier Catalogue</CardTitle></CardHeader>
            <CardContent className="p-0">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)] bg-[var(--muted)]/30">
                    {["SKU","Description","Unit Cost","MOQ","Lead Time"].map(h => (
                      <th key={h} className="text-left px-4 py-3 font-medium text-[var(--muted-foreground)]">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {catalogue.map((item, i) => (
                    <tr key={i} className="border-b border-[var(--border)] last:border-0">
                      <td className="px-4 py-3 font-mono text-xs text-[var(--primary)]">{item.sku}</td>
                      <td className="px-4 py-3">{item.description}</td>
                      <td className="px-4 py-3 font-semibold">{item.unitCost}</td>
                      <td className="px-4 py-3 text-[var(--muted-foreground)]">{item.moq}</td>
                      <td className="px-4 py-3 text-[var(--muted-foreground)]">{item.leadTime}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="purchase-orders" className="mt-4">
          <Card className="border border-[var(--border)]">
            <CardContent className="p-0">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)] bg-[var(--muted)]/30">
                    {["PO #","Date","Lines","Total","Status"].map(h => (
                      <th key={h} className="text-left px-4 py-3 font-medium text-[var(--muted-foreground)]">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {purchaseOrders.map((po, i) => (
                    <tr key={i} className="border-b border-[var(--border)] last:border-0">
                      <td className="px-4 py-3 font-mono text-xs text-[var(--primary)]">{po.po}</td>
                      <td className="px-4 py-3 text-[var(--muted-foreground)]">{po.date}</td>
                      <td className="px-4 py-3">{po.lines}</td>
                      <td className="px-4 py-3 font-semibold">{po.total}</td>
                      <td className="px-4 py-3"><StatusBadge status={po.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bills" className="mt-4">
          <Card className="border border-[var(--border)]">
            <CardContent className="p-0">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)] bg-[var(--muted)]/30">
                    {["Bill #","Date","Amount","Due Date","Status"].map(h => (
                      <th key={h} className="text-left px-4 py-3 font-medium text-[var(--muted-foreground)]">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {bills.map((b, i) => (
                    <tr key={i} className="border-b border-[var(--border)] last:border-0">
                      <td className="px-4 py-3 font-mono text-xs text-[var(--primary)]">{b.bill}</td>
                      <td className="px-4 py-3 text-[var(--muted-foreground)]">{b.date}</td>
                      <td className="px-4 py-3 font-semibold">{b.amount}</td>
                      <td className="px-4 py-3 text-[var(--muted-foreground)]">{b.due}</td>
                      <td className="px-4 py-3"><StatusBadge status={b.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contacts" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {contacts.map((c, i) => (
              <Card key={i} className="border border-[var(--border)]">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-9 w-9 rounded-full bg-[var(--primary)]/15 flex items-center justify-center">
                      <span className="text-sm font-bold text-[var(--primary)]">{c.name[0]}</span>
                    </div>
                    <div>
                      <p className="font-medium text-sm">{c.name}</p>
                      <p className="text-xs text-[var(--muted-foreground)]">{c.role}</p>
                    </div>
                    {c.primary && <span className="ml-auto text-xs bg-[var(--primary)]/10 text-[var(--primary)] rounded-full px-1.5 py-0.5">Primary</span>}
                  </div>
                  <div className="space-y-1 text-xs text-[var(--muted-foreground)]">
                    <p>{c.email}</p>
                    <p>{c.phone}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="performance" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border border-[var(--border)]">
              <CardHeader><CardTitle className="text-base">Delivery Performance</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                {[
                  { label: "On-time Delivery Rate", value: 94, suffix: "%" },
                  { label: "Perfect Order Rate", value: 89, suffix: "%" },
                  { label: "Fill Rate", value: 97, suffix: "%" },
                ].map(m => (
                  <div key={m.label}>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="text-[var(--muted-foreground)]">{m.label}</span>
                      <span className="font-semibold">{m.value}{m.suffix}</span>
                    </div>
                    <Progress value={m.value} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card className="border border-[var(--border)]">
              <CardHeader><CardTitle className="text-base">Quality Metrics</CardTitle></CardHeader>
              <CardContent className="space-y-3 text-sm">
                {[
                  { label: "Quality Score", value: "4.6 / 5.0" },
                  { label: "Defect Rate", value: "0.3%" },
                  { label: "Return Rate", value: "1.2%" },
                  { label: "Avg Response Time", value: "< 4 hours" },
                  { label: "Total Orders YTD", value: "24" },
                  { label: "Total Spend YTD", value: "£48,200" },
                ].map(f => (
                  <div key={f.label} className="flex justify-between">
                    <span className="text-[var(--muted-foreground)]">{f.label}</span>
                    <span className="font-semibold">{f.value}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {["payments","documents","audit"].map(t => (
          <TabsContent key={t} value={t} className="mt-4">
            <Card className="border border-[var(--border)]">
              <CardContent className="py-12 text-center text-[var(--muted-foreground)]">
                <TrendingUp className="h-10 w-10 mx-auto mb-3 opacity-30" />
                <p className="font-medium capitalize">No {t} yet</p>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
