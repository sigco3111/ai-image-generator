import { GeneratedImage } from "./types";

const STORAGE_KEY = "ai-image-generator-gallery";

export function getGallery(): GeneratedImage[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function addToGallery(image: GeneratedImage): void {
  const gallery = getGallery();
  gallery.unshift(image);
  // Keep only the last 50 images
  const trimmed = gallery.slice(0, 50);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
}

export function removeFromGallery(id: string): void {
  const gallery = getGallery().filter((img) => img.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(gallery));
}

export function clearGallery(): void {
  localStorage.removeItem(STORAGE_KEY);
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
}
