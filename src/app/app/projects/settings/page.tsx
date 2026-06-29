"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Settings } from "lucide-react"

export default function ProjectsSettingsPage() {
  return (
    <div className="p-6 space-y-6 max-w-2xl">
      <div className="flex items-center gap-3">
        <Settings className="h-5 w-5" style={{ color: "var(--primary)" }} />
        <div>
          <h1 className="text-2xl font-semibold" style={{ color: "var(--foreground)" }}>Projects Settings</h1>
          <p className="text-sm mt-0.5" style={{ color: "var(--muted-foreground)" }}>Configure defaults for the Projects module</p>
        </div>
      </div>

      <Card className="border" style={{ borderColor: "var(--border)" }}>
        <CardHeader className="pb-3"><CardTitle className="text-base">General</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {[
            { label: "Default Billing Type", value: "Fixed Price" },
            { label: "Default Currency", value: "GBP (£)" },
            { label: "Working Hours Per Day", value: "8" },
            { label: "Working Days Per Week", value: "5" },
          ].map(f => (
            <div key={f.label} className="grid grid-cols-3 gap-4 items-center">
              <label className="text-sm font-medium" style={{ color: "var(--foreground)" }}>{f.label}</label>
              <div className="col-span-2">
                <Input defaultValue={f.value} />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="border" style={{ borderColor: "var(--border)" }}>
        <CardHeader className="pb-3"><CardTitle className="text-base">Timesheet Approval</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {[
            { label: "Require PM Approval", checked: true },
            { label: "Lock Approved Entries", checked: true },
            { label: "Allow Backdating", checked: false },
          ].map(s => (
            <div key={s.label} className="flex items-center justify-between">
              <span className="text-sm" style={{ color: "var(--foreground)" }}>{s.label}</span>
              <div
                className="h-5 w-9 rounded-full cursor-pointer transition-colors"
                style={{ background: s.checked ? "var(--primary)" : "var(--muted-foreground)" }}
              >
                <div
                  className="h-4 w-4 rounded-full bg-white transition-transform mt-0.5"
                  style={{ transform: s.checked ? "translateX(18px)" : "translateX(2px)" }}
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Button style={{ background: "var(--primary)", color: "#fff" }}>Save Settings</Button>
    </div>
  )
}
