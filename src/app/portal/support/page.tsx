"use client"

import { useState } from "react"
import { Plus, X, Paperclip, Send } from "lucide-react"

const myTickets = [
  { number: "#TK-441", title: "Cannot export reports to PDF",     status: "Open",       priority: "High",   category: "Bug",     created: "9 Jun 2026",  updated: "2h ago" },
  { number: "#TK-438", title: "User onboarding question",          status: "In Review",  priority: "Normal", category: "Support", created: "8 Jun 2026",  updated: "1d ago" },
  { number: "#TK-432", title: "Invoice discrepancy Jan 2026",      status: "Resolved",   priority: "Normal", category: "Billing", created: "2 Jun 2026",  updated: "3d ago" },
  { number: "#TK-425", title: "Request dashboard customisation",   status: "Closed",     priority: "Low",    category: "Feature", created: "25 May 2026", updated: "2w ago" },
  { number: "#TK-418", title: "API rate limit exceeded error",     status: "Resolved",   priority: "High",   category: "Bug",     created: "18 May 2026", updated: "3w ago" },
]

const statusConfig: Record<string, { color: string; bg: string }> = {
  "Open":      { color: "#2563eb", bg: "#eff6ff" },
  "In Review": { color: "#d97706", bg: "#fffbeb" },
  "Resolved":  { color: "#16a34a", bg: "#f0fdf4" },
  "Closed":    { color: "#64748b", bg: "#f1f5f9" },
}

const priorityConfig: Record<string, { color: string; bg: string }> = {
  "High":   { color: "#ef4444", bg: "#fef2f2" },
  "Normal": { color: "#2563eb", bg: "#eff6ff" },
  "Low":    { color: "#64748b", bg: "#f1f5f9" },
}

interface FormState {
  subject: string
  category: string
  priority: string
  description: string
}

