"use client"

import * as React from "react"
import Link from "next/link"
import {
  Users, Plug, HardDrive, BarChart3, ChevronRight,
  CreditCard, Settings, Key, ScrollText, Grid3x3,
  TrendingUp, Shield, Zap, AlertTriangle
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const healthCards = [
  { label: "Members", value: "24", sub: "3 invited", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
  { label: "Active Integrations", value: "7", sub: "2 pending setup", icon: Plug, color: "text-violet-600", bg: "bg-violet-50" },
  { label: "Storage Used", value: "18.4 GB", sub: "of 100 GB", icon: HardDrive, color: "text-amber-600", bg: "bg-amber-50" },
  { label: "Monthly API Calls", value: "142K", sub: "+12% vs last month", icon: BarChart3, color: "text-green-600", bg: "bg-green-50" },
]

const quickLinks = [
  { label: "Users & Roles", href: "/app/admin/users", icon: Users, desc: "Manage team members and permissions" },
  { label: "Workspace Settings", href: "/app/admin/workspace", icon: Settings, desc: "Configure your workspace" },
  { label: "Billing", href: "/app/admin/billing", icon: CreditCard, desc: "Manage your plan and invoices" },
  { label: "Integrations", href: "/app/admin/integrations", icon: Plug, desc: "Connect third-party services" },
  { label: "API Keys", href: "/app/admin/api-keys", icon: Key, desc: "Manage programmatic access" },
  { label: "Audit Log", href: "/app/admin/audit", icon: ScrollText, desc: "Track all workspace activity" },
  { label: "Apps & Features", href: "/app/admin/apps", icon: Grid3x3, desc: "Enable or disable apps" },
]

const recentAudit = [
  { actor: "Sarah Johnson", action: "Invited", resource: "tom.webb@acme.com", time: "2 min ago", type: "Invite" },
  { actor: "James Carter", action: "Updated", resource: "Workspace Settings", time: "1 hr ago", type: "Update" },
  { actor: "Admin", action: "Generated", resource: "API Key: prod_key_1", time: "3 hrs ago", type: "Create" },
  { actor: "Sarah Johnson", action: "Connected", resource: "Stripe integration", time: "Yesterday", type: "Connect" },
  { actor: "James Carter", action: "Disabled", resource: "Charity app", time: "Yesterday", type: "Disable" },
]

const typeColors: Record<string, string> = {
  Invite: "bg-blue-100 text-blue-700",
  Update: "bg-amber-100 text-amber-700",
  Create: "bg-green-100 text-green-700",
  Connect: "bg-violet-100 text-violet-700",
  Disable: "bg-red-100 text-red-700",
}

export default function AdminOverviewPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--foreground)]">Admin Console</h1>
          <p className="text-sm text-[var(--muted-foreground)] mt-0.5">Workspace administration for Orbas Demo</p>
        </div>
        <Badge className="bg-[var(--primary)] text-white px-3 py-1">Pro Plan</Badge>
      </div>

      {/* Health cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {healthCards.map(card => {
          const Icon = card.icon
          return (
            <Card key={card.label} className="border-[var(--border)]">
              <CardContent className="p-5">
                <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl mb-3", card.bg)}>
                  <Icon className={cn("h-5 w-5", card.color)} />
                </div>
                <p className="text-2xl font-bold text-[var(--foreground)]">{card.value}</p>
                <p className="text-sm font-medium text-[var(--foreground)] mt-0.5">{card.label}</p>
                <p className="text-xs text-[var(--muted-foreground)] mt-0.5">{card.sub}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick links */}
        <div className="lg:col-span-2">
          <Card className="border-[var(--border)]">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">Admin Sections</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-[var(--border)]">
                {quickLinks.map(link => {
                  const Icon = link.icon
                  return (
                    <Link key={link.label} href={link.href}>
                      <div className="flex items-center gap-3 px-5 py-3.5 hover:bg-[var(--muted)]/30 transition-colors">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--primary)]/10">
                          <Icon className="h-4 w-4 text-[var(--primary)]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-[var(--foreground)]">{link.label}</p>
                          <p className="text-xs text-[var(--muted-foreground)]">{link.desc}</p>
                        </div>
                        <ChevronRight className="h-4 w-4 text-[var(--muted-foreground)]" />
                      </div>
                    </Link>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right column */}
        <div className="space-y-5">
          {/* Plan card */}
          <Card className="border-[var(--border)] overflow-hidden">
            <div className="orbas-gradient p-4">
              <div className="flex items-center gap-2 mb-1">
                <Zap className="h-5 w-5 text-white" />
                <span className="text-sm font-semibold text-white">Current Plan</span>
              </div>
              <p className="text-2xl font-bold text-white">Pro</p>
              <p className="text-xs text-white/80 mt-0.5">Billed monthly · £149/mo</p>
            </div>
            <CardContent className="p-4 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-[var(--muted-foreground)]">Seats used</span>
                <span className="font-medium text-[var(--foreground)]">24 / 50</span>
              </div>
              <div className="h-2 bg-[var(--muted)] rounded-full overflow-hidden">
                <div className="h-full bg-[var(--primary)] rounded-full" style={{ width: "48%" }} />
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[var(--muted-foreground)]">Storage</span>
                <span className="font-medium text-[var(--foreground)]">18.4 / 100 GB</span>
              </div>
              <div className="h-2 bg-[var(--muted)] rounded-full overflow-hidden">
                <div className="h-full bg-[var(--primary)] rounded-full" style={{ width: "18.4%" }} />
              </div>
              <Link href="/app/admin/billing">
                <Button className="w-full mt-2" size="sm">Manage Subscription</Button>
              </Link>
            </CardContent>
          </Card>

          {/* Recent audit */}
          <Card className="border-[var(--border)]">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle className="text-sm font-semibold">Recent Audit Events</CardTitle>
              <Link href="/app/admin/audit">
                <Button variant="ghost" size="sm" className="h-7 text-xs text-[var(--primary)] gap-1">
                  View all <ChevronRight className="h-3 w-3" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-[var(--border)]">
                {recentAudit.map((ev, i) => (
                  <div key={i} className="flex items-start gap-2.5 px-4 py-2.5">
                    <span className={cn("shrink-0 rounded px-1.5 py-0.5 text-[10px] font-semibold mt-0.5", typeColors[ev.type])}>
                      {ev.type}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-[var(--foreground)] truncate">
                        <span className="font-medium">{ev.actor}</span> {ev.action} {ev.resource}
                      </p>
                      <p className="text-[10px] text-[var(--muted-foreground)] mt-0.5">{ev.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Security notice */}
          <Card className="border-amber-200 bg-amber-50">
            <CardContent className="p-4 flex gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-amber-800">Security Recommendation</p>
                <p className="text-xs text-amber-700 mt-0.5">
                  2FA is not enforced for all workspace members. Enable enforcement in Security settings.
                </p>
                <Link href="/app/admin/workspace">
                  <Button size="sm" variant="outline" className="mt-2 h-7 text-xs border-amber-300 text-amber-700">
                    Configure
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
