"use client";

import { useTheme } from "@/hooks/useTheme";

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none"
      style={{
        background: isDark ? "var(--accent)" : "var(--surface-secondary)",
        border: "1px solid",
        borderColor: isDark ? "var(--accent)" : "var(--border)",
      }}
      aria-label={isDark ? "라이트 모드 전환" : "다크 모드 전환"}
    >
      <span
        className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full transition-transform duration-200 flex items-center justify-center text-[10px]"
        style={{
          background: isDark ? "#ffffff" : "var(--border)",
          transform: isDark ? "translateX(20px)" : "translateX(0)",
        }}
      >
        {isDark ? "🌙" : "☀️"}
      </span>
    </button>
  );
}
