"use client"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, MapPin, Clock, Users, Edit2, X, CheckCircle2, Circle } from "lucide-react"
import { getInitials } from "@/lib/utils"

const shiftData: Record<string, any> = {
  default: {
    id: "s1",
    title: "Day Shift — Engineering",
    date: "Mon 8 Jun 2026",
    startTime: "09:00",
    endTime: "17:00",
    breakDuration: "30 min",
    department: "Engineering",
    location: "Office Floor 3",
    requiredStaff: 4,
    notes: "Standard weekday shift. Please ensure all access passes are active before arrival.",
    employees: [
      { id: "e1", name: "Alex Turner", role: "Senior Engineer", checkedIn: true, checkedOut: false, checkInTime: "08:58", checkOutTime: null },
      { id: "e2", name: "Priya Sharma", role: "Engineer", checkedIn: true, checkedOut: false, checkInTime: "09:03", checkOutTime: null },
      { id: "e13", name: "Raj Patel", role: "Junior Engineer", checkedIn: false, checkedOut: false, checkInTime: null, checkOutTime: null },
      { id: "e16", name: "Sarah Ng", role: "Engineer", checkedIn: true, checkedOut: true, checkInTime: "09:00", checkOutTime: "17:02" },
    ],
  },
}

export default function ShiftDetailPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const shift = shiftData[id] ?? { ...shiftData.default, id }

  const filledSlots = shift.employees.length
  const checkedIn = shift.employees.filter((e: any) => e.checkedIn).length

  return (
    <div className="p-6" style={{ background: "var(--background)", minHeight: "100vh" }}>
      <button className="flex items-center gap-2 mb-5 text-sm" style={{ color: "var(--muted-foreground)" }} onClick={() => router.push("/app/people/shifts")}>
        <ArrowLeft size={16} /> Back to Shifts
      </button>

      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>{shift.title}</h1>
          <div className="flex items-center gap-4 mt-1 text-sm" style={{ color: "var(--muted-foreground)" }}>
            <span>{shift.date}</span>
            <span>·</span>
            <Clock size={14} className="inline" />
            <span>{shift.startTime} – {shift.endTime}</span>
            <span>·</span>
            <MapPin size={14} className="inline" />
            <span>{shift.location}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" style={{ borderColor: "var(--border)", color: "var(--foreground)" }}>
            <Edit2 size={15} className="mr-1" /> Edit Shift
          </Button>
          <Button variant="outline" style={{ borderColor: "#dc2626", color: "#dc2626" }}>
            <X size={15} className="mr-1" /> Cancel Shift
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="rounded-xl border p-4" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
          <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>Department</p>
          <p className="font-semibold mt-1" style={{ color: "var(--foreground)" }}>{shift.department}</p>
        </div>
        <div className="rounded-xl border p-4" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
          <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>Required Staff</p>
          <p className="text-xl font-bold mt-1" style={{ color: "var(--foreground)" }}>{shift.requiredStaff}</p>
        </div>
        <div className="rounded-xl border p-4" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
          <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>Filled Slots</p>
          <p className="text-xl font-bold mt-1" style={{ color: filledSlots >= shift.requiredStaff ? "#16a34a" : "#d97706" }}>
            {filledSlots} / {shift.requiredStaff}
          </p>
        </div>
        <div className="rounded-xl border p-4" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
          <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>Break Duration</p>
          <p className="font-semibold mt-1" style={{ color: "var(--foreground)" }}>{shift.breakDuration}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-5">
        <div className="col-span-2">
          <div className="rounded-xl border overflow-hidden mb-5" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
            <div className="p-4 border-b flex items-center justify-between" style={{ borderColor: "var(--border)" }}>
              <h3 className="font-semibold" style={{ color: "var(--foreground)" }}>Check In / Check Out</h3>
              <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>{checkedIn} of {filledSlots} checked in</span>
            </div>
            <div className="divide-y" style={{ borderColor: "var(--border)" }}>
              {shift.employees.map((emp: any) => (
                <div key={emp.id} className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold text-white" style={{ background: "var(--primary)" }}>
                      {getInitials(emp.name)}
                    </div>
                    <div>
                      <p className="font-medium text-sm" style={{ color: "var(--foreground)" }}>{emp.name}</p>
                      <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>{emp.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 text-sm">
                    <div className="text-center">
                      <p className="text-xs mb-1" style={{ color: "var(--muted-foreground)" }}>Check In</p>
                      {emp.checkedIn ? (
                        <div className="flex items-center gap-1" style={{ color: "#16a34a" }}>
                          <CheckCircle2 size={15} />
                          <span className="font-medium">{emp.checkInTime}</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1" style={{ color: "var(--muted-foreground)" }}>
                          <Circle size={15} />
                          <span>Pending</span>
                        </div>
                      )}
                    </div>
                    <div className="text-center">
                      <p className="text-xs mb-1" style={{ color: "var(--muted-foreground)" }}>Check Out</p>
                      {emp.checkedOut ? (
                        <div className="flex items-center gap-1" style={{ color: "#16a34a" }}>
                          <CheckCircle2 size={15} />
                          <span className="font-medium">{emp.checkOutTime}</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1" style={{ color: "var(--muted-foreground)" }}>
                          <Circle size={15} />
                          <span>—</span>
                        </div>
                      )}
                    </div>
                    <div>
                      {!emp.checkedIn && (
                        <button className="text-xs px-3 py-1.5 rounded-lg font-medium" style={{ background: "var(--primary)", color: "#fff" }}>Check In</button>
                      )}
                      {emp.checkedIn && !emp.checkedOut && (
                        <button className="text-xs px-3 py-1.5 rounded-lg font-medium" style={{ background: "var(--secondary)", color: "var(--foreground)", border: "1px solid var(--border)" }}>Check Out</button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="rounded-xl border p-5" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
            <h3 className="font-semibold mb-4" style={{ color: "var(--foreground)" }}>Shift Details</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span style={{ color: "var(--muted-foreground)" }}>Start Time</span><span style={{ color: "var(--foreground)" }}>{shift.startTime}</span></div>
              <div className="flex justify-between"><span style={{ color: "var(--muted-foreground)" }}>End Time</span><span style={{ color: "var(--foreground)" }}>{shift.endTime}</span></div>
              <div className="flex justify-between"><span style={{ color: "var(--muted-foreground)" }}>Break</span><span style={{ color: "var(--foreground)" }}>{shift.breakDuration}</span></div>
              <div className="flex justify-between"><span style={{ color: "var(--muted-foreground)" }}>Location</span><span style={{ color: "var(--foreground)" }}>{shift.location}</span></div>
              <div className="flex justify-between"><span style={{ color: "var(--muted-foreground)" }}>Department</span><span style={{ color: "var(--foreground)" }}>{shift.department}</span></div>
              <div className="flex justify-between"><span style={{ color: "var(--muted-foreground)" }}>Required</span><span style={{ color: "var(--foreground)" }}>{shift.requiredStaff} staff</span></div>
              <div className="flex justify-between"><span style={{ color: "var(--muted-foreground)" }}>Filled</span>
                <span style={{ color: filledSlots >= shift.requiredStaff ? "#16a34a" : "#d97706" }}>{filledSlots} staff</span>
              </div>
            </div>
            {shift.notes && (
              <div className="mt-4 pt-4 border-t" style={{ borderColor: "var(--border)" }}>
                <p className="text-xs font-medium mb-1" style={{ color: "var(--muted-foreground)" }}>Notes</p>
                <p className="text-sm" style={{ color: "var(--foreground)" }}>{shift.notes}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
