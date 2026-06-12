"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Image from "next/image"

const STEPS = [
  { label: "Profile", path: "/onboarding/profile" },
  { label: "Workspace", path: "/onboarding/workspace" },
  { label: "Apps", path: "/onboarding/apps" },
  { label: "Team", path: "/onboarding/team" },
  { label: "Finish", path: "/onboarding/finish" },
]

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()

  const currentIndex = STEPS.findIndex((s) => pathname.startsWith(s.path))
  const effectiveIndex = currentIndex === -1 ? 0 : currentIndex
  const isFirst = effectiveIndex === 0
  const isLast = effectiveIndex === STEPS.length - 1

  function goBack() {
    if (!isFirst) router.push(STEPS[effectiveIndex - 1].path)
  }

  function goNext() {
    if (!isLast) router.push(STEPS[effectiveIndex + 1].path)
  }

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      {/* Top bar */}
      <header className="h-14 border-b border-[var(--border)] flex items-center px-6 shrink-0">
        <Link href="/" className="mr-8">
          <Image src="/orbas crm logo.png" alt="Orbas CRM" width={110} height={32} className="object-contain" />
        </Link>
        <span className="text-sm text-[var(--muted-foreground)]">Set up your account</span>
      </header>

      {/* Progress stepper */}
      <div className="border-b border-[var(--border)] bg-[var(--muted)]/40 py-4 shrink-0">
        <div className="mx-auto max-w-2xl px-6">
          <div className="flex items-center justify-between">
            {STEPS.map((step, i) => {
              const done = i < effectiveIndex
              const active = i === effectiveIndex
              const last = i === STEPS.length - 1
              return (
                <React.Fragment key={step.label}>
                  <div className="flex flex-col items-center gap-1.5">
                    <div
                      className={cn(
                        "flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm font-semibold transition-colors",
                        done
                          ? "border-[var(--primary)] bg-[var(--primary)] text-white"
                          : active
                          ? "border-[var(--primary)] bg-[var(--primary)]/10 text-[var(--primary)]"
                          : "border-[var(--border)] bg-[var(--background)] text-[var(--muted-foreground)]"
                      )}
                    >
                      {done ? <CheckCircle2 className="h-4 w-4" /> : i + 1}
                    </div>
                    <span
                      className={cn(
                        "text-xs font-medium hidden sm:block",
                        active ? "text-[var(--primary)]" : done ? "text-[var(--foreground)]" : "text-[var(--muted-foreground)]"
                      )}
                    >
                      {step.label}
                    </span>
                  </div>
                  {!last && (
                    <div
                      className={cn(
                        "flex-1 mx-2 mt-[-12px] h-0.5 transition-colors",
                        done ? "bg-[var(--primary)]" : "bg-[var(--border)]"
                      )}
                    />
                  )}
                </React.Fragment>
              )
            })}
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-2xl px-6 py-8">
          {children}
        </div>
      </main>

      {/* Bottom nav */}
      {!isLast && (
        <footer className="border-t border-[var(--border)] bg-[var(--background)] px-6 py-4 shrink-0">
          <div className="mx-auto max-w-2xl flex items-center justify-between">
            <Button
              variant="outline"
              onClick={goBack}
              disabled={isFirst}
              className="min-w-24"
            >
              Back
            </Button>
            <span className="text-xs text-[var(--muted-foreground)]">
              Step {effectiveIndex + 1} of {STEPS.length}
            </span>
            <Button
              onClick={goNext}
              className="min-w-24"
            >
              Next
            </Button>
          </div>
        </footer>
      )}
    </div>
  )
}
