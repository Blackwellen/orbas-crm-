"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  Grid3x3,
  ChevronDown,
  Search,
  Plus,
  Zap,
  Bell,
  HelpCircle,
  User,
  Settings,
  LogOut,
  Building2,
  UserCircle,
  FileText,
  Briefcase,
  TicketIcon,
  CheckSquare,
  TrendingUp,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { AppLauncherPopover } from "./app-launcher"
import { useAppStore } from "@/store/app-store"
import { useUserStore } from "@/store/user-store"
import { createClient } from "@/lib/supabase/client"

const QUICK_CREATE_ITEMS = [
  { label: "New Lead", icon: TrendingUp, href: "/app/crm/leads/new" },
  { label: "New Contact", icon: UserCircle, href: "/app/crm/contacts/new" },
  { label: "New Deal", icon: Briefcase, href: "/app/crm/deals/new" },
  { label: "New Invoice", icon: FileText, href: "/app/accounting/invoices/new" },
  { label: "New Project", icon: CheckSquare, href: "/app/projects/new" },
  { label: "New Ticket", icon: TicketIcon, href: "/app/service/tickets/new" },
  { label: "New Task", icon: CheckSquare, href: "/app/home/tasks/new" },
]

function Breadcrumb() {
  const pathname = usePathname()
  const segments = pathname.split("/").filter(Boolean)

  const crumbs = segments.slice(1).map((seg) =>
    seg
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ")
  )

  if (crumbs.length === 0) return null

  return (
    <nav className="hidden md:flex items-center gap-1 text-sm text-[var(--muted-foreground)]">
      {crumbs.map((crumb, i) => (
        <React.Fragment key={i}>
          {i > 0 && <span className="text-[var(--border)]">/</span>}
          <span
            className={cn(
              i === crumbs.length - 1
                ? "text-[var(--foreground)] font-medium"
                : "hover:text-[var(--foreground)] transition-colors cursor-pointer"
            )}
          >
            {crumb}
          </span>
        </React.Fragment>
      ))}
    </nav>
  )
}

function WorkspaceSwitcher() {
  const workspace = useAppStore((s) => s.currentWorkspace)
  const name = workspace?.name ?? "Orbas Workspace"

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="gap-1.5 font-medium text-[var(--foreground)] max-w-[160px]"
        >
          <span className="truncate">{name}</span>
          <ChevronDown className="h-3.5 w-3.5 shrink-0 text-[var(--muted-foreground)]" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        <DropdownMenuLabel>Workspaces</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="font-medium">
          <Building2 className="h-4 w-4" />
          {name}
          <Badge variant="secondary" className="ml-auto text-[10px]">
            {workspace?.plan ?? "Free"}
          </Badge>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/app/settings/workspace/general">
            <Settings className="h-4 w-4" />
            Workspace Settings
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function AvatarDropdown() {
  const user = useUserStore((s) => s.user)
  const clearUser = useUserStore((s) => s.clearUser)
  const router = useRouter()
  const initials = user?.fullName
    ? user.fullName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "U"

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    clearUser()
    router.push("/login")
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] text-xs font-semibold hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
          aria-label="User menu"
        >
          {user?.avatarUrl ? (
            <Image
              src={user.avatarUrl}
              alt={user.fullName}
              width={32}
              height={32}
              className="rounded-full object-cover"
            />
          ) : (
            initials
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col gap-0.5">
            <span className="font-semibold">{user?.fullName ?? "User"}</span>
            <span className="text-xs font-normal text-[var(--muted-foreground)] truncate">
              {user?.email ?? ""}
            </span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/app/settings/account/profile">
            <User className="h-4 w-4" />
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/app/settings/account/profile">
            <Settings className="h-4 w-4" />
            Account Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/app/settings/workspace/general">
            <Building2 className="h-4 w-4" />
            Switch Workspace
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-[var(--destructive)] focus:text-[var(--destructive)]"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function TopNav() {
  const [launcherOpen, setLauncherOpen] = React.useState(false)

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 flex h-14 items-center gap-2 px-3 border-b"
      style={{
        background: "var(--topnav-bg)",
        borderColor: "var(--topnav-border)",
      }}
    >
      {/* Left */}
      <div className="flex items-center gap-1 shrink-0">
        <AppLauncherPopover open={launcherOpen} onOpenChange={setLauncherOpen}>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            aria-label="App launcher"
            onClick={() => setLauncherOpen((o) => !o)}
          >
            <Grid3x3 className="h-4 w-4" />
          </Button>
        </AppLauncherPopover>

        <Link href="/app/home" className="flex items-center">
          <Image
            src="/orbas crm logo.png"
            alt="Orbas CRM"
            width={100}
            height={28}
            className="object-contain"
            priority
          />
        </Link>

        <WorkspaceSwitcher />
      </div>

      {/* Center */}
      <div className="flex flex-1 items-center justify-center gap-4 min-w-0 px-4">
        <Breadcrumb />
        <div className="hidden lg:flex items-center gap-2 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--secondary)] px-3 py-1.5 text-sm text-[var(--muted-foreground)] cursor-pointer hover:border-[var(--primary)] transition-colors w-64">
          <Search className="h-3.5 w-3.5 shrink-0" />
          <span className="flex-1">Search anything...</span>
          <kbd className="hidden sm:inline-flex h-5 items-center gap-0.5 rounded border border-[var(--border)] bg-[var(--background)] px-1.5 text-[10px] font-medium text-[var(--muted-foreground)]">
            <span>⌘</span>K
          </kbd>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-1 shrink-0">
        {/* Quick Create */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="default"
              size="sm"
              className="h-8 gap-1 px-2.5"
              aria-label="Quick create"
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">New</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>Quick Create</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {QUICK_CREATE_ITEMS.map((item) => (
              <DropdownMenuItem key={item.label} asChild>
                <Link href={item.href}>
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Automation runs */}
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 relative"
          aria-label="Automation runs"
        >
          <Zap className="h-4 w-4" />
          <span className="absolute top-1 right-1 h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
        </Button>

        {/* Notifications */}
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 relative"
          aria-label="Notifications"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--destructive)] text-[var(--destructive-foreground)] text-[9px] font-bold">
            3
          </span>
        </Button>

        {/* Help */}
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          aria-label="Help"
        >
          <HelpCircle className="h-4 w-4" />
        </Button>

        {/* Avatar */}
        <AvatarDropdown />
      </div>
    </header>
  )
}
