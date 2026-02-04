"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Post } from "@/model/post";
import Image from "next/image";
import Link from "next/link";
import { Likes } from "./likes";

type PostCardProps = {
  post: Post;
  likes: {
    isLikedByMe: boolean;
    likesCount: number;
  };
} & React.ComponentProps<"div">;

export const PostCard = ({
  post,
  className,
  likes,
  ...props
}: PostCardProps) => {
  if (typeof likes === "undefined")
    likes = {
      isLikedByMe: false,
      likesCount: 0,
    };
  return (
    <Link href={`/post/${post.slug}`} className="block">
      <Card
        className={`group cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 hover:border-blue-300 dark:hover:border-blue-700 dark:hover:shadow-purple-500/10 overflow-hidden ${
          className || ""
        }`}
        {...props}
      >
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={`${post.coverImage}`}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            unoptimized
          />
        </div>
        <CardHeader>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium px-2 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
              {post.category}
            </span>
            <div className="flex flex-col items-center gap-0.5">
              <Likes
                post={post}
                isLikedByMe={likes.isLikedByMe}
                likesCount={likes.likesCount}
              />
            </div>
          </div>
          <CardTitle className="text-xl group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 min-h-14">
            {post.title}
          </CardTitle>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">
            Por {post.author}
          </p>
          <CardDescription className="text-slate-600 dark:text-slate-400 line-clamp-2">
            {post.excerpt}
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
};
