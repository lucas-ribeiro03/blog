import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Heart, TrendingUp } from "lucide-react";
import { getLikesByCategory } from "@/lib/queries/public";

type PopularCategoriesProps = React.ComponentProps<"div">;

export const PopularCategories = async ({
  className,
  ...props
}: PopularCategoriesProps) => {
  const stats = await getLikesByCategory();
  return (
    <Card className={className} {...props}>
      <CardHeader>
        <div className="flex items-center gap-2">
          <TrendingUp
            className="h-5 w-5 text-purple-600 dark:text-purple-400"
            aria-label="Ícone de tendência"
          />
          <CardTitle className="text-lg">Categorias Populares</CardTitle>
        </div>
        <CardDescription>
          As categorias mais curtidas pelos leitores
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {stats.map((category, index) => (
            <div
              key={category.categoryId}
              className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-linear-to-br from-blue-500 to-purple-600 text-white text-xs font-bold">
                  {index + 1}
                </div>
                <div>
                  <p className="font-medium text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {category.category}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    post
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
                <Heart
                  className="h-4 w-4 fill-red-500 text-red-500"
                  aria-label="Total de curtidas"
                />
                <span className="text-sm font-semibold">
                  {category.totalLikes}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
