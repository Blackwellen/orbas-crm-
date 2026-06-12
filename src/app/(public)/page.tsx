import Link from "next/link"
import Image from "next/image"
import {
  Users, DollarSign, Settings, FolderKanban, Wrench, UserCheck,
  HeadphonesIcon, MessageSquare, BarChart3, FileText, ShieldCheck, Heart,
  Zap, Brain, Lock, Globe, CheckCircle2, ArrowRight, Star
} from "lucide-react"

const apps = [
  { icon: Users, name: "CRM", desc: "Contacts, deals, pipelines and sales automation", color: "bg-blue-50 text-blue-600" },
  { icon: DollarSign, name: "Accounting", desc: "Invoices, expenses, payroll and financial reports", color: "bg-emerald-50 text-emerald-600" },
  { icon: Settings, name: "Operations", desc: "Workflows, inventory, purchasing and logistics", color: "bg-orange-50 text-orange-600" },
  { icon: FolderKanban, name: "Projects", desc: "Tasks, Gantt, time tracking and resource planning", color: "bg-violet-50 text-violet-600" },
  { icon: Wrench, name: "Field Service", desc: "Job scheduling, dispatch, mobile and assets", color: "bg-amber-50 text-amber-600" },
  { icon: UserCheck, name: "People", desc: "HR, onboarding, leave, payslips and org chart", color: "bg-pink-50 text-pink-600" },
  { icon: HeadphonesIcon, name: "Service", desc: "Help desk, tickets, SLA management and CSAT", color: "bg-cyan-50 text-cyan-600" },
  { icon: MessageSquare, name: "Connect", desc: "Email, SMS, WhatsApp and client messaging hub", color: "bg-indigo-50 text-indigo-600" },
  { icon: BarChart3, name: "Analytics", desc: "Dashboards, reports, KPIs and data insights", color: "bg-teal-50 text-teal-600" },
  { icon: FileText, name: "Documents", desc: "Storage, e-sign, contracts and version control", color: "bg-slate-100 text-slate-600" },
  { icon: ShieldCheck, name: "Compliance", desc: "Policies, audits, GDPR and risk management", color: "bg-red-50 text-red-600" },
  { icon: Heart, name: "Charity", desc: "Donors, grants, volunteers and impact reporting", color: "bg-rose-50 text-rose-600" },
]

const features = [
  {
    title: "Unified Data Model",
    desc: "Every app shares one data layer. No integrations to maintain, no data silos, no duplicate contacts. One source of truth for your entire organisation.",
    icon: Globe,
  },
  {
    title: "AI Copilot Built In",
    desc: "Summarise records, draft emails, generate reports, forecast pipelines and automate decisions — all from a single natural-language interface.",
    icon: Brain,
  },
  {
    title: "Enterprise-Grade Security",
    desc: "Row-level security, RBAC, MFA, SSO, GDPR compliance and full audit trails. Built for enterprise from day one, not retrofitted.",
    icon: Lock,
  },
]

const pricingTiers = [
  {
    name: "Starter",
    price: "£24.99",
    per: "user / month",
    desc: "Perfect for small teams getting started.",
    features: ["Up to 5 users", "CRM + 2 apps", "5 GB storage", "Email support", "Basic automations"],
    cta: "Start Free Trial",
    href: "/register",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "£44.99",
    per: "user / month",
    desc: "For growing teams who need more power.",
    features: ["5-user minimum", "CRM + 5 apps", "50 GB storage", "Priority support", "Advanced automations", "AI Copilot included"],
    cta: "Start Free Trial",
    href: "/register",
    highlighted: true,
  },
  {
    name: "Business",
    price: "£74.99",
    per: "user / month",
    desc: "Full platform for established businesses.",
    features: ["Unlimited users", "All 12 apps", "500 GB storage", "Dedicated CSM", "Custom workflows", "SSO / SAML", "API access"],
    cta: "Start Free Trial",
    href: "/register",
    highlighted: false,
  },
]

const trustBadges = [
  { label: "SSL Encrypted", icon: Lock },
  { label: "GDPR Compliant", icon: ShieldCheck },
  { label: "99.9% Uptime SLA", icon: CheckCircle2 },
  { label: "SOC 2 (in progress)", icon: Star },
]

