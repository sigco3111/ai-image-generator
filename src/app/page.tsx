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
    <div className="min-h-screen" style={{ background: "var(--background)" }}>
      {/* Header */}
      <header
        className="sticky top-0 z-40 w-full"
        style={{
          background: "var(--surface)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <h1 className="text-base font-semibold tracking-tight" style={{ color: "var(--text)" }}>
            AI 이미지 생성기
          </h1>
          <ThemeToggle />
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Minimal heading */}
        <section className="space-y-2 pt-2">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight" style={{ color: "var(--text)" }}>
            상상을 이미지로
          </h2>
          <p className="text-base max-w-lg" style={{ color: "var(--text-secondary)" }}>
            프롬프트를 입력하면 AI가 당신의 상상을 실제 이미지로 만들어 드립니다.
          </p>
        </section>

        {/* Generator Card */}
        <section
          className="rounded-lg p-6 sm:p-8 space-y-6"
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
          }}
        >
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
            <div
              className="flex items-center gap-3 p-4 rounded-lg text-sm animate-fade-in"
              style={{
                background: "var(--surface-secondary)",
                border: "1px solid var(--border)",
                color: "var(--text)",
              }}
            >
              <div className="flex-1">
                <p className="font-medium">{error}</p>
              </div>
              <button
                onClick={() => setError(null)}
                className="transition-colors"
                style={{ color: "var(--text-secondary)" }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
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
          <section className="space-y-3">
            <h2
              className="text-xs font-medium uppercase tracking-wider"
              style={{ color: "var(--text-secondary)" }}
            >
              생성 결과
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
        <footer className="text-center py-8 space-y-1">
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            Powered by{" "}
            <a
              href="https://pollinations.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium hover:underline"
              style={{ color: "var(--accent)" }}
            >
              Pollinations.ai
            </a>{" "}
            · 무료로 누구나 사용할 수 있습니다
          </p>
          <p className="text-xs" style={{ color: "var(--text-secondary)", opacity: 0.6 }}>
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
