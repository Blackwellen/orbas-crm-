"use client"

import React, { useState } from "react"
import {
  Home, Users, Calculator, Package, FolderKanban, UserCircle,
  Headphones, MessageSquare, BarChart3, FileText, Shield, Heart,
  Zap, Settings, Wrench
} from "lucide-react"

const apps = [
  { id: "home",         name: "Home",          icon: Home,        desc: "Work queue, tasks and AI briefing",     enabled: true,  plan: "all" },
  { id: "crm",          name: "CRM",            icon: Users,       desc: "Contacts, deals, pipeline, campaigns",  enabled: true,  plan: "all" },
  { id: "accounting",   name: "Accounting",     icon: Calculator,  desc: "Invoices, ledger, tax, assets",         enabled: true,  plan: "all" },
  { id: "operations",   name: "Operations",     icon: Package,     desc: "Inventory, POs, warehouses, manufacturing", enabled: true,  plan: "growth" },
  { id: "projects",     name: "Projects",       icon: FolderKanban,desc: "PSA, timesheets, Gantt, resource plan", enabled: true,  plan: "growth" },
  { id: "people",       name: "People",         icon: UserCircle,  desc: "HR, payroll, ATS, performance",         enabled: true,  plan: "growth" },
  { id: "service",      name: "Service",        icon: Headphones,  desc: "Tickets, SLA, knowledge base",          enabled: true,  plan: "all" },
  { id: "connect",      name: "Connect",        icon: MessageSquare,desc: "Unified inbox, live chat, channels",   enabled: true,  plan: "growth" },
  { id: "analytics",    name: "Analytics",      icon: BarChart3,   desc: "Dashboards, BI, custom reports",        enabled: true,  plan: "growth" },
  { id: "documents",    name: "Documents",      icon: FileText,    desc: "DMS, templates, e-sign",                enabled: true,  plan: "all" },
  { id: "compliance",   name: "Compliance",     icon: Shield,      desc: "Risk, controls, policies, audits",      enabled: false, plan: "enterprise" },
  { id: "charity",      name: "Charity",        icon: Heart,       desc: "Donors, gift aid, grants, campaigns",   enabled: false, plan: "enterprise" },
  { id: "automations",  name: "Automations",    icon: Zap,         desc: "Workflow builder, triggers, run history", enabled: true,  plan: "growth" },
  { id: "field-service",name: "Field Service",  icon: Wrench,      desc: "Work orders, dispatch, technicians",    enabled: false, plan: "enterprise" },
]

const planColors: Record<string, { bg: string; color: string }> = {
  all:        { bg: "#dcfce7", color: "#16a34a" },
  growth:     { bg: "#dbeafe", color: "#2563eb" },
  enterprise: { bg: "#f3e8ff", color: "#9333ea" },
}

export default function AppsPage() {
  const [appStates, setAppStates] = useState(
    Object.fromEntries(apps.map(a => [a.id, a.enabled]))
  )

  const toggle = (id: string) => setAppStates(prev => ({ ...prev, [id]: !prev[id] }))

  return (
    <div className="p-6 space-y-5 max-w-[900px] mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-[var(--foreground)]">Apps & Features</h1>
        <p className="text-sm text-[var(--muted-foreground)] mt-0.5">Enable or disable modules for your workspace. Changes apply immediately.</p>
      </div>

      <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] overflow-hidden divide-y divide-[var(--border)]">
        {apps.map(app => {
          const planStyle = planColors[app.plan]
          const isEnabled = appStates[app.id]
          return (
            <div key={app.id} className="flex items-center gap-4 px-5 py-4">
              <div className="h-10 w-10 rounded-xl flex items-center justify-center bg-[var(--primary)]/10 shrink-0">
                <app.icon className="h-5 w-5 text-[var(--primary)]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-[var(--foreground)]">{app.name}</p>
                  <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full" style={{ background: planStyle.bg, color: planStyle.color }}>
                    {app.plan === "all" ? "All Plans" : app.plan.charAt(0).toUpperCase() + app.plan.slice(1)}
                  </span>
                </div>
                <p className="text-xs text-[var(--muted-foreground)] mt-0.5 truncate">{app.desc}</p>
              </div>
              <button
                onClick={() => toggle(app.id)}
                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus-visible:outline-none ${
                  isEnabled ? "bg-[var(--primary)]" : "bg-[var(--border)]"
                }`}
                role="switch"
                aria-checked={isEnabled}
              >
                <span
                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                    isEnabled ? "translate-x-4" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          )
        })}
      </div>

      <div className="rounded-xl border border-[var(--border)] p-4 bg-[var(--secondary)]">
        <p className="text-xs text-[var(--muted-foreground)]">
          <strong className="text-[var(--foreground)]">Note:</strong> Apps marked "Enterprise" require an upgrade to unlock. Contact your account manager or visit Billing to change your plan.
        </p>
      </div>

      {/* Feature Flags */}
      <div className="rounded-xl border border-[var(--border)] bg-[var(--background)]">
        <div className="p-5 pb-3 border-b border-[var(--border)]">
          <h2 className="text-sm font-semibold text-[var(--foreground)]">Feature Flags</h2>
          <p className="text-xs text-[var(--muted-foreground)] mt-0.5">Enable experimental or beta features for this workspace</p>
        </div>
        <div className="divide-y divide-[var(--border)]">
          {[
            { id: "ai_insights", label: "AI Insights & Recommendations", desc: "AI-powered suggestions across CRM, service and analytics", enabled: true },
            { id: "advanced_reporting", label: "Advanced Report Builder", desc: "Custom SQL queries and advanced chart types", enabled: false },
            { id: "multi_currency", label: "Multi-Currency Support", desc: "Invoice and report in multiple currencies with live rates", enabled: false },
            { id: "api_v2", label: "API v2 (Beta)", desc: "New REST API with GraphQL support — breaking changes may occur", enabled: false },
          ].map(flag => (
            <div key={flag.id} className="flex items-center gap-4 px-5 py-4">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[var(--foreground)]">{flag.label}</p>
                <p className="text-xs text-[var(--muted-foreground)] mt-0.5">{flag.desc}</p>
              </div>
              <button
                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors ${
                  flag.enabled ? "bg-[var(--primary)]" : "bg-[var(--border)]"
                }`}
                role="switch"
                aria-checked={flag.enabled}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-lg transition ${flag.enabled ? "translate-x-4" : "translate-x-0"}`} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
