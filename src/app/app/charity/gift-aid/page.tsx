"use client"

import { Gift, Download } from "lucide-react"

const eligibleDonations = [
  { donor: "Sir James Hartley", date: "2026-04-22", gross: 10000, giftAid: 2500, declaration: "On File" },
  { donor: "Samantha Lee", date: "2026-06-08", gross: 340, giftAid: 85, declaration: "On File" },
  { donor: "Amanda Fletcher", date: "2026-06-01", gross: 50, giftAid: 12.5, declaration: "On File" },
  { donor: "Robert Nguyen", date: "2026-06-01", gross: 50, giftAid: 12.5, declaration: "On File" },
  { donor: "Priya Sharma", date: "2026-05-20", gross: 25, giftAid: 6.25, declaration: "On File" },
  { donor: "Eleanor Price", date: "2026-05-08", gross: 30, giftAid: 7.5, declaration: "On File" },
  { donor: "Rebecca Thornton", date: "2026-04-10", gross: 75, giftAid: 18.75, declaration: "On File" },
  { donor: "Sophia Okafor", date: "2026-04-15", gross: 50, giftAid: 12.5, declaration: "On File" },
  { donor: "David Kim", date: "2026-03-28", gross: 100, giftAid: 25, declaration: "On File" },
  { donor: "Helen Walsh", date: "2026-01-12", gross: 150, giftAid: 37.5, declaration: "On File" },
  { donor: "Catherine Moore", date: "2026-05-30", gross: 5000, giftAid: 1250, declaration: "On File" },
  { donor: "Sir James Hartley", date: "2026-01-15", gross: 8500, giftAid: 2125, declaration: "On File" },
  { donor: "Thomas Baker", date: "2025-10-01", gross: 50, giftAid: 12.5, declaration: "On File" },
  { donor: "Michael O'Brien", date: "2025-12-25", gross: 100, giftAid: 25, declaration: "On File" },
  { donor: "Oliver Grant", date: "2025-09-20", gross: 100, giftAid: 25, declaration: "On File" },
]

const hmrcClaims = [
  { claimDate: "2026-04-01", period: "Jan–Mar 2026", donations: 142, amount: 12840, status: "Paid" },
  { claimDate: "2026-01-05", period: "Oct–Dec 2025", donations: 168, amount: 15630, status: "Paid" },
  { claimDate: "2025-10-03", period: "Jul–Sep 2025", donations: 129, amount: 11420, status: "Approved" },
  { claimDate: "2025-07-04", period: "Apr–Jun 2025", donations: 155, amount: 13880, status: "Paid" },
  { claimDate: "2025-04-02", period: "Jan–Mar 2025", donations: 138, amount: 12150, status: "Paid" },
]

