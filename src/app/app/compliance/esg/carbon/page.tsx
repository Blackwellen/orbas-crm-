"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Download, Leaf, Factory, Zap, Truck, ChevronLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts"

const emissionsData = [
  { id: 1, source: "Head Office – Heating", category: "Scope 1", activity: "Natural gas 142,000 kWh", factor: "0.20286 kgCO2e/kWh", tco2e: 28.8, year: 2024 },
  { id: 2, source: "Company Vehicle Fleet", category: "Scope 1", activity: "Diesel 18,400 litres", factor: "2.54 kgCO2e/litre", tco2e: 46.7, year: 2024 },
  { id: 3, source: "Refrigerant Leakage", category: "Scope 1", activity: "HFC-134a 12 kg", factor: "1,430 kgCO2e/kg", tco2e: 17.2, year: 2024 },
  { id: 4, source: "Generator Fuel", category: "Scope 1", activity: "Diesel 58,000 litres", factor: "2.54 kgCO2e/litre", tco2e: 147.3, year: 2024 },
  { id: 5, source: "Office Electricity (HQ)", category: "Scope 2", activity: "Electricity 420,000 kWh", factor: "0.23314 kgCO2e/kWh", tco2e: 97.9, year: 2024 },
  { id: 6, source: "Data Centre – Co-location", category: "Scope 2", activity: "Electricity 278,000 kWh", factor: "0.23314 kgCO2e/kWh", tco2e: 64.8, year: 2024 },
  { id: 7, source: "Regional Office Electricity", category: "Scope 2", activity: "Electricity 112,000 kWh", factor: "0.23314 kgCO2e/kWh", tco2e: 26.1, year: 2024 },
  { id: 8, source: "Business Air Travel", category: "Scope 3", activity: "148,200 passenger-km", factor: "0.255 kgCO2e/pkm", tco2e: 37.8, year: 2024 },
  { id: 9, source: "Employee Commuting", category: "Scope 3", activity: "1,240 employees × avg 18km/day", factor: "0.171 kgCO2e/km", tco2e: 312.4, year: 2024 },
  { id: 10, source: "Supply Chain – IT Hardware", category: "Scope 3", activity: "Purchased 320 devices", factor: "Lifecycle assessment", tco2e: 214.4, year: 2024 },
  { id: 11, source: "Supply Chain – Office Supplies", category: "Scope 3", activity: "£284,000 spend", factor: "EEIO model", tco2e: 128.6, year: 2024 },
  { id: 12, source: "Downstream Logistics", category: "Scope 3", activity: "Courier deliveries 42,000 kg", factor: "0.093 kgCO2e/tonne-km", tco2e: 89.2, year: 2024 },
  { id: 13, source: "Waste Disposal", category: "Scope 3", activity: "Landfill 48 tonnes", factor: "0.436 kgCO2e/kg", tco2e: 20.9, year: 2024 },
  { id: 14, source: "Water Supply & Treatment", category: "Scope 3", activity: "8,400 m³", factor: "0.344 kgCO2e/m³", tco2e: 2.9, year: 2024 },
  { id: 15, source: "Business Hotel Stays", category: "Scope 3", activity: "2,840 room-nights", factor: "22.1 kgCO2e/night", tco2e: 62.8, year: 2024 },
]

const yoyData = [
  { year: "FY 2021/22", scope1: 310, scope2: 245, scope3: 2180 },
  { year: "FY 2022/23", scope1: 287, scope2: 221, scope3: 2040 },
  { year: "FY 2023/24", scope1: 268, scope2: 204, scope3: 1942 },
  { year: "FY 2024/25", scope1: 245, scope2: 189, scope3: 1847 },
]

const reductionTargets = [
  { target: "50% reduction in Scope 1 & 2", baseline: 2021, targetYear: 2030, baselineVal: 555, current: 434, unit: "tCO2e" },
  { target: "30% reduction in Scope 3", baseline: 2021, targetYear: 2030, baselineVal: 2180, current: 1847, unit: "tCO2e" },
  { target: "Net Zero Operations", baseline: 2021, targetYear: 2040, baselineVal: 2735, current: 2281, unit: "tCO2e" },
  { target: "100% Renewable Electricity", baseline: 2022, targetYear: 2026, baselineVal: 0, current: 42, unit: "% renewable" },
]

