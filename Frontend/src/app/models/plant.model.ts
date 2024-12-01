export class Plant {
  id: number; // Add this property
  name: string;
  description: string;
  properties: string[];
  uses: string[];
  region: string[];
  precautions: string[];
  interactions: string[];
  images: string[];
  articles: string[];
  videos: string[];

  constructor(
    id: number, // Update constructor to include `id`
    name: string,
    description: string,
    properties: string[],
    uses: string[],
    region: string[],
    precautions: string[],
    interactions: string[],
    images: string[],
    articles: string[],
    videos: string[]
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.properties = properties;
    this.uses = uses;
    this.region = region;
    this.precautions = precautions;
    this.interactions = interactions;
    this.images = images;
    this.articles = articles;
    this.videos = videos;
  }
}
