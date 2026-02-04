import { getLikesAction } from "@/actions/likeActions/get-likes-action";
import { PostCard } from "./post-card";
import { getLikesFromPost, getPosts } from "@/lib/queries/public";
import { getLikesFromPostAction } from "@/actions/likeActions/get-likes-from-post";

export const PostList = async () => {
  const posts = await getPosts();
  const likesSummary = await getLikesFromPostAction();
  if (typeof posts !== "string" && posts && typeof likesSummary !== "undefined")
    return (
      <div className="space-y-6">
        {posts.map((post) => {
          return (
            <PostCard key={post.id} post={post} likes={likesSummary[post.id]} />
          );
        })}
      </div>
    );
};
