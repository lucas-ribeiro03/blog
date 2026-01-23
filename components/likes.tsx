import { dislikeAction } from "@/actions/likeActions/dislike-action";
import { getLikesAction } from "@/actions/likeActions/get-likes-action";
import { getLikesFromPostAction } from "@/actions/likeActions/get-likes-from-post";
import { likeAction } from "@/actions/likeActions/like-action";
import { posts } from "@/data/posts";
import { Post } from "@/model/post";
import { Heart } from "lucide-react";
import { useEffect, useState, useTransition } from "react";

type LikesProps = {
  post: Post;
} & React.ComponentProps<"button">;

export const Likes = ({ post }: LikesProps) => {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [likesCount, setLikesCount] = useState<number>(0)
  useEffect(() => {
    const getLikesFromUser = async () => {
      const result = await getLikesAction(post.id);
      const postsLiked = result.find(result => result.postId === post.id)
      if(postsLiked?.postId === post.id) return setIsLiked(true)

    };

    getLikesFromUser();
  }, [post.id]);

  useEffect(() => {
    const getLikes = async () => {
      const result = await getLikesFromPostAction(post.id);
      if(typeof result !== 'number') {
        const likeCount = result[0]
        if(likeCount) setLikesCount(Number(likeCount.likesCount))
       
      }
      
    };
    getLikes();
  }, [post]);

  const [, startTransition] = useTransition();
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    if (!isLiked) {
      startTransition(async () => {
        const result = await likeAction(post.id);
        console.log(result)
      });
    } else {
      startTransition(async () => {
        await dislikeAction(post.id);
      });
    }
    setIsLiked((prev) => !prev);
    console.log(isLiked)
  };

  return (
    <div className="flex flex-col items-center gap-1 text-slate-500 dark:text-slate-400">
      <button
        className="border-0 bg-transparent hover:bg-transparent z-0"
        onClick={handleClick}
      >
        <Heart
          className={`h-6 w-6 ${
            isLiked ? "fill-red-500 text-red-500" : ""
          } z-10 cursor-pointer`}
          aria-label="Ícone de curtida"
        />
      </button>
      <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
        {likesCount}
      </span>
    </div>
  );
};
