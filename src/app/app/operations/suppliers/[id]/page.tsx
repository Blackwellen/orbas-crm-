"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

/** Redirect the bare detail route to the default tab (modular sub-route pattern). */
export default function SupplierIndex() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  useEffect(() => {
    router.replace(`/app/operations/suppliers/${id}/overview`);
  }, [id, router]);
  return null;
}
