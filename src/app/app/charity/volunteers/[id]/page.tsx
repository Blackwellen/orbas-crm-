"use client"
import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Mail, Phone, MapPin, Edit2, MessageSquare, ShieldAlert, Trash2, User, Clock, FileText } from "lucide-react"
import { formatDate, getInitials } from "@/lib/utils"

const volunteers: Record<string, any> = {
  v1: {
    id: "v1", name: "Amelia Carter", email: "amelia.carter@email.com", phone: "+44 7700 900 123", role: "Fundraising",
    status: "Active", hoursYtd: 284, startDate: "2022-03-15", dbsCheck: "Valid", dbsRef: "DBS-2024-0034521",
    address: "14 Maple Street, London, SW1A 1AA",
    dob: "1992-06-18",
    emergencyContact: { name: "David Carter", relationship: "Spouse", phone: "+44 7700 900 456" },
    skills: ["Public Speaking", "Event Planning", "Social Media", "Donor Relations", "CRM Systems"],
    availability: { Mon: true, Tue: true, Wed: false, Thu: true, Fri: true, Sat: false, Sun: false },
    hoursPerWeek: 10,
    notes: "Exceptional communicator. Has led three fundraising events exceeding targets by over 20%. Available remotely mid-week.",
    activities: [
      { date: "2026-06-05", activity: "Summer Gala Preparation", hours: 6, location: "Head Office", supervisor: "Rachel Moore" },
      { date: "2026-05-28", activity: "Donor Call Campaign", hours: 4, location: "Remote", supervisor: "Rachel Moore" },
      { date: "2026-05-14", activity: "Street Collection – Oxford St", hours: 5, location: "Oxford Street", supervisor: "James Reid" },
      { date: "2026-04-22", activity: "Gala Dinner Setup", hours: 8, location: "Grand Hotel", supervisor: "Rachel Moore" },
      { date: "2026-03-11", activity: "Marathon Support Crew", hours: 7, location: "Hyde Park", supervisor: "James Reid" },
    ],
    documents: [
      { name: "DBS Certificate", status: "Valid", issued: "2024-01-10", expires: "2027-01-10" },
      { name: "Induction Form", status: "Complete", issued: "2022-03-15", expires: null },
      { name: "Reference Letter", status: "On File", issued: "2022-03-01", expires: null },
      { name: "Volunteer Agreement", status: "Signed", issued: "2022-03-15", expires: null },
    ],
  },
}

const fallback: any = {
  id: "vx", name: "Volunteer", email: "volunteer@email.com", phone: "+44 7700 000 000", role: "Events",
  status: "Active", hoursYtd: 120, startDate: "2023-06-01", dbsCheck: "Valid", dbsRef: "DBS-2024-0099",
  address: "1 Example Road, Manchester, M1 1AA", dob: "1990-01-01",
  emergencyContact: { name: "Jane Doe", relationship: "Partner", phone: "+44 7700 000 111" },
  skills: ["Communication", "Teamwork"],
  availability: { Mon: true, Tue: false, Wed: true, Thu: false, Fri: true, Sat: false, Sun: false },
  hoursPerWeek: 8,
  notes: "Reliable volunteer with good attendance record.",
  activities: [
    { date: "2026-06-01", activity: "Event Support", hours: 4, location: "City Centre", supervisor: "Manager A" },
  ],
  documents: [
    { name: "DBS Certificate", status: "Valid", issued: "2024-01-01", expires: "2027-01-01" },
    { name: "Induction Form", status: "Complete", issued: "2023-06-01", expires: null },
  ],
}

function statusBadge(status: string) {
  const map: Record<string, { bg: string; color: string }> = {
    Active: { bg: "#dcfce7", color: "#16a34a" },
    Inactive: { bg: "#f1f5f9", color: "#475569" },
    Pending: { bg: "#fef3c7", color: "#d97706" },
    Suspended: { bg: "#fee2e2", color: "#dc2626" },
    Valid: { bg: "#dcfce7", color: "#16a34a" },
    Expired: { bg: "#fee2e2", color: "#dc2626" },
    Complete: { bg: "#dbeafe", color: "#1d4ed8" },
    "On File": { bg: "#f1f5f9", color: "#475569" },
    Signed: { bg: "#dcfce7", color: "#16a34a" },
  }
  const s = map[status] ?? { bg: "#f1f5f9", color: "#475569" }
  return (
    <span style={{ backgroundColor: s.bg, color: s.color, padding: "2px 8px", borderRadius: "9999px", fontSize: "12px", fontWeight: 500 }}>
      {status}
    </span>
  )
}

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

