"use client"

import React, { useState, use } from "react"
import Link from "next/link"
import { ArrowLeft, CheckCircle, Edit } from "lucide-react"
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip
} from "recharts"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn, getInitials } from "@/lib/utils"

const TABS = ["Overview", "Self Assessment", "Manager Assessment", "Goals", "Feedback"]

const REVIEWS: Record<string, any> = {
  "RV-001": {
    id: "RV-001",
    employee: "Alex Thompson",
    dept: "Engineering",
    role: "Senior Engineer",
    reviewer: "James Park",
    period: "Q1 2026",
    status: "Completed",
    overallScore: 4.2,
    selfAssessment: [
      { competency: "Technical Skills",       selfScore: 4, managerScore: 5 },
      { competency: "Communication",          selfScore: 4, managerScore: 4 },
      { competency: "Teamwork",               selfScore: 5, managerScore: 4 },
      { competency: "Problem Solving",        selfScore: 4, managerScore: 4 },
      { competency: "Leadership",             selfScore: 3, managerScore: 4 },
      { competency: "Delivery",               selfScore: 4, managerScore: 4 },
    ],
    goals: [
      { goal: "Deliver API v2",             target: "Q1 2026",   actual: "Delivered Mar 2026",  status: "Achieved" },
      { goal: "Mentor 2 junior devs",       target: "Ongoing",   actual: "Mentoring 2 devs",    status: "Achieved" },
      { goal: "Complete AWS Cert",          target: "Mar 2026",  actual: "Passed Feb 2026",     status: "Achieved" },
      { goal: "Reduce bug rate by 20%",     target: "Q1 2026",   actual: "Reduced by 18%",      status: "Partial" },
    ],
    selfComment: "Strong quarter — shipped API v2 on time despite scope changes. Looking to take on more leadership responsibilities in H2.",
    managerComment: "Alex consistently delivers high-quality work. Leadership potential is clear — recommend for Tech Lead consideration in H2 2026.",
  },
  "RV-003": {
    id: "RV-003",
    employee: "Fatima Al-Zahra",
    dept: "Engineering",
    role: "DevOps Engineer",
    reviewer: "James Park",
    period: "Q2 2026",
    status: "In Progress",
    overallScore: null,
    selfAssessment: [
      { competency: "Technical Skills",       selfScore: 5, managerScore: null },
      { competency: "Communication",          selfScore: 4, managerScore: null },
      { competency: "Teamwork",               selfScore: 4, managerScore: null },
      { competency: "Problem Solving",        selfScore: 5, managerScore: null },
      { competency: "Leadership",             selfScore: 3, managerScore: null },
      { competency: "Delivery",               selfScore: 5, managerScore: null },
    ],
    goals: [
      { goal: "Zero-downtime deploy pipeline", target: "Jun 2026", actual: "95% complete", status: "On Track" },
      { goal: "Reduce MTTR by 30%",            target: "Q2 2026",  actual: "22% achieved", status: "At Risk" },
    ],
    selfComment: "Excellent progress on the deployment pipeline — we're nearly at zero-downtime capability.",
    managerComment: null,
  },
}

const FALLBACK = REVIEWS["RV-001"]

const statusStyle: Record<string, string> = {
  Draft:        "bg-[var(--muted)] text-[var(--muted-foreground)]",
  "In Progress":"bg-[var(--primary)]/10 text-[var(--primary)]",
  Completed:    "bg-[#10b981]/10 text-[#10b981]",
}

const goalStatusColor: Record<string, string> = {
  Achieved: "#10b981", "On Track": "#10b981", "At Risk": "#f59e0b", Partial: "#f59e0b", Missed: "#ef4444",
}

const scoreToLabel = (s: number) => {
  if (s >= 4.5) return "Exceptional"
  if (s >= 4.0) return "Exceeds Expectations"
  if (s >= 3.0) return "Meets Expectations"
  if (s >= 2.0) return "Needs Improvement"
  return "Unsatisfactory"
}

