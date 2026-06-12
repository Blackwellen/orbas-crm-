"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Loader2, Building2 } from "lucide-react"
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

const COMPANY_TYPES = ["SMB", "Enterprise", "Nonprofit", "Government", "Other"]

const INDUSTRIES = [
  "Technology",
  "Finance & Banking",
  "Healthcare",
  "Retail & eCommerce",
  "Manufacturing",
  "Construction",
  "Professional Services",
  "Education",
  "Real Estate",
  "Media & Entertainment",
  "Logistics & Transport",
  "Other",
]

const TEAM_SIZES = ["1-5", "6-15", "16-50", "51-200", "201-500", "500+"]

const schema = z.object({
  name: z.string().min(2, "Workspace name is required"),
  slug: z.string().min(2, "Slug is required").regex(/^[a-z0-9-]+$/, "Only lowercase letters, numbers, and hyphens"),
  companyType: z.string().min(1, "Please select a company type"),
  industry: z.string().min(1, "Please select an industry"),
  teamSize: z.string().min(1, "Please select a team size"),
})

type Values = z.infer<typeof schema>

function toSlug(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "")
}

export default function OnboardingWorkspacePage() {
  const router = useRouter()
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [slugManual, setSlugManual] = React.useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { companyType: "", industry: "", teamSize: "" },
  })

  const nameValue = watch("name")
  const companyType = watch("companyType")
  const industry = watch("industry")
  const teamSize = watch("teamSize")

  React.useEffect(() => {
    if (!slugManual && nameValue) {
      setValue("slug", toSlug(nameValue), { shouldValidate: true })
    }
  }, [nameValue, slugManual])

  async function onSubmit(values: Values) {
    setLoading(true)
    setError(null)
    const supabase = createClient()
    const { data: userData } = await supabase.auth.getUser()
    if (!userData.user) { setLoading(false); setError("Not authenticated"); return }
    const { error: insertError } = await supabase.from("workspaces").insert({
      name: values.name,
      slug: values.slug,
      company_type: values.companyType,
      industry: values.industry,
      team_size: values.teamSize,
      owner_id: userData.user.id,
      plan: "trial",
    })
    setLoading(false)
    if (insertError) { setError(insertError.message); return }
    router.push("/onboarding/apps")
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--primary)]/10">
          <Building2 className="h-5 w-5 text-[var(--primary)]" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-[var(--foreground)]">Your workspace</h1>
          <p className="text-sm text-[var(--muted-foreground)]">Set up your organisation&apos;s workspace</p>
        </div>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="space-y-1.5">
          <Label htmlFor="name">Workspace name <span className="text-[var(--destructive)]">*</span></Label>
          <Input id="name" placeholder="Acme Corp" {...register("name")} />
          {errors.name && <p className="text-xs text-[var(--destructive)]">{errors.name.message}</p>}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="slug">
            Workspace URL slug <span className="text-[var(--destructive)]">*</span>
          </Label>
          <div className="flex items-center rounded-md border border-[var(--border)] overflow-hidden focus-within:ring-2 focus-within:ring-[var(--ring)]">
            <span className="bg-[var(--muted)] px-3 py-2 text-sm text-[var(--muted-foreground)] border-r border-[var(--border)] shrink-0">
              orbas.app/
            </span>
            <input
              id="slug"
              className="flex-1 bg-transparent px-3 py-2 text-sm text-[var(--foreground)] outline-none"
              placeholder="acme-corp"
              {...register("slug")}
              onChange={(e) => {
                setSlugManual(true)
                setValue("slug", e.target.value, { shouldValidate: true })
              }}
            />
          </div>
          {errors.slug && <p className="text-xs text-[var(--destructive)]">{errors.slug.message}</p>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label>Company type <span className="text-[var(--destructive)]">*</span></Label>
            <Select value={companyType} onValueChange={(v) => setValue("companyType", v, { shouldValidate: true })}>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                {COMPANY_TYPES.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
              </SelectContent>
            </Select>
            {errors.companyType && <p className="text-xs text-[var(--destructive)]">{errors.companyType.message}</p>}
          </div>

          <div className="space-y-1.5">
            <Label>Team size <span className="text-[var(--destructive)]">*</span></Label>
            <Select value={teamSize} onValueChange={(v) => setValue("teamSize", v, { shouldValidate: true })}>
              <SelectTrigger>
                <SelectValue placeholder="Select size" />
              </SelectTrigger>
              <SelectContent>
                {TEAM_SIZES.map((s) => <SelectItem key={s} value={s}>{s} people</SelectItem>)}
              </SelectContent>
            </Select>
            {errors.teamSize && <p className="text-xs text-[var(--destructive)]">{errors.teamSize.message}</p>}
          </div>
        </div>

        <div className="space-y-1.5">
          <Label>Industry <span className="text-[var(--destructive)]">*</span></Label>
          <Select value={industry} onValueChange={(v) => setValue("industry", v, { shouldValidate: true })}>
            <SelectTrigger>
              <SelectValue placeholder="Select industry" />
            </SelectTrigger>
            <SelectContent>
              {INDUSTRIES.map((ind) => <SelectItem key={ind} value={ind}>{ind}</SelectItem>)}
            </SelectContent>
          </Select>
          {errors.industry && <p className="text-xs text-[var(--destructive)]">{errors.industry.message}</p>}
        </div>

        <div className="pt-2">
          <Button type="submit" className="w-full" size="lg" disabled={loading}>
            {loading ? <><Loader2 className="h-4 w-4 animate-spin" />Creating workspace…</> : "Create workspace & continue"}
          </Button>
        </div>
      </form>
    </div>
  )
}
