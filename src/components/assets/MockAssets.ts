import { Asset } from "./types";

const visualImages = [
  "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&q=80",
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80",
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80",
  "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=800&q=80",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&q=80",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
];

const audioImages = [
  "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&q=80",
  "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80",
  "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80",
  "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800&q=80",
  "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800&q=80",
  "https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=800&q=80",
];

const generatedAssets: Asset[] = Array.from(
  { length: 28 },
  (_, index): Asset => {
    const isVisual = index % 2 === 0;

    return {
      id: `AST-${String(index + 3).padStart(3, "0")}`,

      name: `Asset ${index + 3}`,

      title: `Digital Asset ${index + 3}`,

      description: "Sample asset used for development.",

      category: isVisual ? "Visual" : "Audio",

      type: isVisual ? "image" : "audio",

      extension: isVisual ? "jpg" : "mp3",

      size: isVisual ? 4_500_000 : 12_800_000,

      folder: "Root",

      visibility: "Private",

      tags: ["marketing", "sample"],

      createdAt: "Jul 12, 2026",

      updatedAt: "Jul 20, 2026",

      thumbnail: isVisual
        ? visualImages[index % visualImages.length]
        : audioImages[index % audioImages.length],
    };
  }
);

export const mockAssets: Asset[] = [
  {
    id: "AST-001",

    name: "Summer Campaign",

    title: "Summer Promo Video",

    description: "Summer promotional campaign video.",

    category: "Visual",

    type: "image",

    extension: "jpg",

    size: 5400000,

    folder: "Marketing",

    visibility: "Public",

    tags: ["summer", "promo"],

    createdAt: "Jul 15, 2026",

    updatedAt: "Jul 22, 2026",

    thumbnail:
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&q=80",
  },

  {
    id: "AST-002",

    name: "Podcast Intro",

    title: "Business Podcast Intro",

    description: "Opening audio for the podcast.",

    category: "Audio",

    type: "audio",

    extension: "mp3",

    size: 8200000,

    folder: "Podcasts",

    visibility: "Private",

    tags: ["podcast", "intro"],

    createdAt: "Jul 10, 2026",

    updatedAt: "Jul 18, 2026",

    thumbnail:
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&q=80",
  },

  ...generatedAssets,
];