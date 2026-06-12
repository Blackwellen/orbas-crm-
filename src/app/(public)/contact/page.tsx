"use client"

import { useState } from "react"
import { Mail, Phone, MapPin, MessageSquare, CheckCircle2, Clock } from "lucide-react"

const contactDetails = [
  {
    icon: MapPin,
    label: "Office",
    value: "1 Canada Square, Canary Wharf\nLondon, E14 5AB\nUnited Kingdom",
    color: "#2563eb",
    bg: "#eff6ff",
  },
  {
    icon: Mail,
    label: "Email",
    value: "hello@orbas.io",
    link: "mailto:hello@orbas.io",
    color: "#7c3aed",
    bg: "#f5f3ff",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+44 (0) 20 7946 0200",
    link: "tel:+442079460200",
    color: "#16a34a",
    bg: "#f0fdf4",
  },
  {
    icon: Clock,
    label: "Support Hours",
    value: "Mon–Fri: 9am – 6pm BST\nEmergency: 24/7 via portal",
    color: "#d97706",
    bg: "#fffbeb",
  },
]

const departments = [
  "Sales & Pricing",
  "Technical Support",
  "Billing",
  "Partnership / Reseller",
  "Media & Press",
  "Security",
  "Other",
]

interface FormState {
  name: string
  email: string
  company: string
  department: string
  message: string
}

