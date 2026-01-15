import { PostCard } from "./post-card";
import { getPosts } from "@/lib/queries/public";

export const PostList = async () => {
  const posts = await getPosts();

  if (typeof posts !== "string" && posts)
    return (
      <div className="space-y-6">
        {posts.map((post) => {
          return (
            <PostCard
              key={post.id}
              post={post}
              category={post.category ? post.category : ""}
              author={post.author ? post.author : ""}
            />
          );
        })}
      </div>
    );
};
