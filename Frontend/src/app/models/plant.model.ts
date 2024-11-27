export class Plant {
  id: number;
  name: string;
  description: string; // Combined short and long description into one string
  image: string;      // Assuming it should be a string (single image URL or path)
  precautions: string[];  // List of precautions
  comments: string[];     // List of comments (assuming it can be a simple list of strings)
  region: string[];       // List of regions
  properties: string[];   // List of properties
  uses: string[];         // List of uses
  interactions: string[]; // List of interactions
  articles: string[];     // List of articles
  video: string[];          // Video URL or path

  constructor(
    id: number,
    name: string,
    description: string,
    image: string,
    precautions: string[],
    comments: string[],
    region: string[],
    properties: string[],
    uses: string[],
    interactions: string[],
    articles: string[],
    video: string[]
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.image = image;
    this.precautions = precautions;
    this.comments = comments;
    this.region = region;
    this.properties = properties;
    this.uses = uses;
    this.interactions = interactions;
    this.articles = articles;
    this.video = video;
  }
}
