"use client";

/**
 * MapView — lightweight map surface (no geo lib). Places pins and routes on a styled
 * canvas using normalized 0..1 coordinates, with a faint graticule background.
 * Use `projectLatLng` to convert real coordinates, or pass x/y directly.
 *
 * Variants are thin wrappers (DispatchMap, ShipmentTrackingMap, TerritoryMap) that just
 * preset styling — all share this base. Good enough for demo geography; swap for
 * react-leaflet/maplibre behind the same props for production tile maps.
 */
import { cn } from "@/lib/utils";

export type MapPin = {
  id: string;
  x: number; // 0..1
  y: number; // 0..1
  label?: string;
  color?: string;
  /** pulse for "live"/active pins. */
  live?: boolean;
};

export type MapRoute = { id: string; points: { x: number; y: number }[]; color?: string; dashed?: boolean };

/** Equirectangular projection for the UK-ish bounding box; clamps to 0..1. */
export function projectLatLng(
  lat: number,
  lng: number,
  bounds = { north: 59, south: 49.5, west: -8, east: 2 },
) {
  const x = (lng - bounds.west) / (bounds.east - bounds.west);
  const y = (bounds.north - lat) / (bounds.north - bounds.south);
  return { x: Math.max(0, Math.min(1, x)), y: Math.max(0, Math.min(1, y)) };
}

export function MapView({
  pins = [],
  routes = [],
  height = 320,
  onPinClick,
  className,
}: {
  pins?: MapPin[];
  routes?: MapRoute[];
  height?: number;
  onPinClick?: (id: string) => void;
  className?: string;
}) {
  return (
    <div
      className={cn("relative overflow-hidden rounded-xl border", className)}
      style={{
        height,
        borderColor: "var(--border)",
        background:
          "radial-gradient(circle at 30% 20%, color-mix(in srgb, var(--primary) 10%, transparent), transparent 60%), var(--secondary)",
      }}
    >
      {/* graticule */}
      <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100">
        {Array.from({ length: 9 }).map((_, i) => (
          <line key={`v${i}`} x1={(i + 1) * 10} y1={0} x2={(i + 1) * 10} y2={100} stroke="var(--border)" strokeWidth={0.2} />
        ))}
        {Array.from({ length: 9 }).map((_, i) => (
          <line key={`h${i}`} x1={0} y1={(i + 1) * 10} x2={100} y2={(i + 1) * 10} stroke="var(--border)" strokeWidth={0.2} />
        ))}
        {routes.map((r) => (
          <polyline
            key={r.id}
            points={r.points.map((p) => `${p.x * 100},${p.y * 100}`).join(" ")}
            fill="none"
            stroke={r.color ?? "var(--primary)"}
            strokeWidth={0.6}
            strokeDasharray={r.dashed ? "1.5 1.5" : undefined}
            strokeLinecap="round"
          />
        ))}
      </svg>

      {/* pins */}
      {pins.map((p) => (
        <button
          key={p.id}
          type="button"
          onClick={() => onPinClick?.(p.id)}
          className="group absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${p.x * 100}%`, top: `${p.y * 100}%` }}
          title={p.label}
        >
          {p.live && (
            <span
              className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full"
              style={{ background: p.color ?? "var(--accent)", opacity: 0.5 }}
            />
          )}
          <span
            className="relative block h-3 w-3 rounded-full border-2 shadow"
            style={{ background: p.color ?? "var(--primary)", borderColor: "#fff" }}
          />
          {p.label && (
            <span
              className="pointer-events-none absolute left-1/2 top-4 hidden -translate-x-1/2 whitespace-nowrap rounded px-1.5 py-0.5 text-[10px] font-medium shadow group-hover:block"
              style={{ background: "var(--card)", color: "var(--foreground)", border: "1px solid var(--border)" }}
            >
              {p.label}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}

export function DispatchMap(props: React.ComponentProps<typeof MapView>) {
  return <MapView {...props} />;
}
export function ShipmentTrackingMap(props: React.ComponentProps<typeof MapView>) {
  return <MapView {...props} />;
}
export function TerritoryMap(props: React.ComponentProps<typeof MapView>) {
  return <MapView {...props} />;
}