export default function VolunteerDetailPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const [tab, setTab] = useState("profile")
  const v = volunteers[id] ?? { ...fallback, id }

  return (
    <div className="p-6" style={{ background: "var(--background)", minHeight: "100vh" }}>
      <button className="flex items-center gap-2 mb-5 text-sm" style={{ color: "var(--muted-foreground)" }} onClick={() => router.push("/app/charity/volunteers")}>
        <ArrowLeft size={16} /> Back to Volunteers
      </button>

      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold text-white" style={{ background: "var(--primary)" }}>
            {getInitials(v.name)}
          </div>
          <div>
            <h1 className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>{v.name}</h1>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-sm" style={{ color: "var(--muted-foreground)" }}>{v.role}</span>
              {statusBadge(v.status)}
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" style={{ borderColor: "var(--border)", color: "var(--foreground)" }}>
            <Edit2 size={15} className="mr-1" /> Edit
          </Button>
          <Button variant="outline" size="sm" style={{ borderColor: "var(--border)", color: "var(--foreground)" }}>
            <MessageSquare size={15} className="mr-1" /> Message
          </Button>
          <Button variant="outline" size="sm" style={{ borderColor: "#d97706", color: "#d97706" }}>
            <ShieldAlert size={15} className="mr-1" /> Suspend
          </Button>
          <Button variant="outline" size="sm" style={{ borderColor: "#dc2626", color: "#dc2626" }}>
            <Trash2 size={15} className="mr-1" /> Remove
          </Button>
        </div>
      </div>

      <div className="flex gap-1 mb-6 border-b" style={{ borderColor: "var(--border)" }}>
        {[
          { key: "profile", label: "Profile", icon: User },
          { key: "hours", label: "Hours & Activities", icon: Clock },
          { key: "documents", label: "Documents", icon: FileText },
        ].map(t => (
          <button key={t.key} onClick={() => setTab(t.key)}
            className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors"
            style={{ borderColor: tab === t.key ? "var(--primary)" : "transparent", color: tab === t.key ? "var(--primary)" : "var(--muted-foreground)" }}>
            <t.icon size={15} /> {t.label}
          </button>
        ))}
      </div>

      {tab === "profile" && (
        <div className="grid grid-cols-3 gap-5">
          <div className="col-span-2 space-y-5">
            <div className="rounded-xl border p-5" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <h3 className="font-semibold mb-4" style={{ color: "var(--foreground)" }}>Personal Information</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><p style={{ color: "var(--muted-foreground)" }}>Full Name</p><p className="font-medium mt-0.5" style={{ color: "var(--foreground)" }}>{v.name}</p></div>
                <div><p style={{ color: "var(--muted-foreground)" }}>Date of Birth</p><p className="font-medium mt-0.5" style={{ color: "var(--foreground)" }}>{formatDate(v.dob)}</p></div>
                <div className="flex items-center gap-2"><Mail size={14} style={{ color: "var(--muted-foreground)" }} /><div><p style={{ color: "var(--muted-foreground)" }}>Email</p><p className="font-medium" style={{ color: "var(--foreground)" }}>{v.email}</p></div></div>
                <div className="flex items-center gap-2"><Phone size={14} style={{ color: "var(--muted-foreground)" }} /><div><p style={{ color: "var(--muted-foreground)" }}>Phone</p><p className="font-medium" style={{ color: "var(--foreground)" }}>{v.phone}</p></div></div>
                <div className="col-span-2 flex items-start gap-2"><MapPin size={14} className="mt-0.5 shrink-0" style={{ color: "var(--muted-foreground)" }} /><div><p style={{ color: "var(--muted-foreground)" }}>Address</p><p className="font-medium" style={{ color: "var(--foreground)" }}>{v.address}</p></div></div>
              </div>
            </div>

            <div className="rounded-xl border p-5" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <h3 className="font-semibold mb-4" style={{ color: "var(--foreground)" }}>Emergency Contact</h3>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div><p style={{ color: "var(--muted-foreground)" }}>Name</p><p className="font-medium mt-0.5" style={{ color: "var(--foreground)" }}>{v.emergencyContact.name}</p></div>
                <div><p style={{ color: "var(--muted-foreground)" }}>Relationship</p><p className="font-medium mt-0.5" style={{ color: "var(--foreground)" }}>{v.emergencyContact.relationship}</p></div>
                <div><p style={{ color: "var(--muted-foreground)" }}>Phone</p><p className="font-medium mt-0.5" style={{ color: "var(--foreground)" }}>{v.emergencyContact.phone}</p></div>
              </div>
            </div>

            <div className="rounded-xl border p-5" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <h3 className="font-semibold mb-4" style={{ color: "var(--foreground)" }}>Availability</h3>
              <div className="flex gap-2">
                {days.map(day => (
                  <div key={day} className="flex flex-col items-center gap-1.5">
                    <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>{day}</span>
                    <div className="w-8 h-8 rounded-md border flex items-center justify-center"
                      style={{ borderColor: v.availability[day] ? "var(--primary)" : "var(--border)", background: v.availability[day] ? "var(--primary)" : "transparent" }}>
                      {v.availability[day] && <span className="text-white text-xs font-bold">✓</span>}
                    </div>
                  </div>
                ))}
                <div className="ml-4 flex items-center">
                  <span className="text-sm" style={{ color: "var(--muted-foreground)" }}>{v.hoursPerWeek}h/week</span>
                </div>
              </div>
            </div>

            <div className="rounded-xl border p-5" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <h3 className="font-semibold mb-3" style={{ color: "var(--foreground)" }}>Notes</h3>
              <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>{v.notes}</p>
            </div>
          </div>

          <div className="space-y-5">
            <div className="rounded-xl border p-5" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <h3 className="font-semibold mb-3" style={{ color: "var(--foreground)" }}>Skills</h3>
              <div className="flex flex-wrap gap-2">
                {v.skills.map((s: string) => (
                  <span key={s} className="px-3 py-1 rounded-full text-xs font-medium" style={{ background: "var(--secondary)", color: "var(--foreground)" }}>{s}</span>
                ))}
              </div>
            </div>

            <div className="rounded-xl border p-5" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <h3 className="font-semibold mb-3" style={{ color: "var(--foreground)" }}>DBS Check</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span style={{ color: "var(--muted-foreground)" }}>Status</span>{statusBadge(v.dbsCheck)}</div>
                <div className="flex justify-between"><span style={{ color: "var(--muted-foreground)" }}>Reference</span><span style={{ color: "var(--foreground)" }}>{v.dbsRef}</span></div>
              </div>
            </div>

            <div className="rounded-xl border p-5" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <h3 className="font-semibold mb-3" style={{ color: "var(--foreground)" }}>Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span style={{ color: "var(--muted-foreground)" }}>Start Date</span><span style={{ color: "var(--foreground)" }}>{formatDate(v.startDate)}</span></div>
                <div className="flex justify-between"><span style={{ color: "var(--muted-foreground)" }}>Hours YTD</span><span className="font-semibold" style={{ color: "var(--foreground)" }}>{v.hoursYtd}</span></div>
                <div className="flex justify-between"><span style={{ color: "var(--muted-foreground)" }}>Role</span><span style={{ color: "var(--foreground)" }}>{v.role}</span></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {tab === "hours" && (
        <div className="space-y-5">
          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-xl border p-4" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>Total Hours YTD</p>
              <p className="text-2xl font-bold mt-1" style={{ color: "var(--primary)" }}>{v.hoursYtd}</p>
            </div>
            <div className="rounded-xl border p-4" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>Activities Logged</p>
              <p className="text-2xl font-bold mt-1" style={{ color: "var(--foreground)" }}>{v.activities.length}</p>
            </div>
            <div className="rounded-xl border p-4" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>Avg Hours/Activity</p>
              <p className="text-2xl font-bold mt-1" style={{ color: "var(--foreground)" }}>
                {v.activities.length > 0 ? (v.activities.reduce((a: number, b: any) => a + b.hours, 0) / v.activities.length).toFixed(1) : "0"}
              </p>
            </div>
          </div>

          <div className="rounded-xl border overflow-hidden" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
            <div className="p-4 border-b" style={{ borderColor: "var(--border)" }}>
              <h3 className="font-semibold" style={{ color: "var(--foreground)" }}>Activity Log</h3>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border)" }}>
                  {["Date", "Activity", "Hours", "Location", "Supervisor"].map(h => (
                    <th key={h} className="text-left px-4 py-3 font-medium" style={{ color: "var(--muted-foreground)" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {v.activities.map((a: any, i: number) => (
                  <tr key={i} style={{ borderBottom: i < v.activities.length - 1 ? "1px solid var(--border)" : "none" }}>
                    <td className="px-4 py-3" style={{ color: "var(--foreground)" }}>{formatDate(a.date)}</td>
                    <td className="px-4 py-3" style={{ color: "var(--foreground)" }}>{a.activity}</td>
                    <td className="px-4 py-3 font-semibold" style={{ color: "var(--primary)" }}>{a.hours}h</td>
                    <td className="px-4 py-3" style={{ color: "var(--muted-foreground)" }}>{a.location}</td>
                    <td className="px-4 py-3" style={{ color: "var(--muted-foreground)" }}>{a.supervisor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === "documents" && (
        <div className="rounded-xl border overflow-hidden" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
          <div className="p-4 border-b" style={{ borderColor: "var(--border)" }}>
            <h3 className="font-semibold" style={{ color: "var(--foreground)" }}>Documents</h3>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                {["Document", "Status", "Issued", "Expires", "Actions"].map(h => (
                  <th key={h} className="text-left px-4 py-3 font-medium" style={{ color: "var(--muted-foreground)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {v.documents.map((d: any, i: number) => (
                <tr key={i} style={{ borderBottom: i < v.documents.length - 1 ? "1px solid var(--border)" : "none" }}>
                  <td className="px-4 py-3 font-medium" style={{ color: "var(--foreground)" }}>
                    <div className="flex items-center gap-2"><FileText size={15} style={{ color: "var(--muted-foreground)" }} />{d.name}</div>
                  </td>
                  <td className="px-4 py-3">{statusBadge(d.status)}</td>
                  <td className="px-4 py-3" style={{ color: "var(--muted-foreground)" }}>{formatDate(d.issued)}</td>
                  <td className="px-4 py-3" style={{ color: "var(--muted-foreground)" }}>{d.expires ? formatDate(d.expires) : "—"}</td>
                  <td className="px-4 py-3">
                    <button className="text-xs px-2 py-1 rounded-md" style={{ background: "var(--secondary)", color: "var(--foreground)" }}>View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
