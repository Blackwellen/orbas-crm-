"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Target, Search, Plus, Eye, Edit2, AlertTriangle } from "lucide-react"
import { formatCurrency, formatDate } from "@/lib/utils"

const pledges = [
  { id: "pl1", donor: "The Hartley Foundation", campaign: "2026 Capital Appeal", pledged: 250000, collected: 200000, frequency: "Quarterly", startDate: "2025-01-01", status: "Active" },
  { id: "pl2", donor: "Margaret Sinclair", campaign: "Children's Education Fund", pledged: 12000, collected: 12000, frequency: "Monthly", startDate: "2024-03-01", status: "Collected" },
  { id: "pl3", donor: "GreenTech Solutions Ltd", campaign: "Climate Action 2026", pledged: 75000, collected: 25000, frequency: "Annual", startDate: "2026-01-01", status: "Partial" },
  { id: "pl4", donor: "Robert Ashworth", campaign: "Food Bank Emergency", pledged: 5000, collected: 0, frequency: "One-off", startDate: "2026-04-15", status: "Overdue" },
  { id: "pl5", donor: "Blackwood Family Trust", campaign: "2026 Capital Appeal", pledged: 100000, collected: 100000, frequency: "One-off", startDate: "2025-09-01", status: "Collected" },
  { id: "pl6", donor: "Claire Whitmore", campaign: "Children's Education Fund", pledged: 3600, collected: 1800, frequency: "Monthly", startDate: "2025-06-01", status: "Active" },
  { id: "pl7", donor: "Northern Charitable Trust", campaign: "Community Outreach 2026", pledged: 45000, collected: 15000, frequency: "Quarterly", startDate: "2026-01-01", status: "Active" },
  { id: "pl8", donor: "David Osei", campaign: "Marathon Challenge", pledged: 2500, collected: 2500, frequency: "One-off", startDate: "2026-04-21", status: "Collected" },
  { id: "pl9", donor: "Meridian Bank PLC", campaign: "2026 Capital Appeal", pledged: 500000, collected: 250000, frequency: "Annual", startDate: "2025-07-01", status: "Partial" },
  { id: "pl10", donor: "Olivia Chambers", campaign: "Children's Education Fund", pledged: 1200, collected: 300, frequency: "Monthly", startDate: "2026-03-01", status: "Active" },
  { id: "pl11", donor: "Sunrise Housing Group", campaign: "Homeless Support Initiative", pledged: 30000, collected: 0, frequency: "Annual", startDate: "2025-12-01", status: "Overdue" },
  { id: "pl12", donor: "James & Helen Park", campaign: "Marathon Challenge", pledged: 1500, collected: 1500, frequency: "One-off", startDate: "2026-04-21", status: "Collected" },
  { id: "pl13", donor: "Beacon Industries", campaign: "Climate Action 2026", pledged: 60000, collected: 20000, frequency: "Quarterly", startDate: "2026-02-01", status: "Active" },
  { id: "pl14", donor: "Patricia Nguyen", campaign: "Food Bank Emergency", pledged: 800, collected: 800, frequency: "One-off", startDate: "2026-05-01", status: "Collected" },
  { id: "pl15", donor: "Alpha Logistics PLC", campaign: "Community Outreach 2026", pledged: 20000, collected: 0, frequency: "Annual", startDate: "2026-06-01", status: "Cancelled" },
]

function statusBadge(status: string) {
  const map: Record<string, { bg: string; color: string }> = {
    Active: { bg: "#dcfce7", color: "#16a34a" },
    Collected: { bg: "#dbeafe", color: "#1d4ed8" },
    Partial: { bg: "#fef3c7", color: "#d97706" },
    Overdue: { bg: "#fee2e2", color: "#dc2626" },
    Cancelled: { bg: "#f1f5f9", color: "#475569" },
  }
  const s = map[status] ?? map["Cancelled"]
  return (
    <span style={{ backgroundColor: s.bg, color: s.color, padding: "2px 8px", borderRadius: "9999px", fontSize: "12px", fontWeight: 500 }}>
      {status}
    </span>
  )
}

const campaigns = ["All Campaigns", "2026 Capital Appeal", "Children's Education Fund", "Climate Action 2026", "Food Bank Emergency", "Community Outreach 2026", "Marathon Challenge", "Homeless Support Initiative"]

