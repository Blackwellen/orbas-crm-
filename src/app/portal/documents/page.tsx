"use client"

import { useState } from "react"
import { Download, FileText, FileImage, File, Search } from "lucide-react"

const documents = [
  { id: "1", name: "Service Agreement 2026.pdf",          type: "PDF",  size: "248 KB",  sharedBy: "Sarah Johnson", date: "1 Jun 2026",  category: "Contract" },
  { id: "2", name: "Project Scope - Website Redesign.pdf", type: "PDF",  size: "512 KB",  sharedBy: "James Carter",  date: "28 May 2026", category: "Project" },
  { id: "3", name: "Invoice Statement May 2026.pdf",       type: "PDF",  size: "94 KB",   sharedBy: "Finance Team",  date: "31 May 2026", category: "Finance" },
  { id: "4", name: "Brand Guidelines v3.pdf",              type: "PDF",  size: "3.2 MB",  sharedBy: "Rachel Moore",  date: "20 May 2026", category: "Design" },
  { id: "5", name: "API Integration Spec.pdf",             type: "PDF",  size: "670 KB",  sharedBy: "James Carter",  date: "15 May 2026", category: "Technical" },
  { id: "6", name: "Orbas Onboarding Checklist.pdf",       type: "PDF",  size: "128 KB",  sharedBy: "Sarah Johnson", date: "10 May 2026", category: "Support" },
  { id: "7", name: "Logo Assets Pack.zip",                 type: "ZIP",  size: "8.4 MB",  sharedBy: "Rachel Moore",  date: "5 May 2026",  category: "Design" },
  { id: "8", name: "NDA - Acme Corp.pdf",                  type: "PDF",  size: "182 KB",  sharedBy: "Legal Team",    date: "1 Jan 2026",  category: "Contract" },
]

const typeIcons: Record<string, React.ElementType> = {
  PDF: FileText,
  ZIP: File,
  PNG: FileImage,
  JPG: FileImage,
}

const categoryColors: Record<string, { color: string; bg: string }> = {
  Contract:  { color: "#7c3aed", bg: "#f5f3ff" },
  Project:   { color: "#2563eb", bg: "#eff6ff" },
  Finance:   { color: "#16a34a", bg: "#f0fdf4" },
  Design:    { color: "#d97706", bg: "#fffbeb" },
  Technical: { color: "#0891b2", bg: "#ecfeff" },
  Support:   { color: "#64748b", bg: "#f1f5f9" },
}

export default function PortalDocumentsPage() {
  const [search, setSearch] = useState("")

  const filtered = documents.filter(d =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.category.toLowerCase().includes(search.toLowerCase()) ||
    d.sharedBy.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: "var(--foreground)", margin: "0 0 4px 0" }}>Documents</h1>
          <p style={{ fontSize: 14, color: "var(--muted-foreground)", margin: 0 }}>Files and documents shared with your account</p>
        </div>
        <div style={{ position: "relative" }}>
          <Search size={15} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "var(--muted-foreground)" }} />
          <input
            type="text"
            placeholder="Search documents..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              padding: "9px 12px 9px 32px",
              borderRadius: 8,
              border: "1px solid var(--border)",
              fontSize: 13,
              width: 240,
              background: "white",
              color: "var(--foreground)",
              outline: "none",
            }}
          />
        </div>
      </div>

      {/* Desktop table */}
      <div style={{ background: "white", border: "1px solid var(--border)", borderRadius: 10, overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ background: "var(--muted)" }}>
                {["Name", "Category", "Shared By", "Date", "Size", "Download"].map(h => (
                  <th key={h} style={{ padding: "10px 20px", textAlign: "left", fontWeight: 600, fontSize: 11, color: "var(--muted-foreground)", textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(doc => {
                const Icon = typeIcons[doc.type] ?? File
                const catCfg = categoryColors[doc.category] ?? { color: "#64748b", bg: "#f1f5f9" }
                return (
                  <tr key={doc.id} style={{ borderTop: "1px solid var(--border)" }}>
                    <td style={{ padding: "12px 20px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{
                          width: 36, height: 36, borderRadius: 8,
                          background: "#fef2f2",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          flexShrink: 0,
                        }}>
                          <Icon size={16} color="#ef4444" />
                        </div>
                        <span style={{ fontWeight: 600, color: "var(--foreground)" }}>{doc.name}</span>
                      </div>
                    </td>
                    <td style={{ padding: "12px 20px" }}>
                      <span style={{
                        display: "inline-flex",
                        padding: "2px 9px",
                        borderRadius: 20,
                        fontSize: 12,
                        fontWeight: 600,
                        color: catCfg.color,
                        background: catCfg.bg,
                      }}>
                        {doc.category}
                      </span>
                    </td>
                    <td style={{ padding: "12px 20px", color: "var(--muted-foreground)" }}>{doc.sharedBy}</td>
                    <td style={{ padding: "12px 20px", color: "var(--muted-foreground)" }}>{doc.date}</td>
                    <td style={{ padding: "12px 20px", color: "var(--muted-foreground)" }}>{doc.size}</td>
                    <td style={{ padding: "12px 20px" }}>
                      <button style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        padding: "6px 12px",
                        borderRadius: 6,
                        border: "1px solid var(--border)",
                        background: "white",
                        color: "var(--foreground)",
                        fontWeight: 600,
                        fontSize: 12,
                        cursor: "pointer",
                      }}>
                        <Download size={13} />
                        Download
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div style={{ padding: 40, textAlign: "center", color: "var(--muted-foreground)", fontSize: 14 }}>
            No documents found matching your search.
          </div>
        )}
      </div>

      <p style={{ fontSize: 12, color: "var(--muted-foreground)", margin: 0 }}>
        {filtered.length} document{filtered.length !== 1 ? "s" : ""} shown
        {search ? ` for "${search}"` : ""}
      </p>
    </div>
  )
}
