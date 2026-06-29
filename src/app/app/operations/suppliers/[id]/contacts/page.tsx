"use client";

import { useParams } from "next/navigation";
import { Mail, Phone } from "lucide-react";
import { EntityAvatar } from "@/components/media/entity-avatar";
import { getSupplier, contactAvatar } from "../_data";

export default function SupplierContacts() {
  const { id } = useParams<{ id: string }>();
  const s = getSupplier(id);
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {s.contacts.map((c) => (
        <div key={c.email} className="rounded-xl border p-4" style={{ borderColor: "var(--border)", background: "var(--card)" }}>
          <div className="mb-3 flex items-center gap-3">
            <EntityAvatar name={c.name} src={contactAvatar(c.name)} size="md" />
            <div className="min-w-0">
              <p className="truncate text-sm font-medium" style={{ color: "var(--foreground)" }}>{c.name}</p>
              <p className="truncate text-xs" style={{ color: "var(--muted-foreground)" }}>{c.role}</p>
            </div>
            {c.primary && (
              <span className="ml-auto rounded-full px-1.5 py-0.5 text-[10px] font-medium" style={{ background: "var(--secondary)", color: "var(--primary)" }}>
                Primary
              </span>
            )}
          </div>
          <div className="space-y-1.5 text-xs" style={{ color: "var(--muted-foreground)" }}>
            <p className="flex items-center gap-1.5"><Mail className="h-3.5 w-3.5" /> {c.email}</p>
            <p className="flex items-center gap-1.5"><Phone className="h-3.5 w-3.5" /> {c.phone}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
