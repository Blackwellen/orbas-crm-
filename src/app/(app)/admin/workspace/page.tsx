"use client"

import * as React from "react"
import { Shield, Globe, Database, AlertTriangle, Upload } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export default function WorkspaceSettingsPage() {
  const [twoFaEnforced, setTwoFaEnforced] = React.useState(false)
  const [ipAllowlist, setIpAllowlist] = React.useState(false)
  const [sessionTimeout, setSessionTimeout] = React.useState("8")

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--foreground)]">Workspace Settings</h1>
        <p className="text-sm text-[var(--muted-foreground)] mt-0.5">Configure your workspace preferences, security, and data settings</p>
      </div>

      <Tabs defaultValue="general">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="data">Data</TabsTrigger>
        </TabsList>

        {/* General tab */}
        <TabsContent value="general" className="mt-4 space-y-5">
          <Card className="border-[var(--border)]">
            <CardHeader><CardTitle className="text-base flex items-center gap-2"><Globe className="h-4 w-4" /> Workspace Identity</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-5">
                <div className="h-20 w-20 rounded-xl bg-[var(--muted)] border border-[var(--border)] flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl font-bold text-[var(--primary)]">O</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-[var(--foreground)]">Workspace Logo</p>
                  <p className="text-xs text-[var(--muted-foreground)] mt-0.5">PNG, JPG or SVG. Max 2 MB.</p>
                  <Button variant="outline" size="sm" className="mt-2 gap-1.5 h-7 text-xs">
                    <Upload className="h-3.5 w-3.5" /> Upload Logo
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label>Workspace Name</Label>
                  <Input defaultValue="Orbas Demo" />
                </div>
                <div className="space-y-1.5">
                  <Label>Workspace Slug</Label>
                  <div className="flex">
                    <span className="flex items-center px-3 text-sm bg-[var(--muted)] border border-r-0 border-[var(--border)] rounded-l-md text-[var(--muted-foreground)]">
                      app.orbas.io/
                    </span>
                    <Input defaultValue="orbas-demo" className="rounded-l-none" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label>Timezone</Label>
                  <Select defaultValue="europe-london">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="europe-london">Europe/London (UTC+0)</SelectItem>
                      <SelectItem value="europe-paris">Europe/Paris (UTC+1)</SelectItem>
                      <SelectItem value="america-new_york">America/New_York (UTC-5)</SelectItem>
                      <SelectItem value="america-los_angeles">America/Los_Angeles (UTC-8)</SelectItem>
                      <SelectItem value="asia-dubai">Asia/Dubai (UTC+4)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label>Locale</Label>
                  <Select defaultValue="en-GB">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en-GB">English (UK)</SelectItem>
                      <SelectItem value="en-US">English (US)</SelectItem>
                      <SelectItem value="fr-FR">Français</SelectItem>
                      <SelectItem value="de-DE">Deutsch</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label>Currency</Label>
                  <Select defaultValue="GBP">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="GBP">GBP (£)</SelectItem>
                      <SelectItem value="USD">USD ($)</SelectItem>
                      <SelectItem value="EUR">EUR (€)</SelectItem>
                      <SelectItem value="AED">AED (د.إ)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button className="orbas-gradient text-white">Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security tab */}
        <TabsContent value="security" className="mt-4 space-y-5">
          <Card className="border-[var(--border)]">
            <CardHeader><CardTitle className="text-base flex items-center gap-2"><Shield className="h-4 w-4" /> Authentication & Access</CardTitle></CardHeader>
            <CardContent className="space-y-5">
              {/* SSO */}
              <div className="rounded-lg border border-[var(--border)] p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-[var(--foreground)]">SSO / SAML Configuration</p>
                    <p className="text-xs text-[var(--muted-foreground)] mt-0.5">Connect your identity provider via SAML 2.0 or OIDC</p>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-xs bg-[var(--muted)] text-[var(--muted-foreground)] font-medium">Not configured</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label className="text-xs">IdP SSO URL</Label>
                    <Input placeholder="https://idp.example.com/sso/saml" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs">Entity ID</Label>
                    <Input placeholder="https://idp.example.com/entity" />
                  </div>
                  <div className="space-y-1.5 md:col-span-2">
                    <Label className="text-xs">X.509 Certificate</Label>
                    <Textarea placeholder="Paste your certificate here..." className="font-mono text-xs h-24" />
                  </div>
                </div>
                <Button variant="outline" size="sm" className="h-7 text-xs">Save SSO Config</Button>
              </div>

              {/* 2FA toggle */}
              <div className="flex items-center justify-between py-3 border-b border-[var(--border)]">
                <div>
                  <p className="text-sm font-medium text-[var(--foreground)]">Enforce 2FA for all members</p>
                  <p className="text-xs text-[var(--muted-foreground)] mt-0.5">Members without 2FA will be prompted to set it up on next login</p>
                </div>
                <Switch checked={twoFaEnforced} onCheckedChange={setTwoFaEnforced} />
              </div>

              {/* Session timeout */}
              <div className="flex items-center justify-between py-3 border-b border-[var(--border)]">
                <div>
                  <p className="text-sm font-medium text-[var(--foreground)]">Session Timeout</p>
                  <p className="text-xs text-[var(--muted-foreground)] mt-0.5">Automatically log out inactive users</p>
                </div>
                <Select value={sessionTimeout} onValueChange={setSessionTimeout}>
                  <SelectTrigger className="w-36">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 hour</SelectItem>
                    <SelectItem value="4">4 hours</SelectItem>
                    <SelectItem value="8">8 hours</SelectItem>
                    <SelectItem value="24">24 hours</SelectItem>
                    <SelectItem value="never">Never</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* IP allowlist */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-[var(--foreground)]">IP Allowlist</p>
                    <p className="text-xs text-[var(--muted-foreground)] mt-0.5">Restrict access to specific IP ranges</p>
                  </div>
                  <Switch checked={ipAllowlist} onCheckedChange={setIpAllowlist} />
                </div>
                {ipAllowlist && (
                  <Textarea
                    placeholder={"82.45.0.0/16\n194.23.0.0/24"}
                    className="font-mono text-xs h-24"
                  />
                )}
              </div>

              <Button className="orbas-gradient text-white">Save Security Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Data tab */}
        <TabsContent value="data" className="mt-4 space-y-5">
          <Card className="border-[var(--border)]">
            <CardHeader><CardTitle className="text-base flex items-center gap-2"><Database className="h-4 w-4" /> Data & Compliance</CardTitle></CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-1.5">
                <Label>Data Residency Region</Label>
                <Select defaultValue="eu-west">
                  <SelectTrigger className="w-72">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="eu-west">EU West (Dublin, Ireland)</SelectItem>
                    <SelectItem value="eu-central">EU Central (Frankfurt, Germany)</SelectItem>
                    <SelectItem value="us-east">US East (Virginia)</SelectItem>
                    <SelectItem value="us-west">US West (Oregon)</SelectItem>
                    <SelectItem value="ap-south">Asia Pacific (Singapore)</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-[var(--muted-foreground)]">Data is stored and processed in this region. Contact support to migrate regions.</p>
              </div>

              <div className="rounded-lg border border-[var(--border)] p-4">
                <p className="text-sm font-semibold text-[var(--foreground)]">GDPR Data Export</p>
                <p className="text-xs text-[var(--muted-foreground)] mt-1">
                  Export all workspace data as a zip archive in compliance with GDPR Article 20 (data portability).
                  The export will be emailed to the workspace owner.
                </p>
                <Button variant="outline" size="sm" className="mt-3 h-8 text-xs">Request Data Export</Button>
              </div>
            </CardContent>
          </Card>

          {/* Danger zone */}
          <Card className="border-red-200">
            <CardHeader>
              <CardTitle className="text-base text-red-600 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" /> Danger Zone
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[var(--foreground)]">Delete Workspace</p>
                  <p className="text-xs text-[var(--muted-foreground)]">
                    Permanently delete this workspace and all its data. This cannot be undone.
                  </p>
                </div>
                <Button variant="destructive" size="sm" className="h-8 text-xs">Delete Workspace</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
