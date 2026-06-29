"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Boxes, Edit2, Save, Wrench, Calendar, TrendingDown } from "lucide-react"

const asset = {
  id: "1",
  assetNo: "AST-001",
  name: "CNC Machining Centre Doosan DNM 4500",
  category: "Production Equipment",
  subcategory: "CNC Machinery",
  manufacturer: "Doosan",
  model: "DNM 4500",
  serialNo: "DOOSAN-DNM-2022-4821",
  purchaseDate: "2022-03-15",
  purchaseCost: 156000,
  currentValue: 124000,
  depreciation: "Straight Line",
  usefulLife: 10,
  status: "Active",
  location: "WH-Birmingham, Bay 3",
  assignedTo: "Production Team",
  warrantyExpiry: "2025-03-15",
  notes: "Main CNC for complex aluminium parts. Annual calibration required.",
}

const maintenanceLog = [
  { date: "2025-05-15", type: "Preventive", technician: "Dave Smith", description: "Annual service, lubrication, spindle check", cost: "£680", status: "Completed" },
  { date: "2025-02-10", type: "Corrective", technician: "Dave Smith", description: "Coolant pump replacement", cost: "£1,240", status: "Completed" },
  { date: "2024-05-20", type: "Preventive", technician: "Sarah Lee", description: "Annual service and calibration", cost: "£720", status: "Completed" },
  { date: "2024-01-08", type: "Corrective", technician: "Dave Smith", description: "X-axis servo motor fault repair", cost: "£2,100", status: "Completed" },
]

const assignments = [
  { user: "Production Team", from: "2022-03-15", to: "Present", location: "WH-Birmingham, Bay 3" },
  { user: "Engineering R&D", from: "2022-03-15", to: "2022-04-01", location: "Design Lab" },
]

const depreciationSchedule = [
  { year: "2022", bookValue: 140400, depreciation: 15600, accDepreciation: 15600 },
  { year: "2023", bookValue: 124800, depreciation: 15600, accDepreciation: 31200 },
  { year: "2024", bookValue: 109200, depreciation: 15600, accDepreciation: 46800 },
  { year: "2025", bookValue: 93600, depreciation: 15600, accDepreciation: 62400 },
  { year: "2026", bookValue: 78000, depreciation: 15600, accDepreciation: 78000 },
  { year: "2027", bookValue: 62400, depreciation: 15600, accDepreciation: 93600 },
]

