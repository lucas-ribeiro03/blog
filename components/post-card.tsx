"use client";

import { Heart } from "lucide-react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Post } from "@/data/posts";
import Image from "next/image";

type PostCardProps = {
  post: Post;
} & React.ComponentProps<"div">;

export const PostCard = ({ post, className, ...props }: PostCardProps) => {
  return (
    <Card
      className={`group cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 hover:border-blue-300 dark:hover:border-blue-700 dark:hover:shadow-purple-500/10 overflow-hidden ${
        className || ""
      }`}
      {...props}
    >
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={post.imagemCapa}
          alt={post.titulo}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium px-2 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
            {post.categoria}
          </span>
          <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
            <Heart
              className="h-4 w-4 fill-red-500 text-red-500"
              aria-label="Ícone de curtida"
            />
            <span className="text-sm font-medium">{post.likes}</span>
          </div>
        </div>
        <CardTitle className="text-xl group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {post.titulo}
        </CardTitle>
        <CardDescription className="text-slate-600 dark:text-slate-400 line-clamp-2">
          {post.excerpt}
        </CardDescription>
      </CardHeader>
    </Card>
  );
};