export default function HomePage() {
  return (
    <div className="overflow-x-hidden">
      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white">
        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
          }}
        />
        {/* Gradient mesh blobs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl" style={{ background: "radial-gradient(circle, #1a56db, transparent)" }} />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl" style={{ background: "radial-gradient(circle, #06b6d4, transparent)" }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 lg:py-36">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/20 bg-white/10 text-xs font-medium text-slate-300 mb-8 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Now with AI Copilot across all 12 apps
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6">
              The Enterprise Operating Suite{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(135deg, #60a5fa, #22d3ee)" }}
              >
                Built for Modern Teams
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed mb-10 max-w-2xl mx-auto">
              CRM, Finance, Operations, People and more — unified in one powerful platform. No integrations. No data silos. Just clarity.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/register"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base font-semibold text-white rounded-xl shadow-lg hover:opacity-90 transition-all"
                style={{ background: "linear-gradient(135deg, #1a56db, #06b6d4)" }}
              >
                Start Free Trial
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/book-demo"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base font-semibold text-white border border-white/30 rounded-xl hover:bg-white/10 transition-colors backdrop-blur-sm"
              >
                Book a Demo
              </Link>
            </div>

            <p className="mt-6 text-sm text-slate-400">
              14-day free trial &nbsp;&middot;&nbsp; No credit card required &nbsp;&middot;&nbsp; Cancel anytime
            </p>
          </div>
        </div>
      </section>

      {/* ── APP SUITE ── */}
      <section className="py-20 lg:py-28 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              12 Business Apps. One Platform.
            </h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              Enable only the apps you need. Each app is deeply integrated — data, permissions and workflows shared automatically.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {apps.map((app) => {
              const Icon = app.icon
              return (
                <div
                  key={app.name}
                  className="bg-white rounded-xl p-5 border border-slate-200 hover:border-[var(--primary)] hover:shadow-md transition-all group cursor-pointer"
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${app.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-slate-900 text-sm mb-1 group-hover:text-[var(--primary)] transition-colors">
                    {app.name}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{app.desc}</p>
                </div>
              )
            })}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/features"
              className="inline-flex items-center gap-2 text-sm font-medium text-[var(--primary)] hover:underline"
            >
              Explore all features <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Enterprise depth. Startup speed.
            </h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              Purpose-built for growing businesses that need real power without the enterprise complexity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((f) => {
              const Icon = f.icon
              return (
                <div key={f.title} className="p-8 rounded-2xl bg-slate-50 border border-slate-200 hover:border-[var(--primary)] hover:shadow-sm transition-all">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 text-white" style={{ background: "linear-gradient(135deg, #1a56db, #06b6d4)" }}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3">{f.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── AI COPILOT CALLOUT ── */}
      <section className="py-20 lg:py-28 text-white relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0f172a, #1a56db)" }}>
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, #06b6d4 0%, transparent 60%), radial-gradient(circle at 80% 50%, #1a56db 0%, transparent 60%)`
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/20 bg-white/10 text-xs font-medium mb-8">
            <Brain className="w-3.5 h-3.5" />
            AI Copilot
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 max-w-3xl mx-auto leading-tight">
            Your AI-powered business co-pilot, built into every workflow
          </h2>
          <p className="text-lg text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed">
            Ask questions, generate reports, draft emails, summarise deals and automate decisions — all without leaving Orbas. Powered by enterprise-grade AI with full audit trails.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base font-semibold bg-white text-[var(--primary)] rounded-xl hover:bg-slate-100 transition-colors shadow-lg"
            >
              Try AI Copilot Free
            </Link>
            <Link
              href="/features"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base font-semibold text-white border border-white/30 rounded-xl hover:bg-white/10 transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* ── PRICING PREVIEW ── */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Simple, transparent pricing</h2>
            <p className="text-lg text-slate-500 max-w-xl mx-auto">
              No hidden fees. Pay only for what you use. Scale up as you grow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingTiers.map((tier) => (
              <div
                key={tier.name}
                className={`rounded-2xl border p-8 flex flex-col relative ${
                  tier.highlighted
                    ? "border-[var(--primary)] shadow-xl shadow-blue-100"
                    : "border-slate-200"
                }`}
              >
                {tier.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1 rounded-full text-xs font-semibold text-white" style={{ background: "linear-gradient(135deg, #1a56db, #06b6d4)" }}>
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-1">{tier.name}</h3>
                  <p className="text-sm text-slate-500 mb-4">{tier.desc}</p>
                  <div className="flex items-end gap-1">
                    <span className="text-4xl font-bold text-slate-900">{tier.price}</span>
                    <span className="text-sm text-slate-500 mb-1">{tier.per}</span>
                  </div>
                </div>

                <ul className="space-y-2.5 mb-8 flex-1">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-slate-600">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  href={tier.href}
                  className={`w-full text-center py-3 rounded-xl text-sm font-semibold transition-all ${
                    tier.highlighted
                      ? "text-white hover:opacity-90"
                      : "text-slate-900 border border-slate-200 hover:border-[var(--primary)] hover:text-[var(--primary)]"
                  }`}
                  style={tier.highlighted ? { background: "linear-gradient(135deg, #1a56db, #06b6d4)" } : {}}
                >
                  {tier.cta}
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/pricing" className="inline-flex items-center gap-2 text-sm font-medium text-[var(--primary)] hover:underline">
              View full pricing and add-ons <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── TRUST SECTION ── */}
      <section className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Enterprise-grade security, from day one</h2>
            <p className="text-slate-500 text-sm">Your data is protected with the highest industry standards.</p>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {trustBadges.map((badge) => {
              const Icon = badge.icon
              return (
                <div key={badge.label} className="flex items-center gap-3 bg-white px-6 py-4 rounded-xl border border-slate-200 shadow-sm">
                  <Icon className="w-5 h-5 text-[var(--primary)]" />
                  <span className="text-sm font-medium text-slate-700">{badge.label}</span>
                </div>
              )
            })}
          </div>

          <div className="text-center mt-8">
            <Link href="/security" className="text-sm font-medium text-[var(--primary)] hover:underline inline-flex items-center gap-1">
              View our security documentation <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Ready to unify your business operations?
          </h2>
          <p className="text-lg text-slate-500 mb-10">
            Join hundreds of teams using Orbas to manage everything in one place. Start your free trial today — no credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white rounded-xl shadow-lg hover:opacity-90 transition-all"
              style={{ background: "linear-gradient(135deg, #1a56db, #06b6d4)" }}
            >
              Start Free Trial <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/book-demo"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-slate-700 border border-slate-200 rounded-xl hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all"
            >
              Book a Demo
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
