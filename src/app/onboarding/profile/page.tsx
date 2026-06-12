"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Loader2, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { createClient } from "@/lib/supabase/client"

const TIMEZONES = [
  "UTC",
  "Europe/London",
  "Europe/Paris",
  "Europe/Berlin",
  "America/New_York",
  "America/Chicago",
  "America/Denver",
  "America/Los_Angeles",
  "Asia/Dubai",
  "Asia/Singapore",
  "Asia/Tokyo",
  "Australia/Sydney",
]

const schema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  jobTitle: z.string().optional(),
  phone: z.string().optional(),
  timezone: z.string().min(1, "Please select a timezone"),
})

type Values = z.infer<typeof schema>

export default function OnboardingProfilePage() {
  const router = useRouter()
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { timezone: "Europe/London" },
  })

  const timezone = watch("timezone")

  React.useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data }) => {
      const meta = data.user?.user_metadata
      if (meta?.full_name) setValue("fullName", meta.full_name)
    })
  }, [])

  async function onSubmit(values: Values) {
    setLoading(true)
    setError(null)
    const supabase = createClient()
    const { data: userData } = await supabase.auth.getUser()
    if (!userData.user) { setLoading(false); setError("Not authenticated"); return }
    const { error: upsertError } = await supabase.from("profiles").upsert({
      id: userData.user.id,
      full_name: values.fullName,
      job_title: values.jobTitle,
      phone: values.phone,
      timezone: values.timezone,
      updated_at: new Date().toISOString(),
    })
    setLoading(false)
    if (upsertError) { setError(upsertError.message); return }
    router.push("/onboarding/workspace")
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--primary)]/10">
          <User className="h-5 w-5 text-[var(--primary)]" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-[var(--foreground)]">Your profile</h1>
          <p className="text-sm text-[var(--muted-foreground)]">Tell us a bit about yourself</p>
        </div>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="space-y-1.5">
          <Label htmlFor="fullName">Full name <span className="text-[var(--destructive)]">*</span></Label>
          <Input id="fullName" placeholder="Jane Smith" {...register("fullName")} />
          {errors.fullName && <p className="text-xs text-[var(--destructive)]">{errors.fullName.message}</p>}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="jobTitle">Job title</Label>
          <Input id="jobTitle" placeholder="e.g. Sales Director" {...register("jobTitle")} />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="phone">Phone number</Label>
          <Input id="phone" type="tel" placeholder="+44 7700 000000" {...register("phone")} />
        </div>

        <div className="space-y-1.5">
          <Label>Timezone <span className="text-[var(--destructive)]">*</span></Label>
          <Select value={timezone} onValueChange={(v) => setValue("timezone", v, { shouldValidate: true })}>
            <SelectTrigger>
              <SelectValue placeholder="Select timezone" />
            </SelectTrigger>
            <SelectContent>
              {TIMEZONES.map((tz) => (
                <SelectItem key={tz} value={tz}>{tz}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.timezone && <p className="text-xs text-[var(--destructive)]">{errors.timezone.message}</p>}
        </div>

        <div className="pt-2">
          <Button type="submit" className="w-full" size="lg" disabled={loading}>
            {loading ? <><Loader2 className="h-4 w-4 animate-spin" />Saving…</> : "Save & continue"}
          </Button>
        </div>
      </form>
    </div>
  )
}
