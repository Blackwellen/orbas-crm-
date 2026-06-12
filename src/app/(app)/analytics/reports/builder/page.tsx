"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Save, Play, Plus, X, ChevronDown, ChevronRight, BarChart3, LineChart, PieChart,
  Table2, Layers, GripVertical, BookOpen, Filter, ArrowUpDown, Group
} from "lucide-react"

const dataSources = [
  {
    module: "CRM",
    fields: [
      { id: "crm_contact_name", label: "Contact Name", type: "text" },
      { id: "crm_contact_email", label: "Contact Email", type: "text" },
      { id: "crm_deal_value", label: "Deal Value", type: "currency" },
      { id: "crm_deal_stage", label: "Deal Stage", type: "select" },
      { id: "crm_lead_source", label: "Lead Source", type: "select" },
      { id: "crm_account_name", label: "Account Name", type: "text" },
      { id: "crm_close_date", label: "Close Date", type: "date" },
    ],
  },
  {
    module: "Accounting",
    fields: [
      { id: "acc_invoice_number", label: "Invoice Number", type: "text" },
      { id: "acc_invoice_amount", label: "Invoice Amount", type: "currency" },
      { id: "acc_payment_date", label: "Payment Date", type: "date" },
      { id: "acc_payment_status", label: "Payment Status", type: "select" },
      { id: "acc_tax_amount", label: "Tax Amount", type: "currency" },
    ],
  },
  {
    module: "People",
    fields: [
      { id: "hr_employee_name", label: "Employee Name", type: "text" },
      { id: "hr_department", label: "Department", type: "select" },
      { id: "hr_salary", label: "Salary", type: "currency" },
      { id: "hr_hire_date", label: "Hire Date", type: "date" },
      { id: "hr_status", label: "Employment Status", type: "select" },
    ],
  },
  {
    module: "Projects",
    fields: [
      { id: "proj_name", label: "Project Name", type: "text" },
      { id: "proj_status", label: "Status", type: "select" },
      { id: "proj_budget", label: "Budget", type: "currency" },
      { id: "proj_due_date", label: "Due Date", type: "date" },
    ],
  },
]

const chartTypes = [
  { id: "table", label: "Table", icon: Table2 },
  { id: "bar", label: "Bar Chart", icon: BarChart3 },
  { id: "line", label: "Line Chart", icon: LineChart },
  { id: "pie", label: "Pie Chart", icon: PieChart },
  { id: "kpi", label: "KPI Card", icon: Layers },
]

const savedReports = [
  { id: 1, name: "Monthly Deal Pipeline", lastRun: "2 hours ago" },
  { id: 2, name: "Invoice Ageing Summary", lastRun: "Yesterday" },
  { id: 3, name: "Headcount by Department", lastRun: "3 days ago" },
  { id: 4, name: "Quarterly Revenue", lastRun: "1 week ago" },
]

const mockPreviewData = [
  { contact: "Sarah Mitchell", stage: "Proposal Sent", value: "£24,500", source: "Referral", closeDate: "15 Jul 2025" },
  { contact: "James Holloway", stage: "Negotiation", value: "£87,000", source: "Outbound", closeDate: "22 Jul 2025" },
  { contact: "Emma Thornton", stage: "Discovery", value: "£12,200", source: "Inbound", closeDate: "10 Aug 2025" },
  { contact: "Liam Hargreaves", stage: "Closed Won", value: "£156,000", source: "Partner", closeDate: "01 Jun 2025" },
  { contact: "Olivia Pemberton", stage: "Proposal Sent", value: "£34,750", source: "Referral", closeDate: "18 Jul 2025" },
  { contact: "Noah Blackwood", stage: "Qualified", value: "£9,800", source: "Inbound", closeDate: "30 Aug 2025" },
  { contact: "Charlotte Forsythe", stage: "Closed Won", value: "£225,000", source: "Partner", closeDate: "28 May 2025" },
  { contact: "Benjamin Croft", stage: "Discovery", value: "£18,400", source: "Outbound", closeDate: "12 Sep 2025" },
  { contact: "Amelia Whitmore", stage: "Negotiation", value: "£61,000", source: "Referral", closeDate: "05 Aug 2025" },
  { contact: "William Ashworth", stage: "Proposal Sent", value: "£43,200", source: "Inbound", closeDate: "20 Jul 2025" },
]

