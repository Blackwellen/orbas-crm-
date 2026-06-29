"use client"

import React, { useState, use } from "react"
import Link from "next/link"
import { useSearchParams, useRouter } from "next/navigation"
import {
  ArrowLeft, Edit, MoreHorizontal, Mail, Phone, MapPin, Calendar,
  Briefcase, FileText, Clock, DollarSign, Target, Activity, MessageSquare,
  Upload, CheckCircle, AlertCircle, Download
} from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { cn, getInitials, formatDate } from "@/lib/utils"

const MEMBER = {
  id: "1",
  name: "Alex Thompson",
  role: "Senior Engineer",
  department: "Engineering",
  type: "Employee",
  status: "Active",
  startDate: "2023-03-01",
  location: "London",
  manager: "James Park",
  email: "alex.thompson@orbas.co.uk",
  phone: "+44 7700 900123",
  address: "12 Baker Street, London, W1U 3BW",
  dob: "1990-05-12",
  niNumber: "AB123456C",
  emergencyContact: { name: "Laura Thompson", relation: "Spouse", phone: "+44 7700 900456" },
  payrollId: "EMP-0041",
  taxCode: "1257L",
  salary: 72000,
  salaryBand: "E3",
  contractType: "Permanent",
  employmentType: "Full-time",
}

const TABS = [
  { key: "overview",    label: "Overview",    icon: Activity },
  { key: "employment",  label: "Employment",  icon: Briefcase },
  { key: "documents",   label: "Documents",   icon: FileText },
  { key: "time",        label: "Time & Leave",icon: Clock },
  { key: "payroll",     label: "Payroll",     icon: DollarSign },
  { key: "performance", label: "Performance", icon: Target },
  { key: "activity",    label: "Activity",    icon: Activity },
  { key: "notes",       label: "Notes",       icon: MessageSquare },
]

const documents = [
  { name: "Passport (Right to Work)", type: "ID", expiry: "2029-03-15", status: "Verified",   daysLeft: 1008 },
  { name: "Employment Contract",      type: "Contract", expiry: null,       status: "Signed",     daysLeft: null },
  { name: "DBS Certificate",          type: "Compliance", expiry: "2026-08-01", status: "Verified", daysLeft: 52 },
  { name: "NDA Agreement",            type: "Legal",    expiry: null,       status: "Signed",     daysLeft: null },
]

const leaveRequests = [
  { type: "Annual Leave", dates: "17–21 Jun 2026", days: 5, status: "Pending" },
  { type: "Annual Leave", dates: "28 Apr–2 May",   days: 5, status: "Approved" },
  { type: "Sick Leave",   dates: "10 Mar 2026",    days: 1, status: "Approved" },
]

const leaveBalance = [
  { type: "Annual Leave",  total: 28, used: 12, remaining: 16 },
  { type: "Sick Leave",    total: 10, used: 1,  remaining: 9 },
  { type: "Other Leave",   total: 5,  used: 0,  remaining: 5 },
]

const payslips = [
  { period: "May 2026",   gross: "£6,000", net: "£4,312", date: "31 May 2026" },
  { period: "Apr 2026",   gross: "£6,000", net: "£4,312", date: "30 Apr 2026" },
  { period: "Mar 2026",   gross: "£6,000", net: "£4,312", date: "31 Mar 2026" },
]

const auditLog = [
  { action: "Role updated",         by: "Emma Thornton", time: "2 Jun 2026 09:14",  detail: "Engineer → Senior Engineer" },
  { action: "Salary reviewed",      by: "Grace Bennett",  time: "1 Mar 2026 14:00",  detail: "£68,000 → £72,000" },
  { action: "Record created",       by: "System",         time: "28 Feb 2023 11:00", detail: "Employee onboarded" },
]

const notes = [
  { author: "Emma Thornton", time: "3 Jun 2026", text: "Excellent work on the API redesign. Strong candidate for tech lead in H2." },
  { author: "James Park",    time: "15 May 2026", text: "Completed sprint delivery 3 days early. Mentoring two junior devs this quarter." },
]

