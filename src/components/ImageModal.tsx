"use client";

import { GeneratedImage } from "@/lib/types";

interface ImageModalProps {
  image: GeneratedImage | null;
  onClose: () => void;
  onDownload: (image: GeneratedImage) => void;
}

export default function ImageModal({ image, onClose, onDownload }: ImageModalProps) {
  if (!image) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in"
      style={{ background: "rgba(0, 0, 0, 0.9)" }}
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl w-full max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 p-2 text-white/60 hover:text-white transition-colors z-10"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Image */}
        <div className="relative rounded-lg overflow-hidden bg-zinc-900 flex-shrink">
          <img
            src={image.url}
            alt={image.prompt}
            className="w-full h-auto max-h-[75vh] object-contain"
          />
        </div>

        {/* Info bar */}
        <div
          className="mt-3 flex items-center justify-between rounded-lg p-4"
          style={{ background: "rgba(255, 255, 255, 0.08)" }}
        >
          <div className="flex-1 min-w-0 mr-4">
            <p className="text-white font-medium truncate">{image.prompt}</p>
            <p className="text-white/50 text-sm mt-1">
              {image.style} · {image.size} · {new Date(image.timestamp).toLocaleDateString("ko-KR")}
            </p>
          </div>
          <button
            onClick={() => onDownload(image)}
            className="flex items-center gap-2 px-4 py-2 bg-white text-gray-900 rounded-lg font-medium text-sm hover:bg-gray-100 transition-colors flex-shrink-0"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            다운로드
          </button>
        </div>
      </div>
    </div>
  );
}
