"use client";

interface GenerateButtonProps {
  onClick: () => void;
  isGenerating: boolean;
  hasPrompt: boolean;
}

export default function GenerateButton({ onClick, isGenerating, hasPrompt }: GenerateButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={isGenerating || !hasPrompt}
      className={`relative w-full py-4 rounded-2xl text-white font-bold text-lg transition-all duration-300 overflow-hidden ${
        isGenerating || !hasPrompt
          ? "bg-gray-400 dark:bg-gray-600 cursor-not-allowed"
          : "bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 hover:from-purple-700 hover:via-pink-700 hover:to-orange-600 shadow-xl shadow-purple-500/25 hover:shadow-2xl hover:shadow-purple-500/40 hover:scale-[1.02] active:scale-[0.98]"
      }`}
    >
      {/* Animated background for generating state */}
      {isGenerating && (
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 animate-[shimmer_2s_infinite] bg-[length:200%_100%]" />
      )}
      
      <span className="relative flex items-center justify-center gap-3">
        {isGenerating ? (
          <>
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            이미지 생성 중...
          </>
        ) : (
          <>
            ✨ AI 이미지 생성
          </>
        )}
      </span>
    </button>
  );
}
