import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { TopNav } from "@/components/layout/top-nav"
import { ChatBubble } from "@/components/layout/chat-bubble"
import { Toaster } from "@/components/ui/toaster"

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <TopNav />
      <div className="pt-14">
        {children}
      </div>
      <ChatBubble />
      <Toaster />
    </div>
  )
}
