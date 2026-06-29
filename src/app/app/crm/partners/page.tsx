"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, Users, TrendingUp, Globe, Award, MoreHorizontal } from "lucide-react"
import { formatCurrency } from "@/lib/utils"

const partners = [
  { id: "pt1", company: "TechBridge Solutions", tier: "Gold", region: "London", revenueYTD: 284000, dealsClosed: 12, certifications: 4, contact: "Mark Ellis", contactEmail: "mark@techbridge.co.uk" },
  { id: "pt2", company: "Nexus Consulting Group", tier: "Gold", region: "Midlands", revenueYTD: 241000, dealsClosed: 9, certifications: 4, contact: "Sarah Kim", contactEmail: "sarah@nexus.co.uk" },
  { id: "pt3", company: "Pinnacle Systems Ltd", tier: "Silver", region: "North England", revenueYTD: 167000, dealsClosed: 7, certifications: 3, contact: "Tom Walker", contactEmail: "tom@pinnaclesys.co.uk" },
  { id: "pt4", company: "Clearwater Digital", tier: "Silver", region: "Scotland", revenueYTD: 134000, dealsClosed: 6, certifications: 2, contact: "Claire Ross", contactEmail: "claire@clearwater.co.uk" },
  { id: "pt5", company: "Horizon IT Partners", tier: "Gold", region: "South West", revenueYTD: 198000, dealsClosed: 8, certifications: 4, contact: "James Patel", contactEmail: "james@horizonit.co.uk" },
  { id: "pt6", company: "BlueSky Networks", tier: "Bronze", region: "Wales", revenueYTD: 52000, dealsClosed: 3, certifications: 1, contact: "Owen Hughes", contactEmail: "owen@bluesky.co.uk" },
  { id: "pt7", company: "Streamline MSP", tier: "Silver", region: "London", revenueYTD: 121000, dealsClosed: 5, certifications: 3, contact: "Priya Singh", contactEmail: "priya@streamline.co.uk" },
  { id: "pt8", company: "CoreTech Alliance", tier: "Prospect", region: "Midlands", revenueYTD: 0, dealsClosed: 0, certifications: 0, contact: "David Lee", contactEmail: "david@coretech.co.uk" },
  { id: "pt9", company: "Apex Partners UK", tier: "Bronze", region: "North England", revenueYTD: 43000, dealsClosed: 2, certifications: 1, contact: "Rachel Moore", contactEmail: "rachel@apexpartners.co.uk" },
  { id: "pt10", company: "Summit Technology", tier: "Silver", region: "South West", revenueYTD: 109000, dealsClosed: 4, certifications: 2, contact: "Chris Taylor", contactEmail: "chris@summitech.co.uk" },
  { id: "pt11", company: "Quantum Integrators", tier: "Gold", region: "Scotland", revenueYTD: 176000, dealsClosed: 7, certifications: 3, contact: "Fiona Campbell", contactEmail: "fiona@quantumint.co.uk" },
  { id: "pt12", company: "CloudFirst Consulting", tier: "Bronze", region: "Wales", revenueYTD: 38000, dealsClosed: 2, certifications: 1, contact: "Gareth Evans", contactEmail: "gareth@cloudfirst.co.uk" },
  { id: "pt13", company: "EdgePoint Solutions", tier: "Prospect", region: "London", revenueYTD: 0, dealsClosed: 0, certifications: 0, contact: "Amy Chen", contactEmail: "amy@edgepoint.co.uk" },
  { id: "pt14", company: "Redwood Tech Group", tier: "Silver", region: "Midlands", revenueYTD: 94000, dealsClosed: 4, certifications: 2, contact: "Nick Brown", contactEmail: "nick@redwoodtech.co.uk" },
  { id: "pt15", company: "VantagePoint IT", tier: "Bronze", region: "North England", revenueYTD: 31000, dealsClosed: 1, certifications: 1, contact: "Lisa Ward", contactEmail: "lisa@vantagepoint.co.uk" },
]

const tierBadge = (tier: string) => {
  const map: Record<string, { bg: string; color: string }> = {
    Gold:    { bg: "#fef9c3", color: "#ca8a04" },
    Silver:  { bg: "#f1f5f9", color: "#64748b" },
    Bronze:  { bg: "#fff7ed", color: "#c2410c" },
    Prospect:{ bg: "#dbeafe", color: "#1d4ed8" },
  }
  return map[tier] ?? { bg: "#f1f5f9", color: "#64748b" }
}

