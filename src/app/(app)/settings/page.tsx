"use client"

import { useState } from "react"
import { User, Camera, Save } from "lucide-react"

export default function ProfileSettingsPage() {
  const [form, setForm] = useState({
    firstName: "James",
    lastName: "Hartley",
    email: "james.hartley@company.com",
    phone: "+44 7712 345 678",
    jobTitle: "Head of Sales",
    department: "Sales",
    timezone: "Europe/London",
    language: "English (UK)",
  })

  return (
    <div style={{ padding: 32, minHeight: "100vh", background: "var(--background)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 32 }}>
        <User size={24} style={{ color: "#475569" }} />
        <h1 style={{ fontSize: 22, fontWeight: 700, color: "var(--foreground)", margin: 0 }}>Profile Settings</h1>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 28, maxWidth: 860 }}>
        {/* Avatar Card */}
        <div style={{ border: "1px solid var(--border)", borderRadius: 12, padding: 28, background: "white", textAlign: "center", alignSelf: "flex-start" }}>
          <div style={{ position: "relative", display: "inline-block", marginBottom: 16 }}>
            <div style={{ width: 96, height: 96, borderRadius: "50%", background: "linear-gradient(135deg, #475569, #64748b)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto" }}>
              <span style={{ fontSize: 32, fontWeight: 700, color: "white" }}>JH</span>
            </div>
            <button style={{ position: "absolute", bottom: 0, right: 0, width: 28, height: 28, borderRadius: "50%", background: "var(--primary)", border: "2px solid white", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
              <Camera size={12} style={{ color: "white" }} />
            </button>
          </div>
          <p style={{ fontSize: 16, fontWeight: 700, color: "var(--foreground)", margin: "0 0 4px" }}>{form.firstName} {form.lastName}</p>
          <p style={{ fontSize: 13, color: "var(--muted-foreground)", margin: "0 0 16px" }}>{form.jobTitle}</p>
          <button style={{ width: "100%", padding: "9px 0", border: "1px solid var(--border)", borderRadius: 8, background: "white", fontSize: 13, cursor: "pointer", fontWeight: 500, color: "var(--foreground)", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
            <Camera size={14} /> Change Photo
          </button>
        </div>

        {/* Form */}
        <div style={{ border: "1px solid var(--border)", borderRadius: 12, padding: 28, background: "white" }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--foreground)", marginBottom: 20 }}>Personal Information</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
            {[
              { label: "First Name", key: "firstName" },
              { label: "Last Name", key: "lastName" },
              { label: "Email Address", key: "email" },
              { label: "Phone", key: "phone" },
              { label: "Job Title", key: "jobTitle" },
              { label: "Department", key: "department" },
            ].map(f => (
              <div key={f.key}>
                <label style={{ fontSize: 12, fontWeight: 600, color: "var(--muted-foreground)", display: "block", marginBottom: 6 }}>{f.label}</label>
                <input
                  value={form[f.key as keyof typeof form]}
                  onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                  style={{ width: "100%", padding: "9px 12px", border: "1px solid var(--border)", borderRadius: 8, fontSize: 14, color: "var(--foreground)", background: "var(--background)", boxSizing: "border-box" }}
                />
              </div>
            ))}
          </div>

          <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--foreground)", margin: "28px 0 16px" }}>Preferences</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginBottom: 24 }}>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: "var(--muted-foreground)", display: "block", marginBottom: 6 }}>Timezone</label>
              <select value={form.timezone} onChange={e => setForm(prev => ({ ...prev, timezone: e.target.value }))} style={{ width: "100%", padding: "9px 12px", border: "1px solid var(--border)", borderRadius: 8, fontSize: 14, color: "var(--foreground)", background: "var(--background)" }}>
                <option>Europe/London</option>
                <option>America/New_York</option>
                <option>America/Los_Angeles</option>
                <option>Europe/Paris</option>
                <option>Asia/Dubai</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: "var(--muted-foreground)", display: "block", marginBottom: 6 }}>Language</label>
              <select value={form.language} onChange={e => setForm(prev => ({ ...prev, language: e.target.value }))} style={{ width: "100%", padding: "9px 12px", border: "1px solid var(--border)", borderRadius: 8, fontSize: 14, color: "var(--foreground)", background: "var(--background)" }}>
                <option>English (UK)</option>
                <option>English (US)</option>
                <option>French</option>
                <option>German</option>
                <option>Spanish</option>
              </select>
            </div>
          </div>

          <button style={{ display: "flex", alignItems: "center", gap: 6, background: "var(--primary)", color: "white", border: "none", borderRadius: 8, padding: "10px 24px", fontWeight: 600, fontSize: 14, cursor: "pointer" }}>
            <Save size={14} /> Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}
