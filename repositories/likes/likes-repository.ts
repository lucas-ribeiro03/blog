export interface LikesRepository {
  like(userId: string, postId: string): Promise<void>;
  unlike(userId: string, postId: string): Promise<void>;
  getLikesOnPost(
    postIds: string[],
    userId: string,
  ): Promise<Record<string, { likesCount: number; isLikedByMe: boolean }>>;
  getLikesByCategory(): Promise<
    { category: string; categoryId: string; totalLikes: number }[]
  >;
}
