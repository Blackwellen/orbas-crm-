"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { HandHeart, Search, Plus, Eye, Edit2, MessageSquare, Shield } from "lucide-react"
import { formatDate, getInitials } from "@/lib/utils"

const volunteers = [
  { id: "v1", name: "Amelia Carter", email: "amelia.carter@email.com", role: "Fundraising", status: "Active", hoursYtd: 284, startDate: "2022-03-15", dbsCheck: "Valid" },
  { id: "v2", name: "James Okonkwo", email: "james.okonkwo@email.com", role: "Fieldwork", status: "Active", hoursYtd: 312, startDate: "2021-07-01", dbsCheck: "Valid" },
  { id: "v3", name: "Sophie Hargreaves", email: "sophie.h@email.com", role: "Events", status: "Active", hoursYtd: 156, startDate: "2023-01-10", dbsCheck: "Expired" },
  { id: "v4", name: "Marcus Webb", email: "marcus.webb@email.com", role: "Admin", status: "Inactive", hoursYtd: 45, startDate: "2020-11-22", dbsCheck: "Not Required" },
  { id: "v5", name: "Priya Sharma", email: "priya.sharma@email.com", role: "Mentoring", status: "Active", hoursYtd: 198, startDate: "2022-09-05", dbsCheck: "Valid" },
  { id: "v6", name: "Liam Thornton", email: "liam.t@email.com", role: "Fundraising", status: "Pending", hoursYtd: 0, startDate: "2026-05-20", dbsCheck: "Pending" },
  { id: "v7", name: "Fatima Al-Hassan", email: "fatima.ah@email.com", role: "Events", status: "Active", hoursYtd: 223, startDate: "2023-04-14", dbsCheck: "Valid" },
  { id: "v8", name: "Tom Blackwood", email: "tom.bw@email.com", role: "Fieldwork", status: "Active", hoursYtd: 178, startDate: "2022-06-30", dbsCheck: "Valid" },
  { id: "v9", name: "Grace Ellington", email: "grace.e@email.com", role: "Mentoring", status: "Suspended", hoursYtd: 88, startDate: "2021-02-18", dbsCheck: "Expired" },
  { id: "v10", name: "Daniel Forsythe", email: "daniel.f@email.com", role: "Admin", status: "Active", hoursYtd: 134, startDate: "2023-08-01", dbsCheck: "Not Required" },
  { id: "v11", name: "Nadia Kowalski", email: "nadia.k@email.com", role: "Fundraising", status: "Active", hoursYtd: 267, startDate: "2022-01-07", dbsCheck: "Valid" },
  { id: "v12", name: "Oliver Penn", email: "oliver.p@email.com", role: "Events", status: "Active", hoursYtd: 91, startDate: "2024-02-14", dbsCheck: "Pending" },
  { id: "v13", name: "Chloe Mercer", email: "chloe.m@email.com", role: "Fieldwork", status: "Active", hoursYtd: 345, startDate: "2020-08-11", dbsCheck: "Valid" },
  { id: "v14", name: "Raj Patel", email: "raj.patel@email.com", role: "Mentoring", status: "Inactive", hoursYtd: 22, startDate: "2023-11-03", dbsCheck: "Not Required" },
  { id: "v15", name: "Isla Campbell", email: "isla.c@email.com", role: "Admin", status: "Active", hoursYtd: 112, startDate: "2024-01-15", dbsCheck: "Valid" },
]

function dbsBadge(status: string) {
  const map: Record<string, { bg: string; color: string }> = {
    Valid: { bg: "#dcfce7", color: "#16a34a" },
    Expired: { bg: "#fee2e2", color: "#dc2626" },
    Pending: { bg: "#fef3c7", color: "#d97706" },
    "Not Required": { bg: "#f1f5f9", color: "#475569" },
  }
  const s = map[status] ?? map["Not Required"]
  return (
    <span style={{ backgroundColor: s.bg, color: s.color, padding: "2px 8px", borderRadius: "9999px", fontSize: "12px", fontWeight: 500 }}>
      {status}
    </span>
  )
}

function statusBadge(status: string) {
  const map: Record<string, { bg: string; color: string }> = {
    Active: { bg: "#dcfce7", color: "#16a34a" },
    Inactive: { bg: "#f1f5f9", color: "#475569" },
    Pending: { bg: "#fef3c7", color: "#d97706" },
    Suspended: { bg: "#fee2e2", color: "#dc2626" },
  }
  const s = map[status] ?? map["Inactive"]
  return (
    <span style={{ backgroundColor: s.bg, color: s.color, padding: "2px 8px", borderRadius: "9999px", fontSize: "12px", fontWeight: 500 }}>
      {status}
    </span>
  )
}

