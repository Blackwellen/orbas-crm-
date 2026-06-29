"use client"

import { Users, Plus } from "lucide-react"

const donors = [
  { name: "Sir James Hartley", type: "Individual", email: "j.hartley@gmail.com", total: "£32,000", lastDonation: "2026-04-22", giftAid: true, segment: "Major Donor", status: "Active" },
  { name: "The Blackwood Foundation", type: "Foundation", email: "grants@blackwood.org", total: "£48,500", lastDonation: "2026-05-15", giftAid: false, segment: "Major Donor", status: "Active" },
  { name: "Meridian Trust", type: "Trust", email: "info@meridiantrust.co.uk", total: "£25,000", lastDonation: "2026-06-01", giftAid: false, segment: "Major Donor", status: "Active" },
  { name: "Catherine Moore", type: "Individual", email: "cmoore@personal.net", total: "£18,750", lastDonation: "2026-05-30", giftAid: true, segment: "Major Donor", status: "Active" },
  { name: "GreenPath Ltd", type: "Corporate", email: "csr@greenpath.co.uk", total: "£15,200", lastDonation: "2026-06-05", giftAid: false, segment: "Major Donor", status: "Active" },
  { name: "Amanda Fletcher", type: "Individual", email: "a.fletcher@hotmail.com", total: "£4,200", lastDonation: "2026-05-10", giftAid: true, segment: "Regular", status: "Active" },
  { name: "Robert Nguyen", type: "Individual", email: "r.nguyen@work.com", total: "£3,600", lastDonation: "2026-06-01", giftAid: true, segment: "Regular", status: "Active" },
  { name: "Sophia Okafor", type: "Individual", email: "sokafor@email.co.uk", total: "£2,400", lastDonation: "2026-04-15", giftAid: true, segment: "Regular", status: "Active" },
  { name: "David Kim", type: "Individual", email: "d.kim@personal.net", total: "£1,800", lastDonation: "2026-03-28", giftAid: false, segment: "Regular", status: "Active" },
  { name: "Priya Sharma", type: "Individual", email: "priya.sharma@gmail.com", total: "£1,200", lastDonation: "2026-05-20", giftAid: true, segment: "Regular", status: "Active" },
  { name: "BrightFutures Corp", type: "Corporate", email: "giving@brightfutures.com", total: "£8,000", lastDonation: "2026-02-14", giftAid: false, segment: "Regular", status: "Active" },
  { name: "Helen Walsh", type: "Individual", email: "h.walsh@icloud.com", total: "£650", lastDonation: "2026-01-12", giftAid: true, segment: "One-off", status: "Active" },
  { name: "Michael O'Brien", type: "Individual", email: "mobrien@eircom.net", total: "£250", lastDonation: "2025-12-25", giftAid: true, segment: "Lapsed", status: "Inactive" },
  { name: "Fiona Campbell", type: "Individual", email: "fi.campbell@btinternet.com", total: "£500", lastDonation: "2025-11-10", giftAid: false, segment: "Lapsed", status: "Inactive" },
  { name: "Thomas Baker", type: "Individual", email: "t.baker@outlook.com", total: "£180", lastDonation: "2025-10-01", giftAid: true, segment: "Lapsed", status: "Inactive" },
  { name: "Nexus Partners LLP", type: "Corporate", email: "foundation@nexuspartners.com", total: "£12,000", lastDonation: "2026-04-30", giftAid: false, segment: "Major Donor", status: "Active" },
  { name: "Eleanor Price", type: "Individual", email: "eleanor.price@gmail.com", total: "£920", lastDonation: "2026-05-08", giftAid: true, segment: "Regular", status: "Active" },
  { name: "The Albion Fund", type: "Trust", email: "secretary@albionfund.org.uk", total: "£20,000", lastDonation: "2026-03-01", giftAid: false, segment: "Major Donor", status: "Active" },
  { name: "James Patterson", type: "Individual", email: "jpatterson@gmail.com", total: "£75", lastDonation: "2025-08-15", giftAid: false, segment: "Lapsed", status: "Inactive" },
  { name: "Samantha Lee", type: "Individual", email: "samlee@live.co.uk", total: "£340", lastDonation: "2026-06-08", giftAid: true, segment: "One-off", status: "Active" },
  { name: "Community Builders Charity", type: "Trust", email: "admin@commbuilders.org", total: "£7,500", lastDonation: "2026-05-01", giftAid: false, segment: "Regular", status: "Active" },
  { name: "Oliver Grant", type: "Individual", email: "o.grant@protonmail.com", total: "£420", lastDonation: "2025-09-20", giftAid: true, segment: "Lapsed", status: "Inactive" },
  { name: "Rebecca Thornton", type: "Individual", email: "rthornton@hotmail.co.uk", total: "£2,100", lastDonation: "2026-04-10", giftAid: true, segment: "Regular", status: "Active" },
  { name: "Impact Ventures Ltd", type: "Corporate", email: "csr@impactventures.io", total: "£5,000", lastDonation: "2026-06-07", giftAid: false, segment: "Regular", status: "Active" },
  { name: "Nathaniel Fox", type: "Individual", email: "nfox@gmail.com", total: "£155", lastDonation: "2025-07-04", giftAid: false, segment: "Lapsed", status: "Inactive" },
]

