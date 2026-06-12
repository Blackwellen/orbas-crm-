"use client"

import React, { useState } from "react"
import Link from "next/link"
import {
  ShieldCheck, ShieldX, Calendar, AlertTriangle, CheckCircle2,
  Clock, ArrowRight, RefreshCw, ExternalLink, Info, ChevronRight,
  FileText, Send, Lock
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription
} from "@/components/ui/dialog"
import { formatCurrency, formatDate } from "@/lib/utils"

const VAT_RETURNS = [
  { id: "vr-1", period: "01 Jan 2026 – 31 Mar 2026", due: "07 May 2026", status: "Open",      amount: 18420.50 },
  { id: "vr-2", period: "01 Oct 2025 – 31 Dec 2025", due: "07 Feb 2026", status: "Fulfilled", amount: 22310.00 },
  { id: "vr-3", period: "01 Jul 2025 – 30 Sep 2025", due: "07 Nov 2025", status: "Fulfilled", amount: 19875.40 },
  { id: "vr-4", period: "01 Apr 2025 – 30 Jun 2025", due: "07 Aug 2025", status: "Fulfilled", amount: 21650.00 },
  { id: "vr-5", period: "01 Jan 2025 – 31 Mar 2025", due: "07 May 2025", status: "Fulfilled", amount: 17990.80 },
  { id: "vr-6", period: "01 Oct 2024 – 31 Dec 2024", due: "07 Feb 2025", status: "Overdue",   amount: 16340.20 },
]

const ITSA_UPDATES = [
  { id: "it-1", taxYear: "2025–26", quarter: "Q1 (Apr–Jun 2025)", status: "Fulfilled", due: "05 Aug 2025" },
  { id: "it-2", taxYear: "2025–26", quarter: "Q2 (Jul–Sep 2025)", status: "Fulfilled", due: "05 Nov 2025" },
  { id: "it-3", taxYear: "2025–26", quarter: "Q3 (Oct–Dec 2025)", status: "Fulfilled", due: "05 Feb 2026" },
  { id: "it-4", taxYear: "2025–26", quarter: "Q4 (Jan–Mar 2026)", status: "Open",      due: "05 May 2026" },
]

const OAUTH_STEPS = [
  { step: 1, label: "Redirecting to HMRC Business Tax Account", done: false },
  { step: 2, label: "Authenticate with Government Gateway credentials", done: false },
  { step: 3, label: "Grant permissions for MTD VAT and ITSA", done: false },
  { step: 4, label: "Return authorisation token to Orbas", done: false },
]

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { bg: string; color: string }> = {
    Fulfilled: { bg: "#dcfce7", color: "#16a34a" },
    Open:      { bg: "#fef9c3", color: "#ca8a04" },
    Overdue:   { bg: "#fee2e2", color: "#dc2626" },
    Connected:    { bg: "#dcfce7", color: "#16a34a" },
    "Not Connected": { bg: "#fee2e2", color: "#dc2626" },
  }
  const cfg = map[status] ?? { bg: "#f3f4f6", color: "#6b7280" }
  return (
    <span style={{ backgroundColor: cfg.bg, color: cfg.color, padding: "2px 10px", borderRadius: "9999px", fontSize: "12px", fontWeight: 500 }}>
      {status}
    </span>
  )
}