export default function GiftAidPage() {
  return (
    <div style={{ padding: 32, minHeight: "100vh", background: "var(--background)" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Gift size={24} style={{ color: "#1a56db" }} />
          <h1 style={{ fontSize: 22, fontWeight: 700, color: "var(--foreground)", margin: 0 }}>Gift Aid Management</h1>
        </div>
        <button style={{ display: "flex", alignItems: "center", gap: 6, background: "#1a56db", color: "white", border: "none", borderRadius: 8, padding: "10px 20px", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>
          <Gift size={16} /> Generate HMRC Claim
        </button>
      </div>

      {/* Overview Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 32 }}>
        {[
          { label: "Total Eligible", value: "£180,840", color: "#1a56db", bg: "#eff6ff" },
          { label: "Claimed", value: "£135,630", color: "#16a34a", bg: "#f0fdf4" },
          { label: "Unclaimed", value: "£45,210", color: "#d97706", bg: "#fefce8" },
          { label: "Next Claim Date", value: "1 Jul 2026", color: "#7c3aed", bg: "#f5f3ff" },
        ].map(c => (
          <div key={c.label} style={{ background: c.bg, border: `1px solid ${c.color}30`, borderRadius: 12, padding: 20 }}>
            <p style={{ fontSize: 12, color: c.color, fontWeight: 600, margin: 0 }}>{c.label}</p>
            <p style={{ fontSize: 26, fontWeight: 700, color: c.color, margin: "6px 0 0" }}>{c.value}</p>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 28 }}>
        {/* Eligible Donations */}
        <div style={{ border: "1px solid var(--border)", borderRadius: 12, overflow: "hidden", background: "white" }}>
          <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border)" }}>
            <h2 style={{ fontSize: 14, fontWeight: 700, color: "var(--foreground)", margin: 0 }}>Eligible Donations</h2>
          </div>
          <div style={{ maxHeight: 400, overflowY: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "var(--muted)", position: "sticky", top: 0 }}>
                  {["Donor", "Date", "Gross", "Gift Aid"].map(h => (
                    <th key={h} style={{ padding: "8px 12px", textAlign: "left", fontSize: 11, fontWeight: 600, color: "var(--muted-foreground)" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {eligibleDonations.map((d, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid var(--border)", background: i % 2 === 0 ? "white" : "#fafafa" }}>
                    <td style={{ padding: "8px 12px", fontSize: 12, fontWeight: 500, color: "var(--foreground)" }}>{d.donor}</td>
                    <td style={{ padding: "8px 12px", fontSize: 11, color: "var(--muted-foreground)" }}>{d.date}</td>
                    <td style={{ padding: "8px 12px", fontSize: 12, fontWeight: 600, color: "var(--foreground)" }}>{"£"}{d.gross.toLocaleString()}</td>
                    <td style={{ padding: "8px 12px", fontSize: 12, fontWeight: 700, color: "#1a56db" }}>{"£"}{d.giftAid.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* HMRC Claims History */}
        <div style={{ border: "1px solid var(--border)", borderRadius: 12, overflow: "hidden", background: "white" }}>
          <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border)" }}>
            <h2 style={{ fontSize: 14, fontWeight: 700, color: "var(--foreground)", margin: 0 }}>HMRC Claims History</h2>
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "var(--muted)" }}>
                {["Date", "Period", "Donations", "Amount", "Status"].map(h => (
                  <th key={h} style={{ padding: "8px 14px", textAlign: "left", fontSize: 11, fontWeight: 600, color: "var(--muted-foreground)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {hmrcClaims.map((c, i) => (
                <tr key={i} style={{ borderBottom: "1px solid var(--border)", background: i % 2 === 0 ? "white" : "#fafafa" }}>
                  <td style={{ padding: "10px 14px", fontSize: 12, color: "var(--muted-foreground)" }}>{c.claimDate}</td>
                  <td style={{ padding: "10px 14px", fontSize: 12, color: "var(--foreground)", fontWeight: 500 }}>{c.period}</td>
                  <td style={{ padding: "10px 14px", fontSize: 12, color: "var(--foreground)" }}>{c.donations}</td>
                  <td style={{ padding: "10px 14px", fontSize: 13, fontWeight: 700, color: "#16a34a" }}>{"£"}{c.amount.toLocaleString()}</td>
                  <td style={{ padding: "10px 14px" }}>
                    <span style={{ background: c.status === "Paid" ? "#dcfce7" : "#fef9c3", color: c.status === "Paid" ? "#16a34a" : "#d97706", fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 8 }}>{c.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ padding: "16px 20px", borderTop: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: "var(--foreground)" }}>Total Claimed (all time)</span>
            <span style={{ fontSize: 16, fontWeight: 700, color: "#16a34a" }}>{"£"}{hmrcClaims.reduce((a, c) => a + c.amount, 0).toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Gift Aid Declarations summary */}
      <div style={{ border: "1px solid var(--border)", borderRadius: 12, padding: 24, background: "white" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: "var(--foreground)", margin: 0 }}>Gift Aid Declarations</h2>
          <button style={{ display: "flex", alignItems: "center", gap: 6, background: "var(--muted)", color: "var(--foreground)", border: "1px solid var(--border)", borderRadius: 6, padding: "6px 14px", fontSize: 12, cursor: "pointer" }}>
            <Download size={12} /> Export Declarations
          </button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {[
            { label: "Active Declarations", value: "842", color: "#16a34a" },
            { label: "Expired Declarations", value: "138", color: "#d97706" },
            { label: "Donors Without Declaration", value: "304", color: "#dc2626" },
          ].map(d => (
            <div key={d.label} style={{ padding: 16, border: "1px solid var(--border)", borderRadius: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 13, color: "var(--muted-foreground)" }}>{d.label}</span>
              <span style={{ fontSize: 22, fontWeight: 700, color: d.color }}>{d.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
