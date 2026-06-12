"use client"

import { useState } from "react"
import { CheckCircle2, Star, Calendar, Clock, ChevronLeft, ChevronRight } from "lucide-react"

const benefits = [
  "See Orbas CRM configured for your industry",
  "Live walkthrough of Finance, CRM, Projects & HR modules",
  "Q&A with a product specialist",
  "Custom pricing quote for your team size",
  "60-day free trial offer for qualified businesses",
]

const testimonials = [
  {
    quote: "The demo showed us exactly how to solve our pipeline visibility problem. We were live within a week.",
    name: "James Walker",
    title: "CTO, NovaTech Solutions",
    rating: 5,
  },
  {
    quote: "Best 30 minutes I've spent evaluating software. The team understood our charity's unique needs.",
    name: "Patricia Okafor",
    title: "CEO, Green Leaf Foundation",
    rating: 5,
  },
]

// Mock availability grid: 7 days × 4 slots
const today = new Date(2026, 5, 10) // June 10 2026
function addDays(d: Date, n: number) { const r = new Date(d); r.setDate(r.getDate() + n); return r }
const days = Array.from({ length: 7 }, (_, i) => addDays(today, i + 1))
const slots = ["09:00", "11:00", "14:00", "16:00"]
// Some slots unavailable
const unavailable = new Set(["1-09:00", "1-11:00", "3-09:00", "4-14:00", "5-11:00", "5-16:00"])

const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]

const interestOptions = [
  "CRM & Contacts",
  "Accounting & Finance",
  "HR & Payroll",
  "Projects & Tasks",
  "Operations & Inventory",
  "Service & Support",
  "Full Platform",
]

interface FormState {
  name: string
  email: string
  company: string
  phone: string
  interest: string
  slot: string | null
}

