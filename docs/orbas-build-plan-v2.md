# Orbas Platform — Complete Build Upgrade Plan v2.0
## 56-Step Level 1–9 Implementation Roadmap
*Strategic Plan | June 2026 | Internal Use Only*

---

## EXECUTIVE BRIEF

This document translates the competitive audit into an actionable, cost-conscious build plan. Every step is categorised by level (L1–L9), API cost impact, and whether it ships as core platform or paid add-on. The guiding principle: **build natively where the API is free or near-free; make it an add-on where ongoing per-message/per-transaction costs would eat margin at scale.**

---

## API COST STRATEGY — DECISION MATRIX

Before any step is planned, every external dependency is assessed:

### Category A — FREE, Build Native (No API cost)
| Service | API | Notes |
|---|---|---|
| Companies House | companies-house.gov.uk/developer/docs | Free, no approval, instant access |
| HMRC MTD (VAT/ITSA) | developer.service.hmrc.gov.uk | Free to register, free to call |
| HMRC RTI (Payroll) | Same HMRC developer portal | Free after software registration |
| Postcode lookup | postcodes.io | Completely free, no key |
| ECB Exchange Rates | sdw-wsrest.ecb.europa.eu | Free, no key |
| Gov.uk Bank Holidays | gov.uk REST API | Free |
| Charity Commission | api.charitycommission.gov.uk | Free |
| Land Registry (property lookup) | landregistry.data.gov.uk | Free |
| ONS Economic data | api.beta.ons.gov.uk | Free |
| PDF generation | react-pdf / browser print API | No cost — build in-app |
| eSignature | HTML5 Canvas + PDF embed | Build native, zero licensing |
| Email (transactional) | Resend (already in stack) | Generous free tier |
| PAYE tax calculations | HMRC published tables | Public data, build engine |
| Pension auto-enrolment | TPR rules are public | Build calculation engine |
| Exchange rates | exchangerate.host free tier | Free up to 250 req/month |
| AI Copilot | Claude API (Anthropic) | Cost-controlled per query |

### Category B — Low Cost, Build Native with Usage Cap
| Service | API | Cost | Strategy |
|---|---|---|---|
| Stripe payments | stripe.com | 1.5% + 20p | Per-transaction; pass-through |
| Open Banking read | TrueLayer free tier | Free to 500 calls/month | Free for most customers |
| Currency conversion | Open Exchange Rates | $12/month | Shared workspace cost |
| Email delivery | Resend Pro | $20/month base | Operational cost |
| Maps/postcode distance | Nominatim (OSM) | Free | No limits |

### Category C — ADD-ON Only (Cost too high for core)
| Service | API | Cost | Add-On Price |
|---|---|---|---|
| WhatsApp Business | Meta/360dialog | £50+/month + £0.005/msg | £29/month add-on |
| SMS | Twilio | ~£0.04/msg | £19/month add-on (500 SMS) |
| GoCardless Direct Debit | GoCardless | 1% + 20p per payment | £19/month add-on |
| Open Banking live feeds (high vol) | TrueLayer Pro | £200+/month | £29/month add-on |
| Video calling | Daily.co | $0.004/min | £25/month add-on |
| Background checks (DBS) | Yoti / uCheck | £15–40 per check | Add-on pass-through |
| Advanced e-ID verification | Sumsub / Jumio | £1–3 per check | Add-on pass-through |
| Bulk SMS marketing | Vonage | Per msg | Add-on bundle |
| Advanced AI (large context) | Claude Opus API | Higher per-token | AI Pro add-on |

### Category D — Skip Entirely (Too expensive / approval risk)
- Refinitiv/LexisNexis AML — enterprise licensing
- Rightmove/Zoopla listing API — requires estate agent accreditation
- Experian/Equifax credit scoring — FCA regulated
- Dun & Bradstreet — enterprise pricing
- SharePoint integration — Microsoft enterprise partner required

---

## LEVEL STRUCTURE

- **L1 — Strategic Initiative** (what and why)
- **L2 — Module Domain** (which section of the app)
- **L3 — Feature Cluster** (grouped capability area)
- **L4 — Feature Specification** (what exactly is built)
- **L5 — Technical Architecture** (how it connects)
- **L6 — Data Model** (tables, fields, relations)
- **L7 — UI/UX Specification** (page structure, components)
- **L8 — API & Integration Detail** (endpoints, payloads)
- **L9 — Test Criteria & Acceptance** (how we know it works)

---

# PHASE 1: UK COMPLIANCE ENGINE
*Steps 1–10 | Free APIs | Core Platform | Biggest Commercial Differentiator*

---

## STEP 1 — HMRC Developer Registration & MTD Infrastructure

**Level:** L1–L2 (Strategic + Architecture)
**Cost:** Free
**Ships as:** Core (UK Compliance Pack add-on: £49/company/month unlock)

### L1 — Strategic Rationale
MTD ITSA is mandatory for UK businesses with income >£50k. No CRM/ERP platform has this natively. This is Orbas' #1 acquisition driver for UK mid-market. Registration with HMRC as a software developer is free and required before any MTD API calls.

### L2 — Module
New sub-section under Accounting: `accounting/mtd/` + Settings integration

### L3 — Feature Cluster
HMRC OAuth2 authentication, software registration, sandbox testing environment, live environment approval

### L4 — Feature Specification
- HMRC OAuth2 flow: user connects their HMRC Government Gateway to Orbas
- Token storage in Supabase (encrypted) per workspace
- Sandbox test mode for development
- Live mode toggle (requires HMRC approval of production credentials — apply once for all customers)
- Workspace-level MTD status indicator in Admin Console

### L5 — Technical Architecture
```
User clicks "Connect to HMRC" →
  Redirect to HMRC auth URL (OAuth2 PKCE flow) →
  HMRC returns auth_code →
  Orbas server exchanges for access_token + refresh_token →
  Store encrypted in workspace_integrations table →
  All subsequent MTD calls use Bearer token
```

### L6 — Data Model
```sql
CREATE TABLE hmrc_connections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID REFERENCES workspaces(id),
  access_token TEXT, -- encrypted
  refresh_token TEXT, -- encrypted
  token_expires_at TIMESTAMPTZ,
  vrn TEXT, -- VAT Registration Number
  nino TEXT, -- for Self Assessment
  mtd_itsa_enrolled BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### L7 — UI
- Settings > Integrations > "HMRC" card with Connect button
- On connect: OAuth2 popup → callback → success state
- Status badge: Connected / Disconnected / Token Expired
- HMRC connection shows: name, UTR, VAT reg number

### L8 — API
```
POST https://api.service.hmrc.gov.uk/oauth/token
GET  https://api.service.hmrc.gov.uk/hello/user (test connection)
```

### L9 — Acceptance
- OAuth flow completes in <10 seconds
- Token stored encrypted, never exposed to client
- Auto-refresh before expiry
- Disconnection removes all tokens

---

## STEP 2 — MTD VAT Returns (Quarterly Filing)

**Level:** L3–L7
**Cost:** Free (HMRC API)
**Ships as:** UK Compliance Pack add-on

### L3 — Feature Cluster
VAT return calculation, 9-box VAT return, digital record-keeping compliance, submission

### L4 — Feature Specification
Calculate VAT 9-box return from accounting data:
- Box 1: VAT due on sales (output tax)
- Box 2: VAT due on acquisitions from EU
- Box 3: Total VAT due (Box 1 + Box 2)
- Box 4: VAT reclaimed (input tax)
- Box 5: Net VAT payable/reclaimable
- Box 6: Total value of sales, ex VAT
- Box 7: Total value of purchases, ex VAT
- Box 8: Total supplies to EU, ex VAT
- Box 9: Total acquisitions from EU, ex VAT

Features:
- Auto-populate all 9 boxes from GL entries tagged with VAT codes
- Manual adjustment with audit note required
- Preview before submission
- Submit digitally via HMRC MTD VAT API
- PDF copy generated and stored in Documents
- Submission history with HMRC confirmation number

### L5 — Technical Architecture
```
Accounting module GL → VAT-coded transactions →
  VAT return calculation engine (server action) →
  9-box preview page →
  User confirms →
  POST to HMRC MTD VAT API →
  Store HMRC receipt reference →
  PDF generated (react-pdf) →
  Auto-saved to Documents
```

### L6 — Data Model
```sql
CREATE TABLE vat_returns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID REFERENCES workspaces(id),
  period_key TEXT, -- e.g. "24AA" from HMRC
  period_start DATE,
  period_end DATE,
  due_date DATE,
  box1 DECIMAL(12,2), box2 DECIMAL(12,2), box3 DECIMAL(12,2),
  box4 DECIMAL(12,2), box5 DECIMAL(12,2), box6 DECIMAL(12,2),
  box7 DECIMAL(12,2), box8 DECIMAL(12,2), box9 DECIMAL(12,2),
  status TEXT DEFAULT 'draft', -- draft, submitted, accepted
  hmrc_confirmation_ref TEXT,
  submitted_at TIMESTAMPTZ,
  submitted_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### L7 — UI
`/app/accounting/tax/vat-returns` — list of periods with status badges
`/app/accounting/tax/vat-returns/[id]` — 9-box table, review, submit button
Colour coding: draft=amber, submitted=blue, accepted=green

### L8 — API
```
GET  /organisations/vat/{vrn}/obligations?from=&to=  (get open periods)
POST /organisations/vat/{vrn}/returns              (submit return)
GET  /organisations/vat/{vrn}/returns/{periodKey}  (retrieve submitted)
```

### L9 — Acceptance
- 9 boxes match manual calculation from GL data
- Submission returns 201 with confirmation receipt
- Period marked as filed with timestamp and user

---

## STEP 3 — MTD ITSA (Self Assessment Quarterly Updates)

**Level:** L4–L7
**Cost:** Free
**Ships as:** UK Compliance Pack add-on

### L4 — Feature Specification
ITSA quarterly update submissions for sole traders and landlords:
- 4 quarterly updates per tax year (Q1: Apr-Jun, Q2: Jul-Sep, Q3: Oct-Dec, Q4: Jan-Mar)
- Income and expenditure summary per business (self-employment or property)
- Final declaration at year-end replacing SA100
- Tax calculation request to HMRC
- Crystallisation (final year end submission)

Build:
- ITSA dashboard with obligation calendar
- Income sources management (multiple businesses/properties)
- Quarterly update wizard (income, expenses, allowances)
- Year-end final declaration workflow
- Tax estimate display (from HMRC calculation API)
- MTD readiness checker: "You have 12 days until Q2 is due. 3 transactions need categorising."

