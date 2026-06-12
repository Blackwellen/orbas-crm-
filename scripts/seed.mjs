// Orbas seed script — creates user, workspace, and sample data
// Run: node scripts/seed.mjs

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
const SEED_USER_EMAIL = process.env.SEED_USER_EMAIL
const SEED_USER_PASSWORD = process.env.SEED_USER_PASSWORD
const SEED_USER_FULL_NAME = process.env.SEED_USER_FULL_NAME ?? "Orbas Demo User"

if (!SUPABASE_URL || !SERVICE_KEY || !SEED_USER_EMAIL || !SEED_USER_PASSWORD) {
  console.error("Missing required seed env vars. See .env.example.")
  process.exit(1)
}

const headers = {
  "apikey": SERVICE_KEY,
  "Authorization": `Bearer ${SERVICE_KEY}`,
  "Content-Type": "application/json",
  "Prefer": "return=representation",
}

async function api(method, path, body) {
  const res = await fetch(`${SUPABASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  })
  const text = await res.text()
  try { return { status: res.status, data: JSON.parse(text) }
  } catch { return { status: res.status, data: text } }
}

// ── 1. Create auth user ──────────────────────────────────────────────────────
console.log("Creating auth user…")
const userRes = await api("POST", "/auth/v1/admin/users", {
  email: SEED_USER_EMAIL,
  password: SEED_USER_PASSWORD,
  email_confirm: true,
  user_metadata: { full_name: SEED_USER_FULL_NAME },
})
if (userRes.status !== 200 && userRes.status !== 201) {
  // User may already exist — try to get them
  console.log("User create response:", userRes.status, JSON.stringify(userRes.data).slice(0, 200))
  if (userRes.status === 422 && JSON.stringify(userRes.data).includes("already")) {
    console.log("User already exists, fetching…")
  } else {
    console.error("Failed to create user:", userRes.data)
    process.exit(1)
  }
}

const userId = userRes.data?.id
console.log("User ID:", userId)

// ── 2. Create workspace ──────────────────────────────────────────────────────
console.log("Creating workspace…")
const wsRes = await api("POST", "/rest/v1/workspaces", {
  name: "Orbas Demo",
  slug: "orbas-demo",
  plan: "growth",
})
const workspaceId = Array.isArray(wsRes.data) ? wsRes.data[0]?.id : wsRes.data?.id
console.log("Workspace ID:", workspaceId)

// ── 3. Create profile ────────────────────────────────────────────────────────
if (userId) {
  console.log("Creating profile…")
  await api("POST", "/rest/v1/profiles", {
    id: userId,
    workspace_id: workspaceId,
    full_name: SEED_USER_FULL_NAME,
    email: SEED_USER_EMAIL,
    role: "owner",
  })
}

// ── 4. Seed CRM Accounts ────────────────────────────────────────────────────
console.log("Seeding accounts…")
const accountsData = [
  { workspace_id: workspaceId, name: "TechGrid Ltd",          industry: "Technology",       website: "techgrid.io",         employees_count: 85,  annual_revenue: 4200000, status: "customer" },
  { workspace_id: workspaceId, name: "NovaBuild Group",       industry: "Construction",     website: "novabuild.co.uk",     employees_count: 320, annual_revenue: 18500000, status: "customer" },
  { workspace_id: workspaceId, name: "Fintech Corp Ltd",      industry: "Financial Services", website: "fintechcorp.co.uk", employees_count: 140, annual_revenue: 9800000, status: "prospect" },
  { workspace_id: workspaceId, name: "Vertex Solutions",      industry: "Consulting",       website: "vertexsolutions.co.uk", employees_count: 55, annual_revenue: 3100000, status: "customer" },
  { workspace_id: workspaceId, name: "BlueWave Digital",      industry: "Marketing",        website: "bluewave.digital",    employees_count: 28,  annual_revenue: 1400000, status: "prospect" },
  { workspace_id: workspaceId, name: "Oakfield Media",        industry: "Media",            website: "oakfieldmedia.co.uk", employees_count: 62,  annual_revenue: 2900000, status: "customer" },
  { workspace_id: workspaceId, name: "Sandstone Corp",        industry: "Manufacturing",    website: "sandstone.co.uk",     employees_count: 480, annual_revenue: 32000000, status: "customer" },
  { workspace_id: workspaceId, name: "Crestview Labs",        industry: "Biotech",          website: "crestviewlabs.io",    employees_count: 95,  annual_revenue: 6700000, status: "prospect" },
  { workspace_id: workspaceId, name: "Prism Analytics",       industry: "Technology",       website: "prismanalytics.com",  employees_count: 44,  annual_revenue: 2200000, status: "customer" },
  { workspace_id: workspaceId, name: "Apex Ventures",         industry: "Investment",       website: "apexventures.co.uk",  employees_count: 18,  annual_revenue: 850000,  status: "prospect" },
  { workspace_id: workspaceId, name: "RapidFlow Systems",     industry: "Logistics",        website: "rapidflow.co.uk",     employees_count: 210, annual_revenue: 14200000, status: "customer" },
  { workspace_id: workspaceId, name: "Gridpoint Technologies", industry: "Technology",      website: "gridpoint.io",        employees_count: 73,  annual_revenue: 3800000, status: "prospect" },
]

const acctRes = await api("POST", "/rest/v1/crm_accounts", accountsData)
const accounts = Array.isArray(acctRes.data) ? acctRes.data : []
console.log("Accounts created:", accounts.length)

// ── 5. Seed CRM Contacts ────────────────────────────────────────────────────
console.log("Seeding contacts…")
const getAcctId = (name) => accounts.find(a => a.name === name)?.id
const contactsData = [
  { workspace_id: workspaceId, first_name: "James",     last_name: "Whitfield",  email: "j.whitfield@fintechcorp.co.uk",    phone: "07700 900 101", job_title: "CFO",              account_id: getAcctId("Fintech Corp Ltd") },
  { workspace_id: workspaceId, first_name: "Priya",     last_name: "Sharma",     email: "priya.s@novabuild.co.uk",          phone: "07700 900 102", job_title: "Head of Ops",      account_id: getAcctId("NovaBuild Group") },
  { workspace_id: workspaceId, first_name: "Oliver",    last_name: "Hughes",     email: "o.hughes@techgrid.io",             phone: "07700 900 103", job_title: "CEO",              account_id: getAcctId("TechGrid Ltd") },
  { workspace_id: workspaceId, first_name: "Emma",      last_name: "Thornton",   email: "emma.t@vertexsolutions.co.uk",     phone: "07700 900 104", job_title: "Partner",          account_id: getAcctId("Vertex Solutions") },
  { workspace_id: workspaceId, first_name: "Daniel",    last_name: "Roberts",    email: "d.roberts@bluewave.digital",       phone: "07700 900 105", job_title: "Marketing Dir",    account_id: getAcctId("BlueWave Digital") },
  { workspace_id: workspaceId, first_name: "Sophie",    last_name: "Clarke",     email: "s.clarke@oakfieldmedia.co.uk",     phone: "07700 900 106", job_title: "COO",              account_id: getAcctId("Oakfield Media") },
  { workspace_id: workspaceId, first_name: "Marcus",    last_name: "Williams",   email: "m.williams@sandstone.co.uk",       phone: "07700 900 107", job_title: "Procurement Dir",  account_id: getAcctId("Sandstone Corp") },
  { workspace_id: workspaceId, first_name: "Charlotte", last_name: "Davies",     email: "c.davies@crestviewlabs.io",        phone: "07700 900 108", job_title: "CTO",              account_id: getAcctId("Crestview Labs") },
  { workspace_id: workspaceId, first_name: "Aiden",     last_name: "Foster",     email: "a.foster@hartfield.co.uk",         phone: "07700 900 109", job_title: "Director",         account_id: null },
  { workspace_id: workspaceId, first_name: "Isabella",  last_name: "King",       email: "i.king@prismanalytics.com",        phone: "07700 900 110", job_title: "Data Director",    account_id: getAcctId("Prism Analytics") },
  { workspace_id: workspaceId, first_name: "Ethan",     last_name: "Morgan",     email: "e.morgan@rapidflow.co.uk",         phone: "07700 900 111", job_title: "VP Operations",    account_id: getAcctId("RapidFlow Systems") },
  { workspace_id: workspaceId, first_name: "Amelia",    last_name: "Brooks",     email: "a.brooks@gridpoint.io",            phone: "07700 900 112", job_title: "Head of Product",  account_id: getAcctId("Gridpoint Technologies") },
  { workspace_id: workspaceId, first_name: "Noah",      last_name: "Campbell",   email: "n.campbell@apexventures.co.uk",    phone: "07700 900 113", job_title: "MD",               account_id: getAcctId("Apex Ventures") },
  { workspace_id: workspaceId, first_name: "Grace",     last_name: "Bennett",    email: "g.bennett@clearpath.co.uk",        phone: "07700 900 114", job_title: "CX Director",      account_id: null },
  { workspace_id: workspaceId, first_name: "Liam",      last_name: "Peterson",   email: "l.peterson@apexventures.co.uk",    phone: "07700 900 115", job_title: "Investment Assoc", account_id: getAcctId("Apex Ventures") },
  { workspace_id: workspaceId, first_name: "Sarah",     last_name: "Mitchell",   email: "s.mitchell@techgrid.io",           phone: "07700 900 116", job_title: "Sales Director",   account_id: getAcctId("TechGrid Ltd") },
  { workspace_id: workspaceId, first_name: "Chloe",     last_name: "Evans",      email: "c.evans@sandstone.co.uk",          phone: "07700 900 117", job_title: "Finance Manager",  account_id: getAcctId("Sandstone Corp") },
  { workspace_id: workspaceId, first_name: "Tom",       last_name: "Bradley",    email: "t.bradley@novabuild.co.uk",        phone: "07700 900 118", job_title: "BD Manager",       account_id: getAcctId("NovaBuild Group") },
]

const ctRes = await api("POST", "/rest/v1/crm_contacts", contactsData)
const contacts = Array.isArray(ctRes.data) ? ctRes.data : []
console.log("Contacts created:", contacts.length)

// ── 6. Seed CRM Deals ───────────────────────────────────────────────────────
console.log("Seeding deals…")
const dealsData = [
  { workspace_id: workspaceId, title: "TechGrid — Enterprise Licence",   account_id: getAcctId("TechGrid Ltd"),          value: 48000,  currency: "GBP", stage: "Proposal",      probability: 65, expected_close_date: "2026-07-15" },
  { workspace_id: workspaceId, title: "NovaBuild — ERP Rollout",         account_id: getAcctId("NovaBuild Group"),       value: 125000, currency: "GBP", stage: "Negotiation",   probability: 80, expected_close_date: "2026-06-30" },
  { workspace_id: workspaceId, title: "Fintech Corp — CRM + Accounting", account_id: getAcctId("Fintech Corp Ltd"),      value: 72000,  currency: "GBP", stage: "Discovery",     probability: 40, expected_close_date: "2026-08-20" },
  { workspace_id: workspaceId, title: "Sandstone — Full Platform",       account_id: getAcctId("Sandstone Corp"),        value: 240000, currency: "GBP", stage: "Closed Won",    probability: 100, expected_close_date: "2026-06-01" },
  { workspace_id: workspaceId, title: "Vertex Solutions — HR Module",    account_id: getAcctId("Vertex Solutions"),      value: 28000,  currency: "GBP", stage: "Proposal",      probability: 55, expected_close_date: "2026-07-31" },
  { workspace_id: workspaceId, title: "Oakfield Media — Renewal",        account_id: getAcctId("Oakfield Media"),        value: 36000,  currency: "GBP", stage: "Closed Won",    probability: 100, expected_close_date: "2026-05-20" },
  { workspace_id: workspaceId, title: "Crestview Labs — Pilot",          account_id: getAcctId("Crestview Labs"),        value: 18500,  currency: "GBP", stage: "Prospecting",   probability: 25, expected_close_date: "2026-09-15" },
  { workspace_id: workspaceId, title: "RapidFlow — Operations Suite",    account_id: getAcctId("RapidFlow Systems"),     value: 95000,  currency: "GBP", stage: "Negotiation",   probability: 85, expected_close_date: "2026-06-28" },
  { workspace_id: workspaceId, title: "Prism Analytics — BI Add-on",     account_id: getAcctId("Prism Analytics"),       value: 22000,  currency: "GBP", stage: "Proposal",      probability: 60, expected_close_date: "2026-07-10" },
  { workspace_id: workspaceId, title: "Gridpoint — Starter Plan",        account_id: getAcctId("Gridpoint Technologies"), value: 9500,  currency: "GBP", stage: "Discovery",     probability: 35, expected_close_date: "2026-08-05" },
  { workspace_id: workspaceId, title: "BlueWave — CRM Upgrade",          account_id: getAcctId("BlueWave Digital"),      value: 15000,  currency: "GBP", stage: "Closed Lost",   probability: 0,  expected_close_date: "2026-05-15" },
  { workspace_id: workspaceId, title: "Apex Ventures — Compliance Pack", account_id: getAcctId("Apex Ventures"),         value: 8800,   currency: "GBP", stage: "Proposal",      probability: 50, expected_close_date: "2026-07-25" },
]

const dealsRes = await api("POST", "/rest/v1/crm_deals", dealsData)
console.log("Deals created:", Array.isArray(dealsRes.data) ? dealsRes.data.length : dealsRes.status)

// ── 7. Seed CRM Leads ───────────────────────────────────────────────────────
console.log("Seeding leads…")
const leadsData = [
  { workspace_id: workspaceId, first_name: "Rachel",  last_name: "Stone",    email: "r.stone@horizongroup.co.uk",    company: "Horizon Group",       source: "LinkedIn",      status: "new",       score: 78 },
  { workspace_id: workspaceId, first_name: "David",   last_name: "Carr",     email: "d.carr@pulsetech.io",           company: "PulseTech Ltd",       source: "Website",       status: "contacted", score: 62 },
  { workspace_id: workspaceId, first_name: "Natalie", last_name: "Wood",     email: "n.wood@brightfield.co.uk",      company: "Brightfield & Co",    source: "Referral",      status: "qualified", score: 91 },
  { workspace_id: workspaceId, first_name: "Ben",     last_name: "Harris",   email: "b.harris@northstarsys.co.uk",   company: "Northstar Systems",   source: "Event",         status: "new",       score: 45 },
  { workspace_id: workspaceId, first_name: "Lucy",    last_name: "Turner",   email: "l.turner@cascadeventures.io",   company: "Cascade Ventures",    source: "Cold Outreach", status: "contacted", score: 55 },
  { workspace_id: workspaceId, first_name: "Jack",    last_name: "Hill",     email: "j.hill@ironbridgetech.co.uk",   company: "Ironbridge Tech",     source: "LinkedIn",      status: "qualified", score: 88 },
  { workspace_id: workspaceId, first_name: "Amy",     last_name: "Walsh",    email: "a.walsh@greenleafenergy.co.uk", company: "Greenleaf Energy",    source: "Website",       status: "new",       score: 33 },
  { workspace_id: workspaceId, first_name: "Chris",   last_name: "Hall",     email: "c.hall@meridiangroup.co.uk",    company: "Meridian Group",      source: "Referral",      status: "contacted", score: 70 },
  { workspace_id: workspaceId, first_name: "Zoe",     last_name: "Price",    email: "z.price@silverpeak.io",         company: "Silverpeak Ltd",      source: "Event",         status: "converted", score: 96 },
  { workspace_id: workspaceId, first_name: "Matt",    last_name: "Cooper",   email: "m.cooper@alphastream.co.uk",    company: "AlphaStream",         source: "Cold Outreach", status: "new",       score: 28 },
  { workspace_id: workspaceId, first_name: "Hannah",  last_name: "Reed",     email: "h.reed@forgetech.co.uk",        company: "ForgeTech Solutions", source: "LinkedIn",      status: "qualified", score: 84 },
  { workspace_id: workspaceId, first_name: "Jake",    last_name: "Long",     email: "j.long@summitconsult.co.uk",    company: "Summit Consulting",   source: "Website",       status: "new",       score: 52 },
]

const leadsRes = await api("POST", "/rest/v1/crm_leads", leadsData)
console.log("Leads created:", Array.isArray(leadsRes.data) ? leadsRes.data.length : leadsRes.status)

// ── 8. Seed Service Tickets ─────────────────────────────────────────────────
console.log("Seeding service tickets…")
const ticketsData = [
  { workspace_id: workspaceId, title: "Cannot export invoices to PDF",               status: "open",       priority: "high",   category: "Bug",           description: "When clicking Export PDF on any invoice the page hangs. Started after the last update." },
  { workspace_id: workspaceId, title: "Add VAT reverse charge support to billing",   status: "open",       priority: "medium", category: "Feature Request", description: "We deal with EU suppliers and need reverse charge VAT to appear correctly on bills." },
  { workspace_id: workspaceId, title: "Pipeline view not loading for new users",     status: "in_progress", priority: "high",  category: "Bug",           description: "New team members see a blank page when navigating to CRM > Pipeline. Existing users unaffected." },
  { workspace_id: workspaceId, title: "Request: Bulk CSV import for contacts",       status: "open",       priority: "low",    category: "Feature Request", description: "We have 2,000 contacts to migrate. A bulk import tool would save significant time." },
  { workspace_id: workspaceId, title: "HMRC MTD connection keeps dropping",          status: "in_progress", priority: "high",  category: "Integration",   description: "OAuth token refreshes fail overnight. Need to reconnect every morning." },
  { workspace_id: workspaceId, title: "Payslip formatting issues on mobile",         status: "resolved",   priority: "medium", category: "Bug",           description: "Payslips render incorrectly on mobile Safari. Fixed by wrapping in responsive container." },
  { workspace_id: workspaceId, title: "Add Slack notification for new deals",        status: "open",       priority: "low",    category: "Integration",   description: "Would like a Slack alert whenever a deal moves to Closed Won." },
  { workspace_id: workspaceId, title: "2FA setup page throws error on iPhone",       status: "resolved",   priority: "medium", category: "Bug",           description: "QR code generation failed on iOS Safari. Root cause was missing crypto polyfill." },
  { workspace_id: workspaceId, title: "Reports: date range filter not persisting",   status: "open",       priority: "medium", category: "Bug",           description: "Selected date range resets after navigating away from the Reports page." },
  { workspace_id: workspaceId, title: "Custom domain for client portal",             status: "open",       priority: "low",    category: "Feature Request", description: "Can we map portal.ourclient.com to the Orbas client portal?" },
]

const ticketsRes = await api("POST", "/rest/v1/service_tickets", ticketsData)
console.log("Tickets created:", Array.isArray(ticketsRes.data) ? ticketsRes.data.length : ticketsRes.status)

console.log("\n✅ Seed complete!")
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
console.log("  URL:      http://localhost:3000")
console.log("  Email:    " + SEED_USER_EMAIL)
console.log("  Password: " + SEED_USER_PASSWORD)
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
