"use client"

import Link from "next/link"

const sections = [
  {
    title: "1. Introduction",
    content: `Orbas Ltd ("Orbas", "we", "us", "our") is committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our software-as-a-service platform.

Please read this policy carefully. If you disagree with its terms, please discontinue use of our services. By continuing to use our services, you consent to the data practices described herein.`,
  },
  {
    title: "2. Information We Collect",
    content: `We collect information you provide directly to us, including:

• **Account Information:** Name, email address, password, company name, job title, and phone number when you register for an account.
• **Billing Information:** Payment card details (processed securely via Stripe; we do not store raw card numbers), billing address, and invoicing details.
• **Usage Data:** Information about how you interact with our platform, including features used, actions taken, login times, and IP addresses.
• **Communications:** Any messages, support tickets, or correspondence you send to us.
• **Customer Data:** Data you import, create, or store in the Orbas platform as part of your use of the service (e.g., CRM contacts, financial records). You retain ownership of this data at all times.`,
  },
  {
    title: "3. How We Use Your Information",
    content: `We use the information we collect to:

• Provide, operate, and maintain our services
• Process transactions and send related invoices and notifications
• Send administrative information such as changes to terms, conditions, and policies
• Respond to comments and questions and provide customer service
• Send you technical notices, updates, security alerts, and support messages
• Monitor and analyse usage patterns and trends to improve our services
• Detect, investigate, and prevent fraudulent transactions and other illegal activities
• Comply with legal obligations`,
  },
  {
    title: "4. Legal Basis for Processing (GDPR)",
    content: `For individuals in the European Economic Area and United Kingdom, our legal bases for processing personal data include:

• **Performance of a contract:** Processing necessary to provide the services you have contracted for.
• **Legitimate interests:** Processing necessary for our legitimate business interests, such as fraud prevention, network security, and product improvement, where these interests are not overridden by your rights.
• **Legal obligation:** Processing required to comply with applicable laws and regulations.
• **Consent:** Where you have provided explicit consent, such as for marketing communications.`,
  },
  {
    title: "5. Data Retention",
    content: `We retain personal data for as long as necessary to fulfil the purposes for which it was collected, including for the purposes of satisfying any legal, accounting, or reporting requirements.

For active accounts, we retain your data for the duration of your subscription plus 90 days after termination (to allow data export). After this period, data is permanently deleted. You may request earlier deletion at any time.

Backup copies are retained for up to 30 days and are then permanently deleted.`,
  },
  {
    title: "6. Sharing Your Information",
    content: `We do not sell, trade, or otherwise transfer your personal information to third parties except in the following circumstances:

• **Service Providers:** We share data with trusted third-party vendors who assist us in operating our platform (e.g., AWS for hosting, Stripe for payments, Resend for email). These parties are contractually bound to keep information confidential.
• **Business Transfers:** In connection with a merger, acquisition, or sale of assets, your data may be transferred as a business asset.
• **Legal Requirements:** We may disclose information when required by law, court order, or governmental authority.
• **With Your Consent:** We may share information with your explicit consent.

A full list of our subprocessors is available at orbas.io/legal/subprocessors.`,
  },
  {
    title: "7. Your Data Rights",
    content: `Under GDPR and UK GDPR, you have the following rights:

• **Right to Access:** Request a copy of the personal data we hold about you.
• **Right to Rectification:** Request correction of inaccurate or incomplete data.
• **Right to Erasure ("Right to be Forgotten"):** Request deletion of your personal data in certain circumstances.
• **Right to Restrict Processing:** Request that we restrict how we use your data.
• **Right to Data Portability:** Receive your data in a structured, machine-readable format.
• **Right to Object:** Object to processing based on legitimate interests or for direct marketing.

To exercise any of these rights, contact us at privacy@orbas.io. We will respond within 30 days.`,
  },
  {
    title: "8. Security",
    content: `We implement industry-standard technical and organisational measures to protect your personal data, including:

• AES-256 encryption at rest and TLS 1.3 in transit
• Multi-factor authentication support
• Regular penetration testing by CREST-accredited firms
• SOC 2 Type II certification
• Access controls and audit logging
• 24/7 security monitoring

Despite these measures, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security.`,
  },
  {
    title: "9. Cookies",
    content: `We use cookies and similar tracking technologies to track activity on our service and hold certain information. Cookies are files with a small amount of data stored on your device.

Essential cookies are required for the platform to function. You can control non-essential cookies through our Cookie Preferences panel or your browser settings. See our full Cookie Policy at orbas.io/legal/cookies.`,
  },
  {
    title: "10. International Transfers",
    content: `Your data may be transferred to and processed in countries other than the country in which you reside. Where data is transferred outside the UK or EEA, we ensure appropriate safeguards are in place, including Standard Contractual Clauses (SCCs) approved by the relevant supervisory authority.`,
  },
  {
    title: "11. Children's Privacy",
    content: `Our services are not directed to individuals under the age of 16. We do not knowingly collect personal data from children. If we become aware that a child has provided us with personal data, we will delete such information immediately.`,
  },
  {
    title: "12. Changes to This Policy",
    content: `We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the "Last Updated" date. For significant changes, we will send an email notification. Continued use of our services after changes are posted constitutes acceptance of the updated policy.`,
  },
  {
    title: "13. Contact Us",
    content: `For questions, concerns, or to exercise your data rights, please contact:

Orbas Ltd — Data Protection Officer
1 Canada Square, Canary Wharf, London E14 5AB
Email: privacy@orbas.io
Phone: +44 (0) 20 7946 0200

You also have the right to lodge a complaint with the UK Information Commissioner's Office (ICO) at ico.org.uk.`,
  },
]

