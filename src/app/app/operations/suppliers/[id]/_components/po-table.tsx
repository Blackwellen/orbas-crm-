"use client";

import { formatCurrency } from "@/lib/utils";
import { statusColor, type SupplierPO } from "../_data";

export function PoTable({ rows }: { rows: SupplierPO[] }) {
  return (
    <div className="overflow-hidden rounded-xl border" style={{ borderColor: "var(--border)", background: "var(--card)" }}>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b" style={{ borderColor: "var(--border)", background: "var(--secondary)" }}>
            {["PO #", "Date", "Lines", "Total", "Status"].map((h) => (
              <th key={h} className="px-4 py-3 text-left font-medium" style={{ color: "var(--muted-foreground)" }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((po) => {
            const c = statusColor(po.status);
            return (
              <tr key={po.po} className="border-b last:border-0" style={{ borderColor: "var(--border)" }}>
                <td className="px-4 py-3 font-mono text-xs" style={{ color: "var(--primary)" }}>{po.po}</td>
                <td className="px-4 py-3" style={{ color: "var(--muted-foreground)" }}>{po.date}</td>
                <td className="px-4 py-3" style={{ color: "var(--foreground)" }}>{po.lines}</td>
                <td className="px-4 py-3 font-semibold" style={{ color: "var(--foreground)" }}>{formatCurrency(po.total)}</td>
                <td className="px-4 py-3">
                  <span className="rounded-full px-2 py-0.5 text-xs font-medium" style={{ background: c.bg, color: c.color }}>
                    {po.status}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
