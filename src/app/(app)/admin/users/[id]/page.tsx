"use client"

import * as React from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import {
  ArrowLeft, Monitor, Smartphone, Globe, Shield,
  UserX, ChevronRight, CheckCircle, XCircle
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

const userData: Record<string, {
  id: string, name: string, email: string, role: string,
  title: string, department: string, status: string, initials: string,
  joinedDate: string, lastActive: string
}> = {
  "1": {
    id: "1", name: "Sarah Johnson", email: "sarah.johnson@orbas.io",
    role: "Owner", title: "CEO", department: "Leadership",
    status: "Active", initials: "SJ", joinedDate: "Jan 15, 2024", lastActive: "2 min ago",
  },
  "2": {
    id: "2", name: "James Carter", email: "james.carter@orbas.io",
    role: "Admin", title: "Head of Sales", department: "Sales",
    status: "Active", initials: "JC", joinedDate: "Feb 3, 2024", lastActive: "1 hr ago",
  },
}

const APPS = ["CRM", "Accounting", "Operations", "Projects", "People", "Service", "Analytics", "Documents"]

const sessions = [
  { device: "MacBook Pro", browser: "Chrome 124", ip: "82.45.123.1", location: "London, UK", lastSeen: "Active now" },
  { device: "iPhone 15", browser: "Safari Mobile", ip: "82.45.123.1", location: "London, UK", lastSeen: "2 hrs ago" },
  { device: "Windows PC", browser: "Edge 122", ip: "194.23.45.100", location: "Manchester, UK", lastSeen: "3 days ago" },
]

const auditLog = [
  { action: "Updated", resource: "Contact: Nexus Corp", time: "Today 10:42 AM", type: "Update" },
  { action: "Created", resource: "Invoice #1042", time: "Today 09:15 AM", type: "Create" },
  { action: "Deleted", resource: "Lead: Alex Turner", time: "Yesterday 4:30 PM", type: "Delete" },
  { action: "Logged in", resource: "from Chrome / MacBook", time: "Yesterday 9:00 AM", type: "Auth" },
  { action: "Invited", resource: "tom.webb@acme.com", time: "Jun 8, 2026", type: "Invite" },
]

const typeColors: Record<string, string> = {
  Update: "bg-amber-100 text-amber-700",
  Create: "bg-green-100 text-green-700",
  Delete: "bg-red-100 text-red-700",
  Auth: "bg-blue-100 text-blue-700",
  Invite: "bg-violet-100 text-violet-700",
}

export default function AdminUserDetailPage() {
  const params = useParams()
  const id = typeof params.id === "string" ? params.id : "1"
  const user = userData[id] || userData["1"]
  const [appAccess, setAppAccess] = React.useState<Record<string, boolean>>(
    Object.fromEntries(APPS.map((a, i) => [a, i < 5]))
  )

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/app/admin/users">
          <Button variant="ghost" size="sm" className="gap-1.5 text-[var(--muted-foreground)]">
            <ArrowLeft className="h-4 w-4" /> Users
          </Button>
        </Link>
        <ChevronRight className="h-4 w-4 text-[var(--muted-foreground)]" />
        <span className="text-sm text-[var(--foreground)] font-medium">{user.name}</span>
      </div>

      {/* User hero */}
      <div className="flex items-start gap-4">
        <Avatar className="h-16 w-16">
          <AvatarFallback className="text-xl bg-[var(--primary)]/10 text-[var(--primary)] font-bold">
            {user.initials}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-[var(--foreground)]">{user.name}</h1>
            <span className={cn("px-2.5 py-0.5 rounded-full text-xs font-semibold",
              user.role === "Owner" ? "bg-[var(--primary)] text-white" : "bg-violet-100 text-violet-700"
            )}>
              {user.role}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
              {user.status}
            </span>
          </div>
          <p className="text-sm text-[var(--muted-foreground)] mt-0.5">
            {user.title} · {user.department} · {user.email}
          </p>
          <p className="text-xs text-[var(--muted-foreground)] mt-0.5">
            Joined {user.joinedDate} · Last active {user.lastActive}
          </p>
        </div>
        <Button variant="destructive" size="sm" className="gap-1.5">
          <UserX className="h-4 w-4" /> Deactivate
        </Button>
      </div>

      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="permissions">Roles & Permissions</TabsTrigger>
          <TabsTrigger value="sessions">Sessions</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        {/* Profile tab */}
        <TabsContent value="profile" className="mt-4">
          <Card className="border-[var(--border)]">
            <CardHeader><CardTitle className="text-base">Profile Information</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { label: "Full Name", value: user.name },
                  { label: "Email", value: user.email },
                  { label: "Job Title", value: user.title },
                  { label: "Department", value: user.department },
                  { label: "Member Since", value: user.joinedDate },
                  { label: "Last Active", value: user.lastActive },
                ].map(f => (
                  <div key={f.label} className="space-y-1">
                    <Label className="text-xs text-[var(--muted-foreground)]">{f.label}</Label>
                    <p className="text-sm font-medium text-[var(--foreground)]">{f.value}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Permissions tab */}
        <TabsContent value="permissions" className="mt-4 space-y-4">
          <Card className="border-[var(--border)]">
            <CardHeader><CardTitle className="text-base">Workspace Role</CardTitle></CardHeader>
            <CardContent>
              <Select defaultValue={user.role}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Owner">Owner</SelectItem>
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="Member">Member</SelectItem>
                  <SelectItem value="Viewer">Viewer</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
          <Card className="border-[var(--border)]">
            <CardHeader><CardTitle className="text-base">App Access</CardTitle></CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {APPS.map(app => (
                  <div key={app} className="flex items-center justify-between p-3 rounded-lg border border-[var(--border)]">
                    <Label className="text-sm font-medium cursor-pointer">{app}</Label>
                    <Switch
                      checked={appAccess[app]}
                      onCheckedChange={v => setAppAccess(prev => ({ ...prev, [app]: v }))}
                    />
                  </div>
                ))}
              </div>
              <Button className="mt-4 orbas-gradient text-white">Save Permissions</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Sessions tab */}
        <TabsContent value="sessions" className="mt-4">
          <Card className="border-[var(--border)]">
            <CardHeader>
              <CardTitle className="text-base">Active Sessions</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-[var(--border)]">
                {sessions.map((s, i) => (
                  <div key={i} className="flex items-center gap-4 px-5 py-4">
                    {s.device.includes("Phone") || s.device.includes("iPhone") ? (
                      <Smartphone className="h-5 w-5 text-[var(--muted-foreground)] shrink-0" />
                    ) : (
                      <Monitor className="h-5 w-5 text-[var(--muted-foreground)] shrink-0" />
                    )}
                    <div className="flex-1">
                      <p className="text-sm font-medium text-[var(--foreground)]">{s.device}</p>
                      <p className="text-xs text-[var(--muted-foreground)]">{s.browser} · {s.ip} · {s.location}</p>
                    </div>
                    <div className="text-right">
                      <p className={cn("text-xs font-medium", s.lastSeen === "Active now" ? "text-green-600" : "text-[var(--muted-foreground)]")}>
                        {s.lastSeen}
                      </p>
                    </div>
                    <Button variant="outline" size="sm" className="h-7 text-xs text-red-600 border-red-200 hover:bg-red-50">
                      Revoke
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Activity tab */}
        <TabsContent value="activity" className="mt-4">
          <Card className="border-[var(--border)]">
            <CardHeader><CardTitle className="text-base">Activity Log</CardTitle></CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-[var(--border)]">
                {auditLog.map((ev, i) => (
                  <div key={i} className="flex items-center gap-3 px-5 py-3">
                    <span className={cn("shrink-0 px-1.5 py-0.5 rounded text-[10px] font-semibold", typeColors[ev.type])}>
                      {ev.type}
                    </span>
                    <div className="flex-1">
                      <p className="text-sm text-[var(--foreground)]">
                        <span className="font-medium">{ev.action}</span> {ev.resource}
                      </p>
                    </div>
                    <p className="text-xs text-[var(--muted-foreground)] whitespace-nowrap">{ev.time}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