export default function PrivacyPolicyPage() {
  return (
    <div style={{ background: "white" }}>
      {/* Hero */}
      <div style={{ background: "var(--muted)", borderBottom: "1px solid var(--border)", padding: "48px 24px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: "var(--primary)", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 10px 0" }}>Legal</p>
          <h1 style={{ fontSize: 36, fontWeight: 800, color: "var(--foreground)", margin: "0 0 12px 0" }}>Privacy Policy</h1>
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap", fontSize: 13, color: "var(--muted-foreground)" }}>
            <span><strong>Effective Date:</strong> 1 January 2026</span>
            <span><strong>Last Updated:</strong> 10 June 2026</span>
            <span><strong>Version:</strong> 3.2</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "48px 24px" }}>
        {/* Quick nav */}
        <div style={{
          background: "var(--muted)",
          border: "1px solid var(--border)",
          borderRadius: 10,
          padding: 20,
          marginBottom: 40,
        }}>
          <h2 style={{ fontSize: 14, fontWeight: 700, color: "var(--foreground)", margin: "0 0 12px 0" }}>Contents</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            {sections.map((s, i) => (
              <a
                key={i}
                href={`#section-${i}`}
                style={{ fontSize: 13, color: "var(--primary)", textDecoration: "none" }}
              >
                {s.title}
              </a>
            ))}
          </div>
        </div>

        {/* Sections */}
        <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>
          {sections.map((s, i) => (
            <div key={i} id={`section-${i}`}>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--foreground)", margin: "0 0 12px 0" }}>{s.title}</h2>
              <div style={{ fontSize: 15, color: "var(--foreground)", lineHeight: 1.7, whiteSpace: "pre-line" }}>
                {s.content}
              </div>
              {i < sections.length - 1 && (
                <div style={{ marginTop: 36, borderBottom: "1px solid var(--border)" }} />
              )}
            </div>
          ))}
        </div>

        {/* Related links */}
        <div style={{
          marginTop: 56,
          padding: 24,
          background: "var(--muted)",
          borderRadius: 10,
          border: "1px solid var(--border)",
        }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--foreground)", margin: "0 0 12px 0" }}>Related Legal Documents</h3>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {[
              { label: "Terms of Service", href: "/legal/terms" },
              { label: "Cookie Policy", href: "/legal/cookies" },
              { label: "DPA", href: "/legal/dpa" },
              { label: "Subprocessors", href: "/legal/subprocessors" },
              { label: "Acceptable Use", href: "/legal/acceptable-use" },
            ].map(link => (
              <Link key={link.href} href={link.href} style={{
                padding: "6px 14px",
                borderRadius: 6,
                border: "1px solid var(--border)",
                background: "white",
                fontSize: 13,
                color: "var(--primary)",
                textDecoration: "none",
                fontWeight: 600,
              }}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
