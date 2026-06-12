"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Users, DollarSign, Settings, FolderKanban, UserCheck, HeadphonesIcon,
  BarChart3, CheckCircle2, ArrowRight, Layers
} from "lucide-react"

const sections = [
  {
    id: "crm",
    label: "CRM",
    icon: Users,
    color: "bg-blue-50 text-blue-600",
    headline: "Close more deals, faster",
    desc: "A complete CRM built for modern sales teams. Manage leads, deals and contacts with AI-powered insights.",
    features: [
      "Lead capture and scoring",
      "Visual deal pipeline (Kanban + list)",
      "Contact and account management",
      "Email tracking and sequences",
      "Sales forecasting",
      "Activity logging and reminders",
      "Custom fields and views",
      "Territory and quota management",
    ],
  },
  {
    id: "accounting",
    label: "Accounting & Finance",
    icon: DollarSign,
    color: "bg-emerald-50 text-emerald-600",
    headline: "Full-stack accounting for modern businesses",
    desc: "Invoicing, bills, expenses, bank reconciliation, VAT, payroll and financial reporting — all in one place.",
    features: [
      "Sales invoices and credit notes",
      "Purchase bills and approvals",
      "Expense reports and mileage claims",
      "Bank reconciliation workbench",
      "Chart of accounts and general ledger",
      "Journal entries and period close",
      "VAT returns (MTD compliant)",
      "Fixed asset register and depreciation",
      "Budgets and cost centres",
      "P&L, Balance Sheet, Cash Flow reports",
    ],
  },
  {
    id: "operations",
    label: "Operations",
    icon: Settings,
    color: "bg-orange-50 text-orange-600",
    headline: "Run your back-office without the chaos",
    desc: "Purchase orders, inventory, suppliers and logistics — streamlined with approvals and automation.",
    features: [
      "Purchase order management",
      "Supplier and vendor portal",
      "Inventory tracking",
      "Stock replenishment rules",
      "Warehouse management",
      "Delivery and shipment tracking",
      "Approval workflows",
      "Multi-location support",
    ],
  },
  {
    id: "projects",
    label: "Projects",
    icon: FolderKanban,
    color: "bg-violet-50 text-violet-600",
    headline: "Deliver projects on time and on budget",
    desc: "Gantt charts, task boards, time tracking and resource planning in a single unified view.",
    features: [
      "Kanban and Gantt timeline views",
      "Task dependencies and milestones",
      "Time tracking and timesheets",
      "Resource allocation and utilisation",
      "Project budgets and billing",
      "Client collaboration portal",
      "Document attachments",
      "Project reporting and dashboards",
    ],
  },
  {
    id: "people",
    label: "People & HR",
    icon: UserCheck,
    color: "bg-pink-50 text-pink-600",
    headline: "Your people deserve better HR software",
    desc: "Onboarding, leave management, org charts, payslips and performance reviews — built for growing teams.",
    features: [
      "Employee profiles and org chart",
      "Onboarding checklists and workflows",
      "Leave and absence management",
      "Payslip generation",
      "Performance reviews",
      "Training and certifications",
      "Recruitment pipeline",
      "Policy document library",
    ],
  },
  {
    id: "service",
    label: "Customer Service",
    icon: HeadphonesIcon,
    color: "bg-cyan-50 text-cyan-600",
    headline: "Delight customers with faster support",
    desc: "Ticketing, SLA management, knowledge base and CSAT — connected directly to your CRM data.",
    features: [
      "Omnichannel ticket inbox",
      "SLA policies and escalation",
      "Canned responses and macros",
      "Knowledge base and self-service",
      "CSAT and NPS surveys",
      "Customer portal",
      "Automated ticket routing",
      "Team performance dashboards",
    ],
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: BarChart3,
    color: "bg-teal-50 text-teal-600",
    headline: "Insights across your entire business",
    desc: "Dashboards, custom reports, KPI tracking and data visualisations powered by your live platform data.",
    features: [
      "Cross-app dashboards",
      "Drag-and-drop report builder",
      "50+ pre-built report templates",
      "KPI cards and goal tracking",
      "Scheduled report delivery",
      "Data export (CSV, Excel, PDF)",
      "Embedded charts in records",
      "AI-powered insight summaries",
    ],
  },
]

