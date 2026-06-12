"use client"

import React, { useState } from "react"
import { Mail, Search, Star, Paperclip, Reply, Archive, Trash2, Tag, Inbox } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"

const EMAILS = [
  { id: 1, from: "Jordan Clarke", email: "jordan@datavault.io", subject: "Cannot access admin dashboard after 2FA reset", preview: "Hi, after resetting my 2FA device I'm completely locked out...", time: "09:14", unread: true, starred: false, hasAttachment: false, tag: "Support" },
  { id: 2, from: "Sophia Lewis", email: "sophia@metascale.io", subject: "Upgrade plan to Enterprise tier", preview: "We need to upgrade our plan to support more API calls per minute...", time: "08:54", unread: true, starred: true, hasAttachment: true, tag: "Sales" },
  { id: 3, from: "Liam Foster", email: "liam@fostertech.io", subject: "RE: Integration with Salesforce", preview: "Thanks for the detailed walkthrough! One more question about...", time: "08:30", unread: false, starred: false, hasAttachment: false, tag: "Support" },
  { id: 4, from: "Ava Thompson", email: "ava@brightpulse.io", subject: "Invoice #INV-2041 query", preview: "Could you clarify the line item on page 2 of our latest invoice?", time: "Yesterday", unread: false, starred: true, hasAttachment: true, tag: "Billing" },
  { id: 5, from: "Noah Kim", email: "noah@venturestack.io", subject: "Webhook setup assistance", preview: "We're trying to configure webhooks for our CI/CD pipeline...", time: "Yesterday", unread: false, starred: false, hasAttachment: false, tag: "Support" },
  { id: 6, from: "Mia Nguyen", email: "mia@apex.io", subject: "Performance issues since latest update", preview: "Since the v2.4 update last night, our dashboards are loading...", time: "2 Jun", unread: false, starred: false, hasAttachment: true, tag: "Support" },
]

const EMAIL_BODY = `Hi Orbas Support Team,

I'm reaching out because I'm unable to access my admin dashboard following a 2FA reset I performed earlier today at approximately 09:00 GMT.

The issue started immediately after the reset was completed. When I try to log in, I'm presented with a 2FA prompt as expected, but when I enter the code from my authenticator app, I receive the error: "Authentication token invalid".

Steps I've already tried:
1. Cleared browser cache and cookies
2. Tried in incognito mode
3. Tried both Chrome and Firefox
4. Verified the time on my device is synced correctly

This is blocking our entire IT team from accessing the admin configuration panel. We currently have 3 pending user account setups that need to be completed today.

Could you please escalate this urgently?

Best regards,
Jordan Clarke
IT Manager — DataVault Ltd`

const tagColor: Record<string, { color: string; bg: string }> = {
  Support: { color: "#1a56db", bg: "#eff6ff" },
  Sales:   { color: "#16a34a", bg: "#f0fdf4" },
  Billing: { color: "#d97706", bg: "#fffbeb" },
}

