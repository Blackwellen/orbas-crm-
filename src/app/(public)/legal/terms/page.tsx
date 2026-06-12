"use client"

import Link from "next/link"

const sections = [
  {
    title: "1. Agreement to Terms",
    content: `These Terms of Service ("Terms") constitute a legally binding agreement between you ("Customer", "you", "your") and Orbas Ltd ("Orbas", "we", "us", "our"), a company registered in England and Wales (Company Number 14829037), with registered offices at 1 Canada Square, Canary Wharf, London E14 5AB.

By accessing or using the Orbas CRM platform and associated services (the "Service"), you agree to be bound by these Terms. If you are entering into these Terms on behalf of a company or other legal entity, you represent that you have the authority to bind that entity.

If you do not agree to these Terms, do not use the Service.`,
  },
  {
    title: "2. The Service",
    content: `Orbas provides a cloud-based business management platform, including CRM, accounting, project management, HR, and operations modules. The specific features available to you depend on your chosen subscription plan.

We reserve the right to modify, suspend, or discontinue any part of the Service at any time, with reasonable notice for material changes. We will not be liable to you or any third party for any modification, suspension, or discontinuation of the Service.`,
  },
  {
    title: "3. Account Registration",
    content: `To use the Service, you must create an account. You agree to:

• Provide accurate, current, and complete information during registration
• Maintain and promptly update your account information to keep it accurate
• Keep your password secure and not share it with third parties
• Notify us immediately of any unauthorised use of your account
• Accept responsibility for all activities that occur under your account

You must be at least 18 years old to create an account. Accounts registered by bots or automated methods are not permitted.`,
  },
  {
    title: "4. Subscription Plans and Payment",
    content: `The Service is available on a subscription basis. By subscribing to a paid plan, you agree to:

• Pay the applicable fees for the plan you have selected, as described on our pricing page
• Provide valid payment information and keep it current
• Authorise us to charge your payment method on a recurring basis

**Billing Cycle:** Subscriptions are billed monthly or annually in advance, depending on your chosen billing period.

**Price Changes:** We will provide at least 30 days notice of price changes. Continued use after the effective date constitutes acceptance.

**Refunds:** Subscription fees are generally non-refundable. Pro-rata refunds may be issued at our discretion in exceptional circumstances.

**Taxes:** All fees are exclusive of applicable taxes. You are responsible for any taxes, levies, or duties imposed by taxing authorities.`,
  },
  {
    title: "5. Free Trial",
    content: `We may offer a free trial of the Service for a limited period. At the end of the trial period, unless you cancel, you will be automatically enrolled in a paid subscription at the applicable plan rate.

We reserve the right to modify or terminate free trial offers at any time without notice.`,
  },
  {
    title: "6. Acceptable Use",
    content: `You agree to use the Service only for lawful purposes and in accordance with these Terms and our Acceptable Use Policy. You agree not to:

• Use the Service for any unlawful purpose or in violation of any applicable laws
• Transmit any material that is defamatory, offensive, harassing, or otherwise objectionable
• Attempt to gain unauthorised access to the Service or its related systems
• Use the Service to send unsolicited communications (spam)
• Reverse engineer, decompile, or disassemble any portion of the Service
• Use the Service to store or transmit malicious code
• Interfere with or disrupt the integrity or performance of the Service`,
  },
  {
    title: "7. Customer Data",
    content: `You retain all rights, title, and interest in and to the data you input into the Service ("Customer Data"). We do not own your Customer Data.

By using the Service, you grant Orbas a limited, non-exclusive, royalty-free licence to host, copy, transmit, and display Customer Data solely as necessary to provide and improve the Service.

We will not access, use, or share your Customer Data except as necessary to provide the Service, comply with legal requirements, or as directed by you. We implement appropriate technical and organisational measures to protect Customer Data, as described in our Privacy Policy and Data Processing Agreement.`,
  },
  {
    title: "8. Intellectual Property",
    content: `The Service, including its software, design, features, and content, is owned by Orbas and is protected by copyright, trademark, and other intellectual property laws. These Terms do not grant you any ownership rights in the Service.

The Orbas name, logo, and product names are trademarks of Orbas Ltd. You may not use these marks without our prior written consent.

Feedback: If you provide us with feedback or suggestions about the Service, you grant us a non-exclusive, perpetual licence to use that feedback without compensation to you.`,
  },
  {
    title: "9. Confidentiality",
    content: `Each party may receive confidential information from the other in connection with the Service. Each party agrees to:

• Keep the other's confidential information strictly confidential
• Use it only for the purposes permitted under these Terms
• Not disclose it to third parties without prior written consent
• Protect it with at least the same level of care used to protect its own confidential information

This obligation does not apply to information that is publicly known, independently developed, or required to be disclosed by law.`,
  },
  {
    title: "10. Warranties and Disclaimers",
    content: `Orbas warrants that the Service will perform materially in accordance with its documentation. Subject to the uptime SLA set out in our SLA document, we will use commercially reasonable efforts to maintain Service availability.

TO THE MAXIMUM EXTENT PERMITTED BY LAW, THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE." ORBAS DISCLAIMS ALL OTHER WARRANTIES, EXPRESS OR IMPLIED, INCLUDING IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.`,
  },
  {
    title: "11. Limitation of Liability",
    content: `TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, ORBAS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS OF PROFITS, REVENUE, DATA, BUSINESS, OR GOODWILL.

ORBAS'S TOTAL CUMULATIVE LIABILITY ARISING FROM OR RELATED TO THESE TERMS OR THE SERVICE SHALL NOT EXCEED THE GREATER OF: (i) THE AMOUNT YOU PAID ORBAS IN THE 12 MONTHS PRECEDING THE CLAIM; OR (ii) £500.

Some jurisdictions do not allow the exclusion of certain warranties or the limitation of liability, so some of the above limitations may not apply to you.`,
  },
  {
    title: "12. Indemnification",
    content: `You agree to indemnify, defend, and hold harmless Orbas and its officers, directors, employees, agents, and successors from and against any claims, damages, losses, liabilities, costs, and expenses (including reasonable legal fees) arising from:

• Your use of the Service in violation of these Terms
• Your Customer Data, including any claim that it infringes a third party's rights
• Your breach of any representation or warranty in these Terms`,
  },
  {
    title: "13. Term and Termination",
    content: `These Terms are effective from the date you first access the Service and remain in effect until terminated.

**Termination by You:** You may cancel your subscription at any time through your account settings. Cancellation takes effect at the end of the current billing period.

**Termination by Orbas:** We may terminate or suspend your account immediately if you materially breach these Terms, or with 30 days notice for any other reason.

**Effect of Termination:** Upon termination, your right to use the Service ceases. You will have 90 days to export your Customer Data. After this period, data will be permanently deleted.`,
  },
  {
    title: "14. Governing Law and Dispute Resolution",
    content: `These Terms are governed by and construed in accordance with the laws of England and Wales. You agree to submit to the exclusive jurisdiction of the courts of England and Wales for any disputes arising from these Terms.

For disputes under £10,000, we encourage resolution through our informal dispute resolution process before initiating legal proceedings. Contact legal@orbas.io.`,
  },
  {
    title: "15. General",
    content: `**Entire Agreement:** These Terms, together with our Privacy Policy, DPA, and any order forms, constitute the entire agreement between you and Orbas regarding the Service.

**Severability:** If any provision of these Terms is found to be unenforceable, the remaining provisions will continue in full force.

**Waiver:** Failure to enforce any provision of these Terms shall not constitute a waiver of future enforcement.

**Assignment:** You may not assign these Terms without our prior written consent. We may assign these Terms in connection with a merger, acquisition, or sale of assets.

**Notices:** Notices to Orbas should be sent to legal@orbas.io. Notices to you will be sent to the email address on your account.`,
  },
  {
    title: "16. Contact Information",
    content: `For questions about these Terms, please contact:

Orbas Ltd — Legal Department
1 Canada Square, Canary Wharf, London E14 5AB
Email: legal@orbas.io
Phone: +44 (0) 20 7946 0200`,
  },
]

export default function TermsOfServicePage() {
  return (
    <div style={{ background: "white" }}>
      {/* Hero */}
      <div style={{ background: "var(--muted)", borderBottom: "1px solid var(--border)", padding: "48px 24px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: "var(--primary)", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 10px 0" }}>Legal</p>
          <h1 style={{ fontSize: 36, fontWeight: 800, color: "var(--foreground)", margin: "0 0 12px 0" }}>Terms of Service</h1>
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap", fontSize: 13, color: "var(--muted-foreground)" }}>
            <span><strong>Effective Date:</strong> 1 January 2026</span>
            <span><strong>Last Updated:</strong> 10 June 2026</span>
            <span><strong>Version:</strong> 4.0</span>
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
              { label: "Privacy Policy", href: "/legal/privacy" },
              { label: "Cookie Policy", href: "/legal/cookies" },
              { label: "DPA", href: "/legal/dpa" },
              { label: "Acceptable Use Policy", href: "/legal/acceptable-use" },
              { label: "SLA", href: "/legal/sla" },
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