const carbonOffsets = [
  { project: "Kenyan Cookstove Programme", standard: "Gold Standard", vintage: 2024, quantity: 150, price: "£8.50/t", total: "£1,275" },
  { project: "Scottish Woodland Creation", standard: "Woodland Carbon", vintage: 2023, quantity: 80, price: "£22.00/t", total: "£1,760" },
  { project: "Solar Power – Rajasthan, India", standard: "VCS", vintage: 2024, quantity: 50, price: "£6.20/t", total: "£310" },
]

type FormData = { source: string; category: string; quantity: string; unit: string; factor: string }

export default function CarbonPage() {
  const router = useRouter()
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState<FormData>({ source: "", category: "Scope 1", quantity: "", unit: "", factor: "" })

  const scope1Total = 245
  const scope2Total = 189
  const scope3Total = 1847
  const grandTotal = scope1Total + scope2Total + scope3Total

  function setFormField(key: keyof FormData, val: string) {
    setForm(prev => ({ ...prev, [key]: val }))
  }

  return (
    <div className="p-6 space-y-6" style={{ background: "var(--background)", minHeight: "100vh" }}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push("/app/compliance/esg")}
            style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center" }}
          >
            <ChevronLeft className="w-5 h-5" style={{ color: "var(--muted-foreground)" }} />
          </button>
          <div>
            <h1 className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>Carbon &amp; Climate Reporting</h1>
            <p className="text-sm mt-1" style={{ color: "var(--muted-foreground)" }}>GHG Protocol emissions inventory · FY 2024/25</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2" size="sm">
            <Download className="w-4 h-4" />
            Export Data
          </Button>
          <Button size="sm" onClick={() => setShowModal(true)} className="flex items-center gap-2" style={{ background: "var(--primary)", color: "#fff" }}>
            <Plus className="w-4 h-4" />
            Add Emission Source
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { icon: Factory, label: "Scope 1", sub: "Direct Emissions", value: scope1Total, desc: "Combustion, vehicles, refrigerants", color: "#dc2626", bg: "#fee2e2" },
          { icon: Zap, label: "Scope 2", sub: "Energy Indirect", value: scope2Total, desc: "Purchased electricity & heat", color: "#d97706", bg: "#fef3c7" },
          { icon: Truck, label: "Scope 3", sub: "Value Chain", value: scope3Total, desc: "Supply chain, travel, waste", color: "#7c3aed", bg: "#ede9fe" },
        ].map(s => (
          <Card key={s.label} style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <CardContent className="pt-4 pb-4">
              <div className="flex items-center gap-3 mb-2">
                <div style={{ width: 36, height: 36, borderRadius: 10, background: s.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <s.icon className="w-5 h-5" style={{ color: s.color }} />
                </div>
                <div>
                  <div className="font-semibold text-sm" style={{ color: "var(--foreground)" }}>{s.label}</div>
                  <div className="text-xs" style={{ color: "var(--muted-foreground)" }}>{s.sub}</div>
                </div>
              </div>
              <div className="text-2xl font-bold" style={{ color: s.color }}>{s.value.toLocaleString()}t</div>
              <div className="text-xs mt-1" style={{ color: "var(--muted-foreground)" }}>CO2e · {s.desc}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card style={{ background: "var(--card)", border: "1px solid var(--border)" }} className="md:col-span-1">
          <CardContent className="pt-5 pb-5 text-center">
            <Leaf className="w-8 h-8 mx-auto mb-2" style={{ color: "#16a34a" }} />
            <div className="text-3xl font-bold" style={{ color: "#16a34a" }}>{grandTotal.toLocaleString()}</div>
            <div className="text-sm font-semibold mt-1" style={{ color: "var(--foreground)" }}>Total tCO2e</div>
            <div className="text-xs mt-1" style={{ color: "var(--muted-foreground)" }}>All scopes combined</div>
            <div className="mt-3 text-xs font-semibold" style={{ color: "#16a34a" }}>↓ 12% vs prior year</div>
          </CardContent>
        </Card>
        <Card style={{ background: "var(--card)", border: "1px solid var(--border)" }} className="md:col-span-3">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold" style={{ color: "var(--foreground)" }}>Year-over-Year Emissions</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={yoyData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="year" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} />
                <YAxis tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} tickFormatter={(v: any) => `${v}t`} />
                <Tooltip formatter={(v: any, name: any) => [`${v}t CO2e`, name]} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="scope1" name="Scope 1" stackId="a" fill="#dc2626" />
                <Bar dataKey="scope2" name="Scope 2" stackId="a" fill="#d97706" />
                <Bar dataKey="scope3" name="Scope 3" stackId="a" fill="#7c3aed" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold" style={{ color: "var(--foreground)" }}>Emissions Inventory</CardTitle>
          <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>15 emission sources across all scopes</p>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                {["Source","Category","Activity Data","Emission Factor","tCO2e","Year"].map(h => (
                  <th key={h} style={{ padding: "8px 12px", textAlign: "left", color: "var(--muted-foreground)", fontWeight: 500 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {emissionsData.map(row => (
                <tr key={row.id} style={{ borderBottom: "1px solid var(--border)" }}>
                  <td style={{ padding: "9px 12px", color: "var(--foreground)", fontWeight: 500 }}>{row.source}</td>
                  <td style={{ padding: "9px 12px" }}>
                    <span style={{
                      fontSize: 11, fontWeight: 500, padding: "2px 8px", borderRadius: 9999,
                      backgroundColor: row.category === "Scope 1" ? "#fee2e2" : row.category === "Scope 2" ? "#fef3c7" : "#ede9fe",
                      color: row.category === "Scope 1" ? "#dc2626" : row.category === "Scope 2" ? "#d97706" : "#7c3aed",
                    }}>
                      {row.category}
                    </span>
                  </td>
                  <td style={{ padding: "9px 12px", color: "var(--muted-foreground)" }}>{row.activity}</td>
                  <td style={{ padding: "9px 12px", color: "var(--muted-foreground)" }}>{row.factor}</td>
                  <td style={{ padding: "9px 12px", color: "var(--foreground)", fontWeight: 600 }}>{row.tco2e}</td>
                  <td style={{ padding: "9px 12px", color: "var(--muted-foreground)" }}>{row.year}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      <Card style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold" style={{ color: "var(--foreground)" }}>Reduction Targets</CardTitle>
        </CardHeader>
        <CardContent>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                {["Target","Baseline Year","Target Year","Baseline","Current","Progress"].map(h => (
                  <th key={h} style={{ padding: "8px 12px", textAlign: "left", color: "var(--muted-foreground)", fontWeight: 500, fontSize: 12 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {reductionTargets.map(t => {
                const progress = t.baselineVal > 0
                  ? Math.min(100, Math.round(((t.baselineVal - t.current) / t.baselineVal) * 100 * 2))
                  : t.current
                return (
                  <tr key={t.target} style={{ borderBottom: "1px solid var(--border)" }}>
                    <td style={{ padding: "10px 12px", color: "var(--foreground)", fontWeight: 500 }}>{t.target}</td>
                    <td style={{ padding: "10px 12px", color: "var(--muted-foreground)" }}>{t.baseline}</td>
                    <td style={{ padding: "10px 12px", color: "var(--muted-foreground)" }}>{t.targetYear}</td>
                    <td style={{ padding: "10px 12px", color: "var(--foreground)" }}>{t.baselineVal} {t.unit}</td>
                    <td style={{ padding: "10px 12px", color: "var(--foreground)", fontWeight: 600 }}>{t.current} {t.unit}</td>
                    <td style={{ padding: "10px 12px", minWidth: 120 }}>
                      <div style={{ height: 8, background: "var(--border)", borderRadius: 9999 }}>
                        <div style={{ width: `${Math.min(progress, 100)}%`, height: "100%", background: "#16a34a", borderRadius: 9999 }} />
                      </div>
                      <span style={{ fontSize: 10, color: "#16a34a", fontWeight: 600 }}>{Math.min(progress, 100)}% done</span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </CardContent>
      </Card>

      <Card style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold" style={{ color: "var(--foreground)" }}>Carbon Offsets Purchased</CardTitle>
          <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>Total offset: 280 tCO2e · Total spend: £3,345</p>
        </CardHeader>
        <CardContent>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                {["Project","Standard","Vintage","Quantity (t)","Price/t","Total Cost"].map(h => (
                  <th key={h} style={{ padding: "8px 12px", textAlign: "left", color: "var(--muted-foreground)", fontWeight: 500, fontSize: 12 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {carbonOffsets.map(o => (
                <tr key={o.project} style={{ borderBottom: "1px solid var(--border)" }}>
                  <td style={{ padding: "10px 12px", color: "var(--foreground)", fontWeight: 500 }}>{o.project}</td>
                  <td style={{ padding: "10px 12px" }}>
                    <span style={{ backgroundColor: "#dcfce7", color: "#16a34a", padding: "2px 8px", borderRadius: 9999, fontSize: 11, fontWeight: 500 }}>{o.standard}</span>
                  </td>
                  <td style={{ padding: "10px 12px", color: "var(--muted-foreground)" }}>{o.vintage}</td>
                  <td style={{ padding: "10px 12px", color: "var(--foreground)", fontWeight: 600 }}>{o.quantity}</td>
                  <td style={{ padding: "10px 12px", color: "var(--muted-foreground)" }}>{o.price}</td>
                  <td style={{ padding: "10px 12px", color: "var(--foreground)", fontWeight: 600 }}>{o.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          <DialogHeader>
            <DialogTitle style={{ color: "var(--foreground)" }}>Add Emission Source</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <label className="text-xs font-medium mb-1 block" style={{ color: "var(--muted-foreground)" }}>Source Name</label>
              <input
                value={form.source}
                onChange={e => setFormField("source", e.target.value)}
                placeholder="e.g. Office Boiler – Manchester"
                style={{ width: "100%", height: 38, padding: "0 12px", borderRadius: 6, border: "1px solid var(--border)", background: "var(--background)", color: "var(--foreground)", fontSize: 13 }}
              />
            </div>
            <div>
              <label className="text-xs font-medium mb-1 block" style={{ color: "var(--muted-foreground)" }}>Category</label>
              <Select value={form.category} onValueChange={v => setFormField("category", v)}>
                <SelectTrigger style={{ height: 38, fontSize: 13 }}><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Scope 1">Scope 1 – Direct</SelectItem>
                  <SelectItem value="Scope 2">Scope 2 – Energy Indirect</SelectItem>
                  <SelectItem value="Scope 3">Scope 3 – Value Chain</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium mb-1 block" style={{ color: "var(--muted-foreground)" }}>Quantity</label>
                <input
                  value={form.quantity}
                  onChange={e => setFormField("quantity", e.target.value)}
                  placeholder="e.g. 25000"
                  type="number"
                  style={{ width: "100%", height: 38, padding: "0 12px", borderRadius: 6, border: "1px solid var(--border)", background: "var(--background)", color: "var(--foreground)", fontSize: 13 }}
                />
              </div>
              <div>
                <label className="text-xs font-medium mb-1 block" style={{ color: "var(--muted-foreground)" }}>Unit</label>
                <input
                  value={form.unit}
                  onChange={e => setFormField("unit", e.target.value)}
                  placeholder="kWh, litres, km…"
                  style={{ width: "100%", height: 38, padding: "0 12px", borderRadius: 6, border: "1px solid var(--border)", background: "var(--background)", color: "var(--foreground)", fontSize: 13 }}
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-medium mb-1 block" style={{ color: "var(--muted-foreground)" }}>Emission Factor (kgCO2e/unit)</label>
              <input
                value={form.factor}
                onChange={e => setFormField("factor", e.target.value)}
                placeholder="e.g. 0.23314"
                type="number"
                step="0.00001"
                style={{ width: "100%", height: 38, padding: "0 12px", borderRadius: 6, border: "1px solid var(--border)", background: "var(--background)", color: "var(--foreground)", fontSize: 13 }}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button style={{ background: "var(--primary)", color: "#fff" }} onClick={() => setShowModal(false)}>Add Source</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
