"use client"

import React, { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import {
  ArrowLeft, Send, CheckCircle2, Clock, AlertCircle, ShieldCheck,
  FileText, Info, User, Calendar
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription
} from "@/components/ui/dialog"
import { formatCurrency } from "@/lib/utils"

const MOCK_RETURNS: Record<string, {
  period: string; start: string; end: string; due: string; status: string;
  box1: number; box2: number; box4: number; box6: number; box7: number; box8: number; box9: number;
  submittedAt?: string; submittedBy?: string; receiptId?: string;
}> = {
  "vr-01": { period: "Q1 2026", start: "01 Jan 2026", end: "31 Mar 2026", due: "07 May 2026", status: "Open",      box1: 44820.00, box2: 0, box4: 26399.50, box6: 224100.00, box7: 131997.50, box8: 0, box9: 0 },
  "vr-02": { period: "Q4 2025", start: "01 Oct 2025", end: "31 Dec 2025", due: "07 Feb 2026", status: "Fulfilled", box1: 52100.00, box2: 0, box4: 29790.00, box6: 260500.00, box7: 148950.00, box8: 0, box9: 0, submittedAt: "22 Jan 2026 14:32", submittedBy: "James Wilson", receiptId: "HMRC-2026-Q4-489321" },
  "vr-03": { period: "Q3 2025", start: "01 Jul 2025", end: "30 Sep 2025", due: "07 Nov 2025", status: "Fulfilled", box1: 48400.00, box2: 0, box4: 28524.60, box6: 242000.00, box7: 142623.00, box8: 0, box9: 0, submittedAt: "15 Oct 2025 09:18", submittedBy: "James Wilson", receiptId: "HMRC-2025-Q3-381204" },
  "vr-06": { period: "Q4 2024", start: "01 Oct 2024", end: "31 Dec 2024", due: "07 Feb 2025", status: "Overdue",   box1: 40200.00, box2: 0, box4: 23859.80, box6: 201000.00, box7: 119299.00, box8: 0, box9: 0 },
}

function deriveBoxes(d: typeof MOCK_RETURNS[string]) {
  const box3 = d.box1 + d.box2
  const box5 = Math.abs(box3 - d.box4)
  return { ...d, box3, box5 }
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { bg: string; color: string }> = {
    Fulfilled: { bg: "#dcfce7", color: "#16a34a" },
    Open:      { bg: "#fef9c3", color: "#ca8a04" },
    Overdue:   { bg: "#fee2e2", color: "#dc2626" },
  }
  const cfg = map[status] ?? { bg: "#f3f4f6", color: "#6b7280" }
  return (
    <span style={{ backgroundColor: cfg.bg, color: cfg.color, padding: "2px 10px", borderRadius: "9999px", fontSize: "12px", fontWeight: 500 }}>
      {status}
    </span>
  )
}

const AUDIT_TRAIL = [
  { ts: "11 Jun 2026 09:02", user: "James Wilson", action: "Viewed return", icon: FileText },
  { ts: "08 May 2026 11:44", user: "System",       action: "Reminder sent — return overdue", icon: AlertCircle },
  { ts: "01 Apr 2026 08:00", user: "System",       action: "Obligation created by HMRC sync", icon: Clock },
]

export default function VATReturnDetailPage() {
  const { id } = useParams<{ id: string }>()
  const raw = MOCK_RETURNS[id] ?? MOCK_RETURNS["vr-01"]
  const data = deriveBoxes(raw)

  const [confirmOpen, setConfirmOpen] = useState(false)
  const [declared, setDeclared] = useState(false)
  const [submitted, setSubmitted] = useState(data.status === "Fulfilled")

  const boxes = [
    { num: 1, label: "VAT due on sales and other outputs",                                     value: data.box1, bold: false },
    { num: 2, label: "VAT due in period on acquisitions from other EC member states",           value: data.box2, bold: false },
    { num: 3, label: "Total VAT due (Box 1 + Box 2)",                                          value: data.box3, bold: true  },
    { num: 4, label: "VAT reclaimed on purchases and other inputs",                            value: data.box4, bold: false },
    { num: 5, label: "Net VAT to pay to HMRC (Box 3 minus Box 4)",                             value: data.box5, bold: true  },
    { num: 6, label: "Total value of sales and all other outputs excluding VAT",               value: data.box6, bold: false },
    { num: 7, label: "Total value of purchases and all other inputs excluding VAT",            value: data.box7, bold: false },
    { num: 8, label: "Total value of all EC and other supplies of goods and related costs",    value: data.box8, bold: false },
    { num: 9, label: "Total value of acquisitions of goods from other EC member states",       value: data.box9, bold: false },
  ]

  return (
    <div className="p-6 space-y-6" style={{ color: "var(--foreground)" }}>
      <div className="flex items-center gap-3">
        <Link href="/app/accounting/mtd/vat-returns">
          <Button variant="ghost" size="sm" className="gap-1">
            <ArrowLeft size={16} /> VAT Returns
          </Button>
        </Link>
        <span style={{ color: "var(--muted-foreground)" }}>/</span>
        <h1 className="text-2xl font-bold tracking-tight">VAT Return — {data.period}</h1>
        <StatusBadge status={submitted ? "Fulfilled" : data.status} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Period Start", value: data.start },
          { label: "Period End",   value: data.end },
          { label: "Due Date",     value: data.due },
        ].map(s => (
          <Card key={s.label} style={{ background: "var(--muted)", border: "1px solid var(--border)" }}>
            <CardContent className="p-4">
              <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>{s.label}</p>
              <p className="text-base font-semibold mt-1">{s.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">VAT Return — 9 Box Summary</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)", background: "var(--muted)" }}>
                <th className="px-4 py-3 text-left text-xs font-semibold w-16" style={{ color: "var(--muted-foreground)" }}>Box</th>
                <th className="px-4 py-3 text-left text-xs font-semibold" style={{ color: "var(--muted-foreground)" }}>Description</th>
                <th className="px-4 py-3 text-right text-xs font-semibold w-40" style={{ color: "var(--muted-foreground)" }}>Amount</th>
              </tr>
            </thead>
            <tbody>
              {boxes.map(b => (
                <tr
                  key={b.num}
                  style={{
                    borderBottom: "1px solid var(--border)",
                    background: b.num === 5 ? "rgba(26,86,219,0.04)" : undefined
                  }}
                >
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-md text-xs font-bold"
                      style={{ background: b.num === 5 ? "var(--primary)" : "var(--muted)", color: b.num === 5 ? "#fff" : "var(--foreground)" }}>
                      {b.num}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm" style={{ fontWeight: b.bold ? 600 : 400 }}>{b.label}</td>
                  <td className="px-4 py-3 text-right font-mono" style={{ fontWeight: b.bold ? 700 : 400, color: b.num === 5 ? "var(--primary)" : "var(--foreground)" }}>
                    {formatCurrency(b.value)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {!submitted && (
        <Card style={{ border: "1px solid var(--border)", background: "var(--card)" }}>
          <CardContent className="p-5 space-y-4">
            <div className="flex items-start gap-3 p-3 rounded-lg" style={{ background: "var(--muted)" }}>
              <Info size={16} style={{ color: "var(--primary)", flexShrink: 0, marginTop: 2 }} />
              <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
                Before submitting, please check all figures are correct. Once submitted to HMRC this return cannot be edited — you will need to request an amendment.
              </p>
            </div>
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                className="mt-0.5 w-4 h-4"
                checked={declared}
                onChange={e => setDeclared(e.target.checked)}
              />
              <span className="text-sm">
                I declare that the information provided is true and complete to the best of my knowledge and belief.
              </span>
            </label>
            <div className="flex justify-end">
              <Button
                disabled={!declared}
                onClick={() => setConfirmOpen(true)}
                style={{ background: "var(--primary)", color: "#fff" }}
              >
                <Send size={14} className="mr-2" /> Submit to HMRC
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {submitted && data.submittedAt && (
        <Card style={{ background: "#dcfce7", border: "1px solid #bbf7d0" }}>
          <CardContent className="p-4 flex items-center gap-3">
            <ShieldCheck size={20} style={{ color: "#16a34a" }} />
            <div>
              <p className="text-sm font-semibold" style={{ color: "#15803d" }}>Successfully submitted to HMRC</p>
              <p className="text-xs" style={{ color: "#166534" }}>
                Submitted {data.submittedAt} by {data.submittedBy} · Receipt ID: {data.receiptId}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      <Card style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold">Submission History &amp; Audit Trail</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y" style={{ borderTop: "1px solid var(--border)" }}>
            {AUDIT_TRAIL.map((e, i) => (
              <div key={i} className="px-4 py-3 flex items-center gap-3">
                <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "var(--muted)" }}>
                  <e.icon size={14} style={{ color: "var(--muted-foreground)" }} />
                </div>
                <div className="flex-1">
                  <p className="text-sm">{e.action}</p>
                  <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>{e.user}</p>
                </div>
                <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>{e.ts}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent style={{ background: "var(--card)", color: "var(--foreground)", maxWidth: 440 }}>
          <DialogHeader>
            <DialogTitle>Confirm Submission to HMRC</DialogTitle>
            <DialogDescription style={{ color: "var(--muted-foreground)" }}>
              You are about to submit the VAT return for <strong>{data.period}</strong> showing net VAT of <strong>{formatCurrency(data.box5)}</strong> payable to HMRC.
            </DialogDescription>
          </DialogHeader>
          <p className="text-sm py-2" style={{ color: "var(--muted-foreground)" }}>
            This action is irreversible. The return will be submitted directly to HMRC via the MTD API.
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmOpen(false)}>Cancel</Button>
            <Button
              onClick={() => { setSubmitted(true); setConfirmOpen(false) }}
              style={{ background: "var(--primary)", color: "#fff" }}
            >
              <Send size={14} className="mr-2" /> Confirm &amp; Submit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
