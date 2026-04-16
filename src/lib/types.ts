export interface GeneratedImage {
  id: string;
  prompt: string;
  style: string;
  size: string;
  width: number;
  height: number;
  url: string;
  timestamp: number;
}

export interface StylePreset {
  id: string;
  label: string;
  emoji: string;
  prompt: string;
}

export interface SizeOption {
  id: string;
  label: string;
  width: number;
  height: number;
}
