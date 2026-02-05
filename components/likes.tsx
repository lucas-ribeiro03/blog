import { dislikeAction } from "@/actions/likeActions/dislike-action";
import { likeAction } from "@/actions/likeActions/like-action";
import { Post } from "@/model/post";
import { Heart } from "lucide-react";
import { useState } from "react";

type LikesProps = {
  post: Post;
  likesCount: number;
  isLikedByMe: boolean | false;
} & React.ComponentProps<"button">;

export const Likes = ({ post, likesCount, isLikedByMe }: LikesProps) => {
  const [isLiked, setIsLiked] = useState<boolean>(isLikedByMe);
  const [count, setCount] = useState<number>(likesCount);

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();

    if (!isLiked) {
      await likeAction(post.id);
    } else {
      await dislikeAction(post.id);
    }
    setCount(isLiked ? count - 1 : count + 1);
    setIsLiked((prev) => !prev);
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
        {count}
      </span>
    </div>
  );
};