type FilterRow = { id: number; field: string; operator: string; value: string }
type SortRow = { id: number; field: string; direction: string }
type Field = { id: string; label: string; type: string }

export default function ReportBuilderPage() {
  const [activeTab, setActiveTab] = useState<"builder" | "saved">("builder")
  const [expandedModules, setExpandedModules] = useState<string[]>(["CRM"])
  const [selectedFields, setSelectedFields] = useState<Field[]>([
    { id: "crm_contact_name", label: "Contact Name", type: "text" },
    { id: "crm_deal_stage", label: "Deal Stage", type: "select" },
    { id: "crm_deal_value", label: "Deal Value", type: "currency" },
  ])
  const [filters, setFilters] = useState<FilterRow[]>([])
  const [sorts, setSorts] = useState<SortRow[]>([])
  const [groupBy, setGroupBy] = useState<string>("")
  const [chartType, setChartType] = useState("table")
  const [xAxis, setXAxis] = useState("")
  const [yAxis, setYAxis] = useState("")
  const [reportName, setReportName] = useState("Untitled Report")
  const [nextId, setNextId] = useState(1)

  function toggleModule(mod: string) {
    setExpandedModules(prev =>
      prev.includes(mod) ? prev.filter(m => m !== mod) : [...prev, mod]
    )
  }

  function addField(field: Field) {
    if (!selectedFields.find(f => f.id === field.id)) {
      setSelectedFields(prev => [...prev, field])
    }
  }

  function removeField(id: string) {
    setSelectedFields(prev => prev.filter(f => f.id !== id))
  }

  function addFilter() {
    setFilters(prev => [...prev, { id: nextId, field: "", operator: "equals", value: "" }])
    setNextId(n => n + 1)
  }

  function removeFilter(id: number) {
    setFilters(prev => prev.filter(f => f.id !== id))
  }

  function addSort() {
    setSorts(prev => [...prev, { id: nextId, field: "", direction: "asc" }])
    setNextId(n => n + 1)
  }

  function removeSort(id: number) {
    setSorts(prev => prev.filter(s => s.id !== id))
  }

  const allFields = dataSources.flatMap(ds => ds.fields)

  return (
    <div style={{ background: "var(--background)", minHeight: "100vh" }}>
      <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: "1px solid var(--border)", background: "var(--card)" }}>
        <div className="flex items-center gap-4">
          <div>
            <input
              value={reportName}
              onChange={e => setReportName(e.target.value)}
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: "var(--foreground)",
                background: "transparent",
                border: "none",
                outline: "none",
                borderBottom: "2px solid var(--border)",
              }}
            />
          </div>
          <div className="flex gap-1">
            {(["builder", "saved"] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: "6px 14px",
                  borderRadius: 6,
                  fontSize: 13,
                  fontWeight: 500,
                  background: activeTab === tab ? "var(--primary)" : "transparent",
                  color: activeTab === tab ? "#fff" : "var(--muted-foreground)",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {tab === "builder" ? "Builder" : "My Reports"}
              </button>
            ))}
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Save className="w-4 h-4" />
            Save Report
          </Button>
          <Button size="sm" className="flex items-center gap-2" style={{ background: "var(--primary)", color: "#fff" }}>
            <Play className="w-4 h-4" />
            Run Report
          </Button>
        </div>
      </div>

      {activeTab === "saved" ? (
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4" style={{ color: "var(--foreground)" }}>Saved Reports</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {savedReports.map(r => (
              <Card key={r.id} style={{ background: "var(--card)", border: "1px solid var(--border)", cursor: "pointer" }}
                onClick={() => setActiveTab("builder")}>
                <CardContent className="pt-4 pb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-sm" style={{ color: "var(--foreground)" }}>{r.name}</div>
                      <div className="text-xs mt-1" style={{ color: "var(--muted-foreground)" }}>Last run: {r.lastRun}</div>
                    </div>
                    <Button size="sm" variant="outline"><Play className="w-3 h-3 mr-1" />Run</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex h-[calc(100vh-64px)]">
          <div style={{ width: 260, borderRight: "1px solid var(--border)", background: "var(--card)", overflowY: "auto", flexShrink: 0 }}>
            <div className="p-3">
              <div className="flex items-center gap-2 mb-3">
                <BookOpen className="w-4 h-4" style={{ color: "var(--muted-foreground)" }} />
                <span className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>Data Sources</span>
              </div>
              {dataSources.map(ds => (
                <div key={ds.module} className="mb-1">
                  <button
                    onClick={() => toggleModule(ds.module)}
                    className="w-full flex items-center gap-2 px-2 py-2 rounded"
                    style={{ background: expandedModules.includes(ds.module) ? "var(--secondary)" : "transparent", color: "var(--foreground)", border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600 }}
                  >
                    {expandedModules.includes(ds.module) ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
                    {ds.module}
                  </button>
                  {expandedModules.includes(ds.module) && (
                    <div className="ml-4 mt-1 space-y-0.5">
                      {ds.fields.map(field => (
                        <button
                          key={field.id}
                          onClick={() => addField(field)}
                          className="w-full text-left px-2 py-1.5 rounded text-xs"
                          style={{
                            color: selectedFields.find(f => f.id === field.id) ? "#1a56db" : "var(--muted-foreground)",
                            background: selectedFields.find(f => f.id === field.id) ? "#eff6ff" : "transparent",
                            border: "none",
                            cursor: "pointer",
                          }}
                        >
                          {field.label}
                          <span style={{ marginLeft: 4, fontSize: 10, opacity: 0.6 }}>{field.type}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div style={{ flex: 1, overflowY: "auto", background: "var(--background)" }}>
            <div className="p-5 space-y-5">
              <Card style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
                <CardHeader className="pb-2 pt-4">
                  <div className="flex items-center gap-2">
                    <Table2 className="w-4 h-4" style={{ color: "var(--muted-foreground)" }} />
                    <CardTitle className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>Fields</CardTitle>
                    <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>— click fields in the left panel to add</span>
                  </div>
                </CardHeader>
                <CardContent>
                  {selectedFields.length === 0 ? (
                    <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>No fields selected. Click a field in the left panel.</p>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {selectedFields.map(f => (
                        <div key={f.id} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
                          style={{ background: "var(--secondary)", color: "var(--foreground)", border: "1px solid var(--border)" }}>
                          <GripVertical className="w-3 h-3" style={{ color: "var(--muted-foreground)" }} />
                          {f.label}
                          <button onClick={() => removeField(f.id)} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center" }}>
                            <X className="w-3 h-3" style={{ color: "var(--muted-foreground)" }} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
                <CardHeader className="pb-2 pt-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Filter className="w-4 h-4" style={{ color: "var(--muted-foreground)" }} />
                      <CardTitle className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>Filters</CardTitle>
                    </div>
                    <Button variant="outline" size="sm" onClick={addFilter} className="flex items-center gap-1 text-xs">
                      <Plus className="w-3 h-3" />Add Filter
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {filters.length === 0 ? (
                    <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>No filters added.</p>
                  ) : (
                    <div className="space-y-2">
                      {filters.map(f => (
                        <div key={f.id} className="flex items-center gap-2">
                          <Select value={f.field} onValueChange={v => setFilters(prev => prev.map(x => x.id === f.id ? { ...x, field: v } : x))}>
                            <SelectTrigger className="w-36 h-8 text-xs">
                              <SelectValue placeholder="Field" />
                            </SelectTrigger>
                            <SelectContent>
                              {allFields.map(af => <SelectItem key={af.id} value={af.id}>{af.label}</SelectItem>)}
                            </SelectContent>
                          </Select>
                          <Select value={f.operator} onValueChange={v => setFilters(prev => prev.map(x => x.id === f.id ? { ...x, operator: v } : x))}>
                            <SelectTrigger className="w-28 h-8 text-xs">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="equals">Equals</SelectItem>
                              <SelectItem value="not_equals">Not Equals</SelectItem>
                              <SelectItem value="contains">Contains</SelectItem>
                              <SelectItem value="gt">Greater Than</SelectItem>
                              <SelectItem value="lt">Less Than</SelectItem>
                              <SelectItem value="is_empty">Is Empty</SelectItem>
                            </SelectContent>
                          </Select>
                          <input
                            value={f.value}
                            onChange={e => setFilters(prev => prev.map(x => x.id === f.id ? { ...x, value: e.target.value } : x))}
                            placeholder="Value"
                            style={{ flex: 1, height: 32, padding: "0 10px", fontSize: 12, borderRadius: 6, border: "1px solid var(--border)", background: "var(--background)", color: "var(--foreground)" }}
                          />
                          <button onClick={() => removeFilter(f.id)} style={{ background: "none", border: "none", cursor: "pointer" }}>
                            <X className="w-4 h-4" style={{ color: "var(--muted-foreground)" }} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              <div className="grid grid-cols-2 gap-4">
                <Card style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
                  <CardHeader className="pb-2 pt-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <ArrowUpDown className="w-4 h-4" style={{ color: "var(--muted-foreground)" }} />
                        <CardTitle className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>Sort</CardTitle>
                      </div>
                      <Button variant="outline" size="sm" onClick={addSort} className="flex items-center gap-1 text-xs">
                        <Plus className="w-3 h-3" />Add
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {sorts.length === 0 ? (
                      <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>No sort rules.</p>
                    ) : (
                      <div className="space-y-2">
                        {sorts.map(s => (
                          <div key={s.id} className="flex items-center gap-2">
                            <Select value={s.field} onValueChange={v => setSorts(prev => prev.map(x => x.id === s.id ? { ...x, field: v } : x))}>
                              <SelectTrigger className="flex-1 h-8 text-xs"><SelectValue placeholder="Field" /></SelectTrigger>
                              <SelectContent>
                                {allFields.map(af => <SelectItem key={af.id} value={af.id}>{af.label}</SelectItem>)}
                              </SelectContent>
                            </Select>
                            <Select value={s.direction} onValueChange={v => setSorts(prev => prev.map(x => x.id === s.id ? { ...x, direction: v } : x))}>
                              <SelectTrigger className="w-20 h-8 text-xs"><SelectValue /></SelectTrigger>
                              <SelectContent>
                                <SelectItem value="asc">ASC</SelectItem>
                                <SelectItem value="desc">DESC</SelectItem>
                              </SelectContent>
                            </Select>
                            <button onClick={() => removeSort(s.id)} style={{ background: "none", border: "none", cursor: "pointer" }}>
                              <X className="w-3 h-3" style={{ color: "var(--muted-foreground)" }} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
                  <CardHeader className="pb-2 pt-4">
                    <div className="flex items-center gap-2">
                      <Group className="w-4 h-4" style={{ color: "var(--muted-foreground)" }} />
                      <CardTitle className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>Group By</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Select value={groupBy} onValueChange={setGroupBy}>
                      <SelectTrigger className="w-full h-8 text-xs"><SelectValue placeholder="No grouping" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">None</SelectItem>
                        {allFields.filter(f => f.type === "select").map(af => (
                          <SelectItem key={af.id} value={af.id}>{af.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </CardContent>
                </Card>
              </div>

              <Card style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
                <CardHeader className="pb-2 pt-4">
                  <CardTitle className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>Report Preview</CardTitle>
                  <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>Showing 10 sample rows based on selected configuration</p>
                </CardHeader>
                <CardContent className="overflow-x-auto">
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                    <thead>
                      <tr style={{ borderBottom: "1px solid var(--border)" }}>
                        {["Contact","Stage","Deal Value","Lead Source","Close Date"].map(h => (
                          <th key={h} style={{ padding: "8px 12px", textAlign: "left", color: "var(--muted-foreground)", fontWeight: 500 }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {mockPreviewData.map((row, i) => (
                        <tr key={i} style={{ borderBottom: "1px solid var(--border)" }}>
                          <td style={{ padding: "8px 12px", color: "var(--foreground)", fontWeight: 500 }}>{row.contact}</td>
                          <td style={{ padding: "8px 12px" }}>
                            <span style={{ backgroundColor: "#eff6ff", color: "#1a56db", padding: "2px 8px", borderRadius: 9999, fontSize: 11, fontWeight: 500 }}>{row.stage}</span>
                          </td>
                          <td style={{ padding: "8px 12px", color: "var(--foreground)", fontWeight: 600 }}>{row.value}</td>
                          <td style={{ padding: "8px 12px", color: "var(--muted-foreground)" }}>{row.source}</td>
                          <td style={{ padding: "8px 12px", color: "var(--muted-foreground)" }}>{row.closeDate}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </CardContent>
              </Card>
            </div>
          </div>

          <div style={{ width: 240, borderLeft: "1px solid var(--border)", background: "var(--card)", overflowY: "auto", flexShrink: 0 }}>
            <div className="p-4 space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <BarChart3 className="w-4 h-4" style={{ color: "var(--muted-foreground)" }} />
                  <span className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>Visualisation</span>
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  {chartTypes.map(ct => (
                    <button
                      key={ct.id}
                      onClick={() => setChartType(ct.id)}
                      style={{
                        padding: "8px 4px",
                        borderRadius: 6,
                        border: chartType === ct.id ? "2px solid #1a56db" : "1px solid var(--border)",
                        background: chartType === ct.id ? "#eff6ff" : "var(--background)",
                        color: chartType === ct.id ? "#1a56db" : "var(--muted-foreground)",
                        cursor: "pointer",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 4,
                        fontSize: 10,
                        fontWeight: 500,
                      }}
                    >
                      <ct.icon className="w-4 h-4" />
                      {ct.label}
                    </button>
                  ))}
                </div>
              </div>

              {chartType !== "table" && chartType !== "kpi" && (
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-medium mb-1 block" style={{ color: "var(--muted-foreground)" }}>X Axis</label>
                    <Select value={xAxis} onValueChange={setXAxis}>
                      <SelectTrigger className="w-full h-8 text-xs"><SelectValue placeholder="Select field" /></SelectTrigger>
                      <SelectContent>
                        {selectedFields.map(f => <SelectItem key={f.id} value={f.id}>{f.label}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-xs font-medium mb-1 block" style={{ color: "var(--muted-foreground)" }}>Y Axis</label>
                    <Select value={yAxis} onValueChange={setYAxis}>
                      <SelectTrigger className="w-full h-8 text-xs"><SelectValue placeholder="Select field" /></SelectTrigger>
                      <SelectContent>
                        {selectedFields.filter(f => f.type === "currency").map(f => <SelectItem key={f.id} value={f.id}>{f.label}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              <div style={{ borderTop: "1px solid var(--border)", paddingTop: 12 }}>
                <p className="text-xs font-semibold mb-2" style={{ color: "var(--foreground)" }}>Summary</p>
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span style={{ color: "var(--muted-foreground)" }}>Fields</span>
                    <span style={{ color: "var(--foreground)", fontWeight: 600 }}>{selectedFields.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: "var(--muted-foreground)" }}>Filters</span>
                    <span style={{ color: "var(--foreground)", fontWeight: 600 }}>{filters.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: "var(--muted-foreground)" }}>Sort Rules</span>
                    <span style={{ color: "var(--foreground)", fontWeight: 600 }}>{sorts.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: "var(--muted-foreground)" }}>Group By</span>
                    <span style={{ color: "var(--foreground)", fontWeight: 600 }}>{groupBy ? allFields.find(f => f.id === groupBy)?.label : "None"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
