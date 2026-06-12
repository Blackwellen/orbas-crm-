"use client"

import * as React from "react"
import Link from "next/link"
import { Mail, Loader2, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"

export default function VerifyEmailPage() {
  const [resending, setResending] = React.useState(false)
  const [resent, setResent] = React.useState(false)
  const [email, setEmail] = React.useState<string | null>(null)

  React.useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data }) => {
      if (data.user?.email) setEmail(data.user.email)
    })
  }, [])

  async function handleResend() {
    if (!email) return
    setResending(true)
    const supabase = createClient()
    await supabase.auth.resend({ type: "signup", email })
    setResending(false)
    setResent(true)
    setTimeout(() => setResent(false), 5000)
  }

  return (
    <div className="space-y-6 text-center">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[var(--primary)]/10">
        <Mail className="h-10 w-10 text-[var(--primary)]" />
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-[var(--foreground)]">Check your email</h2>
        <p className="text-sm text-[var(--muted-foreground)]">
          We&apos;ve sent a verification link to
        </p>
        {email && (
          <p className="font-semibold text-[var(--foreground)]">{email}</p>
        )}
        <p className="text-sm text-[var(--muted-foreground)]">
          Click the link in the email to activate your account.
        </p>
      </div>

      <div className="rounded-lg border border-[var(--border)] bg-[var(--muted)] p-4 text-left space-y-2">
        <p className="text-xs font-medium text-[var(--foreground)]">Didn&apos;t get the email?</p>
        <ul className="text-xs text-[var(--muted-foreground)] space-y-1 list-disc list-inside">
          <li>Check your spam or junk folder</li>
          <li>Make sure the email address above is correct</li>
          <li>Allow a few minutes for delivery</li>
        </ul>
      </div>

      {resent && (
        <div className="flex items-center gap-2 justify-center text-sm text-green-600 dark:text-green-400">
          <CheckCircle2 className="h-4 w-4" />
          Verification email resent successfully
        </div>
      )}

      <div className="space-y-3">
        <Button
          onClick={handleResend}
          variant="outline"
          className="w-full"
          disabled={resending || !email}
        >
          {resending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Resending…
            </>
          ) : (
            "Resend verification email"
          )}
        </Button>

        <Link href="/login">
          <Button variant="ghost" className="w-full text-[var(--muted-foreground)]">
            Back to sign in
          </Button>
        </Link>
      </div>
    </div>
  )
}
