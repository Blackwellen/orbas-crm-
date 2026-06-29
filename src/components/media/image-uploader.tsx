"use client";

/**
 * ImageUploader / AvatarUploader — drag-drop image picker with instant local preview.
 * Emits the selected File + an object-URL preview; persistence is the caller's concern.
 */
import { useRef, useState } from "react";
import { ImagePlus, X } from "lucide-react";
import { cn, getInitials } from "@/lib/utils";

export function ImageUploader({
  value,
  onSelect,
  label = "Upload image",
  aspect = "16/9",
  className,
}: {
  value?: string;
  onSelect?: (file: File, previewUrl: string) => void;
  label?: string;
  aspect?: string;
  className?: string;
}) {
  const [preview, setPreview] = useState<string | undefined>(value);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file?: File) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
    onSelect?.(file, url);
  };

  return (
    <div className={className}>
      <div
        role="button"
        tabIndex={0}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => { e.preventDefault(); handleFile(e.dataTransfer.files?.[0]); }}
        className="relative flex cursor-pointer items-center justify-center overflow-hidden rounded-xl border-2 border-dashed transition-colors"
        style={{ aspectRatio: aspect, borderColor: "var(--border)", background: "var(--secondary)" }}
      >
        {preview ? (
          <img src={preview} alt="preview" className="h-full w-full object-cover" />
        ) : (
          <div className="flex flex-col items-center gap-2 text-sm" style={{ color: "var(--muted-foreground)" }}>
            <ImagePlus className="h-6 w-6" />
            {label}
            <span className="text-xs">Drag & drop or click</span>
          </div>
        )}
        {preview && (
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setPreview(undefined); }}
            className="absolute right-2 top-2 rounded-full bg-black/60 p-1 text-white"
            aria-label="Remove"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
    </div>
  );
}

/** Round avatar variant. */
export function AvatarUploader({
  name,
  value,
  onSelect,
  size = 96,
}: {
  name: string;
  value?: string;
  onSelect?: (file: File, previewUrl: string) => void;
  size?: number;
}) {
  const [preview, setPreview] = useState<string | undefined>(value);
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div className="inline-flex flex-col items-center gap-2">
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="relative overflow-hidden rounded-full border-2"
        style={{ width: size, height: size, borderColor: "var(--border)", background: "var(--secondary)" }}
      >
        {preview ? (
          <img src={preview} alt={name} className="h-full w-full object-cover" />
        ) : (
          <span className="flex h-full w-full items-center justify-center text-xl font-semibold" style={{ color: "var(--muted-foreground)" }}>
            {getInitials(name)}
          </span>
        )}
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (!f) return;
          const url = URL.createObjectURL(f);
          setPreview(url);
          onSelect?.(f, url);
        }}
      />
    </div>
  );
}
