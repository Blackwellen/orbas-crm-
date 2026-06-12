"use client"
import { AppSidebar } from "@/components/layout/app-sidebar"
import { useAppStore } from "@/store/app-store"
import { Heart, Users, PoundSterling, Gift, Megaphone, Award, TrendingUp, BarChart2, Settings, HandHeart, Target } from "lucide-react"
import { cn } from "@/lib/utils"
const items = [
  { label: "Overview", icon: Heart, href: "/app/charity" },
  { label: "Donors", icon: Users, href: "/app/charity/donors" },
  { label: "Donations", icon: PoundSterling, href: "/app/charity/donations" },
  { label: "Gift Aid", icon: Gift, href: "/app/charity/gift-aid" },
  { label: "Campaigns", icon: Megaphone, href: "/app/charity/campaigns" },
  { label: "Grants", icon: Award, href: "/app/charity/grants" },
  { label: "Volunteers", icon: HandHeart, href: "/app/charity/volunteers" },
  { label: "Pledges", icon: Target, href: "/app/charity/pledges" },
  { label: "Impact", icon: TrendingUp, href: "/app/charity/impact" },
  { label: "Reports", icon: BarChart2, href: "/app/charity/reports" },
  { label: "Settings", icon: Settings, href: "/app/charity/settings" },
]
export default function CharityLayout({ children }: { children: React.ReactNode }) {
  const collapsed = useAppStore(s => s.sidebarCollapsed)
  return (
    <div className="flex min-h-screen">
      <AppSidebar items={items} appName="Charity" appColor="#e11d48" />
      <main className={cn("flex-1 transition-all duration-200 min-h-screen", collapsed ? "ml-16" : "ml-60")}>{children}</main>
    </div>
  )
}
