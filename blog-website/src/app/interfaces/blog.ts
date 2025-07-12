export interface IBlogPost {
  id: number
  slug: string;
  title: string;
  content: string;
  imageUrl: string | null;
  characterCount: number;
  createdAt: string;
  tags: string[];
}
