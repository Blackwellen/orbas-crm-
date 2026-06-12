"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard, FileText, FolderOpen, Headphones,
  User, Briefcase, Menu, X, LogOut, ChevronRight
} from "lucide-react"

const portalNav = [
  { label: "Dashboard",  href: "/portal",           icon: LayoutDashboard },
  { label: "Invoices",   href: "/portal/invoices",  icon: FileText },
  { label: "Projects",   href: "/portal/projects",  icon: Briefcase },
  { label: "Documents",  href: "/portal/documents", icon: FolderOpen },
  { label: "Support",    href: "/portal/support",   icon: Headphones },
  { label: "Profile",    href: "/portal/profile",   icon: User },
]

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="min-h-screen" style={{ background: "var(--muted)" }}>
      {/* Top nav */}
      <header style={{
        background: "white",
        borderBottom: "1px solid var(--border)",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 60 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <button
                className="md:hidden"
                onClick={() => setMobileOpen(!mobileOpen)}
                style={{ padding: 6, borderRadius: 6, border: "1px solid var(--border)", background: "none", cursor: "pointer" }}
              >
                {mobileOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
              <Link href="/portal">
                <Image
                  src="/orbas crm logo.png"
                  alt="Orbas CRM"
                  width={120}
                  height={32}
                  className="h-8 w-auto object-contain"
                />
              </Link>
              <span style={{
                background: "var(--primary)",
                color: "white",
                fontSize: 11,
                fontWeight: 600,
                padding: "2px 8px",
                borderRadius: 20,
                letterSpacing: "0.05em",
              }}>
                CLIENT PORTAL
              </span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ textAlign: "right" }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: "var(--foreground)", margin: 0 }}>Acme Corp</p>
                <p style={{ fontSize: 11, color: "var(--muted-foreground)", margin: 0 }}>Client Account</p>
              </div>
              <button style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "6px 12px",
                borderRadius: 6,
                border: "1px solid var(--border)",
                background: "none",
                cursor: "pointer",
                fontSize: 13,
                color: "var(--muted-foreground)",
              }}>
                <LogOut size={14} />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div style={{ display: "flex", maxWidth: 1280, margin: "0 auto", padding: "0 16px", gap: 24 }}>
        {/* Sidebar */}
        <aside style={{
          width: 220,
          flexShrink: 0,
          paddingTop: 24,
          display: mobileOpen ? "block" : undefined,
        }} className="hidden md:block">
          <nav style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {portalNav.map(item => {
              const Icon = item.icon
              const active = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "9px 12px",
                    borderRadius: 8,
                    textDecoration: "none",
                    fontSize: 14,
                    fontWeight: active ? 600 : 400,
                    color: active ? "var(--primary)" : "var(--foreground)",
                    background: active ? "rgba(26,86,219,0.08)" : "transparent",
                    transition: "background 0.15s",
                  }}
                >
                  <Icon size={16} />
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </aside>

        {/* Mobile nav overlay */}
        {mobileOpen && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 40,
              background: "rgba(0,0,0,0.4)",
            }}
            onClick={() => setMobileOpen(false)}
          />
        )}
        {mobileOpen && (
          <div style={{
            position: "fixed",
            top: 60,
            left: 0,
            bottom: 0,
            width: 240,
            zIndex: 50,
            background: "white",
            borderRight: "1px solid var(--border)",
            padding: 16,
          }}>
            <nav style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {portalNav.map(item => {
                const Icon = item.icon
                const active = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      padding: "10px 12px",
                      borderRadius: 8,
                      textDecoration: "none",
                      fontSize: 14,
                      fontWeight: active ? 600 : 400,
                      color: active ? "var(--primary)" : "var(--foreground)",
                      background: active ? "rgba(26,86,219,0.08)" : "transparent",
                    }}
                  >
                    <Icon size={16} />
                    {item.label}
                  </Link>
                )
              })}
            </nav>
          </div>
        )}

        {/* Main content */}
        <main style={{ flex: 1, minWidth: 0, paddingTop: 24, paddingBottom: 40 }}>
          {children}
        </main>
      </div>
    </div>
  )
}