export default function PledgesPage() {
  const router = useRouter()
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [campaignFilter, setCampaignFilter] = useState("all")

  const filtered = pledges.filter(p => {
    const matchSearch = p.donor.toLowerCase().includes(search.toLowerCase()) || p.campaign.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === "all" || p.status.toLowerCase() === statusFilter.toLowerCase()
    const matchCampaign = campaignFilter === "all" || p.campaign === campaignFilter
    return matchSearch && matchStatus && matchCampaign
  })

  const totalPledged = pledges.reduce((a, b) => a + b.pledged, 0)
  const totalCollected = pledges.reduce((a, b) => a + b.collected, 0)
  const outstanding = totalPledged - totalCollected
  const atRisk = pledges.filter(p => p.status === "Overdue").length

  return (
    <div className="p-6" style={{ background: "var(--background)", minHeight: "100vh" }}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div style={{ background: "var(--primary)", borderRadius: "10px", padding: "8px" }}>
            <Target size={22} style={{ color: "#fff" }} />
          </div>
          <div>
            <h1 className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>Pledges</h1>
            <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>Track donor pledges and payment schedules</p>
          </div>
        </div>
        <Button onClick={() => router.push("/app/charity/pledges/new")} style={{ background: "var(--primary)", color: "#fff" }}>
          <Plus size={16} className="mr-2" /> Record Pledge
        </Button>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="rounded-xl border p-4" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
          <p className="text-xs font-medium mb-1" style={{ color: "var(--muted-foreground)" }}>Total Pledged</p>
          <p className="text-2xl font-bold" style={{ color: "#1a56db" }}>{formatCurrency(totalPledged)}</p>
        </div>
        <div className="rounded-xl border p-4" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
          <p className="text-xs font-medium mb-1" style={{ color: "var(--muted-foreground)" }}>Collected</p>
          <p className="text-2xl font-bold" style={{ color: "#16a34a" }}>{formatCurrency(totalCollected)}</p>
        </div>
        <div className="rounded-xl border p-4" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
          <p className="text-xs font-medium mb-1" style={{ color: "var(--muted-foreground)" }}>Outstanding</p>
          <p className="text-2xl font-bold" style={{ color: "#d97706" }}>{formatCurrency(outstanding)}</p>
        </div>
        <div className="rounded-xl border p-4" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
          <p className="text-xs font-medium mb-1" style={{ color: "var(--muted-foreground)" }}>Pledges at Risk</p>
          <p className="text-2xl font-bold flex items-center gap-2" style={{ color: "#dc2626" }}>
            {atRisk} <AlertTriangle size={18} />
          </p>
        </div>
      </div>

      <div className="rounded-xl border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
        <div className="p-4 flex gap-3 flex-wrap border-b" style={{ borderColor: "var(--border)" }}>
          <div className="relative flex-1 min-w-[200px]">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--muted-foreground)" }} />
            <Input placeholder="Search pledges..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9 h-9" style={{ background: "var(--background)", borderColor: "var(--border)", color: "var(--foreground)" }} />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-36 h-9" style={{ background: "var(--background)", borderColor: "var(--border)", color: "var(--foreground)" }}>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="collected">Collected</SelectItem>
              <SelectItem value="partial">Partial</SelectItem>
              <SelectItem value="overdue">Overdue</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
          <Select value={campaignFilter} onValueChange={setCampaignFilter}>
            <SelectTrigger className="w-52 h-9" style={{ background: "var(--background)", borderColor: "var(--border)", color: "var(--foreground)" }}>
              <SelectValue placeholder="Campaign" />
            </SelectTrigger>
            <SelectContent>
              {campaigns.map(c => (
                <SelectItem key={c} value={c === "All Campaigns" ? "all" : c}>{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                {["Donor", "Campaign", "Pledged", "Collected", "Outstanding", "Frequency", "Start Date", "Status", "Actions"].map(h => (
                  <th key={h} className="text-left px-4 py-3 font-medium" style={{ color: "var(--muted-foreground)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((p, i) => (
                <tr key={p.id} className="cursor-pointer" style={{ borderBottom: i < filtered.length - 1 ? "1px solid var(--border)" : "none" }}
                  onClick={() => router.push(`/app/charity/pledges/${p.id}`)}
                  onMouseEnter={e => (e.currentTarget.style.background = "var(--secondary)")}
                  onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                  <td className="px-4 py-3 font-medium" style={{ color: "var(--foreground)" }}>{p.donor}</td>
                  <td className="px-4 py-3" style={{ color: "var(--muted-foreground)" }}>{p.campaign}</td>
                  <td className="px-4 py-3 font-medium" style={{ color: "var(--foreground)" }}>{formatCurrency(p.pledged)}</td>
                  <td className="px-4 py-3" style={{ color: "#16a34a" }}>{formatCurrency(p.collected)}</td>
                  <td className="px-4 py-3" style={{ color: p.pledged - p.collected > 0 ? "#d97706" : "var(--muted-foreground)" }}>
                    {formatCurrency(p.pledged - p.collected)}
                  </td>
                  <td className="px-4 py-3" style={{ color: "var(--muted-foreground)" }}>{p.frequency}</td>
                  <td className="px-4 py-3" style={{ color: "var(--muted-foreground)" }}>{formatDate(p.startDate)}</td>
                  <td className="px-4 py-3">{statusBadge(p.status)}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1" onClick={e => e.stopPropagation()}>
                      <button className="p-1.5 rounded-md" title="View" style={{ color: "var(--muted-foreground)" }} onClick={() => router.push(`/app/charity/pledges/${p.id}`)}>
                        <Eye size={15} />
                      </button>
                      <button className="p-1.5 rounded-md" title="Edit" style={{ color: "var(--muted-foreground)" }}>
                        <Edit2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t" style={{ borderColor: "var(--border)" }}>
          <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>{filtered.length} pledge{filtered.length !== 1 ? "s" : ""} shown</p>
        </div>
      </div>
    </div>
  )
}
