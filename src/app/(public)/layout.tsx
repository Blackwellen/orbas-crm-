"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

const navLinks = [
  { label: "Features", href: "/features" },
  { label: "Apps", href: "/features#apps" },
  { label: "Pricing", href: "/pricing" },
  { label: "Integrations", href: "/features#integrations" },
  { label: "Security", href: "/security" },
  { label: "About", href: "/about" },
]

const footerColumns = [
  {
    heading: "Product",
    links: [
      { label: "Features", href: "/features" },
      { label: "Apps", href: "/features#apps" },
      { label: "Pricing", href: "/pricing" },
      { label: "Integrations", href: "/features#integrations" },
      { label: "Roadmap", href: "/roadmap" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Careers", href: "/careers" },
      { label: "Press", href: "/press" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", href: "/legal/privacy" },
      { label: "Terms of Service", href: "/legal/terms" },
      { label: "Cookie Policy", href: "/legal/cookies" },
      { label: "DPA", href: "/legal/dpa" },
      { label: "Subprocessors", href: "/legal/subprocessors" },
      { label: "Acceptable Use", href: "/legal/acceptable-use" },
      { label: "SLA", href: "/legal/sla" },
      { label: "AI Terms", href: "/legal/ai-terms" },
    ],
  },
]

function TopNav() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[var(--border)] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <Image
              src="/orbas crm logo.png"
              alt="Orbas CRM"
              width={140}
              height={36}
              className="h-9 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  pathname === link.href
                    ? "text-[var(--primary)] bg-blue-50"
                    : "text-slate-600 hover:text-[var(--primary)] hover:bg-slate-50"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/login"
              className="px-4 py-2 text-sm font-medium text-slate-700 border border-[var(--border)] rounded-lg hover:bg-slate-50 transition-colors"
            >
              Log in
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 text-sm font-semibold text-white rounded-lg transition-opacity hover:opacity-90"
              style={{ background: "linear-gradient(135deg, #1a56db, #06b6d4)" }}
            >
              Get Started
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-md text-slate-600 hover:bg-slate-100 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[var(--border)] bg-white">
          <nav className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-[var(--primary)] transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-[var(--border)] space-y-2">
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="block w-full text-center px-4 py-2 text-sm font-medium text-slate-700 border border-[var(--border)] rounded-lg hover:bg-slate-50 transition-colors"
              >
                Log in
              </Link>
              <Link
                href="/register"
                onClick={() => setMobileOpen(false)}
                className="block w-full text-center px-4 py-2 text-sm font-semibold text-white rounded-lg"
                style={{ background: "linear-gradient(135deg, #1a56db, #06b6d4)" }}
              >
                Get Started
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}

function Footer() {
  return (
    <footer className="bg-[var(--sidebar-bg)] text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/orbas crm logo.png"
                alt="Orbas CRM"
                width={130}
                height={34}
                className="h-8 w-auto object-contain brightness-0 invert"
              />
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              The enterprise operating suite built for modern teams. CRM, Finance, Operations and more — unified.
            </p>
            <div className="space-y-1 text-sm">
              <p className="text-slate-300 font-medium">Orbas Ltd</p>
              <p>support@orbas.io</p>
              <p>United Kingdom</p>
            </div>
          </div>

          {/* Link columns */}
          {footerColumns.map((col) => (
            <div key={col.heading}>
              <h3 className="text-white text-sm font-semibold mb-4 tracking-wide uppercase">{col.heading}</h3>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} Orbas Ltd. All rights reserved. Registered in England &amp; Wales.
          </p>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 text-xs text-slate-500">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse inline-block" />
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <TopNav />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
