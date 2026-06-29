"use client";

/**
 * MediaDocumentsTab — reusable detail-page tab combining an image gallery, a file/document
 * grid, and an upload dropzone. Drop into any [id] page's "Documents" / "Media" tab.
 */
import { ImageGallery } from "@/components/media/image-gallery";
import { FileThumbnailGrid, type FileItem } from "@/components/media/file-thumbnail-grid";
import { ImageUploader } from "@/components/media/image-uploader";
import type { LightboxImage } from "@/components/media/media-lightbox";

export function MediaDocumentsTab({
  images = [],
  files = [],
  onOpenFile,
  showUploader = true,
}: {
  images?: LightboxImage[];
  files?: FileItem[];
  onOpenFile?: (id: string) => void;
  showUploader?: boolean;
}) {
  return (
    <div className="space-y-6">
      {(images.length > 0 || showUploader) && (
        <section>
          <h3 className="mb-3 text-sm font-semibold" style={{ color: "var(--foreground)" }}>
            Photos
          </h3>
          {images.length > 0 ? (
            <ImageGallery images={images} />
          ) : (
            showUploader && <ImageUploader label="Add a photo" />
          )}
        </section>
      )}

      <section>
        <h3 className="mb-3 text-sm font-semibold" style={{ color: "var(--foreground)" }}>
          Documents
        </h3>
        {files.length > 0 ? (
          <FileThumbnailGrid files={files} onOpen={onOpenFile} />
        ) : (
          <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
            No documents yet.
          </p>
        )}
      </section>
    </div>
  );
}
