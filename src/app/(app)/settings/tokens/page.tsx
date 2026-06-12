"use client"

import { useState } from "react"
import { Key, Trash2, Plus, AlertCircle } from "lucide-react"

const existingTokens = [
  { name: "CI/CD Pipeline Token", created: "12 Jan 2026", lastUsed: "10 Jun 2026", permissions: "Read, Write", expires: "12 Jan 2027" },
  { name: "Zapier Integration", created: "03 Mar 2026", lastUsed: "10 Jun 2026", permissions: "Read", expires: "Never" },
  { name: "Analytics Export Script", created: "15 Apr 2026", lastUsed: "07 Jun 2026", permissions: "Read", expires: "15 Oct 2026" },
]

export default function TokensPage() {
  const [showForm, setShowForm] = useState(false)
  const [newName, setNewName] = useState("")
  const [permissions, setPermissions] = useState({ read: true, write: false, admin: false })
  const [expiry, setExpiry] = useState("never")

  return (
    <div style={{ padding: 32, minHeight: "100vh", background: "var(--background)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 32 }}>
        <Key size={24} style={{ color: "#475569" }} />
        <h1 style={{ fontSize: 22, fontWeight: 700, color: "var(--foreground)", margin: 0 }}>API Tokens</h1>
      </div>

      <div style={{ maxWidth: 720, display: "flex", flexDirection: "column", gap: 24 }}>
        {/* Existing tokens */}
        <div style={{ border: "1px solid var(--border)", borderRadius: 12, overflow: "hidden", background: "white" }}>
          <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--foreground)", margin: 0 }}>Active Tokens</h3>
            <span style={{ background: "#eff6ff", color: "#1a56db", fontSize: 12, fontWeight: 600, padding: "2px 10px", borderRadius: 10 }}>{existingTokens.length} tokens</span>
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "var(--muted)", borderBottom: "1px solid var(--border)" }}>
                {["Name", "Created", "Last Used", "Permissions", "Expires", ""].map(h => (
                  <th key={h} style={{ padding: "8px 16px", textAlign: "left", fontSize: 11, fontWeight: 600, color: "var(--muted-foreground)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {existingTokens.map((t, i) => (
                <tr key={t.name} style={{ borderBottom: "1px solid var(--border)", background: i % 2 === 0 ? "white" : "#fafafa" }}>
                  <td style={{ padding: "12px 16px", fontSize: 13, fontWeight: 600, color: "var(--foreground)" }}>{t.name}</td>
                  <td style={{ padding: "12px 16px", fontSize: 12, color: "var(--muted-foreground)" }}>{t.created}</td>
                  <td style={{ padding: "12px 16px", fontSize: 12, color: "var(--muted-foreground)" }}>{t.lastUsed}</td>
                  <td style={{ padding: "12px 16px" }}>
                    <span style={{ background: "#eff6ff", color: "#1a56db", fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 8 }}>{t.permissions}</span>
                  </td>
                  <td style={{ padding: "12px 16px", fontSize: 12, color: t.expires !== "Never" && new Date(t.expires) < new Date("2026-08-01") ? "#dc2626" : "var(--muted-foreground)", fontWeight: t.expires !== "Never" && new Date(t.expires) < new Date("2026-08-01") ? 600 : 400 }}>{t.expires}</td>
                  <td style={{ padding: "12px 16px" }}>
                    <button style={{ display: "flex", alignItems: "center", gap: 4, padding: "5px 10px", border: "1px solid #fee2e2", borderRadius: 6, background: "white", color: "#dc2626", fontSize: 12, cursor: "pointer" }}>
                      <Trash2 size={12} /> Revoke
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Generate new token */}
        <div style={{ border: "1px solid var(--border)", borderRadius: 12, padding: 28, background: "white" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: showForm ? 20 : 0 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--foreground)", margin: 0 }}>Generate New Token</h3>
            {!showForm && (
              <button onClick={() => setShowForm(true)} style={{ display: "flex", alignItems: "center", gap: 6, background: "var(--primary)", color: "white", border: "none", borderRadius: 8, padding: "8px 16px", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>
                <Plus size={14} /> Generate Token
              </button>
            )}
          </div>

          {showForm && (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: "var(--muted-foreground)", display: "block", marginBottom: 6 }}>Token Name</label>
                <input value={newName} onChange={e => setNewName(e.target.value)} placeholder="e.g. My App Integration" style={{ width: "100%", padding: "9px 12px", border: "1px solid var(--border)", borderRadius: 8, fontSize: 14, color: "var(--foreground)", background: "var(--background)", boxSizing: "border-box" }} />
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: "var(--muted-foreground)", display: "block", marginBottom: 8 }}>Permissions</label>
                <div style={{ display: "flex", gap: 16 }}>
                  {(["read", "write", "admin"] as const).map(p => (
                    <label key={p} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
                      <input type="checkbox" checked={permissions[p]} onChange={e => setPermissions(prev => ({ ...prev, [p]: e.target.checked }))} />
                      <span style={{ fontSize: 13, color: "var(--foreground)", textTransform: "capitalize", fontWeight: 500 }}>{p}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: "var(--muted-foreground)", display: "block", marginBottom: 6 }}>Expiry</label>
                <select value={expiry} onChange={e => setExpiry(e.target.value)} style={{ padding: "9px 12px", border: "1px solid var(--border)", borderRadius: 8, fontSize: 14, color: "var(--foreground)", background: "var(--background)" }}>
                  <option value="never">Never</option>
                  <option value="30d">30 Days</option>
                  <option value="90d">90 Days</option>
                  <option value="180d">180 Days</option>
                  <option value="1y">1 Year</option>
                </select>
              </div>
              <div style={{ padding: "12px 16px", background: "#fefce8", border: "1px solid #fde68a", borderRadius: 8, display: "flex", gap: 8 }}>
                <AlertCircle size={16} style={{ color: "#d97706", flexShrink: 0, marginTop: 1 }} />
                <p style={{ fontSize: 13, color: "#d97706", margin: 0 }}>Token shown only once upon creation. Copy it immediately — it cannot be viewed again.</p>
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <button style={{ background: "var(--primary)", color: "white", border: "none", borderRadius: 8, padding: "10px 20px", fontWeight: 600, fontSize: 14, cursor: "pointer" }}>Generate Token</button>
                <button onClick={() => setShowForm(false)} style={{ background: "white", color: "var(--foreground)", border: "1px solid var(--border)", borderRadius: 8, padding: "10px 20px", fontWeight: 500, fontSize: 14, cursor: "pointer" }}>Cancel</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
