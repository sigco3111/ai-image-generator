"use client";

import { STYLE_PRESETS } from "@/lib/constants";

interface StyleSelectorProps {
  selected: string;
  onSelect: (id: string) => void;
}

export default function StyleSelector({ selected, onSelect }: StyleSelectorProps) {
  return (
    <div className="w-full">
      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
        🎨 스타일 선택
      </label>
      <div className="flex flex-wrap gap-2">
        {STYLE_PRESETS.map((style) => (
          <button
            key={style.id}
            onClick={() => onSelect(style.id)}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 border-2 ${
              selected === style.id
                ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white border-transparent shadow-lg shadow-purple-500/25 scale-105"
                : "bg-white/70 dark:bg-gray-800/70 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600 hover:shadow-md"
            }`}
          >
            <span className="text-base">{style.emoji}</span>
            <span>{style.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
