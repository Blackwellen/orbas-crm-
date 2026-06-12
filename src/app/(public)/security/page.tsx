"use client"

import Link from "next/link"
import {
  Shield, Lock, Server, Globe, Eye, CheckCircle2,
  FileCheck, RefreshCw, AlertTriangle, Award, ChevronRight
} from "lucide-react"

const certifications = [
  { name: "SOC 2 Type II",    icon: Award,     status: "Certified", desc: "Annual third-party audit by accredited auditors" },
  { name: "ISO 27001",        icon: Shield,    status: "Certified", desc: "Information security management system certification" },
  { name: "GDPR Compliant",   icon: FileCheck, status: "Compliant", desc: "Full EU General Data Protection Regulation compliance" },
  { name: "Cyber Essentials", icon: Globe,     status: "Certified", desc: "UK Government-backed cybersecurity certification" },
]

const securityFeatures = [
  {
    icon: Lock,
    title: "End-to-End Encryption",
    desc: "All data encrypted at rest with AES-256 and in transit with TLS 1.3. Encryption keys are rotated regularly.",
    detail: "AES-256 at rest · TLS 1.3 in transit",
    color: "#2563eb",
    bg: "#eff6ff",
  },
  {
    icon: Shield,
    title: "Multi-Factor Authentication",
    desc: "TOTP and hardware key support for all user accounts. Admins can enforce MFA across their workspace.",
    detail: "TOTP · WebAuthn · SMS",
    color: "#7c3aed",
    bg: "#f5f3ff",
  },
  {
    icon: Server,
    title: "Infrastructure Security",
    desc: "Hosted on AWS with dedicated VPCs, private subnets, WAF, and DDoS protection. Zero-trust network architecture.",
    detail: "AWS · Private VPC · WAF · DDoS protection",
    color: "#d97706",
    bg: "#fffbeb",
  },
  {
    icon: Eye,
    title: "Penetration Testing",
    desc: "Annual CREST-accredited penetration tests plus continuous automated vulnerability scanning.",
    detail: "Annual CREST pen test · Continuous scanning",
    color: "#16a34a",
    bg: "#f0fdf4",
  },
  {
    icon: RefreshCw,
    title: "Backup & Recovery",
    desc: "Automated daily backups with point-in-time recovery to 5-minute granularity. Cross-region replication.",
    detail: "Daily backups · PITR 5-min · Cross-region",
    color: "#0891b2",
    bg: "#ecfeff",
  },
  {
    icon: AlertTriangle,
    title: "Incident Response",
    desc: "24/7 security operations team. SLA for critical vulnerabilities under 4 hours. Customers notified within 72 hours.",
    detail: "24/7 SOC · 4hr critical SLA · 72hr notification",
    color: "#ef4444",
    bg: "#fef2f2",
  },
]

const uptimeData = [
  { month: "Dec 25", uptime: 99.98 },
  { month: "Jan 26", uptime: 100.0 },
  { month: "Feb 26", uptime: 99.97 },
  { month: "Mar 26", uptime: 99.99 },
  { month: "Apr 26", uptime: 100.0 },
  { month: "May 26", uptime: 99.98 },
]

const gdprPoints = [
  "Data Processing Agreements (DPAs) available for all customers",
  "Data residency options: UK, EU, and US regions",
  "Right to erasure (right to be forgotten) enforced within 30 days",
  "Data portability: export your data at any time in standard formats",
  "Privacy by design: data minimisation and purpose limitation built in",
  "Subprocessor list published and kept up to date",
]