export default function ContactPage() {
  const [form, setForm] = useState<FormState>({
    name: "", email: "", company: "", department: "Sales & Pricing", message: "",
  })
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div style={{ background: "white" }}>
      {/* Hero */}
      <div style={{
        background: "linear-gradient(135deg, #0f172a 0%, #1a3a6b 100%)",
        padding: "56px 24px",
        textAlign: "center",
      }}>
        <h1 style={{ fontSize: 40, fontWeight: 800, color: "white", margin: "0 0 14px 0" }}>Get in touch</h1>
        <p style={{ fontSize: 18, color: "rgba(255,255,255,0.75)", margin: 0 }}>
          We'd love to hear from you. Our team typically responds within 2 hours.
        </p>
      </div>

      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "56px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 48, alignItems: "start" }}>
          {/* Left: company details */}
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--foreground)", margin: "0 0 24px 0" }}>Contact Details</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 32 }}>
              {contactDetails.map(d => {
                const Icon = d.icon
                return (
                  <div key={d.label} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                    <div style={{
                      width: 40, height: 40, borderRadius: 10,
                      background: d.bg,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0,
                    }}>
                      <Icon size={17} color={d.color} />
                    </div>
                    <div>
                      <p style={{ fontSize: 11, fontWeight: 700, color: "var(--muted-foreground)", margin: "0 0 3px 0", textTransform: "uppercase", letterSpacing: "0.05em" }}>{d.label}</p>
                      {d.link ? (
                        <a href={d.link} style={{ fontSize: 14, color: d.color, fontWeight: 600, textDecoration: "none" }}>{d.value}</a>
                      ) : (
                        <p style={{ fontSize: 14, color: "var(--foreground)", margin: 0, whiteSpace: "pre-line", lineHeight: 1.6 }}>{d.value}</p>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Map placeholder */}
            <div style={{
              height: 220,
              background: "linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%)",
              borderRadius: 12,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid var(--border)",
              flexDirection: "column",
              gap: 8,
            }}>
              <MapPin size={28} color="#94a3b8" />
              <p style={{ fontSize: 13, color: "#94a3b8", margin: 0, fontWeight: 500 }}>Canary Wharf, London</p>
              <p style={{ fontSize: 12, color: "#94a3b8", margin: 0 }}>E14 5AB, United Kingdom</p>
            </div>
          </div>

          {/* Right: form */}
          <div>
            {submitted ? (
              <div style={{
                background: "#f0fdf4",
                border: "1px solid #bbf7d0",
                borderRadius: 14,
                padding: 40,
                textAlign: "center",
              }}>
                <CheckCircle2 size={48} color="#16a34a" style={{ margin: "0 auto 16px" }} />
                <h3 style={{ fontSize: 20, fontWeight: 700, color: "#15803d", margin: "0 0 10px 0" }}>Message Sent!</h3>
                <p style={{ fontSize: 14, color: "#166534", margin: "0 0 20px 0", lineHeight: 1.6 }}>
                  Thank you for reaching out. We'll respond to <strong>{form.email}</strong> within 2 business hours.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: "", email: "", company: "", department: "Sales & Pricing", message: "" }) }}
                  style={{
                    padding: "9px 20px", borderRadius: 8,
                    border: "1px solid #bbf7d0", background: "white",
                    color: "#166534", fontWeight: 600, fontSize: 13, cursor: "pointer",
                  }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <div style={{
                border: "1px solid var(--border)",
                borderRadius: 14,
                overflow: "hidden",
                boxShadow: "0 4px 24px rgba(0,0,0,0.05)",
              }}>
                <div style={{ padding: "20px 24px", borderBottom: "1px solid var(--border)", background: "var(--muted)", display: "flex", alignItems: "center", gap: 10 }}>
                  <MessageSquare size={16} color="var(--primary)" />
                  <h2 style={{ fontSize: 15, fontWeight: 700, color: "var(--foreground)", margin: 0 }}>Send us a message</h2>
                </div>
                <form onSubmit={handleSubmit} style={{ padding: 24, display: "flex", flexDirection: "column", gap: 18 }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                    {[
                      { label: "Full Name", key: "name", type: "text", placeholder: "Jane Smith", req: true },
                      { label: "Email Address", key: "email", type: "email", placeholder: "jane@company.com", req: true },
                    ].map(f => (
                      <div key={f.key}>
                        <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "var(--foreground)", marginBottom: 5, textTransform: "uppercase", letterSpacing: "0.04em" }}>
                          {f.label} {f.req && <span style={{ color: "#ef4444" }}>*</span>}
                        </label>
                        <input
                          type={f.type}
                          required={f.req}
                          placeholder={f.placeholder}
                          value={(form as unknown as Record<string, string>)[f.key]}
                          onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))}
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

                  <div>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "var(--foreground)", marginBottom: 5, textTransform: "uppercase", letterSpacing: "0.04em" }}>
                      Company
                    </label>
                    <input
                      type="text"
                      placeholder="Your Company Ltd"
                      value={form.company}
                      onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
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

                  <div>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "var(--foreground)", marginBottom: 5, textTransform: "uppercase", letterSpacing: "0.04em" }}>
                      Department <span style={{ color: "#ef4444" }}>*</span>
                    </label>
                    <select
                      required
                      value={form.department}
                      onChange={e => setForm(f => ({ ...f, department: e.target.value }))}
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
                      {departments.map(d => <option key={d}>{d}</option>)}
                    </select>
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "var(--foreground)", marginBottom: 5, textTransform: "uppercase", letterSpacing: "0.04em" }}>
                      Message <span style={{ color: "#ef4444" }}>*</span>
                    </label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Tell us how we can help..."
                      value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      style={{
                        width: "100%",
                        padding: "9px 12px",
                        borderRadius: 7,
                        border: "1px solid var(--border)",
                        fontSize: 13,
                        color: "var(--foreground)",
                        outline: "none",
                        resize: "vertical",
                        boxSizing: "border-box",
                        fontFamily: "inherit",
                        background: "white",
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    style={{
                      padding: "12px",
                      borderRadius: 8,
                      border: "none",
                      background: "linear-gradient(135deg, #1a56db, #06b6d4)",
                      color: "white",
                      fontWeight: 700,
                      fontSize: 15,
                      cursor: "pointer",
                    }}
                  >
                    Send Message
                  </button>

                  <p style={{ fontSize: 12, color: "var(--muted-foreground)", textAlign: "center", margin: 0 }}>
                    By submitting, you agree to our{" "}
                    <a href="/legal/privacy" style={{ color: "var(--primary)" }}>Privacy Policy</a>
                  </p>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
