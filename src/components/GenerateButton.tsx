"use client";

interface GenerateButtonProps {
  onClick: () => void;
  isGenerating: boolean;
  hasPrompt: boolean;
}

export default function GenerateButton({ onClick, isGenerating, hasPrompt }: GenerateButtonProps) {
  const disabled = isGenerating || !hasPrompt;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="relative w-full py-3.5 rounded-lg font-semibold text-base transition-colors duration-150"
      style={{
        background: disabled ? "var(--surface-secondary)" : "var(--accent)",
        color: disabled ? "var(--text-secondary)" : "#ffffff",
        cursor: disabled ? "not-allowed" : "pointer",
        border: "1px solid",
        borderColor: disabled ? "var(--border)" : "var(--accent)",
      }}
      onMouseEnter={(e) => {
        if (!disabled) e.currentTarget.style.background = "var(--accent-hover)";
      }}
      onMouseLeave={(e) => {
        if (!disabled) e.currentTarget.style.background = "var(--accent)";
      }}
    >
      <span className="flex items-center justify-center gap-2">
        {isGenerating ? (
          <>
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="3"
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
          "이미지 생성"
        )}
      </span>
    </button>
  );
}
