"use client";

/**
 * ImageGallery — hero image + thumbnail strip, opens MediaLightbox on click.
 * Used for product, asset, field-service, defect, delivery-proof photos.
 */
import { useState } from "react";
import { ImageOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { MediaLightbox, type LightboxImage } from "./media-lightbox";

export function ImageGallery({
  images,
  aspect = "4/3",
  className,
}: {
  images: LightboxImage[];
  aspect?: string;
  className?: string;
}) {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);

  if (!images.length) {
    return (
      <div
        className={cn("flex items-center justify-center rounded-xl border", className)}
        style={{ aspectRatio: aspect, borderColor: "var(--border)", background: "var(--secondary)", color: "var(--muted-foreground)" }}
      >
        <div className="flex flex-col items-center gap-2 text-sm">
          <ImageOff className="h-6 w-6" />
          No images
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="block w-full overflow-hidden rounded-xl border"
        style={{ aspectRatio: aspect, borderColor: "var(--border)" }}
      >
        <img src={images[active].src} alt={images[active].alt ?? ""} className="h-full w-full object-cover" />
      </button>
      {images.length > 1 && (
        <div className="mt-2 flex gap-2 overflow-x-auto">
          {images.map((im, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              className="h-14 w-14 shrink-0 overflow-hidden rounded-md border-2"
              style={{ borderColor: i === active ? "var(--primary)" : "var(--border)" }}
            >
              <img src={im.src} alt={im.alt ?? ""} className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
      {open && (
        <MediaLightbox images={images} index={active} onIndexChange={setActive} onClose={() => setOpen(false)} />
      )}
    </div>
  );
}
