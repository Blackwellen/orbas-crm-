# Orbas CRM/ERP — Full Competitive Audit & Market Analysis
*Generated: June 2026*

---

## PART 1: WHAT'S BUILT (Current State)

The Orbas build is substantial. Full production build verified — zero TypeScript errors, all pages compiling successfully.

### Core Modules Built

| Module | Pages Built | Depth |
|--------|-------------|-------|
| **CRM** | Contacts, Accounts, Deals (kanban + detail), Leads, Campaigns, Quotes, Forecasting, Sequences, Reports, Settings | Deep — 10-tab deal detail, pipeline kanban |
| **Accounting** | Chart of Accounts, General Ledger, Journal Entries, Invoices, Bills, Payments, Banking, Reconciliation, Expenses, Tax/VAT, Budgets, Fixed Assets, Periods, P&L, Balance Sheet, Trial Balance, Settings | ERPNext-grade depth |
| **People/HR** | Directory, Org Chart, Payroll, Leave, Hiring/ATS, Performance, Learning/LMS, Engagement, Compensation, Records, Reports, Settings | Full HRIS suite |
| **Projects** | Projects (Gantt + kanban), Timesheets, Resources, Milestones, Budgets | PM-grade |
| **Operations** | Inventory/POs, Suppliers, Warehouses, Manufacturing, Field Service, Returns, Quality | Full SCM/ops |
| **Service Desk** | Tickets, Queues, Knowledge Base, SLA, Escalations, Reports, Settings | Comparable to Freshdesk |
| **Connect** | Unified Inbox, Channels, DMs, Live Chat, Social, Email, Routing, Reports, Settings | Omnichannel messaging |
| **Documents** | File Browser, Templates, Signatures, Shared, Trash, Settings | Document management |
| **Compliance** | Risk Register (heat map), Controls, Policies, Audits, Incidents, Training, Reports | ISO 27001 / SOC2 grade |
| **Charity** | Donors, Donations, Gift Aid, Grants, Campaigns, Impact, Reports | Competes with NPSP |
| **Automations** | Workflows (canvas), Runs, Triggers, Templates, Settings | Zapier-style |
| **Analytics** | Dashboards, Builder, Metrics, Datasets, Scheduled Reports, Exports, Settings | Tableau-lite |
| **Admin Console** | Users, Workspace, Billing, Audit Log, Integrations, API Keys, Apps/Feature Flags | Full workspace admin |
| **Platform Admin** | Tenants, Tenant detail | SaaS multi-tenant ops |
| **Settings** | Profile, Security/MFA, Notifications, Appearance, API Tokens, Billing, Integrations | Complete user settings |
| **Client Portal** | Portal home, Invoices, Projects, Support, Documents, Profile | White-label client view |
| **Public Pages** | Landing, Pricing, Security, Book Demo, Contact, Privacy, Terms | Marketing site |
| **Auth** | Login, Register, Verify Email, Reset Password, Onboarding | Full auth flow |

**This is already ahead of Zoho One, ERPNext, and Monday.com in module breadth.**

---

## PART 2: THE COMPETITIVE LANDSCAPE

### Who We're Up Against

**Tier 1 — Enterprise (not direct competition yet):**

- **Salesforce**: $165–330/user/month. Dominant in CRM but zero UK accounting/HR compliance. Einstein AI underperforming vs. hype.
- **Dynamics 365**: $80–200/user/month. Strong Microsoft ecosystem lock-in. Best practical AI (Copilot) in market currently.
- **NetSuite/SAP**: $1,000–$40k+/month. Out-of-reach pricing; implementation costs £50k+.

**Tier 2 — Direct Competition:**

- **HubSpot**: Free → £3,200/month. Best CRM UX for SMB, but zero accounting, zero HR, zero operations. Needs 5+ integrations to match Orbas.
- **Zoho One**: £45/user/month. 50+ apps but notoriously dated UX. Strongest direct competitor on breadth. UK compliance is partial at best.
- **Odoo**: Free → £3,300/month/100 employees. Open source, powerful, but notorious for poor UX. European base.
- **Freshworks**: £15–99/user/month. Service/support focused; no accounting or HR.
- **Pipedrive**: £14–99/user/month. Sales pipeline only; acquired by Zendesk, slowing innovation.

**Tier 3 — Niche Competitors:**

