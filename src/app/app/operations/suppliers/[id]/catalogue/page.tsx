"use client";

import { useParams } from "next/navigation";
import { CatalogueTable } from "../_components/catalogue-table";
import { getSupplier } from "../_data";

export default function SupplierCatalogue() {
  const { id } = useParams<{ id: string }>();
  const s = getSupplier(id);
  return <CatalogueTable items={s.catalogue} />;
}
