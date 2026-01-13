export type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  categoryId: string;
  authorId: string;
  createdAt: number;
  updatedAt: number;
  author?: string;
  category?: string;
};