- **Monday.com / ClickUp**: Project management-first; no accounting or HR.
- **Salesforce NPSP**: Charity module at £3,000+/year add-on. Exact market Orbas Charity module targets.
- **Blackbaud**: £5k–50k/year for charity CRM. Legacy, expensive, inflexible.
- **Donorfy**: £50–500/month. Charity-only, no business suite.
- **Charitylog**: UK charity CRM. Basic, no ERP depth.

### The Gap Orbas Owns

```
Modern UX           Orbas is HERE
                          ↓
Salesforce/HubSpot  → great UX   but UK compliance = zero
Zoho/Odoo/ERPNext   → deep features but terrible UX

UK-Regulatory-Native + Modern UI + Multi-Module + Affordable
= UNOCCUPIED at SMB/mid-market pricing
```

---

## PART 3: CRITICAL MISSING FEATURES (Revenue-Impacting Gaps)

### TIER 1 — Build These to Compete (Immediate Priority)

#### 1. Making Tax Digital (MTD ITSA) — UK Mandatory

This is the single biggest acquisition driver. MTD is mandatory for UK businesses >£50k turnover since April 2026. HubSpot/Salesforce have zero MTD support. Zoho is partial.

**What to build:**
- HMRC API integration for quarterly digital submissions
- AI-suggested expense categorizations (allowable vs non-allowable)
- Capital allowances tracking in the Fixed Assets module
- MTD readiness score before quarter deadline
- Self Assessment SA105 property income summary
- VAT return digital filing (extends existing Tax/VAT page)

**Why it wins:** Every UK business above £50k must use MTD-compatible software. The full accounting module is already built — the HMRC integration is the missing capstone. Positions Orbas as "QuickBooks + Xero + CRM + HR all in one, HMRC-certified."

---

#### 2. Companies House Integration

No CRM or ERP platform has this. It's a completely unoccupied feature.

**What to build:**
- Auto-import company data from Companies House by company number (free Companies House API)
- Pre-populate Accounts, Contacts with verified company data instantly
- Auto-filing reminders for Confirmation Statement (AR01), Annual Accounts
- Director search and verification within Contact records
- Auto-detect company status changes (dissolved, insolvent, director changes)

**Why it wins:** Unique in the market. Every UK sales rep manually looks up Companies House when qualifying leads. Bringing it inside the CRM saves an hour per deal. Zero competitors have this at any price tier.

---

#### 3. PAYE / Payroll with Real Time Information (RTI)

The People module has payroll pages built. They need a real calculation engine behind them.

**What to build:**
- PAYE calculation engine (tax codes, NI bands, student loan plans 1/2/4)
- HMRC RTI FPS/EPS submission
- Auto-enrolment pension (NEST, Smart Pension integration)
- P60, P45, P11D document generation
- Statutory pay calculations (SSP, SMP, SPP)

**Why it wins:** Competing against BrightPay (£99+/year), Sage Payroll (£10–50/month), Xero Payroll (add-on). The multi-module suite makes payroll a natural upsell. No sales rep wants to use a different system for payroll when HR and CRM are already in Orbas.

---

#### 4. Native eSignature

Every serious competitor has native eSignature. Orbas has a signatures page — it needs to work.

**What to build:**
- Generate document from template or upload
- Send to multiple signatories in defined order
- Track signature status (sent / viewed / signed / completed)
- Completed document auto-stored in Documents module
- Audit trail with IP address, timestamp, email verification
- UK/EU compliant (eIDAS simple electronic signature)

**Why it wins:** DocuSign charges £20–50/month per user. Every business needs eSignature for contracts, proposals, NDAs, employment contracts. Build it in and eliminate one more tool from the stack.

---

#### 5. Open Banking / Bank Feed Integration

The Reconciliation page is built. It needs live bank data.

**What to build:**
- TrueLayer or Yapily Open Banking integration (UK Open Banking standard)
- Automatic bank transaction import (replace manual CSV imports)
- AI-powered transaction matching to invoices, bills, expenses
- GoCardless for Direct Debit rent/invoice collection
- Unmatched transaction flagging with suggested matches

**Why it wins:** Bank feeds are the #1 most-used feature in Xero and QuickBooks. It's what makes accounting software actually useful vs. a manual ledger. Table stakes for the accounting module — without it, accountants won't switch.

---