const activityLog = [
  { user: "Dave S.", action: "Completed annual preventive maintenance", time: "2025-05-15 16:30" },
  { user: "Sarah K.", action: "Updated warranty expiry date", time: "2025-03-01 10:00" },
  { user: "Dave S.", action: "Replaced coolant pump - corrective maintenance", time: "2025-02-10 14:20" },
]

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    Active: "bg-green-500/15 text-green-600 border-green-300",
    Maintenance: "bg-yellow-500/15 text-yellow-600 border-yellow-300",
    Completed: "bg-green-500/15 text-green-600 border-green-300",
    Preventive: "bg-blue-500/15 text-blue-600 border-blue-300",
    Corrective: "bg-orange-500/15 text-orange-600 border-orange-300",
  }
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium border ${map[status] ?? "bg-gray-100 text-gray-600"}`}>
      {status}
    </span>
  )
}

export default function AssetDetail() {
  const [tab, setTab] = useState("overview")
  const [editing, setEditing] = useState(false)
  const depreciationPct = ((asset.purchaseCost - asset.currentValue) / asset.purchaseCost) * 100

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-2 text-sm text-[var(--muted-foreground)]">
        <Link href="/app/operations/assets" className="hover:text-[var(--foreground)] flex items-center gap-1">
          <ArrowLeft className="h-3.5 w-3.5" /> Assets
        </Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">{asset.assetNo}</span>
      </div>

      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <div className="h-12 w-12 rounded-xl bg-[var(--primary)]/10 flex items-center justify-center">
            <Boxes className="h-6 w-6 text-[var(--primary)]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-semibold text-[var(--foreground)]">{asset.name}</h1>
              <StatusBadge status={asset.status} />
            </div>
            <p className="text-sm text-[var(--muted-foreground)] mt-1">{asset.assetNo} · {asset.category} · {asset.location}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" className="gap-1"><Wrench className="h-4 w-4" /> Log Maintenance</Button>
          <Button size="sm" variant="outline" className="gap-1"><Calendar className="h-4 w-4" /> Schedule Service</Button>
        </div>
      </div>

      {/* Financial summary strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Purchase Cost", value: `£${asset.purchaseCost.toLocaleString()}` },
          { label: "Current Value", value: `£${asset.currentValue.toLocaleString()}` },
          { label: "Depreciation", value: `${depreciationPct.toFixed(0)}%` },
          { label: "Warranty Expiry", value: asset.warrantyExpiry },
        ].map(f => (
          <Card key={f.label} className="border border-[var(--border)]">
            <CardContent className="p-3 text-center">
              <p className="text-xs text-[var(--muted-foreground)]">{f.label}</p>
              <p className="text-lg font-bold mt-0.5 text-[var(--foreground)]">{f.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="flex-wrap h-auto gap-1 bg-[var(--muted)]/30">
          {["overview","financials","maintenance","assignments","documents","depreciation","activity","audit"].map(t => (
            <TabsTrigger key={t} value={t} className="text-xs capitalize">{t}</TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="overview" className="mt-4">
          <Card className="border border-[var(--border)]">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle className="text-base">Asset Details</CardTitle>
              <Button size="sm" variant="outline" onClick={() => setEditing(!editing)} className="gap-1">
                {editing ? <><Save className="h-4 w-4" /> Save</> : <><Edit2 className="h-4 w-4" /> Edit</>}
              </Button>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              {[
                { label: "Asset Number", value: asset.assetNo },
                { label: "Name", value: asset.name },
                { label: "Category", value: asset.category },
                { label: "Subcategory", value: asset.subcategory },
                { label: "Manufacturer", value: asset.manufacturer },
                { label: "Model", value: asset.model },
                { label: "Serial Number", value: asset.serialNo },
                { label: "Purchase Date", value: asset.purchaseDate },
                { label: "Location", value: asset.location },
                { label: "Assigned To", value: asset.assignedTo },
                { label: "Warranty Expiry", value: asset.warrantyExpiry },
                { label: "Status", value: asset.status },
              ].map(f => (
                <div key={f.label}>
                  <Label className="text-xs text-[var(--muted-foreground)]">{f.label}</Label>
                  {editing
                    ? <Input defaultValue={f.value} className="mt-1 h-8 text-sm" />
                    : <p className="mt-1 text-sm text-[var(--foreground)]">{f.value}</p>
                  }
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financials" className="mt-4">
          <Card className="border border-[var(--border)]">
            <CardHeader><CardTitle className="text-base">Financial Details</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                {[
                  { label: "Purchase Cost", value: `£${asset.purchaseCost.toLocaleString()}` },
                  { label: "Current Book Value", value: `£${asset.currentValue.toLocaleString()}` },
                  { label: "Total Depreciation", value: `£${(asset.purchaseCost - asset.currentValue).toLocaleString()}` },
                  { label: "Depreciation Method", value: asset.depreciation },
                  { label: "Useful Life", value: `${asset.usefulLife} years` },
                  { label: "Annual Depreciation", value: `£${(asset.purchaseCost / asset.usefulLife).toLocaleString()}` },
                ].map(f => (
                  <div key={f.label}>
                    <p className="text-[var(--muted-foreground)]">{f.label}</p>
                    <p className="font-semibold text-[var(--foreground)] mt-0.5">{f.value}</p>
                  </div>
                ))}
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-[var(--muted-foreground)]">Value Remaining</span>
                  <span className="font-semibold">{(100 - depreciationPct).toFixed(0)}%</span>
                </div>
                <Progress value={100 - depreciationPct} className="h-3" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="maintenance" className="mt-4">
          <Card className="border border-[var(--border)]">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle className="text-base">Maintenance Log</CardTitle>
              <Button size="sm" className="bg-[var(--primary)] text-white gap-1"><Wrench className="h-4 w-4" /> Log Maintenance</Button>
            </CardHeader>
            <CardContent className="p-0">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)] bg-[var(--muted)]/30">
                    {["Date","Type","Technician","Description","Cost","Status"].map(h => (
                      <th key={h} className="text-left px-4 py-3 font-medium text-[var(--muted-foreground)]">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {maintenanceLog.map((m, i) => (
                    <tr key={i} className="border-b border-[var(--border)] last:border-0">
                      <td className="px-4 py-3 text-[var(--muted-foreground)]">{m.date}</td>
                      <td className="px-4 py-3"><StatusBadge status={m.type} /></td>
                      <td className="px-4 py-3">{m.technician}</td>
                      <td className="px-4 py-3 text-[var(--muted-foreground)] max-w-xs">{m.description}</td>
                      <td className="px-4 py-3 font-medium">{m.cost}</td>
                      <td className="px-4 py-3"><StatusBadge status={m.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assignments" className="mt-4">
          <Card className="border border-[var(--border)]">
            <CardHeader><CardTitle className="text-base">Assignment History</CardTitle></CardHeader>
            <CardContent className="p-0">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)] bg-[var(--muted)]/30">
                    {["Assigned To","From","To","Location"].map(h => (
                      <th key={h} className="text-left px-4 py-3 font-medium text-[var(--muted-foreground)]">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {assignments.map((a, i) => (
                    <tr key={i} className="border-b border-[var(--border)] last:border-0">
                      <td className="px-4 py-3 font-medium">{a.user}</td>
                      <td className="px-4 py-3 text-[var(--muted-foreground)]">{a.from}</td>
                      <td className="px-4 py-3 text-[var(--muted-foreground)]">{a.to}</td>
                      <td className="px-4 py-3 text-[var(--muted-foreground)]">{a.location}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="depreciation" className="mt-4">
          <Card className="border border-[var(--border)]">
            <CardHeader><CardTitle className="text-base">Depreciation Schedule</CardTitle></CardHeader>
            <CardContent className="p-0">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)] bg-[var(--muted)]/30">
                    {["Year","Annual Depreciation","Accumulated Depreciation","Book Value"].map(h => (
                      <th key={h} className="text-left px-4 py-3 font-medium text-[var(--muted-foreground)]">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {depreciationSchedule.map((d, i) => (
                    <tr key={i} className="border-b border-[var(--border)] last:border-0">
                      <td className="px-4 py-3 font-medium">{d.year}</td>
                      <td className="px-4 py-3">£{d.depreciation.toLocaleString()}</td>
                      <td className="px-4 py-3 text-[var(--muted-foreground)]">£{d.accDepreciation.toLocaleString()}</td>
                      <td className="px-4 py-3 font-semibold text-[var(--primary)]">£{d.bookValue.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="mt-4">
          <Card className="border border-[var(--border)]">
            <CardContent className="p-0">
              {activityLog.map((entry, i) => (
                <div key={i} className="flex items-start gap-3 px-4 py-3 border-b border-[var(--border)] last:border-0">
                  <div className="h-7 w-7 rounded-full bg-[var(--primary)]/15 flex items-center justify-center shrink-0">
                    <span className="text-xs font-semibold text-[var(--primary)]">{entry.user[0]}</span>
                  </div>
                  <div>
                    <p className="text-sm"><span className="font-medium">{entry.user}</span> {entry.action}</p>
                    <p className="text-xs text-[var(--muted-foreground)] mt-0.5">{entry.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {["documents","audit"].map(t => (
          <TabsContent key={t} value={t} className="mt-4">
            <Card className="border border-[var(--border)]">
              <CardContent className="py-12 text-center text-[var(--muted-foreground)]">
                <TrendingDown className="h-10 w-10 mx-auto mb-3 opacity-30" />
                <p className="font-medium capitalize">No {t} yet</p>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
