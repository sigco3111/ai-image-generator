"use client";

import { useTheme } from "@/hooks/useTheme";

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative w-14 h-7 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900"
      style={{
        background: isDark
          ? "linear-gradient(135deg, #1e1b4b, #312e81)"
          : "linear-gradient(135deg, #fbbf24, #f59e0b)",
      }}
      aria-label={isDark ? "라이트 모드 전환" : "다크 모드 전환"}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-6 h-6 rounded-full bg-white shadow-md transform transition-transform duration-300 flex items-center justify-center text-xs ${
          isDark ? "translate-x-7" : "translate-x-0"
        }`}
      >
        {isDark ? "🌙" : "☀️"}
      </span>
    </button>
  );
}
