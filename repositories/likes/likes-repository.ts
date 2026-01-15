export interface LikesRepository {
  like(userId: string, postId: string): Promise<void>;
  unlike(userId: string, postId: string): Promise<void>;
  getLikesOnPost(postId: string): Promise<number>;
  getLikesByCategory(categoryId: string): Promise<number>;
}
