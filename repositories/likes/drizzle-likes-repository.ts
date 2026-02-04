import { drizzleDb } from "@/db";
import { LikesRepository } from "./likes-repository";
import { categoriesTable, likesTable, postsTable } from "@/db/schemas";
import { and, count, desc, eq, inArray, sql } from "drizzle-orm";

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
      .where(and(eq(likesTable.userId, userId), eq(likesTable.postId, postId)));
  }

  async getLikesOnPost(
    postIds: string[],
    userId: string,
  ): Promise<Record<string, { likesCount: number; isLikedByMe: boolean }>> {
    // const getLikesCount = await drizzleDb
    //   .select({ likesCount: count(likesTable.postId) })
    //   .from(likesTable)
    //   .where(eq(likesTable.postId, postId));

    const rows = await drizzleDb
      .select({
        postId: likesTable.postId,
        likesCount: count(likesTable.postId),
        isLikedByMe: sql<boolean>`sum (case when ${likesTable.userId} = ${userId} then 1 else 0 end)`,
      })
      .from(likesTable)
      .where(inArray(likesTable.postId, postIds))
      .groupBy(likesTable.postId);

    return rows.reduce(
      (acc, row) => {
        acc[row.postId] = {
          likesCount: Number(row.likesCount) ?? 0,
          isLikedByMe: row.isLikedByMe ?? false,
        };
        return acc;
      },
      {} as Record<string, { likesCount: number; isLikedByMe: boolean }>,
    );
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
}
