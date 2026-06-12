"use client"

import { useState } from "react"
import Link from "next/link"
import { CheckCircle2, ArrowRight, ChevronDown, ChevronUp, Minus } from "lucide-react"

const tiers = [
  {
    name: "Starter",
    price: "£24.99",
    per: "user / month",
    minUsers: 1,
    desc: "For small teams that want to get moving fast.",
    apps: "CRM + 2 apps of your choice",
    features: [
      "Up to 5 users",
      "CRM included",
      "2 additional apps",
      "5 GB storage",
      "Email support",
      "Basic automation rules (5)",
      "Standard reporting",
      "Mobile app",
    ],
    notIncluded: ["AI Copilot", "SSO / SAML", "API access", "Custom workflows"],
    cta: "Start Free Trial",
    href: "/register",
    highlighted: false,
    badge: null,
  },
  {
    name: "Pro",
    price: "£44.99",
    per: "user / month",
    minUsers: 5,
    desc: "For growing teams that need real automation power.",
    apps: "CRM + 5 apps of your choice",
    features: [
      "5-user minimum",
      "CRM included",
      "5 additional apps",
      "50 GB storage",
      "Priority email & chat support",
      "Advanced automations (50)",
      "AI Copilot included",
      "Advanced reporting & dashboards",
      "E-signature (100 docs/mo)",
      "Client portal (read-only)",
      "Mobile app",
    ],
    notIncluded: ["SSO / SAML", "White label"],
    cta: "Start Free Trial",
    href: "/register",
    highlighted: true,
    badge: "Most Popular",
  },
  {
    name: "Business",
    price: "£74.99",
    per: "user / month",
    minUsers: 1,
    desc: "Full platform access for established businesses.",
    apps: "All 12 apps included",
    features: [
      "Unlimited users",
      "All 12 apps included",
      "500 GB storage",
      "Dedicated Customer Success Manager",
      "Unlimited automations",
      "AI Copilot included",
      "Custom workflows & approval flows",
      "SSO / SAML",
      "Full API access",
      "E-signature (500 docs/mo)",
      "Full client portal",
      "Payroll module",
      "Advanced analytics & BI",
    ],
    notIncluded: ["White label (add-on)"],
    cta: "Start Free Trial",
    href: "/register",
    highlighted: false,
    badge: null,
  },
  {
    name: "Enterprise",
    price: "Custom",
    per: "pricing",
    minUsers: null,
    desc: "Tailored contracts, dedicated infrastructure and SLAs for large organisations.",
    apps: "All apps + custom modules",
    features: [
      "Everything in Business",
      "Custom SLA & uptime guarantee",
      "Dedicated cloud infrastructure",
      "On-premise deployment option",
      "White label branding",
      "Custom AI model integration",
      "Enterprise security review",
      "Custom data residency",
      "Volume discounts",
      "24/7 phone support",
    ],
    notIncluded: [],
    cta: "Contact Sales",
    href: "/book-demo",
    highlighted: false,
    badge: null,
  },
]

const addons = [
  { name: "Extra App", price: "£3.99", unit: "app / user / month", desc: "Add any additional app module to your plan." },
  { name: "AI Credits Top-up", price: "£9.99", unit: "per 10k credits", desc: "Extend AI Copilot usage beyond your plan allowance." },
  { name: "Automation Pack", price: "£14.99", unit: "per workspace / month", desc: "+100 additional automation rule slots." },
  { name: "E-Sign Pro", price: "£19.99", unit: "per workspace / month", desc: "Unlimited e-signature documents with templates." },
  { name: "Client Portal Pro", price: "£24.99", unit: "per workspace / month", desc: "Full client portal with custom branding and forms." },
  { name: "Payroll Module", price: "£4.99", unit: "employee / month", desc: "Integrated payroll, pension and payslip generation." },
  { name: "SMS / WhatsApp", price: "£0.03", unit: "per message", desc: "Send SMS and WhatsApp messages from Connect." },
  { name: "API & Webhooks", price: "£29.99", unit: "per workspace / month", desc: "Full REST API, webhooks and Zapier integration." },
  { name: "White Label", price: "£99.99", unit: "per workspace / month", desc: "Custom domain, logo and branding for your portal." },
  { name: "Premium Support", price: "£149.99", unit: "per workspace / month", desc: "Dedicated support engineer and 4-hour SLA." },
]

