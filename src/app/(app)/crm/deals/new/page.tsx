"use client"

import React, { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { ChevronLeft, ChevronRight, Check, FileText, GitBranch, Users, ClipboardList, Loader2 } from "lucide-react"
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
  name:      z.string().min(1, "Deal name is required"),
  account:   z.string().min(1, "Account is required"),
  contact:   z.string().optional(),
  value:     z.string().min(1, "Value is required"),
  currency:  z.enum(["GBP","USD","EUR"]),
})

const step2Schema = z.object({
  pipeline:    z.string().min(1, "Pipeline is required"),
  stage:       z.string().min(1, "Stage is required"),
  probability: z.string(),
  closeDate:   z.string().min(1, "Close date is required"),
})

const step3Schema = z.object({
  owner:       z.string().min(1, "Owner is required"),
  coOwner:     z.string().optional(),
  description: z.string().optional(),
  tags:        z.string().optional(),
})

type S1 = z.infer<typeof step1Schema>
type S2 = z.infer<typeof step2Schema>
type S3 = z.infer<typeof step3Schema>

const STEPS = [
  { label: "Deal Info",  icon: FileText },
  { label: "Pipeline",   icon: GitBranch },
  { label: "Team",       icon: Users },
  { label: "Review",     icon: ClipboardList },
]

