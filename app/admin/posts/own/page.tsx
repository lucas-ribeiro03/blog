import { Suspense } from "react";
import { OwnPostsList } from "@/components/admin/own-posts-list";
import { verifyLogin } from "@/utils/manage-login";
import { postRepository } from "@/repositories/post";
import { getLikesFromPostAction } from "@/actions/likeActions/get-likes-from-post";

export const GetOwnPosts = async () => {
  const user = await verifyLogin();
  const userId = user.payload.sub;
  if (!userId) return;
  const posts = await postRepository.getPostByAuthor(userId);
  const likesSummary = await getLikesFromPostAction();
  if (!likesSummary) return;

  return <OwnPostsList posts={posts} likes={likesSummary} />;
};

export default async function OwnPostsPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <Suspense fallback={<div>Carregando...</div>}>
        <GetOwnPosts />
      </Suspense>
    </main>
  );
}
