"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Plus, Trash2, Check, ChevronRight } from "lucide-react"
import { formatCurrency } from "@/lib/utils"

const clients = [
  "Apex Capital Group", "Meridian Law LLP", "NorthStar Retail", "Finsbury Consulting",
  "Southbank Media", "BrightPath Energy", "Albion Logistics", "Greenfield Brands",
  "Sterling Insurance", "Whitmore Partners",
]

interface LineItem {
  id: number;
  description: string;
  qty: number;
  unitPrice: number;
  discount: number;
}

const steps = ["Details", "Line Items", "Terms", "Preview"]

export default function NewProposalPage() {
  const [step, setStep] = useState(0)
  const [client, setClient] = useState("")
  const [title, setTitle] = useState("")
  const [validUntil, setValidUntil] = useState("")
  const [currency, setCurrency] = useState("GBP")
  const [intro, setIntro] = useState("")
  const [lineItems, setLineItems] = useState<LineItem[]>([
    { id: 1, description: "", qty: 1, unitPrice: 0, discount: 0 },
  ])
  const [terms, setTerms] = useState("")
  const [paymentTerms, setPaymentTerms] = useState("net30")
  const [eSign, setESign] = useState(false)

  const addLine = () => setLineItems(prev => [...prev, { id: Date.now(), description: "", qty: 1, unitPrice: 0, discount: 0 }])
  const removeLine = (id: number) => setLineItems(prev => prev.filter(l => l.id !== id))
  const updateLine = (id: number, field: keyof LineItem, value: string | number) =>
    setLineItems(prev => prev.map(l => l.id === id ? { ...l, [field]: value } : l))

  const lineTotal = (l: LineItem) => l.qty * l.unitPrice * (1 - l.discount / 100)
  const subtotal = lineItems.reduce((a, l) => a + lineTotal(l), 0)
  const discountTotal = lineItems.reduce((a, l) => a + l.qty * l.unitPrice * (l.discount / 100), 0)
  const tax = subtotal * 0.2
  const total = subtotal + tax

  return (
    <div className="p-6 max-w-4xl" style={{ color: "var(--foreground)" }}>
      <div className="flex items-center gap-3 mb-6">
        <Link href="/app/crm/proposals">
          <Button variant="ghost" size="sm" className="gap-1">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold">New Proposal</h1>
          <p className="text-sm mt-0.5" style={{ color: "var(--muted-foreground)" }}>Build and send a client proposal</p>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-8">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <button
              onClick={() => i < step && setStep(i)}
              className="flex items-center gap-2 text-sm font-medium"
            >
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                style={{
                  backgroundColor: i < step ? "#16a34a" : i === step ? "var(--primary)" : "var(--secondary)",
                  color: i <= step ? "#fff" : "var(--muted-foreground)",
                }}
              >
                {i < step ? <Check className="w-3.5 h-3.5" /> : i + 1}
              </div>
              <span style={{ color: i === step ? "var(--foreground)" : "var(--muted-foreground)" }}>{s}</span>
            </button>
            {i < steps.length - 1 && <ChevronRight className="w-4 h-4" style={{ color: "var(--muted-foreground)" }} />}
          </div>
        ))}
      </div>

      {step === 0 && (
        <Card style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          <CardHeader><CardTitle className="text-base">Proposal Details</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Client</label>
              <Select value={client} onValueChange={setClient}>
                <SelectTrigger style={{ background: "var(--background)", border: "1px solid var(--border)" }}>
                  <SelectValue placeholder="Select a client..." />
                </SelectTrigger>
                <SelectContent>
                  {clients.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Proposal Title</label>
              <Input value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Enterprise CRM Implementation" style={{ background: "var(--background)", border: "1px solid var(--border)" }} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Valid Until</label>
                <Input type="date" value={validUntil} onChange={e => setValidUntil(e.target.value)} style={{ background: "var(--background)", border: "1px solid var(--border)" }} />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Currency</label>
                <Select value={currency} onValueChange={setCurrency}>
                  <SelectTrigger style={{ background: "var(--background)", border: "1px solid var(--border)" }}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {["GBP", "USD", "EUR"].map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Introduction Message</label>
              <textarea
                value={intro}
                onChange={e => setIntro(e.target.value)}
                placeholder="Dear [Client], thank you for considering our solution..."
                rows={4}
                className="w-full rounded-lg px-3 py-2 text-sm resize-none"
                style={{ background: "var(--background)", border: "1px solid var(--border)", color: "var(--foreground)", outline: "none" }}
              />
            </div>
          </CardContent>
        </Card>
      )}

      {step === 1 && (
        <Card style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base">Line Items</CardTitle>
            <Button variant="outline" size="sm" onClick={addLine} style={{ border: "1px solid var(--border)" }}>
              <Plus className="w-4 h-4 mr-1" /> Add Item
            </Button>
          </CardHeader>
          <CardContent>
            <table className="w-full text-sm mb-4">
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border)" }}>
                  {["Description", "Qty", "Unit Price", "Discount %", "Total", ""].map(h => (
                    <th key={h} className="text-left pb-2 text-xs font-semibold" style={{ color: "var(--muted-foreground)" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {lineItems.map(l => (
                  <tr key={l.id} style={{ borderBottom: "1px solid var(--border)" }}>
                    <td className="py-2 pr-2">
                      <Input value={l.description} onChange={e => updateLine(l.id, "description", e.target.value)} placeholder="Item description" style={{ background: "var(--background)", border: "1px solid var(--border)" }} />
                    </td>
                    <td className="py-2 pr-2 w-20">
                      <Input type="number" value={l.qty} onChange={e => updateLine(l.id, "qty", Number(e.target.value))} style={{ background: "var(--background)", border: "1px solid var(--border)" }} />
                    </td>
                    <td className="py-2 pr-2 w-28">
                      <Input type="number" value={l.unitPrice} onChange={e => updateLine(l.id, "unitPrice", Number(e.target.value))} style={{ background: "var(--background)", border: "1px solid var(--border)" }} />
                    </td>
                    <td className="py-2 pr-2 w-24">
                      <Input type="number" value={l.discount} onChange={e => updateLine(l.id, "discount", Number(e.target.value))} style={{ background: "var(--background)", border: "1px solid var(--border)" }} />
                    </td>
                    <td className="py-2 pr-2 font-semibold w-28">{formatCurrency(lineTotal(l))}</td>
                    <td className="py-2 w-8">
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => removeLine(l.id)}>
                        <Trash2 className="w-3.5 h-3.5" style={{ color: "var(--destructive)" }} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="ml-auto max-w-xs space-y-1 text-sm">
              <div className="flex justify-between">
                <span style={{ color: "var(--muted-foreground)" }}>Subtotal</span>
                <span>{formatCurrency(subtotal + discountTotal)}</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: "var(--muted-foreground)" }}>Discount</span>
                <span style={{ color: "#dc2626" }}>-{formatCurrency(discountTotal)}</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: "var(--muted-foreground)" }}>VAT (20%)</span>
                <span>{formatCurrency(tax)}</span>
              </div>
              <div className="flex justify-between font-bold text-base pt-1" style={{ borderTop: "1px solid var(--border)" }}>
                <span>Total</span>
                <span>{formatCurrency(total)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {step === 2 && (
        <Card style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          <CardHeader><CardTitle className="text-base">Terms & Conditions</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Terms & Conditions</label>
              <textarea
                value={terms}
                onChange={e => setTerms(e.target.value)}
                placeholder="This proposal is valid for 30 days from the date of issue. All prices are exclusive of VAT unless stated. Payment is due within the specified payment terms..."
                rows={8}
                className="w-full rounded-lg px-3 py-2 text-sm resize-none"
                style={{ background: "var(--background)", border: "1px solid var(--border)", color: "var(--foreground)", outline: "none" }}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Payment Terms</label>
              <Select value={paymentTerms} onValueChange={setPaymentTerms}>
                <SelectTrigger style={{ background: "var(--background)", border: "1px solid var(--border)" }}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="immediate">Immediate</SelectItem>
                  <SelectItem value="net30">Net 30</SelectItem>
                  <SelectItem value="net60">Net 60</SelectItem>
                  <SelectItem value="net90">Net 90</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setESign(!eSign)}
                className="w-10 h-6 rounded-full transition-colors relative"
                style={{ backgroundColor: eSign ? "var(--primary)" : "var(--secondary)" }}
              >
                <div className="w-4 h-4 bg-white rounded-full absolute top-1 transition-all" style={{ left: eSign ? "calc(100% - 20px)" : "4px" }} />
              </button>
              <span className="text-sm font-medium">Require e-signature</span>
            </div>
          </CardContent>
        </Card>
      )}

      {step === 3 && (
        <Card style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          <CardHeader><CardTitle className="text-base">Proposal Preview</CardTitle></CardHeader>
          <CardContent>
            <div className="rounded-xl p-6" style={{ background: "var(--background)", border: "1px solid var(--border)" }}>
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-xl font-bold">PROPOSAL</h2>
                  <p className="text-sm mt-0.5" style={{ color: "var(--muted-foreground)" }}>Draft — {new Date().toLocaleDateString("en-GB")}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">Orbas Ltd</p>
                  <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>hello@orbas.io</p>
                </div>
              </div>
              <div className="mb-5">
                <p className="text-xs font-semibold uppercase mb-1" style={{ color: "var(--muted-foreground)" }}>Prepared for</p>
                <p className="font-semibold">{client || "— Select a client —"}</p>
              </div>
              <div className="mb-5">
                <p className="text-xl font-bold">{title || "— Enter a title —"}</p>
                {intro && <p className="text-sm mt-2" style={{ color: "var(--muted-foreground)" }}>{intro}</p>}
              </div>
              <table className="w-full text-sm mb-4">
                <thead>
                  <tr style={{ borderBottom: "2px solid var(--border)" }}>
                    {["Description", "Qty", "Unit Price", "Discount", "Total"].map(h => (
                      <th key={h} className="text-left pb-2 text-xs font-semibold" style={{ color: "var(--muted-foreground)" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {lineItems.map(l => (
                    <tr key={l.id} style={{ borderBottom: "1px solid var(--border)" }}>
                      <td className="py-2">{l.description || "—"}</td>
                      <td className="py-2">{l.qty}</td>
                      <td className="py-2">{formatCurrency(l.unitPrice)}</td>
                      <td className="py-2">{l.discount}%</td>
                      <td className="py-2 font-semibold">{formatCurrency(lineTotal(l))}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="ml-auto max-w-xs text-sm space-y-1">
                <div className="flex justify-between">
                  <span style={{ color: "var(--muted-foreground)" }}>Subtotal</span>
                  <span>{formatCurrency(subtotal + discountTotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: "var(--muted-foreground)" }}>Discount</span>
                  <span style={{ color: "#dc2626" }}>-{formatCurrency(discountTotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: "var(--muted-foreground)" }}>VAT 20%</span>
                  <span>{formatCurrency(tax)}</span>
                </div>
                <div className="flex justify-between font-bold text-base pt-1" style={{ borderTop: "2px solid var(--border)" }}>
                  <span>Total</span>
                  <span>{formatCurrency(total)}</span>
                </div>
              </div>
              {terms && (
                <div className="mt-5 pt-4" style={{ borderTop: "1px solid var(--border)" }}>
                  <p className="text-xs font-semibold mb-1" style={{ color: "var(--muted-foreground)" }}>Terms & Conditions</p>
                  <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>{terms}</p>
                </div>
              )}
              <div className="mt-3 text-xs" style={{ color: "var(--muted-foreground)" }}>
                Payment terms: {paymentTerms === "net30" ? "Net 30" : paymentTerms === "net60" ? "Net 60" : paymentTerms === "net90" ? "Net 90" : "Immediate"}
                {eSign && " · E-signature required"}
                {validUntil && ` · Valid until ${validUntil}`}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0} style={{ border: "1px solid var(--border)" }}>
          Back
        </Button>
        <div className="flex gap-3">
          {step === 3 ? (
            <>
              <Button variant="outline" style={{ border: "1px solid var(--border)" }}>Save as Draft</Button>
              <Button style={{ backgroundColor: "var(--primary)", color: "#fff" }}>Send to Client</Button>
            </>
          ) : (
            <Button onClick={() => setStep(s => Math.min(3, s + 1))} style={{ backgroundColor: "var(--primary)", color: "#fff" }}>
              Next
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
