"use client"

import React, { useState, use } from "react"
import Link from "next/link"
import { ArrowLeft, MapPin, Briefcase, Clock, DollarSign, ChevronRight, MoreHorizontal } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn, getInitials } from "@/lib/utils"

const TABS = ["Overview", "Candidates", "Pipeline", "Job Description", "Settings"]
const PIPELINE_STAGES = ["Applied", "Screening", "Interview", "Assessment", "Offer", "Hired", "Rejected"]

const JOB_DATA: Record<string, any> = {
  "JOB-001": {
    id: "JOB-001",
    title: "Senior Software Engineer",
    dept: "Engineering",
    location: "London (Hybrid)",
    type: "Full-time",
    salary: "£70,000 – £90,000",
    status: "Active",
    posted: "15 May 2026",
    deadline: "15 Jul 2026",
    manager: "James Park",
    description: "We are looking for a Senior Software Engineer to join our growing Engineering team. You will work on our core platform, building scalable services and mentoring junior engineers.",
    requirements: ["5+ years backend development (Node.js, Python, or Go)", "Experience with distributed systems and microservices", "Strong SQL and NoSQL database skills", "Experience with AWS or GCP", "Team leadership experience preferred"],
    salaryBand: "E3",
    interviewStages: ["Phone Screen (30 min)", "Technical Assessment", "Panel Interview (2h)", "Final Interview with CTO"],
    candidates: [
      { id: "C001", name: "James Liu",       source: "LinkedIn",    stage: "Interview",  date: "5 Jun 2026",  score: 82, email: "james.liu@email.com" },
      { id: "C002", name: "Elena Marchetti", source: "Referral",    stage: "Screening",  date: "8 Jun 2026",  score: 76, email: "elena.m@email.com" },
      { id: "C003", name: "Sven Bergström",  source: "Indeed",      stage: "Applied",    date: "9 Jun 2026",  score: 65, email: "sven.b@email.com" },
      { id: "C004", name: "Wei Zhang",       source: "LinkedIn",    stage: "Assessment", date: "7 Jun 2026",  score: 88, email: "wei.z@email.com" },
      { id: "C005", name: "Fatou Diallo",    source: "Agency",      stage: "Applied",    date: "10 Jun 2026", score: 71, email: "fatou.d@email.com" },
      { id: "C006", name: "Tomás Rivera",    source: "LinkedIn",    stage: "Screening",  date: "6 Jun 2026",  score: 79, email: "tomas.r@email.com" },
      { id: "C007", name: "Yuki Tanaka",     source: "Direct",      stage: "Applied",    date: "8 Jun 2026",  score: 68, email: "yuki.t@email.com" },
      { id: "C008", name: "Ingrid Larsen",   source: "LinkedIn",    stage: "Interview",  date: "4 Jun 2026",  score: 84, email: "ingrid.l@email.com" },
      { id: "C009", name: "Chukwu Eze",      source: "Indeed",      stage: "Rejected",   date: "2 Jun 2026",  score: 42, email: "chukwu.e@email.com" },
      { id: "C010", name: "Maria Kovacs",    source: "Referral",    stage: "Applied",    date: "10 Jun 2026", score: 73, email: "maria.k@email.com" },
      { id: "C011", name: "Ahmed Benali",    source: "LinkedIn",    stage: "Offer",      date: "1 Jun 2026",  score: 91, email: "ahmed.b@email.com" },
      { id: "C012", name: "Hana Müller",     source: "Agency",      stage: "Applied",    date: "9 Jun 2026",  score: 67, email: "hana.m@email.com" },
    ],
  },
}

const FALLBACK = JOB_DATA["JOB-001"]

const stageColor: Record<string, string> = {
  Applied:    "bg-[var(--muted)] text-[var(--muted-foreground)]",
  Screening:  "bg-[#06b6d4]/10 text-[#06b6d4]",
  Interview:  "bg-[var(--primary)]/10 text-[var(--primary)]",
  Assessment: "bg-[#8b5cf6]/10 text-[#8b5cf6]",
  Offer:      "bg-[#f59e0b]/10 text-[#f59e0b]",
  Hired:      "bg-[#10b981]/10 text-[#10b981]",
  Rejected:   "bg-[#ef4444]/10 text-[#ef4444]",
}