export default function EmailPage() {
  const [selected, setSelected] = useState(EMAILS[0])
  const [search, setSearch] = useState("")

  const filtered = EMAILS.filter(e =>
    e.from.toLowerCase().includes(search.toLowerCase()) ||
    e.subject.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Left Panel */}
      <div className="w-80 shrink-0 border-r border-[var(--border)] flex flex-col overflow-hidden">
        <div className="p-3 border-b border-[var(--border)]">
          <div className="flex items-center gap-2 mb-2">
            <Mail className="h-4 w-4 text-[var(--muted-foreground)]" />
            <span className="text-sm font-semibold text-[var(--foreground)]">Email Inbox</span>
            <span className="ml-auto text-xs font-bold rounded-full px-1.5 py-0.5 text-white" style={{ background: "var(--primary)" }}>
              {EMAILS.filter(e => e.unread).length}
            </span>
          </div>
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[var(--muted-foreground)]" />
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search emails..."
              className="w-full pl-8 pr-3 py-1.5 text-xs border border-[var(--border)] rounded-md bg-[var(--secondary)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none" />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-[var(--border)]">
          {filtered.map(email => {
            const tc = tagColor[email.tag] ?? tagColor.Support
            return (
              <button key={email.id} onClick={() => setSelected(email)}
                className={`w-full text-left p-3 hover:bg-[var(--secondary)] transition-colors ${selected.id === email.id ? "bg-[var(--secondary)]" : ""}`}>
                <div className="flex items-start gap-2.5">
                  <div className={`h-2 w-2 rounded-full mt-2 shrink-0 ${email.unread ? "" : "opacity-0"}`} style={{ background: "var(--primary)" }} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className={`text-xs truncate ${email.unread ? "font-bold text-[var(--foreground)]" : "text-[var(--foreground)]"}`}>{email.from}</span>
                      <div className="flex items-center gap-1 shrink-0">
                        {email.starred && <Star className="h-3 w-3 fill-current" style={{ color: "#d97706" }} />}
                        {email.hasAttachment && <Paperclip className="h-3 w-3 text-[var(--muted-foreground)]" />}
                        <span className="text-[10px] text-[var(--muted-foreground)]">{email.time}</span>
                      </div>
                    </div>
                    <p className={`text-xs truncate mb-0.5 ${email.unread ? "font-semibold text-[var(--foreground)]" : "text-[var(--foreground)]"}`}>{email.subject}</p>
                    <p className="text-[11px] text-[var(--muted-foreground)] line-clamp-1">{email.preview}</p>
                    <div className="mt-1">
                      <span className="inline-flex items-center rounded-full px-1.5 py-0.5 text-[10px] font-medium"
                        style={{ color: tc.color, background: tc.bg }}>
                        {email.tag}
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Right Panel — Email Detail */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Actions */}
        <div className="flex items-center gap-2 px-5 py-3 border-b border-[var(--border)] shrink-0">
          <button className="inline-flex items-center gap-1.5 rounded-md border border-[var(--border)] px-3 py-1.5 text-xs font-medium text-[var(--foreground)] hover:bg-[var(--secondary)]">
            <Reply className="h-3.5 w-3.5" /> Reply
          </button>
          <button className="inline-flex items-center gap-1.5 rounded-md border border-[var(--border)] px-3 py-1.5 text-xs font-medium text-[var(--foreground)] hover:bg-[var(--secondary)]">
            <Archive className="h-3.5 w-3.5" /> Archive
          </button>
          <button className="inline-flex items-center gap-1.5 rounded-md border border-[var(--border)] px-3 py-1.5 text-xs font-medium text-[var(--foreground)] hover:bg-[var(--secondary)]">
            <Tag className="h-3.5 w-3.5" /> Label
          </button>
          <button className="p-1.5 rounded-md text-[var(--muted-foreground)] hover:text-[#dc2626] hover:bg-[var(--secondary)]">
            <Trash2 className="h-4 w-4" />
          </button>
          <button className="inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium text-white ml-auto" style={{ background: "var(--primary)" }}>
            Convert to Ticket
          </button>
        </div>

        {/* Email Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <h2 className="text-lg font-bold text-[var(--foreground)] mb-3">{selected.subject}</h2>
          <div className="flex items-start gap-3 mb-4">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="text-xs" style={{ background: "var(--primary)", color: "white" }}>
                {selected.from.split(" ").map(n => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-semibold text-[var(--foreground)]">{selected.from}</p>
              <p className="text-xs text-[var(--muted-foreground)]">{selected.email} · {selected.time}</p>
            </div>
          </div>
          <div className="prose prose-sm max-w-none">
            {EMAIL_BODY.split("\n\n").map((para, i) => (
              <div key={i} className="mb-4">
                {para.startsWith("Steps") ? (
                  <div>
                    <p className="text-sm text-[var(--foreground)] mb-2">{para.split("\n")[0]}</p>
                    {para.split("\n").slice(1).map((step, j) => (
                      <p key={j} className="text-sm text-[var(--foreground)] ml-4">{step}</p>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-[var(--foreground)] leading-relaxed whitespace-pre-line">{para}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Quick Reply */}
        <div className="p-4 border-t border-[var(--border)] shrink-0">
          <textarea rows={3} placeholder="Quick reply..."
            className="w-full px-3 py-2 text-sm border border-[var(--border)] rounded-xl bg-[var(--secondary)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30 resize-none" />
          <div className="flex justify-end mt-2">
            <button className="inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-white" style={{ background: "var(--primary)" }}>
              <Reply className="h-3.5 w-3.5" /> Send Reply
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
