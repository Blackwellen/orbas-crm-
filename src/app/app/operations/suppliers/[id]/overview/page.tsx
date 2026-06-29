"use client";

import { useParams } from "next/navigation";
import { ChartWidget, ScoreGauge } from "@/components/charts";
import { MapView } from "@/components/map";
import { getSupplier, supplierPin } from "../_data";

export default function SupplierOverview() {
  const { id } = useParams<{ id: string }>();
  const s = getSupplier(id);
  const pin = supplierPin(s);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          { label: "On-time delivery", value: s.onTimeDelivery },
          { label: "Perfect order rate", value: s.perfectOrderRate },
          { label: "Fill rate", value: s.fillRate },
        ].map((g) => (
          <div key={g.label} className="flex items-center justify-center rounded-xl border py-4" style={{ borderColor: "var(--border)", background: "var(--card)" }}>
            <ScoreGauge value={g.value} label={g.label} size={120} />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-xl border p-4" style={{ borderColor: "var(--border)", background: "var(--card)" }}>
          <h3 className="mb-3 text-sm font-semibold" style={{ color: "var(--foreground)" }}>Spend (last 6 months)</h3>
          <ChartWidget type="area" data={s.spendTrend} xKey="month" series={[{ key: "spend", label: "Spend", color: "var(--primary)" }]} height={220} />
        </div>
        <div className="rounded-xl border p-4" style={{ borderColor: "var(--border)", background: "var(--card)" }}>
          <h3 className="mb-3 text-sm font-semibold" style={{ color: "var(--foreground)" }}>Location</h3>
          <MapView height={220} pins={[{ id: s.id, x: pin.x, y: pin.y, label: `${s.name} — ${s.city}`, live: true }]} />
          <p className="mt-2 text-xs" style={{ color: "var(--muted-foreground)" }}>{s.address}</p>
        </div>
      </div>
    </div>
  );
}
