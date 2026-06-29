"use client"

import { useState } from "react"
import { ArrowLeft, Heart, Mail, Phone, Gift } from "lucide-react"
import Link from "next/link"

export default function DonorDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [tab, setTab] = useState("overview")

  const donor = {
    name: "Sir James Hartley",
    type: "Individual",
    email: "j.hartley@gmail.com",
    phone: "+44 7712 345678",
    address: "12 Hartley Manor, Bath, BA1 2CD",
    giftAid: true,
    gdprConsent: true,
    totalGiving: "£84,320",
    firstDonation: "2018-03-15",
    segment: "Major Donor",
    notes: "Prefers personal calls from CEO. Interested in our children's programmes and community development work.",
    preferredContact: "Phone",
  }

  const donations = [
    { ref: "DON-4821", date: "2026-04-22", campaign: "Building Our Future", amount: "£10,000", method: "Bank Transfer", giftAid: true, status: "Received" },
    { ref: "DON-4210", date: "2026-01-15", campaign: "Summer Appeal 2025", amount: "£8,500", method: "Cheque", giftAid: true, status: "Received" },
    { ref: "DON-3988", date: "2025-12-01", campaign: "Christmas Appeal", amount: "£5,000", method: "Online", giftAid: true, status: "Received" },
    { ref: "DON-3712", date: "2025-09-10", campaign: "General Fund", amount: "£3,500", method: "Bank Transfer", giftAid: false, status: "Received" },
    { ref: "DON-3401", date: "2025-06-20", campaign: "Community Kitchen", amount: "£5,000", method: "Bank Transfer", giftAid: true, status: "Received" },
  ]

  const giftAidDonations = donations.filter(d => d.giftAid)

  const communications = [
    { date: "2026-05-10", type: "Phone Call", subject: "Thank you for April donation", staff: "CEO" },
    { date: "2026-02-01", type: "Email", subject: "Impact report Q4 2025", staff: "Fundraising Manager" },
    { date: "2025-12-20", type: "Letter", subject: "Christmas card and year-end update", staff: "Admin" },
    { date: "2025-10-05", type: "Meeting", subject: "Annual supporter lunch", staff: "CEO + Trustee" },
  ]

  const tabs = ["overview", "donations", "gift-aid", "communications", "tasks", "notes"]

  return (
    <div style={{ padding: 32, minHeight: "100vh", background: "var(--background)" }}>
      <Link href="/app/charity/donors" style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--muted-foreground)", fontSize: 13, textDecoration: "none", marginBottom: 20 }}>
        <ArrowLeft size={14} /> Donors
      </Link>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 24 }}>
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <div style={{ width: 56, height: 56, borderRadius: "50%", background: "#fce7f3", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 20, fontWeight: 700, color: "#e11d48" }}>JH</span>
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
              <h1 style={{ fontSize: 22, fontWeight: 700, color: "var(--foreground)", margin: 0 }}>{donor.name}</h1>
              <span style={{ background: "#fce7f3", color: "#e11d48", fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 10 }}>Major Donor</span>
            </div>
            <div style={{ display: "flex", gap: 16 }}>
              <span style={{ fontSize: 13, color: "var(--muted-foreground)", display: "flex", alignItems: "center", gap: 4 }}><Mail size={12} />{donor.email}</span>
              <span style={{ fontSize: 13, color: "var(--muted-foreground)", display: "flex", alignItems: "center", gap: 4 }}><Phone size={12} />{donor.phone}</span>
            </div>
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <p style={{ fontSize: 12, color: "var(--muted-foreground)", margin: 0 }}>Total Giving</p>
          <p style={{ fontSize: 28, fontWeight: 700, color: "#16a34a", margin: 0 }}>{donor.totalGiving}</p>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 0, borderBottom: "1px solid var(--border)", marginBottom: 28 }}>
        {tabs.map(t => (
          <button key={t} onClick={() => setTab(t)} style={{ padding: "10px 18px", border: "none", background: "none", cursor: "pointer", fontSize: 14, fontWeight: tab === t ? 600 : 400, color: tab === t ? "#e11d48" : "var(--muted-foreground)", borderBottom: tab === t ? "2px solid #e11d48" : "2px solid transparent", textTransform: "capitalize" }}>
            {t.replace("-", " ")}
          </button>
        ))}
      </div>

      {tab === "overview" && (
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 24 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ border: "1px solid var(--border)", borderRadius: 12, padding: 20, background: "white" }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>Contact Information</h3>
              {[["Email", donor.email], ["Phone", donor.phone], ["Address", donor.address], ["Preferred Contact", donor.preferredContact]].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid var(--border)" }}>
                  <span style={{ fontSize: 12, color: "var(--muted-foreground)" }}>{k}</span>
                  <span style={{ fontSize: 13, fontWeight: 500, color: "var(--foreground)" }}>{v}</span>
                </div>
              ))}
            </div>
            <div style={{ border: "1px solid var(--border)", borderRadius: 12, padding: 20, background: "white" }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 8 }}>Notes</h3>
              <p style={{ fontSize: 14, color: "var(--foreground)", lineHeight: 1.6, margin: 0 }}>{donor.notes}</p>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ border: "1px solid var(--border)", borderRadius: 12, padding: 20, background: "white" }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>Donor Profile</h3>
              {[["Type", donor.type], ["Segment", donor.segment], ["Gift Aid", donor.giftAid ? "Declared ✓" : "Not declared"], ["GDPR Consent", donor.gdprConsent ? "Given ✓" : "Pending"], ["First Donation", donor.firstDonation]].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid var(--border)" }}>
                  <span style={{ fontSize: 12, color: "var(--muted-foreground)" }}>{k}</span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: "var(--foreground)" }}>{v}</span>
                </div>
              ))}
            </div>
            <div style={{ border: "1px solid var(--border)", borderRadius: 12, padding: 20, background: "#f0fdf4" }}>
              <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8 }}>
                <Gift size={16} style={{ color: "#16a34a" }} />
                <span style={{ fontSize: 14, fontWeight: 700, color: "#16a34a" }}>Gift Aid Active</span>
              </div>
              <p style={{ fontSize: 12, color: "#16a34a", margin: 0 }}>Declaration on file. HMRC-eligible donations will include 25% Gift Aid.</p>
            </div>
          </div>
        </div>
      )}

      {tab === "donations" && (
        <div style={{ border: "1px solid var(--border)", borderRadius: 12, overflow: "hidden", background: "white" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "var(--muted)", borderBottom: "1px solid var(--border)" }}>
                {["Reference", "Date", "Campaign", "Amount", "Method", "Gift Aid", "Status"].map(h => (
                  <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontSize: 12, fontWeight: 600, color: "var(--muted-foreground)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {donations.map((d, i) => (
                <tr key={d.ref} style={{ borderBottom: "1px solid var(--border)", background: i % 2 === 0 ? "white" : "#fafafa" }}>
                  <td style={{ padding: "10px 14px", fontSize: 12, color: "var(--primary)", fontFamily: "monospace", fontWeight: 600 }}>{d.ref}</td>
                  <td style={{ padding: "10px 14px", fontSize: 13 }}>{d.date}</td>
                  <td style={{ padding: "10px 14px", fontSize: 13, color: "var(--foreground)" }}>{d.campaign}</td>
                  <td style={{ padding: "10px 14px", fontSize: 14, fontWeight: 700, color: "#16a34a" }}>{d.amount}</td>
                  <td style={{ padding: "10px 14px", fontSize: 12, color: "var(--muted-foreground)" }}>{d.method}</td>
                  <td style={{ padding: "10px 14px" }}><span style={{ background: d.giftAid ? "#dcfce7" : "#f3f4f6", color: d.giftAid ? "#16a34a" : "#6b7280", fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 8 }}>{d.giftAid ? "Yes" : "No"}</span></td>
                  <td style={{ padding: "10px 14px" }}><span style={{ background: "#dcfce7", color: "#16a34a", fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 8 }}>{d.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === "gift-aid" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ border: "1px solid var(--border)", borderRadius: 12, padding: 20, background: "#f0fdf4" }}>
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <Gift size={20} style={{ color: "#16a34a" }} />
              <div>
                <p style={{ fontSize: 14, fontWeight: 700, color: "#16a34a", margin: 0 }}>Gift Aid Declaration Active</p>
                <p style={{ fontSize: 12, color: "#16a34a", margin: 0 }}>Declaration received 15 March 2018. Valid for all past and future donations.</p>
              </div>
            </div>
          </div>
          <div style={{ border: "1px solid var(--border)", borderRadius: 12, overflow: "hidden", background: "white" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "var(--muted)", borderBottom: "1px solid var(--border)" }}>
                  {["Reference", "Date", "Gross Amount", "Gift Aid (25%)", "Declaration"].map(h => (
                    <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontSize: 12, fontWeight: 600, color: "var(--muted-foreground)" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {giftAidDonations.map((d, i) => (
                  <tr key={d.ref} style={{ borderBottom: "1px solid var(--border)", background: i % 2 === 0 ? "white" : "#fafafa" }}>
                    <td style={{ padding: "10px 14px", fontSize: 12, color: "var(--primary)", fontFamily: "monospace" }}>{d.ref}</td>
                    <td style={{ padding: "10px 14px", fontSize: 13 }}>{d.date}</td>
                    <td style={{ padding: "10px 14px", fontSize: 14, fontWeight: 700, color: "#16a34a" }}>{d.amount}</td>
                    <td style={{ padding: "10px 14px", fontSize: 14, fontWeight: 700, color: "#1a56db" }}>£{Math.round(parseInt(d.amount.replace(/[^0-9]/g, "")) * 0.25).toLocaleString()}</td>
                    <td style={{ padding: "10px 14px" }}><span style={{ background: "#dcfce7", color: "#16a34a", fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 8 }}>On File</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === "communications" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {communications.map((c, i) => (
            <div key={i} style={{ border: "1px solid var(--border)", borderRadius: 10, padding: 16, background: "white", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ display: "flex", gap: 8, marginBottom: 4 }}>
                  <span style={{ background: "#eff6ff", color: "#1a56db", fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 8 }}>{c.type}</span>
                  <span style={{ fontSize: 12, color: "var(--muted-foreground)" }}>{c.date}</span>
                </div>
                <p style={{ fontSize: 14, fontWeight: 500, color: "var(--foreground)", margin: 0 }}>{c.subject}</p>
                <p style={{ fontSize: 12, color: "var(--muted-foreground)", margin: "2px 0 0" }}>by {c.staff}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {(tab === "tasks" || tab === "notes") && (
        <div style={{ border: "1px solid var(--border)", borderRadius: 12, padding: 40, background: "white", textAlign: "center" }}>
          <Heart size={32} style={{ color: "var(--muted-foreground)", margin: "0 auto 12px" }} />
          <p style={{ color: "var(--muted-foreground)", fontSize: 14 }}>No {tab} yet for this donor.</p>
          <button style={{ marginTop: 8, background: "#e11d48", color: "white", border: "none", borderRadius: 8, padding: "8px 20px", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>Add {tab.charAt(0).toUpperCase() + tab.slice(1)}</button>
        </div>
      )}
    </div>
  )
}