### TIER 2 — Build for Competitive Moat (1–2 Months)

#### 6. AI Copilot Expansion — Business-Intelligent, Not Generic

Orbas already has an AI Copilot. Expand it beyond chat to specific high-value workflows:

**Document Intelligence:**
- Upload any PDF invoice/contract → AI extracts key data (amounts, dates, parties, payment terms) and pre-populates forms
- Upload a CV → AI extracts skills, experience, education, creates candidate record in ATS

**Natural Language CRM Queries:**
- "Show me all deals over £50k stalled for 30 days in Proposal stage"
- "Which contacts haven't been touched in 90 days from accounts over £100k ARR?"

**Meeting Notes → CRM Actions:**
- Paste meeting notes → AI creates follow-up tasks, updates deal stage, logs activity automatically

**AI Proposal Writer:**
- Based on the deal record (contact, company, deal value, products), generate a first-draft proposal

**Anomaly Detection:**
- "Your debtors aged 60+ days increased 40% this month — 3 customers account for 85% of this"

**Why it wins:** Salesforce Einstein requires Enterprise ($330/user/month). HubSpot AI requires Enterprise ($3,200/month). Orbas includes it in the base plan.

---

#### 7. Enhanced White-Label Client Portal

The client portal is built. Add:
- Custom domain/subdomain (client.yourcompany.com)
- Branded welcome email on first portal access
- Proposal approval with e-sign directly from the portal
- Invoice payment via Stripe from portal
- Project status and milestone updates visible to clients
- Support ticket submission from portal
- NPS survey embedded

**Why it wins:** No competitor at this price point has a white-label client portal. This unlocks agencies, consultants, and professional services firms — who need to give clients a branded experience. Agencies will pay a premium specifically for this.

---

#### 8. Contract & Proposal Builder

Quotes module is built. Extend it:
- Full proposal templates with cover page, section builder, custom branding
- E-sign embedded inline in proposal
- Proposal analytics (opened, time spent reading, pages viewed, link forwarded)
- Version comparison (changes from v1 to v3 highlighted)
- Win/loss reason tracking on close

**Why it wins:** Companies pay £50–200/month for PandaDoc, Proposify, or GetAccept. Build it in and eliminate another tool from the customer's stack.

---

#### 9. Subscription & Recurring Revenue Management

This is missing entirely from most CRM/ERP platforms and is a premium feature.

**What to build:**
- Subscription products in the product catalog
- Recurring invoice generation (monthly, quarterly, annual) with auto-send
- Dunning management (automated payment failure recovery sequence)
- MRR/ARR dashboard with churn rate, expansion revenue, net revenue retention
- Subscription renewal alerts for account managers
- Proration calculations on mid-cycle upgrades/downgrades

**Why it wins:** Every SaaS company, membership organisation, and subscription business needs this. Nobody at mid-market pricing has it properly built. Stripe charges a percentage of revenue for this functionality.

---

#### 10. Volunteer Management (Charity Module)

The Charity module is deep but missing this critical piece.

**What to build:**
- Volunteer registration and onboarding workflow
- Volunteer hour logging (self-service via charity portal)
- Skills and role matching for projects/campaigns
- Volunteer communications (shift reminders, availability requests, thank you notes)
- Hours-to-impact reporting ("X volunteer hours = Y beneficiaries served")
- DBS check tracking and renewal reminders

**Why it wins:** Every charity has volunteers. Salesforce NPSP requires a £1,000+/year add-on for volunteer management. Blackbaud charges separately. Bundle it in at the charity tier and NPSP has nothing to offer.

---

### TIER 3 — Premium AI Features (Charge More)

#### 11. Predictive Sales Forecasting

The Forecasting page is built. Layer in AI:
- Weighted pipeline forecast vs. AI-adjusted forecast (AI accounts for rep bias and seasonal patterns)
- Deal risk signals: "This deal has 3 red flags — no engagement for 14 days, competitor mention in notes, budget freeze signal detected"
- Revenue variance analysis: Why actual vs. forecast diverged, with attribution
- "What-if" scenario modelling: What does pipeline look like in 90 days if we hire 2 more reps?

---

#### 12. AI HR Assistant

People module is deep — add intelligence:
- CV/resume parser: Upload CVs, AI extracts skills, experience, education, creates candidate record automatically
- Interview question generator based on job spec and candidate gaps identified
- Salary benchmarking: "This role pays £45k at similar-sized companies in your sector in London"
- Early resignation risk detection: Employee patterns correlated with voluntary churn flagged proactively

