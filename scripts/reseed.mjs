// Orbas reseed — with workspace_id on every insert
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

const USER_ID = process.env.SEED_USER_ID
const WS_ID = process.env.SEED_WORKSPACE_ID
const SEED_USER_EMAIL = process.env.SEED_USER_EMAIL
const SEED_USER_FULL_NAME = process.env.SEED_USER_FULL_NAME ?? "Orbas Demo User"

if (!SUPABASE_URL || !SERVICE_KEY || !USER_ID || !WS_ID || !SEED_USER_EMAIL) {
  console.error("Missing required reseed env vars. See .env.example.")
  process.exit(1)
}

function headers(extra = {}) {
  return {
    apikey: SERVICE_KEY,
    Authorization: "Bearer " + SERVICE_KEY,
    "Content-Type": "application/json",
    Prefer: "return=representation",
    ...extra,
  }
}

async function post(table, body) {
  const r = await fetch(SUPABASE_URL + "/rest/v1/" + table, {
    method: "POST", headers: headers(), body: JSON.stringify(body),
  })
  const d = await r.json()
  return { status: r.status, data: d }
}

async function del(table, filter) {
  await fetch(SUPABASE_URL + "/rest/v1/" + table + "?" + filter, {
    method: "DELETE", headers: headers(),
  })
}

// Profile upsert
console.log("Upserting profile...")
const pr = await fetch(SUPABASE_URL + "/rest/v1/profiles", {
  method: "POST",
  headers: headers({ Prefer: "resolution=merge-duplicates,return=representation" }),
  body: JSON.stringify({
    id: USER_ID, workspace_id: WS_ID,
    full_name: SEED_USER_FULL_NAME, email: SEED_USER_EMAIL, role: "owner",
  }),
})
console.log("Profile HTTP:", pr.status)

// Clear workspace data
console.log("Clearing old data...")
await del("crm_deals",    "workspace_id=eq." + WS_ID)
await del("crm_contacts", "workspace_id=eq." + WS_ID)
await del("crm_accounts", "workspace_id=eq." + WS_ID)
await del("service_tickets", "workspace_id=eq." + WS_ID)

// Accounts
console.log("Seeding accounts...")
const acR = await post("crm_accounts", [
  { workspace_id: WS_ID, name: "TechGrid Ltd",           industry: "Technology",         website: "techgrid.io",           employees_count: 85,  annual_revenue: 4200000 },
  { workspace_id: WS_ID, name: "NovaBuild Group",        industry: "Construction",       website: "novabuild.co.uk",       employees_count: 320, annual_revenue: 18500000 },
  { workspace_id: WS_ID, name: "Fintech Corp Ltd",       industry: "Financial Services", website: "fintechcorp.co.uk",     employees_count: 140, annual_revenue: 9800000 },
  { workspace_id: WS_ID, name: "Vertex Solutions",       industry: "Consulting",         website: "vertexsolutions.co.uk", employees_count: 55,  annual_revenue: 3100000 },
  { workspace_id: WS_ID, name: "BlueWave Digital",       industry: "Marketing",          website: "bluewave.digital",      employees_count: 28,  annual_revenue: 1400000 },
  { workspace_id: WS_ID, name: "Oakfield Media",         industry: "Media",              website: "oakfieldmedia.co.uk",   employees_count: 62,  annual_revenue: 2900000 },
  { workspace_id: WS_ID, name: "Sandstone Corp",         industry: "Manufacturing",      website: "sandstone.co.uk",       employees_count: 480, annual_revenue: 32000000 },
  { workspace_id: WS_ID, name: "Crestview Labs",         industry: "Biotech",            website: "crestviewlabs.io",      employees_count: 95,  annual_revenue: 6700000 },
  { workspace_id: WS_ID, name: "Prism Analytics",        industry: "Technology",         website: "prismanalytics.com",    employees_count: 44,  annual_revenue: 2200000 },
  { workspace_id: WS_ID, name: "Apex Ventures",          industry: "Investment",         website: "apexventures.co.uk",    employees_count: 18,  annual_revenue: 850000 },
  { workspace_id: WS_ID, name: "RapidFlow Systems",      industry: "Logistics",          website: "rapidflow.co.uk",       employees_count: 210, annual_revenue: 14200000 },
  { workspace_id: WS_ID, name: "Gridpoint Technologies", industry: "Technology",         website: "gridpoint.io",          employees_count: 73,  annual_revenue: 3800000 },
])
const accounts = Array.isArray(acR.data) ? acR.data : []
console.log("Accounts:", accounts.length, "| HTTP", acR.status)
if (acR.status >= 400) { console.error(JSON.stringify(acR.data).slice(0, 300)); process.exit(1) }

function aid(name) { return accounts.find(a => a.name === name)?.id ?? null }

