import { EditPostForm } from "@/components/admin/edit-post-form";
import { postRepository } from "@/repositories/post";
import { Suspense } from "react";

type GetPostsToUpdateProps = {
  params: Promise<{ id: string }>;
};

export const GetPostToUpdate = async ({ params }: GetPostsToUpdateProps) => {
  const { id } = await params;
  const post = await postRepository.getPostById(id);
  if (typeof post !== "string") return <EditPostForm post={post} />;
};

export default function UpdatePostPage({ params }: GetPostsToUpdateProps) {
  return (
    <Suspense>
      <GetPostToUpdate params={params} />
    </Suspense>
  );
}
