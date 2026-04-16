"use client";

import { SIZE_OPTIONS } from "@/lib/constants";

interface SizeSelectorProps {
  selected: string;
  onSelect: (id: string) => void;
}

export default function SizeSelector({ selected, onSelect }: SizeSelectorProps) {
  return (
    <div className="w-full">
      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
        📐 이미지 크기
      </label>
      <div className="flex gap-3">
        {SIZE_OPTIONS.map((size) => (
          <button
            key={size.id}
            onClick={() => onSelect(size.id)}
            className={`flex flex-col items-center gap-1 px-5 py-3 rounded-xl text-sm font-medium transition-all duration-200 border-2 ${
              selected === size.id
                ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white border-transparent shadow-lg shadow-purple-500/25 scale-105"
                : "bg-white/70 dark:bg-gray-800/70 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600 hover:shadow-md"
            }`}
          >
            <div
              className={`border-2 rounded-sm ${
                selected === size.id ? "border-white" : "border-gray-400 dark:border-gray-500"
              }`}
              style={{
                width: size.width > size.height ? "28px" : "20px",
                height: size.width > size.height ? "20px" : "28px",
              }}
            />
            <span>{size.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
