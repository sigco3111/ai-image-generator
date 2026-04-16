import { StylePreset, SizeOption } from "./types";

export const STYLE_PRESETS: StylePreset[] = [
  {
    id: "none",
    label: "기본",
    emoji: "🎨",
    prompt: "",
  },
  {
    id: "icon",
    label: "아이콘",
    emoji: "🔮",
    prompt: "flat icon design, minimalist, vector style, simple shapes, clean lines, app icon style",
  },
  {
    id: "illustration",
    label: "일러스트",
    emoji: "✏️",
    prompt: "digital illustration, vibrant colors, detailed artwork, artistic style",
  },
  {
    id: "3d",
    label: "3D",
    emoji: "🧊",
    prompt: "3D render, isometric, blender style, volumetric lighting, detailed 3D model, octane render",
  },
  {
    id: "watercolor",
    label: "수채화",
    emoji: "💧",
    prompt: "watercolor painting, soft colors, flowing paint, artistic brushstrokes, paper texture",
  },
  {
    id: "pixel",
    label: "픽셀아트",
    emoji: "👾",
    prompt: "pixel art, 16-bit style, retro game art, crisp pixels, nostalgic",
  },
  {
    id: "realistic",
    label: "실사",
    emoji: "📸",
    prompt: "photorealistic, ultra detailed, 8k, professional photography, DSLR, sharp focus",
  },
];

export const SIZE_OPTIONS: SizeOption[] = [
  { id: "1:1", label: "1:1", width: 1024, height: 1024 },
  { id: "16:9", label: "16:9", width: 1344, height: 768 },
  { id: "9:16", label: "9:16", width: 768, height: 1344 },
];

export const PLACEHOLDER_PROMPTS = [
  "멋진 우주 정거장",
  "마법의 숲 속 요정",
  "미래 도시의 풍경",
  "귀여운 로봇 캐릭터",
  "바다 위 일몰 풍경",
];
