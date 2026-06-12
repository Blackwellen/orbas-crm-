"use client"

import React, { use, useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import {
  ArrowLeft, ThumbsUp, ThumbsDown, Eye, Edit2, Globe, BookOpen,
  Clock, User, ChevronRight, MessageSquare, History, Link2, FileText
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const ARTICLES: Record<string, {
  id: string; title: string; category: string; categoryPath: string[];
  views: number; helpful: number; unhelpful: number;
  author: string; authorAvatar: string; updated: string; created: string;
  status: string; readTime: string;
  content: string[];
  feedback: Array<{ author: string; comment: string; rating: "helpful" | "unhelpful"; date: string }>
  related: Array<{ id: string; title: string; views: number }>
  revisions: Array<{ version: string; author: string; date: string; summary: string }>
}> = {
  "1001": {
    id: "1001",
    title: "How to reset your two-factor authentication",
    category: "Getting Started",
    categoryPath: ["Help Center", "Getting Started"],
    views: 4821, helpful: 94, unhelpful: 6,
    author: "Priya Mehta", authorAvatar: "PM",
    updated: "9 Jun 2026", created: "12 Jan 2026",
    status: "Published", readTime: "3 min read",
    content: [
      "Two-factor authentication (2FA) adds an extra layer of security to your account. If you've lost access to your authenticator app or received a new phone, you'll need to reset your 2FA settings.",
      "**Before You Begin**",
      "Make sure you have access to your registered email address. You'll need it to verify your identity during the reset process. If you no longer have access to that email, please contact our support team directly.",
      "**Step 1: Go to Account Security Settings**",
      "Log in to your account using your password only (skip the 2FA prompt by clicking 'I can't access my authenticator'). Navigate to Settings → Security → Two-Factor Authentication.",
      "**Step 2: Initiate the Reset**",
      "Click the 'Reset 2FA' button. You'll be sent a verification code to your registered email address. This code expires in 15 minutes.",
      "**Step 3: Verify Your Identity**",
      "Enter the 6-digit code from your email. If you don't receive the email within 2 minutes, check your spam folder or click 'Resend code'.",
      "**Step 4: Set Up New Authenticator**",
      "Once verified, you'll be presented with a new QR code. Scan this with your authenticator app (Google Authenticator, Authy, or any TOTP-compatible app). Enter the 6-digit code shown in your app to confirm the new setup.",
      "**Troubleshooting**",
      "If you encounter 'Authentication token invalid' after the reset, this may indicate a session sync issue. Clear your browser cache, log out completely, and try again. If the problem persists, contact support with your ticket reference.",
    ],
    feedback: [
      { author: "Jordan Clarke", comment: "Worked perfectly, very clear steps!", rating: "helpful", date: "10 Jun 2026" },
      { author: "Emma Watts", comment: "Step 3 needs more detail about the QR code scanning.", rating: "unhelpful", date: "8 Jun 2026" },
      { author: "Liam Foster", comment: "Solved my issue in under 5 minutes.", rating: "helpful", date: "7 Jun 2026" },
    ],
    related: [
      { id: "1002", title: "Setting up SSO with SAML 2.0", views: 3104 },
      { id: "1012", title: "How to invite team members", views: 876 },
      { id: "1006", title: "How to export your data to CSV", views: 1762 },
    ],
    revisions: [
      { version: "v3", author: "Priya Mehta", date: "9 Jun 2026", summary: "Updated Step 4 with Authy instructions" },
      { version: "v2", author: "James Hartley", date: "15 Mar 2026", summary: "Added troubleshooting section" },
      { version: "v1", author: "Sara Collins", date: "12 Jan 2026", summary: "Initial publish" },
    ],
  },
}

const TABS = [
  { key: "article",  label: "Article",          icon: FileText },
  { key: "feedback", label: "Feedback",          icon: MessageSquare },
  { key: "related",  label: "Related Articles",  icon: Link2 },
  { key: "revisions",label: "Revisions",         icon: History },
]

const statusColor: Record<string, { color: string; bg: string }> = {
  "Published":    { color: "#16a34a", bg: "#f0fdf4" },
  "Draft":        { color: "#d97706", bg: "#fffbeb" },
  "Under Review": { color: "#1a56db", bg: "#eff6ff" },
}

export default function KBArticleDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const searchParams = useSearchParams()
  const tab = searchParams.get("tab") || "article"

  const article = ARTICLES[id] ?? ARTICLES["1001"]
  const [status, setStatus] = useState(article.status)
  const [helpful, setHelpful] = useState<null | "yes" | "no">(null)
  const sc = statusColor[status]

  function setTab(t: string) {
    router.push(`/app/service/knowledge-base/${id}?tab=${t}`, { scroll: false })
  }

  return (
    <div className="p-6 max-w-[1400px] mx-auto space-y-5">
      {/* Back + Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[var(--muted-foreground)]">
        <Link href="/app/service/knowledge-base"
          className="inline-flex items-center gap-1.5 hover:text-[var(--foreground)]">
          <ArrowLeft className="h-4 w-4" /> Knowledge Base
        </Link>
        {article.categoryPath.map((c, i) => (
          <React.Fragment key={i}>
            <ChevronRight className="h-3.5 w-3.5" />
            <span>{c}</span>
          </React.Fragment>
        ))}
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-[var(--foreground)] font-medium truncate max-w-xs">{article.title}</span>
      </div>

      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium"
              style={{ color: sc.color, background: sc.bg }}>
              {status}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-[var(--secondary)] px-2 py-0.5 text-xs text-[var(--muted-foreground)]">
              <BookOpen className="h-3 w-3" /> {article.category}
            </span>
            <span className="text-xs text-[var(--muted-foreground)]">{article.readTime}</span>
          </div>
          <h1 className="text-2xl font-bold text-[var(--foreground)]">{article.title}</h1>
          <div className="flex items-center gap-4 text-xs text-[var(--muted-foreground)]">
            <span className="flex items-center gap-1"><User className="h-3 w-3" /> {article.author}</span>
            <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> Updated {article.updated}</span>
            <span className="flex items-center gap-1"><Eye className="h-3 w-3" /> {article.views.toLocaleString()} views</span>
            <span className="flex items-center gap-1" style={{ color: "#16a34a" }}>
              <ThumbsUp className="h-3 w-3" /> {article.helpful}% helpful
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setStatus(status === "Published" ? "Draft" : "Published")}
            className="inline-flex items-center gap-1.5 rounded-md border border-[var(--border)] px-3 py-1.5 text-xs font-medium text-[var(--foreground)] hover:bg-[var(--secondary)]"
          >
            <Globe className="h-3.5 w-3.5" />
            {status === "Published" ? "Unpublish" : "Publish"}
          </button>
          <button
            className="inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium text-white hover:opacity-90"
            style={{ background: "var(--primary)" }}
          >
            <Edit2 className="h-3.5 w-3.5" /> Edit Article
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-[var(--border)]">
        <div className="flex gap-1">
          {TABS.map(t => (
            <button key={t.key} onClick={() => setTab(t.key)}
              className={`inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
                tab === t.key
                  ? "border-[var(--primary)] text-[var(--primary)]"
                  : "border-transparent text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
              }`}>
              <t.icon className="h-3.5 w-3.5" />
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Article Tab */}
      {tab === "article" && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 space-y-4">
            <Card className="border border-[var(--border)]">
              <CardContent className="p-6 space-y-4">
                {article.content.map((para, i) => {
                  if (para.startsWith("**") && para.endsWith("**")) {
                    return <h3 key={i} className="text-base font-semibold text-[var(--foreground)] mt-2">{para.replace(/\*\*/g, "")}</h3>
                  }
                  return <p key={i} className="text-sm text-[var(--foreground)] leading-relaxed">{para}</p>
                })}
              </CardContent>
            </Card>

            {/* Helpful widget */}
            <Card className="border border-[var(--border)]">
              <CardContent className="p-5 flex flex-col items-center gap-3 text-center">
                <p className="text-sm font-medium text-[var(--foreground)]">Was this article helpful?</p>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setHelpful("yes")}
                    className={`inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium transition-colors ${
                      helpful === "yes"
                        ? "border-[#16a34a] text-white"
                        : "border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--secondary)]"
                    }`}
                    style={helpful === "yes" ? { background: "#16a34a" } : {}}
                  >
                    <ThumbsUp className="h-4 w-4" /> Yes, helpful
                  </button>
                  <button
                    onClick={() => setHelpful("no")}
                    className={`inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium transition-colors ${
                      helpful === "no"
                        ? "border-[#dc2626] text-white"
                        : "border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--secondary)]"
                    }`}
                    style={helpful === "no" ? { background: "#dc2626" } : {}}
                  >
                    <ThumbsDown className="h-4 w-4" /> No, not helpful
                  </button>
                </div>
                {helpful && (
                  <p className="text-xs text-[var(--muted-foreground)]">
                    {helpful === "yes" ? "Thank you for your feedback!" : "We'll work on improving this article."}
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <Card className="border border-[var(--border)]">
              <CardContent className="p-4 space-y-3">
                <h3 className="text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wide">Article Info</h3>
                {[
                  { label: "Author",   value: article.author },
                  { label: "Category", value: article.category },
                  { label: "Created",  value: article.created },
                  { label: "Updated",  value: article.updated },
                  { label: "Views",    value: article.views.toLocaleString() },
                ].map(f => (
                  <div key={f.label}>
                    <p className="text-xs text-[var(--muted-foreground)]">{f.label}</p>
                    <p className="text-sm font-medium text-[var(--foreground)]">{f.value}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card className="border border-[var(--border)]">
              <CardContent className="p-4 space-y-2">
                <h3 className="text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wide">Helpfulness</h3>
                <div className="flex items-center gap-2">
                  <div className="flex-1 rounded-full overflow-hidden" style={{ background: "var(--secondary)", height: 8 }}>
                    <div className="h-full rounded-full" style={{ width: `${article.helpful}%`, background: "#16a34a" }} />
                  </div>
                  <span className="text-xs font-semibold text-[var(--foreground)]">{article.helpful}%</span>
                </div>
                <p className="text-xs text-[var(--muted-foreground)]">{article.helpful} helpful · {article.unhelpful} not helpful</p>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Feedback Tab */}
      {tab === "feedback" && (
        <div className="space-y-3 max-w-2xl">
          {article.feedback.map((f, i) => (
            <Card key={i} className="border border-[var(--border)]">
              <CardContent className="p-4 flex items-start gap-3">
                <Avatar className="h-8 w-8 shrink-0">
                  <AvatarFallback className="text-xs" style={{ background: "var(--primary)", color: "white" }}>
                    {f.author.split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-[var(--foreground)]">{f.author}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-[var(--muted-foreground)]">{f.date}</span>
                      {f.rating === "helpful"
                        ? <ThumbsUp className="h-3.5 w-3.5" style={{ color: "#16a34a" }} />
                        : <ThumbsDown className="h-3.5 w-3.5" style={{ color: "#dc2626" }} />}
                    </div>
                  </div>
                  <p className="text-sm text-[var(--muted-foreground)]">{f.comment}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Related Tab */}
      {tab === "related" && (
        <div className="space-y-3 max-w-2xl">
          {article.related.map(r => (
            <Link key={r.id} href={`/app/service/knowledge-base/${r.id}`}>
              <Card className="border border-[var(--border)] hover:border-[var(--primary)] transition-colors cursor-pointer">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <BookOpen className="h-4 w-4 text-[var(--muted-foreground)]" />
                    <span className="text-sm font-medium text-[var(--foreground)]">{r.title}</span>
                  </div>
                  <span className="text-xs text-[var(--muted-foreground)] flex items-center gap-1">
                    <Eye className="h-3 w-3" /> {r.views.toLocaleString()}
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}

      {/* Revisions Tab */}
      {tab === "revisions" && (
        <div className="space-y-3 max-w-2xl">
          {article.revisions.map((rev, i) => (
            <Card key={i} className="border border-[var(--border)]">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-start gap-3">
                  <div className="h-2 w-2 rounded-full mt-2 shrink-0" style={{ background: "var(--primary)" }} />
                  <div>
                    <p className="text-sm font-medium text-[var(--foreground)]">{rev.summary}</p>
                    <p className="text-xs text-[var(--muted-foreground)] mt-0.5">
                      {rev.author} · {rev.date}
                    </p>
                  </div>
                </div>
                <span className="text-xs font-mono text-[var(--muted-foreground)] border border-[var(--border)] rounded px-1.5 py-0.5">
                  {rev.version}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
