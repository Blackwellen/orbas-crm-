"use client"

import React, { useState } from "react"
import { Plus, TrendingUp, TrendingDown, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Budget {
  id: string
  name: string
  period: string
  total: number
  actual: number
  status: string
}

const BUDGETS: Budget[] = [
  { id: "b-001", name: "Annual Operating Budget 2024",   period: "Janâ€“Dec 2024",  total: 480000, actual: 284320, status: "Active" },
  { id: "b-002", name: "Q2 2024 Department Budget",      period: "Aprâ€“Jun 2024",  total: 120000, actual: 112480, status: "Active" },
  { id: "b-003", name: "Marketing Campaign H1",          period: "Janâ€“Jun 2024",  total: 48000,  actual: 36800,  status: "Active" },
  { id: "b-004", name: "IT Infrastructure Q1",           period: "Janâ€“Mar 2024",  total: 32000,  actual: 29840,  status: "Completed" },
  { id: "b-005", name: "Staffing & Recruitment 2024",    period: "Janâ€“Dec 2024",  total: 96000,  actual: 48200,  status: "Active" },
]

const MONTHLY_DATA = [
  { month: "Jan", budget: 40000, actual: 38400 },
  { month: "Feb", budget: 40000, actual: 42200 },
  { month: "Mar", budget: 40000, actual: 36800 },
  { month: "Apr", budget: 40000, actual: 44100 },
  { month: "May", budget: 40000, actual: 39600 },
  { month: "Jun", budget: 40000, actual: 43800 },
]

function fmt(n: number) { return `Â£${n.toLocaleString("en-GB", { minimumFractionDigits: 0 })}` }

const STATUS_CONFIG: Record<string, string> = {
  Active:    "bg-emerald-100 text-emerald-700",
  Completed: "bg-slate-100 text-slate-600",
  Draft:     "bg-blue-100 text-blue-700",
}

export default function BudgetsPage() {
  const [addOpen, setAddOpen] = useState(false)

  return (
    <div className="p-6 space-y-6 max-w-screen-2xl">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Budgets</h1>
          <p className="text-sm text-[var(--muted-foreground)] mt-0.5">{BUDGETS.length} budgets Â· FY 2024</p>
        </div>
        <Button size="sm" className="gap-1.5" onClick={() => setAddOpen(true)}>
          <Plus className="h-4 w-4" />New Budget
        </Button>
      </div>

      {/* Budget vs Actual Chart */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Budget vs Actual â€“ FY2024 (Monthly)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={MONTHLY_DATA} margin={{ top: 4, right: 16, left: -16, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} tickFormatter={v => `Â£${(v/1000).toFixed(0)}k`} />
              <Tooltip formatter={(v: any) => [`Â£${v.toLocaleString()}`, ""]} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="budget" name="Budget" fill="#1a56db" radius={[3,3,0,0]} opacity={0.7} />
              <Bar dataKey="actual" name="Actual" fill="#06b6d4" radius={[3,3,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Budget Cards */}
      <div className="space-y-3">
        {BUDGETS.map(b => {
          const pct = Math.min(100, Math.round((b.actual / b.total) * 100))
          const variance = b.total - b.actual
          const overBudget = variance < 0
          return (
            <Card key={b.id} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-4 pb-4">
                <div className="flex items-start justify-between gap-4 mb-3 flex-wrap">
                  <div>
                    <p className="font-semibold text-[var(--foreground)]">{b.name}</p>
                    <p className="text-xs text-[var(--muted-foreground)] mt-0.5">{b.period}</p>
                  </div>
                  <div className="flex items-center gap-3 text-right">
                    <div>
                      <p className="text-xs text-[var(--muted-foreground)]">Budget</p>
                      <p className="font-bold">{fmt(b.total)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[var(--muted-foreground)]">Actual</p>
                      <p className="font-bold">{fmt(b.actual)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[var(--muted-foreground)]">Variance</p>
                      <p className={`font-bold flex items-center gap-0.5 ${overBudget ? "text-red-600" : "text-emerald-600"}`}>
                        {overBudget ? <TrendingDown className="h-3.5 w-3.5" /> : <TrendingUp className="h-3.5 w-3.5" />}
                        {overBudget ? "-" : "+"}{fmt(Math.abs(variance))}
                      </p>
                    </div>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_CONFIG[b.status]}`}>
                      {b.status}
                    </span>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-[var(--muted-foreground)]">
                    <span>{pct}% used</span>
                    <span>{fmt(b.total - b.actual)} remaining</span>
                  </div>
                  <Progress value={pct} className={`h-2 ${overBudget ? "[&>div]:bg-red-500" : pct > 80 ? "[&>div]:bg-amber-500" : "[&>div]:bg-emerald-500"}`} />
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader><DialogTitle>New Budget</DialogTitle></DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-1.5"><Label>Budget Name</Label><Input placeholder="e.g. Q3 2024 Marketing Budget" /></div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5"><Label>Period Type</Label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Selectâ€¦" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="annual">Annual</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5"><Label>Total Budget (Â£)</Label><Input type="number" placeholder="50000" /></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5"><Label>Start Date</Label><Input type="date" defaultValue="2024-07-01" /></div>
              <div className="space-y-1.5"><Label>End Date</Label><Input type="date" defaultValue="2024-09-30" /></div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddOpen(false)}>Cancel</Button>
            <Button onClick={() => setAddOpen(false)}>Create Budget</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

