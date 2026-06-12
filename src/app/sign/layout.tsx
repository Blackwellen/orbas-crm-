import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sign Document — Orbas",
  description: "Review and sign your document securely with Orbas eSign",
}

export default function SignLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: "100vh", background: "#f1f5f9" }}>
      {children}
    </div>
  )
}
