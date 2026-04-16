"use client";

import { STYLE_PRESETS } from "@/lib/constants";

interface StyleSelectorProps {
  selected: string;
  onSelect: (id: string) => void;
}

export default function StyleSelector({ selected, onSelect }: StyleSelectorProps) {
  return (
    <div className="w-full">
      <label
        className="block text-xs font-medium uppercase tracking-wider mb-3"
        style={{ color: "var(--text-secondary)" }}
      >
        스타일
      </label>
      <div className="flex flex-wrap gap-2">
        {STYLE_PRESETS.map((style) => {
          const isSelected = selected === style.id;
          return (
            <button
              key={style.id}
              onClick={() => onSelect(style.id)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors duration-150"
              style={{
                background: isSelected ? "var(--accent)" : "var(--surface-secondary)",
                color: isSelected ? "#ffffff" : "var(--text)",
                border: isSelected ? "1px solid var(--accent)" : "1px solid var(--border)",
              }}
              onMouseEnter={(e) => {
                if (!isSelected) e.currentTarget.style.borderColor = "var(--text-secondary)";
              }}
              onMouseLeave={(e) => {
                if (!isSelected) e.currentTarget.style.borderColor = "var(--border)";
              }}
            >
              <span>{style.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