export default function MTDPage() {
  const [connectOpen, setConnectOpen] = useState(false)
  const [oauthStep, setOauthStep] = useState(0)
  const [connected, setConnected] = useState(false)

  function startOAuth() {
    setOauthStep(1)
    const tick = () => {
      setOauthStep(s => {
        if (s >= 4) {
          setConnected(true)
          setConnectOpen(false)
          return 4
        }
        setTimeout(tick, 900)
        return s + 1
      })
    }
    setTimeout(tick, 700)
  }

  return (
    <div className="p-6 space-y-6" style={{ color: "var(--foreground)" }}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Making Tax Digital</h1>
          <p className="text-sm mt-1" style={{ color: "var(--muted-foreground)" }}>
            HMRC digital tax submissions — VAT Returns &amp; Income Tax Self Assessment
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium" style={{ background: "var(--muted)" }}>
            {connected
              ? <ShieldCheck size={16} style={{ color: "#16a34a" }} />
              : <ShieldX size={16} style={{ color: "#dc2626" }} />}
            <StatusBadge status={connected ? "Connected" : "Not Connected"} />
          </div>
          {!connected && (
            <Button onClick={() => setConnectOpen(true)} style={{ background: "var(--primary)", color: "#fff" }}>
              Connect to HMRC
            </Button>
          )}
          {connected && (
            <Button variant="outline" size="sm">
              <RefreshCw size={14} className="mr-2" /> Sync Status
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "VAT Obligations Due", value: "1", sub: "Due 07 May 2026", icon: AlertTriangle, color: "#f59e0b" },
          { label: "ITSA Updates Due",    value: "1", sub: "Q4 due 05 May 2026", icon: Calendar, color: "#1a56db" },
          { label: "Last Submission",     value: "22 Jan 2026", sub: "VAT Q3 2025", icon: CheckCircle2, color: "#16a34a" },
          { label: "Next Deadline",       value: "05 May 2026", sub: "ITSA Q4 2025–26", icon: Clock, color: "#dc2626" },
        ].map(s => (
          <Card key={s.label} style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium" style={{ color: "var(--muted-foreground)" }}>{s.label}</p>
                  <p className="text-2xl font-bold mt-1">{s.value}</p>
                  <p className="text-xs mt-1" style={{ color: "var(--muted-foreground)" }}>{s.sub}</p>
                </div>
                <div className="rounded-lg p-2" style={{ background: "var(--muted)" }}>
                  <s.icon size={20} style={{ color: s.color }} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold">VAT Returns</CardTitle>
              <Link href="/app/accounting/mtd/vat-returns">
                <Button variant="ghost" size="sm" className="text-xs gap-1" style={{ color: "var(--primary)" }}>
                  View all <ChevronRight size={14} />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border)" }}>
                  <th className="px-4 py-2 text-left font-medium text-xs" style={{ color: "var(--muted-foreground)" }}>Period</th>
                  <th className="px-4 py-2 text-left font-medium text-xs" style={{ color: "var(--muted-foreground)" }}>Due</th>
                  <th className="px-4 py-2 text-left font-medium text-xs" style={{ color: "var(--muted-foreground)" }}>Status</th>
                  <th className="px-4 py-2 text-right font-medium text-xs" style={{ color: "var(--muted-foreground)" }}>Amount</th>
                </tr>
              </thead>
              <tbody>
                {VAT_RETURNS.map(r => (
                  <tr key={r.id} style={{ borderBottom: "1px solid var(--border)" }} className="hover:bg-[var(--muted)] transition-colors">
                    <td className="px-4 py-2.5 text-xs">{r.period}</td>
                    <td className="px-4 py-2.5 text-xs" style={{ color: "var(--muted-foreground)" }}>{r.due}</td>
                    <td className="px-4 py-2.5"><StatusBadge status={r.status} /></td>
                    <td className="px-4 py-2.5 text-right text-xs font-medium">{formatCurrency(r.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

        <Card style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold">ITSA Quarterly Updates</CardTitle>
              <Link href="/app/accounting/mtd/itsa">
                <Button variant="ghost" size="sm" className="text-xs gap-1" style={{ color: "var(--primary)" }}>
                  View all <ChevronRight size={14} />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border)" }}>
                  <th className="px-4 py-2 text-left font-medium text-xs" style={{ color: "var(--muted-foreground)" }}>Tax Year</th>
                  <th className="px-4 py-2 text-left font-medium text-xs" style={{ color: "var(--muted-foreground)" }}>Quarter</th>
                  <th className="px-4 py-2 text-left font-medium text-xs" style={{ color: "var(--muted-foreground)" }}>Due</th>
                  <th className="px-4 py-2 text-left font-medium text-xs" style={{ color: "var(--muted-foreground)" }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {ITSA_UPDATES.map(r => (
                  <tr key={r.id} style={{ borderBottom: "1px solid var(--border)" }} className="hover:bg-[var(--muted)] transition-colors">
                    <td className="px-4 py-2.5 text-xs font-medium">{r.taxYear}</td>
                    <td className="px-4 py-2.5 text-xs">{r.quarter}</td>
                    <td className="px-4 py-2.5 text-xs" style={{ color: "var(--muted-foreground)" }}>{r.due}</td>
                    <td className="px-4 py-2.5"><StatusBadge status={r.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>

      <Card style={{ background: "var(--muted)", border: "1px solid var(--border)" }}>
        <CardContent className="p-4 flex items-start gap-3">
          <Info size={18} style={{ color: "var(--primary)", marginTop: 2, flexShrink: 0 }} />
          <div className="text-sm" style={{ color: "var(--muted-foreground)" }}>
            <strong style={{ color: "var(--foreground)" }}>Making Tax Digital (MTD)</strong> — HMRC requires businesses above the VAT threshold (£90,000) to keep digital records and submit returns via compatible software. MTD for ITSA is mandated for sole traders and landlords with income over £50,000 from April 2026.{" "}
            <a href="https://www.gov.uk/guidance/making-tax-digital-for-vat" target="_blank" rel="noreferrer" className="underline inline-flex items-center gap-1" style={{ color: "var(--primary)" }}>
              HMRC guidance <ExternalLink size={12} />
            </a>
          </div>
        </CardContent>
      </Card>

      <Dialog open={connectOpen} onOpenChange={setConnectOpen}>
        <DialogContent style={{ background: "var(--card)", color: "var(--foreground)", maxWidth: 480 }}>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ShieldCheck size={20} style={{ color: "#16a34a" }} />
              Connect to HMRC
            </DialogTitle>
            <DialogDescription style={{ color: "var(--muted-foreground)" }}>
              Orbas will connect to your HMRC Business Tax Account via the MTD API using OAuth 2.0.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 py-2">
            {OAUTH_STEPS.map((s, i) => (
              <div key={s.step} className="flex items-center gap-3 p-3 rounded-lg" style={{ background: "var(--muted)" }}>
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                  style={{
                    background: oauthStep > i ? "#dcfce7" : "var(--border)",
                    color: oauthStep > i ? "#16a34a" : "var(--muted-foreground)"
                  }}>
                  {oauthStep > i ? <CheckCircle2 size={16} /> : s.step}
                </div>
                <span className="text-sm" style={{ color: oauthStep > i ? "var(--foreground)" : "var(--muted-foreground)" }}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
          <div className="text-xs p-3 rounded-lg" style={{ background: "var(--muted)", color: "var(--muted-foreground)" }}>
            <Lock size={12} className="inline mr-1" />
            Your Government Gateway credentials are entered directly on HMRC&apos;s website and are never stored by Orbas.
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConnectOpen(false)}>Cancel</Button>
            <Button onClick={startOAuth} disabled={oauthStep > 0} style={{ background: "var(--primary)", color: "#fff" }}>
              <ExternalLink size={14} className="mr-2" />
              {oauthStep > 0 ? "Connecting…" : "Authorise via HMRC"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
