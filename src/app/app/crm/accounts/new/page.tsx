"use client"

import React, { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { ChevronLeft, Check, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"

const schema = z.object({
  name:     z.string().min(1, "Company name is required"),
  industry: z.string().min(1, "Industry is required"),
  type:     z.enum(["Prospect","Customer","Partner"]),
  website:  z.string().optional(),
  phone:    z.string().optional(),
  email:    z.string().email().optional().or(z.literal("")),
  address:  z.string().optional(),
  city:     z.string().optional(),
  postcode: z.string().optional(),
  country:  z.string().optional(),
  size:     z.string().optional(),
  revenue:  z.string().optional(),
  owner:    z.string().min(1, "Owner is required"),
  tags:     z.string().optional(),
})

type FormData = z.infer<typeof schema>

const INDUSTRIES = ["Financial Services","Technology","IT Consulting","Construction","Media & Marketing","Biotechnology","Data & Analytics","Legal Services","IT Infrastructure","Healthcare","Retail","Manufacturing","Education","Other"]

export default function NewAccountPage() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const { toast } = useToast()

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { type: "Prospect", owner: "Alex Turner", country: "United Kingdom" },
  })

  async function onSubmit(data: FormData) {
    setSaving(true)
    await new Promise(r => setTimeout(r, 1100))
    setSaving(false)
    toast({ title: "Account created", description: `${data.name} has been added.` })
    router.push("/app/crm/accounts")
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Button variant="ghost" size="sm" asChild className="text-[var(--muted-foreground)]">
          <Link href="/app/crm/accounts"><ChevronLeft className="h-4 w-4 mr-1" />Back</Link>
        </Button>
        <h1 className="text-xl font-bold">New Account</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Card className="border border-[var(--border)]">
          <CardHeader><CardTitle className="text-base">Company Details</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <Label>Company Name <span className="text-red-500">*</span></Label>
              <Input {...register("name")} placeholder="Fintech Corp Ltd" />
              {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>Industry <span className="text-red-500">*</span></Label>
                <Select onValueChange={v => setValue("industry", v)}>
                  <SelectTrigger><SelectValue placeholder="Select industry" /></SelectTrigger>
                  <SelectContent>
                    {INDUSTRIES.map(i => <SelectItem key={i} value={i}>{i}</SelectItem>)}
                  </SelectContent>
                </Select>
                {errors.industry && <p className="text-xs text-red-500">{errors.industry.message}</p>}
              </div>
              <div className="space-y-1.5">
                <Label>Type</Label>
                <Select defaultValue="Prospect" onValueChange={v => setValue("type", v as any)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {["Prospect","Customer","Partner"].map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>Website</Label>
                <Input {...register("website")} placeholder="https://company.co.uk" />
              </div>
              <div className="space-y-1.5">
                <Label>Phone</Label>
                <Input {...register("phone")} placeholder="+44 20 7123 4567" />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Email</Label>
              <Input type="email" {...register("email")} placeholder="info@company.co.uk" />
            </div>
          </CardContent>
        </Card>

        <Card className="border border-[var(--border)]">
          <CardHeader><CardTitle className="text-base">Address</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <Label>Address</Label>
              <Input {...register("address")} placeholder="1 Canary Wharf" />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <Label>City</Label>
                <Input {...register("city")} placeholder="London" />
              </div>
              <div className="space-y-1.5">
                <Label>Postcode</Label>
                <Input {...register("postcode")} placeholder="E14 5AB" />
              </div>
              <div className="space-y-1.5">
                <Label>Country</Label>
                <Input {...register("country")} defaultValue="United Kingdom" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-[var(--border)]">
          <CardHeader><CardTitle className="text-base">Business & Assignment</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>Company Size</Label>
                <Select onValueChange={v => setValue("size", v)}>
                  <SelectTrigger><SelectValue placeholder="Select size" /></SelectTrigger>
                  <SelectContent>
                    {["1–10","11–50","51–200","201–500","501–1000","1001–5000","5000+"].map(s => <SelectItem key={s} value={s}>{s} employees</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Annual Revenue</Label>
                <Input {...register("revenue")} placeholder="£5,000,000" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>Owner <span className="text-red-500">*</span></Label>
                <Select defaultValue="Alex Turner" onValueChange={v => setValue("owner", v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {["Alex Turner","Sarah Mitchell","James Park","Chloe Evans","Tom Bradley"].map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}
                  </SelectContent>
                </Select>
                {errors.owner && <p className="text-xs text-red-500">{errors.owner.message}</p>}
              </div>
              <div className="space-y-1.5">
                <Label>Tags</Label>
                <Input {...register("tags")} placeholder="enterprise, key-account" />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex items-center justify-between pt-2">
          <Button type="button" variant="outline" size="sm" asChild>
            <Link href="/app/crm/accounts">Cancel</Link>
          </Button>
          <Button type="submit" size="sm" disabled={saving}>
            {saving ? <><Loader2 className="h-4 w-4 mr-1.5 animate-spin" />Creating…</> : <><Check className="h-4 w-4 mr-1.5" />Create Account</>}
          </Button>
        </div>
      </form>
    </div>
  )
}
