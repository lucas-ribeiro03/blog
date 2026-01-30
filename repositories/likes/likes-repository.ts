export interface LikesRepository {
  like(userId: string, postId: string): Promise<void>;
  unlike(userId: string, postId: string): Promise<void>;
  getLikesOnPost(postId: string): Promise<{ likesCount: number }[] | number>;
  getLikesByCategory(): Promise<
    { category: string; categoryId: string; totalLikes: number }[]
  >;
  getLikesFromUser(
    postId: string,
    userId: string,
  ): Promise<{ postId: string }[]>;
}
