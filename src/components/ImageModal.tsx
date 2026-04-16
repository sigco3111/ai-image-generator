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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl w-full max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 p-2 text-white/80 hover:text-white transition-colors z-10"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Image */}
        <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gray-900 flex-shrink">
          <img
            src={image.url}
            alt={image.prompt}
            className="w-full h-auto max-h-[75vh] object-contain"
          />
        </div>

        {/* Info bar */}
        <div className="mt-4 flex items-center justify-between bg-white/10 backdrop-blur-md rounded-xl p-4">
          <div className="flex-1 min-w-0 mr-4">
            <p className="text-white font-medium truncate">{image.prompt}</p>
            <p className="text-white/60 text-sm mt-1">
              {image.style} · {image.size} · {new Date(image.timestamp).toLocaleDateString("ko-KR")}
            </p>
          </div>
          <button
            onClick={() => onDownload(image)}
            className="flex items-center gap-2 px-5 py-2.5 bg-white text-gray-900 rounded-xl font-medium text-sm hover:bg-gray-100 transition-colors shadow-lg flex-shrink-0"
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