export default function BookDemoPage() {
  const [form, setForm] = useState<FormState>({
    name: "", email: "", company: "", phone: "", interest: "Full Platform", slot: null,
  })
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.slot) return
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <div style={{ maxWidth: 480, textAlign: "center" }}>
          <div style={{
            width: 72, height: 72, borderRadius: "50%",
            background: "#f0fdf4", border: "3px solid #bbf7d0",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 24px",
          }}>
            <CheckCircle2 size={36} color="#16a34a" />
          </div>
          <h2 style={{ fontSize: 26, fontWeight: 700, color: "var(--foreground)", margin: "0 0 12px 0" }}>Demo Booked!</h2>
          <p style={{ fontSize: 16, color: "var(--muted-foreground)", margin: "0 0 8px 0" }}>
            Your slot: <strong style={{ color: "var(--foreground)" }}>{form.slot}</strong>
          </p>
          <p style={{ fontSize: 15, color: "var(--muted-foreground)", lineHeight: 1.6, margin: "0 0 28px 0" }}>
            We've sent a calendar invite to <strong>{form.email}</strong>.<br />
            A product specialist will be in touch shortly to confirm.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            style={{
              padding: "10px 24px", borderRadius: 8,
              border: "1px solid var(--border)", background: "white",
              color: "var(--foreground)", fontWeight: 600, fontSize: 14, cursor: "pointer",
            }}
          >
            Book Another
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ background: "white" }}>
      {/* Hero strip */}
      <div style={{
        background: "linear-gradient(135deg, #0f172a 0%, #1a3a6b 100%)",
        padding: "48px 24px 40px",
        textAlign: "center",
      }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: "#06b6d4", letterSpacing: "0.1em", margin: "0 0 10px 0" }}>LIVE PRODUCT DEMO</p>
        <h1 style={{ fontSize: 38, fontWeight: 800, color: "white", margin: "0 0 12px 0", lineHeight: 1.2 }}>
          See Orbas in action
        </h1>
        <p style={{ fontSize: 17, color: "rgba(255,255,255,0.75)", margin: 0 }}>
          30-minute personalised demo with a product specialist
        </p>
      </div>

      {/* Main content */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "48px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: 48, alignItems: "start" }}>
          {/* Left: benefits + testimonials */}
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--foreground)", margin: "0 0 20px 0" }}>
              What you'll get
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 36 }}>
              {benefits.map((b, i) => (
                <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <CheckCircle2 size={16} color="#16a34a" style={{ flexShrink: 0, marginTop: 2 }} />
                  <p style={{ fontSize: 14, color: "var(--foreground)", margin: 0, lineHeight: 1.5 }}>{b}</p>
                </div>
              ))}
            </div>

            <h2 style={{ fontSize: 16, fontWeight: 700, color: "var(--foreground)", margin: "0 0 16px 0" }}>
              What customers say
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {testimonials.map((t, i) => (
                <div key={i} style={{
                  background: "var(--muted)",
                  borderRadius: 10,
                  padding: 18,
                  border: "1px solid var(--border)",
                }}>
                  <div style={{ display: "flex", gap: 2, marginBottom: 10 }}>
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} size={12} fill="#fbbf24" color="#fbbf24" />
                    ))}
                  </div>
                  <p style={{ fontSize: 13, color: "var(--foreground)", margin: "0 0 10px 0", fontStyle: "italic", lineHeight: 1.5 }}>
                    "{t.quote}"
                  </p>
                  <p style={{ fontSize: 12, fontWeight: 700, color: "var(--foreground)", margin: "0 0 1px 0" }}>{t.name}</p>
                  <p style={{ fontSize: 11, color: "var(--muted-foreground)", margin: 0 }}>{t.title}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: booking form */}
          <div style={{
            background: "white",
            border: "1px solid var(--border)",
            borderRadius: 14,
            overflow: "hidden",
            boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
          }}>
            <form onSubmit={handleSubmit}>
              {/* Personal info */}
              <div style={{ padding: 24 }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--foreground)", margin: "0 0 20px 0" }}>Your Details</h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  {[
                    { label: "Full Name", key: "name", type: "text", placeholder: "John Smith", required: true },
                    { label: "Work Email", key: "email", type: "email", placeholder: "john@company.com", required: true },
                    { label: "Company", key: "company", type: "text", placeholder: "Acme Ltd", required: true },
                    { label: "Phone (optional)", key: "phone", type: "tel", placeholder: "+44 7700 900000", required: false },
                  ].map(field => (
                    <div key={field.key}>
                      <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "var(--foreground)", marginBottom: 5, textTransform: "uppercase", letterSpacing: "0.04em" }}>
                        {field.label} {field.required && <span style={{ color: "#ef4444" }}>*</span>}
                      </label>
                      <input
                        type={field.type}
                        required={field.required}
                        placeholder={field.placeholder}
                        value={(form as unknown as Record<string, string>)[field.key]}
                        onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))}
                        style={{
                          width: "100%",
                          padding: "9px 12px",
                          borderRadius: 7,
                          border: "1px solid var(--border)",
                          fontSize: 13,
                          color: "var(--foreground)",
                          outline: "none",
                          boxSizing: "border-box",
                          background: "white",
                        }}
                      />
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 14 }}>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "var(--foreground)", marginBottom: 5, textTransform: "uppercase", letterSpacing: "0.04em" }}>
                    I'm most interested in <span style={{ color: "#ef4444" }}>*</span>
                  </label>
                  <select
                    value={form.interest}
                    onChange={e => setForm(f => ({ ...f, interest: e.target.value }))}
                    style={{
                      width: "100%",
                      padding: "9px 12px",
                      borderRadius: 7,
                      border: "1px solid var(--border)",
                      fontSize: 13,
                      color: "var(--foreground)",
                      background: "white",
                      outline: "none",
                    }}
                  >
                    {interestOptions.map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
              </div>

              {/* Slot picker */}
              <div style={{ padding: "0 24px 24px", borderTop: "1px solid var(--border)", paddingTop: 20 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                  <Calendar size={15} color="var(--primary)" />
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--foreground)", margin: 0 }}>Pick a Time Slot</h3>
                  <span style={{ fontSize: 12, color: "var(--muted-foreground)", marginLeft: "auto" }}>June 2026 · BST</span>
                </div>
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: 4 }}>
                    <thead>
                      <tr>
                        <th style={{ fontSize: 11, color: "var(--muted-foreground)", fontWeight: 600, padding: "2px 6px", width: 44 }}>
                          <Clock size={12} style={{ display: "block", margin: "0 auto" }} />
                        </th>
                        {days.map((d, i) => (
                          <th key={i} style={{ fontSize: 11, color: "var(--foreground)", fontWeight: 600, padding: "4px 2px", textAlign: "center", minWidth: 52 }}>
                            <div>{dayNames[d.getDay()]}</div>
                            <div style={{ fontSize: 14, fontWeight: 700 }}>{d.getDate()}</div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {slots.map(slot => (
                        <tr key={slot}>
                          <td style={{ fontSize: 11, color: "var(--muted-foreground)", padding: "2px 4px", textAlign: "right", fontFamily: "monospace" }}>{slot}</td>
                          {days.map((d, i) => {
                            const key = `${i + 1}-${slot}`
                            const blocked = unavailable.has(key)
                            const slotLabel = `${dayNames[d.getDay()]} ${d.getDate()} ${monthNames[d.getMonth()]} at ${slot}`
                            const selected = form.slot === slotLabel
                            return (
                              <td key={i} style={{ padding: "2px" }}>
                                <button
                                  type="button"
                                  disabled={blocked}
                                  onClick={() => !blocked && setForm(f => ({ ...f, slot: slotLabel }))}
                                  style={{
                                    width: "100%",
                                    padding: "6px 2px",
                                    borderRadius: 6,
                                    border: "1px solid",
                                    borderColor: selected ? "var(--primary)" : blocked ? "var(--border)" : "var(--border)",
                                    background: selected ? "var(--primary)" : blocked ? "var(--muted)" : "white",
                                    color: selected ? "white" : blocked ? "var(--muted-foreground)" : "var(--foreground)",
                                    fontSize: 10,
                                    fontWeight: 600,
                                    cursor: blocked ? "not-allowed" : "pointer",
                                    opacity: blocked ? 0.5 : 1,
                                    transition: "all 0.12s",
                                  }}
                                >
                                  {blocked ? "—" : "Free"}
                                </button>
                              </td>
                            )
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {form.slot && (
                  <div style={{
                    marginTop: 12,
                    padding: "8px 12px",
                    background: "#eff6ff",
                    border: "1px solid #bfdbfe",
                    borderRadius: 7,
                    fontSize: 13,
                    color: "#1d4ed8",
                    fontWeight: 600,
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}>
                    <CheckCircle2 size={14} />
                    Selected: {form.slot}
                  </div>
                )}
              </div>

              {/* Submit */}
              <div style={{ padding: "16px 24px 24px" }}>
                <button
                  type="submit"
                  disabled={!form.slot || !form.name || !form.email || !form.company}
                  style={{
                    width: "100%",
                    padding: "13px",
                    borderRadius: 8,
                    border: "none",
                    background: "linear-gradient(135deg, #1a56db, #06b6d4)",
                    color: "white",
                    fontWeight: 700,
                    fontSize: 15,
                    cursor: "pointer",
                    opacity: (!form.slot || !form.name || !form.email || !form.company) ? 0.5 : 1,
                    transition: "opacity 0.15s",
                  }}
                >
                  Confirm Demo Booking
                </button>
                <p style={{ fontSize: 12, color: "var(--muted-foreground)", textAlign: "center", margin: "10px 0 0" }}>
                  No credit card required · Cancel anytime · 30-minute session
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