export default function PortalSupportPage() {
  const [showForm, setShowForm] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState<FormState>({
    subject: "",
    category: "Support",
    priority: "Normal",
    description: "",
  })

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setShowForm(false)
      setSubmitted(false)
      setForm({ subject: "", category: "Support", priority: "Normal", description: "" })
    }, 2000)
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: "var(--foreground)", margin: "0 0 4px 0" }}>Support</h1>
          <p style={{ fontSize: 14, color: "var(--muted-foreground)", margin: 0 }}>Submit and track your support requests</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "9px 18px",
            borderRadius: 8,
            border: "none",
            background: "var(--primary)",
            color: "white",
            fontWeight: 700,
            fontSize: 13,
            cursor: "pointer",
          }}
        >
          <Plus size={15} />
          New Request
        </button>
      </div>

      {/* New ticket form */}
      {showForm && (
        <div style={{
          background: "white",
          border: "1px solid var(--border)",
          borderRadius: 12,
          overflow: "hidden",
        }}>
          <div style={{
            padding: "16px 20px",
            borderBottom: "1px solid var(--border)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "var(--muted)",
          }}>
            <h2 style={{ fontSize: 15, fontWeight: 700, color: "var(--foreground)", margin: 0 }}>Submit New Request</h2>
            <button
              onClick={() => setShowForm(false)}
              style={{ background: "none", border: "none", cursor: "pointer", color: "var(--muted-foreground)", padding: 4 }}
            >
              <X size={16} />
            </button>
          </div>

          {submitted ? (
            <div style={{ padding: 40, textAlign: "center" }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>✓</div>
              <p style={{ fontWeight: 700, fontSize: 16, color: "#16a34a", margin: "0 0 6px 0" }}>Request Submitted!</p>
              <p style={{ fontSize: 13, color: "var(--muted-foreground)", margin: 0 }}>
                We'll respond within 1 business day. Check your email for confirmation.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ padding: 24, display: "flex", flexDirection: "column", gap: 18 }}>
              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "var(--foreground)", marginBottom: 6 }}>
                  Subject <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Brief description of your issue"
                  value={form.subject}
                  onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                  style={{
                    width: "100%",
                    padding: "9px 12px",
                    borderRadius: 8,
                    border: "1px solid var(--border)",
                    fontSize: 14,
                    color: "var(--foreground)",
                    outline: "none",
                    boxSizing: "border-box",
                    background: "white",
                  }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "var(--foreground)", marginBottom: 6 }}>Category</label>
                  <select
                    value={form.category}
                    onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                    style={{
                      width: "100%",
                      padding: "9px 12px",
                      borderRadius: 8,
                      border: "1px solid var(--border)",
                      fontSize: 14,
                      color: "var(--foreground)",
                      background: "white",
                      outline: "none",
                    }}
                  >
                    <option>Support</option>
                    <option>Bug</option>
                    <option>Billing</option>
                    <option>Feature Request</option>
                    <option>Account</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "var(--foreground)", marginBottom: 6 }}>Priority</label>
                  <select
                    value={form.priority}
                    onChange={e => setForm(f => ({ ...f, priority: e.target.value }))}
                    style={{
                      width: "100%",
                      padding: "9px 12px",
                      borderRadius: 8,
                      border: "1px solid var(--border)",
                      fontSize: 14,
                      color: "var(--foreground)",
                      background: "white",
                      outline: "none",
                    }}
                  >
                    <option>Low</option>
                    <option>Normal</option>
                    <option>High</option>
                    <option>Urgent</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "var(--foreground)", marginBottom: 6 }}>
                  Description <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <textarea
                  required
                  rows={5}
                  placeholder="Please describe your issue in detail. Include any error messages, steps to reproduce, and screenshots if relevant."
                  value={form.description}
                  onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                  style={{
                    width: "100%",
                    padding: "9px 12px",
                    borderRadius: 8,
                    border: "1px solid var(--border)",
                    fontSize: 14,
                    color: "var(--foreground)",
                    outline: "none",
                    resize: "vertical",
                    boxSizing: "border-box",
                    background: "white",
                    fontFamily: "inherit",
                  }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "var(--foreground)", marginBottom: 6 }}>Attachments (optional)</label>
                <div style={{
                  border: "2px dashed var(--border)",
                  borderRadius: 8,
                  padding: "20px",
                  textAlign: "center",
                  cursor: "pointer",
                  color: "var(--muted-foreground)",
                }}>
                  <Paperclip size={20} style={{ margin: "0 auto 8px" }} />
                  <p style={{ fontSize: 13, margin: 0 }}>Click to attach files or drag and drop</p>
                  <p style={{ fontSize: 11, margin: "4px 0 0" }}>PNG, JPG, PDF up to 10MB</p>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  style={{
                    padding: "9px 18px",
                    borderRadius: 8,
                    border: "1px solid var(--border)",
                    background: "white",
                    color: "var(--foreground)",
                    fontWeight: 600,
                    fontSize: 13,
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "9px 20px",
                    borderRadius: 8,
                    border: "none",
                    background: "var(--primary)",
                    color: "white",
                    fontWeight: 700,
                    fontSize: 13,
                    cursor: "pointer",
                  }}
                >
                  <Send size={13} />
                  Submit Request
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* Tickets list */}
      <div style={{ background: "white", border: "1px solid var(--border)", borderRadius: 10, overflow: "hidden" }}>
        <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border)" }}>
          <h2 style={{ fontSize: 14, fontWeight: 700, color: "var(--foreground)", margin: 0 }}>My Tickets</h2>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ background: "var(--muted)" }}>
                {["#", "Title", "Category", "Status", "Priority", "Created", "Updated"].map(h => (
                  <th key={h} style={{ padding: "10px 20px", textAlign: "left", fontWeight: 600, fontSize: 11, color: "var(--muted-foreground)", textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {myTickets.map(t => {
                const sc = statusConfig[t.status] ?? { color: "#64748b", bg: "#f1f5f9" }
                const pc = priorityConfig[t.priority] ?? { color: "#64748b", bg: "#f1f5f9" }
                return (
                  <tr key={t.number} style={{ borderTop: "1px solid var(--border)" }}>
                    <td style={{ padding: "12px 20px", fontWeight: 700, color: "var(--primary)" }}>{t.number}</td>
                    <td style={{ padding: "12px 20px", fontWeight: 500, color: "var(--foreground)", maxWidth: 260 }}>{t.title}</td>
                    <td style={{ padding: "12px 20px", color: "var(--muted-foreground)" }}>{t.category}</td>
                    <td style={{ padding: "12px 20px" }}>
                      <span style={{ display: "inline-flex", alignItems: "center", padding: "2px 9px", borderRadius: 20, fontSize: 12, fontWeight: 600, color: sc.color, background: sc.bg }}>{t.status}</span>
                    </td>
                    <td style={{ padding: "12px 20px" }}>
                      <span style={{ display: "inline-flex", alignItems: "center", padding: "2px 9px", borderRadius: 20, fontSize: 12, fontWeight: 600, color: pc.color, background: pc.bg }}>{t.priority}</span>
                    </td>
                    <td style={{ padding: "12px 20px", color: "var(--muted-foreground)" }}>{t.created}</td>
                    <td style={{ padding: "12px 20px", color: "var(--muted-foreground)" }}>{t.updated}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
