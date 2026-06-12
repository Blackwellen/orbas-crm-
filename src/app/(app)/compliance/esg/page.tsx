"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import {
  Leaf, Users, Shield, Download, ChevronRight, TrendingDown, TrendingUp,
  Globe, Award, AlertCircle, CheckCircle, Building2, Heart
} from "lucide-react"

const sdgGoals = [
  { number: 3, label: "Good Health", color: "#4c9f38" },
  { number: 5, label: "Gender Equality", color: "#ff3a21" },
  { number: 7, label: "Clean Energy", color: "#fcc30b" },
  { number: 10, label: "Reduced Inequalities", color: "#dd1367" },
  { number: 13, label: "Climate Action", color: "#3f7e44" },
  { number: 16, label: "Peace & Justice", color: "#00689d" },
]

const governancePolicies = [
  { policy: "ESG Policy", status: "Approved", date: "Jan 2025" },
  { policy: "Anti-Bribery & Corruption", status: "Approved", date: "Mar 2024" },
  { policy: "Supplier Code of Conduct", status: "Approved", date: "Jun 2024" },
  { policy: "Whistleblower Policy", status: "Approved", date: "Nov 2024" },
  { policy: "Data Privacy Policy", status: "Under Review", date: "May 2025" },
]

export default function ESGPage() {
  const router = useRouter()
  const [activeSection, setActiveSection] = useState<"all" | "env" | "social" | "gov">("all")

  const overallScore = 84
  const grade = "A-"

  return (
    <div className="p-6 space-y-6" style={{ background: "var(--background)", minHeight: "100vh" }}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>ESG Dashboard</h1>
            <p className="text-sm mt-1" style={{ color: "var(--muted-foreground)" }}>Environmental, Social &amp; Governance reporting · FY 2024/25</p>
          </div>
          <div style={{
            display: "flex", flexDirection: "column", alignItems: "center",
            background: "#dcfce7", borderRadius: 12, padding: "6px 16px"
          }}>
            <span style={{ fontSize: 22, fontWeight: 800, color: "#16a34a" }}>{grade}</span>
            <span style={{ fontSize: 11, color: "#16a34a", fontWeight: 600 }}>{overallScore}/100</span>
          </div>
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Download className="w-4 h-4" />
          Download ESG Report
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {[
          {
            key: "env",
            icon: Leaf,
            label: "Environmental",
            score: 82,
            color: "#16a34a",
            bgColor: "#dcfce7",
            subs: [
              { label: "Carbon Emissions", score: 78 },
              { label: "Energy Efficiency", score: 85 },
              { label: "Waste Reduction", score: 81 },
              { label: "Water Management", score: 84 },
            ]
          },
          {
            key: "social",
            icon: Users,
            label: "Social",
            score: 87,
            color: "#2563eb",
            bgColor: "#dbeafe",
            subs: [
              { label: "Diversity & Inclusion", score: 89 },
              { label: "Employee Wellbeing", score: 88 },
              { label: "Community Impact", score: 82 },
              { label: "Supply Chain Ethics", score: 85 },
            ]
          },
          {
            key: "gov",
            icon: Shield,
            label: "Governance",
            score: 83,
            color: "#7c3aed",
            bgColor: "#ede9fe",
            subs: [
              { label: "Board Oversight", score: 86 },
              { label: "Policy Compliance", score: 88 },
              { label: "Transparency", score: 79 },
              { label: "Risk Management", score: 81 },
            ]
          }
        ].map(pillar => (
          <Card key={pillar.key} style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <CardContent className="pt-5 pb-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: pillar.bgColor, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <pillar.icon className="w-5 h-5" style={{ color: pillar.color }} />
                  </div>
                  <span className="font-semibold text-sm" style={{ color: "var(--foreground)" }}>{pillar.label}</span>
                </div>
                <div style={{ fontSize: 22, fontWeight: 800, color: pillar.color }}>{pillar.score}</div>
              </div>
              <div className="mb-3" style={{ height: 6, background: "var(--border)", borderRadius: 9999 }}>
                <div style={{ width: `${pillar.score}%`, height: "100%", background: pillar.color, borderRadius: 9999 }} />
              </div>
              <div className="space-y-2 mt-3">
                {pillar.subs.map(sub => (
                  <div key={sub.label} className="flex items-center justify-between">
                    <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>{sub.label}</span>
                    <div className="flex items-center gap-2">
                      <div style={{ width: 60, height: 4, background: "var(--border)", borderRadius: 9999 }}>
                        <div style={{ width: `${sub.score}%`, height: "100%", background: pillar.color, borderRadius: 9999, opacity: 0.7 }} />
                      </div>
                      <span className="text-xs font-semibold" style={{ color: "var(--foreground)", minWidth: 24, textAlign: "right" }}>{sub.score}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <Card style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold flex items-center gap-2" style={{ color: "var(--foreground)" }}>
                <Leaf className="w-4 h-4" style={{ color: "#16a34a" }} />
                Environmental
              </CardTitle>
              <button
                onClick={() => router.push("/app/compliance/esg/carbon")}
                className="flex items-center gap-1 text-xs font-medium"
                style={{ color: "#1a56db", background: "none", border: "none", cursor: "pointer" }}
              >
                Carbon Report <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Scope 1", value: "245t", sub: "Direct emissions" },
                { label: "Scope 2", value: "189t", sub: "Electricity" },
                { label: "Scope 3", value: "1,847t", sub: "Value chain" },
              ].map(s => (
                <div key={s.label} style={{ background: "#f0fdf4", borderRadius: 8, padding: "10px 12px" }}>
                  <div style={{ fontSize: 11, color: "#16a34a", fontWeight: 600 }}>{s.label}</div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: "#14532d" }}>{s.value}</div>
                  <div style={{ fontSize: 10, color: "#15803d" }}>CO2e</div>
                  <div style={{ fontSize: 10, color: "#6b7280", marginTop: 2 }}>{s.sub}</div>
                </div>
              ))}
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-semibold" style={{ color: "var(--foreground)" }}>Carbon Reduction Progress</span>
                <span className="text-xs" style={{ color: "#16a34a", fontWeight: 600 }}>-12% achieved</span>
              </div>
              <div style={{ height: 10, background: "var(--border)", borderRadius: 9999, overflow: "hidden" }}>
                <div style={{ width: "48%", height: "100%", background: "linear-gradient(90deg,#16a34a,#22c55e)", borderRadius: 9999 }} />
              </div>
              <div className="flex justify-between text-xs mt-1">
                <span style={{ color: "var(--muted-foreground)" }}>Target: -25% by 2027</span>
                <span style={{ color: "var(--muted-foreground)" }}>48% of goal complete</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs p-2 rounded" style={{ background: "#f0fdf4", color: "#15803d" }}>
              <TrendingDown className="w-3 h-3" />
              Total emissions: 2,281 tCO2e · Down 12% year-on-year
            </div>
          </CardContent>
        </Card>

        <Card style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold flex items-center gap-2" style={{ color: "var(--foreground)" }}>
              <Users className="w-4 h-4" style={{ color: "#2563eb" }} />
              Social
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-xs font-semibold mb-2" style={{ color: "var(--foreground)" }}>Gender Diversity</p>
              <div className="flex gap-2">
                <div style={{ flex: 48, height: 20, background: "#60a5fa", borderRadius: "6px 0 0 6px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: 10, color: "#fff", fontWeight: 700 }}>Female 48%</span>
                </div>
                <div style={{ flex: 52, height: 20, background: "#1a56db", borderRadius: "0 6px 6px 0", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: 10, color: "#fff", fontWeight: 700 }}>Male 52%</span>
                </div>
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold mb-2" style={{ color: "var(--foreground)" }}>Ethnicity Breakdown</p>
              <div className="space-y-1.5">
                {[
                  { label: "White British", pct: 58 },
                  { label: "Asian / Asian British", pct: 18 },
                  { label: "Black / African / Caribbean", pct: 12 },
                  { label: "Mixed / Multiple", pct: 7 },
                  { label: "Other", pct: 5 },
                ].map(e => (
                  <div key={e.label} className="flex items-center gap-2">
                    <span className="text-xs" style={{ color: "var(--muted-foreground)", minWidth: 160 }}>{e.label}</span>
                    <div style={{ flex: 1, height: 6, background: "var(--border)", borderRadius: 9999 }}>
                      <div style={{ width: `${e.pct}%`, height: "100%", background: "#2563eb", borderRadius: 9999 }} />
                    </div>
                    <span className="text-xs font-semibold" style={{ color: "var(--foreground)", minWidth: 28, textAlign: "right" }}>{e.pct}%</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div style={{ background: "#eff6ff", borderRadius: 8, padding: "8px 10px", textAlign: "center" }}>
                <div style={{ fontSize: 16, fontWeight: 800, color: "#1a56db" }}>4.2%</div>
                <div style={{ fontSize: 10, color: "#2563eb" }}>Gender Pay Gap</div>
              </div>
              <div style={{ background: "#f0fdf4", borderRadius: 8, padding: "8px 10px", textAlign: "center" }}>
                <div style={{ fontSize: 16, fontWeight: 800, color: "#16a34a" }}>72</div>
                <div style={{ fontSize: 10, color: "#15803d" }}>Employee NPS</div>
              </div>
              <div style={{ background: "#faf5ff", borderRadius: 8, padding: "8px 10px", textAlign: "center" }}>
                <div style={{ fontSize: 15, fontWeight: 800, color: "#7c3aed" }}>£145k</div>
                <div style={{ fontSize: 10, color: "#6d28d9" }}>Community Inv.</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold flex items-center gap-2" style={{ color: "var(--foreground)" }}>
            <Shield className="w-4 h-4" style={{ color: "#7c3aed" }} />
            Governance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-xs font-semibold mb-3" style={{ color: "var(--foreground)" }}>Board Composition</p>
              <div className="space-y-2">
                {[
                  { label: "Board Members", value: "8" },
                  { label: "Independent Directors", value: "5 (62.5%)" },
                  { label: "Female Directors", value: "3 (37.5%)" },
                  { label: "Avg. Tenure", value: "4.2 years" },
                  { label: "ESG Committee", value: "Yes" },
                ].map(item => (
                  <div key={item.label} className="flex justify-between text-xs">
                    <span style={{ color: "var(--muted-foreground)" }}>{item.label}</span>
                    <span style={{ color: "var(--foreground)", fontWeight: 600 }}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold mb-3" style={{ color: "var(--foreground)" }}>Policy Status</p>
              <div className="space-y-2">
                {governancePolicies.map(p => (
                  <div key={p.policy} className="flex items-center justify-between">
                    <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>{p.policy}</span>
                    <span style={{
                      fontSize: 11, fontWeight: 500, padding: "2px 8px", borderRadius: 9999,
                      backgroundColor: p.status === "Approved" ? "#dcfce7" : "#fef9c3",
                      color: p.status === "Approved" ? "#16a34a" : "#92400e"
                    }}>
                      {p.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold mb-3" style={{ color: "var(--foreground)" }}>Incidents &amp; Compliance</p>
              <div className="space-y-3">
                <div style={{ background: "#f0fdf4", borderRadius: 8, padding: "12px", display: "flex", alignItems: "center", gap: 8 }}>
                  <CheckCircle className="w-5 h-5" style={{ color: "#16a34a" }} />
                  <div>
                    <div style={{ fontSize: 20, fontWeight: 800, color: "#14532d" }}>0</div>
                    <div style={{ fontSize: 11, color: "#15803d" }}>Incidents this year</div>
                  </div>
                </div>
                <div style={{ background: "#f0fdf4", borderRadius: 8, padding: "12px", display: "flex", alignItems: "center", gap: 8 }}>
                  <Shield className="w-5 h-5" style={{ color: "#16a34a" }} />
                  <div>
                    <div style={{ fontSize: 20, fontWeight: 800, color: "#14532d" }}>100%</div>
                    <div style={{ fontSize: 11, color: "#15803d" }}>Policy compliance rate</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold flex items-center gap-2" style={{ color: "var(--foreground)" }}>
            <Globe className="w-4 h-4" style={{ color: "#06b6d4" }} />
            UN Sustainable Development Goals Alignment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            {sdgGoals.map(sdg => (
              <div key={sdg.number} style={{
                background: sdg.color, borderRadius: 10, padding: "10px 16px",
                display: "flex", alignItems: "center", gap: 8, minWidth: 140
              }}>
                <div style={{ fontSize: 22, fontWeight: 900, color: "#fff" }}>{sdg.number}</div>
                <div style={{ fontSize: 11, color: "#fff", fontWeight: 600, lineHeight: 1.3 }}>{sdg.label}</div>
              </div>
            ))}
          </div>
          <p className="text-xs mt-3" style={{ color: "var(--muted-foreground)" }}>
            Orbas is aligned with 6 of the 17 UN SDGs across our operations and value chain.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
