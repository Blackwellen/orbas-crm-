"use client";

import { useParams } from "next/navigation";
import { ChartWidget } from "@/components/charts";
import { SummaryFacts } from "@/components/detail";
import { formatCurrency } from "@/lib/utils";
import { getSupplier } from "../_data";

export default function SupplierPerformance() {
  const { id } = useParams<{ id: string }>();
  const s = getSupplier(id);

  const otdTrend = s.spendTrend.map((d, i) => ({ month: d.month, otd: 88 + ((i * 7) % 10) }));

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <div className="rounded-xl border p-4" style={{ borderColor: "var(--border)", background: "var(--card)" }}>
        <h3 className="mb-3 text-sm font-semibold" style={{ color: "var(--foreground)" }}>On-time delivery trend</h3>
        <ChartWidget type="line" data={otdTrend} xKey="month" series={[{ key: "otd", label: "OTD %", color: "#16a34a" }]} height={220} />
      </div>
      <div className="rounded-xl border p-4" style={{ borderColor: "var(--border)", background: "var(--card)" }}>
        <h3 className="mb-3 text-sm font-semibold" style={{ color: "var(--foreground)" }}>Quality metrics</h3>
        <SummaryFacts
          rows={[
            { label: "Quality score", value: `${s.qualityScore} / 5.0` },
            { label: "Defect rate", value: `${s.defectRate}%` },
            { label: "Return rate", value: `${s.returnRate}%` },
            { label: "Avg response time", value: s.responseTime },
            { label: "Total orders YTD", value: s.ordersYtd },
            { label: "Total spend YTD", value: formatCurrency(s.spendYtd) },
          ]}
        />
      </div>
    </div>
  );
}
