import Link from "next/link"
import { ArrowRight, Target, Heart, Zap, Users, Globe, Shield } from "lucide-react"

const team = [
  { name: "James Orbas", title: "CEO & Co-founder", initial: "JO", color: "bg-blue-600" },
  { name: "Sarah Chen", title: "CTO & Co-founder", initial: "SC", color: "bg-violet-600" },
  { name: "Marcus Wright", title: "Head of Product", initial: "MW", color: "bg-emerald-600" },
  { name: "Priya Sharma", title: "Head of Design", initial: "PS", color: "bg-pink-600" },
  { name: "Tom Baldwin", title: "Head of Sales", initial: "TB", color: "bg-amber-600" },
  { name: "Layla Hassan", title: "Head of Customer Success", initial: "LH", color: "bg-cyan-600" },
]

const milestones = [
  { year: "2021", title: "Founded", desc: "Orbas CRM was founded in London with a mission to unify business software for growing teams." },
  { year: "2022", title: "First 100 Customers", desc: "Launched our CRM and Accounting apps. Reached 100 paying customers within 6 months of launch." },
  { year: "2023", title: "Series A — £4.2M", desc: "Raised Series A funding to expand our engineering team and launch 4 additional apps including Projects and People." },
  { year: "2024", title: "AI Copilot Launch", desc: "Launched AI Copilot across all 12 apps, making Orbas the first SME platform with unified AI assistance." },
  { year: "2025", title: "2,000+ Customers", desc: "Passed 2,000 paying workspaces across UK, Ireland and Europe. Launched SOC 2 certification programme." },
]

const values = [
  { icon: Target, title: "Clarity over complexity", desc: "We build software that simplifies — not complicates. Every feature earns its place by solving a real problem." },
  { icon: Heart, title: "Customer obsessed", desc: "We measure success by our customers' success. Their growth drives every product decision we make." },
  { icon: Zap, title: "Shipping velocity", desc: "We believe software should get better every week. We move fast, iterate constantly and listen to feedback." },
  { icon: Shield, title: "Trust by default", desc: "Security and compliance aren't afterthoughts. We build privacy and data protection into every feature from day one." },
  { icon: Users, title: "Diverse & inclusive", desc: "Our team reflects the businesses we serve. Different backgrounds, perspectives and experiences make better products." },
  { icon: Globe, title: "Built for everyone", desc: "Orbas is designed for teams of 2 to 2,000. Powerful enough for enterprise, simple enough for anyone." },
]

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="py-24 bg-gradient-to-br from-slate-950 to-slate-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">We're building the operating system for modern business</h1>
          <p className="text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Orbas was founded on a simple frustration: why do growing businesses need 10 different tools to run their company? We're changing that.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Our mission</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Every day, thousands of teams waste hours switching between disconnected tools — updating the same data in three places, reconciling reports that don't match, and fighting integrations that break.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                We built Orbas to change that. One platform, one data model, 12 deeply integrated apps. From your first sales conversation to your year-end accounts — everything connected, everything unified.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Our customers don't just save time. They get clarity. They see their whole business in one place for the first time, and they make better decisions because of it.
              </p>
            </div>
            <div className="rounded-2xl p-8 text-white" style={{ background: "linear-gradient(135deg, #0f172a, #1a56db)" }}>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { value: "2,000+", label: "Workspaces" },
                  { value: "£1B+", label: "Transactions processed" },
                  { value: "12", label: "Integrated apps" },
                  { value: "99.9%", label: "Uptime SLA" },
                ].map(stat => (
                  <div key={stat.label} className="text-center">
                    <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-sm text-blue-200">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">What we believe</h2>
            <p className="text-slate-500 max-w-xl mx-auto">The values that guide how we build, how we sell and how we support our customers.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map(v => {
              const Icon = v.icon
              return (
                <div key={v.title} className="bg-white rounded-xl border border-slate-200 p-6 hover:border-[var(--primary)] hover:shadow-sm transition-all">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4 text-white" style={{ background: "linear-gradient(135deg, #1a56db, #06b6d4)" }}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">{v.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{v.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">Our journey</h2>
            <p className="text-slate-500">From a two-person startup to a platform used by 2,000+ businesses.</p>
          </div>
          <div className="relative">
            <div className="absolute left-16 top-0 bottom-0 w-px bg-slate-200" />
            <div className="space-y-8">
              {milestones.map(m => (
                <div key={m.year} className="relative flex gap-8 items-start">
                  <div className="w-16 text-right flex-shrink-0">
                    <span className="text-sm font-bold text-[var(--primary)]">{m.year}</span>
                  </div>
                  <div className="absolute left-16 -translate-x-1/2 w-3 h-3 rounded-full bg-[var(--primary)] border-2 border-white shadow mt-0.5" />
                  <div className="pl-8 pb-2">
                    <h3 className="font-bold text-slate-900 mb-1">{m.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">Meet the team</h2>
            <p className="text-slate-500 max-w-xl mx-auto">A team of builders, designers, and operators who've lived the problems we're solving.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {team.map(member => (
              <div key={member.name} className="bg-white rounded-xl border border-slate-200 p-6 text-center hover:border-[var(--primary)] hover:shadow-sm transition-all">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-xl font-bold ${member.color}`}>
                  {member.initial}
                </div>
                <h3 className="font-bold text-slate-900">{member.name}</h3>
                <p className="text-sm text-slate-500 mt-1">{member.title}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <p className="text-slate-500 mb-4">We're hiring across engineering, design and customer success.</p>
            <Link href="/careers" className="inline-flex items-center gap-2 text-sm font-medium text-[var(--primary)] hover:underline">
              View open roles <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Ready to work with us?</h2>
          <p className="text-slate-500 mb-8">Whether you're a customer, a potential team member or a potential partner — we'd love to hear from you.</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/register" className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white rounded-xl hover:opacity-90" style={{ background: "linear-gradient(135deg, #1a56db, #06b6d4)" }}>
              Start Free Trial
            </Link>
            <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-slate-700 border border-slate-200 rounded-xl hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