const platforms = [
  { name: "AI Copilot", desc: "Natural language queries, automated summaries and decision support across every app.", color: "bg-indigo-50 text-indigo-600" },
  { name: "Automations", desc: "Trigger-condition-action workflows, multi-step sequences and approval flows.", color: "bg-amber-50 text-amber-600" },
  { name: "Integrations", desc: "50+ native integrations including Stripe, Xero, Slack, HubSpot and Zapier.", color: "bg-rose-50 text-rose-600" },
  { name: "Mobile App", desc: "Full-featured iOS and Android apps with offline mode and push notifications.", color: "bg-sky-50 text-sky-600" },
]

export default function FeaturesPage() {
  const [active, setActive] = useState("crm")
  const section = sections.find(s => s.id === active)!

  return (
    <div className="bg-white">
      {/* Header */}
      <section className="py-20 bg-gradient-to-br from-slate-950 to-slate-800 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/20 bg-white/10 text-xs font-medium mb-6">
            <Layers className="w-3.5 h-3.5" />
            12 Apps — One Platform
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Everything your business needs</h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Orbas brings CRM, Finance, Operations, People, Service and Analytics into one unified platform. Enable exactly the apps you need — data flows automatically between them.
          </p>
          <div className="flex gap-4 justify-center mt-8">
            <Link href="/register" className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white rounded-xl hover:opacity-90 transition-all" style={{ background: "linear-gradient(135deg, #1a56db, #06b6d4)" }}>
              Start Free Trial <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/book-demo" className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white border border-white/30 rounded-xl hover:bg-white/10 transition-colors">
              Book a Demo
            </Link>
          </div>
        </div>
      </section>

      {/* App Feature Sections */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">Explore each app</h2>
            <p className="text-slate-500">Click any app to see what's included.</p>
          </div>

          {/* Tab row */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {sections.map(s => {
              const Icon = s.icon
              return (
                <button
                  key={s.id}
                  onClick={() => setActive(s.id)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all border ${
                    active === s.id
                      ? "bg-[var(--primary)] text-white border-[var(--primary)] shadow-md"
                      : "bg-white text-slate-600 border-slate-200 hover:border-[var(--primary)] hover:text-[var(--primary)]"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {s.label}
                </button>
              )
            })}
          </div>

          {/* Feature panel */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: feature list */}
            <div>
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-6 ${section.color}`}>
                <section.icon className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">{section.headline}</h3>
              <p className="text-slate-500 mb-6 leading-relaxed">{section.desc}</p>
              <ul className="space-y-3">
                {section.features.map(f => (
                  <li key={f} className="flex items-start gap-3 text-sm text-slate-700">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Link href="/register" className="inline-flex items-center gap-2 text-sm font-medium text-[var(--primary)] hover:underline">
                  Start using {section.label} free <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right: mock screenshot placeholder */}
            <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-200" style={{ background: "linear-gradient(135deg, #0f172a, #1a56db)" }}>
              <div className="p-4 border-b border-white/10 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
                <span className="ml-4 text-xs text-white/50">Orbas — {section.label}</span>
              </div>
              <div className="p-6 space-y-3">
                {[80, 60, 90, 50, 70, 40].map((w, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/10 flex-shrink-0" />
                    <div className="flex-1 space-y-1.5">
                      <div className="rounded-full bg-white/10 h-2.5" style={{ width: `${w}%` }} />
                      <div className="rounded-full bg-white/5 h-2" style={{ width: `${w * 0.6}%` }} />
                    </div>
                    <div className="w-16 h-5 rounded bg-white/10" />
                  </div>
                ))}
              </div>
              <div className="px-6 pb-6 grid grid-cols-3 gap-3">
                {["#1a56db40", "#06b6d440", "#22c55e40"].map((c, i) => (
                  <div key={i} className="rounded-xl p-3" style={{ background: c }}>
                    <div className="h-8 rounded bg-white/10 mb-2" />
                    <div className="h-2 rounded bg-white/10 w-3/4" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform features */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">Platform-wide capabilities</h2>
            <p className="text-slate-500 max-w-xl mx-auto">These features are available across every app, not just one.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {platforms.map(p => (
              <div key={p.name} className="bg-white rounded-xl border border-slate-200 p-6 hover:border-[var(--primary)] hover:shadow-sm transition-all">
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold mb-3 ${p.color}`}>{p.name}</div>
                <p className="text-sm text-slate-600 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-white text-center" style={{ background: "linear-gradient(135deg, #0f172a, #1a56db)" }}>
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to see it all in action?</h2>
          <p className="text-blue-100 mb-8 text-lg">Book a personalised demo and we'll show you how Orbas can work for your specific business.</p>
          <Link href="/book-demo" className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold bg-white text-[var(--primary)] rounded-xl hover:bg-slate-100 transition-colors shadow-lg">
            Book a Demo <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}
