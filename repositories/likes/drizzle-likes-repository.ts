import { drizzleDb } from "@/db";
import { LikesRepository } from "./likes-repository";
import { categoriesTable, likesTable, postsTable } from "@/db/schemas";
import { and, count, desc, eq, sql } from "drizzle-orm";

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
      .where((eq(likesTable.userId, userId), eq(likesTable.postId, postId)));
  }

  async getLikesOnPost(
    postId: string,
  ): Promise<{ likesCount: number }[] | number> {
    const getLikesCount = await drizzleDb
      .select({ likesCount: count(likesTable.postId) })
      .from(likesTable)
      .where(eq(likesTable.postId, postId));

    return getLikesCount ?? 0;
  }

  async getLikesByCategory(): Promise<
    { category: string; categoryId: string; totalLikes: number }[]
  > {
    const totalLikes = sql<number>`count(*)`.as("total_likes");
    const getLikesFromCategory = await drizzleDb
      .select({
        category: categoriesTable.name,
        categoryId: categoriesTable.id,
        totalLikes: totalLikes,
      })
      .from(likesTable)
      .innerJoin(postsTable, eq(likesTable.postId, postsTable.id))
      .innerJoin(categoriesTable, eq(categoriesTable.id, postsTable.categoryId))
      .groupBy(categoriesTable.name)
      .orderBy(desc(totalLikes))
      .limit(5);

    return getLikesFromCategory;
  }

  async getLikesFromUser(
    postId: string,
    userId: string,
  ): Promise<{ postId: string }[]> {
    if (!postId || !userId) throw new Error("Dados inválidos");
    const getLikes = await drizzleDb.query.likes.findMany({
      where: and(eq(likesTable.postId, postId), eq(likesTable.userId, userId)),
    });

    return getLikes;
  }
}
