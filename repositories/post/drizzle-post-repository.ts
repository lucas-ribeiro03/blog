import { Post } from "@/model/post";
import { PostRepository } from "./post-repository";
import { eq } from "drizzle-orm";
import { postsTable } from "@/db/schemas";
import { drizzleDb } from "@/db";

export class DrizzlePostRepository implements PostRepository {
  async getPostBySlug(slug: string): Promise<Post | string> {
    if (!slug) return "Slug não recebida";
    const post = await drizzleDb.query.posts.findFirst({
      where: eq(postsTable.slug, slug),
    });

    if (!post) return "Nenhum post encontrado";

    return {
      ...post,
      createdAt: Number(post.createdAt),
      updatedAt: Number(post.updatedAt),
    };
  }

  async getPosts(): Promise<Post[] | string> {
    const posts = await drizzleDb.query.posts.findMany();
    if (!posts) return "Não há posts criados ainda";

    const postsWithCreatedAtAndUpdatedAt = posts.map((post) => ({
      ...post,
      createdAt: Number(post.createdAt),
      updatedAt: Number(post.updatedAt),
    }));

    return postsWithCreatedAtAndUpdatedAt;
  }

  async getPostsByCategory(category: string): Promise<Post[] | string> {
    if (!category) return "Categoria não recebida";

    const posts = await drizzleDb.query.posts.findMany({
      where: eq(postsTable.categoryId, category),
    });

    if (!posts) return "Nenhum post encontrado";
    const postsWithCreatedAtAndUpdatedAt = posts.map((post) => ({
      ...post,
      createdAt: Number(post.createdAt),
      updatedAt: Number(post.updatedAt),
    }));
    return postsWithCreatedAtAndUpdatedAt;
  }

  async getPostById(id: string): Promise<Post | string> {
    if (!id) return "Id não recebido";
    const posts = await drizzleDb.query.posts.findFirst({
      where: eq(postsTable.id, id),
    });

    if (!posts) return "Nenhum post encontrado";

    return {
      ...posts,
      createdAt: Number(posts.createdAt),
      updatedAt: Number(posts.updatedAt),
    };
  }

  async createPost(post: Post): Promise<void> {
    if (!post) throw new Error("Post não recebido");
    const newPost = {
      ...post,
      createdAt: new Date(post.createdAt),
      updatedAt: new Date(post.updatedAt),
    };
    try {
      await drizzleDb.insert(postsTable).values(newPost);
    } catch (e) {
      throw new Error(`Erro: ${e}`);
    }
  }

  async deletePost(id: string): Promise<void> {
    if (!id) throw new Error(`Id não recebido`);
    try {
      await drizzleDb.delete(postsTable).where(eq(postsTable.id, id));
    } catch (e) {
      throw new Error(`Erro: ${e}`);
    }
  }

  async updatePost(post: Post): Promise<void> {
    if (!post) throw new Error("Post não recebido");

    const updatedAt = new Date();

    const newPost = {
      ...post,
      updatedAt,
      createdAt: new Date(post.createdAt),
    };

    await drizzleDb
      .update(postsTable)
      .set(newPost)
      .where(eq(postsTable.id, post.id));
  }
}
