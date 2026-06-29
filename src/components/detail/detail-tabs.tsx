"use client";

/**
 * DetailTabs — tab navigation for detail / profile pages.
 *
 * Two modes:
 *  • SUB-ROUTE mode (preferred for heavy detail pages): pass `basePath` and items with
 *    `href` segments. Renders Next <Link>s and highlights the active tab from usePathname.
 *    Each tab is then its own `page.tsx` under the [id] route — fully modular + deep-linkable.
 *  • IN-PAGE mode (lighter pages): pass `value` + `onValueChange`. Renders buttons that
 *    switch a controlled active tab; each panel still lives in its own file in `_tabs/`.
 */

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export type DetailTab = {
  key: string;
  label: string;
  /** Sub-route segment (sub-route mode), e.g. "overview". Appended to basePath. */
  href?: string;
  count?: number;
  disabled?: boolean;
};

type CommonProps = {
  items: DetailTab[];
  className?: string;
};

type SubRouteProps = CommonProps & {
  basePath: string;
  value?: never;
  onValueChange?: never;
};

type InPageProps = CommonProps & {
  basePath?: never;
  value: string;
  onValueChange: (key: string) => void;
};

export function DetailTabs(props: SubRouteProps | InPageProps) {
  const { items, className } = props;
  const pathname = usePathname();

  return (
    <div
      className={cn("flex items-center gap-1 overflow-x-auto border-b", className)}
      style={{ borderColor: "var(--border)" }}
      role="tablist"
    >
      {items.map((tab) => {
        const isSubRoute = "basePath" in props && props.basePath != null;
        const href = isSubRoute ? `${props.basePath}/${tab.href ?? tab.key}` : undefined;
        const active = isSubRoute
          ? pathname === href || pathname.startsWith(`${href}/`)
          : (props as InPageProps).value === tab.key;

        const inner = (
          <span className="inline-flex items-center gap-1.5">
            {tab.label}
            {typeof tab.count === "number" && (
              <span
                className="rounded-full px-1.5 py-0.5 text-[10px] font-semibold"
                style={{
                  background: active ? "var(--primary)" : "var(--secondary)",
                  color: active ? "#fff" : "var(--muted-foreground)",
                }}
              >
                {tab.count}
              </span>
            )}
          </span>
        );

        const baseCls = cn(
          "relative whitespace-nowrap px-3 py-2.5 text-sm font-medium transition-colors",
          tab.disabled && "pointer-events-none opacity-50",
        );
        const style: React.CSSProperties = {
          color: active ? "var(--primary)" : "var(--muted-foreground)",
          borderBottom: active ? "2px solid var(--primary)" : "2px solid transparent",
          marginBottom: -1,
        };

        if (isSubRoute && href) {
          return (
            <Link key={tab.key} href={href} role="tab" aria-selected={active} className={baseCls} style={style}>
              {inner}
            </Link>
          );
        }
        return (
          <button
            key={tab.key}
            type="button"
            role="tab"
            aria-selected={active}
            className={baseCls}
            style={style}
            onClick={() => !tab.disabled && (props as InPageProps).onValueChange(tab.key)}
          >
            {inner}
          </button>
        );
      })}
    </div>
  );
}