---

#### 13. ESG & Carbon Reporting

No mid-market platform has this. It's an emerging premium feature.

**What to build:**
- Scope 1/2/3 emissions tracking against business operations data
- Supply chain sustainability scoring (from supplier records already in Operations)
- ESG dashboard for annual reporting
- UK TCFD reporting templates (mandatory for large companies; aspiration for mid-market)

**Why it wins:** Required for government tenders. Growing regulatory requirement under UK Sustainability Disclosure Requirements. Premium feature that justifies a £50+/month module upgrade. Zero competitors at SMB tier have it.

---

#### 14. Territory & Quota Management

Gap in CRM versus Salesforce Enterprise:
- Geographic territory definition and rep assignment
- Quota setting per rep/team with attainment tracking dashboard
- Lead and deal routing rules based on territory
- Territory performance analytics (over/under quota by region)
- Commission calculation tied to quota attainment

---

#### 15. Multi-Entity Accounting

A major premium feature that unlocks a new customer segment entirely.

**What to build:**
- Multiple legal entities under one Orbas workspace
- Separate GL, P&L, Balance Sheet per entity
- Intercompany transactions with automatic elimination on consolidation
- Consolidated group reporting across all entities
- Shared chart of accounts with entity-specific overrides

**Why it wins:** Franchises, holding companies, group structures currently buy NetSuite or Sage 200 at £1,000+/month. The accounting foundation is already built — this extends it to serve a much higher-value customer segment.

---

## PART 4: FEATURES ORBAS HAS THAT COMPETITORS LACK

| Orbas Feature | Competitor Status |
|---|---|
| **Charity module (native, bundled)** | NPSP = £3k+/year add-on; nobody else at SMB pricing |
| **Compliance module (risk heat map, ISO 27001 controls)** | Enterprise-only at all competitors |
| **Automations (visual canvas workflow builder)** | HubSpot/Zoho: partial; usually Enterprise-only tier |
| **Connect (omnichannel: email, chat, social, routing)** | Freshdesk/Zendesk = entirely separate product |
| **Full double-entry accounting (ERPNext-grade)** | HubSpot = zero; Salesforce = zero |
| **Full HR (ATS, payroll, performance, LMS, engagement)** | HubSpot = zero; separate £50+/user/month tools |
| **Manufacturing / Operations / Supply Chain** | CRM platforms universally = zero |
| **Platform Admin (multi-tenant SaaS console)** | Only at Salesforce enterprise tier ($300+/user) |
| **Client Portal (white-label capable)** | Usually £200+/month enterprise add-on |
| **Quality Management (QMS)** | Enterprise ERP (SAP/NetSuite) only |
| **Field Service / Dispatch Board** | ServiceMax at £80+/user/month separately |

---

## PART 5: PRICING STRATEGY

Based on competitive analysis — the £40–£140/user/month band is the critical gap to own:

| Tier | Price | Modules Included | Target Customer |
|---|---|---|---|
| **Starter** | £39/user/mo | CRM, Basic Accounting, Invoicing | Solo, freelancers, <5 users |
| **Professional** | £79/user/mo | + HR, Projects, Service Desk, Connect, Analytics | 5–50 person teams |
| **Business** | £129/user/mo | + Operations, Compliance, Automations, Advanced Accounting | 50–200 person companies |
| **Enterprise** | Custom | + Multi-entity, White-label, SSO, MTD, Dedicated support | 200+ / enterprise / groups |

**Premium Add-Ons:**

| Add-On | Price |
|---|---|
| UK Compliance Pack (MTD, RTI, Companies House) | +£49/company/month |
| AI Copilot Advanced | +£19/user/month |
| E-Signature (unlimited docs) | +£29/company/month |
| Charity Bundle (Gift Aid, Donors, Volunteers, Impact) | +£39/company/month |
| Additional Legal Entity | +£99/entity/month |
| Open Banking feeds | +£19/company/month |

**Value vs. the alternative stack (20 users):**