export default function NewDealPage() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [d1, setD1] = useState<Partial<S1>>({})
  const [d2, setD2] = useState<Partial<S2>>({})
  const [d3, setD3] = useState<Partial<S3>>({})
  const [saving, setSaving] = useState(false)
  const { toast } = useToast()

  const f1 = useForm<S1>({ resolver: zodResolver(step1Schema), defaultValues: { currency: "GBP", ...d1 } })
  const f2 = useForm<S2>({ resolver: zodResolver(step2Schema), defaultValues: { pipeline: "Main Sales Pipeline", stage: "Prospecting", probability: "25", ...d2 } })
  const f3 = useForm<S3>({ resolver: zodResolver(step3Schema), defaultValues: { owner: "Alex Turner", ...d3 } })

  async function create() {
    setSaving(true)
    await new Promise(r => setTimeout(r, 1100))
    setSaving(false)
    toast({ title: "Deal created", description: `${d1.name} has been created.` })
    router.push("/app/crm/deals")
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Button variant="ghost" size="sm" asChild className="text-[var(--muted-foreground)]">
          <Link href="/app/crm/deals"><ChevronLeft className="h-4 w-4 mr-1" />Back</Link>
        </Button>
        <h1 className="text-xl font-bold">New Deal</h1>
      </div>

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
            <CardHeader><CardTitle className="text-base">Deal Information</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <Label>Deal Name <span className="text-red-500">*</span></Label>
                <Input {...f1.register("name")} placeholder="Enterprise SaaS Rollout" />
                {f1.formState.errors.name && <p className="text-xs text-red-500">{f1.formState.errors.name.message}</p>}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label>Account <span className="text-red-500">*</span></Label>
                  <Select onValueChange={v => f1.setValue("account", v)}>
                    <SelectTrigger><SelectValue placeholder="Select account" /></SelectTrigger>
                    <SelectContent>
                      {["Fintech Corp Ltd","BlueWave Digital","TechGrid Ltd","Sandstone Corp","Vertex Solutions","Oakfield Media","Prism Analytics"].map(a => <SelectItem key={a} value={a}>{a}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  {f1.formState.errors.account && <p className="text-xs text-red-500">{f1.formState.errors.account.message}</p>}
                </div>
                <div className="space-y-1.5">
                  <Label>Contact</Label>
                  <Select onValueChange={v => f1.setValue("contact", v)}>
                    <SelectTrigger><SelectValue placeholder="Select contact" /></SelectTrigger>
                    <SelectContent>
                      {["Sarah Chen","Marcus Williams","Lucy Patterson","Robert Ashford","Natasha Patel"].map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label>Value <span className="text-red-500">*</span></Label>
                  <Input {...f1.register("value")} placeholder="95000" type="number" />
                  {f1.formState.errors.value && <p className="text-xs text-red-500">{f1.formState.errors.value.message}</p>}
                </div>
                <div className="space-y-1.5">
                  <Label>Currency</Label>
                  <Select defaultValue="GBP" onValueChange={v => f1.setValue("currency", v as any)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="GBP">GBP — British Pound</SelectItem>
                      <SelectItem value="USD">USD — US Dollar</SelectItem>
                      <SelectItem value="EUR">EUR — Euro</SelectItem>
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
            <CardHeader><CardTitle className="text-base">Pipeline & Stage</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label>Pipeline <span className="text-red-500">*</span></Label>
                  <Select defaultValue="Main Sales Pipeline" onValueChange={v => f2.setValue("pipeline", v)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {["Main Sales Pipeline","Enterprise","SMB","Partner Channel"].map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label>Stage <span className="text-red-500">*</span></Label>
                  <Select defaultValue="Prospecting" onValueChange={v => f2.setValue("stage", v)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {["Prospecting","Qualification","Proposal","Negotiation","Closing"].map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label>Probability (%)</Label>
                  <Input {...f2.register("probability")} type="number" min="0" max="100" defaultValue="25" />
                </div>
                <div className="space-y-1.5">
                  <Label>Expected Close Date <span className="text-red-500">*</span></Label>
                  <Input {...f2.register("closeDate")} type="date" />
                  {f2.formState.errors.closeDate && <p className="text-xs text-red-500">{f2.formState.errors.closeDate.message}</p>}
                </div>
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
            <CardHeader><CardTitle className="text-base">Team & Details</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label>Owner <span className="text-red-500">*</span></Label>
                  <Select defaultValue="Alex Turner" onValueChange={v => f3.setValue("owner", v)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {["Alex Turner","Sarah Mitchell","James Park","Chloe Evans","Tom Bradley"].map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  {f3.formState.errors.owner && <p className="text-xs text-red-500">{f3.formState.errors.owner.message}</p>}
                </div>
                <div className="space-y-1.5">
                  <Label>Co-Owner</Label>
                  <Select onValueChange={v => f3.setValue("coOwner", v)}>
                    <SelectTrigger><SelectValue placeholder="Optional" /></SelectTrigger>
                    <SelectContent>
                      {["Alex Turner","Sarah Mitchell","James Park","Chloe Evans","Tom Bradley"].map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-1.5">
                <Label>Tags</Label>
                <Input {...f3.register("tags")} placeholder="enterprise, Q3, upsell" />
              </div>
              <div className="space-y-1.5">
                <Label>Description</Label>
                <Textarea {...f3.register("description")} placeholder="Describe the deal opportunity…" rows={3} />
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
            <CardHeader><CardTitle className="text-base">Review Deal</CardTitle></CardHeader>
            <CardContent className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm">
              {[
                ["Deal Name", d1.name],
                ["Account", d1.account],
                ["Contact", d1.contact || "—"],
                ["Value", `${d1.currency} ${Number(d1.value || 0).toLocaleString()}`],
                ["Pipeline", d2.pipeline],
                ["Stage", d2.stage],
                ["Probability", `${d2.probability}%`],
                ["Close Date", d2.closeDate],
                ["Owner", d3.owner],
                ["Tags", d3.tags || "—"],
              ].map(([label, value]) => (
                <div key={label as string}>
                  <p className="text-xs text-[var(--muted-foreground)] font-medium">{label}</p>
                  <p className="text-sm font-medium mt-0.5">{value as string}</p>
                </div>
              ))}
            </CardContent>
          </Card>
          <div className="flex items-center justify-between">
            <Button variant="outline" size="sm" onClick={() => setStep(2)}><ChevronLeft className="h-4 w-4 mr-1" />Back</Button>
            <Button size="sm" onClick={create} disabled={saving}>
              {saving ? <><Loader2 className="h-4 w-4 mr-1.5 animate-spin" />Creating…</> : <><Check className="h-4 w-4 mr-1.5" />Create Deal</>}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
