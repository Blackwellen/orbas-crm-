"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard, Building2, Users, CreditCard,
  Flag, Activity, ScrollText, Menu, X, LogOut, Shield
} from "lucide-react"

const navItems = [
  { label: "Overview",      href: "/platform-admin",               icon: LayoutDashboard },
  { label: "Tenants",       href: "/platform-admin/tenants",       icon: Building2 },
  { label: "Users",         href: "/platform-admin/users",         icon: Users },
  { label: "Subscriptions", href: "/platform-admin/subscriptions", icon: CreditCard },
  { label: "Feature Flags", href: "/platform-admin/flags",         icon: Flag },
  { label: "System Health", href: "/platform-admin/health",        icon: Activity },
  { label: "Logs",          href: "/platform-admin/logs",          icon: ScrollText },
]

export default function PlatformAdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--background)" }}>
      {/* Sidebar */}
      <aside style={{
        width: 240,
        flexShrink: 0,
        background: "#070c18",
        display: "flex",
        flexDirection: "column",
        position: "fixed",
        top: 0,
        left: 0,
        bottom: 0,
        zIndex: 50,
      }}
        className="hidden md:flex"
      >
        {/* Logo */}
        <div style={{
          padding: "20px 20px 16px",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}>
          <Link href="/platform-admin">
            <Image
              src="/orbas crm logo.png"
              alt="Orbas CRM"
              width={110}
              height={28}
              className="h-7 w-auto object-contain brightness-0 invert"
            />
          </Link>
          <div style={{
            marginTop: 8,
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "4px 8px",
            background: "rgba(239,68,68,0.15)",
            borderRadius: 6,
            border: "1px solid rgba(239,68,68,0.2)",
          }}>
            <Shield size={12} color="#f87171" />
            <span style={{ fontSize: 10, fontWeight: 700, color: "#f87171", letterSpacing: "0.08em" }}>PLATFORM ADMIN</span>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: "12px 10px", display: "flex", flexDirection: "column", gap: 2 }}>
          {navItems.map(item => {
            const Icon = item.icon
            const active = pathname === item.href || (item.href !== "/platform-admin" && pathname.startsWith(item.href))
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "9px 12px",
                  borderRadius: 8,
                  textDecoration: "none",
                  fontSize: 13,
                  fontWeight: active ? 600 : 400,
                  color: active ? "#ffffff" : "rgba(255,255,255,0.55)",
                  background: active ? "rgba(255,255,255,0.08)" : "transparent",
                  transition: "all 0.15s",
                }}
              >
                <Icon size={15} />
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* Bottom */}
        <div style={{ padding: "12px 10px 16px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <Link
            href="/login"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "9px 12px",
              borderRadius: 8,
              textDecoration: "none",
              fontSize: 13,
              color: "rgba(255,255,255,0.4)",
            }}
          >
            <LogOut size={15} />
            Exit Admin
          </Link>
        </div>
      </aside>

      {/* Main */}
      <div style={{ flex: 1, marginLeft: 240, minWidth: 0 }} className="md:ml-60 ml-0">
        {/* Mobile top bar */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 16px",
          background: "#070c18",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }} className="md:hidden flex">
          <span style={{ fontSize: 13, fontWeight: 700, color: "white" }}>Platform Admin</span>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{ background: "none", border: "none", cursor: "pointer", color: "white" }}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Page content */}
        <main style={{ padding: 0 }}>
          {children}
        </main>
      </div>
    </div>
  )
}
