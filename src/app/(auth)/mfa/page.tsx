"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Loader2, AlertCircle, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"

export default function MFAPage() {
  const router = useRouter()
  const [digits, setDigits] = React.useState<string[]>(Array(6).fill(""))
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const inputRefs = React.useRef<(HTMLInputElement | null)[]>([])

  function handleChange(index: number, value: string) {
    const sanitized = value.replace(/\D/g, "").slice(-1)
    const next = [...digits]
    next[index] = sanitized
    setDigits(next)
    if (sanitized && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  function handleKeyDown(index: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  function handlePaste(e: React.ClipboardEvent) {
    e.preventDefault()
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6)
    const next = Array(6).fill("")
    pasted.split("").forEach((char, i) => { next[i] = char })
    setDigits(next)
    const focusIndex = Math.min(pasted.length, 5)
    inputRefs.current[focusIndex]?.focus()
  }

  async function handleVerify() {
    const code = digits.join("")
    if (code.length < 6) return
    setLoading(true)
    setError(null)
    const supabase = createClient()
    const { data: factorsData } = await supabase.auth.mfa.listFactors()
    const totpFactor = factorsData?.totp?.[0]
    if (!totpFactor) {
      setError("No MFA factor found. Please set up MFA first.")
      setLoading(false)
      return
    }
    const { data: challenge } = await supabase.auth.mfa.challenge({ factorId: totpFactor.id })
    if (!challenge) {
      setError("Failed to create MFA challenge.")
      setLoading(false)
      return
    }
    const { error: verifyError } = await supabase.auth.mfa.verify({
      factorId: totpFactor.id,
      challengeId: challenge.id,
      code,
    })
    setLoading(false)
    if (verifyError) {
      setError(verifyError.message)
      setDigits(Array(6).fill(""))
      inputRefs.current[0]?.focus()
      return
    }
    router.push("/app/home")
  }

  React.useEffect(() => {
    if (digits.every((d) => d !== "") && !loading) {
      handleVerify()
    }
  }, [digits])

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center gap-3 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--primary)]/10">
          <ShieldCheck className="h-7 w-7 text-[var(--primary)]" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-[var(--foreground)]">Two-factor authentication</h2>
          <p className="mt-1 text-sm text-[var(--muted-foreground)]">
            Enter the 6-digit code from your authenticator app
          </p>
        </div>
      </div>

      {error && (
        <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-400">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="flex justify-center gap-2.5" onPaste={handlePaste}>
        {digits.map((digit, i) => (
          <input
            key={i}
            ref={(el) => { inputRefs.current[i] = el }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            className="h-12 w-12 rounded-lg border border-[var(--border)] bg-[var(--background)] text-center text-xl font-semibold text-[var(--foreground)] outline-none ring-[var(--ring)] focus:ring-2 transition-shadow"
            aria-label={`Digit ${i + 1}`}
          />
        ))}
      </div>

      <Button
        onClick={handleVerify}
        className="w-full"
        size="lg"
        disabled={loading || digits.some((d) => !d)}
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Verifying…
          </>
        ) : (
          "Verify"
        )}
      </Button>

      <p className="text-center text-sm text-[var(--muted-foreground)]">
        Lost access to your authenticator?{" "}
        <Link href="/mfa/recovery" className="text-[var(--primary)] hover:underline">
          Use a recovery code
        </Link>
      </p>
    </div>
  )
}
