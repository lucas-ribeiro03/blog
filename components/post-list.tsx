import { postRepository } from "@/repositories/post";
import { PostCard } from "./post-card";
import { drizzleDb } from "@/db";
import { eq } from "drizzle-orm";
import { categoriesTable } from "@/db/schemas";
import { userRepository } from "@/repositories/users";

export const PostList = async () => {
  const posts = await postRepository.getPosts();

  if (typeof posts === "string") return null;

  return (
    <div className="space-y-6">
      {posts.map(async (post) => {
        const category = await drizzleDb.query.categories.findFirst({
          where: eq(categoriesTable.id, post.categoryId),
        });

        const author = await userRepository.getUserById(post.authorId);

        if (typeof author === "string") return null;
        if (!category) return null;

        return (
          <PostCard
            key={post.id}
            post={post}
            category={category.name}
            author={`${author.name} ${author.lastName}`}
          />
        );
      })}
    </div>
  );
};
