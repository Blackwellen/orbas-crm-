"use client"

import React, { useState } from "react"
import Link from "next/link"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import {
  ChevronLeft, Edit2, Send, Download, Copy, Check, X,
  FileText, Mail, Activity, Paperclip, CheckCircle, XCircle,
  Building2, User, Plus
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { cn, formatCurrency, formatDate, formatRelativeTime } from "@/lib/utils"

const QUOTE = {
  id: "Q-0042",
  status: "Sent" as const,
  account: "Fintech Corp Ltd",
  accountId: "1",
  contact: "Marcus Williams",
  contactTitle: "CFO",
  deal: "Enterprise SaaS Rollout",
  dealId: "1",
  quoteDate: "2026-06-09",
  expiryDate: "2026-07-09",
  paymentTerms: "Net 30",
  currency: "GBP",
  reference: "PROJ-2026-ENT-001",
  owner: "Alex Turner",
  notes: "This proposal is valid for 30 days from the quote date. Prices are exclusive of VAT unless stated. Implementation timeline starts within 2 weeks of contract signature.",
  terms: "Standard terms and conditions apply. See attached service agreement for full contractual terms.",
}

const LINE_ITEMS = [
  { product: "Orbas CRM — Enterprise Licence", description: "Annual SaaS licence for 200 seats", qty: 1, unitPrice: 48000, discount: 0, tax: 20 },
  { product: "Implementation & Onboarding", description: "Full implementation, data migration and training", qty: 1, unitPrice: 28000, discount: 10, tax: 20 },
  { product: "Premium Support Package", description: "24/7 dedicated support, 4-hour SLA, CSM", qty: 1, unitPrice: 12000, discount: 0, tax: 20 },
]

const ACTIVITY_LOG = [
  { type: "Email", text: "Quote sent to Marcus Williams at Fintech Corp Ltd", actor: "Alex Turner", time: "2026-06-09T14:30:00" },
  { type: "Created", text: "Quote Q-0042 created from deal 'Enterprise SaaS Rollout'", actor: "Alex Turner", time: "2026-06-09T13:00:00" },
]

const EMAILS = [
  { subject: "Commercial Proposal Q-0042 — Fintech Corp Ltd", from: "Alex Turner", to: "Marcus Williams", date: "2026-06-09", status: "Sent" },
]

const DOCUMENTS = [
  { name: "Q-0042 Commercial Proposal.pdf", size: "1.8 MB", date: "9 Jun 2026" },
  { name: "Orbas CRM Datasheet.pdf", size: "3.2 MB", date: "9 Jun 2026" },
]

const statusColors: Record<string, string> = {
  Draft: "bg-[var(--muted)] text-[var(--muted-foreground)]",
  Sent: "bg-blue-100 text-blue-700",
  Viewed: "bg-violet-100 text-violet-700",
  Accepted: "bg-emerald-100 text-emerald-700",
  Declined: "bg-red-100 text-red-700",
  Expired: "bg-amber-100 text-amber-700",
}

function calcLineTotal(item: typeof LINE_ITEMS[0]) {
  const sub = item.qty * item.unitPrice
  const afterDiscount = sub * (1 - item.discount / 100)
  return afterDiscount * (1 + item.tax / 100)
}

export default function QuoteDetailPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const router = useRouter()
  const activeTab = searchParams.get("tab") || "quote"

  const [acceptanceNote, setAcceptanceNote] = useState("")
  const [declineNote, setDeclineNote] = useState("")

  function setTab(tab: string) {
    router.push(`/app/crm/quotes/${params.id}?tab=${tab}`, { scroll: false })
  }

  const subtotal = LINE_ITEMS.reduce((s, i) => s + i.qty * i.unitPrice, 0)
  const discountTotal = LINE_ITEMS.reduce((s, i) => s + i.qty * i.unitPrice * (i.discount / 100), 0)
  const taxableAmount = subtotal - discountTotal
  const taxTotal = LINE_ITEMS.reduce((s, i) => {
    const afterDiscount = i.qty * i.unitPrice * (1 - i.discount / 100)
    return s + afterDiscount * (i.tax / 100)
  }, 0)
  const grandTotal = taxableAmount + taxTotal

  const tabs = [
    { key: "quote", label: "Quote" },
    { key: "activity", label: "Activity" },
    { key: "emails", label: "Emails" },
    { key: "documents", label: "Documents" },
  ]

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Back nav */}
      <div className="border-b border-[var(--border)] bg-[var(--card)] px-6 py-3">
        <Button variant="ghost" size="sm" asChild className="text-[var(--muted-foreground)] -ml-2">
          <Link href="/app/crm/quotes"><ChevronLeft className="h-4 w-4 mr-1" />Back to Quotes</Link>
        </Button>
      </div>

      {/* Hero */}
      <div className="border-b border-[var(--border)] bg-[var(--card)] px-6 py-5">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex items-start gap-4">
            <div className="h-14 w-14 rounded-xl bg-[var(--primary)]/10 flex items-center justify-center shrink-0">
              <FileText className="h-7 w-7 text-[var(--primary)]" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <h1 className="text-xl font-bold text-[var(--foreground)]">Quote {QUOTE.id}</h1>
                <span className={cn("text-xs px-2 py-0.5 rounded-full font-medium", statusColors[QUOTE.status])}>
                  {QUOTE.status}
                </span>
              </div>
              <p className="text-sm text-[var(--muted-foreground)]">
                <Link href={`/app/crm/accounts/${QUOTE.accountId}`} className="hover:text-[var(--primary)] hover:underline">{QUOTE.account}</Link>
                {" · "}{QUOTE.contact} · {QUOTE.paymentTerms} · Expires {formatDate(QUOTE.expiryDate)}
              </p>
              <p className="text-lg font-bold text-[var(--foreground)] mt-2">{formatCurrency(grandTotal)}</p>
            </div>
            <div className="flex items-center gap-2 shrink-0 flex-wrap justify-end">
              <Button size="sm" variant="outline" className="h-8 text-xs" asChild>
                <Link href={`/app/crm/quotes/new`}>
                  <Edit2 className="h-3.5 w-3.5 mr-1.5" />Edit
                </Link>
              </Button>
              <Button size="sm" className="h-8 text-xs">
                <Send className="h-3.5 w-3.5 mr-1.5" />Send
              </Button>
              <Button size="sm" variant="outline" className="h-8 text-xs">
                <Download className="h-3.5 w-3.5 mr-1.5" />PDF
              </Button>
              <Button size="sm" variant="outline" className="h-8 text-xs">
                <Copy className="h-3.5 w-3.5 mr-1.5" />Duplicate
              </Button>
              <Button size="sm" className="h-8 text-xs bg-emerald-600 hover:bg-emerald-700 text-white border-0">
                <CheckCircle className="h-3.5 w-3.5 mr-1.5" />Accept
              </Button>
              <Button size="sm" variant="outline" className="h-8 text-xs text-red-600 border-red-200 hover:bg-red-50">
                <XCircle className="h-3.5 w-3.5 mr-1.5" />Decline
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Status Banner */}
      {QUOTE.status === "Sent" && (
        <div className="bg-blue-50 border-b border-blue-100 px-6 py-2">
          <div className="max-w-[1200px] mx-auto flex items-center gap-2">
            <Mail className="h-4 w-4 text-blue-600" />
            <p className="text-xs text-blue-700">This quote was sent to <strong>Marcus Williams</strong> on {formatDate(QUOTE.quoteDate)}. Awaiting response.</p>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="border-b border-[var(--border)] bg-[var(--card)] px-6">
        <div className="max-w-[1200px] mx-auto flex gap-0">
          {tabs.map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={cn(
                "px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap",
                activeTab === t.key
                  ? "border-[var(--primary)] text-[var(--primary)]"
                  : "border-transparent text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 py-6 flex gap-6">
        <div className="flex-1 min-w-0 space-y-4">

          {/* Quote Tab */}
          {activeTab === "quote" && (
            <>
              {/* Quote header info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="border border-[var(--border)]">
                  <CardContent className="p-4 space-y-2">
                    <p className="text-xs font-semibold text-[var(--foreground)] mb-2">Bill To</p>
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-[var(--muted-foreground)]" />
                      <span className="text-sm font-medium text-[var(--foreground)]">{QUOTE.account}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-[var(--muted-foreground)]" />
                      <span className="text-sm text-[var(--muted-foreground)]">{QUOTE.contact} — {QUOTE.contactTitle}</span>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border border-[var(--border)]">
                  <CardContent className="p-4 grid grid-cols-2 gap-3">
                    {[
                      { label: "Quote Date", value: formatDate(QUOTE.quoteDate) },
                      { label: "Expiry Date", value: formatDate(QUOTE.expiryDate) },
                      { label: "Payment Terms", value: QUOTE.paymentTerms },
                      { label: "Reference", value: QUOTE.reference },
                    ].map(f => (
                      <div key={f.label}>
                        <p className="text-[10px] text-[var(--muted-foreground)] font-medium uppercase tracking-wide mb-0.5">{f.label}</p>
                        <p className="text-sm text-[var(--foreground)]">{f.value}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Line Items */}
              <Card className="border border-[var(--border)]">
                <CardHeader className="pb-3"><CardTitle className="text-sm font-semibold">Line Items</CardTitle></CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-[var(--border)] bg-[var(--muted)]">
                          {["Product / Service", "Description", "Qty", "Unit Price", "Discount", "Tax", "Total"].map(h => (
                            <th key={h} className="text-left px-4 py-2.5 text-xs font-semibold text-[var(--muted-foreground)]">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[var(--border)]">
                        {LINE_ITEMS.map((item, i) => (
                          <tr key={i} className="hover:bg-[var(--muted)]/30">
                            <td className="px-4 py-3 font-medium text-[var(--foreground)]">{item.product}</td>
                            <td className="px-4 py-3 text-xs text-[var(--muted-foreground)]">{item.description}</td>
                            <td className="px-4 py-3 text-sm">{item.qty}</td>
                            <td className="px-4 py-3 text-sm">{formatCurrency(item.unitPrice)}</td>
                            <td className="px-4 py-3 text-sm">{item.discount > 0 ? `${item.discount}%` : "—"}</td>
                            <td className="px-4 py-3 text-sm">{item.tax}%</td>
                            <td className="px-4 py-3 font-semibold">{formatCurrency(calcLineTotal(item))}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Totals */}
                  <div className="flex justify-end p-4 border-t border-[var(--border)]">
                    <div className="w-64 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-[var(--muted-foreground)]">Subtotal</span>
                        <span>{formatCurrency(subtotal)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-[var(--muted-foreground)]">Discount</span>
                        <span className="text-red-600">−{formatCurrency(discountTotal)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-[var(--muted-foreground)]">VAT</span>
                        <span>{formatCurrency(taxTotal)}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between text-base font-bold">
                        <span>Total</span>
                        <span>{formatCurrency(grandTotal)}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Notes */}
              {QUOTE.notes && (
                <Card className="border border-[var(--border)]">
                  <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold">Notes</CardTitle></CardHeader>
                  <CardContent>
                    <p className="text-sm text-[var(--foreground)] leading-relaxed">{QUOTE.notes}</p>
                  </CardContent>
                </Card>
              )}

              {QUOTE.terms && (
                <Card className="border border-[var(--border)]">
                  <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold">Terms & Conditions</CardTitle></CardHeader>
                  <CardContent>
                    <p className="text-sm text-[var(--foreground)] leading-relaxed">{QUOTE.terms}</p>
                  </CardContent>
                </Card>
              )}

              {/* Accept/Decline */}
              <Card className="border border-[var(--border)]">
                <CardHeader className="pb-3"><CardTitle className="text-sm font-semibold">Accept or Decline</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-xs text-[var(--muted-foreground)] mb-2">Add acceptance or rejection notes (optional)</p>
                    <Textarea
                      value={acceptanceNote}
                      onChange={e => setAcceptanceNote(e.target.value)}
                      placeholder="Enter notes..."
                      className="min-h-[72px] text-sm"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button className="bg-emerald-600 hover:bg-emerald-700 text-white border-0 flex-1 h-9 text-sm">
                      <CheckCircle className="h-4 w-4 mr-2" />Accept Quote
                    </Button>
                    <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50 flex-1 h-9 text-sm">
                      <XCircle className="h-4 w-4 mr-2" />Decline Quote
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {/* Activity Tab */}
          {activeTab === "activity" && (
            <Card className="border border-[var(--border)]">
              <CardHeader className="pb-3 flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-semibold">Activity Log</CardTitle>
                <Button size="sm" variant="outline" className="h-7 text-xs"><Plus className="h-3.5 w-3.5 mr-1" />Log Activity</Button>
              </CardHeader>
              <CardContent>
                <div className="relative pl-6">
                  <div className="absolute left-2 top-0 bottom-0 w-px bg-[var(--border)]" />
                  <div className="space-y-4">
                    {ACTIVITY_LOG.map((a, i) => (
                      <div key={i} className="relative">
                        <div className="absolute -left-4 mt-0.5 h-6 w-6 rounded-full flex items-center justify-center bg-[var(--card)] border-2 border-[var(--border)] text-[var(--primary)]">
                          <Activity className="h-3 w-3" />
                        </div>
                        <div className="ml-2">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-[var(--muted)] text-[var(--muted-foreground)]">{a.type}</span>
                            <span className="text-xs text-[var(--muted-foreground)]">{a.actor} · {formatRelativeTime(a.time)}</span>
                          </div>
                          <p className="text-sm text-[var(--foreground)]">{a.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Emails Tab */}
          {activeTab === "emails" && (
            <Card className="border border-[var(--border)]">
              <CardHeader className="pb-3 flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-semibold">Emails</CardTitle>
                <Button size="sm" className="h-7 text-xs"><Mail className="h-3.5 w-3.5 mr-1" />Send Email</Button>
              </CardHeader>
              <CardContent className="space-y-2">
                {EMAILS.map((e, i) => (
                  <div key={i} className="flex items-center justify-between p-3 border border-[var(--border)] rounded-lg hover:bg-[var(--muted)]/50">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-xs font-bold text-blue-700">OUT</div>
                      <div>
                        <p className="text-sm font-medium">{e.subject}</p>
                        <p className="text-xs text-[var(--muted-foreground)]">{e.from} → {e.to} · {formatDate(e.date)}</p>
                      </div>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 font-medium">{e.status}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Documents Tab */}
          {activeTab === "documents" && (
            <Card className="border border-[var(--border)]">
              <CardHeader className="pb-3 flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-semibold">Documents</CardTitle>
                <Button size="sm" variant="outline" className="h-7 text-xs"><Paperclip className="h-3.5 w-3.5 mr-1" />Upload</Button>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {DOCUMENTS.map(f => (
                    <div key={f.name} className="p-3 border border-[var(--border)] rounded-lg hover:bg-[var(--muted)]/50 cursor-pointer">
                      <FileText className="h-8 w-8 text-[var(--primary)]/60 mb-2" />
                      <p className="text-xs font-medium text-[var(--foreground)] truncate">{f.name}</p>
                      <p className="text-[10px] text-[var(--muted-foreground)]">{f.size} · {f.date}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Rail */}
        <div className="w-56 shrink-0 space-y-4">
          <Card className="border border-[var(--border)]">
            <CardHeader className="pb-2"><CardTitle className="text-xs font-semibold uppercase tracking-wide text-[var(--muted-foreground)]">Actions</CardTitle></CardHeader>
            <CardContent className="space-y-1.5 p-3">
              {[
                { icon: Edit2, label: "Edit Quote" },
                { icon: Send, label: "Send Quote" },
                { icon: Download, label: "Download PDF" },
                { icon: Copy, label: "Duplicate" },
                { icon: CheckCircle, label: "Mark Accepted", color: "text-emerald-600" },
                { icon: XCircle, label: "Mark Declined", color: "text-red-600" },
              ].map(a => (
                <Button key={a.label} variant="ghost" size="sm" className={cn("w-full justify-start h-8 text-xs font-medium", (a as any).color)}>
                  <a.icon className="h-3.5 w-3.5 mr-2 text-[var(--muted-foreground)]" />{a.label}
                </Button>
              ))}
            </CardContent>
          </Card>
          <Card className="border border-[var(--border)]">
            <CardHeader className="pb-2"><CardTitle className="text-xs font-semibold uppercase tracking-wide text-[var(--muted-foreground)]">Linked Records</CardTitle></CardHeader>
            <CardContent className="space-y-1.5 p-3">
              <Link href={`/app/crm/accounts/${QUOTE.accountId}`} className="flex items-center gap-2 p-2 rounded-md hover:bg-[var(--muted)]">
                <Building2 className="h-3.5 w-3.5 text-[var(--muted-foreground)]" />
                <span className="text-xs text-[var(--primary)] hover:underline">{QUOTE.account}</span>
              </Link>
              <Link href={`/app/crm/deals/${QUOTE.dealId}`} className="flex items-center gap-2 p-2 rounded-md hover:bg-[var(--muted)]">
                <Activity className="h-3.5 w-3.5 text-[var(--muted-foreground)]" />
                <span className="text-xs text-[var(--primary)] hover:underline">{QUOTE.deal}</span>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
