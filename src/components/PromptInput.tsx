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

  const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    setIsFocused(true);
    e.currentTarget.style.borderColor = "var(--accent)";
    e.currentTarget.style.boxShadow = "0 0 0 3px var(--accent-light)";
  };

  const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    setIsFocused(false);
    e.currentTarget.style.borderColor = "var(--border)";
    e.currentTarget.style.boxShadow = "none";
  };

  return (
    <div className="relative w-full">
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={PLACEHOLDER_PROMPTS[placeholderIndex]}
        rows={3}
        className="w-full px-4 py-3 rounded-lg resize-none text-base leading-relaxed outline-none transition-colors duration-200"
        style={{
          background: "var(--surface-secondary)",
          border: "2px solid var(--border)",
          color: "var(--text)",
        }}
      />
      <div
        className="absolute bottom-2.5 right-3 text-xs"
        style={{ color: "var(--text-secondary)" }}
      >
        Shift+Enter 줄바꿈 · Enter 생성
      </div>
    </div>
  );
}
