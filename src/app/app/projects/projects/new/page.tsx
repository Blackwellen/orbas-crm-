"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, ChevronRight, Plus, X, Check } from "lucide-react"

type Step = 1 | 2 | 3

const STEPS = [
  { n: 1, label: "Project Basics" },
  { n: 2, label: "Dates & Budget" },
  { n: 3, label: "Tasks & Phases" },
]

const CLIENTS = ["Orbas Ltd","Hartmann Industries","RetailCo UK","FinServe Group","BuildCo Ltd","Apex Manufacturing","LogiFlow UK","Internal"]
const TEAM_OPTIONS = ["Sarah Kim","James Robertson","Lucy Chen","Alex Turner","Mike Davies","Priya Sharma"]

interface Phase { id: number; name: string; tasks: string[] }

export default function NewProjectPage() {
  const [step, setStep] = useState<Step>(1)
  const [form, setForm] = useState({
    name: "", client: "", description: "", type: "Fixed",
    start: "", end: "", budget: "", billingType: "Fixed Price",
    team: [] as string[],
  })
  const [phases, setPhases] = useState<Phase[]>([
    { id: 1, name: "Phase 1: Discovery", tasks: ["Requirements gathering","Stakeholder interviews","Tech stack decision"] },
    { id: 2, name: "Phase 2: Development", tasks: ["Backend API","Frontend","Testing"] },
  ])
  const [newTask, setNewTask] = useState<Record<number, string>>({})

  function setField(key: string, val: string) {
    setForm(f => ({ ...f, [key]: val }))
  }

  function toggleTeam(member: string) {
    setForm(f => ({
      ...f,
      team: f.team.includes(member) ? f.team.filter(m => m !== member) : [...f.team, member],
    }))
  }

  function addPhase() {
    setPhases(ps => [...ps, { id: Date.now(), name: `Phase ${ps.length + 1}`, tasks: [] }])
  }

  function addTask(phaseId: number) {
    const t = newTask[phaseId]?.trim()
    if (!t) return
    setPhases(ps => ps.map(p => p.id === phaseId ? { ...p, tasks: [...p.tasks, t] } : p))
    setNewTask(n => ({ ...n, [phaseId]: "" }))
  }

  function removeTask(phaseId: number, taskIdx: number) {
    setPhases(ps => ps.map(p => p.id === phaseId ? { ...p, tasks: p.tasks.filter((_, i) => i !== taskIdx) } : p))
  }

  const canNext1 = form.name.trim() && form.client && form.type
  const canNext2 = form.start && form.end && form.budget

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <Link href="/app/projects/projects">
          <Button size="sm" variant="ghost" className="gap-2">
            <ArrowLeft className="h-4 w-4" /> Projects
          </Button>
        </Link>
        <ChevronRight className="h-4 w-4" style={{ color: "var(--muted-foreground)" }} />
        <h1 className="font-semibold" style={{ color: "var(--foreground)" }}>New Project</h1>
      </div>

      {/* Stepper */}
      <div className="flex items-center gap-0 mb-8">
        {STEPS.map((s, i) => (
          <React.Fragment key={s.n}>
            <div className="flex items-center gap-3">
              <div
                className="h-8 w-8 rounded-full flex items-center justify-center text-sm font-bold transition-all"
                style={{
                  background: step > s.n ? "#22c55e" : step === s.n ? "var(--primary)" : "var(--muted)",
                  color: step >= s.n ? "#fff" : "var(--muted-foreground)",
                }}
              >
                {step > s.n ? <Check className="h-4 w-4" /> : s.n}
              </div>
              <span className="text-sm font-medium" style={{ color: step === s.n ? "var(--foreground)" : "var(--muted-foreground)" }}>
                {s.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className="flex-1 h-0.5 mx-4" style={{ background: step > s.n ? "#22c55e" : "var(--muted)" }} />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Step 1 */}
      {step === 1 && (
        <Card className="border" style={{ borderColor: "var(--border)" }}>
          <CardContent className="p-6 space-y-5">
            <div>
              <h2 className="text-lg font-semibold mb-1" style={{ color: "var(--foreground)" }}>Project Basics</h2>
              <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>Start with the core project details</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium block mb-1.5" style={{ color: "var(--foreground)" }}>Project Name *</label>
                <Input placeholder="e.g. Website Redesign 2025" value={form.name} onChange={e => setField("name", e.target.value)} />
              </div>
              <div>
                <label className="text-sm font-medium block mb-1.5" style={{ color: "var(--foreground)" }}>Client *</label>
                <select
                  className="w-full rounded-lg border px-3 py-2 text-sm"
                  style={{ borderColor: "var(--border)", background: "var(--background)", color: "var(--foreground)" }}
                  value={form.client}
                  onChange={e => setField("client", e.target.value)}
                >
                  <option value="">Select client...</option>
                  {CLIENTS.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium block mb-1.5" style={{ color: "var(--foreground)" }}>Description</label>
                <textarea
                  rows={4}
                  placeholder="Describe the project scope and objectives..."
                  className="w-full rounded-lg border px-3 py-2 text-sm resize-none"
                  style={{ borderColor: "var(--border)", background: "var(--background)", color: "var(--foreground)" }}
                  value={form.description}
                  onChange={e => setField("description", e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium block mb-2" style={{ color: "var(--foreground)" }}>Project Type *</label>
                <div className="flex gap-3">
                  {["Fixed","Software","Integration","Data","Compliance","Infrastructure","Security"].map(t => (
                    <button
                      key={t}
                      onClick={() => setField("type", t)}
                      className="px-3 py-1.5 rounded-full text-sm font-medium border transition-all"
                      style={{
                        borderColor: form.type === t ? "var(--primary)" : "var(--border)",
                        background: form.type === t ? "rgba(26,86,219,0.1)" : "transparent",
                        color: form.type === t ? "var(--primary)" : "var(--muted-foreground)",
                      }}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                disabled={!canNext1}
                onClick={() => setStep(2)}
                style={{ background: "var(--primary)", color: "#fff", opacity: canNext1 ? 1 : 0.5 }}
              >
                Next: Dates & Budget
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2 */}
      {step === 2 && (
        <Card className="border" style={{ borderColor: "var(--border)" }}>
          <CardContent className="p-6 space-y-5">
            <div>
              <h2 className="text-lg font-semibold mb-1" style={{ color: "var(--foreground)" }}>Dates, Budget & Team</h2>
              <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>Set timeline, budget, and assign team members</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium block mb-1.5" style={{ color: "var(--foreground)" }}>Start Date *</label>
                <Input type="date" value={form.start} onChange={e => setField("start", e.target.value)} />
              </div>
              <div>
                <label className="text-sm font-medium block mb-1.5" style={{ color: "var(--foreground)" }}>End Date *</label>
                <Input type="date" value={form.end} onChange={e => setField("end", e.target.value)} />
              </div>
              <div>
                <label className="text-sm font-medium block mb-1.5" style={{ color: "var(--foreground)" }}>Budget (£) *</label>
                <Input type="number" placeholder="e.g. 50000" value={form.budget} onChange={e => setField("budget", e.target.value)} />
              </div>
              <div>
                <label className="text-sm font-medium block mb-1.5" style={{ color: "var(--foreground)" }}>Billing Type</label>
                <select
                  className="w-full rounded-lg border px-3 py-2 text-sm"
                  style={{ borderColor: "var(--border)", background: "var(--background)", color: "var(--foreground)" }}
                  value={form.billingType}
                  onChange={e => setField("billingType", e.target.value)}
                >
                  <option>Fixed Price</option>
                  <option>Time & Materials</option>
                  <option>Retainer</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium block mb-2" style={{ color: "var(--foreground)" }}>Assign Team Members</label>
              <div className="flex flex-wrap gap-2">
                {TEAM_OPTIONS.map(m => (
                  <button
                    key={m}
                    onClick={() => toggleTeam(m)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm border transition-all"
                    style={{
                      borderColor: form.team.includes(m) ? "var(--primary)" : "var(--border)",
                      background: form.team.includes(m) ? "rgba(26,86,219,0.1)" : "transparent",
                      color: form.team.includes(m) ? "var(--primary)" : "var(--muted-foreground)",
                    }}
                  >
                    {form.team.includes(m) && <Check className="h-3 w-3" />}
                    {m}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
              <Button
                disabled={!canNext2}
                onClick={() => setStep(3)}
                style={{ background: "var(--primary)", color: "#fff", opacity: canNext2 ? 1 : 0.5 }}
              >
                Next: Tasks & Phases
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3 */}
      {step === 3 && (
        <Card className="border" style={{ borderColor: "var(--border)" }}>
          <CardContent className="p-6 space-y-5">
            <div>
              <h2 className="text-lg font-semibold mb-1" style={{ color: "var(--foreground)" }}>Initial Tasks & Phases</h2>
              <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>Set up your project phases and seed tasks</p>
            </div>

            <div className="space-y-4">
              {phases.map(phase => (
                <div key={phase.id} className="rounded-xl border p-4 space-y-3" style={{ borderColor: "var(--border)" }}>
                  <Input
                    value={phase.name}
                    onChange={e => setPhases(ps => ps.map(p => p.id === phase.id ? { ...p, name: e.target.value } : p))}
                    className="font-semibold"
                    style={{ color: "var(--foreground)" }}
                  />
                  <div className="space-y-2">
                    {phase.tasks.map((t, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <div className="flex-1 px-3 py-1.5 rounded-lg text-sm" style={{ background: "var(--muted)", color: "var(--foreground)" }}>{t}</div>
                        <button onClick={() => removeTask(phase.id, idx)}>
                          <X className="h-4 w-4" style={{ color: "var(--muted-foreground)" }} />
                        </button>
                      </div>
                    ))}
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add task..."
                        value={newTask[phase.id] ?? ""}
                        onChange={e => setNewTask(n => ({ ...n, [phase.id]: e.target.value }))}
                        onKeyDown={e => e.key === "Enter" && addTask(phase.id)}
                        className="text-sm"
                      />
                      <Button size="sm" variant="outline" onClick={() => addTask(phase.id)}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              <Button variant="outline" size="sm" className="gap-2" onClick={addPhase}>
                <Plus className="h-4 w-4" /> Add Phase
              </Button>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(2)}>Back</Button>
              <Link href="/app/projects/projects">
                <Button style={{ background: "var(--primary)", color: "#fff" }}>
                  <Check className="h-4 w-4 mr-2" /> Create Project
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
