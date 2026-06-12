"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Plus, X, HandHeart } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
const skillSuggestions = ["Event Planning", "Public Speaking", "Social Media", "Fundraising", "CRM", "First Aid", "Driving", "Teaching", "Counselling", "IT Support", "Photography", "Translation"]

export default function RegisterVolunteerPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [skillInput, setSkillInput] = useState("")
  const [skills, setSkills] = useState<string[]>([])
  const [availability, setAvailability] = useState<Record<string, boolean>>({ Mon: false, Tue: false, Wed: false, Thu: false, Fri: false, Sat: false, Sun: false })
  const [dbsRequired, setDbsRequired] = useState(false)

  function addSkill(s: string) {
    const trimmed = s.trim()
    if (trimmed && !skills.includes(trimmed)) setSkills(prev => [...prev, trimmed])
    setSkillInput("")
  }

  function removeSkill(s: string) { setSkills(prev => prev.filter(x => x !== s)) }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    toast({ title: "Volunteer Registered", description: "The new volunteer has been successfully registered." })
    router.push("/app/charity/volunteers")
  }

  const fieldStyle = { background: "var(--background)", borderColor: "var(--border)", color: "var(--foreground)" }
  const labelStyle = { color: "var(--foreground)", fontSize: "14px", fontWeight: 500, display: "block", marginBottom: "4px" }
  const sectionStyle = { background: "var(--card)", borderColor: "var(--border)", borderRadius: "12px", border: "1px solid var(--border)", padding: "20px", marginBottom: "20px" }
  const sectionHeadStyle = { color: "var(--foreground)", fontWeight: 600, fontSize: "15px", marginBottom: "16px" }

  return (
    <div className="p-6" style={{ background: "var(--background)", minHeight: "100vh" }}>
      <button className="flex items-center gap-2 mb-5 text-sm" style={{ color: "var(--muted-foreground)" }} onClick={() => router.push("/app/charity/volunteers")}>
        <ArrowLeft size={16} /> Back to Volunteers
      </button>

      <div className="flex items-center gap-3 mb-6">
        <div style={{ background: "var(--primary)", borderRadius: "10px", padding: "8px" }}>
          <HandHeart size={22} style={{ color: "#fff" }} />
        </div>
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>Register Volunteer</h1>
          <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>Add a new volunteer to the programme</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="max-w-3xl">
        <div style={sectionStyle}>
          <p style={sectionHeadStyle}>Personal Information</p>
          <div className="grid grid-cols-2 gap-4">
            <div><label style={labelStyle}>First Name *</label><Input placeholder="First name" required style={fieldStyle} /></div>
            <div><label style={labelStyle}>Last Name *</label><Input placeholder="Last name" required style={fieldStyle} /></div>
            <div><label style={labelStyle}>Email Address *</label><Input type="email" placeholder="email@example.com" required style={fieldStyle} /></div>
            <div><label style={labelStyle}>Phone Number</label><Input placeholder="+44 7700 000 000" style={fieldStyle} /></div>
            <div><label style={labelStyle}>Date of Birth</label><Input type="date" style={fieldStyle} /></div>
            <div><label style={labelStyle}>Address Line 1</label><Input placeholder="Street address" style={fieldStyle} /></div>
            <div><label style={labelStyle}>City</label><Input placeholder="City" style={fieldStyle} /></div>
            <div><label style={labelStyle}>Postcode</label><Input placeholder="Postcode" style={fieldStyle} /></div>
          </div>
        </div>

        <div style={sectionStyle}>
          <p style={sectionHeadStyle}>Role & Availability</p>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label style={labelStyle}>Role *</label>
              <Select>
                <SelectTrigger style={fieldStyle}><SelectValue placeholder="Select role" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="fundraising">Fundraising</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="fieldwork">Fieldwork</SelectItem>
                  <SelectItem value="events">Events</SelectItem>
                  <SelectItem value="mentoring">Mentoring</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div><label style={labelStyle}>Start Date *</label><Input type="date" required style={fieldStyle} /></div>
            <div><label style={labelStyle}>Hours per Week</label><Input type="number" placeholder="e.g. 8" min={1} max={40} style={fieldStyle} /></div>
          </div>
          <div>
            <label style={{ ...labelStyle, marginBottom: "8px" }}>Availability</label>
            <div className="flex gap-3">
              {days.map(day => (
                <div key={day} className="flex flex-col items-center gap-1.5">
                  <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>{day}</span>
                  <button type="button" onClick={() => setAvailability(prev => ({ ...prev, [day]: !prev[day] }))}
                    className="w-9 h-9 rounded-md border flex items-center justify-center text-sm font-medium transition-colors"
                    style={{ borderColor: availability[day] ? "var(--primary)" : "var(--border)", background: availability[day] ? "var(--primary)" : "transparent", color: availability[day] ? "#fff" : "var(--muted-foreground)" }}>
                    {availability[day] ? "✓" : ""}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={sectionStyle}>
          <p style={sectionHeadStyle}>Skills</p>
          <div className="flex flex-wrap gap-2 mb-3">
            {skills.map(s => (
              <span key={s} className="flex items-center gap-1 px-3 py-1 rounded-full text-sm" style={{ background: "var(--secondary)", color: "var(--foreground)" }}>
                {s}
                <button type="button" onClick={() => removeSkill(s)} className="ml-1" style={{ color: "var(--muted-foreground)" }}><X size={12} /></button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <Input value={skillInput} onChange={e => setSkillInput(e.target.value)} placeholder="Type a skill and press Enter"
              onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); addSkill(skillInput) } }}
              style={fieldStyle} className="flex-1" />
            <Button type="button" variant="outline" onClick={() => addSkill(skillInput)} style={{ borderColor: "var(--border)", color: "var(--foreground)" }}>
              <Plus size={15} />
            </Button>
          </div>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {skillSuggestions.filter(s => !skills.includes(s)).slice(0, 8).map(s => (
              <button type="button" key={s} onClick={() => addSkill(s)}
                className="text-xs px-2 py-1 rounded-full border" style={{ borderColor: "var(--border)", color: "var(--muted-foreground)", background: "var(--background)" }}>
                + {s}
              </button>
            ))}
          </div>
        </div>

        <div style={sectionStyle}>
          <p style={sectionHeadStyle}>Emergency Contact</p>
          <div className="grid grid-cols-3 gap-4">
            <div><label style={labelStyle}>Full Name</label><Input placeholder="Contact name" style={fieldStyle} /></div>
            <div>
              <label style={labelStyle}>Relationship</label>
              <Select>
                <SelectTrigger style={fieldStyle}><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="spouse">Spouse / Partner</SelectItem>
                  <SelectItem value="parent">Parent</SelectItem>
                  <SelectItem value="sibling">Sibling</SelectItem>
                  <SelectItem value="friend">Friend</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div><label style={labelStyle}>Phone Number</label><Input placeholder="+44 7700 000 000" style={fieldStyle} /></div>
          </div>
        </div>

        <div style={sectionStyle}>
          <p style={sectionHeadStyle}>DBS Check</p>
          <div className="flex items-center gap-3 mb-4">
            <button type="button" onClick={() => setDbsRequired(prev => !prev)}
              className="relative w-11 h-6 rounded-full transition-colors"
              style={{ background: dbsRequired ? "var(--primary)" : "var(--border)" }}>
              <div className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform" style={{ transform: dbsRequired ? "translateX(22px)" : "translateX(2px)" }} />
            </button>
            <span className="text-sm" style={{ color: "var(--foreground)" }}>DBS Check Required</span>
          </div>
          {dbsRequired && (
            <div className="max-w-xs">
              <label style={labelStyle}>DBS Reference Number</label>
              <Input placeholder="e.g. DBS-2024-0012345" style={fieldStyle} />
            </div>
          )}
        </div>

        <div style={sectionStyle}>
          <p style={sectionHeadStyle}>Notes</p>
          <textarea placeholder="Any additional notes about this volunteer..." rows={4}
            className="w-full rounded-lg p-3 text-sm resize-none" style={{ background: "var(--background)", border: "1px solid var(--border)", color: "var(--foreground)", outline: "none" }} />
        </div>

        <div className="flex gap-3">
          <Button type="submit" style={{ background: "var(--primary)", color: "#fff" }}>
            <HandHeart size={16} className="mr-2" /> Register Volunteer
          </Button>
          <Button type="button" variant="outline" onClick={() => router.push("/app/charity/volunteers")} style={{ borderColor: "var(--border)", color: "var(--foreground)" }}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}
