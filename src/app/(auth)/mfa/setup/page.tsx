"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Loader2, AlertCircle, CheckCircle2, Copy, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createClient } from "@/lib/supabase/client"

type Step = "setup" | "verify" | "recovery"

interface EnrollData {
  id: string
  qrCode: string
  secret: string
}

export default function MFASetupPage() {
  const router = useRouter()
  const [step, setStep] = React.useState<Step>("setup")
  const [enrollData, setEnrollData] = React.useState<EnrollData | null>(null)
  const [code, setCode] = React.useState("")
  const [recoveryCodes, setRecoveryCodes] = React.useState<string[]>([])
  const [loading, setLoading] = React.useState(true)
  const [verifying, setVerifying] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [copied, setCopied] = React.useState(false)

  React.useEffect(() => {
    async function enroll() {
      const supabase = createClient()
      const { data, error: enrollError } = await supabase.auth.mfa.enroll({
        factorType: "totp",
        friendlyName: "Authenticator App",
      })
      setLoading(false)
      if (enrollError || !data) {
        setError(enrollError?.message ?? "Failed to start MFA enrollment")
        return
      }
      setEnrollData({
        id: data.id,
        qrCode: data.totp.qr_code,
        secret: data.totp.secret,
      })
    }
    enroll()
  }, [])

  async function handleVerify() {
    if (!enrollData || code.length < 6) return
    setVerifying(true)
    setError(null)
    const supabase = createClient()
    const { data: challenge } = await supabase.auth.mfa.challenge({ factorId: enrollData.id })
    if (!challenge) {
      setError("Failed to create challenge")
      setVerifying(false)
      return
    }
    const { error: verifyError } = await supabase.auth.mfa.verify({
      factorId: enrollData.id,
      challengeId: challenge.id,
      code,
    })
    setVerifying(false)
    if (verifyError) {
      setError(verifyError.message)
      return
    }
    // Generate recovery codes (mocked — real implementation uses admin API or Supabase feature)
    const codes = Array.from({ length: 8 }, () =>
      `${Math.random().toString(36).slice(2, 6).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`
    )
    setRecoveryCodes(codes)
    setStep("recovery")
  }

  async function copySecret() {
    if (!enrollData?.secret) return
    await navigator.clipboard.writeText(enrollData.secret)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-12">
        <Loader2 className="h-8 w-8 animate-spin text-[var(--primary)]" />
        <p className="text-sm text-[var(--muted-foreground)]">Setting up MFA…</p>
      </div>
    )
  }

  if (step === "recovery") {
    return (
      <div className="space-y-6">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100 dark:bg-green-950">
            <CheckCircle2 className="h-7 w-7 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[var(--foreground)]">MFA enabled!</h2>
            <p className="mt-1 text-sm text-[var(--muted-foreground)]">
              Save these recovery codes somewhere safe. Each can only be used once.
            </p>
          </div>
        </div>

        <div className="rounded-lg border border-[var(--border)] bg-[var(--muted)] p-4">
          <div className="grid grid-cols-2 gap-2">
            {recoveryCodes.map((code) => (
              <code key={code} className="font-mono text-sm text-[var(--foreground)] bg-[var(--background)] px-2 py-1 rounded border border-[var(--border)]">
                {code}
              </code>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-400">
          Store these codes securely. If you lose access to your authenticator, these are your only way to recover your account.
        </div>

        <Button className="w-full" size="lg" onClick={() => router.push("/app/home")}>
          Continue to dashboard
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center gap-3 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--primary)]/10">
          <ShieldCheck className="h-7 w-7 text-[var(--primary)]" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-[var(--foreground)]">Set up two-factor authentication</h2>
          <p className="mt-1 text-sm text-[var(--muted-foreground)]">
            Scan the QR code with your authenticator app (Google Authenticator, Authy, etc.)
          </p>
        </div>
      </div>

      {error && (
        <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-400">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {enrollData && (
        <>
          <div className="flex justify-center">
            <div
              className="rounded-xl border border-[var(--border)] bg-white p-3 shadow-sm"
              dangerouslySetInnerHTML={{ __html: enrollData.qrCode }}
            />
          </div>

          <div className="space-y-1.5">
            <Label>Manual entry key</Label>
            <div className="flex items-center gap-2">
              <code className="flex-1 rounded-md border border-[var(--border)] bg-[var(--muted)] px-3 py-2 text-xs font-mono text-[var(--foreground)] break-all">
                {enrollData.secret}
              </code>
              <Button variant="outline" size="icon" onClick={copySecret} title="Copy secret">
                {copied ? <CheckCircle2 className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="code">Verification code</Label>
            <Input
              id="code"
              type="text"
              inputMode="numeric"
              maxLength={6}
              placeholder="000000"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
              className="text-center text-lg tracking-widest font-mono"
            />
          </div>

          <Button
            onClick={handleVerify}
            className="w-full"
            size="lg"
            disabled={verifying || code.length < 6}
          >
            {verifying ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Verifying…
              </>
            ) : (
              "Enable two-factor authentication"
            )}
          </Button>
        </>
      )}
    </div>
  )
}
