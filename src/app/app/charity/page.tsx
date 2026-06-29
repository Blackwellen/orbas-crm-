"use client"

import { Heart, Users, PoundSterling, Gift, Megaphone, Award } from "lucide-react"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const kpis = [
  { label: "Total Donors", value: "1,284", icon: Users, color: "#e11d48" },
  { label: "Total Raised YTD", value: "Â£487,320", icon: PoundSterling, color: "#16a34a" },
  { label: "Gift Aid Claimable", value: "Â£45,210", icon: Gift, color: "#1a56db" },
  { label: "Active Campaigns", value: "6", icon: Megaphone, color: "#7c3aed" },
  { label: "Grants Received", value: "Â£120,000", icon: Award, color: "#f59e0b" },
]

const monthlyDonations = [
  { month: "Jul", amount: 32400 },
  { month: "Aug", amount: 28900 },
  { month: "Sep", amount: 41200 },
  { month: "Oct", amount: 38700 },
  { month: "Nov", amount: 55300 },
  { month: "Dec", amount: 72100 },
  { month: "Jan", amount: 29800 },
  { month: "Feb", amount: 34200 },
  { month: "Mar", amount: 45600 },
  { month: "Apr", amount: 38900 },
  { month: "May", amount: 41700 },
  { month: "Jun", amount: 28820 },
]

const topDonors = [
  { name: "The Blackwood Foundation", total: "Â£48,500", lastDonation: "2026-05-15" },
  { name: "Sir James Hartley", total: "Â£32,000", lastDonation: "2026-04-22" },
  { name: "Meridian Trust", total: "Â£25,000", lastDonation: "2026-06-01" },
  { name: "Catherine & Edward Moore", total: "Â£18,750", lastDonation: "2026-05-30" },
  { name: "GreenPath Corporate CSR", total: "Â£15,200", lastDonation: "2026-06-05" },
]

const campaigns = [
  { name: "Summer Appeal 2026", raised: 58200, target: 75000 },
  { name: "Building Our Future Capital Campaign", raised: 124500, target: 200000 },
  { name: "Community Kitchen Programme", raised: 32800, target: 35000 },
]

export default function CharityDashboard() {
  return (
    <div style={{ padding: 32, minHeight: "100vh", background: "var(--background)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28 }}>
        <Heart size={28} style={{ color: "#e11d48" }} />
        <h1 style={{ fontSize: 24, fontWeight: 700, color: "var(--foreground)", margin: 0 }}>Charity Overview</h1>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 16, marginBottom: 28 }}>
        {kpis.map(k => (
          <div key={k.label} style={{ border: "1px solid var(--border)", borderRadius: 12, padding: 20, background: "white" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <k.icon size={16} style={{ color: k.color }} />
              <span style={{ fontSize: 12, color: "var(--muted-foreground)", fontWeight: 500 }}>{k.label}</span>
            </div>
            <p style={{ fontSize: 26, fontWeight: 700, color: "var(--foreground)", margin: 0 }}>{k.value}</p>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 24, marginBottom: 28 }}>
        <div style={{ border: "1px solid var(--border)", borderRadius: 12, padding: 24, background: "white" }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: "var(--foreground)", marginBottom: 20 }}>Monthly Donations (Last 12 Months)</h2>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={monthlyDonations}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
              <Tooltip formatter={(v: any) => [`Â£${v.toLocaleString()}`, "Donations"]} />
              <Area type="monotone" dataKey="amount" stroke="#e11d48" fill="#fce7f3" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div style={{ border: "1px solid var(--border)", borderRadius: 12, padding: 24, background: "white" }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: "var(--foreground)", marginBottom: 20 }}>Gift Aid Summary</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              { label: "Eligible", value: "Â£180,840", pct: 100, color: "#1a56db" },
              { label: "Claimed", value: "Â£135,630", pct: 75, color: "#16a34a" },
              { label: "Unclaimed", value: "Â£45,210", pct: 25, color: "#f59e0b" },
            ].map(g => (
              <div key={g.label}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontSize: 13, color: "var(--foreground)", fontWeight: 500 }}>{g.label}</span>
                  <span style={{ fontSize: 14, fontWeight: 700, color: "var(--foreground)" }}>{g.value}</span>
                </div>
                <div style={{ height: 8, background: "var(--muted)", borderRadius: 4, overflow: "hidden" }}>
                  <div style={{ width: `${g.pct}%`, height: "100%", background: g.color, borderRadius: 4 }} />
                </div>
              </div>
            ))}
            <button style={{ marginTop: 8, background: "#e11d48", color: "white", border: "none", borderRadius: 8, padding: "10px 16px", fontWeight: 600, fontSize: 13, cursor: "pointer", width: "100%" }}>
              Generate HMRC Claim
            </button>
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        <div style={{ border: "1px solid var(--border)", borderRadius: 12, padding: 24, background: "white" }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: "var(--foreground)", marginBottom: 16 }}>Top Donors</h2>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                {["Donor", "Total Given", "Last Donation"].map(h => (
                  <th key={h} style={{ padding: "6px 8px", textAlign: "left", fontSize: 11, fontWeight: 600, color: "var(--muted-foreground)", borderBottom: "1px solid var(--border)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {topDonors.map((d, i) => (
                <tr key={d.name} style={{ borderBottom: i < topDonors.length - 1 ? "1px solid var(--border)" : "none" }}>
                  <td style={{ padding: "10px 8px", fontSize: 13, fontWeight: 500, color: "var(--foreground)" }}>{d.name}</td>
                  <td style={{ padding: "10px 8px", fontSize: 13, fontWeight: 700, color: "#16a34a" }}>{d.total}</td>
                  <td style={{ padding: "10px 8px", fontSize: 12, color: "var(--muted-foreground)" }}>{d.lastDonation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ border: "1px solid var(--border)", borderRadius: 12, padding: 24, background: "white" }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: "var(--foreground)", marginBottom: 20 }}>Campaign Progress</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {campaigns.map(c => {
              const pct = Math.round((c.raised / c.target) * 100)
              return (
                <div key={c.name}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: "var(--foreground)" }}>{c.name}</span>
                    <span style={{ fontSize: 12, color: "var(--muted-foreground)" }}>{pct}%</span>
                  </div>
                  <div style={{ height: 10, background: "var(--muted)", borderRadius: 5, overflow: "hidden", marginBottom: 4 }}>
                    <div style={{ width: `${Math.min(pct, 100)}%`, height: "100%", background: "#e11d48", borderRadius: 5 }} />
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: "#e11d48" }}>{"Â£"}{c.raised.toLocaleString()}</span>
                    <span style={{ fontSize: 12, color: "var(--muted-foreground)" }}>of {"Â£"}{c.target.toLocaleString()}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

