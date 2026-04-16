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
        <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          🖼️ 생성 기록
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
            ({images.length}장)
          </span>
        </h2>
        <button
          onClick={onClearAll}
          className="text-sm text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors px-3 py-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
        >
          전체 삭제
        </button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {images.map((image) => (
          <div
            key={image.id}
            className="group relative aspect-square rounded-xl overflow-hidden bg-gray-200 dark:bg-gray-800 cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
            onClick={() => onSelect(image)}
          >
            <img
              src={image.url}
              alt={image.prompt}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            {/* Info overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <p className="text-white text-xs font-medium line-clamp-2">{image.prompt}</p>
              <div className="flex items-center justify-between mt-1">
                <span className="text-white/70 text-[10px]">{image.style} · {image.size}</span>
                <div className="flex gap-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDownload(image);
                    }}
                    className="p-1 bg-white/20 hover:bg-white/30 rounded-md transition-colors"
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
                    className="p-1 bg-white/20 hover:bg-red-500/50 rounded-md transition-colors"
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