export default function MemberDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const searchParams = useSearchParams()
  const router = useRouter()
  const activeTab = searchParams.get("tab") || "overview"

  function setTab(tab: string) {
    router.push(`/app/people/directory/${id}?tab=${tab}`)
  }

  const expiryBadge = (daysLeft: number | null) => {
    if (daysLeft === null) return null
    if (daysLeft < 30)  return <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-red-100 text-red-700">Exp in {daysLeft}d</span>
    if (daysLeft < 90)  return <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-amber-100 text-amber-700">Exp in {daysLeft}d</span>
    return <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-emerald-100 text-emerald-700">Valid</span>
  }

  return (
    <div className="p-6 max-w-[1200px] mx-auto space-y-6">
      {/* Back + Header */}
      <div className="flex items-start gap-4">
        <Link href="/app/people/directory" className="mt-1 p-1.5 rounded-md border border-[var(--border)] hover:bg-[var(--muted)]">
          <ArrowLeft className="h-4 w-4 text-[var(--foreground)]" />
        </Link>
        <div className="flex items-center gap-4 flex-1">
          <Avatar className="h-14 w-14">
            <AvatarFallback className="text-lg bg-[var(--primary)]/10 text-[var(--primary)]">
              {getInitials(MEMBER.name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-2xl font-bold text-[var(--foreground)]">{MEMBER.name}</h1>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
                {MEMBER.status}
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                {MEMBER.type}
              </span>
            </div>
            <p className="text-sm text-[var(--muted-foreground)]">{MEMBER.role} · {MEMBER.department} · {MEMBER.location}</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="inline-flex items-center gap-1.5 rounded-md border border-[var(--border)] px-3 py-2 text-sm hover:bg-[var(--muted)]">
              <Edit className="h-4 w-4" />Edit
            </button>
            <button className="p-2 rounded-md border border-[var(--border)] hover:bg-[var(--muted)]">
              <MoreHorizontal className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 border-b border-[var(--border)] overflow-x-auto">
        {TABS.map(tab => (
          <button
            key={tab.key}
            onClick={() => setTab(tab.key)}
            className={cn(
              "flex items-center gap-1.5 px-3 py-2.5 text-sm whitespace-nowrap border-b-2 transition-colors",
              activeTab === tab.key
                ? "border-[var(--primary)] text-[var(--primary)] font-medium"
                : "border-transparent text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
            )}
          >
            <tab.icon className="h-3.5 w-3.5" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-6 space-y-4">
            <h3 className="font-semibold text-[var(--foreground)]">Personal Information</h3>
            {[
              { label: "Full Name",  value: MEMBER.name,    icon: null },
              { label: "Email",      value: MEMBER.email,   icon: Mail },
              { label: "Phone",      value: MEMBER.phone,   icon: Phone },
              { label: "Address",    value: MEMBER.address, icon: MapPin },
              { label: "Date of Birth", value: formatDate(MEMBER.dob), icon: Calendar },
              { label: "NI Number",  value: MEMBER.niNumber, icon: null },
            ].map(f => (
              <div key={f.label} className="flex items-start gap-3">
                <div className="w-36 text-xs text-[var(--muted-foreground)] pt-0.5">{f.label}</div>
                <div className="flex items-center gap-1.5 text-sm text-[var(--foreground)]">
                  {f.icon && <f.icon className="h-3.5 w-3.5 text-[var(--muted-foreground)]" />}
                  {f.value}
                </div>
              </div>
            ))}
          </div>
          <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-6 space-y-4">
            <h3 className="font-semibold text-[var(--foreground)]">Emergency Contact</h3>
            {[
              { label: "Name",      value: MEMBER.emergencyContact.name },
              { label: "Relation",  value: MEMBER.emergencyContact.relation },
              { label: "Phone",     value: MEMBER.emergencyContact.phone },
            ].map(f => (
              <div key={f.label} className="flex items-start gap-3">
                <div className="w-36 text-xs text-[var(--muted-foreground)] pt-0.5">{f.label}</div>
                <div className="text-sm text-[var(--foreground)]">{f.value}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "employment" && (
        <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-6 space-y-4 max-w-xl">
          <h3 className="font-semibold text-[var(--foreground)]">Employment Details</h3>
          {[
            { label: "Role",           value: MEMBER.role },
            { label: "Department",     value: MEMBER.department },
            { label: "Manager",        value: MEMBER.manager },
            { label: "Start Date",     value: formatDate(MEMBER.startDate) },
            { label: "Contract Type",  value: MEMBER.contractType },
            { label: "Employment Type",value: MEMBER.employmentType },
            { label: "Salary Band",    value: MEMBER.salaryBand },
          ].map(f => (
            <div key={f.label} className="flex items-center gap-3">
              <div className="w-40 text-xs text-[var(--muted-foreground)]">{f.label}</div>
              <div className="text-sm font-medium text-[var(--foreground)]">{f.value}</div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "documents" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-[var(--foreground)]">Documents</h3>
            <button className="inline-flex items-center gap-1.5 rounded-md bg-[var(--primary)] px-3 py-2 text-sm font-medium text-white hover:opacity-90">
              <Upload className="h-4 w-4" />Upload
            </button>
          </div>
          <div className="rounded-lg border border-[var(--border)] overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[var(--muted)] border-b border-[var(--border)]">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)]">Document</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)]">Type</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)]">Expiry</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)]">Status</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {documents.map((doc, i) => (
                  <tr key={i} className="hover:bg-[var(--muted)] transition-colors">
                    <td className="px-4 py-3 font-medium text-[var(--foreground)]">
                      {doc.name}
                      {expiryBadge(doc.daysLeft)}
                    </td>
                    <td className="px-4 py-3 text-xs text-[var(--muted-foreground)]">{doc.type}</td>
                    <td className="px-4 py-3 text-xs text-[var(--muted-foreground)]">{doc.expiry ? formatDate(doc.expiry) : "—"}</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1 text-xs text-emerald-700">
                        <CheckCircle className="h-3.5 w-3.5" />{doc.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button className="text-xs text-[var(--primary)] hover:underline flex items-center gap-1">
                        <Download className="h-3.5 w-3.5" />Download
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "time" && (
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-[var(--foreground)] mb-4">Leave Balance</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {leaveBalance.map(lb => (
                <div key={lb.type} className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-4">
                  <p className="text-sm font-medium text-[var(--foreground)]">{lb.type}</p>
                  <p className="text-2xl font-bold text-[var(--foreground)] mt-1">{lb.remaining} <span className="text-sm font-normal text-[var(--muted-foreground)]">/ {lb.total} days</span></p>
                  <Progress value={(lb.used / lb.total) * 100} className="h-1.5 mt-2" />
                  <p className="text-xs text-[var(--muted-foreground)] mt-1">{lb.used} used</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-[var(--foreground)] mb-3">Leave Requests</h3>
            <div className="rounded-lg border border-[var(--border)] overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[var(--muted)] border-b border-[var(--border)]">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)]">Type</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)]">Dates</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)]">Days</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)]">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)]">
                  {leaveRequests.map((r, i) => (
                    <tr key={i} className="hover:bg-[var(--muted)] transition-colors">
                      <td className="px-4 py-3 text-[var(--foreground)]">{r.type}</td>
                      <td className="px-4 py-3 text-xs text-[var(--muted-foreground)]">{r.dates}</td>
                      <td className="px-4 py-3 text-sm text-[var(--foreground)]">{r.days}</td>
                      <td className="px-4 py-3">
                        <span className={cn("inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium",
                          r.status === "Approved" ? "bg-emerald-100 text-emerald-700" :
                          r.status === "Pending"  ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700"
                        )}>{r.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === "payroll" && (
        <div className="space-y-4">
          <div className="flex items-center gap-6 p-4 rounded-xl border border-[var(--border)] bg-[var(--background)]">
            <div><p className="text-xs text-[var(--muted-foreground)]">Annual Salary</p><p className="text-2xl font-bold text-[var(--foreground)]">£{MEMBER.salary.toLocaleString()}</p></div>
            <div className="h-10 w-px bg-[var(--border)]" />
            <div><p className="text-xs text-[var(--muted-foreground)]">Payroll ID</p><p className="text-sm font-semibold text-[var(--foreground)]">{MEMBER.payrollId}</p></div>
            <div className="h-10 w-px bg-[var(--border)]" />
            <div><p className="text-xs text-[var(--muted-foreground)]">Tax Code</p><p className="text-sm font-semibold text-[var(--foreground)]">{MEMBER.taxCode}</p></div>
          </div>
          <h3 className="font-semibold text-[var(--foreground)]">Payslips</h3>
          <div className="rounded-lg border border-[var(--border)] overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[var(--muted)] border-b border-[var(--border)]">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)]">Period</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)]">Gross</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)]">Net</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)]">Pay Date</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {payslips.map((p, i) => (
                  <tr key={i} className="hover:bg-[var(--muted)] transition-colors">
                    <td className="px-4 py-3 font-medium text-[var(--foreground)]">{p.period}</td>
                    <td className="px-4 py-3 text-[var(--foreground)]">{p.gross}</td>
                    <td className="px-4 py-3 font-semibold text-emerald-600">{p.net}</td>
                    <td className="px-4 py-3 text-xs text-[var(--muted-foreground)]">{p.date}</td>
                    <td className="px-4 py-3"><button className="text-xs text-[var(--primary)] hover:underline flex items-center gap-1"><Download className="h-3.5 w-3.5" />Download</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "performance" && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: "Review Cycle",   value: "Q2 2026",    sub: "In progress" },
            { label: "Goals Set",      value: "6",          sub: "2 completed" },
            { label: "Latest Score",   value: "4.2 / 5",    sub: "Exceeds expectations" },
          ].map(k => (
            <div key={k.label} className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-5">
              <p className="text-xs text-[var(--muted-foreground)]">{k.label}</p>
              <p className="text-2xl font-bold text-[var(--foreground)] mt-1">{k.value}</p>
              <p className="text-xs text-[var(--muted-foreground)]">{k.sub}</p>
            </div>
          ))}
        </div>
      )}

      {activeTab === "activity" && (
        <div className="space-y-3">
          <h3 className="font-semibold text-[var(--foreground)]">Audit Log</h3>
          <div className="rounded-lg border border-[var(--border)] overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[var(--muted)] border-b border-[var(--border)]">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)]">Action</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)]">By</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)]">Detail</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--muted-foreground)]">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {auditLog.map((entry, i) => (
                  <tr key={i} className="hover:bg-[var(--muted)] transition-colors">
                    <td className="px-4 py-3 font-medium text-[var(--foreground)]">{entry.action}</td>
                    <td className="px-4 py-3 text-xs text-[var(--muted-foreground)]">{entry.by}</td>
                    <td className="px-4 py-3 text-xs text-[var(--muted-foreground)]">{entry.detail}</td>
                    <td className="px-4 py-3 text-xs text-[var(--muted-foreground)] whitespace-nowrap">{entry.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "notes" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-[var(--foreground)]">Team Notes</h3>
            <button className="inline-flex items-center gap-1.5 rounded-md bg-[var(--primary)] px-3 py-2 text-sm font-medium text-white hover:opacity-90">
              <MessageSquare className="h-4 w-4" />Add Note
            </button>
          </div>
          <div className="space-y-3">
            {notes.map((note, i) => (
              <div key={i} className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Avatar className="h-6 w-6">
                    <AvatarFallback className="text-[10px] bg-[var(--primary)]/10 text-[var(--primary)]">{getInitials(note.author)}</AvatarFallback>
                  </Avatar>
                  <span className="text-xs font-semibold text-[var(--foreground)]">{note.author}</span>
                  <span className="text-xs text-[var(--muted-foreground)]">· {note.time}</span>
                </div>
                <p className="text-sm text-[var(--foreground)]">{note.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
