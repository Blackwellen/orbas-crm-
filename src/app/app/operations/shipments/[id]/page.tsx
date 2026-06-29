"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Ship, MapPin, Package2, CheckCircle, Clock, AlertTriangle, Camera } from "lucide-react"

const shipment = {
  id: "1",
  tracking: "DHL-GB-2025-48921",
  carrier: "DHL Express",
  service: "Express Next Day",
  origin: "WH-London",
  destination: "Manchester Customer",
  destinationAddress: "47 Industrial Estate, Trafford Park, Manchester M17 1QS",
  weight: "24.5 kg",
  dimensions: "80 x 60 x 40 cm",
  value: "£4,200.00",
  status: "In Transit",
  created: "2025-06-08 09:30",
  eta: "2025-06-10",
  relatedPO: "PO-2025-0847",
}

const trackingEvents = [
  { time: "2025-06-09 14:22", location: "Birmingham DHL Hub", event: "In transit to destination", status: "transit" },
  { time: "2025-06-09 07:45", location: "Coventry DHL Depot", event: "Departed depot", status: "transit" },
  { time: "2025-06-08 22:10", location: "Coventry DHL Depot", event: "Arrived at depot", status: "arrived" },
  { time: "2025-06-08 18:30", location: "London DHL Collection Point", event: "Collected by DHL", status: "collected" },
  { time: "2025-06-08 15:00", location: "WH-London", event: "Shipment created and awaiting collection", status: "created" },
]

const statusIcon: Record<string, React.ReactNode> = {
  transit: <Clock className="h-4 w-4 text-blue-500" />,
  arrived: <MapPin className="h-4 w-4 text-yellow-500" />,
  collected: <Package2 className="h-4 w-4 text-purple-500" />,
  created: <CheckCircle className="h-4 w-4 text-green-500" />,
  delivered: <CheckCircle className="h-4 w-4 text-green-500" />,
}

export default function ShipmentDetail() {
  const [tab, setTab] = useState("summary")

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-2 text-sm text-[var(--muted-foreground)]">
        <Link href="/app/operations/shipments" className="hover:text-[var(--foreground)] flex items-center gap-1">
          <ArrowLeft className="h-3.5 w-3.5" /> Shipments
        </Link>
        <span>/</span>
        <span className="text-[var(--foreground)] font-mono text-xs">{shipment.tracking}</span>
      </div>

      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <div className="h-12 w-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
            <Ship className="h-6 w-6 text-blue-500" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-semibold font-mono text-[var(--foreground)]">{shipment.tracking}</h1>
              <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium border bg-blue-500/15 text-blue-600 border-blue-300">
                {shipment.status}
              </span>
            </div>
            <p className="text-sm text-[var(--muted-foreground)] mt-1">{shipment.carrier} · {shipment.service} · ETA {shipment.eta}</p>
          </div>
        </div>
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="flex-wrap h-auto gap-1 bg-[var(--muted)]/30">
          {["summary","carrier","tracking-events","delivery-proof","related-order","returns","audit"].map(t => (
            <TabsTrigger key={t} value={t} className="text-xs capitalize">{t.replace(/-/g, " ")}</TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="summary" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border border-[var(--border)]">
              <CardHeader><CardTitle className="text-base">Shipment Details</CardTitle></CardHeader>
              <CardContent className="space-y-3 text-sm">
                {[
                  { label: "Tracking Number", value: shipment.tracking },
                  { label: "Carrier", value: shipment.carrier },
                  { label: "Service", value: shipment.service },
                  { label: "Origin", value: shipment.origin },
                  { label: "Destination", value: shipment.destination },
                  { label: "Address", value: shipment.destinationAddress },
                  { label: "ETA", value: shipment.eta },
                  { label: "Created", value: shipment.created },
                ].map(f => (
                  <div key={f.label} className="flex justify-between gap-4">
                    <span className="text-[var(--muted-foreground)] shrink-0">{f.label}</span>
                    <span className="font-medium text-right">{f.value}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card className="border border-[var(--border)]">
              <CardHeader><CardTitle className="text-base">Package Details</CardTitle></CardHeader>
              <CardContent className="space-y-3 text-sm">
                {[
                  { label: "Weight", value: shipment.weight },
                  { label: "Dimensions", value: shipment.dimensions },
                  { label: "Declared Value", value: shipment.value },
                  { label: "Related PO", value: shipment.relatedPO },
                ].map(f => (
                  <div key={f.label} className="flex justify-between">
                    <span className="text-[var(--muted-foreground)]">{f.label}</span>
                    <span className="font-medium">{f.value}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="carrier" className="mt-4">
          <Card className="border border-[var(--border)] max-w-sm">
            <CardHeader><CardTitle className="text-base">Carrier Information</CardTitle></CardHeader>
            <CardContent className="space-y-3 text-sm">
              {[
                { label: "Carrier", value: "DHL Express" },
                { label: "Service", value: "Express Next Day" },
                { label: "Account #", value: "DHL-ACC-00847" },
                { label: "Contact", value: "0345 774 8877" },
                { label: "Website", value: "www.dhl.com/uk" },
              ].map(f => (
                <div key={f.label} className="flex justify-between">
                  <span className="text-[var(--muted-foreground)]">{f.label}</span>
                  <span className="font-medium">{f.value}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tracking-events" className="mt-4">
          <Card className="border border-[var(--border)]">
            <CardHeader><CardTitle className="text-base">Tracking Timeline</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-0">
                {trackingEvents.map((event, i) => (
                  <div key={i} className="flex gap-4 pb-4">
                    <div className="flex flex-col items-center">
                      <div className="h-8 w-8 rounded-full bg-[var(--muted)]/50 flex items-center justify-center">
                        {statusIcon[event.status]}
                      </div>
                      {i < trackingEvents.length - 1 && <div className="flex-1 w-0.5 bg-[var(--border)] mt-1" />}
                    </div>
                    <div className="pb-4 pt-1">
                      <p className="font-medium text-sm text-[var(--foreground)]">{event.event}</p>
                      <p className="text-xs text-[var(--muted-foreground)] mt-0.5">{event.location}</p>
                      <p className="text-xs text-[var(--muted-foreground)]">{event.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="delivery-proof" className="mt-4">
          <Card className="border border-[var(--border)]">
            <CardHeader><CardTitle className="text-base">Delivery Proof</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-[var(--border)] rounded-xl p-12 text-center">
                <Camera className="h-10 w-10 mx-auto text-[var(--muted-foreground)] mb-3 opacity-50" />
                <p className="font-medium text-[var(--muted-foreground)]">No delivery proof yet</p>
                <p className="text-sm text-[var(--muted-foreground)] mt-1">Photo and signature will appear here upon delivery</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="related-order" className="mt-4">
          <Card className="border border-[var(--border)] max-w-md">
            <CardHeader><CardTitle className="text-base">Related Order</CardTitle></CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-[var(--muted-foreground)]">Purchase Order</span>
                <Link href="/app/operations/purchase-orders/1" className="font-mono text-[var(--primary)] hover:underline font-medium">
                  {shipment.relatedPO}
                </Link>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--muted-foreground)]">Supplier</span>
                <span className="font-medium">Fastener World Ltd</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--muted-foreground)]">Order Value</span>
                <span className="font-medium">£12,450.00</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {["returns","audit"].map(t => (
          <TabsContent key={t} value={t} className="mt-4">
            <Card className="border border-[var(--border)]">
              <CardContent className="py-12 text-center text-[var(--muted-foreground)]">
                <Ship className="h-10 w-10 mx-auto mb-3 opacity-30" />
                <p className="font-medium capitalize">No {t} recorded</p>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
