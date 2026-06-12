"use client"

import * as React from "react"
import Link from "next/link"
import {
  Search, Plus, MoreHorizontal, Mail, Shield, UserX, ChevronRight
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter
} from "@/components/ui/dialog"
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

const APPS = ["CRM", "Accounting", "Operations", "Projects", "People", "Service"]

const users = [
  {
    id: "1", name: "Sarah Johnson", email: "sarah.johnson@orbas.io", role: "Owner",
    apps: ["CRM", "Accounting", "Operations", "Projects", "People", "Service"],
    status: "Active", lastActive: "2 min ago", initials: "SJ",
  },
  {
    id: "2", name: "James Carter", email: "james.carter@orbas.io", role: "Admin",
    apps: ["CRM", "Accounting", "Operations", "Projects", "Service"],
    status: "Active", lastActive: "1 hr ago", initials: "JC",
  },
  {
    id: "3", name: "Emily Davis", email: "emily.davis@orbas.io", role: "Member",
    apps: ["CRM", "Service"],
    status: "Active", lastActive: "3 hrs ago", initials: "ED",
  },
  {
    id: "4", name: "Tom Webb", email: "tom.webb@acme.com", role: "Member",
    apps: ["CRM"],
    status: "Invited", lastActive: "—", initials: "TW",
  },
  {
    id: "5", name: "Rebecca Mills", email: "r.mills@orbas.io", role: "Viewer",
    apps: ["CRM", "Accounting"],
    status: "Active", lastActive: "2 days ago", initials: "RM",
  },
  {
    id: "6", name: "Chris Nguyen", email: "c.nguyen@orbas.io", role: "Member",
    apps: ["Operations", "Projects"],
    status: "Deactivated", lastActive: "30 days ago", initials: "CN",
  },
]

const roleColors: Record<string, string> = {
  Owner: "bg-[var(--primary)] text-white",
  Admin: "bg-violet-100 text-violet-700",
  Member: "bg-[var(--muted)] text-[var(--foreground)]",
  Viewer: "bg-[var(--muted)] text-[var(--muted-foreground)]",
}

const statusColors: Record<string, string> = {
  Active: "bg-green-100 text-green-700",
  Invited: "bg-amber-100 text-amber-700",
  Deactivated: "bg-red-100 text-red-700",
}

export default function AdminUsersPage() {
  const [search, setSearch] = React.useState("")
  const [inviteOpen, setInviteOpen] = React.useState(false)
  const [inviteEmail, setInviteEmail] = React.useState("")
  const [inviteRole, setInviteRole] = React.useState("Member")
  const [inviteApps, setInviteApps] = React.useState<string[]>([])

  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  )

  function toggleApp(app: string) {
    setInviteApps(prev =>
      prev.includes(app) ? prev.filter(a => a !== app) : [...prev, app]
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--foreground)]">Users & Roles</h1>
          <p className="text-sm text-[var(--muted-foreground)] mt-0.5">Manage workspace members and their permissions</p>
        </div>
        <Button className="gap-2 orbas-gradient text-white" onClick={() => setInviteOpen(true)}>
          <Plus className="h-4 w-4" /> Invite User
        </Button>
      </div>

      <Card className="border-[var(--border)]">
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <CardTitle className="text-base font-semibold">{users.length} Members</CardTitle>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-[var(--muted-foreground)]" />
            <Input
              placeholder="Search members…"
              className="pl-8 h-8 w-60 text-sm"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--border)] bg-[var(--muted)]/40">
                  <th className="px-4 py-3 text-left text-xs font-medium text-[var(--muted-foreground)]">Name</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-[var(--muted-foreground)]">Role</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-[var(--muted-foreground)] hidden lg:table-cell">App Access</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-[var(--muted-foreground)]">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-[var(--muted-foreground)] hidden md:table-cell">Last Active</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-[var(--muted-foreground)]">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {filtered.map(user => (
                  <tr key={user.id} className="hover:bg-[var(--muted)]/20 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="text-xs bg-[var(--primary)]/10 text-[var(--primary)]">
                            {user.initials}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <Link href={`/app/admin/users/${user.id}`}>
                            <p className="text-sm font-medium text-[var(--foreground)] hover:text-[var(--primary)] hover:underline">
                              {user.name}
                            </p>
                          </Link>
                          <p className="text-xs text-[var(--muted-foreground)]">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={cn("inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium", roleColors[user.role])}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <div className="flex flex-wrap gap-1">
                        {user.apps.slice(0, 3).map(app => (
                          <span key={app} className="inline-flex px-1.5 py-0.5 rounded text-[10px] font-medium bg-[var(--muted)] text-[var(--muted-foreground)]">
                            {app}
                          </span>
                        ))}
                        {user.apps.length > 3 && (
                          <span className="inline-flex px-1.5 py-0.5 rounded text-[10px] font-medium bg-[var(--muted)] text-[var(--muted-foreground)]">
                            +{user.apps.length - 3}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={cn("inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium", statusColors[user.status])}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-[var(--muted-foreground)] hidden md:table-cell">{user.lastActive}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Link href={`/app/admin/users/${user.id}`}>
                          <Button variant="ghost" size="sm" className="h-7 text-xs gap-1 text-[var(--primary)]">
                            View <ChevronRight className="h-3 w-3" />
                          </Button>
                        </Link>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem className="gap-2 text-sm">
                              <Shield className="h-3.5 w-3.5" /> Change Role
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2 text-sm">
                              <Mail className="h-3.5 w-3.5" /> Resend Invite
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2 text-sm text-red-600 focus:text-red-600">
                              <UserX className="h-3.5 w-3.5" /> Deactivate
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Invite modal */}
      <Dialog open={inviteOpen} onOpenChange={setInviteOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Invite User</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label>Email Address</Label>
              <Input
                type="email"
                placeholder="colleague@example.com"
                value={inviteEmail}
                onChange={e => setInviteEmail(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Role</Label>
              <Select value={inviteRole} onValueChange={setInviteRole}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="Member">Member</SelectItem>
                  <SelectItem value="Viewer">Viewer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Grant App Access</Label>
              <div className="grid grid-cols-2 gap-2">
                {APPS.map(app => (
                  <label key={app} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="h-3.5 w-3.5 accent-[var(--primary)]"
                      checked={inviteApps.includes(app)}
                      onChange={() => toggleApp(app)}
                    />
                    <span className="text-sm text-[var(--foreground)]">{app}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setInviteOpen(false)}>Cancel</Button>
            <Button className="orbas-gradient text-white" onClick={() => setInviteOpen(false)}>
              Send Invite
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