const tiers = ["All", "Gold", "Silver", "Bronze", "Prospect"]
const regions = ["All Regions", "London", "Midlands", "North England", "Scotland", "Wales", "South West"]

export default function PartnersPage() {
  const [search, setSearch] = useState("")
  const [tierFilter, setTierFilter] = useState("All")
  const [regionFilter, setRegionFilter] = useState("All Regions")

  const filtered = partners.filter(p => {
    const matchSearch = search === "" || p.company.toLowerCase().includes(search.toLowerCase()) || p.contact.toLowerCase().includes(search.toLowerCase())
    const matchTier = tierFilter === "All" || p.tier === tierFilter
    const matchRegion = regionFilter === "All Regions" || p.region === regionFilter
    return matchSearch && matchTier && matchRegion
  })

  const totalRev = partners.reduce((a, p) => a + p.revenueYTD, 0)
  const totalDeals = partners.reduce((a, p) => a + p.dealsClosed, 0)
  const avgDeal = totalDeals > 0 ? Math.round(totalRev / totalDeals) : 0

  return (
    <div className="p-6" style={{ color: "var(--foreground)" }}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Partners</h1>
          <p className="text-sm mt-1" style={{ color: "var(--muted-foreground)" }}>Channel and reseller partner management</p>
        </div>
        <Button style={{ backgroundColor: "var(--primary)", color: "#fff" }}>
          <Plus className="w-4 h-4 mr-2" />
          Add Partner
        </Button>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Partners", value: String(partners.length), icon: Users, color: "#1d4ed8" },
          { label: "Active Partners", value: String(partners.filter(p => p.tier !== "Prospect").length), icon: Award, color: "#16a34a" },
          { label: "Revenue via Partners", value: formatCurrency(totalRev), icon: TrendingUp, color: "#7c3aed" },
          { label: "Avg Deal Size", value: formatCurrency(avgDeal), icon: Globe, color: "#d97706" },
        ].map(s => (
          <Card key={s.label} style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: s.color + "1a" }}>
                <s.icon className="w-5 h-5" style={{ color: s.color }} />
              </div>
              <div>
                <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>{s.label}</p>
                <p className="text-xl font-bold">{s.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex gap-3 mb-5">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "var(--muted-foreground)" }} />
          <Input
            placeholder="Search partners..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-9"
            style={{ background: "var(--card)", border: "1px solid var(--border)" }}
          />
        </div>
        <Select value={tierFilter} onValueChange={setTierFilter}>
          <SelectTrigger className="w-36" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {tiers.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={regionFilter} onValueChange={setRegionFilter}>
          <SelectTrigger className="w-44" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {regions.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}
          </SelectContent>
        </Select>
        <span className="text-sm self-center" style={{ color: "var(--muted-foreground)" }}>{filtered.length} partners</span>
      </div>

      <Card style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
        <div style={{ overflowX: "auto" }}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)", background: "var(--secondary)" }}>
                {["Company", "Tier", "Region", "Revenue YTD", "Deals Closed", "Certifications", "Contact", "Actions"].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold" style={{ color: "var(--muted-foreground)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => {
                const tb = tierBadge(p.tier)
                return (
                  <tr key={p.id} style={{ borderBottom: "1px solid var(--border)" }} className="hover:bg-[var(--secondary)] transition-colors">
                    <td className="px-4 py-3">
                      <Link href={`/app/crm/partners/${p.id}`} className="font-medium hover:underline" style={{ color: "var(--foreground)" }}>
                        {p.company}
                      </Link>
                    </td>
                    <td className="px-4 py-3">
                      <span style={{ backgroundColor: tb.bg, color: tb.color, padding: "2px 8px", borderRadius: "9999px", fontSize: "12px", fontWeight: 500 }}>{p.tier}</span>
                    </td>
                    <td className="px-4 py-3" style={{ color: "var(--muted-foreground)" }}>{p.region}</td>
                    <td className="px-4 py-3 font-semibold">{p.revenueYTD > 0 ? formatCurrency(p.revenueYTD) : "—"}</td>
                    <td className="px-4 py-3">{p.dealsClosed}</td>
                    <td className="px-4 py-3">
                      {p.certifications > 0 ? (
                        <div className="flex items-center gap-1">
                          <Award className="w-3.5 h-3.5" style={{ color: "#ca8a04" }} />
                          <span>{p.certifications}</span>
                        </div>
                      ) : "—"}
                    </td>
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium">{p.contact}</p>
                        <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>{p.contactEmail}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0"><MoreHorizontal className="w-4 h-4" /></Button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
