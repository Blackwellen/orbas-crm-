"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
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
  CheckCircle2,
  Lock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface AppDef {
  id: string
  name: string
  description: string
  icon: React.ElementType
  gradient: string
  required: boolean
}

const APPS: AppDef[] = [
  { id: "home", name: "Home", description: "Your personal dashboard and work queue", icon: LayoutDashboard, gradient: "from-blue-500 to-blue-600", required: true },
  { id: "crm", name: "CRM", description: "Contacts, companies, deals and pipeline", icon: Users, gradient: "from-indigo-500 to-indigo-600", required: true },
  { id: "accounting", name: "Accounting", description: "Invoices, expenses and financial reports", icon: DollarSign, gradient: "from-emerald-500 to-emerald-600", required: false },
  { id: "operations", name: "Operations", description: "Processes, workflows and automations", icon: Settings, gradient: "from-orange-500 to-orange-600", required: false },
  { id: "projects", name: "Projects", description: "Project management, tasks and milestones", icon: FolderKanban, gradient: "from-violet-500 to-violet-600", required: false },
  { id: "field-service", name: "Field Service", description: "Job scheduling and technician dispatch", icon: Wrench, gradient: "from-yellow-500 to-yellow-600", required: false },
  { id: "people", name: "People", description: "HR, recruitment and employee management", icon: UserCheck, gradient: "from-pink-500 to-pink-600", required: false },
  { id: "service", name: "Service", description: "Support tickets, SLAs and customer service", icon: HeadphonesIcon, gradient: "from-cyan-500 to-cyan-600", required: false },
  { id: "connect", name: "Connect", description: "Team messaging and collaboration", icon: MessageSquare, gradient: "from-teal-500 to-teal-600", required: false },
  { id: "analytics", name: "Analytics", description: "Advanced reporting and business intelligence", icon: BarChart3, gradient: "from-blue-600 to-purple-600", required: false },
  { id: "documents", name: "Documents", description: "Document library, templates and e-sign", icon: FileText, gradient: "from-slate-500 to-slate-600", required: false },
  { id: "compliance", name: "Compliance", description: "Audits, risk management and policy tools", icon: ShieldCheck, gradient: "from-red-500 to-red-600", required: false },
  { id: "charity", name: "Charity", description: "Donation tracking and grant management", icon: Heart, gradient: "from-rose-500 to-rose-600", required: false },
]

export default function OnboardingAppsPage() {
  const router = useRouter()
  const [selected, setSelected] = React.useState<Set<string>>(
    new Set(APPS.filter((a) => a.required).map((a) => a.id))
  )

  function toggle(id: string) {
    const app = APPS.find((a) => a.id === id)
    if (app?.required) return
    setSelected((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  function handleContinue() {
    // Persist selection to localStorage for the finish step
    localStorage.setItem("onboarding_apps", JSON.stringify([...selected]))
    router.push("/onboarding/team")
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[var(--foreground)]">Choose your apps</h1>
        <p className="mt-1 text-sm text-[var(--muted-foreground)]">
          Select the modules you want to enable. You can change this at any time.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {APPS.map((app) => {
          const isSelected = selected.has(app.id)
          const Icon = app.icon
          return (
            <button
              key={app.id}
              onClick={() => toggle(app.id)}
              disabled={app.required}
              className={cn(
                "relative flex items-start gap-3 rounded-xl border-2 p-4 text-left transition-all",
                isSelected
                  ? "border-[var(--primary)] bg-[var(--primary)]/5"
                  : "border-[var(--border)] bg-[var(--background)] hover:border-[var(--primary)]/50",
                app.required && "opacity-90 cursor-default"
              )}
            >
              <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br", app.gradient)}>
                <Icon className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-semibold text-[var(--foreground)]">{app.name}</span>
                  {app.required && (
                    <span className="flex items-center gap-0.5 text-[10px] font-medium text-[var(--muted-foreground)]">
                      <Lock className="h-2.5 w-2.5" />Required
                    </span>
                  )}
                </div>
                <p className="mt-0.5 text-xs text-[var(--muted-foreground)] leading-relaxed">{app.description}</p>
              </div>
              {isSelected && (
                <CheckCircle2 className="absolute top-3 right-3 h-4 w-4 text-[var(--primary)] shrink-0" />
              )}
            </button>
          )
        })}
      </div>

      <div className="flex items-center justify-between pt-2">
        <span className="text-sm text-[var(--muted-foreground)]">
          {selected.size} app{selected.size !== 1 ? "s" : ""} selected
        </span>
        <Button onClick={handleContinue} size="lg" className="min-w-36">
          Continue
        </Button>
      </div>
    </div>
  )
}
