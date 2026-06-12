import Image from "next/image"
import Link from "next/link"
import { Shield, Zap, Users, BarChart3 } from "lucide-react"

const FEATURES = [
  { icon: Zap, text: "Full CRM, Finance & Operations in one place" },
  { icon: Users, text: "Built for teams of 5 to 5,000+" },
  { icon: BarChart3, text: "Real-time analytics and AI insights" },
  { icon: Shield, text: "Enterprise-grade security & RLS" },
]

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex">
      {/* Left brand panel */}
      <div className="hidden lg:flex lg:w-[480px] xl:w-[560px] flex-col orbas-gradient p-10 relative overflow-hidden shrink-0">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 h-64 w-64 rounded-full bg-white blur-3xl" />
          <div className="absolute bottom-20 right-10 h-48 w-48 rounded-full bg-white blur-3xl" />
        </div>

        <div className="relative z-10 flex flex-col h-full">
          <Link href="/" className="flex items-center gap-2 mb-12">
            <Image src="/orbas crm logo.png" alt="Orbas CRM" width={140} height={40} className="brightness-0 invert object-contain" />
          </Link>

          <div className="flex-1 flex flex-col justify-center">
            <h1 className="text-3xl font-bold text-white mb-3 leading-tight">
              The enterprise operating suite built for modern teams
            </h1>
            <p className="text-white/80 text-lg mb-10">
              CRM, Finance, Operations, People and more — unified in one platform.
            </p>

            <div className="space-y-4">
              {FEATURES.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3 text-white/90">
                  <div className="h-8 w-8 rounded-lg bg-white/15 flex items-center justify-center shrink-0">
                    <Icon className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm">{text}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="text-white/60 text-sm mt-8">
            © {new Date().getFullYear()} Orbas CRM. All rights reserved.
          </p>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 bg-[var(--background)]">
        <div className="w-full max-w-[420px]">
          {/* Mobile logo */}
          <div className="lg:hidden mb-8 flex justify-center">
            <Link href="/">
              <Image src="/orbas crm logo.png" alt="Orbas CRM" width={140} height={40} className="object-contain" />
            </Link>
          </div>

          {children}
        </div>
      </div>
    </div>
  )
}
