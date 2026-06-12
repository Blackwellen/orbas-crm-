"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Loader2, AlertCircle, KeyRound, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createClient } from "@/lib/supabase/client"

export default function MFARecoveryPage() {
  const router = useRouter()
  const [code, setCode] = React.useState("")
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  function formatCode(raw: string) {
    const stripped = raw.replace(/[^a-zA-Z0-9]/g, "").toUpperCase().slice(0, 8)
    if (stripped.length > 4) return `${stripped.slice(0, 4)}-${stripped.slice(4)}`
    return stripped
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const stripped = code.replace(/-/g, "")
    if (stripped.length < 8) return
    setLoading(true)
    setError(null)
    const supabase = createClient()
    const { data: user } = await supabase.auth.getUser()
    if (!user?.user?.email) {
      setError("Could not determine your account. Please sign in again.")
      setLoading(false)
      return
    }
    const { error: verifyError } = await supabase.auth.verifyOtp({
      email: user.user.email,
      token: stripped,
      type: "recovery",
    })
    setLoading(false)
    if (verifyError) {
      setError(verifyError.message)
      return
    }
    router.push("/app/home")
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center gap-3 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--primary)]/10">
          <KeyRound className="h-7 w-7 text-[var(--primary)]" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-[var(--foreground)]">Use a recovery code</h2>
          <p className="mt-1 text-sm text-[var(--muted-foreground)]">
            Enter one of your 8-character recovery codes in the format{" "}
            <span className="font-mono font-medium">XXXX-XXXX</span>
          </p>
        </div>
      </div>

      {error && (
        <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-400">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="recovery-code">Recovery code</Label>
          <Input
            id="recovery-code"
            type="text"
            placeholder="XXXX-XXXX"
            value={code}
            onChange={(e) => setCode(formatCode(e.target.value))}
            className="text-center font-mono text-lg tracking-widest"
            autoComplete="off"
            spellCheck={false}
          />
        </div>

        <Button
          type="submit"
          className="w-full"
          size="lg"
          disabled={loading || code.replace(/-/g, "").length < 8}
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Verifying…
            </>
          ) : (
            "Verify recovery code"
          )}
        </Button>
      </form>

      <p className="text-center text-sm text-[var(--muted-foreground)]">
        <Link
          href="/mfa"
          className="inline-flex items-center gap-1 text-[var(--primary)] hover:underline"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to authenticator
        </Link>
      </p>
    </div>
  )
}
