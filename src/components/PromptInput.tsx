"use client";

import { useState, useRef, useEffect } from "react";
import { PLACEHOLDER_PROMPTS } from "@/lib/constants";

interface PromptInputProps {
  value: string;
  onChange: (value: string) => void;
  onGenerate: () => void;
  isGenerating: boolean;
}

export default function PromptInput({ value, onChange, onGenerate, isGenerating }: PromptInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (isFocused) return;
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % PLACEHOLDER_PROMPTS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isFocused]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onGenerate();
    }
  };

  return (
    <div className="relative w-full">
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={PLACEHOLDER_PROMPTS[placeholderIndex]}
        rows={3}
        className="w-full px-5 py-4 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-2 border-purple-200 dark:border-purple-700/50 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 resize-none transition-all duration-300 focus:border-purple-500 dark:focus:border-purple-400 focus:ring-4 focus:ring-purple-500/20 outline-none text-base leading-relaxed"
      />
      <div className="absolute bottom-3 right-3 text-xs text-gray-400 dark:text-gray-500">
        Shift+Enter 줄바꿈 · Enter 생성
      </div>
    </div>
  );
}
