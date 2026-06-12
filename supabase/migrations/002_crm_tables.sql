-- Contacts
create table if not exists public.contacts (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid references public.workspaces(id) on delete cascade,
  first_name text not null,
  last_name text not null,
  email text,
  phone text,
  job_title text,
  account_id uuid,
  status text default 'active',
  lead_source text,
  owner_id uuid references auth.users(id),
  tags text[],
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Accounts (Companies)
create table if not exists public.accounts (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid references public.workspaces(id) on delete cascade,
  name text not null,
  industry text,
  website text,
  phone text,
  email text,
  billing_address jsonb,
  employees_count integer,
  annual_revenue numeric,
  status text default 'active',
  owner_id uuid references auth.users(id),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Deals
create table if not exists public.deals (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid references public.workspaces(id) on delete cascade,
  title text not null,
  contact_id uuid references public.contacts(id),
  account_id uuid references public.accounts(id),
  stage text not null default 'Prospecting',
  value numeric default 0,
  currency text default 'GBP',
  probability integer default 0,
  expected_close_date date,
  owner_id uuid references auth.users(id),
  pipeline text default 'default',
  status text default 'open',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Leads
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid references public.workspaces(id) on delete cascade,
  name text not null,
  email text,
  company text,
  phone text,
  source text,
  status text default 'New',
  score integer default 0,
  owner_id uuid references auth.users(id),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Service Tickets
create table if not exists public.tickets (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid references public.workspaces(id) on delete cascade,
  title text not null,
  description text,
  status text default 'open',
  priority text default 'medium',
  category text,
  contact_id uuid references public.contacts(id),
  account_id uuid references public.accounts(id),
  assignee_id uuid references auth.users(id),
  sla_deadline timestamptz,
  resolved_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Employees
create table if not exists public.employees (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid references public.workspaces(id) on delete cascade,
  user_id uuid references auth.users(id),
  full_name text not null,
  email text,
  job_title text,
  department text,
  manager_id uuid references public.employees(id),
  employment_type text default 'full-time',
  start_date date,
  salary numeric,
  currency text default 'GBP',
  status text default 'active',
  avatar_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- RLS policies (workspace-scoped)
alter table public.contacts enable row level security;
alter table public.accounts enable row level security;
alter table public.deals enable row level security;
alter table public.leads enable row level security;
alter table public.tickets enable row level security;
alter table public.employees enable row level security;

-- Allow authenticated users to read/write their workspace data
-- (Simple policy — production would check workspace membership)
create policy "contacts_workspace" on public.contacts for all using (auth.role() = 'authenticated');
create policy "accounts_workspace" on public.accounts for all using (auth.role() = 'authenticated');
create policy "deals_workspace" on public.deals for all using (auth.role() = 'authenticated');
create policy "leads_workspace" on public.leads for all using (auth.role() = 'authenticated');
create policy "tickets_workspace" on public.tickets for all using (auth.role() = 'authenticated');
create policy "employees_workspace" on public.employees for all using (auth.role() = 'authenticated');
