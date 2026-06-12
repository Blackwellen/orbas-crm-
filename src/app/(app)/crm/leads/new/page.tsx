"use client"

import React, { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import {
  ChevronLeft, ChevronRight, Check, User, BarChart2, ClipboardList, Loader2, Save
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

const step1Schema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName:  z.string().optional(),
  email:     z.string().email("Valid email required"),
  phone:     z.string().optional(),
  company:   z.string().min(1, "Company is required"),
  jobTitle:  z.string().optional(),
  source:    z.enum(["Website","Referral","LinkedIn","Cold Outreach","Event","Other"]),
  status:    z.enum(["New","Contacted","Qualified"]),
})

const step2Schema = z.object({
  score:       z.number().min(0).max(100),
  owner:       z.string().min(1, "Owner is required"),
  tags:        z.string().optional(),
  pipeline:    z.string().optional(),
  description: z.string().optional(),
})

type Step1Data = z.infer<typeof step1Schema>
type Step2Data = z.infer<typeof step2Schema>

const STEPS = [
  { label: "Basic Info",          icon: User },
  { label: "Scoring & Assignment",icon: BarChart2 },
  { label: "Review",              icon: ClipboardList },
]

export default function NewLeadPage() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [step1Data, setStep1Data] = useState<Partial<Step1Data>>({})
  const [step2Data, setStep2Data] = useState<Partial<Step2Data>>({ score: 50 })
  const [saving, setSaving] = useState(false)
  const { toast } = useToast()

  const form1 = useForm<Step1Data>({
    resolver: zodResolver(step1Schema),
    defaultValues: { source: "Website", status: "New", ...step1Data },
  })

  const form2 = useForm<Step2Data>({
    resolver: zodResolver(step2Schema),
    defaultValues: { score: 50, owner: "Alex Turner", ...step2Data },
  })

  async function handleStep1(data: Step1Data) {
    setStep1Data(data)
    setStep(1)
  }

  async function handleStep2(data: Step2Data) {
    setStep2Data(data)
    setStep(2)
  }

  async function handleCreate() {
    setSaving(true)
    await new Promise(r => setTimeout(r, 1200))
    setSaving(false)
    toast({ title: "Lead created", description: `${step1Data.firstName} ${step1Data.lastName || ""} has been added.` })
    router.push("/app/crm/leads")
  }

  function saveDraft() {
    localStorage.setItem("crm_lead_draft", JSON.stringify({ step1Data, step2Data }))
    toast({ title: "Draft saved", description: "Your lead draft has been saved locally." })
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Button variant="ghost" size="sm" asChild className="text-[var(--muted-foreground)]">
          <Link href="/app/crm/leads"><ChevronLeft className="h-4 w-4 mr-1" />Back</Link>
        </Button>
        <h1 className="text-xl font-bold text-[var(--foreground)]">New Lead</h1>
      </div>

      {/* Stepper */}
      <div className="flex items-center gap-0 mb-8">
        {STEPS.map((s, i) => (
          <React.Fragment key={s.label}>
            <div className="flex flex-col items-center gap-1">
              <div className={cn(
                "h-8 w-8 rounded-full flex items-center justify-center text-xs font-semibold transition-colors",
                i < step ? "bg-[var(--primary)] text-white"
                  : i === step ? "bg-[var(--primary)] text-white ring-2 ring-[var(--primary)] ring-offset-2"
                  : "bg-[var(--muted)] text-[var(--muted-foreground)]"
              )}>
                {i < step ? <Check className="h-4 w-4" /> : <s.icon className="h-3.5 w-3.5" />}
              </div>
              <span className={cn("text-xs font-medium whitespace-nowrap", i === step ? "text-[var(--primary)]" : "text-[var(--muted-foreground)]")}>
                {s.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={cn("flex-1 h-px mx-2 mb-5 transition-colors", i < step ? "bg-[var(--primary)]" : "bg-[var(--border)]")} />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Step 1: Basic Info */}
      {step === 0 && (
        <form onSubmit={form1.handleSubmit(handleStep1)}>
          <Card className="border border-[var(--border)]">
            <CardHeader><CardTitle className="text-base">Basic Information</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="firstName">First Name <span className="text-red-500">*</span></Label>
                  <Input id="firstName" {...form1.register("firstName")} placeholder="James" />
                  {form1.formState.errors.firstName && <p className="text-xs text-red-500">{form1.formState.errors.firstName.message}</p>}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" {...form1.register("lastName")} placeholder="Whitfield" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
                  <Input id="email" type="email" {...form1.register("email")} placeholder="james@company.co.uk" />
                  {form1.formState.errors.email && <p className="text-xs text-red-500">{form1.formState.errors.email.message}</p>}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" {...form1.register("phone")} placeholder="+44 20 7123 4567" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="company">Company <span className="text-red-500">*</span></Label>
                  <Input id="company" {...form1.register("company")} placeholder="Fintech Corp Ltd" />
                  {form1.formState.errors.company && <p className="text-xs text-red-500">{form1.formState.errors.company.message}</p>}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="jobTitle">Job Title</Label>
                  <Input id="jobTitle" {...form1.register("jobTitle")} placeholder="Head of Operations" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label>Source</Label>
                  <Select defaultValue="Website" onValueChange={v => form1.setValue("source", v as any)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {["Website","Referral","LinkedIn","Cold Outreach","Event","Other"].map(s => (
                        <SelectItem key={s} value={s}>{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label>Status</Label>
                  <Select defaultValue="New" onValueChange={v => form1.setValue("status", v as any)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {["New","Contacted","Qualified"].map(s => (
                        <SelectItem key={s} value={s}>{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="flex items-center justify-between mt-4">
            <Button type="button" variant="outline" size="sm" onClick={saveDraft}>
              <Save className="h-4 w-4 mr-1.5" />Save Draft
            </Button>
            <Button type="submit" size="sm">
              Next <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </form>
      )}

      {/* Step 2: Scoring & Assignment */}
      {step === 1 && (
        <form onSubmit={form2.handleSubmit(handleStep2)}>
          <Card className="border border-[var(--border)]">
            <CardHeader><CardTitle className="text-base">Scoring & Assignment</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Lead Score: {form2.watch("score") ?? 50}</Label>
                <input
                  type="range" min={0} max={100} step={1}
                  className="w-full accent-[var(--primary)]"
                  {...form2.register("score", { valueAsNumber: true })}
                />
                <div className="flex justify-between text-xs text-[var(--muted-foreground)]">
                  <span>0 — Cold</span><span>50 — Warm</span><span>100 — Hot</span>
                </div>
              </div>
              <div className="space-y-1.5">
                <Label>Owner <span className="text-red-500">*</span></Label>
                <Select defaultValue="Alex Turner" onValueChange={v => form2.setValue("owner", v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {["Alex Turner","Sarah Mitchell","James Park","Chloe Evans","Tom Bradley"].map(o => (
                      <SelectItem key={o} value={o}>{o}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {form2.formState.errors.owner && <p className="text-xs text-red-500">{form2.formState.errors.owner.message}</p>}
              </div>
              <div className="space-y-1.5">
                <Label>Pipeline</Label>
                <Select defaultValue="Main" onValueChange={v => form2.setValue("pipeline", v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {["Main Sales Pipeline","Enterprise","SMB","Partner Channel"].map(p => (
                      <SelectItem key={p} value={p}>{p}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Tags (comma separated)</Label>
                <Input {...form2.register("tags")} placeholder="high-value, enterprise, Q3" />
              </div>
              <div className="space-y-1.5">
                <Label>Description</Label>
                <Textarea {...form2.register("description")} placeholder="Add any notes about this lead…" rows={3} />
              </div>
            </CardContent>
          </Card>
          <div className="flex items-center justify-between mt-4">
            <div className="flex gap-2">
              <Button type="button" variant="outline" size="sm" onClick={() => setStep(0)}>
                <ChevronLeft className="h-4 w-4 mr-1" />Back
              </Button>
              <Button type="button" variant="outline" size="sm" onClick={saveDraft}>
                <Save className="h-4 w-4 mr-1.5" />Save Draft
              </Button>
            </div>
            <Button type="submit" size="sm">
              Next <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </form>
      )}

      {/* Step 3: Review */}
      {step === 2 && (
        <div className="space-y-4">
          <Card className="border border-[var(--border)]">
            <CardHeader><CardTitle className="text-base">Review Lead Details</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm">
                {[
                  ["Name",       `${step1Data.firstName} ${step1Data.lastName || ""}`.trim()],
                  ["Email",      step1Data.email],
                  ["Company",    step1Data.company],
                  ["Phone",      step1Data.phone || "—"],
                  ["Job Title",  step1Data.jobTitle || "—"],
                  ["Source",     step1Data.source],
                  ["Status",     step1Data.status],
                  ["Lead Score", `${step2Data.score}/100`],
                  ["Owner",      step2Data.owner],
                  ["Pipeline",   step2Data.pipeline || "Main Sales Pipeline"],
                  ["Tags",       step2Data.tags || "—"],
                ].map(([label, value]) => (
                  <div key={label as string}>
                    <p className="text-xs text-[var(--muted-foreground)] font-medium">{label}</p>
                    <p className="text-sm text-[var(--foreground)] font-medium mt-0.5">{value as string}</p>
                  </div>
                ))}
              </div>
              {step2Data.description && (
                <>
                  <Separator />
                  <div>
                    <p className="text-xs text-[var(--muted-foreground)] font-medium mb-1">Description</p>
                    <p className="text-sm text-[var(--foreground)]">{step2Data.description}</p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
          <div className="flex items-center justify-between">
            <Button variant="outline" size="sm" onClick={() => setStep(1)}>
              <ChevronLeft className="h-4 w-4 mr-1" />Back
            </Button>
            <Button size="sm" onClick={handleCreate} disabled={saving}>
              {saving ? <><Loader2 className="h-4 w-4 mr-1.5 animate-spin" />Creating…</> : <><Check className="h-4 w-4 mr-1.5" />Create Lead</>}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
