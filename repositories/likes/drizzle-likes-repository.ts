import { drizzleDb } from "@/db";
import { LikesRepository } from "./likes-repository";
import { categoriesTable, likesTable, postsTable } from "@/db/schemas";
import { and, count, eq, sql } from "drizzle-orm";

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

  async getLikesOnPost(postId: string): Promise<{likesCount: number}[] | number> {
    const getLikesCount = await drizzleDb.select({likesCount: count(likesTable.postId)}).from(likesTable).where(eq(likesTable.postId, postId))

    return getLikesCount ?? 0;
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

  async getLikesFromUser(postId: string, userId: string): Promise<{postId: string}[]> {
    if(!postId || !userId) throw new Error('Dados inválidos')
    const getLikes = await drizzleDb.query.likes.findMany({
      where: and(eq(likesTable.postId, postId), eq(likesTable.userId, userId))
    })

    return getLikes
  }
}
