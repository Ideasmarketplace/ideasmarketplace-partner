export interface Asset {
  id: string;
  title: string;
  description: string;
  name: string;
  category: "Audio" | "Visual";
  type?: "image" | "video" | "audio" | "document";
  extension?: string;
  size?: number;
  folder?: string;
  visibility?: "Public" | "Private";
  thumbnail?: string | any;
  url?: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface AssetFormValues {
  title: string;
  description: string;
  category: "Audio" | "Visual";
  folder: string;
  visibility: "Public" | "Private";
  tags: string[];
}

export interface AssetFolder {
  id: string;
  name: string;
  description?: string;
  assetCount?: number;
  createdAt?: string;
  updatedAt?: string;
}
