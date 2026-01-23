import { likesRepository } from "@/repositories/likes";
import { postRepository } from "@/repositories/post";
import { cacheTag } from "next/cache";

export const getPosts = async () => {
  "use cache";
  cacheTag("posts");
  const posts = await postRepository.getPosts();
  return posts;
};

export const getPost = async (slug: string) => {
  "use cache";
  cacheTag("post");
  const post = await postRepository.getPostBySlug(slug);
  return post;
};

export const getLikesFromUser = async(postId: string, userId: string) => {
  "use cache"
  cacheTag('userLikes');
  const likes = await likesRepository.getLikesFromUser(postId, userId)
  return likes
}