export default function SecurityPage() {
  return (
    <div style={{ background: "white" }}>
      {/* Hero */}
      <section style={{
        background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)",
        padding: "80px 24px",
        textAlign: "center",
      }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "6px 14px",
            borderRadius: 20,
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.12)",
            marginBottom: 24,
          }}>
            <Shield size={14} color="#06b6d4" />
            <span style={{ fontSize: 12, fontWeight: 700, color: "#06b6d4", letterSpacing: "0.08em" }}>ENTERPRISE SECURITY</span>
          </div>
          <h1 style={{ fontSize: 48, fontWeight: 800, color: "white", margin: "0 0 20px 0", lineHeight: 1.15 }}>
            Security is our<br />
            <span style={{ background: "linear-gradient(90deg, #1a56db, #06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              first priority
            </span>
          </h1>
          <p style={{ fontSize: 18, color: "rgba(255,255,255,0.75)", lineHeight: 1.6, margin: "0 0 32px 0" }}>
            Enterprise-grade security built into every layer of the Orbas platform.
            SOC 2 certified, GDPR compliant, and penetration tested by CREST-accredited firms.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/contact" style={{ textDecoration: "none" }}>
              <button style={{
                padding: "12px 28px",
                borderRadius: 8,
                background: "linear-gradient(135deg, #1a56db, #06b6d4)",
                border: "none",
                color: "white",
                fontWeight: 700,
                fontSize: 15,
                cursor: "pointer",
              }}>
                Contact Security Team
              </button>
            </Link>
            <Link href="/legal/dpa" style={{ textDecoration: "none" }}>
              <button style={{
                padding: "12px 28px",
                borderRadius: 8,
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.2)",
                color: "white",
                fontWeight: 600,
                fontSize: 15,
                cursor: "pointer",
              }}>
                Download DPA
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section style={{ padding: "64px 24px", background: "var(--muted)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 style={{ fontSize: 32, fontWeight: 700, color: "var(--foreground)", textAlign: "center", margin: "0 0 8px 0" }}>
            Certifications & Compliance
          </h2>
          <p style={{ fontSize: 16, color: "var(--muted-foreground)", textAlign: "center", margin: "0 0 48px 0" }}>
            Independently verified and externally audited
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
            {certifications.map(cert => {
              const Icon = cert.icon
              return (
                <div key={cert.name} style={{
                  background: "white",
                  border: "1px solid var(--border)",
                  borderRadius: 12,
                  padding: 24,
                  textAlign: "center",
                }}>
                  <div style={{
                    width: 56, height: 56, borderRadius: 16,
                    background: "linear-gradient(135deg, #1a56db, #06b6d4)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    margin: "0 auto 16px",
                  }}>
                    <Icon size={24} color="white" />
                  </div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--foreground)", margin: "0 0 6px 0" }}>{cert.name}</h3>
                  <p style={{ fontSize: 13, color: "var(--muted-foreground)", margin: "0 0 12px 0", lineHeight: 1.5 }}>{cert.desc}</p>
                  <span style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 5,
                    padding: "3px 10px",
                    borderRadius: 20,
                    fontSize: 12,
                    fontWeight: 700,
                    color: "#16a34a",
                    background: "#f0fdf4",
                    border: "1px solid #bbf7d0",
                  }}>
                    <CheckCircle2 size={11} /> {cert.status}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Security features */}
      <section style={{ padding: "64px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 style={{ fontSize: 32, fontWeight: 700, color: "var(--foreground)", textAlign: "center", margin: "0 0 8px 0" }}>
            Security Architecture
          </h2>
          <p style={{ fontSize: 16, color: "var(--muted-foreground)", textAlign: "center", margin: "0 0 48px 0" }}>
            Multiple layers of protection at every level
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 24 }}>
            {securityFeatures.map(feat => {
              const Icon = feat.icon
              return (
                <div key={feat.title} style={{
                  border: "1px solid var(--border)",
                  borderRadius: 12,
                  padding: 24,
                }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 12,
                    background: feat.bg,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    marginBottom: 14,
                  }}>
                    <Icon size={20} color={feat.color} />
                  </div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--foreground)", margin: "0 0 8px 0" }}>{feat.title}</h3>
                  <p style={{ fontSize: 14, color: "var(--muted-foreground)", margin: "0 0 12px 0", lineHeight: 1.6 }}>{feat.desc}</p>
                  <code style={{
                    fontSize: 11,
                    color: feat.color,
                    background: feat.bg,
                    padding: "4px 8px",
                    borderRadius: 4,
                    display: "block",
                    fontFamily: "monospace",
                  }}>
                    {feat.detail}
                  </code>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Uptime */}
      <section style={{ padding: "64px 24px", background: "var(--muted)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, color: "var(--foreground)", textAlign: "center", margin: "0 0 8px 0" }}>
            Uptime & Reliability
          </h2>
          <p style={{ fontSize: 16, color: "var(--muted-foreground)", textAlign: "center", margin: "0 0 40px 0" }}>
            99.9% uptime SLA with real-time status monitoring
          </p>
          <div style={{
            background: "white",
            border: "1px solid var(--border)",
            borderRadius: 12,
            padding: 28,
          }}>
            <div style={{ display: "flex", gap: 24, marginBottom: 24, flexWrap: "wrap" }}>
              {[
                { label: "30-Day Uptime", value: "99.98%" },
                { label: "Avg Response Time", value: "142ms" },
                { label: "Incidents (30d)", value: "0" },
                { label: "SLA Guarantee", value: "99.9%" },
              ].map(stat => (
                <div key={stat.label}>
                  <p style={{ fontSize: 24, fontWeight: 700, color: "var(--foreground)", margin: "0 0 2px 0" }}>{stat.value}</p>
                  <p style={{ fontSize: 12, color: "var(--muted-foreground)", margin: 0 }}>{stat.label}</p>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 6, alignItems: "flex-end", height: 60 }}>
              {uptimeData.map(d => (
                <div key={d.month} style={{ flex: 1, textAlign: "center" }}>
                  <div style={{
                    height: 44,
                    background: "linear-gradient(180deg, #1a56db, #06b6d4)",
                    borderRadius: 4,
                    opacity: d.uptime >= 100 ? 1 : 0.7,
                    marginBottom: 4,
                  }} />
                  <p style={{ fontSize: 10, color: "var(--muted-foreground)", margin: 0 }}>{d.month}</p>
                  <p style={{ fontSize: 9, color: "#16a34a", margin: 0, fontWeight: 600 }}>{d.uptime}%</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* GDPR */}
      <section style={{ padding: "64px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "start" }}>
            <div>
              <h2 style={{ fontSize: 28, fontWeight: 700, color: "var(--foreground)", margin: "0 0 16px 0" }}>GDPR & Data Privacy</h2>
              <p style={{ fontSize: 15, color: "var(--muted-foreground)", lineHeight: 1.7, margin: "0 0 24px 0" }}>
                Orbas is fully GDPR compliant and committed to protecting the personal data of you and your customers.
                We act as a Data Processor, and you retain full ownership and control of your data.
              </p>
              <Link href="/legal/privacy" style={{ textDecoration: "none" }}>
                <button style={{
                  display: "flex", alignItems: "center", gap: 8,
                  padding: "10px 20px", borderRadius: 8,
                  border: "1px solid var(--border)", background: "white",
                  color: "var(--foreground)", fontWeight: 600, fontSize: 14, cursor: "pointer",
                }}>
                  Read Privacy Policy <ChevronRight size={14} />
                </button>
              </Link>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {gdprPoints.map((point, i) => (
                <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <CheckCircle2 size={16} color="#16a34a" style={{ flexShrink: 0, marginTop: 2 }} />
                  <p style={{ fontSize: 14, color: "var(--foreground)", margin: 0, lineHeight: 1.5 }}>{point}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "64px 24px", background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)" }}>
        <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, color: "white", margin: "0 0 12px 0" }}>
            Have security questions?
          </h2>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.7)", margin: "0 0 28px 0", lineHeight: 1.6 }}>
            Our dedicated security team is available to answer your questions, share compliance documentation,
            and support your own security review process.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/contact" style={{ textDecoration: "none" }}>
              <button style={{
                padding: "12px 28px", borderRadius: 8,
                background: "linear-gradient(135deg, #1a56db, #06b6d4)",
                border: "none", color: "white", fontWeight: 700, fontSize: 15, cursor: "pointer",
              }}>
                Contact Security Team
              </button>
            </Link>
            <Link href="/book-demo" style={{ textDecoration: "none" }}>
              <button style={{
                padding: "12px 28px", borderRadius: 8,
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.2)",
                color: "white", fontWeight: 600, fontSize: 15, cursor: "pointer",
              }}>
                Book a Demo
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
