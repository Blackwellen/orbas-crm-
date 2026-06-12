"use client"

import React, { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { ChevronLeft, ChevronRight, Check, User, MapPin, Tag, Loader2, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

const step1Schema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName:  z.string().optional(),
  email:     z.string().email("Valid email required"),
  phone:     z.string().optional(),
  jobTitle:  z.string().optional(),
  account:   z.string().optional(),
})

const step2Schema = z.object({
  addressLine1: z.string().optional(),
  city:         z.string().optional(),
  postcode:     z.string().optional(),
  country:      z.string().optional(),
  linkedin:     z.string().optional(),
  twitter:      z.string().optional(),
  notes:        z.string().optional(),
})

const step3Schema = z.object({
  owner: z.string().min(1, "Owner is required"),
  tags:  z.string().optional(),
})

type S1 = z.infer<typeof step1Schema>
type S2 = z.infer<typeof step2Schema>
type S3 = z.infer<typeof step3Schema>

const STEPS = [
  { label: "Basic Info", icon: User },
  { label: "Details",    icon: MapPin },
  { label: "Assignment", icon: Tag },
  { label: "Review",     icon: Check },
]

export default function NewContactPage() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [d1, setD1] = useState<Partial<S1>>({})
  const [d2, setD2] = useState<Partial<S2>>({})
  const [d3, setD3] = useState<Partial<S3>>({})
  const [saving, setSaving] = useState(false)
  const { toast } = useToast()

  const f1 = useForm<S1>({ resolver: zodResolver(step1Schema), defaultValues: d1 })
  const f2 = useForm<S2>({ resolver: zodResolver(step2Schema), defaultValues: { country: "United Kingdom", ...d2 } })
  const f3 = useForm<S3>({ resolver: zodResolver(step3Schema), defaultValues: { owner: "Alex Turner", ...d3 } })

  async function create() {
    setSaving(true)
    await new Promise(r => setTimeout(r, 1100))
    setSaving(false)
    toast({ title: "Contact created", description: `${d1.firstName} ${d1.lastName || ""} added to contacts.` })
    router.push("/app/crm/contacts")
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Button variant="ghost" size="sm" asChild className="text-[var(--muted-foreground)]">
          <Link href="/app/crm/contacts"><ChevronLeft className="h-4 w-4 mr-1" />Back</Link>
        </Button>
        <h1 className="text-xl font-bold">New Contact</h1>
      </div>

      {/* Stepper */}
      <div className="flex items-center gap-0 mb-8">
        {STEPS.map((s, i) => (
          <React.Fragment key={s.label}>
            <div className="flex flex-col items-center gap-1">
              <div className={cn("h-8 w-8 rounded-full flex items-center justify-center text-xs font-semibold transition-colors",
                i < step ? "bg-[var(--primary)] text-white" : i === step ? "bg-[var(--primary)] text-white ring-2 ring-[var(--primary)] ring-offset-2" : "bg-[var(--muted)] text-[var(--muted-foreground)]")}>
                {i < step ? <Check className="h-4 w-4" /> : <s.icon className="h-3.5 w-3.5" />}
              </div>
              <span className={cn("text-xs font-medium whitespace-nowrap", i === step ? "text-[var(--primary)]" : "text-[var(--muted-foreground)]")}>{s.label}</span>
            </div>
            {i < STEPS.length - 1 && <div className={cn("flex-1 h-px mx-2 mb-5 transition-colors", i < step ? "bg-[var(--primary)]" : "bg-[var(--border)]")} />}
          </React.Fragment>
        ))}
      </div>

      {step === 0 && (
        <form onSubmit={f1.handleSubmit(d => { setD1(d); setStep(1) })}>
          <Card className="border border-[var(--border)]">
            <CardHeader><CardTitle className="text-base">Basic Information</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label>First Name <span className="text-red-500">*</span></Label>
                  <Input {...f1.register("firstName")} placeholder="Sarah" />
                  {f1.formState.errors.firstName && <p className="text-xs text-red-500">{f1.formState.errors.firstName.message}</p>}
                </div>
                <div className="space-y-1.5">
                  <Label>Last Name</Label>
                  <Input {...f1.register("lastName")} placeholder="Chen" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label>Email <span className="text-red-500">*</span></Label>
                  <Input type="email" {...f1.register("email")} placeholder="sarah@company.co.uk" />
                  {f1.formState.errors.email && <p className="text-xs text-red-500">{f1.formState.errors.email.message}</p>}
                </div>
                <div className="space-y-1.5">
                  <Label>Phone</Label>
                  <Input {...f1.register("phone")} placeholder="+44 20 7234 5678" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label>Job Title</Label>
                  <Input {...f1.register("jobTitle")} placeholder="CTO" />
                </div>
                <div className="space-y-1.5">
                  <Label>Account</Label>
                  <Select onValueChange={v => f1.setValue("account", v)}>
                    <SelectTrigger><SelectValue placeholder="Select account" /></SelectTrigger>
                    <SelectContent>
                      {["BlueWave Digital","Fintech Corp Ltd","TechGrid Ltd","Sandstone Corp","Vertex Solutions","Oakfield Media"].map(a => (
                        <SelectItem key={a} value={a}>{a}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="flex justify-end mt-4">
            <Button type="submit" size="sm">Next <ChevronRight className="h-4 w-4 ml-1" /></Button>
          </div>
        </form>
      )}

      {step === 1 && (
        <form onSubmit={f2.handleSubmit(d => { setD2(d); setStep(2) })}>
          <Card className="border border-[var(--border)]">
            <CardHeader><CardTitle className="text-base">Details & Address</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <Label>Address Line 1</Label>
                <Input {...f2.register("addressLine1")} placeholder="12 Canary Wharf" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label>City</Label>
                  <Input {...f2.register("city")} placeholder="London" />
                </div>
                <div className="space-y-1.5">
                  <Label>Postcode</Label>
                  <Input {...f2.register("postcode")} placeholder="E14 5AB" />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label>Country</Label>
                <Input {...f2.register("country")} defaultValue="United Kingdom" />
              </div>
              <Separator />
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label>LinkedIn URL</Label>
                  <Input {...f2.register("linkedin")} placeholder="linkedin.com/in/sarah-chen" />
                </div>
                <div className="space-y-1.5">
                  <Label>Twitter / X</Label>
                  <Input {...f2.register("twitter")} placeholder="@sarahchen" />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label>Notes</Label>
                <Textarea {...f2.register("notes")} placeholder="Any relevant notes…" rows={3} />
              </div>
            </CardContent>
          </Card>
          <div className="flex items-center justify-between mt-4">
            <Button type="button" variant="outline" size="sm" onClick={() => setStep(0)}><ChevronLeft className="h-4 w-4 mr-1" />Back</Button>
            <Button type="submit" size="sm">Next <ChevronRight className="h-4 w-4 ml-1" /></Button>
          </div>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={f3.handleSubmit(d => { setD3(d); setStep(3) })}>
          <Card className="border border-[var(--border)]">
            <CardHeader><CardTitle className="text-base">Assignment</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <Label>Owner <span className="text-red-500">*</span></Label>
                <Select defaultValue="Alex Turner" onValueChange={v => f3.setValue("owner", v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {["Alex Turner","Sarah Mitchell","James Park","Chloe Evans","Tom Bradley"].map(o => (
                      <SelectItem key={o} value={o}>{o}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {f3.formState.errors.owner && <p className="text-xs text-red-500">{f3.formState.errors.owner.message}</p>}
              </div>
              <div className="space-y-1.5">
                <Label>Tags (comma separated)</Label>
                <Input {...f3.register("tags")} placeholder="enterprise, decision-maker, Q3" />
              </div>
            </CardContent>
          </Card>
          <div className="flex items-center justify-between mt-4">
            <Button type="button" variant="outline" size="sm" onClick={() => setStep(1)}><ChevronLeft className="h-4 w-4 mr-1" />Back</Button>
            <Button type="submit" size="sm">Next <ChevronRight className="h-4 w-4 ml-1" /></Button>
          </div>
        </form>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <Card className="border border-[var(--border)]">
            <CardHeader><CardTitle className="text-base">Review Contact</CardTitle></CardHeader>
            <CardContent className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm">
              {[
                ["Name", `${d1.firstName} ${d1.lastName || ""}`.trim()],
                ["Email", d1.email],
                ["Phone", d1.phone || "—"],
                ["Job Title", d1.jobTitle || "—"],
                ["Account", d1.account || "—"],
                ["City", d2.city || "—"],
                ["Country", d2.country || "United Kingdom"],
                ["Owner", d3.owner],
                ["Tags", d3.tags || "—"],
              ].map(([label, value]) => (
                <div key={label as string}>
                  <p className="text-xs text-[var(--muted-foreground)] font-medium">{label}</p>
                  <p className="text-sm text-[var(--foreground)] font-medium mt-0.5">{value as string}</p>
                </div>
              ))}
            </CardContent>
          </Card>
          <div className="flex items-center justify-between">
            <Button variant="outline" size="sm" onClick={() => setStep(2)}><ChevronLeft className="h-4 w-4 mr-1" />Back</Button>
            <Button size="sm" onClick={create} disabled={saving}>
              {saving ? <><Loader2 className="h-4 w-4 mr-1.5 animate-spin" />Creating…</> : <><Check className="h-4 w-4 mr-1.5" />Create Contact</>}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
