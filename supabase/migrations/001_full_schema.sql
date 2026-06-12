-- ============================================================
-- ORBAS CRM - Full Schema Migration 001
-- Run via: supabase db push  OR  Supabase SQL Editor
-- ============================================================

-- CORE WORKSPACE
CREATE TABLE IF NOT EXISTS workspaces (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  plan TEXT DEFAULT 'starter',
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  workspace_id UUID REFERENCES workspaces(id),
  full_name TEXT,
  email TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'member',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- CRM TABLES
CREATE TABLE IF NOT EXISTS crm_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID REFERENCES workspaces(id),
  first_name TEXT,
  last_name TEXT,
  email TEXT,
  phone TEXT,
  company TEXT,
  job_title TEXT,
  status TEXT DEFAULT 'new',
  source TEXT,
  owner_id UUID REFERENCES profiles(id),
  score INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS crm_contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID REFERENCES workspaces(id),
  first_name TEXT NOT NULL,
  last_name TEXT,
  email TEXT,
  phone TEXT,
  job_title TEXT,
  department TEXT,
  account_id UUID,
  owner_id UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS crm_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID REFERENCES workspaces(id),
  name TEXT NOT NULL,
  industry TEXT,
  website TEXT,
  phone TEXT,
  employees_count INTEGER,
  annual_revenue NUMERIC,
  status TEXT DEFAULT 'prospect',
  owner_id UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS crm_deals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID REFERENCES workspaces(id),
  title TEXT NOT NULL,
  account_id UUID REFERENCES crm_accounts(id),
  value NUMERIC DEFAULT 0,
  currency TEXT DEFAULT 'GBP',
  stage TEXT DEFAULT 'prospecting',
  probability INTEGER DEFAULT 0,
  close_date DATE,
  owner_id UUID REFERENCES profiles(id),
  status TEXT DEFAULT 'open',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ACCOUNTING TABLES
CREATE TABLE IF NOT EXISTS acc_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID REFERENCES workspaces(id),
  code TEXT NOT NULL,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  sub_type TEXT,
  parent_id UUID REFERENCES acc_accounts(id),
  is_active BOOLEAN DEFAULT true,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS acc_journals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID REFERENCES workspaces(id),
  reference TEXT NOT NULL,
  date DATE NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'draft',
  total_debit NUMERIC DEFAULT 0,
  total_credit NUMERIC DEFAULT 0,
  created_by UUID REFERENCES profiles(id),
  posted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS acc_journal_lines (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  journal_id UUID REFERENCES acc_journals(id) ON DELETE CASCADE,
  account_id UUID REFERENCES acc_accounts(id),
  description TEXT,
  debit NUMERIC DEFAULT 0,
  credit NUMERIC DEFAULT 0,
  department TEXT,
  cost_centre TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS acc_invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID REFERENCES workspaces(id),
  invoice_number TEXT NOT NULL,
  contact_id UUID,
  issue_date DATE NOT NULL,
  due_date DATE,
  status TEXT DEFAULT 'draft',
  subtotal NUMERIC DEFAULT 0,
  tax_amount NUMERIC DEFAULT 0,
  total NUMERIC DEFAULT 0,
  amount_paid NUMERIC DEFAULT 0,
  currency TEXT DEFAULT 'GBP',
  notes TEXT,
  journal_id UUID REFERENCES acc_journals(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS acc_invoice_lines (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_id UUID REFERENCES acc_invoices(id) ON DELETE CASCADE,
  description TEXT,
  quantity NUMERIC DEFAULT 1,
  unit_price NUMERIC DEFAULT 0,
  discount_percent NUMERIC DEFAULT 0,
  tax_rate NUMERIC DEFAULT 20,
  line_total NUMERIC DEFAULT 0
);

CREATE TABLE IF NOT EXISTS acc_bills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID REFERENCES workspaces(id),
  bill_number TEXT,
  supplier_id UUID,
  issue_date DATE NOT NULL,
  due_date DATE,
  status TEXT DEFAULT 'draft',
  subtotal NUMERIC DEFAULT 0,
  tax_amount NUMERIC DEFAULT 0,
  total NUMERIC DEFAULT 0,
  amount_paid NUMERIC DEFAULT 0,
  currency TEXT DEFAULT 'GBP',
  journal_id UUID REFERENCES acc_journals(id),
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS acc_payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID REFERENCES workspaces(id),
  type TEXT NOT NULL,
  amount NUMERIC NOT NULL,
  date DATE NOT NULL,
  reference TEXT,
  bank_account_id UUID,
  contact_id UUID,
  status TEXT DEFAULT 'pending',
  journal_id UUID REFERENCES acc_journals(id),
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS acc_bank_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID REFERENCES workspaces(id),
  name TEXT NOT NULL,
  account_number TEXT,
  sort_code TEXT,
  iban TEXT,
  currency TEXT DEFAULT 'GBP',
  current_balance NUMERIC DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS acc_bank_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  bank_account_id UUID REFERENCES acc_bank_accounts(id),
  date DATE NOT NULL,
  description TEXT,
  amount NUMERIC NOT NULL,
  balance NUMERIC,
  reference TEXT,
  is_reconciled BOOLEAN DEFAULT false,
  matched_payment_id UUID REFERENCES acc_payments(id),
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS acc_fixed_assets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID REFERENCES workspaces(id),
  name TEXT NOT NULL,
  category TEXT,
  serial_number TEXT,
  purchase_date DATE,
  purchase_cost NUMERIC DEFAULT 0,
  salvage_value NUMERIC DEFAULT 0,
  useful_life_years INTEGER DEFAULT 5,
  depreciation_method TEXT DEFAULT 'straight_line',
  accumulated_depreciation NUMERIC DEFAULT 0,
  book_value NUMERIC DEFAULT 0,
  location TEXT,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- HR / PEOPLE TABLES
CREATE TABLE IF NOT EXISTS hr_employees (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID REFERENCES workspaces(id),
  profile_id UUID REFERENCES profiles(id),
  employee_number TEXT,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  job_title TEXT,
  department TEXT,
  manager_id UUID REFERENCES hr_employees(id),
  start_date DATE,
  end_date DATE,
  employment_type TEXT DEFAULT 'full_time',
  status TEXT DEFAULT 'active',
  salary NUMERIC,
  pay_frequency TEXT DEFAULT 'monthly',
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS hr_leave_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID REFERENCES workspaces(id),
  employee_id UUID REFERENCES hr_employees(id),
  leave_type TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  days_requested NUMERIC,
  reason TEXT,
  status TEXT DEFAULT 'pending',
  approved_by UUID REFERENCES hr_employees(id),
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS hr_payroll_runs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID REFERENCES workspaces(id),
  pay_period_start DATE NOT NULL,
  pay_period_end DATE NOT NULL,
  pay_date DATE,
  status TEXT DEFAULT 'draft',
  employee_count INTEGER DEFAULT 0,
  gross_total NUMERIC DEFAULT 0,
  net_total NUMERIC DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- PROJECTS TABLES
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID REFERENCES workspaces(id),
  name TEXT NOT NULL,
  description TEXT,
  client_id UUID,
  status TEXT DEFAULT 'planning',
  start_date DATE,
  end_date DATE,
  budget NUMERIC DEFAULT 0,
  spent NUMERIC DEFAULT 0,
  progress_percent INTEGER DEFAULT 0,
  owner_id UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS project_tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'todo',
  priority TEXT DEFAULT 'medium',
  assignee_id UUID REFERENCES profiles(id),
  due_date DATE,
  estimated_hours NUMERIC,
  logged_hours NUMERIC DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- SERVICE / SUPPORT TABLES
CREATE TABLE IF NOT EXISTS service_tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID REFERENCES workspaces(id),
  ticket_number TEXT,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'open',
  priority TEXT DEFAULT 'medium',
  category TEXT,
  contact_id UUID,
  assigned_to UUID REFERENCES profiles(id),
  queue_id UUID,
  sla_breach_at TIMESTAMPTZ,
  resolved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- DOCUMENTS TABLES
CREATE TABLE IF NOT EXISTS documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID REFERENCES workspaces(id),
  name TEXT NOT NULL,
  type TEXT,
  size_bytes BIGINT,
  storage_path TEXT,
  folder_id UUID,
  owner_id UUID REFERENCES profiles(id),
  is_shared BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS document_folders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID REFERENCES workspaces(id),
  name TEXT NOT NULL,
  parent_id UUID REFERENCES document_folders(id),
  owner_id UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- COMPLIANCE TABLES
CREATE TABLE IF NOT EXISTS compliance_risks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID REFERENCES workspaces(id),
  title TEXT NOT NULL,
  description TEXT,
  category TEXT,
  likelihood INTEGER DEFAULT 3,
  impact INTEGER DEFAULT 3,
  score INTEGER GENERATED ALWAYS AS (likelihood * impact) STORED,
  owner_id UUID REFERENCES profiles(id),
  status TEXT DEFAULT 'identified',
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS compliance_policies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID REFERENCES workspaces(id),
  title TEXT NOT NULL,
  category TEXT,
  version TEXT DEFAULT '1.0',
  status TEXT DEFAULT 'draft',
  owner_id UUID REFERENCES profiles(id),
  review_date DATE,
  content TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- CHARITY TABLES
CREATE TABLE IF NOT EXISTS charity_donors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID REFERENCES workspaces(id),
  first_name TEXT,
  last_name TEXT,
  email TEXT,
  phone TEXT,
  type TEXT DEFAULT 'individual',
  gift_aid_eligible BOOLEAN DEFAULT false,
  total_donated NUMERIC DEFAULT 0,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS charity_donations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID REFERENCES workspaces(id),
  donor_id UUID REFERENCES charity_donors(id),
  amount NUMERIC NOT NULL,
  gift_aid_amount NUMERIC DEFAULT 0,
  date DATE NOT NULL,
  campaign_id UUID,
  payment_method TEXT,
  status TEXT DEFAULT 'received',
  reference TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- OPERATIONS TABLES
CREATE TABLE IF NOT EXISTS ops_inventory (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID REFERENCES workspaces(id),
  sku TEXT,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT,
  unit_of_measure TEXT DEFAULT 'each',
  quantity_on_hand NUMERIC DEFAULT 0,
  reorder_point NUMERIC DEFAULT 0,
  cost_price NUMERIC DEFAULT 0,
  selling_price NUMERIC DEFAULT 0,
  warehouse_id UUID,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS ops_purchase_orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID REFERENCES workspaces(id),
  po_number TEXT,
  supplier_id UUID,
  status TEXT DEFAULT 'draft',
  order_date DATE,
  expected_date DATE,
  total NUMERIC DEFAULT 0,
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS ops_warehouses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID REFERENCES workspaces(id),
  name TEXT NOT NULL,
  location TEXT,
  type TEXT DEFAULT 'standard',
  capacity INTEGER,
  manager_id UUID REFERENCES profiles(id),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- CONNECT / MESSAGING TABLES
CREATE TABLE IF NOT EXISTS connect_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID REFERENCES workspaces(id),
  channel TEXT DEFAULT 'email',
  contact_id UUID,
  subject TEXT,
  status TEXT DEFAULT 'open',
  assigned_to UUID REFERENCES profiles(id),
  last_message_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS connect_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID REFERENCES connect_conversations(id) ON DELETE CASCADE,
  sender_type TEXT DEFAULT 'contact',
  sender_id UUID,
  body TEXT NOT NULL,
  channel TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- CLIENT PORTAL TABLES
CREATE TABLE IF NOT EXISTS portal_clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID REFERENCES workspaces(id),
  contact_id UUID REFERENCES crm_contacts(id),
  company_name TEXT,
  portal_enabled BOOLEAN DEFAULT true,
  invite_token TEXT UNIQUE,
  invite_accepted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- PLATFORM ADMIN TABLES
CREATE TABLE IF NOT EXISTS platform_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID REFERENCES workspaces(id),
  plan TEXT NOT NULL DEFAULT 'starter',
  status TEXT DEFAULT 'active',
  mrr NUMERIC DEFAULT 0,
  trial_ends_at TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  stripe_subscription_id TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS platform_audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID REFERENCES workspaces(id),
  actor_id UUID REFERENCES profiles(id),
  action TEXT NOT NULL,
  resource_type TEXT,
  resource_id TEXT,
  metadata JSONB,
  ip_address TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security on key tables
ALTER TABLE workspaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE crm_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE crm_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE crm_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE crm_deals ENABLE ROW LEVEL SECURITY;
ALTER TABLE acc_invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE acc_bills ENABLE ROW LEVEL SECURITY;
ALTER TABLE acc_payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE acc_bank_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE hr_employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

-- Basic RLS policies (workspace isolation)
CREATE POLICY IF NOT EXISTS "workspace_isolation_profiles"
  ON profiles FOR ALL USING (auth.uid() = id);

CREATE POLICY IF NOT EXISTS "workspace_isolation_crm_leads"
  ON crm_leads FOR ALL USING (
    workspace_id IN (SELECT workspace_id FROM profiles WHERE id = auth.uid())
  );

CREATE POLICY IF NOT EXISTS "workspace_isolation_crm_contacts"
  ON crm_contacts FOR ALL USING (
    workspace_id IN (SELECT workspace_id FROM profiles WHERE id = auth.uid())
  );

CREATE POLICY IF NOT EXISTS "workspace_isolation_crm_accounts"
  ON crm_accounts FOR ALL USING (
    workspace_id IN (SELECT workspace_id FROM profiles WHERE id = auth.uid())
  );

CREATE POLICY IF NOT EXISTS "workspace_isolation_crm_deals"
  ON crm_deals FOR ALL USING (
    workspace_id IN (SELECT workspace_id FROM profiles WHERE id = auth.uid())
  );

CREATE POLICY IF NOT EXISTS "workspace_isolation_acc_invoices"
  ON acc_invoices FOR ALL USING (
    workspace_id IN (SELECT workspace_id FROM profiles WHERE id = auth.uid())
  );

CREATE POLICY IF NOT EXISTS "workspace_isolation_hr_employees"
  ON hr_employees FOR ALL USING (
    workspace_id IN (SELECT workspace_id FROM profiles WHERE id = auth.uid())
  );

CREATE POLICY IF NOT EXISTS "workspace_isolation_projects"
  ON projects FOR ALL USING (
    workspace_id IN (SELECT workspace_id FROM profiles WHERE id = auth.uid())
  );

CREATE POLICY IF NOT EXISTS "workspace_isolation_service_tickets"
  ON service_tickets FOR ALL USING (
    workspace_id IN (SELECT workspace_id FROM profiles WHERE id = auth.uid())
  );

CREATE POLICY IF NOT EXISTS "workspace_isolation_documents"
  ON documents FOR ALL USING (
    workspace_id IN (SELECT workspace_id FROM profiles WHERE id = auth.uid())
  );
