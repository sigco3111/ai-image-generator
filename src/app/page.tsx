"use client";

import { useEffect, useState } from "react";
import { useImageGenerator } from "@/hooks/useImageGenerator";
import { GeneratedImage } from "@/lib/types";
import ThemeToggle from "@/components/ThemeToggle";
import PromptInput from "@/components/PromptInput";
import StyleSelector from "@/components/StyleSelector";
import SizeSelector from "@/components/SizeSelector";
import GenerateButton from "@/components/GenerateButton";
import ImageResult from "@/components/ImageResult";
import Gallery from "@/components/Gallery";
import ImageModal from "@/components/ImageModal";

export default function Home() {
  const {
    prompt,
    setPrompt,
    selectedStyle,
    setSelectedStyle,
    selectedSize,
    setSelectedSize,
    isGenerating,
    currentImage,
    gallery,
    error,
    setError,
    loadGallery,
    generateImage,
    deleteFromGallery,
    clearAllGallery,
    downloadImage,
  } = useImageGenerator();

  const [modalImage, setModalImage] = useState<GeneratedImage | null>(null);

  useEffect(() => {
    loadGallery();
  }, [loadGallery]);

  return (
    <div className="min-h-screen bg-mesh transition-colors duration-300">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full glass border-b border-gray-200/50 dark:border-gray-700/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">✨</span>
            <h1 className="text-lg font-bold text-gray-900 dark:text-white">
              AI 이미지 생성기
            </h1>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Hero Section */}
        <section className="text-center space-y-4 py-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500" />
            </span>
            무료 AI 이미지 생성
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            <span className="gradient-text">상상을 이미지로</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-lg mx-auto">
            프롬프트를 입력하면 AI가 당신의 상상을 실제 이미지로 만들어 드립니다.
            <br className="hidden sm:block" />
            스타일과 크기를 선택하고 생성 버튼을 눌러보세요!
          </p>
        </section>

        {/* Generator Card */}
        <section className="glass rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-200/50 dark:border-gray-700/30 space-y-6">
          {/* Prompt Input */}
          <PromptInput
            value={prompt}
            onChange={setPrompt}
            onGenerate={generateImage}
            isGenerating={isGenerating}
          />

          {/* Style Selector */}
          <StyleSelector selected={selectedStyle} onSelect={setSelectedStyle} />

          {/* Size Selector */}
          <SizeSelector selected={selectedSize} onSelect={setSelectedSize} />

          {/* Error Message */}
          {error && (
            <div className="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 rounded-xl text-red-700 dark:text-red-300 animate-[fadeIn_0.3s_ease-out]">
              <span className="text-xl">⚠️</span>
              <div className="flex-1">
                <p className="font-medium text-sm">{error}</p>
              </div>
              <button
                onClick={() => setError(null)}
                className="text-red-400 hover:text-red-600 dark:hover:text-red-200 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          )}

          {/* Generate Button */}
          <GenerateButton
            onClick={generateImage}
            isGenerating={isGenerating}
            hasPrompt={prompt.trim().length > 0}
          />
        </section>

        {/* Image Result */}
        {(isGenerating || currentImage) && (
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              🎨 생성 결과
            </h2>
            <ImageResult
              image={currentImage}
              isGenerating={isGenerating}
              onDownload={downloadImage}
            />
          </section>
        )}

        {/* Gallery */}
        <section>
          <Gallery
            images={gallery}
            onDelete={deleteFromGallery}
            onClearAll={clearAllGallery}
            onDownload={downloadImage}
            onSelect={setModalImage}
          />
        </section>

        {/* Footer */}
        <footer className="text-center py-8 space-y-2">
          <p className="text-gray-400 dark:text-gray-500 text-sm">
            Powered by{" "}
            <a
              href="https://pollinations.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-500 hover:text-purple-400 transition-colors font-medium"
            >
              Pollinations.ai
            </a>{" "}
            · 무료로 누구나 사용할 수 있습니다
          </p>
          <p className="text-gray-300 dark:text-gray-600 text-xs">
            생성된 이미지는 브라우저에 저장됩니다
          </p>
        </footer>
      </main>

      {/* Image Modal */}
      <ImageModal
        image={modalImage}
        onClose={() => setModalImage(null)}
        onDownload={downloadImage}
      />
    </div>
  );
}
