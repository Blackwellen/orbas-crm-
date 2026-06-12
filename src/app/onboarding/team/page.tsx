"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Plus, Trash2, Loader2, Users, ArrowRight } from "lucide-react"
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

const ROLES = ["Admin", "Manager", "Member"]

interface InviteRow {
  id: string
  email: string
  role: string
  error?: string
}

function generateId() {
  return Math.random().toString(36).slice(2)
}

export default function OnboardingTeamPage() {
  const router = useRouter()
  const [rows, setRows] = React.useState<InviteRow[]>([
    { id: generateId(), email: "", role: "Member" },
  ])
  const [loading, setLoading] = React.useState(false)
  const [globalError, setGlobalError] = React.useState<string | null>(null)

  function addRow() {
    setRows((prev) => [...prev, { id: generateId(), email: "", role: "Member" }])
  }

  function removeRow(id: string) {
    setRows((prev) => prev.filter((r) => r.id !== id))
  }

  function updateRow(id: string, field: "email" | "role", value: string) {
    setRows((prev) =>
      prev.map((r) => (r.id === id ? { ...r, [field]: value, error: undefined } : r))
    )
  }

  function validate() {
    let valid = true
    const updated = rows.map((row) => {
      if (!row.email) return row
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(row.email)) {
        valid = false
        return { ...row, error: "Invalid email address" }
      }
      return row
    })
    setRows(updated)
    return valid
  }

  async function handleInvite() {
    const filled = rows.filter((r) => r.email.trim())
    if (filled.length === 0) {
      router.push("/onboarding/finish")
      return
    }
    if (!validate()) return
    setLoading(true)
    setGlobalError(null)
    const supabase = createClient()
    const { data: userData } = await supabase.auth.getUser()
    if (!userData.user) { setLoading(false); setGlobalError("Not authenticated"); return }

    const invites = filled.map((r) => ({
      email: r.email.trim(),
      role: r.role.toLowerCase(),
      invited_by: userData.user!.id,
      status: "pending",
    }))

    const { error: insertError } = await supabase.from("workspace_invites").insert(invites)
    setLoading(false)
    if (insertError) { setGlobalError(insertError.message); return }
    router.push("/onboarding/finish")
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--primary)]/10">
          <Users className="h-5 w-5 text-[var(--primary)]" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-[var(--foreground)]">Invite your team</h1>
          <p className="text-sm text-[var(--muted-foreground)]">Add team members to your workspace. You can always do this later.</p>
        </div>
      </div>

      {globalError && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {globalError}
        </div>
      )}

      <div className="space-y-3">
        <div className="hidden sm:grid sm:grid-cols-[1fr_140px_40px] gap-2 px-1">
          <Label className="text-xs">Email address</Label>
          <Label className="text-xs">Role</Label>
          <span />
        </div>

        {rows.map((row) => (
          <div key={row.id} className="space-y-1">
            <div className="grid grid-cols-1 sm:grid-cols-[1fr_140px_40px] gap-2 items-start">
              <div>
                <Input
                  type="email"
                  placeholder="colleague@company.com"
                  value={row.email}
                  onChange={(e) => updateRow(row.id, "email", e.target.value)}
                />
                {row.error && <p className="text-xs text-[var(--destructive)] mt-1">{row.error}</p>}
              </div>
              <Select value={row.role} onValueChange={(v) => updateRow(row.id, "role", v)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {ROLES.map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                </SelectContent>
              </Select>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeRow(row.id)}
                disabled={rows.length === 1}
                className="text-[var(--muted-foreground)] hover:text-[var(--destructive)]"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}

        <Button variant="outline" size="sm" onClick={addRow} className="gap-1.5">
          <Plus className="h-4 w-4" />
          Add another
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <Button variant="outline" onClick={() => router.push("/onboarding/finish")} className="sm:order-first">
          Skip for now
        </Button>
        <Button onClick={handleInvite} disabled={loading} className="flex-1 sm:flex-none sm:min-w-40">
          {loading ? (
            <><Loader2 className="h-4 w-4 animate-spin" />Sending invites…</>
          ) : (
            <><ArrowRight className="h-4 w-4" />Send invites & continue</>
          )}
        </Button>
      </div>
    </div>
  )
}
