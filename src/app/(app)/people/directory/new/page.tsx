"use client"

import React, { useState } from "react"
import Link from "next/link"
import { ArrowLeft, ChevronRight, Check, Upload } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

const STEPS = [
  { n: 1, label: "Personal" },
  { n: 2, label: "Employment" },
  { n: 3, label: "Compensation" },
  { n: 4, label: "Documents" },
  { n: 5, label: "Review" },
]

type FormData = {
  firstName: string; lastName: string; email: string; phone: string
  address: string; dob: string; niNumber: string
  role: string; department: string; manager: string; startDate: string
  contractType: string; employmentType: string
  salary: string; payFrequency: string; payCalendar: string
}

const EMPTY: FormData = {
  firstName: "", lastName: "", email: "", phone: "",
  address: "", dob: "", niNumber: "",
  role: "", department: "", manager: "", startDate: "",
  contractType: "", employmentType: "",
  salary: "", payFrequency: "", payCalendar: "",
}

export default function NewMemberPage() {
  const [step, setStep]       = useState(1)
  const [form, setForm]       = useState<FormData>(EMPTY)
  const [errors, setErrors]   = useState<Partial<FormData>>({})
  const [submitted, setSubmitted] = useState(false)

  function set(key: keyof FormData, val: string) {
    setForm(f => ({ ...f, [key]: val }))
    setErrors(e => ({ ...e, [key]: "" }))
  }

  function validateStep(): boolean {
    const errs: Partial<FormData> = {}
    if (step === 1) {
      if (!form.firstName)  errs.firstName = "Required"
      if (!form.lastName)   errs.lastName  = "Required"
      if (!form.email)      errs.email     = "Required"
    }
    if (step === 2) {
      if (!form.role)       errs.role      = "Required"
      if (!form.department) errs.department= "Required"
      if (!form.startDate)  errs.startDate = "Required"
    }
    if (step === 3) {
      if (!form.salary)     errs.salary    = "Required"
    }
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  function next() { if (validateStep()) setStep(s => Math.min(s + 1, 5)) }
  function back() { setStep(s => Math.max(s - 1, 1)) }
  function submit() { setSubmitted(true) }

  if (submitted) {
    return (
      <div className="p-6 max-w-lg mx-auto text-center mt-20">
        <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
          <Check className="h-8 w-8 text-emerald-600" />
        </div>
        <h2 className="text-xl font-bold text-[var(--foreground)]">Employee Created!</h2>
        <p className="text-sm text-[var(--muted-foreground)] mt-2">
          {form.firstName} {form.lastName} has been added to the directory.
        </p>
        <div className="flex items-center gap-3 justify-center mt-6">
          <Link href="/app/people/directory" className="inline-flex items-center gap-2 rounded-md border border-[var(--border)] px-4 py-2 text-sm hover:bg-[var(--muted)]">
            Back to Directory
          </Link>
          <button onClick={() => { setForm(EMPTY); setStep(1); setSubmitted(false) }}
            className="inline-flex items-center gap-2 rounded-md bg-[var(--primary)] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
            Add Another
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link href="/app/people/directory" className="p-1.5 rounded-md border border-[var(--border)] hover:bg-[var(--muted)]">
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-[var(--foreground)]">Add New Employee</h1>
          <p className="text-sm text-[var(--muted-foreground)]">Step {step} of 5</p>
        </div>
      </div>

      {/* Progress */}
      <div className="flex items-center gap-2">
        {STEPS.map((s, i) => (
          <React.Fragment key={s.n}>
            <div className="flex flex-col items-center gap-1">
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors",
                s.n < step  ? "bg-emerald-600 text-white" :
                s.n === step ? "bg-[var(--primary)] text-white" :
                "bg-[var(--muted)] text-[var(--muted-foreground)]"
              )}>
                {s.n < step ? <Check className="h-4 w-4" /> : s.n}
              </div>
              <span className="text-[10px] text-[var(--muted-foreground)] hidden sm:block">{s.label}</span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={cn("flex-1 h-px", s.n < step ? "bg-emerald-600" : "bg-[var(--border)]")} />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Form Card */}
      <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-6 space-y-5">
        {/* Step 1: Personal */}
        {step === 1 && (
          <>
            <h2 className="text-base font-semibold text-[var(--foreground)]">Personal Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[var(--muted-foreground)]">First Name *</label>
                <Input value={form.firstName} onChange={e => set("firstName", e.target.value)} placeholder="First name" className={cn(errors.firstName && "border-red-400")} />
                {errors.firstName && <p className="text-xs text-red-500">{errors.firstName}</p>}
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[var(--muted-foreground)]">Last Name *</label>
                <Input value={form.lastName} onChange={e => set("lastName", e.target.value)} placeholder="Last name" className={cn(errors.lastName && "border-red-400")} />
                {errors.lastName && <p className="text-xs text-red-500">{errors.lastName}</p>}
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[var(--muted-foreground)]">Email Address *</label>
              <Input type="email" value={form.email} onChange={e => set("email", e.target.value)} placeholder="email@company.co.uk" className={cn(errors.email && "border-red-400")} />
              {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[var(--muted-foreground)]">Phone Number</label>
              <Input value={form.phone} onChange={e => set("phone", e.target.value)} placeholder="+44 7700 900000" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[var(--muted-foreground)]">Address</label>
              <Input value={form.address} onChange={e => set("address", e.target.value)} placeholder="Full address" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[var(--muted-foreground)]">Date of Birth</label>
                <Input type="date" value={form.dob} onChange={e => set("dob", e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[var(--muted-foreground)]">NI Number</label>
                <Input value={form.niNumber} onChange={e => set("niNumber", e.target.value)} placeholder="AB123456C" />
              </div>
            </div>
          </>
        )}

        {/* Step 2: Employment */}
        {step === 2 && (
          <>
            <h2 className="text-base font-semibold text-[var(--foreground)]">Employment Details</h2>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[var(--muted-foreground)]">Job Title *</label>
              <Input value={form.role} onChange={e => set("role", e.target.value)} placeholder="e.g. Senior Engineer" className={cn(errors.role && "border-red-400")} />
              {errors.role && <p className="text-xs text-red-500">{errors.role}</p>}
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[var(--muted-foreground)]">Department *</label>
              <Select value={form.department} onValueChange={v => set("department", v)}>
                <SelectTrigger className={cn(errors.department && "border-red-400")}><SelectValue placeholder="Select department" /></SelectTrigger>
                <SelectContent>
                  {["Engineering","Product","Sales","Marketing","Finance","Operations","HR","Executive"].map(d => (
                    <SelectItem key={d} value={d}>{d}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.department && <p className="text-xs text-red-500">{errors.department}</p>}
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[var(--muted-foreground)]">Manager</label>
              <Input value={form.manager} onChange={e => set("manager", e.target.value)} placeholder="Manager name" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[var(--muted-foreground)]">Start Date *</label>
              <Input type="date" value={form.startDate} onChange={e => set("startDate", e.target.value)} className={cn(errors.startDate && "border-red-400")} />
              {errors.startDate && <p className="text-xs text-red-500">{errors.startDate}</p>}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[var(--muted-foreground)]">Contract Type</label>
                <Select value={form.contractType} onValueChange={v => set("contractType", v)}>
                  <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Permanent">Permanent</SelectItem>
                    <SelectItem value="Fixed Term">Fixed Term</SelectItem>
                    <SelectItem value="Zero Hours">Zero Hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[var(--muted-foreground)]">Employment Type</label>
                <Select value={form.employmentType} onValueChange={v => set("employmentType", v)}>
                  <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Full-time">Full-time</SelectItem>
                    <SelectItem value="Part-time">Part-time</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </>
        )}

        {/* Step 3: Compensation */}
        {step === 3 && (
          <>
            <h2 className="text-base font-semibold text-[var(--foreground)]">Compensation</h2>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[var(--muted-foreground)]">Annual Salary (£) *</label>
              <Input type="number" value={form.salary} onChange={e => set("salary", e.target.value)} placeholder="e.g. 45000" className={cn(errors.salary && "border-red-400")} />
              {errors.salary && <p className="text-xs text-red-500">{errors.salary}</p>}
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[var(--muted-foreground)]">Pay Frequency</label>
              <Select value={form.payFrequency} onValueChange={v => set("payFrequency", v)}>
                <SelectTrigger><SelectValue placeholder="Select frequency" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Monthly">Monthly</SelectItem>
                  <SelectItem value="Bi-weekly">Bi-weekly</SelectItem>
                  <SelectItem value="Weekly">Weekly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[var(--muted-foreground)]">Pay Calendar</label>
              <Select value={form.payCalendar} onValueChange={v => set("payCalendar", v)}>
                <SelectTrigger><SelectValue placeholder="Select calendar" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="UK Monthly">UK Monthly (end of month)</SelectItem>
                  <SelectItem value="UK Biweekly">UK Bi-weekly (Friday)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        )}

        {/* Step 4: Documents */}
        {step === 4 && (
          <>
            <h2 className="text-base font-semibold text-[var(--foreground)]">Document Upload</h2>
            {[
              { label: "Right to Work (Passport / BRP)", hint: "PDF, JPG, PNG up to 10MB" },
              { label: "Signed Employment Contract",     hint: "PDF up to 20MB" },
            ].map(doc => (
              <div key={doc.label} className="space-y-1.5">
                <label className="text-xs font-medium text-[var(--muted-foreground)]">{doc.label}</label>
                <div className="flex items-center justify-center border-2 border-dashed border-[var(--border)] rounded-lg p-6 cursor-pointer hover:border-[var(--primary)] transition-colors">
                  <div className="text-center">
                    <Upload className="h-6 w-6 text-[var(--muted-foreground)] mx-auto mb-2" />
                    <p className="text-sm text-[var(--muted-foreground)]">Click to upload or drag & drop</p>
                    <p className="text-xs text-[var(--muted-foreground)] mt-1">{doc.hint}</p>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}

        {/* Step 5: Review */}
        {step === 5 && (
          <>
            <h2 className="text-base font-semibold text-[var(--foreground)]">Review & Create</h2>
            <div className="space-y-4">
              {[
                { section: "Personal",    rows: [["Name", `${form.firstName} ${form.lastName}`], ["Email", form.email], ["Phone", form.phone || "—"], ["NI Number", form.niNumber || "—"]] },
                { section: "Employment",  rows: [["Role", form.role], ["Department", form.department], ["Manager", form.manager || "—"], ["Start Date", form.startDate]] },
                { section: "Compensation",rows: [["Salary", form.salary ? `£${Number(form.salary).toLocaleString()}` : "—"], ["Pay Frequency", form.payFrequency || "—"]] },
              ].map(sec => (
                <div key={sec.section} className="rounded-lg border border-[var(--border)] p-4">
                  <h4 className="text-sm font-semibold text-[var(--foreground)] mb-3">{sec.section}</h4>
                  <div className="space-y-2">
                    {sec.rows.map(([label, value]) => (
                      <div key={label} className="flex gap-3">
                        <span className="w-32 text-xs text-[var(--muted-foreground)]">{label}</span>
                        <span className="text-xs text-[var(--foreground)] font-medium">{value || "—"}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={back}
          disabled={step === 1}
          className="inline-flex items-center gap-2 rounded-md border border-[var(--border)] px-4 py-2 text-sm hover:bg-[var(--muted)] disabled:opacity-40"
        >
          <ArrowLeft className="h-4 w-4" />Back
        </button>
        {step < 5 ? (
          <button onClick={next} className="inline-flex items-center gap-2 rounded-md bg-[var(--primary)] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
            Next<ChevronRight className="h-4 w-4" />
          </button>
        ) : (
          <button onClick={submit} className="inline-flex items-center gap-2 rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:opacity-90">
            <Check className="h-4 w-4" />Create Employee
          </button>
        )}
      </div>
    </div>
  )
}