export default function VolunteersPage() {
  const router = useRouter()
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [roleFilter, setRoleFilter] = useState("all")

  const filtered = volunteers.filter(v => {
    const matchSearch = v.name.toLowerCase().includes(search.toLowerCase()) || v.email.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === "all" || v.status.toLowerCase() === statusFilter.toLowerCase()
    const matchRole = roleFilter === "all" || v.role.toLowerCase() === roleFilter.toLowerCase()
    return matchSearch && matchStatus && matchRole
  })

  return (
    <div className="p-6" style={{ background: "var(--background)", minHeight: "100vh" }}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div style={{ background: "var(--primary)", borderRadius: "10px", padding: "8px" }}>
            <HandHeart size={22} style={{ color: "#fff" }} />
          </div>
          <div>
            <h1 className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>Volunteers</h1>
            <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>Manage and track your volunteer workforce</p>
          </div>
        </div>
        <Button onClick={() => router.push("/app/charity/volunteers/new")} style={{ background: "var(--primary)", color: "#fff" }}>
          <Plus size={16} className="mr-2" /> Register Volunteer
        </Button>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Volunteers", value: "284", icon: HandHeart, color: "#1a56db" },
          { label: "Active", value: "218", icon: HandHeart, color: "#16a34a" },
          { label: "Hours This Month", value: "1,847", icon: Shield, color: "#d97706" },
          { label: "New This Quarter", value: "34", icon: Plus, color: "#06b6d4" },
        ].map(stat => (
          <div key={stat.label} className="rounded-xl p-4 border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
            <p className="text-xs font-medium mb-1" style={{ color: "var(--muted-foreground)" }}>{stat.label}</p>
            <p className="text-2xl font-bold" style={{ color: stat.color }}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border mb-4" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
        <div className="p-4 flex gap-3 flex-wrap border-b" style={{ borderColor: "var(--border)" }}>
          <div className="relative flex-1 min-w-[200px]">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--muted-foreground)" }} />
            <Input placeholder="Search volunteers..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9 h-9" style={{ background: "var(--background)", borderColor: "var(--border)", color: "var(--foreground)" }} />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-36 h-9" style={{ background: "var(--background)", borderColor: "var(--border)", color: "var(--foreground)" }}>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="suspended">Suspended</SelectItem>
            </SelectContent>
          </Select>
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-36 h-9" style={{ background: "var(--background)", borderColor: "var(--border)", color: "var(--foreground)" }}>
              <SelectValue placeholder="Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="fundraising">Fundraising</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="fieldwork">Fieldwork</SelectItem>
              <SelectItem value="events">Events</SelectItem>
              <SelectItem value="mentoring">Mentoring</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                {["Volunteer", "Email", "Role", "Status", "Hours YTD", "Start Date", "DBS Check", "Actions"].map(h => (
                  <th key={h} className="text-left px-4 py-3 font-medium" style={{ color: "var(--muted-foreground)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((v, i) => (
                <tr key={v.id} className="cursor-pointer" style={{ borderBottom: i < filtered.length - 1 ? "1px solid var(--border)" : "none" }}
                  onClick={() => router.push(`/app/charity/volunteers/${v.id}`)}
                  onMouseEnter={e => (e.currentTarget.style.background = "var(--secondary)")}
                  onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold text-white" style={{ background: "var(--primary)" }}>
                        {getInitials(v.name)}
                      </div>
                      <span className="font-medium" style={{ color: "var(--foreground)" }}>{v.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3" style={{ color: "var(--muted-foreground)" }}>{v.email}</td>
                  <td className="px-4 py-3" style={{ color: "var(--foreground)" }}>{v.role}</td>
                  <td className="px-4 py-3">{statusBadge(v.status)}</td>
                  <td className="px-4 py-3 font-medium" style={{ color: "var(--foreground)" }}>{v.hoursYtd.toLocaleString()}</td>
                  <td className="px-4 py-3" style={{ color: "var(--muted-foreground)" }}>{formatDate(v.startDate)}</td>
                  <td className="px-4 py-3">{dbsBadge(v.dbsCheck)}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1" onClick={e => e.stopPropagation()}>
                      <button className="p-1.5 rounded-md" title="View" style={{ color: "var(--muted-foreground)" }} onClick={() => router.push(`/app/charity/volunteers/${v.id}`)}>
                        <Eye size={15} />
                      </button>
                      <button className="p-1.5 rounded-md" title="Edit" style={{ color: "var(--muted-foreground)" }}>
                        <Edit2 size={15} />
                      </button>
                      <button className="p-1.5 rounded-md" title="Message" style={{ color: "var(--muted-foreground)" }}>
                        <MessageSquare size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t" style={{ borderColor: "var(--border)" }}>
          <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>{filtered.length} volunteer{filtered.length !== 1 ? "s" : ""} shown</p>
        </div>
      </div>
    </div>
  )
}
