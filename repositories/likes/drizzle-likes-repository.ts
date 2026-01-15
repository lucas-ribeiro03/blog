import { drizzleDb } from "@/db";
import { LikesRepository } from "./likes-repository";
import { categoriesTable, likesTable, postsTable } from "@/db/schemas";
import { eq, sql } from "drizzle-orm";
import { postRepository } from "../post";

export class DrizzleLikesRepository implements LikesRepository {
  async like(userId: string, postId: string): Promise<void> {
    const values = {
      userId,
      postId,
      createdAt: new Date(),
    };
    await drizzleDb.insert(likesTable).values(values);
  }

  async unlike(userId: string, postId: string): Promise<void> {
    await drizzleDb
      .delete(likesTable)
      .where(eq(eq(likesTable.userId, userId), eq(likesTable.postId, postId)));
  }

  async getLikesOnPost(postId: string): Promise<number> {
    const likesOnPost = await drizzleDb.query.likes.findMany({
      where: eq(likesTable.postId, postId),
    });

    const likesCount = likesOnPost.length;

    return likesCount;
  }

  async getLikesByCategory(category: string): Promise<number> {
    const getLikesFromCategory = await drizzleDb
      .select({
        total: sql<number>`${likesTable.postId}`,
      })
      .from(likesTable)
      .innerJoin(categoriesTable, eq(postsTable.id, likesTable.postId))
      .where(eq(postsTable.categoryId, category));

    return getLikesFromCategory[0]?.total;
  }
}
