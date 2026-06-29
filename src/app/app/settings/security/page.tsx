"use client"

import { Lock, Shield, Key, Monitor, Trash2 } from "lucide-react"

const sessions = [
  { device: "Chrome on macOS", location: "London, UK", lastActive: "Just now", current: true },
  { device: "Firefox on Windows 11", location: "Manchester, UK", lastActive: "2 hours ago", current: false },
  { device: "Safari on iPhone 15", location: "London, UK", lastActive: "Yesterday, 18:42", current: false },
  { device: "Chrome on Windows 10", location: "Bristol, UK", lastActive: "3 days ago", current: false },
]

const loginHistory = [
  { ip: "82.45.120.15", device: "Chrome / macOS", timestamp: "10 Jun 2026, 09:14", status: "Success" },
  { ip: "82.45.120.15", device: "Chrome / macOS", timestamp: "09 Jun 2026, 08:52", status: "Success" },
  { ip: "82.45.120.15", device: "Safari / iPhone 15", timestamp: "08 Jun 2026, 18:42", status: "Success" },
  { ip: "82.45.120.15", device: "Firefox / Windows", timestamp: "07 Jun 2026, 14:20", status: "Success" },
  { ip: "185.200.44.1", device: "Unknown", timestamp: "07 Jun 2026, 03:12", status: "Failed" },
  { ip: "82.45.120.15", device: "Chrome / macOS", timestamp: "06 Jun 2026, 09:05", status: "Success" },
  { ip: "82.45.120.15", device: "Chrome / macOS", timestamp: "05 Jun 2026, 08:48", status: "Success" },
  { ip: "82.45.120.15", device: "Safari / iPhone 15", timestamp: "04 Jun 2026, 20:15", status: "Success" },
  { ip: "82.45.120.15", device: "Chrome / macOS", timestamp: "03 Jun 2026, 09:30", status: "Success" },
  { ip: "82.45.120.15", device: "Firefox / Windows", timestamp: "02 Jun 2026, 15:22", status: "Success" },
]

export default function SecuritySettingsPage() {
  return (
    <div style={{ padding: 32, minHeight: "100vh", background: "var(--background)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 32 }}>
        <Lock size={24} style={{ color: "#475569" }} />
        <h1 style={{ fontSize: 22, fontWeight: 700, color: "var(--foreground)", margin: 0 }}>Security</h1>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 740 }}>
        {/* Change Password */}
        <div style={{ border: "1px solid var(--border)", borderRadius: 12, padding: 28, background: "white" }}>
          <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 20 }}>
            <Key size={18} style={{ color: "#475569" }} />
            <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--foreground)", margin: 0 }}>Change Password</h3>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {["Current Password", "New Password", "Confirm New Password"].map(label => (
              <div key={label}>
                <label style={{ fontSize: 12, fontWeight: 600, color: "var(--muted-foreground)", display: "block", marginBottom: 6 }}>{label}</label>
                <input type="password" placeholder="••••••••••••" style={{ width: "100%", padding: "9px 12px", border: "1px solid var(--border)", borderRadius: 8, fontSize: 14, color: "var(--foreground)", background: "var(--background)", boxSizing: "border-box" }} />
              </div>
            ))}
            <button style={{ background: "var(--primary)", color: "white", border: "none", borderRadius: 8, padding: "10px 20px", fontWeight: 600, fontSize: 14, cursor: "pointer", alignSelf: "flex-start" }}>Update Password</button>
          </div>
        </div>

        {/* Two-Factor Authentication */}
        <div style={{ border: "1px solid var(--border)", borderRadius: 12, padding: 28, background: "white" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <Shield size={18} style={{ color: "#475569" }} />
              <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--foreground)", margin: 0 }}>Two-Factor Authentication</h3>
            </div>
            <span style={{ background: "#dcfce7", color: "#16a34a", fontSize: 12, fontWeight: 700, padding: "4px 12px", borderRadius: 20 }}>Enabled</span>
          </div>
          <p style={{ fontSize: 13, color: "var(--muted-foreground)", margin: "0 0 16px" }}>2FA is active via an authenticator app. Your account is protected with an additional layer of security.</p>
          <div style={{ display: "flex", gap: 10, alignItems: "center", padding: "12px 16px", border: "1px solid var(--border)", borderRadius: 8, marginBottom: 16 }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, background: "#f0fdf4", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Shield size={18} style={{ color: "#16a34a" }} />
            </div>
            <div>
              <p style={{ fontSize: 13, fontWeight: 600, color: "var(--foreground)", margin: 0 }}>Google Authenticator</p>
              <p style={{ fontSize: 12, color: "var(--muted-foreground)", margin: 0 }}>Linked 14 Jan 2025</p>
            </div>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button style={{ padding: "8px 16px", border: "1px solid var(--border)", borderRadius: 8, background: "white", fontSize: 13, cursor: "pointer", fontWeight: 500 }}>Manage 2FA</button>
            <button style={{ padding: "8px 16px", border: "1px solid var(--border)", borderRadius: 8, background: "white", fontSize: 13, cursor: "pointer", fontWeight: 500 }}>View Recovery Codes</button>
          </div>
        </div>

        {/* Active Sessions */}
        <div style={{ border: "1px solid var(--border)", borderRadius: 12, padding: 28, background: "white" }}>
          <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 20 }}>
            <Monitor size={18} style={{ color: "#475569" }} />
            <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--foreground)", margin: 0 }}>Active Sessions</h3>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {sessions.map((s, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0", borderBottom: i < sessions.length - 1 ? "1px solid var(--border)" : "none" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
                    <p style={{ fontSize: 13, fontWeight: 600, color: "var(--foreground)", margin: 0 }}>{s.device}</p>
                    {s.current && <span style={{ background: "#dcfce7", color: "#16a34a", fontSize: 10, fontWeight: 600, padding: "1px 6px", borderRadius: 6 }}>Current</span>}
                  </div>
                  <p style={{ fontSize: 12, color: "var(--muted-foreground)", margin: 0 }}>{s.location} · {s.lastActive}</p>
                </div>
                {!s.current && (
                  <button style={{ display: "flex", alignItems: "center", gap: 4, padding: "6px 12px", border: "1px solid #fee2e2", borderRadius: 6, background: "white", color: "#dc2626", fontSize: 12, cursor: "pointer", fontWeight: 500 }}>
                    <Trash2 size={12} /> Revoke
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Login History */}
        <div style={{ border: "1px solid var(--border)", borderRadius: 12, padding: 28, background: "white" }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--foreground)", marginBottom: 16 }}>Login History</h3>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                {["IP Address", "Device", "Timestamp", "Status"].map(h => (
                  <th key={h} style={{ padding: "8px 0", textAlign: "left", fontSize: 11, fontWeight: 600, color: "var(--muted-foreground)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loginHistory.map((l, i) => (
                <tr key={i} style={{ borderBottom: "1px solid var(--border)" }}>
                  <td style={{ padding: "10px 0", fontSize: 12, fontFamily: "monospace", color: "var(--foreground)" }}>{l.ip}</td>
                  <td style={{ padding: "10px 0", fontSize: 12, color: "var(--muted-foreground)" }}>{l.device}</td>
                  <td style={{ padding: "10px 0", fontSize: 12, color: "var(--muted-foreground)" }}>{l.timestamp}</td>
                  <td style={{ padding: "10px 0" }}>
                    <span style={{ background: l.status === "Success" ? "#dcfce7" : "#fee2e2", color: l.status === "Success" ? "#16a34a" : "#dc2626", fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 8 }}>{l.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
