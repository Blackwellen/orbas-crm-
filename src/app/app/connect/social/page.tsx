"use client"

import React, { useState } from "react"
import { Globe, Share2, Image, Users2, MessageCircle, ExternalLink, ThumbsUp, AlertCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const SOCIAL_MENTIONS = [
  {
    id: 1, platform: "twitter", handle: "@oliver_grant", name: "Oliver Grant",
    message: "@orbas_support Your API has been down for 20 minutes! This is completely unacceptable for an enterprise product.",
    time: "28m ago", sentiment: "negative", replied: false, engagement: { likes: 3, retweets: 1 },
  },
  {
    id: 2, platform: "twitter", handle: "@mia_tech", name: "Mia Nguyen",
    message: "Really impressed with @orbas_support — resolved my issue in under 10 minutes. Top notch service!",
    time: "1h ago", sentiment: "positive", replied: true, engagement: { likes: 12, retweets: 4 },
  },
  {
    id: 3, platform: "instagram", handle: "@brightpulse_official", name: "BrightPulse Ltd",
    message: "Just migrated our entire CRM to @orbas_crm — the onboarding experience is phenomenal!",
    time: "2h ago", sentiment: "positive", replied: false, engagement: { likes: 47, retweets: 0 },
  },
  {
    id: 4, platform: "facebook", handle: "DataVault Ltd", name: "DataVault Ltd",
    message: "Has anyone had issues with the Orbas SSO integration? We're getting inconsistent results since the last update.",
    time: "3h ago", sentiment: "neutral", replied: false, engagement: { likes: 2, retweets: 0 },
  },
  {
    id: 5, platform: "twitter", handle: "@noahkim_vc", name: "Noah Kim",
    message: "The new @orbas_crm dashboard is clean but needs better mobile support. Fingers crossed for the next update.",
    time: "4h ago", sentiment: "neutral", replied: true, engagement: { likes: 8, retweets: 2 },
  },
]

const platformConfig: Record<string, { color: string; bg: string; icon: React.ComponentType<{ className?: string }> }> = {
  twitter:   { color: "#1da1f2", bg: "#eff8ff", icon: Globe },
  instagram: { color: "#e1306c", bg: "#fff0f5", icon: Image },
  facebook:  { color: "#1877f2", bg: "#eff4ff", icon: Globe },
}

const sentimentConfig: Record<string, { color: string; bg: string }> = {
  positive: { color: "#16a34a", bg: "#f0fdf4" },
  neutral:  { color: "#d97706", bg: "#fffbeb" },
  negative: { color: "#dc2626", bg: "#fef2f2" },
}

export default function SocialPage() {
  const [selected, setSelected] = useState("all")

  const filtered = SOCIAL_MENTIONS.filter(m =>
    selected === "all" || m.platform === selected || m.sentiment === selected
  )

  return (
    <div className="p-6 space-y-6 max-w-[1400px] mx-auto">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-[var(--foreground)]">Social</h1>
          <p className="text-sm text-[var(--muted-foreground)] mt-0.5">Monitor and respond to social media mentions</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-md border border-[var(--border)] px-3 py-2 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--secondary)]">
          <Globe className="h-4 w-4" /> Connect Account
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Mentions", value: "24", color: "#1a56db" },
          { label: "Unresponded",    value: "9",  color: "#dc2626" },
          { label: "Positive",       value: "14", color: "#16a34a" },
          { label: "Negative",       value: "3",  color: "#d97706" },
        ].map(s => (
          <Card key={s.label} className="border border-[var(--border)]">
            <CardContent className="p-4">
              <p className="text-xs text-[var(--muted-foreground)]">{s.label}</p>
              <p className="text-2xl font-bold mt-1" style={{ color: s.color }}>{s.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 flex-wrap">
        {["all", "twitter", "instagram", "facebook", "negative", "positive"].map(f => (
          <button key={f} onClick={() => setSelected(f)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors capitalize ${
              selected === f
                ? "text-white"
                : "border border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--secondary)]"
            }`}
            style={selected === f ? { background: "var(--primary)" } : {}}>
            {f}
          </button>
        ))}
      </div>

      {/* Mentions */}
      <div className="space-y-3">
        {filtered.map(mention => {
          const pc = platformConfig[mention.platform]
          const sc = sentimentConfig[mention.sentiment]
          const PlatformIcon = pc.icon
          return (
            <Card key={mention.id} className="border border-[var(--border)]">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Avatar className="h-10 w-10 shrink-0">
                    <AvatarFallback className="text-xs" style={{ background: pc.bg, color: pc.color }}>
                      <PlatformIcon className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 flex-wrap">
                      <div>
                        <span className="text-sm font-semibold text-[var(--foreground)]">{mention.name}</span>
                        <span className="text-xs text-[var(--muted-foreground)] ml-2">{mention.handle}</span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium"
                          style={{ color: sc.color, background: sc.bg }}>
                          {mention.sentiment}
                        </span>
                        <span className="text-xs text-[var(--muted-foreground)]">{mention.time}</span>
                      </div>
                    </div>
                    <p className="text-sm text-[var(--foreground)] mt-1.5 leading-relaxed">{mention.message}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="flex items-center gap-1 text-xs text-[var(--muted-foreground)]">
                        <ThumbsUp className="h-3 w-3" /> {mention.engagement.likes}
                      </span>
                      {mention.engagement.retweets > 0 && (
                        <span className="flex items-center gap-1 text-xs text-[var(--muted-foreground)]">
                          <Share2 className="h-3 w-3" /> {mention.engagement.retweets}
                        </span>
                      )}
                      <div className="flex items-center gap-2 ml-auto">
                        {mention.replied
                          ? <span className="text-xs font-medium" style={{ color: "#16a34a" }}>Replied</span>
                          : <button className="rounded-md px-2.5 py-1 text-xs font-medium text-white" style={{ background: "var(--primary)" }}>Reply</button>
                        }
                        <button className="p-1 rounded-md text-[var(--muted-foreground)] hover:bg-[var(--secondary)]">
                          <ExternalLink className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