export default function PerformanceReviewDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const review = REVIEWS[id] || FALLBACK
  const [tab, setTab] = useState("Overview")

  const radarData = review.selfAssessment.map((c: any) => ({
    subject: c.competency.replace(" ", "\n"),
    self: c.selfScore,
    manager: c.managerScore,
  }))

  return (
    <div className="p-6 space-y-5 max-w-[1200px] mx-auto">
      {/* Header */}
      <div className="flex items-start gap-4">
        <Link href="/app/people/performance" className="mt-1 p-1.5 rounded-md border border-[var(--border)] hover:bg-[var(--muted)]">
          <ArrowLeft className="h-4 w-4 text-[var(--foreground)]" />
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-2xl font-bold text-[var(--foreground)]">Performance Review — {review.id}</h1>
            <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium", statusStyle[review.status])}>{review.status}</span>
          </div>
          <p className="text-sm text-[var(--muted-foreground)] mt-0.5">{review.period} · Reviewed by {review.reviewer}</p>
        </div>
        {review.status !== "Completed" && (
          <button className="inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium text-white hover:opacity-90" style={{ background: "var(--primary)" }}>
            <CheckCircle className="h-4 w-4" />Submit Review
          </button>
        )}
      </div>

      {/* Employee Card */}
      <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-5">
        <div className="flex items-center gap-4">
          <Avatar className="h-14 w-14">
            <AvatarFallback className="text-base bg-[var(--primary)]/10 text-[var(--primary)]">{getInitials(review.employee)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="font-semibold text-[var(--foreground)] text-lg">{review.employee}</h3>
            <p className="text-sm text-[var(--muted-foreground)]">{review.role} · {review.dept}</p>
          </div>
          {review.overallScore && (
            <div className="text-right">
              <p className="text-xs text-[var(--muted-foreground)]">Overall Score</p>
              <p className="text-3xl font-bold text-[var(--foreground)]">{review.overallScore}</p>
              <p className="text-xs" style={{ color: "#10b981" }}>{scoreToLabel(review.overallScore)}</p>
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 border-b border-[var(--border)]">
        {TABS.map(t => (
          <button key={t} onClick={() => setTab(t)} className={cn(
            "px-4 py-2.5 text-sm whitespace-nowrap border-b-2 transition-colors",
            tab === t ? "border-[var(--primary)] text-[var(--primary)] font-medium" : "border-transparent text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
          )}>{t}</button>
        ))}
      </div>

      {/* Overview */}
      {tab === "Overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-5">
            <h3 className="font-semibold text-[var(--foreground)] mb-4">Competency Scores</h3>
            <div className="space-y-3">
              {review.selfAssessment.map((c: any, i: number) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-[var(--foreground)]">{c.competency}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-[var(--muted-foreground)]">Self: <strong className="text-[var(--foreground)]">{c.selfScore}/5</strong></span>
                      {c.managerScore && <span className="text-xs text-[var(--muted-foreground)]">Mgr: <strong style={{ color: "var(--primary)" }}>{c.managerScore}/5</strong></span>}
                    </div>
                  </div>
                  <div className="h-1.5 rounded-full bg-[var(--muted)] overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${(c.selfScore / 5) * 100}%`, background: "var(--primary)" }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-5 flex flex-col">
            <h3 className="font-semibold text-[var(--foreground)] mb-4">Radar Chart</h3>
            <ResponsiveContainer width="100%" height={260}>
              <RadarChart data={radarData} margin={{ top: 10, right: 20, bottom: 10, left: 20 }}>
                <PolarGrid stroke="var(--border)" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} />
                <Tooltip contentStyle={{ background: "var(--background)", border: "1px solid var(--border)", borderRadius: "6px", fontSize: 12 }} />
                <Radar name="Self" dataKey="self" stroke="var(--primary)" fill="var(--primary)" fillOpacity={0.2} />
                {review.selfAssessment[0]?.managerScore && (
                  <Radar name="Manager" dataKey="manager" stroke="#10b981" fill="#10b981" fillOpacity={0.2} />
                )}
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Self Assessment */}
      {tab === "Self Assessment" && (
        <div className="space-y-5">
          <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-5">
            <h3 className="font-semibold text-[var(--foreground)] mb-4">Self Ratings</h3>
            <div className="space-y-4">
              {review.selfAssessment.map((c: any, i: number) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-sm text-[var(--foreground)]">{c.competency}</span>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map(n => (
                      <div key={n} className={cn("h-6 w-6 rounded flex items-center justify-center text-xs font-bold", n <= c.selfScore ? "text-white" : "border border-[var(--border)] text-[var(--muted-foreground)]")} style={n <= c.selfScore ? { background: "var(--primary)" } : {}}>{n}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-5">
            <h3 className="font-semibold text-[var(--foreground)] mb-2">Self Comment</h3>
            <p className="text-sm text-[var(--foreground)] leading-relaxed">{review.selfComment}</p>
          </div>
        </div>
      )}

      {/* Manager Assessment */}
      {tab === "Manager Assessment" && (
        <div className="space-y-5">
          {review.managerComment ? (
            <>
              <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-5">
                <h3 className="font-semibold text-[var(--foreground)] mb-4">Manager Ratings</h3>
                <div className="space-y-4">
                  {review.selfAssessment.map((c: any, i: number) => (
                    c.managerScore && (
                      <div key={i} className="flex items-center justify-between">
                        <span className="text-sm text-[var(--foreground)]">{c.competency}</span>
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map(n => (
                            <div key={n} className={cn("h-6 w-6 rounded flex items-center justify-center text-xs font-bold", n <= c.managerScore ? "text-white" : "border border-[var(--border)] text-[var(--muted-foreground)]")} style={n <= c.managerScore ? { background: "#10b981" } : {}}>{n}</div>
                          ))}
                        </div>
                      </div>
                    )
                  ))}
                </div>
              </div>
              <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-5">
                <h3 className="font-semibold text-[var(--foreground)] mb-2">Manager Comment</h3>
                <p className="text-sm text-[var(--foreground)] leading-relaxed">{review.managerComment}</p>
              </div>
            </>
          ) : (
            <div className="rounded-xl border-2 border-dashed border-[var(--border)] p-10 text-center">
              <p className="text-sm text-[var(--muted-foreground)]">Manager assessment not yet completed</p>
              <button className="mt-3 inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium text-white hover:opacity-90" style={{ background: "var(--primary)" }}>
                <Edit className="h-4 w-4" />Start Assessment
              </button>
            </div>
          )}
        </div>
      )}

      {/* Goals */}
      {tab === "Goals" && (
        <div className="rounded-xl border border-[var(--border)] overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[var(--muted)] border-b border-[var(--border)]">
                {["Goal", "Target", "Actual", "Status"].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {review.goals.map((g: any, i: number) => (
                <tr key={i} className="hover:bg-[var(--muted)] transition-colors">
                  <td className="px-4 py-3 font-medium text-[var(--foreground)]">{g.goal}</td>
                  <td className="px-4 py-3 text-xs text-[var(--muted-foreground)]">{g.target}</td>
                  <td className="px-4 py-3 text-xs text-[var(--muted-foreground)]">{g.actual}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium" style={{ background: `${goalStatusColor[g.status]}18`, color: goalStatusColor[g.status] }}>{g.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Feedback */}
      {tab === "Feedback" && (
        <div className="max-w-xl space-y-4">
          <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-5">
            <h3 className="font-semibold text-[var(--foreground)] mb-2">Upward Feedback</h3>
            <p className="text-sm text-[var(--muted-foreground)]">No upward feedback collected for this cycle.</p>
          </div>
          <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-5">
            <h3 className="font-semibold text-[var(--foreground)] mb-3">360 Peer Feedback</h3>
            {[
              { from: "Lena Cruz",    comment: "Great technical partner — always willing to review PRs and share knowledge." },
              { from: "Ravi Patel",   comment: "Alex's documentation improvements made the codebase much easier to navigate." },
            ].map((f, i) => (
              <div key={i} className="mb-3 last:mb-0">
                <p className="text-xs font-semibold text-[var(--foreground)]">{f.from}</p>
                <p className="text-sm text-[var(--muted-foreground)] mt-0.5">{f.comment}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
