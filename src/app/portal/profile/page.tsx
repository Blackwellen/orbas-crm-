"use client"

import { useState } from "react"
import { User, Mail, Phone, Building2, Shield, Bell, CheckCircle2 } from "lucide-react"

interface ProfileForm {
  firstName: string
  lastName: string
  email: string
  phone: string
  company: string
  jobTitle: string
}

export default function PortalProfilePage() {
  const [profile, setProfile] = useState<ProfileForm>({
    firstName: "David",
    lastName: "Harrison",
    email: "d.harrison@acmecorp.com",
    phone: "+44 7700 900123",
    company: "Acme Corporation",
    jobTitle: "Operations Director",
  })
  const [saved, setSaved] = useState(false)

  function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 700 }}>
      <div>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: "var(--foreground)", margin: "0 0 4px 0" }}>My Profile</h1>
        <p style={{ fontSize: 14, color: "var(--muted-foreground)", margin: 0 }}>Manage your contact details and portal preferences</p>
      </div>

      {saved && (
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "12px 16px",
          background: "#f0fdf4",
          border: "1px solid #bbf7d0",
          borderRadius: 8,
          fontSize: 14,
          fontWeight: 600,
          color: "#15803d",
        }}>
          <CheckCircle2 size={16} />
          Profile updated successfully
        </div>
      )}

      {/* Avatar */}
      <div style={{
        background: "white",
        border: "1px solid var(--border)",
        borderRadius: 12,
        padding: 24,
        display: "flex",
        alignItems: "center",
        gap: 20,
      }}>
        <div style={{
          width: 72, height: 72, borderRadius: "50%",
          background: "linear-gradient(135deg, #1a56db, #06b6d4)",
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
        }}>
          <span style={{ fontSize: 28, fontWeight: 700, color: "white" }}>DH</span>
        </div>
        <div>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--foreground)", margin: "0 0 4px 0" }}>
            {profile.firstName} {profile.lastName}
          </h2>
          <p style={{ fontSize: 14, color: "var(--muted-foreground)", margin: "0 0 10px 0" }}>
            {profile.jobTitle} · {profile.company}
          </p>
          <button style={{
            padding: "6px 14px",
            borderRadius: 6,
            border: "1px solid var(--border)",
            background: "white",
            fontSize: 12,
            fontWeight: 600,
            color: "var(--foreground)",
            cursor: "pointer",
          }}>
            Change Photo
          </button>
        </div>
      </div>

      {/* Profile form */}
      <div style={{ background: "white", border: "1px solid var(--border)", borderRadius: 12, overflow: "hidden" }}>
        <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 8 }}>
          <User size={15} color="var(--primary)" />
          <h2 style={{ fontSize: 14, fontWeight: 700, color: "var(--foreground)", margin: 0 }}>Contact Information</h2>
        </div>
        <form onSubmit={handleSave} style={{ padding: 24, display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {([
              { label: "First Name", key: "firstName", type: "text" },
              { label: "Last Name",  key: "lastName",  type: "text" },
              { label: "Email Address", key: "email",  type: "email" },
              { label: "Phone",     key: "phone",   type: "tel" },
              { label: "Company",   key: "company", type: "text" },
              { label: "Job Title", key: "jobTitle", type: "text" },
            ] as { label: string; key: keyof ProfileForm; type: string }[]).map(f => (
              <div key={f.key}>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "var(--foreground)", marginBottom: 5, textTransform: "uppercase", letterSpacing: "0.04em" }}>
                  {f.label}
                </label>
                <input
                  type={f.type}
                  value={profile[f.key]}
                  onChange={e => setProfile(p => ({ ...p, [f.key]: e.target.value }))}
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
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button
              type="submit"
              style={{
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
              Save Changes
            </button>
          </div>
        </form>
      </div>

      {/* Security */}
      <div style={{ background: "white", border: "1px solid var(--border)", borderRadius: 12, overflow: "hidden" }}>
        <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 8 }}>
          <Shield size={15} color="var(--primary)" />
          <h2 style={{ fontSize: 14, fontWeight: 700, color: "var(--foreground)", margin: 0 }}>Security</h2>
        </div>
        <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <p style={{ fontSize: 14, fontWeight: 600, color: "var(--foreground)", margin: "0 0 2px 0" }}>Password</p>
              <p style={{ fontSize: 12, color: "var(--muted-foreground)", margin: 0 }}>Last changed 60 days ago</p>
            </div>
            <button style={{
              padding: "7px 14px", borderRadius: 7,
              border: "1px solid var(--border)", background: "white",
              color: "var(--foreground)", fontWeight: 600, fontSize: 12, cursor: "pointer",
            }}>
              Change Password
            </button>
          </div>
          <div style={{ borderTop: "1px solid var(--border)", paddingTop: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <p style={{ fontSize: 14, fontWeight: 600, color: "var(--foreground)", margin: "0 0 2px 0" }}>Two-Factor Authentication</p>
              <p style={{ fontSize: 12, color: "var(--muted-foreground)", margin: 0 }}>Add an extra layer of security to your account</p>
            </div>
            <button style={{
              padding: "7px 14px", borderRadius: 7,
              border: "none", background: "var(--primary)",
              color: "white", fontWeight: 600, fontSize: 12, cursor: "pointer",
            }}>
              Enable 2FA
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
