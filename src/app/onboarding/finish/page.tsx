"use client"

import * as React from "react"
import Link from "next/link"
import {
  LayoutDashboard,
  Users,
  DollarSign,
  Settings,
  FolderKanban,
  Wrench,
  UserCheck,
  HeadphonesIcon,
  MessageSquare,
  BarChart3,
  FileText,
  ShieldCheck,
  Heart,
  ArrowRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const APP_META: Record<string, { name: string; icon: React.ElementType; gradient: string }> = {
  home: { name: "Home", icon: LayoutDashboard, gradient: "from-blue-500 to-blue-600" },
  crm: { name: "CRM", icon: Users, gradient: "from-indigo-500 to-indigo-600" },
  accounting: { name: "Accounting", icon: DollarSign, gradient: "from-emerald-500 to-emerald-600" },
  operations: { name: "Operations", icon: Settings, gradient: "from-orange-500 to-orange-600" },
  projects: { name: "Projects", icon: FolderKanban, gradient: "from-violet-500 to-violet-600" },
  "field-service": { name: "Field Service", icon: Wrench, gradient: "from-yellow-500 to-yellow-600" },
  people: { name: "People", icon: UserCheck, gradient: "from-pink-500 to-pink-600" },
  service: { name: "Service", icon: HeadphonesIcon, gradient: "from-cyan-500 to-cyan-600" },
  connect: { name: "Connect", icon: MessageSquare, gradient: "from-teal-500 to-teal-600" },
  analytics: { name: "Analytics", icon: BarChart3, gradient: "from-blue-600 to-purple-600" },
  documents: { name: "Documents", icon: FileText, gradient: "from-slate-500 to-slate-600" },
  compliance: { name: "Compliance", icon: ShieldCheck, gradient: "from-red-500 to-red-600" },
  charity: { name: "Charity", icon: Heart, gradient: "from-rose-500 to-rose-600" },
}

export default function OnboardingFinishPage() {
  const [enabledApps, setEnabledApps] = React.useState<string[]>(["home", "crm"])

  React.useEffect(() => {
    try {
      const stored = localStorage.getItem("onboarding_apps")
      if (stored) setEnabledApps(JSON.parse(stored))
    } catch {}
  }, [])

  return (
    <div className="space-y-8 text-center">
      {/* Animated checkmark */}
      <div className="flex justify-center">
        <div className="relative flex h-24 w-24 items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-green-100 dark:bg-green-950 animate-ping opacity-30" />
          <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-950">
            <svg
              className="h-10 w-10 text-green-600 dark:text-green-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ animation: "draw-check 0.5s ease-out 0.2s both" }}
            >
              <style>{`
                @keyframes draw-check {
                  from { stroke-dashoffset: 30; opacity: 0; }
                  to { stroke-dashoffset: 0; opacity: 1; }
                }
                .check-path { stroke-dasharray: 30; stroke-dashoffset: 30; animation: draw-check 0.5s ease-out 0.2s both; }
              `}</style>
              <path className="check-path" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-[var(--foreground)]">Your workspace is ready!</h1>
        <p className="text-[var(--muted-foreground)]">
          Everything is set up and ready to go. Here&apos;s what you&apos;ve enabled:
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-left">
        {enabledApps.map((appId) => {
          const meta = APP_META[appId]
          if (!meta) return null
          const Icon = meta.icon
          return (
            <div
              key={appId}
              className="flex items-center gap-2.5 rounded-lg border border-[var(--border)] bg-[var(--background)] p-3"
            >
              <div className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-gradient-to-br", meta.gradient)}>
                <Icon className="h-4 w-4 text-white" />
              </div>
              <span className="text-sm font-medium text-[var(--foreground)]">{meta.name}</span>
            </div>
          )
        })}
      </div>

      <div className="space-y-3 pt-4">
        <Link href="/app/home">
          <Button size="lg" className="w-full sm:w-auto sm:min-w-56 gap-2">
            Go to dashboard
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
        <p className="text-xs text-[var(--muted-foreground)]">
          You can add more apps and invite more team members from your workspace settings.
        </p>
      </div>
    </div>
  )
}
