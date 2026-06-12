"use client"

import React, { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Paperclip, X, Ticket } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const AGENTS   = ["Priya Mehta", "James Hartley", "Sara Collins", "Tom Okafor", "Ellie Brooks"]
const QUEUES   = ["General", "Technical", "Enterprise", "Billing"]
const PRIORITIES = ["Low", "Medium", "High", "Critical"]
const CUSTOMERS = [
  "DataVault Ltd", "Fintech Corp Ltd", "BlueWave Digital", "Prism Analytics",
  "Vertex Solutions", "Sandstone Corp", "TechGrid Ltd", "NovaBuild Group",
  "Crestview Labs", "Hartfield & Co", "Noah Simmons", "Emily Watts", "Marcus Allen",
]

export default function NewTicketPage() {
  const [subject, setSubject]     = useState("")
  const [customer, setCustomer]   = useState("")
  const [description, setDesc]    = useState("")
  const [priority, setPriority]   = useState("Medium")
  const [queue, setQueue]         = useState("General")
  const [agent, setAgent]         = useState("")
  const [tags, setTags]           = useState("")
  const [files, setFiles]         = useState<string[]>([])
  const [submitted, setSubmitted] = useState(false)

  if (submitted) {
    return (
      <div className="p-6 max-w-xl mx-auto text-center mt-16">
        <div className="h-16 w-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
          <Ticket className="h-8 w-8 text-emerald-600" />
        </div>
        <h2 className="text-xl font-bold text-[var(--foreground)]">Ticket Created</h2>
        <p className="text-sm text-[var(--muted-foreground)] mt-1">Your ticket has been submitted and assigned to the queue.</p>
        <div className="flex items-center justify-center gap-3 mt-6">
          <Link href="/app/service/tickets"
            className="inline-flex items-center gap-2 rounded-md border border-[var(--border)] px-4 py-2 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--secondary)]">
            View All Tickets
          </Link>
          <button onClick={() => setSubmitted(false)}
            className="inline-flex items-center gap-2 rounded-md bg-[var(--primary)] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
            Create Another
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link href="/app/service/tickets"
          className="inline-flex items-center gap-1.5 text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)]">
          <ArrowLeft className="h-4 w-4" /> All Tickets
        </Link>
      </div>
      <div>
        <h1 className="text-2xl font-bold text-[var(--foreground)]">Create Ticket</h1>
        <p className="text-sm text-[var(--muted-foreground)] mt-0.5">Submit a new support ticket</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Main Form */}
        <Card className="border border-[var(--border)] lg:col-span-2">
          <CardContent className="p-5 space-y-4">
            {/* Subject */}
            <div>
              <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">Subject <span className="text-red-500">*</span></label>
              <input value={subject} onChange={e => setSubject(e.target.value)}
                placeholder="Brief description of the issue"
                className="w-full px-3 py-2 text-sm border border-[var(--border)] rounded-md bg-[var(--background)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30" />
            </div>

            {/* Customer */}
            <div>
              <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">Customer <span className="text-red-500">*</span></label>
              <input
                value={customer}
                onChange={e => setCustomer(e.target.value)}
                list="customer-list"
                placeholder="Search or enter customer name"
                className="w-full px-3 py-2 text-sm border border-[var(--border)] rounded-md bg-[var(--background)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30"
              />
              <datalist id="customer-list">
                {CUSTOMERS.map(c => <option key={c} value={c} />)}
              </datalist>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">Description</label>
              <textarea value={description} onChange={e => setDesc(e.target.value)}
                rows={6}
                placeholder="Describe the issue in detail. Include steps to reproduce, error messages, and any relevant context…"
                className="w-full px-3 py-2 text-sm border border-[var(--border)] rounded-md bg-[var(--background)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30 resize-none" />
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">Tags</label>
              <input value={tags} onChange={e => setTags(e.target.value)}
                placeholder="e.g. billing, api, login  (comma separated)"
                className="w-full px-3 py-2 text-sm border border-[var(--border)] rounded-md bg-[var(--background)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30" />
            </div>

            {/* Attachments */}
            <div>
              <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">Attachments</label>
              <label className="flex items-center gap-2 cursor-pointer w-fit">
                <div className="inline-flex items-center gap-2 rounded-md border border-[var(--border)] px-3 py-2 text-sm text-[var(--foreground)] hover:bg-[var(--secondary)]">
                  <Paperclip className="h-4 w-4" /> Attach files
                </div>
              </label>
              {files.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {files.map(f => (
                    <span key={f} className="inline-flex items-center gap-1.5 rounded-full bg-[var(--muted)] px-3 py-1 text-xs text-[var(--foreground)]">
                      {f} <button onClick={() => setFiles(p => p.filter(x => x !== f))}><X className="h-3 w-3" /></button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Sidebar Options */}
        <div className="space-y-4">
          <Card className="border border-[var(--border)]">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold">Ticket Details</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0 space-y-3">
              <div>
                <label className="block text-xs font-medium text-[var(--muted-foreground)] mb-1">Priority</label>
                <select value={priority} onChange={e => setPriority(e.target.value)}
                  className="w-full border border-[var(--border)] rounded-md px-3 py-2 text-sm bg-[var(--background)] text-[var(--foreground)] focus:outline-none">
                  {PRIORITIES.map(p => <option key={p}>{p}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-[var(--muted-foreground)] mb-1">Queue</label>
                <select value={queue} onChange={e => setQueue(e.target.value)}
                  className="w-full border border-[var(--border)] rounded-md px-3 py-2 text-sm bg-[var(--background)] text-[var(--foreground)] focus:outline-none">
                  {QUEUES.map(q => <option key={q}>{q}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-[var(--muted-foreground)] mb-1">Assigned Agent</label>
                <select value={agent} onChange={e => setAgent(e.target.value)}
                  className="w-full border border-[var(--border)] rounded-md px-3 py-2 text-sm bg-[var(--background)] text-[var(--foreground)] focus:outline-none">
                  <option value="">Unassigned</option>
                  {AGENTS.map(a => <option key={a}>{a}</option>)}
                </select>
              </div>
            </CardContent>
          </Card>

          <button
            onClick={() => subject && customer ? setSubmitted(true) : null}
            disabled={!subject || !customer}
            className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-[var(--primary)] px-4 py-2.5 text-sm font-medium text-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Ticket className="h-4 w-4" /> Create Ticket
          </button>
          <Link href="/app/service/tickets"
            className="w-full inline-flex items-center justify-center gap-2 rounded-md border border-[var(--border)] px-4 py-2.5 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--secondary)]">
            Cancel
          </Link>
        </div>
      </div>
    </div>
  )
}
