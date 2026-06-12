"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, BarChart2, Package2, FileCheck2, Truck, ArrowUpDown, Warehouse, Boxes, Wrench } from "lucide-react"

const reports = [
  {
    icon: Package2,
    title: "Stock Valuation",
    description: "Current stock value broken down by category, warehouse, and SKU. Includes cost and market value comparison.",
    lastRun: "Today at 06:00",
    color: "bg-blue-500/10 text-blue-600",
  },
  {
    icon: ArrowUpDown,
    title: "Low Stock Report",
    description: "Items below reorder point or safety stock levels. Prioritised by criticality with suggested reorder quantities.",
    lastRun: "Today at 06:00",
    color: "bg-red-500/10 text-red-600",
  },
  {
    icon: FileCheck2,
    title: "Purchase Order Analysis",
    description: "PO performance including on-time delivery rates, lead times, and spend analysis by supplier and category.",
    lastRun: "Yesterday",
    color: "bg-purple-500/10 text-purple-600",
  },
  {
    icon: Truck,
    title: "Supplier Performance",
    description: "Supplier scorecards with on-time delivery, quality scores, fill rates, and year-to-date spend comparison.",
    lastRun: "2025-06-07",
    color: "bg-orange-500/10 text-orange-600",
  },
  {
    icon: ArrowUpDown,
    title: "Inventory Movements",
    description: "All stock transactions including receipts, issues, transfers, and adjustments over a selected date range.",
    lastRun: "2025-06-08",
    color: "bg-cyan-500/10 text-cyan-600",
  },
  {
    icon: Warehouse,
    title: "Warehouse Capacity",
    description: "Utilisation rates by warehouse and bin location. Identifies over- and under-utilised storage areas.",
    lastRun: "2025-06-07",
    color: "bg-teal-500/10 text-teal-600",
  },
  {
    icon: Boxes,
    title: "Asset Register",
    description: "Full asset list with current book values, depreciation schedules, and upcoming warranty expirations.",
    lastRun: "2025-06-01",
    color: "bg-green-500/10 text-green-600",
  },
  {
    icon: Wrench,
    title: "Maintenance Schedule",
    description: "Upcoming and overdue maintenance tasks across all assets. Includes cost summaries and technician assignments.",
    lastRun: "2025-06-05",
    color: "bg-yellow-500/10 text-yellow-600",
  },
]

export default function OperationsReportsPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-[var(--foreground)]">Operations Reports</h1>
        <p className="text-sm text-[var(--muted-foreground)] mt-1">Stock, procurement, and asset analytics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {reports.map((report, i) => (
          <Card key={i} className="border border-[var(--border)] hover:border-[var(--primary)] transition-colors">
            <CardHeader className="pb-2">
              <div className={`h-10 w-10 rounded-lg ${report.color} flex items-center justify-center mb-2`}>
                <report.icon className="h-5 w-5" />
              </div>
              <CardTitle className="text-base">{report.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">{report.description}</p>
              <p className="text-xs text-[var(--muted-foreground)]">Last run: {report.lastRun}</p>
              <div className="flex gap-2">
                <Button size="sm" className="flex-1 bg-[var(--primary)] text-white text-xs">
                  <BarChart2 className="h-3.5 w-3.5 mr-1" /> Run Report
                </Button>
                <Button size="sm" variant="outline" className="px-2">
                  <Download className="h-3.5 w-3.5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
