import { drizzleDb } from ".";
import { posts } from "../data/posts";
import { postsTable } from "./schemas";
(async () => {
  const insertPosts = await drizzleDb.query.posts.findMany();
  console.log(insertPosts);

  //   const insertPosts = await drizzleDb.insert(postsTable).values(posts);
  //   console.log(insertPosts);
})();
