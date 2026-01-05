import { Post } from "@/model/post";

export interface PostRepository {
  getPostBySlug(slug: string): Promise<Post | string>;
  getPosts(): Promise<Post[] | string>;
  getPostById(id: string): Promise<Post | string>;
  getPostsByCategory(category: string): Promise<Post[] | string>;
  createPost(post: Post): Promise<void>;
  updatePost(post: Post): Promise<void>;
  deletePost(id: string): Promise<void>;
}
