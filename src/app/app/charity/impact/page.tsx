"use client"

import { TrendingUp, Download, ArrowRight } from "lucide-react"

const stories = [
  {
    title: "From Isolation to Community: Maria's Story",
    description: "Maria, 68, had not left her flat in over 6 months before joining our Community Kitchen programme. Through weekly cooking sessions and volunteer befriending, she now leads a gardening group and helps onboard new participants.",
    tags: ["Community Kitchen", "Social Isolation"],
    outcome: "12 months of engagement, now a volunteer",
  },
  {
    title: "A Second Chance: The Youth Employability Programme",
    description: "Twenty-three young people aged 16-24 completed our 12-week employability programme this year. Of those, 18 secured paid employment or apprenticeships within 3 months of graduating.",
    tags: ["Youth", "Employment"],
    outcome: "78% employment rate within 3 months",
  },
  {
    title: "Breaking Barriers in Digital Literacy",
    description: "Our Digital Inclusion project trained 340 adults over-50 in core digital skills, from online banking to video calling family members. 91% reported increased confidence and independence.",
    tags: ["Digital Inclusion", "Over 50s"],
    outcome: "340 adults trained, 91% improved confidence",
  },
]

const metrics = [
  { label: "Beneficiaries Reached", value: "4,820", desc: "Individuals directly supported this year" },
  { label: "Projects Delivered", value: "12", desc: "Active programmes across 4 regions" },
  { label: "Volunteer Hours", value: "2,400", desc: "Contributed by 148 volunteers" },
]

const theoryOfChange = [
  { stage: "Inputs", items: ["Charitable donations", "Grants & partnerships", "Volunteer time", "Staff expertise"] },
  { stage: "Activities", items: ["Community programmes", "Training sessions", "Outreach & referrals", "Advocacy work"] },
  { stage: "Outputs", items: ["4,820 people supported", "12 projects delivered", "2,400 volunteer hours"] },
  { stage: "Outcomes", items: ["Reduced isolation", "Improved wellbeing", "Economic independence", "Stronger communities"] },
  { stage: "Impact", items: ["Systemic change", "Reduced public service costs", "Thriving communities"] },
]

export default function ImpactPage() {
  return (
    <div style={{ padding: 32, minHeight: "100vh", background: "var(--background)" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <TrendingUp size={24} style={{ color: "#e11d48" }} />
          <h1 style={{ fontSize: 22, fontWeight: 700, color: "var(--foreground)", margin: 0 }}>Impact Reporting</h1>
        </div>
        <button style={{ display: "flex", alignItems: "center", gap: 6, background: "var(--foreground)", color: "white", border: "none", borderRadius: 8, padding: "9px 18px", fontWeight: 600, fontSize: 14, cursor: "pointer" }}>
          <Download size={16} /> Download Annual Report
        </button>
      </div>

      {/* Impact Metrics */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginBottom: 32 }}>
        {metrics.map(m => (
          <div key={m.label} style={{ background: "linear-gradient(135deg, #e11d48, #f43f5e)", borderRadius: 14, padding: 28 }}>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.8)", margin: 0, fontWeight: 500 }}>{m.label}</p>
            <p style={{ fontSize: 40, fontWeight: 800, color: "white", margin: "6px 0 4px" }}>{m.value}</p>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", margin: 0 }}>{m.desc}</p>
          </div>
        ))}
      </div>

      {/* Impact Stories */}
      <div style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, color: "var(--foreground)", marginBottom: 16 }}>Impact Stories</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {stories.map(s => (
            <div key={s.title} style={{ border: "1px solid var(--border)", borderRadius: 12, overflow: "hidden", background: "white" }}>
              {/* Photo placeholder */}
              <div style={{ height: 140, background: "linear-gradient(135deg, #fce7f3, #ffe4e6)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: 40 }}>🌟</span>
              </div>
              <div style={{ padding: 20 }}>
                <div style={{ display: "flex", gap: 6, marginBottom: 10, flexWrap: "wrap" }}>
                  {s.tags.map(t => (
                    <span key={t} style={{ background: "#fce7f3", color: "#e11d48", fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 8 }}>{t}</span>
                  ))}
                </div>
                <h3 style={{ fontSize: 14, fontWeight: 700, color: "var(--foreground)", margin: "0 0 8px" }}>{s.title}</h3>
                <p style={{ fontSize: 13, color: "var(--muted-foreground)", lineHeight: 1.5, margin: "0 0 12px" }}>{s.description}</p>
                <div style={{ padding: "10px 14px", background: "#f0fdf4", borderRadius: 8 }}>
                  <p style={{ fontSize: 12, fontWeight: 700, color: "#16a34a", margin: 0 }}>{s.outcome}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Theory of Change */}
      <div style={{ border: "1px solid var(--border)", borderRadius: 12, padding: 28, background: "white", marginBottom: 28 }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, color: "var(--foreground)", marginBottom: 24 }}>Theory of Change</h2>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 0, overflowX: "auto" }}>
          {theoryOfChange.map((stage, i) => (
            <div key={stage.stage} style={{ display: "flex", alignItems: "flex-start" }}>
              <div style={{ minWidth: 160, padding: 16, border: "2px solid #e11d48", borderRadius: 10, background: i === 4 ? "#fce7f3" : "white" }}>
                <p style={{ fontSize: 11, fontWeight: 700, color: "#e11d48", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 10px" }}>{stage.stage}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {stage.items.map(item => (
                    <p key={item} style={{ fontSize: 12, color: "var(--foreground)", margin: 0, lineHeight: 1.4 }}>{item}</p>
                  ))}
                </div>
              </div>
              {i < theoryOfChange.length - 1 && (
                <div style={{ display: "flex", alignItems: "center", padding: "0 8px", marginTop: 20 }}>
                  <ArrowRight size={16} style={{ color: "#e11d48" }} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