// Contacts
console.log("Seeding contacts...")
const ctR = await post("crm_contacts", [
  { workspace_id: WS_ID, first_name: "James",     last_name: "Whitfield",  email: "j.whitfield@fintechcorp.co.uk",   phone: "07700900101", job_title: "CFO",             account_id: aid("Fintech Corp Ltd") },
  { workspace_id: WS_ID, first_name: "Priya",     last_name: "Sharma",     email: "priya.s@novabuild.co.uk",         phone: "07700900102", job_title: "Head of Ops",     account_id: aid("NovaBuild Group") },
  { workspace_id: WS_ID, first_name: "Oliver",    last_name: "Hughes",     email: "o.hughes@techgrid.io",            phone: "07700900103", job_title: "CEO",             account_id: aid("TechGrid Ltd") },
  { workspace_id: WS_ID, first_name: "Emma",      last_name: "Thornton",   email: "emma.t@vertexsolutions.co.uk",    phone: "07700900104", job_title: "Partner",         account_id: aid("Vertex Solutions") },
  { workspace_id: WS_ID, first_name: "Daniel",    last_name: "Roberts",    email: "d.roberts@bluewave.digital",      phone: "07700900105", job_title: "Marketing Dir",   account_id: aid("BlueWave Digital") },
  { workspace_id: WS_ID, first_name: "Sophie",    last_name: "Clarke",     email: "s.clarke@oakfieldmedia.co.uk",    phone: "07700900106", job_title: "COO",             account_id: aid("Oakfield Media") },
  { workspace_id: WS_ID, first_name: "Marcus",    last_name: "Williams",   email: "m.williams@sandstone.co.uk",      phone: "07700900107", job_title: "Procurement Dir", account_id: aid("Sandstone Corp") },
  { workspace_id: WS_ID, first_name: "Charlotte", last_name: "Davies",     email: "c.davies@crestviewlabs.io",       phone: "07700900108", job_title: "CTO",             account_id: aid("Crestview Labs") },
  { workspace_id: WS_ID, first_name: "Isabella",  last_name: "King",       email: "i.king@prismanalytics.com",       phone: "07700900110", job_title: "Data Director",   account_id: aid("Prism Analytics") },
  { workspace_id: WS_ID, first_name: "Ethan",     last_name: "Morgan",     email: "e.morgan@rapidflow.co.uk",        phone: "07700900111", job_title: "VP Operations",   account_id: aid("RapidFlow Systems") },
  { workspace_id: WS_ID, first_name: "Amelia",    last_name: "Brooks",     email: "a.brooks@gridpoint.io",           phone: "07700900112", job_title: "Head of Product", account_id: aid("Gridpoint Technologies") },
  { workspace_id: WS_ID, first_name: "Noah",      last_name: "Campbell",   email: "n.campbell@apexventures.co.uk",   phone: "07700900113", job_title: "MD",              account_id: aid("Apex Ventures") },
  { workspace_id: WS_ID, first_name: "Grace",     last_name: "Bennett",    email: "g.bennett@clearpath.co.uk",       phone: "07700900114", job_title: "CX Director",     account_id: null },
  { workspace_id: WS_ID, first_name: "Liam",      last_name: "Peterson",   email: "l.peterson@apexventures.co.uk",   phone: "07700900115", job_title: "Investment Assoc",account_id: aid("Apex Ventures") },
  { workspace_id: WS_ID, first_name: "Sarah",     last_name: "Mitchell",   email: "s.mitchell@techgrid.io",          phone: "07700900116", job_title: "Sales Director",  account_id: aid("TechGrid Ltd") },
  { workspace_id: WS_ID, first_name: "Chloe",     last_name: "Evans",      email: "c.evans@sandstone.co.uk",         phone: "07700900117", job_title: "Finance Manager", account_id: aid("Sandstone Corp") },
  { workspace_id: WS_ID, first_name: "Tom",       last_name: "Bradley",    email: "t.bradley@novabuild.co.uk",       phone: "07700900118", job_title: "BD Manager",      account_id: aid("NovaBuild Group") },
])
console.log("Contacts:", Array.isArray(ctR.data) ? ctR.data.length : "err", "| HTTP", ctR.status)
if (ctR.status >= 400) console.error(JSON.stringify(ctR.data).slice(0, 300))

