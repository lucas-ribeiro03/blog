import { likesRepository } from "@/repositories/likes";
import { postRepository } from "@/repositories/post";
import { cacheLife, cacheTag } from "next/cache";

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

export const getLikesFromUser = async (postId: string, userId: string) => {
  "use cache";
  cacheTag(`user-${userId}-post-${postId}`);
  const likes = await likesRepository.getLikesFromUser(postId, userId);
  return likes;
};

export const getLikesFromPost = async (postId: string) => {
  "use cache";
  cacheTag(`likes-post-${postId}`);
  const likes = await likesRepository.getLikesOnPost(postId);
  return likes;
};

export const getLikesByCategory = async () => {
  "use cache";
  cacheLife({ revalidate: 3600 });
  console.log("buscando do banco...");
  const likes = await likesRepository.getLikesByCategory();
  return likes;
};