const faqs = [
  {
    q: "Is there a free trial?",
    a: "Yes. All paid plans include a 14-day free trial with full access. No credit card required to start.",
  },
  {
    q: "Can I switch plans later?",
    a: "Absolutely. You can upgrade, downgrade or add-ons at any time from your workspace billing settings. Changes take effect immediately and are prorated.",
  },
  {
    q: "What counts as a user?",
    a: "Any person with an active account in your workspace counts as a billable user. You can deactivate users at any time and they will not be billed for subsequent periods.",
  },
  {
    q: "Is there a minimum contract?",
    a: "No. All plans are monthly rolling by default. Annual billing is available with a 20% discount — contact our sales team.",
  },
  {
    q: "Do you offer nonprofit or education pricing?",
    a: "Yes. We offer a 50% discount for registered charities and educational institutions. Apply through our contact page.",
  },
  {
    q: "What happens to my data if I cancel?",
    a: "You can export all your data at any time. After cancellation, your data is retained for 30 days before deletion, unless you request immediate removal.",
  },
  {
    q: "Is the Pro plan really a 5-user minimum?",
    a: "Yes, the Pro plan is priced for growing teams with a minimum of 5 seats. If you need fewer users, the Starter plan may be more appropriate.",
  },
]

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-slate-200 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full py-5 text-left text-sm font-semibold text-slate-900 hover:text-[var(--primary)] transition-colors gap-4"
      >
        <span>{q}</span>
        {open ? <ChevronUp className="w-4 h-4 flex-shrink-0" /> : <ChevronDown className="w-4 h-4 flex-shrink-0" />}
      </button>
      {open && <p className="pb-5 text-sm text-slate-600 leading-relaxed">{a}</p>}
    </div>
  )
}

export default function PricingPage() {
  return (
    <div className="bg-white">
      {/* Header */}
      <section className="py-20 bg-gradient-to-br from-slate-950 to-slate-800 text-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Simple, transparent pricing</h1>
          <p className="text-lg text-slate-300">
            No hidden fees. No long-term contracts. Pay only for what you use.
          </p>
        </div>
      </section>

      {/* Pricing cards */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`bg-white rounded-2xl border flex flex-col relative p-8 ${
                  tier.highlighted
                    ? "border-[var(--primary)] shadow-xl shadow-blue-100"
                    : "border-slate-200 shadow-sm"
                }`}
              >
                {tier.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1 rounded-full text-xs font-semibold text-white" style={{ background: "linear-gradient(135deg, #1a56db, #06b6d4)" }}>
                      {tier.badge}
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h2 className="text-xl font-bold text-slate-900 mb-1">{tier.name}</h2>
                  <p className="text-xs text-slate-500 mb-4">{tier.desc}</p>
                  {tier.price === "Custom" ? (
                    <div className="text-3xl font-bold text-slate-900">Custom</div>
                  ) : (
                    <div className="flex items-end gap-1">
                      <span className="text-3xl font-bold text-slate-900">{tier.price}</span>
                      <span className="text-xs text-slate-500 mb-1">{tier.per}</span>
                    </div>
                  )}
                  {tier.minUsers && (
                    <p className="text-xs text-amber-600 mt-1">{tier.minUsers > 1 ? `Min. ${tier.minUsers} users` : "From 1 user"}</p>
                  )}
                  <p className="text-xs text-[var(--primary)] font-medium mt-2">{tier.apps}</p>
                </div>

                <ul className="space-y-2 mb-6 flex-1">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                  {tier.notIncluded.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-xs text-slate-400">
                      <Minus className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
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
        </div>
      </section>

      {/* Add-ons */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">Power-ups &amp; Add-ons</h2>
            <p className="text-slate-500 text-base max-w-xl mx-auto">
              Extend your plan with exactly the features you need. Add or remove at any time.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {addons.map((addon) => (
              <div key={addon.name} className="bg-slate-50 rounded-xl border border-slate-200 p-6">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h3 className="font-semibold text-slate-900 text-sm">{addon.name}</h3>
                  <div className="text-right flex-shrink-0">
                    <span className="text-sm font-bold text-[var(--primary)]">{addon.price}</span>
                    <br />
                    <span className="text-xs text-slate-400">{addon.unit}</span>
                  </div>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">{addon.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">Frequently asked questions</h2>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 p-8">
            {faqs.map((faq) => (
              <FaqItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 text-center bg-white">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Still have questions?</h2>
          <p className="text-slate-500 mb-6 text-sm">Our team is happy to walk you through the right plan for your business.</p>
          <Link
            href="/book-demo"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white rounded-xl hover:opacity-90 transition-all"
            style={{ background: "linear-gradient(135deg, #1a56db, #06b6d4)" }}
          >
            Talk to Sales <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}