// Deals
console.log("Seeding deals...")
const dlR = await post("crm_deals", [
  { workspace_id: WS_ID, title: "TechGrid — Enterprise Licence",    account_id: aid("TechGrid Ltd"),           value: 48000,  currency: "GBP", stage: "Proposal",    probability: 65,  expected_close_date: "2026-07-15" },
  { workspace_id: WS_ID, title: "NovaBuild — ERP Rollout",          account_id: aid("NovaBuild Group"),        value: 125000, currency: "GBP", stage: "Negotiation", probability: 80,  expected_close_date: "2026-06-30" },
  { workspace_id: WS_ID, title: "Fintech Corp — CRM + Accounting",  account_id: aid("Fintech Corp Ltd"),       value: 72000,  currency: "GBP", stage: "Discovery",   probability: 40,  expected_close_date: "2026-08-20" },
  { workspace_id: WS_ID, title: "Sandstone — Full Platform",        account_id: aid("Sandstone Corp"),         value: 240000, currency: "GBP", stage: "Closed Won",  probability: 100, expected_close_date: "2026-06-01" },
  { workspace_id: WS_ID, title: "Vertex Solutions — HR Module",     account_id: aid("Vertex Solutions"),       value: 28000,  currency: "GBP", stage: "Proposal",    probability: 55,  expected_close_date: "2026-07-31" },
  { workspace_id: WS_ID, title: "Oakfield Media — Renewal",         account_id: aid("Oakfield Media"),         value: 36000,  currency: "GBP", stage: "Closed Won",  probability: 100, expected_close_date: "2026-05-20" },
  { workspace_id: WS_ID, title: "Crestview Labs — Pilot",           account_id: aid("Crestview Labs"),         value: 18500,  currency: "GBP", stage: "Prospecting", probability: 25,  expected_close_date: "2026-09-15" },
  { workspace_id: WS_ID, title: "RapidFlow — Operations Suite",     account_id: aid("RapidFlow Systems"),      value: 95000,  currency: "GBP", stage: "Negotiation", probability: 85,  expected_close_date: "2026-06-28" },
  { workspace_id: WS_ID, title: "Prism Analytics — BI Add-on",      account_id: aid("Prism Analytics"),        value: 22000,  currency: "GBP", stage: "Proposal",    probability: 60,  expected_close_date: "2026-07-10" },
  { workspace_id: WS_ID, title: "Gridpoint — Starter Plan",         account_id: aid("Gridpoint Technologies"), value: 9500,   currency: "GBP", stage: "Discovery",   probability: 35,  expected_close_date: "2026-08-05" },
  { workspace_id: WS_ID, title: "BlueWave — CRM Upgrade",           account_id: aid("BlueWave Digital"),       value: 15000,  currency: "GBP", stage: "Closed Lost", probability: 0,   expected_close_date: "2026-05-15" },
  { workspace_id: WS_ID, title: "Apex Ventures — Compliance Pack",  account_id: aid("Apex Ventures"),          value: 8800,   currency: "GBP", stage: "Proposal",    probability: 50,  expected_close_date: "2026-07-25" },
])
console.log("Deals:", Array.isArray(dlR.data) ? dlR.data.length : "err", "| HTTP", dlR.status)
if (dlR.status >= 400) console.error(JSON.stringify(dlR.data).slice(0, 300))

// Service Tickets
console.log("Seeding tickets...")
const tkR = await post("service_tickets", [
  { workspace_id: WS_ID, title: "Cannot export invoices to PDF",               status: "open",        priority: "high",   category: "Bug",             description: "When clicking Export PDF on any invoice the page hangs. Started after the last update." },
  { workspace_id: WS_ID, title: "Add VAT reverse charge support to billing",   status: "open",        priority: "medium", category: "Feature Request", description: "We deal with EU suppliers and need reverse charge VAT to appear correctly on bills." },
  { workspace_id: WS_ID, title: "Pipeline view not loading for new users",     status: "in_progress", priority: "high",   category: "Bug",             description: "New team members see a blank page when navigating to CRM > Pipeline." },
  { workspace_id: WS_ID, title: "Request: Bulk CSV import for contacts",       status: "open",        priority: "low",    category: "Feature Request", description: "We have 2,000 contacts to migrate. A bulk import tool would save significant time." },
  { workspace_id: WS_ID, title: "HMRC MTD connection keeps dropping",          status: "in_progress", priority: "high",   category: "Integration",     description: "OAuth token refreshes fail overnight. Need to reconnect every morning." },
  { workspace_id: WS_ID, title: "Payslip formatting issues on mobile",         status: "resolved",    priority: "medium", category: "Bug",             description: "Payslips render incorrectly on mobile Safari. Fixed." },
  { workspace_id: WS_ID, title: "Add Slack notification for new deals",        status: "open",        priority: "low",    category: "Integration",     description: "Alert in Slack whenever a deal moves to Closed Won." },
  { workspace_id: WS_ID, title: "2FA setup page throws error on iPhone",       status: "resolved",    priority: "medium", category: "Bug",             description: "QR code generation failed on iOS Safari. Root cause was missing crypto polyfill." },
  { workspace_id: WS_ID, title: "Reports: date range filter not persisting",   status: "open",        priority: "medium", category: "Bug",             description: "Selected date range resets after navigating away from the Reports page." },
  { workspace_id: WS_ID, title: "Custom domain for client portal",             status: "open",        priority: "low",    category: "Feature Request", description: "Can we map portal.ourclient.com to the Orbas client portal?" },
])
console.log("Tickets:", Array.isArray(tkR.data) ? tkR.data.length : "err", "| HTTP", tkR.status)
if (tkR.status >= 400) console.error(JSON.stringify(tkR.data).slice(0, 300))

console.log("\n")
console.log("  SEED COMPLETE")
console.log("  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
console.log("  URL:      http://localhost:3000/login")
console.log("  Email:    " + SEED_USER_EMAIL)
console.log("  Password: set in SEED_USER_PASSWORD")
console.log("  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
