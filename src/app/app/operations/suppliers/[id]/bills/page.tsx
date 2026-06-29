"use client";

import { useParams } from "next/navigation";
import { BillsTable } from "../_components/bills-table";
import { getSupplier } from "../_data";

export default function SupplierBills() {
  const { id } = useParams<{ id: string }>();
  const s = getSupplier(id);
  return <BillsTable rows={s.bills} />;
}
