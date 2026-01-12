"use client";

import Link from "next/link";
import { FileText, Plus, Users } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

type AdminMenuProps = React.ComponentProps<"div">;

export const AdminMenu = ({ className, ...props }: AdminMenuProps) => {
  const menuItems = [
    {
      title: "Meus Posts",
      description: "Ver todos os posts criados por você",
      href: "/admin/posts",
      icon: FileText,
      color: "text-blue-600 dark:text-blue-400",
    },
    {
      title: "Criar Post",
      description: "Criar um novo post para o blog",
      href: "/admin/posts/new",
      icon: Plus,
      color: "text-green-600 dark:text-green-400",
    },
    {
      title: "Usuários",
      description: "Gerenciar usuários do site",
      href: "/admin/users",
      icon: Users,
      color: "text-purple-600 dark:text-purple-400",
    },
  ];

  return (
    <div className={cn("container mx-auto px-4 py-12", className)} {...props}>
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
          Administração
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Gerencie seu blog e usuários
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link key={item.href} href={item.href}>
              <Card className="cursor-pointer transition-all duration-300 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-700 hover:-translate-y-1">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
                    <Icon
                      className={cn("h-6 w-6", item.color)}
                      aria-hidden="true"
                    />
                  </div>
                  <CardTitle className="text-xl text-slate-900 dark:text-slate-100">
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-slate-600 dark:text-slate-400">
                    {item.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
};





