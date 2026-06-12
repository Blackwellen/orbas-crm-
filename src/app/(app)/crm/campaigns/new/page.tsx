"use client"

import React, { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  ChevronLeft, Check, Mail, Calendar, Users, BarChart2,
  FileText, Send, Megaphone, ChevronRight
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

type CampaignType = "Email" | "Event" | "Social" | "PPC" | "Content" | "Direct Mail"

const CAMPAIGN_TYPES: { type: CampaignType; icon: React.ReactNode; description: string }[] = [
  { type: "Email",       icon: <Mail className="h-6 w-6" />,     description: "Automated email sequences and newsletters to nurture leads" },
  { type: "Event",       icon: <Calendar className="h-6 w-6" />, description: "Webinars, conferences, trade shows and in-person events" },
  { type: "Social",      icon: <Users className="h-6 w-6" />,    description: "LinkedIn, Twitter/X, Facebook and Instagram campaigns" },
  { type: "PPC",         icon: <BarChart2 className="h-6 w-6" />,description: "Google Ads, Bing Ads and paid search campaigns" },
  { type: "Content",     icon: <FileText className="h-6 w-6" />, description: "Blog posts, whitepapers, case studies and SEO content" },
  { type: "Direct Mail", icon: <Send className="h-6 w-6" />,     description: "Physical mailers, catalogues and direct mail pieces" },
]

const STEPS = [
  { label: "Campaign Type", description: "Choose the campaign type" },
  { label: "Campaign Details", description: "Name, dates, budget" },
  { label: "Review & Launch", description: "Confirm and launch" },
]

export default function NewCampaignPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [selectedType, setSelectedType] = useState<CampaignType | null>(null)
  const [form, setForm] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    budget: "",
    audience: "",
    owner: "Alex Turner",
    goal: "",
  })

  function update(field: string, value: string) {
    setForm(p => ({ ...p, [field]: value }))
  }

  const canProceedStep1 = !!selectedType
  const canProceedStep2 = form.name && form.startDate && form.endDate

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Back nav */}
      <div className="border-b border-[var(--border)] bg-[var(--card)] px-6 py-3">
        <Button variant="ghost" size="sm" asChild className="text-[var(--muted-foreground)] -ml-2">
          <Link href="/app/crm/campaigns"><ChevronLeft className="h-4 w-4 mr-1" />Back to Campaigns</Link>
        </Button>
      </div>

      {/* Header */}
      <div className="border-b border-[var(--border)] bg-[var(--card)] px-6 py-5">
        <div className="max-w-[900px] mx-auto">
          <div className="flex items-center gap-3 mb-1">
            <div className="h-10 w-10 rounded-xl bg-[var(--primary)]/10 flex items-center justify-center">
              <Megaphone className="h-5 w-5 text-[var(--primary)]" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-[var(--foreground)]">New Campaign</h1>
              <p className="text-xs text-[var(--muted-foreground)]">Create a new marketing campaign in 3 steps</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stepper */}
      <div className="border-b border-[var(--border)] bg-[var(--card)] px-6 py-4">
        <div className="max-w-[900px] mx-auto">
          <div className="flex items-center gap-0">
            {STEPS.map((s, i) => {
              const num = i + 1
              const isActive = step === num
              const isDone = step > num
              return (
                <React.Fragment key={s.label}>
                  <div className="flex items-center gap-2">
                    <div className={cn(
                      "h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-colors",
                      isDone ? "bg-[var(--primary)] border-[var(--primary)] text-white"
                        : isActive ? "border-[var(--primary)] text-[var(--primary)]"
                        : "border-[var(--border)] text-[var(--muted-foreground)]"
                    )}>
                      {isDone ? <Check className="h-3.5 w-3.5" /> : num}
                    </div>
                    <div className="hidden sm:block">
                      <p className={cn("text-xs font-medium", isActive ? "text-[var(--foreground)]" : "text-[var(--muted-foreground)]")}>{s.label}</p>
                      <p className="text-[10px] text-[var(--muted-foreground)]">{s.description}</p>
                    </div>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className={cn("flex-1 h-px mx-3", step > i + 1 ? "bg-[var(--primary)]" : "bg-[var(--border)]")} />
                  )}
                </React.Fragment>
              )
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[900px] mx-auto px-6 py-8">

        {/* Step 1 — Type Selection */}
        {step === 1 && (
          <div>
            <h2 className="text-base font-semibold text-[var(--foreground)] mb-1">Select Campaign Type</h2>
            <p className="text-sm text-[var(--muted-foreground)] mb-6">Choose the channel that best describes your campaign</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {CAMPAIGN_TYPES.map(ct => (
                <button
                  key={ct.type}
                  onClick={() => setSelectedType(ct.type)}
                  className={cn(
                    "p-5 border-2 rounded-xl text-left transition-all hover:shadow-md",
                    selectedType === ct.type
                      ? "border-[var(--primary)] bg-[var(--primary)]/5"
                      : "border-[var(--border)] bg-[var(--card)] hover:border-[var(--primary)]/40"
                  )}
                >
                  <div className={cn(
                    "inline-flex p-3 rounded-xl mb-3",
                    selectedType === ct.type ? "bg-[var(--primary)]/15 text-[var(--primary)]" : "bg-[var(--muted)] text-[var(--muted-foreground)]"
                  )}>
                    {ct.icon}
                  </div>
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-semibold text-[var(--foreground)]">{ct.type}</p>
                    {selectedType === ct.type && <Check className="h-4 w-4 text-[var(--primary)]" />}
                  </div>
                  <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">{ct.description}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2 — Campaign Details */}
        {step === 2 && (
          <div>
            <h2 className="text-base font-semibold text-[var(--foreground)] mb-1">Campaign Details</h2>
            <p className="text-sm text-[var(--muted-foreground)] mb-6">Fill in the details for your {selectedType} campaign</p>

            <div className="grid grid-cols-1 gap-5">
              <div>
                <Label className="text-xs font-medium text-[var(--foreground)] mb-1.5 block">Campaign Name <span className="text-red-500">*</span></Label>
                <Input
                  value={form.name}
                  onChange={e => update("name", e.target.value)}
                  placeholder="e.g. Q3 Enterprise Nurture Series"
                  className="h-9"
                />
              </div>

              <div>
                <Label className="text-xs font-medium text-[var(--foreground)] mb-1.5 block">Description</Label>
                <Textarea
                  value={form.description}
                  onChange={e => update("description", e.target.value)}
                  placeholder="Describe the goal and approach of this campaign..."
                  className="min-h-[80px] text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs font-medium text-[var(--foreground)] mb-1.5 block">Start Date <span className="text-red-500">*</span></Label>
                  <Input type="date" value={form.startDate} onChange={e => update("startDate", e.target.value)} className="h-9" />
                </div>
                <div>
                  <Label className="text-xs font-medium text-[var(--foreground)] mb-1.5 block">End Date <span className="text-red-500">*</span></Label>
                  <Input type="date" value={form.endDate} onChange={e => update("endDate", e.target.value)} className="h-9" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs font-medium text-[var(--foreground)] mb-1.5 block">Budget (£)</Label>
                  <Input
                    type="number"
                    value={form.budget}
                    onChange={e => update("budget", e.target.value)}
                    placeholder="0.00"
                    className="h-9"
                  />
                </div>
                <div>
                  <Label className="text-xs font-medium text-[var(--foreground)] mb-1.5 block">Owner</Label>
                  <Input value={form.owner} onChange={e => update("owner", e.target.value)} className="h-9" />
                </div>
              </div>

              <div>
                <Label className="text-xs font-medium text-[var(--foreground)] mb-1.5 block">Target Audience</Label>
                <Input
                  value={form.audience}
                  onChange={e => update("audience", e.target.value)}
                  placeholder="e.g. Enterprise fintech companies, 200+ employees, UK"
                  className="h-9"
                />
              </div>

              <div>
                <Label className="text-xs font-medium text-[var(--foreground)] mb-1.5 block">Campaign Goal</Label>
                <Input
                  value={form.goal}
                  onChange={e => update("goal", e.target.value)}
                  placeholder="e.g. Generate 150 qualified leads and £200K pipeline"
                  className="h-9"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 3 — Review */}
        {step === 3 && (
          <div>
            <h2 className="text-base font-semibold text-[var(--foreground)] mb-1">Review & Launch</h2>
            <p className="text-sm text-[var(--muted-foreground)] mb-6">Review your campaign details before launching</p>

            <Card className="border border-[var(--border)] mb-6">
              <CardContent className="p-5 space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Campaign Type", value: selectedType || "—" },
                    { label: "Campaign Name", value: form.name || "—" },
                    { label: "Start Date", value: form.startDate || "—" },
                    { label: "End Date", value: form.endDate || "—" },
                    { label: "Budget", value: form.budget ? `£${Number(form.budget).toLocaleString()}` : "—" },
                    { label: "Owner", value: form.owner || "—" },
                  ].map(f => (
                    <div key={f.label}>
                      <p className="text-[10px] text-[var(--muted-foreground)] font-medium uppercase tracking-wide mb-0.5">{f.label}</p>
                      <p className="text-sm text-[var(--foreground)] font-medium">{f.value}</p>
                    </div>
                  ))}
                </div>
                {form.description && (
                  <>
                    <Separator />
                    <div>
                      <p className="text-[10px] text-[var(--muted-foreground)] font-medium uppercase tracking-wide mb-0.5">Description</p>
                      <p className="text-sm text-[var(--foreground)]">{form.description}</p>
                    </div>
                  </>
                )}
                {form.goal && (
                  <div>
                    <p className="text-[10px] text-[var(--muted-foreground)] font-medium uppercase tracking-wide mb-0.5">Goal</p>
                    <p className="text-sm text-[var(--foreground)]">{form.goal}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1 h-10"
                onClick={() => router.push("/app/crm/campaigns")}
              >
                Save as Draft
              </Button>
              <Button
                className="flex-1 h-10"
                onClick={() => router.push("/app/crm/campaigns")}
              >
                <Send className="h-4 w-4 mr-2" />Launch Campaign
              </Button>
            </div>
          </div>
        )}

        {/* Navigation */}
        {step < 3 && (
          <div className="flex justify-between mt-8 pt-6 border-t border-[var(--border)]">
            <Button
              variant="outline"
              onClick={() => step > 1 ? setStep(s => s - 1) : router.push("/app/crm/campaigns")}
            >
              {step === 1 ? "Cancel" : "Back"}
            </Button>
            <Button
              onClick={() => setStep(s => s + 1)}
              disabled={step === 1 ? !canProceedStep1 : !canProceedStep2}
            >
              Continue <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        )}
        {step === 3 && (
          <div className="mt-6 pt-6 border-t border-[var(--border)]">
            <Button variant="outline" onClick={() => setStep(2)}>Back</Button>
          </div>
        )}
      </div>
    </div>
  )
}
