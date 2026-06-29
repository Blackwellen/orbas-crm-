"use client";

/** MediaLightbox — fullscreen image viewer with prev/next + counter. Self-contained modal. */
import { useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export type LightboxImage = { src: string; alt?: string };

export function MediaLightbox({
  images,
  index,
  onIndexChange,
  onClose,
}: {
  images: LightboxImage[];
  index: number;
  onIndexChange: (i: number) => void;
  onClose: () => void;
}) {
  const prev = useCallback(() => onIndexChange((index - 1 + images.length) % images.length), [index, images.length, onIndexChange]);
  const next = useCallback(() => onIndexChange((index + 1) % images.length), [index, images.length, onIndexChange]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, prev, next]);

  const img = images[index];
  if (!img) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-6"
      style={{ background: "rgba(2,6,23,0.85)" }}
      onClick={onClose}
    >
      <button className="absolute right-4 top-4 text-white/80 hover:text-white" onClick={onClose} aria-label="Close">
        <X className="h-6 w-6" />
      </button>
      {images.length > 1 && (
        <button
          className="absolute left-4 text-white/80 hover:text-white"
          onClick={(e) => { e.stopPropagation(); prev(); }}
          aria-label="Previous"
        >
          <ChevronLeft className="h-8 w-8" />
        </button>
      )}
      <img
        src={img.src}
        alt={img.alt ?? ""}
        className="max-h-[85vh] max-w-[90vw] rounded-lg object-contain shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />
      {images.length > 1 && (
        <button
          className="absolute right-4 text-white/80 hover:text-white"
          onClick={(e) => { e.stopPropagation(); next(); }}
          aria-label="Next"
        >
          <ChevronRight className="h-8 w-8" />
        </button>
      )}
      <div className="absolute bottom-4 text-sm text-white/70">
        {index + 1} / {images.length}
      </div>
    </div>
  );
}
