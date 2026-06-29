"use client";

import { useParams } from "next/navigation";
import { PoTable } from "../_components/po-table";
import { getSupplier } from "../_data";

export default function SupplierPurchaseOrders() {
  const { id } = useParams<{ id: string }>();
  const s = getSupplier(id);
  return <PoTable rows={s.purchaseOrders} />;
}
