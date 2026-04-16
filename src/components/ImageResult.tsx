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
        <div className="relative rounded-2xl overflow-hidden bg-gray-200 dark:bg-gray-800 animate-pulse">
          <div
            className="w-full flex items-center justify-center"
            style={{ aspectRatio: `${size.width} / ${size.height}` }}
          >
            <div className="text-center space-y-4">
              <div className="relative mx-auto w-16 h-16">
                <div className="absolute inset-0 rounded-full border-4 border-purple-200 dark:border-purple-700" />
                <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-purple-500 animate-spin" />
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400 font-medium">AI가 이미지를 생성하고 있어요</p>
                <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">잠시만 기다려주세요...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!image) {
    return (
      <div className="w-full rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/30">
        <div
          className="w-full flex flex-col items-center justify-center text-center px-8"
          style={{ aspectRatio: `${size.width} / ${size.height}` }}
        >
          <div className="text-6xl mb-4">🎨</div>
          <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">
            프롬프트를 입력하고 이미지를 생성해보세요
          </p>
          <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">
            AI가 당신의 상상을 이미지로 만들어 드립니다
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full animate-[fadeIn_0.5s_ease-out]">
      <div className="relative group rounded-2xl overflow-hidden shadow-2xl bg-gray-900">
        <img
          src={image.url}
          alt={image.prompt}
          className="w-full h-auto"
          loading="eager"
        />
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {/* Download button overlay */}
        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="text-white text-sm">
            <p className="font-medium line-clamp-1">{image.prompt}</p>
            <p className="text-white/70 text-xs mt-0.5">{image.style} · {image.size}</p>
          </div>
          <button
            onClick={() => onDownload(image)}
            className="flex items-center gap-2 px-4 py-2 bg-white/90 dark:bg-gray-900/90 text-gray-900 dark:text-white rounded-xl font-medium text-sm hover:bg-white transition-colors backdrop-blur-sm shadow-lg"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            다운로드
          </button>
        </div>
      </div>
    </div>
  );
}
