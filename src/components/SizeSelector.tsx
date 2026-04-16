"use client";

import { SIZE_OPTIONS } from "@/lib/constants";

interface SizeSelectorProps {
  selected: string;
  onSelect: (id: string) => void;
}

export default function SizeSelector({ selected, onSelect }: SizeSelectorProps) {
  return (
    <div className="w-full">
      <label
        className="block text-xs font-medium uppercase tracking-wider mb-3"
        style={{ color: "var(--text-secondary)" }}
      >
        비율
      </label>
      <div className="flex gap-3">
        {SIZE_OPTIONS.map((size) => {
          const isSelected = selected === size.id;
          return (
            <button
              key={size.id}
              onClick={() => onSelect(size.id)}
              className="flex flex-col items-center gap-1.5 px-5 py-3 rounded-lg text-sm font-medium transition-colors duration-150"
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
              <div
                className="rounded-sm"
                style={{
                  border: "1.5px solid",
                  borderColor: isSelected ? "#ffffff" : "var(--text-secondary)",
                  width: size.width > size.height ? "28px" : "20px",
                  height: size.width > size.height ? "20px" : "28px",
                }}
              />
              <span>{size.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
