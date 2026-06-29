"use client"

import { PoundSterling, Plus } from "lucide-react"

const donations = [
  { donor: "The Blackwood Foundation", amount: 10000, date: "2026-06-05", campaign: "Building Our Future", method: "Bank Transfer", giftAid: false, status: "Received", ref: "DON-5012" },
  { donor: "Sir James Hartley", amount: 10000, date: "2026-04-22", campaign: "Building Our Future", method: "Bank Transfer", giftAid: true, status: "Received", ref: "DON-4821" },
  { donor: "Samantha Lee", amount: 340, date: "2026-06-08", campaign: "Summer Appeal 2026", method: "Online", giftAid: true, status: "Received", ref: "DON-5020" },
  { donor: "Meridian Trust", amount: 7500, date: "2026-06-01", campaign: "General Fund", method: "BACS", giftAid: false, status: "Received", ref: "DON-5005" },
  { donor: "Amanda Fletcher", amount: 50, date: "2026-06-01", campaign: "Summer Appeal 2026", method: "Direct Debit", giftAid: true, status: "Received", ref: "DON-5004" },
  { donor: "Robert Nguyen", amount: 50, date: "2026-06-01", campaign: "Summer Appeal 2026", method: "Direct Debit", giftAid: true, status: "Received", ref: "DON-5003" },
  { donor: "Priya Sharma", amount: 25, date: "2026-05-20", campaign: "Community Kitchen", method: "Online", giftAid: true, status: "Received", ref: "DON-4990" },
  { donor: "GreenPath Ltd", amount: 2000, date: "2026-06-05", campaign: "General Fund", method: "BACS", giftAid: false, status: "Received", ref: "DON-5010" },
  { donor: "Impact Ventures Ltd", amount: 5000, date: "2026-06-07", campaign: "Building Our Future", method: "BACS", giftAid: false, status: "Received", ref: "DON-5015" },
  { donor: "Eleanor Price", amount: 30, date: "2026-05-08", campaign: "Summer Appeal 2026", method: "Online", giftAid: true, status: "Received", ref: "DON-4940" },
  { donor: "Rebecca Thornton", amount: 75, date: "2026-04-10", campaign: "Community Kitchen", method: "Direct Debit", giftAid: true, status: "Received", ref: "DON-4850" },
  { donor: "Community Builders Charity", amount: 2500, date: "2026-05-01", campaign: "General Fund", method: "Cheque", giftAid: false, status: "Received", ref: "DON-4880" },
  { donor: "David Kim", amount: 100, date: "2026-03-28", campaign: "Summer Appeal 2026", method: "Online", giftAid: false, status: "Received", ref: "DON-4790" },
  { donor: "Sophia Okafor", amount: 50, date: "2026-04-15", campaign: "Summer Appeal 2026", method: "Direct Debit", giftAid: true, status: "Received", ref: "DON-4830" },
  { donor: "BrightFutures Corp", amount: 2000, date: "2026-02-14", campaign: "General Fund", method: "BACS", giftAid: false, status: "Received", ref: "DON-4650" },
  { donor: "Nexus Partners LLP", amount: 5000, date: "2026-04-30", campaign: "Building Our Future", method: "Bank Transfer", giftAid: false, status: "Received", ref: "DON-4870" },
  { donor: "The Albion Fund", amount: 10000, date: "2026-03-01", campaign: "General Fund", method: "Cheque", giftAid: false, status: "Received", ref: "DON-4730" },
  { donor: "Helen Walsh", amount: 150, date: "2026-01-12", campaign: "Summer Appeal 2026", method: "Online", giftAid: true, status: "Received", ref: "DON-4580" },
  { donor: "Catherine Moore", amount: 5000, date: "2026-05-30", campaign: "Building Our Future", method: "Bank Transfer", giftAid: true, status: "Received", ref: "DON-4996" },
  { donor: "Sir James Hartley", amount: 8500, date: "2026-01-15", campaign: "Summer Appeal 2025", method: "Cheque", giftAid: true, status: "Received", ref: "DON-4210" },
  { donor: "Thomas Baker", amount: 50, date: "2025-10-01", campaign: "General Fund", method: "Online", giftAid: true, status: "Received", ref: "DON-4050" },
  { donor: "Fiona Campbell", amount: 250, date: "2025-11-10", campaign: "Community Kitchen", method: "Online", giftAid: false, status: "Received", ref: "DON-4120" },
  { donor: "Michael O'Brien", amount: 100, date: "2025-12-25", campaign: "Christmas Appeal", method: "Online", giftAid: true, status: "Received", ref: "DON-4200" },
  { donor: "Sophia Okafor", amount: 50, date: "2026-01-20", campaign: "Community Kitchen", method: "Direct Debit", giftAid: true, status: "Received", ref: "DON-4590" },
  { donor: "Oliver Grant", amount: 100, date: "2025-09-20", campaign: "General Fund", method: "Online", giftAid: true, status: "Received", ref: "DON-4010" },
  { donor: "Amanda Fletcher", amount: 50, date: "2026-05-01", campaign: "Summer Appeal 2026", method: "Direct Debit", giftAid: true, status: "Received", ref: "DON-4890" },
  { donor: "Robert Nguyen", amount: 50, date: "2026-05-01", campaign: "Summer Appeal 2026", method: "Direct Debit", giftAid: true, status: "Received", ref: "DON-4891" },
  { donor: "Priya Sharma", amount: 25, date: "2026-04-20", campaign: "Community Kitchen", method: "Online", giftAid: true, status: "Received", ref: "DON-4845" },
  { donor: "GreenPath Ltd", amount: 3200, date: "2026-04-15", campaign: "Building Our Future", method: "BACS", giftAid: false, status: "Received", ref: "DON-4828" },
  { donor: "Nexus Partners LLP", amount: 7000, date: "2026-03-15", campaign: "General Fund", method: "Bank Transfer", giftAid: false, status: "Received", ref: "DON-4760" },
]

