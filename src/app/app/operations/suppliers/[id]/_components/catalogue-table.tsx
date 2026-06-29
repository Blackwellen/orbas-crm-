"use client";

import { formatCurrency } from "@/lib/utils";
import type { CatalogueItem } from "../_data";

export function CatalogueTable({ items }: { items: CatalogueItem[] }) {
  return (
    <div className="overflow-hidden rounded-xl border" style={{ borderColor: "var(--border)", background: "var(--card)" }}>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b" style={{ borderColor: "var(--border)", background: "var(--secondary)" }}>
            {["SKU", "Description", "Unit Cost", "MOQ", "Lead Time"].map((h) => (
              <th key={h} className="px-4 py-3 text-left font-medium" style={{ color: "var(--muted-foreground)" }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.sku} className="border-b last:border-0" style={{ borderColor: "var(--border)" }}>
              <td className="px-4 py-3 font-mono text-xs" style={{ color: "var(--primary)" }}>{item.sku}</td>
              <td className="px-4 py-3" style={{ color: "var(--foreground)" }}>{item.description}</td>
              <td className="px-4 py-3 font-semibold" style={{ color: "var(--foreground)" }}>{formatCurrency(item.unitCost)}</td>
              <td className="px-4 py-3" style={{ color: "var(--muted-foreground)" }}>{item.moq}</td>
              <td className="px-4 py-3" style={{ color: "var(--muted-foreground)" }}>{item.leadTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
