export interface Plant {
  id: number;
  name: string;
  description: string;
  properties: string[];
  uses: string[];
  precautions: string[];
  interactions: string[];
  images: string[];
  videos: string[];
  articles: string[];
  comments: { id: number; nom: string; email: string; contenu: string }[];
}