### L7 — UI
`/app/accounting/mtd` — MTD Dashboard
- Obligation calendar (4 Q's per year, colour-coded)
- Income sources list
- "Complete Q2 Update" CTA button
- Tax estimate card (updates after each quarterly submission)
- Penalty points tracker (HMRC points-based penalty system)

### L9 — Acceptance
- All 4 quarterly obligations shown from HMRC
- Quarterly update submission stores period-incomeSourceId
- Tax estimate displays correctly from HMRC crystallisation API
- Final declaration completes successfully in sandbox

---

## STEP 4 — PAYE Calculation Engine (Internal Build, No API Cost)

**Level:** L4–L8
**Cost:** Zero (HMRC publishes all tables freely each April)
**Ships as:** UK Compliance Pack add-on (£49/company/month)

### L4 — Feature Specification
Build a complete PAYE engine using HMRC-published rates:

**Tax calculation:**
- Personal allowance (£12,570 standard for 2025/26)
- Tax bands: Basic 20% (£12,571–£50,270), Higher 40% (£50,271–£125,140), Additional 45% (£125,141+)
- Scottish rates (SRIT) for Scottish employees (S prefix tax codes)
- Welsh rates (CRIT) for Welsh employees (C prefix tax codes)
- Tax code processing: L, M, N, T, 0T, BR, D0, D1, NT, K, P, V, X

**National Insurance:**
- Class 1 employee NI: 8% on £12,570–£50,270; 2% above
- Class 1 employer NI: 13.8% above secondary threshold (£9,100)
- NI letters: A (standard), B (married women), C (over state pension age), H (apprentice), J (deferment), M (under 21), X (exempt), Z (under 21 deferment)

**Auto-enrolment pension:**
- Qualifying earnings band (£6,240–£50,270)
- Minimum contributions: 5% employee (including 1% tax relief), 3% employer
- Opt-out tracking

**Statutory payments:**
- SSP: £116.75/week (6+ weeks service, earning above LEL)
- SMP: 90% for 6 weeks, then £184.03/week or 90% if lower
- SPP/ShPP: £184.03/week
- Student loan deductions: Plan 1 (9% above £24,990), Plan 2 (9% above £27,295), Plan 4 Scotland, Postgrad (6% above £21,000)

**P60 / P45 generation:**
- P60: Year-end summary (react-pdf)
- P45: On leaving employment

### L5 — Technical Architecture
```
Employee record (salary, tax code, NI letter, start date) +
  Pay period (weekly/monthly/4-weekly) →
    PAYE calculation engine (TypeScript pure function) →
      Gross pay → Tax → NI → Pension → Net pay →
        Payslip record stored →
          PDF payslip generated (react-pdf) →
            RTI FPS submitted to HMRC
```

### L6 — Data Model
```sql
CREATE TABLE payroll_runs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID,
  pay_period_start DATE,
  pay_period_end DATE,
  payment_date DATE,
  status TEXT DEFAULT 'draft', -- draft, calculated, approved, submitted
  rti_submission_ref TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE payslips (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  payroll_run_id UUID REFERENCES payroll_runs(id),
  employee_id UUID REFERENCES employees(id),
  gross_pay DECIMAL(10,2),
  taxable_pay DECIMAL(10,2),
  income_tax DECIMAL(10,2),
  employee_ni DECIMAL(10,2),
  employer_ni DECIMAL(10,2),
  employee_pension DECIMAL(10,2),
  employer_pension DECIMAL(10,2),
  student_loan DECIMAL(10,2),
  other_deductions DECIMAL(10,2),
  net_pay DECIMAL(10,2),
  tax_code TEXT,
  ni_letter CHAR(1),
  ytd_gross DECIMAL(10,2),
  ytd_tax DECIMAL(10,2),
  ytd_ni DECIMAL(10,2),
  pdf_url TEXT
);
```

### L8 — RTI API (Free HMRC API)
```
POST /rti/fps  — Full Payment Submission (each pay run)
POST /rti/eps  — Employer Payment Summary (monthly, if no payments)
POST /rti/nino-verification  — Verify employee NI numbers
```

### L9 — Acceptance
- Net pay calculation matches HMRC PAYE Calculator for 10 test employees
- Scottish/Welsh rates applied correctly by employee postcode
- RTI FPS submission accepted by HMRC test environment
- P60 PDF generated with all correct year-to-date figures

---

## STEP 5 — Companies House Integration

**Level:** L3–L7
**Cost:** Free (Companies House REST API — no approval needed, instant access)
**Ships as:** Core Platform

### L4 — Feature Specification
**CRM Account enrichment:**
- Type company number in account/contact form → instant company data import
- Fields populated: registered name, registered address, incorporation date, SIC codes, company status, directors list
- Directors auto-created as linked contacts with role "Director"

**Ongoing monitoring (optional):**
- Monitor key accounts for: new filings, director changes, accounts overdue, winding-up petitions, insolvency events
- Alert in notifications when monitored company has a filing

**Lead enrichment:**
- Type company number on Lead form → auto-populate company details
- "Verify company" button on any Account record

**Admin intelligence:**
- Search Companies House by name to find company number
- Show filing history (last 5 filings with links)
- Show persons with significant control (PSC)
- Show current and past directors

**Accounts filing reminders:**
- Confirmation statement due date (from Companies House data)
- Annual accounts due date
- Alert in dashboard 30 days before

### L5 — Technical Architecture
```
User types company number →
  GET api.company-information.service.gov.uk/company/{number} →
  Map response to CRM Account schema →
  Auto-populate form fields →
  User confirms →
  Store company_house_number on account record
  
Optional: Nightly CRON for monitored accounts →
  Check for new filings →
  Store in company_monitoring_events →
  Push notification if new event
```

### L6 — Data Model
```sql
ALTER TABLE accounts ADD COLUMN
  companies_house_number VARCHAR(8),
  companies_house_status TEXT, -- active, dissolved, liquidation etc.
  incorporation_date DATE,
  registered_address JSONB,
  sic_codes TEXT[],
  last_enriched_at TIMESTAMPTZ;

CREATE TABLE company_monitoring (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID,
  account_id UUID REFERENCES accounts(id),
  companies_house_number VARCHAR(8),
  monitor_filings BOOLEAN DEFAULT true,
  monitor_officers BOOLEAN DEFAULT true,
  monitor_insolvency BOOLEAN DEFAULT true,
  last_checked_at TIMESTAMPTZ
);
```

### L7 — UI
- Account form: "Company Number" field with 🔍 lookup button
- Lookup modal: search by name or number → shows result card → "Import" button
- Account detail: "Companies House" tab showing directors, filings, PSC, financial years
- CRM sidebar widget: "⚠️ Accounts overdue at TechCorp Ltd" notification

### L8 — API (Free)
```
GET /company/{company_number}                    — core data
GET /company/{company_number}/officers           — directors/secretary
GET /company/{company_number}/filing-history     — recent filings
GET /company/{company_number}/persons-with-significant-control
GET /search/companies?q={name}&items_per_page=5  — search
```

### L9 — Acceptance
- Company data populates all fields within 1 second
- Director list creates linked contacts correctly
- Dissolved companies shown with clear red warning banner
- Filing reminders appear in Home > Tasks at 30-day threshold

---

## STEP 6 — Native eSignature Engine

**Level:** L4–L8
**Cost:** Zero (HTML5 Canvas + PDF.js + react-pdf — all open source)
**Ships as:** Core Platform (3 docs/month free; unlimited in Business tier)

### L4 — Feature Specification
Build a fully native eSignature system — no DocuSign/HelloSign dependency:

**Document preparation:**
- Upload a PDF or choose a Document template
- Drag-and-drop signature fields onto pages (signature, initials, date, text input, checkbox)
- Assign each field to a signer (colour-coded per signer)
- Set signing order (sequential or parallel)

**Sending:**
- Add signers with name + email
- Customise invitation email message
- Set expiry date (default 14 days)

**Signer experience:**
- Email link → open secure signing page (no login required, one-time token)
- Draw signature with mouse/touch OR type name in cursive font
- Click each required field in sequence
- Final confirmation screen → email confirmation

**Completion:**
- All signatures collected → final PDF compiled with signature images embedded
- Completed PDF stored in Documents module
- Audit trail PDF generated: each signer IP, user agent, timestamp, geolocation (IP-based)
- Completion notification to sender

**Compliance:**
- eIDAS Simple Electronic Signature compliant (valid in UK + EU)
- Tamper-evident: SHA-256 hash of final document stored
- One-time signing tokens prevent replay

### L5 — Technical Architecture
```
Document uploaded → stored in Supabase Storage →
  Signature placement UI (react-pdf + custom overlay) →
  Save field positions as JSON →
  Create signature_request record →
  Send emails via Resend (one-time token per signer) →
  
Signer opens token URL →
  Verify token (one-use only) →
  Show PDF with field overlay →
  Capture signature (canvas) →
  POST {signature_data, field_values, ip, timestamp} →
  Mark signer complete →
  
All signers complete →
  PDF compilation (server-side react-pdf) →
  Embed all signatures into final PDF →
  Generate audit trail PDF →
  Store both in Documents →
  Notify sender
```

### L6 — Data Model
```sql
CREATE TABLE signature_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID,
  document_id UUID,
  title TEXT,
  message TEXT,
  expiry_date DATE,
  status TEXT DEFAULT 'draft', -- draft, sent, partial, completed, expired, voided
  completed_document_url TEXT,
  audit_trail_url TEXT,
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE signature_signers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  request_id UUID REFERENCES signature_requests(id),
  name TEXT,
  email TEXT,
  signing_order INTEGER,
  token TEXT UNIQUE, -- one-time secure token
  token_used_at TIMESTAMPTZ,
  status TEXT DEFAULT 'pending', -- pending, viewed, signed, declined
  signed_at TIMESTAMPTZ,
  ip_address TEXT,
  user_agent TEXT
);

CREATE TABLE signature_fields (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  request_id UUID REFERENCES signature_requests(id),
  signer_id UUID REFERENCES signature_signers(id),
  field_type TEXT, -- signature, initials, date, text, checkbox
  page_number INTEGER,
  x_percent DECIMAL(5,2), -- percentage position (responsive to PDF scale)
  y_percent DECIMAL(5,2),
  width_percent DECIMAL(5,2),
  height_percent DECIMAL(5,2),
  value TEXT -- filled in when signed
);
```

### L7 — UI
`/app/documents/signatures/new` — request wizard
- Step 1: Upload or choose template
- Step 2: Place fields (drag-drop on PDF preview)
- Step 3: Add signers, set order
- Step 4: Preview email + send

`/sign/[token]` — public signing page (no auth required)
- Full-page PDF viewer with field highlights
- Signature pad (canvas) in modal
- Progress: "2 of 3 fields completed"

`/app/documents/signatures/[id]` — status tracker
- Per-signer status timeline
- Download final signed document
- Void / resend options

### L9 — Acceptance
- PDF renders correctly with field overlays
- Signature canvas works on mobile (touch)
- Final compiled PDF has signatures visually embedded
- One-time token cannot be reused after signing
- Audit trail PDF shows correct IP + timestamps

---

## STEP 7 — HMRC Charity Commission Integration

**Level:** L4–L6
**Cost:** Free (Charity Commission API)
**Ships as:** Charity Module (core)

### L4 — Feature Specification
- Search charity by name or registration number
- Auto-import: registered name, charitable objects, income band, area of operation, trustee count
- Validate gift aid eligibility (charity must be HMRC-registered)
- Track Charity Commission annual return due dates (on behalf of customer)
- Alert: "Your Charity Commission annual return is due in 45 days"

### L8 — API
```
GET api.charitycommission.gov.uk/register/api/allcharities/search?term={name}
GET api.charitycommission.gov.uk/register/api/charitydetails/{regno}
```

### L9 — Acceptance
- Search returns matching charities within 2 seconds
- Annual return due date calculated and shown in dashboard
- Gift aid eligibility confirmed against HMRC status

---

## STEP 8 — Open Banking Read (Bank Feeds) — Add-On Architecture

**Level:** L4–L7
**Cost:** TrueLayer free tier (500 calls/month) = free for small customers; Add-on £19/month covers cost for larger
**Ships as:** **Bank Feeds Add-On** (£19/company/month)

### L4 — Feature Specification
**Core (free):** Manual CSV/OFX bank import (already built in Reconciliation)
**Add-On (£19/month):** Live Open Banking feeds via TrueLayer

Features with add-on active:
- Connect any UK bank (HSBC, Barclays, Lloyds, NatWest, Monzo, Starling, etc.)
- Transactions sync automatically every 6 hours (or on-demand)
- AI matching: each bank transaction → suggested invoice/bill match
- Auto-reconcile when match confidence >95%
- Unmatched transactions queue for manual review
- Multi-account support (current, savings, credit card)

**Why add-on:** TrueLayer charges per connection above free tier. The add-on price covers the API cost + margin. Free manual import remains available to all.

### L5 — Architecture
```
Customer enables add-on →
  TrueLayer OAuth consent flow (customer signs in to their bank) →
  Access token stored per bank connection →
  
Scheduled job every 6 hours →
  GET /data/v1/accounts/{id}/transactions?from={date} →
  Compare against existing bank_transactions →
  Insert new transactions →
  Run AI matching against open invoices/bills →
  
User reviews matches in Reconciliation workbench →
  Click "Accept all matches" → GL entries posted →
  Unmatched remain in review queue
```

### L9 — Acceptance
- HSBC, Barclays, Monzo, Starling all connect successfully
- 95%+ auto-match rate on straightforward invoice payments
- No duplicate transactions imported on repeat syncs

---

## STEP 9 — GoCardless Direct Debit — Add-On

**Level:** L4–L5
**Cost:** GoCardless charges 1% + 20p per payment (capped at £4)
**Ships as:** **Direct Debit Add-On** (£19/month + pass-through transaction fee)

### L4 — Feature Specification
- Set up Direct Debit mandate on customer record
- Collect invoice payments automatically on due date
- Failed payment retry logic (3 attempts over 7 days)
- Customer-facing: mandate setup page in Client Portal
- Reporting: collection success rate, failed mandates, total collected

### L5 — Architecture
```
Sales rep creates mandate on Account →
  Customer receives DD setup email →
  Customer fills GoCardless mandate form (hosted by GoCardless) →
  Mandate ID stored on account record →
  
Invoice created with "DD" payment method →
  On due date: POST /payments to GoCardless API →
  Webhook on success → auto-reconcile invoice →
  Webhook on failure → create task for account manager
```

### L9 — Acceptance
- Mandate creation sends email to customer correctly
- Payment collection posts on correct due date
- Failed payment generates follow-up task within 1 hour

---

## STEP 10 — Postcode Intelligence & UK Address Lookup

**Level:** L5–L7
**Cost:** Free (postcodes.io — unlimited, no API key)
**Ships as:** Core Platform

### L4 — Feature Specification
- Address autocomplete on any address field (Contact, Account, Employee, Supplier)
- Postcode → full address lookup (street, town, county, country)
- Distance calculations between two postcodes (for field service, delivery routing)
- Local authority / region detection (for territory management)
- Validate postcode format on save

### L8 — API
```
GET api.postcodes.io/postcodes/{postcode}           — full address data
GET api.postcodes.io/postcodes/{postcode}/autocomplete
GET api.postcodes.io/postcodes?q={term}             — partial search
POST api.postcodes.io/postcodes (bulk lookup)
```

---

# PHASE 2: CRM DEPTH UPGRADES
*Steps 11–18 | Minimal API Cost | Core Platform*

---

## STEP 11 — Territory & Quota Management

**Level:** L3–L7
**Cost:** Zero
**Ships as:** Business tier

### L4 — Feature Specification
- Define territories by: postcode prefix, region, county, country, or named area
- Assign sales reps to territories (one or many)
- Lead/deal auto-routing: new record assigned to territory rep based on account address
- Quota management:
  - Set quotas per rep/team (monthly, quarterly, annual in £ or unit count)
  - Quota attainment tracker: actual closed won vs. quota
  - Quota performance league table
  - Attainment % shown on rep profile and in Forecasting
- Commission calculation tied to attainment tiers (0-80%: 0%, 80-100%: 3%, 100%+: 5%)
- Territory performance map (using Leaflet.js — free, open source)

### L6 — Data Model
```sql
CREATE TABLE territories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID,
  name TEXT,
  type TEXT, -- postcode_prefix, region, county, country, custom
  definition JSONB, -- {"postcodes": ["SW", "SE", "E"], "regions": ["London"]}
  rep_ids UUID[] -- assigned reps
);

CREATE TABLE rep_quotas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  workspace_id UUID,
  period_start DATE,
  period_end DATE,
  quota_type TEXT, -- revenue, units
  quota_value DECIMAL(12,2),
  currency CHAR(3) DEFAULT 'GBP',
  attained_value DECIMAL(12,2) DEFAULT 0
);
```

### L7 — UI
`/app/crm/territories` — territory list + map view
`/app/crm/territories/[id]` — territory detail: reps, deals, pipeline value, lead count
Forecasting page: quota attainment bars per rep
Deal form: auto-assigned territory (editable)

---

## STEP 12 — Customer Health Scoring

**Level:** L3–L7
**Cost:** Zero (computed from internal data)
**Ships as:** Business tier

### L4 — Feature Specification
Compute a real-time health score (0–100) per Account from internal signals:

**Signals (all from existing Orbas data):**
- Payment behaviour: on-time payments +10, late payments -15, overdue >60 days -30
- Support: open tickets -5 each, high severity tickets -15, avg CSAT score (if <3.5: -20)
- Engagement: last contact <30 days +10, >90 days -15, >180 days -25
- Deal activity: active deals +10, deal at risk stage -10
- Contract: active contract +10, expiring <90 days -5, expired -20
- NPS: Promoter +15, Passive 0, Detractor -20

**Health bands:**
- 80–100: Healthy (green)
- 60–79: At Risk (amber)
- 40–59: Danger (orange)
- 0–39: Critical (red)

**Outputs:**
- Health score badge on every Account record
- Alerts: "3 accounts moved to Danger this week"
- Health trends chart (30/60/90 day history)
- At-Risk accounts list in CRM overview dashboard
- Health score filter in Accounts list

### L5 — Architecture
```
Supabase Edge Function: calculate_health_score(account_id) →
  Query: open_invoices, overdue_invoices, open_tickets, last_activity,
         active_deals, contracts, nps_scores →
  Apply weighting algorithm →
  Upsert account_health_scores table →
  
Trigger: recalculate on: invoice paid/overdue, ticket opened/closed,
         activity logged, contract changed, NPS response received
```

---

## STEP 13 — Proposal Builder with Analytics

**Level:** L4–L7
**Cost:** Zero
**Ships as:** Professional tier

### L4 — Feature Specification
Extend the Quotes module to full proposal capability:

**Builder:**
- Cover page with client name, your branding, date, proposal number
- Section builder: drag-drop sections (Executive Summary, Scope, Pricing, Terms, Team)
- Rich text editor per section (bold, bullets, images, tables)
- Embed the quote line-items table directly
- Client branding: use Account's logo if uploaded
- Template library: save and reuse proposal structures

**Sending:**
- Generate unique tracking URL
- Send via email (Resend) with "View Proposal" button
- Track: opened (timestamp), time spent reading, pages viewed, link forwarded

**Client actions from proposal:**
- Approve proposal (triggers deal stage → Verbal Commitment)
- Request revision (comment field → creates task for rep)
- Sign proposal (triggers eSignature flow for the proposal PDF)
- Decline (triggers deal → Lost with reason)

**Analytics:**
- Per-proposal: views, time spent, approval rate
- Portfolio: avg time to approval, most-viewed sections, win rate by proposal template

### L6 — Data Model
```sql
CREATE TABLE proposals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID,
  deal_id UUID REFERENCES deals(id),
  quote_id UUID REFERENCES quotes(id),
  title TEXT,
  sections JSONB, -- [{type, title, content}, ...]
  status TEXT DEFAULT 'draft',
  tracking_token TEXT UNIQUE,
  sent_at TIMESTAMPTZ,
  viewed_at TIMESTAMPTZ,
  view_count INTEGER DEFAULT 0,
  time_on_page_seconds INTEGER DEFAULT 0,
  approved_at TIMESTAMPTZ,
  declined_at TIMESTAMPTZ
);
```

---

## STEP 14 — Subscription & Recurring Revenue Management

**Level:** L4–L7
**Cost:** Zero (Stripe already in stack for payment processing)
**Ships as:** Professional tier

### L4 — Feature Specification
**Subscription products:**
- Mark any product as "subscription" with billing interval (monthly/quarterly/annual)
- Trial period support (N days free)
- Multiple pricing tiers per product

**Contract/subscription records:**
- Account → Subscriptions tab
- Show: plan, amount, billing date, status, renewal date
- Status: Active, Trialling, Past Due, Cancelled, Paused

**Recurring invoicing:**
- Auto-generate invoice on billing date
- Send to customer via email
- Dunning sequence on payment failure:
  - Day 0: Payment failed notification
  - Day 3: Reminder
  - Day 7: Final warning
  - Day 14: Subscription paused, account flagged

**MRR/ARR Dashboard** (new Analytics widget):
- Total MRR (sum of active monthly subscriptions)
- ARR = MRR × 12
- Net Revenue Retention (NRR): expansion - contraction - churn
- Churn rate: cancelled subscriptions / total subscriptions
- New MRR this month (new starts)
- Expansion MRR (upgrades)
- Contraction MRR (downgrades)
- Churned MRR (cancellations)
- MRR movement waterfall chart (Recharts)

### L6 — Data Model
```sql
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID,
  account_id UUID REFERENCES accounts(id),
  product_id UUID REFERENCES products(id),
  plan_name TEXT,
  amount DECIMAL(10,2),
  currency CHAR(3) DEFAULT 'GBP',
  billing_interval TEXT, -- monthly, quarterly, annual
  current_period_start DATE,
  current_period_end DATE,
  trial_end DATE,
  status TEXT DEFAULT 'active',
  stripe_subscription_id TEXT,
  cancelled_at TIMESTAMPTZ,
  cancellation_reason TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE mrr_snapshots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID,
  snapshot_date DATE,
  total_mrr DECIMAL(12,2),
  new_mrr DECIMAL(12,2),
  expansion_mrr DECIMAL(12,2),
  contraction_mrr DECIMAL(12,2),
  churned_mrr DECIMAL(12,2)
);
```

---

## STEP 15 — AI Lead Scoring & Qualification

**Level:** L4–L6
**Cost:** Claude API (Anthropic) — small per-query cost, bundled in AI Copilot tier
**Ships as:** AI Copilot add-on (£19/user/month)

### L4 — Feature Specification
**Scoring factors (computed from internal data — no external API):**
- Company size match (vs. ICP definition)
- Industry match score
- Email domain quality (no free email providers for B2B leads)
- Engagement score (email opened, website visits if connected, calls logged)
- Time in pipeline (fresh vs. stale)
- Budget indicators (deal value entered)
- Seniority of contact
- Number of contacts at the company

**AI Qualification (Claude API):**
- When a note, email, or call transcript is added to a lead → Claude reads it
- Claude scores: pain expressed (1–5), urgency (1–5), budget (1–5), authority (1–5)
- Generates 2-line qualification summary
- Suggests next best action: "Schedule discovery call — strong BANT signals"
- Flags leads that should be disqualified: "No budget authority — escalate to Finance Director"

**UI:**
- Score badge (1–10) on every lead/deal card
- Score breakdown tooltip (hover)
- Leads sorted by score by default
- AI qualification card on lead detail page
- Weekly digest: "Your 5 hottest leads this week"

---

## STEP 16 — Deal Intelligence & Risk Signals

**Level:** L4–L7
**Cost:** Claude API (bundled in AI Copilot)
**Ships as:** AI Copilot add-on

### L4 — Feature Specification
Continuously monitor every open deal and surface risk signals:

**Risk signals (no API cost — internal data):**
- No activity logged in >14 days → "⚠️ Stalled"
- Deal closing date passed without update → "⚠️ Overdue close date"
- Stage has not moved in >21 days → "⚠️ Stuck in stage"
- Multiple contacts at account but no champion identified → "⚠️ No champion"
- Deal value changed downward → "⚠️ Downgraded"
- Competitor mentioned in notes → "⚠️ Competitor threat"
- Contact job title changed (from Companies House / manual) → "⚠️ Champion left"

**AI insight (Claude — per query, low cost):**
- Weekly: summarise all open deals with risk level and recommended action
- Per deal: "Based on the history of this deal, what is the most likely outcome?"
- Win likelihood prediction: trained on your own win/loss history

**UI:**
- Deal card: risk badge (🟢 On Track / 🟡 At Risk / 🔴 Action Needed)
- Pipeline kanban: risk filter (show only at-risk deals)
- Deal detail: AI insights panel on Overview tab
- Manager view: "Deals at risk this week" table

---

## STEP 17 — Partner / Channel Management

**Level:** L4–L6
**Cost:** Zero
**Ships as:** Business tier

### L4 — Feature Specification
- Account type: "Partner" in addition to Customer/Prospect
- Partner tier: Silver / Gold / Platinum with defined benefits
- Deals sourced by partner → attributed to partner with partner commission %
- Partner performance dashboard: deals submitted, won, total value, commission earned
- Partner portal (extend Client Portal with partner-specific views):
  - Submit a deal (deal registration)
  - Track deal status
  - View commission statements
  - Download marketing resources

---

## STEP 18 — Multi-Currency (International Sales)

**Level:** L4–L6
**Cost:** ECB rate feed is free (daily rates) or exchangerate.host free tier
**Ships as:** Business tier

### L4 — Feature Specification
- Add currency to deal, invoice, quote (USD, EUR, AUD, CAD + 30 others)
- Reporting currency = GBP (configured per workspace)
- Auto-fetch exchange rates daily (ECB API — free)
- Historical rates stored for accurate reporting
- P&L, Balance Sheet show GBP equivalent with fx gain/loss line
- Invoice in customer's currency; record in base currency

---

# PHASE 3: AI COPILOT EXPANSION
*Steps 19–23 | Claude API | AI Add-On (£19/user/month)*

---

## STEP 19 — Document Intelligence (AI Data Extraction)

**Level:** L4–L7
**Cost:** Claude API per document processed (~£0.01–0.05 per doc)
**Ships as:** AI Copilot add-on

### L4 — Feature Specification
**Invoice AI extraction:**
- Upload any PDF invoice → Claude reads it → extracts: supplier, date, invoice number, line items, amounts, VAT, total
- Pre-populates bill entry form — user just confirms
- Accuracy: typically >90% on standard invoice formats

**Contract AI extraction:**
- Upload contract PDF → Claude extracts: parties, effective date, term, payment terms, break clauses, renewal date, governing law
- Creates contract summary card attached to Account
- Extracts and creates calendar reminders for: renewal date, break clause windows, review dates

**CV / Resume parsing (HR module):**
- Upload candidate CV → Claude extracts: name, email, phone, skills, experience (dates, employers, titles), education
- Creates candidate record in ATS automatically
- Skills matching: compare to job spec, highlight gap %

**Certificate extraction (Compliance module):**
- Upload Gas Safety, EICR, EPC, ISO certificate →
- Claude extracts: property/company, issue date, expiry date, result, issuing body
- Auto-creates compliance record with expiry alert

### L5 — Architecture
```
User uploads file (PDF/DOCX) to Documents →
  Trigger: doc_type tagged as invoice/contract/cv/certificate →
  Edge Function: extract_with_ai(doc_id, doc_type) →
    Fetch file from Supabase Storage →
    Encode to base64 or extract text via pdf-parse →
    Claude API call with structured extraction prompt →
    Parse JSON response →
    Pre-populate target form or create record →
  Return: extracted_fields JSON
```

### L9 — Acceptance
- Invoice extraction: 90%+ accuracy on supplier/amount/date
- Contract: renewal date extracted correctly for 95% of standard contracts
- CV parsing: name + email correct 100%, skills >80%
- Processing time: <15 seconds per document

---

## STEP 20 — Natural Language Business Queries

**Level:** L4–L7
**Cost:** Claude API per query
**Ships as:** AI Copilot add-on

### L4 — Feature Specification
Users type natural language questions; Claude translates to structured queries and returns answers:

**CRM queries:**
- "Show me all deals over £50k stalled in Proposal stage for more than 3 weeks"
- "Which contacts at TechCorp have we not spoken to in 60 days?"
- "What's our pipeline value for Q3 by rep?"

**Accounting queries:**
- "What's our cash position today?"
- "Which invoices are overdue by more than 90 days?"
- "What did we spend on software last quarter?"

**HR queries:**
- "Who has more than 5 days of approved leave in August?"
- "Which employees are due for performance review in the next 30 days?"

**Implementation:**
- Claude maps NL query to structured filters/parameters
- Execute safe read-only Supabase query
- Return formatted answer with clickable results list
- Follow-up: "Would you like to export this as a CSV?"

### L9 — Acceptance
- 10 test queries covering all modules return correct results
- No data modification possible through NL query (read-only)
- Incorrect queries return helpful "I couldn't find that — try..." message

---

## STEP 21 — Meeting Notes → CRM Actions

**Level:** L4–L6
**Cost:** Claude API per processing
**Ships as:** AI Copilot add-on

### L4 — Feature Specification
- User pastes meeting notes (or future: connects Google Meet/Teams transcript)
- Claude extracts: action items, deal updates, contact info mentioned, follow-up date
- Creates: tasks for each action item (assigned to named person), activity log entry, deal stage update if mentioned, contact record if new person named
- User reviews suggested actions in confirmation modal before committing
- "Apply all" or selectively apply each extracted action

---

## STEP 22 — AI Email Composer

**Level:** L4–L6
**Cost:** Claude API per generation
**Ships as:** AI Copilot add-on

### L4 — Feature Specification
Available from: any email compose window in CRM, Service, Connect

**Modes:**
- **Reply draft**: Given a received email, draft a professional response
- **Follow-up**: Given deal context + last contact, draft a follow-up
- **Cold outreach**: Given contact + account info, draft personalised intro
- **Proposal cover**: Given deal details, draft a proposal covering email

**Controls:**
- Tone selector: Formal / Professional / Friendly / Urgent
- Length: Short (3 lines) / Medium (paragraph) / Full (multi-section)
- Insert into email body with one click
- Edit before sending

---

## STEP 23 — AI Weekly Digest & Anomaly Alerts

**Level:** L4–L6
**Cost:** Claude API (once per week per workspace — negligible)
**Ships as:** AI Copilot add-on

### L4 — Feature Specification
Every Monday morning, email + in-app notification with:
- "5 deals at risk this week" (with clickable links)
- "3 customers moved to health score Danger" 
- "Your pipeline value dropped £125k — 2 deals marked lost"
- "2 invoices are 90+ days overdue — total £8,400"
- "4 employees have leave requests awaiting approval"
- "Q2 VAT return due in 8 days — £3,240 owed"
- "Performance reviews due for 3 employees this month"

Anomaly detection (threshold-based, no AI cost):
- Cash flow drops >20% week-on-week → alert
- Overdue debtors increases >15% → alert
- Deal pipeline drops >25% → alert
- Response time SLA breach rate increases → alert

---

# PHASE 4: DOCUMENTS & eSignature PLATFORM
*Steps 24–26*

---

## STEP 24 — Document Template Engine

**Level:** L4–L7
**Cost:** Zero
**Ships as:** Professional tier

### L4 — Feature Specification
Build a template editor for business documents:

**Template types:**
- Contracts (NDA, Service Agreement, Employment Contract)
- Proposals (already covered in Step 13)
- Invoices (custom invoice layout)
- Letters (formal correspondence)
- HR documents (offer letters, disciplinary letters, P45)

**Template variables (auto-populated from CRM data):**
- `{{contact.name}}`, `{{account.name}}`, `{{deal.value}}`, `{{date.today}}`
- `{{employee.name}}`, `{{employee.start_date}}`, `{{payslip.gross_pay}}`

**Editor:**
- Rich text editor (TipTap — open source)
- Variable picker sidebar
- Preview with live data from a selected record
- PDF preview before generating

**Usage:**
- "Generate Document" from any: Deal, Contact, Account, Employee record
- Document appears in Documents module linked to the source record

---

## STEP 25 — Document Version History

**Level:** L4–L6
**Cost:** Zero (Supabase Storage versioning)
**Ships as:** Professional tier

### L4 — Feature Specification
- Every document save creates a version record
- Version list: date/time, author, change description (optional)
- Restore any previous version
- Compare: visual diff between two versions (text documents)
- Lock a version: prevent further edits (e.g. signed contract)
- Version chain visible on document detail page

---

## STEP 26 — Contract Lifecycle Management (CLM)

**Level:** L4–L7
**Cost:** Zero
**Ships as:** Business tier

### L4 — Feature Specification
Full contract lifecycle from creation to expiry:
- Contract types: Customer, Supplier, Employment, NDA, SLA, Lease, Partnership
- Status lifecycle: Draft → Legal Review → Awaiting Signature → Active → Expired / Renewed / Terminated
- Key date tracking: start, end, renewal window (auto-alert 60/30/7 days before)
- Auto-renewal flag with alert: "Contract auto-renews in 14 days unless cancelled"
- Obligation tracking: contractual commitments with due dates (e.g. "Deliver report by Q2")
- Contract value and payment schedule
- Linked to: Account, Contact, Deal, Supplier

**CLM Dashboard:**
- Active contracts count + total value
- Expiring this month (list)
- Contracts pending signature (link to eSignature module)
- Auto-renewals approaching (action required)

---

# PHASE 5: CHARITY MODULE DEPTH
*Steps 27–30*

---

## STEP 27 — Volunteer Management

**Level:** L4–L7
**Cost:** Zero
**Ships as:** Charity Module (core)

### L4 — Feature Specification
- Volunteer records linked to Contact (type = "Volunteer")
- Skills and interests profile
- Availability preferences (days/times)
- Volunteer roles: defined roles in each campaign/programme
- Shift scheduling: assign volunteers to specific shifts
- Volunteer portal (extend Client Portal): view shifts, log hours, update availability
- Hour tracking: log hours per shift, cumulative total per volunteer
- Volunteer communications: shift reminders via email (Resend — free)
- DBS check tracking: expiry date, check type, renewal reminder
- Impact reporting: total volunteer hours × estimated value (£10.90/hour NCVO rate)
- Volunteer recognition: milestones (100 hours, 1-year anniversary)

---

## STEP 28 — Gift Aid Submission (HMRC)

**Level:** L4–L7
**Cost:** Free (HMRC Charity Online API — free for registered charities)
**Ships as:** Charity Module

### L4 — Feature Specification
- Mark donations as Gift Aid eligible (donor must have made declaration)
- Gift Aid declaration management: record when given, expiry (4 years)
- Calculate reclaim value: 25p per £1 donated
- Aggregate eligible donations into HMRC claim submission period
- HMRC Charity Online API: submit R68 claim digitally
- Track claim status: submitted → received → paid
- Generate Schedule spreadsheet (required by HMRC) showing donor details

---

## STEP 29 — Impact Measurement Framework

**Level:** L4–L7
**Cost:** Zero
**Ships as:** Charity Module

### L4 — Feature Specification
- Define outcome indicators: what change does the charity achieve?
- Link donations/grants to funded programmes
- Track programme outputs: beneficiaries reached, sessions delivered, activities completed
- Outcomes measurement: short-term (1-3 months), medium-term (3-12 months), long-term (1+ year)
- Evidence types: surveys, case studies, external evaluations
- Social Return on Investment (SROI) calculator: estimated £ social value per £ invested
- Funder reporting template: auto-populate programme report from data
- Impact dashboard: lives changed, geographic reach, demographic breakdown

---

## STEP 30 — Pledge & Instalment Management

**Level:** L4–L6
**Cost:** Zero (Stripe for collection)
**Ships as:** Charity Module

### L4 — Feature Specification
- Pledge record: donor commits to £X over Y months
- Instalment schedule auto-generated
- Collection: GoCardless Direct Debit (add-on) or manual
- Payment tracking: fulfilled vs. outstanding vs. overdue
- Pledge completion: full payment received → generate acknowledgement
- Partial fulfilment: donor pays some but not all → handling rules
- Legacy pledges: "I will leave X% of my estate" — record and track

---

# PHASE 6: ANALYTICS & REPORTING UPGRADES
*Steps 31–34*

---

## STEP 31 — Drag-Drop Dashboard Builder

**Level:** L4–L7
**Cost:** Zero (@dnd-kit already in stack)
**Ships as:** Business tier

### L4 — Feature Specification
- Any analytics dashboard is editable
- Widget library: KPI card, bar chart, line chart, pie/donut, table, funnel, gauge, text block, image
- Drag widgets onto grid, resize, reorder
- Widget configuration: data source, filters, date range, display options
- Share dashboard: public link (read-only) or internal only
- Schedule email delivery: daily/weekly PDF of dashboard via Resend
- Dashboard templates: pre-built for CRM, Finance, HR, Service, Charity

---

## STEP 32 — Report Builder (no-code)

**Level:** L4–L7
**Cost:** Zero
**Ships as:** Business tier

### L4 — Feature Specification
- Choose data source: Deals, Contacts, Invoices, Employees, Donations, etc.
- Add columns from all related tables (e.g. Deal + Account + Rep + Stage)
- Filters: field = value, field > value, date ranges, multi-select
- Grouping: group by field (e.g. group deals by Stage)
- Aggregations: sum, average, count, min, max per group
- Sort: multi-column sort
- Save as named report
- Schedule delivery: send CSV by email on schedule
- Export: CSV, Excel, PDF

---

## STEP 33 — ESG & Carbon Reporting Module

**Level:** L4–L7
**Cost:** Zero (UK Government publishes emission conversion factors free)
**Ships as:** Business tier / Compliance Pack

### L4 — Feature Specification
Using DEFRA/HMRC published emission conversion factors (updated annually, free):

**Scope 1 (direct emissions):**
- Company vehicles: mileage × fuel type emission factor
- Company offices: gas/electricity consumption × grid intensity factor

**Scope 2 (purchased electricity):**
- Electricity meters (kWh input) × UK grid carbon intensity (g/kWh — free from National Grid ESO)

**Scope 3 (value chain, selected categories):**
- Business travel: flights, hotels (DEFRA factors)
- Employee commuting (survey-based estimate)
- Purchased goods/services (spend-based method using EXIOBASE factors — public)
- Supply chain (from supplier records if suppliers report their own emissions)

**Reporting:**
- Annual carbon footprint report (tonnes CO₂e)
- Scope 1/2/3 breakdown chart
- Year-on-year comparison
- Reduction targets: set target, track progress
- TCFD-aligned narrative report template
- Export: PDF annual report, GHG protocol spreadsheet

---

## STEP 34 — Scheduled Reports & Automated Delivery

**Level:** L4–L5
**Cost:** Resend (already in stack — free tier)
**Ships as:** Professional tier

### L4 — Feature Specification
- Any saved report or dashboard can be scheduled
- Frequency: daily, weekly (specify day), monthly (specify date), quarterly
- Recipients: internal users or external email addresses
- Format: inline HTML email, PDF attachment, CSV attachment
- Conditional delivery: "only send if value X > threshold Y"
- Delivery log: history of sends with status

---

# PHASE 7: PEOPLE / HR DEPTH
*Steps 35–38*

---

## STEP 35 — Shifts & Rota Management

**Level:** L4–L7
**Cost:** Zero
**Ships as:** Professional tier (HR module)

### L4 — Feature Specification
- Define shift patterns: named shifts (Morning 8–4, Evening 4–12, Night 12–8)
- Weekly rota builder: drag employees onto shifts in a weekly calendar grid
- Publish rota: employees see their upcoming shifts in the People portal
- Shift swap requests: employee requests swap → manager approves
- Absence impact: if leave approved, flag shift as unstaffed → find cover
- Overtime calculation: hours above contracted hours flagged for payroll
- Rota templates: save and re-apply standard week

---

## STEP 36 — Benefits Management

**Level:** L4–L6
**Cost:** Zero
**Ships as:** Professional tier

### L4 — Feature Specification
- Benefits catalogue: define available benefits (health insurance, dental, gym, cycle-to-work, childcare vouchers)
- Employee benefits profile: which benefits each employee is enrolled in
- Cost tracking: employer cost per employee per benefit
- Flexible benefits: employees choose from a budget (optional)
- P11D tracking: benefits in kind that must be reported to HMRC
- Benefits renewal: annual renewal window with opt-in/out workflow
- Benefits summary in payslip: value of total package (salary + benefits)

---

## STEP 37 — Absence & Wellbeing

**Level:** L4–L6
**Cost:** Zero
**Ships as:** Professional tier

### L4 — Feature Specification
- Bradford Factor calculation (absence frequency × absence frequency × total days)
- Absence trigger alerts: "John has reached Bradford Factor 150 — requires meeting"
- Return to work interview tracking: logged after each absence period
- Wellbeing check-in surveys: pulse surveys sent weekly/monthly
- Wellbeing trends: team aggregate data (anonymous)
- EAP (Employee Assistance Programme) information page: links, contacts, resources

---

## STEP 38 — Workforce Planning

**Level:** L4–L6
**Cost:** Zero
**Ships as:** Business tier

### L4 — Feature Specification
- Headcount plan: target headcount per department by month
- Hiring plan: open roles needed, expected start dates
- Budget vs. actual: planned salary cost vs. current payroll
- Attrition modelling: predict leavers based on tenure/satisfaction signals
- Org chart planning: drag-and-drop future structure
- Skills gap analysis: required skills for planned roles vs. existing workforce

---

# PHASE 8: OPERATIONS & SERVICE UPGRADES
*Steps 39–42*

---

## STEP 39 — Inventory Demand Forecasting

**Level:** L4–L6
**Cost:** Zero (computed from internal sales data)
**Ships as:** Business tier

### L4 — Feature Specification
- Sales velocity per product: units sold per week/month trend
- Reorder point calculation: lead time × daily usage rate + safety stock
- Auto-generate purchase orders when stock drops below reorder point
- Seasonal adjustment: detect seasonal patterns in sales history
- Supplier lead time tracking: average days from PO to receipt
- Stockout risk alerts: "Item SKU-4421 will run out in 8 days at current velocity"

---

## STEP 40 — Service CSAT & NPS Automation

**Level:** L4–L6
**Cost:** Resend for email delivery (already in stack)
**Ships as:** Professional tier

### L4 — Feature Specification
**CSAT (Customer Satisfaction) on ticket close:**
- Auto-send CSAT survey email 2 hours after ticket closed
- 5-star rating + optional comment
- Score stored against ticket and agent
- Agent CSAT leaderboard
- Low CSAT (1-2 stars) creates follow-up task for team lead

**NPS (Net Promoter Score) quarterly:**
- Quarterly survey email to all active contacts
- Single 0–10 score question + follow-up "why?"
- Classify: Promoter (9–10), Passive (7–8), Detractor (0–6)
- NPS = % Promoters − % Detractors
- Trend chart over time
- Detractor follow-up workflow: create high-priority task

---

## STEP 41 — Advanced SLA Management

**Level:** L4–L7
**Cost:** Zero
**Ships as:** Professional tier

### L4 — Feature Specification
- SLA policies: define by tier (e.g. Enterprise: 1hr response, 4hr resolve; Standard: 4hr/24hr)
- SLA assignment: auto-assign policy based on: account tier, ticket type, priority
- SLA clock: pause when waiting on customer, resume when customer responds
- Breach prediction: "This ticket will breach SLA in 45 minutes" (in-app + email alert)
- Escalation rules: if SLA breached → auto-reassign, notify manager, raise priority
- SLA reporting: breach rate by team, agent, ticket type, period
- SLA dashboard widget on Service overview

---

## STEP 42 — Field Service Scheduling Board (Operations)

**Level:** L4–L7
**Cost:** Zero (Leaflet.js for map — free open source)
**Ships as:** Business tier (Operations module)

### L4 — Feature Specification
- Dispatcher view: split-screen — map (Leaflet) + technician list
- Job cards plotted on map with status colours
- Technician locations (manually updated or GPS if mobile app added later)
- Drag job from unassigned queue → drop onto technician → assigned
- Optimised route suggestion: given today's jobs for a tech, suggest efficient order (using postcodes.io distance API — free)
- Job status flow: Assigned → En Route → On Site → Completed
- Customer notification: "Your technician is 30 minutes away" (email via Resend)
- Time tracking: auto-start timer when "On Site" status set

---

# PHASE 9: ADD-ON ARCHITECTURE & PLATFORM
*Steps 43–47*

---

## STEP 43 — Add-On Marketplace Framework

**Level:** L2–L5
**Cost:** Zero (internal platform feature)
**Ships as:** Core platform infrastructure

### L4 — Feature Specification
Build the internal add-on infrastructure that all paid add-ons use:

**Add-on registry:**
- Each add-on has: id, name, description, price (monthly/annual), features list, setup_url, icon
- Add-ons stored in workspace_addons table with enabled/disabled state
- Billing integration: enabling an add-on adds line item to workspace subscription

**Admin Console > Add-ons page:**
- Cards for each available add-on
- Price displayed
- "Enable" → billing confirmation modal → Stripe subscription update
- "Disable" → confirmation → stops billing at period end, disables feature flags

**Feature flags:**
- Each premium feature has a flag: `feature_bank_feeds`, `feature_whatsapp`, `feature_sms`, etc.
- All add-on features check flag before rendering
- Graceful degradation: if add-on disabled, show upgrade prompt not blank space

### L6 — Data Model
```sql
CREATE TABLE addon_catalog (
  id TEXT PRIMARY KEY, -- e.g. "bank_feeds", "whatsapp", "sms"
  name TEXT,
  description TEXT,
  monthly_price DECIMAL(8,2),
  annual_price DECIMAL(8,2),
  stripe_price_id_monthly TEXT,
  stripe_price_id_annual TEXT,
  category TEXT -- compliance, communications, finance, hr, intelligence
);

CREATE TABLE workspace_addons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID REFERENCES workspaces(id),
  addon_id TEXT REFERENCES addon_catalog(id),
  enabled_at TIMESTAMPTZ,
  disabled_at TIMESTAMPTZ,
  stripe_subscription_item_id TEXT,
  is_active BOOLEAN GENERATED ALWAYS AS (
    enabled_at IS NOT NULL AND 
    (disabled_at IS NULL OR disabled_at > NOW())
  ) STORED
);
```

---

## STEP 44 — WhatsApp Business Integration (Add-On)

**Level:** L4–L7
**Cost:** Meta/360dialog — £50+/month + £0.005/message (hence add-on)
**Ships as:** **WhatsApp Add-On (£29/month)** — offsets API cost

### L4 — Feature Specification
**When add-on enabled:**
- Connect via 360dialog (WhatsApp Business API reseller — simpler approval than direct Meta)
- Phone number registration (use workspace's existing WhatsApp Business number)

**CRM integration:**
- Contact record: "Send WhatsApp" button
- Message thread view in Contact timeline
- All messages stored and searchable
- Template messages: WABA requires pre-approved templates for outbound messages
  - "Hi {{name}}, this is {{agent}} from {{company}}. Your ticket {{ticket_id}} has been updated."
  - "Invoice {{inv_num}} is due on {{date}}. Pay here: {{link}}"
  - "Your proposal has been shared: {{link}}"

**Connect module:**
- WhatsApp channel in unified inbox
- Incoming messages appear in inbox with WhatsApp icon
- Assign to agent, reply from inbox
- Customer service conversations via WhatsApp

**Service module:**
- WhatsApp ticket creation: customer sends message → creates ticket
- Resolution notification via WhatsApp

**Why 360dialog not direct Meta:** 360dialog has a managed onboarding process that takes 1–2 weeks, not months. Their API is compatible with Meta. Business verification required once.

### L9 — Acceptance
- Message delivery confirmed via webhook
- All messages stored in audit trail
- Template messages approved by Meta before use
- GDPR: WhatsApp conversations stored with consent record

---

## STEP 45 — SMS Notifications (Add-On)

**Level:** L4–L5
**Cost:** Twilio — £0.04/msg (hence add-on)
**Ships as:** **SMS Add-On (£19/month includes 500 SMS)**

### L4 — Feature Specification
**Available triggers for SMS (configured in Automations):**
- Invoice due reminder (3 days before)
- Invoice overdue notification
- Appointment/meeting reminder (1 hour before)
- Service ticket status update
- Payslip available notification
- Password reset (2FA)
- Stock alert (inventory below reorder)

**Not for marketing bulk SMS** — that requires separate ICO registration and is a different product category. These are all transactional notifications.

**Twilio Verify for 2FA:**
- Replace email OTP with SMS OTP option on MFA settings
- Twilio Verify: £0.05 per verification (very low volume)

---

## STEP 46 — Video Calling Integration (Add-On)

**Level:** L4–L5
**Cost:** Daily.co — $0.004/min participant (hence add-on)
**Ships as:** **Video Add-On (£25/month)**

### L4 — Feature Specification
- "Start Video Call" button on: Contact record, Deal, Service ticket
- Embedded video room opens in modal or new tab
- Customer/client receives email invite with join link (no account required)
- Recording available (stored in Documents module)
- After call: auto-log activity on CRM record with duration + notes prompt
- Scheduled meetings: create video meeting → add to calendar → send invite

**Why Daily.co not Zoom API:** Daily.co has no monthly minimum, simple embed API, affordable per-minute. Zoom API requires Enterprise plan access and is complex to implement.

---

## STEP 47 — Advanced Open Banking (Add-On)

**Level:** Already covered in Step 8**
**Ships as:** Bank Feeds Add-On (£19/month)

Architectural note: the bank feed integration uses TrueLayer's free tier for workspaces with <500 API calls/month. Larger workspaces auto-prompt to enable the add-on which covers the higher TrueLayer tier cost.

---

# PHASE 10: PORTAL & WHITE-LABEL
*Steps 48–50*

---

## STEP 48 — White-Label Client Portal (Custom Domain)

**Level:** L4–L7
**Cost:** Vercel custom domain (free per domain); or Cloudflare proxying (free)
**Ships as:** Business tier

### L4 — Feature Specification
- Workspace setting: "Custom Portal Domain" → input `portal.clientname.com`
- DNS: client adds CNAME record pointing to Orbas portal infrastructure
- SSL: auto-provisioned via Let's Encrypt (free)
- Portal login page shows: workspace logo, brand colours, custom domain
- Email invitations from portal@clientname.com (Resend allows custom sender domains — free)
- Completely removes all Orbas branding (white-label mode)
- Client sees: their company name + logo throughout

**Branding controls:**
- Primary colour, secondary colour
- Logo (header + favicon)
- Welcome message
- Footer text
- Support email/phone shown

---

## STEP 49 — Self-Service Knowledge Base (Customer-Facing)

**Level:** L4–L7
**Cost:** Zero
**Ships as:** Professional tier

### L4 — Feature Specification
- Articles organised in categories (maintained in existing Knowledge Base module)
- Public-facing portal: no login required
- AI-powered search: natural language search across articles (Claude API — minimal cost)
- Article rating: helpful/not helpful
- Suggested articles on ticket creation: "We found 3 articles that might help"
- SEO-friendly URLs: `support.company.com/articles/how-to-reset-password`
- Community Q&A: customers can ask questions, answers visible to all
- "Still need help?" → contact support form

---

## STEP 50 — Multi-Entity Platform

**Level:** L4–L7
**Cost:** Zero
**Ships as:** Enterprise tier (£99/entity/month)

### L4 — Feature Specification
Full multi-entity support for groups, franchises, holding companies:
- "Entity" = separate legal company with own GL, P&L, Balance Sheet
- All entities under one workspace with shared admin, users, contacts
- Entity-level data isolation: each GL, payroll, HR is entity-specific
- Shared data: Contacts, Accounts, Products, Suppliers optionally shared across entities
- Intercompany transactions: bill one entity to another; elimination on consolidation
- Consolidated reporting: group P&L, group Balance Sheet with intercompany eliminated
- Entity switcher in nav bar (fast context switch)
- User permissions: some users see all entities, some see only their entity
- Bulk actions: run payroll across all entities simultaneously

### L6 — Data Model (Migration)
```sql
-- Most tables already have workspace_id
-- Add entity_id for financial separation

CREATE TABLE entities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID REFERENCES workspaces(id),
  name TEXT,
  legal_name TEXT,
  companies_house_number VARCHAR(8),
  vat_number TEXT,
  base_currency CHAR(3) DEFAULT 'GBP',
  financial_year_end DATE,
  is_primary BOOLEAN DEFAULT false
);

-- Chart of accounts, GL, invoices, bills, payroll all get entity_id column
-- Contacts and accounts get optional entity_id (can be shared or entity-specific)
```

---

# PHASE 11: SECURITY, TESTING & HARDENING
*Steps 51–54*

---

## STEP 51 — Advanced RBAC (Role-Based Access Control)

**Level:** L4–L6
**Cost:** Zero (Supabase RLS)
**Ships as:** Business tier

### L4 — Feature Specification
Current: fixed roles (Admin, Manager, User, Viewer)
Upgrade to custom roles:
- Create custom roles with granular permissions
- Permission matrix: Create / Read / Update / Delete per module
- Field-level permissions: hide sensitive fields (e.g. salary) from non-HR users
- Record-level: user sees only their own records vs. team vs. all
- Role templates: pre-built for Sales Rep, Finance Manager, HR Admin, Service Agent
- Role assignment: bulk assign to user groups

### L6 — Data Model
```sql
CREATE TABLE custom_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID,
  name TEXT,
  description TEXT,
  permissions JSONB -- {"crm.contacts": "crud", "accounting": "r", "people": null}
);

CREATE TABLE role_assignments (
  user_id UUID REFERENCES profiles(id),
  role_id UUID REFERENCES custom_roles(id),
  entity_id UUID REFERENCES entities(id), -- optional: role scoped to entity
  PRIMARY KEY (user_id, role_id)
);
```

---

## STEP 52 — Audit Log (Complete, Tamper-Evident)

**Level:** L4–L6
**Cost:** Zero
**Ships as:** Business tier (already partly built in Admin)

### L4 — Feature Specification
Extend existing audit log to be comprehensive and tamper-evident:
- Every create, update, delete across all tables logged
- Stored as: user_id, action, table_name, record_id, old_values JSONB, new_values JSONB, ip_address, timestamp
- Tamper-evident: SHA-256 hash chain (each entry hashes previous entry — detecting retroactive tampering)
- Log cannot be deleted by any user (read-only, even for admins)
- UI: filterable by user, action, table, date range
- Export: CSV for external audit purposes
- Retention: minimum 7 years (configurable)

---

## STEP 53 — Data Export & GDPR Tooling

**Level:** L4–L6
**Cost:** Zero
**Ships as:** Core platform

### L4 — Feature Specification
**Data export (customer-initiated):**
- Admin can export all workspace data as JSON/CSV
- Per-module exports: all Contacts, all Invoices, etc.
- Scheduled exports: automated weekly backup to email or S3

**GDPR subject access requests:**
- Search by email → generate complete data export for that person
- Include: all records, all activity logs, all communications
- Format: readable PDF + raw JSON

**Right to erasure:**
- "Forget this person": anonymise all records (replace name/email with hash)
- Retain aggregate data (invoice totals) but remove personal identifiers
- Generates erasure confirmation certificate

**Consent management:**
- Track marketing consent per contact
- Consent history: when given, how (web form/email), IP address
- Automatic suppression on unsubscribe

---

## STEP 54 — Performance & Infrastructure Hardening

**Level:** L5–L8
**Cost:** Supabase Pro plan (already needed)
**Ships as:** Infrastructure (not visible)

### L5 — Performance targets
- Page load: <1.5 seconds (LCP)
- API response: <200ms for simple queries, <2s for complex reports
- Database: indexes on all foreign keys and common filter columns
- Supabase: connection pooling (PgBouncer) enabled
- Next.js: image optimization, code splitting per route, lazy loading
- Bundle size: audit and reduce any >100KB chunks

### L6 — Key indexes to add
```sql
-- Most common query patterns
CREATE INDEX idx_deals_workspace_stage ON deals(workspace_id, stage);
CREATE INDEX idx_invoices_workspace_status ON invoices(workspace_id, status);
CREATE INDEX idx_contacts_workspace_email ON contacts(workspace_id, email);
CREATE INDEX idx_activities_record ON activities(record_type, record_id);
CREATE INDEX idx_audit_log_workspace_created ON audit_log(workspace_id, created_at DESC);
CREATE INDEX idx_notifications_user_read ON notifications(user_id, read, created_at DESC);
```

---

# PHASE 12: LAUNCH PREPARATION
*Steps 55–56*

---

## STEP 55 — Onboarding & Data Import Wizard

**Level:** L4–L7
**Cost:** Zero
**Ships as:** Core platform

### L4 — Feature Specification
Smooth onboarding is the #1 reason customers stay:

**Setup wizard (extends existing onboarding):**
- Step 1: Company details (name, address, Companies House number → auto-populate)
- Step 2: Configure modules (which apps does this workspace need?)
- Step 3: Import contacts (CSV upload with smart column mapping)
- Step 4: Import products/services
- Step 5: Configure accounting (chart of accounts template: standard UK, charity, retail)
- Step 6: Invite team members
- Step 7: Connect integrations (HMRC, Open Banking, Stripe, email)
- Step 8: Tour of key features

**Data migration import:**
- CSV import for: Contacts, Accounts, Deals, Products, Invoices
- Smart column mapping: user maps their columns to Orbas fields
- Validation step: shows errors before import (duplicate emails, missing required fields)
- Preview first 5 rows before confirming
- Import history: previous imports with row count, errors, undo option

**From-HubSpot import:** specific templates matching HubSpot CSV export format
**From-Xero import:** specific templates matching Xero chart of accounts export

---

## STEP 56 — Pricing, Billing & Subscription Management

**Level:** L4–L7
**Cost:** Stripe (already in stack — processing fees only)
**Ships as:** Core platform infrastructure

### L4 — Feature Specification
Full self-service billing using Stripe:

**Tiers and pricing:**

| Tier | Monthly | Annual (2 months free) | Users |
|---|---|---|---|
| Starter | £39/user | £390/user/year | 1–4 |
| Professional | £79/user | £790/user/year | 5–49 |
| Business | £129/user | £1,290/user/year | 50–199 |
| Enterprise | Custom | Custom | 200+ |

**Add-on pricing (appended to base subscription):**

| Add-On | Monthly | Annual |
|---|---|---|
| UK Compliance Pack (MTD + PAYE + Companies House) | £49/company | £490/year |
| Bank Feeds (Open Banking) | £19/company | £190/year |
| AI Copilot Advanced | £19/user | £190/user/year |
| WhatsApp | £29/company | £290/year |
| SMS (500/month) | £19/company | £190/year |
| eSignature Unlimited | £29/company | £290/year |
| Video Calling | £25/company | £250/year |
| Charity Bundle | £39/company | £390/year |
| Multi-Entity (per entity) | £99/entity | £990/entity/year |

**Billing UI in Admin Console:**
- Current plan + next renewal date
- Add users → Stripe quantity update → prorated charge
- Enable/disable add-ons
- Invoice history (download PDF)
- Payment method management (Stripe Customer Portal)
- Cancel subscription flow (with retention offer and feedback)
- Free trial: 14 days, no card required

**Stripe webhooks handled:**
- `invoice.paid` → extend subscription
- `invoice.payment_failed` → grace period (7 days) → downgrade warning
- `customer.subscription.deleted` → workspace to read-only mode

---

# SUMMARY: COST VS. IMPACT MATRIX

| Step | Feature | API Cost | Tier | Impact |
|---|---|---|---|---|
| 1–3 | MTD VAT + ITSA | FREE | UK Compliance Add-On | ★★★★★ |
| 4 | PAYE Engine | FREE | UK Compliance Add-On | ★★★★★ |
| 5 | Companies House | FREE | Core | ★★★★★ |
| 6 | eSignature | FREE | Core | ★★★★★ |
| 7 | Charity Commission | FREE | Charity Module | ★★★★☆ |
| 8 | Open Banking | ~Free/Low | Bank Feeds Add-On | ★★★★★ |
| 9 | GoCardless DD | Fee% | DD Add-On | ★★★☆☆ |
| 10 | Postcode lookup | FREE | Core | ★★★☆☆ |
| 11 | Territory + Quota | FREE | Business | ★★★★☆ |
| 12 | Health Scoring | FREE | Business | ★★★★☆ |
| 13 | Proposal Builder | FREE | Professional | ★★★★☆ |
| 14 | Subscriptions/MRR | FREE | Professional | ★★★★☆ |
| 15–16 | AI Lead + Deal Intel | Claude API | AI Add-On | ★★★★☆ |
| 17 | Partner/Channel | FREE | Business | ★★★☆☆ |
| 18 | Multi-Currency | ~Free | Business | ★★★☆☆ |
| 19 | Document Intelligence | Claude API | AI Add-On | ★★★★★ |
| 20 | NL Queries | Claude API | AI Add-On | ★★★★☆ |
| 21–23 | Meeting Notes + Email AI | Claude API | AI Add-On | ★★★☆☆ |
| 24–26 | Templates + CLM + Versions | FREE | Professional/Business | ★★★★☆ |
| 27–30 | Charity: Volunteers, Gift Aid, Impact | FREE (+Charity Commission) | Charity | ★★★★★ |
| 31–34 | Analytics: Dashboard Builder, Reports, ESG | FREE | Business | ★★★★☆ |
| 35–38 | HR: Shifts, Benefits, Absence, Workforce | FREE | Professional | ★★★★☆ |
| 39–42 | Ops: Forecasting, CSAT, SLA, Field Service | FREE | Business | ★★★☆☆ |
| 43 | Add-On Platform Framework | FREE | Core infra | ★★★★★ |
| 44 | WhatsApp | £50+/mo (add-on covers) | WhatsApp Add-On | ★★★★☆ |
| 45 | SMS | £0.04/msg (add-on covers) | SMS Add-On | ★★★☆☆ |
| 46 | Video | $0.004/min (add-on covers) | Video Add-On | ★★★☆☆ |
| 48–49 | White-Label + Knowledge Base | FREE | Business | ★★★★☆ |
| 50 | Multi-Entity | FREE | Enterprise | ★★★★☆ |
| 51–53 | RBAC + Audit + GDPR | FREE | Business | ★★★★☆ |
| 54 | Performance Hardening | FREE | Infra | ★★★★★ |
| 55 | Onboarding + Import Wizard | FREE | Core | ★★★★★ |
| 56 | Billing + Subscription Mgmt | Stripe % | Core | ★★★★★ |

**Total new monthly recurring API cost (at 100 customers):**
- Claude API: ~£50–200/month (controlled per query)
- Resend: ~£20/month
- TrueLayer (free tier): £0 for most workspaces
- Stripe: per-transaction (no monthly fixed)
- WhatsApp (add-on customers only): covered by add-on revenue
- SMS (add-on customers only): covered by add-on revenue

**Total estimated fixed API cost: <£300/month at 100 customers = £3/customer/month**
**Revenue from UK Compliance Pack alone at 100 customers: £4,900/month**

---

## IMPLEMENTATION ORDER

### Sprint 1 (Weeks 1–4): Foundation
Steps 1, 5, 6, 10, 43, 56 — HMRC registration, Companies House, eSignature, Postcode, Add-On framework, Billing

### Sprint 2 (Weeks 5–8): UK Compliance
Steps 2, 3, 4, 7, 8, 9 — VAT returns, ITSA, PAYE, Charity Commission, Bank Feeds, GoCardless

### Sprint 3 (Weeks 9–12): CRM + AI Depth
Steps 11–16, 19–22 — Territory, Health, Proposals, Subscriptions, AI features

### Sprint 4 (Weeks 13–16): Documents + Charity
Steps 17, 18, 24–30 — Multi-currency, CLM, Templates, Volunteer, Gift Aid, Impact

### Sprint 5 (Weeks 17–20): Analytics + HR + Ops
Steps 31–42 — Dashboard builder, Reports, ESG, Shifts, Benefits, SLA, Field Service

### Sprint 6 (Weeks 21–24): Platform + Communications
Steps 44–50 — WhatsApp, SMS, Video, White-label, Multi-entity

### Sprint 7 (Weeks 25–28): Hardening + Launch
Steps 51–55 — RBAC, Audit Log, GDPR, Performance, Onboarding wizard

---

*Total: 56 Steps | 9 Levels | ~28 Sprints | Estimated timeline: 6–7 months to full implementation*

---

# APPENDIX A: PART 3 — ALL 15 REVENUE-IMPACTING FEATURES
## Full Specification & Plan Cross-Reference

This appendix ensures every feature from the competitive analysis Part 3 is fully specced and mapped to the implementation plan. No feature is left as a bullet point — each has a complete build specification.

---

## TIER 1 — BUILD TO COMPETE (Immediate Priority)

---

### FEATURE 1: Making Tax Digital (MTD ITSA) — UK Mandatory
**Plan Steps:** 1 (HMRC OAuth), 2 (MTD VAT), 3 (MTD ITSA)
**Tier:** UK Compliance Pack Add-On (£49/company/month)
**API Cost:** FREE — HMRC Developer Portal

#### What This Is
MTD ITSA (Income Tax Self Assessment) is the UK government's mandate requiring all businesses and landlords with income >£50k to submit quarterly digital income/expense summaries to HMRC rather than an annual Self Assessment return. Mandatory since April 2026. HubSpot, Salesforce, and Zoho have zero MTD capability.

#### Full Build Specification

**1a — HMRC OAuth2 Connection (Step 1)**
- Register Orbas as HMRC software provider (one-time application, free)
- OAuth2 PKCE flow: "Connect to HMRC Government Gateway" button in Settings > Integrations
- Stores encrypted access_token + refresh_token per workspace
- Auto-refreshes tokens before expiry
- Test mode: HMRC sandbox environment for testing without affecting real accounts

**1b — MTD VAT Returns (Step 2)**
Full 9-box VAT return calculation and digital filing:
- Pull all VAT-coded transactions from the General Ledger
- Auto-calculate all 9 boxes (output tax, input tax, net payable, sales/purchases totals, EU transactions)
- Manual adjustment capability with mandatory audit note
- Submit digitally to HMRC MTD VAT API
- Store HMRC confirmation reference number
- PDF copy auto-generated (react-pdf) and saved to Documents
- History view: all past returns with status (draft / submitted / accepted / overdue)

**1c — MTD ITSA Quarterly Updates (Step 3)**
- Obligation calendar: 4 quarterly deadlines per tax year shown on MTD dashboard
- Income source management: register each self-employment business or property income source
- Quarterly update wizard:
  - Step 1: Income (turnover for the period)
  - Step 2: Allowable expenses (categorised: cost of goods, wages, rent, travel, professional fees, etc.)
  - Step 3: Adjustments (capital allowances, private use disallowance)
  - Step 4: Review + submit
- HMRC returns tax estimate after each quarterly submission — display prominently
- Final declaration (End of Period Statement): year-end crystallisation replacing SA100
- MTD Readiness Score: "You're 73% ready for Q3. 4 transactions need categorising."
- Penalty points tracker: HMRC's new points-based penalty system (4 points = £200 fine)

**1d — AI Expense Categorisation (AI Copilot integration)**
- When transactions are imported (manual CSV or Open Banking), AI suggests allowable/non-allowable classification
- Categories map directly to MTD expense categories required by HMRC
- Confidence score per suggestion: high confidence = auto-applied; low confidence = flagged for review
- Learning: corrections feed back to improve future suggestions

**1e — Capital Allowances Tracking**
- Fixed Assets module (already built) extended with capital allowances treatment
- Asset types: Annual Investment Allowance (AIA), Writing Down Allowance (WDA) — 18% main pool, 6% special rate pool
- First Year Allowances (FYA) for energy-efficient plant
- Auto-calculate allowances per tax year
- Capital allowances summary feeds into MTD ITSA quarterly submissions

**1f — SA105 Property Income Summary**
- For landlords: separate income source type "UK Property"
- Track rental income, allowable expenses (mortgage interest relief at 20%, repairs, letting agent fees, insurance)
- Furnished Holiday Lettings (FHL) vs. standard let — different rules
- SA105 pre-populated from property records → export as reference for accountant or submit via MTD

---

### FEATURE 2: Companies House Integration
**Plan Step:** 5
**Tier:** Core Platform (free)
**API Cost:** FREE — Companies House REST API (no approval required)

#### Full Build Specification

**2a — Instant Company Lookup in CRM**
- Any Account or Lead form: "Company Number" field with 🔍 search button
- Search by name: type "Acme" → dropdown shows matching companies with number + status
- Search by number: type "12345678" → instant data fetch
- One-click import: populates all fields from Companies House data
- Fields imported: registered name, registered address (all lines), incorporation date, SIC codes (business type), company status, accounting reference date, next accounts due, next confirmation statement due

**2b — Director Auto-Import as Contacts**
- On company import: fetch officer list from Companies House
- Each current director → create Contact record linked to Account
- Fields: full name, appointment date, role (Director/Secretary/etc.)
- Resigned directors: shown in Companies House tab but not created as active contacts
- "Persons with Significant Control" also imported and flagged

**2c — Ongoing Monitoring & Change Alerts**
- Opt-in per account: "Monitor this company for changes"
- Nightly background job checks monitored companies for:
  - New filings (accounts filed, confirmation statement, mortgages)
  - Officer changes (new director appointed, director resigned)
  - Status changes (active → voluntary arrangement, liquidation, dissolution)
  - Overdue filings (accounts overdue, confirmation statement overdue)
- Alert created in Notifications and shown on Account record
- Example: "⚠️ TechCorp Ltd — Director James Allen resigned yesterday"

**2d — Filing Reminders**
- Pull next accounts due date and next confirmation statement due date from Companies House
- Create calendar reminders in the workspace at 60 days, 30 days, 7 days before
- Show in Home > Tasks: "Confirmation statement due for DataVault Ltd in 12 days"
- One-click: "File online" → opens Companies House WebFiling in new tab

**2e — Companies House Tab on Account Detail**
- New tab "Companies House" on every Account record with a linked company number
- Shows: company summary, current officers, filing history (last 10 filings with links), PSC list, mortgage charges, SIC codes
- "Refresh from Companies House" button to pull latest data on demand
- Financial years summary: last accounts filed, period covered, accounts type

**2f — Lead Enrichment**
- CRM lead import (CSV): if companies_house_number column present → auto-enrich on import
- Manual enrichment: any lead/account with company number but no data → "Enrich" button
- Bulk enrichment: select multiple accounts → "Enrich selected from Companies House"

---

### FEATURE 3: PAYE / Payroll with RTI
**Plan Step:** 4
**Tier:** UK Compliance Pack Add-On (£49/company/month)
**API Cost:** FREE — HMRC RTI API (same developer portal as MTD)

#### Full Build Specification

**3a — PAYE Calculation Engine (TypeScript, no external API)**
All rates sourced from HMRC-published tables (updated each April, hardcoded into engine):

Income Tax:
- Personal Allowance: £12,570 (standard); reduced for income >£100k (£1 reduction per £2 over)
- Basic rate: 20% on £12,571–£50,270
- Higher rate: 40% on £50,271–£125,140
- Additional rate: 45% above £125,140
- Scottish Income Tax (S prefix): five bands (19%, 20%, 21%, 42%, 47%)
- Welsh Income Tax (C prefix): same as England/NI rates

Tax Code Processing:
- L: standard personal allowance
- M/N: marriage allowance transfer (+/- 10% of allowance)
- T: requires individual calculation
- 0T: no allowance (emergency, no P45)
- BR: all income taxed at basic rate
- D0/D1: all at higher/additional rate
- NT: no tax
- K codes: negative allowance (deduction added to income)
- W1/M1: week 1/month 1 basis (non-cumulative)

National Insurance:
- Employee Class 1: 8% on £12,570–£50,270; 2% above (rates for 2025/26)
- Employer Class 1: 13.8% above secondary threshold (£9,100)
- NI letter processing: A, B, C, H, J, M, X, Z — each with different rates/thresholds
- Director NI: annual earnings method (not period basis)

Student Loans:
- Plan 1: 9% above £24,990
- Plan 2: 9% above £27,295
- Plan 4 (Scotland): 9% above £31,395
- Postgraduate: 6% above £21,000
- Multiple plans: deduct both if applicable

Auto-Enrolment Pension:
- Qualifying earnings: £6,240 lower limit, £50,270 upper limit
- Minimum employee: 5% (inc. 1% tax relief uplift to 4% net if relief at source)
- Minimum employer: 3%
- Eligible/non-eligible/entitled worker classification
- Opt-out processing: 1-month window, refund on opt-out

**3b — Statutory Payments**
- SSP (Statutory Sick Pay): £116.75/week (2025/26); qualifying days; 4+ consecutive days; waiting days (3 days)
- SMP (Statutory Maternity Pay): 90% of AWE for 6 weeks; then £184.03/week or 90% if lower; 39 weeks total
- SPP (Statutory Paternity Pay): £184.03/week; 1 or 2 weeks
- ShPP (Shared Parental Pay): same rate as SMP, flexible weeks
- SSPP (Statutory Shared Parental Pay): same as ShPP
- Average Weekly Earnings (AWE): calculated from 8-week lookback period

**3c — Payslip Generation (react-pdf)**
Each payslip PDF includes:
- Employee name, NI number, tax code, payroll number, pay date
- Pay period (e.g. Month 3 of Tax Year 2026/27)
- Earnings section: basic pay, overtime, bonus, commission, sick pay, maternity pay
- Deductions: income tax, employee NI, employee pension, student loan
- Employer costs (shown for manager view): employer NI, employer pension
- Net pay (large, prominent)
- YTD figures: gross, tax, NI, pension
- NI category letter
- Employer details, HMRC reference

**3d — P60 (Year-End Certificate)**
Generated for each employee at 5 April year-end:
- Total pay in year, total tax deducted
- NI category, NI deductions by category
- Employer NI contributions
- Statutory payments received
- Student loan deductions
- Pension contributions
- Auto-generated PDF; stored in Documents; employee self-service download from People Portal

**3e — P45 (Leaving Employee)**
Generated when employee end date set:
- Parts 1, 1A, 2, 3 format
- Total pay and tax to leaving date
- Employee auto-notified with download link
- HMRC notified via RTI

**3f — P11D (Benefits in Kind)**
Annual return of employee benefits (submitted by 6 July following tax year):
- Links to Benefits module (Step 36): each benefit with taxable value
- Form pre-populated from benefit records
- Class 1A NI liability calculated (13.8% of total P11D value)
- P11D(b) employer declaration generated
- PDF output for employer records + employee copy

**3g — HMRC RTI Submissions (Free API)**
- Full Payment Submission (FPS): submitted on or before payment date
  - All paid employees included
  - New starters: full HMRC notification fields
  - Leavers: leaving date included, P45 triggered
  - YTD figures reconcile each period
- Employer Payment Summary (EPS): monthly if no payments made, or to claim SMP/SSP recovery
  - Recovery of statutory payments (SMP/SSP recoverable at 92% or 103% for small employers)
  - Construction Industry Scheme (CIS) deductions if applicable
- Submission status: RTI dashboard showing FPS/EPS status per period
- HMRC response handling: success, warnings, errors with guidance

**3h — Payroll Processing Workflow**
- Step 1: Verify employee data (NI numbers, tax codes up to date)
- Step 2: Enter variable pay (overtime, bonus, commission, sick days, expenses)
- Step 3: Calculate (engine runs, shows all net pays)
- Step 4: Review (flag any significant changes vs. last run)
- Step 5: Approve (manager/payroll officer sign-off)
- Step 6: Submit FPS to HMRC
- Step 7: Process payments (integration with banking / export BACS file)
- Step 8: Distribute payslips (email to employees + self-service portal)

---

### FEATURE 4: eSignature for Contracts & Documents
**Plan Step:** 6
**Tier:** Core (3 docs/month free); unlimited in Professional+
**API Cost:** ZERO — built with HTML5 Canvas + react-pdf (no DocuSign/HelloSign)

#### Full Build Specification

**4a — Document Preparation Interface**
- Upload PDF or generate from Document Template (Step 24)
- PDF rendered in-browser using PDF.js (open source, zero cost)
- Field placement toolbar: Signature, Initials, Date (auto-fills), Free Text, Checkbox, Dropdown
- Each field assigned a colour corresponding to a signer
- Fields draggable and resizable on the PDF pages
- Multi-page support: scroll through all pages, place fields on any page
- Required vs. optional field toggle
- Signing order: sequential (signer 1 must sign before signer 2 gets access) or parallel (all at once)
- Preview: see what each signer will see

**4b — Signer Configuration**
- Add signers: name + email
- Set signing order number (if sequential)
- Add a message to signers (shown in invitation email and on signing page)
- Set expiry date (default 14 days; configurable 1–90 days)
- Option: require identity verification (email confirmation default; SMS OTP as add-on)

**4c — Sending & Notifications (via Resend — free tier)**
- Invitation email: personalised per signer with direct signing link
- Reminder emails: auto-send if not signed after 3 days; again at 7 days
- Completion notification: all signers complete → sender receives "Signed: [document name]" email
- Signer notified when it's their turn (sequential mode)

**4d — Signing Experience (Public Page — no login)**
- URL: `/sign/[one-time-token]`
- Full PDF display on any device (desktop, tablet, mobile)
- Fields highlighted and pulsing for the current signer
- Progress indicator: "2 of 3 required fields completed"
- Signature capture: draw with mouse/touchscreen OR type name (rendered in cursive web font)
- Initials: same options
- Date fields: auto-populated with current date (not editable)
- Text fields: free text input
- Checkboxes: click to check/uncheck
- Final step: "I confirm I have reviewed and agree to sign this document" confirmation checkbox
- Submit: all field values sent to server

**4e — Document Compilation (Server-Side)**
After all signers complete:
- Fetch original PDF
- Embed all signature images at their exact x/y positions on the correct pages (using pdf-lib — open source)
- Add a signature page at the end listing all signers with timestamps
- Generate SHA-256 hash of the final document and store (tamper-evident)
- Store final signed PDF in Documents module linked to source deal/contract/employee record

**4f — Audit Trail Certificate**
Separate PDF generated containing:
- Document title and unique ID
- For each signer: full name, email address, IP address, user agent (browser/device), timestamp of viewing, timestamp of signing, geolocation (city/country from IP)
- Document hash (SHA-256)
- Orbas certificate footer
- This audit trail PDF is stored alongside the signed document

**4g — eIDAS Compliance**
- Meets Simple Electronic Signature (SES) standard under eIDAS — valid in UK post-Brexit
- Suitable for: NDAs, service agreements, employment contracts, proposals, consultancy agreements
- Not suitable for: land transfers, wills, lasting power of attorney (require qualified signatures)
- Statement of applicability included in document metadata

**4h — Integration Points**
- Deals: "Send for Signature" on Quote or Proposal → auto-attaches to deal
- HR: Employment contract → "Send for Signature" → employee signs → stored in HR Records
- Documents: any document → "Request Signature" action
- Client Portal: client can sign a document from their portal without signing into main app

---

### FEATURE 5: Open Banking / Bank Feed Integration
**Plan Step:** 8 (Bank Feeds Add-On), 9 (GoCardless)
**Tier:** Bank Feeds Add-On (£19/company/month)
**API Cost:** TrueLayer — free tier covers most small workspaces; add-on covers cost at scale

#### Full Build Specification

**5a — Bank Connection (TrueLayer OAuth)**
- "Connect a Bank Account" button in Accounting > Banking
- TrueLayer consent UI: select bank from supported list (HSBC, Barclays, Lloyds, NatWest, Halifax, Santander, Monzo, Starling, Revolut Business, Metro Bank, + 50 others)
- Open Banking consent: customer authenticates with their bank (30-second flow)
- Permissions: read-only transaction history + account details (we never request payment permissions)
- Access token stored encrypted per bank connection
- Multiple accounts per workspace (current, savings, credit card, currency accounts)
- Reconnect flow: consent expires after 90 days → "Reconnect" prompt in Banking

**5b — Transaction Sync**
- On connect: initial import of last 90 days of transactions
- Ongoing: auto-sync every 6 hours (adjustable in settings)
- Manual sync: "Sync Now" button in Banking
- Duplicate detection: transaction hash (date + amount + reference) prevents duplicates
- Transaction data stored: date, amount, currency, description, bank reference, balance after
- Categorisation: merchant category codes (MCC) from bank used to suggest accounting category

**5c — AI Matching Engine**
For each imported transaction:
1. Check if exact amount + approximate date matches an open invoice (paid) → auto-match if confidence >95%
2. Check if amount matches an open bill → auto-match if confidence >90%
3. Check if description contains a supplier/customer name from records → suggest match
4. Check recurring patterns (e.g. "HMRC PAYE" always maps to Tax Liability account) → auto-match
5. Unmatched: placed in "Review Queue" with AI suggestions

Auto-posting: when confidence >95%, GL entry automatically posted and invoice marked paid
Semi-auto: confidence 70–95%, shown in review queue with "Accept" button
Manual: confidence <70%, user creates match manually

**5d — Reconciliation Workbench (Extends existing Reconciliation page)**
- Split screen: left = unmatched bank transactions; right = unmatched invoices/bills
- Drag transaction to invoice/bill to match
- Create new transaction: if bank transaction has no matching record, create expense/income directly
- Bulk actions: "Accept all high-confidence matches"
- Period close reconciliation: confirm bank balance matches GL balance at month-end
- Reconciliation report: PDF export showing all matched/unmatched items for accountant

**5e — Bank Rules (Automatic Categorisation)**
- User creates rules: "If description contains 'AWS' → categorise as Software & Subscriptions"
- Rules applied automatically to all future matching transactions
- Rule library: 50 pre-built common rules (HMRC PAYE, National Insurance, Payroll, Amazon, Google, etc.)
- Override: rules can always be overridden per transaction

**5f — GoCardless Direct Debit (GoCardless Add-On)**
- Set up Direct Debit mandate on any Account record
- Customer receives mandate setup email with GoCardless-hosted form
- Mandate stored: GoCardless mandate ID + bank account last 4 digits
- Invoice collection: when invoice created with "Direct Debit" payment method → auto-collected on due date
- Dunning: failed → retry day 3 → retry day 7 → fail notification to account manager
- Cancellation: mandate cancelled on account or manually
- Reconciliation: GoCardless payments auto-matched via webhook → invoice marked paid instantly

---

## TIER 2 — BUILD FOR COMPETITIVE MOAT

---

### FEATURE 6: AI Copilot Expansion — Business-Intelligent
**Plan Steps:** 19 (Document Intelligence), 20 (NL Queries), 21 (Meeting Notes), 22 (Email Composer), 15 (Lead Scoring), 16 (Deal Intelligence)
**Tier:** AI Copilot Add-On (£19/user/month)
**API Cost:** Claude API — ~£0.01–0.05 per query; bulk queries batched to reduce cost

#### Full Build Specification (complete sub-feature list)

**6a — Document Intelligence (Step 19)**
Upload any PDF → Claude extracts structured data:
- Invoice: supplier name, invoice number, date, due date, line items (description + qty + unit price), VAT breakdown, total, payment reference → pre-fills Bill entry form
- Contract: parties, effective date, term length, payment amount, renewal date, break clause dates, governing law, key obligations → creates Contract record summary
- CV/Resume: name, email, phone, LinkedIn, current employer, job history (dates/titles/companies), education, skills list → creates Candidate record in ATS
- Certificate (Gas Safety/EICR/EPC/ISO): company/property, issue date, expiry date, certification body, result, engineer name → creates Compliance record with expiry alert
- Bank Statement: extract transactions as structured data if CSV not available
- Processing time target: <15 seconds per document

**6b — Natural Language CRM Queries (Step 20)**
Type questions in plain English; Claude translates to safe, read-only Supabase queries:
- "Show me all deals over £50k stalled in Proposal stage for more than 3 weeks" → filters Deals table
- "Which contacts at TechCorp haven't been contacted in 60 days?" → queries Activities + Contacts
- "What's our total pipeline value by rep this quarter?" → aggregates Deals grouped by owner
- "Which invoices are overdue by more than 90 days?" → queries Invoices with date filter
- "How many support tickets did we open and close last month?" → queries Service Tickets
- "Show me employees with leave requests pending approval" → queries Leave Requests
- Results returned as clickable list with "Export to CSV" option
- Security: read-only Supabase RPC functions only — no data modification possible via NL queries

**6c — Meeting Notes → CRM Actions (Step 21)**
User pastes meeting notes text (or future: Zoom/Teams transcript webhook):
- Claude extracts: action items (with assignee if named), decisions made, deal updates mentioned, new contacts mentioned, follow-up date discussed
- Confirmation modal shows all extracted items:
  - ☑ Create task: "Send proposal to James — due Friday" (assigned to current user)
  - ☑ Create task: "Follow up with procurement — due next week"
  - ☑ Update deal stage: Deal #1234 from Discovery → Proposal
  - ☑ Log activity: Meeting note with full transcript
  - ☑ Create contact: "David from legal team, david@acme.com"
- User can uncheck any item before applying
- "Apply All" or individual apply

**6d — AI Proposal Writer**
From Deal record, click "AI Draft Proposal":
- Claude uses: contact name, account name, deal value, products/services, notes from deal, company description from Companies House
- Generates: professional proposal draft with Executive Summary, Problem Statement, Proposed Solution, Timeline, Investment (pricing table from deal), Terms
- Output in rich text editor (TipTap) — user edits before finalising
- Tone selector: Formal / Consultative / Friendly
- "Regenerate section" option per section without losing other sections

**6e — Anomaly Detection & Business Alerts (Step 23)**
Weekly Monday morning digest + real-time threshold alerts:
- Debtors aged 60+ increased >25% → "⚠️ Overdue invoices up £12k this week"
- Pipeline value dropped >15% → "⚠️ Pipeline dropped — 2 deals marked lost"
- Health scores: 3+ accounts moved to Danger → "⚠️ 3 key accounts at risk"
- Cash position below threshold → "⚠️ Cash below £25k — review expenses"
- SLA breach rate above 15% → "⚠️ Service quality alert"
Alerts appear in: Home > Alerts panel + email digest + in-app notification

**6f — Smart Lead Scoring (Step 15)**
Computed score (1–10) on every lead/deal — no external API required for base scoring:
- ICP match: industry (configured in settings) +2, company size in range +2, geography +1
- Engagement: email opened +1, call logged +1, meeting held +2
- BANT signals: budget mentioned in notes +2, authority contact (Director/VP) +1, need expressed +1, timeline stated +1
- Recency: last contact <7 days +1, >30 days -1, >60 days -3
- AI layer (Claude): reads latest notes + email threads → adds 0–3 AI qualification bonus based on buying signals detected
- Score shown on lead card, lead list, and in Forecasting

---

### FEATURE 7: Customer Portal Enhancement
**Plan Step:** 48 (White-Label), 49 (Knowledge Base)
**Tier:** Business tier
**API Cost:** Custom domains via Cloudflare/Vercel — free; Stripe for payments — per-transaction

#### Full Build Specification

**7a — Custom Domain White-Label (Step 48)**
- Workspace setting: "Portal Domain" → e.g. `client.mybusiness.com`
- DNS setup guide shown: "Add CNAME record: `client.mybusiness.com → portal.orbas.app`"
- SSL auto-provisioned via Let's Encrypt (free, auto-renewed)
- All portal pages served from custom domain — no Orbas branding
- Branded login page: workspace logo, brand colours, custom welcome message
- Email invitations sent from `portal@mybusiness.com` (requires Resend custom sender domain verification — free)
- White-label mode: removes all "Powered by Orbas" references

**7b — Branded Welcome Experience**
- First login: branded welcome modal with company logo and personalised greeting
- Welcome email sent via Resend on portal account creation
- Quick tour overlay on first visit
- "Your account manager is [name] — [email] / [phone]" contact card

**7c — Proposal Approval with eSign from Portal**
- Client receives "New Proposal Ready" email → logs into portal
- Proposal displayed full-screen (all sections, branding, pricing)
- Proposal analytics tracked: viewed at [timestamp], time spent [X minutes], [Y pages viewed]
- Three action buttons: Approve (triggers eSignature), Request Changes, Decline
- On Approve: eSignature flow for the proposal PDF initiated from within the portal
- On completion: deal stage updated in CRM automatically

**7d — Invoice Payment via Stripe**
- Invoices tab in portal: list of all invoices (paid / outstanding / overdue)
- "Pay Now" button on any outstanding invoice
- Stripe Checkout session opened (hosted, PCI compliant)
- Payment methods: card, Apple Pay, Google Pay
- On payment: invoice marked paid in Accounting, GL entry posted, bank reconciliation entry created
- Receipt emailed automatically via Stripe + Resend

**7e — Project Status Updates**
- Projects tab: client sees their active projects
- Visible per project: overall % complete, milestones (completed / upcoming), current phase
- File sharing: project documents shared from Projects module appear in portal
- Client cannot see internal notes or financial details — controlled by "visible to client" flag

**7f — Support Ticket Submission**
- Support tab: "Raise a Ticket" form
- Fields: subject, description, priority, file attachments
- Ticket created in Service module and assigned per routing rules
- Portal shows: all their tickets, current status, last update, assignee
- Client can add comments to open tickets from portal
- Satisfaction survey sent on ticket close

**7g — NPS Survey in Portal**
- Quarterly NPS survey appears as non-blocking banner in portal
- One question: "How likely are you to recommend us? 0–10"
- Follow-up: "What's the main reason for your score?"
- Responses stored against the Account in CRM
- NPS dashboard in CRM > Accounts > Analytics tab

---

### FEATURE 8: Contract & Proposal Builder
**Plan Steps:** 13 (Proposal Builder), 24 (Document Templates), 26 (CLM)
**Tier:** Professional tier
**API Cost:** ZERO for builder; Claude API for AI drafting (Feature 6d above)

#### Full Build Specification

**8a — Template Library**
Built-in templates (TipTap rich text, no external dependency):
- NDA (Mutual and One-Way variants)
- Service Agreement (consultancy, SaaS, retainer)
- Statement of Work (project-based)
- Employment Contract (permanent, fixed-term)
- Freelancer Contract
- Sales Proposal (3 variants: brief, standard, enterprise)
- Partnership Agreement
All templates include: variable placeholders, standard UK law clauses, jurisdiction selection

**8b — Proposal Section Builder**
For sales proposals specifically:
- Cover page: client logo (pulled from Account), proposal title, date, prepared by (rep name + photo), expiry date
- Drag-drop sections: Executive Summary, Understanding Your Challenge, Our Solution, Case Studies, Team, Timeline, Investment, Terms and Conditions, Appendices
- Each section: rich text (TipTap), can include images, tables, embedded quote line items
- Section templates: pre-written placeholder content for each section type
- Branding: workspace logo, primary colour applied throughout
- Custom CSS themes: 5 visual themes (Professional, Modern, Classic, Minimal, Bold)
- Page numbering, table of contents auto-generated

**8c — Proposal Analytics (Tracking)**
- Each proposal sent generates a unique tracking URL
- Events tracked (stored in proposals table):
  - Opened: timestamp and IP
  - Time on each page/section (scroll depth tracking)
  - Document forwarded (new IP opening same link)
  - Total time spent reading
- Analytics shown on proposal record: "Opened 3 times, 14 min total time, page 4 (Pricing) spent most time"
- CRM rep notified in real-time when prospect opens proposal: "James at TechCorp just opened your proposal"

**8d — Version Management**
- Every edit creates a version snapshot
- Version list: "v1 — sent 2 Jun", "v2 — revised 5 Jun (pricing updated)"
- Version comparison: side-by-side diff showing changed sections
- "Send v2" button: generates new tracking URL, notifies signers

**8e — Win/Loss Tracking**
- On proposal approval: deal automatically moves to Verbal Commitment stage
- On proposal decline: popup "Reason for declining?" (price / competitor / timing / no budget / other)
- Decline reason stored against deal as Lost reason
- Win/loss analysis in CRM Reports: which proposal template has highest win rate? which section length converts best?

**8f — Contract Lifecycle Management (Step 26)**
Full CLM extending from proposals to active contracts:
- Contract types: Customer, Supplier, Employment, NDA, SLA, Lease, Partnership, Framework
- Status flow: Draft → Legal Review → Awaiting Signature → Active → Expiring → Expired / Renewed / Terminated
- Obligation tracking: contractual commitments with due dates
  - "Deliver monthly report by 5th of each month" → recurring task created
  - "Annual price review in June" → calendar reminder
- Auto-renewal management: flag contracts set to auto-renew; alert 60/30/7 days before renewal window closes
- Contract value and payment schedule (milestones or recurring)
- Break clause dates with alerts
- CLM Dashboard: active contracts (count + total value), expiring this month, pending signatures, auto-renewals approaching

---

### FEATURE 9: Subscription & Recurring Revenue Management
**Plan Step:** 14
**Tier:** Professional tier
**API Cost:** Stripe per-transaction (pass-through, no additional monthly cost)

#### Full Build Specification

**9a — Subscription Products**
In the Product Catalog, any product can be flagged as a subscription:
- Billing interval: weekly / monthly / quarterly / bi-annual / annual
- Trial period: N days free (0 by default)
- Multiple pricing tiers per product: e.g. Starter £79/month, Pro £129/month, Enterprise £199/month
- Price changes: schedule future price increase (customer notified X days in advance per settings)
- Currency: GBP by default; multi-currency from Feature 18 (Step 18)

**9b — Subscription Records on Accounts**
Account detail > Subscriptions tab:
- List of all active subscriptions for that account
- Each shows: plan name, amount, billing interval, current period dates, renewal date, status
- Status badges: Active (green), Trialling (blue), Past Due (amber), Cancelled (red), Paused (grey)
- Quick actions: Upgrade, Downgrade, Pause, Cancel

**9c — Automated Recurring Invoicing**
- On billing date: invoice auto-generated from subscription template
- Invoice auto-sent to account's billing email
- Invoice linked to subscription record
- Manual override: invoice can be paused for one cycle (holiday cover etc.)
- Proration: if plan changes mid-cycle, prorated credit note or charge auto-calculated

**9d — Dunning Management (Payment Failure Recovery)**
Automated recovery sequence on invoice payment failure:
- Day 0: Payment failed → email to billing contact: "We couldn't process your payment"
- Day 0: Task created for account manager: "Payment failed — TechCorp subscription"
- Day 3: Retry payment automatically
- Day 3: If retry fails → email: "Action required — subscription at risk"
- Day 7: Final retry
- Day 7: If fails → subscription status → Past Due; account manager escalation task (high priority)
- Day 14: Subscription paused; client portal access restricted (configurable)
- Day 30: Subscription cancelled if no resolution

**9e — MRR / ARR Analytics Dashboard**
New dashboard section (or Analytics widget) with full SaaS metrics:
- MRR: sum of all active monthly subscription amounts (annualised intervals / 12)
- ARR: MRR × 12
- New MRR this month: subscriptions started this month
- Expansion MRR: upgrades this month (plan increase)
- Contraction MRR: downgrades this month
- Churned MRR: cancellations this month
- Net Revenue Retention: (Starting MRR + Expansion − Contraction − Churn) / Starting MRR × 100%
- Customer Count: active subscriptions
- Average Revenue Per Account (ARPA): MRR / active accounts
- MRR movement waterfall chart (Recharts BarChart with stacked segments)
- Churn rate: % of customers who cancelled vs. total active (rolling 30-day)
- Trend charts: MRR trend last 12 months (LineChart)

---

### FEATURE 10: Volunteer Management (Charity Module)
**Plan Step:** 27
**Tier:** Charity Module (bundled)
**API Cost:** ZERO

#### Full Build Specification

**10a — Volunteer Records**
- Contact record extended: type = "Volunteer" (in addition to Lead/Contact/Donor)
- Volunteer profile fields: skills (multi-select tag), interests, availability (days/times), emergency contact, DBS check status + expiry, induction date, t-shirt size (optional)
- Volunteer portal access: auto-create portal account on volunteer registration

**10b — Volunteer Registration**
- Public-facing registration page (custom URL: `yourcharity.com/volunteer`)
- Form: personal details, skills, availability, why do you want to volunteer?
- GDPR consent checkbox (required)
- Auto-creates Contact (Volunteer type) + sends welcome email
- Manager notified of new volunteer application
- Approval workflow: review → approve/decline → approved volunteers notified

**10c — Shift Scheduling**
- Shifts: date/time, location, role required, max volunteers, description
- Assign volunteers to shifts (manual) or open shifts (volunteer self-selects from portal)
- Email/SMS reminder (if SMS add-on) sent 24 hours before shift
- Shift confirmation required: volunteer acknowledges they're attending
- No-show tracking: mark volunteers who didn't attend without cancellation

**10d — Volunteer Portal (Client Portal Extension)**
Volunteers access their own portal view:
- Upcoming shifts (with calendar export: .ics file)
- Past shifts with hours logged
- Log additional hours (non-shift volunteering e.g. remote tasks)
- Availability calendar: update availability for coming weeks
- Skill profile: update skills and interests
- Documents: download role descriptions, induction materials
- Achievements: milestone badges (10 hours, 50 hours, 100 hours, 1-year anniversary)

**10e — Hours Tracking & Impact**
- Hours logged per shift automatically
- Manual hour logging for activities outside scheduled shifts
- Total hours per volunteer (lifetime, this year, this month)
- Volunteer value calculation: total hours × £10.90/hour (NCVO 2024 rate) = estimated monetary value
- Programme attribution: hours tagged to specific programmes/campaigns
- Impact report: "Our 45 volunteers contributed 1,240 hours this year, equivalent to £13,516 in volunteer time"

**10f — DBS Check Management**
- DBS check record per volunteer: type (Basic/Standard/Enhanced), reference number, issue date, expiry (3-year standard)
- Expiry alert: 60/30 days before expiry
- Role requirements: some volunteer roles can require DBS check to be active
- Integration link: uCheck (DBS provider) — manual process with record kept in system; no automated API (DBS APIs are not publicly available at reasonable cost)

**10g — Volunteer Communications**
- Email groups: "All Volunteers", "Youth Programme Volunteers", "Weekend Volunteers"
- Shift reminders: automated via Resend
- Thank you emails: auto-send after each shift completion
- Newsletter: include volunteer segment in Connect > Email campaigns
- Volunteer of the Month: recognition feature (manual nomination, automated email)

---

## TIER 3 — PREMIUM AI FEATURES

---

### FEATURE 11: Predictive Sales Forecasting with AI
**Plan Step:** 16 (Deal Intelligence) — extended
**Tier:** AI Copilot Add-On
**API Cost:** Claude API per weekly batch analysis

#### Full Build Specification

**11a — AI-Adjusted Pipeline Forecast**
Standard forecast: sum of (deal value × close probability by stage)
AI-adjusted forecast: Claude analyses historical pattern adjustments:
- Rep A consistently closes at 65% of their forecast → AI applies 0.65 multiplier to their open pipeline
- Q4 historically 40% higher than forecast → AI applies seasonal multiplier
- Deals in Demo stage convert at 28% historically for your workspace → AI uses actual vs. CRM-default probability
- AI confidence interval: "Expected £125k–£185k — most likely £152k"
- Shown alongside standard weighted forecast as "AI Adjusted" column

**11b — Deal Risk Signals (Real-Time)**
Every open deal continuously scored for risk (no Claude API — rule-based, zero cost):
- No activity logged >14 days → Stalled
- Close date passed without update → Overdue
- Stage not changed in >21 days → Stuck
- Champion contact no longer at company (detected via Companies House officer changes) → Champion Risk
- Deal value decreased → Downgraded
- Competitor name mentioned in notes (keyword matching) → Competitive Risk
- Budget freeze keywords in notes ("procurement freeze", "budget cut", "H2 only") → Budget Risk
- Risk score: 0–3 signals = On Track (🟢); 4–5 = At Risk (🟡); 6+ = Action Needed (🔴)

**11c — AI Deal Narrative (Claude — per-deal)**
On click "AI Analysis" on any deal:
- Claude reads: all notes, emails, activities, stage history, contact seniority, account health score
- Outputs: 3-sentence narrative summary ("This deal has strong executive sponsorship but has been in procurement for 6 weeks with no progress. Budget Q3 concern mentioned in last call. Recommend scheduling a commercial call with CFO to unblock.")
- Recommended next action (one specific action with deadline)
- Win probability (0–100%) with brief reasoning

**11d — Revenue Variance Analysis**
Monthly, post-close: why did actual revenue differ from forecast?
- Slipped deals: closed in later period than forecasted (how much slippage, average by rep)
- Lost deals: total lost value, lost by stage, lost reason (from win/loss tracking)
- Upside: deals that closed earlier or at higher value than forecast
- Variance attribution by: rep, deal source, stage, product line
- Chart: forecast vs. actual bar chart by month (last 12 months)

**11e — What-If Scenario Modelling**
Interactive panel on Forecasting page:
- Scenario inputs: "Add 2 sales reps", "Close rate improves 10%", "Average deal size increases 15%", "Reduce sales cycle by 30 days"
- Sliders for each variable
- Real-time recalculation: "With these changes, projected Q4 revenue = £485k (+28%)"
- Save scenario: name + assumptions + projected outcome (for board presentations)
- Compare 3 scenarios side by side

---

### FEATURE 12: AI HR Assistant
**Plan Steps:** 38 (Workforce Planning) + 19 (Document Intelligence for CVs)
**Tier:** AI Copilot Add-On
**API Cost:** Claude API per operation

#### Full Build Specification

**12a — CV / Resume Parser (Step 19 extended)**
Upload CV in PDF or DOCX:
- Claude extracts all structured data within 15 seconds
- Extracted fields: full name, email, phone, LinkedIn URL, current employer, current job title, years of experience, full work history (employer, title, dates, key responsibilities), education (institution, degree, dates), certifications, technical skills (categorised: languages, frameworks, tools), soft skills keywords, languages spoken, location
- Creates Candidate record in ATS (Hiring module) automatically
- Skills matching: compare extracted skills against job spec requirements → shows match % and gap analysis
- Bulk parsing: upload 10 CVs at once → all processed and ranked by match score

**12b — Interview Question Generator**
From a Job record (job title + requirements):
- Claude generates 20 tailored interview questions:
  - 5 technical competency questions (based on required skills)
  - 5 behavioural questions (STAR format, based on required soft skills)
  - 5 situational questions (based on role responsibilities)
  - 5 culture/values questions (based on company values if configured in settings)
- Includes suggested good-answer indicators for each question
- Saved to interview template library, reusable per role
- Interviewers access from their mobile during interviews

**12c — Salary Benchmarking**
Using ONS ASHE (Annual Survey of Hours and Earnings) data — published annually by ONS, free to use:
- Input: job title + location (postcode → regional area) + company size + seniority
- Output: salary range (25th / median / 75th percentile) for similar roles in similar companies in that region
- "This role benchmarks at £42k–£58k in London for a 3–5 year experience range"
- Data refreshed annually when ONS publishes new ASHE data
- Used in: job creation (sanity check on advertised salary), performance reviews (are we paying fairly?), compensation module

**12d — Early Resignation Risk Detection**
Rule-based early warning system (no Claude needed — computed from HR data):
- Signal 1: Performance score declining over last 2 reviews
- Signal 2: Leave requests increased vs. previous 6 months
- Signal 3: Engagement survey score below 3/5 for 2 consecutive quarters
- Signal 4: No salary increase in 24+ months (below inflation)
- Signal 5: Peer or manager left recently
- Signal 6: Professional development requests unfulfilled for >6 months
- Risk level: 1–2 signals = Low; 3–4 = Medium; 5+ = High
- High-risk employees flagged to HR manager weekly digest
- Contextual: tenure-weighted (employees under 18 months and over 15 years are higher risk)
- Privacy: only visible to HR admins and direct manager (not peers)

**12e — Onboarding Task Intelligence**
When a new employee start date is set:
- Claude generates a 30/60/90 day onboarding plan based on:
  - Job title and department
  - Team size
  - Any notes on the employee record
- Creates tasks in the HR module pre-assigned to: HR manager (admin tasks), IT (equipment setup), direct manager (check-in meetings), new employee (self-completion tasks)
- Checklist visible in employee's own People Portal

---

### FEATURE 13: ESG & Carbon Reporting
**Plan Step:** 33
**Tier:** Business tier / Compliance Pack extension
**API Cost:** ZERO — DEFRA emission factors are published free annually

#### Full Build Specification

**13a — Scope 1 — Direct Emissions**
Company-owned/controlled sources:
- Company vehicles: log mileage by fuel type (petrol/diesel/electric/hybrid) → apply DEFRA kg CO₂e/mile factors
- Company premises: gas consumption (kWh input) × DEFRA natural gas factor (0.18284 kg CO₂e/kWh for 2025)
- Refrigerants: HVAC system refrigerant top-ups (global warming potential per kg by gas type)
- On-site generators: fuel consumption × emission factor
Annual Scope 1 total in tonnes CO₂e

**13b — Scope 2 — Purchased Energy**
- Electricity meters: monthly kWh input per site
- Location-based method: UK national grid average (National Grid ESO publishes g/kWh — free API)
- Market-based method: if renewable energy tariff, apply supplier-specific emission factor (or 0 if REGO-backed)
- Monthly trend: shows grid intensity changes (UK grid getting cleaner — visible over time)
- Renewable vs. non-renewable split

**13c — Scope 3 — Value Chain Emissions**
Selected material categories (DEFRA spend-based method or activity-based):

Category 1 — Purchased Goods & Services:
- Link to supplier purchase orders (already tracked in Operations)
- Spend-based: supplier spend × industry emission factor (DEFRA/EXIOBASE spend-based factors)
- Activity-based where data available from suppliers

Category 4 — Upstream Transportation:
- Shipments (already in Operations) → weight × distance × transport mode → DEFRA emission factor

Category 6 — Business Travel:
- Expenses (already in Accounting): flight, train, hotel expense categories
- Flight miles × class × DEFRA factor (economy/business/first class have different factors)
- Hotel nights × region × hotel emission factor

Category 7 — Employee Commuting:
- Annual commuting survey (email via Resend to all employees)
- Survey asks: primary transport mode, distance each way, days per week in office
- Aggregate commuting emissions calculated from responses

Category 11 — Use of Sold Products:
- For product-selling companies: estimated product use-phase emissions

**13d — ESG Dashboard**
- Scope 1/2/3 total: tonnes CO₂e per year
- Breakdown donut chart (Scope 1 / Scope 2 / Scope 3)
- Year-on-year comparison (requires 2+ years of data)
- Intensity metric: tonnes CO₂e per £1m revenue (allows comparison regardless of growth)
- Carbon targets: set SBTi-aligned reduction target (e.g. -50% by 2030 from 2025 baseline)
- Progress to target: current trajectory vs. target line (LineChart)

**13e — TCFD-Aligned Reporting**
Task Force on Climate-related Financial Disclosures framework (mandatory for large UK companies, increasingly expected for mid-market in supplier/tender processes):
- Four TCFD pillars: Governance, Strategy, Risk Management, Metrics & Targets
- Report template pre-populated with Orbas data where available
- Narrative sections (text inputs) for qualitative disclosure
- Physical risk assessment: which assets/operations are in flood risk areas? (postcode → Environment Agency flood zone — free API)
- Transition risk: carbon price sensitivity (what would a £50/tonne carbon price cost us?)
- Export: TCFD report PDF + supporting data spreadsheet

**13f — Supplier Sustainability Scoring**
- Add sustainability fields to Supplier records: ISO 14001 certified, B Corp certified, renewable energy pledge, published net zero target
- Supplier sustainability score (0–5 stars) based on submitted criteria
- Scope 3 data requests: email suppliers to provide their own Scope 1+2 emissions data
- Show supply chain emission concentration: "Top 5 suppliers account for 65% of Scope 3"

---

### FEATURE 14: Territory & Quota Management
**Plan Step:** 11
**Tier:** Business tier
**API Cost:** ZERO (Leaflet.js for map display — open source, free)

#### Full Build Specification

**14a — Territory Definition**
Territory types:
- Postcode prefix: assign by UK postcode area (e.g. "SW" = South West London)
- Region: North West, Yorkshire & Humber, East Midlands, etc. (standard UK regions)
- County: Cheshire, Kent, etc.
- Country: England, Scotland, Wales, Northern Ireland, Republic of Ireland, international
- Custom: draw custom territory on map (Leaflet.js polygon draw tool)
- Named account list: specific companies assigned to a rep regardless of geography

Territory rules (priority order):
1. Named account assignment overrides geography
2. Postcode prefix takes precedence over region
3. Region takes precedence over country

**14b — Rep Assignment**
- One or more reps assigned to each territory
- Backup rep: if primary rep is on leave → automatic rerouting to backup
- Territories can overlap (for team-sell scenarios)
- Reps can see their own territory boundary on CRM map view

**14c — Automatic Lead & Deal Routing**
When a new Lead or Account is created:
- Postcode looked up → territory identified → rep assigned
- If no territory match: goes to unassigned pool with notification to sales manager
- Manual override: any assignment can be manually changed with reason logged
- Round-robin option: multiple reps in same territory → rotate assignments

**14d — Quota Management**
Quota types:
- Revenue quota (£ of closed-won deals)
- Activity quota (calls logged, meetings held, proposals sent)
- Unit quota (number of deals closed)
- Gross margin quota

Quota period: monthly / quarterly / annual

Setting quotas:
- Manager sets per-rep quotas in People > Sales Quotas (or Forecasting > Quotas)
- Team quota → distribute across reps (equal split or weighted)
- Quota ramp: new reps get ramped quota (Month 1: 25%, Month 2: 50%, Month 3: 75%, Month 4+: 100%)

Attainment tracking:
- Real-time attainment: actual closed-won vs. quota in current period
- % attainment badge on rep profile
- Attainment league table in Forecasting > Leaderboard
- Pacing: "At current pace, rep will finish at 82% of quota"

**14e — Commission Calculation**
Configurable commission tiers:
- 0–79% attainment: base rate (e.g. 3%)
- 80–99% attainment: mid rate (e.g. 5%)
- 100–119% attainment: standard rate (e.g. 8%)
- 120%+ attainment: accelerated rate (e.g. 12%)
- Clawback: commission reversed if customer cancels within 90 days
- Commission statement per rep: deal-by-deal breakdown with commission amount
- Export to payroll: commission amount feeds into payroll variable pay for the period

**14f — Territory Analytics**
Territory detail page shows:
- Total pipeline value in territory
- Deals by stage breakdown
- Win rate in territory vs. company average
- Average deal size vs. company average
- Lead count and conversion rate
- Rep attainment vs. quota
- Territory map with deal density heatmap (Leaflet.js choropleth)

---

### FEATURE 15: Multi-Entity Accounting
**Plan Step:** 50
**Tier:** Enterprise add-on (£99/entity/month)
**API Cost:** ZERO — internal architecture extension

#### Full Build Specification

**15a — Entity Setup**
Under one workspace, create unlimited legal entities:
- Entity fields: legal name, trading name, company registration number, VAT number, registered address, base currency, financial year-end month, accounting reference date
- Companies House lookup on entity creation (auto-populate from Step 5)
- Primary entity: the main operating company (pre-set, cannot be deleted)
- Each entity has its own: Chart of Accounts (can inherit from master or customise), General Ledger, VAT setup, bank accounts, Payroll configuration

**15b — Data Isolation Model**
- Financial data (GL, invoices, bills, payroll, bank accounts) fully isolated per entity
- Shared data (contacts, accounts, products, suppliers) shared across entities by default — with optional entity-scoping
- Documents: can be entity-scoped or workspace-wide
- CRM: deals, activities, leads are entity-aware (created in context of current entity)
- Entity context: navigation bar shows current entity + quick-switch dropdown

**15c — Intercompany Transactions**
When one entity charges or pays another:
- "Intercompany" toggle on invoice/bill: select the counterparty entity
- Both sides automatically created: invoice in Entity A + corresponding bill in Entity B
- Intercompany balance account (1300 Intercompany Receivable / 2300 Intercompany Payable) auto-managed
- Matching: intercompany pairs linked in the GL for elimination at consolidation
- Clearing: end-of-period intercompany balance confirmation workflow

**15d — Consolidated Reporting**
Group-level P&L and Balance Sheet:
- Consolidation engine: sum all entity financials
- Intercompany elimination: net out intercompany transactions
- Minority interest adjustment (if applicable — for partial ownership structures)
- Consolidated Balance Sheet shows: total assets, liabilities, equity across all entities
- Consolidated P&L: total group revenue, expenses, profit
- Entity-by-entity breakdown within the consolidated report (drill-down)
- Export: group accounts in Excel or PDF

**15e — Shared Chart of Accounts**
- Master COA: defined at workspace level
- Entity COA: inherits master + can add entity-specific accounts
- Mapping: each entity can map their local account to the group account (for consolidation)
- Account codes: entity prefix optional (e.g. Entity A uses 1000s, Entity B uses 2000s)

**15f — Multi-Entity User Access**
- User permissions per entity:
  - All entities (group-level admin)
  - Specific entity only (entity-level finance manager)
  - Read-only across all entities (group CFO read view)
- Each entity can have its own local admin (no visibility to other entities)
- Audit log: entity-scoped (actions in Entity A logged in Entity A audit trail)

**15g — VAT Groups**
- HMRC allows groups of companies to register as a single VAT entity (VAT grouping)
- Toggle: "This entity is part of the group's VAT registration"
- Group VAT return: consolidates all entities into one return
- Intercompany supplies within VAT group: outside the scope of VAT (zero-rated internally)

---

# APPENDIX B: FEATURE-TO-STEP MASTER CROSS-REFERENCE

| Part 3 Feature | Plan Steps | Phase | Tier | Status |
|---|---|---|---|---|
| 1. MTD ITSA | 1, 2, 3 | Phase 1 | UK Compliance Add-On | Fully specced |
| 2. Companies House | 5 | Phase 1 | Core | Fully specced |
| 3. PAYE / RTI | 4 | Phase 1 | UK Compliance Add-On | Fully specced |
| 4. eSignature | 6 | Phase 1 | Core / Professional | Fully specced |
| 5. Open Banking | 8, 9 | Phase 1 | Bank Feeds Add-On | Fully specced |
| 6. AI Copilot Expansion | 15, 16, 19, 20, 21, 22, 23 | Phase 2 + 3 | AI Add-On | Fully specced |
| 7. Client Portal Enhancement | 48, 49 | Phase 10 | Business tier | Fully specced |
| 8. Proposal + CLM Builder | 13, 24, 26 | Phase 2 + 4 | Professional/Business | Fully specced |
| 9. Subscription / MRR | 14 | Phase 2 | Professional tier | Fully specced |
| 10. Volunteer Management | 27 | Phase 5 | Charity Module | Fully specced |
| 11. Predictive Forecasting AI | 16 (extended) | Phase 2 + 3 | AI Add-On | Fully specced |
| 12. AI HR Assistant | 38 + 19 (extended) | Phase 3 + 7 | AI Add-On | Fully specced |
| 13. ESG & Carbon Reporting | 33 | Phase 6 | Business / Compliance | Fully specced |
| 14. Territory & Quota | 11 | Phase 2 | Business tier | Fully specced |
| 15. Multi-Entity Accounting | 50 | Phase 10 | Enterprise Add-On | Fully specced |

**All 15 features are planned, costed, technically specced at L4–L9 depth, and mapped to implementation sprints.**

---

*End of Plan — Orbas Build Upgrade v2.0 (with Appendices)*
*56 Steps + 15 Feature Deep-Specs | Levels 1–9 | Full API Cost Analysis | Implementation Sprints 1–7*