const totalThisMonth = donations.filter(d => d.date >= "2026-06-01").reduce((a, b) => a + b.amount, 0)
const avgGift = Math.round(donations.reduce((a, b) => a + b.amount, 0) / donations.length)
const largestGift = Math.max(...donations.map(d => d.amount))

export default function DonationsPage() {
  return (
    <div style={{ padding: 32, minHeight: "100vh", background: "var(--background)" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <PoundSterling size={24} style={{ color: "#16a34a" }} />
          <h1 style={{ fontSize: 22, fontWeight: 700, color: "var(--foreground)", margin: 0 }}>All Donations</h1>
        </div>
        <button style={{ display: "flex", alignItems: "center", gap: 6, background: "#16a34a", color: "white", border: "none", borderRadius: 8, padding: "9px 18px", fontWeight: 600, fontSize: 14, cursor: "pointer" }}>
          <Plus size={16} /> Record Donation
        </button>
      </div>

      {/* KPI Banner */}
      <div style={{ background: "linear-gradient(135deg, #e11d48, #f43f5e)", borderRadius: 12, padding: "20px 28px", marginBottom: 24, display: "flex", gap: 40, alignItems: "center" }}>
        <div>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.8)", margin: 0 }}>Total This Month</p>
          <p style={{ fontSize: 28, fontWeight: 700, color: "white", margin: 0 }}>{"£"}{totalThisMonth.toLocaleString()}</p>
        </div>
        <div>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.8)", margin: 0 }}>Average Gift</p>
          <p style={{ fontSize: 28, fontWeight: 700, color: "white", margin: 0 }}>{"£"}{avgGift.toLocaleString()}</p>
        </div>
        <div>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.8)", margin: 0 }}>Largest Gift</p>
          <p style={{ fontSize: 28, fontWeight: 700, color: "white", margin: 0 }}>{"£"}{largestGift.toLocaleString()}</p>
        </div>
      </div>

      <div style={{ border: "1px solid var(--border)", borderRadius: 12, overflow: "hidden", background: "white" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "var(--muted)", borderBottom: "1px solid var(--border)" }}>
              {["Reference", "Donor", "Amount", "Date", "Campaign", "Method", "Gift Aid", "Status"].map(h => (
                <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontSize: 12, fontWeight: 600, color: "var(--muted-foreground)" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {donations.map((d, i) => (
              <tr key={d.ref} style={{ borderBottom: "1px solid var(--border)", background: i % 2 === 0 ? "white" : "#fafafa" }}>
                <td style={{ padding: "10px 14px", fontSize: 12, color: "var(--primary)", fontFamily: "monospace", fontWeight: 600 }}>{d.ref}</td>
                <td style={{ padding: "10px 14px", fontSize: 13, fontWeight: 500, color: "var(--foreground)" }}>{d.donor}</td>
                <td style={{ padding: "10px 14px", fontSize: 14, fontWeight: 700, color: "#16a34a" }}>{"£"}{d.amount.toLocaleString()}</td>
                <td style={{ padding: "10px 14px", fontSize: 12, color: "var(--muted-foreground)" }}>{d.date}</td>
                <td style={{ padding: "10px 14px", fontSize: 12, color: "var(--foreground)" }}>{d.campaign}</td>
                <td style={{ padding: "10px 14px", fontSize: 12, color: "var(--muted-foreground)" }}>{d.method}</td>
                <td style={{ padding: "10px 14px" }}>
                  <span style={{ background: d.giftAid ? "#dcfce7" : "#f3f4f6", color: d.giftAid ? "#16a34a" : "#6b7280", fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 8 }}>{d.giftAid ? "Yes" : "No"}</span>
                </td>
                <td style={{ padding: "10px 14px" }}>
                  <span style={{ background: "#dcfce7", color: "#16a34a", fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 8 }}>{d.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
