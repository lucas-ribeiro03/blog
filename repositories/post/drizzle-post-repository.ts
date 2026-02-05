import { Post } from "@/model/post";
import { PostRepository } from "./post-repository";
import { eq, like, sql } from "drizzle-orm";
import { categoriesTable, postsTable, usersTable } from "@/db/schemas";
import { drizzleDb } from "@/db";

export class DrizzlePostRepository implements PostRepository {
  async getPostBySlug(slug: string): Promise<Post | string> {
    if (!slug) return "Slug não recebida";
    const post = await drizzleDb
      .select({
        id: postsTable.id,
        title: postsTable.title,
        content: postsTable.content,
        excerpt: postsTable.excerpt,
        slug: postsTable.slug,
        coverImage: postsTable.coverImage,
        categoryId: postsTable.categoryId,
        authorId: postsTable.authorId,
        createdAt: postsTable.createdAt,
        updatedAt: postsTable.updatedAt,
        author: sql<string>`
        CAST(${usersTable.name} AS TEXT)
        || ' ' ||
        CAST(${usersTable.lastName} AS TEXT)
      `.as("author"),
        category: categoriesTable.name,
      })
      .from(postsTable)
      .innerJoin(usersTable, eq(usersTable.id, postsTable.authorId))
      .innerJoin(categoriesTable, eq(categoriesTable.id, postsTable.categoryId))
      .where(eq(postsTable.slug, slug))
      .limit(1);

    if (!post || post.length === 0) return "Nenhum post encontrado";

    return {
      ...post[0],
      createdAt: Number(post[0].createdAt),
      updatedAt: Number(post[0].updatedAt),
    };
  }

  async getPosts(): Promise<Post[] | string> {
    const posts = await drizzleDb
      .select({
        id: postsTable.id,
        title: postsTable.title,
        content: postsTable.content,
        excerpt: postsTable.excerpt,
        slug: postsTable.slug,
        coverImage: postsTable.coverImage,
        categoryId: postsTable.categoryId,
        authorId: postsTable.authorId,
        createdAt: postsTable.createdAt,
        updatedAt: postsTable.updatedAt,
        author: sql<string>`
        CAST(${usersTable.name} AS TEXT) 
        || ' ' || 
        CAST(${usersTable.lastName} AS TEXT)
      `.as("author"),
        category: categoriesTable.name,
      })
      .from(postsTable)
      .innerJoin(usersTable, eq(usersTable.id, postsTable.authorId))
      .innerJoin(
        categoriesTable,
        eq(categoriesTable.id, postsTable.categoryId),
      );
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

    const posts = await drizzleDb
      .select({
        id: postsTable.id,
        title: postsTable.title,
        content: postsTable.content,
        excerpt: postsTable.excerpt,
        slug: postsTable.slug,
        coverImage: postsTable.coverImage,
        categoryId: postsTable.categoryId,
        authorId: postsTable.authorId,
        createdAt: postsTable.createdAt,
        updatedAt: postsTable.updatedAt,
        author: sql<string>`
        CAST(${usersTable.name} AS TEXT)
        || ' ' ||
        CAST(${usersTable.lastName} AS TEXT)
      `.as("author"),
        category: categoriesTable.name,
      })
      .from(postsTable)
      .innerJoin(usersTable, eq(usersTable.id, postsTable.authorId))
      .innerJoin(categoriesTable, eq(categoriesTable.id, postsTable.categoryId))
      .where(eq(categoriesTable.name, category));

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
    const post = await drizzleDb
      .select({
        id: postsTable.id,
        title: postsTable.title,
        content: postsTable.content,
        excerpt: postsTable.excerpt,
        slug: postsTable.slug,
        coverImage: postsTable.coverImage,
        categoryId: postsTable.categoryId,
        authorId: postsTable.authorId,
        createdAt: postsTable.createdAt,
        updatedAt: postsTable.updatedAt,
        author: sql<string>`
        CAST(${usersTable.name} AS TEXT)
        || ' ' ||
        CAST(${usersTable.lastName} AS TEXT)
      `.as("author"),
        category: categoriesTable.name,
      })
      .from(postsTable)
      .innerJoin(usersTable, eq(usersTable.id, postsTable.authorId))
      .innerJoin(categoriesTable, eq(categoriesTable.id, postsTable.categoryId))
      .where(eq(postsTable.id, id))
      .limit(1);

    if (!post || post.length === 0) return "Nenhum post encontrado";

    return {
      ...post[0],
      createdAt: Number(post[0].createdAt),
      updatedAt: Number(post[0].updatedAt),
    };
  }

  async getPostByAuthor(authorId: string): Promise<Post[]> {
    const post = await drizzleDb
      .select({
        id: postsTable.id,
        title: postsTable.title,
        content: postsTable.content,
        excerpt: postsTable.excerpt,
        slug: postsTable.slug,
        coverImage: postsTable.coverImage,
        categoryId: postsTable.categoryId,
        authorId: postsTable.authorId,
        createdAt: postsTable.createdAt,
        updatedAt: postsTable.updatedAt,
        author: sql<string>`
      CAST(${usersTable.name} AS TEXT)
      || ' ' ||
      CAST(${usersTable.lastName} AS TEXT)
    `.as("author"),
        category: categoriesTable.name,
      })
      .from(postsTable)
      .innerJoin(usersTable, eq(postsTable.authorId, usersTable.id))
      .innerJoin(categoriesTable, eq(categoriesTable.id, postsTable.categoryId))
      .where(eq(usersTable.id, authorId));

    if (!post) throw new Error("Nenhum post encontrado");

    const postsWithDateFormatted = post.map((post) => {
      return {
        ...post,
        createdAt: Number(post.createdAt),
        updatedAt: Number(post.updatedAt),
      };
    });

    return postsWithDateFormatted;
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
      const post = await drizzleDb
        .delete(postsTable)
        .where(eq(postsTable.id, id));
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

  async getPostByTitle(title: string): Promise<Post[]> {
    if (!title) throw new Error("Título não enviado");

    const filter = title.toLowerCase();
    const post = await drizzleDb.query.posts.findMany({
      where: like(sql`lower(${postsTable.title})`, `%${filter}%`),
    });

    const postFixed = post.map((post) => {
      return {
        ...post,
        createdAt: Number(post.createdAt),
        updatedAt: Number(post.updatedAt),
      };
    });

    return postFixed;
  }
}
