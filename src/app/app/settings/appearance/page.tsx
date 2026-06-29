"use client"

import { useState } from "react"
import { Palette, Save, Sun, Moon, Monitor } from "lucide-react"

export default function AppearanceSettingsPage() {
  const [theme, setTheme] = useState("light")
  const [density, setDensity] = useState("default")
  const [dateFormat, setDateFormat] = useState("DD/MM/YYYY")
  const [timeFormat, setTimeFormat] = useState("24h")
  const [language, setLanguage] = useState("English (UK)")

  const themes = [
    { id: "light", label: "Light", icon: Sun, preview: { bg: "#ffffff", sidebar: "#f8fafc", card: "#f1f5f9" } },
    { id: "dark", label: "Dark", icon: Moon, preview: { bg: "#1e293b", sidebar: "#0f172a", card: "#334155" } },
    { id: "system", label: "System", icon: Monitor, preview: { bg: "#f8fafc", sidebar: "#e2e8f0", card: "#cbd5e1" } },
  ]

  const densities = [
    { id: "compact", label: "Compact", desc: "More content, tighter spacing" },
    { id: "default", label: "Default", desc: "Balanced for everyday use" },
    { id: "comfortable", label: "Comfortable", desc: "More space, easier scanning" },
  ]

  return (
    <div style={{ padding: 32, minHeight: "100vh", background: "var(--background)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 32 }}>
        <Palette size={24} style={{ color: "#475569" }} />
        <h1 style={{ fontSize: 22, fontWeight: 700, color: "var(--foreground)", margin: 0 }}>Appearance</h1>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 700 }}>
        {/* Theme */}
        <div style={{ border: "1px solid var(--border)", borderRadius: 12, padding: 28, background: "white" }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--foreground)", marginBottom: 4 }}>Theme</h3>
          <p style={{ fontSize: 13, color: "var(--muted-foreground)", marginBottom: 20 }}>Choose how the application looks on your device.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {themes.map(t => (
              <button key={t.id} onClick={() => setTheme(t.id)} style={{ padding: 0, border: `2px solid ${theme === t.id ? "var(--primary)" : "var(--border)"}`, borderRadius: 12, background: "none", cursor: "pointer", overflow: "hidden", textAlign: "left" }}>
                {/* Preview */}
                <div style={{ height: 80, background: t.preview.bg, display: "flex", gap: 6, padding: 8 }}>
                  <div style={{ width: 28, height: "100%", borderRadius: 6, background: t.preview.sidebar }} />
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 5 }}>
                    <div style={{ height: 16, borderRadius: 4, background: t.preview.card }} />
                    <div style={{ height: 10, borderRadius: 4, background: t.preview.card, width: "80%" }} />
                    <div style={{ height: 10, borderRadius: 4, background: t.preview.card, width: "60%" }} />
                  </div>
                </div>
                <div style={{ padding: "10px 14px", display: "flex", alignItems: "center", gap: 8 }}>
                  <t.icon size={14} style={{ color: theme === t.id ? "var(--primary)" : "var(--muted-foreground)" }} />
                  <span style={{ fontSize: 13, fontWeight: theme === t.id ? 700 : 500, color: theme === t.id ? "var(--primary)" : "var(--foreground)" }}>{t.label}</span>
                  {theme === t.id && <span style={{ marginLeft: "auto", width: 8, height: 8, borderRadius: "50%", background: "var(--primary)" }} />}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Sidebar Density */}
        <div style={{ border: "1px solid var(--border)", borderRadius: 12, padding: 28, background: "white" }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--foreground)", marginBottom: 4 }}>Sidebar Density</h3>
          <p style={{ fontSize: 13, color: "var(--muted-foreground)", marginBottom: 20 }}>Control how compact or spacious the navigation sidebar appears.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {densities.map(d => (
              <button key={d.id} onClick={() => setDensity(d.id)} style={{ padding: "16px", border: `2px solid ${density === d.id ? "var(--primary)" : "var(--border)"}`, borderRadius: 10, background: density === d.id ? "#eff6ff" : "white", cursor: "pointer", textAlign: "left" }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: density === d.id ? "var(--primary)" : "var(--foreground)", margin: "0 0 4px" }}>{d.label}</p>
                <p style={{ fontSize: 12, color: "var(--muted-foreground)", margin: 0 }}>{d.desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Date & Format */}
        <div style={{ border: "1px solid var(--border)", borderRadius: 12, padding: 28, background: "white" }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--foreground)", marginBottom: 20 }}>Date, Time & Language</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: "var(--muted-foreground)", display: "block", marginBottom: 6 }}>Date Format</label>
              <select value={dateFormat} onChange={e => setDateFormat(e.target.value)} style={{ width: "100%", padding: "9px 12px", border: "1px solid var(--border)", borderRadius: 8, fontSize: 14, color: "var(--foreground)", background: "var(--background)" }}>
                <option>DD/MM/YYYY</option>
                <option>MM/DD/YYYY</option>
                <option>YYYY-MM-DD</option>
                <option>D MMM YYYY</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: "var(--muted-foreground)", display: "block", marginBottom: 6 }}>Time Format</label>
              <select value={timeFormat} onChange={e => setTimeFormat(e.target.value)} style={{ width: "100%", padding: "9px 12px", border: "1px solid var(--border)", borderRadius: 8, fontSize: 14, color: "var(--foreground)", background: "var(--background)" }}>
                <option value="24h">24 Hour (14:30)</option>
                <option value="12h">12 Hour (2:30 PM)</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: "var(--muted-foreground)", display: "block", marginBottom: 6 }}>Language</label>
              <select value={language} onChange={e => setLanguage(e.target.value)} style={{ width: "100%", padding: "9px 12px", border: "1px solid var(--border)", borderRadius: 8, fontSize: 14, color: "var(--foreground)", background: "var(--background)" }}>
                <option>English (UK)</option>
                <option>English (US)</option>
                <option>French</option>
                <option>German</option>
                <option>Spanish</option>
              </select>
            </div>
          </div>
        </div>

        <button style={{ display: "flex", alignItems: "center", gap: 6, background: "var(--primary)", color: "white", border: "none", borderRadius: 8, padding: "11px 24px", fontWeight: 600, fontSize: 14, cursor: "pointer", alignSelf: "flex-start" }}>
          <Save size={14} /> Save Appearance
        </button>
      </div>
    </div>
  )
}
