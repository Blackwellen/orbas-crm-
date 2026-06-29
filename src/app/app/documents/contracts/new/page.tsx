"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, ScrollText, Save, Send } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

const CONTRACT_TYPES = ["NDA", "MSA", "SLA", "Employment", "Supplier", "Customer", "Partnership", "Other"]
const NOTICE_PERIODS = ["30 days", "60 days", "90 days"]
const OWNERS = ["James Orton", "Sarah Nkosi", "Rachel Moore", "Michael Patel", "Ayo Adeyemi"]
const APPROVERS_LIST = [
  "James Orton", "Sarah Nkosi", "Rachel Moore", "Michael Patel",
  "Ayo Adeyemi", "Legal Team", "Finance Director", "CEO"
]

export default function NewContractPage() {
  const router = useRouter()
  const { toast } = useToast()

  const [form, setForm] = useState({
    name: "",
    type: "NDA",
    counterparty: "",
    value: "",
    startDate: "",
    endDate: "",
    autoRenewal: false,
    renewalNotice: "30 days",
    description: "",
    owner: "James Orton",
  })
  const [selectedApprovers, setSelectedApprovers] = useState<string[]>([])

  const toggleApprover = (name: string) => {
    setSelectedApprovers(prev => prev.includes(name) ? prev.filter(a => a !== name) : [...prev, name])
  }

  const handleSubmit = (e: React.FormEvent, asDraft = false) => {
    e.preventDefault()
    toast({
      title: asDraft ? "Draft saved" : "Contract created successfully",
      description: asDraft
        ? `"${form.name || "Untitled contract"}" saved as draft.`
        : `"${form.name}" has been created and is ready for review.`,
    })
    router.push("/app/documents/contracts")
  }

  const Field = ({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) => (
    <div>
      <label className="text-xs font-semibold mb-1.5 block" style={{ color: "var(--foreground)" }}>
        {label}{required && <span className="ml-0.5" style={{ color: "#dc2626" }}>*</span>}
      </label>
      {children}
    </div>
  )

  const inputStyle = {
    borderColor: "var(--border)",
    background: "var(--background)",
    color: "var(--foreground)"
  }

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <button
          onClick={() => router.back()}
          className="p-1.5 rounded-md hover:opacity-70 transition-opacity"
          style={{ color: "var(--muted-foreground)" }}
        >
          <ArrowLeft size={18} />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "var(--primary)" }}>
            <ScrollText size={16} color="white" />
          </div>
          <div>
            <h1 className="text-xl font-bold" style={{ color: "var(--foreground)" }}>New Contract</h1>
            <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>Create a new contract record</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="border" style={{ borderColor: "var(--border)" }}>
          <CardContent className="p-6 space-y-5">
            <h2 className="text-sm font-semibold pb-2 border-b" style={{ color: "var(--foreground)", borderColor: "var(--border)" }}>Contract Details</h2>
            <Field label="Contract Name" required>
              <input
                type="text"
                placeholder="e.g. Enterprise Software Licence — Acme Corp"
                value={form.name}
                onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                className="w-full h-9 rounded-md border px-3 text-sm outline-none"
                style={inputStyle}
              />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Contract Type" required>
                <select
                  value={form.type}
                  onChange={e => setForm(p => ({ ...p, type: e.target.value }))}
                  className="w-full h-9 rounded-md border px-3 text-sm outline-none"
                  style={inputStyle}
                >
                  {CONTRACT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </Field>
              <Field label="Counterparty" required>
                <input
                  type="text"
                  placeholder="Company or individual name"
                  value={form.counterparty}
                  onChange={e => setForm(p => ({ ...p, counterparty: e.target.value }))}
                  className="w-full h-9 rounded-md border px-3 text-sm outline-none"
                  style={inputStyle}
                />
              </Field>
            </div>
            <Field label="Contract Value (£)">
              <input
                type="number"
                placeholder="0"
                value={form.value}
                onChange={e => setForm(p => ({ ...p, value: e.target.value }))}
                className="w-full h-9 rounded-md border px-3 text-sm outline-none"
                style={inputStyle}
                min="0"
              />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Start Date" required>
                <input
                  type="date"
                  value={form.startDate}
                  onChange={e => setForm(p => ({ ...p, startDate: e.target.value }))}
                  className="w-full h-9 rounded-md border px-3 text-sm outline-none"
                  style={inputStyle}
                />
              </Field>
              <Field label="End Date">
                <input
                  type="date"
                  value={form.endDate}
                  onChange={e => setForm(p => ({ ...p, endDate: e.target.value }))}
                  className="w-full h-9 rounded-md border px-3 text-sm outline-none"
                  style={inputStyle}
                />
              </Field>
            </div>
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-6 rounded-full relative cursor-pointer transition-colors"
                style={{ background: form.autoRenewal ? "var(--primary)" : "var(--border)" }}
                onClick={() => setForm(p => ({ ...p, autoRenewal: !p.autoRenewal }))}
              >
                <div
                  className="w-4 h-4 rounded-full bg-white absolute top-1 transition-transform"
                  style={{ left: form.autoRenewal ? "calc(100% - 20px)" : "4px" }}
                />
              </div>
              <span className="text-sm font-medium" style={{ color: "var(--foreground)" }}>Auto-renewal enabled</span>
            </div>
            {form.autoRenewal && (
              <Field label="Renewal Notice Period">
                <select
                  value={form.renewalNotice}
                  onChange={e => setForm(p => ({ ...p, renewalNotice: e.target.value }))}
                  className="w-full h-9 rounded-md border px-3 text-sm outline-none"
                  style={inputStyle}
                >
                  {NOTICE_PERIODS.map(n => <option key={n} value={n}>{n}</option>)}
                </select>
              </Field>
            )}
            <Field label="Description / Summary">
              <textarea
                placeholder="Describe the purpose and scope of this contract…"
                value={form.description}
                onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
                rows={4}
                className="w-full rounded-md border px-3 py-2 text-sm outline-none resize-none"
                style={inputStyle}
              />
            </Field>
          </CardContent>
        </Card>

        <Card className="border" style={{ borderColor: "var(--border)" }}>
          <CardContent className="p-6 space-y-5">
            <h2 className="text-sm font-semibold pb-2 border-b" style={{ color: "var(--foreground)", borderColor: "var(--border)" }}>Internal Stakeholders</h2>
            <Field label="Contract Owner" required>
              <select
                value={form.owner}
                onChange={e => setForm(p => ({ ...p, owner: e.target.value }))}
                className="w-full h-9 rounded-md border px-3 text-sm outline-none"
                style={inputStyle}
              >
                {OWNERS.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </Field>
            <div>
              <label className="text-xs font-semibold mb-2 block" style={{ color: "var(--foreground)" }}>Approvers</label>
              <div className="rounded-lg border p-3 space-y-2" style={{ borderColor: "var(--border)", background: "var(--secondary)" }}>
                {APPROVERS_LIST.map(a => (
                  <label key={a} className="flex items-center gap-3 cursor-pointer">
                    <div
                      className="w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 transition-colors"
                      style={selectedApprovers.includes(a)
                        ? { borderColor: "var(--primary)", background: "var(--primary)" }
                        : { borderColor: "var(--border)", background: "var(--background)" }}
                      onClick={() => toggleApprover(a)}
                    >
                      {selectedApprovers.includes(a) && (
                        <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                          <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                    <span className="text-sm" style={{ color: "var(--foreground)" }}>{a}</span>
                  </label>
                ))}
              </div>
              {selectedApprovers.length > 0 && (
                <p className="text-xs mt-2" style={{ color: "var(--muted-foreground)" }}>
                  {selectedApprovers.length} approver{selectedApprovers.length !== 1 ? "s" : ""} selected: {selectedApprovers.join(", ")}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="flex items-center gap-3 justify-end">
          <button
            type="button"
            onClick={(e) => handleSubmit(e, true)}
            className="inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium border hover:opacity-70 transition-opacity"
            style={{ borderColor: "var(--border)", color: "var(--foreground)", background: "var(--background)" }}
          >
            <Save size={14} /> Save as Draft
          </button>
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-md px-5 py-2 text-sm font-medium text-white hover:opacity-90 transition-opacity"
            style={{ background: "var(--primary)" }}
          >
            <Send size={14} /> Create Contract
          </button>
        </div>
      </form>
    </div>
  )
}
