"use client"
import { AppSidebar } from "@/components/layout/app-sidebar"
import { useAppStore } from "@/store/app-store"
import { User, Lock, Bell, Palette, Key, Plug, CreditCard } from "lucide-react"
import { cn } from "@/lib/utils"
const items = [
  { label: "Profile", icon: User, href: "/app/settings" },
  { label: "Security", icon: Lock, href: "/app/settings/security" },
  { label: "Notifications", icon: Bell, href: "/app/settings/notifications" },
  { label: "Appearance", icon: Palette, href: "/app/settings/appearance" },
  { label: "API Tokens", icon: Key, href: "/app/settings/tokens" },
  { label: "Integrations", icon: Plug, href: "/app/settings/integrations" },
  { label: "Billing", icon: CreditCard, href: "/app/settings/billing" },
]
export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  const collapsed = useAppStore(s => s.sidebarCollapsed)
  return (
    <div className="flex min-h-screen">
      <AppSidebar items={items} appName="Settings" appColor="#475569" />
      <main className={cn("flex-1 transition-all duration-200 min-h-screen", collapsed ? "ml-16" : "ml-60")}>{children}</main>
    </div>
  )
}