function typeBadge(t: string) {
  switch (t) {
    case "Corporate": return { background: "#eff6ff", color: "#1a56db" }
    case "Foundation": return { background: "#f3e8ff", color: "#7c3aed" }
    case "Trust": return { background: "#fff7ed", color: "#ea580c" }
    default: return { background: "#f0fdf4", color: "#16a34a" }
  }
}

function segmentBadge(s: string) {
  switch (s) {
    case "Major Donor": return { background: "#fce7f3", color: "#e11d48" }
    case "Regular": return { background: "#dcfce7", color: "#16a34a" }
    case "Lapsed": return { background: "#fee2e2", color: "#dc2626" }
    default: return { background: "#f3f4f6", color: "#6b7280" }
  }
}

export default function DonorsPage() {
  return (
    <div style={{ padding: 32, minHeight: "100vh", background: "var(--background)" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Users size={24} style={{ color: "#e11d48" }} />
          <h1 style={{ fontSize: 22, fontWeight: 700, color: "var(--foreground)", margin: 0 }}>Donor Register</h1>
        </div>
        <button style={{ display: "flex", alignItems: "center", gap: 6, background: "#e11d48", color: "white", border: "none", borderRadius: 8, padding: "9px 18px", fontWeight: 600, fontSize: 14, cursor: "pointer" }}>
          <Plus size={16} /> Add Donor
        </button>
      </div>

      {/* KPIs */}
      <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
        {[
          { label: "Total Donors", value: "1,284", color: "#e11d48" },
          { label: "Major Donors (£5k+)", value: "24", color: "#e11d48" },
          { label: "Regular", value: "486", color: "#16a34a" },
          { label: "Lapsed", value: "312", color: "#dc2626" },
        ].map(k => (
          <div key={k.label} style={{ border: "1px solid var(--border)", borderRadius: 10, padding: "14px 20px", background: "white", flex: 1 }}>
            <p style={{ fontSize: 11, color: "var(--muted-foreground)", margin: 0, fontWeight: 500 }}>{k.label}</p>
            <p style={{ fontSize: 26, fontWeight: 700, color: k.color, margin: "4px 0 0" }}>{k.value}</p>
          </div>
        ))}
      </div>

      <div style={{ border: "1px solid var(--border)", borderRadius: 12, overflow: "hidden", background: "white" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "var(--muted)", borderBottom: "1px solid var(--border)" }}>
              {["Name", "Type", "Email", "Total Donated", "Last Donation", "Gift Aid", "Segment", "Status"].map(h => (
                <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontSize: 12, fontWeight: 600, color: "var(--muted-foreground)" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {donors.map((d, i) => (
              <tr key={d.email} style={{ borderBottom: "1px solid var(--border)", background: i % 2 === 0 ? "white" : "#fafafa" }}>
                <td style={{ padding: "10px 14px", fontSize: 13, fontWeight: 600, color: "#e11d48", cursor: "pointer" }}>{d.name}</td>
                <td style={{ padding: "10px 14px" }}>
                  <span style={{ ...typeBadge(d.type), fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 8 }}>{d.type}</span>
                </td>
                <td style={{ padding: "10px 14px", fontSize: 12, color: "var(--muted-foreground)" }}>{d.email}</td>
                <td style={{ padding: "10px 14px", fontSize: 13, fontWeight: 700, color: "#16a34a" }}>{d.total}</td>
                <td style={{ padding: "10px 14px", fontSize: 12, color: "var(--muted-foreground)" }}>{d.lastDonation}</td>
                <td style={{ padding: "10px 14px" }}>
                  <span style={{ background: d.giftAid ? "#dcfce7" : "#f3f4f6", color: d.giftAid ? "#16a34a" : "#6b7280", fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 8 }}>{d.giftAid ? "Yes" : "No"}</span>
                </td>
                <td style={{ padding: "10px 14px" }}>
                  <span style={{ ...segmentBadge(d.segment), fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 8 }}>{d.segment}</span>
                </td>
                <td style={{ padding: "10px 14px" }}>
                  <span style={{ background: d.status === "Active" ? "#dcfce7" : "#fee2e2", color: d.status === "Active" ? "#16a34a" : "#dc2626", fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 8 }}>{d.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
