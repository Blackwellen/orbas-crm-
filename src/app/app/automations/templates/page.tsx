"use client"

import { Copy, Zap } from "lucide-react"

const templates = [
  { name: "New Lead Welcome Sequence", desc: "Automatically send a welcome email and create a follow-up task when a new lead enters the CRM.", trigger: "Record Created", actions: 3, category: "CRM" },
  { name: "Deal Won Celebration", desc: "Notify the team on Slack, create an onboarding project, and send a welcome email to the client.", trigger: "Record Updated", actions: 5, category: "CRM" },
  { name: "Invoice Overdue Reminder", desc: "Send escalating email reminders at 3, 7 and 14 days overdue. Add a task for the account manager.", trigger: "Scheduled", actions: 4, category: "Accounting" },
  { name: "Ticket SLA Breach Alert", desc: "Alert the support manager and escalate the ticket when SLA response time is breached.", trigger: "Record Updated", actions: 3, category: "Service" },
  { name: "Staff Onboarding Checklist", desc: "Create a full set of onboarding tasks, assign them to HR, and send the new joiner a welcome pack.", trigger: "Record Created", actions: 8, category: "People" },
  { name: "Contact Birthday Email", desc: "Send a personalised birthday email to contacts on their birthday, with a special offer if applicable.", trigger: "Scheduled", actions: 2, category: "CRM" },
  { name: "Lead Score Threshold Alert", desc: "Notify sales rep when a lead's score reaches 80+ and create an immediate follow-up task.", trigger: "Record Updated", actions: 2, category: "CRM" },
  { name: "Payment Received Thank You", desc: "Automatically send a receipt and thank-you email when a payment is marked as received.", trigger: "Record Updated", actions: 2, category: "Accounting" },
  { name: "Contract Renewal Reminder", desc: "Send reminders 90, 30, and 7 days before contract expiry to account manager and client.", trigger: "Scheduled", actions: 4, category: "CRM" },
  { name: "Employee Annual Review Prep", desc: "Create review documents, notify both manager and employee, and schedule a review meeting.", trigger: "Scheduled", actions: 5, category: "People" },
  { name: "CSAT Survey After Ticket Close", desc: "Send a satisfaction survey 24 hours after a support ticket is closed and log the response.", trigger: "Record Updated", actions: 3, category: "Service" },
  { name: "Negative Review Rapid Response", desc: "Alert the customer success manager immediately when a review below 3 stars is received.", trigger: "Webhook", actions: 3, category: "Service" },
]

function categoryStyle(c: string) {
  switch (c) {
    case "CRM": return { background: "#eff6ff", color: "#1a56db" }
    case "Accounting": return { background: "#f0fdf4", color: "#16a34a" }
    case "Service": return { background: "#fef9c3", color: "#d97706" }
    case "People": return { background: "#f3e8ff", color: "#7c3aed" }
    default: return { background: "#f3f4f6", color: "#6b7280" }
  }
}

function triggerStyle(t: string) {
  switch (t) {
    case "Record Created": return { background: "#eff6ff", color: "#1a56db" }
    case "Record Updated": return { background: "#f0fdf4", color: "#16a34a" }
    case "Scheduled": return { background: "#fef9c3", color: "#d97706" }
    default: return { background: "#f3e8ff", color: "#7c3aed" }
  }
}

const categories = ["All", "CRM", "Accounting", "Service", "People"]

export default function AutomationTemplatesPage() {
  return (
    <div style={{ padding: 32, minHeight: "100vh", background: "var(--background)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
        <Copy size={24} style={{ color: "#f59e0b" }} />
        <h1 style={{ fontSize: 22, fontWeight: 700, color: "var(--foreground)", margin: 0 }}>Template Library</h1>
      </div>
      <p style={{ fontSize: 14, color: "var(--muted-foreground)", marginBottom: 24 }}>Pre-built automation workflows. Click "Use Template" to copy and customise.</p>

      {/* Category filter */}
      <div style={{ display: "flex", gap: 8, marginBottom: 28 }}>
        {categories.map(c => (
          <button key={c} style={{ padding: "6px 16px", borderRadius: 20, fontSize: 13, fontWeight: 500, border: "1px solid var(--border)", cursor: "pointer", background: c === "All" ? "var(--primary)" : "white", color: c === "All" ? "white" : "var(--foreground)" }}>{c}</button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
        {templates.map(t => (
          <div key={t.name} style={{ border: "1px solid var(--border)", borderRadius: 12, padding: 24, background: "white", display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: "#fffbeb", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Zap size={20} style={{ color: "#f59e0b" }} />
              </div>
              <span style={{ ...categoryStyle(t.category), fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 10 }}>{t.category}</span>
            </div>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: "var(--foreground)", margin: "0 0 8px" }}>{t.name}</h3>
            <p style={{ fontSize: 13, color: "var(--muted-foreground)", lineHeight: 1.5, margin: "0 0 16px", flex: 1 }}>{t.desc}</p>
            <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
              <span style={{ ...triggerStyle(t.trigger), fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 8 }}>{t.trigger}</span>
              <span style={{ background: "#f3f4f6", color: "#6b7280", fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 8 }}>{t.actions} actions</span>
            </div>
            <button style={{ background: "#f59e0b", color: "white", border: "none", borderRadius: 8, padding: "9px 0", fontWeight: 600, fontSize: 13, cursor: "pointer", width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
              <Copy size={14} /> Use Template
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
