"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Send } from "lucide-react";
import { FormEvent, useState } from "react";
import { getUserAction } from "@/actions/userActions/getUserAction";

type NewsletterProps = React.ComponentProps<"div">;

export const Newsletter = ({ className, ...props }: NewsletterProps) => {
  const [email, setEmail] = useState<string>("");
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const user = await getUserAction();
      if (typeof user === "string") return;
      const { name, lastName } = user;
      const response = await fetch("/api/starter-mail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, name, lastName }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log(data);
      } else {
        console.log("ERRO:", data);
      }
    } catch (e) {
      console.log("Erro: ", e);
    }
  };
  return (
    <Card className={className} {...props}>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Mail
            className="h-5 w-5 text-blue-600 dark:text-blue-400"
            aria-label="Ícone de email"
          />
          <CardTitle className="text-lg">Newsletter</CardTitle>
        </div>
        <CardDescription>Receba notificações sobre novos posts</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={(e) => handleSubmit(e)}>
          <div className="space-y-2">
            <label
              htmlFor="newsletter-email"
              className="text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              Seu email
            </label>
            <div className="relative">
              <Mail
                className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                aria-label="Ícone de email"
              />
              <Input
                onChange={(e) => setEmail(e.target.value)}
                id="newsletter-email"
                type="email"
                placeholder="seu@email.com"
                className="pl-10 bg-slate-50 border-slate-200 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-slate-800"
                aria-label="Campo de email para newsletter"
                aria-describedby="newsletter-description"
              />
            </div>
            <p
              id="newsletter-description"
              className="text-xs text-slate-500 dark:text-slate-400"
            >
              Enviaremos apenas notificações sobre novos posts
            </p>
          </div>
          <Button
            type="submit"
            className="w-full bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            aria-label="Inscrever-se na newsletter"
          >
            <Send className="h-4 w-4" aria-hidden="true" />
            Inscrever-se
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
