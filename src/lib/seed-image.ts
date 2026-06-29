/**
 * Deterministic demo-image helpers. Returns stable remote URLs keyed by a seed so mock
 * data renders realistic photos/avatars/logos without bundling assets. Swap for
 * /public/* or Supabase Storage URLs when real media exists.
 *
 * Note: consumed via plain <img> (not next/image), so no remote-domain config is needed.
 */

/** Stable avatar/face for a person, keyed by name or id. */
export function avatarUrl(seed: string | number, size = 160): string {
  return `https://i.pravatar.cc/${size}?u=${encodeURIComponent(String(seed))}`;
}

/** Stable photo (product, asset, cover, story) keyed by seed. */
export function photoUrl(seed: string | number, width = 640, height = 480): string {
  return `https://picsum.photos/seed/${encodeURIComponent(String(seed))}/${width}/${height}`;
}

/** Company/provider logo via Clearbit when a domain is known; otherwise undefined
 * (callers fall back to the ProviderLogo letter-tile). */
export function companyLogoUrl(domain?: string): string | undefined {
  if (!domain) return undefined;
  const clean = domain.replace(/^https?:\/\//, "").replace(/\/.*$/, "");
  return `https://logo.clearbit.com/${clean}`;
}

/** A small gallery of N stable photos for a seed (e.g. product image set). */
export function gallery(seed: string | number, count = 4, width = 640, height = 480) {
  return Array.from({ length: count }).map((_, i) => ({
    src: photoUrl(`${seed}-${i}`, width, height),
    alt: `${seed} ${i + 1}`,
  }));
}
