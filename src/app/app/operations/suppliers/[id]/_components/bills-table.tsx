"use client";

import { formatCurrency } from "@/lib/utils";
import { statusColor, type SupplierBill } from "../_data";

export function BillsTable({ rows }: { rows: SupplierBill[] }) {
  return (
    <div className="overflow-hidden rounded-xl border" style={{ borderColor: "var(--border)", background: "var(--card)" }}>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b" style={{ borderColor: "var(--border)", background: "var(--secondary)" }}>
            {["Bill #", "Date", "Amount", "Due Date", "Status"].map((h) => (
              <th key={h} className="px-4 py-3 text-left font-medium" style={{ color: "var(--muted-foreground)" }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((b) => {
            const c = statusColor(b.status);
            return (
              <tr key={b.bill} className="border-b last:border-0" style={{ borderColor: "var(--border)" }}>
                <td className="px-4 py-3 font-mono text-xs" style={{ color: "var(--primary)" }}>{b.bill}</td>
                <td className="px-4 py-3" style={{ color: "var(--muted-foreground)" }}>{b.date}</td>
                <td className="px-4 py-3 font-semibold" style={{ color: "var(--foreground)" }}>{formatCurrency(b.amount)}</td>
                <td className="px-4 py-3" style={{ color: "var(--muted-foreground)" }}>{b.due}</td>
                <td className="px-4 py-3">
                  <span className="rounded-full px-2 py-0.5 text-xs font-medium" style={{ background: c.bg, color: c.color }}>
                    {b.status}
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
