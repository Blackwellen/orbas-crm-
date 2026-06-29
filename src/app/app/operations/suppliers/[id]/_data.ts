import { companyLogoUrl, avatarUrl } from "@/lib/seed-image";
import { projectLatLng } from "@/components/map/map-view";

/**
 * Supplier detail mock data. Keyed by id with a sensible default so any id resolves.
 * Replace with Supabase fetch when wiring real data — keep this shape.
 */

export type SupplierContact = { name: string; role: string; email: string; phone: string; primary?: boolean };
export type CatalogueItem = { sku: string; description: string; unitCost: number; moq: number; leadTime: string };
export type SupplierPO = { po: string; date: string; lines: number; total: number; status: string };
export type SupplierBill = { bill: string; date: string; amount: number; due: string; status: string };

export type Supplier = {
  id: string;
  name: string;
  category: string;
  accountRef: string;
  country: string;
  city: string;
  lat: number;
  lng: number;
  address: string;
  paymentTerms: string;
  currency: string;
  status: string;
  taxRef: string;
  website: string;
  domain: string;
  onTimeDelivery: number;
  perfectOrderRate: number;
  fillRate: number;
  qualityScore: number; // 0..5
  defectRate: number;
  returnRate: number;
  responseTime: string;
  ordersYtd: number;
  spendYtd: number;
  openPos: number;
  spendTrend: { month: string; spend: number }[];
  contacts: SupplierContact[];
  catalogue: CatalogueItem[];
  purchaseOrders: SupplierPO[];
  bills: SupplierBill[];
};

const DEFAULT: Supplier = {
  id: "1",
  name: "Fastener World Ltd",
  category: "Fasteners",
  accountRef: "FW-001",
  country: "United Kingdom",
  city: "Birmingham",
  lat: 52.4862,
  lng: -1.8904,
  address: "Unit 12, Meridian Park, Birmingham, B11 2QJ",
  paymentTerms: "30 days net",
  currency: "GBP",
  status: "Active",
  taxRef: "GB-847123456",
  website: "www.fastenerworld.co.uk",
  domain: "fastenerworld.co.uk",
  onTimeDelivery: 94,
  perfectOrderRate: 89,
  fillRate: 97,
  qualityScore: 4.6,
  defectRate: 0.3,
  returnRate: 1.2,
  responseTime: "< 4h",
  ordersYtd: 24,
  spendYtd: 48200,
  openPos: 1,
  spendTrend: [
    { month: "Jan", spend: 6200 },
    { month: "Feb", spend: 5400 },
    { month: "Mar", spend: 7100 },
    { month: "Apr", spend: 8920 },
    { month: "May", spend: 9000 },
    { month: "Jun", spend: 12450 },
  ],
  contacts: [
    { name: "Tom Bradley", role: "Account Manager", email: "tbradley@fastenerworld.co.uk", phone: "+44 1234 567890", primary: true },
    { name: "Janet Williams", role: "Finance Contact", email: "jwilliams@fastenerworld.co.uk", phone: "+44 1234 567891" },
    { name: "Mark Thompson", role: "Logistics", email: "mthompson@fastenerworld.co.uk", phone: "+44 1234 567892" },
  ],
  catalogue: [
    { sku: "FW-TI-M8-30", description: "Titanium Bolts M8 x 30mm", unitCost: 0.85, moq: 100, leadTime: "14 days" },
    { sku: "FW-TI-M10-40", description: "Titanium Bolts M10 x 40mm", unitCost: 1.2, moq: 100, leadTime: "14 days" },
    { sku: "FW-SS-W-M6", description: "Stainless Washers M6 pk/100", unitCost: 12.5, moq: 10, leadTime: "7 days" },
    { sku: "FW-SS-W-M8", description: "Stainless Washers M8 pk/100", unitCost: 14.0, moq: 10, leadTime: "7 days" },
    { sku: "FW-HN-M8", description: "Hex Nuts M8 SS pk/200", unitCost: 18.5, moq: 10, leadTime: "7 days" },
  ],
  purchaseOrders: [
    { po: "PO-2025-0847", date: "2025-06-08", lines: 8, total: 12450, status: "Sent" },
    { po: "PO-2025-0839", date: "2025-05-22", lines: 6, total: 5240, status: "Received" },
    { po: "PO-2025-0821", date: "2025-05-15", lines: 4, total: 3760, status: "Received" },
    { po: "PO-2025-0798", date: "2025-04-28", lines: 9, total: 8920, status: "Received" },
  ],
  bills: [
    { bill: "BILL-2025-0312", date: "2025-05-25", amount: 5240, due: "2025-06-24", status: "Open" },
    { bill: "BILL-2025-0289", date: "2025-05-18", amount: 3760, due: "2025-06-17", status: "Paid" },
  ],
};

export function getSupplier(id: string): Supplier {
  // Single seed record; echo the requested id so deep links resolve.
  return { ...DEFAULT, id };
}

export function supplierLogo(s: Supplier) {
  return companyLogoUrl(s.domain);
}

export function contactAvatar(name: string) {
  return avatarUrl(name);
}

/** Project the supplier's lat/lng onto the MapView's 0..1 space. */
export function supplierPin(s: Supplier) {
  return projectLatLng(s.lat, s.lng);
}

export function statusColor(status: string): { color: string; bg: string } {
  const map: Record<string, { color: string; bg: string }> = {
    Active: { color: "#16a34a", bg: "#dcfce7" },
    Sent: { color: "#2563eb", bg: "#dbeafe" },
    Received: { color: "#16a34a", bg: "#dcfce7" },
    Open: { color: "#d97706", bg: "#fef3c7" },
    Paid: { color: "#16a34a", bg: "#dcfce7" },
  };
  return map[status] ?? { color: "#475569", bg: "#f1f5f9" };
}