| Current Customer Stack | Annual Cost |
|---|---|
| HubSpot Pro + QuickBooks + BambooHR + Freshdesk + Zapier | ~£25,000/year |
| Salesforce Standard + Xero + Sage HR + Zendesk | ~£40,000/year |
| **Orbas Business (20 users)** | **~£30,960/year** |
| **Saving vs. enterprise stack** | **£9,000+/year** |
| **Single data model, zero integration tax, UK compliance included** | |

---

## PART 6: PRIORITISED BUILD ROADMAP

### Next 4 Weeks — Highest Commercial Impact

1. **Companies House API integration** — unique, zero competition, massive UK value, free API
2. **MTD ITSA quarterly submission** — mandatory legal driver, primary acquisition magnet for UK market
3. **Open Banking / bank feed** (TrueLayer API) — makes accounting module actually useful vs. manual
4. **eSignature native** — eliminate DocuSign cost, table stakes for every business
5. **AI Copilot: document intelligence + NL CRM queries** — specific workflows, not generic chat

### Next 8 Weeks — Competitive Moat

6. Subscription/recurring revenue management
7. PAYE/RTI payroll engine (or integration with BrightPay/Payfit API)
8. Volunteer Management for Charity module — direct NPSP competitor
9. Proposal builder with open/view analytics
10. White-label client portal (custom domain support)
11. Multi-entity accounting skeleton

### Next 12 Weeks — Premium Tier Features

12. AI deal risk scoring + predictive forecasting
13. CV parser + interview intelligence (HR module)
14. Territory + quota management (CRM)
15. ESG/carbon reporting module
16. Tenant/subcontractor marketplace (Operations)
17. Scotland/Wales regional compliance parity

---

## PART 7: THE ORBAS MOAT

**In one sentence:** Orbas is the only UK-native platform that combines enterprise-grade CRM, ERPNext-grade accounting, full HRIS, project management, service desk, compliance, charity, and omnichannel messaging in a single data model — at a price point that makes the five-platform alternative stack look expensive.

**Five features that create genuine defensibility — none of which any competitor can replicate quickly:**

1. **MTD + Companies House native integration** — UK compliance built-in, not bolted-on
2. **Charity module (donation, gift aid, volunteer, impact)** — bundled at mid-market price; NPSP charges £3k+/year
3. **AI Copilot with document intelligence + NL business queries** — included in base, not £330+/user/month
4. **Single-data-model across CRM + Accounting + HR + Operations** — no integration tax, no data silos
5. **Compliance module with risk heat maps + ISO controls** — at SMB pricing; enterprise-only everywhere else

**Competitive positioning vs. each major rival:**

- **vs. Salesforce**: "Enterprise power at mid-market price; UK compliance without £50k implementation"
- **vs. HubSpot**: "Real accounting, real HR, real operations — not just CRM with expensive add-ons"
- **vs. Zoho**: "Beautiful modern design and UX; UK-first compliance; focused on quality not breadth"
- **vs. Odoo**: "Modern interface; cloud-native; no developer required to get started"
- **vs. Specialized Tools**: "Consolidate your entire tool stack; eliminate integration tax and data silos"

---

## APPENDIX: UK MARKET CONTEXT

### Regulatory Forcing Functions Driving Adoption (2026)

| Regulation | Requirement | Impact |
|---|---|---|
| MTD ITSA | Quarterly digital filing for £50k+ income | Mandatory software adoption wave |
| Companies Act 2006 | Annual accounts, confirmation statement | Companies House integration value |
| PAYE RTI | Monthly RTI payroll submissions to HMRC | Payroll module necessity |
| UK GDPR | Data residency, audit trails, deletion rights | Compliance module value |
| Charity Commission | Trustee accounts, annual returns, reserves policy | Charity module compliance features |
| TCFD (large companies) | Climate-related financial disclosures | ESG reporting module |
| UK Sustainability Disclosure | Scope 1/2/3 reporting for listed companies | Carbon tracking module |

### Market Size (UK)

- 160,000+ SMEs with 10–250 employees using fragmented multi-tool stacks
- 180,000+ registered charities (majority on spreadsheets or expensive legacy tools)
- 50,000+ professional services firms (agencies, consultancies) needing project billing
- 40,000+ manufacturing/operations businesses needing inventory + CRM in one system
- Total addressable market: Multi-billion; Orbas' serviceable segment (UK SMB, £1m–£100m turnover): £500m+ ARR opportunity

---

*Document version: 1.0 | June 2026 | Orbas Internal*
