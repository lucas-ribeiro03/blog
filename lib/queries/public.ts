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
  cacheTag(`post-${slug}`);
  const post = await postRepository.getPostBySlug(slug);
  return post;
};

export const getLikesByCategory = async () => {
  "use cache";
  cacheLife({ revalidate: 3600 });
  const likes = await likesRepository.getLikesByCategory();
  return likes;
};
