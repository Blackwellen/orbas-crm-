"use client"

import * as React from "react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Loader2, Mail, ArrowLeft, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createClient } from "@/lib/supabase/client"

const schema = z.object({
  email: z.string().email("Please enter a valid email address"),
})

type Values = z.infer<typeof schema>

export default function ForgotPasswordPage() {
  const [sent, setSent] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [submittedEmail, setSubmittedEmail] = React.useState("")

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Values>({
    resolver: zodResolver(schema),
  })

  async function onSubmit(values: Values) {
    setLoading(true)
    const supabase = createClient()
    await supabase.auth.resetPasswordForEmail(values.email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })
    setLoading(false)
    setSubmittedEmail(values.email)
    setSent(true)
  }

  if (sent) {
    return (
      <div className="space-y-6 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-950">
          <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-[var(--foreground)]">Check your email</h2>
          <p className="text-sm text-[var(--muted-foreground)]">
            We&apos;ve sent a password reset link to
          </p>
          <p className="font-medium text-[var(--foreground)]">{submittedEmail}</p>
        </div>
        <p className="text-xs text-[var(--muted-foreground)]">
          Didn&apos;t receive it? Check your spam folder or{" "}
          <button
            onClick={() => setSent(false)}
            className="text-[var(--primary)] hover:underline"
          >
            try again
          </button>
          .
        </p>
        <Link href="/login">
          <Button variant="outline" className="w-full">
            <ArrowLeft className="h-4 w-4" />
            Back to sign in
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-bold text-[var(--foreground)]">Forgot your password?</h2>
        <p className="text-sm text-[var(--muted-foreground)]">
          Enter your email and we&apos;ll send you a reset link
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="email">Email address</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--muted-foreground)]" />
            <Input
              id="email"
              type="email"
              placeholder="you@company.com"
              className="pl-10"
              autoComplete="email"
              {...register("email")}
            />
          </div>
          {errors.email && (
            <p className="text-xs text-[var(--destructive)]">{errors.email.message}</p>
          )}
        </div>

        <Button type="submit" className="w-full" disabled={loading} size="lg">
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Sending link…
            </>
          ) : (
            "Send reset link"
          )}
        </Button>
      </form>

      <p className="text-center text-sm text-[var(--muted-foreground)]">
        <Link
          href="/login"
          className="inline-flex items-center gap-1 text-[var(--primary)] hover:underline"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to sign in
        </Link>
      </p>
    </div>
  )
}
