"use client";

import { useParams } from "next/navigation";
import { MediaDocumentsTab } from "@/components/detail";
import { getSupplier } from "../_data";

export default function SupplierDocuments() {
  const { id } = useParams<{ id: string }>();
  const s = getSupplier(id);
  const files = [
    { id: "f1", name: `${s.accountRef} Supply Agreement.pdf`, kind: "pdf", meta: "Signed · 12 May 2025" },
    { id: "f2", name: "ISO 9001 Certificate.pdf", kind: "pdf", meta: "Valid to 2026" },
    { id: "f3", name: "Price List 2025.xlsx", kind: "xlsx", meta: "Updated Jun 2025" },
    { id: "f4", name: "Insurance Certificate.pdf", kind: "pdf", meta: "Valid to Dec 2025" },
  ];
  return <MediaDocumentsTab files={files} showUploader />;
}
