"use client"

import React from "react"
import { CreditCard, Download, TrendingUp, Users, HardDrive, Zap, AlertTriangle } from "lucide-react"

const invoices = [
  { id: "INV-2025-012", date: "1 Dec 2025", amount: "£149.00", status: "Paid" },
  { id: "INV-2025-011", date: "1 Nov 2025", amount: "£149.00", status: "Paid" },
  { id: "INV-2025-010", date: "1 Oct 2025", amount: "£149.00", status: "Paid" },
  { id: "INV-2025-009", date: "1 Sep 2025", amount: "£149.00", status: "Paid" },
  { id: "INV-2025-008", date: "1 Aug 2025", amount: "£149.00", status: "Paid" },
  { id: "INV-2025-007", date: "1 Jul 2025", amount: "£89.00",  status: "Paid" },
]

const usageMetrics = [
  { label: "Team Members", used: 18, total: 25, icon: Users, unit: "seats" },
  { label: "Storage", used: 12.4, total: 50, icon: HardDrive, unit: "GB" },
  { label: "API Calls", used: 8420, total: 50000, icon: Zap, unit: "calls/mo" },
]

export default function AdminBillingPage() {
  return (
    <div className="p-6 space-y-6 max-w-[900px] mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-[var(--foreground)]">Billing</h1>
        <p className="text-sm text-[var(--muted-foreground)] mt-0.5">Manage your subscription and payment details</p>
      </div>

      {/* Current Plan */}
      <div className="rounded-xl border border-[var(--primary)]/30 bg-[var(--primary)]/5 p-5">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg font-bold text-[var(--foreground)]">Growth Plan</span>
              <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ background: '#dcfce7', color: '#16a34a' }}>Active</span>
            </div>
            <p className="text-sm text-[var(--muted-foreground)]">£149/month · billed annually · up to 25 seats</p>
            <p className="text-xs text-[var(--muted-foreground)] mt-1">Renews 1 January 2027</p>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 rounded-lg border border-[var(--border)] text-sm font-medium text-[var(--foreground)] hover:bg-[var(--secondary)] transition-colors">
              Change Plan
            </button>
            <button className="px-4 py-2 rounded-lg bg-[var(--primary)] text-sm font-medium text-white hover:opacity-90">
              <TrendingUp className="h-4 w-4 inline mr-1.5" />
              Upgrade
            </button>
          </div>
        </div>
      </div>

      {/* Usage */}
      <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-5">
        <h2 className="text-sm font-semibold text-[var(--foreground)] mb-4">Usage This Billing Period</h2>
        <div className="space-y-4">
          {usageMetrics.map(m => {
            const pct = Math.round((m.used / m.total) * 100)
            const isWarning = pct > 80
            return (
              <div key={m.label}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <m.icon className="h-4 w-4 text-[var(--muted-foreground)]" />
                    <span className="text-sm text-[var(--foreground)]">{m.label}</span>
                  </div>
                  <span className="text-xs text-[var(--muted-foreground)]">
                    {m.used.toLocaleString()} / {m.total.toLocaleString()} {m.unit}
                  </span>
                </div>
                <div className="h-2 rounded-full bg-[var(--secondary)] overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${pct}%`, background: isWarning ? '#d97706' : 'var(--primary)' }}
                  />
                </div>
                {isWarning && (
                  <p className="text-xs mt-1 flex items-center gap-1" style={{ color: '#d97706' }}>
                    <AlertTriangle className="h-3 w-3" /> Approaching limit — consider upgrading
                  </p>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Payment Method */}
      <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-5">
        <h2 className="text-sm font-semibold text-[var(--foreground)] mb-4">Payment Method</h2>
        <div className="flex items-center gap-3">
          <div className="h-10 w-14 rounded-md border border-[var(--border)] flex items-center justify-center bg-[var(--secondary)]">
            <CreditCard className="h-5 w-5 text-[var(--primary)]" />
          </div>
          <div>
            <p className="text-sm font-medium text-[var(--foreground)]">Visa ending in 4242</p>
            <p className="text-xs text-[var(--muted-foreground)]">Expires 09/2027</p>
          </div>
          <button className="ml-auto text-sm text-[var(--primary)] hover:underline">Update</button>
        </div>
      </div>

      {/* Invoice History */}
      <div className="rounded-xl border border-[var(--border)] bg-[var(--background)]">
        <div className="p-5 pb-3 border-b border-[var(--border)]">
          <h2 className="text-sm font-semibold text-[var(--foreground)]">Invoice History</h2>
        </div>
        <div className="divide-y divide-[var(--border)]">
          {invoices.map(inv => (
            <div key={inv.id} className="flex items-center justify-between px-5 py-3.5">
              <div>
                <p className="text-sm font-medium text-[var(--foreground)]">{inv.id}</p>
                <p className="text-xs text-[var(--muted-foreground)]">{inv.date}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-[var(--foreground)]">{inv.amount}</span>
                <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: '#dcfce7', color: '#16a34a' }}>{inv.status}</span>
                <button className="p-1.5 rounded-md hover:bg-[var(--secondary)] transition-colors">
                  <Download className="h-4 w-4 text-[var(--muted-foreground)]" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Danger Zone */}
      <div className="rounded-xl border border-[#fee2e2] bg-[var(--background)] p-5">
        <h2 className="text-sm font-semibold mb-2" style={{ color: '#dc2626' }}>Danger Zone</h2>
        <p className="text-xs text-[var(--muted-foreground)] mb-3">Cancelling your subscription will downgrade your workspace to the free plan at the end of the current billing period. All data will be retained for 90 days.</p>
        <button className="px-4 py-2 rounded-lg border text-sm font-medium transition-colors" style={{ borderColor: '#dc2626', color: '#dc2626' }}>
          Cancel Subscription
        </button>
      </div>
    </div>
  )
}
