import { postRepository } from "@/repositories/post";
import { cacheTag } from "next/cache";

export const getPosts = async () => {
  "use cache";
  cacheTag("posts");
  console.log("cache teste");
  const posts = await postRepository.getPosts();
  return posts;
};

export const getPost = async (slug: string) => {
  "use cache";
  cacheTag("post");
  const post = await postRepository.getPostBySlug(slug);
  return post;
};
