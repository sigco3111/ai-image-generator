"use client";

import { useState, useCallback } from "react";
import { GeneratedImage } from "@/lib/types";
import { STYLE_PRESETS, SIZE_OPTIONS } from "@/lib/constants";
import { generateId, addToGallery, getGallery, removeFromGallery, clearGallery } from "@/lib/storage";

export function useImageGenerator() {
  const [prompt, setPrompt] = useState("");
  const [selectedStyle, setSelectedStyle] = useState(STYLE_PRESETS[0].id);
  const [selectedSize, setSelectedSize] = useState(SIZE_OPTIONS[0].id);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentImage, setCurrentImage] = useState<GeneratedImage | null>(null);
  const [gallery, setGallery] = useState<GeneratedImage[]>([]);
  const [error, setError] = useState<string | null>(null);

  const loadGallery = useCallback(() => {
    setGallery(getGallery());
  }, []);

  const buildPrompt = useCallback(
    (userPrompt: string, styleId: string): string => {
      const style = STYLE_PRESETS.find((s) => s.id === styleId);
      if (!style || style.prompt === "") return userPrompt;
      return `${userPrompt}, ${style.prompt}`;
    },
    []
  );

  const generateImage = useCallback(async () => {
    if (!prompt.trim()) {
      setError("프롬프트를 입력해주세요.");
      return;
    }

    setIsGenerating(true);
    setError(null);
    setCurrentImage(null);

    try {
      const size = SIZE_OPTIONS.find((s) => s.id === selectedSize) || SIZE_OPTIONS[0];
      const fullPrompt = buildPrompt(prompt.trim(), selectedStyle);
      const encodedPrompt = encodeURIComponent(fullPrompt);
      const seed = Math.floor(Math.random() * 1000000);

      const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=${size.width}&height=${size.height}&model=flux&seed=${seed}&nologo=true`;

      // Preload the image
      await new Promise<void>((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = () => reject(new Error("이미지 생성에 실패했습니다. 다시 시도해주세요."));
        img.src = imageUrl;
        // Timeout after 60 seconds
        setTimeout(() => reject(new Error("시간 초과. 다시 시도해주세요.")), 60000);
      });

      const generatedImage: GeneratedImage = {
        id: generateId(),
        prompt: prompt.trim(),
        style: STYLE_PRESETS.find((s) => s.id === selectedStyle)?.label || "기본",
        size: selectedSize,
        width: size.width,
        height: size.height,
        url: imageUrl,
        timestamp: Date.now(),
      };

      setCurrentImage(generatedImage);
      addToGallery(generatedImage);
      setGallery(getGallery());
    } catch (err) {
      setError(err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다.");
    } finally {
      setIsGenerating(false);
    }
  }, [prompt, selectedStyle, selectedSize, buildPrompt]);

  const deleteFromGallery = useCallback((id: string) => {
    removeFromGallery(id);
    setGallery(getGallery());
  }, []);

  const clearAllGallery = useCallback(() => {
    clearGallery();
    setGallery([]);
  }, []);

  const downloadImage = useCallback(async (image: GeneratedImage) => {
    try {
      const response = await fetch(image.url);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `ai-image-${image.id}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      setError("이미지 다운로드에 실패했습니다.");
    }
  }, []);

  return {
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
  };
}
