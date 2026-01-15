import { categories } from "@/data/categories";
import { drizzleDb } from ".";
import { posts } from "../data/posts";
import { categoriesTable, postsTable } from "./schemas";
import { postRepository } from "@/repositories/post";
(async () => {
  const postsToInsert = posts.map((post) => {
    return {
      ...post,
      createdAt: new Date(post.createdAt),
      updatedAt: new Date(post.updatedAt),
    };
  });
  const insertPosts = await drizzleDb.insert(postsTable).values(postsToInsert);
  console.log(insertPosts);
  //   const insertPosts = await drizzleDb.insert(postsTable).values(posts);
  //   console.log(insertPosts);
  // const insertCategories = await drizzleDb
  //   .insert(categoriesTable)
  //   .values(categories);
  // console.log(insertCategories);
})();
