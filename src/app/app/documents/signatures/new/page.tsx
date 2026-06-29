"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import {
  ArrowLeft, ArrowRight, Upload, FileText, Plus, Trash2,
  Check, PenLine, Hash, Calendar, Type, CheckSquare, Send,
  User, Mail, ChevronDown, Clock, Bell
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

const EXISTING_DOCS = [
  { id: "d1", name: "Enterprise Services Agreement v2.pdf", size: "842 KB", date: "8 Jun 2026" },
  { id: "d2", name: "NDA Template — ClearCloud.pdf",        size: "124 KB", date: "5 Jun 2026" },
  { id: "d3", name: "Consulting Proposal Q2 2026.pdf",      size: "1.2 MB", date: "3 Jun 2026" },
  { id: "d4", name: "Partnership MOU — MetaScale.pdf",      size: "318 KB", date: "1 Jun 2026" },
  { id: "d5", name: "SLA Agreement v1.1.pdf",               size: "256 KB", date: "28 May 2026" },
]

const STEPS = [
  { id: 1, label: "Document" },
  { id: 2, label: "Signers" },
  { id: 3, label: "Fields" },
  { id: 4, label: "Message" },
  { id: 5, label: "Review & Send" },
]

const ROLES = ["Signer", "Approver", "CC"]
const ORDERS = ["1", "2", "3", "4", "5"]
const REMINDERS = ["Every 2 days", "Every 3 days", "Every 7 days", "Never"]

type Signer = {
  id: string
  name: string
  email: string
  role: string
  order: string
}