export default function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const job = JOB_DATA[id] || FALLBACK
  const [tab, setTab] = useState("Overview")

  const stageGroups = PIPELINE_STAGES.reduce((acc, stage) => {
    acc[stage] = job.candidates.filter((c: any) => c.stage === stage)
    return acc
  }, {} as Record<string, any[]>)

  return (
    <div className="p-6 space-y-5 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex items-start gap-4">
        <Link href="/app/people/hiring" className="mt-1 p-1.5 rounded-md border border-[var(--border)] hover:bg-[var(--muted)]">
          <ArrowLeft className="h-4 w-4 text-[var(--foreground)]" />
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-2xl font-bold text-[var(--foreground)]">{job.title}</h1>
            <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-[#10b981]/10 text-[#10b981]">{job.status}</span>
          </div>
          <div className="flex items-center gap-4 mt-1 flex-wrap">
            <span className="flex items-center gap-1 text-xs text-[var(--muted-foreground)]"><Briefcase className="h-3.5 w-3.5" />{job.dept}</span>
            <span className="flex items-center gap-1 text-xs text-[var(--muted-foreground)]"><MapPin className="h-3.5 w-3.5" />{job.location}</span>
            <span className="flex items-center gap-1 text-xs text-[var(--muted-foreground)]"><Clock className="h-3.5 w-3.5" />{job.type}</span>
            <span className="flex items-center gap-1 text-xs text-[var(--muted-foreground)]"><DollarSign className="h-3.5 w-3.5" />{job.salary}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-1.5 rounded-md border border-[var(--border)] px-3 py-2 text-sm hover:bg-[var(--muted)]">Edit</button>
          <button className="p-2 rounded-md border border-[var(--border)] hover:bg-[var(--muted)]">
            <MoreHorizontal className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Total Applications", value: job.candidates.length },
          { label: "In Pipeline",        value: job.candidates.filter((c: any) => !["Applied", "Rejected"].includes(c.stage)).length },
          { label: "Offers Extended",    value: job.candidates.filter((c: any) => c.stage === "Offer").length },
          { label: "Hired",              value: job.candidates.filter((c: any) => c.stage === "Hired").length },
        ].map(s => (
          <div key={s.label} className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-4">
            <p className="text-xs text-[var(--muted-foreground)]">{s.label}</p>
            <p className="text-2xl font-bold text-[var(--foreground)] mt-1">{s.value}</p>
          </div>
        ))}
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-5 space-y-4">
            <h3 className="font-semibold text-[var(--foreground)]">Job Details</h3>
            {[
              { label: "Hiring Manager", value: job.manager },
              { label: "Salary Band",    value: job.salaryBand },
              { label: "Salary Range",   value: job.salary },
              { label: "Posted",         value: job.posted },
              { label: "Deadline",       value: job.deadline },
              { label: "Job ID",         value: job.id },
            ].map(f => (
              <div key={f.label} className="flex items-center gap-3">
                <span className="w-36 text-xs text-[var(--muted-foreground)]">{f.label}</span>
                <span className="text-sm font-medium text-[var(--foreground)]">{f.value}</span>
              </div>
            ))}
          </div>
          <div className="space-y-5">
            <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-5">
              <h3 className="font-semibold text-[var(--foreground)] mb-3">Required Skills</h3>
              <ul className="space-y-1.5">
                {job.requirements.map((r: string, i: number) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-[var(--foreground)]">
                    <div className="mt-1.5 h-1.5 w-1.5 rounded-full shrink-0" style={{ background: "var(--primary)" }} />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-5">
              <h3 className="font-semibold text-[var(--foreground)] mb-3">Interview Stages</h3>
              <ol className="space-y-2">
                {job.interviewStages.map((s: string, i: number) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-[var(--foreground)]">
                    <span className="h-5 w-5 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0" style={{ background: "var(--primary)" }}>{i + 1}</span>
                    {s}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      )}

      {/* Candidates */}
      {tab === "Candidates" && (
        <div className="rounded-xl border border-[var(--border)] overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[var(--muted)] border-b border-[var(--border)]">
                {["Candidate", "Stage", "Application Date", "Source", "Score", "Actions"].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {job.candidates.map((c: any) => (
                <tr key={c.id} className="hover:bg-[var(--muted)] transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-7 w-7">
                        <AvatarFallback className="text-[10px] bg-[var(--primary)]/10 text-[var(--primary)]">{getInitials(c.name)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium text-[var(--foreground)]">{c.name}</p>
                        <p className="text-[10px] text-[var(--muted-foreground)]">{c.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={cn("inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium", stageColor[c.stage])}>{c.stage}</span>
                  </td>
                  <td className="px-4 py-3 text-xs text-[var(--muted-foreground)]">{c.date}</td>
                  <td className="px-4 py-3 text-xs text-[var(--muted-foreground)]">{c.source}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <div className="w-12 h-1.5 rounded-full bg-[var(--muted)] overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${c.score}%`, background: c.score >= 80 ? "#10b981" : c.score >= 60 ? "var(--primary)" : "#f59e0b" }} />
                      </div>
                      <span className="text-xs font-semibold text-[var(--foreground)]">{c.score}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button className="text-xs text-[var(--primary)] hover:underline">Move Stage</button>
                      <button className="text-xs text-[var(--muted-foreground)] hover:text-[var(--foreground)]">Schedule</button>
                      <button className="text-xs text-[#ef4444] hover:underline">Reject</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pipeline Kanban */}
      {tab === "Pipeline" && (
        <div className="overflow-x-auto pb-4">
          <div className="flex gap-4" style={{ minWidth: PIPELINE_STAGES.length * 200 }}>
            {PIPELINE_STAGES.map(stage => (
              <div key={stage} className="flex-1 min-w-[180px]">
                <div className="flex items-center justify-between mb-3">
                  <span className={cn("inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold", stageColor[stage])}>{stage}</span>
                  <span className="text-xs text-[var(--muted-foreground)]">{stageGroups[stage]?.length || 0}</span>
                </div>
                <div className="space-y-2">
                  {(stageGroups[stage] || []).map((c: any) => (
                    <div key={c.id} className="rounded-lg border border-[var(--border)] bg-[var(--background)] p-3 shadow-sm">
                      <p className="text-sm font-medium text-[var(--foreground)]">{c.name}</p>
                      <div className="flex items-center justify-between mt-1.5">
                        <span className="text-[10px] text-[var(--muted-foreground)]">{c.source}</span>
                        <span className="text-xs font-bold" style={{ color: c.score >= 80 ? "#10b981" : c.score >= 60 ? "var(--primary)" : "#f59e0b" }}>{c.score}</span>
                      </div>
                    </div>
                  ))}
                  {(stageGroups[stage] || []).length === 0 && (
                    <div className="rounded-lg border-2 border-dashed border-[var(--border)] p-3 text-center">
                      <p className="text-xs text-[var(--muted-foreground)]">Empty</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Job Description */}
      {tab === "Job Description" && (
        <div className="max-w-2xl rounded-xl border border-[var(--border)] bg-[var(--background)] p-6 space-y-4">
          <h3 className="font-semibold text-[var(--foreground)]">Job Description</h3>
          <p className="text-sm text-[var(--foreground)] leading-relaxed">{job.description}</p>
          <div>
            <h4 className="text-sm font-semibold text-[var(--foreground)] mb-2">Requirements</h4>
            <ul className="space-y-1.5">
              {job.requirements.map((r: string, i: number) => (
                <li key={i} className="flex items-start gap-2 text-sm text-[var(--foreground)]">
                  <div className="mt-1.5 h-1.5 w-1.5 rounded-full shrink-0" style={{ background: "var(--primary)" }} />
                  {r}
                </li>
              ))}
            </ul>
          </div>
          <button className="inline-flex items-center gap-1.5 rounded-md border border-[var(--border)] px-3 py-2 text-sm text-[var(--foreground)] hover:bg-[var(--muted)]">Edit Description</button>
        </div>
      )}

      {/* Settings */}
      {tab === "Settings" && (
        <div className="max-w-lg rounded-xl border border-[var(--border)] bg-[var(--background)] p-6 space-y-5">
          <h3 className="font-semibold text-[var(--foreground)]">Job Settings</h3>
          {[
            { label: "Application Deadline", value: job.deadline, type: "date" },
            { label: "Max Applications",     value: "100",         type: "text" },
          ].map(f => (
            <div key={f.label} className="space-y-1">
              <label className="text-sm font-medium text-[var(--foreground)]">{f.label}</label>
              <input defaultValue={f.value} className="w-full px-3 py-2 text-sm rounded-md border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]" />
            </div>
          ))}
          <div className="flex items-center gap-3 pt-2 border-t border-[var(--border)]">
            <button className="rounded-md px-4 py-2 text-sm font-medium text-white hover:opacity-90" style={{ background: "var(--primary)" }}>Save Changes</button>
            <button className="rounded-md border border-[#ef4444]/40 px-4 py-2 text-sm font-medium text-[#ef4444] hover:bg-[#ef4444]/5">Close Job</button>
          </div>
        </div>
      )}
    </div>
  )
}
