"use client";

import { GeneratedImage } from "@/lib/types";

interface GalleryProps {
  images: GeneratedImage[];
  onDelete: (id: string) => void;
  onClearAll: () => void;
  onDownload: (image: GeneratedImage) => void;
  onSelect: (image: GeneratedImage) => void;
}

export default function Gallery({ images, onDelete, onClearAll, onDownload, onSelect }: GalleryProps) {
  if (images.length === 0) return null;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="flex items-center gap-2">
          <span
            className="text-xs font-medium uppercase tracking-wider"
            style={{ color: "var(--text-secondary)" }}
          >
            생성 기록
          </span>
          <span
            className="text-xs font-medium px-1.5 py-0.5 rounded"
            style={{
              color: "var(--text-secondary)",
              background: "var(--surface-secondary)",
            }}
          >
            {images.length}
          </span>
        </h2>
        <button
          onClick={onClearAll}
          className="text-xs transition-colors duration-150 px-2.5 py-1 rounded-md"
          style={{ color: "var(--text-secondary)" }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "#ef4444";
            e.currentTarget.style.background = "var(--surface-secondary)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "var(--text-secondary)";
            e.currentTarget.style.background = "transparent";
          }}
        >
          전체 삭제
        </button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
        {images.map((image) => (
          <div
            key={image.id}
            className="group relative aspect-square rounded-lg overflow-hidden cursor-pointer"
            style={{ background: "var(--surface-secondary)" }}
            onClick={() => onSelect(image)}
          >
            <img
              src={image.url}
              alt={image.prompt}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            {/* Hover overlay */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-150"
              style={{ background: "rgba(0, 0, 0, 0.4)" }}
            />
            {/* Info overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
              <p className="text-white text-xs font-medium line-clamp-2">{image.prompt}</p>
              <div className="flex items-center justify-between mt-1">
                <span className="text-white/70 text-[10px]">{image.style} · {image.size}</span>
                <div className="flex gap-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDownload(image);
                    }}
                    className="p-1 bg-white/20 hover:bg-white/30 rounded transition-colors"
                    title="다운로드"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(image.id);
                    }}
                    className="p-1 bg-white/20 hover:bg-red-500/50 rounded transition-colors"
                    title="삭제"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