export default function NewSignatureRequestPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [step, setStep] = useState(1)
  const [uploadedFile, setUploadedFile] = useState<string | null>(null)
  const [selectedDoc, setSelectedDoc] = useState<string | null>(null)
  const [signers, setSigners] = useState<Signer[]>([])
  const [newSigner, setNewSigner] = useState({ name: "", email: "", role: "Signer", order: "1" })
  const [emailSubject, setEmailSubject] = useState("Please sign: ")
  const [emailMessage, setEmailMessage] = useState("Hi,\n\nPlease review and sign the attached document at your earliest convenience.\n\nThank you.")
  const [expiry, setExpiry] = useState("")
  const [reminder, setReminder] = useState("Every 2 days")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const documentName = uploadedFile ?? (selectedDoc ? EXISTING_DOCS.find(d => d.id === selectedDoc)?.name ?? "" : "")

  const addSigner = () => {
    if (!newSigner.name || !newSigner.email) return
    setSigners(prev => [...prev, { ...newSigner, id: crypto.randomUUID() }])
    setNewSigner({ name: "", email: "", role: "Signer", order: String(signers.length + 2) })
  }

  const removeSigner = (id: string) => setSigners(prev => prev.filter(s => s.id !== id))

  const handleSend = () => {
    toast({ title: "Sent for signature", description: `"${documentName}" has been sent to ${signers.length} signer${signers.length !== 1 ? "s" : ""}.` })
    router.push("/app/documents/signatures")
  }

  const canNext = () => {
    if (step === 1) return !!documentName
    if (step === 2) return signers.length > 0
    return true
  }

  const roleColor: Record<string, { bg: string; color: string }> = {
    Signer:   { bg: "#dbeafe", color: "#1d4ed8" },
    Approver: { bg: "#dcfce7", color: "#16a34a" },
    CC:       { bg: "#f1f5f9", color: "#475569" },
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <button
          onClick={() => router.back()}
          className="p-1.5 rounded-md hover:opacity-70 transition-opacity"
          style={{ color: "var(--muted-foreground)" }}
        >
          <ArrowLeft size={18} />
        </button>
        <div>
          <h1 className="text-xl font-bold" style={{ color: "var(--foreground)" }}>Send for Signature</h1>
          <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>Set up your signature request in a few steps</p>
        </div>
      </div>

      <div className="flex items-center gap-0">
        {STEPS.map((s, i) => (
          <div key={s.id} className="flex items-center flex-1">
            <div className="flex flex-col items-center flex-1">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold border-2 transition-all"
                style={step > s.id
                  ? { background: "#16a34a", borderColor: "#16a34a", color: "white" }
                  : step === s.id
                  ? { background: "var(--primary)", borderColor: "var(--primary)", color: "white" }
                  : { background: "var(--background)", borderColor: "var(--border)", color: "var(--muted-foreground)" }}
              >
                {step > s.id ? <Check size={14} /> : s.id}
              </div>
              <span className="text-[11px] font-medium mt-1 text-center" style={{ color: step >= s.id ? "var(--foreground)" : "var(--muted-foreground)" }}>
                {s.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className="h-px w-full mb-4" style={{ background: step > s.id ? "#16a34a" : "var(--border)" }} />
            )}
          </div>
        ))}
      </div>

      <Card className="border" style={{ borderColor: "var(--border)" }}>
        <CardContent className="p-6">
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-base font-semibold mb-1" style={{ color: "var(--foreground)" }}>Upload Document</h2>
                <p className="text-sm mb-4" style={{ color: "var(--muted-foreground)" }}>Upload a new document or choose one from your library</p>
                <div
                  className="border-2 border-dashed rounded-xl p-10 text-center cursor-pointer hover:opacity-80 transition-opacity"
                  style={{ borderColor: "var(--border)", background: "var(--secondary)" }}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload size={32} className="mx-auto mb-3" style={{ color: "var(--muted-foreground)" }} />
                  <p className="font-medium text-sm" style={{ color: "var(--foreground)" }}>Click to upload or drag and drop</p>
                  <p className="text-xs mt-1" style={{ color: "var(--muted-foreground)" }}>PDF, DOCX up to 25MB</p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.docx"
                    className="hidden"
                    onChange={e => {
                      const file = e.target.files?.[0]
                      if (file) {
                        setUploadedFile(file.name)
                        setSelectedDoc(null)
                        setEmailSubject(`Please sign: ${file.name}`)
                      }
                    }}
                  />
                </div>
                {uploadedFile && (
                  <div className="mt-3 flex items-center gap-3 p-3 rounded-lg border" style={{ borderColor: "var(--border)", background: "var(--background)" }}>
                    <FileText size={18} style={{ color: "var(--primary)" }} />
                    <span className="text-sm flex-1 font-medium" style={{ color: "var(--foreground)" }}>{uploadedFile}</span>
                    <button onClick={() => setUploadedFile(null)} style={{ color: "var(--muted-foreground)" }}>
                      <Trash2 size={14} />
                    </button>
                  </div>
                )}
              </div>
              <div>
                <h3 className="text-sm font-semibold mb-3" style={{ color: "var(--foreground)" }}>Or choose from library</h3>
                <div className="space-y-2">
                  {EXISTING_DOCS.map(doc => (
                    <div
                      key={doc.id}
                      className="flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all"
                      style={{
                        borderColor: selectedDoc === doc.id ? "var(--primary)" : "var(--border)",
                        background: selectedDoc === doc.id ? "var(--primary)" + "11" : "var(--background)"
                      }}
                      onClick={() => {
                        setSelectedDoc(doc.id)
                        setUploadedFile(null)
                        setEmailSubject(`Please sign: ${doc.name}`)
                      }}
                    >
                      <div
                        className="w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0"
                        style={selectedDoc === doc.id
                          ? { borderColor: "var(--primary)", background: "var(--primary)" }
                          : { borderColor: "var(--border)" }}
                      >
                        {selectedDoc === doc.id && <Check size={10} color="white" />}
                      </div>
                      <FileText size={16} style={{ color: "var(--muted-foreground)" }} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate" style={{ color: "var(--foreground)" }}>{doc.name}</p>
                        <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>{doc.size} · {doc.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-base font-semibold mb-1" style={{ color: "var(--foreground)" }}>Add Signers</h2>
                <p className="text-sm mb-4" style={{ color: "var(--muted-foreground)" }}>Add the people who need to sign or review this document</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-4 rounded-lg border" style={{ borderColor: "var(--border)", background: "var(--secondary)" }}>
                <div>
                  <label className="text-xs font-medium mb-1 block" style={{ color: "var(--muted-foreground)" }}>Full Name</label>
                  <div className="relative">
                    <User size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2" style={{ color: "var(--muted-foreground)" }} />
                    <input
                      type="text"
                      placeholder="Signer name"
                      value={newSigner.name}
                      onChange={e => setNewSigner(p => ({ ...p, name: e.target.value }))}
                      className="w-full h-9 rounded-md border pl-8 pr-3 text-sm outline-none"
                      style={{ borderColor: "var(--border)", background: "var(--background)", color: "var(--foreground)" }}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium mb-1 block" style={{ color: "var(--muted-foreground)" }}>Email Address</label>
                  <div className="relative">
                    <Mail size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2" style={{ color: "var(--muted-foreground)" }} />
                    <input
                      type="email"
                      placeholder="email@example.com"
                      value={newSigner.email}
                      onChange={e => setNewSigner(p => ({ ...p, email: e.target.value }))}
                      className="w-full h-9 rounded-md border pl-8 pr-3 text-sm outline-none"
                      style={{ borderColor: "var(--border)", background: "var(--background)", color: "var(--foreground)" }}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium mb-1 block" style={{ color: "var(--muted-foreground)" }}>Role</label>
                  <select
                    value={newSigner.role}
                    onChange={e => setNewSigner(p => ({ ...p, role: e.target.value }))}
                    className="w-full h-9 rounded-md border px-3 text-sm outline-none"
                    style={{ borderColor: "var(--border)", background: "var(--background)", color: "var(--foreground)" }}
                  >
                    {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium mb-1 block" style={{ color: "var(--muted-foreground)" }}>Signing Order</label>
                  <select
                    value={newSigner.order}
                    onChange={e => setNewSigner(p => ({ ...p, order: e.target.value }))}
                    className="w-full h-9 rounded-md border px-3 text-sm outline-none"
                    style={{ borderColor: "var(--border)", background: "var(--background)", color: "var(--foreground)" }}
                  >
                    {ORDERS.map(o => <option key={o} value={o}>Order {o}</option>)}
                  </select>
                </div>
                <div className="md:col-span-2">
                  <button
                    onClick={addSigner}
                    disabled={!newSigner.name || !newSigner.email}
                    className="inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-white disabled:opacity-50 transition-opacity hover:opacity-90"
                    style={{ background: "var(--primary)" }}
                  >
                    <Plus size={14} /> Add Signer
                  </button>
                </div>
              </div>
              {signers.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold mb-3" style={{ color: "var(--foreground)" }}>Added Signers ({signers.length})</h3>
                  <div className="space-y-2">
                    {signers.map((s, i) => {
                      const rc = roleColor[s.role] ?? roleColor.CC
                      return (
                        <div key={s.id} className="flex items-center gap-3 p-3 rounded-lg border" style={{ borderColor: "var(--border)", background: "var(--background)" }}>
                          <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0" style={{ background: "var(--primary)" }}>
                            {i + 1}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium" style={{ color: "var(--foreground)" }}>{s.name}</p>
                            <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>{s.email}</p>
                          </div>
                          <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ background: rc.bg, color: rc.color }}>{s.role}</span>
                          <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>Order {s.order}</span>
                          <button onClick={() => removeSigner(s.id)} style={{ color: "var(--muted-foreground)" }} className="hover:opacity-70">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
              {signers.length === 0 && (
                <div className="text-center py-8">
                  <User size={28} className="mx-auto mb-2" style={{ color: "var(--muted-foreground)" }} />
                  <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>No signers added yet. Add at least one signer to continue.</p>
                </div>
              )}
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div>
                <h2 className="text-base font-semibold mb-1" style={{ color: "var(--foreground)" }}>Place Signature Fields</h2>
                <p className="text-sm mb-4" style={{ color: "var(--muted-foreground)" }}>Drag fields from the palette onto the document preview to indicate where signers should sign</p>
              </div>
              <div className="flex gap-4">
                <div className="w-44 shrink-0 space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: "var(--muted-foreground)" }}>Field Palette</p>
                  {[
                    { icon: PenLine,     label: "Signature",  color: "#1a56db" },
                    { icon: Hash,        label: "Initials",   color: "#7c3aed" },
                    { icon: Calendar,    label: "Date",       color: "#d97706" },
                    { icon: Type,        label: "Text Field", color: "#059669" },
                    { icon: CheckSquare, label: "Checkbox",   color: "#dc2626" },
                  ].map(f => {
                    const Icon = f.icon
                    return (
                      <div
                        key={f.label}
                        draggable
                        className="flex items-center gap-2 p-2.5 rounded-lg border cursor-grab active:cursor-grabbing text-sm font-medium select-none"
                        style={{ borderColor: "var(--border)", background: "var(--background)", color: f.color }}
                      >
                        <Icon size={15} />
                        {f.label}
                      </div>
                    )
                  })}
                  <p className="text-[10px] mt-4 text-center leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
                    Drag any field onto the document to place it
                  </p>
                </div>
                <div className="flex-1 rounded-xl border overflow-hidden" style={{ borderColor: "var(--border)" }}>
                  <div className="px-4 py-2 border-b text-xs font-medium flex items-center gap-2" style={{ borderColor: "var(--border)", background: "var(--secondary)", color: "var(--muted-foreground)" }}>
                    <FileText size={13} />
                    {documentName || "Document Preview"}
                  </div>
                  <div className="p-6 min-h-[400px]" style={{ background: "white" }}>
                    <div className="space-y-3 max-w-2xl mx-auto">
                      <div className="text-center mb-8">
                        <p className="text-sm font-bold" style={{ color: "#1a1a1a" }}>SERVICE AGREEMENT</p>
                        <p className="text-xs mt-1" style={{ color: "#555" }}>This agreement is entered into as of the date signed below</p>
                      </div>
                      {[
                        "1. PARTIES. This Service Agreement ('Agreement') is made between Orbas Technologies Ltd, a company registered in England and Wales ('Service Provider'), and the counterparty identified on the signature page ('Client').",
                        "2. SERVICES. Service Provider agrees to perform the services described in Schedule A attached hereto and incorporated herein by reference.",
                        "3. PAYMENT TERMS. Client shall pay the fees set forth in Schedule B within thirty (30) days of receipt of each invoice.",
                        "4. TERM. This Agreement shall commence on the Effective Date and shall continue for a period of twelve (12) months unless earlier terminated.",
                        "5. CONFIDENTIALITY. Each party agrees to maintain the confidentiality of the other party's proprietary information disclosed hereunder.",
                      ].map((text, i) => (
                        <p key={i} className="text-xs leading-relaxed" style={{ color: "#333" }}>{text}</p>
                      ))}
                      <div className="mt-12 border-t pt-6 grid grid-cols-2 gap-8" style={{ borderColor: "#ddd" }}>
                        <div>
                          <div className="h-12 border-b mb-1 flex items-end" style={{ borderColor: "#999" }}>
                            <div className="w-full h-4 rounded" style={{ background: "#dbeafe22", border: "1px dashed #1a56db" }}>
                              <p className="text-[9px] text-center mt-0.5" style={{ color: "#1a56db" }}>Signature Field</p>
                            </div>
                          </div>
                          <p className="text-[10px]" style={{ color: "#555" }}>Authorised Signature</p>
                          <p className="text-[10px]" style={{ color: "#888" }}>Service Provider</p>
                        </div>
                        <div>
                          <div className="h-12 border-b mb-1 flex items-end" style={{ borderColor: "#999" }}>
                            <div className="w-full h-4 rounded" style={{ background: "#dcfce722", border: "1px dashed #16a34a" }}>
                              <p className="text-[9px] text-center mt-0.5" style={{ color: "#16a34a" }}>Signature Field</p>
                            </div>
                          </div>
                          <p className="text-[10px]" style={{ color: "#555" }}>Authorised Signature</p>
                          <p className="text-[10px]" style={{ color: "#888" }}>Client</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                In the full editor, drag fields from the palette to precise locations on your document. Each field will be assigned to a specific signer.
              </p>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-5 max-w-xl">
              <div>
                <h2 className="text-base font-semibold mb-1" style={{ color: "var(--foreground)" }}>Email & Options</h2>
                <p className="text-sm mb-4" style={{ color: "var(--muted-foreground)" }}>Customise the email sent to signers and set expiry options</p>
              </div>
              <div>
                <label className="text-xs font-semibold mb-1.5 block" style={{ color: "var(--foreground)" }}>Email Subject</label>
                <input
                  type="text"
                  value={emailSubject}
                  onChange={e => setEmailSubject(e.target.value)}
                  className="w-full h-9 rounded-md border px-3 text-sm outline-none"
                  style={{ borderColor: "var(--border)", background: "var(--background)", color: "var(--foreground)" }}
                />
              </div>
              <div>
                <label className="text-xs font-semibold mb-1.5 block" style={{ color: "var(--foreground)" }}>Message to Signers</label>
                <textarea
                  value={emailMessage}
                  onChange={e => setEmailMessage(e.target.value)}
                  rows={5}
                  className="w-full rounded-md border px-3 py-2 text-sm outline-none resize-none"
                  style={{ borderColor: "var(--border)", background: "var(--background)", color: "var(--foreground)" }}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold mb-1.5 flex items-center gap-1" style={{ color: "var(--foreground)" }}>
                    <Clock size={12} /> Expiry Date
                  </label>
                  <input
                    type="date"
                    value={expiry}
                    onChange={e => setExpiry(e.target.value)}
                    className="w-full h-9 rounded-md border px-3 text-sm outline-none"
                    style={{ borderColor: "var(--border)", background: "var(--background)", color: "var(--foreground)" }}
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold mb-1.5 flex items-center gap-1" style={{ color: "var(--foreground)" }}>
                    <Bell size={12} /> Reminder Frequency
                  </label>
                  <select
                    value={reminder}
                    onChange={e => setReminder(e.target.value)}
                    className="w-full h-9 rounded-md border px-3 text-sm outline-none"
                    style={{ borderColor: "var(--border)", background: "var(--background)", color: "var(--foreground)" }}
                  >
                    {REMINDERS.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-5">
              <div>
                <h2 className="text-base font-semibold mb-1" style={{ color: "var(--foreground)" }}>Review & Send</h2>
                <p className="text-sm mb-4" style={{ color: "var(--muted-foreground)" }}>Review all details before sending your signature request</p>
              </div>
              <div className="space-y-4">
                <div className="p-4 rounded-lg border" style={{ borderColor: "var(--border)", background: "var(--secondary)" }}>
                  <p className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: "var(--muted-foreground)" }}>Document</p>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: "var(--primary)" + "22" }}>
                      <FileText size={18} style={{ color: "var(--primary)" }} />
                    </div>
                    <p className="text-sm font-medium" style={{ color: "var(--foreground)" }}>{documentName || "No document selected"}</p>
                  </div>
                </div>
                <div className="p-4 rounded-lg border" style={{ borderColor: "var(--border)", background: "var(--secondary)" }}>
                  <p className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: "var(--muted-foreground)" }}>Signers ({signers.length})</p>
                  <div className="space-y-2">
                    {signers.map((s, i) => {
                      const rc = roleColor[s.role] ?? roleColor.CC
                      return (
                        <div key={s.id} className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0" style={{ background: "var(--primary)" }}>
                            {i + 1}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium" style={{ color: "var(--foreground)" }}>{s.name}</p>
                            <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>{s.email}</p>
                          </div>
                          <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ background: rc.bg, color: rc.color }}>{s.role}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
                <div className="p-4 rounded-lg border" style={{ borderColor: "var(--border)", background: "var(--secondary)" }}>
                  <p className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: "var(--muted-foreground)" }}>Message Settings</p>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span style={{ color: "var(--muted-foreground)" }}>Subject</span>
                      <span className="font-medium max-w-xs truncate" style={{ color: "var(--foreground)" }}>{emailSubject}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span style={{ color: "var(--muted-foreground)" }}>Expiry</span>
                      <span className="font-medium" style={{ color: "var(--foreground)" }}>{expiry || "No expiry set"}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span style={{ color: "var(--muted-foreground)" }}>Reminders</span>
                      <span className="font-medium" style={{ color: "var(--foreground)" }}>{reminder}</span>
                    </div>
                  </div>
                </div>
              </div>
              <button
                onClick={handleSend}
                className="w-full inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
                style={{ background: "var(--primary)" }}
              >
                <Send size={16} /> Send for Signature
              </button>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex items-center justify-between">
        <button
          onClick={() => setStep(s => Math.max(1, s - 1))}
          disabled={step === 1}
          className="inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium border disabled:opacity-40 hover:opacity-70 transition-opacity"
          style={{ borderColor: "var(--border)", color: "var(--foreground)", background: "var(--background)" }}
        >
          <ArrowLeft size={14} /> Back
        </button>
        {step < 5 && (
          <button
            onClick={() => setStep(s => Math.min(5, s + 1))}
            disabled={!canNext()}
            className="inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-white disabled:opacity-40 hover:opacity-90 transition-opacity"
            style={{ background: "var(--primary)" }}
          >
            Next <ArrowRight size={14} />
          </button>
        )}
      </div>
    </div>
  )
}
