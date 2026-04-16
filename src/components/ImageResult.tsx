"use client";

import { GeneratedImage } from "@/lib/types";
import { SIZE_OPTIONS } from "@/lib/constants";

interface ImageResultProps {
  image: GeneratedImage | null;
  isGenerating: boolean;
  onDownload: (image: GeneratedImage) => void;
}

export default function ImageResult({ image, isGenerating, onDownload }: ImageResultProps) {
  const size = SIZE_OPTIONS.find((s) => s.id === image?.size) || SIZE_OPTIONS[0];

  if (isGenerating) {
    return (
      <div className="w-full">
        <div
          className="relative rounded-lg overflow-hidden animate-pulse"
          style={{ background: "var(--surface-secondary)" }}
        >
          <div
            className="w-full flex items-center justify-center"
            style={{ aspectRatio: `${size.width} / ${size.height}` }}
          >
            <div className="text-center space-y-3">
              <div className="relative mx-auto w-12 h-12">
                <div
                  className="absolute inset-0 rounded-full"
                  style={{ border: "3px solid var(--border)" }}
                />
                <div
                  className="absolute inset-0 rounded-full border-transparent animate-spin"
                  style={{
                    borderTopColor: "var(--accent)",
                    borderWidth: "3px",
                  }}
                />
              </div>
              <div>
                <p className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
                  이미지를 생성하고 있어요
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!image) {
    return (
      <div
        className="w-full rounded-lg"
        style={{
          border: "1px dashed var(--border)",
          background: "var(--surface)",
        }}
      >
        <div
          className="w-full flex flex-col items-center justify-center text-center px-8"
          style={{ aspectRatio: `${size.width} / ${size.height}` }}
        >
          <p className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
            프롬프트를 입력하고 이미지를 생성해보세요
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full animate-fade-in">
      <div className="relative group rounded-lg overflow-hidden" style={{ background: "var(--surface-secondary)" }}>
        <img
          src={image.url}
          alt={image.prompt}
          className="w-full h-auto"
          loading="eager"
        />
        {/* Overlay on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.5), transparent)" }}
        />
        {/* Download button overlay */}
        <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="text-white text-sm">
            <p className="font-medium line-clamp-1">{image.prompt}</p>
            <p className="text-white/70 text-xs mt-0.5">{image.style} · {image.size}</p>
          </div>
          <button
            onClick={() => onDownload(image)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white text-gray-900 rounded-lg font-medium text-sm hover:bg-gray-100 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            다운로드
          </button>
        </div>
      </div>
    </div>
  );
}
